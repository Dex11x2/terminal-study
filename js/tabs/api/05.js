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
    }
]);
