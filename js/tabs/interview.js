// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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

والـ commit messages بشكل Conventional Commits ([[feat:]] و [[fix:]] و [[chore:]]) بتخلي الـ changelog والـ versions تتعمل أوتوماتيك. التفاصيل في تاب «هندسة البرمجيات» وتاب GitHub Actions.`,
            when: "Follow-ups: «بتعمل hotfix إزاي؟». «إيه هي feature flags؟». «بتكتب commit message إزاي؟». «بتبص على إيه في code review؟». «PR كبير قد إيه يبقى كبير؟».",
            mistakes: R`تقول «بنشتغل على main على طول من غير PRs» كأنها ميزة. أو تحفظ Git Flow وتقول إنه الصح لكل مشروع. أو branch عايش أسابيع وفي الآخر conflict ضخم. ورسايل commit زي «fix» و «update».`
          },
          lines: [
            "اعمل branch جديد للـ feature واتنقل عليه.",
            "commit برسالة واضحة: نوع (feat) ومكان (auth) ووصف.",
            "ارفع الـ branch واربطه بالـ remote.",
            "افتح PR على main من الـ commits (بـ GitHub CLI).",
            "بعد الـ review والـ CI: ادمجه commit واحد وامسح الـ branch."
          ]
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
          ]
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
          ]
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
          ]
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
          try: "شغّله، وبعدين خلي الطول ٤٠ ألف بدل ٢٠: الـ some هياخد حوالي ٤ أضعاف (n²)، والـ Set حوالي الضعف بس (n). ده أوضح إثبات للفرق.",
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
          ]
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
          ]
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
          ]
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
          ]
        }
      ]
    },
    {
      t: "التزامن والذاكرة",
      l: 2,
      n: "أسئلة «فاهم الكود بيتنفّذ إزاي فعلًا؟»، وكلها ليها علاقة مباشرة بـ Node وبالداتابيز",
      items: [
        {
          cmd: "concurrency ≠ parallelism",
          title: "إيه الفرق بين إن مهام كتير تتقدم مع بعض، وإنها تشتغل في نفس اللحظة؟ وده يخص Node إزاي؟",
          desc: R`الـ concurrency إنك تدير كذا مهمة في نفس الفترة وتبدّل بينهم، زي طباخ واحد بيقلّب في ٣ حلل. الـ parallelism إنهم يشتغلوا فعلًا في نفس اللحظة على أكتر من core، زي ٣ طباخين. Node بيعمل concurrency عالية بـ thread واحد للـ JavaScript و event loop: وهو مستني الداتابيز أو الشبكة بيخدم طلبات تانية. بس لو فيه حساب تقيل على الـ CPU، كل الطلبات بتقف.

وللـ parallelism في Node: [[worker_threads]] للحسابات التقيلة، أو كذا process (cluster أو pm2 أو كذا container) عشان تستخدم كل الـ cores. تفاصيل الـ event loop في تاب JavaScript.`,
          example: R`// احفظه c.mjs وشغّله: node c.mjs
const sleep = ms => new Promise(r => setTimeout(r, ms));
console.time("serial");
await sleep(500); await sleep(500);
console.timeEnd("serial");
console.time("concurrent");
await Promise.all([sleep(500), sleep(500)]);
console.timeEnd("concurrent");
const t = Date.now(); while (Date.now() - t < 500) {}
// serial: ~1s | concurrent: ~500ms`,
          try: "اعمل سيرفر Express فيه route بيعمل اللوب الأخير ده ٥ ثواني، و route تاني عادي. افتح الأول وبسرعة الثاني: التاني هيستنى. ده الـ event loop وهو مقفول.",
          flag: "script",
          deep: {
            why: "كل مطور Node لازم يعرف ليه سيرفره بيستحمل آلاف الاتصالات، وليه endpoint واحد تقيل ممكن يوقف الكل. ده سؤال شبه أكيد لأي دور backend بـ Node.",
            how: R`الـ event loop بيشغّل الـ JavaScript على thread واحد. أي I/O (شبكة، وداتابيز) بيتسلّم للنظام، ولما النتيجة تيجي الـ callback بيدخل الطابور. الـ promises بتدخل طابور الـ microtasks اللي بيخلص كله قبل أي timer أو I/O callback.

الـ I/O بتاع الشبكة بيستخدم آليات النظام (epoll على لينكس، و IOCP على ويندوز)، وحاجات زي قراية الملفات و [[crypto.pbkdf2]] و [[zlib]] و [[dns.lookup]] بتروح لـ thread pool في libuv حجمه ٤ افتراضيًا ([[UV_THREADPOOL_SIZE]]). يعني Node مش thread واحد بالكامل: الـ JavaScript بتاعك بس هو اللي على thread واحد.

الحساب التقيل (تشفير كبير، ومعالجة صور، و JSON ضخم) بيحجز الـ thread، فالحل worker_thread أو queue تشتغل في process تاني. وفي Python الـ GIL بيمنع الـ threads تشغّل Python بالتوازي (وفيه build تجريبي من غيره من 3.13)، فالـ parallelism هناك غالبًا بـ processes.`,
            when: "Follow-ups: «Node single-threaded إزاي بيخدم آلاف الطلبات؟». «endpoint بيعمل حساب تقيل وبيبطّأ الكل، تعمل إيه؟». «Promise.all ولا await جوه for؟». «إيه هو الـ thread pool بتاع libuv؟».",
            mistakes: R`تقول async يعني parallel. وتقول Node single-threaded بالكامل. و await جوه for لطلبات مستقلة عن بعض فتاخد مجموع الأوقات. واستخدام دوال sync زي [[bcrypt.hashSync]] أو [[readFileSync]] جوه request handler.`
          },
          lines: [
            "دالة بتستنى ms من غير ما تقفل الـ thread.",
            "عدّاد للتنفيذ ورا بعض.",
            "استنى نص ثانية، وبعدين نص ثانية تانية: المجموع ثانية.",
            "اطبع الوقت.",
            "عدّاد للتنفيذ مع بعض.",
            "الاتنين مع بعض: الوقت نص ثانية بس. concurrency من غير أي thread إضافي.",
            "اطبع الوقت.",
            "لوب CPU بيحجز الـ thread نص ثانية: في سيرفر، ولا طلب تاني هيتخدم في الوقت ده."
          ]
        },
        {
          cmd: "ذاكرة منفصلة ولا مشتركة",
          title: "إيه الفرق بين الـ process والـ thread؟",
          desc: R`الـ process برنامج شغال بذاكرة لوحده معزولة، ولو وقع مبيوقعش غيره. الـ thread خط تنفيذ جوه process، والـ threads في نفس الـ process بيشاركوا نفس الذاكرة. فالـ threads أخف وأسرع في التواصل لأنهم شايفين نفس الداتا، بس ده نفسه اللي بيعمل race conditions ومحتاج locks. والـ processes أتقل بس أأمن، وبيتواصلوا بـ IPC أو الشبكة أو الداتابيز.

مثال عملي: Chrome بيشغّل التابات في processes منفصلة عشان تاب واقع ميوقعش الباقي. و Node بيشغّل الـ JavaScript في thread واحد، ولو عايز cores أكتر بتشغّل كذا process وقدامهم load balancer.`,
          example: R`// احفظه w.mjs وشغّله: node w.mjs
import { Worker, isMainThread, parentPort } from "node:worker_threads";
if (isMainThread) {
  const w = new Worker(new URL(import.meta.url));
  w.on("message", sum => console.log("from worker:", sum));
  console.log("main thread is free");
} else {
  let s = 0; for (let i = 0; i < 1e9; i++) s += i;
  parentPort.postMessage(s);
}
// main thread is free   ← بيطبع على طول
// from worker: 499999999067109000   ← بعد ثانية تقريبًا`,
          try: "شغّله، وبعدين انقل لوب المليار للـ main thread من غير Worker: «main thread is free» هتتأخر لحد ما اللوب يخلص.",
          flag: "script",
          deep: {
            why: "أساس أي كلام عن الأداء والـ scaling والأعطال: ليه الـ container بيوقع لوحده، وليه الـ threads محتاجة حذر، وليه Node بيعمل scale بـ processes.",
            how: R`كل process ليها virtual address space خاص بيها، و PID، وملفات مفتوحة، ونظام التشغيل بيوزّع وقت المعالج بين الـ processes والـ threads (scheduling). التبديل بينهم (context switch) ليه تكلفة، وبين الـ processes أغلى لأن الذاكرة كلها بتتبدل.

الـ threads في نفس الـ process بيشاركوا الـ heap والملفات المفتوحة، بس كل thread ليه stack خاص بيه ومكان تنفيذ خاص. عشان كده متغير مشترك بين threadين محتاج lock.

في Node كل worker thread ليه V8 isolate و event loop لوحده، فمبيشاركوش objects JavaScript عادي: بيتكلموا برسايل ([[postMessage]] بتنسخ الداتا)، أو [[SharedArrayBuffer]] مع [[Atomics]] لو محتاج ذاكرة مشتركة فعلًا. والـ containers نفسها مجرد processes معزولة بـ namespaces و cgroups. التفاصيل في تاب Docker.`,
            when: "Follow-ups: «ليه Chrome بيستخدم processes؟». «worker thread ولا child process؟». «الـ threads بيشاركوا إيه ومش بيشاركوا إيه؟». «context switch يعني إيه؟». «الـ container هو VM؟».",
            mistakes: R`إن الـ threads ملهاش تكلفة. وإن worker_threads في Node بيشاركوا الـ objects عادي. وتخلط process بـ program (البرنامج ملف، والـ process نسخة شغالة منه). وتقول الـ container VM صغيرة.`
          },
          lines: [
            "أدوات الـ worker threads.",
            "لو ده الـ thread الأساسي:",
            "شغّل نفس الملف في worker thread جديد.",
            "لما الـ worker يبعت النتيجة اطبعها.",
            "الـ thread الأساسي فاضي يكمّل شغله على طول.",
            "غير كده (احنا جوه الـ worker):",
            "حساب تقيل: جمع مليار رقم.",
            "ابعت النتيجة للـ thread الأساسي برسالة.",
            "قفلة."
          ]
        },
        {
          cmd: "check-then-act و circular wait",
          title: "يعني إيه race condition و deadlock؟ وممكن يحصلوا في Node وهو thread واحد؟",
          desc: R`الـ race condition لما النتيجة بتعتمد على ترتيب حاجتين شغالين مع بعض. أشهر شكل check-then-act: طلبين في نفس الوقت شافوا إن المخزون ١، والاتنين باعوا. وأيوه بتحصل في Node: كل [[await]] بيسيب الـ event loop يخدم طلب تاني في النص، وكمان غالبًا عندك كذا instance وداتابيز واحدة. والحل إن العملية تبقى atomic: [[UPDATE ... SET stock = stock - 1 WHERE stock > 0]] وتشوف كام صف اتغير، أو transaction مع [[SELECT ... FOR UPDATE]]، أو unique constraint.

والـ deadlock لما اتنين كل واحد ماسك حاجة ومستني اللي مع التاني، فمحدش بيتحرك: transaction قفلت صف A ومستنية B، والتانية قفلت B ومستنية A. الحل ترتيب ثابت للقفل، ومهلة، و retry. و PostgreSQL بيكتشفه ويلغي واحدة منهم.`,
          example: R`// احفظه r.mjs وشغّله: node r.mjs
let stock = 1;
const read = async () => { await null; return stock; };
async function buy() {
  const s = await read();
  if (s > 0) { stock = s - 1; return "ok"; }
  return "sold out";
}
console.log(await Promise.all([buy(), buy()]), stock);
// [ 'ok', 'ok' ] 0   ← اتباع ٢ والمخزون كان ١
// الحل في SQL: خصم atomic، ولو rowCount = 0 يبقى خلص
// UPDATE products SET stock = stock - 1 WHERE id = $1 AND stock > 0;`,
          try: "شغّله وشوف البيعتين. بعدين غيّر [[buy]] بحيث الخصم والتشيك يحصلوا من غير await في النص، وشوف النتيجة. في مشروع بداتابيز جرّب نفس الفكرة بطلبين متوازيين من [[Promise.all]].",
          flag: "script",
          deep: {
            why: "الـ bugs دي مبتظهرش وانت بتجرب لوحدك، وبتظهر في الإنتاج وقت الزحمة: كوبون اتستخدم مرتين، ودفع اتسجل مرتين، ومخزون بالسالب. وده بيفرق جامد في أي نظام فيه فلوس.",
            how: R`الجزء اللي لازم يتنفّذ من غير مقاطعة اسمه critical section. في كود multi-threaded بنحميه بـ mutex. في Node مفيش مقاطعة بين سطرين sync، بس أي await نقطة ممكن طلب تاني يدخل فيها، والداتابيز مشتركة بين كل الـ instances، فالحماية لازم تبقى في الداتابيز.

أدوات الداتابيز: عملية واحدة atomic ([[UPDATE ... WHERE stock > 0]] بتشيك وتعدّل في خطوة). و pessimistic locking: [[SELECT ... FOR UPDATE]] جوه transaction بيقفل الصف لحد الـ commit. و optimistic locking: عمود version، والـ update بيشترط [[WHERE version = 3]]، ولو محدش اتغير تعيد. و unique constraint يمنع التكرار من أساسه (زي استخدام كوبون مرة لكل يوزر).

الـ deadlock ليه ٤ شروط لازم يتحققوا مع بعض: mutual exclusion، و hold and wait، و no preemption، و circular wait. اكسر أي واحد يختفي، وأسهلهم عمليًا الترتيب الثابت (دايمًا اقفل الـ ids من الصغير للكبير). والـ PostgreSQL لما يلاقي deadlock بيلغي transaction برسالة [[deadlock detected]]، والكود بتاعك لازم يعمل retry.`,
            when: "Follow-ups: «إزاي تمنع إن كوبون يستخدم مرتين؟». «optimistic ولا pessimistic locking؟». «PostgreSQL بيعمل إيه لما يلاقي deadlock؟». «إيه شروط الـ deadlock الأربعة؟». «mutex في الذاكرة ينفع لو عندك ٣ instances؟».",
            mistakes: R`تقول Node مفيهوش race conditions عشان single-threaded. وتحل بـ if في الكود قبل الـ update. وتحط lock في ذاكرة الـ process وعندك كذا instance. و transactions بتقفل نفس الصفوف بترتيب مختلف.`
          },
          lines: [
            "المخزون: قطعة واحدة.",
            "قراية المخزون async (زي query للداتابيز).",
            "عملية الشرا:",
            "اقرا المخزون، وهنا الطلب التاني ممكن يدخل.",
            "لو فيه، اخصم وقول ok. بس القيمة دي ممكن تكون قديمة.",
            "غير كده خلص.",
            "قفلة.",
            "طلبين في نفس الوقت: الاتنين قروا 1، والاتنين باعوا."
          ]
        },
        {
          cmd: "reachability",
          title: "الـ stack والـ heap: إيه الفرق؟ والـ garbage collector بيقرر يمسح إيه إزاي؟",
          desc: R`الـ stack ذاكرة صغيرة ومترتبة لكل نداء دالة: متغيراتها المحلية ومكان الرجوع، وبتتشال لوحدها أول ما الدالة ترجع. الـ heap ذاكرة كبيرة للحاجات اللي بتعيش أكتر أو حجمها مش معروف: الـ objects والـ arrays والـ closures. في JavaScript الـ garbage collector بيمسح من الـ heap أي حاجة مبقتش reachable، يعني مفيش طريق يوصلها من الـ roots (المتغيرات الـ global، والـ stack الحالي).

فالـ memory leak في JS مش «نسيت أعمل free»، هو «لسه فيه reference ناسيه»: cache بيكبر من غير حد، أو listener ما اتشالش، أو [[setInterval]] شايل closure، أو Map فيها sessions قديمة.`,
          example: R`// شغّله: node --expose-gc m.mjs
const cache = new Map();
function handle(req) {
  cache.set(req.id, { rows: new Array(10000).fill(req.id) });
}
for (let i = 0; i < 2000; i++) handle({ id: i });
console.log(Math.round(process.memoryUsage().heapUsed / 1e6), "MB");
cache.clear();
global.gc?.();
console.log(Math.round(process.memoryUsage().heapUsed / 1e6), "MB");
// 166 MB ثم 4 MB`,
          try: "شغّله مرة بـ [[--expose-gc]] ومرة من غيره. بعدين شيل [[cache.clear()]]: الذاكرة مش هترجع مهما الـ GC اشتغل، لأن الـ Map لسه شايلاهم. ده شكل الـ leak.",
          flag: "script",
          deep: {
            why: "سيرفر Node ذاكرته بتزيد لحد ما يقع كل كام يوم مشكلة حقيقية ومشهورة. والسؤال بيشوف فاهم الـ GC ولا فاكر إنه بيحل كل حاجة.",
            how: R`الـ GC في V8 generational: أغلب الـ objects بتموت صغيرة، فالـ heap متقسم young generation بيتنضف كتير وبسرعة (بينسخ الأحياء بس)، و old generation للي عاشوا أكتر، وده بيتنضف بـ mark-sweep-compact: يعلّم كل اللي reachable من الـ roots، ويمسح الباقي، ويلم الفراغات. وأغلب الشغل ده incremental و concurrent عشان التوقفات تبقى قصيرة.

الـ reference counting لوحده مبيكفيش لأن objectين بيشاوروا على بعض (cycle) هيفضل العداد بتاعهم 1 للأبد. الـ mark-and-sweep بيحل ده: لو مفيش طريق ليهم من الـ roots يتمسحوا.

وقول «الـ primitives على الـ stack والـ objects على الـ heap» تبسيط: الـ engine هو اللي بيقرر، والـ strings مثلًا في الـ heap. و [[WeakMap]] و [[WeakRef]] بيشيلوا reference مبيمنعش الـ GC. ولما الـ heap يخلص بيطلع [[JavaScript heap out of memory]]، ودي غير [[Maximum call stack size exceeded]] اللي معناها الـ stack اتملى. والتشخيص بـ heap snapshot في DevTools (تاب «المتصفح») أو [[node --inspect]].`,
            when: "Follow-ups: «تكتشف memory leak في Node إزاي؟». «WeakMap بيفرق إيه؟». «ليه الـ recursion العميقة بتوقع بـ stack overflow مش out of memory؟». «ليه reference counting مش كفاية؟».",
            mistakes: R`إن وجود GC معناه مفيش leaks. وإن [[delete obj.x]] أو [[x = null]] بيحرر الذاكرة فورًا: بيشيل reference بس، والـ GC يجي وقت ما يجي. و cache في الذاكرة من غير حد أقصى ولا TTL.`
          },
          lines: [
            "cache عايش طول عمر الـ process.",
            "handler بيخزّن حاجة لكل طلب.",
            "كل طلب بيحط array فيها ١٠ آلاف عنصر في الـ cache.",
            "قفلة.",
            "٢٠٠٠ طلب.",
            "الـ heap دلوقتي: حوالي 166MB، ومحدش بيمسحها لأن الـ Map شايلاها.",
            "شيل الـ references.",
            "اطلب GC دلوقتي (موجود بس مع [[--expose-gc]]).",
            "الذاكرة رجعت: مبقاش فيه طريق للـ arrays دي."
          ]
        }
      ]
    },
    {
      t: "OOP والتصميم",
      l: 2,
      n: "التعريفات لوحدها مبتنجّحش: كل إجابة هنا لازم معاها مثال من كود حقيقي. التفاصيل في تاب «هندسة البرمجيات»",
      items: [
        {
          cmd: "encapsulation · abstraction · inheritance · polymorphism",
          title: "اشرح أعمدة الـ OOP الأربعة بمثال واحد",
          desc: R`الـ encapsulation: الـ object بيخبّي الداتا بتاعته وبيسمح بتعديلها من methods بس، فمحدش يحط رصيد سالب مثلًا. الـ abstraction: بتتعامل مع واجهة بسيطة ([[send(msg)]]) من غير ما تعرف التفاصيل. الـ inheritance: class بتاخد سلوك class تانية وتزوّد عليه. الـ polymorphism: نفس النداء بيعمل حاجة مختلفة حسب الـ object: [[notifier.send()]] مع الإيميل غير مع الـ SMS، والكود اللي بينادي مش فارق معاه.

وضيف إنك بتفضّل composition على inheritance: شجرة وراثة عميقة بتبقى هشة، وتجميع objects صغيرة أسهل في التغيير.`,
          example: R`class Account {
  #balance = 0;
  deposit(x) { if (x <= 0) throw new Error("invalid"); this.#balance += x; }
  get balance() { return this.#balance; }
}
class Notifier { send(msg) { throw new Error("not implemented"); } }
class EmailNotifier extends Notifier { send(msg) { return $__btemail: $__{msg}$__bt; } }
class SmsNotifier extends Notifier { send(msg) { return $__btsms: $__{msg}$__bt; } }
const a = new Account(); a.deposit(100); console.log(a.balance);
for (const n of [new EmailNotifier(), new SmsNotifier()]) console.log(n.send("paid"));
// 100  email: paid  sms: paid`,
          try: "جرّب [[a.#balance = -5]] من برا الـ class وشوف الـ SyntaxError. بعدين ضيف [[PushNotifier]] من غير ما تلمس اللوب الأخير: ده الـ polymorphism.",
          flag: "script",
          deep: {
            why: "سؤال كلاسيكي في كل انترفيو junior و mid. الإنترفيوير مش عايز التعريفات من الكتاب، عايز يشوف إنك بتستخدمها في كود حقيقي.",
            how: R`في JavaScript الـ class تجميل فوق الـ prototypes: [[extends]] بيربط الـ prototype بتاع الابن بالأب، والـ method بيتدوّر عليها في السلسلة دي. والـ [[#field]] private بجد على مستوى اللغة، مش مجرد اتفاق زي [[_field]].

الـ polymorphism في JS مش محتاج inheritance أصلًا (duck typing): أي object عنده [[send]] ينفع. و TypeScript بيخلي ده صريح بـ [[interface Notifier { send(msg: string): string }]]، وأي class بتطبّقها تنفع مكانها.

والـ composition: بدل شجرة وراثة زي [[AdminUser extends User]] و [[User extends Person]]، اليوزر عنده [[permissions]] و [[notifier]] كـ objects بتتحقن فيه. تغيير سلوك يبقى تبديل جزء، مش إعادة ترتيب شجرة. والـ React نفسها بتقول نفس الكلام: components بتتركب مش بتورث.`,
            when: "Follow-ups: «composition ولا inheritance؟». «JS فيها classes بجد؟». «abstract class ولا interface؟». «overloading ولا overriding؟». «encapsulation بتفرق إيه عن abstraction؟».",
            mistakes: R`تعرّف الـ encapsulation إنها «private variables» وبس. وتقول الـ inheritance هي طريقة إعادة الاستخدام الأساسية. وتخلط abstraction و encapsulation. وتحفظ تعريفات من غير مثال.`
          },
          lines: [
            "حساب بنكي.",
            "الرصيد private: محدش يوصله من برا (encapsulation).",
            "التعديل من method بس، وهي اللي بتمنع القيم الغلط.",
            "قراية الرصيد من getter.",
            "قفلة.",
            "الواجهة العامة: أي notifier عنده send (abstraction).",
            "إيميل بيورث من Notifier ويطبّق send بطريقته (inheritance).",
            "SMS نفس الواجهة بتنفيذ مختلف.",
            "استخدم الحساب: 100.",
            "نفس النداء بيطلّع نتيجة مختلفة حسب الـ object (polymorphism)."
          ]
        },
        {
          cmd: "SOLID",
          title: "قول مبادئ التصميم الخمسة المشهورة بحروفها، سطر لكل واحد",
          desc: R`S (Single Responsibility): كل module ليه سبب واحد يتغير عشانه، فالـ controller ميبعتش إيميلات بنفسه. O (Open/Closed): تضيف سلوك جديد بإضافة كود مش بتعديل كود شغال، زي مزود دفع جديد من غير ما تلمس الـ checkout. L (Liskov): أي class فرعية تتحط مكان الأصلية من غير مفاجآت. I (Interface Segregation): واجهات صغيرة محددة بدل واحدة ضخمة. D (Dependency Inversion): الكود المهم يعتمد على واجهة مش على تنفيذ معين، فتقدر تبدّل الداتابيز أو تحط fake في الاختبار.

وقولها بتواضع: دي إرشادات مش قوانين، وتطبيقها بزيادة بيطلّع abstractions ملهاش لازمة.`,
          example: R`// احفظه s.mjs: الـ service معتمد على repo و mailer من برا (D)
function makeOrderService({ repo, mailer }) {
  return {
    async place(order) {
      const saved = await repo.save(order);
      await mailer.send(order.email, "order confirmed");
      return saved;
    }
  };
}
const fakeRepo = { save: async o => ({ id: 1, ...o }) };
const fakeMailer = { send: async () => {} };
const svc = makeOrderService({ repo: fakeRepo, mailer: fakeMailer });
console.log(await svc.place({ email: "you@example.com", item: "book" }));`,
          try: "بدّل fakeMailer بواحد بيطبع الرسالة، من غير ما تلمس [[makeOrderService]]. بعدين فكّر: لو الـ service كان بيعمل [[import { sendEmail }]] بنفسه، كنت هتختبره إزاي من غير ما يبعت إيميل بجد؟",
          flag: "script",
          deep: {
            why: "بيبيّن إنك بتفكر في الكود على المدى الطويل: هيتغير إزاي، وهيتختبر إزاي. وبيفتح كلام عن مشاريعك: «فين خالفت S وصلّحتها؟».",
            how: R`S: «سبب التغيير» يعني مين اللي هيطلب التعديل. لو المحاسب والمصمم الاتنين هيطلبوا تعديل في نفس الملف، ده ملف فيه مسؤوليتين.

O: بتتحقق غالبًا بـ Strategy أو plugins: map من مزودين الدفع، وتضيف واحد جديد بسطر، والـ checkout مبيتلمسش.

L: المثال المشهور Square و Rectangle: المربع «هو» مستطيل رياضيًا، بس لو كود بيغيّر العرض ويتوقع الطول ثابت، المربع هيكسره. ومثال أقرب: [[ReadOnlyRepo]] بيورث من [[Repo]] ويرمي error في [[save]]: أي كود بيستخدم Repo هيتفاجئ.

I: كلاينت محتاج [[read]] بس ميتجبرش يعتمد على واجهة فيها ٢٠ method.

D: الـ Dependency Inversion مبدأ (المهم يعتمد على abstraction)، والـ Dependency Injection طريقة لتطبيقه (تمرر الـ dependencies من برا زي المثال). في JS و TS غالبًا مش محتاج framework لده: دوال بتاخد dependencies كفاية.`,
            when: "Follow-ups: «اديني مثال على مخالفة لـ S من كودك». «الفرق بين Dependency Inversion و Dependency Injection؟». «Liskov بمثال؟». «إمتى SOLID يبقى over-engineering؟».",
            mistakes: R`تحفظ الأسامي من غير مثال. وتقول S يعني «الدالة تعمل حاجة واحدة» (قريب، بس المبدأ عن سبب التغيير). و interface لكل class حتى لو ليها تنفيذ واحد وعمرها ما هتتبدل. وتقول مثال Square و Rectangle وانت مش فاهم ليه بيكسر.`
          },
          lines: [
            "factory للـ service بياخد الـ dependencies كـ parameters.",
            "بيرجّع object فيه العمليات.",
            "عملية الطلب:",
            "احفظ بأي repo اتدّاله (داتابيز حقيقية أو fake).",
            "ابعت تأكيد بأي mailer اتدّاله.",
            "رجّع النتيجة.",
            "قفلة place.",
            "قفلة الـ object.",
            "قفلة الـ factory.",
            "repo مزيف للاختبار: بيرجّع الـ order ومعاه id.",
            "mailer مزيف مبيبعتش حاجة.",
            "ركّب الـ service بالمزيفين.",
            "جرّبه من غير داتابيز ولا إيميل."
          ]
        },
        {
          cmd: "Singleton و Factory",
          title: "اشرح pattern بيضمن نسخة واحدة بس من حاجة، و pattern بيخبّي إزاي الـ objects بتتعمل",
          desc: R`الأول Singleton: نسخة واحدة بس من حاجة في التطبيق، زي الاتصال بالداتابيز أو الـ logger. في JS الـ module نفسه بيتحمّل مرة واحدة ويتكاش، فأي حاجة بتعملها فيه بتبقى نسخة واحدة لكل process. ومثال حقيقي: في Next.js وقت التطوير الـ hot reload بيعيد تحميل الملفات، فبتحفظ الـ pool أو Prisma client على [[globalThis]] عشان ميفتحش connections جديدة كل مرة. التاني Factory: دالة بتقرر تعمل أنهي object بدل ما الكود يعمل [[new]] بنفسه، زي [[createPaymentProvider(country)]] ترجّع المزود المناسب.

وعيوب الـ Singleton لازم تقولها: global state مستخبي، وصعب في الاختبار. عشان كده الأحسن تعمل النسخة الواحدة وتمررها (dependency injection) بدل ما كل ملف يجيبها بنفسه.`,
          example: R`// lib/db.js: نسخة واحدة تعيش حتى مع الـ hot reload
import pg from "pg";
const g = globalThis;
export const pool = g.pool ?? new pg.Pool({ connectionString: process.env.DATABASE_URL });
if (process.env.NODE_ENV !== "production") g.pool = pool;
// Factory: الكود بيطلب «مزود دفع» ومش فارق معاه أنهي
export function createPaymentProvider(country) {
  if (country === "EG") return { name: "local", pay: amount => $__btlocal:$__{amount}$__bt };
  return { name: "stripe", pay: amount => $__btstripe:$__{amount}$__bt };
}`,
          try: "في مشروع Next.js عندك، دوّر على المكان اللي بيتعمل فيه client الداتابيز: هل محمي من الـ hot reload بـ globalThis؟ لو لأ، عدّل ملف كذا مرة وراقب عدد الـ connections في الداتابيز.",
          flag: "script",
          deep: {
            why: "«إيه الـ patterns اللي استخدمتها؟» سؤال شبه ثابت. وأحسن إجابة pattern استخدمته فعلًا في مشروع وتعرف ليه، مش قايمة محفوظة.",
            how: R`Node بيحفظ كل module اتحمّل في cache، فالمرة التانية اللي تعمل import بترجع نفس الـ exports. ده singleton لكل process بس: لو شغّال ٤ processes أو serverless فيه instances كتير، يبقى عندك ٤ نسخ أو أكتر، وكل واحدة ليها connection pool.

في Next.js وقت التطوير، الـ HMR بيعيد تقييم الملفات اللي اتغيرت، فالـ module بيتنفّذ تاني ويعمل pool جديد، والقديم لسه فاتح connections، لحد ما الداتابيز تقول «too many connections». الـ [[globalThis]] مبيتمسحش مع إعادة التحميل، فبنخزّن فيه. وفي الإنتاج مش محتاجه لأن الـ module بيتحمّل مرة.

الـ Factory أنواع: simple factory (دالة بـ if أو map)، و factory method (الـ subclass بتقرر)، و abstract factory (عيلة objects مع بعض). والأحسن من if/else طويلة map: [[{ EG: makeLocal, default: makeStripe }]]. وفيه Builder لما الـ object ليه إعدادات كتير اختيارية.`,
            when: "Follow-ups: «ليه الـ Singleton ساعات بيتقال عليه anti-pattern؟». «الـ module في Node singleton فعلًا؟». «Factory ولا constructor عادي؟». «Builder إمتى؟». «patterns تانية استخدمتها؟» (Middleware في Express هو Chain of Responsibility، و Adapter لما تلف مكتبة خارجية).",
            mistakes: R`تقول الـ Singleton «نسخة واحدة في السيرفر كله» وانت شغال بكذا process أو serverless. وتعمل Singleton لكل حاجة فالاختبارات تبقى معتمدة على بعض. و Factory فيه if/else بتكبر مع كل نوع جديد.`
          },
          lines: [
            "مكتبة PostgreSQL لـ Node.",
            "اختصار للـ global object.",
            "لو فيه pool متخزن استخدمه، غير كده اعمل واحد جديد.",
            "في التطوير خزّنه على globalThis عشان الـ hot reload ميعملش واحد جديد كل مرة.",
            "الـ factory: بياخد البلد ويرجّع مزود.",
            "مصر: مزود محلي.",
            "غير كده: Stripe. الاتنين نفس الشكل، فالكود اللي بينادي مش فارق معاه.",
            "قفلة."
          ]
        },
        {
          cmd: "Observer و Strategy",
          title: "اشرح pattern بيخلي أجزاء تسمع لحدث من غير ما تعرف بعض، و pattern بيخليك تبدّل الخوارزمية وقت التشغيل",
          desc: R`الأول Observer: حاجة بتعلن حدث، وأي عدد من المستمعين بيتسجلوا ويتبلغوا من غير ما المعلن يعرفهم. ده [[addEventListener]] في المتصفح، و [[EventEmitter]] في Node، والـ subscriptions في state management. التاني Strategy: عندك كذا طريقة لنفس المهمة (حساب شحن، أو مزود دفع، أو ترتيب)، فكل طريقة في دالة لوحدها بنفس الشكل، والكود بيختار واحدة وقت التشغيل بدل if/else طويلة.

مثال حقيقي: بعد ما الـ order يتدفع، الـ service بيعمل [[emit("order.paid")]]، والإيميل والفاتورة والإحصائيات كلهم listeners، فتضيف واحد جديد من غير ما تلمس كود الدفع.`,
          example: R`import { EventEmitter } from "node:events";
const bus = new EventEmitter();
bus.on("order.paid", o => console.log("email to", o.email));
bus.on("order.paid", o => console.log("invoice for", o.id));
const shipping = {
  standard: w => 30 + w * 5,
  express: w => 60 + w * 8,
  pickup: () => 0
};
const order = { id: 7, email: "you@example.com", weight: 2, method: "express" };
console.log("shipping:", shipping[order.method](order.weight));
bus.emit("order.paid", order);
// shipping: 76  email to you@example.com  invoice for 7`,
          try: "ضيف listener تالت بيرمي error، وشوف الـ emit بيعمل إيه في الباقي. بعدين ضيف طريقة شحن [[sameDay]] بسطر واحد من غير ما تلمس أي if.",
          flag: "script",
          deep: {
            why: "الاتنين موجودين في كل كود JavaScript حتى لو مش بتسميهم. لو عرفت تشاور عليهم في كودك، إجابتك بتبقى أقوى بكتير من التعريف.",
            how: R`Observer: الـ subject شايل لستة listeners، والـ emit بيلف عليهم. في [[EventEmitter]] الـ listeners بيتنفّذوا sync بترتيب التسجيل، ولو واحد رمى error من غير ما حد يمسكه، الـ emit نفسه بيرمي والباقي مبيتنفّذش. ولو سجلت listeners كتير على نفس الحدث من غير ما تشيلهم، Node بيطبع [[MaxListenersExceededWarning]] (الحد الافتراضي ١٠) لأنه غالبًا leak.

والفرق عن pub/sub: في Observer المستمع بيتسجل عند الـ subject مباشرة وفي نفس الـ process. في pub/sub فيه وسيط (Redis، أو queue) والطرفين ممكن يبقوا في سيرفرات مختلفة، وده اللي بتحتاجه لما يبقى عندك أكتر من instance.

Strategy في JS غالبًا مجرد object من دوال أو map زي المثال، وده تطبيق مباشر لـ Open/Closed: طريقة جديدة = إضافة مش تعديل. وفيه patterns تانية بتظهر في كودك كل يوم: الـ middleware في Express (Chain of Responsibility)، و Adapter لما تلف مكتبة خارجية بواجهة بتاعتك.`,
            when: "Follow-ups: «الفرق بين Observer و Pub/Sub؟». «EventEmitter sync ولا async؟». «listener رمى error يحصل إيه؟». «Strategy ولا if/else؟». «patterns تانية استخدمتها؟».",
            mistakes: R`تفتكر الـ emit بيشغّل الـ listeners async في الخلفية. وتنسى [[off]] أو [[removeListener]] فيحصل leak. و events لكل حاجة فتبقى مش عارف مين بينادي مين وأنهي ترتيب.`
          },
          lines: [
            "الـ EventEmitter من Node.",
            "«bus» للأحداث.",
            "listener: ابعت إيميل لما order يتدفع.",
            "listener تاني لنفس الحدث: اعمل فاتورة. الاتنين مش عارفين بعض.",
            "الـ strategies: كل طريقة شحن دالة بنفس الشكل (الوزن ← السعر).",
            "عادي.",
            "سريع.",
            "استلام من المكان.",
            "قفلة.",
            "order اليوزر اختار فيه express.",
            "اختار الـ strategy وقت التشغيل من غير أي if: 76.",
            "أعلن الحدث: الـ listeners الاتنين يشتغلوا بالترتيب."
          ]
        }
      ]
    },
    {
      t: "الكود في الانترفيو",
      l: 2,
      n: "بتختبر إزاي، وبتكتب إزاي، وبتحل مسألة قدام حد إزاي",
      items: [
        {
          cmd: "unit · integration · e2e",
          title: "إيه أنواع الاختبارات؟ وبتختبر إيه في مشروعك بالظبط؟",
          desc: R`الـ unit بيختبر دالة أو وحدة لوحدها بسرعة ومن غير شبكة أو داتابيز. الـ integration بيختبر كذا جزء مع بعض، زي endpoint حقيقي مع داتابيز اختبار. والـ e2e بيشغّل التطبيق كله في متصفح زي اليوزر (Playwright مثلًا). الهرم: unit كتير لأنها رخيصة وسريعة، و integration أقل، و e2e قليل للمسارات الحرجة زي التسجيل والدفع.

وقول إزاي بتختار: بختبر الـ business logic اللي لو باظت هتكلّف فلوس (حساب السعر، والصلاحيات، والـ webhooks)، مش الـ getters. وفيه كمان smoke test بعد الـ deploy، و regression test لكل bug اتصلّح عشان ميرجعش. الأدوات في تاب «فحص الكود».`,
          example: R`import { describe, it, expect } from "vitest";
import { applyCoupon } from "./pricing.js";
describe("applyCoupon", () => {
  it("applies a percentage discount", () => {
    expect(applyCoupon(200, { type: "percent", value: 10 })).toBe(180);
  });
  it("never goes below zero", () => {
    expect(applyCoupon(50, { type: "fixed", value: 80 })).toBe(0);
  });
});`,
          try: "اكتب [[applyCoupon]] في [[pricing.js]] وشغّل [[npx vitest run]]. بعدين بوّظ الدالة عمدًا (شيل الـ Math.max) وشوف أنهي اختبار وقع ورسالته بتقول إيه.",
          flag: "script",
          deep: {
            why: "الشركات عايزة حد تقدر تثق إن تعديله مش هيكسر حاجة تانية. والسؤال بيكشف هل الاختبارات عندك عادة ولا كلمة في الـ CV.",
            how: R`الـ test doubles: الـ stub بيرجّع قيمة ثابتة، والـ mock بيتأكد إنه اتنادى بشكل معين، والـ fake تنفيذ بسيط شغال (repo في الذاكرة)، والـ spy بيراقب دالة حقيقية. القاعدة: اعمل mock للحدود الخارجية (بوابة الدفع، والإيميل، و APIs بره)، ومتعملش mock لكودك انت وإلا الاختبار بيختبر الـ mocks.

الـ integration مع داتابيز: داتابيز اختبار منفصلة (غالبًا في Docker)، وكل اختبار في transaction بتترجع في الآخر أو بيبدأ بداتا نضيفة. وفيه رأي مشهور (testing trophy) إن الـ integration بيدّي أكبر ثقة مقابل التكلفة في تطبيقات الويب.

الـ coverage بيقولك أنهي سطور اتنفذت، مش هل اتختبرت صح. و TDD: اكتب اختبار فاشل، وبعدين أقل كود يعدّيه، وبعدين حسّن (red، green، refactor). والـ flaky test (بينجح ويفشل من غير تغيير) أوحش من مفيش اختبار، لأنه بيعلّم الفريق يتجاهل الأحمر. التفاصيل في تاب «هندسة البرمجيات».`,
            when: "Follow-ups: «بتعمل mock لإيه ومتعملوش لإيه؟». «coverage كام يبقى كويس؟». «بتعمل TDD؟». «اختبار flaky تعمل فيه إيه؟». «تختبر webhook الدفع إزاي؟».",
            mistakes: R`«مبكتبش tests» من غير أي خطة، أو العكس «coverage 100%» كهدف. و mock لكل حاجة. و e2e لكل حاجة فالـ CI ياخد ساعة. ولو مشاريعك مفيهاش اختبارات قول ده بصراحة، وقول هتبدأ بإيه وليه: ده أحسن من إنك تدّعي.`
          },
          lines: [
            "أدوات الاختبار من Vitest.",
            "الدالة اللي بنختبرها.",
            "مجموعة اختبارات للدالة دي.",
            "حالة: خصم نسبة.",
            "200 بخصم 10% لازم تبقى 180.",
            "قفلة الحالة.",
            "حالة حدّية: الخصم أكبر من السعر.",
            "النتيجة لازم تبقى صفر مش بالسالب.",
            "قفلة الحالة.",
            "قفلة المجموعة."
          ]
        },
        {
          cmd: "readable قبل clever",
          title: "إيه اللي بيخلي الكود «نضيف»؟ واديني مثال عدّلته",
          desc: R`الكود بيتقري أكتر ما بيتكتب بكتير، فالنضافة يعني حد تاني (أو انت بعد ٦ شهور) يفهمه بسرعة ويعدّله من غير خوف. عمليًا: أسماء بتقول النية ([[isNewMember]] مش [[flag2]])، ودوال صغيرة بتعمل حاجة واحدة، و early return بدل if جوه if، ومفيش أرقام سحرية، والـ errors بتتعامل صح مش بتتبلع، وتكرار أقل (DRY) بس من غير abstraction بدري.

وقول KISS و YAGNI: أبسط حل شغال، ومتبنيش حاجة «يمكن نحتاجها». والأدوات بتساعد: prettier للشكل، و eslint للعادات، و TypeScript للأنواع.`,
          example: R`// قبل
function p(u, d) {
  if (u) { if (u.s === 1) { if (Date.now() - u.t < 2592000000) { return d * 0.9; } } }
  return d;
}
// بعد
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
const ACTIVE = 1;
const NEW_MEMBER_DISCOUNT = 0.9;
function priceForUser(user, price) {
  if (!user || user.status !== ACTIVE) return price;
  const isNewMember = Date.now() - user.joinedAt < THIRTY_DAYS_MS;
  return isNewMember ? price * NEW_MEMBER_DISCOUNT : price;
}`,
          try: "خد دالة طويلة من مشروع قديم عندك وطبّق عليها: أسماء واضحة، و early return، و constants بدل الأرقام. اعرضها على حد واسأله «بتعمل إيه؟» قبل وبعد.",
          flag: "script",
          deep: {
            why: "الكود اللي هتكتبه في الـ live coding والـ take-home بيتقيّم بعين «هل أحب أراجع PRs الشخص ده؟». والسؤال بيشوف ذوقك في الكود.",
            how: R`الـ comment يشرح «ليه» مش «إيه»: [[// Paymob sends amounts in cents]] مفيد، و [[// increment i]] ضوضاء. ولو محتاج comment يشرح الكود بيعمل إيه، غالبًا الاسم هو اللي محتاج يتغير.

الـ code smells المشهورة: دالة طويلة، و parameters كتير (حوّلها object)، و primitive obsession (string لكل حاجة بدل أنواع واضحة)، و shotgun surgery (تعديل واحد محتاج تلمس ١٠ ملفات)، و feature envy (دالة بتستخدم داتا class تانية أكتر من بتاعتها).

والـ DRY ليه حد: تكرار مرتين أحسن من abstraction غلط، لأن abstraction غلط بتتقل مع كل حالة جديدة بـ if جوه. القاعدة المشهورة: ادمج في التالتة. والـ refactoring الآمن محتاج اختبارات قبله، وخطوات صغيرة، و commit لوحده من غير تغيير سلوك. التفاصيل في تاب «هندسة البرمجيات».`,
            when: "Follow-ups: «إمتى تكتب comment؟». «DRY ممكن يضر إمتى؟». «بتبص على إيه في code review؟». «اديني code smell شفته وصلّحته». «ملف فيه ٢٠٠٠ سطر، تبدأ منين؟».",
            mistakes: R`إن النضيف يعني قصير و clever (one-liner محدش فاهمه). وتقسيم كل سطرين في دالة. و abstraction بعد أول تكرار. و «الكود بتاعي بيوثّق نفسه» كمبرر لأي حاجة.`
          },
          lines: [
            "اسم الدالة والـ parameters مبيقولوش حاجة.",
            "تلات ifs جوه بعض، و 1 و 2592000000 و 0.9 أرقام سحرية.",
            "الحالة العادية.",
            "قفلة.",
            "الرقم بقى اسم، ومحسوب قدامك: ٣٠ يوم بالمللي ثانية.",
            "حالة اليوزر النشط باسم.",
            "نسبة الخصم باسم.",
            "الدالة واسمها بيقول بتعمل إيه.",
            "early return: لو مفيش يوزر أو مش نشط، السعر زي ما هو.",
            "الشرط المعقد بقى متغير اسمه بيشرحه.",
            "النتيجة في سطر واضح.",
            "قفلة."
          ]
        },
        {
          cmd: "clarify → examples → brute → optimize → test",
          title: "في مسألة live coding: بتمشي إزاي من أول ما تسمع السؤال لحد ما تسلّم؟",
          desc: R`ست خطوات وأنا بتكلم بصوت عالي طول الوقت: ١) أوضّح المسألة: الـ input شكله إيه وحجمه قد إيه، وفيه سالب أو تكرار أو فاضي؟ ٢) أمثلة صغيرة بإيدي منها edge cases. ٣) الحل البسيط (brute force) وأقول الـ complexity بتاعه. ٤) أحسّن: فين الشغل المتكرر؟ hash map؟ sort؟ two pointers؟ ٥) أكتب الكود نضيف بأسماء واضحة. ٦) أختبره بالأمثلة وأمشي عليه بإيدي، وأقول الـ time والـ space.

الإنترفيوير بيقيّم طريقة التفكير والتواصل قد الحل نفسه أو أكتر. ولو اتزنقت أقول بفكر في إيه، والـ hint مش فشل. المسائل والأنماط في تاب «DSA».`,
          example: R`// المسألة: رجّع أول عنصر بيتكرر في array
// 1. Clarify: "Can it be empty? Numbers only? What if nothing repeats?"
// 2. Examples: [3,1,3,2] -> 3 | [1,2] -> null | [] -> null
// 3. Brute force: "For each element, scan the rest: O(n²) time, O(1) space."
// 4. Optimize: "Trade memory for time with a Set: one pass."
// 5. Code:
function firstRepeat(nums) {
  const seen = new Set();
  for (const n of nums) {
    if (seen.has(n)) return n;
    seen.add(n);
  }
  return null;
}
// 6. Test by hand: [3,1,3,2] → 3, [] → null. "Time O(n), space O(n)."`,
          try: "اختار مسألة من تاب «DSA»، وشغّل تايمر ٣٠ دقيقة، وسجّل صوتك وانت بتحلها بالست خطوات. اسمع التسجيل: فيه فترات سكوت طويلة؟ قلت الـ complexity؟ اختبرت edge case؟",
          flag: "script",
          deep: {
            why: "ناس كتير بتعرف تحل وبتفشل عشان سكتت، أو بدأت تكتب على طول وحلّت مسألة غير المطلوبة، أو مختبرتش. الطريقة دي بتحوّل المسألة لحوار انت ماسكه.",
            how: R`الإنترفيوير عادة بيقيّم أربع حاجات: حل المشكلة (وصلت لحل وحسّنته؟)، والتواصل (فهّمتني انت بتعمل إيه؟)، وجودة الكود (أسماء، وتنظيم، و edge cases)، والتحقق (اختبرت ولقيت أخطاءك بنفسك؟).

الوقت في مقابلة ٤٥ دقيقة تقريبًا: ٥ للتوضيح والأمثلة، و ٥ إلى ١٠ للفكرة والاتفاق عليها قبل الكود، و ٢٠ للكود، و ٥ إلى ١٠ للاختبار والأسئلة الجاية.

وإشارات في نص السؤال بتقترح النمط: «مترتب» ← binary search أو two pointers. «subarray أو substring متصل» ← sliding window. «موجود قبل كده / عد / أزواج» ← hash map. «أكبر k» ← heap. «كل الاحتمالات» ← backtracking. «أقصر طريق / مستويات» ← BFS. ولاحظ إن التوضيح نفسه بيطلّع أسئلة مهمة: «أول عنصر بيتكرر» معناها أول واحد ظهر تاني، ولا أول واحد في الـ array ليه تكرار؟ في [[[2,1,1,2]]] الإجابتين مختلفتين (1 ضد 2).`,
            when: "Follow-ups بعد الحل: «ولو الـ array مش هتدخل في الرام؟». «ولو ممنوع ذاكرة إضافية؟». «ولو الداتا جاية stream؟». «اكتب tests». «إيه أسوأ input للحل ده؟».",
            mistakes: R`تبدأ تكتب على طول من غير توضيح. وتسكت ١٠ دقايق. وتتمسك بالحل الـ optimal ومتكتبش حاجة خالص (brute force شغال أحسن من ولا حاجة). ومتختبرش. وتتجاهل الـ hint. وتقول complexity غلط بثقة.`
          },
          lines: [
            "الدالة باسم واضح.",
            "Set للي شفناه قبل كده.",
            "لف مرة واحدة.",
            "لو شفناه قبل كده: هو أول تكرار.",
            "غير كده سجّله.",
            "قفلة اللوب.",
            "مفيش تكرار.",
            "قفلة."
          ]
        }
      ]
    }
    /*__L3__*/
  ]
});
