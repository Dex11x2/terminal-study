// تكملة تاب rn: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/rn/01.js (شرح حقول الدرس في أوله)
MORE("rn", [
    {
      t: "الـ core components",
      l: 1,
      n: "View و Text و Image و Pressable و TextInput و ScrollView و FlatList: البدايل بتاعة div و p و img و button و input",
      items: [
        {
          cmd: "View و Text",
          title: "View بدل div و Text بدل p: والفرق اللي هيوقعك",
          desc: R`[[View]] صندوق للـ layout والستايل، زي [[div]]. و [[Text]] الوحيد اللي يقدر يعرض نص. وده أكبر فرق: النص مينفعش يبقى برّه [[Text]]، حتى رقم أو مسافة.

[[Text]] جوه [[Text]] بيعمل زي [[span]] جوه [[p]]: بيورّث الخط واللون من الأب، وده المكان الوحيد في RN اللي فيه وراثة ستايل. و [[numberOfLines]] بيقص النص بـ «...»، و [[selectable]] بيخلي المستخدم يقدر ينسخه.`,
          example: R`import { Text, View } from 'react-native';

export function PriceCard({ title, price, oldPrice }: { title: string; price: number; oldPrice?: number }) {
  return (
    <View style={{ padding: 12, borderRadius: 12, backgroundColor: '#fff', gap: 4 }}>
      <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: '600' }}>{title}</Text>
      <Text style={{ color: '#16a34a' }}>
        {price} جنيه{' '}
        {oldPrice ? <Text style={{ textDecorationLine: 'line-through', color: '#999' }}>{oldPrice}</Text> : null}
      </Text>
    </View>
  );
}`,
          try: R`غيّر [[{oldPrice ? ... : null}]] لـ [[{oldPrice && <Text>...</Text>}]] وابعت [[oldPrice={0}]]. إيه اللي هيحصل؟ وليه ده أخطر في RN منه في الويب؟`,
          flag: "script",
          deep: {
            why: R`في الويب لو كتبت [[{count && <Badge />}]] و count بـ 0، هيظهر «0» على الشاشة وخلاص. في RN نفس الغلطة بتوقع التطبيق كله، لأن «0» نص برّه [[Text]]. فلازم تفهم قاعدة النص من أول يوم.`,
            how: R`[[View]] بيتحول لـ native view عادي مبيعرفش يرسم نص. [[Text]] بيتحول لـ TextView/UILabel، والـ [[Text]] المتداخلة بتتجمع في نص واحد بـ styles مختلفة (spannable string على Android و attributed string على iOS)، فمينفعش تحط [[View]] جوه [[Text]] بطريقة مضمونة، وفيه ستايلات View كتير (زي padding على Text المتداخل) مش بتتطبق.

الوراثة: [[Text]] الداخلي بياخد [[fontSize]] و [[color]] و [[fontFamily]] من [[Text]] الخارجي بس. [[View]] مبيورّثش أي حاجة لأولاده، فلو عايز خط موحد للتطبيق كله اعمل component [[AppText]] بستايل افتراضي واستخدمه في كل مكان.

[[{' '}]] لازم عشان JSX بيشيل المسافات في آخر السطر. و [[gap]] شغال في RN زي CSS الحديث (من 0.71).`,
            when: R`[[View]] لأي صندوق أو layout، و [[Text]] لأي نص. واعمل components فوقهم للتصميم بتاعك (AppText و Card و Row) بدل ما تكرر الستايل.`,
            mistakes: R`[[{count && ...}]] مع رقم ممكن يبقى 0، أو [[{str && ...}]] مع string فاضي "": كلهم بيحاولوا يرسموا نص برّه Text. استخدم [[?:]] أو [[!!count &&]] أو [[count > 0 &&]]. وتحط [[onPress]] على [[View]]: مش هيشتغل، View مبيستقبلش ضغط (استخدم Pressable). وتفتكر إن [[fontWeight]] لازم string: RN الحديث بيقبل [['600']] و [[600]] الاتنين (النوع فيه 100 لحد 900 رقم و string، و [['bold']])، اللي غلط هو [['600px']] أو [['semi-bold']] بشرطة.`
          },
          teach: R`## الفكرة: كارت سعر فيه نص جوه نص

[[PriceCard]] بيعرض عنوان منتج في سطر واحد، وتحته السعر، وجنبه السعر القديم مشطوب لو موجود. فيه ٣ أفكار مهمة: كل نص جوه [[Text]]، و [[Text]] جوه [[Text]] بيورّث الستايل، والشرط في JSX لازم يرجّع حاجة آمنة.

> اتجرّب على مشروع Expo SDK 57 على الويب ([[expo start --web]]) في Chrome، في صندوق عرضه 320، والقياسات من [[getBoundingClientRect]] و [[getComputedStyle]].

---

## ١. السطر الطويل: تعريف الـ component

~~~text PriceCard.tsx
export function PriceCard({ title, price, oldPrice }: { title: string; price: number; oldPrice?: number }) {
~~~

نفكّه من الشمال:

| الحتة | معناها |
|---|---|
| [[export function PriceCard]] | component متصدّر باسمه (named export)، فبيتستورد بـ [[import { PriceCard }]] |
| [[({ title, price, oldPrice }]] | الـ props اتفكّت لمتغيرات على طول (destructuring) |
| [[: { ... }]] | نوع الـ props في TypeScript |
| [[title: string]] | العنوان نص |
| [[price: number]] | السعر رقم |
| [[oldPrice?: number]] | علامة [[?]] معناها «اختياري»: ممكن تبعته وممكن لأ، ولو مبعتهوش قيمته [[undefined]] |

---

## ٢. [[<View style={{ padding: 12, borderRadius: 12, backgroundColor: '#fff', gap: 4 }}>]]

صندوق الكارت. [[borderRadius]] الزوايا المدورة، و [[gap: 4]] مسافة 4 بين كل ولد واللي بعده (زي [[gap]] في CSS). الأولاد تحت بعض لأن View عمودي افتراضيًا.

---

## ٣. العنوان: [[numberOfLines={1}]]

~~~text PriceCard.tsx
<Text numberOfLines={1} style={{ fontSize: 16, fontWeight: '600' }}>{title}</Text>
~~~

- [[numberOfLines={1}]]: سطر واحد بس، والزيادة تتقص و «...» في الآخر.
- [[fontWeight: '600']]: تقل الخط (semi-bold). بيتكتب string أو رقم [[600]].
- [[{title}]]: القوسين معناهم «حط قيمة المتغير هنا».

جربته بعنوان طويل («سماعة بلوتوث لاسلكية بعزل ضوضاء ممتاز وبطارية طويلة»):

~~~text الناتج (Chrome)
width=264   height=21   font-size=16px   font-weight=600
text-overflow=ellipsis   white-space=nowrap   scrollWidth=382
~~~

النص محتاج 382 بكسل، والمتاح 264، فاتقص بـ «...». على الويب RN بيعمل ده بـ [[text-overflow: ellipsis]]، وعلى الموبايل النظام نفسه بيقصه.

---

## ٤. السعر: [[Text]] جوه [[Text]]

~~~text PriceCard.tsx
<Text style={{ color: '#16a34a' }}>
  {price} جنيه{' '}
  {oldPrice ? <Text style={{ textDecorationLine: 'line-through', color: '#999' }}>{oldPrice}</Text> : null}
</Text>
~~~

### [[{price} جنيه{' '}]]

- [[{price}]] الرقم، وبعده كلمة «جنيه».
- [[{' '}]]: string فيه مسافة واحدة. ليه مكتوبة كده؟ لأن JSX بيشيل المسافات والسطر الجديد اللي في آخر السطر، فمن غيرها السعر القديم هيلزق في «جنيه».

### [[oldPrice ? ... : null]]

ده الـ ternary: [[شرط ? لو صح : لو غلط]]. لو فيه [[oldPrice]] ارسم الـ Text المشطوب، غير كده [[null]]، و React مبيرسمش حاجة لـ [[null]].

### الـ Text الداخلي

- [[textDecorationLine: 'line-through']]: خط في نص الكلام (شطب). القيم التانية: [['underline']] و [['none']].
- [[color: '#999']]: رمادي.

### الوراثة: اتقاست

~~~text الناتج (Chrome)
Text الخارجي:  div   color=rgb(22, 163, 74)   font-size=14px   النص: "450 جنيه 600"
Text الداخلي:  span  color=rgb(153, 153, 153) font-size=14px   text-decoration=line-through
~~~

- الداخلي بقى [[span]] جوه الخارجي، يعني نص واحد بألوان مختلفة (على Android ده spannable string، وعلى iOS attributed string).
- حجم الخط 14 في الاتنين: محدش كتب [[fontSize]]، فالداخلي ورث الافتراضي من الخارجي. لو كتبت [[fontSize: 18]] على الخارجي، الداخلي هياخده.
- اللون: الداخلي كتب لونه، فكسب على لون الأب.

ده المكان **الوحيد** في RN اللي فيه وراثة. [[View]] مبيورّثش حاجة لأولاده.

---

## ٥. التجربة: [[&&]] مع [[oldPrice={0}]]

غيّرت الشرط لـ [[{oldPrice && <Text ...>{oldPrice}</Text>}]] وبعت [[oldPrice={0}]]:

~~~text الناتج (Chrome)
"50 جنيه 0"     <- مفيش span، الـ 0 نص عادي أخضر
~~~

ليه؟ [[a && b]] بترجّع [[a]] لو كانت falsy (زي [[0]] و [[""]] و [[null]])، غير كده بترجّع [[b]]. فـ [[0 && ...]] = [[0]]، و React بيرسم الأرقام. هنا الـ 0 جوه [[Text]] فطلع شكل غلط بس. لو نفس السطر كان جوه [[View]] مباشرة، على الموبايل التطبيق بيقع (درس «RN مش ويب»).

### حل التجربة: [[oldPrice != null]]

~~~text الناتج (Chrome)
oldPrice={0}:          "50 جنيه 0"   والـ 0 جوه span مشطوب
من غير oldPrice:       "50 جنيه "    مفيش span
~~~

[[!= null]] (بعلامة = واحدة بعد [[!]]) صح لما القيمة مش [[null]] ومش [[undefined]]. فالـ 0 بقى سعر حقيقي بيتعرض مشطوب، ولو مفيش سعر قديم مفيش حاجة.

| الشرط | [[oldPrice=600]] | [[oldPrice=0]] | من غير oldPrice |
|---|---|---|---|
| [[oldPrice ? X : null]] | X | مفيش (0 اتعامل كأنه مش موجود) | مفيش |
| [[oldPrice && X]] | X | **«0» نص عريان** | مفيش |
| [[oldPrice != null ? X : null]] | X | X بـ 0 | مفيش |

---

## الخلاصة

- أي نص، حتى رقم أو مسافة، جوه [[Text]].
- [[Text]] جوه [[Text]] = [[span]] جوه [[p]]: بيورّث الخط واللون. View مبيورّثش.
- [[numberOfLines]] للقص، و [[{' '}]] للمسافة الصريحة.
- الشروط في JSX: [[? :]] أو boolean صريح ([[!= null]] أو [[> 0]])، مش [[&&]] مع رقم.`,
          lines: [
            "الاتنين من react-native.",
            "component بـ props مكتوب نوعها زي أي React + TS.",
            "بيرجّع JSX.",
            R`صندوق الكارت. [[gap]] مسافة بين الأولاد زي CSS.`,
            R`العنوان في سطر واحد، والزيادة بتتقص بـ «...». [[fontWeight]] بيتكتب string أو رقم.`,
            "Text خارجي بلون أخضر.",
            R`السعر ومسافة صريحة [[{' '}]] عشان JSX بيشيل المسافة في آخر السطر.`,
            R`Text داخلي بيورّث حجم الخط ويغيّر اللون ويشطب. و [[? :]] بترجّع null لو مفيش سعر قديم.`,
            "قفلة الـ Text الخارجي.",
            "قفلة الكارت.",
            "قفلة الـ return.",
            "قفلة الدالة."
          ],
          sol: R`مع [[oldPrice={0}]] و [[&&]]: [[0 && ...]] بترجّع [[0]]، و React Native بيحاول يرسمها. هي جوه [[Text]] الخارجي هنا فهتظهر «0» جنب السعر (غلط في الشكل بس). لكن لو نفس الـ pattern كان مباشرة جوه [[View]]، التطبيق بيقع بـ «Text strings must be rendered within a <Text> component».

عشان كده في RN خليها قاعدة: الشروط في JSX بـ [[? :]] أو بـ boolean صريح. والسعر 0 أصلًا قيمة حقيقية، فالشرط الصح [[oldPrice != null]] مش truthiness.`,
          solCode: R`{oldPrice != null ? (
  <Text style={{ textDecorationLine: 'line-through', color: '#999' }}>{oldPrice}</Text>
) : null}`
        },
        {
          cmd: "Image و expo-image",
          title: "تعرض صورة من النت أو من الـ assets",
          desc: R`[[Image]] من react-native بيعرض صورة، و [[expo-image]] (موجود في القالب) أحسن في أغلب الحالات: cache على الديسك، و placeholder، و transitions، ودعم WebP و AVIF و SVG.

أهم فرق عن [[img]]: صورة من النت لازم تديها أبعاد ([[width]] و [[height]] أو [[aspectRatio]])، لأن RN مش بيعرف حجمها قبل ما تتحمّل. والصورة المحلية بـ [[require('./logo.png')]] بتعرف حجمها لوحدها.`,
          example: R`import { Image } from 'expo-image';
import { View } from 'react-native';

export function Avatar({ uri }: { uri?: string }) {
  return (
    <View style={{ flexDirection: 'row', gap: 12 }}>
      <Image
        source={uri ? { uri } : require('@/assets/images/icon.png')}
        style={{ width: 56, height: 56, borderRadius: 28 }}
        contentFit="cover"
        transition={200}
        accessibilityLabel="صورة البروفايل"
      />
      <Image source={{ uri: 'https://picsum.photos/800/450' }} style={{ flex: 1, aspectRatio: 16 / 9 }} />
    </View>
  );
}`,
          try: R`شيل [[style]] من الصورة التانية خالص وشوف هتظهر ولا لأ. وبعدين رجّع [[aspectRatio]] من غير [[flex: 1]]: إيه اللي حصل؟`,
          flag: "script",
          deep: {
            why: R`الصور أكبر سبب لبطء التطبيقات واستهلاك الذاكرة والباقة. [[expo-image]] بيحل أغلبها: بيعمل cache فالصورة مش بتتنزل كل مرة تفتح الشاشة، وبيصغّر الصورة لحجم العرض في الذاكرة.`,
            how: R`[[source]] بياخد [[{ uri }]] لصورة من النت أو ملف على الجهاز (زي الصورة اللي راجعة من image picker)، أو رقم من [[require]] لصورة جوه الـ bundle. Metro بيحوّل [[require]] لـ asset وبيختار [[@2x]] و [[@3x]] حسب كثافة الشاشة لو موجودين.

صورة من النت من غير أبعاد حجمها 0×0، فمش هتظهر خالص ومن غير أي خطأ. [[aspectRatio]] مع عرض معروف ([[flex: 1]] في row، أو [[width: '100%']]) بيحسب الارتفاع.

[[contentFit]] في expo-image هو [[object-fit]] بتاع CSS ([[cover]] و [[contain]])، و [[Image]] العادي اسمه [[resizeMode]]. و [[placeholder]] بياخد blurhash أو thumbhash يظهر لحد ما الصورة تيجي. و [[cachePolicy]] افتراضيًا [['disk']].`,
            when: R`[[expo-image]] لأي صورة من النت أو قايمة صور. [[Image]] العادي كفاية لأيقونة محلية صغيرة. وللـ SVG كأيقونات، expo-image بيعرضه كصورة، ولو محتاج تغيّر لونه استخدم مكتبة أيقونات أو [[react-native-svg]].`,
            mistakes: R`صورة من النت من غير width/height: مبتظهرش ومفيش error. و [[source="https://..."]] string بدل [[{ uri: ... }]]. و HTTP مش HTTPS: iOS بيمنعه افتراضيًا و Android من 9 كمان. وتعرض صورة 4000×3000 في مربع 56×56 في list فيها 200 عنصر: الذاكرة بتتملي. اطلب من الـ backend نسخة صغيرة (thumbnail).`
          },
          teach: R`## الفكرة: صورتين في صف، واحدة مقاسها ثابت وواحدة بتتمد

[[Avatar]] بيرسم صورة بروفايل دايرية (من النت لو فيه رابط، وإلا صورة محلية)، وجنبها صورة من النت بتاخد باقي العرض وارتفاعها محسوب من النسبة 16:9. الدرس كله عن حاجة واحدة: الصورة من النت لازم يبقى ليها حجم.

> اتجرّب على Expo SDK 57 (expo-image 57.0.5) على الويب في Chrome، في صندوق عرضه 360. الصورة من النت [[https://picsum.photos/800/450]] (موقع بيرجّع صورة عشوائية بالمقاس اللي تطلبه).

---

## ١. الـ imports

- [[import { Image } from 'expo-image';]]: [[Image]] من مكتبة [[expo-image]] (موجودة في القالب). نفس اسم [[Image]] بتاع react-native، بس فيها cache و placeholder و transitions.
- [[import { View } from 'react-native';]]: الصندوق.

---

## ٢. [[export function Avatar({ uri }: { uri?: string })]]

prop واحد اسمه [[uri]] (Uniform Resource Identifier، يعني عنوان الصورة)، و [[?]] بتقول إنه اختياري.

---

## ٣. [[<View style={{ flexDirection: 'row', gap: 12 }}>]]

[[flexDirection: 'row']]: الأولاد جنب بعض مش تحت بعض. و [[gap: 12]] مسافة 12 بين الصورتين.

---

## ٤. الصورة الأولى: الدايرة

### [[source={uri ? { uri } : require('@/assets/images/icon.png')}]]

من جوه لبرة:

1. [[{ uri }]]: object فيه خاصية [[uri]]. ده اختصار لـ [[{ uri: uri }]]. كده بتقول «الصورة من الرابط ده».
2. [[require('@/assets/images/icon.png')]]: صورة جوه المشروع. [[require]] هنا مش بيقرا الملف وقت التشغيل: Metro بيشوفه وقت الـ bundling ويحط الصورة مع التطبيق، ويرجّع رقم بيشاور عليها. و [[@/assets]] اختصار من [[tsconfig.json]] لفولدر [[assets]].
3. [[uri ? ... : ...]]: لو فيه رابط خده، غير كده الصورة المحلية.

### [[style={{ width: 56, height: 56, borderRadius: 28 }}]]

مقاس ثابت 56×56، و [[borderRadius]] نص العرض بيقلب المربع دايرة.

### باقي الـ props

| الـ prop | معناه |
|---|---|
| [[contentFit="cover"]] | لو نسبة الصورة غير المربع، كبّرها لحد ما تملاه واقطع الزيادة. زي [[object-fit: cover]] في CSS |
| [[transition={200}]] | الصورة تظهر بـ fade في 200 ملي ثانية لما تتحمّل |
| [[accessibilityLabel="صورة البروفايل"]] | الكلام اللي قارئ الشاشة (TalkBack و VoiceOver) بيقوله |

---

## ٥. الصورة التانية: [[style={{ flex: 1, aspectRatio: 16 / 9 }}]]

- [[source={{ uri: '...' }}]]: صورة من النت. لازم object، مش string لوحده.
- [[flex: 1]]: خد كل العرض الفاضي في الصف.
- [[aspectRatio: 16 / 9]]: العرض ÷ الارتفاع = 16 ÷ 9 (يعني 1.78). فلما العرض يتعرف، الارتفاع بيتحسب.

---

## ٦. شكله وهو بيترسم

~~~text الناتج (Chrome، الصف عرضه 360)
الصف:          360 x 164
الصورة الأولى:  56 x 56    x=0    border-radius=28px   <img alt="صورة البروفايل">  natural=1024x1024
الصورة التانية: 292 x 164.3  x=68   natural=800x450
~~~

الحسبة:

| الرقم | جه منين |
|---|---|
| 292 | 360 − 56 (الأولى) − 12 (الـ gap) |
| 164.3 | 292 × 9 ÷ 16 |
| 164 (ارتفاع الصف) | أطول ولد فيه |

و [[accessibilityLabel]] بقى [[alt]] بتاع الـ [[img]] على الويب. والصورة المحلية حجمها الحقيقي 1024×1024 بس بتتعرض 56×56.

---

## ٧. التجربة

جربت ٣ نسخ في نفس الصف:

~~~text الناتج (Chrome)
من غير style خالص:          0 x 56       <- مش ظاهرة
aspectRatio بس (من غير flex): 99.5 x 56    <- ظاهرة وصغيرة
width: 200 + aspectRatio:    200 x 112.5
~~~

### من غير [[style]]

الصورة اتحمّلت فعلًا (800×450 وصلت)، بس عرضها 0، فمش ظاهرة، ومفيش أي error. React Native مش بيستنى الصورة تيجي عشان يعرف مقاسها، بيرسم الـ layout الأول. والـ 56 ارتفاع جاي من الصف: [[alignItems]] الافتراضي [[stretch]]، فبيمدّ الأولاد لارتفاع أطول واحد.

### [[aspectRatio]] من غير [[flex: 1]]

الصف مش بيمدّ أولاده في العرض، بس بيمدّهم في الارتفاع (56). فـ [[aspectRatio]] حسب العرض من الارتفاع: 56 × 16 ÷ 9 = 99.5. ظهرت، بس مش المقاس اللي عايزه.

### [[width: 200]]

عرض معروف، فالارتفاع 200 × 9 ÷ 16 = 112.5.

---

## الخلاصة

| الصورة | لازم |
|---|---|
| من النت ([[{ uri }]]) | حجم صريح: [[width]] و [[height]]، أو بُعد واحد + [[aspectRatio]] |
| محلية ([[require]]) | بتعرف حجمها، بس عادة بتديها مقاس برضه |
| أي صورة | [[accessibilityLabel]] لو ليها معنى |

ولو صورة مش ظاهرة ومفيش error: أول سؤال «عرضها وارتفاعها كام؟».`,
          lines: [
            "Image من expo-image (نفس الاسم، API أغنى).",
            "View للـ layout.",
            "صورة بروفايل، والـ uri اختياري.",
            "بيرجّع JSX.",
            "صف فيه الصورتين.",
            "بداية الصورة الأولى.",
            R`لو فيه uri نجيبها من النت، وإلا صورة محلية بـ [[require]] (الـ alias [[@/assets]] من tsconfig).`,
            "أبعاد ثابتة، و borderRadius نص العرض يعمل دايرة.",
            R`زي [[object-fit: cover]].`,
            "fade لما الصورة تيجي.",
            "اسم للـ screen reader.",
            "قفلة الصورة.",
            R`صورة من النت: [[flex: 1]] ياخد العرض الباقي، و [[aspectRatio]] يحسب الارتفاع.`,
            "قفلة الصف.",
            "قفلة الـ return.",
            "قفلة الدالة."
          ],
          sol: R`من غير [[style]] الصورة التانية مش هتظهر خالص: عرضها 0 (على الويب اتقاست 0×56، الارتفاع جه من الصف اللي بيمدّ أولاده) ومفيش أي error في الـ console. ده أشهر سؤال «الصورة مش ظاهرة» في RN.

و [[aspectRatio]] من غير [[flex: 1]]: الصورة بتظهر صغيرة بحجم غريب. على الويب اتقاست 99.5×56: الصف مش بيمدّ أولاده في العرض، بس بيمدّهم في الارتفاع لحد ارتفاع الصورة الأولى (56)، فالعرض اتحسب من الارتفاع (56 × 16 ÷ 9). مع [[flex: 1]] أو [[width: 200]] الحساب بيشتغل: عرض 200 يعني ارتفاع 112.5.`
        },
        {
          cmd: "Pressable",
          title: "زرار بـ Pressable: onPress و pressed و hitSlop",
          desc: R`مفيش [[button]] ولا [[onClick]]. [[Pressable]] بيلف أي حاجة ويخليها تستقبل ضغط: [[onPress]] و [[onLongPress]] و [[onPressIn]]. و [[style]] ممكن تبقى دالة بتاخد [[{ pressed }]] عشان تغيّر الشكل وقت الضغط (بديل [[:active]]).

فيه كمان [[Button]] جاهز بس شكله مش قابل للتخصيص تقريبًا، فالتطبيقات الحقيقية بتعمل زرار خاص بيها فوق [[Pressable]].`,
          example: R`import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

type Props = { title: string; onPress: () => void; loading?: boolean; disabled?: boolean };

export function AppButton({ title, onPress, loading, disabled }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      style={({ pressed }) => [styles.btn, pressed && styles.pressed, (disabled || loading) && styles.disabled]}>
      {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.text}>{title}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { backgroundColor: '#2563eb', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10, alignItems: 'center' },
  pressed: { opacity: 0.7 },
  disabled: { backgroundColor: '#94a3b8' },
  text: { color: '#fff', fontSize: 16, fontWeight: '600' },
});`,
          try: R`استخدم [[AppButton]] في شاشة بزرار بيعمل [[setTimeout]] ثانيتين وهو [[loading]]. اضغطه كذا مرة بسرعة: [[onPress]] اتنادت كام مرة؟ وبعدين ضيف [[android_ripple={{ color: '#ffffff55' }}]] وجرّبه على Android.`,
          flag: "script",
          deep: {
            why: R`الزرار أكتر component هتكتبه. لو اتعمل صح مرة (حالة الضغط، و disabled، و loading، والـ accessibility، ومساحة لمس كفاية) كل التطبيق هيبقى أحسن، ولو كل شاشة عاملة زرار بطريقتها هتلاقي ١٠ أشكال مختلفة.`,
            how: R`[[Pressable]] مبني على نظام الـ responder في RN: لما صباعك يلمس الشاشة، بيحدد مين «صاحب» اللمسة. [[onPressIn]] أول ما تلمس، و [[onPressOut]] لما ترفع، و [[onPress]] لو رفعت صباعك وانت لسه جوه العنصر، و [[onLongPress]] بعد 500ms تقريبًا.

[[style]] كدالة: RN بيناديها مع [[{ pressed }]] كل ما الحالة تتغير. والـ array في الستايل بيتدمج من الشمال لليمين، والقيم [[false]] و [[null]] بتتجاهل، فـ [[pressed && styles.pressed]] نظيفة.

[[hitSlop]] بيكبّر مساحة اللمس من غير ما يكبّر الشكل: Apple و Google بينصحوا بـ 44 و 48 نقطة على الأقل. و [[accessibilityRole="button"]] بيخلي TalkBack و VoiceOver يقولوا «زرار»، وده برضه اللي بيخلي [[getByRole('button')]] في الاختبارات يلاقيه.

[[disabled]] بيمنع الضغط فعلًا، وبس لازم تغيّر الشكل بنفسك.`,
            when: R`أي حاجة بتتضغط: زرار، أو صف في list، أو كارت. [[TouchableOpacity]] القديم لسه شغال بس [[Pressable]] هو الموصى بيه.`,
            mistakes: R`[[onPress={save()}]] بدل [[onPress={save}]]: بتنادي الدالة وقت الرسم. وزرار 24×24 من غير hitSlop: المستخدمين هيضغطوا جنبه. ومفيش حماية من الضغط المتكرر في عمليات زي الدفع: الـ [[disabled]] وقت الـ loading أو [[isPending]] من useMutation. وتنسى [[accessibilityRole]] فالاختبار بـ [[getByRole]] مش لاقيه.`
          },
          teach: R`## الفكرة: زرار واحد للتطبيق كله

[[AppButton]] زرار بيتعمل مرة ويتستخدم في كل الشاشات: بيستقبل الضغط، وشكله بيتغير وانت ضاغط، وبيتقفل وهو disabled أو بيحمّل، وبيقول لقارئ الشاشة إنه زرار. هنفك الـ component، وبعدين الشاشة اللي بتجربه (الـ solCode).

> اتجرّب على Expo SDK 57 على الويب في Chrome بـ playwright: ضغطت وقست الشكل قبل وأثناء وبعد.

---

## ١. [[import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';]]

| الاسم | بيعمل إيه |
|---|---|
| [[Pressable]] | يلف أي حاجة ويخليها تستقبل لمس |
| [[ActivityIndicator]] | الدايرة اللي بتلف (spinner) |
| [[StyleSheet]] | يجمع الستايلات تحت (الدرس الجاي) |
| [[Text]] | النص |

---

## ٢. [[type Props = { title: string; onPress: () => void; loading?: boolean; disabled?: boolean };]]

[[type Props]] اسم لنوع الـ props:

- [[onPress: () => void]]: دالة مبتاخدش حاجة ([[()]]) ومبترجّعش حاجة ([[void]]).
- [[loading?]] و [[disabled?]]: اختياريين، ولو مش موجودين قيمتهم [[undefined]] (يعني falsy).

---

## ٣. الـ [[Pressable]] وخصايصه

- [[onPress={onPress}]]: لما الضغطة تكمل (صباعك نزل ورفع وهو لسه على الزرار).
- [[disabled={disabled || loading}]]: الـ [[||]] معناها «أو»، يعني مقفول لو disabled أو بيحمّل.
- [[hitSlop={8}]]: مساحة اللمس أكبر 8 من كل ناحية من غير ما الشكل يكبر.
- [[accessibilityRole="button"]]: قارئ الشاشة يقول «زرار»، والاختبارات تلاقيه بـ [[getByRole('button')]].
- [[accessibilityState={{ disabled: ..., busy: loading }}]]: يقول كمان إنه معطّل أو مشغول.

---

## ٤. [[style={({ pressed }) => [...]}]]

الستايل هنا **دالة** مش object. Pressable بيناديها كل ما حالة الضغط تتغير، ويديها [[{ pressed }]] ([[true]] وانت ضاغط).

نفك اللي جواها:

~~~text AppButton.tsx
[styles.btn, pressed && styles.pressed, (disabled || loading) && styles.disabled]
~~~

- array ستايلات، بتتدمج من الشمال لليمين، والأخير بيكسب لو فيه نفس الخاصية.
- [[pressed && styles.pressed]]: لو ضاغط النتيجة [[styles.pressed]]، غير كده [[false]]، و RN بيتجاهل [[false]] و [[null]] في الـ array.
- [[(disabled || loading) && styles.disabled]]: نفس الفكرة للون الرمادي.

---

## ٥. اللي جوه الزرار

~~~text AppButton.tsx
{loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.text}>{title}</Text>}
~~~

لو بيحمّل spinner أبيض، غير كده العنوان.

---

## ٦. [[StyleSheet.create({ ... })]]

| الاسم | الستايل |
|---|---|
| [[btn]] | خلفية زرقا، [[paddingVertical: 12]] فوق وتحت، [[paddingHorizontal: 20]] يمين وشمال، زوايا 10، و [[alignItems: 'center']] عشان النص في النص |
| [[pressed]] | [[opacity: 0.7]] شفافية وانت ضاغط |
| [[disabled]] | خلفية رمادي |
| [[text]] | أبيض، 16، و [[fontWeight: '600']] |

---

## ٧. الشاشة اللي بتجربه (الـ solCode)

- [[import { AppButton } from '@/components/AppButton';]]: الزرار في [[src/components]] مش في [[src/app]]، عشان ميبقاش route.
- [[const [loading, setLoading] = useState(false);]] و [[const [count, setCount] = useState(0);]]: حالتين، بيحمّل ولا لأ، وعدد مرات الضغط.
- [[title={$__btحفظ ($__{count})$__bt}]]: template string. الـ [[$__{count}]] جواها بيتحط مكانه الرقم، فالعنوان «حفظ (0)».
- [[onPress={() => { ... }}]]: لما يتضغط:
  - [[setCount((c) => c + 1)]]: زوّد العداد. الشكل ده (دالة بتاخد القيمة القديمة) آمن حتى لو اتنادى كذا مرة ورا بعض.
  - [[setLoading(true)]]: ابدأ التحميل.
  - [[setTimeout(() => setLoading(false), 2000)]]: بعد 2000 ملي ثانية (ثانيتين) وقّف التحميل. ده بيمثّل طلب API.

---

## ٨. التجربة: ضغطت ٥ مرات ورا بعض

~~~text الناتج (Chrome)
قبل:         النص "حفظ (0)"   الخلفية rgb(37, 99, 235)   عرض 342   ارتفاع 45
وانا ضاغط:   opacity=0.7
أثناء التحميل (بعد ٤ ضغطات كمان): spinner ظاهر   aria-disabled="true"   الخلفية rgb(148, 163, 184)
بعد ثانيتين: النص "حفظ (1)"
~~~

- أول ضغطة عدّت، وحوّلت الزرار لـ loading، فالـ ٤ اللي بعدها اتجاهلوا: العداد 1 مش 5.
- [[opacity=0.7]]: ستايل [[pressed]] اشتغل وقت الضغط بس.
- [[aria-disabled]]: على الويب [[disabled]] بيتحول لخاصية accessibility بتاعة HTML.
- العرض 342 = 390 (الشاشة) − 24 − 24 (الـ padding بتاع الـ View). والارتفاع 45 = 12 + 21 (سطر النص) + 12.

لو شلت [[loading]] من [[disabled]]، كل ضغطة هتنادي [[onPress]]: ٥ ضغطات = ٥ طلبات. ده بالظبط اللي بيعمل «اتخصم مني مرتين» في الدفع.

### [[android_ripple]]

[[android_ripple={{ color: '#ffffff55' }}]] بيعمل التموّج بتاع Material لما تلمس. على Android بس (iOS والويب بيتجاهلوه)، فمقدرتش أشوفه هنا: الكلام عنه من الـ docs. و [[#ffffff55]] أبيض، والـ [[55]] في الآخر شفافية (hex: 55 = 85 من 255، يعني حوالي 33٪).

---

## الخلاصة

| الحاجة | بتعملها بـ |
|---|---|
| الضغط | [[onPress]] (و [[onLongPress]] بعد حوالي نص ثانية) |
| شكل وقت الضغط | [[style]] دالة بتاخد [[{ pressed }]] |
| منع الضغط المكرر | [[disabled]] وقت الـ loading |
| مساحة لمس أكبر | [[hitSlop]] |
| قارئ الشاشة والاختبارات | [[accessibilityRole="button"]] |`,
          lines: [
            "الأدوات: Pressable للضغط، و ActivityIndicator للـ spinner.",
            "نوع الـ props.",
            "زرار التطبيق.",
            "بيرجّع JSX.",
            "بداية الـ Pressable.",
            "الحدث الأساسي.",
            "ممنوع يتضغط وهو disabled أو بيحمّل.",
            "٨ نقط زيادة في مساحة اللمس من كل ناحية.",
            "قارئ الشاشة يقول «زرار».",
            "ويقول إنه معطّل أو مشغول.",
            R`ستايل دالة: [[pressed]] بيتغير وقت اللمس، والـ array بيدمج، والـ false بيتجاهل.`,
            "spinner وقت التحميل، والعنوان غير كده.",
            "قفلة.",
            "قفلة الـ return.",
            "قفلة الدالة.",
            R`[[StyleSheet.create]] للستايلات (الدرس الجاي).`,
            "شكل الزرار.",
            "شكله وقت الضغط.",
            "شكله وهو معطّل.",
            "النص.",
            "قفلة."
          ],
          sol: R`مع [[disabled={disabled || loading}]]، [[onPress]] بتتنادي مرة واحدة: أول ضغطة بتحوّل الزرار لـ loading والضغطات اللي بعدها بتتجاهل. لو شلت [[loading]] من الـ disabled، هتتنادي مع كل ضغطة (وده اللي بيعمل طلبين دفع).

[[android_ripple]] بيعمل التموّج بتاع Material على Android بس، و iOS بيتجاهله (هناك الـ opacity كفاية).`,
          solCode: R`import { useState } from 'react';
import { View } from 'react-native';
import { AppButton } from '@/components/AppButton';

export default function Demo() {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  return (
    <View style={{ padding: 24 }}>
      <AppButton
        title={$__btحفظ ($__{count})$__bt}
        loading={loading}
        onPress={() => {
          setCount((c) => c + 1);
          setLoading(true);
          setTimeout(() => setLoading(false), 2000);
        }}
      />
    </View>
  );
}`
        },
        {
          cmd: "TextInput",
          title: "TextInput: value و onChangeText والكيبورد المناسب",
          desc: R`[[TextInput]] هو [[input]]. بتعمله controlled زي الويب بالظبط، بس الحدث اسمه [[onChangeText]] وبيدّيك النص مباشرة (مش event). ومفيش [[type]]: بدلها props بتتحكم في الكيبورد: [[keyboardType]] ([['email-address']] و [['number-pad']] و [['phone-pad']])، و [[secureTextEntry]] للباسورد، و [[autoCapitalize]] و [[autoComplete]] و [[returnKeyType]].

ومفيش [[label]] مرتبط تلقائيًا: اكتب [[Text]] فوقه، وحط [[accessibilityLabel]] على الـ input نفسه.`,
          example: R`import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

export function PhoneField() {
  const [phone, setPhone] = useState('');
  const valid = /^01[0125]\d{8}$/.test(phone);
  return (
    <View style={{ gap: 6 }}>
      <Text>رقم الموبايل</Text>
      <TextInput
        value={phone}
        onChangeText={(t) => setPhone(t.replace(/\D/g, ''))}
        keyboardType="phone-pad"
        autoComplete="tel"
        maxLength={11}
        placeholder="01xxxxxxxxx"
        accessibilityLabel="رقم الموبايل"
        style={{ borderWidth: 1, borderColor: valid || !phone ? '#ccc' : '#dc2626', borderRadius: 8, padding: 10 }}
      />
      {!valid && phone.length === 11 ? <Text style={{ color: '#dc2626' }}>الرقم مش صحيح</Text> : null}
    </View>
  );
}`,
          try: R`ضيف خانة باسورد بـ [[secureTextEntry]] وزرار «إظهار» بيقلبها. وخلي خانة الموبايل لما تدوس Enter/Next على الكيبورد تنقلك لخانة الباسورد (هتحتاج [[useRef]] و [[returnKeyType]] و [[onSubmitEditing]]).`,
          flag: "script",
          deep: {
            why: R`الفورمات على الموبايل تجربتها بتعتمد على الكيبورد: كيبورد أرقام لرقم التليفون، وإيميل من غير capital أول حرف، والـ autofill للباسورد، و «التالي» بينقلك للخانة اللي بعدها. التفاصيل دي بتفرق جدًا في معدل التسجيل.`,
            how: R`[[value]] + [[onChangeText]] = controlled input: كل حرف بيعمل setState والـ input بيعرض الـ state. ممكن تعدّل النص قبل ما تحفظه (زي شيل أي حاجة مش رقم هنا). وفيه [[onChange]] كمان بيدّيك event فيه [[nativeEvent.text]]، بس [[onChangeText]] أبسط.

[[keyboardType]] بيغيّر شكل الكيبورد بس، مش بيمنع إدخال حاجة تانية (اللصق مثلًا)، فالـ validation لازم تفضل. [[autoComplete]] بيدّي hint للنظام للـ autofill (Android) و [[textContentType]] لـ iOS. [[secureTextEntry]] بيخفي النص وبيمنع النسخ.

التنقل بين الخانات: [[ref]] على الـ TextInput التاني، و [[returnKeyType="next"]] على الأول، و [[onSubmitEditing={() => nextRef.current?.focus()}]]. و [[submitBehavior="submit"]] لو عايز الكيبورد يفضل مفتوح.

[[multiline]] بيعمل textarea، وعلى Android محتاج [[textAlignVertical="top"]] عشان النص يبدأ من فوق.`,
            when: R`أي إدخال نص. وفي الفورمات الكبيرة بتستخدمه مع react-hook-form عن طريق [[Controller]] (درس الفورمات في المستوى ٢).`,
            mistakes: R`[[onChange={(e) => setX(e.target.value)}]] من عادة الويب: مفيش [[e.target.value]] في RN. وتفتكر إن [[keyboardType="number-pad"]] بيضمن أرقام بس. وتنسى [[autoCapitalize="none"]] في الإيميل فأول حرف يبقى capital والـ login يفشل. ومفيش [[accessibilityLabel]] فالاختبار بـ [[getByLabelText]] مش لاقي الخانة.`
          },
          teach: R`## الفكرة: خانة رقم موبايل بتنضّف نفسها وبتقولك لو غلط

[[PhoneField]] خانة controlled: الـ state هو اللي بيقرر الخانة فيها إيه. أي حرف بتكتبه بيعدّي على دالة بتشيل أي حاجة مش رقم، والإطار بيحمر لو الرقم مش رقم موبايل مصري صح. وبعدها الـ solCode بيورّيك إزاي «التالي» في الكيبورد ينقلك للخانة اللي بعدها.

> اتجرّب على Expo SDK 57 على الويب في Chrome: كتبت في الخانات بالكيبورد (playwright) وقريت القيم والألوان. الكيبورد بتاع الموبايل نفسه من الـ docs.

---

## ١. الـ imports والـ state

- [[import { useState } from 'react';]]: hook الـ state من React نفسها.
- [[import { Text, TextInput, View } from 'react-native';]]: [[TextInput]] هو [[input]].
- [[const [phone, setPhone] = useState('');]]: النص، وبيبدأ فاضي.

---

## ٢. [[const valid = /^01[0125]\d{8}$/.test(phone);]]

[[/.../]] ده regex (نمط بندوّر بيه في النص)، و [[.test(phone)]] بترجّع [[true]] لو النص ماشي على النمط. نفك النمط حتة حتة:

| الحتة | معناها |
|---|---|
| [[^]] | من أول النص |
| [[01]] | لازم يبدأ بـ 01 |
| [[ [0125] ]] | حرف واحد من دول: 0 أو 1 أو 2 أو 5 (فودافون، اتصالات، أورنج، وي) |
| [[\d{8}]] | [[\d]] = رقم، و [[{8}]] = ٨ مرات |
| [[$]] | لحد آخر النص، مفيش حاجة بعده |

يعني ١١ رقم بالظبط. و [[valid]] بيتحسب من جديد مع كل render، مش محتاج state لوحده.

---

## ٣. الـ label

[[<Text>رقم الموبايل</Text>]] نص عادي فوق الخانة. مفيش [[label]] بيتربط بالخانة تلقائيًا زي HTML، فبنحط [[accessibilityLabel]] على الخانة نفسها (تحت).

---

## ٤. الـ [[TextInput]] سطر سطر

### [[value={phone}]]

الخانة بتعرض اللي في الـ state. ده اللي بيخليها controlled.

### [[onChangeText={(t) => setPhone(t.replace(/\D/g, ''))}]]

من جوه لبرة:

1. [[t]]: النص الجديد كله. [[onChangeText]] بيديك النص على طول، مش event زي [[onChange]] في الويب (مفيش [[e.target.value]]).
2. [[/\D/g]]: [[\D]] (D كبيرة) = أي حاجة **مش** رقم، و [[g]] (global) = كل المرات مش أول واحدة بس.
3. [[.replace(..., '')]]: بدّل كل دول بلا شيء، يعني امسحهم.
4. [[setPhone(...)]]: احفظ النتيجة.

### خصايص الكيبورد

| الـ prop | معناه | على الويب اتحوّل لـ |
|---|---|---|
| [[keyboardType="phone-pad"]] | كيبورد أرقام التليفون | [[type="tel"]] |
| [[autoComplete="tel"]] | النظام يقترح رقمك (autofill) | [[autocomplete="tel"]] |
| [[maxLength={11}]] | أقصى ١١ حرف | [[maxlength=11]] |
| [[placeholder="01xxxxxxxxx"]] | نص باهت لما الخانة فاضية | [[placeholder]] |
| [[accessibilityLabel="رقم الموبايل"]] | اسم الخانة لقارئ الشاشة وللاختبارات | [[aria-label]] |

### الستايل

~~~text PhoneField.tsx
style={{ borderWidth: 1, borderColor: valid || !phone ? '#ccc' : '#dc2626', borderRadius: 8, padding: 10 }}
~~~

[[valid || !phone ? '#ccc' : '#dc2626']]: لو الرقم صح **أو** الخانة فاضية ([[!phone]] = مفيش نص) رمادي، غير كده أحمر. يعني مبنحمّرش الخانة قبل ما المستخدم يكتب.

---

## ٥. رسالة الخطأ

~~~text PhoneField.tsx
{!valid && phone.length === 11 ? <Text style={{ color: '#dc2626' }}>الرقم مش صحيح</Text> : null}
~~~

الرسالة تظهر بس لما يكمّل ١١ رقم والرقم غلط. وهنا [[!valid && phone.length === 11]] boolean صريح، فمفيش خطر «0 برّه Text» (درس View و Text).

---

## ٦. اللي حصل لما كتبت

~~~text الناتج (Chrome)
كتبت "01a2-3 456"       -> القيمة "0123456"       الإطار أحمر rgb(220, 38, 38)، من غير رسالة
كتبت "01312345678"      -> القيمة "01312345678"   الإطار أحمر + "الرقم مش صحيح"
كتبت "0101234567899"    -> القيمة "01012345678"   الإطار رمادي rgb(204, 204, 204)، من غير رسالة
~~~

- الحروف والشرطة والمسافة اتشالوا وانا بكتب.
- [[013...]] ١١ رقم بس التالت 3 مش في [[ [0125] ]]، فالرسالة ظهرت.
- ١٣ رقم اتقصوا ١١ بسبب [[maxLength]]، والناتج رقم صح.

> على الموبايل [[keyboardType]] بيغيّر شكل الكيبورد بس. اللصق ممكن يدخّل أي حاجة، عشان كده الـ [[replace]] والـ regex لازم يفضلوا.

---

## ٧. الـ solCode: «التالي» ينقلك للباسورد

### [[const passwordRef = useRef<TextInput>(null);]]

[[useRef]] بيعمل «علبة» ثابتة بين الـ renders، و [[<TextInput>]] نوع اللي جواها، وبتبدأ [[null]]. ولما تحط [[ref={passwordRef}]] على الخانة التانية، React بيحط الخانة نفسها في [[passwordRef.current]].

### الخانة الأولى

| الـ prop | معناه |
|---|---|
| [[onChangeText={setPhone}]] | تبعت الدالة نفسها، لأن [[setPhone]] بتاخد النص زي ما هو |
| [[returnKeyType="next"]] | زرار Enter في الكيبورد مكتوب عليه «التالي» |
| [[submitBehavior="submit"]] | لما تدوسه: ابعت submit، والكيبورد يفضل مفتوح |
| [[onSubmitEditing={() => passwordRef.current?.focus()}]] | لما تدوسه، ركّز على الخانة التانية |

[[?.]] (optional chaining): لو [[current]] لسه [[null]] متعملش حاجة بدل ما تقع.

### الخانة التانية والزرار

- [[secureTextEntry={!show}]]: النص مخفي (نقط) طول ما [[show]] بـ false.
- [[returnKeyType="done"]]: زرار «تم».
- [[onPress={() => setShow((s) => !s)}]]: اقلب [[show]].

~~~text الناتج (Chrome)
الخانتين:            type=tel enterkeyhint=next     |   type=password enterkeyhint=done
كتبت 0100 ودوست Enter -> الـ focus راح على "الباسورد"
كتبت secret ودوست "إظهار" -> الخانة بقت type=text وقيمتها "secret"، والزرار بقى "إخفاء"
~~~

[[returnKeyType]] على الويب بقى [[enterkeyhint]]، و [[secureTextEntry]] بقى [[type=password]].

---

## الخلاصة

| في الويب | في RN |
|---|---|
| [[<input type="tel">]] | [[keyboardType="phone-pad"]] |
| [[<input type="password">]] | [[secureTextEntry]] |
| [[onChange={(e) => e.target.value}]] | [[onChangeText={(t) => ...}]] |
| [[<label for>]] | [[Text]] فوق + [[accessibilityLabel]] |
| Tab للخانة الجاية | [[returnKeyType="next"]] + [[onSubmitEditing]] + [[ref]] |`,
          lines: [
            "useState عادي.",
            "الـ components.",
            "خانة رقم موبايل مصري.",
            "النص في state.",
            "validation بسيط: 01 وبعدها 0 أو 1 أو 2 أو 5 وبعدها ٨ أرقام.",
            "بيرجّع JSX.",
            "صندوق الخانة.",
            R`الـ label نص عادي فوق الخانة.`,
            "بداية TextInput.",
            "controlled: القيمة من الـ state.",
            R`[[onChangeText]] بيدّيك النص مباشرة، وبنشيل أي حاجة مش رقم.`,
            "كيبورد أرقام التليفون.",
            "hint للـ autofill.",
            "أقصى عدد حروف.",
            "نص باهت لما الخانة فاضية.",
            "اسم الخانة لقارئ الشاشة وللاختبارات.",
            "ستايل، والإطار أحمر لو الرقم غلط.",
            "قفلة.",
            "رسالة خطأ لما يكمّل ١١ رقم والرقم غلط.",
            "قفلة الصندوق.",
            "قفلة الـ return.",
            "قفلة الدالة."
          ],
          sol: R`لما تدوس «التالي» في خانة الموبايل المفروض الـ focus ينتقل للباسورد والكيبورد يتغير لكيبورد حروف عادي. زرار «إظهار» بيقلب [[secureTextEntry]] والنص يبان.

لو [[passwordRef.current?.focus()]] مش بيعمل حاجة: اتأكد إنك حاطط [[ref={passwordRef}]] على الـ TextInput نفسه مش على View حواليه. ولو الكيبورد بيتقفل ويفتح تاني بين الخانتين: ده عادي على Android مع [[returnKeyType="next"]] من غير [[submitBehavior="submit"]].`,
          solCode: R`import { useRef, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

export function LoginFields() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const passwordRef = useRef<TextInput>(null);
  return (
    <View style={{ gap: 8 }}>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        returnKeyType="next"
        submitBehavior="submit"
        onSubmitEditing={() => passwordRef.current?.focus()}
        accessibilityLabel="رقم الموبايل"
      />
      <TextInput
        ref={passwordRef}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!show}
        returnKeyType="done"
        accessibilityLabel="الباسورد"
      />
      <Pressable accessibilityRole="button" onPress={() => setShow((s) => !s)}>
        <Text>{show ? 'إخفاء' : 'إظهار'}</Text>
      </Pressable>
    </View>
  );
}`
        },
        {
          cmd: "ScrollView و SafeArea",
          title: "الشاشة مش بتعمل scroll لوحدها: ScrollView و SafeAreaView",
          desc: R`في الويب الصفحة بتعمل scroll لوحدها. في RN لأ: لو المحتوى أطول من الشاشة، الزيادة بتتقص. عشان تعمل scroll لازم تلف المحتوى في [[ScrollView]].

والحاجة التانية: الشاشات الحديثة فيها notch وشريط حالة فوق وشريط gestures تحت، والتطبيق بيترسم تحتهم (edge-to-edge، وده إجباري على Android الحديث). [[SafeAreaView]] من [[react-native-safe-area-context]] (أو [[useSafeAreaInsets]]) بيحط padding بالمقاس الصح عشان المحتوى ميتغطاش.`,
          example: R`import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AboutScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }} keyboardShouldPersistTaps="handled">
        {Array.from({ length: 30 }, (_, i) => (
          <Text key={i}>فقرة رقم {i + 1}</Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}`,
          try: R`شيل الـ [[ScrollView]] وسيب الفقرات في [[View]]: الفقرات الأخيرة راحت فين؟ وبعدين حط [[justifyContent: 'center']] في [[style]] بتاع الـ ScrollView بدل [[contentContainerStyle]] واقرا التحذير.`,
          flag: "script",
          deep: {
            why: R`أول شاشة «About» أو «Settings» هتكتبها هتلاقي آخرها مقصوص، أو العنوان تحت الـ notch على iPhone. الاتنين بيبانوا على أجهزة معينة بس، فلازم تعرفهم قبل ما المستخدمين يبعتوا screenshots.`,
            how: R`[[ScrollView]] بيرسم كل أولاده مرة واحدة (حتى اللي برّه الشاشة). ده تمام لـ 30 فقرة، ومصيبة لـ 1000 عنصر: هنا [[FlatList]] (الدرس الجاي).

عنده ستايلين: [[style]] للإطار الخارجي (حجمه في الشاشة، غالبًا [[flex: 1]])، و [[contentContainerStyle]] للمحتوى اللي جوه (padding و gap و alignItems). [[justifyContent]] و [[alignItems]] مكانهم الـ content container، و RN بيطلّع خطأ لو حطيتهم في [[style]].

[[keyboardShouldPersistTaps="handled"]]: من غيرها أول ضغطة على زرار والكيبورد مفتوح بتقفل الكيبورد بس ومش بتضغط الزرار.

SafeArea: [[SafeAreaView]] من [[react-native-safe-area-context]] (مش من react-native، اللي هناك iOS بس و deprecated). [[edges]] بتختار أنهي حواف. ولو عايز الخلفية تفضل ممتدة تحت الـ notch والمحتوى بس اللي ينزل، استخدم [[useSafeAreaInsets()]] وحط [[paddingTop: insets.top]] بنفسك. وخد بالك: شاشات جوه Stack أو Tabs من Expo Router الـ header والـ tab bar بيعملوا الـ safe area بتاعتهم، فمتكررهاش.`,
            when: R`ScrollView: شاشة محتواها محدود (فورم، صفحة تفاصيل، إعدادات). أي قايمة من API أو طويلة: FlatList. SafeArea: أي شاشة مفيهاش header من الـ navigator.`,
            mistakes: R`[[FlatList]] جوه [[ScrollView]] بنفس الاتجاه: تحذير «VirtualizedLists should never be nested» والـ virtualization بتبوظ. استخدم [[ListHeaderComponent]] في الـ FlatList بدل كده. و [[SafeAreaView]] من [[react-native]] بدل safe-area-context. و [[flex: 1]] ناقص على الأب فالـ ScrollView ارتفاعه صفر أو بياخد المحتوى كله ومش بيعمل scroll.`
          },
          teach: R`## الفكرة: ٣ طبقات، كل واحدة ليها شغلانة

الشاشة في المثال ٣ صناديق جوه بعض: [[SafeAreaView]] بيبعد المحتوى عن الـ notch وشريط الـ gestures، وجواه [[ScrollView]] بيعمل scroll، وجواه ٣٠ فقرة. هنفك كل طبقة، وبعدين نقيس.

> اتجرّب على Expo SDK 57 (react-native-safe-area-context 5.7) على الويب في Chrome بشاشة 390×844. على الويب مفيش notch، فالـ safe area بـ 0، وشكلها على الموبايل من الـ docs.

---

## ١. الـ imports

- [[import { ScrollView, Text } from 'react-native';]]
- [[import { SafeAreaView } from 'react-native-safe-area-context';]]: من مكتبة منفصلة (موجودة في القالب)، **مش** من [[react-native]]. اللي في react-native بنفس الاسم قديم، iOS بس، و deprecated.

---

## ٢. [[<SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>]]

- [[flex: 1]]: خد الشاشة كلها.
- [[edges={['top', 'bottom']}]]: حط padding فوق (الـ notch وشريط الحالة) وتحت (شريط الـ gestures) بس. الحواف التانية [['left']] و [['right']] (بتفرق لما الموبايل يتلف بالعرض).

القيمة نفسها بتيجي من النظام: على آيفون فيه notch ممكن تبقى حوالي 47 فوق و 34 تحت، وعلى الويب 0:

~~~text الناتج (Chrome)
SafeAreaView:  height=844   padding=0px
~~~

---

## ٣. [[<ScrollView contentContainerStyle={{ padding: 16, gap: 12 }} keyboardShouldPersistTaps="handled">]]

الـ ScrollView ليه ستايلين، وده أهم حاجة في الدرس:

| الـ prop | بيتطبق على | بتحط فيه |
|---|---|---|
| [[style]] | الإطار نفسه (الشباك اللي بتبص منه) | حجمه ومكانه، غالبًا [[flex: 1]] |
| [[contentContainerStyle]] | الصندوق الطويل اللي جوه وبيتحرك | [[padding]] و [[gap]] و [[alignItems]] و [[justifyContent]] |

و [[keyboardShouldPersistTaps="handled"]]: لو الكيبورد مفتوح وضغطت زرار، الضغطة توصل للزرار. من غيره (الافتراضي [['never']]) أول ضغطة بتقفل الكيبورد بس. ده على الموبايل، مش ليه أثر على الويب.

---

## ٤. [[{Array.from({ length: 30 }, (_, i) => ( ... ))}]]

من جوه لبرة:

1. [[{ length: 30 }]]: object شبه array طوله ٣٠.
2. [[Array.from(..., fn)]]: اعمل array حقيقي من ٣٠ عنصر، وكل عنصر قيمته اللي الدالة بترجّعه.
3. [[(_, i) =>]]: الدالة بتاخد (العنصر، رقمه). العنصر مش محتاجينه فاسمه [[_]] (عرف معناه «مش مستخدم»)، و [[i]] من 0 لـ 29.
4. [[<Text key={i}>فقرة رقم {i + 1}</Text>]]: [[key]] لازم لأي عنصر في list (درس key في «تاب React»)، و [[i + 1]] عشان العد يبدأ من 1.

---

## ٥. القياس

~~~text الناتج (Chrome، شاشة 390x844)
SafeAreaView:     height=844
ScrollView:       height=844   overflow-y=auto
content container: height=950   padding=16px   gap=12px
الفقرة:           height=19، والمسافة من فقرة للي بعدها 31 (19 + 12)
~~~

- الـ content container ارتفاعه 950 = 16 + 30 × 19 + 29 × 12 + 16. ده أطول من الشاشة (844) بـ 106، فالـ ScrollView بيسمح تنزل الـ 106 دول.
- الـ ScrollView نفسه طوله الشاشة بالظبط، لأن أبوه [[flex: 1]].

---

## ٦. التجربة الأولى: [[View]] بدل [[ScrollView]]

~~~text الناتج (Chrome)
الفقرات: 30   الظاهرة كاملة: 27   آخر فقرة عند y=915 (الشاشة 844)
مفيش أي عنصر بيعمل scroll
~~~

الـ View رسم الـ ٣٠، بس الأخيرة تحت حافة الشاشة ومفيش أي طريقة توصلها، ومن غير أي error. في الويب الصفحة كانت هتعمل scroll لوحدها، في RN لأ.

---

## ٧. التجربة التانية: [[justifyContent]] في [[style]]

حطيت [[style={{ justifyContent: 'center' }}]] على الـ ScrollView:

~~~text الناتج (Chrome)
pageerror: ScrollView child layout (["justifyContent"]) must be applied through the contentContainerStyle prop.
~~~

الشاشة فضيت، لأن RN بيرمي error لما تحط ستايل بيرتّب الأولاد على الإطار بدل المحتوى. على الموبايل نفس الرسالة بتظهر كـ Invariant Violation (من الـ docs). الحل: [[contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}]]، و [[flexGrow: 1]] عشان المحتوى القصير يبقى طوله الشاشة على الأقل فيبقى فيه «نص» يتوسّط فيه.

---

## الخلاصة

| عايز | استخدم |
|---|---|
| محتوى أطول من الشاشة (عدد محدود) | [[ScrollView]] |
| قايمة طويلة أو من API | [[FlatList]] (الدرس الجاي) |
| حجم الإطار | [[style]] على الـ ScrollView |
| padding و gap وترتيب المحتوى | [[contentContainerStyle]] |
| المحتوى ميتغطاش بالـ notch | [[SafeAreaView]] من [[react-native-safe-area-context]] أو [[useSafeAreaInsets()]] |

وشاشة جوه Stack أو Tabs بـ header: الـ navigator بيعمل الـ safe area بتاع الحتة دي، فمتكررهاش.`,
          lines: [
            "ScrollView من react-native.",
            "SafeAreaView من safe-area-context، مش من react-native.",
            "شاشة.",
            "بيرجّع JSX.",
            "ياخد الشاشة كلها، ويبعد عن الـ notch وشريط الـ gestures.",
            R`الإطار بيعمل scroll، و [[contentContainerStyle]] ستايل المحتوى نفسه. و [[handled]] عشان الضغطات توصل والكيبورد مفتوح.`,
            "٣٠ فقرة للتجربة.",
            R`كل عنصر في map محتاج [[key]] زي React.`,
            "قفلة الـ map.",
            "قفلة الـ ScrollView.",
            "قفلة الـ SafeArea.",
            "قفلة الـ return.",
            "قفلة الدالة."
          ],
          sol: R`من غير ScrollView، الفقرات الأخيرة مش هتظهر ومش هتقدر توصلها (على الويب بشاشة ارتفاعها 844 ظهر ٢٧ فقرة كاملة، والباقي اتقص، والعدد بيختلف حسب الشاشة): الـ View طوله الشاشة والزيادة بتتقص. مفيش أي error.

ومع [[justifyContent]] في [[style]]: RN بيرمي Invariant Violation فيه «ScrollView child layout (["justifyContent"]) must be applied through the contentContainerStyle prop». انقلها لـ [[contentContainerStyle]]، ولو عايز المحتوى في النص لما يكون قصير ضيف [[flexGrow: 1]] هناك كمان.`
        },
        {
          cmd: "FlatList",
          title: "FlatList: قايمة طويلة بترسم اللي ظاهر بس",
          desc: R`[[FlatList]] بياخد [[data]] (array) و [[renderItem]] (دالة بترسم عنصر واحد) و [[keyExtractor]] (مفتاح لكل عنصر). بيرسم العناصر اللي ظاهرة والقريبة منها بس (virtualization)، فقايمة فيها 10,000 عنصر بتشتغل.

فيه props جاهزة لكل حاجة بتحتاجها في قايمة: [[ListEmptyComponent]] لما تكون فاضية، و [[ListHeaderComponent]] و [[ListFooterComponent]]، و [[ItemSeparatorComponent]]، و [[onEndReached]] للتحميل الزيادة، و [[refreshControl]] للسحب لتحت. ولو محتاج أقسام بعناوين: [[SectionList]].`,
          example: R`import { FlatList, Text, View } from 'react-native';

type Order = { id: string; customer: string; total: number };

export function OrdersList({ orders }: { orders: Order[] }) {
  return (
    <FlatList
      data={orders}
      keyExtractor={(o) => o.id}
      renderItem={({ item }) => (
        <View style={{ padding: 16 }}>
          <Text>{item.customer}</Text>
          <Text>{item.total} جنيه</Text>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#eee' }} />}
      ListEmptyComponent={<Text style={{ padding: 24, textAlign: 'center' }}>مفيش طلبات لسه</Text>}
      contentContainerStyle={{ paddingBottom: 24 }}
    />
  );
}`,
          try: R`اعمل [[orders]] فيها 5000 عنصر بـ [[Array.from]] واعرضها مرة بـ [[FlatList]] ومرة بـ [[ScrollView]] و map. لاحظ الوقت لحد ما الشاشة تظهر. وبعدين ابعت array فاضي وشوف الـ empty state.`,
          flag: "script",
          deep: {
            why: R`معظم شاشات التطبيقات قوايم: منتجات، رسايل، طلبات، إشعارات. [[ScrollView]] + map بيرسم كله مرة واحدة، فشاشة بـ 1000 عنصر بتاخد ثواني تفتح وبتاكل الذاكرة. [[FlatList]] بيحل ده، وهو اللي هيتسألك عنه في أي انترفيو RN.`,
            how: R`FlatList مبني على [[VirtualizedList]]: بيحسب إيه اللي في الشاشة، ويرسم «نافذة» حواليه ([[windowSize]] افتراضيًا 21، يعني 10 شاشات فوق و 10 تحت)، والعناصر اللي بعيد بتتشال من الشجرة. [[initialNumToRender]] (افتراضيًا 10) كام عنصر يترسم أول مرة.

[[keyExtractor]] بيرجّع string ثابت لكل عنصر، زي [[key]] في React بالظبط (reconciliation في «تاب React»). من غيره بيدوّر على [[item.key]] أو [[item.id]]، وبعدين الـ index.

[[renderItem]] بتاخد [[{ item, index }]]. وأي component بتمرره لـ [[ItemSeparatorComponent]] أو [[ListHeaderComponent]] ممكن يبقى component أو element.

FlatList بيعمل re-render للعناصر لما [[data]] تتغير (مقارنة بالمرجع). لو الـ renderItem معتمد على state تاني (العنصر المختار مثلًا)، ابعته في [[extraData]] وإلا الشكل مش هيتحدث.

الأداء بعمق (FlashList و memo و getItemLayout) في المستوى ٣.`,
            when: R`أي قايمة جاية من API أو ممكن تطول. [[ScrollView]] للمحتوى الثابت القليل. و [[FlashList]] من Shopify لما القايمة كبيرة جدًا أو العناصر تقيلة.`,
            mistakes: R`[[keyExtractor={(_, i) => String(i)}]]: نفس مشكلة الـ key بالـ index. و [[data]] بتتعمل من جديد كل render ([[data={orders.filter(...)}]] من غير useMemo): شغالة بس بتعيد حسابات. وتحط FlatList جوه ScrollView. ونسيان [[extraData]] لما الـ selection في state بره الـ data.`
          },
          teach: R`## الفكرة: قولّه البيانات وإزاي يرسم عنصر واحد، وهو يتصرف

في [[ScrollView]] انت بترسم كل العناصر بنفسك بـ [[map]]. في [[FlatList]] انت بتديله الـ array ([[data]]) ودالة بترسم عنصر واحد ([[renderItem]])، وهو بيقرر يرسم مين وإمتى: اللي ظاهر والقريب منه بس. ده اسمه virtualization.

> اتجرّب على Expo SDK 57 على الويب في Chrome بشاشة 390×844: ٥٠٠٠ طلب مرة بـ FlatList ومرة بـ ScrollView و map، وعدّيت العناصر الموجودة فعلًا في الصفحة.

---

## ١. [[type Order = { id: string; customer: string; total: number };]]

شكل الطلب الواحد: رقم (string)، واسم العميل، والإجمالي. TypeScript هيعرف منه نوع [[item]] تحت لوحده.

---

## ٢. [[export function OrdersList({ orders }: { orders: Order[] })]]

prop واحد: [[orders]]، و [[Order[] ]] معناها array من Order.

---

## ٣. الـ [[FlatList]] prop بـ prop

### [[data={orders}]]

الـ array اللي هيترسم.

### [[keyExtractor={(o) => o.id}]]

دالة بتاخد عنصر وترجّع string ثابت ومختلف لكل عنصر. ده نفس [[key]] في React: بيه بيعرف مين اتضاف ومين اتشال لما الـ data تتغير. لازم string، عشان كده الـ id string.

### [[renderItem={({ item }) => ( ... )}]]

الدالة بتاخد object فيه [[item]] (العنصر) و [[index]] (رقمه)، وإحنا فكّينا [[item]] بس. وبترجّع شكل عنصر واحد:

~~~text OrdersList.tsx
<View style={{ padding: 16 }}>
  <Text>{item.customer}</Text>
  <Text>{item.total} جنيه</Text>
</View>
~~~

### [[ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#eee' }} />}]]

component بيترسم **بين** كل عنصرين (مش قبل الأول ولا بعد الأخير): خط ارتفاعه 1 رمادي فاتح.

### [[ListEmptyComponent={<Text ...>مفيش طلبات لسه</Text>}]]

بيظهر بدل القايمة لو [[data]] فاضية. هنا element جاهز (مش دالة)، والاتنين مقبولين.

### [[contentContainerStyle={{ paddingBottom: 24 }}]]

زي ScrollView بالظبط (FlatList مبني فوقه): ستايل المحتوى اللي بيتحرك. مسافة تحت آخر عنصر.

---

## ٤. الـ solCode: ٥٠٠٠ طلب

~~~text الـ solCode
const orders = Array.from({ length: 5000 }, (_, i) => ({
  id: String(i + 1),
  customer: $__btعميل $__{i + 1}$__bt,
  total: (i * 37) % 900 + 100,
}));
~~~

- [[Array.from({ length: 5000 }, fn)]]: ٥٠٠٠ عنصر، كل واحد اللي [[fn]] بترجّعه.
- [[(_, i) => ({ ... })]]: الأقواس [[( )]] حوالين [[{ }]] عشان JavaScript يفهم إنه object مش جسم دالة.
- [[String(i + 1)]]: الـ id string: "1" و "2" ...
- [[$__btعميل $__{i + 1}$__bt]]: template string: «عميل 1» و «عميل 2».
- [[(i * 37) % 900 + 100]]: رقم «عشوائي» ثابت: [[%]] باقي القسمة، فالناتج من 0 لـ 899، و + 100 يخليه من 100 لـ 999.

~~~text الناتج (أول عنصرين في الشاشة)
عميل 1   100 جنيه      (0 × 37 % 900 + 100)
عميل 2   137 جنيه      (1 × 37 % 900 + 100)
~~~

---

## ٥. FlatList ضد ScrollView: الأرقام

~~~text الناتج (Chrome، من فتح الصفحة لحد ما «عميل 1» ظهر)
FlatList:          أول عنصر بعد 968 ms     في الصفحة: 60 عنصر
ScrollView + map:  أول عنصر بعد 2586 ms    في الصفحة: 5000 عنصر
~~~

وبعد ثانية ونص من غير ما ألمس حاجة:

~~~text الناتج
FlatList:          131 عنصر     كل عناصر الصفحة (DOM nodes): 685
ScrollView + map:  5000 عنصر    كل عناصر الصفحة: 15029
~~~

- FlatList رسم أول دفعة ([[initialNumToRender]] افتراضيًا 10)، وبعدين بيكمّل دفعات صغيرة لحد ما يغطي «نافذة» حوالين اللي ظاهر.
- ScrollView مبيعرضش حاجة لحد ما يخلص الـ ٥٠٠٠ كلهم: ٣ عناصر لكل طلب (View و ٢ Text) = حوالي ١٥ ألف.
- الـ 968 ms فيها تحميل الصفحة نفسها، فالفرق الحقيقي في الرسم أكبر. وده على كمبيوتر: على موبايل متوسط الفرق أوضح.
- لما نزلت لتحت ([[scrollTop = 30000]]) الـ FlatList وصل لـ 251 عنصر: بيرسم وانت نازل، مش مرة واحدة.

---

## ٦. القايمة الفاضية

[[<OrdersList orders={[]} />]]:

~~~text الناتج (Chrome)
"مفيش طلبات لسه"
~~~

ولو عايزها في نص الشاشة رأسيًا: [[contentContainerStyle={{ flexGrow: 1 }}]] على الـ FlatList، و [[flex: 1]] و [[justifyContent: 'center']] على الـ empty component.

---

## الخلاصة

| الـ prop | بيعمل إيه |
|---|---|
| [[data]] | الـ array |
| [[renderItem]] | يرسم عنصر واحد من [[{ item, index }]] |
| [[keyExtractor]] | مفتاح string ثابت (مش الـ index) |
| [[ItemSeparatorComponent]] | بين كل عنصرين |
| [[ListEmptyComponent]] | لما الـ data فاضية |
| [[ListHeaderComponent]] و [[ListFooterComponent]] | فوق وتحت، بيعملوا scroll مع القايمة |
| [[extraData]] | state تاني الـ renderItem معتمد عليه |

ScrollView لمحتوى ثابت قليل، و FlatList لأي قايمة بيانات.`,
          lines: [
            "FlatList من react-native.",
            "نوع العنصر.",
            "component بياخد الطلبات.",
            "بيرجّع JSX.",
            "بداية القايمة.",
            "الـ array.",
            "مفتاح ثابت لكل عنصر (string).",
            R`بترسم عنصر واحد، و [[item]] نوعه Order تلقائيًا.`,
            "صندوق العنصر.",
            "اسم العميل.",
            "الإجمالي.",
            "قفلة الصندوق.",
            "قفلة الـ renderItem.",
            "خط بين كل عنصرين.",
            "لو الـ array فاضي.",
            "ستايل المحتوى زي ScrollView.",
            "قفلة الـ FlatList.",
            "قفلة الـ return.",
            "قفلة الدالة."
          ],
          sol: R`مع 5000 عنصر، الـ FlatList بيظهر فورًا تقريبًا لأنه بيرسم أول 10 بس وبيكمّل وانت بتنزل. الـ ScrollView بيتأخر ثانية أو أكتر (حسب الجهاز) قبل ما يظهر أي حاجة، والـ scroll بعدها ممكن يبقى تقيل، والذاكرة أعلى بكتير (شوفها في الـ Performance Monitor من قايمة الـ dev).

ومع array فاضي: النص «مفيش طلبات لسه» في النص. ولو مش ظاهر في النص رأسيًا ضيف [[flexGrow: 1]] للـ [[contentContainerStyle]] و [[flex: 1]] + [[justifyContent: 'center']] للـ empty component.`,
          solCode: R`const orders = Array.from({ length: 5000 }, (_, i) => ({
  id: String(i + 1),
  customer: $__btعميل $__{i + 1}$__bt,
  total: (i * 37) % 900 + 100,
}));
// <OrdersList orders={orders} />
// <OrdersList orders={[]} />`
        }
      ]
    }
]);
