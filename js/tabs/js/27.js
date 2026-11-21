// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: R`البيانات الثنائية والـ Workers: ArrayBuffer و TypedArrays و DataView و Atomics`,
      l: 3,
      n: "الـ bytes والـ hex، و ArrayBuffer (slice و isView و resize و transfer والـ detached)، والـ ١٢ typed array والـ overflow والـ endianness، وكل methods الـ TypedArray، و DataView على ملفات WAV و PNG حقيقية، و base64 و hex و TextEncoder، و Web Workers و worker_threads بالـ transfer، و SharedArrayBuffer والـ COOP/COEP، و Atomics كلها بـ race حقيقي و lock، ومشاريع: hex dump، ومحوّل نص و bytes، وملف صوت، وفلتر صور في Worker، ومفتش ملفات binary، و format binary بتاعك",
      pre: [
        { to: "js/bitwise و shifts", why: R`الـ bits والـ hex و [[&]] و [[>>>]]: هتحتاجهم في كل سطر بيقرا bytes` },
        { to: "js/BigInt بعمق", why: R`[[BigInt64Array]] و [[getBigUint64]] بيرجّعوا BigInt` },
        { to: "js/Math.sumPrecise و fround و f16round", why: R`ليه [[0.1]] في [[Float32Array]] بيبقى [[0.10000000149011612]]` },
        { to: "js/Array: at و slice و concat", why: R`الـ methods اللي الـ typed arrays بتشاركها مع [[Array]]، وهنا الفرق` },
        { to: "js/blocking و الـ main thread", why: R`ليه الحساب التقيل بيجمّد الصفحة، والـ Worker هو الحل` },
        { to: "js/memory leaks", why: R`الذاكرة اللي الـ buffers الكبيرة بتاخدها ومين بيفضّيها` },
        { to: "js/deepClone و structuredClone", why: R`الـ structured clone هو نفسه اللي [[postMessage]] بيستخدمه` },
      ],
      goal: [
        R`تقرا أي bytes بالـ hex، وتعرف الفرق بين [[ArrayBuffer]] (الذاكرة) والـ view اللي بيقراها، وتحسب حجم نص بالـ bytes صح.`,
        R`تعمل وتنسخ وتكبّر وتنقل [[ArrayBuffer]]، وتعرف إمتى يبقى detached وإيه اللي بيحصل للـ views بتاعته.`,
        R`تختار الـ typed array الصح من الـ ١٢، وتتوقع الـ overflow والـ clamping، وتعرف الفرق بين [[subarray]] و [[slice]] وكل method تانية.`,
        R`تقرا وتكتب ملفات binary حقيقية بـ [[DataView]] (header ملف WAV و PNG) وتختار little أو big endian صح.`,
        R`تحوّل بين النص والـ bytes والـ base64 والـ hex من غير ما العربي يبوظ.`,
        R`تشغّل حساب تقيل في Web Worker أو [[worker_threads]] وتنقل الـ buffers من غير نسخ، وتستخدم [[SharedArrayBuffer]] و [[Atomics]] من غير race conditions.`,
      ],
      use: {
        prog: R`كل حاجة بتلمس ملفات أو شبكة أو صور بتعدّي من هنا: رفع ملفات وفحص نوعها، وضغط صور قبل الرفع، و audio في المتصفح، و WebSocket binary، والتشفير والـ hashing، و WebAssembly، و [[Buffer]] في Node في كل سطر بيقرا ملف. والـ Workers هي الطريقة الوحيدة في JavaScript تشغّل كود على أكتر من core.`,
        work: R`محررات صور وفيديو في المتصفح، وتطبيقات خرايط وألعاب (WebGL)، وأدوات بتقرا ملفات Excel و PDF و zip في المتصفح من غير سيرفر، و parsers لبروتوكولات أجهزة (IoT)، وسيرفرات Node بتعالج صور أو ملفات كبيرة في [[worker_threads]] عشان متوقفش الـ requests.`,
        cs: R`تمثيل الأرقام في الذاكرة (two's complement و IEEE 754)، و endianness، و file formats و magic numbers، والـ checksums (CRC32)، والـ concurrency: shared memory مقابل message passing، و race conditions، و atomic operations، و locks و futex (اللي [[Atomics.wait]] مبني عليها)، والـ memory model.`,
      },
      projects: [
        { lvl: 'صغير', t: R`hexdump: شوف أي ملف byte byte`, what: R`أداة سطر أوامر [[node hexdump.mjs <file> [--offset N] [--length N] ]] زي [[xxd]] و [[hexdump -C]] في لينكس: كل سطر ١٦ byte، فيه الـ offset بالـ hex (٨ أرقام)، وبعدين الـ bytes بالـ hex في مجموعتين ٨ و ٨، وبعدين عمود ASCII (الحرف لو قابل للطباعة و [[.]] لو لأ). الملف المش موجود والـ options الغلط والملف الفاضي بيطلّعوا رسالة واضحة و exit code 1 (أو رسالة «مفيش bytes»). من دروس «البيانات الثنائية: bytes و typed arrays» و «TypedArray: set و subarray».`, done: R`على ملف نص فيه عربي بتشوف [[d9 85]] مكان «م» و [[.]] في عمود ASCII، وعلى [[tiny.png]] بـ [[--length 40]] بتشوف [[.PNG........IHDR]]، و [[--offset 80]] بيبدأ العد من [[00000050]]، و [[nope.bin]] بيطبع «الملف مش موجود: nope.bin» و exit 1.`, sol: R`## الشكل النهائي

~~~text الناتج (Node 24.22): node hexdump.mjs sample.txt
00000000  48 69 21 20 d9 85 d8 b5  d8 b1 20 32 30 32 36 0a  |Hi! ...... 2026.|
00000010  d8 b3 d8 b7 d8 b1 20 d8  aa d8 a7 d9 86 d9 8a 0a  |...... .........|
— 32 من 32 byte
~~~

**هتشوف إيه:** كل سطر ١٦ byte. على الشمال مكان أول byte في السطر بالـ hex، وفي النص الـ bytes، وعلى اليمين نفس الـ bytes كحروف: الإنجليزي بيبان والعربي (bytes أكبر من ١٢٦) بيبقى نقط. ده بالظبط اللي بتعمله لما ملف «مش راضي يفتح» وعايز تعرف جواه إيه.

## الكود

~~~js hexdump.mjs
// hexdump.mjs: node hexdump.mjs <file> [--offset N] [--length N]
import { readFileSync } from 'node:fs';

function hexdump(bytes, start = 0) {
  const lines = [];
  for (let at = 0; at < bytes.length; at += 16) {
    const row = bytes.subarray(at, at + 16);
    const hex = Array.from(row, (b) => b.toString(16).padStart(2, '0'));
    const left = hex.slice(0, 8).join(' '), right = hex.slice(8).join(' ');
    const ascii = Array.from(row, (b) => (b >= 0x20 && b < 0x7f ? String.fromCharCode(b) : '.')).join('');
    lines.push((start + at).toString(16).padStart(8, '0') + '  ' + left.padEnd(23) + '  ' + right.padEnd(23) + '  |' + ascii + '|');
  }
  return lines.join('\n');
}

function parseArgs(argv) {
  const opts = { file: null, offset: 0, length: Infinity };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--offset' || a === '--length') {
      const n = Number(argv[++i]);
      if (!Number.isInteger(n) || n < 0) throw new Error(a + ' محتاج رقم صحيح موجب، اللي وصل: ' + argv[i]);
      opts[a.slice(2)] = n;
    } else if (!opts.file) opts.file = a;
    else throw new Error('argument زيادة: ' + a);
  }
  if (!opts.file) throw new Error('الاستخدام: node hexdump.mjs <file> [--offset N] [--length N]');
  return opts;
}

let file;
try {
  const opts = parseArgs(process.argv.slice(2));
  file = opts.file;
  const { offset, length } = opts;
  const data = readFileSync(file);
  const part = data.subarray(offset, offset + length);
  if (part.length === 0) console.log('(مفيش bytes: الملف ' + data.length + ' byte والـ offset ' + offset + ')');
  else console.log(hexdump(part, offset));
  console.log('—', part.length, 'من', data.length, 'byte');
} catch (e) {
  console.error('hexdump:', e.code === 'ENOENT' ? 'الملف مش موجود: ' + file : e.message);
  process.exitCode = 1;
}
~~~

## الشرح

- **[[bytes.subarray(at, at + 16)]]:** كل سطر view على ١٦ byte من غير نسخ، والسطر الأخير بيتقص لوحده.
- **[[Array.from(row, fn)]] مش [[row.map]]:** [[map]] على [[Uint8Array]] كانت هترجّع [[Uint8Array]] والنصوص ([['0f']]) هتبقى أصفار (درس «TypedArray: set و subarray»).
- **[[padEnd(23)]]:** ٨ bytes = ٨ × ٢ حروف + ٧ مسافات = ٢٣، فالسطر الناقص الأعمدة بتاعته بتفضل في مكانها.
- **عمود ASCII:** من [[0x20]] (المسافة) لـ [[0x7e]] ([[~]]) حروف بتتطبع، وغير كده [[.]]: نفس قاعدة [[hexdump -C]].
- **[[data.subarray(offset, offset + length)]]:** [[length]] الافتراضي [[Infinity]]، و [[subarray]] بيقص على الطول، فمش محتاجين حساب.
- **الأخطاء:** [[parseArgs]] بترمي برسالة، و [[catch]] واحد بيطبعها على stderr ويحط [[process.exitCode = 1]] (من غير [[process.exit]]، عشان أي output يخلص يتكتب).

## غلطات وقعت فيها وأنا ببنيها

- أول نسخة كانت بتطبع [[e.path]] في رسالة الملف المش موجود، وطلع فيها **المسار الكامل** للفولدر على جهازي. اتغيرت للاسم اللي اليوزر كتبه ([[file]]): أوضح ومبتسربش أسامي فولدرات.
- كنت عامل [[export function hexdump]] وشرط «لو الملف ده اللي اتشغّل» بمقارنة [[import.meta.url]] بـ [[process.argv[1] ]]، وده بيبوظ على ويندوز (الـ slashes والـ drive letter). الأداة صغيرة فشلت الـ export والشرط خالص. (لو محتاجه في Node 24: [[import.meta.main]] بيرجّع [[true]] لما الملف هو اللي اتشغّل، اتجرّب.)

## اتقاس

~~~text node hexdump.mjs tiny.png --length 40
00000000  89 50 4e 47 0d 0a 1a 0a  00 00 00 0d 49 48 44 52  |.PNG........IHDR|
00000010  00 00 00 03 00 00 00 02  08 02 00 00 00 12 16 f1  |................|
00000020  4d 00 00 00 1c 49 44 41                           |M....IDA|
— 40 من 85 byte
~~~

~~~text node hexdump.mjs tiny.png --offset 80
00000050  44 ae 42 60 82                                    |D.B$__bt.|
— 5 من 85 byte
~~~

~~~text node hexdump.mjs sample.txt --offset 4 --length 6
00000004  d9 85 d8 b5 d8 b1                                 |......|
— 6 من 32 byte
~~~

~~~text الأخطاء (كل واحد exit code 1)
hexdump: الملف مش موجود: nope.bin
hexdump: --length محتاج رقم صحيح موجب، اللي وصل: -3
hexdump: الاستخدام: node hexdump.mjs <file> [--offset N] [--length N]
~~~

والملف الفاضي: [[(مفيش bytes: الملف 0 byte والـ offset 0)]]. في الـ PNG باين التوقيع ([[.PNG]] بعد [[89]])، و [[IHDR]] وبعده العرض ٣ والطول ٢ (big-endian)، وآخر ٤ bytes CRC الـ [[IEND]].` },
        { lvl: 'صغير', dir: "text-bytes", t: R`محوّل النص ⇄ bytes ⇄ base64`, what: R`صفحة فيها مربع نص، وتحته جدول بيتحدث مع كل حرف: عدد وحدات UTF-16 ([[length]])، وعدد الـ code points، وعدد الـ bytes في UTF-8، والـ bytes بالـ hex، و base64، و base64url. وتحتها حقل تلزق فيه base64 فيرجّعه نص، ولو مش base64 سليم أو الـ bytes مش UTF-8 سليم يكتب رسالة حمرا. بيستخدم [[toBase64]] و [[fromBase64]] لو موجودين وإلا [[btoa]] و [[atob]]. من درس «Uint8Array: fromBase64 و toHex و TextEncoder».`, done: R`«شاي ☕ tea» بيطلع ٩ و ٩ و ١٤ byte والـ base64 [[2LTYp9mKIOKYlSB0ZWE=]]، و 😀 بيطلع ٢ و ١ و ٤، و [[2LTYp9mK]] بيرجع «شاي»، و [[2LTY!]] و [[/w==]] بيطلعوا رسالة غلط حمرا من غير ما الصفحة تقع.`, sol: R`## الشكل النهائي

~~~live 520 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>نص و bytes</title>
<style>
  body { font: 15px/1.6 system-ui, sans-serif; margin: 16px; max-width: 640px; }
  textarea, input { width: 100%; box-sizing: border-box; font: inherit; padding: 6px; }
  table { border-collapse: collapse; width: 100%; margin: 10px 0; }
  th, td { border: 1px solid #ccc; padding: 4px 8px; text-align: start; vertical-align: top; }
  td.code { direction: ltr; text-align: left; font-family: ui-monospace, monospace; word-break: break-all; }
  .err { color: #b00020; }
  .ok { color: #0b6e4f; }
</style>
</head>
<body>
<h1>النص ⇄ bytes</h1>
<label for="text">اكتب أي نص:</label>
<textarea id="text" rows="2">شاي ☕ tea</textarea>
<table>
  <tr><th>وحدات UTF-16 (length)</th><td id="units"></td></tr>
  <tr><th>code points</th><td id="points"></td></tr>
  <tr><th>bytes في UTF-8</th><td id="count"></td></tr>
  <tr><th>hex</th><td class="code" id="hex"></td></tr>
  <tr><th>base64</th><td class="code" id="b64"></td></tr>
  <tr><th>base64url</th><td class="code" id="b64url"></td></tr>
</table>
<label for="back">الصق base64 وارجعه نص:</label>
<input id="back" value="2LTYp9mK">
<p id="decoded"></p>
<script>
const $ = (id) => document.getElementById(id);
const native = typeof Uint8Array.prototype.toBase64 === 'function';
function toBase64(bytes, url) {
  if (native) return bytes.toBase64(url ? { alphabet: 'base64url', omitPadding: true } : {});
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  const b = btoa(bin);
  return url ? b.replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '') : b;
}
function fromBase64(text) {
  if (native) return Uint8Array.fromBase64(text.trim(), { alphabet: /[-_]/.test(text) ? 'base64url' : 'base64' });
  return Uint8Array.from(atob(text.trim().replaceAll('-', '+').replaceAll('_', '/')), (c) => c.charCodeAt(0));
}
function render() {
  const text = $('text').value;
  const bytes = new TextEncoder().encode(text);
  $('units').textContent = text.length;
  $('points').textContent = [...text].length;
  $('count').textContent = bytes.length;
  $('hex').textContent = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join(' ');
  $('b64').textContent = toBase64(bytes, false);
  $('b64url').textContent = toBase64(bytes, true);
}
function decode() {
  const out = $('decoded');
  try {
    const bytes = fromBase64($('back').value);
    out.textContent = '«' + new TextDecoder('utf-8', { fatal: true }).decode(bytes) + '» (' + bytes.length + ' byte)';
    out.className = 'ok';
  } catch (e) {
    out.textContent = 'مش base64 لنص UTF-8 سليم: ' + e.name;
    out.className = 'err';
  }
}
$('text').addEventListener('input', render);
$('back').addEventListener('input', decode);
render();
decode();
</script>
</body>
</html>
~~~

**هتشوف إيه:** اكتب أي حاجة في المربع والجدول بيتغيّر مع كل حرف. جرّب «😀»: [[length]] ٢ بس code point واحد و ٤ bytes. والحقل اللي تحت بيفك أي base64 (عادي أو url) ويعرض النص وعدد الـ bytes.

## الشرح

- **[[new TextEncoder().encode(text)]]** هو قلب الصفحة: كل الأرقام بعده محسوبة على الـ bytes مش على النص.
- **ثلاث أعداد مختلفة:** [[text.length]] وحدات UTF-16، و [[ [...text].length ]] code points (الـ spread بيمشي على الـ string بالـ code point)، و [[bytes.length]] الحجم الحقيقي في UTF-8. «شاي ☕ tea»: ٩ و ٩ و ١٤، لأن العربي ٢ bytes والـ ☕ ٣.
- **[[native]]:** feature detection مرة واحدة. في Chrome 140+ و Firefox 133+ و Safari 18.2+ الصفحة بتستخدم [[toBase64]]، وفي أي متصفح أقدم الـ fallback بـ [[btoa]] على دفعات.
- **base64url في الـ fallback:** [[btoa]] مبيعرفش الـ url alphabet، فبنبدّل [[+]] بـ [[-]] و [[/]] بـ [[_]] ونشيل الـ [[=]] بإيدنا، والعكس قبل [[atob]].
- **[[fromBase64]] بيختار الـ alphabet لوحده:** لو النص فيه [[-]] أو [[_]] يبقى url.
- **[[new TextDecoder('utf-8', { fatal: true })]]:** من غير [[fatal]]، الـ bytes اللي مش UTF-8 ([[/w==]] = byte واحد [[ff]]) كانت هتطلع [[�]] وتبان كأنها نجحت. بـ [[fatal]] بترمي، فبنقول لليوزر الحقيقة.

## غلطات وقعت فيها

- أول نسخة كانت عنوان الصف الأول [[حروف (length)]]، وده غلط: الـ [[length]] مش عدد الحروف (الإيموجي ٢). اتغيّر لـ «وحدات UTF-16».
- الـ fallback اتجرّب لوحده في Node 24.22 من غير flag (اللي مفيهوش [[toBase64]]): «😀» طلع [[8J+YgA==]] و [[8J-YgA]] زي Chrome بالظبط، و [[2LTY!]] رمى [[InvalidCharacterError]] والصفحة بتمسكه.

## اتقاس (Chrome 157، جوه iframe معزول زي اللي في الموقع)

~~~text الجدول مع «شاي ☕ tea»
وحدات UTF-16 (length)  9
code points            9
bytes في UTF-8         14
hex                    d8 b4 d8 a7 d9 8a 20 e2 98 95 20 74 65 61
base64                 2LTYp9mKIOKYlSB0ZWE=
base64url              2LTYp9mKIOKYlSB0ZWE
«شاي» (6 byte)
~~~

~~~text بعد ما كتبت 😀 وجرّبت ٣ قيم في حقل الـ base64
2 | 1 | 4 | f0 9f 98 80 | 8J+YgA== | 8J-YgA
2LTY!   ← مش base64 لنص UTF-8 سليم: SyntaxError
/w==    ← مش base64 لنص UTF-8 سليم: TypeError
8J-YgA  ← «😀» (4 byte)
~~~

الـ [[SyntaxError]] من [[fromBase64]] (حرف مش base64)، والـ [[TypeError]] من [[TextDecoder]] الـ fatal (byte مش UTF-8).` },
        { lvl: 'متوسط', t: R`مولّد نغمات WAV من نوتة مكتوبة`, what: R`[[node melody.mjs "C4:0.25 E4:0.25 G4:0.5 -:0.25 C5:1" out.wav]] بيحوّل نوتة مكتوبة (اسم النوتة والأوكتاف ومدتها بالثواني، و [[-]] للسكوت) لملف WAV حقيقي (22050 Hz، ١٦ bit، mono) بتسمعه في أي مشغّل. كل نوتة موجة sine بتدخل وتخرج بالتدريج (fade) عشان ميبقاش فيه «طقة». وبعد ما يكتب، بيقرا الملف تاني بـ [[DataView]] ويلف على الـ chunks ويطبع الـ rate والمدة وأعلى عينة، عشان يتأكد إن اللي اتكتب سليم. النوتة الغلط والمدة الغلط بيطلّعوا رسالة و exit code 1. من دروس «DataView» و «TypedArray: العيلة».`, done: R`الملف ٩٩٢٧٢ byte ومدته [[2.25]] ثانية والـ peak ١٠٠٠٠، وبيشتغل في أي مشغّل، و Chrome فكّه بـ [[decodeAudioData]] بنفس المدة، و [[H4:1]] و [[C4:0]] ومن غير arguments بيطلّعوا رسايل و exit 1.`, sol: R`## الشكل النهائي

~~~text الناتج (Node 24.22)
كتبت out.wav 99272 byte، 5 نوتة: 262Hz 330Hz 392Hz 0Hz 523Hz
{
  chunks: [ 'fmt :16', 'data:99228' ],
  rate: 22050,
  channels: 1,
  bits: 16,
  seconds: 2.25,
  peak: 10000
}
~~~

**هتسمع إيه:** دو ثم مي ثم صول (أطول شوية) ثم سكتة ثم دو العالية ثانية كاملة. الأرقام اللي تحت بتيجي من **قراية الملف تاني** مش من الذاكرة.

## الكود

~~~js melody.mjs
// melody.mjs: node melody.mjs "C4:0.25 E4:0.25 G4:0.5 -:0.25 C5:1" out.wav
import { writeFileSync, readFileSync } from 'node:fs';
const RATE = 22050;
const STEPS = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

function noteToHz(name) {
  const m = /^([A-G])(#?)(\d)$/.exec(name);
  if (!m) throw new Error('نوتة مش مفهومة: ' + name + ' (مثال: C4 أو F#3، و - للسكوت)');
  const midi = 12 * (Number(m[3]) + 1) + STEPS[m[1]] + (m[2] ? 1 : 0);
  return 440 * 2 ** ((midi - 69) / 12);
}

function parseScore(text) {
  return text.trim().split(/\s+/).map((part) => {
    const [name, len] = part.split(':');
    const seconds = Number(len);
    if (!(seconds > 0 && seconds <= 10)) throw new Error('مدة غلط في ' + part + ' (من 0 لـ 10 ثواني)');
    return { hz: name === '-' ? 0 : noteToHz(name), seconds };
  });
}

function render(notes) {
  const total = notes.reduce((n, x) => n + Math.round(x.seconds * RATE), 0);
  const samples = new Int16Array(total);
  let at = 0;
  for (const { hz, seconds } of notes) {
    const count = Math.round(seconds * RATE), fade = Math.min(200, count / 4);
    for (let i = 0; i < count && hz; i++) {
      const env = Math.min(1, i / fade, (count - i) / fade);
      samples[at + i] = Math.round(Math.sin((2 * Math.PI * hz * i) / RATE) * 10000 * env);
    }
    at += count;
  }
  return samples;
}

function toWav(samples) {
  const view = new DataView(new ArrayBuffer(44 + samples.byteLength));
  const tag = (o, s) => [...s].forEach((c, i) => view.setUint8(o + i, c.charCodeAt(0)));
  tag(0, 'RIFF'); view.setUint32(4, 36 + samples.byteLength, true); tag(8, 'WAVE');
  tag(12, 'fmt '); view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true);
  view.setUint32(24, RATE, true); view.setUint32(28, RATE * 2, true); view.setUint16(32, 2, true); view.setUint16(34, 16, true);
  tag(36, 'data'); view.setUint32(40, samples.byteLength, true);
  for (let i = 0; i < samples.length; i++) view.setInt16(44 + i * 2, samples[i], true);
  return new Uint8Array(view.buffer);
}

function inspect(file) {
  const bytes = readFileSync(file);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const text = (o) => String.fromCharCode(...bytes.subarray(o, o + 4));
  if (bytes.length < 12 || text(0) !== 'RIFF' || text(8) !== 'WAVE') throw new Error(file + ': مش ملف WAV');
  const info = { chunks: [] };
  for (let o = 12; o + 8 <= bytes.length; ) {
    const id = text(o), size = view.getUint32(o + 4, true);
    info.chunks.push(id + ':' + size);
    if (id === 'fmt ') Object.assign(info, { rate: view.getUint32(o + 12, true), channels: view.getUint16(o + 10, true), bits: view.getUint16(o + 22, true) });
    if (id === 'data') {
      let peak = 0;
      for (let p = o + 8; p + 1 < o + 8 + size; p += 2) peak = Math.max(peak, Math.abs(view.getInt16(p, true)));
      Object.assign(info, { seconds: Number((size / 2 / info.rate).toFixed(3)), peak });
    }
    o += 8 + size + (size % 2);
  }
  return info;
}

try {
  const [score, out = 'melody.wav'] = process.argv.slice(2);
  if (!score) throw new Error('الاستخدام: node melody.mjs "C4:0.5 E4:0.5 -:0.25 G4:1" [out.wav]');
  const notes = parseScore(score);
  const wav = toWav(render(notes));
  writeFileSync(out, wav);
  console.log('كتبت', out, wav.length, 'byte،', notes.length, 'نوتة:', notes.map((n) => Math.round(n.hz) + 'Hz').join(' '));
  console.log(inspect(out));
} catch (e) {
  console.error('melody:', e.message);
  process.exitCode = 1;
}
~~~

## الشرح

- **[[noteToHz]]:** رقم MIDI للنوتة = ١٢ × (الأوكتاف + ١) + مكانها في السلم (+١ لو [[#]]). و [[A4]] (رقم ٦٩) = ٤٤٠ Hz، وكل نص تون = ضرب في جذر ١٢ لـ ٢. فـ [[C4]] = ٢٦٢ و [[C5]] = ٥٢٣ (الضعف بالظبط: أوكتاف).
- **[[render]] بيرجّع [[Int16Array]]:** ده شكل العينات الطبيعي (PCM ١٦ bit). العينة = [[sin]] × ١٠٠٠٠ × [[env]]، و [[env]] بيطلع من ٠ لـ ١ في أول ٢٠٠ عينة وينزل في آخر ٢٠٠: من غيره كل نوتة بتبدأ بقفزة من صفر لقيمة كبيرة وبتسمع «طقة».
- **السكتة:** [[hz]] صفر، فالـ loop مبيكتبش حاجة والعينات بتفضل أصفار (الـ typed array متصفّرة من الأول).
- **[[toWav]]:** نفس header درس «DataView» بالظبط، والعينات بـ [[setInt16(..., true)]] (little-endian زي ما WAV عايز، ومن غير ما نفترض إن الجهاز little).
- **[[inspect]] بيلف على الـ chunks** مش بيفترض إن [[data]] عند ٣٦: يقرا النوع والحجم، وينط [[8 + size]] (و byte زيادة لو الحجم فردي، من مواصفة RIFF). كده بيشتغل على ملفات WAV من برامج تانية فيها [[LIST]] وغيرها.

## غلطات وقعت فيها

- المدة طلعت في الأول [[2.2500680272108844]]: [[0.25 × 22050 = 5512.5]] عينة، و [[Math.round]] خلاها ٥٥١٣، فكل نوتة ربع زادت جزء صغير. ده طبيعي (العينة مبتتقسمش)، فالعرض بقى [[toFixed(3)]].
- جرّبت من غير الـ fade الأول: النغمات كانت فيها طقطقة واضحة بين النوتات.

## اتقاس

~~~text الأخطاء (كل واحد exit code 1)
melody: نوتة مش مفهومة: H4 (مثال: C4 أو F#3، و - للسكوت)
melody: مدة غلط في C4:0 (من 0 لـ 10 ثواني)
melody: الاستخدام: node melody.mjs "C4:0.5 E4:0.5 -:0.25 G4:1" [out.wav]
~~~

وفي Chrome 157 فتحت نفس الملف بـ [[new OfflineAudioContext(1, 1, 22050).decodeAudioData(buf)]]: المدة [[2.250]] ثانية و 22050 Hz وقناة واحدة، والقناة [[Float32Array]] أعلى قيمة فيها [[0.3052]] = ١٠٠٠٠ ÷ ٣٢٧٦٨ (المتصفح بيحوّل الـ ١٦ bit لأرقام من -١ لـ ١). يعني المتصفح قرا نفس الـ header اللي احنا كتبناه.` },
        { lvl: 'متوسط', dir: "worker-image-filter", t: R`فلتر صور في Worker بالـ transfer`, what: R`صفحة فيها صورة مرسومة على [[canvas]] (تدرّج ودواير ونص)، وفلتر تختاره (رمادي، أو عكس الألوان، أو blur تقيل)، وزرارين: «طبّق في Worker» و «طبّق على الـ main thread». الـ pixels بتتبعت للـ worker **بالنقل** ([[postMessage(..., [buffer])]]) وبترجع بالنقل، ونقطة خضرا بتتحرك كل frame بـ [[requestAnimationFrame]] عشان تشوف بعينك إن الصفحة مش متجمدة. وتحت سطر بيكتب الوقت وعدد الـ frames اللي اترسمت وانت مستني، وحجم الـ buffer عندك بعد ما اتنقل. الـ worker معمول من [[Blob]] عشان الصفحة ملف واحد. من دروس «Web Workers و worker_threads» و «TypedArray: العيلة» ([[Uint8ClampedArray]]).`, done: R`الـ blur في الـ Worker بياخد حوالي نص ثانية والصفحة بترسم عشرات الـ frames وهي مستنية، وعلى الـ main thread نفس الوقت تقريبًا بس صفر frames، والنتيجة pixel بـ pixel واحدة في الطريقتين، والسطر بيقول إن الـ buffer عندك بقى ٠ byte.`, sol: R`## الشكل النهائي

~~~live 640 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>فلتر صور في Worker</title>
<style>
  body { font: 15px/1.6 system-ui, sans-serif; margin: 16px; }
  canvas { width: 100%; max-width: 480px; display: block; border-radius: 8px; }
  .bar { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin: 10px 0; }
  button, select { font: inherit; padding: 4px 10px; }
  #dot { width: 14px; height: 14px; border-radius: 50%; background: #0b6e4f; display: inline-block; }
  output { display: block; font-variant-numeric: tabular-nums; }
</style>
</head>
<body>
<h1>فلتر صور في Worker</h1>
<canvas id="cv" width="800" height="500"></canvas>
<div class="bar">
  <select id="kind" aria-label="الفلتر">
    <option value="gray">رمادي</option>
    <option value="invert">عكس الألوان</option>
    <option value="blur">blur (تقيل)</option>
  </select>
  <button id="inWorker">طبّق في Worker</button>
  <button id="inMain">طبّق على الـ main thread</button>
  <button id="reset">رجّع الصورة</button>
  <span id="dot" aria-hidden="true"></span>
</div>
<output id="log">اختار فلتر ودوس. النقطة الخضرا بتتحرك كل frame: لو وقفت يبقى الصفحة متجمدة.</output>
<script>
// الفلتر نفسه: بيعدّل الـ pixels في مكانها (Uint8ClampedArray بيقف عند 0 و 255)
function apply(px, kind, w, h) {
  if (kind === 'gray') {
    for (let i = 0; i < px.length; i += 4) px[i] = px[i + 1] = px[i + 2] = 0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2];
  } else if (kind === 'invert') {
    for (let i = 0; i < px.length; i += 4) { px[i] = 255 - px[i]; px[i + 1] = 255 - px[i + 1]; px[i + 2] = 255 - px[i + 2]; }
  } else {
    const src = px.slice(), r = 6;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      let R = 0, G = 0, B = 0, n = 0;
      for (let dy = -r; dy <= r; dy++) {
        const yy = y + dy;
        if (yy < 0 || yy >= h) continue;
        for (let dx = -r; dx <= r; dx++) {
          const xx = x + dx;
          if (xx < 0 || xx >= w) continue;
          const j = (yy * w + xx) * 4;
          R += src[j]; G += src[j + 1]; B += src[j + 2]; n++;
        }
      }
      const i = (y * w + x) * 4;
      px[i] = R / n; px[i + 1] = G / n; px[i + 2] = B / n;
    }
  }
}
// اللي بيشتغل جوه الـ worker: بياخد الـ buffer، يطبّق، ويرجّعه بالنقل
function onWorkerMessage(e) {
  const { buffer, kind, w, h } = e.data;
  const t = performance.now();
  apply(new Uint8ClampedArray(buffer), kind, w, h);
  self.postMessage({ buffer, ms: performance.now() - t }, [buffer]);
}
const cv = document.getElementById('cv'), ctx = cv.getContext('2d', { willReadFrequently: true });
const log = document.getElementById('log'), dot = document.getElementById('dot');
function draw() {
  const g = ctx.createLinearGradient(0, 0, cv.width, cv.height);
  g.addColorStop(0, '#f4a261'); g.addColorStop(0.5, '#2a9d8f'); g.addColorStop(1, '#264653');
  ctx.fillStyle = g; ctx.fillRect(0, 0, cv.width, cv.height);
  for (let i = 0; i < 12; i++) {
    ctx.beginPath(); ctx.arc(60 + i * 62, 250 + Math.sin(i) * 140, 40, 0, Math.PI * 2);
    ctx.fillStyle = 'hsl(' + i * 30 + ' 80% 60%)'; ctx.fill();
  }
  ctx.fillStyle = '#fff'; ctx.font = 'bold 64px system-ui'; ctx.textAlign = 'center'; ctx.fillText('شاي بالنعناع', cv.width / 2, 110);
}
draw();
let frames = 0, x = 0;
(function spin() { frames++; x = (x + 4) % 200; dot.style.transform = 'translateX(' + -x + 'px)'; requestAnimationFrame(spin); })();
const workerCode = apply.toString() + '\nself.onmessage = ' + onWorkerMessage.toString() + ';';
const worker = new Worker(URL.createObjectURL(new Blob([workerCode], { type: 'text/javascript' })));
document.getElementById('inWorker').onclick = () => {
  const img = ctx.getImageData(0, 0, cv.width, cv.height);
  const buffer = img.data.buffer, size = buffer.byteLength, before = frames, t = performance.now();
  worker.onmessage = (e) => {
    ctx.putImageData(new ImageData(new Uint8ClampedArray(e.data.buffer), cv.width, cv.height), 0, 0);
    log.textContent = 'Worker: ' + Math.round(performance.now() - t) + ' ms كلها (الحساب ' + Math.round(e.data.ms) + ' ms)، والصفحة رسمت ' + (frames - before) + ' frame في النص. بعتنا ' + (size / 1e6).toFixed(1) + ' MB بالنقل، والـ buffer عندنا بقى ' + buffer.byteLength + ' byte وهو هناك.';
  };
  worker.postMessage({ buffer, kind: document.getElementById('kind').value, w: cv.width, h: cv.height }, [buffer]);
};
document.getElementById('inMain').onclick = () => {
  const img = ctx.getImageData(0, 0, cv.width, cv.height), before = frames, t = performance.now();
  apply(img.data, document.getElementById('kind').value, cv.width, cv.height);
  ctx.putImageData(img, 0, 0);
  const ms = Math.round(performance.now() - t), during = frames - before;
  log.textContent = 'main thread: ' + ms + ' ms، والصفحة رسمت ' + during + ' frame وهو شغال (متجمدة).';
};
document.getElementById('reset').onclick = () => { draw(); log.textContent = 'رجعت الصورة الأصلية.'; };
</script>
</body>
</html>
~~~

**هتشوف إيه:** اختار «blur (تقيل)» ودوس «طبّق في Worker»: النقطة الخضرا بتفضل تتحرك والصورة بتتغبّش بعد شوية. وبعدين «رجّع الصورة» ثم «طبّق على الـ main thread»: النقطة **بتقف** لحد ما الحساب يخلص، والزراير مبتردش.

## الشرح

- **[[apply(px, kind, w, h)]]** بتعدّل الـ pixels في مكانها. [[px]] هو [[Uint8ClampedArray]]: ٤ bytes لكل pixel (أحمر وأخضر وأزرق وشفافية)، فالـ loop بيمشي [[i += 4]] وبيسيب الشفافية. والـ clamped بيقف عند 0 و 255 لوحده.
- **الرمادي:** [[0.299 R + 0.587 G + 0.114 B]]: العين حساسة للأخضر أكتر، فده بيطلع رمادي «طبيعي» أحسن من المتوسط العادي.
- **الـ blur:** متوسط مربع ١٣ × ١٣ حوالين كل pixel من نسخة [[px.slice()]] (لازم نسخة: لو قرينا من نفس الـ array اللي بنكتب فيه، الـ pixels اللي اتغبشت هتدخل في حساب جيرانها). حوالي ٤٠٠ ألف pixel × ١٦٩ جار = ٦٨ مليون قراية: كفاية يجمّد الصفحة نص ثانية.
- **الـ worker من نفس الكود:** [[apply.toString()]] بيرجّع نص الدالة، فبنجمعه مع [[onWorkerMessage]] في نص واحد ونعمل منه [[Blob]] و [[URL.createObjectURL]] و [[new Worker]]. كده الدالة مكتوبة مرة واحدة وبتشتغل في المكانين. (في مشروع حقيقي: ملف [[worker.js]] و [[type: 'module']] و [[import]].)
- **النقل رايح جاي:** [[postMessage({ buffer, ... }, [buffer])]]، والـ worker بيرد بـ [[postMessage({ buffer, ms }, [buffer])]]. ولا مرة اتنسخت الـ ١.٦ MB، وبعد الإرسال [[buffer.byteLength]] عندنا صفر (السطر بيطبعه).
- **[[new ImageData(new Uint8ClampedArray(e.data.buffer), w, h)]]:** بنلف الـ buffer اللي رجع في [[ImageData]] ونرسمه بـ [[putImageData]].
- **[[getContext('2d', { willReadFrequently: true })]]:** من غيرها Chrome طلّع warning في الـ console بيبدأ بـ «Canvas2D: Multiple readback operations» (اتشاف وأنا بجرّب [[getImageData]] في iframe)، لأن القراية الكتير من canvas على الـ GPU بطيئة، والـ option بيخليه يحتفظ بالـ pixels في الذاكرة العادية.
- **عدّاد الـ frames:** [[spin]] بيتنادى كل frame ويزوّد [[frames]]. الفرق قبل وبعد = عدد الـ frames اللي الصفحة لحقت ترسمها.

## غلطات وقعت فيها وأنا ببنيها

- أول نسخة الفلتر كان رمادي وعكس و«تفتيح» بيتكرروا ٢٥ مرة عشان يبقوا تقال: طلعوا ٢٨ ms بس (مش كفاية تبان الفرق)، و«التفتيح» كان بيزوّد [[40 / 25 = 1.6]] كل مرة، و [[Uint8ClampedArray]] بيقرّب لأقرب صحيح فالتفتيح كان بيضيع جزء. استبدلته بـ blur: تقيل بطبيعته ومنطقي.
- عدّاد الـ main thread كان بيقرا [[frames]] جوه [[requestAnimationFrame]] بعد الحساب، فكان بيطلع ١ مش صفر (الـ frame اللي بعد الحساب نفسه). اتصلّح: بنقرا الفرق **على طول** بعد [[apply]].
- النص على الـ canvas كان مقصوص من الشمال: الصفحة [[dir="rtl"]] فالـ canvas بيرسم النص من اليمين للشمال من نقطة [[x]]. الحل [[ctx.textAlign = 'center']] في نص العرض.
- كنت عامل الـ worker بـ [[new Function]] و regex بيقص الدالة من [[<script>]]: شغال بس هش ومش مقروء. [[apply.toString()]] أوضح.

## اتقاس (Chrome 157)

~~~text blur على 800 × 500
Worker: 510 ms كلها (الحساب 508 ms)، والصفحة رسمت 31 frame في النص. بعتنا 1.6 MB بالنقل، والـ buffer عندنا بقى 0 byte وهو هناك.
main thread: 487 ms، والصفحة رسمت 0 frame وهو شغال (متجمدة).
نفس النتيجة في الطريقتين: pixel (400, 250) = 43,157,143,255
~~~

- الحساب نفسه نفس الوقت تقريبًا (الـ worker مش أسرع)، **الفرق إن الصفحة عايشة**: ٣١ frame مقابل صفر.
- اتجرّب كمان جوه iframe معزول ([[sandbox="allow-scripts allow-forms"]]) زي بتاع الموقع: الـ worker من [[Blob]] اشتغل عادي، والرمادي طلّع «Worker: 10 ms كلها (الحساب 5 ms)». (والـ origin جوه iframe زي ده [[null]]، والـ [[blob:]] URL بيشتغل معاه.)` },
        { lvl: 'كبير', t: R`binspect: مفتش ملفات binary (PNG و WAV و ZIP) باختبارات`, what: R`أداة سطر أوامر [[node cli.mjs <file...> [--json] ]] بتعرف نوع كل ملف من الـ magic bytes (مش الامتداد) وتقرا جواه بـ [[DataView]] من غير أي مكتبة:
• **PNG:** العرض والطول وعمق اللون، وكل الـ chunks، و **CRC32** كل chunk محسوب بإيدك بـ [[Uint32Array]] ومقارن باللي في الملف (فبتمسك الصورة البايظة).
• **WAV:** بتلف على الـ chunks (وتتخطى [[LIST]] وغيره)، وتطلّع الـ rate والـ bits والقنوات والمدة.
• **ZIP:** بتدوّر على «End of Central Directory» من آخر الملف، وتقرا الـ central directory: اسم كل ملف (والعربي UTF-8) وحجمه وطريقة الضغط والـ CRC.
• أي نوع تاني: الحجم وأول ١٦ byte.
الملف المقطوع بيرمي [[BinError]] فيها مكان الـ byte اللي وقفت عنده، والأداة بتكمّل على باقي الملفات وتخرج بـ exit code 1 لو فيه واحد فشل. ومعاها [[fixtures.mjs]] بيعمل ملفات حقيقية في الذاكرة، و ١٠ اختبارات بـ [[node --test]]. من الوحدة كلها، ودرس «DataView» بالذات.`, done: R`[[node --test]] بيعدّي الـ ١٠، و [[node make-samples.mjs]] ثم [[node cli.mjs samples/*]] بيطلّع الـ ٧ ملفات: PNG سليم، و WAV بـ LIST، و ZIP فيه اسم عربي، و PNG فيه CRC غلط في IDAT، و WAV مقطوع بمكانه (byte 68)، ونوع مش معروف، وملف مش موجود، و exit 1. و zip معمول بـ [[tar.exe -a]] في ويندوز بيطلع بالأحجام الحقيقية وطريقة [[deflate]]، و [[--json]] بيطلّع JSON صالح.`, ext: R`زوّد GIF (العرض والطول little-endian في byte ٦ و ٨) و BMP، وخلّي ZIP يتأكد إن كل local header في المكان اللي الـ central directory بيقول عليه، وزوّد [[--extract name]] للملفات الـ stored (والـ deflate بـ [[zlib.inflateRawSync]])، واعمل نسخة صفحة بـ [[<input type=file>]] و [[file.bytes()]] بتعرض نفس التقرير في المتصفح بنفس [[lib.mjs]].`, sol: R`## الشكل النهائي

~~~text الناتج (Node 24.22): node make-samples.mjs ثم node cli.mjs samples/pic.png samples/tone.wav samples/docs.zip samples/broken.png samples/cut.wav samples/notes.txt samples/nope.bin
اتعملت 6 ملفات في samples/
samples/pic.png: PNG 64×40 bit 8 color 2 | chunks: IHDR IDAT IEND | CRC سليم
samples/tone.wav: WAV 8000Hz 16bit 1ch 0.5s | chunks: fmt:16 LIST:16 data:8000
samples/docs.zip: ZIP 3 ملف
  readme.txt          12 byte  stored  crc 9e67d7cc
  data/menu.csv       17 byte  stored  crc 6edc96fc
  ملاحظات.txt         23 byte  stored  crc f71cb11f
samples/broken.png: PNG 8×8 bit 8 color 2 | chunks: IHDR IDAT(CRC غلط) IEND | فيه CRC غلط
samples/cut.wav: ✗ الملف اتقطع وهو بيقرا chunk data (عند byte 68)
samples/notes.txt: نوع مش معروف (9 byte) أوله: 6a 75 73 74 20 74 65 78 74
samples/nope.bin: ✗ الملف مش موجود
~~~

**هتشوف إيه:** سطر لكل ملف بنوعه الحقيقي، وتفاصيل كل نوع، والملفات البايظة متعلّمة بـ ✗ ومكان المشكلة، والأداة مكمّلة لآخر ملف.

## الملفات وترتيب البناء

~~~text الشجرة
binspect/
├─ lib.mjs            ← القراية نفسها: sniff و crc32 و parsePng و parseWav و parseZip و inspect
├─ fixtures.mjs       ← بيعمل PNG و WAV و ZIP حقيقيين في الذاكرة (للاختبارات والتجربة)
├─ cli.mjs            ← سطر الأوامر: بيقرا الملفات ويطبع أو JSON
├─ make-samples.mjs   ← بيكتب ٦ ملفات تجربة في samples/
└─ test/
   └─ binspect.test.mjs
~~~

اتبنت بالترتيب ده: [[crc32]] واختبارها قدام [[zlib.crc32]] الأول (لو غلط كل حاجة بعدها غلط)، وبعدين [[makePng]] و [[parsePng]] مع بعض، وبعدين WAV، وبعدين ZIP، وفي الآخر الـ CLI.

## الكود

~~~js lib.mjs
// lib.mjs: بيقرا header ملفات PNG و WAV و ZIP بـ DataView، من غير أي مكتبة
export class BinError extends Error {
  constructor(message, offset) {
    super(message + (offset === undefined ? '' : ' (عند byte ' + offset + ')'));
    this.name = 'BinError';
    this.offset = offset;
  }
}

const CRC_TABLE = new Uint32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c;
});
export function crc32(bytes) {
  let c = 0xffffffff;
  for (const b of bytes) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

const ascii = (bytes, at, n) => String.fromCharCode(...bytes.subarray(at, at + n));
const need = (bytes, at, n, what) => {
  if (at + n > bytes.length) throw new BinError('الملف اتقطع وهو بيقرا ' + what, at);
};

export function sniff(bytes) {
  const starts = (sig) => sig.every((b, i) => bytes[i] === b);
  if (starts([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return 'png';
  if (starts([0x52, 0x49, 0x46, 0x46]) && ascii(bytes, 8, 4) === 'WAVE') return 'wav';
  if (starts([0x50, 0x4b, 0x03, 0x04]) || starts([0x50, 0x4b, 0x05, 0x06])) return 'zip';
  return 'unknown';
}

export function parsePng(bytes) {
  const v = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const chunks = [];
  let info = null;
  for (let at = 8; at < bytes.length; ) {
    need(bytes, at, 8, 'طول ونوع chunk');
    const length = v.getUint32(at), type = ascii(bytes, at + 4, 4);
    need(bytes, at + 8, length + 4, 'chunk ' + type);
    const crcOk = crc32(bytes.subarray(at + 4, at + 8 + length)) === v.getUint32(at + 8 + length);
    chunks.push({ type, length, crcOk });
    if (type === 'IHDR') info = { width: v.getUint32(at + 8), height: v.getUint32(at + 12), bitDepth: v.getUint8(at + 16), colorType: v.getUint8(at + 17) };
    at += 12 + length;
    if (type === 'IEND') break;
  }
  if (!info) throw new BinError('مفيش IHDR في الـ PNG', 8);
  return { type: 'png', ...info, chunks, crcOk: chunks.every((c) => c.crcOk) };
}

export function parseWav(bytes) {
  const v = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const out = { type: 'wav', chunks: [] };
  for (let at = 12; at + 8 <= bytes.length; ) {
    const id = ascii(bytes, at, 4), size = v.getUint32(at + 4, true);
    need(bytes, at + 8, size, 'chunk ' + id.trim());
    out.chunks.push(id.trim() + ':' + size);
    if (id === 'fmt ') Object.assign(out, { format: v.getUint16(at + 8, true), channels: v.getUint16(at + 10, true), rate: v.getUint32(at + 12, true), bits: v.getUint16(at + 22, true) });
    if (id === 'data') out.dataBytes = size;
    at += 8 + size + (size % 2);
  }
  if (!out.rate || out.dataBytes === undefined) throw new BinError('WAV من غير fmt أو data', 12);
  out.seconds = Number((out.dataBytes / (out.channels * out.bits / 8) / out.rate).toFixed(3));
  return out;
}

export function parseZip(bytes) {
  const v = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let eocd = -1;
  for (let at = bytes.length - 22; at >= Math.max(0, bytes.length - 22 - 0xffff); at--) {
    if (v.getUint32(at, true) === 0x06054b50) { eocd = at; break; }
  }
  if (eocd < 0) throw new BinError('مفيش End of Central Directory: الملف مش zip كامل');
  const count = v.getUint16(eocd + 10, true), dirOffset = v.getUint32(eocd + 16, true);
  const entries = [];
  const utf8 = new TextDecoder();
  for (let i = 0, at = dirOffset; i < count; i++) {
    need(bytes, at, 46, 'central directory');
    if (v.getUint32(at, true) !== 0x02014b50) throw new BinError('توقيع central directory غلط', at);
    const nameLen = v.getUint16(at + 28, true), extraLen = v.getUint16(at + 30, true), commentLen = v.getUint16(at + 32, true);
    need(bytes, at + 46, nameLen, 'اسم ملف');
    const method = v.getUint16(at + 10, true);
    entries.push({
      name: utf8.decode(bytes.subarray(at + 46, at + 46 + nameLen)),
      method: method === 0 ? 'stored' : method === 8 ? 'deflate' : 'other',
      size: v.getUint32(at + 24, true),
      packed: v.getUint32(at + 20, true),
      crc: v.getUint32(at + 16, true).toString(16).padStart(8, '0'),
    });
    at += 46 + nameLen + extraLen + commentLen;
  }
  return { type: 'zip', count, entries };
}

export function inspect(bytes) {
  const kind = sniff(bytes);
  if (kind === 'png') return parsePng(bytes);
  if (kind === 'wav') return parseWav(bytes);
  if (kind === 'zip') return parseZip(bytes);
  return { type: 'unknown', size: bytes.length, head: Array.from(bytes.subarray(0, 16), (b) => b.toString(16).padStart(2, '0')).join(' ') };
}
~~~

~~~js fixtures.mjs
// fixtures.mjs: بيعمل ملفات PNG و WAV و ZIP صغيرة حقيقية في الذاكرة (للاختبارات والتجربة)
import { deflateSync } from 'node:zlib';
import { crc32 } from './lib.mjs';
const enc = new TextEncoder();
function join(parts) {
  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
  let at = 0;
  for (const p of parts) { out.set(p, at); at += p.length; }
  return out;
}
function header(tag, size) {
  const h = new Uint8Array(8);
  enc.encodeInto(tag, h);
  new DataView(h.buffer).setUint32(4, size, true);
  return h;
}

export function makePng(width = 3, height = 2) {
  const chunk = (type, data) => {
    const out = new Uint8Array(12 + data.length), v = new DataView(out.buffer);
    v.setUint32(0, data.length);
    out.set(enc.encode(type), 4);
    out.set(data, 8);
    v.setUint32(8 + data.length, crc32(out.subarray(4, 8 + data.length)));
    return out;
  };
  const ihdr = new Uint8Array(13), h = new DataView(ihdr.buffer);
  h.setUint32(0, width); h.setUint32(4, height); h.setUint8(8, 8); h.setUint8(9, 2);
  const raw = new Uint8Array(height * (1 + width * 3)).fill(120);
  for (let y = 0; y < height; y++) raw[y * (1 + width * 3)] = 0;
  const signature = Uint8Array.of(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a);
  return join([signature, chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw)), chunk('IEND', new Uint8Array(0))]);
}

export function makeWav({ rate = 8000, seconds = 0.25, withList = true } = {}) {
  const n = Math.round(rate * seconds);
  const fmt = new DataView(new ArrayBuffer(16));
  fmt.setUint16(0, 1, true); fmt.setUint16(2, 1, true); fmt.setUint32(4, rate, true);
  fmt.setUint32(8, rate * 2, true); fmt.setUint16(12, 2, true); fmt.setUint16(14, 16, true);
  const samples = new Int16Array(n).map((_, i) => Math.round(Math.sin(i / 3) * 8000));
  const list = enc.encode('INFOINAM' + 'xxxx' + 'Tea!');
  new DataView(list.buffer).setUint32(8, 4, true);
  const parts = [enc.encode('RIFF'), new Uint8Array(4), enc.encode('WAVE'), header('fmt ', 16), new Uint8Array(fmt.buffer)];
  if (withList) parts.push(header('LIST', list.length), list);
  parts.push(header('data', samples.byteLength), new Uint8Array(samples.buffer));
  const all = join(parts);
  new DataView(all.buffer).setUint32(4, all.length - 8, true);
  return all;
}

export function makeZip(files) {
  const locals = [], central = [];
  let offset = 0;
  for (const [name, text] of Object.entries(files)) {
    const nameBytes = enc.encode(name), data = enc.encode(text), crc = crc32(data);
    const lh = new DataView(new ArrayBuffer(30));
    lh.setUint32(0, 0x04034b50, true); lh.setUint16(4, 20, true); lh.setUint16(6, 0x0800, true);
    lh.setUint32(14, crc, true); lh.setUint32(18, data.length, true); lh.setUint32(22, data.length, true);
    lh.setUint16(26, nameBytes.length, true);
    locals.push(new Uint8Array(lh.buffer), nameBytes, data);
    const ch = new DataView(new ArrayBuffer(46));
    ch.setUint32(0, 0x02014b50, true); ch.setUint16(4, 20, true); ch.setUint16(6, 20, true); ch.setUint16(8, 0x0800, true);
    ch.setUint32(16, crc, true); ch.setUint32(20, data.length, true); ch.setUint32(24, data.length, true);
    ch.setUint16(28, nameBytes.length, true); ch.setUint32(42, offset, true);
    central.push(new Uint8Array(ch.buffer), nameBytes);
    offset += 30 + nameBytes.length + data.length;
  }
  const dir = join(central), count = Object.keys(files).length;
  const end = new DataView(new ArrayBuffer(22));
  end.setUint32(0, 0x06054b50, true); end.setUint16(8, count, true); end.setUint16(10, count, true);
  end.setUint32(12, dir.length, true); end.setUint32(16, offset, true);
  return join([...locals, dir, new Uint8Array(end.buffer)]);
}
~~~

~~~js cli.mjs
// cli.mjs: node cli.mjs <file...> [--json]
import { readFileSync } from 'node:fs';
import { inspect } from './lib.mjs';

const args = process.argv.slice(2);
const json = args.includes('--json');
const files = args.filter((a) => a !== '--json');
if (!files.length) {
  console.error('الاستخدام: node cli.mjs <file...> [--json]');
  process.exit(1);
}

function show(file, r) {
  if (r.type === 'png') {
    const chunks = r.chunks.map((c) => c.type + (c.crcOk ? '' : '(CRC غلط)')).join(' ');
    return file + ': PNG ' + r.width + '×' + r.height + ' bit ' + r.bitDepth + ' color ' + r.colorType + ' | chunks: ' + chunks + (r.crcOk ? ' | CRC سليم' : ' | فيه CRC غلط');
  }
  if (r.type === 'wav') return file + ': WAV ' + r.rate + 'Hz ' + r.bits + 'bit ' + r.channels + 'ch ' + r.seconds + 's | chunks: ' + r.chunks.join(' ');
  if (r.type === 'zip') return file + ': ZIP ' + r.count + ' ملف\n' + r.entries.map((e) => '  ' + e.name.padEnd(16) + String(e.size).padStart(6) + ' byte  ' + e.method + '  crc ' + e.crc).join('\n');
  return file + ': نوع مش معروف (' + r.size + ' byte) أوله: ' + r.head;
}

let failed = 0;
const results = [];
for (const file of files) {
  try {
    const r = inspect(readFileSync(file));
    results.push({ file, ...r });
    if (!json) console.log(show(file, r));
  } catch (e) {
    failed++;
    const message = e.code === 'ENOENT' ? 'الملف مش موجود' : e.message;
    results.push({ file, error: message });
    if (!json) console.error(file + ': ✗ ' + message);
  }
}
if (json) console.log(JSON.stringify(results, null, 2));
process.exitCode = failed ? 1 : 0;
~~~

~~~js make-samples.mjs
// make-samples.mjs: بيكتب ملفات تجربة في samples/
import { mkdirSync, writeFileSync } from 'node:fs';
import { makePng, makeWav, makeZip } from './fixtures.mjs';
mkdirSync('samples', { recursive: true });
writeFileSync('samples/pic.png', makePng(64, 40));
writeFileSync('samples/tone.wav', makeWav({ rate: 8000, seconds: 0.5 }));
writeFileSync('samples/docs.zip', makeZip({ 'readme.txt': 'اقراني', 'data/menu.csv': 'tea,10\ncoffee,15\n', 'ملاحظات.txt': 'شاي بالنعناع' }));
const broken = makePng(8, 8);
broken[45] ^= 0xff;
writeFileSync('samples/broken.png', broken);
writeFileSync('samples/cut.wav', makeWav().subarray(0, 70));
writeFileSync('samples/notes.txt', 'just text');
console.log('اتعملت 6 ملفات في samples/');
~~~

~~~js test/binspect.test.mjs
// binspect.test.mjs: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { crc32 as zlibCrc } from 'node:zlib';
import { inspect, crc32, sniff, BinError } from '../lib.mjs';
import { makePng, makeWav, makeZip } from '../fixtures.mjs';

test('crc32 بتاعتنا = بتاعة zlib', () => {
  const data = new TextEncoder().encode('شاي بالنعناع 123');
  assert.equal(crc32(data), zlibCrc(data));
  assert.equal(crc32(new Uint8Array(0)), 0);
});

test('PNG: المقاس والـ chunks والـ CRC', () => {
  const r = inspect(makePng(64, 40));
  assert.deepEqual([r.type, r.width, r.height, r.bitDepth, r.colorType, r.crcOk], ['png', 64, 40, 8, 2, true]);
  assert.deepEqual(r.chunks.map((c) => c.type), ['IHDR', 'IDAT', 'IEND']);
});

test('PNG: byte متغيّر بيتمسك بالـ CRC', () => {
  const bytes = makePng(8, 8);
  bytes[45] ^= 0xff;
  const r = inspect(bytes);
  assert.equal(r.crcOk, false);
  assert.equal(r.chunks.find((c) => !c.crcOk).type, 'IDAT');
});

test('PNG مقطوع بيرمي BinError فيها المكان', () => {
  assert.throws(() => inspect(makePng().subarray(0, 30)), (e) => e instanceof BinError && e.offset === 16 && /chunk IHDR/.test(e.message));
});

test('WAV: بيتخطى LIST ويحسب المدة', () => {
  const r = inspect(makeWav({ rate: 8000, seconds: 0.5 }));
  assert.deepEqual([r.rate, r.bits, r.channels, r.seconds], [8000, 16, 1, 0.5]);
  assert.deepEqual(r.chunks, ['fmt:16', 'LIST:16', 'data:8000']);
  assert.deepEqual(inspect(makeWav({ withList: false })).chunks, ['fmt:16', 'data:4000']);
});

test('WAV مقطوع في نص الـ data', () => {
  assert.throws(() => inspect(makeWav().subarray(0, 70)), /اتقطع وهو بيقرا chunk data \(عند byte 68\)/);
});

test('ZIP: الأسامي (والعربي) والأحجام', () => {
  const r = inspect(makeZip({ 'a.txt': 'hi', 'ملاحظات.txt': 'شاي' }));
  assert.equal(r.count, 2);
  assert.deepEqual(r.entries.map((e) => [e.name, e.size, e.method]), [['a.txt', 2, 'stored'], ['ملاحظات.txt', 6, 'stored']]);
});

test('ZIP من غير نهاية بيرمي', () => {
  const zip = makeZip({ 'a.txt': 'hi' });
  assert.throws(() => inspect(zip.subarray(0, zip.length - 10)), /End of Central Directory/);
});

test('bytes جوه buffer أكبر (offset) بتتقري صح', () => {
  const png = makePng(5, 7), big = new Uint8Array(png.length + 100);
  big.set(png, 100);
  const r = inspect(big.subarray(100));
  assert.deepEqual([r.width, r.height, r.crcOk], [5, 7, true]);
});

test('نوع مش معروف وملف فاضي', () => {
  assert.equal(sniff(new Uint8Array(0)), 'unknown');
  assert.deepEqual(inspect(new TextEncoder().encode('hi')), { type: 'unknown', size: 2, head: '68 69' });
});
~~~

## الشرح

- **[[crc32]]:** الجدول [[CRC_TABLE]] [[Uint32Array]] فيه ٢٥٦ قيمة محسوبة مرة واحدة (polynomial [[0xedb88320]] بتاع PNG و ZIP)، وبعدين كل byte = lookup و XOR و shift. و [[>>> 0]] في الآخر بيخلّي الناتج unsigned (من غيره XOR بيرجّع رقم سالب لأن العمليات دي ٣٢ bit بإشارة، درس «bitwise و shifts»).
- **[[need(bytes, at, n, what)]]:** قبل أي قراية بنتأكد إن الـ bytes موجودة، فالملف المقطوع بيطلّع [[BinError]] فيها **إيه** اللي كنا بنقراه و **فين**، بدل [[RangeError: Offset is outside the bounds of the DataView]] اللي مبيقولش حاجة.
- **[[parsePng]]:** بيلف على الـ chunks: طول (big-endian) ونوع (٤ حروف) وداتا و CRC. الـ CRC محسوب على النوع + الداتا (مش الطول)، ده من المواصفة.
- **[[parseWav]]:** نفس الـ loop بس little-endian، و [[size % 2]] لأن RIFF بيكمّل أي chunk فردي بـ byte. والـ [[fixtures]] فيها chunk [[LIST]] بين [[fmt]] و [[data]] بقصد: الأداة اللي بتفترض إن [[data]] عند ٣٦ بتقع هنا (زي [[wav-stats]] في درس «DataView»).
- **[[parseZip]]:** الـ ZIP بيتقري **من الآخر**: آخر ٢٢ byte (أو أكتر لو فيه comment لحد ٦٥٥٣٥) فيهم «End of Central Directory» بتوقيع [[0x06054b50]]، وفيه عدد الملفات ومكان الـ central directory. كل entry هناك توقيعه [[0x02014b50]] وفيه الأحجام والـ CRC والاسم. والأسماء بـ [[TextDecoder]] لأن الـ fixture بيحط bit الـ UTF-8 ([[0x0800]]).
- **[[DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)]] في كل parser:** الاختبار «bytes جوه buffer أكبر» بيحط الـ PNG عند offset ١٠٠ في buffer أكبر؛ من غير الـ offset كان الـ parser هيقرا من أول الـ buffer الغلط. وده نفس فخ الـ pool بتاع Node.
- **الـ CLI:** [[try]] حوالين كل ملف لوحده، فملف بايظ مبيوقفش الباقي، و [[process.exitCode]] بيبقى ١ لو فيه فشل (عشان سكربت أو CI يعرف).

## غلطات وقعت فيها وأنا ببنيها

- **[[broken.png]] الأول:** قلبت byte رقم ٤٠ عشان أبوّظ الـ CRC، وطلع اسم الـ chunk [[IDA«]]: الـ byte ده كان آخر حرف من النوع [[IDAT]] مش الداتا. الـ IDAT بيبدأ عند ٣٣ (٨ توقيع + ٢٥ للـ IHDR)، فالداتا من ٤١. قلبت ٤٥ بدلها.
- **[[cut.wav]] الأول** اتقص عند ٦٠، وطلع «WAV من غير fmt أو data» مش «اتقطع»: لأن ٦٠ وقعت بالظبط في آخر الـ [[LIST]] chunk، فالـ loop خلص من غير ما يشوف [[data]] خالص. قصّيته عند ٧٠ عشان يقع في نص [[data]] ويختبر رسالة القطع.
- **اختبار الـ PNG المقطوع** كان مستني [[offset === 8]] ووقع: الأداة قالت [[16]]. هي صح: الطول والنوع (٨ bytes) اتقروا، والقطع حصل وهي بتقرا داتا الـ [[IHDR]] اللي بتبدأ عند ١٦. صلّحت الاختبار مش الكود.
- **تأكدت من الـ ZIP بأداة تانية:** [[tar.exe]] بتاع ويندوز (bsdtar) قرا الـ zip اللي احنا عاملينه وطلّع الـ ٣ أسامي (والعربي) والأحجام، وطلّع محتوى [[data/menu.csv]] صح. و [[tar]] بتاع Git Bash (GNU) قال [[This does not look like a tar archive]]: مبيقراش zip أصلًا.

## اتقاس

~~~text node --test (Node 24.22)
✔ crc32 بتاعتنا = بتاعة zlib (1.939ms)
✔ PNG: المقاس والـ chunks والـ CRC (2.3931ms)
✔ PNG: byte متغيّر بيتمسك بالـ CRC (0.6276ms)
✔ PNG مقطوع بيرمي BinError فيها المكان (0.9233ms)
✔ WAV: بيتخطى LIST ويحسب المدة (3.2946ms)
✔ WAV مقطوع في نص الـ data (0.5696ms)
✔ ZIP: الأسامي (والعربي) والأحجام (0.8193ms)
✔ ZIP من غير نهاية بيرمي (0.3799ms)
✔ bytes جوه buffer أكبر (offset) بتتقري صح (1.0797ms)
✔ نوع مش معروف وملف فاضي (0.8897ms)
ℹ tests 10
ℹ pass 10
ℹ fail 0
~~~

~~~text zip حقيقي من ويندوز: tar.exe -a -c -f samples/real.zip lib.mjs cli.mjs fixtures.mjs ثم node cli.mjs samples/real.zip
samples/real.zip: ZIP 3 ملف
  lib.mjs           4700 byte  deflate  crc b56347c5
  cli.mjs           1646 byte  deflate  crc 9d4e10a1
  fixtures.mjs      3742 byte  deflate  crc fc1e52d0
~~~

الأحجام طابقت [[ls -la]] بالظبط (٤٧٠٠ و ١٦٤٦ و ٣٧٤٢)، يعني الأداة بتقرا zip عمله برنامج تاني (بضغط [[deflate]]) مش بس اللي احنا عاملينه.

~~~text node cli.mjs samples/pic.png samples/cut.wav --json (أوله)
[
  {
    "file": "samples/pic.png",
    "type": "png",
    "width": 64,
    "height": 40,
    "bitDepth": 8,
    "colorType": 2,
~~~

وآخره [[{ "file": "samples/cut.wav", "error": "الملف اتقطع وهو بيقرا chunk data (عند byte 68)" }]].` },
        { lvl: 'فكرة', t: R`صمّم format binary بتاعك`, what: R`اختار داتا بتتخزن أو بتتبعت كتير في مشروع بتحبه (منيو كافيه، أو قراءات حساسات، أو حفظ لعبة، أو جهات اتصال)، وصمّم لها صيغة binary: توقيع (magic) يعرّف الملف، ورقم نسخة، وعدد السجلات، وكل سجل بأنواع أرقام محددة وترتيب bytes محدد، والنصوص UTF-8 بطولها قبلها. اكتب [[encode]] و [[decode]] بـ [[DataView]]، والـ decode بيرفض التوقيع الغلط والنسخة اللي مش مدعومة والملف المقطوع برسايل واضحة. وقارن الحجم بـ JSON لنفس الداتا. من الوحدة كلها.`, done: R`عندك وصف الـ format في تعليق فوق الملف (كل حقل وحجمه ونوعه والترتيب)، و [[decode(encode(x))]] بيرجّع نفس الداتا بالظبط، والحجم مقارن بـ JSON برقم، و ٣ أنواع ملفات غلط بتترفض برسالة.`, ext: R`زوّد ضغط ([[CompressionStream('gzip')]] في المتصفح أو [[zlib]]) وقارن الأربعة (JSON و JSON مضغوط و binary و binary مضغوط)، وغيّر النسخة لـ ٢ بحقل جديد وخلّي الـ decoder يقرا النسختين، وزوّد CRC32 في الآخر يمسك الملف البايظ، واقرا الملف في صفحة بـ [[<input type=file>]].`, sol: R`**نسخة نموذجية:** منيو كافيه بألف صنف. اخترت المنيو لأنه داتا حقيقية بتتبعت لكل زبون يفتح التطبيق، فالحجم بيفرق على نت ضعيف، وفيه أرقام (سعر ومخزون) ونصوص عربي (أسامي)، فبيجرّب كل حاجة في الوحدة.

## الشكل النهائي

~~~text الناتج (Node 24.22): node menubin.mjs
binary: 30401 byte | JSON: 65164 byte | النسبة: 47%
رجعت زي ما هي: true { id: 1001, price: 1750, stock: 7, name: 'قهوة تركي 2' }
TypeError: مش ملف منيو (التوقيع MNU مش موجود)
TypeError: نسخة 9 مش مدعومة، المدعوم 1
RangeError: الملف اتقطع عند الصنف رقم 2
~~~

## الكود

~~~js menubin.mjs
// menubin.mjs: صيغة binary بتاعتنا لمنيو كافيه، وقارنها بـ JSON
// الشكل (little-endian):
//   header: 'MNU' + version(u8) | count(u32)
//   كل صنف: id(u32) | price بالقرش(u32) | stock(u16) | nameLength(u16) | name (UTF-8)
const MAGIC = [0x4d, 0x4e, 0x55], VERSION = 1;
const enc = new TextEncoder(), dec = new TextDecoder('utf-8', { fatal: true });

export function encodeMenu(items) {
  const names = items.map((it) => enc.encode(it.name));
  const size = 8 + names.reduce((n, b) => n + 12 + b.length, 0);
  const out = new Uint8Array(size), v = new DataView(out.buffer);
  out.set(MAGIC, 0); v.setUint8(3, VERSION); v.setUint32(4, items.length, true);
  let at = 8;
  items.forEach((it, i) => {
    if (!Number.isInteger(it.price) || it.price < 0) throw new RangeError('السعر بالقرش رقم صحيح موجب: ' + it.name);
    if (names[i].length > 0xffff) throw new RangeError('الاسم أطول من 65535 byte');
    v.setUint32(at, it.id, true); v.setUint32(at + 4, it.price, true);
    v.setUint16(at + 8, it.stock, true); v.setUint16(at + 10, names[i].length, true);
    out.set(names[i], at + 12);
    at += 12 + names[i].length;
  });
  return out;
}

export function decodeMenu(bytes) {
  const v = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  if (bytes.length < 8 || MAGIC.some((b, i) => bytes[i] !== b)) throw new TypeError('مش ملف منيو (التوقيع MNU مش موجود)');
  if (bytes[3] !== VERSION) throw new TypeError('نسخة ' + bytes[3] + ' مش مدعومة، المدعوم ' + VERSION);
  const count = v.getUint32(4, true), items = [];
  let at = 8;
  for (let i = 0; i < count; i++) {
    if (at + 12 > bytes.length) throw new RangeError('الملف اتقطع عند الصنف رقم ' + (i + 1));
    const len = v.getUint16(at + 10, true);
    if (at + 12 + len > bytes.length) throw new RangeError('اسم الصنف رقم ' + (i + 1) + ' مقطوع');
    items.push({ id: v.getUint32(at, true), price: v.getUint32(at + 4, true), stock: v.getUint16(at + 8, true), name: dec.decode(bytes.subarray(at + 12, at + 12 + len)) });
    at += 12 + len;
  }
  return items;
}

const menu = Array.from({ length: 1000 }, (_, i) => ({ id: 1000 + i, price: 1500 + (i % 40) * 250, stock: (i * 7) % 300, name: ['شاي', 'قهوة تركي', 'كابتشينو', 'عصير مانجا'][i % 4] + ' ' + (i + 1) }));
const bin = encodeMenu(menu), json = enc.encode(JSON.stringify(menu));
const back = decodeMenu(bin);
console.log('binary:', bin.length, 'byte | JSON:', json.length, 'byte | النسبة:', (bin.length / json.length * 100).toFixed(0) + '%');
console.log('رجعت زي ما هي:', JSON.stringify(back) === JSON.stringify(menu), back[1]);
for (const bad of [enc.encode('{"x":1}'), Uint8Array.of(0x4d, 0x4e, 0x55, 9, 0, 0, 0, 0), bin.subarray(0, 30)]) {
  try { decodeMenu(bad); } catch (e) { console.log(e.name + ': ' + e.message); }
}
~~~

## ليه التصميم ده

| القرار | ليه |
|---|---|
| توقيع [[MNU]] + نسخة في أول ٤ bytes | أي برنامج يعرف الملف من أوله زي PNG، والنسخة بتسمح تغيّر الشكل بعدين من غير ما الملفات القديمة تبوظ |
| العدد [[u32]] في الـ header | الـ decoder يعرف هيقرا كام سجل ويكتشف الملف المقطوع |
| السعر بالقرش [[u32]] مش [[Float32]] | الفلوس مبتتخزنش عشري: [[Float32Array.of(17.15)[0] ]] بيطلع [[17.149999618530273]] (اتجرّب، درس «TypedArray: العيلة») |
| المخزون [[u16]] | لحد ٦٥٥٣٥، كفاية لكافيه، وبيوفّر byteين عن [[u32]] في كل صنف |
| طول الاسم [[u16]] قبله | النص طوله متغيّر، فلازم تعرف تقرا كام byte. والطول بالـ bytes مش بالحروف (العربي ٢ byte للحرف) |
| little-endian | نفس ترتيب أجهزة x86 و ARM، فالقراية من غير قلب (اختيار، مش إجبار) |
| [[TextDecoder]] بـ [[fatal: true]] | اسم بايظ يرمي بدل ما يطلع [[�]] ساكت |

- **الحجم:** ٤٧٪ من JSON. الـ JSON بيكرر أسامي المفاتيح ([["price":]]) في كل صنف وبيكتب الأرقام حروف، والـ binary مكان ثابت ورقم في ٢ أو ٤ bytes.
- **التمن:** الملف مبيتقريش بالعين، ولازم الـ encoder والـ decoder يتفقوا على الشكل بالحرف، وأي تغيير محتاج نسخة جديدة. عشان كده الـ binary للداتا الكبيرة أو اللي بتتبعت كتير، و JSON لأي حاجة تانية. وفيه formats جاهزة بنفس الفكرة لو مش عايز تصمم بنفسك: MessagePack و Protocol Buffers و CBOR.

## غلطة وقعت فيها

- جرّبت أحسب الحجم بـ [[it.name.length]] (عدد الحروف) بدل bytes الاسم: الـ buffer طلع أصغر من اللازم و [[out.set]] رمى [[RangeError: offset is out of bounds]] (اتجرّب)، لأن كل حرف عربي ٢ bytes. الحل: [[TextEncoder]] لكل الأسامي **قبل** ما تحسب الحجم ([[names]] في الكود)، وبعدين نفس الـ bytes تتكتب.` },
      ],
      items: [
        {
          cmd: "البيانات الثنائية: bytes و typed arrays",
          title: "يعني إيه binary data، وليه JavaScript محتاجة ArrayBuffer و typed arrays؟",
          desc: R`أي حاجة في الكمبيوتر (نص، صورة، صوت، ملف zip، رد من الشبكة، ذاكرة wasm) هي في الآخر **bytes**: أرقام من 0 لـ 255 ورا بعض. والـ Array العادية في JavaScript مش معمولة لكده، فاللغة فيها طريقة مخصوص: [[ArrayBuffer]] (حتة ذاكرة خام بطول ثابت) و **typed arrays** (عينين بتقرا الذاكرة دي كأرقام من نوع واحد، زي [[Uint8Array]] و [[Float64Array]]).

• [[readFileSync]] في Node بيرجّع [[Buffer]]، وده [[Uint8Array]] متزوّد.
• في المتصفح: [[await res.arrayBuffer()]] و [[await file.bytes()]] و [[ctx.getImageData().data]] كلهم bytes.
• نفس الـ bytes ممكن تتقري بأكتر من شكل: ٨ bytes = رقم [[Float64]] واحد، أو ٨ أرقام [[Uint8]].

الدرس ده الخريطة: إيه هي الـ bytes، وإزاي تشوفها بالـ hex، والفرق بين الـ buffer والـ view، وتقابلها فين. والدروس اللي بعده بتشرح كل حتة بالتفصيل.`,
          example: R`// bytes.mjs: النص والرقم كلهم في الآخر bytes
import { writeFileSync, readFileSync } from 'node:fs';
writeFileSync('hello.txt', 'Hi مصر');
const bytes = readFileSync('hello.txt');
console.log(bytes.length, 'Hi مصر'.length, bytes instanceof Uint8Array);
console.log([...bytes].map((b) => b.toString(16).padStart(2, '0')).join(' '));
const buf = new ArrayBuffer(8);
const asBytes = new Uint8Array(buf);
const asNumber = new Float64Array(buf);
asNumber[0] = 1.5;
console.log(asBytes, asNumber);
console.log(new TextDecoder().decode(bytes.subarray(3)));`,
          try: R`اعمل ملف فيه [[Hi مصر]] وشغّل المثال. وبعدين غيّر النص لـ [[😀]] بس، واتوقّع قبل ما تشغّل: [[bytes.length]] كام، و [['😀'.length]] كام؟ وبعدين اكتب [[asNumber[0] = -1.5]] وشوف أنهي byte بس اللي اتغيّر.`,
          sol: R`~~~text الناتج (Node 24.22، ملف فيه 😀 بس)
4 2 true
f0 9f 98 80
~~~

~~~text الناتج بعد asNumber[0] = -1.5
Uint8Array(8) [
    0, 0,   0,   0,
    0, 0, 248, 191
] Float64Array(1) [ -1.5 ]
~~~

- الإيموجي ٤ bytes في UTF-8، و [[length]] بتاعه ٢ لأن JavaScript بتعد بوحدات UTF-16 (درس «string و UTF-16»). يعني [[length]] بتاع النص **عمره ما** يقولك حجمه على الديسك أو في الشبكة.
- [[1.5]] و [[-1.5]] بيفرقوا في byte واحد بس: الأخير [[63]] بقى [[191]]. الفرق ١٢٨ = أعلى bit في الـ byte، وده bit الإشارة في الـ [[Float64]] (أول bit في الرقم كله، ومتخزن في آخر byte لأن الجهاز little-endian، وده متشرح في درس «TypedArray: العيلة»).`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** لكل نص، اكتب [[length]] وعدد الـ bytes بتاعه في UTF-8 قبل ما تشغّل:

~~~js
const enc = new TextEncoder();
for (const s of ['abc', 'مصر', '😀', 'é']) console.log(JSON.stringify(s), s.length, enc.encode(s).length);
~~~`, done: R`كتبت الأربع سطور وطلعوا زي ما كتبت، وتقدر تقول القاعدة: الحرف الإنجليزي byte، والعربي ٢، والإيموجي ٤.`, sol: R`~~~text الناتج (Node 24.22)
"abc" 3 3
"مصر" 3 6
"😀" 2 4
"é" 1 2
~~~

- [[new TextEncoder().encode(s)]] بيحوّل النص لـ bytes بـ UTF-8 ويرجّع [[Uint8Array]]، و [[.length]] بتاعها = عدد الـ bytes (لأن كل عنصر byte).
- UTF-8 بيستخدم ١ byte للحروف الإنجليزي والأرقام (ASCII)، و ٢ للعربي والحروف اللاتيني اللي عليها علامات زي [[é]]، و ٣ لحروف تانية كتير (صيني مثلًا)، و ٤ للإيموجي.
- [[s.length]] حاجة تانية خالص: عدد وحدات UTF-16. الإيموجي وحدتين (surrogate pair)، والعربي وحدة لكل حرف.
- **الغلطة:** تحسب حجم رسالة أو حد أقصى لعمود في قاعدة بيانات بـ [[length]]. «مصر» ٣ حروف بس ٦ bytes.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[toHex(bytes)]] بتاخد [[Uint8Array]] وترجّع نص hex، كل byte رقمين وبينهم مسافة. جرّبها على [[Uint8Array.of(0, 15, 255)]] وعلى bytes النص [[%PDF-1.7]].`, done: R`[[toHex(Uint8Array.of(0, 15, 255))]] بترجّع [['00 0f ff']] بالظبط (الصفر من قدام موجود)، و [[%PDF-1.7]] بيطلع [[25 50 44 46 2d 31 2e 37]].`, sol: R`~~~js hex.mjs
const toHex = (bytes) => Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join(' ');
console.log(toHex(Uint8Array.of(0, 15, 255)));
console.log(toHex(new TextEncoder().encode('%PDF-1.7')));
~~~

~~~text الناتج (Node 24.22)
00 0f ff
25 50 44 46 2d 31 2e 37
~~~

- [[Array.from(bytes, fn)]] بيعمل Array عادية من الـ typed array وبيطبّق [[fn]] على كل عنصر في نفس الخطوة. ليه مش [[bytes.map]]؟ لأن [[map]] على [[Uint8Array]] بترجّع [[Uint8Array]] تاني، والنصوص اللي بترجّعها بتتحوّل أرقام: اتجرّب [[Uint8Array.of(1, 2).map((x) => 'a' + x)]] طلّع [[Uint8Array(2) [ 0, 0 ] ]]. الفخ ده متشرح في درس «TypedArray: set و subarray».
- [[b.toString(16)]] بيكتب الرقم بالـ hex (أساس ١٦: من 0 لـ 9 وبعدين a لـ f). و [[padStart(2, '0')]] بيزوّد صفر لو الرقم أقل من ١٦، فـ ١٥ بتبقى [[0f]] مش [[f]]. من غيرها الأعمدة بتبوظ ومتعرفش فين byte بيخلص.
- في Chrome (وفي Node بـ flag) فيه [[bytes.toHex()]] جاهزة بس من غير مسافات: درس «Uint8Array: fromBase64 و toHex».` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[sniff(bytes)]] بتعرف نوع الملف من أول bytes فيه (الـ «magic number»)، مش من الامتداد: PNG بيبدأ بـ [[89 50 4E 47 0D 0A 1A 0A]]، و PDF بـ [[25 50 44 46]] ([[%PDF]])، و ZIP بـ [[50 4B 03 04]] ([[PK]])، و GIF بـ [[47 49 46 38]]، و JPEG بـ [[FF D8 FF]]. ترجّع [['png']] أو [['pdf']] أو [['zip']] أو [['gif']] أو [['jpeg']] أو [['unknown']]. لازم تشتغل على ملف أقصر من التوقيع ومتقعش.`, done: R`الـ ٤ حالات بتاعة الحل بيطلعوا [[pdf zip unknown unknown]]، والتمرين اللي بيتصحح لوحده عدّى.`, sol: R`~~~js sniff.mjs
function sniff(bytes) {
  const starts = (sig) => sig.every((b, i) => bytes[i] === b);
  if (starts([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return 'png';
  if (starts([0x25, 0x50, 0x44, 0x46])) return 'pdf';
  if (starts([0x50, 0x4b, 0x03, 0x04])) return 'zip';
  if (starts([0x47, 0x49, 0x46, 0x38])) return 'gif';
  if (starts([0xff, 0xd8, 0xff])) return 'jpeg';
  return 'unknown';
}
console.log(sniff(new TextEncoder().encode('%PDF-1.7')), sniff(Uint8Array.of(0x50, 0x4b, 3, 4, 20)), sniff(Uint8Array.of(0x89, 0x50)), sniff(new Uint8Array(0)));
~~~

~~~text الناتج (Node 24.22)
pdf zip unknown unknown
~~~

- [[0x89]] رقم مكتوب بالـ hex في الكود (= ١٣٧)، فالتوقيع بيتكتب زي ما هو في المواصفة من غير تحويل.
- [[starts(sig)]] بتقارن كل byte في التوقيع باللي في نفس المكان في الملف. لو الملف أقصر، [[ bytes[i] ]] برّه الطول بترجّع [[undefined]] (مفيش error في الـ typed arrays)، و [[undefined === 0x47]] بـ [[false]]، فبترجّع [['unknown']] من غير ما تقع.
- **ليه مش الامتداد؟** حد ممكن يسمّي ملف [[virus.exe]] باسم [[photo.png]]. السيرفرات اللي بتستقبل رفع ملفات بتعمل الفحص ده بالظبط قبل ما تصدّق الامتداد.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الكود ده بيبعت bytes لسيرفر في JSON، والسيرفر بيقول إن اللي وصله مش array. شغّله وشوف بيطلع إيه، وصلّح الإرسال والاستقبال:

~~~js
const bytes = new Uint8Array([1, 2]);
const body = JSON.stringify({ bytes });
console.log(body);
const back = new Uint8Array(JSON.parse(body).bytes);
console.log(back);
~~~`, done: R`الـ JSON بقى [[{"bytes":[1,2]}]]، والاستقبال بيرجّع [[Uint8Array(2) [ 1, 2 ] ]] مش array فاضية.`, sol: R`~~~text الناتج قبل التصليح (Node 24.22)
{"bytes":{"0":1,"1":2}}
Uint8Array(0) []
~~~

~~~js fixed.mjs
const bytes = new Uint8Array([1, 2]);
const body = JSON.stringify({ bytes: Array.from(bytes) });
console.log(body);
const back = Uint8Array.from(JSON.parse(body).bytes);
console.log(back);
~~~

~~~text الناتج (Node 24.22)
{"bytes":[1,2]}
Uint8Array(2) [ 1, 2 ]
~~~

- [[JSON.stringify]] مبيعرفش الـ typed arrays: بيعاملها كـ object عادي ليه مفاتيح [["0"]] و [["1"]]. والاستقبال بقى [[new Uint8Array({ "0": 1, "1": 2 })]]، و object من غير [[length]] بيدّي typed array طولها صفر، **من غير أي error**. ده أوحش نوع باج: الداتا بتضيع ساكتة.
- الحل: [[Array.from(bytes)]] قبل الـ JSON، و [[Uint8Array.from(array)]] بعده.
- ولو الـ bytes كتير (صورة مثلًا)، الأرقام في JSON بتاخد لحد ٤ حروف للـ byte. base64 بياخد ١.٣٣ حرف بس: درس «Uint8Array: fromBase64 و toHex». أو ابعت الـ bytes نفسها من غير JSON ([[fetch(url, { method: 'POST', body: bytes })]]).` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** مليون رقم عشري في [[Array]] عادية (بـ [[push]]) وفي [[Float64Array(1_000_000)]]. قيس الذاكرة بـ [[process.memoryUsage()]] قبل وبعد: [[heapUsed]] و [[arrayBuffers]]. شغّل كل حالة في process لوحدها.`, done: R`عندك رقمين حقيقيين من جهازك، وتقدر تقول ليه الـ typed array ذاكرتها مش في [[heapUsed]]، وليه الـ Array أكبر من ٨ MB.`, sol: R`~~~js memory.mjs
// node memory.mjs array  ثم  node memory.mjs typed
const before = process.memoryUsage();
const N = 1_000_000;
const label = process.argv[2];
let data;
if (label === 'array') { data = []; for (let i = 0; i < N; i++) data.push(i * 0.5); }
else { data = new Float64Array(N); for (let i = 0; i < N; i++) data[i] = i * 0.5; }
const after = process.memoryUsage();
const mb = (n) => (n / 1024 / 1024).toFixed(1) + ' MB';
console.log(label, 'heap:', mb(after.heapUsed - before.heapUsed), 'arrayBuffers:', mb(after.arrayBuffers - before.arrayBuffers), data.length);
~~~

~~~text الناتج (Node 24.22، ويندوز 11)
array heap: 29.0 MB arrayBuffers: 0.0 MB 1000000
typed heap: 0.2 MB arrayBuffers: 7.6 MB 1000000
~~~

- **الـ Float64Array:** مليون × ٨ bytes = ٨٬٠٠٠٬٠٠٠ byte = 7.6 MB بالظبط (١ MB = ١٠٤٨٥٧٦ byte). مفيش ولا byte زيادة، لأن كل عنصر ٨ bytes ثابتة ومفيش أي معلومات عن نوعه. والذاكرة دي برّه الـ JS heap (في [[arrayBuffers]])، فالـ garbage collector مش بيلف عليها عنصر عنصر.
- **الـ Array:** 29 MB. V8 بيخزّن الأرقام العشرية في array «doubles» برضه ٨ bytes للعنصر، بس [[push]] بيكبّر المخزن على مراحل (كل مرة أكبر بحوالي النص) والقديم بيفضل garbage لحد ما الـ GC يعدّي، وكمان أي عنصر مش رقم كان هيحوّل الـ array كلها لشكل أبطأ وأكبر.
- **إمتى ده يفرق؟** لما الأرقام بالملايين (صوت، صورة، بيانات حساسات، ذاكرة لعبة). لقايمة ١٠٠ منتج: Array عادية ومتفكرش.` },
          ],
          check: { lang: "js", starter: R`function sniff(bytes) {
  // 'png' أو 'pdf' أو 'zip' أو 'gif' أو 'jpeg' أو 'unknown'
}`, tests: R`test("PNG", () => expect(sniff(Uint8Array.of(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0))).toBe('png'));
test("PDF", () => expect(sniff(Uint8Array.of(0x25, 0x50, 0x44, 0x46, 0x2d, 0x31))).toBe('pdf'));
test("ZIP", () => expect(sniff(Uint8Array.of(0x50, 0x4b, 3, 4, 20))).toBe('zip'));
test("GIF", () => expect(sniff(Uint8Array.of(0x47, 0x49, 0x46, 0x38, 0x39, 0x61))).toBe('gif'));
test("JPEG", () => expect(sniff(Uint8Array.of(0xff, 0xd8, 0xff, 0xe0))).toBe('jpeg'));
test("ملف أقصر من التوقيع", () => expect(sniff(Uint8Array.of(0x89, 0x50))).toBe('unknown'));
test("ملف فاضي", () => expect(sniff(new Uint8Array(0))).toBe('unknown'));`, solution: R`function sniff(bytes) {
  const starts = (sig) => sig.every((b, i) => bytes[i] === b);
  if (starts([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return 'png';
  if (starts([0x25, 0x50, 0x44, 0x46])) return 'pdf';
  if (starts([0x50, 0x4b, 0x03, 0x04])) return 'zip';
  if (starts([0x47, 0x49, 0x46, 0x38])) return 'gif';
  if (starts([0xff, 0xd8, 0xff])) return 'jpeg';
  return 'unknown';
}` },
          flag: "script",
          deep: {
            why: R`JavaScript اتعملت للنصوص والـ DOM، والـ Array فيها بتشيل أي حاجة (رقم ونص و object في نفس الوقت) وطولها بيتغيّر. ده ممتاز للبيانات العادية بس وحش للـ bytes: مليون pixel في صورة، أو ملف صوت، أو packet من الشبكة لها شكل ثابت. فالمتصفحات (عشان WebGL في ٢٠١١) ضافت [[ArrayBuffer]] و typed arrays، وبقوا جزء من اللغة في ES2015. ومن غيرهم مكانش هيبقى فيه WebAssembly ولا [[fetch]] لملف binary ولا تعديل صور في المتصفح ولا [[Buffer]] في Node بشكله الحالي.`,
            how: R`[[new ArrayBuffer(n)]] بيحجز [[n]] byte متصفّرين في حتة واحدة متصلة في الذاكرة، برّه الـ JS heap العادي. الـ buffer نفسه مبيتقريش ولا يتكتب: لازم **view**. الـ typed array ([[Uint8Array]] و [[Int16Array]] و [[Float64Array]]...) view بيقول «اعتبر الـ bytes دي أرقام من النوع ده»: [[Uint8Array]] كل byte رقم من 0 لـ 255، و [[Float64Array]] كل ٨ bytes رقم عشري واحد بمواصفة IEEE 754. ولما تكتب [[ asNumber[0] = 1.5 ]]، الـ engine بيحوّل [[1.5]] للـ ٨ bytes بتوعه ويكتبهم في الـ buffer، فأي view تاني على نفس الـ buffer بيشوف التغيير فورًا. والـ [[DataView]] view تالت بيقرا أي نوع من أي مكان (درس «DataView»).

وفي Node، [[Buffer]] هو [[class Buffer extends Uint8Array]] (اتجرّب: [[Object.getPrototypeOf(Buffer.prototype) === Uint8Array.prototype]] بـ [[true]])، فأي حاجة بتتعلمها هنا شغالة على [[Buffer]] كمان، وهو بيزوّد عليها [[toString('base64')]] و [[readUInt32LE]] وغيرهم.`,
            when: R`استخدمها لما الداتا bytes بطبيعتها: ملف بتقراه أو بتولّده (صورة، صوت، PDF، zip)، و [[fetch]] لحاجة مش JSON، و pixels الـ canvas، و WebSocket binary، والتشفير والـ hashing ([[crypto.subtle.digest]] بيرجّع [[ArrayBuffer]])، والكلام مع WebAssembly، و GPU (WebGL و WebGPU)، وبروتوكولات binary (MQTT، و MessagePack، و protobuf). وكمان لما عندك ملايين أرقام من نفس النوع ومحتاج ذاكرة أقل وسرعة ثابتة. **متستخدمهاش** لقايمة منتجات أو داتا فيها أنواع مختلفة: Array و objects عادية.`,
            mistakes: R`- تحسب حجم نص بـ [[str.length]]: ده عدد وحدات UTF-16 مش bytes. «مصر» ٣ و ٦ bytes.
- [[JSON.stringify(uint8)]] بيطلّع [[{"0":1,"1":2}]] مش array، والرجوع بيدّي typed array فاضية من غير error.
- تكتب [[ buf[0] = 255 ]] على الـ [[ArrayBuffer]] نفسه: بيعمل خاصية عادية على الـ object ومبيلمسش الـ bytes خالص (درس «ArrayBuffer»).
- [[Array.isArray(uint8)]] بـ [[false]]، فكود بيفحص بيها هيرفض الـ typed arrays. استخدم [[ArrayBuffer.isView]].
- تفتكر الـ typed array بتكبر: [[ a[5] = 9 ]] على array طولها ٣ مبيعملش حاجة، و [[push]] مش موجودة.
- تحط رقم أكبر من النوع: [[Uint8Array.of(256)]] بيبقى [[0]] من غير error (درس «TypedArray: العيلة»).`,
          },
          teach: R`## الفكرة في سطر

الـ bytes أرقام من 0 لـ 255، و JavaScript بتشيلها في [[ArrayBuffer]] وبتقراها بـ typed arrays. كل الناتج من Node 24.22 على ويندوز 11 (ملف [[.mjs]]) إلا لو مكتوب المتصفح.

---

## ١. كل حاجة bytes

الـ **bit** صفر أو واحد. والـ **byte** ٨ bits، فبيشيل رقم من 0 لـ 255 (٢ أس ٨ = ٢٥٦ احتمال). أي ملف على الديسك، وأي رد من الشبكة، صف من الـ bytes دي. اللي بيفرق ملف نص عن صورة هو **إزاي بنفسّر** الأرقام، مش الأرقام نفسها.

~~~js
import { writeFileSync, readFileSync } from 'node:fs';
writeFileSync('hello.txt', 'Hi مصر');
const bytes = readFileSync('hello.txt');
console.log(bytes.length, 'Hi مصر'.length, bytes instanceof Uint8Array);
console.log([...bytes].map((b) => b.toString(16).padStart(2, '0')).join(' '));
~~~

~~~text الناتج
9 6 true
48 69 20 d9 85 d8 b5 d8 b1
~~~

- [[readFileSync]] من غير encoding بيرجّع الـ bytes نفسها في [[Buffer]]، و [[instanceof Uint8Array]] بـ [[true]] لأن [[Buffer]] نوع من [[Uint8Array]].
- النص ٦ حروف بس ٩ bytes: [[H]] و [[i]] والمسافة byte لكل واحد، والـ ٣ حروف العربي ٢ bytes لكل حرف في UTF-8.
- السطر التاني **hex dump**: كل byte مكتوب بالـ hex (أساس ١٦). ليه hex؟ لأن كل byte رقمين بالظبط ([[00]] لـ [[ff]])، فالأعمدة بتفضل منظمة، وكل رقم hex = ٤ bits.

| الـ bytes | يعني |
|---|---|
| [[48 69]] | [[H]] و [[i]]: نفس أرقام ASCII (٧٢ و ١٠٥) |
| [[20]] | المسافة (٣٢ بالعشري) |
| [[d9 85]] | حرف [[م]] في UTF-8: byteين بيبدأ أولهم بـ [[d9]] |
| [[d8 b5]] و [[d8 b1]] | حرفين [[ص]] و [[ر]]، كل واحد byteين |

---

## ٢. typed array يعني إيه: buffer و view

JavaScript بتفصل بين حاجتين:

~~~text الشكل
ArrayBuffer(8)      [ 00 | 00 | 00 | 00 | 00 | 00 | f8 | 3f ]   ← الذاكرة نفسها، مبتتقريش مباشرة
Uint8Array(8)        0    0    0    0    0    0   248   63     ← نفس الذاكرة: كل byte رقم
Float64Array(1)      1.5                                         ← نفس الذاكرة: الـ 8 bytes رقم واحد
~~~

| الحاجة | دورها |
|---|---|
| [[ArrayBuffer]] | حتة ذاكرة خام بعدد bytes ثابت ومتصفّرة في الأول، ومفيهاش أي طريقة تقرا أو تكتب رقم |
| typed array ([[Uint8Array]] وأخواتها) | «عدسة» على الـ buffer: بتقول الـ bytes دي أرقام من نوع واحد وحجم واحد، وبتتقري بـ [[ a[i] ]] زي الـ Array |
| [[DataView]] | عدسة مرنة: تقرا أي نوع من أي مكان، وتختار ترتيب الـ bytes |

~~~js
const buf = new ArrayBuffer(8);
const asBytes = new Uint8Array(buf);
const asNumber = new Float64Array(buf);
asNumber[0] = 1.5;
console.log(asBytes, asNumber);
~~~

~~~text الناتج
Uint8Array(8) [
  0, 0,   0,  0,
  0, 0, 248, 63
] Float64Array(1) [ 1.5 ]
~~~

كتبنا في [[asNumber]] بس، و [[asBytes]] شاف التغيير لأن الاتنين عدسات على **نفس** الـ ٨ bytes. الرقم [[1.5]] بصيغة IEEE 754 (الصيغة اللي كل أرقام JavaScript متخزنة بيها) هو الـ bytes [[3f f8 00 00 00 00 00 00]]، وظهروا بالعكس ([[248]] = [[f8]] و [[63]] = [[3f]] في الآخر) لأن الجهاز **little-endian**: بيحط الـ byte الصغير الأول. ده متشرح بالتفصيل في درس «TypedArray: العيلة» ودرس «DataView».

---

## ٣. من bytes لنص تاني

~~~js
console.log(new TextDecoder().decode(bytes.subarray(3)));
~~~

~~~text الناتج
مصر
~~~

- [[bytes.subarray(3)]]: view جديد على نفس الذاكرة من byte رقم ٣ للآخر، من غير نسخ (درس «TypedArray: set و subarray»).
- [[new TextDecoder().decode(...)]]: بيفسّر الـ bytes كـ UTF-8 ويرجّع نص. والعكس [[new TextEncoder().encode(text)]] (درس «Uint8Array: fromBase64 و toHex»).
- لو قصيت في نص حرف هيطلع [[�]] مكان الحرف المقطوع: [[subarray(4)]] طلّع [[�صر]]، لأن الـ byte [[85]] لوحده مش حرف UTF-8 كامل.

---

## ٤. هتقابل الـ bytes فين

| المكان | بيرجّع إيه |
|---|---|
| [[fs.readFileSync(path)]] في Node | [[Buffer]] (نوع من [[Uint8Array]]) |
| [[await res.arrayBuffer()]] و [[await res.bytes()]] بعد [[fetch]] | [[ArrayBuffer]] و [[Uint8Array]] (الاتنين موجودين في Chrome 157 و Node 24.22) |
| [[await file.arrayBuffer()]] و [[await file.bytes()]] لملف من [[input type=file]] | نفس الكلام، [[File]] نوع من [[Blob]] |
| [[ctx.getImageData(0, 0, w, h).data]] في canvas | [[Uint8ClampedArray]]: ٤ bytes لكل pixel (أحمر وأخضر وأزرق وشفافية) |
| [[ws.binaryType = 'arraybuffer']] في WebSocket | كل رسالة binary بتوصل [[ArrayBuffer]] |
| [[crypto.getRandomValues(new Uint8Array(16))]] | بيملا الـ typed array بأرقام عشوائية آمنة |
| [[await crypto.subtle.digest('SHA-256', bytes)]] | [[ArrayBuffer]] فيه ٣٢ byte (الـ hash) |
| [[memory.buffer]] في WebAssembly | [[ArrayBuffer]] هو ذاكرة الـ wasm كلها (درس «WebAssembly في المتصفح») |
| [[res.body]] في Streams | دفعات [[Uint8Array]] (درس «Streams») |

---

## ٥. typed array مش Array

~~~js
const a = new Uint8Array(3);
a[5] = 9;
console.log(a, a[5], a.length, Array.isArray(a), typeof a.push);
~~~

~~~text الناتج
Uint8Array(3) [ 0, 0, 0 ] undefined 3 false undefined
~~~

- الطول **ثابت** من ساعة ما اتعملت: [[ a[5] = 9 ]] برّه الطول بيتجاهَل من غير error، ومفيش [[push]] ولا [[pop]] ولا [[splice]].
- مفيش «فراغات» (holes): كل خانة فيها رقم، متصفّرة في الأول.
- كل العناصر نفس النوع: [[Uint8Array]] بتشيل أرقام صحيحة من 0 لـ 255 بس، وأي حاجة تانية بتتحوّل (درس «TypedArray: العيلة»).
- [[Array.isArray]] بـ [[false]]، و [[JSON.stringify]] بيطلّعها object، بس [[for...of]] و spread و [[map]] و [[filter]] و [[at]] كلهم شغالين (درس «TypedArray: set و subarray»).

---

## ٦. خريطة الوحدة

| الدرس | هتتعلم فيه |
|---|---|
| «ArrayBuffer: byteLength و slice و isView» | الـ buffer نفسه: إزاي يتعمل ويتنسخ وتعرف إن حاجة view |
| «ArrayBuffer: resize و transfer و detached» | buffer بيكبر، وبينتقل لمكان تاني ويبقى فاضي |
| «TypedArray: العيلة و BYTES_PER_ELEMENT و overflow» | الـ ١٢ نوع، والأرقام اللي مبتكفيش، و endianness |
| «TypedArray: set و subarray و slice و كل الـ methods» | كل method، والفرق عن Array |
| «DataView: getUint16 و setFloat32 و endianness» | قراية ملفات binary حقيقية (WAV و PNG) |
| «Uint8Array: fromBase64 و toHex و TextEncoder» | النص ⇄ bytes ⇄ base64 و hex |
| «Web Workers و worker_threads: postMessage و transfer» | الشغل التقيل في thread تاني، ونقل الـ buffers |
| «SharedArrayBuffer: growable و crossOriginIsolated» | ذاكرة مشتركة بين threads، والـ headers اللي محتاجاها |
| «Atomics: add و compareExchange و wait و notify» | إزاي threads تشتغل على نفس الذاكرة من غير ما تبوّظها |

---

## الخلاصة

- كل حاجة bytes، والـ hex طريقة نكتبها بيها: رقمين لكل byte.
- [[ArrayBuffer]] = الذاكرة، والـ typed array أو [[DataView]] = العدسة اللي بتقرا بيها. أكتر من عدسة على نفس الذاكرة بيشوفوا نفس الـ bytes.
- [[str.length]] مش حجم النص: [[new TextEncoder().encode(str).length]] هو الحجم في UTF-8.
- الـ typed array طولها ثابت ونوعها واحد ومش [[Array]]، و [[JSON.stringify]] مبيفهمهاش.`,
          lines: [
            R`بنستورد دالتين من [[node:fs]]: واحدة تكتب ملف وواحدة تقراه كله مرة واحدة.`,
            R`بنكتب النص [[Hi مصر]] في ملف، و Node بيحوّله لـ bytes بـ UTF-8 لوحده وهو بيكتب.`,
            R`من غير encoding، [[readFileSync]] بيرجّع الـ bytes نفسها في [[Buffer]] مش نص.`,
            R`بيطبع ٩ (عدد الـ bytes) و ٦ (عدد الحروف) و [[true]]: الـ [[Buffer]] نوع من [[Uint8Array]].`,
            R`بنحوّل كل byte لرقمين hex بـ [[toString(16)]] و [[padStart]] ونحط مسافة بينهم: ده الـ hex dump.`,
            R`بنحجز ٨ bytes متصفّرين. الـ [[ArrayBuffer]] نفسه مبيتقريش، محتاج view.`,
            R`view أول: كل byte من الـ ٨ عنصر لوحده رقم من 0 لـ 255.`,
            R`view تاني على **نفس** الـ buffer: الـ ٨ bytes كلهم رقم عشري واحد [[Float64]].`,
            R`بنكتب [[1.5]] من خلال الـ view التاني، فالـ engine بيكتب الـ ٨ bytes بتوعه في الذاكرة المشتركة.`,
            R`الـ view الأول شاف الـ bytes [[0 0 0 0 0 0 248 63]]، والتاني شاف [[1.5]]: نفس الذاكرة بعينين.`,
            R`[[subarray(3)]] بياخد الـ bytes من مكان ٣ (بعد [[Hi]] والمسافة)، و [[TextDecoder]] بيرجّعهم نص: [[مصر]].`,
          ],
          ref: [
            { t: "MDN Guide: JavaScript typed arrays", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Typed_arrays" },
            { t: "MDN: ArrayBuffer", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer" },
            { t: "MDN: TypedArray", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray" },
            { t: "Node.js: Buffer", url: "https://nodejs.org/api/buffer.html" },
          ],
          pre: [{ to: "js/string و UTF-16: length و codePointAt", why: R`ليه [[length]] بيعد وحدات UTF-16 مش حروف ولا bytes` }, { to: "js/bitwise و shifts", why: R`الـ bits والـ hex و [[0xff]]: لغة الـ bytes` }],
        },
        {
          cmd: "ArrayBuffer: byteLength و slice و isView",
          title: "إزاي تعمل ArrayBuffer وتنسخ حتة منه، وتعرف إن الحاجة اللي معاك view على buffer؟",
          desc: R`[[new ArrayBuffer(n)]] بيحجز [[n]] byte متصفّرين، و [[buf.byteLength]] بيقولك العدد. الـ buffer **مبيتقريش ولا يتكتب بنفسه**: لازم view ([[new Uint8Array(buf)]] أو [[new DataView(buf)]]).

• [[buf.slice(start, end)]]: buffer **جديد** فيه نسخة من الـ bytes دي. التعديل في النسخة مبيلمسش الأصل.
• [[ArrayBuffer.isView(x)]]: [[true]] لو [[x]] typed array أو [[DataView]]، و [[false]] للـ buffer نفسه ولأي Array.
• [[ ArrayBuffer[Symbol.species] ]]: الـ class اللي [[slice]] بيعمل منها النسخة، وبتفرق لو عملت subclass.

وفخ Node المشهور: [[Buffer]] الصغير متخزن جوه buffer كبير مشترك (٦٤ KB في Node 24.22)، فـ [[new Uint8Array(file.buffer)]] بيديك ٦٥٥٣٦ byte مش حجم الملف. لازم [[byteOffset]] و [[byteLength]].`,
          example: R`// buffer.mjs: ArrayBuffer هو الذاكرة، والـ views هي اللي بتقرا وتكتب
const buf = new ArrayBuffer(8);
console.log(buf.byteLength, buf[0], (buf[0] = 255), new Uint8Array(buf)[0]);
const bytes = new Uint8Array(buf);
bytes.set([1, 2, 3, 4, 5, 6, 7, 8]);
const part = buf.slice(2, 5);
new Uint8Array(part)[0] = 99;
console.log(part.byteLength, new Uint8Array(part), bytes[2]);
console.log(new Uint8Array(buf.slice(-3)), buf.slice(6, 2).byteLength);
console.log(ArrayBuffer.isView(bytes), ArrayBuffer.isView(new DataView(buf)), ArrayBuffer.isView(buf), ArrayBuffer.isView([1, 2]));
const fromNode = Buffer.from('abc');
console.log(fromNode.byteOffset, fromNode.buffer.byteLength, new Uint8Array(fromNode.buffer, fromNode.byteOffset, fromNode.length));`,
          try: R`اعمل ملف فيه ٣ bytes بس ([[writeFileSync('small.bin', Uint8Array.of(1, 2, 3))]])، واقراه بـ [[readFileSync]]، واطبع [[file.length]] و [[new Uint8Array(file.buffer).length]]. اتوقّع الرقمين الأول. وبعدين صلّحها بحيث الـ view يبقى ٣ bytes بالظبط.`,
          sol: R`~~~js pool.mjs
import { readFileSync, writeFileSync } from 'node:fs';
writeFileSync('small.bin', Uint8Array.of(1, 2, 3));
const file = readFileSync('small.bin');
const wrong = new Uint8Array(file.buffer);
console.log(file.length, wrong.length);
~~~

~~~text الناتج (Node 24.22)
3 65536
~~~

~~~js pool-fixed.mjs
import { readFileSync } from 'node:fs';
const file = readFileSync('small.bin');
const view = new Uint8Array(file.buffer, file.byteOffset, file.byteLength);
const copy = file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength);
console.log(view.length, view, copy.byteLength);
~~~

~~~text الناتج (Node 24.22)
3 Uint8Array(3) [ 1, 2, 3 ] 3
~~~

- Node بيحجز buffer كبير واحد ([[Buffer.poolSize]] = ٦٥٥٣٦ في Node 24.22) ويقسّمه على الـ Buffers الصغيرة، عشان يحجز ذاكرة مرة واحدة بدل ألف مرة. فـ [[file.buffer]] هو الـ buffer الكبير كله، والملف بتاعك ٣ bytes في مكان ما جواه.
- [[new Uint8Array(buffer, byteOffset, length)]]: view على حتة من الـ buffer بس، من غير نسخ. وده الحل لو هتقرا بس.
- [[buffer.slice(start, end)]]: نسخة لوحدها بالمقاس. وده الحل لو هتبعت الـ [[ArrayBuffer]] لحتة تانية (worker أو مكتبة بتاخد [[ArrayBuffer]])، عشان متبعتش ٦٤ KB فيهم داتا ملفات تانية.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** الـ buffer طوله ٤. اكتب [[byteLength]] كل نسخة:

~~~js
const b = new ArrayBuffer(4);
console.log(b.slice(1).byteLength, b.slice(1, 100).byteLength, b.slice(-1).byteLength, b.slice(3, 1).byteLength, b.slice().byteLength);
~~~`, done: R`كتبت الخمس أرقام صح، وتقدر تقول [[slice]] بتعمل إيه لما [[end]] أكبر من الطول أو أصغر من [[start]].`, sol: R`~~~text الناتج (Node 24.22)
3 3 1 0 4
~~~

- [[slice(1)]]: من ١ للآخر = ٣ bytes.
- [[slice(1, 100)]]: الـ [[end]] بيتقص على الطول (٤)، فـ ٣ برضه ومفيش error.
- [[slice(-1)]]: السالب بيتعد من الآخر، فـ [[-1]] = آخر byte.
- [[slice(3, 1)]]: [[end]] قبل [[start]]: buffer طوله **صفر**، مش error ومش بالعكس.
- [[slice()]]: نسخة كاملة. ودي أسهل طريقة تنسخ buffer: [[const copy = buf.slice()]].
- نفس قواعد [[Array.prototype.slice]] بالظبط (درس «Array: at و slice و concat»)، بس النتيجة bytes.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[concatBuffers(...parts)]] بتاخد أي عدد من [[ArrayBuffer]] أو views (typed arrays أو [[Buffer]]) وترجّع [[ArrayBuffer]] واحد فيهم كلهم ورا بعض. لازم تحترم [[byteOffset]] بتاع الـ views.`, done: R`[[concatBuffers(Uint8Array.of(1, 2).buffer, Uint16Array.of(0x0403), new ArrayBuffer(0), Buffer.from('A'))]] بيرجّع buffer طوله ٥ فيه [[1, 2, 3, 4, 65]].`, sol: R`~~~js concat.mjs
function concatBuffers(...parts) {
  const total = parts.reduce((n, p) => n + p.byteLength, 0);
  const out = new Uint8Array(total);
  let at = 0;
  for (const p of parts) {
    const bytes = ArrayBuffer.isView(p) ? new Uint8Array(p.buffer, p.byteOffset, p.byteLength) : new Uint8Array(p);
    out.set(bytes, at);
    at += p.byteLength;
  }
  return out.buffer;
}
const r = concatBuffers(Uint8Array.of(1, 2).buffer, Uint16Array.of(0x0403), new ArrayBuffer(0), Buffer.from('A'));
console.log(r.byteLength, new Uint8Array(r));
~~~

~~~text الناتج (Node 24.22)
5 Uint8Array(5) [ 1, 2, 3, 4, 65 ]
~~~

- الطول الكلي بـ [[byteLength]] (مش [[length]]): [[Uint16Array]] طولها ١ بس ٢ bytes.
- [[ArrayBuffer.isView(p)]] بتفرّق بين الحالتين: الـ view بنعمل عليه [[Uint8Array]] بنفس [[byteOffset]] و [[byteLength]]، فالـ [[Buffer]] اللي جوه الـ pool بيتاخد منه حرف [[A]] بس (٦٥) مش الـ ٦٤ KB.
- [[0x0403]] في [[Uint16Array]] اتكتب [[3, 4]] مش [[4, 3]]: الجهاز little-endian (درس «TypedArray: العيلة»).
- [[out.set(bytes, at)]] بينسخ دفعة واحدة في المكان [[at]] (أسرع بكتير من loop). وفي Node فيه [[Buffer.concat]] جاهزة، بس دي بتشتغل في المتصفح كمان.` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[equalBytes(a, b)]] بترجّع [[true]] لو الاتنين فيهم نفس الـ bytes بالظبط. كل واحد ممكن يبقى [[ArrayBuffer]] أو أي view. ([[a === b]] بتقارن الهوية مش المحتوى.)`, done: R`[[Uint8Array.of(1, 2)]] و [[Uint8Array.of(1, 2).buffer]] بـ [[true]]، و [[Uint16Array.of(1)]] و [[Uint8Array.of(1, 0)]] بـ [[true]] (نفس الـ bytes)، وطولين مختلفين بـ [[false]]، والتمرين اللي بيتصحح لوحده عدّى.`, sol: R`~~~js equal.mjs
const asBytes = (x) => (ArrayBuffer.isView(x) ? new Uint8Array(x.buffer, x.byteOffset, x.byteLength) : new Uint8Array(x));
function equalBytes(a, b) {
  const x = asBytes(a), y = asBytes(b);
  if (x.length !== y.length) return false;
  for (let i = 0; i < x.length; i++) if (x[i] !== y[i]) return false;
  return true;
}
console.log(equalBytes(Uint8Array.of(1, 2), Uint8Array.of(1, 2).buffer), equalBytes(Buffer.from('ab'), Uint8Array.of(97, 98)), equalBytes(Uint16Array.of(1), Uint8Array.of(1, 0)), equalBytes(new ArrayBuffer(2), new ArrayBuffer(3)));
~~~

~~~text الناتج (Node 24.22)
true true true false
~~~

- [[new ArrayBuffer(2) === new ArrayBuffer(2)]] بـ [[false]]: objects مختلفة. مفيش مقارنة محتوى جاهزة في اللغة.
- بنحوّل الاتنين لـ [[Uint8Array]] على نفس الـ bytes بالظبط (بالـ offset)، وبعدين نقارن الطول الأول (أسرع رفض) وبعدين byte byte.
- [[Uint16Array.of(1)]] و [[Uint8Array.of(1, 0)]] متساويين لأننا بنقارن **bytes** مش أرقام: الـ [[1]] في ٢ bytes little-endian هو [[01 00]].
- **ليه loop مش [[every]]؟** الـ loop بيقف عند أول فرق ومش بيعمل function call لكل byte. لو بتقارن أسرار (tokens أو HMAC) استخدم [[crypto.timingSafeEqual]] في Node بدلها: المقارنة اللي بتقف بدري بتسرّب معلومة بالوقت.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الكود ده بيحاول يكتب [[255]] في أول byte ويقراه، وبيطبع [[0]]. ليه؟ وصلّحه:

~~~js
const buf = new ArrayBuffer(4);
buf[0] = 255;
console.log(buf[0], new Uint8Array(buf)[0], Object.keys(buf));
~~~`, done: R`النسخة المصلّحة بتطبع [[255]] من الـ view، و [[Object.keys(buf)]] بقت [[ [] ]]، وتقدر تقول [[buf[0] = 255]] كانت بتعمل إيه.`, sol: R`~~~text الناتج قبل التصليح (Node 24.22)
255 0 [ '0' ]
~~~

~~~js fixed.mjs
const buf = new ArrayBuffer(4);
const bytes = new Uint8Array(buf);
bytes[0] = 255;
console.log(bytes[0], new Uint8Array(buf)[0], Object.keys(buf));
~~~

~~~text الناتج (Node 24.22)
255 255 []
~~~

- الـ [[ArrayBuffer]] object عادي مفيهوش indexes. [[ buf[0] = 255 ]] عملت **خاصية** اسمها [['0']] على الـ object (باينة في [[Object.keys]])، والـ bytes نفسها فضلت أصفار. ومفيش أي error، فالباج ده بيعيش كتير.
- الحل: أي قراية أو كتابة تعدّي من view. والـ views الاتنين ([[bytes]] واللي اتعمل جوه [[console.log]]) بيشوفوا نفس الـ byte.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من MDN صفحة [[ ArrayBuffer[Symbol.species] ]]: اعمل [[class Chunk extends ArrayBuffer]] فيها خاصية [[label]]. هل [[chunk.slice(0, 4)]] بيرجّع [[Chunk]] ولا [[ArrayBuffer]]؟ وبعدين اعمل class تانية بـ [[static get [Symbol.species] ]] بيرجّع [[ArrayBuffer]] وجاوب نفس السؤال.`, done: R`عندك الناتج للحالتين، وتقدر تقول بجملة [[Symbol.species]] بيتحكم في إيه.`, sol: R`~~~js species.mjs
class Chunk extends ArrayBuffer {
  label = 'chunk';
}
const c = new Chunk(8);
console.log(c.slice(0, 4) instanceof Chunk, c.slice(0, 4).label);
class PlainSlices extends ArrayBuffer {
  static get [Symbol.species]() { return ArrayBuffer; }
}
const p = new PlainSlices(8);
console.log(p.slice(0, 4) instanceof PlainSlices, p.slice(0, 4).constructor.name, ArrayBuffer[Symbol.species] === ArrayBuffer);
~~~

~~~text الناتج (Node 24.22)
true chunk
false ArrayBuffer true
~~~

**الإجابة:** [[slice]] مش بيعمل [[new ArrayBuffer]] على طول: بيسأل [[this.constructor[Symbol.species] ]] «أعمل النسخة من أنهي class؟». الـ getter الافتراضي بيرجّع [[this]]، فالـ subclass بتاخد نسخ من نوعها ([[Chunk]] وفيها [[label]]). ولو الـ subclass عملت override ورجّعت [[ArrayBuffer]]، النسخ بتبقى buffers عادية. ده نفس الـ pattern بتاع [[Array[Symbol.species] ]] (درس «Array[Symbol.species] و Symbol.unscopables»). عمليًا: نادر جدًا تحتاجه، بس لازم تعرفه لو مكتبة عاملة subclass وبتستغرب النوع اللي راجع.` },
          ],
          check: { lang: "js", starter: R`function equalBytes(a, b) {
  // a و b: ArrayBuffer أو أي view. true لو نفس الـ bytes بالظبط
}`, tests: R`test("view و الـ buffer بتاعه", () => expect(equalBytes(Uint8Array.of(1, 2), Uint8Array.of(1, 2).buffer)).toBe(true));
test("نفس الـ bytes بأنواع مختلفة", () => expect(equalBytes(Uint16Array.of(1), Uint8Array.of(1, 0))).toBe(true));
test("طول مختلف", () => expect(equalBytes(new ArrayBuffer(2), new ArrayBuffer(3))).toBe(false));
test("byte مختلف", () => expect(equalBytes(Uint8Array.of(1, 2, 3), Uint8Array.of(1, 2, 4))).toBe(false));
test("view بـ offset", () => expect(equalBytes(Uint8Array.of(9, 1, 2).subarray(1), Uint8Array.of(1, 2))).toBe(true));
test("فاضيين", () => expect(equalBytes(new ArrayBuffer(0), new Uint8Array(0))).toBe(true));`, solution: R`const asBytes = (x) => (ArrayBuffer.isView(x) ? new Uint8Array(x.buffer, x.byteOffset, x.byteLength) : new Uint8Array(x));
function equalBytes(a, b) {
  const x = asBytes(a), y = asBytes(b);
  if (x.length !== y.length) return false;
  for (let i = 0; i < x.length; i++) if (x[i] !== y[i]) return false;
  return true;
}` },
          flag: "script",
          deep: {
            why: R`الـ bytes لازم تعيش في حتة ذاكرة واحدة متصلة بطول معروف عشان أي حد (الـ engine، والـ GPU، و wasm، ونظام التشغيل وهو بيكتب ملف أو يبعت على الشبكة) يقدر يقراها مرة واحدة من غير ما يلف على objects. ده الـ [[ArrayBuffer]]. وفصله عن الـ views سببه إن نفس الـ bytes بتتقري بأكتر من شكل: header ملف بأرقام ٣٢ bit، وبعده pixels بـ ٨ bit، كله في نفس الـ buffer.`,
            how: R`[[new ArrayBuffer(n)]] بيحوّل [[n]] لرقم صحيح (بيقص الكسر: [[2.9]] بتبقى ٢، و [['4']] بيبقى ٤) وبيحجز الذاكرة متصفّرة. لو [[n]] سالب أو أكبر من الحد: [[RangeError: Invalid array buffer length]]، ولو الذاكرة مكفتش (اتجرّب بـ [[2 ** 40]]، يعني ١ تيرا): [[RangeError: Array buffer allocation failed]]. ومن غير [[new]]: [[TypeError: Constructor ArrayBuffer requires 'new']].

[[slice(start, end)]] بيحسب الحدود زي [[Array.prototype.slice]] (السالب من الآخر، والكبير بيتقص)، وبعدين بيسأل [[this.constructor[Symbol.species] ]] عن الـ class، ويعمل buffer جديد بالطول ده وينسخ فيه الـ bytes. و [[ArrayBuffer.isView(x)]] بيبص على slot داخلي اسمه ViewedArrayBuffer: موجود في كل typed array وكل [[DataView]] بس. و [[byteLength]] getter على الـ prototype مش خاصية عادية، فمينفعش تغيّره بـ [[=]] (التغيير بيتجاهَل)، والطريقة الوحيدة تغيّر الطول هي [[resize]] (الدرس الجاي).

و [[structuredClone(buf)]] بينسخ الـ bytes (اتجرّب: بيرجّع [[ArrayBuffer]] فيه نفس المحتوى)، أما [[JSON.stringify]] فبيطلّعه [[{}]] فاضي.`,
            when: R`[[ArrayBuffer]] بنفسك: لما تبني ملف أو رسالة binary من الصفر (تحجز الحجم وتكتب فيه بـ [[DataView]])، أو مكتبة بتطلب [[ArrayBuffer]] بالاسم ([[WebAssembly.instantiate]]، و [[AudioContext.decodeAudioData]]، و [[postMessage]] مع transfer). [[slice]]: لما محتاج نسخة مستقلة (هتبعتها أو هتعدّل فيها والأصل لازم يفضل زي ما هو). ولو هتقرا بس: view بـ offset أرخص لأنه من غير نسخ. [[ArrayBuffer.isView]]: في أي دالة بتقبل «bytes بأي شكل».`,
            mistakes: R`- [[ buf[0] = 255 ]] على الـ buffer نفسه: بيعمل خاصية عادية والـ bytes مبتتغيرش، من غير error.
- [[new Uint8Array(nodeBuffer.buffer)]]: بتاخد الـ pool كله (٦٥٥٣٦ byte في Node 24.22) مش الملف. استخدم [[byteOffset]] و [[byteLength]].
- تفتكر [[slice]] على الـ buffer بيشارك الذاكرة: بينسخ. (العكس بتاع [[subarray]] في الـ typed arrays، درس «TypedArray: set و subarray».)
- تقارن buffers بـ [[===]]: بتقارن الهوية. قارن الـ bytes (تمرين [[equalBytes]]).
- تحسب الحجم بـ [[length]]: الـ [[ArrayBuffer]] معندوش [[length]] أصلًا ([[undefined]])، عنده [[byteLength]] بس.
- [[Array.isArray]] أو [[instanceof Uint8Array]] عشان تعرف إن حاجة bytes: [[DataView]] و [[Int16Array]] هيتّرفضوا. [[ArrayBuffer.isView]] هو الصح.`,
          },
          teach: R`## الفكرة في سطر

[[ArrayBuffer]] حتة ذاكرة بعدد bytes ثابت، بتتعمل وتتنسخ، بس مبتتقريش غير من خلال view. الناتج من Node 24.22 على ويندوز 11.

---

## ١. [[new ArrayBuffer(n)]] و [[ArrayBuffer.prototype.byteLength]]

~~~js
const buf = new ArrayBuffer(8);
console.log(buf.byteLength, buf);
~~~

~~~text الناتج
8 ArrayBuffer {
  [Uint8Contents]: <00 00 00 00 00 00 00 00>,
  [byteLength]: 8
}
~~~

- [[new ArrayBuffer(8)]]: احجز ٨ bytes، كلهم صفر.
- [[buf.byteLength]]: عدد الـ bytes. ده getter: بيتقري بس، و [[buf.byteLength = 100]] بيتجاهَل.
- [[ [Uint8Contents] ]] اللي في الطباعة ده Node بيوريك المحتوى للـ debugging بس، مش خاصية تقدر تقراها.

| اللي بتكتبه | اللي بيحصل (اتجرّب) |
|---|---|
| [[new ArrayBuffer()]] | buffer طوله صفر، مفيش error |
| [[new ArrayBuffer('4')]] و [[new ArrayBuffer(2.9)]] | بيتحوّلوا رقم صحيح: ٤ و ٢ |
| [[new ArrayBuffer(-1)]] | [[RangeError: Invalid array buffer length]]: الطول السالب ممنوع |
| [[new ArrayBuffer(2 ** 40)]] | [[RangeError: Array buffer allocation failed]]: الذاكرة مكفتش |
| [[ArrayBuffer(8)]] من غير [[new]] | [[TypeError: Constructor ArrayBuffer requires 'new']]: لازم تكتب [[new]] قبله |

---

## ٢. الـ buffer مبيتقريش بنفسه

~~~js
console.log(buf[0], (buf[0] = 255), new Uint8Array(buf)[0]);
~~~

~~~text الناتج
undefined 255 0
~~~

- [[ buf[0] ]] بـ [[undefined]]: الـ buffer object عادي مفيهوش indexes.
- [[(buf[0] = 255)]] الـ assignment نفسه قيمته [[255]]، بس اللي حصل إنه عمل **خاصية** اسمها [['0']] على الـ object. الـ bytes ما اتلمستش.
- [[new Uint8Array(buf)[0] ]] بيقرا الـ byte الحقيقي: لسه [[0]].

القاعدة: الـ buffer = ذاكرة، والـ view = إيديك. أي قراية أو كتابة من خلال view.

---

## ٣. [[ArrayBuffer.prototype.slice]]: نسخة جديدة

~~~js
const bytes = new Uint8Array(buf);
bytes.set([1, 2, 3, 4, 5, 6, 7, 8]);
const part = buf.slice(2, 5);
new Uint8Array(part)[0] = 99;
console.log(part.byteLength, new Uint8Array(part), bytes[2]);
console.log(new Uint8Array(buf.slice(-3)), buf.slice(6, 2).byteLength);
~~~

~~~text الناتج
3 Uint8Array(3) [ 99, 4, 5 ] 3
Uint8Array(3) [ 6, 7, 8 ] 0
~~~

- [[bytes.set([...])]]: بيكتب الـ ٨ أرقام في الـ buffer دفعة واحدة.
- [[buf.slice(2, 5)]]: buffer **جديد** فيه الـ bytes من مكان ٢ لحد قبل ٥ (يعني ٢ و ٣ و ٤) = ٣ bytes.
- كتبنا [[99]] في النسخة، والأصل [[ bytes[2] ]] لسه [[3]]: **نسخ** مش مشاركة.
- [[slice(-3)]]: آخر ٣. و [[slice(6, 2)]]: النهاية قبل البداية = طول صفر.

| الشكل | النتيجة على buffer طوله ٤ |
|---|---|
| [[slice()]] | نسخة كاملة (٤): أسهل طريقة تنسخ buffer |
| [[slice(1)]] | من ١ للآخر (٣) |
| [[slice(1, 100)]] | النهاية بتتقص على الطول، فـ ٣ من غير error |
| [[slice(-1)]] | آخر byte (١)، السالب بيتعد من الآخر |
| [[slice(3, 1)]] | طول صفر، مش بالعكس ومش error |

---

## ٤. [[ArrayBuffer.isView]]: ده view ولا لأ؟

~~~js
console.log(ArrayBuffer.isView(bytes), ArrayBuffer.isView(new DataView(buf)), ArrayBuffer.isView(buf), ArrayBuffer.isView([1, 2]));
~~~

~~~text الناتج
true true false false
~~~

| القيمة | [[isView]] | ليه |
|---|---|---|
| أي typed array ([[Uint8Array]] و [[Float32Array]]...) و [[Buffer]] | [[true]] | view على buffer |
| [[DataView]] | [[true]] | view برضه |
| الـ [[ArrayBuffer]] نفسه | [[false]] | ده الذاكرة مش view |
| [[Array]] عادية | [[false]] | مفيهاش buffer خالص |

الاستخدام الطبيعي: دالة بتقبل «bytes بأي شكل» وبتوحّدهم:

~~~js
const asBytes = (x) => (ArrayBuffer.isView(x) ? new Uint8Array(x.buffer, x.byteOffset, x.byteLength) : new Uint8Array(x));
~~~

ليه مش [[x instanceof Uint8Array]]؟ لأن [[DataView]] و [[Int16Array]] هيتّرفضوا، وكمان typed array جاية من iframe تاني [[instanceof]] بتاعها [[false]] (كل iframe ليه [[Uint8Array]] بتاعه).

---

## ٥. [[ ArrayBuffer[Symbol.species] ]]: [[slice]] بيعمل النسخة من أنهي class؟

~~~js
class Chunk extends ArrayBuffer {
  label = 'chunk';
}
const c = new Chunk(8);
console.log(c.slice(0, 4) instanceof Chunk, c.slice(0, 4).label);
class PlainSlices extends ArrayBuffer {
  static get [Symbol.species]() { return ArrayBuffer; }
}
const p = new PlainSlices(8);
console.log(p.slice(0, 4) instanceof PlainSlices, p.slice(0, 4).constructor.name, ArrayBuffer[Symbol.species] === ArrayBuffer);
~~~

~~~text الناتج
true chunk
false ArrayBuffer true
~~~

- [[slice]] بيسأل [[this.constructor[Symbol.species] ]]. الافتراضي getter بيرجّع [[this]]، فالـ subclass [[Chunk]] نسخها [[Chunk]].
- [[PlainSlices]] عملت override ورجّعت [[ArrayBuffer]]، فنسخها buffers عادية.
- نفس الفكرة بتاعة [[Array[Symbol.species] ]] (درس «Array[Symbol.species] و Symbol.unscopables»). نادر تحتاجها، بس كده تعرف ليه نوع النسخة ممكن يختلف.

---

## ٦. فخ Node: الـ [[Buffer]] الصغير جوه buffer كبير

~~~js
const fromNode = Buffer.from('abc');
console.log(fromNode.byteOffset, fromNode.buffer.byteLength, new Uint8Array(fromNode.buffer, fromNode.byteOffset, fromNode.length));
~~~

~~~text الناتج
896 65536 Uint8Array(3) [ 97, 98, 99 ]
~~~

- Node بيحجز «pool» واحد [[Buffer.poolSize]] (٦٥٥٣٦ byte في Node 24.22) ويدّي منه حتت للـ Buffers الصغيرة. فـ [[fromNode.buffer]] هو الـ pool كله، و [[byteOffset]] (٨٩٦ هنا، وبيتغيّر حسب اللي اتحجز قبله) مكان النص جواه.
- [[readFileSync]] لملف صغير بيعمل نفس الحاجة: ملف ٣ bytes و [[file.buffer.byteLength]] بـ ٦٥٥٣٦ (التجربة في الحل فوق).
- القاعدة: أي view على [[x.buffer]] لازم ياخد [[x.byteOffset]] و [[x.byteLength]]. ولو هتبعت الـ [[ArrayBuffer]] لحد: [[x.buffer.slice(x.byteOffset, x.byteOffset + x.byteLength)]].

---

## ٧. كل members الـ [[ArrayBuffer]]

| الـ member | بيعمل إيه | فين |
|---|---|---|
| [[new ArrayBuffer(n, { maxByteLength })]] | بيحجز [[n]] byte، والـ option بتخليه قابل للتكبير | هنا، والدرس الجاي |
| [[byteLength]] | عدد الـ bytes دلوقتي | هنا |
| [[slice(start, end)]] | نسخة جديدة من حتة | هنا |
| [[ArrayBuffer.isView(x)]] | هل [[x]] typed array أو [[DataView]] | هنا |
| [[ ArrayBuffer[Symbol.species] ]] | الـ class اللي [[slice]] بيعمل منها | هنا |
| [[resizable]] و [[maxByteLength]] و [[resize(n)]] | buffer بيكبر ويصغر في مكانه | «ArrayBuffer: resize و transfer و detached» |
| [[transfer()]] و [[transferToFixedLength()]] و [[detached]] | تنقل الـ bytes لـ buffer جديد والقديم يفضى | نفس الدرس |

---

## الخلاصة

- [[new ArrayBuffer(n)]] = [[n]] byte أصفار، و [[byteLength]] حجمه، ومن غير view مفيش قراية ولا كتابة.
- [[slice]] **بينسخ**، و [[slice()]] من غير arguments = نسخة كاملة.
- [[ArrayBuffer.isView]] أحسن من [[instanceof]] لما تقبل bytes بأي شكل.
- مع [[Buffer]] في Node: دايمًا [[byteOffset]] و [[byteLength]].`,
          lines: [
            R`بنحجز ٨ bytes متصفّرين في [[ArrayBuffer]] جديد.`,
            R`بيطبع ٨، و [[undefined]] (مفيش indexes)، و [[255]] قيمة الـ assignment اللي عملت خاصية عادية، و [[0]] لأن الـ byte الحقيقي متلمسش.`,
            R`view بـ [[Uint8Array]] على نفس الـ buffer: دلوقتي نقدر نقرا ونكتب bytes.`,
            R`[[set]] بيكتب الأرقام من ١ لـ ٨ في الـ ٨ bytes دفعة واحدة.`,
            R`[[slice(2, 5)]] بيعمل buffer جديد فيه نسخة من الـ bytes اللي في الأماكن ٢ و ٣ و ٤.`,
            R`بنكتب ٩٩ في أول byte من النسخة من خلال view مؤقت، عشان نشوف هل الأصل هيتأثر.`,
            R`بيطبع ٣ (حجم النسخة) والنسخة [[99, 4, 5]]، و [[ bytes[2] ]] لسه ٣: النسخة مستقلة.`,
            R`[[slice(-3)]] آخر ٣ bytes ([[6, 7, 8]])، و [[slice(6, 2)]] النهاية قبل البداية فالطول صفر.`,
            R`[[isView]] بـ [[true]] للـ typed array وللـ [[DataView]]، و [[false]] للـ buffer نفسه وللـ Array.`,
            R`[[Buffer.from('abc')]] في Node: ٣ bytes متخزنين جوه pool كبير مشترك.`,
            R`[[byteOffset]] مكان النص جوه الـ pool، و ٦٥٥٣٦ حجم الـ pool كله، والـ view بالـ offset والطول بيجيب الـ ٣ bytes بس.`,
          ],
          ref: [
            { t: "MDN: ArrayBuffer", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer" },
            { t: "MDN: ArrayBuffer.prototype.byteLength", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/byteLength" },
            { t: "MDN: ArrayBuffer.prototype.slice()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/slice" },
            { t: "MDN: ArrayBuffer.isView()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/isView" },
            { t: "MDN: ArrayBuffer[Symbol.species]", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/Symbol.species" },
            { t: "Node.js: Buffer.poolSize", url: "https://nodejs.org/api/buffer.html#class-property-bufferpoolsize" },
          ],
          pre: [{ to: "js/Array: at و slice و concat", why: R`نفس قواعد [[start]] و [[end]] والسالب في [[slice]]` }, { to: "js/Array[Symbol.species] و Symbol.unscopables", why: R`[[Symbol.species]] في [[Array]] قبل الـ buffer` }],
        },
        {
          cmd: "ArrayBuffer: resize و transfer و detached",
          title: "إزاي buffer يكبر في مكانه، أو يتنقل لصاحب تاني ويفضى؟",
          desc: R`الـ [[ArrayBuffer]] العادي طوله ثابت للأبد. من ES2024 فيه نوعين زيادة:

• **resizable:** [[new ArrayBuffer(4, { maxByteLength: 16 })]] بيبدأ ٤ وتقدر تعمل [[buf.resize(n)]] لأي طول لحد ١٦، والـ views اللي من غير طول ثابت بتكبر وتصغر معاه. [[buf.resizable]] و [[buf.maxByteLength]] بيقولولك ده.
• **transfer:** [[buf.transfer()]] بيرجّع buffer جديد فيه نفس الـ bytes **من غير نسخ** (غالبًا)، والقديم بيبقى **detached**: طوله صفر، و [[buf.detached]] بـ [[true]]، وكل view عليه طوله صفر، وأي method عليه بترمي [[TypeError]].
• [[transferToFixedLength(n)]]: نفس الكلام بس النتيجة buffer عادي ثابت الطول.

ده نفس اللي بيحصل لما تبعت buffer لـ Worker بالـ transfer، ولما ذاكرة الـ wasm تكبر.`,
          example: R`// buffer بيكبر، وبينتقل، وبيتفصل
const buf = new ArrayBuffer(4, { maxByteLength: 16 });
console.log(buf.resizable, buf.byteLength, buf.maxByteLength);
const all = new Uint8Array(buf);
const firstTwo = new Uint8Array(buf, 0, 2);
all.set([1, 2, 3, 4]);
buf.resize(8);
console.log(all.length, firstTwo.length, all);
buf.resize(1);
console.log(all.length, firstTwo.length, firstTwo[1]);
try { buf.resize(32); } catch (e) { console.log(e.name + ': ' + e.message); }
const moved = buf.transfer();
console.log(buf.detached, buf.byteLength, moved.byteLength, moved.resizable, all.length);
try { all[0] = 5; console.log('كتابة على view مفصول:', all[0]); buf.slice(0); } catch (e) { console.log(e.name + ': ' + e.message); }
const fixed = moved.transferToFixedLength(6);
console.log(fixed.resizable, fixed.byteLength, new Uint8Array(fixed));`,
          try: R`اعمل buffer قابل للتكبير بـ [[maxByteLength: 8]] وطوله ٢، وعليه ٣ views: [[new Uint8Array(buf)]] و [[new Uint8Array(buf, 0, 2)]] و [[new Uint8Array(buf, 1)]]. اتوقّع أطوالهم بعد [[resize(6)]] وبعد [[resize(3)]].`,
          sol: R`~~~js views.mjs
const buf = new ArrayBuffer(2, { maxByteLength: 8 });
const tracking = new Uint8Array(buf);
const fixed = new Uint8Array(buf, 0, 2);
const tail = new Uint8Array(buf, 1);
console.log(tracking.length, fixed.length, tail.length);
buf.resize(6);
console.log(tracking.length, fixed.length, tail.length);
buf.resize(3);
console.log(tracking.length, fixed.length, tail.length);
~~~

~~~text الناتج (Node 24.22)
2 2 1
6 2 5
3 2 2
~~~

- [[tracking]] من غير طول: **length-tracking**، طوله دايمًا = طول الـ buffer.
- [[fixed]] اتعمل بطول ٢: فضل ٢ طول ما الـ buffer فيه ٢ bytes على الأقل.
- [[tail]] من غير طول بس بـ offset ١: طوله = طول الـ buffer ناقص ١ (١ ثم ٥ ثم ٢).
- لو صغّرت الـ buffer لأقل من اللي الـ view محتاجه (زي [[firstTwo]] في المثال بعد [[resize(1)]])، الـ view بيبقى «out of bounds» وطوله صفر، ولو كبّرته تاني بيرجع.
- **تنبيه:** [[new Uint8Array(buf, 4)]] على buffer طوله ٢ وقت الإنشاء بيرمي [[RangeError: Start offset 4 is outside the bounds of the buffer]] حتى لو [[maxByteLength]] ٨: الـ offset لازم يبقى جوه الطول **الحالي**.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** إيه اللي هيتطبع؟

~~~js
function archive(buf) { return buf.transfer(); }
const data = new Uint8Array([1, 2, 3]);
const saved = archive(data.buffer);
console.log(data.length, data[0], new Uint8Array(saved));
~~~`, done: R`كتبت السطر صح، وتقدر تقول ليه [[data]] بقت فاضية مع إن الدالة مرجعتش حاجة تخصها.`, sol: R`~~~text الناتج (Node 24.22)
0 undefined Uint8Array(3) [ 1, 2, 3 ]
~~~

- [[archive]] عملت [[transfer]] على الـ buffer اللي تحت [[data]]، فالـ bytes راحت لـ [[saved]]، والـ buffer القديم بقى detached.
- [[data]] view على الـ buffer القديم: طوله بقى صفر، و [[ data[0] ]] بـ [[undefined]]. **ومفيش error**: القراية من view مفصول بترجّع [[undefined]] بهدوء.
- ده معنى «ownership»: بعد [[transfer]] الكود اللي كان ماسك الـ buffer مبقاش صاحبه. فلو دالة هتعمل [[transfer]] لحاجة جاية من برّه، لازم توثّق ده، أو تشتغل على نسخة ([[buf.slice()]]).` },
            { lvl: 'تطبيق', t: R`**ابني:** [[class ByteWriter]] بتجمّع bytes على دفعات: [[write(uint8)]] بيضيف في الآخر (وبيرجّع [[this]] عشان تكمّل)، و [[length]]، و [[finish()]] بترجّع [[ArrayBuffer]] ثابت فيه كل اللي اتكتب. جواها buffer resizable حده ١ MB بيكبر بـ [[resize]] بدل ما تعمل buffer جديد كل مرة. وبعد [[finish]] أي [[write]] ترمي error واضح.`, done: R`[[write(Uint8Array.of(1, 2)).write(encode('Hi'))]] بيدّي [[length]] ٤، و [[finish()]] بيرجّع buffer مش resizable فيه [[1, 2, 72, 105]]، والكتابة بعد [[finish]] بترمي [[TypeError]] برسالتك، وكتابة أكبر من ١ MB بترمي [[RangeError]].`, sol: R`~~~js byte-writer.mjs
// byte-writer.mjs: بنكتب bytes على دفعات في buffer بيكبر في مكانه
class ByteWriter {
  #buf = new ArrayBuffer(0, { maxByteLength: 1 << 20 });
  #bytes = new Uint8Array(this.#buf);
  get length() { return this.#buf.byteLength; }
  write(chunk) {
    if (this.#buf.detached) throw new TypeError('الـ writer اتقفل بعد finish');
    const at = this.#buf.byteLength;
    if (at + chunk.length > this.#buf.maxByteLength) throw new RangeError('الحد الأقصى ' + this.#buf.maxByteLength + ' byte');
    this.#buf.resize(at + chunk.length);
    this.#bytes.set(chunk, at);
    return this;
  }
  finish() { return this.#buf.transferToFixedLength(); }
}
const w = new ByteWriter();
w.write(Uint8Array.of(1, 2)).write(new TextEncoder().encode('Hi'));
console.log(w.length);
const done = w.finish();
console.log(done.resizable, new Uint8Array(done));
try { w.write(Uint8Array.of(3)); } catch (e) { console.log(e.name + ': ' + e.message); }
try { new ByteWriter().write(new Uint8Array((1 << 20) + 1)); } catch (e) { console.log(e.name + ': ' + e.message); }
~~~

~~~text الناتج (Node 24.22)
4
false Uint8Array(4) [ 1, 2, 72, 105 ]
TypeError: الـ writer اتقفل بعد finish
RangeError: الحد الأقصى 1048576 byte
~~~

- [[1 << 20]] = ١٠٤٨٥٧٦ (١ MB) بالـ shift (درس «bitwise و shifts»).
- [[#bytes]] view **length-tracking** (من غير طول)، فبعد كل [[resize]] بيشوف الطول الجديد لوحده ومش محتاجين نعمله تاني.
- [[set(chunk, at)]] بيكتب الدفعة في الآخر.
- [[finish]] بيعمل [[transferToFixedLength()]]: الـ bytes بتروح لـ buffer عادي بنفس الطول من غير نسخ، والـ writer بيبقى detached فمحدش يكتب في الذاكرة اللي سلّمناها.
- **غلطة وقعت فيها وأنا بكتبه:** من غير سطر الـ [[detached]]، الكتابة بعد [[finish]] كانت بترمي [[RangeError: الحد الأقصى 0 byte]]: لأن الـ buffer المفصول [[maxByteLength]] بتاعه بيبقى صفر. رسالة مضللة، فالفحص الصريح أحسن.` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[ensureCapacity(buf, n)]] بترجّع buffer فيه [[n]] byte على الأقل وفيه الـ bytes القديمة: لو كفاية رجّعه زي ما هو، ولو resizable و [[n]] جوه الحد كبّره في مكانه ورجّعه هو نفسه، وغير كده انقله لـ buffer أكبر.`, done: R`buffer resizable بيتكبّر وبيرجع هو نفسه، والعادي بيتنقل (القديم detached والبيانات موجودة)، والـ resizable اللي [[n]] أكبر من حده بيتنقل برضه من غير error، والتمرين اللي بيتصحح لوحده عدّى.`, sol: R`~~~js ensure.mjs
function ensureCapacity(buf, n) {
  if (buf.byteLength >= n) return buf;
  if (buf.resizable && n <= buf.maxByteLength) { buf.resize(n); return buf; }
  return buf.transferToFixedLength(n);
}
const r = new ArrayBuffer(2, { maxByteLength: 8 });
console.log(ensureCapacity(r, 6) === r, r.byteLength);
const f = new ArrayBuffer(2); new Uint8Array(f)[0] = 7;
const g = ensureCapacity(f, 5);
console.log(g === f, f.detached, g.byteLength, new Uint8Array(g)[0], g.resizable);
const r2 = new ArrayBuffer(2, { maxByteLength: 4 }); new Uint8Array(r2)[1] = 9;
const g2 = ensureCapacity(r2, 10);
console.log(g2 === r2, g2.byteLength, g2.resizable, r2.detached, new Uint8Array(g2)[1]);
~~~

~~~text الناتج (Node 24.22)
true 6
false true 5 7 false
false 10 false true 9
~~~

- **الفخ اللي لقيته:** أول نسخة كانت بتعمل [[buf.transfer(n)]] في الآخر، ووقعت في الحالة التالتة بـ [[RangeError: Invalid array buffer length]]. السبب: [[transfer]] على buffer resizable بيرجّع buffer **resizable بنفس الحد** ([[maxByteLength]] ٤)، فـ ١٠ ممنوعة. [[transferToFixedLength(n)]] بيرجّع buffer عادي بأي طول.
- لما الطول الجديد أكبر، الـ bytes الزيادة أصفار، والقديمة موجودة ([[7]] و [[9]]).
- اللي بينادي الدالة **لازم** يستخدم الـ buffer اللي راجع مش القديم، لأن القديم ممكن يبقى detached. نفس عقد [[realloc]] في C.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** ضيف 4 MB على دفعات ١ KB بطريقتين: (أ) كل مرة [[Uint8Array]] جديدة أكبر وتنسخ القديم فيها، (ب) buffer resizable و [[resize]]. قيس الوقت بـ [[performance.now()]] وشغّل مرتين.`, done: R`عندك رقمين حقيقيين من جهازك لكل طريقة، وتقدر تشرح ليه الفرق بالحجم ده.`, sol: R`~~~js grow-bench.mjs
// grow-bench.mjs: نضيف 4 MB على دفعات 1 KB بطريقتين
const CHUNK = new Uint8Array(1024).fill(7), TIMES = 4096;
let t = performance.now();
let copy = new Uint8Array(0);
for (let i = 0; i < TIMES; i++) {
  const next = new Uint8Array(copy.length + CHUNK.length);
  next.set(copy);
  next.set(CHUNK, copy.length);
  copy = next;
}
console.log('نسخ كل مرة:', Math.round(performance.now() - t), 'ms', copy.length);
t = performance.now();
const buf = new ArrayBuffer(0, { maxByteLength: CHUNK.length * TIMES });
const view = new Uint8Array(buf);
for (let i = 0; i < TIMES; i++) {
  const at = buf.byteLength;
  buf.resize(at + CHUNK.length);
  view.set(CHUNK, at);
}
console.log('resize في مكانه:', Math.round(performance.now() - t), 'ms', view.length);
~~~

~~~text الناتج (Node 24.22، ويندوز 11، مرتين)
نسخ كل مرة: 5146 ms 4194304
resize في مكانه: 69 ms 4194304
نسخ كل مرة: 5125 ms 4194304
resize في مكانه: 56 ms 4194304
~~~

- **(أ)** في كل خطوة بتنسخ كل اللي فات: ١ KB ثم ٢ ثم ٣... لحد ٤ MB. المجموع حوالي ٤٠٩٦ × ٢ MB = ٨ GB نسخ، وده O(n²). و ٨ GB ذاكرة اتحجزت ورميت للـ garbage collector.
- **(ب)** [[maxByteLength]] بيخلي الـ engine يحجز مساحة العناوين (virtual memory) من الأول، و [[resize]] بيفعّل الـ pages اللي محتاجها بس، من غير ما ينسخ ولا byte. فالتكلفة بتاعة الـ ١ KB الجديد بس: O(n).
- الطريقة القديمة الكويسة قبل [[resize]]: تضاعف الحجم كل ما يتملى (زي الـ Array جوه V8)، وده O(n) برضه بس بيحجز لحد الضعف. و [[resize]] أوضح وبيحجز اللي محتاجه بالظبط.` },
          ],
          check: { lang: "js", starter: R`function ensureCapacity(buf, n) {
  // رجّع buffer فيه n byte على الأقل وفيه الـ bytes القديمة
}`, tests: R`test("كفاية: نفس الـ buffer", () => { const b = new ArrayBuffer(8); expect(ensureCapacity(b, 4) === b).toBe(true); });
test("resizable جوه الحد: نفس الـ buffer أكبر", () => { const b = new ArrayBuffer(2, { maxByteLength: 8 }); const r = ensureCapacity(b, 6); expect(r === b).toBe(true); expect(b.byteLength).toBe(6); });
test("عادي: بيتنقل والقديم detached", () => { const b = new ArrayBuffer(2); new Uint8Array(b)[0] = 7; const r = ensureCapacity(b, 5); expect(r.byteLength).toBe(5); expect(b.detached).toBe(true); expect(new Uint8Array(r)[0]).toBe(7); });
test("resizable أكبر من حده: بيتنقل من غير error", () => { const b = new ArrayBuffer(2, { maxByteLength: 4 }); new Uint8Array(b)[1] = 9; const r = ensureCapacity(b, 10); expect(r.byteLength).toBe(10); expect(new Uint8Array(r)[1]).toBe(9); });`, solution: R`function ensureCapacity(buf, n) {
  if (buf.byteLength >= n) return buf;
  if (buf.resizable && n <= buf.maxByteLength) { buf.resize(n); return buf; }
  return buf.transferToFixedLength(n);
}` },
          flag: "script",
          deep: {
            why: R`قبل ES2024 الـ buffer طوله ثابت للأبد، فأي حاجة بتكبر (ملف بيتبني، رسالة بتتجمع من الشبكة، ذاكرة wasm) كانت بتعمل buffer أكبر وتنسخ كل حاجة، وكل view قديم لازم يتعمل تاني. و [[resize]] بيحل ده في مكانه. والـ [[transfer]] بيحل مشكلة تانية: «مين صاحب الـ bytes دي دلوقتي؟». لما تسلّم buffer لـ Worker أو لمكتبة، الـ detach بيضمن إن محدش في الكود القديم هيكتب فيه بالغلط وهو في إيد حد تاني. وده كان موجود من زمان في [[postMessage]]، و [[transfer()]] جابه لكود JavaScript العادي.`,
            how: R`[[new ArrayBuffer(len, { maxByteLength })]] بيحجز مساحة عناوين [[maxByteLength]] من نظام التشغيل (virtual memory)، بس بيفعّل [[len]] بس. [[resize(n)]] بيفعّل أو يرجّع pages من غير ما يغيّر عنوان الذاكرة، فالـ views مش محتاجة تتعمل تاني: الـ length-tracking (من غير طول) بتحسب طولها كل مرة من [[byteLength]]، واللي ليها طول ثابت بتبقى «out of bounds» (طولها صفر) لو الـ buffer صغر عن نهايتها. الـ bytes الجديدة دايمًا أصفار، حتى لو كانت فيها حاجة قبل ما تصغّره. [[n]] أكبر من [[maxByteLength]] أو سالب: [[RangeError: ArrayBuffer.prototype.resize: Invalid length parameter]]، و [[maxByteLength]] أصغر من الطول وقت الإنشاء: [[RangeError: Invalid array buffer max length]].

[[transfer(n)]] بيعمل buffer جديد بنفس النوع (resizable يفضل resizable بنفس الحد، والعادي عادي)، ويحرّك الذاكرة نفسها لو يقدر (من غير نسخ)، أو ينسخ لو الطول اتغيّر، وبعدين يفصل القديم: [[byteLength]] صفر، و [[detached]] بـ [[true]]، و [[maxByteLength]] بيبقى صفر (و [[resizable]] بيفضل زي ما هو، اتجرّب: [[true]])، وأي method ([[slice]] و [[resize]] و [[transfer]]) بترمي [[TypeError: Cannot perform ... on a detached ArrayBuffer]]. والـ typed arrays عليه: القراية بـ index بترجّع [[undefined]] والكتابة بتتجاهَل **من غير error**، بس methods زي [[fill]] بترمي. [[transferToFixedLength(n)]] نفس الشيء والنتيجة دايمًا ثابتة الطول.`,
            when: R`[[resize]]: buffer بيتبني على دفعات وتعرف حد أقصى معقول (ملف بتجمعه من chunks، أو writer لـ format binary، أو ring buffer بيكبر). [[transfer]]: لما تسلّم الـ bytes لحد تاني وعايز تضمن إنك مش هتلمسها (API بيقبل buffer ويحتفظ بيه)، أو تحوّل buffer resizable لعادي بالطول اللي اتملى ([[transferToFixedLength]]) قبل ما تسلّمه، أو تكبّر buffer عادي (([[transfer(newLength)]] بدل [[new]] + [[set]]). [[detached]]: افحصه قبل ما تستخدم buffer ممكن يكون اتبعت لـ Worker أو اتنقل (مثلًا في cache).`,
            mistakes: R`- تعمل [[resize]] على buffer عادي: [[TypeError: Method ArrayBuffer.prototype.resize called on incompatible receiver #<ArrayBuffer>]]. لازم [[maxByteLength]] وقت الإنشاء.
- [[transfer(n)]] على resizable بطول أكبر من حده: [[RangeError: Invalid array buffer length]]. استخدم [[transferToFixedLength(n)]].
- تكمّل تستخدم view على buffer اتعمله [[transfer]]: القراية [[undefined]] والكتابة بتضيع ساكتة.
- تعمل view بـ offset أكبر من الطول **الحالي** حتى لو جوه [[maxByteLength]]: [[RangeError: Start offset 4 is outside the bounds of the buffer]].
- تفتكر الـ bytes بترجع لما تكبّر تاني بعد ما صغّرت: الجزء اللي اتشال بيرجع أصفار.
- تحط [[maxByteLength]] كبير جدًا «احتياطي» على أجهزة ٣٢ bit أو موبايل: مساحة العناوين محدودة والحجز ممكن يفشل. حط الحد اللي محتاجه فعلًا.`,
          },
          teach: R`## الفكرة في سطر

[[resize]] بيغيّر طول الـ buffer في مكانه، و [[transfer]] بينقل الـ bytes لـ buffer جديد ويسيب القديم فاضي (detached). الناتج من Node 24.22 (والمتصفحات: Chrome 111 و Firefox 128 و Safari 16.4 فيهم resizable، و [[transfer]] Baseline من ٢٠٢٤).

---

## ١. [[ArrayBuffer.prototype.resizable]] و [[ArrayBuffer.prototype.maxByteLength]]

~~~js
const buf = new ArrayBuffer(4, { maxByteLength: 16 });
console.log(buf.resizable, buf.byteLength, buf.maxByteLength);
~~~

~~~text الناتج
true 4 16
~~~

- التاني argument object options فيه [[maxByteLength]]: أقصى طول ممكن يوصله. وجوده هو اللي بيخلي الـ buffer resizable.
- [[resizable]]: [[true]] هنا، و [[false]] لأي [[new ArrayBuffer(n)]] عادي.
- [[maxByteLength]]: ١٦. وفي الـ buffer العادي بيساوي [[byteLength]] (اتجرّب: [[new ArrayBuffer(4).maxByteLength]] بـ ٤).
- [[maxByteLength]] أصغر من الطول: [[RangeError: Invalid array buffer max length]].

---

## ٢. [[ArrayBuffer.prototype.resize]]: والـ views بتتصرف إزاي

~~~js
const all = new Uint8Array(buf);
const firstTwo = new Uint8Array(buf, 0, 2);
all.set([1, 2, 3, 4]);
buf.resize(8);
console.log(all.length, firstTwo.length, all);
buf.resize(1);
console.log(all.length, firstTwo.length, firstTwo[1]);
try { buf.resize(32); } catch (e) { console.log(e.name + ': ' + e.message); }
~~~

~~~text الناتج
8 2 Uint8Array(8) [
  1, 2, 3, 4,
  0, 0, 0, 0
]
1 0 undefined
RangeError: ArrayBuffer.prototype.resize: Invalid length parameter
~~~

| الـ view | بعد [[resize(8)]] | بعد [[resize(1)]] |
|---|---|---|
| [[all]] من غير طول (length-tracking) | ٨: بيكبر مع الـ buffer، والجديد أصفار | ١: بيصغر معاه |
| [[firstTwo]] بطول ثابت ٢ | ٢: مبيتغيرش | صفر: الـ buffer بقى أقصر من نهايته فبقى «out of bounds» |

- [[resize(32)]] أكبر من [[maxByteLength]]: [[RangeError]].
- لو رجّعت كبّرته لـ ٢ أو أكتر، [[firstTwo]] بيرجع طوله ٢، بس الـ bytes اللي اتشالت بترجع **أصفار**.
- الذاكرة ما اتنقلتش: نفس الـ views شغالة من غير ما تعملها تاني. ده الفرق الكبير عن «اعمل buffer أكبر وانسخ».

---

## ٣. [[ArrayBuffer.prototype.transfer]] و [[ArrayBuffer.prototype.detached]]

~~~js
const moved = buf.transfer();
console.log(buf.detached, buf.byteLength, moved.byteLength, moved.resizable, all.length);
try { all[0] = 5; console.log('كتابة على view مفصول:', all[0]); buf.slice(0); } catch (e) { console.log(e.name + ': ' + e.message); }
~~~

~~~text الناتج
true 0 1 true 0
كتابة على view مفصول: undefined
TypeError: Cannot perform ArrayBuffer.prototype.slice on a detached ArrayBuffer
~~~

- [[buf.transfer()]]: buffer جديد [[moved]] فيه الـ byte الوحيد اللي كان في [[buf]]، ونفس النوع (resizable بنفس الحد ١٦).
- [[buf]] بقى **detached**: [[detached]] بـ [[true]] و [[byteLength]] صفر. والـ view [[all]] طوله صفر.
- الكتابة [[ all[0] = 5 ]] اتجاهلت والقراية [[undefined]]، **من غير error**. لكن [[buf.slice]] رمى [[TypeError]].

| على buffer detached | النتيجة (اتجرّب) |
|---|---|
| [[ view[i] ]] قراية | بترجّع [[undefined]] من غير أي error |
| [[ view[i] = x ]] كتابة | بتتجاهَل ساكتة، والقيمة مبتتكتبش في أي حتة |
| [[view.fill(1)]] وأي method على الـ view | [[TypeError: Cannot perform %TypedArray%.prototype.fill on a detached ArrayBuffer]]: الـ methods بتفحص وبترمي |
| [[new Uint8Array(buf)]] | [[TypeError: Cannot perform Construct on a detached ArrayBuffer]]: مينفعش view جديد |
| [[buf.transfer()]] تاني | [[TypeError: Cannot perform ArrayBuffer.prototype.transfer on a detached ArrayBuffer]]: اتنقل خلاص |
| [[dataView.getUint8(0)]] و [[dataView.byteLength]] | [[TypeError]] برضه، الـ [[DataView]] أشد من الـ typed array |

---

## ٤. [[ArrayBuffer.prototype.transferToFixedLength]]: والطول الجديد

~~~js
const fixed = moved.transferToFixedLength(6);
console.log(fixed.resizable, fixed.byteLength, new Uint8Array(fixed));
~~~

~~~text الناتج
false 6 Uint8Array(6) [ 1, 0, 0, 0, 0, 0 ]
~~~

- [[transferToFixedLength(6)]]: انقل وخلّي النتيجة buffer **عادي** بطول ٦: الـ byte القديم [[1]] والباقي أصفار.
- الاتنين بياخدوا طول اختياري: أقل = بيقص، وأكبر = بيكمّل أصفار، ومن غيره = نفس الطول.

| | [[transfer(n)]] | [[transferToFixedLength(n)]] |
|---|---|---|
| النتيجة من resizable | resizable بنفس [[maxByteLength]] | عادي ثابت |
| [[n]] أكبر من حد الـ resizable | [[RangeError: Invalid array buffer length]] | شغال عادي |
| القديم | detached | detached |

---

## ٥. فين بيحصل الـ detach من غير ما تنادي [[transfer]]

| الموقف | اللي بيتفصل |
|---|---|
| [[worker.postMessage(buf, [buf])]] | الـ buffer عندك بيتفصل، والـ bytes بتوصل للـ Worker (درس «Web Workers و worker_threads») |
| [[structuredClone(buf, { transfer: [buf] })]] | الأصل بيتفصل، والنسخة الراجعة هي صاحبة الـ bytes |
| [[memory.grow(n)]] في WebAssembly | [[memory.buffer]] القديم بيتفصل ويتعمل واحد أكبر (درس «WebAssembly في المتصفح») |
| [[reader.read(view)]] في BYOB streams | الـ view اللي اديته، وبيرجعلك واحد جديد |

فالقاعدة: لو buffer ممكن يكون اتبعت أو اتنقل، افحص [[buf.detached]] قبل ما تعتمد عليه، أو خد الـ buffer اللي راجع.

---

## الخلاصة

- [[maxByteLength]] وقت الإنشاء = buffer resizable، و [[resize]] بيكبّره أو يصغّره في مكانه، والـ views من غير طول بتمشي معاه.
- [[transfer]] و [[transferToFixedLength]] بينقلوا الـ bytes لـ buffer جديد، والقديم detached: طوله صفر والقراية منه [[undefined]] من غير error.
- النتيجة من [[transfer]] على resizable resizable برضه، فلو عايز طول أكبر من الحد أو buffer ثابت: [[transferToFixedLength]].`,
          lines: [
            R`buffer طوله ٤ دلوقتي، و [[maxByteLength: 16]] معناها يقدر يكبر لحد ١٦ في مكانه.`,
            R`بيطبع [[true]] (resizable) و ٤ (الطول الحالي) و ١٦ (الحد).`,
            R`view من غير طول: «length-tracking»، طوله دايمًا طول الـ buffer.`,
            R`view بطول ثابت ٢ من أول الـ buffer، عشان نقارن تصرفه بالأول.`,
            R`بنكتب ٤ أرقام في الـ ٤ bytes الموجودين.`,
            R`بنكبّر الـ buffer لـ ٨ في مكانه، من غير نسخ ومن غير ما نعمل views جديدة.`,
            R`[[all]] بقى ٨ والجديد أصفار، و [[firstTwo]] فضل ٢ لأن طوله ثابت.`,
            R`بنصغّر لـ byte واحد: البيانات اللي بعده بتتشال.`,
            R`[[all]] بقى ١، و [[firstTwo]] صفر لأنه محتاج ٢ bytes ومش موجودين، فالقراية [[undefined]].`,
            R`[[resize(32)]] أكبر من الحد ١٦، فبيرمي [[RangeError]] والـ [[catch]] بيطبع اسمه ورسالته.`,
            R`[[transfer()]] بينقل الـ bytes لـ buffer جديد [[moved]]، والقديم بيتفصل.`,
            R`القديم [[detached]] وطوله صفر، والجديد طوله ١ و resizable زي الأصل، و [[all]] بقى طوله صفر.`,
            R`الكتابة على الـ view المفصول بتتجاهَل والقراية [[undefined]]، بس [[slice]] على الـ buffer المفصول بيرمي [[TypeError]].`,
            R`[[transferToFixedLength(6)]] بينقل تاني لـ buffer عادي طوله ٦، والزيادة أصفار.`,
            R`بيطبع [[false]] (مش resizable) و ٦ والـ bytes: [[1]] وبعده ٥ أصفار.`,
          ],
          ref: [
            { t: "MDN: ArrayBuffer.prototype.resizable", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/resizable" },
            { t: "MDN: ArrayBuffer.prototype.maxByteLength", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/maxByteLength" },
            { t: "MDN: ArrayBuffer.prototype.resize()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/resize" },
            { t: "MDN: ArrayBuffer.prototype.transfer()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/transfer" },
            { t: "MDN: ArrayBuffer.prototype.transferToFixedLength()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/transferToFixedLength" },
            { t: "MDN: ArrayBuffer.prototype.detached", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/detached" },
          ],
          pre: [{ to: "js/ArrayBuffer: byteLength و slice و isView", why: R`الـ buffer العادي الثابت قبل اللي بيكبر` }, { to: "js/WebAssembly في المتصفح", why: R`[[memory.grow]] بيفصل الـ buffer القديم: نفس الفكرة من ناحية wasm` }],
        },
        {
          cmd: "TypedArray: العيلة و BYTES_PER_ELEMENT و overflow",
          title: "أنهي typed array تختار من الـ ١٢، وإيه اللي بيحصل لرقم مبيكفيش فيها؟",
          desc: R`فيه ١٢ typed array، كلهم بيفرقوا في حاجتين: **كام byte** للعنصر ([[TypedArray.BYTES_PER_ELEMENT]]) و**نوع الرقم** (صحيح بإشارة، صحيح من غير إشارة، عشري، BigInt).

• [[Uint8Array]] (0 لـ 255) و [[Int8Array]] (-128 لـ 127) و [[Uint8ClampedArray]] (0 لـ 255 بس بيقف عند الحدود).
• [[Int16Array]] و [[Uint16Array]] (٢ bytes)، و [[Int32Array]] و [[Uint32Array]] (٤).
• [[Float16Array]] و [[Float32Array]] و [[Float64Array]] للعشري (٢ و ٤ و ٨ bytes).
• [[BigInt64Array]] و [[BigUint64Array]] (٨ bytes، والقيم [[BigInt]] لازم).

الرقم اللي مبيكفيش **مبيرميش error**: بيلف (wrap): [[Uint8Array.of(256)]] بيبقى [[0]]، و [[Int16Array.of(40000)]] بيبقى [[-25536]]، إلا [[Uint8ClampedArray]] اللي بيقف عند 0 و 255. وكلهم أولاد class مخفية اسمها [[TypedArray]] فيها كل الـ methods.`,
          example: R`// نفس الـ 4 bytes بعيون مختلفة، والأرقام اللي مبتكفيش
const buf = new ArrayBuffer(4);
const u8 = new Uint8Array(buf);
const i8 = new Int8Array(buf);
const u16 = new Uint16Array(buf);
const u32 = new Uint32Array(buf);
u8.set([0x01, 0x02, 0xff, 0x80]);
console.log(u8, i8, u16, u32);
console.log(u32[0].toString(16), new Uint8Array(new Uint16Array([1]).buffer)[0] === 1 ? 'little-endian' : 'big-endian');
console.log(Uint8Array.of(256, 257, -1, 3.9), Int8Array.of(127 + 1, -129), Uint8ClampedArray.of(300, -5, 1.5, 2.5));
console.log(Float32Array.of(0.1)[0], Float16Array.of(0.1)[0], BigInt64Array.of(2n ** 63n)[0]);
console.log(Int16Array.BYTES_PER_ELEMENT, new Float64Array(3).byteLength, u16.length, u16.byteLength);`,
          try: R`اتوقّع قبل ما تشغّل: [[Int8Array.of(200)]] و [[Uint8Array.of(-1)]] و [[Uint8ClampedArray.of(-1, 300, 2.5, 3.5)]] و [[Int16Array.of(40000)]] و [[Uint32Array.of(-1)]]. وبعدين جرّب [[new Uint16Array('5')]]: إيه اللي حصل؟`,
          sol: R`~~~text الناتج (Node 24.22)
Int8Array(1) [ -56 ] Uint8Array(1) [ 255 ] Uint8ClampedArray(4) [ 0, 255, 2, 4 ] Int16Array(1) [ -25536 ] Uint32Array(1) [ 4294967295 ]
Uint16Array(5) [ 0, 0, 0, 0, 0 ]
~~~

- [[Int8Array.of(200)]]: ٢٠٠ أكبر من ١٢٧، فبيلف: ٢٠٠ - ٢٥٦ = -٥٦. القاعدة: خد الرقم «modulo ٢٥٦» وبعدين لو أكبر من ١٢٧ اطرح ٢٥٦.
- [[Uint8Array.of(-1)]]: -١ + ٢٥٦ = ٢٥٥. نفس الـ ٨ bits ([[ff]]) بس متقرية من غير إشارة.
- [[Uint8ClampedArray]]: -١ بقت 0 و ٣٠٠ بقت 255 (بيقف عند الحد)، و [[2.5]] بقت 2 و [[3.5]] بقت 4: التقريب لـ «أقرب زوجي» لما الكسر نص بالظبط (round half to even)، مش [[Math.round]].
- [[Int16Array.of(40000)]]: ٤٠٠٠٠ - ٦٥٥٣٦ = -٢٥٥٣٦. و [[Uint32Array.of(-1)]] = ٢ أس ٣٢ ناقص ١.
- [[new Uint16Array('5')]]: الـ argument الواحد اللي مش object بيتفهم **طول**، والنص [['5']] اتحوّل للرقم ٥، فعملت ٥ أصفار مش array فيها ٥. لو عايز القيمة: [[Uint16Array.of(5)]] أو [[Uint16Array.from(['5'])]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** typed array اتعملت من typed array تانية. اكتب السطرين:

~~~js
const f = new Float32Array([1.7, -1, 300]);
const c = new Uint8Array(f);
const s = new Uint8Array(f.buffer);
console.log(c, c.buffer === f.buffer);
console.log(s.length, s.buffer === f.buffer);
~~~`, done: R`كتبت الرقمين التلاتة في [[c]] صح، وعرفت إن [[s]] طولها ١٢ مش ٣، وتقدر تقول الفرق بين تمرير الـ typed array وتمرير الـ [[buffer]] بتاعها.`, sol: R`~~~text الناتج (Node 24.22)
Uint8Array(3) [ 1, 255, 44 ] false
12 true
~~~

- [[new Uint8Array(f)]] (typed array جوه typed array): **نسخ مع تحويل كل قيمة**: [[1.7]] بيتقص لـ 1 (مش تقريب)، و [[-1]] بيلف لـ 255، و [[300]] بيلف لـ 44 (٣٠٠ - ٢٥٦). و buffer جديد.
- [[new Uint8Array(f.buffer)]] ([[ArrayBuffer]]): **مشاركة** نفس الـ bytes من غير تحويل: الـ ٣ أرقام [[Float32]] = ١٢ byte، فبقى ١٢ عنصر بيقروا bytes الأرقام العشرية الخام.
- القاعدة: لو عايز «نفس الأرقام بنوع تاني» مرّر الـ typed array، ولو عايز «نفس الذاكرة بعين تانية» مرّر [[.buffer]] (ومعاه [[byteOffset]] و [[byteLength]] لو view جزئي).` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** فلتر بيفتّح صورة بيزوّد ٣٠ على كل byte في pixels الصورة. الـ pixel الأبيض تقريبًا ([[250]]) بقى غامق جدًا. شغّله وشوف ليه، وصلّحه بطريقتين:

~~~js
const px = Uint8Array.of(250, 100, 10);
console.log(px.map((v) => v + 30));
~~~`, done: R`الناتج بقى [[255, 130, 40]] بالطريقتين، وتقدر تقول ليه ٢٥٠ + ٣٠ بقت ٢٤.`, sol: R`~~~text الناتج قبل التصليح (Node 24.22)
Uint8Array(3) [ 24, 130, 40 ]
~~~

~~~js fixed.mjs
const px = Uint8Array.of(250, 100, 10);
const clamped = Uint8ClampedArray.from(px, (v) => v + 30);
const manual = px.map((v) => Math.min(255, v + 30));
console.log(clamped, manual);
~~~

~~~text الناتج (Node 24.22)
Uint8ClampedArray(3) [ 255, 130, 40 ] Uint8Array(3) [ 255, 130, 40 ]
~~~

- [[map]] على [[Uint8Array]] بترجّع [[Uint8Array]]، فـ ٢٨٠ اتكتبت فيها ولفّت: ٢٨٠ - ٢٥٦ = ٢٤. الأبيض بقى شبه أسود، ومفيش error.
- **الحل ١:** [[Uint8ClampedArray]]: أي قيمة أكبر من ٢٥٥ بتبقى ٢٥٥. ودي بالظبط سبب وجودها: هي نوع [[ctx.getImageData().data]] في الـ canvas.
- **الحل ٢:** [[Math.min(255, ...)]] بإيدك (ومعاها [[Math.max(0, ...)]] لو بتطرح). أوضح لما الـ array جاية من حتة تانية ومش في إيدك تغيّر نوعها.` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[pickType(values)]] بترجّع اسم أصغر typed array يشيل كل الأرقام الصحيحة دي من غير ما حاجة تلف: [['Uint8Array']] أو [['Int8Array']] أو [['Uint16Array']] أو [['Int16Array']] أو [['Uint32Array']] أو [['Int32Array']]. ولو فيه كسر أو رقم أكبر من ٣٢ bit: [['Float64Array']]. والـ array الفاضية: [['Uint8Array']].`, done: R`[[0, 255]] = Uint8، و [[-1, 100]] = Int8، و [[70000]] = Uint32، و [[-40000]] = Int32، و [[1.5]] = Float64، و [[2 ** 40]] = Float64، والتمرين اللي بيتصحح لوحده عدّى.`, sol: R`~~~js pick.mjs
const TYPES = [
  ['Uint8Array', 0, 255], ['Int8Array', -128, 127], ['Uint16Array', 0, 65535], ['Int16Array', -32768, 32767],
  ['Uint32Array', 0, 4294967295], ['Int32Array', -2147483648, 2147483647],
];
function pickType(values) {
  if (!values.every(Number.isInteger)) return 'Float64Array';
  const min = Math.min(...values, 0), max = Math.max(...values, 0);
  const hit = TYPES.find(([, lo, hi]) => min >= lo && max <= hi);
  return hit ? hit[0] : 'Float64Array';
}
console.log(pickType([0, 255]), pickType([-1, 100]), pickType([70000]), pickType([-40000]), pickType([1.5]), pickType([]), pickType([2 ** 40]));
~~~

~~~text الناتج (Node 24.22)
Uint8Array Int8Array Uint32Array Int32Array Float64Array Uint8Array Float64Array
~~~

- الحدود: من غير إشارة n bits = من 0 لـ 2 أس n ناقص 1، وبإشارة (two's complement) = من سالب 2 أس (n-1) لـ 2 أس (n-1) ناقص 1.
- الترتيب في [[TYPES]] بالحجم، وفي كل حجم من غير إشارة الأول، فـ [[find]] بيرجّع أصغر واحد ينفع.
- [[Math.min(...values, 0)]]: الصفر عشان الـ array الفاضية تدّي 0 مش [[Infinity]].
- [[Number.isInteger]] بيرفض [[1.5]] و [[NaN]]، فبيروحوا [[Float64Array]] (اللي بتشيل أي رقم JavaScript بالظبط لأن كل أرقام اللغة Float64 أصلًا).
- **ليه مش [[Float32Array]] للكسور؟** لأن [[0.1]] فيها بيبقى [[0.10000000149011612]]: مش «من غير ما حاجة تتغير».` },
            { lvl: 'تطبيق', t: R`**اشرحها:** الـ bytes [[0x12]] و [[0x34]] ورا بعض في buffer. [[new Uint16Array(buf)[0].toString(16)]] بيطبع [[3412]] مش [[1234]]. اكتب ٣ سطور لزميل: ليه؟ وإزاي تعرف الجهاز اللي شغال عليه؟ وإمتى ده يفرق معاك؟`, done: R`كتبت الشرح في ٣ سطور، وشغّلت [[isLittleEndian()]] على جهازك، وعرفت إن الحل لقراية ملف بترتيب معين هو [[DataView]].`, sol: R`~~~js endian.mjs
import { endianness } from 'node:os';
const v = new Uint16Array(Uint8Array.of(0x12, 0x34).buffer);
console.log(v[0].toString(16));
const isLittleEndian = () => new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
console.log(isLittleEndian(), endianness());
~~~

~~~text الناتج (Node 24.22، ويندوز 11 على x64)
3412
true LE
~~~

**الشرح لزميل:**
1. الرقم اللي أكبر من byte لازم يتقسم على كذا byte، والسؤال «مين الأول». الجهاز ده **little-endian**: الـ byte الصغير (اللي فيه الآحاد) الأول. فـ [[12 34]] في الذاكرة = [[0x3412]].
2. تعرف بتجربة: اكتب الرقم ١ في [[Uint16Array]] واقرا أول byte: لو [[1]] يبقى little. أو في Node: [[os.endianness()]] بيرجّع [['LE']] أو [['BE']]. كل أجهزة x86 و ARM اللي هتقابلها تقريبًا little.
3. بيفرق لما الـ bytes **جاية من برّه**: ملف أو شبكة أو جهاز ليه ترتيب متحدد (PNG والشبكة big-endian، و WAV و ZIP little). الـ typed arrays بتقرا بترتيب جهازك أيًا كان، فاستخدم [[DataView]] اللي بتختار فيه الترتيب بنفسك (الدرس بعد الجاي).` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** اجمع ١٠ مليون رقم صحيح في [[Array]] و [[Float64Array]] و [[Int32Array]]. مرة بدالة [[sum]] واحدة بتتنادى على التلاتة في نفس البرنامج، ومرة كل نوع في process لوحده. قيس الوقت والذاكرة.`, done: R`عندك أرقام الطريقتين، ولقيت إن الترتيب بيتقلب، وتقدر تقول الـ typed array بتكسب في إيه فعلًا.`, sol: R`~~~js sum-bench.mjs
// sum-bench.mjs: دالة واحدة على التلات أنواع في نفس البرنامج
const N = 10_000_000;
const plain = Array.from({ length: N }, (_, i) => i % 100);
const f64 = Float64Array.from(plain);
const i32 = Int32Array.from(plain);
function sum(xs) { let s = 0; for (let i = 0; i < xs.length; i++) s += xs[i]; return s; }
for (const [name, xs] of [['Array', plain], ['Float64Array', f64], ['Int32Array', i32]]) {
  sum(xs);
  const t = performance.now();
  const s = sum(xs);
  console.log(name.padEnd(12), s, (performance.now() - t).toFixed(1), 'ms');
}
~~~

~~~text الناتج (Node 24.22، ويندوز 11)
Array        495000000 6.2 ms
Float64Array 495000000 17.6 ms
Int32Array   495000000 22.0 ms
~~~

~~~js sum-one.mjs
// sum-one.mjs: node sum-one.mjs Array | Float64Array | Int32Array  (كل نوع في process لوحده)
const N = 10_000_000, kind = process.argv[2];
const plain = Array.from({ length: N }, (_, i) => i % 100);
const xs = kind === 'Array' ? plain : globalThis[kind].from(plain);
function sum(xs) { let s = 0; for (let i = 0; i < xs.length; i++) s += xs[i]; return s; }
sum(xs);
const t = performance.now();
const s = sum(xs);
console.log(kind.padEnd(12), s, (performance.now() - t).toFixed(1), 'ms', 'الذاكرة:', (process.memoryUsage().arrayBuffers / 1048576).toFixed(0), 'MB في buffers');
~~~

~~~text الناتج (Node 24.22، كل سطر process لوحده)
Array        495000000 6.2 ms الذاكرة: 0 MB في buffers
Float64Array 495000000 7.8 ms الذاكرة: 76 MB في buffers
Int32Array   495000000 5.7 ms الذاكرة: 38 MB في buffers
~~~

**اللي طلع:**
- في البرنامج الأول الـ typed arrays **أبطأ ٣ مرات**. مش لأنها بطيئة: الدالة [[sum]] اتنادت على ٣ أنواع مختلفة، فـ V8 بطّل يعملها optimize لنوع واحد (بقت «polymorphic») والأنواع اللي جت بعد الأول دفعت التمن.
- لما كل نوع لوحده، السرعة تقريبًا واحدة (٦ لـ ٨ ms): V8 بيعمل optimize ممتاز لـ Array أرقام صحيحة صغيرة كمان.
- **المكسب الحقيقي الذاكرة والشكل الثابت:** [[Int32Array]] نص [[Float64Array]] (٤ bytes مقابل ٨)، وكله في buffer واحد تقدر تبعته لـ Worker أو wasm أو GPU أو ملف من غير تحويل. متختارش typed array «عشان السرعة» من غير ما تقيس.` },
          ],
          check: { lang: "js", starter: R`function pickType(values) {
  // اسم أصغر typed array يشيل الأرقام دي، أو 'Float64Array'
}`, tests: R`test("0 و 255", () => expect(pickType([0, 255])).toBe('Uint8Array'));
test("سالب صغير", () => expect(pickType([-1, 100])).toBe('Int8Array'));
test("256", () => expect(pickType([256])).toBe('Uint16Array'));
test("-200", () => expect(pickType([-200, 5])).toBe('Int16Array'));
test("70000", () => expect(pickType([70000])).toBe('Uint32Array'));
test("-40000", () => expect(pickType([-40000])).toBe('Int32Array'));
test("كسر", () => expect(pickType([1, 1.5])).toBe('Float64Array'));
test("أكبر من 32 bit", () => expect(pickType([2 ** 40])).toBe('Float64Array'));
test("فاضية", () => expect(pickType([])).toBe('Uint8Array'));`, solution: R`const TYPES = [
  ['Uint8Array', 0, 255], ['Int8Array', -128, 127], ['Uint16Array', 0, 65535], ['Int16Array', -32768, 32767],
  ['Uint32Array', 0, 4294967295], ['Int32Array', -2147483648, 2147483647],
];
function pickType(values) {
  if (!values.every(Number.isInteger)) return 'Float64Array';
  const min = Math.min(...values, 0), max = Math.max(...values, 0);
  const hit = TYPES.find(([, lo, hi]) => min >= lo && max <= hi);
  return hit ? hit[0] : 'Float64Array';
}` },
          flag: "script",
          deep: {
            why: R`كل format binary بيحدد حجم ونوع كل رقم: الـ pixel ٤ أرقام [[Uint8]]، وعينة الصوت [[Int16]] أو [[Float32]]، وإحداثيات الـ 3D [[Float32]]، و IDs قواعد البيانات [[BigInt64]]. فاللغة محتاجة نوع لكل شكل من دول عشان تقرا الذاكرة زي ما هي من غير تحويل. واللف بدل الـ error مش «باج في JavaScript»: ده نفس سلوك الـ integers في C والـ CPU نفسه، وده اللي بيخلي الأرقام دي تتعامل مع الـ hardware والـ GPU والـ wasm مباشرة.`,
            how: R`لما تكتب [[ ta[i] = x ]]، الـ engine بيحوّل [[x]] لرقم ([[Number(x)]]: [['5']] بيبقى ٥ و [[null]] صفر و [[undefined]] و [[NaN]] صفر في الصحيح) وبعدين:
- **الأنواع الصحيحة:** بيشيل الكسر (truncate ناحية الصفر)، و [[Infinity]] و [[NaN]] بيبقوا صفر، وبعدين «modulo» ٢ أس عدد الـ bits، ولو النوع بإشارة والنتيجة فوق النص بيطرح ٢ أس عدد الـ bits (two's complement). يعني بياخد آخر n bits من الرقم.
- **[[Uint8ClampedArray]]:** بيقرّب لأقرب صحيح (ولو نص بالظبط لأقرب زوجي) وبيقف عند 0 و 255، و [[NaN]] صفر.
- **العشري:** بيقرّب لأقرب قيمة ممكنة في الحجم ده بمواصفة IEEE 754: [[Float32]] فيها حوالي ٧ أرقام دقة، و [[Float16]] حوالي ٣ وأقصاها ٦٥٥٠٤ (اتجرّب: [[Float16Array.of(70000)]] بـ [[Infinity]]).
- **BigInt:** لازم القيمة [[BigInt]]، ورقم عادي بيرمي [[TypeError: Cannot convert 1 to a BigInt]]، وبرضه بيلف على ٦٤ bit.

وكل الـ ١٢ constructor أولاد class واحدة مخفية (الـ spec بيسميها [[%TypedArray%]]، وبتجيبها بـ [[Object.getPrototypeOf(Int8Array)]]) فيها كل الـ methods والـ getters ([[buffer]] و [[length]]...). كل constructor بيزوّد [[BYTES_PER_ELEMENT]] بس. والـ constructor بيقبل ٤ أشكال: طول، أو array أو iterable (نسخ وتحويل)، أو typed array (نسخ وتحويل)، أو [[ArrayBuffer]] مع offset وطول (مشاركة، والـ offset لازم من مضاعفات حجم العنصر).`,
            when: R`[[Uint8Array]]: أي bytes خام (ملفات، شبكة، تشفير، نصوص UTF-8)، وده ٨٠٪ من الاستخدام. [[Uint8ClampedArray]]: pixels بتتعدّل بحساب. [[Int16Array]]: صوت PCM. [[Float32Array]]: WebGL و WebGPU و Web Audio وأرقام كتير الدقة بتاعتها مش مهمة (حساسات، ML). [[Float64Array]]: أرقام عشري لازم دقتها كاملة. [[Int32Array]] و [[Uint32Array]]: counters و indexes و hashes (وهما الوحيدين مع BigInt64 اللي [[Atomics.wait]] بيشتغل عليهم). [[BigInt64Array]]: timestamps بالنانو ثانية و IDs ٦٤ bit. [[Float16Array]] (Baseline من ٢٠٢٥: Chrome 135 و Firefox 129 و Safari 18.2، وموجودة في Node 24): أوزان نماذج ML وصور HDR لما الذاكرة أهم من الدقة.`,
            mistakes: R`- تستنى error لما الرقم يعدّي الحد: بيلف ساكت. [[Uint8Array.of(256)]] = 0.
- [[map]] على [[Uint8Array]] وانت بتزوّد: النتيجة بتلف (فلتر الصورة اللي بقى أسود). استخدم [[Uint8ClampedArray]] أو [[Math.min]].
- [[new Uint16Array('5')]] مستنيها array فيها ٥: دي ٥ أصفار. استخدم [[of]].
- [[new Int32Array(buffer, 2)]]: [[RangeError: start offset of Int32Array should be a multiple of 4]]. و buffer طوله ٧: [[RangeError: byte length of Int32Array should be a multiple of 4]].
- [[BigInt64Array.of(1)]]: [[TypeError: Cannot convert 1 to a BigInt]]. اكتب [[1n]].
- تحط [[0.1]] في [[Float32Array]] وتقارنه بـ [[0.1]]: [[0.10000000149011612]]. قارن بـ [[Math.fround(0.1)]] (درس «Math.sumPrecise و fround و f16round»).
- تقرا bytes ملف بـ [[Uint16Array]] على طول: بتقرا بترتيب جهازك مش ترتيب الملف. [[DataView]].
- [[new TypedArray()]] أو [[Uint8Array(2)]] من غير [[new]]: [[TypeError: Abstract class TypedArray not directly constructable]] و [[TypeError: Constructor Uint8Array requires 'new']].`,
          },
          teach: R`## الفكرة في سطر

كل typed array = حجم عنصر + نوع رقم، والرقم اللي مبيكفيش بيلف ساكت (إلا الـ clamped). الناتج من Node 24.22 على ويندوز 11 (x64، little-endian).

---

## ١. العيلة كلها: ١٢ نوع

| النوع | bytes | المدى | بيتستخدم في |
|---|---|---|---|
| [[Int8Array]] | ١ | -128 لـ 127 | عينات صوت ٨ bit بإشارة، فروق صغيرة |
| [[Uint8Array]] | ١ | 0 لـ 255 | أي bytes خام: ملفات وشبكة وتشفير و UTF-8 |
| [[Uint8ClampedArray]] | ١ | 0 لـ 255 وبيقف عند الحدود | pixels الـ canvas ([[getImageData().data]]) |
| [[Int16Array]] | ٢ | -32768 لـ 32767 | صوت PCM ١٦ bit (ملفات WAV) |
| [[Uint16Array]] | ٢ | 0 لـ 65535 | indexes في WebGL، و UTF-16 |
| [[Int32Array]] | ٤ | حوالي ±٢ مليار | counters مشتركة مع [[Atomics]] |
| [[Uint32Array]] | ٤ | 0 لـ 4294967295 | hashes و CRC32 والألوان كرقم واحد |
| [[Float16Array]] | ٢ | لحد 65504، حوالي ٣ أرقام دقة | أوزان ML و HDR (Baseline ٢٠٢٥) |
| [[Float32Array]] | ٤ | حوالي ٧ أرقام دقة | WebGL و WebGPU و Web Audio |
| [[Float64Array]] | ٨ | نفس رقم JavaScript العادي بالظبط | حسابات عشري بدقة كاملة |
| [[BigInt64Array]] | ٨ | ±٩.٢ × ١٠ أس ١٨، كـ [[BigInt]] | timestamps بالنانو، IDs ٦٤ bit |
| [[BigUint64Array]] | ٨ | 0 لـ ١.٨ × ١٠ أس ١٩، كـ [[BigInt]] | hashes ٦٤ bit |

---

## ٢. [[TypedArray.BYTES_PER_ELEMENT]]: حجم العنصر

~~~js
for (const C of [Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float16Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array]) console.log(C.name.padEnd(18), C.BYTES_PER_ELEMENT, new C(1).BYTES_PER_ELEMENT);
~~~

~~~text الناتج
Int8Array          1 1
Uint8Array         1 1
Uint8ClampedArray  1 1
Int16Array         2 2
Uint16Array        2 2
Int32Array         4 4
Uint32Array        4 4
Float16Array       2 2
Float32Array       4 4
Float64Array       8 8
BigInt64Array      8 8
BigUint64Array     8 8
~~~

[[BYTES_PER_ELEMENT]] موجود على الـ constructor ([[Int16Array.BYTES_PER_ELEMENT]]) وعلى أي نسخة منه، وبيستخدم في الحساب: عدد العناصر اللي في buffer = [[buf.byteLength / C.BYTES_PER_ELEMENT]].

---

## ٣. نفس الـ bytes بعيون مختلفة، و endianness

~~~js
const buf = new ArrayBuffer(4);
const u8 = new Uint8Array(buf);
const i8 = new Int8Array(buf);
const u16 = new Uint16Array(buf);
const u32 = new Uint32Array(buf);
u8.set([0x01, 0x02, 0xff, 0x80]);
console.log(u8, i8, u16, u32);
console.log(u32[0].toString(16), new Uint8Array(new Uint16Array([1]).buffer)[0] === 1 ? 'little-endian' : 'big-endian');
~~~

~~~text الناتج
Uint8Array(4) [ 1, 2, 255, 128 ] Int8Array(4) [ 1, 2, -1, -128 ] Uint16Array(2) [ 513, 33023 ] Uint32Array(1) [ 2164195841 ]
80ff0201 little-endian
~~~

- [[Int8Array]] قرا نفس الـ bytes بإشارة: [[ff]] = -1 و [[80]] = -128 (أعلى bit = إشارة، two's complement).
- [[Uint16Array]] أول عنصر = الـ bytes [[01 02]]، بس الرقم ٥١٣ = [[0x0201]]: الـ byte التاني هو الكبير. ده **little-endian**: الصغير الأول.
- [[Uint32Array]] الـ ٤ bytes بالعكس: [[0x80ff0201]].
- السطر التاني بيكشف الجهاز: اكتب ١ في ٢ bytes، لو أول byte = ١ يبقى little.

الـ typed arrays دايمًا بتقرا **بترتيب جهازك**. معظم الأجهزة little، بس ملفات PNG والشبكة big. لو هتقرا format من برّه: [[DataView]] (الدرس الجاي بعد الجاي).

---

## ٤. الرقم اللي مبيكفيش: wrap و clamp و تقريب

~~~js
console.log(Uint8Array.of(256, 257, -1, 3.9), Int8Array.of(127 + 1, -129), Uint8ClampedArray.of(300, -5, 1.5, 2.5));
console.log(Float32Array.of(0.1)[0], Float16Array.of(0.1)[0], BigInt64Array.of(2n ** 63n)[0]);
~~~

~~~text الناتج
Uint8Array(4) [ 0, 1, 255, 3 ] Int8Array(2) [ -128, 127 ] Uint8ClampedArray(4) [ 255, 0, 2, 2 ]
0.10000000149011612 0.0999755859375 -9223372036854775808n
~~~

| القيمة | في | بتبقى | القاعدة |
|---|---|---|---|
| 256 و 257 | [[Uint8Array]] | 0 و 1 | بتلف: آخر ٨ bits بس (modulo ٢٥٦) |
| -1 | [[Uint8Array]] | 255 | نفس الـ bits [[ff]] متقرية من غير إشارة |
| 3.9 | [[Uint8Array]] | 3 | الكسر بيتشال (truncate) مش تقريب |
| 128 و -129 | [[Int8Array]] | -128 و 127 | بتلف من الناحية التانية |
| 300 و -5 | [[Uint8ClampedArray]] | 255 و 0 | بيقف عند الحد |
| 1.5 و 2.5 | [[Uint8ClampedArray]] | 2 و 2 | تقريب لأقرب **زوجي** لما الكسر نص |
| 0.1 | [[Float32Array]] و [[Float16Array]] | 0.10000000149011612 و 0.0999755859375 | أقرب قيمة ممكنة في ٤ و ٢ bytes |
| 2 أس 63 | [[BigInt64Array]] | -9223372036854775808n | BigInt بيلف على ٦٤ bit برضه |

وكمان: [[NaN]] و [[Infinity]] في الأنواع الصحيحة صفر، و [[Float16Array.of(70000)]] بـ [[Infinity]] (أكبر من أقصاها)، و [[Float32Array.of(16777217)]] بـ 16777216 (أكبر من دقتها). **مفيش ولا error** في كل ده.

---

## ٥. [[TypedArray.prototype.buffer]] و [[TypedArray.prototype.byteOffset]] و [[TypedArray.prototype.byteLength]] و [[TypedArray.prototype.length]]

~~~js
const buf = new ArrayBuffer(16);
const mid = new Int16Array(buf, 4, 3);
console.log(mid.buffer === buf, mid.byteOffset, mid.length, mid.byteLength, mid.BYTES_PER_ELEMENT);
const copy = new Int16Array(mid);
console.log(copy.buffer === buf, copy.byteOffset, copy.byteLength, copy.buffer.byteLength);
~~~

~~~text الناتج
true 4 3 6 2
false 0 6 6
~~~

| الـ getter | قيمته هنا | معناه |
|---|---|---|
| [[buffer]] | [[buf]] نفسه | الـ [[ArrayBuffer]] اللي تحت الـ view |
| [[byteOffset]] | ٤ | الـ view بيبدأ من byte رقم ٤ في الـ buffer |
| [[length]] | ٣ | عدد **العناصر** |
| [[byteLength]] | ٦ | عدد الـ **bytes** = [[length]] × [[BYTES_PER_ELEMENT]] |

و [[new Int16Array(mid)]] (typed array جوه constructor) **نسخ**: buffer جديد بالمقاس، و [[byteOffset]] صفر.

---

## ٦. الـ constructor بـ ٤ أشكال

| الشكل | بيعمل إيه (اتجرّب) |
|---|---|
| [[new Uint8Array(4)]] | ٤ عناصر أصفار، و buffer جديد |
| [[new Uint8Array([1, 2, 3])]] أو [[new Uint8Array(new Set([1, 2, 3]))]] | نسخ من array أو أي iterable، وكل قيمة بتتحوّل |
| [[new Uint8Array(new Float32Array([1.7, -1, 300]))]] | نسخ وتحويل كل قيمة للنوع الجديد: [[1, 255, 44]] |
| [[new Uint8Array(buffer, byteOffset, length)]] | view **مشترك** على buffer موجود، من غير نسخ |
| [[Uint8Array.of(5)]] و [[Uint8Array.from(x, fn)]] | زي [[Array.of]] و [[Array.from]] (درس «TypedArray: set و subarray») |

والأخطاء اللي هتقابلها:

| الكود | الخطأ |
|---|---|
| [[new Int32Array(new ArrayBuffer(8), 2)]] | [[RangeError: start offset of Int32Array should be a multiple of 4]]: الـ offset لازم من مضاعفات ٤ |
| [[new Int32Array(new ArrayBuffer(7))]] | [[RangeError: byte length of Int32Array should be a multiple of 4]]: الطول كمان |
| [[new Int32Array(new ArrayBuffer(8), 0, 3)]] | [[RangeError: Invalid typed array length: 3]]: ٣ × ٤ = ١٢ أكبر من الـ ٨ |
| [[Uint8Array(2)]] | [[TypeError: Constructor Uint8Array requires 'new']]: الـ constructors كلها محتاجة [[new]] |
| [[new Uint16Array('5')]] | مش error: ٥ أصفار، لأن الـ argument اتفهم طول |

---

## ٧. [[TypedArray]]: الأب المخفي

~~~js
const TA = Object.getPrototypeOf(Int8Array);
console.log(TA.name, TA === Object.getPrototypeOf(Float64Array));
try { new TA(); } catch (e) { console.log(e.name + ': ' + e.message); }
~~~

~~~text الناتج
TypedArray true
TypeError: Abstract class TypedArray not directly constructable
~~~

- مفيش global اسمه [[TypedArray]]، بس هو موجود: أبو الـ ١٢ كلهم، وعليه كل الـ methods ([[map]] و [[set]] و [[subarray]]...) والـ getters ([[buffer]] و [[length]]...). فلما MDN يكتب [[TypedArray.prototype.map]] يقصد [[map]] بتاعة أي واحد فيهم.
- «abstract»: مينفعش تعمل منه نسخة مباشرة. وده بيخليك تفحص أي typed array بـ [[x instanceof TA]] (أو [[ArrayBuffer.isView(x) && !(x instanceof DataView)]]).

---

## الخلاصة

- اختار بالحجم والنوع: bytes خام [[Uint8Array]]، و pixels [[Uint8ClampedArray]]، وصوت [[Int16Array]] أو [[Float32Array]]، و ٦٤ bit [[BigInt64Array]].
- الرقم اللي مبيكفيش بيلف ساكت، والكسر بيتشال في الصحيح، والـ clamped بيقف ويقرّب لأقرب زوجي.
- الـ typed arrays بتقرا بترتيب جهازك (little-endian غالبًا)؛ للملفات والشبكة [[DataView]].
- [[byteLength]] = [[length]] × [[BYTES_PER_ELEMENT]]، و [[byteOffset]] مكان البداية في الـ [[buffer]].`,
          lines: [
            R`buffer فيه ٤ bytes، هنقراهم بأربع عيون مختلفة.`,
            R`[[Uint8Array]]: كل byte رقم من 0 لـ 255.`,
            R`[[Int8Array]] على نفس الـ bytes: كل byte رقم بإشارة من -128 لـ 127.`,
            R`[[Uint16Array]]: كل ٢ bytes رقم واحد، فطولها ٢.`,
            R`[[Uint32Array]]: الـ ٤ bytes كلهم رقم واحد.`,
            R`بنكتب ٤ bytes بالـ hex من خلال الـ [[Uint8Array]]: ١ و ٢ و ٢٥٥ و ١٢٨.`,
            R`بيطبع نفس الـ bytes بالأربع أشكال: [[ff]] بقت -1 في [[Int8Array]]، و ٥١٣ = [[0x0201]] لأن الـ byte الصغير الأول.`,
            R`الـ [[Uint32]] بالـ hex [[80ff0201]] (الـ bytes بالعكس)، وبعدين بنكتب ١ في ٢ bytes ونشوف أول byte عشان نعرف الجهاز little-endian.`,
            R`أرقام برّه المدى: ٢٥٦ لفّت لـ 0 و -1 لـ 255 و [[3.9]] اتقصت لـ 3، و [[Int8]] لفّت من الناحيتين، والـ clamped وقف عند 255 و 0 وقرّب [[2.5]] لـ 2.`,
            R`[[0.1]] في ٤ bytes وفي ٢ bytes بتبقى أقرب قيمة ممكنة مش [[0.1]] بالظبط، و ٢ أس ٦٣ في [[BigInt64]] لفّت لأصغر رقم سالب.`,
            R`[[BYTES_PER_ELEMENT]] بتاع [[Int16Array]] = ٢، و ٣ عناصر [[Float64]] = ٢٤ byte، و [[u16]] فيها عنصرين في ٤ bytes.`,
          ],
          ref: [
            { t: "MDN: TypedArray", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray" },
            { t: "MDN: TypedArray.BYTES_PER_ELEMENT", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/BYTES_PER_ELEMENT" },
            { t: "MDN: Uint8ClampedArray", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray" },
            { t: "MDN: Int16Array", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int16Array" },
            { t: "MDN: Float16Array", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float16Array" },
            { t: "MDN: BigInt64Array", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt64Array" },
            { t: "MDN: TypedArray.prototype.byteOffset", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/byteOffset" },
            { t: "MDN: Endianness", url: "https://developer.mozilla.org/en-US/docs/Glossary/Endianness" },
          ],
          pre: [{ to: "js/bitwise و shifts", why: R`two's complement والـ bits: ليه -1 = [[ff]]` }, { to: "js/BigInt بعمق", why: R`قيم [[BigInt64Array]] لازم BigInt` }, { to: "js/Math.sumPrecise و fround و f16round", why: R`الدقة في [[Float32]] و [[Float16]]` }],
        },
        {
          cmd: "TypedArray: set و subarray و slice و كل الـ methods",
          title: "إيه الـ methods اللي في الـ typed arrays، وأنهي واحدة بتنسخ وأنهي بتشارك الذاكرة؟",
          desc: R`الـ typed arrays فيها تقريبًا كل methods الـ [[Array]] ([[map]] و [[filter]] و [[find]] و [[at]] و [[toSorted]]...) وزيادة اتنين مهمين جدًا:

• [[ta.subarray(start, end)]]: view **جديد على نفس الذاكرة** من غير نسخ. التعديل فيه بيظهر في الأصل.
• [[ta.set(source, offset)]]: بيكتب array أو typed array جوه [[ta]] من مكان [[offset]] دفعة واحدة.
• و [[ta.slice(start, end)]] (زي الـ Array): **نسخة** مستقلة.

والفروق عن الـ Array: مفيش [[push]] ولا [[pop]] ولا [[splice]] ولا [[concat]] ولا [[flat]] (الطول ثابت)، و [[sort()]] من غير دالة بيرتب **بالأرقام** مش كنصوص، و [[map]] و [[filter]] بيرجّعوا نفس النوع (فالنتيجة بتلف لو مبتكفيش).`,
          example: R`// subarray بيشارك نفس الذاكرة، و slice بينسخ، و set بيكتب دفعة واحدة
const packet = Uint8Array.from([0xca, 0xfe, 3, 10, 20, 30, 0, 0]);
const header = packet.subarray(0, 2);
const body = packet.slice(3, 6);
header[0] = 0;
body[0] = 99;
console.log(packet, header, body);
console.log(header.buffer === packet.buffer, body.buffer === packet.buffer, packet.subarray(3).byteOffset);
packet.set([7, 8], 6);
console.log(packet.at(-1), packet.indexOf(30), packet.includes(99));
const temps = Int16Array.of(30, -5, 12, 100, 7);
console.log(temps.toSorted(), [30, -5, 12, 100, 7].toSorted());
console.log(temps.map((t) => t * 1000), temps.filter((t) => t > 10), temps.join(' | '));
try { temps.push(1); } catch (e) { console.log(e.name + ': ' + e.message); }`,
          try: R`اعمل [[Uint8Array]] فيها الأرقام من 0 لـ 9، وقسّمها لحتت كل واحدة ٤ بـ [[subarray]]. اكتب [[99]] في أول عنصر في الحتة التالتة، واطبع الأصل. وبعدين كرّر بـ [[slice]] بدل [[subarray]]: إيه اللي اختلف؟`,
          sol: R`~~~js parts.mjs
const data = Uint8Array.from({ length: 10 }, (_, i) => i);
const views = [data.subarray(0, 4), data.subarray(4, 8), data.subarray(8)];
views[2][0] = 99;
console.log(data[8], views.map((v) => v.byteOffset));
const copies = [data.slice(0, 4), data.slice(4, 8), data.slice(8)];
copies[2][0] = 55;
console.log(data[8], copies.map((c) => c.byteOffset));
~~~

~~~text الناتج (Node 24.22)
99 [ 0, 4, 8 ]
99 [ 0, 0, 0 ]
~~~

- [[subarray]]: الـ ٣ حتت views على نفس الـ buffer بـ offsets [[0, 4, 8]]، فالكتابة في التالتة كتبت في [[ data[8] ]].
- [[slice]]: ٣ نسخ، كل واحدة buffer لوحدها بـ offset صفر، فـ [[55]] مظهرتش في الأصل (لسه [[99]] من الخطوة اللي فاتت).
- [[Uint8Array.from({ length: 10 }, fn)]]: object فيه [[length]] بيتعامل زي array طولها ١٠، و [[fn]] بتطلّع كل قيمة من الـ index.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** إيه اللي هيتطبع؟ ركّز في التاني:

~~~js
const bytes = Uint8Array.of(0, 15, 255);
console.log(bytes.map((b) => b.toString(16).padStart(2, '0')).join(' '));
console.log(Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join(' '));
~~~`, done: R`كتبت السطرين صح، وتقدر تقول ليه الأول [[0 0 0]].`, sol: R`~~~text الناتج (Node 24.22)
0 0 0
00 0f ff
~~~

- [[bytes.map]] بترجّع **[[Uint8Array]]**، فكل نص بترجّعه الدالة بيتحوّل رقم عشان يتخزن: [['00']] بقى ٠، و [['0f']] و [['ff']] [[NaN]] ومنها ٠. وبعدين [[join]] بيكتب الأصفار.
- [[Array.from(bytes, fn)]] بيعمل [[Array]] عادية، فالنصوص بتفضل نصوص.
- القاعدة: لو النتيجة مش أرقام من نفس النوع (نصوص، objects، أرقام أكبر)، اطلع لـ [[Array]] الأول: [[Array.from(ta, fn)]] أو [[ [...ta].map(fn) ]].` },
            { lvl: 'تطبيق', t: R`**ابني:** [[chunks(bytes, size)]] بتقسّم [[Uint8Array]] لحتت طول كل واحدة [[size]] (والأخيرة ممكن أقصر) **من غير نسخ ولا byte**. ولو [[size]] مش رقم صحيح أكبر من صفر ترمي [[RangeError]]. ده اللي بتعمله لما تبعت ملف كبير على دفعات.`, done: R`١٠ bytes بـ size ٤ بتطلع أطوال [[4, 4, 2]] و offsets [[0, 4, 8]] وكلهم نفس الـ buffer، والـ array الفاضية بتطلع صفر حتت، و size صفر بيرمي، والتمرين اللي بيتصحح لوحده عدّى.`, sol: R`~~~js chunks.mjs
function chunks(bytes, size) {
  if (!Number.isInteger(size) || size < 1) throw new RangeError('size لازم رقم صحيح أكبر من صفر: ' + size);
  const out = [];
  for (let at = 0; at < bytes.length; at += size) out.push(bytes.subarray(at, at + size));
  return out;
}
const data = Uint8Array.from({ length: 10 }, (_, i) => i);
const parts = chunks(data, 4);
console.log(parts.map((p) => p.length), parts.map((p) => p.byteOffset), parts.every((p) => p.buffer === data.buffer));
parts[2][0] = 99;
console.log(data[8], chunks(new Uint8Array(0), 3).length);
try { chunks(data, 0); } catch (e) { console.log(e.name + ': ' + e.message); }
~~~

~~~text الناتج (Node 24.22)
[ 4, 4, 2 ] [ 0, 4, 8 ] true
99 0
RangeError: size لازم رقم صحيح أكبر من صفر: 0
~~~

- [[subarray(at, at + size)]]: لو [[at + size]] أكبر من الطول بيتقص لوحده، فالحتة الأخيرة طولها ٢ من غير حساب.
- **ليه الفحص؟** من غيره [[size]] صفر = loop لانهائي ([[at]] مبيزيدش)، و [[size]] سالب نفس الكلام.
- كل الحتت views، فالذاكرة الإضافية objects صغيرة بس. لكن خلي بالك: لو الأصل اتعمله [[transfer]] أو اتبعت لـ Worker، كل الحتت بتبقى فاضية معاه.` },
            { lvl: 'تطبيق', t: R`**محاكاة:** نافذة آخر ٤ قراءات حساس في [[Float32Array(4)]]: كل قراية جديدة بتزق القديمة شمال بـ [[copyWithin]] وتتكتب في الآخر، والمتوسط بـ [[reduce]]. ابعت القراءات [[1, 2, 3, 4, 5, 6]] واطبع النافذة والمتوسط.`, done: R`النافذة في الآخر [[3, 4, 5, 6]] والمتوسط [[4.5]]، ومفيش أي array جديدة اتعملت في كل قراية.`, sol: R`~~~js window.mjs
const win = new Float32Array(4);
function push(w, value) {
  w.copyWithin(0, 1);
  w[w.length - 1] = value;
  return w;
}
for (const v of [1, 2, 3, 4, 5, 6]) push(win, v);
console.log(win, win.reduce((s, x) => s + x) / win.length);
~~~

~~~text الناتج (Node 24.22)
Float32Array(4) [ 3, 4, 5, 6 ] 4.5
~~~

- [[copyWithin(0, 1)]]: انسخ من مكان ١ للآخر وحطه من مكان ٠، يعني زق كل حاجة خطوة شمال جوه نفس الـ buffer (والأقدم بيتمسح). ده بديل [[shift]] + [[push]] اللي مش موجودين.
- أول ٣ قراءات النافذة فيها أصفار من الأول ([[0, 0, 0, 1]])، فالمتوسط غلط في الأول. لو ده مهم، احسب عدد القراءات الحقيقي.
- لنافذة كبيرة (ألف قراية) الزق كل مرة بيبقى مكلف: الأحسن ring buffer بـ index بيلف (فكرة مشروع «ring buffer» في درس «Atomics»).` },
            { lvl: 'تطبيق', t: R`**قارن:** رتّب [[10, 9, 100, -2.5]] بـ [[toSorted()]] كـ [[Float32Array]] وكـ [[Array]]، وبعدين رتّب الـ [[Float32Array]] من الكبير للصغير.`, done: R`عرفت إن الـ Array رتبت [[-2.5, 10, 100, 9]] والـ typed array [[-2.5, 9, 10, 100]]، والتنازلي بدالة مقارنة.`, sol: R`~~~js sort.mjs
const t = Float32Array.of(10, 9, 100, -2.5);
console.log(t.toSorted(), [10, 9, 100, -2.5].toSorted(), t.toSorted((a, b) => b - a));
~~~

~~~text الناتج (Node 24.22)
Float32Array(4) [ -2.5, 9, 10, 100 ] [ -2.5, 10, 100, 9 ] Float32Array(4) [ 100, 10, 9, -2.5 ]
~~~

- [[Array.prototype.sort]] من غير دالة بيحوّل كل حاجة نص ويرتب حرف حرف: [['10']] قبل [['100']] قبل [['9']] (درس «sort و toSorted»).
- الـ typed array كل عناصرها أرقام، فالترتيب الافتراضي **رقمي** (وبيحط [[NaN]] في الآخر و [[-0]] قبل [[0]]).
- [[toSorted]] بترجّع نسخة والأصل زي ما هو، و [[sort]] بترتب في مكانها. والدالة [[(a, b) => b - a]] تنازلي.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** اعمل [[class Pixels extends Uint8ClampedArray {}]]. أنهي methods بترجّع [[Pixels]] وأنهي بترجّع [[Uint8ClampedArray]]: [[map]] و [[subarray]] و [[slice]] و [[filter]] و [[toSorted]] و [[toReversed]]؟ وإيه اللي بيتغيّر لو عملت [[static get [Symbol.species] ]] بيرجّع [[Uint8Array]]؟ جاوب من MDN صفحة [[TypedArray[Symbol.species] ]] وأكّد بالتشغيل.`, done: R`عندك جدول الـ ٦ methods بالنوع اللي راجع، ولقيت إن [[toSorted]] و [[toReversed]] مختلفين عن الباقي.`, sol: R`~~~js species.mjs
class Pixels extends Uint8ClampedArray {}
const p = Pixels.of(1, 2, 3);
console.log(p.map((x) => x * 2) instanceof Pixels, p.subarray(1) instanceof Pixels, p.slice(1) instanceof Pixels, p.filter((x) => x > 1).constructor.name, p.toSorted() instanceof Pixels, p.toReversed().constructor.name);
class Plain extends Uint8Array {
  static get [Symbol.species]() { return Uint8Array; }
}
const q = Plain.of(1, 2);
console.log(q.map((x) => x).constructor.name, q.subarray(0).constructor.name, q.toReversed().constructor.name);
~~~

~~~text الناتج (Node 24.22)
true true true Pixels false Uint8ClampedArray
Uint8Array Uint8Array Uint8Array
~~~

**الإجابة:**
- [[map]] و [[subarray]] و [[slice]] و [[filter]] بيسألوا [[this.constructor[Symbol.species] ]] (الافتراضي = نفس الـ class)، فبيرجّعوا [[Pixels]].
- [[toSorted]] و [[toReversed]] (وكمان [[with]]) **مبيسألوش** الـ species: بيرجّعوا دايمًا النوع الأساسي ([[Uint8ClampedArray]]). ده قرار في المواصفة لما ضافوا الـ methods الجديدة دي (ES2023): الـ species بيعقّد الـ engines ونادرًا حد بيحتاجه.
- لما [[Plain]] رجّع [[Uint8Array]] من الـ species، كل اللي بيسأل بقى بيرجّع [[Uint8Array]] (حتى [[subarray]]).` },
          ],
          check: { lang: "js", starter: R`function chunks(bytes, size) {
  // حتت طولها size من غير نسخ (subarray)، و RangeError لو size مش صحيح أكبر من صفر
}`, tests: R`const data = Uint8Array.from({ length: 10 }, (_, i) => i);
test("الأطوال", () => expect(chunks(data, 4).map((p) => p.length)).toEqual([4, 4, 2]));
test("الـ offsets", () => expect(chunks(data, 4).map((p) => p.byteOffset)).toEqual([0, 4, 8]));
test("من غير نسخ", () => expect(chunks(data, 3).every((p) => p.buffer === data.buffer)).toBe(true));
test("size أكبر من الطول", () => expect(chunks(data, 50).length).toBe(1));
test("فاضية", () => expect(chunks(new Uint8Array(0), 3).length).toBe(0));
test("size صفر", () => expect(() => chunks(data, 0)).toThrow("size لازم"));
test("size كسر", () => expect(() => chunks(data, 1.5)).toThrow("size لازم"));`, solution: R`function chunks(bytes, size) {
  if (!Number.isInteger(size) || size < 1) throw new RangeError('size لازم رقم صحيح أكبر من صفر: ' + size);
  const out = [];
  for (let at = 0; at < bytes.length; at += size) out.push(bytes.subarray(at, at + size));
  return out;
}` },
          flag: "script",
          deep: {
            why: R`الـ typed arrays أخدت methods الـ Array عشان تتعامل معاها زي أي قايمة أرقام، بس الطول الثابت والنوع الواحد خلّوا شوية methods مش منطقية ([[push]] و [[splice]] و [[concat]] و [[flat]]). وفي المقابل الشغل مع الـ bytes محتاج حاجتين الـ Array معندهاش: تشاور على حتة من الذاكرة من غير نسخ ([[subarray]]: header ملف، أو chunk هيتبعت)، وتكتب bytes جاهزة في مكان معين دفعة واحدة ([[set]]: تجميع رسالة من أجزاء). الاتنين دول بيشتغلوا بسرعة نسخ الذاكرة نفسها (memcpy) مش عنصر عنصر.`,
            how: R`[[subarray(start, end)]] بيعمل object جديد من نفس النوع على **نفس** [[buffer]] بـ [[byteOffset]] جديد (= القديم + [[start]] × حجم العنصر). [[slice]] بيحجز buffer جديد وينسخ. [[set(source, offset)]]: لو [[source]] typed array من نفس النوع بينسخ الـ bytes مرة واحدة (وبيتعامل صح حتى لو الاتنين على نفس الـ buffer ومتداخلين)، ولو نوع تاني أو Array بيحوّل كل قيمة. و [[offset + source.length]] أكبر من الطول: [[RangeError: offset is out of bounds]].

[[map]] و [[filter]] و [[slice]] و [[subarray]] بيعملوا النتيجة من [[this.constructor[Symbol.species] ]]، فالنتيجة من نفس النوع وأي قيمة بتتحوّل (وتلف). و [[toSorted]] و [[toReversed]] و [[with]] (ES2023) بيرجّعوا النوع الأساسي من غير species. و [[sort()]] من غير دالة بيقارن **أرقام** (مش نصوص زي الـ Array)، و [[NaN]] في الآخر. و [[includes(NaN)]] بـ [[true]] و [[indexOf(NaN)]] بـ [[-1]] زي الـ Array. و [[ [Symbol.iterator] ]] هو نفسه [[values]]، و [[toString]] هو نفس دالة [[Array.prototype.toString]] بالظبط. وكل الـ methods بتفحص إن [[this]] typed array: [[Uint8Array.prototype.map.call([1, 2], fn)]] بيرمي [[TypeError: this is not a typed array.]]، أما العكس ([[Array.prototype.map.call(ta, fn)]]) شغال وبيرجّع [[Array]].`,
            when: R`[[subarray]]: كل ما تقرا جزء من bytes (header، أو حقل، أو chunk تبعته) ومش هتحتفظ بيه لوقت طويل. [[slice]]: لما الجزء هيعيش بعد الأصل أو هيتعدّل لوحده، أو الأصل كبير جدًا وانت محتاج حتة صغيرة منه (الـ [[subarray]] بيمسك الـ buffer الكبير كله في الذاكرة). [[set]]: تجميع رسالة أو ملف من أجزاء، أو نسخ pixels لـ canvas تاني. [[copyWithin]]: تحريك جوه نفس الـ array (نوافذ وصفوف). [[map]] و [[filter]] لما النتيجة أرقام من نفس النوع؛ غير كده [[Array.from(ta, fn)]].`,
            mistakes: R`- تفتكر [[subarray]] نسخة وتعدّل فيه: الأصل بيتغيّر.
- تحتفظ بـ [[subarray]] صغير من buffer ضخم (ملف ١٠٠ MB): الـ ١٠٠ MB كلها فاضلة في الذاكرة. [[slice]] الحتة الصغيرة.
- [[map]] بترجّع نص أو رقم كبير: بيتحوّل ويلف ساكت ([[0 0 0]] بدل الـ hex).
- [[set]] بـ offset يخلّي الكتابة تعدّي الطول: [[RangeError: offset is out of bounds]].
- [[with]] بـ index برّه الطول: [[RangeError: Invalid typed array index]] (مش بيكبّر الـ array)، وقيمة أكبر من النوع بتلف ([[with(-1, 300)]] في [[Uint8Array]] = ٤٤).
- تدوّر على [[push]] و [[concat]] و [[splice]] و [[flat]] و [[toSpliced]]: مش موجودين. [[set]] في buffer أكبر، أو اطلع لـ [[Array]].
- [[Array.isArray(ta)]] في كود بيفحص input: [[false]].`,
          },
          teach: R`## الفكرة في سطر

[[subarray]] بيشارك و [[slice]] بينسخ و [[set]] بيكتب دفعة واحدة، وباقي الـ methods زي الـ Array بس النتيجة من نفس النوع. الناتج من Node 24.22.

---

## ١. [[TypedArray.prototype.subarray]] مقابل [[TypedArray.prototype.slice]]

~~~js
const packet = Uint8Array.from([0xca, 0xfe, 3, 10, 20, 30, 0, 0]);
const header = packet.subarray(0, 2);
const body = packet.slice(3, 6);
header[0] = 0;
body[0] = 99;
console.log(packet, header, body);
console.log(header.buffer === packet.buffer, body.buffer === packet.buffer, packet.subarray(3).byteOffset);
~~~

~~~text الناتج
Uint8Array(8) [
   0, 254, 3, 10,
  20,  30, 0,  0
] Uint8Array(2) [ 0, 254 ] Uint8Array(3) [ 99, 20, 30 ]
true false 3
~~~

| | [[subarray(0, 2)]] | [[slice(3, 6)]] |
|---|---|---|
| الذاكرة | **نفس** buffer الأصل | buffer جديد |
| التعديل فيه | بيظهر في الأصل ([[0xca]] بقت [[0]]) | مبيظهرش ([[99]] في النسخة بس) |
| [[byteOffset]] | مكانه في الأصل | صفر |
| التكلفة | object صغير بس | حجز ونسخ |

---

## ٢. [[TypedArray.prototype.set]]: اكتب دفعة واحدة

~~~js
packet.set([7, 8], 6);
console.log(packet.at(-1), packet.indexOf(30), packet.includes(99));
~~~

~~~text الناتج
8 5 false
~~~

- [[set([7, 8], 6)]]: اكتب العنصرين من مكان ٦. الـ [[source]] ممكن Array أو typed array من أي نوع (وبيتحوّل).
- [[at(-1)]] آخر عنصر، و [[indexOf(30)]] مكانه ٥، و [[includes(99)]] [[false]] لأن ٩٩ اتكتبت في النسخة بس.

| الكود (اتجرّب) | النتيجة |
|---|---|
| [[new Uint8Array(4).set([1, 2, 3], 2)]] | [[RangeError: offset is out of bounds]]: ٢ + ٣ أكبر من ٤ |
| [[b.set(b.subarray(0, 3), 2)]] على [[1..5]] | [[1, 2, 1, 2, 3]]: متداخلين على نفس الـ buffer وبيتنسخ صح |
| [[d.set(Float32Array.of(1.9, -1, 300))]] في [[Uint8Array]] | [[1, 255, 44]]: كل قيمة بتتحوّل وتلف |

---

## ٣. الترتيب: [[TypedArray.prototype.sort]] و [[TypedArray.prototype.toSorted]] بالأرقام

~~~js
const temps = Int16Array.of(30, -5, 12, 100, 7);
console.log(temps.toSorted(), [30, -5, 12, 100, 7].toSorted());
~~~

~~~text الناتج
Int16Array(5) [ -5, 7, 12, 30, 100 ] [ -5, 100, 12, 30, 7 ]
~~~

الـ Array من غير دالة بترتب كنصوص ([['100']] قبل [['12']])، والـ typed array **بالأرقام**. ودي من الحاجات القليلة اللي الـ typed array أحسن فيها من غير ما تعمل حاجة.

---

## ٤. [[TypedArray.prototype.map]] و [[TypedArray.prototype.filter]]: نفس النوع

~~~js
console.log(temps.map((t) => t * 1000), temps.filter((t) => t > 10), temps.join(' | '));
try { temps.push(1); } catch (e) { console.log(e.name + ': ' + e.message); }
~~~

~~~text الناتج
Int16Array(5) [ 30000, -5000, 12000, -31072, 7000 ] Int16Array(3) [ 30, 12, 100 ] 30 | -5 | 12 | 100 | 7
TypeError: temps.push is not a function
~~~

- [[map]] رجّعت [[Int16Array]]: ١٠٠ × ١٠٠٠ = ١٠٠٠٠٠ مبتكفيش في ١٦ bit، فلفّت لـ [[-31072]]. **من غير error**.
- [[filter]] رجّعت [[Int16Array]] جديدة (buffer جديد) فيها اللي عدّى بس.
- [[push]] مش موجودة أصلًا: الطول ثابت.

---

## ٥. كل الـ methods والـ properties في جدول

**الـ static (على الـ constructor):**

| الـ member | بيعمل إيه | مثال اتجرّب |
|---|---|---|
| [[TypedArray.from(src, fn)]] | typed array من iterable أو array-like، و [[fn]] بتحوّل كل عنصر | [[Uint8Array.from({ length: 3 }, (_, i) => i * 100)]] = [[0, 100, 200]] |
| [[TypedArray.of(...items)]] | typed array من القيم نفسها | [[Uint16Array.of(1, 70000)]] = [[1, 4464]] (لفّت) |
| [[TypedArray.BYTES_PER_ELEMENT]] | حجم العنصر بالـ bytes | [[Float64Array.BYTES_PER_ELEMENT]] = ٨ |
| [[ TypedArray[Symbol.species] ]] | الـ class اللي [[map]] و [[filter]] و [[slice]] و [[subarray]] بيعملوا منها | تمرين «دوّر بنفسك» تحت |

**على الـ instance** (المثال على [[a = Uint8Array.of(5, 1, 4, 1, 3)]] كل سطر لوحده):

| الـ method | بتعمل إيه | النتيجة |
|---|---|---|
| [[buffer]] و [[byteOffset]] و [[byteLength]] و [[length]] | الـ buffer ومكان البداية والحجم بالـ bytes وعدد العناصر | درس «TypedArray: العيلة» |
| [[at(i)]] | العنصر، والسالب من الآخر | [[at(-1)]] = ٣ |
| [[set(src, offset)]] | كتابة دفعة واحدة من مكان | فوق في قسم ٢ |
| [[subarray(s, e)]] | view على نفس الذاكرة | [[1, 4]] بيشارك [[a]] |
| [[slice(s, e)]] | نسخة | [[1, 4]] مستقلة |
| [[fill(v, s, e)]] | تملا بقيمة، في مكانها | [[fill(9, 1, 3)]] = [[5, 9, 9, 1, 3]] |
| [[copyWithin(t, s, e)]] | تنسخ جزء لمكان تاني جوه نفسها | [[copyWithin(0, 3)]] = [[1, 3, 4, 1, 3]] |
| [[map(fn)]] | نسخة بنفس النوع بعد [[fn]] (وبتلف) | [[x * 100]] = [[244, 100, 144, 100, 44]] |
| [[filter(fn)]] | نسخة باللي عدّى | [[x > 2]] = [[5, 4, 3]] |
| [[forEach(fn)]] | تلف وبترجّع [[undefined]] | للـ side effects بس |
| [[reduce(fn, init)]] | تجمع من الشمال | مجموعهم = ١٤ |
| [[reduceRight(fn, init)]] | تجمع من اليمين | [[(s, x) => s + ',' + x]] من [['']] = [[,3,1,4,1,5]] |
| [[every(fn)]] و [[some(fn)]] | كلهم؟ ولا واحد على الأقل؟ | [[every(x => x > 0)]] و [[some(x => x > 4)]] الاتنين [[true]] |
| [[find(fn)]] و [[findIndex(fn)]] | أول عنصر بيعدّي وأول مكان | [[x < 2]]: العنصر ١ في المكان ١ |
| [[findLast(fn)]] و [[findLastIndex(fn)]] | آخر عنصر بيعدّي ومكانه | [[x > 3]]: العنصر ٤ في المكان ٢ |
| [[indexOf(v)]] و [[lastIndexOf(v)]] | أول وآخر مكان لقيمة | [[1]]: المكان ١ والمكان ٣ |
| [[includes(v)]] | موجودة ولا لأ (وبتلاقي [[NaN]]) | [[includes(4)]] = [[true]] |
| [[join(sep)]] | نص، والفاصل الافتراضي [[,]] | [[join('-')]] = [[5-1-4-1-3]] |
| [[toString()]] | نفس [[join()]]، وهي نفس دالة الـ Array بالظبط | [[5,1,4,1,3]] |
| [[toLocaleString(locale)]] | كل رقم بتنسيق اللغة | [[Float32Array.of(1234.5, 2)]] بـ [['ar-EG']] = [[١٬٢٣٤٫٥,٢]] |
| [[reverse()]] | تعكس **في مكانها** | [[3, 1, 4, 1, 5]] |
| [[toReversed()]] | نسخة معكوسة، والأصل زي ما هو | [[3, 1, 4, 1, 5]] |
| [[sort(fn)]] | ترتب في مكانها، بالأرقام من غير دالة | [[1, 1, 3, 4, 5]] |
| [[toSorted(fn)]] | نسخة مترتبة | [[(x, y) => y - x]] = [[5, 4, 3, 1, 1]] |
| [[with(i, v)]] | نسخة متغيّر فيها عنصر واحد | [[with(0, 200)]] = [[200, 1, 4, 1, 3]] |
| [[keys()]] و [[values()]] و [[entries()]] | iterators على الأماكن والقيم والأزواج | [[entries()]] أول حاجة [[ [0, 5] ]] |
| [[ [Symbol.iterator] ]] | اللي [[for...of]] و spread بيستخدموه، وهو نفسه [[values]] | [[ [...a] ]] = [[ [5, 1, 4, 1, 3] ]] كـ Array |

---

## ٦. الفرق عن [[Array]] في جدول

| | [[Array]] | typed array |
|---|---|---|
| الطول | بيتغيّر ([[push]] و [[splice]]) | ثابت من الإنشاء |
| مش موجود | | [[push]] و [[pop]] و [[shift]] و [[unshift]] و [[splice]] و [[concat]] و [[flat]] و [[flatMap]] و [[toSpliced]] (اتجرّب: كلهم [[false]] بـ [[in]]) |
| الـ holes | ممكن ([[ [1, , 3] ]]) | مستحيل، كل خانة فيها رقم |
| [[sort()]] من غير دالة | كنصوص | بالأرقام |
| [[map]] و [[filter]] | Array أي قيم | نفس النوع، والقيم بتتحوّل وتلف |
| نسخ جزء من غير ما تنسخ | مفيش | [[subarray]] |
| [[Array.isArray]] و [[JSON.stringify]] | [[true]] وبيتكتب array | [[false]] وبيتكتب object |

---

## الخلاصة

- [[subarray]] = نفس الذاكرة (رخيص، والتعديل بيبان في الأصل)، و [[slice]] = نسخة.
- [[set]] لتجميع bytes، و [[copyWithin]] للتحريك جوه نفس الـ array.
- [[map]] و [[filter]] بيرجّعوا نفس النوع: لو النتيجة مش أرقام من النوع ده، [[Array.from(ta, fn)]].
- [[sort]] بالأرقام من غير دالة، و [[toSorted]] و [[toReversed]] و [[with]] نسخ بالنوع الأساسي.`,
          lines: [
            R`[[Uint8Array.from]] من array: ٨ bytes، أولهم [[0xca 0xfe]] كأنه «توقيع» الرسالة.`,
            R`[[subarray(0, 2)]]: view على أول ٢ bytes في **نفس** الذاكرة.`,
            R`[[slice(3, 6)]]: **نسخة** من الـ bytes اللي في الأماكن ٣ و ٤ و ٥.`,
            R`بنكتب صفر في أول الـ view، فالأصل بيتغيّر معاه.`,
            R`بنكتب ٩٩ في أول النسخة، والأصل مش هيحس.`,
            R`الأصل أوله صفر (من الـ [[subarray]]) ومفيهوش ٩٩، والنسخة فيها ٩٩.`,
            R`الـ [[subarray]] على نفس الـ buffer والـ [[slice]] لأ، و [[subarray(3)]] بيبدأ من byte رقم ٣.`,
            R`[[set([7, 8], 6)]] بيكتب العنصرين في آخر مكانين.`,
            R`[[at(-1)]] آخر عنصر (٨)، و [[indexOf(30)]] مكانه ٥، و ٩٩ مش في الأصل.`,
            R`[[Int16Array]] فيها درجات حرارة بإشارة.`,
            R`الـ typed array اترتبت بالأرقام، والـ Array كنصوص فـ ١٠٠ جت قبل ١٢.`,
            R`[[map]] رجّعت [[Int16Array]] فالـ ١٠٠٠٠٠ لفّت لـ [[-31072]]، و [[filter]] رجّعت اللي أكبر من ١٠، و [[join]] بفاصل.`,
            R`[[push]] مش موجودة، فندهها بيرمي [[TypeError]] والـ [[catch]] بيطبعه.`,
          ],
          ref: [
            { t: "MDN: TypedArray.prototype.subarray()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/subarray" },
            { t: "MDN: TypedArray.prototype.set()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/set" },
            { t: "MDN: TypedArray.prototype.slice()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/slice" },
            { t: "MDN: TypedArray.from()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/from" },
            { t: "MDN: TypedArray.prototype.sort()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/sort" },
            { t: "MDN: TypedArray[Symbol.species]", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/Symbol.species" },
            { t: "MDN: TypedArray.prototype[Symbol.iterator]()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/Symbol.iterator" },
          ],
          pre: [{ to: "js/TypedArray: العيلة و BYTES_PER_ELEMENT و overflow", why: R`الأنواع واللف قبل الـ methods` }, { to: "js/sort و toSorted", why: R`ليه الـ Array بترتب كنصوص` }, { to: "js/Array: splice و toSpliced و toReversed و with", why: R`نفس الـ methods في الـ Array` }],
        },
        {
          cmd: "DataView: getUint16 و setFloat32 و endianness",
          title: "إزاي تقرا وتكتب ملف binary حقيقي (WAV أو PNG) بأرقام مختلفة الأنواع وبترتيب bytes تختاره؟",
          desc: R`الـ typed array كل عناصرها نفس النوع ومترصوصة ورا بعض وبترتيب جهازك. الملفات الحقيقية مش كده: header ملف WAV فيه رقم ٤ bytes وبعده رقم ٢ وبعده نص، وأرقامه little-endian، وملف PNG أرقامه big-endian. [[DataView]] بيحل ده: view بتقرا **أي نوع من أي byte**، وانت بتختار الترتيب.

• [[new DataView(buffer, byteOffset, byteLength)]]، و [[view.buffer]] و [[view.byteOffset]] و [[view.byteLength]].
• ١١ زوج [[get]] و [[set]]: [[getInt8]] و [[getUint8]] و [[getInt16]] و [[getUint16]] و [[getInt32]] و [[getUint32]] و [[getFloat16]] و [[getFloat32]] و [[getFloat64]] و [[getBigInt64]] و [[getBigUint64]] (ونفسهم [[set]]).
• آخر argument [[littleEndian]]: [[true]] = الصغير الأول، ومن غيره = **big-endian** (الافتراضي، عكس الـ typed arrays).`,
          example: R`// wav.mjs: نكتب header ملف WAV بـ DataView ونقراه تاني
import { writeFileSync, readFileSync } from 'node:fs';
const rate = 8000, seconds = 0.5, samples = rate * seconds;
const view = new DataView(new ArrayBuffer(44 + samples * 2));
const tag = (at, text) => [...text].forEach((ch, i) => view.setUint8(at + i, ch.charCodeAt(0)));
tag(0, 'RIFF'); view.setUint32(4, 36 + samples * 2, true); tag(8, 'WAVE');
tag(12, 'fmt '); view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true);
view.setUint32(24, rate, true); view.setUint32(28, rate * 2, true); view.setUint16(32, 2, true); view.setUint16(34, 16, true);
tag(36, 'data'); view.setUint32(40, samples * 2, true);
for (let i = 0; i < samples; i++) view.setInt16(44 + i * 2, Math.round(Math.sin((2 * Math.PI * 440 * i) / rate) * 12000), true);
writeFileSync('tone.wav', view);
const file = readFileSync('tone.wav');
const dv = new DataView(file.buffer, file.byteOffset, file.byteLength);
console.log(dv.getUint32(0, false).toString(16), dv.getUint32(0, true).toString(16));
console.log({ rate: dv.getUint32(24, true), bits: dv.getUint16(34, true), bytes: dv.getUint32(40, true), size: file.byteLength });
console.log(dv.getInt16(44 + 2, true), dv.getInt16(44 + 2, false), dv.getUint8(46), dv.getUint8(47));`,
          try: R`شغّل المثال وافتح [[tone.wav]] بأي مشغّل: هتسمع نص ثانية نغمة «لا» (٤٤٠ Hz). وبعدين غيّر [[440]] لـ [[880]] و [[12000]] لـ [[3000]]: النغمة أعلى وأوطى صوتًا. وجرّب تشيل [[true]] من سطر الـ [[setInt16]]: الملف هيطلع إيه؟`,
          sol: R`- بـ ٨٨٠ النغمة أعلى أوكتاف بالظبط (الضعف)، وبـ ٣٠٠٠ الصوت أوطى (أعلى عينة ربع الأول).
- من غير [[true]] في [[setInt16]]: الـ header لسه صح فالمشغل بيفتحه، بس كل عينة اتكتبت big-endian والملف بيقول little، فالـ bytes بتتقري بالعكس: العينة [[4065]] بتتقري [[-7921]] (ده بالظبط السطر الأخير في الناتج). النتيجة **وشّ** عالي مكان النغمة. ده الفرق اللي الـ endianness بيعمله: نفس الـ bytes، رقم تاني خالص.
- كل حجم في الـ header لازم يبقى صح: لو [[setUint32(40, ...)]] قال حجم أكبر من الحقيقي، مشغلات كتير بترفض الملف أو بتطلّع وشّ في الآخر.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اكتب الـ ٤ سطور قبل ما تشغّل:

~~~js
const v = new DataView(new ArrayBuffer(8));
v.setUint16(0, 0x0102);
console.log(new Uint8Array(v.buffer).subarray(0, 2), v.getUint16(0), v.getUint16(0, true));
v.setInt16(0, -2);
console.log(v.getUint16(0), v.getInt16(0));
v.setUint8(0, 300);
console.log(v.getUint8(0));
console.log(v.getUint8());
~~~`, done: R`كتبتهم صح، وعرفت إن [[DataView]] من غير [[true]] بيكتب big-endian، وإن [[getUint8()]] من غير offset مش error.`, sol: R`~~~text الناتج (Node 24.22)
Uint8Array(2) [ 1, 2 ] 258 513
65534 -2
44
44
~~~

- [[setUint16(0, 0x0102)]] من غير [[true]]: **big-endian**، فالـ bytes [[01 02]] زي ما بتقرا الرقم. [[getUint16(0)]] = ٢٥٨ = [[0x0102]]، و [[getUint16(0, true)]] قراه بالعكس = ٥١٣ = [[0x0201]].
- [[-2]] في ١٦ bit = [[ff fe]]: كـ unsigned = ٦٥٥٣٤ وكـ signed = -٢. نفس الـ bytes.
- [[setUint8(0, 300)]] بيلف زي الـ typed arrays: ٣٠٠ - ٢٥٦ = ٤٤.
- [[getUint8()]] من غير offset = offset صفر ([[undefined]] بيتحوّل ٠)، فمش error. عشان كده بق الـ offset الغلط ممكن يعيش.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** شغّل [[make-png.mjs]] (تحت في الحل) يعمل صورة PNG حقيقية ٣ × ٢. واكتب [[png-size.mjs]] يقرا من الـ header: هل هو PNG (أول ٨ bytes)، واسم أول chunk وطوله، وبعدين العرض والطول وعمق اللون ونوعه من الـ IHDR. أرقام PNG كلها **big-endian**. جرّبه على أي صورة PNG عندك.`, done: R`على [[tiny.png]] بيطبع [[isPng: true]] و [[IHDR]] بطول ١٣ والعرض ٣ والطول ٢، والقراية little بتطلّع رقم غلط ضخم، وعلى صورة حقيقية عندك المقاس طلع زي اللي في خصائص الملف.`, sol: R`~~~js make-png.mjs
// make-png.mjs: بنعمل صورة PNG حقيقية 3×2 من الصفر (عشان نقراها بعدين)
import { writeFileSync } from 'node:fs';
import { deflateSync, crc32 } from 'node:zlib';
const width = 3, height = 2;
function chunk(type, data) {
  const out = new Uint8Array(12 + data.length);
  const view = new DataView(out.buffer);
  view.setUint32(0, data.length);
  out.set(new TextEncoder().encode(type), 4);
  out.set(data, 8);
  view.setUint32(8 + data.length, crc32(out.subarray(4, 8 + data.length)));
  return out;
}
const ihdr = new Uint8Array(13);
const h = new DataView(ihdr.buffer);
h.setUint32(0, width); h.setUint32(4, height);
h.setUint8(8, 8); h.setUint8(9, 2);
const raw = new Uint8Array(height * (1 + width * 3));
for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) raw.set([x * 120, y * 200, 90], y * (1 + width * 3) + 1 + x * 3);
const signature = Uint8Array.of(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a);
const parts = [signature, chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw)), chunk('IEND', new Uint8Array(0))];
writeFileSync('tiny.png', Buffer.concat(parts));
console.log('tiny.png', parts.reduce((n, p) => n + p.length, 0), 'bytes');
~~~

~~~js png-size.mjs
// png-size.mjs: نقرا العرض والطول من header الـ PNG بـ DataView
import { readFileSync } from 'node:fs';
const file = readFileSync(process.argv[2] ?? 'tiny.png');
const view = new DataView(file.buffer, file.byteOffset, file.byteLength);
const isPng = view.getUint32(0) === 0x89504e47 && view.getUint32(4) === 0x0d0a1a0a;
const type = String.fromCharCode(...file.subarray(12, 16));
console.log({ isPng, firstChunk: type, length: view.getUint32(8) });
console.log({ width: view.getUint32(16), height: view.getUint32(20), bitDepth: view.getUint8(24), colorType: view.getUint8(25) });
console.log('بالترتيب الغلط (little):', view.getUint32(16, true));
~~~

~~~text الناتج (Node 24.22)
tiny.png 85 bytes
{ isPng: true, firstChunk: 'IHDR', length: 13 }
{ width: 3, height: 2, bitDepth: 8, colorType: 2 }
بالترتيب الغلط (little): 50331648
~~~

**شكل الملف** (من مواصفة PNG): ٨ bytes توقيع، وبعدين chunks. كل chunk = طول (٤ bytes) + نوع (٤ حروف) + الداتا + CRC32 (٤ bytes). أول chunk لازم [[IHDR]] وطوله ١٣: العرض (٤) والطول (٤) وعمق اللون (١) ونوعه (١) وتلات bytes تانيين.

| الـ offset | الحقل | بنقراه بـ |
|---|---|---|
| ٠ لـ ٧ | التوقيع [[89 50 4E 47 0D 0A 1A 0A]] | [[getUint32(0)]] و [[getUint32(4)]] |
| ٨ | طول أول chunk (١٣) | [[getUint32(8)]] |
| ١٢ | النوع [[IHDR]] | ٤ bytes كحروف |
| ١٦ و ٢٠ | العرض والطول | [[getUint32]] big-endian |
| ٢٤ و ٢٥ | عمق اللون (٨ bit) ونوعه (٢ = RGB) | [[getUint8]] |

- [[getUint32(0)]] من غير [[true]] = big-endian، وده المطلوب لـ PNG. القراية little طلّعت ٥٠٣٣١٦٤٨ = [[0x03000000]]: نفس الـ bytes [[00 00 00 03]] بالعكس.
- في [[make-png.mjs]]: [[crc32]] من [[node:zlib]] (موجودة من Node 22.2) بتحسب الـ checksum على النوع والداتا، والمتصفح بيرفض الصورة لو غلط. و [[deflateSync]] بيضغط الـ pixels. وكل سطر pixels بيبدأ بـ byte صفر (نوع الـ filter).
- اتأكدت إن الصورة سليمة: فتحتها في Chrome بـ [[createImageBitmap]] وطلع مقاسها ٣ × ٢.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الكود ده عايز يقرا أول chunk بعد [[RIFF....WAVE]] في [[tone.wav]] (من المثال): المفروض [[fmt ]] و [[8000]]. بيطبع حاجة تانية خالص. ليه؟ وصلّحه.

~~~js
import { readFileSync } from 'node:fs';
const file = readFileSync('tone.wav');
const fmt = file.subarray(12);
const view = new DataView(fmt.buffer);
console.log(String.fromCharCode(view.getUint8(0), view.getUint8(1), view.getUint8(2), view.getUint8(3)), view.getUint32(12, true));
~~~`, done: R`النسخة المصلّحة بتطبع [[fmt  8000]]، وتقدر تقول [[fmt.buffer]] كان بيشاور على إيه.`, sol: R`~~~text الناتج قبل التصليح (Node 24.22)
impo 1818838628
~~~

~~~js fixed.mjs
import { readFileSync } from 'node:fs';
const file = readFileSync('tone.wav');
const fmt = file.subarray(12);
const view = new DataView(fmt.buffer, fmt.byteOffset, fmt.byteLength);
console.log(String.fromCharCode(view.getUint8(0), view.getUint8(1), view.getUint8(2), view.getUint8(3)), view.getUint32(12, true));
~~~

~~~text الناتج (Node 24.22)
fmt  8000
~~~

- [[fmt.buffer]] مش «الـ bytes من ١٢»: ده الـ [[ArrayBuffer]] اللي تحت **كله**، وهنا الـ pool بتاع Node (٦٥٥٣٦ byte). في الـ module ده [[file.byteOffset]] طلع ١٦٨ و [[fmt.byteOffset]] ١٨٠، فـ [[new DataView(fmt.buffer)]] بدأ من أول الـ pool وقرا bytes حاجة تانية خالص ([[impo]]: شكلها أول كلمة [[import]] من كود اتقرا في نفس الـ pool قبل الملف).
- مفيش error ولا warning: الأرقام بتطلع «عادي» وغلط. ده أخطر باج في الشغل بالـ bytes.
- الحل: [[new DataView(x.buffer, x.byteOffset, x.byteLength)]] **دايمًا** لما [[x]] view (حتى لو جربت ونفع مرة: نفس الكود من [[node -e]] طلع [[byteOffset]] صفر بالصدفة).` },
            { lvl: 'تطبيق', t: R`**ابني:** format قراية حساس ثابت ١٦ byte little-endian: [[id]] كـ [[Uint32]] (offset ٠)، و [[temp]] كـ [[Float32]] (offset ٤)، و [[at]] (timestamp بالمللي ثانية) كـ [[BigUint64]] (offset ٨). اكتب [[encodeReading(obj)]] ترجّع [[Uint8Array]]، و [[decodeReading(bytes)]] ترجّع الـ object وترمي [[RangeError]] لو أقل من ١٦ byte.`, done: R`[[encodeReading({ id: 7, temp: 21.5, at: 1763683200000n })]] طولها ١٦ وأول ٨ bytes [[07 00 00 00 00 00 ac 41]]، والـ decode بيرجّع نفس الـ object، و [[0.1]] بترجع [[0.10000000149011612]]، و ١٠ bytes بترمي، والتمرين اللي بيتصحح لوحده عدّى.`, sol: R`~~~js reading.mjs
// reading.mjs: قراية حساس = 16 byte ثابتين، little-endian
function encodeReading({ id, temp, at }) {
  const view = new DataView(new ArrayBuffer(16));
  view.setUint32(0, id, true);
  view.setFloat32(4, temp, true);
  view.setBigUint64(8, at, true);
  return new Uint8Array(view.buffer);
}
function decodeReading(bytes) {
  if (bytes.byteLength < 16) throw new RangeError('القراية 16 byte، اللي وصل ' + bytes.byteLength);
  const view = new DataView(bytes.buffer, bytes.byteOffset, 16);
  return { id: view.getUint32(0, true), temp: view.getFloat32(4, true), at: view.getBigUint64(8, true) };
}
const bytes = encodeReading({ id: 7, temp: 21.5, at: 1763683200000n });
console.log(bytes.length, Array.from(bytes.subarray(0, 8), (b) => b.toString(16).padStart(2, '0')).join(' '));
console.log(decodeReading(bytes), decodeReading(encodeReading({ id: 1, temp: 0.1, at: 0n })).temp);
try { decodeReading(bytes.subarray(0, 10)); } catch (e) { console.log(e.name + ': ' + e.message); }
~~~

~~~text الناتج (Node 24.22)
16 07 00 00 00 00 00 ac 41
{ id: 7, temp: 21.5, at: 1763683200000n } 0.10000000149011612
RangeError: القراية 16 byte، اللي وصل 10
~~~

- [[07 00 00 00]]: الـ id ٧ little-endian (الصغير الأول). و [[00 00 ac 41]]: [[21.5]] بصيغة [[Float32]] ([[0x41ac0000]] بالعكس).
- [[at]] لازم [[BigInt]] ([[1763683200000n]]): [[setBigUint64]] بيرمي [[TypeError: Cannot convert 1763683200000 to a BigInt]] لو اديته رقم عادي. وليه ٦٤ bit؟ الـ timestamp بالمللي أكبر من ٣٢ bit (٤ مليار مللي = ٤٩ يوم بس).
- [[21.5]] رجعت زي ما هي لأنها بتتكتب بالظبط في [[Float32]]، و [[0.1]] لأ. لو الدقة مهمة: [[Float64]] و ٤ bytes زيادة.
- [[decodeReading]] بتاخد [[bytes.byteOffset]]، فبتشتغل على قراية في نص buffer كبير (رسالة فيها ١٠٠ قراية ورا بعض: [[bytes.subarray(i * 16)]]).` },
            { lvl: 'تحدي', t: R`**أداة صغيرة:** [[wav-stats.mjs]] بتقرا أي ملف WAV (PCM ١٦ bit) وتطبع: الـ sample rate، وعدد القنوات، والمدة بالثواني، وأعلى عينة (peak)، و RMS (جذر متوسط المربعات = «متوسط علو الصوت»). لو الملف مش WAV أو مش ١٦ bit ترمي error واضح. جرّبها على [[tone.wav]] وعلى [[tiny.png]].`, done: R`على [[tone.wav]]: ٨٠٠٠ Hz وقناة واحدة و [[0.5]] ثانية و peak ١٢٠٠٠ و RMS ٨٤٨٥، وعلى [[tiny.png]]: [[Error: مش ملف WAV]].`, sol: R`~~~js wav-stats.mjs
// wav-stats.mjs: المدة وأعلى صوت و RMS من ملف WAV (PCM 16 bit)
import { readFileSync } from 'node:fs';
const file = readFileSync(process.argv[2] ?? 'tone.wav');
const view = new DataView(file.buffer, file.byteOffset, file.byteLength);
const text = (at) => String.fromCharCode(...file.subarray(at, at + 4));
if (text(0) !== 'RIFF' || text(8) !== 'WAVE') throw new Error('مش ملف WAV');
const rate = view.getUint32(24, true), channels = view.getUint16(22, true), bits = view.getUint16(34, true);
if (bits !== 16) throw new Error('الملف ' + bits + ' bit، الأداة دي لـ 16 بس');
const dataBytes = view.getUint32(40, true), count = dataBytes / 2;
let peak = 0, sumSq = 0;
for (let i = 0; i < count; i++) {
  const s = view.getInt16(44 + i * 2, true);
  peak = Math.max(peak, Math.abs(s));
  sumSq += s * s;
}
console.log({ rate, channels, bits, seconds: count / channels / rate, peak, rms: Math.round(Math.sqrt(sumSq / count)) });
~~~

~~~text الناتج (Node 24.22): node wav-stats.mjs
{
  rate: 8000,
  channels: 1,
  bits: 16,
  seconds: 0.5,
  peak: 12000,
  rms: 8485
}
~~~

~~~text الناتج: node wav-stats.mjs tiny.png
Error: مش ملف WAV
~~~

- [[getInt16]] (بإشارة) مش [[getUint16]]: عينات الصوت سالبة وموجبة حوالين الصفر.
- الـ RMS لموجة sine = الـ peak ÷ جذر ٢ = ١٢٠٠٠ ÷ ١.٤١٤ = ٨٤٨٥. الحساب طابق النظرية، فالقراية صح.
- **حدود الأداة:** بتفترض إن الـ [[data]] chunk في offset ٣٦ (زي الملف بتاعنا). ملفات WAV حقيقية كتير فيها chunks زيادة ([[LIST]] فيه اسم الفنان) قبل [[data]]. النسخة الصح بتلف على الـ chunks: تقرا النوع والطول وتنط، وده اللي المشروع الكبير في الوحدة بيعمله.` },
          ],
          check: { lang: "js", starter: R`function encodeReading({ id, temp, at }) {
  // 16 byte little-endian: id Uint32 @0، temp Float32 @4، at BigUint64 @8 ← Uint8Array
}
function decodeReading(bytes) {
  // العكس، و RangeError لو أقل من 16 byte
}`, tests: R`const b = encodeReading({ id: 7, temp: 21.5, at: 1763683200000n });
test("الطول 16", () => expect(b.length).toBe(16));
test("الـ id little-endian", () => expect(Array.from(b.subarray(0, 4))).toEqual([7, 0, 0, 0]));
test("رجوع كامل", () => { const r = decodeReading(b); expect(r.id).toBe(7); expect(r.temp).toBe(21.5); expect(r.at === 1763683200000n).toBe(true); });
test("قراية في نص buffer", () => { const big = new Uint8Array(32); big.set(b, 16); expect(decodeReading(big.subarray(16)).id).toBe(7); });
test("أقل من 16", () => expect(() => decodeReading(b.subarray(0, 10))).toThrow("16"));`, solution: R`function encodeReading({ id, temp, at }) {
  const view = new DataView(new ArrayBuffer(16));
  view.setUint32(0, id, true);
  view.setFloat32(4, temp, true);
  view.setBigUint64(8, at, true);
  return new Uint8Array(view.buffer);
}
function decodeReading(bytes) {
  if (bytes.byteLength < 16) throw new RangeError('القراية 16 byte، اللي وصل ' + bytes.byteLength);
  const view = new DataView(bytes.buffer, bytes.byteOffset, 16);
  return { id: view.getUint32(0, true), temp: view.getFloat32(4, true), at: view.getBigUint64(8, true) };
}` },
          flag: "script",
          deep: {
            why: R`أي format binary في الدنيا (صور، صوت، zip، PDF، بروتوكولات الشبكة، رسايل أجهزة IoT، ملفات الألعاب) عبارة عن header فيه أرقام بأحجام مختلفة في أماكن محددة، وكل format اختار ترتيب bytes. الـ typed arrays مش نافعة هنا: لازم كل الأرقام نفس النوع ومحاذية (offset من مضاعفات حجمها)، وبتقرا بترتيب جهازك. [[DataView]] اتعمل للحالة دي بالظبط: «اقرا [[Uint32]] big-endian من byte رقم ١٧» من غير أي شرط.`,
            how: R`[[new DataView(buffer, byteOffset, byteLength)]] بيعمل view على الـ buffer (أو حتة منه)، و [[view.getX(offset, littleEndian)]] بيقرا الـ bytes من [[byteOffset + offset]] ويجمّعهم رقم بالترتيب المطلوب. الـ [[offset]] نسبي لأول الـ view مش أول الـ buffer، ومش لازم يبقى محاذي (تقدر تقرا [[Float64]] من byte ٣). أي قراية بتعدّي آخر الـ view بترمي [[RangeError: Offset is outside the bounds of the DataView]] (أحسن من الـ typed array اللي بيرجّع [[undefined]]). [[setX(offset, value, littleEndian)]] بيحوّل القيمة زي الـ typed arrays بالظبط (لف للصحيح، وأقرب قيمة للعشري، و BigInt للـ ٦٤). والـ [[littleEndian]] لو مش موجود أو [[false]] = big-endian، لأن ده «network byte order» القياسي في البروتوكولات. و [[getInt8]] و [[getUint8]] مالهمش ترتيب (byte واحد). و [[Float16]] (Baseline ٢٠٢٥، وموجود في Node 24 و Chrome 157): [[getFloat16]] و [[setFloat16]] بيقروا ويكتبوا الرقم في ٢ bytes. والـ [[DataView]] على buffer resizable من غير طول بيكبر معاه زي الـ typed arrays.`,
            when: R`[[DataView]]: أي header ملف أو رسالة binary فيها أنواع مختلفة، وأي حاجة ليها ترتيب bytes متحدد (شبكة، ملفات، أجهزة). Typed array: لما الداتا كتلة من نفس النوع ومش مهم ترتيبها أو جاية من جهازك أصلًا (pixels، عينات صوت بعد ما عرفت إن الملف little والجهاز little، buffers بتتبعت لـ WebGL). وكتير بتستخدم الاتنين: [[DataView]] للـ header، و typed array على الجزء الكبير اللي بعده (أسرع في اللف على مليون عنصر). وفي Node، [[Buffer]] فيه [[readUInt32BE]] و [[writeInt16LE]] بنفس الفكرة، بس [[DataView]] شغال في كل مكان.`,
            mistakes: R`- تنسى [[true]] في ملف little-endian (WAV و ZIP و BMP): الأرقام بتطلع ضخمة أو غلط من غير error.
- تحط [[true]] في format big-endian (PNG و JPEG والشبكة).
- [[new DataView(view.buffer)]] من غير [[byteOffset]] و [[byteLength]]: بتقرا من أول الـ pool أو الـ buffer الكبير (التمرين اللي طلّع [[impo]]).
- تعتبر الـ offset من أول الـ buffer وانت عامل الـ view بـ offset: الـ offset نسبي للـ view.
- [[setBigUint64(0, 5)]]: [[TypeError: Cannot convert 5 to a BigInt]]. اكتب [[5n]].
- تقرا عينات صوت بـ [[getUint16]]: السالب بيطلع ٦٥٥٣٤. [[getInt16]].
- [[DataView(buf)]] من غير [[new]]: [[TypeError: Constructor DataView requires 'new']]. و [[new DataView([1, 2])]]: [[TypeError: First argument to DataView constructor must be an ArrayBuffer]].
- تفترض إن الـ chunks في مكان ثابت: الـ formats الحقيقية بتتقري بالـ loop على الـ chunks (طول ونوع وتنط).`,
          },
          teach: R`## الفكرة في سطر

[[DataView]] بيقرا ويكتب أي نوع رقم من أي byte، وانت بتختار big أو little endian. الناتج من Node 24.22 على ويندوز 11.

---

## ١. [[new DataView]] و [[DataView.prototype.buffer]] و [[DataView.prototype.byteOffset]] و [[DataView.prototype.byteLength]]

~~~js
const dv = new DataView(new ArrayBuffer(16), 4, 8);
console.log(dv.byteOffset, dv.byteLength, dv.buffer.byteLength);
try { dv.getUint32(6); } catch (e) { console.log(e.name + ': ' + e.message); }
~~~

~~~text الناتج
4 8 16
RangeError: Offset is outside the bounds of the DataView
~~~

- [[new DataView(buffer, 4, 8)]]: view على ٨ bytes بتبدأ من byte ٤ في الـ buffer. من غير الرقمين: الـ buffer كله.
- [[buffer]] و [[byteOffset]] و [[byteLength]]: نفس معناهم في الـ typed arrays، بس مفيش [[length]] (مفيش «عناصر»).
- [[getUint32(6)]]: من byte ٦ في الـ view، ومحتاج ٤ لحد ٩، والـ view ٨ بس: [[RangeError]]. الـ [[DataView]] **بيرمي** لما تقرا برّه، عكس الـ typed array اللي بيرجّع [[undefined]].

---

## ٢. كل الـ get و set: ٢٢ method

| الـ methods | bytes | القيمة |
|---|---|---|
| [[getInt8]] و [[setInt8]] | ١ | -128 لـ 127، ومالهمش ترتيب |
| [[getUint8]] و [[setUint8]] | ١ | 0 لـ 255، ومالهمش ترتيب |
| [[getInt16]] و [[setInt16]] | ٢ | رقم بإشارة ١٦ bit (عينات الصوت) |
| [[getUint16]] و [[setUint16]] | ٢ | من غير إشارة ١٦ bit (عدد القنوات، bits per sample) |
| [[getInt32]] و [[setInt32]] | ٤ | بإشارة ٣٢ bit (إحداثيات وفروق) |
| [[getUint32]] و [[setUint32]] | ٤ | من غير إشارة ٣٢ bit (أحجام وأطوال و CRC) |
| [[getFloat16]] و [[setFloat16]] | ٢ | عشري نص دقة (ES2025) |
| [[getFloat32]] و [[setFloat32]] | ٤ | عشري ٣٢ bit (إحداثيات 3D، قراءات حساسات) |
| [[getFloat64]] و [[setFloat64]] | ٨ | رقم JavaScript العادي بالظبط |
| [[getBigInt64]] و [[setBigInt64]] | ٨ | [[BigInt]] بإشارة |
| [[getBigUint64]] و [[setBigUint64]] | ٨ | [[BigInt]] من غير إشارة |

الشكل واحد: [[getX(byteOffset, littleEndian)]] و [[setX(byteOffset, value, littleEndian)]]. والـ set بيحوّل زي الـ typed arrays: [[setUint8(0, 300)]] بيكتب ٤٤، و [[setFloat16(0, 100000)]] بيكتب [[Infinity]]، و [[setBigUint64(0, 2n ** 64n - 1n)]] وبعدين [[getBigInt64(0)]] بيرجّع [[-1n]] (نفس الـ bits).

---

## ٣. little ولا big؟

~~~js
const v = new DataView(new ArrayBuffer(8));
v.setUint16(0, 0x0102);
console.log(new Uint8Array(v.buffer).subarray(0, 2), v.getUint16(0), v.getUint16(0, true));
~~~

~~~text الناتج
Uint8Array(2) [ 1, 2 ] 258 513
~~~

- من غير التالت argument = **big-endian**: الـ byte الكبير الأول، زي ما بتكتب الرقم ([[01 02]]).
- [[getUint16(0, true)]] قرا نفس الـ bytes little: [[0x0201]] = ٥١٣.

| الـ format | الترتيب |
|---|---|
| PNG و JPEG و TCP/IP headers و Java class files | big-endian: بتسيب الـ argument |
| WAV و BMP و ZIP و GIF و wasm و الـ typed arrays على جهازك | little-endian: بتكتب [[true]] |

---

## ٤. نكتب ملف WAV كامل (المثال خطوة خطوة)

ملف WAV = header ٤٤ byte + العينات. كل حقل في مكان ثابت، والأرقام **little-endian**:

| offset | الحجم | الحقل | في المثال |
|---|---|---|---|
| ٠ | ٤ | [[RIFF]] كحروف | [[tag(0, 'RIFF')]] |
| ٤ | ٤ | حجم الملف ناقص ٨ | [[setUint32(4, 36 + samples * 2, true)]] |
| ٨ | ٤ | [[WAVE]] | [[tag(8, 'WAVE')]] |
| ١٢ | ٤ | [[fmt ]] (بمسافة) | [[tag(12, 'fmt ')]] |
| ١٦ | ٤ | طول الـ fmt = ١٦ | [[setUint32(16, 16, true)]] |
| ٢٠ | ٢ | نوع الصوت: ١ = PCM خام | [[setUint16(20, 1, true)]] |
| ٢٢ | ٢ | عدد القنوات: ١ = mono | [[setUint16(22, 1, true)]] |
| ٢٤ | ٤ | sample rate: ٨٠٠٠ عينة في الثانية | [[setUint32(24, rate, true)]] |
| ٢٨ | ٤ | bytes في الثانية = rate × ٢ | [[setUint32(28, rate * 2, true)]] |
| ٣٢ | ٢ | bytes في العينة = ٢ | [[setUint16(32, 2, true)]] |
| ٣٤ | ٢ | bits في العينة = ١٦ | [[setUint16(34, 16, true)]] |
| ٣٦ | ٤ | [[data]] | [[tag(36, 'data')]] |
| ٤٠ | ٤ | حجم العينات بالـ bytes | [[setUint32(40, samples * 2, true)]] |
| ٤٤ | ... | العينات [[Int16]] | الـ loop بـ [[setInt16]] |

- [[tag(at, text)]] بتكتب كل حرف كـ byte بـ [[charCodeAt]] (الحروف الإنجليزي بس).
- العينة: [[Math.sin(2π × 440 × i / rate)]] موجة نغمتها ٤٤٠ Hz، مضروبة في ١٢٠٠٠ عشان تبقى رقم ١٦ bit (أقصاه ٣٢٧٦٧)، و [[Math.round]] لأن العينة صحيحة.
- [[writeFileSync('tone.wav', view)]]: Node بيقبل أي view ويكتب الـ bytes بتاعته.

~~~text الناتج (بعد ما نقرا الملف تاني)
52494646 46464952
{ rate: 8000, bits: 16, bytes: 8000, size: 8044 }
4065 -7921 225 15
~~~

- [[getUint32(0, false)]] بالـ hex [[52494646]] = الحروف [[RIFF]] بالترتيب. نفس الـ bytes little: [[46464952]] (بالعكس). فلو بتقارن توقيع بالأرقام، اقراه big.
- الحجم ٨٠٤٤ = ٤٤ + ٤٠٠٠ عينة × ٢.
- العينة التانية [[4065]] = الـ bytes [[e1 0f]] (٢٢٥ و ١٥): الصغير الأول. ولو قريتها big: [[-7921]]. ده الوشّ اللي هتسمعه لو غلطت في الترتيب.

---

## ٥. نقرا ملف حقيقي: من Node [[Buffer]]

~~~js
const file = readFileSync('tone.wav');
const dv = new DataView(file.buffer, file.byteOffset, file.byteLength);
~~~

السطر ده لازم يبقى كده بالحرف. [[file.buffer]] ممكن يبقى الـ pool بتاع Node كله (٦٥٥٣٦ byte) والملف في حتة منه (درس «ArrayBuffer: byteLength و slice و isView»)، فمن غير [[byteOffset]] و [[byteLength]] بتقرا bytes حاجة تانية. والتمرين التالت تحت فيه الباج ده بناتجه الحقيقي.

---

## ٦. [[DataView]] ولا typed array؟

| | [[DataView]] | typed array |
|---|---|---|
| الأنواع | أي نوع من أي byte | نوع واحد للكل |
| المحاذاة | مش لازم | الـ offset من مضاعفات حجم العنصر |
| الترتيب | انت بتختار، والافتراضي big | ترتيب جهازك دايمًا |
| القراية برّه الحدود | [[RangeError]] | [[undefined]] ساكت |
| السرعة على مليون عنصر | method call لكل عنصر | أسرع: index مباشر |
| الاستخدام | headers وحقول وبروتوكولات | كتل داتا من نفس النوع |

---

## الخلاصة

- [[DataView]] = اقرا أو اكتب نوع معين من byte معين بترتيب تختاره. ٢٢ method بشكل واحد.
- من غير [[true]] = big-endian. WAV و ZIP و BMP little، و PNG والشبكة big.
- على Node [[Buffer]] أو أي view: [[new DataView(x.buffer, x.byteOffset, x.byteLength)]].
- القراية برّه الحدود بترمي [[RangeError]]، والكتابة بتحوّل وتلف ساكتة.`,
          lines: [
            R`بنستورد دالة كتابة ودالة قراية ملف من [[node:fs]].`,
            R`٨٠٠٠ عينة في الثانية لمدة نص ثانية = ٤٠٠٠ عينة.`,
            R`buffer = ٤٤ byte للـ header + ٢ bytes لكل عينة، و [[DataView]] عليه كله.`,
            R`[[tag]] بتكتب نص قصير (إنجليزي) كـ bytes ورا بعض من مكان [[at]] بـ [[setUint8]].`,
            R`أول ١٢ byte: [[RIFF]] وبعدها حجم الملف ناقص ٨ كـ [[Uint32]] little-endian، وبعدها [[WAVE]].`,
            R`chunk الـ [[fmt ]] بطوله ١٦، ونوع الصوت ١ (PCM)، وقناة واحدة، كلهم little-endian.`,
            R`الـ sample rate، و bytes في الثانية، و bytes في العينة (٢)، و bits في العينة (١٦).`,
            R`chunk الـ [[data]] وحجم العينات بالـ bytes.`,
            R`كل عينة موجة sine بتردد ٤٤٠ مضروبة في ١٢٠٠٠ ومقرّبة، ومكتوبة [[Int16]] little-endian بعد الـ header.`,
            R`بنكتب الـ bytes بتاعة الـ view في ملف [[tone.wav]] تقدر تسمعه.`,
            R`بنقرا الملف تاني كـ [[Buffer]] من الديسك.`,
            R`[[DataView]] على نفس الـ bytes بالظبط بالـ [[byteOffset]] و [[byteLength]] عشان pool بتاع Node.`,
            R`أول ٤ bytes كرقم big ثم little: [[52494646]] هي حروف [[RIFF]] بالترتيب، والتاني بالعكس.`,
            R`بنقرا الـ rate والـ bits والحجم من أماكنهم في الـ header، والحجم الكلي ٨٠٤٤.`,
            R`العينة التانية little = [[4065]] (صح)، و big = [[-7921]] (غلط)، والـ byteين نفسهم ٢٢٥ و ١٥.`,
          ],
          ref: [
            { t: "MDN: DataView", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView" },
            { t: "MDN: DataView.prototype.getUint16()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getUint16" },
            { t: "MDN: DataView.prototype.setFloat16()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/setFloat16" },
            { t: "MDN: DataView.prototype.getBigUint64()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getBigUint64" },
            { t: "W3C: PNG Specification (Third Edition)", url: "https://www.w3.org/TR/png-3/" },
            { t: "Node.js: zlib.crc32()", url: "https://nodejs.org/api/zlib.html#zlibcrc32data-value" },
          ],
          pre: [{ to: "js/TypedArray: العيلة و BYTES_PER_ELEMENT و overflow", why: R`الأنواع و endianness في الـ typed arrays قبل ما تختار الترتيب بنفسك` }, { to: "js/BigInt بعمق", why: R`[[getBigUint64]] بيرجّع BigInt` }],
        },
        {
          cmd: "Uint8Array: fromBase64 و toHex و TextEncoder",
          title: "إزاي تحوّل بين النص والـ bytes والـ base64 والـ hex من غير ما العربي يبوظ؟",
          desc: R`الـ bytes مش بتتحط في JSON ولا URL ولا HTML على طول، فبنكتبها **نص**: hex (رقمين لكل byte، سهل تقراه) أو base64 (٤ حروف لكل ٣ bytes، أصغر). ومن ES2026 فيه methods جاهزة على [[Uint8Array]]:

• [[bytes.toHex()]] و [[Uint8Array.fromHex(text)]] و [[bytes.setFromHex(text)]].
• [[bytes.toBase64(options)]] و [[Uint8Array.fromBase64(text, options)]] و [[bytes.setFromBase64(text)]]، و [[alphabet: 'base64url']] للـ URLs.

ولتحويل **النص نفسه** لـ bytes: [[new TextEncoder().encode(text)]] (UTF-8) و [[new TextDecoder().decode(bytes)]]. القديم [[btoa]] و [[atob]] بيشتغلوا على حروف Latin1 بس، فـ [[btoa('شاي')]] بيرمي. **الدعم (اتجرّب):** Chrome 157 فيه الست methods. Node 24.22 مفيهوش ولا واحدة إلا بـ [[node --js-base-64]]، وحتى بيه [[setFromBase64]] و [[setFromHex]] مش موجودين. في Node: [[Buffer]].`,
          example: R`// base64.js: النص ← bytes ← hex و base64، ورجوع (في Console بتاع Chrome)
const bytes = new TextEncoder().encode('شاي');
console.log(bytes, bytes.toHex(), bytes.toBase64());
console.log(new TextDecoder().decode(Uint8Array.fromBase64('2LTYp9mK')));
console.log(Uint8Array.fromHex('cafe01'), Uint8Array.fromBase64('-_8', { alphabet: 'base64url' }));
console.log(Uint8Array.of(255, 254).toBase64({ alphabet: 'base64url', omitPadding: true }));
const target = new Uint8Array(4);
console.log(target.setFromHex('aabbccddee'), target);
try { btoa('شاي'); } catch (e) { console.log(e.name + ': ' + e.message); }
console.log(btoa('tea'), atob('dGVh'));`,
          try: R`شغّل المثال في Console بتاع Chrome (F12 ثم Console). وبعدين شغّله في Node كملف [[.mjs]] مرة عادي ومرة بـ [[node --js-base-64]]: إيه اللي اشتغل وإيه اللي وقع؟ وجرّب نفس التحويل بـ [[Buffer]].`,
          sol: R`~~~text node base64.mjs (Node 24.22)
TypeError: bytes.toHex is not a function
~~~

~~~text node --js-base-64 base64.mjs (Node 24.22)
Uint8Array(6) [ 216, 180, 216, 167, 217, 138 ] d8b4d8a7d98a 2LTYp9mK
شاي
Uint8Array(3) [ 202, 254, 1 ] Uint8Array(2) [ 251, 255 ]
__4
TypeError: target.setFromHex is not a function
~~~

~~~js buffer.mjs
const b = Buffer.from('شاي');
console.log(b.toString('base64'), b.toString('hex'), b.toString('base64url'), Buffer.from('2LTYp9mK', 'base64').toString(), Buffer.from('cafe01', 'hex'));
console.log(Buffer.from('zz', 'hex'), Buffer.from('ab$c', 'base64'));
~~~

~~~text الناتج (Node 24.22)
2LTYp9mK d8b4d8a7d98a 2LTYp9mK شاي <Buffer ca fe 01>
<Buffer > <Buffer 69 b7>
~~~

- Node 24.22 (V8 13.6) فيه الـ methods دي ورا flag تجريبي، والـ [[set]] منهم مش موجودين خالص. فلو كودك هيشتغل في Node، استخدم [[Buffer]] أو اعمل fallback (التمرين التالت).
- [[Buffer]] **متساهل**: [[Buffer.from('zz', 'hex')]] بيرجّع buffer فاضي، و [[Buffer.from('ab$c', 'base64')]] بيتخطى الـ [[$]] ويكمّل، **من غير error**. أما [[Uint8Array.fromHex('zz')]] بيرمي [[SyntaxError]]. للداتا اللي جاية من برّه (input مستخدم)، الـ strict أأمن: الداتا البايظة لازم تقف.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** طول الـ base64 لكل نص، وإزاي شكله في الآخر:

~~~js
for (const s of ['a', 'ab', 'abc', 'abcd', '']) console.log(JSON.stringify(s), btoa(s), btoa(s).length);
~~~`, done: R`كتبت الخمس سطور، وتقدر تقول القاعدة: الطول = ٤ × (عدد الـ bytes ÷ ٣ مقرّب لفوق)، وليه فيه [[=]].`, sol: R`~~~text الناتج (Node 24.22)
"a" YQ== 4
"ab" YWI= 4
"abc" YWJj 4
"abcd" YWJjZA== 8
""  0
~~~

- base64 بياخد كل ٣ bytes (= ٢٤ bit) ويقسمهم ٤ حتت ٦ bit، وكل ٦ bit حرف من ٦٤ حرف ([[A-Z]] و [[a-z]] و [[0-9]] و [[+]] و [[/]]).
- لو الـ bytes مش مضاعفات ٣، آخر مجموعة بتتكمّل بـ [[=]] (padding): byte واحد زيادة = [[==]]، و ٢ = [[=]].
- الحجم بيزيد الثلث: صورة ٣ MB = ٤ MB نص. عشان كده base64 للحاجات الصغيرة (أيقونة، توقيع، token)، مش لملفات كبيرة.
- [[btoa]] شغال هنا لأن الحروف كلها إنجليزي (Latin1). مع العربي: التمرين الجاي.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** عايز تحط اسم المستخدم في token كـ base64. الكود بيقع:

~~~js
const name = 'سارة';
const token = btoa(JSON.stringify({ name }));
console.log(token);
~~~

صلّحه بحيث يشتغل في المتصفح، ورجّع الاسم من الـ token تاني.`, done: R`الـ token اتعمل من غير error، وفكّه رجّع [[{ name: 'سارة' }]] بالظبط.`, sol: R`~~~text الناتج قبل التصليح (Chrome 157)
InvalidCharacterError: Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range.
~~~

~~~js fixed.js
const name = 'سارة';
const token = new TextEncoder().encode(JSON.stringify({ name })).toBase64();
console.log(token);
const back = JSON.parse(new TextDecoder().decode(Uint8Array.fromBase64(token)));
console.log(back);
~~~

~~~text الناتج (Chrome 157)
eyJuYW1lIjoi2LPYp9ix2KkifQ==
{name: 'سارة'}
~~~

- [[btoa]] اتعمل قبل UTF-8: بيعتبر كل حرف في النص byte واحد، وأي حرف كوده أكبر من ٢٥٥ (العربي كله) بيرمي. في Node الرسالة: [[InvalidCharacterError: Invalid character]].
- الترتيب الصح: **نص ← bytes بـ UTF-8 ([[TextEncoder]]) ← base64**، والرجوع بالعكس. [[TextEncoder]] دايمًا UTF-8، والعربي بيبقى ٢ bytes للحرف.
- لو محتاج تحطه في URL: [[toBase64({ alphabet: 'base64url', omitPadding: true })]]، لأن [[+]] و [[/]] و [[=]] ليهم معنى في الـ URL.` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[toBase64Safe(bytes)]] و [[fromBase64Safe(text)]] بيستخدموا الـ methods الجديدة لو موجودة، وإلا [[btoa]] و [[atob]]. لازم يشتغلوا على عربي (bytes UTF-8) وعلى مليون byte من غير ما يقعوا.`, done: R`نفس الكود اشتغل في Node من غير flag (بالـ fallback) ومع [[--js-base-64]] (بالجديد) بنفس الناتج، ومليون byte عدّت، `, sol: R`~~~js b64.mjs
// b64.mjs: base64 بيشتغل في أي مكان: الجديد لو موجود، وإلا btoa على دفعات
function toBase64Safe(bytes) {
  if (typeof bytes.toBase64 === 'function') return bytes.toBase64();
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}
function fromBase64Safe(text) {
  if (typeof Uint8Array.fromBase64 === 'function') return Uint8Array.fromBase64(text);
  return Uint8Array.from(atob(text), (ch) => ch.charCodeAt(0));
}
const bytes = new TextEncoder().encode('شاي بالنعناع');
const text = toBase64Safe(bytes);
console.log(text, new TextDecoder().decode(fromBase64Safe(text)));
const big = new Uint8Array(1_000_000).fill(65);
console.log(toBase64Safe(big).length, fromBase64Safe(toBase64Safe(big)).length);
console.log(typeof Uint8Array.prototype.toBase64);
~~~

~~~text node b64.mjs (Node 24.22)
2LTYp9mKINio2KfZhNmG2LnZhtin2Lk= شاي بالنعناع
1333336 1000000
undefined
~~~

~~~text node --js-base-64 b64.mjs (Node 24.22)
2LTYp9mKINio2KfZhNmG2LnZhtin2Lk= شاي بالنعناع
1333336 1000000
function
~~~

- **الـ fallback:** [[String.fromCharCode(...bytes)]] بيعمل نص كل حرف فيه = byte (من 0 لـ 255، يعني Latin1)، وده اللي [[btoa]] بيقبله. والرجوع: [[atob]] بيرجّع نص زي ده، و [[charCodeAt(0)]] لكل حرف = الـ byte.
- **ليه دفعات [[0x8000]] (٣٢٧٦٨)؟** الـ spread [[...bytes]] بيحوّل كل byte لـ argument في نداء الدالة، ومليون argument بيوقّع البرنامج: [[RangeError: Maximum call stack size exceeded]] (اتجرّب في Node و Chrome). التمرين الجاي بالظبط.
- [[typeof x === 'function']] = «feature detection»: بتسأل المتصفح نفسه بدل ما تخمّن من اسمه أو نسخته.` },
            { lvl: 'تطبيق', t: R`**مسألة:** Node 24 من غير flag مفيهوش [[Uint8Array.fromHex]]. اكتب [[parseHex(text)]] بتاعتك: بتقبل حروف كبيرة وصغيرة ومسافات بين الـ bytes (عشان تلزق hex dump زي [['ca fe 01']])، وترمي [[SyntaxError]] برسالة واضحة لو فيه حرف مش hex (حتى [['0x12']]) أو عدد الحروف فردي.`, done: R`[['ca fe 01']] و [['CAFE']] بيطلعوا الـ bytes الصح، والنص الفاضي array فاضية، و [['abc']] و [['zz']] و [['0x12']] بيرموا برسالتين مختلفتين، والتمرين اللي بيتصحح لوحده عدّى.`, sol: R`~~~js parse-hex.mjs
function parseHex(text) {
  const clean = text.replace(/\s+/g, '');
  if (!/^[0-9a-fA-F]*$/.test(clean)) throw new SyntaxError('حرف مش hex في: ' + JSON.stringify(text));
  if (clean.length % 2) throw new SyntaxError('عدد حروف الـ hex لازم زوجي، اللي وصل ' + clean.length);
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  return out;
}
console.log(parseHex('ca fe 01'), parseHex('CAFE'), parseHex(''));
for (const bad of ['abc', 'zz', '0x12']) try { parseHex(bad); } catch (e) { console.log(e.name + ': ' + e.message); }
~~~

~~~text الناتج (Node 24.22)
Uint8Array(3) [ 202, 254, 1 ] Uint8Array(2) [ 202, 254 ] Uint8Array(0) []
SyntaxError: عدد حروف الـ hex لازم زوجي، اللي وصل 3
SyntaxError: حرف مش hex في: "zz"
SyntaxError: حرف مش hex في: "0x12"
~~~

- [[text.replace(/\s+/g, '')]]: يشيل أي مسافة أو سطر جديد، فالـ dump بيتلزق زي ما هو.
- الفحص بالـ regex الأول: [[^[0-9a-fA-F]*$]] = «من الأول للآخر مفيش غير حروف hex». ليه مش نعتمد على [[parseInt]]؟ لأن [[parseInt('zz', 16)]] بـ [[NaN]] وكان هيتكتب صفر في الـ [[Uint8Array]] ساكت، و [[parseInt('1z', 16)]] بـ ١ (بيقف عند أول حرف غلط). الفحص الصريح هو اللي بيخلّيها strict زي [[fromHex]] مش متساهلة زي [[Buffer]].
- رسالتين مختلفتين للغلطتين (أحسن من V8 اللي بيقول «even length» للاتنين)، فاللي بيستخدمها يعرف يصلّح إيه.
- [[parseInt(pair, 16)]]: النص كرقم بالأساس ١٦.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** في Chrome، حوّل ١ MB bytes لـ base64 ورجّعها بطريقتين: [[toBase64]] و [[fromBase64]]، والقديم [[btoa]] على دفعات و [[atob]] + [[Uint8Array.from]]. قيس الوقت، واتأكد إن الناتج واحد. وجرّب مرة [[btoa(String.fromCharCode(...big))]] من غير دفعات.`, done: R`عندك ٤ أرقام من متصفحك، والنتيجتين متطابقين، وشفت الـ stack overflow.`, sol: R`~~~js bench.js
const big = Uint8Array.from({ length: 1 << 20 }, (_, i) => (i * 7919) % 256);
try { btoa(String.fromCharCode(...big)); } catch (e) { console.log(e.name + ': ' + e.message); }
let t = performance.now(); const b64 = big.toBase64(); const t1 = performance.now() - t;
t = performance.now(); let s = ''; for (let i = 0; i < big.length; i += 0x8000) s += String.fromCharCode(...big.subarray(i, i + 0x8000)); const b64old = btoa(s); const t2 = performance.now() - t;
t = performance.now(); const back = Uint8Array.fromBase64(b64); const t3 = performance.now() - t;
t = performance.now(); const back2 = Uint8Array.from(atob(b64old), (c) => c.charCodeAt(0)); const t4 = performance.now() - t;
console.log('same=' + (b64 === b64old), 'len=' + b64.length, 'toBase64=' + t1.toFixed(1) + 'ms', 'btoaChunks=' + t2.toFixed(1) + 'ms', 'fromBase64=' + t3.toFixed(1) + 'ms', 'atob+from=' + t4.toFixed(1) + 'ms', 'equal=' + back.every((v, i) => v === back2[i]));
~~~

~~~text الناتج (Chrome 157، ويندوز 11)
RangeError: Maximum call stack size exceeded
same=true len=1398104 toBase64=0.2ms btoaChunks=43.2ms fromBase64=0.9ms atob+from=89.2ms equal=true
~~~

- الـ methods الجديدة أسرع **حوالي ١٠٠ مرة** هنا: بتشتغل مباشرة على الـ bytes من غير ما تعمل نص وسيط حرف حرف.
- [[(i * 7919) % 256]] بيملا الـ bytes بأرقام متلخبطة بشكل ثابت. [[crypto.getRandomValues]] مكانش ينفع: حده ٦٥٥٣٦ byte في المرة (اتجرّب: [[QuotaExceededError: ... exceeds the number of bytes of entropy available via this API (65536)]]).
- الطول ١٣٩٨١٠٤ = ٤ × (١٠٤٨٥٧٦ ÷ ٣ مقرّبة لفوق).` },
            { lvl: 'تطبيق', t: R`**ابني صفحة:** صورة PNG صغيرة جاية كنص base64 (من [[tiny.png]] بتاع درس «DataView»). فكّها لـ bytes، واعرضها في [[<img>]] بـ [[Blob]] و [[URL.createObjectURL]]، واكتب تحتها عدد الحروف وعدد الـ bytes والمقاس من الـ header بـ [[DataView]]، وأول ٢٤ byte بالـ hex.`, done: R`الصورة باينة متكبّرة (٣ pixels × ٢)، والسطر بيقول ١١٦ حرف = ٨٥ byte والمقاس ٣ × ٢، والـ hex بيبدأ بـ [[89 50 4e 47]].`, sol: R`~~~live 330 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>صورة من base64</title>
<style>
  body { font: 15px/1.6 system-ui, sans-serif; margin: 16px; }
  img { width: 150px; image-rendering: pixelated; border: 1px solid #999; }
  pre { direction: ltr; text-align: left; background: #f3f4f6; padding: 8px; border-radius: 6px; white-space: pre-wrap; }
</style>
</head>
<body>
<h1>صورة جاية كنص base64</h1>
<img id="img" alt="صورة 3 في 2 pixels متكبّرة">
<p id="info"></p>
<pre id="hex"></pre>
<script>
const b64 = 'iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAIAAAASFvFNAAAAHElEQVR4nGNgYIiqYIj6wBDFwHAiquJE1IcTUQA4GAdF/8wPIAAAAABJRU5ErkJggg==';
const bytes = typeof Uint8Array.fromBase64 === 'function' ? Uint8Array.fromBase64(b64) : Uint8Array.from(atob(b64), (ch) => ch.charCodeAt(0));
const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
const img = document.querySelector('#img');
img.onload = () => img.after(' ← اتعرضت: ' + img.naturalWidth + ' × ' + img.naturalHeight);
img.src = URL.createObjectURL(new Blob([bytes], { type: 'image/png' }));
document.querySelector('#info').textContent = 'النص ' + b64.length + ' حرف = ' + bytes.length + ' byte. المقاس من الـ header: ' + view.getUint32(16) + ' × ' + view.getUint32(20) + (typeof Uint8Array.fromBase64 === 'function' ? ' (فكّيناه بـ Uint8Array.fromBase64)' : ' (فكّيناه بـ atob)');
document.querySelector('#hex').textContent = Array.from(bytes.subarray(0, 24), (b) => b.toString(16).padStart(2, '0')).join(' ');
</script>
</body>
</html>
~~~

**اللي اتقاس (Chrome 157، جوه iframe معزول زي اللي في الموقع):** «← اتعرضت: 3 × 2»، و «النص 116 حرف = 85 byte. المقاس من الـ header: 3 × 2 (فكّيناه بـ Uint8Array.fromBase64)»، والـ hex [[89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 00 03 00 00 00 02]].

- [[new Blob([bytes], { type: 'image/png' })]]: «ملف» في الذاكرة من الـ bytes، و [[URL.createObjectURL]] بيدّيله عنوان [[blob:]] تحطه في [[src]]. (البديل: [[img.src = 'data:image/png;base64,' + b64]] على طول من غير فك، بس كده مش هتقدر تقرا الـ header.)
- [[image-rendering: pixelated]] عشان الـ ٦ pixels يبانوا مربعات مش ضباب لما تكبر لـ ١٥٠ px.
- لو الصفحة هتعيش كتير وبتعمل صور كتير، نادي [[URL.revokeObjectURL(img.src)]] بعد ما تتحمل، عشان الـ Blob ميفضلش في الذاكرة (درس «memory leaks»).` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من MDN صفحة [[Uint8Array.prototype.setFromHex()]]: بترجّع إيه؟ واستخدمها تقرا «stream» hex طويل ([['aabbccdd11223344ee']]) على packets ثابتة ٤ bytes في نفس الـ [[Uint8Array(4)]] من غير ما تعمل arrays جديدة، وتقف لما الباقي يبقى أقل من packet. (Chrome بس.)`, done: R`طبعت packetين [[aabbccdd]] و [[11223344]] و «باقي ناقص: ee»، وتقدر تقول [[read]] و [[written]] معناهم إيه.`, sol: R`~~~js packets.js
const stream = 'aabbccdd11223344ee';
const packet = new Uint8Array(4);
let rest = stream;
while (rest.length) {
  const { read, written } = packet.setFromHex(rest);
  if (written < packet.length) { console.log('باقي ناقص:', rest); break; }
  console.log(packet.toHex(), 'read', read);
  rest = rest.slice(read);
}
~~~

~~~text الناتج (Chrome 157)
aabbccdd read 8
11223344 read 8
باقي ناقص: ee
~~~

**الإجابة:** [[setFromHex]] بتكتب في الـ array **الموجودة** لحد ما تتملى أو النص يخلص، وبترجّع [[{ read, written }]]: [[read]] عدد **الحروف** اللي استهلكتها من النص (٨ = ٤ bytes)، و [[written]] عدد الـ **bytes** اللي كتبتها. فبنقص النص بـ [[read]] ونكمّل. ولما [[written]] أقل من ٤ يبقى آخر packet ناقص. ده بالظبط اللي بتعمله لما الداتا جاية حتت (stream) ومش عايز تعمل array لكل حتة. ونفس الفكرة [[setFromBase64]] (اتجرّب: [[new Uint8Array(3).setFromBase64('AQID BAUG')]] = [[{read: 4, written: 3}]]، كتبت أول ٣ bytes بس لأن مفيش مكان).` },
          ],
          check: { lang: "js", starter: R`function parseHex(text) {
  // hex ← Uint8Array: مسافات مسموحة، و SyntaxError لو حرف مش hex أو عدد فردي
}`, tests: R`test("بمسافات", () => expect(Array.from(parseHex('ca fe 01'))).toEqual([202, 254, 1]));
test("حروف كبيرة", () => expect(Array.from(parseHex('CAFE'))).toEqual([202, 254]));
test("فاضي", () => expect(parseHex('').length).toBe(0));
test("فردي", () => expect(() => parseHex('abc')).toThrow("زوجي"));
test("حرف مش hex", () => expect(() => parseHex('zz')).toThrow("مش hex"));
test("0x", () => expect(() => parseHex('0x12')).toThrow("مش hex"));
test("بيرجّع Uint8Array", () => expect(parseHex('ff') instanceof Uint8Array).toBe(true));`, solution: R`function parseHex(text) {
  const clean = text.replace(/\s+/g, '');
  if (!/^[0-9a-fA-F]*$/.test(clean)) throw new SyntaxError('حرف مش hex في: ' + JSON.stringify(text));
  if (clean.length % 2) throw new SyntaxError('عدد حروف الـ hex لازم زوجي، اللي وصل ' + clean.length);
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  return out;
}` },
          flag: "script",
          deep: {
            why: R`أماكن كتير بتقبل نص بس: JSON، و URLs، و HTML attributes، والـ headers، والإيميل، و localStorage. فأي bytes (صورة صغيرة، مفتاح تشفير، hash، توقيع، token) لازم تتكتب نص من غير ما يضيع منها حاجة. hex للبشر (الـ hashes والـ dumps والألوان)، و base64 للحجم (٣٣٪ زيادة بس بدل ١٠٠٪). وقبل ES2026 كان الطريق الوحيد في المتصفح [[btoa]] و [[atob]]، اللي اتعملوا للـ Latin1 وبيقعوا مع العربي وبيبطّئوا مع الحجم، فكل مشروع كان بيكتب helper بإيده أو يجيب مكتبة.`,
            how: R`[[TextEncoder]] بيحوّل النص (UTF-16 جوه JavaScript) لـ bytes UTF-8 دايمًا (مفيش encoding تاني)، و [[encodeInto(text, target)]] بيكتب في array موجودة ويرجّع [[{ read, written }]] (درس «WebAssembly في المتصفح»). [[TextDecoder(label, { fatal, ignoreBOM })]] بيفك أي encoding معروف ([['utf-8']] و [['utf-16le']] و [['windows-1256']] للعربي القديم، اتجرّب بيطلّع [[السلام]])؛ والـ byte البايظ بيبقى [[�]] إلا لو [[fatal: true]] فبيرمي ([[TypeError: The encoded data was not valid for encoding utf-8]] في Node، و [[TypeError: Failed to execute 'decode' on 'TextDecoder': The encoded data was not valid.]] في Chrome)، و [[{ stream: true }]] للـ chunks (درس «Streams»).

[[toBase64({ alphabet, omitPadding })]]: الـ alphabet [['base64']] (الافتراضي، فيه [[+]] و [[/]]) أو [['base64url']] (فيه [[-]] و [[_]])، و [[omitPadding: true]] بيشيل الـ [[=]]. [[Uint8Array.fromBase64(text, { alphabet, lastChunkHandling })]] بيتجاهل المسافات والأسطر، وبيرمي [[SyntaxError]] على أي حرف مش من الـ alphabet؛ و [[lastChunkHandling]]: [['loose']] (الافتراضي، بيقبل آخر مجموعة من غير [[=]])، و [['strict']] (لازم padding صح؛ اتجرّب [['YWJjZA']] بيرمي برسالة [[The base64 input terminates with a single character, excluding padding (=).]] اللي مش دقيقة)، و [['stop-before-partial']] (بيقف قبل المجموعة الناقصة، للـ streams). [[fromHex]] بيقبل حروف كبيرة وصغيرة، وطول فردي أو حرف مش hex بيرمي (والاتنين بنفس الرسالة في V8: [[Input string must contain hex characters in even length]]). و [[setFromBase64]] و [[setFromHex]] بيكتبوا في array موجودة لحد ما تتملى.`,
            when: R`[[TextEncoder]] و [[TextDecoder]]: أي نص هيبقى bytes (تشفير، hashing، ملف، شبكة، wasm) أو العكس. hex: hashes وبصمات وألوان و debugging. base64: صور صغيرة في JSON أو CSS، والمفاتيح والتوقيعات، والـ JWT (base64url من غير padding)، وأي binary في نظام بيقبل نص بس. الـ methods الجديدة: في المتصفح (Baseline من سبتمبر ٢٠٢٥: Chrome 140 و Firefox 133 و Safari 18.2). في Node لحد ما تبقى من غير flag: [[Buffer.from(x, 'base64')]] و [[buf.toString('base64url')]]، مع العلم إن [[Buffer]] متساهل مع الحروف الغلط. [[btoa]] و [[atob]]: بس لو متأكد إن النص Latin1 أو الكود قديم.`,
            mistakes: R`- [[btoa('شاي')]]: [[InvalidCharacterError]]. لازم [[TextEncoder]] الأول.
- [[btoa(String.fromCharCode(...bigBytes))]]: [[RangeError: Maximum call stack size exceeded]] لملف كبير. دفعات أو [[toBase64]].
- تحط base64 العادي في URL: [[+]] بتتقري مسافة و [[/]] بتقسم الـ path. [[base64url]].
- [[atob]] بيرجّع **نص** كل حرف فيه byte، مش الـ bytes ولا النص الأصلي: محتاج [[Uint8Array.from(..., c => c.charCodeAt(0))]] وبعدين [[TextDecoder]].
- تفك chunks بـ [[TextDecoder]] من غير [[stream: true]]: الحرف العربي المقسوم بيبقى [[�]].
- تعتمد على [[Buffer]] في كود هيتعمله bundle للمتصفح: مش موجود هناك.
- تفترض إن [[toHex]] موجود في Node 24: [[TypeError: bytes.toHex is not a function]] من غير flag.
- تستخدم base64 «للتشفير»: ده **ترميز** أي حد يفكه في ثانية، مش حماية.`,
          },
          teach: R`## الفكرة في سطر

النص ⇄ bytes بـ [[TextEncoder]] و [[TextDecoder]]، والـ bytes ⇄ نص قابل للنقل بـ hex أو base64. الناتج من Chrome 157 (Console) إلا لو مكتوب Node 24.22.

---

## ١. [[TextEncoder]] و [[TextDecoder]]: النص والـ bytes

~~~js
const bytes = new TextEncoder().encode('شاي');
console.log(bytes);
console.log(new TextDecoder().decode(bytes));
~~~

~~~text الناتج
Uint8Array(6) [216, 180, 216, 167, 217, 138]
شاي
~~~

- [[new TextEncoder().encode(text)]]: النص لـ bytes بـ UTF-8، والعربي ٢ bytes للحرف.
- [[new TextDecoder().decode(bytes)]]: العكس، والافتراضي UTF-8.

| الـ option | بيعمل إيه (اتجرّب في Node 24.22) |
|---|---|
| [[new TextDecoder('windows-1256')]] | يفك ملفات عربي قديمة: [[c7 e1 d3 e1 c7 e3]] = [[السلام]] |
| [[{ fatal: true }]] | يرمي [[TypeError]] بدل ما يحط [[�]] مكان الـ byte البايظ |
| [[{ ignoreBOM: true }]] | يسيب الـ BOM ([[ef bb bf]]) في أول النص بدل ما يشيله: الطول ٢ بدل ١ |
| [[decode(chunk, { stream: true })]] | للـ chunks: الحرف المقسوم بين chunkين بيتجمع صح (درس «Streams») |
| [[encoder.encodeInto(text, target)]] | يكتب في array موجودة: [[{ read: 2, written: 4 }]] لما المكان ٥ bytes والنص «شاي» |

---

## ٢. [[Uint8Array.prototype.toHex]] و [[Uint8Array.fromHex]]

~~~js
console.log(bytes.toHex());
console.log(Uint8Array.fromHex('cafe01'), Uint8Array.fromHex('CAFE').toHex());
~~~

~~~text الناتج
d8b4d8a7d98a
Uint8Array(3) [202, 254, 1] cafe
~~~

- [[toHex()]]: كل byte رقمين hex صغيرين، من غير مسافات.
- [[Uint8Array.fromHex(text)]]: العكس، وبيقبل الحروف الكبيرة.
- طول فردي ([['abc']]) أو حرف مش hex ([['zz']]): [[SyntaxError: Input string must contain hex characters in even length]] (نفس الرسالة للاتنين في V8، فمتعتمدش عليها في التشخيص).

---

## ٣. [[Uint8Array.prototype.toBase64]] و [[Uint8Array.fromBase64]]

~~~js
console.log(bytes.toBase64(), new TextDecoder().decode(Uint8Array.fromBase64('2LTYp9mK')));
console.log(Uint8Array.fromBase64('-_8', { alphabet: 'base64url' }));
console.log(Uint8Array.of(255, 254).toBase64({ alphabet: 'base64url', omitPadding: true }));
~~~

~~~text الناتج
2LTYp9mK شاي
Uint8Array(2) [251, 255]
__4
~~~

| الـ option | القيم |
|---|---|
| [[alphabet]] | [['base64']] الافتراضي ([[+]] و [[/]])، أو [['base64url']] ([[-]] و [[_]]) للـ URLs والـ JWT |
| [[omitPadding]] في [[toBase64]] | [[true]] يشيل الـ [[=]] من الآخر |
| [[lastChunkHandling]] في [[fromBase64]] | [['loose']] الافتراضي يقبل آخر مجموعة ناقصة، و [['strict']] يرمي لو الـ padding مش صح، و [['stop-before-partial']] يقف قبلها |

- [[fromBase64]] بيتجاهل المسافات والأسطر ([['2LTY\np9mK']] = ٦ bytes)، وبيرمي على أي حرف تاني: [[SyntaxError: Found a character that cannot be part of a valid base64 string.]] (زي [['-_8']] من غير [[base64url]]).

---

## ٤. [[Uint8Array.prototype.setFromHex]] و [[Uint8Array.prototype.setFromBase64]]: اكتب في array موجودة

~~~js
const target = new Uint8Array(4);
console.log(target.setFromHex('aabbccddee'), target);
~~~

~~~text الناتج
{read: 8, written: 4} Uint8Array(4) [170, 187, 204, 221]
~~~

- النص فيه ٥ bytes والـ array ٤: كتب ٤ ووقف. [[read]] = ٨ حروف استهلكها، و [[written]] = ٤ bytes كتبها.
- [[setFromBase64]] بيكتب **مجموعات كاملة** بس: [[new Uint8Array(2).setFromBase64('YWJjZA==')]] = [[{read: 0, written: 0}]]، لأن أول مجموعة ٣ bytes ومش هتكفي في ٢. اتجرّب، وده بيفاجئ.

---

## ٥. [[btoa]] و [[atob]] و [[Buffer]]: القديم

~~~js
try { btoa('شاي'); } catch (e) { console.log(e.name + ': ' + e.message); }
console.log(btoa('tea'), atob('dGVh'));
~~~

~~~text الناتج
InvalidCharacterError: Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range.
dGVh tea
~~~

| | [[toBase64]] و [[fromBase64]] | [[btoa]] و [[atob]] | [[Buffer]] (Node) |
|---|---|---|---|
| بيشتغل على | bytes | نص Latin1 (كل حرف byte) | bytes |
| العربي | عن طريق [[TextEncoder]] | بيرمي | عن طريق [[Buffer.from(text)]] |
| ١ MB | ٠.٢ ms (اتقاس) | لازم دفعات، ٤٣ ms | سريع |
| حرف غلط | [[SyntaxError]] | [[InvalidCharacterError]] | بيتجاهله ساكت |
| base64url | [[alphabet: 'base64url']] | لأ، بإيدك | [[toString('base64url')]] |
| فين | المتصفحات من ٢٠٢٥، و Node بـ flag | كل مكان | Node بس |

---

## الخلاصة

- النص ← bytes: [[TextEncoder]] (UTF-8). والعكس [[TextDecoder]]، و [[fatal: true]] لو عايز ترفض الداتا البايظة.
- bytes ← نص: [[toHex]] للقراية، و [[toBase64]] للحجم، و [[base64url]] للـ URLs. والعكس [[fromHex]] و [[fromBase64]] (strict).
- [[btoa]] مع العربي بيرمي، ومع ملف كبير لازم دفعات.
- Node 24.22: الجديد ورا [[--js-base-64]] ومن غير [[set]]، فـ [[Buffer]] أو fallback.`,
          lines: [
            R`[[TextEncoder]] بيحوّل «شاي» لـ ٦ bytes UTF-8 في [[Uint8Array]].`,
            R`بيطبع الـ bytes، وبعدين [[toHex()]] (رقمين لكل byte) و [[toBase64()]] (٨ حروف لـ ٦ bytes).`,
            R`[[Uint8Array.fromBase64]] بيرجّع الـ bytes من النص، و [[TextDecoder]] بيرجّعهم «شاي».`,
            R`[[fromHex]] بيقرا كل حرفين byte، و [[base64url]] بيفهم [[-]] و [[_]] بدل [[+]] و [[/]].`,
            R`[[base64url]] من غير padding: الـ ٢ bytes بقوا ٣ حروف [[__4]] من غير [[=]].`,
            R`array فاضية ٤ bytes هنكتب فيها من نص hex.`,
            R`[[setFromHex]] كتب ٤ bytes ووقف لأن الـ array اتملت، ورجّع [[read]] ٨ حروف و [[written]] ٤.`,
            R`[[btoa]] مع حروف عربي بيرمي [[InvalidCharacterError]] لأنه بيقبل Latin1 بس.`,
            R`مع حروف إنجليزي [[btoa]] و [[atob]] شغالين: [[dGVh]] و [[tea]].`,
          ],
          ref: [
            { t: "MDN: Uint8Array.fromBase64()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array/fromBase64" },
            { t: "MDN: Uint8Array.fromHex()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array/fromHex" },
            { t: "MDN: Uint8Array.prototype.toBase64()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array/toBase64" },
            { t: "MDN: Uint8Array.prototype.toHex()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array/toHex" },
            { t: "MDN: Uint8Array.prototype.setFromBase64()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array/setFromBase64" },
            { t: "MDN: Uint8Array.prototype.setFromHex()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array/setFromHex" },
            { t: "MDN: TextEncoder", url: "https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder" },
            { t: "MDN: TextDecoder", url: "https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder" },
            { t: "MDN: Window.btoa()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/btoa" },
          ],
          pre: [{ to: "js/string و UTF-16: length و codePointAt", why: R`ليه العربي ٢ bytes في UTF-8 وحرف واحد في [[length]]` }, { to: "js/Streams", why: R`[[TextDecoderStream]] و [[stream: true]] للـ chunks` }],
        },
        {
          cmd: "Web Workers و worker_threads: postMessage و transfer",
          title: "إزاي تشغّل حساب تقيل في thread تاني من غير ما الصفحة تقف، وتبعتله bytes من غير نسخ؟",
          desc: R`JavaScript بتشغّل كودك على thread واحد (الـ main thread)، فأي loop تقيل بيجمّد الصفحة كلها (درس «blocking و الـ main thread»). الـ **Worker** ملف JavaScript بيشتغل في thread لوحده، بـ global لوحده ومن غير DOM، والكلام بينكم **رسايل بس**:

• [[const worker = new Worker('worker.js', { type: 'module' })]] في الصفحة.
• [[worker.postMessage(data, [transfer])]] و [[worker.onmessage = (e) => e.data]]، وجوه الـ worker [[self.onmessage]] و [[self.postMessage]].
• الداتا بتتنسخ بـ **structured clone** (زي [[structuredClone]])، إلا اللي تحطه في قايمة الـ transfer: ده بيتنقل من غير نسخ، وعندك بيبقى **detached** (طوله صفر).
• [[worker.onerror]] للأخطاء، و [[worker.terminate()]] يقفله فورًا.

وفي Node نفس الفكرة من [[node:worker_threads]]: [[new Worker(file)]] و [[parentPort]] و [[worker.on('message')]].`,
          example: R`// main.js (في الصفحة): الحساب التقيل في Worker، والصفحة فاضية ترد على اليوزر
const worker = new Worker('worker.js', { type: 'module', name: 'invert' });
worker.onmessage = (e) => console.log('رد:', e.data.id, e.data.first, e.data.bytes.length, e.data.ms + 'ms');
worker.onerror = (e) => { e.preventDefault(); console.log('error في الـ worker:', e.message); };
const bytes = new Uint8Array(8_000_000).fill(10);
worker.postMessage({ id: 1, bytes }, [bytes.buffer]);
console.log('بعد الإرسال:', bytes.byteLength, bytes.buffer.detached);
const tick = setInterval(() => console.log('الصفحة لسه بترد'), 40);
setTimeout(() => worker.postMessage({ id: 2, bytes: 'مش bytes' }), 60);
setTimeout(() => { clearInterval(tick); worker.terminate(); console.log('اتقفل'); }, 400);`,
          try: R`اعمل الـ ٣ ملفات اللي في أول الشرح ([[index.html]] و [[main.js]] و [[worker.js]]) في فولدر، وشغّل سيرفر صغير ([[npx serve]] أو [[python -m http.server]])، وافتح الصفحة والـ Console. وبعدين انقل الـ loop التقيل من الـ worker للـ [[main.js]] نفسه: كام مرة «الصفحة لسه بترد» اتطبعت وهو شغال؟`,
          sol: R`~~~js main-blocking.js
let ticks = 0;
const iv = setInterval(() => ticks++, 40);
const bytes = new Uint8Array(8_000_000).fill(10);
const t = performance.now();
for (let round = 0; round < 21; round++) for (let i = 0; i < bytes.length; i++) bytes[i] = 255 - bytes[i];
const ms = Math.round(performance.now() - t);
setTimeout(() => { console.log('main thread:', ms + 'ms', 'ticks وهو شغال:', ticks); clearInterval(iv); }, 0);
~~~

~~~text الناتج (Chrome 157)
main thread: 238ms ticks وهو شغال: 0
~~~

- نفس الحساب (١٦٨ مليون عملية) في الـ worker خد ١٢١ ms والـ timer اشتغل ٣ مرات في نفس الوقت. على الـ main thread خد ٢٣٨ ms والـ timer **صفر**: مفيش ضغطة زرار ولا scroll ولا animation اتعملت طول الوقت ده، لأن الـ event loop مش فاضي (درس «event loop»).
- الأرقام بتختلف من جهاز للتاني، بس الصفر ده ثابت: طول ما كودك شغال على الـ main thread، مفيش حاجة تانية بتحصل.
- ليه سيرفر؟ Chrome مبيحمّلش worker من صفحة مفتوحة كملف ([[file://]])، لازم [[http://]]. ده نفس سبب إن تمارين SQL في الموقع محتاجة النسخة الأونلاين.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** الـ structured clone (اللي [[postMessage]] بيستخدمه) بيعمل إيه في كل قيمة؟ اتوقّع وبعدين شغّل في Node:

~~~js
class Point { constructor(x) { this.x = x; } len() { return 1; } }
const c = structuredClone({ p: new Point(3), m: new Map([[1, 'a']]), d: new Date(0), r: /x/g, e: new RangeError('bad'), u: Uint8Array.of(1), big: 10n });
console.log(c.p instanceof Point, c.p, c.m, c.d instanceof Date, c.r, c.e instanceof RangeError, c.e.message, c.u, c.big);
const o = {}; o.me = o;
const oc = structuredClone(o);
console.log(oc.me === oc);
try { structuredClone({ f: () => 1 }); } catch (e) { console.log(e.name + ': ' + e.message); }
~~~`, done: R`كتبت التلات سطور، وعرفت إن الـ class بيوصل object عادي من غير methods، والدالة بترمي.`, sol: R`~~~text الناتج (Node 24.22)
false { x: 3 } Map(1) { 1 => 'a' } true /x/g true bad Uint8Array(1) [ 1 ] 10n
true
DataCloneError: () => 1 could not be cloned.
~~~

- [[Map]] و [[Date]] و [[RegExp]] و الـ errors والـ typed arrays و [[BigInt]] بيتنسخوا صح بنوعهم.
- **الـ class بيضيع:** [[c.p]] object عادي فيه [[x]] بس، و [[instanceof Point]] بـ [[false]]، والـ method [[len]] مش موجودة. الـ worker مبيعرفش الـ class بتاعتك، فلو محتاجها ابعت داتا خام واعمل [[new Point(data.x)]] هناك.
- الـ object اللي بيشاور على نفسه بيتنسخ صح (الـ JSON كان هيرمي).
- الدوال بترمي [[DataCloneError]]. وفي Chrome مع [[postMessage]] الرسالة: [[DataCloneError: Failed to execute 'postMessage' on 'Worker': () => 1 could not be cloned.]] (اتجرّب)، ونفس الكلام للـ Symbol وعناصر الـ DOM.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** ابعت [[ArrayBuffer]] حجمه 64 MB لـ worker بيرجّعه، مرة نسخ ([[postMessage(buf)]]) ومرة نقل ([[postMessage(buf, [buf])]]). قيس وقت الرحلة رايح جاي، واطبع [[buf.detached]] بعد كل مرة. كرّر مرتين.`, done: R`عندك ٤ أرقام من متصفحك، والنقل أسرع بكتير، والأصل detached بعد النقل بس.`, sol: R`~~~js echo.js
// echo.js: بيرجّع اللي وصله زي ما هو، ولو buffer بيرجّعه بالنقل
self.onmessage = (e) => self.postMessage(e.data, e.data instanceof ArrayBuffer ? [e.data] : []);
~~~

~~~js bench.js
const worker = new Worker('echo.js');
const roundTrip = (buf, transfer) => new Promise((resolve) => {
  const t = performance.now();
  worker.onmessage = (e) => resolve({ ms: performance.now() - t, back: e.data });
  worker.postMessage(buf, transfer ? [buf] : []);
});
for (const transfer of [false, true, false, true]) {
  const buf = new ArrayBuffer(64 * 1024 * 1024);
  const { ms, back } = await roundTrip(buf, transfer);
  console.log((transfer ? 'transfer' : 'copy    ') + ' ' + ms.toFixed(1) + ' ms, الأصل detached=' + buf.detached + ', رجع ' + back.byteLength);
}
worker.terminate();
~~~

~~~text الناتج (Chrome 157، ويندوز 11)
copy     105.5 ms, الأصل detached=false, رجع 67108864
transfer 7.2 ms, الأصل detached=true, رجع 67108864
copy     93.5 ms, الأصل detached=false, رجع 67108864
transfer 15.1 ms, الأصل detached=true, رجع 67108864
~~~

- **النسخ:** ٦٤ MB اتنسخت رايح (والرجوع نقل في الحالتين لأن [[echo.js]] بيرجّع بالنقل)، فحوالي ١٠٠ ms، والذاكرة اتضاعفت لحظيًا (نسخة عندك ونسخة هناك).
- **النقل:** الـ bytes نفسها اتنقلت من غير ما تتنسخ، فالوقت تقريبًا ثابت مهما كبر الـ buffer، بس الأصل عندك بقى طوله صفر.
- القاعدة: لو مش محتاج الـ buffer بعد ما تبعته، انقله. ولو محتاجه، يا تنسخ يا تستنى يرجعلك (زي فلتر الصور في مشروع الوحدة).
- [[await]] برّه أي دالة شغال هنا لأني شغّلته في Console بتاع Chrome، وفي ملف لازم [[<script type="module">]].` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الـ worker ده بيقع أول ما يبدأ. الصفحة بتعمله بـ [[new Worker('mod.js', { type: 'module' })]]. اقرا الرسالة وصلّح:

~~~js
// mod.js
importScripts('helpers.js');
self.onmessage = (e) => self.postMessage(double(e.data));
~~~`, done: R`الـ worker بيرد بـ [[42]] على [[21]]، وتقدر تقول الفرق بين classic و module worker.`, sol: R`~~~text الرسالة (Chrome 157)
TypeError: Failed to execute 'importScripts' on 'WorkerGlobalScope': Module scripts don't support importScripts().
~~~

~~~js helpers.js
export const double = (n) => n * 2;
~~~

~~~js mod.js
import { double } from './helpers.js';
self.onmessage = (e) => self.postMessage(double(e.data));
~~~

- **classic worker** (من غير [[type]]): بيحمّل ملفات تانية بـ [[importScripts('a.js', 'b.js')]] (بتشغّلهم كأنهم جزء من الملف، و global). ولو الملف مش موجود: [[NetworkError: Failed to execute 'importScripts' on 'WorkerGlobalScope': The script at '.../x.js' failed to load.]] (اتجرّب).
- **module worker** ([[type: 'module']]): بيستخدم [[import]] و [[export]] زي أي module (درس «import و export»)، و [[importScripts]] ممنوعة فيه. وده الأحسن في الكود الجديد: نفس الملفات تشتغل في الصفحة والـ worker، والـ bundlers (Vite) بتفهمه.
- لو الـ worker نفسه ملفه مش موجود (404)، [[onerror]] بيجيلك [[Event]] عادي من غير [[message]] (اتجرّب: [[message]] بـ [[undefined]])، فاطبع الـ URL بنفسك في الـ handler.` },
            { lvl: 'تحدي', t: R`**ابني (Node):** [[createClient(file)]] بتحوّل الكلام مع [[worker_threads]] لـ Promises: [[client.sum(float64Array, { transfer })]] بترجّع Promise بالمجموع. كل طلب ليه [[id]]، والـ worker بيرد بنفس الـ [[id]]، فكذا طلب في نفس الوقت مبيتلخبطوش. لو الـ worker رد بـ [[error]] الـ Promise ترفض، ولو الـ worker وقع كل الطلبات المستنية ترفض.`, done: R`٣ طلبات في [[Promise.all]] بيرجعوا [[499500]] و [[0.75]] ورفض برسالة الـ worker، والـ array اللي اتبعتت بـ transfer طولها بقى صفر والتانية لأ.`, sol: R`~~~js sum-worker.mjs
// sum-worker.mjs: كل طلب فيه id، والرد بنفس الـ id
import { parentPort } from 'node:worker_threads';
parentPort.on('message', ({ id, numbers }) => {
  if (!(numbers instanceof Float64Array)) return parentPort.postMessage({ id, error: 'numbers لازم Float64Array' });
  let total = 0;
  for (const n of numbers) total += n;
  parentPort.postMessage({ id, total });
});
~~~

~~~js rpc.mjs
// rpc.mjs: نحوّل postMessage لـ Promise: كل طلب ليه id، والرد بيتوصّل للـ Promise بتاعته
import { Worker } from 'node:worker_threads';
export function createClient(file) {
  const worker = new Worker(file);
  const pending = new Map();
  let nextId = 1;
  worker.on('message', ({ id, total, error }) => {
    const p = pending.get(id);
    pending.delete(id);
    if (error) p.reject(new Error(error)); else p.resolve(total);
  });
  worker.on('error', (err) => { for (const p of pending.values()) p.reject(err); pending.clear(); });
  return {
    sum(numbers, { transfer = false } = {}) {
      const id = nextId++;
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
        worker.postMessage({ id, numbers }, transfer ? [numbers.buffer] : []);
      });
    },
    close: () => worker.terminate(),
  };
}
const client = createClient(new URL('./sum-worker.mjs', import.meta.url));
const a = Float64Array.from({ length: 1000 }, (_, i) => i);
const b = Float64Array.of(0.5, 0.25);
const results = await Promise.all([client.sum(a, { transfer: true }), client.sum(b), client.sum([1, 2]).catch((e) => 'رفض: ' + e.message)]);
console.log(results, a.length, b.length);
await client.close();
~~~

~~~text الناتج (Node 24.22)
[ 499500, 0.75, 'رفض: numbers لازم Float64Array' ] 0 2
~~~

- [[pending]] = [[Map]] من [[id]] للـ [[resolve]] و [[reject]] بتوع كل Promise. الرد لما يوصل بيدوّر بالـ [[id]] ويكمّل الـ Promise الصح، حتى لو الردود وصلت بترتيب مختلف.
- [[worker.on('error')]]: لو الـ worker رمى error ومسكهوش، الـ thread بيموت وكل اللي مستني لازم يترفض، وإلا الـ Promises هتفضل معلّقة للأبد.
- [[new URL('./sum-worker.mjs', import.meta.url)]]: المسار نسبةً للملف نفسه مش للفولدر اللي شغّلت منه.
- ده نفس اللي مكتبات زي Comlink بتعمله في المتصفح، ونفس فكرة «JSON-RPC». في الشغل ممكن تبني عليه pool من كذا worker (عدد الـ cores = [[os.availableParallelism()]] في Node، أو [[navigator.hardwareConcurrency]] في المتصفح: ١٦ على الجهاز ده).` },
            { lvl: 'سريع', t: R`**اشرحها:** لكل حالة من دول، يستاهل Worker ولا لأ؟ وليه في سطر: (أ) [[fetch]] لـ ٢٠ API في نفس الوقت، (ب) ضغط صورة ١٢ ميجا قبل الرفع، (ج) فلترة لستة ٢٠٠ منتج وانت بتكتب في البحث، (د) قراية ملف CSV ٨٠ ميجا وحساب إحصائيات، (هـ) [[setTimeout]] كل ثانية يحدّث ساعة.`, done: R`كتبت إجابة لكل حالة بسبب، وطلعوا ٢ بس محتاجين Worker.`, sol: R`**إجابة نموذجية:**

| الحالة | Worker؟ | ليه |
|---|---|---|
| (أ) ٢٠ [[fetch]] | لأ | الشبكة async أصلًا: الـ main thread مش بيستنى، بيبعت ويكمّل. [[Promise.all]] كفاية (درس «Promise.all و allSettled») |
| (ب) ضغط صورة ١٢ MB | آه | حساب على ملايين pixels بياخد مئات الـ ms: نفس فلتر الـ blur في مشروع الوحدة (٥٠٠ ms وصفر frames على الـ main thread) |
| (ج) فلترة ٢٠٠ منتج | لأ | أقل من ملّي ثانية. تكلفة إنشاء الـ worker ونسخ الداتا أكبر من الشغل نفسه. لو حاسس ببطء: debounce (درس «debounce و throttle») |
| (د) CSV ٨٠ MB | آه | الـ parsing والحساب ثواني. والأحسن كمان تقراه stream جوه الـ worker (درس «Streams») |
| (هـ) ساعة كل ثانية | لأ | شغل صغير جدًا كل ثانية، ومحتاج الـ DOM أصلًا (والـ worker مفيهوش DOM) |

**القاعدة:** Worker للحساب التقيل (CPU) اللي بياخد أكتر من حوالي ٥٠ ms، مش للانتظار (I/O)، ومش للشغل الصغير.` },
          ],
          flag: "script",
          deep: {
            why: R`الـ event loop بيشغّل حاجة واحدة في المرة على thread واحد، وده مريح (مفيش اتنين بيعدّلوا نفس المتغير في نفس اللحظة) بس معناه إن أي حساب بياخد ١٠٠ ms بيجمّد الصفحة ١٠٠ ms. والأجهزة فيها ٨ و ١٦ core. الـ Workers بتديك threads حقيقية، والتصميم بتاعها **من غير ذاكرة مشتركة** (كل worker heap لوحده، والكلام رسايل بس) عشان تاخد التوازي من غير race conditions. ولما الرسالة كبيرة، الـ transfer بيشيل تكلفة النسخ. والذاكرة المشتركة موجودة برضه لما تحتاجها فعلًا ([[SharedArrayBuffer]]، الدرس الجاي).`,
            how: R`[[new Worker(url, { type, name })]] بيحمّل الملف (نفس الـ origin، و [[http]] مش [[file]]) ويشغّله في thread جديد بـ global اسمه [[self]] (نوعه [[DedicatedWorkerGlobalScope]]): فيه [[fetch]] و [[setTimeout]] و [[IndexedDB]] و [[crypto]] و [[WebSocket]] و [[OffscreenCanvas]]، ومفيهوش [[document]] ولا [[window]] (اتجرّب: [[typeof document]] جوه الـ worker = [[undefined]]). [[name]] بيظهر في DevTools وفي [[self.name]].

[[postMessage(data, transfer)]] بيعمل structured clone للـ [[data]] (بيلف عليها كلها، بيدعم الدوائر و [[Map]] و [[Set]] و [[Date]] و [[Blob]] والـ typed arrays، ومبيدعمش الدوال والـ Symbols والـ DOM والـ prototypes) في الوقت اللي بتنادي فيه، وأي [[ArrayBuffer]] في قايمة [[transfer]] بيتفصل عندك ويتنقل (قايمة فيها نفس الـ buffer مرتين: [[DataCloneError: ... ArrayBuffer at index 1 is a duplicate of an earlier ArrayBuffer.]]، و buffer مفصول قبل كده: [[DataCloneError: ... ArrayBuffer at index 0 is already detached.]]، اتجرّبوا). الرسالة بتتحط في طابور الطرف التاني وبتتشغل كـ task في الـ event loop بتاعه. [[terminate()]] بيقتل الـ thread فورًا حتى لو في نص loop، وأي رسالة بعدها بتتجاهَل من غير error. error مش ممسوك جوه الـ worker بيوصل [[ErrorEvent]] في [[worker.onerror]] (فيه [[message]] و [[filename]] و [[lineno]])، و [[e.preventDefault()]] بيمنعه يتطبع في الـ Console كـ uncaught.

في Node: [[worker_threads]] نفس الفكرة بأسماء تانية: [[new Worker(file, { workerData })]]، وجوه الـ worker [[parentPort.on('message')]] و [[parentPort.postMessage]] و [[workerData]] و [[isMainThread]]، وبرّه [[worker.on('message' | 'error' | 'exit')]]. والـ error المش ممسوك بيقفل الـ worker بـ exit code 1.`,
            when: R`استخدم Worker لما فيه حساب بياخد أكتر من حوالي ٥٠ ms (ميزانية الـ frame اللي اليوزر يحس بيها): معالجة صور وصوت، و parsing لملفات كبيرة (CSV و JSON ضخم و zip)، وتشفير وضغط، و search على داتا محلية كبيرة، و wasm تقيل، و syntax highlighting لملف ضخم. في Node: معالجة صور أو PDFs أو hashing جوه سيرفر عشان الـ requests التانية متستناش. **مش محتاجه** للـ I/O ([[fetch]] وقراية الملفات): دي async أصلًا ومش بتبلّك. وإنشاء worker بياخد وقت وذاكرة (عشرات الـ ms)، فاعمله مرة وابعتله شغل كتير، أو pool.`,
            mistakes: R`- تفتح الصفحة من [[file://]]: الـ worker مبيتحمّلش. شغّل سيرفر.
- تستخدم [[document]] أو [[window]] جوه الـ worker: [[ReferenceError]]. ابعت الداتا وارسم في الصفحة، أو [[OffscreenCanvas]].
- تبعت دالة أو class instance: [[DataCloneError]] أو الـ methods بتضيع.
- تبعت buffer ضخم من غير transfer: نسخة كاملة كل مرة (١٠٠ ms لـ ٦٤ MB).
- تستخدم الـ typed array بعد ما نقلت الـ buffer بتاعها: طولها صفر والقراية [[undefined]] ساكتة.
- [[importScripts]] في module worker: [[TypeError: ... Module scripts don't support importScripts().]]
- متحطش [[onerror]]: الـ worker بيموت بصمت والـ Promise بتاعك مستنية للأبد.
- تعمل worker جديد لكل طلب صغير: تكلفة الإنشاء أكبر من الشغل نفسه.
- متعملش [[terminate()]] للـ worker اللي خلص شغله في صفحة بتعيش كتير (SPA): thread وذاكرة على الفاضي (درس «memory leaks»).`,
          },
          teach: R`## الفكرة في سطر

الـ Worker = كود في thread تاني، والكلام معاه رسايل بتتنسخ، والـ buffers الكبيرة تتنقل من غير نسخ. الناتج من Chrome 157 على سيرفر [[node:http]] محلي، و Node 24.22 للـ [[worker_threads]].

---

## ١. التلات ملفات

~~~html index.html
<!doctype html><meta charset="utf-8"><title>worker lab</title><p>افتح الـ Console</p><script type="module" src="main.js"></script>
~~~

~~~js worker.js
// worker.js: بيقلب كل byte (تقيل) ويرجّع نفس الـ buffer بالنقل
self.onmessage = ({ data: { id, bytes } }) => {
  if (!(bytes instanceof Uint8Array)) throw new TypeError('مستني Uint8Array في الطلب ' + id);
  const t = performance.now();
  for (let round = 0; round < 21; round++) for (let i = 0; i < bytes.length; i++) bytes[i] = 255 - bytes[i];
  self.postMessage({ id, first: bytes[0], ms: Math.round(performance.now() - t), bytes }, [bytes.buffer]);
};
~~~

و [[main.js]] هو المثال فوق. الناتج في Console:

~~~text الناتج (Chrome 157)
بعد الإرسال: 0 true
الصفحة لسه بترد
الصفحة لسه بترد
الصفحة لسه بترد
رد: 1 245 8000000 121ms
error في الـ worker: Uncaught TypeError: مستني Uint8Array في الطلب 2
الصفحة لسه بترد
الصفحة لسه بترد
الصفحة لسه بترد
الصفحة لسه بترد
الصفحة لسه بترد
الصفحة لسه بترد
الصفحة لسه بترد
اتقفل
~~~

---

## ٢. [[new Worker(url, options)]]

| الـ option | معناه |
|---|---|
| [[type: 'module']] | الملف module: [[import]] و [[export]] شغالين، و [[importScripts]] ممنوعة |
| من غير [[type]] (classic) | سكربت عادي، وبيحمّل ملفات تانية بـ [[importScripts('a.js')]] |
| [[name: 'invert']] | اسم بيظهر في DevTools (Sources ثم Threads) وفي [[self.name]] |

والملف لازم من نفس الـ origin وعلى [[http]] أو [[https]]: صفحة مفتوحة كـ [[file://]] مبتحمّلش workers في Chrome. وفي مشروع Vite: [[new Worker(new URL('./worker.js', import.meta.url), { type: 'module' })]] عشان الـ bundler يلاقي الملف.

---

## ٣. [[postMessage]] والـ structured clone والـ transfer

~~~js
worker.postMessage({ id: 1, bytes }, [bytes.buffer]);
console.log('بعد الإرسال:', bytes.byteLength, bytes.buffer.detached);
~~~

- أول argument الرسالة: أي حاجة الـ structured clone يقدر ينسخها.
- التاني **قايمة transfer**: الـ buffers اللي هتتنقل بدل ما تتنسخ. [[bytes.buffer]] اتنقل، فعندك [[byteLength]] صفر و [[detached]] [[true]] (درس «ArrayBuffer: resize و transfer و detached»).
- الـ worker عمل نفس الحاجة وهو بيرد ([[ [bytes.buffer] ]])، فالـ bytes رجعتلك من غير نسخ ولا مرة.

| بيتنسخ صح | مش بيتنسخ |
|---|---|
| أرقام ونصوص و [[BigInt]] و objects و arrays (حتى لو فيها دوائر) | الدوال: بترمي [[DataCloneError]] وقت الإرسال |
| [[Map]] و [[Set]] و [[Date]] و [[RegExp]] و الـ errors | الـ Symbols: بترمي [[DataCloneError]] برضه |
| الـ typed arrays و [[ArrayBuffer]] و [[DataView]] و [[Blob]] و [[File]] | عناصر الـ DOM |
| [[ImageData]] و [[ImageBitmap]] | الـ prototype: class instance بيوصل object عادي |

اللي بيتنقل (transferable): [[ArrayBuffer]] و [[MessagePort]] و [[ImageBitmap]] و [[OffscreenCanvas]] و [[ReadableStream]] وغيرهم.

---

## ٤. [[onmessage]] و [[onerror]] و [[terminate]]

- [[worker.onmessage = (e) => ...]]: [[e.data]] الرسالة. (وبديله [[worker.addEventListener('message', ...)]].)
- الطلب التاني بعت نص بدل bytes، فالـ worker رمى [[TypeError]] ومحدش مسكه، فوصل [[worker.onerror]] كـ [[ErrorEvent]]: [[e.message]] = [[Uncaught TypeError: ...]]، وفيه [[filename]] و [[lineno]]. و [[e.preventDefault()]] بيمنع Chrome يطبعه كـ error أحمر. **والـ worker مماتش:** الـ error جوه handler رسالة واحدة، والـ worker لسه بيستقبل.
- [[worker.terminate()]]: بيقتل الـ thread فورًا. أي [[postMessage]] بعدها بتتجاهَل من غير error. وجوه الـ worker نفسه: [[self.close()]].
- لو ملف الـ worker مش موجود (404): [[onerror]] بيجيلك [[Event]] عادي من غير [[message]].

---

## ٥. نفس الكلام في Node: [[worker_threads]]

~~~js hash-worker.mjs
// hash-worker.mjs: شغل تقيل بيتعمل في thread تاني
import { parentPort } from 'node:worker_threads';
parentPort.on('message', ({ id, bytes }) => {
  if (bytes.length === 0) throw new Error('مفيش bytes في الطلب ' + id);
  let sum = 0;
  for (let round = 0; round < 200; round++) for (const b of bytes) sum = (sum * 31 + b) >>> 0;
  parentPort.postMessage({ id, sum, size: bytes.byteLength });
});
~~~

~~~js main.mjs
// main.mjs: نبعت bytes للـ worker بالنقل (transfer) مش بالنسخ
import { Worker } from 'node:worker_threads';
const worker = new Worker(new URL('./hash-worker.mjs', import.meta.url));
worker.on('message', (msg) => console.log('رد:', msg));
worker.on('error', (err) => { console.log('error من الـ worker:', err.message); worker.terminate(); });
worker.on('exit', (code) => console.log('الـ worker خلص، exit code', code));
const bytes = new Uint8Array(1_000_000).fill(7);
worker.postMessage({ id: 1, bytes }, [bytes.buffer]);
console.log('بعد الإرسال:', bytes.byteLength, bytes.buffer.detached);
const ticks = setInterval(() => console.log('الـ main thread لسه فاضي'), 50);
setTimeout(() => { clearInterval(ticks); worker.postMessage({ id: 2, bytes: new Uint8Array(0) }); }, 120);
~~~

~~~text الناتج (Node 24.22)
بعد الإرسال: 0 true
الـ main thread لسه فاضي
الـ main thread لسه فاضي
رد: { id: 1, sum: 805363712, size: 1000000 }
error من الـ worker: مفيش bytes في الطلب 2
الـ worker خلص، exit code 1
~~~

| المتصفح | Node ([[node:worker_threads]]) |
|---|---|
| [[new Worker('w.js', { type: 'module' })]] | [[new Worker(new URL('./w.mjs', import.meta.url), { workerData })]]: المسار من الملف نفسه |
| جوه: [[self.onmessage]] و [[self.postMessage]] | جوه: [[parentPort.on('message')]] و [[parentPort.postMessage]] من [[node:worker_threads]] |
| [[worker.onmessage]] و [[e.data]] | [[worker.on('message', (msg) => ...)]]: الرسالة على طول |
| [[worker.onerror]] والـ worker بيكمّل | [[worker.on('error')]] والـ worker **بيموت** (exit code 1) |
| [[worker.terminate()]] | [[await worker.terminate()]]: بترجّع Promise بالـ exit code |
| داتا أولية: رسالة أولى | [[workerData]] من غير رسالة |
| مفيش ذاكرة مشتركة إلا [[SharedArrayBuffer]] بـ headers | [[SharedArrayBuffer]] متاح على طول |

الفرق المهم: في Node الـ error المش ممسوك **بيقفل** الـ worker (exit code 1)، وفي المتصفح بيبلّغ ويكمّل. فـ Node لازم [[try/catch]] جوه الـ handler لو عايزه يعيش.

---

## الخلاصة

- Worker = thread تاني من غير DOM، والكلام [[postMessage]] و [[onmessage]].
- الرسالة بتتنسخ (structured clone): الدوال بترمي والـ classes بتبقى objects عادية.
- [[postMessage(data, [buffer])]] بينقل من غير نسخ، والـ buffer عندك بيبقى detached.
- [[onerror]] دايمًا، و [[terminate()]] لما تخلص، و module workers للكود الجديد.
- Node: [[worker_threads]] بنفس الفكرة، والـ error بيقفل الـ worker.`,
          lines: [
            R`بنعمل worker من [[worker.js]] كـ module، واسمه [[invert]] عشان يبان في DevTools.`,
            R`كل رد من الـ worker بيوصل هنا: الـ id وأول byte وعدد الـ bytes والوقت اللي خده هناك.`,
            R`أي error مش ممسوك جوه الـ worker بيوصل هنا، و [[preventDefault]] بيمنع Chrome يطبعه كـ uncaught.`,
            R`٨ مليون byte قيمتهم ١٠: الداتا اللي هنبعتها.`,
            R`بنبعت الرسالة وبنقول إن [[bytes.buffer]] يتنقل مش يتنسخ (التاني argument).`,
            R`بعد الإرسال الـ buffer عندنا اتفصل: [[byteLength]] صفر و [[detached]] [[true]].`,
            R`timer كل ٤٠ ms بيطبع سطر، عشان نثبت إن الصفحة فاضية وهي مستنية الـ worker.`,
            R`بعد ٦٠ ms بنبعت طلب غلط (نص بدل bytes) عشان نشوف الـ error بيوصل إزاي.`,
            R`بعد ٤٠٠ ms بنوقف الـ timer ونقفل الـ worker بـ [[terminate]].`,
          ],
          ref: [
            { t: "MDN: Using Web Workers", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers" },
            { t: "MDN: Worker", url: "https://developer.mozilla.org/en-US/docs/Web/API/Worker" },
            { t: "MDN: Worker.postMessage()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage" },
            { t: "MDN: Transferable objects", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects" },
            { t: "MDN: The structured clone algorithm", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm" },
            { t: "Node.js: Worker threads", url: "https://nodejs.org/api/worker_threads.html" },
          ],
          pre: [{ to: "js/blocking و الـ main thread", why: R`ليه الحساب التقيل بيجمّد الصفحة أصلًا` }, { to: "js/deepClone و structuredClone", why: R`الـ structured clone اللي [[postMessage]] بيستخدمه` }, { to: "js/ArrayBuffer: resize و transfer و detached", why: R`إيه اللي بيحصل للـ buffer بعد ما يتنقل` }, { to: "js/import و export", why: R`الـ module workers` }],
        },
        {
          cmd: "SharedArrayBuffer: growable و crossOriginIsolated",
          title: "إزاي اتنين threads يشوفوا نفس الذاكرة بالظبط، وليه المتصفح مخبّي SharedArrayBuffer لحد ما تبعت headers معينة؟",
          desc: R`[[postMessage]] بينسخ أو بينقل: في الحالتين الذاكرة في إيد واحد بس. [[SharedArrayBuffer]] buffer **مشترك**: لما تبعته لـ worker، الاتنين بيبصوا على نفس الـ bytes، واللي واحد يكتبه التاني يشوفه من غير رسايل.

• [[new SharedArrayBuffer(n, { maxByteLength })]]، و [[sab.byteLength]] و [[sab.slice()]] (نسخة **مش** مشتركة)، و [[sab.growable]] و [[sab.maxByteLength]] و [[sab.grow(n)]] (بيكبر بس، مبيصغرش).
• الـ typed arrays و [[DataView]] شغالين عليه زي الـ [[ArrayBuffer]] بالظبط.
• **في المتصفح** مش موجود أصلًا ([[ReferenceError: SharedArrayBuffer is not defined]]) إلا لو الصفحة **cross-origin isolated**: السيرفر بيبعت [[Cross-Origin-Opener-Policy: same-origin]] و [[Cross-Origin-Embedder-Policy: require-corp]] (أو [[credentialless]])، و [[self.crossOriginIsolated]] بيبقى [[true]]. في Node موجود على طول.

والكتابة من اتنين في نفس الوقت محتاجة [[Atomics]] (الدرس الجاي)، وإلا الأرقام بتضيع.`,
          example: R`// shared.mjs: ذاكرة واحدة بيشوفها الـ main thread والـ worker في نفس الوقت
import { Worker } from 'node:worker_threads';
const sab = new SharedArrayBuffer(8, { maxByteLength: 64 });
const shared = new Int32Array(sab);
console.log(sab.byteLength, sab.growable, sab.maxByteLength, shared.length);
const code = "const { workerData } = require('node:worker_threads'); const a = new Int32Array(workerData); a[0] = 42; Atomics.store(a, 1, 7);";
const worker = new Worker(code, { eval: true, workerData: sab });
worker.on('exit', () => {
  console.log('الـ worker كتب:', shared[0], Atomics.load(shared, 1));
  sab.grow(16);
  const copy = sab.slice(0, 4);
  console.log(sab.byteLength, shared.length, copy instanceof SharedArrayBuffer, new Int32Array(copy));
  try { sab.grow(4); } catch (e) { console.log(e.name + ': ' + e.message); }
});`,
          try: R`اعمل الفولدر اللي في قسم ٤ في الشرح ([[server.mjs]] و [[index.html]])، وشغّل [[node server.mjs]]، وافتح [[http://127.0.0.1:8080/]] ثم [[http://127.0.0.1:8080/iso/]]. إيه الفرق في السطر اللي بيتطبع؟ وبعدين افتح DevTools ثم Network واتأكد من الـ headers في الحالتين.`,
          sol: R`~~~text http://127.0.0.1:8080/ (Chrome 157)
crossOriginIsolated: false | typeof SharedArrayBuffer: undefined
ReferenceError: SharedArrayBuffer is not defined
~~~

~~~text http://127.0.0.1:8080/iso/ (Chrome 157)
crossOriginIsolated: true | typeof SharedArrayBuffer: function
الـ worker شاف 15 والصفحة شايفة 15 (نفس الذاكرة)
~~~

- نفس الـ HTML بالحرف. الفرق الوحيد الـ headers: [[/iso/]] رجع [[cross-origin-opener-policy: same-origin]] و [[cross-origin-embedder-policy: require-corp]] (شوفهم في Network ثم الطلب ثم Headers، أو [[curl -I http://127.0.0.1:8080/iso/]]).
- من غيرهم Chrome **بيشيل** [[SharedArrayBuffer]] من الـ global خالص، فأول سطر بيستخدمه بيرمي [[ReferenceError]].
- مع الـ headers: الصفحة كتبت ١٠، والـ worker زوّد ٥ بـ [[Atomics.add]]، والصفحة قرت ١٥ من نفس الذاكرة من غير ما الـ worker يبعت الرقم تاني (هو بعته في الرسالة بس عشان نطبعه جنب بعض).`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع (Node):** إيه اللي هيتطبع؟

~~~js
const s = new SharedArrayBuffer(4);
const c = structuredClone(s);
new Uint8Array(c)[0] = 9;
console.log(c === s, new Uint8Array(s)[0], s instanceof ArrayBuffer);
const part = s.slice(0, 2);
new Uint8Array(part)[1] = 5;
console.log(part instanceof SharedArrayBuffer, new Uint8Array(s)[1]);
try { structuredClone(s, { transfer: [s] }); } catch (e) { console.log(e.name + ': ' + e.message); }
~~~`, done: R`كتبت السطور التلاتة، وتقدر تقول ليه النسخة بالـ clone مشتركة والنسخة بالـ [[slice]] لأ.`, sol: R`~~~text الناتج (Node 24.22)
false 9 false
true 0
DataCloneError: Found invalid value in transferList.
~~~

- [[structuredClone(sab)]] (ونفسه [[postMessage(sab)]]) بيعمل **object جديد** ([[c === s]] بـ [[false]]) بس على **نفس الذاكرة**: كتبنا في [[c]] والأصل شاف ٩. ده بالظبط اللي بيحصل لما تبعته لـ worker.
- [[SharedArrayBuffer]] مش نوع من [[ArrayBuffer]] ([[instanceof]] بـ [[false]])، فكود بيفحص [[instanceof ArrayBuffer]] هيرفضه. لكن [[ArrayBuffer.isView(new Uint8Array(sab))]] بـ [[true]].
- [[slice]] بيرجّع [[SharedArrayBuffer]] جديد بـ **نسخة** من الـ bytes، مش مشترك مع الأصل.
- مينفعش تحطه في قايمة transfer: هو مشترك أصلًا، مفيش «صاحب» ينقله. ومعندوش [[transfer]] ولا [[resize]] ولا [[detached]].` },
            { lvl: 'تطبيق', t: R`**صلّح:** بعد ما فعّلت COOP و COEP عشان [[SharedArrayBuffer]]، صورة المنتج اللي جاية من سيرفر الصور (origin تاني) اختفت، وفي الـ Console: [[net::ERR_BLOCKED_BY_RESPONSE.NotSameOriginAfterDefaultedToSameOriginByCoep]]. إيه السبب، وإيه الـ ٣ حلول؟ جرّب حل منهم.`, done: R`الصورة رجعت والصفحة لسه [[crossOriginIsolated: true]]، وتقدر تقول إمتى تختار كل حل.`, sol: R`~~~js server2.mjs
// server2.mjs: COEP بـ credentialless بدل require-corp
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
createServer(async (req, res) => {
  res.writeHead(200, {
    'content-type': 'text/html; charset=utf-8',
    'cross-origin-opener-policy': 'same-origin',
    'cross-origin-embedder-policy': 'credentialless',
  });
  res.end(await readFile(new URL('./index.html', import.meta.url)));
}).listen(8081, '127.0.0.1', () => console.log('http://127.0.0.1:8081/'));
~~~

~~~text الناتج (Chrome 157، صورة من http://127.0.0.1:8765 = origin تاني)
require-corp:   الصورة error، و crossOriginIsolated true
credentialless: الصورة loaded (3 px)، و crossOriginIsolated true
~~~

**السبب:** [[require-corp]] معناها «الصفحة دي مش هتحمّل أي حاجة من origin تاني إلا لو هو وافق صراحةً». السيرفر التاني مبعتش موافقة، فـ Chrome منع الصورة. ده جزء من الحماية مش باج.

| الحل | بيتعمل فين | إمتى |
|---|---|---|
| سيرفر الصور يبعت [[Cross-Origin-Resource-Policy: cross-origin]] | على السيرفر التاني | لو السيرفر بتاعك أو بتقدر تغيّر headers بتاعته (CDN بتاعك) |
| [[<img crossorigin src="...">]] والسيرفر التاني بيدعم CORS | الاتنين | لو محتاج تقرا الصورة كمان (canvas و [[getImageData]]) |
| [[Cross-Origin-Embedder-Policy: credentialless]] | على صفحتك بس | لو الموارد من برّه مش في إيدك: بيحمّلها **من غير cookies**، فمفيش داتا خاصة ممكن تتسرب |

- اتجرّب: نفس الصفحة بـ [[credentialless]] حمّلت الصورة و [[crossOriginIsolated]] فضل [[true]] و [[SharedArrayBuffer]] اشتغل. ([[credentialless]] مش مدعوم في كل المتصفحات: بص على جدول التوافق في MDN قبل ما تعتمد عليه، والحلين الأولانيين شغالين في كل حتة.)
- والـ iframes و الـ popups من origins تانية بتتأثر برضه ([[COOP: same-origin]] بيقطع العلاقة مع النوافذ اللي فتحتها، فـ login بـ popup زي Google ممكن يبوظ). عشان كده فعّلها في الصفحات اللي محتاجاها بس.` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** إزاي تفعّل الـ headers دي في (أ) Vite dev server، (ب) Nginx، (ج) GitHub Pages؟ دوّر في الوثائق الرسمية لكل واحد.`, done: R`عندك الإعداد لـ Vite و Nginx، وعرفت إن GitHub Pages مبيسمحش بـ headers custom وإيه الحل.`, sol: R`~~~js vite.config.js
// من وثائق Vite: server.headers
export default {
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  preview: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
};
~~~

~~~nginx nginx.conf
# من وثائق Nginx: add_header جوه الـ location
location / {
    add_header Cross-Origin-Opener-Policy "same-origin" always;
    add_header Cross-Origin-Embedder-Policy "require-corp" always;
}
~~~

- **Vite:** [[server.headers]] للـ [[npm run dev]] و [[preview.headers]] للـ [[npm run preview]]. وده بيأثر على الـ dev بس؛ الـ production هيبقى السيرفر اللي بتنشر عليه.
- **Nginx:** [[add_header]]، و [[always]] عشان يتبعت حتى مع ردود الأخطاء. خلي بالك: [[add_header]] جوه [[location]] بيلغي اللي في [[server]] (درس Nginx في تاب Nginx).
- **GitHub Pages:** مبيسمحش بـ headers custom خالص (من وثائقه). الحل اللي الناس بتستخدمه: service worker بيزوّد الـ headers على الردود (زي مكتبة [[coi-serviceworker]])، أو تنشر على حاجة بتسمح (Netlify و Cloudflare Pages بملف [[_headers]]).
- الإعدادات دي من الوثائق، مش متجرّبة هنا على Nginx ولا GitHub Pages. اللي اتجرّب السيرفر بـ [[node:http]] في الشرح.` },
            { lvl: 'تحدي', t: R`**اشرحها:** ليه المتصفحات شالت [[SharedArrayBuffer]] سنة ٢٠١٨ وبعدين رجّعته بشرط الـ headers؟ اكتب ٣ سطور لزميل، فيهم كلمة «timer».`, done: R`كتبت ٣ سطور فيهم Spectre، وإن الذاكرة المشتركة بتعمل timer دقيق جدًا، وإن الـ isolation بيضمن إن مفيش داتا من origin تاني في نفس الـ process.`, sol: R`**إجابة نموذجية:**
1. في يناير ٢٠١٨ اتكشفت ثغرة **Spectre** في الـ CPUs: كود JavaScript يقدر يقرا ذاكرة مش بتاعته في نفس الـ process (زي داتا موقع تاني مفتوح في iframe) بقياس **الوقت** اللي الـ CPU بياخده يوصل للذاكرة، والهجوم ده محتاج **timer دقيق جدًا**.
2. [[SharedArrayBuffer]] بيعمل timer زي ده بسهولة: worker بيزوّد عداد في loop، والصفحة بتقرا العداد كساعة بدقة نانو ثواني. فكل المتصفحات قفلته فورًا (وقلّلت دقة [[performance.now()]] كمان).
3. رجع بشرط **cross-origin isolation**: [[COOP: same-origin]] بيفصل الصفحة عن أي نافذة من origin تاني، و [[COEP]] بيمنع تحميل أي مورد من برّه من غير موافقته (أو من غير cookies في [[credentialless]]). فالـ process مفيهوش غير داتا صفحتك والموارد اللي وافقت، ومفيش حاجة سرية تتسرق حتى لو الـ timer دقيق. و [[self.crossOriginIsolated]] هو اللي بيقولك الشرط اتحقق.

المرجع: MDN صفحة [[SharedArrayBuffer]] قسم «Security requirements»، و [[Window.crossOriginIsolated]].` },
          ],
          flag: "script",
          deep: {
            why: R`الـ workers بالرسايل آمنة بس فيها تكلفة: كل رسالة نسخ أو نقل، وكل تحديث محتاج رسالة. فيه شغل محتاج اتنين يشتغلوا على **نفس** الداتا في نفس الوقت من غير رسايل: wasm بـ threads (برامج C++ و Rust زي ffmpeg و Photoshop على الويب)، و ring buffer لصوت live بين الـ audio thread والصفحة، و counters مشتركة لتقدم شغل متقسم على ٨ workers. ده [[SharedArrayBuffer]]. وتمنه: race conditions (حاجتين بيكتبوا في نفس اللحظة)، وده اللي [[Atomics]] بيحله.`,
            how: R`[[new SharedArrayBuffer(n, { maxByteLength })]] بيحجز ذاكرة تقدر تتشاف من أكتر من thread (الـ spec بيسميهم «agents»). [[postMessage(sab)]] أو [[workerData: sab]] أو [[structuredClone(sab)]] بيعملوا object جديد في الطرف التاني بيشاور على نفس الذاكرة، والذاكرة بتفضل عايشة طول ما فيه object واحد عليها. [[sab.slice(a, b)]] بيعمل [[SharedArrayBuffer]] جديد بنسخة (عن طريق [[SharedArrayBuffer[Symbol.species] ]] زي الـ [[ArrayBuffer]]). [[grow(n)]] بيكبّر بس (عشان thread تاني ممكن يكون بيقرا آخر الذاكرة دلوقتي، فالتصغير خطر)، وأي طول أصغر أو أكبر من [[maxByteLength]]: [[RangeError: SharedArrayBuffer.prototype.grow: Invalid length parameter]]، و [[grow]] على واحد مش growable: [[TypeError: Method SharedArrayBuffer.prototype.grow called on incompatible receiver]]. والـ views اللي من غير طول بتكبر معاه في كل الـ threads. والكتابة العادية ([[ a[0] = 1 ]]) مش مضمون إمتى الـ thread التاني يشوفها ولا بأنهي ترتيب؛ [[Atomics]] هو اللي بيضمن ده.

في المتصفح: الـ constructor مش موجود في الـ global إلا لو [[self.crossOriginIsolated]] بـ [[true]]، وده بيحصل لما الـ document يتبعت بـ [[Cross-Origin-Opener-Policy: same-origin]] و [[Cross-Origin-Embedder-Policy: require-corp]] أو [[credentialless]] (والـ workers بتورثه من الصفحة). حتى لو جبت [[SharedArrayBuffer]] من طريق تاني (ذاكرة wasm مشتركة)، [[postMessage]] بيرفضه: [[DataCloneError: Failed to execute 'postMessage' on 'Worker': SharedArrayBuffer transfer requires self.crossOriginIsolated.]] (اتجرّب في Chrome 157).`,
            when: R`استخدمه لما الـ threads لازم يشتغلوا على نفس الداتا باستمرار: wasm threads (Emscripten بـ [[-pthread]])، و ring buffers للصوت والفيديو، و counters وأعلام «اتلغى» بين workers، وجداول كبيرة بيقراها كذا worker في نفس الوقت (read-only بعد ما تتملى). **متستخدموش** لو رسالة كل شوية كفاية: [[postMessage]] بالـ transfer أبسط ومفيهوش race conditions. وفي المتصفح فكّر في تكلفة الـ isolation: كل مورد من برّه محتاج CORP أو CORS، والـ popups (login بـ OAuth) والـ iframes من برّه ممكن يبوظوا.`,
            mistakes: R`- تستخدمه في صفحة من غير COOP و COEP: [[ReferenceError: SharedArrayBuffer is not defined]]. افحص [[self.crossOriginIsolated]] قبلها واعمل fallback.
- تفعّل [[require-corp]] والصور والسكربتات من CDN تختفي: [[net::ERR_BLOCKED_BY_RESPONSE.NotSameOriginAfterDefaultedToSameOriginByCoep]]. CORP على المورد، أو [[crossorigin]]، أو [[credentialless]].
- تحطه في قايمة الـ transfer: [[DataCloneError: Found invalid value in transferList.]]
- تفتكر [[slice]] بيرجّع حتة مشتركة: نسخة. للمشاركة: view بـ offset على نفس الـ [[SharedArrayBuffer]].
- [[sab instanceof ArrayBuffer]] في كود بيقبل buffers: [[false]]. افحص الاتنين.
- تكتب وتقرا من اتنين بـ [[ a[0]++ ]] العادي: أرقام بتضيع (الدرس الجاي فيه الرقم الحقيقي: ٤ مليون بقوا مليون).
- [[grow]] بطول أصغر: بيرمي، مفيش تصغير.`,
          },
          teach: R`## الفكرة في سطر

[[SharedArrayBuffer]] ذاكرة واحدة بيشوفها كذا thread، وفي المتصفح لازم الصفحة تبقى cross-origin isolated بالـ headers. الناتج من Node 24.22، والمتصفح Chrome 157 على سيرفر [[node:http]] محلي.

---

## ١. [[SharedArrayBuffer]] بين الـ main thread و worker

~~~js
const sab = new SharedArrayBuffer(8, { maxByteLength: 64 });
const shared = new Int32Array(sab);
console.log(sab.byteLength, sab.growable, sab.maxByteLength, shared.length);
const code = "const { workerData } = require('node:worker_threads'); const a = new Int32Array(workerData); a[0] = 42; Atomics.store(a, 1, 7);";
const worker = new Worker(code, { eval: true, workerData: sab });
~~~

~~~text الناتج
8 true 64 2
~~~

- [[{ eval: true }]] في Node: أول argument كود مش اسم ملف (للأمثلة الصغيرة بس). والكود ده CommonJS، عشان كده [[require]].
- [[workerData: sab]]: الـ worker بياخد [[SharedArrayBuffer]] على **نفس** الذاكرة. ومع [[ArrayBuffer]] عادي كان هياخد نسخة.
- الـ worker كتب ٤٢ في أول خانة بالطريقة العادية، و ٧ في التانية بـ [[Atomics.store]].

~~~text الناتج بعد ما الـ worker يخلص
الـ worker كتب: 42 7
~~~

الـ main thread قرا اللي الـ worker كتبه **من غير ولا رسالة**.

---

## ٢. [[SharedArrayBuffer.prototype.byteLength]] و [[SharedArrayBuffer.prototype.growable]] و [[SharedArrayBuffer.prototype.maxByteLength]] و [[SharedArrayBuffer.prototype.grow]]

~~~js
sab.grow(16);
console.log(sab.byteLength, shared.length);
try { sab.grow(4); } catch (e) { console.log(e.name + ': ' + e.message); }
~~~

~~~text الناتج
16 4
RangeError: SharedArrayBuffer.prototype.grow: Invalid length parameter
~~~

| الـ member | بيعمل إيه |
|---|---|
| [[new SharedArrayBuffer(n, { maxByteLength })]] | يحجز [[n]] byte مشتركين، والـ option بيخليه growable لحد [[maxByteLength]] |
| [[byteLength]] | الحجم دلوقتي (ممكن يكبر من thread تاني وانت مش واخد بالك) |
| [[growable]] | [[true]] لو اتعمل بـ [[maxByteLength]] |
| [[maxByteLength]] | الحد الأقصى، وبيساوي [[byteLength]] لو مش growable |
| [[grow(n)]] | يكبّر بس: أصغر أو أكبر من الحد [[RangeError]]، وعلى واحد مش growable [[TypeError]] |
| [[slice(a, b)]] | [[SharedArrayBuffer]] **جديد بنسخة** من الـ bytes، مش مشترك مع الأصل |
| [[ SharedArrayBuffer[Symbol.species] ]] | الـ class اللي [[slice]] بيعمل منها، زي [[ArrayBuffer]] بالظبط |

ليه [[grow]] مش [[resize]]؟ لأن thread تاني ممكن يكون بيقرا آخر الذاكرة في نفس اللحظة، فالتصغير ممكن يشيل الأرض من تحته. والـ view [[shared]] من غير طول كبر لـ ٤ عناصر لوحده.

---

## ٣. [[SharedArrayBuffer.prototype.slice]] ومقارنة بالـ [[ArrayBuffer]]

~~~js
const copy = sab.slice(0, 4);
console.log(copy instanceof SharedArrayBuffer, new Int32Array(copy));
~~~

~~~text الناتج
true Int32Array(1) [ 42 ]
~~~

| | [[ArrayBuffer]] | [[SharedArrayBuffer]] |
|---|---|---|
| [[postMessage]] من غير transfer | نسخة | نفس الذاكرة |
| في قايمة transfer | بيتنقل والأصل detached | [[DataCloneError: Found invalid value in transferList.]] |
| تغيير الحجم | [[resize]] كبير وصغير | [[grow]] كبير بس |
| [[transfer]] و [[detached]] | موجودين | مش موجودين |
| [[instanceof ArrayBuffer]] | [[true]] | [[false]] |
| في المتصفح | دايمًا | بس لو [[crossOriginIsolated]] |

---

## ٤. في المتصفح: COOP و COEP و [[crossOriginIsolated]]

~~~js server.mjs
// server.mjs: نفس الصفحة مرتين: / من غير headers، و /iso/ بـ COOP و COEP
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
createServer(async (req, res) => {
  const headers = { 'content-type': 'text/html; charset=utf-8' };
  if (req.url.startsWith('/iso/')) {
    headers['cross-origin-opener-policy'] = 'same-origin';
    headers['cross-origin-embedder-policy'] = 'require-corp';
  }
  res.writeHead(200, headers);
  res.end(await readFile(new URL('./index.html', import.meta.url)));
}).listen(8080, '127.0.0.1', () => console.log('http://127.0.0.1:8080/  و  http://127.0.0.1:8080/iso/'));
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>SharedArrayBuffer</title></head>
<body>
<pre id="out"></pre>
<script>
const out = document.querySelector('#out');
const log = (...parts) => { out.textContent += parts.join(' ') + '\n'; };
log('crossOriginIsolated:', self.crossOriginIsolated, '| typeof SharedArrayBuffer:', typeof SharedArrayBuffer);
try {
  const sab = new SharedArrayBuffer(4);
  const worker = new Worker(URL.createObjectURL(new Blob(['onmessage = (e) => { const a = new Int32Array(e.data); Atomics.add(a, 0, 5); postMessage(a[0]); };'], { type: 'text/javascript' })));
  const counter = new Int32Array(sab);
  counter[0] = 10;
  worker.onmessage = (e) => log('الـ worker شاف', e.data, 'والصفحة شايفة', counter[0], '(نفس الذاكرة)');
  worker.postMessage(sab);
} catch (e) {
  log(e.name + ':', e.message);
}
</script>
</body>
</html>
~~~

| الـ header | معناه |
|---|---|
| [[Cross-Origin-Opener-Policy: same-origin]] | الصفحة متشاركش «browsing context group» مع نوافذ من origins تانية: [[window.opener]] بيبقى [[null]] للي فتحتها من برّه والعكس |
| [[Cross-Origin-Embedder-Policy: require-corp]] | أي مورد من origin تاني (صورة، سكربت، iframe) لازم يوافق بـ [[Cross-Origin-Resource-Policy]] أو CORS، وإلا بيتمنع |
| [[Cross-Origin-Embedder-Policy: credentialless]] | بديل أسهل: الموارد من برّه بتتحمّل من غير cookies، فمش محتاجة توافق (دعمه أقل، شوف MDN) |
| [[self.crossOriginIsolated]] | [[true]] لما الاتنين اتحققوا: ساعتها [[SharedArrayBuffer]] و [[performance.now()]] الدقيق متاحين |

والـ Worker اتعمل من [[Blob]] عشان المثال يبقى ملف واحد؛ الـ workers بتورث الـ isolation من الصفحة.

---

## ٥. ليه كل ده؟ (Spectre)

في ٢٠١٨ ثغرة Spectre خلت كود JavaScript يقدر يقرا ذاكرة مش بتاعته في نفس الـ process بقياس الوقت، و [[SharedArrayBuffer]] بيعمل timer دقيق جدًا (worker بيعد، والصفحة بتقرا العداد). فالمتصفحات قفلته، ورجّعته بس للصفحات المعزولة اللي مفيش في الـ process بتاعها داتا من origin تاني مستعدة تتسرق. التفاصيل في تمرين «اشرحها».

---

## الخلاصة

- [[SharedArrayBuffer]] = نفس الـ bytes في كل الـ threads، و [[postMessage]] بيشاركه مش بينسخه.
- [[grow]] بيكبّر بس، و [[slice]] نسخة مش مشتركة، ومينفعش transfer.
- في المتصفح: COOP [[same-origin]] و COEP [[require-corp]] (أو [[credentialless]])، وافحص [[self.crossOriginIsolated]].
- الكتابة من كذا thread في نفس المكان: [[Atomics]] (الدرس الجاي).`,
          lines: [
            R`بنستورد class الـ [[Worker]] من [[node:worker_threads]] عشان نشغّل thread تاني.`,
            R`[[SharedArrayBuffer]] بـ ٨ bytes ويقدر يكبر لحد ٦٤.`,
            R`[[Int32Array]] عليه: عنصرين كل واحد ٤ bytes.`,
            R`بيطبع ٨ و [[true]] (growable) و ٦٤ و ٢ عناصر.`,
            R`كود الـ worker كنص: بياخد الـ [[SharedArrayBuffer]] من [[workerData]] ويكتب ٤٢ في الأول و ٧ بـ [[Atomics.store]] في التاني.`,
            R`بنشغّل الكود كـ worker بـ [[eval: true]]، وبنديله الـ [[SharedArrayBuffer]]: هيشوف نفس الذاكرة مش نسخة.`,
            R`لما الـ worker يخلص (يوصل [[exit]])، نبص على الذاكرة من عندنا.`,
            R`بنقرا ٤٢ و ٧ اللي الـ worker كتبهم من غير ما يبعت أي رسالة.`,
            R`بنكبّر الـ buffer لـ ١٦ byte بـ [[grow]].`,
            R`[[slice(0, 4)]] بيرجّع [[SharedArrayBuffer]] جديد فيه نسخة من أول ٤ bytes.`,
            R`بيطبع ١٦، والـ view كبر لـ ٤ عناصر لوحده، والنسخة [[SharedArrayBuffer]] فيها ٤٢.`,
            R`[[grow(4)]] أصغر من الحجم الحالي: التصغير ممنوع فبيرمي [[RangeError]].`,
            R`نهاية الـ handler بتاع [[exit]].`,
          ],
          ref: [
            { t: "MDN: SharedArrayBuffer", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer" },
            { t: "MDN: SharedArrayBuffer.prototype.grow()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer/grow" },
            { t: "MDN: SharedArrayBuffer.prototype.slice()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer/slice" },
            { t: "MDN: Window.crossOriginIsolated", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/crossOriginIsolated" },
            { t: "MDN: Cross-Origin-Embedder-Policy", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Embedder-Policy" },
            { t: "MDN: Cross-Origin-Opener-Policy", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Opener-Policy" },
            { t: "Vite: server.headers", url: "https://vite.dev/config/server-options#server-headers" },
          ],
          pre: [{ to: "js/Web Workers و worker_threads: postMessage و transfer", why: R`الـ workers والرسايل قبل الذاكرة المشتركة` }, { to: "js/ArrayBuffer: resize و transfer و detached", why: R`[[grow]] هنا مقابل [[resize]] و [[transfer]] هناك` }],
        },
        {
          cmd: "Atomics: add و compareExchange و wait و notify",
          title: "ليه ٤ threads بيزوّدوا نفس العداد ٤ مليون مرة والنتيجة مليون بس، وإزاي Atomics بيصلّحها؟",
          desc: R`لما اتنين threads يكتبوا في نفس المكان في [[SharedArrayBuffer]] بالطريقة العادية ([[ a[0]++ ]])، العملية بتتقسم «اقرا ثم زوّد ثم اكتب»، والاتنين ممكن يقروا نفس القيمة ويكتبوا فوق بعض: **race condition**. [[Atomics]] object فيه functions بتعمل العملية **مرة واحدة من غير ما حد يدخل في النص** (atomic):

• حساب: [[Atomics.add]] و [[Atomics.sub]] و [[Atomics.and]] و [[Atomics.or]] و [[Atomics.xor]]، وكلهم بيرجّعوا القيمة **القديمة**.
• قراية وكتابة: [[Atomics.load]] و [[Atomics.store]] و [[Atomics.exchange]] و [[Atomics.compareExchange]] (اكتب بس لو القيمة لسه زي ما شفتها: أساس أي lock).
• انتظار: [[Atomics.wait]] (نام لحد ما القيمة تتغير)، و [[Atomics.waitAsync]] (نفسها بـ Promise)، و [[Atomics.notify]] (صحّي اللي نايم)، و [[Atomics.pause]] (استنى ثانية صغيرة وانت بتلف).
• [[Atomics.isLockFree(n)]]: هل العمليات على [[n]] bytes بتتعمل في الـ hardware مباشرة.

بيشتغلوا على typed arrays صحيحة بس ([[Int32Array]] و [[BigInt64Array]] وأخواتهم)، و [[wait]] على [[Int32Array]] و [[BigInt64Array]] مشتركة بس.`,
          example: R`// race.mjs: ٤ workers بيزوّدوا نفس العدّاد مليون مرة كل واحد
import { Worker, isMainThread, workerData } from 'node:worker_threads';
const TIMES = 1_000_000;
if (isMainThread) {
  for (const mode of ['plain', 'atomic']) {
    const counter = new Int32Array(new SharedArrayBuffer(4));
    const workers = Array.from({ length: 4 }, () => new Worker(new URL(import.meta.url), { workerData: { counter, mode } }));
    await Promise.all(workers.map((w) => new Promise((resolve) => w.on('exit', resolve))));
    console.log(mode.padEnd(6), Atomics.load(counter, 0), 'المفروض', 4 * TIMES);
  }
} else {
  const { counter, mode } = workerData;
  if (mode === 'plain') for (let i = 0; i < TIMES; i++) counter[0]++;
  else for (let i = 0; i < TIMES; i++) Atomics.add(counter, 0, 1);
}`,
          try: R`شغّل [[race.mjs]] ٣ مرات واكتب رقم [[plain]] كل مرة: بيتغيّر؟ وبعدين خلّي عدد الـ workers واحد بس: [[plain]] بقى صح ليه؟ وآخر حاجة: غيّر [[ counter[0]++ ]] لـ [[ Atomics.store(counter, 0, Atomics.load(counter, 0) + 1) ]]: اتصلّح؟`,
          sol: R`~~~text الناتج (Node 24.22، ويندوز 11، تشغيلتين)
plain  1170714 المفروض 4000000
atomic 4000000 المفروض 4000000
plain  1165208 المفروض 4000000
atomic 4000000 المفروض 4000000
~~~

- **[[plain]] بيتغيّر كل مرة** وبعيد جدًا عن الصح (حوالي ٧٠٪ من الزيادات ضاعت). ده شكل الـ race condition: نتيجة غلط ومش ثابتة، ومفيش error. وعشان كده بيعدّي الاختبارات أحيانًا ويقع في production.
- **بـ worker واحد** [[plain]] صح، لأن مفيش حد تاني بيكتب في نفس الوقت. الـ race محتاجة اتنين على الأقل.
- **[[store(load + 1)]] مش هيصلّحها:** كل واحدة لوحدها atomic، بس بينهم فجوة: thread تاني ممكن يكتب بعد الـ [[load]] وقبل الـ [[store]]. اللي بيصلّح هو [[Atomics.add]] لأن القراية والزيادة والكتابة عملية **واحدة**، أو [[compareExchange]] في loop (تمرين [[atomicMax]] تحت).`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** كل سطر بيطبع القيمة اللي الدالة رجّعتها، وبعدين القيمة في المكان. اكتبهم قبل ما تشغّل:

~~~js
const a = new Int32Array(new SharedArrayBuffer(16));
console.log('store', Atomics.store(a, 0, 5), 'load', Atomics.load(a, 0));
console.log('add', Atomics.add(a, 0, 3), a[0]);
console.log('sub', Atomics.sub(a, 0, 2), a[0]);
console.log('and', Atomics.and(a, 0, 0b0100), a[0]);
console.log('or', Atomics.or(a, 0, 0b0011), a[0]);
console.log('xor', Atomics.xor(a, 0, 0b0001), a[0]);
console.log('exchange', Atomics.exchange(a, 0, 100), a[0]);
console.log('cmpxchg ok', Atomics.compareExchange(a, 0, 100, 1), a[0]);
console.log('cmpxchg fail', Atomics.compareExchange(a, 0, 100, 2), a[0]);
~~~`, done: R`كتبت الـ ٩ سطور صح، وتقدر تقول القاعدة: كل العمليات بترجّع القيمة **قبل** التغيير، إلا [[store]].`, sol: R`~~~text الناتج (Node 24.22)
store 5 load 5
add 5 8
sub 8 6
and 6 4
or 4 7
xor 7 6
exchange 6 100
cmpxchg ok 100 1
cmpxchg fail 1 1
~~~

- [[store]] بيرجّع القيمة اللي كتبها (٥). كل الباقيين بيرجّعوا **القديمة**: [[add]] رجّع ٥ والمكان بقى ٨.
- [[and]] و [[or]] و [[xor]] نفس [[&]] و [[|]] و [[^]] على الـ bits (درس «bitwise و shifts»): ٦ = [[0110]] و [[0100]] = ٤، و ٤ [[|]] [[0011]] = ٧، و ٧ [[^]] [[0001]] = ٦.
- [[compareExchange(a, 0, 100, 1)]]: «لو القيمة ١٠٠ اكتب ١». كانت ١٠٠ فكتب، ورجّع ١٠٠. المرة التانية القيمة ١ مش ١٠٠، فمكتبش، ورجّع ١. **تعرف إنها نجحت لما اللي رجع = اللي كنت مستنيه.**` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[atomicMax(arr, i, value)]] بتخلّي [[ arr[i] ]] = الأكبر بين القيمة الحالية و [[value]] بأمان حتى لو threads تانية بتكتب في نفس اللحظة، وترجّع القيمة الكبيرة اللي في المكان بعد العملية. مفيش [[Atomics.max]]، فاستخدم [[compareExchange]] في loop.`, done: R`[[atomicMax]] على ٥ بـ ٩ ترجّع ٩، وبعدها بـ ٣ ترجّع ٩ ومتغيّرش، والسالب شغال، والتمرين اللي بيتصحح لوحده عدّى.`, sol: R`~~~js atomic-max.mjs
function atomicMax(arr, i, value) {
  let old = Atomics.load(arr, i);
  while (value > old) {
    const seen = Atomics.compareExchange(arr, i, old, value);
    if (seen === old) return value;
    old = seen;
  }
  return old;
}
const a = new Int32Array(new SharedArrayBuffer(8));
a[0] = 5;
console.log(atomicMax(a, 0, 9), atomicMax(a, 0, 3), a[0], atomicMax(new Int32Array(2), 1, -4), atomicMax(Int32Array.of(-10), 0, -4));
~~~

~~~text الناتج (Node 24.22)
9 9 9 0 -4
~~~

- ده الـ pattern اسمه **CAS loop** (compare-and-swap): اقرا القيمة، احسب الجديدة، واكتبها **بشرط** إن محدش غيّرها من ساعة ما قريتها. لو حد غيّرها، [[compareExchange]] بيرجّع القيمة الجديدة اللي هو كتبها، فبنعيد بيها.
- لو [[value]] مش أكبر من الموجود، بنرجّع من غير ما نكتب خالص.
- بيشتغل على [[Int32Array]] عادية (مش مشتركة) برضه: [[Atomics.add]] و [[compareExchange]] مش شرط [[SharedArrayBuffer]] (اتجرّب)، بس من غير مشاركة مفيش لازمة. [[wait]] بس اللي بيرفض.
- كل عملية تانية مش موجودة في [[Atomics]] (min، ضرب، «زوّد بس لو أقل من حد») بتتعمل بنفس الـ loop.` },
            { lvl: 'تطبيق', t: R`**محاكاة:** بنك فيه حسابين بـ ٥٠٠ و ٥٠٠، و ٤ workers كل واحد بيعمل ٢٠٠ ألف تحويل جنيه من حساب للتاني. المجموع لازم يفضل ١٠٠٠. هنا [[Atomics.add]] مش كفاية: التحويل **عمليتين** (اطرح من واحد وزوّد على التاني) لازم يبانوا كأنهم واحدة. اعمل [[class Mutex]] بـ [[lock()]] و [[unlock()]] فوق [[compareExchange]] و [[wait]] و [[notify]]، وقارن من غير قفل وبقفل.`, done: R`من غير قفل المجموع بيطلع رقم غلط مختلف كل مرة، وبالقفل ١٠٠٠ بالظبط، و [[unlock]] على قفل مفتوح بيرمي.`, sol: R`~~~js mutex.mjs
// mutex.mjs: قفل بسيط فوق Int32Array مشتركة: 0 = مفتوح، 1 = مقفول
export class Mutex {
  constructor(int32, index = 0) { this.a = int32; this.i = index; }
  lock() {
    while (Atomics.compareExchange(this.a, this.i, 0, 1) !== 0) Atomics.wait(this.a, this.i, 1);
  }
  unlock() {
    if (Atomics.compareExchange(this.a, this.i, 1, 0) !== 1) throw new Error('unlock على قفل مش مقفول');
    Atomics.notify(this.a, this.i, 1);
  }
}
~~~

~~~js bank.mjs
// bank.mjs: ٤ workers بيحوّلوا فلوس بين حسابين. المجموع لازم يفضل 1000
import { Worker, isMainThread, workerData } from 'node:worker_threads';
import { Mutex } from './mutex.mjs';
const MOVES = 200_000;
if (isMainThread) {
  for (const useLock of [false, true]) {
    const mem = new Int32Array(new SharedArrayBuffer(12));
    mem[1] = 500; mem[2] = 500;
    const workers = Array.from({ length: 4 }, (_, n) => new Worker(new URL(import.meta.url), { workerData: { mem, useLock, n } }));
    await Promise.all(workers.map((w) => new Promise((resolve) => w.on('exit', resolve))));
    console.log(useLock ? 'بقفل:   ' : 'من غير:', mem[1], '+', mem[2], '=', mem[1] + mem[2]);
  }
} else {
  const { mem, useLock, n } = workerData;
  const mutex = new Mutex(mem, 0);
  for (let k = 0; k < MOVES; k++) {
    const [from, to] = (k + n) % 2 ? [1, 2] : [2, 1];
    if (useLock) mutex.lock();
    const amount = mem[from] > 0 ? 1 : 0;
    mem[from] = mem[from] - amount;
    mem[to] = mem[to] + amount;
    if (useLock) mutex.unlock();
  }
}
~~~

~~~text الناتج (Node 24.22، تشغيلتين)
من غير: 3304 + 2723 = 6027
بقفل:    500 + 500 = 1000
من غير: 4195 + 3543 = 7738
بقفل:    500 + 500 = 1000
~~~

- **من غير قفل** البنك «طبع فلوس»: ٦٠٢٧ بدل ١٠٠٠، ورقم تاني كل مرة. لأن اتنين workers قروا نفس الرصيد، وكل واحد كتب نتيجته فوق التاني، فطرح ضاع وزيادة لأ (أو العكس).
- **[[lock()]]:** [[compareExchange(a, i, 0, 1)]] = «لو مفتوح (٠) اقفله (١)». لو رجع ٠ يبقى احنا اللي قفلنا وندخل. لو رجع ١ يبقى حد تاني جوه، فـ [[Atomics.wait(a, i, 1)]] = «نام طول ما القيمة لسه ١» (من غير ما تحرق CPU)، ولما نصحى نحاول تاني.
- **[[unlock()]]:** نرجّع ٠ بـ [[compareExchange]] (عشان نمسك الغلطة لو حد فتح قفل مش مقفول: اتجرّب بيرمي [[Error: unlock على قفل مش مقفول]])، وبعدين [[Atomics.notify(a, i, 1)]] نصحّي **واحد** من اللي نايمين.
- الـ ٣ خانات في نفس الـ [[Int32Array]]: خانة ٠ القفل، و ١ و ٢ الحسابين. الحسابين بيتكتبوا بالطريقة العادية جوه القفل، لأن القفل بيضمن إن مفيش حد تاني جوه.
- القفل ده بسيط (مش «fair»: مفيش ضمان إن اللي مستني من بدري يدخل الأول). كفاية للتعلّم ولحالات كتير، والإنتاج الجد بيستخدم مكتبة أو تصميم من غير أقفال (رسايل).` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الصفحة (cross-origin isolated) عايزة تستنى لحد ما الـ worker يكتب ١ في [[ flag[0] ]]. الكود بيرمي على طول. ليه؟ وصلّحه من غير ما تجمّد الصفحة:

~~~js
const flag = new Int32Array(new SharedArrayBuffer(4));
worker.postMessage(flag);
Atomics.wait(flag, 0, 0);
console.log('الـ worker خلص');
~~~`, done: R`الصفحة بتطبع «الـ worker خلص» من غير error ومن غير ما تتجمد، وتقدر تقول ليه [[wait]] ممنوعة هنا ومسموحة في Node.`, sol: R`~~~text الرسالة (Chrome 157، صفحة cross-origin isolated)
TypeError: Atomics.wait cannot be called in this context
~~~

~~~js fixed.js
const flag = new Int32Array(new SharedArrayBuffer(4));
worker.postMessage(flag);
const result = Atomics.waitAsync(flag, 0, 0, 5000);
const status = result.async ? await result.value : result.value;
console.log('الـ worker خلص', status);
~~~

وجوه الـ worker بعد ما يخلص: [[Atomics.store(flag, 0, 1); Atomics.notify(flag, 0);]].

- [[Atomics.wait]] **بيوقّف الـ thread كله** لحد ما يتصحى. على الـ main thread في المتصفح ده معناه صفحة متجمدة، فالمتصفح بيمنعه خالص. جوه worker مسموح، وفي Node مسموح حتى على الـ main thread (اتجرّب: [[Atomics.wait(a, 1, 0, 50)]] رجّع [[timed-out]]).
- [[Atomics.waitAsync(arr, i, value, timeout)]] بترجّع [[{ async, value }]]: لو القيمة مش [[value]] أصلًا، [[async: false]] و [[value: 'not-equal']] على طول. غير كده [[async: true]] و [[value]] Promise بتخلص بـ [[ok]] (حد عمل notify) أو [[timed-out]]. اتجرّب في Chrome: [[waitAsync]] بمهلة ٥٠ ms رجّعت [[timed-out]]، وفي Node بعد [[notify]] رجّعت [[ok]].
- الـ timeout مهم: من غيره لو الـ worker وقع، الصفحة هتستنى للأبد.` },
            { lvl: 'تحدي', t: R`**ابني:** طابور ثابت الحجم (ring buffer) بـ ٨ خانات [[Float64]] فوق [[SharedArrayBuffer]] بين worker بيكتب ١٠٠٠ رقم (من ٠ لـ ٩٩٩) والـ main بيقراهم، **من غير ولا [[postMessage]]** للداتا. خانتين [[Int32]] للتحكم: [[head]] (اللي اتقرا) و [[tail]] (اللي اتكتب). الكاتب يستنى لو الطابور مليان، والقارئ يستنى لو فاضي، بـ [[wait]] و [[notify]].`, done: R`القارئ استلم ١٠٠٠ رقم مجموعهم ٤٩٩٥٠٠ بالظبط، والطابور اتملى واتفضى كذا مرة (حصل انتظار)، والبرنامج بيخلص لوحده.`, sol: R`~~~js ring.mjs
// ring.mjs: طابور ثابت الحجم فوق SharedArrayBuffer: worker بيكتب والـ main بيقرا، من غير postMessage
import { Worker, isMainThread, workerData } from 'node:worker_threads';
const SIZE = 8, HEAD = 0, TAIL = 1;
if (isMainThread) {
  const ctrl = new Int32Array(new SharedArrayBuffer(8));
  const slots = new Float64Array(new SharedArrayBuffer(SIZE * 8));
  new Worker(new URL(import.meta.url), { workerData: { ctrl, slots, count: 1000 } });
  let got = 0, sum = 0, waits = 0;
  while (got < 1000) {
    const head = Atomics.load(ctrl, HEAD), tail = Atomics.load(ctrl, TAIL);
    if (head === tail) { waits++; Atomics.wait(ctrl, TAIL, tail, 1000); continue; }
    sum += slots[head % SIZE];
    Atomics.store(ctrl, HEAD, head + 1);
    Atomics.notify(ctrl, HEAD);
    got++;
  }
  console.log('استلمت', got, 'المجموع', sum, 'المفروض', (999 * 1000) / 2, '| مرات الانتظار:', waits > 0);
} else {
  const { ctrl, slots, count } = workerData;
  for (let n = 0; n < count; n++) {
    let head = Atomics.load(ctrl, HEAD);
    const tail = Atomics.load(ctrl, TAIL);
    while (tail - head === SIZE) { Atomics.wait(ctrl, HEAD, head, 1000); head = Atomics.load(ctrl, HEAD); }
    slots[tail % SIZE] = n;
    Atomics.store(ctrl, TAIL, tail + 1);
    Atomics.notify(ctrl, TAIL);
  }
}
~~~

~~~text الناتج (Node 24.22، تشغيلتين بنفس الناتج)
استلمت 1000 المجموع 499500 المفروض 499500 | مرات الانتظار: true
~~~

- **العدادات بتزيد على طول:** [[head]] و [[tail]] مبيرجعوش صفر، والخانة = [[% SIZE]]. فاضي لما [[head === tail]]، ومليان لما [[tail - head === SIZE]]. ده أبسط من إنك تحسب «لفّة».
- **الترتيب مهم:** الكاتب بيكتب الرقم في الخانة **الأول**، وبعدين [[Atomics.store]] للـ [[tail]]. والـ [[store]] الـ atomic بيضمن إن اللي يشوف الـ [[tail]] الجديد بـ [[Atomics.load]] هيشوف الرقم اللي اتكتب قبله. لو عكست الترتيب، القارئ ممكن يقرا خانة لسه فاضية.
- [[Atomics.wait(ctrl, TAIL, tail, 1000)]]: «نام طول ما الـ [[tail]] لسه زي ما شفته، أقصى حاجة ثانية». ولو الكاتب زوّده بين ما قريت وما نمت، [[wait]] بترجع [[not-equal]] على طول فمفيش نومة ضايعة.
- ده **single-producer single-consumer**: كاتب واحد وقارئ واحد. لو اتنين كتّاب، الـ [[tail]] محتاج [[compareExchange]] أو قفل.
- ده نفس الشكل اللي Web Audio (AudioWorklet) والـ wasm threads بيستخدموه عشان ينقلوا صوت وداتا بسرعة من غير رسايل.` },
          ],
          check: { lang: "js", starter: R`function atomicMax(arr, i, value) {
  // arr[i] = max(arr[i], value) بأمان بـ compareExchange، ورجّع القيمة الكبيرة
}`, tests: R`test("أكبر: بيكتب", () => { const a = Int32Array.of(5); expect(atomicMax(a, 0, 9)).toBe(9); expect(a[0]).toBe(9); });
test("أصغر: مبيغيّرش", () => { const a = Int32Array.of(9); expect(atomicMax(a, 0, 3)).toBe(9); expect(a[0]).toBe(9); });
test("سالب", () => expect(atomicMax(Int32Array.of(-10), 0, -4)).toBe(-4));
test("index تاني", () => { const a = Int32Array.of(1, 2, 3); atomicMax(a, 2, 30); expect(Array.from(a)).toEqual([1, 2, 30]); });
test("متساوي", () => expect(atomicMax(Int32Array.of(7), 0, 7)).toBe(7));`, solution: R`function atomicMax(arr, i, value) {
  let old = Atomics.load(arr, i);
  while (value > old) {
    const seen = Atomics.compareExchange(arr, i, old, value);
    if (seen === old) return value;
    old = seen;
  }
  return old;
}` },
          flag: "script",
          deep: {
            why: R`الذاكرة المشتركة سريعة بس خطيرة: الـ CPU بيقسم [[ a[0]++ ]] لـ ٣ خطوات (load و add و store)، والـ cores التانية ممكن تدخل بينهم. وكمان الـ CPU والـ compiler بيعيدوا ترتيب القراية والكتابة عشان السرعة، فـ thread تاني ممكن يشوف كتابتك بترتيب غير اللي كتبته. [[Atomics]] بيحل الاتنين: العملية بتتعمل كوحدة واحدة، والعمليات الـ atomic بتتشاف بنفس الترتيب في كل الـ threads (sequentially consistent). ومعاها [[wait]] و [[notify]] عشان الـ threads تستنى بعض من غير ما تلف وتحرق CPU. وده الأساس اللي wasm threads و Emscripten pthreads مبنيين عليه.`,
            how: R`[[Atomics]] object عادي (مش constructor: [[new Atomics()]] بيرمي [[TypeError: Atomics is not a constructor]]) زي [[Math]]. كل دالة بتاخد [[(typedArray, index, ...)]]: الـ array لازم integer typed array ([[Int8]] لحد [[BigUint64]])، و [[Float32Array]] بيرمي [[TypeError: [object Float32Array] is not an integer typed array.]]، والـ index برّه الطول: [[RangeError: Invalid atomic access index]]. العمليات بتترجم لتعليمات CPU atomic (زي [[lock xadd]] و [[cmpxchg]] على x86)، و [[Atomics.isLockFree(n)]] بيقولك لو الحجم [[n]] (١ و ٢ و ٤ و ٨) بيتعمل كده من غير lock داخلي: على الجهاز ده [[true]] للأربعة و [[false]] لـ ٣.

[[Atomics.wait(int32, i, expected, timeout)]] بيقارن [[ int32[i] ]] بـ [[expected]] **atomically**: لو مختلفين بيرجّع [[not-equal]] على طول، ولو متساويين بينيّم الـ thread لحد [[notify]] على نفس المكان ([[ok]]) أو الـ timeout بالمللي ([[timed-out]]). شغال على [[Int32Array]] و [[BigInt64Array]] **مشتركين** بس ([[TypeError: [object Int32Array] is not a shared typed array.]] للعادية، و [[TypeError: [object Uint8Array] is not an int32 or BigInt64 typed array.]] للنوع الغلط)، وممنوع على الـ main thread في المتصفح. [[Atomics.notify(int32, i, count)]] بيصحّي لحد [[count]] (الافتراضي الكل) ويرجّع عدد اللي صحيوا فعلًا (صفر لو محدش نايم). [[Atomics.waitAsync]] نفس [[wait]] بس بيرجّع [[{ async, value }]] و [[value]] Promise. و [[Atomics.pause(n)]] (ES2025) تلميح للـ CPU إنك في spin loop (تعليمة [[pause]] على x86)، بيرجّع [[undefined]] ومبيناّمش الـ thread، و [[n]] لازم integer ([[TypeError: Atomics.pause argument must be undefined or an integer]]).

الفكرة كلها اسمها في MDN «Agent communication and coordination»: كل thread (worker أو الصفحة) «agent»، والـ agents بتتكلم يا برسايل ([[postMessage]]) يا بذاكرة مشتركة + [[Atomics]].`,
            when: R`[[Atomics.add]] و [[sub]]: عدادات مشتركة (تقدم، إحصائيات، IDs). [[load]] و [[store]]: أي قراية أو كتابة لخانة thread تاني بيلمسها (أعلام «اتلغى» و «خلص»، والـ [[head]] و [[tail]] في الطابور). [[compareExchange]]: أقفال وأي عملية مركبة (max، «زوّد لو أقل من حد»). [[exchange]]: خد القيمة وحط مكانها في خطوة (spinlock بسيط). [[and]] و [[or]] و [[xor]]: أعلام bits مشتركة. [[wait]] و [[notify]]: طوابير وأقفال من غير ما تحرق CPU (في الـ workers و Node). [[waitAsync]]: الانتظار من الـ main thread في المتصفح. [[pause]]: جوه loop بيستنى فترة قصيرة جدًا قبل ما تلجأ لـ [[wait]]. **وأول سؤال قبل أي حاجة:** ينفع رسايل بدل الذاكرة المشتركة؟ لو آه، الرسايل أبسط وأأمن.`,
            mistakes: R`- [[ a[0]++ ]] على ذاكرة مشتركة: زيادات بتضيع (١.١٧ مليون من ٤ مليون).
- [[Atomics.store(a, 0, Atomics.load(a, 0) + 1)]]: كل خطوة atomic بس بينهم فجوة. [[Atomics.add]] أو CAS loop.
- [[Atomics.add]] على كل خانة لوحدها في عملية محتاجة خانتين متسقين (تحويل بنك): محتاج قفل.
- [[Atomics.wait]] على الـ main thread في المتصفح: [[TypeError: Atomics.wait cannot be called in this context]]. [[waitAsync]].
- [[wait]] على [[Uint8Array]] أو array مش مشتركة: [[TypeError]]. لازم [[Int32Array]] أو [[BigInt64Array]] على [[SharedArrayBuffer]].
- [[wait]] من غير timeout: لو اللي هيصحّيك وقع، هتنام للأبد.
- تكتب القيمة **بعد** ما تعلن عنها ([[store]] للـ [[tail]] قبل الداتا): القارئ بيقرا زبالة.
- تنسى [[notify]] بعد التغيير: اللي نايم مش هيصحى (إلا بالـ timeout).
- [[Atomics]] على [[Float32Array]] أو [[Float64Array]]: [[TypeError: ... is not an integer typed array.]] خزّن الأرقام العشرية كـ integers (مضروبة في ١٠٠٠ مثلًا) لو محتاج atomics عليها.`,
          },
          teach: R`## الفكرة في سطر

الكتابة العادية من كذا thread في نفس المكان بتضيّع تغييرات؛ [[Atomics]] بيعمل كل عملية كوحدة واحدة، و [[wait]] و [[notify]] بيخلّوا الـ threads تستنى بعض. الناتج من Node 24.22 على ويندوز 11، و Chrome 157 للمتصفح.

---

## ١. الـ race condition بالأرقام

المثال فوق: ٤ workers، وكل واحد بيزوّد نفس الـ [[Int32]] مليون مرة.

~~~text الناتج (تشغيلتين)
plain  1170714 المفروض 4000000
atomic 4000000 المفروض 4000000
plain  1165208 المفروض 4000000
atomic 4000000 المفروض 4000000
~~~

ليه [[ counter[0]++ ]] بيضيّع؟ لأنه ٣ خطوات، واتنين workers ممكن يتداخلوا كده:

| الخطوة | worker أ | worker ب | القيمة في الذاكرة |
|---|---|---|---|
| ١ | يقرا ٧ | | ٧ |
| ٢ | | يقرا ٧ | ٧ |
| ٣ | يكتب ٨ | | ٨ |
| ٤ | | يكتب ٨ | ٨: زيادة ضاعت |

[[Atomics.add(counter, 0, 1)]] بيعمل الـ ٣ خطوات كتعليمة CPU واحدة، فمفيش حد يقدر يقرا في النص.

---

## ٢. كل functions الـ [[Atomics]]

المثال على [[a = new Int32Array(new SharedArrayBuffer(16))]]، كل سطر بعد اللي قبله (اتجرّبوا كلهم):

| الدالة | بتعمل إيه | مثال ← بيرجّع، والقيمة بعدها |
|---|---|---|
| [[Atomics.store(a, i, v)]] | تكتب [[v]] | [[store(a, 0, 5)]] ← ٥ |
| [[Atomics.load(a, i)]] | تقرا القيمة بأمان | ← ٥ |
| [[Atomics.add(a, i, v)]] | تزوّد | [[add(a, 0, 3)]] ← ٥ (القديمة)، وبقت ٨ |
| [[Atomics.sub(a, i, v)]] | تطرح | [[sub(a, 0, 2)]] ← ٨، وبقت ٦ |
| [[Atomics.and(a, i, v)]] | [[&]] على الـ bits | [[and(a, 0, 0b0100)]] ← ٦، وبقت ٤ |
| [[Atomics.or(a, i, v)]] | [[OR]] على الـ bits | [[or(a, 0, 0b0011)]] ← ٤، وبقت ٧ |
| [[Atomics.xor(a, i, v)]] | [[^]] على الـ bits | [[xor(a, 0, 0b0001)]] ← ٧، وبقت ٦ |
| [[Atomics.exchange(a, i, v)]] | تكتب [[v]] وترجّع اللي كان | [[exchange(a, 0, 100)]] ← ٦، وبقت ١٠٠ |
| [[Atomics.compareExchange(a, i, expected, v)]] | تكتب [[v]] **بس لو** القيمة = [[expected]] | [[(a, 0, 100, 1)]] ← ١٠٠ ونجحت؛ تاني مرة ← ١ وفشلت |
| [[Atomics.wait(a, i, expected, ms)]] | تنام لو القيمة = [[expected]] | قيمة مختلفة ← [[not-equal]]، ومهلة ٥٠ ← [[timed-out]] |
| [[Atomics.waitAsync(a, i, expected, ms)]] | نفس [[wait]] بـ Promise | [[{ async: true, value: Promise }]]، وبعد notify ← [[ok]] |
| [[Atomics.notify(a, i, count)]] | تصحّي لحد [[count]] نايمين | محدش نايم ← ٠، وواحد نايم ← ١ |
| [[Atomics.isLockFree(n)]] | العمليات على [[n]] bytes في الـ hardware مباشرة؟ | [[1, 2, 3, 4, 8]] ← [[true, true, false, true, true]] |
| [[Atomics.pause(n)]] | تلميح للـ CPU إنك بتلف مستني (ES2025) | ← [[undefined]] |

وكلهم شغالين على [[BigInt64Array]] بـ BigInt ([[Atomics.add(b, 0, 5n)]] ← [[0n]]).

---

## ٣. [[Atomics.compareExchange]]: أساس أي lock

~~~js
lock() {
  while (Atomics.compareExchange(this.a, this.i, 0, 1) !== 0) Atomics.wait(this.a, this.i, 1);
}
unlock() {
  Atomics.compareExchange(this.a, this.i, 1, 0);
  Atomics.notify(this.a, this.i, 1);
}
~~~

- خانة واحدة: ٠ مفتوح و ١ مقفول.
- [[lock]]: «لو ٠ خليه ١». لو رجع ٠ يبقى احنا اللي قفلنا. غير كده نام بـ [[wait]] طول ما القيمة ١، ولما نصحى نحاول تاني.
- [[unlock]]: رجّعه ٠ وصحّي واحد.
- النسخة الكاملة في تمرين «البنك»: من غير القفل المجموع طلع ٦٠٢٧ بدل ١٠٠٠، وبيه ١٠٠٠ بالظبط.

---

## ٤. [[Atomics.wait]] و [[Atomics.notify]] و [[Atomics.waitAsync]]

~~~js
const a = new Int32Array(new SharedArrayBuffer(16));
console.log('wait not-equal', Atomics.wait(a, 1, 7, 100));
console.log('wait timeout', Atomics.wait(a, 1, 0, 50));
console.log('notify none', Atomics.notify(a, 1, 1));
const r = Atomics.waitAsync(a, 2, 0, 1000);
setTimeout(() => console.log('notify woke', Atomics.notify(a, 2)), 20);
r.value.then((v) => console.log('waitAsync result', v));
~~~

~~~text الناتج (Node 24.22)
wait not-equal not-equal
wait timeout timed-out
notify none 0
notify woke 1
waitAsync result ok
~~~

- [[wait(a, 1, 7, 100)]]: القيمة صفر مش ٧، فمستناش أصلًا: [[not-equal]]. ده مهم: لو حد غيّر القيمة قبل ما تنام، مش هتنام على الفاضي.
- [[wait(a, 1, 0, 50)]]: القيمة صفر، فنام ٥٠ ms ومحدش صحّاه: [[timed-out]].
- [[notify]] ومفيش حد نايم: ٠.
- [[waitAsync]]: مبيوقّفش حاجة، وبيرجّع Promise. و [[notify]] بعد ٢٠ ms صحّى واحد، والـ Promise خلصت بـ [[ok]].

| | [[Atomics.wait]] | [[Atomics.waitAsync]] |
|---|---|---|
| بيوقّف الـ thread | آه | لأ، Promise |
| الـ main thread في المتصفح | ممنوع: [[TypeError: Atomics.wait cannot be called in this context]] | مسموح (اتجرّب في Chrome 157) |
| workers و Node | مسموح | مسموح |

---

## ٥. [[Atomics.pause]] و [[Atomics.isLockFree]]

- لو متوقع القفل يتفتح خلال نانو ثواني، النوم بـ [[wait]] أغلى من الانتظار نفسه. فالأقفال الحقيقية بتلف شوية الأول ([[spin]]) وجوه الـ loop [[Atomics.pause()]]: بيقول للـ CPU «أنا بلف مستني»، فبيوفّر طاقة ويسيب الـ core التاني (hyper-threading) يشتغل. وبعد شوية لفات من غير نتيجة: [[wait]].
- [[Atomics.isLockFree(n)]]: نادر تحتاجه. لو [[false]] لحجم معين، العمليات عليه شغالة صح برضه بس بـ lock داخلي في الـ engine (أبطأ). الـ ٤ bytes ([[Int32]]) مضمونة [[true]] حسب المواصفة، وده سبب إن [[wait]] شغالة عليها.

---

## ٦. Agent communication and coordination: الصورة الكاملة (Atomics و SharedArrayBuffer)

| الطريقة | ازاي | المكسب | التمن |
|---|---|---|---|
| رسايل [[postMessage]] | نسخ أو نقل | مفيش race conditions خالص | كل تحديث رسالة، ونسخ للداتا الكبيرة من غير transfer |
| ذاكرة مشتركة + [[Atomics]] | [[SharedArrayBuffer]] و [[load]] و [[store]] و [[add]] | من غير رسايل، والكل بيشوف فورًا | race conditions، وأقفال، و headers في المتصفح |

ابدأ بالرسايل. انقل للذاكرة المشتركة لما تقيس إن الرسايل هي المشكلة.

---

## الخلاصة

- [[ a[i]++ ]] من كذا thread = أرقام بتضيع. [[Atomics.add]] أو CAS loop بـ [[compareExchange]].
- كل العمليات بترجّع القيمة **القديمة** (إلا [[store]]).
- عملية على أكتر من خانة = قفل ([[compareExchange]] + [[wait]] + [[notify]]).
- [[wait]] على [[Int32Array]] أو [[BigInt64Array]] مشتركة، ومش على الـ main thread في المتصفح: هناك [[waitAsync]].`,
          lines: [
            R`بنستورد [[Worker]] و [[isMainThread]] (عشان نعرف احنا فين) و [[workerData]] (الداتا اللي الـ worker بياخدها).`,
            R`كل worker هيزوّد مليون مرة.`,
            R`نفس الملف بيشتغل مرتين: كـ main thread وكـ worker. الجزء ده للـ main.`,
            R`بنجرّب مرتين: زيادة عادية، وزيادة بـ [[Atomics.add]].`,
            R`عداد واحد [[Int32]] على [[SharedArrayBuffer]] فيه ٤ bytes، كل الـ workers هيشوفوه.`,
            R`٤ workers من نفس الملف ([[import.meta.url]])، وكل واحد بياخد العداد المشترك والطريقة.`,
            R`بنستنى الـ ٤ يخلصوا (حدث [[exit]]) قبل ما نقرا النتيجة.`,
            R`بنقرا العداد بـ [[Atomics.load]] ونطبعه جنب الرقم الصح (٤ مليون).`,
            R`نهاية الـ loop على الطريقتين.`,
            R`[[else]]: الكود اللي بعد كده بيشتغل لما الملف يتحمّل كـ worker مش main.`,
            R`الجزء ده بيشتغل جوه كل worker: بياخد العداد والطريقة من [[workerData]].`,
            R`الطريقة العادية: [[ counter[0]++ ]] (قراية ثم زيادة ثم كتابة) مليون مرة.`,
            R`الطريقة الـ atomic: [[Atomics.add]] بتعمل الـ ٣ خطوات كعملية واحدة.`,
            R`نهاية جزء الـ worker، ولما الـ loop يخلص الـ worker بيخرج لوحده.`,
          ],
          ref: [
            { t: "MDN Guide: Agent communication and coordination", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Agent_communication_and_coordination" },
            { t: "MDN: Atomics", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics" },
            { t: "MDN: Atomics.compareExchange()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/compareExchange" },
            { t: "MDN: Atomics.wait()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/wait" },
            { t: "MDN: Atomics.waitAsync()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/waitAsync" },
            { t: "MDN: Atomics.notify()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/notify" },
            { t: "MDN: Atomics.pause()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/pause" },
            { t: "MDN: Atomics.isLockFree()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/isLockFree" },
          ],
          pre: [{ to: "js/SharedArrayBuffer: growable و crossOriginIsolated", why: R`الذاكرة المشتركة اللي [[Atomics]] بيشتغل عليها` }, { to: "js/bitwise و shifts", why: R`[[and]] و [[or]] و [[xor]] على الـ bits` }],
        },
      ],
    }
]);
