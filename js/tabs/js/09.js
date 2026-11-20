// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: R`المصفوفات و Map و Set كاملين`,
      l: 2,
      time: R`حوالي ٧ ساعات`,
      n: R`كل method في الـ Array (أكتر من ٣٠) متقسمة حسب شغلها: مين بيعدّل الأصل ومين بيرجّع نسخة، ومين بيتخطى الفراغات. وبعدين Map و Set لآخرهم: الترتيب، و [[Map.groupBy]]، و [[getOrInsert]]، وجبر المجموعات كله، و WeakMap و WeakSet وإمتى الذاكرة بتفرق`,
      pre: [
        { to: "js/array literals و index و length", why: R`الـ index و [[length]] و [[push]] و [[pop]] هنبني عليهم من غير ما نشرحهم تاني` },
        { to: "js/map و filter و reduce", why: R`الـ callback بـ (العنصر، الـ index، الـ array) هو نفس شكل كل الـ methods اللي هنا` },
        { to: "js/Map و Set", why: R`الـ basics هناك ([[set]] و [[get]] و [[add]] و [[union]])، وهنا الباقي كله والفخاخ` },
        { to: "js/for...of و for...in", why: R`[[keys]] و [[values]] و [[entries]] بيرجّعوا iterators بتتلف بـ [[for...of]]` },
        { to: "js/reference و copy", why: R`«نسخة ولا نفس الـ array؟» هو سؤال نص الوحدة` },
      ],
      goal: [
        R`تعرف لأي method في الـ Array: بتعدّل الأصل ولا بترجّع نسخة، وتختار النسخة ([[toSpliced]] و [[toReversed]] و [[with]]) لما الأصل لازم ميتغيّرش (React، الـ state، الدوال اللي بتستقبل array).`,
        R`تعمل array بطول معين صح ([[Array.from]] مش [[Array(3).fill([])]])، وتفرد وتجمع بـ [[flat]] و [[flatMap]] و [[reduceRight]]، وتدوّر من الآخر بـ [[lastIndexOf]] و [[findLastIndex]].`,
        R`تستخدم Map كـ dictionary بجد: الترتيب، والمفاتيح الـ objects، و [[Map.groupBy]]، و [[getOrInsertComputed]] (ولما مش موجودة تكتب بديلها)، وتحوّلها لـ object و JSON ورجوع.`,
        R`تحل أي مسألة «مين في الاتنين / مين ناقص / مين اتغيّر» بجبر المجموعات في Set، وتستخدم WeakMap و WeakSet لداتا مربوطة بـ object من غير memory leak.`,
      ],
      use: {
        prog: R`كل قايمة في أي تطبيق بتعدي على الـ methods دي: سلة، وتاجات، وصلاحيات، وطابور، وترتيب. والفرق بين [[sort]] و [[toSorted]] هو الفرق بين component بيتحدّث صح وواحد مبيتحدّثش.`,
        work: R`عدّ وتجميع حسب مفتاح ([[Map.groupBy]])، ومقارنة لستتين (مين اشترك ومين لغى) بـ Set، و caches بحد أقصى ومدة صلاحية، وتنضيف داتا جاية من API (array-likes، و holes، وتكرار).`,
        cs: R`Array و Hash Map و Hash Set هما أهم ٣ data structures في أي لغة. هنا هتعرف التكلفة (O(1) ولا O(n)) بأرقام متقاسة، وجبر المجموعات (union و intersection) من الرياضة المتقطعة، والـ garbage collection والـ weak references.`,
      },
      projects: [
        { lvl: 'صغير', t: R`مقالات شبه بعض بالتاجات`, what: R`سكربت [[similar.js]] فيه لستة مقالات وكل مقال ليه تاجات. [[node similar.js 1]] بيطبع أقرب ٣ مقالات للمقال رقم 1 بنسبة تشابه ([[intersection]] على [[union]]، اسمها Jaccard)، والتاجات المشتركة، والتاجات اللي عندهم ومش عندك كاقتراح ([[difference]]). مقال ملوش ولا تاج مشترك بيطبع رسالة، ورقم مقال مش موجود بيطبع خطأ و exit code 1. من دروس «Set: كل الـ methods وجبر المجموعات» و «Array: at و slice و concat».`, done: R`[[node similar.js 1]] بيطلّع «Grid ولا Flexbox؟» الأول بـ 75٪ واقتراح [[grid]]، و [[node similar.js 3]] بيقول مفيش، و [[node similar.js 9]] بيقول «مفيش مقال رقمه 9» والـ exit code بـ 1.`, sol: R`**هتشوف إيه:** لكل مقال، المقالات اللي شبهه مترتبة بالنسبة، وجنب كل واحد إيه المشترك وإيه اللي ممكن تزوّده لمقالك:

~~~text الناتج: node similar.js ثم 3 ثم 9 (Node 24.22)
مقالات شبه «Flexbox من الصفر»:
   75% Grid ولا Flexbox؟ | مشترك: css، layout، flexbox | ممكن تزوّد: grid
   25% متغيرات CSS | مشترك: css | ممكن تزوّد: variables
   20% Responsive بالـ Grid | مشترك: css | ممكن تزوّد: grid، responsive

مقالات شبه «Closures في JavaScript»:
  مفيش مقال فيه ولا تاج مشترك

مفيش مقال رقمه 9
~~~

## الكود

~~~js similar.js
// similar.js: مقالات شبه بعض حسب التاجات، والتاجات اللي ممكن تتقترح
const posts = [
  { id: 1, title: "Flexbox من الصفر", tags: ["css", "layout", "flexbox"] },
  { id: 2, title: "Grid ولا Flexbox؟", tags: ["css", "layout", "grid", "flexbox"] },
  { id: 3, title: "Closures في JavaScript", tags: ["js", "functions", "scope"] },
  { id: 4, title: "Responsive بالـ Grid", tags: ["css", "grid", "responsive"] },
  { id: 5, title: "متغيرات CSS", tags: ["css", "variables"] },
];

function similarity(a, b) {
  const union = a.union(b);
  return union.size === 0 ? 0 : a.intersection(b).size / union.size;
}

function similarTo(id, all, limit = 3) {
  const target = all.find(p => p.id === id);
  if (!target) throw new Error("مفيش مقال رقمه " + id);
  const mine = new Set(target.tags);
  return all
    .filter(p => p.id !== id)
    .map(p => {
      const theirs = new Set(p.tags);
      return {
        title: p.title,
        score: similarity(mine, theirs),
        common: [...mine.intersection(theirs)],
        suggest: [...theirs.difference(mine)],
      };
    })
    .filter(r => r.score > 0)
    .toSorted((x, y) => y.score - x.score)
    .slice(0, limit);
}

const id = Number(process.argv[2] ?? 1);
try {
  const target = posts.find(p => p.id === id);
  if (target) console.log("مقالات شبه «" + target.title + "»:");
  const results = similarTo(id, posts);
  if (results.length === 0) console.log("  مفيش مقال فيه ولا تاج مشترك");
  for (const r of results) {
    const pct = Math.round(r.score * 100) + "%";
    console.log("  " + pct.padStart(4), r.title, "| مشترك:", r.common.join("، "), "| ممكن تزوّد:", r.suggest.join("، ") || "-");
  }
} catch (e) {
  console.error(e.message);
  process.exitCode = 1;
}
~~~

## كل حتة بتعمل إيه

| الحتة | بتعمل إيه | ليه كده |
|---|---|---|
| [[similarity(a, b)]] | حجم المشترك على حجم الكل | Jaccard: 3 مشتركين من 4 تاجات مختلفة = 75٪. القسمة على [[union]] مش على تاجات مقالي بس، عشان مقال فيه ٢٠ تاج ميطلعش «شبه» كل حاجة |
| [[union.size === 0 ? 0]] | مقالين من غير تاجات | من غيرها [[0 / 0]] = [[NaN]]، و [[NaN]] بيبوّظ الترتيب |
| [[new Set(target.tags)]] مرة واحدة | تاجات المقال المطلوب | بتتعمل برّه الـ loop، مش مع كل مقال |
| [[theirs.difference(mine)]] | عندهم ومش عندي | ده الاقتراح: لو مقالك عن flexbox والمقال الشبهه فيه [[grid]]، يمكن تزوّده |
| [[toSorted]] ثم [[slice(0, limit)]] | أعلى ٣ | [[toSorted]] عشان منلعبش في ترتيب array جاية من برّه (درس «Array: splice و toSpliced و toReversed و with») |
| [[process.exitCode = 1]] | الخطأ بيرجّع كود 1 | أي سكربت تاني (أو CI) يعرف إن فيه مشكلة من غير ما يقرا الكلام |

## الغلطات اللي حصلت وأنا ببنيه

1. أول نسخة كانت بتطبع العنوان وبعده **ولا حاجة** للمقال رقم 3 (مفيش تشابه)، والقارئ مش هيعرف إذا كان السكربت وقع ولا مفيش نتايج. اتصلحت بسطر [[if (results.length === 0)]].
2. نفس النسخة كانت بتطبع «مقالات شبه «9»:» قبل رسالة الخطأ. العنوان بقى يتطبع بس لو المقال موجود.

**ليه Set مش arrays؟** [[a.filter(t => b.includes(t))]] كانت هتشتغل، بس [[intersection]] و [[union]] و [[difference]] بيقولوا المعنى بالاسم، ومع لستات كبيرة الفرق بيبقى مئات المرات (اتقاس في تمرين «قارن وقيس» في درس Set).` },
        { lvl: 'صغير', t: R`خريطة كراسي السينما`, what: R`[[seats.js]]: قاعة ٥ صفوف (A لـ E) × ٨ كراسي. [[emptyHall()]] بتعمل الخريطة، و [[book(hall, ["C4", "C5"])]] بترجّع **خريطة جديدة** فيها الحجز ولستة أخطاء (كرسي محجوز، أو اسم مش موجود زي F2 أو A9)، والخريطة القديمة متتغيّرش. و [[draw(hall)]] بترسمها في الترمنال مع عدد الفاضي. من دروس «Array: fill و copyWithin و Array.of» و «Array: splice و toSpliced و toReversed و with» و «Array: flat و flatMap و reduceRight».`, done: R`بعد حجزين، C4 و C5 و C6 و E1 محجوزين بس (مش العمود كله)، والأخطاء ٣ بأسبابها، و «القاعة الأولانية لسه فاضية؟ true».`, sol: R`**هتشوف إيه:** خريطة القاعة بعد حجزين، والكراسي المحجوزة [[■]]، والأخطاء بأسبابها، وتأكيد إن أول خريطة متلمستش:

~~~text الناتج: node seats.js
   1 2 3 4 5 6 7 8
A  · · · · · · · ·
B  · · · · · · · ·
C  · · · ■ ■ ■ · ·
D  · · · · · · · ·
E  ■ · · · · · · ·
فاضي 36 من 40
أخطاء: [ 'C5: محجوز', 'F2: مفيش كرسي بالاسم ده', 'A9: مفيش كرسي بالاسم ده' ]
القاعة الأولانية لسه فاضية؟ true | C5 في الحجز الأول: ■
~~~

## الكود

~~~js seats.js
// seats.js: خريطة كراسي سينما، وكل حجز بيرجّع خريطة جديدة والقديمة زي ما هي
const ROWS = "ABCDE";
const COLS = 8;
const FREE = "·", TAKEN = "■";

function emptyHall() {
  return Array.from({ length: ROWS.length }, () => Array(COLS).fill(FREE));
}

function parseSeat(code) {
  const row = ROWS.indexOf(code.at(0)?.toUpperCase());
  const col = Number(code.slice(1)) - 1;
  if (row === -1 || !Number.isInteger(col) || col < 0 || col >= COLS) return null;
  return { row, col };
}

function book(hall, codes) {
  const errors = [];
  let next = hall;
  for (const code of codes) {
    const seat = parseSeat(code);
    if (!seat) { errors.push(code + ": مفيش كرسي بالاسم ده"); continue; }
    if (next[seat.row][seat.col] === TAKEN) { errors.push(code + ": محجوز"); continue; }
    next = next.with(seat.row, next[seat.row].with(seat.col, TAKEN));
  }
  return { hall: next, errors };
}

function draw(hall) {
  const head = "   " + Array.from({ length: COLS }, (_, i) => String(i + 1)).join(" ");
  const rows = hall.map((row, i) => ROWS[i] + "  " + row.join(" "));
  const free = hall.flat().filter(s => s === FREE).length;
  return [head, ...rows, "فاضي " + free + " من " + COLS * ROWS.length].join("\n");
}

const start = emptyHall();
const first = book(start, ["C4", "C5", "c6"]);
const second = book(first.hall, ["C5", "F2", "A9", "E1"]);
console.log(draw(second.hall));
console.log("أخطاء:", second.errors);
console.log("القاعة الأولانية لسه فاضية؟", start.flat().every(s => s === FREE), "| C5 في الحجز الأول:", first.hall[2][4]);
~~~

## كل حتة بتعمل إيه

- **[[Array.from({ length: ROWS.length }, () => Array(COLS).fill(FREE))]]**: الدالة اللي جوه بتتنادى **مرة لكل صف**، فكل صف array لوحده. و [[fill(FREE)]] جوه الصف آمنة لأن [[FREE]] نص (primitive) مش object.
- **[[parseSeat]]**: [[code.at(0)?.toUpperCase()]] أول حرف (و [[?.]] عشان النص الفاضي)، و [[ROWS.indexOf]] بيحوّله لرقم صف أو [[-1]]. و [[c6]] الصغيرة بتشتغل. أي حاجة برّه القاعة بترجّع [[null]].
- **[[next.with(seat.row, next[seat.row].with(seat.col, TAKEN))]]**: من جوه لبرة: صف جديد فيه الكرسي ده بس متغيّر، وبعدين قاعة جديدة فيها الصف الجديد ده بس متغيّر. الصفوف التانية **نفس الـ arrays** (مش نسخ)، وده كفاية لأن محدش بيعدّل فيها.
- **[[hall.flat().filter(...)]]**: [[flat]] بتحوّل الـ ٥ صفوف لـ array واحدة ٤٠ كرسي عشان نعدّ.
- **[[["C5", "F2", ...]]] بعد حجز C5**: [[book]] بتكمّل في باقي الكراسي حتى لو واحد غلط، وبترجّع الأخطاء كلها مرة واحدة بدل ما توقف عند أول واحد.

## الغلطات اللي حصلت وأنا ببنيه

أول نسخة كانت [[Array(ROWS.length).fill(Array(COLS).fill(FREE))]] والحجز بـ [[next[seat.row][seat.col] = TAKEN]]. ده ناتجها الحقيقي:

~~~text الناتج: النسخة الأولى
   1 2 3 4 5 6 7 8
A  ■ · · ■ ■ ■ · ·
B  ■ · · ■ ■ ■ · ·
C  ■ · · ■ ■ ■ · ·
D  ■ · · ■ ■ ■ · ·
E  ■ · · ■ ■ ■ · ·
فاضي 20 من 40
أخطاء: [ 'C5: محجوز', 'F2: مفيش كرسي بالاسم ده', 'A9: مفيش كرسي بالاسم ده' ]
القاعة الأولانية لسه فاضية؟ false | C5 في الحجز الأول: ■
~~~

غلطتين في بعض: (١) [[fill]] حطت **نفس الصف** في الخمس أماكن، فحجز C4 ظهر في كل الصفوف (فخ «fill والـ object المشترك» من الدرس). (٢) التعديل المباشر غيّر القاعة الأولانية كمان، فـ «لسه فاضية؟» بقت [[false]]. التصليح: [[Array.from]] بدالة، و [[with]] بدل الكتابة بالـ index.` },
        { lvl: 'متوسط', t: R`لوحة الصدارة بالتعادل والتراجع`, what: R`[[leaderboard.js]] فيه [[createBoard()]] بترجّع [[add(name, points)]] و [[undo()]] و [[ranking()]] و [[size]]. النقط بتتجمع لكل لاعب في Map ([[{ total, games }]]) بـ [[getOrInsertComputed]] (ولو مش موجودة في Node: بديل بـ [[has]] و [[set]])، وكل عملية بتتسجّل في array تاريخ عشان [[undo]] بـ [[pop]]. الترتيب بالنقط وبعدين بالاسم، واللي نقطهم زي بعض ليهم **نفس المركز** (1، 2، 3، 3، 5). والأرقام بتتعرض بالعربي بـ [[Intl.NumberFormat("ar-EG")]]، والاسم الفاضي أو النقط الكسر بيترفضوا. من دروس «Map: كل الـ methods و getOrInsert» و «Array: splice و toSpliced و toReversed و with» و «array literals و index و length».`, done: R`سارة وكريم الاتنين في المركز 3 بـ ١٬١٠٠ واللي بعدهم في المركز 5 مش 4، و [[undo]] شال كريم من اللوحة خالص (لأن ده كان ماتشه الوحيد)، والعدد بقى 4، والإدخالين الغلط اترفضوا برسالة.`, sol: R`**هتشوف إيه:** اللوحة بعد ٧ نتايج، وبعدين تراجع عن آخر نتيجة وأول ٣، وبعدين محاولتين غلط اترفضوا:

~~~text الناتج: node leaderboard.js (Node 24.22)
 1. منى     ١٬٥٠٠ نقطة في 1 ماتش
 2. عمر     ١٬٢٠٠ نقطة في 2 ماتش
 3. سارة    ١٬١٠٠ نقطة في 2 ماتش
 3. كريم    ١٬١٠٠ نقطة في 1 ماتش
 5. ياسين     ٧٠٠ نقطة في 1 ماتش
تراجع عن: { name: 'كريم', points: 1100 }
 1. منى     ١٬٥٠٠ نقطة في 1 ماتش
 2. عمر     ١٬٢٠٠ نقطة في 2 ماتش
 3. سارة    ١٬١٠٠ نقطة في 2 ماتش
مرفوض: اسم اللاعب فاضي
مرفوض: النقط لازم رقم صحيح: 2.5
عدد اللاعيبة: 4
~~~

## الكود

~~~js leaderboard.js
// leaderboard.js: نقط مسابقة: مجموع لكل لاعب، وترتيب بالتعادل، وتراجع عن آخر عملية
function getOrInsertComputed(map, key, make) {
  if (typeof map.getOrInsertComputed === "function") return map.getOrInsertComputed(key, make);
  if (!map.has(key)) map.set(key, make(key));
  return map.get(key);
}

function createBoard() {
  const players = new Map();
  const history = [];

  function add(name, points) {
    if (typeof name !== "string" || name.trim() === "") throw new TypeError("اسم اللاعب فاضي");
    if (!Number.isInteger(points)) throw new TypeError("النقط لازم رقم صحيح: " + points);
    const p = getOrInsertComputed(players, name.trim(), () => ({ total: 0, games: 0 }));
    p.total += points;
    p.games += 1;
    history.push({ name: name.trim(), points });
  }

  function undo() {
    const last = history.pop();
    if (!last) return null;
    const p = players.get(last.name);
    p.total -= last.points;
    p.games -= 1;
    if (p.games === 0) players.delete(last.name);
    return last;
  }

  function ranking() {
    const sorted = [...players]
      .map(([name, p]) => ({ name, ...p }))
      .toSorted((a, b) => b.total - a.total || a.name.localeCompare(b.name, "ar"));
    let rank = 0;
    return sorted.map((row, i) => {
      if (i === 0 || row.total !== sorted[i - 1].total) rank = i + 1;
      return { rank, ...row };
    });
  }

  return { add, undo, ranking, get size() { return players.size; } };
}

function print(rows, top = 5) {
  const fmt = new Intl.NumberFormat("ar-EG");
  for (const r of rows.slice(0, top)) {
    console.log(String(r.rank).padStart(2) + ".", r.name.padEnd(6), fmt.format(r.total).padStart(6), "نقطة في", r.games, "ماتش");
  }
}

const board = createBoard();
const events = [["سارة", 1200], ["عمر", 900], ["منى", 1500], ["عمر", 300], ["ياسين", 700], ["سارة", -100], ["كريم", 1100]];
for (const [name, pts] of events) board.add(name, pts);
print(board.ranking());
console.log("تراجع عن:", board.undo());
print(board.ranking(), 3);
for (const bad of [["", 10], ["سارة", 2.5]]) {
  try { board.add(...bad); } catch (e) { console.log("مرفوض:", e.message); }
}
console.log("عدد اللاعيبة:", board.size);
~~~

## كل حتة بتعمل إيه

| الحتة | بتعمل إيه | ليه كده |
|---|---|---|
| [[getOrInsertComputed(map, key, make)]] | لو الـ method موجودة (Chrome 157) بنستخدمها، وإلا [[has]] ثم [[set]] | Node 24.22 لسه معندوش [[Map.prototype.getOrInsertComputed]] ([[TypeError: ... is not a function]])، فالبديل بيخلي نفس الكود يشتغل في الاتنين |
| [[() => ({ total: 0, games: 0 })]] | object جديد لكل لاعب جديد بس | لو كتبنا [[getOrInsert(name, { total: 0 })]] الـ object كان هيتعمل مع كل نداء حتى للاعب الموجود |
| [[history.push]] و [[history.pop]] | stack التراجع | آخر عملية هي أول واحدة تتلغي، زي Ctrl+Z |
| [[if (p.games === 0) players.delete(...)]] | اللاعب اللي اتلغى ماتشه الوحيد يختفي | من غيرها كريم كان هيفضل في اللوحة بـ 0 نقطة و 0 ماتش |
| [[[...players].map(...)]] | Map لـ array صفوف | الـ Map مالهاش [[sort]]، فبنحوّلها array الأول |
| فرق النقط وبعده [[localeCompare]] | ترتيب بمفتاحين | لو فرق النقط 0 (falsy) الـ OR بيروح للمقارنة التانية بالاسم، و [[localeCompare(..., "ar")]] بترتّب العربي صح فسارة قبل كريم |
| [[rank = i + 1]] بس لما النقط تتغيّر | ترتيب «1، 2، 3، 3، 5» | ده الترتيب الرياضي المعتاد (competition ranking): اتنين في المركز 3 يعني مفيش مركز 4 |
| [[get size()]] | [[board.size]] من غير قوسين | زي [[size]] بتاعة Map بالظبط |

## الغلطات اللي حصلت وأنا ببنيه

1. [[undo]] الأولى كانت بتطرح النقط بس، فبعد التراجع كريم فضل في الترتيب بـ «0 نقطة في 0 ماتش» في آخر اللوحة. التصليح: عدّاد [[games]] لكل لاعب، ولما يوصل 0 اللاعب يتشال بـ [[players.delete]].
2. [[padEnd(6)]] على الأسماء العربي مظبوطة هنا لأن كل الحروف عرضها واحد في الترمنال، بس لو اسم فيه تشكيل الأعمدة هتتزحزح (درس «padEnd و trimEnd» بيشرح ليه).` },
        { lvl: 'متوسط', t: R`رصيد المخزن من سجل الحركات`, what: R`[[inventory.js]]: أصناف في Map ([[sku]] ← اسم وحد أدنى)، وتلات مصادر حركات: توريد، وطلبات كل طلب فيه كذا سطر، وجرد بيصلّح الرقم. [[movements()]] بتجمعهم في array واحدة ([[flatMap]] بتفرد سطور الطلبات)، و [[buildStock]] بتمشي عليهم بالترتيب وترفض صنف مش معروف أو طلب أكبر من الموجود، و Set بالأصناف اللي تحت الحد، و [[Map.groupBy]] بعدد الحركات لكل صنف. من دروس «Array: flat و flatMap و reduceRight» و «Map: كل الـ methods و getOrInsert» و «Set: كل الـ methods وجبر المجموعات».`, done: R`الرصيد [[كوباية 8]] و [[طبق 3]] و [[معلقة 22]]، و ٢ مرفوضين بسببهم (صنف P-09 مش معروف، وطلب 504 عايز 6 أطباق والموجود 3)، والرصيد عمره ما بيبقى سالب، و «لازم يتطلب: كوباية، طبق».`, sol: R`**هتشوف إيه:** سطر لكل صنف برصيده وحالته وعدد حركاته، وبعدين الحركات المرفوضة بسببها، وفي الآخر اللي لازم يتطلب:

~~~text الناتج: node inventory.js
P-01 كوباية   8 ⚠ أقل من 10 | حركات: 3
P-02 طبق      3 ⚠ أقل من 5 | حركات: 3
P-03 معلقة   22 تمام | حركات: 3
مرفوض: [ 'طلب 503: صنف مش معروف P-09', 'طلب 504: طبق مطلوب 6 والموجود 3' ]
لازم يتطلب: كوباية، طبق
~~~

## الكود

~~~js inventory.js
// inventory.js: رصيد مخزن من سجل حركات: توريد وطلبات وجرد، وتنبيه بالناقص
const products = new Map([
  ["P-01", { name: "كوباية", min: 10 }],
  ["P-02", { name: "طبق", min: 5 }],
  ["P-03", { name: "معلقة", min: 20 }],
]);

const supplies = [
  { sku: "P-01", qty: 30 },
  { sku: "P-02", qty: 8 },
  { sku: "P-03", qty: 25 },
];
const orders = [
  { id: 501, lines: [{ sku: "P-01", qty: 4 }, { sku: "P-03", qty: 6 }] },
  { id: 502, lines: [{ sku: "P-02", qty: 5 }] },
  { id: 503, lines: [{ sku: "P-01", qty: 18 }, { sku: "P-09", qty: 1 }] },
  { id: 504, lines: [{ sku: "P-02", qty: 6 }] },
];
const counts = [{ sku: "P-03", qty: 22 }];

function movements() {
  return [
    ...supplies.map(s => ({ ...s, type: "توريد" })),
    ...orders.flatMap(o => o.lines.map(l => ({ ...l, qty: -l.qty, type: "طلب " + o.id }))),
    ...counts.map(c => ({ ...c, type: "جرد", set: true })),
  ];
}

function buildStock(moves) {
  const stock = new Map([...products.keys()].map(sku => [sku, 0]));
  const rejected = [];
  for (const m of moves) {
    if (!stock.has(m.sku)) { rejected.push(m.type + ": صنف مش معروف " + m.sku); continue; }
    const now = stock.get(m.sku);
    if (m.set) { stock.set(m.sku, m.qty); continue; }
    if (now + m.qty < 0) { rejected.push(m.type + ": " + products.get(m.sku).name + " مطلوب " + -m.qty + " والموجود " + now); continue; }
    stock.set(m.sku, now + m.qty);
  }
  return { stock, rejected };
}

const moves = movements();
const { stock, rejected } = buildStock(moves);
const low = new Set([...stock].filter(([sku, qty]) => qty < products.get(sku).min).map(([sku]) => sku));
const bySku = Map.groupBy(moves, m => m.sku);

for (const [sku, qty] of stock) {
  const p = products.get(sku);
  console.log(sku, p.name.padEnd(6), String(qty).padStart(3), low.has(sku) ? "⚠ أقل من " + p.min : "تمام", "| حركات:", bySku.get(sku)?.length ?? 0);
}
console.log("مرفوض:", rejected);
console.log("لازم يتطلب:", [...low].map(sku => products.get(sku).name).join("، ") || "ولا حاجة");
~~~

## كل حتة بتعمل إيه

- **[[orders.flatMap(o => o.lines.map(...))]]**: كل طلب بيطلّع **كذا** حركة (سطر لكل صنف)، و [[flatMap]] بتفردهم في نفس اللستة. لو استخدمنا [[map]] كانت هتطلع array جوه array. و [[qty: -l.qty]] عشان الطلب بيطرح.
- **[[...supplies.map(...), ...orders.flatMap(...), ...counts.map(...)]]**: الترتيب هنا هو ترتيب الحدوث: التوريد الأول، وبعدين الطلبات، وبعدين الجرد. في نظام حقيقي كل حركة ليها وقت وبترتّبها بـ [[toSorted]] على الوقت.
- **[[new Map([...products.keys()].map(sku => [sku, 0]))]]**: رصيد صفر لكل صنف معروف، فـ [[stock.has(m.sku)]] بيبقى هو فحص «الصنف معروف؟».
- **[[if (m.set)]]**: الجرد مش بيزوّد ولا بيطرح، ده **بيحط** الرقم اللي اتعدّ فعلًا.
- **[[now + m.qty < 0]]**: الطلب اللي هيخلي الرصيد سالب بيترفض ويتسجّل سببه بالأرقام.
- **[[new Set([...stock].filter(...).map(([sku]) => sku))]]**: الأصناف اللي تحت الحد. Set عشان السؤال بعد كده [[low.has(sku)]] لكل سطر.
- **[[Map.groupBy(moves, m => m.sku)]] و [[bySku.get(sku)?.length ?? 0]]**: كل حركات الصنف في array. و [[?.]] و [[?? 0]] لصنف ملوش حركات خالص (هنا كلهم ليهم، بس صنف جديد في الكتالوج مش هيبقى ليه).

## الغلطات اللي حصلت وأنا ببنيه

أول نسخة مكنش فيها سطر [[if (now + m.qty < 0)]]، وده ناتجها:

~~~text الناتج: من غير فحص السالب
P-01 كوباية   8 ⚠ أقل من 10 | حركات: 3
P-02 طبق     -3 ⚠ أقل من 5 | حركات: 3
P-03 معلقة   22 تمام | حركات: 3
مرفوض: [ 'طلب 503: صنف مش معروف P-09' ]
لازم يتطلب: كوباية، طبق
~~~

رصيد [[-3]] أطباق مستحيل، ومعناه إن طلب 504 اتقبل وهو مش هيتسلّم. الفحص بقى قبل أي تعديل في الرصيد، والطلب بيروح للمرفوض بسببه.

**ليه مش [[reduce]]؟** الرصيد ممكن يتحسب بـ [[reduce]] في سطر، بس إحنا محتاجين نرفض حركات ونسجّل أسباب وإحنا ماشيين، و [[for...of]] أوضح هنا. القاعدة من درس «map و filter و reduce»: لو [[reduce]] بقت معقدة، loop عادي.` },
        { lvl: 'كبير', t: R`cache.js: كاش LRU بمدة صلاحية و memo بـ WeakMap، ومعاه اختبارات`, what: R`مكتبة صغيرة تنفع أي مشروع Node أو متصفح:
• [[new LruCache({ max, ttlMs, now })]]: [[get]] و [[set]] (بترجّع الكاش نفسه للـ chaining) و [[has]] و [[delete]] و [[clear]] و [[size]] و [[keys()]] و [[for...of]] عليه ([[[Symbol.iterator]]])، وأقدم عنصر **استخدامًا** بيتشال لما يعدّي [[max]]، وأي عنصر عدّى عليه [[ttlMs]] بيعتبر مش موجود. و [[remember(key, load)]] بيحمّل القيمة مرة واحدة. و [[stats()]] بعدد الـ hits والـ misses والمشال والنسبة.
• [[memoizeByObject(fn)]]: نتيجة الدالة متخزنة لكل object في WeakMap، فلما الـ object يتمسح نتيجته تتمسح معاه.
• [[getOrInsertComputed(map, key, make)]]: بيستخدم الـ method الجديدة لو موجودة وإلا بديلها، على Map و WeakMap.
والإعدادات الغلط ([[max: 0]] أو [[ttlMs: -1]]) بترمي [[RangeError]] برسالة واضحة. ومعاها [[cache.test.js]] بـ [[node --test]] و [[demo.js]]. من الوحدة كلها، وخصوصًا «Map: كل الـ methods و getOrInsert» و «WeakMap و WeakSet».`, done: R`[[node --test]] بيطلّع ٩ اختبارات كلهم ✔ (منهم TTL بساعة متحكم فيها، و LRU بيشيل الأقدم استخدامًا مش الأقدم إضافة، و [[remember]] بيعدّ الـ miss صح لما القيمة [[null]]). و [[node demo.js]] بيوريك ٥ نداءات API بـ [[max: 2]] و ٣ بـ [[max: 3]]، و [[new LruCache({ max: -1 })]] بيطلّع [[RangeError]] برسالة عربي.`, ext: R`زوّد [[onEvict(key, value)]] callback، و [[peek(key)]] بتقرا من غير ما تغيّر الترتيب، و [[maxSize]] بالـ bytes بدل العدد (كل قيمة ليها [[sizeOf]])، و [[rememberAsync]] لدالة async بحيث نداءين في نفس الوقت لنفس المفتاح يستنوا نفس الـ Promise (اسمها request coalescing). وانشرها package على npm بـ README واختبارات في CI.`, sol: R`**هتشوف إيه:** مكتبة من ملف واحد، وملف demo بيحاكي API بطيء للأسعار والكاش بيوفّر النداءات، وملف اختبارات بيغطي كل حالة صعبة من غير ما يستنى وقت حقيقي.

~~~text شجرة الملفات
cache/
├── cache.js         المكتبة: LruCache و memoizeByObject و getOrInsertComputed
├── cache.test.js    ٩ اختبارات بـ node --test
└── demo.js          أسعار من «API» وسلة مشتريات
~~~

**ترتيب البناء:** [[set]] و [[get]] بـ Map عادية الأول (الكاش من غير حد)، وبعدين الحد الأقصى ([[max]]) واختباره، وبعدين نقل المفتاح للآخر مع كل [[get]] (ده اللي بيخليه LRU)، وبعدين الـ TTL بساعة بتتبعت من برّه ([[now]])، وبعدين [[stats]] و [[remember]]، وآخر حاجة [[memoizeByObject]].

~~~js cache.js
// cache.js: كاش LRU بحد أقصى ومدة صلاحية، و memo لكل object من غير ما يمسك الذاكرة
function getOrInsertComputed(map, key, make) {
  if (typeof map.getOrInsertComputed === "function") return map.getOrInsertComputed(key, make);
  if (!map.has(key)) map.set(key, make(key));
  return map.get(key);
}

class LruCache {
  #items = new Map();
  #max;
  #ttl;
  #now;
  #hits = 0;
  #misses = 0;
  #evictions = 0;

  constructor({ max = 100, ttlMs = Infinity, now = Date.now } = {}) {
    if (!Number.isInteger(max) || max < 1) throw new RangeError("max لازم رقم صحيح 1 أو أكتر، جالي " + max);
    if (!(ttlMs > 0)) throw new RangeError("ttlMs لازم أكبر من 0، جالي " + ttlMs);
    this.#max = max;
    this.#ttl = ttlMs;
    this.#now = now;
  }

  #fresh(key) {
    const entry = this.#items.get(key);
    if (!entry) return null;
    if (this.#now() - entry.at >= this.#ttl) { this.#items.delete(key); return null; }
    return entry;
  }

  get(key) {
    const entry = this.#fresh(key);
    if (!entry) { this.#misses++; return undefined; }
    this.#hits++;
    this.#items.delete(key);
    this.#items.set(key, entry);
    return entry.value;
  }

  has(key) { return this.#fresh(key) !== null; }

  remember(key, load) {
    const entry = this.#fresh(key);
    if (entry) {
      this.#hits++;
      this.#items.delete(key);
      this.#items.set(key, entry);
      return entry.value;
    }
    this.#misses++;
    const value = load(key);
    this.set(key, value);
    return value;
  }

  set(key, value) {
    this.#items.delete(key);
    this.#items.set(key, { value, at: this.#now() });
    while (this.#items.size > this.#max) {
      this.#items.delete(this.#items.keys().next().value);
      this.#evictions++;
    }
    return this;
  }

  delete(key) { return this.#items.delete(key); }
  clear() { this.#items.clear(); }
  get size() { return this.#items.size; }

  *[Symbol.iterator]() {
    for (const key of [...this.#items.keys()]) {
      const entry = this.#fresh(key);
      if (entry) yield [key, entry.value];
    }
  }
  keys() { return Array.from(this, ([k]) => k); }

  stats() {
    const total = this.#hits + this.#misses;
    return { hits: this.#hits, misses: this.#misses, evictions: this.#evictions, size: this.size, hitRate: total ? Math.round((this.#hits / total) * 100) : 0 };
  }
}

function memoizeByObject(fn) {
  const cache = new WeakMap();
  return function (obj) {
    if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
      throw new TypeError("memoizeByObject محتاج object، جالي " + (obj === null ? "null" : typeof obj));
    }
    return getOrInsertComputed(cache, obj, o => fn(o));
  };
}

module.exports = { LruCache, memoizeByObject, getOrInsertComputed };
~~~

~~~js cache.test.js
const test = require("node:test");
const assert = require("node:assert/strict");
const { LruCache, memoizeByObject, getOrInsertComputed } = require("./cache");

test("LRU: بيشيل الأقدم استخدامًا لما يعدّي max", () => {
  const c = new LruCache({ max: 2 });
  c.set("a", 1).set("b", 2);
  c.get("a");
  c.set("c", 3);
  assert.deepEqual(c.keys(), ["a", "c"]);
  assert.equal(c.has("b"), false);
  assert.equal(c.stats().evictions, 1);
});

test("set لمفتاح موجود بيحدّث القيمة ويخليه الأحدث", () => {
  const c = new LruCache({ max: 2 });
  c.set("a", 1).set("b", 2).set("a", 10).set("c", 3);
  assert.deepEqual([...c], [["a", 10], ["c", 3]]);
});

test("TTL: القيمة بتنتهي بساعة متحكم فيها", () => {
  let t = 1000;
  const c = new LruCache({ ttlMs: 500, now: () => t });
  c.set("price", 120);
  t = 1499;
  assert.equal(c.get("price"), 120);
  t = 1500;
  assert.equal(c.get("price"), undefined);
  assert.equal(c.size, 0);
});

test("stats: hits و misses و hitRate", () => {
  const c = new LruCache();
  c.set("x", 1);
  c.get("x"); c.get("x"); c.get("y");
  assert.deepEqual(c.stats(), { hits: 2, misses: 1, evictions: 0, size: 1, hitRate: 67 });
});

test("remember: بيحمّل مرة واحدة وبيعدّ الـ miss صح، حتى لو القيمة null", () => {
  const c = new LruCache();
  let loads = 0;
  const load = sku => { loads++; return sku === "x" ? null : 5; };
  assert.equal(c.remember("x", load), null);
  assert.equal(c.remember("x", load), null);
  assert.equal(loads, 1);
  assert.deepEqual([c.stats().hits, c.stats().misses], [1, 1]);
});

test("قيم مسموحة: undefined كقيمة و object كمفتاح", () => {
  const c = new LruCache();
  const key = { id: 1 };
  c.set(key, undefined);
  assert.equal(c.has(key), true);
  assert.equal(c.has({ id: 1 }), false);
});

test("إعدادات غلط بترمي RangeError واضح", () => {
  assert.throws(() => new LruCache({ max: 0 }), { name: "RangeError", message: /max/ });
  assert.throws(() => new LruCache({ max: 2.5 }), RangeError);
  assert.throws(() => new LruCache({ ttlMs: -1 }), { message: /ttlMs/ });
});

test("memoizeByObject: بيحسب مرة لكل object، وبيرفض غير الـ objects", () => {
  let calls = 0;
  const area = memoizeByObject(r => { calls++; return r.w * r.h; });
  const room = { w: 4, h: 5 };
  assert.equal(area(room), 20);
  assert.equal(area(room), 20);
  assert.equal(area({ w: 4, h: 5 }), 20);
  assert.equal(calls, 2);
  assert.throws(() => area("room"), { name: "TypeError", message: /string/ });
  assert.throws(() => area(null), /null/);
});

test("getOrInsertComputed: نفس السلوك على Map و WeakMap", () => {
  const m = new Map();
  getOrInsertComputed(m, "k", () => []).push(1);
  getOrInsertComputed(m, "k", () => []).push(2);
  assert.deepEqual(m.get("k"), [1, 2]);
  const w = new WeakMap(), o = {};
  assert.equal(getOrInsertComputed(w, o, () => "x"), "x");
  assert.equal(getOrInsertComputed(w, o, () => "y"), "x");
});
~~~

~~~js demo.js
// demo.js: أسعار بتتجاب من «API» بطيء، والكاش بيوفّر النداءات
const { LruCache, memoizeByObject } = require("./cache");

let apiCalls = 0;
function fetchPrice(sku) { apiCalls++; return { "P-01": 120, "P-02": 45, "P-03": 300 }[sku] ?? null; }

const prices = new LruCache({ max: 2, ttlMs: 60_000 });
const price = sku => prices.remember(sku, fetchPrice);

for (const sku of ["P-01", "P-02", "P-01", "P-03", "P-02", "P-01"]) console.log(sku, price(sku));
console.log("نداءات الـ API:", apiCalls, "| الكاش:", prices.keys(), prices.stats());

const cartTotal = memoizeByObject(cart => cart.lines.reduce((s, l) => s + l.qty * l.price, 0));
const cart = { lines: [{ qty: 2, price: 120 }, { qty: 1, price: 45 }] };
console.log("إجمالي السلة:", cartTotal(cart), cartTotal(cart));
try { new LruCache({ max: -1 }); } catch (e) { console.log(e.name + ":", e.message); }
~~~

~~~text الناتج: node --test (Node 24.22، ويندوز 11)
✔ LRU: بيشيل الأقدم استخدامًا لما يعدّي max (5.3021ms)
✔ set لمفتاح موجود بيحدّث القيمة ويخليه الأحدث (0.7506ms)
✔ TTL: القيمة بتنتهي بساعة متحكم فيها (1.8135ms)
✔ stats: hits و misses و hitRate (0.5446ms)
✔ remember: بيحمّل مرة واحدة وبيعدّ الـ miss صح، حتى لو القيمة null (0.4484ms)
✔ قيم مسموحة: undefined كقيمة و object كمفتاح (0.2474ms)
✔ إعدادات غلط بترمي RangeError واضح (1.0708ms)
✔ memoizeByObject: بيحسب مرة لكل object، وبيرفض غير الـ objects (0.574ms)
✔ getOrInsertComputed: نفس السلوك على Map و WeakMap (0.4426ms)
ℹ tests 9
ℹ suites 0
ℹ pass 9
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 341.1918
~~~

~~~text الناتج: node demo.js
P-01 120
P-02 45
P-01 120
P-03 300
P-02 45
P-01 120
نداءات الـ API: 5 | الكاش: [ 'P-02', 'P-01' ] { hits: 1, misses: 5, evictions: 3, size: 2, hitRate: 17 }
إجمالي السلة: 285 285
RangeError: max لازم رقم صحيح 1 أو أكتر، جالي -1
~~~

**ليه ٥ نداءات من ٦؟** الكاش بيشيل عنصرين بس: P-01 ثم P-02 (نداءين)، و P-01 تاني من الكاش (hit)، و P-03 بيطرد P-02 (الأقدم استخدامًا)، فـ P-02 بعدها نداء، وهو بيطرد P-01، فـ P-01 نداء. ولما غيّرنا [[max: 2]] لـ [[max: 3]] في نفس الـ demo الناتج بقى:

~~~text الناتج: نفس demo.js بـ max: 3
نداءات الـ API: 3 | الكاش: [ 'P-03', 'P-02', 'P-01' ] { hits: 3, misses: 3, evictions: 0, size: 3, hitRate: 50 }
~~~

يعني حجم الكاش مش رقم تحطه وخلاص: بتقيسه بـ [[stats()]] على الشغل الحقيقي.

## أهم الحتت وليه كده

| الحتة | بتعمل إيه | ليه |
|---|---|---|
| [[#items = new Map()]] | التخزين كله | Map بتحفظ ترتيب الإضافة، فأول مفتاح فيها هو الأقدم. و [[#]] يعني private: محدش من برّه يلعب فيها |
| [[delete]] ثم [[set]] في [[get]] | ينقل المفتاح للآخر | [[set]] على مفتاح موجود **مش بيغيّر مكانه** (درس Map)، فلازم تمسحه الأول |
| [[this.#items.keys().next().value]] | أقدم مفتاح | iterator الـ keys بيبدأ من الأول، و [[next()]] واحدة بتدّيك أوله من غير ما تعمل array |
| [[while (size > max)]] | الطرد | [[while]] مش [[if]]: لو حد غيّر الحد لأقل في نسخة جاية، الكاش يرجع للحد مرة واحدة |
| [[{ value, at }]] و [[now]] من برّه | الـ TTL | الاختبار بيبعت ساعة هو متحكم فيها ([[() => t]])، فبيختبر 500ms من غير ما يستنى 500ms |
| [[now() - at >= ttl]] | انتهت؟ | [[>=]] عشان «صالحة 500ms» يعني عند 1500 بالظبط خلاص انتهت. والاختبار بيجرّب 1499 و 1500 |
| [[*[Symbol.iterator]()]] | [[for...of]] و [[[...cache]]] و [[Array.from(cache)]] | generator بيلف على **نسخة** من المفاتيح وبيتخطى المنتهي. و [[keys()]] مبنية عليه |
| [[remember(key, load)]] | hit أو تحميل مرة واحدة | بيعدّ الـ hit والـ miss في مكان واحد، وبيفرّق بين «مش موجود» و «موجود وقيمته [[null]]» |
| [[memoizeByObject]] بـ WeakMap | نتيجة لكل object | لما السلة تتمسح من الذاكرة، نتيجتها تتمسح معاها (درس «WeakMap و WeakSet» قاسها: Map مسكت 15MB وزيادة) |

## الغلطات اللي حصلت وأنا ببنيها

أول [[demo.js]] كانت بتعمل الكاش كده:

~~~js demo.js (النسخة الأولى)
function price(sku) {
  if (prices.has(sku)) return prices.get(sku);
  const p = fetchPrice(sku);
  prices.set(sku, p);
  return p;
}
~~~

وكان الناتج [[{ hits: 1, misses: 0, evictions: 3, size: 2, hitRate: 100 }]]: نسبة 100٪ وإحنا عاملين ٥ نداءات API من ٦! السبب: [[has]] مش بتعدّ miss (هي سؤال بس)، و [[get]] اتنادت بس لما المفتاح موجود، فالـ misses فضلت 0. ولو القيمة نفسها [[undefined]] كان [[get]] مش هيفرق بين «مش موجود» و «موجود وفاضي». الحل: [[remember(key, load)]] بتعمل السؤال والتحميل والعد في خطوة واحدة، واتكتبلها اختبار بقيمة [[null]] عشان الغلط ده ميرجعش. الناتج بعد التصليح [[hitRate: 17]] (واحد من ستة)، وده الرقم الحقيقي.

**ليه مش مكتبة جاهزة؟** في الشغل الحقيقي [[lru-cache]] على npm بتعمل ده وأكتر (حجم بالـ bytes، و async، و stale-while-revalidate). المشروع ده عشان تفهم إن الـ LRU كله «Map بتحفظ الترتيب + delete ثم set»، فتعرف تقرا أي مكتبة وتختار إعداداتها.` },
        { lvl: 'فكرة', t: R`قارن لستتين من حياتك`, what: R`عندك لستتين لنفس الحاجة في وقتين: حضور كورس أسبوعين ورا بعض، أو مشتركين نشرة شهرين، أو أعضاء جروب قبل وبعد. اعمل أداة بتقرا ملفين (اسم في كل سطر) وبتطلّع: مين جديد، ومين وقف، ومين ثابت، ونسبة الاستمرار، والمكرر. والأسماء تتقارن من غير ما الحروف الكبيرة والمسافات الزيادة تفرق، بس تتعرض بشكلها الأصلي.`, done: R`على ملفين حقيقيين عندك الأرقام مطابقة لعدّك بإيدك، والمكرر (حتى لو مكتوب بحروف مختلفة) متحسبش مرتين، والملف الناقص بيطلّع رسالة و exit code 1.`, ext: R`خلي الأداة تقبل CSV وتختار العمود، وتطلّع النتيجة ملف جديد، وتقارن أكتر من لستتين (مين حضر كل الأسابيع: [[intersection]] على الكل بـ [[reduce]]).`, sol: R`**النسخة النموذجية:** حضور أسبوعين لكورس. اخترنا التصميم ده: كل اسم ليه **مفتاح** للمقارنة (صغير ومن غير مسافات زيادة) و**شكل** للعرض، فالمقارنة بـ Set على المفاتيح، والعرض من Map المفتاح ← الشكل الأصلي.

~~~text week1.txt
Sara Ali
omar hassan
 Mona Adel
Karim Fathy
sara ali

~~~

~~~text week2.txt
Omar Hassan
Mona Adel
Yassin Nabil
Nour Samy
~~~

~~~js compare.js
// compare.js: قارن لستتين (حضور أسبوعين، مشتركين شهرين...): مين جه جديد ومين وقف ومين ثابت
const fs = require("node:fs");

function readList(file) {
  const text = fs.readFileSync(file, "utf8");
  const shown = new Map();
  const dupes = [];
  for (const line of text.split(/\r?\n/)) {
    const name = line.trim().replace(/\s+/g, " ");
    if (name === "") continue;
    const key = name.toLowerCase();
    if (shown.has(key)) dupes.push(name);
    else shown.set(key, name);
  }
  return { keys: new Set(shown.keys()), shown, dupes };
}

const [a, b] = process.argv.slice(2);
if (!a || !b) {
  console.error("الاستخدام: node compare.js old.txt new.txt");
  process.exit(1);
}
function load(file) {
  try {
    return readList(file);
  } catch (e) {
    console.error("مش قادر أقرا " + file + " (" + e.code + ")");
    process.exit(1);
  }
}
const oldL = load(a), newL = load(b);

const name = key => newL.shown.get(key) ?? oldL.shown.get(key);
const list = set => [...set].map(name).toSorted((x, y) => x.localeCompare(y)).join("، ") || "-";
const joined = newL.keys.difference(oldL.keys);
const left = oldL.keys.difference(newL.keys);
const stayed = oldL.keys.intersection(newL.keys);

console.log("جديد (" + joined.size + "):", list(joined));
console.log("وقف (" + left.size + "):", list(left));
console.log("ثابت (" + stayed.size + "):", list(stayed));
const all = oldL.keys.union(newL.keys);
console.log("نسبة الاستمرار:", Math.round((stayed.size / oldL.keys.size) * 100) + "%", "| كله:", all.size);
if (oldL.dupes.length || newL.dupes.length) console.log("مكرر واتشال:", [...oldL.dupes, ...newL.dupes].join("، "));
~~~

~~~text الناتج: node compare.js week1.txt week2.txt ثم ملف ناقص ثم ملف مش موجود
جديد (2): Nour Samy، Yassin Nabil
وقف (2): Karim Fathy، Sara Ali
ثابت (2): Mona Adel، Omar Hassan
نسبة الاستمرار: 50% | كله: 6
مكرر واتشال: sara ali
الاستخدام: node compare.js old.txt new.txt
مش قادر أقرا nope.txt (ENOENT)
~~~

**ليه كده:**

- [[line.trim().replace(/\s+/g, " ")]] و [[toLowerCase()]]: [[" Mona Adel "]] و [["Mona Adel"]] و [["omar hassan"]] و [["Omar Hassan"]] نفس الشخص. من غير ده كانوا هيطلعوا في «وقف» و «جديد» مع بعض.
- [[shown]] Map بتحفظ **أول** شكل شافته لكل مفتاح، و [[name(key)]] بتفضّل شكل اللستة الجديدة (لو حد صحّح اسمه).
- **الأربع عمليات:** جديد = [[new.difference(old)]]، ووقف = [[old.difference(new)]]، وثابت = [[intersection]]، والكل = [[union]]. ونسبة الاستمرار = الثابت على عدد القديم.
- [[toSorted((x, y) => x.localeCompare(y))]]: ترتيب الـ Set هو ترتيب الإضافة، وده مش مفيد للعرض.

**غلطة حصلت وأنا ببنيها:** أول نسخة كانت بتطبع [[e.path]] في رسالة الملف الناقص، وطلع إنه **المسار الكامل** من الـ root (فيه اسم اليوزر والفولدرات) مش اللي اليوزر كتبه. لو الأداة دي بتطبع في لوج مشترك، ده تسريب. التصليح: الرسالة بتستخدم الاسم اللي اليوزر كتبه، و [[e.code]] ([[ENOENT]] = الملف مش موجود).

**خليه بتاعك:** بدّل الملفين بلستتين من عندك، وزوّد سطر «حضر الأسبوعين وغاب التالت» لما تقارن ٣ ملفات.` },
      ],
      items: [
        {
          cmd: "Array: at و slice و concat",
          title: "تقرا من الآخر بـ at، وتاخد حتة أو نسخة بـ slice، وتلزق arrays بـ concat، والتلاتة مبيلمسوش الأصل",
          desc: R`التلاتة بيقروا من الـ array ويرجّعوا حاجة جديدة، والأصل زي ما هو:
• [[at(i)]] عنصر واحد، والسالب من الآخر: [[at(-1)]] آخر عنصر (بدل [[arr[arr.length - 1]]]).
• [[slice(start, end)]] حتة من [[start]] لحد **قبل** [[end]] في array جديدة، والسالب من الآخر، ومن غير باراميترز نسخة كاملة (سطحية).
• [[concat(...items)]] array جديدة فيها الأصل وبعده كل اللي بعتّه، والـ arrays اللي بتبعتها بتتفرد مستوى واحد.
والنسخة «سطحية» (shallow): الـ objects اللي جوه هي هي، فتعديلها بيبان في الاتنين.`,
          example: R`const msgs = ["أهلا", "إزيك", "تمام", "باي"];
console.log(msgs.at(0), msgs.at(-1), msgs.at(-2), msgs.at(10));
const lastTwo = msgs.slice(-2);
const middle = msgs.slice(1, 3);
const copy = msgs.slice();
console.log(lastTwo, middle, copy === msgs);
const more = msgs.concat(["سلام"], "تصبح على خير", [["متداخلة"]]);
console.log(more.length, more.at(-1), msgs.length);`,
          try: R`عندك [[const log = ["09:00 دخول", "09:05 بحث", "09:07 سلة", "09:09 دفع", "09:10 خروج"];]]. اطبع آخر حدث بـ [[at]]، وآخر ٣ أحداث بـ [[slice]]، والأحداث من غير أول وآخر واحد. وبعدين اعمل [[const today = log.concat(["09:30 دخول"])]] واتأكد إن [[log.length]] لسه 5.`,
          sol: R`~~~js log.js
const log = ["09:00 دخول", "09:05 بحث", "09:07 سلة", "09:09 دفع", "09:10 خروج"];
console.log(log.at(-1));
console.log(log.slice(-3));
console.log(log.slice(1, -1));
const today = log.concat(["09:30 دخول"]);
console.log(today.length, log.length);
~~~

~~~text الناتج
09:10 خروج
[ '09:07 سلة', '09:09 دفع', '09:10 خروج' ]
[ '09:05 بحث', '09:07 سلة', '09:09 دفع' ]
6 5
~~~

- [[slice(-3)]]: من «تالت واحد من الآخر» لحد الآخر.
- [[slice(1, -1)]]: من index 1 لحد **قبل** آخر عنصر. السالب في [[end]] بيتحسب من الآخر برضه.
- [[concat]] رجّعت array جديدة طولها 6، و [[log]] فضلت 5. لو كنت عايز تعدّل [[log]] نفسها كنت هتستخدم [[push]].`,
          teach: R`## الفكرة

درس «array literals و index و length» علّمك تقرا بـ [[arr[i]]] وتزوّد بـ [[push]] (وده بيعدّل الأصل). هنا ٣ methods بيقروا **من غير ما يلمسوا الأصل**: [[at]] لعنصر، و [[slice]] لحتة أو نسخة، و [[concat]] للزق. المثال لستة رسايل شات. كل النواتج من Node 24.22.

---

## ١. Array.prototype.at: عنصر بالـ index، والسالب من الآخر

~~~js at.js
const msgs = ["أهلا", "إزيك", "تمام", "باي"];
console.log(msgs.at(0), msgs.at(-1), msgs.at(-2), msgs.at(10));
console.log(msgs[msgs.length - 1], msgs.at(1.7), msgs.at("1"), msgs.at(-5), "سلام".at(-1), [].at(0));
~~~

~~~text الناتج
أهلا باي تمام undefined
باي إزيك إزيك undefined م undefined
~~~

| النداء | النتيجة | ليه |
|---|---|---|
| [[at(0)]] | «أهلا» | زي [[msgs[0]]] بالظبط |
| [[at(-1)]] | «باي» | السالب = [[length + i]]، يعني [[4 - 1 = 3]]. ده الفرق الوحيد عن [[msgs[-1]]] اللي بيرجّع [[undefined]] |
| [[at(-2)]] | «تمام» | قبل الآخر |
| [[at(10)]] و [[at(-5)]] | [[undefined]] | برّه المدى من الناحيتين: مفيش error |
| [[at(1.7)]] | «إزيك» | الكسر بيتقص (مش بيتقرّب): 1.7 بقت 1 |
| [[at("1")]] | «إزيك» | بيتحوّل لرقم |
| [["سلام".at(-1)]] | «م» | النصوص عندها [[at]] كمان (من درس «string methods») |

**إمتى؟** أي «آخر حاجة»: آخر رسالة، آخر طلب، آخر خطوة في التاريخ. [[log.at(-1)]] أوضح من [[log[log.length - 1]]] وأقصر، وخصوصًا لو الـ array راجعة من دالة: [[getItems().at(-1)]] بدل ما تحطها في متغير الأول عشان تحسب طولها.

---

## ٢. Array.prototype.slice: حتة أو نسخة

~~~js slice.js
const p = [1, 2, 3, 4, 5, 6, 7];
console.log(p.slice(2), p.slice(2, 4), p.slice(-3), p.slice(-3, -1), p.slice(4, 2), p.slice(0, 100));
~~~

~~~text الناتج
[ 3, 4, 5, 6, 7 ] [ 3, 4 ] [ 5, 6, 7 ] [ 5, 6 ] [] [
  1, 2, 3, 4,
  5, 6, 7
]
~~~

(Node بيكسر الـ array الطويلة على كذا سطر لما تبقى أعداد كتير، دي نفس [[[1, 2, 3, 4, 5, 6, 7]]].)

| النداء | النتيجة | القاعدة |
|---|---|---|
| [[slice(2)]] | من index 2 لآخرها | من غير [[end]] = لحد الآخر |
| [[slice(2, 4)]] | [[[3, 4]]] | [[end]] مش داخل: 2 و 3 بس، والطول = [[end - start]] |
| [[slice(-3)]] | آخر ٣ | السالب من الآخر، زي [[at]] |
| [[slice(-3, -1)]] | [[[5, 6]]] | الاتنين سالب: من تالت واحد من الآخر لحد قبل الآخر |
| [[slice(4, 2)]] | [[[]]] | البداية بعد النهاية = فاضية، مش error ومش بيبدّلهم |
| [[slice(0, 100)]] | الكل | الرقم الكبير بيتقص لطول الـ array |
| [[slice()]] | نسخة كاملة | array جديدة بنفس العناصر |

وده نفس [[slice]] بتاع النصوص (درس «string: indexOf و substring و concat»)، بنفس القواعد.

### النسخة سطحية (shallow)

~~~js shallow.js
const users = [{ name: "سارة" }, { name: "عمر" }];
const c2 = users.slice();
c2[0].name = "تعديل";
c2.push({ name: "جديد" });
console.log(users, c2.length);
~~~

~~~text الناتج
[ { name: 'تعديل' }, { name: 'عمر' } ] 3
~~~

- [[c2.push]] مأثّرش على [[users]]: الـ array نفسها جديدة.
- بس [[c2[0].name = ...]] غيّر [[users[0]]] كمان: [[slice]] نسخت **المؤشرات** للـ objects مش الـ objects نفسها (درس «reference و copy»). عشان نسخة عميقة: [[users.map(u => ({ ...u }))]] لمستوى واحد، أو [[structuredClone(users)]] لكل المستويات (التمرين التالت).

### [[slice]] على array-like

~~~js args.js
function f() { return Array.prototype.slice.call(arguments, 1); }
console.log(f("a", "b", "c"));
~~~

~~~text الناتج
[ 'b', 'c' ]
~~~

[[arguments]] شكلها array بس مش array (مفيهاش [[slice]]). الكود القديم كان بيستعير [[slice]] من [[Array.prototype]] بـ [[call]] (درس «call و apply و bind»). النهارده بتكتب [[(...args)]] (rest) أو [[Array.from(arguments)]]، بس هتقابل السطر ده كتير في كود قديم.

---

## ٣. Array.prototype.concat: لزق في array جديدة

~~~js concat.js
const a = [1, 2];
console.log(a.concat(3, [4, 5], [[6]]), a);
const b = a.concat();
console.log(b === a, b);
console.log([...a, 3, ...[4, 5]]);
~~~

~~~text الناتج
[ 1, 2, 3, 4, 5, [ 6 ] ] [ 1, 2 ]
false [ 1, 2 ]
[ 1, 2, 3, 4, 5 ]
~~~

- كل باراميتر: لو **array** بتتفرد عناصرها (مستوى واحد بس: [[[[6]]]] بقت [[[6]]] جوه)، ولو أي حاجة تانية بتتحط زي ما هي.
- [[a]] لسه [[[1, 2]]]: [[concat]] مبتعدّلش، عكس [[push]].
- [[concat()]] من غير حاجة = نسخة سطحية زي [[slice()]].
- الـ spread [[[...a, 3, ...b]]] (درس «array destructuring و spread») بيعمل نفس الشغل وأوضح، وانت اللي بتقرر مين يتفرد (بالـ [[...]]). [[concat]] بتفرد أي array لوحدها، ودي مشكلة لو عايز تحط array كعنصر واحد (التمرين الرابع).

### [[Symbol.isConcatSpreadable]]: مين يتفرد

~~~js spreadable.js
const spreadable = { length: 2, 0: "x", 1: "y", [Symbol.isConcatSpreadable]: true };
console.log([0].concat(spreadable), [0].concat({ length: 1, 0: "z" }));
console.log([1, , 3].concat([4]));
~~~

~~~text الناتج
[ 0, 'x', 'y' ] [ 0, { '0': 'z', length: 1 } ]
[ 1, <1 empty item>, 3, 4 ]
~~~

- object عادي بيتحط كعنصر واحد، إلا لو عليه [[Symbol.isConcatSpreadable]] بـ [[true]]: ساعتها [[concat]] بتفرده زي array. نادر جدًا في الكود العادي، بس ده اللي بيفسّر ليه [[concat]] بتفرد الـ arrays: هي بتسأل السؤال ده.
- [[concat]] بتحافظ على الفراغات (holes) زي ما هي.

---

## الخلاصة

| عايز | استخدم | بيرجّع |
|---|---|---|
| آخر عنصر، أو بالعدّ من الآخر | [[at(-1)]] و [[at(-n)]] | العنصر أو [[undefined]] |
| حتة | [[slice(start, end)]] (و [[end]] مش داخل) | array جديدة |
| آخر n | [[slice(-n)]] | array جديدة |
| نسخة سطحية | [[slice()]] أو [[[...arr]]] | array جديدة، والـ objects جواها مشتركة |
| نسخة عميقة | [[structuredClone(arr)]] | كل حاجة جديدة |
| تلزق | [[[...a, ...b]]] أو [[a.concat(b)]] | array جديدة |

> [[splice]] (بالـ p) حاجة تانية خالص: بتعدّل الأصل. الدرس الجاي.`,
          lines: [
            R`لستة ٤ رسايل شات، هنقرا منها بطرق مختلفة من غير ما نغيّرها.`,
            R`[[at(0)]] أول رسالة، و [[at(-1)]] آخر رسالة (السالب بيتعدّ من الآخر)، و [[at(-2)]] اللي قبلها، و [[at(10)]] برّه المدى فـ [[undefined]].`,
            R`[[slice(-2)]] array جديدة فيها آخر عنصرين: [[[ 'تمام', 'باي' ]]].`,
            R`[[slice(1, 3)]] من index 1 لحد **قبل** 3، يعني العنصرين اللي في النص.`,
            R`[[slice()]] من غير باراميترز نسخة كاملة جديدة من الـ array.`,
            R`بيطبع الحتتين، و [[copy === msgs]] بـ [[false]]: النسخة array تانية في الذاكرة مش نفس الـ array.`,
            R`[[concat]] بتلزق ورا الأصل: [[["سلام"]]] بتتفرد لعنصر، والنص بيتحط زي ما هو، و [[[["متداخلة"]]]] بتتفرد مستوى واحد بس فبيفضل جواها array.`,
            R`الطول الجديد 7، وآخر عنصر الـ array [[[ 'متداخلة' ]]]، و [[msgs.length]] لسه 4: [[concat]] مغيّرتش الأصل.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[const q = ["a", "b", "c", "d", "e"];]]. اكتب قبل التشغيل: [[q.at(-1)]] و [[q.slice(-2)]] و [[q.slice(1, -1)]] و [[q.at(-6)]] و [[q.slice(3, 1)]].`, done: R`كتبت [["e"]] و [[["d", "e"]]] و [[["b", "c", "d"]]] و [[undefined]] و [[[]]]، وشغّلت واتأكدت.`, sol: R`~~~js predict.js
const q = ["a", "b", "c", "d", "e"];
console.log(q.at(-1), q.slice(-2), q.slice(1, -1), q.at(-6), q.slice(3, 1));
~~~

~~~text الناتج
e [ 'd', 'e' ] [ 'b', 'c', 'd' ] undefined []
~~~

- [[at(-6)]]: [[5 - 6 = -1]] لسه سالب، يعني برّه المدى فـ [[undefined]].
- [[slice(3, 1)]]: البداية بعد النهاية، فـ array فاضية. [[slice]] مش بيبدّل الطرفين (ده [[substring]] في النصوص).` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[paginate(items, page, size = 3)]] بترجّع [[{ items, page, pages }]]: عناصر الصفحة بـ [[slice]]، والصفحات تبدأ من 1، و [[pages]] على الأقل 1 حتى لو مفيش عناصر، والصفحة بعد الآخر [[items: []]]. حلّها في المربع اللي تحت.`, done: R`كل الاختبارات عدّت: صفحة 3 من ٧ منتجات فيها منتج واحد، وصفحة 4 فاضية، و [[paginate([], 1)]] بترجّع [[pages: 1]].`, sol: R`~~~js paginate.js
function paginate(items, page, size = 3) {
  const pages = Math.max(1, Math.ceil(items.length / size));
  const start = (page - 1) * size;
  return { items: items.slice(start, start + size), page, pages };
}
const products = ["كوباية", "طبق", "معلقة", "شوكة", "سكينة", "فوطة", "إبريق"];
console.log(paginate(products, 1), paginate(products, 3), paginate(products, 4), paginate([], 1));
~~~

~~~text الناتج
{ items: [ 'كوباية', 'طبق', 'معلقة' ], page: 1, pages: 3 } { items: [ 'إبريق' ], page: 3, pages: 3 } { items: [], page: 4, pages: 3 } { items: [], page: 1, pages: 1 }
~~~

- [[(page - 1) * size]]: صفحة 1 تبدأ من 0، وصفحة 3 من 6.
- [[slice(start, start + size)]]: [[end]] مش داخل، فبالظبط [[size]] عنصر. وفي آخر صفحة [[slice(6, 9)]] بترجّع اللي موجود بس (عنصر واحد) من غير error.
- [[Math.max(1, ...)]]: [[Math.ceil(0 / 3)]] بـ 0، وصفحات «0 من 0» شكلها غلط في الواجهة.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** صفحة إعدادات بتعمل نسخة «مسودة» من [[settings]] عشان اليوزر يعدّل فيها ولو داس «إلغاء» الأصل يفضل زي ما هو: [[const draft = settings.slice(); draft[0].on = false;]]. بعد السطرين [[settings[0].on]] بقت [[false]]. ليه؟ وصلّحه بطريقتين (من قسم ٢ في الشرح).`, done: R`عرفت إن [[slice]] نسخة سطحية، والتصليح بـ [[map]] و spread وبـ [[structuredClone]] خلى الأصل [[true]] والمسودة [[false]].`, sol: R`~~~js draft.js
const settings = [{ key: "dark", on: true }, { key: "sound", on: true }];
const draft = settings.slice();
draft[0].on = false;
console.log(settings[0].on);
const settings2 = [{ key: "dark", on: true }, { key: "sound", on: true }];
const draft2 = settings2.map(s => ({ ...s }));
draft2[0].on = false;
console.log(settings2[0].on, draft2[0].on);
const draft3 = structuredClone(settings2);
draft3[1].on = false;
console.log(settings2[1].on, draft3[1].on);
~~~

~~~text الناتج
false
true false
true false
~~~

- [[slice()]] عملت array جديدة، بس فيها **نفس الـ objects**. فـ [[draft[0]]] و [[settings[0]]] object واحد.
- [[map(s => ({ ...s }))]]: object جديد لكل عنصر (مستوى واحد). كفاية هنا لأن كل إعداد قيمه primitives.
- [[structuredClone]]: نسخة عميقة لأي عمق (ومعاها Map و Set و Date)، بس أبطأ ومبتنسخش الدوال. استخدمها لما الشكل متداخل.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** دالة [[addRow(table, row)]] لجدول درجات (كل صف [[["الاسم", الدرجة]]]). النسخة الأولى [[t.concat(row); return t;]] مبتزوّدش حاجة، والتانية [[return t.concat(row);]] بتزوّد غلط. شغّل الاتنين، اشرح، وصلّحها (من قسم ٣ في الشرح).`, done: R`النسخة الأولى رجّعت الجدول زي ما هو، والتانية فردت الصف لعنصرين منفصلين، والتصليح رجّع [[[ [ 'سارة', 90 ], [ 'عمر', 75 ] ]]].`, sol: R`~~~js add-row.js
let table = [["سارة", 90]];
function addRowBad(t, row) { t.concat(row); return t; }
function addRowBad2(t, row) { return t.concat(row); }
function addRow(t, row) { return t.concat([row]); }
console.log(addRowBad(table, ["عمر", 75]));
console.log(addRowBad2(table, ["عمر", 75]));
console.log(addRow(table, ["عمر", 75]), [...table, ["عمر", 75]]);
~~~

~~~text الناتج
[ [ 'سارة', 90 ] ]
[ [ 'سارة', 90 ], 'عمر', 75 ]
[ [ 'سارة', 90 ], [ 'عمر', 75 ] ] [ [ 'سارة', 90 ], [ 'عمر', 75 ] ]
~~~

- **الأولى:** [[concat]] **بترجّع** array جديدة ومبتعدّلش [[t]]، والناتج اترمى. ده عكس [[push]]: لو اتعودت على [[push]] هتقع فيها.
- **التانية:** [[concat]] بتفرد أي array بتتبعتلها، فالصف بقى عنصرين لوحدهم ([['عمر', 75]] من غير قوسين).
- **التصليح:** لفّ الصف في array: [[concat([row])]] (اللي بيتفرد هو الغلاف بس)، أو spread: [[[...table, row]]] وده أوضح لأن انت اللي حاطط [[...]] على اللي عايزه يتفرد.` },
          ],
          check: {
            lang: "js",
            starter: R`function paginate(items, page, size = 3) {
  return { items, page, pages: 1 };
}`,
            tests: R`const products = ["كوباية", "طبق", "معلقة", "شوكة", "سكينة", "فوطة", "إبريق"];
test("أول صفحة", () => expect(paginate(products, 1)).toEqual({ items: ["كوباية", "طبق", "معلقة"], page: 1, pages: 3 }));
test("آخر صفحة فيها اللي فاضل بس", () => expect(paginate(products, 3).items).toEqual(["إبريق"]));
test("بعد الآخر فاضية", () => expect(paginate(products, 4).items).toEqual([]));
test("من غير عناصر: صفحة واحدة", () => expect(paginate([], 1)).toEqual({ items: [], page: 1, pages: 1 }));
test("size مختلف", () => expect(paginate(products, 2, 5)).toEqual({ items: ["فوطة", "إبريق"], page: 2, pages: 2 }));
test("الأصل متغيّرش", () => { paginate(products, 1); expect(products.length).toBe(7); });`,
            solution: R`function paginate(items, page, size = 3) {
  const pages = Math.max(1, Math.ceil(items.length / size));
  const start = (page - 1) * size;
  return { items: items.slice(start, start + size), page, pages };
}`
          },
          flag: "script",
          ref: [
            { t: "MDN: Array.prototype.at()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at" },
            { t: "MDN: Array.prototype.slice()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice" },
            { t: "MDN: Array.prototype.concat()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat" },
          ],
          pre: ["js/array literals و index و length", "js/reference و copy"],
          deep: {
            why: R`أغلب الوقت انت مش عايز تغيّر الـ array اللي جاتلك: جاية من دالة تانية، أو من الـ state في React، أو حد تاني شايلها. [[at]] و [[slice]] و [[concat]] بيدّوك اللي محتاجه من غير ما يلمسوها، فمفيش باج «الداتا اتغيّرت لوحدها في حتة تانية».`,
            how: R`[[at(i)]] بتحوّل [[i]] لعدد صحيح (بتقص الكسر)، ولو سالب بتزوّد [[length]]، وبعدين تقرا [[this[i]]] أو ترجّع [[undefined]] لو برّه. [[slice]] بتحسب [[start]] و [[end]] بنفس الطريقة وتقصّهم بين 0 و [[length]]، وتعمل array جديدة وتنسخ فيها **القيم** اللي في المدى (والقيمة لـ object هي المؤشر، عشان كده النسخة سطحية). [[concat]] بتعمل array جديدة، وتحط فيها الأصل، وبعدين كل باراميتر: لو [[Symbol.isConcatSpreadable]] بتاعه true (والـ arrays كده من غير ما تكتب حاجة) بتفرده، وإلا بتحطه عنصر واحد. والتلاتة بيشتغلوا على array-likes لو استعرتهم بـ [[call]].`,
            when: R`[[at(-1)]] لآخر عنصر، وخصوصًا على ناتج دالة. [[slice]] للصفحات (pagination)، و «آخر n»، والنسخة السطحية قبل ما تعمل [[sort]] أو [[splice]] (وإن كانت [[toSorted]] و [[toSpliced]] أحسن النهارده). [[concat]] أو spread للزق. ولما الشكل متداخل وعايز نسخة مستقلة بجد: [[structuredClone]].`,
            mistakes: R`[[slice]] و [[splice]]: الاسمين شبه بعض والسلوك عكس (واحدة بتقرا وواحدة بتعدّل). [[arr[-1]]] بدل [[at(-1)]]. فاكر إن [[slice()]] نسخة عميقة. [[arr.concat(x)]] من غير ما تشيل الناتج. [[concat(row)]] لما [[row]] نفسه array وانت عايزه عنصر واحد. [[slice(start, length)]] كأن الباراميتر التاني طول (هو مكان نهاية).`
          }
        },
        {
          cmd: "Array: splice و toSpliced و toReversed و with",
          title: "مين بيعدّل الـ array ومين بيرجّع نسخة: splice ولا toSpliced، و reverse ولا toReversed، و with",
          desc: R`كل method بتغيّر الـ array ليها أخت (ES2023) بترجّع **نسخة** متغيّرة والأصل زي ما هو:
• [[splice(start, deleteCount, ...items)]] بتشيل وتحط **جوه الأصل** وبترجّع اللي اتشال، و [[toSpliced]] بنفس الباراميترز بترجّع array جديدة.
• [[reverse()]] بتقلب الأصل، و [[toReversed()]] نسخة مقلوبة.
• [[sort()]] و [[toSorted()]] (درس «sort و toSorted»).
• [[arr[i] = v]] بتعدّل، و [[with(i, v)]] نسخة فيها عنصر واحد متغيّر (والـ index السالب من الآخر).
القاعدة: لو الـ array مش بتاعتك (جاية من برّه، أو state)، استخدم النسخة.`,
          example: R`const steps = ["اغسل", "قطّع", "اطبخ", "قدّم"];
const removed = steps.splice(1, 1, "قشّر", "قطّع");
console.log(removed, steps);
const plan = ["اغسل", "قطّع", "اطبخ", "قدّم"];
const plan2 = plan.toSpliced(1, 1, "قشّر", "قطّع");
const back = plan.toReversed();
const fixed = plan.with(-1, "قدّم سخن");
console.log(plan, plan2, back, fixed);`,
          try: R`عندك [[const songs = ["أ", "ب", "ج", "د"];]]. (١) شيل «ب» وحط مكانها «ب٢» بـ [[splice]]، واطبع اللي رجع والـ array. (٢) على نسخة جديدة [[const s2 = ["أ", "ب", "ج", "د"];]] اعمل نفس الحاجة بـ [[toSpliced]]، واقلبها بـ [[toReversed]]، وغيّر أول عنصر بـ [[with]]، واتأكد إن [[s2]] متغيّرتش.`,
          sol: R`~~~js songs.js
const songs = ["أ", "ب", "ج", "د"];
console.log(songs.splice(1, 1, "ب٢"), songs);
const s2 = ["أ", "ب", "ج", "د"];
console.log(s2.toSpliced(1, 1, "ب٢"), s2.toReversed(), s2.with(0, "أ٢"), s2);
~~~

~~~text الناتج
[ 'ب' ] [ 'أ', 'ب٢', 'ج', 'د' ]
[ 'أ', 'ب٢', 'ج', 'د' ] [ 'د', 'ج', 'ب', 'أ' ] [ 'أ٢', 'ب', 'ج', 'د' ] [ 'أ', 'ب', 'ج', 'د' ]
~~~

[[splice]] رجّعت **اللي اتشال** ([[[ 'ب' ]]]) وعدّلت [[songs]]. أما التلاتة التانيين فكل واحد رجّع array جديدة، و [[s2]] في الآخر زي ما هي.`,
          teach: R`## الفكرة

فيه نوعين methods على الـ array: نوع **بيعدّل الأصل** (mutating)، ونوع **بيرجّع array جديدة**. لحد ٢٠٢٣ كانت أشهر عمليات (الشيل من النص، والقلب، والترتيب) متاحة بس بالنوع الأول، فكان لازم [[slice()]] قبلها. ES2023 زوّدت أخت لكل واحدة: [[toSpliced]] و [[toReversed]] و [[toSorted]] و [[with]]. المثال خطوات وصفة أكل. النواتج من Node 24.22.

---

## ١. Array.prototype.splice: تشيل وتحط جوه الأصل

~~~js splice.js
const steps = ["اغسل", "قطّع", "اطبخ", "قدّم"];
const removed = steps.splice(1, 1, "قشّر", "قطّع");
console.log(removed, steps);
~~~

~~~text الناتج
[ 'قطّع' ] [ 'اغسل', 'قشّر', 'قطّع', 'اطبخ', 'قدّم' ]
~~~

[[splice(start, deleteCount, ...items)]]: روح لـ index [[start]]، امسح [[deleteCount]] عنصر، وحط [[items]] مكانهم. وبترجّع **array باللي اتمسح** (مش الـ array الجديدة). الأشكال كلها:

~~~js splice-forms.js
let a = [1, 2, 3, 4, 5];
console.log(a.splice(2), a);
a = [1, 2, 3, 4, 5]; console.log(a.splice(-2, 1), a);
a = [1, 2, 3, 4, 5]; console.log(a.splice(1, 0, "x", "y"), a);
a = [1, 2, 3, 4, 5]; console.log(a.splice(1, 2, "z"), a);
a = [1, 2, 3]; console.log(a.splice(), a);
~~~

~~~text الناتج
[ 3, 4, 5 ] [ 1, 2 ]
[ 4 ] [ 1, 2, 3, 5 ]
[] [
  1, 'x', 'y', 2,
  3, 4,   5
]
[ 2, 3 ] [ 1, 'z', 4, 5 ]
[] [ 1, 2, 3 ]
~~~

| الشكل | بيعمل إيه | بيرجّع |
|---|---|---|
| [[splice(2)]] | يمسح من 2 لآخرها (قص) | اللي اتمسح [[[3, 4, 5]]] |
| [[splice(-2, 1)]] | يمسح عنصر واحد من تاني واحد من الآخر | [[[4]]] |
| [[splice(1, 0, "x", "y")]] | **إضافة** في النص: يمسح صفر ويحط | [[[]]] فاضية |
| [[splice(1, 2, "z")]] | **استبدال**: يمسح ٢ ويحط ١ مكانهم | [[[2, 3]]] |
| [[splice()]] | ولا حاجة | [[[]]] |

**الاسم:** [[splice]] (لصق حبلين) غير [[slice]] (شريحة). [[slice]] بتقرا، و [[splice]] بتعدّل. وباراميتر [[splice]] التاني **عدد** مش مكان نهاية زي [[slice]].

---

## ٢. Array.prototype.toSpliced: نفس الكلام في نسخة

~~~js to-spliced.js
const t = [1, 2, 3, 4, 5];
console.log(t.toSpliced(2), t.toSpliced(-2, 1), t.toSpliced(1, 0, "x"), t);
~~~

~~~text الناتج
[ 1, 2 ] [ 1, 2, 3, 5 ] [ 1, 'x', 2, 3, 4, 5 ] [ 1, 2, 3, 4, 5 ]
~~~

نفس الباراميترز بالظبط، بس بترجّع **الـ array بعد التعديل** (مش اللي اتشال)، و [[t]] زي ما هي. لو محتاج اللي اتشال كمان: [[t.slice(start, start + n)]] قبلها.

---

## ٣. Array.prototype.reverse و Array.prototype.toReversed

~~~js reverse.js
const r = [1, 2, 3];
const r2 = r.reverse();
console.log(r, r2 === r);
const r3 = [1, 2, 3]; console.log(r3.toReversed(), r3, [1, , 3].toReversed(), [1, , 3].reverse());
~~~

~~~text الناتج
[ 3, 2, 1 ] true
[ 3, 2, 1 ] [ 1, 2, 3 ] [ 3, undefined, 1 ] [ 3, <1 empty item>, 1 ]
~~~

- [[reverse()]] بتقلب الأصل **وبترجّعه هو نفسه** ([[r2 === r]] بـ [[true]]). ده بيخدع: [[const reversed = arr.reverse()]] شكلها نسخة، وهي مش نسخة.
- [[toReversed()]] نسخة مقلوبة والأصل زي ما هو.
- فرق صغير: الـ methods الجديدة ([[to*]] و [[with]]) **بتحوّل الفراغات لـ [[undefined]]** حقيقية، والقديمة بتسيبها فراغات.

---

## ٤. Array.prototype.with: نسخة بعنصر واحد متغيّر

~~~js with.js
const w = [10, 20, 30];
console.log(w.with(0, 99), w.with(-1, 0), w);
w.with(3, 1);
~~~

~~~text الناتج
[ 99, 20, 30 ] [ 10, 20, 0 ] [ 10, 20, 30 ]
RangeError: Invalid index : 3
~~~

- [[with(i, v)]] هي النسخة من [[arr[i] = v]]. والسالب من الآخر زي [[at]].
- **الفرق المهم:** [[w[3] = 1]] كانت هتطوّل الـ array وتعمل فراغات بهدوء، أما [[with(3, 1)]] فبترمي [[RangeError: Invalid index : 3]] (ونفس الرسالة لـ [[-4]]). يعني [[with]] بتمسك الـ index الغلط بدري.
- بتترص ورا بعض: [[list.with(0, a).with(1, b)]] (التمرين الرابع بيبدّل عنصرين كده).

---

## ٥. جدول: مين بيعدّل الأصل ومين لأ

ده الجدول اللي هتحتاجه كل يوم. اتطلع بتشغيل حقيقي: كل method اتنادت على array متجمّدة بـ [[Object.freeze]]، واللي وقعت بـ [[TypeError]] هي اللي بتحاول تعدّل (التمرين الخامس فيه الكود):

| بتعدّل الأصل (mutating) | نسختها اللي مبتعدّلش | ملاحظة |
|---|---|---|
| [[splice]] | [[toSpliced]] | الأصل بترجّع اللي اتشال، والنسخة بترجّع الـ array الجديدة |
| [[reverse]] | [[toReversed]] | الأصل بترجّع نفس الـ array |
| [[sort]] | [[toSorted]] | درس «sort و toSorted» |
| [[arr[i] = v]] | [[with(i, v)]] | النسخة بترمي RangeError برّه المدى |
| [[push]] و [[unshift]] | [[[...arr, x]]] و [[[x, ...arr]]] | spread |
| [[pop]] و [[shift]] | [[slice(0, -1)]] و [[slice(1)]] | |
| [[fill]] و [[copyWithin]] | (مفيش) | درس «Array: Array.of و fill و copyWithin» |
| [[arr.length = n]] | [[slice(0, n)]] | |

والباقي كله ([[map]] و [[filter]] و [[slice]] و [[concat]] و [[at]] و [[join]] و [[indexOf]] و [[find]]...) مبيعدّلش.

### ليه ده مهم: الـ state المتجمّد

~~~js frozen.js
const state = Object.freeze(["a", "b", "c"]);
console.log(state.toSpliced(0, 1), state.with(1, "B"), state.toReversed());
state.splice(0, 1);
~~~

~~~text الناتج
[ 'b', 'c' ] [ 'a', 'B', 'c' ] [ 'c', 'b', 'a' ]
TypeError: Cannot assign to read only property '0' of object '[object Array]'
~~~

و [[state.push("d")]] بتطلّع [[TypeError: Cannot add property 3, object is not extensible]]. في React الـ state مش متجمّد فعلًا، بس **لازم تعامله كأنه متجمّد**: لو عدّلته بـ [[splice]] أو [[sort]] الـ component مش هيتحدّث (لأن React بيقارن [[===]] والـ array هي هي). عشان كده [[setItems(items.toSpliced(i, 1))]] هي الطريقة الصح.

---

## الخلاصة

| عايز | من غير ما تعدّل | وبتعدّل (لو الـ array بتاعتك) |
|---|---|---|
| تشيل/تحط في النص | [[toSpliced(i, n, ...items)]] | [[splice(i, n, ...items)]] |
| تقلب | [[toReversed()]] | [[reverse()]] |
| تغيّر عنصر | [[with(i, v)]] | [[arr[i] = v]] |
| ترتّب | [[toSorted(fn)]] | [[sort(fn)]] |`,
          lines: [
            R`٤ خطوات وصفة. هنعدّل فيها الأول بالطريقة القديمة اللي بتغيّر الأصل.`,
            R`[[splice(1, 1, "قشّر", "قطّع")]]: روح لـ index 1، امسح عنصر واحد («قطّع»)، وحط «قشّر» و «قطّع» مكانه. وبترجّع array باللي اتمسح.`,
            R`[[removed]] فيها [[[ 'قطّع' ]]]، و [[steps]] نفسها **اتغيّرت** وبقت ٥ خطوات.`,
            R`array تانية بنفس الخطوات، هنشتغل عليها بالـ methods اللي بترجّع نسخ.`,
            R`[[toSpliced]] نفس باراميترز [[splice]]، بس بترجّع الـ array الجديدة كاملة (٥ خطوات) و [[plan]] زي ما هي.`,
            R`[[toReversed()]] نسخة مقلوبة: من «قدّم» لـ «اغسل».`,
            R`[[with(-1, "قدّم سخن")]] نسخة آخر عنصر فيها متغيّر. السالب من الآخر زي [[at]].`,
            R`بيطبع [[plan]] بنفس الـ ٤ خطوات الأصلية، وجنبها التلات نسخ كل واحدة بتعديلها.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[const x = ["a", "b", "c", "d"];]] وبعدين بالترتيب: [[x.splice(1, 2)]] ثم [[x.splice(1, 0, "M")]] ثم [[x.splice(-1)]]. اكتب اللي بيرجع من كل واحدة و [[x]] بعدها (من قسم ١ في الشرح).`, done: R`كتبت [[['b','c']]] و [[['a','d']]]، ثم [[[]]] و [[['a','M','d']]]، ثم [[['d']]] و [[['a','M']]].`, sol: R`~~~js predict.js
const x = ["a", "b", "c", "d"];
console.log(x.splice(1, 2), x);
console.log(x.splice(1, 0, "M"), x);
console.log(x.splice(-1), x);
~~~

~~~text الناتج
[ 'b', 'c' ] [ 'a', 'd' ]
[] [ 'a', 'M', 'd' ]
[ 'd' ] [ 'a', 'M' ]
~~~

- كل [[splice]] بتشتغل على **ناتج اللي قبلها** لأنها بتعدّل نفس الـ array.
- الإضافة ([[deleteCount]] = 0) بترجّع [[[]]] لأن مفيش حاجة اتشالت. ناس كتير بتتوقع إنها بترجّع الـ array الجديدة.
- [[splice(-1)]] من غير عدد = امسح من آخر عنصر لآخرها، يعني آخر عنصر بس.` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[removeById(list, id)]] لقايمة مهام immutable: ترجّع array جديدة من غير المهمة اللي ليها الـ [[id]] ده، والأصل ميتغيّرش. ولو الـ [[id]] مش موجود ترجّع نسخة زي ما هي. **فخ:** جرّب الأول [[list.toSpliced(list.findIndex(...), 1)]] على [[id]] مش موجود وشوف شالت إيه. حلّها في المربع اللي تحت.`, done: R`كل الاختبارات عدّت، وشفت إن النسخة الساذجة شالت **آخر مهمة** لما الـ id مش موجود.`, sol: R`~~~js remove-by-id.js
function removeByIdBad(list, id) { return list.toSpliced(list.findIndex(t => t.id === id), 1); }
function removeById(list, id) {
  const i = list.findIndex(t => t.id === id);
  return i === -1 ? list.slice() : list.toSpliced(i, 1);
}
const todos = [{ id: 1, t: "اشتري عيش" }, { id: 2, t: "ذاكر" }, { id: 3, t: "نام" }];
console.log(removeByIdBad(todos, 9).map(t => t.id), removeById(todos, 9).map(t => t.id), removeById(todos, 2).map(t => t.id), todos.length);
~~~

~~~text الناتج
[ 1, 2 ] [ 1, 2, 3 ] [ 1, 3 ] 3
~~~

- **الفخ:** [[findIndex]] بترجّع [[-1]] لما مش لاقية، و [[toSpliced(-1, 1)]] معناها «امسح آخر عنصر» (السالب من الآخر). فالمهمة رقم 3 اتمسحت غلط من غير أي error. نفس الفخ مع [[splice]] و [[with]] و [[at]].
- التصليح: افحص [[-1]] صراحة قبل ما تبعته لأي method بتقبل السالب.
- [[filter(t => t.id !== id)]] حل تاني صح وأقصر (ومبيقعش في الفخ)، بس بيلف على الكل ولو فيه أكتر من مهمة بنفس الـ id بيشيلهم كلهم.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[const top = scores.sort((a, b) => a - b).reverse();]] بيطلّع الترتيب من الأكبر صح، بس بعدها شاشة «كل الدرجات بترتيب التسجيل» بقت مترتبة هي كمان. ليه؟ وصلّحه في سطر واحد (من قسم ٣ و ٥ في الشرح).`, done: R`عرفت إن [[sort]] و [[reverse]] الاتنين عدّلوا [[scores]] وإن [[top === scores]]، والتصليح بـ [[toSorted((a, b) => b - a)]] خلّى [[scores]] [[[70, 95, 80]]].`, sol: R`~~~js top-scores.js
const scores = [70, 95, 80];
const top = scores.sort((a, b) => a - b).reverse();
console.log(top, scores, top === scores);
const scores2 = [70, 95, 80];
const top2 = scores2.toSorted((a, b) => b - a);
console.log(top2, scores2);
~~~

~~~text الناتج
[ 95, 80, 70 ] [ 95, 80, 70 ] true
[ 95, 80, 70 ] [ 70, 95, 80 ]
~~~

- [[sort]] رتّبت [[scores]] نفسها ورجّعتها، و [[reverse]] قلبت نفس الـ array ورجّعتها. فـ [[top]] و [[scores]] **array واحدة**.
- التصليح: [[toSorted]] بدالة مقارنة تنازلي ([[b - a]]) بدل ترتيب تصاعدي وبعدين قلب. سطر واحد، والأصل سليم.` },
            { lvl: 'تحدي', t: R`**ابني:** قايمة مهام متجمّدة بـ [[Object.freeze]] (كل مهمة [[{ t, done }]]). اكتب [[toggle(list, i)]] بتعكس [[done]] للمهمة رقم [[i]]، و [[moveUp(list, i)]] بتبدّل المهمة مع اللي قبلها، والاتنين بيرجّعوا array جديدة بـ [[with]] بس. و [[moveUp]] على أول مهمة بترجّع نفس الـ array (من قسم ٤ في الشرح).`, done: R`[[moveUp(toggle(tasks, 0), 2)]] بيطبع [[أ✓ ج✓ ب]]، و [[tasks]] لسه [[أ ب ج✓]]، ومفيش [[TypeError]] رغم الـ freeze.`, sol: R`~~~js todo.js
function toggle(list, i) { return list.with(i, { ...list[i], done: !list[i].done }); }
function moveUp(list, i) {
  if (i <= 0 || i >= list.length) return list;
  return list.with(i - 1, list[i]).with(i, list[i - 1]);
}
const tasks = Object.freeze([{ t: "أ", done: false }, { t: "ب", done: false }, { t: "ج", done: true }]);
const t2 = toggle(tasks, 0);
const t3 = moveUp(t2, 2);
console.log(t3.map(x => x.t + (x.done ? "✓" : "")).join(" "), tasks.map(x => x.t + (x.done ? "✓" : "")).join(" "), moveUp(tasks, 0) === tasks);
~~~

~~~text الناتج
أ✓ ج✓ ب أ ب ج✓ true
~~~

- [[toggle]]: [[{ ...list[i], done: !list[i].done }]] object جديد للمهمة (عشان المهمة القديمة متتغيّرش هي كمان)، و [[with]] بتحطه في نسخة.
- [[moveUp]]: [[with]] مرتين ورا بعض. التانية بتقرا [[list[i - 1]]] من **الأصل** (مش من النسخة اللي اتعدّلت)، وده اللي بيخلي التبديل صح من غير متغير مؤقت.
- [[if (i <= 0 ...)]] قبل [[with]]: من غيره [[with(-1, ...)]] كانت هتكتب على آخر عنصر.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك واشرحها:** من غير ما تبص على جدول القسم ٥، اكتب سكربت بيجرّب ٢٠ method على [[Object.freeze([3, 1, 2])]] ويقسّمهم لـ «بتعدّل» و «مبتعدّلش» حسب مين بيرمي error. وبعدين اكتب لزميلك في ٣ سطور القاعدة اللي تخليه يعرف من غير ما يجرّب.`, done: R`السكربت طلّع ٩ بتعدّل و ١١ مبتعدّلش، وكتبت قاعدة فيها «[[to]] في الأول أو [[with]] = نسخة».`, sol: R`~~~js classify.js
const names = ["push", "pop", "shift", "unshift", "splice", "sort", "reverse", "fill", "copyWithin", "toSpliced", "toSorted", "toReversed", "with", "slice", "concat", "map", "filter", "at", "join", "indexOf"];
const args = { push: [1], unshift: [1], splice: [0, 1], fill: [0], copyWithin: [0, 1], toSpliced: [0, 1], with: [0, 9], at: [0], join: [], indexOf: [1], map: [x => x], filter: [x => x], sort: [], toSorted: [] };
const mut = [], copy = [];
for (const n of names) {
  const arr = Object.freeze([3, 1, 2]);
  try { arr[n](...(args[n] || [])); copy.push(n); } catch (e) { mut.push(n); }
}
console.log("بتعدّل:", mut.join(" "));
console.log("مبتعدّلش:", copy.join(" "));
~~~

~~~text الناتج
بتعدّل: push pop shift unshift splice sort reverse fill copyWithin
مبتعدّلش: toSpliced toSorted toReversed with slice concat map filter at join indexOf
~~~

- [[arr[n](...)]]: بننادي الـ method باسمها كنص (الأقواس المربعة)، و [[args[n] || []]] باراميترز مناسبة لكل واحدة.
- **الإجابة النموذجية لزميلك:** «٩ بس بيعدّلوا: [[push]] و [[pop]] و [[shift]] و [[unshift]] و [[splice]] و [[sort]] و [[reverse]] و [[fill]] و [[copyWithin]]. أي method اسمها بيبدأ بـ [[to]] أو [[with]] نسخة من واحدة فيهم. والباقي كله بيقرا بس.»` },
          ],
          check: {
            lang: "js",
            starter: R`function removeById(list, id) {
  return list.toSpliced(list.findIndex(t => t.id === id), 1);
}`,
            tests: R`const todos = [{ id: 1, t: "اشتري عيش" }, { id: 2, t: "ذاكر" }, { id: 3, t: "نام" }];
test("بيشيل اللي في النص", () => expect(removeById(todos, 2).map(t => t.id)).toEqual([1, 3]));
test("id مش موجود: مفيش حاجة تتشال", () => expect(removeById(todos, 9).map(t => t.id)).toEqual([1, 2, 3]));
test("الأصل متغيّرش", () => { removeById(todos, 1); expect(todos.length).toBe(3); });
test("بترجّع array جديدة حتى لو مش لاقية", () => expect(removeById(todos, 9) === todos).toBe(false));
test("array فاضية", () => expect(removeById([], 1)).toEqual([]));`,
            solution: R`function removeById(list, id) {
  const i = list.findIndex(t => t.id === id);
  return i === -1 ? list.slice() : list.toSpliced(i, 1);
}`
          },
          flag: "script",
          ref: [
            { t: "MDN: Array.prototype.splice()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice" },
            { t: "MDN: Array.prototype.toSpliced()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced" },
            { t: "MDN: Array.prototype.reverse()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse" },
            { t: "MDN: Array.prototype.toReversed()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed" },
            { t: "MDN: Array.prototype.with()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/with" },
          ],
          pre: ["js/sort و toSorted", "js/Array: at و slice و concat"],
          deep: {
            why: R`أغلب الباجات الغريبة في الـ arrays («الداتا اتغيّرت لوحدها»، «الشاشة متحدّثتش») سببها method عدّلت array مكنتش بتاعتك. الـ methods الجديدة بتخليك تكتب الكود immutable من غير [[slice()]] قبل كل عملية ومن غير ما تفتكر مين بيعدّل ومين لأ.`,
            how: R`[[splice]] بتحسب [[start]] (والسالب من الآخر)، وبتقص [[deleteCount]] لحد الآخر، وبتعمل array باللي هيتشال، وبعدين **بتزحزح** العناصر اللي بعده يمين أو شمال حسب الفرق بين اللي اتشال واللي اتحط، وبتغيّر [[length]]. عشان كده [[splice]] في أول array كبيرة بطيئة زي [[shift]]. [[toSpliced]] بتعمل array جديدة بالطول النهائي وبتنسخ فيها: اللي قبل [[start]]، وبعدين [[items]]، وبعدين اللي بعد الجزء الممسوح. [[with]] بتنسخ الكل وبتغيّر خانة واحدة، وبتفحص الـ index الأول وترمي [[RangeError]]. والنسخ دي دايمًا [[Array]] عادية حتى لو الأصل subclass (درس «Array[Symbol.species] و Symbol.unscopables»)، وبتحوّل الفراغات لـ [[undefined]].`,
            when: R`النسخ ([[toSpliced]] و [[toReversed]] و [[toSorted]] و [[with]]): الـ state في React و Redux، وأي دالة بتستقبل array من برّه، والقيم المشتركة بين أكتر من حتة في الكود. الأصل ([[splice]] و [[reverse]] و [[sort]]): array انت لسه عاملها جوه نفس الدالة ومحدش تاني شايفها، وفي الكود اللي سرعته مهمة جدًا على arrays ضخمة (النسخة بتعمل array جديدة كل مرة). ولو محتاج تدعم متصفحات قبل ٢٠٢٣: [[slice()]] وبعدين الـ method القديمة.`,
            mistakes: R`[[slice]] و [[splice]] متلخبطين. [[splice]] متوقع إنها بترجّع الـ array الجديدة (بترجّع اللي اتشال). [[const b = a.reverse()]] فاكرها نسخة. [[toSpliced(findIndex(...), 1)]] من غير فحص [[-1]] (بيشيل الآخر). [[splice(i, 1)]] جوه [[for]] ماشية لقدام (بيتخطى العنصر اللي بعد اللي اتشال، امشي من الآخر أو استخدم [[filter]]). [[with(length, x)]] متوقع إنها بتزوّد (RangeError).`
          }
        },
        {
          cmd: "Array: Array.of و fill و copyWithin",
          title: "تعمل array بطول معين صح: Array(3) ولا Array.of(3)، وتملاها بـ fill من غير فخ الـ object المشترك، وتنقل حتة جواها بـ copyWithin",
          desc: R`• [[Array(3)]] بتعمل array طولها 3 **فاضية** (فراغات)، أما [[Array.of(3)]] فبتعمل [[[3]]]. ومع أكتر من باراميتر الاتنين زي بعض. عشان كده [[Array.of]] (أو الـ literal [[[...]]]) أأمن.
• [[Array.from({ length: n }, (_, i) => ...)]] الطريقة الصح لـ array بطول معين وكل عنصر محسوب.
• [[fill(value, start, end)]] بتملا الأصل بقيمة واحدة. ولو القيمة object أو array، **نفس الـ object** بيتحط في كل الخانات.
• [[copyWithin(target, start, end)]] بتنسخ حتة من الـ array فوق حتة تانية في نفس الـ array.
و [[fill]] و [[copyWithin]] بيعدّلوا الأصل.`,
          example: R`console.log(Array(3), Array.of(3), Array(3, 4), Array.of(3, 4), Array("3"));
const seats = Array(5).fill("فاضي");
const ids = Array.from({ length: 5 }, (_, i) => i + 1);
const grid = Array.from({ length: 2 }, () => Array(3).fill(0));
grid[0][1] = 1;
console.log(seats, ids, grid);
const last3 = [1, 2, 3, 4, 5].copyWithin(0, 2);
console.log(last3);`,
          try: R`اعمل جدول ضرب ٥×٥ (array فيها ٥ arrays) بـ [[Array.from]] بس، بحيث [[table[2][3]]] = 12 (الصفوف والأعمدة من 1). وبعدين اعمل [[const bad = Array(3).fill([])]] و [[bad[0].push(1)]] واطبع [[bad]].`,
          sol: R`~~~js table.js
const table = Array.from({ length: 5 }, (_, r) => Array.from({ length: 5 }, (_, c) => (r + 1) * (c + 1)));
console.log(table[2][3]);
console.log(table.map(row => row.join("\t")).join("\n"));
const bad = Array(3).fill([]);
bad[0].push(1);
console.log(bad);
~~~

~~~text الناتج
12
1	2	3	4	5
2	4	6	8	10
3	6	9	12	15
4	8	12	16	20
5	10	15	20	25
[ [ 1 ], [ 1 ], [ 1 ] ]
~~~

- [[Array.from({ length: 5 }, (_, r) => ...)]]: الدالة بتتنادى مرة لكل صف وبتاخد الـ index في التاني ([[_]] اسم متعارف عليه لباراميتر مش مستخدم).
- [[table[2][3]]]: الصف التالت (3) × العمود الرابع (4) = 12.
- [[fill([])]] حطت **نفس الـ array** في التلات خانات، فـ [[push]] في واحدة بانت في الكل. القسم ٣ في الشرح.`,
          teach: R`## الفكرة

كتير بتحتاج array بطول معروف قبل ما يبقى عندك العناصر: كراسي قاعة، أيام شهر، خانات لعبة، صفحات. فيه ٤ طرق، وكل واحدة ليها فخ. والدرس كمان فيه [[copyWithin]]: نقل حتة جوه نفس الـ array. النواتج من Node 24.22.

---

## ١. Array.of و [[Array()]]: الفرق في باراميتر واحد

~~~js array-of.js
console.log(Array(3), Array.of(3), Array(3, 4), Array.of(3, 4), Array("3"));
console.log(new Array(2), Array.of(), Array.of(undefined));
Array(-1);
~~~

~~~text الناتج
[ <3 empty items> ] [ 3 ] [ 3, 4 ] [ 3, 4 ] [ '3' ]
[ <2 empty items> ] [] [ undefined ]
RangeError: Invalid array length
~~~

| النداء | النتيجة | ليه |
|---|---|---|
| [[Array(3)]] | ٣ فراغات | **رقم واحد** معناه «الطول»، مش عنصر |
| [[Array.of(3)]] | [[[3]]] | [[Array.of]] كل باراميتر عنصر، دايمًا |
| [[Array(3, 4)]] | [[[3, 4]]] | أكتر من باراميتر = عناصر |
| [[Array("3")]] | [[['3']]] | نص مش رقم = عنصر |
| [[Array(-1)]] و [[Array(2.5)]] | [[RangeError: Invalid array length]] | الطول لازم عدد صحيح موجب |
| [[new Array(2)]] | زي [[Array(2)]] | الـ [[new]] مش فارقة هنا |

**ليه [[Array.of]] موجودة؟** عشان الكود اللي بيعمل array من باراميترز مش عارفهم: [[Array(...values)]] لو [[values]] فيها رقم واحد بالصدفة هتطلع فراغات. في الكود العادي الـ literal [[[3]]] أوضح من الاتنين.

### فخ [[Array(3).map]]

~~~js holes-map.js
console.log(Array(3).map((_, i) => i), [...Array(3)].map((_, i) => i), Array(3).length, 0 in Array(3));
~~~

~~~text الناتج
[ <3 empty items> ] [ 0, 1, 2 ] 3 false
~~~

[[map]] **بتتخطى الفراغات**، فعلى [[Array(3)]] مبتعملش ولا حاجة. [[[...Array(3)]]] بتحوّل الفراغات لـ [[undefined]] حقيقية فـ [[map]] تشتغل. بس الأوضح:

---

## ٢. [[Array.from]]: طول معين وكل عنصر محسوب

~~~js from.js
const ids = Array.from({ length: 5 }, (_, i) => i + 1);
const grid = Array.from({ length: 2 }, () => Array(3).fill(0));
grid[0][1] = 1;
console.log(ids, grid);
console.log(Array.from("سلام"), Array.from(new Set([1, 1, 2])), Array.from({ length: 3 }), Array.from([1, 2, 3], x => x * 2));
~~~

~~~text الناتج
[ 1, 2, 3, 4, 5 ] [ [ 0, 1, 0 ], [ 0, 0, 0 ] ]
[ 'س', 'ل', 'ا', 'م' ] [ 1, 2 ] [ undefined, undefined, undefined ] [ 2, 4, 6 ]
~~~

- [[Array.from(x, fn)]] بتاخد أي حاجة بتتلف (نص، Set، Map) **أو** array-like ([[{ length: 5 }]] object عنده [[length]] بس)، و [[fn(عنصر, index)]] بتتنادى لكل خانة.
- [[{ length: 5 }]] ملوش عناصر، فالعنصر [[undefined]] و [[_]] بنتجاهله، ونستخدم الـ index.
- [[grid]]: الدالة بتتنادى **مرة لكل صف**، فكل صف array مستقلة. عدّلنا [[grid[0][1]]] والصف التاني سليم.
- من غير دالة: [[Array.from({ length: 3 })]] ٣ [[undefined]] حقيقية (مش فراغات).

### [[Array.fromAsync]]: نفس الفكرة لحاجة async

~~~js from-async.js
async function* pages() { yield "صفحة 1"; yield "صفحة 2"; }
Array.fromAsync(pages()).then(r => console.log("fromAsync:", r));
Array.fromAsync([Promise.resolve(1), 2]).then(r => console.log("fromAsync promises:", r));
~~~

~~~text الناتج
fromAsync: [ 'صفحة 1', 'صفحة 2' ]
fromAsync promises: [ 1, 2 ]
~~~

بترجّع **Promise** بالـ array، وبتستنى كل عنصر بالترتيب. مفيدة مع async generators (صفحات API بتيجي واحدة واحدة). التفاصيل في درس «async في loops».

---

## ٣. Array.prototype.fill: املا بقيمة واحدة

~~~js fill.js
const seats = Array(5).fill("فاضي");
console.log(seats);
console.log([1, 2, 3, 4, 5].fill(0, 1, 3), [1, 2, 3, 4, 5].fill(9, -2), Array(3).fill());
~~~

~~~text الناتج
[ 'فاضي', 'فاضي', 'فاضي', 'فاضي', 'فاضي' ]
[ 1, 0, 0, 4, 5 ] [ 1, 2, 3, 9, 9 ] [ undefined, undefined, undefined ]
~~~

- [[fill(value, start, end)]]: من [[start]] لحد **قبل** [[end]] (زي [[slice]])، والسالب من الآخر، ومن غيرهم الكل.
- **بتعدّل الأصل وبترجّعه**، عشان كده [[Array(5).fill(...)]] في سطر واحد بتشتغل.
- [[fill()]] من غير قيمة بتملا [[undefined]]، وده حل تاني لمشكلة الفراغات.

### الفخ: object واحد في كل الخانات

~~~js fill-trap.js
const bad = Array(3).fill([]);
bad[0].push("x");
console.log(bad, bad[0] === bad[2]);
const bad2 = Array(2).fill({ n: 0 });
bad2[0].n = 5;
console.log(bad2);
const good = Array.from({ length: 3 }, () => []);
good[0].push("x");
console.log(good);
~~~

~~~text الناتج
[ [ 'x' ], [ 'x' ], [ 'x' ] ] true
[ { n: 5 }, { n: 5 } ]
[ [ 'x' ], [], [] ]
~~~

[[fill([])]] بيتعمل فيها [[[]]] **مرة واحدة** (قبل ما [[fill]] تتنادى)، وبعدين المؤشر ده بيتحط في التلات خانات. فـ [[bad[0] === bad[2]]] بـ [[true]]. القاعدة: [[fill]] للـ primitives بس (أرقام، نصوص، [[null]]، [[false]])، وللـ objects والـ arrays: [[Array.from({ length: n }, () => [])]] (الدالة بتعمل واحد جديد كل مرة). مشروع «خريطة كراسي السينما» في الوحدة دي وقع في الفخ ده فعلًا.

---

## ٤. Array.prototype.copyWithin: انقل حتة جوه نفس الـ array

~~~js copy-within.js
console.log([1, 2, 3, 4, 5].copyWithin(0, 2));
console.log([1, 2, 3, 4, 5].copyWithin(-2), [1, 2, 3, 4, 5].copyWithin(0, 3, 4), [1, 2, 3, 4, 5].copyWithin(1, 0), ["a", "b", "c", "d"].copyWithin(2, 0, 2));
~~~

~~~text الناتج
[ 3, 4, 5, 4, 5 ]
[ 1, 2, 3, 1, 2 ] [ 4, 2, 3, 4, 5 ] [ 1, 1, 2, 3, 4 ] [ 'a', 'b', 'a', 'b' ]
~~~

[[copyWithin(target, start, end)]]: خد العناصر من [[start]] لحد قبل [[end]]، واكتبها **فوق** العناصر اللي بتبدأ من [[target]]. الطول مبيتغيّرش أبدًا، واللي بيعدّي الآخر بيتقص.

| النداء | اللي اتنسخ | اتكتب فين | النتيجة |
|---|---|---|---|
| [[copyWithin(0, 2)]] | [[3, 4, 5]] | من 0 | [[[3, 4, 5, 4, 5]]]: آخر عنصرين فضلوا زي ما هم |
| [[copyWithin(-2)]] | من 0: [[1, 2]] (اتقص لعنصرين) | آخر خانتين | [[[1, 2, 3, 1, 2]]] |
| [[copyWithin(0, 3, 4)]] | [[4]] بس | خانة 0 | [[[4, 2, 3, 4, 5]]] |
| [[copyWithin(1, 0)]] | [[1, 2, 3, 4]] | من 1 | [[[1, 1, 2, 3, 4]]]: زحزحة يمين خطوة، والنسخ صح حتى لو الحتتين متداخلين |

**إمتى تستخدمها؟** نادرًا في الكود العادي. مكانها الطبيعي الـ typed arrays والـ buffers (صوت، صور، بيانات بالـ bytes). مثال واقعي: «آخر ٥ قراءات» بطول ثابت من غير ما تعمل array جديدة كل مرة:

~~~js readings.js
const buf = [10, 20, 30, 40];
buf.copyWithin(0, 1);
buf[buf.length - 1] = 50;
console.log(buf);
~~~

~~~text الناتج
[ 20, 30, 40, 50 ]
~~~

زحزحنا الكل خطوة لشمال (الأقدم اتمسح)، وكتبنا الجديد في الآخر. التمرين الرابع بيبني عليها.

---

## الخلاصة

| عايز | اكتب | ملاحظة |
|---|---|---|
| array من عناصر | [[[a, b]]] أو [[Array.of(a, b)]] | [[Array(n)]] برقم واحد = طول فاضي |
| طول n وكل عنصر محسوب | [[Array.from({ length: n }, (_, i) => ...)]] | الطريقة المعتمدة |
| طول n بقيمة واحدة primitive | [[Array(n).fill(v)]] | بتعدّل وبترجّع نفس الـ array |
| طول n وكل خانة array أو object | [[Array.from({ length: n }, () => [])]] | مش [[fill([])]] |
| من حاجة async | [[await Array.fromAsync(x)]] | بترجّع Promise |
| تنقل حتة جوه نفس الـ array | [[copyWithin(target, start, end)]] | الطول ثابت، وبتعدّل الأصل |`,
          lines: [
            R`المقارنة كلها في سطر: [[Array(3)]] طول ٣ فاضي، و [[Array.of(3)]] عنصر واحد قيمته 3، ومع رقمين الاتنين زي بعض، و [[Array("3")]] نص فبقى عنصر.`,
            R`[[Array(5)]] ٥ خانات فاضية، و [[fill("فاضي")]] بتملاهم كلهم بنفس النص وترجّع نفس الـ array.`,
            R`[[Array.from]] على object طوله 5، والدالة بتاخد الـ index وترجّع [[i + 1]]، فـ [[[1, 2, 3, 4, 5]]].`,
            R`جدول صفين: الدالة الخارجية بتتنادى مرة لكل صف، فكل صف [[Array(3).fill(0)]] **مستقل**.`,
            R`بنعدّل خانة في الصف الأول بس، عشان نتأكد إن الصف التاني متأثرش.`,
            R`بيطبع الكراسي، والأرقام، والجدول: [[[ [ 0, 1, 0 ], [ 0, 0, 0 ] ]]].`,
            R`[[copyWithin(0, 2)]]: انسخ من index 2 لآخرها ([[3, 4, 5]]) واكتبهم فوق أول الـ array، والطول ثابت 5.`,
            R`بيطبع [[[ 3, 4, 5, 4, 5 ]]]: آخر خانتين فضلوا زي ما هم لأن مفيش حاجة اتكتبت فوقهم.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اكتب ناتج [[Array(3).length]] و [[Array.of(3).length]] و [[[3].length]] و [[Array(3).map(() => "x")]] و [[Array.from({ length: 3 }, () => "x")]] قبل ما تشغّل (من قسم ١ و ٢ في الشرح).`, done: R`كتبت 3 و 1 و 1، وعرفت إن [[map]] على [[Array(3)]] بترجّع فراغات، و [[Array.from]] بترجّع [[["x", "x", "x"]]].`, sol: R`~~~js predict.js
console.log(Array(3).length, Array.of(3).length, [3].length, Array(3).map(() => "x"), Array.from({ length: 3 }, () => "x"));
~~~

~~~text الناتج
3 1 1 [ <3 empty items> ] [ 'x', 'x', 'x' ]
~~~

[[Array(3)]] طولها 3 بس مفيهاش عناصر، و [[map]] بتنادي الدالة على العناصر الموجودة بس، فمتندهتش ولا مرة. [[Array.from]] بتنادي الدالة على كل index من 0 لـ [[length - 1]] من غير ما تسأل فيه عنصر ولا لأ.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** جدول أسبوع: [[const week = Array(days.length).fill([]);]] و [[week[0].push("جيم");]]. اليوزر بيشتكي إن «جيم» ظهر في كل الأيام. شغّل، اشرح، وصلّح، وزوّد «كورس» في اليوم التالت بس (من قسم ٣ في الشرح).`, done: R`النسخة البايظة طلّعت «جيم» في التلات أيام، والمصلّحة [[[ [ 'جيم' ], [], [ 'كورس' ] ]]].`, sol: R`~~~js week.js
const days = ["سبت", "أحد", "اتنين"];
const weekBad = Array(days.length).fill([]);
weekBad[0].push("جيم");
console.log(weekBad);
const week = Array.from({ length: days.length }, () => []);
week[0].push("جيم");
week[2].push("كورس");
console.log(week);
~~~

~~~text الناتج
[ [ 'جيم' ], [ 'جيم' ], [ 'جيم' ] ]
[ [ 'جيم' ], [], [ 'كورس' ] ]
~~~

[[fill([])]] بتقيّم [[[]]] **مرة واحدة**، فالتلات أيام بيشاوروا على نفس الـ array. [[Array.from]] بدالة بتعمل array جديدة لكل يوم لأن الدالة نفسها بتتنادى ٣ مرات.` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[range(start, end, step = 1)]] زي بتاعة Python: الأرقام من [[start]] لحد **قبل** [[end]] بخطوة [[step]] (والخطوة ممكن تبقى سالبة أو كسر)، و [[step = 0]] ترمي [[RangeError]]. استخدم [[Array.from]]. حلّها في المربع اللي تحت.`, done: R`[[range(1, 10, 3)]] = [[[1, 4, 7]]]، و [[range(5, 0, -2)]] = [[[5, 3, 1]]]، و [[range(3, 3)]] = [[[]]]، و [[range(0, 5, 0)]] بترمي.`, sol: R`~~~js range.js
function range(start, end, step = 1) {
  if (step === 0) throw new RangeError("step مينفعش يبقى 0");
  const n = Math.max(0, Math.ceil((end - start) / step));
  return Array.from({ length: n }, (_, i) => start + i * step);
}
console.log(range(0, 5), range(1, 10, 3), range(5, 0, -2), range(3, 3), range(0, 1, 0.25));
try { range(0, 5, 0); } catch (e) { console.log(e.constructor.name + ": " + e.message); }
~~~

~~~text الناتج
[ 0, 1, 2, 3, 4 ] [ 1, 4, 7 ] [ 5, 3, 1 ] [] [ 0, 0.25, 0.5, 0.75 ]
RangeError: step مينفعش يبقى 0
~~~

- **العدد قبل الأرقام:** [[(end - start) / step]] كام خطوة، و [[Math.ceil]] عشان الخطوة الناقصة تتحسب ([[9 / 3]] = 3 لكن [[(10 - 1) / 3]] = 3 بالظبط و 10 مش داخلة).
- [[Math.max(0, ...)]]: لو الاتجاه غلط ([[range(5, 0)]] بخطوة موجبة) العدد سالب، و [[Array.from({ length: -2 })]] بترجّع [[[]]]، بس الصراحة أحسن.
- كل عنصر [[start + i * step]] **محسوب من الأول** مش متجمّع ([[x += step]])، عشان أخطاء الكسور ([[0.1 + 0.2]]) متتراكمش.` },
            { lvl: 'تحدي', t: R`**محاكاة:** حسّاس حرارة بيبعت قراية كل دقيقة، وانت عايز متوسط آخر ٥ قرايات بس. اعمل [[temps = Array(5).fill(null)]] و [[addReading(buf, value)]] بـ [[copyWithin]] (من غير [[shift]] ولا array جديدة)، وابعت [[31, 32, 30, 33, 35, 36, 34]] واطبع الـ buffer والمتوسط (من قسم ٤ في الشرح).`, done: R`الـ buffer في الآخر [[[30, 33, 35, 36, 34]]] (آخر ٥ بالترتيب) والمتوسط 33.6، وطول الـ array فضل 5 طول الوقت.`, sol: R`~~~js sensor.js
function addReading(buf, value) {
  buf.copyWithin(0, 1);
  buf[buf.length - 1] = value;
  return buf;
}
const temps = Array(5).fill(null);
for (const v of [31, 32, 30, 33, 35, 36, 34]) addReading(temps, v);
console.log(temps, temps.reduce((s, v) => s + v, 0) / temps.length);
~~~

~~~text الناتج
[ 30, 33, 35, 36, 34 ] 33.6
~~~

- [[copyWithin(0, 1)]]: كل خانة بتاخد قيمة اللي بعدها، فالأقدم (خانة 0) بيتمسح، وآخر خانة بتفضل نسخة مكررة لحد ما نكتب فوقها.
- [[fill(null)]] في الأول مش [[Array(5)]] فاضية، عشان مفيش فراغات (و [[null]] في الجمع بتبقى 0، فقبل ٥ قرايات المتوسط هيبقى غلط: لو محتاجه بدري احسب على اللي مش [[null]] بس).
- ده نفس [[shift]] + [[push]] بالظبط، بس من غير ما الطول يتغيّر. في JavaScript العادي الفرق صغير، بس ده الأسلوب اللي بيتكتب بيه الكود اللي بيتعامل مع صوت أو بيانات بالـ bytes في typed arrays.` },
          ],
          check: {
            lang: "js",
            starter: R`function range(start, end, step = 1) {
  return [];
}`,
            tests: R`test("من 0 لحد قبل 5", () => expect(range(0, 5)).toEqual([0, 1, 2, 3, 4]));
test("خطوة 3", () => expect(range(1, 10, 3)).toEqual([1, 4, 7]));
test("خطوة سالبة", () => expect(range(5, 0, -2)).toEqual([5, 3, 1]));
test("البداية = النهاية", () => expect(range(3, 3)).toEqual([]));
test("اتجاه غلط بيرجّع فاضية", () => expect(range(5, 0)).toEqual([]));
test("خطوة 0 بترمي", () => expect(() => range(0, 5, 0)).toThrow("step"));`,
            solution: R`function range(start, end, step = 1) {
  if (step === 0) throw new RangeError("step مينفعش يبقى 0");
  const n = Math.max(0, Math.ceil((end - start) / step));
  return Array.from({ length: n }, (_, i) => start + i * step);
}`
          },
          flag: "script",
          ref: [
            { t: "MDN: Array.of()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of" },
            { t: "MDN: Array.from()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from" },
            { t: "MDN: Array.fromAsync()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fromAsync" },
            { t: "MDN: Array.prototype.fill()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill" },
            { t: "MDN: Array.prototype.copyWithin()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin" },
          ],
          pre: ["js/array literals و index و length", "js/map و filter و reduce"],
          deep: {
            why: R`أي لعبة أو جدول أو تقويم أو خريطة كراسي بيبدأ بـ «array بطول كذا». والطرق الغلط بتشتغل في أول تجربة وتبوظ بعدين: فراغات [[map]] بتتخطاها، أو object واحد في كل الخانات. لو عرفت [[Array.from({ length })]] و [[fill]] للـ primitives بس، الباجين دول مش هيقابلوك.`,
            how: R`[[Array(n)]] بتعمل object بـ [[length]] = n ومن غير أي مفاتيح أرقام، وده معنى «فراغ». [[Array.of(...items)]] بتعمل array وبتحط كل باراميتر في خانة. [[Array.from(src, fn)]] بتسأل: [[src]] بيتلف عليه ([[Symbol.iterator]])؟ لو أيوه بتلف، لو لأ بتقرا [[length]] و [[src[0]]] لـ [[src[length - 1]]]، وبتنادي [[fn(value, index)]] لكل واحدة. [[fill(v, s, e)]] بتمشي من [[s]] لـ [[e]] وتكتب **نفس القيمة** [[v]] (والقيمة لـ object مؤشر). [[copyWithin]] بتحسب الحدود زي [[slice]] وبتنسخ بالاتجاه الصح (من الآخر لو المصدر قبل الهدف) عشان الحتتين المتداخلين ميبوّظوش بعض. والتلاتة [[Array.of]] و [[Array.from]] بيحترموا الـ subclass: [[MyList.of(1)]] بترجّع [[MyList]].`,
            when: R`[[Array.from({ length: n }, fn)]] لأي array بطول معين، وخصوصًا لو كل عنصر مختلف أو object. [[Array(n).fill(v)]] لما القيمة primitive واحدة (عدّادات صفر، كراسي «فاضي»). [[Array.of]] لما بتبني array من باراميترز مش متأكد من عددها (في مكتبة مثلًا)، وغير كده الـ literal. [[copyWithin]] في الـ buffers وال typed arrays، ونادرًا غير كده. [[Array.fromAsync]] لما المصدر async generator أو array promises وعايز الناتج كله.`,
            mistakes: R`[[Array(5).map(...)]] ومستغرب إنها مبتعملش حاجة. [[Array(3).fill([])]] أو [[fill({})]] (مشترك). [[new Array(n)]] و [[n]] جاية من يوزر سالبة أو كسر (RangeError). [[Array(x)]] و [[x]] ممكن تبقى رقم أو نص (السلوك بيتغيّر). [[copyWithin]] فاكرها بترجّع نسخة (بتعدّل). [[Array.from({ length: n })]] من غير دالة وفاكر إنه هيبقى أرقام.`
          }
        },
        {
          cmd: "Array: flat و flatMap و reduceRight",
          title: "تفرد array جوه array بـ flat، وتحوّل وتفرد في خطوة بـ flatMap، وتجمع من الآخر للأول بـ reduceRight",
          desc: R`• [[flat(depth = 1)]] بترجّع array جديدة الـ arrays اللي جواها اتفردت لحد العمق ده، و [[flat(Infinity)]] لأي عمق، وبتشيل الفراغات.
• [[flatMap(fn)]] = [[map(fn)]] وبعدها [[flat(1)]] في لفة واحدة. فالدالة ترجّع array: عنصر ([[[x]]])، أو كذا عنصر، أو **ولا حاجة** ([[[]]]). يعني بتفلتر وتحوّل وتفرد مع بعض.
• [[reduceRight(fn, init)]] زي [[reduce]] بالظبط بس بتبدأ من **آخر** عنصر. أشهر استخدام: تركيب دوال ([[compose]]) و middleware.
والتلاتة مبيعدّلوش الأصل.`,
          example: R`const orders = [
  { id: 1, items: ["قهوة", "كرواسون"] },
  { id: 2, items: [] },
  { id: 3, items: ["شاي"] },
];
const all = orders.flatMap(o => o.items);
const lines = orders.flatMap(o => o.items.map(item => o.id + ": " + item));
const prices = [120, -1, 80].flatMap(n => (n > 0 ? [Math.round(n * 1.14)] : []));
console.log(all, lines, prices);
const nested = [1, [2, [3, [4] ] ] ];
console.log(nested.flat(), nested.flat(2), nested.flat(Infinity));
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
const addTax = n => n * 1.14, round = n => Math.round(n), fmt = n => n + " ج.م";
console.log(compose(fmt, round, addTax)(99));`,
          try: R`عندك [[const sentences = ["أنا بحب JS", "و CSS كمان"];]]. طلّع كل الكلمات في array واحدة بـ [[flatMap]] و [[split(" ")]]، وبعدين اعمل نفس الحاجة بـ [[map]] وشوف الفرق. وبعدين على [[[[1, 2], [3, [4, 5]]]]] جرّب [[flat()]] و [[flat(Infinity)]].`,
          sol: R`~~~js words.js
const sentences = ["أنا بحب JS", "و CSS كمان"];
console.log(sentences.flatMap(s => s.split(" ")));
console.log(sentences.map(s => s.split(" ")));
const deep = [[1, 2], [3, [4, 5]]];
console.log(deep.flat(), deep.flat(Infinity));
~~~

~~~text الناتج
[ 'أنا', 'بحب', 'JS', 'و', 'CSS', 'كمان' ]
[ [ 'أنا', 'بحب', 'JS' ], [ 'و', 'CSS', 'كمان' ] ]
[ 1, 2, 3, [ 4, 5 ] ] [ 1, 2, 3, 4, 5 ]
~~~

[[map]] رجّعت array فيها arrays (جملة = array كلمات)، و [[flatMap]] فردتهم في مستوى واحد. و [[flat()]] من غير رقم بتفرد مستوى واحد بس، فـ [[[4, 5]]] فضلت متداخلة.`,
          teach: R`## الفكرة

الداتا الحقيقية بتيجي متداخلة: طلبات كل طلب فيه أصناف، ومقالات كل مقال فيه تاجات، وصفحات API كل صفحة فيها نتايج. [[flat]] و [[flatMap]] بيحوّلوها لستة واحدة مسطحة. و [[reduceRight]] أخت [[reduce]] (درس «map و filter و reduce») بس بتبدأ من الآخر. النواتج من Node 24.22.

---

## ١. Array.prototype.flat: افرد مستوى أو أكتر

~~~js flat.js
const nested = [1, [2, [3, [4]]]];
console.log(nested.flat(), nested.flat(2), nested.flat(Infinity));
console.log([1, , 3, [4, , 6]].flat(), [[1, 2], 3].flat(0), [["a"], ["b", ["c"]]].flat());
~~~

~~~text الناتج
[ 1, 2, [ 3, [ 4 ] ] ] [ 1, 2, 3, [ 4 ] ] [ 1, 2, 3, 4 ]
[ 1, 3, 4, 6 ] [ [ 1, 2 ], 3 ] [ 'a', 'b', [ 'c' ] ]
~~~

| النداء | بيفرد كام مستوى | ملاحظة |
|---|---|---|
| [[flat()]] | واحد (الافتراضي) | [[[3, [4] ]]] لسه جوه |
| [[flat(2)]] | اتنين | فاضل [[[4]]] |
| [[flat(Infinity)]] | كله | لما مش عارف العمق |
| [[flat(0)]] | ولا حاجة | نسخة سطحية |
| على فراغات | | **بيشيلها**: [[[1, , 3]]] بقت [[[1, 3]]]. حيلة مفيدة لتنضيف array فيها فراغات |

و [[flat]] بتفرد **arrays بس**: object فيه [[length]] أو نص بيفضل زي ما هو.

---

## ٢. Array.prototype.flatMap: حوّل وافرد في خطوة

~~~js flatmap.js
const all = orders.flatMap(o => o.items);
const lines = orders.flatMap(o => o.items.map(item => o.id + ": " + item));
console.log(all, lines);
~~~

~~~text الناتج
[ 'قهوة', 'كرواسون', 'شاي' ] [ '1: قهوة', '1: كرواسون', '3: شاي' ]
~~~

- الدالة بترجّع **array** لكل طلب: طلب 1 رجّع ٢، وطلب 2 رجّع [[[]]] (اختفى)، وطلب 3 رجّع ١. و [[flatMap]] بتلزقهم في لستة واحدة.
- ده بالظبط [[orders.map(fn).flat()]] بس في لفة واحدة ومن غير array وسطانية.

### ٣ استخدامات في سطر

| الشكل | بيعمل إيه | مثال |
|---|---|---|
| [[x => x.items]] | واحد ← كتير (فرد) | كل الأصناف من كل الطلبات |
| [[x => cond ? [f(x)] : []]] | فلتر + تحويل في لفة | الأسعار الموجبة بس بعد الضريبة |
| [[s => s.split(" ")]] | نص ← كلمات | كل الكلمات من كل الجمل |

~~~js filter-map.js
const prices = [120, -1, 80].flatMap(n => (n > 0 ? [Math.round(n * 1.14)] : []));
console.log(prices, [1, 2, 3].flatMap(n => n % 2 ? n : []));
~~~

~~~text الناتج
[ 137, 91 ] [ 1, 3 ]
~~~

الـ [[-1]] رجّعت [[[]]] فاختفت، والباقي رجّع [[[سعر]]] فاتفرد. ولو رجّعت قيمة مش array (زي [[n]] في التاني) بتتحط زي ما هي.

### بتفرد مستوى واحد بس

~~~js flatmap-depth.js
console.log([1, 2].flatMap(n => [[n, n * 10]]), [1, 2].map(n => [n, n * 10]).flat());
~~~

~~~text الناتج
[ [ 1, 10 ], [ 2, 20 ] ] [ 1, 10, 2, 20 ]
~~~

[[flatMap]] مبتاخدش عمق: لو الدالة رجّعت array جواها array، المستوى الداخلي بيفضل. محتاج أعمق؟ [[map(fn).flat(n)]].

---

## ٣. Array.prototype.reduceRight: من الآخر للأول

~~~js reduce-right.js
console.log(["a", "b", "c"].reduce((s, x) => s + x, ""), ["a", "b", "c"].reduceRight((s, x) => s + x, ""));
console.log([1, 2, 3].reduceRight((acc, x, i) => { acc.push(i + ":" + x); return acc; }, []));
[].reduceRight((a, b) => a + b);
~~~

~~~text الناتج
abc cba
[ '2:3', '1:2', '0:1' ]
TypeError: Reduce of empty array with no initial value
~~~

- نفس [[reduce]] بالظبط (المجمّع، والعنصر، والـ index، والـ array)، والفرق الترتيب بس: آخر عنصر الأول، والـ index بينزل (2 ثم 1 ثم 0).
- ومن غير قيمة بداية على array فاضية: نفس الـ [[TypeError]] بتاع [[reduce]].
- **مش** زي [[toReversed().reduce(...)]] في الأداء: مبتعملش نسخة.

### إمتى الترتيب بيفرق؟ تركيب الدوال

~~~js compose.js
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
const addTax = n => n * 1.14, round = n => Math.round(n), fmt = n => n + " ج.م";
console.log(compose(fmt, round, addTax)(99));
~~~

~~~text الناتج
113 ج.م
~~~

[[compose(fmt, round, addTax)]] بيتقري زي الرياضة: [[fmt(round(addTax(99)))]]. يعني آخر دالة في اللستة هي **أول** واحدة تشتغل، و [[reduceRight]] بتمشي بالظبط بالترتيب ده: [[addTax(99)]] = 112.86، وبعدين [[round]] = 113، وبعدين [[fmt]]. لو استخدمت [[reduce]] كان هيعمل [[fmt]] الأول ويبعت نص لـ [[addTax]].

ونفس الفكرة في الـ middleware (Express و Redux): كل middleware بيلف اللي بعده، فبتبني السلسلة من الآخر (التمرين الرابع فيه مثال كامل).

---

## الخلاصة

| عايز | استخدم |
|---|---|
| تفرد arrays متداخلة | [[flat()]] لمستوى، و [[flat(Infinity)]] للكل |
| تحوّل كل عنصر لكذا عنصر | [[flatMap(x => [...])]] |
| تفلتر وتحوّل في لفة | [[flatMap(x => cond ? [f(x)] : [])]] |
| تشيل الفراغات | [[flat()]] |
| تجمع من الآخر (تركيب دوال، middleware) | [[reduceRight(fn, init)]] |`,
          lines: [
            R`array طلبات، وكل طلب جواه array أصناف. السطر ده بيفتح الـ array.`,
            R`طلب 1 فيه صنفين.`,
            R`طلب 2 مفيهوش ولا صنف ([[[]]]): هنشوف بيختفي إزاي.`,
            R`طلب 3 فيه صنف واحد.`,
            R`قفلة الـ array.`,
            R`[[flatMap(o => o.items)]]: كل طلب بيرجّع الأصناف بتاعته، وكلهم بيتفردوا في لستة واحدة: ٣ أصناف.`,
            R`كل طلب بيرجّع array نصوص فيها رقمه قبل كل صنف، و [[flatMap]] بتفردهم. الطلب الفاضي مطلّعش ولا سطر.`,
            R`فلتر وتحويل في لفة: السعر الموجب بيرجع [[[السعر بعد الضريبة]]]، والسالب بيرجع [[[]]] فيختفي. الناتج [[[137, 91]]].`,
            R`بيطبع التلات نواتج: كل الأصناف في لستة واحدة، وسطور الطلبات بأرقامها، والأسعار بعد الضريبة.`,
            R`array متداخلة ٣ مستويات عشان نجرّب عمق [[flat]].`,
            R`[[flat()]] مستوى واحد، و [[flat(2)]] اتنين، و [[flat(Infinity)]] لحد الآخر: [[[1, 2, 3, 4]]].`,
            R`[[compose]] بتاخد دوال وترجّع دالة: [[reduceRight]] بتبدأ من آخر دالة وتبعت ناتج كل واحدة للي قبلها.`,
            R`٣ دوال صغيرة في سطر: ضريبة ١٤٪، وتقريب، وتنسيق بالجنيه.`,
            R`[[compose(fmt, round, addTax)(99)]] معناها [[fmt(round(addTax(99)))]]: الضريبة الأول وبعدين التقريب وبعدين التنسيق، فالناتج [["113 ج.م"]].`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[const x = [ [1, [2] ], [3] ];]] وبعدين [[x.flat()]] و [[x.flat(Infinity)]] و [[[1, 2].flatMap(n => [n, [n] ])]] (من قسم ١ و ٢ في الشرح).`, done: R`كتبت [[[1, [2], 3]]] و [[[1, 2, 3]]] و [[[1, [1], 2, [2] ]]] قبل التشغيل.`, sol: R`~~~js predict.js
console.log([[1, [2]], [3]].flat(), [[1, [2]], [3]].flat(Infinity), [1, 2].flatMap(n => [n, [n]]));
~~~

~~~text الناتج
[ 1, [ 2 ], 3 ] [ 1, 2, 3 ] [ 1, [ 1 ], 2, [ 2 ] ]
~~~

- [[flat()]] فك الغلاف الأول بس، فـ [[[2]]] فضلت array.
- [[flatMap]] فردت الـ array اللي الدالة رجّعتها ([[[n, [n] ]]]) مستوى واحد، فـ [[[n]]] الداخلية فضلت.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** مقالات من CMS، والتاجات نص مفصول بفواصل ومكتوب بإيد ناس: [["css, layout"]] و [["js,  scope ,js"]] و [[""]]. طلّع لستة كل التاجات متنضفة (من غير مسافات ولا فاضي)، وبعدين من غير تكرار (من قسم ٢ في الشرح).`, done: R`اللستة [[['css', 'layout', 'js', 'scope', 'js']]]، ومن غير تكرار ٤ تاجات، والمقال اللي تاجاته فاضية مطلّعش حاجة.`, sol: R`~~~js tags.js
const posts = [
  { title: "Flexbox", tags: "css, layout" },
  { title: "Closures", tags: "js,  scope ,js" },
  { title: "مسودة", tags: "" },
];
const tags = posts.flatMap(p => p.tags.split(",")).map(t => t.trim()).filter(t => t !== "");
console.log(tags, [...new Set(tags)]);
~~~

~~~text الناتج
[ 'css', 'layout', 'js', 'scope', 'js' ] [ 'css', 'layout', 'js', 'scope' ]
~~~

- [[flatMap(p => p.tags.split(","))]]: كل مقال رجّع array تاجات، وكلهم اتفردوا.
- [[[""].split(",")]] بترجّع [[[""]]] (عنصر فاضي مش array فاضية)، عشان كده [[filter(t => t !== "")]] بعد [[trim]].
- [[new Set]] تشيل التكرار، و [[[...]]] ترجّعها array.` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[expandCart(cart)]] بتحوّل [[[{ name: "قلم", qty: 3 }]]] لـ [[["قلم", "قلم", "قلم"]]] (عنصر لكل قطعة، عشان تطبع ملصق لكل واحدة). الكمية 0 أو سالبة متطلّعش حاجة. استخدم [[flatMap]] و [[fill]]. حلّها في المربع اللي تحت.`, done: R`[[expandCart([{ name: "قلم", qty: 3 }, { name: "كشكول", qty: 0 }, { name: "مسطرة", qty: 1 }])]] بترجّع ٣ أقلام ومسطرة، و [[expandCart([])]] بترجّع [[[]]].`, sol: R`~~~js expand.js
function expandCart(cart) {
  return cart.flatMap(({ name, qty }) => Array(Math.max(0, qty)).fill(name));
}
console.log(expandCart([{ name: "قلم", qty: 3 }, { name: "كشكول", qty: 0 }, { name: "مسطرة", qty: 1 }]), expandCart([]));
~~~

~~~text الناتج
[ 'قلم', 'قلم', 'قلم', 'مسطرة' ] []
~~~

- [[Array(qty).fill(name)]]: array فيها الاسم [[qty]] مرة. والاسم نص (primitive) فـ [[fill]] آمنة هنا.
- [[Math.max(0, qty)]]: [[Array(-1)]] بترمي [[RangeError: Invalid array length]]، فبنخلي السالب 0 (array فاضية تختفي في [[flatMap]]).
- [[({ name, qty })]] destructuring في باراميتر الدالة (درس «object destructuring و spread»).` },
            { lvl: 'تحدي', t: R`**ابني:** middleware زي Express: [[logger]] بيسجّل «قبل» و «بعد»، و [[auth]] بيرجّع [["401"]] لو مفيش [[user]]، و [[handler]] بيرد «أهلا». كل middleware شكله [[next => req => ...]]. ركّبهم بـ [[reduceRight]] بحيث [[logger]] يبقى الأول من برّه، وبعدين جرّب [[reduce]] وقارن اللوج على طلب من غير [[user]] (من قسم ٣ في الشرح).`, done: R`مع [[reduceRight]] الطلب المرفوض اتسجّل في اللوج («logger قبل» و «logger بعد»)، ومع [[reduce]] اللوج فاضي لأن [[auth]] بقى برّه [[logger]].`, sol: R`~~~js middleware.js
const log = [];
const logger = next => req => { log.push("logger قبل"); const r = next(req); log.push("logger بعد"); return r; };
const auth = next => req => (req.user ? next(req) : "401 لازم تسجّل دخول");
const handler = req => "أهلا " + req.user;
const app = [logger, auth].reduceRight((next, mw) => mw(next), handler);
console.log(app({ user: "سارة" }), "|", app({}), "|", log);
const wrong = [logger, auth].reduce((next, mw) => mw(next), handler);
log.length = 0;
console.log(wrong({}), log);
~~~

~~~text الناتج
أهلا سارة | 401 لازم تسجّل دخول | [ 'logger قبل', 'logger بعد', 'logger قبل', 'logger بعد' ]
401 لازم تسجّل دخول []
~~~

- **البناء من الآخر:** [[reduceRight]] بتبدأ بـ [[handler]]، وتلفّه بـ [[auth]]، وبعدين تلف الناتج بـ [[logger]]. فالطلب بيدخل [[logger]] الأول، وبعدين [[auth]]، وبعدين [[handler]]: نفس ترتيب اللستة.
- **مع [[reduce]]:** [[logger]] لفّ [[handler]] الأول، وبعدين [[auth]] لفّ الكل، فـ [[auth]] بقى أول حاجة والطلب المرفوض مدخلش [[logger]] خالص، فاللوج فاضي. يعني الطلبات المرفوضة مش متسجّلة، وده بالظبط اللي محتاجه لو حد بيحاول يخترقك.
- [[log.length = 0]] بتفضّي نفس الـ array (درس «array literals و index و length»).` },
          ],
          check: {
            lang: "js",
            starter: R`function expandCart(cart) {
  return cart.map(item => item.name);
}`,
            tests: R`test("كمية 3 = 3 عناصر", () => expect(expandCart([{ name: "قلم", qty: 3 }])).toEqual(["قلم", "قلم", "قلم"]));
test("الكمية 0 بتختفي", () => expect(expandCart([{ name: "قلم", qty: 1 }, { name: "كشكول", qty: 0 }])).toEqual(["قلم"]));
test("السالب مبيوقعش", () => expect(expandCart([{ name: "قلم", qty: -2 }])).toEqual([]));
test("سلة فاضية", () => expect(expandCart([])).toEqual([]));
test("الترتيب محفوظ", () => expect(expandCart([{ name: "أ", qty: 1 }, { name: "ب", qty: 2 }])).toEqual(["أ", "ب", "ب"]));`,
            solution: R`function expandCart(cart) {
  return cart.flatMap(({ name, qty }) => Array(Math.max(0, qty)).fill(name));
}`
          },
          flag: "script",
          ref: [
            { t: "MDN: Array.prototype.flat()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat" },
            { t: "MDN: Array.prototype.flatMap()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap" },
            { t: "MDN: Array.prototype.reduceRight()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight" },
          ],
          pre: ["js/map و filter و reduce", "js/higher-order functions"],
          deep: {
            why: R`الـ APIs بترجّع داتا متداخلة (طلبات ← أصناف، صفحات ← نتايج، مستخدمين ← صلاحيات)، والواجهة عايزة لستة واحدة. [[flatMap]] بتعمل التحويل والفرد (وكمان الفلترة) في خطوة واحدة واضحة، بدل loop جواه loop و [[push]]. و [[reduceRight]] هي الطريقة الطبيعية لتركيب دوال بالترتيب الرياضي.`,
            how: R`[[flat(d)]] بتلف على العناصر، وكل عنصر هو array (وبتتخطى الفراغات) بتفرده بنداء لنفسها بعمق [[d - 1]]، لحد ما العمق يخلص. [[flatMap(fn)]] بتنادي [[fn(x, i, arr)]] ولو الناتج array بتحط عناصره، وإلا بتحطه هو، ومن غير array وسطانية. [[reduceRight]] بتبدأ [[i]] من [[length - 1]] وتنزل لـ 0، ولو مفيش قيمة بداية بتاخد آخر عنصر كبداية (وترمي [[TypeError]] على array فاضية). والتلاتة بيرجّعوا array جديدة (أو قيمة) والأصل زي ما هو.`,
            when: R`[[flatMap]] لما كل عنصر بيطلّع صفر أو أكتر: أصناف من طلبات، كلمات من جمل، سطور من ملفات، وفلتر وتحويل مع بعض. [[flat]] لما الداتا أصلًا متداخلة (ناتج [[Promise.all]] لصفحات، أو [[map]] رجّع arrays). [[flat(Infinity)]] لما العمق مش معروف (شجرة تعليقات). [[reduceRight]] لـ [[compose]] والـ middleware، ولما الحساب لازم يبدأ من الآخر (رقم من خاناته من اليمين).`,
            mistakes: R`[[flatMap]] متوقع إنها بتفرد أكتر من مستوى. ترجّع [[null]] أو [[undefined]] بدل [[[]]] للعنصر اللي عايزه يختفي (بيتحط [[null]] في الناتج). [[flat()]] على نصوص متوقع إنها تتقطّع حروف (النص مش array). [[reduce]] بدل [[reduceRight]] في [[compose]] (الترتيب بيتعكس). [[flat(Infinity)]] على array فيها نفسها (loop لا نهائي لحد ما الـ stack يخلص).`
          }
        },
        {
          cmd: "Array: lastIndexOf و findLastIndex و forEach",
          title: "تدوّر من الآخر بـ lastIndexOf و findLastIndex، و forEach مبترجّعش حاجة ومبتقفش ومبتستناش await",
          desc: R`• [[lastIndexOf(x, fromIndex)]] زي [[indexOf]] بس بيدوّر من الآخر: مكان **آخر** مرة أو [[-1]]، وبيقارن بـ [[===]].
• [[findLastIndex(fn)]] زي [[findIndex]] بس من الآخر: مكان آخر عنصر الدالة رجّعت فيه true، أو [[-1]]. وأخته [[findLast]] بترجّع العنصر نفسه.
• [[forEach(fn)]] بتنادي الدالة على كل عنصر وبترجّع [[undefined]] دايمًا. [[return]] جواها بيتخطى عنصر واحد بس، و [[break]] مش مسموحة فيها أصلًا، ومبتستناش [[await]].
لو محتاج توقف أو تستنى: [[for...of]] أو [[some]] أو [[find]].`,
          example: R`const events = ["login", "view", "buy", "view", "logout", "login", "view"];
console.log(events.indexOf("view"), events.lastIndexOf("view"), events.lastIndexOf("view", 5), events.lastIndexOf("pay"));
const logs = [{ t: 1, ok: true }, { t: 2, ok: false }, { t: 3, ok: true }, { t: 4, ok: false }];
console.log(logs.findLastIndex(l => !l.ok), logs.findLast(l => !l.ok), logs.findLastIndex(l => l.t > 9));
let total = 0;
const r = [10, 20, 30].forEach(n => { total += n; });
console.log(total, r);
[1, 2, 3, 4].forEach(n => { if (n === 2) return; console.log("forEach", n); });
for (const n of [1, 2, 3, 4]) { if (n === 3) break; console.log("for...of", n); }`,
          try: R`عندك درجات اختبارات طالب بالترتيب: [[[55, 70, 40, 85, 45, 90]]]. اطبع مكان آخر مرة رسب فيها (أقل من 50) بـ [[findLastIndex]] ودرجتها، ومكان آخر 90 بـ [[lastIndexOf]]. وبعدين اكتب [[forEach]] بتطبع الدرجات لحد أول رسوب وتقف، وشوف ليه مش هتعرف، وحلّها بـ [[for...of]].`,
          sol: R`~~~js grades.js
const g = [55, 70, 40, 85, 45, 90];
const i = g.findLastIndex(x => x < 50);
console.log(i, g[i], g.lastIndexOf(90));
g.forEach(x => { if (x < 50) return; console.log("forEach", x); });
for (const x of g) { if (x < 50) break; console.log("for...of", x); }
~~~

~~~text الناتج
4 45 5
forEach 55
forEach 70
forEach 85
forEach 90
for...of 55
for...of 70
~~~

[[return]] في [[forEach]] خرج من نداء الدالة للعنصر ده بس (40 و 45 اتخطوا)، والـ loop كمّلت. [[break]] في [[for...of]] وقفت الـ loop كلها عند 40.`,
          teach: R`## الفكرة

درس «find و some و includes» علّمك تدوّر من الأول ([[indexOf]] و [[find]] و [[findIndex]] و [[findLast]]). هنا التلاتة الباقيين: البحث **من الآخر** (لأن «آخر مرة» سؤال يومي: آخر دخول، آخر خطأ، آخر تعديل)، و [[forEach]] وليه هي أضعف loop عندك. النواتج من Node 24.22.

---

## ١. Array.prototype.lastIndexOf: آخر مكان

~~~js last-index-of.js
const events = ["login", "view", "buy", "view", "logout", "login", "view"];
console.log(events.indexOf("view"), events.lastIndexOf("view"), events.lastIndexOf("view", 5), events.lastIndexOf("pay"));
console.log([1, 2, 1].lastIndexOf(1, -2), [NaN].lastIndexOf(NaN), [1, , 1].lastIndexOf(undefined), [5, 5].lastIndexOf(5, -3));
~~~

~~~text الناتج
1 6 3 -1
0 -1 -1 -1
~~~

| النداء | النتيجة | ليه |
|---|---|---|
| [[indexOf("view")]] | 1 | أول مرة |
| [[lastIndexOf("view")]] | 6 | آخر مرة |
| [[lastIndexOf("view", 5)]] | 3 | ابدأ من 5 وارجع لورا: 5 «login» مش هو، 4 «logout»، 3 لقاه |
| [[lastIndexOf("pay")]] | [[-1]] | مش موجود |
| [[[1, 2, 1].lastIndexOf(1, -2)]] | 0 | [[-2]] يعني ابدأ من index 1 لورا |
| [[[NaN].lastIndexOf(NaN)]] | [[-1]] | [[===]]: زي [[indexOf]] مبتلاقيش [[NaN]] |
| [[[1, , 1].lastIndexOf(undefined)]] | [[-1]] | بيتخطى الفراغات |
| [[[5, 5].lastIndexOf(5, -3)]] | [[-1]] | [[2 - 3 = -1]]، يعني قبل أول الـ array |

---

## ٢. Array.prototype.findLastIndex: آخر واحد بيحقق شرط

~~~js find-last-index.js
const logs = [{ t: 1, ok: true }, { t: 2, ok: false }, { t: 3, ok: true }, { t: 4, ok: false }];
console.log(logs.findLastIndex(l => !l.ok), logs.findLast(l => !l.ok), logs.findLastIndex(l => l.t > 9));
const temps = [30, 35, 41, 38, 42, 36];
const i = temps.findLastIndex(t => t >= 40);
console.log(i, temps[i], temps.findLastIndex((t, idx, arr) => idx > 0 && t < arr[idx - 1]));
~~~

~~~text الناتج
3 { t: 4, ok: false } -1
4 42 5
~~~

- [[findLastIndex(fn)]] بتبدأ من آخر عنصر وتنزل، وأول ما الدالة ترجّع true بترجّع الـ index **وتقف**. ومفيش: [[-1]].
- [[findLast]] (من درس «find و some و includes») نفس الكلام بس بترجّع العنصر. استخدم [[findLastIndex]] لما محتاج المكان: عشان تعدّل فيه بـ [[with]]، أو تشيله بـ [[toSpliced]]، أو تقص بعده بـ [[slice(i + 1)]] («كل اللي حصل بعد آخر خطأ»).
- الدالة بتاخد [[(عنصر, index, array)]]، فتقدر تقارن بالعنصر اللي قبله: آخر مرة الحرارة **نزلت** كانت عند index 5 (36 بعد 42).

### الأربعة مع بعض

| من الأول | من الآخر | بيرجّع |
|---|---|---|
| [[indexOf(x)]] | [[lastIndexOf(x)]] | مكان قيمة معينة ([[===]]) |
| [[findIndex(fn)]] | [[findLastIndex(fn)]] | مكان أول/آخر عنصر بيحقق الشرط |
| [[find(fn)]] | [[findLast(fn)]] | العنصر نفسه أو [[undefined]] |

---

## ٣. Array.prototype.forEach: loop بدالة

~~~js for-each.js
let total = 0;
const r = [10, 20, 30].forEach(n => { total += n; });
console.log(total, r);
["a", "b"].forEach((v, i, arr) => console.log(v, i, arr.length));
[1, , 3].forEach(v => console.log("hole?", v));
const ctx = { prefix: ">>" };
["x"].forEach(function (v) { console.log(this.prefix, v); }, ctx);
~~~

~~~text الناتج
60 undefined
a 0 2
b 1 2
hole? 1
hole? 3
>> x
~~~

- بتنادي الدالة بـ [[(عنصر, index, array)]] لكل عنصر، و**دايمًا بترجّع [[undefined]]** (مش array ولا الـ total). الشغل كله «جانبي» (side effect): تعدّل متغير برّه، أو تطبع، أو تبعت.
- بتتخطى الفراغات.
- الباراميتر التاني [[thisArg]] بيبقى [[this]] جوه دالة عادية (مش arrow). نادر النهارده.

### ليه مبتقفش: [[return]] و [[break]]

~~~js stop.js
[1, 2, 3, 4].forEach(n => { if (n === 2) return; console.log("forEach", n); });
for (const n of [1, 2, 3, 4]) { if (n === 3) break; console.log("for...of", n); }
~~~

~~~text الناتج
forEach 1
forEach 3
forEach 4
for...of 1
for...of 2
~~~

- [[return]] جوه [[forEach]] بيخرج من **الدالة** بتاعة العنصر ده بس، فـ 2 اتخطى والباقي كمّل. يعني [[return]] هنا = [[continue]].
- [[break]] جوه الدالة **مش مسموحة أصلًا**، والملف مبيشتغلش:

~~~text الناتج: node على ملف فيه forEach(n => { if (n === 2) break; })
SyntaxError: Illegal break statement
~~~

- الطريقة الوحيدة توقفها: [[throw]] جوه [[try]]. بتشتغل بس ده استخدام للـ errors في غير مكانها:

~~~js throw.js
try { [1, 2, 3].forEach(n => { if (n === 2) throw new Error("stop"); console.log("قبل", n); }); } catch (e) { console.log("وقفنا بـ throw:", e.message); }
console.log([1, 2, 3, 4].some(n => { console.log("some شاف", n); return n === 2; }));
~~~

~~~text الناتج
قبل 1
وقفنا بـ throw: stop
some شاف 1
some شاف 2
true
~~~

البديل الصح: [[for...of]] بـ [[break]]، أو [[some]] / [[find]] / [[findIndex]] اللي بيقفوا لوحدهم أول ما يلاقوا (اتنين بس اتشافوا).

### ولا بتستنى [[await]]

~~~js async.js
const wait = (ms, v) => new Promise(r => setTimeout(() => r(v), ms));
async function main() {
  const out = [];
  [30, 10, 20].forEach(async ms => { out.push(await wait(ms, ms)); });
  console.log("بعد forEach على طول:", out);
  await wait(50);
  console.log("بعد 50ms:", out);
  const out2 = [];
  for (const ms of [30, 10, 20]) out2.push(await wait(ms, ms));
  console.log("for...of + await:", out2);
}
main();
~~~

~~~text الناتج
بعد forEach على طول: []
بعد 50ms: [ 10, 20, 30 ]
for...of + await: [ 30, 10, 20 ]
~~~

- [[forEach]] نادت الـ ٣ دوال الـ async، وكل واحدة رجّعت Promise، و [[forEach]] **رمت الـ Promises** (هي مبترجّعش حاجة) وخلصت على طول. فالسطر اللي بعدها لقى [[out]] فاضية.
- بعد 50ms اتملت، بس **بترتيب الخلصان** (10 ثم 20 ثم 30) مش ترتيب اللستة.
- [[for...of]] مع [[await]] بتستنى كل واحد بالدور والترتيب محفوظ. ولو عايزهم بالتوازي: [[await Promise.all(list.map(async ...))]] (درس «async في loops»).

---

## الخلاصة

| عايز | استخدم | مش |
|---|---|---|
| آخر مكان لقيمة | [[lastIndexOf(x)]] | [[toReversed().indexOf(x)]] (نسخة، والمكان مقلوب) |
| آخر عنصر بيحقق شرط ومكانه | [[findLastIndex(fn)]] و [[findLast(fn)]] | [[filter(fn).at(-1)]] (بيلف على الكل) |
| تلف بس (طباعة، إرسال) | [[for...of]] أو [[forEach]] | [[map]] من غير ما تستخدم الناتج |
| تلف وتقف بدري | [[for...of]] + [[break]]، أو [[some]] / [[find]] | [[forEach]] + [[throw]] |
| تلف بـ [[await]] | [[for...of]] أو [[Promise.all]] | [[forEach(async ...)]] |`,
          lines: [
            R`لوج أحداث يوزر بالترتيب، فيه [["view"]] ٣ مرات و [["login"]] مرتين.`,
            R`أول [["view"]] عند 1، وآخر واحد عند 6، ولو بدأت لورا من 5 هتلاقيه عند 3، و [["pay"]] مش موجود فـ [[-1]].`,
            R`لوج عمليات، والـ [[ok: false]] عند [[t]] 2 و 4.`,
            R`[[findLastIndex]] بيلاقي آخر عملية فاشلة عند index 3، و [[findLast]] بيرجّعها هي نفسها، والشرط اللي محدش بيحققه بيرجّع [[-1]].`,
            R`متغير برّه هنجمع فيه، لأن [[forEach]] مبترجّعش ناتج.`,
            R`[[forEach]] بتنادي الدالة على كل رقم والدالة بتزوّد [[total]]. وبنشيل اللي [[forEach]] رجّعته في [[r]] عشان نشوفه.`,
            R`[[total]] بقى 60، و [[r]] بـ [[undefined]]: [[forEach]] دايمًا بترجّع [[undefined]].`,
            R`[[return]] لما [[n]] بـ 2 خرج من نداء العنصر ده بس، فاتطبع 1 و 3 و 4: يعني [[return]] هنا شغالة زي [[continue]].`,
            R`نفس الفكرة بـ [[for...of]]: [[break]] عند 3 وقفت الـ loop كلها، فاتطبع 1 و 2 بس.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[const s = [3, 7, 3, 9, 7];]]. اكتب: [[s.lastIndexOf(7)]] و [[s.lastIndexOf(3, 1)]] و [[s.lastIndexOf(3, -4)]] و [[s.findLastIndex(n => n < 5)]] و [[s.findLastIndex(n => n > 100)]] (من قسم ١ و ٢ في الشرح).`, done: R`كتبت 4 و 0 و 0 و 2 و [[-1]] وفهمت ليه [[-4]] بقت index 1.`, sol: R`~~~js predict.js
const s = [3, 7, 3, 9, 7];
console.log(s.lastIndexOf(7), s.lastIndexOf(3, 1), s.lastIndexOf(3, -4), s.findLastIndex(n => n < 5), s.findLastIndex(n => n > 100));
~~~

~~~text الناتج
4 0 0 2 -1
~~~

- [[lastIndexOf(3, 1)]]: يبدأ من index 1 (7) ويرجع لورا، فيلاقي 3 عند 0.
- [[-4]]: [[5 - 4 = 1]]، فنفس اللي فوق.
- [[findLastIndex(n => n < 5)]]: من الآخر 7 ثم 9 ثم 3 عند index 2.` },
            { lvl: 'تطبيق', t: R`**مسألة:** محرر نصوص فيه تاريخ تنسيقات [[["bold", "italic", "bold", "color"]]]. اكتب [[removeLast(history, action)]] بتشيل **آخر** مرة اتعمل فيها [[action]] ده وترجّع array جديدة، والأصل ميتغيّرش، ولو مش موجود ترجّع نسخة زي ما هي. حلّها في المربع اللي تحت.`, done: R`[[removeLast(h, "bold")]] بترجّع [[["bold", "italic", "color"]]] (التانية اتشالت مش الأولى)، و [[removeLast(h, "underline")]] بترجّع نسخة كاملة، و [[h]] زي ما هي.`, sol: R`~~~js remove-last.js
function removeLast(history, action) {
  const i = history.lastIndexOf(action);
  return i === -1 ? history.slice() : history.toSpliced(i, 1);
}
const h = ["bold", "italic", "bold", "color"];
console.log(removeLast(h, "bold"), removeLast(h, "underline"), h);
~~~

~~~text الناتج
[ 'bold', 'italic', 'color' ] [ 'bold', 'italic', 'bold', 'color' ] [ 'bold', 'italic', 'bold', 'color' ]
~~~

- [[lastIndexOf]] بيدّي مكان آخر [[bold]] (2) مش الأول (0).
- فحص [[-1]] قبل [[toSpliced]]: من غيره [[toSpliced(-1, 1)]] كانت هتشيل [[color]] (آخر عنصر). نفس فخ درس «Array: splice و toSpliced و toReversed و with».` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[async function saveAll(files) { files.forEach(async f => { await save(f); }); console.log("تم الحفظ:", saved.length); }]] بيطبع «تم الحفظ: 0» دايمًا، رغم إن الملفات بتتحفظ فعلًا بعدها. ليه؟ صلّحه بطريقتين: بالترتيب، وبالتوازي (من قسم ٣ في الشرح).`, done: R`النسخة البايظة طبعت 0، والنسختين المصلحين طبعوا 3، وعرفت إمتى تختار كل واحدة.`, sol: R`~~~js save-all.js
const wait = (ms) => new Promise(r => setTimeout(r, ms));
const saved = [];
async function save(f) { await wait(10); saved.push(f); }
async function badSaveAll(files) { files.forEach(async f => { await save(f); }); console.log("تم الحفظ (غلط):", saved.length); }
async function saveAll(files) { for (const f of files) await save(f); console.log("تم الحفظ:", saved.length); }
async function saveAllParallel(files) { await Promise.all(files.map(save)); console.log("تم الحفظ بالتوازي:", saved.length); }
(async () => {
  await badSaveAll(["a", "b", "c"]);
  await wait(20); saved.length = 0;
  await saveAll(["a", "b", "c"]);
  saved.length = 0;
  await saveAllParallel(["a", "b", "c"]);
})();
~~~

~~~text الناتج
تم الحفظ (غلط): 0
تم الحفظ: 3
تم الحفظ بالتوازي: 3
~~~

- [[forEach]] نادت الـ ٣ دوال الـ async ورمت الـ Promises، فالسطر اللي بعدها اشتغل قبل أي حفظ. و [[await badSaveAll(...)]] من برّه مستنتش حاجة كمان، لأن [[badSaveAll]] نفسها مكانش فيها [[await]] بيستنى الحفظ.
- **بالترتيب** ([[for...of]] + [[await]]): ملف ورا ملف. استخدمه لو الترتيب مهم أو السيرفر مبيستحملش طلبات كتير مع بعض.
- **بالتوازي** ([[Promise.all(files.map(save))]]): الكل يبدأ مع بعض وتستنى الكل. أسرع، ولو واحد فشل الكل بيرفض.` },
            { lvl: 'تحدي', t: R`**refactor وقيس:** فحص صفوف طلب: [[rows.forEach((r, i) => { calls++; if (firstBad === null && !valid(r)) firstBad = i; })]] بيلاقي أول صف بايظ. حوّله لسطر بـ [[findIndex]]، وعدّ الدالة اتنادت كام مرة في الحالتين على [[[{ qty: 2 }, { qty: -1 }, { qty: 5 }, { qty: "x" }]]] (من قسم ٣ في الشرح).`, done: R`الاتنين لقوا index 1، بس [[forEach]] نادت الدالة ٤ مرات و [[findIndex]] مرتين بس.`, sol: R`~~~js first-bad.js
const rows = [{ qty: 2 }, { qty: -1 }, { qty: 5 }, { qty: "x" }];
let calls = 0, firstBad = null;
rows.forEach((r, i) => { calls++; if (firstBad === null && !(Number.isInteger(r.qty) && r.qty > 0)) firstBad = i; });
console.log("forEach:", firstBad, "calls", calls);
calls = 0;
const idx = rows.findIndex(r => { calls++; return !(Number.isInteger(r.qty) && r.qty > 0); });
console.log("findIndex:", idx, "calls", calls);
~~~

~~~text الناتج
forEach: 1 calls 4
findIndex: 1 calls 2
~~~

- [[forEach]] محتاجة متغيرين برّه ([[firstBad]] و الـ flag [[=== null]]) عشان «أول واحد بس»، ومبتقفش فبتلف على الكل.
- [[findIndex]] بتقول المعنى بالاسم، ومفيش متغيرات برّه، وبتقف أول ما تلاقي. على ٤ صفوف الفرق صغير، على ١٠٠ ألف صف الصف البايظ التاني هيخلّيها تقف بعد صفين.` },
          ],
          check: {
            lang: "js",
            starter: R`function removeLast(history, action) {
  return history.filter(a => a !== action);
}`,
            tests: R`const h = ["bold", "italic", "bold", "color"];
test("بيشيل آخر مرة بس", () => expect(removeLast(h, "bold")).toEqual(["bold", "italic", "color"]));
test("مش موجود: نسخة كاملة", () => expect(removeLast(h, "underline")).toEqual(["bold", "italic", "bold", "color"]));
test("مش موجود: مبيشيلش آخر عنصر بالغلط", () => expect(removeLast(["a", "b"], "z")).toEqual(["a", "b"]));
test("الأصل متغيّرش", () => { removeLast(h, "color"); expect(h.length).toBe(4); });
test("بترجّع array جديدة", () => expect(removeLast(h, "x") === h).toBe(false));`,
            solution: R`function removeLast(history, action) {
  const i = history.lastIndexOf(action);
  return i === -1 ? history.slice() : history.toSpliced(i, 1);
}`
          },
          flag: "script",
          ref: [
            { t: "MDN: Array.prototype.lastIndexOf()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf" },
            { t: "MDN: Array.prototype.findLastIndex()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLastIndex" },
            { t: "MDN: Array.prototype.forEach()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach" },
          ],
          pre: ["js/find و some و includes", "js/break و continue", "js/async في loops"],
          deep: {
            why: R`«آخر مرة» سؤال يومي: آخر تسجيل دخول، آخر خطأ في اللوج، آخر تعديل اتعمل عشان تلغيه. ولو كتبته بـ [[toReversed().findIndex(...)]] هتعمل نسخة وتحسب المكان مقلوب وتغلط. و [[forEach]] بتتكتب كتير بس ليها ٣ قيود لو منعرفتهاش بتطلع باجات صامتة: مبترجّعش، ومبتقفش، ومبتستناش.`,
            how: R`[[lastIndexOf(x, from)]] بتبدأ من [[from]] (الافتراضي [[length - 1]]، والسالب [[length + from]]) وتنزل لـ 0، وتقارن بـ [[===]] وتتخطى الفراغات. [[findLastIndex(fn)]] بتنزل من [[length - 1]] وتنادي [[fn(x, i, arr)]] حتى على الفراغات (بتشوفها [[undefined]])، وتقف عند أول true. [[forEach(fn, thisArg)]] بتطلع من 0 لـ [[length - 1]] وتنادي [[fn]] على العناصر الموجودة بس، وبتتجاهل اللي [[fn]] بترجّعه (حتى لو Promise)، والـ loop نفسها جوه المحرك مش في كودك، فـ [[break]] مالهاش loop تكسرها، و [[return]] بيخلّص نداء [[fn]] بس.`,
            when: R`[[lastIndexOf]] لقيمة بسيطة (نص، رقم). [[findLastIndex]] و [[findLast]] لشرط (آخر طلب مدفوع، آخر قراية فوق حد). [[forEach]] لما تلف على الكل عشان side effect (تطبع، تضيف للـ DOM، تبعت event) وانت متأكد إنك مش هتوقف ولا هتستنى. وغير كده [[for...of]] أوضح وأقوى، وكتير من الـ style guides بتفضّلها.`,
            mistakes: R`[[const x = arr.forEach(...)]] (بـ [[undefined]]). [[return]] جوه [[forEach]] متوقع إنه بيوقف. [[break]] جواها (SyntaxError). [[forEach(async ...)]] وبعدها كود متوقع إن الشغل خلص. [[lastIndexOf]] على objects بنفس الشكل (مقارنة مؤشرات). [[findLastIndex]] من غير فحص [[-1]] قبل [[toSpliced]] أو [[with]]. و [[filter(...).at(-1)]] بدل [[findLast]] على لستة كبيرة.`
          }
        },
        {
          cmd: "Array: keys و values و entries و toString",
          title: "تلف بالـ index والقيمة بـ entries، و keys و values و Symbol.iterator، و toString و toLocaleString، و array-likes",
          desc: R`• [[keys()]] و [[values()]] و [[entries()]] بيرجّعوا **iterators** مش arrays: indexes، وقيم، وأزواج [[[i, v]]]. أشهر استخدام: [[for (const [i, v] of arr.entries())]] لما محتاج الرقم والقيمة.
• [[arr[Symbol.iterator]]] هي نفسها [[values]]: ده اللي [[for...of]] و [[[...arr]]] بيستخدموه.
• [[toString()]] زي [[join(",")]]، وهي اللي بتشتغل لوحدها لما الـ array تتحوّل نص ([[[1, 2] + 1]] = [["1,21"]]). و [[toLocaleString(locale)]] كل عنصر بلغته.
• array-like (object عنده [[length]] وأرقام زي [[arguments]] و NodeList): مش بيتلف عليه بـ [[...]]، بس [[Array.from]] بتحوّله.`,
          example: R`const team = ["سارة", "عمر", "منى"];
for (const [i, name] of team.entries()) console.log(i + 1 + ".", name);
console.log([...team.keys()], [...team.values()], team[Symbol.iterator] === team.values);
const prices = [1500, 250.5, 99];
console.log(prices.toString(), String([1, [2, [3] ] ]), prices.toLocaleString("ar-EG"));
const like = { 0: "أ", 1: "ب", length: 2 };
console.log(Array.from(like), Array.prototype.join.call(like, "-"));`,
          try: R`اعمل [[const it = ["أ", "ب", "ج"].entries();]] واطبع [[it.next()]] ٤ مرات. وبعدين اطبع [[[...it]]] واشرح ليه فاضية. وجرّب [[[] + []]] و [[[1, 2] + [3]]] و [[String([null, undefined, 0])]].`,
          sol: R`~~~js iter.js
const it = ["أ", "ب", "ج"].entries();
console.log(it.next(), it.next(), it.next(), it.next());
console.log([...it]);
console.log(JSON.stringify([[] + [], [1, 2] + [3], String([null, undefined, 0])]));
~~~

~~~text الناتج
{ value: [ 0, 'أ' ], done: false } { value: [ 1, 'ب' ], done: false } { value: [ 2, 'ج' ], done: false } { value: undefined, done: true }
[]
["","1,23",",,0"]
~~~

- الـ iterator بيمشي لقدام بس: كل [[next()]] بيدّي الزوج الجاي، وبعد الآخر [[done: true]]. و [[[...it]]] بعدها فاضية لأنه **خلص** ومبيرجعش للأول.
- [[[] + []]]: الاتنين بقوا [[""]] بـ [[toString]]، فنص فاضي. و [[[1, 2] + [3]]] = [["1,2" + "3"]].
- [[null]] و [[undefined]] بيبقوا فاضيين في [[toString]] (زي [[join]])، فـ [[",,0"]].`,
          teach: R`## الفكرة

الـ array عندها ٤ طرق «تتلف» بيها، و ٢ «تتحوّل نص» بيهم. الدرس ده بيفك الحاجات اللي بتشتغل من ورا ضهرك: [[for...of]] بيستخدم إيه؟ ليه [[[1, 2] + 1]] = [["1,21"]]؟ ولما الـ DOM يرجّعلك حاجة شكلها array ومفيهاش [[map]]؟ النواتج من Node 24.22.

---

## ١. Array.prototype.entries: الـ index والقيمة مع بعض

~~~js entries.js
const team = ["سارة", "عمر", "منى"];
for (const [i, name] of team.entries()) console.log(i + 1 + ".", name);
~~~

~~~text الناتج
1. سارة
2. عمر
3. منى
~~~

[[entries()]] بيرجّع iterator بيدّي [[[index, value]]] كل لفة، و [[const [i, name]]] بيفكهم (درس «array destructuring و spread»). ده البديل النضيف لـ [[for (let i = 0; ...)]] لما محتاج الرقم، ولـ [[forEach((name, i) => ...)]] لما محتاج [[break]] أو [[await]].

---

## ٢. Array.prototype.keys و Array.prototype.values و [Symbol.iterator]

~~~js keys-values.js
console.log([...team.keys()], [...team.values()], team[Symbol.iterator] === team.values);
const holes = [1, , 3];
console.log([...holes.keys()], Object.keys(holes), [...holes.entries()]);
console.log(Object.prototype.toString.call(team.values()));
~~~

~~~text الناتج
[ 0, 1, 2 ] [ 'سارة', 'عمر', 'منى' ] true
[ 0, 1, 2 ] [ '0', '2' ] [ [ 0, 1 ], [ 1, undefined ], [ 2, 3 ] ]
[object Array Iterator]
~~~

| النداء | بيدّي | ملاحظة |
|---|---|---|
| [[arr.keys()]] | 0 و 1 و 2 (أرقام) | **بيعدّ الفراغات**، عكس [[Object.keys(arr)]] اللي بيرجّع نصوص للموجود بس |
| [[arr.values()]] | القيم | الفراغ بيطلع [[undefined]] |
| [[arr.entries()]] | [[[i, v]]] | نفس الكلام |
| [[arr[Symbol.iterator]]] | هي [[values]] نفسها | [[=== team.values]] بـ [[true]] |

**[[Symbol.iterator]] ده إيه؟** أي حاجة عندها method بالاسم ده بتتلف بـ [[for...of]] وبتتفرد بـ [[...]] وبتتبعت لـ [[Array.from]] و [[new Set()]]. الـ array عندها، والنص، و Map، و Set. فـ [[for (const x of arr)]] بتنادي [[arr[Symbol.iterator]()]] وتلف على اللي رجع. هتبني واحد بنفسك في مشروع الـ cache الكبير في الوحدة دي.

### الـ iterator بيخلص

~~~js once.js
const it = team.entries();
console.log(it.next(), it.next(), it.next(), it.next());
console.log([...it]);
~~~

~~~text الناتج
{ value: [ 0, 'سارة' ], done: false } { value: [ 1, 'عمر' ], done: false } { value: [ 2, 'منى' ], done: false } { value: undefined, done: true }
[]
~~~

كل [[next()]] بيدّي [[{ value, done }]]. وبعد الآخر بيفضل [[done: true]] للأبد: الـ iterator مبيترجعش. لو محتاج تلف تاني، اطلب واحد جديد ([[team.entries()]] تاني). الـ array نفسها مش iterator، هي «بتعمل» iterators.

---

## ٣. Array.prototype.toString: الـ array كنص

~~~js to-string.js
console.log(prices.toString(), String([1, [2, [3]]]));
console.log([] + [], [1] + [2], [1, 2] == "1,2", [0] == false, [null, undefined].toString(), [1, 2] + 1);
console.log([{ a: 1 }].toString());
~~~

~~~text الناتج
1500,250.5,99 1,2,3
 12 true true , 1,21
[object Object]
~~~

- [[toString()]] = [[join(",")]] بالظبط، والـ arrays المتداخلة بتتفرد كلها (كل واحدة بتنادي [[toString]] بتاعتها).
- **بتشتغل لوحدها** في أي حتة الـ array لازم تبقى نص: [[+]] مع نص أو array، و template literal، و [[==]] مع نص أو رقم، و [[alert(arr)]]. عشان كده [[[] + []]] نص فاضي (أول حاجة في الناتج قبل المسافة)، و [[[1] + [2]]] = [["12"]]، و [[[0] == false]] بـ [[true]] ([[[0]]] ← [["0"]] ← 0).
- الـ objects جواها بتبقى [["[object Object]"]]. عشان تشوف الـ array بجد: [[JSON.stringify(arr)]] أو [[console.log(arr)]].

---

## ٤. Array.prototype.toLocaleString: كل عنصر بلغته

~~~js locale.js
const prices = [1500, 250.5, 99];
console.log(prices.toLocaleString("ar-EG"));
console.log(prices.toLocaleString("en-US", { style: "currency", currency: "EGP" }), prices.toLocaleString("de-DE"));
~~~

~~~text الناتج
١٬٥٠٠,٢٥٠٫٥,٩٩
EGP 1,500.00,EGP 250.50,EGP 99.00 1.500,250,5,99
~~~

- بتنادي [[toLocaleString(locale, options)]] على **كل عنصر** (أرقام وتواريخ بتفهمها، درس «Number: toFixed و toString و toLocaleString»)، وبعدين بتلزقهم بفاصل.
- **الفخ:** الفاصل بين العناصر في Node (V8) فاصلة إنجليزي [[,]] مهما كانت اللغة. فمع [[en-US]] والعملة فيه فواصل آلاف وفواصل عناصر ومحدش يعرف دي إيه، ومع [[de-DE]] الكسر نفسه بيتكتب بفاصلة: [[1.500,250,5,99]] ممكن تتقري ٤ أرقام أو ٣.
- **القاعدة:** متعرضش لستة لليوزر بـ [[toLocaleString]] على الـ array. نسّق كل عنصر لوحده ([[map(n => fmt.format(n))]]) والزقهم بفاصل انت اخترته ([[join("، ")]])، أو استخدم [[Intl.ListFormat]].

---

## ٥. array-likes: شكلها array وهي مش

~~~js array-like.js
const like = { 0: "أ", 1: "ب", length: 2 };
console.log(Array.from(like), Array.prototype.join.call(like, "-"));
[...like];
~~~

~~~text الناتج
[ 'أ', 'ب' ] أ-ب
TypeError: like is not iterable
~~~

**array-like** = أي object عنده [[length]] ومفاتيح أرقام من 0. أشهرهم: [[arguments]] جوه الدوال القديمة، و [[document.getElementsByClassName]] و [[children]] في الـ DOM (HTMLCollection)، والنص نفسه.

| عايز | الطريقة | ليه |
|---|---|---|
| تحوّله array حقيقية | [[Array.from(like)]] أو [[Array.from(like, fn)]] | بتقرا [[length]] والأرقام، ومعاها [[map]] في نفس الخطوة |
| [[[...like]]] | بتشتغل بس لو عنده [[Symbol.iterator]] | الـ object العادي معندوش: [[TypeError: like is not iterable]]. [[arguments]] و NodeList و النصوص عندهم |
| تستعير method من غير تحويل | [[Array.prototype.join.call(like, "-")]] | أغلب methods الـ array شغالة على أي array-like |

~~~js args.js
function f() { return [Array.isArray(arguments), Array.from(arguments), [...arguments]]; }
console.log(f(1, 2));
console.log(Array.from({ length: 3 }), Array.from("😀ب"), "😀ب".length);
~~~

~~~text الناتج
[ false, [ 1, 2 ], [ 1, 2 ] ]
[ undefined, undefined, undefined ] [ '😀', 'ب' ] 3
~~~

[[Array.from]] على نص بتمشي بالـ iterator (حرف حقيقي)، فالإيموجي عنصر واحد رغم إن [[length]] بـ 3 (درس «string و UTF-16: length و codePointAt»).

---

## ٦. الفراغات: مين بيتخطاها ومين لأ

اتجرّب كل واحد على [[[1, , 3]]]:

| الـ methods | بتعمل إيه مع الفراغ | اللي طلع في التجربة |
|---|---|---|
| [[forEach]] و [[map]] و [[filter]] و [[reduce]] و [[some]] و [[every]] | بتتخطاه: الدالة مبتتناداش عليه خالص | [[forEach]] اتنادت مرتين، و [[map]] رجّعت الفراغ زي ما هو |
| [[indexOf]] و [[lastIndexOf]] | بيتخطوه في المقارنة | [[indexOf(undefined)]] بـ [[-1]] |
| [[includes]] و [[find]] و [[findIndex]] و [[findLast]] و [[findLastIndex]] | بيشوفوه [[undefined]] | [[includes(undefined)]] بـ [[true]] و [[findIndex]] بـ 1 |
| [[for...of]] و [[[...arr]]] و [[Array.from]] و [[keys]] و [[values]] و [[entries]] و [[at]] | بيشوفوه [[undefined]] | [[[ 1, undefined, 3 ]]] |
| [[flat]] و [[flatMap]] | بيشيلوه من الناتج | [[[ 1, 3 ]]] |
| [[join]] و [[toString]] | بيبقى خانة فاضية بين فاصلتين | [["1--3"]] و [["1,,3"]] |
| [[toSorted]] و [[toReversed]] و [[toSpliced]] و [[with]] | بيحوّلوه [[undefined]] حقيقية في النسخة | [[toSorted()]] = [[[ 1, 3, undefined ]]]، أما [[sort()]] سابته فراغ في الآخر |

والدرس الأهم: **متعملش فراغات** (درس «array literals و index و length»)، وساعتها الجدول ده كله مش هيفرق معاك.

---

## الخلاصة

| عايز | استخدم |
|---|---|
| تلف بالرقم والقيمة | [[for (const [i, v] of arr.entries())]] |
| الأرقام بس (حتى الفراغات) | [[arr.keys()]] |
| اللي بيستخدمه for...of | [[arr[Symbol.iterator]]]، وهي نفس [[values]] |
| الـ array كنص بفاصلة | [[toString()]] (زي [[join(",")]])، وبتشتغل لوحدها مع [[+]] |
| أرقام بلغة اليوزر | [[map(n => fmt.format(n)).join("، ")]] مش [[toLocaleString]] على الـ array |
| array-like ← array | [[Array.from(x)]] |`,
          lines: [
            R`array ٣ أسامي هنلف عليها بأكتر من طريقة.`,
            R`[[entries()]] بيدّي [[[index, اسم]]] كل لفة، و [[[i, name]]] بيفكهم، و [[i + 1]] عشان الترقيم يبدأ من 1: [[1. سارة]].`,
            R`[[keys()]] الأرقام [[[0, 1, 2]]]، و [[values()]] الأسامي، و [[Symbol.iterator]] هي [[values]] نفسها فـ [[true]].`,
            R`أسعار فيها كسر عشان نشوف التحويل لنص.`,
            R`[[toString()]] = [[1500,250.5,99]]، والمتداخلة اتفردت [[1,2,3]]، و [[toLocaleString("ar-EG")]] كل رقم بالأرقام العربي: [[١٬٥٠٠,٢٥٠٫٥,٩٩]].`,
            R`array-like: object فيه مفاتيح أرقام و [[length]]، من غير ما يبقى array.`,
            R`[[Array.from]] حوّلته array حقيقية [[[ 'أ', 'ب' ]]]، و [[join]] اتستعارت بـ [[call]] واشتغلت عليه زي ما هو: [[أ-ب]].`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اكتب ناتج [[[] + []]] و [[[1, 2] + 1]] و [[String([1, [2, 3] ])]] و [[[0] == false]] و [[[1, 2].toString() === [1, 2].join()]] قبل التشغيل (من قسم ٣ في الشرح).`, done: R`كتبت [[""]] و [["1,21"]] و [["1,2,3"]] و [[true]] و [[true]].`, sol: R`~~~js predict.js
console.log(JSON.stringify([[] + [], [1, 2] + 1, String([1, [2, 3]]), [0] == false, [1, 2].toString() === [1, 2].join()]));
~~~

~~~text الناتج
["","1,21","1,2,3",true,true]
~~~

استخدمنا [[JSON.stringify]] عشان النص الفاضي يبان ([[""]]). كل حاجة هنا هي [[toString]] بتشتغل لوحدها: [[[1, 2] + 1]] بقت [["1,2" + 1]]. و [[join()]] من غير فاصل = فاصلة، فهي و [[toString()]] نفس الحاجة.` },
            { lvl: 'تطبيق', t: R`**ابني:** نتيجة مسابقة [[["سارة", "عمر", "منى"]]]: اطبع كل واحد بميداليته (🥇 و 🥈 و 🥉 من array تانية بنفس الـ index) بـ [[for...of]] و [[entries()]]، ولو المسابقة فيها أكتر من ٣ اللي بعدهم ياخدوا رقمهم. وبعدين اطبع الأرقام من 1 في سطر بـ [[keys()]] (من قسم ١ و ٢ في الشرح).`, done: R`اتطبعت ٣ سطور بالميداليات، وسطر [[1 2 3]].`, sol: R`~~~js medals.js
const winners = ["سارة", "عمر", "منى"];
const medals = ["🥇", "🥈", "🥉"];
for (const [i, name] of winners.entries()) console.log(medals[i] ?? i + 1, name);
console.log([...winners.keys()].map(i => i + 1).join(" "));
~~~

~~~text الناتج
🥇 سارة
🥈 عمر
🥉 منى
1 2 3
~~~

- [[medals[i] ?? i + 1]]: لو الـ index برّه الميداليات ([[undefined]])، [[??]] بتاخد الرقم.
- [[[...winners.keys()]]]: [[keys()]] iterator، فبنفرده array الأول عشان نعمل [[map]] (الـ iterators مالهاش [[map]] في كل البيئات).` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[const links = document.getElementsByTagName("a"); links.map(a => a.textContent)]] بيوقع. اعمل نسخة شبهه في Node: [[{ 0: { text: "الرئيسية" }, 1: { text: "المنتجات" }, 2: { text: "تواصل" }, length: 3 }]]، وجرّب [[[...x]]] و [[x.map]]، وصلّح بسطر واحد (من قسم ٥ في الشرح).`, done: R`شفت الـ errors الاتنين بنصهم، والتصليح [[Array.from(x, n => n.text)]] رجّع ٣ أسامي.`, sol: R`~~~js array-like.js
const fakeNodeList = { 0: { text: "الرئيسية" }, 1: { text: "المنتجات" }, 2: { text: "تواصل" }, length: 3 };
try { console.log([...fakeNodeList]); } catch (e) { console.log(e.constructor.name + ": " + e.message); }
try { fakeNodeList.map(n => n.text); } catch (e) { console.log(e.constructor.name + ": " + e.message); }
console.log(Array.from(fakeNodeList, n => n.text));
~~~

~~~text الناتج
TypeError: fakeNodeList is not iterable
TypeError: fakeNodeList.map is not a function
[ 'الرئيسية', 'المنتجات', 'تواصل' ]
~~~

- الـ object ده array-like: عنده [[length]] وأرقام، بس مش array (مفيهوش [[map]]) ومعندوش [[Symbol.iterator]] (فـ [[...]] بيرفض).
- [[Array.from(x, fn)]] بتقرا [[length]] والأرقام وتحوّل كل عنصر في نفس الخطوة.
- في المتصفح الحقيقي HTMLCollection **بتتلف** ([[[...links]]] شغالة لأن عندها [[Symbol.iterator]])، بس مفيهاش [[map]]، فنفس الحل ([[Array.from(links, a => a.textContent)]]) هو الأأمن.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** [[const it = names.values(); const first = [...it]; const second = [...it];]] و [[second]] فاضية. ليه؟ صلّحه بحيث كل مرة تلف تاخد كل الأسامي (من قسم ٢ في الشرح).`, done: R`عرفت إن الـ iterator خلص بعد أول لفة، والتصليح بدالة بترجّع iterator جديد طلّع الاتنين كاملين.`, sol: R`~~~js iterator-once.js
const names = ["أ", "ب"];
const it = names.values();
console.log([...it], [...it]);
const fresh = () => names.values();
console.log([...fresh()], [...fresh()]);
~~~

~~~text الناتج
[ 'أ', 'ب' ] []
[ 'أ', 'ب' ] [ 'أ', 'ب' ]
~~~

- الـ iterator عنده «مكان» جواه بيتحرك لقدام مع كل [[next()]]. أول [[...]] وصّله للآخر، والتاني لقاه خلصان.
- التصليح: اطلب iterator جديد كل مرة ([[names.values()]] بتعمل واحد جديد). أو ببساطة لف على [[names]] نفسها: الـ array مش iterator، هي بتعمل واحد جديد مع كل [[for...of]].
- نفس الفخ مع [[map.entries()]] و [[set.values()]] و الـ generators.` },
          ],
          flag: "script",
          ref: [
            { t: "MDN: Array.prototype.entries()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries" },
            { t: "MDN: Array.prototype.keys()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys" },
            { t: "MDN: Array.prototype.values()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/values" },
            { t: "MDN: Array.prototype[Symbol.iterator]()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Symbol.iterator" },
            { t: "MDN: Array.prototype.toString()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString" },
            { t: "MDN: Array.prototype.toLocaleString()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString" },
            { t: "MDN: Indexed collections، array-like objects", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections#working_with_array-like_objects" },
          ],
          pre: ["js/for...of و for...in", "js/== و ===", "js/Number: toFixed و toString و toLocaleString"],
          deep: {
            why: R`[[for...of]] و [[...]] و [[Array.from]] بيشتغلوا على حاجة واحدة: الـ iterator. ولو فهمت [[keys]] و [[values]] و [[entries]] و [[Symbol.iterator]] هتفهم ليه Map و Set والنصوص بيتلفوا بنفس الطريقة، وليه iterator بيخلص. والتحويل لنص بيحصل من ورا ضهرك في [[+]] و [[==]] و template literals، وده مصدر نواتج غريبة زي [["1,21"]].`,
            how: R`[[values()]] بترجّع object من نوع Array Iterator جواه مؤشر للـ array و index بيبدأ من 0. كل [[next()]] بيقرا [[length]] **دلوقتي** (فلو زوّدت عناصر وانت بتلف هيشوفها) ويرجّع [[{ value: arr[i], done: false }]] ويزوّد [[i]]، ولما [[i >= length]] بيرجّع [[done: true]] للأبد. [[keys()]] و [[entries()]] نفس الكلام برقم أو زوج. و [[Array.prototype[Symbol.iterator]]] متعرّفة إنها نفس دالة [[values]]. [[toString]] بتنادي [[this.join()]] لو موجودة، وإلا [[Object.prototype.toString]]. و [[toLocaleString]] بتنادي [[toLocaleString(locales, options)]] على كل عنصر مش [[null]] أو [[undefined]] وتلزق بفاصل بيحدده المحرك (V8 بيستخدم [[,]]).`,
            when: R`[[entries()]] في [[for...of]] لما محتاج الرقم والقيمة وممكن توقف أو تستنى. [[keys()]] لما محتاج كل الأماكن حتى الفاضية (نادر). [[Symbol.iterator]] لما بتبني class عايزها تتلف (مشروع الـ cache). [[toString]] نادرًا ما بتناديها بنفسك، بس لازم تعرفها عشان تفهم [[+]] و [[==]]. [[Array.from]] لأي array-like من الـ DOM أو [[arguments]].`,
            mistakes: R`تحفظ iterator في متغير وتلف عليه مرتين. [[console.log("الأسامي: " + arr)]] وفاكر هتطلع زي [[console.log(arr)]] (بتطلع بفواصل ومن غير أقواس، والـ objects [[[object Object]]]). [[arr == "1,2"]] في مقارنة. [[toLocaleString]] على array أرقام عشان تعرضها (الفواصل بتتلخبط). [[[...like]]] على object array-like عادي. [[Object.keys(arr)]] فاكرها بترجّع أرقام (بترجّع نصوص).`
          }
        },
        {
          cmd: "Array[Symbol.species] و Symbol.unscopables",
          title: "لما تورّث من Array: map و filter بيرجّعوا class بتاعتك ولا Array؟ وليه keys و values مبتتشافش جوه with",
          desc: R`حاجتين من «ورا الكواليس» هتقابلهم لما تعمل class بتورّث من Array أو تقرا كود قديم:
• [[Array[Symbol.species]]]: لما [[map]] أو [[filter]] أو [[slice]] تتنادى على subclass (زي [[class Playlist extends Array]])، بتسأل [[this.constructor[Symbol.species]]] تعمل الناتج من أنهي class. الافتراضي الـ class نفسها، فالناتج [[Playlist]] بالـ methods بتاعته. ولو عايز [[Array]] عادية: [[static get [Symbol.species]() { return Array; }]]. والـ methods الجديدة ([[toSorted]] و [[with]]...) بتتجاهله وبترجّع [[Array]] دايمًا. و [[Map[Symbol.species]]] و [[Set[Symbol.species]]] موجودين بس محدش من methods الـ Map والـ Set بيستخدمهم.
• [[Array.prototype[Symbol.unscopables]]]: لستة أسامي methods ([[keys]] و [[values]] و [[at]] و [[flat]]...) مبتتشافش كمتغيرات جوه [[with (arr) {}]]، عشان كود قديم فيه متغير اسمه [[values]] ميبوظش.`,
          example: R`class Playlist extends Array {
  total() { return this.reduce((s, song) => s + song.sec, 0); }
}
const list = Playlist.from([{ sec: 200 }, { sec: 30 }, { sec: 250 }]);
const long = list.filter(s => s.sec > 60);
console.log(long instanceof Playlist, long.total(), Array[Symbol.species] === Array);
class PlainResults extends Array {
  static get [Symbol.species]() { return Array; }
}
const r = PlainResults.from([1, 2, 3]).map(n => n * 2);
console.log(r instanceof PlainResults, Array.isArray(r));
console.log(Object.keys(Array.prototype[Symbol.unscopables]).length, Array.prototype[Symbol.unscopables].includes);`,
          try: R`اعمل [[class Cart extends Array { total() { ... } }]] وفيها سعر كل صنف، وجرّب [[cart.filter(...).total()]] (شغالة؟) و [[cart.toSorted(...).total()]] (شغالة؟). اطبع [[constructor.name]] للاتنين.`,
          sol: R`~~~js cart-class.js
class Cart extends Array {
  total() { return this.reduce((s, i) => s + i.price, 0); }
}
const cart = Cart.of({ name: "قلم", price: 10 }, { name: "كشكول", price: 45 });
const f = cart.filter(i => i.price > 5);
const s = cart.toSorted((a, b) => b.price - a.price);
console.log(f.constructor.name, f.total(), s.constructor.name, typeof s.total);
~~~

~~~text الناتج
Cart 55 Array undefined
~~~

[[filter]] بتحترم الـ species فرجّعت [[Cart]] و [[total()]] شغالة. [[toSorted]] بتتجاهله ورجّعت [[Array]] عادية، فـ [[s.total]] مش موجودة ([[s.total()]] كانت هتوقع بـ [[TypeError: s.total is not a function]]). لو محتاجها: [[Cart.from(cart.toSorted(...))]].`,
          teach: R`## الفكرة

ده درس قصير ومستواه أعلى من باقي الوحدة. مش هتكتب الحاجات دي كل يوم، بس هتقابلها: لما تعمل class بتورّث من [[Array]] (مكتبات كتير بتعمل كده)، ولما تقرا جدول MDN وتلاقي [[Symbol.species]] و [[Symbol.unscopables]] ومش عارف دول إيه. كل النواتج اتجرّبت على Node 24.22.

---

## ١. Array[Symbol.species]: الناتج من أنهي class؟

~~~js species.js
class Playlist extends Array {
  total() { return this.reduce((s, song) => s + song.sec, 0); }
}
const list = Playlist.from([{ sec: 200 }, { sec: 30 }, { sec: 250 }]);
const long = list.filter(s => s.sec > 60);
console.log(long instanceof Playlist, long.total(), Array[Symbol.species] === Array);
~~~

~~~text الناتج
true 450 true
~~~

- [[class Playlist extends Array]]: array عادية بـ method زيادة (درس «extends و super»). و [[Playlist.from]] بتعمل [[Playlist]] مش [[Array]].
- [[list.filter(...)]] رجّعت **[[Playlist]]** (عشان كده [[long.total()]] شغالة = 450). إزاي [[filter]] عرفت؟ سألت [[list.constructor[Symbol.species]]].
- [[Array[Symbol.species]]] getter بيرجّع [[this]]، يعني «الـ class اللي اتسألت». فعلى [[Playlist]] بيرجّع [[Playlist]].

### مين بيسأل ومين لأ

اتجرّب كل واحد على [[Playlist.of(1, 2, 3)]]:

| الـ method | الناتج | بيسأل الـ species؟ |
|---|---|---|
| [[map]] و [[filter]] و [[slice]] و [[splice]] و [[concat]] و [[flat]] و [[flatMap]] | [[Playlist]] | أيوه |
| [[toSorted]] و [[toReversed]] و [[with]] و [[toSpliced]] | [[Array]] | لأ، الجديدة (ES2023) بترجّع [[Array]] دايمًا عن قصد |

### تقفله: [[static get [Symbol.species]()]]

~~~js species-off.js
class PlainResults extends Array {
  static get [Symbol.species]() { return Array; }
}
const r = PlainResults.from([1, 2, 3]).map(n => n * 2);
console.log(r instanceof PlainResults, Array.isArray(r));
~~~

~~~text الناتج
false true
~~~

إمتى تعمل كده؟ لما الـ constructor بتاعك بياخد باراميترز تانية. [[map]] بتعمل الناتج بـ [[new Species(length)]]، فلو الـ constructor بتاعك فاكر أول باراميتر اسم مثلًا، الناتج بيبوظ بهدوء (التمرين التاني بيوريك ده حقيقي: اسم الفريق بقى رقم).

---

## ٢. Map[Symbol.species] و Set[Symbol.species]: موجودين ومحدش بيستخدمهم

~~~js map-set-species.js
class TagSet extends Set {}
class Registry extends Map {}
console.log(Map[Symbol.species] === Map, Set[Symbol.species] === Set, TagSet[Symbol.species] === TagSet);
const u = new TagSet([1]).union(new Set([2]));
console.log(u.constructor.name, new TagSet([1, 2]).difference(new Set([1])).constructor.name);
console.log(Map.groupBy([1], x => x).constructor.name, Registry.groupBy([1], x => x).constructor.name);
~~~

~~~text الناتج
true true true
Set Set
Map Map
~~~

| الاسم | بيرجّع | مين بيستخدمه فعلًا |
|---|---|---|
| [[Map[Symbol.species]]] | الـ class نفسها (زي [[Array]]) | ولا method في Map (مفيش [[map]] ولا [[filter]] على Map). موجود للتوافق ولأي subclass عايز يستخدمه بنفسه |
| [[Set[Symbol.species]]] | الـ class نفسها | ولا method: [[union]] و [[difference]] على [[TagSet]] رجّعوا [[Set]] عادي، و [[Registry.groupBy]] رجّعت [[Map]] |

يعني لو عملت subclass من Set وعايز [[union]] ترجّع نفس النوع، لازم تكتبها بنفسك ([[new TagSet(super.union(other))]] مثلًا). ده قرار متعمد في المواصفة: الـ species اتشافت إنها بتعقّد المحركات وبتفتح ثغرات، فالـ methods الجديدة كلها بطّلت تسأله.

---

## ٣. Array.prototype[Symbol.unscopables]: أسامي مستخبية من [[with]]

[[with (obj) { ... }]] statement قديمة: جواها أي اسم متغير بيتدوّر عليه **في الـ object الأول**. ممنوعة في strict mode وفي ES modules:

~~~text الناتج: node على ملف .mjs فيه with ([]) {}
SyntaxError: Strict mode code may not include a with statement
~~~

بس لسه شغالة في الـ scripts العادية (والـ CommonJS في Node). المشكلة: لما JavaScript زوّدت [[values]] و [[keys]] للـ arrays (٢٠١٥)، أي كود قديم فيه متغير اسمه [[values]] جوه [[with (arr)]] كان هيلاقي الـ method بدل المتغير ويبوظ. الحل: object فيه الأسامي دي، و [[with]] بتتخطاها:

~~~js unscopables.js
const values = "متغير اسمه values";
const keys = "متغير اسمه keys";
const arr = [1, 2];
with (arr) {
  console.log(length, values, keys, join("-"));
}
console.log(Array.prototype[Symbol.unscopables]);
~~~

~~~text الناتج
2 متغير اسمه values متغير اسمه keys 1-2
[Object: null prototype] {
  at: true,
  copyWithin: true,
  entries: true,
  fill: true,
  find: true,
  findIndex: true,
  findLast: true,
  findLastIndex: true,
  flat: true,
  flatMap: true,
  includes: true,
  keys: true,
  toReversed: true,
  toSorted: true,
  toSpliced: true,
  values: true
}
~~~

- جوه [[with (arr)]]: [[length]] و [[join]] اتلقوا على الـ array (مش في اللستة)، أما [[values]] و [[keys]] فاتخطوا ووصلنا للمتغيرات اللي برّه.
- اللستة فيها كل method اتزوّدت بعد ES5 (الـ ١٦ اللي فوق). وده واحد من الأسباب اللي بتخلي إضافة method جديدة للـ arrays صعبة: لازم متكسرش مواقع قديمة.
- **في كودك:** متكتبش [[with]]، ومش هتحتاج [[Symbol.unscopables]]. كفاية تعرف ليه الحاجة دي موجودة لما تشوفها.

---

## الخلاصة

| الاسم | بيعمل إيه | هتحتاجه إمتى |
|---|---|---|
| [[Array[Symbol.species]]] | الـ class اللي [[map]] و [[filter]] و [[slice]] بيعملوا بيها الناتج | subclass من Array: سيبه لو عايز النوع يفضل، و [[return Array]] لو الـ constructor بتاعك مختلف |
| [[Map[Symbol.species]]] و [[Set[Symbol.species]]] | نفس الـ getter | تقريبًا أبدًا: ولا method بتسأله |
| [[Array.prototype[Symbol.unscopables]]] | أسامي مبتتشافش جوه [[with]] | قراية كود قديم بس |`,
          lines: [
            R`class بتورّث من [[Array]]: كل حاجة الـ array بتعملها، وزيادة.`,
            R`method زيادة بتجمع مدة الأغاني بـ [[reduce]] على [[this]] (الـ array نفسها).`,
            R`قفلة الـ class.`,
            R`[[Playlist.from]] بتعمل [[Playlist]] من array عادية.`,
            R`[[filter]] بتسأل [[Symbol.species]] بتاع [[Playlist]] وبتعمل الناتج بيه، فالناتج كمان [[Playlist]].`,
            R`[[true]] (الناتج [[Playlist]])، و [[total()]] شغالة عليه = 450، و [[Array[Symbol.species]]] بيرجّع [[Array]] نفسها.`,
            R`class تانية بتورّث من [[Array]] بس عايزة الناتج [[Array]] عادية.`,
            R`[[static get [Symbol.species]()]] بيرجّع [[Array]]: كده [[map]] و [[filter]] هيعملوا arrays عادية.`,
            R`قفلة الـ class.`,
            R`[[map]] على [[PlainResults]] بتسأل الـ species، فبتعمل الناتج [[Array]] عادية مش [[PlainResults]].`,
            R`الناتج مش [[PlainResults]] ([[false]]) بس array عادية ([[true]]).`,
            R`[[Symbol.unscopables]] على [[Array.prototype]] object فيه 16 اسم، منهم [[includes]] بـ [[true]] (يعني مستخبي من [[with]]).`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** على [[class Playlist extends Array {}]] و [[const p = Playlist.of(1, 2, 3)]]، اكتب [[constructor.name]] لناتج كل واحدة: [[p.map(x => x)]] و [[p.slice()]] و [[p.toSorted()]] و [[p.with(0, 9)]] و [[p.concat()]] و [[p.toSpliced(0, 1)]] (من قسم ١ في الشرح).`, done: R`كتبت [[Playlist]] لـ [[map]] و [[slice]] و [[concat]]، و [[Array]] للتلاتة الجديدة، وشغّلت واتأكدت.`, sol: R`~~~js species-predict.js
class Playlist extends Array {}
for (const m of ["map", "filter", "slice", "splice", "concat", "flat", "flatMap", "toSorted", "toReversed", "with", "toSpliced"]) {
  const args = { map: [x => x], filter: [x => x], slice: [], splice: [0, 1], concat: [], flat: [], flatMap: [x => x], toSorted: [], toReversed: [], with: [0, 9], toSpliced: [0, 1] }[m];
  const out = Playlist.of(1, 2, 3)[m](...args);
  console.log(m.padEnd(10), out.constructor.name);
}
~~~

~~~text الناتج
map        Playlist
filter     Playlist
slice      Playlist
splice     Playlist
concat     Playlist
flat       Playlist
flatMap    Playlist
toSorted   Array
toReversed Array
with       Array
toSpliced  Array
~~~

القاعدة اللي تفتكرها: القديمة (ES5 وبعدها بشوية) بتسأل [[Symbol.species]]، والجديدة (ES2023: [[to*]] و [[with]]) لأ. حتى [[splice]] بترجّع اللي اتشال كـ [[Playlist]].` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[class Team extends Array { constructor(name, ...members) { super(...members); this.name = name; } }]]. [[new Team("الباك", "سارة", "عمر", "منى")]] شغال، بس بعد [[map]] أو [[filter]] الـ [[name]] بقى رقم. شغّل، اشرح ليه، وصلّح بـ [[Symbol.species]] (من قسم ١ في الشرح).`, done: R`شفت [[name: 3]] بعد [[map]] و [[name: 0]] بعد [[filter]]، وعرفت إن [[map]] بتنادي [[new Team(3)]]، والتصليح رجّع arrays عادية من غير [[name]] غلط.`, sol: R`~~~js team.js
class Team extends Array {
  constructor(name, ...members) { super(...members); this.name = name; }
}
const t = new Team("الباك", "سارة", "عمر", "منى");
console.log(t.name, t.length);
const up = t.map(m => m + "!");
console.log(up, up.name, up.length);
const f = t.filter(m => m !== "عمر");
console.log(f, f.name);
class Team2 extends Array {
  static get [Symbol.species]() { return Array; }
  constructor(name, ...members) { super(...members); this.name = name; }
}
const t2 = new Team2("الباك", "سارة", "عمر", "منى");
console.log(t2.map(m => m + "!"), t2.filter(m => m !== "عمر"));
~~~

~~~text الناتج
الباك 3
Team(3) [ 'سارة!', 'عمر!', 'منى!', name: 3 ] 3 3
Team(2) [ 'سارة', 'منى', name: 0 ] 0
[ 'سارة!', 'عمر!', 'منى!' ] [ 'سارة', 'منى' ]
~~~

- [[map]] بتعمل الناتج بـ [[new Team(3)]] (الطول)، فالـ constructor فاكر 3 هو الاسم. و [[filter]] بتعمل [[new Team(0)]] وبتزوّد بـ push، فالاسم بقى 0. مفيش أي error: باج صامت.
- [[static get [Symbol.species]() { return Array; }]]: الـ methods بتعمل [[Array]] عادية بدل [[Team]]، والـ constructor بتاعك مبيتناداش غلط.
- الدرس الأكبر: الـ subclass من [[Array]] لازم الـ constructor بتاعه يقبل نفس باراميترز [[Array]]، أو يقفل الـ species، أو (الأحسن غالبًا) متورّثش أصلًا: اعمل class فيها array كخاصية.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من غير ما تبص على القسم ٢، اعرف بالتجربة: لو عملت [[class TagSet extends Set {}]]، هل [[union]] و [[intersection]] و [[difference]] بيرجّعوا [[TagSet]]؟ وهل [[Registry.groupBy]] (لـ [[class Registry extends Map {}]]) بترجّع [[Registry]]؟ وبعدين اكتب [[union]] بتاعتك اللي بترجّع [[TagSet]].`, done: R`عرفت إن الكل بيرجّع [[Set]] و [[Map]] عادي، و [[TagSet.prototype.union]] بتاعتك رجّعت [[TagSet]] شغال عليه methods الـ subclass.`, sol: R`~~~js tagset.js
class TagSet extends Set {
  union(other) { return new TagSet(super.union(other)); }
  label() { return [...this].join(" · "); }
}
class Registry extends Map {}
const a = new TagSet(["js", "css"]);
console.log(a.intersection(new Set(["js"])).constructor.name, a.difference(new Set(["js"])).constructor.name);
console.log(Registry.groupBy([1, 2], x => x % 2).constructor.name);
const u = a.union(new Set(["git"]));
console.log(u.constructor.name, u.label());
~~~

~~~text الناتج
Set Set
Map
TagSet js · css · git
~~~

- [[intersection]] و [[difference]] رجّعوا [[Set]]: methods الـ Set الجديدة (٢٠٢٤) معمولة إنها متسألش [[Symbol.species]]، رغم إن [[TagSet[Symbol.species]]] موجود.
- [[Registry.groupBy]] (static وراثة) برضه رجّعت [[Map]] عادية.
- [[union]] بتاعتنا: [[super.union(other)]] بتنادي الأصلية وبتلف الناتج في [[new TagSet(...)]] (الـ constructor بتاع Set بياخد أي حاجة بتتلف).` },
          ],
          flag: "script",
          ref: [
            { t: "MDN: Array[Symbol.species]", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Symbol.species" },
            { t: "MDN: Array.prototype[Symbol.unscopables]", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Symbol.unscopables" },
            { t: "MDN: Map[Symbol.species]", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Symbol.species" },
            { t: "MDN: Set[Symbol.species]", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Symbol.species" },
          ],
          pre: ["js/extends و super", "js/class"],
          deep: {
            why: R`أي class بتورّث من [[Array]] (collections في مكتبات، و [[NodeList]] شبه arrays، و Query results في ORMs) بتتأثر بالـ species من غير ما تكتبه: [[map]] و [[filter]] بيرجّعوا نوعك أو [[Array]] حسبه، وده بيفرق بين method موجودة ولا [[TypeError]]. و [[Symbol.unscopables]] بيفسّر ليه إضافة method جديدة للـ arrays محتاجة احتياط عشان الويب القديم ميبوظش.`,
            how: R`[[map]] و [[filter]] و [[slice]] و [[splice]] و [[concat]] و [[flat]] و [[flatMap]] بيعملوا الناتج بخطوة اسمها ArraySpeciesCreate: لو [[this]] مش array عادية، بيقروا [[this.constructor]]، وبعدين [[[Symbol.species]]] عليه، ولو الناتج constructor بيعملوا [[new C(length)]]. والـ getter الافتراضي [[get [Symbol.species]() { return this; }]] متعرّف على [[Array]] و [[Map]] و [[Set]] و [[Promise]] و [[RegExp]] و [[ArrayBuffer]]. الـ methods الجديدة ([[toSorted]] وأخواتها، و methods الـ Set الجديدة، و [[groupBy]]) بتعمل [[Array]] أو [[Set]] أو [[Map]] على طول. و [[with]] بتدوّر على الاسم في الـ object، ولو لقت [[obj[Symbol.unscopables][name]]] بـ [[true]] بتعدّيه وتكمّل في الـ scope اللي برّه.`,
            when: R`سيب الـ species زي ما هو لو الـ subclass بتاعك constructor بتاعه زي [[Array]] بالظبط ومحتاج النوع يفضل بعد [[filter]]. اقفله ([[return Array]]) لو الـ constructor بياخد باراميترز تانية. وفكّر الأول: composition (class فيها [[#items = []]]) غالبًا أبسط من [[extends Array]]. و [[Symbol.unscopables]] مش هتكتبه غير لو بتعمل object هيتستخدم جوه [[with]] في كود قديم.`,
            mistakes: R`subclass من [[Array]] بـ constructor بباراميترز مختلفة ومن غير ما تقفل الـ species (باج صامت). تتوقع [[toSorted]] ترجّع نوعك. تتوقع [[union]] على subclass من Set ترجّع نوعك. تستخدم [[with]] في كود جديد (ممنوعة في strict و modules). تفتكر إن [[Symbol.unscopables]] بيخبي الـ method من [[arr.keys()]] العادية (بيأثر على [[with]] بس).`
          }
        },
        {
          cmd: "Map: كل الـ methods و getOrInsert",
          title: "Map لآخرها: set بالـ chaining، و get و has و delete و clear، والترتيب، والـ iterators، و Map.groupBy، و getOrInsert",
          desc: R`درس «Map و Set» علّمك الأساس. هنا كل الباقي:
• [[set(k, v)]] بترجّع الـ Map نفسها (فتترص)، و [[delete(k)]] بترجّع [[true]] لو كان موجود، و [[clear()]] بتفضّيها، و [[size]] العدد.
• الترتيب = ترتيب **أول** إضافة. [[set]] على مفتاح موجود بتغيّر القيمة بس من غير ما تحرّكه.
• [[keys()]] و [[values()]] و [[entries()]] و [[forEach((value, key) => ...)]] (القيمة الأول!)، و [[map[Symbol.iterator]]] هي [[entries]].
• [[Map.groupBy(arr, fn)]] زي [[Object.groupBy]] بس المفتاح أي نوع (حتى object).
• [[getOrInsert(k, default)]] و [[getOrInsertComputed(k, fn)]]: هات القيمة، ولو مش موجودة حط دي ورجّعها. موجودين في Chrome 157 ولسه مش في Node 24.22، والبديل [[if (!m.has(k)) m.set(k, ...)]].`,
          example: R`const stock = new Map([["قلم", 40], ["كشكول", 12]]);
stock.set("مسطرة", 7).set("قلم", 35);
console.log(stock.get("قلم"), stock.get("ممحاة"), stock.has("كشكول"), stock.size);
console.log(stock.delete("كشكول"), stock.delete("كشكول"));
for (const [item, qty] of stock) console.log(item, qty);
stock.forEach((qty, item) => console.log(item, "←", qty));
console.log([...stock.keys()], [...stock.values()], stock[Symbol.iterator] === stock.entries);
const sales = [{ item: "قلم", qty: 3 }, { item: "مسطرة", qty: 1 }, { item: "قلم", qty: 2 }];
const byItem = Map.groupBy(sales, s => s.item);
console.log(byItem.get("قلم").length, Object.groupBy(sales, s => s.item));
stock.clear();
console.log(stock.size, stock);`,
          try: R`عندك [[const prices = { tea: 15, coffee: 30 };]]. حوّله Map بـ [[Object.entries]]، وزوّد [[juice]] بـ 25 وغيّر [[tea]] لـ 18 في سطر واحد بالـ chaining. اطبع الترتيب (اتغيّر؟). وبعدين رجّعه object بـ [[Object.fromEntries]]، و JSON بـ [[JSON.stringify([...map])]] ورجّعه Map تاني.`,
          sol: R`~~~js convert.js
const prices = { tea: 15, coffee: 30 };
const pm = new Map(Object.entries(prices));
pm.set("juice", 25).set("tea", 18);
console.log([...pm.keys()], pm.get("tea"));
console.log(Object.fromEntries(pm));
const json = JSON.stringify([...pm]);
console.log(json, JSON.stringify(pm), new Map(JSON.parse(json)).get("juice"));
~~~

~~~text الناتج
[ 'tea', 'coffee', 'juice' ] 18
{ tea: 18, coffee: 30, juice: 25 }
[["tea",18],["coffee",30],["juice",25]] {} 25
~~~

- [[tea]] اتغيّرت قيمتها بس فضلت في مكانها الأول: [[set]] على مفتاح موجود مبيحرّكهوش.
- [[JSON.stringify(pm)]] بيطلّع [[{}]]: JSON مبيعرفش Map. الحل [[[...pm]]] (array أزواج) و [[new Map(JSON.parse(...))]] للرجوع.`,
          teach: R`## الفكرة

مخزن أدوات مكتبية: كل صنف وكميته. ده بالظبط شغل Map: مفتاح وقيمة، وإضافة ومسح كتير، والترتيب مهم. النواتج من Node 24.22، ماعدا [[getOrInsert]] و [[getOrInsertComputed]] من Chrome 157 (مكتوب جنبهم).

---

## ١. Map.prototype.set: إضافة وتعديل، وبترجّع الـ Map

~~~js set.js
const stock = new Map([["قلم", 40], ["كشكول", 12]]);
stock.set("مسطرة", 7).set("قلم", 35);
const m = new Map();
console.log(m.set("a", 1) === m, m.get("zz"), m.set("u", undefined).get("u"), m.has("u"), m.has("zz"));
~~~

~~~text الناتج
true undefined undefined true false
~~~

- [[new Map([ [k, v], ... ])]]: بتاخد أي حاجة بتتلف وبتدّي أزواج (array أزواج، أو [[Object.entries(obj)]]، أو Map تانية).
- [[set]] بترجّع **الـ Map نفسها** ([[=== m]] بـ [[true]])، فبتترص: [[set(a).set(b)]].
- **فخ:** [[get("zz")]] و [[get("u")]] الاتنين [[undefined]]: واحد مش موجود وواحد موجود وقيمته [[undefined]]. السؤال الصح [[has]].

---

## ٢. Map.prototype.get و has و Map.prototype.delete و size

~~~js get-has.js
console.log(stock.get("قلم"), stock.get("ممحاة"), stock.has("كشكول"), stock.size);
console.log(stock.delete("كشكول"), stock.delete("كشكول"));
~~~

~~~text الناتج
35 undefined true 3
true false
~~~

| النداء | بيرجّع | ملاحظة |
|---|---|---|
| [[get(k)]] | القيمة أو [[undefined]] | [[stock["قلم"]]] غلط: بيقرا خاصية عادية مش entry |
| [[has(k)]] | [[true]] / [[false]] | الطريقة الوحيدة تفرق «مش موجود» من «قيمته [[undefined]]» |
| [[delete(k)]] | [[true]] لو كان موجود واتمسح، و [[false]] لو مكانش | تقدر تستخدمها كسؤال ومسح في خطوة: [[if (cart.delete(id))]] |
| [[size]] | العدد | خاصية من غير قوسين، و O(1) مش بتعدّ |

---

## ٣. Map.prototype.clear: فضّيها كلها

~~~js clear.js
stock.clear();
console.log(stock.size, stock);
~~~

~~~text الناتج
0 Map(0) {}
~~~

بتمسح كل الـ entries **من نفس الـ Map** (أي حتة شايلاها هتشوفها فاضية)، وبترجّع [[undefined]]. عكس [[stock = new Map()]] اللي بتعمل واحدة جديدة والقديمة لسه عند غيرك.

---

## ٤. Map: الترتيب

~~~js order.js
const o = new Map([["b", 1], ["a", 2]]);
o.set("b", 9);
console.log([...o.keys()]);
o.delete("b"); o.set("b", 9);
console.log([...o.keys()]);
const obj = { b: 1, a: 2, 10: "x", 2: "y" };
const mm = new Map([["b", 1], ["a", 2], [10, "x"], [2, "y"]]);
console.log(Object.keys(obj), [...mm.keys()]);
~~~

~~~text الناتج
[ 'b', 'a' ]
[ 'a', 'b' ]
[ '2', '10', 'b', 'a' ] [ 'b', 'a', 10, 2 ]
~~~

- Map بتلف **بترتيب أول إضافة** دايمًا. [[set]] على مفتاح موجود بيغيّر القيمة ومكانه ثابت.
- عشان تنقل مفتاح للآخر: [[delete]] وبعدين [[set]]. ده أساس الـ LRU cache (مشروع «cache.js» في الوحدة دي).
- الـ object **بيعيد ترتيب** المفاتيح اللي شكلها أرقام: بيحطها الأول ومترتبة (2 قبل 10) وبعدين النصوص بترتيب إضافتها. يعني منيو بـ IDs أرقام في object هيتعرض بترتيب غير اللي حطيته (التمرين الخامس). Map مبتعملش كده.

---

## ٥. Map: keys و values و entries و [Symbol.iterator]

~~~js iterators.js
for (const [item, qty] of stock) console.log(item, qty);
console.log([...stock.keys()], [...stock.values()], stock[Symbol.iterator] === stock.entries);
const ei = new Map([["x", 1]]).entries();
console.log(ei.next(), ei.next(), Object.prototype.toString.call(ei));
~~~

~~~text الناتج
قلم 35
مسطرة 7
[ 'قلم', 'مسطرة' ] [ 35, 7 ] true
{ value: [ 'x', 1 ], done: false } { value: undefined, done: true } [object Map Iterator]
~~~

| الـ method | بيدّي كل لفة | بيرجّع |
|---|---|---|
| [[keys()]] | المفتاح | iterator، و [[[...m.keys()]]] لو عايز array |
| [[values()]] | القيمة | iterator |
| [[entries()]] | [[[key, value]]] | iterator |
| [[m[Symbol.iterator]]] | زي [[entries]] بالظبط (هي نفس الدالة) | ده اللي [[for...of]] و [[[...m]]] و [[new Map(m)]] بيستخدموه |

ونفس قواعد درس «Array: keys و values و entries و toString»: الـ iterator بيخلص بعد لفة، وبيشوف اللي اتضاف وانت بتلف.

---

## ٦. Map.prototype.forEach: القيمة قبل المفتاح

~~~js for-each.js
stock.forEach((qty, item) => console.log(item, "←", qty));
new Map([["k", "v"]]).forEach(function (v, k, map) { console.log(v, k, map.size); });
~~~

~~~text الناتج
قلم ← 35
مسطرة ← 7
v k 1
~~~

الدالة بتاخد **[[(value, key, map)]]**: القيمة الأول، زي [[forEach]] بتاع الـ array ([[(element, index)]]). ناس كتير بتكتب [[(key, value)]] وتطلع النتيجة مقلوبة. لو مش متأكد: [[for (const [key, value] of map)]] أوضح.

---

## ٧. Map.groupBy ولا [[Object.groupBy]]

~~~js group-by.js
const sales = [{ item: "قلم", qty: 3 }, { item: "مسطرة", qty: 1 }, { item: "قلم", qty: 2 }];
const byItem = Map.groupBy(sales, s => s.item);
console.log(byItem.get("قلم").length, Object.groupBy(sales, s => s.item));
const g = Map.groupBy([1, 2, 3, 4, 5], n => (n % 2 ? "فردي" : "زوجي"));
console.log(g);
~~~

~~~text الناتج
2 [Object: null prototype] {
  'قلم': [ { item: 'قلم', qty: 3 }, { item: 'قلم', qty: 2 } ],
  'مسطرة': [ { item: 'مسطرة', qty: 1 } ]
}
Map(2) { 'فردي' => [ 1, 3, 5 ], 'زوجي' => [ 2, 4 ] }
~~~

الاتنين بيمشوا على الـ array، والدالة بترجّع «المجموعة» لكل عنصر، وكل مجموعة array بالعناصر بترتيبها. الفرق في المفتاح:

~~~js group-by-object-key.js
const users = [{ name: "سارة", team: { id: 1 } }, { name: "عمر", team: { id: 2 } }];
const teamA = users[0].team;
users.push({ name: "منى", team: teamA });
const byTeam = Map.groupBy(users, u => u.team);
console.log(byTeam.get(teamA).map(u => u.name), Object.keys(Object.groupBy(users, u => u.team)));
~~~

~~~text الناتج
[ 'سارة', 'منى' ] [ '[object Object]' ]
~~~

| | [[Map.groupBy]] | [[Object.groupBy]] |
|---|---|---|
| المفتاح | أي قيمة (object، رقم، [[NaN]]) زي ما هو | بيتحوّل نص: كل الـ objects بقوا [["[object Object]"]] واتلمّوا في مجموعة واحدة |
| الناتج | Map بترتيب أول ظهور | object من غير prototype ([[null prototype]]) |
| تقرا مجموعة | [[g.get(key)]] | [[g[key]]] |
| JSON | محتاج تحويل | [[JSON.stringify]] على طول |

**القاعدة:** مفاتيح نصوص وهتبعتها JSON: [[Object.groupBy]]. مفاتيح objects أو أرقام وعايز ترتيب مضمون: [[Map.groupBy]].

---

## ٨. Map: getOrInsert و getOrInsertComputed

أكتر كود بيتكتب على Map: «لو المفتاح مش موجود حط قيمة بداية، وبعدين عدّل». النهارده بيتكتب كده (Node 24.22):

~~~js fallback.js
const counts = new Map();
for (const w of ["أ", "ب", "أ"]) counts.set(w, (counts.get(w) ?? 0) + 1);
console.log(counts);
const groups = new Map();
for (const s of sales) { if (!groups.has(s.item)) groups.set(s.item, []); groups.get(s.item).push(s.qty); }
console.log(groups);
m.getOrInsert("a", 1);
~~~

~~~text الناتج
Map(2) { 'أ' => 2, 'ب' => 1 }
Map(2) { 'قلم' => [ 3, 2 ], 'مسطرة' => [ 1 ] }
TypeError: m.getOrInsert is not a function
~~~

الـ methods الجديدة (proposal اسمه «upsert»، وصل Chrome) بتعمل ده في نداء واحد. الكود ده اتشغّل في **Chrome 157** (في Node 24.22 مش موجودين زي ما شفت فوق):

~~~js upsert.js (Chrome 157)
const counts = new Map();
for (const w of ["أ", "ب", "أ"]) counts.set(w, counts.getOrInsert(w, 0) + 1);
const groups = new Map();
for (const s of sales) groups.getOrInsertComputed(s.item, () => []).push(s.qty);
console.log(JSON.stringify([...counts]), JSON.stringify([...groups]));
~~~

~~~text الناتج (Chrome 157)
[["أ",2],["ب",1]] [["قلم",[3,2]],["مسطرة",[1]]]
~~~

| | [[getOrInsert(k, value)]] | [[getOrInsertComputed(k, fn)]] |
|---|---|---|
| لو المفتاح موجود | بترجّع قيمته (حتى لو [[undefined]]) ومبتغيّرش حاجة | نفس الكلام، و [[fn]] **مبتتناداش** |
| لو مش موجود | بتحط [[value]] وترجّعها | بتنادي [[fn(k)]] وتحط الناتج وترجّعه |
| القيمة الافتراضية بتتحسب إمتى | **كل مرة** قبل النداء (باراميتر عادي) | بس لما المفتاح ناقص |

الفرق اتقاس في Chrome 157: ٣ نداءات على نفس المفتاح بـ [[getOrInsert(k, make())]] عملت [[make]] ٣ مرات، و [[getOrInsertComputed(k, make)]] مرة واحدة. فلو القيمة الافتراضية array أو object أو حسبة تقيلة: [[getOrInsertComputed]]. وكمان [[getOrInsertComputed("ali", k => k.toUpperCase())]] رجّعت [["ALI"]] (الدالة بتاخد المفتاح).

**غريبة اتلقت:** [[new Map().getOrInsertComputed("k")]] من غير دالة رمت [[TypeError: Map.prototype.getOrInsertComputed is not a function]] في Chrome 157: الرسالة بتقول إن الـ **method** مش function، والمقصود إن **الباراميتر** مش function. لو شفتها، دوّر على الدالة اللي نسيتها.

**البديل اللي يشتغل في الاتنين** (اتكتب واتجرّب في مشروعي «لوحة الصدارة» و «cache.js»):

~~~js polyfill.js
function getOrInsertComputed(map, key, make) {
  if (typeof map.getOrInsertComputed === "function") return map.getOrInsertComputed(key, make);
  if (!map.has(key)) map.set(key, make(key));
  return map.get(key);
}
~~~

---

## ٩. المفاتيح: Map ولا object

~~~js keys-compare.js
const km = new Map();
km.set(NaN, "nan").set(0, "zero").set("0", "string zero").set(-0, "minus zero");
console.log(km.get(NaN), km.get(0), km.get("0"), km.size);
const u1 = { id: 1 };
km.set(u1, "سارة");
console.log(km.get(u1), km.get({ id: 1 }));
const plain = {};
plain[u1] = "سارة"; plain[{ id: 2 }] = "عمر";
console.log(Object.keys(plain), plain[u1]);
const bad = {};
bad["__proto__"] = "x";
console.log(Object.keys(bad).length, new Map([["__proto__", "x"]]).size);
console.log("constructor" in {}, new Map().has("constructor"));
~~~

~~~text الناتج
nan minus zero string zero 3
سارة undefined
[ '[object Object]' ] عمر
0 1
true false
~~~

| المفتاح | في Map | في object |
|---|---|---|
| [[NaN]] | بيتلاقي ([[NaN]] = [[NaN]] هنا، اسمها SameValueZero) | بيبقى النص [["NaN"]] |
| [[0]] و [["0"]] | مفتاحين مختلفين | نفس المفتاح [["0"]] |
| [[0]] و [[-0]] | نفس المفتاح ([[-0]] كتب فوق [[0]]) | نفس المفتاح |
| object | بالمؤشر: [[u1]] لقيناه، و [[{ id: 1 }]] تاني مش هو | كل الـ objects بقوا [["[object Object]"]]، فـ «عمر» كتب فوق «سارة» |
| [["__proto__"]] | مفتاح عادي (size 1) | مبيتحطش أصلًا (keys 0)، وأحيانًا بيغيّر الـ prototype |
| [["constructor"]] و [["toString"]] | مش موجودين لحد ما تحطهم | موجودين بالوراثة ([[in]] بـ [[true]]): باج في أي عدّاد (التمرين الرابع) |

---

## الخلاصة

| عايز | اكتب |
|---|---|
| تضيف وتكمّل | [[m.set(k, v).set(k2, v2)]] |
| موجود؟ | [[m.has(k)]] (مش [[get]]) |
| تمسح وتعرف كان موجود | [[if (m.delete(k))]] |
| تفضّي | [[m.clear()]] |
| تلف | [[for (const [k, v] of m)]] أو [[m.forEach((v, k) => ...)]] |
| تنقل مفتاح للآخر | [[m.delete(k); m.set(k, v)]] |
| تجمّع array بمفتاح أي نوع | [[Map.groupBy(arr, fn)]] |
| قيمة بداية لو ناقص | [[getOrInsertComputed(k, () => [])]] في Chrome، والبديل بـ [[has]] و [[set]] في Node |
| object ← Map ← object | [[new Map(Object.entries(o))]] و [[Object.fromEntries(m)]] |
| JSON | [[JSON.stringify([...m])]] و [[new Map(JSON.parse(s))]] |`,
          lines: [
            R`Map من array أزواج: كل زوج [[[مفتاح, قيمة]]]. صنفين في المخزن.`,
            R`[[set]] بترجّع الـ Map، فاترصّوا: صنف جديد، وتعديل كمية القلم من 40 لـ 35.`,
            R`[[get]] للقلم 35، وللممحاة [[undefined]] (مش موجودة)، و [[has]] للكشكول [[true]]، و [[size]] 3.`,
            R`أول [[delete]] لقت الكشكول ومسحته فـ [[true]]، والتانية ملقتهوش فـ [[false]].`,
            R`[[for...of]] على الـ Map بيدّي [[[مفتاح, قيمة]]] بترتيب الإضافة: القلم وبعدين المسطرة.`,
            R`[[forEach]] بتاخد **القيمة الأول** وبعدين المفتاح، عشان كده سمّينا الباراميترز [[(qty, item)]].`,
            R`[[keys()]] و [[values()]] iterators فبنفردهم arrays، و [[Symbol.iterator]] هي نفس [[entries]] فـ [[true]].`,
            R`٣ مبيعات، منهم اتنين قلم.`,
            R`[[Map.groupBy]] بتجمّع المبيعات حسب الصنف في Map: كل صنف ليه array.`,
            R`مجموعة القلم فيها 2، وجنبها [[Object.groupBy]] بنفس الدالة بيرجّع object (Node بيكتبه [[null prototype]]).`,
            R`[[clear]] بتفضّي الـ Map نفسها.`,
            R`[[size]] بقى 0، و Node بيطبعها [[Map(0) {}]].`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[const m = new Map([ ["c", 1], ["a", 2], ["b", 3] ]);]] وبعدين [[m.set("c", 10); m.delete("a"); m.set("a", 20);]]. اكتب ترتيب المفاتيح، و [[m.get("c")]] و [[m.size]] و [[m.get("z")]] و [[m.delete("z")]] (من قسم ٢ و ٤ في الشرح).`, done: R`كتبت [[c,b,a]] و 10 و 3 و [[undefined]] و [[false]].`, sol: R`~~~js predict.js
const m = new Map([["c", 1], ["a", 2], ["b", 3]]);
m.set("c", 10);
m.delete("a");
m.set("a", 20);
console.log([...m.keys()].join(","), m.get("c"), m.size, m.get("z"), m.delete("z"));
~~~

~~~text الناتج
c,b,a 10 3 undefined false
~~~

- [[set("c", 10)]] غيّرت القيمة و «c» فضلت الأولى.
- [[delete("a")]] ثم [[set("a", 20)]]: «a» رجعت بس في **الآخر**، لأنها إضافة جديدة.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** طلبات كافيه في يوم: [["شاي قهوة شاي عصير شاي قهوة مية"]]. اعمل Map بعدد كل مشروب، واطبع أكتر ٣ بالترتيب (من قسم ٥ و ٨ في الشرح).`, done: R`الـ Map فيها ٤ مشروبات، وأكتر ٣: شاي 3 وقهوة 2 وعصير 1.`, sol: R`~~~js top-drinks.js
const text = "شاي قهوة شاي عصير شاي قهوة مية";
const freq = new Map();
for (const w of text.split(" ")) freq.set(w, (freq.get(w) ?? 0) + 1);
const top = [...freq].toSorted((a, b) => b[1] - a[1]).slice(0, 3);
console.log(freq.size, top);
~~~

~~~text الناتج
4 [ [ 'شاي', 3 ], [ 'قهوة', 2 ], [ 'عصير', 1 ] ]
~~~

- [[(freq.get(w) ?? 0) + 1]]: أول مرة [[get]] بترجّع [[undefined]] و [[??]] بتخليها 0. ده نفس اللي [[getOrInsert(w, 0)]] بتعمله في Chrome.
- [[[...freq]]] array أزواج، و [[toSorted]] على العدد ([[b[1] - a[1]]] تنازلي)، و [[slice(0, 3)]] أول ٣.
- «عصير» قبل «مية» رغم إن الاتنين 1: [[toSorted]] ثابت (stable) فاللي اتضاف الأول فضل الأول.` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[totalsByItem(sales)]] بترجّع Map من الصنف لمجموع الكمية، باستخدام [[Map.groupBy]] و [[reduce]]. والمبيعات الفاضية ترجّع Map فاضية. حلّها في المربع اللي تحت (الاختبارات بتقارن [[[...result]]]).`, done: R`[[[...totalsByItem(sales)]]] = [[[["قلم", 5], ["مسطرة", 1]]]]، والفاضية [[[]]].`, sol: R`~~~js totals.js
function totalsByItem(sales) {
  const out = new Map();
  for (const [item, rows] of Map.groupBy(sales, s => s.item)) {
    out.set(item, rows.reduce((sum, r) => sum + r.qty, 0));
  }
  return out;
}
console.log(totalsByItem([{ item: "قلم", qty: 3 }, { item: "مسطرة", qty: 1 }, { item: "قلم", qty: 2 }]), totalsByItem([]));
~~~

~~~text الناتج
Map(2) { 'قلم' => 5, 'مسطرة' => 1 } Map(0) {}
~~~

- [[Map.groupBy]] بيدّي Map من الصنف لـ array صفوفه، و [[for (const [item, rows] of ...)]] بيفك كل زوج.
- [[reduce]] بقيمة بداية 0 على كل مجموعة. والترتيب في الناتج هو ترتيب أول ظهور لكل صنف.
- حل تاني من غير [[groupBy]]: [[out.set(s.item, (out.get(s.item) ?? 0) + s.qty)]] في loop واحدة، وده أسرع لأنه مبيعملش arrays وسطانية.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** عدّاد كلمات بـ object: [[const counts = {}; for (const w of words) counts[w] = (counts[w] || 0) + 1;]]. على [[["toString", "constructor", "قلم", "قلم"]]] الناتج غريب. شغّله واشرح، وصلّحه بـ Map (من قسم ٩ في الشرح).`, done: R`شفت [[toString: 'function toString() { [native code] }1']]، والنسخة بالـ Map طلّعت 1 و 1 و 2.`, sol: R`~~~js counts.js
const words = ["toString", "constructor", "قلم", "قلم"];
const counts = {};
for (const w of words) counts[w] = (counts[w] || 0) + 1;
console.log(counts);
const safe = new Map();
for (const w of words) safe.set(w, (safe.get(w) ?? 0) + 1);
console.log(safe);
~~~

~~~text الناتج
{
  toString: 'function toString() { [native code] }1',
  constructor: 'function Object() { [native code] }1',
  'قلم': 2
}
Map(3) { 'toString' => 1, 'constructor' => 1, 'قلم' => 2 }
~~~

- [[{}]] مش فاضي بجد: وارث [[toString]] و [[constructor]] من [[Object.prototype]]. فـ [[counts["toString"]]] أول مرة رجّعت **دالة** (truthy)، و [[دالة + 1]] بقت نص.
- Map مفيهاش مفاتيح موروثة: [[get]] بترجّع [[undefined]] لأي حاجة محطتهاش.
- لو لازم object: [[Object.create(null)]] (من غير prototype) أو [[Object.hasOwn(counts, w)]]. بس لأي مفاتيح جاية من يوزر (كلمات، أسامي، tags)، Map هي الاختيار الآمن.` },
            { lvl: 'تحدي', t: R`**قارن:** منيو كافيه الـ IDs بتاعه أرقام: [[{ 10: "شاي", 2: "قهوة", 7: "عصير" }]] واتكتب بالترتيب ده عن قصد (الأكتر مبيعًا الأول). اعرضه مرة من object ومرة من Map بنفس الترتيب، وبعدين رتّب الـ Map أبجدي في Map جديدة (من قسم ٤ في الشرح).`, done: R`الـ object عرض [[قهوة، عصير، شاي]] (اترتب بالأرقام)، والـ Map [[شاي، قهوة، عصير]] زي ما اتكتب، والمترتبة أبجدي [[شاي، عصير، قهوة]].`, sol: R`~~~js menu-order.js
const menuObj = { 10: "شاي", 2: "قهوة", 7: "عصير" };
const menuMap = new Map([[10, "شاي"], [2, "قهوة"], [7, "عصير"]]);
console.log(Object.values(menuObj), [...menuMap.values()]);
const sorted = new Map([...menuMap].toSorted((a, b) => a[1].localeCompare(b[1], "ar")));
console.log([...sorted.values()]);
~~~

~~~text الناتج
[ 'قهوة', 'عصير', 'شاي' ] [ 'شاي', 'قهوة', 'عصير' ]
[ 'شاي', 'عصير', 'قهوة' ]
~~~

- الـ object بيرتّب المفاتيح اللي شكلها أعداد صحيحة تصاعدي قبل أي حاجة: 2 ثم 7 ثم 10. ده جزء من المواصفة مش باج في Node.
- الـ Map بتحافظ على ترتيب الإضافة بالظبط.
- Map مالهاش [[sort]]: حوّلها array أزواج، ورتّب بـ [[toSorted]]، وابني Map جديدة منها. [[localeCompare(..., "ar")]] بترتّب الحروف العربي صح.` },
          ],
          check: {
            lang: "js",
            starter: R`function totalsByItem(sales) {
  return new Map();
}`,
            tests: R`const sales = [{ item: "قلم", qty: 3 }, { item: "مسطرة", qty: 1 }, { item: "قلم", qty: 2 }];
test("المجموع لكل صنف بترتيب أول ظهور", () => expect([...totalsByItem(sales)]).toEqual([["قلم", 5], ["مسطرة", 1]]));
test("بيرجّع Map", () => expect(totalsByItem(sales) instanceof Map).toBe(true));
test("فاضية", () => expect([...totalsByItem([])]).toEqual([]));
test("صنف واحد", () => expect(totalsByItem([{ item: "أ", qty: 4 }]).get("أ")).toBe(4));`,
            solution: R`function totalsByItem(sales) {
  const out = new Map();
  for (const [item, rows] of Map.groupBy(sales, s => s.item)) {
    out.set(item, rows.reduce((sum, r) => sum + r.qty, 0));
  }
  return out;
}`
          },
          flag: "script",
          ref: [
            { t: "MDN: Map", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map" },
            { t: "MDN: Map.prototype.set()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set" },
            { t: "MDN: Map.prototype.delete()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete" },
            { t: "MDN: Map.prototype.clear()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear" },
            { t: "MDN: Map.prototype.entries()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries" },
            { t: "MDN: Map.prototype.keys()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys" },
            { t: "MDN: Map.prototype.values()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values" },
            { t: "MDN: Map.prototype.forEach()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach" },
            { t: "MDN: Map.prototype[Symbol.iterator]()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Symbol.iterator" },
            { t: "MDN: Map.groupBy()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/groupBy" },
            { t: "MDN: Map.prototype.getOrInsert()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/getOrInsert" },
            { t: "MDN: Map.prototype.getOrInsertComputed()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/getOrInsertComputed" },
          ],
          pre: ["js/Map و Set", "js/Object.keys و entries", "js/JSON"],
          deep: {
            why: R`Map هي الـ dictionary الحقيقية في JavaScript: أي «عدّ»، أو «جمّع حسب»، أو «cache بمفتاح»، أو «هات بالـ id» بيتكتب بيها أأمن وأوضح من object. ومعرفة تفاصيلها (الترتيب، والـ forEach المقلوب، و [[has]] مش [[get]]، و [[groupBy]]، و [[getOrInsertComputed]]) هي اللي بتفرق بين كود شغال وكود بيقع على مفتاح اسمه [["constructor"]].`,
            how: R`Map من جوه hash table + لستة مترتبة بالإضافة: [[set]] و [[get]] و [[has]] و [[delete]] O(1) في المتوسط. بتقارن المفاتيح بـ SameValueZero (زي [[===]] بس [[NaN]] بيساوي [[NaN]]، و [[-0]] بيتحوّل [[0]]). [[set]] على مفتاح موجود بتغيّر القيمة في نفس الخانة، و [[delete]] بتشيل الخانة، فالإضافة بعدها بتروح للآخر. والـ iterators بتمشي على اللستة دي، وبتشوف الإضافات اللي بتحصل وانت بتلف وبتتخطى اللي اتمسح. [[Map.groupBy]] بتلف على أي iterable وبتعمل [[getOrInsertComputed(key, () => [])]] فعليًا لكل عنصر. و [[getOrInsert(k, v)]] = [[has]] ولو لأ [[set]]، ثم [[get]]، في خطوة واحدة وبحث واحد في الـ hash table بدل ٢ أو ٣.`,
            when: R`Map: مفاتيح ديناميكية (من يوزر، من داتا)، أو مش نصوص (objects، أرقام بجد)، أو إضافة ومسح كتير، أو الترتيب مهم، أو [[size]] كتير. object: شكل ثابت معروف ([[{ name, age }]])، أو هتبعته JSON، أو بتستخدم destructuring. [[Map.groupBy]] لما مفتاح المجموعة object أو عايز ترتيب مضمون. [[getOrInsertComputed]] لأي «قيمة بداية لو ناقص» (array، عدّاد، object)، والبديل بـ [[has]] و [[set]] لحد ما يوصل Node.`,
            mistakes: R`[[map[key] = v]] و [[map[key]]] بدل [[set]] و [[get]]. [[forEach((key, value) => ...)]] مقلوبة. [[if (map.get(k))]] بدل [[has]] (القيمة 0 أو [[""]] falsy). [[JSON.stringify(map)]] وتستغرب [[{}]]. تتوقع [[set]] على موجود تنقله للآخر. [[getOrInsert(k, [])]] جوه loop كبيرة (array جديدة كل لفة بتترمي). تستخدم object كعدّاد لمفاتيح من يوزر ([[constructor]] و [[__proto__]]).`
          }
        },
        {
          cmd: "Set: كل الـ methods وجبر المجموعات",
          title: "Set لآخرها: add و has و delete و clear واللف، و union و intersection و difference و symmetricDifference و isSubsetOf و isSupersetOf و isDisjointFrom",
          desc: R`• [[add(v)]] بترجّع الـ Set (فتترص) والمكرر بيتجاهل، و [[has]] و [[delete]] (بترجّع [[true]] لو كان موجود) و [[clear]] و [[size]]. والقيم بتتقارن زي Map: [[NaN]] واحد، و [[0]] و [[-0]] واحد، والـ objects بالمؤشر.
• اللف بترتيب الإضافة: [[values()]] و [[keys()]] (نفس الدالة)، و [[entries()]] بتدّي [[[v, v]]]، و [[forEach(v, v, set)]]، و [[set[Symbol.iterator]]] هي [[values]].
• جبر المجموعات (ES2025، شغال في Node 24): [[union]] (الكل) و [[intersection]] (المشترك) و [[difference]] (عندي ومش عندك) و [[symmetricDifference]] (عند واحد بس) بيرجّعوا Set **جديدة**، و [[isSubsetOf]] و [[isSupersetOf]] و [[isDisjointFrom]] بيرجّعوا [[true]]/[[false]].
• الباراميتر لازم «set-like» (عنده [[size]] و [[has]] و [[keys]]): Set أو Map، مش array.`,
          example: R`const sara = new Set(["js", "css", "git"]);
const omar = new Set(["js", "python", "git", "sql"]);
sara.add("react").add("js");
console.log(sara.size, sara.has("react"), sara.delete("css"), sara.delete("css"));
console.log(sara.union(omar), sara.intersection(omar));
console.log(sara.difference(omar), sara.symmetricDifference(omar));
const needed = new Set(["js", "git"]);
console.log(needed.isSubsetOf(sara), sara.isSupersetOf(needed), sara.isDisjointFrom(new Set(["php"])));
for (const skill of sara) console.log(skill);
console.log([...sara.entries()][0], sara.keys === sara.values, sara[Symbol.iterator] === sara.values);
sara.clear();
console.log(sara.size);`,
          try: R`كورسين: [[const web = new Set(["سارة", "عمر", "منى", "كريم"])]] و [[const mobile = new Set(["عمر", "ياسين", "منى"])]]. اطبع: اللي في الاتنين، واللي في واحد بس، واللي في الويب بس، والكل، وهل [[new Set(["عمر"])]] جزء من الاتنين، وهل الكورسين مفيش بينهم حد مشترك.`,
          sol: R`~~~js courses.js
const web = new Set(["سارة", "عمر", "منى", "كريم"]);
const mobile = new Set(["عمر", "ياسين", "منى"]);
console.log(web.intersection(mobile), web.symmetricDifference(mobile));
console.log(web.difference(mobile), web.union(mobile).size);
const omar = new Set(["عمر"]);
console.log(omar.isSubsetOf(web) && omar.isSubsetOf(mobile), web.isDisjointFrom(mobile));
~~~

~~~text الناتج
Set(2) { 'عمر', 'منى' } Set(3) { 'سارة', 'كريم', 'ياسين' }
Set(2) { 'سارة', 'كريم' } 5
true false
~~~

- [[symmetricDifference]] = اللي في واحد بس من الاتنين (يعني [[union]] من غير [[intersection]]).
- [[isDisjointFrom]] بـ [[false]] لأن فيه اتنين مشتركين. لو كانت [[true]] يبقى مفيش ولا واحد في الكورسين.`,
          teach: R`## الفكرة

مهارات اتنين مطورين في فريق: مين يعرف إيه، والمشترك، والناقص، والمطلوب. ده شغل Set: قيم من غير تكرار، والسؤال المهم «موجود؟» و «إيه العلاقة بين المجموعتين؟». درس «Map و Set» عرّفك بـ [[union]] و [[intersection]] و [[difference]] و [[isSubsetOf]]. هنا الباقي والفخاخ. النواتج من Node 24.22.

---

## ١. Set.prototype.add و has و Set.prototype.delete و Set.prototype.clear

~~~js basics.js
const sara = new Set(["js", "css", "git"]);
sara.add("react").add("js");
console.log(sara.size, sara.has("react"), sara.delete("css"), sara.delete("css"));
const s = new Set();
console.log(s.add(NaN).add(NaN).size, s.has(NaN), s.add(0).has(-0), s.add({ a: 1 }).has({ a: 1 }));
~~~

~~~text الناتج
4 true true false
1 true true false
~~~

| النداء | بيرجّع | ملاحظة |
|---|---|---|
| [[add(v)]] | الـ Set نفسها | بتترص. والقيمة الموجودة ([["js"]] تاني) بتتجاهل من غير error |
| [[has(v)]] | [[true]] / [[false]] | O(1)، ده سبب وجود Set أصلًا (اتقاس في التمرين الخامس) |
| [[delete(v)]] | [[true]] لو كان موجود | التانية [[false]] لأنه خلاص اتمسح |
| [[clear()]] | [[undefined]] | بتفضّي نفس الـ Set |
| [[size]] | العدد | خاصية |

والمقارنة SameValueZero زي Map: [[NaN]] مرتين = واحد، و [[has(-0)]] بعد [[add(0)]] بـ [[true]]، و [[{ a: 1 }]] تاني object تاني فـ [[false]]. Set من objects بتشيل تكرار **المؤشرات** مش المحتوى (التمرين الرابع).

---

## ٢. Set: اللف، و keys و values و entries و forEach و [Symbol.iterator]

~~~js iterate.js
for (const skill of sara) console.log(skill);
console.log([...sara.entries()][0], sara.keys === sara.values, sara[Symbol.iterator] === sara.values);
const o = new Set(["b", "a"]);
o.add("b");
console.log([...o]);
o.delete("b"); o.add("b");
console.log([...o]);
o.forEach((v, v2, set) => console.log(v, v2, set.size));
~~~

~~~text الناتج
js
git
react
[ 'js', 'js' ] true true
[ 'b', 'a' ]
[ 'a', 'b' ]
a a 2
b b 2
~~~

| الـ method | بيدّي | ليه كده |
|---|---|---|
| [[values()]] | القيم بترتيب الإضافة | ده الأساسي |
| [[keys()]] | نفس [[values]] (نفس الدالة بالظبط) | عشان Set و Map يبقى ليهم نفس الشكل وكود واحد يلف على الاتنين |
| [[entries()]] | [[[v, v]]] | نفس السبب: Map بتدّي [[[k, v]]]، والـ Set ملهاش مفتاح فالقيمة مكررة |
| [[forEach((v, v2, set) => ...)]] | القيمة مرتين والـ Set | نفس شكل [[forEach]] بتاع Map |
| [[set[Symbol.iterator]]] | هي [[values]] | ده اللي [[for...of]] و [[[...set]]] بيستخدموه |

والترتيب زي Map: [[add]] لقيمة موجودة مبيحرّكهاش، و [[delete]] ثم [[add]] بتوديها للآخر.

### بتلف وانت بتعدّل

~~~js live.js
const live = new Set([1, 2, 3]);
for (const v of live) { if (v === 1) { live.delete(2); live.add(4); } console.log("live", v); }
~~~

~~~text الناتج
live 1
live 3
live 4
~~~

الـ iterator «حي»: اللي اتمسح قبل ما يوصله اتخطاه (2)، واللي اتضاف في الآخر شافه (4). ده مسموح ومش بيوقع، بس بيلخبط: لو بتعدّل وانت بتلف، لف على نسخة [[[...set]]].

---

## ٣. جبر المجموعات: ٤ methods بترجّع Set جديدة

~~~js algebra.js
const omar = new Set(["js", "python", "git", "sql"]);
console.log(sara.union(omar), sara.intersection(omar));
console.log(sara.difference(omar), sara.symmetricDifference(omar));
~~~

~~~text الناتج
Set(5) { 'js', 'git', 'react', 'python', 'sql' } Set(2) { 'js', 'git' }
Set(1) { 'react' } Set(3) { 'react', 'python', 'sql' }
~~~

(سارة هنا بعد ما زوّدنا react ومسحنا css: [[js]] و [[git]] و [[react]].)

| الـ method | الرمز في الرياضة | معناه بالكلام | الناتج هنا |
|---|---|---|---|
| [[a.union(b)]] | a ∪ b | كل اللي في أي واحد فيهم | ٥ مهارات |
| [[a.intersection(b)]] | a ∩ b | اللي في الاتنين | [[js]] و [[git]] |
| [[a.difference(b)]] | a − b | اللي عند a ومش عند b | [[react]]: سارة تقدر تعلّمها لعمر |
| [[a.symmetricDifference(b)]] | a △ b | اللي عند واحد بس منهم | [[react]] و [[python]] و [[sql]] |

- الأربعة بيرجّعوا Set **جديدة**، و [[sara]] و [[omar]] زي ما هم.
- [[difference]] الوحيدة اللي الترتيب فيها بيغيّر المعنى: [[omar.difference(sara)]] = [[python]] و [[sql]].

### ترتيب الناتج

~~~js result-order.js
const x = new Set([3, 1, 2]), y = new Set([2, 3, 9]);
console.log(x.intersection(y), y.intersection(x), x.union(y), y.union(x));
~~~

~~~text الناتج
Set(2) { 3, 2 } Set(2) { 2, 3 } Set(4) { 3, 1, 2, 9 } Set(4) { 2, 3, 9, 1 }
~~~

[[union]] بترتيب الأول وبعدين الجديد من التاني. أما [[intersection]] فالمواصفة بتلف على **الأصغر** من الاتنين عشان السرعة، فالترتيب ممكن يطلع بترتيب أي واحد فيهم. **متعتمدش على ترتيب ناتج [[intersection]]**، ولو محتاج ترتيب: [[[...result].toSorted()]].

---

## ٤. جبر المجموعات: ٣ أسئلة بـ [[true]] و [[false]]

~~~js relations.js
const needed = new Set(["js", "git"]);
console.log(needed.isSubsetOf(sara), sara.isSupersetOf(needed), sara.isDisjointFrom(new Set(["php"])));
const e = new Set();
const a = new Set([1, 2, 3]);
console.log(e.isSubsetOf(a), a.isSupersetOf(e), e.isDisjointFrom(e), a.isSubsetOf(a), a.symmetricDifference(a));
const eq = (p, q) => p.size === q.size && p.isSubsetOf(q);
console.log(eq(new Set([1, 2]), new Set([2, 1])), eq(new Set([1]), new Set([1, 2])));
~~~

~~~text الناتج
true true true
true true true true Set(0) {}
true false
~~~

| الـ method | السؤال | مثال من الشغل |
|---|---|---|
| [[a.isSubsetOf(b)]] | كل اللي في a موجود في b؟ | المهارات المطلوبة للوظيفة جوه مهارات المتقدم؟ الصلاحيات المطلوبة جوه صلاحيات اليوزر؟ |
| [[a.isSupersetOf(b)]] | a فيها كل اللي في b؟ | نفس السؤال من الناحية التانية: [[userPerms.isSupersetOf(required)]] |
| [[a.isDisjointFrom(b)]] | مفيش ولا عنصر مشترك؟ | جدولين مفيهمش تعارض؟ كلمات ممنوعة مش في الرسالة؟ |

- **الحالات الطرفية:** المجموعة الفاضية جزء من أي مجموعة، وأي مجموعة جزء من نفسها، وفاضية مع فاضية disjoint، و [[a.symmetricDifference(a)]] فاضية.
- **مفيش [[equals]]:** مجموعتين متساويين = نفس الحجم وواحدة جزء من التانية. ([[===]] بيقارن المؤشر، فـ [[new Set([1]) === new Set([1])]] بـ [[false]].)

---

## ٥. الباراميتر لازم set-like: مش array

~~~js set-like.js
a.union([3, 4]);
~~~

~~~text الناتج
TypeError: The .size property is NaN
~~~

الـ methods دي مبتلفش على الباراميتر زي [[new Set(arr)]]: بتسأله [[size]] و [[has(x)]] و [[keys()]]. والـ array معندهاش [[size]] (عندها [[length]])، فالرسالة بتشتكي من [[.size]]. الحل [[a.union(new Set(arr))]]. وده بيفتح حاجة مفيدة: أي object عنده التلاتة ينفع، ومنهم **Map** (بتتعامل بمفاتيحها):

~~~js map-as-set.js
console.log(a.union(new Set([3, 4])), a.intersection(new Map([[2, "x"], [9, "y"]])));
const setLike = { size: 2, has: x => x === 1 || x === 5, keys: () => [1, 5][Symbol.iterator]() };
console.log(a.intersection(setLike), a.difference(setLike), a.union(setLike));
~~~

~~~text الناتج
Set(4) { 1, 2, 3, 4 } Set(1) { 2 }
Set(1) { 1 } Set(2) { 2, 3 } Set(4) { 1, 2, 3, 5 }
~~~

يعني تقدر تقاطع Set أسماء مع Map فيها الأسماء كمفاتيح من غير ما تحوّلها.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| من غير تكرار | [[new Set(arr)]] و [[[...set]]] للرجوع |
| تضيف وتكمّل | [[s.add(a).add(b)]] |
| موجود؟ تمسح؟ تفضّي؟ | [[has]] و [[delete]] (بترجّع كان موجود ولا لأ) و [[clear]] |
| تلف | [[for (const v of s)]] بترتيب الإضافة |
| الكل / المشترك / الفرق / اللي في واحد بس | [[union]] و [[intersection]] و [[difference]] و [[symmetricDifference]] |
| جزء من؟ فيها كل؟ مفيش مشترك؟ | [[isSubsetOf]] و [[isSupersetOf]] و [[isDisjointFrom]] |
| متساويين؟ | [[a.size === b.size && a.isSubsetOf(b)]] |
| مع array | [[new Set(arr)]] الأول (وإلا [[TypeError: The .size property is NaN]]) |`,
          lines: [
            R`مهارات سارة: ٣ قيم مختلفة.`,
            R`مهارات عمر: ٤ قيم.`,
            R`[[add]] بترجّع الـ Set فاترصّت: [[react]] اتضافت، و [[js]] موجودة فاتجاهلت من غير error.`,
            R`العدد 4، و [[react]] موجودة، وأول [[delete("css")]] لقتها فـ [[true]]، والتانية [[false]].`,
            R`[[union]] كل مهارات الاتنين من غير تكرار (٥)، و [[intersection]] المشترك: [[js]] و [[git]].`,
            R`[[difference]] اللي عند سارة بس ([[react]])، و [[symmetricDifference]] اللي عند واحد بس منهم: [[react]] و [[python]] و [[sql]].`,
            R`المهارات المطلوبة لمهمة معينة.`,
            R`المطلوب جزء من مهارات سارة ([[isSubsetOf]])، ونفس السؤال من الناحية التانية ([[isSupersetOf]])، وسارة مفيش بينها وبين [[php]] حاجة ([[isDisjointFrom]]). التلاتة [[true]].`,
            R`[[for...of]] بيلف بترتيب الإضافة: [[js]] ثم [[git]] ثم [[react]].`,
            R`[[entries()]] بيدّي القيمة مرتين [[[ 'js', 'js' ]]]، و [[keys]] هي [[values]]، و [[Symbol.iterator]] هي [[values]] كمان.`,
            R`[[clear]] بتفضّي نفس الـ Set.`,
            R`[[size]] بقى 0 بعد [[clear]]، والـ Set نفسها لسه موجودة وتقدر تضيف فيها تاني.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[const s = new Set([3, 1]);]] وبعدين [[s.add(NaN).add(NaN).add(0).add(-0).add({ id: 1 }).add({ id: 1 }).add(3);]]. اكتب [[s.size]] وأول ٤ عناصر و [[s.has(-0)]] (من قسم ١ في الشرح).`, done: R`كتبت 6، و [[[3, 1, NaN, 0]]]، و [[true]]، وعرفت ليه الـ objects اتحسبوا اتنين.`, sol: R`~~~js predict.js
const s = new Set([3, 1]);
s.add(NaN).add(NaN).add(0).add(-0).add({ id: 1 }).add({ id: 1 }).add(3);
console.log(s.size, [...s].slice(0, 4), s.has(-0));
~~~

~~~text الناتج
6 [ 3, 1, NaN, 0 ] true
~~~

3 و 1، و [[NaN]] مرة (SameValueZero)، و [[0]] و [[-0]] واحد، و object اتنين (كل [[{ id: 1 }]] object جديد)، و 3 كانت موجودة. المجموع 6.` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[commonFree(a, b)]] بتاخد ساعات فاضية لاتنين (arrays أرقام) وترجّع الساعات المشتركة **مترتبة تصاعدي** في array. استخدم [[intersection]]. حلّها في المربع اللي تحت.`, done: R`[[commonFree([9, 10, 14, 16], [16, 11, 10, 18])]] = [[[10, 16]]]، و [[commonFree([9], [10])]] = [[[]]].`, sol: R`~~~js common-free.js
function commonFree(a, b) {
  return [...new Set(a).intersection(new Set(b))].toSorted((x, y) => x - y);
}
const saraFree = [9, 10, 14, 16], omarFree = [16, 11, 10, 18];
console.log(commonFree(saraFree, omarFree), commonFree([9], [10]), new Set(saraFree).isDisjointFrom(new Set([12, 13])));
~~~

~~~text الناتج
[ 10, 16 ] [] true
~~~

- [[new Set(a)]] و [[new Set(b)]]: [[intersection]] مبتقبلش arrays (القسم ٥).
- [[toSorted]] بعد التقاطع: ترتيب ناتج [[intersection]] مش مضمون (القسم ٣)، والمسألة طالبة ترتيب.
- والسطر الأخير: سارة فاضية من 12 لـ 1؟ [[isDisjointFrom]] بـ [[true]] يعني مفيش ولا ساعة من دول في الفاضي بتاعها.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** [[dependencies]] بتاعة مشروع قبل وبعد تحديث: قبل [[express lodash dotenv moment]] وبعد [[express dotenv zod dayjs]]. اطبع اللي اتضاف واللي اتشال واللي فضل واللي اتغيّر (من قسم ٣ في الشرح).`, done: R`اتضاف [[zod]] و [[dayjs]]، واتشال [[lodash]] و [[moment]]، وفضل [[express]] و [[dotenv]]، واتغيّر الأربعة.`, sol: R`~~~js deps-diff.js
const before = new Set(["express", "lodash", "dotenv", "moment"]);
const after = new Set(["express", "dotenv", "zod", "dayjs"]);
console.log("اتضاف:", [...after.difference(before)]);
console.log("اتشال:", [...before.difference(after)]);
console.log("فضل:", [...before.intersection(after)]);
console.log("اتغيّر:", [...before.symmetricDifference(after)]);
~~~

~~~text الناتج
اتضاف: [ 'zod', 'dayjs' ]
اتشال: [ 'lodash', 'moment' ]
فضل: [ 'express', 'dotenv' ]
اتغيّر: [ 'lodash', 'moment', 'zod', 'dayjs' ]
~~~

ده بالظبط اللي أدوات زي [[npm diff]] بتعمله على أسامي المكتبات. [[difference]] مرتين بالعكس بتدّي الاتجاهين، و [[symmetricDifference]] الاتنين مع بعض في نداء واحد.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** (١) سلة بـ Set: [[cart.add({ id: 7, name: "قلم" })]] مرتين والـ [[size]] بقى 2. (٢) [[tags.union(["css", "js"])]] بيوقع. شغّل الاتنين، اقرا الـ error، وصلّحهم (من قسم ١ و ٥ في الشرح).`, done: R`(١) شيلت التكرار بـ Set من الـ ids فطلع قلم وكشكول بس. (٢) شفت [[TypeError: The .size property is NaN]] والتصليح بـ [[new Set(...)]] رجّع [[Set(2) { 'js', 'css' }]].`, sol: R`~~~js set-bugs.js
const cart = new Set([{ id: 7, name: "قلم" }]);
cart.add({ id: 7, name: "قلم" });
console.log(cart.size);
const ids = new Set();
const items = [{ id: 7, name: "قلم" }, { id: 7, name: "قلم" }, { id: 9, name: "كشكول" }];
const unique = items.filter(it => { if (ids.has(it.id)) return false; ids.add(it.id); return true; });
console.log(unique.map(i => i.name));
const tags = new Set(["js"]);
try { tags.union(["css", "js"]); } catch (e) { console.log(e.constructor.name + ": " + e.message); }
console.log(tags.union(new Set(["css", "js"])));
~~~

~~~text الناتج
2
[ 'قلم', 'كشكول' ]
TypeError: The .size property is NaN
Set(2) { 'js', 'css' }
~~~

- (١) Set بتقارن الـ objects بالمؤشر، والاتنين objects مختلفين حتى لو نفس المحتوى. الحل: Set من **المفتاح** ([[id]]) واستخدمها كـ «شفته قبل كده؟» وانت بتفلتر. أو Map من [[id]] للمنتج.
- (٢) [[union]] بتسأل الباراميتر عن [[size]]، والـ array عندها [[length]] بس. لفّها في [[new Set]].` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** array فيها 20000 رقم زوجي ([[i * 2]]) وتانية 20000 مضاعفات 3 ([[i * 3]]). هات المشترك مرة بـ [[A.filter(x => B.includes(x))]] ومرة بـ [[new Set(A).intersection(new Set(B))]]، وقيس الوقت بـ [[performance.now()]]. اشرح الفرق.`, done: R`الاتنين لقوا 6667 رقم، والـ array أخدت مئات الملي ثانية والـ Set أقل من 10.`, sol: R`~~~js measure.js
const N = 20000;
const A = Array.from({ length: N }, (_, i) => i * 2), B = Array.from({ length: N }, (_, i) => i * 3);
let t = performance.now();
const viaArr = A.filter(x => B.includes(x));
const tArr = performance.now() - t;
t = performance.now();
const viaSet = new Set(A).intersection(new Set(B));
const tSet = performance.now() - t;
console.log(viaArr.length, viaSet.size, "array:", tArr.toFixed(1) + "ms", "Set:", tSet.toFixed(1) + "ms");
~~~

~~~text الناتج (Node 24.22، تشغيلتين)
6667 6667 array: 299.1ms Set: 3.5ms
6667 6667 array: 281.5ms Set: 5.8ms
~~~

- [[B.includes(x)]] بيلف على [[B]] كلها لكل [[x]] في [[A]]: 20000 × 20000 = ٤٠٠ مليون مقارنة في أسوأ حالة (O(n²)).
- [[Set]]: بناء الاتنين O(n)، و [[intersection]] بتعمل [[has]] O(1) لكل عنصر في الأصغر. يعني حوالي 40 ألف عملية.
- النتيجة: حوالي ٥٠ ضعف أسرع هنا، والفرق بيكبر مع الحجم. على ١٠ عناصر الفرق ملوش قيمة، فاكتب الأوضح.` },
          ],
          check: {
            lang: "js",
            starter: R`function commonFree(a, b) {
  return a.filter(x => b.includes(x));
}`,
            tests: R`test("المشترك مترتب", () => expect(commonFree([9, 10, 14, 16], [16, 11, 10, 18])).toEqual([10, 16]));
test("مفيش مشترك", () => expect(commonFree([9], [10])).toEqual([]));
test("التكرار بيتشال", () => expect(commonFree([10, 10, 9], [10, 9, 9])).toEqual([9, 10]));
test("فاضية", () => expect(commonFree([], [1, 2])).toEqual([]));`,
            solution: R`function commonFree(a, b) {
  return [...new Set(a).intersection(new Set(b))].toSorted((x, y) => x - y);
}`
          },
          flag: "script",
          ref: [
            { t: "MDN: Set", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set" },
            { t: "MDN: Set.prototype.add()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add" },
            { t: "MDN: Set.prototype.delete()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete" },
            { t: "MDN: Set.prototype.clear()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear" },
            { t: "MDN: Set.prototype.entries()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/entries" },
            { t: "MDN: Set.prototype.forEach()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/forEach" },
            { t: "MDN: Set.prototype[Symbol.iterator]()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Symbol.iterator" },
            { t: "MDN: Set.prototype.union()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/union" },
            { t: "MDN: Set.prototype.intersection()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/intersection" },
            { t: "MDN: Set.prototype.difference()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/difference" },
            { t: "MDN: Set.prototype.symmetricDifference()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/symmetricDifference" },
            { t: "MDN: Set.prototype.isSubsetOf()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/isSubsetOf" },
            { t: "MDN: Set.prototype.isSupersetOf()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/isSupersetOf" },
            { t: "MDN: Set.prototype.isDisjointFrom()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/isDisjointFrom" },
          ],
          pre: ["js/Map و Set", "js/Map: كل الـ methods و getOrInsert"],
          deep: {
            why: R`نص مسائل الشغل الحقيقي مقارنة لستتين: مين اشترك ومين لغى، والصلاحيات الناقصة، والمكتبات اللي اتغيّرت، والساعات المشتركة، والكلمات الممنوعة. بـ arrays بتكتب [[filter]] و [[includes]] متداخلين (بطيء وصعب يتقري). بـ Set كل سؤال ليه method باسمه، وسريع.`,
            how: R`Set من جوه hash table زي Map بس من غير قيم، بترتيب الإضافة، والمقارنة SameValueZero. methods المجموعات بتقرا من الباراميتر [[size]] (لازم رقم، وإلا [[TypeError: The .size property is NaN]]) و [[has]] و [[keys]] (لازم functions)، ده اللي اسمه «set-like». بعد كده كل method بتختار تلف على الأصغر: [[intersection]] لو [[this]] أصغر بتسأل [[other.has]] عن كل عنصر عندها، ولو أكبر بتلف على [[other.keys()]] وتسأل [[this.has]]. [[union]] بتنسخ [[this]] وتضيف [[other.keys()]]. والنتيجة دايمًا Set عادية جديدة (مش subclass، درس «Array[Symbol.species] و Symbol.unscopables»). والـ iterators حية: بتشوف الإضافات وبتتخطى المسح.`,
            when: R`Set لأي «من غير تكرار» أو «شفت ده قبل كده؟» أو «موجود؟» في loop. methods المجموعات لما السؤال عن علاقة بين لستتين. و [[isSubsetOf]] و [[isSupersetOf]] للصلاحيات والمتطلبات. لو محتاج عدد مرات كل عنصر (مش موجود ولا لأ بس) استخدم Map عدّاد. ولو هتبعتها JSON حوّلها [[[...set]]] الأول ([[JSON.stringify(set)]] بـ [[{}]]).`,
            mistakes: R`تبعت array لـ [[union]] و أخواتها. تتوقع Set من objects تشيل التكرار بالمحتوى. تعتمد على ترتيب ناتج [[intersection]]. [[a.difference(b)]] وانت قصدك العكس. [[set === otherSet]] للمساواة. [[set[0]]] (مفيش index، حوّلها array). [[JSON.stringify(set)]]. تعدّل الـ Set وانت بتلف عليها من غير نسخة. وتنسى إن الـ methods دي ES2025: محتاج Node 22 أو أحدث أو Chrome 122+.`
          }
        },
        {
          cmd: "WeakMap و WeakSet",
          title: "WeakMap و WeakSet: داتا مربوطة بـ object من غير ما تمنع مسحه، وإمتى ده بيفرق في الذاكرة",
          desc: R`• [[WeakMap]] زي Map بس **المفاتيح objects بس** (أو symbols مش مسجّلة)، ومفيهاش [[size]] ولا لف. عندها [[set]] و [[get]] و [[has]] و [[delete]]، وفي Chrome 157 كمان [[getOrInsert]] و [[getOrInsertComputed]].
• [[WeakSet]] زي Set بقيم objects بس: [[add]] و [[has]] و [[delete]].
• «weak» يعني: لو الـ object مبقاش ليه أي مرجع في البرنامج غير المفتاح ده، الـ garbage collector يمسحه **ويمسح قيمته معاه**. Map عادية كانت هتمسكه في الذاكرة للأبد.
• الاستخدامات: داتا خاصة لكل object، و cache لنتيجة حسبة على object، وعلامة «شفت الـ object ده» (اكتشاف الـ cycles، ومنع الشغل مرتين).`,
          example: R`const meta = new WeakMap();
const seen = new WeakSet();
const btn = { id: "save" };
meta.set(btn, { clicks: 0 });
meta.get(btn).clicks++;
seen.add(btn);
console.log(meta.get(btn), meta.has(btn), seen.has(btn), seen.has({ id: "save" }));
console.log(meta.delete(btn), meta.get(btn), seen.delete(btn), seen.has(btn));`,
          try: R`اعمل [[const wm = new WeakMap()]] وجرّب: [[wm.set("id", 1)]] و [[wm.set(Symbol("x"), 1)]] و [[wm.set(Symbol.for("x"), 1)]] و [[wm.size]] و [[[...wm]]]. اكتب أنهي بيشتغل وأنهي بيوقع ورسالته.`,
          sol: R`~~~js weak-keys.js
const wm = new WeakMap();
const tries = [() => wm.set("id", 1), () => wm.set(Symbol("x"), 1).has(Symbol("x")), () => wm.set(Symbol.for("x"), 1), () => wm.size, () => [...wm]];
for (const f of tries) { try { console.log(f()); } catch (e) { console.log(e.constructor.name + ": " + e.message); } }
~~~

~~~text الناتج
TypeError: Invalid value used as weak map key
false
TypeError: Invalid value used as weak map key
undefined
TypeError: wm is not iterable
~~~

- النص (primitive) مرفوض: مفيش «object» يتمسح، فمفيش معنى للـ weak.
- [[Symbol("x")]] مقبول (symbol مش مسجّل ممكن يتمسح)، و [[has(Symbol("x"))]] بـ [[false]] لأن كل [[Symbol("x")]] جديد. أما [[Symbol.for("x")]] مسجّل في registry عام وعايش للأبد، فمرفوض.
- [[size]] بـ [[undefined]] (مش موجودة أصلًا) واللف مرفوض: محدش يقدر يشوف المفاتيح لأنها ممكن تكون اتمسحت في أي لحظة.`,
          teach: R`## الفكرة

عايز تربط داتا بـ object مش بتاعك: عدد ضغطات على زرار، أو نتيجة حسبة على طلب، أو «الـ object ده اتعالج قبل كده». لو حطيتها في Map عادية، الـ Map بتمسك الـ object في الذاكرة حتى بعد ما كل البرنامج نسيه (memory leak). WeakMap و WeakSet بيحلوا ده. النواتج من Node 24.22، و [[getOrInsert]] من Chrome 157.

---

## ١. WeakMap: get و set و has و delete

~~~js weakmap.js
const meta = new WeakMap();
const btn = { id: "save" };
meta.set(btn, { clicks: 0 });
meta.get(btn).clicks++;
console.log(meta.get(btn), meta.has(btn));
console.log(meta.delete(btn), meta.get(btn));
const k = {};
console.log(meta.set(k, 1) === meta, meta.delete({}), meta.get({}));
~~~

~~~text الناتج
{ clicks: 1 } true
true undefined
true false undefined
~~~

| الـ method | بيعمل إيه | بيرجّع |
|---|---|---|
| [[set(obj, v)]] | يربط قيمة بالـ object | الـ WeakMap نفسها (بتترص زي Map) |
| [[get(obj)]] | القيمة | القيمة أو [[undefined]] |
| [[has(obj)]] | فيه قيمة للـ object ده؟ | [[true]] / [[false]] |
| [[delete(obj)]] | يشيل الربط | [[true]] لو كان موجود |

ومفيش غيرهم: لا [[size]]، ولا [[clear]]، ولا [[keys]] ولا [[values]] ولا [[entries]] ولا [[forEach]] ولا [[for...of]]. والمفتاح بالمؤشر: [[{}]] جديد مش هو [[k]].

### المفاتيح المسموحة

~~~js keys.js
meta.set("save", 1);
new WeakSet().add(42);
new WeakMap().set(Symbol.for("shared"), 1);
~~~

~~~text الناتج (كل سطر لوحده)
TypeError: Invalid value used as weak map key
TypeError: Invalid value used in weak set
TypeError: Invalid value used as weak map key
~~~

objects (ومنها arrays ودوال وعناصر DOM)، أو [[Symbol("...")]] مش مسجّل. لا نصوص ولا أرقام ولا [[Symbol.for(...)]].

---

## ٢. WeakMap: getOrInsert و getOrInsertComputed

نفس اللي في Map (درس «Map: كل الـ methods و getOrInsert»)، وموجودين على WeakMap كمان. اتشغّلوا في **Chrome 157** (مش موجودين في Node 24.22):

~~~js weak-upsert.js (Chrome 157)
const cache = new WeakMap();
const user = { name: "سارة" };
let computed = 0;
const profile = u => cache.getOrInsertComputed(u, x => { computed++; return { initials: x.name[0] }; });
profile(user); profile(user);
console.log(computed, JSON.stringify(cache.get(user)));
const w = new WeakMap();
console.log(JSON.stringify(w.getOrInsert(user, { visits: 0 })), w.has(user));
w.getOrInsert("نص", 1);
~~~

~~~text الناتج (Chrome 157)
1 {"initials":"س"}
{"visits":0} true
TypeError: Invalid value used as weak map key
~~~

- [[getOrInsertComputed(obj, fn)]]: أول مرة بتنادي [[fn(obj)]] وتخزّن، والتانية بترجّع المتخزن (الحسبة اتعملت مرة واحدة).
- [[getOrInsert(obj, value)]]: نفس الفكرة بقيمة جاهزة.
- نفس قواعد المفاتيح: النص مرفوض بنفس الرسالة.
- في Node: البديل [[if (!w.has(obj)) w.set(obj, fn(obj)); return w.get(obj);]] (مكتوب في مشروع «cache.js» كدالة بتشتغل في الاتنين).

---

## ٣. WeakSet: add و has و delete

~~~js weakset.js
const seen = new WeakSet();
seen.add(btn);
console.log(seen.has(btn), seen.has({ id: "save" }), seen.delete(btn), seen.has(btn));
console.log(new WeakSet().add(k) instanceof WeakSet);
~~~

~~~text الناتج
true false true false
true
~~~

| الـ method | بيعمل إيه | بيرجّع |
|---|---|---|
| [[add(obj)]] | يعلّم الـ object | الـ WeakSet نفسها |
| [[has(obj)]] | متعلّم؟ | [[true]] / [[false]] |
| [[delete(obj)]] | يشيل العلامة | [[true]] لو كان متعلّم |

WeakSet مفيهاش قيم، هي «علامة» على الـ object: «اتعالج»، «اتشاف»، «صالح». وبرضه مفيش [[size]] ولا لف.

---

## ٤. ليه weak: القياس

الكلام النظري «الـ GC بيمسحه» محتاج دليل. السكربت ده بيربط array تقيلة (10000 رقم) بـ 200 object، والـ objects نفسها مش متخزنة في أي حتة تانية. شغّلناه بـ [[node --expose-gc]] عشان نقدر ننادي [[gc()]] بنفسنا قبل كل قياس:

~~~js gc.js
const mb = () => (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1) + " MB";
function fill(store) {
  for (let i = 0; i < 200; i++) {
    const user = { id: i };
    store.set(user, new Array(10000).fill(i));
  }
}
gc(); console.log("البداية:", mb());
const strong = new Map();
fill(strong);
gc(); console.log("Map بعد ما اليوزرز راحوا:", mb(), "size", strong.size);
strong.clear();
gc(); console.log("بعد clear:", mb());
const weak = new WeakMap();
fill(weak);
gc(); console.log("WeakMap بعد ما اليوزرز راحوا:", mb());
~~~

~~~text الناتج: node --expose-gc gc.js (Node 24.22)
البداية: 3.9 MB
Map بعد ما اليوزرز راحوا: 19.4 MB size 200
بعد clear: 4.1 MB
WeakMap بعد ما اليوزرز راحوا: 4.1 MB
~~~

- بعد [[fill]] مفيش أي متغير شايل الـ [[user]] objects. مع **Map** الذاكرة فضلت 19.4 ميجا: الـ Map نفسها شايلة المفاتيح، فالـ GC مش قادر يمسح لا الـ objects ولا الـ arrays. ده الـ memory leak.
- مع **WeakMap** نفس الشغل والذاكرة رجعت 4.1: الـ GC شاف إن مفيش حد شايل المفاتيح غير الـ WeakMap، فمسحهم ومسح القيم معاهم.
- و ده بالظبط **ليه مفيش [[size]] ولا لف**: لو كان فيه، الرقم كان هيتغيّر حسب إمتى الـ GC اشتغل، والبرنامج هيبقى نتيجته مختلفة كل مرة.

---

## ٥. ٣ استخدامات حقيقية

### داتا خاصة لكل object

~~~js private.js
const priv = new WeakMap();
class Wallet {
  constructor(owner) { priv.set(this, { balance: 0 }); this.owner = owner; }
  deposit(n) { priv.get(this).balance += n; return this; }
  get balance() { return priv.get(this).balance; }
}
const w1 = new Wallet("سارة").deposit(100);
console.log(w1.balance, Object.keys(w1), JSON.stringify(w1));
~~~

~~~text الناتج
100 [ 'owner' ] {"owner":"سارة"}
~~~

الرصيد مش خاصية على الـ object (مش في [[Object.keys]] ولا JSON)، ومحدش يقدر يوصله غير الكود اللي شايف [[priv]]. ده كان الأسلوب قبل [[#private]] fields (درس «class»)، ولسه بيتستخدم لما عايز تربط داتا بـ objects **مش بتاعتك** (عناصر DOM، objects من مكتبة).

### cache لحسبة على object

~~~js memo.js
const cache = new WeakMap();
let computed = 0;
function stats(order) {
  if (!cache.has(order)) {
    computed++;
    const total = order.lines.reduce((s, l) => s + l.qty * l.price, 0);
    cache.set(order, { total, count: order.lines.length });
  }
  return cache.get(order);
}
const o1 = { lines: [{ qty: 2, price: 50 }, { qty: 1, price: 20 }] };
console.log(stats(o1), stats(o1), stats({ lines: [] }), "computed:", computed);
~~~

~~~text الناتج
{ total: 120, count: 2 } { total: 120, count: 2 } { total: 0, count: 0 } computed: 2
~~~

الطلب اتحسب مرة واحدة، ولما الطلب يتمسح النتيجة تتمسح معاه. **بشرط** إن الـ object مبيتعدّلش (التمرين التالت بيوريك الفخ).

### علامة «شفته»: اكتشاف الـ cycles

~~~js cycle.js
function hasCycle(value, seen = new WeakSet()) {
  if (value === null || typeof value !== "object") return false;
  if (seen.has(value)) return true;
  seen.add(value);
  const found = Object.values(value).some(v => hasCycle(v, seen));
  seen.delete(value);
  return found;
}
const team = { lead: { name: "سارة" } }; team.lead.team = team;
const shared = { x: 1 };
console.log(hasCycle(team), hasCycle({ left: shared, right: shared }));
JSON.stringify(team);
~~~

~~~text الناتج
true false
TypeError: Converting circular structure to JSON
~~~

[[team.lead.team]] بيرجع لـ [[team]]: دايرة. [[JSON.stringify]] بيوقع عليها. [[hasCycle]] بتعلّم كل object وهي داخلة فيه وتشيل العلامة وهي خارجة، فلو قابلت object متعلّم يبقى إحنا جواه (دايرة). و [[{ left: shared, right: shared }]] مش دايرة (نفس الـ object مرتين جنب بعض)، و [[delete]] وإحنا خارجين هو اللي خلاها [[false]]. WeakSet هنا عشان لو [[seen]] اتنسيت في حتة متمسكش الـ objects.

---

## الخلاصة

| | Map / Set | WeakMap / WeakSet |
|---|---|---|
| المفاتيح/القيم | أي حاجة | objects أو symbols مش مسجّلة |
| بتمسك الـ object في الذاكرة؟ | أيوه، لحد ما تمسحه | لأ: لما محدش تاني شايله بيتمسح هو وقيمته |
| [[size]] واللف و [[clear]] | موجودين | مش موجودين |
| الـ methods | كتير | WeakMap: [[set]] و [[get]] و [[has]] و [[delete]] (و [[getOrInsert]] و [[getOrInsertComputed]] في Chrome). WeakSet: [[add]] و [[has]] و [[delete]] |
| إمتى | داتا بتاعتك عايز تلف عليها | داتا «لازقة» في objects مش بتاعتك، و caches، و علامات |`,
          lines: [
            R`WeakMap: هنربط فيها داتا بـ objects.`,
            R`WeakSet: هنعلّم فيها objects.`,
            R`object زرار. ده اللي هيبقى المفتاح.`,
            R`[[set]] بتربط object عدّاد بالزرار. المفتاح لازم object، والنص مثلًا كان هيترفض.`,
            R`[[get]] بترجّع نفس الـ object العدّاد، فبنزوّد [[clicks]] جواه مباشرة.`,
            R`[[add]] بتعلّم الزرار في الـ WeakSet («اتشاف»).`,
            R`العدّاد بقى 1، و [[has]] في الاتنين [[true]]، أما [[{ id: "save" }]] جديد فـ [[false]]: المقارنة بالمؤشر.`,
            R`[[delete]] في الاتنين بترجّع [[true]] (كان موجود)، وبعدها [[get]] بـ [[undefined]] و [[has]] بـ [[false]].`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** على [[const wm = new WeakMap(), ws = new WeakSet();]] اكتب نتيجة كل سطر (قيمة أو اسم الـ error): [[wm.set({}, 1) === wm]] و [[wm.set("id", 1)]] و [[ws.add(7)]] و [[wm.size]] و [[ws.add(Symbol("s")).has(Symbol("s"))]] و [[[...ws]]] (من قسم ١ و ٣ في الشرح).`, done: R`كتبت [[true]]، و TypeError مرتين، و [[undefined]]، و [[false]]، و TypeError، وشغّلت واتأكدت من الرسايل.`, sol: R`~~~js weak-predict.js
const wm = new WeakMap(), ws = new WeakSet();
const lines = [
  () => wm.set({}, 1) === wm,
  () => wm.set("id", 1),
  () => ws.add(7),
  () => wm.size,
  () => ws.add(Symbol("s")).has(Symbol("s")),
  () => [...ws],
];
for (const f of lines) { try { console.log(f()); } catch (e) { console.log(e.constructor.name + ": " + e.message); } }
~~~

~~~text الناتج
true
TypeError: Invalid value used as weak map key
TypeError: Invalid value used in weak set
undefined
false
TypeError: ws is not iterable
~~~

- [[set]] بترجّع الـ WeakMap زي Map.
- [[ws.add(Symbol("s"))]] اتقبلت، بس [[has(Symbol("s"))]] بتسأل عن symbol **تاني** جديد، فـ [[false]].
- [[wm.size]] مش error: الخاصية مش موجودة فبتطلع [[undefined]]، ودي أخطر من الـ error لأنها بتعدّي ساكتة.` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[hasCycle(value)]] بترجّع [[true]] لو جوه الـ object أو الـ array فيه دايرة (حاجة بتشاور على حاجة فوقها)، و [[false]] لو لأ، حتى لو نفس الـ object متكرر في أكتر من مكان من غير دايرة. استخدم WeakSet. حلّها في المربع اللي تحت (من قسم ٥ في الشرح).`, done: R`كل الاختبارات عدّت: [[a.self = a]] دايرة، و [[{ left: shared, right: shared }]] مش دايرة، والأرقام والـ arrays العادية [[false]].`, sol: R`~~~js has-cycle.js
function hasCycle(value, seen = new WeakSet()) {
  if (value === null || typeof value !== "object") return false;
  if (seen.has(value)) return true;
  seen.add(value);
  const found = Object.values(value).some(v => hasCycle(v, seen));
  seen.delete(value);
  return found;
}
const a = { name: "a" }; a.self = a;
const shared = { x: 1 };
const b = { left: shared, right: shared };
const team = { lead: { name: "سارة" } }; team.lead.team = team;
console.log(hasCycle(a), hasCycle(b), hasCycle(team), hasCycle([1, [2, [3]]]), hasCycle(5));
~~~

~~~text الناتج
true false true false false
~~~

- [[seen]] = الـ objects اللي إحنا **جواها دلوقتي** (المسار من فوق لهنا). لو قابلنا واحد منهم تاني: دايرة.
- [[seen.delete(value)]] وإحنا خارجين هو الفرق بين «دايرة» و «متكرر»: من غيره [[b]] كانت هترجّع [[true]] غلط، لأن [[shared]] اتشاف في [[left]] وبعدين في [[right]].
- [[some]] بتقف أول ما تلاقي دايرة. و [[Object.values]] شغالة على الـ arrays كمان.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** cache لإجمالي الطلب بـ WeakMap ([[stats(order)]] من قسم ٥). بعد [[o1.lines.push({ qty: 1, price: 30 })]] الإجمالي لسه 120 مش 150. ليه؟ اقترح تصليحين.`, done: R`عرفت إن الـ cache مربوط بالـ object مش بمحتواه، وكتبت تصليح بالـ immutability وتصليح بمسح الـ cache.`, sol: R`~~~js stale-cache.js
const cache = new WeakMap();
let computed = 0;
function stats(order) {
  if (!cache.has(order)) {
    computed++;
    const total = order.lines.reduce((s, l) => s + l.qty * l.price, 0);
    cache.set(order, { total, count: order.lines.length });
  }
  return cache.get(order);
}
const o1 = { lines: [{ qty: 2, price: 50 }, { qty: 1, price: 20 }] };
console.log(stats(o1), stats(o1), stats({ lines: [] }), "computed:", computed);
o1.lines.push({ qty: 1, price: 30 });
console.log("بعد التعديل:", stats(o1));
~~~

~~~text الناتج
{ total: 120, count: 2 } { total: 120, count: 2 } { total: 0, count: 0 } computed: 2
بعد التعديل: { total: 120, count: 2 }
~~~

- المفتاح هو **الـ object نفسه**. [[push]] غيّر المحتوى، بس [[o1]] هو هو، فالـ cache رجّع النتيجة القديمة.
- **التصليح ١ (الأحسن):** الطلبات immutable: أي تعديل يعمل object جديد ([[{ ...o1, lines: [...o1.lines, item] }]])، فالجديد ملوش cache ويتحسب. ده اللي React و Redux بيعتمدوا عليه.
- **التصليح ٢:** أي دالة بتعدّل الطلب تنادي [[cache.delete(order)]]. شغال، بس سهل تنساه في حتة.` },
            { lvl: 'تحدي', t: R`**قارن واشرحها:** نفس الـ [[Wallet]] بطريقتين: الرصيد في WeakMap برّه الـ class، وبـ [[#balance]]. اطبع [[balance]] و [[Object.keys]] للاتنين، وبعدين اكتب لزميلك في ٣ سطور إمتى تختار كل واحدة (من قسم ٥ في الشرح).`, done: R`الاتنين بيخبوا الرصيد ([[Object.keys]] فيها [[owner]] بس)، وكتبت إن [[#]] للـ class بتاعتك و WeakMap للـ objects اللي مش بتاعتك.`, sol: R`~~~js private-compare.js
const priv = new WeakMap();
class Wallet {
  constructor(owner) { priv.set(this, { balance: 0 }); this.owner = owner; }
  deposit(n) { priv.get(this).balance += n; return this; }
  get balance() { return priv.get(this).balance; }
}
class Wallet2 {
  #balance = 0;
  constructor(owner) { this.owner = owner; }
  deposit(n) { this.#balance += n; return this; }
  get balance() { return this.#balance; }
}
const w1 = new Wallet("سارة").deposit(100), w2 = new Wallet2("عمر").deposit(50);
console.log(w1.balance, Object.keys(w1), JSON.stringify(w1), w2.balance, Object.keys(w2));
~~~

~~~text الناتج
100 [ 'owner' ] {"owner":"سارة"} 50 [ 'owner' ]
~~~

**الإجابة النموذجية لزميلك:**
«الاتنين بيخبوا الداتا ومبيعملوش memory leak. لو انت كاتب الـ class، استخدم [[#balance]]: أبسط وأسرع ومكتوب جوه الـ class. استخدم WeakMap لما عايز تربط داتا بـ objects مش انت اللي عاملها (عناصر DOM، objects جاية من مكتبة، أي object من برّه) أو لما الداتا لازم تتشارك بين أكتر من class في نفس الـ module.»` },
          ],
          check: {
            lang: "js",
            starter: R`function hasCycle(value) {
  return false;
}`,
            tests: R`test("object بيشاور على نفسه", () => { const a = {}; a.self = a; expect(hasCycle(a)).toBe(true); });
test("دايرة على مستويين", () => { const t = { lead: {} }; t.lead.team = t; expect(hasCycle(t)).toBe(true); });
test("نفس الـ object مرتين من غير دايرة", () => { const s = { x: 1 }; expect(hasCycle({ left: s, right: s })).toBe(false); });
test("arrays متداخلة عادية", () => expect(hasCycle([1, [2, [3]]])).toBe(false));
test("array جواها نفسها", () => { const arr = [1]; arr.push(arr); expect(hasCycle(arr)).toBe(true); });
test("primitive و null", () => { expect(hasCycle(5)).toBe(false); expect(hasCycle(null)).toBe(false); });`,
            solution: R`function hasCycle(value, seen = new WeakSet()) {
  if (value === null || typeof value !== "object") return false;
  if (seen.has(value)) return true;
  seen.add(value);
  const found = Object.values(value).some(v => hasCycle(v, seen));
  seen.delete(value);
  return found;
}`
          },
          flag: "script",
          ref: [
            { t: "MDN: WeakMap", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap" },
            { t: "MDN: WeakMap.prototype.set()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/set" },
            { t: "MDN: WeakMap.prototype.get()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/get" },
            { t: "MDN: WeakMap.prototype.has()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/has" },
            { t: "MDN: WeakMap.prototype.delete()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/delete" },
            { t: "MDN: WeakMap.prototype.getOrInsert()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/getOrInsert" },
            { t: "MDN: WeakMap.prototype.getOrInsertComputed()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/getOrInsertComputed" },
            { t: "MDN: WeakSet", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet" },
            { t: "MDN: WeakSet.prototype.add()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet/add" },
            { t: "MDN: WeakSet.prototype.has()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet/has" },
            { t: "MDN: WeakSet.prototype.delete()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet/delete" },
          ],
          pre: ["js/Map: كل الـ methods و getOrInsert", "js/memory leaks", "js/class"],
          deep: {
            why: R`أشهر memory leak في تطبيقات الويب: Map أو object عالمي بيخزّن داتا لكل عنصر DOM أو لكل طلب، والعناصر بتتشال من الصفحة والداتا فاضلة. WeakMap و WeakSet بيخلّوا الداتا تعيش بالظبط قد الـ object اللي مربوطة بيه، من غير ما تفتكر تمسحها. وده اللي المكتبات (frameworks، و ORMs، و caches) بتعتمد عليه من جوه.`,
            how: R`الـ garbage collector بيمسح أي object مبقاش له طريق من «الجذور» (المتغيرات العامة، والـ stack). Map عادية = طريق: المفتاح متخزن جواها. WeakMap مبتتحسبش طريق للمفتاح: لو الطريق الوحيد للـ object هو إنه مفتاح في WeakMap، الـ GC بيمسحه ويمسح الـ entry كلها (ولو القيمة مكانش ليها طريق تاني بتتمسح كمان، والترتيب ده اسمه ephemeron). عشان المسح ده بيحصل في أي وقت، المواصفة منعت أي حاجة تكشفه: لا [[size]]، ولا لف، ولا [[clear]]. والمفاتيح لازم «تتمسح» فعلًا، فالـ primitives مرفوضة، و [[Symbol.for]] مرفوض لأنه عايش في registry للأبد.`,
            when: R`WeakMap: داتا إضافية لـ objects مش بتاعتك (metadata لعناصر DOM، حالة لـ objects من مكتبة)، و cache لنتيجة حسبة على object immutable، وداتا خاصة لما [[#private]] مش مناسبة. WeakSet: «اتعالج/اتشاف» (منع تسجيل listener مرتين على نفس العنصر، اكتشاف الـ cycles، تعليم objects «موثوقة»). Map و Set العادية: لما المفاتيح نصوص أو أرقام، أو محتاج تلف أو تعدّ.`,
            mistakes: R`مفتاح نص أو رقم (TypeError). تتوقع [[size]] أو لف ([[undefined]] أو TypeError). cache بـ WeakMap على objects بتتعدّل (نتيجة قديمة). تفتكر إن WeakMap بتمسح القيمة لو القيمة نفسها بتشاور على المفتاح؟ لأ، دي متعالجة صح (ephemeron) وبتتمسح. تحط المفتاح نفسه في حتة تانية «عشان متتنساش» (ساعتها مش هيتمسح أبدًا وكأنها Map). تستخدم WeakMap لداتا محتاج تحفظها أو تبعتها (مش هتعرف تطلّعها).`
          }
        },
      ]
    }
]);
