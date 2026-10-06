// تكملة تاب zsh: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/zsh/01.js (شرح حقول الدرس في أوله)
MORE("zsh", [
    {
      t: "الشبكة",
      l: 2,
      n: "",
      items: [
        {
          cmd: "networkQuality",
          title: "اختبار سرعة النت (موجود في الماك)",
          desc: R`[[networkQuality]] أداة من Apple مبنية في الماك من macOS Monterey (12)، بتعمل اختبار سرعة من الترمنال من غير ما تفتح موقع.

بتطبع 3 أرقام: Downlink وده سرعة التحميل، و Uplink سرعة الرفع (الاتنين بالـ Mbps)، و Responsiveness ودي قد إيه النت بيرد بسرعة وهو مضغوط، بتتقاس بالـ RPM (عدد الردود في الدقيقة، وكل ما تكبر أحسن). الرقم الأخير ده هو اللي بيبان في مكالمات الفيديو والألعاب: ممكن نت سريع يقطّع لو الـ Responsiveness واطية.

الأمر بياخد حوالي 20 ثانية وبيستهلك داتا، فمتشغّلوش على نت محدود كتير.`,
          example: "networkQuality",
          try: "قارن النتيجة على الواي فاي وعلى الكابل.",
          deep: {
            why: "قياس سرعة النت والـ latency بدون أي موقع خارجي. مبني في الماك (Monterey+).",
            how: R`[[networkQuality]] بيعمل speed test وبيقولك: Upload، وDownload، والـ Responsiveness (RPM: عدد الـ round trips في الدقيقة وقت الضغط).

[[-v]] verbose مع تفاصيل أكتر. [[-s]] sequential بدل parallel.

الـ Responsiveness مهم للـ video calls والـ gaming: مش بس السرعة، بس كم طلب بتعمله في وقت واحد.`,
            when: "النت بطيء وعايز تعرف المشكلة. قبل مكالمة مهمة.",
            mistakes: "[[networkQuality]] موجود من Monterey فصاعدًا. على الإصدارات الأقدم مش موجود."
          },
          teach: R`## الأمر كله كلمة واحدة

[[networkQuality]] من غير أي حاجة بعده: بيفتح اتصالات كتير بسيرفرات Apple، يحمّل ويرفع داتا لحد ما الخط يتملي، ويقيس في نفس الوقت النت بيرد بسرعة قد إيه. ده أمر ماك بس (من macOS Monterey 12)، فمفيش هنا ماك نجرّب عليه: الشرح من صفحة [[man networkQuality]] بتاعة Apple، وشكل الناتج من أمثلة منشورة، والأرقام مثال.

~~~zsh
networkQuality
~~~

~~~text شكل الناتج (من الـ docs، الأرقام مثال)
==== SUMMARY ====
Uplink capacity: 22.585 Mbps
Downlink capacity: 230.127 Mbps
Responsiveness: Medium (785 RPM)
Idle Latency: 23.125 milliseconds
~~~

في النسخ الأحدث ممكن تلاقي سطور زيادة زي Uplink Responsiveness و Downlink Responsiveness، بس الفكرة واحدة.

---

## ١. نقرا السطور واحد واحد

### [[Uplink capacity]] و [[Downlink capacity]]

- **Downlink** = التحميل (من النت لجهازك)، و **Uplink** = الرفع (من جهازك للنت).
- **capacity** يعني أقصى سرعة الخط استحملها في الاختبار.
- **Mbps** = Megabits per second، ميجا **بت** مش ميجا **بايت**. البايت ٨ بت، فـ 230 Mbps يعني حوالي 28 ميجابايت في الثانية، وده الرقم اللي هتشوفه في المتصفح وانت بتحمّل ملف.

### [[Responsiveness: Medium (785 RPM)]]

ده الرقم اللي بيميّز الأداة دي عن مواقع الـ speed test. **RPM** = Round-trips Per Minute: النت يقدر يعمل كام «رايح جاي» في الدقيقة **وهو مضغوط** بالتحميل والرفع. كل ما يكبر أحسن.

عشان تحس بالرقم، اقسم 60000 (عدد الملّي ثانية في الدقيقة) عليه. جرّبتها في zsh (أوبونتو 24.04 جوه Docker، الحساب نفسه مش محتاج ماك):

~~~zsh
echo $(( 60000.0 / 785 ))
~~~

~~~text الناتج
76.433121019108285
~~~

يعني كل رايح جاي واخد حوالي 76 ملّي ثانية وقت الضغط. و [[$(( ))]] في zsh معناها «احسب»، والـ [[.0]] بعد 60000 بتخلي القسمة بكسور بدل ما تبقى قسمة صحيحة.

والكلمة اللي قبل الرقم (Low أو Medium أو High) تقييم Apple للرقم ده.

### [[Idle Latency]]

الوقت اللي الطلب بياخده رايح جاي والخط **فاضي**، بالملّي ثانية. قارنه بالـ Responsiveness: لو الـ Idle Latency صغير والـ Responsiveness واطي، يبقى النت كويس وهو فاضي بس بيعلق أول ما حد يحمّل حاجة (المشكلة دي اسمها bufferbloat).

---

## ٢. الفلاجات اللي في الدرس

| الفلاج | معناه (من [[man networkQuality]]) |
|---|---|
| [[-v]] | verbose: تفاصيل أكتر عن الاختبار |
| [[-s]] | sequential: اختبر التحميل الأول وبعده الرفع، بدل الاتنين مع بعض |
| [[-c]] | اطبع النتيجة JSON، تنفع في سكربت |
| [[-I en0]] | اختبر على كارت شبكة معين بس |

---

## ٣. على الأنظمة التانية

| النظام | المقابل |
|---|---|
| الماك | [[networkQuality]] جاهز |
| لينكس وويندوز | مفيش أداة مبنية بنفس الاسم: مواقع speed test، أو أداة [[speedtest]] بتاعة Ookla بعد ما تسطّبها |

---

## الخلاصة

~~~text
Downlink / Uplink   سرعة التحميل والرفع بالـ Mbps (اقسم على 8 تاخد ميجابايت)
Responsiveness      رايح جاي في الدقيقة وقت الضغط: الأعلى أحسن (مكالمات وألعاب)
Idle Latency        رايح جاي والخط فاضي بالملّي ثانية: الأقل أحسن
~~~`,
          lines: ["قياس سرعة النت والاستجابة، مبني في الماك."],
          sol: R`[[networkQuality]] بياخد حوالي 20 ثانية وبعدين يطبع [[Uplink capacity]] و [[Downlink capacity]] بالـ Mbps، و [[Responsiveness]] بالـ RPM مع تقييم زي High أو Medium أو Low، وقيمة Idle Latency.

المتوقع إن الكابل يطلع Responsiveness أعلى وسرعة أثبت من الواي فاي، خصوصًا لو بعيد عن الراوتر. لو الواي فاي أقل بكتير، المشكلة غالبًا في الإشارة مش الخط. و Responsiveness واطية مع سرعة عالية معناها إن النت بيعلق لما حد تاني بيحمّل. ولو قالك command not found يبقى نسختك أقدم من Monterey.

(ده ماك بس، ومش متجرب هنا. اتأكدت من صفحة [[man networkQuality]]: [[-v]] تفاصيل أكتر، و [[-s]] الرفع والتحميل ورا بعض بدل مع بعض، وإنه بيستهلك من باقة النت.)`
        },
        {
          cmd: "ifconfig / route",
          title: "عناوينك والطريق",
          desc: R`مفيش أمر [[ip]] على الماك، بداله [[ifconfig]] للكروت وعناوينها و [[route]] للطريق. كل كارت شبكة ليه اسم: [[en0]] غالبًا الواي فاي، و [[lo0]] الـ loopback (الجهاز بيكلم نفسه). في ناتج [[ifconfig en0]] السطر اللي بيبدأ بـ [[inet]] فيه الـ IP بتاعك على الشبكة.

[[route -n get default]] بيطبع الطريق الافتراضي، يعني الراوتر (gateway) اللي أي حاجة رايحة برا شبكتك بتعدّي عليه، و [[-n]] معناها اطبع أرقام من غير ما تحوّلها لأسامي. [[networksetup -listallhardwareports]] بيطبع كل كارت والاسم الحقيقي بتاعه (Wi-Fi أو Ethernet).

ملف [[/etc/hosts]] مكانه زي لينكس، وتعديله محتاج [[sudo]] لأنه ملف نظام.`,
          example: R`ifconfig en0
route -n get default
networksetup -listallhardwareports
sudo nano /etc/hosts`,
          try: "اعرف IP جهازك على الشبكة من [[ifconfig en0]]، و IP الراوتر من [[route -n get default]].",
          deep: {
            why: "معلومات الشبكة التفصيلية على الماك. [[ifconfig]] هو المقابل لـ [[ip a]] في لينكس.",
            how: R`[[ifconfig]] بيعرض كل الكروت وعناوينها. [[ifconfig en0]] كارت Wi-Fi فقط.

في الناتج: [[inet]] هو IPv4 الخاص. [[inet6]] هو IPv6. [[ether]] هو MAC address. [[status: active]] الكارت شغال.

[[netstat -rn]] جدول الـ routing (زي [[ip route]] في لينكس). الـ default route هو السطر اللي Destination بتاعه [[default]].

الكروت الشائعة: [[en0]] Wi-Fi، [[en1]] Ethernet على بعض الماكات، [[lo0]] loopback.`,
            when: "إيجاد عنوان الماك على الشبكة. troubleshooting شبكة.",
            mistakes: "[[ifconfig]] على الماك يطلع كتير من الـ virtual interfaces. فلتر على اسم الكارت."
          },
          teach: R`## الفكرة

٤ سطور، كل واحد بيجاوب سؤال: عنواني إيه؟ الراوتر فين؟ أنهي كارت هو الواي فاي؟ وفين ملف الأسامي اليدوية؟ أوامر الماك مش متجرّبة هنا (مفيش ماك)، فشكل ناتجها من [[man ifconfig]] و [[man route]] بتاعة Apple. لكن [[ifconfig]] و [[route]] موجودين كمان في لينكس (باكدج [[net-tools]])، فشغّلتهم في أوبونتو 24.04 جوه Docker عشان تشوف نفس الحقول بعينك.

---

## ١. [[ifconfig en0]]

- [[ifconfig]] = interface configure: بيعرض (ويعدّل) كروت الشبكة.
- [[en0]] اسم الكارت. على الماك [[en]] من Ethernet (حتى الواي فاي بيتسمى كده)، والرقم ترتيبه. من غير اسم بيطبع **كل** الكروت، وعلى الماك دول كتير (كروت افتراضية زي [[utun0]] و [[awdl0]])، فاسم الكارت بيختصر عليك.

ده ناتج [[ifconfig eth0]] الحقيقي جوه container لينكس ([[eth0]] هو اسم الكارت هناك):

~~~text الناتج على لينكس (Docker)
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.17.0.4  netmask 255.255.0.0  broadcast 172.17.255.255
        ether 02:1b:cf:1d:77:71  txqueuelen 0  (Ethernet)
~~~

وعلى الماك نفس الحقول بس بشكل مختلف شوية (من الـ docs، الأرقام مثال):

~~~text شكل الناتج على الماك
en0: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 1500
	ether a4:83:e7:12:34:56
	inet 192.168.1.15 netmask 0xffffff00 broadcast 192.168.1.255
	status: active
~~~

| الحقل | معناه |
|---|---|
| [[UP]] و [[RUNNING]] | الكارت شغال |
| [[mtu 1500]] | أكبر packet بيعدّي مرة واحدة بالبايت |
| [[ether]] | الـ MAC address: رقم الكارت نفسه |
| [[inet]] | الـ IPv4 بتاعك، **ده اللي بتدوّر عليه** |
| [[netmask]] | أنهي جزء من العنوان هو الشبكة |
| [[broadcast]] | العنوان اللي لو بعتله الكل يستلم |
| [[status: active]] | (ماك بس) الكارت متوصل فعلًا |

### ليه الـ netmask على الماك شكلها [[0xffffff00]]؟

الماك بيكتبها **hex** (ست عشري)، و [[0x]] قبلها معناها «الرقم ده hex». كل حرفين بايت: [[ff]] = 255 و [[00]] = 0. جرّبتها في zsh:

~~~zsh
printf '%d.%d.%d.%d\n' 0xff 0xff 0xff 0x00
~~~

~~~text الناتج
255.255.255.0
~~~

[[printf]] بيطبع حسب قالب: كل [[%d]] مكان رقم عشري، فحوّل الأربع بايتات للشكل اللي متعود عليه. يعني [[0xffffff00]] = [[255.255.255.0]]: أول ٣ أرقام في العنوان هي الشبكة، والرقم الأخير هو الجهاز.

---

## ٢. [[route -n get default]]

- [[route]] بيتعامل مع جدول الـ routing: كل packet رايحة فين وتعدّي على مين.
- [[get]] اسألني عن طريق واحد بس، و [[default]] الطريق الافتراضي: أي عنوان مش في شبكتك المحلية.
- [[-n]] numeric: اطبع أرقام ومتحاولش تحوّلها لأسامي (أسرع، ومش بيعلق لو الـ DNS بايظ).

~~~text شكل الناتج على الماك (من الـ docs)
   route to: default
destination: default
    gateway: 192.168.1.1
  interface: en0
~~~

[[gateway]] هو الراوتر، و [[interface]] الكارت اللي الطريق ده طالع منه. سطر interface ده مهم: لو طلع [[en1]] يبقى ده كارتك الحقيقي مش [[en0]].

أمر [[get]] ده ماك بس. في لينكس [[route -n]] بيطبع الجدول كله، والطريق الافتراضي هو السطر اللي Destination بتاعه [[0.0.0.0]]:

~~~text الناتج على لينكس (Docker)
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
0.0.0.0         172.17.0.1      0.0.0.0         UG    0      0        0 eth0
172.17.0.0      0.0.0.0         255.255.0.0     U     0      0        0 eth0
~~~

[[UG]]: [[U]] الطريق شغال (Up) و [[G]] بيعدّي على Gateway.

---

## ٣. [[networksetup -listallhardwareports]]

[[networksetup]] أداة إعدادات الشبكة بتاعة الماك (ليها درس لوحدها)، و [[-listallhardwareports]] بيطبع كل كارت بالاسم اللي الإنسان يفهمه جنب اسمه التقني:

~~~text شكل الناتج (من الـ docs)
Hardware Port: Wi-Fi
Device: en0
Ethernet Address: a4:83:e7:12:34:56
~~~

[[Device]] هو الاسم اللي تكتبه بعد [[ifconfig]]. ماك فيه منفذ كابل هتلاقي [[Hardware Port: Ethernet]] بـ en تاني.

---

## ٤. [[sudo nano /etc/hosts]]

- [[/etc/hosts]] ملف بيربط أسامي بعناوين بإيدك، والنظام بيقراه **قبل** ما يسأل الـ DNS.
- [[nano]] محرر نصوص جوه الترمنال: Ctrl+O و Enter تحفظ، و Ctrl+X تخرج.
- [[sudo]] لأن الملف ملك root، ومن غيرها nano هيفتحه بس مش هيعرف يحفظ.

شكله واحد في لينكس والماك: كل سطر IP وبعده اسم أو أكتر. ده [[cat /etc/hosts]] في الـ container:

~~~text الناتج على لينكس (Docker)
127.0.0.1	localhost
::1	localhost ip6-localhost ip6-loopback
~~~

[[127.0.0.1]] هو الـ loopback (الجهاز بيكلم نفسه، الكارت بتاعه [[lo0]] على الماك و [[lo]] على لينكس)، و [[::1]] نفس الحاجة في IPv6. لو ضفت سطر زي [[127.0.0.1 myapp.test]]، [[myapp.test]] هيفتح جهازك. وبعد التعديل اعمل flush للـ DNS (الدرس اللي بعد الجاي).

---

## مقارنة سريعة

| السؤال | الماك | لينكس | ويندوز |
|---|---|---|---|
| عناويني | [[ifconfig en0]] | [[ip a]] (أو [[ifconfig]]) | [[ipconfig]] |
| الراوتر | [[route -n get default]] | [[ip route]] | [[ipconfig]] (سطر Default Gateway) |
| ملف hosts | [[/etc/hosts]] | [[/etc/hosts]] | [[C:\Windows\System32\drivers\etc\hosts]] |

---

## الخلاصة

~~~text
ifconfig en0             سطر inet = IP جهازك، والـ netmask على الماك hex
route -n get default     سطر gateway = الراوتر، وسطر interface = كارتك الحقيقي
networksetup -list...    أنهي enX هو Wi-Fi وأنهي Ethernet
/etc/hosts               أسامي بإيدك، بتكسب على الـ DNS، وتعديلها بـ sudo
~~~`,
          lines: [
            "عناوين كارت الواي فاي (en0).",
            "الراوتر الافتراضي (زي ip route).",
            "أسامي كل الكروت، عشان تعرف الواي فاي en0 ولا en1.",
            "ملف hosts نفس مكانه زي لينكس."
          ],
          sol: R`[[ifconfig en0]] دوّر فيه على سطر [[inet 192.168.1.15 netmask 0xffffff00 broadcast 192.168.1.255]]: الرقم بعد inet هو IP جهازك. و [[route -n get default]] هيطبع سطر [[gateway: 192.168.1.1]]، ده الراوتر، ومعاه [[interface: en0]].

لو [[ifconfig en0]] مفيهوش سطر inet، يبقى en0 مش الكارت اللي انت متوصل بيه (مثلًا على Mac بكابل أو بعض الموديلات الواي فاي بيبقى en1)؛ [[route -n get default]] بيقولك الـ interface الصح في سطر interface، و [[networksetup -listallhardwareports]] يوريك أنهي en هو Wi-Fi. سطر [[inet6]] ده IPv6 مش هو المطلوب.

(ده ماك بس: من صفحات [[man ifconfig]] و [[man route]] و [[man networksetup]] بتاعة Apple، والأرقام مثال. مش متجرب هنا.)`
        },
        {
          cmd: "ipconfig getifaddr",
          title: "الـ IP بتاعك",
          desc: R`[[ipconfig getifaddr en0]] بيطبع الـ IP المحلي بتاع الكارت en0 (غالبًا الواي فاي) في سطر واحد من غير كلام زيادة، فينفع جوه سكربت. ده العنوان اللي جوه شبكة البيت، زي [[192.168.1.15]]، وهو اللي تفتح بيه سيرفر شغال على جهازك من موبايل على نفس الواي فاي.

[[curl ifconfig.me]] بيسأل موقع برا عن العنوان اللي شايفك بيه، وده الـ IP العام بتاع الراوتر على النت. الاتنين مختلفين لأن الراوتر بيخبّي كل أجهزة البيت ورا عنوان عام واحد (NAT).

خد بالك إن [[ipconfig]] على الماك أمر تاني خالص غير [[ipconfig]] بتاع ويندوز.`,
          example: R`ipconfig getifaddr en0
curl ifconfig.me`,
          try: "اعرف الـ IP المحلي والعام.",
          deep: {
            why: "أسرع طريقة تعرف عنوانك على الـ Wi-Fi على الماك. سطر واحد.",
            how: R`[[ipconfig getifaddr en0]] بيطبع عنوان Wi-Fi بس. [[en0]] هو الاسم الافتراضي للـ Wi-Fi على معظم الماكات. بعض الماكات [[en1]].

عنوانك العام (IP على النت): [[curl ifconfig.me]] أو [[curl ipinfo.io/ip]].

ولو مش عارف اسم كارتك: [[networksetup -listallhardwareports]] بيعرض كل الكروت.`,
            when: "شارك الـ URL مع موبايل على نفس الواي فاي. تعرف عنوانك على الشبكة.",
            mistakes: "تستخدم [[en0]] وجهازك الـ Wi-Fi على [[en1]]. افحص بـ [[ifconfig]] أو [[networksetup]]."
          },
          teach: R`## سطرين، وكل واحد بيجيب IP مختلف

الأول بيسأل جهازك: «عنواني جوه البيت إيه؟». والتاني بيسأل موقع برّه: «انت شايفني بأنهي عنوان؟». الإجابتين مختلفين، وهنعرف ليه.

---

## ١. [[ipconfig getifaddr en0]]

| الحتة | معناها |
|---|---|
| [[ipconfig]] | أداة الماك اللي بتتكلم مع خدمة إعداد الـ IP (اسمها IPConfiguration) |
| [[getifaddr]] | get interface address: هات عنوان كارت |
| [[en0]] | الكارت، غالبًا الواي فاي (درس «ifconfig / route») |

صفحة [[man ipconfig]] بتاعة Apple بتقول إنه بيطبع الـ IP بتاع أول network service مربوطة بالكارت ده، و**مش بيطبع حاجة** لو مفيش service شغالة عليه. مفيش ماك هنا، فالناتج من الـ docs والرقم مثال:

~~~text شكل الناتج
192.168.1.15
~~~

سطر واحد، من غير [[inet]] ولا [[netmask]] ولا أي كلام. عشان كده بيتحط في سكربت على طول:

~~~zsh
myip=$(ipconfig getifaddr en0)
echo "افتح من الموبايل: http://$myip:3000"
~~~

[[$(...)]] بتنفّذ الأمر اللي جواها وتحط ناتجه مكانها، فـ [[myip]] بقى فيه العنوان. و [[3000]] مثال لبورت سيرفر تطوير شغال على جهازك.

لو الأمر مطبعش حاجة، يبقى en0 مش متوصل، جرّب [[en1]].

> [[ipconfig]] على الماك أمر **تاني خالص** غير [[ipconfig]] بتاع ويندوز: بتاع ويندوز بيطبع كل الكروت بالتفصيل، وبتاع الماك محتاج subcommand زي [[getifaddr]].

---

## ٢. [[curl ifconfig.me]]

- [[curl]] بيبعت طلب لعنوان على النت ويطبع الرد.
- [[ifconfig.me]] موقع كل شغلته إنه يرد عليك بالعنوان اللي الطلب جاله منه.

الأمر ده بيشتغل على أي نظام، فشغّلته في zsh على أوبونتو 24.04 جوه Docker. الناتج IP عام حقيقي فخبّيت أرقامه هنا (كل رقم بقى N)، وعدّيته على [[od -c]] اللي بيطبع كل حرف لوحده، عشان نشوف الملف بيخلص بإيه:

~~~zsh
curl -s ifconfig.me | od -c | tail -3
~~~

~~~text الناتج (الأرقام متخبية)
NNNNNNN   N   N   .   N   N   .   N   N   N   .   N   N   N
NNNNNNN
~~~

- [[-s]] silent: متطبعش شريط التقدم.
- [[od -c]] (octal dump) بيعرض الحروف واحد واحد، ولو فيه سطر جديد بيظهر [[\n]].
- [[tail -3]] آخر ٣ سطور بس.

آخر حرف رقم، ومفيش [[\n]]: يعني الرد **من غير سطر جديد في الآخر**، وعشان كده الـ prompt بتاعك بيلزق جنب العنوان. لو ضايقك اكتب [[curl ifconfig.me; echo]]: الـ [[;]] بتنفّذ [[echo]] بعده، و [[echo]] لوحده بيطبع سطر فاضي.

---

## ٣. ليه العنوانين مختلفين؟ (NAT)

الراوتر واخد من شركة النت عنوان **عام** واحد، وبيدّي كل جهاز في البيت عنوان **خاص** (غالبًا [[192.168.x.x]] أو [[10.x.x.x]]). أي طلب طالع، الراوتر بيغيّر عنوانه الخاص لعنوانه العام، ويفتكر مين طلب إيه عشان يرجّعله الرد. ده اسمه NAT (Network Address Translation).

| | [[ipconfig getifaddr en0]] | [[curl ifconfig.me]] |
|---|---|---|
| مين بيجاوب | جهازك | سيرفر برّه |
| نوع العنوان | خاص (جوه البيت) | عام (الراوتر على النت) |
| بتستخدمه في | تفتح سيرفرك من موبايل على نفس الواي فاي | تعرف انت على VPN ولا لأ، أو whitelist في سيرفر |
| محتاج نت؟ | لأ | آه |

---

## على الأنظمة التانية

| | الماك | لينكس | ويندوز (PowerShell) |
|---|---|---|---|
| العنوان المحلي | [[ipconfig getifaddr en0]] | [[hostname -I]] | [[ipconfig]] (سطر IPv4 Address) |
| العنوان العام | [[curl ifconfig.me]] | [[curl ifconfig.me]] | [[curl.exe ifconfig.me]] |

---

## الخلاصة

~~~text
ipconfig getifaddr en0   IP جهازك جوه البيت، سطر واحد، ومفيش ناتج = الكارت مش متوصل
curl ifconfig.me         IP الراوتر على النت، ومن غير سطر جديد في الآخر
الفرق بينهم              NAT: الراوتر مخبّي كل أجهزة البيت ورا عنوان عام واحد
~~~`,
          lines: ["عنوانك على الواي فاي في سطر واحد.", "عنوانك العام على النت."],
          sol: R`[[ipconfig getifaddr en0]] بيطبع الـ IP المحلي بس، زي [[192.168.1.15]]. و [[curl ifconfig.me]] بيطبع الـ IP العام زي [[41.x.x.x]]، ومن غير سطر جديد في الآخر فالـ prompt بيلزق جنبه، ده طبيعي.

الاتنين مختلفين لأن الراوتر بيعمل NAT. لو [[getifaddr en0]] مطبعش حاجة، يبقى الكارت ده مش متوصل، جرب [[en1]]. ولو [[curl ifconfig.me]] طبع IP غريب مش بتاع مزود النت، يبقى انت على VPN.

(جربت [[curl ifconfig.me]] على لينكس: طبع الـ IP من غير سطر جديد في الآخر فعلًا. [[ipconfig getifaddr]] ماك بس، من صفحة [[man ipconfig]] بتاعة Apple، مش متجرب هنا.)`
        },
        {
          cmd: "flush DNS",
          title: "امسح كاش الـ DNS",
          desc: R`الـ DNS هو اللي بيحوّل اسم زي [[example.com]] لـ IP. الماك بيحفظ الردود دي فترة (كاش) عشان ميسألش كل مرة، فلو غيّرت سجل DNS لدومينك أو عدّلت [[/etc/hosts]]، ممكن يفضل يفتح العنوان القديم.

السطر ده أمرين مفصولين بـ [[;]] (نفّذ الأول وبعده التاني): [[dscacheutil -flushcache]] بيمسح كاش النظام، و [[killall -HUP mDNSResponder]] بيبعت إشارة HUP لخدمة الـ DNS بتاعة الماك فتعيد تحميل نفسها وترمي الكاش اللي معاها. الاتنين محتاجين [[sudo]]، فهيطلب باسورد الماك.

لو نجح مش بيطبع حاجة. والمتصفح نفسه عنده كاش منفصل، فممكن تحتاج تقفله وتفتحه.`,
          example: "sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder",
          try: "نفّذه بعد أي تغيير DNS.",
          deep: {
            why: "بعد تعديل ملف hosts أو تغيير DNS، الماك بيحتفظ بالكاش القديم. flush بيمسحه.",
            how: R`على أي macOS حديث (من Monterey لحد Tahoe 26): [[sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder]].

على Monterey وما قبلها: نفس الأمر، بس الترتيب ممكن يختلف.

الأمر بياخد sudo. بعده بيكون التغيير فعّال فورًا في كل التطبيقات.

تحقق من إن DNS اتغيّر: [[nslookup example.com]] أو [[dig +short example.com]].`,
            when: "بعد تعديل [[/etc/hosts]]. بعد تغيير DNS settings. لما موقع لسه بيفتح عنوان قديم.",
            mistakes: "تعمل flush بدون sudo: مش هيشتغل أو هيطلع error. لازم sudo للاتنين."
          },
          teach: R`## الفكرة

السطر ده **أمرين** ورا بعض، الاتنين بـ [[sudo]]. الأول بيمسح كاش الـ DNS بتاع النظام، والتاني بيقول لخدمة الـ DNS نفسها «ارمي اللي في دماغك واقرا من الأول». الأمر ده من صفحة دعم Apple عن مسح كاش الـ DNS، ومش متجرّب هنا (مفيش ماك). لكن الحتت اللي مش ماك بس ([[;]] و [[killall]] و إشارة HUP) جرّبتها في zsh على أوبونتو 24.04 جوه Docker.

~~~zsh
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
~~~

---

## ١. الـ [[;]] في النص

[[;]] بتفصل أمرين في سطر واحد: نفّذ الأول، ولما يخلص نفّذ التاني، **مهما كانت نتيجة الأول**.

~~~zsh
echo one; echo two
false; echo two-after-false
~~~

~~~text الناتج
one
two
two-after-false
~~~

[[false]] أمر بيفشل دايمًا، ومع ذلك اللي بعد [[;]] اتنفّذ. ده الفرق بينها وبين [[&&]] اللي بتنفّذ التاني بس لو الأول نجح. هنا [[;]] مناسبة لأن الخطوتين مستقلين.

---

## ٢. [[sudo dscacheutil -flushcache]]

- [[sudo]] نفّذ كـ root (المدير). أول مرة بيسألك باسورد الماك، ومش بيظهر وانت بتكتبه، ده طبيعي.
- [[dscacheutil]] = Directory Service cache utility: أداة كاش «خدمات الدليل»، وده المكان اللي الماك بيحفظ فيه نتايج البحث عن أسامي الأجهزة واليوزرز.
- [[-flushcache]] امسح الكاش ده.

لو نجح مش بيطبع حاجة.

---

## ٣. [[sudo killall -HUP mDNSResponder]]

### [[killall]]

بيبعت إشارة (signal) لكل process **بالاسم**، بدل [[kill]] اللي محتاج رقم الـ process. والاسم رغم إنه «kill» مش لازم يقتل: بيبعت الإشارة اللي تقوله عليها.

### [[-HUP]]

HUP = Hang Up، إشارة رقمها 1. اسمها جاي من أيام المودم لما الخط «يقفل». في zsh تقدر تسأل عن رقمها:

~~~zsh
kill -l HUP
~~~

~~~text الناتج
1
~~~

البرنامج اللي **مش** متجهز للإشارة دي بيقفل. جرّبت على نسخة من [[sleep]] سمّيتها [[mydns]]:

~~~zsh
./mydns 300 &
pgrep -l mydns
killall -HUP mydns
pgrep -l mydns
~~~

~~~text الناتج
4198 mydns
~~~

- [[&]] في الآخر بتشغّل البرنامج في الخلفية وترجّعلك الـ prompt.
- [[pgrep -l]] بيدوّر على process بالاسم و [[-l]] يطبع الاسم جنب الرقم. أول مرة لقاه (4198)، وبعد الـ HUP مطبعش حاجة: البرنامج قفل.

لكن الخدمات الكبيرة **متبرمجة** إنها لما توصلها HUP متقفلش، تعيد تحميل نفسها. و [[mDNSResponder]] (خدمة الـ DNS و Bonjour على الماك) لما توصلها HUP بترمي الكاش بتاعها. وعشان هي شغالة كـ root، محتاج [[sudo]].

لو كتبت اسم غلط، killall بيقولك (اتجرّب على لينكس):

~~~text الناتج
nothere: no process found
~~~

---

## ٤. اتأكد إنه اشتغل

| الأمر | بيعمل إيه |
|---|---|
| [[dscacheutil -q host -a name example.com]] | اسأل النظام نفسه (بيعدّي على [[/etc/hosts]] والكاش) |
| [[dig +short example.com]] | اسأل الـ DNS على طول، من غير [[/etc/hosts]] |

لو الاتنين مختلفين، غالبًا فيه سطر في [[/etc/hosts]] بيكسب.

---

## على الأنظمة التانية

| النظام | مسح كاش الـ DNS |
|---|---|
| الماك | [[sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder]] |
| لينكس (systemd-resolved) | [[sudo resolvectl flush-caches]] |
| ويندوز | [[ipconfig /flushdns]] أو [[Clear-DnsClientCache]] في PowerShell |

---

## الخلاصة

~~~text
;                      نفّذ اللي بعدي حتى لو اللي قبلي فشل
dscacheutil -flush..   امسح كاش النظام
killall -HUP NAME      ابعت HUP بالاسم: الخدمة تعيد تحميل نفسها وترمي الكاش
مفيش ناتج              يعني نجح، والمتصفح ليه كاش لوحده
~~~`,
          lines: ["امسح كاش الـ DNS وأعد تحميل خدمة الـ DNS. الاتنين لازمين، وبـ sudo."],
          sol: R`الأمر هيطلب باسورد الماك (عشان sudo)، وبعدها مش بيطبع أي حاجة، وده معناه إنه نجح. بعدها [[dscacheutil -q host -a name yourdomain.com]] أو افتح الموقع، المفروض ياخد الـ IP الجديد.

لو لسه بيفتح القديم: المتصفح نفسه عنده كاش (Chrome: chrome://net-internals/#dns ثم Clear host cache)، أو راوتر البيت عامل كاش، أو الـ TTL القديم عند الـ DNS بتاعك لسه مخلصش؛ اتأكد إن السجل اتغير فعلًا بـ [[dig @1.1.1.1 yourdomain.com]]. ولو ملف [[/etc/hosts]] فيه سطر للدومين ده، هو اللي بيكسب على أي DNS.

(ده ماك بس: الأمر من صفحة دعم Apple عن مسح كاش الـ DNS، مش متجرب هنا.)`
        },
        {
          cmd: "ssh-add",
          title: "خلّي الماك يفتكر باسورد المفتاح",
          desc: "مع [[--apple-use-keychain]] الباسورد بيتحفظ في Keychain فمش هتكتبه كل مرة، بشرط تضيف [[UseKeychain yes]] و [[AddKeysToAgent yes]] في [[~/.ssh/config]].",
          example: R`ssh-keygen -t ed25519
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
pbcopy < ~/.ssh/id_ed25519.pub`,
          try: "اعمل مفتاح، انسخه بـ pbcopy وضيفه في GitHub.",
          deep: {
            why: "على الماك، الـ SSH key بيتقفل بعد كل restart من غير [[ssh-add]]. وبيستفيد من Keychain عشان يحفظ الـ passphrase.",
            how: R`[[ssh-add ~/.ssh/id_rsa]] بيضيف المفتاح للـ ssh-agent. هتسألك الـ passphrase مرة واحدة.

[[ssh-add --apple-use-keychain ~/.ssh/id_rsa]] على الماك بيحفظ الـ passphrase في macOS Keychain. مش هيسأل بعدها.

لازم تضيف في [[~/.ssh/config]] تحت [[Host *]] السطرين [[UseKeychain yes]] و [[AddKeysToAgent yes]].

[[ssh-add -l]] بيعرض المفاتيح المضافة. [[ssh-add -D]] بيمسح كلهم.`,
            when: "أول مرة بعد إنشاء SSH key على ماك. بعد restart وإيجاد إن ssh بيطلب passphrase تاني.",
            mistakes: "نسيان --apple-use-keychain فبعد كل restart تحتاج تضيف المفتاح تاني."
          },
          teach: R`## الفكرة

٣ خطوات: اعمل مفتاح SSH، وسلّمه للـ ssh-agent ومعاه الـ passphrase تتحفظ في Keychain، وانسخ النص العام عشان تحطه في GitHub. [[ssh-keygen]] و [[ssh-add]] نفس OpenSSH اللي في لينكس، فجرّبتهم في zsh على أوبونتو 24.04 جوه Docker (يوزر اسمه sara). [[--apple-use-keychain]] و [[pbcopy]] ماك بس، فشرحهم من [[man ssh-add]] بتاعة Apple.

---

## ١. [[ssh-keygen -t ed25519]]

- [[ssh-keygen]] = SSH key generator: بيعمل **زوج** مفاتيح: خاص (private) يفضل عندك ومتديهوش لحد، وعام (public) تحطه في أي مكان عايز تدخله.
- [[-t]] type: نوع المفتاح. [[ed25519]] النوع الحديث: قصير وسريع وآمن، و GitHub بينصح بيه.

هيسألك ٣ أسئلة: مكان الملف (Enter = الافتراضي [[~/.ssh/id_ed25519]])، والـ passphrase مرتين. الـ passphrase باسورد بيقفل المفتاح الخاص نفسه، فلو حد سرق الملف ميقدرش يستخدمه.

في التجربة استخدمت [[-N ""]] (passphrase فاضية، عشان مفيش حد يكتب) و [[-C]] (comment):

~~~zsh
ssh-keygen -t ed25519 -N "" -f ~/.ssh/id_ed25519 -C "you@example.com"
~~~

~~~text الناتج (أوبونتو جوه Docker)
Generating public/private ed25519 key pair.
Your identification has been saved in /home/sara/.ssh/id_ed25519
Your public key has been saved in /home/sara/.ssh/id_ed25519.pub
The key fingerprint is:
SHA256:jfkquUxfDHBGGF2nR2lqL4UOoONM2iZmeFzfYSeTKnA you@example.com
The key's randomart image is:
+--[ED25519 256]--+
|      .+... o.   |
...
+----[SHA256]-----+
~~~

| السطر | معناه |
|---|---|
| [[identification has been saved]] | المفتاح الخاص |
| [[public key has been saved]] | المفتاح العام، نفس الاسم وبعده [[.pub]] |
| [[fingerprint]] | بصمة قصيرة للمفتاح، تقارن بيها من غير ما تعرض المفتاح كله |
| [[randomart]] | نفس البصمة كرسمة، عشان العين تلاحظ لو اتغيّرت |

وعلى الماك المسار هيبقى [[/Users/اسمك/.ssh/]] بدل [[/home/sara/.ssh/]]. والصلاحيات:

~~~text ls -l ~/.ssh
-rw------- 1 sara sara 411 Oct  6 09:29 id_ed25519
-rw-r--r-- 1 sara sara  97 Oct  6 09:29 id_ed25519.pub
~~~

الخاص [[rw-------]]: انت بس تقرا وتكتب. لو صلاحياته أوسع، ssh بيرفض يستخدمه.

---

## ٢. [[ssh-add --apple-use-keychain ~/.ssh/id_ed25519]]

### الأول: يعني إيه ssh-agent؟

برنامج شغال في الخلفية شايل المفاتيح مفتوحة في الذاكرة، فـ [[ssh]] و [[git]] بياخدوها منه من غير ما يسألوك الـ passphrase كل مرة. و [[ssh-add]] هو اللي بيسلّمه المفتاح. على الماك الـ agent شغال لوحده.

على لينكس شغّلته بإيدي وضفت المفتاح:

~~~zsh
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
ssh-add -l
~~~

~~~text الناتج
Agent pid 3994
Identity added: /home/sara/.ssh/id_ed25519 (you@example.com)
256 SHA256:jfkquUxfDHBGGF2nR2lqL4UOoONM2iZmeFzfYSeTKnA you@example.com (ED25519)
~~~

[[ssh-add -l]] (list) بيطبع المفاتيح اللي معاه: الحجم، والبصمة (نفس اللي طلعت من ssh-keygen)، والـ comment، والنوع.

### [[--apple-use-keychain]]

ده فلاج Apple زوّدته على نسختها من ssh-add: الـ passphrase بتتحفظ في Keychain (خزنة الباسوردات بتاعة الماك)، فبعد restart الماك يفتح المفتاح لوحده. نسخة لينكس معندهاش الفلاج ده، وده الناتج الحقيقي لو جربته هناك:

~~~text الناتج على لينكس
unknown option -- -
usage: ssh-add [-cDdKkLlqvXx] [-E fingerprint_hash] [-H hostkey_file]
~~~

يعني لو نقلت الأمر ده لسكربت بيشتغل على لينكس، شيل الفلاج. (في نسخ macOS قبل Monterey كان اسمه [[-K]].)

### الحتة اللي بتخليه يفتكر: [[~/.ssh/config]]

الفلاج لوحده بيحفظ الباسورد، بس عشان ssh **يستخدمه** لوحده بعد restart ضيف في [[~/.ssh/config]]:

~~~text ~/.ssh/config
Host *
  UseKeychain yes
  AddKeysToAgent yes
~~~

- [[Host *]] الإعدادات اللي تحتها لكل السيرفرات ([[*]] = أي اسم).
- [[UseKeychain yes]] (ماك بس) دوّر على الـ passphrase في Keychain.
- [[AddKeysToAgent yes]] أول ما تستخدم المفتاح ضيفه للـ agent لوحده.

---

## ٣. [[pbcopy < ~/.ssh/id_ed25519.pub]]

- [[pbcopy]] = pasteboard copy: اللي يدخله يروح الـ clipboard، فتعمل Cmd+V في GitHub.
- [[<]] بتدخّل محتوى الملف للأمر كأنك كتبته (input redirection).

pbcopy ماك بس، فده محتوى الملف العام على لينكس (أول ٤٠ حرف):

~~~text الناتج
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAILuW
~~~

سطر واحد: النوع، وبعده المفتاح، وفي الآخر الـ comment. لو اللي لزقته بيبدأ بـ [[-----BEGIN OPENSSH PRIVATE KEY-----]] يبقى نسخت الخاص بالغلط.

---

## ٤. solCode: [[ssh -T git@github.com]]

[[-T]] متطلبش terminal: GitHub مش بيدّيك shell، احنا بس بنختبر إن المفتاح اتقبل. الرد المتوقع من docs GitHub في الـ sol.

---

## على الأنظمة التانية

| الخطوة | الماك | لينكس | ويندوز (PowerShell) |
|---|---|---|---|
| اعمل مفتاح | [[ssh-keygen -t ed25519]] | نفسه | نفسه |
| افتكر الـ passphrase | [[--apple-use-keychain]] + config | [[ssh-add]] كل جلسة (أو keyring الـ desktop) | خدمة [[ssh-agent]] (لو شغّلتها) بتفتكر المفتاح |
| انسخ العام | [[pbcopy < file]] | [[cat file]] وانسخ | [[Get-Content file]] ووصّله بـ pipe لـ [[Set-Clipboard]] |

---

## الخلاصة

~~~text
ssh-keygen -t ed25519           زوج مفاتيح: id_ed25519 (سر) و id_ed25519.pub (للنشر)
ssh-add --apple-use-keychain    ضيفه للـ agent واحفظ الـ passphrase في Keychain (ماك بس)
UseKeychain / AddKeysToAgent    في ~/.ssh/config عشان يفضل بعد restart
pbcopy < file.pub               العام للـ clipboard، والخاص عمره ما يتنسخ
~~~`,
          lines: [
            "اعمل زوج مفاتيح.",
            "ضيف المفتاح للـ agent واحفظ الـ passphrase في Keychain، فمش هيسأل عليها تاني.",
            "انسخ المفتاح العام عشان تحطه في GitHub أو السيرفر."
          ],
          sol: R`[[ssh-keygen -t ed25519]] هيسألك عن المكان (Enter للافتراضي) والـ passphrase، ويطبع [[Your public key has been saved in /Users/ali/.ssh/id_ed25519.pub]]. [[ssh-add --apple-use-keychain ~/.ssh/id_ed25519]] يطبع [[Identity added: ...]]. بعد [[pbcopy < ~/.ssh/id_ed25519.pub]] الصق في GitHub، Settings، SSH and GPG keys، New SSH key. التأكيد: [[ssh -T git@github.com]] يرد [[Hi username! You've successfully authenticated, but GitHub does not provide shell access.]]

لو لزقت ولقيت كلام طويل غريب يبدأ بـ [[-----BEGIN OPENSSH PRIVATE KEY-----]]، نسخت المفتاح الخاص بالغلط؛ متحطهوش في أي مكان، وانسخ الملف اللي بينتهي بـ [[.pub]]. ولو [[ssh -T]] قال [[Permission denied (publickey)]]، المفتاح مش متضاف في GitHub أو الـ agent مش شايفه ([[ssh-add -l]]).`,
          solCode: R`ssh-keygen -t ed25519 -C "you@example.com"
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
pbcopy < ~/.ssh/id_ed25519.pub
ssh -T git@github.com`
        }
      ]
    }
]);
