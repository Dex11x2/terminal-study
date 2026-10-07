// تكملة تاب api: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/api/01.js (شرح حقول الدرس في أوله)
MORE("api", [
    {
      t: "Auth: انت مين؟",
      l: 2,
      n: "باسورد متخزن hash، وتوكن أو session تثبت إنك انت، وكوكيز بالإعدادات الصح",
      items: [
        {
          cmd: "bcrypt",
          title: "احفظ الباسورد بطريقة محدش يقدر يرجّعها",
          desc: R`الباسورد عمره ما يتحفظ زي ما هو ولا مشفّر بمفتاح: بيتحفظ hash بدالة اتجاه واحد، وعند الـ login بتقارن.

bcrypt معمول مخصوص للباسوردات: بطيء عن قصد (الـ cost)، وبيضيف salt عشوائي لكل باسورد. cost بين 10 و 12 شائع، واختار أعلى رقم السيرفر بتاعك يستحمله (حوالي ربع ثانية للـ hash الواحد).`,
          example: R`import bcrypt from "bcrypt";

const hash = await bcrypt.hash("MyS3cret!", 12);
console.log(hash);
// $2b$12$L1rSfyd2U5SuHcCfeeLVIu3pk8VYb8uJI3OmMcHt7J/RBXlUSq//.

console.log(await bcrypt.compare("MyS3cret!", hash));
console.log(await bcrypt.compare("wrong", hash));
// true
// false`,
          try: R`اعمل hash لنفس الباسورد مرتين واتأكد إنهم مختلفين، وإن compare بيرجّع true للاتنين. وبعدين قيس الوقت بـ [[console.time]] مع cost 10 و 12 و 14، وشوف كل زيادة ١ بتعمل إيه.`,
          flag: "script",
          deep: {
            why: "الداتابيز بتتسرّب: باك أب منسي، أو SQL injection، أو موظف. لو الباسوردات متخزنة نص، كل اليوزرز اتكشفوا، ومعظمهم بيستخدموا نفس الباسورد في الإيميل والبنك. الـ hash البطيء بيخلي الباسورد القوي شبه مستحيل يترجع، والضعيف ياخد وقت.",
            how: R`الـ hash السريع (زي SHA-256) معمول للسرعة: كارت شاشة يجرّب مليارات الباسوردات في الثانية. bcrypt بيعيد الحسبة [[2^cost]] مرة، فـ cost 12 يعني ٤٠٩٦ دورة، وكل زيادة ١ بتضاعف الوقت. انت بتدفع ربع ثانية مرة عند الـ login، والمهاجم بيدفعها مع كل تخمينة.

الـ salt: ١٦ بايت عشوائي بيتولد مع كل hash. فاتنين باسوردهم «123456» الـ hash بتاعهم مختلف، والمهاجم ميقدرش يستخدم جداول جاهزة (rainbow tables) ولا يكسر الكل مرة واحدة. والـ salt والـ cost محفوظين جوه النص نفسه: [[$2b$12$]] وبعدها ٢٢ حرف salt وبعدها الـ hash. عشان كده [[compare]] مش محتاج تديله salt.

[[bcrypt.hash]] الـ async بيشتغل في thread pool بتاع libuv، فالـ event loop فاضي يخدم طلبات تانية. [[hashSync]] بيوقف السيرفر كله الربع ثانية دي. و [[bcryptjs]] مكتوبة JavaScript فبتشتغل على الـ thread الرئيسي حتى الـ async بتاعها (بتقسّم الشغل بس)، فهي أبطأ وبتزاحم الطلبات.

حد bcrypt: أول ٧٢ بايت بس من الباسورد بيتحسبوا والباقي بيتجاهل. و OWASP بتفضّل Argon2id للمشاريع الجديدة، و bcrypt لسه مقبول ومنتشر.`,
            when: "أي تسجيل بباسورد. وراجع الـ cost كل كام سنة مع تطور الأجهزة: عند login ناجح، لو الـ hash القديم الـ cost بتاعه أقل، اعمله hash جديد.",
            mistakes: R`في مشروع حقيقي كان الـ User model فيه حقل [[plainPassword]] جنب الـ hash، عشان endpoint للأدمن «يعرض الباسوردات»، وباسورد افتراضي ثابت للموظفين. ده بيلغي فايدة الـ hash تمامًا: أي تسريب يبقى كل الباسوردات. الصح: الأدمن يعمل reset ويبعت لينك، وعمره ما يشوف الباسورد. وفي مشاريع تانية كان [[bcrypt]] و [[bcryptjs]] الاتنين متسطبين: اختار واحد. وتستخدم [[md5]] أو [[sha256]] للباسوردات: سريعين زيادة عن اللزوم. وترجّع «الإيميل مش موجود» و «الباسورد غلط» كرسالتين مختلفتين، فحد يعرف مين عنده حساب.`
          },
          teach: R`## دالتين بس: [[hash]] وقت التسجيل، و [[compare]] وقت الـ login

وقت التسجيل بتاخد الباسورد وتطلع منه نص طويل (الـ hash) وتحفظ ده بس في الداتابيز. ووقت الـ login بتدّي [[compare]] الباسورد اللي اليوزر كتبه والـ hash المحفوظ، ويرجّعلك [[true]] أو [[false]]. عمرك ما بترجّع الباسورد الأصلي، ولا محتاج.

اتشغّل على ويندوز 11 بـ Node 24.19 و [[bcrypt]] 6.0.0، في فولدر فيه:

~~~bash
npm init -y
npm pkg set type=module
npm i bcrypt
~~~

- [[npm pkg set type=module]] بيكتب [["type": "module"]] في package.json، فـ Node يقبل [[import]] و [[await]] في أول الملف (top-level await). من غيره احفظ الملف بامتداد [[.mjs]].

---

## ١. [[import bcrypt from "bcrypt"]]

بيجيب المكتبة. [[bcrypt]] جواها كود C++ متجمّع (native addon)، فهي أسرع بكتير من [[bcryptjs]] المكتوبة JavaScript. نسخة 6 جاية بملفات جاهزة لويندوز ولينكس والماك، فالتسطيب مش محتاج compiler.

---

## ٢. [[await bcrypt.hash("MyS3cret!", 12)]]

| الحتة | معناها |
|---|---|
| [["MyS3cret!"]] | الباسورد اللي اليوزر كتبه (هنا ثابت للتجربة) |
| [[12]] | الـ **cost** (أو salt rounds): الحسبة بتتعاد [[2^12]] = ٤٠٩٦ مرة |
| [[await]] | [[hash]] بترجّع Promise، والشغل التقيل بيحصل في thread تاني (thread pool بتاع libuv)، فالسيرفر فاضي يخدم طلبات تانية لحد ما يخلص |

~~~text الناتج
$2b$12$Cxy.ZJ6rZ006wMpTacj8/eBZII83ym6IOyYKq4Mx6d19ZWp3gTgVG
~~~

### نقرا الـ hash

النص ده ٦٠ حرف، ومتقسّم بعلامة [[$]]:

| الجزء | القيمة | معناه |
|---|---|---|
| [[2b]] | نسخة الـ algorithm | bcrypt النسخة الحالية |
| [[12]] | الـ cost | اللي انت اديته |
| أول ٢٢ حرف بعدها | [[Cxy.ZJ6rZ006wMpTacj8/e]] | الـ **salt**: ١٦ بايت عشوائي، مكتوبين بـ base64 مخصوص بتاع bcrypt |
| آخر ٣١ حرف | [[BZII83ym6IOyYKq4Mx6d19ZWp3gTgVG]] | الـ hash نفسه |

يعني الـ salt والـ cost محفوظين جوه النص. عشان كده عمود واحد في الداتابيز كفاية ([[passwordHash]])، و [[compare]] مش محتاج تديله salt. وتقدر تقرا الـ cost من hash قديم:

~~~bash
node -e "console.log(require('bcrypt').getRounds('\$2b\$12\$Cxy.ZJ6rZ006wMpTacj8/eBZII83ym6IOyYKq4Mx6d19ZWp3gTgVG'))"
~~~

~~~text الناتج
12
~~~

(الـ [[\$]] عشان bash ميفتكرش [[$2b]] متغير.)

---

## ٣. [[console.log(hash)]]: ليه هيطلع مختلف عندك؟

شغّلت نفس السطر مرتين في الـ solCode:

~~~text الناتج
$2b$12$/nhSopeDfT/ixNUBBQtwKetm/NAbQNvVC2tUidLsa2Me5f7qNAMt2
$2b$12$epLr1ynjxqv0KRgWaMJSo.SF6n7NTd1CNGcnWhkPy6y7I3ohPkMjy
~~~

نفس الباسورد ونفس الـ cost، والناتج مختلف، لأن كل [[hash]] بيولّد salt جديد. فاتنين باسوردهم «123456» الـ hash بتاعهم مش زي بعض، وحد سرق الداتابيز ميقدرش يعرف إنهم نفس الباسورد ولا يستخدم جداول جاهزة (rainbow tables).

والنتيجة المهمة: **متقارنش hash بـ hash**، ومتدوّرش بـ [[WHERE password_hash = ?]]. دوّر على اليوزر بالإيميل، وبعدين [[compare]].

---

## ٤. [[await bcrypt.compare("MyS3cret!", hash)]]

[[compare]] بيقرا الـ salt والـ cost من الـ hash، ويعمل hash للباسورد الجديد بيهم، ويقارن النتيجة:

~~~text الناتج
true
false
~~~

الأول [[true]] (الباسورد صح)، والتاني [["wrong"]] فـ [[false]]. ولو نسيت [[await]]:

~~~text الناتج: console.log(bcrypt.compare("x", hash))
Promise { <pending> }
~~~

و Promise دايمًا «truthy»، فـ [[if (bcrypt.compare(...))]] من غير await **أي باسورد هيعدّي**. دي غلطة بتحصل بجد.

---

## ٥. الـ solCode: التجربة والوقت

~~~text الناتج
false true true
cost 10: 53.345ms
cost 12: 211.382ms
cost 14: 890.433ms
~~~

- [[a === b]] بـ [[false]] (salt مختلف)، و [[compare]] بـ [[true]] للاتنين.
- [[console.time("label")]] بيبدأ ساعة باسم، و [[console.timeEnd("label")]] بيوقفها ويطبع الوقت. الاسم هنا template string: [[$__btcost $__{cost}$__bt]] بيبقى [["cost 12"]].
- كل زيادة ١ في الـ cost بتضاعف الوقت (٥٣ ثم ٢١١ ثم ٨٩٠: تقريبًا ×٤ كل خطوتين). ١٢ هنا ربع ثانية تقريبًا: اليوزر مش هيحس بيها مرة في الـ login، والمهاجم بيدفعها مع كل تخمينة.

---

## ٦. حد الـ ٧٢ بايت

~~~javascript
const long = "a".repeat(72);
const h = await bcrypt.hash(long, 4);
console.log(await bcrypt.compare(long + "ANYTHING", h));
~~~

~~~text الناتج
true
~~~

bcrypt بيبص على أول ٧٢ بايت بس، فأي حاجة بعدهم مش فارقة. باسورد بالطول ده نادر، بس حط [[max(72)]] في الـ validation عشان محدش يتفاجئ. (والحروف العربي بايتين في UTF-8، فالحد بالبايت مش بالحرف.)

---

## الخلاصة

| | |
|---|---|
| التسجيل | [[passwordHash = await bcrypt.hash(password, 12)]] واحفظه |
| الـ login | هات اليوزر بالإيميل، وبعدين [[await bcrypt.compare(password, user.passwordHash)]] |
| الـ salt والـ cost | جوه الـ hash نفسه، مش محتاج عمود ليهم |
| نفس الباسورد مرتين | hash مختلف، فمتقارنش hashes ببعض |
| الـ cost | ١٠ لـ ١٢، وكل +١ = الوقت ×٢ |

> [[await]] قبل [[compare]] مش اختياري: من غيره أي باسورد بيعدّي.`,
          lines: [
            "مكتبة bcrypt (native وسريعة). فيه كمان [[bcryptjs]] مكتوبة JavaScript بس، وأبطأ.",
            "اعمل hash بـ cost 12. async عشان الحسبة التقيلة متوقفش السيرفر.",
            "اطبعه: كل مرة هيطلع مختلف حتى لنفس الباسورد، بسبب الـ salt.",
            "قارن باسورد صح بالـ hash: true.",
            "باسورد غلط: false."
          ],
          sol: R`الـ hash بيطلع مختلف كل مرة، مثلًا [[$2b$12$FFrStIpK3ozn...]] و [[$2b$12$wsmQ3tQJrJyC...]]، و [[a === b]] بـ [[false]]، و [[compare]] بيرجّع [[true]] للاتنين. السبب: bcrypt بيولّد salt عشوائي جديد مع كل hash ويحطه جوه الـ hash نفسه (الـ 22 حرف اللي بعد [[$12$]])، فـ compare بيقراه من هناك. فمتقارنش hashes ببعض، ومتعملش [[WHERE password_hash = ?]] أبدًا.

والوقت: كل زيادة ١ في الـ cost بتضاعف الوقت تقريبًا. على جهاز عادي حاجة زي [[cost 10: 67ms]] و [[cost 12: 281ms]] و [[cost 14: 1.087s]] (الأرقام عندك هتختلف، النسبة ×٤ كل خطوتين هي المهمة). 12 بيدّي حوالي ربع ثانية: مش ملحوظ في login، ومكلّف جدًا لحد بيجرّب ملايين الباسوردات.

لو القيمتين طلعوا زي بعض، يبقى بتعمل hash مرة وبتطبعه مرتين. ولو compare رجّع [[Promise { <pending> }]]، نسيت [[await]].`,
          solCode: R`import bcrypt from "bcrypt";

const a = await bcrypt.hash("MyS3cret!", 12);
const b = await bcrypt.hash("MyS3cret!", 12);
console.log(a === b, await bcrypt.compare("MyS3cret!", a), await bcrypt.compare("MyS3cret!", b)); // false true true

for (const cost of [10, 12, 14]) {
  console.time($__btcost $__{cost}$__bt);
  await bcrypt.hash("MyS3cret!", cost);
  console.timeEnd($__btcost $__{cost}$__bt);
}`
        },
        {
          cmd: "jwt.sign و jwt.verify",
          title: "توكن موقّع يثبت إنك سجّلت دخول",
          desc: R`بعد login ناجح، السيرفر بيدّيك JWT: نص فيه بيانات (زي id اليوزر) وتوقيع بسر محدش يعرفه غير السيرفر، والواجهة بتبعته مع كل طلب في [[Authorization: Bearer ...]].

السيرفر بيتحقق من التوقيع من غير ما يسأل الداتابيز. والـ JWT موقّع مش مشفّر: أي حد يقدر يقرا اللي جواه، فمتحطش فيه باسورد ولا بيانات حساسة.`,
          example: R`import jwt from "jsonwebtoken";
import { config } from "./config.js";

export function signAccessToken(user) {
  return jwt.sign({ sub: String(user.id), role: user.role }, config.JWT_SECRET, { expiresIn: "15m" });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, config.JWT_SECRET, { algorithms: ["HS256"] });
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3Iiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3OTAwMDAwMDAsImV4cCI6MTc5MDAwMDkwMH0.<signature>
//               header                  .                         payload                                        . التوقيع`,
          try: R`اعمل توكن وخد الجزء التاني منه (بين النقطتين) وافكّه بـ [[node -e "console.log(Buffer.from(process.argv[1], 'base64url').toString())" PAYLOAD]]. هتقرا الـ id والدور من غير أي سر. غيّر الدور لـ ADMIN ورجّع شفّره بـ [[node -e "const p = JSON.parse(Buffer.from(process.argv[1], 'base64url')); p.role = 'ADMIN'; console.log(Buffer.from(JSON.stringify(p)).toString('base64url'))" PAYLOAD]]، وحط الناتج مكان الجزء التاني وجرّب verify: [[invalid signature]] (لو غيّرت حرف في النص المشفّر نفسه، غالبًا الـ JSON هيبوظ وهتاخد SyntaxError مش invalid signature). واعمل توكن بـ [[expiresIn: "5s"]] واستنى: [[jwt expired]].`,
          flag: "script",
          deep: {
            why: "HTTP مبيفتكرش: كل طلب لوحده، فلازم كل طلب يثبت صاحبه. الـ JWT بيحط الإثبات ده جوه الطلب نفسه، والسيرفر يتحقق منه بحسبة سريعة من غير lookup، وأي نسخة من السيرفر معاها السر تقدر تتحقق، فتقدر تشغّل كذا نسخة من غير session مشتركة.",
            how: R`JWT تلات أجزاء مفصولة بنقط، كل جزء base64url: الـ header (نوع الـ algorithm)، والـ payload (الـ claims)، والتوقيع. التوقيع = HMAC-SHA256 للجزئين الأولانيين بالسر. أي تغيير في الـ payload بيخلي التوقيع مش مطابق، ومن غير السر محدش يقدر يعمل توقيع جديد.

الـ claims المشهورة: [[sub]] (مين)، و [[exp]] (بينتهي إمتى، بالثواني)، و [[iat]] (اتعمل إمتى)، و [[iss]] و [[aud]] (مين أصدره ولمين). [[verify]] بيتأكد من التوقيع و [[exp]] تلقائي، ومن [[iss]] و [[aud]] لو طلبتهم.

[[algorithms: ["HS256"]]] بيقفل هجوم قديم: توكن بيقول في الـ header إن الـ algorithm [[none]] أو نوع تاني عشان يخدع المكتبة. النسخ الحديثة من jsonwebtoken بتحمي من ده، بس التحديد الصريح عادة كويسة.

المشكلة الأساسية: التوكن صالح لحد [[exp]] مهما حصل. اليوزر عمل logout؟ اتحظر؟ دوره اتغيّر؟ التوكن القديم لسه شغال. عشان كده الـ access token عمره قصير (١٠ لـ ١٥ دقيقة)، ومعاه refresh token (درس [[access و refresh]]).`,
            when: R`APIs لموبايل أو لأكتر من واجهة، أو أكتر من سيرفر. لموقع واحد على نفس الدومين، الـ session بكوكي ممكن تبقى أبسط وأأمن (درس [[express-session]]).`,
            mistakes: R`في مشروع حقيقي كان عمر الـ JWT [[3650d]]، يعني ١٠ سنين، و logout مبيلغيهوش: توكن اتسرق مرة يبقى دخول لـ ١٠ سنين. وفي مشروع تاني توكن تحميل الملفات (عمره ٣٠ يوم) كان موقّع بنفس سر الـ access token ونفس الـ issuer، فكان بيعدّي من [[verifyAccessToken]] كأنه توكن دخول. افصل بسر مختلف أو claim زي [[aud]] وتحقق منه. وتحط الدور في التوكن وتثق فيه: لو الأدمن اتشال، التوكن لسه بيقول ADMIN لحد ما ينتهي.`
          },
          teach: R`## دالتين في ملف واحد: واحدة تعمل التوكن وواحدة تتحقق منه

[[signAccessToken]] بتتنادى مرة بعد login ناجح وترجّع نص (التوكن). و [[verifyAccessToken]] بتتنادى مع كل طلب جاي (في [[requireAuth]]، الدرس الجاي) وترجّع اللي جوه التوكن، أو ترمي خطأ لو حد لعب فيه أو خلص.

اتشغّل على ويندوز 11 بـ Node 24.19 و [[jsonwebtoken]] 9.0.3، مع [[config.js]] فيه سر تجربة:

~~~javascript
export const config = { JWT_SECRET: "test-secret-at-least-32-chars-long-xx" };
~~~

---

## ١. الـ imports

- [[import jwt from "jsonwebtoken"]]: المكتبة الأشهر لـ JWT في Node (اسمها الكامل JSON Web Token).
- [[import { config } from "./config.js"]]: السر جاي من الـ config اللي اتحقق منه بـ zod (درس [[config.js بـ zod]])، مش مكتوب في الكود. الأقواس [[{ }]] معناها «هات الحاجة اللي اسمها config بالظبط من الملف».

---

## ٢. [[jwt.sign(payload, secret, options)]]

~~~javascript
jwt.sign({ sub: String(user.id), role: user.role }, config.JWT_SECRET, { expiresIn: "15m" })
~~~

| الحتة | معناها |
|---|---|
| [[{ sub: ..., role: ... }]] | الـ **payload**: البيانات اللي هتتحط في التوكن (اسمها claims) |
| [[sub]] | اختصار subject: «التوكن ده عن مين». المعيار بيقول string، عشان كده [[String(user.id)]] بتحوّل [[7]] لـ [["7"]] |
| [[role]] | الدور، claim من عندنا مش من المعيار |
| [[config.JWT_SECRET]] | السر اللي التوقيع بيتحسب بيه. اللي معاه السر بس يقدر يعمل توكن صالح |
| [[expiresIn: "15m"]] | ينتهي بعد ١٥ دقيقة. المكتبة بتحسب [[exp]] لوحدها. ينفع [["15m"]] و [["1h"]] و [["7d"]] أو رقم بالثواني |

والـ algorithm الافتراضي [[HS256]] (HMAC مع SHA-256): نفس السر بيوقّع وبيتحقق.

~~~text الناتج: signAccessToken({ id: 7, role: "USER" })
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3Iiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3OTEzNTk0ODIsImV4cCI6MTc5MTM2MDM4Mn0.VWMSUPFeqxxcipVNPAFkXv6Wid6wYGsi0j6ffN2QM7M
~~~

### التوكن تلات حتت بينهم نقطة

فكّيت كل حتة بـ [[Buffer.from(part, "base64url").toString()]]:

| الحتة | بعد الفك |
|---|---|
| الأولى (header) | [[{"alg":"HS256","typ":"JWT"}]] |
| التانية (payload) | [[{"sub":"7","role":"USER","iat":1791359482,"exp":1791360382}]] |
| التالتة (signature) | ٤٣ حرف: ٣٢ بايت ناتج HMAC-SHA256، مش نص يتقري |

- **base64url** طريقة تكتب بيها أي بايتات كحروف وأرقام و [[-]] و [[_]]، فتتبعت في header أو URL من غير مشاكل. ده **مش تشفير**: أي حد يفكّه.
- [[iat]] (issued at) و [[exp]] (expiration) بالثواني من ١ يناير ١٩٧٠ (Unix time). الفرق بينهم [[1791360382 - 1791359482 = 900]] ثانية = ١٥ دقيقة بالظبط.

والتعليق اللي في آخر المثال نفس الشكل، بأرقام أقدم ([[iat]] [[1790000000]]).

---

## ٣. جرّب الـ try: افك الـ payload من الترمنال

~~~bash
node -e "console.log(Buffer.from(process.argv[1], 'base64url').toString())" eyJzdWIiOiI3Iiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3OTEzNTk0ODIsImV4cCI6MTc5MTM2MDM4Mn0
~~~

~~~text الناتج
{"sub":"7","role":"USER","iat":1791359482,"exp":1791360382}
~~~

- [[node -e "..."]]: شغّل الكود ده على طول من غير ملف.
- [[process.argv[1]]]: مع [[-e]]، أول كلمة بعد الكود هي [[argv[1]]] (هنا الـ payload).

نفس السطر اشتغل زي ما هو في PowerShell 7 و Windows PowerShell 5.1، لأن الكود جواه مفيهوش [["]].

> من غير أي سر قرينا الـ id والدور. عشان كده عمرك ما تحط باسورد أو بيانات حساسة في JWT.

---

## ٤. [[jwt.verify(token, secret, { algorithms: ["HS256"] })]]

بيعمل ٣ حاجات بالترتيب: يحسب التوقيع من أول حتتين بالسر ويقارنه بالحتة التالتة، ويتأكد إن [[exp]] لسه مجاش، ويتأكد إن الـ [[alg]] في الـ header من القايمة اللي اديتها. لو كله تمام بيرجّع الـ payload:

~~~text الناتج
{ sub: '7', role: 'USER', iat: 1791359482, exp: 1791360382 }
~~~

ولو لأ بيرمي خطأ. جرّبت كل حالة:

| الحالة | الخطأ |
|---|---|
| غيّرت [[role]] لـ [[ADMIN]] في الـ payload وسبت التوقيع القديم | [[JsonWebTokenError: invalid signature]] |
| توكن اتعمل بسر تاني | [[JsonWebTokenError: invalid signature]] |
| header بيقول [[alg: none]] ومن غير توقيع | [[JsonWebTokenError: jwt signature is required]] |
| توكن [[expiresIn: "1s"]] واستنيت ثانيتين | [[TokenExpiredError: jwt expired]] (ومعاه [[expiredAt]]) |
| [["abc"]] | [[JsonWebTokenError: jwt malformed]] |

ليه التعديل اتكشف؟ التوقيع اتحسب على [[header.payload]] القديم. أي حرف يتغير يطلّع توقيع مختلف تمامًا، ومن غير السر محدش يقدر يحسب التوقيع الجديد.

### الفرق بين [[verify]] و [[decode]]

~~~text الناتج: jwt.decode(forged)
{ sub: '7', role: 'ADMIN', iat: 1791359482, exp: 1791360382 }
~~~

[[jwt.decode]] قرا التوكن المزوّر عادي ورجّع ADMIN، لأنه بيفك base64url بس ومبيتحققش من حاجة. استخدمه للعرض أو الـ debug بس، وعمره ما يتستخدم في auth.

---

## الخلاصة

| | |
|---|---|
| شكل JWT | [[header.payload.signature]]، كل حتة base64url |
| مين يقرا الـ payload | أي حد. موقّع مش مشفّر |
| مين يعمل توكن صالح | اللي معاه [[JWT_SECRET]] بس |
| [[expiresIn: "15m"]] | المكتبة تحط [[exp = iat + 900]] |
| [[verify]] | توقيع + انتهاء + algorithm، وبيرمي لو أي حاجة غلط |
| [[decode]] | قراية بس، ممنوع في الـ auth |

> التوكن صالح لحد [[exp]] مهما حصل، فخلي عمر الـ access قصير، والتجديد بالـ refresh (درس [[access و refresh]]).`,
          lines: [
            "مكتبة jsonwebtoken.",
            "السر من config المتحقق منه.",
            "اعمل توكن لليوزر.",
            "[[sub]] (subject) هو id اليوزر كـ string، ومعاه الدور، وينتهي بعد ربع ساعة.",
            "قفلة.",
            "اتحقق من توكن جاي.",
            "بيتأكد من التوقيع وإنه مش منتهي، ومبيقبلش غير الـ algorithm ده. لو أي حاجة غلط بيرمي خطأ.",
            "قفلة."
          ],
          sol: R`فك الـ payload بيطبع حاجة زي [[{"sub":"7","role":"USER","iat":1790718907,"exp":1790719807]] من غير أي سر: الـ JWT مش مشفّر، ده base64url بس. فمتحطش فيه حاجة سرية (باسورد، رقم بطاقة).

بعد ما تغيّر الدور لـ ADMIN وتحط الـ payload الجديد مكان القديم، [[jwt.verify]] بيرمي [[JsonWebTokenError: invalid signature]]، لأن التوقيع اتحسب على الـ header والـ payload القديمين بالسر، ومحدش يقدر يعمل توقيع جديد من غير السر. ده كل الأمان في JWT.

والتوكن اللي [[expiresIn: "5s"]] بعد ما تستنى بيرمي [[TokenExpiredError: jwt expired]]. في requireAuth الاتنين بيتحولوا لـ 401. لو verify نجح على التوكن المعدّل، يبقى انت بتعمل [[jwt.decode]] بدل [[jwt.verify]]: decode بيقرا بس ومبيتحققش من حاجة.`
        },
        {
          cmd: "requireAuth",
          title: "middleware يعرف مين اللي باعت الطلب",
          desc: R`middleware بيقرا التوكن من [[Authorization: Bearer ...]] ويتحقق منه ويحط اليوزر في [[req.user]]، ولو مفيش توكن أو بايظ أو منتهي: 401.

أي route بعده يعرف مين اللي بيطلب من [[req.user]]، وعمره ما يثق في id جاي في الـ body أو الـ query.`,
          example: R`export async function requireAuth(req, res, next) {
  const header = req.get("authorization") ?? "";
  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token) throw new AppError(401, "Login required");
  let payload;
  try {
    payload = verifyAccessToken(token);
  } catch {
    throw new AppError(401, "Invalid or expired token");
  }
  req.user = { id: Number(payload.sub), role: payload.role };
  next();
}`,
          try: R`ركّبه على router المهام، وجرّب من غير header، وبتوكن بايظ، وبتوكن صح. وفي الـ controller استخدم [[req.user.id]] بدل أي id جاي من الـ body.`,
          flag: "script",
          deep: {
            why: R`كل endpoint محمي محتاج نفس الخطوات. في middleware واحد بتضمن إنها بتتعمل بنفس الطريقة في كل مكان، وإن [[req.user]] دايمًا جاي من توكن متحقق مش من حاجة المستخدم بعتها.`,
            how: R`الـ middleware ده بيحوّل «توكن» لـ «هوية». كل اللي بعده يثق في [[req.user]] بس، عمره ما يثق في [[req.body.userId]].

فيه قرار: تكتفي بالـ payload، ولا تجيب اليوزر من الداتابيز مع كل طلب؟ الـ payload بس أسرع، بس لو اليوزر اتحظر أو دوره اتغيّر، التوكن لسه شغال لحد ما ينتهي. جلب اليوزر ([[prisma.user.findUnique]] بـ [[select]] على الحقول اللي محتاجها) بيضيف query لكل طلب بس بيدّيك حالة حقيقية: [[isActive]] والدور الحالي. مشاريع كتير بتعمل ده، ولو الحمل زاد تكاشه في Redis لدقيقة.

ولو التوكن في كوكي بدل header، نفس الفكرة بس من [[req.cookies]]، وساعتها لازم حماية CSRF (sameSite على الأقل، درس [[res.cookie]]).

و [[optionalAuth]] نسخة بتحط [[req.user]] لو فيه توكن سليم وتكمّل عادي لو مفيش، لصفحات بتتعرض للكل بس بتتغير شوية لو انت عامل login.`,
            when: R`على كل router محتاج login. وخليه على مستوى الـ router ([[router.use(requireAuth)]] أو في [[app.use]]) عشان متنساش route.`,
            mistakes: R`في [[optionalAuth]] تبلع أي خطأ وتكمّل كزائر، وده صح. بس تنسخ نفس الـ catch لـ [[requireAuth]] بالغلط، فأي توكن بايظ يعدّي. وتقرا [[req.user.id]] في route مش عليه requireAuth فيقع بـ 500. وتحط اليوزر كله من الداتابيز في [[req.user]] ومعاه الـ hash، وبعدين route يرجّع [[req.user]] في الرد.`
          },
          teach: R`## middleware بيحوّل header لـ [[req.user]]

الطلب جاي ومعاه سطر [[Authorization: Bearer eyJ...]]. الدالة دي بتقرا السطر ده، وتتحقق من التوكن بـ [[verifyAccessToken]] (الدرس اللي فات)، ولو تمام تحط [[req.user]] وتنادي [[next()]] عشان الطلب يكمّل للـ route. ولو أي حاجة غلط ترمي [[AppError]] بـ 401، والـ error handler (درس [[error middleware]]) يحوّله لرد JSON.

اتشغّل على ويندوز 11 بـ Node 24.19 و Express 5.2.1، سيرفر على بورت 5845 فيه [[AppError]] و [[errorHandler]] من درس [[error middleware]]، و route تجربة بيعمل توكن.

---

## ١. [[export async function requireAuth(req, res, next)]]

- [[export]]: عشان تستورده في الملف اللي بيركّب الـ routes.
- [[async]]: في Express 5، لو دالة async رمت خطأ، Express بيمسكه ويوديه للـ error handler لوحده (درس [[async errors في Express 5]]). فنقدر نكتب [[throw]] عادي.
- [[(req, res, next)]]: شكل أي middleware. [[next]] هي «كمّل للي بعدي».

---

## ٢. [[const header = req.get("authorization") ?? ""]]

- [[req.get("authorization")]]: هات header بالاسم ده. أسماء الـ headers مش حساسة لحالة الحروف، فـ [["authorization"]] و [["Authorization"]] واحد.
- [[??]] (nullish coalescing): لو اللي على الشمال [[undefined]] أو [[null]] خد اللي على اليمين. من غير header هيبقى [[""]] بدل [[undefined]]، فالسطر الجاي ميقعش.

---

## ٣. [[const [scheme, token] = header.split(" ")]]

[[split(" ")]] بيقطّع النص عند كل مسافة ويرجّع array. والأقواس المربعة على الشمال (destructuring) بتاخد أول عنصرين في متغيرين:

~~~text الناتج
"Bearer eyJhbGci..."  =>  scheme = "Bearer"   token = "eyJhbGci..."
""                    =>  scheme = ""         token = undefined
"Bearer"              =>  scheme = "Bearer"   token = undefined
~~~

[[Bearer]] معناها «حامل»: اللي معاه التوكن ده يتعامل كصاحبه. ده الاسم المتعارف عليه للنوع ده من التوكنات.

---

## ٤. [[if (scheme !== "Bearer" || !token) throw new AppError(401, "Login required")]]

- [[!==]]: «مش بيساوي بالظبط».
- [[||]]: «أو». لو الكلمة الأولى مش Bearer **أو** مفيش توكن.
- [[!token]]: [[true]] لو [[token]] فاضي أو [[undefined]].

من غير header خالص:

~~~bash
curl -i localhost:5845/api/tasks
~~~

~~~text الناتج
HTTP/1.1 401 Unauthorized
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 26
...

{"error":"Login required"}
~~~

والمقارنة حساسة لحالة الحروف: [[bearer eyJ...]] (b صغيرة) و [[Bearer: eyJ...]] (بنقطتين) الاتنين رجّعوا نفس الـ 401، لأن [[scheme]] بقت [["bearer"]] أو [["Bearer:"]].

---

## ٥. [[try { ... } catch { ... }]]

~~~javascript
let payload;
try {
  payload = verifyAccessToken(token);
} catch {
  throw new AppError(401, "Invalid or expired token");
}
~~~

- [[let payload]] برّه الـ try، عشان المتغير يفضل موجود بعدها (المتغير اللي بيتعرّف جوه [[{ }]] بيموت لما تقفل).
- [[verifyAccessToken]] بترمي [[JsonWebTokenError]] أو [[TokenExpiredError]] (شفناهم في الدرس اللي فات).
- [[catch]] من غير [[(err)]]: مش محتاجين نعرف السبب. كل الأسباب ليها نفس الرد، فالمهاجم ميعرفش التوكن اتكشف ليه.

~~~bash
curl -i -H "Authorization: Bearer abc" localhost:5845/api/tasks
~~~

~~~text الناتج
HTTP/1.1 401 Unauthorized
...
{"error":"Invalid or expired token"}
~~~

---

## ٦. [[req.user = { id: Number(payload.sub), role: payload.role }]]

[[sub]] اتحط في التوكن string ([["7"]])، و [[Number()]] بيرجّعه رقم ([[7]]) عشان يطابق الـ ids في الداتابيز. و [[req]] object عادي، فأي خاصية تحطها عليه بتوصل لكل اللي بعدك في نفس الطلب. وبعدها [[next()]].

---

## ٧. الـ solCode: ركّبه واستخدم [[req.user.id]]

~~~javascript
app.use("/api/tasks", requireAuth, tasksRouter);
~~~

[[app.use]] بياخد أكتر من middleware ورا بعض: أي طلب يبدأ بـ [[/api/tasks]] بيعدّي على [[requireAuth]] الأول، وبعدين الـ router. فكل routes المهام محمية بسطر واحد.

بعتّ POST بتوكن يوزر 7، وحطيت في الـ body [[userId: 99]] كأني بحاول أعمل مهمة باسم حد تاني:

~~~bash
curl -i -X POST localhost:5845/api/tasks -H "Authorization: Bearer $T" -H "Content-Type: application/json" -d '{"title":"x","userId":99}'
~~~

~~~text الناتج
HTTP/1.1 201 Created
...
{"id":1,"title":"x","userId":7}
~~~

[[userId]] طلع [[7]] مش [[99]]، لأن الـ controller بيبعت [[req.user.id]] للـ service ([[tasksService.create(req.user.id, req.body)]]) والـ service بتحط الـ userId بنفسها. الـ [[99]] اتجاهل. ([[$T]] متغير bash فيه التوكن.)

---

## ٨. من ويندوز

~~~powershell
curl.exe -i http://localhost:5845/api/tasks -H "Authorization: Bearer abc"
Invoke-RestMethod http://localhost:5845/api/tasks -Headers @{ Authorization = "Bearer $T" }
~~~

- [[curl.exe]] رجّع نفس [[HTTP/1.1 401 Unauthorized]] في PowerShell 7 و 5.1.
- [[-Headers @{ ... }]]: [[@{ }]] جدول (hashtable) فيه اسم الـ header وقيمته. وبالتوكن الصح رجّع [[user]] فيه [[id 7]] و [[role USER]] في الاتنين.
- من غير توكن، [[Invoke-RestMethod]] بيرمي خطأ مع أي status 4xx. في 5.1 مسكته بـ [[try { ... } catch { $_.Exception.Response.StatusCode.value__; $_.ErrorDetails.Message }]] وطلع [[401]] و [[{"error":"Login required"}]].

---

## الخلاصة

| الحالة | الرد |
|---|---|
| مفيش header، أو مش [[Bearer]] بالظبط | [[401]] [[Login required]] |
| توكن بايظ أو منتهي أو بسر تاني | [[401]] [[Invalid or expired token]] |
| توكن سليم | [[req.user = { id, role }]] والطلب يكمّل |

> أي id بتستخدمه في الـ controller جاي من [[req.user]]، مش من [[req.body]] ولا [[req.query]].`,
          lines: [
            "async عشان أي throw يروح لـ error handler في Express 5.",
            "اقرا الـ header، ولو مش موجود خليه نص فاضي.",
            "افصله: كلمة Bearer والتوكن.",
            "مش Bearer أو مفيش توكن: 401.",
            "هنحط فيه الـ payload.",
            "جرّب.",
            "اتحقق من التوقيع والانتهاء.",
            "لو فشل لأي سبب...",
            "401 برسالة واحدة. متقولش للمهاجم السبب بالظبط.",
            "قفلة.",
            "حط اليوزر على الطلب. [[sub]] كان string فرجّعه رقم.",
            "كمّل.",
            "قفلة."
          ],
          sol: R`من غير header: [[401]] و [[{"error":"Login required"}]]. بتوكن بايظ ([[Authorization: Bearer abc]]) أو منتهي: [[401]] و [[{"error":"Invalid or expired token"}]]. بتوكن صح: الـ route بيشتغل عادي و [[req.user]] فيه [[{ id: 7, role: "USER" }]].

في الـ controller: [[tasksService.create(req.user.id, req.body)]]، مش [[req.body.userId]]. الـ id اللي في التوكن موقّع من السيرفر فمحدش يقدر يغيّره، إنما أي حاجة في الـ body اليوزر بيكتبها بإيده.

لو التوكن الصح رجّع 401: اتأكد إنك باعت [[Bearer ]] بالمسافة (مش [[Bearer:]])، وإن نفس [[JWT_SECRET]] اللي عمل sign هو اللي بيعمل verify (مثلًا سيرفر اتعمله restart بـ secret عشوائي). ولو الطلب اتعلّق أو وقع السيرفر على Express 4، يبقى الـ throw جوه middleware async محتاج [[asyncHandler]].`,
          solCode: R`import tasksRouter from "./routes/tasks.routes.js";
app.use("/api/tasks", requireAuth, tasksRouter);

// controllers/tasks.controller.js
export async function create(req, res) {
  res.status(201).json(await tasksService.create(req.user.id, req.body));
}

// curl -i localhost:3000/api/tasks                                => 401 Login required
// curl -i -H "Authorization: Bearer abc" localhost:3000/api/tasks => 401 Invalid or expired token`
        },
        {
          cmd: "res.cookie",
          title: "كوكي المتصفح بيبعتها لوحده و JavaScript ميقدرش يقراها",
          desc: R`[[res.cookie(name, value, options)]] بيبعت [[Set-Cookie]]، والمتصفح بيرجّعها لوحده مع كل طلب لنفس السيرفر، و [[cookie-parser]] بيقراها في [[req.cookies]].

التلات إعدادات اللي مينفعش تنساهم: [[httpOnly]] (الـ JavaScript في الصفحة ميقدرش يقراها، فـ XSS ميسرقهاش)، و [[secure]] (تتبعت على HTTPS بس)، و [[sameSite]] (تتبعت مع طلبات جاية من مواقع تانية ولا لأ).`,
          example: R`import cookieParser from "cookie-parser";

app.use(cookieParser(config.COOKIE_SECRET));

export const refreshCookieOptions = {
  httpOnly: true,
  secure: config.NODE_ENV === "production",
  sameSite: "lax",
  path: "/api/auth",
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

res.cookie("refresh", token, refreshCookieOptions);
res.clearCookie("refresh", { path: "/api/auth" });`,
          try: R`بعد login افتح DevTools، تاب Application، Cookies: شوف الأعمدة HttpOnly و Secure و SameSite. واكتب [[document.cookie]] في Console: الكوكي الـ httpOnly مش هتظهر. وجرّب [[clearCookie]] من غير الـ path وشوفها لسه موجودة.`,
          flag: "script",
          deep: {
            why: "التوكن لازم يتخزن في مكان. localStorage أي JavaScript في الصفحة يقراه، فأي XSS (أو مكتبة npm مخترقة) تاخده. الكوكي الـ httpOnly الصفحة نفسها متقدرش تقراها، والمتصفح بيبعتها لوحده. بس ده بيفتح باب CSRF، وده اللي sameSite بيقفله.",
            how: R`الرد بيبقى [[Set-Cookie: refresh=abc; Max-Age=2592000; Path=/api/auth; HttpOnly; Secure; SameSite=Lax]]. المتصفح بيحفظها ويبعتها في header الـ [[Cookie]] مع أي طلب لنفس الدومين والـ path.

sameSite ليها ٣ قيم: [[strict]] مبتتبعتش خالص مع أي طلب جاي من موقع تاني (حتى لما حد يدوس لينك ليك من جوجل، فيبان إنه مش عامل login). [[lax]] بتتبعت مع التنقل العادي (لينك GET) بس مش مع POST أو fetch من موقع تاني، وده بيقفل أغلب CSRF. و [[none]] بتتبعت مع كل حاجة، ولازم معاها [[secure]]، وبتستخدم لما الواجهة على دومين مختلف تمامًا.

«موقع تاني» معناها site مختلف مش origin مختلف: [[app.example.com]] و [[api.example.com]] نفس الـ site، فـ lax شغالة بينهم. بس [[myapp.vercel.app]] و [[api.myapp.com]] sites مختلفة، فمحتاج [[none]] و [[secure]]، والمتصفحات اللي بتقفل third-party cookies ممكن ترفضها. الحل الأنضف: الـ API تحت نفس الدومين ([[/api]] من ورا Nginx أو subdomain).

الكوكي الموقّعة ([[signed: true]]): cookie-parser بيضيف توقيع بالسر، ولو حد عدّل القيمة، قيمتها في [[req.signedCookies]] بتبقى [[false]]. ده بيمنع التعديل مش القراية.

و [[clearCookie]] لازم ياخد نفس الـ path والـ domain اللي الكوكي اتعملت بيهم، وإلا المتصفح يعتبرها كوكي تانية. وفي Express 5 بيتجاهل [[maxAge]] و [[expires]] لو بعتّهم.`,
            when: "refresh tokens و session ids، وأي حاجة الـ JavaScript مش محتاج يقراها. وتفضيلات UI (اللغة والثيم) ممكن كوكي عادية أو localStorage.",
            mistakes: R`في مشروع حقيقي كان الـ cookie secret ليه fallback: [[COOKIE_SECRET || "change-me"]] ومعاه warning في اللوج. لو المتغير اتنسي في الإنتاج، أي حد يقدر يوقّع كوكيز. خلي config يقع بدل الـ fallback. و [[secure: true]] على localhost بـ http في متصفح مش بيعتبر localhost آمن، فالكوكي متتحفظش وانت مش فاهم ليه. و [[sameSite: "none"]] من غير [[secure]] فالمتصفح يرفضها. والواجهة بتعمل fetch من غير [[credentials: "include"]] فالكوكي مبتتبعتش أصلًا.`
          },
          teach: R`## ٣ حاجات: تقرا الكوكيز، وتبعت كوكي، وتمسحها

[[cookie-parser]] بيقرا الكوكيز اللي المتصفح بعتها. و [[res.cookie]] بيضيف للرد header اسمه [[Set-Cookie]] فيه الاسم والقيمة والإعدادات، والمتصفح بيحفظها ويرجّعها لوحده بعد كده. و [[res.clearCookie]] بيبعت نفس الـ header بتاريخ قديم، فالمتصفح يمسحها.

اتشغّل على ويندوز 11 بـ Node 24.19 و Express 5.2.1 و cookie-parser 1.4.7، سيرفر على بورت 5846 فيه route [[POST /api/auth/login]] بيعمل [[res.cookie("refresh", "abc123", refreshCookieOptions)]]، والطلبات بـ [[curl]] من Git Bash.

---

## ١. [[app.use(cookieParser(config.COOKIE_SECRET))]]

المتصفح بيبعت كل الكوكيز في header واحد نص: [[Cookie: refresh=abc123; theme=dark]]. [[cookieParser]] بيفكّه لـ object في [[req.cookies]]: [[{ refresh: "abc123", theme: "dark" }]].

والسر اللي بتديهوله لنوع تاني اسمه **signed cookies** (تحت في ٦). من غيره [[req.cookies]] بس اللي بتشتغل.

---

## ٢. [[refreshCookieOptions]]: الإعدادات في object واحد

ليه object منفصل؟ لأنك هتبعت نفس الكوكي من أكتر من مكان (login و refresh)، ولازم الإعدادات تبقى واحدة بالظبط، وإلا المتصفح يعتبرهم كوكيز مختلفة.

| الإعداد | القيمة | معناها |
|---|---|---|
| [[httpOnly]] | [[true]] | الـ JavaScript في الصفحة ([[document.cookie]]) ميشوفهاش. المتصفح بس اللي بيبعتها |
| [[secure]] | [[config.NODE_ENV === "production"]] | تتبعت على HTTPS بس. الشرط بيطلع [[true]] في الإنتاج و [[false]] على جهازك (http) |
| [[sameSite]] | [["lax"]] | متتبعتش مع POST أو fetch جاي من موقع تاني |
| [[path]] | [["/api/auth"]] | المتصفح يبعتها بس للعناوين اللي بتبدأ بـ [[/api/auth]] |
| [[maxAge]] | [[30 * 24 * 60 * 60 * 1000]] | العمر بالملّي ثانية: ٣٠ يوم × ٢٤ ساعة × ٦٠ دقيقة × ٦٠ ثانية × ١٠٠٠ = [[2592000000]] |

---

## ٣. [[res.cookie("refresh", token, refreshCookieOptions)]]

~~~bash
curl -i -X POST localhost:5846/api/auth/login -c jar.txt
~~~

- [[-i]]: اطبع الـ headers مع الرد.
- [[-c jar.txt]]: احفظ أي كوكي جاية في ملف (الـ cookie jar)، زي المتصفح.

~~~text الناتج
HTTP/1.1 200 OK
Set-Cookie: refresh=abc123; Max-Age=2592000; Path=/api/auth; Expires=Fri, 06 Nov 2026 07:54:10 GMT; HttpOnly; SameSite=Lax
~~~

نقرا الـ header:

- [[Max-Age=2592000]]: Express حوّل الملّي ثانية لثواني (٣٠ يوم)، لأن الـ header بالثواني.
- [[Expires=...]]: نفس العمر كتاريخ، للمتصفحات القديمة. الوقت بـ GMT.
- [[HttpOnly]] و [[SameSite=Lax]] موجودين، و [[Secure]] **مش موجود** لأن [[NODE_ENV]] كان development.

شغّلت نفس السيرفر بـ [[NODE_ENV=production]] على بورت 5847:

~~~text الناتج
Set-Cookie: refresh=abc123; Max-Age=2592000; Path=/api/auth; Expires=Fri, 06 Nov 2026 07:54:28 GMT; HttpOnly; Secure; SameSite=Lax
~~~

ظهر [[Secure]].

---

## ٤. الـ path بيعمل إيه فعلًا

بعتّ الـ jar لعنوانين:

~~~bash
curl localhost:5846/api/auth/whoami -b jar.txt
curl localhost:5846/api/other -b jar.txt
~~~

~~~text الناتج
{"cookies":{"refresh":"abc123"},"signed":{}}
{"cookies":{}}
~~~

[[-b jar.txt]] بيبعت الكوكيز اللي في الملف زي المتصفح، و curl احترم الـ [[Path]]: الكوكي راحت لـ [[/api/auth/whoami]] بس، و [[/api/other]] موصلهوش حاجة. فالـ refresh token مش بيتبعت مع كل طلب للـ API.

---

## ٥. [[res.clearCookie("refresh", { path: "/api/auth" })]]

~~~text الناتج: بالـ path
Set-Cookie: refresh=; Path=/api/auth; Expires=Thu, 01 Jan 1970 00:00:00 GMT
~~~

~~~text الناتج: res.clearCookie("refresh") من غير path
Set-Cookie: refresh=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT
~~~

المسح = نفس الاسم، قيمة فاضية، وتاريخ انتهاء فات (١ يناير ١٩٧٠). بس المتصفح بيعرف الكوكي بالاسم **و** الـ path **و** الـ domain مع بعض، فـ [[refresh]] على [[/]] غير [[refresh]] على [[/api/auth]]. النسخة اللي من غير path بتمسح كوكي مش موجودة، والأصلية بتفضل.

وجرّبت أبعت [[maxAge: 1000]] لـ [[clearCookie]]: الـ header طلع بنفس [[Expires=Thu, 01 Jan 1970]]. Express 5 بيتجاهل [[maxAge]] و [[expires]] هنا.

---

## ٦. الكوكي الموقّعة: [[signed: true]]

~~~javascript
res.cookie("theme", "dark", { signed: true, path: "/api/auth" });
~~~

~~~text الناتج
Set-Cookie: theme=s%3Adark.9CER6nKq5QVYOjSuM0cnkCXWougiovfbQ%2BsnaZ8gbqg; Path=/api/auth
~~~

- [[%3A]] هي [[:]] و [[%2B]] هي [[+]] بعد URL encoding. فالقيمة الحقيقية [[s:dark.9CER6n...]]: [[s:]] علامة إنها موقّعة، وبعدها القيمة [[dark]]، وبعد النقطة توقيع HMAC بالسر.
- القيمة **مقرية** ([[dark]] باينة)، التوقيع بيمنع التعديل بس.

رجّعتها زي ما هي، وبعدين غيّرت [[dark]] لـ [[light]] وسبت التوقيع:

~~~text الناتج
{"cookies":{},"signed":{"theme":"dark"}}
{"cookies":{},"signed":{"theme":false}}
~~~

الموقّعة بتظهر في [[req.signedCookies]] مش [[req.cookies]]، والمعدّلة قيمتها [[false]].

---

## ٧. من ويندوز

~~~powershell
curl.exe -i -X POST http://localhost:5846/api/auth/login
$r = Invoke-WebRequest -Method Post http://localhost:5846/api/auth/login -SessionVariable s
$r.Headers["Set-Cookie"]
Invoke-RestMethod http://localhost:5846/api/auth/whoami -WebSession $s
~~~

- [[curl.exe -i]] طبع نفس سطر [[Set-Cookie]].
- [[-SessionVariable s]]: اعمل «جلسة» اسمها [[$s]] تحفظ الكوكيز (زي [[-c jar.txt]]). و [[-WebSession $s]] في الطلب الجاي تبعتها (زي [[-b]]).
- في PowerShell 7 و 5.1 (مع [[-UseBasicParsing]] في 5.1) [[whoami]] رجّع [[{"cookies":{"refresh":"abc123"},"signed":{}}]].

---

## ٨. في المتصفح

curl مبيطبقش [[HttpOnly]] لأنه مفيهوش JavaScript. في المتصفح: DevTools ثم Application ثم Cookies هتلاقي علامة في عمود HttpOnly، و [[document.cookie]] في الـ Console مش هيظهر فيه [[refresh]] (ده سلوك المتصفح من الـ docs، و curl مبيوريهوش).

---

## الخلاصة

| | |
|---|---|
| [[cookieParser(secret)]] | [[req.cookies]] للعادية و [[req.signedCookies]] للموقّعة |
| [[res.cookie(name, value, options)]] | بيبعت [[Set-Cookie]]، و [[maxAge]] بالملّي ثانية بيتحول [[Max-Age]] بالثواني |
| [[httpOnly]] / [[secure]] / [[sameSite]] | JS ميقراهاش / HTTPS بس / مش مع طلبات مواقع تانية |
| [[path]] | الكوكي بتتبعت للعناوين اللي تحته بس |
| [[clearCookie]] | لازم نفس الـ path (والـ domain)، وإلا بيمسح كوكي تانية |

> خلي الإعدادات في object واحد واستخدمه في [[res.cookie]] وفي [[clearCookie]] (بالـ path)، فميحصلش اختلاف.`,
          lines: [
            "cookie-parser بيقرا header الـ Cookie.",
            "[[req.cookies]] للعادية، والسر عشان [[req.signedCookies]] (الموقّعة).",
            "إعدادات كوكي الـ refresh في مكان واحد.",
            "الـ JavaScript في المتصفح مش شايفها.",
            "HTTPS بس في الإنتاج، وعلى localhost بـ http بتبقى false.",
            "متتبعتش مع POST أو fetch جاي من مواقع تانية.",
            "تتبعت لعناوين الـ auth بس، مش مع كل طلب.",
            "تعيش ٣٠ يوم، بالملّي ثانية.",
            "قفلة.",
            "ابعتها.",
            "امسحها، بنفس الـ path وإلا المتصفح مش هيمسحها."
          ],
          sol: R`في Application > Cookies هتلاقي [[refresh]] وعمود HttpOnly عليه علامة، و SameSite [[Lax]]، و Path [[/api/auth]]، و Secure فاضي على localhost (لأن [[secure]] بـ true في production بس). والـ header اللي رجع كان شكله [[Set-Cookie: refresh=...; Max-Age=2592000; Path=/api/auth; Expires=...; HttpOnly; SameSite=Lax]].

[[document.cookie]] في الـ Console مش هيظهر فيه [[refresh]] خالص، لأن HttpOnly معناه إن JavaScript مايقدرش يقراها. فلو حصل XSS، الكود الخبيث مش هيقدر يسرقها.

[[res.clearCookie("refresh")]] من غير path بيبعت [[Set-Cookie: refresh=; Path=/; Expires=Thu, 01 Jan 1970 ...]]. المتصفح بيعتبر [[refresh]] على [[/]] كوكي مختلفة عن [[refresh]] على [[/api/auth]]، فبيمسح حاجة مش موجودة والأصلية بتفضل. لازم نفس الـ path (والـ domain لو حاطه).`
        },
        {
          cmd: "access و refresh",
          title: "توكن قصير للطلبات وتوكن طويل يجدده",
          desc: R`الـ access token عمره قصير وبيتبعت مع كل طلب، والـ refresh token عمره طويل ومتخزن في كوكي httpOnly، ووظيفته الوحيدة إنه يجيب access جديد.

والـ refresh بيتسجّل في الداتابيز (كـ hash)، فتقدر تلغيه: logout، أو «اخرج من كل الأجهزة»، أو يوزر اتحظر. ومع كل تجديد القديم بيتلغي وييجي جديد (rotation).`,
          example: R`router.post("/refresh", async (req, res) => {
  const token = req.cookies.refresh;
  if (!token) throw new AppError(401, "No refresh token");
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const stored = await prisma.refreshToken.findUnique({ where: { tokenHash }, include: { user: true } });
  if (!stored || stored.revokedAt || stored.expiresAt < new Date()) throw new AppError(401, "Invalid refresh token");
  await prisma.refreshToken.update({ where: { id: stored.id }, data: { revokedAt: new Date() } });
  const newToken = await issueRefreshToken(stored.user.id);
  res.cookie("refresh", newToken, refreshCookieOptions);
  res.json({ accessToken: signAccessToken(stored.user) });
});`,
          try: R`اعمل login وخد الـ refresh cookie، ونادي [[/refresh]] مرتين بنفس الكوكي القديمة (بـ curl و [[-b "refresh=..."]]). التانية لازم ترجع 401. وبعدين اعمل endpoint [[/logout-all]] يلغي كل refresh tokens اليوزر.`,
          flag: "script",
          deep: {
            why: "عايز حاجتين عكس بعض: توكن قصير عشان لو اتسرق ضرره يبقى محدود، ويوزر مش بيعمل login كل ربع ساعة. الحل توكنين: القصير للطلبات، والطويل محمي أكتر (httpOnly ومبيتبعتش غير لـ endpoint واحد) وممكن يتلغي من الداتابيز.",
            how: R`الرحلة: login بيرجّع access في الـ body (الواجهة تحفظه في الذاكرة، في state مش localStorage)، و refresh في كوكي httpOnly. الواجهة تبعت الـ access في [[Authorization]]. لما يرجع 401 بسبب الانتهاء، تنادي [[/refresh]] (المتصفح بيبعت الكوكي لوحده مع [[credentials: "include"]])، تاخد access جديد، وتعيد الطلب. ولو الصفحة اتعملها reload والـ access اللي في الذاكرة راح، أول حاجة تنادي [[/refresh]].

الـ refresh نفسه مش لازم يبقى JWT: نص عشوائي ([[crypto.randomBytes(32).toString("base64url")]]) كفاية لأنك بتدوّر عليه في الداتابيز أصلًا. و [[issueRefreshToken]] بيولّده، ويحفظ الـ hash بتاعه وتاريخ انتهاء، ويرجّعه.

الـ rotation: مع كل تجديد، القديم يتلغي وييجي جديد. لو حرامي سرق refresh واستخدمه، اليوزر الحقيقي لما يستخدم نفس التوكن هيلاقيه ملغي، ودي إشارة سرقة. التطبيقات الأدق بتلغي «العيلة» كلها ساعتها وتجبر login.

تخزين الـ hash بدل التوكن: لو الداتابيز اتسربت، التوكنات مش صالحة للاستخدام. SHA-256 كفاية هنا (مش bcrypt) لأن التوكن عشوائي وطويل، مش باسورد بشري ضعيف.

و [[path: "/api/auth"]] في إعدادات الكوكي بيخلي المتصفح يبعت الـ refresh للـ auth routes بس.`,
            when: "أي API بـ JWT لواجهة ويب أو موبايل. في الموبايل الـ refresh بيتخزن في secure storage (Keychain و Keystore) بدل الكوكي.",
            mistakes: R`في مشروع حقيقي كان الـ backend بيحط الـ refresh في كوكي httpOnly (صح)، وكمان بيرجّعه في الـ body، والواجهة بتحفظه في [[localStorage]]. كده الـ httpOnly ملهاش لازمة: أي XSS يقرا localStorage وياخد توكن عمره ٣٠ يوم. ابعته في الكوكي بس. وفي نفس المشروع endpoint الـ refresh كان بيقبل التوكن من الكوكي أو header الـ Authorization أو الـ body: كل مصدر زيادة باب زيادة. ومن غير rotation، refresh مسروق شغال لحد ما ينتهي.`
          },
          teach: R`## route واحد: كوكي قديمة تدخل، وكوكي جديدة و access جديد يطلعوا

الواجهة بتنادي [[POST /api/auth/refresh]] لما الـ access يخلص. الـ route بيدوّر على الـ refresh اللي في الكوكي في الداتابيز، ولو سليم يلغيه ويطلّع واحد جديد (rotation)، ويرجّع access جديد.

اتشغّل على ويندوز 11 بـ Node 24.19 و Express 5.2.1 و Prisma 7.10 على Postgres 16 في Docker، سيرفر على بورت 5845 فيه route login بيستخدم [[bcrypt.compare]] ويطلّع الكوكي، ويوزر تجربة [[sara@test.local]] (id 1). الجدول اللي بيتخزن فيه:

~~~text prisma/schema.prisma
model RefreshToken {
  id        Int       @id @default(autoincrement())
  tokenHash String    @unique
  userId    Int
  user      User      @relation(fields: [userId], references: [id])
  expiresAt DateTime
  revokedAt DateTime?
  createdAt DateTime  @default(now())
}
~~~

- [[tokenHash String @unique]]: بنخزن الـ hash مش التوكن، و [[@unique]] بيعمل index فالبحث بيه سريع ومينفعش يتكرر.
- [[revokedAt DateTime?]]: [[?]] يعني ممكن يبقى فاضي ([[null]]). فاضي = لسه شغال، وفيه تاريخ = اتلغى إمتى.

و [[issueRefreshToken(userId)]] اللي المثال بيناديها (المثال مش بيعرضها):

~~~javascript
async function issueRefreshToken(userId) {
  const token = crypto.randomBytes(32).toString("base64url");
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  await prisma.refreshToken.create({ data: { tokenHash, userId, expiresAt: new Date(Date.now() + 30 * 24 * 3600 * 1000) } });
  return token;
}
~~~

[[crypto.randomBytes(32)]]: ٣٢ بايت عشوائي آمن (من [[node:crypto]])، و [[toString("base64url")]] بيحولهم نص ٤٣ حرف ينفع في كوكي.

---

## ١. [[router.post("/refresh", async (req, res) => { ... })]]

مفيش [[requireAuth]] هنا، لأن السبب اللي الواجهة جاية عشانه إن الـ access **انتهى**.

## ٢. [[const token = req.cookies.refresh]]

الكوكي اللي اتعملت في الـ login، و [[cookieParser()]] لازم يكون متركّب. لو مش موجودة: [[throw new AppError(401, "No refresh token")]].

~~~bash
curl -i -X POST localhost:5845/api/auth/refresh
~~~

~~~text الناتج
HTTP/1.1 401 Unauthorized
{"error":"No refresh token"}
~~~

---

## ٣. [[crypto.createHash("sha256").update(token).digest("hex")]]

تلات خطوات في سلسلة (كل دالة بترجّع object تكمّل عليه):

| الحتة | بتعمل إيه |
|---|---|
| [[createHash("sha256")]] | ابدأ hash بـ algorithm SHA-256 |
| [[.update(token)]] | حط فيه التوكن |
| [[.digest("hex")]] | خلّص ورجّع الناتج نص hex (٦٤ حرف من [[0-9]] و [[a-f]]) |

نفس التوكن دايمًا بيدّي نفس الـ hash (مفيش salt هنا)، وده اللي محتاجينه عشان ندوّر بيه. وليه SHA-256 مش bcrypt؟ لأن التوكن ٣٢ بايت عشوائي، مستحيل يتخمّن، فمش محتاج دالة بطيئة.

---

## ٤. [[prisma.refreshToken.findUnique({ where: { tokenHash }, include: { user: true } })]]

- [[{ tokenHash }]] اختصار [[{ tokenHash: tokenHash }]].
- [[include: { user: true }]]: هات اليوزر صاحب التوكن في نفس الطلب، فيبقى عندك [[stored.user]] (محتاجينه عشان نعمل access بالدور بتاعه).

## ٥. [[if (!stored || stored.revokedAt || stored.expiresAt < new Date()) throw ...]]

تلات أسباب، أي واحد فيهم = 401 بنفس الرسالة:

1. [[!stored]]: مش موجود في الجدول (توكن مزيف).
2. [[stored.revokedAt]]: فيه تاريخ، يعني اتلغى.
3. [[stored.expiresAt < new Date()]]: تاريخ الانتهاء قبل دلوقتي.

---

## ٦. الـ rotation: ٣ سطور

~~~javascript
await prisma.refreshToken.update({ where: { id: stored.id }, data: { revokedAt: new Date() } });
const newToken = await issueRefreshToken(stored.user.id);
res.cookie("refresh", newToken, refreshCookieOptions);
~~~

الغي القديم، واعمل جديد، وابعته في الكوكي بنفس الإعدادات (درس [[res.cookie]]). وفي الآخر [[res.json({ accessToken: signAccessToken(stored.user) })]].

### التجربة: نفس الكوكي مرتين

عملت login بـ [[-c jar.txt]]، وخدت قيمة الكوكي، ونديت [[/refresh]] بيها مرتين بـ [[-b "refresh=..."]]:

~~~text الناتج: المرة الأولى
HTTP/1.1 200 OK
Set-Cookie: refresh=av25E1k4S6sVIw1li7g6dhdcBeC9ptRJFGUtFaxMgjc; Max-Age=2592000; Path=/api/auth; Expires=Fri, 06 Nov 2026 07:56:14 GMT; HttpOnly; SameSite=Lax
{"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIi..."}
~~~

~~~text الناتج: المرة التانية بنفس الكوكي القديمة
HTTP/1.1 401 Unauthorized
{"error":"Invalid refresh token"}
~~~

وفي الجدول (بـ [[docker exec ... psql]]):

~~~text الناتج
 id |      hash16      | userId | revoked
----+------------------+--------+---------
  1 | 840b5b52a257616d |      1 | t
  2 | 968ecfa95ecd7976 |      1 | f
~~~

الصف ١ (القديم) اتلغى، والصف ٢ (الجديد) شغال. والعمود فيه hash مش التوكن نفسه.

> ملاحظة من التجربة: الـ access اللي رجع من الـ refresh كان **نفس** اللي رجع من الـ login حرف بحرف، لأن الاتنين اتعملوا في نفس الثانية فـ [[iat]] و [[exp]] واحد. ده طبيعي: الـ JWT بيتحسب من الـ payload والسر بس.

---

## ٧. الـ solCode: [[/logout-all]]

~~~javascript
const { count } = await prisma.refreshToken.updateMany({
  where: { userId: req.user.id, revokedAt: null },
  data: { revokedAt: new Date() },
});
~~~

- عليه [[requireAuth]]: محتاج access سليم عشان نعرف مين.
- [[updateMany]] بيعدّل كل الصفوف اللي بتطابق، ويرجّع [[{ count }]] (عدد اللي اتعدّل).
- [[revokedAt: null]]: اللي لسه شغالة بس.

عملت login مرتين زيادة (جهازين)، ونديت [[/logout-all]] بالـ access:

~~~text الناتج
HTTP/1.1 200 OK
Set-Cookie: refresh=; Path=/api/auth; Expires=Thu, 01 Jan 1970 00:00:00 GMT
{"revoked":3}
~~~

٣ = التوكن اللي فضل من التجربة اللي فاتت + ٢ login. وبعدها [[/refresh]] بكوكي جهاز تاني رجّع [[401]] [[{"error":"Invalid refresh token"}]].

---

## ٨. من ويندوز

~~~powershell
$r = Invoke-RestMethod -Method Post http://localhost:5845/api/auth/login -ContentType 'application/json' -Body '{"email":"sara@test.local","password":"Test-Pass-1"}' -SessionVariable s
Invoke-RestMethod -Method Post http://localhost:5845/api/auth/refresh -WebSession $s
~~~

[[$s]] حفظ الكوكي ([[refresh]] و Path [[/api/auth]] و HttpOnly [[True]])، والـ refresh رجّع [[accessToken]] في PowerShell 7 و 5.1.

---

## الخلاصة

| الخطوة | السطر |
|---|---|
| الكوكي موجودة؟ | [[req.cookies.refresh]] وإلا 401 |
| دوّر بالـ hash | [[sha256]] ثم [[findUnique({ where: { tokenHash } })]] |
| سليم؟ | موجود ومش ملغي ومش منتهي، وإلا 401 |
| rotation | الغي القديم ([[revokedAt]]) واعمل جديد في الكوكي |
| رد | access جديد في الـ body |
| logout-all | [[updateMany]] على كل اللي [[revokedAt: null]] |

> كل refresh token بيتستخدم مرة واحدة. والـ access tokens اللي طلعت قبل الـ logout بتفضل شغالة لحد [[exp]] (١٥ دقيقة).`,
          lines: [
            "endpoint التجديد. مش عليه requireAuth، لأن الـ access نفسه ممكن يكون انتهى.",
            "الـ refresh جاي في كوكي (محتاج cookie-parser).",
            "مفيش؟ 401، والواجهة توديه على login.",
            "اعمل hash للتوكن ([[crypto]] من [[node:crypto]]). في الداتابيز بنخزن الـ hash بس، زي الباسورد.",
            "دوّر عليه ومعاه اليوزر.",
            "مش موجود أو ملغي أو منتهي؟ 401.",
            "rotation: الغي القديم. كل refresh يتستخدم مرة واحدة بس.",
            "اعمل refresh جديد واحفظ الـ hash بتاعه.",
            "ابعته في الكوكي بنفس الإعدادات.",
            "ورجّع access جديد في الـ body.",
            "قفلة."
          ],
          sol: R`أول [[/refresh]] بالكوكي القديمة بيرجّع [[200]] و [[accessToken]] جديد و [[Set-Cookie: refresh=...]] جديدة. التاني بنفس الكوكي القديمة بيرجّع [[401]] و [[{"error":"Invalid refresh token"}]]، لأن التوكن القديم اتعلّم عليه [[revokedAt]] في أول مرة. ده الـ rotation: كل refresh token بيتستخدم مرة واحدة، فلو اتسرق واستخدمه الحرامي، اليوزر الحقيقي هياخد 401 (أو العكس) وتعرف إن فيه مشكلة.

عشان تجرّب بـ curl: خد القيمة من [[curl -c jar.txt]] بعد login، وابعتها بـ [[curl -X POST -b "refresh=VALUE" localhost:3000/api/auth/refresh]]. لو أول طلب نفسه رجع 401، اتأكد إن [[cookieParser()]] متسجّل، وإن الـ path بتاع الكوكي [[/api/auth]] بيطابق الـ route.

و [[/logout-all]] بيعمل [[updateMany]] على كل توكنات اليوزر اللي لسه مش ملغية، ويمسح الكوكي. بعده أي refresh من أي جهاز بيرجع 401. الـ access tokens الموجودة هتفضل شغالة لحد ما تنتهي (15 دقيقة)، ودي التمنّ بتاع JWT.`,
          solCode: R`router.post("/logout-all", requireAuth, async (req, res) => {
  const { count } = await prisma.refreshToken.updateMany({
    where: { userId: req.user.id, revokedAt: null },
    data: { revokedAt: new Date() },
  });
  res.clearCookie("refresh", { path: "/api/auth" });
  res.json({ revoked: count });
});
// {"revoked":3}   وبعدها أي /refresh => 401`
        },
        {
          cmd: "express-session",
          title: "بديل الـ JWT: السيرفر يفتكرك",
          desc: R`في الـ session السيرفر بيحفظ بياناتك عنده (في Redis أو الداتابيز)، ويدّيك رقم عشوائي بس (session id) في كوكي httpOnly يبعته المتصفح مع كل طلب.

الفرق عن JWT: logout حقيقي (امسح الـ session وخلاص)، والكوكي مفيهاش بيانات، بس كل طلب محتاج lookup في الـ store.`,
          example: R`import session from "express-session";

app.use(session({
  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, secure: true, sameSite: "lax", maxAge: 7 * 24 * 3600 * 1000 },
}));

app.post("/api/auth/login", async (req, res) => {
  const user = await authService.checkPassword(req.body.email, req.body.password);
  await new Promise((resolve, reject) => req.session.regenerate((err) => (err ? reject(err) : resolve())));
  req.session.userId = user.id;
  res.json({ id: user.id });
});`,
          try: R`سجّل دخول وبص على الكوكي [[connect.sid]] في DevTools: رقم بس. اعمل route [[/me]] يرجّع [[req.session.userId]]، و route [[/logout]] فيه [[req.session.destroy]]. وأعد تشغيل السيرفر: الـ sessions كلها راحت، لأن الـ store الافتراضي في الذاكرة. (على localhost بـ http خلي [[secure]] false للتجربة.)`,
          flag: "script",
          deep: {
            why: "JWT مش دايمًا الإجابة. لموقع واحد على دومين واحد، الـ session أبسط: مفيش refresh flow، و logout وحظر اليوزر بيحصلوا فورًا، والكوكي فيها رقم بس.",
            how: R`أول مرة تحط حاجة في [[req.session]]، الـ middleware بيولّد id عشوائي طويل، ويحفظ [[{ userId: 7 }]] في الـ store تحت الـ id ده، ويبعت الـ id في كوكي موقّعة بالـ secret. مع كل طلب: يقرا الكوكي، ويتحقق من التوقيع، ويجيب الـ session من الـ store ويحطها في [[req.session]]. وفي آخر الطلب لو اتغيرت يحفظها.

الـ store الافتراضي [[MemoryStore]]: في ذاكرة العملية، بيضيع مع كل restart، ومبيتشاركش بين نسختين، وبيسرّب ذاكرة. للإنتاج Redis (باكدج [[connect-redis]]، والفكرة في درس [[stateless]] في تاب «Cloud و DevOps») أو الداتابيز.

[[regenerate]] بعد الـ login مهم: لو مهاجم قدر يزرع session id معروف في متصفح الضحية قبل الـ login (session fixation)، من غير regenerate الضحية هتعمل login على الـ id بتاع المهاجم. وحوّلناها لـ promise عشان أي خطأ فيها يوصل للـ error handler بدل ما يضيع جوه callback.

و [[secure: true]] ورا Nginx: Express شايف الطلب http (Nginx هو اللي عامل HTTPS)، فـ express-session مش هيبعت الكوكي. الحل [[app.set("trust proxy", 1)]] عشان يقرا [[X-Forwarded-Proto]].`,
            when: "موقع واحد (SSR أو SPA) على نفس الدومين، وخصوصًا لو محتاج logout فوري أو «اطرد اليوزر ده دلوقتي». JWT أنسب للموبايل، وللخدمات اللي بتكلّم بعض، ولأكتر من سيرفر من غير store مشترك.",
            mistakes: R`MemoryStore في الإنتاج: express-session نفسه بيطبع warning، والناس بتتجاهله. و [[saveUninitialized: true]] فكل bot بيعمل session في الـ store. وتنسى [[trust proxy]] ورا Nginx، فالكوكي الـ secure متتبعتش والـ login «مش شغال» على السيرفر بس.`
          },
          teach: R`## middleware بيدّي كل متصفح «درج» على السيرفر

[[express-session]] بيحط على كل طلب object اسمه [[req.session]]. اللي تكتبه فيه بيتحفظ على السيرفر (في الـ store)، والمتصفح بياخد رقم الدرج بس (الـ session id) في كوكي. الطلب الجاي بنفس الكوكي بيلاقي نفس [[req.session]].

اتشغّل على ويندوز 11 بـ Node 24.19 و Express 5.2.1 و express-session 1.19، سيرفر على بورت 5846. و [[authService.checkPassword]] في التجربة دالة صغيرة بترجّع [[{ id: 7 }]] للإيميل والباسورد الصح، وترمي [[AppError(401)]] لأي حاجة تانية. و [[secure]] كان [[false]] (السيرفر http على جهازي)، وجرّبت [[true]] لوحده تحت.

---

## ١. [[app.use(session({ ... }))]]

| الإعداد | معناه |
|---|---|
| [[secret]] | السر اللي بيتوقّع بيه الـ id في الكوكي، فمحدش يقدر يألّف id |
| [[resave: false]] | متحفظش الـ session في الـ store تاني في آخر كل طلب لو متغيرتش |
| [[saveUninitialized: false]] | متعملش session ولا كوكي لزائر لسه محطّتش له حاجة |
| [[cookie: { ... }]] | إعدادات الكوكي، نفس كلام درس [[res.cookie]]. و [[7 * 24 * 3600 * 1000]] = ٧ أيام بالملّي ثانية |

أثر [[saveUninitialized: false]] باين على طول: route عادي ([[GET /visit]]) رجّع [[200]] **من غير** أي [[Set-Cookie]].

---

## ٢. route الـ login سطر سطر

### [[const user = await authService.checkPassword(req.body.email, req.body.password)]]

لو الإيميل أو الباسورد غلط بترمي، و Express 5 بيودّي الخطأ للـ error handler:

~~~text الناتج: باسورد غلط
HTTP/1.1 401 Unauthorized
{"error":"Invalid email or password"}
~~~

ومفيش [[Set-Cookie]]، لأننا مكتبناش في الـ session حاجة.

### [[await new Promise((resolve, reject) => req.session.regenerate((err) => (err ? reject(err) : resolve())))]]

السطر الأطول. من جوه لبرة:

1. [[req.session.regenerate(callback)]]: امسح الـ session الحالية واعمل واحدة جديدة بـ id جديد، ولما تخلص نادي الـ callback، ولو حصل خطأ ابعتهولها في [[err]].
2. [[(err) => (err ? reject(err) : resolve())]]: الـ callback. [[? :]] (ternary) يعني «لو فيه err اعمل reject، وإلا resolve».
3. [[new Promise((resolve, reject) => ...)]]: بيلف الـ callback ده في Promise.
4. [[await]]: استنى لحد ما يخلص. ولو حصل reject الخطأ بيترمي هنا، فيوصل للـ error handler بدل ما يضيع جوه callback.

طبعت [[req.sessionID]] قبل وبعد:

~~~text الناتج
sid before azRjv-_2UguZiDy0JXGcbCzOj1MNZ1dV after LCmX5eXw4fmL4-OivmoLozL-nKNHJssV
~~~

الـ id اتغيّر. ده اللي بيقفل session fixation: لو حد زرع id في متصفحك قبل الـ login، بعد الـ login بقى ملوش لازمة.

### [[req.session.userId = user.id]]

هنا بس الـ session بقى فيها حاجة، فبتتحفظ في الـ store والكوكي بتتبعت:

~~~bash
curl -i -X POST localhost:5846/api/auth/login -H "Content-Type: application/json" -d '{"email":"sara@test.local","password":"Test-Pass-1"}' -c sj.txt
~~~

~~~text الناتج
HTTP/1.1 200 OK
Set-Cookie: connect.sid=s%3ALCmX5eXw4fmL4-OivmoLozL-nKNHJssV.VGrjsaiq0xJPXOjkzglh2C6cnzb4%2Fj57gPMBvnSkGVI; Path=/; Expires=Wed, 14 Oct 2026 07:57:32 GMT; HttpOnly; SameSite=Lax
{"id":7}
~~~

- [[connect.sid]] الاسم الافتراضي للكوكي (من أيام مكتبة connect القديمة).
- [[s%3A]] = [[s:]]، وبعدها الـ id ([[LCmX5e...]]، نفس اللي اتطبع بعد regenerate)، وبعد النقطة التوقيع. نفس شكل الـ signed cookie في درس [[res.cookie]].
- [[7]] مش موجود في الكوكي خالص. هو في ذاكرة السيرفر.
- [[Expires]] بعد ٧ أيام من وقت التجربة.

---

## ٣. الـ solCode: [[/me]] و [[/logout]]

~~~text الناتج
curl localhost:5846/api/auth/me -b sj.txt
{"userId":7}
~~~

[[/me]] بيقرا [[req.session.userId]]، ولو مش موجود [[return res.status(401).json(...)]]. الـ [[return]] عشان الدالة تقف ومتكمّلش للسطر اللي بعده.

و [[/logout]]:

- [[req.session.destroy(cb)]]: امسح الـ session من الـ store.
- [[if (err) return next(err)]]: لو فشل، ابعت الخطأ للـ error handler بإيدك (ده callback مش async، فـ Express مش هيمسكه لوحده).
- [[res.clearCookie("connect.sid")]] و [[res.sendStatus(204)]]: امسح الكوكي، ورد [[204 No Content]] (نجح ومفيش body).

~~~text الناتج
HTTP/1.1 204 No Content
Set-Cookie: connect.sid=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT
~~~

وبعدها بعتّ **الكوكي القديمة** (كنت حافظ نسخة منها) لـ [[/me]]:

~~~text الناتج
HTTP/1.1 401 Unauthorized
{"error":"Login required"}
~~~

الكوكي سليمة وموقّعة، بس الدرج اللي بتشاور عليه اتمسح. ده الـ logout الحقيقي اللي JWT ميقدرش يعمله.

---

## ٤. restart السيرفر

عملت login، وقفلت السيرفر وشغّلته، وبعتّ نفس الكوكي: [[401]] [[Login required]]. الـ store الافتراضي ([[MemoryStore]]) في ذاكرة الـ process وراح معاها. وبـ [[NODE_ENV=production]] express-session طبع وهو بيقوم:

~~~text الناتج
Warning: connect.session() MemoryStore is not
designed for a production environment, as it will leak
memory, and will not scale past a single process.
~~~

---

## ٥. [[secure: true]] على http، وورا proxy

| التجربة | [[Set-Cookie]] |
|---|---|
| [[secure: true]] وطلب http عادي | **مفيش**، والرد [[200 {"id":7}]] عادي، فالـ login «نجح» ومفيش كوكي |
| نفس الكلام + header [[X-Forwarded-Proto: https]] | برضه مفيش (Express مش بيصدّق الـ header) |
| + [[app.set("trust proxy", 1)]] + نفس الـ header | ظهر، وفيه [[Secure]] |

ده بالظبط اللي بيحصل ورا Nginx: Nginx عامل HTTPS ومكلّم Express بـ http، وبيبعت [[X-Forwarded-Proto: https]]. من غير [[trust proxy]]، الكوكي متتبعتش والـ login «مش شغال» على السيرفر بس.

---

## ٦. من ويندوز

~~~powershell
Invoke-RestMethod -Method Post http://localhost:5846/api/auth/login -ContentType 'application/json' -Body $b -SessionVariable s
Invoke-RestMethod http://localhost:5846/api/auth/me -WebSession $s
Invoke-WebRequest -Method Post http://localhost:5846/api/auth/logout -WebSession $s
~~~

([[$b]] فيه الـ JSON بتاع الإيميل والباسورد.) في PowerShell 7: [[{"userId":7}]]، وبعدين [[204]]، وبعدها [[/me]] رمى خطأ status [[401]].

---

## الخلاصة

| | JWT | session |
|---|---|---|
| في الكوكي أو الـ header | البيانات نفسها موقّعة | id عشوائي موقّع بس |
| البيانات فين | في التوكن | في الـ store على السيرفر |
| logout | التوكن شغال لحد [[exp]] | [[destroy]] وخلاص |
| كل طلب | حسبة توقيع | حسبة توقيع + lookup في الـ store |

> [[regenerate]] بعد الـ login، و store حقيقي (Redis) في الإنتاج، و [[trust proxy]] لو ورا Nginx.`,
          lines: [
            "express-session.",
            "ركّبه كـ middleware.",
            "سر لتوقيع الـ session id في الكوكي.",
            "متحفظش الـ session تاني لو متغيرتش.",
            "متعملش session لأي زائر، بس لما تحط فيها حاجة.",
            "إعدادات الكوكي زي أي كوكي auth.",
            "قفلة.",
            "login.",
            "اتأكد من الإيميل والباسورد (بترمي 401 لو غلط).",
            "اعمل session id جديد بعد الـ login (ضد session fixation)، ملفوف في promise عشان الخطأ يوصل للـ error handler.",
            "احفظ id اليوزر في الـ session. بيتخزن في الـ store، مش في الكوكي.",
            "رد.",
            "قفلة."
          ],
          sol: R`الكوكي [[connect.sid]] قيمتها حاجة زي [[s%3AuFsOrqRl9dKM...FrmadjhjIE...]]: الـ session id وبعده توقيع بالـ secret. مفيش فيها userId ولا أي بيانات؛ البيانات نفسها على السيرفر في الـ store.

[[/me]] بعد login بيرجّع [[{"userId":7}]]. بعد [[/logout]] ([[req.session.destroy]]) نفس الكوكي بترجّع 401، لأن الـ session اتمسحت من الـ store حتى لو المتصفح لسه باعت الـ id. ده الفرق الكبير عن JWT: الإلغاء فوري.

وبعد restart السيرفر [[/me]] بيرجع 401 برضه، لأن الـ MemoryStore في ذاكرة الـ process وراح معاها. في production لازم store زي Redis ([[connect-redis]]). ولو من الأول [[/me]] رجع 401 على localhost، غالبًا [[secure: true]] على http فالمتصفح رفض يحفظ الكوكي.`,
          solCode: R`app.get("/api/auth/me", (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: "Login required" });
  res.json({ userId: req.session.userId });
});

app.post("/api/auth/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie("connect.sid");
    res.sendStatus(204);
  });
});`
        }
      ]
    },
    {
      t: "Authorization والأمان",
      l: 2,
      n: "إنك تعرف هو مين مش كفاية: لازم تتأكد إن ليه الحق، وتقفل الأبواب المعروفة",
      items: [
        {
          cmd: "requireRole",
          title: "الأدمن بس يقدر يعمل كده",
          desc: R`authentication (انت مين) غير authorization (مسموحلك بإيه): بعد [[requireAuth]]، middleware تاني بيتأكد من الدور، والدور الغلط 403 مش 401.

ولما الصلاحيات تكتر، بدل ما تسأل «انت أدمن؟» في كل مكان، اسأل «معاك صلاحية [[users:manage]]؟»، والدور يتحول لقايمة صلاحيات في مكان واحد.`,
          example: R`export const requireRole = (...roles) => (req, res, next) => {
  if (!req.user) throw new AppError(401, "Login required");
  if (!roles.includes(req.user.role)) throw new AppError(403, "Forbidden");
  next();
};

const PERMISSIONS = {
  ADMIN: ["tasks:read", "tasks:delete-any", "users:manage"],
  USER: ["tasks:read"],
};
export const can = (perm) => (req, res, next) => {
  if (!PERMISSIONS[req.user?.role]?.includes(perm)) throw new AppError(403, "Forbidden");
  next();
};

router.delete("/users/:id", requireAuth, requireRole("ADMIN"), users.remove);`,
          try: R`اعمل يوزرين بدورين مختلفين، وجرّب endpoint الأدمن بكل واحد: الأدمن 200، والعادي 403، ومن غير توكن 401. وبعدين بدّل [[requireRole("ADMIN")]] بـ [[can("users:manage")]] واتأكد إن النتيجة واحدة.`,
          flag: "script",
          deep: {
            why: "أغلب التطبيقات فيها أنواع يوزرز: زبون وأدمن، أو موظف ومدير. لو فحص الدور مكتوب جوه كل handler بـ if، أول endpoint جديد تنساه فيه هيبقى مفتوح للكل. في middleware، الحماية بتبان في تعريف الـ route نفسه.",
            how: R`RBAC (role-based access control): كل يوزر ليه دور، وكل دور ليه صلاحيات. الأدوار الثابتة في الكود أبسط حاجة. ولما الأدمن محتاج يعمل أدوار جديدة من لوحة التحكم، الأدوار والصلاحيات بتتخزن في جداول (Role و Permission وجدول بيربطهم). في مشروع حقيقي لنظام محاسبة كان ده الشكل: الصلاحيات بتتحسب من الدور وتتحط على [[req.user.permissions]] جوه الـ auth middleware.

فحص الدور بيجاوب «ينفع يعمل النوع ده من العمليات؟». بس مبيجاوبش «ينفع يعملها على الحاجة دي بالذات؟»: يوزر عادي معاه [[tasks:read]]، بس على مهامه هو بس. ده الـ ownership check، الدرس الجاي، وهو اللي بيتنسي أكتر.

والدور جاي منين؟ لو من الـ JWT، تغييره مبيسريش غير لما التوكن ينتهي. لو من الداتابيز في [[requireAuth]]، بيسري فورًا.`,
            when: "أي تطبيق فيه لوحة أدمن أو أنواع يوزرز. ابدأ بسيط (أدوار ثابتة)، وانقل لصلاحيات في الداتابيز لما العميل يطلب يعمل أدوار بنفسه.",
            mistakes: R`تخبي زرار «مسح» في الواجهة وتفتكر كده محمي: الـ endpoint لسه شغال لأي حد بـ curl. وترجّع 401 بدل 403 فالواجهة تعمل logout. وتقارن الدور بـ string مكتوب بإيدك في ٣٠ مكان ([["admin"]] مرة و [["ADMIN"]] مرة): اعمل constants.`
          },
          teach: R`## دالة بترجّع middleware

[[requireAuth]] بيجاوب «انت مين؟». [[requireRole]] بييجي بعده ويجاوب «دورك مسموحله بده؟». الاتنين في نفس السطر بتاع الـ route، فالحماية باينة وانت بتقرا الـ route.

اتشغّل على ويندوز 11 بـ Node 24.19 و Express 5.2.1، على نفس سيرفر درس [[requireAuth]] (بورت 5845)، بتوكن ADMIN ليوزر 1 وتوكن USER ليوزر 7.

---

## ١. [[export const requireRole = (...roles) => (req, res, next) => { ... }]]

السطر ده فيه سهمين، يعني دالة جوه دالة:

| الحتة | معناها |
|---|---|
| [[(...roles) =>]] | الدالة الخارجية. [[...roles]] (rest parameter) بيلم كل الـ arguments في array: [[requireRole("ADMIN", "MANAGER")]] تبقى [[roles = ["ADMIN", "MANAGER"]]] |
| [[(req, res, next) => { ... }]] | الدالة اللي بترجع: ده الـ middleware الحقيقي اللي Express هيناديه |

ليه كده؟ لأن Express بينادي الـ middleware بـ [[(req, res, next)]] بس، ومفيش مكان نديله فيه الأدوار. فبنعمل «مصنع»: [[requireRole("ADMIN")]] بتتنفذ مرة وانت بتعرّف الـ route، وترجّع middleware فاكر [[roles]] (ده اسمه closure).

---

## ٢. جوه الـ middleware

~~~javascript
if (!req.user) throw new AppError(401, "Login required");
if (!roles.includes(req.user.role)) throw new AppError(403, "Forbidden");
next();
~~~

- السطر الأول حماية لو حد نسي [[requireAuth]] قبله: [[req.user]] مش موجود، فـ 401. جرّبت route عليه [[requireRole("ADMIN")]] لوحده من غير توكن: [[{"error":"Login required"}]].
- [[roles.includes(x)]]: [[true]] لو [[x]] جوه الـ array. لو الدور مش فيها: **403**.
- [[next()]]: مسموح، كمّل.

### 401 ولا 403؟

| | معناها | الواجهة تعمل إيه |
|---|---|---|
| 401 Unauthorized | مش عارف انت مين (مفيش توكن أو بايظ) | توديه صفحة login |
| 403 Forbidden | عارفك، بس مش مسموحلك | تعرض «مش مسموح»، **من غير** logout |

---

## ٣. [[router.delete("/users/:id", requireAuth, requireRole("ADMIN"), users.remove)]]

Express بينفّذهم بالترتيب من الشمال لليمين: requireAuth، وبعدين requireRole، وبعدين الـ handler. جرّبت التلات حالات:

~~~bash
curl -i -X DELETE localhost:5845/api/users/5 -H "Authorization: Bearer $ADMIN"
curl -i -X DELETE localhost:5845/api/users/5 -H "Authorization: Bearer $USER_T"
curl -i -X DELETE localhost:5845/api/users/5
~~~

~~~text الناتج (السطر الأول والـ body من كل رد)
HTTP/1.1 200 OK            {"deleted":"5"}
HTTP/1.1 403 Forbidden     {"error":"Forbidden"}
HTTP/1.1 401 Unauthorized  {"error":"Login required"}
~~~

التالت وقف عند [[requireAuth]] ومَوصلش لـ [[requireRole]] أصلًا.

وتوكن اتعمل بـ [[role: "admin"]] (حروف صغيرة) أخد [[403]]: [[includes]] بيقارن بالظبط، و [["admin"]] غير [["ADMIN"]].

---

## ٤. الصلاحيات بدل الأدوار: [[can(perm)]]

~~~javascript
const PERMISSIONS = {
  ADMIN: ["tasks:read", "tasks:delete-any", "users:manage"],
  USER: ["tasks:read"],
};
~~~

object مفاتيحه الأدوار، وكل دور قدامه قايمة صلاحيات. الاسم [["users:manage"]] مجرد string، والـ [[:]] جواه اتفاق للتنظيم (الحاجة : العملية)، مش syntax.

~~~javascript
if (!PERMISSIONS[req.user?.role]?.includes(perm)) throw new AppError(403, "Forbidden");
~~~

نفكها من جوه لبرة:

1. [[req.user?.role]]: [[?.]] (optional chaining) معناها «لو [[req.user]] موجود هات [[role]]، ولو مش موجود رجّع [[undefined]] من غير ما تقع».
2. [[PERMISSIONS["USER"]]]: الأقواس المربعة بتجيب المفتاح باسم جوه متغير، فترجع قايمة صلاحيات الدور.
3. [[?.includes(perm)]]: لو الدور مش في الجدول (القايمة [[undefined]]) رجّع [[undefined]] بدل ما يقع.
4. [[!]] قدام الكل: لو النتيجة مش [[true]] (يعني [[false]] أو [[undefined]]) ارمي 403.

ركّبت [[can("users:manage")]] على route تاني بنفس الشكل، والنتيجة نفس الجدول بالظبط: 200 للأدمن، و 403 لليوزر، و 401 من غير توكن. الفرق إن إضافة دور جديد ليه [[users:manage]] بقت سطر في [[PERMISSIONS]] بدل ما تلف على كل route.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[requireRole(...roles)]] | مصنع بيرجّع middleware فاكر الأدوار المسموحة |
| [[!req.user]] | نسيت requireAuth؟ 401 |
| [[!roles.includes(role)]] | الدور مش مسموح: 403 |
| [[can(perm)]] + [[PERMISSIONS]] | نفس الفكرة بالصلاحية بدل الدور |
| الترتيب في الـ route | auth ثم role ثم handler |

> الدور في الـ JWT بيفضل زي ما هو لحد ما التوكن ينتهي. والصلاحية على **نوع** العملية بس، أما «الحاجة دي بتاعتك؟» فده درس [[ownership (IDOR)]].`,
          lines: [
            "دالة بتاخد الأدوار المسموحة وترجّع middleware.",
            "مفيش يوزر أصلًا (نسيت requireAuth قبله): 401.",
            "الدور مش في القايمة: 403.",
            "مسموح، كمّل.",
            "قفلة.",
            "خريطة الأدوار للصلاحيات في مكان واحد.",
            "الأدمن يقدر يمسح مهام أي حد ويدير اليوزرز.",
            "اليوزر العادي يقرا بس (ومهامه هو بس، ودا الدرس الجاي).",
            "قفلة.",
            "middleware بيسأل عن صلاحية مش عن دور.",
            "الدور مش معاه الصلاحية دي: 403.",
            "كمّل.",
            "قفلة.",
            "الترتيب: auth الأول (مين)، وبعدين الدور (مسموح؟)، وبعدين الـ handler."
          ],
          sol: R`بتوكن الأدمن: [[200]]. بتوكن اليوزر العادي: [[403]] و [[{"error":"Forbidden"}]]. من غير توكن: [[401]] و [[{"error":"Login required"}]] (من requireAuth، قبل ما requireRole يشتغل). الفرق مهم: 401 يعني «مش عارف انت مين، اعمل login»، و 403 يعني «عارفك، بس مش مسموحلك».

بعد التبديل لـ [[can("users:manage")]] النتيجة نفسها بالظبط، لأن [[users:manage]] موجودة في ADMIN بس. الفرق إن لو بعدين عملت دور MODERATOR وعايزه يدير اليوزرين، هتزوّد الصلاحية في جدول [[PERMISSIONS]] بس، من غير ما تلف على كل route.

لو الأدمن نفسه أخد 403، اتأكد إن الدور مكتوب في التوكن ([[role]] في الـ payload) وبنفس الحروف: [[ADMIN]] مش [[admin]]. ولو اتغيّر دوره في القاعدة، التوكن القديم لسه فيه الدور القديم لحد ما يعمل login أو refresh.`
        },
        {
          cmd: "ownership (IDOR)",
          title: "تغيير رقم في العنوان بيوريك بيانات حد تاني؟",
          desc: R`IDOR يعني الـ endpoint بياخد id من العنوان ويجيب الحاجة من غير ما يتأكد إنها بتاعتك، فتغيير الرقم في [[GET /api/tasks/42]] يوريك مهمة يوزر تاني.

ودي أشهر ثغرة في الـ APIs (Broken Access Control، رقم ١ في OWASP). الحل: كل query بتاخد [[userId: req.user.id]] في الـ where، فالسؤال للداتابيز نفسه يبقى «هات المهمة ٤٢ اللي بتاعتي».`,
          example: R`// غلط: أي حد عامل login يقرا أي مهمة
const task = await prisma.task.findUnique({ where: { id } });

// صح: المهمة لازم تبقى بتاعتك
const task = await prisma.task.findFirst({ where: { id, userId: req.user.id } });
if (!task) throw new AppError(404, "Task not found");

// التعديل والمسح بنفس الشرط
const { count } = await prisma.task.deleteMany({ where: { id, userId: req.user.id } });
if (count === 0) throw new AppError(404, "Task not found");`,
          try: R`اعمل يوزرين وكل واحد يعمل مهمة. بتوكن الأول، حاول تقرا وتعدّل وتمسح مهمة التاني بالـ id بتاعها: التلاتة لازم 404. وبعدين دوّر في مشروعك على كل [[findUnique]] و [[update]] بـ id جاي من الطلب، وشوف أنهي فيهم ناقصه شرط الملكية.`,
          flag: "script",
          deep: {
            why: R`auth بيأكد إنك يوزر، والدور بيأكد إنك من النوع اللي يعمل كده. بس ولا واحد فيهم بيسأل «المهمة ٤٢ دي بتاعتك؟». والأرقام متتالية وسهلة التخمين، فأي حد يكتب loop من ١ لـ ١٠٠٠٠ وياخد بيانات كل الناس: فواتير، وعناوين، وصور بطاقات.`,
            how: R`الفكرة إن الـ ownership يبقى جزء من الـ query مش خطوة بعدها. [[findUnique]] وبعدين [[if (task.userId !== req.user.id)]] شغال برضه، بس سهل تنساه في endpoint، وبيقول للمهاجم إن الرقم موجود (403 مقابل 404).

للأنظمة اللي فيها شركات أو فرق (multi-tenant) الشرط بيبقى [[companyId: req.user.companyId]]. في مشروع حقيقي لنظام محاسبة كان كل controller بيفلتر بـ companyId لأي حد مش super admin، وكان فيه اختبار بيتأكد من ده بالظبط. والأحسن كمان تخلي الشرط تلقائي: Prisma client extension بيضيفه لكل query، أو Row Level Security في Postgres (درس «Row Level Security» في تاب «PostgreSQL»)، فحتى لو نسيت، الداتابيز نفسها ترفض.

و UUID بدل الأرقام المتتالية بيصعّب التخمين، بس مش حماية: الـ id بيتسرّب في لينكات ولوجات. الحماية الحقيقية الشرط في الـ query.

والأدمن اللي مسموحله يشوف كله؟ route منفصل تحت [[/api/admin]] بـ [[requireRole]]، بدل if جوه نفس الـ endpoint.`,
            when: R`كل endpoint بياخد id من العنوان أو الـ body، من غير استثناء: القراية والتعديل والمسح والتحميل ([[/files/:id]]).`,
            mistakes: R`تتحقق في القراية وتنسى في PATCH و DELETE. وتاخد [[userId]] من الـ body بدل [[req.user.id]]. وفي مشروع حقيقي كان socket.io بيقبل [[userId]] من العميل عشان يدخّله غرفة الرسايل بتاعته، فأي حد يقدر يسمع رسايل أي حد (التفاصيل في درس [[socket.io]] في تاب «بناء مشروع كامل»). وتفتكر إن UUID كفاية.`
          },
          teach: R`## الفرق كله في كلمة واحدة جوه الـ [[where]]

المثال ٣ queries بـ Prisma: واحدة غلط (بتدوّر بالـ id بس)، واتنين صح (الـ id **و** صاحب المهمة في نفس الشرط). اللي بيخلي الصح صح إن السؤال للداتابيز نفسه بقى «هات المهمة دي **لو بتاعتي**».

اتشغّل على ويندوز 11 بـ Node 24.19 و Prisma 7.10 على Postgres 16 في Docker، وسيرفر Express على بورت 5845 عليه [[requireAuth]]. يوزرين: سارة (id 1) وعمر (id 2)، وعمر عنده مهمة رقم 2 اسمها [["omar's secret"]]. كل الطلبات بتوكن سارة. وشغّلت الـ client بـ [[log: ["query"]]] فكل query بتطبع الـ SQL بتاعها.

---

## ١. الغلط: [[prisma.task.findUnique({ where: { id } })]]

- [[prisma.task]]: جدول المهام. [[findUnique]]: هات صف واحد بحقل unique (هنا الـ id).
- [[{ id }]] اختصار [[{ id: id }]]، والـ id جاي من العنوان ([[Number(req.params.id)]]).

حطيته في route تجربة وطلبت مهمة عمر بتوكن سارة:

~~~text الناتج
HTTP/1.1 200 OK
{"id":2,"title":"omar's secret","done":false,"createdAt":"2026-10-07T07:59:19.630Z","userId":2}
~~~

~~~text الـ SQL
SELECT ... FROM "public"."Task" WHERE ("public"."Task"."id" = $1 AND 1=1) LIMIT $2 OFFSET $3
~~~

الشرط فيه الـ id بس ([[1=1]] ده Prisma بيحطه وملوش معنى). ده الـ IDOR: سارة قرت مهمة مش بتاعتها بتغيير رقم.

---

## ٢. الصح: [[findFirst({ where: { id, userId: req.user.id } })]]

- [[findFirst]]: هات أول صف يطابق أي شرط (مش لازم unique).
- [[userId: req.user.id]]: الـ id من التوكن (درس [[requireAuth]])، مش من الطلب.

~~~text الـ SQL
SELECT ... WHERE ("public"."Task"."id" = $1 AND "public"."Task"."userId" = $2) LIMIT $3 OFFSET $4
~~~

الشرطين بقوا في نفس الـ SQL، فالداتابيز رجّعت [[null]]. وجرّبت [[findUnique({ where: { id, userId: req.user.id } })]]: طلّع **نفس الـ SQL** بالظبط ورجّع [[null]]. يعني [[findUnique]] بيقبل حقول زيادة جنب الـ unique (ده من Prisma 5).

## ٣. [[if (!task) throw new AppError(404, "Task not found")]]

[[null]] معناها «مش موجودة» أو «مش بتاعتك»، والرد واحد في الحالتين: **404**. لو رجّعت 403 للتانية، المهاجم يعرف إن الرقم ده موجود.

---

## ٤. التعديل والمسح: [[deleteMany]] و [[count]]

~~~javascript
const { count } = await prisma.task.deleteMany({ where: { id, userId: req.user.id } });
if (count === 0) throw new AppError(404, "Task not found");
~~~

ليه [[deleteMany]] مش [[delete]]؟ [[delete]] و [[update]] بيرموا خطأ لو ملقوش الصف:

~~~text الناتج: prisma.task.update({ where: { id: 99999 }, ... })
P2025 An operation failed because it depends on one or more records that were required but not found. No record was found for an update.
~~~

إنما [[deleteMany]] و [[updateMany]] بيرجّعوا [[{ count }]] (عدد الصفوف اللي اتأثرت) ومبيرموش. والـ [[const { count } =]] بياخد الخانة دي من الـ object (destructuring).

~~~text الناتج
del other: { count: 0 }      DELETE ... WHERE ("id" = $1 AND "userId" = $2)
upd other: { count: 0 }      UPDATE ... SET "title" = $1 WHERE ("id" = $2 AND "userId" = $3)
del own:   { count: 1 }
~~~

مهمة عمر: [[count: 0]] فـ 404 ومحصلش حاجة. مهمة سارة نفسها: [[count: 1]] واتمسحت.

---

## ٥. التجربة من بره بـ curl

~~~bash
curl -i -X GET    localhost:5845/api/tasks/2 -H "Authorization: Bearer $SARA"
curl -i -X PATCH  localhost:5845/api/tasks/2 -H "Authorization: Bearer $SARA" -H "Content-Type: application/json" -d '{"title":"hacked"}'
curl -i -X DELETE localhost:5845/api/tasks/2 -H "Authorization: Bearer $SARA"
~~~

~~~text الناتج (التلاتة)
HTTP/1.1 404 Not Found
{"error":"Task not found"}
~~~

وبتوكن عمر نفس [[GET]] رجّع [[200]] والعنوان لسه [["omar's secret"]]: محصلوش تعديل.

---

## الخلاصة

| | الشرط | مهمة حد تاني |
|---|---|---|
| غلط | [[where: { id }]] | 200 والبيانات |
| قراية | [[findFirst]] بـ [[{ id, userId: req.user.id }]] | [[null]] ثم 404 |
| تعديل / مسح | [[updateMany]] / [[deleteMany]] بنفس الشرط | [[count: 0]] ثم 404 |

> أي id جاي من الطلب لازم يمشي ومعاه [[userId: req.user.id]] في نفس الـ [[where]]. والرد 404 مش 403.`,
          lines: [
            "بيدوّر بالـ id بس، فأي id يرجّع أي مهمة.",
            "الـ id ومعاه صاحبها في نفس الـ where. [[findFirst]] شغال، ومن Prisma 5 [[findUnique]] كمان بيقبل [[userId]] جنب الـ id.",
            "مش لاقيها (مش موجودة أو مش بتاعتك)؟ 404 في الحالتين، عشان متأكدش إن الرقم موجود.",
            "[[deleteMany]] بالشرطين: بيمسح لو بتاعتك بس، وبيرجّع عدد اللي اتمسح.",
            "صفر يعني مش بتاعتك أو مش موجودة."
          ],
          sol: R`بتوكن اليوزر الأول على مهمة التاني: [[GET]] و [[PATCH]] و [[DELETE]] التلاتة بيرجّعوا [[404]] و [[{"error":"Task not found"}]]، وصاحب المهمة لسه بيقراها عادي بـ 200 ومتغيرتش. ليه 404 مش 403؟ عشان متأكدش للمهاجم إن الـ id ده موجود أصلًا.

لو واحد منهم رجّع 200 أو 204، ده IDOR حقيقي: غالبًا [[findUnique({ where: { id } })]] أو [[update({ where: { id } })]] من غير [[userId]]. وخلي بالك إن [[update]] و [[delete]] العاديين في Prisma محتاجين unique، فبتستخدم [[updateMany]] و [[deleteMany]] بالشرطين وتبص على [[count]].

للتدوير: [[grep -rnE "findUnique|update\(|delete\(" src/services]]، وكل سطر بياخد id جاي من [[req.params]] لازم يبقى معاه [[userId: req.user.id]] (أو فحص دور الأدمن صريح).`
        },
        {
          cmd: "helmet",
          title: "headers أمان على كل رد في سطر",
          desc: R`[[helmet()]] بيضيف مجموعة headers بتقول للمتصفح يتصرف بحذر، وبيشيل [[X-Powered-By: Express]].

متخمّنش نوع الملف، ومتعرضش الصفحة في iframe من موقع تاني، واستخدم HTTPS بس، ومتبعتش الـ referrer لمواقع تانية. لـ API بيرجّع JSON بس أغلبها مش فارق كتير، بس رخيص ومفيش سبب تسيبه. والمهم تعرف تعدّل اللي بيبوّظ حاجة بدل ما تشيله كله.`,
          example: R`import helmet from "helmet";

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));

// curl -I http://localhost:3000/health
// Content-Security-Policy: default-src 'self';base-uri 'self';...
// Strict-Transport-Security: max-age=31536000; includeSubDomains
// X-Content-Type-Options: nosniff
// X-Frame-Options: SAMEORIGIN
// Cross-Origin-Resource-Policy: cross-origin`,
          try: R`شغّل [[curl -I localhost:3000/health]] قبل helmet وبعده وقارن الـ headers. وبعدين اعمل صفحة على بورت تاني فيها صورة بتشاور على [[http://localhost:3000/uploads/x.png]]: مع الإعداد الافتراضي الصورة هتتمنع، ومع [[cross-origin]] هتظهر.`,
          flag: "script",
          deep: {
            why: "فيه هجمات بتعتمد على إن المتصفح «متساهل»: يعرض موقعك في iframe شفاف فوق زرار (clickjacking)، أو يشغّل ملف مرفوع كأنه script لأنه خمّن نوعه، أو يفتح الموقع بـ http فحد في النص يغيّره. الـ headers دي بتقفل الأبواب دي بإعدادات جاهزة ومجرّبة.",
            how: R`helmet مجموعة middlewares صغيرة، كل واحد بيحط header:

[[Content-Security-Policy]]: الصفحة تحمّل scripts وصور وستايلات منين. أهم header ضد XSS في الصفحات، وأقل أهمية لـ JSON API. [[Strict-Transport-Security]]: المتصفح يفتكر إن الموقع HTTPS بس لمدة سنة. [[X-Content-Type-Options: nosniff]]: متخمّنش النوع، التزم بـ Content-Type. [[X-Frame-Options]]: ممنوع iframe من مواقع تانية. [[Referrer-Policy: no-referrer]]. و [[Cross-Origin-Resource-Policy]] و [[Cross-Origin-Opener-Policy]]: مين يقدر يحمّل مواردك أو يفتح نافذتك.

كل واحد تقدر تعدّله أو تقفله: [[helmet({ contentSecurityPolicy: false })]] لو الـ API بيرجّع JSON بس، أو [[directives]] لو بيخدم صفحات.

ولو ورا Nginx، ممكن الـ headers تتحط في Nginx بدل Express. المهم متتحطش في الاتنين بقيم مختلفة، وافحص النتيجة من بره (درس «فحص الـ headers» في تاب «الأمان»).`,
            when: "كل تطبيق Express، كأول middleware. ولو بيخدم HTML (SSR أو صفحات ثابتة) اشتغل على CSP بجد.",
            mistakes: R`تشيله كله عشان صورة مش ظاهرة، بدل ما تعدّل [[crossOriginResourcePolicy]] بس. في مشروع حقيقي كان فيه ٣ middlewares يدوي لفولدرات الـ uploads، كل واحد بيحط headers الـ CORS و CORP بإيده بنفس الكود المنسوخ، والأسهل إعداد helmet واحد و [[cors()]] واحد. وتفتكر إن helmet بيحمي من XSS و SQL injection في الكود: هو headers بس، والـ validation والـ escaping لسه شغلك.`
          },
          teach: R`## سطر واحد بيغيّر الـ headers في كل رد

[[app.use(helmet(...))]] middleware بيشتغل قبل أي route، وبيحط على الرد مجموعة headers بتقول للمتصفح يتصرف بحذر. الكود نفسه بسيط، فالشغل الحقيقي إنك تعرف تقرا الـ headers اللي طلعت.

اتشغّل على ويندوز 11 بـ Node 24.19 و Express 5.2.1 و helmet 8.3، ٣ نسخ من نفس السيرفر فيها route [[/health]] بيرجّع [[{"ok":true}]]: من غير helmet، و [[helmet()]] الافتراضي، والإعداد اللي في المثال.

---

## ١. الكود

- [[import helmet from "helmet"]]: المكتبة.
- [[app.use(helmet({ ... }))]]: ركّبه **أول** middleware، عشان الـ headers تتحط على كل رد، حتى ردود الأخطاء.
- [[crossOriginResourcePolicy: { policy: "cross-origin" }]]: غيّر إعداد واحد بس من الافتراضي، والباقي زي ما هو.

---

## ٢. من غير helmet

~~~bash
curl -I localhost:5845/health
~~~

[[-I]] (حرف I كبير): ابعت طلب HEAD، يعني «هات الـ headers بس من غير body».

~~~text الناتج
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 11
ETag: W/"b-Ai2R8hgEarLmHKwesT1qcY913ys"
Date: Wed, 07 Oct 2026 08:04:10 GMT
Connection: keep-alive
Keep-Alive: timeout=5
~~~

[[X-Powered-By: Express]] بيقول لأي حد إن السيرفر Express، معلومة ملهاش لازمة تديها لمهاجم.

---

## ٣. مع المثال

~~~text الناتج
HTTP/1.1 200 OK
Content-Security-Policy: default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: cross-origin
Origin-Agent-Cluster: ?1
Referrer-Policy: no-referrer
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-DNS-Prefetch-Control: off
X-Download-Options: noopen
X-Frame-Options: SAMEORIGIN
X-Permitted-Cross-Domain-Policies: none
X-XSS-Protection: 0
Content-Type: application/json; charset=utf-8
...
~~~

[[X-Powered-By]] اختفى، وظهر ١٢ header. ومع [[helmet()]] من غير options الفرق الوحيد كان [[Cross-Origin-Resource-Policy: same-origin]].

### نقرا المهمين

| الـ header | معناه |
|---|---|
| [[Content-Security-Policy]] (CSP) | الصفحة تحمّل منين. [[default-src 'self']] = من نفس الموقع بس، و [[script-src 'self']] = مفيش scripts من مواقع تانية ولا inline، و [[frame-ancestors 'self']] = محدش يحطك في iframe. مهم لصفحات HTML، وأقل أهمية لـ JSON |
| [[Strict-Transport-Security]] (HSTS) | [[max-age=31536000]] ثانية = سنة: المتصفح يفتح الموقع HTTPS بس السنة دي، و [[includeSubDomains]] للـ subdomains كمان. المتصفح بيتجاهله على http عادي |
| [[X-Content-Type-Options: nosniff]] | متخمّنش نوع الملف، التزم بـ [[Content-Type]] |
| [[X-Frame-Options: SAMEORIGIN]] | نسخة أقدم من [[frame-ancestors]]: iframe من نفس الموقع بس (ضد clickjacking) |
| [[Referrer-Policy: no-referrer]] | متبعتش العنوان اللي اليوزر جاي منه لما يدوس لينك لبره |
| [[Cross-Origin-Resource-Policy]] (CORP) | مواقع تانية تقدر تعرض مواردك (صور، ملفات) ولا لأ |
| [[Cross-Origin-Opener-Policy]] | نافذة مفتوحة من موقع تاني متقدرش توصل لنافذتك |
| [[X-XSS-Protection: 0]] | بيقفل فلتر XSS قديم في المتصفحات كان هو نفسه بيعمل ثغرات |

---

## ٤. ليه [[cross-origin]]؟

[[same-origin]] (الافتراضي) معناها: صفحة على origin تاني متعرضش صورة من الـ API ده. والـ origin = البروتوكول والدومين والبورت، فـ [[localhost:5173]] (الواجهة في التطوير) و [[localhost:3000]] (الـ API) origins مختلفة. لو الواجهة بتعرض صور مرفوعة من الـ API، المتصفح هيمنعها، فبتفتح الإعداد ده بس بدل ما تشيل helmet كله.

اللي بيحصل في المتصفح (الصورة مبتظهرش، و Chrome بيكتب [[ERR_BLOCKED_BY_RESPONSE]]) سلوك متصفح من الـ docs، و curl مبيطبقهوش. اللي اتجرّب هنا هو الـ header نفسه: [[same-origin]] في الافتراضي، و [[cross-origin]] مع الإعداد.

---

## ٥. من ويندوز

~~~powershell
curl.exe -I http://localhost:5847/health
(Invoke-WebRequest -Method Head http://localhost:5847/health).Headers['X-Frame-Options']
~~~

[[.Headers['اسم']]] بيجيب header واحد. طلع [[SAMEORIGIN]] في PowerShell 7، و [[Cross-Origin-Resource-Policy]] طلع [[cross-origin]] في 5.1 (مع [[-UseBasicParsing]]).

---

## الخلاصة

| | |
|---|---|
| [[app.use(helmet())]] أول middleware | ١٢ header أمان، ومن غير [[X-Powered-By]] |
| عدّل واحد بس | [[helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } })]] |
| اقفل واحد | [[helmet({ contentSecurityPolicy: false })]] |
| افحص | [[curl -I]] قبل وبعد |

> helmet بيغيّر headers بس. مبيحميش من SQL injection ولا XSS في الكود بتاعك.`,
          lines: [
            "helmet.",
            "ركّبه أول middleware.",
            "الافتراضي [[same-origin]] بيمنع مواقع تانية تعرض صور أو ملفات من الـ API. لو الواجهة على دومين تاني وبتعرض صور مرفوعة، خليه cross-origin.",
            "قفلة."
          ],
          sol: R`قبل helmet: headers قليلة و [[X-Powered-By: Express]]. بعده: [[X-Powered-By]] اختفى، وظهر [[Content-Security-Policy: default-src 'self';...]] و [[Strict-Transport-Security: max-age=31536000; includeSubDomains]] و [[X-Content-Type-Options: nosniff]] و [[X-Frame-Options: SAMEORIGIN]] و [[Referrer-Policy: no-referrer]] و [[Cross-Origin-Opener-Policy: same-origin]] و [[Cross-Origin-Resource-Policy: same-origin]] وغيرهم (١٢ header في helmet 8).

الصورة: مع الافتراضي [[Cross-Origin-Resource-Policy: same-origin]]، صفحة على [[localhost:5173]] بتطلب صورة من [[localhost:3000]] (بورت مختلف = origin مختلف) والمتصفح بيرفض يعرضها، وفي Network بتشوف [[blocked:NotSameOrigin]] (أو ERR_BLOCKED_BY_RESPONSE في Chrome). مع [[{ policy: "cross-origin" }]] الـ header بيبقى [[cross-origin]] والصورة بتظهر.

لو الصورة ظهرت مع الإعداد الافتراضي، يبقى الصفحة والسيرفر على نفس الـ origin، أو المتصفح عنده الصورة في الكاش: اعمل hard reload.`
        },
        {
          cmd: "cors",
          title: "خلي الواجهة بتاعتك بس هي اللي تقرا ردود الـ API من المتصفح",
          desc: R`المتصفح بيمنع صفحة على origin تقرا رد من origin تاني إلا لو السيرفر قال صراحة إنه مسموح بـ [[Access-Control-Allow-Origin]]، ودي CORS.

مع الكوكيز ([[credentials]]) القواعد أشد: لازم origin محدد (مش [[*]]) و [[Access-Control-Allow-Credentials: true]]، والواجهة تبعت [[credentials: "include"]].`,
          example: R`import cors from "cors";

app.use(cors({
  origin: config.CORS_ORIGINS,
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  maxAge: 600,
}));

// الواجهة
fetch("https://api.example.com/api/tasks", { credentials: "include" });`,
          try: R`من Console على موقع تاني (زي example.com) اعمل [[fetch("http://localhost:3000/api/tasks")]]: هتشوف CORS error. زوّد الـ origin ده في [[CORS_ORIGINS]] وجرّب تاني. وافتح تاب Network وشوف طلب الـ OPTIONS اللي بيحصل قبل POST بـ JSON.`,
          flag: "script",
          deep: {
            why: "من غير الـ same-origin policy، أي موقع تفتحه كان هيقدر يعمل fetch لـ API البنك بتاعك بكوكيزك ويقرا الرد. المتصفح بيمنع القراية دي افتراضيًا (same-origin policy)، و CORS هو الطريقة المنظمة إنك تفتح استثناء لمواقعك انت بس.",
            how: R`الـ origin هو protocol و domain و port مع بعض: [[http://localhost:5173]] و [[http://localhost:3000]] origins مختلفة.

الطلبات «البسيطة» (GET، أو POST بفورم عادي) المتصفح بيبعتها على طول ومعاها [[Origin]]، ويبص على [[Access-Control-Allow-Origin]] في الرد: لو مش مطابق، الطلب اتنفذ على السيرفر فعلًا، بس الصفحة ممنوعة تقرا الرد. أي طلب تاني (JSON، أو header زي Authorization، أو PATCH و DELETE) المتصفح بيبعت قبله preflight: [[OPTIONS]] بيسأل «مسموح؟»، ولو الرد مش تمام الطلب الحقيقي مبيتبعتش خالص.

[[cors()]] من غير options بيرد بـ [[*]] لأي origin، ودا مقبول لـ API عام من غير كوكيز. مع [[credentials: true]] الـ [[*]] مرفوضة من المتصفح، فلازم الـ origin بالظبط. والـ array في [[origin]] بيقارن بالظبط، ولو الـ origin في القايمة بيرجّعه في الـ header، ولو مش فيها مبيحطش الـ header خالص فالمتصفح يمنع.

CORS مش حماية للسيرفر: curl و Postman والسيرفرات التانية مبيطبقوهاش أصلًا. هي بتحمي اليوزر من مواقع تانية بتستخدم متصفحه. والحماية الحقيقية للـ API هي auth.

وفي Express 5، [[app.options("*", cors())]] بتاعة الـ tutorials القديمة بتوقع السيرفر وهو بيقوم. [[app.use(cors())]] بيرد على الـ preflight لوحده، فمش محتاجها.`,
            when: R`لما الواجهة والـ API على origins مختلفة (حتى لو بورت مختلف على localhost). لو الاتنين تحت نفس الدومين من ورا Nginx ([[/api]])، مش محتاج CORS خالص.`,
            mistakes: R`في مشروع حقيقي كان التحقق من الـ origin يدوي بـ [[origin.includes("myapp.com")]]، فـ [[https://myapp.com.evil.io]] بيعدّي، ومعاه [[Allow-Credentials: true]]، يعني موقع المهاجم يقرا بيانات اليوزر. وفي نفس الكود كان في التطوير بيرجّع [[*]] مع [[credentials: true]]، والمتصفح بيرفض الكومبينيشن ده أصلًا. استخدم array بمطابقة كاملة أو regex مقفول من الأول للآخر زي [[/^https:\/\/([a-z0-9-]+\.)?myapp\.com$/]]. و «CORS error» في الـ Console ساعات بيبقى 500 أو 404 طالع من غير headers، فبص على الـ status في Network الأول (درس «CORS» في تاب «المتصفح»).`
          },
          teach: R`## الـ middleware بيرد على سؤال واحد: «الـ origin ده مسموح؟»

المتصفح بيبعت مع الطلب header اسمه [[Origin]] فيه الموقع اللي الصفحة جاية منه. [[cors()]] بيقارنه بالقايمة: لو موجود يحط في الرد [[Access-Control-Allow-Origin]] بنفس القيمة، ولو مش موجود ميحطوش، والمتصفح هو اللي يمنع الصفحة تقرا الرد.

اتشغّل على ويندوز 11 بـ Node 24.19 و Express 5.2.1 و cors 2.8.6، سيرفر على بورت 5848 و [[CORS_ORIGINS]] = [[["https://app.example.com", "https://example.com"]]]. curl مش متصفح، فبنبعت [[Origin]] بإيدنا بـ [[-H]] ونقرا الـ headers اللي رجعت. اللي المتصفح بيعمله بيها (يمنع أو يسمح) من مواصفات CORS.

---

## ١. إعدادات [[cors({ ... })]]

| الإعداد | معناه |
|---|---|
| [[origin: config.CORS_ORIGINS]] | array: مطابقة كاملة مع واحد منهم. القيمة من غير [[/]] في الآخر |
| [[credentials: true]] | يضيف [[Access-Control-Allow-Credentials: true]]، فالمتصفح يسمح بكوكيز مع الطلب ويقرا الرد |
| [[methods: [...]]] | الـ methods اللي هتتقال في رد الـ preflight |
| [[maxAge: 600]] | المتصفح يحفظ رد الـ preflight ٦٠٠ ثانية (١٠ دقايق) |

---

## ٢. طلب من origin مسموح

~~~bash
curl -i localhost:5848/api/tasks -H "Origin: https://example.com"
~~~

~~~text الناتج
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://example.com
Vary: Origin
Access-Control-Allow-Credentials: true
~~~

- [[Access-Control-Allow-Origin]] رجّع نفس الـ origin بالظبط (مش [[*]]، لأن [[credentials]] شغال).
- [[Vary: Origin]]: بيقول لأي cache في النص إن الرد بيختلف حسب [[Origin]]، فميدّيش رد موقع لموقع تاني.

## ٣. طلب من origin مش في القايمة

~~~bash
curl -i localhost:5848/api/tasks -H "Origin: https://example.com.evil.io"
~~~

~~~text الناتج
HTTP/1.1 200 OK
Vary: Origin
Access-Control-Allow-Credentials: true

[{"id":1}]
~~~

مفيش [[Access-Control-Allow-Origin]]، فالمتصفح هيرفض يدّي الرد للصفحة. بس لاحظ: الرد **رجع** و السيرفر طبع [[GET from https://example.com.evil.io]] في اللوج. الطلب اتنفذ. CORS بيمنع القراية في المتصفح، مش التنفيذ على السيرفر. والـ array بيقارن بالظبط، فـ [[example.com.evil.io]] معدّاش (عكس [[origin.includes("example.com")]] اللي في قسم الأخطاء).

---

## ٤. الـ preflight: [[OPTIONS]]

قبل [[POST]] بـ JSON، المتصفح بيسأل الأول. ده الطلب اللي بيبعته، كتبته بإيدي:

~~~bash
curl -i -X OPTIONS localhost:5848/api/tasks -H "Origin: https://example.com" -H "Access-Control-Request-Method: POST" -H "Access-Control-Request-Headers: content-type"
~~~

- [[Access-Control-Request-Method: POST]]: «عايز أبعت POST».
- [[Access-Control-Request-Headers: content-type]]: «ومعاه الـ header ده».

~~~text الناتج
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://example.com
Vary: Origin, Access-Control-Request-Headers
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET,POST,PATCH,DELETE
Access-Control-Allow-Headers: content-type
Access-Control-Max-Age: 600
Content-Length: 0
~~~

- [[204]]: تمام ومفيش body. [[app.use(cors())]] رد على الـ OPTIONS لوحده من غير route.
- [[Allow-Methods]] من [[methods]]، و [[Max-Age: 600]] من [[maxAge]].
- [[Allow-Headers]]: من غير [[allowedHeaders]]، cors بيرجّع نفس الـ headers اللي اتطلبت. لما طلبت [[content-type,authorization]] رجّع [[content-type,authorization]].

ونفس الـ preflight من [[https://evil.io]] رجّع [[204]] بس **من غير** [[Access-Control-Allow-Origin]]، فالمتصفح مش هيبعت الـ POST الحقيقي خالص.

### ليه POST بـ JSON محتاج preflight و GET لأ؟

الطلبات «البسيطة» (GET، أو POST بـ [[Content-Type]] من نوع فورم عادي) بتتبعت على طول. أي [[Content-Type: application/json]]، أو header زي [[Authorization]]، أو PATCH و DELETE، بيعدّوا على preflight الأول.

---

## ٥. [[fetch(..., { credentials: "include" })]] في الواجهة

من غيره المتصفح مبيبعتش الكوكيز لـ origin تاني أصلًا. ومعاه لازم الرد يبقى فيه origin محدد (مش [[*]]) و [[Allow-Credentials: true]]، وده اللي شفناه في ٢.

---

## ٦. [[app.options("*", cors())]] في Express 5

شغّلت السيرفر بالسطر ده زيادة، ووقع وهو بيقوم:

~~~text الناتج
PathError [TypeError]: Missing parameter name at index 1: *; visit https://git.new/pathToRegexpError for info
~~~

Express 5 مبقاش بيقبل [[*]] لوحدها كـ path. ومش محتاجها أصلًا: [[app.use(cors())]] بيرد على الـ preflight.

---

## ٧. من ويندوز

~~~powershell
curl.exe -i http://localhost:5848/api/tasks -H "Origin: https://example.com"
(Invoke-WebRequest http://localhost:5848/api/tasks -Headers @{ Origin = "https://example.com" }).Headers['Access-Control-Allow-Origin']
~~~

نفس الـ headers، و [[Invoke-WebRequest]] رجّع [[https://example.com]] في PowerShell 7 و 5.1 (مع [[-UseBasicParsing]]).

---

## الخلاصة

| الطلب | الرد | المتصفح |
|---|---|---|
| origin في القايمة | [[Allow-Origin: <نفسه>]] + [[Allow-Credentials]] | يدّي الرد للصفحة |
| origin مش في القايمة | من غير [[Allow-Origin]] | الطلب اتنفذ، والصفحة متقراش الرد |
| preflight مسموح | [[204]] + methods + headers + [[Max-Age]] | يبعت الطلب الحقيقي |
| preflight مش مسموح | [[204]] من غير [[Allow-Origin]] | الطلب الحقيقي ميتبعتش |

> CORS بيحمي اليوزر من مواقع تانية بتستخدم متصفحه. curl والسيرفرات مبيطبقوهوش، فحماية الـ API نفسه هي الـ auth.`,
          lines: [
            "باكدج cors.",
            "ركّبه قبل الـ routes.",
            "array من الـ origins المسموحة بالظبط (من config)، زي [[https://app.example.com]].",
            "اسمح بالكوكيز مع الطلب ([[Access-Control-Allow-Credentials: true]]). أما header الـ Authorization فمش محتاج ده: بيتسمح بـ [[allowedHeaders]]، و cors بيعكس الـ headers المطلوبة افتراضيًا.",
            "الـ methods المسموحة في رد الـ preflight.",
            "المتصفح يكاش رد الـ preflight ١٠ دقايق بدل ما يسأل كل مرة.",
            "قفلة.",
            R`في الواجهة: من غير [[credentials: "include"]] الكوكيز مبتتبعتش لـ origin تاني.`
          ],
          sol: R`من Console على example.com: [[fetch("http://localhost:3000/api/tasks")]] بيفشل بـ [[TypeError: Failed to fetch]]، وفي الـ Console رسالة حمرا زي [[has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present]]. والمهم: الطلب وصل السيرفر فعلًا واتنفّذ (هتشوفه في اللوج)؛ المتصفح هو اللي منع الصفحة تقرا الرد. (المتصفحات الجديدة ممكن تسألك الأول تسمح للموقع يوصل للـ local network، ودي حاجة منفصلة عن CORS.)

بعد ما تزوّد [[https://example.com]] في [[CORS_ORIGINS]] (من غير / في الآخر) وتعيد التشغيل، الرد بيرجع وفيه [[Access-Control-Allow-Origin: https://example.com]] و [[Access-Control-Allow-Credentials: true]].

والـ POST بـ JSON: في Network هتلاقي طلب [[OPTIONS]] قبله (preflight) رجع [[204]] وفيه [[Access-Control-Allow-Methods: GET,POST,PATCH,DELETE]] و [[Access-Control-Allow-Headers: content-type]] و [[Access-Control-Max-Age: 600]]، وبعدها الـ POST الحقيقي. الـ preflight بيحصل لأن [[Content-Type: application/json]] مش من الأنواع «البسيطة»، وبعد أول مرة المتصفح بيخزّنه ١٠ دقايق.`,
          solCode: R`// Console على https://example.com
await fetch("http://localhost:3000/api/tasks", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "from example.com" }),
});
// Network: OPTIONS /api/tasks 204  ثم  POST /api/tasks`
        },
        {
          cmd: "express-rate-limit",
          title: "حد لعدد الطلبات من نفس المصدر",
          desc: R`[[rateLimit]] بيعد طلبات كل IP في فترة، ولو عدّى الحد يرد 429.

حد عام معقول للـ API كله، وحد أشد بكتير لـ login و «نسيت الباسورد» و OTP، لأن دول اللي بيتعمل عليهم تخمين. وورا Nginx أو Cloudflare لازم [[app.set("trust proxy", 1)]]، وإلا كل الطلبات هتبان جاية من IP واحد (الـ proxy) والكل يتحظر مع بعض.

والعداد هنا في ذاكرة الـ process. أول ما يبقى عندك أكتر من نسخة، أو عايز حد لكل يوزر أو لكل API key حسب الباقة، العداد يروح Redis: درس [[rate-limit-redis]] في المستوى التالت.`,
          example: R`import { rateLimit } from "express-rate-limit";

app.set("trust proxy", 1);

const apiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: "draft-8", legacyHeaders: false });

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  message: { error: "Too many login attempts, try again later" },
});

app.use("/api", apiLimiter);
app.use("/api/auth/login", loginLimiter);`,
          try: R`خلي limit الـ login 3، واعمل ٤ محاولات غلط بـ [[curl -i]] وشوف 429 و headers الـ RateLimit في الرد. وبعدين ابعت [[X-Forwarded-For: 1.2.3.4]] بإيدك، مع trust proxy ومن غيره، واطبع [[req.ip]].`,
          flag: "script",
          deep: {
            why: "من غير حد، أي حد يجرّب مليون باسورد على حساب واحد، أو يبعت ألف طلب OTP (وانت بتدفع تمن كل SMS)، أو يعمل scraping لكل البيانات، أو يضغط السيرفر لحد ما يقع. الـ rate limit مش حماية كاملة، بس بيحوّل الهجمات دي من دقايق لسنين.",
            how: R`الـ limiter بيعمل key لكل طلب (افتراضيًا الـ IP، ومع IPv6 بيجمع الـ subnet كله عشان حد عنده ملايين العناوين ميلفّش عليه)، ويزوّد عداد في الـ store. أول ما العداد يعدّي [[limit]] جوه [[windowMs]]، بيرد 429 من غير ما الطلب يوصل للـ route.

الـ store الافتراضي في الذاكرة: كل نسخة من السيرفر ليها عداد لوحدها، ومع restart بيتصفّر. لو شغّال نسختين (PM2 cluster أو كذا container)، الحد الفعلي بيتضاعف. الحل store مشترك في Redis: [[store: new RedisStore({ prefix: "rl:api:", sendCommand: (c, ...a) => redis.call(c, ...a) })]]، و store لكل limiter (المكتبة بتطبع ValidationError في اللوج لو نفس الـ store اتدّى لاتنين). الإعداد الكامل وقرار [[passOnStoreError]] (لو Redis وقع تسمح ولا ترفض) في درس [[rate-limit-redis]].

الـ headers: [[standardHeaders: "draft-8"]] بيبعت مع كل رد [[RateLimit-Policy: "300-in-15min"; q=300; w=900; pk=:...:]] (الحصة والنافذة بالثواني) و [[RateLimit: "300-in-15min"; r=299; t=900]] (الباقي والثواني لحد التصفير)، ومع الـ 429 [[Retry-After]] بالثواني. العميل الكويس (والموبايل بتاعك) يقرا دول ويستنى بدل ما يخبط. و [[legacyHeaders: false]] بيشيل [[X-RateLimit-*]] القديمة.

[[trust proxy]]: [[req.ip]] بيتقري من الاتصال نفسه، وورا Nginx الاتصال جاي من Nginx، فالـ IP الحقيقي في [[X-Forwarded-For]]. الرقم [[1]] معناه «ثق في hop واحد قدامي». و [[true]] معناها ثق في أي حاجة، وده خطير: أي حد يبعت [[X-Forwarded-For]] مزيف ويبقى IP جديد مع كل طلب. و express-rate-limit بيحذّرك في اللوج لو شاف الإعداد ده.

و [[keyGenerator]] بيخليك تعد بحاجة غير الـ IP: id اليوزر للـ endpoints المحمية ([[(req) => req.user ? $__btuser:$__{req.user.id}$__bt : ipKeyGenerator(req.ip)]])، أو الـ API key لعملاء الـ API، أو الإيميل في login عشان تحمي الحساب نفسه حتى لو الهجوم من IPs كتير. ولو رجّعت الـ IP بنفسك لازم يعدّي على [[ipKeyGenerator]] (بيجمع عناوين IPv6 في subnet)، وإلا express-rate-limit بيطبع ValidationError في اللوج (مع أول طلب، من غير ما يوقّع السيرفر). و [[limit]] ممكن يبقى دالة: [[(req) => (req.user?.plan === "pro" ? 1000 : 100)]].`,
            when: "كل API عام. والحد الأشد على: login، و register، و forgot password، و OTP، وأي endpoint بيبعت إيميل أو SMS أو بيكلّم AI (بتدفع عليه).",
            mistakes: R`في مشروع حقيقي كان [[ioredis]] و [[rate-limit-redis]] متسطبين، والـ limiter فعليًا بيعد في الذاكرة، ومع أكتر من نسخة كل واحدة بتعد لوحدها. وفي نفس المشروع limiter صفحات الـ CMS كان [[skip]] بتاعه بيعدّي كل GET، فبقى بيحمي الـ POST بس. و [[trust proxy: true]] بدل رقم. ونسيانه خالص ورا Nginx: أول مرة الموقع يتزحم، كل الزوار يتحظروا مع بعض لأنهم «IP واحد».`
          },
          teach: R`## اتنين limiters: واحد واسع للـ API كله، وواحد ضيق للـ login

كل limiter عداد لكل IP جوه نافذة وقت. الطلب بيزوّد العداد، ولو عدّى الحد الـ limiter بيرد 429 بنفسه ومبيوصّلش الطلب للـ route.

اتشغّل على ويندوز 11 بـ Node 24.19 و Express 5.2.1 و express-rate-limit 8.7، بالكود ده بالظبط بس [[limit]] بتاع الـ login [[3]] بدل [[10]] (زي الـ try)، و route login بيرجّع 401 لأي باسورد غير [["ok"]]، و route [[/api/ip]] بيرجّع [[req.ip]]. نسختين: على بورت 5845 من غير [[trust proxy]]، وعلى 5846 بيه.

---

## ١. [[import { rateLimit } from "express-rate-limit"]]

الأقواس [[{ }]]: import بالاسم (named import). ده الشكل اللي المكتبة بتنصح بيه في النسخ الجديدة.

## ٢. [[app.set("trust proxy", 1)]]

[[req.ip]] بيتقري من الاتصال نفسه. ورا Nginx، الاتصال جاي من Nginx، والـ IP الحقيقي في header [[X-Forwarded-For]] اللي Nginx بيحطه. [[1]] = «صدّق hop واحد قدامي». تحت في ٦ هنشوف ده بيعمل إيه بالظبط.

---

## ٣. [[apiLimiter]]

~~~javascript
rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: "draft-8", legacyHeaders: false })
~~~

| الإعداد | معناه |
|---|---|
| [[windowMs]] | النافذة بالملّي ثانية: ١٥ × ٦٠ × ١٠٠٠ = ١٥ دقيقة |
| [[limit: 300]] | ٣٠٠ طلب لكل IP في النافذة |
| [[standardHeaders: "draft-8"]] | ابعت headers [[RateLimit]] و [[RateLimit-Policy]] بالشكل الجديد |
| [[legacyHeaders: false]] | متبعتش [[X-RateLimit-*]] القديمة |

~~~bash
curl -i localhost:5845/api/ip
~~~

~~~text الناتج
HTTP/1.1 200 OK
RateLimit: "300-in-15min"; r=299; t=900
RateLimit-Policy: "300-in-15min"; q=300; w=900; pk=:YmIwY2Q1MTM2YWU1:
{"ip":"::1"}
~~~

- [["300-in-15min"]] اسم السياسة.
- [[r=299]] (remaining): فاضل ٢٩٩. و [[t=900]]: العداد يتصفّر بعد ٩٠٠ ثانية.
- [[q=300]] (quota) الحد، و [[w=900]] (window) النافذة بالثواني، و [[pk]] بصمة مختصرة للـ key (الـ IP) مش الـ IP نفسه.
- [[::1]] هو localhost بـ IPv6، و curl على ويندوز اتصل بيه.

---

## ٤. [[loginLimiter]]

| الإعداد | معناه |
|---|---|
| [[limit: 10]] (٣ في التجربة) | محاولات قليلة |
| [[skipSuccessfulRequests: true]] | الطلب اللي رده أقل من 400 ميتعدّش، فاليوزر اللي بيدخل صح عمره ما يقرّب من الحد |
| [[message: { ... }]] | الـ body بتاع رد الـ 429. object، فبيترد JSON |

ومفيهوش [[standardHeaders]]، فبياخد الافتراضي: الـ headers القديمة [[X-RateLimit-*]].

## ٥. [[app.use("/api", apiLimiter)]] و [[app.use("/api/auth/login", loginLimiter)]]

الاتنين قبل الـ routes. وطلب login بيعدّي على الاتنين، لأن [[/api/auth/login]] تحت [[/api]].

### ٥ محاولات غلط ورا بعض

~~~bash
curl -i -X POST localhost:5845/api/auth/login -H "Content-Type: application/json" -d '{"password":"bad"}'
~~~

~~~text الناتج (المهم من كل رد)
401  RateLimit: ...; r=298  X-RateLimit-Limit: 3  X-RateLimit-Remaining: 2  X-RateLimit-Reset: 1791361265
401  RateLimit: ...; r=297  X-RateLimit-Remaining: 1
401  RateLimit: ...; r=296  X-RateLimit-Remaining: 0
429  RateLimit: ...; r=295  X-RateLimit-Remaining: 0  Retry-After: 900  {"error":"Too many login attempts, try again later"}
429  RateLimit: ...; r=294  ...
~~~

- [[RateLimit: ...; r=]] بتاع الـ [[apiLimiter]] بينزل مع كل طلب (حتى الـ 429، لأنه اتعد قبلها).
- [[X-RateLimit-*]] بتاعة الـ [[loginLimiter]]: الحد ٣، والباقي بينزل لصفر. و [[X-RateLimit-Reset]] وقت التصفير بالثواني من ١٩٧٠.
- الرابعة: [[429 Too Many Requests]] و [[Retry-After: 900]] (استنى ٩٠٠ ثانية) والرسالة بتاعتنا.

وبعدها بعتّ الباسورد الصح: برضه [[429]]. [[skipSuccessfulRequests]] بيمنع العد، بس لو الحد اتملى الـ limiter بيرد قبل ما الـ route يشتغل.

---

## ٦. [[trust proxy]] و [[X-Forwarded-For]]

~~~bash
curl localhost:5845/api/ip -H "X-Forwarded-For: 1.2.3.4"
curl localhost:5846/api/ip -H "X-Forwarded-For: 1.2.3.4"
curl localhost:5846/api/ip -H "X-Forwarded-For: 5.6.7.8"
~~~

~~~text الناتج
{"ip":"::1"}
{"ip":"1.2.3.4"}
{"ip":"5.6.7.8"}
~~~

- من غير trust proxy (5845): [[req.ip]] الاتصال الحقيقي، والـ header اتجاهل. والمكتبة طبعت في اللوج (مرة واحدة لكل limiter، مع أول طلب فيه الـ header):

~~~text الناتج
ValidationError: The 'X-Forwarded-For' header is set but the Express 'trust proxy' setting is false (default). This could indicate a misconfiguration which would prevent express-rate-limit from accurately identifying users. ...
  code: 'ERR_ERL_UNEXPECTED_X_FORWARDED_FOR',
~~~

- مع [[trust proxy 1]] (5846) **ومن غير proxy حقيقي**: [[req.ip]] بقى أي حاجة كتبتها. كل طلب بـ IP جديد = عداد جديد = عمره ما ياخد 429.

يعني [[1]] صح بس لما فيه فعلًا proxy واحد قدامك بيكتب الـ header ده بنفسه. السيرفر المكشوف مباشرة يفضل [[false]].

---

## ٧. من ويندوز

~~~powershell
1..4 | ForEach-Object { curl.exe -s -o NUL -w "%{http_code}" -X POST http://localhost:5846/api/auth/login }
~~~

- [[1..4]] أرقام من ١ لـ ٤، و [[ForEach-Object { }]] بيشغّل اللي بين القوسين لكل واحد.
- [[-o NUL]] ارمي الـ body (NUL في ويندوز زي [[/dev/null]])، و [[-w "%{http_code}"]] اطبع الـ status بس.

~~~text الناتج
401
401
401
429
~~~

و [[Invoke-RestMethod]] على الـ 429 رمى خطأ، و [[$_.Exception.Response.Headers.RetryAfter.Delta.TotalSeconds]] طلع [[900]] (PowerShell 7).

---

## الخلاصة

| | |
|---|---|
| [[windowMs]] + [[limit]] | كام طلب في كام وقت لكل IP |
| [[standardHeaders: "draft-8"]] | [[RateLimit: "...; r=باقي; t=ثواني"]] |
| من غيره | [[X-RateLimit-Limit]] / [[-Remaining]] / [[-Reset]] |
| عدّى الحد | [[429]] + [[Retry-After]] + الـ [[message]] |
| [[skipSuccessfulRequests]] | الناجح ميتعدّش |
| [[trust proxy]] | لازم يطابق الحقيقة، وإلا [[X-Forwarded-For]] مزيف يلف على الحد |

> العداد هنا في ذاكرة الـ process: كل نسخة من السيرفر ليها عداد، و restart بيصفّره. لأكتر من نسخة: Redis (درس [[rate-limit-redis]]).`,
          lines: [
            "الـ import بالاسم، الشكل الحديث.",
            "ثق في proxy واحد قدامك (Nginx)، فـ [[req.ip]] يبقى IP الزبون الحقيقي من [[X-Forwarded-For]].",
            "٣٠٠ طلب لكل IP كل ربع ساعة للـ API كله، والـ headers بالشكل الموحد الجديد.",
            "limiter تاني لـ login.",
            "نفس النافذة.",
            "١٠ محاولات بس.",
            "المحاولات الناجحة متتحسبش، فاليوزر العادي عمره ما يتحظر.",
            "رسالة JSON بدل النص الافتراضي.",
            "قفلة.",
            "ركّب العام على كل [[/api]].",
            "والأشد على login بس. الاتنين قبل الـ routes."
          ],
          sol: R`أول ٣ محاولات غلط بيرجّعوا 401 عادي، والرابعة [[429 Too Many Requests]] و [[{"error":"Too many login attempts, try again later"}]]. والـ headers: [[loginLimiter]] مفيهوش [[standardHeaders]]، فبيبعت الشكل الافتراضي القديم [[X-RateLimit-Limit: 3]] و [[X-RateLimit-Remaining: 0]] و [[X-RateLimit-Reset]] (وقت التصفير بالثواني من ١٩٧٠)، ومع الـ 429 [[Retry-After: 900]]. وفي نفس الرد [[RateLimit: "300-in-15min"; r=295; t=900]] و [[RateLimit-Policy]] بتوع [[apiLimiter]]، لأن login تحت [[/api]] فبيتعد في الاتنين. عايز الشكل الجديد للـ login كمان؟ زوّد [[standardHeaders: "draft-8", legacyHeaders: false]] فيه. ولأن [[skipSuccessfulRequests]] شغال، الـ login الصح مبيتعدّش (بس لو الحد اتملى، حتى الباسورد الصح بياخد 429 لحد ما النافذة تخلص).

[[X-Forwarded-For: 1.2.3.4]] من غير trust proxy: [[req.ip]] فاضل [[::1]] (أو [[127.0.0.1]] لو اتصلت بـ IPv4)، والمكتبة بتطبع تحذير [[ERR_ERL_UNEXPECTED_X_FORWARDED_FOR]] (مرة واحدة لكل limiter). ومع [[trust proxy]] بـ 1 ومن غير proxy حقيقي: [[req.ip]] بقى [[1.2.3.4]]، يعني أي حد يقدر يغيّر الـ IP بتاعه بـ header، ولو بعت IP مختلف كل مرة عمره ما هياخد 429.

الخلاصة: [[trust proxy]] لازم يطابق الحقيقة: 1 لو ورا nginx واحد أو load balancer واحد، و false لو السيرفر مكشوف مباشرة. غير كده الـ rate limit كله ملوش لازمة.`
        },
        {
          cmd: "sanitization",
          title: "النص اللي جاي من اليوزر: تنضّفه ولا تهرّبه؟",
          desc: R`القاعدة: اتحقق وانت داخل (validation)، وهرّب وانت خارج (escaping)، ونضّف HTML بس في الحقول اللي هي أصلًا HTML.

فيه ٣ حاجات بتتخلط: validation (ارفض اللي شكله غلط)، و sanitization (غيّر المدخل، زي trim أو شيل HTML)، و escaping (هرّب القيمة وقت ما تحطها في HTML أو SQL). React بيعمل escape لوحده، و Prisma بيبعت القيم كـ parameters لوحده، فأغلب الحماية الحقيقية بتحصل تلقائي لو استخدمت الأدوات صح. والـ HTML اللي جاي من rich text editor بس هو اللي محتاج DOMPurify.`,
          example: R`import DOMPurify from "isomorphic-dompurify";

const profileSchema = z.object({
  name: z.string().trim().max(80),
  bioHtml: z.string().max(5000).transform((html) => DOMPurify.sanitize(html)),
});

const search = String(req.query.q ?? "");
const found = await prisma.task.findMany({ where: { userId: req.user.id, title: { contains: search } } });

const email = z.email().parse(req.body.email);
const user = await User.findOne({ email });`,
          try: R`ابعت bioHtml فيه [[<img src=x onerror=alert(1)>]] واطبع اللي اتحفظ. وفي endpoint بـ Mongoose من غير zod، ابعت [[{"email": {"$ne": null}}]] وشوف بيرجّع مين.`,
          flag: "script",
          deep: {
            why: R`في مشروع حقيقي كان فيه middleware بيعدّي DOMPurify على كل حقل في كل body. النتيجة: أي نص فيه [[<]] (زي «a < b» أو «<3») بيتحفظ متغير ([[&lt;]])، والحماية الحقيقية (escape وقت العرض) كانت موجودة أصلًا في React. التنضيف العشوائي بيبوّظ بيانات ومبيحميش أكتر. لازم تعرف كل خطر بيتقفل فين.`,
            how: R`كل نوع injection ليه مكان بيتقفل فيه:

SQL injection: بيتقفل بالـ parameters. Prisma وأي query builder بيبعتوا القيم منفصلة عن الـ SQL. الخطر بس في [[$queryRawUnsafe]] أو تجميع strings بإيدك، و [[$queryRaw]] بالـ tagged template آمن لأنه بيحوّل القيم لـ parameters.

NoSQL injection في Mongo: لو [[req.body.email]] وصل object زي [[{ $ne: null }]] بدل string، [[findOne({ email })]] بيرجّع أول يوزر. الحل validation إن القيمة string (zod)، و Mongoose عنده option اسمه [[sanitizeFilter]] بيلف أي object فيه مفتاح بيبدأ بـ [[$]] في [[$eq]]، فالـ operator اللي جاي من برّه بيتعامل كقيمة عادية. ومكتبة [[express-mongo-sanitize]] القديمة مبتشتغلش مع Express 5 لأنها بتكتب على [[req.query]].

XSS: بيتقفل وقت العرض. React بيهرّب أي نص تلقائي، والخطر في [[dangerouslySetInnerHTML]]. لو لازم تحفظ HTML من اليوزر، نضّفه بـ DOMPurify.

Path traversal: اسم ملف جاي من اليوزر زي [[../../.env]]. متستخدمش أسماء اليوزر في المسارات خالص، اعمل اسم بـ UUID (درس [[sharp]]).

وأي مكتبة «بتنضّف كل حاجة» زي [[xss-clean]]: مهجورة، ومبتشتغلش على Express 5، وبتدّيك إحساس زايف بالأمان.`,
            when: "validation على كل حاجة داخلة، دايمًا. sanitize للـ HTML بس لما الحقل HTML فعلًا. والـ escape بيحصل تلقائي لو استخدمت الأدوات صح (React و Prisma)، وشغلك إنك متكسرش ده.",
            mistakes: R`تنضّف الـ body كله بـ DOMPurify فتبوّظ الباسوردات والتوكنات (في المشروع الحقيقي كانوا عاملين قايمة استثناءات للحقول الحساسة عشان كده بالظبط). وتعتمد على [[xss-clean]] وهو مش شغال. وتهرّب HTML وقت الحفظ وكمان وقت العرض، فاليوزر يشوف [[&lt;]] على الشاشة بدل [[<]].`
          },
          teach: R`## ٣ أمثلة صغيرة، كل واحد بيقفل نوع هجوم في مكانه

المثال مش route واحد، ده ٣ حتت: schema لبروفايل فيها حقل HTML بيتنضّف، وبحث بـ Prisma، و query في Mongo. كل حتة بتوري إن الحماية بتحصل في مكان محدد، مش بـ «نضّف كل حاجة».

اتشغّل على ويندوز 11 بـ Node 24.19 و zod 4.6 و isomorphic-dompurify 4.5 و Prisma 7.10 (Postgres 16 في Docker) و Mongoose 9.11 (Mongo 8 في Docker).

---

## ١. [[import DOMPurify from "isomorphic-dompurify"]]

DOMPurify مكتبة بتشيل من HTML أي حاجة ممكن تشغّل JavaScript وتسيب التنسيق. أصلها للمتصفح، و [[isomorphic-dompurify]] نسخة بتشتغل في Node كمان (بتجيب DOM وهمي من [[jsdom]]).

---

## ٢. [[profileSchema]]

~~~javascript
const profileSchema = z.object({
  name: z.string().trim().max(80),
  bioHtml: z.string().max(5000).transform((html) => DOMPurify.sanitize(html)),
});
~~~

- [[name]]: نص عادي. [[trim()]] بيشيل المسافات من الأول والآخر، و [[max(80)]] طول. مفيش تنضيف: React هيهرّبه وقت العرض.
- [[bioHtml]]: الحقل ده HTML فعلًا (جاي من rich text editor). [[.transform(fn)]] بيشغّل الدالة على القيمة بعد ما تعدّي الـ validation، واللي ترجّعه هو اللي [[parse]] بيرجّعه.

بعتّ:

~~~text المدخل
name:    "  Sara  "
bioHtml: <p>Hi <b>there</b></p><img src=x onerror=alert(1)><script>alert(2)</script><a href="javascript:alert(3)">x</a> a < b <3
~~~

~~~text الناتج
{
  name: 'Sara',
  bioHtml: '<p>Hi <b>there</b></p><img src="x"><a>x</a> a &lt; b &lt;3'
}
~~~

| الحتة | اللي حصل |
|---|---|
| [[  Sara  ]] | اتشالت المسافات |
| [[<p>]] و [[<b>]] | فضلوا: تنسيق مفيهوش خطر |
| [[onerror=alert(1)]] | اتشال، والصورة فضلت |
| [[<script>...</script>]] | اتشال كله |
| [[href="javascript:..."]] | اتشال، و [[<a>]] فضل من غير لينك |
| [[a < b <3]] | بقى [[&lt;]]: DOMPurify بيهرّب [[<]] اللي في النص |

السطر الأخير هو ليه متعدّيش DOMPurify على **كل** الحقول: نص عادي زي «a < b» هيتحفظ [[a &lt; b]]، وباسورد فيه [[<]] هيتغيّر. نضّف الحقول اللي هي HTML بس.

---

## ٣. البحث بـ Prisma

~~~javascript
const search = String(req.query.q ?? "");
const found = await prisma.task.findMany({ where: { userId: req.user.id, title: { contains: search } } });
~~~

- [[req.query.q ?? ""]]: لو مش مبعوت خد نص فاضي.
- [[String(...)]]: [[?q=a&q=b]] بيوصل array [[["a","b"]]]، و [[String]] بيحوّله [["a,b"]]. كده مضمون إنه نص.
- [[contains: search]]: العنوان فيه النص ده.

جرّبت [[q]] = [[x'; DROP TABLE "Task"; --]]:

~~~text الـ SQL
... WHERE ("public"."Task"."userId" = $1 AND "public"."Task"."title"::text LIKE ('%' || $2 || '%')) OFFSET $3
~~~

~~~text الناتج
0 1000
~~~

الـ [[$2]] parameter: النص اتبعت كقيمة منفصلة، فـ Postgres دوّر على عنوان فيه الكلام ده حرفيًا، ملقاش (٠)، والجدول لسه فيه ١٠٠٠ صف. مفيش تنضيف محتاج.

---

## ٤. Mongo: [[z.email().parse(req.body.email)]]

[[express.json()]] بيحوّل الـ body لـ object، فاليوزر يقدر يبعت object مكان النص:

~~~bash
curl -X POST localhost:5849/raw -H "Content-Type: application/json" -d '{"email": {"$ne": null}}'
~~~

route [[/raw]] بيعمل [[User.findOne({ email: req.body.email })]] على طول:

~~~text الناتج
{"_id":"6ac5fe0a347edc1a9d38fc80","email":"admin@test.local","name":"Admin","__v":0}
~~~

[[$ne]] = «not equal»، فالـ query بقت «أول يوزر الإيميل بتاعه مش null»، ورجّع الأدمن (أول واحد اتعمل) من غير ما نعرف إيميله. نفس الطلب من PowerShell 7 بـ [[Invoke-RestMethod -Method Post ... -Body '{"email": {"$ne": null}}']] رجّع [[admin@test.local]].

route [[/safe]] بيعمل [[z.email().parse]] الأول:

~~~text الناتج
HTTP/1.1 400 Bad Request
{"error":"Invalid input","issues":{},"formErrors":["Invalid input: expected string, received object"]}
~~~

[[z.email()]] في zod 4 = نص وشكله إيميل. الـ object اترفض قبل ما يوصل للـ query، وإيميل حقيقي ([["sara@test.local"]]) رجّع سارة عادي. (الخطأ طلع في [[formErrors]] مش [[issues]] لأن الـ schema على القيمة نفسها مش على حقل جوه object.)

### [[sanitizeFilter]]

جرّبت الحل التاني: [[mongoose.set("sanitizeFilter", true)]] ونفس الـ query الخام:

~~~text الناتج
CastError: Cast to string failed for value "{ '$ne': null }" (type Object) at path "email" for model "User"
~~~

Mongoose لف الـ object في [[$eq]] (يعني «يساوي الـ object ده بالظبط»)، ولأن [[email]] في الـ schema [[String]] رمى [[CastError]]. يعني الـ query اترفضت، بس كـ 500 لو مش ماسكه. الـ validation بـ zod أوضح لأنها بترجّع 400.

---

## الخلاصة

| الخطر | بيتقفل فين | في المثال |
|---|---|---|
| XSS من HTML اليوزر | تنضيف الحقل اللي هو HTML بس | [[transform(DOMPurify.sanitize)]] |
| XSS من نص عادي | وقت العرض (React بيهرّب) | [[name]] من غير تنضيف |
| SQL injection | parameters | Prisma: [[$2]] |
| NoSQL injection | validation إن القيمة string | [[z.email().parse]] |

> اتحقق وانت داخل، وهرّب وانت خارج، ونضّف الـ HTML بس.`,
          lines: [
            "DOMPurify بيشتغل في Node والمتصفح.",
            "schema لبروفايل.",
            "الاسم نص عادي: trim وطول. مش محتاج تنضيف، React هيهرّبه وقت العرض.",
            "الحقل ده HTML فعلًا (من rich editor)، فنضّفه: يشيل script و onerror ويسيب b و p.",
            "قفلة.",
            "البحث: اتأكد إنه نص...",
            "و Prisma بيبعته كـ parameter، فمفيش SQL injection مهما اتكتب. ومعاه شرط الملكية.",
            "في Mongo: اتأكد إنه إيميل، يعني string...",
            "فلو حد بعت object فيه [[$ne]] بدل إيميل، zod رفضه قبل ما يوصل للـ query."
          ],
          sol: R`اللي بيتحفظ من [[<p>Hi <b>there</b></p><img src=x onerror=alert(1)><script>alert(2)</script>]] هو [[<p>Hi <b>there</b></p><img src="x">]]: الـ [[onerror]] اتشال، و [[<script>]] اتشال كله، والتنسيق العادي فضل. ولو فيه [[<a href="javascript:alert(3)">]] بيبقى [[<a>]] من غير href. لو لقيت [[onerror]] لسه موجود، يبقى بتحفظ [[req.body.bioHtml]] الأصلي مش الناتج من الـ schema.

وفي Mongoose من غير zod: [[{"email": {"$ne": null}}]] بيتحول لـ [[User.findOne({ email: { $ne: null } })]]، يعني «أول يوزر الإيميل بتاعه مش null»، فبيرجّع أول يوزر في الـ collection (غالبًا الأدمن اللي اتعمل الأول) من غير ما تعرف إيميله. في login ده ممكن يبقى دخول بدون باسورد لو الكود بيقارن بطريقة غلط.

مع [[z.email().parse(req.body.email)]] نفس الطلب بيرمي [[ZodError]] و [[Invalid input: expected string, received object]] وبيبقى 400. (وحل تاني على مستوى Mongoose: [[mongoose.set("sanitizeFilter", true)]].)`
        }
      ]
    },
    {
      t: "قاعدة البيانات",
      l: 2,
      n: "Prisma من جوه الـ services، و transactions للعمليات اللي لازم تتم كلها أو ولا حاجة، و pagination لأي قايمة",
      items: [
        {
          cmd: "Prisma client",
          title: "كلّم الداتابيز من الـ service",
          desc: R`Prisma بيولّد client من الـ schema فيه دالة لكل جدول ([[prisma.task.findMany]] و [[create]] و [[update]])، وبتعمل منه instance واحد للتطبيق كله في [[db.js]].

إزاي تكتب الـ schema والـ migrations وإعداد Prisma 7 (الـ generator والـ driver adapter)، ده في تاب «SQL و Prisma». هنا بنستخدمه من Express.`,
          example: R`// services/tasks.service.js
import { prisma } from "../db.js";

export const list = (userId) =>
  prisma.task.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, select: { id: true, title: true, done: true } });

export const create = (userId, data) => prisma.task.create({ data: { ...data, userId } });

export const update = async (userId, id, data) => {
  const { count } = await prisma.task.updateMany({ where: { id, userId }, data });
  if (count === 0) throw new AppError(404, "Task not found");
  return prisma.task.findUnique({ where: { id } });
};`,
          try: R`حوّل الـ array اللي في الذاكرة لجدول Task في Prisma، وخلي كل الـ services تستخدمه. شغّل السيرفر مرتين ورا بعض واتأكد إن البيانات لسه موجودة. وفعّل [[log: ["query"]]] في الـ client وشوف الـ SQL الحقيقي.`,
          flag: "script",
          deep: {
            why: "الـ array اللي في الذاكرة بيضيع مع كل restart ومبيتشاركش بين نسختين. الداتابيز هي المكان الحقيقي، و Prisma بيخليك تكلّمها بـ JavaScript فيه autocomplete وأنواع بدل SQL strings، ومن غير SQL injection.",
            how: R`الـ client بيفتح pool من الاتصالات بالداتابيز ويعيد استخدامها، وكل [[new PrismaClient()]] يعني pool جديد. عشان كده instance واحد في [[db.js]]، وكل الملفات بتستورد نفس الـ module (والـ module في Node بيتحمّل مرة واحدة). اتنين أو تلاتة instances في ملفات مختلفة معناها اتصالات مضاعفة، ومع كل restart في التطوير ممكن توصل لـ [[too many connections]].

في Prisma 7: الـ generator الجديد [[prisma-client]] بيطلّع الكود في فولدر انت بتحدده (مش جوه node_modules) وبتستورد منه، ومحتاج driver adapter زي [[@prisma/adapter-pg]]، ومتغيرات البيئة مبقتش بتتقري لوحدها. والكود المتولّد TypeScript، فلو الـ backend بتاعك JavaScript غالبًا هتكتبه TypeScript أو تشغّله بـ tsx. كل ده بالتفصيل في تاب «SQL و Prisma».

[[select]] بيرجّع الحقول اللي طلبتها بس، ودا مهم لحاجتين: الأداء، وإنك متسرّبش [[passwordHash]] في رد بالغلط. و [[include]] بيجيب العلاقات ([[include: { tags: true }]]).

والأخطاء ليها [[code]]: [[P2002]] قيمة unique اتكررت (الإيميل موجود)، و [[P2025]] السجل مش موجود في update أو delete. حوّلهم لـ 409 و 404 في الـ error handler.`,
            when: "أي backend بـ Postgres أو MySQL أو SQLite. البدائل: Drizzle (أقرب لـ SQL وأخف)، و Kysely، أو [[pg]] مباشرة لو عايز SQL صافي.",
            mistakes: R`في مشروع حقيقي كان [[db.js]] عامل singleton صح، بس فيه كمان [[setInterval]] كل دقيقتين يعمل [[SELECT 1]] ويعيد الاتصال بإيده. Prisma بيدير الـ pool لوحده، والكود ده زوّد تعقيد من غير فايدة. وترجّع نتيجة [[prisma.user.findUnique]] كلها في الرد ومعاها الـ hash. و [[await]] جوه loop على ١٠٠٠ عنصر بدل [[createMany]] أو شرط [[in]].`
          },
          teach: R`## ملف service فيه ٣ دوال، كل واحدة query

المثال [[services/tasks.service.js]]: دوال بتاخد [[userId]] وبيانات عادية، وتكلّم الداتابيز بـ [[prisma]]، وترجّع النتيجة. الـ controller يناديها ويرجّع اللي رجع كـ JSON. والـ solCode هو [[db.js]] اللي بيعمل الـ client.

اتشغّل على ويندوز 11 بـ Node 24.19 و Prisma 7.10 و [[@prisma/adapter-pg]]، على Postgres 16 في Docker (container باسم [[teach-api02-pg]] على بورت 54872)، وسيرفر Express على 5845 عليه [[requireAuth]] والـ routes بتنادي الـ service دي. الـ schema فيها [[model Task]] بـ [[id]] و [[title]] و [[done]] و [[createdAt]] و [[userId]].

---

## ١. الـ solCode الأول: [[db.js]]

~~~javascript
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

export const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  log: process.env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["error"],
});
~~~

| الحتة | معناها |
|---|---|
| [[./generated/prisma/client.js]] | الكود اللي [[npx prisma generate]] ولّده من الـ schema، في الفولدر اللي حددته في [[output]] |
| [[PrismaPg]] | الـ driver adapter: Prisma 7 بيكلّم Postgres من خلال مكتبة [[pg]] |
| [[connectionString: process.env.DATABASE_URL]] | عنوان الداتابيز من متغير بيئة، زي [[postgresql://user:pass@localhost:54872/app]] |
| [[log: [...]]] | في التطوير اطبع كل query، وفي غيره الأخطاء بس |
| [[export const prisma]] | instance واحد، وأي ملف يعمل [[import { prisma } from "./db.js"]] بياخد نفسه |

الكود المتولّد ملفات [[.ts]] مش [[.js]]. فلما شغّلت بـ [[node]] عادي:

~~~text الناتج
ERR_MODULE_NOT_FOUND Cannot find module '...\generated\prisma\client.js' imported from ...\db.js
~~~

وبـ [[npx tsx server.js]] اشتغل، لأن tsx بيفهم TypeScript وبيلاقي [[client.ts]] لما تكتب [[client.js]].

---

## ٢. [[list]]

~~~javascript
export const list = (userId) =>
  prisma.task.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, select: { id: true, title: true, done: true } });
~~~

- [[(userId) => ...]] من غير [[{ }]]: الدالة بترجّع اللي بعد السهم على طول (Promise من Prisma).
- [[findMany]]: هات كل الصفوف اللي تطابق.
- [[where: { userId }]]: مهام اليوزر ده بس.
- [[orderBy: { createdAt: "desc" }]]: الأحدث الأول (desc = descending، تنازلي).
- [[select: { id: true, ... }]]: الحقول دي بس.

~~~text الناتج: GET /api/tasks
[{"id":4,"title":"learn prisma","done":false}]
~~~

~~~text الـ SQL في اللوج
prisma:query SELECT "public"."Task"."id", "public"."Task"."title", "public"."Task"."done" FROM "public"."Task" WHERE "public"."Task"."userId" = $1 ORDER BY "public"."Task"."createdAt" DESC OFFSET $2
~~~

[[select]] اتحول لأعمدة محددة بدل [[*]]، فـ [[createdAt]] و [[userId]] مطلعوش في الرد. و [[$1]] و [[$2]] **parameters**: القيم بتتبعت منفصلة عن نص الـ SQL، فمهما اليوزر كتب مش هيتنفذ كـ SQL.

---

## ٣. [[create]]

~~~javascript
export const create = (userId, data) => prisma.task.create({ data: { ...data, userId } });
~~~

[[...data]] (spread) بينسخ كل الحقول اللي في [[data]]، وبعدها [[userId]]. ولأن [[userId]] جاي **بعد**، لو [[data]] فيها [[userId]] من اليوزر بيتكتب عليه. (وفي الأصل [[data]] جاية من validation فمش هيبقى فيها.)

~~~text الناتج: POST /api/tasks {"title":"learn prisma"}
HTTP/1.1 201 Created
{"id":4,"title":"learn prisma","done":false,"createdAt":"2026-10-07T07:59:47.133Z","userId":1}
~~~

~~~text الـ SQL
INSERT INTO "public"."Task" ("title","done","createdAt","userId") VALUES ($1,$2,$3,$4) RETURNING "public"."Task"."id", ...
~~~

[[create]] من غير [[select]] بيرجّع الصف كله، و [[RETURNING]] هو اللي بيجيبه في نفس الـ query. [[done]] و [[createdAt]] من الـ defaults اللي في الـ schema.

---

## ٤. [[update]]

~~~javascript
export const update = async (userId, id, data) => {
  const { count } = await prisma.task.updateMany({ where: { id, userId }, data });
  if (count === 0) throw new AppError(404, "Task not found");
  return prisma.task.findUnique({ where: { id } });
};
~~~

1. [[updateMany]] بالشرطين (درس [[ownership (IDOR)]]) ويرجّع [[{ count }]].
2. [[count === 0]]: مش موجودة أو مش بتاعتك، فـ 404.
3. [[updateMany]] مبيرجّعش الصف، فـ [[findUnique]] بيجيب النسخة الجديدة. هنا آمن بالـ id بس، لأننا لسه متأكدين إنها بتاعتك.

~~~text الـ SQL
UPDATE "public"."Task" SET "title" = $1 WHERE ("public"."Task"."id" = $2 AND "public"."Task"."userId" = $3)
SELECT ... FROM "public"."Task" WHERE ("public"."Task"."id" = $1 AND 1=1) LIMIT $2 OFFSET $3
~~~

---

## ٥. البيانات بتفضل بعد الـ restart

قفلت السيرفر وشغّلته تاني، و [[GET /api/tasks]] رجّع [[[{"id":4,"title":"learn prisma 7","done":false}]]]، والمهمة الجديدة اللي بعدها أخدت [[id 5]]: العداد بيكمّل من الداتابيز مش من الصفر.

---

## ٦. الأخطاء ليها [[code]]

عملت يوزر بإيميل موجود:

~~~text الناتج
Unique constraint failed on the constraint: $__btUser_email_key$__bt
P2002
~~~

[[e.code]] بـ [[P2002]] = قيمة unique اتكررت، فحوّلها 409. و [[P2025]] (شفناه في درس الـ IDOR) = الصف مش موجود في update أو delete، فـ 404.

---

## الخلاصة

| الدالة | Prisma | SQL |
|---|---|---|
| [[list]] | [[findMany]] + [[where]] + [[orderBy]] + [[select]] | [[SELECT cols ... WHERE ... ORDER BY]] |
| [[create]] | [[create({ data })]] | [[INSERT ... RETURNING]] |
| [[update]] | [[updateMany]] بشرط الملكية ثم [[findUnique]] | [[UPDATE ... WHERE id AND userId]] |

> [[new PrismaClient]] في [[db.js]] بس، وكل الملفات تستورده. و [[select]] دايمًا لما ترجّع بيانات يوزر، عشان [[passwordHash]] ميطلعش في الرد.`,
          lines: [
            "الـ client الوحيد من db.js.",
            "مهام يوزر معين...",
            "بشرط الملكية، والأحدث الأول، والحقول اللي محتاجها بس.",
            "إضافة: البيانات المتحققة ومعاها صاحبها من التوكن.",
            "تعديل.",
            "عدّل بشرط الملكية.",
            "متعدلش حاجة: 404.",
            "رجّع النسخة الجديدة.",
            "قفلة."
          ],
          sol: R`بعد ما تعمل مهام وتقفل السيرفر وتشغّله تاني، [[GET /api/tasks]] بيرجّع نفس المهام، لأنها في Postgres مش في array في الذاكرة. والـ ids بتكمّل من آخر رقم ومبترجعش لـ 1.

ومع تفعيل [[log]] على query، كل استدعاء بيطبع SQL حقيقي، مثلًا [[findMany]] بـ [[select]] و [[orderBy]]: [[prisma:query SELECT "public"."Task"."id", "public"."Task"."title", "public"."Task"."done" FROM "public"."Task" WHERE "public"."Task"."userId" = $1 ORDER BY "public"."Task"."createdAt" DESC OFFSET $2]]. لاحظ [[$1]]: القيم بتتبعت كـ parameters، ده اللي بيمنع SQL injection. و [[create]] بيطلع [[INSERT INTO ... RETURNING ...]].

لو البيانات اختفت بعد restart، يبقى لسه فيه service بتستخدم الـ array القديمة. ولو شفت [[too many connections]] أو السيرفر بطيء في البداية، دوّر على [[new PrismaClient]] في أكتر من ملف.`,
          solCode: R`// db.js
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

export const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  log: process.env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["error"],
});`
        },
        {
          cmd: "$transaction",
          title: "عمليتين لازم يحصلوا مع بعض أو ميحصلوش خالص",
          desc: R`الـ transaction بتضمن إن كل الـ queries جواها تنجح مع بعض، أو لو واحدة فشلت كله يرجع زي ما كان.

الأوردر يتعمل، والمخزون يقل، والكوبون يتحسب: لو حاجة وقعت في النص، مفيش أوردر من غير خصم مخزون. في Prisma: [[prisma.$transaction(async (tx) => { ... })]]، وجواها بتستخدم [[tx]] بدل [[prisma]].`,
          example: R`export async function redeemCoupon(userId, code) {
  return prisma.$transaction(async (tx) => {
    const coupon = await tx.coupon.findUnique({ where: { code } });
    if (!coupon) throw new AppError(404, "Coupon not found");
    const updated = await tx.coupon.updateMany({
      where: { id: coupon.id, usedCount: { lt: coupon.maxUses } },
      data: { usedCount: { increment: 1 } },
    });
    if (updated.count === 0) throw new AppError(409, "Coupon fully used");
    return tx.redemption.create({ data: { userId, couponId: coupon.id } });
  });
}`,
          try: R`اعمل كوبون [[maxUses: 1]]، وابعت طلبين في نفس اللحظة (أمرين curl في نفس السطر بـ [[&]] بينهم). مع الكود ده واحد بس هينجح. وبعدين جرّب النسخة الغلط: [[count]] وبعدين [[create]] من غير الشرط، وشوف الاتنين بينجحوا.`,
          flag: "script",
          deep: {
            why: "أي عملية بتلمس أكتر من صف ممكن تقع في النص: السيرفر يقف، أو constraint يتكسر، أو خطأ في الكود. من غير transaction بتفضل بيانات نص-نص: فلوس اتخصمت ومفيش أوردر. ومع طلبين في نفس اللحظة، «اتأكد وبعدين اكتب» بيسمح للاتنين يعدّوا من نفس الشرط.",
            how: R`Prisma فيه شكلين: array ([[prisma.$transaction([q1, q2])]]) لـ queries مستقلة عن بعض، و interactive (الدالة) لما query محتاجة نتيجة اللي قبلها. في الـ interactive، Prisma بيفتح [[BEGIN]]، وينفّذ اللي جوه على نفس الاتصال، ولو الدالة خلصت يعمل [[COMMIT]]، ولو رمت خطأ يعمل [[ROLLBACK]] (درس «BEGIN و ROLLBACK» في تاب «PostgreSQL»).

الـ transaction لوحدها مش بتحل الـ race condition: في مستوى العزل الافتراضي في Postgres (Read Committed)، طلبين ممكن يقروا نفس [[usedCount]] مع بعض ويقرروا الاتنين إن لسه فيه مكان. عشان كده الشرط اتحط جوه الـ update نفسه، والداتابيز بتقفل الصف وقت الـ update، فالطلب التاني بيستنى ويشوف القيمة الجديدة ومبيلاقيش صف يطابق. البدائل: [[SELECT ... FOR UPDATE]] بـ [[$queryRaw]]، أو [[isolationLevel: "Serializable"]] مع إعادة المحاولة لو فشلت، أو unique constraint يمنع التكرار.

الـ interactive transaction بتمسك اتصال من الـ pool طول ما هي شغالة، وليها timeout افتراضي ٥ ثواني. عمرك ما تنادي API خارجي (دفع أو إيميل) جوه transaction: ابعت الإيميل بعد ما الـ transaction تخلص.`,
            when: "أي عملية بتكتب في أكتر من جدول ولازم تفضل متسقة: أوردر، وتحويل رصيد، وكوبون، وتسجيل مع إنشاء بروفايل. وأي «اتأكد وبعدين اكتب» على حاجة ليها حد.",
            mistakes: R`في مشروع حقيقي كان التحقق من حد استخدام الكوبون [[count]] وبعدين [[create]] كخطوتين منفصلتين من غير transaction ولا شرط ذرّي، فطلبين في نفس اللحظة ممكن يعدّوا الحد. وتستخدم [[prisma]] بدل [[tx]] جوه الـ transaction بالغلط، فالـ query دي بره الـ transaction ومبترجعش مع الـ rollback. وتحط fetch لبوابة دفع جوه transaction فتفضل ماسكة اتصال ١٠ ثواني وتقع بـ timeout.`
          },
          teach: R`## دالة بتلف ٣ queries في transaction واحدة

[[redeemCoupon]] بتجيب الكوبون، وتزوّد عداد استخدامه بشرط إنه لسه مخلصش، وتسجّل إن اليوزر استخدمه. لو أي خطوة رمت خطأ، كل اللي اتعمل قبلها بيرجع.

اتشغّل على ويندوز 11 بـ Node 24.19 و Prisma 7.10 على Postgres 16 في Docker، والدالة جوه route [[POST /api/coupons/:code/redeem]] على بورت 5846 عليه [[requireAuth]]، و [[log: ["query"]]] شغال. الجدولين:

~~~text prisma/schema.prisma
model Coupon {
  id          Int          @id @default(autoincrement())
  code        String       @unique
  maxUses     Int
  usedCount   Int          @default(0)
  redemptions Redemption[]
}

model Redemption {
  id       Int    @id @default(autoincrement())
  userId   Int
  couponId Int
  user     User   @relation(fields: [userId], references: [id])
  coupon   Coupon @relation(fields: [couponId], references: [id])
}
~~~

---

## ١. [[return prisma.$transaction(async (tx) => { ... })]]

- [[$transaction]]: الـ [[$]] في أول الاسم علامة Prisma لدوال الـ client نفسه (مش جدول).
- بتديله دالة async، و Prisma بيناديها بـ [[tx]]: client زي [[prisma]] بالظبط، بس كل query عليه بتمشي في نفس الـ transaction.
- لو الدالة خلصت: **COMMIT** (احفظ كله)، واللي رجّعته بيرجع من [[$transaction]]. لو رمت: **ROLLBACK** (الغي كله) والخطأ بيترمي لبرّه.
- [[return]] قدامها عشان [[redeemCoupon]] ترجّع نتيجة الـ transaction.

---

## ٢. [[const coupon = await tx.coupon.findUnique({ where: { code } })]]

هات الكوبون بالكود، ولو مش موجود [[throw new AppError(404, "Coupon not found")]]:

~~~text الناتج: POST /api/coupons/NOPE/redeem
HTTP/1.1 404 Not Found
{"error":"Coupon not found"}
~~~

---

## ٣. [[updateMany]] بشرط: قلب الدرس

~~~javascript
const updated = await tx.coupon.updateMany({
  where: { id: coupon.id, usedCount: { lt: coupon.maxUses } },
  data: { usedCount: { increment: 1 } },
});
~~~

| الحتة | معناها |
|---|---|
| [[usedCount: { lt: coupon.maxUses }]] | [[lt]] = less than: عدّل بس لو [[usedCount < maxUses]] |
| [[usedCount: { increment: 1 }]] | زوّد ١ على القيمة **اللي في الداتابيز**، مش على رقم قريناه |

~~~text الـ SQL
UPDATE "public"."Coupon" SET "usedCount" = ("public"."Coupon"."usedCount" + $1) WHERE ("public"."Coupon"."id" = $2 AND "public"."Coupon"."usedCount" < $3)
~~~

الشرط والزيادة في جملة SQL واحدة. Postgres بيقفل الصف وهو بيعدّله، فطلب تاني جاي في نفس اللحظة بيستنى، ولما يكمّل بيشوف القيمة الجديدة، والشرط مبقاش متحقق. و [[updateMany]] (مش [[update]]) عشان يرجّع [[{ count }]] بدل ما يرمي لو الشرط فشل.

## ٤. [[if (updated.count === 0) throw new AppError(409, "Coupon fully used")]]

صفر يعني الكوبون خلص. **409 Conflict**: الطلب سليم بس بيتعارض مع حالة البيانات دلوقتي.

## ٥. [[return tx.redemption.create({ data: { userId, couponId: coupon.id } })]]

سجّل الاستخدام. وده آخر سطر، فلو نجح الدالة خلصت والـ transaction تعمل COMMIT.

---

## ٦. التجربة: طلبين في نفس اللحظة (الـ solCode)

~~~bash
curl -s -X POST localhost:5846/api/coupons/SAVE10/redeem -H "Authorization: Bearer $TOKEN" & curl -s -X POST localhost:5846/api/coupons/SAVE10/redeem -H "Authorization: Bearer $TOKEN"; wait
~~~

- [[&]] في bash: شغّل الأمر اللي قبلها في الخلفية وكمّل على طول، فالطلبين بيطلعوا مع بعض.
- [[wait]]: استنى لحد ما اللي في الخلفية يخلص.

~~~text الناتج (كوبون maxUses: 1)
{"id":1,"userId":1,"couponId":1}{"error":"Coupon fully used"}
~~~

وفي لوج Prisma:

~~~text الناتج
prisma:query UPDATE "public"."Coupon" SET "usedCount" = ... WHERE (... AND "public"."Coupon"."usedCount" < $3)
prisma:query INSERT INTO "public"."Redemption" ("userId","couponId") VALUES ($1,$2) RETURNING ...
prisma:query COMMIT
prisma:query UPDATE "public"."Coupon" SET "usedCount" = ... WHERE (... AND "public"."Coupon"."usedCount" < $3)
prisma:query ROLLBACK
~~~

الأول عمل COMMIT، والتاني الـ UPDATE بتاعه ملقاش صف ([[count]] صفر)، فرمى 409 وحصل ROLLBACK.

في PowerShell 7 نفس التجربة بـ [[1..2 | ForEach-Object -Parallel { curl.exe -s -X POST http://localhost:5846/api/coupons/PS1/redeem -H "Authorization: Bearer $env:TOKEN" }]] ([[-Parallel]] بيشغّل الاتنين مع بعض، وموجود في 7 بس): واحد رجّع redemption والتاني [[Coupon fully used]].

### النسخة الغلط

نفس الخطوات من غير transaction ولا شرط ذرّي: [[prisma.redemption.count]]، ولو أقل من [[maxUses]] اعمل [[create]] (وحطيت ٥٠ms بينهم عشان السباق يبان كل مرة):

~~~text الناتج
{"id":2,"userId":1,"couponId":2}{"id":3,"userId":1,"couponId":2}
~~~

الاتنين نجحوا. الطلبين عملوا [[SELECT COUNT(*)]] وشافوا صفر قبل ما أي واحد يعمل [[INSERT]].

~~~text الناتج: الجدول بعد التجربتين
  code  | usedCount | redemptions
--------+-----------+-------------
 SAVE10 |         1 |           1
 WRONG1 |         0 |           2
~~~

---

## ٧. الـ rollback بيرجّع اللي اتعمل فعلًا

بعتّ توكن ليوزر رقم 999 (مش موجود) على كوبون [[maxUses: 5]]. الـ UPDATE نجح، والـ INSERT وقع لأن الـ [[userId]] مش موجود في جدول User:

~~~text الناتج
Foreign key constraint violated on the constraint: $__btRedemption_userId_fkey$__bt
prisma:query ROLLBACK
~~~

والرد 500، و [[usedCount]] في الجدول فضل [[0]]: الزيادة اللي حصلت في الـ UPDATE اترجعت.

---

## الخلاصة

| السطر | الدور |
|---|---|
| [[prisma.$transaction(async (tx) => ...)]] | كله أو ولا حاجة: COMMIT لو خلصت، ROLLBACK لو رمت |
| [[tx]] جوه، مش [[prisma]] | أي query بـ [[prisma]] بتبقى برّه الـ transaction |
| [[updateMany]] + [[lt]] + [[increment]] | الشرط والكتابة في UPDATE واحد، فطلبين ميعدّوش مع بعض |
| [[count === 0]] | الشرط فشل: 409 |

> الـ transaction لوحدها مش بتمنع السباق. اللي منعه إن الشرط جوه الـ UPDATE. ومتكلمش API خارجي جوه transaction.`,
          lines: [
            "استخدام كوبون ليه حد أقصى.",
            "كل اللي جوه transaction واحدة، و [[tx]] client مربوط بيها.",
            "هات الكوبون.",
            "مش موجود: throw، والـ transaction كلها ترجع.",
            "زوّد العداد، بس بشرط...",
            "إنه لسه أقل من الحد. الشرط والزيادة في query واحدة، فطلبين في نفس اللحظة ميعدّوش الاتنين.",
            "زوّد ١.",
            "قفلة.",
            "متعدلش حاجة؟ يبقى خلص. throw يلغي كل حاجة.",
            "سجّل الاستخدام. لو ده فشل، الزيادة اللي فوق بترجع.",
            "قفلة الـ transaction.",
            "قفلة."
          ],
          sol: R`مع الكود ده، واحد من الطلبين بينجح (رد الـ redemption) والتاني بياخد [[409]] و [[{"error":"Coupon fully used"}]]، وفي القاعدة redemption واحد بس و [[usedCount]] بـ 1. السبب: [[updateMany]] بالشرط [[usedCount < maxUses]] بيتنفّذ كـ UPDATE واحد، وPostgres بيقفل الصف، فالطلب التاني لما يوصل يلاقي الشرط مبقاش متحقق و [[count]] بـ 0.

النسخة الغلط (تعد الـ redemptions، ولو أقل من maxUses تعمل create) الاتنين بينجحوا وتلاقي redemptions 2 لكوبون مسموح مرة واحدة: الطلبين قروا العدد 0 في نفس الوقت قبل ما أي واحد يكتب. ولأن ده race، ممكن تحتاج تجرّب كذا مرة، أو تحط [[await new Promise((r) => setTimeout(r, 50))]] بين الـ count والـ create عشان تشوفه كل مرة.

ولو النسخة الصح نفسها نجح فيها الاتنين، اتأكد إن الشرط [[usedCount: { lt: coupon.maxUses } ]] جوه الـ [[where]] بتاع الـ update نفسه، مش [[if]] في JavaScript قبله.`,
          solCode: R`# كوبون maxUses: 1 وطلبين في نفس اللحظة
curl -s -X POST localhost:3000/api/coupons/SAVE10/redeem -H "Authorization: Bearer $TOKEN" & curl -s -X POST localhost:3000/api/coupons/SAVE10/redeem -H "Authorization: Bearer $TOKEN"; wait
# {"id":1,"userId":7,"couponId":1}{"error":"Coupon fully used"}`
        },
        {
          cmd: "mongoose",
          title: "لو الداتابيز MongoDB",
          desc: R`Mongoose بيدّيك schema و model لكل collection في Mongo ([[Task.find()]] و [[Task.create()]])، وبيقعد في نفس مكان Prisma في المعمارية: جوه الـ services.

أوامر الشيل (mongosh والباك أب) في تاب «MongoDB». هنا الاستخدام من Express باختصار.`,
          example: R`import mongoose from "mongoose";

await mongoose.connect(config.MONGO_URL);

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 200 },
  done: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
}, { timestamps: true });

export const Task = mongoose.model("Task", taskSchema);

const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(20).lean();

const recent = await Task.find().sort({ createdAt: -1 }).limit(50).populate({ path: "userId", select: "name email" }).lean();`,
          try: R`شغّل Mongo في Docker (تاب «MongoDB»)، واعمل الـ model ده، وجرّب [[Task.create]] من غير title وشوف الـ ValidationError. وقارن سرعة [[find()]] بـ [[lean()]] ومن غيرها على ١٠٠٠٠ مستند. وبعدين فعّل [[mongoose.set("debug", true)]] وهات ٥٠ مهمة ومعاها اسم صاحبها بطريقتين: loop فيه [[User.findById]] لكل مهمة، و [[populate]]. عد الـ queries في اللوج.`,
          flag: "script",
          deep: {
            why: "مشاريع كتير (خصوصًا لوحات الإدارة والمشاريع القديمة) مبنية على Mongo و Mongoose، وأي انترفيو Node ممكن يسألك عنه. Mongo نفسها مفيهاش schema، و Mongoose بيرجّعلك الشكل والتحقق على مستوى التطبيق.",
            how: R`[[mongoose.connect]] بيفتح pool، و Mongoose بيخزّن أي عمليات لحد ما الاتصال يجهز (buffering)، فالـ query قبل الاتصال مبتفشلش على طول: بتستنى ١٠ ثواني وبعدين تفشل. عشان كده [[await connect]] قبل [[listen]].

الـ schema بتعمل validation وقت [[save]] و [[create]]، بس مش افتراضيًا في [[updateOne]] و [[findOneAndUpdate]] إلا لو [[runValidators: true]]. والـ documents اللي بترجع من [[find]] objects تقيلة فيها دوال (save و populate)، و [[lean()]] بيرجّع objects عادية أسرع وأخف لو هتقرا بس.

[[populate("userId")]] بيجيب المستندات المرتبطة بـ query تانية (Mongo مفيهاش joins زي SQL): بيجمع كل الـ userIds من النتيجة ويعمل [[User.find({ _id: { $in: [...] } })]] واحدة، ويحط كل يوزر مكان الـ id بتاعه. يعني ٥٠ مهمة بيوزرهم = ٢ queries. أما الـ loop اللي بيعمل [[await User.findById(t.userId)]] لكل مهمة فده N+1: ٥٠ مهمة = ٥١ query، وكل واحدة رحلة للقاعدة. و [[select]] جوه populate بيجيب الحقول اللي محتاجها بس (ومتنساش إن من غيره الـ hash بتاع الباسورد ممكن يطلع في الرد). والـ populate المتداخل ([[populate({ path: "userId", populate: { path: "company" } })]]) كل مستوى query زيادة، ولو محتاج joins وتجميع تقيل، [[aggregate]] مع [[$lookup]] بيعملها في query واحدة على السيرفر.

الـ transactions: [[await mongoose.connection.transaction(async (session) => { await A.updateOne(..., { session }); await B.updateOne(..., { session }); })]]. لازم تعدّي [[session]] لكل عملية جواها، وأي عملية من غيره بتتنفّذ برّه الـ transaction ومش بترجع لو حصل rollback. والدالة دي بتعيد المحاولة لوحدها في أخطاء transient، فالكود جواها لازم يبقى آمن لو اتنفّذ مرتين (متبعتش إيميل جواها).

والـ transactions في Mongo محتاجة replica set حتى لو node واحدة. و ObjectId مش صحيح (زي [[abc]]) بيعمل [[CastError]]، فاتحقق منه قبل الـ query.`,
            when: "بيانات شكلها بيتغير كتير، أو مستندات متداخلة بتتقري مع بعض، أو مشروع قايم عليه. للبيانات المترابطة (فلوس وأوردرات وصلاحيات)، Postgres غالبًا اختيار أأمن.",
            mistakes: R`[[findOneAndUpdate]] من غير [[runValidators]] فبيانات غلط تتحفظ. و [[find()]] من غير [[limit]] على collection فيها مليون مستند. و [[findById]] جوه loop بدل populate أو [[$in]] (N+1). و transaction بتنسى [[session]] في عملية من عملياتها. وفي مشروع حقيقي كان [[pre("save")]] بيعمل hash للباسورد (صح)، بس الـ model نفسه كان فيه حقل للباسورد نص صريح جنبه (درس [[bcrypt]]).`
          },
          teach: R`## ٣ خطوات: اتصل، وعرّف الشكل، واسأل

[[mongoose.connect]] مرة واحدة. [[new mongoose.Schema]] بتقول المستند شكله إيه. [[mongoose.model]] بيطلّع منها [[Task]] اللي فيه [[find]] و [[create]]. وبعدين سطرين queries: مهام يوزر، وآخر ٥٠ مهمة ومعاها أصحابها.

اتشغّل على ويندوز 11 بـ Node 24.19 و Mongoose 9.11، على Mongo 8 في Docker (container باسم [[teach-api02-mongo]] على بورت 27845، و [[MONGO_URL]] = [[mongodb://localhost:27845/teach_api02_mg]])، ومعاه model [[User]] فيه [[name]] و [[email]] و [[passwordHash]] و ٥٠ يوزر تجربة.

---

## ١. [[await mongoose.connect(config.MONGO_URL)]]

بيفتح pool اتصالات. الـ [[await]] قبل أي query وقبل [[app.listen]]، لأن Mongoose بيحوش (buffering) أي query قبل الاتصال ويستنى. جرّبت query من غير connect خالص:

~~~text الناتج
MongooseError: Operation $__bttasks.find()$__bt buffering timed out after 10000ms
~~~

استنى ١٠ ثواني وبعدين فشل، بدل ما يقولك على طول.

---

## ٢. [[taskSchema]]

| الحقل | الإعداد | معناه |
|---|---|---|
| [[title]] | [[type: String, required: true]] | نص ولازم يبقى موجود |
| | [[trim: true]] | يشيل المسافات قبل الحفظ |
| | [[maxlength: 200]] | أقصى طول |
| [[done]] | [[type: Boolean, default: false]] | لو مش مبعوت يبقى [[false]] |
| [[userId]] | [[type: mongoose.Schema.Types.ObjectId]] | id مستند تاني (ObjectId: الـ id بتاع Mongo، ٢٤ حرف hex) |
| | [[ref: "User"]] | المستند ده في model اسمه User، ودا اللي [[populate]] بيستخدمه |
| | [[index: true]] | اعمل index على الحقل ده |

و [[{ timestamps: true }]] (الـ argument التاني) بيضيف [[createdAt]] و [[updatedAt]] لوحده.

## ٣. [[export const Task = mongoose.model("Task", taskSchema)]]

[[model("Task", ...)]] بيربط الـ schema بـ collection اسمها [[tasks]] (Mongoose بيعمل الاسم صغير وجمع).

~~~text الناتج: Task.create({ title: "  buy milk  ", userId })
{
  title: 'buy milk',
  done: false,
  userId: new ObjectId('6ac5fe463c3accb1b14687c7'),
  _id: new ObjectId('6ac5fe463c3accb1b14687f9'),
  createdAt: 2026-10-07T08:09:42.302Z,
  updatedAt: 2026-10-07T08:09:42.302Z,
  __v: 0
}
~~~

[[trim]] شال المسافات، و [[done]] من الـ default، و [[_id]] Mongo عمله، و [[createdAt]] و [[updatedAt]] من [[timestamps]]، و [[__v]] رقم نسخة Mongoose بيستخدمه داخليًا.

والـ index اتعمل فعلًا:

~~~text الناتج: Task.collection.indexes()
[
  { v: 2, key: { _id: 1 }, name: '_id_' },
  { v: 2, key: { userId: 1 }, name: 'userId_1' }
]
~~~

### الـ validation

~~~text الناتج: Task.create({ userId }) من غير title
ValidationError | Task validation failed: title: Path $__bttitle$__bt is required. | required
~~~

~~~text الناتج: title طوله 201
Task validation failed: title: Path $__bttitle$__bt ($__btxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx...$__bt, length 201) is longer than the maximum allowed length (200).
~~~

و [[err.errors.title.kind]] = [[required]]: كل حقل غلط ليه مكان في [[err.errors]].

---

## ٤. [[Task.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(20).lean()]]

سلسلة، كل دالة بتضيف حاجة على الـ query، ومحدش بيتنفذ لحد الـ [[await]]:

| الحتة | معناها |
|---|---|
| [[find({ userId: req.user.id })]] | المستندات اللي [[userId]] بتاعها ده |
| [[sort({ createdAt: -1 })]] | [[-1]] تنازلي (الأحدث الأول)، و [[1]] تصاعدي |
| [[limit(20)]] | أول ٢٠ بس |
| [[lean()]] | رجّع objects عادية |

النتيجة ٢٠ مستند. بس خلي بالك من نوع الـ id: درس [[requireAuth]] بيعمل [[Number(payload.sub)]] لأن Postgres بيستخدم أرقام. في Mongo الـ id ObjectId، ولما جرّبت [[Task.find({ userId: 7 })]]:

~~~text الناتج
CastError Cast to ObjectId failed for value "7" (type number) at path "userId" for model "Task"
~~~

فمع Mongo خلي [[req.user.id]] النص زي ما هو ([[payload.sub]]) من غير [[Number]]. ونفس الـ CastError مع [[Task.findById("abc")]].

### [[lean()]] بيفرق قد إيه؟

على ١٠٠٠٠ مستند، مرتين:

~~~text الناتج
find(): 131.921ms
find().lean(): 51.637ms
find(): 118.022ms
find().lean(): 44.419ms
~~~

حوالي مرتين ونص أسرع. من غير [[lean]] كل مستند object من نوع [[model]] فيه [[save]] ومتابعة للتغييرات، ومعاه object عادي ([[Object]]) و [[save]] بـ [[undefined]]. لو هترجّعه JSON بس، [[lean]].

---

## ٥. [[populate({ path: "userId", select: "name email" })]]

بعدّ الـ queries بـ [[mongoose.set("debug", fn)]] (الدالة بتتنادى مع كل query):

~~~text الناتج
loop queries: 51
populate queries: 2
~~~

- الـ loop ([[for]] على ٥٠ مهمة وجواه [[await User.findById(t.userId)]]): query للمهام و ٥٠ لليوزرز = ٥١. ده N+1.
- [[populate]]: ٢ بس. ولما شغّلت [[mongoose.set("debug", true)]] على ٣ مهام، اللوج طبع:

~~~text الناتج
Mongoose: tasks.find({}, { sort: { createdAt: -1 }, limit: 3 })
Mongoose: users.find({ _id: { '$in': [ ObjectId("6ac5..d1"), ObjectId("6ac5..d0"), ObjectId("6ac5..cf") ] }}, { projection: { name: 1, email: 1 } })
~~~

جمع كل الـ ids وجابهم في query واحدة بـ [[$in]] («واحد من دول»)، و [[select]] بقى [[projection]]: [[name]] و [[email]] بس. والنتيجة:

~~~text الناتج: أول مهمة
userId: {
  _id: new ObjectId('6ac5fe463c3accb1b14687ea'),
  name: 'user 35',
  email: 'u35@test.local'
}
~~~

[[userId]] بقى object اليوزر مكان الـ id، ومن غير [[passwordHash]] عشان الـ [[select]].

---

## الخلاصة

| | |
|---|---|
| [[await connect]] قبل [[listen]] | وإلا الـ queries تستنى ١٠ ثواني وتفشل |
| [[Schema]] | النوع و [[required]] و [[trim]] و [[maxlength]] و [[default]] و [[ref]] و [[index]] |
| [[timestamps: true]] | [[createdAt]] و [[updatedAt]] لوحدهم |
| [[find().sort().limit().lean()]] | الأحدث، عدد محدود، objects خفيفة |
| [[populate]] + [[select]] | ٢ queries بدل N+1، والحقول اللي محتاجها بس |
| الـ id | ObjectId string، مش [[Number]] |

> الـ validation بتشتغل في [[create]] و [[save]]، ومش في [[updateOne]] و [[findOneAndUpdate]] إلا بـ [[runValidators: true]].`,
          lines: [
            "Mongoose.",
            "اتصل مرة واحدة وانت بتقوم، قبل listen.",
            "شكل المستند.",
            "نص مطلوب، يتشال منه المسافات، وأقصاه ٢٠٠.",
            "boolean والافتراضي false.",
            "مرجع ليوزر، ومعاه index عشان البحث بيه يبقى سريع.",
            "[[timestamps]] بيضيف createdAt و updatedAt لوحده.",
            "الـ model اللي هتستخدمه في الـ services.",
            "مهام اليوزر، الأحدث، أول ٢٠. [[lean]] بيرجّع objects عادية أسرع.",
            "آخر ٥٠ مهمة ومعاها اسم وإيميل صاحبها: query للمهام وواحدة لكل اليوزرز مع بعض، مش واحدة لكل مهمة."
          ],
          sol: R`[[Task.create({ userId })]] من غير title بيرمي [[ValidationError]] ورسالته [[Task validation failed: title: Path $__bttitle$__bt is required.]]، وفي [[err.errors.title.kind]] هتلاقي [[required]]. حوّله في الـ error handler لـ 400.

[[find()]] من غير [[lean()]] بيرجّع Mongoose documents (فيها getters و [[save()]] و change tracking)، و [[lean()]] بيرجّع objects عادية. على ١٠٠٠٠ مستند lean بيبقى أسرع بشكل واضح وبيستهلك ذاكرة أقل (غالبًا مرتين لـ ٣ مرات، حسب الجهاز والحجم). للقراءة وإرجاع JSON استخدم lean دايمًا.

وفي اللوج بـ [[debug]]: الـ loop بيعمل 51 query ([[tasks.find]] مرة، و [[users.findOne]] ٥٠ مرة، واحدة لكل مهمة): ده N+1. و [[populate]] بيعمل 2 بس: find للمهام، وبعدين [[users.find({ _id: { $in: [...] } })]] واحدة لكل الـ ids. لو populate رجّع [[userId]] بـ null، يبقى الـ ref اسمه غلط أو اليوزر اتمسح.`
        },
        {
          cmd: "pagination",
          title: "متبعتش ١٠٠ ألف صف في رد واحد",
          desc: R`أي endpoint بيرجّع قايمة لازم يرجّع صفحة ([[?page=2&limit=20]])، والـ limit ليه حد أقصى من عندك مهما اليوزر طلب.

والرد فيه البيانات ومعاها معلومات الصفحة. والفلترة والترتيب من الـ query برضه، بس من قايمة مسموحة: الترتيب بـ [[createdAt]] أو [[title]] بس، مش بأي عمود اليوزر يكتبه.`,
          example: R`const ListQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sort: z.enum(["createdAt", "title"]).default("createdAt"),
  done: z.stringbool().optional(),
});

router.get("/", async (req, res) => {
  const { page, limit, sort, done } = ListQuery.parse(req.query);
  const where = { userId: req.user.id, ...(done !== undefined && { done }) };
  const [items, total] = await prisma.$transaction([
    prisma.task.findMany({ where, orderBy: [{ [sort]: "desc" }, { id: "desc" }], skip: (page - 1) * limit, take: limit }),
    prisma.task.count({ where }),
  ]);
  res.json({ items, page, limit, total, pages: Math.ceil(total / limit) });
});`,
          try: R`اعمل ١٠٠٠ مهمة بسكربت seed، وجرّب [[?page=3&limit=10]] و [[?limit=5000]] و [[?sort=password]]. التانيين لازم 400: زوّد في الـ error handler إن [[ZodError]] يتحول لـ 400. وبعدين جرّب [[?page=90]] وقيس الوقت، وفكّر ليه بيبطأ مع الصفحات البعيدة.`,
          flag: "script",
          deep: {
            why: "القايمة بتكبر مع الوقت. endpoint بيرجّع كله بيبقى سريع أول شهر، وبعد سنة بيرجّع ٥٠ ميجا وياخد ١٠ ثواني ويوقّع الموبايل. والـ limit من غير حد أقصى بيخلي أي حد يطلب مليون صف في طلب واحد.",
            how: R`offset pagination ([[skip]] و [[take]]، يعني [[OFFSET]] و [[LIMIT]] في SQL) أبسط حاجة وبتدّيك أرقام صفحات. عيبين: الداتابيز لازم تعدّي على كل الصفوف اللي قبل الـ offset، فالصفحة ٥٠٠٠ بطيئة. ولو حاجة اتضافت وانت بتقلّب، بتشوف عنصر مرتين أو يفوتك.

cursor pagination: بدل «اقفز ٤٠»، «هات ٢٠ بعد العنصر ده». في Prisma: [[cursor: { id: lastId }, skip: 1, take: 20]]، أو شرط [[id: { lt: lastId }]]. سريع مهما بعدت لأنه بيستخدم الـ index، وثابت مع الإضافات. بس مفيش «روح لصفحة ٧». ده اللي بيستخدم في infinite scroll والـ feeds.

[[count]] على جدول كبير ممكن يبقى بطيء هو كمان. في الـ cursor pagination غالبًا مش محتاجه: بترجّع [[nextCursor]] بس، ولو null يبقى خلصت.

والترتيب لازم يبقى ثابت: لو اتنين ليهم نفس [[createdAt]]، رتّب بـ id كمان (زي المثال)، وإلا نفس العنصر ممكن يظهر في صفحتين. واعمل index على الأعمدة اللي بتفلتر وترتّب بيها. وتصميم الـ pagination في الـ API بالتفصيل في تاب «APIs متقدمة».`,
            when: "أي قايمة ممكن تعدّي ١٠٠ عنصر. offset للوحات الأدمن والجداول بأرقام صفحات، و cursor للـ feeds والموبايل والجداول الكبيرة.",
            mistakes: R`في مشروع حقيقي الـ schema المشتركة للـ pagination كانت بتسمح بـ [[pageSize]] لحد ١٠٠٠، يعني صفحة واحدة ممكن تبقى تقيلة جدًا. خلي الحد الأقصى صغير. وتعدّي [[req.query.sort]] مباشرة لـ [[orderBy]]. و [[skip: page * limit]] بدل [[(page - 1) * limit]] فالصفحة الأولى تضيع.`
          },
          teach: R`## جزئين: schema بتنضّف الـ query، و route بيجيب صفحة واحدة

[[ListQuery]] بتاخد [[req.query]] (كله نصوص) وتطلّع أرقام وقيم مسموحة بس، أو ترمي خطأ. والـ route بيستخدم الأرقام دي يجيب ١٠ أو ٢٠ صف بدل كله، ومعاهم العدد الكلي عشان الواجهة ترسم أزرار الصفحات.

اتشغّل على ويندوز 11 بـ Node 24.19 و Express 5.2.1 و zod 4.6 و Prisma 7.10 على Postgres 16 في Docker، سيرفر على بورت 5847 عليه [[requireAuth]] والـ errorHandler بتاع الـ solCode. حطيت ١٠٠٠ مهمة ليوزر واحد بـ SQL: [[task 1]] الأحدث و [[task 1000]] الأقدم، وكل تالت واحدة [[done]].

---

## ١. [[ListQuery]] سطر سطر

كل اللي في الـ query string بيوصل نص: [[?page=3]] يبقى [[req.query.page === "3"]]. عشان كده:

| السطر | بيعمل إيه |
|---|---|
| [[z.coerce.number()]] | حوّل النص لرقم ([[Number("3")]])، ولو مش رقم يبقى خطأ |
| [[.int().min(1)]] | رقم صحيح، ١ أو أكتر |
| [[.max(100)]] | حجم الصفحة ميعدّيش ١٠٠ مهما اليوزر طلب |
| [[.default(1)]] / [[.default(20)]] | لو مش مبعوت خالص خد القيمة دي |
| [[z.enum(["createdAt", "title"])]] | القيمة لازم تبقى واحدة من دول بالظبط |
| [[z.stringbool().optional()]] | حوّل [["true"]] و [["false"]] (وأخواتهم) لـ boolean حقيقي، و [[optional]] يعني ممكن ميتبعتش |

ليه [[stringbool]] مش [[z.coerce.boolean()]]؟ لأن [[Boolean("false")]] بـ [[true]] (أي نص مش فاضي truthy). جرّبت:

~~~text الناتج
?done=false&limit=1  =>  total 667   (المهام اللي مش خلصانة)
?done=yes&limit=1    =>  total 333   ("yes" اتفهمت true)
?done=maybe          =>  400  "Invalid option: expected one of "true"|"1"|"yes"|"on"|"y"|"enabled"|"false"|"0"|"no"|"off"|"n"|"disabled""
~~~

---

## ٢. [[const { page, limit, sort, done } = ListQuery.parse(req.query)]]

[[parse]] يا يرجّع object نضيف بالأنواع الصح، يا يرمي [[ZodError]]. والـ [[{ }]] بتاخد الأربع قيم في متغيرات.

## ٣. [[const where = { userId: req.user.id, ...(done !== undefined && { done }) }]]

الحتة الغريبة [[...(cond && { done })]]:

- لو [[done]] اتبعت: [[cond && { done }]] بترجّع [[{ done: false }]] مثلًا، و [[...]] بيفردها جوه [[where]].
- لو مش مبعوت: بترجّع [[false]]، و [[...false]] جوه object مبيعملش حاجة.

فالنتيجة [[{ userId: 1 }]] أو [[{ userId: 1, done: false }]]. وشرط الملكية موجود دايمًا.

---

## ٤. [[prisma.$transaction([ findMany, count ])]]

الشكل الـ array من [[$transaction]] (درس [[$transaction]] فيه الشكل التاني): queries مستقلة بتتنفذ مع بعض، والنتيجة array بنفس الترتيب، فـ [[const [items, total] =]] بياخدهم.

### [[findMany({ where, orderBy, skip, take })]]

| الحتة | معناها |
|---|---|
| [[[{ [sort]: "desc" }, { id: "desc" }]]] | رتّب بالحقل المختار، ولو اتنين متساويين رتّب بالـ id. [[[sort]]] في الأقواس المربعة معناها «اسم المفتاح هو قيمة المتغير» |
| [[skip: (page - 1) * limit]] | فوّت الصفحات اللي فاتت. صفحة ٣ و limit ١٠ = فوّت ٢٠ |
| [[take: limit]] | خد ١٠ |

~~~text الـ SQL
SELECT ... FROM "public"."Task" WHERE "public"."Task"."userId" = $1 ORDER BY "public"."Task"."createdAt" DESC, "public"."Task"."id" DESC LIMIT $2 OFFSET $3
SELECT COUNT(*) AS "_count$_all" FROM (SELECT "public"."Task"."id" FROM "public"."Task" WHERE "public"."Task"."userId" = $1 OFFSET $2) AS "sub"
~~~

[[take]] بقى [[LIMIT]] و [[skip]] بقى [[OFFSET]].

## ٥. [[res.json({ items, page, limit, total, pages: Math.ceil(total / limit) })]]

[[Math.ceil]] بيقرّب لفوق: ١٠٠٠ ÷ ٣ = ٣٣٣.٣ فـ [[334]] صفحة (الأخيرة فيها مهمة واحدة).

~~~text الناتج: ?page=3&limit=10 (العناوين بس)
{"first":"task 21","last":"task 30","page":3,"limit":10,"total":1000,"pages":100}
~~~

الصفحة التالتة = العناصر من ٢١ لـ ٣٠ بالظبط.

---

## ٦. القيم الممنوعة والـ solCode

من غير فرع [[ZodError]] في الـ errorHandler، [[parse]] بيرمي خطأ مالوش [[status]] فيبقى 500. الـ solCode بيضيف في أوله:

~~~javascript
if (err instanceof ZodError) {
  return res.status(400).json({ error: "Invalid input", issues: z.flattenError(err).fieldErrors });
}
~~~

- [[instanceof ZodError]]: الخطأ جاي من zod؟
- [[z.flattenError(err).fieldErrors]]: بيحوّل قايمة الأخطاء لـ object، كل حقل قدامه رسايله.

~~~text الناتج
?limit=5000      HTTP/1.1 400 Bad Request
                 {"error":"Invalid input","issues":{"limit":["Too big: expected number to be <=100"]}}
?sort=password   HTTP/1.1 400 Bad Request
                 {"error":"Invalid input","issues":{"sort":["Invalid option: expected one of \"createdAt\"|\"title\""]}}
~~~

---

## ٧. [[sort=title]]: ترتيب نصوص

~~~text الناتج: ?sort=title&limit=3
task 999, task 998, task 997
~~~

مش [[task 1000]] الأول، لأن الترتيب هنا حرف بحرف مش بالرقم: [["task 9..."]] أكبر من [["task 1..."]].

---

## ٨. من ويندوز

~~~powershell
Invoke-RestMethod "http://localhost:5847/api/tasks?page=3&limit=10" -Headers @{ Authorization = "Bearer $T" }
~~~

العنوان **لازم** بين علامتين تنصيص: [[&]] في PowerShell ليها معنى (في 5.1 «ممنوع هنا»، وفي 7 «شغّل في الخلفية»). في 7 و 5.1 رجّع [[page 3]] و [[limit 10]] و [[total 1000]] و [[pages 100]].

---

## الخلاصة

| | |
|---|---|
| [[z.coerce.number()]] | الـ query نص، حوّله رقم |
| [[.max(100)]] | الحد الأقصى من عندك |
| [[z.enum]] للترتيب | مش أي عمود اليوزر يكتبه |
| [[skip: (page - 1) * limit]] و [[take: limit]] | [[OFFSET]] و [[LIMIT]] |
| [[{ id: "desc" }]] بعد الترتيب | ترتيب ثابت لو فيه تساوي |
| [[ZodError]] في الـ errorHandler | 400 بدل 500 |

> الصفحة ٩٠ بتطلب [[OFFSET 890]]: الداتابيز بتقرا ٨٩٠ صف وترميهم. للقوايم الطويلة جدًا استخدم cursor ([[where: { id: { lt: lastId } }]]).`,
          lines: [
            "schema للـ query.",
            "رقم الصفحة من ١، والافتراضي ١.",
            "حجم الصفحة من ١ لـ ١٠٠ مهما طلب، والافتراضي ٢٠.",
            "الترتيب من قايمة مسموحة بس.",
            R`فلتر اختياري، و [[stringbool]] بيحوّل [["false"]] لـ false فعلًا.`,
            "قفلة.",
            "قايمة المهام.",
            "اتحقق من الـ query، ولو غلط بيرمي ZodError.",
            "الشرط: مهامي، ولو فيه فلتر done زوّده.",
            "الصفحة والعدد الكلي في transaction واحدة (الشكل الـ array).",
            "رتّب بالحقل المختار وبعده الـ id عشان الترتيب يبقى ثابت، واقفز على الصفحات اللي فاتت، وخد limit.",
            "العدد الكلي بنفس الشرط.",
            "قفلة.",
            "البيانات ومعلومات الصفحات عشان الواجهة تعمل الأزرار.",
            "قفلة."
          ],
          sol: R`[[?page=3&limit=10]] بيرجّع ١٠ مهام (من الـ 21 للـ 30 في الترتيب) ومعاهم [[{"page":3,"limit":10,"total":1000,"pages":100}]].

[[?limit=5000]] و [[?sort=password]] من غير تعديل بيرجّعوا 500، لأن [[ListQuery.parse]] بيرمي [[ZodError]] مالوش status. بعد التعديل في الـ error handler: [[400]] مع [[{"limit":["Too big: expected number to be <=100"]}]] و [[{"sort":["Invalid option: expected one of "createdAt"|"title""]}]]. و [[sort=password]] مهم: من غير enum حد يقدر يرتّب على أي عمود ويستنتج بيانات منه.

و [[?page=90]]: مع ١٠٠٠ صف الفرق صغير، بس الـ SQL فيه [[OFFSET 890]]، والقاعدة لازم تقرا الـ 890 صف وترميهم قبل ما ترجّع الـ 10. كل ما الصفحة تبعد كل ما الشغل يزيد، ومع ملايين الصفوف بيبان جدًا. الحل للقوايم الطويلة cursor pagination ([[where: { id: { lt: lastId } }]] مع index).`,
          solCode: R`import { z, ZodError } from "zod";

export function errorHandler(err, req, res, next) {
  if (err instanceof ZodError) {
    return res.status(400).json({ error: "Invalid input", issues: z.flattenError(err).fieldErrors });
  }
  const status = err.status ?? err.statusCode ?? 500;
  if (status >= 500) console.error(err);
  res.status(status).json({ error: status >= 500 ? "Internal server error" : err.message });
}`
        }
      ]
    }
]);
