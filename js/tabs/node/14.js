// تكملة تاب node: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/node/01.js (شرح حقول الدرس في أوله)
MORE("node", [
    {
      t: "بنك تمارين Node",
      l: 3,
      time: R`حوالي ٧ ساعات لو حليت كل حاجة بإيدك: ساعة لكل بنك مسائل، وساعتين للأدوات`,
      goal: [
        R`تكتب بإيدك الحاجات اللي Node والمكتبات بيعملوهالك كل يوم (قراية arguments و .env، ومقارنة نسخ semver، والمسارات والـ query والـ routes، والمدد و cron)، فتفهم ليه بيتصرفوا كده وتعرف تصلّحهم لما يبوظوا.`,
        R`تحاكي أجزاء من Node نفسه (EventEmitter، و LRU cache، و rate limiter، و backoff) بكود بيعدّي اختبارات، ومن غير timers حقيقية (بتدّي الوقت كـ parameter).`,
        R`تلخّص بيانات حقيقية الشكل: لوج JSONL فيه سطور تالفة و BOM و \r\n، و CSV فيه فواصل جوه علامات تنصيص.`,
        R`تبني ٦ أدوات Node صغيرة شغالة من الصفر (CLI بيخزّن JSON بأمان، ومراقب فولدر، و API صغيرة باختباراتها، وفاحص روابط بحد للتوازي، و tail للوج، وباك أب بيدوّر) بالمواصفات واختبارات القبول.`,
      ],
      use: {
        prog: R`كل مسألة هنا نسخة صغيرة من حاجة حقيقية: [[parseFlags]] هي [[parseArgs]]، و [[satisfies]] هي اللي npm بيقرر بيها يسطّب أنهي نسخة، و [[matchRoute]] هي قلب Express و Hono، و [[cronMatches]] هي node-cron. لما تكتبهم مرة، الأدوات الحقيقية بتبطّل تبقى سحر.`,
        work: R`أسئلة الانترفيو لـ backend Node بتيجي من هنا بالظبط: «اكتب EventEmitter»، و «اكتب LRU cache»، و «اعمل rate limiter»، و «قارن نسختين»، و «ليه [[1.10.0]] أكبر من [[1.9.0]]».`,
        cs: R`المسائل بتلمس أفكار علوم حاسب: parsing بـ state machine (الـ CSV)، و hash map مع ترتيب الإدخال (LRU في O(1) بـ [[Map]])، و fixed window counter (rate limit)، و exponential backoff، و مقارنة lexicographic مقابل رقمية.`,
      },
      lab: R`mkdir -p ~/lab/node-bank && cd ~/lab/node-bank && node --version   # المسائل: اكتب في المربع اللي في الصفحة ودوس «شغّل واختبر»، أو في ملف وشغّله بـ node. والأدوات: فولدر لكل أداة`,
      projects: [
        { lvl: 'صغير', t: R`مكتبة [[utils]] بتاعتك`, what: R`ملف [[utils.mjs]] فيه أحسن نسخة كتبتها من [[parseDuration]] و [[formatBytes]] و [[formatDuration]] و [[maskSecret]]، ومعاه [[utils.test.mjs]] بـ [[node:test]] فيه نفس اختبارات البنك وزيادة ٣ حالات من عندك. من بنك «الوقت والأرقام» و «argv و .env».`, done: R`[[node --test]] بيعدّي كل الاختبارات، واستخدمت المكتبة في أداة واحدة على الأقل من درس «ابني بنفسك».` },
        { lvl: 'صغير', t: R`[[semver-check]] لمشروعك`, what: R`سكربت بيقرا [[package.json]] و [[package-lock.json]] ويستخدم [[satisfies]] بتاعتك يتأكد إن كل نسخة متسطّبة بتوافق الـ range المكتوب، ويطبع اللي مش موافق. من بنك «النسخ (semver)».`, done: R`على مشروع سليم كله تمام، ولو غيّرت range في package.json بإيدك لـ [[^9.0.0]] السكربت طبع المكتبة دي بالاسم والنسخة و exit 1.` },
        { lvl: 'متوسط', t: R`router صغير بتاعك`, what: R`[[createRouter()]] فيه [[get]] و [[post]] و [[delete]] بيسجّلوا routes بـ [[:params]]، و [[handle(req, res)]] بيستخدم [[matchRoute]] و [[parseQuery]] ويدّي الـ handler [[{ params, query }]]، ويرجّع 404 و 405 صح. واستخدمه مكان الـ [[if]] في سيرفر درس [[node:http سيرفر من غير مكتبة]]. من بنك «المسارات والروابط».`, done: R`نفس جدول الحالات في درس السيرفر بيطلع بنفس الأكواد، و [[DELETE /notes]] بيرجع 405 مش 404، والسيرفر بقى أقصر من غير ولا مكتبة.` },
        { lvl: 'متوسط', t: R`مجدول مهام بـ cron بتاعك`, what: R`[[schedule(expr, fn)]] بيستخدم [[cronMatches]] كل دقيقة (timer على أول الدقيقة الجاية مش [[setInterval(60000)]] عشان ميزحلقش)، ومن غير تداخل، و [[stop()]]. من بنك «الوقت والأرقام» ودرس جدولة المهام.`, done: R`مهمة [[*/2 * * * *]] اشتغلت على الدقايق الزوجي بس لمدة ١٠ دقايق (اللوج فيه الوقت)، ومهمة بتاخد ٣ دقايق مداخلتش مع نفسها.` },
        { lvl: 'كبير', t: R`[[mini-express]]: framework صغير`, what: R`framework فوق [[node:http]] فيه: router بـ params (من [[matchRoute]])، و middleware بـ [[next()]] (شكل البصلة زي Hono)، و [[res.json]] و [[res.status]]، وقراية JSON body بحد للحجم (درس السيرفر)، و rate limit middleware (من [[createRateLimiter]] بالوقت الحقيقي)، و error handler واحد، واختبارات بـ [[node:test]] و [[listen(0)]] لكل جزء. و README فيه مثال API نوتات كامل بيه.`, done: R`API النوتات بتعدّي نفس اختبارات درس السيرفر، والطلب رقم ١١ في الدقيقة بيرجع 429 و [[retry-after]]، و error جوه handler بيرجع 500 JSON والسيرفر مبيقعش، والاختبارات كلها بتعدّي على Node 22 و 24.`, ext: R`زوّد static files بـ streams و [[ETag]]، و CORS middleware، وقارن السرعة بـ Hono على نفس الـ API.` },
        { lvl: 'فكرة', t: R`بنك مسائل من مشروعك`, what: R`اختار ٥ دوال صغيرة في مشروع Node حقيقي عندك (validation، أو حساب سعر، أو تحويل تاريخ، أو parsing لـ input) وحوّل كل واحدة لمسألة: وصف، و ٥ اختبارات منهم حالتين طرفيتين على الأقل، وحل.`, done: R`زميل حل المسائل من الوصف والاختبارات بس، واختبار واحد على الأقل كشف باج في الكود الأصلي بتاعك.`, ext: R`حطهم في ريبو بـ GitHub Action بيشغّل الاختبارات، وخليه تمرين انترفيو لفريقك.` },
        { lvl: 'كبير', t: R`[[logwatch]]: مراقب لوجات بتنبيهات`, what: R`أداة بتعمل tail لملف لوج JSONL (أداة ٥ في «ابني بنفسك»)، وبتلخّص كل دقيقة بـ [[summarizeJsonl]]، ولو نسبة [[error]] عدّت حد أو [[slowest.ms]] عدّى حد بتبعت تنبيه (webhook أو سطر في ملف) بـ [[backoff]] لو الإرسال فشل، ومن غير ما تبعت نفس التنبيه أكتر من مرة في ٥ دقايق (rate limit).`, done: R`على لوج بيتكتب فيه بسكربت تاني: ١٠ أخطاء في دقيقة طلّعوا تنبيه واحد بس، والـ webhook الواقع اتعاد بعد 1 و 2 و 4 ثواني، واللوج اللي اتعمله rotate (اسم جديد) الأداة كمّلت عليه.`, ext: R`زوّد dashboard صغير بـ [[node:http]] بيعرض آخر ساعة، و config بـ [[.env]] (من [[parseEnvText]]).` },
      ],
      n: R`هنا مفيش أمر جديد: هنا بتكتب بإيدك الحاجات اللي Node والمكتبات بيعملوهالك. ست بنوك مسائل بتتصحح لوحدها في الصفحة (٦٧ اختبار)، وبعدين ٦ أدوات بتتبني من الصفر بمواصفات واختبارات قبول. كل ناتج مكتوب هنا اتشغّل على Node 24.22.1 (ويندوز) و Node 22.23.3 (Docker)، والمقارنات بـ [[path]] و [[URLSearchParams]] و [[util.parseEnv]] و [[npx semver]] الحقيقيين.`,
      items: [
        {
          cmd: "مسائل: arguments و .env",
          title: "اكتب parseArgs و .env parser بإيدك: --x=1 و -abc و --no-color و التعليقات وعلامات التنصيص",
          desc: R`تلات دوال بتعمل نسخة صغيرة من حاجات بتستخدمها كل يوم: [[parseFlags(argv)]] زي [[parseArgs]] من [[node:util]] (درس process.argv و parseArgs)، و [[parseEnvText(text)]] زي [[--env-file]] و [[util.parseEnv]] (درس .env و متغيرات البيئة)، و [[maskSecret(value)]] اللي بتطبع بيها سر في اللوج من غير ما تكشفه.

المهم مش الحالة العادية، المهم الحالات اللي بتوقّع: [[--out=x.csv]] مقابل [[--out x.csv]]، و flag في الآخر من غير قيمة، و [[-abc]] = تلات flags، و [[--no-color]]، و [[--]] اللي بعدها كله positional، و [[-]] لوحدها (يعني stdin). وفي الـ .env: تعليقات، و [[export]]، وعلامات تنصيص، و [[=]] جوه القيمة (رابط قاعدة بيانات)، و [[#]] في نص السطر، وسطور ويندوز [[\r\n]].`,
          example: R`function parseEnvText(text) {
  const out = {};
  for (let line of text.split(/\r?\n/)) {
    line = line.trim();
    if (!line || line.startsWith("#")) continue;
    if (line.startsWith("export ")) line = line.slice(7).trim();
    const eq = line.indexOf("=");
    if (eq <= 0) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    const q = value[0];
    if ((q === '"' || q === "'") && value.lastIndexOf(q) > 0) {
      value = value.slice(1, value.lastIndexOf(q));
      if (q === '"') value = value.replace(/\\n/g, "\n");
    } else {
      const hash = value.indexOf(" #");
      if (hash !== -1) value = value.slice(0, hash).trim();
    }
    out[key] = value;
  }
  return out;
}
console.log(parseEnvText('NAME="Sara Ali"\nexport TOKEN=abc\nURL=postgres://u:p@h/db?x=1\nGREETING=hello # inline'));`,
          lines: [
            R`دالة بتاخد نص ملف [[.env]] كله وترجّع object: كل مفتاح وقيمته كنص.`,
            R`النتيجة بتبدأ object فاضي، وكل سطر سليم هيزوّد مفتاح.`,
            R`[[split(/\r?\n/)]] بيقسم على [[\n]] (لينكس) أو [[\r\n]] (ويندوز)، فملف اتعمل على ويندوز مبيسيبش [[\r]] في آخر كل قيمة. [[let]] عشان هنعدّل [[line]] جوه الـ loop.`,
            R`بنشيل المسافات من الأول والآخر.`,
            R`السطر الفاضي أو اللي بيبدأ بـ [[#]] (تعليق) بنتخطاه بـ [[continue]].`,
            R`بعض الملفات مكتوبة عشان تتعمل [[source]] في bash فبيبدأ السطر بـ [[export ]]، فبنشيلها (٧ حروف) ونكمّل عادي.`,
            R`مكان أول [[=]] بس، مش آخر واحد: رابط زي [[postgres://u:p@h/db?x=1]] فيه [[=]] جوه القيمة.`,
            R`مفيش [[=]] خالص ([[-1]]) أو السطر بيبدأ بيه ([[0]]، يعني مفيش اسم): سطر غلط، نتخطاه من غير ما نوقّع كل الملف.`,
            R`الاسم: كل اللي قبل الـ [[=]] من غير مسافات.`,
            R`القيمة: كل اللي بعده. [[let]] لأننا ممكن نشيل منها علامات التنصيص أو التعليق.`,
            R`أول حرف في القيمة: هل هو علامة تنصيص؟`,
            R`لو القيمة بتبدأ بـ [["]] أو [[']] وفيه علامة قفلة بعدها، يبقى القيمة اللي جواهم بالظبط (بالمسافات و [[#]] اللي جواها).`,
            R`بناخد اللي بين أول علامة وآخر علامة من نفس النوع.`,
            R`جوه علامات الدبل بس، النصين [[\n]] بيبقوا سطر جديد حقيقي (زي [[util.parseEnv]] بالظبط: [["a\nb"]] رجعت سطرين).`,
            R`القيمة من غير علامات تنصيص:`,
            R`بندوّر على [[ #]] (مسافة وبعدها شباك): ده تعليق في نص السطر.`,
            R`لو موجود بنقص القيمة عنده. المسافة قبل الشباك مهمة: [[pa#ss]] باسورد فيه شباك مش تعليق.`,
            R`قفلة الـ [[if/else]].`,
            R`بنحط المفتاح وقيمته. ولو المفتاح اتكرر، الأخير بيكسب.`,
            R`قفلة الـ loop.`,
            R`بنرجّع الـ object بكل المفاتيح اللي اتقرت.`,
            R`قفلة الدالة.`,
            R`بيطبع [[{ NAME: 'Sara Ali', TOKEN: 'abc', URL: 'postgres://u:p@h/db?x=1', GREETING: 'hello' }]]: نفس اللي [[util.parseEnv]] بيرجّعه لنفس النص (اتقارن على Node 24.22.1).`,
          ],
          teach: R`## الفكرة في سطر

كل parser بيبدأ بنفس السؤال: **إيه الأشكال اللي اليوزر ممكن يكتبها؟** اكتبها في جدول قبل الكود، وكل سطر في الجدول يبقى اختبار. والمقارنة الصح دايمًا بالحاجة الحقيقية: [[parseArgs]] و [[util.parseEnv]] و [[--env-file]].

---

## ١. [[parseFlags(argv)]]: الجدول الأول

| اللي اتكتب | الناتج |
|---|---|
| [[a.json --out=x.csv -v]] | [[flags: { out: "x.csv", v: true }]] و [[positionals: ["a.json"]]] |
| [[--limit 5 b.json]] | [[limit]] خد [["5"]] (نص!) والملف positional |
| [[x --verbose]] | [[verbose: true]] لأن مفيش حاجة بعده |
| [[--dry-run --out r.csv]] | [[dry-run: true]] لأن اللي بعده بيبدأ بـ [[-]] |
| [[-abc]] | تلات flags: [[a]] و [[b]] و [[c]] |
| [[--no-color]] | [[color: false]] |
| [[a -- -v --x]] | positionals: [[a]] و [[-v]] و [[--x]] |
| [[-]] | positional (يعني «اقرا من stdin» في أدوات كتير) |

> **الفرق عن [[parseArgs]] الحقيقي:** الحقيقي محتاج تقوله كل option نوعه إيه (string ولا boolean) عشان يعرف [[--limit 5]] معناها إيه. دالتنا بتخمّن: لو اللي بعده مش بيبدأ بـ [[-]] تبقى قيمة. والتخمين ده بيغلط مع [[--verbose file.txt]] (هيبقى [[verbose: "file.txt"]])، وعشان كده [[parseArgs]] الحقيقي **مبيخمنش**. وقيمة سالبة زي [[--limit -5]]: الحقيقي رفضها بـ [[argument is ambiguous]] (درس parseArgs)، ودالتنا هتعتبر [[-5]] flags اسمهم [[5]].

---

## ٢. [[parseEnvText(text)]]: قارنّاها بـ [[util.parseEnv]]

~~~text اتشغّل: util.parseEnv على نفس النص (Node 24.22.1)
{"GREETING":"hello","MULTI":"a\nb","NAME":"Sara Ali","TOKEN":"abc","URL":"postgres://u:p@h/db?x=1"}
~~~

ودالتنا بتطلّع نفس المفاتيح ونفس القيم. والحالات اللي بتبوظ أول نسخة بيكتبها الناس:

| الحالة | النسخة الساذجة ([[split("=")]]) | الصح |
|---|---|---|
| [[URL=postgres://u:p@h/db?x=1]] | [[postgres://u:p@h/db?x]] (اتقص عند تاني [[=]]) | القيمة كاملة: أول [[=]] بس |
| [[NAME="Sara Ali"]] | علامات التنصيص جوه القيمة | [[Sara Ali]] |
| [[GREETING=hello # inline]] | [[hello # inline]] | [[hello]] |
| [[A=1\r\n]] (ويندوز) | [["1\r"]] (حرف مخفي في الآخر) | [["1"]] |
| [[JUNK]] من غير [[=]] | [[undefined]] أو crash | السطر بيتتخطى |

---

## ٣. [[maskSecret]]

[[maskSecret("sk_live_abcdef")]] = [["sk**********ef"]]: أول حرفين وآخر حرفين بس. وأي سر ٤ حروف أو أقل بيبقى نجوم كله، و [[undefined]] بيبقى [[""]] من غير crash. ده اللي بتحطه في لوج «التوكن اتقرا» (درس لوج الـ webhooks) عشان تعرف **أنهي** توكن من غير ما تكشفه.

---

## الاختبارات (١٣)

تحت في المربع. منهم: [[--dry-run]] قبل flag تاني، و [[-]] لوحدها، و [[=]] جوه الرابط، و [[\r\n]]، و [[undefined]] في [[maskSecret]].`,
          try: R`اكتب في المربع اللي تحت التلات دوال ودوس «شغّل واختبر». قبل ما تكتب [[parseFlags]] اكتب في تعليق الأشكال الـ ٨ اللي في الجدول. وبعد ما تخلص، شغّل [[parseEnvText]] بتاعتك و [[util.parseEnv]] الحقيقي على ملف [[.env]] حقيقي عندك (من غير ما تطبع القيم السرية!) وقارن المفاتيح.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** بالنسخة الساذجة [[const [k, v] = line.split("=")]]، إيه قيمة [[URL]] في [[URL=postgres://u:p@h/db?x=1]]؟`, done: R`[[postgres://u:p@h/db?x]]: [[split]] قسم عند كل [[=]] والـ destructuring خد أول اتنين بس. الحل [[indexOf("=")]] و [[slice]].` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** [[parseFlags(["--verbose", "file.txt"])]] بتاعتك مقابل [[parseArgs({ args: ["--verbose", "file.txt"], options: { verbose: { type: "boolean" } }, allowPositionals: true })]].`, done: R`بتاعتك: [[verbose: "file.txt"]] ومفيش positionals. الحقيقي: [[verbose: true]] و [[positionals: ["file.txt"]]]. وكتبت إن ده سبب إن [[parseArgs]] بيطلب نوع كل option.` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** ٣ اختبارات زيادة لـ [[parseEnvText]]: مفتاح مكرر (الأخير يكسب)، و [[PASS=pa#ss]] (الشباك من غير مسافة قبله مش تعليق)، و [[KEY = value]] (مسافات حوالين [[=]]).`, done: R`التلاتة بيعدّوا: [[{ A: "2" }]] و [[pa#ss]] كاملة و [[KEY: "value"]]، وقارنت التلاتة بـ [[util.parseEnv]] وكتبت أي فرق.` },
            { lvl: 'تحدي', t: R`**ابني:** [[env-diff.mjs .env.example .env]] بيستخدم [[parseEnvText]] ويطبع المفاتيح الناقصة والزيادة، ويطبع القيم بـ [[maskSecret]] بس، ويخرج بـ 1 لو فيه ناقص.`, done: R`مع مفتاح ناقص: «ناقص: DATABASE_URL» و exit 1، ومع كله موجود exit 0، ومفيش قيمة سر كاملة ظاهرة في أي ناتج.` },
          ],
          deep: {
            why: R`كل أداة CLI وكل سيرفر بيقرا arguments وبيقرا config. لما تكتب الـ parser بإيدك مرة بتعرف بالظبط ليه [[parseArgs]] رفض [[--limit -5]]، وليه رابط القاعدة اتقص، وليه القيمة فيها حرف مخفي على ويندوز. وده بيخليك تقرا أي parser تاني (dotenv، و yargs، و commander) وتفهم قراراته.`,
            how: R`الاتنين parsers من نوع «سطر بسطر» أو «كلمة بكلمة» من غير قواعد معقدة: بتلف على المدخل، ولكل عنصر بتسأل أسئلة بالترتيب (هل هو [[--]]؟ هل بيبدأ بـ [[--no-]]؟ هل فيه [[=]]؟) وأول إجابة صح بتقرر. والترتيب مهم: [[--no-color]] لازم يتفحص قبل [[--]] العادي، و [[--]] لوحده قبل الاتنين. وفي الـ .env، [[indexOf]] بيلاقي أول [[=]] فالقيمة تقدر يبقى فيها [[=]]، و [[lastIndexOf(q)]] بيلاقي علامة القفلة حتى لو القيمة فيها نفس العلامة في النص. و [[split(/\r?\n/)]] بيشيل [[\r]] بتاع ويندوز.`,
            when: R`مش هتكتب parser args بنفسك في مشروع حقيقي غالبًا: [[parseArgs]] موجود. بس هتحتاج نفس التفكير لما تقرا config بشكل خاص، أو تكتب أداة بتقرا ملفات key=value (زي [[.npmrc]] أو [[.properties]])، أو تصلّح باج في parser مكتبة. و [[maskSecret]] في أي لوج فيه توكنز.`,
            mistakes: R`[[split("=")]] على القيمة كلها. ونسيان [[\r]] من ويندوز. و [[--no-x]] بيتفحص بعد [[--x]] فبيبقى [[{ "no-x": true }]]. وتعتبر [[-5]] flag. وتنسى [[--]]. وتشيل [[#]] من غير مسافة قبله فالباسورد يتقص. وتطبع القيمة السرية كاملة وانت بتعمل debug.`,
          },
          sol: R`الحل كامل تحت، وكل حالة في الجداول اتقارنت بـ [[parseArgs]] أو [[util.parseEnv]] الحقيقي على Node 24.22.1. لو اختبار [[-abc]] فشل: انت بتعامل [[-abc]] كـ [[--abc]]، لازم تلف على الحروف. ولو [[--no-color]] طلع [[{ "no-color": true }]]: الفحص بتاعه لازم ييجي قبل [[--]] العادي.`,
          solCode: R`function parseFlags(argv) {
  const flags = {}, positionals = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--") { positionals.push(...argv.slice(i + 1)); break; }
    if (a.startsWith("--no-") && a.length > 5) { flags[a.slice(5)] = false; continue; }
    if (a.startsWith("--")) {
      const eq = a.indexOf("=");
      if (eq !== -1) { flags[a.slice(2, eq)] = a.slice(eq + 1); continue; }
      const next = argv[i + 1];
      if (next !== undefined && !next.startsWith("-")) { flags[a.slice(2)] = next; i++; }
      else flags[a.slice(2)] = true;
      continue;
    }
    if (a.startsWith("-") && a.length > 1) { for (const ch of a.slice(1)) flags[ch] = true; continue; }
    positionals.push(a);
  }
  return { flags, positionals };
}
function parseEnvText(text) {
  const out = {};
  for (let line of text.split(/\r?\n/)) {
    line = line.trim();
    if (!line || line.startsWith("#")) continue;
    if (line.startsWith("export ")) line = line.slice(7).trim();
    const eq = line.indexOf("=");
    if (eq <= 0) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    const q = value[0];
    if ((q === '"' || q === "'") && value.lastIndexOf(q) > 0) {
      value = value.slice(1, value.lastIndexOf(q));
      if (q === '"') value = value.replace(/\\n/g, "\n");
    } else {
      const hash = value.indexOf(" #");
      if (hash !== -1) value = value.slice(0, hash).trim();
    }
    out[key] = value;
  }
  return out;
}
function maskSecret(value) {
  const s = String(value ?? "");
  if (s.length <= 4) return "*".repeat(s.length);
  return s.slice(0, 2) + "*".repeat(s.length - 4) + s.slice(-2);
}`,
          flag: "script",
          check: {
            lang: "js",
            starter: R`function parseFlags(argv) {}      // { flags, positionals }
function parseEnvText(text) {}   // { KEY: "value" }
function maskSecret(value) {}    // "sk**********ef"`,
            tests: R`test("parseFlags: --out=x.csv و -v و ملف", () => expect(parseFlags(["a.json", "--out=x.csv", "-v"])).toEqual({ flags: { out: "x.csv", v: true }, positionals: ["a.json"] }));
test("parseFlags: --limit 5 بياخد القيمة اللي بعده", () => expect(parseFlags(["--limit", "5", "b.json"])).toEqual({ flags: { limit: "5" }, positionals: ["b.json"] }));
test("parseFlags: --verbose في الآخر من غير قيمة = true", () => expect(parseFlags(["x", "--verbose"])).toEqual({ flags: { verbose: true }, positionals: ["x"] }));
test("parseFlags: --dry-run قبل flag تاني = true", () => expect(parseFlags(["--dry-run", "--out", "r.csv"]).flags).toEqual({ "dry-run": true, out: "r.csv" }));
test("parseFlags: -abc = تلات flags", () => expect(parseFlags(["-abc"]).flags).toEqual({ a: true, b: true, c: true }));
test("parseFlags: --no-color = false", () => expect(parseFlags(["--no-color"]).flags).toEqual({ color: false }));
test("parseFlags: اللي بعد -- كله positional", () => expect(parseFlags(["a", "--", "-v", "--x"])).toEqual({ flags: {}, positionals: ["a", "-v", "--x"] }));
test("parseFlags: - لوحدها (stdin) positional", () => expect(parseFlags(["-"]).positionals).toEqual(["-"]));
test("parseEnvText: تعليقات وسطور فاضية", () => expect(parseEnvText("# c\n\nPORT=4000\n")).toEqual({ PORT: "4000" }));
test("parseEnvText: علامات تنصيص و export و تعليق في نفس السطر", () => expect(parseEnvText('NAME="Sara Ali"\nexport TOKEN=abc\nGREETING=hello # inline')).toEqual({ NAME: "Sara Ali", TOKEN: "abc", GREETING: "hello" }));
test("parseEnvText: = جوه القيمة، وفاضي، و \\n جوه علامات دبل", () => expect(parseEnvText('URL=postgres://u:p@h/db?x=1\nEMPTY=\nMULTI="a\\nb"')).toEqual({ URL: "postgres://u:p@h/db?x=1", EMPTY: "", MULTI: "a\nb" }));
test("parseEnvText: سطور ويندوز \\r\\n وسطر من غير =", () => expect(parseEnvText("A=1\r\nJUNK\r\nB=2\r\n")).toEqual({ A: "1", B: "2" }));
test("maskSecret", () => expect([maskSecret("sk_live_abcdef"), maskSecret("abc"), maskSecret(""), maskSecret(undefined)]).toEqual(["sk**********ef", "***", "", ""]));`,
            solution: R`function parseFlags(argv) {
  const flags = {}, positionals = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--") { positionals.push(...argv.slice(i + 1)); break; }
    if (a.startsWith("--no-") && a.length > 5) { flags[a.slice(5)] = false; continue; }
    if (a.startsWith("--")) {
      const eq = a.indexOf("=");
      if (eq !== -1) { flags[a.slice(2, eq)] = a.slice(eq + 1); continue; }
      const next = argv[i + 1];
      if (next !== undefined && !next.startsWith("-")) { flags[a.slice(2)] = next; i++; }
      else flags[a.slice(2)] = true;
      continue;
    }
    if (a.startsWith("-") && a.length > 1) { for (const ch of a.slice(1)) flags[ch] = true; continue; }
    positionals.push(a);
  }
  return { flags, positionals };
}
function parseEnvText(text) {
  const out = {};
  for (let line of text.split(/\r?\n/)) {
    line = line.trim();
    if (!line || line.startsWith("#")) continue;
    if (line.startsWith("export ")) line = line.slice(7).trim();
    const eq = line.indexOf("=");
    if (eq <= 0) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    const q = value[0];
    if ((q === '"' || q === "'") && value.lastIndexOf(q) > 0) {
      value = value.slice(1, value.lastIndexOf(q));
      if (q === '"') value = value.replace(/\\n/g, "\n");
    } else {
      const hash = value.indexOf(" #");
      if (hash !== -1) value = value.slice(0, hash).trim();
    }
    out[key] = value;
  }
  return out;
}
function maskSecret(value) {
  const s = String(value ?? "");
  if (s.length <= 4) return "*".repeat(s.length);
  return s.slice(0, 2) + "*".repeat(s.length - 4) + s.slice(-2);
}`
          }
        },
        {
          cmd: "مسائل: النسخ و semver",
          title: "قارن نسختين، واعرف نسخة بتوافق ^ و ~ ولا لأ، وزوّد رقم النسخة: زي npm بالظبط",
          desc: R`خمس دوال بتعمل اللي npm بيعمله كل مرة تكتب [[npm install]]: [[parseVersion]] بتفك [[1.2.3-beta.1]] لأرقام، و [[compareVersions]] بترتّب نسختين، و [[satisfies(version, range)]] بتقول النسخة دي تنفع للـ range ولا لأ ([[^]] و [[~]] و [[>=]] و [[*]] والنسخة بالظبط)، و [[bump]] زي [[npm version patch]]، و [[maxSatisfying]] اللي بتختار أعلى نسخة تنفع (ده اللي npm بيعمله وهو بيسطّب).

الحالات اللي بتوقّع الناس كلها اتشافت في وحدة الأساسيات: [[1.10.0]] أكبر من [[1.9.0]] (والمقارنة كنص بتقول العكس)، و [[^0.2.3]] معناها [[<0.3.0]] مش [[<1.0.0]]، و [[^0.0.3]] معناها [[0.0.3]] بس، ونسخ الـ prerelease ([[-beta.1]]) مبتدخلش في [[^]] أصلًا. كل اختبار هنا اتطابق مع [[npx -y semver@7.7.3 -r]].`,
          example: R`function parseVersion(v) {
  const m = /^v?(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?$/.exec(String(v).trim());
  if (!m) return null;
  return { major: +m[1], minor: +m[2], patch: +m[3], pre: m[4] ?? null };
}
function compareCore(a, b) {
  const x = parseVersion(a), y = parseVersion(b);
  for (const k of ["major", "minor", "patch"]) if (x[k] !== y[k]) return x[k] > y[k] ? 1 : -1;
  return 0;
}
console.log("1.10.0" > "1.9.0", compareCore("1.10.0", "1.9.0"));
console.log(["1.2.10", "1.2.9", "1.10.0"].sort(compareCore));`,
          lines: [
            R`دالة بتفك نص نسخة لـ object بأرقام، أو [[null]] لو مش نسخة سليمة.`,
            R`الـ regex: [[v?]] حرف v اختياري ([[v1.2.3]] من git tags)، وتلات مجموعات أرقام [[(\d+)]] بينهم نقط، و [[(?:-(...))?]] جزء prerelease اختياري بعد شَرطة. و [[^...$]] يعني النص كله لازم يطابق، فـ [[1.2]] أو [[1.2.3.4]] بيرجعوا [[null]].`,
            R`مش مطابق: نرجّع [[null]] بدل ما نرمي error، والمستخدم يقرر.`,
            R`[[+m[1]]] بيحوّل النص لرقم (زي [[Number]]). ده المهم: من هنا ورايح بنقارن أرقام مش نصوص. و [[?? null]] لو مفيش prerelease.`,
            R`قفلة [[parseVersion]].`,
            R`نسخة بسيطة من المقارنة (من غير prerelease) عشان المثال: بترجّع 1 أو -1 أو 0، بالظبط اللي [[sort]] محتاجه.`,
            R`بنفك النسختين لأرقام بنفس الدالة اللي فوق.`,
            R`أول خانة مختلفة (major ثم minor ثم patch) هي اللي بتحكم: الأكبر = 1.`,
            R`كل الخانات زي بعض: 0.`,
            R`قفلة [[compareCore]].`,
            R`بيطبع [[false 1]]: كنص [["1.10.0" > "1.9.0"]] بـ [[false]] لأن [["1"]] زي [["1"]] و [["1" < "9"]] في الحرف التاني. وبالأرقام: 10 > 9 فـ 1.`,
            R`بيطبع [[[ '1.2.9', '1.2.10', '1.10.0' ]]]: [[sort]] بدالة المقارنة بيرتّب صح. من غيرها [[sort()]] بيرتّب كنصوص.`,
          ],
          teach: R`## الفكرة في سطر

النسخة **تلات أرقام** مش نص. وكل قاعدة في npm (الـ [[^]] والـ [[~]] والـ prerelease) بتتحسب على الأرقام دي. والمرجع اللي بنقارن بيه: [[npx -y semver@7.7.3]] (نفس المكتبة اللي npm بيستخدمها).

---

## ١. القواعد اللي هتكتبها

| الـ range | معناه | اتجرّب بـ semver |
|---|---|---|
| [[^4.18.2]] | [[>=4.18.2 <5.0.0]] (نفس الـ major) | [[4.18.2]] و [[4.21.0]] أيوه، و [[5.0.0]] و [[4.17.9]] لأ |
| [[~4.18.2]] | [[>=4.18.2 <4.19.0]] (نفس الـ minor) | [[4.18.9]] أيوه، و [[4.21.0]] لأ |
| [[^0.2.3]] | [[>=0.2.3 <0.3.0]] (أول رقم مش صفر هو اللي بيتقفل) | [[0.2.9]] أيوه، و [[0.3.0]] لأ |
| [[^0.0.3]] | [[0.0.3]] بس | [[0.0.4]] لأ |
| [[>=22.0.0]] | أكبر أو يساوي | زي [[engines.node]] |
| [[*]] | أي نسخة (من غير prerelease) | |
| [[4.18.2]] | بالظبط | |

والـ prerelease: [[1.3.0-beta.1]] **مش** بيوافق [[^1.2.0]] رغم إنه «أكبر» (اتجرّب: semver رجّع exit 1 ومطبعش حاجة). عشان كده [[npm install]] عمره ما هيجيبلك beta لوحده.

---

## ٢. ترتيب الـ prerelease

| المقارنة | النتيجة | ليه |
|---|---|---|
| [[2.0.0-beta.1]] و [[2.0.0]] | الـ beta أصغر | النسخة الرسمية بتيجي بعد كل التجريبي |
| [[2.0.0-beta.2]] و [[2.0.0-beta.10]] | [[beta.2]] أصغر | الجزء الرقمي ([[2]] و [[10]]) بيتقارن كرقم |
| [[1.0.0-alpha]] و [[1.0.0-alpha.1]] | [[alpha]] أصغر | الأقصر أصغر لو الباقي زي بعض |

---

## ٣. [[bump]]

[[1.2.3]] ← patch: [[1.2.4]]، و minor: [[1.3.0]] (الـ patch بيتصفّر)، و major: [[2.0.0]]. والحالة اللي الناس بتنساها: [[2.0.0-rc.1]] ← patch = [[2.0.0]] (بتشيل الـ rc بس)، زي [[npm version patch]] على نسخة rc.

---

## ٤. [[maxSatisfying]]

[[maxSatisfying(["4.17.1", "4.21.2", "4.18.2", "5.1.0"], "^4.18.0")]] = [["4.21.2"]]. ده بالظبط اللي بيحصل لما package.json فيه [[^4.18.0]] ومفيش lock: npm بيجيب لستة النسخ من [[npm view express versions]] وياخد أعلى واحدة بتوافق. ولو مفيش: [[null]] (ونفس الحالة في npm هي [[ETARGET]]، درس اقرا خطأ npm).

---

## الاختبارات (١١)

منها [[1.10.0]] مقابل [[1.9.0]]، و [[beta.2]] مقابل [[beta.10]]، وكل الحالات اللي في الجدول بنفس نتايج semver.`,
          try: R`اكتب الخمس دوال في المربع. ابدأ بـ [[parseVersion]] و [[compareVersions]] من غير prerelease لحد ما اختبارات الأرقام تعدّي، وبعدين زوّد الـ prerelease. وبعدين قارن [[satisfies]] بتاعتك بـ [[npx -y semver@7.7.3 -r "<range>" <versions...>]] على ٥ ranges من package.json عندك.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[["1.2.10", "1.2.9", "1.10.0"].sort()]] من غير دالة مقارنة. الترتيب؟`, done: R`[[[ '1.10.0', '1.2.10', '1.2.9' ]]]: ترتيب نصوص حرف بحرف، فـ [[1.10.0]] جه الأول. بالدالة: [[1.2.9، 1.2.10، 1.10.0]].` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[satisfiesCaret = (v, b) => v.split(".")[0] === b.split(".")[0] && v >= b]]. جرّبه على [[("4.9.0", "4.18.2")]] و [[("0.3.0", "0.2.3")]].`, done: R`الأولى رجّعت [[true]] (غلط: 4.9 أقل من 4.18، والمقارنة كنص) والتانية [[true]] (غلط: قاعدة الصفر). بعد ما استخدمت [[compareVersions]] وقاعدة أول رقم مش صفر الاتنين [[false]] زي semver.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** [[npm view express versions --json]] وابعته لسكربت بيستخدم [[maxSatisfying]] بتاعتك مع [[^4.18.0]] و [[~4.18.0]] و [[^5.0.0]]، وقارن بـ [[npm view express@"^4.18.0" version]].`, done: R`التلات نسخ بتوعك طابقوا اللي npm طلّعه (آخر نسخة في كل range)، والسكربت بيتجاهل نسخ الـ beta والـ rc لوحده.` },
            { lvl: 'تحدي', t: R`**مسألة:** زوّد [[satisfies]] تفهم مدى بمسافة [[">=1.2.0 <2.0.0"]] (AND) و [[||]] (OR: [["^1.0.0 || ^2.0.0"]]). اختبرها بـ [[1.1.9]] و [[1.5.0]] و [[2.0.0-beta.1]] و [[2.0.0]].`, done: R`[[">=1.2.0 <2"]] (بصيغة كاملة [[<2.0.0]]) طلّعت [[1.5.0]] بس زي [[npx semver -r]] في وحدة الأساسيات، و [[||]] بيقبل الاتنين، و ٤ اختبارات جديدة بتعدّي.` },
          ],
          deep: {
            why: R`أغلب مشاكل «اشتغلت عندي ومش عند زميلي» سببها نسخة اتغيّرت جوه range. ولما تعرف القواعد بالأرقام، بتعرف تقرا package.json وتقول «المكتبة دي ممكن تتحدّث لحد كام لوحدها»، وتفهم ليه [[^0.x]] أخطر، وليه beta مبتجيش لوحدها.`,
            how: R`semver = MAJOR.MINOR.PATCH: الـ major لتغيير بيكسر، والـ minor لميزة جديدة متوافقة، والـ patch لتصليح. والـ [[^]] بيقفل على أول رقم مش صفر من الشمال (لأن قبل 1.0 كل minor ممكن يكسر)، والـ [[~]] بيقفل على الـ minor. والمقارنة خانة خانة كأرقام، والـ prerelease أقل من النسخة نفسها، وأجزاؤه بتتقارن واحد واحد (الرقمي كرقم، والنصي كنص، والرقمي أقل من النصي). والـ ranges في npm مش بتقبل prerelease إلا لو الـ range نفسه فيه prerelease على نفس [[major.minor.patch]].`,
            when: R`فحص [[engines]] في أداة CLI (درس جهّزها للنشر)، وأداة بتقارن النسخ المتسطّبة بالـ ranges (مشروع semver-check)، و migration بتشتغل بس لو النسخة القديمة أقل من رقم معين، وأي «update checker» في أداة بتاعتك. وفي مشروع حقيقي استخدم مكتبة [[semver]] نفسها: فيها حالات تانية كتير.`,
            mistakes: R`مقارنة النسخ كنصوص ([[>]] أو [[sort()]]). ونسيان قاعدة الصفر في [[^0.x]]. واعتبار [[2.0.0-beta.1]] أكبر من [[2.0.0]]. و [[parseInt("1.2.3")]] اللي بيرجّع [[1]] بس. وقبول [[1.2]] كنسخة كاملة. ونسيان الـ [[v]] في الأول من git tags.`,
          },
          sol: R`الحل كامل تحت، وكل ناتج في الجداول من [[npx -y semver@7.7.3 -r]] على Node 24.22.1. لو اختبار [[1.10.0]] فشل انت بتقارن نصوص، ولو [[^0.2.3]] فشل نسيت قاعدة أول رقم مش صفر، ولو [[beta.2]] و [[beta.10]] فشل انت بتقارن الـ prerelease كنص كامل.`,
          solCode: R`function parseVersion(v) {
  const m = /^v?(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?$/.exec(String(v).trim());
  if (!m) return null;
  return { major: +m[1], minor: +m[2], patch: +m[3], pre: m[4] ?? null };
}
function compareVersions(a, b) {
  const x = parseVersion(a), y = parseVersion(b);
  if (!x || !y) throw new Error("invalid version");
  for (const k of ["major", "minor", "patch"]) if (x[k] !== y[k]) return x[k] > y[k] ? 1 : -1;
  if (x.pre === y.pre) return 0;
  if (x.pre === null) return 1;
  if (y.pre === null) return -1;
  const pa = x.pre.split("."), pb = y.pre.split(".");
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    if (pa[i] === undefined) return -1;
    if (pb[i] === undefined) return 1;
    const na = /^\d+$/.test(pa[i]), nb = /^\d+$/.test(pb[i]);
    if (na && nb && +pa[i] !== +pb[i]) return +pa[i] > +pb[i] ? 1 : -1;
    if (na !== nb) return na ? -1 : 1;
    if (pa[i] !== pb[i]) return pa[i] > pb[i] ? 1 : -1;
  }
  return 0;
}
function satisfies(version, range) {
  const v = parseVersion(version);
  if (!v || v.pre) return false;
  range = range.trim();
  if (range === "*" || range === "x") return true;
  const op = range[0];
  if (op === "^" || op === "~") {
    const b = parseVersion(range.slice(1));
    if (!b) return false;
    if (compareVersions(version, range.slice(1)) < 0) return false;
    if (op === "~") return v.major === b.major && v.minor === b.minor;
    if (b.major > 0) return v.major === b.major;
    if (b.minor > 0) return v.major === 0 && v.minor === b.minor;
    return v.major === 0 && v.minor === 0 && v.patch === b.patch;
  }
  if (range.startsWith(">=")) return compareVersions(version, range.slice(2)) >= 0;
  return compareVersions(version, range) === 0;
}
function bump(version, kind) {
  const v = parseVersion(version);
  if (!v) throw new Error("invalid version");
  if (kind === "major") return (v.major + 1) + ".0.0";
  if (kind === "minor") return v.major + "." + (v.minor + 1) + ".0";
  if (kind === "patch") return v.pre ? v.major + "." + v.minor + "." + v.patch : v.major + "." + v.minor + "." + (v.patch + 1);
  throw new Error("unknown kind: " + kind);
}
function maxSatisfying(list, range) {
  return list.filter(v => satisfies(v, range)).sort(compareVersions).at(-1) ?? null;
}`,
          flag: "script",
          check: {
            lang: "js",
            starter: R`function parseVersion(v) {}            // { major, minor, patch, pre } أو null
function compareVersions(a, b) {}       // 1 أو -1 أو 0
function satisfies(version, range) {}   // ^ و ~ و >= و * والنسخة بالظبط
function bump(version, kind) {}         // patch و minor و major
function maxSatisfying(list, range) {}  // أعلى نسخة أو null`,
            tests: R`test("parseVersion", () => expect([parseVersion("v1.2.3"), parseVersion("1.2"), parseVersion("2.0.0-beta.1").pre]).toEqual([{ major: 1, minor: 2, patch: 3, pre: null }, null, "beta.1"]));
test("compareVersions: أرقام مش نصوص (1.10.0 > 1.9.0)", () => expect([compareVersions("1.10.0", "1.9.0"), compareVersions("1.2.3", "1.2.3"), compareVersions("0.9.9", "1.0.0")]).toEqual([1, 0, -1]));
test("compareVersions: prerelease أقل من النسخة نفسها", () => expect([compareVersions("2.0.0-beta.1", "2.0.0"), compareVersions("2.0.0-beta.2", "2.0.0-beta.10"), compareVersions("1.0.0-alpha", "1.0.0-alpha.1")]).toEqual([-1, -1, -1]));
test("satisfies ^4.18.2 (زي npx semver -r)", () => expect(["4.18.2", "4.21.0", "5.0.0", "4.17.9"].map(v => satisfies(v, "^4.18.2"))).toEqual([true, true, false, false]));
test("satisfies ~4.18.2", () => expect(["4.18.2", "4.18.9", "4.21.0"].map(v => satisfies(v, "~4.18.2"))).toEqual([true, true, false]));
test("satisfies ^0.2.3 و ^0.0.3 (فخ الصفر)", () => expect([satisfies("0.2.9", "^0.2.3"), satisfies("0.3.0", "^0.2.3"), satisfies("0.0.3", "^0.0.3"), satisfies("0.0.4", "^0.0.3")]).toEqual([true, false, true, false]));
test("satisfies: prerelease مبيدخلش في ^ عادي", () => expect([satisfies("1.3.0-beta.1", "^1.2.0"), satisfies("1.2.1-beta.1", "^1.2.0")]).toEqual([false, false]));
test("satisfies: >= و * والنسخة بالظبط", () => expect([satisfies("22.1.0", ">=22.0.0"), satisfies("20.9.0", ">=22.0.0"), satisfies("3.1.4", "*"), satisfies("4.18.2", "4.18.2"), satisfies("4.18.3", "4.18.2")]).toEqual([true, false, true, true, false]));
test("bump", () => expect([bump("1.2.3", "patch"), bump("1.2.3", "minor"), bump("1.2.3", "major"), bump("2.0.0-rc.1", "patch")]).toEqual(["1.2.4", "1.3.0", "2.0.0", "2.0.0"]));
test("bump: نوع غلط بيرمي", () => expect(() => bump("1.0.0", "huge")).toThrow("unknown kind"));
test("maxSatisfying", () => expect([maxSatisfying(["4.17.1", "4.21.2", "4.18.2", "5.1.0"], "^4.18.0"), maxSatisfying(["1.0.0"], "^2.0.0")]).toEqual(["4.21.2", null]));`,
            solution: R`function parseVersion(v) {
  const m = /^v?(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?$/.exec(String(v).trim());
  if (!m) return null;
  return { major: +m[1], minor: +m[2], patch: +m[3], pre: m[4] ?? null };
}
function compareVersions(a, b) {
  const x = parseVersion(a), y = parseVersion(b);
  if (!x || !y) throw new Error("invalid version");
  for (const k of ["major", "minor", "patch"]) if (x[k] !== y[k]) return x[k] > y[k] ? 1 : -1;
  if (x.pre === y.pre) return 0;
  if (x.pre === null) return 1;
  if (y.pre === null) return -1;
  const pa = x.pre.split("."), pb = y.pre.split(".");
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    if (pa[i] === undefined) return -1;
    if (pb[i] === undefined) return 1;
    const na = /^\d+$/.test(pa[i]), nb = /^\d+$/.test(pb[i]);
    if (na && nb && +pa[i] !== +pb[i]) return +pa[i] > +pb[i] ? 1 : -1;
    if (na !== nb) return na ? -1 : 1;
    if (pa[i] !== pb[i]) return pa[i] > pb[i] ? 1 : -1;
  }
  return 0;
}
function satisfies(version, range) {
  const v = parseVersion(version);
  if (!v || v.pre) return false;
  range = range.trim();
  if (range === "*" || range === "x") return true;
  const op = range[0];
  if (op === "^" || op === "~") {
    const b = parseVersion(range.slice(1));
    if (!b) return false;
    if (compareVersions(version, range.slice(1)) < 0) return false;
    if (op === "~") return v.major === b.major && v.minor === b.minor;
    if (b.major > 0) return v.major === b.major;
    if (b.minor > 0) return v.major === 0 && v.minor === b.minor;
    return v.major === 0 && v.minor === 0 && v.patch === b.patch;
  }
  if (range.startsWith(">=")) return compareVersions(version, range.slice(2)) >= 0;
  return compareVersions(version, range) === 0;
}
function bump(version, kind) {
  const v = parseVersion(version);
  if (!v) throw new Error("invalid version");
  if (kind === "major") return (v.major + 1) + ".0.0";
  if (kind === "minor") return v.major + "." + (v.minor + 1) + ".0";
  if (kind === "patch") return v.pre ? v.major + "." + v.minor + "." + v.patch : v.major + "." + v.minor + "." + (v.patch + 1);
  throw new Error("unknown kind: " + kind);
}
function maxSatisfying(list, range) {
  return list.filter(v => satisfies(v, range)).sort(compareVersions).at(-1) ?? null;
}`
          }
        },
        {
          cmd: "مسائل: المسارات والروابط و routes",
          title: "normalize و join و path traversal، و query string بالعربي، و router بـ :params",
          desc: R`ست دوال بتعمل نسخ صغيرة من [[path.posix]] و [[URLSearchParams]] والـ router بتاع Express و Hono: [[normalizePosix]] بتحل [[..]] و [[.]] و [[//]]، و [[joinPosix]] زي [[path.posix.join]]، و [[isInside(root, p)]] بتمنع path traversal (درس path و import.meta.dirname)، و [[extOf]] زي [[path.extname]]، و [[parseQuery]] بتفك [[?q=%D9%84...&tag=a&tag=b]]، و [[matchRoute("/users/:id", path)]] بترجّع الـ params أو [[null]].

الحالات اللي بتوقّع: [[..]] أكتر من عدد الفولدرات، و [[/srv/uploads-old]] اللي بيبدأ بنفس حروف [[/srv/uploads]]، و [[.env]] اللي ملوش امتداد، و [[+]] اللي معناه مسافة في الـ query، ونفس المفتاح مرتين (اللي [[URLSearchParams.get]] بيرجّع أوله بس)، والـ param المتشفّر بالعربي، والـ [[/]] في آخر المسار.`,
          example: R`function matchRoute(pattern, path) {
  const a = pattern.split("/").filter(Boolean);
  const b = path.split("?")[0].split("/").filter(Boolean);
  if (a.length !== b.length) return null;
  const params = {};
  for (let i = 0; i < a.length; i++) {
    if (a[i].startsWith(":")) params[a[i].slice(1)] = decodeURIComponent(b[i]);
    else if (a[i] !== b[i]) return null;
  }
  return params;
}
console.log(matchRoute("/users/:id/posts/:pid", "/users/7/posts/3?x=1"));
console.log(matchRoute("/tags/:name", "/tags/%D9%86%D9%88%D8%AF"), matchRoute("/notes/:id", "/users/1"));`,
          lines: [
            R`دالة بتقارن pattern زي [[/users/:id]] بمسار حقيقي، وترجّع object الـ params لو مطابق أو [[null]].`,
            R`نقسم الـ pattern على [[/]] ونشيل الحتت الفاضية ([[filter(Boolean)]]): [["/users/:id"]] بتبقى [[["users", ":id"]]]، والـ [[/]] اللي في الأول والآخر مبتعملش حتت فاضية.`,
            R`نفس الحاجة للمسار، بس الأول بنشيل الـ query ([[split("?")[0]]]) عشان [[/notes/5?x=1]] تبقى [[["notes", "5"]]].`,
            R`عدد الحتت مختلف = مش نفس الـ route. ده اللي بيخلي [[/notes]] و [[/notes/5/edit]] ميطابقوش [[/notes/:id]].`,
            R`الـ params اللي هنرجّعها.`,
            R`نلف على الحتت بالترتيب.`,
            R`حتة بتبدأ بـ [[:]] = متغير: اسمه من غير النقطتين، وقيمته الحتة اللي في المسار بعد [[decodeURIComponent]] (العربي بيوصل متشفّر). خد بالك: [[decodeURIComponent]] بيرمي [[URIError: URI malformed]] على [[%E0%A4%A]] (اتجرّب)، وفي سيرفر حقيقي لازم try/catch يرجّع 400.`,
            R`حتة ثابتة لازم تبقى زي بعض بالظبط، وإلا [[null]] على طول.`,
            R`قفلة الـ loop.`,
            R`كل الحتت طابقت: نرجّع الـ params (ولو مفيش متغيرات، [[{}]]: مطابق من غير params، وده غير [[null]]).`,
            R`قفلة الدالة.`,
            R`بيطبع [[{ id: '7', pid: '3' }]]: القيم نصوص، والـ query اتشالت.`,
            R`بيطبع [[{ name: 'نود' }]] و [[null]]: الأول اتفك من [[%D9%86...]]، والتاني [[notes]] مش [[users]].`,
          ],
          teach: R`## الفكرة في سطر

المسار نص فيه [[/]]، والـ query نص فيه [[&]] و [[=]]، والاتنين ممكن يبقى فيهم أي حاجة اليوزر كتبها. قارن كل دالة بالحقيقية: [[path.posix]] و [[URLSearchParams]].

---

## ١. [[normalizePosix]] و [[joinPosix]]

~~~text اتشغّل: path.posix الحقيقي (Node 24.22.1)
path.posix.normalize("a//b/../c/./d")   →  a/c/d
path.posix.normalize("../x/../../y")    →  ../../y
path.posix.normalize("a/..")            →  .
path.posix.join("uploads", "../x")      →  x
~~~

ودالتك لازم تطلّع نفس الحاجات. القاعدة: [[.]] و [[""]] تتشال، و [[..]] تشيل اللي قبلها، ولو مفيش قبلها: في المسار المطلق ([[/..]]) بتفضل [[/]]، وفي النسبي بتفضل [[..]]. والنتيجة الفاضية = [[.]].

---

## ٢. [[isInside]]: نفس فخ [[safeJoin]]

| root | المسار | النتيجة | ليه |
|---|---|---|---|
| [[/srv/uploads]] | [[a/b.png]] | جوه | |
| [[/srv/uploads]] | [[../../etc/passwd]] | برا | الـ [[..]] طلعته |
| [[/srv/uploads]] | [[../uploads-old/x.png]] | **برا** | [[startsWith("/srv/uploads")]] لوحدها كانت هتقول جوه (درس path) |
| [[/srv/uploads]] | [[/etc/passwd]] | برا | مسار مطلق تاني |

الحل: قارن بـ [[root + "/"]] مش [[root]] بس، وبعد [[normalize]] مش قبله.

---

## ٣. [[extOf]]

زي [[path.extname]]: [[.env]] = [[""]] (اسم بيبدأ بنقطة)، و [[archive.tar.gz]] = [[.gz]]، و [[Makefile]] = [[""]]، و [[dir.v2/file]] = [[""]] (النقطة في الفولدر مش في الملف). والحروف زي ما هي ([[.MD]]): قرار الـ case مش شغل الدالة دي.

---

## ٤. [[parseQuery]] مقابل [[URLSearchParams]]

~~~text اتشغّل
new URLSearchParams("tag=a&tag=b&q=%D9%84%D8%A8%D9%86&name=sara+ali")
.get("tag")     →  a           (الأول بس!)
.getAll("tag")  →  [ 'a', 'b' ]
.get("q")       →  لبن
.get("name")    →  sara ali     (+ = مسافة)
~~~

دالتك بترجّع object، والمفتاح المتكرر بيبقى array: [[{ tag: ["a", "b", "c"] }]]. ده شكل [[req.query]] في Express. والمفتاح من غير [[=]] ([[&debug]]) قيمته [[""]].

---

## ٥. [[matchRoute]]

| pattern | المسار | الناتج |
|---|---|---|
| [[/users/:id/posts/:pid]] | [[/users/7/posts/3]] | [[{ id: "7", pid: "3" }]] |
| [[/notes/:id]] | [[/notes/5?x=1]] | [[{ id: "5" }]] |
| [[/tags/:name]] | [[/tags/%D9%86%D9%88%D8%AF]] | [[{ name: "نود" }]] |
| [[/notes/:id]] | [[/notes]] | [[null]] (عدد حتت مختلف) |
| [[/health]] | [[/health/]] | [[{}]] (مطابق من غير params) |

ده نفس اللي [[Bun.serve]] بيعمله في [[routes]] و [[URLPattern]] في Deno (وحدة Bun ووحدة Deno)، بس هما بيدعموا wildcards و regex كمان.

---

## الاختبارات (١٢)

منها [[uploads-old]]، و [[+]] مسافة، و [[tag]] ٣ مرات، و param عربي متشفّر.`,
          try: R`اكتب الست دوال في المربع. وبعدين قارن [[normalizePosix]] و [[joinPosix]] و [[extOf]] بتوعك بـ [[path.posix.normalize]] و [[path.posix.join]] و [[path.extname]] على ١٠ مسارات من مشروعك بسطر [[node -p]]، واكتب أي فرق.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[new URLSearchParams("tag=a&tag=b").get("tag")]]. وليه ده ممكن يبقى باج أمان (فكّر في [[role=user&role=admin]])؟`, done: R`[[a]] بس. ولو جزء من الكود بياخد [[get]] (الأول) وجزء تاني بياخد آخر واحد (زي بعض الـ frameworks)، الـ validation بيشوف قيمة والتنفيذ بيشوف قيمة تانية (HTTP parameter pollution).` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[matchRoute]] من غير try/catch والمسار [[/tags/%E0%A4%A]]. إيه اللي بيحصل؟ وخلي السيرفر يرد 400.`, done: R`[[decodeURIComponent]] رمى [[URIError: URI malformed]]، ولو جوه handler من غير catch كان هيرجع 500 أو يوقّع. بعد try/catch بيرجّع 400 [[bad path]].` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** [[normalizePosix]] بتاعتك و [[path.posix.normalize]] على ٢٠ مسار عشوائي (اعملهم بسكربت من حتت [[a]] و [[..]] و [[.]] و [[""]]). كام واحد اختلف؟`, done: R`السكربت بيطبع عدد الاختلافات وأول ٣ أمثلة، ووصلت لصفر اختلاف (أو كتبت سبب كل اختلاف، زي [[/..]]).` },
            { lvl: 'تحدي', t: R`**ابني:** زوّد [[matchRoute]] تفهم [[*]] في الآخر: [[/files/*]] بيطابق [[/files/a/b/c.png]] ويرجّع [[{ "*": "a/b/c.png" }]]، واستخدم [[isInside]] قبل ما تقرا الملف.`, done: R`[[/files/a/b.png]] بيرجع الـ wildcard، و [[/files/../../etc/passwd]] بيترفض من [[isInside]]، و ٤ اختبارات جديدة بتعدّي.` },
          ],
          deep: {
            why: R`أي سيرفر بيستقبل مسارات و query من الإنترنت، وأي أداة بتبني مسارات ملفات من input. والفروق الصغيرة هنا (أول قيمة ولا آخر قيمة، و [[startsWith]] من غير [[/]]، و decode بيرمي) هي اللي بتعمل ثغرات path traversal و parameter pollution وسيرفرات بتقع من request واحد غريب.`,
            how: R`الـ normalize بيستخدم stack: كل حتة عادية بتتحط، و [[..]] بتشيل اللي فوق، والنتيجة بتتلزق بـ [[/]]. والـ query بيتقسم على [[&]] وبعدين أول [[=]] في كل حتة، و [[+]] بتبقى مسافة قبل [[decodeURIComponent]] (ده تشفير الفورمات القديم [[application/x-www-form-urlencoded]]). والـ router بيقسم الاتنين لحتت ويقارن حتة بحتة، والحتة اللي بتبدأ بـ [[:]] بتتحفظ. والـ routers الحقيقية بتبني شجرة (radix tree) من كل الـ patterns عشان متلفّش عليهم كلهم مع كل request، وده سبب خطأ [[matcher is already built]] في Hono.`,
            when: R`router صغير لسيرفر [[node:http]] (مشروع «router صغير بتاعك» في السلّمة)، وأي أداة بتاخد مسار من اليوزر (رفع ملف، وتنزيل، وstatic files)، وقراية query في webhook من غير framework. وفي مشروع حقيقي: [[path]] و [[URL]] و [[URLSearchParams]] و router الـ framework، بس بعد ما تعرف بيعملوا إيه.`,
            mistakes: R`[[startsWith(root)]] من غير [[/]]. و [[normalize]] بعد الفحص مش قبله. و [[get]] على مفتاح ممكن يتكرر. ونسيان [[+]] = مسافة. و [[decodeURIComponent]] من غير try. ومقارنة المسار وفيه الـ query. و [[path.join]] (ويندوز) لمسار URL بدل [[path.posix]].`,
          },
          sol: R`الحل كامل تحت، والنواتج في الجداول من [[path.posix]] و [[URLSearchParams]] الحقيقيين على Node 24.22.1. لو [[uploads-old]] فشل: قارن بـ [[root + "/"]]. ولو [[../../y]] فشل: الـ [[..]] في المسار النسبي لازم تفضل لما مفيش حاجة قبلها.`,
          solCode: R`function normalizePosix(p) {
  const abs = p.startsWith("/");
  const out = [];
  for (const part of p.split("/")) {
    if (!part || part === ".") continue;
    if (part === "..") { if (out.length && out[out.length - 1] !== "..") out.pop(); else if (!abs) out.push(".."); continue; }
    out.push(part);
  }
  const s = out.join("/");
  return abs ? "/" + s : s || ".";
}
function joinPosix(...parts) { return normalizePosix(parts.filter(Boolean).join("/")); }
function isInside(root, p) {
  const r = normalizePosix(root), full = normalizePosix(p.startsWith("/") ? p : r + "/" + p);
  return full === r || full.startsWith(r === "/" ? "/" : r + "/");
}
function extOf(name) {
  const base = name.split("/").pop();
  const i = base.lastIndexOf(".");
  return i <= 0 ? "" : base.slice(i);
}
function parseQuery(qs) {
  const out = {};
  for (const pair of qs.replace(/^\?/, "").split("&")) {
    if (!pair) continue;
    const i = pair.indexOf("=");
    const k = decodeURIComponent((i === -1 ? pair : pair.slice(0, i)).replace(/\+/g, " "));
    const v = i === -1 ? "" : decodeURIComponent(pair.slice(i + 1).replace(/\+/g, " "));
    if (k in out) out[k] = [].concat(out[k], v); else out[k] = v;
  }
  return out;
}
function matchRoute(pattern, path) {
  const a = pattern.split("/").filter(Boolean), b = path.split("?")[0].split("/").filter(Boolean);
  if (a.length !== b.length) return null;
  const params = {};
  for (let i = 0; i < a.length; i++) {
    if (a[i].startsWith(":")) params[a[i].slice(1)] = decodeURIComponent(b[i]);
    else if (a[i] !== b[i]) return null;
  }
  return params;
}`,
          flag: "script",
          check: {
            lang: "js",
            starter: R`function normalizePosix(p) {}        // "a//b/../c" ← "a/c"
function joinPosix(...parts) {}        // زي path.posix.join
function isInside(root, p) {}          // true لو المسار جوه root
function extOf(name) {}                // زي path.extname
function parseQuery(qs) {}             // { q: "لبن", tag: ["a", "b"] }
function matchRoute(pattern, path) {}  // { id: "7" } أو null`,
            tests: R`test("normalizePosix", () => expect([normalizePosix("a//b/../c/./d"), normalizePosix("/srv/app/../../etc"), normalizePosix("../x/../../y"), normalizePosix("a/.."), normalizePosix("/")]).toEqual(["a/c/d", "/etc", "../../y", ".", "/"]));
test("joinPosix (زي path.posix.join)", () => expect([joinPosix("uploads", "../x"), joinPosix("/srv", "uploads", "a.png"), joinPosix("a", "", "b")]).toEqual(["x", "/srv/uploads/a.png", "a/b"]));
test("isInside: المسار جوه الفولدر", () => expect([isInside("/srv/uploads", "a/b.png"), isInside("/srv/uploads", "/srv/uploads"), isInside("/srv/uploads/", "x")]).toEqual([true, true, true]));
test("isInside: traversal و فولدر جنبه بنفس البداية", () => expect([isInside("/srv/uploads", "../../etc/passwd"), isInside("/srv/uploads", "../uploads-old/x.png"), isInside("/srv/uploads", "/etc/passwd")]).toEqual([false, false, false]));
test("extOf (زي path.extname)", () => expect([extOf(".env"), extOf("archive.tar.gz"), extOf("Makefile"), extOf("dir.v2/file"), extOf("a/b.MD")]).toEqual(["", ".gz", "", "", ".MD"]));
test("parseQuery: عربي متشفّر و + مسافة", () => expect(parseQuery("?q=%D9%84%D8%A8%D9%86&name=sara+ali")).toEqual({ q: "لبن", name: "sara ali" }));
test("parseQuery: نفس المفتاح مرتين = array، ومفتاح من غير قيمة", () => expect(parseQuery("tag=a&tag=b&tag=c&debug")).toEqual({ tag: ["a", "b", "c"], debug: "" }));
test("parseQuery: فاضي", () => expect([parseQuery(""), parseQuery("?")]).toEqual([{}, {}]));
test("matchRoute: params", () => expect(matchRoute("/users/:id/posts/:pid", "/users/7/posts/3")).toEqual({ id: "7", pid: "3" }));
test("matchRoute: query بيتشال، و param متشفّر", () => expect([matchRoute("/notes/:id", "/notes/5?x=1"), matchRoute("/tags/:name", "/tags/%D9%86%D9%88%D8%AF")]).toEqual([{ id: "5" }, { name: "نود" }]));
test("matchRoute: مش مطابق = null", () => expect([matchRoute("/notes/:id", "/notes"), matchRoute("/notes/:id", "/users/1"), matchRoute("/a", "/a/b")]).toEqual([null, null, null]));
test("matchRoute: من غير params = {}", () => expect(matchRoute("/health", "/health/")).toEqual({}));`,
            solution: R`function normalizePosix(p) {
  const abs = p.startsWith("/");
  const out = [];
  for (const part of p.split("/")) {
    if (!part || part === ".") continue;
    if (part === "..") { if (out.length && out[out.length - 1] !== "..") out.pop(); else if (!abs) out.push(".."); continue; }
    out.push(part);
  }
  const s = out.join("/");
  return abs ? "/" + s : s || ".";
}
function joinPosix(...parts) { return normalizePosix(parts.filter(Boolean).join("/")); }
function isInside(root, p) {
  const r = normalizePosix(root), full = normalizePosix(p.startsWith("/") ? p : r + "/" + p);
  return full === r || full.startsWith(r === "/" ? "/" : r + "/");
}
function extOf(name) {
  const base = name.split("/").pop();
  const i = base.lastIndexOf(".");
  return i <= 0 ? "" : base.slice(i);
}
function parseQuery(qs) {
  const out = {};
  for (const pair of qs.replace(/^\?/, "").split("&")) {
    if (!pair) continue;
    const i = pair.indexOf("=");
    const k = decodeURIComponent((i === -1 ? pair : pair.slice(0, i)).replace(/\+/g, " "));
    const v = i === -1 ? "" : decodeURIComponent(pair.slice(i + 1).replace(/\+/g, " "));
    if (k in out) out[k] = [].concat(out[k], v); else out[k] = v;
  }
  return out;
}
function matchRoute(pattern, path) {
  const a = pattern.split("/").filter(Boolean), b = path.split("?")[0].split("/").filter(Boolean);
  if (a.length !== b.length) return null;
  const params = {};
  for (let i = 0; i < a.length; i++) {
    if (a[i].startsWith(":")) params[a[i].slice(1)] = decodeURIComponent(b[i]);
    else if (a[i] !== b[i]) return null;
  }
  return params;
}`
          }
        },
        {
          cmd: "مسائل: المدد والأحجام و cron",
          title: "parseDuration(\"1h30m\") و formatBytes و cronMatches(\"*/15 9-17 * * 1-5\", date)",
          desc: R`أربع دوال بتقابلها في كل أداة وكل سيرفر: [[parseDuration("1h30m")]] بترجّع ms (زي [[--since 1h]] في مشروع [[jl]]، و [[expiresIn: "15m"]] في JWT)، و [[formatDuration(ms)]] بترجّع [["1h 30m"]] للّوج، و [[formatBytes(n)]] بترجّع [["68.9 MB"]]، و [[cronMatches(expr, date)]] بتقول التاريخ ده بيطابق صيغة cron ولا لأ (قلب node-cron، درس جدولة مهام).

والمهم في الحالات: [[parseDuration]] لازم **ترفض** [[1x]] و [[-1h]] و [[""]] و [[1.5h]] و [[1 h]] بـ [[null]] بدل ما ترجّع رقم غلط. و [[cronMatches]] بتستخدم [[getUTC...]] عشان الاختبارات متتغيّرش حسب جهازك (المنطقة الزمنية هي سبب نص باجات الـ cron)، وبتفهم [[*]] و [[*/15]] و [[9-17]] و [[9-17/4]] و [[9,13]]، و [[0]] و [[7]] الاتنين يوم الحد.`,
          example: R`function parseDuration(s) {
  const U = { ms: 1, s: 1000, m: 60000, h: 3600000, d: 86400000 };
  const str = String(s).trim();
  if (!/^(\d+(ms|s|m|h|d))+$/.test(str)) return null;
  let total = 0;
  for (const [, n, u] of str.matchAll(/(\d+)(ms|s|m|h|d)/g)) total += Number(n) * U[u];
  return total;
}
console.log(parseDuration("1h30m"), parseDuration("250ms"), parseDuration("1x"), parseDuration("-1h"));`,
          lines: [
            R`دالة بتحوّل نص مدة زي [["1h30m"]] لعدد ms، أو [[null]] لو الشكل غلط.`,
            R`كام ms في كل وحدة: ثانية = 1000، ودقيقة = 60000، وساعة = 3600000، ويوم = 86400000. وفي object عشان نجيب الرقم بالاسم.`,
            R`[[String(s)]] عشان لو اتبعت رقم أو [[undefined]] الدالة متقعش، و [[trim]] للمسافات اللي على الأطراف.`,
            R`الفحص الأول للشكل كله: [[^...$]] من أول النص لآخره، و [[(\d+(ms|s|m|h|d))+]] يعني «رقم وبعده وحدة» مرة أو أكتر ورا بعض. فـ [[1x]] و [[-1h]] و [[1.5h]] و [[1 h]] و [[""]] كلهم بيرجعوا [[null]] هنا. و [[ms]] قبل [[m]] في البدايل عشان [[250ms]] متتقريش [[250m]] وبعدها [[s]] زيادة.`,
            R`المجموع بيبدأ من صفر.`,
            R`[[matchAll]] بيلف على كل «رقم ووحدة»، و [[[, n, u]]] بياخد المجموعتين (الأولى هي الـ match كله واتسابت). كل حتة بتتضرب في وحدتها وتتجمع: [[1h30m]] = 3600000 + 1800000.`,
            R`بنرجّع المجموع كله بالـ ms.`,
            R`قفلة الدالة.`,
            R`بيطبع [[5400000 250 null null]]: ساعة ونص، و 250ms، والاتنين الغلط اترفضوا.`,
          ],
          teach: R`## الفكرة في سطر

اللي بيحوّل نص لرقم لازم **يرفض** الغلط مش «يحاول». [[parseInt("1x")]] بـ 1، و [[Number("")]] بـ 0 (اتجرّب)، والرقمين دول بيعدّوا من أي [[if]] وبيعملوا باج بعدين.

---

## ١. [[parseDuration]]: جدول الحالات

| المدخل | الناتج |
|---|---|
| [[30s]] و [[30m]] و [[1h]] و [[2d]] و [[250ms]] | بالترتيب: [[30000]] و [[1800000]] و [[3600000]] و [[172800000]] و [[250]] |
| [[1h30m]] و [[1d2h]] و [[1m30s]] | الحتت بتتجمع: [[5400000]] و [[93600000]] و [[90000]] |
| [[1x]] و [[-1h]] و [[""]] و [[h]] و [[1.5h]] و [[1 h]] | [[null]] كلهم لأن الشكل نفسه غلط |

---

## ٢. [[formatDuration]] و [[formatBytes]]

[[formatDuration(93784000)]] = [["1d 2h 3m 4s"]]، و [[60000]] = [["1m"]] (من غير [[0s]])، وأقل من ثانية [["500ms"]].

[[formatBytes]] بيقسم على 1024 لحد ما الرقم يبقى أقل من 1024، وبيقرّب لرقم عشري واحد:

| n | الناتج |
|---|---|
| [[0]] و [[1023]] | بالبايت زي ما هما: [["0 B"]] و [["1023 B"]] |
| [[1536]] | [["1.5 KB"]] بعد قسمة واحدة على 1024 |
| [[72235520]] (حجم [[big.log]] في درس streams) | [["68.9 MB"]] |
| [[4288 * 1024 * 1024]] (الـ heap limit في درس الذاكرة) | [["4.2 GB"]] |

> **1000 ولا 1024؟** [[ls -lh]] و Windows Explorer بيقسموا على 1024، وصانعين الهاردات و [[du --si]] على 1000. اكتب في الـ README إنت اخترت إيه.

---

## ٣. [[cronMatches]]

| الصيغة | بتطابق |
|---|---|
| [[0 9 * * *]] | 9:00 بالظبط كل يوم، و 9:01 لأ |
| [[*/15 * * * *]] | الدقايق 0 و 15 و 30 و 45 |
| [[0 9 * * 0-4]] | 9:00 من الحد للخميس: ١ نوفمبر ٢٠٢٦ (حد) أيوه، و ٦ نوفمبر (جمعة) لأ |
| [[0 9 * * 7]] | الرقم 7 معناه يوم الحد برضه |
| [[0 9,13 * * *]] | الساعة 9:00 والساعة 13:00 بس |
| [[0 9-17/4 * * *]] | 9 و 13 و 17 (كل ٤ ساعات من 9)، و 15 لأ |
| [[0 3 1 * *]] | الساعة 3:00 الفجر أول يوم في كل شهر |

كل خانة بتتفحص لوحدها، والتاريخ لازم يطابق الخمسة (AND). **فرق عن cron الحقيقي:** في [[crontab]] لما خانة يوم الشهر **و** يوم الأسبوع الاتنين مش [[*]]، الشرط بينهم بيبقى OR (من [[man 5 crontab]])، وده سبب مفاجآت كتير. التمرين هنا بيستخدم AND عشان يبقى أبسط.

وليه [[getUTCHours]] مش [[getHours]]؟ [[new Date(Date.UTC(2026, 10, 4, 9, 0))]] هو 9:00 UTC في أي جهاز. لو استخدمت [[getHours]] الاختبار هيعدّي في لندن ويقع في القاهرة (11:00). وفي الإنتاج المنطقة بتتحدد صراحة ([[timezone]] في node-cron، درس جدولة مهام).

---

## الاختبارات (١١)

منها ٦ مدخلات غلط لازم ترجع [[null]]، و [[7]] = الحد، و [[9-17/4]].`,
          try: R`اكتب الأربع دوال في المربع. وبعدين استخدم [[parseDuration]] و [[formatDuration]] في سكربت بيطبع «فاضل كام على» تاريخ معين ([[node until.mjs 2026-12-31]])، و [[cronMatches]] في loop بيطبع أول ٥ مرات هتتنفّذ فيها [[*/15 9-17 * * 1-5]] من دلوقتي.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[parseInt("1x")]] و [[Number("")]] و [[Number(" 5 ")]] و [[Number("1e3")]] و [[Number("abc")]].`, done: R`[[1]] و [[0]] و [[5]] و [[1000]] و [[NaN]] (اتجرّب على Node 24). يعني [[Number("")]] بيعدّي من [[isNaN]]، وده سبب إن [[parseDuration]] بتفحص بـ regex الأول.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** نسخة من [[parseDuration]] بـ [[(\d+)(m|ms|s|h|d)]] (الـ m قبل الـ ms). جرّب [[250ms]].`, done: R`رجّعت [[15000000]] بدل [[250]] (اتجرّب): فحص الشكل كله عدّى لأن الـ regex رجع لورا وجرّب [[ms]]، بس [[matchAll]] لقى [[250m]] الأول (ربع ساعة تقريبًا!) والـ [[s]] الباقية ملهاش رقم فاتسابت. البدايل في الـ regex بتتجرّب بالترتيب، فالأطول الأول: [[ms|s|m|h|d]].` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** لـ [[cronMatches]]: [[30 2 * * *]] بيطابق 2:30 بس، و [[0 0 29 2 *]] بيطابق ٢٩ فبراير ٢٠٢٨ ومبيطابقش أي يوم في ٢٠٢٧، و [[*/0 * * * *]] بيعمل إيه؟ (قرر وارمي error).`, done: R`الاختبارات بتعدّي، و [[*/0]] بيرمي [[step must be > 0]] بدل ما يعمل [[% 0]] = NaN ويرجّع false ساكت.` },
            { lvl: 'تحدي', t: R`**مسألة:** [[nextRun(expr, from)]] بترجّع أول [[Date]] بعد [[from]] بيطابق، بإنك تزوّد دقيقة دقيقة (بحد سنة عشان متلفّش للأبد). قارنها بـ [[getNextRun()]] بتاع node-cron بـ [[timezone: "UTC"]] (درس جدولة مهام).`, done: R`[[nextRun("0 9 * * *", new Date("2026-11-03T17:06:00Z"))]] رجّعت [[2026-11-04T09:00:00.000Z]] زي node-cron، و [[0 0 30 2 *]] (٣٠ فبراير) رجّعت [[null]] بعد سنة من غير ما تعلّق.` },
          ],
          deep: {
            why: R`المدد والأحجام بتظهر في كل config ([[timeout=30s]]، و [[maxSize=2MB]]، و [[ttl=1h]])، وغلطة واحدة فيها (ثواني بدل ms) بتعمل timeout بعد ٨ ساعات أو cache بيتمسح كل ثانية. و cron بيتكتب مرة وبيتنسى لحد ما مهمة تتنفّذ في الوقت الغلط أو متتنفّذش.`,
            how: R`[[parseDuration]] بتفحص الشكل كله بـ regex مربوط من الأول للآخر، وبعدين بتجمّع الحتت بـ [[matchAll]]. و [[formatDuration]] قسمة صحيحة متكررة من الوحدة الأكبر للأصغر (زي ما بتفك فلوس لفكة). و [[formatBytes]] قسمة على 1024 لحد ما الرقم يصغر. و [[cronMatches]] بتحوّل كل خانة لشرط: الـ [[,]] بيقسم لبدايل (OR)، والـ [[-]] مدى، والـ [[/]] خطوة محسوبة من أول المدى ([[(v - lo) % step === 0]])، والخمس خانات لازم يطابقوا مع بعض.`,
            when: R`[[--since]] و [[--timeout]] في أدوات CLI، و TTL في cache، و [[expiresIn]] في JWT، وحدود الحجم في رفع الملفات (درس رفع ملف من غير مكتبة)، وطباعة أرقام مفهومة في اللوج. و [[cronMatches]] لو بتعمل مجدول بسيط أو بتختبر صيغة قبل ما تحطها، وفي مشروع حقيقي node-cron أو croner.`,
            mistakes: R`[[parseInt]] اللي بيقبل [[1x]]. وترتيب البدايل في الـ regex ([[m]] قبل [[ms]]). و [[getHours]] بدل [[getUTCHours]] في الاختبارات. ونسيان إن [[getUTCMonth]] بيبدأ من صفر. و [[7]] للحد. و [[*/0]]. وافتراض إن 1 MB = 1000000 أو 1048576 من غير ما تكتب.`,
          },
          sol: R`الحل كامل تحت، والنواتج اتشغّلت على Node 24.22.1. لو [[250ms]] طلع 15000000 أو [[null]]: رتّب البدايل [[ms|s|m|h|d]]. ولو اختبار الحد ([[0-4]]) فشل: [[getUTCDay()]] بيرجّع 0 للحد، وتأكد إنك مش بتستخدم [[getDay]].`,
          solCode: R`function parseDuration(s) {
  const U = { ms: 1, s: 1000, m: 60000, h: 3600000, d: 86400000 };
  const str = String(s).trim();
  if (!/^(\d+(ms|s|m|h|d))+$/.test(str)) return null;
  let total = 0;
  for (const [, n, u] of str.matchAll(/(\d+)(ms|s|m|h|d)/g)) total += Number(n) * U[u];
  return total;
}
function formatDuration(ms) {
  if (ms < 1000) return ms + "ms";
  const parts = [], U = [["d", 86400000], ["h", 3600000], ["m", 60000], ["s", 1000]];
  for (const [u, size] of U) { const n = Math.floor(ms / size); if (n) { parts.push(n + u); ms -= n * size; } }
  return parts.join(" ");
}
function formatBytes(n) {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let i = 0;
  while (n >= 1024 && i < units.length - 1) { n /= 1024; i++; }
  return (i === 0 ? String(n) : String(Math.round(n * 10) / 10)) + " " + units[i];
}
function cronMatches(expr, date) {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) throw new Error("cron needs 5 fields");
  const vals = [date.getUTCMinutes(), date.getUTCHours(), date.getUTCDate(), date.getUTCMonth() + 1, date.getUTCDay()];
  const lims = [[0, 59], [0, 23], [1, 31], [1, 12], [0, 7]];
  const fieldOk = (field, v, min, max) => field.split(",").some((part) => {
    const [r, st] = part.split("/");
    const step = st ? Number(st) : 1;
    let lo, hi;
    if (r === "*") [lo, hi] = [min, max];
    else if (r.includes("-")) [lo, hi] = r.split("-").map(Number);
    else { lo = Number(r); hi = st ? max : lo; }
    return v >= lo && v <= hi && (v - lo) % step === 0;
  });
  return parts.every((f, i) => fieldOk(f, vals[i], ...lims[i]) || (i === 4 && vals[4] === 0 && fieldOk(f, 7, ...lims[4])));
}`,
          flag: "script",
          check: {
            lang: "js",
            starter: R`function parseDuration(s) {}       // "1h30m" ← 5400000، والغلط null
function formatDuration(ms) {}     // 5400000 ← "1h 30m"
function formatBytes(n) {}         // 1536 ← "1.5 KB"
function cronMatches(expr, date) {} // استخدم getUTCMinutes و getUTCHours و getUTCDate و getUTCMonth و getUTCDay`,
            tests: R`test("parseDuration: وحدة واحدة", () => expect(["30s", "30m", "1h", "2d", "250ms"].map(parseDuration)).toEqual([30000, 1800000, 3600000, 172800000, 250]));
test("parseDuration: مركّب", () => expect([parseDuration("1h30m"), parseDuration("1d2h"), parseDuration("1m30s")]).toEqual([5400000, 93600000, 90000]));
test("parseDuration: غلط = null", () => expect(["1x", "-1h", "", "h", "1.5h", "1 h"].map(parseDuration)).toEqual([null, null, null, null, null, null]));
test("formatDuration", () => expect([formatDuration(500), formatDuration(5400000), formatDuration(93784000), formatDuration(60000)]).toEqual(["500ms", "1h 30m", "1d 2h 3m 4s", "1m"]));
test("formatBytes", () => expect([formatBytes(0), formatBytes(1023), formatBytes(1536), formatBytes(72235520), formatBytes(4288 * 1024 * 1024)]).toEqual(["0 B", "1023 B", "1.5 KB", "68.9 MB", "4.2 GB"]));
test("cronMatches: كل يوم 9:00", () => expect([cronMatches("0 9 * * *", new Date(Date.UTC(2026, 10, 4, 9, 0))), cronMatches("0 9 * * *", new Date(Date.UTC(2026, 10, 4, 9, 1)))]).toEqual([true, false]));
test("cronMatches: كل ربع ساعة", () => expect([0, 15, 30, 45, 10].map(m => cronMatches("*/15 * * * *", new Date(Date.UTC(2026, 0, 1, 3, m))))).toEqual([true, true, true, true, false]));
test("cronMatches: الحد للخميس (0-4) و 7 = الحد", () => expect([cronMatches("0 9 * * 0-4", new Date(Date.UTC(2026, 10, 1, 9, 0))), cronMatches("0 9 * * 0-4", new Date(Date.UTC(2026, 10, 6, 9, 0))), cronMatches("0 9 * * 7", new Date(Date.UTC(2026, 10, 1, 9, 0)))]).toEqual([true, false, true]));
test("cronMatches: لستة ومدى بخطوة", () => expect([cronMatches("0 9,13 * * *", new Date(Date.UTC(2026, 0, 1, 13, 0))), cronMatches("0 9-17/4 * * *", new Date(Date.UTC(2026, 0, 1, 13, 0))), cronMatches("0 9-17/4 * * *", new Date(Date.UTC(2026, 0, 1, 15, 0)))]).toEqual([true, true, false]));
test("cronMatches: أول كل شهر 3 الفجر", () => expect([cronMatches("0 3 1 * *", new Date(Date.UTC(2026, 11, 1, 3, 0))), cronMatches("0 3 1 * *", new Date(Date.UTC(2026, 11, 2, 3, 0)))]).toEqual([true, false]));
test("cronMatches: عدد خانات غلط بيرمي", () => expect(() => cronMatches("* * *", new Date())).toThrow("5 fields"));`,
            solution: R`function parseDuration(s) {
  const U = { ms: 1, s: 1000, m: 60000, h: 3600000, d: 86400000 };
  const str = String(s).trim();
  if (!/^(\d+(ms|s|m|h|d))+$/.test(str)) return null;
  let total = 0;
  for (const [, n, u] of str.matchAll(/(\d+)(ms|s|m|h|d)/g)) total += Number(n) * U[u];
  return total;
}
function formatDuration(ms) {
  if (ms < 1000) return ms + "ms";
  const parts = [], U = [["d", 86400000], ["h", 3600000], ["m", 60000], ["s", 1000]];
  for (const [u, size] of U) { const n = Math.floor(ms / size); if (n) { parts.push(n + u); ms -= n * size; } }
  return parts.join(" ");
}
function formatBytes(n) {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let i = 0;
  while (n >= 1024 && i < units.length - 1) { n /= 1024; i++; }
  return (i === 0 ? String(n) : String(Math.round(n * 10) / 10)) + " " + units[i];
}
function cronMatches(expr, date) {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) throw new Error("cron needs 5 fields");
  const vals = [date.getUTCMinutes(), date.getUTCHours(), date.getUTCDate(), date.getUTCMonth() + 1, date.getUTCDay()];
  const lims = [[0, 59], [0, 23], [1, 31], [1, 12], [0, 7]];
  const fieldOk = (field, v, min, max) => field.split(",").some((part) => {
    const [r, st] = part.split("/");
    const step = st ? Number(st) : 1;
    let lo, hi;
    if (r === "*") [lo, hi] = [min, max];
    else if (r.includes("-")) [lo, hi] = r.split("-").map(Number);
    else { lo = Number(r); hi = st ? max : lo; }
    return v >= lo && v <= hi && (v - lo) % step === 0;
  });
  return parts.every((f, i) => fieldOk(f, vals[i], ...lims[i]) || (i === 4 && vals[4] === 0 && fieldOk(f, 7, ...lims[4])));
}`
          }
        },
        {
          cmd: "محاكاة: EventEmitter و LRU و rate limiter",
          title: "اكتب EventEmitter و LRU cache و rate limiter و backoff، من غير timers حقيقية",
          desc: R`أشهر أربع أسئلة انترفيو backend Node، وأربع حاجات بتستخدمها كل يوم من غير ما تشوفها: [[MiniEmitter]] نسخة من [[EventEmitter]] (درس EventEmitter في Node) فيها [[on]] و [[off]] و [[once]] و [[emit]] و [[listenerCount]]، و [[LRU(capacity)]] cache بيطرد الأقدم استخدامًا، و [[createRateLimiter({ limit, windowMs })]] زي اللي بيرجّع 429، و [[backoff(attempt)]] للـ retries (درس الـ webhooks و جدولة المهام).

والفكرة اللي بتخلي ده يتختبر: **الوقت بيدخل كـ parameter**. [[hit(key, now)]] مش بتنادي [[Date.now()]] جواها، فالاختبار بيقول «دلوقتي 0، ودلوقتي 20000» من غير ما يستنى ٢٠ ثانية. ده نفس اللي [[mock.timers]] بيعمله في [[node --test]].`,
          example: R`class LRU {
  constructor(capacity) { this.capacity = capacity; this.map = new Map(); }
  get(k) {
    if (!this.map.has(k)) return undefined;
    const v = this.map.get(k);
    this.map.delete(k);
    this.map.set(k, v);
    return v;
  }
  set(k, v) {
    if (this.map.has(k)) this.map.delete(k);
    this.map.set(k, v);
    if (this.map.size > this.capacity) this.map.delete(this.map.keys().next().value);
    return this;
  }
}
const c = new LRU(2);
c.set("a", 1).set("b", 2);
c.get("a");
c.set("c", 3);
console.log([...c.map.keys()], c.get("b"));`,
          lines: [
            R`class للـ cache بحد أقصى للعناصر.`,
            R`الحد، و [[Map]]: الـ Map بيفتكر **ترتيب الإدخال**، وده كل السر. أول مفتاح فيه = الأقدم استخدامًا.`,
            R`[[get]]: هات القيمة وعلّمها إنها «اتستخدمت دلوقتي».`,
            R`مش موجود: [[undefined]] (زي [[Map.get]]).`,
            R`بنجيب القيمة المحفوظة للمفتاح ده.`,
            R`بنشيلها من مكانها الحالي في الترتيب...`,
            R`...ونحطها تاني، فتبقى آخر واحد في الترتيب (الأحدث). [[delete]] و [[set]] الاتنين O(1)، فالـ get كله O(1).`,
            R`بنرجّع القيمة للي طلبها بعد ما بقت الأحدث.`,
            R`قفلة [[get]].`,
            R`[[set]]: حط أو حدّث.`,
            R`لو موجود نشيله الأول عشان يتحط في الآخر كأحدث واحد (من غير كده [[Map.set]] لمفتاح موجود بيسيبه في مكانه القديم).`,
            R`بنحطه في آخر الترتيب كأحدث عنصر.`,
            R`عدّينا الحد؟ [[map.keys().next().value]] أول مفتاح = الأقدم، نطرده.`,
            R`بنرجّع الـ cache نفسه ([[return this]]) عشان نقدر نكتب [[c.set(...).set(...)]] ورا بعض في سطر واحد.`,
            R`قفلة [[set]].`,
            R`قفلة الـ class.`,
            R`بنعمل cache حده عنصرين بس عشان نشوف الطرد بسرعة.`,
            R`نحط [[a]] وبعده [[b]]: الترتيب [[a, b]].`,
            R`نستخدم [[a]] فيبقى الأحدث: الترتيب [[b, a]].`,
            R`نحط [[c]]: الحجم بقى ٣، فالأقدم ([[b]]) اتطرد.`,
            R`بيطبع [[[ 'a', 'c' ] undefined]].`,
          ],
          teach: R`## الفكرة في سطر

كل واحدة من الأربعة بتحفظ «حالة» صغيرة (listeners، أو ترتيب، أو عدّاد في نافذة وقت)، والاختبار بيسأل عن الحالة دي بعد كل خطوة. والوقت والعشوائية بيدخلوا من برا عشان الاختبار يبقى ثابت.

---

## ١. [[MiniEmitter]]: نفس سلوك [[EventEmitter]] اللي قسناه

| السلوك | اللي اتشاف في درس EventEmitter (Node 24 و 22) |
|---|---|
| [[emit]] sync وبالترتيب | [[before]] ← 1 ← 2 ← [[after]] |
| [[emit]] بيرجّع | [[false]] لو مفيش listeners، و [[true]] لو فيه |
| [[error]] من غير listener | بيرمي الـ Error نفسه ([[boom]]) |
| [[off]] بدالة جديدة شكلها زي القديمة | مبيشيلش حاجة ([[listenerCount]] فضل 1) |
| [[once]] | بيشتغل مرة ويشيل نفسه |

والحالة الصعبة: listener بيعمل [[off]] لنفسه **وهو بيتنفّذ**. لو [[emit]] بيلف على الـ array الأصلي، الـ splice بيزحلق العناصر والـ listener اللي بعده بيتخطّى. الحل: [[for (const fn of [...list])]] (نسخة)، وده اللي Node بيعمله.

---

## ٢. [[LRU]]

| خطوة | الترتيب (الأقدم ← الأحدث) |
|---|---|
| [[set a]] ثم [[set b]] | [[a, b]]: بالترتيب اللي اتحطوا بيه |
| [[get a]] | [[b, a]]: الـ a بقى الأحدث |
| [[set c]] (الحد ٢) | [[a, c]] لأن الـ [[b]] كان الأقدم فاتطرد |
| [[set a = 10]] على [[a, b]] ثم [[set c]] | [[a, c]] ([[set]] لمفتاح موجود بيخليه الأحدث) |

ده نفس الـ cache اللي كان حل الـ leak في درس الذاكرة: [[Map]] بيكبر للأبد، و LRU بحد ثابت.

---

## ٣. [[createRateLimiter]]: fixed window

~~~text بـ limit 3 و windowMs 60000
hit("ip1", 0)      → { ok: true,  remaining: 2 }
hit("ip1", 1000)   → { ok: true,  remaining: 1 }
hit("ip1", 2000)   → { ok: true,  remaining: 0 }
hit("ip1", 20000)  → { ok: false, retryAfter: 40 }   ← النافذة بدأت عند 0 وبتخلص عند 60000
~~~

[[retryAfter]] بالثواني ومقرّب لفوق ([[Math.ceil]])، لأن ده اللي بيتحط في header [[retry-after]]. وكل key (IP أو يوزر) ليه نافذة لوحده. **عيب الـ fixed window:** ٣ طلبات في آخر ثانية من نافذة و ٣ في أول ثانية من اللي بعدها = ٦ في ثانيتين. الحل الأدق sliding window أو token bucket (تحدي تحت).

---

## ٤. [[backoff]]

[[base * 2 ** attempt]] بسقف: 1000 ← 2000 ← 4000 ← 8000 ← ... ← 30000. ومن غير السقف المحاولة العاشرة = [[1024000]] ms (١٧ دقيقة). وفي الإنتاج بتزوّد jitter (رقم عشوائي) عشان ١٠٠٠ client فشلوا مع بعض ميرجعوش يضربوا السيرفر مع بعض، وده بيتحط برا الدالة دي عشان تفضل قابلة للاختبار.

---

## الاختبارات (١٠)

منها الـ listener اللي بيشيل نفسه، و [[set]] لمفتاح موجود، و [[retryAfter: 40]]، والسقف.`,
          try: R`اكتب الأربعة في المربع. وبعدين استخدم [[createRateLimiter]] بـ [[Date.now()]] الحقيقي في سيرفر [[node:http]] (درس السيرفر) يرجّع 429 و [[retry-after]]، وجرّبه بـ loop من ٧ fetch.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[new Map([ ["a", 1], ["b", 2] ]).set("a", 9)]]: ترتيب المفاتيح بقى إيه؟ وليه ده مهم للـ LRU؟`, done: R`[[a, b]]: [[set]] لمفتاح موجود بيغيّر القيمة ويسيبه في مكانه. عشان كده الـ LRU بيعمل [[delete]] الأول.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[emit]] بيلف بـ [[for (const fn of this.listeners[name])]] على الـ array نفسه، و listener بيعمل [[off]] لنفسه. شغّل اختبار «بيشيل نفسه».`, done: R`الاختبار وقع: [[log]] طلع [[["a", "b"]]] بدل [[["a", "b", "b"]]]: في أول emit الـ [[a]] شال نفسه فالـ array اتزحلق والـ [[b]] اتخطّى (اتجرّب). بعد [[[...list]]] بقى [[["a", "b", "b"]]].` },
            { lvl: 'تطبيق', t: R`**محاكاة:** طلب كل 100ms لمدة ٥ ثواني (now = 0، 100، ... 4900) من نفس الـ IP، و [[limit: 10, windowMs: 1000]]. كام واحد اتقبل؟ وبعدين طلب كل 50ms.`, done: R`كل 100ms: [[50 of 50]] (١٠ في كل نافذة = الحد بالظبط). كل 50ms: [[50 of 100]] (أول ١٠ من كل ٢٠). اتجرّب، والحساب ده بيتعمل في جزء من الثانية لأن الوقت parameter.` },
            { lvl: 'تحدي', t: R`**ابني:** [[createTokenBucket({ capacity, refillPerSec })]] بـ [[take(key, now)]]: كل key بيبدأ بـ capacity توكن، وكل طلب بياخد واحد، والتوكنز بتتملا بالوقت (كسور مسموحة). اكتب اختبار بيوري الـ burst اللي بيعدّي من الـ fixed window على حدود النافذة ومبيعدّيش من الـ bucket.`, done: R`طلبات عند [[0]] و [[59900]] مرتين و [[60100]] ٣ مرات: الـ fixed window (limit 3) قبل الستة، يعني ٥ في آخر ٠.٢ ثانية. والـ bucket ([[capacity: 3, refillPerSec: 0.05]]) قبل ٤ ([[true,true,true,true,false,false]]): ٣ بس في الـ ٠.٢ ثانية دي. اتجرّب، ومن غير أي timer.` },
          ],
          deep: {
            why: R`الأربعة دول موجودين جوه أي سيرفر Node حقيقي: الـ streams والـ http server EventEmitters، والـ cache بيحمي القاعدة، والـ rate limit بيحمي السيرفر من client بايظ أو هجوم، والـ backoff بيحمي السيرفرات التانية منك. ولما تكتبهم بإيدك بتعرف حدودهم: الـ LRU في الذاكرة بيضيع مع الـ restart ومش مشترك بين النسخ، والـ fixed window بيعدّي ضعف الحد على الحدود.`,
            how: R`الـ EventEmitter = [[Map]] من اسم الحدث لـ array دوال، و [[emit]] بيلف على نسخة من الـ array. والـ LRU بيستغل إن [[Map]] بيحفظ ترتيب الإدخال: أول مفتاح الأقدم، و [[delete]] + [[set]] بينقلوا للآخر، والاتنين O(1). والـ fixed window بيحفظ لكل key بداية النافذة والعدد، ولو [[now - start >= windowMs]] بيبدأ نافذة جديدة. والـ backoff أُسّي: كل فشل الاستنا بيتضاعف لحد سقف. والوقت parameter عشان الاختبار يتحكم فيه (dependency injection للساعة).`,
            when: R`[[MiniEmitter]] لو بتكتب مكتبة لازم تشتغل في المتصفح و Node من غير [[node:events]]. و LRU لـ cache صغير في process واحد (نتايج API، و parsed config). و rate limiter في سيرفر نسخة واحدة أو أداة بتكلّم API ليه حد. ولأكتر من نسخة: Redis. و backoff في أي retry (webhooks، و fetch لـ API، و reconnect لقاعدة).`,
            mistakes: R`[[emit]] على الـ array الأصلي. و [[off]] بدالة جديدة. ونسيان [[error]] من غير listener. و LRU بـ array و [[indexOf]] (O(n)). و [[Map.set]] من غير [[delete]] لمفتاح موجود. و [[Date.now()]] جوه الدالة فالاختبار لازم يستنى. و [[retryAfter]] بالـ ms في header بيتوقّع ثواني. و backoff من غير سقف ولا jitter.`,
          },
          sol: R`الحل كامل تحت. لو اختبار «بيشيل نفسه» فشل: [[emit]] بيلف على الأصلي، استخدم [[[...list]]]. ولو [[set]] لمفتاح موجود فشل: [[delete]] قبل [[set]]. ولو [[retryAfter]] طلع 40000: قسّم على 1000 و [[Math.ceil]].`,
          solCode: R`class MiniEmitter {
  #map = new Map();
  on(name, fn) { if (!this.#map.has(name)) this.#map.set(name, []); this.#map.get(name).push(fn); return this; }
  off(name, fn) { const l = this.#map.get(name); if (l) { const i = l.indexOf(fn); if (i !== -1) l.splice(i, 1); } return this; }
  once(name, fn) { const w = (...a) => { this.off(name, w); fn(...a); }; return this.on(name, w); }
  emit(name, ...args) {
    const l = this.#map.get(name);
    if (!l || !l.length) { if (name === "error") throw args[0] instanceof Error ? args[0] : new Error("Unhandled error: " + args[0]); return false; }
    for (const fn of [...l]) fn(...args);
    return true;
  }
  listenerCount(name) { return (this.#map.get(name) ?? []).length; }
}
class LRU {
  constructor(capacity) { this.capacity = capacity; this.map = new Map(); }
  get(k) { if (!this.map.has(k)) return undefined; const v = this.map.get(k); this.map.delete(k); this.map.set(k, v); return v; }
  set(k, v) { if (this.map.has(k)) this.map.delete(k); this.map.set(k, v); if (this.map.size > this.capacity) this.map.delete(this.map.keys().next().value); return this; }
  get size() { return this.map.size; }
  keys() { return [...this.map.keys()]; }
}
function createRateLimiter({ limit, windowMs }) {
  const hits = new Map();
  return function hit(key, now) {
    let w = hits.get(key);
    if (!w || now - w.start >= windowMs) { w = { start: now, count: 0 }; hits.set(key, w); }
    w.count++;
    if (w.count <= limit) return { ok: true, remaining: limit - w.count };
    return { ok: false, retryAfter: Math.ceil((w.start + windowMs - now) / 1000) };
  };
}
function backoff(attempt, { base = 1000, max = 30000 } = {}) {
  return Math.min(max, base * 2 ** attempt);
}`,
          flag: "script",
          check: {
            lang: "js",
            starter: R`class MiniEmitter {
  on(name, fn) {}
  off(name, fn) {}
  once(name, fn) {}
  emit(name, ...args) {}
  listenerCount(name) {}
}
class LRU {
  constructor(capacity) {}
  get(k) {}
  set(k, v) {}
  get size() {}
  keys() {}
}
function createRateLimiter({ limit, windowMs }) { return function hit(key, now) {}; }
function backoff(attempt, { base = 1000, max = 30000 } = {}) {}`,
            tests: R`test("MiniEmitter: on و emit بالترتيب وبيرجّع true/false", () => {
  const e = new MiniEmitter(), log = [];
  e.on("x", (a) => log.push("1:" + a)).on("x", (a) => log.push("2:" + a));
  expect([e.emit("x", "hi"), e.emit("nobody"), log]).toEqual([true, false, ["1:hi", "2:hi"]]);
});
test("MiniEmitter: once بيشتغل مرة واحدة", () => {
  const e = new MiniEmitter(); let n = 0;
  e.once("p", () => n++); e.emit("p"); e.emit("p");
  expect([n, e.listenerCount("p")]).toEqual([1, 0]);
});
test("MiniEmitter: off بنفس الدالة بس", () => {
  const e = new MiniEmitter(); const f = () => {};
  e.on("t", f); e.on("t", () => {}); e.off("t", () => {}); e.off("t", f);
  expect(e.listenerCount("t")).toBe(1);
});
test("MiniEmitter: error من غير listener بيرمي", () => expect(() => new MiniEmitter().emit("error", new Error("boom"))).toThrow("boom"));
test("MiniEmitter: listener بيشيل نفسه وهو بيتنفّذ متبوّظش الباقي", () => {
  const e = new MiniEmitter(), log = [];
  const a = () => { log.push("a"); e.off("x", a); };
  e.on("x", a); e.on("x", () => log.push("b"));
  e.emit("x"); e.emit("x");
  expect(log).toEqual(["a", "b", "b"]);
});
test("LRU: بيطرد الأقدم استخدام", () => {
  const c = new LRU(2); c.set("a", 1).set("b", 2); c.get("a"); c.set("c", 3);
  expect([c.get("b"), c.get("a"), c.get("c"), c.size]).toEqual([undefined, 1, 3, 2]);
});
test("LRU: set لمفتاح موجود بيحدّثه ويخليه الأحدث", () => {
  const c = new LRU(2); c.set("a", 1).set("b", 2).set("a", 10).set("c", 3);
  expect(c.keys()).toEqual(["a", "c"]);
});
test("rateLimiter: ٣ في الدقيقة، والرابع مرفوض بـ retryAfter", () => {
  const hit = createRateLimiter({ limit: 3, windowMs: 60000 });
  const r = [hit("ip1", 0), hit("ip1", 1000), hit("ip1", 2000), hit("ip1", 20000)];
  expect([r.map(x => x.ok), r[3].retryAfter, r[2].remaining]).toEqual([[true, true, true, false], 40, 0]);
});
test("rateLimiter: كل مفتاح لوحده، والنافذة بتتجدد", () => {
  const hit = createRateLimiter({ limit: 1, windowMs: 1000 });
  expect([hit("a", 0).ok, hit("b", 0).ok, hit("a", 500).ok, hit("a", 1000).ok]).toEqual([true, true, false, true]);
});
test("backoff: بيتضاعف وله سقف", () => expect([0, 1, 2, 3, 10].map(n => backoff(n, { base: 1000, max: 30000 }))).toEqual([1000, 2000, 4000, 8000, 30000]));`,
            solution: R`class MiniEmitter {
  #map = new Map();
  on(name, fn) { if (!this.#map.has(name)) this.#map.set(name, []); this.#map.get(name).push(fn); return this; }
  off(name, fn) { const l = this.#map.get(name); if (l) { const i = l.indexOf(fn); if (i !== -1) l.splice(i, 1); } return this; }
  once(name, fn) { const w = (...a) => { this.off(name, w); fn(...a); }; return this.on(name, w); }
  emit(name, ...args) {
    const l = this.#map.get(name);
    if (!l || !l.length) { if (name === "error") throw args[0] instanceof Error ? args[0] : new Error("Unhandled error: " + args[0]); return false; }
    for (const fn of [...l]) fn(...args);
    return true;
  }
  listenerCount(name) { return (this.#map.get(name) ?? []).length; }
}
class LRU {
  constructor(capacity) { this.capacity = capacity; this.map = new Map(); }
  get(k) { if (!this.map.has(k)) return undefined; const v = this.map.get(k); this.map.delete(k); this.map.set(k, v); return v; }
  set(k, v) { if (this.map.has(k)) this.map.delete(k); this.map.set(k, v); if (this.map.size > this.capacity) this.map.delete(this.map.keys().next().value); return this; }
  get size() { return this.map.size; }
  keys() { return [...this.map.keys()]; }
}
function createRateLimiter({ limit, windowMs }) {
  const hits = new Map();
  return function hit(key, now) {
    let w = hits.get(key);
    if (!w || now - w.start >= windowMs) { w = { start: now, count: 0 }; hits.set(key, w); }
    w.count++;
    if (w.count <= limit) return { ok: true, remaining: limit - w.count };
    return { ok: false, retryAfter: Math.ceil((w.start + windowMs - now) / 1000) };
  };
}
function backoff(attempt, { base = 1000, max = 30000 } = {}) {
  return Math.min(max, base * 2 ** attempt);
}`
          }
        },
        {
          cmd: "بيانات: لوج JSONL و CSV",
          title: "لخّص لوج فيه سطور تالفة و BOM و \\r\\n، وافصل CSV فيه فواصل جوه علامات تنصيص",
          desc: R`تلات دوال لبيانات حقيقية الشكل: [[summarizeJsonl(text)]] بترجّع [[{ total, bad, byLevel, slowest }]] من لوج JSONL (نفس شغل أداة [[jl]] في وحدة المشروع)، و [[parseCsvLine(line)]] بتفصل سطر CSV صح، و [[groupSum(rows, key, field)]] بتجمع عمود حسب عمود تاني.

البيانات الحقيقية مش نضيفة: سطر فاضي في النص، وسطر اتقطع ([[{bad]])، و JSON سليم بس مش object ([[5]])، و BOM في أول الملف (ملفات جاية من Excel أو PowerShell 5.1)، و [[\r\n]] من ويندوز، و [[ms]] جاي نص [["slow"]] بدل رقم. وفي الـ CSV: [["Ali, Jr."]] فيه فاصلة، و [[""hi""]] علامة تنصيص جوه علامات تنصيص، وخانات فاضية في الآخر، وعربي وأرقام هندي. [[split(",")]] بيبوّظ أغلبهم.`,
          example: R`function parseCsvLine(line) {
  const out = [];
  let cur = "", inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQ) {
      if (c === '"' && line[i + 1] === '"') { cur += '"'; i++; }
      else if (c === '"') inQ = false;
      else cur += c;
    } else if (c === '"') inQ = true;
    else if (c === ",") { out.push(cur); cur = ""; }
    else cur += c;
  }
  out.push(cur);
  return out;
}
console.log("2,\"Ali, Jr.\",30".split(","), parseCsvLine('2,"Ali, Jr.",30'));
console.log(parseCsvLine('3,"He said ""hi""",,'));`,
          lines: [
            R`دالة بتاخد سطر CSV وترجّع array الخانات.`,
            R`array الخانات اللي خلصت لحد دلوقتي.`,
            R`[[cur]] الخانة اللي بنبنيها دلوقتي، و [[inQ]] هل إحنا جوه علامات تنصيص. ده «state machine» بحالتين.`,
            R`نلف على الحروف واحد واحد (بالـ index عشان نقدر نبص على الحرف اللي بعده).`,
            R`الحرف اللي بنبص عليه في اللفة دي.`,
            R`حالة «جوه علامات تنصيص»: الفاصلة هنا جزء من القيمة.`,
            R`[[""]] (علامتين ورا بعض) جوه القيمة = علامة واحدة حقيقية، و [[i++]] عشان نتخطّى التانية.`,
            R`علامة لوحدها = القيمة المتنصّصة خلصت، نرجع للحالة العادية.`,
            R`أي حرف تاني (حتى الفاصلة) بيتضاف للخانة.`,
            R`حالة عادية: علامة تنصيص = بداية قيمة متنصّصة.`,
            R`فاصلة برا علامات التنصيص = الخانة خلصت، نحطها ونبدأ واحدة جديدة فاضية.`,
            R`أي حرف تاني يتضاف.`,
            R`قفلة الـ loop.`,
            R`آخر خانة مفيش فاصلة بعدها، فبنحطها بإيدنا. ولو السطر خلص بفاصلة ([[a,]]) آخر خانة بتبقى [[""]] وده صح.`,
            R`بنرجّع array كل الخانات بالترتيب.`,
            R`قفلة الدالة.`,
            R`بيطبع [[[ '2', '"Ali', ' Jr."', '30' ]]] (٤ خانات غلط من [[split]]) و [[[ '2', 'Ali, Jr.', '30' ]]] (٣ صح).`,
            R`بيطبع [[[ '3', 'He said "hi"', '', '' ]]]: العلامات المتكررة بقت واحدة، والخانتين الفاضيين اتعدّوا.`,
          ],
          teach: R`## الفكرة في سطر

أي parser لبيانات من برا لازم **يكمّل** على السطر البايظ ويعدّه، مش يوقف الملف كله. وبيتأكد من **النوع** مش بس الشكل: JSON سليم ممكن يبقى [[5]] أو [[null]].

---

## ١. اللوج اللي في الاختبار

~~~text LOG (٨ سطور، منهم واحد فاضي)
{"level":"info","path":"/a","ms":12}
{"level":"error","path":"/pay","ms":900}

{bad
{"level":"info","path":"/b","ms":40}\r
5
\uFEFF{"level":"warn","ms":"slow"}
~~~

| السطر | بيتحسب إزاي |
|---|---|
| الفاضي | مبيتعدّش خالص (مش في [[total]]) |
| [[{bad]] | [[total]] و [[bad]] |
| [[5]] | JSON سليم بس مش object: [[bad]] |
| اللي فيه [[\r]] | [[trim]] بيشيله وبيتقري عادي |
| اللي فيه BOM | [[JSON.parse]] بيرفضه: [[SyntaxError: Unexpected token '\uFEFF'... is not valid JSON]] (اتجرّب)، فبنشيل [[\uFEFF]] الأول |
| [[ms: "slow"]] | بيتعدّ في [[warn]] بس مبيدخلش في [[slowest]] (مش رقم) |

~~~text الناتج
{ total: 6, bad: 2, byLevel: { info: 2, error: 1, warn: 1 }, slowest: { ms: 900, path: "/pay" } }
~~~

---

## ٢. CSV: ليه [[split(",")]] مش كفاية

~~~text اتشغّل
"2,\"Ali, Jr.\",30".split(",")  →  ["2","\"Ali"," Jr.\"","30"]
parseCsvLine('2,"Ali, Jr.",30')  →  ["2","Ali, Jr.","30"]
~~~

القواعد (RFC 4180 باختصار): الخانة اللي فيها فاصلة أو علامة تنصيص أو سطر جديد بتتحط بين علامتين، والعلامة جواها بتتكتب مرتين. والدالة دي بتشتغل **سطر سطر**، فمش هتفهم خانة فيها سطر جديد (ده تحدي تحت). ولملفات حقيقية: مكتبة زي [[csv-parse]].

---

## ٣. [[groupSum]]

[[groupSum([{c:"food",v:"10"}, {c:"food",v:"5.5"}, {c:"rent",v:"100"}, {c:"food",v:"abc"}], "c", "v")]] = [[{ food: 15.5, rent: 100 }]]. الـ [["abc"]] اتسابت بـ [[Number.isFinite]]، ولو كنت عملت [[+=]] على طول كانت [[food]] بقت [[NaN]] وبوّظت كل اللي بعدها. وخد بالك: [[Number("")]] = 0 فبيعدّي، فلو الخانة الفاضية معناها «مفيش» افحصها قبل.

---

## الاختبارات (١٠)

كل سطر في جدول اللوج ليه اختبار، وأربعة للـ CSV (عادي، وفاصلة جوه، و [[""]]، وعربي)، وواحد لـ [[groupSum]].`,
          try: R`اكتب التلاتة في المربع. وبعدين خد لوج JSONL حقيقي (من درس لوج الـ webhooks، أو اعمل واحد بسكربت) وشغّل [[summarizeJsonl]] على نصه، وقارن الناتج بأداة [[jl]] من وحدة المشروع.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[JSON.parse("5")]] و [[JSON.parse("null")]] و [[JSON.parse("\uFEFF{}")]] و [[JSON.parse(" {} ")]]. مين بيرمي؟`, done: R`الأول [[5]] والتاني [[null]] (سليمين!)، والتالت بيرمي [[SyntaxError]] بسبب الـ BOM، والرابع [[{}]] (المسافات مسموحة). فـ [[try/catch]] لوحده مش كفاية، لازم [[typeof o === "object" && o]].` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[groupSum]] من غير [[Number.isFinite]] على نفس الـ rows. الناتج؟`, done: R`[[food: NaN]] و [[rent: 100]]: قيمة واحدة بايظة بوّظت المجموع كله.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** صدّر شيت فيه عربي وفاصلة في خانة من Excel أو Google Sheets كـ CSV، واقرا أول ٣ سطور بـ [[parseCsvLine]]. فيه BOM؟ والفاصل [[,]] ولا [[;]]؟`, done: R`كتبت اللي لقيته (Excel بيحط BOM في «CSV UTF-8»، وبعض الإعدادات الإقليمية بتستخدم [[;]])، وظبطت الدالة تاخد الفاصل كـ parameter وتشيل الـ BOM.` },
            { lvl: 'تحدي', t: R`**مسألة:** [[parseCsv(text)]] للملف كله: خانة متنصّصة فيها سطر جديد بتفضل خانة واحدة ([['1,"line1\nline2",x']] = صف واحد ٣ خانات)، والسطر الأول headers، وترجّع array objects.`, done: R`[[parseCsv('id,note\n1,"a\nb"\n2,c')]] رجّعت [[[{ id: "1", note: "a\nb" }, { id: "2", note: "c" }]]]، و ٤ اختبارات (منهم ملف بينتهي بـ [[\n]] وملف فيه [[\r\n]]) بيعدّوا.` },
          ],
          deep: {
            why: R`أي سيرفر أو أداة بتاخد ملفات من الناس (استيراد عملا، ولوجات، وتقارير) هتقابل الحاجات دي في أول أسبوع. والأداة اللي بتوقع على سطر واحد بايظ في ملف مليون سطر أسوأ من أداة بطيئة، والأداة اللي بتطلّع [[NaN]] من غير ما تقول أسوأ من الاتنين.`,
            how: R`لوج JSONL = سطر JSON مستقل لكل حدث، فكل سطر بيتقري لوحده بـ [[JSON.parse]] جوه [[try]]، والسطر البايظ بيتعدّ ويتساب. والـ CSV محتاج state machine لأن معنى الفاصلة بيعتمد على إنت جوه علامات تنصيص ولا لأ، فمفيش regex بسيط يحله. والـ BOM حرف [[U+FEFF]] في أول الملف بيقول الـ encoding، و [[readFile(..., "utf8")]] في Node **مبيشيلهوش**، فلازم انت. و [[Number.isFinite]] بترفض [[NaN]] و [[Infinity]] والنصوص.`,
            when: R`سكربتات استيراد CSV، وأدوات لوج (jl و logwatch في السلّمة)، و endpoints بتستقبل ملفات (درس رفع ملف من غير مكتبة)، وتقارير من بيانات Excel. ولملفات كبيرة: نفس الدوال بس على سطور جاية من [[readline]] (درس streams و pipeline)، مش [[text.split]] على الملف كله.`,
            mistakes: R`[[split(",")]] للـ CSV. و [[split("\n")]] مع [[\r]] باقي. ونسيان الـ BOM. و [[JSON.parse]] من غير فحص النوع. و [[+=]] على قيم مش متأكد إنها أرقام. و [[Number("")]] = 0. وتوقيف الملف كله على أول سطر بايظ. وقراية ملف ٢ GB بـ [[readFile]] عشان تعمله [[split]].`,
          },
          sol: R`الحل كامل تحت، والنواتج اتشغّلت على Node 24.22.1. لو [[bad]] طلع 1: انت مش بتعدّ [[5]] كـ bad (افحص [[typeof o === "object"]]). ولو [[warn]] مش موجود: الـ BOM لسه في أول السطر. ولو [[slowest]] طلع [["slow"]]: افحص [[typeof o.ms === "number"]].`,
          solCode: R`function summarizeJsonl(text) {
  const res = { total: 0, bad: 0, byLevel: {}, slowest: null };
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/^\uFEFF/, "").trim();
    if (!line) continue;
    res.total++;
    let o;
    try { o = JSON.parse(line); } catch { res.bad++; continue; }
    if (!o || typeof o !== "object") { res.bad++; continue; }
    const lv = o.level ?? "unknown";
    res.byLevel[lv] = (res.byLevel[lv] ?? 0) + 1;
    if (typeof o.ms === "number" && (!res.slowest || o.ms > res.slowest.ms)) res.slowest = { ms: o.ms, path: o.path ?? null };
  }
  return res;
}
function parseCsvLine(line) {
  const out = []; let cur = "", inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQ) {
      if (c === '"' && line[i + 1] === '"') { cur += '"'; i++; }
      else if (c === '"') inQ = false;
      else cur += c;
    } else if (c === '"') inQ = true;
    else if (c === ",") { out.push(cur); cur = ""; }
    else cur += c;
  }
  out.push(cur);
  return out;
}
function groupSum(rows, key, field) {
  const out = {};
  for (const r of rows) { const k = r[key]; const n = Number(r[field]); if (!Number.isFinite(n)) continue; out[k] = (out[k] ?? 0) + n; }
  return out;
}`,
          flag: "script",
          check: {
            lang: "js",
            starter: R`function summarizeJsonl(text) {}         // { total, bad, byLevel, slowest }
function parseCsvLine(line) {}            // ["2", "Ali, Jr.", "30"]
function groupSum(rows, key, field) {}    // { food: 15.5, rent: 100 }`,
            tests: R`const LOG = '{"level":"info","path":"/a","ms":12}\n{"level":"error","path":"/pay","ms":900}\n\n{bad\n{"level":"info","path":"/b","ms":40}\r\n5\n\uFEFF{"level":"warn","ms":"slow"}\n';
test("summarizeJsonl: العدد والتالف", () => { const r = summarizeJsonl(LOG); expect([r.total, r.bad]).toEqual([6, 2]); });
test("summarizeJsonl: byLevel (والـ BOM مش بيبوّظ أول سطر فيه)", () => expect(summarizeJsonl(LOG).byLevel).toEqual({ info: 2, error: 1, warn: 1 }));
test("summarizeJsonl: الأبطأ (ms لازم رقم)", () => expect(summarizeJsonl(LOG).slowest).toEqual({ ms: 900, path: "/pay" }));
test("summarizeJsonl: فاضي", () => expect(summarizeJsonl("")).toEqual({ total: 0, bad: 0, byLevel: {}, slowest: null }));
test("summarizeJsonl: من غير level = unknown", () => expect(summarizeJsonl('{"ms":1}').byLevel).toEqual({ unknown: 1 }));
test("parseCsvLine: عادي", () => expect(parseCsvLine("1,Sara,50")).toEqual(["1", "Sara", "50"]));
test("parseCsvLine: فاصلة جوه علامات تنصيص", () => expect(parseCsvLine('2,"Ali, Jr.",30')).toEqual(["2", "Ali, Jr.", "30"]));
test("parseCsvLine: علامة تنصيص متكررة = واحدة، وخانات فاضية", () => expect(parseCsvLine('3,"He said ""hi""",,')).toEqual(["3", 'He said "hi"', "", ""]));
test("parseCsvLine: عربي", () => expect(parseCsvLine('4,"محمد, أحمد",٢٠')).toEqual(["4", "محمد, أحمد", "٢٠"]));
test("groupSum: بيتجاهل الأرقام البايظة", () => expect(groupSum([{ c: "food", v: "10" }, { c: "food", v: "5.5" }, { c: "rent", v: "100" }, { c: "food", v: "abc" }], "c", "v")).toEqual({ food: 15.5, rent: 100 }));`,
            solution: R`function summarizeJsonl(text) {
  const res = { total: 0, bad: 0, byLevel: {}, slowest: null };
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/^\uFEFF/, "").trim();
    if (!line) continue;
    res.total++;
    let o;
    try { o = JSON.parse(line); } catch { res.bad++; continue; }
    if (!o || typeof o !== "object") { res.bad++; continue; }
    const lv = o.level ?? "unknown";
    res.byLevel[lv] = (res.byLevel[lv] ?? 0) + 1;
    if (typeof o.ms === "number" && (!res.slowest || o.ms > res.slowest.ms)) res.slowest = { ms: o.ms, path: o.path ?? null };
  }
  return res;
}
function parseCsvLine(line) {
  const out = []; let cur = "", inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQ) {
      if (c === '"' && line[i + 1] === '"') { cur += '"'; i++; }
      else if (c === '"') inQ = false;
      else cur += c;
    } else if (c === '"') inQ = true;
    else if (c === ",") { out.push(cur); cur = ""; }
    else cur += c;
  }
  out.push(cur);
  return out;
}
function groupSum(rows, key, field) {
  const out = {};
  for (const r of rows) { const k = r[key]; const n = Number(r[field]); if (!Number.isFinite(n)) continue; out[k] = (out[k] ?? 0) + n; }
  return out;
}`
          }
        },
        {
          cmd: "ابني بنفسك: ٦ أدوات Node",
          title: "todo بيحفظ بأمان، ومراقب فولدر، و API باختبارات، وفاحص روابط، و tail للوج، وباك أب بيدوّر",
          desc: R`ست أدوات صغيرة بتتبني من الصفر بكل اللي اتعلمته في التاب، كل واحدة بمواصفات واختبارات قبول («تعرف إنك خلصت لما...») ومن غير مكتبات. الأولى (todo) محلولة كاملة تحت كمثال للشكل، والخمسة الباقيين عليك:

١. **[[todo]]**: CLI بيخزّن JSON بأمان (tmp ثم rename)، وأكواد خروج صح.
٢. **[[watch-run]]**: بيراقب فولدر ويشغّل أمر لما ملف يتغيّر، بـ debounce ومن غير تداخل.
٣. **[[notes-api]]**: API بـ [[node:http]] واختبارات [[node:test]] على [[listen(0)]].
٤. **[[linkcheck]]**: بيقرا روابط من ملف ويفحصها بـ [[fetch]] و timeout و ٥ مع بعض بس.
٥. **[[tailf]]**: زي [[tail -f]]: بيطبع السطور الجديدة في لوج وهو بيكبر.
٦. **[[rotate-backup]]**: بيعمل نسخة مضغوطة من فولدر ويسيب آخر N بس.

كل أداة فيها [[--help]]، و exit 0 للنجاح و 1 للفشل و 2 للاستخدام الغلط، وبتشتغل على ويندوز ولينكس.`,
          example: R`import { readFile, writeFile, rename } from "node:fs/promises";
import path from "node:path";

const FILE = process.env.TODO_FILE ?? path.join(import.meta.dirname, "todos.json");
const [cmd, ...rest] = process.argv.slice(2);

async function load() {
  try {
    return JSON.parse(await readFile(FILE, "utf8"));
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw new Error(FILE + " بايظ: " + err.message);
  }
}
async function save(list) {
  await writeFile(FILE + ".tmp", JSON.stringify(list, null, 2) + "\n");
  await rename(FILE + ".tmp", FILE);
}

const list = await load();
if (cmd === "add" && rest.length) {
  list.push({ id: (list.at(-1)?.id ?? 0) + 1, text: rest.join(" "), done: false });
  await save(list);
  console.log("added #" + list.at(-1).id);
} else if (cmd === "done" && Number.isInteger(Number(rest[0]))) {
  const t = list.find((x) => x.id === Number(rest[0]));
  if (!t) { console.error("مفيش مهمة رقم " + rest[0]); process.exitCode = 1; }
  else { t.done = true; await save(list); console.log("done #" + t.id); }
} else if (cmd === "list" || cmd === undefined) {
  for (const t of list) console.log((t.done ? "[x] " : "[ ] ") + t.id + ". " + t.text);
} else {
  console.error("usage: todo add <text> | done <id> | list");
  process.exitCode = 2;
}`,
          lines: [
            R`[[readFile]] و [[writeFile]] و [[rename]] من نسخة الـ promises (درس fs/promises): الكتابة الآمنة محتاجة الاتنين الأخرانيين.`,
            R`[[path]] عشان نبني مسار الملف جنب السكربت بالفاصل الصح لكل نظام.`,
            R`مكان الملف: من [[TODO_FILE]] لو موجود (مفيد في الاختبارات عشان متلمسش ملفك الحقيقي)، وإلا [[todos.json]] جنب السكربت نفسه ([[import.meta.dirname]]) مش في الفولدر اللي انت واقف فيه.`,
            R`أول كلمة بعد اسم السكربت هي الأمر ([[add]] أو [[done]] أو [[list]])، والباقي في [[rest]]. ([[slice(2)]] عشان نشيل مسار node ومسار السكربت.)`,
            R`دالة بتقرا اللستة من الملف.`,
            R`try لأن القراية والـ parse الاتنين ممكن يرموا.`,
            R`بنقرا الملف كنص ونحوّله لـ array.`,
            R`أي خطأ بيوصل هنا.`,
            R`الملف مش موجود = أول مرة: لستة فاضية مش crash.`,
            R`أي خطأ تاني (JSON بايظ أو صلاحيات) بنرمي رسالة فيها اسم الملف، و **مبنكتبش فوقه**: لو رجّعنا [[[]]] وكمّلنا، أول [[add]] كان هيمسح كل المهام القديمة.`,
            R`قفلة الـ catch.`,
            R`قفلة [[load]].`,
            R`دالة الحفظ الآمن على الديسك.`,
            R`بنكتب في ملف مؤقت جنبه الأول. لو العملية اتقطعت في النص، الملف الأصلي سليم.`,
            R`[[rename]] بيبدّل الملف المؤقت مكان الأصلي حتة واحدة، فمفيش لحظة الملف فيها نص مكتوب.`,
            R`قفلة [[save]].`,
            R`بنقرا اللستة مرة في الأول (top-level await مسموح في [[.mjs]]).`,
            R`[[add]] ومعاه كلام: نضيف مهمة.`,
            R`الـ id = آخر id + 1 (و [[?.]] و [[?? 0]] لو اللستة فاضية)، والنص = كل الكلمات اللي بعد [[add]] (فـ [[todo add اشتري لبن]] من غير علامات تنصيص بتشتغل)، و [[done: false]].`,
            R`بنحفظ اللستة كلها بالطريقة الآمنة.`,
            R`نطبع الرقم اللي اتعمل: [[added #1]].`,
            R`[[done]] ومعاه رقم صحيح: [[Number.isInteger(Number(...))]] بيرفض [[abc]] و [[1.5]] و الفاضي.`,
            R`ندوّر على المهمة بالـ id.`,
            R`مش موجودة: رسالة على stderr و exit 1 (فشل، مش استخدام غلط).`,
            R`موجودة: نعلّمها ونحفظ ونطبع.`,
            R`[[list]] أو من غير أمر خالص: نطبع اللستة.`,
            R`كل مهمة في سطر: [[[x]]] أو [[[ ]]] ورقمها ونصها.`,
            R`أي حاجة تانية (أمر مش معروف، أو [[add]] من غير كلام):`,
            R`سطر الاستخدام على stderr...`,
            R`...و exit 2 = «استخدمتني غلط» (درس exit codes و process.exitCode).`,
            R`قفلة الـ [[if]].`,
          ],
          teach: R`## ١. [[todo]] (المحلولة)

~~~text اتشغّل (ويندوز، و [[add "test linux"]] في node:22-slim)
node todo.mjs add اشتري لبن     →  added #1
node todo.mjs add "ذاكر streams" →  added #2
node todo.mjs done 1             →  done #1
node todo.mjs list               →  [x] 1. اشتري لبن
                                    [ ] 2. ذاكر streams
node todo.mjs done 9             →  مفيش مهمة رقم 9          (exit 1)
node todo.mjs remove 1           →  usage: todo add ...       (exit 2)
~~~

ولو [[todos.json]] بايظ ([[{bad]]):

~~~text
Error: ...todos.json بايظ: Expected property name or '}' in JSON at position 1 (line 1 column 2)
~~~

و exit 1، والملف زي ما هو. **ده أهم سطر في الأداة:** النسخة اللي بتعمل [[catch { return [] }]] لكل الأخطاء كانت هتمسح المهام القديمة مع أول [[add]].

---

## ٢. [[watch-run <dir> -- <cmd...>]]

- **بيعمل:** بيراقب الفولدر بـ [[fs.watch]] (recursive)، ولما ملف يتغيّر يستنى 200ms هدوء ويشغّل الأمر بـ [[spawn]] و [[stdio: "inherit"]]. لو الأمر لسه شغال من المرة اللي فاتت: يقفله بـ SIGTERM ويستنى [[close]] قبل ما يبدأ تاني.
- **بيتجاهل:** [[node_modules]] و [[.git]] والملفات اللي بتبدأ بنقطة أو بتنتهي بـ [[~]] (درس fs.watch).
- **اختبار القبول:** حفظ ملف من VS Code (حدثين) = تشغيل واحد، و ١٠ ملفات اتعملوا مع بعض = تشغيل واحد، و Ctrl+C بيقفل الأمر الشغال والمراقب الاتنين (exit 0).
- **من دروس:** fs.watch، و execFile و spawn، و SIGINT و SIGTERM، و [[--watch]] اللي جوه Node (قارن سلوكه).

---

## ٣. [[notes-api]]

- **بيعمل:** سيرفر درس [[node:http سيرفر من غير مكتبة]] + [[GET/DELETE /notes/:id]] بـ [[matchRoute]] من بنك المسارات، وحفظ في [[notes.json]] بـ [[save]] الآمنة اللي فوق، و [[/health]].
- **الاختبارات:** ملف [[api.test.mjs]] بـ [[before]] بيشغّل السيرفر على [[listen(0)]] و [[TODO_FILE]] مؤقت، و ١٠ اختبارات (كل status في جدول الدرس + [[:id]] + إن الداتا اتحفظت بعد restart).
- **اختبار القبول:** [[node --test]] بيعدّي على Node 22 و 24 في أقل من ثانيتين ومبيسيبش ملفات.

---

## ٤. [[linkcheck <file>]]

- **بيعمل:** بيقرا URLs (سطر لكل واحد، أو من ملف Markdown بـ regex [[https?://\S+]])، ويفحص كل واحد بـ [[fetch(url, { method: "HEAD", signal: AbortSignal.timeout(5000) })]] (ولو 405 يجرّب GET)، **٥ مع بعض بس** (درس event loop: [[mapLimit]])، ويطبع جدول: الكود، والوقت، والـ redirect لو حصل.
- **اختبار القبول:** ٢٠ رابط خدوا حوالي ٤ أضعاف وقت أبطأ واحد مش ٢٠ ضعف، ورابط بيعلّق اتقطع بعد ٥ ثواني بـ [[TimeoutError]]، و exit 1 لو أي رابط مش 2xx. اختبرها على سيرفر محلي بيرجّع 200 و 404 و بيعلّق، مش على مواقع ناس.

---

## ٥. [[tailf <file>]]

- **بيعمل:** بيطبع آخر ١٠ سطور، وبعدين كل سطر جديد بيتضاف. بيحفظ آخر مكان قراه (offset بالبايت)، ولما الملف يكبر بيقرا من الـ offset لآخره بـ [[createReadStream(file, { start })]]، ولو الملف صغر (اتعمله rotate أو truncate) بيبدأ من الأول.
- **الفخ:** آخر حتة ممكن تبقى سطر ناقص (لسه بيتكتب)، فاحتفظ بيها لحد ما الـ [[\n]] بتاعها ييجي (درس streams).
- **اختبار القبول:** سكربت تاني بيكتب سطر كل 100ms، و [[tailf]] بيطبعهم كلهم من غير تكرار ومن غير سطر مقسوم، و [[> app.log]] (تفريغ) بيخليه يكمّل من الأول.

---

## ٦. [[rotate-backup <dir> --keep 5]]

- **بيعمل:** بيعمل [[backup-<تاريخ>.tar.gz]] بـ [[tar]] (أو zip في PowerShell على ويندوز) بـ [[spawn]] (مش [[exec]]: درس command injection)، ويتأكد إن الملف اتعمل وحجمه أكبر من صفر، ويمسح الأقدم ويسيب آخر 5، ولوج JSONL لكل تشغيل.
- **اختبار القبول:** ٧ تشغيلات = ٥ ملفات، و فولدر مش موجود = exit 1 من غير ملف فاضي، وفولدر اسمه فيه مسافة وعربي بيشتغل.

---

## إزاي تقيّم نفسك

| السؤال | لازم الإجابة |
|---|---|
| شغّلتها مرتين ورا بعض؟ | نفس النتيجة، ومفيش ملفات زيادة |
| قفلتها في النص؟ | مفيش ملف ناقص ولا بروسيس شغال |
| ادّيتها input غلط؟ | رسالة سطر واحد و exit 2 |
| على ويندوز ولينكس؟ | الاتنين (Docker للينكس) |`,
          try: R`احفظ [[todo.mjs]] وجرّب الأوامر اللي في الشرح، وبعدين اكتب [[{bad]] في [[todos.json]] واتأكد إن الملف متمسحش بعد [[add]]. وبعدين ابدأ بأداة [[watch-run]] لأنها أصغر واحدة.`,
          practice: [
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** غيّر [[load]] في [[todo.mjs]] لـ [[catch { return []; }]] (من غير فحص [[ENOENT]])، واكتب [[{bad]] في الملف، وبعدين [[add test]]. إيه اللي حصل للمهام القديمة؟`, done: R`اتمسحت كلها: الملف بقى فيه [[test]] بس. ده الفرق بين «الملف مش موجود» (أول مرة) و «الملف بايظ» (مشكلة لازم توقف).` },
            { lvl: 'تطبيق', t: R`**ابني:** [[watch-run]] بالمواصفات اللي في الشرح، واختبره بحفظ ملف من VS Code و ١٠ ملفات مع بعض.`, done: R`تشغيل واحد في كل حالة، والأمر القديم اتقفل قبل الجديد، و Ctrl+C قفل الاتنين بـ exit 0.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[notes-api]] باختباراته العشرة على [[listen(0)]] وملف مؤقت.`, done: R`[[node --test]] طبع [[ℹ pass 10]] و [[ℹ fail 0]] على Node 24 وفي [[node:22-slim]]، ومفيش [[notes.json]] فاضل بعد الاختبارات.` },
            { lvl: 'تحدي', t: R`**ابني:** [[linkcheck]] بحد ٥ مع بعض، واختبره بسيرفر محلي فيه [[/ok]] و [[/missing]] (404) و [[/slow]] (بيعلّق ٣٠ ثانية).`, done: R`[[/slow]] اتقطع بعد ٥ ثواني بـ [[TimeoutError]]، والـ exit 1 بسبب الـ 404 والـ timeout، وأقصى عدد طلبات مفتوحة مع بعض (اطبعه) ٥.` },
            { lvl: 'تحدي', t: R`**ابني:** [[tailf]] واختبره بسكربت بيكتب سطر كل 100ms لمدة ١٠ ثواني، وفي النص اعمل truncate للملف.`, done: R`عدد السطور اللي طبعها = عدد السطور اللي اتكتبت، ومفيش سطر مقسوم ولا مكرر، وبعد الـ truncate كمّل من الأول.` },
            { lvl: 'تحدي', t: R`**ابني:** [[rotate-backup]] بـ [[--keep]] و [[--dry-run]] ولوج JSONL، واختبره على فولدر اسمه [[صور العيلة 2026]].`, done: R`٧ تشغيلات = ٥ ملفات بالظبط، و [[--dry-run]] بيطبع اللي هيتمسح من غير ما يمسح، والفولدر بالمسافة والعربي اشتغل لأن الاسم اتبعت كـ arg لـ [[spawn]] مش جوه نص shell.` },
          ],
          deep: {
            why: R`الدروس بتعلّم أداة أداة، والشغل الحقيقي بيحتاجهم مع بعض: fs و child_process و streams و الإشارات و exit codes في نفس الملف. والأدوات الست دي بالظبط النوع اللي بتكتبه في أول سنة شغل (ومنها نسخ صغيرة من nodemon و tail و linkinator)، وكل واحدة فيها فخ حقيقي لازم تعدّيه.`,
            how: R`كل أداة بنفس الهيكل: parse للـ arguments في الأول (ولو غلط: usage و exit 2)، وبعدين الشغل الأساسي جوه try، والأخطاء المتوقعة ليها رسالة سطر واحد و exit 1، والإشارات (SIGINT و SIGTERM) بتوقّف الشغل الجديد وتستنى الحالي. والكتابة على الديسك دايمًا tmp ثم rename. والتوازي دايمًا بحد. والوقت والمسارات بتدخل من برا ([[TODO_FILE]]، و [[listen(0)]]) عشان الاختبارات تشتغل من غير ما تلمس حاجتك الحقيقية.`,
            when: R`[[todo]] و [[rotate-backup]] أي أداة بتخزّن حالة على الديسك. و [[watch-run]] أي حاجة «لما يتغيّر اعمل». و [[notes-api]] نقطة البداية لأي API داخلي. و [[linkcheck]] لأي حاجة بتكلّم شبكة كتير (scraping، أو health checks، أو مزامنة). و [[tailf]] لأي حاجة بتتابع ملف بيكبر (لوجات، و CSV بيتكتب).`,
            mistakes: R`[[catch { return [] }]] اللي بيمسح الداتا. و [[writeFile]] على الملف الأصلي على طول. و [[exec]] بنص فيه اسم فولدر. و [[Promise.all]] على ٢٠٠ رابط. و [[fs.watch]] من غير debounce. و tail بيقرا الملف كله كل مرة. ونسيان إن الأداة ممكن تتشغّل مرتين مع بعض (lock). و [[process.exit]] اللي بيقطع الكتابة (درس exit codes).`,
          },
          sol: R`[[todo.mjs]] اتشغّل على Node 24.22.1 (ويندوز) و Node 22.23.3 (Docker) والنواتج في الشرح. والخمس أدوات الباقية مواصفات من غير حل جاهز عشان انت اللي تبنيهم، وكل اختبار قبول فيهم بيتقاس بأمر أو برقم.`,
          solCode: R`# اختبر todo من غير ما تلمس ملفك الحقيقي
TODO_FILE=/tmp/t.json node todo.mjs add one
TODO_FILE=/tmp/t.json node todo.mjs done 1
TODO_FILE=/tmp/t.json node todo.mjs list
# [x] 1. one`,
          flag: "script",
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`import { writeFileSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
writeFileSync("todo.mjs", [
  'import { readFile, writeFile, rename } from "node:fs/promises";',
  'const FILE = process.env.TODO_FILE;',
  'const [cmd, ...rest] = process.argv.slice(2);',
  'async function load() { try { return JSON.parse(await readFile(FILE, "utf8")); } catch (err) { if (err.code === "ENOENT") return []; throw new Error("bad file"); } }',
  'async function save(l) { await writeFile(FILE + ".tmp", JSON.stringify(l)); await rename(FILE + ".tmp", FILE); }',
  'const list = await load();',
  'if (cmd === "add" && rest.length) { list.push({ id: (list.at(-1)?.id ?? 0) + 1, text: rest.join(" "), done: false }); await save(list); console.log("added #" + list.at(-1).id); }',
  'else if (cmd === "done") { const t = list.find((x) => x.id === Number(rest[0])); if (!t) { console.error("no task"); process.exitCode = 1; } else { t.done = true; await save(list); console.log("done #" + t.id); } }',
  'else if (cmd === "list") { for (const t of list) console.log((t.done ? "[x] " : "[ ] ") + t.id + ". " + t.text); }',
  'else { console.error("usage"); process.exitCode = 2; }',
].join("\n"));
const env = { ...process.env, TODO_FILE: path.resolve("t.json") };
const run = (...a) => spawnSync(process.execPath, ["todo.mjs", ...a], { encoding: "utf8", env });
run("add", "one"); run("add", "two"); run("done", "1");
console.log(run("list").stdout.trim().replace(/\r?\n/g, " | "));
console.log("missing exit:", run("done", "9").status, "usage exit:", run("remove").status);
writeFileSync("t.json", "{bad");
console.log("bad file exit:", run("add", "x").status, "file kept:", readFileSync("t.json", "utf8") === "{bad");`, expect: [R`[x] 1. one | [ ] 2. two`, R`missing exit: 1 usage exit: 2`, R`bad file exit: 1 file kept: true`] },
          ],
        }
      ]
    }
]);
