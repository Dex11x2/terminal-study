// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "المتغيرات والنصوص",
      l: 1,
      n: "const و let بدل var، والـ template literals، ودوال الـ strings اللي هتستخدمها كل يوم",
      pre: [
        { to: "js/primitives و objects", why: R`ليه [[const]] بتسمح بتعديل جوه الـ object، وليه الـ strings مبتتعدّلش وكل method بترجّع نص جديد` },
        { to: "js/typeof", why: R`أنواع القيم اللي هتحطها في متغيرات وتلزقها في نصوص` },
        { to: "js/truthy و falsy", why: R`الـ ternary جوه الـ template و [[||]] و [[??]] للقيم الناقصة في رسايل الوحدة` },
        { to: "js/for...of و for...in", why: R`المشاريع بتلف على منتجات وسطور بـ [[for...of]]` },
      ],
      projects: [
        { lvl: 'صغير', t: R`كارت تعريف`, what: R`object فيه اسمك ووظيفتك ومدينتك ولستة مهارات، ودالة بترجّع كارت من كذا سطر بـ template literal واحد، والمهارات متجمعة بـ [[join(" · ")]]. من دروس «template literals» و «let و const و var».`, done: R`[[console.log(card(me))]] بيطبع الكارت على كذا سطر من غير [[\n]] مكتوبة بإيدك، ولو المهارات فاضية السطر بتاعها بيقول «لسه» بدل ما يبقى فاضي.`, sol: R`**هتشوف إيه:** كارتين في الترمنال ببرواز من [[=]]: كارت فيه ٤ مهارات مفصولين بـ [[·]]، وكارت لحد لسه معندوش مهارات بيقول «لسه».

~~~js card.js
// كارت تعريف من object، بـ template literal واحد على كذا سطر
const me = {
  name: "Sara Adel",
  job: "Frontend Developer",
  city: "Alexandria",
  skills: ["HTML", "CSS", "JavaScript", "Git"],
};

function card(person) {
  const skills = person.skills.length > 0 ? person.skills.join(" · ") : "لسه";
  return $__bt==============================
  $__{person.name}
  $__{person.job} — $__{person.city}
  المهارات: $__{skills}
==============================$__bt;
}

console.log(card(me));

const newbie = { name: "Omar", job: "Student", city: "Cairo", skills: [] };
console.log(card(newbie));
~~~

~~~text الناتج: node card.js
==============================
  Sara Adel
  Frontend Developer — Alexandria
  المهارات: HTML · CSS · JavaScript · Git
==============================
==============================
  Omar
  Student — Cairo
  المهارات: لسه
==============================
~~~

**كل حتة بتعمل إيه:**

- [[me]]: object واحد فيه كل البيانات، فلو غيّرت مدينتك بتغيّرها في مكان واحد. و [[const]] لأننا مش هنعيّنه تاني.
- [[person.skills.length > 0 ? ... : "لسه"]]: ternary بيختار بين المهارات متجمعة وكلمة «لسه». واتحسب في متغير قبل الـ template عشان الـ template يفضل بسيط ويتقري.
- [[join(" · ")]]: بيلزق عناصر الـ array بالفاصل اللي بين القوسين، بين كل اتنين بس (مفيش فاصل في الأول ولا الآخر).
- الـ template: ٥ سطور حقيقية بين الـ backticks، فالسطور الجديدة جزء من النص من غير [[\n]]. والمسافتين في أول سطور البيانات مقصودين (indent جوه الكارت)، لأن أي مسافة جوه الـ backticks بتطلع في الناتج.
- [[$__{person.name}]] و [[$__{skills}]]: كل [[$__{ }]] بيتبدّل بقيمته.

**الغلطة اللي بتحصل:** من غير الـ ternary، الكارت التاني بيطلع فيه السطر فاضي:

~~~text الناتج من console.log($__bt  المهارات: $__{[].join(" · ")}$__bt)
  المهارات:
~~~

[[[].join(...)]] بترجّع نص فاضي من غير error، فالغلطة مش بتبان غير لما تبص على الناتج. عشان كده التمرين طالب «لسه».` },
        { lvl: 'صغير', t: R`إخفاء البيانات`, what: R`[[maskEmail(email)]] و [[maskPhone(phone)]]: الإيميل يبان منه أول حرف والدومين بس، والموبايل أول ٣ وآخر ٣ أرقام والباقي نجوم. بـ [[slice]] و [[indexOf]] و [[repeat]]. من درس «string methods».`, done: R`[[maskPhone("01012345678")]] بترجّع "010*****678"، والإيميل المخفي طوله زي الأصلي والدومين بعد [["@"]] زي ما هو، والإيميل من غير [["@"]] بيرجع زي ما هو أو رسالة.`, sol: R`**هتشوف إيه:** إيميلات وموبايلات قبل وبعد الإخفاء، وجنب كل إيميل [[true]] لو الطول فضل زي الأصل. والإيميلات اللي مفيهاش [[@]] صح بترجع زي ما هي.

~~~js mask.js
// إخفاء الإيميل والموبايل قبل ما يتعرضوا (في إيصال، أو لوج، أو صفحة «نسيت الباسورد»)
function maskEmail(email) {
  const at = email.indexOf("@");
  if (at < 1) return email;
  const user = email.slice(0, at);
  const domain = email.slice(at);
  return user[0] + "*".repeat(user.length - 1) + domain;
}

function maskPhone(phone) {
  if (phone.length <= 6) return "*".repeat(phone.length);
  return phone.slice(0, 3) + "*".repeat(phone.length - 6) + phone.slice(-3);
}

for (const email of ["sara.adel@mail.com", "a@x.io", "no-at-sign", "@mail.com"]) {
  const masked = maskEmail(email);
  console.log(email.padEnd(20), "→", masked.padEnd(20), masked.length === email.length);
}
for (const phone of ["01012345678", "01198765432", "12345"]) {
  console.log(phone.padEnd(12), "→", maskPhone(phone));
}
~~~

~~~text الناتج: node mask.js
sara.adel@mail.com   → s********@mail.com   true
a@x.io               → a@x.io               true
no-at-sign           → no-at-sign           true
@mail.com            → @mail.com            true
01012345678  → 010*****678
01198765432  → 011*****432
12345        → *****
~~~

**كل حتة بتعمل إيه:**

- [[email.indexOf("@")]]: مكان الـ [[@]]، أو -1 لو مش موجودة. و [[if (at < 1)]] بتمسك حالتين مع بعض: مفيش [[@]] خالص (-1)، أو [[@]] في أول حرف (0، يعني مفيش اسم قبلها). في الحالتين الإيميل بيرجع زي ما هو.
- [[email.slice(0, at)]] الاسم قبل الـ [[@]]، و [[email.slice(at)]] من الـ [[@]] لحد الآخر (الدومين ومعاه الـ [[@]]).
- [[user[0] + "*".repeat(user.length - 1)]]: أول حرف، وبعده نجمة مكان كل حرف باقي، فالطول مبيتغيرش (عمود [[true]] بيثبتها).
- [[maskPhone]]: أول ٣ وآخر ٣ والنص نجوم. والرقم القصير (٦ أو أقل) كله نجوم، لأن لو ظهر منه ٦ يبقى ظهر كله.
- [[padEnd(20)]]: بيكمّل كل نص بمسافات لـ ٢٠ حرف، فالأسهم بتيجي تحت بعض.

**الغلطات اللي حصلت وأنا ببنيه:** أول نسخة كانت بـ [[split("@")]] من غير فحص:

~~~js mask-v1.js
function maskEmail(email) {
  const parts = email.split("@");
  return parts[0][0] + "*".repeat(parts[0].length - 1) + "@" + parts[1];
}
console.log(maskEmail("no-at-sign"));
console.log(maskEmail("@mail.com"));
~~~

~~~text الناتج (من غير سطر المسار وسطور الـ stack)
n*********@undefined
  return parts[0][0] + "*".repeat(parts[0].length - 1) + "@" + parts[1];
                           ^

RangeError: Invalid count value: -1
~~~

- [["no-at-sign"]]: [[split]] رجّعت عنصر واحد، فـ [[parts[1]]] بقت [[undefined]] واتلزقت في النص: [[@undefined]]. ده هيتعرض لليوزر كده.
- [["@mail.com"]]: الاسم فاضي، فـ [[length - 1]] بقت -1، و [[repeat]] بترفض العدد السالب بـ RangeError.

الحل كان [[indexOf]] وفحص [[at < 1]] قبل أي حاجة، فالحالتين بقوا يرجعوا الإيميل زي ما هو.

**ملحوظة أمان:** الإخفاء ده للعرض بس (عشان اللي واقف وراك ميشوفش الرقم). البيانات الأصلية لسه في الـ database، والحماية الحقيقية بتبقى في الصلاحيات.` },
        { lvl: 'متوسط', t: R`رسالة تأكيد الطلب`, what: R`[[orderMessage(order)]] بتاخد object فيه اسم العميل ولستة منتجات (اسم وكمية وسعر) والعنوان، وبترجّع رسالة جاهزة تتبعت: سطر لكل منتج متظبط بـ [[padEnd]]، والإجمالي، وجملة شرطية بـ ternary جوه [[$__{ }]] (الشحن مجاني ولا لأ). من وحدة «المتغيرات والنصوص» و «for...of و for...in».`, done: R`أسعار المنتجات متراصة في عمود واحد، والإجمالي صح، والرسالة مفيهاش [[undefined]] ولا [[NaN]] حتى لو العنوان ناقص (بيكتب «العنوان: لسه»).`, sol: R`**هتشوف إيه:** رسالتين جاهزين يتنسخوا في واتساب: الأولى طلب فوق ٥٠٠ جنيه فالشحن مجاني، والتانية طلب صغير من غير عنوان، فالشحن ٥٠ والعنوان «لسه». والأرقام في كل سطر منتج متراصة في عواميد.

~~~js order-message.js
// رسالة تأكيد طلب جاهزة تتبعت واتساب أو SMS
const FREE_SHIPPING_FROM = 500;
const SHIPPING = 50;

function orderMessage(order) {
  let subtotal = 0;
  let lines = "";
  for (const item of order.items) {
    const lineTotal = item.qty * item.price;
    subtotal += lineTotal;
    lines += $__bt$__{item.name.padEnd(14)} $__{String(item.qty).padStart(2)} × $__{String(item.price).padStart(4)} = $__{String(lineTotal).padStart(5)} جنيه\n$__bt;
  }
  const free = subtotal >= FREE_SHIPPING_FROM;
  const total = free ? subtotal : subtotal + SHIPPING;
  const address = order.address ? order.address.trim() : "";
  return $__btأهلًا $__{order.customer ?? "يا فندم"}، طلبك اتسجل:
$__{lines}المجموع: $__{subtotal} جنيه
الشحن: $__{free ? "مجاني" : $__bt$__{SHIPPING} جنيه (الشحن مجاني من $__{FREE_SHIPPING_FROM})$__bt}
الإجمالي: $__{total} جنيه
العنوان: $__{address || "لسه"}$__bt;
}

const order = {
  customer: "Sara",
  address: " 12 Nile St, Giza ",
  items: [
    { name: "Mug", qty: 2, price: 120 },
    { name: "T-shirt", qty: 1, price: 300 },
    { name: "Sticker pack", qty: 10, price: 5 },
  ],
};
console.log(orderMessage(order));
console.log("---");
console.log(orderMessage({ customer: "Omar", items: [{ name: "Cap", qty: 1, price: 90 }] }));
~~~

~~~text الناتج: node order-message.js
أهلًا Sara، طلبك اتسجل:
Mug             2 ×  120 =   240 جنيه
T-shirt         1 ×  300 =   300 جنيه
Sticker pack   10 ×    5 =    50 جنيه
المجموع: 590 جنيه
الشحن: مجاني
الإجمالي: 590 جنيه
العنوان: 12 Nile St, Giza
---
أهلًا Omar، طلبك اتسجل:
Cap             1 ×   90 =    90 جنيه
المجموع: 90 جنيه
الشحن: 50 جنيه (الشحن مجاني من 500)
الإجمالي: 140 جنيه
العنوان: لسه
~~~

**كل حتة بتعمل إيه:**

- [[FREE_SHIPPING_FROM]] و [[SHIPPING]] ثوابت فوق الملف بحروف كبيرة: لو المحل غيّر حد الشحن المجاني بيغيّره في سطر واحد، والرقم مش متكرر في الرسالة.
- الـ loop: لكل منتج بيحسب [[lineTotal]] ويزوّده على [[subtotal]] (عشان كده [[let]])، ويضيف سطر لـ [[lines]] بـ [[+=]].
- [[item.name.padEnd(14)]]: الاسم بيتكمّل مسافات لـ ١٤ حرف، فكل الأرقام بعده بتبدأ من نفس العمود.
- [[String(item.qty).padStart(2)]]: [[padStart]] موجودة على النصوص بس، فبنحوّل الرقم الأول. وبتكمّل من الشمال، فالأرقام بتتراص يمين زي أي فاتورة (10 فوق 1 وآحادهم تحت بعض).
- [[\n]] في آخر كل سطر منتج، فالسطور بتنزل تحت بعض، وبعد آخر منتج على طول [[المجموع]].
- الـ ternary المتداخل في سطر الشحن: لو مش مجاني بيرجّع template **تاني** جواه [[$__{SHIPPING}]]. ينفع template جوه [[$__{ }]] جوه template.
- [[order.customer ?? "يا فندم"]] و [[address || "لسه"]]: من غير الاسم التحية بتبقى «يا فندم»، ومن غير عنوان (أو عنوان كله مسافات بعد [[trim]]) بيكتب «لسه». هنا [[||]] مقصودة: العنوان الفاضي [[""]] لازم يبقى «لسه» كمان.

**الغلطة اللي بتحصل:** أول ما تكتب الرسالة بتحط القيم على طول:

~~~text الناتج من const order = { customer: "Omar" }; console.log($__btالعنوان: $__{order.address}$__bt); const x = undefined; console.log($__btالمجموع: $__{x * 2}$__bt)
العنوان: undefined
المجموع: NaN
~~~

الـ template literal مبيعترضش على [[undefined]]، بيكتبها كلمة في الرسالة اللي العميل هيستلمها. عشان كده كل حقل اختياري ليه قيمة بديلة، والحسابات بتتعمل على أرقام موجودة بس.` },
        { lvl: 'متوسط', t: R`إحصائيات مقال`, what: R`[[stats(text)]] بترجّع عدد الكلمات (حتى لو فيه مسافات كتير ورا بعض وسطور جديدة)، وعدد الحروف من غير مسافات، ووقت القراية (٢٠٠ كلمة في الدقيقة، مقرّب لفوق بـ [[Math.ceil]])، وأطول كلمة. من درس «string methods» و «تمرين charCount».`, done: R`[[stats("  hello   world ")]] بيقول 2 كلمة و 10 حروف، والنص الفاضي بيرجّع 0 كلمة و 0 دقيقة مش [[1]] ولا error، ونص ٢٠١ كلمة بيقول دقيقتين.`, sol: R`**هتشوف إيه:** ٥ objects إحصائيات: نص فيه مسافات كتير، ونص فاضي، ونص كله مسافات وسطر جديد، وفقرة عربي وإنجليزي على سطرين. وآخر سطر بيقارن وقت القراية لـ ٢٠٠ كلمة و ٢٠١ كلمة.

~~~js stats.js
// إحصائيات مقال: كلمات، وحروف من غير مسافات، ووقت القراية، وأطول كلمة
const WORDS_PER_MINUTE = 200;

function stats(text) {
  const clean = text.trim();
  const words = clean === "" ? [] : clean.split(/\s+/);
  let longest = "";
  for (const word of words) {
    if (word.length > longest.length) longest = word;
  }
  return {
    words: words.length,
    letters: text.replace(/\s/g, "").length,
    minutes: Math.ceil(words.length / WORDS_PER_MINUTE),
    longest,
  };
}

console.log(stats("  hello   world "));
console.log(stats(""));
console.log(stats("   \n  "));
console.log(stats($__btJavaScript بتشتغل في المتصفح
وفي Node كمان،   والمسافات   الكتير مش مشكلة.$__bt));
console.log(stats("word ".repeat(200)).minutes, stats("word ".repeat(201)).minutes);
~~~

~~~text الناتج: node stats.js
{ words: 2, letters: 10, minutes: 1, longest: 'hello' }
{ words: 0, letters: 0, minutes: 0, longest: '' }
{ words: 0, letters: 0, minutes: 0, longest: '' }
{ words: 11, letters: 60, minutes: 1, longest: 'JavaScript' }
1 2
~~~

**كل حتة بتعمل إيه:**

- [[text.trim()]] الأول: من غيرها المسافات اللي في الأطراف كانت هتعمل كلمات فاضية في أول وآخر الـ array.
- [[clean === "" ? [] : ...]]: النص الفاضي حالة لوحدها، لأن [["".split(/\s+/)]] بترجّع [[[""]]] (عنصر واحد فاضي)، يعني «كلمة واحدة».
- [[split(/\s+/)]]: [[\s]] أي مسافة أو tab أو سطر جديد، و [[+]] «واحد أو أكتر». فالمسافات الكتير والسطر الجديد كلهم فاصل واحد.
- [[text.replace(/\s/g, "")]]: بيمسح كل المسافات من النص (الـ [[g]] معناها «كلهم»)، وطول الباقي هو عدد الحروف. [["hello"]] و [["world"]] = 10.
- [[Math.ceil(words / 200)]]: بيقرّب لفوق. ٢٠١ كلمة = ١٫٠٠٥ دقيقة تبقى 2، لأن الكلمة الزيادة محتاجة وقت. والصفر بيفضل 0 (مش 1) لأن [[Math.ceil(0)]] بـ 0.
- أطول كلمة: loop بتحتفظ بالأطول لحد دلوقتي، وبتستخدم [[>]] مش [[>=]] فلو فيه كلمتين بنفس الطول الأولى هي اللي بتكسب.

**ملحوظة على الفقرة العربي:** الفاصلة العربي في [[كمان،]] والنقطة في [[مشكلة.]] بيتحسبوا جزء من الكلمة وحروف. لو عايز تشيلهم، ده [[replace]] بـ regex للرموز (زي تمرين slugify).

**الغلطة اللي بتحصل:** تقطّع بمسافة واحدة [[split(" ")]]:

~~~text الناتج من console.log("".split(" ").length, "  hello   world ".split(" ").length, "  hello   world ".split(" "))
1 7 [ '', '', 'hello', '', '', 'world', '' ]
~~~

النص الفاضي طلع «كلمة»، و [["  hello   world "]] طلعت ٧ كلمات: كل مسافتين ورا بعض بينهم نص فاضي بيتعدّ. عشان كده [[trim]] و [[\s+]] وفحص الفاضي، التلاتة مع بعض.` },
        { lvl: 'كبير', t: R`منظّف بيانات عملاء`, what: R`template literal فيه ١٠ سطور CSV بايظة (اسم وموبايل وإيميل): مسافات زيادة، وحروف كبيرة في الإيميل، وسطور فاضية، وموبايل فيه شرط أو ناقص. [[clean(csv)]] بترجّع النضيف و report فيه رقم كل سطر اترفض وسببه. الموبايل الصح ١١ رقم ويبدأ بـ [["01"]]. من وحدة «المتغيرات والنصوص» كلها و «break و continue» و «if و else if».`, done: R`كل سطر نضيف مفيهوش مسافات في الأول والآخر، والإيميل lowercase، والموبايل من غير شرط. السطور الفاضية مش محسوبة رفض، وكل سطر مرفوض متكتب برقمه الأصلي في الملف. ولو شغّلت [[clean]] على الناتج النضيف تاني بيطلع نفس الناتج بالظبط.`, ext: R`زوّد كشف التكرار بالإيميل، واطبع ملخص في الآخر (كام نضيف وكام مرفوض)، وخلي الدالة تقبل فاصل غير الـ comma.`, sol: R`**هتشوف إيه:** ١٠ سطور عملاء بايظة داخلة، وطالع منها CSV نضيف من ٤ عملاء، وتقرير بالـ ٥ سطور المرفوضة كل واحد برقمه في الملف الأصلي وسببه، وآخر سطر بيأكد إن تشغيل التنضيف تاني على الناتج بيطلّع نفس الناتج بالظبط. ومعاه ٨ اختبارات كلهم بيعدّوا.

~~~text شجرة الملفات
customers/
├── clean.js        دالة clean والفحوص
├── clean.test.js   الاختبارات بـ node --test
└── demo.js         البيانات البايظة في template literal، وطباعة النتيجة
~~~

**ترتيب البناء:** تقطيع السطور وتخطّي الفاضي الأول، وبعدها تنضيف كل حقل، وبعدين الفحوص ([[checkRow]])، وبعدين تجميع الـ CSV الطالع، وآخر حاجة الاختبارات (ومنها اختبار «مرتين بنفس الناتج»).

~~~js clean.js
// clean(csv): بينضّف سطور عملاء (اسم وموبايل وإيميل)، ويرجّع النضيف وتقرير بالمرفوض
const HEADER = "name,phone,email";

function cleanPhone(raw) {
  return raw.replaceAll("-", "").replaceAll(" ", "");
}

function checkRow(name, phone, email) {
  if (name === "") return "الاسم فاضي";
  if (phone.length !== 11 || !phone.startsWith("01")) return $__btالموبايل غلط: "$__{phone}"$__bt;
  for (const ch of phone) {
    if (ch < "0" || ch > "9") return $__btالموبايل فيه حروف: "$__{phone}"$__bt;
  }
  const at = email.indexOf("@");
  if (at < 1 || at !== email.lastIndexOf("@") || !email.slice(at).includes(".")) return $__btالإيميل غلط: "$__{email}"$__bt;
  return "";
}

function clean(csv) {
  const rows = [];
  const rejected = [];
  const lines = csv.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const lineNo = i + 1;
    if (line === "") continue;
    if (line.toLowerCase().replaceAll(" ", "") === HEADER) continue;
    const parts = line.split(",");
    if (parts.length !== 3) {
      rejected.push({ line: lineNo, reason: $__btعدد الحقول $__{parts.length} مش 3$__bt, raw: line });
      continue;
    }
    const name = parts[0].trim().split(/\s+/).join(" ");
    const phone = cleanPhone(parts[1].trim());
    const email = parts[2].trim().toLowerCase();
    const reason = checkRow(name, phone, email);
    if (reason) {
      rejected.push({ line: lineNo, reason, raw: line });
      continue;
    }
    rows.push({ name, phone, email });
  }
  const out = [HEADER];
  for (const r of rows) out.push($__bt$__{r.name},$__{r.phone},$__{r.email}$__bt);
  return { rows, rejected, csv: out.join("\n") };
}

module.exports = { clean, HEADER };
~~~

~~~js demo.js
const { clean } = require("./clean");

const raw = $__btname,phone,email
  Sara Adel , 010-1234-5678 , Sara@Mail.COM
Omar Hassan,01198765432,omar@mail.com

Mona   Aly,0122 333 4444,MONA@work.io
Ali,0101234567,ali@mail.com
,01012345678,noname@mail.com
Hoda,01512345678,hoda.mail.com
Karim,01xx2345678,karim@mail.com
Nour,01212345678,nour@mail.com,extra
  Youssef  ,  01001112233  ,  YOUSSEF@Gmail.com  $__bt;

const result = clean(raw);
console.log(result.csv);
console.log($__bt\nنضيف: $__{result.rows.length} | مرفوض: $__{result.rejected.length}$__bt);
for (const r of result.rejected) console.log($__bt  سطر $__{r.line}: $__{r.reason}$__bt);
console.log("\nتشغيل تاني على الناتج بيطلع هو هو:", clean(result.csv).csv === result.csv);
~~~

~~~js clean.test.js
const test = require("node:test");
const assert = require("node:assert");
const { clean, HEADER } = require("./clean");

test("بيشيل المسافات ويصغّر الإيميل ويشيل الشرط من الموبايل", () => {
  const { rows } = clean("  Sara Adel , 010-1234-5678 , Sara@Mail.COM  ");
  assert.deepStrictEqual(rows, [{ name: "Sara Adel", phone: "01012345678", email: "sara@mail.com" }]);
});

test("المسافات الكتير جوه الاسم بتبقى مسافة واحدة", () => {
  assert.equal(clean("Mona   Aly,01223334444,m@x.io").rows[0].name, "Mona Aly");
});

test("السطور الفاضية والـ header مش محسوبين رفض", () => {
  const { rows, rejected } = clean($__bt$__{HEADER}\n\n   \nAli,01012345678,ali@mail.com\n$__bt);
  assert.equal(rows.length, 1);
  assert.deepStrictEqual(rejected, []);
});

test("المرفوض متسجل برقم سطره الأصلي وسببه", () => {
  const csv = "Ali,01012345678,ali@mail.com\n\nBad,0101234567,bad@mail.com\nNoAt,01012345678,noat.mail.com";
  const { rejected } = clean(csv);
  assert.deepStrictEqual(rejected.map((r) => r.line), [3, 4]);
  assert.match(rejected[0].reason, /الموبايل/);
  assert.match(rejected[1].reason, /الإيميل/);
});

test("الموبايل لازم 11 رقم يبدأ بـ 01 ومفيهوش حروف", () => {
  for (const phone of ["0101234567", "010123456789", "02012345678", "01x12345678"]) {
    assert.equal(clean($__btA,$__{phone},a@b.co$__bt).rows.length, 0, phone);
  }
});

test("عدد حقول غلط بيترفض", () => {
  assert.match(clean("A,01012345678,a@b.co,extra").rejected[0].reason, /عدد الحقول 4/);
  assert.match(clean("just a name").rejected[0].reason, /عدد الحقول 1/);
});

test("تشغيله مرتين بيطلع نفس الناتج بالظبط", () => {
  const first = clean(" Sara , 010-1234-5678 , S@M.com \nbad line\nOmar,01198765432,o@m.com");
  assert.equal(clean(first.csv).csv, first.csv);
  assert.deepStrictEqual(clean(first.csv).rejected, []);
});

test("نص فاضي بيرجّع header بس", () => {
  assert.deepStrictEqual(clean(""), { rows: [], rejected: [], csv: HEADER });
});
~~~

~~~text الناتج: node demo.js
name,phone,email
Sara Adel,01012345678,sara@mail.com
Omar Hassan,01198765432,omar@mail.com
Mona Aly,01223334444,mona@work.io
Youssef,01001112233,youssef@gmail.com

نضيف: 4 | مرفوض: 5
  سطر 6: الموبايل غلط: "0101234567"
  سطر 7: الاسم فاضي
  سطر 8: الإيميل غلط: "hoda.mail.com"
  سطر 9: الموبايل فيه حروف: "01xx2345678"
  سطر 10: عدد الحقول 4 مش 3

تشغيل تاني على الناتج بيطلع هو هو: true
~~~

~~~text الناتج: node --test (Node 24.22)
✔ بيشيل المسافات ويصغّر الإيميل ويشيل الشرط من الموبايل (1.4345ms)
✔ المسافات الكتير جوه الاسم بتبقى مسافة واحدة (0.1549ms)
✔ السطور الفاضية والـ header مش محسوبين رفض (0.1419ms)
✔ المرفوض متسجل برقم سطره الأصلي وسببه (0.3141ms)
✔ الموبايل لازم 11 رقم يبدأ بـ 01 ومفيهوش حروف (0.1722ms)
✔ عدد حقول غلط بيترفض (0.1412ms)
✔ تشغيله مرتين بيطلع نفس الناتج بالظبط (0.1424ms)
✔ نص فاضي بيرجّع header بس (0.1206ms)
ℹ tests 8
ℹ suites 0
ℹ pass 8
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 79.5191
~~~

**أهم الحتت وليه كده:**

| الحتة | بتعمل إيه | ليه |
|---|---|---|
| [[csv.split("\n")]] و [[i + 1]] | سطر سطر، ورقم السطر من 1 | التقرير بيقول «سطر 6» زي ما بتشوفه في أي editor، والسطور الفاضية بتتخطّى بـ [[continue]] بس رقمها محسوب، فرقم المرفوض بيفضل رقمه الأصلي |
| [[lines[i].trim()]] | بيشيل المسافات من أول وآخر السطر | وكمان [[\r]] لو الملف جاي من ويندوز (CRLF)، فالإيميل ميبقاش [["ali@mail.com\r"]] |
| تخطّي الـ header | السطر [[name,phone,email]] مش عميل | ومن غيره التشغيل التاني على الناتج (اللي أوله header) كان هيرفض أول سطر |
| [[split(/\s+/).join(" ")]] في الاسم | المسافات الكتير جوه الاسم بتبقى واحدة | [["Mona   Aly"]] و [["Mona Aly"]] نفس العميل |
| [[replaceAll]] في الموبايل | بيشيل **كل** الشرط والمسافات | [[replace]] بتشيل أول واحدة بس (تحت) |
| [[checkRow]] بترجّع نص | [[""]] يعني سليم، وأي نص هو السبب | سبب واحد واضح لكل سطر، و [[if (reason)]] بتستخدم إن النص الفاضي falsy |
| الموبايل حرف حرف | [[ch < "0" \|\| ch > "9"]] | مقارنة النصوص بالترتيب: أي حرف مش بين [["0"]] و [["9"]] مش رقم، من غير regex |
| الإيميل | [[@]] واحدة مش في الأول، وبعدها [[.]] | فحص بسيط بيمسك الغلطات الشائعة. الفحص الحقيقي إيميل تأكيد |
| [[csv: out.join("\n")]] | الناتج CSV بنفس الشكل الداخل | عشان يتكتب في ملف، ويتنضّف تاني ويطلع هو هو |

**ليه «تشغيله مرتين بنفس الناتج» مهم:** السكربتات دي بتتشغّل على ملفات بتتحدث كل يوم، وساعات على ملف اتنضّف قبل كده. لو التنضيف التاني غيّر حاجة (شال حرف، أو رفض سطر سليم)، يبقى فيه قاعدة بتبوّظ البيانات. الخاصية دي اسمها idempotent، واختبارها رخيص.

**الغلطة اللي بتحصل في الموبايل:**

~~~text الناتج من console.log("010-1234-5678".replace("-", ""), "010-1234-5678".replaceAll("-", ""))
0101234-5678 01012345678
~~~

[[replace]] بنص بتشيل **أول** شرطة بس، فالرقم فضل فيه شرطة وطوله 12 واترفض وهو سليم. [[replaceAll]] بتشيلهم كلهم. ولو مكانش في الاختبارات رقم بشرطتين، الغلطة دي كانت هتعدّي.

**جرّبت كمان ملف ويندوز (CRLF):** [[clean("Ali,01012345678,ali@mail.com\r\nOmar,01198765432,omar@mail.com\r\n")]] رجّعت عميلين، والإيميل [["ali@mail.com"]] من غير [[\r]]، بفضل [[trim]] على السطر.` },
        { lvl: 'فكرة', t: R`مولّد نصوص بتكتبها كل يوم`, what: R`فكّر في رسالة بتكتبها كتير بنفس الشكل: رد على عميل، تقرير يومي في الشغل، بوست، إيميل متابعة. اعملها دالة بتاخد object البيانات وترجّع النص جاهز بـ template literal.`, done: R`ناتج الدالة على بيانات حقيقية زي ما كنت هتكتبه بإيدك، ومفيش [[undefined]] لو حقل ناقص.`, ext: R`زوّد نسختين (رسمي وودّي) بباراميتر، ونسخة إنجليزي، وخلّيها تختار التحية حسب الساعة.`, sol: R`**نسخة نموذجية:** تقرير الشغل اليومي (الـ standup) اللي ناس كتير بتكتبه في جروب الفريق كل صبح بنفس الشكل: خلّصت إيه، وهشتغل على إيه، وواقف على إيه. الدالة بتاخد object وترجّع الرسالة جاهزة تتلزق.

~~~js daily-report.js
// تقرير الشغل اليومي (standup) اللي بيتبعت في جروب الفريق كل يوم بنفس الشكل
function text(value) {
  return typeof value === "string" ? value.trim() : "";
}

function list(items) {
  if (!Array.isArray(items) || items.length === 0) return "  - مفيش";
  return items.map((item) => $__bt  - $__{text(item)}$__bt).join("\n");
}

function dailyReport(data) {
  const name = text(data.name) || "أنا";
  const date = text(data.date) || new Date().toLocaleDateString("ar-EG");
  const blockers = text(data.blockers);
  return $__btتقرير $__{name} — $__{date}
خلّصت امبارح:
$__{list(data.done)}
هشتغل النهارده على:
$__{list(data.next)}
$__{blockers ? $__btواقف على: $__{blockers}$__bt : "مفيش حاجة موقفاني"}$__bt;
}

console.log(dailyReport({
  name: "Sara",
  date: "الأحد ٢٢ نوفمبر",
  done: ["صفحة تسجيل الدخول", " اختبارات فاحص الفورم "],
  next: ["ربط الصفحة بالـ API"],
  blockers: "مستنية مفتاح الـ API من التيم",
}));
console.log("---");
console.log(dailyReport({ name: "Omar", date: "الأحد ٢٢ نوفمبر", done: ["مراجعة PR رقم 42"] }));
console.log("---");
console.log(dailyReport({ date: "الأحد ٢٢ نوفمبر" }));
~~~

~~~text الناتج: node daily-report.js
تقرير Sara — الأحد ٢٢ نوفمبر
خلّصت امبارح:
  - صفحة تسجيل الدخول
  - اختبارات فاحص الفورم
هشتغل النهارده على:
  - ربط الصفحة بالـ API
واقف على: مستنية مفتاح الـ API من التيم
---
تقرير Omar — الأحد ٢٢ نوفمبر
خلّصت امبارح:
  - مراجعة PR رقم 42
هشتغل النهارده على:
  - مفيش
مفيش حاجة موقفاني
---
تقرير أنا — الأحد ٢٢ نوفمبر
خلّصت امبارح:
  - مفيش
هشتغل النهارده على:
  - مفيش
مفيش حاجة موقفاني
~~~

**ليه اخترت التصميم ده:**

- **object واحد للبيانات، ودالة واحدة للشكل:** البيانات بتتغير كل يوم والشكل ثابت. لو الفريق طلب سطر جديد (مثلًا «محتاج review من مين») بتزوّده في الـ template مرة واحدة.
- **[[text(value)]]:** كل حقل نصي بيعدّي عليها، فالمسافات الزيادة بتتشال ( [[" اختبارات فاحص الفورم "]] اتنضفت)، والحقل الناقص بيبقى [[""]] مش [[undefined]]. ده اللي بيضمن «مفيش undefined لو حقل ناقص» (الـ done).
- **[[list(items)]]:** دالة صغيرة لأن القايمة اتكررت مرتين. بتفحص [[Array.isArray]] الأول، فلو حد نسي الحقل أو بعت نص بدل array بتكتب «مفيش» بدل ما توقع.
- **[[join("\n")]] مش [[+= "\n"]]:** السطور بتتلزق بسطر جديد **بينهم** بس، فمفيش سطر فاضي زيادة بعد آخر بند.
- **الـ ternary في آخر سطر:** فيه template جوه template: لو فيه حاجة واقفة بيكتبها، ولو لأ جملة ثابتة. الجملتين معناهم حاجة للفريق، فمفيش سطر بيختفي.
- **التاريخ:** لو متبعتش، [[new Date().toLocaleDateString("ar-EG")]] بيكتب تاريخ النهارده بالعربي. في الأمثلة بعته بإيدي عشان الناتج اللي فوق يفضل هو هو كل مرة تشغّله.
- **[[||]] مش [[??]] في الاسم والتاريخ:** [[text]] بترجّع [[""]] للناقص، والنص الفاضي لازم ياخد القيمة البديلة، و [[??]] مبتشوفش [[""]].

**خليه بتاعك:** بدّل الحقول بحقول رسالتك انت (رد على عميل: الاسم ورقم الطلب والمشكلة والحل)، وجرّبه بحقل ناقص وحقل كله مسافات قبل ما تعتمد عليه.` }
      ],
      items: [
        {
          cmd: "let و const و var",
          title: "تعرّف متغير بـ let ولا const ولا var؟",
          ref: [
            { t: "MDN: let", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let" },
            { t: "MDN: const", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const" },
            { t: "MDN: var", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var" },
            { t: "MDN: Hoisting", url: "https://developer.mozilla.org/en-US/docs/Glossary/Hoisting" }
          ],
          pre: [{ to: "js/primitives و objects", why: R`الفرق بين إعادة التعيين وتعديل جوه الـ object هو نفس فرق القيمة والـ reference` }],
          desc: R`[[const]] لمتغير مش هيتعيّن تاني، و [[let]] لمتغير هيتغير (عداد مثلًا). و [[var]] الطريقة القديمة، ومتستخدمهاش في كود جديد.

القاعدة العملية: ابدأ بـ [[const]] دايمًا، ولو احتجت تعيد التعيين غيّرها لـ [[let]].

خد بالك: [[const]] بيمنع إعادة التعيين، مش التعديل. [[const user = {}]] وبعدين [[user.name = "Sara"]] مسموح، لأن المتغير لسه شايل نفس الـ object.`,
          example: R`const PI = 3.14;
let count = 0;
count = count + 1;
const user = { name: "Sara" };
user.name = "Omar";          // مسموح: عدّلت جوه الـ object
if (true) {
  let inside = 1;
  var leaky = 2;
}
console.log(leaky);          // 2: var مبيعرفش الـ block
console.log(typeof inside);  // "undefined": let جوه الـ block بس
PI = 3;                      // TypeError: Assignment to constant variable.`,
          try: R`شغّل الكود في ملف [[vars.js]] بـ [[node vars.js]] واقرا الـ error في الآخر. وبعدين غيّر [[let inside]] لـ [[var inside]] وشوف الفرق في السطر اللي قبل الأخير.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[const arr = [1]; arr.push(2);]] واطبع arr، وبعدين [[arr = [];]].`, done: R`الأول بيطبع [[[1, 2]]] عادي، والتاني [[TypeError: Assignment to constant variable.]]. الـ const بيمنع التعيين مش التعديل جوه الـ array.`, sol: R`~~~js const-array.js
const arr = [1];
arr.push(2);
console.log(arr);
arr = [];
~~~

~~~text الناتج (من غير سطر المسار وسطور الـ stack)
[ 1, 2 ]
arr = [];
    ^

TypeError: Assignment to constant variable.
~~~

**ليه:**

- [[arr.push(2)]] عدّلت **جوه** الـ array، والمتغير [[arr]] لسه شايل نفس الـ array. فـ [[const]] مش معترضة، والسطر التالت طبع [[[ 1, 2 ]]].
- [[arr = []]] بتحاول تحط array **جديدة** في [[arr]]، وده بالظبط اللي [[const]] بتمنعه: إعادة التعيين.
- لاحظ إن [[[ 1, 2 ]]] اتطبعت قبل الـ error: ده runtime error، الكود بيشتغل لحد السطر اللي فيه المشكلة.

**الغلطة الشائعة:** تفتكر إن [[const]] معناها «القيمة مبتتغيرش». معناها «المتغير مبيتعيّنش تاني». لو عايز الـ array نفسها متتعدّلش، ده [[Object.freeze]] (درس «Object.preventExtensions و seal و freeze»).` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[let total = 0; if (true) { let total = 50; } console.log(total);]]. المطلوب يطبع 50. ليه بيطبع 0؟`, done: R`فهمت إن [[let total]] جوه الـ block عملت متغير جديد بنفس الاسم (shadowing) واختفى بعد [[}]]. بعد ما تشيل [[let]] اللي جوه ويبقى [[total = 50;]] بيطبع 50.`, sol: R`~~~js shadow-broken.js
let total = 0;
if (true) { let total = 50; }
console.log(total);
~~~

~~~text الناتج (قبل التصليح)
0
~~~

الحل: نشيل [[let]] اللي جوه، فالسطر يعدّل المتغير اللي برّه:

~~~js shadow.js
let total = 0;
if (true) { total = 50; }
console.log(total);
~~~

~~~text الناتج (بعد التصليح)
50
~~~

**ليه:**

- [[let]] بتعمل متغير **جديد** جوه الـ block (الأقواس [[{ }]]). فـ [[let total = 50]] عملت [[total]] تاني بنفس الاسم، غطّى على اللي برّه جوه الأقواس بس. ده اسمه shadowing.
- أول ما الـ block خلص عند [[}]]، المتغير الجوّاني اختفى، و [[console.log(total)]] شاف اللي برّه: لسه 0.
- [[total = 50]] من غير [[let]] معناها «عدّل المتغير الموجود»، فـ JS بيدوّر عليه برّه الـ block ويلاقيه.

**الغلطة الشائعة:** إن الكود مبيطلّعش أي error، فبتفضل تدوّر في المكان الغلط. لو لقيت قيمة «مش بتتحفظ» جوه if أو loop، دوّر على [[let]] أو [[const]] زيادة بنفس الاسم. وأدوات زي ESLint بتمسكها بقاعدة اسمها [[no-shadow]].` },
            { lvl: 'تطبيق', t: R`**refactor:** خد أي حل كتبته في التمارين وغيّر كل [[var]] لـ [[const]]، وشغّل، ورجّع لـ [[let]] بس اللي الـ error قال عليه.`, done: R`الكود بيطلّع نفس النتيجة، ومفيش [[var]]، واللي بقى [[let]] بس هي العدادات والمجاميع اللي بتتغير فعلًا.`, sol: R`مثال على حل قديم بـ [[var]] (عدّ الأرقام الزوجية، زي «تمرين countEvens»):

~~~js before.js
var nums = [3, 8, 10, 7, 4];
var count = 0;
for (var i = 0; i < nums.length; i++) {
  var n = nums[i];
  if (n % 2 === 0) count = count + 1;
}
console.log("الزوجي:", count);
~~~

~~~text الناتج
الزوجي: 3
~~~

**الخطوة ١:** كل [[var]] بقت [[const]]، وشغّلت:

~~~text الناتج
for (const i = 0; i < nums.length; i++) {
                                    ^

TypeError: Assignment to constant variable.
~~~

السهم تحت [[i++]]: العداد بيتغير كل لفة، فـ [[i]] ترجع [[let]].

**الخطوة ٢:** شغّلت تاني:

~~~text الناتج
  if (n % 2 === 0) count = count + 1;
                         ^

TypeError: Assignment to constant variable.
~~~

[[count]] مجموع بيزيد، فترجع [[let]]. والـ errors بتطلع واحد واحد لأن الكود بيقف عند أول واحد.

**الشكل النهائي:**

~~~js after.js
const nums = [3, 8, 10, 7, 4];
let count = 0;
for (let i = 0; i < nums.length; i++) {
  const n = nums[i];
  if (n % 2 === 0) count = count + 1;
}
console.log("الزوجي:", count);
~~~

~~~text الناتج
الزوجي: 3
~~~

**ليه [[n]] فضلت [[const]] وهي بتاخد قيمة جديدة كل لفة؟** لأن كل لفة بتعمل [[n]] جديدة خالص (الـ block بيتنفّذ من الأول)، ومحدش بيعيّنها تاني جوه نفس اللفة. أما [[i]] فواحدة بتتزوّد بـ [[i++]].

**الغلطة الشائعة:** تخلي كل حاجة [[let]] «عشان تبقى في الأمان». الـ [[const]] بتقول للي بيقرا «القيمة دي مش هتتغير»، فلما يشوف [[let]] يعرف إن فيه حاجة بتتغير ويركّز عليها.` },
            { lvl: 'تطبيق', t: R`**اشرحها:** اعمل جدول ٣ صفوف (var و let و const) و ٤ عواميد: الـ scope، ينفع تعيد التعيين، ينفع تعرّفه تاني بنفس الاسم، يتقري قبل سطره. وأثبت خانتين بكود.`, done: R`الجدول كامل، والإثبات: [[const x = 1; x = 2;]] بتطلّع [[TypeError: Assignment to constant variable.]]، و [[let y; let y;]] بتطلّع [[SyntaxError: Identifier 'y' has already been declared]] قبل ما أي سطر يشتغل.`, sol: R`**الجدول النموذجي:**

| | الـ scope | تعيد التعيين؟ | تعرّفه تاني بنفس الاسم؟ | يتقري قبل سطره؟ |
|---|---|---|---|---|
| [[var]] | الدالة كلها (أو الملف) | أيوة | أيوة | أيوة، وقيمته [[undefined]] |
| [[let]] | الـ block | أيوة | لأ: SyntaxError | لأ: ReferenceError |
| [[const]] | الـ block | لأ: TypeError | لأ: SyntaxError | لأ: ReferenceError |

**الإثبات الأول:** [[const]] مبتتعيّنش تاني:

~~~js prove-const.js
const x = 1;
x = 2;
~~~

~~~text الناتج (من غير سطر المسار وسطور الـ stack)
x = 2;
  ^

TypeError: Assignment to constant variable.
~~~

**الإثبات التاني:** [[let]] مبتتعرّفش مرتين، والـ error بيطلع **قبل** ما أي سطر يشتغل:

~~~js prove-let.js
console.log("السطر ده مش هيتطبع");
let y;
let y;
~~~

~~~text الناتج
let y;
    ^

SyntaxError: Identifier 'y' has already been declared
~~~

[[console.log]] اللي في أول سطر متنفّذش: الـ SyntaxError بيتكشف وJS بيقرا الملف، قبل التشغيل. أما الـ TypeError في الإثبات الأول فبيحصل وقت التشغيل.

**وباقي الخانات في ملف واحد:**

~~~js prove-rest.js
console.log(typeof a, a);
var a = 1;
{ var a = 2; }
console.log(a);
{ let b = 1; }
console.log(typeof b);
console.log(c);
let c = 3;
~~~

~~~text الناتج
undefined undefined
2
undefined
console.log(c);
            ^

ReferenceError: Cannot access 'c' before initialization
~~~

- السطر الأول: [[var a]] اتقرت قبل سطرها وطلعت [[undefined]] (ده الـ hoisting: التعريف بيطلع لفوق، والقيمة لأ).
- [[{ var a = 2; }]] عدّلت نفس [[a]] اللي برّه: الـ [[var]] مبيعرفش الـ block، وقبل تعريفها تاني من غير error.
- [[typeof b]] برّه الـ block بـ [["undefined"]]: الـ [[let]] عاشت جوه الأقواس بس.
- [[c]] قبل سطرها: ReferenceError. الفترة دي من أول الـ block لحد سطر التعريف اسمها Temporal Dead Zone.

**الغلطة الشائعة:** تفتكر إن [[let]] و [[const]] «مش بيعملوا hoisting». هم بيتعرفوا من أول الـ block، بس ممنوع تلمسهم قبل سطرهم، وده أحسن من [[undefined]] الساكتة بتاعة [[var]].` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** [[for (var i = 0; i < 3; i++) setTimeout(() => console.log(i));]] وبعدين نفس السطر بـ [[let]].`, done: R`بـ var بيطبع 3 تلات مرات، وبـ let بيطبع 0 و 1 و 2، وتقدر تقول ليه (var فيه i واحدة للـ loop كلها).`, sol: R`~~~js loop-timers.js
for (var i = 0; i < 3; i++) setTimeout(() => console.log("var:", i));
for (let j = 0; j < 3; j++) setTimeout(() => console.log("let:", j));
~~~

~~~text الناتج
var: 3
var: 3
var: 3
let: 0
let: 1
let: 2
~~~

**ليه:**

- [[setTimeout(fn)]] بتأجّل تنفيذ [[fn]] لحد ما الكود الحالي كله يخلص. فالـ loop بتلف التلات لفات الأول، وبعدين الدوال التلاتة تشتغل.
- مع [[var]]: فيه [[i]] **واحدة** للـ loop كلها. لما الدوال اشتغلت كانت [[i]] وصلت 3 (القيمة اللي وقّفت الـ loop)، والتلاتة بيقروا نفس الـ [[i]].
- مع [[let]]: كل لفة بتعمل [[j]] **جديدة** بقيمتها ساعتها، وكل دالة فاكرة الـ [[j]] بتاعة لفتها: 0 و 1 و 2.

**الغلطة الشائعة:** تفتكر إن المشكلة في [[setTimeout]] نفسه. المشكلة في إن الدالة بتقرا المتغير **وقت ما بتشتغل** مش وقت ما اتكتبت. ده مثال على الـ closure (درس «closures في loop»)، وكان سؤال انترفيو مشهور قبل [[let]].` },
            { lvl: 'تحدي', t: R`**مسألة:** [[runningTotals(nums)]] بترجّع المجموع التراكمي: [[const result = []]] و [[let sum = 0]]. جرّبها الأول بـ [[const sum = 0]] وشوف الرسالة.`, done: R`بـ const بتوقع بـ [[TypeError: Assignment to constant variable.]] أول ما تزوّد. بعد let: [[runningTotals([10, 20, 5])]] بترجّع [[[10, 30, 35]]] و [[runningTotals([])]] بترجّع [[[]]]، و result فضلت const لأنك بتعمل push مش تعيين.`, sol: R`الأول بـ [[const sum = 0]] زي ما التمرين طالب:

~~~js totals-broken.js
function runningTotals(nums) {
  const result = [];
  const sum = 0;
  for (const n of nums) {
    sum += n;
    result.push(sum);
  }
  return result;
}
console.log(runningTotals([10, 20, 5]));
~~~

~~~text الناتج (من غير سطر المسار وسطور الـ stack)
    sum += n;
        ^

TypeError: Assignment to constant variable.
~~~

الحل:

~~~js totals.js
function runningTotals(nums) {
  const result = [];
  let sum = 0;
  for (const n of nums) {
    sum += n;
    result.push(sum);
  }
  return result;
}
console.log(runningTotals([10, 20, 5]));
console.log(runningTotals([]));
console.log(runningTotals([-5, 5, 2.5]));
~~~

~~~text الناتج
[ 10, 30, 35 ]
[]
[ -5, 0, 2.5 ]
~~~

**ليه:**

- [[sum += n]] اختصار [[sum = sum + n]]، يعني إعادة تعيين، فـ [[sum]] لازم [[let]].
- [[result]] فضلت [[const]]: [[push]] بتعدّل جوه الـ array، والمتغير لسه شايل نفس الـ array.
- [[const n]] في [[for...of]]: كل لفة [[n]] جديدة، فـ [[const]] صح.
- [[runningTotals([])]]: الـ loop متلفّش ولا مرة، فرجعت [[[]]] فاضية من غير error. والسالب والكسور شغالين عادي.

**الغلطة الشائعة:** إن الـ error بيشاور على [[+=]] مش على سطر [[const sum]]، فتفتكر المشكلة في الجمع. الرسالة «Assignment to constant variable» معناها دايمًا: روح للسطر اللي عرّف المتغير وخليه [[let]].` }
          ],
          flag: "script",
          deep: {
            why: R`[[var]] ليه مشاكل اتسببت في bugs سنين: مبيحترمش الـ blocks (if و for)، وبيتعرّف قبل سطره بقيمة undefined (hoisting)، وبيتضاف على [[window]] لو في الـ global. [[let]] و [[const]] جم في ES2015 عشان يحلّوا ده. و [[const]] بيقول لأي حد بيقرا الكود «القيمة دي مش هتتبدل»، فبيسهّل الفهم.`,
            how: R`[[let]] و [[const]] block-scoped: عايشين بين أقرب [[{ }]] بس. [[var]] function-scoped: عايش في الدالة كلها، أو global لو برا أي دالة.

الاتنين بيتعملهم hoisting برضه، بس في حالة مختلفة: الـ var بيتعرّف بقيمة undefined من أول الدالة، والـ let و const بيبقوا في TDZ (temporal dead zone) لحد سطرهم، ولو قريتهم قبله يطلع ReferenceError (درس hoisting في المستوى ٢).

و [[const]] لازم تديله قيمة وقت التعريف، و [[const x;]] لوحدها SyntaxError.

ولو عايز object ميتعدّلش فعلًا فيه [[Object.freeze]] (سطحي: بيجمّد المستوى الأول بس).`,
            when: R`[[const]] لـ 90% من المتغيرات: الـ imports والدوال والـ objects والـ arrays اللي هتعدّل جواها. [[let]] للعدادات والقيم اللي بتتبني على مراحل. [[var]] لأ.`,
            mistakes: R`تفتكر إن [[const]] معناه الـ object متجمّد فتستغرب إن التعديل عدّى. وتستخدم [[let]] لكل حاجة «احتياطي». وتعرّف متغير من غير أي كلمة ([[total = 5]]): في sloppy mode بيعمل global من غير ما تحس، وفي strict mode ReferenceError. وفي الانترفيو: «الفرق بين var و let و const؟» قول scope و hoisting و إعادة التعيين.`
          },
          teach: R`## الفكرة

٣ كلمات بتعرّف متغير، والفرق بينهم في سؤالين: «ينفع أحط فيه قيمة تانية بعدين؟» و «هو عايش فين؟». المثال بيجاوب على الاتنين، وفي الآخر بيوقع بـ error مقصود. احفظه في ملف [[vars.js]] وشغّله بـ [[node vars.js]] (Node 24).

---

## ١. const و let

~~~text vars.js
const PI = 3.14;
let count = 0;
count = count + 1;
~~~

- [[const]] اختصار constant (ثابت): المتغير ده مش هيتعيّن تاني.
- [[let]]: متغير عادي، ينفع تحط فيه قيمة جديدة.
- [[count = count + 1]]: من غير [[let]] قبلها، ده **إعادة تعيين** مش تعريف جديد. احسب اليمين ([[0 + 1]]) وحطه في count، فبقى 1.

---

## ٢. const مع object: التعديل مسموح

~~~text vars.js
const user = { name: "Sara" };
user.name = "Omar";          // مسموح: عدّلت جوه الـ object
~~~

[[user]] شايل reference لـ object. السطر التاني مغيّرش [[user]] نفسه (لسه بيشاور على نفس الـ object)، هو غيّر خانة **جوه** الـ object. وده مسموح. لو طبعته:

~~~text الناتج
{ name: 'Omar' }
~~~

الممنوع هو [[user = {...}]]: إنك تخلي المتغير يشاور على حاجة تانية.

---

## ٣. الـ block: let جوه، و var بتهرب

~~~text vars.js
if (true) {
  let inside = 1;
  var leaky = 2;
}
console.log(leaky);          // 2: var مبيعرفش الـ block
console.log(typeof inside);  // "undefined": let جوه الـ block بس
~~~

- [[if (true)]]: شرط دايمًا متحقق، موجود هنا بس عشان يعمل block.
- الـ **block** هو أي حاجة بين [[{ }]]. الـ [[let]] و [[const]] عايشين جواه بس (block-scoped).
- الـ [[var]] مبيعترفش بالـ block، عايش في الدالة كلها، أو في الملف كله لو مفيش دالة (function-scoped).
- [[typeof inside]] بدل [[inside]] على طول، عشان [[typeof]] مبيرميش error لو الاسم مش موجود (درس typeof).

الناتج لحد هنا:

~~~text الناتج
2
undefined
~~~

السطر التاني [[undefined]] من غير علامات تنصيص: ده الـ string [["undefined"]] اللي typeof رجّعه، و console.log بيطبع النص من غير quotes.

---

## ٤. آخر سطر: إعادة تعيين const

~~~text vars.js
PI = 3;                      // TypeError: Assignment to constant variable.
~~~

~~~text الناتج (Node 24، المسار متغيّر)
C:\Users\ali\js-practice\vars.js:12
PI = 3;                      // TypeError: Assignment to constant variable.
   ^

TypeError: Assignment to constant variable.
    at Object.<anonymous> (C:\Users\ali\js-practice\vars.js:12:4)
    ...

Node.js v24.19.0
~~~

نقرا الـ error:

| الجزء | معناه |
|---|---|
| [[vars.js:12]] | الملف، والسطر رقم ١٢ |
| [[^]] | تحت المكان بالظبط اللي وقع فيه |
| [[TypeError]] | نوع الغلطة: عملية مش مسموحة على القيمة دي |
| [[Assignment to constant variable.]] | «بتعيّن قيمة لمتغير ثابت» |
| [[vars.js:12:4]] | سطر ١٢، عمود ٤ (مكان الـ [[=]]) |

الأسطر اللي قبل ١٢ اتنفّذت وطبعت عادي: ده **runtime error** (حصل وقت التشغيل)، مش syntax error (اللي بيوقف الملف قبل ما يبدأ).

---

## ٥. اللي اتجرّب كمان

لو غيّرت [[let inside]] لـ [[var inside]]، السطر قبل الأخير بيطبع:

~~~text الناتج
2
number
~~~

لأن [[inside]] بقت var فهربت من الـ block زي leaky.

ولو قريت let قبل سطرها:

~~~text app.js
console.log(late);
let late = 1;
~~~

~~~text الناتج
ReferenceError: Cannot access 'late' before initialization
~~~

ده الـ TDZ (temporal dead zone): الـ let موجودة بس ممنوع تلمسها قبل سطرها. أما var في نفس الموقف بتطبع [[undefined]] من غير error. و [[const x;]] من غير قيمة: [[SyntaxError: Missing initializer in const declaration]].

وفي المتصفح، [[var]] في الـ global بتتضاف على [[window]] و [[let]] لأ (اتجرّب في Chrome 154): [[var leaky2 = 2; window.leaky2]] بـ 2، و [[let notOnWindow = 1; window.notOnWindow]] بـ undefined.

---

## الخلاصة

| | [[const]] | [[let]] | [[var]] |
|---|---|---|---|
| إعادة تعيين | لأ (TypeError) | أيوة | أيوة |
| تعديل جوه object | أيوة | أيوة | أيوة |
| عايش في | الـ block | الـ block | الدالة كلها |
| قبل سطره | ReferenceError (TDZ) | ReferenceError (TDZ) | [[undefined]] |

ابدأ بـ [[const]]، وغيّرها [[let]] لو احتجت تعيد التعيين، وانسى [[var]].`,
          lines: [
            R`[[const]] لقيمة مش هتتعيّن تاني أبدًا. لو حد حاول (زي آخر سطر) JavaScript بيرمي TypeError بدل ما يغيّرها بهدوء، فبتكتشف الغلط بدري.`,
            R`[[let]] لمتغير قيمته هتتغير، زي عداد. ابدأ بـ [[const]] دايمًا، وغيّرها لـ [[let]] بس لما تحتاج تحط قيمة جديدة في نفس الاسم.`,
            R`إعادة تعيين: بيحسب [[count + 1]] ويحط الناتج 1 في نفس المتغير. مسموحة مع [[let]]، ولو كان [[const]] كان هيرمي TypeError.`,
            R`[[const]] هنا شايل reference (عنوان) لـ object، مش الـ object نفسه. الثابت هو العنوان: مينفعش [[user]] يشاور على object تاني.`,
            R`مسموح: إحنا بنعدّل جوه الـ object، والمتغير لسه شايل نفس العنوان. يعني [[const]] مبتجمّدش الـ object، ولو عايز كده استخدم [[Object.freeze]].`,
            R`[[if (true)]] هنا بس عشان نعمل block جديد بأقواس [[{ }]]. أي أقواس زي دي (if أو for أو حتى لوحدها) بتعمل scope لـ [[let]] و [[const]].`,
            R`[[let]] عايش جوه الـ block ده بس، وأول ما الأقواس تقفل بيختفي. ده بيمنع إن اسم مؤقت يتسرّب ويتلخبط مع اسم تاني برّه.`,
            R`[[var]] مبيعرفش الـ block: بيطلع برّاه ويبقى متاح في الدالة كلها (أو الـ global لو برّه أي دالة). ده سبب إن الكود الحديث مبيستخدمهوش.`,
            R`نهاية الـ block.`,
            R`بيطبع 2: [[leaky]] لسه موجود برّه الـ block لأنه [[var]]. ده بالظبط التسريب اللي [[let]] بيمنعه.`,
            R`بيطبع [["undefined"]] لأن [[inside]] مش موجود هنا. و [[typeof]] على اسم مش متعرّف بترجّع [["undefined"]] من غير error، أما [[console.log(inside)]] كانت هترمي ReferenceError.`,
            R`إعادة تعيين [[const]]: بيرمي TypeError: Assignment to constant variable والبرنامج بيقف عند السطر ده، وعشان كده هو آخر سطر في المثال.`
          ],
          sol: R`[[node vars.js]] بيطبع [[2]] وبعدين [[undefined]]، وبعدين بيقع عند آخر سطر بـ [[TypeError: Assignment to constant variable.]] ومعاه اسم الملف ورقم السطر والعمود ([[vars.js:12]]). لاحظ إن اللي قبل السطر ده اتنفّذ عادي: دا runtime error مش syntax error.

لما تغيّر [[let inside]] لـ [[var inside]]، السطر اللي قبل الأخير بيطبع [["number"]] بدل [["undefined"]]: الـ var بيطلع من الـ block لأن مجاله الدالة كلها (أو الملف)، مش الـ block. ده سبب إن var مبقتش تستخدم. ولو فاكر إن [[user.name = "Omar"]] المفروض يطلع error برضه: لأ، const بتمنع إعادة التعيين للمتغير، مش التعديل جوه الـ object.`
        },
        {
          cmd: "template literals",
          title: "تركّب نص فيه متغيرات أو على كذا سطر",
          ref: [
            { t: "MDN: Template literals", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals" },
            { t: "MDN: Array.prototype.join()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join" }
          ],
          pre: ["js/let و const و var", { to: "js/truthy و falsy", why: R`الـ ternary جوه [[$__{ }]] بيختار حسب الـ truthy` }],
          desc: R`النص بين backticks بدل علامات التنصيص اسمه template literal. جواه بتحط أي expression بين [[$__{ }]]، وممكن يبقى على كذا سطر من غير [[\n]].

ده بدل [["Hi " + name + "!"]] اللي بيبقى صعب يتقري ويتنسى فيه مسافات.`,
          example: R`const name = "Sara";
const total = 1250.5;
const msg = $__btأهلًا $__{name}، طلبك بـ $__{total.toFixed(2)} جنيه$__bt;
const status = $__btالحالة: $__{total > 1000 ? "شحن مجاني" : "شحن 50 جنيه"}$__bt;
const html = $__bt
  <li class="item">
    $__{name.toUpperCase()}
  </li>$__bt;
console.log(msg);
console.log(status);`,
          try: R`اعمل array فيها ٣ منتجات (اسم وسعر)، وركّب منها string فيه [[<ul>]] وجواه [[<li>]] لكل منتج بـ [[map]] و [[join("")]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[const name = "Sara";]] واطبع [[$__btHello, $__{name}!$__bt]] بالـ backtick.`, done: R`بيطبع "Hello, Sara!"، ولو كتبتها بـ [["..."]] بدل الـ backtick هيطبع [[$__{name}]] زي ما هي.`, sol: R`~~~js hello.js
const name = "Sara";
console.log($__btHello, $__{name}!$__bt);
console.log("Hello, $__{name}!");
~~~

~~~text الناتج
Hello, Sara!
Hello, $__{name}!
~~~

**ليه:**

- النص بين backticks (الزرار اللي فوق Tab في الكيبورد الإنجليزي) هو الـ template literal، وجواه [[$__{ }]] معناها «احسب اللي جوه وحط ناتجه هنا». فـ [[$__{name}]] بقت [[Sara]].
- نفس الكلام بين [["..."]] نص عادي: [[$__{name}]] مجرد حروف، فاتطبعت زي ما هي.

**الغلطة الشائعة:** تكتب علامة [[']] (الـ apostrophe) بدل الـ backtick لأن شكلهم قريب. لو شفت [[$__{name}]] مطبوعة بحروفها، أول حاجة تبص عليها هي العلامة اللي بدأت بيها النص.` },
            { lvl: 'سريع', t: R`**refactor:** [["Hi " + name + ", you have " + count + " items (" + total + " EGP)"]]. حوّلها لـ template literal واحد، وتأكد إن الناتج هو هو بـ [[===]].`, done: R`مع [[name = "Sara"]] و [[count = 3]] و [[total = 450]] الاتنين بيطبعوا [[Hi Sara, you have 3 items (450 EGP)]] والمقارنة true. ومفيش ولا [[+]] في السطر الجديد.`, sol: R`~~~js refactor.js
const name = "Sara";
const count = 3;
const total = 450;
const oldMsg = "Hi " + name + ", you have " + count + " items (" + total + " EGP)";
const newMsg = $__btHi $__{name}, you have $__{count} items ($__{total} EGP)$__bt;
console.log(oldMsg);
console.log(newMsg);
console.log(oldMsg === newMsg);
~~~

~~~text الناتج
Hi Sara, you have 3 items (450 EGP)
Hi Sara, you have 3 items (450 EGP)
true
~~~

**ليه:**

- كل [[" + x + "]] في القديم بقت [[$__{x}]] في الجديد، والنص الثابت اتكتب مرة واحدة متصل. فبتقرا الجملة زي ما هتطلع بالظبط، بمسافاتها.
- الأرقام [[3]] و [[450]] اتحوّلت نصوص لوحدها جوه [[$__{ }]]، زي ما كانت بتتحوّل مع [[+]].
- [[oldMsg === newMsg]] بـ true: الـ refactor مغيّرش الناتج ولا حرف. وده الشرط في أي refactor: الشكل يتحسن والسلوك هو هو، وتثبته بمقارنة مش بعينك.

**الغلطة الشائعة:** في القديم سهل تنسى مسافة: [["you have" + count]] بتطلع [[you have3]]. في الـ template المسافات باينة قدامك، فالغلطة دي بتختفي.` },
            { lvl: 'تطبيق', t: R`**ابني:** سطر فاتورة لـ [[{ name: "Mug", qty: 2, price: 120 }]] بحسبة جوه [[$__{ }]].`, done: R`بيطبع "Mug: 2 × 120 = 240 جنيه"، والحسبة جوه الـ template مش في متغير برا.`, sol: R`~~~js invoice-line.js
const item = { name: "Mug", qty: 2, price: 120 };
console.log($__bt$__{item.name}: $__{item.qty} × $__{item.price} = $__{item.qty * item.price} جنيه$__bt);
~~~

~~~text الناتج
Mug: 2 × 120 = 240 جنيه
~~~

**ليه:**

- [[$__{item.name}]]: جوه [[$__{ }]] أي expression، ومنها قراية خاصية من object بالنقطة.
- [[$__{item.qty * item.price}]]: الضرب بيتحسب الأول، وبعدين الناتج 240 بيتحط في النص. مش محتاج متغير [[lineTotal]] برّه.
- علامة [[×]] حرف عادي في النص، مش عملية ضرب.

**الغلطة الشائعة:** تكتب [[$__{item.qty} * $__{item.price}]] وانت فاكرها هتحسب: دي هتطبع [[2 * 120]] كنص، لأن الـ [[*]] برّه [[$__{ }]]. الحساب لازم يبقى كله جوه قوسين واحدين.` },
            { lvl: 'تطبيق', t: R`**أشكال:** [[boxed(text)]] بترجّع النص جوه برواز بـ template من ٣ سطور: سطر [[+---+]] بطول النص + 2، وسطر [[| text |]]، وسطر زي الأول.`, done: R`[[console.log(boxed("Hello"))]] بيطبع [[+-------+]] ثم [[| Hello |]] ثم [[+-------+]]، ولو النص أطول البرواز بيطول معاه. ومفيش [[\n]] مكتوبة بإيدك لو استخدمت سطور حقيقية جوه الـ backtick.`, sol: R`~~~js boxed.js
function boxed(text) {
  const line = "+" + "-".repeat(text.length + 2) + "+";
  return $__bt$__{line}
| $__{text} |
$__{line}$__bt;
}
console.log(boxed("Hello"));
console.log(boxed("JavaScript is fun"));
console.log(boxed(""));
~~~

~~~text الناتج
+-------+
| Hello |
+-------+
+-------------------+
| JavaScript is fun |
+-------------------+
+--+
|  |
+--+
~~~

**ليه كل حتة:**

- [["-".repeat(text.length + 2)]]: [[repeat(n)]] بترجّع النص متكرر n مرة. و [[+ 2]] عشان المسافة اللي قبل النص واللي بعده في [[| text |]]. فـ [["Hello"]] (٥ حروف) خدت ٧ شرط.
- الـ template على ٣ سطور حقيقية: السطر الجديد اللي جوه الـ backticks بيبقى جزء من النص، فمكتبتش [[\n]] خالص.
- [[$__{line}]] اتكررت فوق وتحت من غير ما تحسبها مرتين.
- النص الفاضي اشتغل: [[repeat(2)]] وبرواز صغير، من غير error.

**الغلطة الشائعة:** تعمل indent لسطور الـ template عشان تبقى «شكلها حلو» جوه الدالة:

~~~js boxed-indent.js
function boxed(text) {
  const line = "+" + "-".repeat(text.length + 2) + "+";
  return $__bt$__{line}
    | $__{text} |
    $__{line}$__bt;
}
console.log(boxed("Hi"));
~~~

~~~text الناتج
+----+
    | Hi |
    +----+
~~~

المسافات اللي في أول السطر بقت جزء من النص. عشان كده السطور التانية في الحل مبدوءة من أول العمود.` },
            { lvl: 'تحدي', t: R`**ابني:** إيميل من كذا سطر لطلب: سطر لكل منتج بـ [[map]] و [[join("\n")]] جوه الـ template، وجملة الحالة بـ ternary («اتدفع» أو «مستني الدفع»).`, done: R`عدد السطور = سطور ثابتة + عدد المنتجات بالظبط، ومفيش سطر فاضي زيادة في الأول أو الآخر، وتغيير [[paid]] بيغيّر جملة الحالة بس.`, sol: R`~~~js order-email.js
function orderEmail(order) {
  let total = 0;
  for (const item of order.items) total += item.qty * item.price;
  const lines = order.items.map((item) => $__bt- $__{item.name} × $__{item.qty}: $__{item.qty * item.price} جنيه$__bt);
  return $__btأهلًا $__{order.customer}،
طلبك رقم $__{order.id}:
$__{lines.join("\n")}
الإجمالي: $__{total} جنيه
الحالة: $__{order.paid ? "اتدفع" : "مستني الدفع"}$__bt;
}
const order = {
  id: 1042,
  customer: "Sara",
  paid: false,
  items: [
    { name: "Mug", qty: 2, price: 120 },
    { name: "Cap", qty: 1, price: 90 },
    { name: "Notebook", qty: 3, price: 45 },
  ],
};
const email = orderEmail(order);
console.log(email);
console.log("عدد السطور:", email.split("\n").length);
order.paid = true;
console.log(orderEmail(order).split("\n").at(-1));
~~~

~~~text الناتج
أهلًا Sara،
طلبك رقم 1042:
- Mug × 2: 240 جنيه
- Cap × 1: 90 جنيه
- Notebook × 3: 135 جنيه
الإجمالي: 465 جنيه
الحالة: مستني الدفع
عدد السطور: 7
الحالة: اتدفع
~~~

**ليه كل حتة:**

- [[order.items.map(...)]]: لكل منتج بترجّع سطر نص، فبقت array من ٣ سطور.
- [[lines.join("\n")]]: بتلزق السطور بسطر جديد **بينهم** بس، فمفيش سطر فاضي قبل أول منتج ولا بعد آخر واحد. لو حطيت الـ array جوه [[$__{ }]] من غير [[join]] كانت هتتلزق بفواصل [[,]] على سطر واحد.
- [[$__{order.paid ? "اتدفع" : "مستني الدفع"}]]: الـ ternary ([[شرط ? لو صح : لو غلط]]) expression، فينفع جوه [[$__{ }]]، و [[if]] لأ.
- العدّ: ٤ سطور ثابتة (التحية، ورقم الطلب، والإجمالي، والحالة) + ٣ منتجات = ٧، وده اللي [[split("\n").length]] قالته.
- آخر سطرين: لما [[paid]] بقت true، آخر سطر بس اللي اتغيّر. و [[at(-1)]] بتجيب آخر عنصر.

**الغلطة الشائعة:** تبدأ الـ template بسطر جديد عشان شكل الكود: [[return $__bt]] وبعدها Enter وبعدين [[أهلًا...]]. كده الإيميل هيبدأ بسطر فاضي. أول سطر في النص لازم يبدأ بعد الـ backtick على طول.` }
          ],
          flag: "script",
          deep: {
            why: "بتركّب نصوص طول الوقت: رسايل، و URLs، و SQL في الأمثلة، و HTML صغير، و class names. الـ template literal بيخلي النص يتقري زي ما هيطلع بالظبط.",
            how: R`كل [[$__{ }]] بيتحسب ويتحوّل لـ string (بـ String())، فالـ object هيطلع [["[object Object]"]] والـ array هتطلع عناصرها بفواصل. المسافات والسطور الجديدة جوه الـ backticks بتفضل زي ما هي.

وفيه شكل متقدم اسمه tagged template: [[sql$__btSELECT ... $__{id}$__bt]]، الدالة [[sql]] بتاخد أجزاء النص والقيم لوحدهم، فتقدر تعمل escape للقيم. ده اللي بيستخدمه Prisma في [[$queryRaw]] و styled-components في CSS، و [[String.raw]] (اللي الموقع ده نفسه مكتوب بيه).`,
            when: R`أي نص فيه متغير. للنص الثابت اكتب [[""]] أو [['']] عادي، وخليك على نوع واحد في المشروع (Prettier بيظبطها).`,
            mistakes: R`تحط input من اليوزر في HTML بـ template literal وتعمله [[innerHTML]]: دي XSS (درس الـ DOM). وتركّب SQL بـ template literal عادي بقيم من اليوزر: SQL injection، استخدم parameters (تاب SQL و Prisma). وتحط object في [[$__{ }]] وتستغرب [object Object]: استخدم [[JSON.stringify]].`
          },
          teach: R`## الفكرة

بدل ما تلزق نصوص بـ [[+]]، بتكتب النص بين علامتين backtick (الحرف [[$__bt]]، على الكيبورد فوق Tab على الشمال)، وتحط أي قيمة جواه بين [[$__{ }]]. المثال بيركّب ٣ نصوص كده. اتشغّل كملف في Node 24.

---

## ١. أول سطرين: الداتا

~~~text template.js
const name = "Sara";
const total = 1250.5;
~~~

اسم ورقم، هنركّب منهم الرسايل.

---

## ٢. أول template

~~~text template.js
const msg = $__btأهلًا $__{name}، طلبك بـ $__{total.toFixed(2)} جنيه$__bt;
~~~

- الـ backticks في الأول والآخر بيقولوا «ده template literal».
- [[$__{name}]]: علامة [[$]] وبعدها [[{ }]] معناها «هنا احسب حاجة وحط ناتجها». جواها [[name]] فبتتحط [["Sara"]].
- [[$__{total.toFixed(2)}]]: جوه [[$__{ }]] ينفع **أي expression**، حتى نداء method. [[toFixed(2)]] بتحوّل 1250.5 لـ [["1250.50"]] (رقمين بعد العلامة).

نفس السطر بالطريقة القديمة كان هيبقى:

~~~text template.js
const msgOld = "أهلًا " + name + "، طلبك بـ " + total.toFixed(2) + " جنيه";
~~~

أطول، وسهل تنسى مسافة.

---

## ٣. ternary جوه الـ template

~~~text template.js
const status = $__btالحالة: $__{total > 1000 ? "شحن مجاني" : "شحن 50 جنيه"}$__bt;
~~~

[[شرط ? قيمة1 : قيمة2]] اسمها ternary: لو الشرط true خد اللي بعد [[?]]، وإلا خد اللي بعد [[:]]. هنا [[1250.5 > 1000]] true، فبتتحط [["شحن مجاني"]]. ينفع جوه [[$__{ }]] لأنها expression بترجّع قيمة (عكس [[if]] اللي مينفعش تتحط هنا).

---

## ٤. نص على كذا سطر

~~~text template.js
const html = $__bt
  <li class="item">
    $__{name.toUpperCase()}
  </li>$__bt;
~~~

الـ template literal بيعدّي سطور عادي، والسطور والمسافات **بتفضل جوه النص** زي ما هي. اتأكدنا بـ [[JSON.stringify(html)]] اللي بيوري الحروف المخفية:

~~~text الناتج
"\n  <li class=\"item\">\n    SARA\n  </li>"
~~~

[[\n]] هي السطر الجديد. لاحظ إن النص بيبدأ بسطر جديد لأن الـ backtick الأول في آخر سطر [[const html = $__bt]]. و [[name.toUpperCase()]] بقت [["SARA"]]. المثال مبيطبعش [[html]]، هو موجود عشان تشوف الشكل.

---

## ٥. الطباعة

~~~text template.js
console.log(msg);
console.log(status);
~~~

~~~text الناتج (Node 24)
أهلًا Sara، طلبك بـ 1250.50 جنيه
الحالة: شحن مجاني
~~~

---

## ٦. لو حطيت حاجة مش نص جوه [[$__{ }]]

كل قيمة بتتحوّل string الأول بـ [[String()]]:

~~~text app.js
console.log($__bt$__{{ a: 1 }}$__bt, $__bt$__{[1, 2, 3]}$__bt, $__bt$__{null} $__{undefined}$__bt, $__bt$__{JSON.stringify({ a: 1 })}$__bt);
~~~

~~~text الناتج
[object Object] 1,2,3 null undefined {"a":1}
~~~

- الـ object بيطلع [[[object Object]]]: مش مفيد. لو عايز تشوف محتواه استخدم [[JSON.stringify]].
- الـ array عناصرها بفواصل، وده سبب [[join("")]] في حل التمرين.

---

## ٧. حل الـ try: ليستة منتجات

~~~text products.js
const products = [
  { name: "Mug", price: 120 },
  { name: "Shirt", price: 300 },
  { name: "Cap", price: 90 },
];
const html = $__bt<ul>$__{products.map((p) => $__bt<li>$__{p.name}: $__{p.price} جنيه</li>$__bt).join("")}</ul>$__bt;
console.log(html);
~~~

من جوه لبرة:

1. [[(p) => $__bt<li>$__{p.name}: $__{p.price} جنيه</li>$__bt]]: دالة بتاخد منتج وترجّع [[<li>]] بتاعه. template جوه template عادي.
2. [[products.map(...)]]: طبّق الدالة على كل منتج، فيطلع array فيها ٣ strings.
3. [[.join("")]]: لزّق عناصر الـ array في string واحد من غير فاصل.
4. [[$__bt<ul>$__{...}</ul>$__bt]]: حط الناتج بين [[<ul>]] و [[</ul>]].

~~~text الناتج (Node 24)
<ul><li>Mug: 120 جنيه</li><li>Shirt: 300 جنيه</li><li>Cap: 90 جنيه</li></ul>
~~~

---

## الخلاصة

| الحتة | معناها |
|---|---|
| [[$__bt...$__bt]] | template literal |
| [[$__{expr}]] | احسب الـ expression وحط ناتجه string |
| سطور جوه الـ backticks | بتفضل جوه النص |
| object جوه [[$__{ }]] | بيطلع [[[object Object]]]، استخدم JSON.stringify |
| array جوه [[$__{ }]] | عناصرها بفواصل، استخدم [[join("")]] |

ومتحطش input من يوزر في HTML بـ template وبعدين [[innerHTML]]: ده XSS (درس textContent).`,
          lines: [
            R`اسم العميل، نص عادي بين تنصيص، وهنحطه جوه رسالة.`,
            R`الإجمالي كرقم فيه كسر، وهنعرضه بخانتين عشريتين.`,
            R`الـ template literal بيتكتب بين [[$__bt]] مش تنصيص، وأي حاجة جوه [[$__{ }]] بتتحسب وتتحط في النص. هنا [[total.toFixed(2)]] بتحوّل 1250.5 لـ [["1250.50"]]. أوضح بكتير من [[+]] بين ٤ قطع نص.`,
            R`جوه [[$__{ }]] ينفع أي expression بيرجّع قيمة، زي ternary: الإجمالي فوق 1000 فبيطلع «الحالة: شحن مجاني». أما [[if]] مينفعش جوه، لأنه statement مش بيرجّع قيمة.`,
            R`بداية نص على كذا سطر: الـ [[$__bt]] بتسمح بسطور جديدة جوه النص عادي، عكس [[""]] اللي لازم تكتب فيها [[\n]].`,
            R`السطور والمسافات اللي في أول السطر بتفضل جزء من النص زي ما هي. مفيد لـ HTML صغير، بس خد بالك إن المسافات دي بتتحسب حروف.`,
            R`expression جوه النص المتعدد برضه: [[toUpperCase]] بتحوّل Sara لـ SARA، والناتج بيتحط مكانها.`,
            R`الـ [[$__bt]] اللي بعد قفلة الـ li بتنهي النص، فـ [[html]] بيبدأ بسطر جديد وبيخلص عند قفلة الـ li.`,
            R`بيطبع «أهلًا Sara، طلبك بـ 1250.50 جنيه».`,
            R`بيطبع «الحالة: شحن مجاني» لأن 1250.5 أكبر من 1000.`
          ],
          sol: R`الناتج لازم يبقى string واحد من غير فواصل: [[<ul><li>Mug: 120 جنيه</li><li>Shirt: 300 جنيه</li><li>Cap: 90 جنيه</li></ul>]].

الغلطة الأشهر إنك تنسى [[join("")]]: الـ array جوه [[$__{}]] بتتحوّل لـ string بـ [[toString()]] اللي بتحط فواصل، فيطلعلك [[<li>Mug</li>,<li>Shirt</li>,<li>Cap</li>]] والفواصل دي بتظهر على الصفحة. وخلي بالك إن ده ينفع مع داتا انت كاتبها، لكن لو الأسامي جاية من يوزر وهتحطها في [[innerHTML]] يبقى XSS (درس textContent تحت).`,
          solCode: R`const products = [
  { name: "Mug", price: 120 },
  { name: "Shirt", price: 300 },
  { name: "Cap", price: 90 },
];
const html = $__bt<ul>$__{products.map((p) => $__bt<li>$__{p.name}: $__{p.price} جنيه</li>$__bt).join("")}</ul>$__bt;
console.log(html);`
        },
        {
          cmd: "string methods",
          title: "أشهر دوال الـ strings اللي هتحتاجها",
          ref: [
            { t: "MDN: String", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String" },
            { t: "MDN: String.prototype.trim()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim" },
            { t: "MDN: String.prototype.toLowerCase()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase" },
            { t: "MDN: String.prototype.includes()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes" },
            { t: "MDN: String.prototype.split()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split" },
            { t: "MDN: String.prototype.slice()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice" },
            { t: "MDN: String.prototype.replaceAll()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll" },
            { t: "MDN: String.prototype.padStart()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart" },
            { t: "MDN: String.prototype.at()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/at" }
          ],
          pre: ["js/template literals", { to: "js/primitives و objects", why: R`الـ strings immutable، فكل method بترجّع نص جديد ومبتعدّلش الأصل` }],
          desc: R`الـ strings immutable، فكل method بترجّع string جديد. أهمهم: [[trim]] و [[toLowerCase]] للتنضيف، و [[includes]] و [[startsWith]] للبحث، و [[split]] للتقطيع، و [[slice]] لجزء، و [[replaceAll]] للاستبدال، و [[padStart]] للتنسيق، و [[at(-1)]] لآخر حرف.

وأي method بترجّع string ينفع تكمّل عليها: [[email.trim().toLowerCase()]].`,
          example: R`const email = "  Sara@Example.com ";
const clean = email.trim().toLowerCase();  // "sara@example.com"
clean.includes("@")                         // true
clean.startsWith("sara")                    // true
clean.split("@")                            // ["sara", "example.com"]
clean.slice(0, 4)                           // "sara"
clean.slice(-3)                             // "com"
clean.replaceAll(".", "_")                  // "sara@example_com"
"7".padStart(3, "0")                        // "007"
clean.at(-1)                                // "m"
"a,b,,c".split(",").filter(Boolean)         // ["a", "b", "c"]
[..."مرحبا"].reverse().join("")             // اقلب نص`,
          try: R`اكتب دالة [[slugify(title)]] تحوّل [["  Hello World JS  "]] لـ [["hello-world-js"]] بـ trim و toLowerCase و split و join. وبعدين جرّب [[slugify("كورس جافاسكريبت")]]. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات بتجرّب [[slugify]] كمان على نص فيه مسافتين ورا بعض.`,
          practice: [
            { lvl: 'سريع', t: R`**بيانات حقيقية:** نضّف إيميل جاي من فورم: [[" Sara@Mail.com "]].`, done: R`[[.trim().toLowerCase()]] بترجّع "sara@mail.com".`, sol: R`~~~js clean-email.js
const raw = " Sara@Mail.com ";
const email = raw.trim().toLowerCase();
console.log(JSON.stringify(email), email.length, raw.length);
~~~

~~~text الناتج
"sara@mail.com" 13 15
~~~

**ليه:**

- [[trim()]] شالت المسافة اللي في الأول واللي في الآخر (اليوزر بيلزق الإيميل ومعاه مسافة كتير). الطول نزل من 15 لـ 13.
- [[toLowerCase()]] صغّرت الحروف: الإيميلات في الواقع مبتفرقش بين الكبير والصغير، فلو متصغّرتش، [["Sara@Mail.com"]] و [["sara@mail.com"]] هيتسجلوا كأنهم اتنين يوزرز.
- [[raw.trim().toLowerCase()]]: [[trim]] رجّعت string جديد، فنكمّل عليه بنقطة على طول (chaining).
- [[JSON.stringify]] في الطباعة عشان تشوف العلامات وتتأكد إن مفيش مسافة فاضلة.

**الغلطة الشائعة:** تكتب [[raw.trim();]] لوحدها في سطر وتفتكر إن [[raw]] اتنضفت. الـ strings immutable، والـ method بترجّع نسخة جديدة لازم تحطها في متغير.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اكتب ناتج [["Cairo".slice(-3)]] و [["a-b-c".split("-", 2)]] و [["abc".at(-1)]] و [["Hello".replace("l", "L")]] و [["Hello".replaceAll("l", "L")]] و [["ab".padStart(5, "*")]] قبل ما تشغّل.`, done: R`توقعت وطلع [["iro"]] و [[["a", "b"]]] و [["c"]] و [["HeLlo"]] و [["HeLLo"]] و [["***ab"]]. وعرفت إن replace بتغيّر أول واحدة بس، وإن السالب في slice و at بيعدّ من الآخر.`, sol: R`~~~js predict.js
console.log("Cairo".slice(-3));
console.log("a-b-c".split("-", 2));
console.log("abc".at(-1));
console.log("Hello".replace("l", "L"));
console.log("Hello".replaceAll("l", "L"));
console.log("ab".padStart(5, "*"));
~~~

~~~text الناتج
iro
[ 'a', 'b' ]
c
HeLlo
HeLLo
***ab
~~~

**ليه كل سطر:**

- [["Cairo".slice(-3)]]: السالب بيعدّ من الآخر، فـ -3 يعني «من تالت حرف من الآخر لحد النهاية»: [["iro"]].
- [["a-b-c".split("-", 2)]]: الرقم التاني حد أقصى لعدد القطع، فوقفت بعد اتنين. القطعة [["c"]] اترمت خالص (مش ملزوقة في التانية).
- [["abc".at(-1)]]: [[at]] زي [[[i]]] بس بتقبل سالب، و -1 آخر حرف.
- [[replace]] بتغيّر **أول** [["l"]] بس، و [[replaceAll]] بتغيّرهم كلهم.
- [["ab".padStart(5, "*")]]: كمّلت من الشمال بـ [["*"]] لحد ما الطول بقى 5.

**الغلطة الشائعة:** تفتكر إن [[split("-", 2)]] بترجّع [[["a", "b-c"]]] (الباقي في آخر قطعة) زي لغات تانية. في JS الباقي بيترمي. ولو قلت [["abc"[-1]]] بدل [[at(-1)]] هتاخد [[undefined]]، لأن [[[ ]]] مبتفهمش السالب.` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[maskPhone(phone)]] بـ [[slice]] و [[repeat]].`, done: R`[[maskPhone("01012345678")]] بترجّع "010*****678"، وطولها 11 زي الأصل.`, sol: R`~~~js mask-phone.js
function maskPhone(phone) {
  return phone.slice(0, 3) + "*".repeat(phone.length - 6) + phone.slice(-3);
}
const masked = maskPhone("01012345678");
console.log(masked, masked.length);
console.log(maskPhone("01198765432"));
~~~

~~~text الناتج
010*****678 11
011*****432
~~~

**ليه:**

- [[phone.slice(0, 3)]]: أول ٣ أرقام (من 0 لحد قبل 3)، وهي اللي بتقول الشبكة.
- [[phone.slice(-3)]]: آخر ٣ أرقام، عشان اليوزر يعرف رقمه من غير ما الرقم كله يبان.
- [["*".repeat(phone.length - 6)]]: النص في النص بيبقى نجوم بعدد الأرقام اللي اتشالت (11 - 6 = 5)، فالطول فضل 11 زي الأصل.
- استخدمت [[phone.length - 6]] مش 5 ثابتة، عشان لو الرقم أطول أو أقصر النجوم تتظبط لوحدها.

**الغلطة الشائعة:** رقم أقصر من ٦ حروف: [[phone.length - 6]] بتبقى سالبة، و [[repeat]] بترمي [[RangeError: Invalid count value: -1]] (جرّب [[maskPhone("12345")]]). مشروع «إخفاء البيانات» في آخر الوحدة بيتعامل مع الحالة دي.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** [[capitalizeWords(str)]] بـ [[split(" ")]] و [[map]]. جرّبها على [["hello  world"]] (مسافتين).`, done: R`أول نسخة غالبًا بتوقع بـ [[TypeError: Cannot read properties of undefined (reading 'toUpperCase')]] بسبب الكلمة الفاضية بين المسافتين. بعد التصليح بترجّع "Hello  World" بالمسافتين زي ما هم.`, sol: R`أول نسخة (اللي أغلب الناس بيكتبوها):

~~~js capitalize-broken.js
function capitalizeWords(str) {
  return str.split(" ").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ");
}
console.log(capitalizeWords("hello world"));
console.log(capitalizeWords("hello  world"));
~~~

~~~text الناتج (من غير سطر المسار وسطور الـ stack)
Hello World
  return str.split(" ").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ");
                                              ^

TypeError: Cannot read properties of undefined (reading 'toUpperCase')
~~~

الحل:

~~~js capitalize.js
function capitalizeWords(str) {
  return str
    .split(" ")
    .map((word) => (word === "" ? "" : word[0].toUpperCase() + word.slice(1)))
    .join(" ");
}
console.log(JSON.stringify(capitalizeWords("hello  world")));
console.log(JSON.stringify(capitalizeWords(" js is fun ")));
console.log(JSON.stringify(capitalizeWords("")));
~~~

~~~text الناتج
"Hello  World"
" Js Is Fun "
""
~~~

**ليه وقعت:**

- [["hello  world".split(" ")]] بترجّع [[["hello", "", "world"]]]: بين المسافتين فيه كلمة **فاضية**.
- الكلمة الفاضية [[""[0]]] بـ [[undefined]] (مفيش حرف رقم 0)، و [[undefined.toUpperCase()]] هي الـ TypeError. الرسالة بتقول بالظبط: بتقرا [[toUpperCase]] من undefined.

**ليه الحل شغال:**

- [[word === "" ? "" : ...]]: الكلمة الفاضية بترجع فاضية زي ما هي، فلما [[join(" ")]] يلزق تاني المسافتين بيرجعوا مكانهم. عشان كده [["Hello  World"]] بمسافتين، والمسافة اللي في أول وآخر [[" js is fun "]] فضلت.
- كتبت كل method في سطر لوحده عشان السلسلة تتقري خطوة خطوة.

**الغلطة الشائعة:** تحل المشكلة بـ [[split(/\s+/)]] (زي slugify). كده الوقعة هتروح، بس المسافتين هيبقوا مسافة واحدة، والتمرين طالب يفضلوا زي ما هم. اقرا المطلوب قبل ما تختار الحل.` },
            { lvl: 'تحدي', t: R`**ابني:** [[slugify(title)]] لرابط مقال: بتشيل المسافات من الأطراف، وبتصغّر الحروف، وبتشيل أي رمز مش حرف أو رقم أو مسافة، وبتحط [[-]] مكان المسافات (حتى لو كذا مسافة ورا بعض).`, done: R`[[slugify("  Hello World! JS 2026 ")]] بترجّع [["hello-world-js-2026"]]، ومفيش [[--]] ولا [[-]] في الأول أو الآخر. وتقدر تقول هتعمل إيه مع عنوان عربي (يا تسيبه، يا تحوّله لحروف لاتيني).`, sol: R`~~~js slugify.js
function slugify(title) {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .trim()
    .split(/\s+/)
    .join("-");
}
console.log(slugify("  Hello World! JS 2026 "));
console.log(slugify("What's new in ES2025?"));
console.log(slugify("A -- B"));
console.log(slugify("كورس جافاسكريبت: الجزء ١!"));
console.log(JSON.stringify(slugify("  !!! ")));
~~~

~~~text الناتج
hello-world-js-2026
whats-new-in-es2025
a-b
كورس-جافاسكريبت-الجزء-١
""
~~~

**ليه كل خطوة:**

1. [[trim()]] ثم [[toLowerCase()]]: نشيل مسافات الأطراف ونصغّر.
2. [[replace(/[^\p{L}\p{N}\s]/gu, "")]]: ده regex (نمط بحث)، ودروسه الكاملة في وحدة «regex». هنا معناه: [[[^ ]]] «أي حرف **مش** من دول»، و [[\p{L}]] أي حرف في أي لغة (إنجليزي أو عربي)، و [[\p{N}]] أي رقم، و [[\s]] مسافة. و [[g]] «كلهم مش أول واحد»، و [[u]] لازمة عشان [[\p{...}]] تشتغل. يعني: امسح أي رمز.
3. [[trim()]] تاني: بعد ما الرموز اتمسحت ممكن تفضل مسافة في الطرف (زي [["Hello!"]] جنب مسافة).
4. [[split(/\s+/)]]: [[\s+]] يعني «مسافة واحدة أو أكتر»، فالمسافات الكتير ورا بعض بتبقى فاصل واحد، ومفيش [[--]].
5. [[join("-")]]: نلزق الكلمات بشرطة.

**والعنوان العربي:** القرار هنا إنه يفضل عربي ([[كورس-جافاسكريبت-الجزء-١]])، والمتصفحات الحديثة بتعرضه في شريط العنوان عادي. الاختيار التاني إنك تحوّله حروف لاتيني (transliteration: [[kors-javascript]]) بجدول حروف أو مكتبة، وده بيبقى أقصر لما الرابط يتنسخ (الحروف العربي بتتحوّل [[%D9%83...]]).

**الغلطة الشائعة:** تستخدم [[[^a-z0-9 ]]] بدل [[\p{L}]] وتكمّل بـ [[replaceAll(" ", "-")]]:

~~~js slugify-wrong.js
const slugify = (title) => title.trim().toLowerCase().replace(/[^a-z0-9 ]/g, "").replaceAll(" ", "-");
console.log(slugify("  Hello World! JS 2026 "));
console.log(slugify("A -- B"));
~~~

~~~text الناتج
hello-world-js-2026
a--b
~~~

أول سطر عدّى، بس [["A -- B"]] طلعت [[a--b]] لأن كل مسافة بقت شرطة لوحدها. والعربي كله كان هيتمسح ويطلع رابط فاضي.` }
          ],
          flag: "console",
          deep: {
            why: "تنضيف inputs (إيميل فيه مسافات أو حروف كبيرة)، وتقطيع URLs، وعمل slugs، وتنسيق أرقام الفواتير: كله string methods. ومعرفتها بتوفّر عليك regex في أغلب الحالات.",
            how: R`[[slice(start, end)]] بياخد من start لحد قبل end، والأرقام السالبة بتتعد من الآخر. فيه [[substring]] القديمة بس slice أوضح.

[[replace]] بيغيّر أول مرة بس لو بعتله string، و [[replaceAll]] بيغيّر الكل. ومع regex فيه flag [[g]]: [[s.replace(/\s+/g, "-")]].

[[split("")]] بيقطع على UTF-16 code units، فالإيموجي والحروف المركبة بتتكسر. [[[...str]]] أو [[Array.from(str)]] بيقطع على code points وده أسلم. ولمقارنة نصوص بلغات مختلفة استخدم [[localeCompare]].

و [[length]] بتعد code units برضه: [["😀".length]] بـ 2.`,
            when: "تنضيف أي input قبل ما تحفظه، والبحث البسيط، وتكوين URLs و slugs، وتنسيق العرض.",
            mistakes: R`تفتكر إن [[email.trim()]] غيّرت [[email]]: لأ، رجّعت واحد جديد، لازم تحطه في متغير. و [[replace]] وانت عايز الكل. وتقلب string بـ [[split("").reverse()]] فالإيموجي تبوظ. وفي الانترفيو: «اقلب string» و «اعرف لو palindrome» (تاب DSA).`
          },
          teach: R`## الفكرة

إيميل جاي من يوزر فيه مسافات وحروف كبيرة. المثال بينضّفه، وبعدين يسأل عليه ويقطّعه ويغيّر فيه بأشهر دوال الـ strings. كل method بترجّع string (أو array) **جديد**، والأصل مبيتغيرش. السطور اتشغّلت واحد واحد في Node 24 REPL.

---

## ١. التنضيف: سلسلة methods

~~~text Node REPL
> const email = "  Sara@Example.com ";
undefined
> const clean = email.trim().toLowerCase();
undefined
> clean
'sara@example.com'
~~~

بيتنفّذ من الشمال لليمين:

1. [[email.trim()]]: بيشيل المسافات (والـ tabs والسطور الجديدة) من الأول والآخر، فيرجّع [["Sara@Example.com"]].
2. [[.toLowerCase()]]: بتشتغل على **ناتج** trim، وبتصغّر كل الحروف.

(الـ [[undefined]] بعد سطور [[const]] ده الـ REPL بيقولك «السطر ده ملوش قيمة يرجّعها»، مش غلطة.)

ده اسمه chaining: أي method بترجّع string ينفع تحط بعدها نقطة وتكمّل. و [[email]] نفسه لسه زي ما هو:

~~~text الناتج من JSON.stringify(email) بعد email.trim()
"  Sara@Example.com "
~~~

---

## ٢. أسئلة: فيه؟ بيبدأ بـ؟

~~~text Node REPL
> clean.includes("@")
true
> clean.startsWith("sara")
true
~~~

- [[includes(x)]]: النص فيه x في أي حتة؟
- [[startsWith(x)]]: النص بيبدأ بـ x؟ وأختها [[endsWith]].

---

## ٣. التقطيع: [[split]] و [[slice]]

~~~text Node REPL
> clean.split("@")
[ 'sara', 'example.com' ]
> clean.slice(0, 4)
'sara'
> clean.slice(-3)
'com'
~~~

- [[split("@")]]: قطّع النص عند كل [["@"]] ورجّع الحتت في array. الـ [["@"]] نفسها بتختفي.
- [[slice(0, 4)]]: من index 0 لحد **قبل** index 4. الحروف [[s]](0) [[a]](1) [[r]](2) [[a]](3)، فـ [["sara"]].
- [[slice(-3)]]: الرقم السالب بيتعد من الآخر، ومن غير رقم تاني يعني «لحد الآخر». فآخر ٣ حروف.

---

## ٤. الاستبدال: [[replaceAll]] مش [[replace]]

~~~text Node REPL
> clean.replaceAll(".", "_")
'sara@example_com'
~~~

فيه نقطة واحدة هنا، فالفرق مش باين. على نص فيه أكتر من واحدة:

~~~text app.js
console.log("a.b.c".replace(".", "_"), "a.b.c".replaceAll(".", "_"));
~~~

~~~text الناتج
a_b.c a_b_c
~~~

[[replace]] بنص بتغيّر **أول** مرة بس، و [[replaceAll]] بتغيّر الكل.

---

## ٥. التنسيق: [[padStart]] و [[at]]

~~~text Node REPL
> "7".padStart(3, "0")
'007'
> clean.at(-1)
'm'
~~~

- [[padStart(3, "0")]]: كمّل النص من الشمال بـ [["0"]] لحد ما طوله يبقى 3. لو هو أطول أصلًا مبيعملش حاجة ([["12345".padStart(3, "0")]] فضلت [["12345"]]).
- [[at(-1)]]: الحرف في المكان ده، وبتقبل سالب. أما [["abc"[-1]]] بترجّع [[undefined]] لأن الأقواس المربعة مبتفهمش السالب.

---

## ٦. السطرين الأخيرين: arrays

~~~text Node REPL
> "a,b,,c".split(",").filter(Boolean)
[ 'a', 'b', 'c' ]
~~~

خطوة خطوة:

1. [["a,b,,c".split(",")]] بترجّع [[[ 'a', 'b', '', 'c' ]]]: بين الفاصلتين ورا بعض فيه string فاضي.
2. [[.filter(Boolean)]]: [[filter]] بتسيب العناصر اللي الدالة بترجّعلها truthy، و [[Boolean]] نفسها دالة. والـ [[""]] falsy فاتشال.

~~~text Node REPL
> [..."مرحبا"].reverse().join("")
'ابحرم'
~~~

1. [[[..."مرحبا"]]]: الـ [[...]] (spread) بتفرد النص حرف حرف جوه array: [[[ 'م', 'ر', 'ح', 'ب', 'ا' ]]].
2. [[.reverse()]]: اقلب ترتيب الـ array.
3. [[.join("")]]: لزّقها نص تاني من غير فاصل.

ليه [[...]] مش [[split("")]]؟ عشان الإيموجي:

~~~text app.js
console.log("😀".length, "😀".split(""), [..."😀"]);
~~~

~~~text الناتج
2 [ '\ud83d', '\ude00' ] [ '😀' ]
~~~

JS بيخزّن النص بـ UTF-16، والإيموجي بتاخد خانتين (code units). [[length]] و [[split("")]] بيعدّوا خانات فكسروها نصين، و [[...]] بيمشي على الحروف الحقيقية.

---

## ٧. لو حطيت المثال كله في ملف

المثال معمول عشان يتجرب سطر سطر. لو لزقته في ملف وشغّلته بـ node، هيقع:

~~~text الناتج (Node 24)
[..."مرحبا"].reverse().join("")             // اقلب نص
    ^^^^^^^

SyntaxError: Unexpected string
~~~

السبب إن السطر اللي قبله مفيش في آخره [[;]]، والسطر ده بيبدأ بـ [[[]]، فـ JS لزقهم كأنهم [[...filter(Boolean)[..."مرحبا"]]]. فاكرها: لو سطر بيبدأ بـ [[[]] أو [[(]]، حط [[;]] في آخر اللي قبله.

---

## الخلاصة

| الـ method | بتعمل إيه | بترجّع |
|---|---|---|
| [[trim()]] | تشيل المسافات من الطرفين | string |
| [[toLowerCase()]] | تصغّر الحروف | string |
| [[includes(x)]] / [[startsWith(x)]] | فيه؟ / بيبدأ بـ؟ | boolean |
| [[split(x)]] | تقطّع عند x | array |
| [[slice(a, b)]] | من a لحد قبل b، والسالب من الآخر | string |
| [[replaceAll(a, b)]] | كل a تبقى b | string |
| [[padStart(n, c)]] | كمّل من الشمال لطول n | string |
| [[at(i)]] | الحرف رقم i، وبتقبل سالب | string |

التمرين اللي تحت ([[slugify]]) معمول من الحتت دي: فكّر الأول أنهي method تشيل المسافات من الأطراف، وأنهي تقطّع، وأنهي تلزّق. وجرّب الحالة اللي فيها مسافتين ورا بعض.

> الدرس ده أشهر الـ methods اللي هتحتاجها كل يوم. وبعد وحدة «الأرقام بعمق» فيه وحدة «النصوص بعمق: Unicode والحروف والعربي» بتكمّل من هنا: كل طرق كتابة النص والـ escape sequences، وليه [[length]] بتعدّ بعض الحروف (زي الإيموجي) اتنين، وإزاي تقارن نصوص عربي فيها تشكيل بـ [[normalize]].`,
          lines: [
            R`إيميل زي ما اليوزر كتبه بالظبط: مسافات في الأول والآخر وحروف كبيرة. ده شكل أي input حقيقي جاي من فورم.`,
            R`[[trim]] بتشيل المسافات من الطرفين، و [[toLowerCase]] بتصغّر الحروف، فبيطلع [["sara@example.com"]]. الـ methods دي بترجّع نص جديد والأصل [[email]] متغيرش، لأن الـ strings في JavaScript مبتتعدلش.`,
            R`[[includes]] بترجّع [[true]] لو النص فيه [["@"]] في أي مكان. فحص سريع للشكل، مش validation كامل للإيميل.`,
            R`[[startsWith]] بتفحص البداية بس، وهي حساسة للحروف الكبيرة. عشان كده بنفحص [[clean]] بعد التنضيف: على [[email]] الأصلي كانت هترجّع false بسبب المسافات و S الكبيرة.`,
            R`[[split]] بتقطّع النص عند كل [["@"]] وترجّع array من القطع، فبيطلع اسم اليوزر والدومين كل واحد لوحده. والـ [["@"]] نفسها مبتظهرش في الناتج.`,
            R`[[slice(0, 4)]] بتاخد من index 0 لحد قبل index 4، يعني أول ٤ حروف. النهاية مش داخلة، فعدد الحروف = النهاية ناقص البداية.`,
            R`الرقم السالب في [[slice]] بيتعد من الآخر، فـ [[slice(-3)]] آخر ٣ حروف من غير ما تحسب طول النص.`,
            R`[[replaceAll]] بتستبدل كل النقط بـ [[_]]. أما [[replace]] بنص فكانت هتغيّر أول نقطة بس، وده غلط شائع.`,
            R`[[padStart(3, "0")]] بتكمّل من الشمال بأصفار لحد ما الطول يبقى ٣، فبيطلع [["007"]]. مفيدة لأرقام الفواتير والساعات. ولو النص أطول من ٣ أصلًا بيرجع زي ما هو.`,
            R`[[at(-1)]] بترجّع آخر حرف. أما الأقواس المربعة برقم سالب فبترجّع [[undefined]] لأنها بتدوّر على مفتاح اسمه "-1"، فـ [[at]] هي الطريقة المباشرة لآخر عنصر.`,
            R`[[split(",")]] على [["a,b,,c"]] بيدّي قطعة فاضية بين الفاصلتين. و [[filter(Boolean)]] بتشيل أي قيمة falsy، والنص الفاضي falsy، فبيفضل a و b و c بس.`,
            R`[[...]] بيقطّع النص على الحروف الحقيقية، أما [[split("")]] فبيقطّع على وحدات UTF-16 وبيكسر الإيموجي. [[reverse]] بتقلب الـ array و [[join("")]] بتلزقها نص تاني.`
          ],
          sol: R`[[slugify("  Hello World JS  ")]] بترجّع [["hello-world-js"]]، و [[slugify("كورس جافاسكريبت")]] بترجّع [["كورس-جافاسكريبت"]]: toLowerCase مبتعملش حاجة للعربي، والمسافة بقت شرطة.

لو عملت [[split(" ")]] والنص فيه مسافتين ورا بعض ([["Hello  World"]]) هيطلعلك [["hello--world"]] بشرطتين، لأن split عملت عنصر فاضي بين المسافتين. الحل [[split(/\s+/)]] (أي عدد مسافات) أو [[split(" ").filter(Boolean)]]. ولو نسيت [[trim]] الأول هيطلع شرطة في الأول والآخر.`,
          solCode: R`const slugify = (title) => title.trim().toLowerCase().split(/\s+/).join("-");
console.log(slugify("  Hello World JS  ")); // "hello-world-js"
console.log(slugify("كورس جافاسكريبت"));    // "كورس-جافاسكريبت"
console.log(slugify("Hello  World"));       // "hello-world"`,
          check: {
            lang: "js",
            starter: R`function slugify(title) {
  return title.toLowerCase();
}`,
            tests: R`test("'  Hello World JS  ' ← 'hello-world-js'", () => expect(slugify("  Hello World JS  ")).toBe("hello-world-js"));
test("عربي: 'كورس جافاسكريبت' ← 'كورس-جافاسكريبت'", () => expect(slugify("كورس جافاسكريبت")).toBe("كورس-جافاسكريبت"));
test("مسافتين ورا بعض ← شرطة واحدة: 'Hello  World' ← 'hello-world'", () => expect(slugify("Hello  World")).toBe("hello-world"));
test("من غير trim هتطلع شرطة في الأول والآخر", () => expect(slugify(" JS ")).toBe("js"));`,
            solution: R`const slugify = (title) => title.trim().toLowerCase().split(/\s+/).join("-");`
          }
        }
      ]
    }
]);
