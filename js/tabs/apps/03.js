// تكملة تاب apps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/apps/01.js (شرح حقول الدرس في أوله)
MORE("apps", [
    {
      t: "التوقيع والنشر",
      l: 3,
      n: "مفتاح توقيع ثابت، ورقم نسخة بيزيد، و APK بيتبني ويتنشر لوحده",
      items: [
        {
          cmd: "keytool",
          title: "مفتاح توقيع للإصدارات",
          desc: R`كل APK لازم يبقى موقّع، وأندرويد مش بيقبل تحديث إلا لو موقّع بنفس المفتاح بتاع النسخة المتسطّبة. [[keytool]] (بييجي مع JDK) بيعمل المفتاح ده مرة واحدة في ملف keystore.

الملف ده أهم ملف في المشروع: لو ضاع مش هتقدر تحدّث التطبيق تاني. ولو اتسرب، أي حد يقدر يعمل «تحديث» باسمك. عشان كده مينفعش يتعمله commit أبدًا.`,
          example: R`keytool -genkeypair -v -keystore release.p12 -storetype PKCS12 -alias myapp -keyalg RSA -keysize 2048 -validity 10000
keytool -list -v -keystore release.p12
echo "*.p12" >> .gitignore
echo "*.jks" >> .gitignore
git check-ignore -v release.p12
cd android && ./gradlew assembleRelease`,
          try: "اعمل keystore تجربة، واتأكد بـ [[git check-ignore]] إنه متجاهَل، وبعدين اعمل backup منه في مكانين (password manager ومكان offline).",
          deep: {
            why: "النسخة اللي بتتوزع لازم تتوقّع بمفتاح واحد ثابت طول عمر التطبيق. مفتاح debug بيختلف من جهاز للتاني، فمينفعش للإصدارات.",
            how: R`[[-genkeypair]] بيعمل مفتاح جديد. [[-storetype PKCS12]] الصيغة الحديثة (.p12)، والقديمة كانت .jks. [[-alias]] اسم المفتاح جوه الملف. [[-validity 10000]] يوم، يعني حوالي ٢٧ سنة. هيسألك على باسورد وعلى اسمك وبلدك.

[[-list -v]] بيعرض اللي في الملف وبصمة الشهادة (SHA-256)، ودي اللي بتحتاجها لـ Google Sign-In أو Firebase.

ربطه بـ Gradle: في [[android/app/build.gradle]] جوه [[signingConfigs { release { ... } }]] بتقرا القيم من متغيرات بيئة: [[storeFile file(System.getenv("RELEASE_KEYSTORE_FILE"))]] و [[storePassword System.getenv("RELEASE_STORE_PASSWORD")]] وكمان [[keyAlias System.getenv("RELEASE_KEY_ALIAS")]] و [[keyPassword System.getenv("RELEASE_KEY_PASSWORD")]] (في PKCS12 باسورد المفتاح هو نفس باسورد الـ keystore)، وبعدين في [[buildTypes { release { signingConfig signingConfigs.release } }]]. كده مفيش ولا باسورد في الكود، والـ CI بيدّي نفس المتغيرات.

[[git check-ignore -v]] بيقولك الملف متجاهَل بسبب أنهي سطر. لو مطبعش حاجة يبقى مش متجاهَل.

و [[apksigner verify --print-certs app-release.apk]] (من build-tools) بيتأكد إن الـ APK موقّع بالمفتاح اللي انت فاكره.`,
            when: "قبل أول نسخة تتوزع على أي حد.",
            mistakes: R`الـ keystore اتعمله commit في repo عام: اعتبره اتسرب، ومسحه من التاريخ مش كفاية. والباسورد مكتوب في build.gradle. ومفيش backup: الجهاز باظ والمفتاح راح، والتطبيق اللي بره Play Store مش هيتحدّث تاني غير لو الناس مسحته وسطّبته من جديد.`
          },
          teach: R`## الفكرة

كل APK لازم يبقى **موقّع** بمفتاح، وأندرويد مش بيقبل تحديث غير لو موقّع بنفس مفتاح النسخة المتسطّبة. [[keytool]] (بييجي مع أي JDK) بيعمل المفتاح ده مرة واحدة في ملف اسمه **keystore**. والأوامر التانية بتتأكد إن الملف ده عمره ما يدخل Git.

جربت الأوامر الخمسة الأولى في Docker على أوبونتو 24.04 بـ OpenJDK 21. والأخير ([[assembleRelease]]) محتاج Android SDK فمش متجرّب هنا (شوف درس [[./gradlew assembleDebug]]).

---

## ١. [[keytool -genkeypair ...]]

~~~bash
keytool -genkeypair -v -keystore release.p12 -storetype PKCS12 -alias myapp -keyalg RSA -keysize 2048 -validity 10000
~~~

| الحتة | معناها |
|---|---|
| [[-genkeypair]] | اعمل زوج مفاتيح: **private** (سري، بيوقّع) و **public** (بيتحط في الشهادة جوه كل APK) |
| [[-v]] | verbose: اطبع تفاصيل أكتر |
| [[-keystore release.p12]] | اسم الملف اللي هيتحفظ فيه |
| [[-storetype PKCS12]] | صيغة الملف. PKCS12 (امتداده [[.p12]]) هي الصيغة القياسية الحديثة، والقديمة كانت [[.jks]] (Java KeyStore) |
| [[-alias myapp]] | اسم المفتاح جوه الملف (الملف ممكن يشيل كذا مفتاح) |
| [[-keyalg RSA -keysize 2048]] | نوع التشفير وطوله بالـ bit |
| [[-validity 10000]] | الشهادة صالحة ١٠٠٠٠ يوم، يعني حوالي ٢٧ سنة |

الأمر بيسألك أسئلة:

~~~text الأسئلة
Enter keystore password:
Re-enter new password:
What is your first and last name?
  [Unknown]:
What is the name of your organizational unit?
What is the name of your organization?
What is the name of your City or Locality?
What is the name of your State or Province?
What is the two-letter country code for this unit?
Is CN=Ali Hassan, OU=Dev, O=Example, L=Cairo, ST=Cairo, C=EG correct?
  [no]:  yes
~~~

الإجابات دي اسمها **dname** (distinguished name): [[CN]] الاسم، و [[OU]] القسم، و [[O]] الشركة، و [[L]] المدينة، و [[ST]] المحافظة، و [[C]] كود البلد. وفي الآخر اكتب [[yes]]. والباسورد مش بيظهر وانت بتكتبه.

~~~text الناتج
Generating 2,048 bit RSA key pair and self-signed certificate (SHA384withRSA) with a validity of 10,000 days
	for: CN=Ali Hassan, OU=Dev, O=Example, L=Cairo, ST=Cairo, C=EG
[Storing release.p12]
~~~

[[self-signed]] يعني الشهادة موقّعة من نفسها مش من جهة رسمية، وده العادي في أندرويد: المهم إن المفتاح يفضل نفسه، مش مين اللي مضى عليه.

> في سكربت أو CI ممكن تدّي الإجابات في الأمر: [[-storepass ...]] و [[-dname "CN=..., C=EG"]]، فمش هيسأل. بس الباسورد كده بيتسجّل في history الترمنال.

## ٢. [[keytool -list -v -keystore release.p12]]

[[-list]] بيعرض اللي في الملف (وهيسألك على الباسورد):

~~~text الناتج (مختصر)
Keystore type: PKCS12
Your keystore contains 1 entry

Alias name: myapp
Entry type: PrivateKeyEntry
Owner: CN=Ali Hassan, OU=Dev, O=Example, L=Cairo, C=EG
Valid from: Wed Oct 07 13:42:25 GMT 2026 until: Sun Feb 22 13:42:25 GMT 2054
Certificate fingerprints:
	 SHA1: 9E:0B:7C:9B:...
	 SHA256: D7:AA:A3:5E:...
~~~

| السطر | معناه |
|---|---|
| [[PrivateKeyEntry]] | فيه مفتاح سري، يعني ينفع يوقّع |
| [[Valid from ... until ...]] | من النهارده لسنة ٢٠٥٤: ده الـ ١٠٠٠٠ يوم |
| [[SHA256:]] | **بصمة** الشهادة: رقم فريد ليها. Firebase و Google Sign-In بيطلبوها |

## ٣ و ٤. [[echo "*.p12" >> .gitignore]] و [[echo "*.jks" >> .gitignore]]

[[echo]] بيطبع النص، و [[>>]] بيضيفه في **آخر** الملف (أما [[>]] بيمسح الملف ويكتب من الأول، فخلي بالك). و [[*.p12]] يعني «أي ملف امتداده .p12». فبعدهم [[.gitignore]] فيه:

~~~text .gitignore
*.p12
*.jks
~~~

## ٥. [[git check-ignore -v release.p12]]

بيسأل Git: الملف ده متجاهَل؟ و [[-v]] بيقولك بسبب أنهي سطر:

~~~text الناتج
.gitignore:1:*.p12	release.p12
~~~

اقراه: ملف [[.gitignore]]، السطر رقم [[1]]، القاعدة [[*.p12]]، طابقت [[release.p12]]. وخرج بـ 0. ولما جربته على [[main.js]] مطبعش حاجة وخرج بـ 1: يعني مش متجاهَل. فلو الأمر ده مطبعش حاجة على الـ keystore، **وقّف** قبل أي commit.

## ٦. [[cd android && ./gradlew assembleRelease]]

بيبني نسخة الإصدار، و Gradle بيوقّعها بالـ keystore لو [[android/app/build.gradle]] فيه [[signingConfigs]] بيقرا المسار والباسورد من متغيرات البيئة (الكود كامل في «بيحصل إيه من جوه؟» في الدرس). الناتج [[app/build/outputs/apk/release/app-release.apk]].

---

## الخلاصة

| الخطوة | الأمر | ليه |
|---|---|---|
| ١ | [[keytool -genkeypair ...]] | المفتاح، مرة واحدة في عمر التطبيق |
| ٢ | [[keytool -list -v]] | تشوف اللي جواه والبصمة |
| ٣-٤ | [[echo ... >> .gitignore]] | Git ميشوفش الملف |
| ٥ | [[git check-ignore -v]] | تتأكد إنه متجاهَل فعلًا |
| ٦ | [[./gradlew assembleRelease]] | APK موقّع |

الـ keystore والباسورد: backup في مكانين، وبرّه Git. لو ضاع، مفيش تحديث للتطبيق تاني.`,
          lines: [
            "اعمل مفتاح توقيع جديد في ملف release.p12 (هيسألك على باسورد).",
            "اعرض اللي في الملف وبصمته.",
            "متخليش Git يشوف ملفات .p12...",
            "...ولا .jks.",
            "اتأكد إن الملف متجاهَل فعلًا.",
            "ابني نسخة الإصدار موقّعة."
          ],
          sol: R`جربتها: [[keytool -genkeypair ...]] عمل ملف [[release.p12]] وطلب مني dname وبيانات، وطبع [[[Storing release.p12]]]. [[keytool -list -v -keystore release.p12]] طلّع [[Keystore type: PKCS12]] و [[Alias name: myapp]] و [[Entry type: PrivateKeyEntry]] و [[Valid from: ... until: ...]] (بعد ٢٧ سنة لأن [[-validity 10000]]) و بصمة [[SHA256:]].

[[git check-ignore -v release.p12]] رجع [[.gitignore:1:*.p12  release.p12]] وexit code صفر، يعني متجاهَل فعلًا. جربت [[git check-ignore main.js]] ورجع فاضي وexit 1 (مش متجاهَل)، فده الفرق اللي يأكدلك إن القاعدة شغالة.

الأهم اللي التجربة بتعلّمه: الـ keystore ده لو ضاع، مش هتقدر تطلّع تحديث للتطبيق على Google Play أبدًا (لازم نفس المفتاح لكل النسخ). فخد منه backup في مكانين على الأقل، والباسورد في password manager. وطبعًا برّه Git خالص.`
        },
        {
          cmd: "versionCode",
          title: "رقم النسخة اللي أندرويد بيقارن بيه",
          desc: "في build.gradle رقمين: [[versionName]] اللي المستخدم بيشوفه (1.4.0)، و [[versionCode]] رقم صحيح أندرويد بيقارن بيه. كل نسخة لازم versionCode بتاعها أكبر من اللي قبلها، وإلا التحديث مش هيتسطّب.",
          example: R`grep -n "versionCode\|versionName" android/app/build.gradle
sed -i 's/versionCode [0-9]*/versionCode 42/' android/app/build.gradle
# في CI: من رقم الـ run
sed -i "s/versionCode [0-9]*/versionCode $__{GITHUB_RUN_NUMBER}/" android/app/build.gradle
aapt dump badging app-release.apk | grep version`,
          try: "ابني APK بـ versionCode 5 وسطّبه، وبعدين ابني بـ 4 وجرّب [[adb install -r]]: هتشوف [[INSTALL_FAILED_VERSION_DOWNGRADE]].",
          deep: {
            why: "نسيت تزوّد الرقم، فالتحديث مرفوض من Play Store، أو التطبيق بيقول «فيه تحديث» ومش بيتسطّب. وتزويده بإيدك كل مرة هتنساه.",
            how: R`[[versionCode]] رقم صحيح بس (حده حوالي ٢ مليار). أندرويد بيرفض تسطيب نسخة رقمها أصغر من المتسطّبة، و Play Store بيرفض نفس الرقم مرتين.

[[versionName]] نص حر للعرض بس.

[[sed -i 's/versionCode [0-9]*/versionCode 42/']] بيدوّر على السطر ويبدّل الرقم في الملف نفسه. على الماك [[sed -i '']] بدل [[sed -i]].

في CI: [[GITHUB_RUN_NUMBER]] بيزيد ١ مع كل run، فأحسن مصدر أوتوماتيك. والـ [[$__{...}]] مع علامات تنصيص مزدوجة عشان الشيل يفك المتغير.

[[aapt dump badging]] (من Android SDK build-tools) بيقرا الـ APK نفسه ويطبع versionCode و versionName والـ package، فتتأكد من اللي اتبنى فعلًا.

ولو التطبيق بيشيك على تحديثات من سيرفرك (ملف زي latest.json)، حط فيه نفس الـ versionCode، والتطبيق يقارنه باللي عنده.`,
            when: "مع كل نسخة. والأحسن أوتوماتيك في CI.",
            mistakes: R`run_number بيبدأ من ١ لو غيّرت اسم ملف الـ workflow أو نقلت الـ repo، فالأرقام تبقى أصغر من اللي اتنشر: زوّد رقم ثابت، زي [[$((GITHUB_RUN_NUMBER + 1000))]]. وتعدّل versionName وتنسى versionCode.`
          },
          teach: R`## الفكرة

في [[android/app/build.gradle]] رقمين للنسخة: [[versionName]] اللي المستخدم بيشوفه، و [[versionCode]] اللي أندرويد بيقارن بيه. الدرس ده بيقرا الرقمين، ويغيّر [[versionCode]] من الترمنال، وفي CI يخليه يزيد لوحده.

جربت أوامر [[grep]] و [[sed]] في Docker على أوبونتو 24.04 على ملف [[build.gradle]] اللي Capacitor 8 عمله. و [[aapt]] محتاج APK متبني و Android SDK، فناتجه من دليل أندرويد.

---

## ١. [[grep -n "versionCode\|versionName" android/app/build.gradle]]

[[grep]] بيدوّر على نص جوه ملف ويطبع السطور اللي فيها. و [[-n]] بيكتب رقم السطر. و [[\|]] معناها «أو» في grep العادي، يعني سطور فيها [[versionCode]] أو [[versionName]].

~~~text الناتج
10:        versionCode 1
11:        versionName "1.0"
~~~

| الرقم | نوعه | مين بيستخدمه |
|---|---|---|
| [[versionCode 1]] | رقم صحيح بس | أندرويد والـ Play Store: النسخة الجديدة لازم رقمها **أكبر** |
| [[versionName "1.0"]] | نص حر | المستخدم بيشوفه في صفحة التطبيق |

أندرويد بيرفض تسطيب نسخة [[versionCode]] بتاعها أصغر من المتسطّبة ([[INSTALL_FAILED_VERSION_DOWNGRADE]])، و Play Store بيرفض نفس الرقم مرتين.

## ٢. [[sed -i 's/versionCode [0-9]*/versionCode 42/' android/app/build.gradle]]

[[sed]] (stream editor) بيعدّل نص. نفكّ الأمر:

| الحتة | معناها |
|---|---|
| [[-i]] | عدّل الملف نفسه (in-place) بدل ما تطبع النتيجة |
| [[s/قديم/جديد/]] | s من substitute: بدّل |
| [[versionCode [0-9]*]] | الكلمة، ومسافة، و [[[0-9]*]] يعني أي عدد من الأرقام (حتى صفر) |
| [[versionCode 42]] | اللي هيتحط مكانها |

~~~text الناتج بعدها (grep تاني)
10:        versionCode 42
~~~

> على الماك [[sed]] مختلف: [[-i]] لازم بعدها امتداد نسخة احتياطية، فاكتب [[sed -i '' 's/.../.../' ملف]] (من دليل sed على الماك).

## ٣. في CI: [[$__{GITHUB_RUN_NUMBER}]]

~~~bash
sed -i "s/versionCode [0-9]*/versionCode $__{GITHUB_RUN_NUMBER}/" android/app/build.gradle
~~~

[[GITHUB_RUN_NUMBER]] متغير بيئة بيحطه GitHub Actions: رقم مرة التشغيل دي للـ workflow ده، وبيزيد ١ كل مرة. فكل build رقمه أكبر من اللي قبله لوحده. والأقواس [[{ }]] بعد [[$]] بتحدد اسم المتغير بالظبط.

جربتها بإيدي بـ [[GITHUB_RUN_NUMBER=137]]:

~~~text الناتج
10:        versionCode 137
~~~

### ليه علامات تنصيص مزدوجة هنا؟

في bash، جوه [[" "]] المتغير بيتفك، وجوه [[' ']] بيفضل نص زي ما هو. جربت نفس الأمر بـ [[' ']]:

~~~text الناتج بعلامات مفردة
10:        versionCode $__{GITHUB_RUN_NUMBER}
~~~

يعني اتكتب الاسم نفسه في الملف، والـ build هيفشل. فأي أمر فيه متغير لازم [[" "]].

ولو الأرقام رجعت تبدأ من ١ (غيّرت اسم ملف الـ workflow مثلًا)، زوّد رقم ثابت:

~~~bash
echo $((GITHUB_RUN_NUMBER + 1000))
~~~

~~~text الناتج (مع 137)
1137
~~~

[[$(( ))]] بيحسب عملية حسابية في bash.

## ٤. [[aapt dump badging app-release.apk | grep version]]

[[aapt]] (Android Asset Packaging Tool) من Android SDK في [[build-tools]]. و [[dump badging]] بيقرا معلومات التطبيق من **الـ APK نفسه**، فتتأكد من اللي اتبنى فعلًا مش اللي في الملف. أول سطر شكله كده (من دليل أندرويد):

~~~text الناتج
package: name='com.example.myapp' versionCode='42' versionName='1.0' ...
~~~

---

## الخلاصة

| الأمر | بيعمل |
|---|---|
| [[grep -n ... build.gradle]] | شوف الرقمين |
| [[sed -i 's/versionCode [0-9]*/versionCode 42/' ...]] | غيّر الرقم |
| [[sed -i "s/.../versionCode $__{GITHUB_RUN_NUMBER}/" ...]] | في CI: رقم الـ run، بعلامات مزدوجة |
| [[aapt dump badging app.apk]] | اتأكد من الرقم جوه الـ APK |

[[versionCode]] رقم صحيح بيزيد مع كل نسخة، و [[versionName]] للعرض بس.`,
          lines: [
            "شوف الرقمين في الملف.",
            "غيّر versionCode لـ 42.",
            "في CI: خليه رقم الـ run.",
            "اتأكد من الرقم جوه الـ APK نفسه."
          ],
          sol: R`[[grep versionCode android/app/build.gradle]] بيوريك سطر زي [[versionCode 1]] و [[versionName "1.0"]]. جربت [[sed]] وغيّرته لـ [[versionCode 42]] بنجاح. الفرق بينهم: [[versionName]] نص بيشوفه المستخدم ([[1.2.3]])، و [[versionCode]] رقم صحيح بس، أندرويد بيقارن بيه أي نسخة أحدث.

لو بنيت APK بـ versionCode 5 وسطّبته، وبعدين بنيت بـ 4 وعملت [[adb install -r]]، أندرويد بيرفض بـ [[INSTALL_FAILED_VERSION_DOWNGRADE]]: مش بيسمح تنزّل لنسخة أقدم فوق أحدث. ده اللي بيخلّي كتير يزوّدوه غلط أو ينسوه فيترفض الرفع على Play.

الحل العملي في CI: خلّي [[versionCode]] من رقم الـ run زي [[$__{GITHUB_RUN_NUMBER}]]، فبيزيد لوحده مع كل build ومتنساش تزوّده. (عدّلت الملف وتأكدت من الرقم، لكن اختبار [[INSTALL_FAILED_VERSION_DOWNGRADE]] نفسه محتاج جهاز أندرويد.)`
        },
        {
          cmd: "android.yml",
          title: "APK موقّع مع كل push",
          desc: "workflow بيعمل كل اللي فات لوحده: يبني الويب، يعمل sync، يرجّع الـ keystore من secret، يحط versionCode من رقم الـ run، ويبني APK موقّع ويرفعه كـ artifact. ولو محتاج تنشره على سيرفرك، شوف «نشر ملفات بـ scp» في تاب GitHub Actions.",
          example: R`name: Android
on:
  workflow_dispatch:
  push:
    branches: [main]
    paths: ['android/**', 'src/**', 'capacitor.config.*']
jobs:
  apk:
    runs-on: ubuntu-latest
    env:
      RELEASE_STORE_PASSWORD: $__{{ secrets.ANDROID_KEYSTORE_PASSWORD }}
      RELEASE_KEY_ALIAS: myapp
      RELEASE_KEY_PASSWORD: $__{{ secrets.ANDROID_KEYSTORE_PASSWORD }}
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with: { node-version: 24, cache: npm }
      - uses: actions/setup-java@v5
        with: { distribution: temurin, java-version: 21 }
      - run: npm ci && npm run build && npx cap sync android
      - env: { KEYSTORE_BASE64: "$__{{ secrets.ANDROID_KEYSTORE_BASE64 }}" }
        run: |
          [ -n "$KEYSTORE_BASE64" ] || { echo "::error::ANDROID_KEYSTORE_BASE64 is missing"; exit 1; }
          echo "$KEYSTORE_BASE64" | base64 -d > "$RUNNER_TEMP/release.p12"
          echo "RELEASE_KEYSTORE_FILE=$RUNNER_TEMP/release.p12" >> "$GITHUB_ENV"
      - run: sed -i "s/versionCode [0-9]*/versionCode $GITHUB_RUN_NUMBER/" android/app/build.gradle
      - run: cd android && chmod +x gradlew && ./gradlew assembleRelease --no-daemon
      - uses: actions/upload-artifact@v7
        with:
          name: apk
          path: android/app/build/outputs/apk/release/app-release.apk
          if-no-files-found: error`,
          try: "حط الـ keystore بتاع التجربة في secret (base64) والباسورد في secret تاني، واعمل push، ونزّل الـ APK من صفحة الـ run وسطّبه.",
          flag: "script",
          deep: {
            why: "البناء على جهازك معناه: الـ keystore لازم يبقى عندك، والنسخة بتعتمد على اللي متسطّب على جهازك، ولازم تفتكر الخطوات. في CI كل push يطلّع APK بنفس الطريقة بالظبط.",
            how: R`[[paths]] بيشغّله بس لو اتغير حاجة في الأندرويد أو الويب أو إعدادات Capacitor، و [[workflow_dispatch]] عشان تشغّله بإيدك.

[[setup-java]] بيسطّب JDK (temurin توزيعة مجانية). و Android SDK موجود جاهز على ubuntu-latest.

الـ keystore: الـ secret فيه الملف كنص base64، والـ step بترجّعه ملف في [[$RUNNER_TEMP]] (بيتمسح مع نهاية الـ job) وتحط مساره في [[$GITHUB_ENV]]. و build.gradle بيقرا [[RELEASE_KEYSTORE_FILE]] و [[RELEASE_STORE_PASSWORD]] و [[RELEASE_KEY_ALIAS]] و [[RELEASE_KEY_PASSWORD]] من البيئة (درس keytool)؛ لو واحد منهم ناقص الـ build بيفشل. ولو الـ secret فاضي الـ job يفشل برسالة واضحة، مش يكمّل.

[[sed]] بيحط رقم الـ run كـ versionCode، فكل build رقمه أكبر من اللي قبله.

[[if-no-files-found: error]] لو الـ APK مطلعش في المسار ده، افشل بدل ما ترفع artifact فاضي وتفتكر كله تمام.

بعد كده تقدر تزوّد: رفع الـ APK على سيرفرك بـ scp مع latest.json في الآخر، أو GitHub Release.`,
            when: "أول ما التطبيق يبقى له مستخدمين بيستنوا تحديثات.",
            mistakes: R`في مشروع حقيقي الـ workflow كان لو الـ keystore secret فاضي بيبني debug بهدوء، فطلع APK أخضر بس مش بيتسطّب كتحديث. وكان بيختار الـ APK بـ [[find ... | head -1]] فممكن ياخد debug بدل release: حدد المسار بالظبط زي هنا. و paths كان فيها [[src/**]] والتطبيق كمان بيتحدّث OTA (zip للويب من غير APK جديد)، فأي تعديل CSS بيبني APK كامل. لو عندك OTA، شيل src من paths واعمل workflow خفيف للـ zip.`
          },
          teach: R`## الفكرة

ملف **workflow** لـ GitHub Actions: مع كل push، سيرفر عند GitHub بيعمل كل اللي اتعلمناه في الدروس اللي فاتت بالترتيب (يبني الويب، يعمل sync، يرجّع الـ keystore، يزوّد versionCode، يبني APK موقّع) ويرفع الـ APK تنزّله من صفحة التشغيل.

الملف بيتحط في [[.github/workflows/android.yml]]. فحصته بـ [[actionlint]] (أداة بتراجع ملفات الـ workflows، شغّلتها من Docker) وطلع من غير ولا ملاحظة، وجربت خطوة الـ keystore و sed بإيدي في bash على أوبونتو. لكن الـ workflow كامل محتاج repo على GitHub، فمتشغّلش هناك.

---

## ١. الاسم ووقت التشغيل (السطور ١ إلى ٦)

~~~text
name: Android
on:
  workflow_dispatch:
  push:
    branches: [main]
    paths: ['android/**', 'src/**', 'capacitor.config.*']
~~~

الملف مكتوب **YAML**: كل سطر [[مفتاح: قيمة]]، والمسافات في أول السطر بتقول مين جوه مين (لازم مسافات مش Tab).

| السطر | معناه |
|---|---|
| [[name: Android]] | الاسم اللي هيظهر في تاب Actions |
| [[on:]] | إمتى يشتغل |
| [[workflow_dispatch:]] | زرار «Run workflow» تشغّله بإيدك |
| [[push:]] | مع كل push... |
| [[branches]] | ...على فرع main بس. والأقواس المربعة في YAML قايمة |
| [[paths]] | ...ولو اتغير ملف في المسارات دي. و [[**]] يعني أي حاجة جوه الفولدر مهما كانت عميقة، و [[capacitor.config.*]] يمسك [[.json]] و [[.ts]] |

فتعديل في [[README.md]] مثلًا مش هيبني APK.

## ٢. الـ job والبيئة (السطور ٧ إلى ١٣)

~~~text
jobs:
  apk:
    runs-on: ubuntu-latest
    env:
      RELEASE_STORE_PASSWORD: $__{{ secrets.ANDROID_KEYSTORE_PASSWORD }}
      RELEASE_KEY_ALIAS: myapp
      RELEASE_KEY_PASSWORD: $__{{ secrets.ANDROID_KEYSTORE_PASSWORD }}
~~~

- [[jobs:]] المهام، و [[apk]] اسم المهمة بتاعتنا (اسم بتختاره).
- [[runs-on: ubuntu-latest]] شغّلها على ماكينة أوبونتو جديدة، وعليها Android SDK جاهز.
- [[env:]] متغيرات بيئة لكل خطوات المهمة. ودي نفس الأسامي اللي [[build.gradle]] بيقراها (درس [[keytool]]).
- [[$__{{ secrets.X }}]] بيجيب **secret**: قيمة سرية بتحطها في إعدادات الـ repo (Settings ثم Secrets and variables ثم Actions)، و GitHub بيخبّيها في اللوج بـ [[***]].
- الباسوردين نفس الـ secret، لأن في PKCS12 باسورد المفتاح هو باسورد الملف.

## ٣. الخطوات: تجهيز الماكينة (السطور ١٤ إلى ٢٠)

~~~text
steps:
  - uses: actions/checkout@v7
  - uses: actions/setup-node@v7
    with: { node-version: 24, cache: npm }
  - uses: actions/setup-java@v5
    with: { distribution: temurin, java-version: 21 }
  - run: npm ci && npm run build && npx cap sync android
~~~

كل [[-]] خطوة. و [[uses:]] بيستخدم **action** جاهز، و [[@v7]] نسخته الكبيرة. و [[run:]] بيشغّل أوامر ترمنال.

| الخطوة | بتعمل |
|---|---|
| [[actions/checkout]] | تنزّل الكود بتاعك على الماكينة |
| [[actions/setup-node]] | Node 24، و [[cache: npm]] بيحفظ تنزيلات npm للمرة الجاية |
| [[actions/setup-java]] | JDK 21 (Capacitor 8 عايزه). و [[temurin]] توزيعة Java مجانية |
| [[npm ci && npm run build && npx cap sync android]] | درس [[npx cap sync android]] |

و [[with: { ... }]] إعدادات الـ action، مكتوبة على سطر واحد بأقواس بدل سطور.

## ٤. الـ keystore من secret (السطور ٢١ إلى ٢٥)

~~~text
- env: { KEYSTORE_BASE64: "$__{{ secrets.ANDROID_KEYSTORE_BASE64 }}" }
  run: |
    [ -n "$KEYSTORE_BASE64" ] || { echo "::error::ANDROID_KEYSTORE_BASE64 is missing"; exit 1; }
    echo "$KEYSTORE_BASE64" | base64 -d > "$RUNNER_TEMP/release.p12"
    echo "RELEASE_KEYSTORE_FILE=$RUNNER_TEMP/release.p12" >> "$GITHUB_ENV"
~~~

الـ secret نص بس، والـ keystore ملف bytes. فبنحوّله نص بـ **base64** (طريقة بتكتب أي bytes بحروف وأرقام) على جهازك:

~~~bash
base64 -w0 release.p12
~~~

[[-w0]] يعني سطر واحد من غير كسر. جربته على keystore تجربة: طلع نص طوله ٣٥٧٢ حرف بيبدأ بـ [[MIIKcgIBAzCCChwGCSqG]]، والنص ده هو اللي بيتحط في الـ secret.

و [[run: |]] الـ [[|]] في YAML معناها «اللي جاي كذا سطر زي ما هم». والأوامر:

1. [[[ -n "$KEYSTORE_BASE64" ]]]: النص مش فاضي؟ لو فاضي اطبع [[::error::...]] (صيغة بيفهمها GitHub ويعرضها خطأ أحمر) واخرج بـ 1.
2. [[base64 -d]] بيرجّع النص bytes (d من decode)، و [[>]] بيكتبهم في ملف جوه [[$RUNNER_TEMP]]: فولدر مؤقت بيتمسح مع نهاية المهمة.
3. [[>> "$GITHUB_ENV"]]: أي سطر [[اسم=قيمة]] بيتكتب في الملف ده بيبقى متغير بيئة **للخطوات اللي بعدها**. فـ Gradle هيلاقي [[RELEASE_KEYSTORE_FILE]].

جربت الأوامر دي بإيدي في bash (حاطط [[RUNNER_TEMP]] و [[GITHUB_ENV]] بنفسي). من غير secret:

~~~text الناتج
::error::ANDROID_KEYSTORE_BASE64 is missing
exit=1
~~~

ومعاه:

~~~text الناتج
exit=0
RELEASE_KEYSTORE_FILE=/tmp/rt/release.p12
same
~~~

[[same]] من [[cmp]] (أداة بتقارن ملفين byte byte): الملف اللي رجع مطابق للأصلي بالظبط.

## ٥. versionCode والبناء (السطور ٢٦ و ٢٧)

~~~text
- run: sed -i "s/versionCode [0-9]*/versionCode $GITHUB_RUN_NUMBER/" android/app/build.gradle
- run: cd android && chmod +x gradlew && ./gradlew assembleRelease --no-daemon
~~~

الأول درس [[versionCode]]: رقم الـ run بقى رقم النسخة (جربته بـ 137 وطلع [[versionCode 137]]). والتاني درس [[./gradlew assembleDebug]]، بس نسخة الإصدار، و [[--no-daemon]] عشان Gradle ميسيبش برنامج شغال في الخلفية على ماكينة هتتمسح أصلًا.

## ٦. ارفع الـ APK (السطور ٢٨ إلى ٣٢)

~~~text
- uses: actions/upload-artifact@v7
  with:
    name: apk
    path: android/app/build/outputs/apk/release/app-release.apk
    if-no-files-found: error
~~~

**artifact** ملف بيترفع مع التشغيل، وتنزّله من صفحة الـ run تحت اسم [[apk]]. و [[path]] المسار بالظبط (مش [[find ... | head -1]] اللي ممكن يمسك APK غلط). و [[if-no-files-found: error]] يفشّل التشغيل لو الـ APK مش موجود، بدل ما يعدّي أخضر وهو فاضي.

---

## قبل أول تشغيل

| الـ secret | فيه إيه |
|---|---|
| [[ANDROID_KEYSTORE_BASE64]] | ناتج [[base64 -w0 release.p12]] |
| [[ANDROID_KEYSTORE_PASSWORD]] | باسورد الـ keystore |

و [[build.gradle]] لازم يقرا [[RELEASE_KEYSTORE_FILE]] والباسوردات من البيئة (درس [[keytool]]).

## الخلاصة

| الجزء | بيعمل |
|---|---|
| [[on:]] | push على main في الملفات المهمة، أو بإيدك |
| [[env:]] | الباسوردات من secrets |
| setup-node و setup-java | Node 24 و JDK 21 |
| [[npm ci ... cap sync]] | آخر نسخة من الويب جوه المشروع |
| خطوة الـ keystore | base64 من secret لملف في [[$RUNNER_TEMP]] |
| [[sed]] | versionCode = رقم الـ run |
| [[assembleRelease]] | APK موقّع |
| [[upload-artifact]] | الـ APK في صفحة الـ run |`,
          lines: [
            "الاسم.",
            "الأحداث.",
            "زرار تشغيل يدوي.",
            "push...",
            "...على main...",
            "...لو اتغير الأندرويد أو الويب أو إعدادات Capacitor.",
            "المهام.",
            "بناء الـ APK.",
            "ماكينة أوبونتو (فيها Android SDK جاهز).",
            "متغيرات للـ job كله.",
            "باسورد الـ keystore (Gradle بيقراه).",
            "اسم المفتاح جوه الـ keystore (الـ alias).",
            "باسورد المفتاح: في PKCS12 هو نفس باسورد الـ keystore.",
            "الخطوات.",
            "الكود.",
            "Node.",
            "بكاش npm.",
            "JDK.",
            "نسخة 21.",
            "سطّب، وابني الويب، وانقله للمشروع.",
            "الـ keystore من secret كـ base64...",
            "...أوامر:",
            "لو الـ secret فاضي افشل برسالة واضحة.",
            "رجّعه ملف في الفولدر المؤقت.",
            "وحط مساره للـ steps الجاية.",
            "versionCode = رقم الـ run.",
            "ابني نسخة الإصدار الموقّعة.",
            "ارفع الـ APK لصفحة الـ run.",
            "إعداداته.",
            "اسم الـ artifact.",
            "مسار الـ APK بالظبط.",
            "لو مش موجود افشل."
          ],
          sol: R`الـ workflow ده بيبني APK موقّع على GitHub. الفكرة الأساسية إنك مش بترفع الـ keystore على Git، بترفعه كـ secret: تعمله base64 ([[base64 -w0 release.p12]]) وتحطه في secret اسمه [[ANDROID_KEYSTORE_BASE64]]، والباسورد في secret تاني، والـ workflow بيفكّه في [[$RUNNER_TEMP]] وقت البناء بس.

بعد الـ push (أو Run workflow يدوي) هتلاقي الـ run في تاب Actions، وفي آخره artifact اسمه [[apk]] فيه [[app-release.apk]]، نزّله وسطّبه. [[if-no-files-found: error]] بيفشّل الـ run لو البناء ماطلّعش APK بدل ما يعدّي بصمت. و [[versionCode $GITHUB_RUN_NUMBER]] بيضمن رقم متزايد مع كل build.

الغلط الأشهر: نسيان أي secret. الخطوة بتتشيّك [[[ -n "$KEYSTORE_BASE64" ]]] وتطلّع [[::error::ANDROID_KEYSTORE_BASE64 is missing]] بدل ما البناء يفشل برسالة غامضة. راجع الـ actions بأرقام نسخها في «تاب GitHub Actions». (ما شغّلتش الـ workflow لأنه محتاج repo على GitHub وrunner بـ Android SDK.)`
        }
      ]
    }
]);
