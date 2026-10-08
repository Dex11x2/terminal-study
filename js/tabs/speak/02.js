// تكملة تاب speak: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/speak/01.js (شرح حقول الدرس في أوله)
MORE("speak", [
    {
      t: "كلمات تقنية بننطقها غلط",
      l: 1,
      n: "cache و queue و height، وأسماء الأدوات (Nginx و Kubernetes و Azure و Vite)، و algorithm و determine، والحروف الساكتة، والاختصارات: بتتقري حروف ولا كلمة",
      items: [
        {
          cmd: "cache و queue و suite",
          title: "cache و queue و suite و height و width و route و data: بتتقال إزاي؟",
          desc: R`دي كلمات بتتكرر كل يوم، وأغلبنا بيقولها غلط لأننا اتعلمناها من الكتابة. الأخبار الحلوة: قايمة قصيرة، ولو صلحتها هتبان فورًا.

[[cache]] = «كاش» /kæʃ/ زي [[cash]] بالظبط (مش «كاتش» ولا «كاشيه»). [[queue]] = «كيو» /kjuː/ زي حرف [[Q]] (مش «كويو»). [[suite]] (test suite) = «سويت» /swiːt/ زي [[sweet]] (مش «سوت»، دي [[suit]] البدلة). [[height]] = «هايت» /haɪt/ آخرها «ت» (مش «هايث»). [[width]] = «ويدث» /wɪdθ/ بكسرة قصيرة (مش «وايدث»). [[route]] فيها نطقين مقبولين: «روت» /ruːt/ و «راوت» /raʊt/ (الأمريكان بيقولوا [[router]] «راوتر» غالبًا). [[data]] برضو نطقين مقبولين: «ديْتا» /ˈdeɪtə/ و «داتا» /ˈdætə/ أو /ˈdɑːtə/: كلمة «داتا» المصري مقبولة.`,
          example: R`cache = كاش /kæʃ/ (= cash)          queue = كيو /kjuː/ (= Q)
suite = سويت /swiːt/ (= sweet)      suit = سوت /suːt/ (clothes, not tests)
height = هايت /haɪt/ (ends in t)    width = ويدث /wɪdθ/ (short i, then d + th)
route = روت /ruːt/ or راوت /raʊt/   router = راوتر /ˈraʊtər/ (US) or روتر (UK)
data = ديْتا /ˈdeɪtə/ or داتا /ˈdætə/ — both are fine
Sentence 1:  Clear the cache and restart the queue worker.
Sentence 2:  The test suite checks the height and width of the image.
Sentence 3:  This route returns the user data.`,
          try: R`اسمع الـ ٧ كلمات في Google ([[how to pronounce ...]]) وبعدين سجّل الجمل الـ ٣. وبعدين قول الجملة دي بسرعة ٣ مرات: [[The queue caches the route data, and the suite tests the width and height.]]`,
          flag: "script",
          deep: {
            why: R`[[cache]] و [[queue]] و [[route]] و [[data]] بتتقال في كل اجتماع تقني تقريبًا، والانترفيو فيه أسئلة كاملة عنهم («How would you cache this?»، «Why use a queue?»). لو قلت «كويو» ٥ مرات في إجابة، الإنترفيوير هيركز في النطق مش في الإجابة.`,
            how: R`[[cache]]: الحروف [[che]] في الآخر ساكتة الـ e، والـ [[ch]] هنا «ش» (جاية من الفرنساوي). ومنها [[cached]] = «كاشْت» و [[caching]] = «كاشِنگ». و [[cache-control]] = «كاش كنترول».

[[queue]]: «كيو»، والجمع [[queues]] = «كيوز»، و [[enqueue]] = «إن-كيو»، و [[dequeue]] = «دي-كيو». والطريقة السهلة تفتكرها: هي حرف [[Q]].

[[suite]] vs [[suit]]: [[test suite]] = «تست سويت». و [[suit]] البدلة (وفعل [[suits me]] = يناسبني) = «سوت». وكمان [[sweet]] = «سويت» نفس نطق [[suite]].

[[height]] vs [[weight]]: الاتنين آخرهم «ت». المصري بيقول «هايث» عشان الـ [[width]] و [[length]] آخرهم «ث». اتعلمهم كمجموعة: [[width]] ث، [[length]] ث، [[depth]] ث، [[height]] ت.`,
            when: "أي كلام عن الأداء (cache)، أو الـ background jobs (queue)، أو الاختبارات (suite)، أو CSS (height و width)، أو الـ backend (route و data).",
            mistakes: R`«كاتش» (دي [[catch]] زي try/catch، كلمة تانية خالص!). و «كاشيه» (دي كلمة فرنساوي [[cachet]] معناها حاجة تانية). و «كويو». و «سوت تيست». و «هايث» و «وايدث». وخلي بالك: [[catch]] «كاتش» و [[cache]] «كاش» الاتنين بيتقالوا في نفس الموضوع أحيانًا، فالغلط هنا بيلخبط بجد.`
          },
          teach: R`## الفكرة: ٧ كلمات، وكل واحدة ليها «توأم» يفكّرك بنطقها

المثال ٥ سطور «كلمة = نطق (توأم)» و ٣ جمل. أسهل طريقة تحفظ النطق إنك تربطه بكلمة تانية انت عارفها.

---

## ١. السطور الخمسة

| الكلمة | النطق | التوأم | الغلط المصري |
|---|---|---|---|
| [[cache]] | «كاش» | [[cash]] فلوس | «كاتش» (دي [[catch]]) أو «كاشيه» |
| [[queue]] | «كيو» | حرف [[Q]] | «كويو» |
| [[suite]] | «سويت» | [[sweet]] | «سوت» (دي [[suit]] البدلة) |
| [[height]] | «هايت» آخرها ت | [[weight]] | «هايث» |
| [[width]] | «وِدث» كسرة قصيرة | | «وايدث» |
| [[route]] | «روت» أو «راوت» | [[root]] أو [[out]] | |
| [[data]] | «ديْتا» أو «داتا» | | |

اتراجع على Wiktionary وقت كتابة الشرح: [[cache]] بريطاني [[/kæʃ/]] بس، والأمريكي [[/kæʃ/]] وفيه كمان [[/keɪʃ/]] «كيْش» أقل انتشارًا. فـ «كاش» هو الأأمن. و [[queue]] [[/kjuː/]] = حرف Q. و [[suite]] [[/swiːt/]] = نفس نطق [[sweet]]. و [[width]] ليه كذا شكل، منهم [[/wɪdθ/]] و [[/wɪtθ/]] و [[/wɪθ/]]، وكلهم كسرة قصيرة مش «واي».

> ليه [[cache]] و [[catch]] بالذات خطر؟ لأن الاتنين بيتقالوا في نفس الكلام: [[catch the error]] و [[cache the result]]. لو قلت «كاتش» للتانية، اللي قدامك هيفهم try/catch.

[[height]] و [[width]] بيتلخبطوا لأن [[width]] و [[length]] و [[depth]] آخرهم «ث»، و [[height]] لوحدها آخرها «ت». احفظهم مجموعة.

[[route]] و [[data]] ليهم نطقين مقبولين؛ الشرط الوحيد إنك تثبت على واحد في نفس الكلام.

---

## ٢. الجمل

~~~text Sentence 1
Clear the cache and restart the queue worker.
~~~

[[Clear]] = امسح. [[queue worker]] = البرنامج اللي بيسحب الشغل من الطابور وينفّذه. [[restart]] الضغط على [[START]].

~~~text Sentence 2
The test suite checks the height and width of the image.
~~~

[[test suite]] = «تِست سويت»: مجموعة الاختبارات. [[height]] بالتاء و [[width]] بالدال والثاء.

~~~text Sentence 3
This route returns the user data.
~~~

[[route]] هنا endpoint في الـ backend. قولها «روت» أو «راوت»، و [[data]] «ديْتا» أو «داتا».

ومشتقات بتتقال كتير: [[cached]] «كاشْت»، و [[caching]] «كاشِنگ»، و [[caches]] «كاشِز» (مقطع زيادة)، و [[queues]] «كيوز»، و [[enqueue]] «إن-كيو».

---

## الخلاصة

- [[cache]] = [[cash]]، و [[queue]] = Q، و [[suite]] = [[sweet]].
- [[height]] بالتاء، و [[width]] بكسرة قصيرة + د + ث.
- [[route]] و [[data]] نطقين صح، اثبت على واحد.`,
          lines: [
            R`cache = كاش، زي cash. و queue = كيو، زي حرف Q.`,
            R`suite = سويت زي sweet (مجموعة اختبارات). و suit = سوت (بدلة): كلمة تانية.`,
            R`height = هايت بالتاء. و width = ويدث بكسرة قصيرة وبعدها د وث.`,
            R`route نطقين مقبولين: روت أو راوت. و router بالأمريكاني راوتر.`,
            R`data: ديْتا أو داتا، الاتنين تمام.`,
            R`«امسح الـ cache وشغّل الـ queue worker تاني». worker = البرنامج اللي بيسحب من الطابور.`,
            R`«مجموعة الاختبارات بتتأكد من ارتفاع وعرض الصورة».`,
            R`«الـ route ده بيرجّع داتا اليوزر».`
          ],
          sol: R`التسجيل الصح: [[cache]] بتتسمع زي [[cash]]، و [[queue]] مقطع واحد «كيو»، و [[suite]] زي [[sweet]]، و [[height]] آخرها «ت» واضحة، و [[width]] بكسرة قصيرة.

في جملة السرعة: [[caches]] = «كاشِز» (مقطع زيادة عشان آخرها «ش»، زي درس [[-ed و -s]]). ولو لقيت نفسك بتقول «كاتشِز» يبقى لسه الكلمة متخزنة غلط: قول [[cash, cache, cash, cache]] ٥ مرات.

وفي [[route]] و [[data]]: أي نطق من الاتنين صح، بس خليك ثابت على واحد في نفس الكلام.`
        },
        {
          cmd: "Linux و SQL و Nginx",
          title: "أسماء الأدوات: Linux و SQL و GIF و Nginx و Kubernetes و Azure و Vue و Angular و Vite",
          desc: R`أسماء الأدوات ليها نطق «رسمي» من أصحابها، وأحيانًا نطقين الاتنين مقبولين. القاعدة: لو فيه خلاف مشهور (SQL و GIF)، الاتنين تمام. لو مفيش خلاف (Nginx و Azure و Vite)، فيه نطق صح واحد وغالبًا المصري بيقول غيره.

القايمة الأهم: [[Linux]] = «لينِكس» /ˈlɪnəks/ بكسرة قصيرة (مش «لاينكس»). [[SQL]] = «إس كيو إل» أو «سيكوِل» /ˈsiːkwəl/ (الاتنين صح). [[GIF]] = «گِف» أو «جِف» (صاحبها قال «جِف» والأغلبية بتقول «گِف»). [[Nginx]] = «إنجن إكس» [[engine-x]] (مش «إنجينكس»). [[Kubernetes]] = «كوبَر-نيتيز» /ˌkuːbərˈnetiːz/ والضغط على [[NE]]، واختصارها [[K8s]] = «كيْتس» أو «كيه إيتس». [[Azure]] = «آژَر» /ˈæʒər/ (مش «أزور»). [[Vue]] = «ڤيو» زي [[view]]. [[Angular]] = «آنگيولَر» /ˈæŋɡjələr/. [[Vite]] = «ڤيت» /viːt/ (كلمة فرنساوي معناها سريع، مش «ڤايت»).`,
          example: R`Linux = لينِكس /ˈlɪnəks/        Ubuntu = أوبونتو /ʊˈbʊntuː/      Debian = ديبيان
SQL = S-Q-L or "sequel"         MySQL = my-S-Q-L               PostgreSQL = Postgres (بوستگرِس) or Postgres-Q-L
GIF = گِف /ɡɪf/ or جِف /dʒɪf/    JSON = جيْسِن /ˈdʒeɪsən/          YAML = يامِل /ˈjæməl/
Nginx = engine-x (إنجن إكس)     Apache = أپاتشي /əˈpætʃi/        Redis = ريدِس /ˈredɪs/
Kubernetes = كوبَر-NE-تيز       K8s = "kates" or "K-eights"   Azure = آژَر /ˈæʒər/
Vue = ڤيو (= view)              Angular = آنگيولَر               Vite = ڤيت /viːt/ (= veet)
Git = گِت (hard g)               GitHub = گِت هَب                 Django = جانگو (silent D)
Sentence:  We deploy the Vue app with Vite, behind Nginx, on an Ubuntu server in Azure.`,
          try: R`اكتب اسم الـ stack بتاعك كله في جملة واحدة (زي آخر سطر في المثال): اللغة، والـ framework، والداتابيز، والسيرفر، والـ cloud. دوّر على نطق كل اسم في YouGlish (ويفضّل من talk لأصحاب الأداة)، وسجّل الجملة. دي الجملة اللي هتقولها في «Tell me about yourself» فلازم تبقى مظبوطة.`,
          flag: "script",
          deep: {
            why: R`اسم الـ stack هو أول حاجة بتقولها في أي انترفيو وأي تعريف بنفسك. ولو قلت «إنجينكس» و «أزور» في أول ٢٠ ثانية، الإنترفيوير هيعرف إنك اتعلمت من القراية بس. ولو قلتهم صح، ده بيدّي انطباع إنك «من جوه» المجتمع ده وبتسمع talks.`,
            how: R`[[Linux]]: Linus Torvalds نفسه قال «لينُكس» في تسجيل مشهور. النطق «لينِكس» أو «لينُكس» الاتنين تمام، الغلط هو «لاينكس».

[[SQL]]: الاستاندرد الرسمي بيقول «إس كيو إل»، وناس كتير بتقول «سيكوِل» (من اسم قديم للغة). و [[MySQL]] أصحابها بيقولوا «ماي إس كيو إل». و [[PostgreSQL]] أغلب الناس بتقول «Postgres» وخلاص.

[[Nginx]]: الموقع الرسمي بيكتب النطق [[engine-x]]. [[Vite]]: الـ docs بتقول النطق [[/vit/]] زي [[veet]]. [[Azure]]: Microsoft بتقولها «آژَر» والضغط على أولها. [[Django]]: الـ D ساكتة (زي فيلم Django Unchained). [[Git]] و [[GitHub]]: گ صلبة زي «جمل» بالمصري، مش ج.

ولو مش متأكد من اسم أداة في اجتماع: قول الاسم زي ما تعرف واكمل، أو اسأل [[How do you pronounce it?]]: محدش هيستغرب.`,
            when: "أي تعريف بنفسك أو بالمشروع، وأي كلام عن الـ infrastructure. جهّز جملة الـ stack بتاعك قبل أي انترفيو.",
            mistakes: R`«لاينكس»، و «إنجينكس»، و «أزور»، و «ڤو» أو «ڤوي» ([[Vue]])، و «أنجولار»، و «ڤايت»، و «دجانجو» بالـ D، و «جيت هاب» بالجيم الفصحى، و «جيسون» بفتحة طويلة (الصح «جيْسِن» والآخر ضعيف). و «كوبرنيتس» بالضغط على الأول (الصح [[ku-ber-NE-tes]]).`
          },
          teach: R`## الفكرة: اسم الأداة ليه نطق من أصحابها

المثال جدول أسماء (٧ سطور) وجملة stack. الجدول متقسم ٣ أعمدة في كل سطر عشان تتقري بسرعة. هنرتبهم حسب نوع الغلطة.

---

## ١. أسماء ليها نطق واحد والمصري بيقول غيره

| الاسم | الصح | الغلط | المصدر |
|---|---|---|---|
| [[Linux]] | «لينِكس» كسرة قصيرة | «لاينكس» | Wiktionary: [[/ˈlɪ.nəks/]] أو [[/ˈlɪ.nʊks/]] |
| [[Nginx]] | «إنجن إكس» | «إنجينكس» | الموقع الرسمي بيكتبها [[engine-x]] |
| [[Vite]] | «ڤيت» زي [[veet]] | «ڤايت» | الـ docs: كلمة فرنساوي = سريع |
| [[Vue]] | «ڤيو» زي [[view]] | «ڤو» | |
| [[Django]] | «جانگو» | «دجانجو» | الـ D ساكتة |
| [[Git]] / [[GitHub]] | «گِت» / «گِت هَب» | «جيت» | g صلبة |
| [[JSON]] | «جيْسِن» | «جيسون» بفتحة طويلة | |
| [[Kubernetes]] | «كوبَر-**نِ**-تيز» | «**كو**برنيتس» | Wiktionary: الضغط على NE |

و [[Azure]]: Wiktionary بيعرض أكتر من نطق مقبول (أشهرهم [[/ˈæʒɚ/]] «آژَر» بالأمريكي)، والدرس بيختار «آژَر» لأنه الأشهر في الشغل. اللي مش مقبول «أزور» بفتح الزاي.

## ٢. أسماء ليها نطقين والاتنين صح

| الاسم | نطق ١ | نطق ٢ |
|---|---|---|
| [[SQL]] | «إس كيو إل» (الاستاندرد الأصلي قال كده، حسب Wikipedia) | «سيكوِل» (sequel) |
| [[GIF]] | «گِف» (الأغلبية) | «جِف» (صاحب الفورمات) |
| [[K8s]] | «كيْتس» (kates) | «كيه إيتس» |
| [[PostgreSQL]] | «پوستگرِس» (الأشهر) | «پوستگرِس كيو إل» |

[[K8s]] معناها: K وبعدها ٨ حروف وبعدها s (K-ubernete-s)، زي [[i18n]] لـ internationalization.

## ٣. أسماء عادية بس خلي بالك من الضغط

[[Ubuntu]] «أو-**بون**-تو»، و [[Apache]] «أ-**پا**-تشي»، و [[Redis]] «**ري**-دِس»، و [[YAML]] «**يا**-مِل»، و [[Angular]] «**آن**-گيو-لَر».

---

## ٤. جملة الـ stack (آخر سطر)

~~~text Sentence
We deploy the Vue app with Vite, behind Nginx, on an Ubuntu server in Azure.
~~~

| الحتة | المعنى | النطق |
|---|---|---|
| [[We deploy the Vue app]] | بننزّل تطبيق Vue | «ڤيو» |
| [[with Vite]] | بـ Vite (أداة البناء) | «ڤيت» |
| [[behind Nginx]] | ورا Nginx (reverse proxy) | «إنجن إكس» |
| [[on an Ubuntu server]] | على سيرفر Ubuntu | [[an]] عشان Ubuntu أولها صوت متحرك |
| [[in Azure]] | في Azure | «آژَر» |

دي الجملة اللي هتقولها في أول الانترفيو، فجهّز نسختك بالـ stack بتاعك.

---

## الخلاصة

- لو فيه خلاف مشهور (SQL و GIF)، الاتنين صح.
- لو مفيش خلاف (Nginx و Vite و Linux)، فيه نطق واحد، وغالبًا مش اللي في دماغك.
- مش متأكد؟ [[How do you pronounce it?]] عادي جدًا.`,
          lines: [
            R`Linux لينِكس (مش لاينكس)، و Ubuntu أوبونتو، و Debian ديبيان.`,
            R`SQL نطقين مقبولين. MySQL بالحروف. PostgreSQL الناس بتقول Postgres.`,
            R`GIF نطقين مقبولين. JSON جيْسِن. YAML يامِل.`,
            R`Nginx = engine-x. و Apache أپاتشي. و Redis ريدِس.`,
            R`Kubernetes الضغط على NE. واختصارها K8s. و Azure آژَر.`,
            R`Vue زي view. Angular آنگيولَر. Vite زي veet (فرنساوي = سريع).`,
            R`Git و GitHub بـ g صلبة. Django الـ D ساكتة.`,
            R`«بننزّل تطبيق Vue بـ Vite، ورا Nginx، على سيرفر Ubuntu في Azure». behind = ورا (reverse proxy).`
          ],
          sol: R`مثال لجملة stack صح:
[[I build full-stack apps with TypeScript, React and Next.js, with PostgreSQL and Prisma, and I deploy them with Docker and Nginx on a Linux VPS.]]

النطق المتوقع: [[TypeScript]] «تايپ-سكريپت» (p واضحة، ومن غير «إ» قبل script)، و [[Next.js]] «نِكست جيه إس»، و [[PostgreSQL]] «پوستگرِس»، و [[Prisma]] «پريزما»، و [[Docker]] «دوكَر»، و [[Nginx]] «إنجن إكس»، و [[Linux]] «لينِكس»، و [[VPS]] «ڤي پي إس».

لو اسم في الـ stack بتاعك مش موجود هنا، دوّر عليه في YouGlish. ولو ملقتش مقطع، ابحث في YouTube عن talk بعنوان الأداة واسمع أول دقيقة: المتكلم غالبًا بيقول الاسم في أول جملة.`
        },
        {
          cmd: "algorithm و determine",
          title: "algorithm و variable و asynchronous و determine و develop: الكلمات الطويلة",
          desc: R`الكلمات الطويلة اللي أصلها لاتيني أو يوناني بتقع فيها غلطتين: الضغط في مكان غلط، ونطق حرف بالطريقة «العربي» أو «الإنجليزي الكتابي».

[[algorithm]] = «آلگوريذَم» /ˈælɡərɪðəm/: الضغط على [[AL]]، والـ [[th]] = ذ (مش «ز» ولا «ث»)، والآخر [[-rithm]] مقطع ضعيف. [[variable]] = «ڤيريَبل» /ˈveriəbl/: الضغط على أولها، وأصلها [[vary]]. [[asynchronous]] = «إيْسِنكرِنَس» /eɪˈsɪŋkrənəs/: الضغط على [[SYN]]، وأولها «إيْ» مش «أ». [[async]] = «إيْسِنك». [[determine]] = «ديتِرمِن» /dɪˈtɜːrmɪn/: الآخر «مِن» قصيرة، مش «ماين» (الغلطة دي منتشرة جدًا). [[develop]] = «ديڤيلَب» /dɪˈveləp/: الضغط على [[VEL]].

ومعاهم: [[architecture]] «آركِتِكتشَر» (ch = k)، و [[authentication]] «أوثِنتِكيشَن» (ث + ضغط على [[CA]])، و [[synchronous]] «سِنكرِنَس»، و [[iterate]] «إتَريْت» (الضغط على [[IT]])، و [[integer]] «إنتِجَر» (ج مش گ)، و [[boolean]] «بوليَن»، و [[null]] «نَل».`,
          example: R`algorithm = آلگوريذَم  /ˈælɡərɪðəm/   AL-go-ri-thm (th = ذ)
variable = ڤيريَبل  /ˈveriəbl/   VA-ri-a-ble (from "vary")
asynchronous = إيْسِنكرِنَس  /eɪˈsɪŋkrənəs/   a-SYN-chro-nous;   async = إيْسِنك
determine = ديتِرمِن  /dɪˈtɜːrmɪn/   de-TER-mine (not "mine")
develop = ديڤيلَب  /dɪˈveləp/   de-VEL-op;   developer = ديڤيلَپَر
integer = إنتِجَر (soft g)   boolean = بوليَن   null = نَل   iterate = إتَريْت
authentication = أوثِنتِكيشَن   au-then-ti-CA-tion
Sentence:  The algorithm determines which variable the async function should update.`,
          try: R`اكتب إجابة من ٣ جمل للسؤال ده بالإنجليزي: [[What's the difference between synchronous and asynchronous code?]]، ولازم تستخدم فيها ٤ كلمات على الأقل من القايمة. سجّلها واسمعها وانت بتقرا الـ IPA: الضغط في المكان الصح؟ و [[determine]] طالعة «مِن» ولا «ماين»؟`,
          flag: "script",
          deep: {
            why: R`الكلمات دي هي لغة الانترفيو التقني نفسها. سؤال زي «Explain async/await» أو «What algorithm would you use?» هيخليك تقول الكلمة ١٠ مرات. والنطق الغلط المتكرر بيشتت اللي قدامك.`,
            how: R`[[determine]] الغلطة جاية من إن [[mine]] لوحدها «ماين». بس لما تيجي في آخر كلمة طويلة من غير ضغط بتبقى «مِن»: [[determine]] و [[examine]] «إگزامِن» و [[famine]]. استثناء مهم: [[undermine]] «أندَرماين»، و [[combine]] «كمباين». فاحفظ [[determine]] و [[examine]] كاستثناء.

[[algorithm]]: قولها ٣ حتت: [[AL]] + [[go]] + [[rithm]]، والتالتة فيها «ذ» صغيرة وبعدين «م». ومنها [[algorithmic]] «آلگوريذمِك» الضغط اتنقل لـ [[RITH]].

[[asynchronous]]: الـ [[a-]] هنا «إيْ» (زي الحرف A)، وكذلك في [[async]] و [[await]] = «أويْت» (هنا «أ» ضعيفة). وأشهر نطق للـ [[async]] بين المبرمجين «إيْ-سِنك». [[sync]] = «سِنك» زي [[sink]].

وخلي بالك إن [[integer]] الجيم فيها ج «dʒ» مش گ.`,
            when: "أي إجابة تقنية في الانترفيو، وأي شرح لكود.",
            mistakes: R`«ديترماين» (أشهرهم). و «ألجوريزم» (ز بدل ذ، وضغط غلط). و «ڤاريّابل». و «أسينكرونوس» بنطق كل حرف. و «ديفيلوب» بضغط على الأول. و «إنتيگر» بالـ g الصلبة. و «بولين» بالضغط على الآخر. و «نول» (الصح «نَل»).`
          },
          teach: R`## الفكرة: الكلمات الطويلة بتقع في الضغط وفي حرف واحد

المثال ٧ سطور، كل سطر: الكلمة = نطق عربي تقريبي = IPA = مقاطع بالضغط. وفي الآخر جملة بتجمعهم. الـ IPA اللي في المثال اتراجع على Wiktionary وقت كتابة الشرح ([[algorithm]] و [[asynchronous]] و [[determine]] و [[variable]]).

---

## ١. السطور واحد واحد

| الكلمة | الضغط | الحرف الخطير | الغلط |
|---|---|---|---|
| [[algorithm]] | **AL**-go-ri-thm | [[th]] = ذ | «ألجوريزم» (ز + ضغط في الآخر) |
| [[variable]] | **VA**-ri-a-ble | أصلها [[vary]] | «ڤاري**يا**بل» |
| [[asynchronous]] | a-**SYN**-chro-nous | أولها «إيْ» | «أسينكرونوس» بكل الحروف واضحة |
| [[async]] | «إيْ-سِنك» | | |
| [[determine]] | de-**TER**-mine | آخرها «مِن» | «ديترماين» |
| [[develop]] | de-**VEL**-op | | «**دي**ڤيلوب» |
| [[integer]] | **IN**-te-ger | g = ج ناعمة | «إنتيگر» |
| [[authentication]] | au-then-ti-**CA**-tion | th = ث | «أوسنتيكيشن» |

ومعاهم: [[boolean]] «بو-ليَن» (الضغط على الأول)، و [[null]] «نَل» مش «نول»، و [[iterate]] «**إ**-تَ-ريْت».

## ٢. ليه [[determine]] بالذات؟

لأن [[mine]] لوحدها «ماين»، فالمخ بيكمّل عليها. بس في آخر كلمة طويلة من غير ضغط بتبقى «مِن»: [[determine]] و [[examine]]. والاستثناءات اللي فعلًا «ماين»: [[combine]] و [[undermine]]. الحل: احفظ [[determine]] و [[examine]] على إنهم «مِن».

## ٣. ليه [[asynchronous]] و [[synchronous]] بيتلخبطوا؟

الضغط في الاتنين على [[SYN]]: «**سِن**-كرِ-نَس» و «إيْ-**سِن**-كرِ-نَس». والمقاطع بعد الضغط ضعيفة [[ə]]؛ لو قلتها «سينكرونوس» بكل حرف واضح، الكلمة بتبان «مقروءة» مش «متقالة».

---

## ٤. الجملة

~~~text Sentence
The algorithm determines which variable the async function should update.
~~~

| الحتة | المعنى |
|---|---|
| [[The algorithm determines]] | الـ algorithm بيحدد ([[determines]] = «دي-**تِر**-مِنز») |
| [[which variable]] | أنهي متغير |
| [[the async function should update]] | الدالة الـ async المفروض تحدّثه ([[update]] هنا فعل: up-**DATE**) |

---

## الخلاصة

| الكلمة | افتكر |
|---|---|
| algorithm | AL + ذ |
| determine | TER + «مِن» |
| asynchronous / async | «إيْ» + SYN |
| integer | ج ناعمة |
| null | «نَل» |`,
          lines: [
            R`algorithm: الضغط على AL، والـ th ذ.`,
            R`variable: الضغط على أولها، وهي من vary (يتغير).`,
            R`asynchronous: الضغط على SYN، وأولها «إيْ». و async «إيْسِنك».`,
            R`determine: الآخر «مِن» قصيرة. من أشهر الغلطات: «ديترماين».`,
            R`develop وdeveloper: الضغط على VEL.`,
            R`integer بجيم ناعمة، و boolean بوليَن، و null نَل، و iterate الضغط على IT.`,
            R`authentication: ث في النص، والضغط على CA.`,
            R`«الـ algorithm بيحدد أنهي متغير الدالة الـ async المفروض تحدّثه».`
          ],
          sol: R`إجابة نموذجية (٣ جمل):
[[Synchronous code runs one line at a time, and each line waits for the previous one. Asynchronous code starts a task, like a network request, and continues without waiting; the result comes back later through a callback or a promise. So async code keeps the app responsive while the slow work happens in the background.]]

الكلمات من القايمة: [[synchronous]]، و [[asynchronous]]، و [[async]]... ولو ضفت [[determine]] أو [[algorithm]] أحسن.

في التسجيل: [[synchronous]] = «سِنكرِنَس» الضغط على [[SYN]]، و [[asynchronous]] نفس الضغط. ولو سمعت نفسك بتقول «سينكرونوس» بكل الحروف واضحة، ده الغلط: المقاطع الأخيرة ضعيفة [[ə]]. والإجابة الضعيفة: جملة واحدة «async is not sync» من غير مثال.`
        },
        {
          cmd: "حروف ساكتة",
          title: "schema و architecture و pseudo و debt و facade: حروف مكتوبة ومش بتتقال",
          desc: R`الإنجليزي مليان حروف مكتوبة ومش بتتنطق، أو حروف بتتنطق بصوت مش صوتها. وكتير من الكلمات التقنية جاية من اليوناني أو الفرنساوي فيها ده.

[[ch]] = [[k]] في الكلمات اليوناني: [[schema]] «سكيما»، و [[architecture]] «آركِتِكتشَر»، و [[archive]] «آركايڤ»، و [[mechanism]] «ميكَنِزم»، و [[technical]] «تِكنِكَل»، و [[character]] «كارِكتَر» (و [[char]] بيتقال «تشار» أو «كار» أو «كير»: الكل مقبول). و [[hierarchy]] «هايرَركي».

حروف ساكتة: [[pseudo]] (pseudo-code) = «سودو» الـ p ساكتة. [[debt]] (technical debt) = «دِت» الـ b ساكتة. [[subtle]] (bug صعب يتلاحظ) = «سَتِل» الـ b ساكتة. [[Wednesday]] = «وِنزدي». [[often]] «أوفِن» (الـ t غالبًا ساكتة). [[listen]] «لِسِن». [[design]] «ديزاين» الـ g ساكتة. [[sign]] و [[align]] «ألاين».

فرنساوي: [[facade]] (Facade pattern) = «فَساد» /fəˈsɑːd/. [[resume]] كفعل (يكمّل) = «ريزيوم»، واسم (CV) [[résumé]] = «ريزيوميْ». [[suite]] من الدرس اللي فات. و [[genre]] «ژونرا».`,
          example: R`ch = k:  schema (سكيما)  architecture (آركِتِكتشَر)  archive (آركايڤ)  mechanism  technical  character
Silent p/b/g/t:  pseudo (سودو)  debt (دِت)  subtle (سَتِل)  design (ديزاين)  align (ألاين)  often (أوفِن)
Fewer syllables:  Wednesday (وِنزدي)  comfortable (كَمفتَبل)  interesting (إنترِستِنگ)  different (دِفرَنت)
French:  facade (فَساد)  resume v. (ريزيوم) vs résumé n. (ريزيوميْ)
Two ways:  live demo = لايڤ /laɪv/ (adjective)   I live in Cairo = لِڤ /lɪv/ (verb)
Two ways:  I read docs daily = ريد   I read it yesterday = رِد
Sentence 1:  The database schema is part of the architecture docs, not the archive.
Sentence 2:  This subtle bug is technical debt from the pseudo-code we never cleaned up.`,
          try: R`اكتب ٥ كلمات تقنية من شغلك انت ممكن يكون فيها حرف ساكت (ابحث في Cambridge عن النطق). وبعدين سجّل الجملتين الأخيرتين من المثال وجملة من عندك فيها [[live]] بالمعنيين.`,
          flag: "script",
          deep: {
            why: R`[[schema]] و [[architecture]] و [[technical debt]] بتتقال في كل كلام عن الـ backend والتصميم. ولو قلت «شيما» أو «أرشيتكتشر» أو «ديبت»، ده بيبان جدًا لأنها كلمات «senior». وكلمة [[live]] بالذات: [[live demo]] و [[live coding]] و [[go live]] كلها «لايڤ»، والمصري بيقولها «لِڤ» ساعات.`,
            how: R`القاعدة التقريبية لـ [[ch]]: لو الكلمة يوناني الأصل (علمية أو تقنية، وفيها [[chr]] أو [[sch]] أو [[arch]] قبل حرف متحرك) غالبًا [[k]]: [[chrome]] «كروم»، و [[synchronous]] «سِنكرِنَس»، و [[chronological]]. لكن [[arch]] لوحدها (قوس) «آرتش»، و [[chart]] «تشارت»، و [[cache]] «كاش»: مفيش قاعدة بتشتغل ١٠٠٪، عشان كده اسمع.

[[resume]]: فعل = «ريزيوم» ([[resume the upload]] = كمّل الرفع). اسم = CV، بالأمريكاني [[résumé]] أو [[resume]] «ريزيوميْ». وفي الانترفيو: [[Can you walk me through your résumé?]].

[[live]]: صفة (مباشر، شغال على الإنتاج) = «لايڤ»: [[live site]] و [[go live]] و [[livestream]]. فعل (يعيش) = «لِڤ».

[[read]]: مضارع «ريد»، وماضي «رِد» (زي [[red]]). وفي الـ standup: [[I read the docs yesterday]] = «رِد».`,
            when: "كلام عن تصميم النظام (schema, architecture, hierarchy)، والـ code quality (technical debt, subtle bug)، والـ demos (live).",
            mistakes: R`«شيما» أو «سكِما». و «أرشيتكتشر» (بالشين). و «پسودو كود» بالـ p. و «دِبت». و «سَبتِل». و «ويدنسداي». و «فاكيد» ([[facade]]). و «لِڤ ديمو» بدل «لايڤ ديمو». و «ريد» في الماضي.`
          },
          teach: R`## الفكرة: الكتابة بتكذب، فاحفظ ٤ أنماط

المثال ٦ سطور أنماط وجملتين. كل سطر بيبدأ باسم النمط وبعده [[:]].

---

## ١. [[ch = k]] (السطر الأول)

الكلمات اللي أصلها يوناني (وأغلبها علمية أو تقنية) الـ [[ch]] فيها «ك»:

| الكلمة | النطق | الغلط |
|---|---|---|
| [[schema]] | «سكيما» | «شيما» |
| [[architecture]] | «آر-كِ-تِك-تشَر» | «أرشيتكتشر» |
| [[archive]] | «آر-كايڤ» | «أرشيڤ» |
| [[mechanism]] / [[technical]] / [[character]] | «ميكَنِزم» / «تِكنِكَل» / «كارِكتَر» | |

Wiktionary: [[schema]] [[/ˈskiːmə/]] بالبريطاني و [[/ˈskimə/]] بالأمريكي. يعني «سكيما» من غير شك.

## ٢. حروف ساكتة (السطر التاني)

| الكلمة | الحرف الساكت | النطق |
|---|---|---|
| [[pseudo]] (pseudo-code) | p | «سودو» |
| [[debt]] (technical debt) | b | «دِت» |
| [[subtle]] (bug خفي) | b | «سَتِل» |
| [[design]] / [[align]] | g | «دي-زاين» / «أ-لاين» |
| [[often]] | t (غالبًا) | «أوفِن» |

## ٣. مقاطع أقل من الكتابة (السطر التالت)

[[Wednesday]] = «وِنز-دي» (مقطعين)، و [[comfortable]] = «كَمف-تَ-بل» (٣)، و [[interesting]] = «إن-ترِس-تِنگ» (٣)، و [[different]] = «دِف-رَنت» (٢ أو ٣).

## ٤. فرنساوي (السطر الرابع)

[[facade]] = «فَ-ساد» (Wiktionary: [[/fəˈsɑ(ː)d/]]): الـ c = س، ومفيش e في الآخر. و [[resume]] كفعل «ري-زيوم» (يكمّل: [[resume the upload]])، و [[résumé]] كاسم «رِ-زيو-ميْ» (CV).

## ٥. نفس الكتابة، نطقين (السطر الخامس والسادس)

| الكلمة | المعنى | النطق |
|---|---|---|
| [[live demo]] | صفة: مباشر | «لايڤ» |
| [[I live in Cairo]] | فعل: أعيش | «لِڤ» |
| [[I read docs daily]] | مضارع | «ريد» |
| [[I read it yesterday]] | ماضي | «رِد» زي [[red]] |

---

## ٦. الجمل

~~~text Sentence 1
The database schema is part of the architecture docs, not the archive.
~~~

٣ كلمات [[ch = k]] في جملة واحدة: [[schema]] و [[architecture]] و [[archive]].

~~~text Sentence 2
This subtle bug is technical debt from the pseudo-code we never cleaned up.
~~~

٣ حروف ساكتة: b في [[subtle]] و [[debt]]، و p في [[pseudo]]. [[technical debt]] = الديون التقنية (حلول سريعة هتدفع تمنها بعدين). [[cleaned up]] = نضّفنا.

---

## الخلاصة

- [[sch]] و [[arch]] و [[chr]] في الكلمات التقنية غالبًا «ك»، بس [[cache]] و [[chart]] لأ: اسمع.
- pseudo بلا p، و debt و subtle بلا b، و design بلا g.
- [[live demo]] «لايڤ»، و [[read]] الماضي «رِد».`,
          lines: [
            R`ch بتتنطق k في الكلمات اليوناني: schema، و architecture، و archive، و mechanism، و technical، و character.`,
            R`حروف ساكتة: p في pseudo، و b في debt و subtle، و g في design و align، و t في often غالبًا.`,
            R`كلمات مقاطعها أقل من كتابتها: Wednesday وِنزدي، و comfortable ٣ مقاطع، و interesting ٣، و different ٢ أو ٣.`,
            R`فرنساوي: facade فَساد. و resume فعل «يكمّل» غير résumé اسم «CV».`,
            R`live صفة (مباشر) = لايڤ. live فعل (يعيش) = لِڤ.`,
            R`read مضارع = ريد. read ماضي = رِد (زي red).`,
            R`«الـ schema بتاع الداتابيز جزء من docs الـ architecture، مش الأرشيف».`,
            R`«الـ bug الخفي ده technical debt من الـ pseudo-code اللي عمرنا ما نضّفناه». clean up = ننضّف.`
          ],
          sol: R`أمثلة لكلمات ممكن تكون لقيتها: [[Kotlin]] (عادية)، [[Chromium]] «كروميَم» (ch = k)، [[psql]] «پي إس كيو إل» (الـ p هنا بتتنطق لأنها حرف لوحده!)، [[campaign]] «كامپيْن» (g ساكتة)، [[receipt]] «ريسيت» (p ساكتة)، [[island]] «آيلَند»، [[yacht]] مش تقنية بس مشهورة.

والجملة بـ [[live]]: [[I'll do a live demo on Thursday.]] (لايڤ) و [[I live in Alexandria.]] (لِڤ). ولو في جملة واحدة: [[The app went live while I was living in Cairo.]]

التسجيل الصح للجملتين: [[schema]] بـ «سك»، و [[architecture]] بـ «آرك»، و [[subtle]] من غير b، و [[debt]] «دِت»، و [[pseudo]] من غير p.`
        },
        {
          cmd: "API و JSON",
          title: "الاختصارات: API بالحروف، و JSON كلمة، و SaaS كلمة، و SQL الاتنين",
          desc: R`الاختصارات نوعين: اختصار بيتقري حروف (initialism) زي [[API]] = «إيْ پي آي»، واختصار بيتقري كلمة (acronym) زي [[JSON]] = «جيْسِن». ومفيش قاعدة من الكتابة تقولك أنهي نوع، فلازم تسمع. والغلطة الكلاسيكية إنك تقرا حروف لحاجة بتتقال كلمة ([[S-A-A-S]] بدل «ساس») أو العكس.

وأسماء الحروف نفسها في الإنجليزي بتختلف عن اللي اتعلمناه ساعات: [[A]] «إيْ»، و [[E]] «إي»، و [[I]] «آي»، و [[G]] «جي» (ج ناعمة)، و [[J]] «جيْ»، و [[H]] «إيْتش»، و [[R]] «آر»، و [[Q]] «كيو»، و [[W]] «دابِليو»، و [[Y]] «واي»، و [[Z]] «زي» بالأمريكاني و «زِد» بالبريطاني. وأشهر لخبطة عند المصريين: [[G]] و [[J]]، و [[E]] و [[I]] (زي في [[CI]] «سي آي» و [[CLI]] «سي إل آي»).`,
          example: R`Letters:  API (إيْ پي آي)  URL (يو آر إل)  CLI (سي إل آي)  CI/CD (سي آي سي دي)  npm (إن پي إم)
Letters:  HTML  CSS  HTTP  SSH  DNS  VPS  UI  UX  JWT (or "jot")  UUID (يو يو آي دي)  AWS  GCP
Words:  JSON (جيْسِن)  YAML (يامِل)  SaaS (ساس)  GUI (گوي)  ASCII (آسكي)  CRUD (كرَد)  OAuth (أو-أوث)
Words:  RAM (رام)  NAT (نات)  CORS (كورز)  REST (رِست)  WASM (وازِم)  SPA (إس پي إيْ, or سپا)
Both OK:  SQL (S-Q-L / sequel)   GIF (گِف / جِف)   char (تشار / كار)   IDE (letters)
Letter names:  G = جي   J = جيْ   E = إي   I = آي   H = إيْتش   W = دابِليو   Z = زي (US) / زِد (UK)
Sentence:  The CLI calls the REST API, gets JSON back, and the CI checks the YAML.`,
          try: R`اكتب ١٠ اختصارات بتستخدمها في شغلك أو مذاكرتك، وجنب كل واحد: حروف ولا كلمة، ونطقه. اتأكد من ٣ منهم على الأقل في YouGlish. وبعدين قول بصوت عالي أسماء الحروف دي بالترتيب: [[G J E I H W Y Q]].`,
          flag: "script",
          deep: {
            why: R`الكلام التقني نصه اختصارات. ولو قلت «سي إي آي» بدل «سي آي» أو «جي دبليو تي» بلخبطة الـ G والـ J، ده بيوقف الكلام. والإملا بالحروف كمان مهم: هتحتاج تتهجى اسم متغير أو URL أو كود في مكالمة.`,
            how: R`أسهل طريقة تعرف: لو الاختصار ممكن يتقري بسهولة كمقطع (فيه حرف متحرك في مكان مناسب) غالبًا كلمة ([[JSON]] و [[CRUD]] و [[CORS]] و [[REST]]). لو كله حروف ساكنة (HTTP و SSH و DNS) أو صعب يتقري، حروف. بس فيه استثناءات: [[SQL]] و [[URL]] (ناس قليلة بتقول «إيرل»)، و [[API]] دايمًا حروف.

التهجّي في مكالمة: الحروف اللي بتتلخبط في النت ([[B]] و [[D]] و [[P]] و [[T]] و [[M]] و [[N]]) قول معاها كلمة: [[B as in Bravo]]، [[M as in Mike]]، [[N as in November]]. أو [[B for Bob]]. وفي الـ URLs: [[dot]] للنقطة، و [[slash]] للـ /، و [[dash]] أو [[hyphen]] للـ -، و [[underscore]] للـ _، و [[all lowercase]] = كله صغير.

و [[npm]] رسميًا بالحروف الصغيرة وبتتقال حروف. و [[JWT]] المعيار نفسه (RFC 7519) بيقول النطق المقترح «jot»، بس «جيْ دابِليو تي» أشهر في الكلام.`,
            when: "أي كلام تقني، وأي مكالمة فيها تهجّي اسم أو URL أو كود أو إيميل.",
            mistakes: R`«سي إي آي» بدل [[CI]]. و «جي» للـ [[J]] (الصح «جيْ»). و «إس إيه إيه إس» بدل «ساس». و «جيسون» بفتحة. و «ديبي» بدل [[DB]] «دي بي». و «كروود» ([[CRUD]] = «كرَد»). و «يو آر إل» صح، بس «أورل» غلط. وتهجّي [[B]] و [[P]] من غير كلمة مساعدة في مكالمة وحشة.`
          },
          teach: R`## الفكرة: الاختصار يا حروف يا كلمة، والكتابة مش بتقولك

المثال ٦ سطور تصنيف وجملة. السطور متقسمة: حروف، وكلمات، والاتنين، وأسماء الحروف نفسها.

---

## ١. بتتقري حروف (initialism): السطرين الأولانيين

[[API]] «إيْ پي آي»، و [[URL]] «يو آر إل»، و [[CLI]] «سي إل آي»، و [[CI/CD]] «سي آي سي دي»، و [[npm]] «إن پي إم»، و [[HTML]] و [[CSS]] و [[HTTP]] و [[SSH]] و [[DNS]] و [[VPS]] و [[UI]] و [[UX]] و [[UUID]] «يو يو آي دي» و [[AWS]] و [[GCP]].

الملاحظة: أغلبهم مفيهوش حرف متحرك يخليهم يتقروا كلمة (HTTP و SSH و DNS)، فطبيعي حروف. و [[JWT]] حروف في الكلام، والمعيار نفسه (RFC 7519) بيقترح «jot».

## ٢. بتتقري كلمة (acronym): السطر التالت والرابع

| الاختصار | النطق | الغلط |
|---|---|---|
| [[JSON]] | «جيْسِن» | «جي إس أو إن» |
| [[YAML]] | «يامِل» | |
| [[SaaS]] | «ساس» | «إس إيه إيه إس» |
| [[GUI]] | «گوي» | |
| [[ASCII]] | «آس-كي» | |
| [[CRUD]] | «كرَد» | «كروود» |
| [[OAuth]] | «أو-أوث» (ث) | «أوس» |
| [[CORS]] | «كورز» | |
| [[REST]] | «رِست» | |
| [[WASM]] | «وازِم» | |

## ٣. الاتنين صح (السطر الخامس)

[[SQL]] و [[GIF]] و [[char]] ليهم نطقين مشهورين. و [[IDE]] حروف بس.

## ٤. أسماء الحروف (السطر السادس)

| الحرف | اسمه | بيتلخبط مع |
|---|---|---|
| G | «جي» (ج ناعمة) | J |
| J | «جيْ» | G |
| E | «إي» | I |
| I | «آي» | E |
| H | «إيْتش» | |
| W | «دابِليو» | |
| Z | «زي» أمريكي، «زِد» بريطاني | |

ودي بتفرق في الاختصارات نفسها: [[CI]] «سي **آي**» مش «سي **إي**»، و [[JWT]] «**جيْ** دابِليو تي» مش «جي».

---

## ٥. الجملة

~~~text Sentence
The CLI calls the REST API, gets JSON back, and the CI checks the YAML.
~~~

| الحتة | حروف ولا كلمة | المعنى |
|---|---|---|
| [[the CLI]] | حروف | أداة سطر الأوامر |
| [[calls the REST API]] | كلمة + حروف | بتنادي الـ API |
| [[gets JSON back]] | كلمة | بترجعلها JSON ([[back]] = راجع) |
| [[the CI checks the YAML]] | حروف + كلمة | الـ CI بيفحص ملف YAML |

ولو محتاج تتهجى في مكالمة: [[B as in Bravo]] و [[M as in Mike]]، و [[dot]] للنقطة، و [[slash]] للـ /.

---

## الخلاصة

- مفيش قاعدة من الكتابة: [[API]] حروف دايمًا، و [[JSON]] كلمة دايمًا. اسمع.
- G «جي» و J «جيْ»، و E «إي» و I «آي».
- لو اتنين نطقين مشهورين (SQL)، الاتنين صح.`,
          lines: [
            R`اختصارات بتتقري حروف: API، و URL، و CLI، و CI/CD، و npm (بالحروف الصغيرة).`,
            R`حروف كمان: HTML و CSS و HTTP و SSH و DNS و VPS و UI و UX و JWT و UUID و AWS و GCP.`,
            R`اختصارات بتتقري كلمة: JSON جيْسِن، و YAML يامِل، و SaaS ساس، و GUI گوي، و ASCII آسكي، و CRUD كرَد، و OAuth أو-أوث.`,
            R`كلمات كمان: RAM و NAT و CORS كورز و REST رِست و WASM وازِم. SPA الاتنين.`,
            R`فيها نطقين مقبولين: SQL و GIF و char. و IDE حروف.`,
            R`أسماء الحروف اللي بتتلخبط: G جي، و J جيْ، و E إي، و I آي، و H إيْتش، و W دابِليو، و Z زي أو زِد.`,
            R`«الـ CLI بينادي الـ REST API، وبيرجعله JSON، والـ CI بيفحص الـ YAML».`
          ],
          sol: R`مثال لقايمة صح: [[HTTP]] حروف، [[HTTPS]] حروف، [[SSL]] حروف، [[TLS]] حروف، [[PR]] حروف «پي آر»، [[CORS]] كلمة «كورز»، [[ORM]] حروف «أو آر إم»، [[SEO]] حروف «إس إي أو»، [[NoSQL]] «نو سيكوِل» أو «نو إس كيو إل»، [[PWA]] حروف.

أسماء الحروف بالترتيب: [[G]] «جي»، [[J]] «جيْ»، [[E]] «إي»، [[I]] «آي»، [[H]] «إيْتش»، [[W]] «دابِليو»، [[Y]] «واي»، [[Q]] «كيو».

لو لقيت نفسك بتقول [[H]] «هيتش»: ده نطق موجود في بعض لهجات إنجلترا وأيرلندا، بس «إيْتش» أشهر وأأمن. ولو قلت [[Z]] «زِد»، ده بريطاني صح؛ مع فريق أمريكي هيفهموك عادي.`
        }
      ]
    },
    {
      t: "أرقام وتواريخ وإصدارات ورموز بصوت عالي",
      l: 1,
      n: "تقرا v2.10.3 و localhost:5173 و 404، و 3:30 PM والتواريخ وفرق التوقيت، و 1.5k و 99.9% و fifteen مش fifty، ورموز الكود زي { } و => و ||",
      items: [
        {
          cmd: "v2.10.3",
          title: "تقرا v2.10.3 و Node 22 و port 5173 و 127.0.0.1 و 404 إزاي؟",
          desc: R`الأرقام التقنية ليها طريقة قراية خاصة، ومختلفة عن الأرقام العادية. أهم قاعدة: رقم الإصدار (version) بيتقري كل جزء لوحده كرقم كامل، والنقطة [[point]] أو [[dot]]: [[v2.10.3]] = [[version two point ten point three]] (مش «two point one zero»، ومش «two point thirteen»). لأن [[10]] هنا رقم عشرة، مش كسر عشري. والـ [[v]] بتتقري [[version]] أو [[v]] «ڤي».

والـ status codes بتتقري ٣ أرقام: [[404]] = [[four oh four]]، و [[500]] = [[five hundred]]، و [[201]] = [[two oh one]]، و [[429]] = [[four twenty-nine]]. والـ ports: [[3000]] = [[three thousand]]، و [[8080]] = [[eighty eighty]]، و [[5173]] = [[fifty-one seventy-three]]، و [[5432]] = [[fifty-four thirty-two]]. والـ IPs بتتقري أرقام ونقط: [[127.0.0.1]] = [[one two seven dot zero dot zero dot one]] (أو [[one twenty-seven...]]) وكتير بيقولوا [[localhost]] وخلاص.

والـ [[0]] في الكلام التقني بتتقال [[oh]] «أو» أو [[zero]]: الاتنين تمام، و [[oh]] أسرع في وسط الأرقام.`,
          example: R`v2.10.3  →  version two point ten point three
Node 22 / React 19 / Python 3.13  →  Node twenty-two / React nineteen / Python three point thirteen
ES2015 / HTTP/2 / IPv6  →  E S twenty fifteen / H T T P two / I P v six
404 / 500 / 201 / 429  →  four oh four / five hundred / two oh one / four twenty-nine
localhost:3000 / :8080 / :5173 / :5432  →  localhost three thousand / eighty eighty / fifty-one seventy-three / fifty-four thirty-two
127.0.0.1  →  one two seven dot zero dot zero dot one (or just "localhost")
PR 231 / issue 1045  →  PR two thirty-one / issue ten forty-five
commit a3f9c2  →  a three f nine c two
Sentence:  After we upgraded to v2.10.3, the API started returning 429 on port 8080.`,
          try: R`اقرا بصوت عالي وسجّل: [[Next.js 15.5.2]]، و [[Node 22.11.0]]، و [[TypeScript 5.9]]، و [[503]]، و [[302]]، و [[localhost:4200]]، و [[192.168.1.10]]، و [[PR 1204]]. وبعدين قول جملة عن مشروعك فيها version و port و status code.`,
          flag: "script",
          deep: {
            why: R`في الـ debugging مع زميل وفي الـ incident calls، الأرقام دي هي نص الكلام: «we're on version...»، «it returns 502»، «the app runs on port...». ولو قريتها غلط ([[two point one zero]]) ممكن حد ينزّل إصدار غلط أو يدوّر في مكان غلط.`,
            how: R`الإصدارات: كل جزء رقم كامل. [[1.0]] = [[one point oh]]، و [[3.12]] = [[three point twelve]]، و [[0.9.1]] = [[zero point nine point one]] (أو [[oh point nine point one]]). وفي الكلام العادي بتتقال مختصرة: [[We're on Node 22]]، و [[the 3.x branch]] = [[three point X]]، و [[a major version]] = إصدار كبير (أول رقم)، و [[a patch]] = آخر رقم.

الأرقام الطويلة (ports و PR numbers): بتتقري أزواج: [[1045]] = [[ten forty-five]]، و [[2026]] = [[twenty twenty-six]]. لو فيه [[0]] في النص: [[3005]] = [[thirty oh five]] أو [[three thousand five]].

الـ hashes والأكواد: حرف حرف ورقم رقم، وبتقول أول ٤–٧ بس ([[commit a3f9c2]]). والإيميلات: [[at]] للـ @، و [[dot]] للنقطة.

و [[HTTP/2]] = [[H T T P two]]، و [[HTTP 1.1]] = [[H T T P one point one]]، و [[IPv4]] = [[I P v four]].`,
            when: "أي كلام عن إصدارات (upgrade, bump)، أو incident، أو تشغيل مشروع لزميل («open localhost...»)، أو تقرا error بصوت عالي.",
            mistakes: R`[[two point one zero]] لـ [[2.10]]. و [[four hundred four]] لـ [[404]] (مفهومة بس غريبة). و [[localhost three zero zero zero]] (مفهومة بس بطيئة). و [[two thousand and fifteen]] لـ [[ES2015]] (الأشهر [[twenty fifteen]]). وتقرا hash بالكامل ٤٠ حرف: ٦–٧ كفاية.`
          },
          teach: R`## الفكرة: كل نوع رقم ليه طريقة قراية

المثال ٨ سطور «الرقم ← بيتقري إزاي» وجملة. السهم [[→]] في المثال معناه «بيتقري كده». هنقسّمهم حسب النوع.

---

## ١. الإصدارات (السطر الأول والتاني)

القاعدة: كل جزء بين النقط **رقم كامل**، والنقطة [[point]].

| المكتوب | الصح | الغلط |
|---|---|---|
| [[v2.10.3]] | version two point **ten** point three | two point one zero |
| [[Python 3.13]] | three point **thirteen** | three point one three |
| [[Node 22]] | Node twenty-two | |

ليه؟ لأن [[2.10]] في الإصدارات مش كسر عشري: ده الإصدار العاشر بعد ٢، وبيجي **بعد** [[2.9]]. لو قلت «two point one» حد ممكن يفهم [[2.1]].

## ٢. المعايير (السطر التالت)

[[ES2015]] = [[E S twenty fifteen]] (السنة أزواج)، و [[HTTP/2]] = [[H T T P two]]، و [[IPv6]] = [[I P v six]].

## ٣. الـ status codes (السطر الرابع)

| الكود | بيتقري | ليه |
|---|---|---|
| [[404]] | four oh four | الصفر في النص [[oh]] |
| [[500]] | five hundred | رقم مدوّر |
| [[201]] | two oh one | |
| [[429]] | four twenty-nine | آخر رقمين مع بعض |

## ٤. الـ ports والـ IP (السطر الخامس والسادس)

الأرقام ذات ٤ خانات بتتقري **أزواج**: [[8080]] = eighty eighty، و [[5173]] = fifty-one seventy-three، و [[5432]] = fifty-four thirty-two. إلا لو مدوّر: [[3000]] = three thousand. والـ [[:]] اللي قبل الـ port مش بتتقري؛ بتقول [[localhost three thousand]] أو [[port three thousand]].

[[127.0.0.1]] = [[one two seven dot zero dot zero dot one]]، أو ببساطة [[localhost]].

## ٥. أرقام الـ PRs والـ hashes (السطر السابع والتامن)

[[PR 231]] = PR two thirty-one (أزواج من اليمين: 2 / 31). و [[issue 1045]] = ten forty-five. و [[commit a3f9c2]] = حرف حرف: «إيْ ثري إف ناين سي تو»، وكفاية أول ٦ أو ٧.

---

## ٦. الجملة

~~~text Sentence
After we upgraded to v2.10.3, the API started returning 429 on port 8080.
~~~

القراية: [[After we upgraded to version two point ten point three, the API started returning four twenty-nine on port eighty eighty.]]

[[upgraded]] و [[started]] آخرهم «ِد» بمقطع زيادة (آخرهم صوت d و t). و [[429]] = Too Many Requests.

---

## الخلاصة

| النوع | الطريقة | مثال |
|---|---|---|
| version | كل جزء رقم كامل + point | two point ten |
| status code | رقم + oh للصفر | four oh four |
| port / PR | أزواج | eighty eighty |
| IP | أرقام + dot | one two seven dot... |
| hash | حرف حرف، أول ٦ | a three f nine... |`,
          lines: [
            R`الإصدار: كل جزء رقم كامل. ten مش one zero.`,
            R`أسماء أدوات + إصدار: Node twenty-two، React nineteen، Python three point thirteen.`,
            R`معايير: ES twenty fifteen، و HTTP two، و IP v six.`,
            R`status codes: 404 «فور أو فور»، و 500 «فايڤ هاندرِد»، و 201 «تو أو وان»، و 429 «فور توِنتي ناين».`,
            R`الـ ports: ٣٠٠٠ «ثري ثاوزِند»، و ٨٠٨٠ «إيتي إيتي»، و ٥١٧٣ «فِفتي وان سِڤِنتي ثري»، و ٥٤٣٢ (Postgres).`,
            R`الـ IP: أرقام ونقط، أو قول localhost لو هو ده.`,
            R`أرقام الـ PRs والـ issues: أزواج: two thirty-one، و ten forty-five.`,
            R`الـ commit hash: حرف حرف، وأول ٦ كفاية.`,
            R`«بعد ما عملنا upgrade لـ v2.10.3، الـ API بدأ يرجّع 429 على port 8080». 429 = Too Many Requests.`
          ],
          sol: R`القراية الصح:
[[Next.js 15.5.2]] = [[Next J S fifteen point five point two]]
[[Node 22.11.0]] = [[Node twenty-two point eleven point oh]] (أو [[point zero]])
[[TypeScript 5.9]] = [[TypeScript five point nine]]
[[503]] = [[five oh three]]، و [[302]] = [[three oh two]]
[[localhost:4200]] = [[localhost forty-two hundred]] (ده الـ port بتاع Angular)
[[192.168.1.10]] = [[one ninety-two dot one sixty-eight dot one dot ten]]
[[PR 1204]] = [[PR twelve oh four]]

جملة من عندك، مثلًا: [[My app runs on Next.js fifteen on port three thousand, and the health check returns two hundred.]] لو قلت [[eleven]] في Node كـ [[one one]]، رجّع للقاعدة: كل جزء رقم كامل.`
        },
        {
          cmd: "3:30 PM",
          title: "3:30 PM و March 5th و «بتوقيتك ولا بتوقيتي»: المواعيد بالإنجليزي",
          desc: R`المواعيد بتتقال بطريقتين: الأرقام ([[three thirty]]) وده الأسهل والأشهر في الشغل، أو الطريقة التقليدية ([[half past three]]). استخدم الأرقام، وافهم التقليدية لما تسمعها.

[[3:30 PM]] = [[three thirty P M]]. و [[10:05]] = [[ten oh five]]. و [[9:00]] = [[nine]] أو [[nine o'clock]] أو [[nine A M]]. و [[12:00 PM]] = [[noon]] و [[12:00 AM]] = [[midnight]] (قولهم بالكلمة لأن AM و PM مع ١٢ بيلخبطوا الناس). و [[quarter past three]] = ٣:١٥، و [[quarter to four]] = ٣:٤٥، و [[half past three]] = ٣:٣٠.

حروف الجر: [[at 3 PM]] (ساعة)، و [[on Monday]] و [[on March 5th]] (يوم)، و [[in March]] و [[in 2026]] (شهر وسنة)، و [[by Thursday]] = قبل أو يوم الخميس (deadline)، و [[until Thursday]] = لحد الخميس (مدة). والتواريخ: [[March 5th]] بتتقري [[March fifth]]، أو [[the fifth of March]]. وفي الكتابة بالأرقام [[3/5]] في أمريكا = ٥ مارس، وفي أغلب العالم = ٣ مايو: عشان كده قول اسم الشهر.

وفرق التوقيت أهم حاجة في الشغل مع برا: قول دايمًا [[your time]] و [[my time]]، أو الـ time zone بالاسم.`,
          example: R`3:30 PM  →  three thirty P M  (or: half past three)
10:05  →  ten oh five          9:00  →  nine / nine o'clock / nine A M
12:00 PM  →  noon              12:00 AM  →  midnight
3:15  →  three fifteen / quarter past three     3:45  →  three forty-five / quarter to four
at 3 PM  |  on Monday  |  on March 5th  |  in March  |  in 2026  |  by Thursday  |  until Thursday
March 5th  →  March fifth / the fifth of March     2026  →  twenty twenty-six
Does 4 PM your time work? That's 5 PM for me in Cairo.
Can we push the call by 30 minutes?   I'll have it done by end of day, EOD.
The deadline is Q3, so by the end of September.`,
          try: R`اكتب وقول بصوت عالي ٣ رسايل: (١) تقترح ميعاد مكالمة مع زميل في برلين (قول الوقت بتوقيته وتوقيتك). (٢) تطلب تأجيل مكالمة نص ساعة. (٣) تقول إن التاسك هيخلص يوم الخميس ١٢ مارس قبل الساعة ٢ الضهر. قبلها ابحث في Google عن [[Cairo time to Berlin time]] عشان تعرف الفرق النهارده.`,
          flag: "script",
          deep: {
            why: R`في الشغل remote، الغلط في الميعاد معناه إنك تفوّت اجتماع أو تسلّم متأخر. و [[3/5]] و [[12 PM]] و «الساعة ٤» من غير time zone من أشهر أسباب اللخبطة، حتى بين الـ native speakers.`,
            how: R`اقترح ميعاد بالشكل ده: [[How about Tuesday at 4 PM your time, 5 PM Cairo time?]] أو [[Does 10 AM CET work for you?]]. وأدوات زي Google Calendar بتحوّل التوقيت لوحدها لما تبعت invite: ابعت invite مش بس رسالة.

وخلي بالك إن مصر رجّعت التوقيت الصيفي (DST) من ٢٠٢٣، وأوروبا وأمريكا بيغيّروا في تواريخ مختلفة عن بعض، فالفرق بيتغير كام أسبوع في السنة. عشان كده اتأكد من الفرق قبل الميعاد مش من الذاكرة (Google: [[Cairo time to London time]]).

عبارات تغيير المواعيد: [[push the call by 30 minutes]] = أجّل نص ساعة، و [[move the meeting to Thursday]] = انقل، و [[reschedule]] = حدد ميعاد تاني، و [[bring it forward]] = قدّمه، و [[I'm running 5 minutes late]] = هتأخر ٥ دقايق. واختصارات: [[EOD]] = آخر اليوم، و [[EOW]] = آخر الأسبوع، و [[ASAP]] = في أسرع وقت (بتتقري حروف أو «إيْساپ»)، و [[Q3]] = الربع التالت من السنة (يوليو–سبتمبر).`,
            when: "أي تحديد ميعاد أو deadline، وخصوصًا مع ناس في بلد تاني.",
            mistakes: R`[[in Monday]] (الصح [[on]]). و [[at the morning]] (الصح [[in the morning]]). و [[until Thursday]] بمعنى deadline (الصح [[by Thursday]]). و «the meeting is at 4» من غير time zone لحد في بلد تاني. و [[12 PM]] وانت قصدك نص الليل. و [[3/5]] مكتوبة لحد أمريكي وانت قصدك ٣ مايو. و [[postpone the meeting to 3]] (المفهوم أكتر [[move the meeting to 3]]).`
          },
          teach: R`## الفكرة: الساعة بالأرقام، والجر صح، والـ time zone دايمًا

المثال ٩ سطور: ٤ سطور ساعات، وسطر حروف جر، وسطر تواريخ، و ٣ جمل شغل حقيقية.

---

## ١. الساعات (أول ٤ سطور)

| المكتوب | بالأرقام (استخدم دي) | التقليدي (افهمه لما تسمعه) |
|---|---|---|
| [[3:30 PM]] | three thirty P M | half past three |
| [[10:05]] | ten oh five | five past ten |
| [[9:00]] | nine / nine A M | nine o'clock |
| [[3:15]] | three fifteen | quarter past three |
| [[3:45]] | three forty-five | quarter to four |
| [[12:00 PM]] | noon | |
| [[12:00 AM]] | midnight | |

[[oh]] = الصفر في نص الرقم («أو»). و [[past]] = بعد، و [[to]] = إلا (quarter to four = أربعة إلا ربع). و [[AM]] و [[PM]] بيتقروا حروف «إيْ إم» و «پي إم». الـ ١٢ قولها بالكلمة ([[noon]] و [[midnight]]) لأن [[12 PM]] و [[12 AM]] بيلخبطوا ناس كتير.

## ٢. حروف الجر (السطر الخامس)

| الحرف | مع إيه | مثال |
|---|---|---|
| [[at]] | ساعة | [[at 3 PM]] |
| [[on]] | يوم أو تاريخ | [[on Monday]]، [[on March 5th]] |
| [[in]] | شهر أو سنة أو جزء من اليوم | [[in March]]، [[in 2026]]، [[in the morning]] |
| [[by]] | deadline: في أو قبل | [[by Thursday]] |
| [[until]] | لحد (مدة مستمرة) | [[I'm off until Thursday]] |

الفرق بين [[by]] و [[until]] أهم سطر: [[I'll finish it by Thursday]] = هخلّصها قبل الخميس أو فيه. [[I'll work on it until Thursday]] = هفضل شغال عليها لحد الخميس.

## ٣. التواريخ (السطر السادس)

[[March 5th]] بتتقري [[March fifth]] (رقم ترتيبي: first و second و third و fifth و twelfth)، أو [[the fifth of March]]. والسنة أزواج: [[2026]] = twenty twenty-six. ولما تكتب، اكتب اسم الشهر: [[3/5]] في أمريكا ٥ مارس، وفي أغلب العالم ٣ مايو.

---

## ٤. الجمل

~~~text السطر السابع
Does 4 PM your time work? That's 5 PM for me in Cairo.
~~~

[[Does ... work?]] = ينفع؟ (مش «تشتغل»). [[your time]] = بتوقيتك. وقلت التوقيتين، فمفيش لخبطة.

~~~text السطر التامن
Can we push the call by 30 minutes?   I'll have it done by end of day, EOD.
~~~

[[push the call by 30 minutes]] = نأجّل المكالمة نص ساعة ([[by]] هنا = بمقدار). و [[I'll have it done]] = هتبقى خلصانة. و [[EOD]] = end of day، بتتقري حروف «إي أو دي».

~~~text السطر التاسع
The deadline is Q3, so by the end of September.
~~~

[[Q3]] = «كيو ثري»: الربع التالت من السنة (يوليو لسبتمبر). و [[by the end of September]] = قبل آخر سبتمبر.

> فرق التوقيت بين القاهرة وأوروبا مش ثابت طول السنة، لأن مصر رجّعت التوقيت الصيفي من ٢٠٢٣ وتواريخ التغيير مختلفة عن أوروبا. ابحث في Google عن [[Cairo time to Berlin time]] قبل الميعاد بدل الذاكرة.

---

## الخلاصة

- قول الساعة بالأرقام ([[three thirty]])، و [[noon]] و [[midnight]] للـ ١٢.
- [[at]] ساعة، و [[on]] يوم، و [[in]] شهر وسنة، و [[by]] deadline.
- مع أي حد في بلد تاني: [[your time]] و [[my time]]، وابعت calendar invite.`,
          lines: [
            R`٣:٣٠ العصر: بالأرقام «ثري ثِرتي پي إم» أو التقليدي «هاف پاست ثري».`,
            R`١٠:٠٥ «تِن أو فايڤ». و ٩:٠٠ ليها ٣ طرق.`,
            R`١٢ الضهر = noon، و ١٢ بالليل = midnight: قولهم بالكلمة.`,
            R`quarter past = وربع، و quarter to = إلا ربع.`,
            R`حروف الجر: at للساعة، و on لليوم والتاريخ، و in للشهر والسنة، و by للـ deadline، و until لحد (مدة).`,
            R`التاريخ: March fifth أو the fifth of March. والسنة أزواج.`,
            R`«٤ العصر بتوقيتك ينفع؟ دي ٥ عندي في القاهرة».`,
            R`«ممكن نأجّل المكالمة نص ساعة؟» و «هخلّصها قبل آخر اليوم».`,
            R`«الـ deadline في الربع التالت، يعني قبل آخر سبتمبر».`
          ],
          sol: R`نماذج صح (الفرق بين القاهرة وبرلين ساعة غالبًا، بس اتأكد النهارده):
(١) [[Hi Lena, how about Wednesday at 2 PM your time, 3 PM Cairo time? I'll send an invite.]]
(٢) [[Sorry, something came up. Can we push our call by 30 minutes, to 3:30?]]
(٣) [[I'll have the task done by Thursday, March 12th, before 2 PM.]] وبتتقري: [[Thursday, March twelfth, before two P M]].

راجع: [[on Wednesday]] مش [[in]]، و [[by Thursday]] للـ deadline، و [[twelfth]] (مش [[twelveth]]: الـ v بتبقى f). والإجابة الضعيفة: [[The meeting is at 3]] من غير يوم ولا time zone.`
        },
        {
          cmd: "1.5k و 99.9%",
          title: "fifteen ولا fifty؟ و 1.5k و 99.9% و 250ms و 10x: الأرقام في الكلام",
          desc: R`أخطر لخبطة أرقام في الكلام: [[fifteen]] (١٥) و [[fifty]] (٥٠)، و [[thirteen]] و [[thirty]]، و [[fourteen]] و [[forty]]... الفرق في الضغط: [[fif-TEEN]] الضغط على الآخر والـ [[n]] واضحة، و [[FIF-ty]] الضغط على الأول. في مكالمة بنت وحشة ممكن ١٥ ثانية تتسمع ٥٠. ولو الرقم مهم، أكّده: [[fifteen, one five]].

الكسور العشرية بـ [[point]]: [[1.5]] = [[one point five]]، و [[0.5]] = [[zero point five]] أو [[point five]] أو [[half]]. والإنجليزي بيستخدم النقطة للعشري والفاصلة للآلاف: [[1,250]] = ألف ومتين وخمسين، مش واحد وربع.

الاختصارات: [[1.5k]] = [[one point five K]] أو [[fifteen hundred]]، و [[2M]] = [[two million]] (مش [[two millions]]: [[hundred]] و [[thousand]] و [[million]] مفرد بعد رقم)، و [[99.9%]] = [[ninety-nine point nine percent]] (والمبرمجين بيقولوا [[three nines]] للـ uptime)، و [[250ms]] = [[two hundred fifty milliseconds]]، و [[2.5 GB]] = [[two point five gigs]] أو [[gigabytes]]، و [[10x]] = [[ten X]] أو [[ten times]].`,
          example: R`15 vs 50:  fif-TEEN vs FIF-ty     13 vs 30:  thir-TEEN vs THIR-ty     Confirm:  fifteen, one-five
1.5 → one point five     0.5 → point five / half     1,250 → one thousand two hundred fifty / twelve fifty
1.5k users → one point five K users / fifteen hundred users     2M → two million (not millions)
99.9% → ninety-nine point nine percent / three nines     0.1% → zero point one percent
250ms → two hundred fifty milliseconds     2.5 GB → two point five gigs     10x → ten X / ten times
O(n²) → O of n squared     O(n log n) → O of n log n     2^10 → two to the tenth
25,000 EGP → twenty-five thousand Egyptian pounds (25K)     $1,200 → twelve hundred dollars
1/3 → a third     3/4 → three quarters     -5 → minus five / negative five
Sentence:  We cut the response time from 800 milliseconds to 250, and errors dropped to 0.1%.`,
          try: R`اكتب ٣ «إنجازات بأرقام» من مشروع ليك (حقيقية أو تقريبية تعرف قستها إزاي)، زي: عدد يوزرز، ووقت تحميل قبل وبعد، ونسبة. قولهم بصوت عالي وسجّل، وبعدين قول [[15, 50, 13, 30, 14, 40]] ورا بعض وانت مركز في الضغط.`,
          flag: "script",
          deep: {
            why: R`في الانترفيو، الأرقام هي اللي بتخلي قصتك مقنعة («reduced load time from 4 to 1.5 seconds»). ولو قلتها غلط أو مش واضحة، الإنترفيوير هيسأل تاني أو هيفهم رقم تاني. وفي الشغل، [[fifteen]] و [[fifty]] ممكن تبقى فرق بين timeout معقول وكارثة.`,
            how: R`[[-teen]] vs [[-ty]]: في [[-teen]] طوّل الـ [[ee]] واضغط عليها، وقول الـ [[n]] واضحة: «فِف-تيين». في [[-ty]] الضغط على الأول والآخر قصير: «فِف-تي» (والأمريكان بيقولوا الـ t قريبة من «د»: «فِفدي»).

[[percent]] مفرد دايمًا: [[fifty percent]] مش [[percents]]. و [[a hundred users]] أو [[one hundred users]]. و [[hundreds of users]] (مئات) من غير رقم قبلها بس.

المقارنة: [[from X to Y]] = من كذا لكذا، و [[by 40%]] = بنسبة ٤٠٪ ([[reduced by 40%]])، و [[twice as fast]] = أسرع مرتين، و [[half the time]] = نص الوقت، و [[about]] و [[roughly]] و [[around]] = تقريبًا (استخدمهم لو الرقم تقريبي، دي أمانة مش ضعف).

الـ Big O: [[O(n)]] = [[O of n]] أو [[linear]]، و [[O(1)]] = [[O of one]] أو [[constant time]]، و [[O(n²)]] = [[O of n squared]] أو [[quadratic]]، و [[O(log n)]] = [[O of log n]].`,
            when: "إنجازاتك في الـ CV والانترفيو، والكلام عن الأداء والـ monitoring، والأسعار والمرتبات.",
            mistakes: R`[[fifteen]] بضغط على الأول فتتسمع [[fifty]]. و [[two millions users]]. و [[fifty percents]]. و [[one comma five]] لـ ١٫٥ (العربي والأوروبي بيستخدموا الفاصلة للعشري، الإنجليزي لأ). و [[the performance increased 50%]] من غير [[by]] (مفهومة بس الأوضح [[improved by 50%]]).`
          },
          teach: R`## الفكرة: الأرقام في الكلام ليها اختصاراتها، و ١٥ و ٥٠ فخ

المثال ٩ سطور، كل سطر نوع أرقام، وفي الآخر جملة إنجاز.

---

## ١. teen و ty (السطر الأول)

| الرقم | الضغط | النطق |
|---|---|---|
| ١٥ [[fifteen]] | fif-**TEEN** | «فِف-**تيين**» والـ n واضحة |
| ٥٠ [[fifty]] | **FIF**-ty | «**فِف**-تي» قصيرة |
| ١٣ [[thirteen]] | thir-**TEEN** | «ثِر-**تيين**» |
| ٣٠ [[thirty]] | **THIR**-ty | «**ثِر**-تي» |

ولو الرقم مهم في مكالمة: [[fifteen, one five]] = قولها وبعدين رقم رقم.

## ٢. العشري والآلاف (السطر التاني)

[[point]] للعشري: [[1.5]] = one point five، و [[0.5]] = point five أو half. والفاصلة في الإنجليزي **للآلاف**: [[1,250]] = one thousand two hundred fifty (أو twelve fifty). العربي والأوروبي بيستخدموا الفاصلة للعشري، فمتقولش [[one comma five]].

## ٣. الاختصارات (السطر التالت والرابع والخامس)

| المكتوب | بيتقري | ملاحظة |
|---|---|---|
| [[1.5k]] | one point five K / fifteen hundred | K = ألف |
| [[2M]] | two million | million مفرد بعد رقم |
| [[99.9%]] | ninety-nine point nine percent | المبرمجين: [[three nines]] |
| [[250ms]] | two hundred fifty milliseconds | |
| [[2.5 GB]] | two point five gigs | gigs = gigabytes |
| [[10x]] | ten X / ten times | أسرع ١٠ مرات |

القاعدة المهمة: [[hundred]] و [[thousand]] و [[million]] و [[percent]] **مفرد** بعد رقم: [[two million users]] و [[fifty percent]]، مش [[millions]] و [[percents]].

## ٤. Big O والأُس (السطر السادس)

[[O(n²)]] = O of n squared، و [[O(n log n)]] = O of n log n، و [[2^10]] = two to the tenth. الـ [[^]] اسمها caret، بس هنا بتتقري «to the».

## ٥. الفلوس والكسور (السطر السابع والتامن)

[[25,000 EGP]] = twenty-five thousand Egyptian pounds (و [[25K]] = twenty-five K). و [[$1,200]] = twelve hundred dollars (العلامة في الأول بتتقري في الآخر). و [[1/3]] = a third، و [[3/4]] = three quarters، و [[-5]] = minus five أو negative five.

---

## ٦. الجملة

~~~text Sentence
We cut the response time from 800 milliseconds to 250, and errors dropped to 0.1%.
~~~

| الحتة | المعنى |
|---|---|
| [[We cut the response time]] | قلّلنا وقت الرد ([[cut]] ماضيها cut) |
| [[from 800 milliseconds to 250]] | من ٨٠٠ لـ ٢٥٠ (eight hundred / two fifty) |
| [[errors dropped to 0.1%]] | الأخطاء نزلت لـ zero point one percent |

[[from X to Y]] هو شكل أي إنجاز بأرقام. و [[by]] للفرق: [[reduced by 40%]].

---

## الخلاصة

- teen ضغطها في الآخر، و ty في الأول. والمهم أكّده رقم رقم.
- النقطة عشري والفاصلة آلاف.
- [[million]] و [[percent]] مفرد بعد رقم.
- [[about]] و [[roughly]] لو الرقم تقريبي: دي أمانة مش ضعف.`,
          lines: [
            R`١٥ و ٥٠: الفرق في الضغط. teen الضغط على الآخر، و ty على الأول. ولو مهم أكّد برقم رقم.`,
            R`العشري بـ point. والفاصلة للآلاف: ١٬٢٥٠ = ألف ومتين وخمسين.`,
            R`1.5k = one point five K. و million مفرد بعد رقم.`,
            R`النسب: percent مفرد دايمًا. three nines = 99.9% uptime.`,
            R`الوقت والمساحة والمضاعفات: milliseconds، و gigs، و ten X.`,
            R`الـ Big O: O of n squared، و O of n log n. والأُس: to the tenth.`,
            R`الفلوس: twenty-five thousand Egyptian pounds، و twelve hundred dollars.`,
            R`الكسور والسالب: a third، و three quarters، و minus أو negative.`,
            R`«قلّلنا وقت الرد من ٨٠٠ مللي ثانية لـ ٢٥٠، والأخطاء نزلت لـ ٠٫١٪». cut = قلّل، dropped = نزل.`
          ],
          sol: R`نماذج لـ ٣ إنجازات:
[[The app has about fifteen hundred active users a month.]]
[[I reduced the page load time from four seconds to one point five.]]
[[After I added the index, the query went from two seconds to about thirty milliseconds, roughly sixty times faster.]]

راجع: [[about]] أو [[roughly]] لو الرقم تقريبي، و [[from ... to ...]] للمقارنة، و [[percent]] مفرد. وفي التسجيل: [[fifteen hundred]] الـ [[n]] في [[teen]] واضحة، و [[thirty]] الضغط على [[THIR]]، و [[sixty]] على [[SIX]].

الإجابة الضعيفة: [[I made it faster]] من غير أرقام، أو رقم مش عارف جبته منين: هيتسأل «How did you measure that?» والإجابة الصح عليه: [[I used Lighthouse / the Network tab / the logs]].`
        },
        {
          cmd: "رموز الكود",
          title: "تقرا سطر كود بصوت عالي: { } و ( ) و => و === و || و _ في pair programming",
          desc: R`في الـ pair programming والـ live coding وانت بتملي كود على حد أو بتشرح، محتاج تقول الرموز بأساميها. ومعظمنا عارف الرمز بس مش عارف اسمه بالإنجليزي، فبنقول «القوس اللي كده» ونشاور.

الأقواس: [[( )]] = [[parentheses]] أو [[parens]] (أو [[brackets]] بالبريطاني)، و [ ] = [[square brackets]]، و [[{ }]] = [[curly braces]] أو [[curly brackets]]، و [[< >]] = [[angle brackets]] (وفي المقارنة [[less than]] و [[greater than]]). وتقول [[open paren]] و [[close paren]] لما تملي.

علامات: [[;]] = [[semicolon]]، و [[:]] = [[colon]]، و [[.]] = [[dot]]، و [[,]] = [[comma]]، و [[!]] = [[bang]] أو [[exclamation mark]] أو [[not]]، و [[=]] = [[equals]]، و [[===]] = [[triple equals]]، و [[!==]] = [[not equal]] أو [[bang double equals]]، و [[=>]] = [[arrow]] أو [[fat arrow]]، و [[&&]] = [[and]]، و [[||]] = [[or]] أو [[double pipe]]، و [[?.]] = [[optional chaining]]، و [[??]] = [[nullish coalescing]] أو [[double question mark]]، و [[...]] = [[spread]] أو [[dot dot dot]].

ورموز الكيبورد: [[_]] = [[underscore]]، و [[-]] = [[dash]] أو [[hyphen]] أو [[minus]]، و [[/]] = [[slash]]، و [[\]] = [[backslash]]، و [[|]] = [[pipe]]، و [[*]] = [[star]] أو [[asterisk]]، و [[#]] = [[hash]] (والأمريكان [[pound]])، و [[@]] = [[at]]، و [[~]] = [[tilde]]، و [[^]] = [[caret]]، و [[&]] = [[ampersand]]، و [[%]] = [[percent]] أو [[mod]]، و [[$__bt]] = [[backtick]].`,
          example: R`( ) parens     [ ] square brackets     { } curly braces     < > angle brackets
;  semicolon    :  colon    ,  comma    .  dot    !  bang / not    ?  question mark
=  equals    ===  triple equals    !==  not equal    =>  arrow    &&  and    ||  or
?.  optional chaining    ??  nullish coalescing    ...  spread    $__bt  backtick
_  underscore    -  dash    /  slash    \  backslash    |  pipe    *  star    #  hash    @  at    ~  tilde
camelCase    PascalCase    snake_case    kebab-case    UPPER_CASE    all lowercase
Code:  const total = items.reduce((sum, i) => sum + i.price, 0);
Say it:  const total equals items dot reduce, open paren, sum comma i, arrow, sum plus i dot price, comma zero, close paren, semicolon.
Short:  "On line twelve, change the triple equals to not equal, and wrap it in curly braces."`,
          try: R`خد ٣ سطور من كود كتبته انت (فيهم أقواس وarrow function وشرط)، واقرا كل سطر بصوت عالي بالطريقة الطويلة (زي [[Say it]]). وبعدين اعمل «إملاء»: قول سطر لصاحب (أو سجّله وافتح ملف فاضي واكتب من التسجيل) وشوف هل الكود اللي اتكتب مطابق.`,
          flag: "script",
          deep: {
            why: R`في الـ live coding الإنترفيوير ساعات بيقول «you're missing a closing brace» أو «change the double equals to triple equals». ولو مش عارف الأسماء هتدوّر وتضيّع وقت. وفي الـ pair programming انت اللي هتقول «put a semicolon after the paren».`,
            how: R`في الكلام العادي محدش بيقرا كل رمز. بتقول المعنى: [[if user is not null]] بدل [[if open paren user bang equals null close paren]]. الرموز بالأسماء بتحتاجها لما تشاور على حاجة معينة: [[You're missing a closing curly brace on line 20]]، أو [[Add a question mark before the dot]].

أسماء الـ casing مهمة جدًا في الـ code review والكلام: [[camelCase]] (userName)، و [[PascalCase]] (UserName)، و [[snake_case]] (user_name)، و [[kebab-case]] (user-name)، و [[SCREAMING_SNAKE_CASE]] أو [[UPPER_CASE]] للـ constants.

لما تتهجى اسم متغير: [[user underscore id, all lowercase]] أو [[userId, camelCase, capital I]]. و [[capital]] أو [[uppercase]] = حرف كبير، و [[lowercase]] = صغير.

والـ [[#]]: البريطانيين [[hash]]، والأمريكان [[pound sign]] أو [[number sign]]، وفي السوشيال [[hashtag]]. في الكود [[hash]] مفهومة للكل.`,
            when: "pair programming، و live coding في انترفيو، و code review بالصوت، ولما حد بيملّيك أمر أو URL.",
            mistakes: R`«قوس» لكل الأنواع ([[bracket]] مش واضحة لوحدها: قول [[curly]] أو [[square]]). و [[comma]] و [[colon]] بيتلخبطوا. و [[slash]] و [[backslash]] بيتلخبطوا (في مسارات Windows ده بيفرق). و [[dash]] و [[underscore]]. و «إكسكلاميشن» بدل [[bang]] أو [[not]] في وسط الكود (مش غلط، بس طويلة).`
          },
          teach: R`## الفكرة: اعرف اسم كل رمز، بس اتكلم بالمعنى

المثال ٦ سطور أسماء رموز، وسطر كود، ونفس السطر مقروء رمز رمز، وجملة عملية. أغلب الوقت مش هتقرا الرموز، هتقول المعنى. الأسماء بتحتاجها لما تشاور على حاجة.

---

## ١. الأقواس (السطر الأول)

| الرمز | اسمه | لما تملي |
|---|---|---|
| [[( )]] | parentheses / parens | open paren / close paren |
| [ ] | square brackets | open square bracket |
| [[{ }]] | curly braces | open curly brace |
| [[< >]] | angle brackets | (وفي المقارنة less than / greater than) |

[[bracket]] لوحدها مش واضحة (البريطانيين بيقصدوا بيها الأقواس العادية). قول النوع دايمًا: curly ولا square.

## ٢. علامات وعمليات (السطر التاني والتالت والرابع)

[[;]] semicolon، و [[:]] colon، و [[,]] comma، و [[.]] dot، و [[!]] bang أو not، و [[?]] question mark.

[[=]] equals، و [[===]] triple equals، و [[!==]] not equal، و [[=>]] arrow، و [[&&]] and، و الخطين الرأسيين (OR) بيتقروا or أو double pipe.

[[?.]] optional chaining، و [[??]] nullish coalescing، و [[...]] spread، وعلامة الـ template string اسمها backtick.

## ٣. رموز الكيبورد (السطر الخامس)

[[_]] underscore، و [[-]] dash أو hyphen أو minus، و [[/]] slash، والمايلة العكسية backslash (مسارات Windows)، والخط الرأسي pipe، و [[*]] star أو asterisk، و [[#]] hash، و [[@]] at، و [[~]] tilde «تِلدا».

## ٤. طرق كتابة الأسماء (السطر السادس)

| الاسم | شكله | بيستخدم في |
|---|---|---|
| [[camelCase]] | userName | متغيرات JS |
| [[PascalCase]] | UserName | classes و React components |
| [[snake_case]] | user_name | Python و الداتابيز |
| [[kebab-case]] | user-name | URLs و CSS classes |
| [[UPPER_CASE]] | MAX_SIZE | constants |

---

## ٥. سطر الكود مقروء (السطر السابع والتامن)

~~~text Code
const total = items.reduce((sum, i) => sum + i.price, 0);
~~~

القراية الطويلة (للإملاء بس):

| الكود | بيتقري |
|---|---|
| [[const total =]] | const total equals |
| [[items.reduce(]] | items dot reduce, open paren |
| [[(sum, i) =>]] | sum comma i, arrow |
| [[sum + i.price]] | sum plus i dot price |
| [[, 0);]] | comma zero, close paren, semicolon |

لاحظ إن المثال كتب [[(sum, i)]] من غير ما يقول الأقواس الداخلية؛ في الإملاء الحقيقي قولها: [[open paren, sum comma i, close paren, arrow]].

## ٦. الطريقة العملية (آخر سطر)

~~~text Short
On line twelve, change the triple equals to not equal, and wrap it in curly braces.
~~~

ده الشكل اللي هتسمعه وتقوله في pair programming: مكان ([[On line twelve]]) + فعل ([[change ... to ...]]، و [[wrap it in]] = لفّها جوه). مش بتقرا السطر كله، بتشاور على الحتة.

---

## الخلاصة

- الأقواس: parens و square brackets و curly braces، وقول النوع دايمًا.
- في الكلام قول المعنى ([[if the user is missing]])، والأسماء للإملاء والتصحيح.
- اعرف أسماء الـ casing: camelCase و snake_case و kebab-case.`,
          lines: [
            R`الأقواس الـ ٤: parens (عادية)، و square brackets (مربعة)، و curly braces (معقوفة)، و angle brackets (زاوية).`,
            R`علامات الترقيم: semicolon ; و colon : و comma , و dot . و bang ! و question mark ?.`,
            R`المقارنة والمنطق: equals، و triple equals، و not equal، و arrow، و and، و or.`,
            R`حديثة في JS: optional chaining و nullish coalescing و spread و backtick (template string).`,
            R`رموز الكيبورد: underscore و dash و slash و backslash و pipe و star و hash و at و tilde.`,
            R`أسماء طرق كتابة الأسماء: camelCase و PascalCase و snake_case و kebab-case و UPPER_CASE.`,
            R`سطر كود: جمع أسعار العناصر بـ reduce.`,
            R`نفس السطر مقروء رمز رمز: بتحتاج ده في الإملاء بس.`,
            R`الطريقة العملية: «في سطر ١٢ غيّر الـ triple equals لـ not equal، وحطها جوه curly braces». wrap = تلف.`
          ],
          sol: R`مثال: السطر [[if (!user?.email) return res.status(400).json({ error: "Email is required" });]]

الطريقة الطويلة: [[if, open paren, bang user, question mark dot email, close paren, return res dot status, open paren, four hundred, close paren, dot json, open paren, open curly brace, error colon, double quote, Email is required, double quote, close curly brace, close paren, semicolon.]]

الطريقة الطبيعية في pair programming: [[If the user or their email is missing, return a four hundred with an error message.]]

في تمرين الإملاء: الغلطات الشائعة إن [[?.]] تطلع [[.]] بس (عشان اتقالت سريعة)، أو [[curly]] تتكتب [[(]]. لو الكود اللي اتكتب طلع مطابق من أول مرة، ممتاز. ولو لأ، الغلط غالبًا في الأقواس: قول نوعها دايمًا.`
        }
      ]
    }
]);
