// تكملة تاب web: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/web/01.js (شرح حقول الدرس في أوله)
MORE("web", [
    {
      t: "ابعت طلبات بنفسك",
      l: 3,
      n: "",
      projects: [
        { lvl: 'صغير', t: R`مجموعة طلبات API بـ curl`, what: R`ملف [[api.http.sh]] فيه دوال bash لكل endpoint في مشروعك ([[login]] و [[me]] و [[orders]]) بتقرا التوكن من متغير بيئة، وكل واحدة بتطبع الـ status والوقت. من دروس «curl -i / -v» و «Copy as cURL».`, done: R`[[source api.http.sh && me]] بيطبع اليوزر، ومفيش توكن مكتوب في الملف، وكل دالة بتطبع [[HTTP 401]] واضحة لو التوكن مش موجود.` },
        { lvl: 'صغير', t: R`[[fetch]] بـ timeout و retry في Console`, what: R`Snippet فيه دالة [[api(path, opts)]] بـ [[AbortSignal.timeout]] و retry على [[5xx]] بـ backoff، تستخدمها من Console على موقعك. من درس «fetch من Console».`, done: R`على endpoint بطيء بيطبع [[TimeoutError: signal timed out]]، وعلى [[503]] مرتين وبعدين [[200]] بيرجّع البيانات، و Network فيه ٣ طلبات.` },
        { lvl: 'متوسط', t: R`محوّل Copy as cURL لسكربت`, what: R`أداة بتاخد أمر Copy as cURL، وتشيل الـ headers اللي مالهاش لازمة، وتستبدل الكوكي والتوكن بمتغيرات بيئة، وتطلّع نسخة bash و PowerShell و [[fetch]]. من درس «Copy as cURL».`, done: R`على أمر حقيقي النسخ التلاتة بيرجّعوا نفس الرد، ومفيش قيمة كوكي في الناتج، والـ headers قلّت للي لازم بس.` },
        { lvl: 'متوسط', t: R`smoke test بعد النشر`, what: R`سكربت بيطلب ١٠ endpoints و صفحات بعد كل نشر، ويتأكد من الـ status والـ content-type ووقت أقل من حد، ويطبع جدول، ويخرج [[1]] لو أي حاجة وقعت. من دروس الوحدة و «التعديل وصل؟ curl و grep».`, done: R`على السيرفر السليم كله أخضر و exit [[0]]، ولما وقفت الـ API بيطلّع [[502]] للـ endpoints دي و exit [[1]]، وشغال في bash و PowerShell.` },
        { lvl: 'كبير', t: R`عميل API صغير بتاعك (زي Postman مصغّر)`, what: R`CLI بيقرا ملف YAML أو JSON فيه طلبات (method و URL و headers و body) ومتغيرات لكل بيئة (dev و staging)، ويشغّل طلب أو كله، ويحفظ قيم من الرد (توكن الـ login) للطلبات اللي بعده، ويطبع الرد ملوّن، وبيعمل assertions بسيطة ([[status == 200]]).`, done: R`سلسلة login ثم me ثم create order بتشتغل بأمر واحد والتوكن بيتنقل لوحده، و assertion واقع بيوقّف ويطبع الفرق، والأسرار من متغيرات بيئة مش من الملف.`, ext: R`زوّد import لـ HAR أو Copy as cURL، وتقرير JUnit عشان يشتغل في CI.` },
        { lvl: 'فكرة', t: R`أداة «اعمل الطلب ده تاني» لفريق الدعم`, what: R`أداة بتاخد طلب فاشل من يوزر (HAR أو cURL منسوخ)، وتشيل البيانات الحساسة، وتعيده على staging، وتقارن الرد. انت بتختار الواجهة.`, done: R`طلب حقيقي فاشل اتعاد واتشاف نفس الخطأ، ومفيش توكن يوزر اتخزّن ولا اتطبع، وفيه README للدعم الفني.`, ext: R`زوّد زرار «افتح issue» بيحط الطلب المتنضّف والرد في issue جاهز.` },
      ],
      items: [
        {
          cmd: "fetch من Console",
          title: "أسرع طريقة تجرب API",
          desc: "الطلب بيتبعت كأنه من الصفحة نفسها، يعني بالكوكيز بتاعتك. لو انت عامل login على موقعك، تقدر تكلّم الـ API بتاعه كيوزر مسجّل من غير ما تجيب توكن. لو بتكلّم دومين تاني، قواعد CORS هتطبق. Shift+Enter بتنزل سطر جديد في Console من غير ما تنفّذ.",
          example: R`await fetch("/api/me").then(r => r.json())

await fetch("/api/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "test", email: "test@example.com" })
}).then(r => r.json())`,
          try: "اعمل GET و POST للـ API بتاعك من Console وشوفهم ظاهرين في Network.",
          flag: "console",
          deep: {
            why: "عايز تجرّب API endpoint بسرعة من غير Postman. والطلب بييجي من الـ browser session، فالـ cookies والـ auth موجودين.",
            how: R`أي JavaScript بتكتبه في Console بيتنفّذ في context الصفحة الحالية. لو انت logged in، الطلب بيتبعت بكوكياتك أوتوماتيك.

[[await fetch(...)]] بيشتغل في Console. بعد [[.then(r => r.json())]] بيفتح الناتج كـ object تقدر تعدّيه.

الطلب بيظهر في تاب Network عادي، فتقدر تشوف كل تفاصيله.

Shift+Enter بينزّلك سطر جديد من غير تنفيذ، عشان تكتب كود متعدد الأسطر.`,
            when: "تجرّب endpoint جديد. تبعث بيانات معينة وتشوف الرد. تتأكد إن الـ auth شغال.",
            mistakes: "تستخدمه لطلبات مهمة وتنسى إنهم بيتنفّذوا فعلًا. DELETE في Console بيمسح فعلًا."
          },
          teach: R`## الأول: الطلب بيطلع من الصفحة نفسها

لما تكتب [[fetch]] في Console، الطلب بيتبعت كأن الصفحة هي اللي عملته: نفس الـ origin، ونفس الكوكيز. فلو انت logged in، الـ API هيعاملك كيوزر مسجّل. المثالين اتشغّلوا في Console في Chrome على صفحة على [[http://127.0.0.1:8791]] و API محلي بـ Express.

---

## ١. الـ GET: [[await fetch("/api/me").then(r => r.json())]]

من جوه لبرة:

1. [[fetch("/api/me")]]: ابعت GET (الافتراضي) لـ [[/api/me]] على نفس الموقع. بيرجّع **Promise** (وعد بنتيجة هتيجي بعدين).
2. [[.then(r => r.json())]]: لما الرد ييجي، سمّيه [[r]] واقرا الـ body كـ JSON. وده كمان Promise.
3. [[await]]: استنى لحد ما كله يخلص وهات النتيجة.

~~~text الناتج
{id: 42, name: 'Ali', role: 'user'}
~~~

ومن غير [[await]]:

~~~text fetch("/api/me").then(r => r.json())
Promise {<pending>}
~~~

بتاخد الـ Promise نفسه مش القيمة. فـ [[await]] هو اللي بيطلّع النتيجة.

---

## ٢. الـ POST سطر سطر

~~~javascript Console
await fetch("/api/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "test", email: "test@example.com" })
}).then(r => r.json())
~~~

اكتبه بـ Shift+Enter بين السطور، و Enter في الآخر.

| السطر | معناه |
|---|---|
| [[fetch("/api/users", {]] | الـ URL، وبعده object إعدادات الطلب |
| [[method: "POST",]] | نوع الطلب (الافتراضي GET) |
| [[headers: { "Content-Type": "application/json" },]] | قول للسيرفر «البودي JSON» |
| [[body: JSON.stringify({...})]] | البودي لازم نص، فـ [[JSON.stringify]] بيحوّل الـ object لنص JSON |
| [[}).then(r => r.json())]] | قفلة الإعدادات والـ fetch، وبعدين اقرا الرد JSON |

~~~text الناتج
{id: 7, name: 'test', email: 'test@example.com'}
~~~

الـ API رجّع الـ user الجديد ومعاه [[id]]، والـ status كان [[201]] (شفته بـ [[r.status]] في طلب تاني).

[[JSON.stringify]] لوحده:

~~~text JSON.stringify({ name: "test" })
'{"name":"test"}'
~~~

---

## ٣. جربت أشيل الـ Content-Type

~~~javascript Console
await fetch("/api/users", { method: "POST", body: JSON.stringify({ name: "no header" }) }).then(r => r.json())
~~~

~~~text الناتج
{id: 9}
~~~

الطلب نجح بس الاسم **ضاع**. من غير الـ header، المتصفح بيبعت النص بنوع [[text/plain]]، و [[express.json()]] بيقرا الـ body بس لو النوع [[application/json]]، فالسيرفر شاف body فاضي. ده خطأ صامت: مفيش error، بس الداتا مش وصلت.

## الخلاصة

- [[fetch]] من Console = من الصفحة، بكوكيزك وبقواعد CORS بتاعتها.
- [[await]] عشان تشوف القيمة مش [[Promise]].
- POST بـ JSON محتاج التلاتة: [[method]] و [[Content-Type]] و [[JSON.stringify]].
- الطلبات دي حقيقية: POST بيعمل، و DELETE بيمسح.`,
          lines: [
            "GET وحوّل الرد JSON. [[await]] شغال في Console مباشرة.",
            "POST لنفس الـ API.",
            "[[method: \"POST\"]] نوع الطلب: من غيره [[fetch]] بيبعت GET، والسيرفر هيرجّع الليستة بدل ما ينشئ حاجة.",
            "قول للسيرفر إن البودي JSON، وإلا ممكن يتجاهله.",
            "البودي لازم يتحوّل لنص بـ stringify.",
            "[[.then(r => r.json())]] حوّل الرد لـ object. لو السيرفر رجّع HTML (صفحة خطأ) هنا بالظبط هيطلع [[Unexpected token '<']]."
          ],
          sol: R`الـ GET بيرجع البيانات مباشرة في Console (object أو array)، والـ POST بيرجع اللي الـ API بيرجعه بعد الإنشاء (غالبًا الـ object الجديد ومعاه [[id]]). وفي تاب Network (فلتر Fetch/XHR) هتلاقي الطلبين، وفي عمود Initiator مكتوب حاجة زي [[VM123:1]] يعني جايين من Console.

دوس على الـ POST: في Payload هتلاقي [[{"name":"test","email":"test@example.com"}]]، والـ status [[201]] لو الـ API مكتوب صح. لو رجع [[400]] أو [[415]] غالبًا نسيت [[Content-Type: application/json]] فالسيرفر مقراش الـ body. ولو الـ GET رجع [[401]] وانت عامل login، يبقى الـ API على دومين تاني والكوكي ما اتبعتتش (محتاج [[credentials: "include"]]).`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** اكتب من دماغك [[fetch]] بـ POST و JSON (التلات حاجات اللي لازم تبقى موجودة)، وشغّله على أي API تجريبي عندك، ولاقي الطلب في Network وعمود Initiator.`, done: R`الطلب اتبعت بـ [[method]] و [[Content-Type: application/json]] و [[JSON.stringify]]، والـ Initiator مكتوب فيه حاجة زي [[VM123:1]] (يعني من Console).`, sol: R`~~~js Console
await fetch("/api/save", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ a: 1 }),
}).then(r => r.json());
~~~

التلات حاجات: [[method]] لأن الافتراضي GET. و [[Content-Type]] عشان السيرفر يعرف إن البودي JSON. و [[JSON.stringify]] لأن [[body]] لازم نص، مش object.

في Network هتلاقي الطلب، و Initiator فيه حاجة زي [[VM123:1]]، و [[VM]] معناها كود مش من ملف، يعني جه من Console. الرقم بيتغيّر كل مرة.

الغلطة: تنسى [[Content-Type]] فالسيرفر (Express مثلًا) يقرا [[req.body]] فاضي. والتمرين رقم ٥ بيوريك نسيان [[JSON.stringify]].

~~~text الناتج
السيرفر استلم: "{\"a\":1}"  application/json
الرد:          {ok: true}
~~~` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** [[const r = fetch("/api/me"); r.status]]. هيطبع إيه؟ وبعدين [[(await fetch("/api/me")).status]]؟`, done: R`الأول [[undefined]] (لأن [[r]] لسه [[Promise]] مش [[Response]])، والتاني الرقم. وكاتب إن [[await]] شغال في Console من غير [[async]] بس مش في ملف عادي.`, sol: R`~~~js Console
const r = fetch("/api/me");
r.status;
(await fetch("/api/me")).status;
~~~

**التوقع:** الأول [[undefined]]، والتاني الرقم.

[[fetch]] بترجّع [[Promise]] على طول، قبل ما الرد يوصل. و [[Promise]] مالهاش خاصية [[status]]، فقراءة خاصية مش موجودة بترجع [[undefined]] من غير خطأ. أما [[await]] فبتستنى وتفك الـ Promise لـ [[Response]].

والقوسين في التاني مهمين: [[await fetch("/api/me").status]] بتعمل [[.status]] على الـ Promise الأول، وبعدين [[await]] على [[undefined]]. فبتطلع [[undefined]].

و [[await]] شغال في Console من غير [[async]]، ده تسهيل. في ملف عادي لازم [[async function]] أو [[type="module"]].

الغلطة: تنسى [[await]] والكود ميقعش. بيكمل بـ [[undefined]]، والباج يظهر بعدها بكام سطر.

~~~text الناتج
undefined
200
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** دالة [[api(path, body)]] في Console بتبعت GET لو مفيش body و POST بـ JSON لو فيه، وترمي error فيه الـ status لو [[!res.ok]]، وترجّع JSON أو [[null]] لو [[204]].`, done: R`[[await api("/api/me")]] بيرجّع object، و [[await api("/nope")]] بيرمي [[HTTP 404]]، و DELETE بـ [[204]] بيرجّع [[null]] من غير [[Unexpected end of JSON input]].`, sol: R`~~~js Console
async function api(path, body, method) {
  const res = await fetch(path, {
    method: method ?? (body === undefined ? "GET" : "POST"),
    headers: body === undefined ? {} : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!res.ok) throw new Error("HTTP " + res.status);
  if (res.status === 204) return null;
  return res.json();
}
await api("/api/me");
await api("/nope").catch(e => e.message);
await api("/del", undefined, "DELETE");
await api("/api/save", { a: 1 });
~~~

- [[body === undefined]] بدل [[!body]]: عشان [[0]] أو [[""]] يتبعتوا كبودي.
- [[!res.ok]] لازم **قبل** القراية، لأن [[fetch]] مبيرميش على [[404]].
- [[204]] قبل [[.json()]]، لأن البودي فاضي.
- البارامتر التالت [[method]]: زيادة على المطلوب، عشان نجرّب DELETE بنفس الدالة.

و [[??]] بياخد [[method]] لو موجودة.

الغلطة: الترتيب. لو عملت [[res.json()]] قبل الفحص، خطأ [[404]] بصفحة HTML هيطلع [[Unexpected token]] بدل [[HTTP 404]].

~~~text الناتج
{name: "sara"}
"HTTP 404"
null
{ok: true}
~~~` },
            { lvl: 'تطبيق', t: R`**timeout و إلغاء:** endpoint بيستنى ٣ ثواني. ابعتله [[fetch(url, { signal: AbortSignal.timeout(1000) })]]، ومرة تانية بـ [[AbortController]] و [[abort()]] على طول.`, done: R`الأولى [[TimeoutError: signal timed out]] والتانية [[AbortError: signal is aborted without reason]] (اتجرّبوا في Chrome 156)، والطلب في Network مكتوب [[(canceled)]].`, sol: R`~~~js endpoint في السيرفر
if (req.url === "/slow/3000") return setTimeout(() => { res.writeHead(200); res.end("{}"); }, 3000);
~~~
~~~js Console
await fetch("/slow/3000", { signal: AbortSignal.timeout(1000) }).catch(e => e.name + ": " + e.message);

const ac = new AbortController();
const q = fetch("/slow/3000", { signal: ac.signal });
ac.abort();
await q.catch(e => e.name + ": " + e.message);
~~~

[[fetch]] مالوش timeout افتراضي، فطلب معلّق ممكن يفضل دقايق. [[AbortSignal.timeout(1000)]] signal جاهز بيتلغي بعد ثانية. و [[AbortController]] لما تحتاج تلغي **بإيدك**، زي زرار «إلغاء»، أو React لما component يتشال.

الفرق في الاسم مهم: [[TimeoutError]] = الوقت خلص، و [[AbortError]] = حد لغاه. فـ [[catch]] تقدر تفرق، وتتجاهل الـ [[AbortError]] عادة.

الغلطة: تفتكر إن الإلغاء وقّف السيرفر. ده بيقفل الاتصال من ناحيتك بس. السيرفر ممكن يكمل، فالـ POST الملغي ممكن يكون اتنفذ. عشان كده retry بعد timeout خطر من غير idempotency.

و [[(canceled)]] ده اللي Network بيكتبه في عمود Status، من وثائق Chrome. وفي الـ Protocol نفس الطلب [[canceled: true]].

~~~text الناتج (Chrome 156)
"TimeoutError: signal timed out"
"AbortError: signal is aborted without reason"
Network: الطلبين (canceled)
~~~` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** ٥ طلبات ورا بعض بـ [[await]] في loop، وبعدين نفس الـ ٥ بـ [[Promise.all]]، على endpoint بيستنى ٥٠٠ms. قيس بـ [[performance.now()]].`, done: R`الـ loop حوالي ٢٥٠٠ms و [[Promise.all]] حوالي ٥٠٠ms، وفي Waterfall الأولى درجات سلّم والتانية عمود واحد.`, sol: R`~~~js Console
const t1 = performance.now();
for (let i = 0; i < 5; i++) await fetch("/slow/500?" + i);
const a = Math.round(performance.now() - t1);

const t2 = performance.now();
await Promise.all([0, 1, 2, 3, 4].map(i => fetch("/slow/500?p" + i)));
const b = Math.round(performance.now() - t2);
[a, b];
~~~

[[await]] جوه loop معناها «استنى الأول يخلص وبعدين ابعت التاني»، فالوقت بيتجمع: ٥ × ٥٠٠. و [[map]] بيبعتهم كلهم في نفس اللحظة، و [[Promise.all]] بيستنى آخر واحد، فالوقت أطول واحد. و [[?i]] في الرابط عشان الكاش ميخلّيش طلب يستنى اللي قبله.

الغلطة: تستخدم [[Promise.all]] مع ١٠٠٠ طلب، فتضرب السيرفر مرة واحدة، ومع HTTP/1.1 تستنى في طابور ٦ اتصالات. وكمان لو طلب واحد فشل، [[Promise.all]] بيرفض كله، فاستخدم [[Promise.allSettled]] لو عايز كل النتايج. ولو الطلبات معتمدة على بعض، الترتيب مطلوب والـ loop صح.

~~~text الناتج
[2559, 518]    (ms: الـ loop و Promise.all)
Waterfall: الـ loop درجات سلّم، و Promise.all عمود واحد
~~~` },
            { lvl: 'تحدي', t: R`**صلّح:** [[fetch("/api/save", { method: "POST", body: { name: "x" } })]] والسيرفر بيقول البودي فاضي. بص في Payload، واكتب ليه، وصلّحه.`, done: R`Payload كان [[[object Object]]] و [[Content-Type: text/plain;charset=UTF-8]]، والتصليح [[JSON.stringify]] و [[Content-Type: application/json]]، والسيرفر استلم [[{"name":"x"}]].`, sol: R`~~~js الغلط
await fetch("/api/save", { method: "POST", body: { name: "x" } });
~~~
~~~js التصليح
await fetch("/api/save", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "x" }),
});
~~~
~~~js السيرفر للفحص
if (req.url === "/api/save") {
  let b = "";
  req.on("data", d => b += d);
  req.on("end", () => { console.log(JSON.stringify(b), req.headers["content-type"]); res.end("{}"); });
}
~~~

[[body]] بيقبل نص أو FormData أو Blob، و object عادي مش منهم. فالمتصفح بيعمل عليه [[String(obj)]]، والنتيجة [[[object Object]]]. ولأنه بقى نص، حط [[text/plain;charset=UTF-8]] لوحده.

والسيرفر (Express بـ [[express.json()]]) مش بيقرا غير [[application/json]]، فـ [[req.body]] فاضي. عشان كده السيرفر «بيقول البودي فاضي» رغم إن طلب وصل.

إزاي تكشفها: Payload في Network بيعرض [[[object Object]]] نصًا. دي العلامة.

الغلطة: تصلّح [[JSON.stringify]] وتنسى [[Content-Type]]. البودي هيوصل نص، و [[req.body]] لسه فاضي. لازم الاتنين.

~~~text الناتج
قبل:  "[object Object]"   text/plain;charset=UTF-8
بعد:  "{\"name\":\"x\"}"  application/json
~~~` },
          ],
        },
        {
          cmd: "Copy as cURL",
          title: "خد أي طلب وكرره من الترمنال",
          desc: "كليك يمين على أي طلب في Network ثم Copy ثم Copy as cURL. الطلب هيتنسخ بكل الـ headers والكوكيز والبودي، فتلصقه في الترمنال وتعدّل فيه اللي انت عايزه. على ويندوز اختار «(bash)» لو هتشغّله في Git Bash أو WSL، أو «Copy as PowerShell». وخد بالك: الأمر المنسوخ فيه الكوكيز والتوكن بتوعك، فمتبعتهوش لحد ومتحطهوش في issue على GitHub.",
          example: R`curl 'https://example.com/api/orders' -H 'accept: application/json' -H 'cookie: session=...' --compressed
curl -i 'https://example.com/api/orders?page=2' -H 'cookie: session=...'`,
          try: "انسخ طلب من موقعك، وشغّله في الترمنال، وغيّر فيه page أو أي parameter.",
          flag: "term",
          deep: {
            why: "لاقيت طلب في Network فيه مشكلة وعايز تجرّبه من الترمنال. Copy as cURL بيحوّله لأمر جاهز بكل الـ headers والكوكيز.",
            how: R`كليك يمين على أي طلب في Network ثم Copy ثم Copy as cURL (bash). الأمر فيه: الـ URL، وكل الـ headers، والـ body لو POST.

تلصقه في الترمنال وتشغّله. تقدر تعدّل: الـ URL، أو قيمة header، أو الـ body.

تحذير: الأمر بيتضمن cookies وTokens الـ session الحقيقية. متبعتهوش في رسايل أو تحطه على GitHub.`,
            when: "Bug في API وعايز تعزله. تشارك الطلب مع backend developer.",
            mistakes: "تنسى تغيير الكوكيز والتوكنات قبل ما تشارك."
          },
          teach: R`## الأول: الطلب كله في أمر واحد

Copy as cURL في Network بيحوّل الطلب لأمر [[curl]] فيه كل حاجة: الـ URL والـ method والـ headers والكوكيز والبودي. مكان الأمر في القايمة من Chrome DevTools docs. والأوامر اللي تحت اتشغّلت بـ [[curl.exe]] في PowerShell 7 على API محلي.

---

## ١. السطر الأول

~~~bash
curl 'https://example.com/api/orders' -H 'accept: application/json' -H 'cookie: session=...' --compressed
~~~

| الحتة | معناها |
|---|---|
| [[curl 'URL']] | الطلب، و GET لأن مفيش [[-X]] ولا بودي |
| [[-H 'accept: application/json']] | header: «عايز الرد JSON» |
| [[-H 'cookie: session=...']] | الكوكي بتاعتك. ده اللي بيخلي الطلب «logged in» |
| [[--compressed]] | اطلب رد مضغوط (gzip أو br) وفكّه، زي المتصفح |

الأمر الحقيقي بيبقى أطول بكتير ([[user-agent]] و [[referer]] و [[sec-ch-ua]]...)، ومعظمهم ممكن تمسحه.

جربته على السيرفر المحلي:

~~~powershell
curl.exe 'http://127.0.0.1:8791/api/orders' -H 'accept: application/json' -H 'cookie: session=s3cr3t' --compressed
~~~

~~~text الناتج
{"page":1,"orders":[{"id":11,"total":250},{"id":12,"total":90}]}
~~~

## ٢. السطر التاني: عدّلت فيه

~~~powershell
curl.exe -i 'http://127.0.0.1:8791/api/orders?page=2' -H 'cookie: session=s3cr3t'
~~~

~~~text الناتج
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 64

{"page":2,"orders":[{"id":21,"total":250},{"id":22,"total":90}]}
~~~

- [[?page=2]]: query parameter، والـ API رجّع الصفحة التانية.
- [[-i]]: اطبع headers الرد قبل البودي، فتشوف الـ status.
- الـ URL جوه علامات تنصيص عشان [[?]] و [[&]] ليهم معنى في الـ shell.

---

## ٣. أنهي نسخة تنسخ

| هتشغّله في | اختار |
|---|---|
| Git Bash أو WSL أو لينكس أو ماك | Copy as cURL (bash) |
| CMD | Copy as cURL (cmd) |
| PowerShell | Copy as PowerShell (بيطلع [[Invoke-WebRequest]]) أو نسخة bash مع [[curl.exe]] في PowerShell 7 |

الفرق في علامات التنصيص: bash بيستخدم [['...']]، و CMD مبيفهمش الـ single quotes.

## الخلاصة

- Copy as cURL = نفس الطلب بالظبط، تعدّل فيه وتعيده.
- فيه كوكيز وتوكن حقيقيين: متشاركهوش من غير ما تمسحهم.
- لو رجع 401 بعد شوية، الـ session خلصت، انسخه تاني.`,
          lines: [
            "اللي بيطلع من Copy as cURL: الـ URL، وكل header ([[-H]]) بما فيهم الكوكي، و [[--compressed]] يقبل رد مضغوط.",
            "نفس الطلب بعد ما عدّلت فيه: صفحة تانية، و [[-i]] عشان تشوف الـ status."
          ],
          sol: R`في Network كليك يمين على الطلب ثم Copy ثم Copy as cURL (bash). هتلاقي أمر طويل فيه [[-H 'cookie: ...']] و headers كتير. الصقه في الترمنال، المفروض يرجع نفس الـ JSON اللي شايفه في Preview.

غيّر [[page=1]] لـ [[page=2]] في الـ URL (خليه جوه علامات التنصيص عشان [[&]] و [[?]]) وشغّله، هتاخد الصفحة اللي بعدها. زوّد [[-i]] عشان تشوف الـ status.

لو رجعلك [[401]] بعد شوية، الكوكي أو الـ token خلصوا، انسخ الطلب تاني. ولو الناتج رموز غريبة يبقى نسيت [[--compressed]]. وعلى ويندوز اختار «Copy as cURL (cmd)» أو شغّله من Git Bash/WSL لأن علامات التنصيص مختلفة.`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** انسخ أي طلب API بـ Copy as cURL (bash)، والصقه في محرر، وعلّم على: الـ URL، والـ headers اللي مالهاش لازمة، والكوكي.`, done: R`عارف تشيل [[sec-ch-ua]] و [[sec-fetch-*]] و [[user-agent]] والطلب لسه بيشتغل، والكوكي متعلّم عليها كـ «سر».`, sol: R`1. في Network كليك يمين على طلب API ثم Copy ثم Copy as cURL (bash).
2. الصقه في محرر، وعلّم:

~~~bash شكل الأمر المنسوخ
curl 'http://127.0.0.1:8935/api/orders' \
  -H 'accept: */*' \
  -H 'content-type: application/json' \
  -b 'session=s3cret' \
  -H 'origin: http://127.0.0.1:8935' \
  -H 'sec-ch-ua: "Chromium";v="156"' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-origin' \
  -H 'user-agent: Mozilla/5.0' \
  --data-raw '{"a":1}'
~~~

- الـ URL: أول سطر.
- ملهاش لازمة في الغالب: [[sec-ch-ua]] و [[sec-fetch-*]] و [[user-agent]] و [[accept]]. ده كلام المتصفح عن نفسه.
- **سر:** الكوكي، هنا [[-b]]. وفي نسخ تانية [[-H 'cookie: ...']]. و [[authorization]] لو موجودة.

الغلطة: تعتبر الأمر كود آمن تقدر تنسخه في أي مكان. ده فيه جلستك، يعني أي حد معاه الأمر يدخل بحسابك لحد ما الجلسة تخلص.

زرار Copy واجهة، فالشكل ده من ناتج DevTools المعروف، والـ [[-b]] ظهر في نسخ Chrome الحديثة. والأمر نفسه اتشغّل على معمل بـ [[-H 'cookie: ...']] مع كل الـ headers:

~~~text الناتج
الأمر الكامل:             201
من غير sec-* و user-agent: 201
~~~` },
            { lvl: 'تطبيق', t: R`**صغّره:** خد الأمر المنسوخ وشيل header ورا header لحد ما تلاقي أقل أمر لسه بيرجّع نفس الرد. اكتب الـ headers اللي طلعت لازمة.`, done: R`الأمر النهائي ٢–٣ headers بس (غالبًا [[cookie]] أو [[authorization]] و [[content-type]])، ونفس الـ status والـ body.`, sol: R`~~~bash الأمر النهائي
curl -s -w ' %{http_code}\n' 'http://127.0.0.1:8935/api/orders' \
  -H 'content-type: application/json' \
  -H 'cookie: session=s3cret' \
  --data-raw '{"a":1}'
~~~

الطريقة: شيل header واحد، وشغّل، وقارن الـ status والبودي. لو اتغيّر رجّعه. دي نفس فكرة تقليل الباج لأصغر حالة، وبتقولك السيرفر **بيعتمد على إيه فعلًا**.

الأمر الناتج من ٨ headers لـ ٢. و [[cookie]] لازم عشان الهوية، و [[content-type]] لازم لأن السيرفر بيرفض أي نوع تاني.

الغلطة: تشيل كله مرة واحدة، فلو وقع مش هتعرف السبب. أو تشيل [[content-type]] ومتاخدش بالك إن [[curl]] حط [[application/x-www-form-urlencoded]] لوحده مع [[--data-raw]]، فالسيرفر رد [[415]]. وخد بالك إن [[--data-raw]] نفسها بتغيّر الـ method لـ POST.

~~~text الناتج
الأمر الكامل (8 headers):     201
content-type و cookie بس:     {"id":9} 201
من غير cookie:                401
من غير content-type:          415
~~~` },
            { lvl: 'تطبيق', t: R`**قارن:** نفس الطلب Copy as cURL (bash) و Copy as cURL (cmd) و Copy as PowerShell و Copy as fetch. شغّل كل واحد في المكان الصح.`, done: R`الأربعة رجّعوا نفس الرد، وكاتب الفرق في علامات التنصيص: bash بـ [[']]، و cmd بـ [[^]] والدبل، و PowerShell بيستخدم [[Invoke-WebRequest]] و [[-WebSession]].`, sol: R`~~~bash Copy as cURL (bash)
curl 'http://127.0.0.1:8935/api/me' -H 'accept: */*' -H 'cookie: session=s3cret'
~~~
~~~cmd Copy as cURL (cmd): c.cmd
curl.exe -s "http://127.0.0.1:8935/api/me" ^
  -H "accept: */*" ^
  -H "cookie: session=s3cret"
~~~
~~~powershell Copy as PowerShell
$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$session.Cookies.Add((New-Object System.Net.Cookie("session", "s3cret", "/", "127.0.0.1")))
(Invoke-WebRequest -UseBasicParsing -Uri "http://127.0.0.1:8935/api/me" -WebSession $session -Headers @{ "accept" = "*/*" }).Content
~~~
~~~js Copy as fetch (Console)
await fetch("http://127.0.0.1:8935/api/me", { headers: { accept: "*/*" }, credentials: "include" }).then(r => r.json());
~~~

الفرق كله في علامات التنصيص وسطر الاستمرار، لأن كل shell ليه قواعده:

- bash: [[']] بتحمي كل حاجة، و [[\]] لاستمرار السطر.
- cmd: مفيش [[']] أصلًا، فالدبل كوت، و [[^]] لاستمرار السطر وتهريب الرموز.
- PowerShell: مش curl أصلًا، ده [[Invoke-WebRequest]]، والكوكي في [[-WebSession]]، و [[$__bt]] للاستمرار.
- fetch: بيشتغل في Console بكوكيز المتصفح نفسها.

الغلطة: تلصق نسخة bash في PowerShell. الـ [[curl]] في 5.1 alias، و [[\]] ملهاش معنى. فهتاخد خطأ غريب. اختار النسخة حسب المكان.

و Copy من القايمة واجهة، فكتبنا الأوامر بالشكل ده وشغّلناها. أمر fetch بيشتغل على نفس الموقع بكوكي المتصفح:

~~~text الناتج (الأربعة)
{"name":"sara"}
(cmd و powershell 5.1 و pwsh 7.6 و bash)
~~~` },
            { lvl: 'تحدي', t: R`**ابني:** سكربت [[replay.sh]] بياخد الأمر المنسوخ من ملف، ويشيل الكوكي ويحط مكانها [[$SESSION]] من متغير بيئة، ويشغّله ٣ مرات ويطبع الـ status والوقت بـ [[-w]].`, done: R`مفيش كوكي مكتوبة في السكربت ([[grep -c session= replay.sh]] = [[0]])، والسكربت بيطبع ٣ سطور فيهم الـ status والوقت.`, sol: R`~~~bash replay.sh
#!/usr/bin/env bash
# usage: SESSION='name=value' bash replay.sh copied.txt
set -euo pipefail
: "$__{SESSION:?set SESSION first}"
cmd=$(grep -viE "cookie:|^ *-b " "$1" | tr -d '\\\n')
for i in 1 2 3; do
  eval "$cmd -H \"cookie: \$SESSION\" -s -o /dev/null -w '%{http_code} %{time_total}s\n'"
done
~~~
~~~bash
SESSION='session=s3cret' bash replay.sh copied.txt
SESSION='session=wrong' bash replay.sh copied.txt
grep -c session= replay.sh
~~~

- [[: "$__{SESSION:?...}"]]: يقف برسالة لو المتغير فاضي.
- [[grep -viE "cookie:|^ *-b "]]: بيشيل سطر الكوكي بنوعيه من الأمر المنسوخ. و [[-v]] عكس، و [[-i]] من غير حالة الحروف.
- [[tr -d '\\\n']]: بيشيل الـ [[\]] وسطور الاستمرار، فالأمر يبقى سطر واحد.
- [[eval]]: لأن الأمر نص فيه علامات تنصيص، ومن غيره الـ shell مش هيفسرها. و [[\$SESSION]] معناها اترك المتغير لوقت [[eval]].

**تحذير عن [[eval]]:** بينفذ أي حاجة في الملف. فده لأمر انت نسخته بنفسك، مش ملف من حد تاني.

الغلطة: تحط القيمة في السكربت نفسه أو تعمل [[export]] في ملف بيترفع على git. السر في متغير بيئة بس.

~~~text الناتج
200 0.002317s
200 0.001553s
200 0.001289s
بسيشن غلط: 401 (٣ مرات)
grep -c session= replay.sh    0
~~~` },
            { lvl: 'تحدي', t: R`**اشرحها (أمان):** زميل حط Copy as cURL في issue عام على GitHub. اكتب الخطوات بالترتيب اللي لازم تتعمل دلوقتي.`, done: R`الخطوات: امسح أو عدّل الـ issue، و logout من كل الأجهزة أو اعمل revoke للـ session والتوكن من السيرفر (المسح من GitHub مش كفاية لأن حد ممكن يكون نسخه)، وبعدين امسح الكوكي من الأمر قبل أي مشاركة.`, sol: R`**بالترتيب:**

1. **ألغي الجلسة من السيرفر أولًا.** logout من كل الأجهزة، أو revoke للتوكن. ده أهم خطوة، لأنها اللي بتخلي القيمة المنشورة ملهاش لازمة.
2. امسح الـ issue أو عدّله، بما فيها تاريخ التعديلات (GitHub بيحتفظ بيها، فالمسح أضمن).
3. افترض إنها اتاخدت: راجع لوج الجلسة، ودوّر على نشاط غريب من IPs تانية.
4. غيّر الباسورد لو الحساب مهم.
5. قبل أي مشاركة جاية: شيل الكوكي و [[authorization]] من الأمر، زي التمرين رقم ٣.

ليه الترتيب ده: لو بدأت بالمسح، القيمة لسه صالحة، وأي bot نسخها في ثواني يقدر يدخل. والنشر العام بيتلاقى بسرعة.

ولو المسح أسرع بثانية اعمله الأول، الخطوتين بيحصلوا في نفس الدقيقة. المهم إنك متكتفيش بالمسح.

الغلطة: تعتبر المسح هو الحل. GitHub بيبعت إيميلات للمتابعين فيها نص الـ issue، و bots بتراقب، فالسر اتحرق وقت النشر.

ده تمرين إجابة مكتوبة، ومفيش ناتج شاشة:

~~~text الناتج
الترتيب: revoke الجلسة، امسح، افترض التسريب وراجع، غيّر الباسورد، وامنع تكرارها.
~~~` },
          ],
        },
        {
          cmd: "curl -i / -v",
          title: "ابعت واقرا الرد كامل",
          desc: "[[-i]] بيطبع الـ headers والبودي، و [[-v]] بيطبع كمان الطلب اللي اتبعت نفسه والـ TLS handshake. [[-H]] بيزوّد header، و [[-d]] بيبعت البودي (ومعاه بيبقى POST لوحده)، و [[-X]] بيغيّر الـ method. ولو الرد JSON وصّله بـ [[jq]] يطلع منسّق. وده أسرع طريقة تعرف الغلط في السيرفر ولا في المتصفح: لو curl رجّع نفس الرد، المتصفح بريء.",
          example: R`curl -i https://api.github.com/users/octocat
curl -s https://api.github.com/users/octocat | jq '{name, public_repos}'
curl -i -X POST https://example.com/api/login -H "Content-Type: application/json" -d '{"email":"a@b.com","password":"secret"}'
curl -H "Authorization: Bearer $TOKEN" https://example.com/api/me`,
          try: "اعمل طلب login غلط للـ API بتاعك بـ curl -i، واقرا الـ status والـ body.",
          flag: "term",
          deep: {
            why: "تجرّب API من الترمنال وتقرا الـ status والـ headers والـ body في مكان واحد.",
            how: R`[[-i]] بيطبع الـ response headers قبل الـ body. أول سطر دايمًا الـ status. مفيد لما تشوف السيرفر بيرجع إيه بالظبط.

[[-v]] (verbose) أقوى: بيطبع الطلب (السطور بتبدأ بـ [[>]]) والرد ([[<]]) وتفاصيل الاتصال. مفيد جدًا لـ debugging HTTPS.

[[-s]] بيخفي شريط التحميل. [[-o /dev/null]] برمي الـ body. [[| jq]] بيعرض الـ JSON منسّق.

لو بتبعت JSON: علامات تنصيص مهمة، single quotes بره والـ JSON جواه.`,
            when: "تجرّب API endpoint. تتأكد من الـ headers. تكتب سكربت health check.",
            mistakes: "على ويندوز في CMD، single quotes غير مدعومة. استخدم double quotes."
          },
          teach: R`## الأول: curl بيوريك قد إيه من الكلام

| الفلاج | بيطبع إيه |
|---|---|
| (من غير حاجة) | البودي بس |
| [[-i]] (include) | headers الرد + البودي |
| [[-v]] (verbose) | الاتصال + الطلب اللي اتبعت + headers الرد + البودي |
| [[-s]] (silent) | يشيل شريط التحميل |

الأمثلة اتشغّلت: الـ GitHub في [[docker run --rm ubuntu:24.04]] (curl 8.5.0 و jq 1.7)، والـ login و [[-v]] على API محلي بـ [[curl.exe]] (8.21.0) في ويندوز.

---

## ١. [[curl -i https://api.github.com/users/octocat]]

~~~text الناتج (أول سطور، لينكس)
HTTP/2 200
content-type: application/json; charset=utf-8
cache-control: public, max-age=60, s-maxage=60
x-ratelimit-limit: 60
x-ratelimit-remaining: 57
...

{
  "login": "octocat",
  ...
~~~

[[x-ratelimit-remaining: 57]] معناها: من غير توكن مسموحلك ٦٠ طلب في الساعة، وفاضل ٥٧. حاجة زي دي مش هتشوفها من غير [[-i]].

## ٢. [[curl -s https://api.github.com/users/octocat | jq '{name, public_repos}']]

- [[-s]]: من غير شريط التحميل، عشان ميتلخبطش مع الـ JSON.
- [[| jq]]: ابعت الرد لـ [[jq]]، برنامج بيقرا JSON.
- [['{name, public_repos}']]: اعمل object جديد فيه المفتاحين دول بس.

~~~text الناتج
{
  "name": "The Octocat",
  "public_repos": 8
}
~~~

## ٣. الـ POST: login بباسورد غلط

~~~bash
curl -i -X POST https://example.com/api/login -H "Content-Type: application/json" -d '{"email":"a@b.com","password":"secret"}'
~~~

| الحتة | معناها |
|---|---|
| [[-X POST]] | الـ method |
| [[-H "Content-Type: application/json"]] | البودي JSON |
| [[-d '...']] | البودي (data). الـ JSON جواه double quotes، فبرّه single quotes |

على API محلي:

~~~text الناتج
HTTP/1.1 401 Unauthorized
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 37

{"error":"Invalid email or password"}
~~~

### على ويندوز: علامات التنصيص

جربت نفس السطر بالظبط بـ [[curl.exe]]:

| الشِل | النتيجة |
|---|---|
| PowerShell 7 | [[401]]: اشتغل زي bash |
| Windows PowerShell 5.1 | [[400 Bad Request]]: الـ double quotes جوه الـ JSON اتشالت قبل ما توصل لـ curl، والسيرفر قال [[SyntaxError: Expected property name]] |
| CMD | لازم double quotes بره و [[\"]] جوه: [[-d "{\"email\":\"a@b.com\",\"password\":\"secret\"}"]]، وكده رجع 401 |

## ٤. [[curl -H "Authorization: Bearer $TOKEN" URL]]

- [[Authorization: Bearer ...]]: الطريقة المعتادة تبعت توكن.
- [[$TOKEN]]: الـ shell بيحط قيمة المتغير [[TOKEN]] مكانه قبل ما curl يشتغل. اعمله الأول بـ [[TOKEN=abc123]] (في bash) أو [[$env:TOKEN = "abc123"]] واكتب [[$env:TOKEN]] (في PowerShell). وكده التوكن مش مكتوب في الأمر نفسه فمش هيبان في الـ history.

---

## ٥. [[-v]]: الطلب نفسه

~~~text curl.exe -v http://127.0.0.1:8791/api/me (ويندوز)
*   Trying 127.0.0.1:8791...
* Established connection to 127.0.0.1 (127.0.0.1 port 8791) from 127.0.0.1 port 65505
* using HTTP/1.x
> GET /api/me HTTP/1.1
> Host: 127.0.0.1:8791
> User-Agent: curl/8.21.0
> Accept: */*
>
* Request completely sent off
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: application/json; charset=utf-8
< Content-Length: 36
<
* Connection #0 to host 127.0.0.1:8791 left intact
{"id":42,"name":"Ali","role":"user"}
~~~

| أول السطر | معناه |
|---|---|
| [[*]] | معلومات curl عن الاتصال |
| [[>]] | اللي curl **بعته** |
| [[<]] | اللي السيرفر **رده** |

السطر الفاضي بعد [[>]] و [[<]] هو الفاصل بين الـ headers والبودي في HTTP نفسه.

## الخلاصة

- [[-i]] للـ status والـ headers، [[-v]] لما عايز تشوف اللي اتبعت كمان.
- [[-X]] الـ method، [[-H]] header، [[-d]] البودي، و [[| jq]] للـ JSON.
- على ويندوز: PowerShell 7 زي bash، و 5.1 بيبوّظ الـ JSON، و CMD محتاج [[\"]].`,
          lines: [
            "GET مع الـ headers والـ status قبل البودي.",
            "الرد JSON، خد منه حقلين بس بـ jq.",
            "POST بـ JSON: [[-X POST]] النوع، و [[-H]] نوع المحتوى، و [[-d]] البودي بين single quotes.",
            "طلب بتوكن في header الـ Authorization، والتوكن من متغير."
          ],
          sol: R`جربتها على API محلي بباسورد غلط:

[[HTTP/1.1 401 Unauthorized]]
[[Content-Type: application/json]]
وبعد السطر الفاضي الـ body: [[{"error":"Invalid email or password"}]]

ده الصح: [[401]] (أو [[400]] لو الـ body نفسه ناقص) ورسالة عامة متقولش هل الإيميل موجود ولا لأ. لو رجعلك [[200]] ومعاه [[{"success":false}]] ده تصميم وحش لأن أي client أو monitoring هيفتكره نجح. ولو [[500]] يبقى فيه exception في الكود مع الباسورد الغلط، افتح logs. ولو [[404]] يبقى الـ route غلط أو ناقصه prefix زي [[/api/v1]].`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** على أي موقع، شغّل [[curl -I]] و [[curl -i]] و [[curl -v]] واكتب الفرق في سطر لكل واحد.`, done: R`[[-I]] بيبعت [[HEAD]] ويطبع الـ headers بس، و [[-i]] بيبعت GET ويطبع الـ headers والبودي، و [[-v]] بيطبع كمان الطلب بعلامة [[>]] وتفاصيل الاتصال بـ [[*]].`, sol: R`~~~bash
curl -sI http://127.0.0.1:8935/api/me
curl -si http://127.0.0.1:8935/api/me
curl -sv -o /dev/null http://127.0.0.1:8935/api/me
~~~

- [[-I]] بيبعت [[HEAD]] مش GET، يعني السيرفر بيرد headers بس. بعض السيرفرات بترد مختلف على HEAD، فبعدها لو الرد غريب جرّب [[-i]].
- [[-i]] بيبعت GET عادي، ويطبع الـ headers قبل البودي.
- [[-v]] بيطبع كل حاجة: [[*]] تفاصيل الاتصال، و [[>]] اللي **بعته**، و [[<]] اللي رجع. مفيد لما تعوز تعرف curl بعت إيه فعلًا.

وعشان [[-v]] بيكتب على stderr، [[-o /dev/null]] بترمي البودي بس.

الغلطة: تستخدم [[-I]] تشخّص [[405]]. ممكن الـ route بيقبل GET بس، فـ HEAD هيقع والموقع سليم.

~~~text الناتج
-I:
HTTP/1.1 401 Unauthorized
Content-Type: application/json

-i:  نفس الـ headers، وبعدها
{"error":"login"}

-v:
*   Trying 127.0.0.1:8935...
> GET /api/me HTTP/1.1
> Host: 127.0.0.1:8935
> User-Agent: curl/8.23.0
> Accept: */*
>
< HTTP/1.1 401 Unauthorized
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** سطر [[curl -s -o /dev/null -w]] بيطبع: الـ status، و [[time_namelookup]]، و [[time_connect]]، و [[time_starttransfer]]، و [[time_total]]، و [[size_download]] لموقعك.`, done: R`السطر بيطبع ٦ أرقام، وعارف إن [[time_starttransfer]] ناقص [[time_connect]] تقريبًا = وقت السيرفر (زي TTFB في Timing).`, sol: R`~~~bash
curl -s -o /dev/null -w '%{http_code} %{time_namelookup} %{time_connect} %{time_starttransfer} %{time_total} %{size_download}\n' http://127.0.0.1:8935/slow -H 'cookie: session=s3cret'
~~~

[[-w]] بيطبع قيم بعد ما الطلب يخلص. والأرقام كلها **تراكمية من البداية**، مش كل مرحلة لوحدها:

- [[time_namelookup]]: وقت DNS.
- [[time_connect]]: لحد ما TCP خلص.
- [[time_starttransfer]]: لحد أول بايت من الرد، TTFB.
- [[time_total]]: الوقت كله.
- [[size_download]]: حجم البودي بالبايت.

[[time_starttransfer]] ناقص [[time_connect]] تقريبًا = وقت السيرفر: هنا 0.125 ناقص 0.001 = 0.124، والسيرفر بيستنى 120ms. ده نفس Waiting في Timing.

الغلطة: تقرا الأرقام كمراحل منفصلة فتجمعها. وعلى HTTPS فيه [[time_appconnect]] كمان، لـ TLS. ولو [[%]] في PowerShell 5.1 أو [[cmd]]، الدبل كوت لازم وشغالة، وفي ملف [[.bat]] لازم [[%%]].

~~~text الناتج
200 0.000057 0.000701 0.125249 0.125361 15
~~~` },
            { lvl: 'تطبيق', t: R`**قارن:** نفس الـ POST بـ JSON في bash وفي PowerShell 5.1 بـ [[curl.exe]]. اكتب نسخة PowerShell اللي بتشتغل، وليه [[curl]] من غير [[.exe]] في 5.1 بيطلع حاجة تانية.`, done: R`النسختين رجّعوا نفس الرد، وكاتب إن [[curl]] في 5.1 alias لـ [[Invoke-WebRequest]]، والـ JSON في PowerShell محتاج [[--data-raw '{\"a\":1}']] أو ملف بـ [[-d "@body.json"]].`, sol: R`~~~bash bash
curl -s http://127.0.0.1:8935/echo -H "Content-Type: application/json" --data-raw '{"a":1}'
~~~
~~~powershell PowerShell 5.1
curl.exe -s http://127.0.0.1:8935/echo -H "Content-Type: application/json" --data-raw '{\"a\":1}'
Set-Content body.json '{"a":1}' -NoNewline
curl.exe -s http://127.0.0.1:8935/echo -H "Content-Type: application/json" -d "@body.json"
(Get-Command curl).CommandType
~~~

في PowerShell 5.1 [[curl]] من غير [[.exe]] **alias** لـ [[Invoke-WebRequest]]، أمر تاني خالص، بخيارات تانية. فـ [[-H]] مثلًا هتتفسر غلط. [[.exe]] بيجبر على البرنامج الحقيقي.

و 5.1 بيشيل الدبل كوت لما يبعت القيمة لبرنامج خارجي، فـ [[\"]] لازمة، ومن غيرها السيرفر استلم [[{a:1}]].

**فخ في PowerShell 7:** من 7.3 الأمور اتصلّحت، فالـ [[\"]] نفسها بقت غلط: السيرفر استلم [[{\"a\":1}]]. يعني نفس السطر مش بيشتغل في الاتنين. والملف بـ [[-d "@body.json"]] هو اللي شغال في الاتنين، فده الأضمن.

الغلطة: تكتب [[curl]] في PowerShell 5.1 وتشوف جدول [[StatusCode]] و [[Content]]، وتفتكر إن فيه مشكلة.

~~~text الناتج
bash:                     {"got":"{\"a\":1}","type":"application/json"}
5.1 مع \":                {"got":"{\"a\":1}",...}
5.1 من غير \":            {"got":"{a:1}",...}        ← JSON بايظ
7.6 مع \":                {"got":"{\\\"a\\\":1}",...}  ← JSON بايظ
7.6 من غير \":            {"got":"{\"a\":1}",...}
ملف (الاتنين):            {"got":"{\"a\":1}",...}
(Get-Command curl).CommandType:   5.1 = Alias   7.6 = Application
~~~` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** من [[curl --help all]] (أو [[man curl]]) لاقي الخيار اللي بيعمل retry لو السيرفر رد [[503]]، والخيار اللي بيخلّي curl يخرج بكود غلط على [[4xx]]/[[5xx]].`, done: R`[[--retry 3]] و [[--fail]] (أو [[--fail-with-body]])، وجرّبت إن [[curl --fail URL/nope; echo $?]] بيطبع [[22]].`, sol: R`~~~bash
curl --help all | grep -E "^ *--(retry|fail)"
curl -s --retry 3 --retry-delay 1 http://127.0.0.1:8935/503
curl --fail -s http://127.0.0.1:8935/nope; echo $?
curl --fail-with-body -s http://127.0.0.1:8935/nope; echo $?
~~~

[[--retry 3]] بيعيد المحاولة لو الخطأ مؤقت، و [[503]] منهم، ومثله [[408]] و [[429]] و [[502]] و [[504]]. و [[--retry-delay]] الوقت بين كل محاولة. ومن غيره بيبدأ بثانية ويضاعف.

و curl عادة بيرجع [[0]] حتى على [[404]]، لأن الطلب نفسه نجح. [[--fail]] بيخليه يرجع [[22]]، ودي اللي تخلّي سكربت أو CI يقف. و [[--fail-with-body]] نفس الكود، بس بيطبع الرد، وده مفيد عشان تعرف السبب.

الغلطة: تستخدم [[--retry]] مع POST. لو السيرفر نفذ الطلب ورد غلط، هيتنفذ تاني. وخد بالك: مع [[--retry]] من غير [[--fail]]، بودي كل محاولة بيتطبع، زي ما هتشوف تحت.

~~~text الناتج
--fail-with-body              Fail on HTTP errors but save the body
--retry <num>                 Retry request if transient problems occur

busybusyok after retry        ← السيرفر رد 503 مرتين وبعدين 200
(فاضي)  22
{"error":"nf"}  22
~~~` },
            { lvl: 'تحدي', t: R`**قارن (HTTP/2):** [[curl -sI --http1.1 URL]] و [[curl -sI --http2 URL]] على موقع HTTPS. أول سطر بيتغيّر إزاي؟ (درس «HTTP/2 و HTTP/3»).`, done: R`الأول [[HTTP/1.1 200 OK]] والتاني [[HTTP/2 200]] من غير كلمة OK، وأسماء الـ headers في HTTP/2 كلها small letters (اتجرّب بـ curl 8.14 في Alpine). ولو [[curl]] بتاعك قال [[option --http2: the installed libcurl version does not support this]] (ده اللي طلع من curl بتاع ويندوز و Git Bash)، جرّب من WSL أو Docker.`, sol: R`~~~bash
curl -sI --http1.1 https://example.com | head -1
curl -sI --http2 https://example.com | head -1
curl -sI --http2 https://example.com | sed -n 2,3p
~~~

على HTTP/1.1 أول سطر [[HTTP/1.1 200 OK]]. وعلى HTTP/2 [[HTTP/2 200]] من غير الكلمة، لأن الـ reason phrase اتشالت من البروتوكول. والأسامي كلها small letters، لأن المواصفات بتطلب كده. عشان كده دايمًا اعمل [[grep -i]] في أي سكربت على الـ headers.

ولو الأمر قال [[option --http2: the installed libcurl version does not support this]]، ده curl بتاعك مش السيرفر. جرّبناه هنا على Git Bash (curl 8.23) وطلعت نفس الرسالة، و [[curl.exe]] بتاع ويندوز نفس الحكاية، وده [[Features]] من [[curl --version]] مفيهاش [[HTTP2]]. الحل WSL أو Docker.

الغلطة: تعتبر الموقع مش بيدعم HTTP/2 بسبب الرسالة دي. أو تعمل [[grep "Content-Type"]] من غير [[-i]]، فمتلاقيش [[content-type]] على HTTP/2.

الجزء بتاع HTTP/2 هنا مااتشغّلش في جلسة الحلول، لأن Docker كان مقفول. النص ده من تجربة curl 8.14 في Alpine المسجلة في الدرس. والرسالة اللي فوق اتشغّلت فعلًا:

~~~text الناتج
--http1.1:     HTTP/1.1 200 OK         (Content-Type: ...)
--http2:       HTTP/2 200              (content-type: ...)
curl بتاع Git Bash أو ويندوز:
curl: option --http2: the installed libcurl version does not support this
~~~` },
          ],
        }
      ]
    }
]);
