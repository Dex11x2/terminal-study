// تكملة تاب rn: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/rn/01.js (شرح حقول الدرس في أوله)
MORE("rn", [
    {
      t: "الصلاحيات وأجهزة الموبايل",
      l: 2,
      n: "تطلب الإذن صح، وتستخدم الكاميرا والصور والموقع والإشعارات، وتعرف إيه اللي محتاج جهاز حقيقي",
      items: [
        {
          cmd: "permissions",
          title: "الصلاحيات: تسأل إمتى، وتعمل إيه لو المستخدم رفض",
          desc: R`أي حاجة حساسة (الكاميرا، والصور، والموقع، والإشعارات، والمايك) محتاجة إذن من المستخدم وقت التشغيل. كل مكتبة Expo بتدّيك نفس الشكل: [[getXPermissionsAsync()]] (الحالة من غير سؤال) و [[requestXPermissionsAsync()]] (يسأل)، والرد فيه [[granted]] و [[status]] و [[canAskAgain]].

القاعدة الذهبية: اسأل في اللحظة اللي المستخدم فاهم فيها ليه (لما يضغط «تغيير الصورة»)، مش أول ما التطبيق يفتح. ولو رفض ومينفعش تسأل تاني ([[canAskAgain: false]])، النظام مش هيعرض السؤال خالص، فوجّهه للإعدادات بـ [[Linking.openSettings()]].`,
          example: R`import * as Location from 'expo-location';
import { Alert, Linking } from 'react-native';

export async function ensureLocationPermission(): Promise<boolean> {
  const current = await Location.getForegroundPermissionsAsync();
  if (current.granted) return true;
  if (!current.canAskAgain) {
    Alert.alert('الموقع مقفول', 'افتح الإعدادات واسمح للتطبيق بالموقع عشان نعرض الفروع القريبة.', [
      { text: 'مش دلوقتي', style: 'cancel' },
      { text: 'الإعدادات', onPress: () => Linking.openSettings() },
    ]);
    return false;
  }
  const answer = await Location.requestForegroundPermissionsAsync();
  return answer.granted;
}`,
          try: R`اكتب نفس الدالة لـ [[ImagePicker.requestMediaLibraryPermissionsAsync]]. وعلى موبايل: ارفض الإذن مرتين (Android) وشوف [[canAskAgain]] بقى إيه، وجرّب زرار الإعدادات.`,
          flag: "script",
          deep: {
            why: R`لو سألت عن ٤ صلاحيات أول ما التطبيق يفتح، أغلب الناس هترفض، ومرة الرفض الدائم مفيش رجوع منها غير من الإعدادات. وApple بترفض تطبيقات بتطلب صلاحيات من غير سبب واضح أو برسالة مبهمة.`,
            how: R`[[status]] ممكن يبقى [['granted']] أو [['denied']] أو [['undetermined']] (لسه متسألش). [[canAskAgain]] بيبقى false لما النظام نفسه مش هيعرض السؤال تاني: على iOS بعد أول رفض، وعلى Android بعد رفضين عادة (أو «Don't ask again»).

فيه صلاحيات بمستويات: الموقع [[foreground]] و [[background]] (التانية محتاجة مبرر قوي للمتاجر)، والصور على iOS ممكن «limited» (صور مختارة بس)، و Android 13+ بيفرّق بين الصور والفيديو.

رسايل الإذن على iOS ([[NSLocationWhenInUseUsageDescription]] وغيرها) بتتكتب في إعدادات الـ plugin في app.json، وبتظهر في النافذة. لو مكتبتهاش، الـ plugin بيحط رسالة افتراضية إنجليزي زي «Allow $(PRODUCT_NAME) to access your location» مبتشرحش السبب، و Apple بترفض تطبيقات بسببها. (في مشروع iOS من غير Expo، غياب الرسالة خالص بيقفل التطبيق لما يطلب الإذن.) وعلى Android الـ plugins بتضيف [[<uses-permission>]] في الـ manifest.

[[Linking.openSettings()]] بيفتح صفحة إعدادات التطبيق بتاعك مباشرة.

مقدرتش أجرب نوافذ الإذن في الـ lab (محتاجة جهاز أو emulator)، بس الكود بيعدّي الـ typecheck على SDK 57.`,
            when: R`قبل أي استخدام لـ API حساس، وفي اللحظة المناسبة. وممكن شاشة «pre-permission» بتاعتك تشرح الفايدة الأول، وبعدها تطلب إذن النظام.`,
            mistakes: R`تطلب كل الصلاحيات في أول شاشة. ومتتعاملش مع الرفض فالشاشة تفضل فاضية أو تقع. وتسيب رسالة iOS الافتراضية الإنجليزي اللي مبتقولش ليه، فالـ review يرفضك. وتطلب [[background location]] وانت محتاج foreground بس فالـ review يرفضك.`
          },
          teach: R`## الفكرة: ٣ حالات، ولكل حالة تصرّف

الدالة [[ensureLocationPermission]] بترجّع [[true]] لو معانا إذن الموقع، وبتتعامل مع التلات حالات: الإذن موجود، أو لسه ينفع نسأل، أو المستخدم قفله ومينفعش نسأل تاني. نافذة الإذن نفسها بتاعة النظام ومحتاجة موبايل أو emulator، فالتلات فروع اتجرّبوا في Jest (مشروع Expo SDK 57، [[expo-location]] 57.0.20) بـ mock بيرجّع كل حالة، وإعدادات الـ plugin اتشافت بـ [[npx expo config]].

---

## ١. الـ imports

~~~text src/lib/perm.ts
import * as Location from 'expo-location';
import { Alert, Linking } from 'react-native';
~~~

- [[expo-location]]: مكتبة الموقع. كل مكتبات Expo اللي محتاجة إذن (الكاميرا، والصور، والإشعارات) فيها نفس الدالتين بنفس الشكل.
- [[Alert]]: نافذة النظام اللي فيها عنوان ورسالة وزراير.
- [[Linking]]: بيفتح لينكات وصفحات النظام. هنستخدم منه [[openSettings()]].

## ٢. اسأل عن الحالة من غير ما تطلب

~~~text src/lib/perm.ts
export async function ensureLocationPermission(): Promise<boolean> {
  const current = await Location.getForegroundPermissionsAsync();
  if (current.granted) return true;
~~~

- [[Promise<boolean>]]: الدالة async وبترجّع [[true]] أو [[false]].
- [[getForegroundPermissionsAsync()]]: «الإذن حالته إيه؟» **من غير** ما يظهر حاجة للمستخدم. [[Foreground]] يعني الموقع وانت فاتح التطبيق بس (عكس background).
- الرد object فيه:

| الخانة | القيم | معناها |
|---|---|---|
| [[status]] | [['granted']] أو [['denied']] أو [['undetermined']] | [[undetermined]] = لسه محدش سأل |
| [[granted]] | [[true]] أو [[false]] | اختصار لـ [[status === 'granted']] |
| [[canAskAgain]] | [[true]] أو [[false]] | النظام هيعرض النافذة لو طلبت؟ |
| [[expires]] | [['never']] غالبًا | إمتى الإذن ينتهي |

لو [[granted]]، خلاص.

## ٣. مقفول ومينفعش نسأل

~~~text src/lib/perm.ts
  if (!current.canAskAgain) {
    Alert.alert('الموقع مقفول', 'افتح الإعدادات واسمح للتطبيق بالموقع عشان نعرض الفروع القريبة.', [
      { text: 'مش دلوقتي', style: 'cancel' },
      { text: 'الإعدادات', onPress: () => Linking.openSettings() },
    ]);
    return false;
  }
~~~

[[canAskAgain: false]] معناها إن النظام **مش هيعرض النافذة** لو طلبت تاني (على iOS بعد أول رفض، وعلى Android بعد رفضين عادةً). فبدل ما نطلب ومفيش حاجة تحصل، بنشرح ونودّيه للإعدادات.

[[Alert.alert(title, message, buttons)]]:
- العنوان والرسالة: قول **ليه** محتاج الإذن.
- [[buttons]]: array، كل زرار object. [[style: 'cancel']] بيخليه زرار الإلغاء (على iOS بيظهر بشكل مختلف). و [[onPress]] الدالة اللي تتنفذ لما يتضغط.
- [[Linking.openSettings()]]: بيفتح صفحة إعدادات **التطبيق بتاعك** مباشرة، فالمستخدم يفعّل الموقع بضغطة.

## ٤. لسه ينفع نسأل

~~~text src/lib/perm.ts
  const answer = await Location.requestForegroundPermissionsAsync();
  return answer.granted;
}
~~~

[[requestForegroundPermissionsAsync()]] ده اللي بيظهر نافذة النظام وبيستنى المستخدم. الرد بنفس الشكل، فبنرجّع [[granted]].

---

## ٥. اتجرّب إزاي

في Jest مفيش نافذة. و [[jest-expo]] بيعمل mock للمكتبة، بس الـ mock بيرجّع [[undefined]]، فالدالة وقعت بـ:

~~~text الناتج (Jest)
TypeError: Cannot read properties of undefined (reading 'granted')
~~~

فعملنا mock بيرجّع اللي احنا عايزينه في كل مرة، وعدّينا على التلات فروع:

~~~text الناتج (Jest)
1 granted -> true request called 0
2 undetermined then user said no -> false request called 1
3 blocked -> false request called 1
alert title: الموقع مقفول | buttons: مش دلوقتي / الإعدادات
openSettings called 1
~~~

1. الإذن موجود: [[true]]، ومفيش [[request]] خالص.
2. [[undetermined]]: طلبنا مرة، والمستخدم (الـ mock) رفض، فـ [[false]].
3. [[canAskAgain: false]]: مفيش طلب جديد (العداد فضل 1)، وظهر Alert بالزرارين، والضغط على «الإعدادات» نادى [[openSettings]].

---

## ٦. رسالة الإذن على iOS والـ manifest على Android

النافذة على iOS بتعرض نص من الـ Info.plist، و Expo بيكتبه من الـ plugin في [[app.json]]:

~~~text app.json
"plugins": [
  ["expo-location", { "locationWhenInUsePermission": "بنستخدم موقعك عشان نعرض الفروع القريبة." }]
]
~~~

[[npx expo config --type introspect]] بيوريك الإعدادات النهائية من غير build. على المشروع ده:

~~~text الناتج
NSPhotoLibraryUsageDescription = "Allow $(PRODUCT_NAME) to access your photos"
NSCameraUsageDescription = "Allow $(PRODUCT_NAME) to access your camera"
NSLocationAlwaysAndWhenInUseUsageDescription = "Allow $(PRODUCT_NAME) to access your location"
NSLocationWhenInUseUsageDescription = "بنستخدم موقعك عشان نعرض الفروع القريبة."
~~~

اللي كتبناه بس اتغير. الباقي رسايل افتراضية إنجليزي حطتها الـ plugins لوحدها ([[expo-image-picker]] متسطب فحط رسايل الصور والكاميرا). الرسالة الافتراضية مش بتقول **ليه**، و Apple بترفض تطبيقات كتير بسببها، فاكتب رسالة واضحة لكل إذن بتستخدمه. و [[$(PRODUCT_NAME)]] متغير بيتبدل باسم التطبيق.

وعلى Android نفس الأمر بيطلّع الـ permissions اللي اتضافت للـ manifest، ومنها:

~~~text الناتج
android.permission.ACCESS_COARSE_LOCATION
android.permission.ACCESS_FINE_LOCATION
~~~

[[COARSE]] = موقع تقريبي (شبكة)، و [[FINE]] = دقيق (GPS).

---

## ٧. الـ solCode: نفس الشكل للصور

~~~text src/lib/perm.ts
export async function ensureMediaPermission() {
  const current = await ImagePicker.getMediaLibraryPermissionsAsync();
  if (current.granted) return true;
  if (!current.canAskAgain) {
    Linking.openSettings();
    return false;
  }
  return (await ImagePicker.requestMediaLibraryPermissionsAsync()).granted;
}
~~~

نفس التلات خطوات بأسامي [[MediaLibrary]]. الفرق إنه بيفتح الإعدادات على طول من غير Alert (الأحسن تشرح الأول زي المثال). و [[(await ...).granted]]: الأقواس عشان الـ [[await]] يخلص الأول وبعدين ناخد [[granted]] من النتيجة. عدّى [[npx tsc --noEmit]] على SDK 57.

---

## الخلاصة

| الحالة | [[granted]] | [[canAskAgain]] | تعمل إيه |
|---|---|---|---|
| مسموح | [[true]] | | كمّل |
| لسه محدش سأل | [[false]] | [[true]] | [[request...Async()]] |
| مرفوض بس ينفع نسأل | [[false]] | [[true]] | [[request...Async()]] تاني |
| مقفول | [[false]] | [[false]] | اشرح و [[Linking.openSettings()]] |

- [[get...]] بيسأل عن الحالة بس، و [[request...]] هو اللي بيظهر النافذة.
- اطلب في اللحظة اللي المستخدم فاهم فيها السبب، مش أول ما التطبيق يفتح.
- اكتب رسالة iOS بنفسك في الـ plugin.`,
          lines: [
            "مكتبة الموقع (نفس الشكل في كل المكتبات).",
            "Alert و Linking.",
            "بترجع true لو معانا الإذن.",
            "الحالة من غير ما نسأل.",
            "موجود: خلاص.",
            "مرفوض ومينفعش نسأل:",
            "نشرح ونعرض الإعدادات.",
            "زرار إلغاء.",
            "زرار بيفتح إعدادات التطبيق.",
            "قفلة.",
            "مفيش إذن.",
            "قفلة.",
            "لسه ممكن نسأل: اسأل.",
            "النتيجة.",
            "قفلة."
          ],
          sol: R`على Android بعد رفضين، [[canAskAgain]] بيبقى false والطلب التالت بيرجع denied فورًا من غير نافذة. زرار «الإعدادات» بيفتح صفحة التطبيق وتقدر تفعّل الإذن من هناك، ولما ترجع [[getForegroundPermissionsAsync]] هترجع granted (ممكن تعيد الفحص لما التطبيق يرجع active بـ AppState).

على iOS [[canAskAgain]] بيبقى false بعد أول رفض على طول.`,
          solCode: R`import * as ImagePicker from 'expo-image-picker';
import { Linking } from 'react-native';

export async function ensureMediaPermission() {
  const current = await ImagePicker.getMediaLibraryPermissionsAsync();
  if (current.granted) return true;
  if (!current.canAskAgain) {
    Linking.openSettings();
    return false;
  }
  return (await ImagePicker.requestMediaLibraryPermissionsAsync()).granted;
}`
        },
        {
          cmd: "image picker ورفع صورة",
          title: "تختار صورة أو تصوّر، وترفعها للـ backend بـ FormData",
          desc: R`[[expo-image-picker]] بيفتح معرض الصور ([[launchImageLibraryAsync]]) أو الكاميرا ([[launchCameraAsync]]) بواجهة النظام، ويرجّع [[assets]] فيها [[uri]] (ملف على الجهاز) و [[width]] و [[height]] و [[mimeType]]. لو المستخدم لغى: [[canceled: true]].

والرفع: [[FormData]] بتضيف فيها object شكله [[{ uri, name, type }]] (ده شكل خاص بـ RN مش [[Blob]] زي المتصفح)، وتبعته بـ [[fetch]] من غير [[Content-Type]] يدوي، والـ backend بيستقبله بـ [[multer]] زي أي رفع من الويب («تاب Backend بـ Node»). ولو محتاج كاميرا جوه الشاشة نفسها (scanner، أو preview)، [[expo-camera]] بـ [[CameraView]].`,
          example: R`import * as ImagePicker from 'expo-image-picker';

export async function pickAvatar() {
  const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!perm.granted) return null;
  const r = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.7 });
  return r.canceled ? null : r.assets[0];
}

export async function uploadAvatar(asset: ImagePicker.ImagePickerAsset, token: string) {
  const form = new FormData();
  form.append('avatar', { uri: asset.uri, name: asset.fileName ?? 'avatar.jpg', type: asset.mimeType ?? 'image/jpeg' } as unknown as Blob);
  const res = await fetch($__bt$__{process.env.EXPO_PUBLIC_API_URL}/api/me/avatar$__bt, {
    method: 'POST',
    headers: { Authorization: $__btBearer $__{token}$__bt },
    body: form,
  });
  if (!res.ok) throw new Error($__btUpload failed: $__{res.status}$__bt);
  return res.json();
}`,
          try: R`اعمل شاشة بروفايل فيها صورة ([[expo-image]]) وزرار «تغيير». اختار صورة واعرضها فورًا من [[asset.uri]] قبل ما الرفع يخلص، ولو فشل ارجع للقديمة. وضيف زرار «تصوير» بـ [[launchCameraAsync]] (محتاج [[requestCameraPermissionsAsync]]).`,
          flag: "script",
          deep: {
            why: R`صورة البروفايل، وصور المنتجات، وصور الإيصالات: رفع الصور من أكتر الـ features في أي تطبيق. وفيه تفاصيل خاصة بالموبايل: الصور من الكاميرا بتبقى ٥-١٠ ميجا، والنت بطيء، والـ FormData ليها شكل مختلف.`,
            how: R`[[launchImageLibraryAsync]] بيفتح الـ picker بتاع النظام (على Android 13+ فيه Photo Picker مش محتاج صلاحية أصلًا في حالات كتير، بس طلب الإذن مش بيضر). [[allowsEditing]] و [[aspect]] بيدّوا المستخدم يقص الصورة. [[quality: 0.7]] بيضغط JPEG. لو محتاج تصغير حقيقي للأبعاد (4000px لـ 1024px) استخدم [[expo-image-manipulator]] قبل الرفع.

[[uri]] بيبقى [[file://...]] على الجهاز. الـ networking بتاع RN بيفهم إن object فيه [[uri]] جوه FormData معناه «اقرا الملف ده وابعته»، وده ليه الشكل مش Blob. TypeScript مش عارف الشكل ده فبنعمل cast.

متحطش [[Content-Type: multipart/form-data]] بإيدك: الـ boundary لازم يتحط تلقائيًا، ولو كتبته من غيره السيرفر مش هيعرف يفصل الأجزاء. عشان كده مش بنستخدم [[api()]] اللي بيحط JSON.

على السيرفر: [[multer]] بـ [[upload.single('avatar')]] (نفس اسم الحقل)، مع حد للحجم وفحص النوع (درس [[multer]] في «تاب Backend بـ Node»).

[[expo-camera]]: [[<CameraView>]] component للكاميرا جوه شاشتك، و [[useCameraPermissions()]] hook للإذن، وبيقرا barcodes و QR.

الكود ده في الـ lab وبيعدّي الـ typecheck. الـ picker والرفع نفسهم محتاجين جهاز.`,
            when: R`image-picker: المستخدم بيختار أو بياخد صورة ويخلص. expo-camera: تجربة كاميرا جوه التطبيق (QR، أو فلاتر، أو تصوير متكرر). ولصور كبيرة كتير: رفع مباشر لـ S3 بـ presigned URL بدل ما تعدّي على سيرفرك.`,
            mistakes: R`[[Content-Type: 'multipart/form-data']] يدوي: السيرفر بيرجّع «Boundary not found» أو الملف فاضي. وترفع الصورة الأصلية ١٠ ميجا على 3G. واسم الحقل في [[append]] مختلف عن اللي في [[upload.single()]]: [[req.file]] undefined. وتنسى إن المستخدم ممكن يلغي فـ [[r.assets[0]]] تقع.`
          },
          teach: R`## الفكرة: دالتين، واحدة بتختار الصورة وواحدة بترفعها

[[pickAvatar]] بتطلب الإذن وبتفتح معرض الصور وبترجّع الصورة اللي اتختارت (أو [[null]])، و [[uploadAvatar]] بتبعتها للـ backend كـ [[multipart/form-data]]. اتجرّب في مشروع Expo SDK 57 ([[expo-image-picker]] 57.0.20): الكود عدّى [[npx tsc --noEmit]]، وفي نسخة الويب ([[npx expo export --platform web]]) في Chrome headless اخترنا صورة ورفعناها لسيرفر صغير على [[http://127.0.0.1:5986]]. معرض الصور والكاميرا على الموبايل محتاجين جهاز، فاللي يخصهم من الـ docs.

---

## ١. [[pickAvatar]]

~~~text src/lib/device.ts
import * as ImagePicker from 'expo-image-picker';

export async function pickAvatar() {
  const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!perm.granted) return null;
~~~

نفس شكل درس «permissions»: اطلب إذن الصور، ولو اترفض رجّع [[null]]. (على Android 13+ الـ picker بتاع النظام مش محتاج إذن في حالات كتير، بس الطلب مش بيضر.)

~~~text src/lib/device.ts
  const r = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.7 });
~~~

[[launchImageLibraryAsync]] بيفتح معرض الصور بتاع النظام وبيستنى المستخدم يختار أو يلغي. الإعدادات:

| الخانة | القيمة | معناها |
|---|---|---|
| [[mediaTypes]] | [[['images']]] | صور بس، من غير فيديو |
| [[allowsEditing]] | [[true]] | شاشة قص بعد الاختيار |
| [[aspect]] | [[[1, 1]]] | القص مربع (للصورة الشخصية) |
| [[quality]] | [[0.7]] | ضغط JPEG: من 0 (أقل جودة) لـ 1 (من غير ضغط) |

~~~text src/lib/device.ts
  return r.canceled ? null : r.assets[0];
}
~~~

الرد فيه [[canceled]] ([[true]] لو المستخدم قفل من غير ما يختار) و [[assets]]: array فيها الصور اللي اتختارت. واحنا عايزين واحدة، فـ [[assets[0]]].

اللي رجع في Chrome لما اخترنا [[icon.png]] من القالب:

~~~text الناتج (Chrome)
{"uri":"blob:http://127.0.0.1:5985/3da...","fileName":"icon.png","mimeType":"image/png","width":1024,"height":1024,"hasFile":true}
~~~

- [[uri]]: مكان الصورة. على الويب [[blob:]] (ملف في ذاكرة المتصفح)، وعلى الموبايل [[file://...]] في الـ cache بتاع التطبيق.
- [[fileName]] و [[mimeType]] و [[width]] و [[height]]: اسم الملف ونوعه وأبعاده.
- [[file]]: موجود على الويب بس، وده الـ [[File]] الحقيقي بتاع المتصفح.

وفي الويب الـ picker طلع input ملفات عادي بـ [[accept="image/*"]] ومن غير اختيار متعدد.

---

## ٢. [[uploadAvatar]]

~~~text src/lib/device.ts
export async function uploadAvatar(asset: ImagePicker.ImagePickerAsset, token: string) {
  const form = new FormData();
~~~

- [[ImagePicker.ImagePickerAsset]]: نوع الصورة اللي رجعت من الـ picker.
- [[FormData]]: الشكل اللي الفورمات بترفع بيه ملفات. كل [[append]] بيضيف حقل.

~~~text src/lib/device.ts
  form.append('avatar', { uri: asset.uri, name: asset.fileName ?? 'avatar.jpg', type: asset.mimeType ?? 'image/jpeg' } as unknown as Blob);
~~~

السطر الأهم:

- [[avatar]]: اسم الحقل. لازم يطابق اللي السيرفر مستنيه ([[upload.single('avatar')]] في multer).
- [[{ uri, name, type }]]: ده **شكل خاص بـ React Native**. الـ networking بتاع RN لما يلاقي object فيه [[uri]] جوه FormData بيفهم «اقرا الملف ده من الجهاز وابعته» بالاسم والنوع ده. [[??]] بيدّي اسم ونوع افتراضي لو الـ picker مرجّعش.
- [[as unknown as Blob]]: TypeScript شايف إن [[append]] بياخد [[string]] أو [[Blob]]، والـ object ده ولا ده، فبنعمل cast على مرحلتين ([[unknown]] الأول عشان TypeScript يسمح).

~~~text src/lib/device.ts
  const res = await fetch($__bt$__{process.env.EXPO_PUBLIC_API_URL}/api/me/avatar$__bt, {
    method: 'POST',
    headers: { Authorization: $__btBearer $__{token}$__bt },
    body: form,
  });
~~~

- [[fetch]] مباشر مش [[api()]]، لأن [[api()]] بيحط [[Content-Type: application/json]].
- الـ headers فيها التوكن **بس**. الـ [[Content-Type]] لازم يتحط لوحده، لأنه بيبقى [[multipart/form-data; boundary=...]]، والـ boundary نص عشوائي بيفصل الحقول عن بعض جوه الـ body. لو كتبته بإيدك من غير boundary، السيرفر مش هيعرف يقسم الـ body.
- [[body: form]]: الـ FormData نفسها.

~~~text src/lib/device.ts
  if (!res.ok) throw new Error($__btUpload failed: $__{res.status}$__bt);
  return res.json();
}
~~~

لو فشل ارمي error فيه الـ status، غير كده رجّع رد السيرفر (فيه الـ URL الجديد).

---

## ٣. اللي وصل للسيرفر (ومفاجأة الويب)

السيرفر سجّل الـ header والـ body. الـ [[Content-Type]] اتحط لوحده بـ boundary:

~~~text لوج السيرفر
POST /api/me/avatar auth=Bearer a1 ct=multipart/form-data; boundary=----WebKitFormBoundaryZMmu08jxRtVjlSnn bytes=152
~~~

بس ١٥٢ بايت بس؟ ده الـ body:

~~~text الـ body
------WebKitFormBoundaryZMmu08jxRtVjlSnn
Content-Disposition: form-data; name="avatar"

[object Object]
------WebKitFormBoundaryZMmu08jxRtVjlSnn--
~~~

المتصفح ميعرفش شكل [[{ uri, name, type }]]، فحوّل الـ object لنص [[[object Object]]] وبعته. يعني الشكل ده **بيشتغل على Android و iOS بس** (ده من docs الـ RN). لو التطبيق ليه نسخة ويب، ابعت [[asset.file]] هناك. جربناها:

~~~text لوج السيرفر
POST /api/me/avatar auth=Bearer a2 ct=multipart/form-data; boundary=----WebKitFormBoundaryBsygnuAKJPPO87Qe bytes=799188
Content-Disposition: form-data; name="avatar"; filename="icon.png"
Content-Type: image/png
~~~

الملف كله وصل (٧٩٩٠٠٥ بايت حجم الصورة + الـ boundaries)، باسمه ونوعه. ولاحظ إن [[quality]] و [[allowsEditing]] ملهمش أثر على الويب: الملف هو الأصلي.

---

## ٤. الـ solCode: شاشة البروفايل

~~~text src/app/profile.tsx
  const { token } = useSession();
  const [uri, setUri] = useState<string | null>(null);
~~~

التوكن من الـ session، و [[uri]] الصورة المعروضة ([[null]] = الصورة الافتراضية).

~~~text src/app/profile.tsx
  const change = async () => {
    const asset = await pickAvatar();
    if (!asset || !token) return;
    const previous = uri;
    setUri(asset.uri);
~~~

اختار صورة. لو لغى أو مفيش توكن، اخرج. احفظ الصورة القديمة في [[previous]]، واعرض الجديدة **فورًا** من الجهاز قبل ما الرفع يبدأ.

~~~text src/app/profile.tsx
    try {
      const r = await uploadAvatar(asset, token);
      setUri(r.url);
    } catch {
      setUri(previous);
      Alert.alert('الرفع فشل', 'جرّب تاني');
    }
  };
~~~

نجح: اعرض الـ URL اللي السيرفر رجّعه. فشل: رجّع القديمة وقول للمستخدم. ده optimistic update للملفات. و [[catch]] من غير [[(e)]] مسموح لما مش محتاج الـ error نفسه.

~~~text src/app/profile.tsx
      <Image source={uri ? { uri } : require('@/assets/images/icon.png')} style={{ width: 96, height: 96, borderRadius: 48 }} />
      <Button title="تغيير الصورة" onPress={change} />
~~~

[[Image]] من [[expo-image]]: لو فيه [[uri]] اعرضه، غير كده صورة من ملفات المشروع بـ [[require]]. و [[borderRadius: 48]] نص العرض، فالصورة بتبقى دايرة. الشاشة دي عدّت [[tsc]] واتبنت في نسخة الويب.

للكاميرا بدل المعرض: [[requestCameraPermissionsAsync()]] وبعدين [[launchCameraAsync]] بنفس الإعدادات ونفس شكل الرد (من الـ docs، محتاجة جهاز).

---

## الخلاصة

| الخطوة | الكود |
|---|---|
| إذن الصور | [[requestMediaLibraryPermissionsAsync()]] |
| فتح المعرض | [[launchImageLibraryAsync({ mediaTypes, allowsEditing, aspect, quality })]] |
| المستخدم لغى | [[r.canceled]] |
| الصورة | [[r.assets[0].uri]] |
| الرفع على الموبايل | [[form.append('avatar', { uri, name, type })]] |
| الرفع على الويب | [[form.append('avatar', asset.file)]] |
| الـ headers | التوكن بس، من غير [[Content-Type]] |

- اسم الحقل في [[append]] = اسم الحقل في [[upload.single()]] على السيرفر.
- [[Content-Type]] بإيدك = boundary ضايع.
- اعرض الصورة من الجهاز فورًا، وارجع للقديمة لو الرفع فشل.`,
          lines: [
            "المكتبة.",
            "اختيار صورة.",
            "اطلب الإذن.",
            "مرفوض: مفيش صورة.",
            "افتح المعرض: صور بس، وقص مربع، وضغط 70%.",
            "لو لغى null، غير كده أول صورة.",
            "قفلة.",
            "الرفع.",
            "FormData.",
            R`شكل RN: object فيه [[uri]] واسم ونوع. الـ cast عشان TS متوقع Blob.`,
            "fetch مباشر (مش api() لأنه بيحط JSON).",
            "POST.",
            R`التوكن بس، ومن غير [[Content-Type]]: الـ boundary بيتحط لوحده.`,
            "الـ body هو الـ FormData.",
            "قفلة.",
            "فشل: error برقم الـ status.",
            "الرد (الـ URL الجديد مثلًا).",
            "قفلة."
          ],
          sol: R`الصورة الجديدة بتظهر فورًا من [[asset.uri]] (عرض محلي)، والرفع بيحصل في الخلفية. لو فشل، ترجع [[previousUri]] وتعرض Alert. وده نفس فكرة الـ optimistic update بس للملفات.

للتصوير: [[await ImagePicker.requestCameraPermissionsAsync()]] وبعدين [[launchCameraAsync({ quality: 0.7, allowsEditing: true, aspect: [1, 1] })]] بنفس شكل الرد. على الـ iOS simulator مفيش كاميرا، فجرّب على جهاز.`,
          solCode: R`import { Image } from 'expo-image';
import { useState } from 'react';
import { Alert, Button, View } from 'react-native';
import { pickAvatar, uploadAvatar } from '@/lib/device';
import { useSession } from '@/lib/session';

export default function Profile() {
  const { token } = useSession();
  const [uri, setUri] = useState<string | null>(null);
  const change = async () => {
    const asset = await pickAvatar();
    if (!asset || !token) return;
    const previous = uri;
    setUri(asset.uri);
    try {
      const r = await uploadAvatar(asset, token);
      setUri(r.url);
    } catch {
      setUri(previous);
      Alert.alert('الرفع فشل', 'جرّب تاني');
    }
  };
  return (
    <View style={{ alignItems: 'center', gap: 12, padding: 24 }}>
      <Image source={uri ? { uri } : require('@/assets/images/icon.png')} style={{ width: 96, height: 96, borderRadius: 48 }} />
      <Button title="تغيير الصورة" onPress={change} />
    </View>
  );
}`
        },
        {
          cmd: "location",
          title: "الموقع: getCurrentPositionAsync والعنوان والدقة",
          desc: R`[[expo-location]] بيدّيك مكان الجهاز: [[getCurrentPositionAsync({ accuracy })]] مرة واحدة، أو [[watchPositionAsync]] لتتبّع مستمر وانت في الشاشة، و [[reverseGeocodeAsync(coords)]] بيحوّل الإحداثيات لعنوان (المدينة، والشارع).

الدقة بتفرق: [[Accuracy.Balanced]] (حوالي ١٠٠ متر، سريعة وبتوفر البطارية) كفاية لـ «الفروع القريبة»، و [[High]] لتطبيقات التوصيل والخرائط. والـ background location (وانت مقفول التطبيق) قصة تانية خالص: صلاحية منفصلة ومبرر للمتاجر.`,
          example: R`import * as Location from 'expo-location';

export async function currentCity() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') return null;
  const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
  const [place] = await Location.reverseGeocodeAsync(pos.coords);
  return { lat: pos.coords.latitude, lng: pos.coords.longitude, city: place?.city ?? null };
}`,
          try: R`اعرض «أقرب فرع» من array فروع ثابتة بإحداثياتها: احسب المسافة بـ haversine (دالة صغيرة) واختار الأقرب. وعلى الـ Android emulator غيّر الموقع من Extended controls وشوف النتيجة بتتغير.`,
          flag: "script",
          deep: {
            why: R`«الفروع القريبة»، وعنوان التوصيل التلقائي، و check-in الموظفين: الموقع من أكتر الـ features المطلوبة، ومن أكتر اللي بتستهلك بطارية وبتترفض في الـ review لو اتعملت غلط.`,
            how: R`[[getCurrentPositionAsync]] بيطلب قراءة جديدة من الـ GPS أو الشبكة، وممكن ياخد ثواني (خصوصًا جوه مبنى). [[getLastKnownPositionAsync]] بيرجّع آخر قراءة عند النظام فورًا (ممكن تكون قديمة أو null)، فتقدر تعرض بيها حاجة سريعة وبعدين تحدّث.

[[watchPositionAsync(options, callback)]] بيرجّع subscription لازم تعمله [[remove()]] لما الشاشة تتقفل (في cleanup بتاع useEffect)، وإلا الـ GPS يفضل شغال والبطارية تخلص.

[[reverseGeocodeAsync]] بيستخدم خدمة النظام (Google على Android و Apple على iOS)، والنتيجة ممكن تبقى باللغة بتاعة الجهاز أو فاضية في بعض المناطق، فمتعتمدش عليها كعنوان توصيل من غير ما المستخدم يأكد.

الـ background: [[requestBackgroundPermissionsAsync]] و [[startLocationUpdatesAsync]] مع [[expo-task-manager]]، ومحتاج development build، وجوجل وأبل بيطلبوا تبرير وفيديو.

مجربتش القراءة الفعلية (محتاجة جهاز أو emulator)، والكود متفحوص بالـ typecheck.`,
            when: R`Balanced + مرة واحدة لمعظم الحالات. watch في شاشة خريطة أو تتبع رحلة وهي مفتوحة. background بس لو ده جوهر التطبيق (توصيل، رياضة).`,
            mistakes: R`[[Accuracy.Highest]] لحاجة زي «مدينتك» فيستنى كتير ويستهلك البطارية. و watch من غير remove. وتفترض إن [[reverseGeocodeAsync]] دايمًا بيرجّع عنصر. وتبعت الموقع للسيرفر كل ثانية.`
          },
          teach: R`## الفكرة: إذن، ثم قراءة واحدة، ثم عنوان

[[currentCity]] بتطلب إذن الموقع، وبتاخد قراءة واحدة بدقة متوسطة، وبتحوّل الإحداثيات لاسم المدينة. اتجرّب في مشروع Expo SDK 57 ([[expo-location]] 57.0.20): الكود عدّى [[npx tsc --noEmit]]، واتشغّل في نسخة الويب في Chrome headless بموقع متظبط من الـ test (ميدان التحرير تقريبًا: 30.0444، 31.2357). القراءة من GPS موبايل حقيقي والعنوان من خدمة النظام محتاجين جهاز، فدول من الـ docs.

---

## ١. الإذن

~~~text src/lib/location.ts
import * as Location from 'expo-location';

export async function currentCity() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') return null;
~~~

- [[requestForegroundPermissionsAsync()]]: بيطلب إذن الموقع وانت فاتح التطبيق (درس «permissions» فيه النسخة الكاملة اللي بتتعامل مع الرفض الدائم).
- [[const { status } = ...]]: destructuring، خد خانة [[status]] بس من الرد.
- مش [[granted]]: رجّع [[null]]، والشاشة تعرض حاجة من غير موقع.

## ٢. قراءة واحدة

~~~text src/lib/location.ts
  const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
~~~

[[getCurrentPositionAsync]] بيطلب قراءة **جديدة** من الجهاز وبيستنى لحد ما تيجي (ممكن ثواني جوه مبنى). و [[accuracy]] بتحدد بيستخدم إيه:

| القيمة | الدقة التقريبية (من الـ docs) | الاستخدام |
|---|---|---|
| [[Accuracy.Lowest]] | حوالي ٣ كيلو | البلد |
| [[Accuracy.Low]] | حوالي كيلو | المدينة |
| [[Accuracy.Balanced]] | حوالي ١٠٠ متر | الفروع القريبة |
| [[Accuracy.High]] | حوالي ١٠ متر | توصيل، خرائط |
| [[Accuracy.Highest]] / [[BestForNavigation]] | أدق حاجة | ملاحة، وبتاكل بطارية |

كل ما الدقة تزيد، الـ GPS يشتغل أكتر والقراءة تتأخر والبطارية تخلص أسرع.

الرد ([[pos]]) object فيه [[coords]] ([[latitude]] و [[longitude]] و [[accuracy]] بالمتر و [[altitude]] وغيرهم) و [[timestamp]].

## ٣. الإحداثيات لعنوان

~~~text src/lib/location.ts
  const [place] = await Location.reverseGeocodeAsync(pos.coords);
~~~

- reverse geocoding = من رقمين لعنوان (المدينة والشارع). على Android بيستخدم خدمة جوجل وعلى iOS خدمة Apple.
- بيرجّع **array** عناوين، و [[const [place] = ...]] بياخد أول عنصر بس. لو الـ array فاضية، [[place]] يبقى [[undefined]].

## ٤. النتيجة

~~~text src/lib/location.ts
  return { lat: pos.coords.latitude, lng: pos.coords.longitude, city: place?.city ?? null };
}
~~~

[[place?.city]]: لو [[place]] موجود هات [[city]]، لو [[undefined]] رجّع [[undefined]] من غير ما تقع. و [[?? null]] بيحوّل [[undefined]] لـ [[null]]. السطر ده مكتوب كده لأن العنوان ممكن ميرجعش خالص، وده اللي حصل فعلًا على الويب:

~~~text الناتج (Chrome)
{"lat":30.0444,"lng":31.2357,"city":null}
~~~

- الإحداثيات جت من [[navigator.geolocation]] بتاع المتصفح (expo-location على الويب بيستخدمه)، وهي نفس الموقع اللي اديناه للمتصفح.
- [[city]] طلعت [[null]]: على الويب [[reverseGeocodeAsync]] مش موجودة أصلًا. الكود بتاع المكتبة بيرجّع array فاضية وبيطبع تحذير إن الـ Geocoding API اتشال من SDK 49. يعني لو مكتبتش [[?.]]، السطر كان هيقع.

---

## ٥. الـ solCode: أقرب فرع

~~~text src/lib/location.ts
type Branch = { name: string; lat: number; lng: number };
~~~

فرع ليه اسم وإحداثيات.

~~~text src/lib/location.ts
function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
~~~

ده قانون haversine: المسافة بين نقطتين على سطح كورة (مش خط مستقيم على ورقة).

- [[R = 6371]]: نص قطر الأرض بالكيلو، فالناتج بالكيلو.
- [[rad]]: الدوال المثلثية في JavaScript بتاخد radians مش درجات، والتحويل: الدرجة × π ÷ 180.
- [[dLat]] و [[dLng]]: الفرق في خط العرض والطول.
- [[h]]: الجزء الأساسي في القانون. [[** 2]] يعني تربيع.
- [[2 * R * Math.asin(Math.sqrt(h))]]: من [[h]] للزاوية بين النقطتين من مركز الأرض، وبعدين × نص القطر = طول القوس.

~~~text src/lib/location.ts
export function nearest(me: { lat: number; lng: number }, branches: Branch[]) {
  return branches.reduce((best, b) => (distanceKm(me, b) < distanceKm(me, best) ? b : best));
}
~~~

[[reduce]] بيلف على الفروع وماسك «الأحسن لحد دلوقتي» ([[best]]). من غير قيمة بداية، أول فرع بيبقى [[best]] الأول. ومع كل فرع: لو أقرب من [[best]] خليه هو الأحسن.

المثال اللي في آخر الـ solCode اتشغّل في نفس الصفحة:

~~~text الناتج (Chrome)
{"name":"مدينة نصر","lat":30.06,"lng":31.33}
~~~

والمسافات نفسها (Node 24):

~~~text الناتج
maadi 8.95 nasr 8.94
~~~

مدينة نصر كسبت بفرق ١٠ متر بس! ودقة [[Balanced]] حوالي ١٠٠ متر، يعني في الحقيقة الفرعين على نفس البعد. لو هتعرض «أقرب فرع»، اعرض المسافة جنبه عشان المستخدم يقرر.

ولما تغيّر الموقع من Extended controls في الـ Android emulator وتنادي الدالة تاني، النتيجة بتتغير (من الـ docs، محتاج emulator).

---

## الخلاصة

| الخطوة | الكود |
|---|---|
| الإذن | [[requestForegroundPermissionsAsync()]] |
| قراءة واحدة | [[getCurrentPositionAsync({ accuracy: Accuracy.Balanced })]] |
| الإحداثيات | [[pos.coords.latitude]] و [[pos.coords.longitude]] |
| العنوان | [[reverseGeocodeAsync(coords)]]، وممكن يرجع فاضي |
| أقرب فرع | haversine + [[reduce]] |

- [[Balanced]] كفاية لأغلب الحالات، و [[Highest]] لحاجة زي «مدينتك» بطء وبطارية على الفاضي.
- [[watchPositionAsync]] للتتبّع المستمر، ولازم [[remove()]] لما الشاشة تتقفل.
- متعتمدش على العنوان: ممكن يرجع فاضي (وعلى الويب دايمًا فاضي).`,
          lines: [
            "المكتبة.",
            "مدينة المستخدم.",
            "إذن الـ foreground بس.",
            "مرفوض: null.",
            "قراءة واحدة بدقة متوسطة (أسرع وأوفر).",
            "إحداثيات لعنوان، وممكن ترجع فاضية.",
            "النتيجة، والمدينة ممكن تبقى null.",
            "قفلة."
          ],
          sol: R`دالة المسافة (haversine) بترجع كيلومترات، و [[branches.reduce]] بيختار الأقل. على الـ emulator لما تغيّر الموقع من Extended controls ثم تنادي الدالة تاني، الفرع الأقرب بيتغير. لو [[getCurrentPositionAsync]] علّق كتير على الـ emulator: ابعت موقع من الـ Extended controls الأول (الـ emulator ساعات ملوش موقع مبدئي).`,
          solCode: R`type Branch = { name: string; lat: number; lng: number };

function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function nearest(me: { lat: number; lng: number }, branches: Branch[]) {
  return branches.reduce((best, b) => (distanceKm(me, b) < distanceKm(me, best) ? b : best));
}
// nearest({ lat: 30.04, lng: 31.24 }, [{ name: 'المعادي', lat: 29.96, lng: 31.25 }, { name: 'مدينة نصر', lat: 30.06, lng: 31.33 }])`
        },
        {
          cmd: "notifications",
          title: "الإشعارات: local و push، و Expo push token، ومحتاج development build",
          desc: R`[[expo-notifications]] بيعمل نوعين: local (التطبيق بيجدول إشعار لنفسه: «تذكير بعد ساعة») و push (السيرفر بتاعك بيبعت للجهاز). للـ push: التطبيق بياخد إذن، ويطلب [[ExpoPushToken]] بـ [[getExpoPushTokenAsync({ projectId })]]، ويبعته للـ backend يتخزن مع المستخدم. السيرفر بعدها يبعت POST لـ Expo Push API، و Expo يوصّله لـ FCM (Android) و APNs (iOS).

مهم: الـ push مش شغال في Expo Go على Android من SDK 53. محتاج development build، ومحتاج [[projectId]] من EAS، وعلى iOS جهاز حقيقي.`,
          example: R`import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({ shouldPlaySound: false, shouldSetBadge: false, shouldShowBanner: true, shouldShowList: true }),
});

export async function registerForPush(): Promise<string | null> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', { name: 'عام', importance: Notifications.AndroidImportance.DEFAULT });
  }
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') return null;
  const projectId = Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;
  const { data } = await Notifications.getExpoPushTokenAsync({ projectId });
  return data;
}`,
          try: R`جدول إشعار local بعد ١٠ ثواني بـ [[scheduleNotificationAsync]] (ده شغال حتى في Expo Go). وضيف [[addNotificationResponseReceivedListener]] بيفتح شاشة المهمة لما المستخدم يضغط على الإشعار ([[data: { taskId }]]).`,
          flag: "script",
          deep: {
            why: R`الإشعارات أهم أداة لرجوع المستخدمين (طلبك اتشحن، رسالة جديدة). وفيها تفاصيل كتير بتختلف بين Android و iOS وبين Expo Go والـ build، فلازم تعرف الخريطة قبل ما تبدأ عشان متضيعش يوم في «ليه التوكن مش بيطلع».`,
            how: R`[[setNotificationHandler]] بيحدد إزاي الإشعار يظهر لو جه والتطبيق مفتوح (افتراضيًا مش بيظهر). [[shouldShowBanner]] و [[shouldShowList]] هما الشكل الحالي (بدل [[shouldShowAlert]] القديم).

Android 8+ محتاج notification channel قبل أي إشعار، والمستخدم بيتحكم في كل channel لوحده من الإعدادات. Android 13+ محتاج إذن [[POST_NOTIFICATIONS]] ([[requestPermissionsAsync]] بيطلبه).

الـ push token: [[getExpoPushTokenAsync]] بيرجّع [[ExponentPushToken[...]]] مرتبط بـ [[projectId]] (بيتحط في app.json لما تعمل [[eas init]]). الـ backend بيخزنه، ويبعت:
[[POST https://exp.host/--/api/v2/push/send]] بـ [[{ to, title, body, data }]]. أو تتعامل مع FCM و APNs مباشرة بـ [[getDevicePushTokenAsync]] لو عايز تحكم كامل.

الضغط على الإشعار: [[addNotificationResponseReceivedListener]] بيدّيك [[response.notification.request.content.data]]، فتعمل [[router.push]] للشاشة. ولو التطبيق كان مقفول خالص، [[useLastNotificationResponse()]] أو [[getLastNotificationResponseAsync()]].

الكود ده من docs الـ SDK الحالية ومتفحوص بالـ typecheck في الـ lab. الإشعارات نفسها محتاجة جهاز (و push محتاج development build)، فمقدرتش أجربها.`,
            when: R`local: تذكيرات، ومؤقتات، وحاجات التطبيق عارفها. push: أي حدث على السيرفر (طلب، رسالة، دفع). ومتبعتش push لكل حاجة: المستخدم هيقفلها كلها.`,
            mistakes: R`تجرّب الـ push في Expo Go على Android وتستغرب إن التوكن مش بيطلع. وتنسى الـ channel على Android. ومفيش [[projectId]] فـ [[getExpoPushTokenAsync]] يرمي error. وتخزن توكن واحد للمستخدم بدل توكن لكل جهاز. وتتجاهل الـ receipts من Expo (فيها [[DeviceNotRegistered]] يعني امسح التوكن ده).`
          },
          teach: R`## الفكرة: ٣ خطوات عشان الجهاز يستقبل push

المثال بيعمل حاجتين: بيقول للتطبيق يعرض الإشعار إزاي لو جه وهو مفتوح ([[setNotificationHandler]])، ودالة [[registerForPush]] بتعمل channel على Android، وتطلب الإذن، وتجيب الـ Expo push token اللي هتبعته للـ backend. الكود اتكتب في مشروع Expo SDK 57 ([[expo-notifications]] 57.0.22) وعدّى [[npx tsc --noEmit]]. الإشعارات نفسها محتاجة موبايل (والـ push محتاج development build)، فاللي بيحصل على الجهاز من الـ docs، وجربنا اللي بيحصل في نسخة الويب.

---

## ١. الـ imports

~~~text src/lib/push.ts
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
~~~

- [[expo-constants]]: بيقرا إعدادات التطبيق ([[app.json]]) وقت التشغيل، ومنها الـ [[projectId]].
- [[expo-notifications]]: الإشعارات local و push.
- [[Platform]]: عشان [[Platform.OS]] ([['android']] أو [['ios']] أو [['web']]).

## ٢. الإشعار وانت فاتح التطبيق

~~~text src/lib/push.ts
Notifications.setNotificationHandler({
  handleNotification: async () => ({ shouldPlaySound: false, shouldSetBadge: false, shouldShowBanner: true, shouldShowList: true }),
});
~~~

افتراضيًا، لو إشعار جه والتطبيق مفتوح قدام المستخدم، **مش بيظهر**. السطر ده برّه أي component (بيتنفذ مرة لما الملف يتحمّل) وبيقول: مع كل إشعار، رجّع الإعدادات دي:

| الخانة | القيمة | معناها |
|---|---|---|
| [[shouldShowBanner]] | [[true]] | يظهر شريط فوق الشاشة |
| [[shouldShowList]] | [[true]] | يتحط في قايمة الإشعارات |
| [[shouldPlaySound]] | [[false]] | من غير صوت |
| [[shouldSetBadge]] | [[false]] | ميغيّرش الرقم اللي على أيقونة التطبيق |

[[shouldShowBanner]] و [[shouldShowList]] هما الشكل الحالي، بدل [[shouldShowAlert]] القديم.

## ٣. channel على Android

~~~text src/lib/push.ts
export async function registerForPush(): Promise<string | null> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', { name: 'عام', importance: Notifications.AndroidImportance.DEFAULT });
  }
~~~

من Android 8، كل إشعار لازم يتبع channel (قناة). المستخدم بيشوف القنوات في إعدادات التطبيق ويقفل أو يفتح كل واحدة لوحدها (مثلًا «العروض» مقفولة و «الطلبات» شغالة).

- [['default']]: الـ id، والإشعارات بتختار القناة بيه.
- [[name: 'عام']]: الاسم اللي المستخدم بيشوفه في الإعدادات.
- [[importance]]: قد إيه الإشعار مهم. [[DEFAULT]] بيصوّت ويظهر في القايمة، و [[HIGH]] بيظهر banner فوق الشاشة كمان.

## ٤. الإذن

~~~text src/lib/push.ts
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') return null;
~~~

على iOS دايمًا محتاج إذن، وعلى Android من 13 (إذن [[POST_NOTIFICATIONS]]). الرفض: [[null]].

## ٥. الـ token

~~~text src/lib/push.ts
  const projectId = Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;
  const { data } = await Notifications.getExpoPushTokenAsync({ projectId });
  return data;
}
~~~

- [[projectId]]: id المشروع على EAS (سيرفرات Expo). بيتكتب في [[app.json]] تحت [[extra.eas.projectId]] لما تعمل [[eas init]]. السطر بيدوّر عليه في مكانين، و [[?.]] في كل خطوة عشان لو أي حاجة ناقصة يرجع [[undefined]] من غير ما يقع.
- [[getExpoPushTokenAsync({ projectId })]]: بيرجّع object، و [[data]] فيها الـ token نفسه، شكله [[ExponentPushToken[xxxxxxxx]]]. ده اللي بتبعته للـ backend يتخزن مع المستخدم (token لكل جهاز، مش لكل مستخدم).

### السيرفر بيبعت إزاي

ده من docs الـ Expo Push Service: السيرفر بيبعت POST لـ [[https://exp.host/--/api/v2/push/send]] والـ body فيه [[to]] (الـ token) و [[title]] و [[body]] و [[data]]. و Expo بيوصّله لـ FCM (Android) أو APNs (iOS).

| | Android | iOS |
|---|---|---|
| Expo Go | push مش شغال من SDK 53 | local بس |
| development build | شغال | شغال على جهاز حقيقي بس |
| channel | لازم | مفيش |
| الإذن | Android 13+ | دايمًا |

---

## ٦. الـ solCode: تذكير local والضغط عليه

~~~text src/lib/push.ts
export function scheduleReminder(taskId: number) {
  return Notifications.scheduleNotificationAsync({
    content: { title: 'تذكير', body: 'متنساش المهمة', data: { taskId } },
    trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: 10 },
  });
}
~~~

- [[content]]: العنوان والنص، و [[data]] بيانات مخفية بتوصل مع الإشعار (هنا رقم المهمة).
- [[trigger]]: إمتى يظهر. [[TIME_INTERVAL]] مع [[seconds: 10]] = بعد ١٠ ثواني. وفيه أنواع تانية زي [[DATE]] و [[DAILY]].
- بترجّع Promise فيه id الإشعار (تقدر تلغيه بيه بعدين).

~~~text src/lib/push.ts
export function useNotificationNavigation() {
  useEffect(() => {
    const sub = Notifications.addNotificationResponseReceivedListener((response) => {
      const taskId = response.notification.request.content.data?.taskId;
      if (taskId) router.push({ pathname: '/tasks/[id]', params: { id: String(taskId) } });
    });
    return () => sub.remove();
  }, []);
}
~~~

- custom hook (اسمه بيبدأ بـ [[use]]) تحطه في الـ root layout.
- [[addNotificationResponseReceivedListener]]: بيتنادى لما المستخدم **يضغط** على إشعار.
- [[response.notification.request.content.data]]: نفس الـ [[data]] اللي حطيناها، فبناخد [[taskId]].
- [[router.push]] لشاشة المهمة. [[String(taskId)]] لأن الـ params في الـ URL نصوص.
- [[return () => sub.remove()]]: الـ cleanup بتاع [[useEffect]]، بيشيل الـ listener لما الـ component يختفي. و [[[]]] = مرة واحدة بس.

---

## ٧. على الويب

ضغطنا زرار بينادي [[scheduleReminder(42)]] وبعدين [[registerForPush()]] في نسخة الويب في Chrome headless:

~~~text الناتج (Chrome)
notif: ERR The method or property Notifications.scheduleNotificationAsync is not available on web, are you sure you've linked all the native dependencies properly?
push: null
~~~

- الإشعارات المجدولة مش موجودة على الويب خالص.
- [[registerForPush]] رجّعت [[null]] لأن المتصفح الـ headless مدّاش إذن، فالدالة وقفت عند سطر الإذن زي ما هي مكتوبة.

يعني الإشعارات لازم تتجرب على موبايل. و [[setNotificationHandler]] و [[scheduleNotificationAsync]] و الـ listener اتكتبوا وعدّوا الـ typecheck، والسلوك على الجهاز (الإشعار بيظهر بعد ١٠ ثواني، والضغط بيفتح [[/tasks/42]]) من الـ docs.

---

## الخلاصة

| الخطوة | الكود |
|---|---|
| الشكل والتطبيق مفتوح | [[setNotificationHandler]] |
| Android | [[setNotificationChannelAsync('default', ...)]] |
| الإذن | [[requestPermissionsAsync()]] |
| الـ token | [[getExpoPushTokenAsync({ projectId })]] |
| تذكير local | [[scheduleNotificationAsync({ content, trigger })]] |
| الضغط على الإشعار | [[addNotificationResponseReceivedListener]] + [[remove()]] |

- push = development build، مش Expo Go.
- مفيش [[projectId]] = مفيش token.
- token لكل جهاز، وامسح اللي Expo يقول عليه [[DeviceNotRegistered]].`,
          lines: [
            R`[[projectId]] من إعدادات التطبيق.`,
            "المكتبة.",
            "Platform.",
            "الإشعار لو جه والتطبيق مفتوح:",
            "يظهر banner وفي القايمة، من غير صوت أو badge.",
            "قفلة.",
            "تسجيل الجهاز للـ push.",
            "Android محتاج channel:",
            "channel افتراضي باسم عربي يظهر في الإعدادات.",
            "قفلة.",
            "اطلب الإذن (Android 13+ و iOS).",
            "مرفوض: null.",
            "الـ projectId من EAS.",
            "التوكن اللي هنبعته للـ backend.",
            "رجّعه.",
            "قفلة."
          ],
          sol: R`الإشعار الـ local بيظهر بعد ١٠ ثواني حتى لو التطبيق في الخلفية. لو التطبيق مفتوح، بيظهر بس لأن [[setNotificationHandler]] بيقول [[shouldShowBanner: true]]. ولما تضغط عليه، الـ listener بياخد [[taskId]] من [[data]] ويفتح [[/tasks/42]].

لو مظهرش على Android: اتأكد إن الـ channel اتعمل وإن الإذن granted، وإن «عدم الإزعاج» مقفول.`,
          solCode: R`import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { useEffect } from 'react';

export function scheduleReminder(taskId: number) {
  return Notifications.scheduleNotificationAsync({
    content: { title: 'تذكير', body: 'متنساش المهمة', data: { taskId } },
    trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: 10 },
  });
}

export function useNotificationNavigation() {
  useEffect(() => {
    const sub = Notifications.addNotificationResponseReceivedListener((response) => {
      const taskId = response.notification.request.content.data?.taskId;
      if (taskId) router.push({ pathname: '/tasks/[id]', params: { id: String(taskId) } });
    });
    return () => sub.remove();
  }, []);
}`
        }
      ]
    }
]);
