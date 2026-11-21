// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: R`regex كامل: الـ flags و exec و الـ syntax الباقي`,
      l: 2,
      n: "الـ regex literal ضد new RegExp وجدول خصايص الـ RegExp كلها، و exec من جوه (indices و lastIndex و matches بطول صفر)، والـ flags s و m و y و v بحالات من الشغل، والنقطة والحروف الحرفية، و \\k<name> والـ modifiers، والـ buffer boundaries اللي لسه مش في JS، ومشاريع: inspector و مصلّح تكرار و tokenizer و highlighter و فاحص لوج بـ tests",
      pre: [
        { to: "js/regex: classes و quantifiers", why: R`الـ classes والـ quantifiers والـ anchors: الوحدة دي مبنية عليهم` },
        { to: "js/groups و flags", why: R`الـ groups والـ named groups وأول تعارف بالـ flags وفخ [[lastIndex]] مع [[g]]` },
        { to: "js/test و match و matchAll و replace", why: R`الـ string methods و [[RegExp.escape]]، وهنا بنشوف [[exec]] اللي تحتهم` },
        { to: "js/إمتى regex غلط", why: R`ReDoS وإمتى تسيب الـ regex لـ parser` },
        { to: "js/regex والعربي: Unicode properties", why: R`[[\p{...}]] والـ flag [[u]]، وهنا بنكمّل بالـ flag [[v]]` },
        { to: "js/RegExp و Symbol.match و Symbol.replace: matcher بتاعك", why: R`الـ RegExp كـ object وإزاي الـ string methods بتسلّمه الشغل` },
      ],
      goal: [
        R`تختار بين [[/.../]] و [[new RegExp]] صح، وتكتب الـ backslash في النص من غير ما يضيع، وتقرا أي regex من خصايصه ([[source]] و [[flags]] و [[global]]…).`,
        R`تستخدم [[exec]] بنفسك: تفهم كل خانة في الناتج ([[index]] و [[input]] و [[groups]] و [[indices]])، وتلف بـ [[g]] و [[lastIndex]] من غير loop لانهائي.`,
        R`تستخدم [[s]] و [[m]] و [[y]] و [[v]] في حالات حقيقية: ملف INI، وإيميل، و tokenizer، وحروف عربي بس من غير الأرقام.`,
        R`تعرف النقطة بتطابق إيه بالظبط، وأنهي حرف لازم [[\]] قبله وإمتى [[\]] نفسها بترمي.`,
        R`تكتب [[\k<name>]] و [[(?i:...)]]، وتعرف إن [[\A]] و [[\z]] لسه مش في JS والبديل الصح.`,
      ],
      use: {
        prog: R`الـ linters (ESLint) و الـ formatters و syntax highlighters (Prism و highlight.js) والـ template engines كلهم بيقطّعوا النص بـ [[exec]] و [[y]] بالظبط زي الـ tokenizer هنا. ومكتبات الـ validation (Zod و Yup) بتاخد [[RegExp]] وبتقرا [[source]] و [[flags]] بتوعه عشان تعرضه في رسالة الغلط.`,
        work: R`فحص لوجات وتحديد السطر البايظ بالعمود، وتظليل كلمات البحث في نتايج، وتنضيف رسايل العملا قبل ما تتخزن، وقراية ملفات config بسيطة، وأدوات CLI بتاخد pattern من اليوزر.`,
        cs: R`الـ lexer (أول مرحلة في أي compiler)، والفرق بين البحث في أي مكان والمطابقة من مكان ثابت (sticky)، والـ backreferences اللي بتخلّي الـ regex أقوى من «regular language» في نظرية الحسابات.`,
      },
      projects: [
        { lvl: 'صغير', t: R`regex inspector من الترمنال`, what: R`[[regex-info.mjs]] بياخد regex مكتوب بشكل [[/pattern/flags]] كـ argument، ويطبع جدول بكل خصايصه ([[source]] و [[flags]] و [[global]] و [[ignoreCase]] و [[multiline]] و [[dotAll]] و [[unicode]] و [[unicodeSets]] و [[hasIndices]] و [[sticky]] و [[lastIndex]] و [[toString]])، وبعدين يجرّبه على أي نصوص تانية تديهاله ويقول الـ match ومكانه. والـ regex البايظ بيطبع الـ SyntaxError بنصها ويخرج بـ exit code 1. من درسي «regex literal و new RegExp: خصايص الـ RegExp و toString» و «RegExp exec: الـ result array و indices و lastIndex».`, done: R`[[node regex-info.mjs '/(?<n>\d+) ?EGP/gi' "tea 15 egp"]] بيطبع الجدول ([[global]] و [[ignoreCase]] بـ true) وسطر [["15 egp" عند 4]]. و [['/(\d+/g']] بيطبع [[Unterminated group]] و [[exit=1]]، و [['/a/gg']] بيطبع [[Invalid flags]]، و [[abc]] من غير شرط بيطبع رسالة الشكل الصح.`, sol: R`**هتشوف إيه:** جدول بخصايص الـ regex، وتحته سطر لكل نص جرّبته:

~~~text الناتج (Node 24.22، PowerShell)
┌─────────────┬───────────────────────┐
│ (index)     │ Values                │
├─────────────┼───────────────────────┤
│ source      │ '(?<n>\\d+) ?EGP'     │
│ flags       │ 'gi'                  │
│ global      │ true                  │
│ ignoreCase  │ true                  │
│ multiline   │ false                 │
│ dotAll      │ false                 │
│ unicode     │ false                 │
│ unicodeSets │ false                 │
│ hasIndices  │ false                 │
│ sticky      │ false                 │
│ lastIndex   │ 0                     │
│ toString    │ '/(?<n>\\d+) ?EGP/gi' │
└─────────────┴───────────────────────┘
"tea 15 egp" → "15 egp" عند 4
"free" → مفيش match
~~~

(الـ [[\\d]] في الجدول backslash واحد بس: [[console.table]] بيعرض النصوص بـ escape زي الكود.)

~~~js regex-info.mjs
// regex-info.mjs: اكتب regex بشكل /.../flags وشوف كل خصايصه وجرّبه على نص
const [, , literal, ...samples] = process.argv;

export function parseLiteral(text) {
  if (typeof text !== "string" || !text.startsWith("/")) {
    throw new TypeError("اكتب الـ regex بالشكل ده: /pattern/flags");
  }
  const last = text.lastIndexOf("/");
  if (last === 0) throw new TypeError("ناقص / الأخيرة");
  return new RegExp(text.slice(1, last), text.slice(last + 1));
}

export function describe(re) {
  return {
    source: re.source,
    flags: re.flags || "(مفيش)",
    global: re.global,
    ignoreCase: re.ignoreCase,
    multiline: re.multiline,
    dotAll: re.dotAll,
    unicode: re.unicode,
    unicodeSets: re.unicodeSets,
    hasIndices: re.hasIndices,
    sticky: re.sticky,
    lastIndex: re.lastIndex,
    toString: re.toString(),
  };
}

if (import.meta.main) {
  try {
    const re = parseLiteral(literal);
    console.table(describe(re));
    for (const s of samples) {
      const m = new RegExp(re.source, re.flags.replace(/[gy]/g, "")).exec(s);
      console.log(JSON.stringify(s), m ? "→ " + JSON.stringify(m[0]) + " عند " + m.index : "→ مفيش match");
    }
  } catch (e) {
    console.error(e.name + ": " + e.message);
    process.exitCode = 1;
  }
}
~~~

**كل حتة بتعمل إيه:**

- [[parseLiteral]]: الـ regex جاي من الترمنال **نص**، فبندوّر على **آخر** [[/]] بـ [[lastIndexOf]] (مش أول واحدة، عشان الـ pattern نفسه ممكن يبقى فيه [[\/]])، واللي قبلها pattern واللي بعدها flags، وبعدين [[new RegExp(pattern, flags)]]. أي pattern أو flags غلط بيرمي SyntaxError من الـ constructor نفسه، فمش محتاجين نفحص بإيدنا.
- [[describe]]: كل خاصية getter على [[RegExp.prototype]] بتقرا من الـ regex، ما عدا [[lastIndex]] اللي خاصية عادية على الـ object نفسه.
- التجربة على النصوص: بنعمل نسخة من غير [[g]] و [[y]] عشان [[exec]] يبدأ من الأول كل مرة ومايفتكرش [[lastIndex]] من النص اللي قبله.
- [[import.meta.main]]: [[true]] لما الملف يتشغّل بـ node مباشرة (موجودة في Node 24)، فتقدر تستورد [[parseLiteral]] من ملف تاني من غير ما الجدول يتطبع.

**غلطة حصلت وإحنا بنبنيه:** في Git Bash، [[node regex-info.mjs '/(\d+/g']] طلّع [[TypeError: اكتب الـ regex بالشكل ده]] بدل الـ SyntaxError. طبعنا [[process.argv[2]]] لقيناه [[C:/Program Files/Git/(/d+/g]]: Git Bash (MSYS) بيحوّل أي argument بيبدأ بـ [[/]] لمسار ويندوز. الحل: [[MSYS_NO_PATHCONV=1]] قبل الأمر، أو شغّله من PowerShell. ده بيحصل في Git Bash بس، مش في لينكس ولا ماك:

~~~text الناتج (Git Bash مع MSYS_NO_PATHCONV=1)
SyntaxError: Invalid regular expression: /(\d+/g: Unterminated group
TypeError: اكتب الـ regex بالشكل ده: /pattern/flags
SyntaxError: Invalid flags supplied to RegExp constructor 'gg'
TypeError: ناقص / الأخيرة
~~~

السطور دي لـ [['/(\d+/g']] و [[abc]] و [['/a/gg']] و [['/x']] بالترتيب، وكلهم خرجوا بـ exit code 1.` },
        { lvl: 'صغير', t: R`مصلّح الكلمات المتكررة`, what: R`[[dupes.mjs]] بيقرا ملف نص ويلاقي أي كلمة اتكتبت مرتين ورا بعض («ده ده» و «the The»)، ويطبع [[file:line:col]] لكل واحدة، ومع [[--fix]] بيصلّح الملف ويسيب أول نسخة. لازم يشتغل مع العربي (يعني من غير [[\b]] و [[\w]])، وميعتبرش [[then thenext]] تكرار، وميلزقش آخر سطر في أول اللي بعده. من دروس «named backreference و modifiers و buffer boundaries» و «RegExp exec: الـ result array و indices و lastIndex».`, done: R`على ملف فيه [[الطلب ده ده اتأخر]] و [[the The order]] و [[thenthen ok, then thenext]] وسطرين واحد آخره [[شاي]] واللي بعده أوله [[شاي]]: بيلاقي ٢ بس بأماكنهم، و [[--fix]] بيصلّحهم، وتشغيله تاني بيقول «مفيش تكرار».`, sol: R`**هتشوف إيه:** كل تكرار بمكانه، وبعد [[--fix]] الملف نضيف:

~~~text الناتج (Node 24.22)
notes.txt:1:7  «ده ده»
notes.txt:2:1  «the The»
لقيت 2
اتصلّح الملف
~~~

~~~text notes.txt بعد --fix
الطلب ده اتأخر
the order is ready
thenthen ok, then thenext
آخر السطر شاي
شاي أول السطر
~~~

~~~js dupes.mjs
// dupes.mjs: يلاقي الكلمات المتكررة ورا بعض («ده ده» و «the The») ويصلّحها
import { readFileSync, writeFileSync } from "node:fs";

const DUP = /(?<!\p{L})(?<word>\p{L}+)[^\S\r\n]+\k<word>(?!\p{L})/giu;

export function findDupes(text) {
  const found = [];
  text.split(/\r?\n/).forEach((line, i) => {
    for (const m of line.matchAll(DUP)) {
      found.push({ line: i + 1, col: m.index + 1, text: m[0] });
    }
  });
  return found;
}

export function fixDupes(text) {
  return text.replace(DUP, "$<word>");
}

if (import.meta.main) {
  const [, , file, flag] = process.argv;
  if (!file) {
    console.error("الاستخدام: node dupes.mjs <file> [--fix]");
    process.exit(2);
  }
  const text = readFileSync(file, "utf8");
  const found = findDupes(text);
  for (const d of found) console.log($__bt$__{file}:$__{d.line}:$__{d.col}  «$__{d.text}»$__bt);
  console.log(found.length ? $__btلقيت $__{found.length}$__bt : "مفيش تكرار");
  if (flag === "--fix" && found.length) {
    writeFileSync(file, fixDupes(text));
    console.log("اتصلّح الملف");
  }
}
~~~

**كل حتة بتعمل إيه:**

- [[(?<!\p{L})]]: lookbehind «قبلي مش حرف». ده بديل [[\b]] اللي بيفهم إنجليزي بس: [[\b]] بيشوف الحرف العربي «مش حرف كلمة»، فـ [["ده ده"]] مكانتش هتتلاقي خالص.
- [[(?<word>\p{L}+)]]: كلمة بأي لغة، والـ group اسمه [[word]].
- [[[^\S\r\n]+]]: مسافة أفقية بس (أي whitespace ما عدا السطر الجديد).
- [[\k<word>]]: **نفس النص** اللي [[word]] مسكه، ومع [[i]] الحروف الكبيرة زي الصغيرة، فـ [[the The]] تكرار.
- [[(?!\p{L})]]: بعدها مش حرف، فـ [[then thenext]] مش تكرار.
- [[fixDupes]]: [[replace]] بـ [[$<word>]] بيحط أول نسخة بس مكان الاتنين.

**غلطة حصلت وإحنا بنبنيه:** أول نسخة كان فيها [[\s+]] بين الكلمتين. [[findDupes]] كانت شغالة لأنها بتقسم سطر سطر، بس [[fixDupes]] بتشتغل على الملف كله، فـ [[شاي]] آخر سطر و [[شاي]] أول اللي بعده اتلزقوا في سطر واحد:

~~~text الناتج بـ \s+ (قبل التصليح) ثم بـ [^\S\r\n]+
"آخر السطر شاي أول السطر" "آخر السطر شاي\nشاي أول السطر"
~~~

[[\s]] بتشمل [[\n]]. الحل [[[^\S\r\n]]]: «مش (مش مسافة) ومش سطر جديد»، يعني مسافة أو tab بس.` },
        { lvl: 'متوسط', t: R`tokenizer لمعادلة حسابية`, what: R`[[tokenize(src)]] بتقطّع [["12 + 3.5*(4-1)"]] لـ tokens كل واحد [[{ type, text, pos }]] (رقم، أو operator، أو قوس) بـ regex واحد فيه flag [[y]] و [[exec]] في loop. أي حرف مش مفهوم (زي [[%]]) بيرمي [[TokenError]] (subclass من SyntaxError) رسالته فيها المعادلة وعلامة [[^]] تحت الحرف بالظبط. والـ CLI بيطبع الـ tokens لكل معادلة تديهاله. من دروس «الـ flags s و m و y و v بحالات حقيقية» و «RegExp exec: الـ result array و indices و lastIndex».`, done: R`[["12 + 3.5*(4-1)"]] بيطلع ٩ tokens منهم [[num:3.5]]، و [["2^10"]] ٣ tokens، و [["7 % 2"]] بيطبع الرسالة والـ [[^]] تحت [[%]] (عمود 2) والـ exit code 1، والمسافات لوحدها أو النص الفاضي بيطبعوا سطر فاضي من غير error.`, sol: R`**هتشوف إيه:**

~~~text الناتج (Node 24.22)
num:12  op:+  num:3.5  op:*  paren:(  num:4  op:-  num:1  paren:)
num:2  op:^  num:10
حرف مش مفهوم «%» عند 2
7 % 2
  ^


exit=1
~~~

(السطرين الفاضيين قبل [[exit=1]] لـ [["  "]] و [[""]]: مفيش tokens.)

~~~js tokenize.mjs
// tokenize.mjs: يقطّع معادلة حسابية لـ tokens بـ flag y و exec، ويشاور على الحرف الغلط
const TOKEN = /(?<space>\s+)|(?<num>\d+(?:\.\d+)?)|(?<op>[-+*\/^])|(?<paren>[()])/y;

export class TokenError extends SyntaxError {
  name = "TokenError";
  constructor(src, pos) {
    super($__btحرف مش مفهوم «$__{src[pos]}» عند $__{pos}\n$__{src}\n$__{" ".repeat(pos)}^$__bt);
    this.pos = pos;
  }
}

export function tokenize(src) {
  const tokens = [];
  TOKEN.lastIndex = 0;
  while (TOKEN.lastIndex < src.length) {
    const start = TOKEN.lastIndex;
    const m = TOKEN.exec(src);
    if (!m) throw new TokenError(src, start);
    const [type, text] = Object.entries(m.groups).find(([, v]) => v !== undefined);
    if (type !== "space") tokens.push({ type, text, pos: start });
  }
  return tokens;
}

if (import.meta.main) {
  for (const src of process.argv.slice(2)) {
    try {
      console.log(tokenize(src).map((t) => $__bt$__{t.type}:$__{t.text}$__bt).join("  "));
    } catch (e) {
      if (!(e instanceof TokenError)) throw e;
      console.error(e.message);
      process.exitCode = 1;
    }
  }
}
~~~

**كل حتة بتعمل إيه:**

- [[TOKEN]]: ٤ بدايل بـ [[|]]، كل واحد named group: مسافات، ورقم (عشري اختياري بـ [[(?:\.\d+)?]])، و operator، وقوس. جوه [[[-+*\/^]]] الـ [[-]] في الأول عشان تبقى حرف مش range.
- [[y]]: الـ match **لازم** يبدأ عند [[lastIndex]] بالظبط. فلو عند مكان معيّن مفيش token، [[exec]] بترجّع [[null]] بدل ما تدوّر لقدّام.
- [[const start = TOKEN.lastIndex]] قبل [[exec]]: عشان لو فشل نعرف المكان (بعد الفشل [[lastIndex]] بيرجع 0).
- [[Object.entries(m.groups).find(...)]]: الـ group اللي اتطابق هو الوحيد اللي قيمته مش [[undefined]]، واسمه هو نوع الـ token.
- [[TOKEN.lastIndex = 0]] في أول الدالة: الـ regex متشارك بين النداءات، ولو نداء قبله وقع في النص ممكن يكون [[lastIndex]] مش صفر.
- [[TokenError]]: [[name]] كـ class field عشان الرسالة تبدأ بـ [[TokenError]] مش [[SyntaxError]]، و [[pos]] للي عايز يعرض المكان بنفسه.

**غلطة شفناها:** نسخة بـ [[g]] بدل [[y]] (عملناها بـ [[sed]] ونفس الكود):

~~~text الناتج بـ g على "7 % 2"
num:7  num:2
~~~

الـ [[%]] **اختفى من غير ولا error**: مع [[g]]، [[exec]] لما ملقاش token عند [[%]] دوّر لقدّام ولقى المسافة اللي بعدها، فاتنطّ. ده بالظبط ليه الـ tokenizers بتستخدم [[y]].` },
        { lvl: 'متوسط', t: R`highlighter بيرسم تحت الـ matches`, what: R`[[highlight.mjs "<pattern>" <file> [flags]]] بيدوّر في الملف سطر سطر، ولكل match بيطبع سطر تحته فيه [[^]] تحت الـ match وأول حرف من اسم كل named group مكان بدايته، وفي الآخر عدد الـ matches والـ regex اللي اتستخدم. الـ flags [[g]] و [[d]] بيتضافوا لوحدهم من غير ما يتكرروا، والـ pattern البايظ بيطبع الـ SyntaxError ويخرج بـ 2. من دروس «RegExp exec: الـ result array و indices و lastIndex» و «regex literal و new RegExp: خصايص الـ RegExp و toString».`, done: R`على ملف ٣ سطور فيه [[A-17]] و [[b-3]] و [[C-120]]، الأمر [[node highlight.mjs '(?<letter>[A-Z])-(?<num>\d+)' orders.txt i]] بيرسم ٣ علامات تحت أماكنهم بالظبط، وبيقول [[3 match بـ /(?<letter>[A-Z])-(?<num>\d+)/dgi]]. و [['(']] بيطبع [[Unterminated group]] و [[exit=2]]، والـ flags [[gd]] مبتتكررش.`, sol: R`**هتشوف إيه:**

~~~text الناتج (Node 24.22)
  1 | order A-17 paid 250 EGP
    |       l^n^
  3 | order b-3 and order C-120
    |       l^n
    |                     l^n^^
3 match بـ /(?<letter>[A-Z])-(?<num>\d+)/dgi
Invalid regular expression: /(/dg: Unterminated group
exit=2
~~~

السطر التاني ([[no code here]]) مش ظاهر لأنه مفيهوش match. و [[l]] تحت أول حرف في [[letter]]، و [[n]] تحت أول رقم في [[num]]، والـ [[^]] باقي الـ match.

~~~js highlight.mjs
// highlight.mjs: يدوّر بـ regex في ملف ويرسم تحت كل match وكل named group مكانهم بالظبط (flag d)
import { readFileSync } from "node:fs";

export function highlightLine(line, re) {
  const out = [];
  for (const m of line.matchAll(re)) {
    const [start, end] = m.indices[0];
    const marks = Array(line.length).fill(" ");
    for (let i = start; i < end; i++) marks[i] = "^";
    for (const [name, span] of Object.entries(m.indices.groups ?? {})) {
      if (!span) continue;
      marks[span[0]] = name[0];
    }
    out.push(marks.join("").trimEnd());
  }
  return out;
}

export function buildRegex(pattern, extra = "") {
  const flags = new Set(["g", "d", ...extra]);
  return new RegExp(pattern, [...flags].join(""));
}

if (import.meta.main) {
  const [, , pattern, file, flags = ""] = process.argv;
  if (!pattern || !file) {
    console.error('الاستخدام: node highlight.mjs "<pattern>" <file> [flags]');
    process.exit(2);
  }
  let re;
  try { re = buildRegex(pattern, flags); }
  catch (e) { console.error(e.message); process.exit(2); }
  let total = 0;
  readFileSync(file, "utf8").split(/\r?\n/).forEach((line, i) => {
    const marks = highlightLine(line, re);
    if (!marks.length) return;
    total += marks.length;
    console.log(String(i + 1).padStart(3) + " | " + line);
    for (const mk of marks) console.log("    | " + mk);
  });
  console.log($__bt$__{total} match بـ $__{re}$__bt);
}
~~~

**كل حتة بتعمل إيه:**

- [[buildRegex]]: [[new Set(["g", "d", ...extra])]] بيشيل التكرار، فلو اليوزر كتب [[gd]] الـ flags تفضل [[dg]] مش [[gddg]] (اللي كانت هترمي [[Invalid flags]]).
- [[line.matchAll(re)]]: بيلف على كل الـ matches، وكل واحد معاه [[indices]] لأن فيه [[d]].
- [[m.indices[0]]]: [[[start, end]]] بتاع الـ match كله، فبنحط [[^]] من [[start]] لـ [[end - 1]].
- [[m.indices.groups]]: نفس الشكل لكل named group. لو group اختياري ومشاركش، مكانه [[undefined]]، عشان كده [[if (!span) continue]].
- [[trimEnd()]]: يشيل المسافات اللي في آخر سطر العلامات.

**حاجة اتعلمناها:** السطر العربي في الترمنال بيتعرض من اليمين للشمال، والـ [[^]] تحت مش هتيجي تحت الحرف الصح بالعين، مع إن الأرقام صح. لو هتستخدمه على نص عربي اطبع الأرقام ([[start]] و [[end]]) جنب العلامات، أو اعرض النتيجة في صفحة HTML بـ [[<mark>]].` },
        { lvl: 'كبير', t: R`فاحص لوجات بيقولك فين السطر وقع`, what: R`أداة [[log-check]] بتقرا access log كل سطر فيه [[ts method path status ms ip]]، وتفك كل سطر سليم بـ regex واحد بـ named groups و flag [[d]]، والـ method بأي حالة حروف بـ modifier [[(?i:...)]] بس الباقي حساس. السطر البايظ بيتقال عليه **أنهي حقل** وقع **عند أنهي عمود** وعلامة [[^]] تحته (حقل حقل بـ [[y]]). وفي الآخر: عدد السليم والبايظ، وعدد كل status، والأبطأ. و [[--show]] بيرسم تحت كل سطر سليم مكان كل حقل. ومعاها ٦ اختبارات بـ [[node --test]] منها اختبار ReDoS. من الوحدة كلها.`, done: R`على لوج ٧ سطور (منهم سطر فاضي، و [[post]] صغيرة، و [[2O0]] بحرف O، وتاريخ من غير T، وكلمة زيادة في الآخر): ٣ سليم و ٣ بايظ، كل واحد بالحقل والعمود الصح، و [[{"200":1,"401":1,"500":1}]]، والأبطأ [[GET /api/orders 930ms]]، والـ exit code 1. و [[node --test]] بيقول [[pass 6]]، والملف المش موجود بيطبع [[ENOENT]] ويخرج بـ 2.`, ext: R`خلّي الحقول تتقري من ملف JSON بدل [[patterns.mjs]] عشان تدعم أكتر من شكل لوج، وزوّد [[--json]] يطبع التقرير JSON لأداة تانية، وخليها تقرا من [[stdin]] عشان تشتغل في pipe ([[tail -f access.log | log-check -]]).`, sol: R`**هتشوف إيه:** كل سطر سليم وتحته مكان حقوله، وكل سطر بايظ بالحقل والعمود، وملخص:

~~~text الناتج (Node 24.22): node log-check.mjs access.log --show
  2026-11-21T10:15:02Z GET /api/orders/17 200 35ms ip=10.0.0.7
  t------------------- m-- p------------- s-- m-      i-------
  2026-11-21T10:15:03Z post /api/login 401 120ms ip=10.0.0.9
  t------------------- m--- p--------- s-- m--      i-------
  2026-11-21T10:15:07Z GET /api/orders 500 930ms ip=10.0.0.3
  t------------------- m-- p---------- s-- m--      i-------
سطر 3: الحقل «status» بايظ عند العمود 44
  2026-11-21T10:15:04Z GET /api/menu?lang=ar 2O0 8ms ip=10.0.0.7
                                             ^
سطر 4: الحقل «ts» بايظ عند العمود 1
  2026-11-21 10:15:05 GET /api/orders 500 900ms ip=10.0.0.3
  ^
سطر 6: الحقل «end» بايظ عند العمود 64
  2026-11-21T10:15:06Z DELETE /api/orders/17 204 15ms ip=10.0.0.7 extra
                                                                 ^
سليم: 3  بايظ: 3
الـ status: {"200":1,"401":1,"500":1}
الأبطأ: GET /api/orders 930ms
exit=1
~~~

**الملفات:**

~~~text شجرة الملفات
log-check/
  patterns.mjs      الحقول: اسم كل حقل والـ pattern بتاعه، والـ regex الكامل والخطوات
  check.mjs         parseLine و locate و marks و analyze و formatBad
  log-check.mjs     الـ CLI: يقرا الملف ويطبع التقرير والـ exit code
  check.test.mjs    ٦ اختبارات بـ node:test
  access.log        لوج تجربة
~~~

~~~text access.log
2026-11-21T10:15:02Z GET /api/orders/17 200 35ms ip=10.0.0.7
2026-11-21T10:15:03Z post /api/login 401 120ms ip=10.0.0.9
2026-11-21T10:15:04Z GET /api/menu?lang=ar 2O0 8ms ip=10.0.0.7
2026-11-21 10:15:05 GET /api/orders 500 900ms ip=10.0.0.3

2026-11-21T10:15:06Z DELETE /api/orders/17 204 15ms ip=10.0.0.7 extra
2026-11-21T10:15:07Z GET /api/orders 500 930ms ip=10.0.0.3
~~~

~~~js patterns.mjs
// patterns.mjs: كل حقل في سطر اللوج: اسمه، والـ pattern بتاعه، والنص اللي بعده
export const FIELDS = [
  { name: "ts", src: String.raw$__bt\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$__bt, after: " " },
  { name: "method", src: String.raw$__bt(?i:GET|POST|PUT|PATCH|DELETE)$__bt, after: " " },
  { name: "path", src: String.raw$__bt\/[^\s?]*(?:\?\S*)?$__bt, after: " " },
  { name: "status", src: String.raw$__bt[1-5]\d{2}$__bt, after: " " },
  { name: "ms", src: String.raw$__bt\d+$__bt, after: "ms ip=" },
  { name: "ip", src: String.raw$__bt(?:\d{1,3}\.){3}\d{1,3}$__bt, after: "" },
];

// السطر كله: كل حقل named group، والـ d عشان نعرف مكان كل حقل
export const LINE = new RegExp(
  "^" + FIELDS.map((f) => $__bt(?<$__{f.name}>$__{f.src})$__{RegExp.escape(f.after)}$__bt).join("") + "$",
  "d",
);

// حقل حقل بـ y: عشان نعرف السطر البايظ وقع عند أنهي حقل وأنهي عمود
export const STEPS = FIELDS.map((f) => ({
  name: f.name,
  re: new RegExp($__bt(?:$__{f.src})$__{RegExp.escape(f.after)}$__bt, "y"),
}));
~~~

~~~js check.mjs
// check.mjs: يفك سطور اللوج، ويقول البايظ وقع فين، ويلخّص
import { LINE, STEPS } from "./patterns.mjs";

export function parseLine(line) {
  const m = LINE.exec(line);
  if (!m) return null;
  const g = m.groups;
  return { ts: g.ts, method: g.method.toUpperCase(), path: g.path, status: Number(g.status), ms: Number(g.ms), ip: g.ip, indices: m.indices.groups };
}

export function locate(line) {
  let pos = 0;
  for (const { name, re } of STEPS) {
    re.lastIndex = pos;
    if (!re.exec(line)) return { field: name, col: pos };
    pos = re.lastIndex;
  }
  return pos === line.length ? null : { field: "end", col: pos };
}

export function marks(line, indices) {
  const row = Array(line.length).fill(" ");
  for (const [name, [start, end]] of Object.entries(indices)) {
    for (let i = start; i < end; i++) row[i] = i === start ? name[0] : "-";
  }
  return row.join("").trimEnd();
}

export function analyze(text) {
  const report = { ok: [], bad: [], byStatus: {}, slowest: null };
  text.split(/\r?\n/).forEach((line, i) => {
    if (line.trim() === "") return;
    const rec = parseLine(line);
    if (!rec) {
      report.bad.push({ no: i + 1, line, ...(locate(line) ?? { field: "?", col: 0 }) });
      return;
    }
    report.ok.push({ no: i + 1, line, ...rec });
    report.byStatus[rec.status] = (report.byStatus[rec.status] ?? 0) + 1;
    if (!report.slowest || rec.ms > report.slowest.ms) report.slowest = rec;
  });
  return report;
}

export function formatBad(b) {
  return $__btسطر $__{b.no}: الحقل «$__{b.field}» بايظ عند العمود $__{b.col + 1}\n  $__{b.line}\n  $__{" ".repeat(b.col)}^$__bt;
}
~~~

~~~js log-check.mjs
// log-check.mjs: node log-check.mjs <file> [--show]
import { readFileSync } from "node:fs";
import { analyze, formatBad, marks } from "./check.mjs";

const [, , file, flag] = process.argv;
if (!file) {
  console.error("الاستخدام: node log-check.mjs <file> [--show]");
  process.exit(2);
}
let text;
try {
  text = readFileSync(file, "utf8");
} catch (e) {
  console.error($__btمش قادر أقرا $__{file}: $__{e.code}$__bt);
  process.exit(2);
}
const r = analyze(text);
if (flag === "--show") {
  for (const rec of r.ok) console.log("  " + rec.line + "\n  " + marks(rec.line, rec.indices));
}
for (const b of r.bad) console.log(formatBad(b));
console.log($__btسليم: $__{r.ok.length}  بايظ: $__{r.bad.length}$__bt);
console.log("الـ status:", JSON.stringify(r.byStatus));
if (r.slowest) console.log($__btالأبطأ: $__{r.slowest.method} $__{r.slowest.path} $__{r.slowest.ms}ms$__bt);
process.exitCode = r.bad.length ? 1 : 0;
~~~

~~~js check.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { parseLine, locate, analyze, marks } from "./check.mjs";

const good = "2026-11-21T10:15:02Z GET /api/orders/17 200 35ms ip=10.0.0.7";

test("سطر سليم بيتفك لحقوله", () => {
  const r = parseLine(good);
  assert.equal(r.method, "GET");
  assert.equal(r.status, 200);
  assert.equal(r.ms, 35);
  assert.deepEqual(r.indices.path, [25, 39]);
});

test("الـ method بأي حالة حروف، والباقي حساس", () => {
  assert.equal(parseLine(good.replace("GET", "get")).method, "GET");
  assert.equal(parseLine(good.replace("ip=", "IP=")), null);
});

test("locate بيقول الحقل والعمود", () => {
  assert.deepEqual(locate(good.replace("200", "2O0")), { field: "status", col: 40 });
  assert.deepEqual(locate(good.replace("GET", "FETCH")), { field: "method", col: 21 });
  assert.deepEqual(locate(good + " extra"), { field: "end", col: good.length });
  assert.equal(locate(good), null);
});

test("analyze: العد والأبطأ والسطور الفاضية و CRLF", () => {
  const text = [good, "", "2026-11-21T10:15:03Z POST /api/login 401 120ms ip=10.0.0.9", "garbage"].join("\r\n");
  const r = analyze(text);
  assert.equal(r.ok.length, 2);
  assert.equal(r.bad.length, 1);
  assert.equal(r.bad[0].no, 4);
  assert.deepEqual(r.byStatus, { 200: 1, 401: 1 });
  assert.equal(r.slowest.path, "/api/login");
});

test("marks بيرسم تحت كل حقل", () => {
  const r = parseLine(good);
  assert.equal(marks(good, r.indices).slice(0, 24), "t------------------- m--");
});

test("مفيش ReDoS: سطر طويل بايظ بيخلص بسرعة", () => {
  const evil = "2026-11-21T10:15:02Z GET /" + "a".repeat(50000) + " 200 ";
  const t0 = performance.now();
  analyze(evil);
  assert.ok(performance.now() - t0 < 200);
});
~~~

~~~text الناتج: node --test (آخر السطور)
✔ locate بيقول الحقل والعمود (0.4619ms)
✔ analyze: العد والأبطأ والسطور الفاضية و CRLF (0.3344ms)
✔ marks بيرسم تحت كل حقل (0.2384ms)
✔ مفيش ReDoS: سطر طويل بايظ بيخلص بسرعة (1.0968ms)
ℹ tests 6
ℹ pass 6
ℹ fail 0
~~~

**ترتيب البناء:**

1. **[[patterns.mjs]] الأول:** كل حقل [[{ name, src, after }]]، و [[src]] مكتوب بـ [[String.raw]] عشان [[\d]] متضيعش (درس «regex literal و new RegExp»). [[after]] النص الثابت اللي بعد الحقل، وبيعدّي على [[RegExp.escape]] عشان [[ms ip=]] أو أي رمز فيه يفضل حرفي.
2. **[[LINE]]:** الحقول كلها named groups جنب بعض، بين [[^]] و [[$]]، والـ flag [[d]] بس. و [[(?i:GET|POST|...)]] modifier: الـ method بس مش حساس للحروف، فـ [[post]] بيعدّي و [[IP=]] لأ.
3. **[[STEPS]]:** نفس الحقول، كل واحد regex لوحده بـ [[y]]. [[locate]] بتحط [[lastIndex]] مكان ما اللي قبله خلص، وأول حقل [[exec]] بتاعه يرجّع [[null]] هو اللي وقع، و [[pos]] هو العمود.
4. **[[check.mjs]]:** [[parseLine]] بترجّع الحقول كأرقام ([[Number]]) ومعاها [[indices]]، و [[analyze]] بتلف على السطور بـ [[split(/\r?\n/)]] عشان ملفات ويندوز، وبتتجاهل الفاضي.
5. **[[log-check.mjs]]:** exit code 2 للاستخدام الغلط والملف المش موجود، و 1 لو فيه سطر بايظ، و 0 لو كله سليم: عشان يتحط في سكربت أو CI.
6. **الاختبارات:** حالة سليمة، و modifier، و [[locate]] بـ ٣ أشكال غلط، و CRLF، والرسم، و ReDoS (سطر ٥٠ ألف حرف خلص في 1ms).

**غلطة حقيقية وإحنا بنبنيه:** لو ضفت [[g]] لـ [[LINE]] (عادة من [[matchAll]])، النتيجة بتبوظ في صمت:

~~~text الناتج بـ "dg" بدل "d"
سليم: 2  بايظ: 4
الـ status: {"200":1,"500":1}
~~~

سطر [[post]] السليم اتحسب بايظ: [[exec]] الأولى نجحت وخلّت [[lastIndex]] في آخر السطر، والتانية بدأت من هناك على السطر اللي بعده ففشلت. نفس فخ [[g]] مع [[test]] في درس «groups و flags»، وعشان كده [[LINE]] من غير [[g]]، و [[STEPS]] بـ [[y]] وبنحط [[lastIndex]] بإيدنا.` },
        { lvl: 'فكرة', t: R`قواعد تنضيف نص بالـ regex`, what: R`اختار نوع نص بتتعامل معاه (رسايل عملا، أو أسامي منتجات، أو تعليقات) واكتب له ملف قواعد: كل قاعدة اسم و regex وبيتبدّل بإيه، والدالة [[clean(text)]] بتعدّي النص على القواعد بالترتيب. استخدم على الأقل: [[\k<name>]]، و modifier، و lookbehind، و [[\p{...}]] مع [[u]] أو [[v]].`, done: R`كل قاعدة ليها مثال قبل وبعد، والقواعد مبتبوظش نص سليم (رقم ١٢ رقم مبيتخفاش، وكلمة فيها حرفين متكررين زي «كوود» متتلمسش)، والترتيب مكتوب ليه.`, ext: R`اعمل صفحة فيها textarea تكتب فيها الرسالة وتشوف كل قاعدة غيّرت إيه (diff)، أو زوّد لكل قاعدة اختبار بـ [[node --test]].`, sol: R`**نسخة نموذجية:** تنضيف رسايل العملا قبل ما تتخزن في السيستم:

~~~text الناتج (Node 24.22)
عايز الطلب بكرة، رقمي 01X-XXXX-5678 و CODE:SAVE20
~~~

ده ناتج [[clean("عاااايز   الطلـــب بكرة، رقمي 01012345678 و Code: SAVE20")]].

~~~js clean.mjs
// clean.mjs: قواعد تنضيف رسايل العملا قبل ما تتخزن، كل قاعدة regex واسم ومثال
export const RULES = [
  { name: "مسافات زيادة", re: /[^\S\r\n]{2,}/g, to: " " },
  { name: "تطويل", re: /(?<=\p{Script=Arabic})ـ+/gu, to: "" },
  { name: "تكرار حروف", re: /(?<ch>\p{L})\k<ch>{2,}/gu, to: "$<ch>" },
  { name: "إخفاء موبايل", re: /(?<!\d)01[0125](?<mid>\d{4})(?<end>\d{4})(?!\d)/g, to: "01X-XXXX-$<end>" },
  { name: "كود خصم بأي حالة", re: /\b(?i:code)[:\s]*(?<c>[A-Z0-9]{4,8})\b/g, to: "CODE:$<c>" },
];

export function clean(text) {
  return RULES.reduce((t, r) => t.replace(r.re, r.to), text);
}

if (import.meta.main) {
  const msg = "عاااايز   الطلـــب بكرة، رقمي 01012345678 و Code: SAVE20";
  console.log(clean(msg));
}
~~~

**ليه التصميم ده:**

- كل قاعدة object فيه [[name]]: لو حاجة اتغيّرت غلط تعرف أنهي قاعدة. والـ [[reduce]] بيعدّي النص عليهم بالترتيب.
- **مسافات زيادة** الأول: [[[^\S\r\n]{2,}]] مسافتين أو أكتر من غير ما يلمس السطور.
- **التطويل** ([[ـ]]): [[(?<=\p{Script=Arabic})ـ+]] بعد حرف عربي بس.
- **تكرار حروف**: [[(?<ch>\p{L})\k<ch>{2,}]] حرف وبعده نفس الحرف مرتين أو أكتر، فـ «عاااايز» بقت «عايز» و «كوود» (حرفين بس) متتلمسش.
- **إخفاء الموبايل**: [[(?<!\d)]] و [[(?!\d)]] عشان رقم ١٢ خانة ميتقطعش منه موبايل.
- **كود الخصم**: [[(?i:code)]] modifier: كلمة code بأي حالة، بس الكود نفسه [[[A-Z0-9]]] حساس. جرّبنا [[clean("كوود code:ab12 و 010123456789 و  ok")]] وطلع [[كوود code:ab12 و 010123456789 و ok]]: الكود الصغير مش كود، والرقم الطويل مش موبايل.

**غلطة حصلت:** أول نسخة من قاعدة التطويل كانت [[/\p{Script=Arabic}\K?ـ+/gu]] (عادة من PCRE في PHP و grep -P)، والملف مشتغلش خالص:

~~~text الناتج
SyntaxError: Invalid regular expression: /\p{Script=Arabic}\K?ـ+/gu: Invalid escape
~~~

[[\K]] («انسى اللي فات من الـ match») مش موجودة في JS، ومع [[u]] أي escape مش معروف بيرمي. البديل في JS هو الـ lookbehind [[(?<=...)]].` },
      ],
      items: [
        {
          cmd: "regex literal و new RegExp: خصايص الـ RegExp و toString",
          title: "تكتب الـ regex بين / / ولا بـ new RegExp؟ وتقرا أي regex من خصايصه",
          desc: R`فيه طريقتين تعمل بيهم regex: **regular expression literal** [[/(\d+) EGP/gi]] بيتعمل parse مع الملف كله، فلو غلط الملف مش بيشتغل خالص، وده الأحسن لما الـ pattern ثابت وانت بتكتب الكود. و [[new RegExp(pattern, flags)]] بيبني الـ regex من **نص** وقت التشغيل، فلو غلط بيرمي SyntaxError تقدر تمسكها، وده اللي بتستخدمه لما الـ pattern جاي من يوزر أو متركّب من حتت.

الفخ في الطريقة التانية: الـ pattern جوه علامات تنصيص عادية، و [[\]] ليها معنى في النص نفسه قبل ما توصل للـ regex. فـ [["\d"]] بتبقى [["d"]]. الحل [[\\d]] أو [[String.raw]].

وأي regex object فيه خصايص تقرا منها هو إيه: [[source]] (الـ pattern كنص) و [[flags]] (كل الـ flags) و boolean لكل flag ([[global]] و [[ignoreCase]] و [[multiline]] و [[dotAll]] و [[unicode]] و [[unicodeSets]] و [[hasIndices]] و [[sticky]])، و [[lastIndex]] (الخاصية الوحيدة اللي بتتغيّر)، و [[toString()]] اللي بترجّع [[/source/flags]].`,
          example: R`// نفس الـ regex بـ ٣ طرق: literal، و new RegExp بنص عادي، و String.raw
const lit = /(\d+)\s*EGP/gi;
const built = new RegExp("(\\d+)\\s*EGP", "gi");
const raw = new RegExp(String.raw$__bt(\d+)\s*EGP$__bt, "gi");
console.log(lit.source, built.source === lit.source, raw.source === lit.source);
const wrong = new RegExp("(\d+)\s*EGP", "gi");
console.log(wrong.source, wrong.test("50 EGP"));
// الـ properties: كلها getters على RegExp.prototype ما عدا lastIndex
console.log(lit.flags, lit.global, lit.ignoreCase, lit.multiline, lit.dotAll, lit.sticky);
console.log(lit.unicode, lit.unicodeSets, lit.hasIndices, lit.lastIndex, String(lit));
const copy = new RegExp(lit, "dy");
console.log(copy.flags, copy.source === lit.source, copy === lit);
const word = "c++";
console.log(new RegExp($__bt^$__{RegExp.escape(word)}$$__bt, "i").test("C++"));
try { new RegExp("(\\d+"); } catch (e) { console.log(e.name + ": " + e.message); }`,
          try: R`اكتب دالة [[flagNames(re)]] بترجّع array بأسامي الـ flags اللي شغالة في الـ regex بالترتيب ده: [[hasIndices]] و [[global]] و [[ignoreCase]] و [[multiline]] و [[dotAll]] و [[unicode]] و [[unicodeSets]] و [[sticky]]، من الخصايص مش من نص [[flags]]. يعني [[flagNames(/x/gi)]] بترجّع [[["global", "ignoreCase"]]]. حلها في المربع اللي تحت ودوس «شغّل واختبر».`,
          sol: R`~~~js flag-names.mjs
const NAMES = { d: "hasIndices", g: "global", i: "ignoreCase", m: "multiline", s: "dotAll", u: "unicode", v: "unicodeSets", y: "sticky" };
function flagNames(re) {
  return Object.values(NAMES).filter((name) => re[name]);
}
console.log(flagNames(/x/gi), flagNames(/x/dmsy), flagNames(/x/v), flagNames(/x/));
~~~

~~~text الناتج (Node 24.22)
[ 'global', 'ignoreCase' ] [ 'hasIndices', 'multiline', 'dotAll', 'sticky' ] [ 'unicodeSets' ] []
~~~

- [[NAMES]] بيربط حرف كل flag باسم الخاصية بتاعته، ومترتّب بنفس ترتيب [[flags]] (d g i m s u v y).
- [[re[name]]]: قراية خاصية باسم في متغير، زي [[re.global]] بالظبط.
- [[filter]] بيسيب اللي قيمته [[true]] بس.`,
          check: {
            lang: "js",
            starter: R`function flagNames(re) {
  // رجّع أسامي الخصايص اللي قيمتها true
}`,
            tests: R`test("/x/gi", () => expect(flagNames(/x/gi)).toEqual(["global", "ignoreCase"]));
test("الترتيب ثابت: /x/ysmd", () => expect(flagNames(/x/ysmd)).toEqual(["hasIndices", "multiline", "dotAll", "sticky"]));
test("v لوحدها", () => expect(flagNames(/x/v)).toEqual(["unicodeSets"]));
test("u لوحدها", () => expect(flagNames(/x/u)).toEqual(["unicode"]));
test("من غير flags", () => expect(flagNames(/x/)).toEqual([]));
test("regex من new RegExp", () => expect(flagNames(new RegExp("a", "ig"))).toEqual(["global", "ignoreCase"]));`,
            solution: R`function flagNames(re) {
  const NAMES = ["hasIndices", "global", "ignoreCase", "multiline", "dotAll", "unicode", "unicodeSets", "sticky"];
  return NAMES.filter((name) => re[name]);
}`
          },
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[const a = new RegExp("\d+\.\d+")]]. إيه اللي هيطبعه [[a.source]] و [[a.test("3.14")]] و [[a.test("dd.d")]]؟ وبعدين اكتبه صح بطريقتين.`, done: R`توقعت إن الـ source [[d+.d+]] وإن [["3.14"]] مش هيعدّي بس [["dd.d"]] هيعدّي، وكتبت النسختين [["\\d+\\.\\d+"]] و [[String.raw]] وطلعوا نفس الـ source.`, sol: R`~~~js p1.mjs
const a = new RegExp("\d+\.\d+");
console.log(a.source, a.test("3.14"), a.test("dd.d"));
const b = new RegExp("\\d+\\.\\d+");
const c = new RegExp(String.raw$__bt\d+\.\d+$__bt);
console.log(b.source, b.test("3.14"), c.source === b.source);
~~~

~~~text الناتج (Node 24.22)
d+.d+ false true
\d+\.\d+ true true
~~~

- في نص عادي [["\d"]] escape مش معروف، فالـ JavaScript بيرمي الـ [[\]] ويسيب [[d]]. و [["\."]] بتبقى [["."]]. فالـ regex اللي اتبنى [[d+.d+]]: «حرف d مرة أو أكتر، أي حرف، d مرة أو أكتر»، فـ [["dd.d"]] عدّت و [["3.14"]] لأ.
- مفيش ولا error: الغلطة دي بتعدّي في صمت. عشان كده أول حاجة تعملها لما regex مبني بـ [[new RegExp]] مش شغال: اطبع [[re.source]].
- [["\\d"]] في النص = [[\d]] في الـ regex. و [[String.raw$__bt...$__bt]] بيسيب كل [[\]] زي ما هي، فتكتب الـ pattern بنفس شكل الـ literal.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[function wordFinder(word) { return new RegExp("\b" + word + "\b", "i"); }]]. جرّب [[wordFinder("tea").test("Tea time")]] واطبع [[JSON.stringify(wordFinder("tea").source)]]. وبعدين جرّب الكلمة [["1.5"]] على [["x 105 y"]].`, done: R`عرفت إن [["\b"]] في النص بقت حرف backspace مش word boundary (الـ test رجّعت [[false]])، وصلّحتها بـ [[String.raw]]، وزوّدت [[RegExp.escape]] فبقت [[wordFinder("1.5")]] متطابقش [["105"]].`, sol: R`~~~js p3.mjs
function wordFinderBad(word) { return new RegExp("\b" + word + "\b", "i"); }
function wordFinder(word) { return new RegExp(String.raw$__bt\b$__bt + RegExp.escape(word) + String.raw$__bt\b$__bt, "i"); }
console.log(JSON.stringify(wordFinderBad("tea").source), wordFinderBad("tea").test("Tea time"));
console.log(wordFinder("tea").source, wordFinder("tea").test("Tea time"), wordFinder("tea").test("steam"));
console.log(wordFinder("1.5").test("x 105 y"), wordFinder("1.5").test("x 1.5 y"));
~~~

~~~text الناتج (Node 24.22)
"\btea\b" false
\b\x74ea\b true false
false true
~~~

- [["\b"]] في نص JavaScript **escape معروف**: حرف backspace (كوده 8)، مش [[\]] و [[b]]. فالـ regex بقى «backspace ثم tea ثم backspace» ومفيش نص فيه كده. و [[JSON.stringify]] بيكتب حرف الـ backspace [[\b]]، فشكله زي الصح وهو غلط، وده اللي بيخلّي الباج ده صعب.
- [[String.raw$__bt\b$__bt]] بيدّي حرفين حقيقيين: [[\]] و [[b]].
- [[RegExp.escape(word)]]: الكلمة جاية من برّه، و [[.]] فيها كانت هتطابق أي حرف، فـ [["1.5"]] كانت هتلاقي [["105"]]. ([[\x74]] هو حرف t: [[RegExp.escape]] بتعمل كده لأول حرف، شرحناه في درس «test و match و matchAll و replace».)` },
            { lvl: 'تطبيق', t: R`**ابني:** [[withFlags(re, add, remove)]] بترجّع regex **جديد** بنفس الـ source والـ flags بعد ما تزوّد اللي في [[add]] وتشيل اللي في [[remove]]، ومتلمسش الأصلي ولا [[lastIndex]] بتاعه، وترمي TypeError مفهومة لو النتيجة فيها [[u]] و [[v]] مع بعض.`, done: R`[[withFlags(/(\d+) EGP/gi, "d", "g")]] بترجّع regex الـ flags بتاعه [[di]] و [[lastIndex]] صفر، والأصلي فضل [[gi]] و [[lastIndex]] بتاعه زي ما هو، و [[withFlags(/x/u, "v")]] بترمي رسالتك انت مش رسالة الـ engine.`, sol: R`~~~js p4.mjs
function withFlags(re, add = "", remove = "") {
  const flags = new Set(re.flags);
  for (const f of remove) flags.delete(f);
  for (const f of add) flags.add(f);
  if (flags.has("u") && flags.has("v")) throw new TypeError("u و v مينفعوش مع بعض: اختار واحد");
  return new RegExp(re.source, [...flags].join(""));
}
const base = /(\d+) EGP/gi;
base.lastIndex = 7;
const copy = withFlags(base, "d", "g");
console.log(copy.flags, copy.lastIndex, base.lastIndex, copy.source === base.source);
try { withFlags(/x/u, "v"); } catch (e) { console.log(e.name + ": " + e.message); }
console.log(withFlags(/x/u, "v", "u").flags);
~~~

~~~text الناتج (Node 24.22)
di 0 7 true
TypeError: u و v مينفعوش مع بعض: اختار واحد
v
~~~

- [[new Set(re.flags)]]: النص [["gi"]] بيتفك لحروفه، والـ Set بيمنع التكرار، فـ [[add]] لـ flag موجود مبيعملش [["gg"]] (اللي كانت هترمي [[Invalid flags]]).
- [[new RegExp(re.source, ...)]] بيعمل object جديد [[lastIndex]] بتاعه 0، فالأصلي مبيتأثرش.
- كان ممكن [[new RegExp(re, flags)]] على طول (الـ constructor بياخد regex وبيستخدم الـ source بتاعه)، بس بناء الـ flags بإيدك هو اللي بيخليك تشيل وتزوّد.
- لاحظ إن الـ flags بتطلع مترتبة [[di]] مش [[id]]: الـ getter [[flags]] بيرتّبهم دايمًا.` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من غير ما تجرّب، [[new RegExp("a", "yusmigd").flags]] هتطبع إيه؟ دوّر في صفحة MDN بتاعة [[RegExp.prototype.flags]] على الترتيب، وبعدين جرّب و [[String(new RegExp("a", "yvsmigd"))]] كمان.`, done: R`لقيت إن الترتيب ثابت مهما كتبتهم، وتوقعت [[dgimsuy]] و [[/a/dgimsvy]] وطلعوا كده.`, sol: R`~~~js p5.mjs
console.log(new RegExp("a", "yusmigd").flags, String(new RegExp("a", "yvsmigd")));
~~~

~~~text الناتج (Node 24.22)
dgimsuy /a/dgimsvy
~~~

MDN بيقول إن [[flags]] بيتبني بقراية كل خاصية boolean بالترتيب: [[hasIndices]] (d) ثم [[global]] (g) ثم [[ignoreCase]] (i) ثم [[multiline]] (m) ثم [[dotAll]] (s) ثم [[unicode]] (u) ثم [[unicodeSets]] (v) ثم [[sticky]] (y)، يعني **أبجدي**. و [[toString()]] بيستخدم [[flags]]، فالترتيب في [[/a/dgimsvy]] نفسه. فايدتها: لو بتقارن regexين بالنص ([[String(a) === String(b)]]) الترتيب اللي اتكتبوا بيه مبيفرقش.` },
          ],
          flag: "script",
          deep: {
            why: R`الـ regex في الشغل الحقيقي مش دايمًا ثابت: بحث بكلمة اليوزر، وقايمة كلمات ممنوعة من قاعدة بيانات، و pattern في ملف config، و Zod و ESLint بياخدوا regex ويعرضوه في رسالة. ولو مش فاهم إن [["\d"]] بتضيع في النص، أو إن [[lastIndex]] حالة متخزنة جوه الـ object، هتقضي ساعات على باج بيعدّي في صمت.`,
            how: R`الـ **literal** [[/.../flags]] جزء من الـ grammar: الـ parser بيقراه مع الملف، فأي غلطة فيه SyntaxError **قبل ما أول سطر يشتغل**. وكل مرة الكود يعدّي على الـ literal بيتعمل object **جديد** ([[make() === make()]] بـ [[false]])، بس الـ pattern نفسه مبيتعملش له compile تاني.

[[new RegExp(x, flags)]]: لو [[x]] نص، بيعمل parse وقت التشغيل. ولو [[x]] regex، بياخد [[source]] بتاعه، ولو بعت flags جديدة بتحل محل القديمة بالكامل (مش بتتضاف). و [[RegExp(x)]] من غير [[new]] بيرجّع نفس الـ object لو [[x]] regex ومفيش flags.

الخصايص كلها **getters على [[RegExp.prototype]]** (مش على الـ object)، فـ [[Object.getOwnPropertyNames(/a/)]] بيطلع [[[ 'lastIndex' ]]] بس، والكتابة فيهم بترمي في strict mode ([[TypeError: Cannot set property global of [object Object] which has only a getter]]). يعني الـ regex مبيتغيّرش بعد ما يتعمل، إلا [[lastIndex]].

و [[source]] للـ regex الفاضي [[(?:)]] (عشان [[//]] تعليق)، و [[/]] جوه الـ pattern بتطلع [[\/]]، والسطر الجديد [[\n]]: [[source]] دايمًا نص ينفع يتحط بين [[/ /]] ويشتغل.`,
            when: R`literal في ٩٠٪ من الحالات: الـ pattern ثابت، والغلط يبان أول ما تشغّل، والـ editor بيلوّنه. و [[new RegExp]] لما الـ pattern متركّب: كلمة يوزر (دايمًا مع [[RegExp.escape]])، أو حتت من config، أو نسخة من regex موجود بـ flags مختلفة. واقرا الخصايص في أي كود بياخد regex من برّه: مثلًا ارفض أي regex مفيهوش [[g]] قبل [[matchAll]]، أو اعمل نسخة من غير [[g]] قبل [[test]].`,
            mistakes: R`[["\d"]] و [["\b"]] و [["\s"]] في نص عادي (الأولى والتالتة بيضيعوا الـ [[\]]، والتانية بتبقى حرف backspace). ونص يوزر في [[new RegExp]] من غير escape. ومقارنة regexين بـ [[===]] (دايمًا [[false]]: objects مختلفة) بدل [[String(a) === String(b)]]. وتفتكر [[new RegExp(re, "y")]] بيزوّد [[y]] على الـ flags القديمة: لأ، بيبدّلها. وتعدّل [[re.global = true]] وتستغرب إنه مبيتغيّرش.`
          },
          teach: R`## الفكرة في سطر

الـ regex ليه شكلين في الكود: **literal** بين [[/ /]]، أو **object** بتبنيه بـ [[new RegExp]]. الاتنين بيطلّعوا نفس النوع ([[RegExp]])، والفرق إمتى الـ pattern بيتقري، ومين بيتعامل مع الـ [[\]]. وبعد ما يتعمل، كل حاجة عنه مكتوبة في خصايصه. كل الناتج هنا اتشغّل فعلًا على Node 24.22 (ويندوز).

---

## ١. regular expression literal: بيتقري مع الملف

~~~js app.mjs
const lit = /(\d+)\s*EGP/gi;
~~~

| الحتة | معناها |
|---|---|
| [[/]] الأولى والأخيرة | حدود الـ literal، زي علامات التنصيص حوالين النص. مش جزء من الـ pattern |
| [[(\d+)\s*EGP]] | الـ pattern: رقم أو أكتر (محفوظ في group)، مسافات اختيارية، وكلمة EGP |
| [[gi]] | الـ flags بعد الـ [[/]] الأخيرة: كل الـ matches، ومن غير حساسية للحروف |

الـ literal بيتعمل له parse **مع الملف كله**. جرّبنا ملف فيه [[console.log]] وبعده regex غلط:

~~~js bad.mjs
console.log("السطر ده مش هيتطبع");
const bad = /(\d+/;
~~~

~~~text الناتج
bad.mjs:2
const bad = /(\d+/;
            ^^^^^^

SyntaxError: Invalid regular expression: /(\d+/: Unterminated group
~~~

ولا سطر اشتغل، حتى الـ [[console.log]] اللي قبله. ده كويس: الغلطة بتبان أول ما تشغّل، مش بعد أسبوع في production.

---

## ٢. [[new RegExp]]: بيتقري وقت التشغيل، من نص

~~~js app.mjs
const built = new RegExp("(\\d+)\\s*EGP", "gi");
const raw = new RegExp(String.raw$__bt(\d+)\s*EGP$__bt, "gi");
console.log(lit.source, built.source === lit.source, raw.source === lit.source);
~~~

~~~text الناتج
(\d+)\s*EGP true true
~~~

الـ pattern هنا **نص** (string) عادي، والنص في JavaScript عنده escapes بتاعته: [["\n"]] سطر جديد، و [["\\"]] backslash واحدة. فعشان الـ regex يستلم [[\d]] لازم تكتب في النص [[\\d]].

و [[String.raw]] (tag قبل template literal) معناه «سيب كل [[\]] زي ما هي»، فتكتب الـ pattern بنفس شكل الـ literal بالظبط.

### الغلطة اللي بتعدّي في صمت

~~~js app.mjs
const wrong = new RegExp("(\d+)\s*EGP", "gi");
console.log(wrong.source, wrong.test("50 EGP"));
~~~

~~~text الناتج
(d+)s*EGP false
~~~

[["\d"]] في نص عادي مش escape معروف، فالـ JavaScript بيرمي الـ [[\]] ويسيب [[d]]. الـ regex بقى «حرف d، وحرف s»، ومفيش ولا error. **أول حاجة تعملها لما regex مبني بـ [[new RegExp]] مش شغال: اطبع [[source]].**

### والـ pattern الغلط هنا بيرمي وقت التشغيل

~~~js app.mjs
try { new RegExp("(\\d+"); } catch (e) { console.log(e.name + ": " + e.message); }
~~~

~~~text الناتج
SyntaxError: Invalid regular expression: /(\d+/: Unterminated group
~~~

نفس الرسالة، بس المرة دي **جوه try**، فتقدر تمسكها وتقول لليوزر «الـ pattern بتاعك غلط» بدل ما البرنامج يقع.

---

## ٣. خصايص الـ RegExp: الجدول كامل

~~~js app.mjs
console.log(lit.flags, lit.global, lit.ignoreCase, lit.multiline, lit.dotAll, lit.sticky);
console.log(lit.unicode, lit.unicodeSets, lit.hasIndices, lit.lastIndex, String(lit));
~~~

~~~text الناتج
gi true true false false false
false false false 0 /(\d+)\s*EGP/gi
~~~

| الخاصية | الـ flag | بترجّع إيه ومعناها |
|---|---|---|
| [[source]] | | الـ pattern كنص من غير [[/ /]] ومن غير flags. للـ regex الفاضي [[(?:)]] |
| [[flags]] | | كل الـ flags كنص، مترتبين دايمًا [[dgimsuvy]] |
| [[global]] | [[g]] | [[true]]: [[match]] و [[replace]] بيشتغلوا على كل الـ matches، و [[exec]] بيكمّل من [[lastIndex]] |
| [[ignoreCase]] | [[i]] | [[true]]: الحروف الكبيرة زي الصغيرة |
| [[multiline]] | [[m]] | [[true]]: [[^]] و [[$]] بيطابقوا أول وآخر **كل سطر** |
| [[dotAll]] | [[s]] | [[true]]: النقطة بتطابق السطر الجديد كمان |
| [[unicode]] | [[u]] | [[true]]: الـ emoji حرف واحد، و [[\p{...}]] شغالة، والـ escapes الغلط بترمي |
| [[unicodeSets]] | [[v]] | [[true]]: زي [[u]] وزيادة طرح وتقاطع جوه [[[ ]]] (الدرس الجاي بعد الجاي) |
| [[hasIndices]] | [[d]] | [[true]]: نتيجة [[exec]] فيها [[indices]] بأماكن كل group (الدرس الجاي) |
| [[sticky]] | [[y]] | [[true]]: الـ match لازم يبدأ عند [[lastIndex]] بالظبط |
| [[lastIndex]] | | رقم: هيدوّر منين المرة الجاية (مع [[g]] أو [[y]] بس). الوحيدة اللي بتتكتب |
| [[toString()]] | | [["/" + source + "/" + flags]]: الشكل اللي تقدر تلزقه في كود |

كلهم (ما عدا [[lastIndex]]) **getters** على [[RegExp.prototype]]: مش متخزنين على الـ object، وبيتحسبوا من الـ regex. عشان كده [[Object.getOwnPropertyNames(/a/g)]] بيطلّع [[[ 'lastIndex' ]]] بس، والكتابة فيهم ملهاش أثر:

~~~text الناتج: re.global = false في .mjs (strict)
TypeError: Cannot set property global of [object Object] which has only a getter
~~~

يعني الـ flags بتاعة regex **مبتتغيّرش بعد ما يتعمل**. عايز flags تانية؟ اعمل regex جديد.

---

## ٤. نسخة بـ flags تانية

~~~js app.mjs
const copy = new RegExp(lit, "dy");
console.log(copy.flags, copy.source === lit.source, copy === lit);
~~~

~~~text الناتج
dy true false
~~~

لما تدّي [[new RegExp]] regex بدل نص، بياخد الـ [[source]] بتاعه. والـ flags اللي بتبعتها **بتحل محل** القديمة بالكامل: [[gi]] راحت و [[dy]] جت (مش [[dgiy]]). والنتيجة object جديد، و [[lastIndex]] بتاعه 0.

---

## ٥. pattern فيه كلام يوزر: [[RegExp.escape]]

~~~js app.mjs
const word = "c++";
console.log(new RegExp($__bt^$__{RegExp.escape(word)}$$__bt, "i").test("C++"));
~~~

~~~text الناتج
true
~~~

[[+]] في [["c++"]] ليها معنى في الـ regex. [[RegExp.escape]] (موجودة في Node 24 والمتصفحات الحديثة، وشرحها كامل في درس «test و match و matchAll و replace») بتحط [[\]] قبل أي حرف خاص، فالكلمة تتطابق حرفيًا. **أي نص جاي من برّه وداخل [[new RegExp]] لازم يعدّي عليها.**

---

## الخلاصة

| عايز | استخدم |
|---|---|
| pattern ثابت | literal [[/.../flags]]: الغلط يبان أول ما تشغّل |
| pattern متركّب أو من يوزر | [[new RegExp(String.raw$__bt...$__bt + RegExp.escape(x), flags)]] جوه try |
| نفس الـ regex بـ flags تانية | [[new RegExp(re, "newflags")]]: الـ flags بتتبدّل مش بتتضاف |
| تعرف regex فيه إيه | [[source]] و [[flags]] و [[global]] وأخواتهم، أو [[String(re)]] |
| regex مش شغال من [[new RegExp]] | اطبع [[re.source]] الأول: غالبًا [[\]] ضاعت في النص |`,
          lines: [
            R`regex literal: الـ pattern بين [[/ /]] والـ flags [[gi]] بعدها. بيتعمل له parse مع الملف، فلو فيه غلطة الملف كله مش هيشتغل.`,
            R`نفس الـ regex من **نص** بـ [[new RegExp]]: كل [[\]] في الـ regex بقت [[\\]] في النص، لأن النص نفسه بياكل واحدة.`,
            R`نفس الـ regex بـ [[String.raw]]: الـ tag ده بيسيب كل [[\]] زي ما هي، فالـ pattern مكتوب بنفس شكل الـ literal.`,
            R`[[source]] بيرجّع الـ pattern كنص، والتلاتة طلعوا نفس النص بالظبط: [[(\d+)\s*EGP true true]].`,
            R`الغلطة الشايعة: [["\d"]] و [["\s"]] في نص عادي. الـ JavaScript بيرمي الـ [[\]] لأنه escape مش معروف في النصوص.`,
            R`[[source]] طلع [[(d+)s*EGP]]، فالـ regex بيدوّر على حرف d وحرف s، و [[test]] رجّعت [[false]] من غير ولا error.`,
            R`[[flags]] بيرجّع [["gi"]]، وكل flag ليه خاصية boolean: [[global]] و [[ignoreCase]] بـ [[true]]، و [[multiline]] و [[dotAll]] و [[sticky]] بـ [[false]].`,
            R`باقي الخصايص: [[unicode]] و [[unicodeSets]] و [[hasIndices]] بـ [[false]]، و [[lastIndex]] صفر لأن مفيش بحث حصل، و [[String(lit)]] بيرجّع [[/(\d+)\s*EGP/gi]] زي ما اتكتب.`,
            R`[[new RegExp(lit, "dy")]]: regex جديد بنفس الـ source، والـ flags الجديدة **بتحل محل** القديمة ([[gi]] راحت).`,
            R`[[copy.flags]] بـ [[dy]]، والـ source زي الأصلي، و [[copy === lit]] بـ [[false]]: ده object تاني خالص.`,
            R`كلمة جاية من يوزر وفيها [[+]]، وهو حرف ليه معنى في الـ regex («مرة أو أكتر»).`,
            R`[[RegExp.escape]] بتحط [[\]] قبل كل حرف خاص، و [[^...$]] حوالين الكلمة، و [[i]] للحروف الكبيرة، فـ [["C++"]] اتطابقت: [[true]].`,
            R`pattern ناقصه [[)]] من نص: [[new RegExp]] بيرمي SyntaxError **وقت التشغيل** جوه try، فاتمسكت واتطبعت بدل ما البرنامج يقع.`,
          ],
          ref: [
            { t: "MDN: RegExp.prototype.source", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/source" },
            { t: "MDN: RegExp.prototype.global", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/global" },
            { t: "MDN: RegExp.prototype.ignoreCase", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/ignoreCase" },
            { t: "MDN: RegExp.prototype.multiline", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/multiline" },
            { t: "MDN: RegExp.prototype.dotAll", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/dotAll" },
            { t: "MDN: RegExp.prototype.unicodeSets", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicodeSets" },
            { t: "MDN: RegExp.prototype.hasIndices", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/hasIndices" },
            { t: "MDN: RegExp.prototype.toString()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/toString" },
            { t: "MDN: regular expression literals", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#regular_expression_literals" },
            { t: "MDN: RegExp() constructor", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/RegExp" },
            { t: "MDN: RegExp.prototype.flags", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/flags" },
          ],
          pre: [{ to: "js/groups و flags", why: R`الـ flags نفسهم و [[lastIndex]]: هنا بنقراهم كخصايص` }, { to: "js/test و match و matchAll و replace", why: R`[[RegExp.escape]] وليه النص اللي جاي من برّه خطر` }],
        },
        {
          cmd: "RegExp exec: الـ result array و indices و lastIndex",
          title: "exec من جوه: كل خانة في الناتج، والـ flag d، والـ loop بـ lastIndex من غير ما يلف للأبد",
          desc: R`[[re.exec(str)]] هي الـ method الأساسية في الـ RegExp: [[test]] و [[match]] و [[matchAll]] و [[replace]] كلهم مبنيين عليها. بترجّع [[null]] لو مفيش match، أو array أول خانة فيها النص اللي اتطابق وبعده كل group بالترتيب، ومعاها خصايص: [[index]] (مكان الـ match)، و [[input]] (النص كله)، و [[groups]] (الـ named groups)، و [[indices]] لو الـ regex فيه flag [[d]] (أماكن البداية والنهاية لكل group).

من غير [[g]] أو [[y]]، [[exec]] بتدوّر من أول النص كل مرة. ومعاهم، بتبدأ من [[lastIndex]] وبتحركه لبعد الـ match، فتقدر تلف بيها على كل الـ matches. والفخ: match طوله صفر (زي [[\b]] أو [[x*]]) مبيحرّكش [[lastIndex]]، فالـ loop بيلف للأبد إلا لو زقيته بنفسك. [[matchAll]] بيعمل ده لوحده ومبيلمسش الـ regex بتاعك.`,
          example: R`// exec من غير g: أول match بكل تفاصيله، ومع d أماكن كل group
const line = "order #A-17 total 250 EGP";
const re = /#(?<code>[A-Z])-(?<num>\d+)/d;
const m = re.exec(line);
console.log(m[0], m.index, m.groups.num, m.indices[0], m.indices.groups.num);
console.log(re.exec("no order"), re.lastIndex, re.hasIndices);
// exec مع g في loop: lastIndex بيتحرك لوحده
const prices = /(\d+) EGP/g;
const text = "tea 15 EGP, rice 40 EGP, oil 95 EGP";
let hit;
while ((hit = prices.exec(text)) !== null) {
  console.log(hit[1], hit.index, prices.lastIndex);
}
console.log(prices.lastIndex);
// matchAll: نفس النتيجة، ومن غير ما يلمس الـ regex بتاعك
console.log([...text.matchAll(prices)].map((x) => x[1]), prices.lastIndex);
// match بطول صفر: لازم تزق lastIndex بنفسك
const edges = /\b/g;
const spots = [];
while ((hit = edges.exec("ab cd")) !== null) {
  spots.push(hit.index);
  if (hit[0] === "") edges.lastIndex++;
}
console.log(spots);`,
          try: R`اكتب [[mark(str, re)]] بتحط [[[ ]]] حوالين كل match في النص باستخدام [[indices]] (flag [[d]])، من غير [[replace]]. جرّبها على [["tea 15 EGP, rice 40 egp"]] بـ [[/\d+ egp/i]]، وعلى نص مفيهوش أرقام.`,
          sol: R`~~~js mark.mjs
function mark(str, re) {
  const hits = [...str.matchAll(new RegExp(re.source, "dg" + re.flags.replace(/[dg]/g, "")))];
  let out = str;
  for (const h of hits.reverse()) {
    const [s, e] = h.indices[0];
    out = out.slice(0, s) + "[" + out.slice(s, e) + "]" + out.slice(e);
  }
  return out;
}
console.log(mark("tea 15 EGP, rice 40 egp", /\d+ egp/i), mark("no prices", /\d+/));
~~~

~~~text الناتج (Node 24.22)
tea [15 EGP], rice [40 egp] no prices
~~~

- نسخة من الـ regex فيها [[d]] و [[g]] أكيد (من غير ما نكررهم لو موجودين)، وباقي الـ flags زي ما هي ([[i]] هنا).
- [[h.indices[0]]] بيدّي [[[start, end]]] بتاع الـ match كله.
- بنلف **من الآخر للأول** ([[reverse]]): لو بدأنا من الأول، أول [[[]] هيزق كل الأماكن اللي بعده حرف لقدّام والـ indices تبقى غلط.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[const re = /a/g]] وبعدها [[while ((m = re.exec("banana")) !== null) console.log(m.index, re.lastIndex)]]، وبعد الـ loop [[console.log(re.lastIndex)]]. اكتب الأرقام قبل ما تشغّل.`, done: R`كتبت ٣ سطور ([[1 2]] و [[3 4]] و [[5 6]]) وإن [[lastIndex]] بعد الـ loop صفر، وطلع كده.`, sol: R`~~~js p1.mjs
const re = /a/g;
let m;
while ((m = re.exec("banana")) !== null) console.log(m.index, re.lastIndex);
console.log("after:", re.lastIndex);
~~~

~~~text الناتج (Node 24.22)
1 2
3 4
5 6
after: 0
~~~

[[banana]]: الـ a في 1 و 3 و 5. كل match طوله 1، فـ [[lastIndex]] = [[index + 1]]. والنداء الرابع بدأ من 6 (آخر النص) ملقاش، فرجّع [[null]] و**رجّع [[lastIndex]] لصفر**. ده اللي بيخلّي نفس الـ regex ينفع تلف بيه تاني على نص جديد، وده نفسه اللي بيعمل فخ [[test]] مع [[g]].` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[countRuns(text)]] المفروض ترجّع طول كل سلسلة x ورا بعض، فـ [["xxaxbxxx"]] تبقى [[[2, 1, 3]]]. الكود: [[const runs = /x*/g; while ((hit = runs.exec(text)) !== null) out.push(hit[0].length);]]. شغّله (حط حد للفات عشان ميعلّقش الجهاز) وصلّحه بطريقتين.`, done: R`شفت إن الـ loop بيلف للأبد عند [[a]]، وصلّحته مرة بزق [[lastIndex]] لما الـ match فاضي، ومرة بـ [[matchAll(/x+/g)]]، والاتنين طلّعوا [[[ 2, 1, 3 ]]].`, sol: R`~~~js p2.mjs
function countRuns(text) {
  const runs = /x*/g;
  const out = [];
  let hit;
  while ((hit = runs.exec(text)) !== null) {
    if (hit[0] === "") { runs.lastIndex++; continue; }
    out.push(hit[0].length);
  }
  return out;
}
console.log(countRuns("xxaxbxxx"), [..."xxaxbxxx".matchAll(/x+/g)].map((h) => h[0].length));
~~~

~~~text الناتج (Node 24.22)
[ 2, 1, 3 ] [ 2, 1, 3 ]
~~~

- [[x*]] بتطابق **صفر** x كمان. عند [[a]] (مكان 2) الـ match فاضي [[""]] و [[lastIndex]] فضل 2، فالنداء الجاي بيلاقي نفس الـ match الفاضي في نفس المكان... للأبد.
- التصليح الأول: لو [[hit[0] === ""]] زق [[lastIndex]] واحد وكمّل من غير ما تسجّل حاجة. (مع [[u]] أو [[v]] زق بحجم الحرف كله لو emoji، وده اللي [[matchAll]] بيعمله لوحده.)
- التصليح التاني أحسن: [[x+]] مبيطابقش فاضي أصلًا، و [[matchAll]] بيتعامل مع أي match فاضي لوحده.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[allMatches(re, str)]] بترجّع array فيها [[{ text, index, groups }]] لكل match باستخدام [[exec]]، وتشتغل حتى لو الـ regex مفيهوش [[g]]، ومتغيّرش [[lastIndex]] بتاع الـ regex اللي اتبعت، ومتعلّقش مع [[/\b/]].`, done: R`[[allMatches(/(?<n>\d+) EGP/, "tea 15 EGP, rice 40 EGP")]] بترجّع اتنين بالـ groups بتاعتهم، والـ regex الأصلي [[lastIndex]] بتاعه 0 و [[global]] لسه [[false]]، و [[allMatches(/\b/, "ab cd")]] بترجّع الأماكن [[0, 2, 3, 5]].`, sol: R`~~~js p3.mjs
function allMatches(re, str) {
  const copy = new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g");
  const out = [];
  let hit;
  while ((hit = copy.exec(str)) !== null) {
    out.push({ text: hit[0], index: hit.index, groups: hit.groups });
    if (hit[0] === "") copy.lastIndex++;
  }
  return out;
}
const price = /(?<n>\d+) EGP/;
console.log(allMatches(price, "tea 15 EGP, rice 40 EGP"), price.lastIndex, price.global);
console.log(allMatches(/\b/, "ab cd").map((h) => h.index));
~~~

~~~text الناتج (Node 24.22)
[
  {
    text: '15 EGP',
    index: 4,
    groups: [Object: null prototype] { n: '15' }
  },
  {
    text: '40 EGP',
    index: 17,
    groups: [Object: null prototype] { n: '40' }
  }
] 0 false
[ 0, 2, 3, 5 ]
~~~

- النسخة ([[copy]]): من غير [[g]]، [[exec]] كانت هترجّع أول match كل مرة والـ loop مش هيخلص. ونسخة جديدة معناها إن [[lastIndex]] بتاع الأصلي مبيتلمسش.
- [[groups]] بيبقى [[undefined]] لو الـ regex مفيهوش named groups.
- ده تقريبًا اللي [[matchAll]] بيعمله من جوه.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** نص فيه ١٠٠ ألف رقم ([["x 12 ".repeat(100000)]]). عدّ الأرقام بـ ٤ طرق: [[exec]] في loop، و [[matchAll]]، و [[match]] بـ [[g]]، و [[replace]] بدالة بتعدّ. قيس كل واحدة بـ [[performance.now()]] وشغّل مرتين.`, done: R`الأربعة طلّعوا 100000، والأرقام عندك في نفس الحدود (كام ms)، و [[replace]] الأبطأ لأنه بيبني نص جديد، وعرفت تختار على حسب المطلوب مش على السرعة.`, sol: R`~~~js p5.mjs
const text = "x 12 ".repeat(100000);
const t = (label, f) => { const s = performance.now(); const n = f(); console.log(label, n, (performance.now() - s).toFixed(1) + "ms"); };
t("exec loop", () => { const r = /\d+/g; let n = 0; while (r.exec(text)) n++; return n; });
t("matchAll ", () => { let n = 0; for (const _ of text.matchAll(/\d+/g)) n++; return n; });
t("match g  ", () => text.match(/\d+/g).length);
t("replace  ", () => { let n = 0; text.replace(/\d+/g, () => { n++; return ""; }); return n; });
~~~

~~~text الناتج (Node 24.22، تشغيلين ورا بعض)
exec loop 100000 6.8ms
matchAll  100000 6.4ms
match g   100000 6.8ms
replace   100000 12.8ms
exec loop 100000 6.9ms
matchAll  100000 5.7ms
match g   100000 7.3ms
replace   100000 9.9ms
~~~

- الـ ٣ الأوائل تقريبًا زي بعض (الفرق أقل من الفرق بين تشغيلين)، فاختار على حسب **اللي محتاجه**: [[match]] بـ [[g]] لو النصوص بس، و [[matchAll]] لو محتاج groups و [[index]]، و [[exec]] لو محتاج تتحكم في [[lastIndex]] (تقف، أو ترجع، أو [[y]]).
- [[replace]] الأبطأ لأنه بيبني نص جديد بطول النص كله. متستخدمهوش للعد.` },
          ],
          flag: "script",
          deep: {
            why: R`أي حاجة بتلف على matches مبنية على [[exec]]: [[matchAll]] و [[replace]] و [[split]]، والـ tokenizers والـ syntax highlighters والـ linters. ولما تفهم [[lastIndex]] و [[indices]] تقدر تعمل حاجات [[match]] مبيعرفش يعملها: تقف في النص وتكمّل بعدين، وتعرف مكان كل group عشان ترسم تحته أو تلوّنه، وتقطّع نص حتة ورا حتة.`,
            how: R`[[exec]] بتقرا [[lastIndex]] لو فيه [[g]] أو [[y]] (غير كده بتبدأ من 0 وبتتجاهله)، وبتجرّب تطابق من هناك. لو لقت: بتحط [[lastIndex]] = نهاية الـ match (مع [[g]] أو [[y]] بس)، وترجّع الـ array. لو ملقتش: [[lastIndex]] = 0 وترجّع [[null]].

الـ array: [[[0]]] الـ match كله، و [[[1]]] و [[[2]]]… الـ groups بترتيب الأقواس المفتوحة، والـ group اللي مشاركش قيمته [[undefined]]. و [[index]] و [[input]] و [[groups]] (object من غير prototype، أو [[undefined]] لو مفيش named groups).

مع [[d]] بيتضاف [[indices]]: array بنفس الشكل، كل خانة [[[start, end]]] (البداية داخلة والنهاية لأ، زي [[slice]])، و [[indices.groups]] بالأسامي. الـ group اللي مشاركش مكانه [[undefined]]. و [[d]] بتبطّأ الـ regex شوية لأن الـ engine بيبني arrays زيادة، فحطها لما تحتاجها بس.

[[matchAll]] بيعمل **نسخة** من الـ regex (بنفس [[lastIndex]] الحالي!) ويلف عليها، فالأصلي مبيتغيّرش. وبيزق [[lastIndex]] لوحده لو الـ match فاضي. ومن غير [[g]] بيرمي [[TypeError: String.prototype.matchAll called with a non-global RegExp argument]].`,
            when: R`[[exec]] مع [[y]] في الـ tokenizers (تقرا حتة، تقرر، تكمّل)، ولما تحتاج تقف في نص الطريق. و [[matchAll]] في أي loop عادي على كل الـ matches (أوضح وأأمن). و [[d]] لما تحتاج **مكان** كل group: تظليل، أو علامة تحت حرف غلط، أو استبدال group واحد من غير ما تلمس الباقي.`,
            mistakes: R`regex بـ [[g]] متشارك بين أكتر من مكان، فـ [[lastIndex]] من نداء بيأثر على التاني. و loop بـ [[exec]] على pattern ممكن يطابق فاضي ([[*]] أو [[?]] أو [[\b]] أو [[^]] مع [[m]]) من غير زق. و [[exec]] من غير [[g]] في [[while]] (نفس الـ match للأبد). وتفتكر [[matchAll]] بيبدأ من 0 دايمًا: بيبدأ من [[lastIndex]] الحالي للـ regex. وتقرا [[m.indices]] من غير [[d]] ([[undefined]]).`
          },
          teach: R`## الفكرة في سطر

[[exec]] بتجاوب على سؤال واحد: «فيه match من المكان ده؟ لو أيوه، هو إيه بالظبط وفين؟». وكل الـ methods التانية بتنادي [[exec]] (أو حاجة زيها) من جوه. المثال ٤ حالات، وكل الناتج اتشغّل فعلًا على Node 24.22.

---

## ١. من غير [[g]]: أول match بكل تفاصيله

~~~js app.mjs
const line = "order #A-17 total 250 EGP";
const re = /#(?<code>[A-Z])-(?<num>\d+)/d;
const m = re.exec(line);
~~~

الـ regex: [[#]]، وحرف كابيتال اسمه [[code]]، وشرطة، ورقم اسمه [[num]]. والـ flag [[d]] (اسم خاصيته [[hasIndices]]) بيطلب أماكن كل group. لو طبعنا [[m]] كله:

~~~text الناتج: console.log(m)
[
  '#A-17',
  'A',
  '17',
  index: 6,
  input: 'order #A-17 total 250 EGP',
  groups: [Object: null prototype] { code: 'A', num: '17' },
  indices: [
    [ 6, 11 ],
    [ 7, 8 ],
    [ 9, 11 ],
    groups: [Object: null prototype] { code: [Array], num: [Array] }
  ]
]
~~~

| الخانة | فيها إيه هنا | معناها |
|---|---|---|
| [[m[0]]] | [['#A-17']] | الـ match كله |
| [[m[1]]] و [[m[2]]] | [['A']] و [['17']] | الـ groups بترتيب أقواسها، نصوص دايمًا |
| [[index]] | [[6]] | أول حرف في الـ match فين في النص (من 0) |
| [[input]] | النص كله | النص اللي اتدوّر فيه، زي ما هو |
| [[groups]] | [[{ code, num }]] | الـ named groups بأساميها، و [[undefined]] لو مفيش أسامي |
| [[indices[0]]] | [[[6, 11]]] | بداية ونهاية الـ match، والنهاية مش داخلة زي [[slice]] |
| [[indices[2]]] | [[[9, 11]]] | مكان group رقم 2 ([[17]]) |
| [[indices.groups.num]] | [[[9, 11]]] | نفس المكان بالاسم |

~~~js app.mjs
console.log(m[0], m.index, m.groups.num, m.indices[0], m.indices.groups.num);
console.log(re.exec("no order"), re.lastIndex, re.hasIndices);
~~~

~~~text الناتج
#A-17 6 17 [ 6, 11 ] [ 9, 11 ]
null 0 true
~~~

لو مفيش match الناتج [[null]] (مش array فاضية)، فـ [[m[1]]] بعدها هترمي. و [[lastIndex]] فضل 0: من غير [[g]] أو [[y]] الـ [[exec]] مبتلمسوش. و [[hasIndices]] الخاصية اللي بتقول إن [[d]] موجود.

> فايدة [[indices]]: [[line.slice(...m.indices.groups.num)]] بترجّع [['17']]. يعني تقدر تلوّن الـ group ده بالظبط في النص الأصلي، أو تحط علامة تحته، أو تبدّله لوحده.

---

## ٢. مع [[g]]: loop بـ [[lastIndex]]

~~~js app.mjs
const prices = /(\d+) EGP/g;
const text = "tea 15 EGP, rice 40 EGP, oil 95 EGP";
let hit;
while ((hit = prices.exec(text)) !== null) {
  console.log(hit[1], hit.index, prices.lastIndex);
}
console.log(prices.lastIndex);
~~~

- [[(hit = prices.exec(text)) !== null]]: بننادي ونحفظ الناتج ونفحصه في نفس الشرط. القوسين حوالين الـ [[=]] لازم.
- مع [[g]]، كل نداء بيبدأ من [[lastIndex]] وبيحطه بعد الـ match.

~~~text الناتج
15 4 10
40 17 23
95 29 35
0
~~~

| النداء | بدأ من | لقى عند [[index]] | [[lastIndex]] بعده |
|---|---|---|---|
| ١ | 0 | 4 ([[15 EGP]]) | 10 |
| ٢ | 10 | 17 ([[40 EGP]]) | 23 |
| ٣ | 23 | 29 ([[95 EGP]]) | 35 |
| ٤ | 35 | مفيش: [[null]] | رجع **0** |

---

## ٣. [[matchAll]]: نفس الشغل ومن غير ما يلمس الـ regex

~~~js app.mjs
console.log([...text.matchAll(prices)].map((x) => x[1]), prices.lastIndex);
~~~

~~~text الناتج
[ '15', '40', '95' ] 0
~~~

[[matchAll]] بيعمل **نسخة** من الـ regex ويلف عليها، فـ [[prices.lastIndex]] فضل 0. بس انتبه: النسخة بتبدأ من [[lastIndex]] **الحالي** للأصلي. جرّبنا [[g.lastIndex = 2]] قبل [[[..."1a2b3".matchAll(g)]]] بـ [[/\d/g]]:

~~~text الناتج
[ '2', '3' ] 2
~~~

الـ [[1]] اتنط عليه. فلو الـ regex اتستخدم قبل كده بـ [[exec]] أو [[test]]، رجّع [[lastIndex = 0]] الأول.

ومن غير [[g]]:

~~~text الناتج: "1a2".matchAll(/\d/)
TypeError: String.prototype.matchAll called with a non-global RegExp argument
~~~

---

## ٤. match بطول صفر: الـ loop اللي مبيخلصش

~~~js app.mjs
const edges = /\b/g;
const spots = [];
while ((hit = edges.exec("ab cd")) !== null) {
  spots.push(hit.index);
  if (hit[0] === "") edges.lastIndex++;
}
console.log(spots);
~~~

[[\b]] **مكان** مش حرف، فالـ match طوله صفر، و [[lastIndex]] بعده = [[index + 0]]: نفس المكان. من غير السطر [[edges.lastIndex++]] جرّبنا (بعد ما حطينا حد ٦ لفات):

~~~text الناتج من غير الزق
at 0 lastIndex 0
at 0 lastIndex 0
at 0 lastIndex 0
at 0 lastIndex 0
at 0 lastIndex 0
at 0 lastIndex 0
~~~

نفس المكان كل مرة، والبرنامج كان هيعلّق. ومع الزق:

~~~text الناتج
[ 0, 2, 3, 5 ]
~~~

الأماكن: قبل [[a]]، وبعد [[b]]، وقبل [[c]]، وبعد [[d]]. وده نفس اللي [[[..."ab cd".matchAll(/\b/g)]]] بيطلّعه لوحده.

---

## الخلاصة

| عايز | استخدم |
|---|---|
| أول match بتفاصيله | [[re.exec(str)]] من غير [[g]]: array أو [[null]] |
| مكان كل group | flag [[d]] و [[m.indices]] و [[m.indices.groups]] |
| كل الـ matches في loop عادي | [[for (const m of str.matchAll(re))]]، والـ regex لازم [[g]] |
| تتحكم في المكان (تقف، تكمّل، [[y]]) | [[exec]] و [[lastIndex]] بإيدك |
| pattern ممكن يطابق فاضي | زق [[lastIndex]] لما [[m[0] === ""]]، أو [[matchAll]] |`,
          lines: [
            R`النص اللي هندوّر فيه: طلب فيه كود [[#A-17]] ومبلغ.`,
            R`[[#]] ثم حرف كابيتال في group اسمه [[code]] ثم شرطة ثم رقم في group اسمه [[num]]. الـ flag [[d]] بيخلّي [[exec]] ترجّع أماكن الـ groups كمان.`,
            R`[[exec]] من غير [[g]]: بتدوّر من أول النص وترجّع أول match بكل تفاصيله في array، أو [[null]].`,
            R`[[m[0]]] الـ match كله [[#A-17]]، و [[index]] بـ 6، و [[groups.num]] بـ [['17']] (نص)، و [[indices[0]]] بـ [[[6, 11]]] و [[indices.groups.num]] بـ [[[9, 11]]].`,
            R`نص مفيهوش match: [[exec]] رجّعت [[null]]، و [[lastIndex]] فضل 0 لأن مفيش [[g]]، و [[hasIndices]] بـ [[true]] عشان الـ flag [[d]].`,
            R`regex بـ [[g]]: كل [[exec]] بتكمّل من [[lastIndex]] اللي سابته اللي قبلها.`,
            R`نص فيه ٣ أسعار هنلف عليهم.`,
            R`متغير الـ match، متعرّف برّه الـ loop عشان الشرط يشوفه.`,
            R`بننادي [[exec]] ونحفظ الناتج في [[hit]] ونقارنه بـ [[null]] في نفس الشرط: الـ loop بيقف أول ما مفيش match.`,
            R`كل لفة بتطبع الرقم ([[hit[1]]]) ومكانه و [[lastIndex]] بعده: [[15 4 10]] ثم [[40 17 23]] ثم [[95 29 35]].`,
            R`قفلة الـ loop.`,
            R`بعد آخر نداء فاشل [[lastIndex]] رجع 0 لوحده، فالـ regex جاهز يلف من الأول.`,
            R`[[matchAll]] بنفس الـ regex: نسخة بتلف لوحدها، والناتج [[[ '15', '40', '95' ]]]، و [[prices.lastIndex]] فضل 0.`,
            R`[[\b]] مكان (حد كلمة) مش حرف، فكل match طوله صفر. ده النوع اللي بيعمل loop لانهائي.`,
            R`array نجمع فيها الأماكن.`,
            R`نفس شكل الـ loop اللي فوق بنفس المتغير [[hit]].`,
            R`نحفظ مكان الـ match.`,
            R`لو الـ match فاضي، [[lastIndex]] مش هيتحرك لوحده، فبنزقه خطوة. من غير السطر ده الـ loop بيلف في مكانه للأبد.`,
            R`قفلة الـ loop.`,
            R`الأماكن [[[ 0, 2, 3, 5 ]]]: أول وآخر كل كلمة من الكلمتين.`,
          ],
          ref: [
            { t: "MDN: RegExp.prototype.exec()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec" },
            { t: "MDN: RegExp.prototype.hasIndices", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/hasIndices" },
            { t: "MDN: RegExp: lastIndex", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex" },
            { t: "MDN: String.prototype.matchAll()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll" },
            { t: "ECMAScript: RegExpBuiltinExec", url: "https://tc39.es/ecma262/multipage/text-processing.html#sec-regexpbuiltinexec" },
          ],
          pre: ["js/groups و flags", { to: "js/test و match و matchAll و replace", why: R`[[matchAll]] و [[match]] من برّه، هنا بنشوف اللي تحتهم` }],
        },
        {
          cmd: "الـ flags s و m و y و v بحالات حقيقية",
          title: "إمتى تحتاج s و m و y و v في شغل حقيقي: ملف INI، وإيميل، و CSV، وحروف عربي بس",
          desc: R`الـ flags الأربعة دول بيغيّروا **قواعد** الـ regex مش بس عدد الـ matches:
• [[m]] (multiline): [[^]] و [[$]] بيطابقوا أول وآخر **كل سطر**. للملفات اللي كل سطر فيها record (INI و logs و .env).
• [[s]] (dotAll): النقطة بتطابق السطر الجديد كمان. لما الحاجة اللي عايزها ممتدة على كذا سطر (جسم إيميل، block في ملف).
• [[y]] (sticky): الـ match لازم يبدأ عند [[lastIndex]] بالظبط، من غير ما يدوّر لقدّام. أساس أي parser أو tokenizer: لو حاجة مش مفهومة تعرف مكانها بدل ما تتنط.
• [[v]] (unicodeSets): كل اللي في [[u]] وزيادة: تقاطع [[&&]] وطرح [[--]] جوه [[[ ]]]، و classes جوه classes، و [[\q{...}]] لنصوص كاملة، و properties بتطابق نص كامل زي [[\p{RGI_Emoji}]]. وقواعده أشد: حروف زي [[(]] و [[-]] لازم [[\]] جوه الـ class.`,
          example: R`// m: ^ و $ لكل سطر
const ini = "[db]\nhost = localhost\nport = 5432\n[cache]\nttl = 60";
console.log(ini.match(/^\w+(?= =)/gm), ini.match(/^\w+(?= =)/g));
// s: النقطة بتعدّي السطر الجديد
const mail = "Subject: hi\n\nline one\nline two\n-- \nSara";
console.log(mail.match(/\n\n(.*)\n-- /)?.[1], JSON.stringify(mail.match(/\n\n(.*)\n-- /s)?.[1]));
// y: كل match لازم يبدأ مكان ما اللي قبله خلص
const cell = /\s*(?:"(?<q>[^"]*)"|(?<v>[^,]*))\s*(?:,|$)/y;
const row = ' tea , "rice, white" ,40';
const cells = [];
let c;
while (cell.lastIndex < row.length && (c = cell.exec(row))) cells.push(c.groups.q ?? c.groups.v.trim());
console.log(cells);
// v: تقاطع وطرح ونصوص جوه الـ class
console.log(/[\p{Script=Arabic}&&\p{Nd}]/v.test("٣"), /[\p{Script=Arabic}&&\p{Nd}]/v.test("3"));
console.log("سعر٣ و Price3".match(/[\p{L}--\p{ASCII}]+/gv));
console.log("👍🏽 ok 🇪🇬".match(/\p{RGI_Emoji}/gv), /^[\q{EGP|USD|SAR}]$/v.test("USD"));
console.log(/x/v.unicodeSets, /x/v.unicode, /x/s.dotAll, /x/m.multiline);`,
          try: R`اكتب [[parseIni(text)]] بـ regex واحد فيه [[m]] و [[matchAll]]: سطر [[[section]]] بيفتح object جديد، وسطر [[key = value]] بيتحط في الـ section الحالي (أو في الأول لو قبل أي section)، والسطور التانية (تعليقات [[;]] أو فاضية) بتتجاهل، وملف بـ [[\r\n]] بيشتغل زي [[\n]].`,
          sol: R`~~~js ini.mjs
function parseIni(text) {
  const out = {};
  let section = out;
  for (const m of text.matchAll(/^\s*(?:\[(?<sec>[^\]\r\n]+)\]|(?<key>[\w.-]+)\s*=\s*(?<val>.*?))\s*$/gm)) {
    if (m.groups.sec) section = out[m.groups.sec.trim()] = {};
    else section[m.groups.key] = m.groups.val;
  }
  return out;
}
console.log(parseIni("name = shop\n[db]\nhost = localhost\nport = 5432\n; comment\n[cache]\nttl = 60\r\n"));
~~~

~~~text الناتج (Node 24.22)
{
  name: 'shop',
  db: { host: 'localhost', port: '5432' },
  cache: { ttl: '60' }
}
~~~

- [[m]]: [[^]] و [[$]] لكل سطر، فكل سطر match لوحده.
- بديلين: [[\[(?<sec>...)\]]] أو [[key = val]]. و [[[^\]\r\n]+]] اسم الـ section من غير [[]]] ومن غير ما يعدّي السطر.
- [[(?<val>.*?)\s*$]]: الـ [[?]] بتخلي القيمة lazy، فالمسافات في آخر السطر بتروح لـ [[\s*]] مش للقيمة. و [[\r]] بتاع ويندوز line terminator في JS: النقطة مبتاخدوش، و [[$]] مع [[m]] بتطابق قبله، فالقيمة بتطلع نضيفة من غير [[\r]].
- [[; comment]] مبيطابقش ولا بديل فبيتجاهل لوحده.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اكتب ناتج دول قبل التشغيل: [[/^\d+$/m.test("abc\n42")]] و [[/^\d+$/.test("abc\n42")]] و [[/a.c/s.test("a\nc")]] و [[/a.c/.test("a\nc")]] و [[/^c/m.test("a\r\nc")]].`, done: R`توقعت [[true false true false true]] وطلع كده، وتقدر تقول كل واحد بسبب أنهي flag.`, sol: R`~~~js p1.mjs
console.log(/^\d+$/m.test("abc\n42"), /^\d+$/.test("abc\n42"), /a.c/s.test("a\nc"), /a.c/.test("a\nc"), /^c/m.test("a\r\nc"));
~~~

~~~text الناتج (Node 24.22)
true false true false true
~~~

- الأول: مع [[m]] السطر التاني [[42]] لوحده بيطابق [[^\d+$]].
- التاني: من غير [[m]] لازم النص **كله** أرقام، وهو فيه [[abc]].
- التالت والرابع: [[s]] بس اللي بتخلي النقطة تاخد [[\n]].
- الخامس: مع [[m]]، [[^]] بتطابق بعد أي line terminator، و [[\n]] واحد منهم، فـ [[c]] بعد [[\r\n]] أول سطر.` },
            { lvl: 'تطبيق', t: R`**ابني:** regex بالـ flag [[v]] بيطابق **حروف عربي بس**: من غير الأرقام العربي (٣) ومن غير علامات الترقيم العربي (،). وبعدين regex تاني بيطابق حرف عربي واحد **ما عدا** [[ة]] و [[ى]] (عشان تعرف الكلمات اللي آخرها مش تاء مربوطة ولا ألف مقصورة).`, done: R`[["سعر ٣ قطع: ١٢٠ جنيه، ok".match(...)]] بيرجّع [[[ 'سعر', 'قطع', 'جنيه' ]]] من غير أرقام ولا فاصلة، والتاني بيقبل [[ب]] ويرفض [[ة]] و [[٣]].`, sol: R`~~~js p3.mjs
const arabicLetter = /[\p{Script=Arabic}&&\p{L}]+/gv;
console.log("سعر ٣ قطع: ١٢٠ جنيه، ok".match(arabicLetter));
const noTaa = /[[\p{Script=Arabic}&&\p{L}]--[ةى]]/v;
console.log(noTaa.test("ب"), noTaa.test("ة"), noTaa.test("٣"));
~~~

~~~text الناتج (Node 24.22)
[ 'سعر', 'قطع', 'جنيه' ]
true false false
~~~

- [[&&]] تقاطع: «حرف من الكتابة العربي **و** letter» = حروف بس. الأرقام العربي [[Script=Arabic]] بس مش [[L]]، والفاصلة [[،]] كمان.
- [[--]] طرح، و [[[...]]] جوه [[[...]]] class متداخل (مسموح في [[v]] بس): «حروف عربي ناقص [[ة]] و [[ى]]».
- من غير [[v]] الكلام ده كان محتاج lookahead أو قايمة حروف طويلة.` },
            { lvl: 'تحدي', t: R`**ابني tokenizer:** [[parsePairs(src)]] بتقرا [['lang=ar; title="شاي بلبن"; qty=2']] لـ object، بـ regex واحد فيه [[y]]. القيمة يا بين علامات تنصيص (وفيها مسافات و [[;]])، يا كلمة. ولو حتة مش مفهومة ترمي SyntaxError فيها مكانها.`, done: R`المثال بيرجّع [[{ lang: 'ar', title: 'شاي بلبن', qty: '2' }]]، و [["lang=ar; ?? ; qty=2"]] بيرمي رسالة فيها [[عند 8]]، ومفيش حاجة بتتنط في صمت.`, sol: R`~~~js p4.mjs
function parsePairs(src) {
  const re = /\s*(?<key>\w+)\s*=\s*(?:"(?<q>[^"]*)"|(?<v>[^;\s]*))\s*(?:;|$)/y;
  const out = {};
  re.lastIndex = 0;
  while (re.lastIndex < src.length) {
    const at = re.lastIndex;
    const m = re.exec(src);
    if (!m) throw new SyntaxError($__btمش مفهوم عند $__{at}: «$__{src.slice(at, at + 10)}»$__bt);
    out[m.groups.key] = m.groups.q ?? m.groups.v;
  }
  return out;
}
console.log(parsePairs('lang=ar; title="شاي بلبن"; qty=2'));
try { parsePairs("lang=ar; ?? ; qty=2"); } catch (e) { console.log(e.name + ": " + e.message); }
~~~

~~~text الناتج (Node 24.22)
{ lang: 'ar', title: 'شاي بلبن', qty: '2' }
SyntaxError: مش مفهوم عند 8: « ?? ; qty=»
~~~

- كل لفة بتقرا زوج واحد كامل لحد [[;]] أو آخر النص، و [[y]] بتضمن إن الزوج الجاي بيبدأ بالظبط بعد اللي قبله.
- [[(?:"(?<q>[^"]*)"|(?<v>[^;\s]*))]]: لو فيه تنصيص خد كل اللي جواه (حتى [[;]])، وإلا خد كلمة.
- [[const at = re.lastIndex]] قبل [[exec]]: بعد الفشل [[lastIndex]] بيرجع 0، فلازم نحفظ المكان قبلها.
- لو كان [[g]]: الـ [[??]] كان هيتنط عليه وتكمّل بـ [[qty]] من غير ما حد يعرف.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** حد نقل regex الـ slug لـ [[v]] عشان «الأحدث»: [[new RegExp("^[a-z-]+$", "v")]]. شغّله واقرا الرسالة وصلّحه من غير ما ترجع لـ [[u]].`, done: R`شفت [[Invalid character class]]، وعرفت إن [[-]] في آخر الـ class لازمها [[\]] في [[v]]، والـ regex المصلّح بيقبل [["my-post"]] ويرفض [["My post"]].`, sol: R`~~~js p5.mjs
try { new RegExp("^[a-z-]+$", "v"); } catch (e) { console.log(e.message); }
const slug = /^[a-z0-9\-]+$/v;
console.log(slug.test("my-post"), slug.test("My post"));
~~~

~~~text الناتج (Node 24.22)
Invalid regular expression: /^[a-z-]+$/v: Invalid character class
true false
~~~

في [[v]]، الـ [[-]] جوه الـ class ليها دور في [[--]] (طرح)، فالـ engine مبيخمنش: [[-]] لوحدها لازم [[\-]]. ونفس الحكاية لـ [[(]] و [[)]] و [[[]] و [[{]] و [[}]] و [[/]] و [[|]] جوه الـ class: في [[u]] مسموحين حرفيين، وفي [[v]] بيرموا [[Invalid character in character class]]. عشان كده [[v]] مش «u أحدث» تبدّله وخلاص: لازم تراجع كل class.` },
          ],
          flag: "script",
          deep: {
            why: R`أغلب الـ regex في الشغل بيتكتب لسطر واحد، والمشاكل بتبدأ لما النص يبقى ملف: [[^]] اللي مبتطابقش غير أول الملف، والنقطة اللي بتقف عند أول سطر، والـ parser اللي بيتنط على حاجات غلط في صمت. والـ [[v]] بتحل حاجة كانت مستحيلة تقريبًا قبلها: «حروف عربي بس» أو «كل الـ emoji» في class واحدة مقروءة.`,
            how: R`[[m]] بتغيّر معنى [[^]] و [[$]] بس: بيطابقوا كمان بعد/قبل أي line terminator ([[\n]] و [[\r]] و [[\u2028]] و [[\u2029]]). مبتغيّرش النقطة ولا أي حاجة تانية.

[[s]] بتغيّر النقطة بس. قبلها الناس كانت بتكتب [[[^]]] (class فاضية منفية = أي حرف) أو [[[\s\S]]]. الاتنين لسه شغالين.

[[y]]: [[exec]] بتجرّب تطابق **عند** [[lastIndex]] وبس. مع [[g]] كمان: [[y]] هي اللي بتكسب في البحث، و [[g]] بتأثر على [[match]] و [[replace]] (كل الـ matches ورا بعض من غير فراغات). و [[^]] مع [[y]] بتطابق أول النص بس (أو أول سطر مع [[m]]).

[[v]]: الـ class بقت **set** من حروف **ونصوص**. [[&&]] تقاطع، و [[--]] طرح، ومينفعش تخلطهم في نفس المستوى من غير أقواس متداخلة. و [[\q{EGP|USD}]] نصوص كاملة جوه الـ class، ومع النفي [[[^...]]] مينفعش نص أطول من حرف: جرّبنا [[[^\q{ab}]]] ورمى [[Negated character class may contain strings]]، و [[[^\q{a|b}]]] (حروف لوحدها) اشتغل. و [[\p{RGI_Emoji}]] property بتطابق emoji كامل حتى لو مكوّن من كذا code point (زي [[👍🏽]] و [[🇪🇬]])، ومع [[u]] بترمي [[Invalid property name]]. [[v]] و [[u]] مع بعض SyntaxError.`,
            when: R`[[m]]: ملفات كل سطر فيها record (logs و INI و .env و CSV بسيط) لما تعمل [[matchAll]] على الملف كله. [[s]]: blocks متعددة السطور (جسم رسالة، تعليق [[/* */]]، section). [[y]]: أي tokenizer أو parser صغير، وفي التحقق إن النص **كله** اتقري حتة ورا حتة. [[v]]: أي class فيها عربي أو emoji أو «كذا ناقص كذا»، وفي الكود الجديد بدل [[u]] (بعد ما تراجع الـ classes).`,
            mistakes: R`تقسم ملف ويندوز بـ [[split("\n")]] وبعدين [[^\d+$]] من غير [[m]] على كل سطر: آخر كل سطر [[\r]] مستخبي، فجرّبنا [["12\r\n34\r\n".split("\n")]] وكلهم طلعوا [[false]]، و [[split(/\r?\n/)]] صلّحتها. (مع [[m]] على الملف كله مفيش مشكلة: [[\r]] line terminator في JS.) وتستخدم [[g]] في tokenizer فالحاجات الغلط تتنط. وتنسى [[lastIndex = 0]] قبل ما تبدأ نص جديد بـ regex [[y]] متشارك. وتنقل regex من [[u]] لـ [[v]] من غير ما تعمل escape لـ [[-]] و [[(]] جوه الـ classes. وتحط [[\p{RGI_Emoji}]] من غير [[v]].`
          },
          teach: R`## الفكرة في سطر

كل flag من الأربعة بيحل مشكلة بتظهر لما النص يبقى **ملف** أو **لغة** مش كلمة. المثال ٤ حالات من الشغل. كل الناتج اتشغّل فعلًا على Node 24.22، والـ [[v]] اتجرّبت كمان على Chrome 157 وطلّعت نفس النتايج.

---

## ١. [[m]]: كل سطر لوحده

~~~js app.mjs
const ini = "[db]\nhost = localhost\nport = 5432\n[cache]\nttl = 60";
console.log(ini.match(/^\w+(?= =)/gm), ini.match(/^\w+(?= =)/g));
~~~

الـ regex: من أول السطر ([[^]])، كلمة ([[\w+]])، وبعدها [[ =]] (lookahead: مش جزء من الـ match).

~~~text الناتج
[ 'host', 'port', 'ttl' ] null
~~~

- مع [[m]]: [[^]] بتطابق بعد كل [[\n]]، فكل سطر فيه key اتلقط.
- من غير [[m]]: [[^]] أول الملف بس، وأول الملف [[[db]]] مش كلمة، فـ [[null]].

> [[m]] مبتغيّرش غير [[^]] و [[$]]. النقطة لسه مبتطابقش [[\n]].

---

## ٢. [[s]]: النقطة بتعدّي السطور

~~~js app.mjs
const mail = "Subject: hi\n\nline one\nline two\n-- \nSara";
console.log(mail.match(/\n\n(.*)\n-- /)?.[1], JSON.stringify(mail.match(/\n\n(.*)\n-- /s)?.[1]));
~~~

جسم الإيميل بين السطر الفاضي ([[\n\n]]) وخط التوقيع ([[\n-- ]]).

~~~text الناتج
undefined "line one\nline two"
~~~

- من غير [[s]]: [[(.*)]] وقفت عند أول [[\n]]، فمفيش match و [[?.[1]]] رجّعت [[undefined]].
- مع [[s]]: النقطة خدت السطرين، و [[JSON.stringify]] بيورّينا الـ [[\n]] اللي جوه.

قبل [[s]] كانوا بيكتبوا [[([^]*)]] بدل [[(.*)]]، وجرّبناها وطلّعت نفس النتيجة. هتشوفها في كود قديم.

---

## ٣. [[y]]: قراية CSV من غير ما حاجة تتنط

~~~js app.mjs
const cell = /\s*(?:"(?<q>[^"]*)"|(?<v>[^,]*))\s*(?:,|$)/y;
const row = ' tea , "rice, white" ,40';
const cells = [];
let c;
while (cell.lastIndex < row.length && (c = cell.exec(row))) cells.push(c.groups.q ?? c.groups.v.trim());
console.log(cells);
~~~

| الحتة | معناها |
|---|---|
| [[\s*]] | مسافات قبل الخانة |
| [["(?<q>[^"]*)"]] | خانة بين تنصيص: كل حاجة غير [["]]، حتى الفاصلة |
| [[(?<v>[^,]*)]] | أو خانة عادية: كل حاجة لحد الفاصلة |
| [[(?:,|$)]] | الخانة بتخلص بفاصلة أو آخر السطر |
| [[y]] | الخانة الجاية لازم تبدأ **بالظبط** بعد اللي قبلها |

~~~text الناتج
[ 'tea', 'rice, white', '40' ]
~~~

[[cell.lastIndex < row.length]] بيقف لما السطر يخلص، و [[c.groups.q ?? ...]] بياخد اللي اتطابق من البديلين. الفاصلة جوه [["rice, white"]] مقسمتش الخانة. ولو السطر فيه حاجة الـ regex مش فاهمها، [[exec]] بترجّع [[null]] والـ loop بيقف **عندها**، بدل ما يتنط عليها زي [[g]] (المشروع «tokenizer لمعادلة حسابية» بيورّي الفرق بالأرقام).

---

## ٤. [[v]]: عمليات على الـ classes

### تقاطع [[&&]]

~~~js app.mjs
console.log(/[\p{Script=Arabic}&&\p{Nd}]/v.test("٣"), /[\p{Script=Arabic}&&\p{Nd}]/v.test("3"));
~~~

~~~text الناتج
true false
~~~

«حرف من الكتابة العربي **و** رقم» = الأرقام العربي المشرقية بس. [[3]] رقم بس مش عربي.

### طرح [[--]]

~~~js app.mjs
console.log("سعر٣ و Price3".match(/[\p{L}--\p{ASCII}]+/gv));
~~~

~~~text الناتج
[ 'سعر', 'و' ]
~~~

«أي حرف ناقص حروف ASCII» ([[\p{ASCII}]] أول ١٢٨ حرف: الإنجليزي والأرقام والرموز). [[Price]] اتشالت كلها، و [[٣]] رقم مش حرف أصلًا.

### class جوه class

الحاجة اللي بتطرحها ممكن تبقى class كاملة بين قوسين، وده اسمه **nested class** (مسموح في [[v]] بس). جرّبنا نطرح [[a-z]] بس بدل ASCII كلها:

~~~js nested.mjs
console.log("سعر٣ و Price3".match(/[\p{L}--[a-z]]+/gv));
~~~

~~~text الناتج
[ 'سعر', 'و', 'P' ]
~~~

الـ [[P]] الكابيتال فضلت لأنها مش من [[a-z]]. يعني الطرح دقيق بالظبط زي ما كتبته.

### نصوص كاملة: [[\p{RGI_Emoji}]] و [[\q{...}]]

~~~js app.mjs
console.log("👍🏽 ok 🇪🇬".match(/\p{RGI_Emoji}/gv), /^[\q{EGP|USD|SAR}]$/v.test("USD"));
~~~

~~~text الناتج
[ '👍🏽', '🇪🇬' ] true
~~~

- [[👍🏽]] (إيد + لون بشرة) و [[🇪🇬]] (حرفين علم) كل واحد **كذا code point**. [[\p{RGI_Emoji}]] بتطابق الـ emoji كامل. وجرّبنا [[\p{Extended_Pictographic}]] بـ [[u]] على نفس النص: طلّعت [[[ '👍' ]]] بس، من غير لون البشرة ومن غير العلم.
- [[\q{EGP|USD|SAR}]]: نصوص كاملة جوه الـ class. [[^[\q{...}]$]] بتقبل [["USD"]] وجرّبنا [["US"]] رجّعت [[false]].
- [[\p{RGI_Emoji}]] مع [[u]] بترمي: [[Invalid regular expression: /\p{RGI_Emoji}/u: Invalid property name]].

### [[v]] أشد من [[u]]

جرّبنا ٤ classes كانت شغالة في [[u]]:

| الـ class بـ [[v]] | النتيجة | التصليح |
|---|---|---|
| [[[(]]] | [[Invalid character in character class]] | [[[\(]]] |
| [[[a-z-]]] | [[Invalid character class]] | [[[a-z\-]]] |
| [[[{]]] | [[Invalid character in character class]] | [[[\{]]] |
| [[[|]]] | [[Invalid character in character class]] | [[[\|]]] |

### الخصايص

~~~js app.mjs
console.log(/x/v.unicodeSets, /x/v.unicode, /x/s.dotAll, /x/m.multiline);
~~~

~~~text الناتج
true false true true
~~~

[[unicodeSets]] هي خاصية [[v]]، و [[unicode]] بتفضل [[false]] مع [[v]] رغم إن كل حاجة في [[u]] شغالة: الاتنين flags منفصلين ومينفعوش مع بعض.

---

## الخلاصة

| الـ flag | الخاصية | بيغيّر إيه | استخدمه في |
|---|---|---|---|
| [[m]] | [[multiline]] | [[^]] و [[$]] لكل سطر | logs و INI و .env |
| [[s]] | [[dotAll]] | النقطة بتاخد [[\n]] | blocks متعددة السطور |
| [[y]] | [[sticky]] | الـ match من [[lastIndex]] بالظبط | tokenizers و parsers |
| [[v]] | [[unicodeSets]] | [[&&]] و [[--]] و [[\q{}]] و properties النصوص | عربي و emoji و «كذا ناقص كذا» |`,
          lines: [
            R`نص ملف INI: ٥ سطور منهم سطرين sections وتلاتة [[key = value]].`,
            R`[[^\w+(?= =)]] كلمة في أول سطر بعدها [[ =]]. مع [[m]] كل سطر بيتشاف لوحده فطلع [[[ 'host', 'port', 'ttl' ]]]، ومن غيره [[^]] أول الملف بس فـ [[null]].`,
            R`إيميل: عنوان، سطر فاضي، جسم من سطرين، وخط توقيع [[-- ]].`,
            R`[[(.*)]] بين السطر الفاضي والتوقيع: من غير [[s]] النقطة وقفت عند أول [[\n]] فمفيش match ([[undefined]])، ومع [[s]] خدت السطرين.`,
            R`regex خانة CSV واحدة بـ [[y]]: يا نص بين تنصيص (فيه فاصلة عادي) يا أي حاجة لحد الفاصلة، وبعدها فاصلة أو آخر السطر.`,
            R`سطر فيه مسافات حوالين الخانات، وخانة بين تنصيص جواها فاصلة.`,
            R`array فاضية هنجمع فيها الخانات واحدة واحدة.`,
            R`متغير الـ match، متعرّف برّه الـ loop عشان الشرط يحط فيه.`,
            R`بنقرا خانة ورا خانة لحد آخر السطر، و [[??]] بتاخد البديل اللي اتطابق، و [[trim]] بتشيل المسافات من الخانة العادية.`,
            R`التلات خانات: [[tea]] و [[rice, white]] كاملة و [[40]].`,
            R`[[&&]] مع [[v]]: تقاطع، «عربي **و** رقم». [[٣]] بـ [[true]] و [[3]] بـ [[false]].`,
            R`[[--]] طرح مع [[v]]: كل الحروف ([[\p{L}]]) ناقص حروف ASCII، فـ [[Price3]] اتشالت وطلع [[سعر]] و [[و]] بس.`,
            R`[[\p{RGI_Emoji}]] بتطابق الـ emoji كامل حتى لو كذا code point، و [[\q{EGP|USD|SAR}]] نصوص كاملة جوه class.`,
            R`[[unicodeSets]] خاصية [[v]] بـ [[true]] و [[unicode]] بـ [[false]] (flags منفصلين)، و [[dotAll]] و [[multiline]] خصايص [[s]] و [[m]].`,
          ],
          ref: [
            { t: "MDN: RegExp.prototype.multiline", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/multiline" },
            { t: "MDN: RegExp.prototype.dotAll", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/dotAll" },
            { t: "MDN: RegExp.prototype.sticky", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky" },
            { t: "MDN: RegExp.prototype.unicodeSets", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicodeSets" },
            { t: "MDN: Character class (v-mode)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_class" },
          ],
          pre: [{ to: "js/groups و flags", why: R`أول تعارف بالـ flags دول بمثال واحد لكل واحد` }, { to: "js/regex والعربي: Unicode properties", why: R`[[\p{Script=Arabic}]] و [[\p{Nd}]] و [[u]]، و [[v]] مبنية عليهم` }],
        },
        {
          cmd: "الـ wildcard والـ literal characters: النقطة والحروف الحرفية",
          title: "النقطة بتطابق إيه بالظبط؟ وأنهي حرف بيطابق نفسه وأنهي حرف لازم \\ قبله",
          desc: R`**wildcard** هو اسم النقطة [[.]] في الـ regex: حرف واحد، أي حرف، **ما عدا** الـ line terminators الأربعة ([[\n]] و [[\r]] و [[\u2028]] و [[\u2029]]). مع [[s]] بتطابقهم كمان. ومن غير [[u]] بتطابق «نص emoji» (الـ emoji حرفين في UTF-16)، ومع [[u]] أو [[v]] الـ emoji كله.

**literal character** هو أي حرف مش ليه معنى خاص: بيطابق نفسه بالظبط ([[a]] و [[ب]] و المسافة). والحروف اللي ليها معنى (اسمهم syntax characters) هم [[^ $ \ . * + ? ( ) [ ] { } |]]، و [[/]] جوه الـ literal بس: عشان تطابق واحد منهم حرفيًا حط [[\]] قبله. ومن غير [[u]] الـ engine متساهل ([[]]] و [[{]] لوحدهم بيطابقوا نفسهم، و [[\-]] و [[\q]] escapes مقبولة)، ومع [[u]] أو [[v]] نفس الحاجات دي بترمي SyntaxError.`,
          example: R`// wildcard: النقطة بتطابق إيه وإيه لأ
const chars = ["a", "ب", " ", "\t", "\n", "\r", "\u2028", "\u2029"];
console.log(chars.map((ch) => /^.$/.test(ch)).join(" "));
console.log(chars.map((ch) => /^.$/s.test(ch)).join(" "));
console.log(/^.$/.test("😀"), /^.$/u.test("😀"), /^[^]$/.test("\n"));
console.log("v1.2".replace(/./g, "*"), "v1.2".replace(/\./g, "*"), "v1.2".replace(/[.]/g, "*"));
// literal characters: الحرف العادي بيطابق نفسه
console.log(/كتاب/.test("الكتاب ده"), /cat/.test("concatenate"), /a b/.test("a  b"));
// الحروف الخاصة: من غير \ بتغيّر المعنى أو بترمي
console.log(/^1+1$/.test("1+1"), /^1\+1$/.test("1+1"), /^a|b$/.test("a|b"), /^a\|b$/.test("a|b"));
try { new RegExp("price (EGP"); } catch (e) { console.log(e.message); }
console.log(/a]b/.test("a]b"), /a{b/.test("a{b"));
try { new RegExp("a]b", "u"); } catch (e) { console.log(e.message); }
try { new RegExp("\\-", "u"); } catch (e) { console.log(e.message); }`,
          try: R`regex لرقم نسخة زي [["1.2.7"]]: [[/^1.2.\d+$/]]. جرّبه على [["1.2.7"]] و [["1x2y7"]] و [["1.20.7"]]. ليه [["1x2y7"]] عدّت؟ صلّحه.`,
          sol: R`~~~js version.mjs
const bad = /^1.2.\d+$/;
const good = /^1\.2\.\d+$/;
for (const v of ["1.2.7", "1x2y7", "1.20.7"]) console.log(v, bad.test(v), good.test(v));
~~~

~~~text الناتج (Node 24.22)
1.2.7 true true
1x2y7 true false
1.20.7 false false
~~~

النقطة من غير [[\]] wildcard: [[1.2.]] معناها «1 وأي حرف و 2 وأي حرف»، فـ [[x]] و [[y]] عدّوا. [[\.]] نقطة حرفية بس. و [[[.]]] كمان نقطة حرفية (جوه الـ class النقطة ملهاش معنى خاص).`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اكتب ناتج دول قبل التشغيل: [["1.5".replace(/./g, "#")]] و [["1.5".replace(/\./g, "#")]] و [[JSON.stringify("a\nb".replace(/./g, "#"))]] و [[JSON.stringify("a\nb".replace(/./gs, "#"))]].`, done: R`كتبت [[###]] و [[1#5]] و [["#\n#"]] و [["###"]] وطلعوا كده.`, sol: R`~~~js p1.mjs
console.log("1.5".replace(/./g, "#"), "1.5".replace(/\./g, "#"), JSON.stringify("a\nb".replace(/./g, "#")), JSON.stringify("a\nb".replace(/./gs, "#")));
~~~

~~~text الناتج (Node 24.22)
### 1#5 "#\n#" "###"
~~~

- الأول: النقطة wildcard فكل حرف (حتى النقطة نفسها) بقى [[#]].
- التاني: [[\.]] النقطة الحرفية بس.
- التالت: [[\n]] اتساب لأن النقطة مبتطابقهوش.
- الرابع: مع [[s]] السطر الجديد كمان بقى [[#]]، فـ ٣ حروف ٣ علامات.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[myEscape(s)]] بتحط [[\]] قبل كل syntax character ([[^ $ \ . * + ? ( ) [ ] { } | /]]) بـ loop على الحروف (من غير regex). وقارنها بـ [[RegExp.escape]] على [["1+1=2"]] و [["(a|b)"]] و [["c:/x"]] و [["سعر.قهوة"]]: كل نص لازم يطابق نفسه بالظبط بـ [[^...$]].`, done: R`الأربع نصوص بيطابقوا نفسهم بالنسختين، و [[myEscape("(a|b)")]] بترجّع [[\(a\|b\)]]، والعربي بيعدّي زي ما هو والنقطة بس اللي اتعمل لها escape.`, sol: R`~~~js p3.mjs
const SYNTAX = new Set("^$\\.*+?()[]{}|/");
const myEscape = (s) => [...s].map((ch) => (SYNTAX.has(ch) ? "\\" + ch : ch)).join("");
for (const s of ["1+1=2", "(a|b)", "c:/x", "سعر.قهوة"]) {
  const mine = new RegExp("^" + myEscape(s) + "$"), std = new RegExp("^" + RegExp.escape(s) + "$");
  console.log(s, mine.source, mine.test(s), std.test(s));
}
~~~

~~~text الناتج (Node 24.22)
1+1=2 ^1\+1=2$ true true
(a|b) ^\(a\|b\)$ true true
c:/x ^c:\/x$ true true
سعر.قهوة ^سعر\.قهوة$ true true
~~~

- [[new Set("^$\\.*+?()[]{}|/")]]: الـ Set من نص بياخد كل حرف لوحده. و [["\\"]] في النص backslash واحدة.
- [[[...s]]]: بيقسم النص لحروف (code points)، فالعربي والـ emoji مبيتكسروش.
- النسخة دي كفاية **برّه** الـ class. [[RegExp.escape]] بتعمل escape لحاجات زيادة ([[-]] والمسافة وأول حرف) عشان تبقى آمنة في أي مكان، حتى جوه [[[ ]]] ومع [[v]].` },
            { lvl: 'تحدي', t: R`**قارن:** «أي حرف بما فيه السطر الجديد» ليها ٣ أشكال: [[.]] مع [[s]]، و [[[^]]]، و [[[\s\S]]]. جرّبهم مع وبدون [[u]] على [["😀\nب"]] بـ [[match(.../g)]]، وقول كام match في كل حالة وليه.`, done: R`عرفت إن من غير [[u]] الـ emoji بيطلع حتتين، وإن التلات أشكال مع [[u]] بيطلّعوا ٣ (emoji كامل، وسطر جديد، وب)، و [[.]] من غير [[s]] بتطلّع من غير [[\n]].`, sol: R`~~~js p4.mjs
const s = "😀\nب";
console.log(s.match(/./g), s.match(/./gs), s.match(/./gsu), s.match(/[^]/gu), s.match(/[\s\S]/gu).length);
~~~

~~~text الناتج (Node 24.22)
[ '\ud83d', '\ude00', 'ب' ] [ '\ud83d', '\ude00', '\n', 'ب' ] [ '😀', '\n', 'ب' ] [ '😀', '\n', 'ب' ] 3
~~~

- [[/./g]]: من غير [[u]] الـ emoji اتقسم لـ surrogate pair (حتتين ملهمش معنى لوحدهم)، ومن غير [[s]] الـ [[\n]] اتساب.
- [[/./gs]]: الـ [[\n]] دخل، والـ emoji لسه حتتين.
- [[/./gsu]] و [[/[^]/gu]] و [[/[\s\S]/gu]]: ٣ matches صح. الـ ٣ أشكال زي بعض، و [[s]] أوضح في الكود الجديد.` },
          ],
          flag: "script",
          deep: {
            why: R`أشهر باج regex في الدنيا نقطة من غير [[\]]: فحص إصدار، أو IP، أو دومين، أو اسم ملف [[.js]]، بيعدّي نصوص غلط وكل الاختبارات اللي فيها نقطة حقيقية بتنجح. والعكس: [[\]] زيادة قبل حرف عادي، أو [[]]] لوحده، بيعدّي من غير [[u]] ويرمي أول ما حد يضيف [[u]] أو [[v]] عشان العربي.`,
            how: R`النقطة في الـ spec اسمها **wildcard**، وبتطابق أي حرف ما عدا الـ LineTerminator: [[\n]] (LF) و [[\r]] (CR) و [[\u2028]] (Line Separator) و [[\u2029]] (Paragraph Separator). التاب والمسافة والحروف العربي كلهم بيتطابقوا.

الحرف «حرفي» لو مش syntax character: [[^ $ \ . * + ? ( ) [ ] { } |]]. جوه الـ literal كمان [[/]] لازم [[\/]] (وإلا بتقفل الـ literal)، بس في [[new RegExp("a/b")]] مش محتاجة. جوه [[[ ]]] أغلبهم حرفيين ما عدا [[]]] و [[\]] و [[^]] في الأول و [[-]] بين حرفين (ومع [[v]] كمان [[( ) [ { } / - |]]).

من غير [[u]] الـ engine في **Annex B mode** (وضع التوافق مع الكود القديم): [[]]] و [[{]] و [[}]] لوحدهم حرفيين، و [[a{2]] (quantifier ناقص) حرفي، و [[\q]] أو [[\-]] (escape لحرف عادي) بيبقى الحرف نفسه. مع [[u]] أو [[v]] الحاجات دي SyntaxError: [[Lone quantifier brackets]] و [[Incomplete quantifier]] و [[Invalid escape]]. ده مقصود: عشان الغلط يبان بدل ما يتقري بمعنى تاني.`,
            when: R`استخدم النقطة لما تقصد «أي حرف» فعلًا، وغالبًا في [[.*?]] بين حاجتين معروفين. لما تعرف الحروف المسموحة، class أدق وأسرع ([[[^"]*]] بدل [[.*?]] بين تنصيص). وأي نص ثابت فيه رمز (نسخة، IP، امتداد ملف، سعر بـ [[$]]) حط [[\]] قبل الرموز، وأي نص متغير عدّيه على [[RegExp.escape]].`,
            mistakes: R`[[/\.js$/]] مكتوبة [[/.js$/]] فـ [["myjs"]] تعدّي. و [[^a|b$]] فاكرها «a أو b بالظبط» وهي «a في الأول **أو** b في الآخر» (جرّبناها على [["a|b"]] ورجّعت [[true]] للسبب الغلط)، والصح [[^(?:a|b)$]]. و [[.]] على نص فيه emoji من غير [[u]] بتقطع الـ emoji. و [[\-]] أو [[\_]] برّه الـ class مع [[u]]: [[Invalid escape]].`
          },
          teach: R`## الفكرة في سطر

أي حرف في الـ pattern يا **بيطابق نفسه** (literal character)، يا **ليه معنى** (syntax character). والنقطة أشهر حرف ليه معنى: الـ **wildcard**. المثال بيقيس الاتنين حرف حرف. كل الناتج اتشغّل فعلًا على Node 24.22.

---

## ١. الـ wildcard: النقطة بتطابق إيه؟

~~~js app.mjs
const chars = ["a", "ب", " ", "\t", "\n", "\r", "\u2028", "\u2029"];
console.log(chars.map((ch) => /^.$/.test(ch)).join(" "));
console.log(chars.map((ch) => /^.$/s.test(ch)).join(" "));
~~~

[[/^.$/]] معناها «النص كله حرف واحد». جرّبناها على ٨ حروف:

~~~text الناتج
true true true true false false false false
true true true true true true true true
~~~

| الحرف | اسمه | [[.]] | [[.]] مع [[s]] |
|---|---|---|---|
| [[a]] و [[ب]] | حروف عادية بأي لغة | ✓ | ✓ |
| المسافة و [[\t]] | مسافة و tab، مش سطر جديد | ✓ | ✓ |
| [[\n]] | Line Feed: السطر الجديد العادي | ✗ | ✓ |
| [[\r]] | Carriage Return: نص سطر ويندوز الجديد [[\r\n]] | ✗ | ✓ |
| [[\u2028]] و [[\u2029]] | Line و Paragraph Separator من Unicode | ✗ | ✓ |

الأربعة اللي ✗ اسمهم **line terminators**، وهم نفسهم اللي [[^]] و [[$]] بيتعاملوا معاهم مع [[m]].

### الـ emoji وعلامة [[u]]

~~~js app.mjs
console.log(/^.$/.test("😀"), /^.$/u.test("😀"), /^[^]$/.test("\n"));
~~~

~~~text الناتج
false true true
~~~

- الـ emoji في UTF-16 حرفين (surrogate pair). من غير [[u]] النقطة بتاخد واحد بس فـ [[^.$]] فشلت. مع [[u]] الاتنين حرف واحد.
- [[[^]]]: class فاضية منفية = «أي حرف» حتى [[\n]]. الشكل القديم قبل [[s]].

### النقطة ضد النقطة الحرفية

~~~js app.mjs
console.log("v1.2".replace(/./g, "*"), "v1.2".replace(/\./g, "*"), "v1.2".replace(/[.]/g, "*"));
~~~

~~~text الناتج
**** v1*2 v1*2
~~~

[[/./g]] بدّلت كل حرف. [[\.]] و [[[.]]] النقطة الحرفية بس: جوه [[[ ]]] النقطة ملهاش معنى خاص.

---

## ٢. literal characters: الحرف اللي بيطابق نفسه

~~~js app.mjs
console.log(/كتاب/.test("الكتاب ده"), /cat/.test("concatenate"), /a b/.test("a  b"));
~~~

~~~text الناتج
true true false
~~~

- [[/كتاب/]]: ٤ حروف literal ورا بعض، بتطابق نفس الـ ٤ في أي مكان. «الكتاب» فيها «كتاب».
- [[/cat/]] لقتها جوه «con**cat**enate»: الـ literal مبيعرفش حدود الكلمات (ده شغل [[\b]] أو lookaround).
- [[/a b/]]: المسافة نفسها literal، **مسافة واحدة بالظبط**. [["a  b"]] فيها مسافتين ففشلت. (لو تقصد مسافة أو أكتر: [[a +b]] أو [[a\s+b]].)

---

## ٣. الحروف الخاصة: من غير [[\]] بتغيّر المعنى أو بترمي

~~~js app.mjs
console.log(/^1+1$/.test("1+1"), /^1\+1$/.test("1+1"), /^a|b$/.test("a|b"), /^a\|b$/.test("a|b"));
~~~

~~~text الناتج
false true true true
~~~

- [[/^1+1$/]]: [[+]] هنا «1 مرة أو أكتر» مش حرف، فالـ regex بيطابق [["11"]] و [["111"]] مش [["1+1"]].
- [[/^a|b$/]] رجّعت [[true]]، بس **للسبب الغلط**: [[|]] بتقسم الـ regex كله لـ «[[^a]]» **أو** «[[b$]]»، و [["a|b"]] بتبدأ بـ a. نفس الـ regex بيقبل [["abc"]] كمان.
- [[\+]] و [[\|]]: الحرف نفسه.

### الجدول: كل syntax character

جرّبنا كل حرف لوحده في loop: حطيناه بين a و b في الـ regex مرة من غير [[\]] ومرة بيها (يعني [[^a?b$]] و [[^a\?b$]] للـ [[?]] مثلًا)، وجرّبنا الاتنين على النص اللي فيه الحرف نفسه حرفيًا ([["a?b"]]):

| الحرف | من غير [[\]] | مع [[\]] | معناه لو من غير [[\]] |
|---|---|---|---|
| [[^]] و [[$]] | مبيطابقش | يطابق | أول وآخر النص (anchor) |
| [[\]] | مبيطابقش | يطابق | بداية escape للحرف اللي بعده |
| [[.]] | يطابق بالصدفة | يطابق | أي حرف، فبتطابق النقطة وأي حاجة تانية |
| [[*]] و [[+]] و [[?]] | مبيطابقش | يطابق | quantifier على الحرف اللي قبله |
| [[(]] و [[)]] | SyntaxError | يطابق | group: [[Unterminated group]] و [[Unmatched ')']] |
| [[[]] | SyntaxError | يطابق | class: [[Unterminated character class]] |
| [[]]] و [[{]] و [[}]] | يطابق (من غير [[u]] بس) | يطابق | حرفي في Annex B، و SyntaxError مع [[u]] |
| [[|]] | يطابق بالصدفة | يطابق | «أو» بيقسم الـ regex كله |
| [[/]] | يطابق في [[new RegExp]] | يطابق | بيقفل الـ literal لو كتبته بين [[/ /]] |

**القاعدة العملية:** أي حرف من دول عايزه حرفي: [[\]] قبله. والحروف العادية (حروف وأرقام ومسافة) **متحطش** قبلها [[\]]: [[\d]] و [[\b]] و [[\s]] ليهم معنى، والباقي بيرمي مع [[u]].

### الـ SyntaxError نفسها

~~~js app.mjs
try { new RegExp("price (EGP"); } catch (e) { console.log(e.message); }
~~~

~~~text الناتج
Invalid regular expression: /price (EGP/: Unterminated group
~~~

---

## ٤. [[u]] بيقفل باب التساهل

~~~js app.mjs
console.log(/a]b/.test("a]b"), /a{b/.test("a{b"));
try { new RegExp("a]b", "u"); } catch (e) { console.log(e.message); }
try { new RegExp("\\-", "u"); } catch (e) { console.log(e.message); }
~~~

~~~text الناتج
true true
Invalid regular expression: /a]b/u: Lone quantifier brackets
Invalid regular expression: /\-/u: Invalid escape
~~~

من غير [[u]] الـ engine بيقرا [[]]] و [[{]] لوحدهم كحروف عادية، و [[\-]] كـ [[-]] (ده اسمه Annex B: قواعد متساهلة عشان كود قديم ميبوظش). مع [[u]] أو [[v]] كله ده SyntaxError. وجرّبنا كمان [[{]] لوحدها و [[}]] بنفس الرسالة، و [[a{2]] بـ [[Incomplete quantifier]]، و [[\q]] بـ [[Invalid escape]].

**النتيجة:** لو هتضيف [[u]] لـ regex قديم (عشان العربي أو الـ emoji)، شغّله الأول: أي escape زيادة أو قوس لوحده هيبان.

---

## الخلاصة

| عايز تطابق | اكتب |
|---|---|
| أي حرف ما عدا السطر الجديد | [[.]] |
| أي حرف بما فيه السطر الجديد | [[.]] مع [[s]] (أو [[[^]]] أو [[[\s\S]]]) |
| emoji كحرف واحد | [[.]] مع [[u]] أو [[v]] |
| نقطة حرفية | [[\.]] أو [[[.]]] |
| واحد من [[^ $ \ . * + ? ( ) [ ] { } | /]] | [[\]] قبله |
| نص متغير جاي من برّه | [[RegExp.escape(text)]] |`,
          lines: [
            R`٨ حروف هنجرّبهم: حرفين عادي، ومسافة و tab، والأربع line terminators ([[\n]] و [[\r]] و [[\u2028]] و [[\u2029]]).`,
            R`[[/^.$/]] «النص كله حرف واحد». أول ٤ [[true]] والأربعة الأخيرين [[false]]: النقطة مبتطابقش أي line terminator.`,
            R`نفس الحروف مع [[s]] (dotAll): كلهم [[true]]، النقطة بقت تطابق السطر الجديد كمان.`,
            R`الـ emoji حرفين في UTF-16: من غير [[u]] النقطة بتاخد نصه ([[false]])، ومع [[u]] بتاخده كله ([[true]]). و [[[^]]] أي حرف حتى [[\n]].`,
            R`[[/./g]] بدّلت كل حرف بـ [[*]]، و [[\.]] و [[[.]]] النقطة الحرفية بس فطلع [[v1*2]] مرتين.`,
            R`literal characters: [[كتاب]] اتلاقت جوه «الكتاب»، و [[cat]] جوه «concatenate»، و [[a b]] بمسافة واحدة فشلت على مسافتين.`,
            R`[[1+1]] من غير [[\]] معناها «1 مرة أو أكتر ثم 1» ففشلت، و [[\+]] نجحت. و [[^a|b$]] نجحت بالصدفة لأن [[|]] قسمت الـ regex، و [[\|]] نجحت صح.`,
            R`قوس مفتوح من غير قفلة في نص: [[new RegExp]] رمت [[Unterminated group]] واتمسكت.`,
            R`من غير [[u]]: [[]]] و [[{]] لوحدهم بيطابقوا نفسهم (قواعد Annex B المتساهلة)، فالاتنين [[true]].`,
            R`نفس [[a]b]] مع [[u]]: SyntaxError [[Lone quantifier brackets]]. التساهل اتقفل.`,
            R`[[\-]] برّه الـ class مع [[u]]: [[Invalid escape]]. من غير [[u]] كانت هتبقى [[-]] عادي.`,
          ],
          ref: [
            { t: "MDN: Wildcard: .", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Wildcard" },
            { t: "MDN: Literal character", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Literal_character" },
            { t: "MDN: Character escape", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_escape" },
            { t: "ECMAScript: SyntaxCharacter", url: "https://tc39.es/ecma262/multipage/text-processing.html#prod-SyntaxCharacter" },
          ],
          pre: [{ to: "js/regex: classes و quantifiers", why: R`النقطة والـ quantifiers والـ anchors في أبسط صورهم` }, { to: "js/regex والعربي: Unicode properties", why: R`الـ escapes جوه الـ regex وإزاي [[u]] بيرمي على الغلط` }],
        },
        {
          cmd: "named backreference و modifiers و buffer boundaries",
          title: "\\k<name> بيرجع لنفس النص، و (?i:...) بيشغّل flag لحتة بس، و \\A و \\z مش في JS لسه",
          desc: R`ده آخر حتة في الـ syntax:
• **named backreference** [[\k<name>]]: «نفس النص بالظبط اللي الـ group اللي اسمه [[name]] مسكه». زي [[\1]] بس بالاسم، فمش بيبوظ لو زوّدت أقواس. للحاجات اللي لازم تتقفل بنفس اللي فتحها: تنصيص [["]] أو [[']]، و tag بنفس الاسم، وكلمة متكررة.
• **modifiers** [[(?i:...)]] و [[(?-i:...)]] و [[(?ims-ims:...)]]: تشغّل أو تطفي flag من [[i]] و [[m]] و [[s]] **لجزء من الـ regex بس**. مثلًا اسم الـ method بأي حالة حروف، والـ path حساس. جديدة (Baseline «newly available»، يعني في آخر نسخ المتصفحات الرئيسية بس): شغالة في Node 24 و Chrome، وجرّبناها على الاتنين.
• **buffer boundary assertions** [[\A]] (أول النص) و [[\z]] (آخره) و [[\Z]] (آخره أو قبل سطر جديد أخير): موجودين في PCRE و Python، و MDN كاتب لهم صفحة، بس **مش متطبقين** في Node 24.22 ولا Chrome 157: مع [[u]] بيرموا [[Invalid escape]]، ومن غير [[u]] [[\A]] بتطابق حرف [[A]] عادي. البديل: [[^]] و [[$]] **من غير** [[m]] هما بالظبط [[\A]] و [[\z]]، و [[\n?$]] بدل [[\Z]].`,
          example: R`// named backreference: \k<name> = نفس النص اللي الـ group ده مسكه
const quoted = /(?<q>["'])(?<body>.*?)\k<q>/g;
console.log([...$__btsay "it's ok" and 'hi'$__bt.matchAll(quoted)].map((m) => m.groups.body));
const dup = /(?<!\p{L})(?<w>\p{L}+)\s+\k<w>(?!\p{L})/giu;
console.log("ده ده كلام the The end".replace(dup, "$<w>"));
console.log(/\b(?<w>\w+)\s+\k<w>\b/giu.test("ده ده"));
// modifiers: flag لجزء من الـ regex بس
const cmd = /^(?i:get|post) \/api\/[a-z]+$/;
console.log(cmd.test("GET /api/users"), cmd.test("get /api/users"), cmd.test("GET /API/users"));
const code = /^(?-i:EG)-\d+$/i;
console.log(code.test("EG-12"), code.test("eg-12"));
try { new RegExp("(?g:a)"); } catch (e) { console.log(e.message); }
// buffer boundaries \A و \z و \Z: مش موجودين في JS لسه
console.log(/\Afoo/.test("Afoo"));
try { new RegExp(String.raw$__bt\Afoo\z$__bt, "u"); } catch (e) { console.log(e.message); }
console.log(/^foo$/.test("foo"), /^foo$/.test("foo\n"), /^foo\n?$/.test("foo\n"), /^foo$/m.test("x\nfoo"));`,
          try: R`اكتب regex بـ [[\k<tag>]] بيلاقي tags متقفلة صح زي [[<b>bold</b>]] و [[<h2>title</h2>]] في نص، ويرفض [[<i>x</b>]] (اتقفلت بـ tag تاني). وخلي اسم الـ tag مش حساس للحروف، فـ [[<B>up</b>]] تتقبل.`,
          sol: R`~~~js tags.mjs
const pair = /<(?<tag>[a-z][a-z0-9]*)>(?<body>[^<]*)<\/\k<tag>>/gi;
console.log([..."<b>bold</b> <i>x</b> <h2>title</h2> <B>up</b>".matchAll(pair)].map((m) => m.groups.tag + "=" + m.groups.body));
~~~

~~~text الناتج (Node 24.22)
[ 'b=bold', 'h2=title', 'B=up' ]
~~~

- [[(?<tag>[a-z][a-z0-9]*)]]: اسم الـ tag، و [[\k<tag>]] في القفلة لازم يبقى **نفس** الاسم، فـ [[<i>x</b>]] اترفضت.
- [[i]] بتأثر على الـ backreference كمان: [[B]] و [[b]] اتعتبروا نفس الاسم.
- [[[^<]*]]: الجسم من غير tags جواه. ده تمرين على [[\k]]، مش parser HTML: لـ HTML حقيقي استخدم [[DOMParser]] (درس «إمتى regex غلط»).`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[/(?<a>x)\k<a>/.test("xx")]] و [[/(?<a>x)\k<a>/.test("xy")]] و [[/\k<a>/.test("k<a>")]]، وبعدين [[new RegExp("(?<a>x)\\k<a>|\\k<b>")]].`, done: R`توقعت [[true false true]] وإن الأخير SyntaxError، وعرفت ليه التالت [[true]].`, sol: R`~~~js p1.mjs
console.log(/(?<a>x)\k<a>/.test("xx"), /(?<a>x)\k<a>/.test("xy"), /\k<a>/.test("k<a>"));
try { new RegExp("(?<a>x)\\k<a>|\\k<b>"); } catch (e) { console.log(e.message); }
~~~

~~~text الناتج (Node 24.22)
true false true
Invalid regular expression: /(?<a>x)\k<a>|\k<b>/: Invalid named capture referenced
~~~

- التالت: regex **مفيهوش ولا named group** ومن غير [[u]]، فـ [[\k]] بتتقري حرف [[k]] عادي (Annex B)، و [[<a>]] حروف عادية. فبيطابق النص [["k<a>"]] حرفيًا!
- الرابع: أول ما يبقى فيه named group واحد في الـ regex، أي [[\k<اسم>]] لازم يبقى اسم موجود، وإلا SyntaxError. ومع [[u]] لازم دايمًا.` },
            { lvl: 'تطبيق', t: R`**ابني:** regex لـ header [[Content-Type]] بيقبل اسم الـ header بأي حالة حروف ([[Content-Type]] و [[CONTENT-TYPE]] و [[content-type]]) بس القيمة [[application/json]] لازم بالحروف الصغيرة، و [[; charset=utf-8]] اختياري. بـ modifier مش بـ [[i]] على الكل.`, done: R`السطرين الأولين بيعدّوا و [[content-type: Application/JSON]] بيترفض.`, sol: R`~~~js p3.mjs
const header = /^(?i:content-type):\s*(?<type>application\/json)(?:;\s*charset=(?<cs>utf-8))?$/;
for (const h of ["Content-Type: application/json", "CONTENT-TYPE: application/json; charset=utf-8", "content-type: Application/JSON"]) {
  console.log(h, header.test(h));
}
~~~

~~~text الناتج (Node 24.22)
Content-Type: application/json true
CONTENT-TYPE: application/json; charset=utf-8 true
content-type: Application/JSON false
~~~

[[(?i:content-type)]] بيشغّل [[i]] جوه القوس بس. قبل الـ modifiers كنت هتكتب [[[Cc][Oo][Nn]...]] حرف حرف، أو [[i]] على الكل وتفحص القيمة لوحدها.` },
            { lvl: 'تطبيق', t: R`**قارن:** في JS، [[$]] من غير [[m]] بتطابق قبل [[\n]] الأخير ولا لأ؟ جرّب [[/^total=\d+$/]] على [["total=40\n"]]، وبعدين [[/^total=\d+\n?$/]] على نفس النص وعلى [["total=40\n\n"]]، و [[/^total=\d+$/m]] على [["x\ntotal=40\ny"]].`, done: R`عرفت إن [[$]] في JS زي [[\z]] (آخر النص بالظبط)، مش زي [[$]] في Python و PCRE اللي بتسمح بسطر جديد أخير، وإن [[\n?$]] هو بديل [[\Z]].`, sol: R`~~~js p4.mjs
const lines = "total=40\n";
console.log(/^total=\d+$/.test(lines), /^total=\d+\n?$/.test(lines), /^total=\d+\n?$/.test("total=40\n\n"), /^total=\d+$/m.test("x\ntotal=40\ny"));
~~~

~~~text الناتج (Node 24.22)
false true false true
~~~

| في JS | زي إيه في PCRE و Python |
|---|---|
| [[^]] من غير [[m]] | [[\A]]: أول النص بالظبط |
| [[$]] من غير [[m]] | [[\z]]: آخر النص بالظبط، حتى لو فيه [[\n]] أخير |
| [[\n?$]] من غير [[m]] | [[\Z]]: آخر النص أو قبل سطر جديد واحد أخير |
| [[^]] و [[$]] مع [[m]] | [[^]] و [[$]] مع MULTILINE: أول وآخر كل سطر |

فخ لو جاي من Python: [[re.match(r"^\d+$", "40\n")]] بتنجح هناك، و [[/^\d+$/.test("40\n")]] بتفشل هنا. اعمل [[trim()]] للـ input، أو [[\n?$]].` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** حد نقل regex من PHP: [[new RegExp(String.raw$__bt\Aabc\z$__bt, "u")]]. شغّله، وبعدين جرّبه من غير [[u]] على [["Aabcz"]] وعلى [["abc"]]، وصلّحه.`, done: R`شفت [[Invalid escape]] مع [[u]]، وإن من غير [[u]] الـ regex بقى يطابق [["Aabcz"]] (حروف A و z عادية!) ومش [["abc"]]، وصلّحته لـ [[/^abc$/u]].`, sol: R`~~~js p5.mjs
try { new RegExp(String.raw$__bt\Aabc\z$__bt, "u"); } catch (e) { console.log(e.message); }
console.log(new RegExp(String.raw$__bt\Aabc\z$__bt).test("Aabcz"), new RegExp(String.raw$__bt\Aabc\z$__bt).test("abc"));
console.log(/^abc$/u.test("abc"), /^abc$/u.test("abc\n"), /^abc$/u.test("x\nabc"));
~~~

~~~text الناتج (Node 24.22)
Invalid regular expression: /\Aabc\z/u: Invalid escape
true false
true false false
~~~

- مع [[u]]: SyntaxError واضحة، وده الأحسن: الغلط بان.
- من غير [[u]]: الأخطر. [[\A]] و [[\z]] escapes مش معروفة، فـ Annex B بيقراهم حروف [[A]] و [[z]]، والـ regex بقى «A ثم abc ثم z» **من غير ولا error**.
- [[/^abc$/u]] هو [[\Aabc\z]] بالظبط: [[^]] و [[$]] من غير [[m]].
- وده سبب كفاية تحط [[u]] (أو [[v]]) في أي regex جديد.` },
          ],
          flag: "script",
          deep: {
            why: R`[[\k<name>]] هو الطريقة الوحيدة في الـ regex تقول «نفس اللي فات» (مش «نفس الشكل»)، ومن غيرها [[["'].*?["']]] بتقفل [["...']] غلط. والـ modifiers بتحل مشكلة قديمة: جزء من النص مش حساس للحروف (اسم header، أمر، كلمة مفتاحية) والباقي حساس (قيمة، كود، ID). و [[\A]] و [[\z]] هتقابلهم في كود منقول من PHP أو Python أو Ruby، ولازم تعرف إنهم مش هيشتغلوا وإزاي يبوظوا في صمت.`,
            how: R`[[\k<name>]] بيقارن بالنص اللي الـ group مسكه **في الـ match ده**، مش بالـ pattern. لو الـ group مشاركش (اختياري أو في بديل تاني)، الـ backreference بيطابق فاضي. ومع [[i]] المقارنة مش حساسة للحروف. ولو فيه named groups في الـ regex (أو فيه [[u]] أو [[v]])، [[\k<اسم>]] لاسم مش موجود SyntaxError. ومن ES2025 ينفع نفس الاسم في بديلين مختلفين ([[(?<y>\d{4})-\d\d|\d\d-(?<y>\d{4})]])، وجرّبناه على Node 24.22 و Chrome 157 وطلّع السنة من الشكلين.

الـ modifier [[(?flags-flags:...)]] group من غير حفظ (زي [[(?:...)]]) بس بيغيّر flags جواه. المسموح [[i]] و [[m]] و [[s]] بس: [[(?g:a)]] بيرمي [[Invalid group]]، و [[(?u:a)]] كمان، و [[(?i-i:a)]] بيرمي [[Repeated flag in flag group]]. و [[(?m:^b)]] و [[(?s:.)]] اشتغلوا في تجربتنا.

[[\A]] و [[\z]] و [[\Z]] في PCRE معناهم أول النص، وآخره، وآخره أو قبل [[\n]] أخير. في JS **مفيش** syntax ليهم (لسه اقتراح في TC39 ومش في الـ spec). من غير [[u]] أي escape لحرف عادي بيبقى الحرف نفسه، فـ [[\A]] = [[A]]. البديل: [[^]] و [[$]] من غير [[m]] (و [[$]] في JS عمرها ما بتسمح بـ [[\n]] أخير، يعني هي [[\z]] مش [[\Z]]).`,
            when: R`[[\k<name>]]: تنصيص بيتقفل بنفسه، و tags، وكلمات متكررة، و delimiters زي [[--- ... ---]] أو heredoc. الـ modifiers: لما جزء صغير بس محتاج flag مختلف، خصوصًا [[(?i:...)]] لكلمات مفتاحية وسط قيم حساسة. و [[^]] و [[$]] من غير [[m]] في أي validation (ده [[\A]] و [[\z]] بتوعك).`,
            mistakes: R`[[\b(?<w>\w+)\s+\k<w>\b]] على عربي: [[\b]] و [[\w]] إنجليزي بس فمبتلاقيش «ده ده» (جرّبناها: [[false]]). و [[\1]] بعد ما تزوّد group قبله فيتزحلق (استخدم الاسم). و [[\k<name>]] من غير named groups ومن غير [[u]] فبيطابق حرفيًا [[k<name>]]. ومودفاير بـ [[g]] أو [[u]] أو [[y]] (مش مسموحين). وكود فيه [[\A]] أو [[\z]] أو [[\K]] من PCRE من غير [[u]] فيبوظ في صمت.`
          },
          teach: R`## الفكرة في سطر

٣ حاجات من الـ syntax لسه مشفناهاش: **رجوع لنفس النص** بالاسم، و**flag لحتة** من الـ regex، و anchors من لغات تانية **مش موجودة** عندنا. كل الناتج اتشغّل فعلًا على Node 24.22، والـ modifiers و [[\A]] اتجرّبوا كمان على Chrome 157 بنفس النتيجة.

---

## ١. named backreference: [[\k<name>]]

### تنصيص بيتقفل بنفس اللي فتحه

~~~js app.mjs
const quoted = /(?<q>["'])(?<body>.*?)\k<q>/g;
console.log([...$__btsay "it's ok" and 'hi'$__bt.matchAll(quoted)].map((m) => m.groups.body));
~~~

| الحتة | معناها |
|---|---|
| [[(?<q>["'])]] | علامة تنصيص (مزدوجة أو مفردة) في group اسمه [[q]] |
| [[(?<body>.*?)]] | الكلام اللي جوه، lazy عشان يقف عند أول قفلة صح |
| [[\k<q>]] | **نفس** العلامة اللي [[q]] مسكها، مش أي علامة |

~~~text الناتج
[ "it's ok", 'hi' ]
~~~

[["it's ok"]] اتفتحت بـ [["]] فالـ [[']] اللي جواها مقفلتهاش. لو كتبنا [[["'](.*?)["']]] بدل [[\k<q>]] كانت هتقف عند [[']] وتطلّع [["it"]].

### كلمة متكررة بالعربي

~~~js app.mjs
const dup = /(?<!\p{L})(?<w>\p{L}+)\s+\k<w>(?!\p{L})/giu;
console.log("ده ده كلام the The end".replace(dup, "$<w>"));
console.log(/\b(?<w>\w+)\s+\k<w>\b/giu.test("ده ده"));
~~~

~~~text الناتج
ده كلام the end
false
~~~

- [[\k<w>]] مع [[i]]: [[The]] اتعتبرت زي [[the]].
- [[$<w>]] في الاستبدال: أول نسخة بس.
- السطر التاني: الشكل المشهور بـ [[\b]] و [[\w]] **فشل** على العربي، لأن الاتنين إنجليزي بس حتى مع [[u]]. عشان كده استخدمنا lookaround بـ [[\p{L}]] (المشروع «مصلّح الكلمات المتكررة» مبني على كده).

---

## ٢. modifiers: [[(?i:...)]] و [[(?-i:...)]]

~~~js app.mjs
const cmd = /^(?i:get|post) \/api\/[a-z]+$/;
console.log(cmd.test("GET /api/users"), cmd.test("get /api/users"), cmd.test("GET /API/users"));
~~~

~~~text الناتج
true true false
~~~

[[(?i:get|post)]]: group من غير حفظ، و [[i]] شغالة **جواه بس**. فالـ method بأي حالة، والـ path لازم صغير.

~~~js app.mjs
const code = /^(?-i:EG)-\d+$/i;
console.log(code.test("EG-12"), code.test("eg-12"));
~~~

~~~text الناتج
true false
~~~

العكس: [[i]] على الكل، و [[(?-i:EG)]] **بيطفيها** للـ [[EG]] بس. والشكل الكامل [[(?ims-ims:...)]]: اللي قبل [[-]] بيتشغّل واللي بعدها بيتطفي.

### المسموح والممنوع

~~~js app.mjs
try { new RegExp("(?g:a)"); } catch (e) { console.log(e.message); }
~~~

~~~text الناتج
Invalid regular expression: /(?g:a)/: Invalid group
~~~

| الـ modifier | النتيجة في Node 24.22 |
|---|---|
| [[(?i:a)]] و [[(?-i:a)]] | شغالين: بيشغّلوا أو يطفوا [[i]] جوه القوس |
| [[(?m:^b)]] على [["a\nb"]] | [[true]]: [[^]] لكل سطر جوه الـ group بس |
| [[(?s:.)]] بين a و b على [["a\nb"]] | [[true]]: النقطة خدت [[\n]] |
| [[(?g:a)]] و [[(?u:a)]] | [[Invalid group]]: [[i]] و [[m]] و [[s]] بس المسموحين |
| [[(?i-i:a)]] | [[Repeated flag in flag group]] |

الـ modifiers Baseline «newly available»: موجودة في آخر نسخ المتصفحات الرئيسية، بس مش في القديمة. لو كودك لازم يشتغل على متصفحات قديمة، الـ regex هيرمي SyntaxError وقت التحميل.

---

## ٣. buffer boundary assertions: [[\A]] و [[\z]] و [[\Z]]

دول في PCRE (PHP و grep -P) و Python و Ruby:

| الـ assertion | معناه هناك |
|---|---|
| [[\A]] | أول النص بالظبط، حتى مع multiline |
| [[\z]] | آخر النص بالظبط |
| [[\Z]] | آخر النص، أو قبل سطر جديد أخير |

MDN كاتب لهم صفحة، بس جرّبناهم:

~~~js app.mjs
console.log(/\Afoo/.test("Afoo"));
try { new RegExp(String.raw$__bt\Afoo\z$__bt, "u"); } catch (e) { console.log(e.message); }
~~~

~~~text الناتج (Node 24.22، ونفس الرسالة في Chrome 157)
true
Invalid regular expression: /\Afoo\z/u: Invalid escape
~~~

- من غير [[u]]: [[\A]] بقت حرف [[A]] عادي، و [[/\Afoo/]] طابقت [["Afoo"]]. **أسوأ حالة**: مفيش error والمعنى اتغيّر.
- مع [[u]]: SyntaxError. وجرّبنا [[\z]] و [[\Z]] لوحدهم ومع [[v]]: نفس الرسالة.

### البديل اللي شغال النهارده

~~~js app.mjs
console.log(/^foo$/.test("foo"), /^foo$/.test("foo\n"), /^foo\n?$/.test("foo\n"), /^foo$/m.test("x\nfoo"));
~~~

~~~text الناتج
true false true true
~~~

| عايز | في JS |
|---|---|
| [[\A]] | [[^]] من غير [[m]]: أول النص بس، مهما كان فيه سطور |
| [[\z]] | [[$]] من غير [[m]]: في JS عمرها ما بتعدّي [[\n]] أخير ([["foo\n"]] فشلت) |
| [[\Z]] | [[\n?$]] من غير [[m]]: سطر جديد واحد اختياري وبعده آخر النص |
| أول وآخر كل سطر | [[^]] و [[$]] **مع** [[m]]، وده مش [[\A]] ولا [[\z]] |

---

## الخلاصة

| الحاجة | اكتبها | خلي بالك |
|---|---|---|
| نفس النص اللي group مسكه | [[\k<name>]] | مع [[i]] مش حساس للحروف، والاسم لازم يبقى موجود |
| flag لحتة | [[(?i:...)]] و [[(?-i:...)]] و [[(?ims-ims:...)]] | [[i]] و [[m]] و [[s]] بس، ومش في المتصفحات القديمة |
| أول وآخر النص بالظبط | [[^...$]] من غير [[m]] | ده [[\A]] و [[\z]] بتوعنا |
| [[\A]] و [[\z]] و [[\Z]] و [[\K]] من PCRE | مش موجودين | من غير [[u]] بيبقوا حروف عادية في صمت |`,
          lines: [
            R`[[(?<q>["'])]] بيمسك علامة التنصيص اللي فتحت، و [[\k<q>]] في الآخر لازم يبقى **نفس** العلامة، والكلام اللي بينهم في [[body]].`,
            R`[[matchAll]] على جملة فيها تنصيصين: الأول [["..."]] وجواه [[']]، والتاني [['...']]. طلع [["it's ok"]] كاملة و [['hi']].`,
            R`كلمة متكررة بأي لغة: [[\p{L}+]] كلمة، و [[\k<w>]] نفس الكلمة، والـ lookaround بدل [[\b]] عشان العربي، و [[i]] عشان [[The]] زي [[the]].`,
            R`[[replace]] بـ [[$<w>]] بيسيب نسخة واحدة: [[ده كلام the end]].`,
            R`الشكل المشهور بـ [[\b]] و [[\w]] على «ده ده» رجّع [[false]]: الاتنين بيفهموا إنجليزي بس حتى مع [[u]].`,
            R`modifier [[(?i:get|post)]]: الـ method بأي حالة حروف، وباقي الـ regex (الـ path) حساس.`,
            R`[[GET]] و [[get]] عدّوا، و [[/API/]] بالكابيتال فشلت لأن [[i]] جوه القوس بس: [[true true false]].`,
            R`العكس: [[i]] على الـ regex كله، و [[(?-i:EG)]] بيطفيها للـ [[EG]] بس.`,
            R`[[EG-12]] عدّت و [[eg-12]] فشلت: [[true false]].`,
            R`[[g]] مش مسموحة في modifier ([[i]] و [[m]] و [[s]] بس)، فـ [[Invalid group]].`,
            R`[[\A]] من غير [[u]]: escape مش معروف بيبقى الحرف نفسه، فـ [[/\Afoo/]] طابقت [["Afoo"]]. ده اللي بيحصل لكود منقول من PHP في صمت.`,
            R`مع [[u]]: [[\A]] و [[\z]] SyntaxError [[Invalid escape]]: مش متطبقين في JS.`,
            R`البديل: [[^foo$]] من غير [[m]] = [[\Afoo\z]]، فـ [["foo\n"]] فشلت. و [[\n?$]] = [[\Z]] فعدّت. ومع [[m]] لكل سطر.`,
          ],
          ref: [
            { t: "MDN: Named backreference: \\k<name>", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Named_backreference" },
            { t: "MDN: Modifier: (?ims-ims:...)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Modifier" },
            { t: "MDN: Buffer boundary assertion", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Buffer_boundary_assertion" },
            { t: "MDN: Input boundary assertion: ^, $", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Input_boundary_assertion" },
          ],
          pre: [{ to: "js/groups و flags", why: R`الـ named groups و [[\1]] اللي [[\k<name>]] بيكمّلها` }, { to: "js/test و match و matchAll و replace", why: R`[[$<name>]] في الاستبدال` }],
        },
      ],
    }
]);
