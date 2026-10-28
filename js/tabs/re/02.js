// تكملة تاب re: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/re/01.js (شرح حقول الدرس في أوله)
MORE("re", [
  {
    t: R`تطبيقك من عين اللي فكّه: الأسرار والمانيفست`,
    l: 2,
    n: R`أي حاجة جوه الـ APK بتتقري: المفاتيح في الكود والموارد والـ assets، وإعدادات المانيفست اللي بتفتح أبواب. نلاقيها في تطبيقنا ونقفلها`,
    items: [
      {
        cmd: "apk_secrets",
        title: R`دوّر على الأسرار في الـ APK بتاعك قبل ما حد تاني يدوّر`,
        desc: R`أي مفتاح أو token أو URL داخلي مكتوب في الكود أو في [[strings.xml]] أو في [[assets/]] أو في [[BuildConfig]] بيتشحن جوه الـ APK زي ما هو، وأي حد معاه نسخة من التطبيق يطلّعه في دقيقة بـ [[unzip]] و [[strings]] و [[grep]] أو بـ [[jadx]]. الدرس ده بيعمل كده على تطبيقك إنت عشان تعرف إيه المكشوف.

القاعدة اللي هتطلع بيها: **الـ APK مش مكان سر**. مفيش حاجة في التطبيق تقدر تخبّيها عن صاحب الجهاز: لا R8، ولا التشفير بمفتاح جوه نفس التطبيق، ولا الكود الـ native. اللي ينفع يتحط في التطبيق هو المفاتيح اللي متصممة تبقى عامة (زي مفتاح Google Maps المقفول على الـ package والتوقيع)، أما المفاتيح السرية (مفتاح دفع، مفتاح API بفلوس) فمكانها السيرفر (الدرس اللي بعده).`,
        example: R`# Linux (and WSL):
unzip -l myapp.apk
unzip -p myapp.apk classes.dex | strings | grep -iE "key|secret|token|https?://"
unzip -p myapp.apk assets/config.json
aapt2 dump strings myapp.apk
jadx -d out_jadx myapp.apk
grep -rniE "key|secret|token|https?://" out_jadx/
# Windows (PowerShell):
New-Item -ItemType Directory apk_x
tar -xf myapp.apk -C apk_x
Select-String -Path apk_x\classes.dex -Pattern '[\x20-\x7e]{6,}' -AllMatches | ForEach-Object { $_.Matches.Value } | Select-String -Pattern 'key|secret|token|https?://'
Get-Content apk_x\assets\config.json
Get-ChildItem out_jadx -Recurse -File | Select-String -Pattern 'key|secret|token|https?://'`,
        try: R`في تطبيقك (أو العيّنة من المستوى الأول) حط مفتاح مزيّف واضح زي [[FAKE-test-key-1234]] في ٣ أماكن: constant في كلاس، و [[strings.xml]]، وملف في [[assets/]]. ابني الـ release ودوّر عليه بالأوامر دي. بعدين شيله من الأماكن التلاتة، وابني تاني، وتأكد إن [[grep]] مبقاش يلاقي حاجة. آخر خطوة: دوّر على كلمة [[http://]] لوحدها، عشان تلاقي أي endpoint من غير HTTPS.`,
        deep: {
          why: R`لأن ده أول حاجة أي حد بيعملها لما يفك تطبيق: يدوّر على مفاتيح. مفتاح دفع أو مفتاح API مدفوع اتسرّب معناه فاتورة على حسابك أو بيانات عملاء مكشوفة، والبوتات بتفك التطبيقات المنشورة وتدوّر أوتوماتيك. لو لقيته إنت الأول تقدر تغيّره وتنقله للسيرفر قبل ما يتسرّب.`,
          how: R`الـ APK ملف ZIP. الكود في [[classes.dex]]، وكل النصوص الثابتة في الكود (string literals) متخزّنة فيه في جدول اسمه string pool كنص عادي، فـ [[strings]] بيطلّعها. الموارد زي [[strings.xml]] بتتجمع في [[resources.arsc]]، و [[aapt2 dump strings]] بيطبع جدولها. والـ [[assets/]] بتتحط في الـ ZIP زي ما هي من غير أي تحويل. و [[jadx]] بيرجّع كل ده كملفات تقدر تعمل عليها [[grep]]. وأي [[buildConfigField]] في Gradle بيبقى constant في كلاس [[BuildConfig]]، يعني كود عادي بيتقري زي أي كود.`,
          when: R`قبل كل release، وكخطوة في الـ CI: ابني الـ APK ودوّر فيه على patterns زي [[key]] و [[secret]] و [[token]] و [[http://]]. وكمان لما تضيف SDK جديد بيطلب مفتاح: اسأل نفسك المفتاح ده متصمم يبقى عام (ومقفول بقيود في لوحة التحكم بتاعته) ولا سري.`,
          mistakes: R`إنك تفتكر إن [[local.properties]] أو secrets-gradle-plugin بيحموا المفتاح: هما بيبعدوه عن Git بس، وبعدها بيتحط في الـ APK عادي. وإنك تفتكر R8 بيخبّي النصوص: بيغيّر الأسماء بس والنصوص بتفضل زي ما هي. وإنك "تشفّر" المفتاح في التطبيق ومفتاح فك التشفير جنبه في نفس التطبيق: ده تأخير لدقايق مش حماية. وإنك تنقل المفتاح لكود C في [[.so]]: [[strings]] بيشتغل على الـ [[.so]] برضه.`
        },
        teach: R`## الفكرة: الـ APK بيتشحن لكل الناس

كل نسخة من تطبيقك على أي موبايل فيها كل الكود والموارد. فاللي هنعمله دلوقتي هو نفس اللي أي حد هيعمله: نفك تطبيقنا ونشوف إيه النصوص اللي جواه.

### اتجرّب فين؟

تطبيق عيّنة أنا كاتبه بـ Java (package اسمه [[com.example.myapp]])، اتبنى في container أوبونتو 24.04 بـ [[javac]] و [[d8]] و [[aapt2]] من build-tools 37، واتوقّع بـ [[apksigner]]. حطيت فيه مفاتيح **مزيّفة** في ٤ أماكن:

| المكان | الكود اللي في المشروع |
|---|---|
| constant في كلاس [[ApiClient]] | [[API_KEY = "FAKE-api-key-0000-not-real"]] |
| كلاس [[BuildConfig]] (زي اللي [[buildConfigField]] بيولّده) | [[PAYMENTS_KEY = "FAKE_sk_test_0000_not_real"]] |
| [[res/values/strings.xml]] | [[maps_api_key]] |
| [[assets/config.json]] | [[analytics_secret]] |

أوامر لينكس اتشغّلت في نفس الـ container ([[jadx]] 1.5.6)، وأوامر ويندوز اتشغّلت على نفس الملفات في PowerShell 7.6 و Windows PowerShell 5.1.

---

## ١. إيه اللي جوه الـ ZIP؟ [[unzip -l]]

~~~bash
unzip -l myapp.apk
~~~

- [[unzip]]: برنامج فك ZIP، والـ APK ZIP عادي.
- [[-l]] = list: اعرض المحتوى من غير ما تفك.

~~~text الناتج
  Length      Date    Time    Name
---------  ---------- -----   ----
     2472  1980-01-01 00:00   AndroidManifest.xml
      636  1980-01-01 00:00   resources.arsc
       65  1980-01-01 00:00   assets/config.json
     3680  2026-10-27 22:46   classes.dex
      502  2026-10-27 22:46   META-INF/MYAPP.SF
     1104  2026-10-27 22:46   META-INF/MYAPP.RSA
      375  2026-10-27 22:46   META-INF/MANIFEST.MF
~~~

٣ أماكن ممكن يبقى فيها نص: [[classes.dex]] (الكود)، و [[resources.arsc]] (جدول الموارد)، و [[assets/]] (ملفات زي ما هي).

---

## ٢. النصوص اللي في الكود: [[strings]] على [[classes.dex]]

~~~bash
unzip -p myapp.apk classes.dex | strings | grep -iE "key|secret|token|https?://"
~~~

الأمر ٣ حتت بيتنفّذوا ورا بعض، وعلامة [[|]] (pipe) بتودّي ناتج كل واحد للي بعده:

| الحتة | بتعمل إيه |
|---|---|
| [[unzip -p myapp.apk classes.dex]] | [[-p]] = pipe: افتح الملف ده بس واطبعه على الشاشة بدل ما تكتبه على الديسك |
| [[strings]] | بيدوّر في أي ملف binary على أي ٤ حروف مقروءة أو أكتر ورا بعض ويطبعهم سطر سطر |
| [[grep -iE "..."]] | [[-i]] = متفرقش بين capital و small، و [[-E]] = regex ممتد عشان [[|]] تبقى «أو»، و [[s?]] = حرف s اختياري (http أو https) |

~~~text الناتج
$ with key FAKE-api-key-0000-not-real
&key=FAKE-api-key-0000-not-real
API_KEY
FAKE-api-key-0000-not-real
PAYMENTS_KEY
https://api.example.com/v1/
(https://api.example.com/v1/weather?city=
maps_api_key
~~~

### ليه في رموز زي [[$]] و [[&]] و [[(]] في أول السطر؟

الـ dex بيخزّن قبل كل نص طوله في بايت. النص [[" with key FAKE-api-key-0000-not-real"]] طوله ٣٦ حرف، والرقم ٣٦ في جدول ASCII هو الحرف [[$]]، فـ [[strings]] شافه حرف مقروء وطبعه. و [[&]] = ٣٨، و [[(]] = ٤٠. يعني دي مش جزء من النص.

### ليه المفتاح ظهر أكتر من مرة؟

لأن [[javac]] بيعمل **constant folding**: لما تكتب [[" with key " + API_KEY]] والاتنين ثابتين، بيحسب النص الكامل وقت الترجمة ويحطه في مكان الاستخدام. فالمفتاح بقى مكتوب في ٣ نصوص مختلفة. و [[PAYMENTS_KEY]] ظهر اسمه بس، لأن قيمته [[FAKE_sk_test...]] مفيهاش كلمة key. عشان كده الـ grep بالكلمات **مش كفاية**: اقرا الناتج كله لو صغير، أو دوّر بالـ prefixes المعروفة ([[sk_live_]] و [[AIza]] و [[ghp_]]).

---

## ٣. الـ assets والموارد

~~~bash
unzip -p myapp.apk assets/config.json
aapt2 dump strings myapp.apk
~~~

~~~text الناتج
{"env": "prod", "analytics_secret": "FAKE-analytics-secret-xyz"}
String pool of 2 unique UTF-8 non-sorted strings, 2 entries and 0 styles using 76 bytes:
String #0 : MyApp
String #1 : FAKE-maps-key-1234-not-real
~~~

- ملف [[assets/]] اتطبع زي ما كتبته بالظبط: مفيش أي تحويل.
- [[aapt2]] (من build-tools) و [[dump strings]] بيطبع الـ string pool بتاع [[resources.arsc]]: كل قيم [[strings.xml]].

---

## ٤. الصورة الكاملة: [[jadx]] و [[grep -r]]

~~~bash
jadx -d out_jadx myapp.apk
grep -rniE "key|secret|token|https?://" out_jadx/
~~~

[[grep -r]] = دوّر في كل الملفات جوه الفولدر، و [[-n]] = اطبع رقم السطر.

~~~text الناتج
out_jadx/resources/AndroidManifest.xml:2:<manifest xmlns:android="http://schemas.android.com/apk/res/android"
out_jadx/resources/assets/config.json:1:{"env": "prod", "analytics_secret": "FAKE-analytics-secret-xyz"}
out_jadx/resources/res/values/public.xml:4:    <public type="string" name="maps_api_key" id="0x7f010001" />
out_jadx/resources/res/values/strings.xml:4:    <string name="maps_api_key">FAKE-maps-key-1234-not-real</string>
out_jadx/sources/com/example/myapp/ApiClient.java:7:    private static final String API_KEY = "FAKE-api-key-0000-not-real";
out_jadx/sources/com/example/myapp/ApiClient.java:8:    private static final String BASE_URL = "https://api.example.com/v1/";
out_jadx/sources/com/example/myapp/ApiClient.java:11:        Log.d("ApiClient", "building url for " + str + " with key FAKE-api-key-0000-not-real");
out_jadx/sources/com/example/myapp/ApiClient.java:12:        return "https://api.example.com/v1/weather?city=" + str + "&key=FAKE-api-key-0000-not-real";
out_jadx/sources/com/example/myapp/BuildConfig.java:7:    public static final String PAYMENTS_KEY = "FAKE_sk_test_0000_not_real";
out_jadx/sources/com/example/myapp/R.java:8:        public static final int maps_api_key = 0x7f010001;
~~~

هنا بقى واضح: الـ ٤ مفاتيح، والسطر اللي بيستخدم كل واحد، وكمان [[Log.d]] بيطبع المفتاح في الـ log. أول سطر ([[schemas.android.com]]) طبيعي في أي manifest ومش مشكلة.

---

## ٥. نفس الكلام على ويندوز

PowerShell مفيهوش [[unzip -p]] ولا [[strings]]، فبنستخدم بدايلهم:

| لينكس | PowerShell | ملاحظة |
|---|---|---|
| [[unzip]] | [[tar -xf myapp.apk -C apk_x]] | [[tar]] موجود في ويندوز ١٠ و ١١ وبيفك ZIP، و [[-C]] = فك جوه الفولدر ده (لازم يبقى موجود، عشان كده [[New-Item]] الأول) |
| [[strings]] | [[Select-String -Pattern '[\x20-\x7e]{6,}' -AllMatches]] | regex معناه: ٦ حروف أو أكتر من المدى المقروء في ASCII (من المسافة [[0x20]] لـ [[~]] اللي هو [[0x7e]]). [[-AllMatches]] = كل اللي في السطر مش أول واحد بس |
| [[$_.Matches.Value]] | | [[$_]] = العنصر الحالي في الـ pipeline، و [[.Matches.Value]] = النص اللي اتطابق |
| [[grep -r]] | [[Get-ChildItem -Recurse -File]] ثم [[Select-String]] | [[Select-String -Path]] لوحده مبيدخلش جوه الفولدرات، فبنجيب الملفات الأول |

الناتج طلع نفس الـ ٨ نصوص من الـ dex، ونفس الـ ١٠ أماكن في [[out_jadx]] (في PowerShell 7.6 و 5.1). [[jadx]] على ويندوز نفس الأمر (فيه [[jadx.bat]] في الـ zip بتاعه).

---

## ٦. طب أعمل إيه؟

| النوع | مثال | المكان الصح |
|---|---|---|
| مفتاح متصمم يبقى عام | Google Maps، إعدادات Firebase | في التطبيق عادي، بس **اقفله** من لوحة التحكم على الـ package name و SHA-1 بتاع التوقيع والـ APIs اللي محتاجها بس |
| مفتاح سري | مفتاح دفع، مفتاح API مدفوع، باسورد قاعدة بيانات | **السيرفر بس**. التطبيق ياخد token قصير العمر من سيرفرك (الدرس اللي بعده) |
| URLs داخلية | staging أو admin | متتحطش في نسخة الـ release أصلًا |

ولو مفتاح سري اتنشر في نسخة قبل كده: **غيّره (rotate) فورًا**، لأن النسخ القديمة لسه على موبايلات الناس. نفس فكرة درس «أسرار مكشوفة» في تاب الأمان.

## الخلاصة

- الـ APK = ZIP، والنصوص في [[classes.dex]] و [[resources.arsc]] و [[assets/]] بتتقري بأوامر بسيطة.
- [[javac]] بيكرر الـ constants في كل مكان بتتستخدم فيه، و [[Log.d]] ممكن يكشف المفتاح كمان.
- الـ grep بالكلمات بيفوّت قيم من غير اسم واضح: اقرا الناتج كله.
- المفتاح السري مكانه السيرفر، والمفتاح العام يتقفل بقيود.`,
        lines: [
          R`بيعرض الملفات اللي جوه الـ APK (هو ZIP) من غير ما يفكها.`,
          R`بيطبع classes.dex، ويطلّع منه كل النصوص المقروءة، ويفلتر اللي فيها key أو secret أو token أو رابط.`,
          R`بيطبع ملف config.json اللي في الـ assets زي ما هو.`,
          R`بيطبع جدول النصوص بتاع resources.arsc (قيم strings.xml).`,
          R`بيفك التطبيق لـ Java مقروءة وموارد في فولدر out_jadx.`,
          R`بيدوّر في كل ملفات out_jadx على نفس الكلمات ويطبع اسم الملف ورقم السطر.`,
          R`بيعمل فولدر apk_x على ويندوز عشان نفك فيه.`,
          R`بيفك الـ APK جوه apk_x بـ tar اللي موجود في ويندوز.`,
          R`بديل strings: بيطلّع النصوص المقروءة من classes.dex ويفلترها بنفس الكلمات.`,
          R`بيطبع config.json على ويندوز.`,
          R`بيدوّر في كل ملفات out_jadx على الكلمات دي (بديل grep -r).`
        ],
        sol: R`اتشغّل على العيّنة بتاعتي ([[jadx]] 1.5.6 و [[aapt2]] من build-tools 37 في container أوبونتو 24.04، والجزء بتاع ويندوز في PowerShell 7.6 و 5.1). بعد ما شلت المفاتيح ونقلت الشغل لـ token من السيرفر، نفس الدوّارة على النسخة الجديدة:

~~~bash
unzip -p fixed.apk classes.dex | strings | grep -ciE "FAKE"
~~~

~~~text الناتج
0
~~~

[[-c]] = اطبع العدد بس. وفي النسخة الجديدة النصوص اللي فيها [[http]] بقت [[https://api.myapp.test/]] و [[https://api.myapp.test/weather?city=]] بس (عنوان السيرفر بتاعي، ودي حاجة عادي تبان) ومفيش [[http://]] خالص. وأي مفتاح كان في نسخة اتنشرت قبل كده لازم يتغيّر، مش يتشال بس.`
      },
      {
        cmd: "secrets_server",
        title: R`المفتاح على السيرفر، والتطبيق ياخد token قصير العمر`,
        desc: R`الحل الصح للمفتاح السري: التطبيق ميعرفوش خالص. سيرفرك هو اللي شايل المفتاح وبينادي الـ API المدفوع، والتطبيق بيكلّم سيرفرك بـ **token قصير العمر** (دقايق) مربوط بالمستخدم. لو حد طلّع الـ token من الموبايل، هيخلص لوحده بعد شوية، ومش هيوصل للمفتاح الحقيقي أبدًا.

في الدرس ده بنشغّل سيرفر صغير بـ Node على جهازنا بيعمل كده بالظبط (proxy)، ونجرّب بـ [[curl]]: من غير token، وبـ token سليم، وبعد ما يخلص، وبـ token متعدّل.`,
        example: R`# Linux (and WSL):
curl -s "localhost:8080/weather?city=Cairo"
curl -s -X POST localhost:8080/token
TOKEN=$(curl -s -X POST localhost:8080/token | sed -E 's/.*"token":"([^"]+)".*/\1/')
curl -s -H "Authorization: Bearer $TOKEN" "localhost:8080/weather?city=Cairo"
# Windows (PowerShell):
$t = (Invoke-RestMethod -Method Post -Uri http://localhost:8080/token).token
Invoke-RestMethod -Uri "http://localhost:8080/weather?city=Cairo" -Headers @{ Authorization = "Bearer $t" }`,
        try: R`شغّل السيرفر اللي في الشرح بـ [[TOKEN_TTL=5]]، خد token، استنى ٦ ثواني، وجرّب تاني: لازم يرجع 401. بعدين غيّر حرف واحد في آخر الـ token وجرّب: برضه 401. وفي الآخر بص في لوج السيرفر وتأكد إن المفتاح الحقيقي مكتوب [[***]] ومبيوصلش للتطبيق في أي رد.`,
        deep: {
          why: R`لأن أي حاجة في التطبيق بتتقري (الدرس اللي قبله). فلو المفتاح في التطبيق، هو مكشوف مهما عملت. لو على السيرفر: تقدر تغيّره في أي وقت من غير ما تنزّل نسخة جديدة، وتحط حد لكل مستخدم (rate limit)، وتوقف مستخدم بعينه، وتشوف مين بيستخدم إيه.`,
          how: R`السيرفر بيدي التطبيق token بعد ما يتأكد من المستخدم (login). الـ token فيه بيانات صغيرة (مين المستخدم وإمتى يخلص [[exp]]) وتوقيع HMAC بسر عند السيرفر بس. أي تعديل في البيانات بيبوّظ التوقيع، وبعد [[exp]] السيرفر بيرفضه. ولما التطبيق يطلب حاجة، السيرفر يتأكد من الـ token وينادي الـ API الحقيقي بمفتاحه هو، ويرجّع النتيجة بس. في الشغل الحقيقي ده بيبقى JWT أو OAuth access token (عمره دقايق) ومعاه refresh token بيتخزّن بأمان (درس الـ Keystore).`,
          when: R`مع أي مفتاح بيكلّف فلوس أو بيفتح بيانات: مفاتيح الدفع، ومفاتيح AI أو SMS أو خرايط مدفوعة، وأي admin API. ولو الخدمة نفسها بتدعم tokens مؤقتة أو مقيّدة (زي ephemeral keys في بعض بوابات الدفع)، سيرفرك يطلبها ويديها للتطبيق بدل المفتاح الأصلي.`,
          mistakes: R`إنك تعمل endpoint في سيرفرك بيرجّع المفتاح الحقيقي للتطبيق «عشان مش مكتوب في الكود»: كده المفتاح لسه بيوصل للموبايل. وإن الـ proxy يبقى مفتوح من غير ما يعرف مين المستخدم: أي حد يستخدمه على حسابك. وإن الـ token يعيش شهور. وإنك تقارن التوقيع بـ [[===]] بدل مقارنة ثابتة الوقت ([[timingSafeEqual]]). وإنك تنسى rate limit لكل مستخدم.`
        },
        teach: R`## الفكرة في رسمة واحدة

~~~text
 التطبيق                    سيرفرك (proxy)                 الـ API المدفوع
    |   POST /token  ------->  يتأكد من المستخدم
    |  <-------  token (٥ دقايق)
    |   GET /weather + token -> يتأكد من الـ token
    |                          ينادي بالمفتاح بتاعه  ------->  key=*****
    |  <-------  النتيجة بس    <-------------------------------
~~~

المفتاح الحقيقي عمره ما بيعدّي السهم اللي ناحية التطبيق.

### اتجرّب فين؟

السيرفر ملف واحد [[proxy.js]] من غير أي مكتبة، اتشغّل بـ Node 24 في container [[node:24-alpine]] و [[curl]] 8.23 جوه نفس الـ container. ونفس الملف اتشغّل على ويندوز بـ Node 24 واتجرّب بـ [[Invoke-RestMethod]] في PowerShell 7.6 و 5.1. المفاتيح كلها مزيّفة وبتتقري من متغيرات البيئة:

~~~bash
UPSTREAM_KEY=FAKE-upstream-key-not-real SIGNING_SECRET=demo-signing-secret TOKEN_TTL=5 node proxy.js
~~~

---

## ١. السيرفر: أهم حتتين

### عمل الـ token وتوقيعه

~~~js
function sign(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const mac = crypto.createHmac("sha256", SIGNING_SECRET).update(body).digest("base64url");
  return body + "." + mac;
}
~~~

- [[payload]] = بيانات صغيرة: [[{ sub: "user-42", exp }]]. [[sub]] = subject يعني المستخدم، و [[exp]] = expiry وقت الانتهاء بالثواني من ١٩٧٠.
- [[base64url]] = طريقة تحويل bytes لحروف آمنة في الـ URL والـ headers.
- [[createHmac("sha256", SIGNING_SECRET)]] = HMAC: بصمة للنص محسوبة بسر. اللي معهوش السر ميقدرش يعمل بصمة صح لنص متعدّل.
- النتيجة [[body.mac]]، نفس فكرة الـ JWT بشكل مبسّط.

### التأكد منه

~~~js
const good = crypto.createHmac("sha256", SIGNING_SECRET).update(body).digest("base64url");
if (mac.length !== good.length || !crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(good))) return null;
const p = JSON.parse(Buffer.from(body, "base64url").toString());
return p.exp > Date.now() / 1000 ? p : null;
~~~

- بيحسب البصمة تاني ويقارن بـ [[timingSafeEqual]]: مقارنة بتاخد نفس الوقت مهما كان أول حرف غلط فين، عشان محدش يخمّن البصمة حرف حرف من سرعة الرد.
- [[Date.now() / 1000]] = الوقت دلوقتي بالثواني. لو [[exp]] عدّى يرجع [[null]] يعني مرفوض.

وبعدها الـ endpoint بينادي الـ API بالمفتاح ويرجّع النتيجة بس، وبيكتب في اللوج المفتاح [[***]].

---

## ٢. التجربة بـ [[curl]]

### من غير token

~~~bash
curl -s "localhost:8080/weather?city=Cairo"
~~~

[[-s]] = silent (من غير شريط التقدم). وحطينا الرابط بين [[""]] عشان علامة [[?]] متتفهمش غلط في الـ shell.

~~~text الناتج (401)
{"error":"invalid or expired token"}
~~~

### نطلب token

~~~bash
curl -s -X POST localhost:8080/token
~~~

[[-X POST]] = نوع الطلب POST بدل GET.

~~~text الناتج
{"token":"eyJzdWIiOiJ1c2VyLTQyIiwiZXhwIjoxNzkzMTQxMDEyfQ.7pcr-VwzPkLfSh44zgYgSWO4MQKm6QzmJTD8gzbpaME","expires_in":5}
~~~

الجزء اللي قبل النقطة لو فكّيته من base64url هتلاقيه [[{"sub":"user-42","exp":1793141012}]]: يعني الـ token **مش مشفّر**، أي حد يقراه. هو **موقّع** بس. عشان كده متحطش فيه حاجة سرية.

### نحفظه في متغير ونستخدمه

~~~bash
TOKEN=$(curl -s -X POST localhost:8080/token | sed -E 's/.*"token":"([^"]+)".*/\1/')
curl -s -H "Authorization: Bearer $TOKEN" "localhost:8080/weather?city=Cairo"
~~~

- [[$( ... )]] = نفّذ الأمر اللي جوه وحط ناتجه مكانه.
- [[sed -E 's/.../\1/']] = استبدل السطر كله بالحتة اللي بين القوسين [[([^"]+)]]، يعني أي حروف لحد أول [["]]: ده الـ token.
- [[-H "Authorization: Bearer ..."]] = header بالشكل المعروف لإرسال token.

~~~text الناتج (200)
{"city":"Cairo","temp_c":31}
~~~

ولوج السيرفر:

~~~text لوج السيرفر
upstream call for user-42 -> https://api.example.com/v1/weather?city=Cairo&key=***
~~~

### بعد ما يخلص، ولو اتعدّل

| التجربة | النتيجة |
|---|---|
| نفس الـ token بعد ٦ ثواني ([[TOKEN_TTL=5]]) | [[401]] و [[invalid or expired token]] |
| غيّرت الـ payload لـ [[{"sub":"admin","exp":9999999999}]] وسبت نفس التوقيع | [[401]]: البصمة مبقتش مطابقة |
| token جديد سليم | [[200]] |

---

## ٣. على ويندوز

~~~powershell
$t = (Invoke-RestMethod -Method Post -Uri http://localhost:8080/token).token
Invoke-RestMethod -Uri "http://localhost:8080/weather?city=Cairo" -Headers @{ Authorization = "Bearer $t" }
~~~

- [[Invoke-RestMethod]] بيبعت الطلب ويحوّل الـ JSON اللي راجع لـ object، فـ [[.token]] بتجيب الخانة على طول من غير [[sed]].
- [[@{ ... }]] = hashtable، وهنا فيها الـ headers.

~~~text الناتج
city  temp_c
----  ------
Cairo     31
~~~

ومن غير token بيرمي error فيه [[401]].

---

## الخلاصة

| الحاجة | فين |
|---|---|
| المفتاح الحقيقي | متغيرات البيئة على السيرفر بس |
| سر التوقيع | السيرفر بس |
| الـ token | التطبيق، وعمره دقايق، ومربوط بمستخدم |

- الـ token موقّع مش مشفّر: متحطش فيه أسرار.
- اللي بيسرق token بياخد دقايق على حساب مستخدم واحد، مش المفتاح كله.
- مع ده: rate limit لكل مستخدم، و HTTPS (درس الـ network security config).`,
        lines: [
          R`بيطلب الطقس من غير token: السيرفر بيرجّع 401.`,
          R`بيطلب token جديد من السيرفر (POST).`,
          R`بيطلب token ويطلّع قيمته من الـ JSON بـ sed ويحطها في متغير TOKEN.`,
          R`بيطلب الطقس ومعاه الـ token في header اسمه Authorization: بيرجع 200.`,
          R`على ويندوز: بيطلب token و Invoke-RestMethod بيحوّل الرد لـ object فبناخد .token على طول.`,
          R`بيطلب الطقس بالـ token في الـ headers.`
        ],
        sol: R`اتشغّل بـ Node 24.22 في container [[node:24-alpine]] و [[curl]] 8.23، وعلى ويندوز بـ Node 24 و PowerShell 7.6 و 5.1. بـ [[TOKEN_TTL=5]]:

~~~text الناتج
## with token
{"city":"Cairo","temp_c":31} [200]
## last character changed
{"error":"invalid or expired token"} [401]
## after 6 seconds
{"error":"invalid or expired token"} [401]
~~~

الرقم اللي بين الأقواس هو الـ status، طبعته بـ [[curl -w " [%{http_code}]\n"]]. وفي لوج السيرفر المفتاح ظاهر [[***]] بس، ومفيش أي رد للتطبيق فيه [[FAKE-upstream-key]].`
      },
      {
        cmd: "manifest_hardening",
        title: R`المانيفست: debuggable و allowBackup و exported وإزاي تقفلهم`,
        desc: R`المانيفست بيقول للنظام مين يقدر يكلّم تطبيقك وإزاي. ٤ سمات فيه بتفتح أبواب لو اتسابت غلط: [[android:debuggable="true"]] (أي حد معاه الموبايل يقرا بيانات التطبيق ويوصل له بـ debugger)، و [[android:allowBackup]] (بيانات التطبيق تتنسخ بره)، و [[android:exported="true"]] على service أو receiver من غير permission (أي تطبيق تاني على الموبايل يشغّله)، و [[usesCleartextTraffic="true"]] (HTTP من غير تشفير).

الدرس ده بيدوّر عليهم في APK تطبيقك بـ [[aapt2]] و [[jadx]] و [[grep]]، وبعدين يصلّحهم ويتأكد من النسخة الجديدة.`,
        example: R`# Linux (and WSL):
aapt2 dump badging myapp.apk | grep -E "debuggable|targetSdk"
jadx -d out_jadx myapp.apk
grep -nE 'debuggable|allowBackup|Cleartext|exported="true"|permission=' out_jadx/resources/AndroidManifest.xml
# Windows (PowerShell):
jadx -d out_jadx myapp.apk
Select-String -Path out_jadx\resources\AndroidManifest.xml -Pattern 'debuggable|allowBackup|Cleartext|exported="true"|permission='`,
        try: R`شغّل الأوامر على الـ release بتاع تطبيقك. لكل [[exported="true"]] اسأل: مين المفروض يفتح الحتة دي؟ لو تطبيقك بس، خليها [[false]]. لو تطبيقاتك إنت بس، حط permission بـ [[protectionLevel="signature"]]. وتأكد إن [[debuggable]] مش ظاهر خالص في الـ release.`,
        deep: {
          why: R`لأن الغلطات دي مش محتاجة أي مهارة عشان تتستغل. receiver مفتوح بيمسح الداتا ممكن أي تطبيق تاني على نفس الموبايل يبعتله broadcast. و debuggable في الـ release معناه إن صاحب الموبايل (أو أي حد مسك الموبايل مفتوح) يقرا ملفات التطبيق الخاصة بـ [[run-as]] من غير root. والـ backup ممكن ينقل tokens لجهاز تاني.`,
          how: R`[[aapt2 dump badging]] بيطبع سطر [[application-debuggable]] لو السمة دي true. و [[jadx]] بيرجّع [[AndroidManifest.xml]] لـ XML مقروء فتقدر تعمل عليه [[grep]]. التصليح: الـ release من Gradle بيبقى [[debuggable=false]] لوحده، فمتكتبهاش بإيدك في المانيفست. والـ backup: [[allowBackup="false"]] أو تحدد الملفات المسموحة بـ [[dataExtractionRules]] (أندرويد ١٢ وبعده) و [[fullBackupContent]] (أقدم). والـ components: [[exported="false"]] أو [[android:permission]] بـ permission إنت معرّفها بـ [[protectionLevel="signature"]]، يعني بس التطبيقات الموقّعة بنفس مفتاحك.`,
          when: R`كل release، وأوتوماتيك في الـ CI. وكل ما تضيف activity أو service أو receiver أو provider. ومن أندرويد ١٢ (targetSdk 31) أي component فيه [[intent-filter]] لازم تكتب له [[exported]] صريح وإلا البناء يفشل، فدي فرصة تفكّر فيها.`,
          mistakes: R`إنك تحط [[exported="true"]] على كل حاجة عشان «الـ build اشتكى». وإنك تفتكر إن [[intent-filter]] بيحمي (بالعكس: هو اللي بيخلي الـ component مفتوح لو exported). وإنك تحط permission بـ [[protectionLevel="normal"]]: أي تطبيق يطلبها ياخدها. وإنك تفتكر إن [[allowBackup="false"]] بيمنع root من قراية الداتا: هو بيقفل طرق الـ backup بس. والـ activity اللي عليها LAUNCHER لازم تفضل exported، وده طبيعي.`
        },
        teach: R`## الفكرة: المانيفست = قايمة الأبواب

كل activity و service و receiver و provider في المانيفست باب. [[exported]] بيقول الباب ده مفتوح لتطبيقات تانية ولا لأ. وسمات الـ [[<application>]] بتحدد حاجات للتطبيق كله: هل ينفع يتعمله debug؟ هل بياناته تتعمل لها backup؟ هل HTTP العادي مسموح؟

### اتجرّب فين؟

على نفس العيّنة ([[com.example.myapp]]) في container أوبونتو 24.04 ([[aapt2]] من build-tools 37، و [[jadx]] 1.5.6). كتبت المانيفست بالغلطات دي عمدًا، وفيه [[AdminReceiver]] بيمسح قاعدة البيانات لما يوصله broadcast اسمه [[com.example.myapp.RESET]]. سطر [[Select-String]] اتشغّل على نفس الملف في PowerShell 7.6 و 5.1.

---

## ١. [[aapt2 dump badging]]: ملخص سريع

~~~bash
aapt2 dump badging myapp.apk | grep -E "debuggable|targetSdk"
~~~

~~~text الناتج
targetSdkVersion:'36'
application-debuggable
~~~

- [[targetSdkVersion:'36']]: التطبيق بيستهدف أندرويد ١٦، فكل الحمايات الافتراضية الجديدة شغّالة (منها منع HTTP و [[exported]] الإجباري).
- [[application-debuggable]]: السطر ده بيظهر **بس** لو [[debuggable=true]]. في APK الـ release لازم ميبقاش موجود.

---

## ٢. المانيفست كـ XML: [[jadx]] و [[grep]]

~~~bash
jadx -d out_jadx myapp.apk
grep -nE 'debuggable|allowBackup|Cleartext|exported="true"|permission=' out_jadx/resources/AndroidManifest.xml
~~~

[[jadx]] بيكتب المانيفست مقروء في [[out_jadx/resources/AndroidManifest.xml]]. والـ pattern بين [['...']] (single quotes) عشان فيه [["]] جواه.

~~~text الناتج
16:        android:debuggable="true"
17:        android:allowBackup="true"
18:        android:usesCleartextTraffic="true">
21:            android:exported="true">
29:            android:exported="true"/>
32:            android:exported="true"/>
~~~

الـ grep بيطبع السطر اللي فيه السمة بس، والاسم في السطر اللي قبله، فنفتح الملف عند السطور دي:

~~~text out_jadx/resources/AndroidManifest.xml (السطور 19 لـ 32 من غير الـ intent-filter)
        <activity
            android:name="com.example.myapp.MainActivity"
            android:exported="true">
        ...
        <service
            android:name="com.example.myapp.SyncService"
            android:exported="true"/>
        <receiver
            android:name="com.example.myapp.AdminReceiver"
            android:exported="true"/>
~~~

ومعنى كل واحدة:

| السطر | الخطر | ليه |
|---|---|---|
| [[debuggable="true"]] | عالي | على موبايل عادي من غير root، [[adb shell run-as com.example.myapp]] بيدخل جوه فولدر التطبيق الخاص ويقرا قاعدة البيانات والـ tokens، وأي debugger يقدر يتوصّل بالتطبيق ويغيّر قيمه وهو شغّال (من الـ docs) |
| [[allowBackup="true"]] | متوسط | بيانات التطبيق تدخل في backup السحابة والنقل لجهاز جديد. و [[adb backup]] القديم (deprecated) مبقاش بيشمل بيانات التطبيقات اللي targetSdk بتاعها 31 أو أكتر (من الـ docs) |
| [[usesCleartextTraffic="true"]] | عالي | بيرجّع HTTP العادي اللي أندرويد ٩ وبعده بيمنعه افتراضيًا. التفاصيل في درس network security config |
| [[MainActivity]] exported | طبيعي | عليها LAUNCHER، فلازم تبقى مفتوحة عشان الـ launcher يفتحها |
| [[SyncService]] exported | عالي | أي تطبيق يقدر يشغّلها بـ [[startService]] |
| [[AdminReceiver]] exported | عالي جدًا | أي تطبيق يبعت [[com.example.myapp.RESET]] فيتمسح [[notes.db]] |

---

## ٣. التصليح

~~~xml
<permission android:name="com.example.myapp.permission.RESET"
    android:protectionLevel="signature" />
<application android:label="MyApp"
    android:allowBackup="false"
    android:networkSecurityConfig="@xml/network_security_config">
    ...
    <service android:name=".SyncService" android:exported="false" />
    <receiver android:name=".AdminReceiver" android:exported="true"
        android:permission="com.example.myapp.permission.RESET" />
</application>
~~~

- شلت [[debuggable]] خالص: Gradle بيحطها true في الـ debug و false في الـ release لوحده. لو كتبتها بإيدك في المانيفست بتغطّي على ده.
- [[allowBackup="false"]]: بيقفل الـ backup على السحابة. بس الـ docs بتقول إن مع targetSdk 31 أو أكتر، بعض الشركات المصنّعة مش بتسمح تقفل النقل من جهاز لجهاز (D2D) بالسمة دي. عشان كده الأضمن كمان ملف [[dataExtractionRules]] يستثني الملفات الحساسة (الـ tokens والكاش) بالاسم.
- شلت [[usesCleartextTraffic]] وحطيت [[networkSecurityConfig]] (درس جاي). السمة القديمة دي أصلًا بتتجاهل على أندرويد ٧ وبعده لما يكون فيه network security config، والـ docs بتقول إنها هتتجاهل خالص للتطبيقات اللي targetSdk بتاعها 38 أو أكتر.
- [[SyncService]]: [[exported="false"]] لأن محدش بره التطبيق محتاجها.
- [[AdminReceiver]]: لو تطبيق تاني **ليك** محتاج يبعتله، خليه exported بس بـ [[android:permission]]. الـ permission دي [[protectionLevel="signature"]]: النظام بيديها بس للتطبيقات الموقّعة بنفس الشهادة.

---

## ٤. نتأكد من النسخة الجديدة

~~~text الناتج (نفس الـ grep على النسخة المصلّحة)
16:        android:protectionLevel="signature"/>
19:        android:allowBackup="false"
20:        android:networkSecurityConfig="@xml/network_security_config">
23:            android:exported="true">
34:            android:permission="com.example.myapp.permission.RESET"
35:            android:exported="true"/>
~~~

و [[aapt2 dump badging]] مبقاش فيه سطر [[application-debuggable]]. الـ [[exported="true"]] اللي فضلوا: الـ launcher activity، والـ receiver المحمي بـ permission.

---

## ٥. على ويندوز

[[Select-String -Path ... -Pattern '...']] هو [[grep -n]]: بيطبع رقم السطر والسطر. طلع نفس الـ ٦ سطور في PowerShell 7.6 و 5.1. و [[jadx]] و [[aapt2]] نفس الأوامر على ويندوز ([[aapt2.exe]] جوه [[build-tools]] في الـ Android SDK).

## الخلاصة

| السمة | في الـ release |
|---|---|
| [[debuggable]] | متكتبهاش. Gradle يتصرف |
| [[allowBackup]] | [[false]]، أو [[dataExtractionRules]] تستثني الحساس |
| [[usesCleartextTraffic]] | شيلها، واستخدم network security config |
| [[exported]] | [[false]] إلا لو حد بره محتاجه فعلًا، ووقتها permission بـ [[signature]] |`,
        lines: [
          R`بيطبع ملخص الـ APK ويفلتر سطر debuggable (لو موجود) والـ targetSdk.`,
          R`بيفك الـ APK فيطلع المانيفست XML مقروء.`,
          R`بيدوّر في المانيفست على السمات الخطرة ويطبع رقم كل سطر.`,
          R`على ويندوز: نفس أمر jadx.`,
          R`بديل grep -n: بيطبع السطور اللي فيها السمات دي بأرقامها.`
        ],
        sol: R`اتشغّل على العيّنة في container أوبونتو 24.04 ([[aapt2]] من build-tools 37 و [[jadx]] 1.5.6)، وسطر [[Select-String]] في PowerShell 7.6 و 5.1 على نفس الملف. في النسخة الأولى طلع [[application-debuggable]] و ٦ سطور (فوق في الشرح). وفي النسخة المصلّحة:

~~~text الناتج
targetSdkVersion:'36'
~~~

مفيش [[application-debuggable]]، والـ grep طلّع [[allowBackup="false"]] و [[exported="false"]] على الـ service، والـ receiver محمي بـ [[permission="com.example.myapp.permission.RESET"]].`
      }
    ]
  },
  {
    t: R`R8 من ناحية الدفاع: بيخبّي إيه وميخبّيش إيه`,
    l: 2,
    n: R`نقارن نفس التطبيق قبل وبعد R8 بـ jadx: الأسماء بتروح، لكن النصوص والمنطق والمانيفست بيفضلوا. ونشيل اللوجات، ونحمي ملف الـ mapping`,
    items: [
      {
        cmd: "r8_before_after",
        title: R`نفس التطبيق قبل وبعد R8: إيه اللي اتغيّر في jadx فعلًا`,
        desc: R`[[R8]] (اللي بيشتغل في الـ release لما [[isMinifyEnabled = true]]) بيشيل الكود اللي مش مستخدم، وبيحط الدوال الصغيرة جوه اللي بيناديها (inlining)، وبيغيّر أسماء الكلاسات اللي فاضلة لحروف. لما تفك النسخة بـ [[jadx]] هتلاقي الكود أصغر وأسماؤه أقل معنى، **بس النصوص كلها لسه موجودة**، والمانيفست بأسماء الـ components الحقيقية، ونداءات أندرويد ([[Log.d]] و [[getIntent]]) بأسمائها.

يعني R8 بيصعّب القراية شوية ويصغّر التطبيق كتير، لكنه مش حماية لأسرار. إعدادات Gradle وقواعد keep متشرحة بالتفصيل في درس «R8 و ProGuard» في تاب Kotlin، وهنا بنبص على الناتج بعين اللي فاكك التطبيق.`,
        example: R`# Linux (and WSL):
jadx -d out_plain plain.apk
jadx -d out_min min.apk
find out_plain/sources out_min/sources -name "*.java" ! -name "R.java"
unzip -p min.apk classes.dex | strings | grep -E "FAKE|https://"
# Windows (PowerShell):
jadx -d out_min min.apk
Get-ChildItem out_min\sources -Recurse -Filter *.java | Select-Object -ExpandProperty Name`,
        try: R`ابني تطبيقك release مرة بـ [[isMinifyEnabled = false]] ومرة بـ [[true]]، وافك الاتنين بـ [[jadx]]. اعمل جدول: كلاسات اختفت، وكلاسات اسمها اتغيّر، وكلاسات فضلت باسمها، وليه (ارجع لـ [[mapping.txt]]). وبعدين دوّر على أي نص حساس في نسخة R8: لسه موجود؟`,
        deep: {
          why: R`عشان متعتمدش على R8 في حاجة هو مش معمول لها. R8 معمول للحجم والسرعة أساسًا، والتعمية (تغيير الأسماء) أثر جانبي بيأخّر اللي بيقرا بس. لو فاكر إنه بيخبّي المفتاح أو منطق الـ license، هتنشر حاجة مكشوفة وانت مطمّن.`,
          how: R`R8 بيبدأ من «نقط الدخول»: الـ components اللي في المانيفست (aapt2 بيكتب لها قواعد keep أوتوماتيك) وأي قاعدة keep منك. اللي مش واصل له حد بيتشال. الدوال اللي بتتنادى من مكان واحد أو صغيرة بتتحط مكان النداء. اللي فضل ومش محتاج اسمه بيتسمّى [[a]] و [[b]]. لكن النصوص لازم تفضل زي ما هي عشان البرنامج يشتغل، وأسماء كلاسات أندرويد نفسها (اللي في [[android.jar]]) متتغيرش لأنها مش جوه تطبيقك.`,
          when: R`دايمًا شغّله في الـ release، عشان الحجم أصلًا. وبعد ما تشغّله أول مرة، افك الناتج بـ jadx مرة واحدة على الأقل عشان تشوف بعينك إيه اللي لسه ظاهر.`,
          mistakes: R`إنك تفتكر إن [[a.a()]] معناه إن المنطق اتخبّى: المنطق نفسه مقروء، والاسم بس اللي راح. وإنك تحط [[-keep class com.example.** { *; }]] «عشان تبطّل مشاكل» فتلغي التعمية كلها. وإنك تقيس التعمية على تطبيق صغير: R8 ممكن يحط كل حاجة جوه الـ Activity زي ما هتشوف هنا، ومفيش أسماء تتغير أصلًا. ومكتبات «string encryption» بتأخّر بس: المفتاح والكود اللي بيفك موجودين في نفس التطبيق.`
        },
        teach: R`## إيه اللي بنقارنه؟

نفس الكود متبني مرتين:

| النسخة | اتبنت بـ | حجم [[classes.dex]] |
|---|---|---|
| [[plain.apk]] | [[d8 --release]] (من غير R8) | 5252 byte |
| [[min.apk]] | [[R8 --release]] بقواعد keep اللي [[aapt2]] بيولّدها من المانيفست | 3660 byte |

### اتجرّب فين؟

container أوبونتو 24.04: [[javac]] من JDK 21، و [[d8]] و R8 9.2.4-dev من [[build-tools/37.0.0/lib/d8.jar]] (نفس اللي Gradle بيعمله، بس متنادي بإيدي: [[java -cp d8.jar com.android.tools.r8.R8]])، و [[jadx]] 1.5.6. الكود: [[MainActivity]] بتستخدم [[ApiClient]] (فيه المفتاح المزيّف) و [[CartManager]]، و [[SyncService]] بتستخدم [[CartManager]] كمان. الجزء بتاع ويندوز اتشغّل على فولدر [[out_min]] في PowerShell 7.6.

في Gradle نفس الكلام بيتعمل بـ:

~~~kotlin
buildTypes {
    release {
        isMinifyEnabled = true
        proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
    }
}
~~~

(التفاصيل والأرقام على مشروع حقيقي في درس «R8 و ProGuard» في تاب Kotlin.)

---

## ١. القواعد اللي R8 بدأ منها

[[aapt2 link --proguard aapt_rules.txt]] بيكتب keep لكل component في المانيفست، لأن النظام بيفتحهم بالاسم:

~~~text aapt_rules.txt
# Referenced at /work/app/AndroidManifest.xml:17
-keep class com.example.myapp.AdminReceiver { <init>(); }
# Referenced at /work/app/AndroidManifest.xml:10
-keep class com.example.myapp.MainActivity { <init>(); }
# Referenced at /work/app/AndroidManifest.xml:16
-keep class com.example.myapp.SyncService { <init>(); }
~~~

[[<init>()]] = الـ constructor الفاضي. يعني: الكلاس ده واسمه يفضلوا، والـ constructor اللي النظام بيستخدمه يفضل.

---

## ٢. الكلاسات قبل وبعد

~~~bash
jadx -d out_plain plain.apk
jadx -d out_min min.apk
find out_plain/sources out_min/sources -name "*.java" ! -name "R.java"
~~~

- [[find <فولدرات> -name "*.java"]] = هات الملفات اللي اسمها بينتهي بـ [[.java]].
- [[! -name "R.java"]] = [[!]] معناها «مش»: استبعد [[R.java]] (jadx بيولّده من جدول الموارد).

~~~text الناتج
out_plain/sources/com/example/myapp/AdminReceiver.java
out_plain/sources/com/example/myapp/ApiClient.java
out_plain/sources/com/example/myapp/BuildConfig.java
out_plain/sources/com/example/myapp/CartManager.java
out_plain/sources/com/example/myapp/MainActivity.java
out_plain/sources/com/example/myapp/SyncService.java
out_min/sources/com/example/myapp/AdminReceiver.java
out_min/sources/com/example/myapp/MainActivity.java
out_min/sources/com/example/myapp/SyncService.java
~~~

٣ كلاسات اختفوا. [[mapping.txt]] بيقول حصل لهم إيه:

~~~text mapping.txt (جزء)
com.example.myapp.ApiClient -> R8$$REMOVED$$CLASS$$0:
com.example.myapp.CartManager -> R8$$REMOVED$$CLASS$$1:
com.example.myapp.MainActivity -> com.example.myapp.MainActivity:
    3:4:java.lang.String com.example.myapp.ApiClient.weatherUrl(java.lang.String):10:11 -> onCreate
    7:7:void com.example.myapp.CartManager.add(java.lang.String,int):13:13 -> onCreate
~~~

- [[REMOVED]]: الكلاس اتشال، بس كوده **متشالش**: اتنقل جوه [[onCreate]] (السطور اللي تحت بتقول [[weatherUrl]] بقت جزء من [[onCreate]]). ده الـ inlining.
- [[BuildConfig]] مش في الـ mapping خالص: محدش بيستخدمه، فاتشال من غير ما يتسجّل. وقيمته [[PAYMENTS_KEY]] كانت مستخدمة في دالة محدش بيناديها، فاختفت معاه. ده حظ، مش حماية.

---

## ٣. الكود اللي فضل

~~~java
public final void onCreate(Bundle bundle) {
    super.onCreate(bundle);
    String stringExtra = getIntent().getStringExtra("city");
    Log.d("ApiClient", "building url for " + stringExtra + " with key FAKE-api-key-0000-not-real");
    String str = "https://api.example.com/v1/weather?city=" + stringExtra + "&key=FAKE-api-key-0000-not-real";
    Log.d("MainActivity", "url=".concat(str));
    HashMap map = new HashMap();
    map.put("pro-month", 99);
    map.put("sticker", 5);
    ...
~~~

لاحظ ٣ حاجات:

1. **المفتاح لسه موجود**، بل بقى في نفس الدالة اللي بتفتح الشاشة، أسهل في القراية.
2. [[CartManager]] اتفكّ لـ [[HashMap]] عادي جوه الدالة، وفحص [[if (price < 0)]] اتشال هنا لأن R8 عارف إن 99 و 5 موجبين. لكن في [[SyncService]] الفحص فضل لأن السعر جاي من [[Intent]].
3. [[getIntent]] و [[Log.d]] و [[HashMap]] بأسمائها: دي كلاسات أندرويد و Java، مش جوه تطبيقك، فمحدش يقدر يغيّر اسمها.

---

## ٤. وفين الـ [[a]] و [[b]]؟

التطبيق صغير، فـ R8 حط كل حاجة جوه الـ components ومفضلش كلاس يتسمّى. عشان تشوف التعمية لوحدها بنيت نسخة تالتة بقاعدة [[-dontoptimize]] (بتوقف الـ inlining):

~~~text mapping.txt (نسخة -dontoptimize)
com.example.myapp.ApiClient -> a:
com.example.myapp.CartManager -> b:
    java.util.Map items -> a
~~~

~~~java
public class b {
    private final Map a = new HashMap();

    public void a(String str, int i) {
        if (i >= 0) {
            this.a.put(str, Integer.valueOf(i));
        } else {
            throw new IllegalArgumentException("negative price for " + str);
        }
    }
~~~

الاسم راح ([[CartManager.add]] بقت [[b.a]])، لكن المنطق كامل، ونص الـ exception بيقول بالظبط الدالة بتعمل إيه. في تطبيق حقيقي كبير هتشوف الشكل ده كتير.

---

## ٥. النصوص في الـ dex

~~~bash
unzip -p min.apk classes.dex | strings | grep -E "FAKE|https://"
~~~

~~~text الناتج
$ with key FAKE-api-key-0000-not-real
&key=FAKE-api-key-0000-not-real
(https://api.example.com/v1/weather?city=
~~~

نفس النصوص اللي كانت في النسخة اللي من غير R8 (الحرف اللي في أول السطر هو طول النص زي ما شرحنا في درس الأسرار). والمانيفست في [[min.apk]] هو هو بأسماء [[MainActivity]] و [[SyncService]] و [[AdminReceiver]].

## ٦. على ويندوز

~~~powershell
Get-ChildItem out_min\sources -Recurse -Filter *.java | Select-Object -ExpandProperty Name
~~~

[[-Filter *.java]] = الملفات اللي بتنتهي بـ [[.java]]، و [[-ExpandProperty Name]] = اطبع الاسم بس. الناتج: [[AdminReceiver.java]] و [[MainActivity.java]] و [[R.java]] و [[SyncService.java]].

## الخلاصة

| R8 بيعمل | R8 مبيعملش |
|---|---|
| يشيل الكود اللي محدش بيستخدمه | يخبّي النصوص |
| يدمج الدوال الصغيرة في اللي بيناديها | يغيّر أسماء الـ components اللي في المانيفست |
| يسمّي الكلاسات الفاضلة [[a]] و [[b]] | يغيّر أسماء أندرويد و Java |
| يصغّر الـ dex (هنا من 5252 لـ 3660 byte) | يخبّي المنطق |`,
        lines: [
          R`بيفك النسخة اللي من غير R8 في out_plain.`,
          R`بيفك نسخة R8 في out_min.`,
          R`بيعرض ملفات الـ Java في النسختين ما عدا R.java عشان نقارن الكلاسات.`,
          R`بيدوّر في dex نسخة R8 على المفتاح المزيّف والروابط: لسه موجودين.`,
          R`على ويندوز: نفس فك نسخة R8.`,
          R`بيعرض أسماء ملفات الـ Java اللي في نسخة R8.`
        ],
        sol: R`اتشغّل في container أوبونتو 24.04 (R8 9.2.4-dev من build-tools 37، و jadx 1.5.6)، وسطر ويندوز في PowerShell 7.6. الخلاصة الرقمية:

~~~text الناتج
plain.apk  classes.dex  5252 byte  6 كلاسات (+ R)
min.apk    classes.dex  3660 byte  3 كلاسات (+ R)   المفتاح FAKE-api-key... لسه موجود
~~~

أي كلاس اختفى تلاقي سببه في [[mapping.txt]]: [[REMOVED]] مع سطور بتقول كوده اتنقل فين، أو مش موجود خالص لو محدش كان بيستخدمه.`
      },
      {
        cmd: "r8_strip_logs",
        title: R`شيل Log.d من الـ release، وخبّي أسماء ملفات السورس`,
        desc: R`[[Log.d]] و [[Log.v]] في الـ release بيطبعوا حاجات المفروض متتشافش (URLs وقيم وأحيانًا tokens) في [[logcat]]، ونصوصهم كمان بتفضل جوه الـ dex فبتشرح الكود لأي حد فاكه. قاعدة [[-assumenosideeffects]] في [[proguard-rules.pro]] بتخلي R8 يشيل النداءات دي من الـ release بالكامل.

ومعاها قاعدتين للـ stack traces: [[-keepattributes SourceFile,LineNumberTable]] تحافظ على أرقام السطور (عشان تقدر تفك الـ crash)، و [[-renamesourcefileattribute SourceFile]] تخلي اسم الملف [[SourceFile]] بدل [[CartManager.java]].`,
        example: R`# proguard-rules.pro
-assumenosideeffects class android.util.Log {
    public static int v(...);
    public static int d(...);
}
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile`,
        try: R`ضيف القواعد دي لـ [[proguard-rules.pro]] في تطبيقك، وابني release، ودوّر في الـ dex على نص من رسالة [[Log.d]] عندك ([[unzip -p app-release.apk classes.dex | strings | grep "النص"]]). لازم ميلاقيهوش. وبعدين دوّر على نص من [[Log.e]]: المفروض يفضل، لأنك محتاج الأخطاء.`,
        flag: "script",
        deep: {
          why: R`اللوجات من أسهل طرق التسريب: أي حد موصّل الموبايل بـ [[adb logcat]] يشوفها، ونصوصها بتشرح الكود المتعمّي ([[Log.d("PaymentFlow", "verifying receipt...")]] بتقول الدالة دي بتعمل إيه مهما كان اسمها). وأسماء ملفات السورس بتدّي معنى لكلاس اسمه [[a]].`,
          how: R`[[-assumenosideeffects]] بتقول لـ R8: «الدوال دي ملهاش أي أثر غير القيمة اللي بترجّعها». فلو محدش بيستخدم القيمة (وده حال [[Log.d]] دايمًا)، R8 بيعتبر النداء ملوش لازمة ويشيله، ومعاه النصوص اللي كانت بتتبني عشانه. [[(...)]] = أي parameters. و [[-keepattributes]] بتحافظ على معلومات في الـ bytecode R8 بيشيلها افتراضيًا، و [[-renamesourcefileattribute]] بيغيّر قيمة اسم الملف لكلمة ثابتة.`,
          when: R`في كل تطبيق فيه [[Log.d]] أو [[Log.v]] (يعني كل تطبيق). البديل اللي بيشتغل من غير R8: [[if (BuildConfig.DEBUG) Log.d(...)]]، وفي الـ release [[DEBUG]] = [[false]] ثابتة فالكود كله بيتشال. أو مكتبة logging بتتقفل في الـ release.`,
          mistakes: R`إنك تكتب [[Log.e]] و [[Log.w]] في نفس القاعدة فتخسر أخطاء الـ production. وإنك تكتب القاعدة من غير [[isMinifyEnabled = true]] فمتعملش حاجة. وإنك تفتكر إن القاعدة بتشيل أي حاجة جوه الـ arguments: لو بتنادي دالة ليها أثر جوه الـ Log، R8 بيسيبها. وإنك تبعت tokens أو بيانات شخصية لـ [[Log.e]] أو لـ crash reporting: دي بتفضل.`
        },
        teach: R`## إيه اللي بنقيسه؟

نفس الكود بالـ R8 مرتين: [[min.apk]] (قواعد المانيفست بس) و [[min-logs.apk]] (نفس القواعد + الـ ٦ سطور دول). اتبنوا في container أوبونتو 24.04 بـ R8 9.2.4-dev من build-tools 37 واتفكّوا بـ [[jadx]] 1.5.6.

---

## ١. القواعد سطر سطر

### [[-assumenosideeffects class android.util.Log { ... }]]

~~~text proguard-rules.pro
-assumenosideeffects class android.util.Log {
    public static int v(...);
    public static int d(...);
}
~~~

| الحتة | معناها |
|---|---|
| [[-assumenosideeffects]] | افترض إن الدوال دي ملهاش side effects، يعني متعملش حاجة غير إنها ترجّع قيمة |
| [[class android.util.Log]] | الكلاس بتاع أندرويد اللي فيه [[Log.d]] وإخواتها |
| [[public static int d(...)]] | [[Log.d]] بترجّع [[int]] (عدد البايتات اللي اتكتبت). [[(...)]] = أي عدد وأي نوع parameters، فبتمسك [[d(tag, msg)]] و [[d(tag, msg, throwable)]] |

إحنا بنكدب على R8 بقصد: [[Log.d]] **ليها** أثر (بتكتب في الـ log). بس ده بالظبط اللي عايزينه يختفي. ولأن محدش بيستخدم الـ [[int]] اللي بترجعه، R8 بيشيل النداء كله.

### [[-keepattributes SourceFile,LineNumberTable]]

الـ bytecode فيه attributes إضافية: [[SourceFile]] (اسم ملف السورس) و [[LineNumberTable]] (كل تعليمة جاية من سطر كام). من غيرهم الـ stack trace بيبقى من غير أرقام سطور مفيدة. القاعدة بتقول لـ R8 يسيبهم.

### [[-renamesourcefileattribute SourceFile]]

خلي قيمة [[SourceFile]] في كل الكلاسات الكلمة [[SourceFile]] بدل [[CartManager.java]]. أرقام السطور فضلت، واسم الملف (اللي بيكشف الاسم الأصلي للكلاس) راح. و [[mapping.txt]] بيرجّع الاتنين وقت ما تفك الـ crash (الدرس اللي بعده).

---

## ٢. الفرق في الكود

~~~java
// min.apk
String stringExtra = getIntent().getStringExtra("city");
Log.d("ApiClient", "building url for " + stringExtra + " with key FAKE-api-key-0000-not-real");
String str = "https://api.example.com/v1/weather?city=" + stringExtra + "&key=FAKE-api-key-0000-not-real";
Log.d("MainActivity", "url=".concat(str));

// min-logs.apk
String str = "https://api.example.com/v1/weather?city=" + getIntent().getStringExtra("city") + "&key=FAKE-api-key-0000-not-real";
~~~

النداءين اتشالوا، ومعاهم النص [["building url for "]] اللي كان بيشرح الدالة. لكن **المفتاح لسه موجود** لأنه جزء من الـ URL اللي التطبيق محتاجه فعلًا. القاعدة دي بتقفل تسريب الـ logcat، مش بتحل مشكلة المفتاح (ده درس السيرفر).

---

## ٣. الفرق في نصوص الـ dex

~~~bash
unzip -p min.apk classes.dex | strings | grep -E "FAKE|building|synced|url=|SourceFile|\.java"
unzip -p min-logs.apk classes.dex | strings | grep -E "FAKE|building|synced|url=|SourceFile|\.java"
~~~

[[\.java]] = نقطة حقيقية (من غير [[\]] النقطة في regex معناها «أي حرف»).

~~~text الناتج
== min
$ with key FAKE-api-key-0000-not-real
&key=FAKE-api-key-0000-not-real
building url for
synced cart total=
url=
== min-logs
&key=FAKE-api-key-0000-not-real
SourceFile
~~~

| النص | [[min]] | [[min-logs]] |
|---|---|---|
| رسايل [[Log.d]] ([[building url for]] و [[synced cart total=]] و [[url=]]) | موجودة | اتشالت |
| المفتاح في الـ URL | موجود | موجود |
| اسم الملف | [[r8-map-id-fc95...]] | [[SourceFile]] |
| حجم [[classes.dex]] | 3660 byte | 3232 byte |

في [[min]] من غير القاعدة، R8 كتب مكان اسم الملف [[r8-map-id-]] وبعدها هاش الـ mapping: ده بيقولك الـ crash ده جاي من أنهي build، فتعرف تختار أنهي [[mapping.txt]].

---

## الخلاصة

- [[-assumenosideeffects]] على [[Log.v]] و [[Log.d]] بس: الأخطاء ([[Log.e]]) تفضل.
- بيقفل تسريب الـ logcat ويشيل نصوص بتشرح الكود، بس مش بيشيل البيانات اللي التطبيق محتاجها.
- [[-keepattributes SourceFile,LineNumberTable]] + [[-renamesourcefileattribute SourceFile]] = أرقام سطور للـ crash من غير ما تكشف أسماء الملفات.
- كل ده محتاج [[isMinifyEnabled = true]].`,
        lines: [
          R`بتقول لـ R8: الدوال اللي جوه كلاس Log دي ملهاش أثر، فشيل أي نداء ليها محدش بيستخدم نتيجته.`,
          R`Log.v (verbose) تتشال.`,
          R`Log.d (debug) تتشال.`,
          R`قفلة القاعدة.`,
          R`حافظ على اسم الملف وأرقام السطور في الـ bytecode عشان الـ stack traces.`,
          R`خلي اسم الملف في كل الكلاسات الكلمة SourceFile بدل الاسم الحقيقي.`
        ],
        sol: R`اتشغّل بـ R8 9.2.4-dev (build-tools 37) في container أوبونتو 24.04. بعد القواعد، [[strings]] على dex نسخة [[min-logs]]:

~~~text الناتج
&key=FAKE-api-key-0000-not-real
SourceFile
~~~

رسايل [[Log.d]] اختفت، والـ dex صغر من 3660 لـ 3232 byte. ولو عندك [[Log.e]] هتلاقي نصه لسه موجود، وده المطلوب.`
      },
      {
        cmd: "r8_mapping_retrace",
        title: R`mapping.txt: المفتاح اللي بيفك تعميتك، وفك الـ crash بـ retrace`,
        desc: R`كل build بـ R8 بيطلّع [[mapping.txt]]: جدول بيقول [[a.a]] كان اسمه [[CartManager]] وسطر ٢ كان سطر ١١. الملف ده **مش بيتحط في الـ APK** وده اللي بيخلي التعمية ليها معنى، وفي نفس الوقت من غيره مش هتعرف تقرا الـ crash reports بتاعتك.

فالقاعدة: احفظه لكل نسخة بتنشرها (مربوط بالـ versionCode)، وارفعه على Play Console أو أداة الـ crash reporting، ومتحطوش في repo عام أو جوه التطبيق. والأداة [[retrace]] (جوه R8 نفسه) بتستخدمه عشان ترجّع الـ stack trace لأسمائه الحقيقية.`,
        example: R`# Linux (and WSL):
unzip -l min.apk | grep -i mapping
java -cp app-min.jar com.example.shop.Main sticker -1 2> trace.txt
cat trace.txt
java -cp "$ANDROID_HOME/build-tools/37.0.0/lib/d8.jar" com.android.tools.r8.retrace.Retrace mapping.txt trace.txt
# Windows (PowerShell):
java -cp "$env:ANDROID_HOME\build-tools\37.0.0\lib\d8.jar" com.android.tools.r8.retrace.Retrace mapping.txt trace.txt`,
        try: R`في تطبيقك: اعمل crash مقصود في الـ release (زرار بيرمي exception)، خد الـ stack trace من [[adb logcat]]، وافكه بـ [[retrace]] و [[mapping.txt]] بتاع نفس الـ build. بعدين ابني تاني بعد تعديل صغير وجرّب الـ trace القديم مع الـ mapping الجديد: هتلاقي الأسماء أو السطور ممكن تطلع غلط، وده سبب إنك تحفظ mapping لكل نسخة.`,
        deep: {
          why: R`الـ mapping هو عكس التعمية بالظبط. لو اتسرّب مع الـ APK، أي حد يرجّع كل الأسماء. ولو ضاع منك، كل crash من الـ production هيبقى [[a.a(SourceFile:2)]] ومش هتعرف تصلّح. فهو ملف لازم تحتفظ بيه وتحميه في نفس الوقت.`,
          how: R`R8 بيكتب في [[mapping.txt]] لكل كلاس [[الاسم الأصلي -> الاسم الجديد:]] وتحته الـ fields والدوال بأرقام سطورها القديمة والجديدة، وكمان الدوال اللي اتحطت جوه دوال تانية (inlining). وفي أوله [[pg_map_id]]: هاش بيميّز الـ build ده. [[retrace]] بيقرا الـ trace سطر سطر ويرجّع كل [[a.a(SourceFile:2)]] لاسمه وسطره الأصلي. Gradle بيكتبه في [[app/build/outputs/mapping/release/mapping.txt]]، والـ AAB بيشيله جواه فـ Play Console بيستخدمه لوحده في Android vitals.`,
          when: R`كل release: ارفع الـ mapping كـ artifact في الـ CI باسم فيه الـ versionCode، أو اتأكد إنه وصل لـ Play Console وأداة الـ crash reporting اللي بتستخدمها. وكل ما يجيلك crash من الـ production.`,
          mistakes: R`إنك تعمل commit للـ mapping في repo عام. وإنك تنساه ومتحفظوش فتبقى الـ crashes القديمة مستحيل تتقري. وإنك تفك trace بـ mapping من build تاني. وإنك تشيل [[LineNumberTable]] فيبقى retrace مش عارف أنهي سطر. وإنك تفتكر إن الـ mapping مطلوب عشان التطبيق يشتغل: التطبيق مش محتاجه خالص.`
        },
        teach: R`## ١. الـ mapping مش في الـ APK

~~~bash
unzip -l min.apk | grep -i mapping
~~~

مفيش ناتج: الملف مش جوه التطبيق. هو بيطلع جنبه وقت البناء بس، وده سبب إن التعمية ليها قيمة.

---

## ٢. نعمل crash حقيقي

المحاكي مش متاح جوه الـ container، فعشان أشوف stack trace حقيقي متعمّي عملت نفس الكود ([[CartManager]] و [[Main]]) كبرنامج Java عادي، وشغّلت عليه نفس R8 بس بـ [[--classfile]] (يطلّع [[.class]] بدل [[.dex]]) عشان يشتغل على JVM. القواعد:

~~~text rules.pro
-keep class com.example.shop.Main { public static void main(java.lang.String[]); }
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile
~~~

[[Main.main]] هي نقطة الدخول زي الـ Activity في أندرويد، فلازم keep. ونخلّي السعر سالب عشان [[add]] ترمي exception:

~~~bash
java -cp app-min.jar com.example.shop.Main sticker -1 2> trace.txt
cat trace.txt
~~~

- [[java -cp app-min.jar]] = شغّل من الـ jar ده ([[-cp]] = classpath، فين الكلاسات).
- [[sticker -1]] = الـ arguments: اسم المنتج وسعره.
- [[2> trace.txt]] = [[2]] هو stderr (مكان الأخطاء)، و [[>]] = اكتبه في ملف.

~~~text trace.txt
Exception in thread "main" java.lang.IllegalArgumentException: negative price for sticker
	at a.a.a(SourceFile:2)
	at com.example.shop.Main.main(SourceFile:3)
~~~

| الحتة | معناها |
|---|---|
| [[a.a.a]] | package [[a]]، كلاس [[a]]، دالة [[a]]. ملهاش أي معنى |
| [[SourceFile:2]] | اسم الملف متخبّي، والسطر ٢ ده سطر في الكود **بعد** R8 مش السطر الأصلي |
| [[Main.main]] | فضل باسمه بسبب الـ keep |

---

## ٣. الـ mapping بيقول إيه

~~~text mapping.txt (من غير سطور التعليقات)
com.example.shop.CartManager -> a.a:
    java.util.Map items -> a
    1:2:void <init>():6:7 -> <init>
    1:1:void add(java.lang.String,int):13:13 -> a
    2:2:void add(java.lang.String,int):11:11 -> a
com.example.shop.Main -> com.example.shop.Main:
    1:4:void main(java.lang.String[]):5:8 -> main
    5:5:int com.example.shop.CartManager.total():18:18 -> main
~~~

نقرا سطر واحد: [[2:2:void add(java.lang.String,int):11:11 -> a]]

| الحتة | معناها |
|---|---|
| [[2:2]] | السطور من ٢ لـ ٢ في الكود الجديد |
| [[void add(java.lang.String,int)]] | الدالة الأصلية بالـ parameters |
| [[11:11]] | بتقابل السطر ١١ في الملف الأصلي |
| [[-> a]] | واسمها الجديد [[a]] |

يعني [[a.a.a(SourceFile:2)]] = [[CartManager.add]] سطر ١١، وده سطر [[throw new IllegalArgumentException]]. وسطر [[5:5:int ...CartManager.total()]] بيقول إن [[total]] اتحطت جوه [[main]] (inlining).

---

## ٤. [[retrace]] يعمل ده أوتوماتيك

~~~bash
java -cp "$ANDROID_HOME/build-tools/37.0.0/lib/d8.jar" com.android.tools.r8.retrace.Retrace mapping.txt trace.txt
~~~

- [[d8.jar]] اللي في build-tools فيه R8 كله، ومنه أداة [[Retrace]].
- [[$ANDROID_HOME]] = متغير بيشاور على فولدر الـ Android SDK.
- البرنامج بياخد الـ mapping الأول وبعده ملف الـ trace.

~~~text الناتج
Exception in thread "main" java.lang.IllegalArgumentException: negative price for sticker
	at com.example.shop.CartManager.add(CartManager.java:11)
	at com.example.shop.Main.main(Main.java:7)
~~~

طابق **بالظبط** الـ trace اللي بيطلع من النسخة اللي من غير R8. ولو عندك cmdline-tools، فيها سكريبت جاهز اسمه [[retrace]] بيعمل نفس الحاجة: [[retrace mapping.txt trace.txt]] (مستخدم في درس «R8 و ProGuard» في تاب Kotlin).

على ويندوز نفس الأمر، بس المتغير [[$env:ANDROID_HOME]] والمسار بـ [[\]].

---

## ٥. احفظه صح

أول سطور الـ mapping:

~~~text mapping.txt
# compiler: R8
# compiler_version: 9.2.4-dev
# pg_map_id: 9253a11e6fe97a72ab50a9227df5c85524590e05e9080a3aa38636ad3462dab4
~~~

[[pg_map_id]] هاش بيميّز الـ build ده. ولما الـ build ميكونش فيه أي قاعدة [[-keepattributes SourceFile]] (زي نسخة [[min.apk]] في الدرس اللي فات)، R8 بيكتب اسم الملف في الـ dex [[r8-map-id-<الهاش>]]، فالـ crash نفسه بيقولك محتاج أنهي mapping.

| اعمل | متعملش |
|---|---|
| ارفعه artifact في الـ CI باسم فيه الـ versionCode | تحطه في repo عام |
| اتأكد إنه وصل Play Console (بيتشال جوه الـ AAB) وأداة الـ crashes | تحطه جوه [[assets/]] أو أي حتة في التطبيق |
| استخدم mapping نفس الـ build بالظبط | تفك trace بـ mapping من build تاني |

## الخلاصة

- [[mapping.txt]] = عكس التعمية. مش في الـ APK، وخليه كده.
- من غيره الـ crashes بتاعتك مش مقروءة، فاحفظه لكل نسخة.
- [[retrace mapping.txt trace.txt]] بيرجّع الأسماء وأرقام السطور، بشرط [[LineNumberTable]].`,
        lines: [
          R`بيدوّر على أي ملف mapping جوه الـ APK: مفيش.`,
          R`بيشغّل البرنامج المتعمّي بسعر سالب فيرمي exception، والـ stack trace بيتكتب في trace.txt.`,
          R`بيعرض الـ stack trace المتعمّي.`,
          R`بيشغّل Retrace اللي جوه d8.jar على الـ mapping والـ trace فيرجّع الأسماء والسطور الأصلية.`,
          R`على ويندوز: نفس الأمر بمتغير PowerShell ومسار ويندوز.`
        ],
        sol: R`اتشغّل في container أوبونتو 24.04: JDK 21، و R8 و Retrace 9.2.4-dev من [[build-tools/37.0.0/lib/d8.jar]] (R8 بـ [[--classfile]] عشان يشتغل على JVM). أمر ويندوز هو نفس البرنامج بمسار مختلف، ومتجرّبش على ويندوز.

~~~text الناتج (قبل retrace)
	at a.a.a(SourceFile:2)
	at com.example.shop.Main.main(SourceFile:3)
~~~

~~~text الناتج (بعد retrace)
	at com.example.shop.CartManager.add(CartManager.java:11)
	at com.example.shop.Main.main(Main.java:7)
~~~

ونفس البرنامج من غير R8 طلّع [[CartManager.java:11]] و [[Main.java:7]] بالظبط.`
      }
    ]
  }
]);
