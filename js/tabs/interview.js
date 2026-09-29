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
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
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

الـ coverage بيقولك أنهي سطور اتنفذت، مش هل اتختبرت صح. و TDD: اكتب اختبار فاشل، وبعدين أقل كود يعدّيه، وبعدين حسّن (red، green، refactor). والـ flaky test (بينجح ويفشل من غير تغيير) أوحش من مفيش اختبار، لأنه بيعلّم الفريق يتجاهل الأحمر. ولما تلاقي واحد: شغّله لوحده كذا مرة، ودوّر على السبب المعتاد (وقت، أو ترتيب اختبارات، أو داتا مشتركة، أو انتظار ثابت بدل انتظار شرط)، وصلّحه أو اعزله بتذكرة، متسيبوش.

والكود نفسه: «تاب فحص الكود» المستوى التاني ([[vitest]] و [[--coverage]] وكتابة الاختبارات) والمستوى التالت (e2e بـ Playwright)، و «تاب Backend بـ Node» المستوى التالت (integration tests على endpoints حقيقية وداتابيز اختبار)، و «تاب React» المستوى التالت (اختبار الـ components).`,
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
    },
    {
      t: "الأسئلة السلوكية وإنك تحكي",
      l: 3,
      n: "الجولة اللي الـ juniors بيقعوا فيها أكتر: قصص حقيقية مترتبة بـ STAR، ومشروعك بأرقام، وأسئلتك انت في الآخر",
      items: [
        {
          cmd: "tell me about yourself",
          title: "«Tell me about yourself»: بتقول إيه في ٦٠ ثانية؟",
          desc: R`بمشي على ترتيب present ← past ← future. الأول أنا مين دلوقتي: الدور والـ stack في جملة. بعدين حاجة واحدة عملتها تثبت الكلام ده، ومعاها نتيجة برقم. بعدين أنا بشتغل إزاي (حاجة بتميزني). وفي الآخر ليه أنا هنا: ليه الدور ده والشركة دي. ده حوالي ١٢٠ لـ ١٥٠ كلمة، يعني دقيقة.

السؤال ده مش تعارف، ده الـ pitch بتاعك، وهو اللي بيحدد الأسئلة الجاية: أي حاجة تذكرها هيسألك عليها. فاذكر المشروع اللي انت عايز تتسأل عليه، ومتذكرش technology مش هتعرف تتكلم فيها خمس دقايق.`,
          example: R`Present: "I'm a full-stack developer. I work mostly with TypeScript, React and Node, with PostgreSQL behind them."
Proof: "This year I built and deployed an ordering system for a local business: Next.js, Prisma, online payments, on a VPS with Docker."
Result: "It handles about 300 orders a week, and I cut the checkout page load from about 4 seconds to 1.5."
How I work: "I like shipping small, tested changes. I set up the CI and the daily backups on that project myself."
Future: "Now I want to join a team where I can learn from senior engineers and work on a product with real users."
Why you: "Your team builds software for clinics in the region, and that's exactly the kind of product I want to work on."`,
          try: "اكتب إجابتك انت في ٦ جمل بنفس الترتيب (بأرقامك الحقيقية)، وسجّلها بالموبايل بتايمر. لو عدّت ٧٥ ثانية شيل. اسمعها واسأل نفسك: لو أنا الإنترفيوير، هسأل على إيه بعدها؟ وهل ده السؤال اللي أنا عايزه؟",
          flag: "script",
          deep: {
            why: "أول سؤال في أغلب الانترفيوهات، وأول دقيقة بتعمل الانطباع اللي الإنترفيوير بيدوّر بعده على اللي يأكده. الإجابة المرتبة بتقول إنك بتعرف تلخّص وتركّز، ودي مهارة شغل يومية (standup، وتحديث للعميل، ووصف PR).",
            how: R`الـ present جملة واحدة فيها الدور والأدوات الأساسية بس، مش قايمة بكل حاجة لمستها. الـ proof هو قلب الإجابة: مشروع واحد حقيقي، أحسن لو فيه يوزرز أو فلوس أو فريق، ومعاه رقم واحد مقاس (وقت، أو عدد، أو نسبة). والـ how I work بتفرّقك عن باقي المتقدمين اللي بيقولوا نفس الـ stack: tests، أو deploy، أو إنك بتكتب توثيق، أو بتسأل اليوزر.

الـ future لازم تتفصّل على الشركة: اقرا الإعلان وموقعهم، وقول حاجة حقيقية عن المنتج أو الـ stack بتاعهم. «I'm looking for a challenging opportunity» جملة كل الناس بتقولها ومش بتقول حاجة.

واعمل نسختين: ٦٠ ثانية (الأساسية) و ٣٠ ثانية (لو الـ recruiter مستعجل). ونفس الهيكل بيشتغل بالعربي لو الانترفيو بالعربي.`,
            when: "بيتسأل في الـ recruiter call وفي أول كل جولة تقريبًا، وأحيانًا بصيغة «Walk me through your CV» أو «عرّفنا بنفسك». Follow-ups متوقعة: «احكيلي أكتر عن المشروع ده»، «إيه أصعب حاجة فيه؟»، «ليه سايب شغلك الحالي؟»، «ليه الشركة دي؟».",
            mistakes: R`تبدأ من الكلية أو الثانوية وتحكي بالترتيب الزمني. تقرا الـ CV بصوت عالي (هو قدامه أصلًا). قايمة ٢٠ technology من غير ولا مشروع. «I'm passionate and hardworking» من غير دليل. إجابة ٣ دقايق. وحفظ كلمة بكلمة فتبان بتسمّع، ولو اتقطعت تتوه: احفظ النقط مش الجمل. وأرقام مش حقيقية: هيسألك «قستها إزاي؟».`
          },
          lines: [
            "الحاضر: الدور والأدوات الأساسية في جملة واحدة.",
            "الدليل: مشروع واحد حقيقي، واللي اتعمل بيه، وفين شغال.",
            "النتيجة بأرقام مقاسة: حجم الاستخدام، وتحسين قبل وبعد.",
            "إزاي بتشتغل: حاجة بتفرّقك عن اللي بيقولوا نفس الـ stack.",
            "المستقبل: انت عايز إيه في الخطوة الجاية.",
            "ليه الشركة دي بالذات: حاجة حقيقية عن منتجهم، مش جملة عامة."
          ],
          sol: R`الإجابة المظبوطة بتطلع ما بين ٥٠ و ٧٠ ثانية في التسجيل، وحوالي ١٢٠ لـ ١٥٠ كلمة. فيها مشروع واحد بالاسم أو بالوصف، ورقم واحد على الأقل انت عارف قسته إزاي، وآخر جملة عن الشركة دي بالذات.

الاختبار الحقيقي: لو اديت التسجيل لصاحبك وسألته «هتسألني على إيه؟»، المفروض يقول المشروع اللي انت اخترته. لو قال «مش عارف» يبقى الإجابة عامة.

النتايج الغلط الشائعة: التسجيل ٢ أو ٣ دقايق لأنك بدأت من الكلية، أو مفيهوش ولا رقم، أو آخره «and that's it» من غير ما تقول ليه انت هنا. ولو لقيت نفسك بتقول «umm» كتير، فده عادي في أول تسجيل، وبيقل من التالت أو الرابع.`
        },
        {
          cmd: "STAR",
          title: "«احكيلي عن أصعب bug قابلك»: إزاي ترتب القصة بـ STAR؟",
          desc: R`أي سؤال بيبدأ بـ «احكيلي عن مرة...» بجاوبه بـ STAR. الـ Situation: السياق في جملة أو اتنين. الـ Task: أنا كنت مسؤول عن إيه بالظبط. الـ Action: أنا عملت إيه خطوة خطوة، بـ «I» مش «we»، ودي حوالي ٦٠٪ من القصة. الـ Result: النتيجة بأرقام، وإيه اللي اتعلمته. القصة كلها حوالي دقيقتين.

وبجهّز من قبلها ٥ أو ٦ قصص حقيقية بتغطي أغلب الأسئلة: bug صعب، وخلاف مع زميل، وغلطة عملتها، و deadline فات، وحاجة اتعلمتها بسرعة، وحاجة عملتها من غير ما حد يطلبها. والقصة الواحدة ممكن تجاوب أكتر من سؤال لو غيّرت الزاوية.`,
          example: R`S: "On an ordering system I built, some customers paid but their orders stayed pending. About 1 in 50 orders."
T: "I owned the payment integration, so it was mine to find and fix, and fast, because real money was involved."
A1: "I couldn't reproduce it locally, so I added structured logs around the payment webhook, with the order id on every line."
A2: "The logs showed the webhook sometimes arrived before the order was committed, so the lookup found nothing, and we still returned 200."
A3: "I made the handler idempotent, returned an error when the order wasn't found so the provider would retry, and added a nightly job that reconciles payments with orders."
R: "Stuck orders went from about 2% to zero the next month, and the reconcile job later caught two problems on the provider's side."
Learned: "Now I never assume a webhook arrives once or in order, and I log the ids I'll need before I need them."`,
          try: "اكتب قصة «أصعب bug» بتاعتك بنفس الـ ٧ سطور. عدّ كلمات الـ Action وكلمات الـ Situation: الـ Action لازم يبقى أطول بكتير. بعدين احكيها بصوت عالي بتايمر، وجرّب تقطعها لـ ٩٠ ثانية.",
          flag: "script",
          deep: {
            why: "الأسئلة السلوكية بتتوقع إنك هتتصرف في المستقبل زي ما اتصرفت قبل كده، فبتطلب قصص حقيقية مش آراء. و «أصعب bug» بالذات بيوري طريقة تفكيرك في الـ debugging: فرضيات، وقياس، ومش تخمين.",
            how: R`الـ Situation و Task مع بعض أقل من ٢٠ ثانية: الإنترفيوير مش محتاج تاريخ الشركة. الـ Action هو اللي بيتقيّم، فقسّمه لخطوات، وفي كل خطوة قول «ليه»: ليه ضفت logs بدل ما تخمّن، ليه رجّعت error بدل 200. ولو كان فريق، قول انت عملت إيه بالظبط: «We fixed it» مبتقولش هو انت ولا زميلك.

الـ Result فيه جزئين: الرقم (من ٢٪ لصفر)، والدرس اللي بقى عادة عندك. الدرس ده هو اللي بيفرّق مبتدئ اتعلّم من مبتدئ حظه حلو.

للـ bug بالذات: اختار واحد فيه تشخيص حقيقي (مش typo قعدت فيه ساعتين)، وفيه أسباب مش باينة: race condition، أو timezone، أو cache، أو encoding. ولو القصة جت من مشروع شخصي مفيش مشكلة، بس قول كده بوضوح. والتفاصيل التقنية في «تاب بناء مشروع كامل»: [[webhook الدفع]] و [[structured logs]].`,
            when: "نفس الشكل لكل «احكيلي عن مرة...»: «Tell me about a time you had to learn something fast»، «...a time you went beyond your role»، «...a time you got hard feedback». Follow-ups على الـ bug: «كنت هتعرفه أسرع إزاي؟»، «إيه اللي كان ممكن يمنعه من الأول؟»، «ليه مظهرش في الاختبارات؟».",
            mistakes: R`قصة متخيلة: أول follow-up عن التفاصيل بيكشفها. «we» طول القصة فمحدش عارف انت عملت إيه. Situation دقيقتين والـ Action جملة. من غير نتيجة («وبعدين اتحلت»). bug تافه أو bug كان سببه إهمال واضح من غير درس. وقصة بتلوم فيها زميل أو العميل.`
          },
          lines: [
            "الـ Situation: المشكلة وحجمها في جملة واحدة.",
            "الـ Task: انت كنت مسؤول عن إيه، وليه كان مستعجل.",
            "الـ Action ١: ليه بدأت بالقياس (logs) بدل التخمين.",
            "الـ Action ٢: السبب الحقيقي اللي الـ logs كشفته.",
            "الـ Action ٣: الحل بتلات طبقات: idempotent، و retry، و reconcile.",
            "الـ Result بأرقام، وفايدة ظهرت بعدين.",
            "الدرس: العادة اللي اتغيرت عندك."
          ],
          sol: R`قصتك المكتوبة المفروض يطلع فيها الـ Action أكتر من نص الكلام. لو الـ Situation أطول من الـ Action، شيل من السياق. ولو الكلمة «we» ظهرت في الـ Action أكتر من مرة، حوّلها لـ «I» أو قول مين عمل إيه.

وعلى التايمر الإجابة الكويسة بتطلع ما بين ٩٠ ثانية ودقيقتين. أطول من كده غالبًا فيه تفاصيل تقنية الإنترفيوير مطلبهاش: سيبها للـ follow-up.

القصة كاملة لو فيها: رقم في الـ Result، وسبب حقيقي اتلاقى بقياس، ودرس بقى عادة. وأشهر نتيجة غلط: قصة مفيهاش تشخيص خالص («لقيت الغلطة وصلحتها»)، ودي مبتوريش أي حاجة عن طريقة تفكيرك.`
        },
        {
          cmd: "disagree and commit",
          title: "«احكيلي عن مرة اختلفت فيها مع زميل»: تقول إيه من غير ما تبان عنيد أو ضعيف؟",
          desc: R`الإنترفيوير بيدوّر على تلات حاجات: إنك بتختلف بالداتا مش بالصوت، وإنك بتسمع وتفهم وجهة النظر التانية قبل ما ترد، وإنك بتلتزم بالقرار حتى لو مكانش رأيك (disagree and commit). فبختار خلاف تقني حقيقي، مش شخصي، وبحكيه بـ STAR.

والنتيجة المهمة إن المشروع كسب، مش إني أنا كسبت. وأحسن قصة فيها إن الطرفين كانوا صح في حتة، أو إني غيّرت رأيي لما شفت داتا.`,
          example: R`S: "A teammate wanted to add Redis caching to our product list endpoint, because it felt slow."
T: "I was reviewing his PR, and I thought caching would hide the real problem and add invalidation bugs."
A1: "Instead of a long thread in the PR comments, I asked for 15 minutes on a call, and first asked what slow meant to him. He'd seen 2-second responses."
A2: "I suggested we measure before deciding. We ran EXPLAIN ANALYZE together and found an N+1 query and a missing index."
A3: "We agreed to fix the query first and keep caching as plan B. I also told him his idea was right for the homepage, which really is hot."
R: "The endpoint went from about 2 seconds to 120 ms without a cache. We added caching to the homepage later, with a clear TTL."
Learned: "I try to turn opinions into a quick measurement, and I move a discussion to a call when the comments get long."`,
          try: "افتكر خلاف تقني حقيقي (حتى لو مع نفسك في مشروع شخصي، أو مع عميل على feature). اكتبه بالشكل ده، وبعدين اكتب نسخة تانية انت فيها اللي «خسرت» والتزمت بقرار الـ lead: إيه اللي عملته عشان القرار ينجح؟",
          flag: "script",
          deep: {
            why: "كل فريق فيه خلافات يومية في الـ code review والتصميم. الشركات خايفة من حاجتين: حد بيحارب على كل تعليق، وحد بيسكت ويوافق على أي حاجة وبعدين يشتكي. القصة بتوري انت أنهي نوع.",
            how: R`ابدأ بإنك فهمت: «first asked what slow meant to him» بتقول إنك مبتفترضش إن التاني غلط. بعدين حوّل الرأي لتجربة صغيرة أو رقم: [[EXPLAIN ANALYZE]]، أو benchmark، أو prototype في ساعة. الداتا بتشيل الأنا من النقاش.

لو الخلاف مخلصش بالداتا، فيه طريقين محترمين: حد صاحب قرار (الـ tech lead أو صاحب الـ feature) يقرر، أو تجربوا الأسهل في الرجوع عنه الأول. وبعد القرار التزم بجد: متقولش «مش قلتلكم» لو حصلت مشكلة.

ولو جالك السؤال بصيغة «with your manager»، نفس الشكل، بس ركّز إنك قلت رأيك بوضوح مرة، بالداتا، وبعدين نفّذت. والتفاصيل التقنية للقصة في «تاب بناء مشروع كامل»: [[indexes و N+1]] و [[cache-aside + TTL]].`,
            when: "الصيغ: «a conflict with a coworker»، «you disagreed with your manager»، «you received critical feedback in a code review»، «you had to convince someone». Follow-ups: «ولو كان رأيه اتنفّذ وطلع غلط؟»، «لو الـ lead قرر عكس رأيك تعمل إيه؟»، «فيه حد مكنتش بتعرف تشتغل معاه؟».",
            mistakes: R`«I never had a conflict»: مش مصدّقة وبتقول إنك مبتقولش رأيك. قصة شخصية (حد متأخر أو كسلان) بدل خلاف تقني. قصة الزميل فيها غبي وانت البطل. إنك «صعّدت للمدير» كأول خطوة. ونهاية من غير قرار أو من غير ما تقول اتعلمت إيه.`
          },
          lines: [
            "الـ Situation: الخلاف على إيه، وفكرة الزميل وسببها.",
            "الـ Task: دورك، ورأيك المختلف وسببه.",
            "الـ Action ١: نقل النقاش لمكالمة، وسمعت الأول.",
            "الـ Action ٢: حوّلت الرأي لقياس بدل جدال.",
            "الـ Action ٣: اتفاق، وخطة بديلة، واعتراف إنه كان صح في حتة.",
            "الـ Result: رقم قبل وبعد، والفكرة التانية اتنفذت في مكانها الصح.",
            "الدرس: طريقتك في الخلافات الجاية."
          ],
          sol: R`القصة الأولى صح لو فيها: خلاف على حاجة تقنية أو قرار شغل، وخطوة سمعت فيها الأول، وداتا أو تجربة حسمت، ونتيجة للمشروع. لو القصة آخرها «وطلعت أنا صح» وبس، زوّد الحتة اللي التاني كان صح فيها أو اللي اتعلمته منه.

والنسخة التانية (انت خسرت) صح لو فيها إنك قلت رأيك مرة بوضوح وبسبب، وبعدين نفّذت القرار كويس فعلًا، وأحسن لو ضفت حاجة تقلل الخطر اللي كنت خايف منه (اختبار، أو monitoring، أو feature flag). دي بالظبط معنى disagree and commit.

النتيجة الغلط: إنك متلاقيش ولا خلاف. غالبًا فيه، بس انت مش شايفه «خلاف»: أي code review اتناقشت فيه، أو عميل طلب حاجة وانت اقترحت أبسط، ينفع.`
        },
        {
          cmd: "غلطة عملتها",
          title: "«احكيلي عن غلطة عملتها»: إزاي تعترف من غير ما تحرق نفسك؟",
          desc: R`بختار غلطة حقيقية ليها أثر حقيقي، وأنا اللي عملتها، مش «أنا perfectionist» ولا غلطة زميلي. وبحكي: عرفتها إزاي، وصلّحت الأثر إزاي وبسرعة قد إيه، وقلت لمين، وأهم حتة: غيّرت إيه في طريقة شغلي عشان متتكررش.

الإنترفيوير عارف إن كل الناس بتغلط. هو بيقيس الـ ownership: بتخبي ولا بتبلّغ، وبتلوم ولا بتصلّح، وبتتعلم ولا بتكرر.`,
          example: R`S: "On my first production deploy for a client, I ran a migration that renamed a column."
T: "I was the only developer, so the deploy and the database were my responsibility."
A1: "The old version of the app was still running during the deploy. It queried the old column name, and the site returned errors for about 10 minutes."
A2: "I rolled back the app, renamed the column back with a quick migration, and told the client what happened the same day."
A3: "Then I changed how I deploy: expand and contract migrations, a backup before every migration, and I test migrations on a copy of production data first."
R: "I haven't had downtime from a migration since, and the client kept me to maintain the project."
Learned: "A change can be safe before the deploy and after it, and still break things during it."`,
          try: "اكتب ٣ غلطات عملتها فعلًا في شغل أو مشروع. شيل أي واحدة كانت إهمال بس من غير درس، أو فيها ضرر لحد بشكل مش مقبول. اختار واحدة من الباقي واكتبها بـ STAR، وخلي الـ «A3» (اللي غيّرته) أوضح سطر.",
          flag: "script",
          deep: {
            why: "الشركات عايزة حد لما يكسر الإنتاج يقول بسرعة ويصلّح، مش حد يخبي لحد ما اليوزرز يشتكوا. والسؤال بيوري نضجك: هل بتشوف الغلطة كفرصة تحسّن العملية ولا كعيب شخصي تداريه.",
            how: R`الحجم المناسب: غلطة ليها أثر حقيقي (downtime قصير، أو داتا اتحسبت غلط واتصلحت، أو feature اتسلّمت ناقصة) بس مش كارثة أخلاقية ولا إهمال متكرر. والأحسن تكون من زمان شوية، عشان تقدر تقول إيه اللي اتغير من ساعتها فعلًا.

الترتيب اللي بيقنع: الاكتشاف (عرفتها بنفسك أحسن)، والاحتواء الأول (rollback، أوقف النزيف)، والتواصل (قلت للعميل أو الـ lead بنفس اليوم)، والتصليح الجذري، والتغيير في العملية (checklist، أو اختبار، أو خطوة في الـ CI، أو review). الجزء الأخير ده زي الـ postmortem من غير لوم: السؤال «إيه اللي في النظام سمح للغلطة تحصل؟».

والتفاصيل التقنية للمثال في «تاب بناء مشروع كامل»: [[expand / contract]] و [[backups و DR]] و [[mitigate ثم postmortem]].`,
            when: "الصيغ: «a mistake you made»، «a time you failed»، «something you'd do differently»، «a time you broke production». Follow-ups: «مين عرف الأول، انت ولا العميل؟»، «لو حصلت تاني بكرة هتعمل إيه في أول ٥ دقايق؟»، «إيه اللي منع الاختبارات تمسكها؟».",
            mistakes: R`غلطة مش غلطة («I work too hard»). غلطة حد تاني. قصة مفيهاش تغيير في طريقة الشغل. غلطة بتقول إنك مش أمين أو مستهتر (خبيت حاجة، أو شغّلت أمر على الإنتاج وانت مش فاهمه ومتعلمتش). وإنك تقعد تبرر طول القصة بدل ما تقول «كانت غلطتي» في جملة وتكمّل.`
          },
          lines: [
            "الـ Situation: إيه اللي حصل، في جملة.",
            "الـ Task: مين كان مسؤول: انت.",
            "الـ Action ١: الأثر بصراحة وبرقم (١٠ دقايق errors) وسببه.",
            "الـ Action ٢: الاحتواء بسرعة، وبلّغت العميل نفس اليوم.",
            "الـ Action ٣: التغيير في طريقة الشغل عشان متتكررش. أهم سطر.",
            "الـ Result: الدليل إن التغيير نفع.",
            "الدرس في جملة ممكن تتقال لأي فريق."
          ],
          sol: R`الغلطة المناسبة لو شلت منها الأسماء تنفع تتحكي في أي انترفيو من غير ما تخاف. فيها أثر حقيقي بس محدود، وانت اللي عملتها، وانت اللي صلحتها.

القصة صح لو سطر «اللي غيّرته» فيه حاجة ملموسة تقدر تتسأل عليها: checklist، أو اختبار، أو خطوة في الـ CI، أو backup قبل migration. «بقيت أركّز أكتر» مش تغيير.

النتايج الغلط الشائعة: إنك تختار غلطة صغيرة جدًا عشان تبان كويس (الإنترفيوير هيسأل «طب وحاجة أكبر؟»)، أو قصة آخرها لوم لحد تاني، أو إنك تحكي الأثر من غير رقم فمحدش عارف كانت كبيرة ولا لأ.`
        },
        {
          cmd: "deadline فات",
          title: "«احكيلي عن deadline مقدرتش تلحقه»: الإجابة الصح فيها إيه؟",
          desc: R`الإنترفيوير عايز يعرف: عرفت إمتى إنك متأخر، وقلت لمين وإمتى (بدري، مش آخر يوم)، واتفاوضت على إيه، وإيه اللي اتعلمته في التقدير. القاعدة: الأخبار الوحشة بدري. والحل غالبًا إنك تقطّع الـ scope (تسلّم الأهم في معاده والباقي بعده)، مش إنك تسهر وتسلّم حاجة مكسورة.

الأربع حاجات اللي ممكن تتحرك في أي مشروع: الـ scope، والوقت، والناس، والجودة. والجودة بالذات بلاش تكون هي اللي تتضحّى بيها من غير ما تقول.`,
          example: R`S: "I estimated two weeks for an admin dashboard with reports, filters and Excel export."
T: "I owned the feature end to end, and the client had a demo with investors on a fixed date."
A1: "By the end of week one I was about 40% done, because the report queries were much harder than I expected."
A2: "I told the client that same day, not on the deadline, and gave two options: everything one week late, or the core reports on time and the export a week later."
A3: "They chose the second. I shipped the three reports they needed for the demo, and the export followed six days later."
R: "The demo happened on time with real data, and the full feature was done one week after the original date."
Learned: "Now I split estimates into small tasks, add a buffer for anything I haven't done before, and share progress every few days."`,
          try: "افتكر آخر حاجة اتأخرت فيها (حتى لو مشروع كلية أو مشروع شخصي). اكتب: عرفت إنك متأخر في أنهي يوم؟ وقلت إمتى؟ لو الفرق بينهم أكتر من يوم، اكتب إزاي كنت هتعرف أبدر. وبعدين اكتب القصة بالشكل ده.",
          flag: "script",
          deep: {
            why: "التقدير الغلط بيحصل لكل الناس، خصوصًا الـ juniors. اللي بيفرق في الشغل هو التواصل: مدير عرف بدري عنده خيارات، ومدير عرف آخر يوم معندوش غير الإحراج. والسؤال بيقيس ده بالظبط.",
            how: R`الإشارة البدرية: قسّم الشغل لمهام صغيرة (يوم أو أقل)، ولو أول مهمة خدت ضعف التقدير، التقدير كله غالبًا غلط بنفس النسبة. ده وقت الكلام، مش بعدين.

لما تبلّغ، متجيش بالمشكلة لوحدها: تعالى بخيارين أو تلاتة وتكلفة كل واحد، وسيب صاحب القرار يختار. ده اللي في A2. والتقطيع الشائع: الـ happy path الأول، والحالات النادرة بعدين، أو الشاشة بتقرا بس والتعديل بعدين، أو التصدير بعدين.

والدرس لازم يكون عن التقدير نفسه: مهام صغيرة، و buffer للحاجات اللي أول مرة تعملها، وتحديث منتظم. ولو القصة إنك لحقت بالسهر كل يوم، فده مش درس يطمّن، قول ده من غير ما تفتخر بيه.`,
            when: "الصيغ: «a time you missed a deadline»، «a time you had too much work»، «how do you estimate?»، «a project that didn't go as planned». Follow-ups: «بتقدّر إزاي دلوقتي؟»، «لو العميل رفض الخيارين؟»، «بتعمل إيه لو الـ lead ضغط على تاريخ مش واقعي؟».",
            mistakes: R`«I never missed a deadline»: محدش هيصدّق، وحتى لو صح فالسؤال عن إزاي بتتصرف. تلوم العميل إنه غيّر المطلوب (حتى لو ده حصل، ركّز انت عملت إيه). تحكي إنك قلت آخر يوم. أو إن الحل كان سهر أسبوعين وتسليم من غير اختبارات.`
          },
          lines: [
            "الـ Situation: التقدير اللي اديته والمطلوب.",
            "الـ Task: انت مسؤول، وفيه تاريخ ثابت مش بيتحرك.",
            "الـ Action ١: إمتى عرفت إنك متأخر وليه.",
            "الـ Action ٢: بلّغت نفس اليوم ومعاك خيارين.",
            "الـ Action ٣: العميل اختار، وانت سلّمت الأهم في معاده.",
            "الـ Result: الحاجة المهمة اتعملت في وقتها، والباقي متأخر أسبوع بس.",
            "الدرس: إزاي بتقدّر وبتبلّغ من ساعتها."
          ],
          sol: R`القصة صح لو فيها الفرق بين «عرفت» و «قلت» يوم أو أقل، وفيها خيارات عرضتها مش مشكلة بس، ونتيجة فيها حاجة اتسلمت في معادها حتى لو ناقصة.

ولو لقيت إنك عرفت متأخر (مثلًا آخر يومين)، ده مش سبب تسيب القصة. خليه هو الدرس: «عرفت متأخر لأن المهام كانت كبيرة، فبقيت أقسّم لمهام يوم، وبعرف بدري». دي إجابة قوية لأنها صادقة وفيها تغيير.

الغلط الشائع: الـ Result يطلع «وسلمت كله في الآخر بعد ما سهرت»، من غير أي تفاوض على الـ scope ولا تغيير في التقدير.`
        },
        {
          cmd: "problem → decisions → results",
          title: "«احكيلي عن مشروع عملته»: إزاي تحكيه بحيث يبان إنك مهندس مش منفّذ؟",
          desc: R`بحكيه في أربع أجزاء. المشكلة: مين اليوزر وكان بيعاني من إيه. ودوري: عملت إيه أنا بالظبط وبأنهي أدوات. والقرارات والـ trade-offs: اخترت X بدل Y عشان كذا، والتمن كان كذا. والنتيجة بأرقام حقيقية: يوزرز، أو وقت، أو فلوس، أو أخطاء. وبقفل بـ «لو هعمله تاني هغيّر إيه».

الفرق بين المنفّذ والمهندس في الجزء التالت: المنفّذ بيقول «عملته بـ React و Node»، والمهندس بيقول «اخترت كذا عشان كذا، وكان التمن كذا». والأرقام لازم تكون حقيقية وتكون عارف اتقاست إزاي.`,
          example: R`Problem: "A small clinic booked appointments by phone and paper. Double bookings happened every week."
Role: "I built it alone: Next.js, a Node API and PostgreSQL, deployed on a VPS with Docker and Nginx."
Decision 1: "A modular monolith, not microservices. One developer means one deploy, with a clear folder per feature."
Decision 2: "I prevent double booking with a unique constraint on doctor and slot in the database, not only a check in the code, because two requests can pass a check at the same moment."
Trade-off: "Server-rendered pages instead of a heavy SPA, so it's fast on cheap phones. The cost was weaker offline support."
Results: "About 1,200 bookings a month now, zero double bookings since launch, and reception gets about half the phone calls it used to."
Next time: "I'd write end-to-end tests for the booking flow from day one. I added them after a regression, not before."`,
          try: "اختار أقوى مشروع عندك واكتبه بالسبع سطور دول. لو معندكش رقم حقيقي للنتيجة، روح هاته: اليوزرز من الداتابيز، أو وقت التحميل من Lighthouse، أو الأخطاء من Sentry. بعدين خلي صاحبك يسألك «ليه؟» بعد كل قرار ٣ مرات ورا بعض.",
          flag: "script",
          deep: {
            why: "ده أكتر سؤال بيتسأل للـ juniors بعد «عرّفنا بنفسك»، وهو فرصتك الوحيدة تتكلم في حاجة انت خبير فيها أكتر من اللي قدامك. الإنترفيوير بيحفر في القرارات عشان يعرف انت اللي فكّرت ولا نقلت tutorial.",
            how: R`الـ trade-off جملة بالشكل ده: «اخترت X عشان Y، والتمن Z». لو مش لاقي تمن، يبقى انت مش فاهم الاختيار كويس، أو ده مكانش قرار أصلًا. الأمثلة في «تاب بناء مشروع كامل»: [[modular monolith أولًا]] و [[القاعدة تحكم]]، وتمرين [[booking system]] فيه نفس مشكلة الحجز المزدوج.

الأرقام: اختار ٢ أو ٣ بس، وكل رقم اعرف مصدره. «About» كلمة كويسة لو الرقم تقريبي. ولو المشروع ملوش يوزرز (مشروع تعلم)، الأرقام ممكن تبقى تقنية: وقت الـ build، أو حجم الـ bundle قبل وبعد، أو coverage الـ business rules، أو زمن الـ API تحت load test.

وجهّز نسختين: دقيقتين، وعشر دقايق فيها رسمة للـ architecture ممكن ترسمها على الشاشة. وخلي الريبو أو الـ demo مفتوح قبل الانترفيو لو هتشارك الشاشة.`,
            when: "بيتسأل في كل الجولات تقريبًا: «walk me through a project you're proud of»، «what was the hardest part?»، «what would you change?». Follow-ups بتحفر: «ليه Postgres مش Mongo؟»، «لو اليوزرز بقوا ١٠٠ ضعف إيه اللي هيقع الأول؟»، «اختبرت إزاي؟»، «مين عمل الجزء ده؟».",
            mistakes: R`تحكي الـ features («فيه login، وفيه صفحة، وفيه dashboard») بدل المشكلة والقرارات. قايمة technologies من غير «ليه». أرقام مخترعة أو مش عارف مصدرها. تاخد كريدت شغل الفريق كله. تقول إن كل حاجة كانت perfect: الإنترفيوير بيحب يسمع «لو هعمله تاني...». ومشروع tutorial منقول زي ما هو من غير ولا قرار انت أخدته.`
          },
          lines: [
            "المشكلة: مين اليوزر ووجعه، في جملة.",
            "دورك بالظبط والأدوات، وفين شغال.",
            "قرار معماري وسببه.",
            "قرار تقني دقيق وسببه: القيد في الداتابيز لأن الـ check في الكود ممكن يعدّي طلبين مع بعض.",
            "trade-off صريح: الميزة والتمن.",
            "النتايج بتلات أرقام من مصادر مختلفة.",
            "لو هتعيده: غلطة حقيقية واتعلمت منها."
          ],
          sol: R`المشروع مكتوب صح لو كل قرار فيه كلمة «because» أو «so»، وسطر الـ trade-off فيه حاجة خسرتها فعلًا، والنتايج فيها ٢ أو ٣ أرقام انت تقدر تقول جبتها منين.

وتمرين «ليه؟ ٣ مرات» صح لو وصلت في التالتة لسبب حقيقي عن اليوزر أو القيود (فريق صغير، سيرفر رخيص، مستخدمين على موبايلات ضعيفة). لو في التانية قلت «عشان هو الأشهر» أو «عشان الكورس كان بيه»، ده القرار اللي محتاج تذاكره قبل الانترفيو.

الغلط الشائع: النتيجة تطلع features مش أرقام («والمشروع فيه ١٥ صفحة»)، أو مفيش «Next time» لأنك شايف المشروع كامل.`
        },
        {
          cmd: "أسئلتك للإنترفيوير",
          title: "«عندك أي أسئلة لينا؟»: تسأل إيه؟",
          desc: R`الإجابة دايمًا «أيوه». بجهّز ٤ أو ٥ أسئلة، وبسأل ٢ أو ٣ حسب الوقت. أسئلة عن الشغل نفسه مش حاجة مكتوبة في موقعهم: أول ٣ شهور شكلهم إيه، والـ code review والـ deploy ماشيين إزاي، والـ onboarding، وأصعب مشكلة بيحلوها دلوقتي.

والأسئلة دي بتقيّم الشركة انت كمان: الـ junior محتاج مكان فيه review و mentoring، مش مكان هيسيبه لوحده على الإنتاج من أول يوم. وأسئلة المرتب والإجازات مكانها مع الـ HR أو الـ recruiter، مش مع المهندس في الجولة التقنية.`,
          example: R`"What would success look like for this role in the first three months?"
"How does a change get from a pull request to production here, and how long does that usually take?"
"How do new developers get code review and mentoring in their first months?"
"What's the hardest technical problem the team is working on right now?"
"What do you enjoy most about working here, and what would you change if you could?"
"Is there anything in my background that makes you hesitant? I'd like the chance to answer it."`,
          try: "اكتب ٥ أسئلة لشركة حقيقية نفسك تشتغل فيها، اتنين منهم لازم يكونوا عن حاجة لقيتها في موقعهم أو إعلان الوظيفة (منتج، أو stack، أو خبر). وجنب كل سؤال اكتب: الإجابة اللي تطمّنك إيه، واللي تقلقك إيه.",
          flag: "script",
          deep: {
            why: "آخر ٥ دقايق بتسيب انطباع. «لا شكرًا» بتقول إنك مش مهتم أو مش محضّر. والسؤال الذكي بيوري إنك بتفكر في الشغل الحقيقي. وفي نفس الوقت دي فرصتك الوحيدة تعرف هل المكان ده هيعلّمك ولا لأ.",
            how: R`فصّل الأسئلة على الشخص: المهندس اسأله عن الكود والـ deploy والـ on-call، والـ manager اسأله عن التوقعات والتقييم والنمو، والـ recruiter اسأله عن المراحل الجاية والمواعيد.

إجابات تطمّن الـ junior: «كل PR بيتعمل له review»، و «فيه CI و staging»، و «بيبقى معاك buddy أول شهر». وإجابات تقلق: «مفيش اختبارات بس بنتحرك بسرعة»، و «هتبقى المطوّر الوحيد على المشروع»، و «بننشر من جهاز واحد فينا».

السؤال الأخير في المثال (فيه حاجة مخلياك متردد؟) بيفتح فرصة ترد على اعتراض قبل ما يتقرر عليك، بس بعض الناس بتحسه تقيل. استخدمه لو الجو كان مريح، وقوله بهدوء، ورد على الإجابة من غير ما تدافع بعصبية.`,
            when: "آخر كل جولة تقريبًا. ولو الوقت خلص قول «I have a couple of questions, can I send them by email?». وفي آخر مرحلة قبل العرض، اسأل الـ recruiter: «What are the next steps, and when can I expect to hear back?».",
            mistakes: R`«No, I think you covered everything». أسئلة إجابتها في أول صفحة في موقعهم. تسأل عن المرتب والإجازات والشغل من البيت في الجولة التقنية. تسأل ٨ أسئلة والوقت خلصان. وتسأل سؤال عشان تسأل ومتسمعش الإجابة: الإجابة غالبًا بتفتح كلام أحسن من السؤال التاني.`
          },
          lines: [
            "التوقعات: هيقيّموك على إيه في أول ٣ شهور.",
            "العملية: من الـ PR للإنتاج، وسرعتها بتقول كتير عن الفريق.",
            "التعلم: فيه review و mentoring ولا هتبقى لوحدك.",
            "الشغل الحقيقي: أصعب مشكلة عندهم، وغالبًا بتفتح كلام تقني حلو.",
            "الثقافة من جوه: اللي بيحبه واللي عايز يغيّره.",
            "اختياري: فرصة ترد على أي تردد قبل ما يتقرر."
          ],
          sol: R`القايمة صح لو السؤالين المخصوصين مش ممكن يتسألوا لأي شركة تانية («شفت إنكم نقلتوا لـ Next.js السنة دي، إيه اللي دفعكم؟»)، والتلاتة التانيين عن العملية والتعلم والتوقعات.

وعمود «الإجابة المطمئنة/المقلقة» هو أهم جزء: من غيره انت بتسأل وخلاص. مثال: سؤال الـ deploy، المطمئن «PR، و CI، و staging، و deploy تلقائي كام مرة في اليوم»، والمقلق «واحد بس اللي يعرف ينشر، وبيعمله بإيده».

الغلط الشائع: كل الأسئلة عامة تنفع لأي شركة، أو فيها سؤال عن حاجة مكتوبة في الإعلان نفسه.`
        }
      ]
    },
    {
      t: "الـ take-home والعملي",
      l: 3,
      n: "تاسك في البيت أو كود قدام حد: اللي بيتقيّم مش إنه اشتغل وخلاص، لكن اختياراتك وإزاي بتشرحها",
      items: [
        {
          cmd: "time box",
          title: "جالك take-home وقالولك «٤ ساعات تقريبًا»: تقسّم الوقت إزاي وتختار تعمل إيه؟",
          desc: R`أول حاجة بقرا المطلوب مرتين وبكتب قايمتين: must (اللي من غيره التاسك مش متحل) و nice-to-have. لو فيه حاجة مش واضحة ببعت سؤال قصير في إيميل، ودي بتتحسب لي مش عليّا. ولو مردوش، بختار افتراض معقول وبكتبه في الـ README.

والوقت المقترح بحترمه تقريبًا: الـ reviewers بيقارنوا بحلول اتعملت في نفس الوقت، و ١٢ ساعة على تاسك ٤ ساعات مش بتبهر، بتقول إنك مبتعرفش تقدّر. وحاجة صغيرة كاملة (شغالة، ومختبرة، ومشروحة) أحسن بكتير من حاجة كبيرة نصها شغال. واللي معملتوش بكتبه تحت «لو عندي وقت أكتر».`,
          example: R`Task: "Build a REST API for a todo app with auth. Suggested time: about 4 hours."
Must: register and login, CRUD for todos, users only see their own todos, validation, tests for the core rules
Nice: pagination, rate limiting, Docker, a small front end
Question by email: "Should todos be shareable between users?" If no reply: assume not, and say so in the README
0:00-0:20  read twice, write this plan, set up the repo, the linter and the test runner
0:20-2:50  auth, then todos, with a test for each rule (ownership first)
2:50-3:30  errors, validation and edge cases: empty title, another user's id, expired token
3:30-4:00  README, run everything from a fresh clone, read the whole diff once`,
          try: "خد التاسك ده: «URL shortener API بـ Node، الوقت المقترح ٣ ساعات». اكتب الخطة بنفس الشكل قبل ما تكتب ولا سطر كود، وبعدين نفّذ بتايمر حقيقي، وسجّل كل ما تخلص بلوك الساعة كام. في الآخر قارن الخطة باللي حصل.",
          flag: "script",
          deep: {
            why: "الـ take-home أقرب حاجة للشغل الحقيقي: مطلوب مش واضح ١٠٠٪، ووقت محدود، ولازم تختار. والـ reviewer بيشوف قراراتك أكتر من كودك: فهمت المهم؟ سألت؟ وقفت في الوقت؟ ده بالظبط اللي هيحصل في أول sprint ليك.",
            how: R`ترتيب الـ must نفسه مهم: ابدأ بالحاجة اللي لو باظت التاسك كله يقع (هنا الـ auth والـ ownership)، مش بالحاجة الأسهل. وخلي الـ setup (lint و test runner) في أول ٢٠ دقيقة، عشان الاختبارات تتكتب مع الكود مش في الآخر لما الوقت يخلص.

لو الوقت خلص والـ must مش كامل، وقّف واكتب في الـ README إيه الناقص وكنت هتعمله إزاي. ده أحسن من إنك تسلّم متأخر يومين أو تسلّم كود مكسور. ولو التاسك من غير وقت محدد، اسأل «How much time do you expect candidates to spend?»، أو حط لنفسك حد وقول عليه.

ولاحظ: take-home أطول من يوم شغل من غير مقابل ده حقك ترفضه أو تسأل عنه بأدب. وقبل ما تبعت: اعمل clone في فولدر جديد وشغّل الخطوات اللي في الـ README بالحرف، لأن «شغال عندي» أشهر سبب رفض.`,
            when: "شركات كتير بتستخدمه بدل الـ live coding أو قبله، خصوصًا مع الـ juniors. وبعده غالبًا جولة بيسألوك فيها على الحل: «ليه عملت كذا؟»، «لو عندك وقت أكتر؟»، «ضيف feature صغيرة دلوقتي قدامنا».",
            mistakes: R`تبدأ تكتب كود أول دقيقة. تصرف الوقت كله على الـ nice-to-have (Docker و UI حلو) والـ must ناقص. مفيش ولا اختبار. تفترض حاجات من غير ما تكتبها. تبعت zip من غير Git history. تستخدم مكتبة تقيلة تحل التاسك كله فمفيش حاجة تتقيّم. أو تستخدم AI يكتب الحل كله ومتعرفش تشرحه في الجولة اللي بعدها.`
          },
          lines: [
            "المطلوب والوقت المقترح زي ما جم.",
            "الـ must: اللي من غيره التاسك مش متحل.",
            "الـ nice-to-have: يتعمل لو فضل وقت بس.",
            "سؤال في إيميل للحاجة المش واضحة، وافتراض مكتوب لو مردوش.",
            "أول ٢٠ دقيقة: خطة و setup للأدوات قبل أي feature.",
            "أكبر بلوك للـ must، والاختبارات معاه مش بعده، والأخطر الأول.",
            "بلوك للأخطاء والحالات الحدّية.",
            "آخر نص ساعة: README وتجربة من clone نضيف ومراجعة."
          ],
          sol: R`الخطة صح لو فيها: الـ must مكتوب قبل الـ nice، وأول بلوك فيه setup للـ tests، وآخر بلوك (٢٠ لـ ٣٠ دقيقة) للـ README والتجربة من clone نضيف. للـ URL shortener: الـ must غالبًا إنشاء لينك قصير، والتحويل بـ 301 أو 302، و 404 للكود المش موجود، و validation للـ URL، واختبارات للتلاتة دول. والـ nice: إحصائيات، ولينك مخصص، وانتهاء صلاحية.

والمقارنة في الآخر هي الدرس: أغلب الناس أول مرة بيلاقوا إن الـ must خد أكتر من المتوقع بـ ٣٠ لـ ٥٠٪، وإن بلوك الـ README اتاكل. ده طبيعي، وده بالظبط ليه الـ nice بيتأجل.

النتيجة الغلط: إنك تلاقي نفسك في الساعة التالتة لسه بتظبط Docker، والتحويل نفسه مش شغال.`
        },
        {
          cmd: "README بالافتراضات",
          title: "إيه اللي لازم يبقى في الـ take-home غير الكود؟ (tests و README و commits)",
          desc: R`الـ reviewer غالبًا بيفتح الـ README الأول، وبعدين الـ git log، وبعدين الاختبارات، وبعدين الكود. فالـ README فيه: إزاي أشغّل بأمر أو اتنين، والافتراضات، والقرارات والـ trade-offs، واللي معملتوش وليه، وإزاي أشغّل الاختبارات.

والاختبارات على الـ business rules المهمة (يوزر ميشوفش todos غيره، والـ validation)، مش coverage لكل getter. والـ commits صغيرة وبتحكي القصة: setup، وبعدين feature feature، وبعدين التصليحات، مش commit واحد اسمه «done» في الآخر.`,
          example: R`## Run
docker compose up -d && npm install && npm run dev
npm test
## Assumptions
- Todos are private to their owner (not shareable). I asked by email and had no reply yet.
- Emails are unique and case-insensitive.
## Decisions
- JWT in an httpOnly cookie, not localStorage, so scripts on the page can't read it.
- PostgreSQL with Prisma for relations and migrations. Trade-off: heavier than SQLite for a demo.
## Not done (with more time)
- Pagination, and rate limiting on login.
## Commits
feat: set up Express, ESLint and Vitest
feat(auth): register and login with hashed passwords
feat(todos): CRUD scoped to the owner, with tests
fix(todos): return 404, not 403, for another user's todo
docs: README with assumptions and decisions`,
          try: "افتح آخر مشروع عملته واكتبله README بالأقسام دي بالظبط. بعدين اعمل clone له في فولدر جديد، وامشي على قسم Run بالحرف: لو احتجت أي خطوة مش مكتوبة (متغير في .env، أو migration، أو seed)، ضيفها.",
          flag: "script",
          deep: {
            why: "الـ reviewer معاه ١٠ حلول وساعة. الـ README بيوفّر عليه وقت وبيوجّه عينه للحاجات اللي انت فكرت فيها، والـ commits بتوريه إزاي بتقسّم الشغل. والاتنين عادات شغل يومي: PR من غير وصف أو commit واحد ضخم بيتعب أي فريق.",
            how: R`قسم Run لازم يشتغل على جهاز حد تاني: [[.env.example]] فيه كل المتغيرات بقيم وهمية، وأمر الـ migrations، وأي seed. ولو فيه Docker compose للداتابيز يبقى أحسن، لأن الـ reviewer مش هيسطّب Postgres عشانك.

الافتراضات: كل حاجة المطلوب مقالهاش وانت قررتها. والقرارات: كل مكان فيه اختيارين معقولين، بالشكل «اخترت X عشان Y، والتمن Z». وقسم «Not done» بيحوّل النقص لدليل إنك واعي بيه.

الـ commits: Conventional Commits زي [[feat(auth): ...]] (في «تاب فحص الكود»: [[commitlint]]). وكل commit يسيب المشروع شغال. ولو اتلخبطت وانت شغال، تقدر تنضّف الـ history قبل ما تبعت بـ rebase (في «تاب Git»: [[git rebase]]). والـ fix commit في المثال مقصود: بيوري إنك لقيت مشكلة واختبرتها وصلحتها، وده مش عيب.`,
            when: "كل take-home، وكمان ريبوهات الـ portfolio على GitHub: اللي بيفتح الـ CV بتاعك بيفتح الريبو، والـ README أول حاجة. وفي الجولة اللي بعد الـ take-home أغلب الأسئلة بتيجي من قسم Decisions.",
            mistakes: R`README بتاع create-react-app الافتراضي زي ما هو. أوامر تشغيل ناقصة («شغال عندي»). commit واحد «initial commit» فيه كل حاجة. أسرار حقيقية في [[.env]] مرفوعة. اختبارات مكتوبة بس مش شغالة أو كلها skip. وقسم Decisions بيقول «استخدمت React عشان هو الأحسن» من غير أي تمن.`
          },
          lines: [
            "التشغيل: داتابيز في Docker، وبعدين السطّيب والتشغيل، في سطر.",
            "الاختبارات بأمر واحد.",
            "افتراض بسبب سؤال مجاش رده، وبتقول إنك سألت.",
            "افتراض تاني اتقرر عشان المطلوب مقالش.",
            "قرار أمني بسببه.",
            "قرار تقني بسببه وتمنه.",
            "اللي معملتوش بصراحة.",
            "commit الـ setup لوحده.",
            "الـ auth في commit.",
            "الـ todos مع اختباراتها في commit.",
            "تصليح لقيته: 404 بدل 403 عشان متأكدش إن الـ todo موجود أصلًا.",
            "التوثيق في الآخر."
          ],
          sol: R`الـ README صح لو حد تاني يقدر يشغّل المشروع من clone نضيف بالأوامر المكتوبة بس، من غير ما يسألك. أغلب الناس في التجربة دي بيكتشفوا خطوة ناقصة على الأقل: متغير في [[.env]] مش موجود في [[.env.example]]، أو أمر [[npx prisma migrate deploy]]، أو إن الداتابيز لازم تبقى شغالة الأول.

وقسم Decisions صح لو كل سطر فيه «عشان» وفيه تمن. لو مش لاقي ولا قرار فيه تمن، ارجع لمشروعك واسأل: اخترت الداتابيز دي ليه؟ الـ auth بتاعي فين بيتخزن؟ دي أول أسئلة هتتسألها.

النتيجة الغلط: README فيه وصف للمشروع وصور بس، ومفيهوش ولا أمر تشغيل.`
        },
        {
          cmd: "think aloud",
          title: "في الـ live coding: بتتكلم تقول إيه؟ وتعمل إيه لو اتزنقت؟",
          desc: R`بتكلم قبل ما أكتب مش بعده: بقول هعمل إيه وليه، وبعدين أكتب. وبسأل عن البيئة في الأول: أقدر أشغّل الكود؟ ينفع أدور على syntax؟ أنهي لغة؟ (الخطوات نفسها في المستوى التاني: [[clarify → examples → brute → optimize → test]]، والدرس ده عن الطريقة.)

ولو اتزنقت بقول كده بصوت عالي، وبرجع لمثال صغير بإيدي، وباقترح حل أبسط حتى لو بطيء، وبسأل «ينفع أفترض كذا؟». والـ hint لما ييجي باخده وأبني عليه، مش بجادل فيه. وقبل ما أقول «خلصت» بمشي على الكود بمثال وبـ edge cases: فاضي، وعنصر واحد، وتكرار، وسالب.`,
          example: R`"Before I code, let me repeat the problem to make sure I got it right."
"Can I assume the input fits in memory, and that it's not sorted?"
"I'll start with a simple O(n squared) version so we have something working, then improve it."
"I'm stuck on how to handle duplicates. Let me try a small example by hand."
"I think a hash map fixes this, because I keep asking: have I seen this value before?"
"Let me trace it with an empty array, one element and duplicates before I say it's done."
"In real code I'd validate the input here. Should I add that now, or focus on the algorithm?"`,
          try: "افتح مسألة سهلة من «تاب DSA» وشغّل تسجيل صوت، وحلها وانت بتقول كل جملة من دول في مكانها. اسمع التسجيل وعدّ: كام مرة سكتّ أكتر من ٢٠ ثانية؟ وقلت الـ complexity؟ ومشيت بمثال قبل ما تقول خلصت؟",
          flag: "script",
          deep: {
            why: "الإنترفيوير مش شايف دماغك، شايف الشاشة بس. لو سكتّ ٥ دقايق، بالنسبة له انت تايه، حتى لو بتفكر صح. والكلام بيحوّل الانترفيو من امتحان لـ pair programming، وده بيخلي الـ hints تيجي بدري بدل ما تغرق.",
            how: R`السكوت القصير عادي: «Let me think for a moment» وبعدين ١٥ أو ٢٠ ثانية تفكير ده طبيعي. المشكلة في السكوت الطويل من غير ما تقول انت بتفكر في إيه. قول الفرضية حتى لو مش متأكد: «I think sorting might help, let me check».

لما تتزنق: ارجع لمثال صغير واحله بإيدك وخلي بالك انت عملت إيه، الخطوات دي غالبًا هي الخوارزمية. أو حل نسخة أسهل من المسألة (من غير تكرار، أو أرقام موجبة بس) وبعدين وسّع. والـ brute force الشغال أحسن من ولا حاجة: قوله واكتبه لو الوقت ضيق.

والبيئة: بعض الانترفيوهات في editor مشترك من غير تشغيل ولا autocomplete، فجرّب تكتب كود من غير ما تشغّل. وبعض الشركات دلوقتي بتسمح باستخدام AI assistant في الانترفيو وبتقيّم إزاي بتستخدمه، وبعضها بتمنعه تمامًا: اسأل في الأول ومتفترضش.`,
            when: "في كل جولة كود: algorithms، أو take-home بيتكمّل قدامهم، أو pair programming. ونفس الجمل بتنفع في الـ system design.",
            mistakes: R`تكتب في صمت وبعدين تشرح في الآخر. تتكلم كلام من غير معنى عشان متسكتش («so... yeah... let me see...»). تقول «done» من غير ما تجرّب ولا مثال. تتجاهل الـ hint أو تقول «أنا كنت لسه هقول كده». ترفض تكتب brute force عشان مستني الحل الأمثل.`
          },
          lines: [
            "إعادة المسألة بكلامك: بتمسك سوء الفهم بدري.",
            "سؤال عن الافتراضات بدل ما تخمّن.",
            "بتعلن إنك هتبدأ بسيط، وبتقول الـ complexity.",
            "بتقول إنك اتزنقت، وبتقول هتعمل إيه.",
            "الفكرة وسببها، مش الكود بس.",
            "اختبار بحالات حدّية قبل ما تقول خلصت.",
            "بتوري إنك عارف الكود الحقيقي، وبتسيبه يحدد الأولوية."
          ],
          sol: R`التسجيل الكويس فيه كلام تقريبًا كل ٢٠ أو ٣٠ ثانية، حتى لو جملة زي «OK, now I'm writing the loop». وفيه لحظة قلت فيها الـ complexity، وفيه تتبّع بإيدك لمثالين على الأقل قبل «done».

أغلب الناس في أول تسجيل بيلاقوا فترة سكوت دقيقة أو أكتر، غالبًا وقت كتابة الكود نفسه. الحل إنك تقول الخطوة قبل ما تكتبها («now I'll add the value to the set»).

الغلط الشائع: إنك تتكلم عن الكود بعد ما تكتبه بدل قبله، فالإنترفيوير ميلحقش يصحّحك لو رايح غلط.`
        },
        {
          cmd: "pair programming round",
          title: "الانترفيو طلع pair programming على كود موجود: بيقيّموا إيه وتتصرف إزاي؟",
          desc: R`شركات كتير بدل مسائل الـ algorithms بتديك ريبو صغير وتطلب منك تضيف feature أو تصلّح bug، ومعاك مهندس منهم. بيقيّموا إزاي بتقرا كود مش بتاعك، وإزاي بتستخدم الأدوات (الاختبارات، والبحث، والـ debugger، والـ git)، وإزاي بتسأل وبتسمع وبتاخد اقتراحات.

الخطوات: أقرا الـ README وأشغّل الاختبارات الأول، وألف على هيكل المشروع بصوت عالي، وألاقي المكان بالبحث، وأكتب اختبار يفشل للـ bug، وأصلّح تعديل صغير، وأشغّل الاختبارات تاني. والمهندس اللي معايا زميل مش ممتحن: لو اقترح حاجة بجربها، أو بقول بأدب ليه شايف غيرها.`,
          example: R`cat README.md
npm install && npm test
git log --oneline -10
grep -rn "calculateTotal" src/
npx vitest run src/cart.test.js
git diff`,
          try: "خد ريبو open source صغير بـ JavaScript فيه اختبارات، واختار issue عليها «good first issue». اعمل الخطوات دي بالترتيب بتايمر ٦٠ دقيقة وانت بتتكلم بصوت عالي، حتى لو محدش معاك. هدفك: اختبار يفشل، وبعدين يعدّي.",
          deep: {
            why: "ده أقرب شكل انترفيو لليوم الحقيقي في الشغل: كود قديم، ومش بتاعك، ومعاك زميل. ناس كتير بتحل LeetCode كويس وبتتلخبط في ريبو حقيقي، والعكس. والشركات اللي بتعمله بتدوّر على حد ينفع يشتغل معاه من أول أسبوع.",
            how: R`الدقايق الأولى للاستكشاف مش ضياع وقت: الـ README، والـ scripts في [[package.json]]، وهيكل الفولدرات، وآخر commits. قول اللي بتشوفه: «This looks like routes, services and repositories, so the business logic is probably in services».

لاقي المكان بالبحث عن كلمة من الـ UI أو رسالة الخطأ أو اسم الـ endpoint، مش بفتح الملفات واحد واحد. وبعدين اكتب اختبار يثبت الـ bug قبل ما تصلحه: كده انت متأكد إنك فهمته، وعندك دليل إنه اتصلح. والتفاصيل في «تاب فحص الكود» ([[vitest]]) وفي «تاب Git» ([[git log -S / blame]]).

والتعامل مع الزميل: اسأل أسئلة محددة («Is this function used anywhere else?») مش «مش فاهم حاجة». ولو اقترح طريقة، جرّبها أو قول «I'd prefer X because Y, but happy to try yours». وقبل ما تخلص اعرض الـ diff كله وقول لو فيه حاجة كنت هتعملها في PR حقيقي (اختبار زيادة، أو تنضيف).`,
            when: "شائع في شركات المنتجات والـ startups، وأحيانًا بيبقى استكمال للـ take-home بتاعك (ضيف feature على الكود اللي انت كتبته). ونفس الطريقة بتنفع في أول أسبوع شغل على أي ريبو جديد.",
            mistakes: R`تعيد كتابة الملف كله عشان «مش عاجبك الكود». تبدأ تعدّل قبل ما تشغّل الاختبارات فمتعرفش هي كانت شغالة أصلًا ولا لأ. تفتح الملفات واحد واحد بدل البحث. تتجاهل الزميل أو تستأذنه في كل سطر. وتقول خلصت من غير ما تشغّل الاختبارات كلها بعد التعديل.`
          },
          lines: [
            "اقرا الـ README الأول: التشغيل والهيكل.",
            "سطّب وشغّل الاختبارات قبل أي تعديل، عشان تعرف الحالة الأصلية.",
            "آخر ١٠ commits: الفريق شغال على إيه وبيكتب إزاي.",
            "لاقي كل مكان فيه الدالة اللي هتلمسها، مع رقم السطر.",
            "شغّل ملف اختبار واحد بسرعة وانت بتصلّح.",
            "اعرض كل اللي غيّرته قبل ما تقول خلصت."
          ],
          sol: R`النتيجة المتوقعة: في أول ١٠ دقايق الاختبارات الأصلية بتعدّي (أو بتعرف إن فيه اختبارات فاشلة من قبلك وتقول كده). بعدها اختبار جديد انت كاتبه بيفشل برسالة بتوصف الـ bug، وبعد التعديل بيعدّي هو وكل الاختبارات القديمة، والـ [[git diff]] فيه تعديل صغير في ملف أو اتنين.

لو خلصت الساعة ومعرفتش تكتب اختبار يفشل، ده غالبًا معناه إنك لسه مش فاهم الـ bug بالظبط، مش إنك بطيء. ارجع لخطوة إنك تعيد إنتاجه بإيدك.

الغلط الشائع: الـ diff طالع ٢٠٠ سطر لأنك عدّلت format الملف كله أو غيّرت أسماء كتير. في pair programming ده بيخلي الزميل مش قادر يتابع.`
        }
      ]
    },
    {
      t: "الـ system design في الانترفيو",
      l: 3,
      n: "إطار ثابت لأي سؤال تصميم في ٤٥ دقيقة، والأرقام التقريبية، وإزاي تتكلم بالـ trade-offs. التمارين نفسها في «تاب بناء مشروع كامل»",
      items: [
        {
          cmd: "إطار الـ system design",
          title: "جالك سؤال system design: بتمشي بأنهي ترتيب في ٤٥ دقيقة؟",
          desc: R`سبع خطوات بالترتيب ده، وانا اللي بسوق والإنترفيوير بيدخل بأسئلة: المتطلبات (الوظايف، وكمان السرعة والتوافر والاتساق)، وبعدين أرقام تقريبية، وبعدين الـ API، وبعدين الـ data model، وبعدين الشكل العام، وبعدين deep dive في أصعب جزء، وفي الآخر الـ trade-offs وإيه اللي هيقع لو الحمل زاد ١٠ مرات.

وأهم قاعدة: متبدأش ترسم مربعات قبل ما تسأل. ٥ دقايق أسئلة في الأول بتحدد كل حاجة بعدها. والتمارين الكاملة بالإطار ده في «تاب بناء مشروع كامل» المستوى التالت، في «تدريب system design»: [[URL shortener]] و [[chat app]] و [[booking system]]، وأسئلة المتابعة في «أسئلة انترفيو» هناك، زي [[cache-aside + TTL]] و [[قيس ثم stateless]].`,
          example: R`0-5    Requirements: "Who uses it? What are the 3 core features? What's out of scope? How fast, how available, how consistent?"
5-10   Estimates: users per day, reads and writes per second, storage per year, and the peak (3x the average or more)
10-15  API: 3 to 5 endpoints, with the request and response shapes
15-20  Data model: tables, keys, and the index each main query needs
20-30  High-level design: client, CDN, load balancer, app servers, database, plus a cache or a queue only where the numbers need it
30-40  Deep dive: the hardest part, the one the interviewer picks or the bottleneck you found
40-45  Wrap-up: the trade-offs you made, what breaks first at 10x, what you'd monitor, what you'd do with more time`,
          try: "خد تمرين [[booking system]] من «تاب بناء مشروع كامل» من غير ما تقرا الإجابة. شغّل تايمر ٤٥ دقيقة، وامشي على السبع خطوات على ورقة، ووقّف كل خطوة في معادها حتى لو مخلصتش. بعدين قارن بالإجابة هناك: أنهي خطوة فاتتك أو خدت وقت أكتر من اللازم؟",
          flag: "script",
          deep: {
            why: "سؤال الـ system design مفتوح عن قصد، ومفيهوش إجابة واحدة صح. اللي بيتقيّم إزاي بتتعامل مع الغموض: بتسأل، وبتحسب، وبتختار، وبتبرر. الإطار الثابت بيخليك متتوهش ومتنساش جزء، وبيخلي الإنترفيوير عارف انت فين.",
            how: R`المتطلبات نوعين: functional (اليوزر يعمل إيه: يحجز، يلغي، يشوف المواعيد)، و non-functional (قد إيه سريع، ومتاح، ومتسق). اكتبهم على الشاشة، واتفق على ٣ features بس والباقي out of scope. والنوع التاني هو اللي بيحدد التصميم: «الحجز لازم يبقى متسق» معناها قاعدة بيانات واحدة بقيد، و «الـ feed ممكن يتأخر ثواني» معناها ينفع كاش و queue.

الأرقام بتقرر: ٥٠ طلب في الثانية سيرفر واحد وداتابيز واحدة كفاية، و ٥٠ ألف في الثانية محتاج كاش وتوزيع. شوف الدرس الجاي [[back-of-envelope]].

الشكل العام ابدأه بسيط: سيرفر وداتابيز. وبعدين ضيف كل مربع (كاش، queue، CDN، replica) لما رقم أو متطلب يطلبه، وقول الرقم ده بصوت عالي. والـ deep dive غالبًا الإنترفيوير هو اللي بيختاره، ولو سابك اختار انت أصعب حتة (توليد الـ ids، أو الحجز المزدوج، أو توصيل الرسايل).

والنسخة الـ junior من السؤال غالبًا أصغر: «صمم الـ backend لتطبيق todo»، أو «صمم API لمتجر». نفس الإطار، بأرقام أصغر وتركيز أكتر على الـ API والداتا.`,
            when: "بيتسأل غالبًا من mid-level وفوق، بس نسخة صغيرة منه بتيجي للـ juniors كتير، خصوصًا في full-stack. ونفس الترتيب بينفع في أي design doc في الشغل قبل feature كبيرة.",
            mistakes: R`ترسم microservices و Kafka و Kubernetes في أول دقيقة. متسألش ولا سؤال. تقضي ٢٠ دقيقة في المتطلبات ومتوصلش للتصميم. تنسى الأرقام فكل قرار مالوش سبب. متقولش ولا trade-off. تسكت وانت بترسم. وتقاوم لما الإنترفيوير يغيّر متطلب في النص: ده مقصود، عشان يشوف هتعدّل إزاي.`
          },
          lines: [
            "أول ٥ دقايق: أسئلة المتطلبات، والحاجات اللي بره الـ scope، والسرعة والتوافر والاتساق.",
            "الأرقام التقريبية اللي هتبرر كل قرار بعد كده.",
            "الـ API: العقد بين الـ client والسيرفر.",
            "الـ data model: الجداول والـ indexes حسب الـ queries.",
            "الشكل العام: ابدأ بسيط، وكل إضافة ليها رقم يبررها.",
            "الـ deep dive: أصعب جزء بالتفصيل.",
            "القفلة: الـ trade-offs، واللي هيقع الأول، والمراقبة."
          ],
          sol: R`التمرين نجح لو في أول ٥ دقايق كتبت أسئلة زي: «الحجز لدكتور واحد ولا كذا دكتور؟»، «ينفع overbooking؟»، «فيه دفع؟»، وقررت ٣ features بس. وفي خطوة الأرقام طلعت برقم للحجوزات في الثانية (غالبًا صغير جدًا، وده بحد ذاته قرار: داتابيز واحدة كفاية). وفي الـ deep dive اتكلمت عن منع الحجز المزدوج بقيد unique أو lock في الداتابيز.

الأكتر شيوعًا في أول محاولة: الشكل العام بياخد ٢٠ دقيقة، فالـ deep dive والقفلة بيضيعوا. عشان كده التايمر لكل خطوة.

والغلط الأكبر: إنك تلاقي نفسك رسمت Redis و queue من غير ما تقول ليه، والأرقام اللي حسبتها مبتطلبهمش.`
        },
        {
          cmd: "back-of-envelope",
          title: "إزاي تحسب أرقام تقريبية (QPS والتخزين) بسرعة، وبتستخدمها في إيه؟",
          desc: R`بحسب بأرقام مدوّرة وبصوت عالي: اليوم فيه ٨٦٤٠٠ ثانية، يعني تقريبًا ١٠٠ ألف. فمليون حاجة في اليوم تقريبًا ١٢ في الثانية. والذروة غالبًا ٢ لـ ٣ مرات المتوسط أو أكتر. والتخزين: عدد السجلات في حجم السجل في المدة.

والرقم مش هدف في نفسه، هو اللي بيقرر: ٦٠ كتابة في الثانية معناها داتابيز واحدة كفاية جدًا، و ٣٥٠٠ قراية في الثانية في الذروة معناها كاش قدام الداتابيز غالبًا يستاهل، و ٢ تيرا في السنة معناها تفكر في الأرشفة. والدقة مش مهمة: المهم الـ order of magnitude.`,
          example: R`// احفظه estimate.mjs وشغّله: node estimate.mjs
const DAU = 1_000_000;
const writesPerUserPerDay = 5;
const readsPerWrite = 20;
const SECONDS_PER_DAY = 86_400;
const writeQps = (DAU * writesPerUserPerDay) / SECONDS_PER_DAY;
const readQps = writeQps * readsPerWrite;
const PEAK_FACTOR = 3;
const BYTES_PER_RECORD = 1_000;
const storageGBPerYear = (DAU * writesPerUserPerDay * 365 * BYTES_PER_RECORD) / 1e9;
console.log({
  writeQps: Math.round(writeQps),
  readQps: Math.round(readQps),
  peakReadQps: Math.round(readQps * PEAK_FACTOR),
  storageGBPerYear: Math.round(storageGBPerYear),
});
// { writeQps: 58, readQps: 1157, peakReadQps: 3472, storageGBPerYear: 1825 }`,
          try: "عدّل الأرقام لتطبيق شات: ١٠ مليون يوزر يومي، و ٤٠ رسالة لليوزر في اليوم، وكل رسالة بتتقري مرتين (1:1)، وحجم الرسالة ٢٠٠ بايت. احسبها في دماغك الأول بأرقام مدوّرة، وبعدين شغّل السكربت وقارن.",
          flag: "script",
          deep: {
            why: "من غير أرقام كل قرار تصميم رأي. الإنترفيوير عايز يشوف إنك بتحط كاش لأن فيه ٣٥٠٠ قراية في الثانية، مش لأن «الكاش كويس». والحساب السريع بيوريك كمان إمتى متعملش حاجة: أغلب المشاريع الحقيقية أرقامها صغيرة وسيرفر واحد كفاية.",
            how: R`أرقام تحفظها تقريبًا: اليوم ≈ [[10^5]] ثانية، والشهر ≈ ٢.٥ مليون ثانية، والسنة ≈ ٣٠ مليون ثانية. والـ KB = [[10^3]] بايت، والـ MB = [[10^6]]، والـ GB = [[10^9]]، والـ TB = [[10^12]]. وخلي الحساب بالأسس: مليون × ٥ × ٣٦٥ × ١٠٠٠ ≈ [[5×10^6 × 4×10^2 × 10^3]] ≈ [[2×10^12]]، يعني حوالي ٢ تيرا.

ترتيب الحساب: الكتابة في الثانية (من اليوزرز والنشاط)، وبعدين القراية (نسبة القراية للكتابة بتختلف جدًا: shortener ١٠٠، وشات ١ أو ٢)، وبعدين الذروة، وبعدين التخزين في السنة، وأحيانًا الـ bandwidth (القراية × حجم الرد).

وقول الافتراضات بصوت عالي («I'll assume 5 writes per user per day, is that reasonable?»): الإنترفيوير ممكن يعدّلها، والمهم إنك ماشي بطريقة. وسعة سيرفر أو داتابيز واحدة بتختلف جدًا حسب الـ query والهاردوير، فمتقولش رقم مطلق بثقة: قول «I'd load test to know, but a few thousand simple indexed reads per second on one Postgres is usually fine». والتفاصيل في «تاب بناء مشروع كامل»: [[scaling path]] و [[scaling القاعدة]].`,
            when: "في الخطوة التانية من أي سؤال system design، وكمان في الشغل لما حد يقترح تقنية تقيلة: «احنا عندنا كام طلب في الثانية فعلًا؟». Follow-ups: «ولو الحمل زاد ١٠ مرات؟»، «التخزين هيوصل كام بعد ٥ سنين؟»، «محتاج كام سيرفر؟».",
            mistakes: R`تحسب بدقة لحد الكسور وتضيّع ٥ دقايق. تنسى الذروة وتصمم على المتوسط. تخلط بين bits و bytes، أو بين اليوم والشهر. تحسب أرقام ومتستخدمهاش في أي قرار بعد كده. أو تفترض أرقام ضخمة (مليار يوزر) لسؤال مقالش كده.`
          },
          lines: [
            "عدد اليوزرز النشطين في اليوم.",
            "كل يوزر بيكتب كام مرة في اليوم (افتراض تقوله بصوت عالي).",
            "كل حاجة اتكتبت بتتقري كام مرة.",
            "ثواني اليوم: تقريبًا ١٠٠ ألف.",
            "الكتابة في الثانية = الكتابة في اليوم ÷ ثواني اليوم.",
            "القراية في الثانية = الكتابة × النسبة.",
            "الذروة: ٣ أضعاف المتوسط كافتراض.",
            "حجم السجل الواحد بالبايت.",
            "التخزين في السنة بالجيجا.",
            "اطبع النتايج مدوّرة.",
            "الكتابة في الثانية: ٥٨، يعني داتابيز واحدة مرتاحة.",
            "القراية في الثانية: حوالي ١٢٠٠.",
            "القراية في الذروة: حوالي ٣٥٠٠، هنا الكاش يستاهل.",
            "التخزين: حوالي ١.٨ تيرا في السنة.",
            "قفلة."
          ],
          sol: R`بالحساب في الدماغ: ١٠ مليون × ٤٠ = ٤٠٠ مليون رسالة في اليوم، على ١٠٠ ألف ثانية ≈ ٤٠٠٠ كتابة في الثانية. القراية مرتين يعني حوالي ٨٠٠٠، والذروة × ٣ حوالي ٢٤٠٠٠. والتخزين: ٤٠٠ مليون × ٢٠٠ بايت = ٨٠ جيجا في اليوم، يعني حوالي ٣٠ تيرا في السنة.

والسكربت بيطلع: [[writeQps: 4630]] و [[readQps: 9259]] و [[peakReadQps: 27778]] و [[storageGBPerYear: 29200]]. الفرق بين حسابك والسكربت سببه إنك دوّرت ٨٦٤٠٠ لـ ١٠٠ ألف، وده عادي جدًا: نفس الـ order of magnitude، ونفس القرارات.

والقرار اللي بيطلع من الأرقام: ٤٠٠٠ كتابة في الثانية وتلاتين تيرا في السنة كتير على داتابيز واحدة من غير تخطيط، فالرسايل هتحتاج partitioning (بالمحادثة مثلًا) وأرشفة للقديم. والغلط الشائع: إنك تنسى تحوّل البايت لجيجا فيطلع ٢٩ مليون جيجا، أو تنسى ×٣٦٥.`,
          solCode: R`// chat.mjs: نفس السكربت بأرقام الشات
const DAU = 10_000_000;
const writesPerUserPerDay = 40;
const readsPerWrite = 2;
const SECONDS_PER_DAY = 86_400;
const writeQps = (DAU * writesPerUserPerDay) / SECONDS_PER_DAY;
const readQps = writeQps * readsPerWrite;
const PEAK_FACTOR = 3;
const BYTES_PER_RECORD = 200;
const storageGBPerYear = (DAU * writesPerUserPerDay * 365 * BYTES_PER_RECORD) / 1e9;
console.log({
  writeQps: Math.round(writeQps),
  readQps: Math.round(readQps),
  peakReadQps: Math.round(readQps * PEAK_FACTOR),
  storageGBPerYear: Math.round(storageGBPerYear),
});
// { writeQps: 4630, readQps: 9259, peakReadQps: 27778, storageGBPerYear: 29200 }`
        },
        {
          cmd: "deep dive و trade-offs",
          title: "في الـ deep dive: إزاي تتكلم بالـ trade-offs والـ bottlenecks بدل ما تحفظ مربعات؟",
          desc: R`كل قرار بقوله في جملة بالشكل ده: «اخترت X عشان Y، والتمن Z، وكنت هختار W لو...». الجملة دي هي اللي بتتقيّم، مش المربع اللي رسمته. والـ trade-offs اللي بتتكرر: كاش (سرعة مقابل داتا قديمة شوية)، و queue (تحمّل وسرعة رد مقابل تعقيد وتأخير)، واتساق قوي مقابل eventual consistency، و fan-out وقت الكتابة مقابل وقت القراية، و monolith مقابل services.

وعشان ألاقي الـ bottleneck بمشي بطلب واحد من اليوزر لحد الداتابيز وأرجع، وبسأل في كل خطوة: لو دي وقعت إيه اللي يحصل؟ (single point of failure)، ولو الحمل زاد ١٠ مرات مين يقع الأول؟`,
          example: R`Cache: "I'll cache product pages in Redis for 60 seconds. Reads get fast; the price is up to a minute of stale data. Fine for a catalog, not for stock at checkout."
Queue: "Emails go through a queue. The API answers fast and survives an email outage; the price is one more moving part, and emails arrive seconds later."
Consistency: "Bookings must be strongly consistent, so they stay in one Postgres with a unique constraint. A likes counter can be eventually consistent."
Fan-out: "For a feed, I'd push posts into followers' feeds on write for normal users, and pull on read for accounts with millions of followers."
Single point of failure: "Right now the database is one machine. Next step: managed Postgres with a standby, and backups we've actually restored."
10x: "At 10x traffic, the first thing to break is probably database reads, so I'd add a cache or a read replica, after measuring."`,
          try: "خد التصميم اللي عملته في تمرين [[chat app]] في «تاب بناء مشروع كامل»، واكتب لكل مربع فيه جملة trade-off بنفس الشكل. أي مربع مش لاقي له تمن أو سبب برقم: شيله وشوف التصميم لسه شغال ولا لأ.",
          flag: "script",
          deep: {
            why: "أي حد يقدر يحفظ رسمة فيها load balancer و Redis و Kafka. اللي بيفرّق المهندس إنه عارف كل حاجة منهم بتكلّف إيه، وإمتى متستخدمهاش. والإنترفيوير بيضغط في الـ deep dive بالظبط عشان يشوف الفرق ده.",
            how: R`الكاش: السؤال مش «أحط كاش؟» لكن «الداتا دي ينفع تبقى قديمة قد إيه؟»، وبعدين invalidation: TTL، أو امسح المفتاح وقت الكتابة. (في «تاب بناء مشروع كامل»: [[طبقات الكاش]].)

الـ queue: أي حاجة مش لازم اليوزر يستناها (إيميل، صورة، تقرير) تروح queue، والـ worker يعيد لو فشلت، فلازم الشغل يبقى idempotent. (هناك: [[background jobs]].)

الاتساق: الفلوس والحجز والمخزون محتاجين اتساق قوي (transaction وقيد في داتابيز واحدة). العدادات والـ feeds والإحصائيات ينفع تتأخر. وقول ده كده صريح، لأنه بيحدد أنهي جزء ينفع يتوزّع أو يتكاش.

الـ fan-out: وقت الكتابة (تكتب البوست في feed كل متابع) قراية سريعة بس كتابة غالية للحسابات الكبيرة. ووقت القراية (تجمّع وقت ما اليوزر يفتح) العكس. الحلول الحقيقية بتخلط الاتنين. والتوسع: [[scaling القاعدة]] و [[backups و DR]] هناك.`,
            when: "في الـ deep dive والقفلة، ولما الإنترفيوير يسأل «ليه؟» أو «وإيه المشكلة في كده؟» أو «لو الحتة دي وقعت؟». ونفس الجمل بتنفع في design review في الشغل.",
            mistakes: R`كل اختيار بتقوله كأنه الصح الوحيد. تضيف كاش من غير ما تقول هيتمسح إمتى. queue من غير ما تفكر في الـ retry والتكرار. «NoSQL عشان بيعمل scale» من غير ما تقول الـ queries شكلها إيه. تتجاهل الـ single point of failure. أو تستخدم كلمات (CAP، sharding) من غير ما تقدر تشرحها لو اتسألت.`
          },
          lines: [
            "كاش: الميزة، والتمن (داتا قديمة)، وفين ينفع وفين لأ.",
            "queue: الميزة، والتمن (تعقيد وتأخير).",
            "الاتساق: أنهي داتا لازم تبقى دقيقة دايمًا، وأنهي ينفع تتأخر.",
            "fan-out: حل مختلف حسب نوع الحساب، مش حل واحد للكل.",
            "الـ single point of failure: بتقوله انت قبل ما يتسأل، ومعاه الخطوة الجاية.",
            "الحمل ×١٠: مين يقع الأول، والحل بعد القياس مش قبله."
          ],
          sol: R`تصميم الشات فيه غالبًا: WebSocket servers، و Redis (للـ presence والـ pub/sub بين السيرفرات)، و Postgres للرسايل، و push notifications. التمرين نجح لو كل واحد منهم ليه جملة زي: «Redis pub/sub عشان المستقبل ممكن يكون على سيرفر تاني. التمن: لو Redis وقع الرسايل اللحظية تقف، بس محفوظة في Postgres واليوزر يسحبها لما يعمل reconnect».

ولو شلت Redis وانت عندك سيرفر WebSocket واحد، التصميم بيشتغل عادي. ودي نتيجة مهمة: Redis هنا مطلوب عشان التوسع لأكتر من سيرفر، مش من أول يوم. قول ده في الانترفيو.

الغلط الشائع: جمل من غير تمن («Redis عشان سريع»)، أو مربع مش عارف تقول ليه موجود غير «كل التصميمات فيها كده».`
        }
      ]
    },
    {
      t: "الخطة والتوظيف",
      l: 3,
      n: "من أول ما تقدّم لحد العرض: المراحل، وخطة آخر أسبوعين بـ «اختبرني»، والإنجليزي لو مش قوي، واللي تعمله بعد الرفض",
      items: [
        {
          cmd: "مراحل التوظيف",
          title: "مراحل التوظيف عادةً إيه؟ وكل مرحلة بتختبر إيه؟",
          desc: R`الشكل الشائع: فرز الـ CV، وبعدين مكالمة مع الـ recruiter أو الـ HR، وبعدين technical screen (اختبار online، أو take-home، أو مكالمة تقنية)، وبعدين جولة أو أكتر تقنية (كود، وأسئلة عن الـ stack، وأحيانًا system design أو pair programming)، وبعدين جولة سلوكية أو مع الـ hiring manager، وفي الآخر العرض.

العدد والترتيب بيختلف جدًا: startup صغيرة ممكن تعمل مكالمتين وخلاص، وشركة كبيرة ممكن تعمل ٥ جولات، وأحيانًا في يوم واحد. والمدة من أسبوع لكذا أسبوع. وأول ما تتكلم مع الـ recruiter اسأل: «What does the process look like?». ده سؤال عادي جدًا، وبيخليك تذاكر للجولات اللي جاية فعلًا.`,
          example: R`Recruiter call (15-30 min): motivation, experience, salary expectations, notice period. Prepare: tell me about yourself, a salary range
Online test (60-90 min): 2 or 3 problems with automatic test cases. Prepare: «تاب DSA» with a timer
Take-home (a few hours): a small real app. Prepare: time box, tests, README with assumptions
Technical interview (45-60 min): live coding and questions about your stack, sometimes pair programming
System design (45-60 min, more common from mid-level): design a service out loud
Behavioral or hiring manager (30-60 min): STAR stories, your projects, your questions for them
Offer: salary, start date, probation, benefits. Get it in writing before you resign from anywhere`,
          try: "اختار ٣ إعلانات وظايف حقيقية تناسبك. لكل واحد اكتب: المراحل المتوقعة (ولو مش مكتوبة، ده أول سؤال للـ recruiter)، وأنهي مرحلة انت أضعف فيها، وأنهي قسم في التاب ده أو في «تاب DSA» هيغطيها.",
          flag: "script",
          deep: {
            why: "لما تعرف المرحلة الجاية بتختبر إيه، بتذاكر الصح. ناس كتير بتذاكر algorithms أسبوعين والجولة الجاية كانت behavioral أو take-home. وكل مرحلة ليها معيار مختلف: الـ recruiter بيدوّر على التواصل والتوقعات، والتقني على المهارة، والـ manager على التوافق مع الفريق.",
            how: R`الـ recruiter call: مش تقنية، بس فيها فرز حقيقي. جهّز «عرّفنا بنفسك» في ٦٠ ثانية، وسبب تقديمك، ورينج مرتب واقعي (اسأل ناس في نفس المستوى والمدينة، أو مواقع رواتب محلية)، وإمتى تقدر تبدأ. ولو اتسألت عن المرتب بدري، ممكن تقول رينج، أو تسأل «What's the budget for this role?».

الاختبار الـ online (HackerRank، أو Codility، أو غيرهم): test cases أوتوماتيك، يعني الـ edge cases هي اللي بتوقعك. اقرا القيود على الـ input، وسلّم حل شغال للكل قبل ما تحسّن.

والعرض: اطلبه مكتوب وفيه المرتب (gross ولا net)، وفترة الاختبار، والتأمين، ومكان الشغل وساعاته. ومتستقيلش من شغلك الحالي على وعد بالكلام. والتفاوض عادي ومتوقع لو بأدب وبسبب.`,
            when: "من أول ما تقدّم. وبعد كل مرحلة اسأل: «What are the next steps and when can I expect to hear back?». ولو عدّى الميعاد ومحدش رد، رسالة متابعة واحدة مهذبة بعد كام يوم عادي جدًا.",
            mistakes: R`تذاكر لمرحلة مش جاية. تقول رقم مرتب من غير ما تعرف السوق، أو ترفض تقول أي رقم خالص. تتعامل مع الـ recruiter call كأنها شكلية. توافق على عرض بالكلام وتستقيل. وتقدّم على ١٠٠ وظيفة بنفس الـ CV من غير ما تتابع ولا واحدة.`
          },
          lines: [
            "مكالمة الـ recruiter: بتختبر إيه وتجهّز إيه.",
            "الاختبار الـ online: مسائل بتتصحح لوحدها، والتحضير بتايمر.",
            "الـ take-home: التحضير في قسم «الـ take-home والعملي» فوق.",
            "الانترفيو التقني: كود وأسئلة عن اللي بتستخدمه.",
            "الـ system design: غالبًا من mid-level، ونسخة أصغر للـ juniors أحيانًا.",
            "السلوكي: قصص STAR ومشاريعك وأسئلتك.",
            "العرض: اطلبه مكتوب قبل أي استقالة."
          ],
          sol: R`لكل إعلان المفروض يطلع معاك سطر زي: «المراحل: recruiter، ثم take-home، ثم تقني. الأضعف: take-home. المذاكرة: قسم الـ take-home في التاب ده، و README لمشروع قديم». ولو الإعلان مفيهوش المراحل (وده الغالب)، اكتب السؤال اللي هتسأله للـ recruiter.

والنتيجة المفيدة من التلات إعلانات مع بعض: غالبًا هتلاقي مرحلة متكررة انت ضعيف فيها (عند ناس كتير السلوكي أو الـ take-home). دي أولويتك الأولى، قبل مسائل DSA زيادة.

الغلط الشائع: إنك تكتب «هذاكر كل حاجة»، من غير ما تحدد مرحلة ولا قسم.`
        },
        {
          cmd: "آخر أسبوعين",
          title: "فاضل أسبوعين على الانترفيو: تذاكر إزاي بالظبط؟",
          desc: R`كل يوم نفس الروتين القصير: ٢٠ دقيقة «اختبرني» في «تاب الانترفيو» على المستوى اللي محتاجه، وبعدين «راجع اللي نسيته» اللي فوق في الصفحة (بيجمع البطاقات اللي نسيتها من كل التابات)، ومسألة أو اتنين من «تاب DSA» بتايمر وبصوت عالي، وقصة STAR واحدة بصوت عالي.

وفوق الروتين: ٣ mock interviews كاملة مع صاحب (٤٥ دقيقة، وبعدين تبدّلوا)، وتمرين system design كل كام يوم من «تاب بناء مشروع كامل»، وبحث عن الشركة نفسها. وآخر يومين مفيش حاجة جديدة: مراجعة، وتجربة الكاميرا والمايك والـ editor، ونوم.`,
          example: R`Day 1: research the company and the job ad; list their stack and 3 things you like about the product
Days 1-14, daily: 20 min of «اختبرني» in «تاب الانترفيو», then «راجع اللي نسيته»
Days 1-14, daily: 1 or 2 problems from «تاب DSA», 30 min each, out loud with a timer
Days 2-6: write 6 STAR stories; tell one out loud every day and record it
Days 3, 7, 11: one system design exercise from «تاب بناء مشروع كامل», 35 min on paper
Days 5, 9, 12: a full mock interview with a friend (45 min), then switch roles
Day 13: review only; test your camera, mic, internet and the coding tool they use
Day 14: rest, sleep early, and have water and your questions for them ready`,
          try: "اكتب جدول الأسبوعين بتواريخ حقيقية في الكاليندر بتاعك، واعمل أول يوم النهارده: «اختبرني» ٢٠ دقيقة في المستوى الأول من التاب ده، وبعدين دوس «راجع اللي نسيته». اكتب رقم البطاقات اللي نسيتها، وقارنه بعد أسبوع.",
          flag: "script",
          deep: {
            why: "المذاكرة العشوائية قبل الانترفيو بتدّي إحساس إنك شغال من غير نتيجة. الروتين القصير اليومي أحسن من ماراثون يوم، لأن التذكّر بيثبت بالتكرار على أيام متفرقة، وده بالظبط اللي «اختبرني» و «راجع اللي نسيته» معمولين عشانه. والـ mock بيدرّبك على الضغط والكلام، ودي حاجة المذاكرة لوحدها مبتعملهاش.",
            how: R`«اختبرني» بيعرض بطاقات عشوائية من التاب والمستوى اللي انت فيهم، والبطاقات اللي بتقول إنك نسيتها بتتكرر أكتر. جاوب بصوت عالي قبل ما تكشف الإجابة، وكن صادق في «عرفتها» و «لسه، كرّرها». و «راجع اللي نسيته» بيجمع البطاقات اللي نسيتها أكتر ما افتكرتها من كل التابات، فهو قايمة نقط ضعفك جاهزة. وابدأ بتابات الـ stack اللي في الإعلان (مثلًا «تاب React» و «تاب Backend بـ Node») كمان، مش التاب ده بس.

الـ mock: صاحبك ياخد سؤال من التاب ده ويسألك بجد، بتايمر، وانت ممنوع تبص على حاجة، وفي الآخر يقولك ٣ حاجات: حاجة عملتها كويس، وحاجة تتحسن، ولحظة كنت تايه فيها. ولو مفيش حد، سجّل نفسك فيديو وانت بتجاوب، والتسجيل بيكشف حاجات مش هتصدقها (السكوت، و «umm»، والإجابات الطويلة).

والشركة: اقرا الإعلان سطر سطر وعلّم كل technology فيه، وجرّب منتجهم لو متاح، واقرا أي engineering blog ليهم. ده بيطلع منه إجابة «ليه احنا؟» وأسئلتك ليهم.`,
            when: "من لحظة ما يتحدد ميعاد الانترفيو. ولو فاضل أقل من أسبوعين، قلّص: الروتين اليومي، و mock واحد، وقصص STAR. ولو أكتر من شهر، ابدأ بالمستوى الأول والتاني من التاب ده وتابات الـ stack قبل الروتين ده.",
            mistakes: R`تذاكر حاجة جديدة خالص آخر يومين. تقرا الإجابات بعينك من غير ما تجاوب بصوت. تدوس «عرفتها» وانت عارفها نص نص. متعملش ولا mock عشان محرج. تسهر ليلة الانترفيو. وتكتشف إن الكاميرا أو الـ editor مش شغالين قبل الانترفيو بدقيقتين.`
          },
          lines: [
            "اليوم الأول: البحث عن الشركة، وده بيحدد تذاكر إيه.",
            "كل يوم: «اختبرني» ثم «راجع اللي نسيته» على نقط ضعفك.",
            "كل يوم: مسائل بتايمر وبصوت عالي.",
            "أول أسبوع: قصص STAR مكتوبة، وواحدة بصوت عالي كل يوم.",
            "تلات تمارين system design على ورقة.",
            "تلات mock interviews كاملة، وتبديل الأدوار بيعلمك كمان.",
            "قبل الأخير: مراجعة بس، وتجربة كل الأدوات.",
            "اليوم الأخير: راحة."
          ],
          sol: R`بعد أول جلسة «اختبرني»، لو دوست «لسه، كرّرها» ولو على بطاقة واحدة، هيظهر زرار «راجع اللي نسيته» فوق في الصفحة ومعاه رقم: عدد البطاقات اللي نسيتها أكتر ما افتكرتها. الرقم ده في الأول ممكن يبقى كبير، وده عادي، وهو بالظبط قايمة المذاكرة بتاعتك.

بعد أسبوع من الروتين، الرقم المفروض يقل حتى لو زوّدت تابات جديدة، لأن البطاقات اللي بتفتكرها أكتر ما بتنساها بتطلع من القايمة. لو الرقم مبيقلش، غالبًا بتقرا الإجابة بدل ما تجاوب الأول بصوت عالي.

الغلط الشائع: الجدول مكتوب بس مش في الكاليندر، فبيتنسي من تالت يوم. وإنك تسيب أيام الـ mock عشان محتاج حد تاني، والحل تسجيل الفيديو.`
        },
        {
          cmd: "English وانجليزيتك مش قوية",
          title: "الانترفيو بالإنجليزي وانجليزيتك مش قوية: تعمل إيه؟",
          desc: R`الإنترفيوير بيقيّم إنك تفهم وتتفهم، مش الـ accent ولا الـ grammar المظبوط. فبجهّز الإجابات اللي أكيد جاية (عرّفنا بنفسك، وقصص STAR، ومشروعي) مكتوبة بالإنجليزي بجمل قصيرة، وبقولها بصوت عالي لحد ما تبقى طبيعية، من غير ما أحفظها كلمة بكلمة. والكلمات التقنية أصلًا إنجليزي وأنا عارفها.

وجمل جاهزة للمواقف الصعبة: إني أطلب يعيد السؤال، أو يتكلم أبطأ، أو أتأكد إني فهمت، أو آخد وقت أفكر. ده كله عادي في أي انترفيو، حتى بين ناس لغتهم الأم إنجليزي. والسكوت ٥ ثواني وانت بتفكر مش مشكلة.`,
          example: R`"Sorry, could you repeat the question, please?"
"Could you say that a bit more slowly?"
"Just to make sure I understood: you're asking how I would handle a failed payment, right?"
"Let me think about that for a moment."
"I'm not sure of the exact word, but it's the thing that keeps the user logged in, the refresh token."
"Can I draw it or write it down? It will be clearer."
"To sum up: first I validate the input, then I save it, and finally I send the email in the background."
"I haven't used that tool, but I've used something similar, and this is how it worked."`,
          try: "اكتب «Tell me about yourself» وقصة STAR واحدة بالإنجليزي بجمل ما تزيدش عن ١٥ كلمة. سجّل نفسك وانت بتقولهم ٣ مرات في ٣ أيام. في التسجيل التالت، خلي حد يسألك سؤال مفاجئ عن مشروعك، واستخدم جملة من الجمل دي على الأقل مرة.",
          flag: "script",
          deep: {
            why: "ناس كتير قوية تقنيًا بتتقفل في الانترفيو عشان خايفة من غلطة لغة، فبتسكت أو بتجاوب إجابات قصيرة جدًا. والنتيجة إنها بتبان أضعف من حقيقتها. والشغل نفسه (docs، و Slack، و PRs) غالبًا إنجليزي مكتوب، وده أسهل بكتير من الكلام.",
            how: R`جمل قصيرة: فاعل وفعل ومفعول. «I added a cache. It cut the load time.» أحسن من جملة طويلة فيها which و that وتتوه في نصها. والمضارع والماضي البسيط كفاية تقريبًا لكل الانترفيو.

المفردات اللي هتحتاجها فعلًا: كلمات القرارات (I chose, because, the trade-off was, instead of)، وكلمات الأرقام (about, reduced from X to Y, per second)، وكلمات التسلسل (first, then, after that, finally). اكتبهم في ورقة جنبك في الانترفيو الـ online، ده مش غش.

ولو الشركة محلية أو الفريق عربي، عادي تسأل الـ recruiter: «Will the interview be in English or Arabic?»، وأحيانًا بيسيبوا الاختيار. بس لو الشغل نفسه مع فريق أو عملاء برا، الإنجليزي هيبقى جزء من التقييم فعلًا، فتدرّب. واللي بيفيد على المدى الطويل: اتفرّج على talks تقنية بالإنجليزي، واكتب الـ README والـ commits بتاعتك بالإنجليزي.`,
            when: "أي انترفيو في شركة برا أو شركة محلية بتشتغل مع عملاء برا، وغالبًا جولة واحدة على الأقل في الشركات الكبيرة. ونفس الجمل بتنفع في الـ standups والاجتماعات بعد ما تتعين.",
            mistakes: R`تحفظ إجابات كاملة كلمة بكلمة، فتبان بتسمّع، ولو سؤال جه بصيغة مختلفة تتوه. تعتذر عن الإنجليزي كل شوية («sorry my English is bad»): مرة واحدة كفاية أو بلاش خالص. تجاوب «yes» على سؤال مفهمتوش بدل ما تطلب يتعاد. وتترجم من العربي في دماغك جملة طويلة كلمة كلمة.`
          },
          lines: [
            "اطلب يعيد السؤال: عادي تمامًا.",
            "اطلب يتكلم أبطأ.",
            "أكّد إنك فهمت السؤال بكلامك قبل ما تجاوب.",
            "خد وقت تفكر من غير ما تبان تايه.",
            "نسيت الكلمة؟ اوصفها لحد ما توصل لها.",
            "استخدم الرسم أو الكتابة لما الكلام يصعب.",
            "لخّص إجابة طويلة بـ first و then و finally.",
            "حاجة معرفتهاش: قول كده، واربطها بحاجة تعرفها."
          ],
          sol: R`الإجابات المكتوبة صح لو كل جملة فيها فكرة واحدة وأقل من ١٥ كلمة، وفيها كلمات القرارات (because، instead of، the trade-off). ولو لقيت جملة فيها «which» مرتين، قسّمها.

وبين التسجيل الأول والتالت المفروض تلاحظ فرق واضح: سرعة أهدى، وسكوت أقل في نص الجملة، ونفس الأفكار بكلمات مختلفة شوية (ده معناه إنك فاهم مش حافظ). وفي السؤال المفاجئ، استخدامك لجملة زي «Let me think about that for a moment» بدل السكوت أو «umm» الطويلة هو النجاح المطلوب.

الغلط الشائع: التسجيل التالت طالع زي الأول بالظبط كلمة بكلمة، يعني حفظت. جرّب تقول القصة من النقط بس من غير النص.`
        },
        {
          cmd: "بعد الرفض",
          title: "اترفضت: تعمل إيه عشان الانترفيو الجاي يبقى أحسن؟",
          desc: R`نفس اليوم، وقبل ما أنسى، بكتب كل سؤال فاكره، وإجابتي، وقيّمت نفسي فيه قد إيه، وإيه اللي كان ناقص. ده الـ question log بتاعي، ومع الوقت بيطلع منه نمط (نفس النوع من الأسئلة بيوقعني). وبحوّل كل سؤال ضعيف لحاجة أذاكرها: الدرس اللي بيغطيه في الموقع، وأحطه في روتين «اختبرني».

وببعت رسالة شكر قصيرة وأطلب feedback بأدب. شركات كتير مبتدّيش feedback مفصّل لأسباب سياسة داخلية، فمتاخدهاش بشكل شخصي. والرفض كتير مالوش علاقة بيك: حد تاني عنده خبرة أكتر في حاجة معينة، أو الميزانية اتغيرت، أو المكان اتملى من جوه. وشركات كتير بتسمحلك تقدّم تاني بعد فترة (غالبًا شهور).`,
          example: R`Date: 2026-09-20 | Company: X | Round: technical, 60 min | Result: rejected
Q: "What's the difference between a process and a thread?" | Me: 6/10 | Missing: shared memory, context switch cost
Q: "Design a rate limiter" | Me: 3/10 | Missing: never heard of token bucket
Q: "Tell me about a mistake you made" | Me: 8/10 | OK, but too long (4 min)
Next: re-read «ذاكرة منفصلة ولا مشتركة», learn token bucket, cut the mistake story to 2 min
Email: "Thank you for your time today. If possible, I'd appreciate any feedback that could help me improve."`,
          try: "اعمل ملف question log (نوتس، أو ملف نصي، أو شيت). لو عملت انترفيو قبل كده اكتب كل الأسئلة اللي فاكرها بالشكل ده. لو لسه، اعمل mock مع صاحب واكتبه بعده على طول. وفي عمود «Next» لكل سؤال ضعيف، اكتب اسم التاب والدرس بالظبط.",
          flag: "script",
          deep: {
            why: "الانترفيوهات مهارة بتتحسن بالتكرار، بس لو اتعلمت من كل واحد. من غير log، بتروح الانترفيو الجاي وبتقع في نفس الأسئلة. والرفض الأول والتاني والعاشر طبيعي جدًا للـ juniors، والفرق بين اللي بيتعين واللي لأ غالبًا هو اللي كمّل وحسّن.",
            how: R`الـ log يتكتب في نفس اليوم، لأن بعد يومين نص الأسئلة بتتنسى. التقييم من ١٠ صادق مش مجامل، وعمود «Missing» محدد («مقلتش الـ context switch») مش عام («مكنتش كويس»).

كل أسبوع أو اتنين بص على الـ log كله: لو ٣ أسئلة من نفس النوع (system design، أو SQL، أو behavioral) كانوا أقل من ٥، ده مجالك الجاي. وكل سؤال اتسأل مرة غالبًا هيتسأل تاني في مكان تاني، فالـ log بيبقى بنك أسئلة حقيقي من سوقك انت.

رسالة الـ feedback: قصيرة، ومن غير جدال، ومن غير ما تطلب يغيّروا القرار. لو ردوا بحاجة، اشكرهم وخلاص. ولو قالوا «مش هنقدر نشارك تفاصيل»، دي إجابة عادية. وخلي الباب مفتوح: «I'd be happy to be considered for future roles». ناس كتير اتعينوا في نفس الشركة في مرة تانية.`,
            when: "بعد كل انترفيو، سواء اترفضت أو اتقبلت أو لسه مستني. والـ log نفسه بيبقى أحسن مصدر مذاكرة قبل الانترفيو الجاي، أحسن من أي قايمة «top 100 questions».",
            mistakes: R`تقفل اللابتوب وتحاول تنسى. ترد على الرفض بجدال أو بزعل. تعتبر الرفض حكم نهائي على مستواك. تذاكر كل حاجة من الأول بدل ما تركز على اللي الـ log بيقوله. وتقدّم على ٥٠ وظيفة في أسبوع بعد الرفض من غير ما تغيّر أي حاجة.`
          },
          lines: [
            "رأس السجل: إمتى، وفين، وأنهي جولة، والنتيجة.",
            "سؤال تقني: التقييم الصادق، والناقص بالتحديد.",
            "سؤال مكنتش تعرفه خالص: ده أوضح حاجة تذاكرها.",
            "سؤال سلوكي: الإجابة كانت كويسة بس فيها مشكلة شكل (الطول).",
            "الخطوة الجاية: درس بالاسم، وحاجة تتعلمها، وتعديل على قصة.",
            "رسالة الشكر وطلب الـ feedback، من غير جدال."
          ],
          sol: R`الـ log صح لو كل سطر فيه السؤال بالنص تقريبًا، ورقم، وعمود «Missing» محدد بحاجة واحدة أو اتنين، وعمود «Next» فيه اسم تاب ودرس ينفع تفتحه على طول (مثلًا «تاب الانترفيو»: [[ذاكرة منفصلة ولا مشتركة]]، أو «تاب Git»: [[git rebase]]).

بعد ٣ أو ٤ انترفيوهات (أو mocks)، لو بصيت على الأرقام هتلاقي غالبًا نوع واحد من الأسئلة دايمًا تحت ٥. ده أهم اكتشاف في التمرين كله.

الغلط الشائع: عمود «Next» مكتوب فيه «ذاكر أكتر» أو «system design» بس، ودي مش خطوة تقدر تبدأها النهارده.`
        }
      ]
    }
    /*__L3__*/
  ]
});
