// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   teach    اختياري: «الشرح خطوة بخطوة»: markdown صغير (## و ### و ~~~lang عنوان ... ~~~ و جداول | و - و 1. و > و ---). القواعد في README
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
//   check    اختياري: تمرين بيتصحح لوحده في الصفحة
//            JS:  { lang: "js", starter, tests: R`test("..", () => expect(x).toBe(y))`, solution }
//            SQL: { lang: "sql", setup: R`CREATE TABLE ...; INSERT ...`, starter, expect: [[...صفوف]] أو expectSql: R`استعلام مرجعي`, solution, ordered }
//            solution حل مرجعي مش بيظهر، و npm run check بيتأكد إنه بيعدّي الاختبارات. المتاح في tests: test و expect(x).toBe/toEqual/toThrow/toBeTruthy/toBeFalsy
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("interview", {
  label: "الانترفيو",
  prompt: "$ ",
  lab: R`node
> [5, 3, 8].sort((a, b) => a - b)`,
  labText: "كل درس هنا سؤال انترفيو: اقرا السؤال، وجاوب بصوت عالي قبل ما تكشف، وبعدين قارن. «اختبرني» هنا أهم أداة. أسئلة كل تقنية موجودة كمان في آخر تابها.",
  levels: {"1":["الأساسيات","HTTP و REST و الويب والشبكات والـ Git اللي بيتسألوا فيهم دايمًا"],"2":["CS","big-O و data structures و algorithms بالـ JavaScript"],"3":["الانترفيو كله","system design، والأسئلة السلوكية، وإزاي تحكي عن مشاريعك، والـ take-home"]},
  categories: [
    {
      t: "رحلة الطلب",
      l: 1,
      n: "السؤال اللي بيفتح بيه نص الانترفيوهات، والبروتوكولات اللي تحته. في كل درس: الإجابة القصيرة الأول، والتفاصيل لو طلبها",
      items: [
        {
          cmd: "DNS → TCP → TLS → HTTP → render",
          title: "بيحصل إيه لما تكتب عنوان موقع في المتصفح وتدوس Enter؟ (What happens when you type a URL?)",
          desc: R`المتصفح بيحوّل اسم الدومين لـ IP عن طريق DNS، ويفتح اتصال TCP مع السيرفر على بورت 443، ويعمل TLS handshake عشان الاتصال يبقى مشفّر، ويبعت طلب HTTP GET. السيرفر يرد بـ HTML، والمتصفح يقراه ويبني الـ DOM، ويحمّل الـ CSS والـ JS والصور، ويحسب مكان كل حاجة (layout) ويرسم الصفحة.

ولو عندي وقت أزوّد: فيه كاش في كل خطوة (الـ DNS متكاش في المتصفح والـ OS، والملفات في الـ HTTP cache)، وغالبًا فيه CDN أو reverse proxy زي Nginx قبل التطبيق نفسه، والتطبيق ممكن يكلّم داتابيز قبل ما يرد. وبعدين أسأل: «تحب أعمّق في أنهي جزء؟»`,
          example: R`nslookup example.com
curl -sv https://example.com -o /dev/null
curl -s -o /dev/null -w "dns=%{time_namelookup} tcp=%{time_connect} tls=%{time_appconnect} ttfb=%{time_starttransfer}\n" https://example.com`,
          try: "شغّل أمر curl التالت على موقعين مختلفين وقارن الأرقام: أنهي مرحلة بتاخد أطول؟ وبعدين افتح Network في المتصفح، ودوس على أي طلب وافتح Timing: نفس المراحل بالظبط.",
          deep: {
            why: "مش بيختبر إنك حافظ خطوات. بيختبر إنك فاهم الويب من أوله لآخره ومش حافظ framework بس. ومفيش إجابة «كاملة»: الإنترفيوير بيشوف انت هتعمّق لوحدك في أنهي حتة، وده بيبيّن خلفيتك.",
            how: R`١. الـ URL: المتصفح بيفصل الـ protocol والدومين والـ path. لو الدومين في قايمة HSTS بيروح HTTPS على طول من غير ما يجرب HTTP.

٢. DNS: بيدوّر على الـ IP في كاش المتصفح، وبعدين كاش الـ OS، وبعدين بيسأل الـ resolver (بتاع مزود النت أو 1.1.1.1). الـ resolver لو مش عارف بيسأل root servers، وبعدين سيرفرات الـ TLD (.com)، وبعدين الـ authoritative server بتاع الدومين. الرد بييجي معاه TTL، وده بيحدد هيتكاش قد إيه.

٣. TCP: three-way handshake: [[SYN]] ثم [[SYN-ACK]] ثم [[ACK]]. رحلة رايح جاي كاملة قبل أي بيانات.

٤. TLS: المتصفح يبعت ClientHello، والسيرفر يرد بالـ certificate، والمتصفح يتأكد منها ويتفقوا على مفتاح. في TLS 1.3 ده بياخد رحلة واحدة.

٥. HTTP: الطلب فيه method و path و headers (منهم الكوكيز). بيعدّي على load balancer أو Nginx، ويوصل للتطبيق، اللي ممكن يقرا من الداتابيز أو Redis، ويرجّع status و headers و body.

٦. الـ rendering: الـ HTML بيتحوّل DOM، والـ CSS بيتحوّل CSSOM، والاتنين بيعملوا render tree. بعدين layout (مكان وحجم كل عنصر)، ثم paint، ثم composite. والـ script العادي بيوقف قراية الـ HTML لحد ما يتحمّل ويتنفّذ، عشان كده [[defer]] و [[async]].`,
            when: "Follow-ups متوقعة: «الموقع بطيء، هتعرف منين المشكلة في أنهي مرحلة؟» (Network Timing، و TTFB). «الـ DNS بيتكاش فين؟». «إيه الفرق بين defer و async؟». «الـ CDN بيدخل فين في الصورة؟». «إيه اللي بيتغير مع HTTP/2 و HTTP/3؟».",
            mistakes: R`إنك تقول «بيروح للسيرفر ويجيب الصفحة» وتقف: كده مقلتش حاجة. أو العكس: تغرق عشر دقايق في الـ DNS وتنسى الـ rendering. ابدأ بالخريطة كلها في ست خطوات، وبعدين عمّق. وغلطة شائعة: إن الـ DNS «بيجيب الموقع»، هو بيرجّع IP بس. وإن الـ TLS بيحصل قبل الـ TCP: الـ TLS شغال فوق الـ TCP.`
          },
          lines: [
            "اسأل الـ DNS عن الـ IP بتاع الدومين.",
            "اطبع تفاصيل الاتصال كله: الـ TCP والـ TLS والـ headers، ورمي الـ body.",
            "قيس كل مرحلة بالثانية: الـ DNS، والـ TCP، والـ TLS، وأول byte من الرد (TTFB). الأرقام تراكمية."
          ],
          sol: R`المهم تعرف إن الأرقام اللي [[curl -w]] بيطبعها تراكمية من أول الطلب، مش مدة كل مرحلة لوحدها. يعني لو طلع [[dns=0.004 tcp=0.030 tls=0.075 ttfb=0.160]]، الـ TCP أخد ٢٦ms (0.030 − 0.004)، والـ TLS أخد ٤٥ms، والسيرفر فكّر ورد في ٨٥ms. أغلب الناس بيقروها غلط ويفتكروا إن الـ TLS أخد ٧٥.

اللي هتلاحظه غالبًا: الـ DNS صغير جدًا (ممكن قريب من الصفر لو متكاش)، والـ TCP والـ TLS بيكبروا كل ما السيرفر يبعد عنك جغرافيًا لأنهم round trips، والـ ttfb بيكبر لو الصفحة ديناميك والسيرفر بيكلم داتابيز. موقع ورا CDN هيبان فيه tcp صغير لأنك بتكلم أقرب نقطة ليك. ولو [[tls=0]] يبقى الموقع HTTP مش HTTPS.

وفي تبويب Timing في المتصفح هتلاقي نفس الأسامي: DNS Lookup و Initial connection و SSL و Waiting for server response (ده الـ TTFB) و Content Download. ولو الطلب مفيهوش DNS ولا connection خالص، ده معناه إن المتصفح استخدم اتصال مفتوح قبل كده (keep-alive)، ودي نقطة حلوة تقولها في الانترفيو.`
        },
        {
          cmd: "reliable ولا fast",
          title: "إيه الفرق بين TCP و UDP؟ وإمتى تختار كل واحد؟ (TCP vs UDP)",
          desc: R`TCP بيفتح اتصال الأول (handshake)، وبيضمن إن البيانات توصل كاملة وبالترتيب، وبيعيد إرسال اللي ضاع، وبيظبط السرعة على قد الشبكة. UDP بيبعت packets على طول من غير اتصال ومن غير ضمانات، فأسرع وأخف بس ممكن حاجة تضيع أو توصل متلخبطة.

عشان كده الويب والـ APIs والداتابيز والإيميل على TCP لأن ولا byte ينفع يضيع. والمكالمات والـ streaming المباشر والألعاب والـ DNS على UDP، لأن packet متأخرة ملهاش لازمة أصلًا، والأحسن تكمّل. و HTTP/3 مبني على QUIC اللي شغال فوق UDP وبيعمل الموثوقية بنفسه.`,
          example: R`// احفظه udp-tcp.mjs وشغّله: node udp-tcp.mjs (مفيش حد سامع على 9999)
import dgram from "node:dgram";
import net from "node:net";
const u = dgram.createSocket("udp4");
u.send("ping", 9999, "127.0.0.1", err => { console.log("UDP sent, err =", err); u.close(); });
net.connect(9999, "127.0.0.1").on("error", e => console.log("TCP:", e.code));
// UDP sent, err = null
// TCP: ECONNREFUSED`,
          try: "شغّل السكربت: UDP «نجح» رغم إن مفيش حد بيسمع، و TCP فشل. بعدين شغّل [[nc -lu 9999]] في ترمنال تاني (لينكس أو WSL) وشوف الـ ping وصل.",
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم إن كل بروتوكول فيه trade-off: الضمانات ليها تمن في السرعة. وبيفتح كلام عن الـ realtime و HTTP/3.",
            how: R`TCP بيدّي كل byte رقم تسلسلي. المستقبل بيرد بـ ACK، ولو الـ ACK مجاش في وقته المرسل بيعيد. وفيه flow control (المستقبل بيقول يقدر ياخد قد إيه) و congestion control (المرسل بيبطّأ لو الشبكة زحمة). والنتيجة stream مرتب من غير فقد، بس لو packet واحدة ضاعت كل اللي بعدها بيستنى (head-of-line blocking).

UDP مجرد رسالة عليها عنوان وبورت. مفيش handshake ولا ترتيب ولا إعادة. التطبيق هو اللي يقرر يعمل إيه لو حاجة ضاعت. عشان كده الـ DNS (سؤال وجواب صغيرين) والمكالمات بيستخدموه.

QUIC (اللي HTTP/3 عليه) بيبني فوق UDP ترتيب وإعادة لكل stream لوحده، وبيدمج الـ TLS في الـ handshake، فالـ packet اللي ضاعت بتعطّل stream واحد بس مش الاتصال كله.`,
            when: "Follow-ups: «ليه الـ DNS بيستخدم UDP؟». «ليه HTTP/3 نقل لـ UDP لو هو مش موثوق؟». «يعني إيه three-way handshake؟». «WebSocket على أنهي فيهم؟» (TCP).",
            mistakes: R`إن UDP «بيضيّع البيانات»: هو مش بيضمن، بس في شبكة كويسة أغلبها بيوصل. وإن TCP «أبطأ دايمًا»: الفرق في الـ handshake وفي الانتظار وقت الفقد. وإن HTTP/3 «مش موثوق» عشان على UDP: QUIC نفسه بيعمل الموثوقية.`
          },
          lines: [
            "موديول UDP في Node.",
            "موديول TCP في Node.",
            "اعمل socket UDP (IPv4).",
            "ابعت «ping» على بورت 9999. مفيش اتصال، فمفيش error حتى لو محدش بيسمع.",
            "حاول تفتح اتصال TCP على نفس البورت: الـ handshake بيفشل بـ ECONNREFUSED."
          ],
          sol: R`أول تشغيل بيطبع بالظبط: [[UDP sent, err = null]] و [[TCP: ECONNREFUSED]]. الـ UDP «نجح» لأن كل اللي عمله إنه رمى الباكت على الشبكة ومش مستني رد، فمعندوش طريقة يعرف إن مفيش حد سامع. أما TCP فبيعمل handshake الأول، والنظام رد بـ RST فعرف على طول.

ولما تشغّل [[nc -lu 9999]] في ترمنال تاني وتعيد السكربت، هتلاقي [[ping]] ظهرت عند nc (من غير سطر جديد، فالـ prompt ممكن يلزق فيها). بس الـ TCP هيفضل ECONNREFUSED، لأن nc بـ [[-u]] سامع على UDP بس، وبورت 9999 TCP وبورت 9999 UDP حاجتين منفصلين. ولو الـ nc عندك النسخة القديمة (traditional) ومش بيسمع، جرّب [[nc -lup 9999]].

الإجابة اللي بتطلع من التجربة دي في الانترفيو: «UDP مبيضمنش إن الداتا وصلت ولا بترتيبها، والتطبيق هو اللي يقرر يعمل إيه لو ضاعت. عشان كده بيتستخدم في الحاجات اللي الباكت القديم فيها ملوش لازمة: مكالمات، ألعاب، DNS، و QUIC اللي بيبني الـ reliability بنفسه فوقه».`
        },
        {
          cmd: "certificate + key exchange",
          title: "الـ HTTPS بيحمي الاتصال إزاي؟ وإيه اللي بيحصل في الـ handshake؟ (How does HTTPS work?)",
          desc: R`HTTPS هو HTTP ماشي جوه TLS. في الـ handshake السيرفر بيبعت الـ certificate بتاعته، والمتصفح بيتأكد إنها موقّعة من جهة موثوقة (CA)، وإنها لنفس الدومين، ومش منتهية. بعدين الطرفين بيتفقوا على مفتاح سري مؤقت، وكل البيانات بعد كده بتتشفر بيه بتشفير symmetric سريع. والنتيجة تلات حاجات: محدش يقرا (تشفير)، ومحدش يعدّل (integrity)، وانت بتكلّم السيرفر الصح (authentication).

والنقطة اللي بتفرّق: التشفير بالـ public/private key بيستخدم في الـ handshake بس (توقيع وتبادل مفاتيح)، لأنه تقيل. البيانات نفسها بتتشفر بـ AES أو ChaCha20.`,
          example: R`curl -svI https://example.com 2>&1 | grep -E "SSL connection|subject|issuer|expire"
openssl s_client -connect example.com:443 -servername example.com -brief </dev/null`,
          try: "شغّل الأمرين على موقعك: نسخة TLS كام؟ ومين الـ issuer؟ والشهادة بتخلص إمتى؟ بعدين دوس على القفل في المتصفح واعرض الـ certificate chain.",
          deep: {
            why: "أي تطبيق فيه login أو دفع لازم HTTPS، والسؤال بيشوف فاهم ليه ولا شايفه «قفل أخضر» وخلاص. والـ follow-ups بتروح للشهادات وانتهائها، ودي مشكلة إنتاج حقيقية.",
            how: R`سلسلة الثقة: شهادة موقعك (leaf) موقّعة من intermediate CA، والـ intermediate موقّعة من root CA متسطّبة جاهزة في نظام التشغيل أو المتصفح. المتصفح بيمشي السلسلة لحد root يعرفه. لو السيرفر مبيبعتش الـ intermediate، بعض الأجهزة هتقول الشهادة مش موثوقة.

تبادل المفاتيح في TLS 1.3 بـ (EC)DHE: كل طرف بيعمل مفتاح مؤقت، ومن الاتنين بيطلع سر مشترك من غير ما يتبعت على الشبكة. والسيرفر بيوقّع على الـ handshake بالـ private key بتاعه عشان يثبت إنه صاحب الشهادة. وده بيدّي forward secrecy: لو الـ private key اتسرق بعدين، الجلسات القديمة المتسجلة متتفكش.

و TLS 1.3 بيخلّص الـ handshake في رحلة واحدة (1-RTT) بدل اتنين في 1.2. والـ SNI (اسم الدومين في ClientHello) هو اللي بيخلي سيرفر واحد يخدم شهادات لكذا دومين. وعمليًا الـ TLS بيتقفل غالبًا عند Nginx أو الـ load balancer، والتطبيق وراه بيكلّمه HTTP عادي.`,
            when: "Follow-ups: «يعني إيه certificate chain؟». «الشهادة خلصت، إيه اللي هيحصل وتمنعه إزاي؟» (تجديد تلقائي ومراقبة). «HSTS بيعمل إيه؟». «الـ TLS termination عندك بيحصل فين؟». «إيه هو forward secrecy؟».",
            mistakes: R`إن السيرفر بيشفّر كل البيانات بالـ public key: لأ، ده في الـ handshake بس. وإن القفل معناه الموقع آمن: معناه الاتصال مشفّر، وموقع phishing ممكن يبقى عنده شهادة سليمة. وإنك تقول SSL كأنه المستخدم: SSL اتشال من زمان، والمستخدم TLS 1.2 و 1.3.`
          },
          lines: [
            "اعمل طلب HEAD واطبع تفاصيل الـ TLS بس: النسخة، وصاحب الشهادة، ومين أصدرها، وبتخلص إمتى.",
            "اتصل بـ openssl مباشرة واطبع ملخص: نسخة الـ TLS، والـ cipher، وهل الشهادة اتحققت."
          ],
          sol: R`الأمر الأول هيطلع سطور شبه دي: [[SSL connection using TLSv1.3 / TLS_AES_256_GCM_SHA384 / X25519 / RSASSA-PSS]]، وبعدها [[subject: CN=example.com]] و [[issuer: ...]] و [[expire date: ...]]. والتاني بيطبع [[Protocol version: TLSv1.3]] و [[Ciphersuite]] و [[Verification: OK]] و [[Server Temp Key: X25519]]. أغلب المواقع النهارده TLS 1.3، و [[X25519]] ده الـ key exchange (ECDHE) اللي بيطلع منه مفتاح الجلسة، والشهادة بتثبت بس إن السيرفر هو صاحب الدومين.

الـ issuer غالبًا Let's Encrypt (أسماء زي R10 أو E5) أو Google Trust Services أو Cloudflare، والشهادات دي عمرها قصير (حوالي ٩٠ يوم وبيقل مع الوقت)، فلو لقيت تاريخ الانتهاء قريب فده طبيعي طالما فيه تجديد أوتوماتيك. وفي المتصفح الـ chain بتبقى ٣ مستويات: شهادة الموقع، ثم intermediate، ثم root موجودة جوه نظامك.

النتيجة اللي لازم تاخد بالك منها: لو الـ issuer اسم شركتك أو برنامج antivirus أو proxy، يبقى فيه حد في النص بيفك التشفير ويعيده (TLS interception) والـ root بتاعه متسطب على جهازك. ولو ظهر [[Verification error]] أو [[certificate has expired]]، يبقى الشهادة خلصت أو الـ intermediate مش متبعت من السيرفر.`
        },
        {
          cmd: "multiplexing و QUIC",
          title: "إيه اللي اتغير من HTTP/1.1 لـ HTTP/2 لـ HTTP/3؟",
          desc: R`HTTP/1.1 نص، والاتصال بيخدم طلب واحد في المرة، فالمتصفح بيفتح لحد ٦ اتصالات للدومين. HTTP/2 بقى binary وبيعمل multiplexing: طلبات كتير على اتصال TCP واحد في نفس الوقت، ومعاه ضغط للـ headers. و HTTP/3 ساب TCP واشتغل على QUIC فوق UDP، فالـ packet اللي ضاعت مبتوقفش باقي الطلبات، والـ handshake أسرع لأن TLS 1.3 جزء منه.

والنتيجة العملية: حيل زمان زي إنك تقسّم الملفات على دومينات كتير (domain sharding) بقت بتضر مع HTTP/2. والـ API بتاعك مش محتاج يتغير: نفس الـ methods والـ headers والـ status codes في التلاتة.`,
          example: R`curl -sI --http1.1 https://example.com | head -1
curl -sI --http2 https://example.com | head -1
curl -s -o /dev/null -w "%{http_version}\n" https://www.google.com`,
          try: "افتح Network في المتصفح، ودوس right click على عناوين الأعمدة وفعّل Protocol: هتلاقي h2 و h3 جنب بعض. أي مواقع لسه http/1.1؟",
          deep: {
            why: "بيبيّن إنك فاهم ليه الأداء اتحسن مع الوقت، وإن مشاكل زي head-of-line blocking بتتحل على مستويات مختلفة.",
            how: R`في HTTP/1.1 لو طلب بطيء، اللي بعده على نفس الاتصال بيستنى (head-of-line blocking على مستوى HTTP). الحل كان اتصالات كتير، وكل اتصال ليه handshake.

HTTP/2 بيقسّم كل طلب ورد لـ frames صغيرة ليها stream id، وبيخلطهم على اتصال واحد، وبيضغط الـ headers المتكررة (HPACK). بس لسه على TCP: لو packet ضاعت، TCP بيوقف كل الـ streams لحد ما ترجع (head-of-line blocking على مستوى TCP). والـ server push اللي كان فيه اتشال عمليًا من المتصفحات.

HTTP/3 على QUIC: كل stream مستقل، فالفقد بيأثر على stream واحد. والاتصال ليه connection id مش مربوط بالـ IP، فلو اتنقلت من Wi-Fi لـ 4G الاتصال بيكمّل. والمتصفح بيعرف إن السيرفر بيدعم HTTP/3 من header اسمه [[Alt-Svc]] أو من DNS.`,
            when: "Follow-ups: «يعني إيه head-of-line blocking؟». «ليه HTTP/3 على UDP؟». «محتاج تغيّر كود الـ API عشان HTTP/2؟» (لأ، ده شغل السيرفر أو Nginx أو الـ CDN).",
            mistakes: R`إن HTTP/2 «أسرع في كل حاجة» من غير ما تعرف ليه. وإن HTTP/3 مش موثوق عشان UDP. وإنك محتاج تغيّر الـ API. و [[--http3]] في curl مش شغال في كل النسخ، فمتقلقش لو الأمر فشل عندك.`
          },
          lines: [
            "اطلب بـ HTTP/1.1 واطبع أول سطر من الرد (النسخة والـ status).",
            "نفس الطلب بـ HTTP/2.",
            "اطبع النسخة اللي curl واتفق عليها فعلًا مع السيرفر."
          ],
          sol: R`أوامر curl هتطلع [[HTTP/1.1 200 OK]] ثم [[HTTP/2 200]] (في HTTP/2 مفيش كلمة OK، الـ reason phrase اتشالت)، والتالت هيطبع [[2]] مش 3. ده مش معناه إن جوجل مبيدعمش HTTP/3: curl مبيجربش h3 إلا لو قلتله [[--http3]] (ولو متبني بدعمه)، أما المتصفح فبيعرف إن الموقع بيدعم h3 من header اسمه [[alt-svc]] في أول رد، وبعدين بيحوّل.

في عمود Protocol هتلاقي [[h3]] على جوجل ويوتيوب وأغلب اللي ورا Cloudflare، و [[h2]] على مواقع كتير، وساعات أول طلب h2 واللي بعده h3 (بسبب alt-svc اللي فوق). اللي لسه [[http/1.1]] غالبًا: الـ dev server بتاعك على localhost (المتصفحات مبتعملش h2 من غير TLS)، وسيرفرات قديمة، وبعض الـ APIs والـ analytics.

النقطة اللي تقولها: HTTP/2 حل head-of-line blocking على مستوى HTTP بالـ multiplexing على اتصال واحد، بس لسه موجود على مستوى TCP (باكت ضايعة بتوقف كل الـ streams). HTTP/3 نقل على QUIC فوق UDP عشان كل stream يبقى مستقل، والـ handshake بقى أقصر.`
        }
      ]
    },
    {
      t: "HTTP و REST",
      l: 1,
      n: "أسئلة بتيجي في كل انترفيو backend أو full-stack تقريبًا. الإجابة الصح هنا بتفرّق بين حد بيستخدم الـ API وحد بيصممه",
      items: [
        {
          cmd: "safe و idempotent",
          title: "إيه الفرق بين GET و POST و PUT و PATCH و DELETE؟ وأنهي فيهم تقدر تكرره بأمان؟",
          desc: R`GET بيقرا، و POST بيعمل حاجة جديدة، و PUT بيستبدل الـ resource كله، و PATCH بيعدّل جزء منه، و DELETE بيمسح. الـ safe يعني مبيغيّرش حاجة على السيرفر: GET و HEAD و OPTIONS. والـ idempotent يعني تبعته مرة أو عشرة والأثر على السيرفر واحد: GET و PUT و DELETE. لكن POST لأ، كل مرة ممكن يعمل order جديد، و PATCH مش مضمون.

وده مهم عمليًا في الـ retries: لو الشبكة قطعت ومش عارف الطلب وصل ولا لأ، تعيد PUT من غير قلق. لكن POST بتاع دفع لازم له [[Idempotency-Key]]، عشان العميل ميتحاسبش مرتين.`,
          example: R`curl -X GET    https://api.example.com/orders/42
curl -X POST   https://api.example.com/orders -H "Content-Type: application/json" -d '{"item":"book"}'
curl -X PUT    https://api.example.com/orders/42 -H "Content-Type: application/json" -d '{"item":"pen","qty":2}'
curl -X PATCH  https://api.example.com/orders/42 -H "Content-Type: application/json" -d '{"qty":3}'
curl -X DELETE https://api.example.com/orders/42
curl -X POST   https://api.example.com/payments -H "Content-Type: application/json" -H "Idempotency-Key: 7f3c9a1e" -d '{"amount":100}'`,
          try: "على API عندك: ابعت نفس الـ POST مرتين وشوف اتعمل كام صف في الداتابيز. بعدين ابعت نفس الـ PUT مرتين وقارن.",
          deep: {
            why: "بيختبر إنك بتصمم API مش بس بتستخدمه. والـ idempotency بالذات بتفرق في الدفع والـ webhooks والـ retries، ودي حاجات بتحصل في الإنتاج كل يوم.",
            how: R`التعريفات دي من مواصفة HTTP نفسها (RFC 9110). الـ safe methods مفروض متغيرش حالة، عشان كده المتصفح والـ crawlers بيعملوا GET براحتهم (prefetch، ومعاينة لينكات). والـ idempotency عن الأثر على السيرفر مش عن الرد: أول DELETE يرجّع 204 والتاني 404، بس في الحالتين الـ order ممسوح، فهو idempotent.

PUT مفروض يبعت الـ resource كله. لو بعت جزء بس، الباقي المفروض يتشال. و PATCH بيبعت التغيير بس، وممكن يبقى idempotent ([[{"qty":3}]]) أو لأ ([[{"op":"increment"}]]).

الـ Idempotency-Key: العميل بيعمل ID عشوائي للعملية ويبعته في header. السيرفر يخزّن المفتاح مع الرد أول مرة، ولو المفتاح اتكرر يرجّع نفس الرد من غير ما ينفّذ تاني. Stripe بيشتغل كده، ونفس الفكرة في استقبال webhooks: خزّن الـ event id وتجاهل المكرر.`,
            when: "Follow-ups: «DELETE تاني مرة بيرجّع 404، يبقى مش idempotent؟». «إزاي تخلي POST idempotent؟». «ليه GET مينفعش يغيّر داتا؟». «PUT ولا PATCH لتعديل الإيميل بس؟». «الـ webhook وصل مرتين، تعمل إيه؟».",
            mistakes: R`إن idempotent معناها «نفس الرد»: معناها نفس الأثر. وإن PUT و POST «نفس الحاجة». وإنك تعمل [[GET /deleteUser?id=5]]: أي prefetch أو bot هيمسح يوزرز. وإنك تعمل retry تلقائي لـ POST من غير idempotency key.`
          },
          lines: [
            "اقرا order رقم 42. safe و idempotent.",
            "اعمل order جديد. كل مرة تبعته يتعمل واحد كمان.",
            "استبدل الـ order كله بالنسخة دي. تكراره مبيغيّرش حاجة.",
            "عدّل الكمية بس. هنا idempotent لأنه بيحط قيمة ثابتة.",
            "امسح الـ order. التانية هترجّع 404 بس الحالة واحدة.",
            "دفع بـ POST ومعاه مفتاح: لو اتبعت تاني بنفس المفتاح السيرفر يرجّع نفس النتيجة من غير ما يدفع تاني."
          ],
          sol: R`المتوقع: الـ POST مرتين يعمل صفين في الداتابيز بـ id مختلف، والرد [[201]] في المرتين. والـ PUT مرتين يسيب صف واحد بنفس الحالة بالظبط، والرد [[200]] (أو 204) في المرتين. ده تعريف idempotent: نتيجة المرة العاشرة على السيرفر زي نتيجة المرة الأولى، حتى لو الرد نفسه اختلف (DELETE مرتين: أول مرة 204 والتانية 404، بس الحالة واحدة: الأوردر مش موجود).

لو الـ PUT عندك عمل صف جديد كل مرة، يبقى انت معمله زي POST، وده غلط في التصميم. ولو الـ POST التاني اترفض أو معملش صف، يبقى عندك unique constraint أو Idempotency-Key، وده كويس لو مقصود (زي الدفع)، ولو مش مقصود يبقى فيه validation بيمنع حاجة المفروض تتكرر.

وفي الانترفيو اربطها بالحالة الحقيقية: «اليوزر داس Pay مرتين والنت فصل. الـ POST مش idempotent، فبنبعت Idempotency-Key من الكلاينت، والسيرفر يخزنه ولو شافه تاني يرجّع نفس الرد القديم من غير ما يدفع تاني».`
        },
        {
          cmd: "1xx لحد 5xx",
          title: "اشرح عائلات الـ status codes، وإيه الفرق بين 401 و 403؟",
          desc: R`أول رقم بيقول القصة: 1xx معلومة (زي 101 لما الاتصال يتحول WebSocket)، و 2xx نجح، و 3xx روح مكان تاني أو استخدم نسختك المتكاشة، و 4xx الغلط من العميل، و 5xx الغلط من السيرفر. وأشهرهم: 200 و 201 Created و 204 من غير body، و 301 و 302 و 304، و 400 و 401 و 403 و 404 و 409 تعارض و 422 validation و 429 طلبات كتير، و 500 و 502 و 503 و 504.

401 يعني «مش عارف انت مين»: مفيش توكن أو التوكن غلط أو خلص، فسجّل دخول. 403 يعني «عارفك، بس مش مسموحلك». والاسم في الـ spec ملخبط: 401 اسمه Unauthorized بس معناه الحقيقي unauthenticated.`,
          example: R`// requireAuth بيرجّع 401 لو مفيش session
app.get("/orders/:id", requireAuth, async (req, res) => {
  const order = await db.order.findUnique({ where: { id: req.params.id } });
  if (!order) return res.status(404).json({ error: "not found" });
  if (order.userId !== req.user.id) return res.status(403).json({ error: "forbidden" });
  res.json(order);
});
app.post("/orders", requireAuth, async (req, res) => {
  const order = await db.order.create({ data: { item: req.body.item, userId: req.user.id } });
  res.status(201).location($__bt/orders/$__{order.id}$__bt).json(order);
});`,
          try: "اعمل [[curl -i]] على API عندك من غير توكن، وبتوكن يوزر عادي على route للأدمن، وبـ id مش موجود. هل الأرقام 401 و 403 و 404؟",
          flag: "script",
          deep: {
            why: "الـ status code عقد بين السيرفر وأي حد بيكلّمه: الـ frontend، والكاش، والمونيتورنج، والـ retries. رقم غلط بيكسر كل ده في صمت.",
            how: R`502 Bad Gateway: الـ proxy (Nginx مثلًا) وصل للتطبيق بس جاله رد بايظ أو التطبيق واقع. 504 Gateway Timeout: التطبيق مردّش في الوقت. 503: السيرفر مش قادر دلوقتي (صيانة أو ضغط)، وممكن يبعت [[Retry-After]].

301 و 308 نقل دايم، و 302 و 307 مؤقت. الفرق إن 307 و 308 بيضمنوا إن الـ method والـ body ميتغيروش (POST يفضل POST). و 304 Not Modified معناها «نسختك المتكاشة لسه سليمة» ومفيش body.

409 Conflict لما الطلب بيتعارض مع الحالة (إيميل متسجل قبل كده). و 422 (اسمها دلوقتي Unprocessable Content) لما الـ JSON سليم بس القيم غلط، وفرق كتير بيستخدموا 400 للاتنين، والمهم تكون ثابت. و 429 مع rate limiting.`,
            when: "Follow-ups: «إمتى ترجّع 404 بدل 403؟» (لما متحبش تكشف إن الحاجة موجودة أصلًا). «الفرق بين 502 و 504؟». «301 ولا 308؟». «400 ولا 422؟». «fetch بيرمي error على 500؟».",
            mistakes: R`ترجّع 200 مع [[{ success: false }]] لكل حاجة. وتخلط 401 و 403. وترجّع 500 لغلط validation (ده غلط العميل، يبقى 4xx). وتفتكر إن [[fetch]] بيرمي error على 404 أو 500: مبيرميش، لازم تشيك [[res.ok]].`
          },
          lines: [
            "route يجيب order واحد. requireAuth قبله بيرجّع 401 لو اليوزر مش معروف.",
            "هات الـ order من الداتابيز.",
            "مش موجود: 404.",
            "موجود بس مش بتاعك: 403.",
            "كله تمام: 200 مع الداتا (الافتراضي).",
            "قفلة الـ route.",
            "route يعمل order جديد.",
            "اعمله بالحقول المسموحة بس، وصاحبه اليوزر الحالي.",
            "201 Created، ومعاه header [[Location]] بعنوان الحاجة الجديدة.",
            "قفلة."
          ],
          sol: R`الـ API مكتوب صح لو الـ [[curl -i]] طلّع أول سطر: [[HTTP/1.1 401 Unauthorized]] من غير توكن، و [[HTTP/1.1 403 Forbidden]] بتوكن يوزر عادي على route الأدمن، و [[HTTP/1.1 404 Not Found]] للـ id اللي مش موجود. الفرق اللي تحفظه: 401 = «معرفش انت مين، سجّل دخول»، و 403 = «عارف انت مين، ومش مسموحلك».

النتايج الغلط الشائعة: 403 من غير توكن (المفروض 401)، أو 200 وجوه الـ body [[{ error: ... }]] (الكلاينت والـ monitoring مش هيعرفوا إن فيه مشكلة)، أو 500 للـ id المش موجود. الأخيرة بتحصل كتير لما الـ id مش بالشكل الصح (مثلًا مش UUID) والـ ORM يرمي error محدش عمله catch: المفروض 400 أو 404.

استثناء تقدر تقوله: بعض الـ APIs بترجّع 404 بدل 403 على موارد يوزر تاني عمدًا، عشان متأكدش للمهاجم إن الـ id ده موجود. ده مقبول طالما قرار مقصود.`
        },
        {
          cmd: "resources + verbs + stateless",
          title: "يعني إيه API يبقى RESTful؟ (What are REST principles?)",
          desc: R`REST أسلوب لتصميم الـ API: كل حاجة resource ليها URL اسمه اسم مش فعل ([[/orders/42]] مش [[/getOrder]])، والفعل هو الـ HTTP method، والرد status code صح وتمثيل للـ resource (غالبًا JSON). والسيرفر stateless: كل طلب شايل كل اللي محتاجه زي التوكن، فأي نسخة من السيرفر تقدر ترد عليه. وده اللي بيسهّل الكاش والـ scaling.

وفي الانترفيو ضيف الحاجات العملية: أسماء جمع، و nesting خفيف ([[/users/7/orders]])، و pagination و filtering بـ query params، و versioning ([[/v1]])، وشكل ثابت للأخطاء. التفاصيل في تاب «APIs متقدمة».`,
          example: R`GET    /v1/orders?status=paid&page=2&limit=20
GET    /v1/orders/42
POST   /v1/orders
PATCH  /v1/orders/42
DELETE /v1/orders/42
GET    /v1/users/7/orders
POST   /v1/orders/42/refunds`,
          try: "صمّم على الورق endpoints لمكتبة فيها كتب ومؤلفين واستعارات: اللستة، والبحث، والاستعارة، والإرجاع. وخلي بالك إن «إرجاع كتاب» action: هتعمله resource ولا PATCH؟",
          flag: "script",
          deep: {
            why: "أغلب الشغل full-stack هو تصميم APIs واستخدامها. والإنترفيوير عايز يشوف إنك بتفكر في resources واضحة وعقد ثابت، مش endpoint لكل زرار في الـ UI.",
            how: R`REST جه من رسالة دكتوراه لـ Roy Fielding سنة 2000، وفيها قيود: client-server، و stateless، و cacheable، و uniform interface، و layered system (ممكن proxies وكاش في النص من غير ما العميل يعرف)، و code on demand (اختياري).

الـ uniform interface فيه جزء اسمه HATEOAS: الرد نفسه بيحط لينكات للخطوات الجاية. أغلب الـ APIs اللي بنسميها REST مبتعملوش، فهي عمليًا «HTTP JSON APIs». قولها بصراحة لو اتسألت، ده بيبيّن إنك فاهم.

الـ actions اللي مش CRUD: يا إما تعملها sub-resource ([[POST /orders/42/refunds]] بيعمل refund جديد له id)، يا إما تغيير حالة ([[PATCH /orders/42]] بـ [[{"status":"cancelled"}]]). والـ stateless مش معناه مفيش داتابيز: معناه إن السيرفر مبيفتكرش حاجة عن العميل بين طلب والتاني في الذاكرة.`,
            when: "Follow-ups: «REST ولا GraphQL؟». «بتعمل versioning إزاي؟». «pagination بـ offset ولا cursor؟». «إيه هو HATEOAS؟». «action زي cancel تعملها إزاي؟».",
            mistakes: R`أفعال في الـ URL ([[/createUser]]، [[/deleteOrder/5]]). وكل حاجة POST. وتخزين الـ session في ذاكرة process واحدة، فأول ما تشغّل نسختين اليوزر يطلع logged out كل شوية. وإنك تقول REST يعني JSON: REST مش مربوط بفورمات.`
          },
          lines: [
            "لستة الـ orders، متفلترة ومقسّمة صفحات بـ query params.",
            "order واحد بالـ id.",
            "اعمل order جديد، والرد 201.",
            "عدّل جزء من الـ order.",
            "امسح الـ order.",
            "nesting خفيف: orders بتاعة يوزر معين.",
            "action اتحولت resource: refund جديد للـ order ده."
          ],
          sol: R`التصميم الكويس كله أسماء (nouns) بالجمع، والأفعال هي الـ HTTP methods. الإرجاع أنضف حل ليه إنك تعامل «الاستعارة» نفسها كـ resource ليها حالة: الإرجاع [[PATCH /loans/:id]] بـ [[returnedAt]]، أو [[POST /loans/:id/return]] لو الإرجاع بيعمل حاجات جانبية (غرامة تأخير، أو تبليغ اللي في قايمة الانتظار). الاتنين مقبولين لو قلت السبب.

الإجابات الغلط: [[POST /returnBook]] أو [[GET /borrow?bookId=5]] (فعل في الـ URL، و GET بيغيّر داتا)، أو [[DELETE /loans/:id]] للإرجاع لأنك كده بتمسح تاريخ الاستعارة. وخلي بالك من الحالة: استعارة كتاب مستعار أصلًا ترجع [[409 Conflict]]، والاستعارة الجديدة ترجع [[201]] ومعاها Location.`,
          solCode: R`# الكتب والمؤلفين
GET    /v1/books?q=clean+code&authorId=12&available=true&page=1&limit=20
GET    /v1/books/42
POST   /v1/books                      # أدمن
GET    /v1/authors/12
GET    /v1/authors/12/books
# الاستعارة resource ليها حالة
POST   /v1/loans            {"bookId": 42}          → 201 + Location: /v1/loans/900 | 409 لو مستعار
GET    /v1/users/me/loans?status=active
PATCH  /v1/loans/900        {"returnedAt": "2026-09-29T10:00:00Z"}   → 200
# أو لو الإرجاع فيه منطق جانبي (غرامة، قايمة انتظار)
POST   /v1/loans/900/return                           → 200`
        },
        {
          cmd: "Cache-Control و ETag",
          title: "إزاي تخلي المتصفح والـ CDN يحتفظوا بنسخة من الرد صح؟ وإزاي تجبرهم يجيبوا الجديد؟",
          desc: R`[[Cache-Control]] هو المتحكم: [[max-age=3600]] يعني استخدم النسخة دي ساعة من غير ما تسأل، و [[no-cache]] يعني خزّن بس اسأل السيرفر كل مرة، و [[no-store]] متخزّنش خالص، و [[private]] للمتصفح بس مش للـ CDN. ولما النسخة تقدم المتصفح بيسأل بـ [[If-None-Match]] ومعاه الـ ETag، ولو مفيش تغيير السيرفر يرد 304 من غير body.

القاعدة العملية: الملفات اللي في اسمها hash ([[app.3f9a1c.js]]) تتكاش سنة بـ [[immutable]] لأن أي تغيير هيطلّع اسم جديد، والـ HTML [[no-cache]]، وردود الـ API اللي فيها داتا يوزر [[private, no-store]].`,
          example: R`curl -sI https://example.com/assets/app.3f9a1c.js | grep -i cache-control
# cache-control: public, max-age=31536000, immutable
curl -sI https://example.com/ | grep -i -E "cache-control|etag"
curl -sI https://example.com/ -H 'If-None-Match: "abc123"' | head -1
# لو الـ ETag هو نفسه: HTTP/2 304`,
          try: "في Network افتح موقع مرتين واقرا عمود Size: هتلاقي memory cache و disk cache و 304. اعرف أنهي ملفات اتكاشت بـ max-age وأنهي اتسألت بـ ETag.",
          deep: {
            why: "الكاش أرخص تحسين أداء، وأخطر حاجة لو اتعمل غلط: يا الموقع يفضل على نسخة قديمة بعد الـ deploy، يا داتا يوزر تظهر ليوزر تاني من الـ CDN.",
            how: R`فيه مرحلتين: freshness و validation. طول ما النسخة fresh (جوه الـ max-age) المتصفح بيستخدمها من غير أي طلب. بعد كده بتبقى stale، فبيعمل conditional request: [[If-None-Match]] بالـ ETag، أو [[If-Modified-Since]] بالتاريخ. السيرفر يقارن، ولو زي ما هي يرد 304 وخلاص، فبتوفر الـ body بس مش الرحلة.

[[s-maxage]] مدة خاصة بالـ shared caches زي الـ CDN. و [[stale-while-revalidate=60]] بيقول: اعرض القديم فورًا وجدّده في الخلفية. و [[Vary: Accept-Encoding]] بيقول للكاش «خزّن نسخة لكل قيمة من الـ header ده» (نسخة gzip ونسخة br).

والكاش مش في المتصفح بس: فيه CDN، و reverse proxy، وكاش تطبيق في Redis، وكاش داتابيز. في system design قول الطبقة بالظبط. والتفاصيل في تاب «APIs متقدمة».`,
            when: "Follow-ups: «عملت deploy واليوزرز لسه شايفين القديم، ليه؟». «الفرق بين no-cache و no-store؟». «إيه هو Vary؟». «تكاش فين: المتصفح ولا الـ CDN ولا Redis؟». «cache invalidation بتعملها إزاي؟».",
            mistakes: R`إن [[no-cache]] معناها متكاشش: معناها خزّن واسأل قبل ما تستخدم. وكاش للـ HTML بـ max-age طويل. و [[public]] على رد فيه داتا يوزر فالـ CDN يوزّعها. وتغيّر ملف JS من غير ما اسمه يتغير وهو متكاش سنة.`
          },
          lines: [
            "بص على الـ Cache-Control بتاع ملف فيه hash في اسمه.",
            "بص على الـ Cache-Control والـ ETag بتوع صفحة HTML.",
            "اسأل «اتغيرت من ساعة الـ ETag ده؟»: لو لأ الرد 304 من غير body."
          ],
          sol: R`أول مرة كل الملفات هتبقى Size بحجم حقيقي (اتنزلت). في الـ reload العادي: ملفات الـ JS والـ CSS اللي اسمها فيه hash (زي [[app.3f9a1c.js]]) هتلاقيها [[(memory cache)]] أو [[(disk cache)]] ومفيش طلب راح للسيرفر أصلًا، ودي اللي عليها [[max-age=31536000, immutable]]. أما الـ HTML نفسه فغالبًا Status [[304]] وحجمه صغير: المتصفح سأل بـ [[If-None-Match]] والسيرفر قال «زي ما هو»، ودي اللي عليها [[no-cache]] أو [[max-age=0]] ومعاها ETag.

memory cache يعني الملف كان لسه في رام التاب (reload على طول)، و disk cache يعني من الهارد (قفلت التاب وفتحته). عشان تتأكد: دوس على الملف وبص على Response Headers وشوف [[cache-control]] و [[etag]].

النتيجة الغلط الشائعة: كل حاجة 200 بحجمها الكامل. ده غالبًا لأن «Disable cache» متعلّم فوق في Network (بيشتغل طول ما الـ DevTools مفتوحة)، أو إنك عملت hard reload بـ Ctrl+Shift+R، أو إن السيرفر مش باعت أي cache headers خالص.`
        },
        {
          cmd: "same-origin policy",
          title: "الـ frontend بيقول «blocked by CORS policy»: ليه بيحصل، ومين المسؤول يصلّحه؟",
          desc: R`المتصفح عنده same-origin policy: صفحة من origin (protocol + domain + port) مينفعش الـ JavaScript بتاعها يقرا رد من origin تاني، إلا لو السيرفر التاني سمح بـ header اسمه [[Access-Control-Allow-Origin]]. يعني CORS مش حماية للسيرفر، ده السيرفر بيقول للمتصفح «أنا موافق إن الموقع ده يقرا ردودي». عشان كده الحل دايمًا على السيرفر، و curl و Postman مبيتأثروش.

والطلبات «غير البسيطة» (JSON body، أو header زي Authorization، أو PUT و DELETE) بيسبقها preflight بـ [[OPTIONS]]. ولو فيه كوكيز لازم origin محدد مش [[*]] ومعاه [[Access-Control-Allow-Credentials: true]]. الشغل العملي في تاب «المتصفح».`,
          example: R`curl -si -X OPTIONS https://api.example.com/orders -H "Origin: https://app.example.com" -H "Access-Control-Request-Method: POST" | grep -i access-control
# access-control-allow-origin: https://app.example.com
# access-control-allow-methods: GET,POST,PATCH,DELETE
curl -si https://api.example.com/orders -H "Origin: https://evil.example" | grep -i access-control
# (مفيش سطور: المتصفح هيمنع الصفحة دي من قراية الرد، بس الطلب نفسه وصل)`,
          try: "افتح Console على أي موقع واعمل [[fetch]] لـ API بتاعك: شوف الـ error، وشوف في Network إن الطلب وصل وليه رد. بعدين ضيف الـ origin في إعدادات cors وجرّب تاني.",
          deep: {
            why: "أكتر error بيقابل أي حد بيبني frontend و backend منفصلين. والإنترفيوير عايز يعرف إنك فاهم مين بيمنع ومين بيسمح، مش إنك بتنسخ [[cors()]] وخلاص.",
            how: R`الـ origin هو الـ scheme والدومين والبورت مع بعض. [[http://localhost:5173]] و [[http://localhost:3000]] origins مختلفة.

الطلبات البسيطة (GET أو POST بـ form content type ومن غير headers خاصة) بتتبعت على طول، والسيرفر بينفّذها، والمتصفح بس بيخبّي الرد عن الـ JavaScript لو الـ header ناقص. عشان كده CORS لوحده مش حماية من CSRF.

الطلبات التانية: المتصفح يبعت [[OPTIONS]] الأول فيه [[Origin]] و [[Access-Control-Request-Method]] و [[Access-Control-Request-Headers]]، والسيرفر يرد بالمسموح. ولو الرد تمام يبعت الطلب الحقيقي. و [[Access-Control-Max-Age]] بيخلي نتيجة الـ preflight تتكاش شوية.

في التطوير أسهل حل proxy (في Vite أو rewrites في Next.js): الـ frontend يطلب من نفس الـ origin، والـ dev server يوصّل للـ API، فمفيش cross-origin أصلًا.`,
            when: "Follow-ups: «CORS بيحمي من CSRF؟». «ليه Postman شغال والمتصفح لأ؟». «الـ preflight بيتبعت إمتى؟». «إزاي تبعت كوكيز لـ API على دومين تاني؟» ([[credentials: 'include']] و SameSite=None; Secure).",
            mistakes: R`تقول CORS بيحمي الـ API: أي حد بـ curl يقدر يكلّمه. وتحط [[*]] مع credentials (مش هيشتغل). وتعكس أي Origin جاي في الرد من غير قايمة مسموحة، ودي أخطر من [[*]] مع الكوكيز. وتحاول تحلها من الـ frontend بـ [[mode: 'no-cors']]، اللي بيخلي الرد opaque ومتقدرش تقراه أصلًا.`
          },
          lines: [
            "مثّل preflight: «أنا app.example.com وعايز أعمل POST، مسموح؟» واطبع ردود الـ CORS بس.",
            "طلب من origin مش في القايمة: السيرفر مبيرجّعش headers الـ CORS."
          ],
          sol: R`في Console هيطلع error شبه ده بالظبط: [[Access to fetch at 'https://api...' from origin 'https://site...' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.]] والـ fetch يرمي [[TypeError: Failed to fetch]]. وفي Network هتلاقي الطلب اتبعت فعلًا، والسيرفر رد (وممكن تشوف في لوج السيرفر إن الـ route اشتغل)، بس المتصفح مخلّاش الـ JS تقرا الرد. ده أهم حاجة تفهمها: CORS بيحمي قراية الرد في المتصفح، مش السيرفر.

بعد ما تضيف الـ origin (مثلًا [[cors({ origin: "https://site..." })]] في Express)، نفس الـ fetch يرجّع الداتا عادي، وتلاقي في الرد [[access-control-allow-origin]] بنفس الـ origin. ولو الطلب POST بـ JSON هتلاقي قبله طلب [[OPTIONS]] (preflight) لازم هو كمان يرجّع الـ headers.

النتايج الغلط: إنك «تصلّحها» في الـ frontend بـ [[mode: "no-cors"]] (الرد بيبقى opaque ومتقدرش تقرا منه حاجة)، أو extension بيقفل CORS في متصفحك بس. وخلي بالك إن [[*]] مينفعش مع [[credentials: "include"]]: لازم origin محدد و [[Access-Control-Allow-Credentials: true]].`
        }
      ]
    },
    {
      t: "التخزين والـ realtime والـ Auth",
      l: 1,
      n: "فين تحفظ التوكن، وإزاي السيرفر يكلّم العميل من غير ما يسأل، والفرق بين «انت مين» و «مسموحلك بإيه»",
      items: [
        {
          cmd: "HttpOnly cookie",
          title: "تحفظ التوكن فين في المتصفح: كوكي ولا localStorage ولا sessionStorage؟",
          desc: R`الكوكي بتتبعت مع كل طلب للسيرفر لوحدها، وحجمها حوالي 4KB، وتقدر تخليها [[HttpOnly]] فـ JavaScript ميشوفهاش. الـ localStorage حوالي 5MB لكل origin، وبيفضل لحد ما تمسحه، ومبيتبعتش للسيرفر لوحده. والـ sessionStorage زيه بس لكل تاب لوحده وبيروح لما التاب يتقفل. للتوكن: كوكي [[HttpOnly]] و [[Secure]] و [[SameSite]] أأمن، لأن أي XSS يقدر يقرا الـ localStorage ويبعته لبرا.

بس الكوكي بتفتح باب CSRF لأن المتصفح بيبعتها لوحده، والحل [[SameSite=Lax]] أو [[Strict]]، و CSRF token لو محتاج. والـ localStorage مكانه الحاجات غير الحساسة: الثيم، واللغة، ومسودة فورم.`,
          example: R`// في السيرفر (Express): كوكي الـ session
res.cookie("sid", sessionId, { httpOnly: true, secure: true, sameSite: "lax", maxAge: 7 * 24 * 3600 * 1000 });
// في Console المتصفح
document.cookie = "theme=dark; Max-Age=31536000; Path=/; SameSite=Lax";
localStorage.setItem("lang", "ar");
sessionStorage.setItem("checkoutStep", "2");
document.cookie;`,
          try: "بعد ما تعمل login في أي موقع بتاعك، اكتب [[document.cookie]] في Console: لو التوكن ظهر يبقى مش HttpOnly. وافتح نفس الموقع في تاب جديد وشوف sessionStorage فيه إيه.",
          flag: "script",
          deep: {
            why: "مكان التوكن قرار أمني بيتسأل عنه كتير، ومفيش إجابة «صح» واحدة: فيه trade-off بين XSS و CSRF، والإنترفيوير عايز يشوف إنك شايف الاتنين.",
            how: R`الكوكي ليها خصايص: [[Domain]] و [[Path]] بيحددوا تتبعت لمين، و [[Expires]] أو [[Max-Age]] (من غيرهم بتبقى session cookie وتروح مع قفل المتصفح)، و [[HttpOnly]] تمنع [[document.cookie]] يشوفها، و [[Secure]] على HTTPS بس، و [[SameSite]] بتتحكم هل تتبعت مع طلبات جاية من موقع تاني: Strict أبدًا، و Lax مع الـ navigation العادي بس، و None دايمًا (ولازم معاها Secure). وبعض المتصفحات بتعتبر Lax هو الافتراضي لو مكتبتش حاجة.

الـ Web Storage لكل origin لوحده، و API بتاعه synchronous، وحدوده حوالي 5MB للـ localStorage و 5MB للـ sessionStorage حسب MDN. والـ sessionStorage لو فتحت نسخة من التاب بيتنسخ معاها بس بعد كده كل واحد لوحده.

والـ XSS مش بيتحل بإنك تنقل التوكن للكوكي: الكود الخبيث لسه يقدر يبعت طلبات باسم اليوزر من صفحتك. الكوكي بس بتمنعه يسرق التوكن ويستخدمه من برا.`,
            when: "Follow-ups: «بتحمي الكوكي من CSRF إزاي؟». «الـ frontend على دومين والـ API على دومين تاني، الكوكي هتوصل إزاي؟». «refresh token بتحفظه فين؟». «IndexedDB إمتى؟».",
            mistakes: R`إن الكوكي «قديمة وأضعف»: مع HttpOnly هي الأأمن للتوكن. وإن HttpOnly بيحمي من XSS خالص. وتحط بيانات حساسة أو التوكن في localStorage وتقول «مفيش XSS عندنا». و [[SameSite=None]] من غير [[Secure]] فالمتصفح يرفض الكوكي.`
          },
          lines: [
            "السيرفر بيحط كوكي الـ session: JavaScript ميقراهاش، و HTTPS بس، ومبتتبعتش من مواقع تانية في طلبات POST، ومدتها أسبوع (بالمللي ثانية).",
            "كوكي عادية من JavaScript لحاجة مش حساسة زي الثيم، لمدة سنة.",
            "اللغة في localStorage: بتفضل بعد قفل المتصفح.",
            "خطوة الـ checkout في sessionStorage: بتروح مع قفل التاب.",
            "اعرض الكوكيز اللي JavaScript يقدر يشوفها: sid مش هتظهر."
          ],
          sol: R`لو التوكن متحفوظ صح، [[document.cookie]] هيطلع كوكيز زي [[theme=dark]] بس، واسم كوكي الـ session مش موجود فيها رغم إنه ظاهر في Application ← Cookies وعليه علامة HttpOnly. ولو شفت التوكن نفسه في الناتج (أو في localStorage)، يبقى أي XSS على الموقع يقدر يسرقه ويبعته لبرا، وده الجواب اللي الانترفيوير مستنيه.

وفي التاب الجديد: [[sessionStorage.length]] هيطلع 0، لأن الـ sessionStorage لكل تاب لوحده، بس الـ localStorage والكوكيز مشتركين بين كل تابات نفس الـ origin. الاستثناء اللي بيلخبط الناس: لو عملت «Duplicate tab»، المتصفح بينسخ الـ sessionStorage للتاب الجديد.

وتقدر تقول الخلاصة كده: «الـ session token في كوكي HttpOnly و Secure و SameSite، ومع كده لسه محتاج حماية CSRF للطلبات اللي بتغيّر داتا. localStorage للحاجات اللي مش سرية زي الـ theme واللغة».`
        },
        {
          cmd: "اتجاه واحد ولا اتنين",
          title: "عايز تبعت تحديثات لحظية لليوزر: polling ولا WebSocket ولا SSE؟",
          desc: R`الـ polling: العميل بيسأل كل كام ثانية، بسيط بس فيه طلبات كتير فاضية وتأخير. الـ long polling: الطلب بيفضل مفتوح لحد ما يبقى فيه جديد. الـ SSE: اتصال HTTP واحد مفتوح، والسيرفر بيبعت عليه في اتجاه واحد، والمتصفح بيعمل reconnect لوحده. الـ WebSocket: قناة في الاتجاهين بعد upgrade من HTTP، للشات والألعاب والتعاون اللحظي.

وبختار حسب الاتجاه والتكرار: إشعارات وتحديث حالة order وستريم رد AI كلمة كلمة ← SSE. شات أو محرر مشترك ← WebSocket. داتا بتتغير كل كام دقيقة ← polling عادي وخلاص.`,
          example: R`// احفظه sse.mjs وشغّله، وفي ترمنال تاني: curl -N http://localhost:3000
import http from "node:http";
http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" });
  const t = setInterval(() => res.write($__btdata: $__{new Date().toISOString()}\n\n$__bt), 1000);
  req.on("close", () => clearInterval(t));
}).listen(3000);`,
          try: "شغّل السيرفر وتابع بـ [[curl -N]]. بعدين من صفحة على نفس الـ origin (أو ضيف header الـ CORS) جرّب [[new EventSource(url).onmessage = e => console.log(e.data)]]، واقفل السيرفر وافتحه وشوف الـ reconnect لوحده.",
          flag: "script",
          deep: {
            why: "بيختبر إنك بتختار الأداة على قد المشكلة ومش بتحط WebSocket في كل حتة. وبيفتح كلام عن الـ scaling، لأن الاتصالات المفتوحة ليها تمن.",
            how: R`الـ WebSocket بيبدأ كطلب HTTP فيه [[Upgrade: websocket]]، والسيرفر يرد [[101 Switching Protocols]]، وبعدها نفس اتصال الـ TCP بيتحول لقناة frames في الاتجاهين. و [[wss://]] هو النسخة المشفرة.

Socket.IO مش WebSocket صافي: ليه بروتوكول خاص فوقه (rooms، و acks، و reconnect، و fallback لـ polling)، فعميل WebSocket عادي مش هيكلّم سيرفر Socket.IO.

الـ SSE مجرد رد HTTP مبيخلصش بـ content type [[text/event-stream]]، وكل رسالة [[data: ...]] وبعدها سطر فاضي. المتصفح بيعمل reconnect لوحده وبيبعت [[Last-Event-ID]]. على HTTP/1.1 المتصفح بيسمح بحوالي ٦ اتصالات للدومين، فكذا تاب مفتوح ممكن يخلّصهم، و HTTP/2 بيحل ده. وخلي بالك إن Nginx بيعمل buffering للردود، فلازم تقفله للـ SSE.

والـ scaling: الاتصالات دي stateful. لو عندك سيرفرين، يوزر على سيرفر ١ ويوزر على سيرفر ٢ مش هيشوفوا رسايل بعض، فبتحتاج pub/sub مشترك (زي Redis) و sticky sessions أحيانًا. التفاصيل في تاب «APIs متقدمة».`,
            when: "Follow-ups: «هتعمل scale لـ WebSocket على أكتر من سيرفر إزاي؟». «الاتصال وقع، بتعمل إيه في الرسايل اللي فاتت؟». «ليه شات بوتس الـ AI بتستخدم SSE؟». «Socket.IO هو WebSocket؟».",
            mistakes: R`WebSocket لكل حاجة حتى لو التحديثات في اتجاه واحد. وتنسى إن الاتصالات stateful فالرسالة توصل لنص اليوزرز بعد ما تزوّد سيرفر. وتنسى الـ reconnect والرسايل اللي ضاعت وقت الانقطاع. و polling كل ثانية من آلاف اليوزرز على endpoint تقيل.`
          },
          lines: [
            "موديول HTTP في Node.",
            "سيرفر بسيط، ولكل طلب:",
            "رد مبيخلصش من نوع event-stream، ومن غير كاش.",
            "كل ثانية ابعت رسالة: [[data:]] وبعدها سطر فاضي يقفل الرسالة.",
            "لما العميل يقفل، وقّف التايمر عشان متسيبش حاجة شغالة على الفاضي.",
            "اسمع على بورت 3000."
          ],
          sol: R`[[curl -N]] هيطبع سطر [[data: 2026-...Z]] كل ثانية وبينهم سطر فاضي، وده شكل الـ SSE: نص عادي على HTTP، وكل رسالة بتخلص بسطرين جداد. من غير [[-N]] ممكن تشوف السطور بتيجي متجمعة لأن curl بيعمل buffering.

في المتصفح: [[onmessage]] بيطبع الوقت كل ثانية. ولما تقفل السيرفر هيجيلك [[onerror]] و [[readyState]] بـ 0 (يعني CONNECTING مش CLOSED)، والمتصفح يفضل يحاول لوحده كل كام ثانية (حوالي ٣ ثواني في Chrome، أو القيمة اللي السيرفر يبعتها في [[retry:]]). أول ما السيرفر يرجع هيجيلك [[onopen]] والرسايل تكمل من غير ولا سطر كود منك. جربتها في Chromium بالسيرفر اللي تحت: الرسايل وقفت، وجه error مرتين، وبعد ما السيرفر رجع اتفتح الاتصال لوحده.

النتيجة الغلط: [[readyState]] بـ 2 والمتصفح بطّل يحاول. ده بيحصل لو السيرفر رد بـ status غير 200 أو Content-Type مش [[text/event-stream]]، أو لو الصفحة على origin تاني والسيرفر مش باعت [[Access-Control-Allow-Origin]].`,
          solCode: R`// sse.mjs: نفس السيرفر مع CORS و retry
import http from "node:http";
http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "*"
  });
  res.write("retry: 2000\n\n");
  const t = setInterval(() => res.write($__btdata: $__{new Date().toISOString()}\n\n$__bt), 1000);
  req.on("close", () => clearInterval(t));
}).listen(3000);
// في Console أي صفحة:
// const es = new EventSource("http://localhost:3000");
// es.onmessage = e => console.log(e.data);
// es.onerror = () => console.log("error, readyState =", es.readyState);`
        },
        {
          cmd: "authentication و authorization",
          title: "إيه الفرق بين إن السيرفر يعرف انت مين، وإنه يقرر مسموحلك تعمل إيه؟",
          desc: R`الأول: انت مين؟ (باسورد، OAuth، كود OTP، passkey). التاني: مسموحلك بإيه؟ (roles، ملكية، permissions). الأول بيحصل مرة في الـ login ويطلّع session أو token، والتاني لازم يحصل في كل طلب. وغلط التاني هو رقم ١ في OWASP: يوزر يغيّر الـ id في الـ URL ويشوف داتا حد تاني.

لو الأول فشل ترجّع 401، ولو التاني فشل 403. وفيه RBAC (roles زي admin و editor) و ABAC (قواعد على الخصايص، زي «صاحب الـ order بس»)، وأغلب المشاريع بتحتاج الاتنين.`,
          example: R`function requireAuth(req, res, next) {
  const user = verifySession(req.cookies.sid);
  if (!user) return res.status(401).json({ error: "login first" });
  req.user = user;
  next();
}
const requireRole = role => (req, res, next) =>
  req.user.role === role ? next() : res.status(403).json({ error: "forbidden" });
app.delete("/users/:id", requireAuth, requireRole("admin"), deleteUser);`,
          try: "في API عندك: سجّل كيوزر عادي، وخد id بتاع order يوزر تاني من الداتابيز، واطلبه. لو رجع الداتا عندك ثغرة IDOR: صلّحها بإن الـ query نفسها تشمل [[userId]].",
          flag: "script",
          deep: {
            why: "الخلط بينهم أشهر ثغرة في التطبيقات الحقيقية: الـ login سليم، بس أي يوزر مسجّل يقدر يوصل لأي حاجة. والإنترفيوير عايز يسمع إنك بتشيك الصلاحية على السيرفر في كل طلب.",
            how: R`الـ authentication بيطلّع هوية: session id في كوكي والسيرفر شايل الحالة، أو JWT موقّع شايل الهوية جواه. بعد كده كل طلب بيعدّي على middleware يحوّل الكوكي أو التوكن لـ [[req.user]].

الـ authorization بيحصل على مستويات: على الـ route (أدمن بس)، وعلى الـ resource نفسه (صاحب الـ order بس)، وعلى الحقول (اليوزر ميعدّلش [[role]] بتاعه). والأمان الحقيقي في الـ query نفسها: [[where: { id, userId: req.user.id }]] بدل ما تجيب بالـ id وتنسى تشيك.

وفيه طبقة تالتة في الداتابيز نفسها زي Row Level Security في PostgreSQL و Supabase: حتى لو الكود نسي، الداتابيز ترفض. وإخفاء الزرار في الـ UI راحة لليوزر مش حماية. التفاصيل في تاب «الأمان».`,
            when: "Follow-ups: «إزاي تمنع يوزر يشوف order يوزر تاني؟». «الـ checks تحطها في middleware ولا في الـ service؟». «RBAC ولا ABAC؟». «ليه إخفاء الزرار مش كفاية؟». «إيه هو IDOR؟».",
            mistakes: R`تخلط الاتنين، أو تفتكر إن التوكن الصحيح كفاية: التوكن بيثبت انت مين بس. وتعمل الصلاحيات في الـ frontend بس. وتجيب الـ resource بالـ id وخلاص. وتسيب اليوزر يبعت [[role]] أو [[isAdmin]] في الـ body وتحفظه (mass assignment).`
          },
          lines: [
            "middleware بيتأكد إن فيه يوزر.",
            "حوّل كوكي الـ session ليوزر (دالة بتاعتك بتدوّر في الـ sessions).",
            "مفيش يوزر: 401، سجّل دخول.",
            "حط اليوزر على الطلب عشان اللي بعدك يستخدمه.",
            "كمّل للي بعده.",
            "قفلة.",
            "middleware بيتعمل بـ role: بيرجّع middleware.",
            "لو الـ role مطابق كمّل، غير كده 403: عارفينك بس مش مسموحلك.",
            "المسح: لازم يوزر مسجّل، ولازم أدمن، وبعدين الـ handler."
          ],
          sol: R`لو الطلب رجّع order اليوزر التاني بـ 200، دي ثغرة IDOR (أو BOLA بلغة OWASP API)، وهي أشهر ثغرة في الـ APIs. الـ authentication اشتغل (السيرفر عرف انت مين)، بس الـ authorization ناقص: محدش سأل «الأوردر ده بتاعك؟».

الحل إن شرط الملكية يبقى جوه الـ query نفسها، مش [[if]] بعد ما تجيب الداتا وتنسى تكتبه في route تاني. بعد التعديل نفس الطلب يرجع 404 (أو 403 لو عايز تبان إن الأوردر موجود)، وطلب اليوزر لأوردره هو يرجع 200. واختبرها: اكتب test بيعمل login بيوزر ويطلب أوردر يوزر تاني ويتوقع 404، عشان متتفتحش تاني مع أي refactor.`,
          solCode: R`// Prisma: الشرط جوه الـ where
app.get("/orders/:id", requireAuth, async (req, res) => {
  const order = await db.order.findFirst({
    where: { id: req.params.id, userId: req.user.id }
  });
  if (!order) return res.status(404).json({ error: "not found" });
  res.json(order);
});
// نفس الفكرة بـ SQL:
// SELECT * FROM orders WHERE id = $1 AND user_id = $2`
        },
        {
          cmd: "header.payload.signature",
          title: "الـ token اللي شكله xxx.yyy.zzz: جواه إيه، ومين يقدر يقراه، وإيه عيوبه؟",
          desc: R`JWT تلات أجزاء base64url بينهم نقط: header فيه نوع التوقيع (زي HS256)، و payload فيه الـ claims ([[sub]] و [[exp]] و [[role]])، و signature. أي حد يقدر يقرا الـ payload لأنه encoded مش encrypted، بس محدش يقدر يعدّله من غير ما التوقيع يبوظ. فالسيرفر بيتحقق من التوقيع ومن [[exp]] من غير ما يسأل الداتابيز، ودي ميزته: stateless.

وعيبه الكبير: مينفعش تلغيه قبل ما وقته يخلص. عشان كده الـ access token قصير (دقايق) ومعاه refresh token أطول ممكن يتلغي من الداتابيز. والبديل الـ session: ID عشوائي في كوكي والسيرفر شايل الحالة، سهل تلغيه بس محتاج store مشترك لو عندك كذا سيرفر.`,
          example: R`// احفظه jwt.mjs وشغّله: node jwt.mjs
import { createHmac } from "node:crypto";
const b64 = o => Buffer.from(JSON.stringify(o)).toString("base64url");
const header = b64({ alg: "HS256", typ: "JWT" });
const payload = b64({ sub: "42", role: "user", exp: Math.floor(Date.now() / 1000) + 900 });
const sig = createHmac("sha256", "YOUR_SECRET").update($__bt$__{header}.$__{payload}$__bt).digest("base64url");
console.log($__bt$__{header}.$__{payload}.$__{sig}$__bt);
console.log(JSON.parse(Buffer.from(payload, "base64url").toString()));
// { sub: '42', role: 'user', exp: 1790700000 }`,
          try: "شغّل السكربت، وخد التوكن وحطه في jwt.io: هيقراه من غير السر. بعدين غيّر حرف في الـ payload وشوف إن التوقيع بقى invalid. ده الفرق بين encoded و signed.",
          flag: "script",
          deep: {
            why: "JWT في كل مشروع تقريبًا، وأغلب الناس بتستخدمه من غير ما تعرف إنه مقروء أو إنه مبيتلغيش. السؤال بيكشف ده بسرعة.",
            how: R`التوقيع HS256 هو HMAC بسر واحد: نفس السر بيوقّع وبيتحقق، فأي سيرفر بيتحقق لازم يبقى معاه السر. RS256 أو ES256 بمفتاحين: الـ private بيوقّع في سيرفر الـ auth بس، والـ public بيتوزع على أي خدمة تتحقق. ده الأنسب لو فيه أكتر من خدمة.

التحقق الصح: المكتبة تحسب التوقيع وتقارنه، وتشيك [[exp]] و [[nbf]]، ولو محددين [[iss]] و [[aud]]. ولازم تحدد الـ algorithms المسموحة، عشان توكن جاي بـ [[alg: none]] أو algorithm تاني ميتقبلش.

الإلغاء: access token قصير (مثلًا ١٥ دقيقة)، و refresh token متخزن في الداتابيز وبيتغير كل ما يستخدم (rotation)، فالـ logout بيمسح الـ refresh token. ولو محتاج إلغاء فوري: denylist بالـ [[jti]] أو رقم version على اليوزر، وساعتها رجعت تسأل الداتابيز. والتوكن بيتبعت مع كل طلب، فكل claim بتزوّده بيكبّر كل طلب.`,
            when: "Follow-ups: «session ولا JWT؟». «بتعمل logout إزاي بـ JWT؟». «HS256 ولا RS256؟». «refresh token rotation يعني إيه؟». «التوكن ده بتحفظه فين في المتصفح؟».",
            mistakes: R`إن JWT مشفّر فتحط فيه داتا حساسة. و [[jwt.decode]] بدل [[jwt.verify]] (الأولى مبتتحققش من حاجة). ومتحددش الـ algorithms. و access token صالح أسبوع ومفيش طريقة تلغيه. وسر ضعيف زي [[secret123]] بيتكسر brute force من توكن واحد.`
          },
          lines: [
            "HMAC من crypto المدمج في Node.",
            "دالة صغيرة: object ← JSON ← base64url.",
            "الـ header: التوقيع HS256.",
            "الـ payload: اليوزر 42، والـ role، وبيخلص بعد ١٥ دقيقة (بالثواني).",
            "التوقيع: HMAC على «header.payload» بالسر.",
            "التوكن الكامل: تلات أجزاء بنقط.",
            "فك الـ payload من غير أي سر: أي حد يقدر يقراه."
          ],
          sol: R`jwt.io هيعرض الـ header [[{"alg":"HS256","typ":"JWT"}]] والـ payload [[{"sub":"42","role":"user","exp":...}]] من غير أي سر، لأن الجزئين دول base64url بس مش مشفرين. وتحت هيقول Invalid Signature لحد ما تكتب [[YOUR_SECRET]] في خانة الـ secret، ساعتها يقول Signature Verified.

ولما تغيّر حرف في الـ payload (أو تغيّر [[role]] لـ [[admin]] وتعمل encode تاني)، التوقيع مبقاش مطابق، والسيرفر المفروض يرفضه. السكربت اللي تحت بيعمل ده بالظبط وطلّع: [[{ sub: '42', role: 'user', exp: ... }]] للتوكن الأصلي، و [[invalid signature]] للمزوّر. يعني: أي حد يقدر يقرا، بس محدش يقدر يغيّر من غير السر. متحطش في الـ payload حاجة سرية.

الغلط الشائع في الكود: إنك تعمل decode وتصدّق اللي فيه من غير verify، أو تقبل [[alg: "none"]]. وكمان متلزقش توكن production حقيقي في موقع خارجي.`,
          solCode: R`// verify.mjs: التحقق بنفس السر، ومقارنة آمنة
import { createHmac, timingSafeEqual } from "node:crypto";
const SECRET = "YOUR_SECRET";
const b64 = o => Buffer.from(JSON.stringify(o)).toString("base64url");
const sign = data => createHmac("sha256", SECRET).update(data).digest("base64url");
function verify(token) {
  const [h, p, s] = token.split(".");
  const expected = Buffer.from(sign($__bt$__{h}.$__{p}$__bt));
  const got = Buffer.from(s);
  if (got.length !== expected.length || !timingSafeEqual(got, expected)) return "invalid signature";
  const payload = JSON.parse(Buffer.from(p, "base64url").toString());
  if (payload.exp < Date.now() / 1000) return "expired";
  return payload;
}
const header = b64({ alg: "HS256", typ: "JWT" });
const payload = b64({ sub: "42", role: "user", exp: Math.floor(Date.now() / 1000) + 900 });
const token = $__bt$__{header}.$__{payload}.$__{sign($__bt$__{header}.$__{payload}$__bt)}$__bt;
console.log(verify(token));
const forged = b64({ sub: "42", role: "admin", exp: Math.floor(Date.now() / 1000) + 900 });
const [h, , s] = token.split(".");
console.log(verify($__bt$__{h}.$__{forged}.$__{s}$__bt));
// { sub: '42', role: 'user', exp: 1790720945 }
// invalid signature`
        },
        {
          cmd: "authorization code + PKCE",
          title: "زرار «Login with Google» بيشتغل إزاي من جوه؟ (Explain OAuth in one minute)",
          desc: R`OAuth 2.0 بروتوكول تفويض: اليوزر بيدّي تطبيقك صلاحية محددة على حسابه عند provider زي Google من غير ما تشوف الباسورد. تطبيقك بيحوّل اليوزر لصفحة الـ provider، اليوزر يوافق، والـ provider يرجّعه لـ redirect URI عندك ومعاه code قصير العمر، وسيرفرك يبدّل الـ code بـ access token من سيرفر لسيرفر. ولتسجيل الدخول نفسه بنستخدم OpenID Connect فوقه، اللي بيرجّع [[id_token]] (JWT) فيه اليوزر مين.

والـ PKCE بيضيف سر مؤقت: التطبيق يبعت الـ hash بتاعه في الأول، والسر نفسه وقت التبديل، فلو حد سرق الـ code ميقدرش يستخدمه. والـ implicit flow القديم اللي كان بيرجّع التوكن في الـ URL مبقاش مستحسن.`,
          example: R`# ١. تطبيقك يحوّل اليوزر لصفحة الـ provider
GET https://accounts.example.com/authorize?response_type=code&client_id=APP_ID&redirect_uri=https://app.example.com/callback&scope=openid%20email&state=RANDOM&code_challenge=HASH&code_challenge_method=S256
# ٢. اليوزر وافق، والـ provider يرجّعه عندك
GET https://app.example.com/callback?code=SHORT_CODE&state=RANDOM
# ٣. سيرفرك (مش المتصفح) يبدّل الـ code
POST https://accounts.example.com/token  grant_type=authorization_code&code=SHORT_CODE&code_verifier=ORIGINAL_SECRET&redirect_uri=https://app.example.com/callback
{ "access_token": "...", "id_token": "eyJ...", "refresh_token": "...", "expires_in": 3600 }`,
          try: "افتح Network وسجّل دخول بجوجل في أي موقع: تابع الـ redirects وشوف [[response_type=code]] و [[state]] و [[code_challenge]] في الـ URL، والـ [[code]] وهو راجع للـ callback.",
          flag: "script",
          deep: {
            why: "أي تطبيق حديث فيه «Login with Google» أو ربط بخدمة تانية. والسؤال بيكشف هل فاهم إن التوكن مبيعدّيش على المتصفح، وهل تعرف الفرق بين OAuth و OIDC.",
            how: R`الأدوار: resource owner (اليوزر)، و client (تطبيقك)، و authorization server (صفحة الـ login بتاعة الـ provider)، و resource server (الـ API اللي عليه الداتا).

الـ [[state]] قيمة عشوائية بتحفظها قبل الـ redirect وتقارنها وقت الرجوع، عشان محدش يرجّع يوزر لتطبيقك بـ code بتاع حساب تاني (CSRF على الـ callback). والـ [[scope]] بيحدد الصلاحيات. والـ [[redirect_uri]] لازم يطابق بالظبط اللي متسجل عند الـ provider.

الـ access token للـ API بتاع الـ provider، والـ id_token ليك انت عشان تعرف اليوزر مين: تتحقق من توقيعه و [[aud]] بتاعه يساوي الـ client id بتاعك.

وأحدث توصيات أمان OAuth (RFC 9700، يناير 2025): PKCE لكل أنواع العملاء حتى تطبيقات الويب، والـ implicit grant ميتستخدمش، و password grant (اليوزر يدّي تطبيقك الباسورد) ممنوع. التفاصيل في تاب «APIs متقدمة».`,
            when: "Follow-ups: «الفرق بين OAuth و OIDC؟». «فايدة state؟». «فايدة PKCE؟». «تبعت access token ولا id token للـ API بتاعك؟». «ليه code الأول بدل التوكن على طول؟».",
            mistakes: R`تقول OAuth بروتوكول login: هو authorization، و OIDC هو اللي عمل الـ login فوقه. وتحط client secret في الـ frontend أو تطبيق موبايل. وتنسى state. وتقبل أي redirect_uri. وتستخدم access token بتاع جوجل كإثبات هوية في الـ API بتاعك.`
          },
          lines: [
            "رابط التفويض: عايز code، وده تطبيقي، ورجّعني هنا، والصلاحيات دي، ومعاه state و hash الـ PKCE.",
            "الرجوع للـ callback ومعاه code قصير العمر ونفس الـ state.",
            "السيرفر يبدّل الـ code بالتوكنز، ومعاه الـ code_verifier الأصلي.",
            "الرد: access token للـ API، و id token فيه اليوزر مين، و refresh token."
          ],
          sol: R`في Network (فعّل Preserve log عشان الـ redirects متتمسحش) هتلاقي طلب لـ [[accounts.google.com/o/oauth2/v2/auth]] أو شبهه، وفي الـ query: [[response_type=code]] و [[client_id]] و [[redirect_uri]] و [[scope=openid email profile]] و [[state=...]]، وفي مواقع كتير [[code_challenge]] و [[code_challenge_method=S256]]. بعد ما توافق، هتلاقي redirect للموقع على الـ callback وفيه [[code=...]] ونفس الـ [[state]].

اللي مش هتشوفه خالص: الطلب اللي بيبدّل الـ code بالتوكن، لأنه بيحصل من سيرفر الموقع لسيرفر جوجل، مش من المتصفح. ودي النقطة كلها: الـ code قصير العمر ومينفعش لوحده، والـ access token عمره ما عدّى على الـ URL. والـ state بيمنع CSRF على الـ callback، والـ PKCE بيضمن إن اللي بدّل الـ code هو نفس اللي بدأ الطلب.

لو ملقتش [[code_challenge]] فده مش غلط أكيد: تطبيقات السيرفر (confidential clients) بتستخدم client secret، بس النصيحة الحالية إن PKCE يتعمل للكل. ولو لقيت [[#access_token=]] في الـ URL يبقى ده الـ implicit flow القديم اللي مبقاش مستحب. ولو الزرار «Sign in with Google» بيفتح popup ويبعت [[credential=eyJ...]]، ده ID token مباشر من مكتبة جوجل للـ login، مش authorization code.`
        }
      ]
    },
    {
      t: "Git و Linux",
      l: 1,
      n: "أسئلة «هل اشتغلت في فريق وعلى سيرفر بجد؟». الأوامر نفسها بالتفصيل في تاب Git وتاب bash",
      items: [
        {
          cmd: "merge commit ولا history خطي",
          title: "إيه الفرق بين git merge و git rebase؟ وإمتى تستخدم كل واحد؟",
          desc: R`الـ merge بيجمع الـ branchين بـ commit جديد ليه أبين، وبيحافظ على التاريخ زي ما حصل بالظبط. الـ rebase بياخد الـ commits بتاعتك ويعيد كتابتها فوق آخر main، فالتاريخ يبقى خط واحد نضيف، بس الـ commits بتاخد hashes جديدة. والقاعدة الذهبية: متعملش rebase لـ branch حد تاني شغال عليه أو سحبه، لأنك بتعيد كتابة تاريخ مشترك.

عمليًا: rebase على الـ branch بتاعي قبل الـ PR عشان يبقى محدّث ونضيف، و merge (أو squash merge) لما يدخل main.`,
          example: R`git switch feature/login
git fetch origin
git rebase origin/main
git push --force-with-lease
git switch main
git merge --no-ff feature/login
git log --oneline --graph -8`,
          try: "في ريبو تجربة اعمل branch فيه commitين، وعلى main commit تالت. جرّب مرة merge ومرة rebase (بنسخة من الريبو) وقارن [[git log --graph]] في الحالتين.",
          deep: {
            why: "بيختبر إنك اشتغلت في فريق وعارف تحافظ على تاريخ مفهوم من غير ما تبوّظ شغل غيرك.",
            how: R`الـ merge بيدوّر على أقرب جد مشترك، ويعمل 3-way merge، ويطلّع commit ليه أبين. ولو main متحركش من ساعة ما فرّعت، بيعمل fast-forward: بيحرّك المؤشر بس من غير commit جديد، و [[--no-ff]] بيجبره يعمل merge commit عشان الـ feature تفضل باينة في التاريخ.

الـ rebase بياخد كل commit بتاعك كـ patch ويطبّقه واحد واحد فوق الـ base الجديدة. عشان كده ممكن يوقفك عند conflict في كل commit، وكل commit بيطلع بـ hash جديد. الـ branch القديم بقى تاريخ تاني، فلازم push بـ force. و [[--force-with-lease]] بيرفض لو حد عمل push على الـ branch من ساعة ما سحبت، فمبتمسحش شغله.

و [[git rebase -i]] بيخليك تدمج commits صغيرة (squash) وتعدّل رسايل قبل الـ PR. و squash merge في GitHub بيحوّل الـ PR كله لـ commit واحد على main. ولو حاجة باظت، [[git reflog]] بيرجّعك لأي نقطة. التفاصيل في تاب Git: [[git rebase]].`,
            when: "Follow-ups: «عملت rebase على branch مشترك وحصلت مشكلة، ترجع إزاي؟» (reflog). «squash merge إمتى؟». «ليه --force-with-lease مش --force؟». «git pull --rebase بيعمل إيه؟».",
            mistakes: R`إن rebase «أحسن» دايمًا. و [[git push --force]] على main أو branch مشترك. وإن الـ merge commits «وسخة»: ساعات هي التاريخ الحقيقي اللي محتاجه عشان تعرف الـ feature دخلت إمتى.`
          },
          lines: [
            "روح على الـ branch بتاعك.",
            "هات آخر حاجة من الـ remote من غير ما تدمج.",
            "أعد كتابة commits بتاعتك فوق آخر main.",
            "ارفع التاريخ الجديد بـ force، بس يرفض لو حد رفع حاجة في النص.",
            "ارجع لـ main.",
            "ادمج الـ feature بـ merge commit حتى لو ينفع fast-forward.",
            "شوف شكل التاريخ كرسمة."
          ],
          sol: R`بعد الـ merge الـ graph بيبان فيه فرعين بيتقابلوا في commit جديد اسمه [[Merge branch 'feature']]، والـ commits القديمة زي ما هي بنفس الـ hashes. بعد الـ rebase (وبعده fast-forward) الـ history خط واحد: [[init]] ثم [[main: hotfix]] ثم commits الـ feature فوقه، ومفيش merge commit. شغلت السكربت اللي تحت وطلّع ده بالظبط.

الحاجة اللي لازم تلاحظها: الـ commits بتاعة الـ feature بعد الـ rebase ليها hashes جديدة (قارن [[git log --oneline]] قبل وبعد)، لأن الـ rebase بيعمل commits جديدة فوق أساس جديد. عشان كده الـ branch لو كان متعمله push لازم [[--force-with-lease]]، ومتعملش rebase لـ branch حد تاني شغال عليه. ولو الـ merge طلع خط واحد برضو، ده لأن main مكانش فيه commit جديد فـ git عمل fast-forward: استخدم [[--no-ff]] لو عايز merge commit دايمًا.`,
          solCode: R`# merge-vs-rebase.sh
set -e
rm -rf demo && mkdir demo && cd demo && git init -q -b main
git config user.name you && git config user.email you@example.com
echo a > a.txt && git add . && git commit -qm "init"
git switch -qc feature
echo f1 > f1.txt && git add . && git commit -qm "feat: one"
echo f2 > f2.txt && git add . && git commit -qm "feat: two"
git switch -q main
echo m > m.txt && git add . && git commit -qm "main: hotfix"
cd .. && rm -rf merge-copy rebase-copy && cp -r demo merge-copy && cp -r demo rebase-copy
echo "=== merge"
cd merge-copy && git merge -q --no-edit feature && git log --oneline --graph --format="%s" && cd ..
echo "=== rebase"
cd rebase-copy && git switch -q feature && git rebase -q main && git switch -q main && git merge -q --ff-only feature && git log --oneline --graph --format="%s"
# === merge
# *   Merge branch 'feature'
# |\
# | * feat: two
# | * feat: one
# * | main: hotfix
# |/
# * init
# === rebase
# * feat: two
# * feat: one
# * main: hotfix
# * init`
        },
        {
          cmd: "افهم الطرفين وبعدين اختار",
          title: "حصل conflict وانت بتدمج: بتعمل إيه خطوة بخطوة؟",
          desc: R`الـ conflict بيحصل لما نفس السطور اتغيرت في الـ branchين. Git بيوقف ويحط علامات [[<<<<<<<]] و [[=======]] و [[>>>>>>>]] في الملف. بفتح الملف، وأفهم كل تغيير كان عايز يعمل إيه (من الـ log أو أسأل صاحبه)، وأكتب النسخة الصح اللي غالبًا فيها الاتنين، وأشيل العلامات، وأشغّل الاختبارات، وبعدين [[git add]] و [[git merge --continue]]. ولو اتلخبطت، [[git merge --abort]] يرجّعني لقبل الدمج.

والأهم إزاي أقلله: branches قصيرة العمر، وأسحب من main كتير، و PRs صغيرة، و formatter واحد للفريق عشان المسافات متعملش conflicts.`,
          example: R`git merge feature/cart
git status
git diff --name-only --diff-filter=U
git checkout --theirs package-lock.json
npm install
git add .
git merge --continue
# ولو عايز تلغي الدمج كله وترجع لقبله:
git merge --abort`,
          try: "اعمل conflict بإيدك: branchين غيّروا نفس السطر، وادمج. افتحه في VS Code وجرّب «Accept Both»، وبعدين فعّل [[git config merge.conflictStyle zdiff3]] وكرّر: هتشوف النسخة الأصلية كمان.",
          deep: {
            why: "مفيش فريق من غير conflicts. السؤال بيشوف هل بتحلها بفهم ولا بتضغط «Accept Current» وتمسح شغل زميلك.",
            how: R`Git بيعمل 3-way merge: النسخة الأصلية (base)، ونسختك (ours)، ونسختهم (theirs). لو سطر اتغير في ناحية واحدة بس بياخده لوحده. لو اتغير في الناحيتين، ده conflict. و [[merge.conflictStyle zdiff3]] بيعرض الـ base كمان في النص، فتفهم كل واحد غيّر إيه عن الأصل.

خلي بالك: في الـ rebase معنى ours و theirs بيتقلب، لأن Git بيطبّق commits بتاعتك على main، فـ ours بقت main.

الـ lock files متتحلّش بالإيد: خد نسخة من ناحية وبعدين [[npm install]] يعيد حسابها بحيث تمشي مع [[package.json]] اللي اتدمج. و [[git rerere]] بيفتكر حلولك لو نفس الـ conflict اتكرر. التفاصيل في تاب Git: [[الـ conflicts]].`,
            when: "Follow-ups: «ours و theirs معناهم إيه في rebase؟». «conflict في lock file بتعمل إيه؟». «إزاي تقلل الـ conflicts في فريق؟». «حصل conflict في ملف migration، تعمل إيه؟».",
            mistakes: R`«Accept Current» على كل الملفات من غير ما تقرا. وتنسى علامات [[<<<<<<<]] في الكود وتعمل commit (الـ build أو الـ lint المفروض يمسكها). وتحل conflict في lock file بإيدك. ومتشغّلش الاختبارات بعد الحل: الملف ممكن يبقى مفيهوش علامات بس الكود مكسور.`
          },
          lines: [
            "ادمج الـ branch، و Git يوقف لو فيه conflict.",
            "شوف الملفات اللي فيها conflict (both modified).",
            "اطبع أسماء الملفات اللي لسه مش محلولة بس.",
            "في الـ lock file: خد نسخة الـ branch اللي بتدمجه كلها.",
            "وأعد حساب الـ lock file على الـ package.json الجديد.",
            "علّم كل الملفات إنها اتحلت.",
            "كمّل الدمج واعمل الـ merge commit.",
            "زرار الطوارئ: ارجع لحالة ما قبل الدمج."
          ],
          sol: R`الـ merge هيقول [[CONFLICT (content): Merge conflict in cart.js]]، والملف هيبقى فيه [[<<<<<<< HEAD]] ونسختك، ثم [[=======]]، ثم نسخة الـ branch و [[>>>>>>> feature/cart]]. مع [[zdiff3]] بيظهر قسم زيادة في النص بيبدأ بـ [[|||||||]] وفيه السطر الأصلي قبل ما الطرفين يغيّروه. ده بيفرق جدًا: من غيره انت شايف 90 و 120 ومش عارف مين غيّر إيه، ومعاه بتشوف إن الأصل كان 100، فواحد عمل خصم وواحد رفع السعر، وتسأل صاحبه.

«Accept Both» في المثال ده هيحط السطرين تحت بعض: [[const price = 90;]] و [[const price = 120;]]، ودي SyntaxError لأن [[const]] اتعرّف مرتين. ده الدرس: Accept Both مناسب لحاجات بتتجمع (import جديد من كل ناحية، سطرين في لستة)، مش لنفس القيمة. بعد الحل: [[git add]] ثم [[git merge --continue]]، ولو اتلخبطت [[git merge --abort]] يرجعك لقبل الدمج.`,
          solCode: R`# conflict.sh
rm -rf c && mkdir c && cd c && git init -q -b main
git config user.name you && git config user.email you@example.com
echo 'const price = 100;' > cart.js && git add . && git commit -qm init
git switch -qc feature/cart && echo 'const price = 120;' > cart.js && git commit -qam "raise price"
git switch -q main && echo 'const price = 90;' > cart.js && git commit -qam "discount"
git config merge.conflictStyle zdiff3
git merge feature/cart; cat cart.js
# CONFLICT (content): Merge conflict in cart.js
# <<<<<<< HEAD
# const price = 90;
# ||||||| 1cbdbb6
# const price = 100;
# =======
# const price = 120;
# >>>>>>> feature/cart`
        },
        {
          cmd: "trunk-based",
          title: "الفريق بيدير الـ branches إزاي؟ اشرح Git Flow وإيه البديل اللي أغلب الفرق بتستخدمه",
          desc: R`Git Flow فيه main للإنتاج، و develop للتطوير، وفروع feature و release و hotfix. منظّم بس تقيل، ومناسب لما بتطلّع نسخ برقم (تطبيق موبايل أو library). أغلب فرق الويب دلوقتي بتشتغل trunk-based أو GitHub Flow: main دايمًا جاهز للـ deploy، و branch قصير لكل feature، و PR فيه review و CI، و merge، و deploy تلقائي.

والحاجة اللي مش جاهزة بتستخبى ورا feature flag بدل branch عايش شهر. والـ hotfix بيبقى PR عادي على main.`,
          example: R`git switch -c feat/password-reset
git commit -am "feat(auth): add password reset email"
git push -u origin feat/password-reset
gh pr create --fill --base main
gh pr merge --squash --delete-branch`,
          try: "في ريبو على GitHub فعّل branch protection على main (لازم PR و CI أخضر)، وجرّب تعمل push مباشر على main وشوف الرفض.",
          deep: {
            why: "بيعرف منه هل اشتغلت في فريق بعملية واضحة، وهل فاهم ليه الـ branches الطويلة بتوجع.",
            how: R`كل ما الـ branch يعيش أكتر، بيبعد عن main أكتر، والدمج في الآخر بيبقى conflict ضخم ومخاطرة كبيرة. الـ trunk-based بيحل ده بإن كل واحد يدمج صغير وكتير (يوم أو يومين)، والـ CI بيتأكد إن main سليم بعد كل دمج.

الـ feature flag شرط في الكود ([[if (flags.newCheckout)]]) بيتحكم فيه من إعدادات، فتقدر تدمج كود لسه مش جاهز وهو مقفول، وتفتحه ليوزرز معينين الأول، وتقفله في ثانية لو فيه مشكلة من غير rollback.

والـ commit messages بشكل Conventional Commits ([[feat:]] و [[fix:]] و [[chore:]]) بتخلي الـ changelog والـ versions تتعمل أوتوماتيك. الأوامر في «تاب Git» ([[gh pr]] و [[git rebase]])، وفحص صيغة الرسالة أوتوماتيك في «تاب فحص الكود» ([[commitlint]])، والـ CI اللي بيشتغل على كل PR في «تاب GitHub Actions» ([[ci.yml]])، والـ feature flags جنب الـ canary في «تاب Cloud و DevOps» ([[blue-green vs canary]]).`,
            when: "Follow-ups: «بتعمل hotfix إزاي؟». «إيه هي feature flags؟». «بتكتب commit message إزاي؟». «بتبص على إيه في code review؟». «PR كبير قد إيه يبقى كبير؟».",
            mistakes: R`تقول «بنشتغل على main على طول من غير PRs» كأنها ميزة. أو تحفظ Git Flow وتقول إنه الصح لكل مشروع. أو branch عايش أسابيع وفي الآخر conflict ضخم. ورسايل commit زي «fix» و «update».`
          },
          lines: [
            "اعمل branch جديد للـ feature واتنقل عليه.",
            "commit برسالة واضحة: نوع (feat) ومكان (auth) ووصف.",
            "ارفع الـ branch واربطه بالـ remote.",
            "افتح PR على main من الـ commits (بـ GitHub CLI).",
            "بعد الـ review والـ CI: ادمجه commit واحد وامسح الـ branch."
          ],
          sol: R`الـ push المباشر لازم يترفض برسالة زي: [[remote: error: GH006: Protected branch update failed for refs/heads/main.]] مع [[Changes must be made through a pull request.]] (لو branch protection القديمة)، أو [[remote: error: GH013: Repository rule violations found for refs/heads/main.]] (لو rulesets الجديدة)، وفي الآخر [[! [remote rejected] main -> main]]. ساعتها الطريق الوحيد: branch، ثم PR، ثم CI أخضر، ثم merge.

النتيجة الغلط الأشهر: الـ push عدّى عادي. غالبًا لأنك owner أو admin والقاعدة بتسمح للـ admins يعدّوها: فعّل «Do not allow bypassing the above settings» في الـ protection (أو شيل الـ bypass في الـ ruleset). وخلي بالك إن الحماية دي على الريبوهات الـ private محتاجة خطة مدفوعة غالبًا، وعلى الـ public مجانية.`
        },
        {
          cmd: "ps و kill و signals",
          title: "على سيرفر لينكس: برنامج واقف أو واكل الرام، هتعرف إزاي وتوقفه إزاي؟",
          desc: R`كل برنامج شغال process ليه PID وصاحب وحالة. بشوفهم بـ [[ps aux]] أو [[top]] و [[htop]]، وأعرف مين ماسك بورت بـ [[ss -tlnp]]. وبوقف الـ process ببعت signal: [[kill PID]] بيبعت SIGTERM (15) يعني «اقفل بهدوء» والبرنامج يقدر يخلّص شغله، ولو مردّش [[kill -9]] بيبعت SIGKILL اللي مينفعش يتمسك ولا يتجاهل.

وفي السيرفرات الخدمات بتتدار بـ systemd أو Docker أو pm2: [[systemctl status]] و [[journalctl -u]] للوجات، فغالبًا بوقفها من المدير بتاعها مش بـ kill.`,
          example: R`ps aux --sort=-%mem | head -5
ss -tlnp | grep :3000
kill 12345
kill -9 12345
systemctl status nginx
journalctl -u myapp -n 50 --no-pager`,
          try: "شغّل [[node -e \"setInterval(() => {}, 1000)\"]] في ترمنال، ومن ترمنال تاني هات الـ PID بـ [[pgrep node]] وابعتله [[kill]]. بعدين جرّب نفس الحاجة بسكربت فيه [[process.on('SIGTERM', ...)]] بيطبع رسالة قبل ما يقفل.",
          deep: {
            why: "الـ full-stack اللي بيعمل deploy لازم يعرف يشخّص سيرفر. والسؤال بيفرّق بين اللي بيعمل [[kill -9]] على طول واللي فاهم graceful shutdown.",
            how: R`الـ process نسخة شغالة من برنامج، ليها ذاكرة خاصة و PID وأب (PPID). لينكس بيعمل process جديدة بـ fork (نسخة من الأب) وبعدين exec (يحمّل البرنامج الجديد). لو الابن خلص والأب مقراش حالته، بيفضل zombie في الجدول.

الـ signals رسايل صغيرة من النظام: SIGINT (2) لما تدوس Ctrl+C، و SIGTERM (15) طلب قفل مهذب، و SIGKILL (9) النظام بيقتل على طول والبرنامج مبيعرفش، و SIGHUP (1) كان «الترمنال اتقفل» وبرامج كتير بتستخدمه لإعادة قراية الإعدادات.

الـ graceful shutdown في Node: [[process.on("SIGTERM", ...)]] ← [[server.close()]] يبطّل ياخد طلبات جديدة ويخلّص اللي شغال ← اقفل الاتصال بالداتابيز ← اخرج. و [[docker stop]] بيبعت SIGTERM ويستنى ١٠ ثواني وبعدين SIGKILL. التفاصيل في تاب bash وتاب «التشخيص».`,
            when: "Follow-ups: «الفرق بين SIGTERM و SIGKILL؟». «zombie process يعني إيه؟». «graceful shutdown لسيرفر Node إزاي؟». «الـ load average عالي، بتبص على إيه؟». «البورت مشغول، تعرف مين ماسكه إزاي؟».",
            mistakes: R`[[kill -9]] أول حاجة: البرنامج ميلحقش يقفل الاتصالات ويكمّل الكتابة. وتخلط الـ process بالـ thread. و [[killall node]] على سيرفر عليه كذا تطبيق. وتوقف خدمة شغالة بـ systemd بـ kill فترجع تقوم لوحدها وانت مش فاهم ليه.`
          },
          lines: [
            "أكتر ٤ processes بتاكل رام (الـ ٥ سطور منهم سطر العناوين).",
            "مين ماسك بورت 3000، ورقمه إيه.",
            "ابعت SIGTERM: اقفل بهدوء.",
            "لو مردّش: SIGKILL، قتل فوري من غير فرصة يخلّص.",
            "حالة خدمة شغالة بـ systemd وآخر سطور اللوج.",
            "آخر ٥٠ سطر لوج لخدمة التطبيق."
          ],
          sol: R`[[pgrep node]] بيطبع أرقام PIDs بس، وممكن يطلع أكتر من رقم لو فيه node تاني شغال (VS Code نفسه بيشغّل node). استخدم [[pgrep -a node]] عشان تشوف الأمر جنب كل رقم وتختار الصح. بعد [[kill PID]] الترمنال الأول هيقول [[Terminated]]، والـ exit code هيبقى 143 (يعني 128 + 15، و 15 رقم SIGTERM).

مع السكربت اللي فيه handler، [[kill]] مش هيقفله فجأة: هيطبع [[got SIGTERM, cleaning up...]] ثم [[bye]] ويخرج بـ 0 لما يخلص تنضيف. وده اللي بيعمله systemd و Docker و Kubernetes: يبعتوا SIGTERM ويستنوا شوية. أما [[kill -9]] (SIGKILL) مبيوصلش للبرنامج أصلًا، فالـ handler مبيشتغلش خالص، والترمنال يقول [[Killed]] و exit code يبقى 137. عشان كده -9 آخر حل مش أول حل.`,
          solCode: R`// graceful.js: شغّله بـ node graceful.js، ومن ترمنال تاني: kill PID
const t = setInterval(() => {}, 1000);
console.log("pid", process.pid);
process.on("SIGTERM", () => {
  console.log("got SIGTERM, cleaning up...");
  clearInterval(t);
  setTimeout(() => { console.log("bye"); process.exit(0); }, 200);
});
// pid 1211
// got SIGTERM, cleaning up...
// bye`
        },
        {
          cmd: "rwx للـ owner و group و others",
          title: "يعني إيه chmod 755؟ واقرا السطر ده: -rw-r--r--",
          desc: R`كل ملف ليه owner و group، وتلات صلاحيات لكل واحد من التلاتة (owner، ثم group، ثم others): r=4 قراية، و w=2 كتابة، و x=1 تنفيذ (وفي الفولدر معناها تدخله). الرقم مجموعهم: 7=rwx، و 6=rw-، و 5=r-x، و 4=r--. فـ 755 = الـ owner كل حاجة والباقي قراية وتنفيذ، ودي للفولدرات والسكربتات. و 644 = الـ owner يقرا ويكتب والباقي يقرا بس، ودي للملفات العادية. و 600 للأسرار زي مفتاح SSH و [[.env]].

و [[-rw-r--r--]] أول حرف نوع الملف ([[-]] ملف و [[d]] فولدر و [[l]] link)، وبعده تلات مجموعات: يعني 644.`,
          example: R`ls -l deploy.sh .env
chmod 755 deploy.sh
chmod 600 .env
chmod u+x,g-w script.sh
sudo chown -R deploy:www-data /var/www/myapp
id`,
          try: "اعمل فولدر فيه ملف، واعمل للفولدر [[chmod 644]] (من غير x) وجرّب [[cd]] جواه و [[cat]] للملف. بعدين رجّعه 755. هتفهم معنى x على الفولدر.",
          deep: {
            why: "أي deploy على سيرفر فيه مشاكل صلاحيات: Nginx مش قادر يقرا الملفات، أو السكربت مش بيتنفّذ، أو [[.env]] مقروء لأي حد. والسؤال بيشوف فاهم الأرقام ولا بيعمل 777.",
            how: R`في الفولدر: r معناها تشوف أسماء الملفات جواه، و x معناها تدخله وتوصل لملفاته بالاسم، و w معناها تعمل وتمسح ملفات جواه (حتى لو الملف نفسه مش بتاعك). عشان كده المسح صلاحية الفولدر مش الملف.

الـ umask بيحدد الصلاحيات الافتراضية: غالبًا 022، فالملفات الجديدة بتطلع 644 والفولدرات 755. و root بيعدّي كل الصلاحيات دي. وفيه بتات خاصة: الـ sticky bit على [[/tmp]] (بتظهر [[t]]) بيمنع حد يمسح ملف مش بتاعه حتى لو الفولدر مفتوح للكل.

والقاعدة: least privilege. التطبيق يشتغل بيوزر عادي مش root، وملفات الموقع ملك يوزر الـ deploy، و [[www-data]] في الـ group بيقرا بس (فولدرات 750 وملفات 640)، وبيكتب في فولدر الرفع بس. والأسرار 600. التفاصيل في تاب bash.`,
            when: "Follow-ups: «ليه 777 غلط؟». «الفرق بين r و x على فولدر؟». «إيه هو umask؟». «sudo بيعمل إيه بالظبط؟». «Nginx بيطلّع 403 على ملفات الموقع، تشخّص إزاي؟».",
            mistakes: R`[[chmod -R 777]] عشان «يشتغل»: أي process مخترق يقدر يعدّل كودك. وتشغّل التطبيق بـ root. وتنسى إن الفولدر محتاج x عشان توصل للملفات جواه. و [[chmod -R 755]] على كل حاجة فالملفات العادية كلها بقت executable.`
          },
          lines: [
            "اعرض الصلاحيات والـ owner والـ group للملفين.",
            "السكربت: الـ owner يعمل كل حاجة، والباقي يقرا وينفّذ.",
            "ملف الأسرار: الـ owner بس يقرا ويكتب.",
            "بالحروف: ضيف تنفيذ للـ owner، وشيل الكتابة من الـ group.",
            "خلي الملفات ملك يوزر الـ deploy، والـ group هو اليوزر اللي Nginx أو PHP بيشتغل بيه عشان يقرا بس.",
            "انت مين: الـ uid والـ groups بتاعتك."
          ],
          sol: R`بعد [[chmod 644]] على الفولدر، [[ls -ld]] هيطلع [[drw-r--r--]]، و [[cd]] هيقول [[Permission denied]]، و [[cat folder/file]] كمان [[Permission denied]] رغم إن الملف نفسه [[rw-r--r--]] ومسموح يتقري. أما [[ls folder]] فهيعرض أسامي الملفات، لأن [[r]] على الفولدر معناها «تقرا لستة الأسامي» بس. و [[ls -l folder]] هيعرض علامات استفهام مكان التفاصيل.

الخلاصة اللي تقولها: [[x]] على الفولدر معناها «تعدّي من جواه» (تدخله وتوصل لأي حاجة فيه بالاسم). عشان كده الفولدرات 755 والملفات 644، وأي فولدر في الطريق ناقصه x بيقفل كل اللي تحته، ودي أشهر سبب لـ 403 من Nginx على ملفات «الـ permissions بتاعتها سليمة».

النتيجة الغلط: كل حاجة اشتغلت عادي. ده لأنك root (أو في WSL أو Docker بتشتغل root)، والـ root بيعدّي فحص الـ permissions. جرّب بيوزر عادي، أو [[sudo -u nobody cat folder/file]].`
        }
      ]
    },
    {
      t: "Big-O و الـ data structures",
      l: 2,
      n: "مش مسائل: دي الأسئلة النظرية اللي بتيجي قبل المسألة أو بعدها. المسائل نفسها في تاب «DSA»",
      items: [
        {
          cmd: "معدل النمو مع n",
          title: "يعني إيه Big-O؟ ورتّب الـ complexities المشهورة من الأسرع للأبطأ",
          desc: R`Big-O بيوصف الوقت أو الذاكرة بيكبروا إزاي لما حجم الداتا n يكبر، مش بالثواني. بنشيل الثوابت والحدود الصغيرة، وغالبًا بنتكلم عن أسوأ حالة. الترتيب: O(1) ثابت (قراية من hash map)، و O(log n) (binary search)، و O(n) (لوب واحد)، و O(n log n) (sort كويس)، و O(n²) (لوب جوه لوب)، و O(2ⁿ) (كل المجموعات الجزئية).

والمهم مش الحفظ: لما n = مليون، الـ O(n log n) حوالي ٢٠ مليون عملية، والـ O(n²) تريليون. ده الفرق بين أقل من ثانية وساعات.`,
          example: R`const ops = n => ({ n, log: Math.round(Math.log2(n)), nlogn: Math.round(n * Math.log2(n)), n2: n * n });
console.table([10, 1000, 1_000_000].map(ops));
// n = 1000000 → log: 20 | nlogn: 19931569 | n2: 1000000000000`,
          try: "شغّل السطرين في [[node]] وبص على العمود الأخير. بعدين قول بصوت عالي: لو كل عملية بتاخد نانو ثانية، الـ n² على مليون عنصر هياخد قد إيه؟",
          flag: "script",
          deep: {
            why: "هو اللغة اللي بتتكلم بيها عن الأداء في أي مسألة أو system design. من غيره مش هتعرف تقول ليه حل أحسن من حل.",
            how: R`Big-O حد أعلى لمعدل النمو: [[3n + 5]] و [[n/2]] الاتنين O(n)، لأن لما n تكبر جدًا الثوابت مبتفرقش في «الشكل». عشان كده بنشيل الثوابت ([[O(2n)]] بتتكتب O(n)) والحدود الأصغر ([[O(n² + n)]] بتتكتب O(n²)).

فيه كمان Ω (حد أدنى) و Θ (بالظبط)، بس في الانترفيو «Big-O» غالبًا بيقصد بيها الحالة الأسوأ أو المتوقعة. وقول الحالة بصراحة: hash map بتاخد O(1) في المتوسط، و quick sort بياخد O(n log n) في المتوسط و O(n²) في الأسوأ.

وفيه amortized: [[push]] في array أغلب الوقت O(1)، ومرة كل فين وفين بينسخ كل العناصر لمكان أكبر O(n). على المدى الطويل المتوسط O(1) لكل عملية. والـ log بيظهر كل ما المسألة بتتقسم نصين كل خطوة.`,
            when: "Follow-ups: «الحل ده complexity بتاعه إيه؟». «ممكن أحسن؟». «والـ space؟». «amortized يعني إيه؟». «الـ O(1) دايمًا أسرع من O(n)؟» (لأ، لـ n صغيرة الثوابت ممكن تفرق).",
            mistakes: R`تقول O(2n) أو O(n + 5) من غير تبسيط. وتقول «O(n) يعني بياخد n ثانية». وتنسى الـ space complexity. وتفتكر O(log n) و O(n) قريبين: لمليون عنصر ٢٠ ضد مليون.`
          },
          lines: [
            "دالة بتحسب عدد العمليات لكل complexity على حجم n.",
            "اطبعهم في جدول لتلات أحجام: ١٠، وألف، ومليون."
          ],
          sol: R`الجدول هيطلع 3 أعمدة للـ n: عند مليون [[log]] = 20، و [[nlogn]] = 19,931,569، و [[n2]] = 1,000,000,000,000. الإجابة بصوت عالي: مليون × مليون = 10^12 عملية، وكل عملية نانو ثانية (10^-9)، يعني 10^3 ثانية = 1000 ثانية ≈ ١٧ دقيقة. والـ n log n على نفس المليون ≈ ٢٠ مليون نانو ثانية = ٢٠ ميلي ثانية.

ده الجواب اللي يفرق في الانترفيو: الفرق بين O(n²) و O(n log n) على مليون عنصر هو الفرق بين «اليوزر استنى ربع ساعة» و «محسش بحاجة». ولو قلت رقم زي «ثانية» أو «دقيقة»، راجع الحساب: 10^12 × 10^-9 = 10^3.`
        },
        {
          cmd: "عد اللوبات المخفية",
          title: "إزاي تحسب complexity الكود بتاعك؟ وليه كود فيه لوب واحد بس ممكن يطلع O(n²)؟",
          desc: R`بمشي على الكود: لوب على n يبقى O(n)، واللوبات اللي ورا بعض بتتجمع (O(n) + O(n) = O(n))، واللوب جوه لوب بيتضرب. وبدوّر على اللوبات المخفية: [[includes]] و [[indexOf]] و [[find]] و [[some]] و [[filter]] جوه لوب كل واحدة O(n)، و [[shift]] بتحرّك كل العناصر، والـ spread جوه reduce بينسخ الـ object كل لفة. وبحسب الذاكرة كمان: array جديدة بحجم n تبقى O(n) space، و recursion بعمق n تبقى O(n) على الـ stack.

وفي الـ backend أغلى لوب مخفي هو query جوه لوب (N+1): ١٠٠ order يعني ١٠١ query. والحل واحدة بـ [[IN]] أو [[include]] أو JOIN.`,
          example: R`const users = Array.from({ length: 20000 }, (_, i) => ({ id: i }));
const ids = users.map(u => u.id).reverse();
console.time("some");
const a = ids.filter(id => users.some(u => u.id === id));
console.timeEnd("some");
console.time("Set");
const known = new Set(users.map(u => u.id));
const b = ids.filter(id => known.has(id));
console.timeEnd("Set");
// some: ~970ms | Set: ~2ms`,
          try: "شغّله، وبعدين خلي الطول ٤٠ ألف بدل ٢٠: الـ some هيزيد أكتر بكتير من الضعف (نظريًا ٤ أضعاف لأنه n²، وعمليًا في تشغيل جديد غالبًا ٢.٥ لـ ٣ بسبب تسخين الـ JIT)، والـ Set حوالي الضعف بس (n). ده أوضح إثبات للفرق.",
          flag: "script",
          deep: {
            why: "الإنترفيوير هيسألك «complexity الحل ده إيه؟» بعد كل مسألة. والأهم إن ده اللي بيخليك تلاقي البطء في مشروعك الحقيقي قبل ما اليوزرز يلاقوه.",
            how: R`القواعد: الخطوات المتتالية بتتجمع وتاخد الأكبر. المتداخلة بتتضرب. ومدخلين مختلفين ليهم متغيرين: لوب على users جواه لوب على orders يبقى O(u × o) مش O(n²).

الـ methods ليها تمن: [[push]] و [[pop]] و [[Map.get]] و [[Set.has]] O(1). [[includes]] و [[indexOf]] و [[find]] و [[filter]] و [[map]] و [[slice]] و [[spread]] و [[shift]] و [[unshift]] O(n). و [[sort]] O(n log n). و [[str += x]] في لوب ممكن يبقى مكلّف، والأحسن [[join]].

والـ space: كل array أو object جديد بحجم الداتا بيتحسب، وكل مستوى recursion بيحجز frame على الـ stack. والمقايضة الأشهر: تصرف ذاكرة O(n) في Set أو Map عشان تنزل من O(n²) لـ O(n)، زي المثال.`,
            when: "Follow-ups: «ممكن تعملها أسرع؟». «ولو الذاكرة محدودة؟». «الـ sort اللي في النص complexity بتاعه إيه؟». «فين الـ bottleneck في الـ endpoint ده؟».",
            mistakes: R`تقول O(n) عشان فيه لوب واحد وناسي [[includes]] جواه. وتنسى تحسب الـ sort. وتقول لوبين ورا بعض O(n²). وتنسى الـ space، أو تنسى إن الـ recursion بتاخد space على الـ stack.`
          },
          lines: [
            "٢٠ ألف يوزر.",
            "الـ ids بترتيب معكوس (عشان البحث يمشي مسافة).",
            "ابدأ عدّاد الوقت.",
            "لكل id، دوّر عليه بـ some في كل اليوزرز: لوب جوه لوب، O(n²).",
            "اطبع الوقت.",
            "عدّاد تاني.",
            "ابني Set مرة واحدة: O(n) وقت و O(n) ذاكرة.",
            "لكل id، [[has]] بـ O(1): الكل O(n).",
            "اطبع الوقت: فرق مئات المرات."
          ],
          sol: R`الـ Set هيقرب من الضعف فعلًا (مثلًا ٤ms لـ ٨ms) لأنه O(n). أما الـ some فنظريًا ٤ أضعاف، بس لما جربت (Node 22) من ٢٠ لـ ٤٠ ألف طلع ما بين ٢.٥ و ٣ أضعاف بس (مثلًا ٦٥٠ms لـ ١٨٠٠ms)، ومن ٤٠ لـ ٨٠ ألف طلع حوالي ٤ (١.٤ ثانية لـ ٥.٢). السبب إن أول جزء من كل تشغيل بيبقى بطيء على ما الـ JIT يعمل optimize للكود، فالرقم الصغير متضخم شوية. لو شغلت الاتنين في نفس الـ process بعد تسخين هتشوف الـ ٤ أضعاف بوضوح.

المهم الاتجاه: التاني بيتضاعف مرتين كل ما الـ n يتضاعف، والأول مرة. وجملة الانترفيو: «[[some]] و [[includes]] و [[find]] و [[indexOf]] كل واحدة لوب، فلو جوه [[filter]] أو [[map]] يبقى عندي n². الحل إني أبني Set أو Map مرة واحدة برا اللوب، وأدفع O(n) ذاكرة».`
        },
        {
          cmd: "العملية الأكتر تكرار",
          title: "array ولا linked list ولا hash map ولا set ولا tree: بتختار بينهم إزاي؟",
          desc: R`بختار حسب العملية اللي هتتكرر أكتر. الـ array: وصول بالـ index في O(1) وبتحافظ على الترتيب، بس البحث O(n) والإضافة في الأول O(n). الـ linked list: إضافة ومسح O(1) لو معاك العقدة نفسها، بس الوصول لعنصر O(n). الـ hash map ([[Map]]): بحث وإضافة بالمفتاح O(1) في المتوسط. الـ set: نفس الفكرة للقيم المميزة، لـ «موجود ولا لأ» وشيل التكرار. والـ tree المتوازن: كل حاجة O(log n) ومترتبة، فبيسمح بـ «هات من كذا لكذا»، وده اللي الداتابيز بتعمل بيه الـ index (B-tree).

وفيه كمان stack (آخر واحد يدخل أول واحد يخرج: undo والـ call stack)، و queue (الأول يدخل الأول يخرج: الـ jobs)، و heap (أصغر أو أكبر عنصر بسرعة: priority queue). المسائل عليهم في تاب «DSA».`,
          example: R`const tags = ["js", "css", "js", "react", "css"];
console.log([...new Set(tags)]);
const count = new Map();
for (const t of tags) count.set(t, (count.get(t) ?? 0) + 1);
console.log(count);
const stack = []; stack.push(1); stack.push(2); console.log(stack.pop());
const queue = [1, 2, 3]; console.log(queue.shift());
// [ 'js', 'css', 'react' ]  Map(3) { 'js' => 2, 'css' => 2, 'react' => 1 }  2  1`,
          try: "اكتب دالة بتلاقي أول حرف مش متكرر في string مرة بـ [[indexOf]] و [[lastIndexOf]] ومرة بـ Map للعد. احسب الـ complexity للاتنين.",
          flag: "script",
          deep: {
            why: "الاختيار الصح للـ data structure هو نص حل أي مسألة، ونص تصميم أي feature: cache، أو طابور jobs، أو autocomplete، أو leaderboard.",
            how: R`الـ array متخزنة ورا بعض في الذاكرة، فالوصول بالـ index حساب بسيط، والمعالج بيحبها (cache friendly). الإضافة في النص محتاجة تزق كل اللي بعدها.

الـ hash map بتحوّل المفتاح لرقم بـ hash function، والرقم ده بيحدد الخانة. لو مفتاحين وقعوا في نفس الخانة (collision) بتتخزن مع بعض، فأسوأ حالة نظريًا O(n). ولما تتملى بتكبر وتعيد التوزيع (amortized O(1)). وفي JS الأحسن [[Map]] من الـ object كـ dictionary: أي نوع مفتاح، و [[size]] جاهز، ومفيش مفاتيح موروثة زي [[__proto__]].

الـ binary search tree من غير توازن ممكن يبقى linked list لو دخلت الداتا مترتبة، عشان كده فيه أشجار بتوازن نفسها. والداتابيز بتستخدم B-tree: شجرة عريضة كل عقدة فيها مفاتيح كتير، فعدد قرايات الـ disk قليل جدًا، ومترتبة فتنفع لـ [[ORDER BY]] و [[BETWEEN]]. وفيه trie للـ autocomplete، و graph للعلاقات والطرق.`,
            when: "Follow-ups: «Map ولا object؟». «ليه الـ index في الداتابيز tree مش hash؟». «الـ hash map بتتعامل مع الـ collisions إزاي؟». «تعمل LRU cache بإيه؟» (Map بيحافظ على ترتيب الإضافة، أو hash map + doubly linked list).",
            mistakes: R`تقول linked list «أسرع في الإضافة» من غير «لو معاك مكان العقدة». و [[includes]] جوه لوب بدل Set. و object كـ map بمفاتيح جاية من اليوزر. و queue بـ [[shift]] على مليون عنصر: كل shift بتحرّك الباقي.`
          },
          lines: [
            "array فيها تكرار.",
            "Set بتشيل التكرار وتحافظ على ترتيب أول ظهور.",
            "Map للعد: كلمة ← عدد.",
            "لكل كلمة زوّد العداد، و [[?? 0]] لو أول مرة.",
            "اطبع العدادات.",
            "stack: آخر حاجة دخلت (2) هي أول حاجة تطلع.",
            "queue: أول حاجة دخلت (1) تطلع الأول. بس [[shift]] على array O(n)، والـ queue الحقيقية بتتعمل بطريقة تانية."
          ],
          sol: R`الحلين بيرجعوا نفس النتيجة: [[swiss]] ← [[w]]، و [[aabb]] ← [[null]]، و [[leetcode]] ← [[l]]، والـ string الفاضي ← [[null]]. الفرق في الـ complexity: نسخة [[indexOf]] و [[lastIndexOf]] O(n²) وقت و O(1) ذاكرة، لأن كل واحدة فيهم بتلف على الـ string كلها ولكل حرف. ونسخة الـ Map O(n) وقت (لفتين منفصلتين، مش لوب جوه لوب) و O(k) ذاكرة حيث k عدد الحروف المختلفة.

الغلط الشائع: إنك تقول الـ indexOf نسخة O(n) لأن «فيه لوب واحد». الـ indexOf نفسه لوب مخفي. وحاجة زيادة تقولها: لو الحروف إنجليزي صغير بس، الـ k ثابت (26) فالذاكرة عمليًا O(1).`,
          solCode: R`// first-unique.mjs
function firstUniqueScan(s) {          // O(n²) time, O(1) space
  for (const ch of s) {
    if (s.indexOf(ch) === s.lastIndexOf(ch)) return ch;
  }
  return null;
}
function firstUniqueMap(s) {           // O(n) time, O(k) space
  const count = new Map();
  for (const ch of s) count.set(ch, (count.get(ch) ?? 0) + 1);
  for (const ch of s) if (count.get(ch) === 1) return ch;
  return null;
}
for (const s of ["swiss", "aabb", "", "leetcode"]) {
  console.log(JSON.stringify(s), firstUniqueScan(s), firstUniqueMap(s));
}
// "swiss" w w
// "aabb" null null
// "" null null
// "leetcode" l l`
        },
        {
          cmd: "base case + مشكلة أصغر",
          title: "يعني إيه دالة بتنادي نفسها؟ وإمتى تستخدمها وإمتى تخاف منها؟",
          desc: R`الـ recursion يعني الدالة تحل المشكلة بإنها تنادي نفسها على نسخة أصغر. لازم حاجتين: base case يوقف، وكل نداء يقرّب منه. مناسبة جدًا للحاجات اللي شكلها شجرة: فولدرات جوه فولدرات، وكومنتات فيها ردود، و JSON متداخل، و DOM. وكل نداء بياخد frame على الـ call stack، فعمق كبير بيوقع بـ [[RangeError: Maximum call stack size exceeded]].

والبديل لوب مع stack بتعمله انت. والـ recursion اللي بتحل نفس المسألة الفرعية كذا مرة (زي fibonacci) محتاجة memoization، وإلا تبقى O(2ⁿ).`,
          example: R`const tree = { name: "src", children: [{ name: "app.js" }, { name: "lib", children: [{ name: "db.js" }] }] };
function countFiles(node) {
  if (!node.children) return 1;
  return node.children.reduce((sum, child) => sum + countFiles(child), 0);
}
console.log(countFiles(tree));
const fib = (n, memo = new Map()) => n < 2 ? n : memo.get(n) ?? memo.set(n, fib(n - 1, memo) + fib(n - 2, memo)).get(n);
console.log(fib(70));
// 2  190392490709135`,
          try: "اكتب countFiles تاني من غير recursion: استخدم array كـ stack و [[while]]. بعدين جرّب fib من غير memo على 40 وشوف الوقت.",
          flag: "script",
          deep: {
            why: "أي داتا متداخلة (تعليقات، وقوايم، وفولدرات، وصلاحيات بتورث) حلها الطبيعي recursion. والإنترفيوير عايز يتأكد إنك عارف حدودها مش بس بتكتبها.",
            how: R`كل نداء بيتحط على الـ call stack كـ frame فيه الـ arguments والمتغيرات المحلية ومكان الرجوع. لما الدالة ترجع، الـ frame بيتشال. الـ stack حجمه محدود (في V8 حوالي ١٠ لـ ١٥ ألف مستوى بالإعدادات الافتراضية، وأقل كل ما الـ frame يكبر)، فشجرة عمقها ١٠ مستويات مفيش مشكلة، بس لستة متوصلة مليون عنصر هتوقع.

الـ tail call optimization (النداء الأخير ميحجزش frame جديد) مكتوبة في مواصفة JS بس Safari بس اللي طبّقها، فمتعتمدش عليها في Node أو Chrome.

الـ complexity = عدد النداءات × الشغل في كل نداء. fibonacci العادية كل نداء بيعمل نداءين فبتبقى حوالي O(2ⁿ)، ومع memo كل n بيتحسب مرة واحدة فبتبقى O(n). وده أول باب للـ dynamic programming في تاب «DSA».`,
            when: "Follow-ups: «حوّلها لـ iterative». «الـ complexity بتاعتها إيه؟». «فيه tail call optimization في JS؟». «memoization يعني إيه؟». «هتعمل deep clone لـ object إزاي؟» ([[structuredClone]]).",
            mistakes: R`تنسى الـ base case أو تكتب واحد مبيتوصلش له (n - 1 وهي بدأت سالبة). و recursion على داتا اليوزر يتحكم في عمقها. وتفتكر إن JS بيعمل TCO. وتقول recursion «أبطأ دايمًا»: الفرق غالبًا صغير، والمشكلة في العمق والتكرار.`
          },
          lines: [
            "شجرة فولدرات: src فيها ملف وفولدر فيه ملف.",
            "دالة بتعد الملفات في أي عقدة.",
            "base case: عقدة من غير children يبقى ملف واحد.",
            "غير كده: اجمع نتيجة كل ابن، وكل ابن مشكلة أصغر.",
            "قفلة.",
            "النتيجة 2.",
            "fibonacci مع memo: كل n بيتحسب مرة واحدة ويتحفظ في Map، فبقت O(n).",
            "fib(70) في لحظة. من غير memo كانت هتاخد وقت طويل جدًا."
          ],
          sol: R`النسخة من غير recursion لازم تطبع [[2]] زي الأصلية. الفكرة: الـ call stack اللي كان اللغة شايلاه عنك بقى array انت ماسكه، والـ [[while]] بتسحب منه node وتحط ولادها. الـ recursion والـ stack نفس الشغل، والفرق إن الـ array مفيهاش حد زي الـ call stack، فمش هتاخد [[Maximum call stack size exceeded]] على شجرة عميقة جدًا.

وفي fib من غير memo على 40: هتستنى حوالي ثانية (عندي ١.٢ ثانية) والناتج [[102334155]]، في حين إن نسخة الـ memo بتحسب fib(70) في أقل من ميلي. السبب إن كل نداء بيعمل نداءين، فالـ complexity حوالي O(2^n)، وكل ما تزود 5 على n الوقت بيتضرب في حوالي ١١. جرّب 45 لو عايز تتأكد، ومتجربش 50.`,
          solCode: R`// count-iter.mjs
const tree = { name: "src", children: [{ name: "app.js" }, { name: "lib", children: [{ name: "db.js" }] }] };
function countFilesIter(root) {
  const stack = [root];
  let files = 0;
  while (stack.length) {
    const node = stack.pop();
    if (!node.children) files++;
    else stack.push(...node.children);
  }
  return files;
}
console.log(countFilesIter(tree));
const slowFib = n => n < 2 ? n : slowFib(n - 1) + slowFib(n - 2);
console.time("fib(40) no memo");
console.log(slowFib(40));
console.timeEnd("fib(40) no memo");
// 2
// 102334155
// fib(40) no memo: 1.172s  (بيختلف حسب الجهاز)`
        },
        {
          cmd: "n log n و log n",
          title: "الـ sort والبحث بياخدوا قد إيه؟ وليه binary search محتاج الداتا مترتبة؟",
          desc: R`البحث العادي في array بيمشي عنصر عنصر: O(n). الـ binary search بيبص في النص ويرمي نص الداتا كل خطوة: O(log n)، يعني مليون عنصر في حوالي ٢٠ خطوة، بس لازم الداتا تبقى مترتبة عشان يعرف يرمي أنهي نص. وأحسن sort عام بالمقارنة O(n log n) زي merge sort و quick sort (quick في المتوسط، و O(n²) في أسوأ حالة)، و [[sort]] في V8 بيستخدم TimSort وهو stable.

فلو هتدوّر مرة واحدة: دوّر خطي O(n). لو هتدوّر كتير: رتّب مرة ودوّر binary، أو ابني Set أو Map وخلاص. وفي الداتابيز ده بالظبط دور الـ index.`,
          example: R`function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1; else hi = mid - 1;
  }
  return -1;
}
const nums = [10, 1, 5, 100, 25];
console.log(nums.sort());
console.log(nums.sort((a, b) => a - b), binarySearch(nums, 25));
// [ 1, 10, 100, 25, 5 ]  ← ترتيب نصوص!
// [ 1, 5, 10, 25, 100 ] 3`,
          try: "جرّب binarySearch على array مش مترتبة وشوف بيرجّع إيه. بعدين جرّب [[toSorted]] بدل [[sort]] واطبع الـ array الأصلية: متغيرتش.",
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم إن الترتيب نفسه ليه تمن، وإمتى يستاهل تدفعه. ومعاه أشهر فخ في JavaScript: الـ sort الافتراضي.",
            how: R`أي sort بيعتمد على المقارنة مينفعش يبقى أسرع من O(n log n) في أسوأ حالة، لأن فيه n! ترتيب ممكن وكل مقارنة بتقسم الاحتمالات نصين. الـ counting sort بيكسر الحد ده لما القيم في مدى صغير (O(n + k)) لأنه مبيقارنش.

merge sort: قسّم نصين، ورتّب كل نص، وادمج. دايمًا O(n log n) و stable، بس محتاج ذاكرة إضافية O(n). quick sort: اختار pivot، وحط الأصغر شمال والأكبر يمين، وكرر. in-place وسريع عمليًا، بس pivot وحش يوصّله O(n²). و TimSort هجين من merge و insertion sort، وبيستغل الأجزاء المترتبة أصلًا فيبقى قريب من O(n) على داتا شبه مترتبة.

والمواصفة من ES2019 بتلزم إن [[sort]] يبقى stable: العناصر المتساوية تفضل بترتيبها. ومن غير compare function بيحوّل كل حاجة لـ string ويرتب أبجدي. و [[sort]] بيعدّل الـ array نفسها، و [[toSorted]] (ES2023) بترجّع نسخة.`,
            when: "Follow-ups: «stable sort يعني إيه ومهم إمتى؟» (رتّب بالتاريخ وبعدين بالحالة). «quick sort أسوأ حالة إمتى؟». «ترتب ملف 100GB إزاي؟» (external merge sort). «binary search على الإجابة نفسها؟».",
            mistakes: R`[[sort()]] من غير compare على أرقام. وتنسى إن [[sort]] بيعدّل الأصل (مشكلة في React state). و binary search على داتا مش مترتبة. و off-by-one في [[lo <= hi]] و [[mid + 1]] فيدخل loop مبيخلصش.`
          },
          lines: [
            "binary search: بيرجّع مكان العنصر أو -1.",
            "حدود المنطقة اللي بندوّر فيها: الكل في الأول.",
            "طول ما المنطقة مش فاضية.",
            "النص ([[>> 1]] قسمة على ٢ وتقريب لتحت).",
            "لقيته: رجّع مكانه.",
            "الهدف أكبر: ارمي النص الشمال. أصغر: ارمي اليمين.",
            "قفلة الـ while.",
            "مش موجود.",
            "قفلة.",
            "أرقام مش مترتبة.",
            "الفخ: sort من غير compare بيرتب كنصوص، فـ 100 قبل 25.",
            "compare صح يرتب أرقام، وبعدين binary search يلاقي 25 في مكان 3."
          ],
          sol: R`على [[[10, 1, 5, 100, 25]]] من غير ترتيب: البحث عن 25 بيرجّع [[-1]] رغم إنه موجود، وعن 1 برضو [[-1]]، وعن 5 بيرجّع [[2]] بالصدفة لأنه قاعد في النص بالظبط. ده أخطر من إنه يفشل دايمًا: ساعات يشتغل، فالـ bug يعدّي من الاختبار. binary search بيرمي نص الـ array كل خطوة على افتراض إن اللي على الشمال أصغر، ولو الافتراض ده مش صح هو بيرمي النص اللي فيه الإجابة.

ومع [[toSorted((a, b) => a - b)]]: الناتج [[[ 1, 5, 10, 25, 100 ]]] والأصلية لسه [[[ 10, 1, 5, 100, 25 ]]]، والبحث عن 25 في المترتبة يرجع [[3]]. [[sort]] بيعدّل الـ array نفسها وبيرجّعها، وده بيعمل bugs لو الـ array جاية props أو state في React. وافتكر إن [[toSorted()]] من غير comparator برضو بيرتب كنصوص.`,
          solCode: R`// bs.mjs
function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1; else hi = mid - 1;
  }
  return -1;
}
const unsorted = [10, 1, 5, 100, 25];
console.log(binarySearch(unsorted, 25), binarySearch(unsorted, 5), binarySearch(unsorted, 1));
const sorted = unsorted.toSorted((a, b) => a - b);
console.log(sorted, unsorted, binarySearch(sorted, 25));
// -1 2 -1
// [ 1, 5, 10, 25, 100 ] [ 10, 1, 5, 100, 25 ] 3`
        }
      ]
    }
  ]
});
