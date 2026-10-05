// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "PWA و service worker",
      l: 3,
      n: "الموقع يتسطّب ويشتغل من غير نت: manifest، ودورة حياة الـ SW، واستراتيجيات الكاش، وزرار «نسخة جديدة»، و IndexedDB",
      items: [
        {
          cmd: "manifest.webmanifest",
          title: "تخلي الموقع يتسطّب كتطبيق إزاي؟",
          desc: R`الـ PWA (Progressive Web App) موقع عادي بيتسطّب على الموبايل والكمبيوتر كأنه تطبيق: أيقونة على الشاشة، ويفتح في شباك لوحده من غير شريط العنوان، وممكن يشتغل من غير نت. أول حتة هي الـ manifest: ملف JSON بيوصف التطبيق، وبتربطه من الـ HTML بـ [[<link rel="manifest" href="manifest.webmanifest">]].

الموقع اللي انت بتذاكر فيه ده نفسه PWA: ده الـ manifest بتاعه تقريبًا زي ما هو. أهم الحقول: [[name]] و [[short_name]] (تحت الأيقونة)، و [[start_url]] (يفتح على فين)، و [[display: "standalone"]] (من غير شريط المتصفح)، و [[icons]] (192 و 512 على الأقل، وواحدة [[maskable]] عشان Android يقصّها دايرة أو مربع من غير ما تتقطع)، و [[theme_color]] و [[background_color]] (لون الشريط وشاشة البداية)، و [[lang]] و [[dir]] للعربي.`,
          example: R`// manifest.webmanifest (بتاع الموقع ده، مختصر)
{
  "name": "الترمنال بإيدك",
  "short_name": "الترمنال",
  "lang": "ar",
  "dir": "rtl",
  "start_url": "./",
  "scope": "./",
  "display": "standalone",
  "background_color": "#1f2430",
  "theme_color": "#1f2430",
  "icons": [
    { "src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "icons/maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}`,
          try: R`افتح الموقع ده في Chrome، و DevTools ← Application ← Manifest: شوف الحقول والأيقونات وأي warnings. وبعدين في مشروع عندك: اعمل manifest بنفس الشكل وأيقونات (ممكن تولّدها بـ [[npx @vite-pwa/assets-generator]] أو أي أداة)، واربطه، وشوف أيقونة التسطيب ظهرت في شريط العنوان ولا لأ. ولو مظهرتش، Application ← Manifest هيقولك الناقص.`,
          flag: "script",
          deep: {
            why: "تطبيق موبايل كامل (Flutter أو React Native) معناه store ومراجعة وتحديثات بتستنى اليوزر. الـ PWA موقعك نفسه، بيتحدّث أول ما تنشر، واليوزر يسطّبه بضغطة. لأدوات داخلية، و dashboards، ومواقع مذاكرة زي دي، وأي حاجة اليوزر بيفتحها كل يوم، ده غالبًا كفاية (تاب Desktop و Mobile بيقارن).",
            how: R`المتصفح بيقرا الـ manifest ويقرر إن الموقع «installable». في Chromium الشروط: HTTPS (أو localhost)، و manifest فيه [[name]] أو [[short_name]] وأيقونات 192 و 512 و [[start_url]] و [[display]] مش [["browser"]]. (زمان كان لازم كمان service worker بـ fetch handler، و Chrome شال الشرط ده في نسخه الحديثة، بس من غير SW مفيش offline.)

في Chrome و Edge بيظهر زرار تسطيب في شريط العنوان، وتقدر تعمل زرار بنفسك بـ [[beforeinstallprompt]] (Chromium بس). في Safari على iOS مفيش prompt: اليوزر لازم يضغط Share ← «Add to Home Screen» بنفسه، فلازم تشرحله. وفي Safari على الماك «Add to Dock».

[[scope]] بيحدد الـ URLs اللي تفضل جوه التطبيق؛ أي لينك برّاه بيفتح في المتصفح. و [[id]] (اختياري) هوية التطبيق لو [[start_url]] اتغير بعدين. والـ manifest نفسه بيتكاش عادي، فالتغييرات فيه (أيقونة جديدة) بتاخد وقت عشان تظهر للي مسطّبين.`,
            when: R`أي موقع اليوزر بيرجعله كتير. والـ manifest لوحده (من غير SW) لسه مفيد: أيقونة ولون وشاشة بداية لما حد يضيفه للشاشة.`,
            mistakes: R`أيقونة maskable محتواها لحد الحواف فبيتقص (خلي المحتوى في الـ 80% اللي في النص). و [[start_url]] مطلق ([["/"]]) والموقع في فولدر فرعي على GitHub Pages. ومفيش [[dir: "rtl"]] لموقع عربي. وتتوقع prompt تلقائي على iPhone.`
          },
          lines: [
            "القوس.",
            "الاسم الكامل (شاشة التسطيب).",
            "الاسم تحت الأيقونة.",
            "اللغة.",
            "الاتجاه.",
            R`يفتح على فين. [["./"]] نسبي للـ manifest، عشان يشتغل في أي فولدر.`,
            "الـ URLs اللي جوه التطبيق.",
            "شباك لوحده من غير شريط العنوان.",
            "لون شاشة البداية.",
            "لون شريط النظام.",
            "الأيقونات.",
            "للشاشات العادية.",
            "للتسطيب وشاشة البداية.",
            R`[[maskable]]: Android يقصها بالشكل اللي عايزه.`,
            "قفلة.",
            "قفلة."
          ],
          sol: R`Application ← Manifest بيعرض الاسم والألوان والأيقونات التلاتة، ولو فيه مشكلة (أيقونة ناقصة أو مقاس غلط) بتظهر كـ warning فوق. وفي «Installability» لو فيه سبب يمنع التسطيب.

في مشروعك: أيقونة التسطيب بتظهر في شريط العنوان على Chrome/Edge بعد ما الـ manifest يتقري صح والموقع على [[localhost]] أو HTTPS. الأسباب الشائعة إنها متظهرش: أيقونة 512 ناقصة، أو مسار أيقونة غلط (404 في Network)، أو [[display: "browser"]]، أو فاتح الملف بـ [[file://]]. وعلى iPhone مفيش أيقونة في الشريط أصلًا، التسطيب من زرار Share.`
        },
        {
          cmd: "دورة حياة الـ SW",
          title: "الـ service worker بيتسطّب ويشتغل إزاي، وليه التحديث مش بيظهر؟",
          desc: R`الـ service worker ملف JS بيشتغل في الخلفية بين صفحتك والشبكة: كل request من الصفحة بيعدّي عليه ([[fetch]] event)، ويقدر يرد من كاش أو من الشبكة. من غير DOM ومن غير [[window]]، وبيشتغل بس على HTTPS أو localhost.

دورة حياته: [[register]] من الصفحة ← install (تحفظ الملفات الأساسية في الكاش) ← waiting ← activate (تمسح الكاش القديم) ← يتحكم في الصفحات.

waiting هي سر «عملت deploy والتحديث مش ظاهر»: لما يبقى فيه SW جديد، بيتسطّب ويستنى لحد ما كل التابات اللي شغالة بالقديم تتقفل. الـ refresh مش كفاية. [[self.skipWaiting()]] بيخليه يتفعّل فورًا، و [[clients.claim()]] بيخليه يمسك الصفحات المفتوحة من غير ما تتعمل reload.`,
          example: R`// في الصفحة (app.js):
if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js");
// في sw.js:
const CACHE = "app-v2";
const PRECACHE = ["/", "/offline.html", "/app.css", "/app.js"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)));
});
self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener("message", (e) => {
  if (e.data === "SKIP_WAITING") self.skipWaiting();
});`,
          try: R`اعمل مشروع صغير بالملفات دي وشغّله على localhost. افتح Application ← Service workers وشوف الحالة. غيّر [[CACHE]] لـ [["app-v3"]] واعمل refresh: فيه SW في حالة «waiting to activate»؟ اعمل refresh تاني: اتفعّل؟ وبعدين دوس «skipWaiting» في DevTools، وبص على Cache storage: القديم اتمسح؟ وآخر حاجة: افتح [[sw.js]] بتاع الموقع ده في الـ repo واعرف هو بيعمل skipWaiting فين.`,
          flag: "script",
          deep: {
            why: "أول ما تحط SW في موقع، أول شكوى هتسمعها «أنا مش شايف التعديل». الـ SW بيتحكم في كل request، فلو فهمت دورة حياته غلط ممكن تقفل اليوزرز على نسخة قديمة أسابيع. ودي من أشهر مشاكل الـ PWAs في الشغل الحقيقي (وتاب «من مشاريعي» فيه أمثلة).",
            how: R`المتصفح بيفحص [[sw.js]] عند كل تنقل (وكل ٢٤ ساعة على الأكتر، و [[reg.update()]] يدوي). لو الملف اختلف ولو byte واحد، يعتبره SW جديد ويبدأ install. عشان كده بتغيّر اسم الكاش أو أي حاجة فيه مع كل release (أو الأدوات بتحط hashes الملفات فيه لوحدها). والمتصفح بيتجاهل الـ HTTP cache لـ [[sw.js]] نفسه افتراضيًا، بس ملفات [[importScripts]] ممكن تتكاش.

[[e.waitUntil(promise)]] بيقول «متعتبرش الـ install خلص لحد ما ده يخلص». لو أي ملف في [[addAll]] رجع 404، الـ install كله بيفشل والقديم يفضل شغال.

ليه waiting موجود أصلًا؟ الصفحة المفتوحة اتحمّلت بـ HTML وJS قديم. لو SW جديد مسك كاش جديد في النص، الصفحة ممكن تطلب [[chunk-abc.js]] القديم فميلاقيهوش. فالافتراضي الآمن: استنى لما مفيش حد شغال بالقديم. والـ refresh مش كفاية لأن الصفحة الجديدة بتبدأ قبل ما القديمة تتقفل، فدايمًا فيه client.

الموقع ده بيعمل [[skipWaiting()]] في الـ install و [[clients.claim()]] في الـ activate، ومعاهم كاش network-first (الدرس الجاي)، فالتحديث بيظهر من أول تحميل. ده مناسب لأن كل الملفات بتتجاب من الشبكة أصلًا، بس مع cache-first و chunks بـ hashes الأضمن تسأل اليوزر (زرار «نسخة جديدة»).`,
            when: R`أي PWA. وفي الـ dev خلي «Update on reload» متعلّم في DevTools ← Application ← Service workers، وإلا هتقعد تتلخبط.`,
            mistakes: R`SW على [[/js/sw.js]]: الـ scope بتاعه [[/js/]] بس، فمش هيتحكم في الصفحة (حطه في الـ root). وتنسى تمسح الكاش القديم في activate فالتخزين يكبر. و skipWaiting دايمًا مع cache-first فالصفحة المفتوحة تتكسر. و [[Cache-Control: max-age]] طويل على sw.js في CDN قديم. وفي الانترفيو: «ليه SW الجديد مش بيتفعّل؟» الإجابة waiting، والحل skipWaiting بموافقة اليوزر أو قفل كل التابات.`
          },
          lines: [
            "سجّل الـ SW لو المتصفح بيدعمه.",
            "اسم الكاش: غيّره مع كل release.",
            "الملفات الأساسية اللي تتحفظ من الأول.",
            R`[[install]]: أول مرة أو نسخة جديدة.`,
            R`[[waitUntil]]: الـ install مخلصش لحد ما كل الملفات تتحفظ.`,
            "قفلة.",
            R`[[activate]]: القديم مشي والجديد استلم.`,
            "دالة async جوه waitUntil.",
            "كل الكاشات الموجودة.",
            "امسح أي كاش غير الحالي.",
            R`[[clients.claim]]: امسك الصفحات المفتوحة دلوقتي.`,
            "قفلة.",
            "قفلة.",
            "رسالة من الصفحة.",
            R`[[skipWaiting]]: متستناش، اتفعّل دلوقتي (بعد ما اليوزر يوافق).`,
            "قفلة."
          ],
          sol: R`بعد تغيير [[CACHE]] وأول refresh: DevTools بيعرض SW جديد «waiting to activate» والقديم لسه «activated and is running». الـ refresh التاني غالبًا مش هيفعّله، لأن التاب نفسه client بالقديم. لازم تقفل كل التابات أو تدوس skipWaiting. بعدها الـ activate بيشتغل، و Cache storage فيه [["app-v3"]] بس.

في [[sw.js]] بتاع الموقع ده: [[await self.skipWaiting()]] في آخر الـ install، و [[self.clients.claim()]] في آخر الـ activate بعد ما يمسح أي كاش غير [[CACHE]]. يعني مفيش waiting خالص، ودا آمن هنا لأن استراتيجيته network-first.`
        },
        {
          cmd: "استراتيجيات الكاش",
          title: "ترد من الكاش ولا من الشبكة؟ (network-first و cache-first و stale-while-revalidate)",
          desc: R`في [[fetch]] event بتاع الـ SW بتقرر لكل request:

network-first: جرّب الشبكة، ولو فشلت رد من الكاش. للـ HTML (الصفحات): اليوزر يشوف الأحدث دايمًا، ومن غير نت يشوف آخر نسخة. ده اللي الموقع ده بيعمله لكل حاجة.

cache-first: لو في الكاش رد منه ومتسألش الشبكة. للـ assets اللي في اسمها hash ([[app.3f9a1c.js]]): المحتوى عمره ما هيتغير لنفس الاسم، فمفيش سبب تسأل.

stale-while-revalidate: رد من الكاش فورًا (سريع)، وفي نفس الوقت هات من الشبكة وحدّث الكاش للمرة الجاية. لحاجات تتحمل تكون قديمة شوية: أفاتارات، وخطوط، و API مش حساس.

ومن غير نت وصفحة مش في الكاش: رد بـ [[offline.html]] اللي حفظته في الـ install.`,
          example: R`self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== self.location.origin) return;
  if (req.mode === "navigate") return e.respondWith(networkFirst(req));
  if (url.pathname.startsWith("/assets/")) return e.respondWith(cacheFirst(req));
  if (url.pathname.startsWith("/api/public/")) return e.respondWith(staleWhileRevalidate(req, e));
});
async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  try {
    const res = await fetch(req);
    if (res.ok) cache.put(req, res.clone());
    return res;
  } catch {
    return (await cache.match(req)) ?? (await cache.match("/offline.html"));
  }
}
async function cacheFirst(req) {
  const hit = await caches.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok) (await caches.open(CACHE)).put(req, res.clone());
  return res;
}
async function staleWhileRevalidate(req, e) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(req);
  const fresh = fetch(req).then((res) => {
    if (res.ok) cache.put(req, res.clone());
    return res;
  });
  e.waitUntil(fresh.catch(() => {}));
  return hit ?? fresh;
}`,
          try: R`كمّل على مشروع الدرس اللي فات: ضيف الكود ده في [[sw.js]]، واعمل [[offline.html]]. اعمل Offline من DevTools ← Network، وافتح صفحة زرتها قبل كده وصفحة مزرتهاش. وبعدين بص على عمود Size في Network: الـ requests اللي جاية من الـ SW مكتوب جنبها إيه؟ وآخر حاجة: ليه الـ API الخاص بكل يوزر ([[/api/me]]) مش في أي استراتيجية؟`,
          flag: "script",
          deep: {
            why: "الاستراتيجية الغلط بتعمل واحد من اتنين: موقع بطيء (network-first لملفات مش بتتغير) أو موقع عالق على نسخة قديمة (cache-first للـ HTML). الـ bug الشهير «عملت deploy واليوزرز لسه شايفين القديم بعد أسبوع» غالبًا cache-first على [[index.html]].",
            how: R`[[req.mode === "navigate"]] معناها request لصفحة (كتبت URL أو ضغطت لينك)، وده الـ HTML. [[e.respondWith(promise)]] بيقول للمتصفح «أنا هرد»، ولو مناديتهاش ([[return]] من غير حاجة) الـ request بيروح للشبكة عادي كأن مفيش SW.

[[res.clone()]]: الـ Response body stream بيتقري مرة واحدة، فبتعمل نسخة للكاش ونسخة للصفحة. و [[res.ok]] قبل الحفظ عشان متكاشش صفحة 500 أو 404.

في SWR: [[hit ?? fresh]] يعني لو في الكاش رد بيه فورًا، وإلا استنى الشبكة. و [[e.waitUntil(fresh)]] بيخلي الـ SW يفضل صاحي لحد ما التحديث يخلص حتى بعد ما رديت (المتصفح ممكن يوقف الـ SW لو فاضي). و [[catch]] هناك عشان فشل التحديث في الخلفية ميطلعش error ملوش لازمة.

الـ requests اللي من origin تاني (CDN أو API خارجي) بنتجاهلها هنا. الموقع ده بيستثني Google Fonts بس، وردها «opaque» (مش مقروء بسبب CORS)، فمينفعش تعرف هو ok ولا لأ.

وفي HTTP headers نفسها (درس «ETag و Cache-Control» في تاب APIs متقدمة): الـ assets بـ hash [[Cache-Control: max-age=31536000, immutable]]، والـ HTML [[no-cache]]. الـ SW بيشتغل فوق ده مش بداله.`,
            when: R`HTML: network-first. JS/CSS/خطوط بـ hash: cache-first. صور وأفاتارات و API عام: SWR. وأي حاجة خاصة باليوزر (حسابه، سلته) أو POST: متكاشهاش في الـ SW خالص، أو بحذر شديد.`,
            mistakes: R`cache-first للـ HTML. وكاش لـ responses فيها بيانات يوزر، فيعمل logout ويدخل يوزر تاني على نفس الجهاز ويشوف بيانات الأول. وتحفظ 500 في الكاش. وتنسى تمسح الكاشات القديمة فالتخزين يتملي. و [[respondWith]] جوه [[await]] (لازم تتنادى sync في الـ event، ابعتلها promise).`
          },
          lines: [
            "كل request من الصفحات اللي تحت الـ scope.",
            "الـ request.",
            "الـ URL كـ object عشان نقرا pathname و origin.",
            "POST أو origin تاني: سيبه للشبكة عادي.",
            R`صفحة (HTML): network-first.`,
            R`ملفات بـ hash تحت [[/assets/]]: cache-first.`,
            "API عام: stale-while-revalidate.",
            "قفلة.",
            "network-first.",
            "الكاش بتاعنا.",
            "جرّب الشبكة.",
            "هات من الشبكة.",
            R`احفظ نسخة لو الرد سليم. [[clone]] لأن الـ body بيتقري مرة.`,
            "رجّع الرد للصفحة.",
            "مفيش نت.",
            R`من الكاش، ولو مش موجودة [[offline.html]].`,
            "قفلة.",
            "قفلة.",
            "cache-first.",
            "دوّر في كل الكاشات.",
            "موجود: رد فورًا من غير شبكة.",
            "مش موجود: هاته.",
            "واحفظه للمرة الجاية.",
            "ورجّعه.",
            "قفلة.",
            "stale-while-revalidate.",
            "الكاش.",
            "القديم (لو فيه).",
            "في نفس الوقت: هات الجديد.",
            "وحدّث الكاش.",
            "ورجّع الجديد (لو مكانش فيه قديم).",
            "قفلة.",
            R`خلي الـ SW صاحي لحد ما التحديث يخلص، وتجاهل فشله.`,
            "القديم فورًا لو موجود، وإلا استنى الجديد.",
            "قفلة."
          ],
          sol: R`Offline: الصفحة اللي زرتها قبل كده بتفتح من الكاش (network-first فشل فرجع للكاش)، واللي مزرتهاش بيظهر مكانها [[offline.html]]. ولو مظهرتش ولا دي ولا دي، غالبًا [[offline.html]] مش في [[PRECACHE]] أو الـ install فشل.

في Network عمود Size بيقول «(ServiceWorker)» للـ requests اللي الـ SW رد عليها، وفي Chrome كمان بيظهر request تاني بترس ⚙ للـ fetch اللي الـ SW نفسه عمله للشبكة.

[[/api/me]] مش متكاش بقصد: بيانات خاصة، ولو اتحفظت في Cache Storage هتفضل موجودة بعد الـ logout ويشوفها أي حد يفتح الجهاز. ولو محتاجها offline، خزّنها في IndexedDB وامسحها في الـ logout.`
        },
        {
          cmd: "نسخة جديدة، حدّث",
          title: "تعمل زرار «فيه نسخة جديدة، حدّث» إزاي؟",
          desc: R`بدل skipWaiting أوتوماتيك (يكسر الصفحات المفتوحة) أو الاستنى لحد ما اليوزر يقفل كل التابات (ممكن أيام): اسأله. الصفحة تعرف إن فيه SW جديد في حالة waiting، فتظهر شريط «فيه نسخة جديدة» وزرار. لما يضغط، الصفحة تبعت للـ SW رسالة [["SKIP_WAITING"]] (الـ listener اللي عملناه في درس دورة الحياة)، والـ SW يتفعّل، والصفحة تسمع [[controllerchange]] وتعمل reload مرة واحدة.

الحالتين اللي لازم تمسكهم: SW جديد بيتسطّب دلوقتي ([[updatefound]] ثم [[statechange]] لـ [["installed"]])، و SW كان مستني من قبل ما الصفحة تفتح ([[reg.waiting]] موجود من الأول).`,
          example: R`// في app.js (type="module" عشان top-level await)
const reg = await navigator.serviceWorker.register("/sw.js");
const bar = document.querySelector("#update-bar");
function showUpdate(worker) {
  bar.hidden = false;
  bar.querySelector("button").onclick = () => worker.postMessage("SKIP_WAITING");
}
if (reg.waiting && navigator.serviceWorker.controller) showUpdate(reg.waiting);
reg.addEventListener("updatefound", () => {
  const next = reg.installing;
  next.addEventListener("statechange", () => {
    if (next.state === "installed" && navigator.serviceWorker.controller) showUpdate(next);
  });
});
let reloading = false;
navigator.serviceWorker.addEventListener("controllerchange", () => {
  if (reloading) return;
  reloading = true;
  location.reload();
});
setInterval(() => reg.update(), 60 * 60 * 1000);`,
          try: R`ضيف [[<div id="update-bar" hidden>فيه نسخة جديدة <button>حدّث</button></div>]] في الصفحة، وشيل [[skipWaiting()]] من الـ install لو موجودة (خليها في الـ message بس). غيّر [[CACHE]] في sw.js، واعمل refresh: الشريط ظهر؟ اضغط «حدّث». وبعدين افتح الموقع في تابين وحدّث من واحد: التاني عمل إيه؟`,
          flag: "script",
          deep: {
            why: "ده الحل المتوازن لمشكلة waiting: اليوزر بياخد التحديث بسرعة، ومفيش صفحة بتتكسر في النص، ومفيش reload فجأة وهو بيكتب. وكل مكتبات الـ PWA (vite-plugin-pwa و Workbox و Serwist) بتقدّم نفس الـ pattern جاهز.",
            how: R`[[navigator.serviceWorker.controller]] بيبقى null في أول زيارة خالص (مفيش SW بيتحكم لسه). من غيره، أول تسطيب هيطلّع «نسخة جديدة» وده غلط: دي أول نسخة.

[[updatefound]] بيتنادى لما المتصفح يلاقي sw.js اتغير ويبدأ يسطّبه، و [[reg.installing]] هو الـ worker الجديد. لما حالته تبقى [["installed"]] وفيه controller قديم، يبقى هو في waiting.

لما اليوزر يضغط: [[postMessage("SKIP_WAITING")]] ← الـ SW الجديد ينادي [[skipWaiting()]] ← activate ← (و [[clients.claim()]] لو موجودة) ← كل التابات المفتوحة تاخد [[controllerchange]] ← reload. عشان كده التاب التاني بيعمل reload هو كمان. الـ [[reloading]] flag بيمنع reload مرتين (في DevTools مع «Update on reload» ممكن يحصل loop).

[[reg.update()]] كل ساعة للتطبيقات اللي بتفضل مفتوحة أيام (dashboard على شاشة)، لأن الفحص التلقائي بيحصل مع التنقل بس.

صفحة الـ offline: [[offline.html]] في الـ PRECACHE، ترد بيها في network-first لما الـ fetch يفشل ومفيش نسخة (الدرس اللي فات). خليها صفحة لوحدها بـ CSS inline ومن غير JS خارجي، عشان مش هتلاقي حاجة تانية من غير نت.`,
            when: R`أي PWA بـ cache-first لملفات الـ JS. و autoUpdate (skipWaiting دايمًا) بس لو الموقع network-first أو static بسيط (زي الموقع ده).`,
            mistakes: R`تنسى فحص controller فيظهر الشريط أول زيارة. وتنسى [[reg.waiting]] عند فتح الصفحة فاللي فتح بعد ما التحديث اتسطب مش هيشوف الشريط. و reload في controllerchange من غير flag. و reload وهو في نص فورم: احفظ المسودة الأول أو خلي الزرار هو اللي يبدأ الـ reload بس.`
          },
          lines: [
            R`سجّل واستنى الـ registration (محتاج module لـ await برّه دالة).`,
            "الشريط.",
            "دالة تعرض الشريط.",
            "أظهره.",
            R`الزرار: قول للـ SW الجديد يعمل skipWaiting.`,
            "قفلة.",
            R`كان فيه SW مستني قبل ما الصفحة تفتح، ومش أول زيارة.`,
            "المتصفح لقى sw.js جديد وبدأ يسطّبه.",
            "الـ worker الجديد.",
            "تابع حالته.",
            R`خلص install وفيه قديم شغال: يبقى waiting. اعرض الشريط.`,
            "قفلة.",
            "قفلة.",
            "عشان reload مرة واحدة بس.",
            "الـ SW اللي بيتحكم في الصفحة اتغير.",
            "عملنا reload خلاص: متعملش تاني.",
            "علّم.",
            "حمّل الصفحة بالنسخة الجديدة.",
            "قفلة.",
            "افحص تحديثات كل ساعة للصفحات اللي بتفضل مفتوحة."
          ],
          sol: R`بعد تغيير [[CACHE]] والـ refresh: الـ SW الجديد بيتسطّب ويقف في waiting، فالشريط بيظهر. الضغط على «حدّث» بيعمل reload واحد، والصفحة بقت تحت الـ SW الجديد (Application ← Service workers بيعرض واحد بس activated).

في التابين: التاني بيعمل reload لوحده في نفس اللحظة، لأن الـ SW واحد لكل الـ origin، ولما اتغير كل التابات خدت [[controllerchange]]. ده غالبًا اللي انت عايزه (مفيش تاب شغال بنسخة قديمة مع SW جديد)، بس لو فيه تاب فيه فورم نصه مكتوب، احفظ المسودة قبل الـ reload (درس visibilitychange).

ولو الشريط ظهر في أول زيارة خالص: نسيت شرط [[navigator.serviceWorker.controller]].`
        },
        {
          cmd: "vite-plugin-pwa و Serwist",
          title: "تعمل PWA في مشروع Vite أو Next.js من غير ما تكتب SW بإيدك",
          desc: R`كتابة SW بإيدك مفيدة عشان تفهم، بس في المشاريع الحقيقية فيه مشكلة: الـ build بيطلّع ملفات بأسماء فيها hashes بتتغير كل مرة، ولازم قايمة الـ precache تبقى مظبوطة. الأدوات بتعمل ده لوحدها: بتولّد القايمة من الـ build وبتحطها في الـ SW، وبتدّيك الاستراتيجيات والـ update prompt جاهزين. الاتنين مبنيين على أفكار Workbox بتاعة Google.

Vite (React أو Vue أو أي حاجة): [[vite-plugin-pwa]]. بتضيف [[VitePWA({...})]] في [[vite.config]] بالـ manifest، و [[registerType: "prompt"]] للزرار أو [[autoUpdate]]، وفي الكود [[registerSW]] من [[virtual:pwa-register]] (أو [[useRegisterSW]] من [[virtual:pwa-register/react]]).

Next.js: [[Serwist]] (fork من Workbox بيتطور). بتكتب [[app/sw.ts]] صغير بـ [[new Serwist({...})]]، وبتلف الـ config بـ [[withSerwistInit]] من [[@serwist/next]]. ولـ Turbopack فيه [[@serwist/turbopack]] بطريقة setup مختلفة شوية (route handler)، فبص على الـ docs بتاعة النسخة اللي عندك.`,
          example: R`// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      includeAssets: ["favicon.svg", "apple-touch-icon.png"],
      manifest: {
        name: "مهامي", short_name: "مهامي", lang: "ar", dir: "rtl", theme_color: "#1f2430",
        icons: [
          { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
        ],
      },
      workbox: { globPatterns: ["**/*.{js,css,html,svg,png,woff2}"] },
    }),
  ],
});
// src/pwa.ts
import { registerSW } from "virtual:pwa-register";
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("فيه نسخة جديدة، تحدّث؟")) updateSW(true);
  },
  onOfflineReady() {
    console.log("الموقع جاهز يشتغل من غير نت");
  },
});`,
          try: R`اعمل [[npm create vite@latest pwa-lab -- --template react-ts]]، و [[npm i -D vite-plugin-pwa]]، وحط الـ config ده، و [[import "./pwa"]] في [[main.tsx]]. اعمل [[npm run build]] و [[npm run preview]] (الـ SW مش بيشتغل في [[dev]] افتراضيًا). بص على [[dist/sw.js]]: فيه أسماء ملفاتك؟ غيّر أي نص في App، واعمل build و preview تاني، واعمل refresh: الـ confirm ظهر؟`,
          flag: "script",
          deep: {
            why: "الـ SW بإيدك مع build tool حديث معناه إنك لازم كل مرة تعرف أسماء الملفات الجديدة وتحدّث القايمة وتتأكد إن مفيش حاجة ناقصة. غلطة واحدة = install بيفشل أو يوزرز عالقين. الأدوات دي بتشيل ده، وبتسيبلك انت القرارات: prompt ولا auto، وإيه اللي يتكاش.",
            how: R`vite-plugin-pwa بعد الـ build بيلف على [[dist/]] ويطابق [[globPatterns]]، ويعمل قايمة [[{ url, revision }]] (الـ revision hash للمحتوى)، ويولّد [[sw.js]] بـ Workbox فيه القايمة دي كـ precache. أي ملف اتغير = revision جديد = sw.js اتغير = تحديث. و [[registerType: "prompt"]] معناه الـ SW مش بيعمل skipWaiting لوحده، و [[onNeedRefresh]] بتتنادى لما يبقى فيه واحد waiting (نفس اللي عملناه بإيدنا في الدرس اللي فات)، و [[updateSW(true)]] بتبعت skipWaiting وتعمل reload.

و [[navigateFallback]] (افتراضيًا index.html في الـ SPA) بيخلي أي navigation من غير نت يرد بالـ index.html المتكاش، فالراوتر بتاعك يكمّل. وفيه وضع [[injectManifest]] لو عايز تكتب الـ SW بنفسك وهو يحقن القايمة بس.

Serwist في Next: [[self.__SW_MANIFEST]] بيتبدّل وقت الـ build بقايمة الـ precache، و [[defaultCache]] فيه استراتيجيات معقولة لكل نوع (صفحات، RSC payloads، صور، خطوط)، و [[fallbacks]] لصفحة offline ([[/~offline]] في الـ docs). وفي Next الـ HTML ممكن يكون ديناميك، فخلي بالك إيه اللي بيتكاش.

والأيقونات: [[@vite-pwa/assets-generator]] بيولّد كل المقاسات (ومنها maskable و apple-touch-icon) من SVG واحد.`,
            when: R`أي مشروع Vite أو Next عايزه PWA. الـ SW بإيدك لمواقع static صغيرة من غير build (زي الموقع ده)، أو لما تحتاج تحكم كامل (وقتها injectManifest).`,
            mistakes: R`تجرّب في [[npm run dev]] وتستغرب إن مفيش SW (فعّل [[devOptions: { enabled: true }]] لو محتاج). و [[autoUpdate]] مع تطبيق فيه فورمز طويلة. و globPatterns بتاخد ملفات ضخمة (فيديو، source maps) فالـ install ياخد ميجات. وتنسى إن النسخة القديمة من Workbox في الـ SW القديم لسه شغالة عند اليوزرز لحد ما يتحدثوا.`
          },
          lines: [
            "defineConfig بتاع Vite.",
            "plugin الـ React.",
            "plugin الـ PWA.",
            "الـ config.",
            "الـ plugins.",
            "React.",
            "الـ PWA.",
            R`[[prompt]]: متحدّثش لوحدك، اسأل اليوزر.`,
            R`ملفات من [[public/]] تتحفظ كمان.`,
            "الـ manifest بيتولّد منه.",
            "الأسماء والاتجاه واللون.",
            "الأيقونات.",
            "192.",
            "512.",
            "قفلة.",
            "قفلة الـ manifest.",
            "أنواع الملفات اللي تدخل الـ precache.",
            "قفلة.",
            "قفلة.",
            "قفلة.",
            R`module افتراضي بيولّده الـ plugin (مش ملف عندك).`,
            "سجّل الـ SW.",
            "فيه نسخة جديدة مستنية (waiting).",
            R`[[updateSW(true)]]: skipWaiting + reload. (في تطبيق حقيقي شريط مش confirm.)`,
            "قفلة.",
            "أول تسطيب خلص.",
            "الموقع بقى يشتغل offline.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`[[dist/sw.js]] (أو ملف workbox جنبه) فيه قايمة زي [[{url:"assets/index-B3k9.js",revision:null}]] و [[{url:"index.html",revision:"a1b2..."}]]. الملفات اللي في اسمها hash الـ revision بتاعها null (الاسم نفسه كفاية)، والباقي ليه hash.

بعد تغيير النص و build و preview والـ refresh: الـ confirm «فيه نسخة جديدة» بيظهر. لو ضغطت OK بيعمل reload بالنسخة الجديدة. لو Cancel، الصفحة تفضل بالقديم لحد ما تقفل كل التابات.

لو مظهرش: اتأكد إنك في [[preview]] مش [[dev]]، وإن [[import "./pwa"]] موجود، وإنك مش فاتح DevTools بـ «Update on reload» (دي بتعمل skipWaiting لوحدها فمتشوفش الـ prompt).`
        },
        {
          cmd: "IndexedDB و BroadcastChannel",
          title: "تخزّن داتا كتير في المتصفح وتزامن التابات إزاي؟ (وحدود iOS)",
          desc: R`[[localStorage]] strings بس، و sync (بيوقف الصفحة)، وحوالي 5MB، ومش متاح جوه الـ SW. للداتا الحقيقية offline (مسودات، رسايل، طلبات مستنية النت) فيه IndexedDB: داتابيز جوه المتصفح، بتخزّن objects و Blobs، و async، وبـ indexes، ومساحته بالـ GB حسب الجهاز. بس الـ API الأصلي قديم ومبني على events ومتعب.

عشان كده بتستخدم wrapper: [[idb]] (صغيرة، نفس الـ API بس بـ promises) أو [[Dexie]] (أكبر، فيها queries و live queries لـ React).

و [[BroadcastChannel]]: قناة رسايل بين كل التابات (والـ workers) اللي على نفس الـ origin. لما تاب يغيّر حاجة، يقول للباقي «حدّثوا».`,
          example: R`import { openDB } from "idb";
const db = await openDB("notes-app", 1, {
  upgrade(db) {
    const store = db.createObjectStore("notes", { keyPath: "id" });
    store.createIndex("byUpdated", "updatedAt");
  },
});
async function addNote(text) {
  await db.put("notes", { id: crypto.randomUUID(), text, updatedAt: Date.now() });
  channel.postMessage({ type: "notes-changed" });
}
const channel = new BroadcastChannel("notes");
channel.onmessage = async (e) => {
  if (e.data.type === "notes-changed") render(await db.getAllFromIndex("notes", "byUpdated"));
};
function render(notes) {
  console.log(notes.map((n) => n.text));
}
await addNote("اشتري لبن");
render(await db.getAllFromIndex("notes", "byUpdated"));
if (navigator.storage?.persist) console.log("persisted:", await navigator.storage.persist());`,
          try: R`اعمل صفحة بـ Vite (عشان الـ import) فيها input وزرار «ضيف»، وافتح الصفحة في تابين. ضيف ملاحظة في واحد: التاني اتحدّث؟ الملاحظة ظهرت في التاب اللي ضافها؟ وبعدين DevTools ← Application ← IndexedDB وشوف الداتا. وجرّب في Console [[await navigator.storage.estimate()]].`,
          flag: "script",
          deep: {
            why: "PWA بيشتغل offline محتاج مكان يحفظ فيه اللي اليوزر عمله لحد ما النت يرجع. ولما اليوزر فاتح التطبيق في تابين، من غير مزامنة واحد فيهم هيعرض داتا قديمة ولو حفظ منه هيمسح تعديلات التاني.",
            how: R`[[openDB(name, version, { upgrade })]]: الـ upgrade بيتنادى بس لما الـ version يزيد (أو أول مرة)، وهو المكان الوحيد اللي تعمل فيه object stores و indexes، زي migrations. عايز تضيف index؟ زوّد الـ version وضيفه في upgrade. [[keyPath: "id"]] يعني المفتاح جوه الـ object نفسه، و [[put]] بتضيف أو تستبدل. و [[getAllFromIndex]] بترجّع مترتبة حسب الـ index. كل عملية جوه transaction؛ idb بتفتحها وتقفلها لك.

بالـ Dexie نفس الكلام: [[db.version(1).stores({ notes: "id, updatedAt" })]] و [[db.notes.orderBy("updatedAt").toArray()]]، و [[useLiveQuery]] في React بتحدّث الـ component لوحدها لما الداتا تتغير (حتى من تاب تاني).

BroadcastChannel بيوصّل الرسالة لكل الـ instances بنفس الاسم ما عدا اللي بعت. عشان كده التاب اللي ضاف لازم يعمل render بنفسه. الرسالة بتتنسخ (structured clone) فمينفعش تبعت دوال.

المساحة: المتصفح ممكن يمسح داتا الموقع لو المساحة قلت (best-effort). [[navigator.storage.persist()]] بيطلب إنه ميتمسحش (Chrome بيوافق غالبًا للمواقع المسطّبة أو اللي اليوزر بيستخدمها كتير، و Firefox ممكن يسأل اليوزر).

حدود iOS/Safari: كل المتصفحات على iPhone بتستخدم WebKit (مع استثناءات في أوروبا). Safari بيمسح كل التخزين اللي بيكتبه JS (IndexedDB و localStorage و Cache Storage) للموقع اللي اليوزر مفتحهوش ٧ أيام، إلا لو الموقع متسطّب على الشاشة الرئيسية. مفيش [[beforeinstallprompt]]. والـ push notifications شغالة بس للـ PWA المتسطّب (من iOS 16.4). و Background Sync مش مدعوم. فمتعتمدش على التخزين المحلي كمصدر وحيد للداتا: السيرفر هو المصدر، والمحلي كاش ومسودات.`,
            when: R`IndexedDB: مسودات، وداتا offline، و queue لطلبات مستنية النت، وملفات كبيرة (Blobs). localStorage: إعدادات صغيرة (theme، آخر تاب). BroadcastChannel: logout في كل التابات، ومزامنة سلة أو إشعارات. وفي الـ SW: IndexedDB بس (localStorage مش موجود هناك).`,
            mistakes: R`localStorage لداتا كبيرة أو objects ([[JSON.stringify]] كل مرة ويوقف الصفحة). وتغيّر الـ schema من غير ما تزوّد الـ version. وتنسى إن الداتا خاصة بالجهاز والمتصفح (مش sync بين الأجهزة). وتخزّن tokens حساسة في IndexedDB وتفتكره آمن من XSS (أي JS على الصفحة يقراه). وتعتمد على التخزين المحلي على iPhone لداتا مهمة.`
          },
          lines: [
            R`[[idb]]: wrapper بالـ promises.`,
            "افتح (أو اعمل) الداتابيز، version 1.",
            R`[[upgrade]]: أول مرة أو version أعلى، زي migration.`,
            R`store اسمه notes، والمفتاح [[id]] جوه الـ object.`,
            "index عشان نرتّب بالتاريخ.",
            "قفلة.",
            "قفلة.",
            "ضيف ملاحظة.",
            R`[[put]]: ضيف أو استبدل.`,
            "قول للتابات التانية.",
            "قفلة.",
            "قناة باسم notes على نفس الـ origin.",
            "رسالة من تاب تاني.",
            "اقرا من جديد وارسم.",
            "قفلة.",
            "الرسم (هنا console بس).",
            "اطبع النصوص.",
            "قفلة.",
            "ضيف.",
            R`التاب اللي بعت مبيستلمش رسالته، فارسم بنفسك.`,
            "اطلب إن الداتا متتمسحش لما المساحة تقل."
          ],
          sol: R`التاب التاني بيتحدّث فورًا ويعرض الملاحظة الجديدة. التاب اللي ضاف مش بيستلم رسالته، فلو معملتش render فيه بعد الإضافة مش هتظهر فيه لحد الـ refresh. ده أكتر حاجة بتلخبط في BroadcastChannel.

في Application ← IndexedDB ← notes-app ← notes هتلاقي الـ objects بالـ id و text و updatedAt، وتحت الـ store الـ index [[byUpdated]].

[[estimate()]] بترجّع [[{ quota, usage }]] بالبايت. الـ quota غالبًا بالـ GB (نسبة من مساحة الديسك الفاضية)، والـ usage اللي موقعك مستخدمه فعلًا (IndexedDB و Cache Storage مع بعض).`,
          solCode: R`import "fake-indexeddb/auto";
import { openDB } from "idb";
const db = await openDB("notes-app", 1, {
  upgrade(db) {
    db.createObjectStore("notes", { keyPath: "id" }).createIndex("byUpdated", "updatedAt");
  },
});
const tabA = new BroadcastChannel("notes");
const tabB = new BroadcastChannel("notes");
tabA.onmessage = () => console.log("A استلم (مش المفروض يحصل)");
tabB.onmessage = async () => {
  console.log("B:", (await db.getAllFromIndex("notes", "byUpdated")).map((n) => n.text));
  tabA.close();
  tabB.close();
};
await db.put("notes", { id: crypto.randomUUID(), text: "اشتري لبن", updatedAt: Date.now() });
tabA.postMessage({ type: "notes-changed" });`
        }
      ]
    },
    {
      t: "أسئلة انترفيو",
      l: 3,
      n: "الأسئلة اللي بتتكرر في انترفيوهات JavaScript: إجابات تقولها بصوتك، وكود تكتبه على السبورة",
      items: [
        {
          cmd: "null و undefined",
          title: "إيه الفرق بين null و undefined؟ (null vs undefined)",
          desc: R`الاتنين معناهم «مفيش قيمة»، والفرق مين اللي قال كده. [[undefined]] بتحطها JS لوحدها: متغير من غير قيمة، أو خاصية مش موجودة، أو argument متبعتش، أو دالة من غير return. [[null]] بيحطها المبرمج بقصد عشان يقول «فاضي». [[typeof null]] بيطلع "object" كغلطة تاريخية، و [[null == undefined]] true لكن بـ === لأ. في JSON الـ undefined بتختفي والـ null بتفضل، والـ default parameters بتشتغل مع undefined بس.`,
          example: R`let a;
const obj = {};
function f(x) { return x; }
a;                                // undefined: متعرّف من غير قيمة
obj.missing;                      // undefined: خاصية مش موجودة
f();                              // undefined: argument متبعتش
const user = { middleName: null }; // null: قلت «مفيش» بقصد
typeof null;                      // "object"
null == undefined;                // true
null === undefined;               // false
JSON.stringify({ a: undefined, b: null }); // '{"b":null}'`,
          try: R`اكتب [[isNil(v)]] بترجّع true لـ null و undefined بس، بطريقتين: [[v == null]] و [[v === null || v === undefined]].`,
          flag: "script",
          deep: {
            why: "سؤال افتتاحي في انترفيوهات كتير، بيختبر إنك فاهم إن القيمتين ليهم استخدامات مختلفة مش مجرد حاجة واحدة باسمين.",
            how: R`نقط تقولها لو اتسألت أكتر: [[??]] و [[?.]] بيعاملوا الاتنين زي بعض. و [[Number(null)]] بـ 0 و [[Number(undefined)]] بـ NaN. وفي APIs كتير null معناها «اتمسحت» (PATCH بـ null بيفضّي الحقل) و undefined معناها «متلمستش». وقواعد البيانات فيها NULL بس مفيهاش undefined، و Prisma بيفرّق بينهم بنفس المعنى ده.`,
            when: "«إمتى تستخدم null بنفسك؟» (لما تقصد تفضّي قيمة)، و «typeof null؟»، و «إزاي تفحص الاتنين مرة واحدة؟» (== null أو ??).",
            mistakes: R`«الاتنين زي بعض». و «undefined يعني المتغير مش متعرّف» (ده ReferenceError، حاجة تانية). وتحط undefined بإيدك كقيمة بدل null.`
          },
          lines: [
            "متغير من غير قيمة.",
            "object فاضي.",
            "دالة بترجّع الباراميتر.",
            "undefined.",
            "undefined.",
            "undefined.",
            "null بقصد.",
            "الغلطة التاريخية.",
            R`[[==]] بيساويهم.`,
            R`[[===]] لأ.`,
            "JSON بيشيل undefined ويسيب null."
          ],
          sol: R`الطريقتين بيرجّعوا true لـ null و undefined بس، و false لـ [[0]] و [[""]] و [[false]] و [[NaN]] و [[[]]]. ده الاستثناء الوحيد اللي [[==]] فيه مقبولة في الكود المحترف: [[v == null]] بتساوي null و undefined بس، ومش بتحوّل أي حاجة تانية. ESLint بيسمح بيها بإعداد [[eqeqeq: ["error", "always", { null: "ignore" }]]].

الغلطة الشائعة إنك تكتب [[!v]] بدالها: دي بترجّع true لـ 0 و "" كمان، فحقل قيمته 0 هيتعامل كأنه مش موجود. وفي الانترفيو قول الفرق في جملة: undefined يعني «لسه مفيش قيمة» (اللغة اللي حطّاها)، و null يعني «مفيش قيمة بقصد» (انت اللي حاططها).`,
          solCode: R`const isNil = (v) => v == null;
const isNilStrict = (v) => v === null || v === undefined;
for (const v of [null, undefined, 0, "", false, NaN, []]) {
  console.log(v, isNil(v), isNilStrict(v));
}
// null true true / undefined true true / والباقي false false`
        },
        {
          cmd: "Promise.all بإيدك",
          title: "اكتب Promise.all بنفسك (implement Promise.all)",
          desc: R`بترجّع Promise جديد. بلف على العناصر، وكل واحد بحوّله Promise بـ [[Promise.resolve]] (عشان القيم العادية تشتغل). لما واحد ينجح بحط قيمته في نفس الـ index مش بـ push، عشان الترتيب يفضل زي المدخلات مهما مين خلص الأول، وبعد عدّاد. لما العدّاد يوصل للطول أعمل resolve. وأول rejection أعمل reject على طول. والـ array الفاضية ترجع [[[]]] فورًا.`,
          example: R`function promiseAll(items) {
  return new Promise((resolve, reject) => {
    const list = Array.from(items);
    const results = new Array(list.length);
    let done = 0;
    if (list.length === 0) return resolve(results);
    list.forEach((item, i) => {
      Promise.resolve(item).then((value) => {
        results[i] = value;
        done++;
        if (done === list.length) resolve(results);
      }, reject);
    });
  });
}
const slow = new Promise((r) => setTimeout(() => r("slow"), 100));
promiseAll([slow, 2, Promise.resolve(3)]).then(console.log); // ["slow", 2, 3]`,
          try: R`اكتب [[promiseAllSettled]] بنفس الطريقة، وبعدين [[promiseRace]] (أسهل بكتير: كل واحد بيعمل resolve أو reject مباشرة). اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[promiseAllSettled]] و [[promiseRace]] (الاختبارات بـ promises جاهزة من غير timers).`,
          flag: "script",
          deep: {
            why: "بيختبر فهمك للـ Promises مش حفظ الـ API: الترتيب، والعدّاد، و fail-fast، والقيم اللي مش Promises، والحالة الفاضية.",
            how: R`نقط تقولها: [[results.push]] غلط لأن الترتيب هيبقى حسب مين خلص الأول. و [[results.length]] مينفعش كعدّاد لأن [[results[2] = x]] بتخلي الطول 3 وأول عنصرين لسه فاضيين. والـ reject بعد أول مرة ملهوش تأثير لأن الـ Promise مبيتغيرش بعد ما يخلص. والباقي مبيتلغيش. ومع Array.from بيقبل أي iterable زي الأصلي.`,
            when: "«اكتب allSettled»، و «اعمل concurrency limit: شغّل n بس في نفس الوقت» (السؤال الأصعب والأشهر للـ senior)، و «retry مع exponential backoff».",
            mistakes: R`push بدل index. ونسيان الـ array الفاضية (هتفضل pending للأبد). ونسيان [[Promise.resolve]] للقيم العادية.`
          },
          lines: [
            "الدالة بتاخد أي iterable.",
            "بترجّع Promise جديد.",
            "حوّلها array عشان نعرف الطول.",
            "مكان لكل نتيجة.",
            "عدّاد اللي خلصوا.",
            "مفيش حاجة: خلص فورًا.",
            "لكل عنصر.",
            R`[[Promise.resolve]] عشان القيم العادية تتعامل زي الـ Promises.`,
            "حط النتيجة في مكانها الأصلي.",
            "زوّد العدّاد.",
            "كلهم خلصوا: resolve بالنتايج.",
            "أول فشل: reject على طول.",
            "قفلة.",
            "قفلة.",
            "قفلة.",
            "Promise بطيء.",
            R`الترتيب زي المدخلات مع إن [[slow]] خلص الأخير.`
          ],
          sol: R`[[promiseAllSettled([slow, 2, Promise.reject(new Error("x"))])]] لازم ترجّع بعد 100ms: [[{ status: "fulfilled", value: "slow" }]] و [[{ status: "fulfilled", value: 2 }]] و [[{ status: "rejected", reason: Error: x }]] بنفس الترتيب، ومبتترفضش أبدًا. الفرق عن promiseAll إن الـ reject handler بيسجّل النتيجة بدل ما يرفض.

[[promiseRace]] بتلف على كل واحد وتعمل [[Promise.resolve(item).then(resolve, reject)]]: أول واحد يخلص بيحدد النتيجة، والباقي نداءاتهم على resolve أو reject بتتجاهل لأن الـ promise متحسمة. والحالة اللي بتتسأل: [[promiseRace([])]] بتفضل pending للأبد، زي [[Promise.race([])]] الحقيقية. والغلطة الشائعة إنك تنسى [[Promise.resolve(item)]] فالقيم العادية زي 2 تطلع [[item.then is not a function]].`,
          solCode: R`function promiseAllSettled(items) {
  return new Promise((resolve) => {
    const list = Array.from(items);
    const results = new Array(list.length);
    let done = 0;
    if (list.length === 0) return resolve(results);
    list.forEach((item, i) => {
      Promise.resolve(item)
        .then(
          (value) => { results[i] = { status: "fulfilled", value }; },
          (reason) => { results[i] = { status: "rejected", reason }; }
        )
        .then(() => { if (++done === list.length) resolve(results); });
    });
  });
}
function promiseRace(items) {
  return new Promise((resolve, reject) => {
    for (const item of items) Promise.resolve(item).then(resolve, reject);
  });
}
const slow = new Promise((r) => setTimeout(() => r("slow"), 100));
const fast = new Promise((r) => setTimeout(() => r("fast"), 10));
promiseAllSettled([slow, 2, Promise.reject(new Error("x"))]).then(console.log);
promiseRace([slow, fast]).then((v) => console.log("race:", v)); // race: fast`,
          check: {
            lang: "js",
            starter: R`function promiseAllSettled(items) {
  return Promise.all(items);
}
function promiseRace(items) {
  return new Promise((resolve, reject) => {
    // كل واحد: Promise.resolve(item).then(resolve, reject)
  });
}`,
            tests: R`const later = (v, steps = 5) => { let p = Promise.resolve(v); for (let i = 0; i < steps; i++) p = p.then(x => x); return p; };
const within = p => Promise.race([p, later("لسه pending", 60)]);
const rejected = msg => { const p = Promise.reject(new Error(msg)); p.catch(() => {}); return p; };
test("fulfilled و rejected وقيمة عادية، بنفس الترتيب ومبترفضش", async () => {
  const r = await within(promiseAllSettled([later("slow"), 2, rejected("x")]));
  expect([r[0], r[1], r[2].status, r[2].reason.message]).toEqual([{ status: "fulfilled", value: "slow" }, { status: "fulfilled", value: 2 }, "rejected", "x"]);
});
test("الترتيب حسب الـ input مش حسب مين خلص الأول", async () => {
  const r = await within(promiseAllSettled([later("a", 10), "b"]));
  expect(r.map(x => x.value)).toEqual(["a", "b"]);
});
test("[] ← []", async () => expect(await within(promiseAllSettled([]))).toEqual([]));
test("promiseRace: الأسرع يكسب", async () => expect(await within(promiseRace([later("slow", 10), later("fast", 1)]))).toBe("fast"));
test("promiseRace: لو الأسرع اترفض، بترفض", async () => {
  let msg = "";
  try { await within(promiseRace([later("slow", 10), rejected("fail")])); } catch (e) { msg = e.message; }
  expect(msg).toBe("fail");
});
test("promiseRace([]) بتفضل pending للأبد، زي Promise.race([])", async () => {
  const r = await Promise.race([promiseRace([]).then(() => "resolved"), later("still pending", 20)]);
  expect(r).toBe("still pending");
});`,
            solution: R`function promiseAllSettled(items) {
  return new Promise((resolve) => {
    const list = Array.from(items);
    const results = new Array(list.length);
    let done = 0;
    if (list.length === 0) return resolve(results);
    list.forEach((item, i) => {
      Promise.resolve(item)
        .then(
          (value) => { results[i] = { status: "fulfilled", value }; },
          (reason) => { results[i] = { status: "rejected", reason }; }
        )
        .then(() => { if (++done === list.length) resolve(results); });
    });
  });
}
function promiseRace(items) {
  return new Promise((resolve, reject) => {
    for (const item of items) Promise.resolve(item).then(resolve, reject);
  });
}`
          }
        },
        {
          cmd: "polyfills: map و bind",
          title: "اكتب map و bind بنفسك (polyfill)",
          desc: R`الـ polyfill كود بيعمل feature موجودة في اللغة، عشان يشتغل في بيئات قديمة، وفي الانترفيو عشان يشوفوا فاهم الـ feature من جوه. [[map]]: بلف على [[this]] (الـ array)، وبنادي الـ callback بـ (العنصر، الـ index، الـ array)، وبحط الناتج في array جديدة بنفس الطول، وبتخطى الأماكن الفاضية (holes). [[bind]]: بحفظ الدالة الأصلية ([[this]])، وبرجّع دالة جديدة بتناديها بـ [[apply]] على الـ context اللي اتحدد، مع الـ arguments المتثبتة الأول والجديدة بعدها.`,
          example: R`Array.prototype.myMap = function (callback, thisArg) {
  if (typeof callback !== "function") throw new TypeError(callback + " is not a function");
  const result = new Array(this.length);
  for (let i = 0; i < this.length; i++) {
    if (i in this) result[i] = callback.call(thisArg, this[i], i, this);
  }
  return result;
};
Function.prototype.myBind = function (ctx, ...preset) {
  const fn = this;
  return function (...args) {
    return fn.apply(ctx, [...preset, ...args]);
  };
};
[1, 2, 3].myMap((x) => x * 2);                    // [2, 4, 6]
const hi = function (greet) { return greet + " " + this.name; };
hi.myBind({ name: "Sara" }, "Hi")();              // "Hi Sara"`,
          try: R`اكتب [[myFilter]] و [[myReduce]] (خد بالك من حالة من غير قيمة أولية على array فاضية: لازم TypeError). وبعدين خلي [[myBind]] تشتغل مع [[new]]. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[myFilter]] و [[myReduce]] و [[myBind]] اللي بتشتغل مع [[new]].`,
          flag: "script",
          deep: {
            why: "بيختبر this، و prototypes، و call و apply، والـ closures في سؤال واحد. و map و reduce و bind و debounce و Promise.all هم أشهر ٥ polyfills بتتسأل.",
            how: R`نقط تقولها: [[function]] مش arrow عشان this تبقى الـ array أو الدالة. و [[i in this]] عشان الـ sparse arrays ([[[1, , 3]]]): الـ map الأصلية بتسيب الـ holes فاضية. و thisArg التاني لـ map. والـ bind الحقيقية لما تتنادي بـ new بتتجاهل ctx، والنسخة الكاملة بتفحص [[new.target]]. وقول إنك في كود حقيقي مش هتعدّل الـ prototypes المدمجة، ده للانترفيو بس.`,
            when: "«اكتب reduce»، و «اكتب call من غير call» (حط الدالة كخاصية مؤقتة على الـ object ونادي)، و «اكتب flat بـ recursion».",
            mistakes: R`arrow function للـ polyfill فـ this تضيع. ونسيان الـ index والـ array في الـ callback. وتعدّل الـ prototype في كود إنتاج.`
          },
          lines: [
            R`method جديدة على كل الـ arrays، بـ function عشان [[this]] تبقى الـ array.`,
            "افحص إن الـ callback دالة زي الأصلية.",
            "array جديدة بنفس الطول.",
            "لف على العناصر.",
            R`اتخطى الأماكن الفاضية، ونادي بالـ 3 arguments و thisArg.`,
            "قفلة.",
            "رجّع الجديدة.",
            "قفلة.",
            "method جديدة على كل الدوال.",
            R`[[this]] هنا الدالة اللي اتعملها bind.`,
            "رجّع دالة جديدة.",
            "نادي الأصلية بالـ context والـ arguments المتثبتة الأول.",
            "قفلة.",
            "قفلة.",
            "جرّب map.",
            R`دالة بتستخدم [[this]].`,
            "جرّب bind."
          ],
          sol: R`[[[1, 2, 3, 4].myFilter((x) => x % 2 === 0)]] بترجّع [[[2, 4]]]، و [[[1, 2, 3].myReduce((a, b) => a + b)]] بـ 6، و [[[].myReduce((a, b) => a + b)]] بترمي [[TypeError: Reduce of empty array with no initial value]] زي الأصلية بالظبط. عشان تفرّق بين «مفيش قيمة أولية» و «القيمة الأولية undefined» استخدم rest [[...init]] وافحص [[init.length]]، مش [[init === undefined]].

myBind مع new: جوه الدالة اللي بترجّعها افحص [[new.target]]، ولو موجود اعمل [[new fn(...preset, ...args)]] وتجاهل الـ ctx. النتيجة: [[new (Point.myBind(null, 1))(2)]] بترجّع [[Point { x: 1, y: 2 }]] و [[instanceof Point]] بـ true. من غير الفحص ده النسخة البسيطة بترجّع [[{}]] فاضي و instanceof بـ false، لأن this راحت للـ ctx مش للـ object الجديد.`,
          solCode: R`Array.prototype.myFilter = function (callback, thisArg) {
  if (typeof callback !== "function") throw new TypeError(callback + " is not a function");
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this && callback.call(thisArg, this[i], i, this)) result.push(this[i]);
  }
  return result;
};
Array.prototype.myReduce = function (callback, ...init) {
  if (typeof callback !== "function") throw new TypeError(callback + " is not a function");
  let i = 0;
  let acc;
  if (init.length > 0) {
    acc = init[0];
  } else {
    while (i < this.length && !(i in this)) i++;
    if (i >= this.length) throw new TypeError("Reduce of empty array with no initial value");
    acc = this[i++];
  }
  for (; i < this.length; i++) if (i in this) acc = callback(acc, this[i], i, this);
  return acc;
};
Function.prototype.myBind = function (ctx, ...preset) {
  const fn = this;
  function bound(...args) {
    if (new.target) return new fn(...preset, ...args);
    return fn.apply(ctx, [...preset, ...args]);
  }
  if (fn.prototype) bound.prototype = Object.create(fn.prototype);
  return bound;
};
function Point(x, y) { this.x = x; this.y = y; }
const P = Point.myBind(null, 1);
console.log(new P(2), new P(2) instanceof Point); // Point { x: 1, y: 2 } true`,
          check: {
            lang: "js",
            starter: R`Array.prototype.myFilter = function (callback, thisArg) {
  // ...
};
Array.prototype.myReduce = function (callback, ...init) {
  // init.length بيفرّق بين «مفيش قيمة أولية» و «القيمة الأولية undefined»
};
Function.prototype.myBind = function (ctx, ...preset) {
  const fn = this;
  return function (...args) {
    return fn.apply(ctx, [...preset, ...args]);
  };
};`,
            tests: R`test("[1, 2, 3, 4].myFilter(زوجي) ← [2, 4]", () => expect([1, 2, 3, 4].myFilter((x) => x % 2 === 0)).toEqual([2, 4]));
test("myFilter بتبعت (value, index, array)", () => expect(["a", "b", "c"].myFilter((v, i, arr) => i > 0 && arr.length === 3)).toEqual(["b", "c"]));
test("[1, 2, 3].myReduce(جمع) ← 6، ومع قيمة أولية 10 ← 16", () => expect([[1, 2, 3].myReduce((a, b) => a + b), [1, 2, 3].myReduce((a, b) => a + b, 10)]).toEqual([6, 16]));
test("[].myReduce من غير قيمة أولية ← TypeError", () => {
  let err;
  try { [].myReduce((a, b) => a + b); } catch (e) { err = e; }
  expect(err instanceof TypeError).toBe(true);
});
test("القيمة الأولية undefined مش زي مفيش قيمة: [1].myReduce(f, undefined) ← [undefined, 1]", () => expect([1].myReduce((a, b) => [a, b], undefined)).toEqual([undefined, 1]));
test("[].myReduce(f, 0) ← 0", () => expect([].myReduce((a, b) => a + b, 0)).toBe(0));
test("myBind مع new: new (Point.myBind(null, 1))(2) instanceof Point و x = 1 و y = 2", () => {
  function Point(x, y) { this.x = x; this.y = y; }
  const P = Point.myBind(null, 1);
  const p = new P(2);
  expect([p instanceof Point, p.x, p.y]).toEqual([true, 1, 2]);
});`,
            solution: R`Array.prototype.myFilter = function (callback, thisArg) {
  if (typeof callback !== "function") throw new TypeError(callback + " is not a function");
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this && callback.call(thisArg, this[i], i, this)) result.push(this[i]);
  }
  return result;
};
Array.prototype.myReduce = function (callback, ...init) {
  if (typeof callback !== "function") throw new TypeError(callback + " is not a function");
  let i = 0;
  let acc;
  if (init.length > 0) {
    acc = init[0];
  } else {
    while (i < this.length && !(i in this)) i++;
    if (i >= this.length) throw new TypeError("Reduce of empty array with no initial value");
    acc = this[i++];
  }
  for (; i < this.length; i++) if (i in this) acc = callback(acc, this[i], i, this);
  return acc;
};
Function.prototype.myBind = function (ctx, ...preset) {
  const fn = this;
  function bound(...args) {
    if (new.target) return new fn(...preset, ...args);
    return fn.apply(ctx, [...preset, ...args]);
  }
  if (fn.prototype) bound.prototype = Object.create(fn.prototype);
  return bound;
};`
          }
        },
        {
          cmd: "curry",
          title: "اكتب دالة curry (currying)",
          desc: R`الـ currying بيحوّل دالة بتاخد كذا argument مرة واحدة [[f(a, b, c)]] لسلسلة دوال كل واحدة بتاخد جزء [[f(a)(b)(c)]]. الـ implementation: بقارن عدد الـ arguments اللي اتجمعت بـ [[fn.length]] (عدد باراميترات الدالة). لو كفاية بنادي الدالة، ولو لأ برجّع دالة بتجمع الباقي وتنادي نفسها تاني. الفايدة العملية: تعمل نسخ «متظبطة» من دالة عامة، زي [[addTax]] بنسبة ثابتة.`,
          example: R`function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn.apply(this, args);
    return (...more) => curried.apply(this, [...args, ...more]);
  };
}
const add3 = (a, b, c) => a + b + c;
const add = curry(add3);
add(1)(2)(3);    // 6
add(1, 2)(3);    // 6
add(1)(2, 3);    // 6
const withTax = curry((ratePct, price) => (price * (100 + ratePct)) / 100);
const addVat = withTax(14);
addVat(100);     // 114`,
          try: R`اكتب [[sum(1)(2)(3)()]] بيرجّع 6 بأي عدد نداءات، ويخلص لما تناديه من غير arguments. ده سؤال تاني مشهور بنفس الفكرة. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات بتجرّب [[sum]].`,
          flag: "script",
          deep: {
            why: "بيختبر closures و recursion و fn.length و rest/spread. وفكرته (partial application) موجودة في الشغل الحقيقي حتى لو مش بالاسم ده: [[bind]] مع arguments، و factories، و middleware.",
            how: R`نقط تقولها: [[fn.length]] بيعد الباراميترات قبل أول واحد ليه default أو rest، فمع [[(a, b = 1) => ...]] الطول 1، ومع [[(...args)]] صفر، فالـ curry مش هيشتغل صح معاهم. وكل نداء جزئي بيعمل closure جديد شايل الـ args اللي اتجمعت، فتقدر تعيد استخدام [[add(1)]] مع أرقام مختلفة من غير ما يتلخبطوا. والفرق بين currying (argument واحد كل مرة) و partial application (تثبيت جزء).`,
            when: "«الفرق بين currying و partial application؟»، و «sum(1)(2)(3)» بكل أشكاله، و «compose و pipe».",
            mistakes: R`تعدّل [[args]] المتجمعة (push) فالنداءات الجزئية تتلخبط مع بعض: اعمل array جديدة كل مرة. وتنسى الحالة اللي فيها arguments أكتر من المطلوب.`
          },
          lines: [
            "بتاخد الدالة الأصلية.",
            "بترجّع دالة باسم عشان تنادي نفسها.",
            "الـ arguments كفاية: نادي الأصلية.",
            "مش كفاية: رجّع دالة بتجمع اللي جاي وتحاول تاني.",
            "قفلة.",
            "قفلة.",
            R`دالة بـ 3 باراميترات: [[fn.length]] بـ 3.`,
            "النسخة الـ curried.",
            "واحد واحد.",
            "اتنين وبعدين واحد.",
            "واحد وبعدين اتنين.",
            "دالة ضريبة عامة.",
            "نسخة متظبطة على ١٤٪.",
            "100 × 114 ÷ 100."
          ],
          sol: R`[[sum(1)(2)(3)()]] بترجّع 6، و [[sum(5)()]] بترجّع 5، و [[sum(1)(2)(3)(4)(10)()]] بترجّع 20. الفكرة إن كل نداء فيه رقم بيرجّع دالة جديدة شايلة المجموع لحد دلوقتي في الـ closure، والنداء الفاضي هو اللي بيرجّع الرقم.

الفرق عن curry اللي فوق إن هنا مفيش عدد arguments معروف ([[fn.length]])، فلازم إشارة للنهاية، وهي النداء الفاضي. الغلطة الشائعة إنك تخزّن المجموع في متغير برّه الدالة (global)، فنداء [[sum(1)(2)()]] التاني يبدأ من المجموع القديم. ولو نسيت [[()]] في الآخر هتطبع [[[Function: next]]] بدل الرقم.`,
          solCode: R`function sum(a) {
  return function next(b) {
    if (b === undefined) return a;
    return sum(a + b);
  };
}
console.log(sum(1)(2)(3)());        // 6
console.log(sum(5)());              // 5
console.log(sum(1)(2)(3)(4)(10)()); // 20`,
          check: {
            lang: "js",
            starter: R`let total = 0;
function sum(a) {
  total += a;
  return function next(b) {
    if (b === undefined) return total;
    return sum(b);
  };
}`,
            tests: R`test("sum(1)(2)(3)() ← 6", () => expect(sum(1)(2)(3)()).toBe(6));
test("sum(5)() ← 5", () => expect(sum(5)()).toBe(5));
test("sum(1)(2)(3)(4)(10)() ← 20", () => expect(sum(1)(2)(3)(4)(10)()).toBe(20));
test("كل سلسلة مستقلة (مفيش مجموع global): a = sum(1)، و a(2)() ← 3، و a(10)() ← 11", () => {
  const a = sum(1);
  expect([a(2)(), a(10)()]).toEqual([3, 11]);
});
test("النداء الفاضي بس اللي بيرجّع رقم", () => expect(typeof sum(1)(2)).toBe("function"));`,
            solution: R`function sum(a) {
  return function next(b) {
    if (b === undefined) return a;
    return sum(a + b);
  };
}`
          }
        },
        {
          cmd: "deep equal",
          title: "قارن اتنين objects بالمحتوى (deep equal)",
          desc: R`=== بيقارن الـ reference، فمحتاج دالة recursive. الأول لو [[Object.is(a, b)]] يبقى متساويين (بتغطي الـ primitives و NaN ونفس الـ reference). لو واحد فيهم مش object أو null يبقى مختلفين. لو واحد array والتاني لأ مختلفين. بعد كده أقارن عدد المفاتيح، وبعدين كل مفتاح موجود في التاني وقيمته متساوية بنفس الدالة.`,
          example: R`function deepEqual(a, b) {
  if (Object.is(a, b)) return true;
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((k) => Object.hasOwn(b, k) && deepEqual(a[k], b[k]));
}
deepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] }); // true
deepEqual({ a: 1 }, { a: "1" });                       // false
deepEqual([1, 2], { 0: 1, 1: 2 });                     // false
deepEqual(NaN, NaN);                                   // true`,
          try: R`ضيف دعم لـ Date (قارن [[getTime()]]) و Map و Set. وبعدين جرّب object بيشاور على نفسه ([[a.self = a]]) وشوف الـ stack overflow، وفكّر إزاي تحلها بـ WeakMap للأزواج اللي اتقارنت. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[deepEqual]] مع Date و Map و Set، والـ object اللي بيشاور على نفسه.`,
          flag: "script",
          deep: {
            why: "بيختبر recursion، والفرق بين الـ reference والقيمة، والحالات الحدية (null و NaN و arrays مقابل objects). وهي نفس الفكرة اللي ورا [[expect(x).toEqual(y)]] في الـ tests و [[assert.deepStrictEqual]] في Node.",
            how: R`نقط تقولها: [[typeof null]] بـ "object" فلازم فحص null لوحده. و [[Object.is]] بدل === عشان NaN. والـ prototype مش بيتقارن هنا (instance من class ممكن يساوي object عادي بنفس المفاتيح)، والنسخ الكاملة بتقارن [[Object.getPrototypeOf]]. والتعقيد O(n) في عدد القيم كلها. والمراجع الدائرية محتاجة تتبّع الأزواج اللي بتتقارن. وفي الشغل: [[node:util]] فيه [[isDeepStrictEqual]] جاهز.`,
            when: R`«اكتب deep clone» (نفس الـ recursion، واذكر structuredClone)، و «flatten object لمفاتيح بنقط» ([[{a: {b: 1}}]] → [[{"a.b": 1}]])، و «get(obj, 'a.b.c')».`,
            mistakes: R`تقارن بـ [[JSON.stringify]]: ترتيب المفاتيح بيفرق، و undefined بيختفي، و NaN بتبقى null. ونسيان فحص null. ونسيان إن [[[]]] و [[{}]] الفاضيين ليهم نفس عدد المفاتيح.`
          },
          lines: [
            "دالة recursive.",
            R`نفس القيمة أو نفس الـ reference، و [[Object.is]] بتغطي NaN.`,
            "لو واحد primitive أو null (وماتساووش فوق): مختلفين.",
            "array مقابل object: مختلفين.",
            "مفاتيح الأول.",
            "مفاتيح التاني.",
            "عدد مختلف: مختلفين.",
            "كل مفتاح موجود في التاني وقيمته متساوية بنفس الدالة.",
            "قفلة.",
            "متداخل ومتساوي.",
            "رقم مقابل string.",
            "array مقابل object بنفس المفاتيح.",
            "NaN بتساوي نفسها هنا."
          ],
          sol: R`بعد الإضافات: [[deepEqual(new Date(1), new Date(2))]] بترجّع false (النسخة الأصلية كانت بترجّع true غلط، لأن الـ Date معندهاش keys فبتبان متساوية)، ونفس المشكلة مع Map و Set: الأصلية بتقول [[new Map([ [1, 1] ])]] بتساوي [[new Map([ [2, 2] ])]]. الحل إنك تفحص النوع بـ instanceof وتقارن [[getTime()]] للـ Date، و size وكل مفتاح للـ Map، و has للـ Set.

الـ object اللي بيشاور على نفسه بيوقّع النسخة الأصلية بـ [[RangeError: Maximum call stack size exceeded]]. الحل [[WeakMap]] بتسجّل كل زوج [[a → b]] دخلت تقارنه، ولو قابلته تاني ترجّع true (افترضنا إنهم متساويين لحد ما يثبت العكس). مع الحل، اتنين objects كل واحد بيشاور على نفسه بيطلعوا متساويين. ولـ Set جوه objects المقارنة بـ has بتقارن بالـ reference، ودي حدود مقبولة في الانترفيو لو قلتها.`,
          solCode: R`function deepEqual(a, b, seen = new WeakMap()) {
  if (Object.is(a, b)) return true;
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false;
  if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return false;
  if (seen.get(a) === b) return true;
  seen.set(a, b);
  if (a instanceof Date) return a.getTime() === b.getTime();
  if (a instanceof Map) {
    if (a.size !== b.size) return false;
    for (const [k, v] of a) if (!b.has(k) || !deepEqual(v, b.get(k), seen)) return false;
    return true;
  }
  if (a instanceof Set) {
    if (a.size !== b.size) return false;
    for (const v of a) if (!b.has(v)) return false;
    return true;
  }
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((k) => Object.hasOwn(b, k) && deepEqual(a[k], b[k], seen));
}
const x = { v: 1 }; x.self = x;
const y = { v: 1 }; y.self = y;
console.log(deepEqual(x, y));                                  // true
console.log(deepEqual(new Date(1), new Date(2)));              // false
console.log(deepEqual(new Map([["a", [1]]]), new Map([["a", [1]]]))); // true`,
          check: {
            lang: "js",
            starter: R`function deepEqual(a, b) {
  if (Object.is(a, b)) return true;
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((k) => Object.hasOwn(b, k) && deepEqual(a[k], b[k]));
}`,
            tests: R`test("objects و arrays متداخلة", () => expect([deepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] }), deepEqual({ a: 1 }, { a: "1" }), deepEqual([1, 2], { 0: 1, 1: 2 })]).toEqual([true, false, false]));
test("Date: new Date(1) و new Date(2) مش متساويين (الأصلية كانت بتقول true)", () => expect([deepEqual(new Date(1), new Date(2)), deepEqual(new Date(5), new Date(5))]).toEqual([false, true]));
test("Map: بالمفاتيح والقيم", () => expect([deepEqual(new Map([[1, 1]]), new Map([[2, 2]])), deepEqual(new Map([["a", [1]]]), new Map([["a", [1]]]))]).toEqual([false, true]));
test("Set: نفس العناصر", () => expect([deepEqual(new Set([1, 2]), new Set([2, 1])), deepEqual(new Set([1]), new Set([2]))]).toEqual([true, false]));
test("Date مش زي {} فاضي", () => expect(deepEqual(new Date(1), {})).toBe(false));
test("NaN زي NaN", () => expect(deepEqual({ x: NaN }, { x: NaN })).toBe(true));
test("اتنين بيشاوروا على نفسهم ← true من غير stack overflow (WeakMap)", () => {
  const x = { v: 1 }; x.self = x;
  const y = { v: 1 }; y.self = y;
  expect(deepEqual(x, y)).toBe(true);
});`,
            solution: R`function deepEqual(a, b, seen = new WeakMap()) {
  if (Object.is(a, b)) return true;
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false;
  if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return false;
  if (seen.get(a) === b) return true;
  seen.set(a, b);
  if (a instanceof Date) return a.getTime() === b.getTime();
  if (a instanceof Map) {
    if (a.size !== b.size) return false;
    for (const [k, v] of a) if (!b.has(k) || !deepEqual(v, b.get(k), seen)) return false;
    return true;
  }
  if (a instanceof Set) {
    if (a.size !== b.size) return false;
    for (const v of a) if (!b.has(v)) return false;
    return true;
  }
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((k) => Object.hasOwn(b, k) && deepEqual(a[k], b[k], seen));
}`
          }
        },
        {
          cmd: "اتوقع الناتج",
          title: "أسئلة «إيه الناتج؟» المشهورة (output questions)",
          desc: R`أسئلة سريعة بتختبر coercion و this والـ sort والـ floating point. الطريقة: متخمنش، قول القاعدة بصوتك. [[+]] مع string بيلزق، والعمليات التانية ([[-]] و [[*]]) بتحوّل لأرقام. الـ arrays والـ objects بيتحوّلوا string ([[[]]] بقى [[""]]، و [[{}]] بقى [["[object Object]"]]). و [[sort()]] من غير دالة بيرتّب كنصوص. والـ arrow بتاخد this من الدالة اللي حواليها.`,
          example: R`console.log([] + []);              // ""
console.log([] + {});              // "[object Object]"
console.log(1 + "2" - 1);          // 11
console.log("5" * "2");            // 10
console.log(typeof typeof 1);      // "string"
console.log([1, 2, 3] + "");       // "1,2,3"
console.log(0.1 * 3 === 0.3);      // false
console.log([3, 20, 100].sort());  // [100, 20, 3]
console.log(!!"false");            // true
const obj = { name: "A", get() { return () => this.name; } };
console.log(obj.get()());          // "A"`,
          try: R`غطّي التعليقات، واكتب إجابتك لكل سطر، وبعدين شغّل. وضيف ٣ أسئلة من عندك من الدروس اللي فاتت (hoisting و closures في loop من المستوى ٢، و microtasks من المستوى ٣).`,
          flag: "script",
          deep: {
            why: "الأسئلة دي بتتسأل كـ warm-up، والمقصود مش إنك تكون حافظ، المقصود تشرح القاعدة. الإجابة الصح من غير سبب بتتحسب نص درجة.",
            how: R`القواعد اللي بتحل أغلبهم: [[+]] لو أي طرف string (بعد تحويل الـ objects لـ primitive) بيبقى لزق نصوص، وإلا جمع. [[1 + "2"]] بقت "12"، و [["12" - 1]] بقت 11. الـ array بتتحوّل بـ [[join(",")]]، والـ object العادي بـ [["[object Object]"]]. [[typeof]] دايمًا بيرجّع string، فـ typeof بتاعه "string". أي string مش فاضي truthy حتى "false". والـ arrow جوه method بتاخد this بتاعة الـ method، اللي هي obj.`,
            when: R`بيتسألوا مع أسئلة hoisting ([[console.log(x); var x = 1]])، و closures في loop، وترتيب الـ event loop، و this في callbacks. كلهم في دروس فوق.`,
            mistakes: R`تجاوب بسرعة من غير ما تقول القاعدة. وتفتكر إن [[{} + []]] في Console زي [[[] + {}]]: في أول السطر الـ [[{}]] ممكن يتفهم block فالناتج 0، فالأسئلة دي بتتكتب جوه console.log عشان تتجنب ده.`
          },
          lines: [
            R`الاتنين بقوا [[""]]، ولزق نصين فاضيين.`,
            R`[[""]] + [["[object Object]"]].`,
            R`[["12"]] بعد اللزق، وبعدين - بتحوّله لرقم.`,
            R`[[*]] بتحوّل الاتنين أرقام.`,
            R`[[typeof 1]] بـ "number"، و typeof أي string بـ "string".`,
            "الـ array بتتحوّل بـ join.",
            "floating point: 0.30000000000000004.",
            "sort من غير دالة بيرتّب كنصوص.",
            "string مش فاضي: truthy.",
            R`arrow جوه method: [[this]] جاية من [[get]].`,
            R`[[get]] اتنادت بـ obj.get() فـ this = obj.`
          ],
          sol: R`الناتج الحقيقي في Node: سطر فاضي (string فاضي)، [[[object Object]]]، [[11]]، [[10]]، [[string]]، [[1,2,3]]، [[false]]، [[[ 100, 20, 3 ]]]، [[true]]، [[A]]. (Node بيطبع الـ strings من غير quotes.) الأسباب في سطر: [[+]] مع object بيحوّله string، و [[-]] و [[*]] بيحوّلوا لأرقام، و typeof بترجّع string دايمًا، و sort من غير compare بترتّب كنصوص، و [["false"]] string مش فاضي فـ truthy، والـ arrow أخدت this من get.

أمثلة للأسئلة اللي تضيفها: [[console.log(typeof x); var x = 1;]] بتطبع [[undefined]]، و [[for (var i = 0; i < 3; i++) setTimeout(() => console.log(i))]] بتطبع [[3 3 3]]، و [[setTimeout(() => console.log("T")); Promise.resolve().then(() => console.log("P")); console.log("S");]] بتطبع [[S P T]]. لو غلطت في أكتر من ٣ من العشرة الأصليين، ارجع لدروس «القيم والأنواع» قبل الانترفيو.`,
          solCode: R`console.log(typeof hoisted); // undefined
var hoisted = 1;
for (var i = 0; i < 3; i++) setTimeout(() => console.log("loop", i), 0); // 3 3 3
setTimeout(() => console.log("T"), 0);
Promise.resolve().then(() => console.log("P"));
console.log("S");
// S ثم P ثم loop 3 ×3 ثم T`
        }
      ]
    }
]);
