// تكملة تاب rn: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/rn/01.js (شرح حقول الدرس في أوله)
MORE("rn", [
    {
      t: "العربي و RTL",
      l: 2,
      n: "التطبيق بيتقلب يمين لشمال لوحده لو اتظبط صح: I18nManager و start/end والأرقام والخطوط",
      items: [
        {
          cmd: "I18nManager و RTL",
          title: "RTL في RN: التطبيق كله بيتقلب، بس محتاج reload",
          desc: R`في RN الـ RTL على مستوى التطبيق كله مش عنصر عنصر: لما [[I18nManager.isRTL]] يبقى true، كل [[flexDirection: 'row']] بيتقلب، و [[marginStart]] بتبقى يمين، و [[textAlign: 'left']] بتبقى يمين كمان، والـ navigation (زرار الرجوع والسحب) بتتقلب. وده بيحصل لوحده لو لغة الجهاز عربي والتطبيق بيدعم RTL.

في Expo، دعم RTL بيتظبط في plugin [[expo-localization]] في app.json ([[supportsRTL]]، و [[forcesRTL]] لو التطبيق عربي بس). وتغيير الاتجاه وقت التشغيل ([[I18nManager.forceRTL(true)]]) مش بيتطبق غير بعد ما التطبيق يعيد التحميل ([[Updates.reloadAsync()]])، ومش شغال في Expo Go.`,
          example: R`// app.json -> expo.plugins
// ["expo-localization", { "supportsRTL": true }]
import { getLocales } from 'expo-localization';
import { I18nManager, StyleSheet, Text, View } from 'react-native';

export function RtlDemo() {
  const lang = getLocales()[0]?.languageCode ?? 'en';
  return (
    <View style={styles.row}>
      <View style={styles.avatar} />
      <Text style={styles.name}>{lang === 'ar' ? 'سارة أحمد' : 'Sara Ahmed'} ({I18nManager.isRTL ? 'RTL' : 'LTR'})</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingStart: 16 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#cbd5e1' },
  name: { textAlign: 'left', writingDirection: 'auto' },
});`,
          try: R`ضيف [[forcesRTL: true]] في إعدادات الـ plugin واعمل development build (أو غيّر لغة الـ emulator لعربي). الصف اتقلب؟ الـ [[paddingStart]] راح فين؟ و [[textAlign: 'left']] عمل إيه؟ وبعدين حط أيقونة سهم [[→]] في زرار «التالي»: محتاج تقلبها بإيدك؟`,
          flag: "script",
          deep: {
            why: R`لو بتعمل تطبيق للسوق المصري أو الخليجي، العربي مش feature إضافية. تطبيق عربي بـ layout شمال ليمين بيبان «مترجم» ورخيص. والخبر الحلو إن RN بيعمل أغلب الشغل لوحده لو ماكتبتش [[left]] و [[right]] في كل حتة.`,
            how: R`[[I18nManager.isRTL]] بيتحدد وقت فتح التطبيق من لغة النظام والإعدادات (native)، وبعدها ثابت. Yoga بيقلب محور الـ row، والـ properties الـ logical ([[marginStart]] و [[paddingEnd]] و [[start]] و [[end]] و [[borderStartWidth]]) بتتقلب. [[left]] و [[right]] بتتقلب كمان افتراضيًا في RN (عكس CSS)، بس الأوضح تكتب start/end عشان أي حد يقرا الكود يفهم.

[[textAlign: 'left']] في RTL بيتحول يمين (بيتعامل كـ «start»). و [[writingDirection: 'auto']] بيخلي النص المختلط (عربي فيه كلمة English أو رقم) يتعرض صح.

الأيقونات الاتجاهية (أسهم، و chevron) مش بتتقلب لوحدها: [[transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]]]. والأيقونات اللي ليها معنى ثابت (ساعة، play) متقلبهاش.

الـ plugin: [[supportsRTL]] بيسمح للتطبيق يتقلب لما لغة الجهاز RTL (في SDK 57 ده بيتظبط من plugin الـ localization، والـ docs بتوضح إزاي تقفله بـ false). [[forcesRTL]] بيجبره RTL دايمًا. والتغيير وقت التشغيل: [[I18nManager.allowRTL]] و [[forceRTL]] وبعدين [[Updates.reloadAsync()]] من [[expo-updates]].

على الويب: [[getLocales()[0].textDirection]] وتحطه [[dir]] على الـ root View.

الكود متفحوص بالـ typecheck، و [[getLocales]] شغالة في Jest (الـ mock بتاع jest-expo). شكل الـ RTL الفعلي محتاج جهاز.`,
            when: R`أي تطبيق فيه عربي. وخليها من أول يوم: تحويل تطبيق كامل مكتوب بـ left/right لـ RTL بعدين شغل أسبوع.`,
            mistakes: R`[[marginLeft]] و [[paddingRight]] في كل حتة، وبعدين تكتشف إن الشكل مش متناسق. وتقلب الـ layout بإيدك بـ [[flexDirection: isRTL ? 'row-reverse' : 'row']] وفي نفس الوقت RN بيقلبه، فيرجع زي ما كان! وتتوقع إن [[forceRTL]] يتطبق فورًا. وتنسى الأيقونات الاتجاهية. وفي Expo Go تجرّب الـ forceRTL وتستغرب إنه مش شغال.`
          },
          teach: R`## الفكرة: ستايل واحد بيشتغل في الاتجاهين

المثال component فيه صف: دايرة (صورة) واسم، وبيكتب جنب الاسم الاتجاه الحالي. مفيش ولا سطر بيقول «لو عربي اعمل كذا» في الـ layout: [[row]] و [[paddingStart]] و [[textAlign]] بيتقلبوا لوحدهم لما التطبيق يبقى RTL. اتجرّب في مشروع Expo SDK 57 بـ [[expo-localization]] 57.0.2: [[npx expo config]] للـ plugin، و Jest، ونسخة الويب في Chrome headless بلغة [[ar-EG]] و [[en-US]]. القلب الفعلي على Android و iOS محتاج جهاز (development build)، فده من الـ docs.

---

## ١. الـ plugin في [[app.json]]

~~~text app.json
"plugins": [
  ["expo-localization", { "supportsRTL": true }]
]
~~~

plugin يعني كود بيعدّل ملفات الـ native وقت الـ build. [[supportsRTL: true]] معناها «التطبيق ده جاهز يتقلب لو لغة الجهاز RTL». و [[forcesRTL: true]] (مش في المثال) معناها «دايمًا RTL حتى لو الجهاز إنجليزي».

[[npx expo config --type introspect]] بيوريك اللي الـ plugin هيكتبه:

~~~text الناتج
ExpoLocalization_supportsRTL = true
[{"$":{"name":"ExpoLocalization_supportsRTL","translatable":"false"},"_":"true"}]
~~~

السطر الأول في [[Info.plist]] بتاع iOS، والتاني في [[strings.xml]] بتاع Android. ولأنها إعدادات native، أي تغيير فيها محتاج build جديد، ومش بيشتغل في Expo Go.

## ٢. الـ imports ولغة الجهاز

~~~text src/components/RtlDemo.tsx
import { getLocales } from 'expo-localization';
import { I18nManager, StyleSheet, Text, View } from 'react-native';

export function RtlDemo() {
  const lang = getLocales()[0]?.languageCode ?? 'en';
~~~

- [[getLocales()]]: array لغات الجهاز بالترتيب اللي المستخدم اختاره. [[[0]]] أول لغة.
- [[?.languageCode]]: كود اللغة بس ([['ar']] من [['ar-EG']]). و [[?? 'en']] لو مفيش.
- [[I18nManager]]: من React Native نفسه، و [[I18nManager.isRTL]] بيقول التطبيق دلوقتي RTL ولا لأ.

اللي رجع في Chrome بلغة [[ar-EG]] (مختصر):

~~~text الناتج (Chrome)
{"languageTag":"ar-EG","languageCode":"ar","textDirection":"rtl","digitGroupingSeparator":"١","decimalSeparator":"٫","regionCode":"EG",...}
~~~

و [[textDirection: "rtl"]] جاهزة. وفي Jest الـ mock بتاع [[jest-expo]] بيرجّع [[en-US]] و [[isRTL false]]:

~~~text الناتج (Jest)
getLocales -> [{"languageTag":"en-US","languageCode":"en",...,"textDirection":"ltr",...}] | isRTL false
text -> [ 'Sara Ahmed', ' (', 'LTR', ')' ]
~~~

## ٣. الـ JSX

~~~text src/components/RtlDemo.tsx
  return (
    <View style={styles.row}>
      <View style={styles.avatar} />
      <Text style={styles.name}>{lang === 'ar' ? 'سارة أحمد' : 'Sara Ahmed'} ({I18nManager.isRTL ? 'RTL' : 'LTR'})</Text>
    </View>
  );
}
~~~

صف فيه دايرة واسم. الاسم بيتغير حسب اللغة، وجنبه الاتجاه.

## ٤. الستايل: كل سطر بيعمل إيه في RTL

~~~text src/components/RtlDemo.tsx
const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingStart: 16 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#cbd5e1' },
  name: { textAlign: 'left', writingDirection: 'auto' },
});
~~~

| الستايل | LTR | RTL (على الموبايل) |
|---|---|---|
| [[flexDirection: 'row']] | من الشمال لليمين | من اليمين للشمال: الدايرة يمين |
| [[paddingStart: 16]] | مسافة على الشمال | مسافة على اليمين |
| [[textAlign: 'left']] | شمال | **يمين** (RN بيعامل [[left]] كـ «البداية») |
| [[writingDirection: 'auto']] | | النص المختلط عربي وإنجليزي يتعرض صح |

- [[Start]] و [[End]] اسمهم logical properties: «البداية» و «النهاية» بدل «شمال» و «يمين». فيه منهم [[marginStart]] و [[paddingEnd]] و [[start]] و [[end]] و [[borderStartWidth]].
- [[gap: 12]] مسافة بين العناصر، مش بتتأثر بالاتجاه.
- [[borderRadius: 20]] نص العرض، فالـ View بقى دايرة.

---

## ٥. اللي حصل على الويب

على الويب مفيش [[I18nManager]] حقيقي: [[I18nManager.isRTL]] طلعت [[undefined]] (فالنص كتب LTR) حتى بلغة عربي. والصف مااتقلبش:

~~~text الناتج (Chrome، ar-EG، من غير dir)
direction: ltr  paddingLeft: 16px  paddingRight: 0px  avatarX: 16  nameX: 68
~~~

الطريقة على الويب (اللي في الـ deep): حط [[dir]] على View أب من [[getLocales()[0].textDirection]]:

~~~text demo.tsx
<View dir={getLocales()[0]?.textDirection ?? 'ltr'}>
  <RtlDemo />
</View>
~~~

~~~text الناتج (Chrome، ar-EG، بـ dir)
width: 1280  direction: rtl  paddingLeft: 0px  paddingRight: 16px  avatarX: 1224  nameX: 1121  textAlign: left
~~~

- الصف اتقلب: الدايرة عند x = 1224، يعني آخر الشاشة على اليمين (1280 - 16 padding - 40 عرضها).
- [[paddingStart]] بقى على اليمين ([[paddingRight: 16px]]).
- [[textAlign]] فضل [[left]] على الويب (CSS عادي)، بس النص هنا عرضه قد كلامه فمفيش فرق ظاهر.

ملحوظتين: لو غيّرت [[dir]] على [[html]] بعد ما الصفحة اترسمت، الصف اتقلب بس [[paddingStart]] فضل على الشمال، لأن react-native-web بيحسبه وقت الرسم. و TypeScript مش عارف [[dir]] على [[View]] (خطأ TS2769)، لأنها خاصية الويب بس، فلو استخدمتها هتحتاج تتعامل مع النوع.

---

## ٦. الـ solCode: سهم بيتقلب

~~~text src/components/RtlDemo.tsx
export function NextArrow() {
  return <Text style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}>→</Text>;
}
~~~

الـ layout بيتقلب لوحده، بس **الأيقونات والأسهم لأ**. سهم «التالي» [[→]] في العربي لازم يشاور شمال.

- [[transform]]: array تحويلات. [[scaleX: -1]] = مراية أفقية، و [[1]] = زي ما هو.
- فـ RTL مراية، و LTR عادي.

اتجرّب في Chrome: [[transform: matrix(1, 0, 0, 1, 0, 0)]] (يعني من غير قلب) لأن [[isRTL]] على الويب مش true. على موبايل RTL هيبقى [[matrix(-1, ...)]] (من الـ docs). والأيقونات اللي معناها مش اتجاه (ساعة، play) متقلبهاش.

---

## ٧. تغيير الاتجاه وقت التشغيل

ده من الـ docs (محتاج جهاز): [[I18nManager.forceRTL(true)]] بيحفظ الاختيار، بس [[isRTL]] مش بيتغير غير لما التطبيق يتحمّل من الأول، فبعدها [[Updates.reloadAsync()]] من [[expo-updates]]. ومش بيشتغل في Expo Go.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| التطبيق يتقلب مع لغة الجهاز | [[["expo-localization", { "supportsRTL": true }]]] + build جديد |
| دايمًا RTL | [[forcesRTL: true]] |
| مسافات وأماكن | [[Start]] و [[End]] مش [[Left]] و [[Right]] |
| صف | [[row]] عادي، متكتبش [[row-reverse]] بإيدك |
| سهم أو chevron | [[scaleX: I18nManager.isRTL ? -1 : 1]] |
| الويب | [[dir]] على View أب |

- [[isRTL]] بيتحدد مرة لما التطبيق يفتح، مش بيتغير وانت شغال.
- لو قلبت [[row]] بإيدك و RN قلبه كمان، بيرجع زي ما كان.`,
          lines: [
            "لغات الجهاز.",
            "I18nManager.",
            "صف فيه صورة واسم.",
            "أول لغة في إعدادات الجهاز.",
            "بيرجّع JSX.",
            "الصف: بيتقلب لوحده في RTL.",
            "الصورة: في RTL بتبقى يمين.",
            "الاسم وحالة الاتجاه.",
            "قفلة.",
            "قفلة الـ return.",
            "قفلة.",
            "الستايلات.",
            R`row عادي، و [[paddingStart]] بدل [[paddingLeft]].`,
            "الصورة.",
            R`[[left]] في RTL بيتعامل كـ start (يمين)، و [[auto]] للنص المختلط.`,
            "قفلة."
          ],
          sol: R`مع RTL: الصورة بقت يمين والاسم شمالها، و [[paddingStart]] بقى على اليمين، و [[textAlign: 'left']] بقى محاذي يمين، والنص بيقول RTL. كل ده من غير ولا سطر زيادة.

السهم [[→]] كنص مش هيتقلب، فـ «التالي» هيشاور ناحية الرجوع في العربي. الحل: اختار السهم حسب [[I18nManager.isRTL]]، أو اقلب الأيقونة بـ [[scaleX: -1]]. ولو لقيت الـ layout ماتقلبش: انت غالبًا في Expo Go، أو الـ plugin مش في app.json، أو معملتش build جديد بعد ما ضفته.`,
          solCode: R`import { I18nManager, Text } from 'react-native';

export function NextArrow() {
  return <Text style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}>→</Text>;
}`
        },
        {
          cmd: "الأرقام والخطوط العربي",
          title: "الأرقام والعملة والتواريخ بالعربي، والخط العربي",
          desc: R`[[Intl]] شغال في Hermes: [[new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' })]] بيكتب السعر بالعربي، و [[Intl.DateTimeFormat('ar-EG', { dateStyle: 'medium' })]] للتاريخ، و [[Intl.RelativeTimeFormat('ar')]] لـ «قبل 3 ساعات». وقرّر: أرقام عربية (٠١٢٣) ولا لاتينية (0123)؟ [[ar-EG]] بيطلّع عربية، و [[ar-EG-u-nu-latn]] بيخليها لاتينية مع باقي النص عربي.

والخط: خط النظام الافتراضي بيعرض عربي كويس، بس لو عايز خط زي Cairo أو IBM Plex Sans Arabic، حمّله بـ [[expo-font]] ([[useFonts]] أو الـ config plugin) وحطه في component [[AppText]] واحد.`,
          example: R`import { getLocales } from 'expo-localization';

const lang = getLocales()[0]?.languageCode ?? 'en';
const locale = lang === 'ar' ? 'ar-EG' : 'en-US';

export const formatPrice = (n: number) =>
  new Intl.NumberFormat(locale, { style: 'currency', currency: 'EGP' }).format(n);

export const formatDate = (d: Date) =>
  new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' }).format(d);

export const formatLatinDigits = (n: number) =>
  new Intl.NumberFormat('ar-EG-u-nu-latn').format(n);

const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });
export const hoursAgo = (h: number) => rtf.format(-h, 'hour');`,
          try: R`شغّل الدوال دي في Node ([[node -e]]) بـ [[ar-EG]] و [[en-US]] وقارن الناتج بالناتج في التطبيق (Hermes). وبعدين حمّل خط Cairo بـ [[useFonts]] واعمل [[AppText]] بيستخدمه.`,
          flag: "script",
          deep: {
            why: R`«١٬٢٥٠٫٠٠ ج.م.‏» ولا «EGP 1,250.00» ولا «1250 جنيه»؟ ده قرار منتج بيتكرر في كل شاشة. لو كل واحد كتب التنسيق بإيده هتلاقي ٤ أشكال في نفس التطبيق، و [[Intl]] بيحل ده بدالة واحدة.`,
            how: R`Hermes بيدعم [[Intl]] (NumberFormat و DateTimeFormat و RelativeTimeFormat و PluralRules وغيرهم) على Android و iOS، بس الناتج ممكن يختلف شوية عن Node أو Chrome لأن كل واحد معتمد على بيانات ICU مختلفة. عشان كده اختبر الشكل النهائي على جهاز، ومتكتبش اختبارات بتقارن string بالحرف مع ناتج Intl.

[[-u-nu-latn]] امتداد Unicode في الـ locale معناه «numbering system لاتيني». كتير من التطبيقات المصرية بتستخدم الأرقام اللاتينية حتى في الواجهة العربية، وده قرار منتج.

[[Intl.NumberFormat]] بتاخد وقت تتعمل، فاعملها مرة برّه الدالة لو هتستخدمها في list كبيرة (زي [[rtf]] في المثال).

الخطوط: [[expo-font]] بـ [[useFonts({ Cairo: require('./assets/fonts/Cairo.ttf') })]] وقت التشغيل، أو من SDK حديث الـ config plugin بتاعه بيحط الخط جوه الـ build فيبقى جاهز من أول frame. وخلي بالك إن [[fontWeight]] مع خط custom على Android محتاج ملف منفصل لكل وزن ([[Cairo-Bold]]) في أغلب الحالات.

جربت الدوال دي في Node 22 وقت الكتابة: [[formatPrice(1250)]] بـ [[ar-EG]] طلعت أرقام عربية وعملة ج.م.، و [[ar-EG-u-nu-latn]] طلعت 1,250 بأرقام لاتينية. ناتج Hermes نفسه مجربتوش.`,
            when: R`أي رقم أو سعر أو تاريخ بيظهر للمستخدم. والترجمة نفسها (النصوص) بـ [[i18next]] زي «تاب React» (درس [[react-i18next]])، بنفس الـ API تقريبًا في RN مع [[expo-localization]] بدل اكتشاف لغة المتصفح.`,
            mistakes: R`[[price + ' جنيه']] في كل حتة. و [[toLocaleString()]] من غير locale فيطلع حسب الجهاز (ساعات إنجليزي في نص عربي). واختبارات بتقارن ناتج Intl بالحرف وتفشل على CI. وتحمّل الخط في كل شاشة بدل مرة في الـ root layout.`
          },
          teach: R`## الفكرة: ملف واحد فيه كل التنسيقات

بدل ما كل شاشة تكتب [[price + ' جنيه']] بطريقتها، المثال ملف [[format.ts]] فيه ٤ دوال: سعر، وتاريخ، ورقم بأرقام لاتينية، و «من كام ساعة». كلهم مبنيين على [[Intl]]، وده جزء من JavaScript نفسها موجود في Hermes (محرك JS بتاع RN) وفي Node والمتصفح. اتشغّلوا في Node 24.19 (ICU 78.3) وفي نسخة الويب في Chrome headless، والناتج كان واحد في الاتنين. Hermes نفسه على موبايل مجربتوش، والـ docs بتقول إن ناتجه ممكن يختلف شوية (مسافة أو علامة).

---

## ١. اللغة والـ locale

~~~text src/lib/format.ts
import { getLocales } from 'expo-localization';

const lang = getLocales()[0]?.languageCode ?? 'en';
const locale = lang === 'ar' ? 'ar-EG' : 'en-US';
~~~

- [[lang]]: أول لغة في الجهاز ([['ar']] أو [['en']] ...).
- [[locale]]: كود فيه اللغة والبلد. [[ar-EG]] = عربي مصر، و [[en-US]] = إنجليزي أمريكا. البلد بتفرق: شكل العملة والتاريخ والأرقام.
- الاتنين برّه الدوال، فبيتحسبوا مرة واحدة لما الملف يتحمّل.

## ٢. السعر

~~~text src/lib/format.ts
export const formatPrice = (n: number) =>
  new Intl.NumberFormat(locale, { style: 'currency', currency: 'EGP' }).format(n);
~~~

- [[new Intl.NumberFormat(locale, options)]]: بيعمل formatter للأرقام.
- [[style: 'currency']] + [[currency: 'EGP']]: اكتبه كعملة، والعملة جنيه مصري (EGP كود العملة العالمي).
- [[.format(n)]]: حوّل الرقم لنص.

~~~text الناتج (Node 24 و Chrome)
ar-EG price 1250   "‏١٬٢٥٠٫٠٠ ج.م.‏"
en-US price 1250   "EGP 1,250.00"
~~~

في العربي: أرقام عربية ([[١٢٥٠]])، والفاصل بين الآلاف [[٬]] والعلامة العشرية [[٫]] (مش فاصلة ونقطة)، و [[ج.م.]]. وفيه حرفين مش باينين في الأول والآخر: [[U+200F]] اسمه Right-to-Left Mark، علامة اتجاه بتخلي النص يتعرض صح جنب كلام إنجليزي. عشان كده لو قارنت الناتج بنص كتبته بإيدك ([[=== '١٬٢٥٠٫٠٠ ج.م.']]) هيطلع [[false]].

## ٣. التاريخ

~~~text src/lib/format.ts
export const formatDate = (d: Date) =>
  new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' }).format(d);
~~~

[[dateStyle]] و [[timeStyle]] أشكال جاهزة ([['short']] و [['medium']] و [['long']] و [['full']]) بدل ما تحدد اليوم والشهر بإيدك. للحظة ٧ أكتوبر ٢٠٢٦ الساعة ٤:٣٠ العصر UTC، بتوقيت القاهرة:

~~~text الناتج
ar-EG date   "٠٧‏/١٠‏/٢٠٢٦، ٧:٣٠ م"
en-US date   "Oct 7, 2026, 7:30 PM"
~~~

[[م]] = مساءً. والساعة ٧:٣٠ مش ٤:٣٠ لأن الوقت بيتعرض بالـ time zone بتاع الجهاز (القاهرة +3 في الوقت ده من السنة).

## ٤. عربي بأرقام لاتينية

~~~text src/lib/format.ts
export const formatLatinDigits = (n: number) =>
  new Intl.NumberFormat('ar-EG-u-nu-latn').format(n);
~~~

[[-u-nu-latn]] امتداد Unicode جوه الـ locale: [[u]] = «فيه إعدادات زيادة»، و [[nu]] = numbering system، و [[latn]] = لاتيني. يعني «عربي مصر بس الأرقام 0123».

~~~text الناتج
ar-EG 1250             "١٬٢٥٠"
ar-EG-u-nu-latn 1250   "1,250"
~~~

تطبيقات مصرية كتير بتستخدم الأرقام اللاتينية حتى في الواجهة العربي. ده قرار منتج، والمهم يبقى واحد في التطبيق كله.

## ٥. «من كام ساعة»

~~~text src/lib/format.ts
const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });
export const hoursAgo = (h: number) => rtf.format(-h, 'hour');
~~~

- [[RelativeTimeFormat]]: وقت نسبي («من ساعة»، «بكرة»).
- [[numeric: 'auto']]: يكتب كلمات لما ينفع («أمس» بدل «قبل يوم واحد»).
- [[rtf.format(-h, 'hour')]]: السالب = في الماضي، والوحدة ساعة.
- [[rtf]] متعمل مرة برّه الدالة، لأن إنشاء formatter أتقل من استخدامه.

~~~text الناتج
ar -1 hour      "قبل ساعة واحدة"
ar -3 hour      "قبل 3 ساعات"
ar-EG -3 hour   "قبل ٣ ساعات"
en -3 hour      "3 hours ago"
ar -1 day       "أمس"
~~~

لاحظ إن [[rtf]] معمول بـ [[lang]] ([['ar']]) مش [[locale]] ([['ar-EG']]). و [['ar']] لوحدها أرقامها لاتينية ([[3]]) في بيانات CLDR 48، و [['ar-EG']] عربية ([[٣]]). فالمثال بيطلّع السعر بأرقام عربية و «قبل 3 ساعات» بأرقام لاتينية في نفس الشاشة. لو عايز شكل واحد، ابعت نفس الـ locale لكل الـ formatters.

---

## ٦. الـ solCode: خط عربي

~~~text src/components/AppText.tsx
import { useFonts } from 'expo-font';
import { Text, type TextProps } from 'react-native';

export function useAppFonts() {
  return useFonts({ Cairo: require('@/assets/fonts/Cairo-Regular.ttf'), 'Cairo-Bold': require('@/assets/fonts/Cairo-Bold.ttf') });
}
~~~

- [[useFonts]] من [[expo-font]]: بيحمّل ملفات الخطوط وبيرجّع [[[loaded, error]]]. تناديه مرة في الـ root layout، ومتعرضش الشاشات غير لما [[loaded]] يبقى [[true]].
- المفتاح ([[Cairo]] و [['Cairo-Bold']]) هو الاسم اللي هتكتبه في [[fontFamily]]. والوزن العريض ملف لوحده، لأن [[fontWeight: 'bold']] مع خط custom على Android مش بيشتغل في أغلب الحالات.
- [[require('...ttf')]]: الملف نفسه بيتحط جوه الـ bundle.

~~~text src/components/AppText.tsx
export function AppText({ style, ...props }: TextProps) {
  return <Text {...props} style={[{ fontFamily: 'Cairo', writingDirection: 'auto' }, style]} />;
}
~~~

- [[{ style, ...props }]]: خد [[style]] لوحده، والباقي كله في [[props]] (rest).
- [[{...props}]]: ابعت الباقي لـ [[Text]] زي ما هو.
- [[style={[default, style]}]]: الستايل في RN ممكن يبقى array، واللي بعد بيكسب. فالخط افتراضي، وأي ستايل بتبعته يغطي عليه.

الكود عدّى [[npx tsc --noEmit]]. تحميل الخط فعليًا محتاج ملفات Cairo في [[assets/fonts]] وتشغيل على جهاز، فالجزء ده من docs الـ [[expo-font]].

---

## الخلاصة

| عايز | الكود | الناتج بـ ar-EG |
|---|---|---|
| سعر | [[NumberFormat(locale, { style: 'currency', currency: 'EGP' })]] | ‏١٬٢٥٠٫٠٠ ج.م.‏ |
| تاريخ | [[DateTimeFormat(locale, { dateStyle, timeStyle })]] | ٠٧‏/١٠‏/٢٠٢٦، ٧:٣٠ م |
| أرقام لاتينية | [[ar-EG-u-nu-latn]] | 1,250 |
| وقت نسبي | [[RelativeTimeFormat(lang, { numeric: 'auto' })]] | قبل ٣ ساعات |
| خط | [[useFonts]] مرة + [[AppText]] | |

- ابعت نفس الـ locale لكل الـ formatters.
- متقارنش ناتج [[Intl]] بالحرف في الاختبارات: فيه علامات مخفية، والـ ICU بيختلف بين Node و Hermes.`,
          lines: [
            "لغة الجهاز.",
            "أول لغة.",
            "locale التنسيق.",
            "تنسيق السعر.",
            "عملة بالـ locale.",
            "تنسيق التاريخ.",
            "تاريخ ووقت.",
            "عربي بأرقام لاتينية.",
            R`[[-u-nu-latn]] = numbering system لاتيني.`,
            "formatter واحد يتعمل مرة.",
            "«قبل 3 ساعات» أو «3 hours ago»."
          ],
          sol: R`في Node 22: [[new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' }).format(1250)]] بتطلع حاجة زي «‏١٬٢٥٠٫٠٠ ج.م.‏» (أرقام عربية وعلامات اتجاه مخفية)، و [[en-US]] بتطلع «EGP 1,250.00»، و [[ar-EG-u-nu-latn]] بتطلع «1,250». و [[rtf.format(-3, 'hour')]] بـ [['ar']] طلعت «قبل 3 ساعات» بأرقام لاتينية، لأن [['ar']] لوحدها في بيانات CLDR الحديثة أرقامها لاتينية، أما [['ar-EG']] فعربية. فلو عايز شكل واحد في التطبيق كله، ابعت نفس الـ locale لكل الـ formatters.

في التطبيق ممكن تلاقي اختلاف صغير (مسافة أو علامة). ده طبيعي، وده سبب إن الاختبارات متقارنش الـ string بالحرف.`,
          solCode: R`// src/components/AppText.tsx
import { useFonts } from 'expo-font';
import { Text, type TextProps } from 'react-native';

export function useAppFonts() {
  return useFonts({ Cairo: require('@/assets/fonts/Cairo-Regular.ttf'), 'Cairo-Bold': require('@/assets/fonts/Cairo-Bold.ttf') });
}

export function AppText({ style, ...props }: TextProps) {
  return <Text {...props} style={[{ fontFamily: 'Cairo', writingDirection: 'auto' }, style]} />;
}`
        }
      ]
    },
    {
      t: "الأداء",
      l: 3,
      n: "قوايم سريعة بـ FlashList، و re-renders أقل مع React Compiler، و animations على الـ UI thread بـ Reanimated",
      items: [
        {
          cmd: "FlashList",
          title: "FlashList: قايمة بتعيد استخدام الـ views بدل ما تعمل جديد",
          desc: R`FlatList بيعمل component جديد لكل عنصر بيدخل الشاشة ويمسح اللي بيطلع. [[FlashList]] من Shopify بيعمل recycling: الـ view اللي طلع من فوق بيتعاد استخدامه للعنصر اللي داخل من تحت بـ props جديدة، زي RecyclerView في Android و UICollectionView في iOS. النتيجة: scroll أنعم وذاكرة أقل وشاشات بيضا أقل وانت بتنزل بسرعة.

الـ API تقريبًا نفس FlatList: [[data]] و [[renderItem]] و [[keyExtractor]]. في v2 (اللي شغالة على الـ New Architecture بس) مبقتش محتاج [[estimatedItemSize]]. ولو القايمة فيها أنواع مختلفة (رسالة نص، وصورة، وتاريخ)، [[getItemType]] بيخلي كل نوع يتعاد استخدامه من نوعه.`,
          example: R`import { FlashList } from '@shopify/flash-list';
import { Text, View } from 'react-native';

type Msg = { id: string; kind: 'text' | 'image' | 'day'; body: string };

function MessageRow({ msg }: { msg: Msg }) {
  if (msg.kind === 'day') return <Text style={{ textAlign: 'center', color: '#64748b', padding: 8 }}>{msg.body}</Text>;
  return (
    <View style={{ padding: 12 }}>
      <Text>{msg.kind === 'image' ? '📷 صورة' : msg.body}</Text>
    </View>
  );
}

export function Chat({ messages }: { messages: Msg[] }) {
  return (
    <FlashList
      data={messages}
      keyExtractor={(m) => m.id}
      getItemType={(m) => m.kind}
      renderItem={({ item }) => <MessageRow msg={item} />}
      maintainVisibleContentPosition={{ startRenderingFromBottom: true }}
    />
  );
}`,
          try: R`في [[MessageRow]] ضيف [[const [liked, setLiked] = useState(false)]] وزرار ♥ بيقلبها. اعمل like لأول رسالة، وانزل لتحت بسرعة: هتلاقي رسالة تانية عليها ♥ من غير ما تدوس. ليه؟ وصلّحها بـ [[useRecyclingState]].`,
          flag: "script",
          deep: {
            why: R`القوايم هي أكتر مكان بيبان فيه إن تطبيق RN «بطيء»: شاشة بيضا وانت بتعمل scroll سريع، أو تقطيع في feed فيه صور. FlashList بيحل أغلب ده من غير ما تغيّر طريقة تفكيرك، وده بيتسأل في الانترفيو: «FlatList ولا FlashList وليه؟».`,
            how: R`FlatList: كل عنصر بيخرج من الـ window بيتعمله unmount، وكل عنصر داخل mount جديد: إنشاء native views، و layout، وتشغيل الـ hooks من الأول. على موبايل متوسط مع عناصر تقيلة ده بيبان كـ blank cells.

FlashList: بيحتفظ بـ pool من الـ cells. العنصر اللي بيدخل بياخد cell موجودة ويتعمل لها re-render بالـ props الجديدة بس، وده أرخص بكتير من mount. [[getItemType]] بيعمل pool لكل نوع، فـ cell الصورة متتعادش كـ cell نص (وده كان هيعمل تغيير كبير في الشجرة).

العيب: الـ state المحلي جوه العنصر ([[useState]]) بيفضل مع الـ cell، مش مع الـ item. فلما الـ cell تتعاد لرسالة تانية، الـ state القديمة معاها. الحل: الـ state تبقى في البيانات نفسها (أو store)، أو [[useRecyclingState(initial, [item.id])]] اللي بيعمل reset لما الـ item يتغير. ونفس الكلام لـ shared values بتاعة Reanimated.

v2: مكتوبة من جديد للـ New Architecture، بتقيس أحجام العناصر sync فمبقتش محتاجة تقدير، وفيها [[masonry]] و [[maintainVisibleContentPosition]] للشات.

في الـ lab: شاشة المهام بـ FlashList شغالة في اختبار Jest (العناصر بتظهر، مع تحذير act من الـ recycler)، و [[expo install]] في SDK 57 ركّب 2.0.2. الإحساس الحقيقي بالسرعة محتاج جهاز، ويفضل release build.`,
            when: R`قوايم طويلة أو عناصرها تقيلة (صور، كروت)، أو feeds بيعمل فيها المستخدم scroll كتير. لقايمة ٢٠ عنصر ثابتة، FlatList كفاية. وقبل ما تغيّر المكتبة: اتأكد إن الـ renderItem نفسه مش تقيل (memo، وصور بحجمها).`,
            mistakes: R`[[useState]] جوه العنصر (مثال الـ like) فتلاقي state عنصر ظاهرة على عنصر تاني. و [[key]] جوه renderItem على العنصر الخارجي: بيمنع الـ recycling (كل key جديد = mount جديد). وتقيس الأداء في dev mode: الـ dev بطيء جدًا، قيس في release build ([[npx expo run:android --variant release]]).`
          },
          teach: R`## الفكرة: قايمة شات بـ ٣ أنواع صفوف، والـ views بتتعاد

المثال شاشة شات: component لصف واحد ([[MessageRow]]) بيرسم ٣ أشكال، وقايمة [[FlashList]] بترسم الرسايل. اتجرّب في مشروع Expo SDK 57 بـ [[@shopify/flash-list]] 2.0.2 (اللي [[npx expo install]] ركّبها)، في نسخة الويب في Chrome headless: قايمة فيها ٥٠٠ رسالة، وتجربة الـ like من الـ try. السرعة الحقيقية على موبايل (وفي release build) محتاجة جهاز.

---

## ١. النوع

~~~text src/components/Chat.tsx
import { FlashList } from '@shopify/flash-list';
import { Text, View } from 'react-native';

type Msg = { id: string; kind: 'text' | 'image' | 'day'; body: string };
~~~

[[kind]] نوعه union من ٣ نصوص بس: [['text']] أو [['image']] أو [['day']] (فاصل التاريخ). TypeScript هيرفض أي قيمة تانية.

## ٢. الصف

~~~text src/components/Chat.tsx
function MessageRow({ msg }: { msg: Msg }) {
  if (msg.kind === 'day') return <Text style={{ textAlign: 'center', color: '#64748b', padding: 8 }}>{msg.body}</Text>;
  return (
    <View style={{ padding: 12 }}>
      <Text>{msg.kind === 'image' ? '📷 صورة' : msg.body}</Text>
    </View>
  );
}
~~~

- فاصل التاريخ: [[Text]] لوحده في النص بلون رمادي. شجرة مختلفة خالص عن الرسالة.
- الرسالة: [[View]] فيه [[Text]]. لو صورة اكتب «📷 صورة»، غير كده النص.

## ٣. القايمة

~~~text src/components/Chat.tsx
export function Chat({ messages }: { messages: Msg[] }) {
  return (
    <FlashList
      data={messages}
      keyExtractor={(m) => m.id}
      getItemType={(m) => m.kind}
      renderItem={({ item }) => <MessageRow msg={item} />}
      maintainVisibleContentPosition={{ startRenderingFromBottom: true }}
    />
  );
}
~~~

| الـ prop | بيعمل إيه |
|---|---|
| [[data]] | الـ array كلها |
| [[keyExtractor]] | مفتاح ثابت لكل عنصر (الـ [[id]])، عشان القايمة تعرف مين هو مين لما البيانات تتغير |
| [[getItemType]] | نوع كل عنصر. FlashList بيعمل pool لكل نوع، فالـ view بتاع فاصل تاريخ مبيتعادش لرسالة |
| [[renderItem]] | بيرسم عنصر. بياخد object فيه [[item]]، و [[({ item })]] destructuring |
| [[maintainVisibleContentPosition]] | للشات: [[startRenderingFromBottom]] تبدأ من تحت (آخر رسالة)، والمكان بيفضل ثابت لما رسايل تتضاف |

نفس API بتاع FlatList تقريبًا. وفي v2 مفيش [[estimatedItemSize]]: بتقيس الأحجام لوحدها.

### recycling يعني إيه

FlatList: العنصر اللي بيطلع من الشاشة بيتشال (unmount)، واللي داخل بيتعمل جديد (mount). FlashList: بيحتفظ بعدد صغير من الـ views، واللي طلع من فوق بيتعاد للعنصر الداخل من تحت بـ props جديدة بس.

في Chrome، القايمة فيها ٥٠٠ رسالة، واللي في الصفحة فعلًا:

~~~text الناتج (Chrome)
chat rows in DOM (500 messages): 33
~~~

٣٣ صف بس للي ظاهر وشوية حواليه، مش ٥٠٠.

---

## ٤. الـ try: الـ state بتمشي مع الـ view

لو حطيت [[useState]] جوه الصف:

~~~text StateRow
function StateRow({ msg }: { msg: Msg }) {
  const [liked, setLiked] = useState(false);
  ...
~~~

قايمة ٣٠٠ رسالة، عملنا like لأول رسالة، ونزلنا لتحت:

~~~text الناتج (Chrome)
state | rows in DOM: 35 | liked: [ 'رسالة 0' ]
state | after scrolling down, liked rows visible: [ 'رسالة 66' ]
~~~

رسالة 66 عليها ♥ ومحدش داس عليها! الـ [[useState]] عايش في الـ component، والـ component ده نفسه (بالـ view بتاعه) اتعاد لرسالة 66 ومعاه [[liked = true]].

## ٥. الـ solCode: [[useRecyclingState]]

~~~text src/components/Chat.tsx
import { useRecyclingState } from '@shopify/flash-list';
import { Pressable, Text, View } from 'react-native';

function MessageRow({ msg }: { msg: Msg }) {
  const [liked, setLiked] = useRecyclingState(false, [msg.id]);
~~~

زي [[useState]] بالظبط، بس بياخد array تاني ([[[msg.id]]]): لما أي قيمة فيها تتغير (يعني الـ view اتعاد لرسالة تانية)، الـ state ترجع للقيمة الأولى ([[false]]).

~~~text src/components/Chat.tsx
  return (
    <View style={{ padding: 12, flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text>{msg.body}</Text>
      <Pressable onPress={() => setLiked(!liked)}>
        <Text>{liked ? '♥' : '♡'}</Text>
      </Pressable>
    </View>
  );
}
~~~

صف: النص على جنب، والقلب على الجنب التاني ([[space-between]]). الضغطة بتقلب [[liked]].

~~~text الناتج (Chrome)
recycling | rows in DOM: 35 | liked: [ 'رسالة 0' ]
recycling | after scrolling down, liked rows visible: []
~~~

مفيش ♥ غلط. بس خد بالك: لو رجعت لرسالة 0، الـ like بتاعها ضاع كمان، لأن الـ state اتمسحت. الحل الصح لبيانات حقيقية: الـ like جزء من الـ data (من السيرفر أو store)، والصف بيقراه من [[props]].

---

## الخلاصة

| | FlatList | FlashList |
|---|---|---|
| العنصر اللي بيطلع | unmount | الـ view بيتعاد لعنصر تاني |
| [[useState]] جوه الصف | بيضيع لما يطلع | بيظهر على عنصر تاني |
| أنواع مختلفة | | [[getItemType]] |
| حجم العنصر | | v2 بتقيسه لوحدها |

- مفتاح ثابت في [[keyExtractor]]، ومتحطش [[key]] على العنصر جوه [[renderItem]] (بيمنع إعادة الاستخدام).
- state العنصر في الـ data، أو [[useRecyclingState]] لحاجة مؤقتة.
- قيس السرعة في release build على موبايل متوسط، مش dev.`,
          lines: [
            "FlashList.",
            "الـ components.",
            "رسالة بنوع.",
            "صف رسالة.",
            "فاصل التاريخ شكل تاني خالص.",
            "بيرجّع JSX.",
            "صندوق.",
            "النص أو علامة صورة.",
            "قفلة.",
            "قفلة الـ return.",
            "قفلة.",
            "الشات.",
            "بيرجّع JSX.",
            "القايمة.",
            "البيانات.",
            "مفتاح ثابت.",
            "pool لكل نوع: cell الصورة متتعادش لنص.",
            "رسم عنصر.",
            "للشات: يبدأ من تحت ويحافظ على المكان لما رسايل تتضاف.",
            "قفلة.",
            "قفلة الـ return.",
            "قفلة."
          ],
          sol: R`الـ ♥ بيظهر على رسالة مدستش عليها لأن الـ [[useState]] عايش في الـ cell، والـ cell اتعادت لرسالة تانية ومعاها [[liked = true]]. في FlatList مكانش هيحصل (unmount بيمسح الـ state)، بس كان هيحصل حاجة تانية: الـ like يضيع لما ترجع لفوق.

[[useRecyclingState(false, [msg.id])]] بيعمل reset للقيمة لما [[msg.id]] يتغير، فالـ cell المعادة تبدأ بـ false. بس لاحظ إن الـ like نفسه لسه بيضيع لما الرسالة تطلع وترجع. الحل الصح لبيانات حقيقية: الـ liked جزء من الـ data (من السيرفر أو store)، والعنصر بيقراه من props.`,
          solCode: R`import { useRecyclingState } from '@shopify/flash-list';
import { Pressable, Text, View } from 'react-native';

function MessageRow({ msg }: { msg: Msg }) {
  const [liked, setLiked] = useRecyclingState(false, [msg.id]);
  return (
    <View style={{ padding: 12, flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text>{msg.body}</Text>
      <Pressable onPress={() => setLiked(!liked)}>
        <Text>{liked ? '♥' : '♡'}</Text>
      </Pressable>
    </View>
  );
}`
        },
        {
          cmd: "re-renders و React Compiler",
          title: "re-renders في RN: React Compiler، و memo، وإمتى بيفرقوا",
          desc: R`نفس قواعد «تاب React»: component بيعيد الرسم لما الـ state بتاعته أو الأب يتغير. في RN التكلفة أوضح لأن الـ JS thread واحد وبيعمل كل حاجة (المنطق، والـ render، والـ events)، فلو اتشغل بـ re-renders كتير، الضغطات بتتأخر والـ scroll بيقطّع.

القالب في SDK 57 مفعّل React Compiler ([[experiments.reactCompiler: true]] في app.json): بيعمل memoization تلقائي للـ components والقيم وقت الـ build، فأغلب [[useMemo]] و [[useCallback]] و [[memo]] اللي كنت بتكتبها بإيدك مبقتش لازمة. بس لازم تفهم إيه اللي بيعمله عشان تعرف لما مش بيكفي.`,
          example: R`import { memo, useCallback } from 'react';
import { FlatList, Pressable, Text } from 'react-native';

type Task = { id: number; title: string; done: boolean };

const TaskRow = memo(function TaskRow({ task, onToggle }: { task: Task; onToggle: (id: number) => void }) {
  return (
    <Pressable onPress={() => onToggle(task.id)}>
      <Text style={{ padding: 16, textDecorationLine: task.done ? 'line-through' : 'none' }}>{task.title}</Text>
    </Pressable>
  );
});

export function TaskList({ tasks, onToggle }: { tasks: Task[]; onToggle: (id: number) => void }) {
  const renderItem = useCallback(({ item }: { item: Task }) => <TaskRow task={item} onToggle={onToggle} />, [onToggle]);
  return <FlatList data={tasks} keyExtractor={(t) => String(t.id)} renderItem={renderItem} />;
}`,
          try: R`افتح React Native DevTools (دوس [[j]] في expo start)، وفعّل «Highlight updates» في تاب الـ Profiler. قلّب مهمة واحدة: كام صف اتلوّن؟ جرّب مرة بـ [[memo]] ومرة من غيره، ومرة والـ React Compiler مقفول ([[reactCompiler: false]]).`,
          flag: "script",
          deep: {
            why: R`«التطبيق تقيل» في RN غالبًا مش من RN نفسه، من re-renders زيادة: context كبير بيتغير كل ثانية، أو دالة جديدة كل render بتكسر الـ memo في list فيها ٥٠٠ عنصر. لازم تعرف تقيس قبل ما تصلّح.`,
            how: R`RN فيه threads أساسية: الـ JS thread (كودك و React)، والـ UI/main thread (الرسم واللمس في النظام)، وخيط layout. لو الـ JS thread مشغول ١٠٠ms في render، أي [[onPress]] بيستنى، وأي animation مكتوبة بـ JS بتقف. الـ UI نفسه (الـ scroll الأصلي) بيفضل شغال، عشان كده تلاقي الـ scroll ماشي والعناصر بيضا (JS مش ملاحق يرسمها).

React Compiler: babel plugin بيحلل كل component ويعمل cache تلقائي للـ JSX والقيم المشتقة والدوال، كأنك كتبت [[useMemo]] و [[useCallback]] في كل حتة صح. بيفترض إنك ماشي على قواعد React (مفيش تعديل للـ props أو الـ state مباشرة، ومفيش side effects في الـ render). لو component مخالف، الـ compiler بيسيبه من غير تحسين. التفاصيل في «تاب React» (درس [[React Compiler]]).

من غير compiler: [[memo]] على الصف + [[useCallback]] للـ callback اللي نازل له، وإلا الـ memo مالوش لازمة لأن [[onToggle]] جديدة كل مرة. والـ [[renderItem]] نفسه لو inline بيتعمل جديد كل render.

القياس: React Native DevTools (نفس Chrome DevTools، فيه React Profiler و Components)، و «Perf Monitor» من قايمة الـ dev بيعرض FPS للـ JS و UI. والحكم النهائي على release build على موبايل متوسط، مش dev على موبايلك الغالي.

جربت الـ template في الـ lab: [[reactCompiler: true]] موجود، و [[babel-plugin-react-compiler]] متركب، والـ bundle اتبنى بيه في [[expo export]].`,
            when: R`خلي الـ compiler شغال. وفكّر في memo يدوي لما: الـ Profiler يوريك صفوف بتعيد رسم من غير سبب، أو مكتبة بتقارن props بالمرجع (زي FlatList و [[extraData]]). ومتعملش memo لكل حاجة من غير قياس.`,
            mistakes: R`[[memo]] على الصف و [[onToggle={() => toggle(id)}]] inline من الأب: الـ memo اتكسر. و context واحد فيه كل حاجة (user و theme و cart و socket) فأي تغيير بيعيد رسم التطبيق كله. وتقيس في dev mode وتستنتج إن RN بطيء. و [[console.log]] كتير في الـ render: في dev بيبطّأ جدًا.`
          },
          teach: R`## الفكرة: لما مهمة واحدة تتغير، صف واحد بس يترسم

المثال قايمة مهام: صف ملفوف في [[memo]]، وقايمة بتعدّي للصف دالة [[onToggle]] ثابتة. الهدف إن قلب مهمة واحدة يعيد رسم الصف ده بس مش القايمة كلها. اتجرّب في مشروع Expo SDK 57 بطريقتين: Jest (من غير React Compiler) ونسخة الويب في Chrome headless (بالـ compiler، زي التطبيق)، وعدّينا رسم الصفوف بعداد جوه الصف. React Native DevTools والـ Profiler محتاجين التطبيق شغال على جهاز أو emulator.

---

## ١. الـ imports والنوع

~~~text src/components/TaskList.tsx
import { memo, useCallback } from 'react';
import { FlatList, Pressable, Text } from 'react-native';

type Task = { id: number; title: string; done: boolean };
~~~

[[memo]] و [[useCallback]] من React نفسها. التفاصيل الكاملة في «تاب React»، وهنا بنشوفهم في قايمة RN.

## ٢. الصف في [[memo]]

~~~text src/components/TaskList.tsx
const TaskRow = memo(function TaskRow({ task, onToggle }: { task: Task; onToggle: (id: number) => void }) {
  return (
    <Pressable onPress={() => onToggle(task.id)}>
      <Text style={{ padding: 16, textDecorationLine: task.done ? 'line-through' : 'none' }}>{task.title}</Text>
    </Pressable>
  );
});
~~~

- [[memo(Component)]]: بيرجّع نسخة من الـ component **مش بتعيد الرسم** لو الـ props هي هي. «هي هي» يعني نفس المرجع ([[===]])، مش نفس الشكل: object جديد بنفس القيم = props اتغيرت.
- [[function TaskRow(...)]] باسم جوه [[memo]] عشان الاسم يظهر في DevTools.
- [[onToggle: (id: number) => void]]: نوع الدالة: بتاخد رقم ومبترجعش حاجة.
- [[textDecorationLine: task.done ? 'line-through' : 'none']]: خط على النص لو المهمة خلصت.

## ٣. القايمة و [[useCallback]]

~~~text src/components/TaskList.tsx
export function TaskList({ tasks, onToggle }: { tasks: Task[]; onToggle: (id: number) => void }) {
  const renderItem = useCallback(({ item }: { item: Task }) => <TaskRow task={item} onToggle={onToggle} />, [onToggle]);
  return <FlatList data={tasks} keyExtractor={(t) => String(t.id)} renderItem={renderItem} />;
}
~~~

- [[useCallback(fn, [onToggle])]]: يرجّع **نفس** الدالة في كل render طول ما [[onToggle]] متغيرتش. من غيره [[renderItem]] دالة جديدة كل مرة.
- [[keyExtractor={(t) => String(t.id)}]]: FlatList عايز المفتاح نص.

ولما مهمة تتقلب: الأب بيعمل array [[tasks]] جديدة فيها object جديد للمهمة دي بس، والباقي نفس الـ objects. فـ [[memo]] بيلاقي [[task]] و [[onToggle]] زي ما هم في ٩ صفوف فبيسيبهم.

> الشرط: [[onToggle]] نفسها لازم تكون ثابتة من الأب (بـ [[useCallback]] أو الـ compiler). لو الأب كتبها inline، هي جديدة كل render، والـ [[memo]] بيبقى ملوش لازمة.

---

## ٤. العدّ في Jest (من غير compiler)

١٠ مهام، وضغطنا على مهمة ٣ مرة، وعدّينا الصفوف اللي اترسمت:

~~~text الناتج (Jest)
compiled -> false
no memo -> row renders after one toggle: 10
memo + stable onToggle -> row renders after one toggle: 1
memo + new onToggle each render -> row renders after one toggle: 10
~~~

- [[compiled -> false]]: Jest مش بيشغّل الـ React Compiler (الكود اللي اتحوّل مفيهوش علامة الـ cache بتاعته).
- من غير [[memo]]: الـ ١٠ اترسموا.
- [[memo]] + [[onToggle]] ثابتة: واحد بس.
- [[memo]] + [[onToggle]] جديدة كل مرة: الـ ١٠ تاني، الـ memo اتكسر.

## ٥. ومع الـ React Compiler (الويب)

قالب SDK 57 فيه [[experiments.reactCompiler: true]] في [[app.json]]، والـ bundle بتاع الويب فيه ٣٩ مكان عليهم علامة الـ cache بتاعة الـ compiler ([[react.memo_cache_sentinel]])، يعني اشتغل.

~~~text الناتج (Chrome، TaskList بتاع المثال)
renders after one toggle 1 task3 decoration line-through
~~~

~~~text الناتج (Chrome، نسخة من غير memo ولا useCallback)
compiler on, no memo: renders from reset+read alone 0 | after one toggle 10
~~~

المثال: صف واحد اترسم، وعليه الخط. والنسخة اللي من غير [[memo]] ولا [[useCallback]]، والـ compiler شغال، برضه رسمت الـ ١٠. ليه؟ الـ compiler بيكاش الحاجات اللي جوه الـ render بتاع الـ component (القيم، والدوال، والـ JSX). لكن FlatList بينادي [[renderItem]] بنفسه لكل صف، فبيطلع element جديد كل مرة، والـ compiler مش بيلف الصف في [[memo]] لوحده. يعني في القوايم [[memo]] على الصف لسه لازم.

---

## ٦. القياس على الجهاز

ده من docs الـ RN (محتاج تطبيق شغال):

1. [[npx expo start]] ودوس [[j]]: بيفتح React Native DevTools (نفس شكل Chrome DevTools).
2. تاب Profiler، وفعّل «Highlight updates when components render».
3. اقلب مهمة: الصفوف اللي اترسمت بتنوّر.

و «Perf Monitor» من قايمة الـ dev بيعرض FPS للـ JS thread والـ UI thread. وأي قياس نهائي على release build، لأن الـ dev mode أبطأ بكتير.

---

## الخلاصة

| الحالة | صفوف اترسمت من ١٠ |
|---|---|
| من غير memo | 10 |
| [[memo]] + [[onToggle]] ثابتة | 1 |
| [[memo]] + [[onToggle]] جديدة كل مرة | 10 |
| compiler شغال، من غير [[memo]] | 10 |

- [[memo]] بيقارن بالمرجع، فأي دالة أو object جديد في الـ props بيكسره.
- الـ compiler بيشيل عنك أغلب [[useMemo]] و [[useCallback]] جوه الـ component، بس صف القايمة لسه محتاج [[memo]].
- قيس الأول، وبعدين صلّح.`,
          lines: [
            "memo و useCallback (لو مفيش compiler).",
            "الـ components.",
            "نوع.",
            "صف ملفوف في memo: مش بيعيد الرسم غير لو props اتغيرت (بالمرجع).",
            "بيرجّع JSX.",
            "الضغطة بتبعت الـ id.",
            "العنوان، مشطوب لو خلصت.",
            "قفلة.",
            "قفلة الـ return.",
            "قفلة الـ memo.",
            "القايمة.",
            R`[[renderItem]] ثابت طول ما [[onToggle]] ثابتة (والأب لازم يعمل onToggle بـ useCallback كمان).`,
            "القايمة.",
            "قفلة."
          ],
          sol: R`من غير memo ومن غير compiler: كل الصفوف الظاهرة بتتلوّن مع كل toggle (لأن [[tasks]] array جديد والأب بيعيد رسم كل حاجة). مع [[memo]] و [[onToggle]] ثابتة: الصف اللي اتغير بس. مع الـ compiler شغال ومن غير memo يدوي: كل الصفوف برضه (اتجرّب على الويب: ١٠ من ١٠)، لأن FlatList بينادي [[renderItem]] لكل صف من برّه الـ component، فالـ compiler مبيقدرش يكاش الـ JSX ده، ومبيلفّش الـ component في [[memo]] لوحده. فصفوف القوايم لسه محتاجة [[memo]].

لو لقيت كل الصفوف بتتلوّن حتى مع memo: [[onToggle]] جاية من الأب من غير [[useCallback]] (أو الـ compiler مقفول)، فكل render دالة جديدة.`
        },
        {
          cmd: "Reanimated",
          title: "Reanimated: animations على الـ UI thread مش على JS",
          desc: R`[[Animated]] المدمج شغال للحاجات البسيطة، بس [[react-native-reanimated]] هو المعيار: الـ animation بتتحسب على الـ UI thread، فحتى لو الـ JS thread مشغول (بيعمل render أو بيحلل JSON)، الحركة بتفضل ناعمة 60 أو 120fps.

الأساس: [[useSharedValue(1)]] قيمة عايشة على الـ UI thread، و [[useAnimatedStyle(() => ({ ... }))]] ستايل بيتحسب منها، و [[withSpring]] و [[withTiming]] بيحركوها. وفي Reanimated 4 (اللي مع SDK 57، مع [[react-native-worklets]]) فيه كمان CSS animations و transitions بالشكل اللي تعرفه من CSS.`,
          example: R`import { Pressable, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring } from 'react-native-reanimated';

export function LikeButton({ onLike }: { onLike: () => void }) {
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="إعجاب"
      onPress={() => {
        scale.value = withSequence(withSpring(1.4), withSpring(1));
        onLike();
      }}>
      <Animated.View style={style}>
        <Text>♥</Text>
      </Animated.View>
    </Pressable>
  );
}`,
          try: R`ضيف في الشاشة زرار بيعمل loop تقيل على JS ([[const end = Date.now() + 2000; while (Date.now() < end) {}]]) وبعدين اضغط الـ like أثناءه. وقارن بنسخة بـ [[Animated]] المدمج من غير [[useNativeDriver]]. (محتاج جهاز أو emulator، في Jest مفيش animation حقيقية.)`,
          flag: "script",
          deep: {
            why: R`الـ animations والـ gestures هي أكتر حاجة بتفرّق «تطبيق حاسس إنه native» عن «موقع في تطبيق». وأي animation على الـ JS thread هتقطّع في أسوأ وقت (وقت تحميل البيانات بالظبط). وده سؤال انترفيو ثابت: «إيه الـ worklet؟».`,
            how: R`[[useAnimatedStyle]] بتاخد دالة worklet: دالة JS بيتعملها نسخ لـ runtime JS تاني صغير شغال على الـ UI thread (مكتبة [[react-native-worklets]] بتعمل ده في Reanimated 4، و babel plugin بيجهّز الدوال). لما [[scale.value]] تتغير، الـ worklet بتتنفذ هناك وتحدّث الـ native view مباشرة من غير ما تعدّي على React أو الـ JS thread.

[[scale.value = withSpring(1.4)]] من الـ JS thread بيبعت «ابدأ animation» مرة واحدة، والـ frames كلها بتتحسب على الـ UI thread. [[withSequence]] بيشغّلهم ورا بعض.

مع gestures ([[react-native-gesture-handler]]، متركب في القالب): الـ gesture نفسه بيتعالج على الـ UI thread، فـ drag أو swipe بيتبع الصباع من غير أي تأخير.

الاختبارات: في الـ lab احتجت [[jest.mock('react-native-worklets', () => require('react-native-worklets/src/mock'))]] و [[require('react-native-reanimated').setUpTests()]] في الـ jest setup، وإلا الاختبار بيقع بـ «Cannot read properties of undefined (reading 'loadUnpackers')». بعدها الاختبار ضغط الزرار واتأكد إن [[onLike]] اتنادت.

وجوه FlashList: الـ shared value بتفضل مع الـ cell المعادة، فاعملها reset لما الـ item يتغير (الـ docs بتاعة FlashList فيها المثال ده).`,
            when: R`أي animation مرتبطة بلمس أو scroll، أو لازم تفضل ناعمة وقت التحميل. انتقالات بسيطة (fade لما عنصر يظهر): الـ layout animations في Reanimated ([[entering={FadeIn}]]) أو CSS transitions في v4. و [[Animated]] المدمج مع [[useNativeDriver: true]] كفاية لـ opacity و transform بسيطين.`,
            mistakes: R`تقرا [[scale.value]] جوه الـ render (مش جوه worklet): مش reactive ومش هيتحدث. وتنادي دالة JS عادية (setState) من جوه worklet مباشرة: لازم [[scheduleOnRN]] (أو [[runOnJS]] القديمة). وتنسى الـ jest setup فكل الاختبارات تقع. وتعمل animation لـ [[width]] و [[height]] بدل [[transform]]: الـ layout بيتحسب كل frame وأتقل.`
          },
          teach: R`## الفكرة: قيمة عايشة على الـ UI thread، وستايل بيتحسب منها

المثال زرار قلب: لما تدوس، القلب بيكبر لـ 1.4 ويرجع لـ 1 بحركة spring، وبعدين بينادي [[onLike]]. الحركة كلها بتتحسب برّه الـ JS thread. اتجرّب في مشروع Expo SDK 57 ([[react-native-reanimated]] 4.5.1 و [[react-native-worklets]] 0.10.1، متركبين في القالب): اختبار Jest، ونسخة الويب في Chrome headless قسنا فيها الـ transform وسط الحركة. فرق الـ UI thread عن الـ JS thread (الـ try) محتاج موبايل، لأن الويب فيه thread واحد.

---

## ١. الـ imports

~~~text src/components/LikeButton.tsx
import { Pressable, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring } from 'react-native-reanimated';
~~~

| الاسم | هو إيه |
|---|---|
| [[Animated]] (default) | فيه [[Animated.View]] و [[Animated.Text]]: components بتقبل ستايل متحرك |
| [[useSharedValue]] | قيمة بتتشاف من الـ JS thread والـ UI thread |
| [[useAnimatedStyle]] | ستايل بيتحسب من shared values |
| [[withSpring]] | حركة spring (زي زنبرك: بتعدّي الهدف شوية وترجع) |
| [[withSequence]] | يشغّل كذا حركة ورا بعض |

## ٢. القيمة والستايل

~~~text src/components/LikeButton.tsx
export function LikeButton({ onLike }: { onLike: () => void }) {
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
~~~

- [[useSharedValue(1)]]: قيمة تبدأ بـ 1 (الحجم الطبيعي). بتقراها وتغيّرها بـ [[scale.value]]. ولما تتغير **مفيش re-render** للـ component، عكس [[useState]].
- [[useAnimatedStyle(() => (...))]]: الدالة اللي جواها اسمها **worklet**: دالة JS بتتنسخ لـ runtime JS تاني صغير شغال على الـ UI thread (ده شغل [[react-native-worklets]] والـ babel plugin بتاعه). كل ما [[scale.value]] تتغير، الدالة دي بتتنفذ هناك وبتحدّث الـ view مباشرة.
- [[transform: [{ scale: scale.value }]]]: [[scale]] بيكبّر أو يصغّر من غير ما يغيّر الـ layout حوالين العنصر.

## ٣. الزرار

~~~text src/components/LikeButton.tsx
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="إعجاب"
      onPress={() => {
        scale.value = withSequence(withSpring(1.4), withSpring(1));
        onLike();
      }}>
~~~

- [[accessibilityRole="button"]] و [[accessibilityLabel="إعجاب"]]: قارئ الشاشة بيقول «إعجاب، زرار»، والاختبار بيلاقيه بيهم ([[getByRole('button', { name: 'إعجاب' })]]).
- [[scale.value = withSequence(withSpring(1.4), withSpring(1))]]: مش بنحط رقم، بنحط **وصف حركة**: «spring لـ 1.4، وبعدها spring لـ 1». السطر ده بيتنفذ مرة واحدة على الـ JS thread، وكل الـ frames بتتحسب بعد كده على الـ UI thread.
- [[onLike()]]: الفعل نفسه (طلب للسيرفر مثلًا) على الـ JS thread عادي.

~~~text src/components/LikeButton.tsx
      <Animated.View style={style}>
        <Text>♥</Text>
      </Animated.View>
    </Pressable>
  );
}
~~~

[[Animated.View]] بياخد الستايل المتحرك. [[View]] العادي مش هيفهمه.

---

## ٤. اتجرّب إزاي

### Jest

~~~text __tests__/like.test.tsx
const onLike = jest.fn();
await render(<LikeButton onLike={onLike} />);
await fireEvent.press(screen.getByRole('button', { name: 'إعجاب' }));
expect(onLike).toHaveBeenCalledTimes(1);
~~~

~~~text الناتج (Jest)
PASS __tests__/like.test.tsx
~~~

ده محتاج الـ setup اللي في درس «mocks للـ native modules». من غيره الملف بيقع قبل ما يبدأ.

### الويب

ضغطنا القلب، وقرينا الـ transform بتاع الـ [[Animated.View]] بعد ١٠٠ مللي ثانية وبعد ١.٦ ثانية:

~~~text الناتج (Chrome)
likes 1 transform at 100ms matrix(1.31733, 0, 0, 1.31733, 0, 0) after 1.6s matrix(1, 0, 0, 1, 0, 0)
~~~

- [[matrix(a, 0, 0, d, 0, 0)]] طريقة المتصفح يكتب بيها الـ transform، و [[a]] و [[d]] هما الـ scale أفقي ورأسي. فبعد ١٠٠ms القلب كان 1.317 (في السكة لـ 1.4)، وبعد ١.٦ ثانية رجع 1.
- [[likes 1]]: [[onLike]] اتنادت مرة.

على الويب مفيش UI thread منفصل: Reanimated بيشتغل في نفس thread الصفحة. فكلام «الحركة بتفضل ناعمة والـ JS مشغول» ده على Android و iOS بس (من الـ docs).

---

## ٥. الـ try: لو الـ JS thread وقف

ده من الـ docs (محتاج جهاز): loop بيشغّل الـ JS thread ثانيتين:

~~~text loop
const end = Date.now() + 2000; while (Date.now() < end) {}
~~~

| | لو الحركة بدأت قبل الـ loop | لو ضغطت أثناء الـ loop |
|---|---|---|
| Reanimated | بتكمل ناعمة (UI thread) | الضغطة بتستنى الـ loop يخلص، لأن [[onPress]] على JS |
| [[Animated]] من غير [[useNativeDriver]] | بتقف مكانها | نفس الكلام |

يعني Reanimated بيحمي الحركة، مش الـ events. وعشان كده [[react-native-gesture-handler]] معاه: اللمس نفسه يتعالج على الـ UI thread.

---

## الخلاصة

| الحتة | بتتنفذ فين |
|---|---|
| [[useSharedValue]] | القيمة متشافة من الاتنين |
| [[useAnimatedStyle(() => ...)]] | worklet على الـ UI thread |
| [[scale.value = withSpring(...)]] | بيبدأ من JS مرة، والـ frames على UI |
| [[onPress]] و [[onLike]] | JS thread |

- [[scale.value]] تتقري جوه worklet، مش في الـ render.
- حرّك [[transform]] و [[opacity]]، مش [[width]] و [[height]] (الـ layout بيتحسب كل frame).
- عشان تنادي دالة JS عادية (زي setState) من جوه worklet: [[scheduleOnRN]].`,
          lines: [
            "الـ components.",
            "Reanimated: الـ View المتحرك والـ hooks والـ animations.",
            "زرار like بـ نبضة.",
            "قيمة عايشة على الـ UI thread.",
            "ستايل بيتحسب منها على الـ UI thread (worklet).",
            "بيرجّع JSX.",
            "الزرار.",
            "دور.",
            "اسم.",
            "لما يتضغط:",
            "كبّر لـ 1.4 ورجّع لـ 1 بـ spring: كله على الـ UI thread.",
            "والفعل نفسه على JS.",
            "قفلة.",
            R`[[Animated.View]] بياخد الستايل المتحرك.`,
            "القلب.",
            "قفلة.",
            "قفلة.",
            "قفلة الـ return.",
            "قفلة."
          ],
          sol: R`أثناء الـ loop (الـ JS thread واقف ثانيتين): الضغطة نفسها مش هتتسجل غير بعد ما الـ loop يخلص، لأن [[onPress]] على JS. لكن لو الـ animation كانت بدأت قبل الـ loop، هتكمل ناعمة على Reanimated، وهتقف مكانها لو [[Animated]] من غير native driver.

الدرس: Reanimated بيحمي الحركة نفسها، مش الـ events. عشان كده gesture-handler + Reanimated مع بعض: اللمس والحركة الاتنين على الـ UI thread.`
        }
      ]
    }
]);
