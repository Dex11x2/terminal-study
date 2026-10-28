// تكملة تاب re: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/re/01.js (شرح حقول الدرس في أوله)
MORE("re", [
  {
    t: R`أمان الشبكة: cleartext والـ pinning`,
    l: 3,
    n: R`ملف network_security_config.xml: نمنع HTTP، ونحدد مين نثق فيه، ونسمح بالتجربة المحلية في الـ debug بس. وبعدين certificate pinning: بيحمي من إيه، وإزاي تحسب الـ pin، وليه ممكن يقفل تطبيقك لو اتعمل غلط`,
    items: [
      {
        cmd: "network_config",
        title: R`network_security_config.xml: امنع HTTP وحدد مين تثق فيه`,
        desc: R`ملف XML في [[res/xml/]] بتشاور عليه من المانيفست بـ [[android:networkSecurityConfig]]، وبيتحكم في اتصالات تطبيقك من غير ما تغيّر سطر كود: هل HTTP العادي (cleartext) مسموح؟ وأنهي شهادات (CAs) التطبيق يثق فيها؟ ولأنهي دومين؟

من أندرويد ٩ (targetSdk 28) الـ cleartext ممنوع افتراضيًا، ومن أندرويد ٧ (targetSdk 24) التطبيق مش بيثق في الشهادات اللي المستخدم ضافها بإيده. الملف بيخليك تكتب ده صريح، وتفتح استثناء للتجربة على جهازك في نسخة الـ debug بس.`,
        example: R`<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="false">
        <trust-anchors>
            <certificates src="system" />
        </trust-anchors>
    </base-config>
</network-security-config>`,
        try: R`ضيف الملف ده لتطبيقك في [[app/src/main/res/xml/]] وشاور عليه من المانيفست. اعمل نسخة تانية في [[app/src/debug/res/xml/]] بنفس الاسم تسمح بـ cleartext لـ [[10.0.2.2]] بس (سيرفرك المحلي من المحاكي). ابني الـ debug والـ release، وافكهم بـ [[aapt2 dump xmltree --file res/xml/network_security_config.xml]]: لازم تلاقي الاستثناء في الـ debug بس.`,
        flag: "script",
        deep: {
          why: R`HTTP العادي بيتقري ويتعدّل من أي حد على نفس الشبكة (واي فاي عام مثلًا): tokens وبيانات. والثقة في شهادات المستخدم معناها إن أي حد يقنع المستخدم يسطّب شهادة (أو برنامج بيعمل كده) يقدر يقرا HTTPS بتاعك. الملف بيخلي ده قرار مكتوب ومتراجع، مش افتراض.`,
          how: R`[[base-config]] = القاعدة لكل الاتصالات. [[domain-config]] = استثناء أو تشديد لدومينات معيّنة (زي pinning أو cleartext لـ localhost). [[trust-anchors]] = مين التطبيق يثق فيه: [[system]] (شهادات النظام) أو [[user]] (اللي المستخدم ضافها) أو ملف شهادة في [[res/raw]]. و [[debug-overrides]] = إعدادات بتشتغل **بس** لو التطبيق [[debuggable]]. النظام بيطبّق الملف على [[HttpURLConnection]] و OkHttp و WebView وأي مكتبة بتستخدم TLS العادي بتاع أندرويد.`,
          when: R`في كل تطبيق بيكلّم الشبكة. خلّي الـ release صارم ([[cleartextTrafficPermitted="false"]] و [[system]] بس)، وحط الاستثناءات اللي محتاجها للتطوير في ملف الـ debug. ولو محتاج pinning، بيتحط في نفس الملف (الدرس اللي بعده).`,
          mistakes: R`إنك تحط [[cleartextTrafficPermitted="true"]] في [[base-config]] عشان سيرفر التطوير ويتنشر كده. وإنك تضيف [[certificates src="user"]] في الـ release عشان أداة تجربة. وإنك تكتب الملف ومتشاورش عليه من المانيفست (مش هيتطبق). وإنك تفتكر إن الملف بيحمي من صاحب الجهاز: هو بيحمي المستخدم من الشبكة، لكن اللي متحكم في الموبايل بالكامل (root) يقدر يعدّل التطبيق نفسه.`
        },
        teach: R`## الملف بيتحط فين؟

~~~text
app/src/main/res/xml/network_security_config.xml    <-- الـ release (والـ debug لو مفيش غيره)
app/src/debug/res/xml/network_security_config.xml   <-- نسخة الـ debug بس (بتغطي على اللي فوق)
~~~

وفي المانيفست:

~~~xml
<application
    android:networkSecurityConfig="@xml/network_security_config"
    ...>
~~~

[[@xml/network_security_config]] = المورد اللي اسمه كده في فولدر [[res/xml]]، من غير [[.xml]].

### اتجرّب فين؟

بنيت العيّنة بالملف ده في container أوبونتو 24.04 ([[aapt2]] من build-tools 37) وقريته من الـ APK. سلوك أندرويد وقت التشغيل (إيه اللي بيترفض) من الـ docs الرسمية، لأن مفيش محاكي هنا.

---

## ١. الملف سطر سطر

| السطر | معناه |
|---|---|
| [[<?xml version="1.0" encoding="utf-8"?>]] | أول سطر في أي ملف XML |
| [[<network-security-config>]] | العنصر الأساسي، وكل حاجة جواه |
| [[<base-config cleartextTrafficPermitted="false">]] | القاعدة العامة لكل الدومينات: HTTP العادي ممنوع |
| [[<trust-anchors>]] | «جذور الثقة»: الجهات اللي هنصدّق الشهادات اللي هي موقّعاها |
| [[<certificates src="system" />]] | شهادات النظام بس (اللي جاية مع أندرويد)، مش [[user]] |
| آخر ٣ سطور | قفل العناصر |

ده بالظبط الافتراضي لتطبيق targetSdk 28 أو أكتر. كتابته صريح بتخلي أي تغيير بعدين يبان في الـ code review.

### الافتراضي حسب الـ targetSdk (من الـ docs)

| targetSdk | cleartext | شهادات المستخدم |
|---|---|---|
| 23 أو أقل | مسموح | بيثق فيها |
| 24 لـ 27 | مسموح | مش بيثق |
| 28 أو أكتر | ممنوع | مش بيثق |

---

## ٢. نقرا الملف من الـ APK

~~~bash
aapt2 dump xmltree --file res/xml/network_security_config.xml nsc.apk
~~~

~~~text الناتج
E: network-security-config (line=2)
    E: base-config (line=3)
      A: cleartextTrafficPermitted=false
        E: trust-anchors (line=4)
            E: certificates (line=5)
              A: src="system" (Raw: "system")
~~~

[[E:]] = element، و [[A:]] = attribute. والمانيفست بيشاور عليه برقم مورد:

~~~text الناتج (aapt2 dump xmltree --file AndroidManifest.xml)
A: http://schemas.android.com/apk/res/android:networkSecurityConfig(0x01010527)=@0x7f020000
~~~

[[0x7f020000]] = رقم المورد [[xml/network_security_config]] في جدول الموارد. يعني أي حد فاكك تطبيقك بيشوف الإعدادات دي، وده عادي: هي مش أسرار.

---

## ٣. نسخة الـ debug

السيرفر المحلي بتاعك غالبًا HTTP. من المحاكي، جهازك اسمه [[10.0.2.2]]. فبنفتح الاستثناء ده في الـ debug بس:

~~~xml
<network-security-config>
    <base-config cleartextTrafficPermitted="false" />
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="false">10.0.2.2</domain>
        <domain includeSubdomains="false">localhost</domain>
    </domain-config>
    <debug-overrides>
        <trust-anchors>
            <certificates src="user" />
        </trust-anchors>
    </debug-overrides>
</network-security-config>
~~~

- [[domain-config]] = قواعد لدومينات بعينها بتغطي على [[base-config]].
- [[includeSubdomains="false"]] = الدومين ده بالظبط، مش أي حاجة تحته.
- [[debug-overrides]] = بيشتغل بس لو التطبيق [[debuggable]]. هنا بيسمح بشهادات المستخدم، عشان لو بتراقب traffic تطبيقك إنت بأداة proxy على جهازك. والـ docs بتقول إن ده أأمن من كود بـ if، لأن المتاجر مش بتقبل تطبيق [[debuggable]] أصلًا.

بنيت النسخة دي وقريتها بـ [[aapt2]] واتأكدت إن الاستثناء موجود فيها، وإن نسخة الـ release ملهاش غير [[base-config]].

---

## ٤. Certificate Transparency (جديد)

من الـ docs: أندرويد ١٦ (API 36) فيه عنصر [[<certificateTransparency enabled="true"/>]] تشغّله بإيدك، ومن أندرويد ١٧ (API 37) بقى شغّال افتراضيًا. بيتأكد إن شهادة السيرفر متسجّلة في سجلات CT العامة، فشهادة اتعملت غلط من CA مش بتعدّي بسهولة. ومش بيشتغل مع الشهادات اللي إنت حاططها كـ trust anchors بنفسك.

## الخلاصة

| عايز | اكتب |
|---|---|
| تمنع HTTP | [[base-config cleartextTrafficPermitted="false"]] |
| تثق في النظام بس | [[trust-anchors]] فيه [[certificates src="system"]] |
| HTTP لسيرفرك المحلي | [[domain-config]] لـ [[10.0.2.2]] في [[src/debug]] بس |
| أداة proxy على تطبيقك | [[debug-overrides]] |`,
        lines: [
          R`أول سطر في ملف XML: الإصدار والـ encoding.`,
          R`العنصر الأساسي اللي فيه كل الإعدادات.`,
          R`القاعدة لكل الاتصالات: HTTP من غير تشفير ممنوع.`,
          R`بداية قايمة الجهات اللي التطبيق يثق في شهاداتها.`,
          R`شهادات النظام بس، من غير الشهادات اللي المستخدم ضافها.`,
          R`قفل قايمة الثقة.`,
          R`قفل القاعدة العامة.`,
          R`قفل الملف.`
        ],
        sol: R`اتبنى في container أوبونتو 24.04 ([[aapt2]] من build-tools 37) وده الناتج من الـ APK:

~~~text الناتج
E: network-security-config (line=2)
    E: base-config (line=3)
      A: cleartextTrafficPermitted=false
        E: trust-anchors (line=4)
            E: certificates (line=5)
              A: src="system" (Raw: "system")
~~~

ونسخة الـ debug فيها زيادة [[domain-config]] بـ [[cleartextTrafficPermitted=true]] لـ [[10.0.2.2]] و [[localhost]]، و [[debug-overrides]] بـ [[src="user"]]. السلوك وقت التشغيل (طلب [[http://]] لدومين تاني بيترفض بـ exception) من الـ docs، مش متجرّب على جهاز هنا.`
      },
      {
        cmd: "cert_pinning",
        title: R`Certificate pinning: احسب الـ pin، وحط backup، وافهم الخطر`,
        desc: R`عادي التطبيق بيصدّق أي شهادة موقّعة من أي CA من مئات الـ CAs اللي في النظام. الـ **pinning** معناه إنك تقول للتطبيق: لـ [[api.myapp.test]] صدّق بس الشهادة اللي مفتاحها العام بصمته كذا. لو CA اتخترقت أو حد عمل شهادة مزيّفة لدومينك، التطبيق يرفض.

الـ pin هو SHA-256 للمفتاح العام (SPKI) متحوّل base64، وبتحسبه بـ [[openssl]]. ولازم يكون معاه **backup pin** لمفتاح تاني جاهز عندك، وإلا لو غيّرت مفتاح السيرفر التطبيق كله يقف لحد ما المستخدمين يحدّثوا. الـ pinning بيحمي المستخدم من الشبكة، مش بيحمي الـ API بتاعك من صاحب الموبايل.`,
        example: R`# Linux (and WSL):
openssl x509 -in api.crt -pubkey -noout | openssl pkey -pubin -outform der | openssl dgst -sha256 -binary | openssl enc -base64
openssl genpkey -algorithm EC -pkeyopt ec_paramgen_curve:P-256 -out backup.key
openssl pkey -in backup.key -pubout -outform der | openssl dgst -sha256 -binary | openssl enc -base64
openssl s_client -connect localhost:8443 -servername api.myapp.test </dev/null 2>/dev/null | openssl x509 -pubkey -noout | openssl pkey -pubin -outform der | openssl dgst -sha256 -binary | openssl enc -base64
# Windows (PowerShell 7.4 or newer, openssl from Git for Windows):
$env:Path = "C:\Program Files\Git\usr\bin;" + $env:Path
openssl x509 -in api.crt -pubkey -noout | openssl pkey -pubin -outform der | openssl dgst -sha256 -binary | openssl enc -base64`,
        try: R`اعمل لنفسك شهادة تجربة بـ [[openssl req -x509]] ومفتاح backup، واحسب الـ pin للاتنين. بعدين جدّد الشهادة **بنفس المفتاح** ([[openssl req -x509 -key api.key -new ...]]) واحسب تاني: لازم الـ pin ميتغيّرش. وبعدين اعمل شهادة بمفتاح جديد: الـ pin اتغيّر، وده اللي بيقفل التطبيق لو مفيش backup.`,
        deep: {
          why: R`الـ HTTPS العادي بيعتمد إن كل الـ CAs اللي في النظام محترمة. لو واحدة منهم غلطت أو اتخترقت، أو جهاز في شبكة شركة أو بلد بيعمل اعتراض بشهادة مقبولة، الاتصال يبان سليم. الـ pinning بيقفل ده لدومينك. بس في المقابل بيربط التطبيق المنشور بمفتاح السيرفر، فأي غلطة في تغيير المفاتيح بتقطع كل المستخدمين.`,
          how: R`الشهادة بتتغيّر كل كام شهر، لكن المفتاح العام ممكن يفضل هو هو مع التجديد. عشان كده بنثبّت بصمة المفتاح العام (SPKI = SubjectPublicKeyInfo، المفتاح ونوعه) مش الشهادة كلها. في [[network_security_config.xml]] بتحط [[pin-set]] جوه [[domain-config]] فيه [[pin digest="SHA-256"]] لكل مفتاح، والتطبيق بيقبل الاتصال لو أي مفتاح في سلسلة الشهادات (السيرفر أو الـ intermediate أو الـ root) بصمته في القايمة. و [[expiration]] = تاريخ بعده الـ pinning يتلغي، عشان النسخ القديمة اللي محدش حدّثها متقفش للأبد. وفي OkHttp فيه [[CertificatePinner]] بنفس الفكرة بصيغة [[sha256/...]].`,
          when: R`لما يكون عندك تهديد حقيقي من اعتراض الشبكة (تطبيقات بنوك ومحافظ وصحة)، ولما الفريق عنده عملية واضحة لتغيير المفاتيح: backup key محفوظ offline، وتنزيل نسخة بالـ pin الجديد **قبل** ما تغيّر مفتاح السيرفر بفترة. لو مفيش عملية زي دي، الـ pinning ممكن يضر أكتر ما ينفع، و Certificate Transparency (الدرس اللي قبله) بيدي جزء من الحماية من غير الخطر ده.`,
          mistakes: R`pin واحد من غير backup. وإنك تثبّت مفتاح شهادة بيتغيّر مع كل تجديد (زي بعض إعدادات Let's Encrypt اللي بتعمل مفتاح جديد كل مرة). وإنك تحسب البصمة على الشهادة كلها بدل المفتاح العام. وإنك تنسى [[expiration]] أو تحطه بعيد جدًا. وإنك تفتكر إن الـ pinning بيمنع حد يدرس الـ API بتاعك: صاحب الجهاز الـ rooted يقدر يعدّل أي فحص جوه التطبيق، فالـ API لازم يتحمي على السيرفر (درس الكلاينت).`
        },
        teach: R`## الـ pin = بصمة المفتاح العام

~~~text
api.crt (الشهادة)
  └── المفتاح العام (SPKI)  --DER-->  91 byte  --SHA-256-->  32 byte  --base64-->  U6NvWMfE...TtEKI=
~~~

### اتجرّب فين؟

كله على شهادة تجربة عملتها لنفسي لدومين وهمي [[api.myapp.test]]، في container أوبونتو 24.04 (OpenSSL 3.0.13). وعلى ويندوز بـ [[openssl]] 3.5.9 اللي جاي مع Git for Windows في PowerShell 7.6 و Windows PowerShell 5.1. الشهادة والمفتاح اتعملوا كده:

~~~bash
openssl req -x509 -newkey ec -pkeyopt ec_paramgen_curve:P-256 -nodes -keyout api.key -out api.crt -days 90 -subj /CN=api.myapp.test
~~~

[[req -x509]] = اعمل شهادة self-signed، و [[-newkey ec]] بمفتاح EC جديد على منحنى [[P-256]]، و [[-nodes]] = متشفّرش المفتاح بباسورد (تجربة بس)، و [[-subj /CN=...]] = اسم الدومين.

---

## ١. الـ pin من ملف الشهادة

~~~bash
openssl x509 -in api.crt -pubkey -noout | openssl pkey -pubin -outform der | openssl dgst -sha256 -binary | openssl enc -base64
~~~

٤ أوامر في pipe، بالترتيب:

### [[openssl x509 -in api.crt -pubkey -noout]]

[[x509]] = أداة الشهادات. [[-pubkey]] = اطبع المفتاح العام، و [[-noout]] = متطبعش الشهادة نفسها.

~~~text الناتج
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAENrWxFLmB3kdZM7AKthTjSaNEJipg
2TJtbM2PhV2JhI55oeiJeBh9eRlrBRE9P+hjzBBkvxmJDorruZC0fQng6A==
-----END PUBLIC KEY-----
~~~

ده الـ SPKI بصيغة PEM (base64 بين سطرين).

### [[openssl pkey -pubin -outform der]]

[[pkey]] = أداة المفاتيح، [[-pubin]] = الداخل مفتاح عام، و [[-outform der]] = طلّعه binary (DER) مش PEM. الحجم: **91 byte** (عدّيته بـ [[wc -c]]): نوع المفتاح والمنحنى + نقطة الـ P-256 (65 byte).

### [[openssl dgst -sha256 -binary]]

البصمة SHA-256: دايمًا 32 byte مهما كان حجم الداخل. [[-binary]] = طلّعها bytes مش hex.

### [[openssl enc -base64]]

حوّل الـ 32 byte لنص: 44 حرف بينتهوا بـ [[=]].

~~~text الناتج
U6NvWMfENHSLltziGO9rr5PLsDjJus+wiLdh50TtEKI=
~~~

---

## ٢. الـ backup pin

~~~bash
openssl genpkey -algorithm EC -pkeyopt ec_paramgen_curve:P-256 -out backup.key
openssl pkey -in backup.key -pubout -outform der | openssl dgst -sha256 -binary | openssl enc -base64
~~~

- [[genpkey]] = اعمل مفتاح خاص جديد، وهنا مفيش شهادة لسه: المفتاح ده بيتحفظ offline لحد ما تحتاجه.
- [[-pubout]] = من المفتاح الخاص طلّع العام.

~~~text الناتج
6GoLcWPzvobHpZfo+PxzSvpeGWMJ+iQ2PNR8ecihJkE=
~~~

---

## ٣. الـ pin من السيرفر وهو شغّال

عشان تتأكد إن السيرفر الحقيقي بيقدّم المفتاح اللي إنت فاكره. هنا السيرفر [[openssl s_server]] على جهازي بنفس الشهادة:

~~~bash
openssl s_server -accept 8443 -cert api.crt -key api.key -quiet &
openssl s_client -connect localhost:8443 -servername api.myapp.test </dev/null 2>/dev/null | openssl x509 -pubkey -noout | openssl pkey -pubin -outform der | openssl dgst -sha256 -binary | openssl enc -base64
~~~

- [[s_client -connect host:port]] = اتصل TLS، و [[-servername]] = الدومين اللي بنطلبه (SNI).
- [[</dev/null]] = مدخل فاضي عشان يقفل الاتصال على طول، و [[2>/dev/null]] = اخفي رسايل التشخيص.
- وبعدها نفس السلسلة. في الحقيقة هتكتب دومين الـ API بتاعك وبورت 443.

~~~text الناتج
U6NvWMfENHSLltziGO9rr5PLsDjJus+wiLdh50TtEKI=
~~~

نفس اللي حسبناه من الملف.

### التجديد بنفس المفتاح

~~~bash
openssl req -x509 -key api.key -new -days 365 -subj /CN=api.myapp.test -out api-renewed.crt
~~~

الـ pin للشهادة الجديدة طلع **نفس** [[U6NvWMfE...TtEKI=]]: الشهادة اتغيّرت والمفتاح لأ. عشان كده بنثبّت المفتاح.

---

## ٤. نحطهم في الـ config

~~~xml
<domain-config>
    <domain includeSubdomains="true">api.myapp.test</domain>
    <pin-set expiration="2027-06-30">
        <pin digest="SHA-256">U6NvWMfENHSLltziGO9rr5PLsDjJus+wiLdh50TtEKI=</pin>
        <pin digest="SHA-256">6GoLcWPzvobHpZfo+PxzSvpeGWMJ+iQ2PNR8ecihJkE=</pin>
    </pin-set>
</domain-config>
~~~

- [[expiration="2027-06-30"]] = بعد التاريخ ده الـ pinning بيتلغي للنسخة دي. الـ docs بتنبّه إن ده بيقلل خطر قفل التطبيق، بس بيدّي فرصة لتخطّي الـ pin بعد التاريخ، فخليه قريب وجدّده مع كل release.
- بنيت التطبيق بالملف ده وفكيته بـ [[jadx]]: الـ pins ظاهرة زي ما هي. عادي، دي بصمات مفاتيح **عامة** مش أسرار.

---

## ٥. على ويندوز

[[openssl]] مش جاي مع ويندوز، بس موجود مع Git for Windows في [[C:\Program Files\Git\usr\bin]]، فبنضيفه للـ [[$env:Path]] في الجلسة دي بس.

| الشيل | الناتج |
|---|---|
| PowerShell 7.6 | [[U6NvWMfE...TtEKI=]] صح |
| Windows PowerShell 5.1 | [[77u/GD9aPyU/...]] **غلط** |
| 5.1 بـ [[cmd /c '... | ... | ...']] | صح |

ليه؟ PowerShell 5.1 بيحوّل اللي معدّي في الـ pipe بين برنامجين لنص (وبيضيف BOM)، فالـ bytes بتبوظ قبل الـ SHA-256. من PowerShell 7.4 الـ bytes بتعدّي زي ما هي. في 5.1 شغّل السلسلة كلها جوه [[cmd /c]] أو Git Bash.

---

## ٦. الخطر اللي لازم تفهمه

| السيناريو | اللي بيحصل |
|---|---|
| غيّرت مفتاح السيرفر والمفتاح الجديد هو الـ backup | التطبيق شغّال، وتنزّل نسخة فيها backup جديد |
| غيّرت المفتاح لمفتاح مش في القايمة | كل النسخ المنشورة تقف عن الاتصال لحد ما المستخدم يحدّث |
| مستخدم على موبايل rooted بيدرس تطبيقك | يقدر يعدّل التطبيق ويتخطّى أي فحص في الكلاينت، الـ pinning مش حماية للـ API منه |

## الخلاصة

- الـ pin = base64 لـ SHA-256 المفتاح العام، مش الشهادة.
- دايمًا pin تاني لمفتاح backup محفوظ offline، و [[expiration]] قريب.
- احسبه من السيرفر الحقيقي قبل ما تنشر.
- في PowerShell 5.1 الـ pipe بيبوّظ الـ binary: استخدم 7.4+ أو [[cmd /c]].`,
        lines: [
          R`بيطلّع المفتاح العام من الشهادة، يحوّله DER، يحسب SHA-256، ويكتبه base64: ده الـ pin.`,
          R`بيعمل مفتاح EC جديد للـ backup يتحفظ offline.`,
          R`بيحسب الـ pin بتاع مفتاح الـ backup من المفتاح الخاص.`,
          R`بيتصل بالسيرفر وهو شغّال، وياخد شهادته، ويحسب الـ pin منها عشان تتأكد إنه زي اللي في الملف.`,
          R`على ويندوز: بيضيف فولدر openssl بتاع Git for Windows للـ Path في الجلسة دي بس.`,
          R`نفس سلسلة حساب الـ pin (صح في PowerShell 7.4+ بس).`
        ],
        sol: R`اتشغّل في container أوبونتو 24.04 (OpenSSL 3.0.13) على شهادة تجربة عملتها لـ [[api.myapp.test]]، وعلى ويندوز بـ OpenSSL 3.5.9 من Git for Windows:

~~~text الناتج
pin من الشهادة       U6NvWMfENHSLltziGO9rr5PLsDjJus+wiLdh50TtEKI=
pin الـ backup        6GoLcWPzvobHpZfo+PxzSvpeGWMJ+iQ2PNR8ecihJkE=
pin من السيرفر       U6NvWMfENHSLltziGO9rr5PLsDjJus+wiLdh50TtEKI=
بعد التجديد بنفس المفتاح  U6NvWMfENHSLltziGO9rr5PLsDjJus+wiLdh50TtEKI=
~~~

والقيم بتاعتك هتبقى مختلفة لأن المفاتيح بتتعمل عشوائي. الرفض وقت التشغيل لما الـ pin ميطابقش من الـ docs، مش متجرّب على جهاز هنا.`
      }
    ]
  },
  {
    t: R`الكلاينت مش مضمون: السيرفر يحكم، والـ Keystore يحفظ`,
    l: 3,
    n: R`أي فحص في التطبيق صاحب الموبايل يقدر يغيّره، فالقرار الحقيقي على السيرفر. Play Integrity بيدّي السيرفر إشارة عن الجهاز والتطبيق، والـ Android Keystore بيحفظ المفاتيح على الجهاز من غير ما تتنسخ`,
    items: [
      {
        cmd: "client_untrusted",
        title: R`متصدّقش التطبيق: السعر والصلاحية بيتقرروا على السيرفر`,
        desc: R`أي حاجة التطبيق بيبعتها للسيرفر (سعر، [[isPremium: true]]، «أنا أدمن»، «الموبايل مش rooted») ممكن تتغيّر قبل ما توصل، لأن صاحب الموبايل متحكم في التطبيق والشبكة اللي عليه. فالسيرفر لازم يحسب السعر بنفسه، ويعرف مين دفع من قاعدة بياناته، ويعامل أي فحص في الكلاينت (زي root detection) كإشارة بس، مش قرار.

الدرس ده بيشغّل سيرفر صغير بـ Node على جهازك فيه endpoints غلط بتصدّق التطبيق و endpoints صح، ونبعت لهم نفس الطلب بـ [[curl]].`,
        example: R`# Linux (and WSL):
curl -s -H "content-type: application/json" -d '{"item":"pro-month","price":1}' localhost:8081/bad/order
curl -s -H "content-type: application/json" -d '{"item":"pro-month","price":1}' localhost:8081/good/order
curl -s -H "content-type: application/json" -H "x-user: user-42" -d '{"isPremium":true}' localhost:8081/bad/premium
curl -s -H "content-type: application/json" -H "x-user: user-42" -d '{"isPremium":true}' localhost:8081/good/premium
# Windows (PowerShell):
Invoke-RestMethod -Method Post -Uri http://localhost:8081/bad/order -ContentType application/json -Body '{"item":"pro-month","price":1}'
Invoke-RestMethod -Method Post -Uri http://localhost:8081/good/order -ContentType application/json -Body '{"item":"pro-month","price":1}'`,
        try: R`في الـ API بتاعك دوّر على أي endpoint بياخد من التطبيق قيمة المفروض السيرفر يعرفها لوحده: سعر، خصم، كمية نقاط، دور المستخدم، «الاشتراك شغّال». ابعتله بـ [[curl]] قيمة غلط على سيرفر التطوير بتاعك. لو قبلها، انقل الحساب للسيرفر.`,
        deep: {
          why: R`لأن التطبيق على موبايل حد تاني. صاحبه يقدر يعدّل الطلبات بأداة proxy على جهازه، أو يعدّل التطبيق نفسه على موبايل rooted، أو يكتب سكريبت بيكلّم الـ API من غير التطبيق خالص. أي قرار مبني على حاجة جاية من الكلاينت هو قرار المستخدم مش قرارك.`,
          how: R`السيرفر شايل الحقيقة: جدول الأسعار، والمدفوعات (اللي جاية من webhook بوابة الدفع أو تأكيد Google Play Billing على السيرفر)، والأدوار. التطبيق يبعت **إيه اللي المستخدم عايزه** (المنتج [[pro-month]])، والسيرفر يقرر **السعر والصلاحية**. والمستخدم نفسه بيتعرف من الـ session أو الـ token الموقّع، مش من header بيبعته. وأي فحص في التطبيق (root أو emulator أو debugger) يتعامل كإشارة تزوّد الحذر، لأن نفس الشخص اللي عامل root يقدر يخلي الفحص يرجّع «سليم».`,
          when: R`في كل endpoint فيه فلوس أو صلاحيات أو بيانات مستخدم تاني. وفي مراجعة أي feature جديدة: اسأل «لو الطلب ده اتغيّر، إيه أسوأ حاجة؟». نفس فكرة Broken Access Control في تاب الأمان، بس من ناحية الموبايل.`,
          mistakes: R`إن السيرفر ياخد السعر من الطلب. وإن التطبيق يقرر إن المستخدم premium ويبعت ده. وإن الـ user id يبقى header عادي (زي الـ [[x-user]] اللي في الديمو، اللي معمول للتبسيط بس) بدل token موقّع. وإنك تعتمد على root detection كحماية: هو بيمنع المستخدم العادي اللي عامل root لأسباب تانية، ومش بيوقف حد قاصد. وإنك تتحقق من الشراء جوه التطبيق بس من غير ما السيرفر يأكده.`
        },
        teach: R`## السيرفر اللي بنجرّب عليه

ملف [[shop.js]] من غير مكتبات، فيه ٤ endpoints:

~~~js
const PRICES = { "pro-month": 99 };            // the price list lives on the server
const PAID = new Set();                        // users who really paid (filled by the payment webhook)

// BAD: trusts what the app sends
if (req.url === "/bad/order") return send(200, { charged: body.price, item: body.item });
if (req.url === "/bad/premium") return send(200, { premium: body.isPremium === true });

// GOOD: the server decides
if (req.url === "/good/order") {
  const price = PRICES[body.item];
  if (price === undefined) return send(400, { error: "unknown item" });
  return send(200, { charged: price, item: body.item });
}
if (req.url === "/good/premium") return send(200, { premium: PAID.has(user) });
~~~

- [[PRICES]] = جدول الأسعار عند السيرفر. [[PRICES[body.item]]] = هات سعر المنتج اللي اسمه جاي في الطلب.
- [[PAID]] = [[Set]] (مجموعة من غير تكرار) فيها المستخدمين اللي دفعوا فعلًا، بتتملي من الـ webhook بتاع الدفع. هنا فاضية.
- [[user]] جاي من header [[x-user]] للتبسيط بس. في الحقيقة بيتعرف من الـ token الموقّع (درس «المفتاح على السيرفر»).

### اتجرّب فين؟

Node 24 و [[curl]] 8.23 في container [[node:24-alpine]]. والـ endpoints نفسها اتجرّبت على ويندوز بـ Node 24 و [[Invoke-RestMethod]] في PowerShell 7.6.

---

## ١. الطلب بسعر متغيّر

~~~bash
curl -s -H "content-type: application/json" -d '{"item":"pro-month","price":1}' localhost:8081/bad/order
~~~

- [[-H "content-type: application/json"]] = بنقول للسيرفر إن الجسم JSON.
- [[-d '...']] = data: جسم الطلب، ووجوده بيخلي [[curl]] يبعت POST لوحده. حطيناه بين [['...']] عشان الـ [["]] اللي جواه.

~~~text الناتج
{"charged":1,"item":"pro-month"}
~~~

جنيه واحد بدل 99: السيرفر صدّق الرقم اللي في الطلب. وده مش محتاج أي فك للتطبيق: أي أداة proxy على موبايل المستخدم نفسه بتغيّر الطلب.

~~~bash
curl -s -H "content-type: application/json" -d '{"item":"pro-month","price":1}' localhost:8081/good/order
~~~

~~~text الناتج
{"charged":99,"item":"pro-month"}
~~~

نفس الطلب بالظبط، و [[price]] اتجاهل. ومنتج مش موجود:

~~~text الناتج (item = free-stuff)
{"error":"unknown item"} [400]
~~~

---

## ٢. «أنا premium»

~~~bash
curl -s -H "content-type: application/json" -H "x-user: user-42" -d '{"isPremium":true}' localhost:8081/bad/premium
curl -s -H "content-type: application/json" -H "x-user: user-42" -d '{"isPremium":true}' localhost:8081/good/premium
~~~

~~~text الناتج
{"premium":true}
{"premium":false}
~~~

الأول صدّق. التاني بص في [[PAID]]: [[user-42]] مدفعش.

---

## ٣. على ويندوز

~~~powershell
Invoke-RestMethod -Method Post -Uri http://localhost:8081/bad/order -ContentType application/json -Body '{"item":"pro-month","price":1}'
~~~

[[-ContentType]] = نفس الـ header، و [[-Body]] = الجسم. الناتج اتعرض كـ object:

~~~text الناتج
charged item
------- ----
      1 pro-month
~~~

و [[/good/order]] رجّع [[charged = 99]].

> في PowerShell 7.3 وبعده، [[curl.exe]] بـ [[-d '{\"item\"...}']] بيوصل للسيرفر بـ [[\]] فعلًا وبيبوّظ الـ JSON، فاستخدم [[Invoke-RestMethod]].

---

## ٤. وفحص الـ root؟

| الفحص في التطبيق | اللي بيعمله فعلًا |
|---|---|
| root detection (يدوّر على [[su]] أو تطبيقات معروفة) | بيوقف المستخدم العادي، والقاصد بيخلي الفحص يرجّع «سليم» |
| فحص توقيع التطبيق جوه التطبيق | نفس الحكاية: الكود اللي بيفحص جوه نفس التطبيق اللي اتعدّل |
| Play Integrity (الدرس اللي بعده) | الإجابة موقّعة من Google وبيفكها **السيرفر**، فأصعب في التزوير، ومع ده إشارة مش ضمان |

## الخلاصة

- التطبيق يقول **عايز إيه**، والسيرفر يقرر **بكام** و **مسموح ولا لأ**.
- المستخدم بيتعرف من token موقّع، مش من قيمة بيبعتها.
- أي فحص في الكلاينت إشارة، والقرار على السيرفر.`,
        lines: [
          R`بيبعت طلب شرا بسعر 1 للـ endpoint الغلط: السيرفر بيصدّقه.`,
          R`نفس الطلب للـ endpoint الصح: السيرفر بيحسب السعر من عنده (99).`,
          R`بيقول للـ endpoint الغلط «أنا premium»: بيصدّق.`,
          R`نفس الكلام للـ endpoint الصح: بيبص في قايمة اللي دفعوا فعلًا ويرجّع false.`,
          R`على ويندوز: نفس طلب السعر المتغيّر بـ Invoke-RestMethod.`,
          R`ونفس الطلب للـ endpoint الصح.`
        ],
        sol: R`اتشغّل بـ Node 24.22 و [[curl]] 8.23 في container [[node:24-alpine]]، وجزء ويندوز في PowerShell 7.6:

~~~text الناتج
## bad order
{"charged":1,"item":"pro-month"}
## bad premium
{"premium":true}
## good order
{"charged":99,"item":"pro-month"}
## good premium
{"premium":false}
## unknown
{"error":"unknown item"} [400]
~~~`
      },
      {
        cmd: "play_integrity",
        title: R`Play Integrity: السيرفر يسأل Google عن الجهاز والتطبيق`,
        desc: R`Play Integrity API بيخلي التطبيق يطلب **token** من Google Play، والسيرفر بتاعك (مش التطبيق) يفكه عن طريق Google ويقرا الإجابة: التطبيق ده هو اللي إنت نشرته على Play؟ الجهاز أصلي ومش متعدّل؟ المستخدم نزّله من Play؟ وكمان الـ token مربوط بالطلب نفسه عن طريق [[requestHash]]، فمينفعش يتاخد من عملية ويتستخدم في عملية تانية.

الدرس ده من الـ docs الرسمية (محتاج حساب Play Console و Google Cloud)، والجزء اللي بيتشغّل هنا هو منطق السيرفر اللي بيقرا الإجابة، على payload بنفس الشكل اللي في الـ docs.`,
        example: R`// server side: decide from the decoded verdict
function checkVerdict(p, action, now = Date.now()) {
  const problems = [];
  const d = p.requestDetails || {};
  if (d.requestPackageName !== "com.example.myapp") problems.push("wrong package");
  if (d.requestHash !== requestHash(action)) problems.push("hash mismatch (token is for another request)");
  if (now - Number(d.timestampMillis) > 60_000) problems.push("token too old");
  if (p.appIntegrity?.appRecognitionVerdict !== "PLAY_RECOGNIZED") problems.push("app not recognized by Play");
  if (!(p.deviceIntegrity?.deviceRecognitionVerdict || []).includes("MEETS_DEVICE_INTEGRITY")) problems.push("device integrity not met");
  if (p.accountDetails?.appLicensingVerdict !== "LICENSED") problems.push("not licensed");
  return problems.length ? { allow: false, problems } : { allow: true };
}`,
        try: R`اكتب الدالة دي (ومعاها [[requestHash]]) في ملف Node وجرّبها على ٣ payloads بإيدك: واحد سليم، وواحد [[deviceRecognitionVerdict]] فيه فاضي، وواحد [[requestHash]] بتاعه لعملية تانية. بعدين قرر لكل feature في تطبيقك: لو الإجابة سيئة، ترفض؟ ولا تطلب تأكيد زيادة؟ ولا تكمّل وتسجّل بس؟`,
        flag: "script",
        deep: {
          why: R`لأن الفحوصات اللي جوه التطبيق بتتعدّل (الدرس اللي قبله). هنا الإجابة موقّعة ومشفّرة من Google، والتطبيق مش بيقدر يقراها ولا يعدّلها، والسيرفر هو اللي بيفكها. ده بيصعّب جدًا إن سكريبت أو نسخة متعدّلة من تطبيقك أو جهاز متعدّل يعدّوا من غير ما تحس، في العمليات المهمة زي الدفع وتسجيل الحسابات واستخدام الكوبونات.`,
          how: R`من الـ docs: في التطبيق [[IntegrityManagerFactory.createStandard(context)]] وبعدها [[prepareIntegrityToken]] برقم مشروع Google Cloud (مرة كل فترة، ومش أكتر من ٥ مرات في الدقيقة)، وبعدين لكل عملية مهمة [[request(StandardIntegrityTokenRequest.builder().setRequestHash(hash).build())]]. التطبيق يبعت الـ token لسيرفرك مع الطلب. السيرفر يبعته لـ [[playintegrity.googleapis.com/v1/PACKAGE_NAME:decodeIntegrityToken]] بحساب service account، ويرجعله JSON فيه [[requestDetails]] و [[appIntegrity]] و [[deviceIntegrity]] و [[accountDetails]]. السيرفر يحسب الـ hash بنفسه من الطلب ويقارن، وبعدين يقرر.`,
          when: R`في العمليات اللي فيها فلوس أو إساءة استخدام: الشرا، والكوبونات، وإنشاء حسابات كتير، والمسابقات، والـ API اللي بتتسرق من سكريبتات. مش في كل طلب (فيه حدود وتكلفة وقت)، ومش كبديل عن الـ authentication والفحوصات العادية على السيرفر.`,
          mistakes: R`إنك تفك الـ token جوه التطبيق أو تثق في التطبيق لما يقول «الـ verdict سليم». وإنك متقارنش [[requestHash]] و [[requestPackageName]] و [[timestampMillis]] (فالـ token يتعاد استخدامه). وإنك تحط بيانات حساسة في الـ requestHash كنص بدل hash. وإنك تقفل أي جهاز مش [[MEETS_DEVICE_INTEGRITY]] من غير تفكير: فيه مستخدمين حقيقيين على أجهزة قديمة أو ROMs، فقرر حسب خطورة العملية. وإنك تعتبره ضمان: هو إشارة قوية بس.`
        },
        teach: R`## الرحلة

~~~text
التطبيق                         سيرفرك                              Google
  |  requestHash = sha256(الطلب)
  |  request(requestHash) ------------------------------------->  Play Integrity
  |  <------------------------------------------- token (مشفّر)
  |  الطلب + الـ token ------->  decodeIntegrityToken(token) ---->  playintegrity.googleapis.com
  |                              <----------------------------  JSON (الـ verdict)
  |                              checkVerdict(...)  -> اقبل / ارفض
  |  <------------- النتيجة
~~~

### اتجرّب فين؟

الجزء بتاع التطبيق و Google من الـ docs الرسمية (محتاج حساب Play Console ومشروع Google Cloud، ومش متجرّب هنا). الدالة [[checkVerdict]] اتشغّلت بـ Node 24 في container [[node:24-alpine]] على payloads عملتها بإيدي بنفس شكل الـ docs.

---

## ١. في التطبيق (من الـ docs)

~~~java
StandardIntegrityManager standardIntegrityManager =
    IntegrityManagerFactory.createStandard(applicationContext);

standardIntegrityManager.prepareIntegrityToken(
    PrepareIntegrityTokenRequest.builder()
        .setCloudProjectNumber(cloudProjectNumber)
        .build())
    .addOnSuccessListener(tokenProvider -> { integrityTokenProvider = tokenProvider; });

integrityTokenProvider.request(
    StandardIntegrityTokenRequest.builder()
        .setRequestHash(requestHash)
        .build())
    .addOnSuccessListener(response -> sendToServer(response.token()));
~~~

- [[prepareIntegrityToken]] = تجهيز (warm-up) بياخد ثواني، تعمله مرة وتحتفظ بالـ provider. الـ docs: مش أكتر من ٥ مرات في الدقيقة لكل نسخة من التطبيق.
- [[setRequestHash]] = hash للطلب اللي هتبعته (مثلًا SHA-256 لـ JSON العملية). أقصى طول ٥٠٠ byte، ومتحطش فيه بيانات كنص.
- [[response.token()]] = الـ token مشفّر: التطبيق مش بيفهمه، بيبعته وخلاص.

## ٢. على السيرفر: الفك

السيرفر بياخد access token من service account بصلاحية [[playintegrity]]، ويبعت:

~~~text POST https://playintegrity.googleapis.com/v1/com.example.myapp:decodeIntegrityToken
{ "integrity_token": "<الـ token اللي جه من التطبيق>" }
~~~

والرد JSON (الحقول الأساسية من الـ docs):

| الحقل | القيم | معناها |
|---|---|---|
| [[requestDetails.requestPackageName]] | [[com.example.myapp]] | الـ token اتطلب لأنهي تطبيق |
| [[requestDetails.requestHash]] | نفس اللي التطبيق حطه | لازم يطابق الـ hash اللي السيرفر يحسبه |
| [[requestDetails.timestampMillis]] | وقت الطلب | عشان ترفض القديم |
| [[appIntegrity.appRecognitionVerdict]] | [[PLAY_RECOGNIZED]] / [[UNRECOGNIZED_VERSION]] / [[UNEVALUATED]] | التطبيق وتوقيعه زي اللي على Play؟ |
| [[deviceIntegrity.deviceRecognitionVerdict]] | قايمة فيها [[MEETS_DEVICE_INTEGRITY]] أو فاضية | جهاز أندرويد أصلي معتمد؟ ومن أندرويد ١٣ فيه إثبات hardware إن الـ bootloader مقفول. الفاضية = علامات root أو hooking أو مش جهاز حقيقي |
| [[accountDetails.appLicensingVerdict]] | [[LICENSED]] / [[UNLICENSED]] / [[UNEVALUATED]] | المستخدم نزّل التطبيق من Play؟ |

وفيه labels اختيارية: [[MEETS_STRONG_INTEGRITY]] (من أندرويد ١٣: جهاز معتمد + تحديث أمني في آخر سنة) و [[MEETS_BASIC_INTEGRITY]] (فحوصات أساسية بس)، و [[environmentDetails]] (تطبيقات ممكن تشوف الشاشة أو تتحكم فيها، وحالة Play Protect) لو فعّلتها من Play Console.

---

## ٣. القرار: [[checkVerdict]] سطر سطر

- [[p]] = الـ payload بعد الفك، و [[action]] = الطلب اللي التطبيق بعته، و [[now]] = الوقت (parameter عشان نجرّب بسهولة).
- [[problems]] = قايمة بكل سبب رفض، أحسن من [[false]] لوحده عشان اللوج.
- [[p.requestDetails || {}]] = لو الحقل مش موجود خد object فاضي بدل ما الكود يقع.
- [[requestHash(action)]] = السيرفر بيحسب الـ hash **بنفسه** من الطلب اللي وصله:

~~~js
function requestHash(action) {
  return crypto.createHash("sha256").update(JSON.stringify(action)).digest("hex");
}
~~~

لو الـ token جاي من عملية تانية، الـ hash مش هيطابق.
- [[60_000]] = ٦٠ ألف ملّي ثانية = دقيقة ([[_]] فاصل للقراية بس).
- [[?.]] = optional chaining: لو اللي قبلها مش موجود رجّع [[undefined]] بدل error.
- [[.includes("MEETS_DEVICE_INTEGRITY")]] = القايمة فيها الـ label ده؟

### ٣ تجارب

~~~js
const action = { op: "redeem", coupon: "WELCOME10", user: "user-42" };
console.log("genuine :", checkVerdict(good, action, now));
console.log("modified:", checkVerdict(rooted, action, now));
console.log("replayed:", checkVerdict(reused, { ...action, coupon: "VIP100" }, now));
~~~

- [[good]] = payload كل حاجة فيه سليمة.
- [[rooted]] = [[deviceIntegrity]] فاضي و [[UNRECOGNIZED_VERSION]] (شكل جهاز متعدّل عليه نسخة متعدّلة).
- [[reused]] = نفس الـ token السليم، بس اتبعت مع طلب كوبون تاني [[VIP100]]. ([[{ ...action, coupon }]] = نسخة من [[action]] بكوبون مختلف.)

~~~text الناتج
genuine : { allow: true }
modified: {
  allow: false,
  problems: [ 'app not recognized by Play', 'device integrity not met' ]
}
replayed: {
  allow: false,
  problems: [ 'hash mismatch (token is for another request)' ]
}
~~~

التالتة هي الأهم: الـ token سليم ١٠٠٪ بس مش للطلب ده.

---

## ٤. اعمل إيه لو الإجابة سيئة؟

| الخطورة | مثال | رد فعل معقول |
|---|---|---|
| عالية | سحب فلوس، كوبون غالي | ارفض، أو اطلب تأكيد زيادة (OTP) |
| متوسطة | إنشاء حساب | كمّل بحدود أقل وراقب |
| قليلة | فتح محتوى مجاني | كمّل وسجّل بس |

## الخلاصة

- التطبيق بيطلب الـ token، و**السيرفر** بس اللي بيفكه ويقرر.
- قارن [[requestHash]] والـ package والوقت قبل أي verdict.
- النتيجة إشارة قوية مش ضمان، وقرر حسب خطورة العملية.`,
        lines: [
          R`دالة على السيرفر بتاخد الـ payload المفكوك والطلب والوقت.`,
          R`قايمة فاضية نجمّع فيها أسباب الرفض.`,
          R`بياخد requestDetails، ولو مش موجود object فاضي.`,
          R`الـ token لازم يكون متطلب لتطبيقنا إحنا.`,
          R`الـ hash اللي في الـ token لازم يطابق hash الطلب اللي وصل فعلًا.`,
          R`الـ token لازم يكون اتطلب في آخر دقيقة.`,
          R`التطبيق لازم يكون هو النسخة اللي Play يعرفها.`,
          R`الجهاز لازم يكون عليه MEETS_DEVICE_INTEGRITY.`,
          R`المستخدم لازم يكون نزّل التطبيق من Play.`,
          R`لو فيه أي مشكلة: ارفض ورجّع الأسباب، غير كده اقبل.`,
          R`قفلة الدالة.`
        ],
        sol: R`[[checkVerdict]] اتشغّلت بـ Node 24.22 في container [[node:24-alpine]] على ٣ payloads بشكل الـ docs:

~~~text الناتج
genuine : { allow: true }
modified: {
  allow: false,
  problems: [ 'app not recognized by Play', 'device integrity not met' ]
}
replayed: {
  allow: false,
  problems: [ 'hash mismatch (token is for another request)' ]
}
~~~

الكود بتاع التطبيق وطلب الفك من Google من الـ docs الرسمية لـ Play Integrity (standard requests)، ومتجرّبوش هنا لأنهم محتاجين حساب Play Console ومشروع Google Cloud.`
      },
      {
        cmd: "keystore_secrets",
        title: R`Android Keystore: احفظ الـ token مشفّر بمفتاح مبيطلعش من الجهاز`,
        desc: R`لو تطبيقك لازم يحفظ حاجة حساسة على الموبايل (refresh token مثلًا)، متحطهاش نص عادي في [[SharedPreferences]] أو DataStore. اعمل مفتاح AES في **Android Keystore**: المفتاح بيتعمل جوه النظام (وغالبًا جوه hardware آمن)، ومينفعش يتنسخ بره، وانت بتطلب منه يشفّر ويفك بس. وبعدين خزّن الناتج المشفّر في أي مكان.

ومكتبة [[androidx.security:security-crypto]] ([[EncryptedSharedPreferences]] و [[MasterKey]]) بقت deprecated: الـ docs بتاعتها بتقول «Deprecated all APIs in favour of existing platform APIs and direct use of Android Keystore» من 1.1.0-alpha07 (أبريل ٢٠٢٥)، والنسخة المستقرة 1.1.0 (يوليو ٢٠٢٥) نزلت كده. فالطريقة الحالية هي الـ Keystore مباشرة، زي الكود ده.`,
        example: R`public class TokenVault {
    private static final String ALIAS = "myapp_token_key";

    private SecretKey key() throws Exception {
        KeyStore ks = KeyStore.getInstance("AndroidKeyStore");
        ks.load(null);
        if (ks.containsAlias(ALIAS)) {
            return ((KeyStore.SecretKeyEntry) ks.getEntry(ALIAS, null)).getSecretKey();
        }
        KeyGenerator gen = KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES, "AndroidKeyStore");
        gen.init(new KeyGenParameterSpec.Builder(ALIAS,
                KeyProperties.PURPOSE_ENCRYPT | KeyProperties.PURPOSE_DECRYPT)
                .setBlockModes(KeyProperties.BLOCK_MODE_GCM)
                .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
                .setKeySize(256)
                .build());
        return gen.generateKey();
    }

    public byte[][] encrypt(String token) throws Exception {
        Cipher c = Cipher.getInstance("AES/GCM/NoPadding");
        c.init(Cipher.ENCRYPT_MODE, key());
        byte[] ct = c.doFinal(token.getBytes(StandardCharsets.UTF_8));
        return new byte[][] { c.getIV(), ct };
    }

    public String decrypt(byte[] iv, byte[] ct) throws Exception {
        Cipher c = Cipher.getInstance("AES/GCM/NoPadding");
        c.init(Cipher.DECRYPT_MODE, key(), new GCMParameterSpec(128, iv));
        return new String(c.doFinal(ct), StandardCharsets.UTF_8);
    }
}`,
        try: R`ضيف [[TokenVault]] لتطبيقك، شفّر token تجريبي ([[FAKE-refresh-token]])، وخزّن الـ IV والـ ciphertext في DataStore كـ Base64. اقفل التطبيق وافتحه وفك. بعدين غيّر byte واحد في الـ ciphertext المتخزّن وجرّب تفك: لازم يرمي [[AEADBadTagException]]. ولو عندك تطبيق بيستخدم [[EncryptedSharedPreferences]]، اكتب خطة نقل: اقرا القيم القديمة مرة، وشفّرها بالطريقة دي، وامسح القديم.`,
        flag: "script",
        deep: {
          why: R`أي حاجة متخزّنة نص عادي في ملفات التطبيق بتتقري لو الموبايل rooted، أو التطبيق كان [[debuggable]]، أو الملف دخل في backup. ولو شفّرتها بمفتاح مكتوب في الكود، المفتاح في الـ APK (أول درس). الـ Keystore بيحل ده: المفتاح نفسه مش في ملفاتك ومش في الكود، ولو الجهاز فيه TEE أو StrongBox المفتاح مبيخرجش منه حتى للنظام.`,
          how: R`[[KeyStore.getInstance("AndroidKeyStore")]] = الـ provider بتاع أندرويد. [[KeyGenParameterSpec]] بيوصف المفتاح: اسمه (alias)، وبيستخدم في إيه، وأنهي mode، وحجمه. المفتاح بيتعمل مرة وبيفضل بنفس الاسم لحد ما التطبيق يتمسح. التشفير AES-GCM: بيشفّر ويضيف tag (16 byte) بيكشف أي تعديل. الـ Keystore هو اللي بيختار IV عشوائي (12 byte) لكل تشفير، فلازم تخزّنه جنب الـ ciphertext. وتقدر تشدّد: [[setUserAuthenticationRequired(true)]] (المفتاح يشتغل بعد بصمة أو PIN بس) و [[setIsStrongBoxBacked(true)]] (أندرويد ٩ وبعده على الأجهزة اللي فيها StrongBox).`,
          when: R`لأي سر لازم يتخزّن على الجهاز: refresh token، مفتاح تشفير لقاعدة بيانات محلية، بيانات حساسة offline. والأحسن تقلل اللي بتخزّنه أصلًا: access token في الذاكرة بس، و refresh token واحد مشفّر.`,
          mistakes: R`إنك تحفظ الـ token نص عادي «عشان الملفات private». وإنك تعمل مفتاح AES بنفسك وتحطه في SharedPreferences جنب البيانات. وإنك تنسى تخزّن الـ IV أو تستخدم نفس الـ IV مرتين. وإنك تفتكر إن الـ Keystore بيحميك من root كامل: المفتاح مبيتنسخش، بس اللي متحكم في الجهاز يقدر يشغّل كود جوه تطبيقك ويطلب من الـ Keystore يفك. يعني هو بيمنع سرقة المفتاح ونقله لجهاز تاني، مش استخدامه على نفس الجهاز. وإنك تبدأ مشروع جديد بـ [[EncryptedSharedPreferences]] وهي deprecated.`
        },
        teach: R`## الفكرة

~~~text
 التطبيق                         Android Keystore (TEE / StrongBox لو موجود)
   | "شفّر لي ده بالمفتاح myapp_token_key"  -->  [المفتاح جوه، مبيخرجش]
   | <--  IV (12 byte) + ciphertext + tag (16 byte)
   | يخزّنهم في DataStore أو ملف
~~~

التطبيق عمره ما بيشوف المفتاح نفسه. معاه **اسم** المفتاح بس.

### اتجرّب فين؟

الكلاس اتعمله compile بـ [[javac]] (JDK 21) على [[android.jar]] بتاع API 36، واتحوّل dex بـ [[d8]] من build-tools 37، من غير أخطاء ولا تحذيرات ([[-Xlint:all]]). ده بيأكد إن كل الكلاسات والدوال موجودة بنفس الأسماء. التشغيل الفعلي محتاج جهاز أو محاكي، ومفيش هنا: السلوك من الـ docs. وجزء AES-GCM (نفس [[Cipher]] بنفس الإعدادات) اتشغّل على JVM عادي بمفتاح software عشان نشوف الأرقام.

---

## ١. [[key()]]: هات المفتاح أو اعمله

~~~java
KeyStore ks = KeyStore.getInstance("AndroidKeyStore");
ks.load(null);
~~~

- [[AndroidKeyStore]] = اسم الـ provider بتاع أندرويد. على JVM عادي مش موجود:

~~~text الناتج (على JVM)
java.security.KeyStoreException: AndroidKeyStore not found
~~~

- [[load(null)]] = مطلوب قبل أي استخدام، و [[null]] لأن مفيش ملف ولا باسورد: النظام هو اللي شايله.

~~~java
if (ks.containsAlias(ALIAS)) {
    return ((KeyStore.SecretKeyEntry) ks.getEntry(ALIAS, null)).getSecretKey();
}
~~~

لو المفتاح اتعمل قبل كده (من تشغيل فات) رجّعه. [[(KeyStore.SecretKeyEntry)]] = cast: بنقول للـ compiler إن الـ entry ده مفتاح سري. اللي بيرجع [[SecretKey]] بس هو «مقبض» (handle)، مش الـ bytes بتاعة المفتاح.

~~~java
KeyGenerator gen = KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES, "AndroidKeyStore");
gen.init(new KeyGenParameterSpec.Builder(ALIAS,
        KeyProperties.PURPOSE_ENCRYPT | KeyProperties.PURPOSE_DECRYPT)
        .setBlockModes(KeyProperties.BLOCK_MODE_GCM)
        .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
        .setKeySize(256)
        .build());
return gen.generateKey();
~~~

| الحتة | معناها |
|---|---|
| [[KeyGenerator.getInstance(AES, "AndroidKeyStore")]] | اعمل مفتاح AES **جوه** الـ Keystore |
| [[PURPOSE_ENCRYPT | PURPOSE_DECRYPT]] | المفتاح ده للتشفير والفك بس. [[|]] هنا OR على البتات: بيجمع الاتنين |
| [[BLOCK_MODE_GCM]] | الطريقة GCM: تشفير + tag بيكشف التعديل |
| [[ENCRYPTION_PADDING_NONE]] | GCM مش محتاج padding |
| [[setKeySize(256)]] | مفتاح ٢٥٦ bit |
| [[build()]] ثم [[generateKey()]] | اعمله واحفظه باسم [[ALIAS]] |

أي استخدام للمفتاح بغير اللي اتكتب هنا (mode تاني مثلًا) الـ Keystore بيرفضه.

---

## ٢. [[encrypt]]

~~~java
Cipher c = Cipher.getInstance("AES/GCM/NoPadding");
c.init(Cipher.ENCRYPT_MODE, key());
byte[] ct = c.doFinal(token.getBytes(StandardCharsets.UTF_8));
return new byte[][] { c.getIV(), ct };
~~~

- [[Cipher.getInstance("AES/GCM/NoPadding")]] = الخوارزمية/الـ mode/الـ padding.
- [[init(ENCRYPT_MODE, key())]] من غير IV: الـ Keystore بيختار IV عشوائي لوحده (افتراضيًا مش بيسمحلك تدّيه IV للتشفير، عشان محدش يعيد نفس الـ IV).
- [[doFinal]] = شفّر النص كله.
- بنرجّع الاتنين: [[getIV()]] والـ ciphertext. [[byte[][]]] = array فيه arrays.

نفس الإعدادات على JVM بمفتاح software:

~~~text الناتج (JVM، token تجريبي 23 حرف)
plain=23 bytes, iv=12 bytes, ciphertext+tag=39 bytes
decrypted=FAKE-refresh-token-0001
tampered: javax.crypto.AEADBadTagException: Tag mismatch
~~~

- الـ IV ١٢ byte: الحجم القياسي لـ GCM.
- 39 = 23 (نفس طول النص، GCM مش بيزوّد) + 16 (الـ tag).
- غيّرت bit واحد في أول byte: الفك رفض خالص بـ [[AEADBadTagException]] بدل ما يرجّع كلام غلط.

---

## ٣. [[decrypt]]

~~~java
c.init(Cipher.DECRYPT_MODE, key(), new GCMParameterSpec(128, iv));
return new String(c.doFinal(ct), StandardCharsets.UTF_8);
~~~

[[GCMParameterSpec(128, iv)]] = طول الـ tag بالـ bits (128 = 16 byte) والـ IV اللي اتخزّن. و [[doFinal]] بيفك ويتأكد من الـ tag في نفس الخطوة.

---

## ٤. تخزّن فين؟

الـ IV والـ ciphertext مش أسرار من غير المفتاح، فحوّلهم Base64 وخزّنهم في Jetpack DataStore (درس «DataStore» في تاب Kotlin) أو ملف في [[filesDir]]. واستثنيهم من الـ backup ([[dataExtractionRules]])، لأن المفتاح مش بيتنقل مع الـ backup، فالبيانات هتبقى مش مقروءة على الجهاز الجديد أصلًا.

## ٥. إيه اللي بيحميه وإيه لأ

| الهجوم | النتيجة |
|---|---|
| حد نسخ ملفات التطبيق (backup، أو root، أو debuggable) | معاه ciphertext من غير مفتاح |
| حد عايز ينقل المفتاح لجهاز تاني | المفتاح مبيتصدّرش |
| حد متحكم في الجهاز (root) وبيشغّل كود جوه تطبيقك | يقدر يطلب من الـ Keystore يفك وانت شغّال. عشان كده [[setUserAuthenticationRequired(true)]] للحاجات الأهم |

## الخلاصة

- المفتاح في الـ Keystore، والتطبيق معاه الاسم بس.
- AES-GCM: خزّن الـ IV جنب الـ ciphertext، والـ tag بيكشف التعديل.
- [[EncryptedSharedPreferences]] deprecated من ٢٠٢٥: المشاريع الجديدة تستخدم الـ Keystore مباشرة.
- خزّن أقل حاجة ممكنة، والأسرار الحقيقية تفضل على السيرفر.`,
        lines: [
          R`كلاس بيشفّر ويفك token بمفتاح في Android Keystore.`,
          R`اسم المفتاح جوه الـ Keystore (التطبيق معاه الاسم بس).`,
          R`دالة بترجّع المفتاح، وبتعمله لو مش موجود.`,
          R`بيفتح Keystore أندرويد.`,
          R`لازم load قبل الاستخدام، و null لأن النظام شايل كل حاجة.`,
          R`لو المفتاح موجود من قبل كده...`,
          R`...رجّع مقبض المفتاح (مش الـ bytes بتاعته).`,
          R`قفلة الـ if.`,
          R`بيجهّز مولّد مفاتيح AES جوه الـ Keystore.`,
          R`بيبدأ وصف المفتاح: اسمه...`,
          R`...وإنه للتشفير والفك بس.`,
          R`الـ mode: GCM.`,
          R`من غير padding (GCM مش محتاجه).`,
          R`حجم المفتاح 256 bit.`,
          R`خلّص الوصف.`,
          R`اعمل المفتاح واحفظه باسمه ورجّعه.`,
          R`قفلة key().`,
          R`دالة بتشفّر الـ token.`,
          R`بتجهّز Cipher بـ AES/GCM من غير padding.`,
          R`وضع التشفير بالمفتاح، والـ Keystore بيختار IV عشوائي.`,
          R`بيشفّر الـ token (بعد ما يحوّله bytes بـ UTF-8): الناتج ciphertext + tag.`,
          R`بيرجّع الـ IV والـ ciphertext عشان يتخزّنوا مع بعض.`,
          R`قفلة encrypt.`,
          R`دالة بتفك.`,
          R`نفس الـ Cipher.`,
          R`وضع الفك بنفس المفتاح والـ IV المتخزّن وطول tag 128 bit.`,
          R`بيفك ويتأكد من الـ tag، ويرجّع النص.`,
          R`قفلة decrypt.`,
          R`قفلة الكلاس.`
        ],
        sol: R`الكلاس (بالـ imports: [[android.security.keystore.KeyGenParameterSpec]] و [[KeyProperties]] و [[java.security.KeyStore]] و [[javax.crypto.*]] و [[GCMParameterSpec]] و [[StandardCharsets]]) اتعمله compile بـ [[javac -Xlint:all]] على [[android.jar]] بتاع API 36 واتحوّل dex بـ [[d8]] من build-tools 37 من غير أخطاء ولا تحذيرات. التشغيل على جهاز من الـ docs. ونفس AES-GCM على JVM بمفتاح software:

~~~text الناتج
plain=23 bytes, iv=12 bytes, ciphertext+tag=39 bytes
decrypted=FAKE-refresh-token-0001
tampered: javax.crypto.AEADBadTagException: Tag mismatch
~~~`
      }
    ]
  }
]);
