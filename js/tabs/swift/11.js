// تكملة تاب swift: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/swift/01.js (شرح حقول الدرس في أوله)
MORE("swift", [
    {
      t: "النشر على App Store والشغل",
      l: 3,
      n: "التوقيع والـ provisioning، و archive و TestFlight والرفع، ومراجعة Apple والـ privacy manifest، وسوق iOS والانترفيو، ومشروع التخرج",
      items: [
        {
          cmd: "التوقيع و provisioning",
          title: "Apple Developer Program والتوقيع: certificate و App ID و provisioning profile، و Automatic Signing بيعمل إيه",
          desc: R`iOS مش بيشغّل أي تطبيق غير موقّع من Apple. والتوقيع ده سبب أغلب أخطاء «مش راضي يتبني على الموبايل» أو «مش راضي يترفع». المكونات:

1. الحساب:
   • Apple ID مجاني: تقدر تشغّل على موبايلك الشخصي، بس التطبيق بيتلغي بعد 7 أيام ولازم تثبته تاني، وفيه capabilities مش متاحة (زي push notifications). كفاية للتعلم.
   • Apple Developer Program: اشتراك سنوي (حوالي 99 دولار في أغلب البلاد، والسعر المحلي بيختلف). لازم عشان TestFlight والمتجر. ينفع كفرد (اسمك الشخصي بيظهر كبائع) أو كشركة (محتاج رقم D-U-N-S للشركة).

2. Certificate: شهادة بتثبت إنك انت. فيه Development (للتشغيل على أجهزة) و Distribution (للمتجر). المفتاح الخاص بتاعها بيتخزن في الـ Keychain على الماك اللي عملها.

3. App ID: الـ Bundle ID متسجل عند Apple، ومعاه الـ capabilities (Push، و Sign in with Apple، و iCloud، و App Groups).

4. Provisioning Profile: ملف بيربط: الشهادة + الـ App ID + (للـ development) الأجهزة المسموحة. بيتحط جوه التطبيق.

5. Entitlements: الصلاحيات الخاصة اللي التطبيق طالبها (ملف [[.entitlements]])، ولازم تبقى موجودة في الـ profile.

Automatic Signing (Signing & Capabilities ← Automatically manage signing ← اختار Team): Xcode بيعمل كل ده لوحده ويجدده. استخدمه في الأول ودايمًا في المشاريع الصغيرة. الـ Manual signing بيظهر في الشركات الكبيرة والـ CI، وهناك أدوات زي [[fastlane match]] بتخزن الشهادات متشفرة في repo عشان الفريق كله يستخدم نفس الشهادة.

الأوامر تحت بتساعدك تشوف «إيه اللي موجود فعلًا» لما حاجة تبوظ.`,
          example: R`# الشهادات اللي على الماك وتقدر توقّع بيها
security find-identity -v -p codesigning
# الـ profiles اللي Xcode نزّلها (Xcode 16 وما بعده)
ls ~/Library/Developer/Xcode/UserData/Provisioning\ Profiles
# اقرا profile: الـ App ID والـ entitlements والأجهزة وتاريخ الانتهاء
security cms -D -i profile.mobileprovision
# اتأكد إن التطبيق المتبني موقّع، وبإيه
codesign -dv --verbose=4 build/Tasks.app
# الـ entitlements اللي جوه التطبيق فعلًا
codesign -d --entitlements - build/Tasks.app`,
          try: R`في مشروعك: Signing & Capabilities ← فعّل Automatically manage signing واختار الـ Team بتاعك (حتى لو Personal Team)، وشغّل على موبايلك. لو أول مرة، الموبايل هيطلب تفعّل Developer Mode وتثق في المطوّر من Settings ← General ← VPN & Device Management. بعدها شغّل [[security find-identity -v -p codesigning]] وشوف الشهادة اللي اتعملت.`,
          deep: {
            why: R`التوقيع هو اللي بيضمن إن التطبيق جاي من المطوّر ده ومحدش عدّله، وإن الصلاحيات الحساسة (push، و iCloud، و Apple Pay) Apple وافقت عليها. وبالنسبة لك: لما الـ build يفشل بـ «No profiles for 'com.x' were found» أو «Provisioning profile doesn't include the entitlement»، لازم تعرف تقرا المشكلة دي بدل ما تجرب عشوائي.`,
            how: R`وقت الـ build، Xcode بيحط الـ profile جوه الـ app bundle ([[embedded.mobileprovision]])، وبيوقّع كل ملف تنفيذي بالمفتاح الخاص بتاع الشهادة. الجهاز عند التثبيت بيتأكد: التوقيع سليم، والشهادة في الـ profile، والـ Bundle ID مطابق، والجهاز ده في القايمة (للـ development)، والـ entitlements كلها مسموحة في الـ profile.

[[security cms -D -i]] بيفك الـ profile (هو plist موقّع) ويطبعه، فتشوف [[ExpirationDate]] و [[Entitlements]] و [[ProvisionedDevices]]. و [[codesign -dv]] بيوريك الـ Authority (مين وقّع) والـ TeamIdentifier.

في Xcode قبل 16 الـ profiles كانت في [[~/Library/MobileDevice/Provisioning Profiles]].`,
            when: R`أول مرة تشغّل على جهاز حقيقي، ولما تضيف capability جديدة (push مثلًا)، ولما تجهز CI بيبني ويرفع. والمشاكل بتحصل غالبًا لما الشهادة تخلص (سنة) أو لما حد في الفريق يعمل شهادة جديدة ويلغي القديمة.`,
            mistakes: R`تمسح شهادة Distribution من موقع Apple عشان «تنضف» فكل الـ profiles المربوطة بيها تبوظ. وتعمل شهادة على ماك ومتعملش export للمفتاح الخاص (ملف .p12) فلما الماك يتغير تبقى مش قادر توقّع. وتغيّر الـ Bundle ID بعد ما عملت الـ App ID و App Store Connect. وتفعّل capability في Xcode ومش موجودة في حسابك (زي push بحساب مجاني).`
          },
          teach: R`## الأوامر دي بتعمل إيه؟

٥ أوامر ترمنال على الماك بتجاوب على سؤال واحد لما التوقيع يبوظ: «إيه اللي موجود فعلًا؟». الشهادات اللي عندك، والـ profiles اللي Xcode نزّلها، وجوه الـ profile فيه إيه، والتطبيق اتوقّع بإيه، وطالب صلاحيات إيه.

> كل الأوامر دي ([[security]] و [[codesign]]) أدوات macOS، ومفيش ماك هنا، فالشرح وأشكال الناتج من docs بتاعة Apple و man pages الأوامر، مش متجرّبين.

قبل الأوامر، الحتت اللي بتتكلم عنها:

| الحاجة | هي إيه | بتتخزن فين |
|---|---|---|
| Certificate | بتثبت إنك انت (Development أو Distribution) | المفتاح الخاص في Keychain على الماك |
| App ID | الـ Bundle ID متسجل عند Apple ومعاه الـ capabilities | حسابك على Apple Developer |
| Provisioning Profile | بيربط الشهادة + الـ App ID + الأجهزة | ملف [[.mobileprovision]] |
| Entitlements | الصلاحيات اللي التطبيق طالبها | ملف [[.entitlements]] وجوه التطبيق |

---

## ١. [[security find-identity -v -p codesigning]]

~~~zsh
security find-identity -v -p codesigning
~~~

- [[security]]: أداة macOS للـ Keychain والشهادات.
- [[find-identity]]: دوّر على «identities» (شهادة + المفتاح الخاص بتاعها مع بعض). الشهادة من غير مفتاحها متنفعش توقّع.
- [[-v]]: valid بس (الصالحة، مش منتهية ولا ملغية).
- [[-p codesigning]]: policy: اللي تنفع للتوقيع بس.

شكل الناتج (من الـ sol):

~~~text الناتج (شكله من الـ docs)
1) 3F2A...9C "Apple Development: Sara Ahmed (AB12CD34EF)"
1 valid identities found
~~~

[[3F2A...9C]] بصمة الشهادة (SHA-1)، و [[Apple Development]] نوعها، وبين القوسين الـ ID. لو الرقم [[0 valid identities]]، يبقى مفيش شهادة صالحة على الماك ده (أو المفتاح الخاص مش موجود).

---

## ٢. [[ls ~/Library/.../Provisioning\ Profiles]]

~~~zsh
ls ~/Library/Developer/Xcode/UserData/Provisioning\ Profiles
~~~

- [[~]]: الـ home بتاعك.
- [[\ ]] قبل المسافة: «المسافة دي جزء من الاسم»، من غيرها [[ls]] هيفتكرهم فولدرين.
- ده مكان الـ profiles في Xcode 16 وما بعده. قبله كانوا في [[~/Library/MobileDevice/Provisioning Profiles]].

هتلاقي ملفات [[.mobileprovision]] أساميها UUIDs.

---

## ٣. [[security cms -D -i profile.mobileprovision]]

~~~zsh
security cms -D -i profile.mobileprovision
~~~

- الـ profile plist **موقّع** (CMS = Cryptographic Message Syntax)، فمش هتقدر تقراه بـ [[cat]].
- [[cms -D]]: decode: فك التوقيع.
- [[-i]]: input: الملف.

الناتج plist مقروء، وأهم المفاتيح فيه:

| المفتاح | معناه |
|---|---|
| [[ExpirationDate]] | بيخلص إمتى |
| [[Entitlements]] | الصلاحيات المسموحة |
| [[ProvisionedDevices]] | الأجهزة المسموحة (في الـ development) |
| [[TeamIdentifier]] | الـ Team |

لو الـ build فشل بـ «Provisioning profile doesn't include the entitlement»، هنا بتشوف الصلاحية ناقصة فعلًا ولا لأ.

---

## ٤. [[codesign -dv --verbose=4 build/Tasks.app]]

~~~zsh
codesign -dv --verbose=4 build/Tasks.app
~~~

- [[codesign]]: أداة التوقيع.
- [[-d]]: display: اعرض معلومات التوقيع (من غير ما توقّع).
- [[-v]] مع [[--verbose=4]]: تفاصيل أكتر (٤ = مستوى عالي).
- [[build/Tasks.app]]: التطبيق المتبني (الـ [[.app]] فولدر في الحقيقة).

الناتج فيه [[Authority=...]] (مين وقّع، وسلسلة الشهادات لحد Apple) و [[TeamIdentifier=...]].

---

## ٥. [[codesign -d --entitlements - build/Tasks.app]]

~~~zsh
codesign -d --entitlements - build/Tasks.app
~~~

[[--entitlements -]]: اطبع الصلاحيات اللي جوه التطبيق فعلًا، و [[-]] معناها «على الشاشة» (stdout) بدل ملف. قارنها باللي في الـ profile (الأمر ٣): أي صلاحية في التطبيق ومش في الـ profile = التثبيت هيفشل.

---

## الترتيب لما حاجة تبوظ

| السؤال | الأمر |
|---|---|
| عندي شهادة صالحة؟ | [[security find-identity -v -p codesigning]] |
| Xcode نزّل profiles إيه؟ | [[ls ...Provisioning\ Profiles]] |
| الـ profile ده فيه إيه وبيخلص إمتى؟ | [[security cms -D -i]] |
| التطبيق اتوقّع بإيه؟ | [[codesign -dv]] |
| التطبيق طالب صلاحيات إيه؟ | [[codesign -d --entitlements -]] |

## الخلاصة

- التوقيع = شهادة (انت) + App ID (التطبيق) + profile (بيربطهم) + entitlements (الصلاحيات).
- Automatic Signing بيعمل ده كله لوحده، والأوامر دي للتشخيص لما يبوظ.
- خد export للمفتاح الخاص ([[.p12]])، ومتمسحش شهادة Distribution «عشان تنضف».`,
          lines: [
            R`[[security find-identity]]: الشهادات الصالحة للتوقيع. هتلاقي «Apple Development: اسمك (ID)».`,
            R`[[ls]] على فولدر الـ profiles. [[\ ]] عشان المسافة في الاسم.`,
            R`[[security cms -D]]: يفك الـ profile ويطبعه plist مقروء.`,
            R`[[codesign -dv]]: مين وقّع التطبيق، و Team ID، ونوع التوقيع.`,
            R`[[--entitlements -]]: يطبع الصلاحيات اللي جوه التطبيق.`
          ],
          sol: R`[[security find-identity -v -p codesigning]] هيطبع حاجة زي:
[[1) 3F2A...9C "Apple Development: Sara Ahmed (AB12CD34EF)"]]
[[1 valid identities found]]

ولو التشغيل على الموبايل فشل برسالة «Untrusted Developer»، روح Settings ← General ← VPN & Device Management ← اختار حسابك ← Trust. ولو مظهرلكش Developer Mode: Settings ← Privacy & Security ← Developer Mode (بيظهر بعد أول محاولة تشغيل من Xcode) وفعّله والموبايل هيعمل restart.`
        },
        {
          cmd: "النشر على متجر App Store و TestFlight",
          title: "ترفع تطبيقك: version و build number، و Archive، و TestFlight للتجربة، وبعدين Submit for Review",
          desc: R`الخطوات من أول مرة:
1. App Store Connect ([[appstoreconnect.apple.com]]): My Apps ← New App. اختار الـ Bundle ID، والاسم (لازم يبقى مش محجوز)، و SKU (أي كود داخلي).
2. في Xcode: رقمين مهمين في General:
   • Version (مثلًا [[1.0.0]]): اللي المستخدم بيشوفه.
   • Build (مثلًا [[1]] ثم [[2]] ...): لازم يزيد مع كل رفع لنفس الـ version. لو رفعت build رقمه موجود هيترفض.
3. اختار [[Any iOS Device (arm64)]] بدل الـ Simulator، و Product ← Archive. لما يخلص بيفتح الـ Organizer.
4. Distribute App ← App Store Connect ← Upload. Xcode بيوقّع بشهادة Distribution وبيرفع. أو من الترمنال بـ [[xcodebuild]] (تحت) وده اللي بيتعمل في CI مع [[fastlane]] أو Xcode Cloud.
5. بعد ما الـ build يخلص processing (دقايق لساعة)، بيظهر في TestFlight:
   • Internal testing: لحد 100 حد من فريقك في App Store Connect، من غير مراجعة.
   • External testing: لحد 10,000 tester بإيميل أو لينك عام، وأول build من كل version بيعدّي على مراجعة سريعة (Beta App Review).
   • الـ build في TestFlight بيفضل متاح 90 يوم.
   • الـ testers بينزّلوا تطبيق TestFlight من المتجر ويقبلوا الدعوة.
6. لما تبقى جاهز: في صفحة الـ version في App Store Connect املا الوصف، والكلمات المفتاحية، و screenshots (المقاسات المطلوبة بتتحدد في الصفحة)، والـ Privacy Policy URL، وبيانات الـ App Privacy (إيه الداتا اللي بتجمعها)، والفئة العمرية، واختار الـ build، و Submit for Review.

المراجعة غالبًا بتخلص في يوم أو اتنين. ولو اترفض، الرسالة بتقولك رقم الـ guideline (درس المراجعة الجاي)، وترد من Resolution Center أو تصلّح وترفع build جديد.

Apple بتطلب كل سنة (غالبًا في الربيع) إن الرفع يبقى بـ Xcode و SDK حديثين، فلازم تحدّث Xcode بانتظام. شوف صفحة Upcoming Requirements على موقع Apple Developer.`,
          example: R`# 1) زوّد رقم الـ build (محتاج Versioning System = Apple Generic في Build Settings)
agvtool next-version -all
# 2) archive لنسخة Release لأي جهاز iOS
xcodebuild archive -scheme Tasks -configuration Release -destination 'generic/platform=iOS' -archivePath build/Tasks.xcarchive
# 3) export ورفع: ExportOptions.plist فيه method = app-store-connect و destination = upload
xcodebuild -exportArchive -archivePath build/Tasks.xcarchive -exportOptionsPlist ExportOptions.plist -exportPath build/export -allowProvisioningUpdates`,
          try: R`(محتاج Apple Developer Program) اعمل التطبيق في App Store Connect، وزوّد الـ build، واعمل Archive من Xcode وارفعه بـ Distribute App. استنى الإيميل بتاع processing، وضيف نفسك internal tester في TestFlight، ونزّل التطبيق على موبايلك من تطبيق TestFlight. لو لسه مشتركتش: اعمل Archive بس واتفرج على الـ Organizer وأحجام التطبيق.`,
          deep: {
            why: R`التطبيق اللي على المتجر أو على الأقل على TestFlight هو أقوى حاجة في الـ CV بتاعك: بيقول إنك عديت كل السكة مش بس كتبت كود. و TestFlight بيخليك تجرب مع ناس حقيقية وتلاقي crashes قبل المستخدمين.`,
            how: R`الـ Archive بيبني Release (optimized) لكل المعالجات المطلوبة ويحفظ معاه ملفات الـ debug symbols ([[dSYM]])، ودي اللي بتخلي تقارير الـ crash تتقري بأسماء الدوال (في Xcode ← Organizer ← Crashes، أو في Firebase Crashlytics).

عند الرفع، App Store Connect بيعمل فحص أوتوماتيكي (APIs ممنوعة، والـ privacy manifest، والأيقونات، والتوقيع). ولما التطبيق يتنشر، المتجر بيعمل App Thinning: كل جهاز بينزّل الأجزاء اللي محتاجها بس.

[[agvtool next-version -all]] بيزود [[CURRENT_PROJECT_VERSION]]. و [[-allowProvisioningUpdates]] بيسمح لـ xcodebuild يعمل أو يحدّث الـ profiles لوحده باستخدام الحساب اللي في Xcode (أو بـ App Store Connect API key في CI).

[[altool]] القديم اتشال من حاجات كتير (زي الـ notarization)، فالأحسن تستخدم Xcode أو [[xcodebuild -exportArchive]] أو تطبيق Transporter أو fastlane.`,
            when: R`TestFlight من أول ما التطبيق يبقى ليه شكل، مش في الآخر. واعمل CI (Xcode Cloud أو GitHub Actions بـ macOS runner + fastlane) لما الرفع اليدوي يبقى أكتر من مرة في الأسبوع.`,
            mistakes: R`ترفع build بنفس الرقم. وتنسى ترفع الـ dSYMs لأداة الـ crashes فالتقارير تبقى أرقام. وتستنى لآخر يوم قبل ما تبدأ أول رفع (أول مرة فيها مفاجآت: اسم محجوز، وشهادات، و screenshots). وتعمل Submit من غير demo account والتطبيق فيه login: الـ reviewer مش هيعرف يدخل وهيرفض (Guideline 2.1).`
          },
          teach: R`## الأوامر دي بتعمل إيه؟

٣ أوامر بيعملوا من الترمنال نفس اللي بتعمله في Xcode بالماوس عشان ترفع نسخة: تزوّد رقم الـ build، وتعمل archive (نسخة Release جاهزة)، وتوقّعها للمتجر وترفعها لـ App Store Connect. ده بالظبط اللي بيتعمل في CI.

> [[agvtool]] و [[xcodebuild]] و App Store Connect و TestFlight محتاجين ماك وحساب Apple Developer Program، ومفيش الاتنين هنا، فالشرح من docs بتاعة Apple. الحاجة الوحيدة اللي اتجربت: ملف [[ExportOptions.plist]] اللي في الـ solCode اتقري بـ [[PropertyListSerialization]] في Swift 6.4 على لينكس (Docker) عشان نتأكد إنه plist سليم.

---

## ١. Version و Build

| الرقم | مثال | مين بيشوفه | القاعدة |
|---|---|---|---|
| Version ([[MARKETING_VERSION]]) | [[1.0.0]] | المستخدم في المتجر | بتغيّره لما تطلّع إصدار جديد |
| Build ([[CURRENT_PROJECT_VERSION]]) | [[1]] ثم [[2]] | انت و App Store Connect | لازم يزيد مع كل رفع لنفس الـ version |

---

## ٢. [[agvtool next-version -all]]

~~~zsh
agvtool next-version -all
~~~

- [[agvtool]]: Apple Generic Versioning Tool، أداة Xcode لأرقام النسخ.
- [[next-version]]: زوّد الـ build number واحد ([[1]] تبقى [[2]]).
- [[-all]]: في كل الـ targets (التطبيق والـ widget وغيرهم) مع بعض، عشان يفضلوا زي بعض.
- شرطه: في Build Settings يكون [[Versioning System = Apple Generic]].

---

## ٣. [[xcodebuild archive]]

~~~zsh
xcodebuild archive -scheme Tasks -configuration Release -destination 'generic/platform=iOS' -archivePath build/Tasks.xcarchive
~~~

| الجزء | معناه |
|---|---|
| [[xcodebuild]] | Xcode من غير واجهة |
| [[archive]] | ابني وجهّز نسخة للتوزيع (زي Product ← Archive) |
| [[-scheme Tasks]] | الـ scheme اللي هيتبني (غالبًا اسم التطبيق) |
| [[-configuration Release]] | build متحسّن (optimized)، مش Debug |
| [[-destination 'generic/platform=iOS']] | أي جهاز iOS حقيقي (زي «Any iOS Device»)، مش Simulator |
| [[-archivePath build/Tasks.xcarchive]] | احفظه هنا |

الـ [[.xcarchive]] فولدر جواه التطبيق ومعاه الـ [[dSYM]] (debug symbols): الملفات اللي بتخلي تقارير الـ crash تتقري بأسماء الدوال بدل عناوين ذاكرة.

---

## ٤. [[xcodebuild -exportArchive]]

~~~zsh
xcodebuild -exportArchive -archivePath build/Tasks.xcarchive -exportOptionsPlist ExportOptions.plist -exportPath build/export -allowProvisioningUpdates
~~~

| الجزء | معناه |
|---|---|
| [[-exportArchive]] | خد الـ archive ووقّعه للتوزيع |
| [[-archivePath]] | الـ archive اللي عملناه |
| [[-exportOptionsPlist]] | إعدادات التصدير (تحت) |
| [[-exportPath]] | فين يحط الناتج |
| [[-allowProvisioningUpdates]] | اسمح له يعمل أو يحدّث الـ profiles بالحساب اللي في Xcode (أو بـ API key في CI) |

### الـ solCode: [[ExportOptions.plist]]

~~~text ExportOptions.plist (المفاتيح المهمة)
<key>method</key>        <string>app-store-connect</string>
<key>destination</key>   <string>upload</string>
<key>signingStyle</key>  <string>automatic</string>
~~~

- plist = Property List: XML فيه [[dict]]، وكل [[key]] بعده قيمته.
- [[method = app-store-connect]]: توقيع للمتجر (شهادة Distribution).
- [[destination = upload]]: ارفع على طول لـ App Store Connect بدل ما تحفظ ملف [[.ipa]] بس.
- [[signingStyle = automatic]]: Automatic Signing.

قريناه في Swift على لينكس للتأكد إن مفيش غلطة في الـ XML:

~~~text الناتج (Swift 6.4، لينكس)
destination = upload
method = app-store-connect
signingStyle = automatic
~~~

---

## ٥. بعد الرفع: TestFlight (من docs بتاعة Apple)

| المرحلة | التفاصيل |
|---|---|
| Processing | من دقايق لساعة، وبعدين إيميل [[has completed processing]] |
| Internal testing | لحد ١٠٠ من فريقك، من غير مراجعة |
| External testing | لحد ١٠,٠٠٠، وأول build من كل version بيعدّي Beta App Review |
| مدة الـ build | ٩٠ يوم |
| Submit for Review | بعد الوصف والـ screenshots والـ App Privacy |

## الخلاصة

- الـ build number لازم يزيد مع كل رفع.
- [[archive]] بيبني Release لأجهزة حقيقية، و [[-exportArchive]] بيوقّع ويرفع حسب [[ExportOptions.plist]].
- ابدأ TestFlight بدري، واحفظ الـ dSYMs عشان تقارير الـ crash.`,
          lines: [
            R`[[agvtool]]: بيزود الـ build number في كل الـ targets.`,
            R`[[xcodebuild archive]]: build Release لأي جهاز iOS ويحفظه في [[.xcarchive]].`,
            R`[[-exportArchive]]: يوقّع للمتجر ويرفع لـ App Store Connect حسب الـ ExportOptions.plist.`
          ],
          sol: R`بعد الرفع، Xcode (أو xcodebuild) بيكتب [[Upload succeeded]]، وبعد شوية بيوصلك إيميل [[The following build has completed processing]] من App Store Connect. في تاب TestFlight هتلاقي الـ build، ولو طلب منك Export Compliance (التشفير) جاوب (التطبيقات اللي بتستخدم HTTPS بس غالبًا معفية، وتقدر تحط [[ITSAppUsesNonExemptEncryption = NO]] في Info.plist عشان السؤال ميتكررش). بعدها تضيف نفسك internal tester والتطبيق يظهر في TestFlight على الموبايل.

ExportOptions.plist أبسط شكل ليه:`,
          solCode: R`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>method</key>
  <string>app-store-connect</string>
  <key>destination</key>
  <string>upload</string>
  <key>signingStyle</key>
  <string>automatic</string>
</dict>
</plist>`
        },
        {
          cmd: "مراجعة App Store والخصوصية",
          title: "تعدّي مراجعة Apple: أشهر أسباب الرفض، ورسايل الصلاحيات، و privacy manifest و required reason APIs",
          desc: R`كل تطبيق وكل تحديث بيتراجع من بني آدمين في Apple حسب App Review Guidelines. أشهر أسباب الرفض:

• 2.1 App Completeness: التطبيق بيقع، أو فيه أزرار مش شغالة، أو محتوى تجريبي (Lorem ipsum)، أو مفيش demo account لتطبيق فيه login.
• 4.2 Minimum Functionality: تطبيق هو موقع جوه WebView من غير قيمة إضافية حقيقية.
• 5.1.1 Data Collection: بتطلب صلاحية من غير سبب واضح، أو بتجبر المستخدم يعمل حساب لحاجة مش محتاجة حساب. ولو التطبيق فيه إنشاء حساب، لازم يبقى فيه مسح حساب من جوه التطبيق.
• 4.8 Login Services: لو بتستخدم login من طرف تالت (Google أو Facebook) كطريقة أساسية، لازم تقدّم كمان اختيار login بيحافظ على الخصوصية زي Sign in with Apple (فيه استثناءات، اقراها).
• 3.1.1 In-App Purchase: المحتوى الرقمي (اشتراكات، ومزايا جوه التطبيق) لازم يتباع بـ In-App Purchase. الحاجات الحقيقية (أكل، وتوصيل، وخدمات) بأي وسيلة دفع. والقواعد دي بتختلف حسب البلد وبتتغير بسبب قضايا وقوانين، فاقرا النسخة الحالية.
• 2.3 Accurate Metadata: screenshots مش من التطبيق، أو وصف بيوعد بحاجات مش موجودة.

الصلاحيات: أي وصول للكاميرا أو الصور أو الموقع أو الميكروفون أو جهات الاتصال لازم مفتاح في Info.plist زي [[NSCameraUsageDescription]] فيه سبب واضح ومحدد («عشان تصوّر الفاتورة وتضيفها للمصروف»). من غيره التطبيق بيقع لحظة الطلب، وبسبب ضعيف بيترفض.

Privacy manifest ([[PrivacyInfo.xcprivacy]]): ملف (من 2024) بيوصف:
1. هل التطبيق بيعمل tracking ([[NSPrivacyTracking]]) ودومينات التتبع.
2. الداتا اللي بتجمعها ([[NSPrivacyCollectedDataTypes]]).
3. «Required reason APIs» ([[NSPrivacyAccessedAPITypes]]): APIs ممكن تتستخدم في الـ fingerprinting، وأي استخدام ليها لازم سبب من قايمة Apple بكود. منها: [[UserDefaults]] (السبب [[CA92.1]] = قراية وكتابة داتا التطبيق نفسه)، وتواريخ الملفات، و system boot time، ومساحة الديسك. والـ SDKs المشهورة (Firebase وغيرها) لازم يبقى معاها manifest بتاعها.

App Privacy في App Store Connect («الـ nutrition label»): بتجاوب أسئلة عن الداتا اللي بتتجمع وبتظهر في صفحة التطبيق. لازم تبقى متطابقة مع الحقيقة ومع الـ SDKs. ولو بتتبع المستخدم عبر تطبيقات تانية لازم App Tracking Transparency ([[ATTrackingManager]]).`,
          example: R`<?xml version="1.0" encoding="UTF-8"?>
<plist version="1.0">
<dict>
  <key>NSPrivacyTracking</key>
  <false/>
  <key>NSPrivacyAccessedAPITypes</key>
  <array>
    <dict>
      <key>NSPrivacyAccessedAPIType</key>
      <string>NSPrivacyAccessedAPICategoryUserDefaults</string>
      <key>NSPrivacyAccessedAPITypeReasons</key>
      <array>
        <string>CA92.1</string>
      </array>
    </dict>
  </array>
  <key>NSPrivacyCollectedDataTypes</key>
  <array/>
</dict>
</plist>`,
          try: R`في مشروعك: File ← New ← File ← App Privacy واعمل [[PrivacyInfo.xcprivacy]]، وضيف UserDefaults بالسبب CA92.1 (لو بتستخدم [[@AppStorage]]). وبعدين ضيف [[NSCameraUsageDescription]] في تاب Info برسالة بالعربي. وأخيرًا اقرا sections 2.1 و 4.2 و 5.1.1 من App Review Guidelines على موقع Apple (مش طويلين).`,
          flag: "script",
          deep: {
            why: R`الرفض بيأخر الإطلاق أيام وممكن أسابيع، وده بيبوظ مواعيد مع عملاء. أغلب أسباب الرفض معروفة ومكررة، فلو راجعتها قبل الرفع بتوفر دورة كاملة. وتطبيقات المبتدئين بتترفض أكتر حاجة على 2.1 (crash أو مفيش demo account) و 4.2 (WebView).`,
            how: R`عند الرفع، App Store Connect بيجمّع الـ privacy manifests من التطبيق وكل الـ SDKs في تقرير، ولو استخدمت required reason API من غير ما تعلن عنه بيوصلك إيميل بالمشكلة (وممكن الرفع يترفض). والـ manifest نفسه plist: [[key]] واسم، وبعده القيمة ([[false]] و [[string]] و [[array]] و [[dict]]).

المراجع بيشغّل التطبيق على جهاز حقيقي، بيجرب السيناريوهات الأساسية، وبيقارن الـ metadata بالتطبيق، وبيشيك الصلاحيات ورسايلها. ولو فيه حاجات مش واضحة (هاردوير معين، حساب) اكتبها في App Review Information.`,
            when: R`اقرا الـ guidelines قبل ما تبدأ التطبيق مش قبل الرفع (فكرة التطبيق نفسها ممكن تبقى ضد 4.2 أو 3.1.1). وراجع الـ privacy manifest كل ما تضيف SDK أو API جديد.`,
            mistakes: R`رسالة صلاحية عامة زي «التطبيق محتاج الكاميرا». وتجبر المستخدم يدّي الموقع عشان يفتح التطبيق. وتنسى مسح الحساب. وتضيف SDK إعلانات أو analytics ومتحدّثش الـ App Privacy. وتتعامل مع الرفض بزعل بدل ما ترد بهدوء في Resolution Center وتوضح أو تصلّح.`
          },
          teach: R`## الملف ده بيعمل إيه؟

ده [[PrivacyInfo.xcprivacy]]، الـ privacy manifest بتاع تطبيق صغير. بيقول لـ Apple ٣ حاجات: التطبيق **مش** بيعمل tracking، وبيستخدم [[UserDefaults]] (يعني [[@AppStorage]] كمان) لسبب [[CA92.1]]، و **مش** بيجمع أي داتا عن المستخدم.

### اتجرّب فين؟

الملف plist (XML)، فقريناه بـ [[PropertyListSerialization]] في Swift 6.4 على لينكس (Docker) عشان نتأكد إنه سليم ونشوف Swift فاهماه إزاي. إنشاؤه من Xcode، ومراجعة Apple، والتقرير اللي App Store Connect بيعمله: من docs بتاعة Apple و App Review Guidelines.

---

## ١. الرأس

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<plist version="1.0">
<dict>
~~~

- السطر الأول: ده ملف XML بترميز UTF-8.
- [[<plist>]]: Property List، الشكل اللي Apple بتخزن بيه الإعدادات (زي [[Info.plist]]).
- [[<dict>]]: dictionary (مفاتيح وقيم). كل [[<key>]] بعده قيمته على طول.

---

## ٢. [[NSPrivacyTracking]]

~~~xml
  <key>NSPrivacyTracking</key>
  <false/>
~~~

هل التطبيق بيتتبع المستخدم عبر تطبيقات ومواقع شركات تانية (إعلانات موجّهة مثلًا)؟ [[<false/>]] = لأ. ولو [[true]] لازم تكتب دومينات التتبع وتطلب إذن App Tracking Transparency.

---

## ٣. [[NSPrivacyAccessedAPITypes]]: الـ required reason APIs

~~~xml
  <key>NSPrivacyAccessedAPITypes</key>
  <array>
    <dict>
      <key>NSPrivacyAccessedAPIType</key>
      <string>NSPrivacyAccessedAPICategoryUserDefaults</string>
      <key>NSPrivacyAccessedAPITypeReasons</key>
      <array>
        <string>CA92.1</string>
      </array>
    </dict>
  </array>
~~~

- فيه APIs ممكن تتستخدم في الـ fingerprinting (تمييز الجهاز من غير إذن): UserDefaults، وتواريخ الملفات، و system boot time، ومساحة الديسك. أي استخدام ليها لازم سبب من قايمة Apple.
- [[<array>]] قايمة، وكل [[<dict>]] جواها = API واحد.
- [[NSPrivacyAccessedAPICategoryUserDefaults]]: النوع: UserDefaults.
- [[CA92.1]]: كود السبب من قايمة Apple = «بقرا وبكتب داتا خاصة بالتطبيق نفسه بس».

---

## ٤. [[NSPrivacyCollectedDataTypes]]

~~~xml
  <key>NSPrivacyCollectedDataTypes</key>
  <array/>
</dict>
</plist>
~~~

[[<array/>]] = array فاضية: مش بنجمع داتا (إيميل، موقع، مشتريات...). لو بتجمع، كل نوع [[<dict>]] فيه النوع والغرض وهل مربوط بهوية المستخدم.

---

## ٥. قريناه بـ Swift

~~~swift
import Foundation
let data = try Data(contentsOf: URL(fileURLWithPath: "PrivacyInfo.xcprivacy"))
let plist = try PropertyListSerialization.propertyList(from: data, format: nil) as! [String: Any]
print(plist.keys.sorted())
print("tracking:", plist["NSPrivacyTracking"] as Any)
let apis = plist["NSPrivacyAccessedAPITypes"] as! [[String: Any]]
for api in apis { print(api["NSPrivacyAccessedAPIType"]!, api["NSPrivacyAccessedAPITypeReasons"]!) }
print("collected:", (plist["NSPrivacyCollectedDataTypes"] as! [Any]).count)
~~~

- [[PropertyListSerialization.propertyList(from:format:)]]: بيحوّل الـ plist لقيم Swift: [[dict]] ← Dictionary، و [[array]] ← Array، و [[false]] ← Bool.
- [[as! [String: Any]]]: نعامله dictionary مفاتيحه نصوص.

~~~text الناتج (Swift 6.4، لينكس)
["NSPrivacyAccessedAPITypes", "NSPrivacyCollectedDataTypes", "NSPrivacyTracking"]
tracking: Optional(false)
NSPrivacyAccessedAPICategoryUserDefaults ["CA92.1"]
collected: 0
~~~

التلات مفاتيح موجودين، والـ tracking [[false]]، و API واحد بسبب واحد، وصفر داتا متجمعة. لو كان فيه غلطة في الـ XML (tag مش مقفول مثلًا)، السطر التالت كان هيرمي error.

---

## ٦. الـ try والـ sol (من docs بتاعة Apple)

- File ← New ← File ← App Privacy بيعمل الملف، وبيتفتح كجدول. كليك يمين ← Open As ← Source Code بيوريك الـ XML ده.
- [[NSCameraUsageDescription]] في Info.plist (في تاب Info اسمه Privacy - Camera Usage Description): الرسالة اللي بتظهر في نافذة الإذن. لازم سبب محدد.

| الـ guideline | الخلاصة |
|---|---|
| 2.1 | التطبيق كامل وشغال، و demo account لو فيه login |
| 4.2 | قيمة أكتر من موقع ملفوف في WebView |
| 5.1.1 | اطلب اللي محتاجه بس، بسبب واضح، ومسح الحساب متاح |

## الخلاصة

- الـ privacy manifest plist بـ ٣ مفاتيح: tracking، والـ APIs بأسبابها، والداتا المتجمعة.
- [[@AppStorage]] = UserDefaults = لازم سبب (غالبًا [[CA92.1]]).
- أي SDK تضيفه ليه manifest، وراجع App Privacy في App Store Connect معاه.`,
          lines: [
            "رأس ملف XML.",
            "الـ plist.",
            "dictionary رئيسي.",
            "مفتاح: هل بتعمل tracking؟",
            "لأ.",
            R`مفتاح: الـ required reason APIs اللي بتستخدمها.`,
            "array.",
            "API واحد.",
            "نوعه:",
            R`UserDefaults (يعني [[@AppStorage]] كمان).`,
            "الأسباب:",
            "array أسباب.",
            R`[[CA92.1]]: بقرا وبكتب داتا خاصة بالتطبيق نفسه بس.`,
            "قفلة الأسباب.",
            "قفلة الـ API.",
            "قفلة الـ array.",
            "مفتاح: الداتا اللي بتتجمع.",
            "فاضية: مش بنجمع حاجة.",
            "قفلة الـ dict.",
            "قفلة الـ plist."
          ],
          sol: R`الـ [[PrivacyInfo.xcprivacy]] لما Xcode يعمله بيفتح بمحرر جدول، وتقدر تفتحه كـ Source Code (كليك يمين ← Open As ← Source Code) فتلاقيه زي المثال.

رسالة الكاميرا في تاب Info: [[Privacy - Camera Usage Description]] = «عشان تصوّر الفاتورة وتضيفها للمصروف من غير ما تكتبها بإيدك». وده بيظهر للمستخدم في نافذة الإذن.

ملخص الـ sections:
• 2.1: التطبيق لازم يبقى كامل وشغال، ومعاه demo account لو فيه login.
• 4.2: لازم يقدّم قيمة أكتر من موقع ملفوف.
• 5.1.1: اطلب الداتا اللي محتاجها بس، وبسبب واضح، ومسح الحساب لازم يبقى متاح.`
        },
        {
          cmd: "سوق iOS والانترفيو",
          title: "سوق شغل iOS في مصر والخليج وريموت، وأشهر أسئلة انترفيو Swift و SwiftUI",
          desc: R`صورة صريحة للسوق (2025 و 2026):
• في مصر، وظايف Native iOS أقل عددًا من Android ومن Flutter، لأن شركات كتير بتعمل التطبيقين بـ Flutter أو React Native عشان التكلفة. بس المنافسة على iOS كمان أقل، والشركات الكبيرة (بنوك، fintech، توصيل، شركات بتشتغل لعملاء برة) لسه بتطلب Native، والمرتبات غالبًا أعلى شوية من المتوسط لنفس الخبرة.
• في الخليج (السعودية والإمارات)، الطلب على iOS Native أعلى بسبب نسبة مستخدمي iPhone العالية والتطبيقات الحكومية والبنكية.
• الريموت والفريلانس: موجود بس تنافسي جدًا. اللي بيكسب فيه: تطبيقات منشورة فعلًا، و GitHub نضيف، وإنجليزي كويس.
• العائق الحقيقي: الماك. بدونه مش هتعرف تشتغل iOS، فحسبها في خطتك.

الإعلانات بتطلب عادةً: Swift و SwiftUI و UIKit (الاتنين)، و MVVM أو Clean Architecture، و async/await و Combine (في الكود القديم)، و Core Data أو SwiftData، و REST و JSON، و Git، و unit tests، وخبرة رفع على المتجر. ولو تعرف Kotlin أو Flutter بجانبها ده ميزة.

أسئلة انترفيو بتتكرر (جاوبها بصوت عالي لحد ما تبقى سلسة):
1. struct ولا class؟ value vs reference، وإمتى تستخدم كل واحد.
2. Optional إيه، وطرق فكه، وليه [[!]] خطر.
3. ARC و retain cycle و [[weak]] و [[unowned]] و [[[weak self]]] (وممكن يديك كود يسألك فيه leak ولا لأ).
4. [[@State]] و [[@Binding]] و [[@Observable]] و [[@Environment]]: مين يملك الداتا.
5. إيه اللي بيحصل لما الـ state تتغير في SwiftUI؟ (body بيتحسب تاني، و diffing).
6. async/await vs completion handlers، و [[actor]] و [[@MainActor]] و [[Sendable]] و data races.
7. [[some]] vs [[any]].
8. protocol-oriented programming و protocol extensions.
9. إزاي تختبر view model بيكلم API؟ (protocol + fake).
10. الفرق بين [[escaping]] و non-escaping closure.
11. App lifecycle و ScenePhase، وإزاي التطبيق بيتصرف في الخلفية.
12. إزاي هتعمل pagination أو image caching أو offline mode؟ (أسئلة design).

وفيه غالبًا تاسك عملي (take-home): شاشة بتجيب داتا من API وتعرضها في List بتفاصيل، مع loading و error، وأحيانًا بحث وcache. ده بالظبط اللي اتعلمته في المستوى التاني + MVVM والاختبارات.

المثال تحت سؤال «اكتب الناتج» مشهور. حاول تتوقعه قبل ما تشغّله.`,
          example: R`final class Screen {
  let name: String
  var onClose: (() -> Void)?
  init(name: String) { self.name = name }
  deinit { print("\(name) اتمسحت") }
}
struct Score {
  var value = 0
}
var a = Score()
var b = a
b.value = 10
print(a.value, b.value)
func openHome() {
  let home = Screen(name: "home")
  home.onClose = { [weak home] in
    print("قفلنا \(home?.name ?? "-")")
  }
  home.onClose?()
}
func openProfile() {
  let profile = Screen(name: "profile")
  profile.onClose = {
    print("قفلنا \(profile.name)")
  }
  profile.onClose?()
}
openHome()
openProfile()
print("خلصنا")`,
          try: R`قبل ما تشغّل: اكتب على ورقة الناتج سطر سطر، وقول هل [[profile اتمسحت]] هتظهر ولا لأ وليه. وبعدين شغّل بـ [[swift main.swift]] وقارن، وصلّح [[openProfile]] بحيث السطر ده يظهر. وأخيرًا جاوب على أول 6 أسئلة من القايمة بصوت عالي، دقيقتين لكل سؤال.`,
          flag: "script",
          deep: {
            why: R`الانترفيو مش بيقيس إنك حفظت تعريفات، بيقيس إنك تقدر تتوقع الكود هيعمل إيه وتشرح ليه. الأسئلة اللي فوق متكررة لدرجة إن عدم الإجابة عليها بيوقف المقابلة بدري، والإجابة الكويسة عليها بتفتح كلام عن خبرتك.`,
            how: R`السؤال ده بيختبر 3 حاجات:
1. [[Score]] struct، فـ [[b]] نسخة مستقلة: [[0 10]].
2. [[openHome]]: الـ closure ماسك [[home]] weak، فمفيش cycle. لما الدالة تخلص الثابت [[home]] بيختفي، ومفيش حد ماسك الشاشة بقوة، فـ deinit بيشتغل: [[home اتمسحت]].
3. [[openProfile]]: الـ closure بيستخدم [[profile]] من غير capture list، فبيمسكه بقوة. والـ object ماسك الـ closure في [[onClose]]. يعني cycle، ولما الدالة تخلص الاتنين بيفضلوا ماسكين بعض في الذاكرة ومحدش يقدر يوصلهم: leak. عشان كده [[profile اتمسحت]] مش بتظهر خالص.

الحل: [[{ [weak profile] in print(profile?.name ?? "-") }]]، أو [[[unowned profile]]] لو متأكد إن الـ closure مش هيتنادى بعد ما الشاشة تتمسح. ونفس الكلام بالظبط مع [[self]] جوه class: [[[weak self]]].

تفصيلة بتفرق في الانترفيو: لو الـ closure بيستخدم [[var]] (مش [[let]])، هو بيمسك المتغير نفسه مش القيمة. فلو عملت [[profile = nil]] بعد كده الـ cycle بيتكسر. عشان كده الأسئلة دي بتيجي غالبًا بـ [[let]] أو بـ [[self]].`,
            when: R`ذاكر الأسئلة دي قبل أي انترفيو iOS، واعمل مشروع take-home لنفسك قبلها (القايمة والتفاصيل والـ API) في 4 ساعات كتمرين.`,
            mistakes: R`تحفظ إجابات من غير ما تقدر تكتب كود يثبتها. وتقول «SwiftUI بس» لما يسألوك عن UIKit: قول إنك فاهم المفاهيم ومستعد تتعلمه. وتعمل take-home من غير error handling ولا tests ولا README: دي الحاجات اللي بتفرق. وتبعت CV فيه «iOS Developer» من غير لينك لتطبيق أو repo.`
          },
          teach: R`## البرنامج بيعمل إيه؟

ده سؤال انترفيو مشهور «اكتب الناتج». بيختبر حاجتين في نفس الكود: الفرق بين struct و class في النسخ، وإمتى object بيتمسح من الذاكرة ومتى بيفضل عايش بسبب retain cycle. حاول تتوقع الناتج قبل ما تقرا.

كل الناتج هنا من [[swift main.swift]] على Swift 6.4 في Docker (لينكس)، وكمان اتجرب بـ [[-swift-version 6]] من غير أي error.

---

## ١. [[Screen]]: class بيقول لما يتمسح

~~~swift
final class Screen {
  let name: String
  var onClose: (() -> Void)?
  init(name: String) { self.name = name }
  deinit { print("\(name) اتمسحت") }
}
~~~

- [[var onClose: (() -> Void)?]]: خانة شايلة closure (دالة مش بتاخد حاجة ومش بترجّع حاجة)، و [[?]] optional (ممكن تبقى [[nil]]). الأقواس حوالين [[() -> Void]] عشان الـ [[?]] تبقى على نوع الدالة كلها.
- [[deinit]]: بيتنادى أوتوماتيك لحظة ما الـ object يتمسح من الذاكرة. ARC (Automatic Reference Counting) بيمسح الـ object لما عدد اللي **ماسكينه بقوة** (strong references) يبقى صفر.

---

## ٢. struct = نسخة

~~~swift
struct Score {
  var value = 0
}
var a = Score()
var b = a
b.value = 10
print(a.value, b.value)
~~~

[[var b = a]] مع struct (value type) بيعمل **نسخة مستقلة**. فتعديل [[b]] ملوش دعوة بـ [[a]]:

~~~text الناتج
0 10
~~~

لو [[Score]] كان class، الاتنين هيشاوروا على نفس الـ object والناتج [[10 10]].

---

## ٣. [[openHome]]: بـ [[[weak home]]]

~~~swift
func openHome() {
  let home = Screen(name: "home")
  home.onClose = { [weak home] in
    print("قفلنا \(home?.name ?? "-")")
  }
  home.onClose?()
}
~~~

- [[let home]]: الثابت المحلي ده هو الـ strong reference الوحيد للشاشة.
- [[[weak home] in]]: capture list: الـ closure يمسك [[home]] **weak** (ضعيف): مش بيعدّ في ARC، وبيبقى optional، فبنكتب [[home?.name]].
- [[?? "-"]]: لو [[nil]] اطبع شَرطة.
- [[home.onClose?()]]: نادي الـ closure لو موجود.

الشاشة ماسكة الـ closure بقوة، والـ closure ماسك الشاشة weak. لما الدالة تخلص، [[home]] بيختفي، فمحدش ماسك الشاشة بقوة، فـ [[deinit]] بيشتغل:

~~~text الناتج
قفلنا home
home اتمسحت
~~~

---

## ٤. [[openProfile]]: من غير capture list

~~~swift
func openProfile() {
  let profile = Screen(name: "profile")
  profile.onClose = {
    print("قفلنا \(profile.name)")
  }
  profile.onClose?()
}
~~~

الـ closure بيستخدم [[profile]] على طول، فبيمسكه **strong**. ودلوقتي:

~~~text الدايرة
Screen(profile)  ──onClose──▶  closure
      ▲                          │
      └──────── strong ──────────┘
~~~

لما الدالة تخلص، [[let profile]] بيختفي، بس الشاشة لسه ممسوكة من الـ closure، والـ closure ممسوك من الشاشة. العدد عمره ما بيوصل صفر، فـ [[deinit]] **مش** بيتنادى. ده الـ retain cycle، والنتيجة leak: ذاكرة محدش يقدر يوصلها ولا تتمسح.

---

## ٥. الناتج كله

~~~swift
openHome()
openProfile()
print("خلصنا")
~~~

~~~text الناتج (Swift 6.4، لينكس)
0 10
قفلنا home
home اتمسحت
قفلنا profile
خلصنا
~~~

[[profile اتمسحت]] مظهرتش خالص، حتى بعد [[خلصنا]]. ولاحظ إن Swift 6 mode مطلعتش error: الـ compiler مش بيمسك الـ retain cycles، دي مسؤوليتك (و Memory Graph في Xcode بيساعدك تلاقيها).

---

## ٦. الـ solCode: التصليح

~~~swift
func openProfile() {
  let profile = Screen(name: "profile")
  profile.onClose = { [weak profile] in
    print("قفلنا \(profile?.name ?? "-")")
  }
  profile.onClose?()
}
~~~

~~~text الناتج بعد التصليح
0 10
قفلنا home
home اتمسحت
قفلنا profile
profile اتمسحت
خلصنا
~~~

[[profile اتمسحت]] ظهرت على طول بعد [[قفلنا profile]]، يعني الشاشة اتمسحت أول ما الدالة خلصت.

| الحالة | الـ closure ماسك الشاشة | الشاشة بتتمسح؟ |
|---|---|---|
| [[[weak home]]] | weak | أيوه |
| من غير capture list | strong | لأ (cycle) |
| [[[unowned x]]] | مش بيعدّ ومش optional | أيوه، بس crash لو اتنادى بعد المسح |

## الخلاصة

- struct بيتنسخ، و class بيتشارك.
- object ماسك closure، والـ closure ماسك نفس الـ object بقوة = retain cycle = leak.
- الحل [[[weak x]]] (أو [[[weak self]]] جوه class)، وأي سؤال «اكتب الناتج» فكّر فيه بعدد الـ strong references.`,
          lines: [
            "class شاشة.",
            "الاسم.",
            "closure متخزن.",
            "init.",
            "deinit بيطبع لما تتمسح.",
            "قفلة.",
            "struct.",
            "قيمة.",
            "قفلة.",
            "نسخة أولى.",
            R`[[b]] نسخة مستقلة.`,
            "بنعدّل النسخة.",
            "0 و 10.",
            "دالة بتفتح شاشة.",
            R`ثابت محلي.`,
            R`closure ماسك [[home]] weak.`,
            "بيطبع الاسم لو موجود.",
            "قفلة.",
            "بننادي الـ closure.",
            "قفلة: هنا home بتتمسح.",
            "دالة تانية.",
            "ثابت محلي.",
            R`closure بيستخدم [[profile]] من غير capture list: strong.`,
            "بيطبع الاسم.",
            "قفلة.",
            "بننادي الـ closure.",
            "قفلة: profile مش بتتمسح (cycle).",
            "بننادي الأولى.",
            "بننادي التانية.",
            "آخر سطر."
          ],
          sol: R`الناتج الحقيقي (اتجرب بـ [[swift main.swift]]):
[[0 10]]
[[قفلنا home]]
[[home اتمسحت]]
[[قفلنا profile]]
[[خلصنا]]

[[profile اتمسحت]] مظهرتش: retain cycle بين الشاشة والـ closure. بعد التصليح الناتج بيبقى فيه [[profile اتمسحت]] بعد [[قفلنا profile]] على طول:`,
          solCode: R`func openProfile() {
  let profile = Screen(name: "profile")
  profile.onClose = { [weak profile] in
    print("قفلنا \(profile?.name ?? "-")")
  }
  profile.onClose?()
}`
        },
        {
          cmd: "مشروع التخرج",
          title: "مشروع التخرج: تطبيق عادات يومية بـ SwiftUI و SwiftData و API و اختبارات، ترفعه على TestFlight",
          desc: R`المشروع ده بيجمع كل التاب في تطبيق واحد يتحط في الـ CV. اسمه مثلًا «عاداتي»: المستخدم بيضيف عادات يومية (قراية، رياضة، شرب مية) ويعلّم عليها كل يوم، ويشوف الـ streak بتاعه.

المتطلبات (اعمل checklist واشطب):
1. اللغة والبنية: Swift 6 language mode (أو إعدادات Xcode 26 الجديدة) من غير أخطاء concurrency. أقل نسخة iOS 18.
2. البيانات: SwiftData بـ [[@Model]] للـ [[Habit]] و [[CheckIn]] (علاقة one-to-many بـ cascade delete).
3. الشاشات: [[TabView]] بتلات تابات (العادات، الإحصائيات، الإعدادات)، كل واحد فيه [[NavigationStack]]. شاشة تفاصيل لكل عادة، و sheet لإضافة عادة بـ [[Form]] و validation.
4. الحالة: view model بـ [[@Observable]] و [[@MainActor]] للشاشة اللي فيها logic (الإحصائيات وحساب الـ streak)، و [[@AppStorage]] للإعدادات (المظهر، وساعة التذكير).
5. النت: شاشة «اقتباس اليوم» بتجيب من API مجاني بـ [[URLSession]] و Codable، بحالات loading و error و retry.
6. الجودة: Swift Testing لحساب الـ streak (يوم فاضي بيقطع السلسلة، والتغيير بين الأيام بالـ timezone) وللـ view model بـ fake service. ومفيش [[!]] في كود التطبيق إلا في URL ثابت.
7. الـ UX: Dark Mode، و Dynamic Type (جرّب أكبر خط)، و RTL، و VoiceOver labels على الأيقونات، و [[ContentUnavailableView]] لما مفيش عادات.
8. النشر: privacy manifest، وأيقونة، و TestFlight (لو عندك Developer Program)، و README فيه screenshots وشرح المعمارية وإزاي تشغّل الاختبارات.

ابدأ بالأصغر: model و List وإضافة ومسح (يوم). بعدين الـ streak والاختبارات (يوم). بعدين التابات والإحصائيات (يوم). بعدين الـ API والتلميع (يوم). ورفع (نص يوم). وكل خطوة commit.

مستوى أعلى لو خلصت: Widget بـ WidgetKit بيعرض الـ streak، وإشعار تذكير محلي بـ [[UserNotifications]]، و App Intents عشان Siri و Shortcuts. ودي حاجات بتفرق في الانترفيو لأنها مش في كل الكورسات.`,
          example: R`import SwiftUI
import SwiftData

@main
struct HabitsApp: App {
  @AppStorage("theme") private var theme = "system"
  var body: some Scene {
    WindowGroup {
      TabView {
        Tab("العادات", systemImage: "checklist") {
          NavigationStack { HabitsScreen() }
        }
        Tab("الإحصائيات", systemImage: "chart.bar") {
          NavigationStack { StatsScreen() }
        }
        Tab("الإعدادات", systemImage: "gear") {
          NavigationStack { SettingsScreen() }
        }
      }
      .preferredColorScheme(theme == "dark" ? .dark : theme == "light" ? .light : nil)
    }
    .modelContainer(for: [Habit.self, CheckIn.self])
  }
}`,
          try: R`ابدأ بالـ models: [[Habit]] (اسم، وأيقونة SF Symbol، وتاريخ الإنشاء، و [[@Relationship(deleteRule: .cascade) var checkIns: [CheckIn] = []]]) و [[CheckIn]] (تاريخ). وبعدين اكتب دالة [[streak(for dates: [Date], today: Date) -> Int]] واختبرها بـ Swift Testing قبل ما تعمل أي شاشة.`,
          flag: "script",
          deep: {
            why: R`الكورسات بتعلّمك كل حاجة لوحدها، بس الشغل الحقيقي هو إنك تربطهم: SwiftData مع view model مع navigation مع اختبارات مع رفع. والمشروع اللي بيعدي كل ده ومنشور على TestFlight أو المتجر بيتكلم عنك في الانترفيو أكتر من أي شهادة.`,
            how: R`الـ [[App]] بيجهز الحاجات المشتركة: الـ [[modelContainer]] لكل الـ models، والمظهر من [[@AppStorage]]. و [[Tab]] (iOS 18) هو الطريقة الجديدة لكتابة التابات، وكل تاب جواه [[NavigationStack]] بتاعه عشان كل تاب يحتفظ بمكانه لما تتنقل بينهم. (لو هتدعم iOS 17 استخدم [[.tabItem { Label(...) }]] على كل شاشة).

حساب الـ streak هو أصعب logic في المشروع: لازم تتعامل مع الأيام مش الساعات ([[Calendar.current.startOfDay(for:)]] و [[isDate(_:inSameDayAs:)]])، ومع يوم النهارده لو لسه متعلمش. عشان كده بنقول اكتبه دالة pure ومعاها اختبارات الأول.

[[HabitsScreen]] و [[StatsScreen]] و [[SettingsScreen]] انت اللي هتكتبهم من دروس المستوى التاني.`,
            when: R`بعد ما تخلص المستويين الأول والتاني ودروس MVVM والاختبارات. وخليه في repo على GitHub من أول يوم.`,
            mistakes: R`تبدأ بالتصميم والألوان قبل الـ model والـ logic. وتعمل 10 features بنص جودة بدل 5 كاملين. ومتكتبش README. وتنسى تجرب Dark Mode و الخط الكبير. وتحط كل الكود في [[ContentView.swift]].`
          },
          teach: R`## الكود ده بيعمل إيه؟

ده نقطة البداية بتاعة تطبيق «عاداتي»: الـ [[App]] اللي بيعمل ٣ تابات تحت (العادات، الإحصائيات، الإعدادات)، كل تاب فيه [[NavigationStack]] بتاعه، وبيطبّق المظهر المحفوظ، وبيجهز داتابيز SwiftData للـ models الاتنين. والـ solCode فيه الـ models ودالة حساب الـ streak (كام يوم ورا بعض) واختبارها.

### اتجرّب فين؟

- الـ App و [[TabView]] و [[Tab]] و [[@Model]] و [[.modelContainer]]: SwiftUI و SwiftData على أنظمة Apple بس، فدول من docs بتاعة Apple.
- دالة [[streak]] والاختبار بتاعها Swift عادي (Foundation و Swift Testing)، فحطيناهم في الـ package بتاع درس SPM وشغّلناهم بـ [[swift test]] على Swift 6.4 في Docker (لينكس): [[✔ Test streakCountsConsecutiveDays() passed]].

---

## ١. الـ App

~~~swift
@main
struct HabitsApp: App {
  @AppStorage("theme") private var theme = "system"
  var body: some Scene {
    WindowGroup {
      TabView {
~~~

- [[@main]]: البداية. و [[@AppStorage("theme")]]: المظهر المحفوظ ([[system]] أو [[light]] أو [[dark]] كنص).
- [[TabView]]: التابات اللي تحت الشاشة.

---

## ٢. التابات: [[Tab]]

~~~swift
        Tab("العادات", systemImage: "checklist") {
          NavigationStack { HabitsScreen() }
        }
        Tab("الإحصائيات", systemImage: "chart.bar") {
          NavigationStack { StatsScreen() }
        }
        Tab("الإعدادات", systemImage: "gear") {
          NavigationStack { SettingsScreen() }
        }
      }
~~~

- [[Tab("العادات", systemImage: "checklist")]]: تاب بعنوان وأيقونة SF Symbol. ده الشكل الجديد من iOS 18. (لـ iOS 17: [[.tabItem { Label(...) }]] على كل شاشة.)
- كل تاب جواه [[NavigationStack]] بتاعه: لو دخلت تفاصيل عادة وروحت الإعدادات ورجعت، تلاقي نفسك في التفاصيل. (مش [[NavigationStack]] واحد برة الـ TabView.)
- [[HabitsScreen]] و [[StatsScreen]] و [[SettingsScreen]]: انت اللي هتكتبهم من دروس المستوى التاني.

---

## ٣. المظهر

~~~swift
      .preferredColorScheme(theme == "dark" ? .dark : theme == "light" ? .light : nil)
    }
~~~

ternary جوه ternary، يتقري من الشمال: لو [["dark"]] يبقى [[.dark]]، وإلا لو [["light"]] يبقى [[.light]]، وإلا [[nil]] (زي النظام).

---

## ٤. الداتابيز

~~~swift
    .modelContainer(for: [Habit.self, CheckIn.self])
  }
}
~~~

داتابيز واحدة فيها الجدولين، على الـ [[WindowGroup]] فكل الشاشات تشوفها.

---

## ٥. الـ solCode: الـ models

~~~swift
@Model
final class Habit {
  var name: String
  var symbol: String
  var createdAt: Date
  @Relationship(deleteRule: .cascade) var checkIns: [CheckIn] = []
  ...
}

@Model
final class CheckIn {
  var date: Date
  init(date: Date = .now) { self.date = date }
}
~~~

- [[Habit]] عادة: اسم وأيقونة وتاريخ.
- [[@Relationship(deleteRule: .cascade)]]: علاقة one-to-many (عادة ليها check-ins كتير)، و [[.cascade]] = لما العادة تتمسح، الـ check-ins بتاعتها تتمسح معاها.
- [[CheckIn]]: يوم علّمت فيه على العادة.

---

## ٦. الـ solCode: [[streak]]

~~~swift
func streak(for dates: [Date], today: Date, calendar: Calendar = .current) -> Int {
  let days = Set(dates.map { calendar.startOfDay(for: $0) })
  var day = calendar.startOfDay(for: today)
  // لو النهارده لسه متعلمش، نبدأ العد من امبارح
  if !days.contains(day) {
    day = calendar.date(byAdding: .day, value: -1, to: day)!
  }
  var count = 0
  while days.contains(day) {
    count += 1
    day = calendar.date(byAdding: .day, value: -1, to: day)!
  }
  return count
}
~~~

خطوة خطوة:

1. [[calendar.startOfDay(for:)]]: يحوّل أي وقت لأول اليوم (الساعة ١٢ بالليل). كده check-in الساعة ٩ الصبح وواحد الساعة ١١ بالليل في نفس اليوم بيبقوا قيمة واحدة.
2. [[Set(...)]]: مجموعة من غير تكرار، والبحث فيها بـ [[contains]] سريع.
3. [[calendar.date(byAdding: .day, value: -1, to: day)]]: اليوم اللي قبله. بترجّع optional، و [[!]] آمن هنا لأن طرح يوم من تاريخ صالح دايمًا بينجح.
4. لو النهارده مش متعلّم، نبدأ من امبارح (اليوم لسه مخلصش، فمش هنقطع السلسلة).
5. [[while]]: طول ما اليوم موجود في المجموعة، زوّد العداد وارجع يوم.
6. [[calendar]] parameter بقيمة افتراضية [[.current]]: في التطبيق تقويم الجهاز، وفي الاختبار تقويم ثابت.

---

## ٧. الاختبار

~~~swift
@Test func streakCountsConsecutiveDays() {
  var cal = Calendar(identifier: .gregorian)
  cal.timeZone = TimeZone(identifier: "Africa/Cairo")!
  let today = cal.date(from: DateComponents(year: 2026, month: 5, day: 10, hour: 9))!
  let days = [0, 1, 2, 4].map { cal.date(byAdding: .day, value: -$0, to: today)! }
  #expect(streak(for: days, today: today, calendar: cal) == 3)
  #expect(streak(for: Array(days.dropFirst()), today: today, calendar: cal) == 2)
  #expect(streak(for: [], today: today, calendar: cal) == 0)
}
~~~

- تقويم ميلادي بتوقيت القاهرة ثابت، فالاختبار بيطلع نفس النتيجة على أي جهاز وأي timezone.
- [[today]]: ١٠ مايو ٢٠٢٦ الساعة ٩.
- [[days]]: النهارده، وامبارح، وأول امبارح، وقبلها بـ ٤ أيام. (اليوم التالت قبل كده ناقص.)

| الحالة | الأيام | الناتج المتوقع | ليه |
|---|---|---|---|
| ١ | ١٠، ٩، ٨، ٦ | [[3]] | ١٠ و ٩ و ٨ ورا بعض، و ٧ ناقص فبيقطع |
| ٢ | ٩، ٨، ٦ ([[dropFirst()]] شال النهارده) | [[2]] | النهارده مش متعلّم فنبدأ من ٩: ٩ و ٨ |
| ٣ | ولا يوم | [[0]] | |

~~~text الناتج من swift test (Swift 6.4، لينكس)
✔ Test streakCountsConsecutiveDays() passed after 0.002 seconds.
~~~

## الخلاصة

- الـ App بيجهز المشترك: التابات (كل واحد بـ [[NavigationStack]] بتاعه)، والمظهر، والداتابيز.
- أصعب logic (الـ streak) اتكتب دالة pure بتاخد التاريخ والتقويم، فاتختبرت من غير شاشة ومن غير SwiftData.
- ابدأ بالـ models والـ logic والاختبارات، وبعدين الشاشات.`,
          lines: [
            "SwiftUI.",
            "SwiftData.",
            "نقطة البداية.",
            "الـ App.",
            R`المظهر من [[@AppStorage]].`,
            "body.",
            "الشباك.",
            R`[[TabView]]: التابات تحت.`,
            R`[[Tab]] (iOS 18): عنوان وأيقونة.`,
            R`كل تاب ليه [[NavigationStack]] بتاعه.`,
            "قفلة.",
            "تاب الإحصائيات.",
            "شاشته.",
            "قفلة.",
            "تاب الإعدادات.",
            "شاشته.",
            "قفلة.",
            "قفلة TabView.",
            R`المظهر حسب الإعداد، و [[nil]] = زي النظام.`,
            "قفلة WindowGroup.",
            "الداتابيز للـ models الاتنين.",
            "قفلة body.",
            "قفلة."
          ],
          sol: R`الـ models ودالة الـ streak واختباراتها (الدالة pure فتقدر تجربها على Linux كمان من غير SwiftData):`,
          solCode: R`@Model
final class Habit {
  var name: String
  var symbol: String
  var createdAt: Date
  @Relationship(deleteRule: .cascade) var checkIns: [CheckIn] = []
  init(name: String, symbol: String = "star", createdAt: Date = .now) {
    self.name = name
    self.symbol = symbol
    self.createdAt = createdAt
  }
}

@Model
final class CheckIn {
  var date: Date
  init(date: Date = .now) { self.date = date }
}

func streak(for dates: [Date], today: Date, calendar: Calendar = .current) -> Int {
  let days = Set(dates.map { calendar.startOfDay(for: $0) })
  var day = calendar.startOfDay(for: today)
  // لو النهارده لسه متعلمش، نبدأ العد من امبارح
  if !days.contains(day) {
    day = calendar.date(byAdding: .day, value: -1, to: day)!
  }
  var count = 0
  while days.contains(day) {
    count += 1
    day = calendar.date(byAdding: .day, value: -1, to: day)!
  }
  return count
}

@Test func streakCountsConsecutiveDays() {
  var cal = Calendar(identifier: .gregorian)
  cal.timeZone = TimeZone(identifier: "Africa/Cairo")!
  let today = cal.date(from: DateComponents(year: 2026, month: 5, day: 10, hour: 9))!
  let days = [0, 1, 2, 4].map { cal.date(byAdding: .day, value: -$0, to: today)! }
  #expect(streak(for: days, today: today, calendar: cal) == 3)
  #expect(streak(for: Array(days.dropFirst()), today: today, calendar: cal) == 2)
  #expect(streak(for: [], today: today, calendar: cal) == 0)
}`
        }
      ]
    }
]);
