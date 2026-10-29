// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "مشروع: fetch محترم",
      l: 3,
      time: R`حوالي ساعتين`,
      goal: [
        R`تفهم ليه [[fetch]] **مش بترمي** على 404، وتعمل أخطاء ليها نوع.`,
        R`تحط مهلة لأي طلب بـ [[AbortSignal.timeout]]، وتسمح لليوزر يلغي.`,
        R`تعيد المحاولة على الأخطاء المؤقتة بس، بمهلة أُسّية فيها عشوائية.`,
        R`تختبر كل ده **من غير شبكة** خالص.`,
      ],
      use: {
        prog: R`كل تطبيق فيه طلبات شبكة محتاج الأربع حاجات دي. والمكتبات الجاهزة بتعملهم — بس اللي بيفهمهم بيعرف يظبطهم ويشخّص لما يقعوا.`,
        net: R`الشبكة بتفشل. و٥٠٣ مؤقتة غير ٤٠٤ دائمة، وإعادة المحاولة على التانية هدر وعلى الأولى إنقاذ. والتفرقة دي هي المشروع كله.`,
        cs: R`الـ exponential backoff with jitter خوارزمية حقيقية: من غير العشوائية، كل العملاء بيعيدوا في نفس اللحظة وبيوقّعوا السيرفر تاني (thundering herd).`,
        work: R`الطلب اللي بيعلّق للأبد بيخلي واجهتك تبان مكسورة. والمهلة سطر واحد.`,
      },
      lab: R`mkdir -p ~/lab/jslab && cd ~/lab/jslab && npm init -y && npm pkg set type=module`,
      projects: [
        { t: R`حدّ للتزامن`, what: R`لو بتعمل ٥٠ طلب، متعملهمش كلهم مرة واحدة. اكتب [[pool(items, limit, fn)]] بتشغّل [[limit]] بس في نفس الوقت. هتحتاج [[Promise.race]] ومصفوفة شغالة.` },
        { t: R`قاطع الدايرة (circuit breaker)`, what: R`لو الخدمة فشلت ٥ مرات ورا بعض، بطّل تحاول لمدة دقيقة وارمي على طول. ده بيحمي السيرفر اللي واقع من إنك تزوّد عليه. من درس ٣.` },
        { t: R`كاش للطلبات المتكررة`, what: R`[[Map]] من الـ URL للـ Promise. لو نفس الطلب اتطلب وهو لسه شغال، رجّع نفس الـ Promise بدل ما تعمل طلب تاني. اسمها request deduplication.` },
        { t: R`حطّها في مشروع حقيقي`, what: R`بدّل [[fetch]] في مشروع عندك بـ [[request]]. وشوف كام مكان كنت ناسي فيه تفحص [[res.ok]]. من درس ١.` },
      ],
      n: R`هنبني [[request()]]: غلاف حوالين [[fetch]] فيه مهلة، وإعادة محاولة ذكية، وأخطاء ليها نوع. أربع خطوات، وكل خطوة بتحل مشكلة بتحصل في الإنتاج`,
      items: [
        {
          cmd: "مشروع — fetch مش بترمي على 404",
          title: "ok و status، وأخطاء ليها نوع",
          learn: R`تعرف إن [[fetch]] بتنجح على ٤٠٤ و٥٠٠، وتعمل كلاسات أخطاء تفرّق بينهم.`,
          out: R`[[catch]] واحد بيفرّق بين فشل الشبكة وفشل الـ HTTP.`,
          use: {
            prog: R`الفرق بين «الطلب وصل والسيرفر رد بخطأ» و«الطلب موصلش» كبير: الأولى بيانات، والتانية شبكة. والمعالجة مختلفة.`,
            net: R`[[TypeError: fetch failed]] مبتقولش حاجة. والسبب الحقيقي في [[e.cause]] — [[ECONNREFUSED]] أو [[ENOTFOUND]] أو [[CERT_HAS_EXPIRED]].`,
            cs: R`تصنيف الأخطاء بأنواع بدل نصوص بيخلي [[catch]] يقرر، مش يخمّن. وده الفرق بين [[e.message.includes('404')]] و [[e instanceof HttpError]].`,
          },
          desc: R`أول حاجة لازم تعرفها عن [[fetch]]، وأكتر حاجة بتوقّع الناس:

**[[fetch]] مبترميش على أخطاء HTTP.**

طلب رجّع ٤٠٤؟ الـ Promise **بتنجح**. ٥٠٠؟ بتنجح. الـ [[await]] بيعدّي عادي، و [[catch]] مبيشتغلش.

وبترمي في حالة واحدة: **الطلب نفسه موصلش** — شبكة مقطوعة، أو DNS فشل، أو شهادة غلط، أو اليوزر لغى.

جرّبتها: طلب على [[/404]] رجّع [[ok: false]] و [[status: 404]]، والكود كمّل عادي. وطلب على بورت مقفول رمى [[TypeError: fetch failed]].

والرسالة دي **مبتقولش حاجة**. السبب الحقيقي في [[e.cause]]: جرّبتها وطلعت [[ECONNREFUSED]].

**فالغلاف بتاعنا بيعمل تلات حاجات:**

يفحص [[res.ok]] ويرمي [[HttpError]] فيها الـ status والـ body.
يلفّ خطأ الشبكة في [[NetworkError]] فيها السبب الحقيقي من [[cause]].
ويسيب أخطاء الإلغاء زي ما هي.

وبكده، اللي بيستخدم الأداة بيكتب [[catch]] واحد بيفرّق بـ [[instanceof]] بدل ما يفحص نصوص.`,
          example: R`export class HttpError extends Error {
  constructor(response, body) {
    super($__btHTTP $__{response.status} $__{response.statusText} على $__{response.url}$__bt);
    this.name = 'HttpError';
    this.status = response.status;
    this.url = response.url;
    this.body = body;
  }
}

export class NetworkError extends Error {
  constructor(cause) {
    super($__btفشل الاتصال: $__{cause?.code ?? cause?.message ?? 'سبب مش معروف'}$__bt);
    this.name = 'NetworkError';
    this.cause = cause;
  }
}`,
          lines: [
            R`كلاس error خاص بأخطاء الـ HTTP (زي 404 و 500)، بيورث [[Error]] فبياخد [[message]] و stack trace ببلاش، و [[e instanceof HttpError]] بتشتغل عشان تفرّقه عن أي error تاني. و [[export]] عشان الملفات التانية والاختبارات تستورده.`,
            R`الـ constructor بياخد الـ [[response]] نفسه (منه الـ status والرابط)، والـ [[body]] اللي قريناه منه قبل كده، لأن الـ body بيتقري مرة واحدة بس.`,
            R`[[super]] بينادي constructor بتاع [[Error]] بالرسالة، ولازم يتنادى قبل أي [[this]]. الرسالة فيها الكود والنص والرابط، فلو شفتها في اللوج لوحدها تعرف إيه اللي فشل وفين.`,
            R`[[name]] بتظهر في أول الـ stack وفي [[console.log]]. **لازم تحطها**: من غيرها هتفضل «Error» حتى لو الكلاس اسمه [[HttpError]]، فاللوج مش هيقولك نوع الغلط.`,
            R`بنحفظ الـ status كرقم في خاصية لوحدها، عشان اللي يمسك الـ error يقرر بسهولة ([[e.status === 404]]) من غير ما يقرا الرسالة النصية ويحللها.`,
            R`بنحفظ الرابط اللي فشل، مفيد في اللوج لما يبقى عندك طلبات كتير لأماكن مختلفة.`,
            R`وبنحفظ الـ body: ساعات السيرفر بيحط فيه سبب الرفض (زي «الإيميل مستخدم قبل كده»)، وده اللي تعرضه لليوزر.`,
            R`نهاية الـ constructor.`,
            R`نهاية كلاس [[HttpError]].`,
            R`كلاس تاني لنوع مختلف من الفشل: الاتصال نفسه مكملش (DNS، السيرفر مش شغال، النت قاطع)، يعني مفيش رد خالص. فصلهم بيخلي اللي فوق يقرر: ده يستاهل إعادة ولا لأ.`,
            R`الـ constructor بياخد [[cause]]: الـ error الأصلي الواطي اللي جه من [[fetch]] (في Node غالبًا فيه [[code]] زي [[ECONNREFUSED]]).`,
            R`الرسالة بتجرّب [[code]] الأول، ولو مش موجود الرسالة، ولو الاتنين مش موجودين نص ثابت. و [[?.]] عشان لو [[cause]] نفسها [[undefined]] ميرميش TypeError جوه الـ constructor.`,
            R`نفس فكرة [[HttpError]]: الاسم بيظهر في اللوج وفي الـ stack، فتعرف من أول نظرة إن المشكلة في الاتصال مش في رد السيرفر.`,
            R`**بنحتفظ بالسبب الأصلي** في [[cause]]، وده الاسم المتعارف عليه اللي [[console.log]] و Node بيعرضوه تحت الـ error. من غيره هتعرف إن الاتصال فشل بس مش هتعرف ليه.`,
            R`نهاية الـ constructor.`,
            R`نهاية كلاس [[NetworkError]].`
          ],
          try: R`شغّل [[const r = await fetch('https://httpbin.org/status/404')]] وشوف هل الكود كمّل. واطبع [[r.ok]] و [[r.status]]. وبعدين جرّب [[fetch]] على بورت مقفول واطبع [[e.cause]].`,
          deep: {
            why: R`الكود اللي مبيفحصش [[res.ok]] بيكمّل على بيانات مش موجودة. وبعدين بتلاقي [[Cannot read properties of undefined]] في مكان تاني خالص — بعيد عن السبب.`,
            how: R`**ليه [[fetch]] كده؟** لأن الرد **وصل**. السيرفر رد، والـ ٤٠٤ ده **رد صحيح** من ناحية الشبكة. الـ Promise بتوصف نجاح العملية (الطلب راح ورجع)، مش رضاك عن المحتوى.

ودي كانت قرار مقصود في المواصفة، والناس بتختلف عليه لحد دلوقتي. و [[axios]] بتعمل العكس (بترمي على ٤xx و٥xx) — وده الفرق الأساسي بينهم.

**الحالات اللي [[fetch]] بترمي فيها:**

| السبب | الشكل |
|---|---|
| شبكة / DNS / اتصال | [[TypeError: fetch failed]] و [[cause]] فيها الكود |
| إلغاء | [[AbortError]] أو اللي مررته لـ [[abort()]] |
| مهلة | [[TimeoutError]] |
| CORS (في المتصفح) | [[TypeError: Failed to fetch]] |
| URL غلط | [[TypeError: Failed to parse URL]] |

**و [[e.cause]] في Node** فيها كائن فيه [[code]] زي [[ECONNREFUSED]] و [[ENOTFOUND]] و [[ETIMEDOUT]] و [[CERT_HAS_EXPIRED]]. وفي المتصفح، [[cause]] غالبًا فاضية والرسالة مبهمة عن قصد (أمان).

**وقراية الـ body مرة واحدة بس**: [[res.json()]] أو [[res.text()]] بتستهلك الـ stream. فلو قريت [[text()]] عشان رسالة الخطأ، مش هتقدر تقرا [[json()]] بعدها. و [[res.clone()]] بتدّيك نسخة لو محتاج الاتنين.

وعشان كده [[HttpError]] بتاخد الـ [[body]] اللي اتقرا، مش الـ [[Response]] عشان تقراه بعدين.

**و [[this.name]]**: من غيرها، [[e.name]] بتفضل [[Error]] والـ stack بتبدأ بـ [[Error:]]. وكلاسك بيشتغل مع [[instanceof]] برضه، بس اللوج بيبقى أقل وضوحًا.`,
            when: R`أي كود بيستخدم [[fetch]]. والفحص من أول سطر.`,
            mistakes: R`تفترض إن [[await fetch]] اللي عدّى معناه نجاح. أو تقرا الـ body مرتين. أو تفحص [[e.message.includes('404')]] بدل [[e.status === 404]]. أو تنسى [[this.name]].`
          },
          teach: R`## الحاجة اللي بتوقّع الكل

~~~js
const res = await fetch('/api/user/999');   // السيرفر رد 404
console.log('وصلنا هنا');                    // ✅ بيطبع
const user = await res.json();               // { error: '...' }
console.log(user.name);                      // undefined
~~~

**[[fetch]] مبترميش على ٤٠٤.** ولا على ٥٠٠.

~~~text اتشغّل فعلًا · Node 24
=== fetch على 404 ===
رمى؟ لأ — وصلنا هنا
ok: false | status: 404 | statusText: "Not Found"
body: {"error":"مش موجود"}
~~~

**ليه؟** لأن الرد **وصل**. السيرفر رد، والـ ٤٠٤ رد صحيح من ناحية الشبكة. الـ Promise بتوصف «الطلب راح ورجع»، مش رضاك عن المحتوى.

> و [[axios]] بتعمل العكس (بترمي على 4xx و5xx). وده الفرق الأساسي بينهم.

---

## ١. وبترمي إمتى؟

| السبب | الشكل |
|---|---|
| شبكة / DNS / اتصال | [[TypeError: fetch failed]] |
| إلغاء | [[AbortError]] أو اللي مررته |
| مهلة | [[TimeoutError]] |
| CORS (في المتصفح) | [[TypeError: Failed to fetch]] |
| URL غلط | [[TypeError: Failed to parse URL]] |

~~~text اتشغّل فعلًا — بورت مقفول
name: TypeError | message: fetch failed
e.cause: ECONNREFUSED | connect ECONNREFUSED 127.0.0.1:8199
~~~

**[[fetch failed]] مبتقولش حاجة. و [[e.cause]] بتقول كل حاجة.**

وأكواد شائعة: [[ECONNREFUSED]] (مفيش حاجة بتسمع)، و [[ENOTFOUND]] (DNS)، و [[ETIMEDOUT]]، و [[CERT_HAS_EXPIRED]].

> في المتصفح، [[cause]] غالبًا فاضية والرسالة مبهمة **عن قصد** (أمان: متقولش لصفحة ليه الطلب فشل).

---

## ٢. أخطاء ليها نوع

~~~js
export class HttpError extends Error {
  constructor(response, body) {
    super($__btHTTP $__{response.status} $__{response.statusText} على $__{response.url}$__bt);
    this.name = 'HttpError';
    this.status = response.status;
    this.body = body;
  }
}
~~~

~~~text والنتيجة (اتشغّل فعلًا)
instanceof HttpError: true
name: HttpError | status: 404
message: HTTP 404 Not Found على http://127.0.0.1:8120/404
body: {"error":"مش موجود"}
~~~

**[[this.name]] مش زينة**: من غيرها [[e.name]] بتفضل [[Error]] واللوج بيبقى أقل وضوحًا.

---

## ٣. والـ body بيتقرا **مرة واحدة**

~~~js ده هيفشل
const text = await res.text();
const data = await res.json();   // ❌ الـ stream اتستهلك
~~~

~~~js والحل لو محتاج الاتنين
const data = await res.clone().json();
const text = await res.text();
~~~

وعشان كده [[HttpError]] بتاخد الـ [[body]] **اللي اتقرا**، مش الـ [[Response]] عشان تقراه بعدين.

---

## ٤. والفايدة في الاستخدام

~~~js من غير أنواع
catch (e) {
  if (e.message.includes('404')) { ... }   // هشّ
}
~~~

~~~js بأنواع
catch (e) {
  if (e instanceof HttpError && e.status === 404) { showNotFound(); }
  else if (e instanceof NetworkError)             { showOffline(); }
  else throw e;                                    // اللي متعرفوش، ارميه
}
~~~

**[[else throw e]] مهمة.** الـ [[catch]] اللي بيبلع كل حاجة بيخفي الباگات.

---

## الخلاصة

- [[fetch]] بتنجح على ٤٠٤ و٥٠٠ — **افحص [[res.ok]]**.
- بترمي على الشبكة والإلغاء والمهلة بس.
- [[e.cause]] فيها السبب الحقيقي في Node.
- الـ body بيتقرا مرة — [[clone()]] لو محتاج الاتنين.
- كلاسات أخطاء + [[this.name]] + [[instanceof]].`,
          sol: R`الحقيقة الأساسية بناتجها: [[fetch]] عدّت على ٤٠٤، ورمت على بورت مقفول بسبب في [[cause]].`,
          solCode: R`const r404 = await fetch('http://127.0.0.1:8111/404');
console.log('رمى؟ لأ — وصلنا هنا');
console.log('ok:', r404.ok, '| status:', r404.status);
// رمى؟ لأ — وصلنا هنا
// ok: false | status: 404 | statusText: "Not Found"
// body: {"error":"مش موجود"}

try { await fetch('http://127.0.0.1:8199/'); }
catch (e) {
  console.log('name:', e.name, '| message:', e.message);
  console.log('e.cause:', e.cause?.code);
}
// name: TypeError | message: fetch failed
// e.cause: ECONNREFUSED | connect ECONNREFUSED 127.0.0.1:8199

// (اتشغّلوا فعلًا على Node 24.22.1)`
        },

        {
          cmd: "مشروع — المهلة والإلغاء",
          title: "AbortSignal.timeout و any، والفرق بينهم",
          learn: R`تحط مهلة لأي طلب، وتسمح لليوزر يلغي، وتجمع الإشارتين.`,
          out: R`مفيش طلب بيعلّق للأبد، واليوزر يقدر يوقف.`,
          use: {
            prog: R`[[AbortSignal]] معيار عام — مش لـ [[fetch]] بس. أي دالة بتاخد [[signal]] بتبقى قابلة للإلغاء، وده بيخلي الإلغاء يمشي في كل الطبقات.`,
            net: R`الطلب اللي مالوش مهلة بيعلّق لحد ما نظام التشغيل يقرر. ودي دقايق أحيانًا، وفي الوقت ده الواجهة بتبان مكسورة.`,
            cs: R`الإلغاء التعاوني: مفيش حاجة بتقتل العملية — الإشارة بتتبعت، والكود بيتصرّف. وده الشكل الوحيد الآمن للإلغاء.`,
          },
          desc: R`[[fetch]] من غير مهلة بيستنى لحد ما نظام التشغيل يستسلم. ودي ممكن تكون دقيقتين.

**[[AbortSignal.timeout(ms)]]** بتعمل إشارة بتلغي نفسها بعد المدة دي:

[[await fetch(url, { signal: AbortSignal.timeout(5000) })]]

سطر واحد. وبترمي [[TimeoutError]] — جرّبتها على سيرفر بطيء وطلعت بعد ٥١١ms بـ [[name: 'TimeoutError']].

**[[AbortController]]** للإلغاء اليدوي: بتعمل واحد، وبتدّي [[ac.signal]] للطلب، وبتنادي [[ac.abort()]] لما تحب.

ولو مررت قيمة: [[ac.abort(new Error('اليوزر لغى'))]] — **القيمة دي هي اللي بتترمي**. جرّبتها وطلعت بنفس الرسالة بالظبط.

**[[AbortSignal.any([a, b])]]** بتجمع إشارتين: أول واحدة تلغي، الكل بيتلغي. ودي اللي بتخليك تحط مهلة **وتسمح لليوزر يلغي** في نفس الوقت.

**والفرق اللي الأداة محتاجة تعرفه:** المهلة سبب يستاهل إعادة محاولة (الشبكة كانت بطيئة لحظة). وإلغاء اليوزر **مش** سبب يستاهل إعادة — هو قال لأ.

فالأداة بتفحص [[outer?.aborted]]: لو اليوزر هو اللي لغى، بترمي على طول من غير إعادة.`,
          example: R`// مهلة: سطر واحد
await fetch(url, { signal: AbortSignal.timeout(5000) });

// إلغاء يدوي
const ac = new AbortController();
setTimeout(() => ac.abort(new Error('اليوزر ضغط إلغاء')), 300);
await fetch(url, { signal: ac.signal });

// والاتنين سوا
const signal = AbortSignal.any([ac.signal, AbortSignal.timeout(5000)]);
await fetch(url, { signal });

// وفي الأداة: اليوزر لغى؟ متعيدش
try {
  res = await fetchImpl(url, { ...init, signal });
} catch (e) {
  if (outer?.aborted) throw outer.reason;
  lastError = e.name === 'TimeoutError' ? e : new NetworkError(e.cause ?? e);
}`,
          lines: [
            R`[[AbortSignal.timeout]] بتعمل signal بيلغي نفسه بعد ٥ ثواني. لو الطلب مخلصش في المدة دي، [[fetch]] بيترفض بـ error اسمه [[TimeoutError]]، فمفيش طلب يفضل معلّق للأبد.`,
            R`[[AbortController]] هو المتحكّم اللي انت بتلغي بيه بإيدك (زرار «إلغاء» مثلًا). جواه [[signal]] بتبعته للطلب، و [[abort]] اللي بتنادي بيها.`,
            R`بنقلّد يوزر ضغط إلغاء بعد ٣٠٠ms. **القيمة اللي بتمررها لـ [[abort]] هي اللي [[fetch]] بيترفض بيها**؛ من غيرها هيترفض بـ [[AbortError]] عام مالوش سياق.`,
            R`بنمرر [[ac.signal]] للطلب، فأول ما [[ac.abort]] تتنادى الطلب بيتقطع و [[await]] ده يرمي الـ Error اللي بعتناه.`,
            R`[[AbortSignal.any]] بتجمع أكتر من signal في واحد: أول واحد يلغي (اليوزر أو المهلة)، المجمّع بيتلغي، و [[signal.reason]] بيبقى سبب اللي لغى. موجودة من Node 20.`,
            R`بنمرر الـ signal المجمّع، فالطلب بيتقطع لو اليوزر لغى أو لو الخمس ثواني خلصوا، أيهم يحصل الأول.`,
            R`ده جزء من أداة [[request]]: [[try]] حوالين الطلب عشان نقرر بعد الفشل نعيد ولا لأ.`,
            R`الطلب نفسه بـ [[fetchImpl]] (يا [[fetch]] الحقيقي يا واحد مزيّف في الاختبار)، و [[...init]] بيفرد إعدادات اليوزر، و [[signal]] المجمّع بيتحط آخر حاجة عشان يغطّي أي signal تاني.`,
            R`أي فشل (مهلة، إلغاء، شبكة) بييجي هنا، وهنا بنفرّق بينهم.`,
            R`[[outer]] هو الـ signal اللي اليوزر بعته. لو هو اللي اتلغى يبقى اليوزر قال «لأ»، فبنرمي سببه على طول. **الإعادة هنا هدر وإزعاج**: اليوزر مش عايز الطلب ده أصلًا.`,
            R`غير كده نحتفظ بالخطأ عشان المحاولة الجاية: المهلة تفضل [[TimeoutError]] زي ما هي، وأي حاجة تانية تتلف في [[NetworkError]] ومعاها السبب الأصلي ([[e.cause]] لو موجود).`,
            R`نهاية [[catch]].`
          ],
          try: R`شغّل سيرفر بيستنى ٣ ثواني، وجرّب [[AbortSignal.timeout(500)]] عليه واقرا [[e.name]]. وبعدين جرّب [[ac.abort(new Error('كذا'))]] وشوف الرسالة اللي بتوصل.`,
          deep: {
            why: R`الطلب اللي بيعلّق بيخلي الواجهة تبان مكسورة. واليوزر اللي ضغط إلغاء وبرضه بيستنى بيفقد الثقة في البرنامج.`,
            how: R`**[[AbortSignal]] معيار عام**، مش لـ [[fetch]] بس. أي API بتاخد [[{ signal }]] بتبقى قابلة للإلغاء: [[fs.readFile]] في Node، و [[addEventListener]] (الـ listener بيتشال لما الإشارة تلغي)، وكود انت كاتبه.

والـ API بتاعها:

| | بتعمل إيه |
|---|---|
| [[signal.aborted]] | هل اتلغت؟ |
| [[signal.reason]] | **اللي مررته لـ [[abort()]]** |
| [[signal.throwIfAborted()]] | ترمي لو اتلغت |
| [[signal.addEventListener('abort', fn)]] | رد فعل |

**[[AbortSignal.timeout]]** (من Node 17.3 وكل المتصفحات الحديثة) بترمي [[TimeoutError]] — وده [[DOMException]] مش [[Error]] عادي. جرّبت: [[e instanceof DOMException]] بترجّع [[true]].

**و [[AbortSignal.any]]** (من Node 20) بتجمع. ولو اتلغت، [[reason]] بتبقى بتاعة أول واحدة لغت.

**وفي الأداة، الفرق بين الحالتين:**

| الحالة | تعيد؟ | ليه |
|---|---|---|
| [[TimeoutError]] | **أيوه** | الشبكة كانت بطيئة لحظة |
| اليوزر لغى | **لأ** | هو قال لأ |

والفحص [[outer?.aborted]] بيفرّق: الإشارة الخارجية (بتاعة اليوزر) هي اللي بنبص عليها، مش إشارة المهلة اللي الأداة عملتها.

**وتنضيف المؤقتات**: لو عملت [[setTimeout]] للانتظار بين المحاولات، لازم تلغيه لو الإشارة لغت — وإلا الـ Promise بتفضل معلقة. وعشان كده [[sleep]] في الأداة بتاخد [[signal]]:

~~~text
const sleep = (ms, signal) => new Promise((resolve, reject) => {
  const t = setTimeout(resolve, ms);
  signal?.addEventListener('abort', () => { clearTimeout(t); reject(signal.reason); }, { once: true });
});
~~~

و [[{ once: true }]] عشان الـ listener يتشال بعد أول مرة.`,
            when: R`كل طلب شبكة. والمهلة من أول سطر، مش بعدين.`,
            mistakes: R`تنسى المهلة خالص. أو تعيد المحاولة بعد إلغاء اليوزر. أو تنسى [[clearTimeout]] في الـ sleep فتسيب Promise معلقة. أو تفترض إن [[TimeoutError]] نوع فرعي من [[Error]] العادي (هو [[DOMException]]).`
          },
          teach: R`## الطلب اللي مالوش مهلة

~~~js
await fetch(url);   // ممكن يستنى دقيقتين
~~~

~~~js والحل سطر واحد
await fetch(url, { signal: AbortSignal.timeout(5000) });
~~~

~~~text اتشغّل فعلًا على سيرفر بيستنى 3 ثواني · Node 24
رمى بعد 511 ms
name: TimeoutError
message: The operation was aborted due to timeout
instanceof DOMException: true
~~~

> لاحظ: [[TimeoutError]] **[[DOMException]]** مش [[Error]] عادي. فافحصه بـ [[e.name]] مش بـ [[instanceof Error]].

---

## ١. الإلغاء اليدوي

~~~js
const ac = new AbortController();
setTimeout(() => ac.abort(new Error('اليوزر ضغط إلغاء')), 300);
await fetch(url, { signal: ac.signal });
~~~

~~~text اتشغّل فعلًا
وقف بعد 203 ms | Error | اليوزر ضغط إلغاء
~~~

**القيمة اللي بتمررها لـ [[abort()]] هي اللي بتترمي.** من غيرها بترمي [[AbortError]] عام مالوش سياق.

---

## ٢. الاتنين سوا

~~~js
const signal = AbortSignal.any([ac.signal, AbortSignal.timeout(5000)]);
await fetch(url, { signal });
~~~

أول واحدة تلغي، الكل بيتلغي. و [[signal.reason]] بتبقى بتاعة اللي لغت.

---

## ٣. والفرق اللي الأداة محتاجة تعرفه

| الحالة | تعيد المحاولة؟ |
|---|---|
| [[TimeoutError]] | **أيوه** — الشبكة كانت بطيئة لحظة |
| اليوزر لغى | **لأ** — هو قال لأ |

~~~js في الأداة
catch (e) {
  if (outer?.aborted) throw outer.reason;     // اليوزر لغى: اخرج
  lastError = e.name === 'TimeoutError' ? e : new NetworkError(e.cause ?? e);
  ...
}
~~~

~~~text والنتيجة (اتشغّلوا فعلًا)
=== مهلة: بيعيد وبيفشل في الآخر ===
  محاولة 0: TimeoutError
  محاولة 1: TimeoutError
في الآخر: TimeoutError | بعد 1555 ms

=== اليوزر لغى: بيوقف فورًا، من غير إعادة ===
وقف بعد 203 ms | Error | اليوزر ضغط إلغاء
~~~

في الحالة التانية، [[onRetry]] اتسجّل عشان يطبع لو اتنادى — **وماتناداش ولا مرة**.

---

## ٤. [[AbortSignal]] مش لـ fetch بس

| الاستخدام | إزاي |
|---|---|
| [[fs.readFile]] في Node | [[{ signal }]] |
| [[addEventListener]] | [[{ signal }]] — الـ listener بيتشال لوحده |
| كودك انت | [[signal.throwIfAborted()]] |

~~~js listener بيتنضّف لوحده
el.addEventListener('click', fn, { signal: ac.signal });
ac.abort();   // الـ listener اتشال
~~~

ودي حاجة نضيفة جدًا بدل ما تفتكر [[removeEventListener]].

---

## ٥. والفخ: المؤقت اللي بيفضل

~~~js غلط
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
~~~

لو الإشارة لغت وانت في النوم، الـ Promise بتفضل **معلقة** والمؤقت شغال.

~~~js صح
const sleep = (ms, signal) => new Promise((resolve, reject) => {
  const t = setTimeout(resolve, ms);
  signal?.addEventListener('abort', () => { clearTimeout(t); reject(signal.reason); }, { once: true });
});
~~~

و [[{ once: true }]] عشان الـ listener يتشال بعد أول مرة.

---

## ٦. و API الإشارة

| | بتعمل إيه |
|---|---|
| [[signal.aborted]] | اتلغت؟ |
| [[signal.reason]] | **اللي مررته لـ [[abort()]]** |
| [[signal.throwIfAborted()]] | ترمي لو اتلغت |

[[throwIfAborted()]] مفيدة في لوب طويلة: حطها في أول كل دورة.

---

## الخلاصة

- [[AbortSignal.timeout(ms)]] — سطر واحد، وبيمنع التعليق.
- [[ac.abort(new Error('...'))]] — السبب بيوصل.
- [[AbortSignal.any]] للمهلة والإلغاء سوا.
- المهلة تستاهل إعادة، وإلغاء اليوزر لأ.
- [[sleep]] لازم تاخد [[signal]] وتعمل [[clearTimeout]].`,
          sol: R`الحالتين بناتجهم: المهلة بتتعاد، وإلغاء اليوزر بيوقف فورًا من غير ولا إعادة.`,
          solCode: R`// مهلة 300ms على سيرفر بيستنى 3 ثواني، و retries: 2
//   محاولة 0: TimeoutError
//   محاولة 1: TimeoutError
// في الآخر: TimeoutError | بعد 1555 ms

// واليوزر لغى بعد 200ms، و retries: 5
const ac = new AbortController();
setTimeout(() => ac.abort(new Error('اليوزر ضغط إلغاء')), 200);
await request(url, { timeout: 5000, retries: 5, signal: ac.signal,
                     onRetry: () => console.log('أعاد — مش المفروض!') });
// وقف بعد 203 ms | Error | اليوزر ضغط إلغاء
// (و onRetry ماتناداش ولا مرة)

// (اتشغّلوا فعلًا على Node 24.22.1)`
        },

        {
          cmd: "مشروع — إعادة المحاولة الذكية",
          title: "أي أخطاء تتعاد، و backoff فيه عشوائية",
          learn: R`تعيد المحاولة على المؤقت بس، بمهلة أُسّية فيها عشوائية، ومحترمة لـ [[Retry-After]].`,
          out: R`٥٠٣ مؤقتة بتنجح من غير ما حد يحس، و٤٠٤ بتفشل على طول.`,
          use: {
            prog: R`إعادة المحاولة على خطأ دائم هدر: ٤٠٤ هتفضل ٤٠٤. والتفرقة بين المؤقت والدائم هي كل الذكاء في الموضوع.`,
            net: R`من غير عشوائية، كل العملاء بيعيدوا في نفس اللحظة وبيوقّعوا السيرفر اللي لسه بيقوم. الظاهرة دي اسمها thundering herd، وبتحصل فعلًا.`,
            cs: R`الـ exponential backoff with jitter خوارزمية موصوفة في أوراق هندسية، وبتتطبّق في AWS SDK وكل عميل جاد.`,
          },
          desc: R`إعادة المحاولة سهلة تكتبها غلط. وفيه تلات قرارات:

**١. تعيد على إيه؟**

| الحالة | تعيد؟ |
|---|---|
| ٤٠٠، ٤٠١، ٤٠٣، ٤٠٤ | **لأ** — هتفضل زي ما هي |
| ٤٠٨، ٤٢٥، ٤٢٩ | أيوه — مؤقتة |
| ٥٠٠، ٥٠٢، ٥٠٣، ٥٠٤ | أيوه |
| فشل شبكة | أيوه |
| مهلة | أيوه |
| إلغاء اليوزر | **لأ** |

**٢. تستنى قد إيه؟**

مش مدة ثابتة. الأُسّي: [[300ms]] ثم [[600]] ثم [[1200]] — بيدي السيرفر وقت يقوم.

**وفيه عشوائية (jitter) إجبارية.** لو ألف عميل فشلوا في نفس اللحظة وكلهم استنوا ٣٠٠ms بالظبط، هيرجعوا كلهم في نفس اللحظة. ودي بتوقّع السيرفر تاني.

الحل: المدة بين نصف القيمة وكاملها:

[[Math.round(exp / 2 + Math.random() * (exp / 2))]]

**٣. تحترم السيرفر؟**

لما السيرفر يرد [[429]] مع [[Retry-After: 1]]، هو بيقولك «استنى ثانية». واحترامها أحسن من حسابك — جرّبتها والأداة استنت ١٠٠٠ms بالظبط.

و [[Retry-After]] ليها شكلين: عدد ثواني، أو تاريخ HTTP. والكود بيتعامل مع الاتنين.`,
          example: R`const RETRY_STATUS = new Set([408, 425, 429, 500, 502, 503, 504]);

export function backoff(attempt, { base = 300, cap = 10_000, retryAfter = null } = {}) {
  if (retryAfter != null) return Math.min(retryAfter * 1000, cap);
  const exp = Math.min(base * 2 ** attempt, cap);
  return Math.round(exp / 2 + Math.random() * (exp / 2));
}

function parseRetryAfter(res) {
  const raw = res.headers.get('retry-after');
  if (!raw) return null;
  const n = Number(raw);
  if (Number.isFinite(n)) return n;
  const when = Date.parse(raw);
  return Number.isNaN(when) ? null : Math.max(0, (when - Date.now()) / 1000);
}`,
          lines: [
            R`الـ status codes اللي فشلها غالبًا مؤقت وتستاهل إعادة: 408 و 429 (استنى شوية) و 5xx (السيرفر واقع لحظة). 404 و 400 مش فيها، لأن الإعادة مش هتغيّر النتيجة. و [[Set]] عشان [[.has()]] تبقى سريعة وواضحة.`,
            R`[[backoff]] بتحسب المدة اللي نستناها قبل المحاولة رقم [[attempt]]. الخيارات بقيم افتراضية: [[base]] أول مدة، و [[cap]] أقصى مدة (١٠ ثواني)، و [[retryAfter]] لو السيرفر قال يستنى قد إيه.`,
            R`**السيرفر قال؟ اسمع.** لو الرد كان فيه [[Retry-After]] بنستنى المدة دي بالظبط (بنحوّل الثواني لـ ms)، وبرضه مش أكتر من [[cap]] عشان سيرفر يقول «ساعة» ميعلّقش البرنامج. و [[!= null]] بتمسك [[null]] و [[undefined]] الاتنين.`,
            R`exponential backoff: المدة بتتضاعف كل محاولة: [[300]] ثم [[600]] ثم [[1200]]… و [[Math.min]] بتوقفها عند [[cap]]. الفكرة إن السيرفر لو تعبان نديله وقت أطول كل مرة بدل ما نضربه.`,
            R`**الـ jitter (العشوائية)**: المدة النهائية رقم عشوائي بين نص القيمة وكاملها. من غيرها، ألف عميل فشلوا مع بعض هيرجعوا كلهم في نفس الملي ثانية ويوقّعوا السيرفر تاني.`,
            R`نهاية [[backoff]].`,
            R`[[parseRetryAfter]] بتقرا هيدر [[Retry-After]] من الرد وترجّع عدد الثواني، أو [[null]] لو مفيش. الهيدر ده بييجي غالبًا مع 429 و 503.`,
            R`[[headers.get]] بترجّع قيمة الهيدر كنص، أو [[null]] لو مش موجود. واسم الهيدر مش بيفرق فيه الحروف الكبيرة والصغيرة.`,
            R`لو الهيدر مش موجود (أو فاضي) بنرجّع [[null]] على طول، و [[backoff]] هتستخدم الحساب العادي.`,
            R`الهيدر ليه شكلين: عدد ثواني زي «120»، أو تاريخ. بنجرّب الأول نحوّله رقم. لو مش رقم [[Number]] هترجّع [[NaN]].`,
            R`[[Number.isFinite]] بترجّع [[true]] للأرقام العادية بس (مش [[NaN]] ولا [[Infinity]])، فلو نجح يبقى الهيدر كان عدد ثواني ونرجّعه زي ما هو.`,
            R`مش رقم؟ يبقى غالبًا تاريخ HTTP زي «Wed, 21 Oct 2015 07:28:00 GMT»، و [[Date.parse]] بتحوّله لـ ms من ١٩٧٠، أو [[NaN]] لو النص بايظ.`,
            R`لو التاريخ بايظ نرجّع [[null]]، غير كده نحسب الفرق بينه وبين دلوقتي بالثواني. و [[Math.max]] مع صفر عشان لو التاريخ فات نرجّع صفر مش رقم سالب.`,
            R`نهاية [[parseRetryAfter]].`
          ],
          try: R`شغّل سيرفر بيرجّع ٥٠٣ أول مرتين وبعدين ٢٠٠، وشوف الأداة بتنجح بعد كام محاولة وبكام ms. وبعدين سيرفر بيرجّع ٤٢٩ مع [[Retry-After: 1]] وقارن المدة.`,
          deep: {
            why: R`إعادة المحاولة من غير عشوائية بتحوّل عطل بسيط لعطل كبير. والإعادة على ٤٠٤ بتضيّع وقت المستخدم على حاجة مش هتتغيّر.`,
            how: R`**ليه [[2 ** attempt]]؟** لأن السيرفر اللي بيقوم محتاج وقت متزايد. ولو كل العملاء بيعيدوا بنفس المعدل الثابت، الضغط بيفضل ثابت.

**والعشوائية** ليها أشكال:

| الشكل | الحساب |
|---|---|
| Full jitter | [[random() * exp]] |
| **Equal jitter** | [[exp/2 + random() * exp/2]] |
| Decorrelated | بيعتمد على القيمة اللي قبلها |

إحنا استخدمنا الوسطانية: مش أقل من النص، ومش أكتر من الكامل. فيه ضمان حد أدنى وفيه تشتيت.

**[[cap]]** مهمة: من غيرها، بعد ١٠ محاولات المهلة بتبقى [[300 * 1024]] = ٥ دقايق.

**و [[Retry-After]]** معرّفة في RFC 9110. وبتيجي مع ٤٢٩ و٥٠٣ عادة. وشكلين:

~~~text
Retry-After: 120              عدد ثواني
Retry-After: Wed, 21 Oct 2026 07:28:00 GMT    تاريخ
~~~

و [[Number('120')]] بترجّع [[120]]، و [[Number('Wed, 21...')]] بترجّع [[NaN]] — فالفحص بـ [[Number.isFinite]] بيفرّق.

**وحاجة مهمة في الأمان**: متعيدش على طلبات **مش idempotent** من غير ما تفكر. [[GET]] آمن، و [[POST]] اللي بيعمل دفعة ممكن يتعمل مرتين. والحل المعياري هو [[Idempotency-Key]] — رقم فريد بتبعته مع الطلب، والسيرفر بيتجاهل التكرار.

والأداة بتاعتنا بتعيد على أي طريقة. ولو هتستخدمها مع [[POST]]، ضيف الهيدر ده أو اقفل الإعادة.

**وعن [[onRetry]]**: الأداة بتاخد callback بدل ما تطبع. وده بيخلي اللي بيستخدمها يقرر — لوج، أو مقياس، أو سكوت.`,
            when: R`أي طلب على شبكة مش بتاعتك. والـ jitter دايمًا.`,
            mistakes: R`تعيد على ٤٠٤. أو مهلة ثابتة من غير عشوائية. أو تنسى الحد الأقصى. أو تعيد على [[POST]] من غير [[Idempotency-Key]]. أو تتجاهل [[Retry-After]] وتحسب بنفسك.`
          },
          teach: R`## تلات قرارات

---

## ١. تعيد على إيه؟

~~~js
const RETRY_STATUS = new Set([408, 425, 429, 500, 502, 503, 504]);
~~~

| الحالة | تعيد؟ | ليه |
|---|---|---|
| ٤٠٠، ٤٠١، ٤٠٣، ٤٠٤ | **لأ** | هتفضل زي ما هي |
| ٤٢٩ | أيوه | تجاوزت الحد — استنى |
| ٥٠٠، ٥٠٢، ٥٠٣، ٥٠٤ | أيوه | مشكلة مؤقتة في السيرفر |
| شبكة / مهلة | أيوه | ممكن تعدّي |
| إلغاء اليوزر | **لأ** | هو قال لأ |

---

## ٢. تستنى قد إيه؟

~~~js
const exp = Math.min(base * 2 ** attempt, cap);
return Math.round(exp / 2 + Math.random() * (exp / 2));
~~~

~~~text مع base=300
المحاولة 0:  300 -> بين 150 و 300
المحاولة 1:  600 -> بين 300 و 600
المحاولة 2: 1200 -> بين 600 و 1200
~~~

### والعشوائية مش رفاهية

لو ألف عميل فشلوا في نفس اللحظة وكلهم استنوا **٣٠٠ms بالظبط**، هيرجعوا كلهم في نفس اللحظة — ويوقّعوا السيرفر اللي لسه بيقوم.

الظاهرة دي اسمها **thundering herd**، وبتحصل فعلًا.

| الشكل | الحساب |
|---|---|
| Full jitter | [[random() * exp]] |
| **Equal jitter** (اللي استخدمناه) | [[exp/2 + random() * exp/2]] |

الوسطانية فيها حد أدنى مضمون وفيها تشتيت.

> و [[cap]] مهمة: من غيرها، بعد ١٠ محاولات المهلة بتبقى **٥ دقايق**.

---

## ٣. والسيرفر لو قال، اسمع

~~~text
Retry-After: 120                               عدد ثواني
Retry-After: Wed, 21 Oct 2026 07:28:00 GMT     تاريخ
~~~

~~~js الشكلين سوا
const n = Number(raw);
if (Number.isFinite(n)) return n;              // ثواني
const when = Date.parse(raw);
return Number.isNaN(when) ? null : Math.max(0, (when - Date.now()) / 1000);
~~~

[[Number('120')]] بترجّع [[120]]، و [[Number('Wed, 21...')]] بترجّع [[NaN]] — فالفحص بيفرّق.

---

## ٤. والنتيجة الحقيقية

~~~text ٥٠٣ مؤقتة (السيرفر بيرجّع 503 أول مرتين) — اتشغّل فعلًا
  محاولة 0: 503، هستنى 159ms
  محاولة 1: 503، هستنى 485ms
النتيجة: { ok: true, 'بعد': '3 محاولات' } | الوقت الكلي: 670 ms
~~~

**١٥٩ و٤٨٥** — مش ٣٠٠ و٦٠٠. دي العشوائية شغالة.

~~~text ٤٢٩ مع Retry-After: 1 — اتشغّل فعلًا
  429: Retry-After قال استنى 1000ms
وفي الآخر: HttpError 429
~~~

**١٠٠٠ms بالظبط** — الأداة احترمت السيرفر بدل ما تحسب.

~~~text و٤٠٤ — اتشغّل فعلًا
instanceof HttpError: true
name: HttpError | status: 404
~~~

ولا إعادة واحدة.

---

## ٥. وتحذير: [[POST]] مش زي [[GET]]

[[GET]] آمن تعيده. و [[POST]] اللي بيعمل دفعة ممكن **يتنفّذ مرتين** لو الرد ضاع في الطريق.

~~~text الحل المعياري
Idempotency-Key: 7f3a9c12-...
~~~

رقم فريد بتبعته مع الطلب، والسيرفر بيتجاهل التكرار بنفس المفتاح. وAPIs الدفع كلها بتدعمه.

**الأداة بتاعتنا بتعيد على أي طريقة.** فلو هتستخدمها مع [[POST]]، ضيف الهيدر ده أو حط [[retries: 0]].

---

## ٦. و [[onRetry]] بدل الطباعة

~~~js
await json(url, {
  onRetry: ({ attempt, status, wait }) => log.warn({ attempt, status, wait }, 'بعيد'),
});
~~~

الأداة بتاخد callback بدل ما تطبع. فاللي بيستخدمها يقرر: لوج، أو مقياس، أو سكوت.

---

## الخلاصة

- أعد على المؤقت بس: 408/425/429/5xx وشبكة ومهلة.
- أُسّي **مع عشوائية** — من غيرها بتوقّع السيرفر.
- [[cap]] عشان المهلة متوصلش لدقايق.
- [[Retry-After]] بتكسب على حسابك.
- [[POST]] محتاج [[Idempotency-Key]].`,
          sol: R`التلات حالات بناتجهم: المؤقتة بتنجح بمهلة عشوائية، و [[Retry-After]] بتتحترم، والدائمة بتفشل على طول.`,
          solCode: R`// 503 مؤقتة، والسيرفر بينجح في التالتة:
//   محاولة 0: 503، هستنى 159ms
//   محاولة 1: 503، هستنى 485ms
// النتيجة: { ok: true, 'بعد': '3 محاولات' } | الوقت الكلي: 670 ms
//   (159 و485 — مش 300 و600. دي العشوائية)

// 429 مع Retry-After: 1
//   429: Retry-After قال استنى 1000ms
//   (1000ms بالظبط — احترم السيرفر بدل ما يحسب)

// 404
// instanceof HttpError: true
// name: HttpError | status: 404
//   (ولا إعادة واحدة)

// (اتشغّلوا فعلًا على Node 24.22.1)`
        },

        {
          cmd: "مشروع — اختبرها من غير شبكة",
          title: "fetch مزيّف، و node --test المدمج",
          learn: R`تحقن [[fetch]] بديل فتختبر كل المسارات من غير إنترنت.`,
          out: R`٧ اختبارات بتعدّي في ثانية ونص، من غير أي سيرفر.`,
          use: {
            prog: R`حقن الاعتمادية ([[fetchImpl = fetch]]) سطر واحد بيحوّل كود مستحيل يتختبر لكود بيتختبر في ملي ثانية.`,
            work: R`الاختبار اللي محتاج شبكة بيفشل في الطيارة وفي CI وفي أي يوم الخدمة فيه بطيئة. واللي مش محتاجها بيعدّي دايمًا.`,
            cs: R`الـ test double: بتبدّل التبعية بحاجة بتتحكم فيها. ومنها بتختبر الحالات اللي صعب توصلها في الواقع (٥٠٣ ثلاث مرات ورا بعض).`,
          },
          desc: R`الأداة بتعمل طلبات شبكة. فإزاي تختبرها من غير شبكة؟

**الحل سطر واحد في التوقيع:**

[[export async function request(url, { fetchImpl = fetch, ...init } = {})]]

الافتراضي هو [[fetch]] الحقيقي. وفي الاختبار بتمرر واحد بتاعك.

والمزيّف بسيط: بياخد قايمة ردود وبيرجّعها بالترتيب، وبيسجّل النداءات:

~~~text
function fakeFetch(responses) {
  const calls = [];
  const impl = async (url, init) => {
    calls.push({ url, init });
    const next = responses[Math.min(calls.length - 1, responses.length - 1)];
    if (next instanceof Error) throw next;
    return next;
  };
  impl.calls = calls;
  return impl;
}
~~~

و [[Response]] موجود في Node من نسخة ١٨، فتقدر تعمل رد حقيقي: [[new Response('{"ok":true}', { status: 200 })]].

**والـ [[calls]] هي اللي بتثبت السلوك**: اختبار «٤٠٤ مبتتعادش» بيتأكد إن [[calls.length === 1]]، مش بس إن الخطأ اتر مى.

**والاختبارات نفسها بـ [[node --test]]** — مدمج من Node 18، مفيش تسطيب. و [[assert.rejects]] بتاخد دالة فحص بترجّع [[true]] لو الخطأ هو المتوقّع.`,
          example: R`import { test } from 'node:test';
import assert from 'node:assert/strict';
import { request, HttpError, NetworkError, backoff } from './request.js';

function fakeFetch(responses) {
  const calls = [];
  const impl = async (url, init) => {
    calls.push({ url, init });
    const next = responses[Math.min(calls.length - 1, responses.length - 1)];
    if (next instanceof Error) throw next;
    return next;
  };
  impl.calls = calls;
  return impl;
}

const res = (status, body = '') => new Response(body, { status });

test('بترمي HttpError على 404 ومبتعيدش', async () => {
  const f = fakeFetch([res(404, '{"e":1}')]);
  await assert.rejects(
    () => request('https://x.test/', { fetchImpl: f, retries: 3 }),
    (e) => e instanceof HttpError && e.status === 404,
  );
  assert.equal(f.calls.length, 1, '404 مش المفروض يتعاد');
});

test('بتعيد على 503 وبتنجح', async () => {
  const f = fakeFetch([res(503), res(503), res(200, '{"ok":true}')]);
  const r = await request('https://x.test/', { fetchImpl: f, retries: 3 });
  assert.equal(r.status, 200);
  assert.equal(f.calls.length, 3);
});`,
          lines: [
            R`[[test]] من مشغّل الاختبارات المدمج في Node، مش محتاج تسطّب Jest ولا Vitest. بتشغّل الملف بـ [[node --test]].`,
            R`[[node:assert/strict]] نسخة الـ assert الصارمة: [[assert.equal]] فيها بتقارن بـ [[===]] (النوع والقيمة)، فـ [[1]] و [["1"]] مش هيبقوا متساويين.`,
            R`بنستورد [[request]] اللي هنختبرها، وكلاسات الأخطاء عشان نتأكد إن الـ error اللي اترمى من النوع الصح، و [[backoff]] لاختبار المدد في اختبار تاني في نفس الملف (المثال ده مبيستخدمهاش).`,
            R`[[fakeFetch]] بتعمل [[fetch]] مزيّف: بتاخد array ردود جاهزة يرجّعها بالترتيب، فنختبر 404 و 503 وفشل الشبكة من غير سيرفر ولا نت.`,
            R`array بنسجّل فيها كل نداء حصل، عشان الاختبار يعرف بعدين [[request]] نادت كام مرة وبإيه.`,
            R`[[impl]] هي الدالة اللي هتتبعت مكان [[fetch]]، بنفس شكله: بتاخد [[url]] و [[init]] وبترجّع Promise لأنها [[async]].`,
            R`كل نداء بنسجّل الرابط والإعدادات. **التسجيل هو نص فايدة المزيّف**: كده تقدر تتأكد إن الإعادة حصلت (أو محصلتش) بعدد النداءات.`,
            R`بنختار الرد اللي عليه الدور حسب عدد النداءات. و [[Math.min]] بتخلي آخر رد يتكرر لو [[request]] نادت أكتر من الردود اللي جهزناها، بدل ما ترجّع [[undefined]].`,
            R`لو العنصر ده [[Error]] بنرميه، وكده بنقلّد فشل الشبكة بالظبط زي [[fetch]] الحقيقي لما الاتصال يقع.`,
            R`غير كده بنرجّع الـ [[Response]] اللي جهزناه، و [[request]] هتتعامل معاه كأنه رد حقيقي من السيرفر.`,
            R`نهاية [[impl]].`,
            R`الدوال في JS objects، فبنعلّق [[calls]] عليها كخاصية. كده الاختبار يقرا [[f.calls.length]] من نفس المتغير اللي بعته لـ [[request]].`,
            R`بنرجّع الدالة المزيّفة (ومعاها [[calls]])، وهي اللي هتتبعت لـ [[request]] في [[fetchImpl]].`,
            R`نهاية [[fakeFetch]].`,
            R`[[res]] اختصار يعمل [[Response]] حقيقي بأي status و body. [[Response]] موجود في Node من ١٨، فـ [[ok]] و [[json()]] بيشتغلوا زي الحقيقي بالظبط.`,
            R`أول اختبار: 404 لازم يترمي كـ [[HttpError]] ومن غير إعادة، لأن الصفحة مش موجودة والإعادة مش هتغيّر ده. الدالة [[async]] عشان جواها [[await]].`,
            R`مزيّف بيرجّع رد واحد: 404 ومعاه body فيه JSON، زي سيرفر حقيقي بيقول «مش لاقي».`,
            R`[[assert.rejects]] بتتأكد إن الـ Promise اترفضت فعلًا؛ لو نجحت الاختبار يفشل بـ «Missing expected rejection». ولازم [[await]] قبلها، وإلا الاختبار يخلص قبل ما الفحص يحصل.`,
            R`بنبعت دالة بتنادي [[request]] بالمزيّف ومسموحلها ٣ إعادات. لو اتعادت على 404 هنعرف من عدد النداءات تحت.`,
            R`**دالة الفحص**: بتستلم الـ error ولازم ترجّع [[true]] لو هو المتوقّع (من نوع [[HttpError]] و status بـ 404). لو رجّعت [[false]] الاختبار بيفشل.`,
            R`نهاية [[assert.rejects]].`,
            R`**وده السطر المهم**: المزيّف اتنادى مرة واحدة بس، يعني [[request]] معادتش رغم إن [[retries]] بـ ٣. الرسالة التالتة بتظهر لو الاختبار فشل.`,
            R`نهاية أول اختبار.`,
            R`تاني اختبار: 503 (السيرفر واقع لحظة) لازم يتعاد لحد ما ينجح.`,
            R`المزيّف بيرجّع 503 مرتين وبعدين 200 ومعاه JSON، فالطلب هينجح بس في المحاولة التالتة.`,
            R`بننادي [[request]] بنفس الإعدادات. المرة دي متوقعين إنها تنجح، فبنستنى النتيجة على طول من غير [[assert.rejects]].`,
            R`الرد اللي رجع في الآخر هو الـ 200، يعني [[request]] مستسلمتش بعد أول 503.`,
            R`والمزيّف اتنادى ٣ مرات بالظبط: مرتين فشل ومرة نجاح. لو [[request]] مبتعيدش كان الرقم هيبقى 1 والاختبار يفشل.`,
            R`نهاية تاني اختبار.`
          ],
          try: R`اكتب الاختبارات وشغّل [[node --test]]. وبعدين غيّر [[retries: 3]] لـ [[retries: 0]] في اختبار الـ ٥٠٣ وشوف الفشل شكله إيه.`,
          deep: {
            why: R`الاختبار اللي محتاج شبكة بيفشل في الطيارة، وفي CI من غير إنترنت، وفي أي يوم الخدمة بطيئة. واللي مش محتاجها بيعدّي دايمًا وفي ملي ثانية.`,
            how: R`**حقن الاعتمادية** هنا في أبسط صورة: parameter بقيمة افتراضية. مفيش framework ومفيش container.

~~~text
{ fetchImpl = fetch }
~~~

الإنتاج بياخد الافتراضي، والاختبار بيمرر بديل.

**البديل التاني** هو [[mock]] المدمج في Node: [[import { mock } from 'node:test']] و [[mock.method(globalThis, 'fetch', fn)]]. وده بيبدّل الـ global — أقوى، وأخطر: لو نسيت [[mock.restoreAll()]] الاختبارات اللي بعده بتتأثر.

والحقن أوضح: اللي بيقرا التوقيع بيعرف إن الدالة دي بتاخد [[fetch]] من بره.

**[[node --test]]** من Node 18 (ومستقر من 20). بيلاقي ملفات [[*.test.js]] و [[*.test.mjs]] و [[test/]] تلقائيًا. و [[--test-concurrency]] بتتحكم في التوازي، و [[--test-only]] بتشغّل اللي عليهم [[only: true]].

**[[assert.rejects]]** بتاخد:

| الشكل | المعنى |
|---|---|
| كلاس | الخطأ من النوع ده |
| كائن | الصفات دي بتتطابق |
| **دالة** | ترجّع [[true]] لو الخطأ صح |

والدالة أمرن: [[(e) => e instanceof HttpError && e.status === 404]].

**و [[assert/strict]]**: [[assert.equal]] فيها بتستخدم [[===]]. من غير [[/strict]] بتستخدم [[==]] — و [[assert.equal(1, '1')]] بتعدّي. استخدم [[/strict]] دايمًا.

**ولاحظ إن الاختبارات اللي فيها إعادة بتاخد وقت حقيقي** (٦٧٦ms و٧٤٥ms في النتيجة) — لأن الـ [[sleep]] بتستنى فعلًا. ولو ده أزعجك، مرّر [[base]] صغيرة، أو استخدم [[mock.timers]] في Node 20+ اللي بتتحكم في الوقت.`,
            when: R`أي كود بيتكلم مع الشبكة أو الملفات أو الوقت. والحقن من أول يوم.`,
            mistakes: R`تختبر بشبكة حقيقية. أو تبدّل [[globalThis.fetch]] وتنسى ترجّعه. أو تستخدم [[assert]] من غير [[/strict]]. أو تختبر إن الخطأ اتر مى من غير ما تتأكد إن مفيش إعادة حصلت.`
          },
          teach: R`## السطر اللي بيخلي الاختبار ممكن

~~~js
export async function request(url, { fetchImpl = fetch, ...init } = {}) {
  ...
  res = await fetchImpl(url, { ...init, signal });
}
~~~

الإنتاج بياخد [[fetch]] الحقيقي. والاختبار بيمرر بديل. **سطر واحد.**

---

## ١. المزيّف

~~~js
function fakeFetch(responses) {
  const calls = [];
  const impl = async (url, init) => {
    calls.push({ url, init });
    const next = responses[Math.min(calls.length - 1, responses.length - 1)];
    if (next instanceof Error) throw next;
    return next;
  };
  impl.calls = calls;
  return impl;
}

const res = (status, body = '') => new Response(body, { status });
~~~

حاجتين بيعملهم:

- **بيرجّع ردود محضّرة** بالترتيب (وآخر واحد بيتكرر لو خلصت القايمة).
- **وبيسجّل كل نداء** في [[calls]].

> [[Response]] موجود في Node من نسخة ١٨. فالرد **حقيقي** — بـ [[.status]] و [[.ok]] و [[.json()]] — مش كائن مزيّف ناقص.

---

## ٢. والتسجيل هو نص الفايدة

~~~js
test('بترمي HttpError على 404 ومبتعيدش', async () => {
  const f = fakeFetch([res(404, '{"e":1}')]);
  await assert.rejects(
    () => request('https://x.test/', { fetchImpl: f, retries: 3 }),
    (e) => e instanceof HttpError && e.status === 404,
  );
  assert.equal(f.calls.length, 1, '404 مش المفروض يتعاد');
});
~~~

**السطر الأخير هو الاختبار الحقيقي.** إن الخطأ اتر مى حاجة، وإن الأداة **ماحاولتش تاني** حاجة تانية خالص. ومن غير التسجيل مكنتش هتقدر تتأكد.

---

## ٣. وحالات صعب توصلها في الواقع

~~~js ٥٠٣ مرتين ورا بعض وبعدين ٢٠٠
const f = fakeFetch([res(503), res(503), res(200, '{"ok":true}')]);
~~~

دي حالة بتاخد وقت وحظ عشان تحصل مع سيرفر حقيقي. ومع المزيّف، سطر.

---

## ٤. الناتج

~~~bash
node --test
~~~

~~~text اتشغّل فعلًا · Node 24
✔ بترجّع الرد لو 200 (22.481ms)
✔ بترمي HttpError على 404 ومبتعيدش (1.3344ms)
✔ بتعيد على 503 وبتنجح (676.0149ms)
✔ بتوقف بعد عدد المحاولات (745.673ms)
✔ خطأ الشبكة بيتلف في NetworkError (0.5291ms)
✔ backoff بيزيد وبيقف عند الحد (0.1391ms)
✔ Retry-After بتكسب على الحساب (0.0937ms)
ℹ tests 7
ℹ pass 7
ℹ fail 0
ℹ duration_ms 1521.7442
~~~

**مفيش سيرفر، ومفيش إنترنت.**

> ولاحظ إن اختبارات الإعادة أخدت ٦٧٦ و٧٤٥ms — لأن الـ [[sleep]] بتستنى فعلًا. ولو ده أزعجك، [[mock.timers]] في Node 20+ بتتحكم في الوقت.

---

## ٥. [[assert.rejects]] بتاخد دالة

| الشكل | المعنى |
|---|---|
| كلاس | الخطأ من النوع ده |
| كائن | الصفات بتتطابق |
| **دالة** | ترجّع [[true]] لو الخطأ صح |

~~~js الأمرن
(e) => e instanceof HttpError && e.status === 404
~~~

> و [[assert/strict]] بتخلي [[assert.equal]] تستخدم [[===]]. من غيرها [[assert.equal(1, '1')]] **بتعدّي**. استخدم [[/strict]] دايمًا.

---

## ٦. والبديل: [[mock]] المدمج

~~~js
import { mock } from 'node:test';
mock.method(globalThis, 'fetch', fakeImpl);
// ... وفي الآخر
mock.restoreAll();
~~~

أقوى — بيشتغل حتى لو الكود مش بياخد [[fetchImpl]]. وأخطر: لو نسيت [[restoreAll]]، الاختبارات اللي بعده بتتأثر.

**والحقن أوضح**: اللي بيقرا التوقيع بيعرف إن الدالة بتاخد [[fetch]] من بره.

---

## ٧. واختبر الحساب لوحده

~~~js
test('backoff بيزيد وبيقف عند الحد', () => {
  const a = backoff(0, { base: 100, cap: 1000 });
  const b = backoff(5, { base: 100, cap: 1000 });
  assert.ok(a >= 50 && a <= 100);
  assert.ok(b >= 500 && b <= 1000);
});
~~~

[[backoff]] دالة نقية — مفيش فيها شبكة ولا وقت. فبتتختبر في **٠.١ms**.

وده اللي بيخلي تصديرها قرار كويس: الحساب يتختبر لوحده.

---

## الخلاصة

- [[fetchImpl = fetch]] — سطر واحد بيخلي الاختبار ممكن.
- [[Response]] حقيقي في Node 18+.
- سجّل النداءات: «مبتعيدش» بتتثبت بالعدد.
- [[node --test]] مدمج، و [[assert/strict]] دايمًا.
- الدوال النقية ([[backoff]]) بتتختبر في جزء من الملي ثانية.`,
          sol: R`الاختبارات السبعة بناتجها — من غير شبكة ومن غير سيرفر.`,
          solCode: R`node --test

# الناتج (اتشغّل فعلًا على Node 24.22.1):
# ✔ بترجّع الرد لو 200 (22.481ms)
# ✔ بترمي HttpError على 404 ومبتعيدش (1.3344ms)
# ✔ بتعيد على 503 وبتنجح (676.0149ms)
# ✔ بتوقف بعد عدد المحاولات (745.673ms)
# ✔ خطأ الشبكة بيتلف في NetworkError (0.5291ms)
# ✔ backoff بيزيد وبيقف عند الحد (0.1391ms)
# ✔ Retry-After بتكسب على الحساب (0.0937ms)
# ℹ tests 7
# ℹ pass 7
# ℹ fail 0
#
# والسطر اللي بيثبت إن 404 مبتتعادش:
#   assert.equal(f.calls.length, 1, '404 مش المفروض يتعاد');`
        }
      ]
    }
]);
