// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "JS في المتصفح بعمق",
      l: 3,
      time: R`حوالي ٤ ساعات، وكل درس فيه معمل صغير بيشتغل على جهازك`,
      goal: [
        R`تحط «حارس» قدام أي object بـ [[Proxy]]: يتحقق من القيم، ويسجّل مين قرا إيه، ويدّي قيم افتراضية، وتفهم إن ده بالظبط اللي ورا [[reactive]] في Vue 3.`,
        R`تختار صح بين polling و SSE و WebSocket لأي ميزة لحظية (إشعارات، شات، أسعار)، وتكتب العميل اللي بيرجع يتصل لوحده لما الشبكة تقع.`,
        R`تستخدم الحافظة والمكان والمشاركة صح: صفحة آمنة (https أو localhost)، وضغطة من اليوزر، وصلاحيات، و feature detection، ورسالة مفهومة لكل خطأ.`,
        R`تقرا أي رد [[fetch]] حتة حتة بـ Streams: نسبة تحميل حقيقية، وسطور بتتعالج أول ما توصل من غير ما الملف كله يقعد في الرام، ومن غير حروف عربي بايظة.`,
      ],
      use: {
        prog: R`الأربع حاجات دول هما الفرق بين صفحة «بتشتغل» وتطبيق بيتحس إنه حي: الداتا بتتحدّث لوحدها، والفورم بيرفض الغلط قبل ما يوصل، وزرار «انسخ» و «شارك» شغالين على الموبايل، والملف الكبير بيبان بيتحمّل.`,
        work: R`«الأسعار مبتتحدّثش غير لما أعمل refresh»، و «زرار النسخ مش شغّال على الموقع الحقيقي بس شغّال عندي»، و «الصفحة بتهنّج لما الملف كبير» — تلات شكاوى بتتكرر في أي شغل frontend، والوحدة دي بتقفلهم.`,
        cs: R`الـ metaprogramming (كود بيغيّر سلوك كود تاني)، والفرق بين pull و push في الشبكات، ونموذج الصلاحيات في المتصفح (origin و secure context)، و backpressure اللي هو نفس فكرة الـ flow control في TCP.`,
        net: R`SSE هو HTTP عادي بيفضل مفتوح، و WebSocket بيبدأ HTTP وبعدين يتحوّل ([[101 Switching Protocols]]) لقناة في الاتجاهين. وده بيأثر على الـ proxy والـ load balancer والـ timeouts.`,
      },
      lab: R`mkdir -p ~/lab/deep && cd ~/lab/deep && npm init -y && npm pkg set type=module && npm i ws`,
      projects: [
        { lvl: 'صغير', t: R`فورم بيرفض الغلط بـ Proxy`, what: R`object إعدادات ([[port]] و [[host]] و [[debug]]) ملفوف في [[Proxy]] بـ [[set]] بيرفض أي نوع غلط وبرسالة فيها اسم الخاصية والقيمة اللي وصلت، و [[get]] بيرجّع قيمة افتراضية للي مش موجود. من درس «Proxy و Reflect».`, done: R`[[cfg.port = '80']] بيرمي [[TypeError]] فيه كلمة [[port]]، و [[cfg.port = 8080]] بيعدّي، و [[cfg.timeout]] بيرجّع القيمة الافتراضية مش [[undefined]]، و [[JSON.stringify(cfg)]] شغّال من غير error.` },
        { lvl: 'صغير', t: R`زرار «انسخ» لكل صندوق كود`, what: R`صفحة فيها كذا [[pre]]، وجنب كل واحد زرار بينسخ نصه بـ [[navigator.clipboard.writeText]] ويكتب «اتنسخ ✓» لمدة ثانيتين. ولو الحافظة مش موجودة (الصفحة مش آمنة) الزرار بيختفي أو بيقول السبب. من درس «Clipboard و Geolocation و Share».`, done: R`على [[localhost]] الزرار بينسخ والنص بيتلصق صح في أي برنامج، وعلى [[http://]] من جهاز تاني في الشبكة الزرار مبيرميش error ساكت في الـ Console، وبيقول ليه مش شغّال.` },
        { lvl: 'متوسط', t: R`لوحة أسعار لحظية بـ SSE`, what: R`سيرفر Node بـ [[http]] بس بيبعت [[event: price]] كل ثانية فيه [[id:]]، وصفحة بـ [[EventSource]] بتعرض الأسعار وبتلوّن اللي طلع أخضر واللي نزل أحمر، وبتعرض حالة الاتصال من [[readyState]]. من درس «WebSocket و SSE».`, done: R`لما تقفل السيرفر الحالة بتبقى «بيحاول يرجع»، ولما تشغّله تاني بيرجع لوحده من غير refresh، والسيرفر بيطبع [[Last-Event-ID]] اللي وصله، ومفيش سعر بيتكرر ولا بيضيع في العرض.` },
        { lvl: 'متوسط', t: R`رافع ومنزّل بنسبة حقيقية`, what: R`صفحة بتنزّل ملف كبير بـ [[fetch]] وبتعرض شريط تقدّم من [[getReader()]] و [[content-length]]، وزرار «إلغاء» بـ [[AbortController]]، ولو السيرفر مبعتش الحجم بتعرض الميجات اللي وصلت بدل النسبة. من درس «Streams» ودرس «fetch و AbortController».`, done: R`الشريط بيتحرك مع التحميل ويوصل ١٠٠٪ بالظبط، والإلغاء بيوقّف التحميل (الـ Network tab بيقول canceled)، والملف المضغوط بـ gzip مبيطلّعش نسبة أكتر من ١٠٠٪.` },
        { lvl: 'كبير', t: R`شات صغير بيستحمل الشبكة`, what: R`سيرفر بـ [[ws]] بيوزّع الرسايل على كل المتصلين، وعميل في المتصفح بيرجع يتصل لوحده بـ backoff (نص ثانية، ثانية، ٢، ٤... لحد ٣٠)، وبيحط الرسايل اللي اتكتبت وهو مقطوع في طابور ويبعتها أول ما يرجع، والحالة (متصل/بيحاول/مقطوع) ظاهرة. وكل رسالة شكلها [[{type, text, at}]] ومتحقق منه قبل الإرسال بـ [[Proxy]] أو دالة تحقق. من دروس الوحدة كلها ودرس «EventEmitter».`, done: R`تقفل السيرفر ٢٠ ثانية وتكتب ٣ رسايل: بتظهر «في الطابور»، ولما السيرفر يرجع بتتبعت بالترتيب ومرة واحدة بس. والسيرفر بيكتب لوج سطر لكل اتصال وقفلة بالـ code. ورسالة JSON بايظة من عميل تاني مبتوقّعش السيرفر (بيرد بـ error ويكمّل). ولو قفلت التاب وفتحتها تاني بيتصل عادي.`, ext: R`زوّد غرف (rooms)، و «فلان بيكتب...»، وتاريخ آخر ٥٠ رسالة بيتبعت للي لسه داخل، وزرار «شارك لينك الغرفة» بـ [[navigator.share]] مع بديل نسخ.` },
        { lvl: 'كبير', t: R`عارض لوج حي`, what: R`سيرفر بيعمل [[tail]] على ملف لوج وبيبعت السطور الجديدة SSE، وصفحة بتعرضها بفلتر (error/warn/info) وزرار «وقّف التمرير». والتحميل الأول للملف القديم بيتقري بـ Streams سطر سطر (مش [[res.text()]]) عشان ملف ١٠٠ ميجا ميهنّجش الصفحة. من دروس «WebSocket و SSE» و «Streams».`, done: R`ملف ٥٠ ألف سطر بيبدأ يظهر في أقل من ثانية قبل ما يخلص تحميل، والرام في Task Manager بتاع المتصفح مبتطلعش مع حجم الملف، والسطور الجديدة بتظهر في أقل من ثانية من ما تتكتب، ولو السيرفر وقع ورجع العارض بيكمّل من آخر [[id]].`, ext: R`فلتر بـ regex، وتلوين الـ stack traces، وتحميل الجزء الظاهر بس (virtual list) لما السطور تعدّي ١٠٠ ألف.` },
        { lvl: 'فكرة', t: R`ميزة لحظية لمشروعك`, what: R`خد مشروع عندك (متجر، مدونة، لوحة تحكم) وضيف له ميزة لحظية واحدة انت اللي تختارها: إشعار طلب جديد، أو عدّاد زوار، أو حالة شحنة، أو تعليقات بتظهر لوحدها. قرّر انت SSE ولا WebSocket ولا polling واكتب ليه في README.`, done: R`الـ README فيه جدول قرارك (اتجاه الداتا، كام مرة في الدقيقة، محتاج auth إزاي)، والميزة بترجع لوحدها بعد ما الشبكة تقع، وفيه اختبار يدوي مكتوب خطوة بخطوة حد تاني يقدر يكرره.`, ext: R`قيس الحمل: كام اتصال مفتوح السيرفر بيستحمله على جهازك، وحط الرقم في الـ README، وجرّبه ورا Nginx (درس «WebSockets» في تاب Nginx).` },
      ],
      n: R`أربع حاجات بتفرق بين صفحة وتطبيق: [[Proxy]] اللي ورا Vue، والاتصال اللحظي بـ SSE و WebSocket، و APIs الجهاز (الحافظة والمكان والمشاركة) بصلاحياتها، و Streams. كل اللي في Node اتشغّل على Node 24.22 على ويندوز ١١، وكل اللي في المتصفح اتشغّل في Chromium 156 بـ Playwright على [[localhost]] و [[http://example.com]]، واللي مينفعش يتجرّب (شاشة المشاركة، وسؤال الصلاحية الحقيقي) مكتوب إنه من MDN`,
      items: [
        {
          cmd: "Proxy و Reflect",
          title: "حارس قدام أي object: get و set و has و deleteProperty",
          learn: R`تلف object في [[Proxy]] بيعترض القراية والكتابة والـ [[in]] والمسح، وتستخدم [[Reflect]] عشان تكمّل السلوك الأصلي صح.`,
          out: R`تحقق من القيم في مكان واحد، ولوج لكل وصول، وقيم افتراضية، وتفهم إزاي Vue 3 بيعرف إن الداتا اتغيّرت.`,
          use: {
            prog: R`أي حاجة لازم تحصل «كل ما حد يقرا أو يكتب خاصية»: تحقق، أو لوج، أو تحديث شاشة، أو cache. من غير Proxy لازم تكتب getter و setter لكل خاصية بإيدك.`,
            work: R`Vue 3 و MobX و Immer و Valtio كلهم مبنيين على Proxy. ولما حاجة في Vue «مبتتحدّثش»، السبب غالبًا إنك اشتغلت على الـ object الأصلي مش على الـ Proxy.`,
            cs: R`ده metaprogramming: الكود بيغيّر **قواعد** اللغة نفسها لـ object معيّن. والـ traps هي «العمليات الداخلية» اللي المحرك بيعملها (Get و Set) متاحة ليك.`,
          },
          desc: R`[[new Proxy(target, handler)]] بيعمل object «بديل» قدام [[target]]. أي عملية عليه (قراية، كتابة، [[in]]، [[delete]]) بتعدّي الأول على دالة في [[handler]] اسمها **trap**، وانت بتقرر: تكمّل، ولا ترفض، ولا ترجّع حاجة تانية.

و [[Reflect]] فيه دالة بنفس اسم كل trap ([[Reflect.get]] و [[Reflect.set]]...) بتعمل السلوك **الأصلي** بالظبط. فالقاعدة: اعمل شغلك، وبعدين [[return Reflect.xxx(...)]] بنفس الـ arguments.

**الـ traps الأربعة اللي هتستخدمها ٩٠٪ من الوقت:**
• [[get(target, key, receiver)]]: لما حد يقرا [[obj.key]].
• [[set(target, key, value, receiver)]]: لما حد يكتب [[obj.key = value]]، ولازم ترجّع [[true]].
• [[has(target, key)]]: لما حد يسأل [[key in obj]].
• [[deleteProperty(target, key)]]: لما حد يعمل [[delete obj.key]].

**ليه ترجّع [[Reflect.set]] مش تكتب [[target[key] = value]] وخلاص؟** جرّبتها: trap [[set]] نسي [[return]] في ملف [[.mjs]] (strict mode) رمى [[TypeError: 'set' on proxy: trap returned falsish for property 'y']]. و [[Reflect.set]] بيرجّع [[true]] أو [[false]] صح، وبيعدّي الـ [[receiver]] عشان الـ getters تشتغل على الـ Proxy مش الأصل.

وده الأساس اللي Vue 3 مبني عليه: [[reactive(obj)]] بيرجّع Proxy، الـ [[get]] بيسجّل «مين قرا الخاصية دي»، والـ [[set]] بينادي اللي قرأها عشان يرسم تاني.`,
          example: R`// شغّله كملف .mjs: الـ ESM دايمًا strict mode، وده بيفرق في رجوع الـ traps
const user = { name: 'Sara', age: 25 };
const audit = [];
const safe = new Proxy(user, {
  get(target, key, receiver) {
    audit.push('get ' + String(key));
    return key in target ? Reflect.get(target, key, receiver) : 'مش موجود';
  },
  set(target, key, value, receiver) {
    if (key === 'age' && (!Number.isInteger(value) || value < 0)) {
      throw new TypeError('age لازم رقم صحيح موجب، وصلني ' + value);
    }
    audit.push('set ' + String(key));
    return Reflect.set(target, key, value, receiver);
  },
  has(target, key) {
    return !String(key).startsWith('_') && Reflect.has(target, key);
  },
  deleteProperty(target, key) {
    if (key === 'name') return false;
    return Reflect.deleteProperty(target, key);
  },
});
console.log(safe.name, safe.email);
safe.age = 26;
try { safe.age = -3; } catch (e) { console.log(e.message); }
user._token = 'x';
console.log('_token' in safe, 'name' in safe, Object.keys(safe));
console.log(delete safe.age, user.age);
try { delete safe.name; } catch (e) { console.log(e.message); }
console.log(audit);`,
          lines: [
            R`الـ object الأصلي (الـ **target**). هو اللي الداتا فعلًا متخزنة فيه، والـ Proxy مش بيعمل نسخة منه، هو بس بيقف قدامه. أي تغيير بيعدّي من الـ Proxy بيوصل هنا.`,
            R`لستة هنسجّل فيها كل عملية عدّت من الحارس، عشان نشوف في الآخر بالظبط مين اتنادى وبالترتيب. ده نفس فكرة الـ audit log في أي نظام.`,
            R`[[new Proxy(user, handler)]] بيرجّع object جديد ([[safe]]) شكله زي [[user]] بالظبط، بس كل عملية عليه بتعدّي على الـ handler الأول. الـ handler object عادي، وكل method فيه اسمها trap.`,
            R`trap القراية: بيتنادى مع أي [[safe.x]] أو [[ safe['x'] ]]. [[target]] هو [[user]]، و [[key]] اسم الخاصية (نص أو Symbol)، و [[receiver]] هو الـ Proxy نفسه (أو اللي ورث منه).`,
            R`بنسجّل القراية. [[String(key)]] مش زيادة: لو الـ key كان Symbol (زي [[Symbol.iterator]] لما حد يعمل [[for...of]]) الجمع بالنص هيرمي [[TypeError: Cannot convert a Symbol value to a string]]، و [[String()]] بيحوّله صح.`,
            R`القيمة الافتراضية: لو الخاصية موجودة رجّعها بالطريقة الأصلية ([[Reflect.get]] بالـ [[receiver]] عشان الـ getters)، ولو مش موجودة رجّع «مش موجود» بدل [[undefined]]. ده بالظبط اللي بيخلي [[safe.email]] تطبع كلمة مفهومة.`,
            R`نهاية trap الـ [[get]]. الفاصلة بعده عشان إحنا جوه object literal فيه methods كتير.`,
            R`trap الكتابة: بيتنادى مع أي [[safe.x = v]]. فيه argument زيادة [[value]] (القيمة الجديدة). أي تحقق بتحطه هنا بيشتغل على **كل** كتابة من أي مكان في الكود.`,
            R`التحقق: لو الخاصية [[age]] والقيمة مش رقم صحيح ([[Number.isInteger]] بترجّع [[false]] مع [[2.5]] ومع [['26']] النص) أو سالبة، ارفض. أي خاصية تانية بتعدّي عادي.`,
            R`بنرمي [[TypeError]] برسالة فيها القيمة اللي وصلت، عشان اللي غلط يعرف غلط في إيه. الرمي بيوقف الكتابة، فـ [[user.age]] بيفضل زي ما هو.`,
            R`نهاية الـ [[if]].`,
            R`لو التحقق عدّى بنسجّل الكتابة في اللوج قبل ما ننفّذها.`,
            R`ننفّذ الكتابة الأصلية ونرجّع نتيجتها. [[Reflect.set]] بيرجّع [[true]] لو الكتابة نجحت، وده **لازم** يرجع من الـ trap: لو نسيت [[return]] الـ trap بيرجّع [[undefined]]، وفي strict mode ده [[TypeError: 'set' on proxy: trap returned falsish]] (جرّبتها).`,
            R`نهاية trap الـ [[set]].`,
            R`trap الـ [[in]]: بيتنادى مع [['x' in safe]] بس، ومش بيتنادى مع [[Object.keys]] ولا [[for...in]] (دول ليهم trap اسمه [[ownKeys]]).`,
            R`أي خاصية اسمها بيبدأ بـ [[_]] نقول إنها مش موجودة، والباقي نسأل عنه الأصل بـ [[Reflect.has]]. ده بيخبّي الخصايص «الداخلية» من الفحص بـ [[in]] بس، والقراية المباشرة لسه شغالة (شوف «جرّب»).`,
            R`نهاية trap الـ [[has]].`,
            R`trap المسح: بيتنادى مع [[delete safe.x]].`,
            R`[[name]] ممنوع يتمسح: نرجّع [[false]]. في sloppy mode الـ [[delete]] هيرجّع [[false]] ساكت، وفي strict mode (زي هنا) بيرمي [[TypeError]] فيه اسم الخاصية.`,
            R`أي خاصية تانية تتمسح بالطريقة الأصلية، و [[Reflect.deleteProperty]] بيرجّع [[true]] لو المسح نجح.`,
            R`نهاية trap الـ [[deleteProperty]].`,
            R`نهاية الـ handler ونهاية [[new Proxy(...)]].`,
            R`قرايتين: [[name]] موجودة فرجعت [[Sara]]، و [[email]] مش موجودة فرجعت «مش موجود» من الـ trap. الناتج: [[Sara مش موجود]]، والاتنين اتسجّلوا في اللوج.`,
            R`كتابة سليمة: [[26]] رقم صحيح موجب، فالتحقق عدّى و [[user.age]] بقى ٢٦ واتسجّل [[set age]].`,
            R`كتابة غلط: [[-3]] سالب، فالـ trap رمى والـ [[catch]] طبع «age لازم رقم صحيح موجب، وصلني -3». ومتسجّلش حاجة في اللوج لأن الرمي حصل قبل [[audit.push]].`,
            R`بنكتب في [[user]] **الأصلي** مباشرة مش في [[safe]]، فالـ trap مش بيشوف الكتابة دي خالص ومتسجّلتش. ده الباب الخلفي اللي لازم تقفله: لو حد معاه الأصل، الحارس ملوش لازمة.`,
            R`[['_token' in safe]] رجّعت [[false]] بسبب الـ [[has]]، و [['name' in safe]] [[true]]. بس [[Object.keys(safe)]] طلّعت [[ [ 'name', 'age', '_token' ] ]] لأن [[has]] مش بيأثر عليها. ده أشهر سوء فهم في Proxy.`,
            R`[[delete safe.age]] عدّى ورجّع [[true]]، و [[user.age]] بقى [[undefined]]: المسح وصل للأصل.`,
            R`[[delete safe.name]] الـ trap رجّع [[false]]، ولأننا في strict mode اترمى [[TypeError: 'deleteProperty' on proxy: trap returned falsish for property 'name']]، و [[name]] لسه موجود.`,
            R`اللوج في الآخر: [[ [ 'get name', 'get email', 'set age' ] ]]. الكتابة الفاشلة متسجّلتش، والكتابة على الأصل متسجّلتش، و [[in]] و [[delete]] مش بيعدّوا على [[get]] أصلًا.`,
          ],
          try: R`خبّي [[_token]] من **كل** حاجة مش من [[in]] بس: زوّد trap اسمه [[ownKeys(target)]] بيرجّع [[Reflect.ownKeys(target)]] من غير اللي بيبدأ بـ [[_]]، وخلّي الـ [[get]] يرجّع [[undefined]] للي بيبدأ بـ [[_]]. وبعدين اطبع [[Object.keys(safe)]] و [[JSON.stringify(safe)]] و [[{ ...safe }]] و [[safe._token]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** Proxy بـ [[get]] و [[set]] بيسجّلوا في لستة. اكتب على ورقة اللستة هيبقى فيها إيه بعد [[p.n++]] و [[p.n += 10]] وكام عنصر، وبعدين شغّل الكود.`, done: R`توقّعك طابق اللي اتطبع: [[ [ 'get n', 'set n', 'get n', 'set n', 'get n' ] ]] و ٥ عناصر (آخر [[get]] من [[console.log(p.n)]])، وتقدر تقول ليه [[++]] قراية وكتابة مش كتابة بس.` },
            { lvl: 'تطبيق', t: R`**ابني:** دالة [[withDefaults(obj, defaults)]] بترجّع Proxy بيرجّع القيمة من [[obj]] لو موجودة ومن [[defaults]] لو لأ، ودالة [[strict(obj)]] بترمي [[ReferenceError]] لما تقرا خاصية مش موجودة (عشان غلطة الإملا [[cfg.prot]] تتمسك).`, done: R`[[withDefaults({ port: 8080 }, { port: 3000, host: 'localhost' })]] بيدّي [[8080 localhost]]، و [[strict({port: 1}).prot]] بيرمي برسالة فيها [[prot]]، و [[JSON.stringify]] و [[await]] على الـ strict لسه شغالين (هتكتشف إنهم بيسألوا عن [[toJSON]] و [[then]]).` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** الـ reactive الصغير اللي في الشرح، لو عملت [[cart.items.push(x)]] الشاشة مبتترسمش، ولو عملت [[cart.qty = 3]] وهي أصلًا ٣ بيترسم برضه في نسخة زميلك. صلّح الاتنين: خلّي [[get]] يلف أي object راجع في [[reactive]] (بـ [[WeakMap]] كاش عشان نفس الـ object ميتلفّش مرتين)، وخلّي [[set]] مينادي [[trigger]] لو القيمة متغيّرتش.`, done: R`[[cart.items.push('mug')]] بيطبع الإجمالي الجديد مرة، و [[cart.items]] بيرجّع **نفس** الـ Proxy كل مرة ([[cart.items === cart.items]] بـ [[true]])، و [[cart.qty = 3]] مرتين ورا بعض بيطبع مرة واحدة.` },
          ],
          deep: {
            why: R`من غير Proxy، عشان تتحقق من كل كتابة لازم كل اللي بيكتب ينادي دالة ([[setAge(26)]]) وتثق إن محدش هيكتب [[user.age = -3]] مباشرة. Proxy بيخلي الحماية جوه الـ object نفسه، فأي كود (حتى مكتبة مش بتاعتك) بيعدّي عليها. وده اللي خلّى Vue 3 يقدر يعرف بإضافة خاصية جديدة ([[obj.newKey = 1]]) وبتغيير [[ arr[0] ]] اللي Vue 2 (بـ [[Object.defineProperty]]) مكانش بيشوفهم.`,
            how: R`المحرك بيعمل أي عملية على object بـ «عمليات داخلية» في المواصفات: Get و Set و HasProperty و Delete و OwnPropertyKeys وغيرهم (١٣ في المجموع). الـ Proxy object عادي بس العمليات الداخلية بتاعته بتنادي الـ trap بتاعك لو موجود، ولو مش موجود بتعمل العملية على الـ target.

و [[Reflect]] هو نفس العمليات الداخلية دي كدوال: [[Reflect.get(t, k, r)]] = Get بالظبط، ولذلك بيرجّع [[true]]/[[false]] بدل ما يرمي. ودا اللي بيخلي [[return Reflect.set(...)]] الطريقة الصح.

الـ [[receiver]]: لو [[user]] فيه [[get full() { return this.first + ' ' + this.last }]] والـ trap عمل [[ return target[key] ]]، الـ [[this]] جوه الـ getter هيبقى [[user]] الأصلي، فقراية [[first]] و [[last]] مش هتعدّي على الحارس. جرّبتها: من غير receiver اللوج سجّل [[ [ 'full' ] ]] بس، و بـ [[Reflect.get(t, k, r)]] سجّل [[ [ 'full', 'first', 'last' ] ]]. ده بالظبط اللي Vue محتاجه عشان يعرف إن [[full]] بيعتمد على [[first]].

وفيه قواعد اسمها invariants المحرك بيفرضها: لو خاصية في الأصل non-configurable و non-writable، الـ [[get]] لازم يرجّع قيمتها الحقيقية، وإلا [[TypeError]].`,
            when: R`استخدمه لما تحتاج سلوك على **كل** الخصايص من غير ما تعرفها مقدمًا: تحقق من schema، لوج للـ debugging، قيم افتراضية لـ config، تتبّع تغييرات (reactivity أو «فيه حاجات متحفظتش»)، أو mock في الاختبارات بيرد على أي method. ومتستخدمهوش لخاصية أو اتنين معروفين: [[get]]/[[set]] عادي أو [[#private]] أوضح وأسرع. وفي كود بيلف ملايين المرات، كل وصول بقى نداء دالة زيادة، فقيس قبل ما تحطه في الحلقة السخنة.`,
            mistakes: R`تنسى [[return]] في [[set]] أو [[deleteProperty]] فيترمي [[trap returned falsish]] في ESM. أو تكتب في الأصل ([[user.x = 1]]) وتستغرب إن الحارس مشافش حاجة. أو تفتكر [[has]] بيخبّي من [[Object.keys]] (عايز [[ownKeys]]). أو تعمل Proxy على [[Map]] أو [[Date]]: جرّبت [[new Proxy(new Map(), {}).set('k', 1)]] ورمت [[Method Map.prototype.set called on incompatible receiver]] لأن الداتا الداخلية مش على الـ Proxy. أو strict proxy بيرمي على أي خاصية مش موجودة فيكسر [[JSON.stringify]] (بيسأل عن [[toJSON]]) و [[await]] (بيسأل عن [[then]]) و [[console.log]]. أو تفتكره deep: [[deep.a.b = 2]] مبيعدّيش على [[set]] بتاع [[deep]] خالص.`,
          },
          teach: R`## الفكرة: حارس على الباب

[[Proxy]] مش نسخة ومش class جديد. هو object «فاضي» واقف قدام object تاني، وكل عملية عليه بتسأل الحارس الأول. كل اللي تحت اتشغّل على ويندوز ١١ بـ Node 24.22 كملفات [[.mjs]]، والناتج منسوخ زي ما طلع.

~~~text الشكل
  الكود بتاعك         الحارس (handler)          الأصل (target)
  safe.age = 26  ──►  set(target,'age',26)  ──►  user.age = 26
                      ↑ تحقق، لوج، رفض
~~~

---

## ١. أصغر Proxy: من غير ولا trap

~~~js
const p = new Proxy({ x: 1 }, {});
p.y = 2;
console.log(p.x, p.y);
~~~

الـ handler فاضي، فكل عملية بتعدّي للأصل زي ما هي. ده بيأكد إن Proxy من غير traps = الأصل بالظبط. كل trap بتزوّده بيغيّر عملية واحدة بس.

---

## ٢. [[get]]: كل قراية

~~~js
get(target, key, receiver) {
  audit.push('get ' + String(key));
  return key in target ? Reflect.get(target, key, receiver) : 'مش موجود';
}
~~~

| الـ argument | هو إيه | مثال من التشغيل |
|---|---|---|
| [[target]] | الـ object الأصلي اللي الداتا فيه | [[user]] نفسه |
| [[key]] | اسم الخاصية: نص، أو Symbol لو المحرك بيسأل عن حاجة داخلية | [['email']] أو [[Symbol.iterator]] |
| [[receiver]] | الـ Proxy نفسه، أو object وارث منه، وده اللي بيبقى [[this]] جوه الـ getters | [[safe]] |

**ليه [[String(key)]]؟** لو حد عمل [[for...of]] على الـ Proxy، المحرك بيقرا [[Symbol.iterator]]، و [['get ' + symbol]] بيرمي. [[String(Symbol('s'))]] بيرجّع [['Symbol(s)']] عادي.

**ليه [[receiver]]؟** اتجرّب على object فيه getter:

~~~js
const user = { first: 'Sara', last: 'Ali', get full() { return this.first + ' ' + this.last; } };
const seen = [];
const bad = new Proxy(user, { get(t, k) { seen.push(k); return t[k]; } });
console.log(bad.full, seen);
seen.length = 0;
const good = new Proxy(user, { get(t, k, r) { seen.push(k); return Reflect.get(t, k, r); } });
console.log(good.full, seen);
~~~

~~~text الناتج
Sara Ali [ 'full' ]
Sara Ali [ 'full', 'first', 'last' ]
~~~

الناتج واحد، بس في الأولى الحارس **مشافش** إن [[full]] قرا [[first]] و [[last]]، لأن [[ t[k] ]] شغّل الـ getter بـ [[this = user]]. في التانية [[Reflect.get(t, k, r)]] شغّله بـ [[this = safe]] فكل قراية جوه عدّت على الحارس. لو بتبني reactivity، الفرق ده هو الفرق بين شاشة بتتحدّث وشاشة مبتتحدّثش.

---

## ٣. [[set]]: كل كتابة، ولازم ترجّع [[true]]

~~~js
set(target, key, value, receiver) {
  if (key === 'age' && (!Number.isInteger(value) || value < 0)) {
    throw new TypeError('age لازم رقم صحيح موجب، وصلني ' + value);
  }
  audit.push('set ' + String(key));
  return Reflect.set(target, key, value, receiver);
}
~~~

عندك طريقتين ترفض بيهم:

| الطريقة | اللي بيحصل | تستخدمها إمتى |
|---|---|---|
| [[throw new TypeError(...)]] | الكتابة بتقف برسالة انت كاتبها، في strict و sloppy | لما عايز اللي كتب يعرف غلط في إيه بالظبط |
| [[return false]] | في strict mode: [[TypeError: 'set' on proxy: trap returned falsish]]، وفي sloppy: ولا حاجة | نادر، الرسالة مش بتقول السبب |

**التجربة اللي بتوضّح ليه [[return]] مهم:**

~~~js
'use strict';
const q = new Proxy({}, { set(t, k, v) { t[k] = v; } });
try { q.y = 1; } catch (e) { console.log(e.constructor.name, e.message); }
~~~

~~~text الناتج
TypeError 'set' on proxy: trap returned falsish for property 'y'
~~~

الكتابة **حصلت** فعلًا ([[t[k] = v]] اشتغلت)، بس الـ trap رجّع [[undefined]] (falsy) فالمحرك فهم إنها فشلت ورمى. ونفس الكود في ملف [[.cjs]] من غير [[use strict]] عدّى ساكت (جرّبتها: [[sloppy ok 1]]). يعني الكود ده ممكن يشتغل سنين في سكربت قديم ويقع أول ما يتنقل لـ ESM. الحل الوحيد: [[return Reflect.set(target, key, value, receiver)]].

---

## ٤. [[has]] و [[deleteProperty]]

~~~js
has(target, key) {
  return !String(key).startsWith('_') && Reflect.has(target, key);
},
deleteProperty(target, key) {
  if (key === 'name') return false;
  return Reflect.deleteProperty(target, key);
},
~~~

~~~text الناتج من المثال
false true [ 'name', 'age', '_token' ]
true undefined
'deleteProperty' on proxy: trap returned falsish for property 'name'
~~~

الفخ في السطر الأول: [[in]] قال [[false]] لـ [[_token]]، بس [[Object.keys]] طلّعه. كل عملية ليها trap بتاعها:

| العملية | الـ trap اللي بيتنادى |
|---|---|
| [[obj.x]] و [[ obj['x'] ]] | [[get]]، وكمان مع أي method بتناديها لأنها قراية الأول |
| [[obj.x = 1]] | [[set]]، وكمان مع [[++]] و [[+=]] بعد [[get]] |
| [['x' in obj]] | [[has]]، وده بس اللي بيأثر عليه |
| [[delete obj.x]] | [[deleteProperty]]، ولازم يرجّع [[true]] في strict mode |
| [[Object.keys]] و [[for...in]] و [[JSON.stringify]] و [[{...obj}]] | [[ownKeys]] (ومعاه [[getOwnPropertyDescriptor]]) |
| [[fn()]] لو الأصل دالة | [[apply]]، بيستخدم للوج النداءات أو الـ mocks |
| [[new Fn()]] | [[construct]]، لو عايز تتحكم في إنشاء الـ objects |

---

## ٥. قيم افتراضية، و strict object، والفخ اللي محدش بيتوقّعه

~~~js
const withDefaults = (obj, defaults) => new Proxy(obj, {
  get: (t, k, r) => (k in t ? Reflect.get(t, k, r) : defaults[k]),
});
const config = withDefaults({ port: 8080 }, { port: 3000, host: 'localhost' });
console.log(config.port, config.host, config.debug);
~~~

~~~text الناتج
8080 localhost undefined
~~~

وعكسها: object بيرمي لو قريت خاصية مش موجودة، عشان [[cfg.prot]] (غلطة إملا) تتمسك بدل ما ترجّع [[undefined]] وتكمّل:

~~~js
const strict = obj => new Proxy(obj, {
  get(t, k, r) {
    if (typeof k === 'string' && !(k in t)) throw new ReferenceError('مفيش خاصية اسمها ' + k);
    return Reflect.get(t, k, r);
  },
});
const s = strict({ port: 1 });
try { s.prot; } catch (e) { console.log(e.message); }
console.log(JSON.stringify(s));
~~~

~~~text الناتج
مفيش خاصية اسمها prot
ReferenceError: مفيش خاصية اسمها toJSON
    at Object.get (file:///.../defaults.mjs:8:51)
    at JSON.stringify (<anonymous>)
~~~

**المفاجأة:** [[JSON.stringify]] بيسأل الأول «فيه [[toJSON]]؟» قبل ما يحوّل، فالـ strict proxy رمى. ونفس الكلام [[await s]] (بيسأل عن [[then]]). الحل: استثني الأسماء دي ([[k !== 'toJSON' && k !== 'then']])، وبعدها [[JSON.stringify(s)]] طلّع [[{"port":1}]] و [[await]] رجّع نفس الـ object.

---

## ٦. Vue 3 بيعمل كده بالظبط: reactive في ٢٥ سطر

~~~js
let active = null;
const deps = new WeakMap();
function track(target, key) {
  if (!active) return;
  let byKey = deps.get(target);
  if (!byKey) deps.set(target, (byKey = new Map()));
  let fns = byKey.get(key);
  if (!fns) byKey.set(key, (fns = new Set()));
  fns.add(active);
}
function trigger(target, key) {
  deps.get(target)?.get(key)?.forEach(fn => fn());
}
function reactive(obj) {
  return new Proxy(obj, {
    get(t, k, r) { track(t, k); return Reflect.get(t, k, r); },
    set(t, k, v, r) {
      const old = t[k];
      const ok = Reflect.set(t, k, v, r);
      if (old !== v) trigger(t, k);
      return ok;
    },
  });
}
function effect(fn) { active = fn; fn(); active = null; }
const cart = reactive({ qty: 1, price: 50 });
effect(() => console.log('الإجمالي:', cart.qty * cart.price));
cart.qty = 3;
cart.price = 40;
cart.qty = 3;
~~~

~~~text الناتج
الإجمالي: 50
الإجمالي: 150
الإجمالي: 120
~~~

1. [[effect(fn)]] بيحط الدالة في [[active]] ويشغّلها مرة. وهي شغالة بتقرا [[cart.qty]] و [[cart.price]]، فالـ [[get]] بينادي [[track]] اللي بيسجّل «الدالة دي بتعتمد على [[qty]] و [[price]]».
2. الدفتر: [[WeakMap]] من الـ object لـ [[Map]] من اسم الخاصية لـ [[Set]] من الدوال (نفس دفتر درس «EventEmitter»). [[WeakMap]] عشان لو الـ object اتشال من الذاكرة الدفتر بتاعه يتشال معاه (درس «Map و Set»).
3. [[cart.qty = 3]]: الـ [[set]] كتب، ولقى القيمة اتغيّرت، فنادى [[trigger]] اللي شغّل الدالة تاني: [[150]].
4. آخر [[cart.qty = 3]] متطبعش حاجة لأن [[old !== v]] [[false]].

ونفس الفكرة في Vue الحقيقي (اتجرّب على Vue 3.5.44 من npm):

~~~js
import { reactive, effect, isProxy, toRaw } from '@vue/reactivity';
import { types } from 'node:util';
const raw = { qty: 1 };
const cart = reactive(raw);
console.log(types.isProxy(cart), isProxy(cart), toRaw(cart) === raw, cart === raw);
effect(() => console.log('vue: qty =', cart.qty));
cart.qty++;
~~~

~~~text الناتج
true true true false
vue: qty = 1
vue: qty = 2
~~~

[[util.types.isProxy]] من Node نفسه قال [[true]]: الـ [[reactive]] Proxy حقيقي. و [[cart === raw]] [[false]]، وده سبب أشهر باج في Vue: لو عدّلت [[raw]] مباشرة الشاشة مش هتعرف. (التفاصيل في درس «ref و reactive» في تاب Vue.)

---

## ٧. حاجات Proxy مبيعملهاش

~~~js
const deep = new Proxy({ a: { b: 1 } }, { set(t, k, v, r) { console.log('set', k); return Reflect.set(t, k, v, r); } });
deep.a.b = 2;
const arr = new Proxy([], { set(t, k, v, r) { console.log('set', k, v); return Reflect.set(t, k, v, r); } });
arr.push('x');
const m = new Proxy(new Map(), {});
try { m.set('k', 1); } catch (e) { console.log(e.message); }
const { proxy, revoke } = Proxy.revocable({ x: 1 }, {});
revoke();
try { proxy.x; } catch (e) { console.log(e.message); }
~~~

~~~text الناتج
set 0 x
set length 1
Method Map.prototype.set called on incompatible receiver #<Map>
Cannot perform 'get' on a proxy that has been revoked
~~~

- [[deep.a.b = 2]] **مطبعش حاجة**: [[deep.a]] قراية بترجّع الـ object الداخلي العادي، والكتابة حصلت عليه. عشان كده Vue بيلف أي object راجع من [[get]] في [[reactive]] كمان (ده تمرين «تحدي»).
- [[push]] على array عمل كتابتين: العنصر و [[length]].
- [[Map]] و [[Set]] و [[Date]] داتاهم في «خانات داخلية» على الأصل، فالـ methods بتاعتهم بترفض الـ Proxy. Vue بيحل ده بـ handler مخصوص للـ collections.
- [[Proxy.revocable]] بيدّيك [[revoke()]] تقفل بيها الحارس نهائيًا: مفيد لو اديت object لكود تاني ومش عايزه يستخدمه بعد وقت معيّن.

---

## الخلاصة

- [[new Proxy(target, handler)]]: كل عملية بتسأل الـ trap الأول، ومن غير trap بتروح للأصل.
- رجّع دايمًا [[Reflect.xxx(...)]] بنفس الـ arguments، وخصوصًا الـ [[receiver]]، و [[set]] و [[deleteProperty]] لازم يرجّعوا [[true]] وإلا [[TypeError]] في ESM.
- [[has]] للـ [[in]] بس، و [[ownKeys]] للـ [[Object.keys]] و JSON و spread.
- Proxy سطحي، ومبيحميش من حد معاه الأصل، وبيكسر [[Map]] و [[Date]].
- Vue 3 = Proxy بـ [[get]] بيسجّل ([[track]]) و [[set]] بيبلّغ ([[trigger]]).`,
          sol: R`اتجرّب على Node 24.22. الـ [[ownKeys]] بيخبّي من [[Object.keys]] و [[JSON.stringify]] والـ spread و [[for...in]]، و [[has]] من [[in]]، و [[get]] من القراية المباشرة:

~~~text الناتج
[ 'name', 'age' ] {"name":"Sara","age":25} false undefined
{ name: 'Sara', age: 25 }
for-in name
for-in age
~~~

ولاحظ إن [[user._token]] لسه موجود في الأصل: الحارس بيخبّي عن اللي بيستخدم [[safe]] بس.`,
          solCode: R`const hidden = (k) => typeof k === 'string' && k.startsWith('_');
const user = { name: 'Sara', age: 25, _token: 'x' };
const safe = new Proxy(user, {
  has: (t, k) => !hidden(k) && Reflect.has(t, k),
  ownKeys: (t) => Reflect.ownKeys(t).filter((k) => !hidden(k)),
  get: (t, k, r) => (hidden(k) ? undefined : Reflect.get(t, k, r)),
});
console.log(Object.keys(safe), JSON.stringify(safe), '_token' in safe, safe._token);
console.log({ ...safe });
for (const k in safe) console.log('for-in', k);`,
          check: {
            lang: "js",
            starter: R`// rules: { اسم الخاصية: دالة بترجّع true لو القيمة سليمة }
function validated(target, rules) {
  return new Proxy(target, {
    // اكتب set هنا
  });
}`,
            tests: R`test("القيمة السليمة بتتكتب في الأصل", () => {
  const raw = { age: 1 };
  const p = validated(raw, { age: (v) => Number.isInteger(v) && v >= 0 });
  p.age = 30;
  expect(raw.age).toBe(30);
});
test("القيمة الغلط بترمي TypeError فيه اسم الخاصية", () => {
  const p = validated({}, { age: (v) => Number.isInteger(v) && v >= 0 });
  expect(() => { p.age = -1; }).toThrow(/age/);
});
test("القيمة الغلط مبتتكتبش", () => {
  const raw = { age: 5 };
  const p = validated(raw, { age: (v) => Number.isInteger(v) && v >= 0 });
  try { p.age = 'x'; } catch (e) {}
  expect(raw.age).toBe(5);
});
test("خاصية مالهاش قاعدة بتتكتب عادي", () => {
  const p = validated({}, { age: () => false });
  p.name = 'Sara';
  expect(p.name).toBe('Sara');
});
test("الكتابة السليمة مبترميش في strict mode", () => {
  const p = validated({}, { age: (v) => v > 0 });
  expect((() => { 'use strict'; p.age = 3; return p.age; })()).toBe(3);
});`,
            solution: R`function validated(target, rules) {
  return new Proxy(target, {
    set(t, key, value, receiver) {
      const rule = rules[key];
      if (rule && !rule(value)) throw new TypeError('قيمة غلط لـ ' + String(key) + ': ' + value);
      return Reflect.set(t, key, value, receiver);
    },
  });
}`
          }
        },
        {
          cmd: "WebSocket و SSE",
          title: "تحديثات لحظية: polling ولا SSE ولا WebSocket؟",
          learn: R`تفرق بين الطرق التلاتة وتختار، وتكتب عميل [[EventSource]] بأحداث ليها أسماء ورجوع لوحده، وعميل [[WebSocket]] بيبعت ويستقبل ويرجع يتصل بـ backoff.`,
          out: R`ميزة لحظية بتستحمل وقوع الشبكة، من غير ما تعمل طلب كل ثانية على الفاضي.`,
          use: {
            prog: R`أي داتا بتتغيّر عند السيرفر واليوزر لازم يشوفها من غير refresh: إشعارات، أسعار، حالة طلب، تقدّم شغلانة طويلة، رد AI بيتكتب حرف حرف (ده SSE في أغلب الـ APIs).`,
            work: R`أول سؤال في أي ميزة «لحظية» في الشغل: الداتا رايحة في اتجاه واحد (سيرفر ← يوزر) ولا الاتنين؟ الإجابة دي لوحدها بتختار الأداة، والغلط فيها بيكلّف سيرفرات أو كود reconnect مكتوب بإيدك على الفاضي.`,
            net: R`SSE طلب HTTP عادي ردّه مبيخلصش ([[Content-Type: text/event-stream]])، و WebSocket بيبدأ بطلب HTTP فيه [[Upgrade: websocket]] والسيرفر يرد [[101 Switching Protocols]] وبعدها الاتصال مبقاش HTTP. والـ proxies (زي Nginx) محتاجة إعداد للاتنين.`,
            cs: R`pull (العميل يسأل) ضد push (السيرفر يبعت)، و full-duplex (الاتنين في نفس الوقت) ضد half، و exponential backoff عشان آلاف العملاء ميرجعوش يضربوا السيرفر في نفس الثانية.`,
          },
          desc: R`لما الداتا بتتغيّر عند السيرفر، عندك تلات طرق اليوزر يعرف: **polling** (العميل يسأل كل شوية)، و **SSE** (السيرفر يبعت على اتصال HTTP مفتوح، اتجاه واحد)، و **WebSocket** (قناة مفتوحة في الاتجاهين).

| | polling | SSE ([[EventSource]]) | WebSocket |
|---|---|---|---|
| الاتجاه | العميل بيسأل، والسيرفر بيرد | السيرفر بيبعت بس | الاتنين بيبعتوا في أي وقت |
| البروتوكول | HTTP عادي متكرر | HTTP واحد ردّه مبيخلصش | بيبدأ HTTP ويتحوّل لـ [[ws://]] |
| الرجوع بعد ما الشبكة تقع | كل طلب لوحده أصلًا | **لوحده**، وبيبعت [[Last-Event-ID]] | **انت** اللي بتكتبه |
| نوع الداتا | أي حاجة | نص بس (UTF-8) | نص أو binary |
| إمتى | تحديث كل دقيقة أو أكتر، أو API مش بتاعك | إشعارات، أسعار، تقدّم، رد AI بيتكتب | شات، ألعاب، تعديل مشترك، أي حاجة العميل بيبعت فيها كتير |

**الحسبة اللي بتحسم polling:** ١٠٠٠ يوزر بيسألوا كل ٥ ثواني = ١٢ ألف طلب في الدقيقة، وأغلبهم بيرجعوا «مفيش جديد». SSE أو WebSocket = ١٠٠٠ اتصال مفتوح وطلب واحد لما يحصل حاجة فعلًا.

في Node 24 [[WebSocket]] global جاهز كعميل (زي المتصفح)، و [[EventSource]] محتاج [[--experimental-eventsource]] (جرّبتها: من غيره [[typeof EventSource]] = [[undefined]]). والسيرفر: SSE بـ [[node:http]] لوحده، و WebSocket بباكدج [[ws]].`,
          example: R`// SSE: السيرفر بيكلّم، والعميل بيسمع (المتصفح، أو Node بـ --experimental-eventsource)
const es = new EventSource('http://localhost:8301/events');
console.log('SSE readyState', es.readyState);
es.addEventListener('price', (e) => {
  const d = JSON.parse(e.data);
  console.log('price', d.price, 'id', e.lastEventId);
  if (d.n === 5) es.close();
});
es.onerror = () => console.log('SSE error، readyState', es.readyState);
// WebSocket: الاتنين بيتكلموا على نفس الاتصال
const ws = new WebSocket('ws://localhost:8300');
ws.addEventListener('open', () => ws.send(JSON.stringify({ name: 'sara', text: 'أهلا' })));
ws.addEventListener('message', (e) => {
  const msg = JSON.parse(e.data);
  console.log('WS وصل:', msg.from, msg.text);
  ws.close(1000, 'خلصت');
});
ws.addEventListener('close', (e) => console.log('WS close', e.code, e.reason, e.wasClean));
setTimeout(() => {}, 3000);`,
          lines: [
            R`[[new EventSource(url)]] بيفتح طلب [[GET]] عادي ويسيبه مفتوح يستنى أحداث. مفيش [[await]] ولا [[connect()]]: الاتصال بيبدأ لوحده أول ما تعمل الـ object. في المتصفح ممكن تكتب [['/events']] بس (نفس الدومين).`,
            R`[[readyState]] على طول بعد الإنشاء = [[0]] ([[CONNECTING]]): الطلب لسه رايح. القيم التلاتة: [[0]] بيتصل أو بيرجع يتصل، و [[1]] مفتوح ([[OPEN]])، و [[2]] اتقفل نهائي ([[CLOSED]]).`,
            R`[[addEventListener('price', ...)]] بيسمع لحدث **اسمه** [[price]]، يعني السيرفر بعت سطر [[event: price]]. لو السيرفر مبعتش [[event:]] الحدث اسمه [[message]] وبيوصل لـ [[onmessage]]. والأحداث اللي ليها اسم **مبتوصلش** لـ [[onmessage]] خالص.`,
            R`[[e.data]] دايمًا نص (SSE مبيبعتش binary)، فبنعمل [[JSON.parse]] بنفسنا. لو السيرفر بعت JSON بايظ السطر ده هيرمي جوه الـ listener، فحطه في [[try]] في الكود الحقيقي.`,
            R`[[e.lastEventId]] هو آخر [[id:]] السيرفر بعته. المتصفح بيفتكره لوحده، ولو الاتصال وقع بيبعته في هيدر [[Last-Event-ID]] وهو بيرجع، فالسيرفر يكمّل من بعده. في التشغيل وصل [[3]] للسيرفر بعد ما الاتصال الأول اتقفل.`,
            R`[[es.close()]] بيقفل الاتصال **نهائيًا** و [[readyState]] بيبقى [[2]]، ومش هيرجع يتصل تاني. من غيرها الاتصال بيفضل مفتوح للأبد، وده مهم في SPA: لما اليوزر يسيب الصفحة اقفله.`,
            R`نهاية الـ listener بتاع [[price]].`,
            R`[[onerror]] بيتنادى في حالتين ولازم تفرّق بينهم بـ [[readyState]]: لو [[0]] يبقى الاتصال وقع والمتصفح **هيرجع لوحده** (ده اللي حصل لما السيرفر قفل بعد ٣ أحداث)، ولو [[2]] يبقى استسلم نهائيًا (السيرفر رد [[502]] مثلًا، اتجرّب) ولازم انت تعيد.`,
            R`[[new WebSocket('ws://...')]] بيفتح اتصال WebSocket. [[ws://]] عادي و [[wss://]] مشفّر (لازم في أي صفحة https). في Node 24 الـ [[WebSocket]] global ومحتاجش [[import]]، وهو عميل بس، مش سيرفر.`,
            R`أول ما الاتصال يتفتح ([[open]]) بنبعت رسالة. [[send]] بياخد نص أو binary، فبنحوّل الـ object لـ JSON. لو بعت قبل [[open]] هيرمي [[InvalidStateError]]، عشان كده [[send]] جوه الـ listener.`,
            R`[[message]] بيتنادى مع كل رسالة من السيرفر. هنا مفيش أسماء أحداث زي SSE: كل الرسايل بتيجي هنا، وانت اللي بتحط [[type]] جوه الـ JSON لو عايز تفرّق.`,
            R`[[e.data]] جه [[string]] لأن السيرفر بعت نص. لو بعت binary هيوصل [[Blob]] في المتصفح (أو [[ArrayBuffer]] لو غيّرت [[ws.binaryType]]).`,
            R`طبع [[WS وصل: sara أهلا]]: السيرفر استلم رسالتنا وبعتها لكل المتصلين، وإحنا منهم.`,
            R`[[close(code, reason)]] بيقفل بأدب: [[1000]] معناه «قفلة عادية» والسبب نص قصير. على طول بعدها [[readyState]] = [[2]] ([[CLOSING]]) لحد ما السيرفر يرد، وبعدها [[3]] ([[CLOSED]]). لاحظ إن أرقام WebSocket غير SSE: هنا ٤ حالات.`,
            R`نهاية الـ listener بتاع [[message]].`,
            R`[[close]] بيقولك اتقفل إزاي: [[e.code]] ([[1000]] عادي، [[1006]] اتقطع من غير قفلة، زي ما حصل لما السيرفر مكانش شغّال)، و [[e.reason]]، و [[wasClean]] ([[true]] لو الطرفين قفلوا بأدب). WebSocket **مبيرجعش يتصل لوحده**، والمكان ده هو اللي بتحط فيه الـ reconnect.`,
            R`السطر ده لـ Node بس: [[EventSource]] بتاع Node مش بيخلي البرنامج عايش وهو مستني يرجع يتصل، فمن غيره البرنامج قفل بعد الـ error على طول (جرّبتها). المؤقت الفاضي بيخليه عايش ٣ ثواني. في المتصفح متحتاجهوش.`,
          ],
          try: R`شغّل سيرفر الـ SSE اللي في الشرح، وافتح [[http://localhost:8301/events]] في المتصفح نفسه (هتشوف النص الخام بيوصل)، وبعدين بـ [[curl -N]]. وبعدها اقفل السيرفر وشغّله تاني والعميل شغّال، وقيس الوقت بين [[error]] و [[open]] التاني، وغيّر [[retry: 1000]] لـ [[retry: 3000]] وقيس تاني.`,
          practice: [
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** سيرفر SSE بيبعت [[res.write('data: hi\n')]] كل ثانية، والعميل مبيطبعش ولا حدث، وكمان مبيطلعش error. لاقي الغلطة وصلّحها، وتأكد بـ [[curl -N]].`, done: R`عارف إن كل حدث لازم يخلص بسطر فاضي ([[\n\n]]) وإلا المتصفح بيفتكر الحدث لسه بيتكتب، والعميل بقى بيطبع [[hi]] كل ثانية.` },
            { lvl: 'تطبيق', t: R`**ابني:** ساعة بـ SSE: سيرفر بـ [[node:http]] بس بيبعت [[event: tick]] كل ثانية فيه الوقت، و [[: ping]] كل ١٥ ثانية (سطر بيبدأ بـ [[:]] تعليق بيخلي الاتصال حي ورا الـ proxies)، وصفحة بتعرض الوقت وحالة الاتصال من [[readyState]] بالعربي.`, done: R`الصفحة بتعرض الوقت بيتغيّر كل ثانية، ولما تقفل السيرفر الحالة بتبقى «بيرجع يتصل»، ولما تشغّله تاني بيرجع لوحده من غير refresh، و [[curl -N]] بيوريك سطور [[: ping]].` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** نفس الميزة بطريقتين: polling بـ [[setInterval]] + [[fetch]] كل ثانيتين، و SSE. عدّ الطلبات اللي وصلت السيرفر في دقيقة لما الداتا بتتغيّر مرة كل ١٠ ثواني، واحسب التأخير المتوسط بين التغيير وظهوره عند العميل.`, done: R`عندك جدول برقمين لكل طريقة: polling حوالي ٣٠ طلب في الدقيقة وتأخير متوسط حوالي ثانية، و SSE طلب واحد وتأخير قريب من الصفر، ومكتوب جنبه إمتى polling يفضل أحسن (API مش بتاعك، أو تحديث كل كام دقيقة).` },
          ],
          deep: {
            why: R`HTTP العادي العميل بيسأل والسيرفر بيرد وخلاص، فالسيرفر مالوش طريقة «يبدأ» الكلام. polling بيحل ده بالقوة: طلبات كتير أغلبها فاضي، وتأخير لحد الطلب الجاي. SSE بيحلها بإن الرد نفسه ميخلصش، و WebSocket بيحوّل الاتصال لقناة حرة في الاتجاهين. والاختيار بيفرق في عدد السيرفرات وفي كمية الكود اللي هتكتبه.`,
            how: R`**SSE على السلك:** السيرفر بيرد [[200]] بـ [[Content-Type: text/event-stream]] ومبيقفلش. كل حدث سطور [[field: value]]: [[event:]] الاسم، و [[data:]] المحتوى (كذا سطر [[data:]] بيتجمعوا بـ [[\n]])، و [[id:]] رقم الحدث، و [[retry:]] كام ms يستنى قبل ما يرجع. والحدث بيخلص بسطر فاضي. سطر بيبدأ بـ [[:]] تعليق بيتجاهل (بيستخدم كـ ping).

**الرجوع:** لو الاتصال وقع (والرد كان [[200]] و [[text/event-stream]])، العميل بيستنى [[retry]] ويبعت نفس الطلب ومعاه [[Last-Event-ID]]. اتقاس: [[error]] عند 1027ms و [[open]] تاني عند 2034ms مع [[retry: 1000]]. لو الرد [[502]] أو نوع تاني، بيقفل نهائي ([[readyState]] [[2]]، اتجرّب).

**WebSocket:** العميل بيبعت [[GET]] فيه [[Upgrade: websocket]] و [[Sec-WebSocket-Key]]، والسيرفر بيرد [[101 Switching Protocols]] و [[Sec-WebSocket-Accept]] (hash من المفتاح عشان يثبت إنه فاهم البروتوكول). بعدها الكلام frames صغيرة، والعميل لازم يعمل mask لكل frame. وفيه ping/pong على مستوى البروتوكول السيرفر يستخدمه يعرف مين مات.`,
            when: R`**polling** لو التحديث كل دقيقة أو أكتر، أو مش متحكم في السيرفر، أو عدد اليوزرز صغير جدًا. **SSE** لو الداتا من السيرفر لليوزر بس: إشعارات، dashboards، حالة شغلانة، ردود AI streaming. ببلاش reconnect و [[Last-Event-ID]]، وشغال مع HTTP/2 والـ cookies العادية. **WebSocket** لو العميل بيبعت كتير ولازم سريع: شات، ألعاب، تعديل مستند مع ناس، تداول. ولو محتاج fallback للمتصفحات القديمة أو rooms جاهزة، Socket.IO (مكتبة فوق WebSocket، بروتوكولها مختلف فمش بتكلّم [[ws]] عادي).`,
            mistakes: R`تنسى السطر الفاضي بعد كل حدث SSE فمفيش حاجة توصل. أو تسمع بـ [[onmessage]] لأحداث ليها [[event:]] فمتوصلش. أو تحط Nginx قدام SSE من غير [[proxy_buffering off]] فالأحداث توصل كلها مرة واحدة متأخر (درس «SSE في Express» في تاب «APIs متقدمة»). أو تعمل WebSocket من غير reconnect فأول وقوع للنت الميزة تموت لحد الـ refresh. أو reconnect من غير backoff فلما السيرفر يقع آلاف العملاء يضربوه كل ثانية. أو تحط توكن في الـ URL ([[?token=...]]) فيتسجّل في لوجات السيرفر والـ proxy. أو تفتح أكتر من ٦ اتصالات SSE لنفس الدومين على HTTP/1.1 فالصفحة تهنّج (حد المتصفح، من MDN).`,
          },
          teach: R`## تلات طرق، وسؤال واحد بيختار

**الداتا رايحة في أنهي اتجاه، وكام مرة؟** لو من السيرفر لليوزر بس: SSE. لو الاتنين بيتكلموا كتير: WebSocket. لو كل كام دقيقة ومش مهم يبقى لحظي: polling. كل اللي تحت اتشغّل على ويندوز ١١ بـ Node 24.22 و [[ws]] 8.22 من npm في فولدر تجربة، والناتج منسوخ زي ما طلع.

---

## ١. سيرفر SSE بـ [[node:http]] بس

~~~js sse-server.mjs
import http from 'node:http';
let n = 0;
http.createServer((req, res) => {
  if (req.url !== '/events') { res.writeHead(404).end(); return; }
  console.log('اتصال جديد، Last-Event-ID =', req.headers['last-event-id'] ?? 'مفيش');
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });
  res.write('retry: 1000\n\n');
  const timer = setInterval(() => {
    n++;
    res.write($__btid: $__{n}\nevent: price\ndata: $__{JSON.stringify({ n, price: 100 + n })}\n\n$__bt);
    if (n % 3 === 0) { clearInterval(timer); res.end(); }
  }, 300);
  req.on('close', () => clearInterval(timer));
}).listen(8301, () => console.log('SSE على http://localhost:8301/events'));
~~~

| السطر | ليه موجود |
|---|---|
| [[Content-Type: text/event-stream]] | ده اللي بيخلي [[EventSource]] يقبل الرد. أي نوع تاني = قفلة نهائية |
| [[Cache-Control: no-cache]] | عشان أي proxy أو cache في السكة ميحتفظش بالرد ويعيده لحد تاني |
| [[retry: 1000]] | بيقول للعميل: لو الاتصال وقع استنى ثانية وارجع |
| [[id:]] و [[event:]] و [[data:]] | رقم الحدث واسمه ومحتواه، وكل حدث بيخلص بسطر فاضي |
| [[req.on('close')]] | لو العميل قفل، وقّف المؤقت، وإلا هيفضل يكتب على اتصال ميت وتسرّب ذاكرة |

السيرفر بيقفل الرد كل ٣ أحداث **عن قصد**، عشان نشوف الرجوع لوحده.

### الشكل الخام على السلك: [[curl -N]]

[[-N]] = متعملش buffer، اطبع كل حاجة أول ما توصل:

~~~text الناتج: curl -sN http://localhost:8301/events
retry: 1000

id: 1
event: price
data: {"n":1,"price":101}

id: 2
event: price
data: {"n":2,"price":102}

id: 3
event: price
data: {"n":3,"price":103}
~~~

ده كل البروتوكول: نص، سطور، وسطر فاضي بين كل حدث.

---

## ٢. العميل: [[EventSource]] وحالاته

عميل بيطبع الوقت من البداية مع كل حاجة:

~~~js sse-client.mjs
const t0 = Date.now();
const ms = () => String(Date.now() - t0).padStart(5) + 'ms';
const es = new EventSource('http://localhost:8301/events');
console.log(ms(), 'readyState', es.readyState);
es.onopen = () => console.log(ms(), 'open، readyState', es.readyState);
es.addEventListener('price', (e) => {
  const d = JSON.parse(e.data);
  console.log(ms(), 'price', d.price, 'lastEventId', e.lastEventId);
  if (d.n === 5) { es.close(); console.log(ms(), 'قفلت، readyState', es.readyState); }
});
es.onerror = () => console.log(ms(), 'error، readyState', es.readyState);
~~~

~~~text الناتج: node --no-warnings --experimental-eventsource sse-client.mjs
   78ms readyState 0
   98ms open، readyState 1
  405ms price 101 lastEventId 1
  715ms price 102 lastEventId 2
 1025ms price 103 lastEventId 3
 1027ms error، readyState 0
 2034ms open، readyState 1
 2341ms price 104 lastEventId 4
 2649ms price 105 lastEventId 5
 2650ms قفلت، readyState 2
~~~

~~~text لوج السيرفر
اتصال جديد، Last-Event-ID = مفيش
اتصال جديد، Last-Event-ID = 3
~~~

اقرا الناتج كده:

1. [[0]] بعد الإنشاء، [[1]] بعد [[open]].
2. عند 1025ms السيرفر قفل الرد، فـ [[error]] اتنادى و [[readyState]] **[[0]] مش [[2]]**: يعني «بيرجع يتصل»، مش «مات».
3. استنى ثانية (الـ [[retry: 1000]]) ورجع عند 2034ms، وبعت [[Last-Event-ID = 3]] لوحده. السيرفر الحقيقي يستخدمه يبعت اللي فات.
4. [[close()]] = [[2]] ومفيش رجوع تاني.

| [[readyState]] | الاسم | معناها |
|---|---|---|
| [[0]] | [[CONNECTING]] | بيتصل أول مرة، أو بيرجع بعد ما وقع |
| [[1]] | [[OPEN]] | متصل والأحداث بتوصل |
| [[2]] | [[CLOSED]] | اتقفل نهائي: بـ [[close()]] أو السيرفر رد بحاجة غلط |

**مفاجأتين من التشغيل:**

- **Node بيقفل البرنامج وهو مستني يرجع:** أول تشغيل وقف عند [[error، readyState 0]] والبرنامج خرج، لأن مؤقت الرجوع في Node مش بيخلي البرنامج عايش. حطيت [[setInterval]] فاضي فكمّل. في المتصفح مش موجودة المشكلة دي.
- **[[502]] بيقتل الاتصال:** سيرفر بيرد [[res.writeHead(502)]] طلّع [[error، readyState 2]] وبعد ٣ ثواني لسه [[2]]. يعني لو الـ proxy رد بخطأ وقت ما السيرفر بيعيد تشغيل، [[EventSource]] **مش هيرجع**، ولازم تكتب انت: لو [[readyState === 2]] اعمل [[EventSource]] جديد بعد شوية.

---

## ٣. سيرفر WebSocket بـ [[ws]]

~~~js ws-server.mjs
import { WebSocketServer, WebSocket } from 'ws';
const wss = new WebSocketServer({ port: 8300 });
wss.on('connection', (socket, req) => {
  console.log('عميل جديد من', req.socket.remoteAddress, 'العدد:', wss.clients.size);
  socket.on('message', (raw) => {
    const msg = JSON.parse(raw);
    for (const c of wss.clients) {
      if (c.readyState === WebSocket.OPEN) c.send(JSON.stringify({ from: msg.name, text: msg.text }));
    }
  });
  socket.on('close', (code, reason) => console.log('اتقفل', code, reason.toString()));
});
console.log('WS على ws://localhost:8300');
~~~

- [[new WebSocketServer({ port })]]: سيرفر على البورت ده. ممكن كمان تديله [[{ server }]] HTTP موجود فيشتغلوا على نفس البورت.
- [[wss.clients]]: [[Set]] بكل المتصلين. اللفة عليه هي الـ broadcast.
- [[c.readyState === WebSocket.OPEN]]: متبعتش لحد بيقفل.
- [[raw]] بيوصل [[Buffer]]، و [[JSON.parse]] بيقبله لأنه بيحوّله نص الأول. وفي سيرفر حقيقي حط الـ parse في [[try]]: رسالة بايظة من عميل واحد هترمي وتوقّع السيرفر كله.

### الـ handshake بعينك

~~~text الناتج: curl -si -H "Connection: Upgrade" -H "Upgrade: websocket" -H "Sec-WebSocket-Version: 13" -H "Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==" http://localhost:8300/
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
~~~

[[101]] معناها «تمام، الاتصال ده مبقاش HTTP». والـ [[Accept]] ده بالظبط القيمة اللي في مثال المواصفات (RFC 6455) للمفتاح ده، يعني [[ws]] حسبه صح.

---

## ٤. تشغيل المثال كله

~~~text الناتج: node --experimental-eventsource example.mjs
SSE readyState 0
(node:23072) [UNDICI-ES] Warning: EventSource is experimental, expect them to change at any time.
WS وصل: sara أهلا
WS close 1000 خلصت true
price 101 id 1
price 102 id 2
price 103 id 3
SSE error، readyState 0
price 104 id 4
price 105 id 5
~~~

~~~text لوج سيرفر WS
عميل جديد من ::1 العدد: 1
اتقفل 1000 خلصت
~~~

- الـ warning ده من Node بيقول إن [[EventSource]] لسه تجريبي، و [[--no-warnings]] بيخفيه.
- [[::1]] هو localhost بـ IPv6: [[localhost]] على ويندوز اتحل لـ IPv6 الأول.
- رسايل WS وصلت قبل SSE لأن SSE بيبعت كل 300ms.

وعميل على بورت مقفول:

~~~text الناتج
error event ErrorEvent
close 1006 false
~~~

[[1006]] = «الاتصال اتقطع من غير قفلة»، و [[wasClean]] [[false]]. ده الكود اللي هتشوفه كل ما النت يقع.

| الكود | معناه |
|---|---|
| [[1000]] | قفلة عادية، الطرفين متفقين |
| [[1001]] | الطرف التاني ماشي: الصفحة اتقفلت أو السيرفر بيقفل |
| [[1006]] | اتقطع من غير ما حد يقفل: نت، أو السيرفر وقع (مبيتبعتش، المتصفح بيحطه) |
| [[1008]] | السيرفر رفض لسبب سياسة: مثلًا توكن غلط |
| [[1011]] | السيرفر وقع وهو بيعالج |
| [[4000]] لحد [[4999]] | أكواد انت تعرّفها للتطبيق بتاعك |

---

## ٥. WebSocket مبيرجعش لوحده: اكتب الـ reconnect

~~~js reconnect.mjs
let tries = 0, stop = false;
function connect() {
  const ws = new WebSocket('ws://localhost:8300');
  ws.onopen = () => { tries = 0; console.log(ms(), 'متصل'); };
  ws.onclose = (e) => {
    if (stop) return;
    const wait = Math.min(30000, 500 * 2 ** tries++);
    console.log(ms(), 'اتقفل', e.code, '← هحاول تاني بعد', wait, 'ms');
    setTimeout(connect, wait);
  };
}
connect();
~~~

جرّبته كده: العميل اشتغل والسيرفر مقفول، وبعد ثانية شغّلت السيرفر، وبعد ٣ ثواني قفلته، وبعد ثانية ونص شغّلته تاني:

~~~text الناتج
   53ms اتقفل 1006 ← هحاول تاني بعد 500 ms
  559ms اتقفل 1006 ← هحاول تاني بعد 1000 ms
 1576ms متصل
 4272ms اتقفل 1006 ← هحاول تاني بعد 500 ms
 4784ms اتقفل 1006 ← هحاول تاني بعد 1000 ms
 5799ms اتقفل 1006 ← هحاول تاني بعد 2000 ms
 7821ms متصل
~~~

- [[500 * 2 ** tries++]]: نص ثانية، ثانية، ٢، ٤، ٨... ده **exponential backoff**. [[**]] أُس، و [[tries++]] بيستخدم القيمة وبعدين يزوّدها.
- [[Math.min(30000, ...)]]: أقصى انتظار ٣٠ ثانية، عشان ميستناش ساعة.
- [[tries = 0]] في [[onopen]]: بعد ما ينجح العدّاد يرجع من الأول (شوف 4272ms بدأ من 500 تاني).
- في الإنتاج زوّد شوية عشوائية ([[wait * (0.5 + Math.random())]]) عشان لو السيرفر وقع وآلاف العملاء اتقطعوا في نفس اللحظة ميرجعوش كلهم في نفس الثانية.

---

## ٦. الأمان والإنتاج (من MDN ومن [[ws]] docs)

- **[[wss://]] و https:** صفحة https مش هتقبل [[ws://]] (mixed content).
- **التوكن:** [[EventSource]] مبيقبلش headers، فالـ auth بالـ cookie ([[new EventSource(url, { withCredentials: true })]] لو دومين تاني). و WebSocket كمان مفيهوش headers من المتصفح: ابعت التوكن في أول رسالة بعد [[open]] أو cookie، مش في الـ URL.
- **[[Origin]]:** السيرفر لازم يفحص هيدر [[Origin]] في الـ handshake، وإلا أي موقع تاني يقدر يفتح WebSocket لسيرفرك بكوكيز اليوزر.
- **ورا Nginx:** WebSocket محتاج [[proxy_set_header Upgrade]] و [[Connection]] (درس «WebSockets» في تاب Nginx)، و SSE محتاج [[proxy_buffering off]] و timeout طويل.
- **الحد:** المتصفح بيفتح ٦ اتصالات بس لكل دومين على HTTP/1.1، و SSE بياخد واحد منهم طول الوقت. على HTTP/2 الحد أكبر بكتير.

---

## الخلاصة

- اتجاه واحد = SSE (رجوع و [[Last-Event-ID]] ببلاش). اتجاهين وكتير = WebSocket (والـ reconnect عليك). نادر = polling.
- SSE: [[text/event-stream]]، وسطور [[event:]] و [[data:]] و [[id:]] و [[retry:]]، وسطر فاضي بعد كل حدث.
- [[readyState]] في SSE: [[0]] بيتصل/بيرجع، [[1]] مفتوح، [[2]] مات. وفي WebSocket ٤ حالات لحد [[3]].
- [[onerror]] مع [[readyState 0]] = هيرجع لوحده، ومع [[2]] = انت اللي تعيد.
- [[close()]] لما اليوزر يسيب الصفحة، و backoff بسقف وعشوائية في أي reconnect.`,
          sol: R`اتجرّب على Node 24.22. [[curl -N]] بيوريك الأحداث وهي بتوصل، ومن غير [[-N]] ممكن يستنى لحد ما الـ buffer يتملي. ولما قفلت السيرفر وشغّلته، [[EventSource]] رجع بعد مدة [[retry]] بالظبط تقريبًا: مع [[retry: 1000]] الفرق بين [[error]] و [[open]] كان حوالي ١٠٠٧ms (1027 → 2034)، ومع [[retry: 3000]] المفروض يبقى حوالي ٣ ثواني. والسيرفر طبع [[Last-Event-ID]] اللي العميل بعته وهو راجع.

~~~text الناتج: curl -sN http://localhost:8301/events
retry: 1000

id: 1
event: price
data: {"n":1,"price":101}
~~~`,
          solCode: R`// افتح الصفحة دي من نفس السيرفر وشوف الحالة بتتغيّر
const es = new EventSource('/events');
const show = () => (document.title = ['بيتصل', 'متصل', 'مقفول'][es.readyState]);
es.onopen = show;
es.onerror = () => {
  show();
  if (es.readyState === EventSource.CLOSED) console.log('استسلم: لازم EventSource جديد');
};
es.addEventListener('price', (e) => console.log(JSON.parse(e.data).price, e.lastEventId));`,
        },
        {
          cmd: "Clipboard و Geolocation و Share",
          title: "الحافظة والمكان والمشاركة: صفحة آمنة، وضغطة، وصلاحية",
          learn: R`تستخدم [[navigator.clipboard]] و [[navigator.geolocation]] و [[navigator.share]] بشروطهم (secure context، وضغطة من اليوزر، وصلاحية)، وتفحص قبل ما تستخدم، وتقرا كل خطأ.`,
          out: R`أزرار «انسخ» و «مكاني» و «شارك» شغالة على الموبايل والكمبيوتر، وبتقول لليوزر بالظبط ليه لو مش شغالة.`,
          use: {
            prog: R`APIs الجهاز كلها ماشية على نفس القواعد التلاتة: الصفحة لازم آمنة، وبعضها لازم يتنادى من ضغطة، وبعضها بيسأل اليوزر. افهمهم مرة وهتفهم الكاميرا والإشعارات والـ Bluetooth بعدين.`,
            work: R`«الزرار شغّال عندي ومش شغّال على السيرفر التجريبي» — غالبًا السيرفر التجريبي [[http://]] بـ IP، فـ [[navigator.clipboard]] = [[undefined]]. ده بيحصل في أي فريق مرة على الأقل.`,
            cs: R`نموذج الأمان في المتصفح: الـ origin (بروتوكول + دومين + بورت)، والـ secure context، والـ user activation كإثبات إن اليوزر هو اللي طلب مش سكربت إعلانات.`,
          },
          desc: R`تلات APIs للجهاز، وكلهم ليهم نفس الشروط:

1. **secure context:** الصفحة [[https://]] أو [[localhost]] أو [[127.0.0.1]]. على [[http://example.com]] جرّبتها: [[isSecureContext]] = [[false]]، و [[navigator.clipboard]] و [[navigator.share]] = [[undefined]] خالص، و [[getCurrentPosition]] رجع error كود [[1]] برسالة «Only secure origins are allowed».
2. **user activation (ضغطة من اليوزر):** [[navigator.share]] من غير ضغطة رمى [[NotAllowedError: Must be handling a user gesture to perform a share request]] (اتجرّب). فاستدعيهم جوه [[click]] handler، مش في [[load]] ولا بعد [[setTimeout]] طويل.
3. **صلاحية:** المتصفح بيسأل اليوزر للمكان، ولقراية الحافظة. والإجابة بتتحفظ للموقع، و [[navigator.permissions.query({ name })]] بيقولك الحالة: [[granted]] أو [[denied]] أو [[prompt]].

والقاعدة الرابعة: **feature detection قبل الاستخدام** ([[if (!navigator.clipboard)]] و [[navigator.canShare?.(data)]])، عشان اليوزر يشوف رسالة مش زرار ميت.

**أكواد الـ geolocation:** [[1]] [[PERMISSION_DENIED]] (رفض، أو الصفحة مش آمنة)، و [[2]] [[POSITION_UNAVAILABLE]] (الجهاز مش عارف)، و [[3]] [[TIMEOUT]] (المهلة خلصت). اتطبعت من [[GeolocationPositionError]] في Chromium.`,
          example: R`// في صفحة فيها 3 أزرار: #copy و #where و #share
console.log('آمنة؟', window.isSecureContext);
document.querySelector('#copy').addEventListener('click', async () => {
  if (!navigator.clipboard) return console.log('مفيش clipboard: الصفحة مش https ولا localhost');
  try {
    await navigator.clipboard.writeText('كود الخصم: SAVE10');
    console.log('اتنسخ');
  } catch (e) {
    console.log('النسخ فشل:', e.name, e.message);
  }
});
document.querySelector('#where').addEventListener('click', () => {
  if (!('geolocation' in navigator)) return console.log('المتصفح مفيهوش geolocation');
  navigator.geolocation.getCurrentPosition(
    (pos) => console.log(pos.coords.latitude, pos.coords.longitude, '±' + pos.coords.accuracy + 'm'),
    (err) => {
      const why = { 1: 'اليوزر رفض أو الصفحة مش آمنة', 2: 'الجهاز مش عارف مكانه', 3: 'المهلة خلصت' };
      console.log('geolocation فشل:', err.code, why[err.code], err.message);
    },
    { timeout: 10000, maximumAge: 60000, enableHighAccuracy: false },
  );
});
document.querySelector('#share').addEventListener('click', async () => {
  const data = { title: 'درس Streams', url: location.href };
  if (!navigator.canShare?.(data)) return console.log('share مش متاح هنا، اعرض زرار «انسخ اللينك» بداله');
  try {
    await navigator.share(data);
    console.log('اتشارك');
  } catch (e) {
    if (e.name !== 'AbortError') console.log('share فشل:', e.name, e.message);
    else console.log('اليوزر قفل الشاشة أو مفيش مكان يشارك فيه (AbortError)');
  }
});`,
          lines: [
            R`[[isSecureContext]] بيقولك الصفحة آمنة ولا لأ قبل أي حاجة. على [[localhost]] طلع [[true]]، وعلى [[http://example.com]] طلع [[false]]. ده أول سطر تطبعه لما زرار «مش شغّال على السيرفر».`,
            R`الحافظة لازم تتنادى من ضغطة، فبنحطها جوه [[click]]. والـ handler [[async]] لأن [[writeText]] بترجّع Promise (المتصفح ممكن يسأل اليوزر أو يكتب في حافظة النظام).`,
            R`feature detection: في صفحة مش آمنة [[navigator.clipboard]] مش موجود أصلًا ([[undefined]])، فـ [[navigator.clipboard.writeText]] كانت هترمي [[TypeError: Cannot read properties of undefined]]. بدل كده بنقول السبب. و [[return console.log(...)]] اختصار لـ «اطبع واخرج».`,
            R`[[try]] لأن [[writeText]] ممكن ترفض حتى في صفحة آمنة: الصفحة مش focused، أو اليوزر قافل الصلاحية.`,
            R`[[writeText(text)]] بتكتب نص في حافظة النظام. اتجرّب: بعد الضغطة [[readText()]] رجّعت «كود الخصم: SAVE10» بالعربي زي ما هو. والكتابة مش محتاجة سؤال في Chromium ([[clipboard-write]] حالته [[granted]] على localhost).`,
            R`بنأكد لليوزر إن النسخ حصل. في الواجهة الحقيقية غيّر نص الزرار لـ «اتنسخ ✓» ثانيتين بدل الـ log.`,
            R`[[catch (e)]] بيمسك رفض الـ Promise.`,
            R`[[e.name]] أهم من [[e.message]]: [[NotAllowedError]] معناها الصلاحية أو الضغطة، وده اللي تبني عليه رسالتك. الرسالة نفسها بتختلف من متصفح للتاني.`,
            R`نهاية الـ [[catch]].`,
            R`نهاية الـ handler بتاع [[#copy]].`,
            R`زرار المكان. الـ handler مش [[async]] لأن [[getCurrentPosition]] قديمة وبتشتغل بـ callbacks مش Promise.`,
            R`[[in]] بيفحص إن الخاصية موجودة من غير ما يقراها. في الصفحة المش آمنة جرّبتها: [[geolocation]] **موجود** (على عكس الحافظة)، بس بيرجّع error كود [[1]]. فالفحص ده للمتصفحات القديمة بس، والـ secure context بيتعرف من الـ error.`,
            R`[[getCurrentPosition(success, error, options)]] بتطلب المكان مرة واحدة. أول مرة المتصفح بيسأل اليوزر «الموقع ده عايز يعرف مكانك». ولو عايز متابعة مستمرة (خريطة بتتحرك) فيه [[watchPosition]] بنفس الـ arguments وبترجّع رقم توقفه بيه [[clearWatch]].`,
            R`الـ success: [[pos.coords]] فيه [[latitude]] و [[longitude]] و [[accuracy]] بالمتر (نص قطر الدايرة اللي المكان فيها). اتجرّب بمكان متحدد من Playwright: طبع [[30.0444 31.2357 ±20m]]. و [[accuracy]] الكبيرة (آلاف المترات) معناها المكان جاي من الـ IP أو الواي فاي مش GPS.`,
            R`الـ error callback بياخد [[GeolocationPositionError]] فيه [[code]] و [[message]].`,
            R`جدول بيحوّل الكود لرسالة لليوزر. الأرقام ثابتة في المواصفات ومتاحة كمان كثوابت: [[err.PERMISSION_DENIED]] = 1 و [[POSITION_UNAVAILABLE]] = 2 و [[TIMEOUT]] = 3 (اتطبعوا من المتصفح).`,
            R`في التجارب: الصفحة المش آمنة طلّعت [[1]] و «Only secure origins are allowed»، ومن غير ما حد يرد على سؤال الصلاحية طلّعت [[3]] و «Timeout expired» بعد ١٠ ثواني بالظبط.`,
            R`نهاية الـ error callback.`,
            R`الخيارات: [[timeout]] أقصى انتظار بالـ ms (من غيره ممكن يستنى للأبد)، و [[maximumAge]] يقبل مكان محفوظ عمره لحد دقيقة بدل ما يقيس تاني (أسرع وأوفر للبطارية)، و [[enableHighAccuracy: false]] متشغّلش GPS لو الواي فاي كفاية.`,
            R`نهاية [[getCurrentPosition(...)]].`,
            R`نهاية الـ handler بتاع [[#where]].`,
            R`زرار المشاركة: بيفتح شاشة المشاركة بتاعة النظام (واتساب، تليجرام، الإيميل...) على الموبايل، وعلى ويندوز وماك فيه شاشة مشابهة. ولازم ضغطة.`,
            R`الداتا اللي هتتشارك: [[title]] و [[text]] و [[url]]، وممكن [[files]] (صور أو PDF). [[location.href]] لينك الصفحة الحالية.`,
            R`[[navigator.canShare?.(data)]]: الـ [[?.]] بتنادي الدالة بس لو موجودة (في الصفحة المش آمنة [[undefined]] فبيرجّع [[undefined]] والشرط بيعدّي). و [[canShare]] بيقولك الداتا دي بالذات تتشارك ولا لأ: [[canShare({})]] رجّع [[false]]، و [[{ url }]] رجّع [[true]].`,
            R`[[try]] لأن [[share]] بترفض في حالات كتير عادية جدًا.`,
            R`[[navigator.share(data)]] بتفتح الشاشة وبترجّع Promise بتخلص لما اليوزر يختار. شاشة المشاركة نفسها مينفعش تتجرّب في متصفح أوتوماتيك (الـ Promise فضلت مستنية)، فاللي بعدها من MDN.`,
            R`لو اليوزر اختار تطبيق وشارك فعلًا.`,
            R`[[catch]] بيمسك رفض [[share]]. والرفض هنا مش دايمًا غلطة، فلازم نبص على نوعه قبل ما نعرض حاجة لليوزر.`,
            R`[[AbortError]] معناها اليوزر قفل الشاشة من غير ما يختار، أو مفيش تطبيق يشارك فيه، ودي مش غلطة تعرض لها رسالة حمرا. أي حاجة تانية ([[NotAllowedError]] من غير ضغطة، أو [[DataError]]) سجّلها.`,
            R`[[else]] بتاع الـ [[AbortError]]: هنا بنطبع عشان تشوفها وانت بتجرّب، وفي الواجهة الحقيقية متعملش حاجة.`,
            R`نهاية الـ [[catch]].`,
            R`نهاية الـ handler بتاع [[#share]].`,
          ],
          try: R`افتح الصفحة على [[http://localhost:8000]] واضغط التلات أزرار. وبعدين افتحها من الموبايل على نفس الواي فاي بـ IP الكمبيوتر ([[http://192.168.x.x:8000]]): اطبع [[isSecureContext]] وشوف كل زرار بيقول إيه. وفي DevTools افتح Sensors وغيّر Location، وجرّب «Location unavailable». وفي إعدادات الموقع (القفل جنب العنوان) اقفل صلاحية المكان وجرّب تاني.`,
          practice: [
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من MDN (صفحة [[Permissions.query]] وصفحة [[Clipboard]])، طلّع: إيه أسماء الصلاحيات اللي [[navigator.permissions.query]] بيقبلها في Chrome للحافظة والمكان؟ وإيه اللي بيحصل لو سألت عن [[clipboard-read]] في Firefox؟ وبعدين جرّب في Console بتاع متصفحك.`, done: R`كاتب ٣ أسماء ([[geolocation]] و [[clipboard-read]] و [[clipboard-write]]) والحالة اللي طلعت عندك لكل واحد، وعارف إن الاسم اللي المتصفح مش بيعرفه بيرمي [[TypeError]] بدل ما يرجّع حالة، فلازم [[try]] حوالين [[query]].` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** كود بينسخ كود الخصم أوتوماتيك أول ما الصفحة تفتح: [[window.addEventListener('load', () => navigator.clipboard.writeText(code))]]، وكود تاني بيعمل [[share]] بعد ما [[fetch]] تخلص (٦ ثواني بعد الضغطة). الاتنين «مش شغالين أحيانًا». اشرح ليه وصلّحهم.`, done: R`النسخ بقى في زرار واضح، والـ share بيتنادى في نفس الضغطة (الداتا بتتجهز قبلها أو بتعرض زرار «شارك» تاني بعد ما الـ fetch تخلص)، وعندك جملة بتشرح إن الضغطة ليها عمر قصير (transient activation) وبتخلص.` },
            { lvl: 'تحدي', t: R`**ابني:** دالة [[getLocation({ timeout })]] بترجّع Promise بدل الـ callbacks، وبترمي [[Error]] برسالة عربي حسب الكود فيه [[cause]] الأصلي، ولو الصفحة مش آمنة بترمي على طول من غير ما تستنى. واستخدمها بـ [[await]] في زرار، واعرض رسالة لكل حالة.`, done: R`في DevTools Sensors: مكان متحدد بيرجّع الإحداثيات، و «Location unavailable» بيرمي رسالة كود ٢، ورفض الصلاحية بيرمي رسالة كود ١، و [[timeout: 1]] بيرمي رسالة كود ٣، وكلهم فيهم [[e.cause.code]] الأصلي.` },
          ],
          deep: {
            why: R`الحافظة فيها باسوردات وأكواد، والمكان بيقول اليوزر ساكن فين، والمشاركة بتفتح شاشة نظام. لو أي موقع يقدر يوصل لده من غير شروط، أي إعلان أو سكربت تتبّع هيقرا حافظتك ومكانك. فالمتصفح بيحط تلات أقفال: اتصال مشفّر (عشان محدش في النص يحقن كود)، وضغطة حقيقية (عشان سكربت مايعملهاش لوحده)، وموافقة اليوزر للحاجات الحساسة.`,
            how: R`**secure context:** المتصفح بيحسبه للصفحة: [[https]] أو [[wss]] أو [[localhost]] أو [[127.0.0.1]] أو [[file://]] في أغلب المتصفحات. APIs كتير متعلّمة في المواصفات [[ [SecureContext] ]]، ودي **مبتتعرّفش** أصلًا في الصفحة المش آمنة (عشان كده [[navigator.clipboard]] كان [[undefined]] مش بيرمي). و geolocation أقدم فاتعمل استثناء: موجود بس بيرجّع error.

**user activation:** كل ضغطة أو زرار كيبورد بيدّي الصفحة «تفعيل مؤقت» (transient activation) لثواني قليلة (حوالي ٥ في Chromium حسب MDN). [[navigator.userActivation.isActive]] بيقولك هو شغّال دلوقتي ولا لأ: في التجربة بعد ٦.٥ ثانية من غير ضغطة طلع [[false]] و [[share]] رفض. [[share]] و [[requestFullscreen]] و [[window.open]] **بيستهلكوا** التفعيل ده.

**الصلاحيات:** بتتحفظ لكل origin. [[permissions.query]] بيقرا الحالة من غير ما يسأل اليوزر، فاستخدمه تعرض زرار «فعّل المكان» بدل ما تفاجئه بسؤال. ولما اليوزر يرفض مرة، الموقع **ميقدرش** يسأل تاني: اليوزر لازم يغيّرها بإيده من إعدادات الموقع.`,
            when: R`**Clipboard:** زرار «انسخ» لكود أو لينك أو توكن، و [[readText]] نادر (لصق من زرار، والمتصفح بيسأل). **Geolocation:** «أقرب فرع»، والتوصيل، والخرايط، بس اسأل لما اليوزر يدوس زرار مش أول ما الصفحة تفتح (الناس بترفض الأسئلة المفاجئة). ولو محتاج المدينة بس، الـ IP عند السيرفر كفاية من غير سؤال. **Share:** على الموبايل أحسن من أزرار واتساب وفيسبوك المنفصلة، ومع بديل «انسخ اللينك» للكمبيوتر.`,
            mistakes: R`تجرّب على [[localhost]] فكله يشتغل، وترفع على سيرفر تجريبي [[http://]] فيموت (secure context). أو تنادي [[share]] أو [[clipboard]] بعد [[await fetch]] طويل فالضغطة تخلص. أو تستنى [[writeText]] من غير [[timeout]]: في التجربة من غير ضغطة الـ Promise فضلت معلّقة أكتر من ٣ ثواني ومرجعتش ولا رفضت (Chromium 156 تحت Playwright، والمتصفح العادي ممكن يرفض بـ [[NotAllowedError]] حسب MDN). أو تنسى [[timeout]] في [[getCurrentPosition]] فالصفحة تستنى للأبد. أو تعرض رسالة خطأ حمرا لما اليوزر يقفل شاشة المشاركة ([[AbortError]] مش خطأ). أو [[document.execCommand('copy')]] القديم: MDN بيقول إنه deprecated، استخدمه بس كـ fallback لو لازم.`,
          },
          teach: R`## تلات أقفال، وكل API بيعدّي عليهم

| | Clipboard | Geolocation | Share |
|---|---|---|---|
| صفحة آمنة | لازم. من غيرها [[navigator.clipboard]] مش موجود | لازم. من غيرها error كود [[1]] | لازم. من غيرها [[navigator.share]] مش موجود |
| ضغطة من اليوزر | لازم عمليًا للكتابة، وأكيد للقراية | مش شرط، بس اسأل من زرار | لازم، وإلا [[NotAllowedError]] |
| سؤال صلاحية | القراية بس | أيوه، أول مرة | لأ، شاشة المشاركة نفسها هي الموافقة |
| نوعه | Promise | callbacks | Promise |

اللي تحت اتشغّل في Chromium 156 (اللي بيجي مع Playwright) على ويندوز ١١، على صفحة [[http://localhost:8320]] (آمنة) وعلى [[http://example.com]] (مش آمنة). الضغطات كانت ضغطات حقيقية من Playwright ([[page.click]])، والصلاحيات اتدّت واتشالت بـ [[grantPermissions]] و [[clearPermissions]]. **اللي متجرّبش:** سؤال الصلاحية الحقيقي قدام يوزر، وشاشة المشاركة نفسها، والمتصفحات التانية: دول من MDN.

---

## ١. feature detection في الصفحتين

نفس الفحص على الصفحتين:

~~~js
({ secure: isSecureContext, clipboard: typeof navigator.clipboard, share: typeof navigator.share,
   canShare: typeof navigator.canShare, geo: typeof navigator.geolocation })
~~~

| الفحص | [[localhost]] | [[http://example.com]] |
|---|---|---|
| [[isSecureContext]] | [[true]] | [[false]] |
| [[navigator.clipboard]] | object | [[undefined]] (مش موجود خالص) |
| [[navigator.share]] و [[canShare]] | function | [[undefined]] |
| [[navigator.geolocation]] | object | object (موجود، بس هيرفض) |

ونفس الصفحة في Node 24: [[navigator.userAgent]] = [[Node.js/24]]، و clipboard و geolocation و share كلهم [[undefined]]، و [[isSecureContext]] مش متعرّف أصلًا. يعني الكود ده للمتصفح بس، وأي كود مشترك (SSR) لازم يفحص قبل ما يلمسهم.

---

## ٢. تشغيل المثال على الصفحة المش آمنة

~~~text الناتج: Console على http://example.com بعد ضغط التلات أزرار
آمنة؟ false
مفيش clipboard: الصفحة مش https ولا localhost
geolocation فشل: 1 اليوزر رفض أو الصفحة مش آمنة Only secure origins are allowed (see: https://goo.gl/Y0ZkNV).
share مش متاح هنا، اعرض زرار «انسخ اللينك» بداله
~~~

كل زرار قال السبب، ومفيش ولا error أحمر. من غير الفحص، أول زرار كان هيرمي [[TypeError: Cannot read properties of undefined (reading 'writeText')]].

**لاحظ:** كود [[1]] في الـ geolocation معناه «رفض» سواء اليوزر اللي رفض أو الصفحة مش آمنة. الـ [[message]] هي اللي بتفرّق، بس متعتمدش على نصها (بيختلف من متصفح للتاني): افحص [[isSecureContext]] الأول.

---

## ٣. على [[localhost]]: من غير صلاحيات، وبعدين بيها

~~~text الناتج: من غير صلاحيات (clearPermissions)، ضغطة على «مكاني»
آمنة؟ true
geolocation فشل: 3 المهلة خلصت Timeout expired
~~~

سؤال الصلاحية ظهر ومحدش رد عليه، فبعد الـ [[timeout: 10000]] رجع كود [[3]]. من غير [[timeout]] كانت هتفضل مستنية.

~~~text الناتج: بعد ما الصلاحيات اتدّت، ومكان متحدد (30.0444, 31.2357)
آمنة؟ true
اتنسخ
clipboard فيه: كود الخصم: SAVE10
30.0444 31.2357 ±20m
~~~

### القراية من الحافظة لوحدها

نفس الضغطة، بس بعد [[writeText]] عملت [[readText()]] من غير صلاحية قراية:

~~~text الناتج
write ok
copy err NotAllowedError Failed to execute 'readText' on 'Clipboard': Read permission denied.
~~~

الكتابة عدّت والقراية اترفضت. ده التصميم: إنك تحط في الحافظة أقل خطورة بكتير من إنك تقرا منها.

### حالة الصلاحيات

~~~text الناتج: navigator.permissions.query على localhost
clipboard-read: prompt
clipboard-write: granted
geolocation: prompt
~~~

[[prompt]] = «لسه هنسأل». استخدمها: لو [[denied]] متعرضش زرار «مكاني» أصلًا، اعرض «فعّل المكان من إعدادات الموقع».

---

## ٤. Share: [[canShare]] والضغطة

~~~text الناتج: canShare على localhost
canShare files (a.txt) true
canShare png true
canShare {} false
canShare { url } true
~~~

و [[share]] من غير ضغطة (بعد ٦.٥ ثانية من فتح الصفحة، و [[navigator.userActivation.isActive]] = [[false]]):

~~~text الناتج
share err NotAllowedError: Failed to execute 'share' on 'Navigator': Must be handling a user gesture to perform a share request.
~~~

ومع ضغطة حقيقية، [[canShare]] رجّع [[true]] و [[share]] فتح الطلب والـ Promise فضلت مستنية (مفيش شاشة مشاركة في متصفح أوتوماتيك). الحالات دي من MDN:

| [[e.name]] | معناها | تعمل إيه |
|---|---|---|
| [[AbortError]] | اليوزر قفل الشاشة، أو مفيش تطبيق يشارك فيه | ولا حاجة، مش خطأ |
| [[NotAllowedError]] | من غير ضغطة، أو الصفحة مش مسموحلها (iframe من غير إذن) | نادي [[share]] من الـ click نفسه |
| [[DataError]] | الداتا مش مقبولة (نوع ملف ممنوع، أو حجم كبير) | افحص بـ [[canShare]] قبلها |
| [[InvalidStateError]] | فيه مشاركة لسه مفتوحة | متسمحش بضغطتين ورا بعض |

---

## ٥. الضغطة ليها عمر

اتجرّب: بعد ٦.٥ ثانية من فتح الصفحة [[userActivation.isActive]] = [[false]] و [[share]] رفض. الغلطة المشهورة:

~~~js
button.onclick = async () => {
  const data = await fetch('/api/link').then((r) => r.json());
  await navigator.share({ url: data.url });
};
~~~

لو الـ [[fetch]] خدت كام ثانية التفعيل هيخلص و [[share]] يرفض. الحل: جهّز الداتا **قبل** الضغطة (أول ما الصفحة تفتح)، والضغطة تنادي [[share]] على طول.

### [[writeText]] من غير ضغطة: مفاجأة

في Chromium 156 تحت Playwright، [[writeText]] من غير ضغطة (والصلاحية [[granted]] والصفحة focused) **مخلصتش ولا رفضت**: بعد ٣ ثواني لسه pending. مش متأكد ده بيحصل في Chrome العادي قدام يوزر (MDN بيقول ممكن ترفض بـ [[NotAllowedError]] لو الصفحة مش focused). الدرس: اعمل النسخ من زرار، ولو عايز ضمان حط مهلة:

~~~js
const withTimeout = (p, ms) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error('النسخ مخلصش')), ms))]);
await withTimeout(navigator.clipboard.writeText('x'), 2000);
~~~

---

## ٦. بدائل ومكانهم

| لو | البديل |
|---|---|
| [[navigator.clipboard]] مش موجود | [[document.execCommand('copy')]] على [[textarea]] مخفي: deprecated حسب MDN بس لسه شغّال، أو اعرض النص متحدد واكتب «Ctrl+C» |
| [[navigator.share]] مش موجود (أغلب الكمبيوترات القديمة) | زرار «انسخ اللينك» بالحافظة، أو لينكات المشاركة العادية ([[https://wa.me/?text=]]) |
| اليوزر رفض المكان | خلّيه يكتب المدينة، أو قدّر من الـ IP عند السيرفر |
| محتاج المكان وهو بيتحرك | [[watchPosition]] و [[clearWatch]] لما الصفحة تتقفل (درس «visibilitychange و bfcache») |

---

## الخلاصة

- تلات شروط: صفحة آمنة، وضغطة، وصلاحية. افحص [[isSecureContext]] الأول لما حاجة «مش شغالة على السيرفر».
- feature detection: [[if (!navigator.clipboard)]] و [[navigator.canShare?.(data)]]، ورسالة لليوزر بدل زرار ميت.
- geolocation: [[1]] رفض أو مش آمنة، [[2]] مش عارف، [[3]] المهلة، وحط [[timeout]] دايمًا.
- [[AbortError]] في share مش خطأ. و [[NotAllowedError]] = الضغطة أو الصلاحية.
- اقرا [[e.name]] مش [[e.message]].`,
          sol: R`اتجرّب في Chromium 156. على [[localhost]] التلات أزرار اشتغلوا (المشاركة فتحت الطلب). على [[http://example.com]] (نفس الكلام اللي هتشوفه على [[http://192.168.x.x]] من الموبايل لأنه مش localhost):

~~~text الناتج
آمنة؟ false
مفيش clipboard: الصفحة مش https ولا localhost
geolocation فشل: 1 اليوزر رفض أو الصفحة مش آمنة Only secure origins are allowed (see: https://goo.gl/Y0ZkNV).
share مش متاح هنا، اعرض زرار «انسخ اللينك» بداله
~~~

ولو قفلت صلاحية المكان من إعدادات الموقع هتاخد كود [[1]] برسالة مختلفة ([[User denied Geolocation]] حسب MDN)، و «Location unavailable» في Sensors بيدّي كود [[2]]. شاشة المشاركة الحقيقية على الموبايل وسؤال الصلاحية متجرّبوش هنا، وسلوكهم من MDN. ولو عايز تجرّب من الموبايل والصفحة آمنة: [[ssh -R]] أو أي tunnel بيدّيك https، أو بورت forwarding من DevTools (chrome://inspect) فالموبايل يشوف [[localhost]].`,
        },
        {
          cmd: "Streams",
          title: "اقرا الرد حتة حتة: ReadableStream و TransformStream و WritableStream",
          learn: R`تقرا [[res.body]] chunk بـ chunk بنسبة تحميل، وتفك العربي صح بـ [[TextDecoderStream]]، وتعمل خط معالجة بـ [[pipeThrough]] و [[pipeTo]]، وتفهم backpressure.`,
          out: R`ملفات كبيرة بتتعالج وهي بتتحمّل من غير ما الرام تتملي، وشريط تقدّم حقيقي، ومفيش حروف عربي بايظة.`,
          use: {
            prog: R`أي داتا كبيرة أو بتيجي على مراحل: ملف CSV ١٠٠ ميجا، أو رد AI بيتكتب كلمة كلمة، أو لوج بيكبر. من غير streams لازم تستنى الحاجة كلها وتحطها في الرام مرة واحدة.`,
            work: R`«الصفحة بتهنّج لما الملف كبير» و «عايزين progress bar للتحميل» و «الرد بتاع الـ AI بيظهر مرة واحدة في الآخر» — التلاتة حلّهم Streams.`,
            cs: R`producer و consumer بسرعات مختلفة، وطابور بحجم محدد (highWaterMark)، و backpressure اللي هو نفس فكرة الـ flow control في TCP: اللي بيستقبل بيقول للي بيبعت «استنى».`,
            net: R`[[fetch]] بيرجّع الـ headers أول ما توصل، والـ body بيفضل جاي على الشبكة. [[res.body]] بيدّيك الحتت دي بالترتيب وهي بتوصل، ومقاسها بيحدده TCP مش السيرفر (اتجرّب: 65368 مش 65536).`,
          },
          desc: R`الـ stream هو داتا بتوصل **حتة حتة** (chunks) بدل مرة واحدة. فيه تلات أنواع، وكلهم global في المتصفح وفي Node 24:

| النوع | بيعمل إيه | مثال |
|---|---|---|
| [[ReadableStream]] | مصدر بتقرا منه | [[res.body]] بتاع [[fetch]]، و [[file.stream()]] |
| [[WritableStream]] | مكان بتكتب فيه | ملف، أو عدّاد، أو الشاشة |
| [[TransformStream]] | في النص: بياخد chunk ويطلّع chunk | فك نص، تقطيع سطور، ضغط |

**بتوصلهم ببعض:** [[readable.pipeThrough(transform)]] بيرجّع readable جديد (فتقدر تكمّل)، و [[readable.pipeTo(writable)]] بيرجّع Promise بتخلص لما كل حاجة تتكتب.

**ليه؟** [[await res.text()]] بتستنى الملف كله وتحطه في الرام. بـ streams بتعالج أول سطر وهو لسه بيتحمّل، وبتعرض نسبة: [[received / content-length]].

**والعربي:** الحرف العربي ٢ بايت في UTF-8، والـ chunk ممكن يتقطع في نص الحرف. جرّبتها: فك كل chunk لوحده بـ [[new TextDecoder().decode(chunk)]] طلّع ٨ حروف بايظة ([[�]]) في ملف ٣٤٠ ألف بايت، و [[TextDecoderStream]] طلّع صفر.

و **backpressure:** لو اللي بيكتب أبطأ من اللي بيقرا، الـ pipe بيوقّف القراية لوحده لحد ما الطابور يفضى، فالرام مبتتمليش.`,
          example: R`// شغّله كملف .mjs (فيه await برا أي دالة) والسيرفر اللي في الشرح شغّال
const res = await fetch('http://localhost:8310/big.txt');
const total = Number(res.headers.get('content-length')) || 0;
let received = 0;
const progress = new TransformStream({
  transform(chunk, controller) {
    received += chunk.length;
    if (total) console.log('اتحمّل', Math.round((received / total) * 100) + '%');
    controller.enqueue(chunk);
  },
});
let rest = '';
const lines = new TransformStream({
  transform(text, controller) {
    const parts = (rest + text).split('\n');
    rest = parts.pop();
    for (const line of parts) controller.enqueue(line);
  },
  flush(controller) {
    if (rest) controller.enqueue(rest);
  },
});
let count = 0;
const counter = new WritableStream({
  write() { count++; },
  close() { console.log('سطور:', count); },
});
await res.body
  .pipeThrough(progress)
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(lines)
  .pipeTo(counter);
console.log('خلص:', received, 'بايت');`,
          lines: [
            R`[[await fetch(...)]] بيرجع **أول ما الـ headers توصل**، مش لما الملف يخلص. الـ body لسه جاي على الشبكة، وموجود في [[res.body]] كـ [[ReadableStream]] من [[Uint8Array]] (بايتات).`,
            R`الحجم الكلي من هيدر [[content-length]] (بالبايت). [[headers.get]] بيرجّع نص أو [[null]]، و [[Number(null)]] = [[0]]، و [[|| 0]] بتحمي من [[NaN]]. لو السيرفر مبعتهوش (chunked) بيبقى صفر، وجرّبتها: القسمة على صفر طلّعت [[Infinity%]]، عشان كده الشرط اللي تحت.`,
            R`عدّاد البايتات اللي وصلت لحد دلوقتي. برا الـ transform عشان يفضل بين الـ chunks، ونطبعه في الآخر.`,
            R`أول مرحلة في الخط: [[TransformStream]] بيعدّي كل chunk زي ما هو، بس بيعدّه في السكة. ده أبسط شكل للـ transform: «شوف وعدّي».`,
            R`[[transform(chunk, controller)]] بتتنادى مرة مع كل chunk داخل. [[controller]] هو اللي بتطلّع بيه حاجات للمرحلة اللي بعدك.`,
            R`[[chunk.length]] عدد البايتات في الحتة دي (لأنه [[Uint8Array]]). مش عدد الحروف: الحرف العربي بايتين.`,
            R`النسبة = اللي وصل ÷ الكلي × ١٠٠، و [[Math.round]] للتقريب. و [[if (total)]] بيمنع الطباعة لو الحجم مش معروف. في المتصفح هنا بتحدّث [[progress.value]] بدل الـ log.`,
            R`[[enqueue(chunk)]] بيطلّع الـ chunk للمرحلة الجاية. لو نسيته، كل حاجة بعد كده هتستلم ولا حاجة، والسطور هتطلع صفر من غير ولا error.`,
            R`نهاية [[transform]].`,
            R`نهاية الـ [[TransformStream]] الأول.`,
            R`باقي السطر اللي اتقطع في آخر chunk ولسه مخلصش. لازم يفضل برا الـ transform عشان يتلزق في أول الـ chunk الجاي.`,
            R`تاني transform: بياخد نص (بعد ما [[TextDecoderStream]] فكّه) ويطلّع سطر سطر. ده محتاج حالة ([[rest]]) لأن الـ chunk مش بيخلص عند [[\n]].`,
            R`[[text]] هنا نص مش بايتات، لأن المرحلة اللي قبله [[TextDecoderStream]].`,
            R`نلزق الباقي القديم في أول النص الجديد، ونقطّع على [[\n]]. لو الـ chunk خلص في نص سطر، آخر عنصر في [[parts]] هيبقى السطر الناقص.`,
            R`[[pop()]] بيشيل آخر عنصر ويرجّعه: ده السطر اللي لسه مخلصش، نحفظه لحد الـ chunk الجاي. ولو الـ chunk خلص بـ [[\n]] بالظبط، آخر عنصر هيبقى نص فاضي.`,
            R`كل سطر كامل بيطلع للمرحلة الجاية لوحده. يعني chunk واحد داخل ممكن يطلّع مئات السطور، والـ transform مش شرط واحد بواحد.`,
            R`نهاية [[transform]].`,
            R`[[flush]] بتتنادى مرة واحدة في الآخر بعد آخر chunk. ده مكان أي حاجة متخزنة لسه مطلعتش.`,
            R`لو الملف مخلصش بـ [[\n]]، آخر سطر قاعد في [[rest]] ومحدش طلّعه. من غير [[flush]] آخر سطر في الملف **بيضيع** ساكت.`,
            R`نهاية [[flush]].`,
            R`نهاية الـ [[TransformStream]] التاني.`,
            R`عدّاد السطور اللي هيوصل للآخر.`,
            R`آخر مكان في الخط: [[WritableStream]]. هنا بنعدّ، وفي الحقيقة ممكن تكتب في IndexedDB أو تضيف صف في جدول.`,
            R`[[write(chunk)]] بتتنادى مع كل سطر. هنا مش محتاجين السطر نفسه فمش واخدينه كـ argument. ولو [[write]] رجّعت Promise، الـ pipe بيستناها قبل ما يبعت اللي بعدها (ده الـ backpressure).`,
            R`[[close()]] بتتنادى لما الـ stream كله يخلص من غير error: هنا الوقت الصح تطبع النتيجة النهائية.`,
            R`نهاية الـ [[WritableStream]].`,
            R`[[await]] على الخط كله: [[pipeTo]] بترجّع Promise بتخلص لما آخر سطر يتكتب، أو بترفض لو أي مرحلة رمت أو الشبكة وقعت. وبعد السطر ده [[res.body]] اتقرا ومينفعش يتقري تاني.`,
            R`أول مرحلة: البايتات بتعدّي على العدّاد. [[pipeThrough]] بيرجّع الـ readable اللي طالع من الـ transform، فنقدر نكمّل بنقطة.`,
            R`فك البايتات لنص UTF-8 **بشكل stream**: لو حرف عربي اتقطع بين chunkين، بيستنى التاني قبل ما يفكّه. ده مدمج، ومحتاجش تكتبه.`,
            R`تقطيع النص لسطور بالـ transform بتاعنا.`,
            R`[[pipeTo]] آخر خطوة: بيوصل لـ writable ومبيرجّعش stream. الخط بيبدأ يشتغل هنا مش قبل كده.`,
            R`اتطبع [[خلص: 340000 بايت]] بعد [[سطور: 20000]]، ونسب التحميل طلعت 19% و 19% و 39% و 58% و 77% و 96% و 100%.`,
          ],
          try: R`شغّل السيرفر والمثال. وبعدين: (١) شيل [[controller.enqueue(chunk)]] من الـ progress وشوف عدد السطور. (٢) غيّر السيرفر يبعت الملف مضغوط بـ [[Content-Encoding: gzip]] وشوف النسبة. (٣) في المتصفح، اعمل [[progress]] element بيتحرك مع التحميل، وزرار «إلغاء» بـ [[AbortController]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** stream مصدره بيعمل [[pull]] بـ [[highWaterMark: 2]]، ورايح لـ writable بطيء (١٠٠ms لكل كتابة) بـ [[highWaterMark: 1]]. قبل ما تشغّل: كام [[pull]] هيحصل قبل أول «اتكتب»؟ وهل المصدر هيعمل الـ ٦ عناصر كلهم مرة واحدة؟`, done: R`توقّعت إن فيه ٣ [[pull]] قبل أول كتابة وبعدها [[pull]] واحد مع كل كتابة (زي الناتج اللي في الشرح)، وتقدر تشرح ليه [[desiredSize]] بقى ١ بعد أول اتنين.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** ملف CSV فيه ٢٠٠ ألف سطر طلبات ([[id,city,total]]) بتعمله بسكربت. اقراه بـ [[fetch]] من سيرفر محلي سطر سطر بنفس خط المثال، واحسب مجموع [[total]] لكل [[city]] من غير ما الملف كله يبقى في الذاكرة.`, done: R`الناتج جدول مدن ومجاميعها، وطابق نفس الحساب بـ [[await res.text()]] و [[split]]، وأول سطر صف header اتشال، وآخر سطر من غير [[\n]] اتحسب (اختبرته بملف آخره من غير سطر فاضي).` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** نفس الملف (اعمله ٢٠٠ ميجا) بطريقتين: [[await res.text()]] ثم [[split('\n').length]]، وخط Streams. قيس الوقت بـ [[performance.now()]] وأقصى رام بـ [[process.memoryUsage().rss]] (اطبعها كل ثانية).`, done: R`عندك جدول برقمين لكل طريقة (وقت وأقصى رام)، والـ Streams رامها ثابتة تقريبًا مهما كبر الملف، و [[text()]] رامها بتكبر مع الملف، ومكتوب إمتى [[text()]] لسه أبسط وكفاية (ملف صغير).` },
          ],
          deep: {
            why: R`الشبكة والديسك بيدّوا الداتا على مراحل أصلًا. لما تكتب [[await res.text()]] انت بتقول «استنى الكل وحطه في الرام»: ملف ٥٠٠ ميجا = ٥٠٠ ميجا رام على الأقل (وضعفها كنص)، ومفيش حاجة تظهر لليوزر لحد الآخر. Streams بتخليك تشتغل بنفس إيقاع الداتا: أول سطر يتعالج وهو لسه واصل، والرام على قد chunk واحد بس، والنسبة تتحسب وهي بتتحمّل.`,
            how: R`كل [[ReadableStream]] فيه **طابور داخلي** ليه حجم مقصود ([[highWaterMark]]، بعدد الـ chunks افتراضيًا). المصدر بيحط فيه بـ [[controller.enqueue]]، و [[controller.desiredSize]] = الحجم المقصود − اللي في الطابور. المحرك بينادي [[pull()]] بتاع المصدر **بس** لما [[desiredSize > 0]].

**backpressure في فقرة:** [[pipeTo]] بيقرا chunk ويكتبه، ولو [[write()]] بتاعة الـ writable لسه مخلصتش (Promise مستنية) والطابور بتاعها مليان، [[pipeTo]] بيبطّل يقرا. المصدر طابوره بيتملي، [[desiredSize]] بيوصل صفر، فالمحرك بيبطّل ينادي [[pull]]. الضغط بيرجع لورا مرحلة مرحلة لحد المصدر، وفي [[fetch]] بيوصل لحد TCP فالسيرفر نفسه بيبطّأ. اتقاس: مصدر بـ [[highWaterMark: 2]] و writable بطيء، الـ [[pull]] اتنادى ٣ مرات بس قبل أول كتابة، وبعدها مرة مع كل كتابة. **بس** لو المصدر حط كل حاجة في [[start()]] مرة واحدة (مش [[pull]])، مفيش backpressure: كله في الرام.

**القفل:** [[getReader()]] بيقفل الـ stream لقارئ واحد ([[locked]] = [[true]])، وتاني [[getReader()]] رمى [[TypeError: Invalid state: ReadableStream is locked]]. ونفس الكلام [[res.text()]] بعد ما قريت [[res.body]]: [[TypeError: Body is unusable: Body has already been read]]. لو محتاج تقراه مرتين: [[res.clone()]] قبلها أو [[stream.tee()]].`,
            when: R`استخدمه لما الحجم كبير أو مش معروف، أو لما عايز تعرض حاجة قبل ما الكل يوصل: تحميل بنسبة، CSV أو JSON lines كبير، لوج، ردود AI (SSE فوق [[fetch]] بيتقري كده)، ضغط وفك ([[CompressionStream]])، رفع ملف كبير. ولـ JSON صغير أو صفحة عادية [[await res.json()]] أبسط وأوضح. وفي Node، الـ web streams دي غير [[node:stream]] القديم ([[pipeline]] و [[fs.createReadStream]]، درس «streams و pipeline» في تاب «Backend بـ Node»)، وفيه [[Readable.toWeb()]] و [[Readable.fromWeb()]] للتحويل.`,
            mistakes: R`تفك كل chunk بـ [[new TextDecoder().decode(chunk)]] لوحده فالعربي يبوظ عند الحدود (اتقاس: ٨ حروف بايظة)، والحل [[TextDecoderStream]] أو [[decode(chunk, { stream: true })]] بنفس الـ decoder. أو تنسى [[flush]] فآخر سطر يضيع. أو تنسى [[enqueue]] في transform فالخط يطلّع صفر. أو تحسب النسبة من [[content-length]] والرد مضغوط: اتقاس [[content-length 879 وصل 340000 ← 38680%]] لأن الهيدر حجم المضغوط و [[fetch]] بيفك. أو مفيش [[content-length]] فالنسبة [[Infinity%]]. أو تقرا [[res.body]] وبعدين [[res.json()]]. أو تحط كل الداتا في [[start()]] وتفتكر عندك backpressure.`,
          },
          teach: R`## داتا بتوصل حتة حتة

[[fetch]] بيرجّع أول ما الـ headers توصل، والـ body لسه جاي. [[res.body]] بيدّيك الحتت دي بالترتيب. كل اللي تحت اتشغّل على Node 24.22 على ويندوز ١١ (الـ web streams و [[fetch]] global هناك زي المتصفح)، والسيرفر على نفس الجهاز.

---

## ١. السيرفر: ملف ٣٤٠ ألف بايت بيتبعت على مراحل

~~~js server.mjs
import http from 'node:http';
const body = Buffer.from('سطر رقم ١\n'.repeat(20000));
http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8', 'Content-Length': body.length });
  for (let i = 0; i < body.length; i += 65536) {
    res.write(body.subarray(i, i + 65536));
    await new Promise(r => setTimeout(r, 50));
  }
  res.end();
}).listen(8310, () => console.log('على 8310، الحجم', body.length));
~~~

~~~text الناتج
على 8310، الحجم 340000
~~~

ليه ٣٤٠ ألف؟ «سطر رقم ١» + [[\n]]: ٧ حروف عربي × ٢ بايت + ٢ مسافة + [[\n]] = ١٧ بايت، × ٢٠ ألف = ٣٤٠٬٠٠٠. والسيرفر بيبعت ٦٤ كيلو كل ٥٠ms عشان نشوف التحميل بيتقدم.

---

## ٢. أبسط قراية: [[getReader()]] ونسبة

~~~js progress.mjs
const res = await fetch('http://localhost:8310/big.txt');
const total = Number(res.headers.get('content-length'));
const reader = res.body.getReader();
let received = 0, chunks = 0;
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  received += value.length;
  chunks++;
  console.log($__bt$__{Math.round((received / total) * 100)}%$__bt.padStart(4), value.constructor.name, value.length);
}
console.log('خلص:', received, 'بايت في', chunks, 'chunk من', total);
~~~

~~~text الناتج
 19% Uint8Array 65368
 19% Uint8Array 168
 39% Uint8Array 65536
 58% Uint8Array 65536
 77% Uint8Array 65536
 96% Uint8Array 65536
100% Uint8Array 12320
خلص: 340000 بايت في 7 chunk من 340000
~~~

- [[getReader()]]: بيدّيك قارئ ويقفل الـ stream ليك لوحدك.
- [[reader.read()]]: Promise بترجّع [[{ done, value }]]. [[value]] [[Uint8Array]] (بايتات)، و [[done: true]] لما الملف يخلص.
- **مفاجأة:** السيرفر كتب ٦٤ كيلو (65536) بالظبط، بس أول مرة وصل [[65368]] و [[168]]. مقاس الـ chunk بيحدده TCP والـ buffers في السكة، مش السيرفر. فمتعتمدش أبدًا على إن الـ chunk سطر أو record كامل.

وفيه طريقة أقصر في Node وأغلب المتصفحات الحديثة: [[for await (const chunk of res.body)]] (الـ stream نفسه async iterable).

---

## ٣. العربي بيبوظ عند حدود الـ chunk

~~~js decode.mjs
let res = await fetch('http://localhost:8310/');
let broken = 0;
for await (const chunk of res.body) broken += (new TextDecoder().decode(chunk).match(/�/g) || []).length;
console.log('حروف بايظة (�) من غير stream:', broken);
res = await fetch('http://localhost:8310/');
let text = '';
for await (const s of res.body.pipeThrough(new TextDecoderStream())) text += s;
console.log('بـ TextDecoderStream:', (text.match(/�/g) || []).length, 'بايظة، و', text.split('\n').length - 1, 'سطر');
~~~

~~~text الناتج
حروف بايظة (�) من غير stream: 8
بـ TextDecoderStream: 0 بايظة، و 20000 سطر
~~~

- [[�]] هو الحرف [[�]] (replacement character) اللي الـ decoder بيحطه لما يلاقي بايتات مش مكتملة.
- **ليه بالظبط هنا؟** 65536 ÷ 17 = 3855 سطر وباقي 1، يعني أول chunk بيخلص بعد **أول بايت** من حرف [[س]] (حرف عربي = بايتين). الـ decoder اللي بيفك chunk لوحده شاف بايت يتيم فحط [[�]]، والـ chunk اللي بعده بدأ ببايت يتيم تاني.
- [[TextDecoderStream]] (أو [[decoder.decode(chunk, { stream: true })]] بنفس الـ decoder كل مرة) بيحتفظ بالبايت الناقص لحد الـ chunk الجاي.

---

## ٤. التلات أنواع من الصفر

~~~js basics.mjs
const numbers = new ReadableStream({
  start(controller) {
    for (const n of [1, 2, 3]) controller.enqueue(n);
    controller.close();
  },
});
const double = new TransformStream({ transform(n, c) { c.enqueue(n * 2); } });
for await (const n of numbers.pipeThrough(double)) console.log(n);
const r = new ReadableStream({ start(c) { c.enqueue('a'); c.close(); } });
const reader = r.getReader();
console.log(await reader.read(), await reader.read());
try { r.getReader(); } catch (e) { console.log(e.name, e.message); }
console.log(r.locked);
~~~

~~~text الناتج
2
4
6
{ done: false, value: 'a' } { value: undefined, done: true }
TypeError Invalid state: ReadableStream is locked
true
~~~

| الجزء | بيتنادى إمتى | بتعمل فيه إيه |
|---|---|---|
| [[start(controller)]] في Readable | مرة أول ما الـ stream يتعمل | تجهّز المصدر، أو تحط داتا صغيرة كلها |
| [[pull(controller)]] في Readable | كل ما الطابور يبقى فيه مكان | تجيب chunk واحد وتعمله [[enqueue]] |
| [[cancel(reason)]] في Readable | لو اللي بيقرا لغى | تقفل الملف أو الاتصال |
| [[transform(chunk, controller)]] | مع كل chunk داخل | تطلّع صفر أو أكتر بـ [[enqueue]] |
| [[flush(controller)]] في Transform | مرة بعد آخر chunk | تطلّع أي حاجة متخزنة |
| [[write(chunk)]] في Writable | مع كل chunk | تكتب، ولو رجّعت Promise الباقي بيستنى |
| [[close()]] في Writable | لما كل حاجة تخلص | تقفل وتطبع النتيجة |

و [[controller.close()]] في المصدر معناها «مفيش تاني»، ومن غيرها اللي بيقرا هيستنى للأبد.

---

## ٥. الخط الكامل: [[pipeThrough]] و [[pipeTo]]

~~~text الشكل
res.body ─► progress ─► TextDecoderStream ─► lines ─► counter
 بايتات     بيعدّ البايتات     بايتات ← نص        نص ← سطور    بيعدّ السطور
~~~

~~~text الناتج: node example.mjs
اتحمّل 19%
اتحمّل 19%
اتحمّل 39%
اتحمّل 58%
اتحمّل 77%
اتحمّل 96%
اتحمّل 100%
سطور: 20000
خلص: 340000 بايت
~~~

[[pipeThrough]] بيرجّع readable فبتكمّل بنقطة، و [[pipeTo]] آخر حلقة وبيرجّع Promise. ولو أي مرحلة رمت، الـ Promise بترفض والمراحل التانية بتتلغي لوحدها. وللإلغاء من برا: [[pipeTo(dest, { signal })]] بـ [[AbortController]]، أو [[fetch(url, { signal })]] (درس «fetch و AbortController»).

---

## ٦. backpressure: اللي بيكتب بطيء

~~~js backpressure.mjs
let made = 0;
const source = new ReadableStream({
  pull(controller) {
    made++;
    console.log('pull #' + made, 'desiredSize =', controller.desiredSize);
    controller.enqueue('item ' + made);
    if (made === 6) controller.close();
  },
}, { highWaterMark: 2 });
const slow = new WritableStream({
  async write(chunk) {
    await new Promise(r => setTimeout(r, 100));
    console.log('   اتكتب', chunk);
  },
}, { highWaterMark: 1 });
await source.pipeTo(slow);
~~~

~~~text الناتج
pull #1 desiredSize = 2
pull #2 desiredSize = 2
pull #3 desiredSize = 1
   اتكتب item 1
pull #4 desiredSize = 1
   اتكتب item 2
pull #5 desiredSize = 1
   اتكتب item 3
pull #6 desiredSize = 1
   اتكتب item 4
   اتكتب item 5
   اتكتب item 6
~~~

**الفقرة:** المصدر مبيعملش الـ ٦ مرة واحدة. عمل ٣ (الطابور بتاعه ٢ وواحد في إيد الـ pipe) وبعدها **وقف** لحد ما الكاتب البطيء خلّص واحدة، وبعدها بقى بيعمل واحد مع كل كتابة. ده الـ backpressure: [[pipeTo]] بيستنى Promise الـ [[write]]، فالطابور ميفضاش، فـ [[desiredSize]] ميكبرش، فالمحرك مبينادي [[pull]]. مع [[fetch]] الضغط ده بيوصل لحد TCP فالسيرفر نفسه بيبطّأ. والشرط: المصدر يجيب الداتا في [[pull]] مش يحطها كلها في [[start]].

---

## ٧. فخاخ اتقاست

~~~text الناتج: سيرفر من غير content-length
content-length: null transfer-encoding: chunked
النسبة لو اعتمدت عليه: Infinity%
TypeError: Body is unusable: Body has already been read
~~~

~~~text الناتج: سيرفر بيبعت gzip و Content-Length
content-length 879 وصل 340000 ← 38680%
~~~

| الفخ | السبب | الحل |
|---|---|---|
| [[Infinity%]] | الرد chunked ومفيش [[content-length]] | اعرض الميجات اللي وصلت بدل النسبة |
| [[38680%]] | [[content-length]] حجم المضغوط، و [[fetch]] بيدّيك بعد الفك | اعرض الميجات، أو خلّي السيرفر يبعت الحجم الأصلي في هيدر تاني |
| [[Body is unusable]] | [[res.body]] اتقرا، ومفيش قراية تانية | [[res.clone()]] قبل القراية، أو [[stream.tee()]] |
| [[ReadableStream is locked]] | [[getReader()]] مرتين | [[reader.releaseLock()]] أو قارئ واحد |
| آخر سطر ضاع | مفيش [[flush]] | [[flush]] يطلّع [[rest]] |

---

## الخلاصة

- Readable مصدر، و Transform في النص، و Writable آخر الخط، و [[pipeThrough]] بيكمّل و [[pipeTo]] بيخلّص.
- [[res.body]] بايتات بمقاسات عشوائية: متعتمدش على حدود الـ chunk.
- العربي: [[TextDecoderStream]] مش [[decode]] لكل chunk لوحده.
- النسبة = [[received / content-length]]، بس لو موجود ومش مضغوط.
- backpressure بيجي ببلاش طالما المصدر بيستخدم [[pull]] والكاتب بيرجّع Promise.`,
          sol: R`اتجرّب على Node 24.22:

- **من غير [[enqueue]]** في الـ progress: الخط خلص من غير ولا error، بس طبع [[سطور: 0]]، لأن ولا chunk عدّى للمرحلة الجاية. ونسب التحميل لسه اتطبعت لأن الـ transform نفسه اتنادى.
- **بـ gzip:** [[content-length]] بقى حجم المضغوط (879 بايت) و [[received]] بقى 340000 بعد الفك، فالنسبة طلعت 38680%. الحل: لو [[res.headers.get('content-encoding')]] موجود، اعرض الحجم اللي وصل بالميجا من غير نسبة.
- **في المتصفح:** الكود تحت (من نفس الفكرة، والـ [[progress]] element و [[AbortController]] شغالين بنفس الطريقة في Chrome حسب MDN، والمنطق نفسه اتجرّب في Node).`,
          solCode: R`const ac = new AbortController();
document.querySelector('#cancel').onclick = () => ac.abort();
const bar = document.querySelector('progress');
const res = await fetch('/big.txt', { signal: ac.signal });
const zipped = res.headers.get('content-encoding');
const total = zipped ? 0 : Number(res.headers.get('content-length')) || 0;
let received = 0;
try {
  for await (const chunk of res.body) {
    received += chunk.length;
    if (total) bar.value = received / total;
    else bar.removeAttribute('value');
  }
} catch (e) {
  if (e.name === 'AbortError') console.log('اتلغى بعد', received, 'بايت');
  else throw e;
}`,
        },
      ],
    }
]);
