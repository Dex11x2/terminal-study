// تكملة تاب apis: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/apis/01.js (شرح حقول الدرس في أوله)
MORE("apis", [
    {
      t: "Rate limiting موزّع",
      l: 3,
      n: "حدود بتشتغل صح على أكتر من سيرفر: token bucket و sliding window في Redis، و quota لكل خطة، والـ headers اللي بتقول للعميل يستنى قد إيه",
      items: [
        {
          cmd: "token bucket في Redis",
          title: "اسمح بـ burst وحافظ على متوسط ثابت",
          desc: R`كل عميل عنده «جردل» فيه tokens (مثلًا ١٠). كل طلب بياخد token، والجردل بيتملى بمعدل ثابت (مثلًا ٢ في الثانية) لحد الحد الأقصى. الجردل فاضي؟ 429.

النتيجة: العميل يقدر يبعت ١٠ طلبات مرة واحدة (burst)، بس على المدى الطويل ميعدّيش ٢ في الثانية. ولأن السيرفرات كتير، الجردل لازم يبقى في Redis، والقراية والتعديل لازم يحصلوا في خطوة واحدة atomic: عشان كده Lua script.`,
          example: R`redis.defineCommand("takeToken", {
  numberOfKeys: 1,
  lua: $__bt
    local capacity = tonumber(ARGV[1])
    local rate = tonumber(ARGV[2])
    local t = redis.call("TIME")
    local now = tonumber(t[1]) * 1000 + math.floor(tonumber(t[2]) / 1000)
    local b = redis.call("HMGET", KEYS[1], "tokens", "ts")
    local tokens = math.min(capacity, (tonumber(b[1]) or capacity) + (now - (tonumber(b[2]) or now)) * rate / 1000)
    local allowed = 0
    if tokens >= 1 then tokens = tokens - 1; allowed = 1 end
    redis.call("HSET", KEYS[1], "tokens", tokens, "ts", now)
    redis.call("PEXPIRE", KEYS[1], math.ceil(capacity / rate * 1000))
    local waitMs = allowed == 1 and 0 or math.ceil((1 - tokens) * 1000 / rate)
    return { allowed, math.floor(tokens), waitMs }
  $__bt,
});
export async function takeToken(key: string, capacity: number, perSecond: number) {
  const [allowed, remaining, waitMs] = await (redis as any).takeToken($__btrl:tb:$__{key}$__bt, capacity, perSecond);
  return { allowed: allowed === 1, remaining, retryAfter: Math.ceil(waitMs / 1000) };
}`,
          try: R`نادي [[takeToken("k1", 10, 2)]] ١٢ مرة ورا بعض واطبع النتايج، واستنى ثانية ونادي ٣ كمان. وبعدين افتح key جديد ونادي ٥٠ مرة بالتوازي بـ [[Promise.all]] بـ capacity ١٠ ومعدل صغير جدًا: كام واحد اتسمح؟`,
          flag: "script",
          deep: {
            why: R`[[express-rate-limit]] بالـ store الافتراضي (تاب «Backend بـ Node») بيعدّ في ذاكرة كل process. مع ٣ سيرفرات ورا load balancer، الحد الحقيقي بقى ٣ أضعاف، وبيختلف حسب أنهي سيرفر الطلب وقع عليه. والـ APIs محتاجة سماح بـ burst (موبايل بيفتح وبيعمل ٨ طلبات مع بعض) من غير ما تسيب حد يعمل ألف طلب في الدقيقة.`,
            how: R`الفكرة إنك مش محتاج «تزوّد» tokens كل ثانية بـ timer. بتخزّن عدد الـ tokens ووقت آخر تحديث، ومع كل طلب بتحسب اللي اتملى من ساعتها: [[(now - ts) * rate / 1000]]، ومتعدّيش الـ capacity.

ليه Lua؟ لو عملت [[HMGET]] في Node وبعدين حسبت وبعدين [[HSET]]، طلبين على سيرفرين ممكن يقروا نفس القيمة (token واحد باقي) والاتنين ياخدوه. Redis بينفّذ الـ script كله من غير ما أي أمر تاني يدخل في النص، فالقراية والكتابة atomic. و [[defineCommand]] في ioredis بيبعت الـ script مرة ويناديه بالـ SHA بعد كده ([[EVALSHA]]).

الوقت من [[redis.call("TIME")]] مش من Node: كل السيرفرات بتستخدم ساعة واحدة (ساعة Redis)، فمفيش مشكلة لو ساعة سيرفر متأخرة ثانيتين.

[[PEXPIRE]]: بعد الوقت اللي الجردل بيتملى فيه كله، الـ key مالوش لازمة (لو اتشال، أول طلب جاي هيلاقيه مليان، وده نفس النتيجة). فالـ keys مبتتراكمش في Redis.

[[waitMs]]: لو مرفوض، قد إيه لحد ما يبقى فيه token واحد. ده اللي بيروح في [[Retry-After]].

المفتاح بيتحدد بإيه؟ الـ API key أو الـ user id للطلبات المسجّلة، والـ IP للمجهولين (والـ IP الحقيقي لو ورا proxy، مع [[trust proxy]] صح). وممكن حدود متعددة مع بعض: لكل مستخدم، ولكل endpoint غالي (login، أو AI، أو SMS)، و global.

بدايل: [[rate-limit-redis]] كـ store لـ express-rate-limit (fixed window في Redis)، ومكتبات زي [[rate-limiter-flexible]] فيها algorithms كتير جاهزة. والكود هنا عشان تفهم اللي جوه وتقدر تعدّل. وفي Nginx أو الـ API gateway فيه rate limit برضه (بالـ IP غالبًا)، وده خط دفاع أول مش بديل.`,
            when: "أي API عام أو فيه أكتر من سيرفر، وأي endpoint بيكلّف فلوس (AI، أو SMS، أو إيميل). token bucket مناسب لما عايز تسمح بـ burst.",
            mistakes: R`GET وبعدين SET من Node (race condition، وبيعدّي أكتر من الحد تحت الضغط). والوقت من [[Date.now()]] على كل سيرفر. ومفيش expire فالـ keys بتملى Redis. و [[capacity]] كبيرة جدًا فالـ burst نفسه هو الهجوم. وتعمل rate limit بالـ IP بس لـ API بيستخدمه شركات ورا NAT واحد. وسؤال انترفيو كلاسيكي: «صمم rate limiter موزّع»، والإجابة: algorithm (token bucket أو sliding window)، ومخزن مشترك (Redis)، وعملية atomic (Lua)، وحدود لكل key، وheaders، وإيه اللي يحصل لو Redis وقع (fail open ولا fail closed).`
          },
          teach: R`## جردل في Redis، و script بيتنفّذ مرة واحدة من غير مقاطعة

المثال بيعرّف أمر جديد في ioredis اسمه [[takeToken]]، الأمر ده Lua script بيتنفّذ **جوه Redis**: بيقرا الجردل، ويحسب اتملى قد إيه من آخر مرة، وياخد token لو فيه، ويكتب الحالة الجديدة. وبعده دالة TypeScript بتناديه وترجّع نتيجة مريحة.

اتجرّب على ويندوز 11: ioredis 6.0 على Node 24.19، و Redis 8.10 حقيقي في Docker ([[redis:8-alpine]]).

---

## ١. تعريف الأمر

~~~ts
redis.defineCommand("takeToken", {
  numberOfKeys: 1,
  lua: $__bt ... $__bt,
});
~~~

- [[defineCommand]]: بيضيف دالة [[redis.takeToken(...)]]. أول مرة بيبعت الـ script لـ Redis، وبعد كده بيناديه بالـ SHA بتاعه ([[EVALSHA]]) عشان ميبعتش النص كل مرة. اتأكدنا: [[SCRIPT EXISTS <sha>]] رجّع [[1]].
- [[numberOfKeys: 1]]: أول argument هيبقى key (بيوصل في Lua كـ [[KEYS[1]]])، والباقي arguments عادية ([[ARGV[1]]] و [[ARGV[2]]]). Redis Cluster محتاج يعرف الـ keys عشان يبعت الأمر للـ node الصح.

---

## ٢. الـ script سطر سطر

### المدخلات

~~~lua
    local capacity = tonumber(ARGV[1])
    local rate = tonumber(ARGV[2])
~~~

[[local]] متغير في Lua. و [[tonumber]] لأن كل حاجة بتوصل للـ script **نص**. السعة القصوى، والمعدل (tokens في الثانية).

### الوقت من Redis

~~~lua
    local t = redis.call("TIME")
    local now = tonumber(t[1]) * 1000 + math.floor(tonumber(t[2]) / 1000)
~~~

[[TIME]] بيرجّع اتنين: ثواني، وميكروثواني جوه الثانية. ففي Lua [[t[1]]] الثواني (الـ arrays في Lua بتبدأ من 1 مش 0)، و [[t[2]]] الميكرو. الثواني × ١٠٠٠ + الميكرو ÷ ١٠٠٠ = الوقت بالملّي ثانية. ليه مش [[Date.now()]] من Node؟ عشان كل السيرفرات تستخدم ساعة واحدة.

### الحالة الحالية

~~~lua
    local b = redis.call("HMGET", KEYS[1], "tokens", "ts")
    local tokens = math.min(capacity, (tonumber(b[1]) or capacity) + (now - (tonumber(b[2]) or now)) * rate / 1000)
~~~

الجردل hash فيه حقلين: [[tokens]] و [[ts]] (آخر تحديث). [[HMGET]] بيجيبهم.

السطر التاني من جوه لبرة:

| الحتة | معناها |
|---|---|
| [[tonumber(b[1]) or capacity]] | الـ tokens اللي كانت. أول مرة (الـ key مش موجود) [[b[1]]] = false، فـ [[or]] بتدّي السعة كاملة: جردل جديد مليان |
| [[now - (tonumber(b[2]) or now)]] | ملّي ثواني من آخر تحديث (أول مرة صفر) |
| [[* rate / 1000]] | اللي اتملى في المدة دي |
| [[math.min(capacity, ...)]] | الجردل مبيفيضش |

### خد token لو فيه

~~~lua
    local allowed = 0
    if tokens >= 1 then tokens = tokens - 1; allowed = 1 end
~~~

### اكتب الحالة والمدة

~~~lua
    redis.call("HSET", KEYS[1], "tokens", tokens, "ts", now)
    redis.call("PEXPIRE", KEYS[1], math.ceil(capacity / rate * 1000))
~~~

[[PEXPIRE]] مدة بالملّي ثانية. [[capacity / rate]] = الثواني اللي الجردل الفاضي بيتملى فيها. بـ ١٠ و ٢: ٥ ثواني. بعدها الـ key مالوش لازمة (لو اتمسح، أول طلب هيلاقيه مليان، نفس النتيجة).

### كام يستنى، والنتيجة

~~~lua
    local waitMs = allowed == 1 and 0 or math.ceil((1 - tokens) * 1000 / rate)
    return { allowed, math.floor(tokens), waitMs }
~~~

[[a and b or c]] في Lua زي [[a ? b : c]]. لو مرفوض: ناقصنا [[1 - tokens]] عشان نوصل لـ token واحد، وده بياخد [[(1 - tokens) / rate]] ثانية. والـ [[return]] بيرجّع array، و Redis بيحوّل أرقام Lua لـ integers (بيقص الكسور)، عشان كده [[math.floor]] صريحة.

---

## ٣. الدالة

~~~ts
export async function takeToken(key: string, capacity: number, perSecond: number) {
  const [allowed, remaining, waitMs] = await (redis as any).takeToken($__btrl:tb:$__{key}$__bt, capacity, perSecond);
  return { allowed: allowed === 1, remaining, retryAfter: Math.ceil(waitMs / 1000) };
}
~~~

- [[(redis as any)]]: TypeScript ميعرفش إن [[takeToken]] اتضافت، فبنقوله «سيبني».
- [[rl:tb:key]]: prefix عشان الـ keys تبان مين بتاعها ([[rl]] = rate limit، [[tb]] = token bucket).
- [[const [a, b, c] =]]: بياخد التلات عناصر من الـ array.
- [[retryAfter]] بالثواني، مقرّب لفوق: ٤٩٣ ملّي تبقى ١ ثانية، عشان [[Retry-After]] header مبيقبلش كسور.

---

## ٤. الـ try

### ١٢ ورا بعض (سعة ١٠، معدل ٢)

~~~ts
const fmt = (r) => (r.allowed ? "✓" + r.remaining : "✗" + r.retryAfter + "s");
for (let i = 0; i < 12; i++) out.push(fmt(await takeToken("k1", 10, 2)));
~~~

~~~text الناتج
✓9 ✓8 ✓7 ✓6 ✓5 ✓4 ✓3 ✓2 ✓1 ✓0 ✗1s ✗1s
~~~

الـ ١٠ الأولانيين خدوا الجردل كله (burst)، والـ ٢ الأخيرين اترفضوا. وبصينا على الـ script نفسه وجوه Redis:

~~~text الناتج
raw: [0,0,493]
HGETALL { tokens: '0.015999999999999567', ts: '1791450573612' } PTTL 4999
~~~

- [[493]] ملّي: الطلبات خدت حوالي ٨ ملّي، فاتملى [[0.016]] token، والباقي لحد token كامل [[(1 - 0.016) / 2]] ثانية ≈ ٤٩٣ ملّي.
- [[tokens]] متخزنة بكسور، عشان كده المعدل بيبقى دقيق.
- [[PTTL]] الملّي الباقية للـ key، تقريبًا ٥٠٠٠.

### بعد ثانية

~~~text الناتج
after 1s: ✓1 ✓0 ✗1s
~~~

ثانية × ٢ في الثانية = ٢ tokens، وبعدهم رفض.

### ٥٠ مع بعض (سعة ١٠، معدل صغير جدًا)

~~~ts
const par = await Promise.all(Array.from({ length: 50 }, () => takeToken("k2", 10, 0.001)));
~~~

~~~text الناتج
50 parallel, allowed: 10 retryAfter of a rejected: 1000
~~~

١٠ بالظبط، لأن Redis بينفّذ الـ script كله قبل أي أمر تاني. و [[retryAfter]] ١٠٠٠ ثانية لأن المعدل ٠.٠٠١ في الثانية.

### نفس الفكرة من غير Lua

عشان نشوف ليه Lua، كتبنا نفس المنطق بـ [[GET]] في Node وبعدين [[SET]]، وشغّلناه ٥٠ مع بعض ٣ مرات:

~~~text الناتج
naive GET/SET, allowed out of 50 (3 runs): 50, 50, 50
~~~

الـ ٥٠ قروا [[null]] (جردل مليان) قبل ما أي واحد يكتب، فالكل عدّى. ده الـ race condition اللي الـ script بيقفله.

---

## الخلاصة

| الخطوة | في الـ script |
|---|---|
| الوقت | [[TIME]] من Redis، بالملّي |
| الحالة | [[HMGET tokens ts]]، وأول مرة جردل مليان |
| الملي | [[(now - ts) * rate / 1000]] بحد أقصى السعة |
| القرار | فيه token؟ خده |
| الكتابة | [[HSET]] و [[PEXPIRE]] بمدة الملي الكامل |
| الرد | [[allowed, remaining, waitMs]] |

- القراية والحسبة والكتابة في script واحد = atomic.
- الوقت من Redis، مش من كل سيرفر.
- الـ key بيمسح نفسه، فمبيتراكمش.`,
          lines: [
            "عرّف أمر جديد في ioredis من Lua script.",
            "بياخد key واحد (الجردل).",
            "الـ script:",
            "السعة القصوى.",
            "المعدل: tokens في الثانية.",
            "الوقت من ساعة Redis (ثواني وميكروثواني)...",
            "...بالملّي ثانية.",
            "هات الـ tokens ووقت آخر تحديث.",
            "الحالي = اللي كان + اللي اتملى من ساعتها، بحد أقصى السعة. أول مرة: الجردل مليان.",
            "مرفوض افتراضيًا.",
            "فيه token؟ خده واسمح.",
            "خزّن الحالة الجديدة.",
            "امسح الـ key بعد ما يتملى كله (مالوش لازمة بعدها).",
            "لو مرفوض: قد إيه لحد token واحد.",
            "رجّع: مسموح؟ وكام باقي، وقد إيه يستنى.",
            "قفلة الـ script.",
            "قفلة.",
            "الدالة اللي هتستخدمها.",
            "نادي الأمر بالـ key والإعدادات.",
            "رجّع النتيجة بشكل مريح، و retryAfter بالثواني.",
            "قفلة."
          ],
          sol: R`١٢ ورا بعض بـ capacity ١٠ ومعدل ٢: أول ١٠ مسموحين والباقي بينزل من ٩ لـ ٠، والـ ٢ الأخيرين مرفوضين بـ [[retryAfter: 1]]:

[[✓9 ✓8 ✓7 ✓6 ✓5 ✓4 ✓3 ✓2 ✓1 ✓0 ✗1s ✗1s]]

بعد ثانية: اتملى حوالي ٢ tokens، فأول ٢ مسموحين والتالت مرفوض: [[✓1 ✓0 ✗1s]].

الـ ٥٠ بالتوازي: ١٠ بالظبط اتسمحوا. ده دليل إن الـ Lua script atomic. لو عملتها GET/SET من Node هتلاقي الرقم أكبر من ١٠ وبيتغير من مرة للتانية.

ولو كل الطلبات مرفوضة من الأول: غالبًا [[ARGV]] بتوصل نص ومش متحولة بـ [[tonumber]]، أو الـ rate صفر.`
        },
        {
          cmd: "sliding window",
          title: "حد لكل دقيقة من غير ثغرة حدود النافذة",
          desc: R`أبسط rate limit: fixed window. عداد لكل دقيقة ([[INCR]] على key فيه رقم الدقيقة)، ولو عدّى الحد 429. المشكلة: ١٠٠ طلب في آخر ثانية من دقيقة، و ١٠٠ في أول ثانية من الدقيقة اللي بعدها = ٢٠٠ في ثانيتين والحد ١٠٠.

الـ sliding window counter بيحل ده بتقريب ذكي: بيبص على عداد الدقيقة الحالية وعداد اللي فاتت، ويحسب «كام طلب في آخر ٦٠ ثانية» بوزن العداد القديم حسب الجزء اللي لسه جوه النافذة.`,
          example: R`export async function slidingWindow(key: string, limit: number, windowSec: number) {
  const nowSec = Date.now() / 1000;
  const w = Math.floor(nowSec / windowSec);
  const cur = $__btrl:sw:$__{key}:$__{w}$__bt;
  const prev = $__btrl:sw:$__{key}:$__{w - 1}$__bt;
  const [[, count], , [, prevCount]] = (await redis.multi().incr(cur).expire(cur, windowSec * 2).get(prev).exec())!;
  const elapsed = (nowSec % windowSec) / windowSec;
  const estimated = Number(prevCount ?? 0) * (1 - elapsed) + Number(count);
  if (estimated > limit) await redis.decr(cur);
  return { allowed: estimated <= limit, remaining: Math.max(0, Math.floor(limit - estimated)), resetSec: Math.ceil(windowSec - (nowSec % windowSec)) };
}`,
          try: R`نادي [[slidingWindow("u1", 5, 2)]] ٧ مرات ورا بعض، واستنى ٣ ثواني ونادي ٤ كمان. وبعدين شيل سطر الـ [[decr]] وكرر، وقارن التانية.`,
          flag: "script",
          deep: {
            why: "الحد «١٠٠ في الدقيقة» معناه عند العميل «في أي ٦٠ ثانية». الـ fixed window بيسمح بضعف الحد عند حدود الدقايق، والمهاجم بيعرف كده ويوقّت طلباته. والـ sliding log الكامل (تخزين وقت كل طلب) دقيق بس بياكل ذاكرة مع كل طلب.",
            how: R`التقريب: لو احنا في الثانية ١٥ من الدقيقة الحالية، يبقى آخر ٦٠ ثانية = ١٥ ثانية من الحالية + ٤٥ ثانية (٧٥٪) من اللي فاتت. فالتقدير = عداد الحالية + عداد اللي فاتت × ٠.٧٥. ده بيفترض إن طلبات الدقيقة اللي فاتت كانت موزعة بالتساوي، وفي الواقع الخطأ صغير (Cloudflare بتستخدم الطريقة دي وبتقول إن الخطأ في أقل من ١٪ من الطلبات تقريبًا).

[[MULTI]] هنا (مش Lua): الـ [[INCR]] نفسه atomic ويرجّع العدد بعد الزيادة، فكل طلب واخد رقمه الخاص، ومفيش اتنين بياخدوا نفس الرقم. [[EXPIRE]] بضعف النافذة عشان عداد الدقيقة الحالية لسه هيتقري كـ «اللي فاتت» في الدقيقة الجاية.

الـ [[DECR]] على الرفض: من غيره الطلبات المرفوضة بتتعد، والعميل اللي بيضرب بسرعة بيفضل مقفول حتى لو بطّل، لأن عداده بيكبر من الرفض نفسه. فيه ناس عايزين ده عمدًا (عقاب للي بيضرب). اختار عن قصد.

المقارنة:

fixed window: أبسط وأرخص، بس فيه burst الحدود.
sliding window counter: رخيص (عدادين)، ودقيق كفاية، ومفيش burst حقيقي.
sliding log (sorted set بوقت كل طلب): دقيق تمامًا، بس الذاكرة بتكبر مع عدد الطلبات.
token bucket: بيسمح بـ burst محدد عمدًا، وأنسب لـ «متوسط + سماح».

والـ fail mode: لو Redis وقع، تسمح بكل الطلبات (fail open، الخدمة شغالة بس من غير حماية) ولا ترفضها (fail closed)؟ لأغلب الـ APIs fail open مع alert، وللـ login والحاجات الغالية fail closed.`,
            when: "حدود «X في الدقيقة أو الساعة» على endpoints عامة، وحماية login و signup و reset password من التخمين.",
            mistakes: R`fixed window على login («٥ محاولات في الدقيقة» تبقى ١٠ في ثانيتين). والوقت من ساعة كل سيرفر في الحسبة ([[Date.now()]] هنا بيحدد النافذة، فساعات السيرفرات لازم تبقى متزامنة بـ NTP، أو انقل الحسبة لـ Lua بـ TIME). ونسيان expire. وتحسب بـ GET وبعدين INCR منفصلين.`
          },
          teach: R`## عدادين وحسبة صغيرة بدل ما تخزّن كل طلب

الدالة بتقسم الوقت لنوافذ ثابتة (كل [[windowSec]] ثانية نافذة ليها رقم)، وبتزوّد عداد النافذة الحالية، وتقرا عداد اللي قبلها. وبعدين بتقدّر «كام طلب في آخر [[windowSec]] ثانية» = كل الحالية + جزء من القديمة على قد ما لسه داخل في النافذة المتزحلقة.

اتجرّب على ويندوز 11: ioredis 6.0 على Node 24.19، و Redis 8.10 في Docker ([[redis:8-alpine]]). عشان النتايج تتكرر، التجربة بتستنى لحد أول نافذة جديدة قبل ما تبدأ، وطبعنا الحسبة من جوه في كل نداء.

---

## ١. رقم النافذة

~~~ts
export async function slidingWindow(key: string, limit: number, windowSec: number) {
  const nowSec = Date.now() / 1000;
  const w = Math.floor(nowSec / windowSec);
~~~

- [[nowSec]]: الثواني من ١٩٧٠ بكسور (مثلًا [[1791450593.072]]).
- [[Math.floor(nowSec / windowSec)]]: رقم النافذة. بنافذة ثانيتين: كل الأوقات من [[...592.000]] لـ [[...593.999]] بتدّي نفس الرقم [[895725296]].

~~~ts
  const cur = $__btrl:sw:$__{key}:$__{w}$__bt;
  const prev = $__btrl:sw:$__{key}:$__{w - 1}$__bt;
~~~

اسم عداد الحالية واللي قبلها، مثلًا [[rl:sw:u1:895725296]] و [[rl:sw:u1:895725295]] ([[sw]] = sliding window).

---

## ٢. أمر واحد لـ Redis

~~~ts
  const [[, count], , [, prevCount]] = (await redis.multi().incr(cur).expire(cur, windowSec * 2).get(prev).exec())!;
~~~

### من جوه: [[multi()...exec()]]

[[multi()]] بيبدأ transaction: الأوامر بتتجمّع وتتبعت مرة واحدة، و Redis بينفّذهم ورا بعض من غير ما حاجة تدخل في النص:

| الأمر | بيعمل | بيرجّع |
|---|---|---|
| [[INCR cur]] | زوّد عداد الحالية ١ (لو مش موجود يبدأ من ٠) | العدد بعد الزيادة |
| [[EXPIRE cur windowSec*2]] | خليه يعيش نافذتين | ١ |
| [[GET prev]] | عداد اللي قبلها | رقم كنص، أو [[null]] |

ليه نافذتين؟ عداد الحالية هيتقري كـ «اللي فاتت» طول النافذة الجاية.

### من برّه: الـ destructuring

[[exec()]] في ioredis بيرجّع array فيها لكل أمر [[[error, result]]]:

~~~text شكل ناتج exec
[ [null, 3], [null, 1], [null, "5"] ]
~~~

و [[[[, count], , [, prevCount]]]] بيفك ده:

- [[[, count]]]: من أول عنصر، سيب الأول (الـ error) وخد التاني.
- الفاصلة لوحدها [[, ,]]: سيب العنصر التاني كله (نتيجة EXPIRE).
- [[[, prevCount]]]: من التالت، خد النتيجة.
- [[!]] في الآخر: TypeScript بيقول إن [[exec()]] ممكن يرجّع [[null]] (لو الـ transaction اتلغت بـ WATCH)، و [[!]] بتقوله «مش هنا».

---

## ٣. التقدير

~~~ts
  const elapsed = (nowSec % windowSec) / windowSec;
  const estimated = Number(prevCount ?? 0) * (1 - elapsed) + Number(count);
~~~

- [[nowSec % windowSec]]: [[%]] باقي القسمة، يعني الثواني اللي عدّت جوه النافذة الحالية. قسمتها على طول النافذة = نسبة من ٠ لـ ١.
- [[1 - elapsed]]: الجزء من النافذة اللي فاتت اللي لسه جوه آخر [[windowSec]] ثانية.
- [[prevCount ?? 0]]: لو مفيش نافذة قبلها، صفر. و [[Number()]] لأن [[GET]] بيرجّع نص.

مثال حقيقي من التجربة (الحد ٥ في ثانيتين):

~~~text نداء من التجربة
{ nowSec: '1791450593.072', w: 895725296, count: 1, prevCount: '5', elapsed: '0.536', estimated: '3.320' }
~~~

[[5 × (1 - 0.536) + 1 = 2.32 + 1 = 3.32]]: احنا في نص النافذة الحالية تقريبًا، فنص طلبات اللي فاتت لسه محسوبة.

---

## ٤. القرار

~~~ts
  if (estimated > limit) await redis.decr(cur);
  return { allowed: estimated <= limit, remaining: Math.max(0, Math.floor(limit - estimated)), resetSec: Math.ceil(windowSec - (nowSec % windowSec)) };
}
~~~

- مرفوض؟ [[DECR]] بيشيل الزيادة اللي عملناها، فالرفض ميتحسبش.
- [[remaining]]: الباقي مقرّب لتحت، ومش أقل من صفر.
- [[resetSec]]: الثواني لحد ما النافذة الحالية تخلص.

---

## ٥. الـ try

### ٧ ورا بعض (حد ٥ في ثانيتين)

~~~text الناتج
7 calls: ✓4 ✓3 ✓2 ✓1 ✓0 ✗0 ✗0
keys: [ 'rl:sw:u1:895725295' ] count: 5 ttl: 4
~~~

العداد ٥ مش ٧: الاتنين المرفوضين اتشالوا بالـ [[DECR]]. و [[ttl]] ٤ ثواني = نافذتين.

### بعد ٣ ثواني، ٤ كمان

~~~text الناتج (الحسبة لكل نداء)
count: 1  prevCount: 5  elapsed: 0.536  estimated: 3.320   ✓1
count: 2  prevCount: 5  elapsed: 0.537  estimated: 4.315   ✓0
count: 3  prevCount: 5  elapsed: 0.537  estimated: 5.315   ✗0   (اتعمل DECR)
count: 3  prevCount: 5  elapsed: 0.538  estimated: 5.310   ✗0
after wait: ✓1 ✓0 ✗0 ✗0
~~~

طلبين بس، لأن النافذة القديمة لسه داخلة بـ [[2.32]] طلب. لو كنا في آخر النافذة (elapsed قريب من ١)، كان هيتسمح بأكتر.

### من غير سطر الـ [[decr]]

~~~text الناتج
7 calls: ✓4 ✓3 ✓2 ✓1 ✓0 ✗0 ✗0
keys: [ 'rl:sw:u1:895725297' ] count: 7 ttl: 4
count: 1  prevCount: 7  elapsed: 0.538  estimated: 4.237   ✓0
count: 2  prevCount: 7  elapsed: 0.538  estimated: 5.231   ✗0
count: 3  prevCount: 7  elapsed: 0.539  estimated: 6.227   ✗0
count: 4  prevCount: 7  elapsed: 0.539  estimated: 7.224   ✗0
after wait: ✓0 ✗0 ✗0 ✗0
~~~

القديمة بقت ٧ (المرفوضين اتعدّوا)، والجديدة كمان بتكبر مع كل رفض. فطلب واحد بس عدّى بدل اتنين. ولما جرّبنا بعد ثانيتين بس (أول النافذة الجديدة)، الحالتين اترفضوا كلهم، لأن القديمة لسه داخلة بحوالي ٩٦٪ من وزنها.

---

## الخلاصة

| الخطوة | الكود |
|---|---|
| رقم النافذة | [[Math.floor(nowSec / windowSec)]] |
| زوّد وهات القديمة | [[multi().incr().expire().get().exec()]] |
| نسبة اللي عدّى | [[(nowSec % windowSec) / windowSec]] |
| التقدير | [[prev × (1 - elapsed) + count]] |
| مرفوض | [[DECR]] عشان الرفض ميتعدّش |

- عدادين لكل key بدل وقت كل طلب.
- [[EXPIRE]] بنافذتين، مش واحدة.
- [[Date.now()]] هنا من ساعة السيرفر، فالسيرفرات لازم ساعاتها متزامنة (NTP).`,
          lines: [
            "الحد لكل key في نافذة بالثواني.",
            "الوقت دلوقتي بالثواني (بكسور).",
            "رقم النافذة الحالية.",
            "عداد النافذة الحالية.",
            "عداد اللي فاتت.",
            "في أمر واحد لـ Redis: زوّد الحالية وخد عددها، وخلّيها تعيش نافذتين، وهات عداد اللي فاتت.",
            "قد إيه عدّى من النافذة الحالية (من ٠ لـ ١).",
            "التقدير: الجزء اللي لسه جوه النافذة من القديمة + كل الحالية.",
            "مرفوض؟ متحسبوش، عشان الرفض نفسه ميطوّلش القفل.",
            "رجّع: مسموح؟ وكام باقي، وإمتى النافذة الحالية تخلص.",
            "قفلة."
          ],
          sol: R`أول ٧ بحد ٥ في ثانيتين: [[✓4 ✓3 ✓2 ✓1 ✓0 ✗0 ✗0]].

بعد ٣ ثواني: النافذة اتغيرت، والقديمة (فيها ٥ بس لأن المرفوضين اتشالوا بالـ decr) بتتحسب بجزء من وزنها، فيتسمح بطلبين أو تلاتة حسب اللحظة بالظبط. في تجربتنا كنا في نص النافذة الجديدة تقريبًا، فطلع [[✓1 ✓0 ✗0 ✗0]].

من غير الـ decr: القديمة فيها ٧ (المرفوضين اتعدّوا)، فالتقدير بيبدأ أعلى، وفي نفس اللحظة عدّى طلب واحد بس ([[✓0 ✗0 ✗0 ✗0]])، ولو جربت بعد ثانيتين بس كل التانية بتترفض. ده اللي قصدنا بـ «الرفض بيطوّل القفل».`
        },
        {
          cmd: "quota لكل plan",
          title: "حدود مختلفة لكل خطة، وheaders بتقول للعميل وضعه",
          desc: R`في API بتبيعه، الحدود جزء من المنتج: الخطة المجانية ١٠ طلبات في الثانية و ١٠٠٠ في الشهر، والـ Pro أكتر بكتير. فيه نوعين: rate limit قصير (حماية السيرفر، burst) و quota طويلة (شهرية، مربوطة بالفلوس).

والعميل لازم يعرف هو فين من غير ما يخمّن: headers في كل رد بتقول الحد وكام باقي، و 429 معاها [[Retry-After]].`,
          example: R`const PLANS = {
  free: { burst: 10, perSecond: 1, monthly: 1_000 },
  pro: { burst: 100, perSecond: 20, monthly: 1_000_000 },
} as const;
export async function planLimits(req: Request, res: Response, next: NextFunction) {
  const plan = PLANS[req.apiKey.plan];
  const rl = await takeToken(req.apiKey.id, plan.burst, plan.perSecond);
  res.set("RateLimit-Policy", $__bt"burst";q=$__{plan.burst};w=$__{Math.ceil(plan.burst / plan.perSecond)}$__bt);
  res.set("RateLimit", $__bt"burst";r=$__{rl.remaining};t=$__{rl.retryAfter}$__bt);
  if (!rl.allowed) return res.status(429).set("Retry-After", String(rl.retryAfter)).json({ title: "Too Many Requests", status: 429 });
  const qKey = $__btquota:$__{req.apiKey.id}:$__{new Date().toISOString().slice(0, 7)}$__bt;
  const [[, used]] = (await redis.multi().incr(qKey).expire(qKey, 32 * 86400, "NX").exec())!;
  res.set("X-Quota-Remaining", String(Math.max(0, plan.monthly - Number(used))));
  if (Number(used) > plan.monthly) return res.status(429).json({ title: "Monthly quota exceeded", status: 429, detail: $__btPlan $__{req.apiKey.plan}: $__{plan.monthly} requests/month$__bt });
  next();
}`,
          try: R`حط الـ middleware على endpoint، وابعت ١٢ طلب بمفتاح free بسرعة ([[for i in $(seq 12); do curl -s -o /dev/null -w '%{http_code} ' ...; done]]). وبعدين [[curl -i]] وشوف الـ headers في حالة 429، واطلب بمفتاح pro وقارن.`,
          flag: "script",
          deep: {
            why: "من غير headers، العميل بيكتشف الحد لما يقع فيه، وبيعمل retry فوري فيتقفل أكتر. ومن غير quota مربوطة بالخطة، مفيش فرق بين المجاني والمدفوع، ومفيش سبب حد يرقّي. وأي API فيه AI أو SMS لازم quota، وإلا عميل مجاني واحد يصرف ميزانية الشهر في يوم.",
            how: R`طبقتين بسبب مختلف:

rate limit (token bucket من درسين فاتوا): بيحمي السيرفر من الضغط اللحظي. الرفض مؤقت، و [[Retry-After]] بالثواني.

quota شهرية: عداد لكل مفتاح لكل شهر ([[quota:key:2026-09]]). [[INCR]] atomic، و [[EXPIRE ... NX]] (Redis 7 وأحدث) بيحط مدة للـ key أول مرة بس، فالعداد بيتمسح لوحده بعد الشهر. الرفض هنا مش «استنى ثانية»، ده «رقّي أو استنى الشهر الجاي»، عشان كده الرسالة مختلفة.

الـ headers: فيه draft في IETF لـ headers موحّدة: [[RateLimit-Policy]] بيوصف السياسة ([[q]] الحصة، و [[w]] النافذة بالثواني)، و [[RateLimit]] بيوصف الحالة ([[r]] الباقي، و [[t]] الثواني لحد ما يتجدد). الشكل اتغير بين نسخ الـ draft (النسخ القديمة كانت [[RateLimit-Limit]] و [[RateLimit-Remaining]] و [[RateLimit-Reset]] منفصلين، ودي اللي GitHub وغيره بيبعتوها بـ [[X-]] قبلها)، فاختار شكل وثبّته في التوثيق. [[Retry-After]] نفسه standard قديم ومفهوم لكل المكتبات.

فين تخزّن الـ usage للفواتير؟ Redis للعدّ السريع والحد، بس الأرقام اللي بتحاسب بيها لازم تتسجل في القاعدة (job كل ساعة ينقل العدادات، أو event لكل طلب في جدول usage). Redis مش مصدر الحقيقة للفلوس.

الحد لكل endpoint: [[GET /things]] رخيص، و [[POST /reports]] غالي. ممكن تدّي كل endpoint «تكلفة» وتسحب من الجردل أكتر من token، أو quota منفصلة للحاجات الغالية.

وافصل الـ quota عن الـ rate limit في الـ monitoring: عميل بيوصل للـ quota = فرصة بيع، وعميل بيوصل للـ rate limit كتير = يمكن الـ SDK بتاعه بيعمل retry غلط.`,
            when: "أي API ليه خطط أو عملاء خارجيين، أو أي ميزة بتكلّفك فلوس لكل استخدام.",
            mistakes: R`429 من غير [[Retry-After]]، فالعميل بيعيد فورًا. ورسالة واحدة للـ rate limit والـ quota فالعميل ميعرفش يستنى ثانية ولا شهر. والـ quota في Redis بس من غير سجل في القاعدة، ويوم Redis يقع تضيع أرقام الفواتير. وتعدّ الطلبات اللي فشلت بـ 5xx من عندك في quota العميل. و EXPIRE من غير NX فكل طلب بيمدّ عمر الـ key ومبيتمسحش أبدًا.`
          },
          teach: R`## طبقتين في middleware واحد: ثانية بثانية، وشهر بشهر

[[planLimits]] middleware بيشتغل بعد التحقق من الـ API key. بيجيب حدود خطة العميل، وبيعدّي الطلب على حاجتين: token bucket للسرعة اللحظية (من درسين فاتوا)، وعداد شهري للـ quota. وفي الطريق بيحط headers بتقول للعميل هو فين.

اتجرّب على ويندوز 11: Express 5.2.1 و ioredis 6.0 على Node 24.19 (بورت ٦٠١٢)، و Redis 8.10 في Docker. [[takeToken]] هي بتاعة درس [[token bucket في Redis]] بالظبط، و [[req.apiKey]] كان بيتحط من middleware صغير بيقرا [[Bearer sk_free]] أو [[Bearer sk_pro]] (المفاتيح الحقيقية في درس [[API keys]]). و curl 8.22 من Git Bash، و PowerShell 7.6.

---

## ١. الخطط

~~~ts
const PLANS = {
  free: { burst: 10, perSecond: 1, monthly: 1_000 },
  pro: { burst: 100, perSecond: 20, monthly: 1_000_000 },
} as const;
~~~

- [[burst]]: سعة الجردل (كام طلب مرة واحدة).
- [[perSecond]]: معدل الملي.
- [[monthly]]: الـ quota الشهرية. و [[1_000_000]] = مليون، الـ [[_]] للقراية بس.
- [[as const]]: بيخلي TypeScript يعامل القيم كثابتة، فـ [[PLANS["free"]]] نوعه بالظبط القيم دي، و [[req.apiKey.plan]] لازم يبقى [["free"]] أو [["pro"]].

---

## ٢. الـ rate limit والـ headers

~~~ts
export async function planLimits(req: Request, res: Response, next: NextFunction) {
  const plan = PLANS[req.apiKey.plan];
  const rl = await takeToken(req.apiKey.id, plan.burst, plan.perSecond);
~~~

[[next]] الدالة اللي بتعدّي للـ middleware أو الـ handler اللي بعده. والجردل باسم الـ key ([[rl:tb:key_free]] في Redis)، مش الـ IP.

~~~ts
  res.set("RateLimit-Policy", $__bt"burst";q=$__{plan.burst};w=$__{Math.ceil(plan.burst / plan.perSecond)}$__bt);
  res.set("RateLimit", $__bt"burst";r=$__{rl.remaining};t=$__{rl.retryAfter}$__bt);
~~~

شكل الـ headers من draft الـ IETF ([[draft-ietf-httpapi-ratelimit-headers]]):

| الجزء | معناه | free |
|---|---|---|
| [["burst"]] | اسم السياسة (ممكن يبقى فيه أكتر من واحدة) | |
| [[q=10]] | quota: الحصة | ١٠ |
| [[w=10]] | window: الثواني اللي الحصة بتتملى فيها كلها ([[10 / 1]]) | ١٠ |
| [[r=]] | remaining: الباقي دلوقتي | |
| [[t=]] | الثواني لحد ما يبقى فيه تاني | |

~~~ts
  if (!rl.allowed) return res.status(429).set("Retry-After", String(rl.retryAfter)).json({ title: "Too Many Requests", status: 429 });
~~~

[[Retry-After]] header قديم ومعروف لكل المكتبات: «استنى كام ثانية». و [[String(...)]] لأن قيم الـ headers نصوص.

---

## ٣. الـ quota الشهرية

~~~ts
  const qKey = $__btquota:$__{req.apiKey.id}:$__{new Date().toISOString().slice(0, 7)}$__bt;
~~~

[[new Date().toISOString()]] بيرجّع [[2026-10-08T09:13:43.272Z]]، و [[.slice(0, 7)]] أول ٧ حروف: [[2026-10]]. فالـ key [[quota:key_free:2026-10]]، وأول الشهر الجاي key جديد يبدأ من صفر. (ده بتوقيت UTC.)

~~~ts
  const [[, used]] = (await redis.multi().incr(qKey).expire(qKey, 32 * 86400, "NX").exec())!;
~~~

- [[INCR]]: زوّد ورجّع العدد الجديد. و [[[[, used]]]] بياخد نتيجة أول أمر من [[[[null, 7], [null, 1]]]].
- [[EXPIRE key 2764800 NX]]: [[32 * 86400]] = ٣٢ يوم بالثواني. و [[NX]] (Redis 7 وأحدث): حط المدة **بس لو مفيش مدة**. فالمدة بتتحط مع أول طلب في الشهر ومتتمدّش مع كل طلب. ليه ٣٢؟ أطول شهر ٣١ يوم، والزيادة سماح.

~~~ts
  res.set("X-Quota-Remaining", String(Math.max(0, plan.monthly - Number(used))));
  if (Number(used) > plan.monthly) return res.status(429).json({ title: "Monthly quota exceeded", status: 429, detail: $__btPlan $__{req.apiKey.plan}: $__{plan.monthly} requests/month$__bt });
  next();
}
~~~

[[>]] مش [[>=]]: الطلب رقم ١٠٠٠ مسموح، والـ ١٠٠١ لأ. والرد هنا من غير [[Retry-After]] ورسالته مختلفة، لأن الحل مش «استنى ثانية».

---

## ٤. الـ try

~~~bash
for i in $(seq 12); do curl -s -o /dev/null -w '%{http_code} ' -H 'Authorization: Bearer sk_free' localhost:6012/v1/orders; done; echo
~~~

- [[$(seq 12)]]: الأرقام من ١ لـ ١٢، فالـ loop بيلف ١٢ مرة.
- [[-o /dev/null]]: ارمي الـ body.
- [[-w '%{http_code} ']]: اطبع الـ status بس ومسافة.

~~~text الناتج
200 200 200 200 200 200 200 200 200 200 429 429
~~~

وبعدها على طول [[curl -si]] ([[-i]] بيطبع الـ headers):

~~~text الناتج
HTTP/1.1 429 Too Many Requests
RateLimit-Policy: "burst";q=10;w=10
RateLimit: "burst";r=0;t=1
Retry-After: 1
Content-Type: application/json; charset=utf-8
Content-Length: 42

{"title":"Too Many Requests","status":429}
~~~

وبمفتاح pro:

~~~text الناتج
HTTP/1.1 200 OK
RateLimit-Policy: "burst";q=100;w=5
RateLimit: "burst";r=99;t=0
X-Quota-Remaining: 999999
~~~

[[w=5]] لأن [[100 / 20]]. وجوه Redis:

~~~bash
docker exec teach-apis0304-redis redis-cli get quota:key_free:2026-10
docker exec teach-apis0304-redis redis-cli ttl quota:key_free:2026-10
~~~

~~~text الناتج
10
2764799
~~~

العداد ١٠ مش ١٣: الطلبات اللي اترفضت من الـ rate limit مبتوصلش للـ quota. و [[ttl]] حوالي ٣٢ يوم.

### الـ quota نفسها

شغّلنا السيرفر بـ [[monthly: 3]] للخطة المجانية عشان نوصل للحد بسرعة:

~~~text الناتج
X-Quota-Remaining: 2 [{"id":"9001"}] 200
X-Quota-Remaining: 1 [{"id":"9001"}] 200
X-Quota-Remaining: 0 [{"id":"9001"}] 200
X-Quota-Remaining: 0 {"title":"Monthly quota exceeded","status":429,"detail":"Plan free: 3 requests/month"} 429
~~~

و [[ttl]] بعد ٤ طلبات فضل [[2764800]]: الـ [[NX]] منعت كل طلب إنه يمدّ المدة.

### من PowerShell

~~~powershell
$h = @{ Authorization = 'Bearer sk_free' }
1..12 | % { (Invoke-WebRequest http://localhost:6012/v1/orders -Headers $h -SkipHttpErrorCheck).StatusCode } | Join-String -Separator ' '
$r = Invoke-WebRequest http://localhost:6012/v1/orders -Headers $h -SkipHttpErrorCheck
$r.Headers['Retry-After']; $r.Headers['RateLimit']
~~~

- [[@{ }]] hashtable للـ headers. و [[%]] اختصار [[ForEach-Object]].
- [[-SkipHttpErrorCheck]] (PowerShell 7 بس): من غيره 429 بيرمي error بدل ما يرجّع الرد.
- [[Join-String]] بيلزق النتايج في سطر.

~~~text الناتج (PowerShell 7.6)
200 200 200 200 200 200 200 200 200 200 429 429
1
"burst";r=0;t=1
~~~

---

## الخلاصة

| الطبقة | الحد | الـ key في Redis | الرد لو عدّى |
|---|---|---|---|
| rate limit | [[burst]] و [[perSecond]] | [[rl:tb:<id>]] | 429 + [[Retry-After]] |
| quota | [[monthly]] | [[quota:<id>:2026-10]] | 429 + «رقّي أو استنى الشهر» |

- الـ headers في كل رد، مش في الرفض بس.
- [[EXPIRE ... NX]] عشان المدة تتحط مرة.
- Redis للعدّ، والأرقام اللي بتحاسب بيها تتسجل في القاعدة.`,
          lines: [
            "الخطط في مكان واحد.",
            "المجانية: burst ١٠، وواحد في الثانية، وألف في الشهر.",
            "Pro.",
            "قفلة.",
            "middleware بعد الـ auth بالـ API key (req.apiKey موجود).",
            "حدود خطة العميل ده.",
            "rate limit قصير بالـ token bucket.",
            "headers السياسة: الحصة ومدة ما الجردل يتملى.",
            "headers الحالة: كام باقي، وبعد كام ثانية.",
            "مرفوض؟ 429 و Retry-After، بشكل problem+json.",
            "key الـ quota: المفتاح والشهر (2026-09).",
            "زوّد العداد، وحط له مدة أول مرة بس (NX).",
            "قول للعميل كام باقي في الشهر.",
            "خلص الشهر؟ 429 برسالة مختلفة: دي مش «استنى ثانية».",
            "كمّل.",
            "قفلة."
          ],
          sol: R`بمفتاح free: [[200]] عشر مرات وبعدين [[429 429]]. و [[curl -i]] في حالة 429 بيطلّع:

[[RateLimit-Policy: "burst";q=10;w=10]]
[[RateLimit: "burst";r=0;t=1]]
[[Retry-After: 1]]

وبمفتاح pro: [[RateLimit-Policy: "burst";q=100;w=5]] و [[RateLimit: "burst";r=99;t=0]] و [[X-Quota-Remaining: 999999]].

لو [[expire ... NX]] رمى [[ERR syntax error]]، الـ Redis عندك أقدم من 7. يا ترقّيه (الـ lab بتاع التاب ده redis:8)، يا تعمل [[EXPIRE]] بس لما [[used === 1]].`
        }
      ]
    }
]);
