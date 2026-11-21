// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: R`الصوت والفيديو من JavaScript: مشغّل خاص و getUserMedia و Web Audio`,
      l: 3,
      n: "الصيغ والـ codecs و canPlayType و MediaCapabilities، و play و pause و currentTime و duration والأحداث، ومشغّل فيديو خاص بالكيبورد والـ aria و fullscreen و PiP، وأخطاء الميديا و MediaError والـ MIME والـ Range، والكاميرا والميكروفون بـ getUserMedia، والتسجيل بـ MediaRecorder، و Web Audio (oscillator و gain و analyser)، و Media Source Extensions، ومشاريع: مشغّل بودكاست بيفتكر، ومسجّل ملاحظات صوتية، ومشغّل دروس بفصول، ومترونوم",
      pre: [
        { to: "css/audio و source", why: R`الجزء الـ HTML: [[<audio controls>]] و [[<source type>]] و [[autoplay]] و [[preload]]. هنا بنكمل من JavaScript ومش هنكرره` },
        { to: "css/video و iframe", why: R`[[<video>]] و [[poster]] و [[<track>]] والترجمة بـ WebVTT` },
        { to: "js/addEventListener", why: R`كل حاجة في الوحدة دي أحداث: [[loadedmetadata]] و [[timeupdate]] و [[ended]] و [[dataavailable]]` },
        { to: "js/async و await", why: R`[[play()]] و [[getUserMedia()]] و [[decodeAudioData()]] بيرجّعوا Promise، والرفض فيهم هو الخطأ الحقيقي` },
        { to: "js/DataView: getUint16 و setFloat32 و endianness", why: R`بنعمل ملفات WAV في الذاكرة بـ [[DataView]] عشان الأمثلة متحتاجش ملفات` },
        { to: "js/canvas: ارسم أشكال وحرّكها", why: R`الصورة من الكاميرا، والفيديو التجريبي، ورسم الموجة، كلهم على canvas` },
        { to: "js/Web Animations API: element.animate", why: R`[[currentTime]] و [[playbackRate]] و [[play]] و [[pause]]: نفس الأفكار على الـ animation، فالميديا هتبقى مألوفة` },
      ],
      goal: [
        R`تفرق بين الـ container (MP4 و WebM) والـ codec (H.264 و VP9 و AV1 و AAC و Opus)، وتسأل المتصفح بـ [[canPlayType]] و [[MediaCapabilities]] قبل ما تختار.`,
        R`تتحكم في أي [[<audio>]] أو [[<video>]] من JavaScript: [[play()]] كـ Promise ورفضها، و [[pause]] و stop بإيدك، و [[currentTime]] و [[duration]] و [[volume]] و [[playbackRate]]، والأحداث بترتيبها.`,
        R`تبني مشغّل خاص بأزرار حقيقية وشريط وقت واختصارات كيبورد و [[aria]] صح، و fullscreen و صورة في صورة.`,
        R`تفهم أخطاء الميديا: [[MediaError]] وأكواده، و [[error]] على العنصر مقابل آخر [[<source>]]، والسيرفر اللي مبيدعمش Range.`,
        R`تفتح الكاميرا والميكروفون بـ [[getUserMedia]] وتتعامل مع كل رفض، وتقفلهم صح، وتصوّر صورة على canvas.`,
        R`تسجّل صوت وفيديو بـ [[MediaRecorder]] وتنزّلهم، وتولّد صوت وتحلله بـ Web Audio، وتعرف Media Source Extensions بتتعمل لإيه.`,
      ],
      use: {
        prog: R`أي موقع فيه درس فيديو، أو بودكاست، أو رسالة صوتية، أو مكالمة، أو «صوّر البطاقة»، أو إشعار بصوت، بيعدّي من هنا. ومشغّلات YouTube و Spotify Web و Google Meet مبنية على نفس الـ APIs دي: [[HTMLMediaElement]] للتشغيل، و [[getUserMedia]] للكاميرا، و [[MediaRecorder]] للتسجيل، و Web Audio للصوت، و MSE للـ streaming.`,
        work: R`منصات تعليم بتحتاج مشغّل بيفتكر مكانك وفيه فصول وسرعات، وتطبيقات دعم فني بتسجّل رسالة صوتية، وفورمات KYC بتصوّر البطاقة بالكاميرا، وأدوات اجتماعات وتسجيل شاشة، وألعاب ومحررات صوت في المتصفح، ومواقع أخبار بتشغّل فيديو HLS. والباجات المشهورة هنا: فيديو مبيشتغلش على iPhone، وشريط وقت مبيقدّمش، وكاميرا نورها فاضل منور.`,
        cs: R`الـ digital audio: الـ sampling والـ sample rate و Nyquist، و PCM، والـ compression (lossy و lossless)، والـ container مقابل الـ codec، و FFT (الـ AnalyserNode بيحسبه)، والـ envelopes و ADSR، و HTTP Range requests، والـ adaptive bitrate streaming (HLS و DASH)، والـ scheduling الدقيق بساعة الصوت بدل الـ timers.`,
      },
      projects: [
        { lvl: 'صغير', dir: "notify-sounds", t: R`أصوات التنبيه من غير ولا ملف`, what: R`صفحة فيها ٤ أصوات لتطبيق: «نجاح» و «خطأ» و «رسالة جديدة» و «الوقت خلص». كل صوت لستة نغمات (تردد، ومن إمتى لحد إمتى، والموجة) بتتعزف بـ Web Audio بـ envelope من غير «تكة». وجنب كل صوت زرار «نزّل WAV» بيعمل نفس الصوت بالظبط في [[OfflineAudioContext]] ويحوّله ملف WAV بـ [[DataView]]، عشان المصمم ياخده لتطبيق الموبايل. من دروس «Web Audio API» و «MediaRecorder» (الـ Blob والتحميل).`, done: R`كل زرار بيشغّل صوت مختلف وواضح، والضغط كذا مرة ورا بعض مبيقطعش الصوت اللي قبله. و «نزّل WAV» بينزّل ملف حجمه = ٤٤ + (المدة × 44100 × 2) byte ويشتغل في أي مشغّل، و«نجاح» بالظبط 35324 byte.`, sol: R`## الشكل النهائي

~~~live 300 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>أصوات التنبيه</title>
<style>
  body { font-family: system-ui, sans-serif; margin: 16px; background: #f8fafc; color: #0f172a; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; max-width: 640px; }
  .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px; display: grid; gap: 6px; }
  .card button { font: inherit; min-height: 44px; border: 0; border-radius: 8px; cursor: pointer; }
  .play { background: #0f766e; color: #fff; }
  .wav { background: #e2e8f0; color: #0f172a; }
  #msg { margin-top: 12px; }
</style>
</head>
<body>
<h1>أصوات التنبيه</h1>
<p>كل صوت هنا معمول بـ Web Audio، من غير ولا ملف.</p>
<div class="grid" id="grid"></div>
<p id="msg" role="status"></p>
<script>
// كل صوت = لستة نغمات: [تردد البداية، تردد النهاية، من إمتى، لحد إمتى، الموجة]
const SOUNDS = {
  'نجاح': [[523.25, 523.25, 0, 0.12, 'sine'], [783.99, 783.99, 0.1, 0.35, 'sine']],
  'خطأ': [[220, 180, 0, 0.18, 'square'], [220, 180, 0.22, 0.42, 'square']],
  'رسالة جديدة': [[880, 880, 0, 0.08, 'triangle'], [1318.5, 1318.5, 0.09, 0.3, 'triangle']],
  'الوقت خلص': [[880, 880, 0, 0.15, 'sine'], [880, 880, 0.25, 0.4, 'sine'], [880, 880, 0.5, 0.65, 'sine'], [1760, 1760, 0.75, 1.2, 'sine']],
};
const VOLUME = 0.25;

// بيرسم الصوت في أي context: الحقيقي (للسماعة) أو الـ offline (للملف)
function schedule(ctx, notes, start) {
  for (const [f1, f2, from, to, type] of notes) {
    const osc = ctx.createOscillator(), env = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(f1, start + from);
    if (f2 !== f1) osc.frequency.exponentialRampToValueAtTime(f2, start + to);
    env.gain.setValueAtTime(0, start + from);
    env.gain.linearRampToValueAtTime(VOLUME, start + from + 0.01);
    env.gain.exponentialRampToValueAtTime(0.001, start + to);
    osc.connect(env).connect(ctx.destination);
    osc.start(start + from);
    osc.stop(start + to + 0.02);
  }
}
const length = (notes) => Math.max(...notes.map((n) => n[3])) + 0.05;

let ctx;
async function play(name) {
  ctx ??= new AudioContext();
  if (ctx.state === 'suspended') await ctx.resume();
  schedule(ctx, SOUNDS[name], ctx.currentTime + 0.01);
  document.querySelector('#msg').textContent = 'اتشغّل: ' + name;
}

// WAV من OfflineAudioContext: نفس schedule بالظبط
async function toWav(name) {
  const rate = 44100, notes = SOUNDS[name];
  const off = new OfflineAudioContext(1, Math.ceil(length(notes) * rate), rate);
  schedule(off, notes, 0);
  const data = (await off.startRendering()).getChannelData(0), n = data.length;
  const buf = new ArrayBuffer(44 + n * 2), v = new DataView(buf);
  const str = (o, s) => [...s].forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)));
  str(0, 'RIFF'); v.setUint32(4, 36 + n * 2, true); str(8, 'WAVE'); str(12, 'fmt ');
  v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
  v.setUint32(24, rate, true); v.setUint32(28, rate * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true);
  str(36, 'data'); v.setUint32(40, n * 2, true);
  for (let i = 0; i < n; i++) v.setInt16(44 + i * 2, Math.max(-1, Math.min(1, data[i])) * 0x7fff, true);
  return new Blob([buf], { type: 'audio/wav' });
}

for (const name of Object.keys(SOUNDS)) {
  const card = document.createElement('div');
  card.className = 'card';
  const playBtn = Object.assign(document.createElement('button'), { type: 'button', className: 'play', textContent: '▶ ' + name });
  const wavBtn = Object.assign(document.createElement('button'), { type: 'button', className: 'wav', textContent: 'نزّل WAV' });
  playBtn.addEventListener('click', () => play(name));
  wavBtn.addEventListener('click', async () => {
    const blob = await toWav(name);
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: 'sound-' + Object.keys(SOUNDS).indexOf(name) + '.wav' });
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    document.querySelector('#msg').textContent = 'اتعمل ملف ' + name + ': ' + blob.size + ' byte';
  });
  card.append(playBtn, wavBtn);
  document.querySelector('#grid').append(card);
}
</script>
</body>
</html>
~~~

**هتشوف إيه:** عنوان، و ٤ كروت في grid، كل كارت فيه زرار أخضر «▶ نجاح» وزرار رمادي «نزّل WAV». الضغط على الأخضر بيعزف الصوت، والسطر تحت بيقول «اتشغّل: نجاح». جوه الـ preview العزف شغال والتحميل لأ (الـ iframe معزول من غير [[allow-downloads]])، والسطر هيكتب حجم الملف اللي اتعمل برده.

## الشرح

- **[[SOUNDS]] بيانات مش كود:** كل نغمة [[[f1, f2, from, to, type]]]. لو [[f2]] مختلف، التردد بيتزحلق (الـ «خطأ» بينزل من 220 لـ 180، فبيبان «زعلان»). تزوّد صوت جديد = سطر واحد.
- **[[schedule(ctx, notes, start)]]** بتشتغل على **أي** context: الحقيقي ([[AudioContext]] للسماعة) والـ offline (للملف). كده الملف والصوت اللي سمعته نفس الحاجة بالظبط، مش نسختين ممكن يختلفوا.
- **الـ envelope:** صفر ← [[VOLUME]] في ١٠ ms ← [[0.001]] في آخر النغمة. و [[osc.stop(to + 0.02)]] بعد ما الصوت يوصل للصفر بشوية.
- **[[ctx ??= new AudioContext()]]** مع أول ضغطة، و [[resume()]] لو [[suspended]]: سياسة الـ autoplay (درس Web Audio قسم ١).
- **[[toWav]]:** [[OfflineAudioContext(1, length × 44100, 44100)]] ← [[startRendering()]] ← العينات [[Float32]] ← [[Int16]] في WAV. ٤٤١٠٠ مش ٢٢٠٥٠ عشان الـ «رسالة جديدة» فيها 1318 Hz والصوت يفضل نضيف.
- **[[a.click()]]** على لينك اتعمل في الكود بينزّل من غير ما يتحط في الصفحة، و [[revokeObjectURL]] بعد ثانية (لو عملته على طول، التحميل ممكن ميلحقش).
- **اسم الملف [[sound-0.wav]]** مش اسم الصوت بالعربي: أسامي الملفات بالإنجليزي أسلم على كل الأنظمة والسيرفرات.

## غلطات وقعت فيها وأنا ببنيها

- مفيش باج طلع في الاختبار هنا. اللي اتأكدت منه قبل ما أكتب الحل: كل ملف WAV حجمه طالع بالحسبة بالظبط (تحت)، والصوت بيشتغل جوه الـ preview المعزول، والتحميل بيحصل من صفحة عادية ومبيحصلش جوه الـ preview (ده سلوك الـ sandbox مش باج).
- قرار اتاخد عمدًا: [[osc.stop(to + 0.02)]] بعد ما الـ envelope يوصل لـ [[0.001]] بـ ٢٠ ms، عشان الموجة متتقطعش وهي لسه مسموعة.

## اتقاس

~~~text الناتج (Chrome 157، Playwright من سيرفر محلي)
▶ نجاح:            اتشغّل: نجاح   (ctx.state = running)
نزّل WAV نجاح:      download: sound-0.wav 35324 byte
نزّل WAV خطأ:       download: sound-1.wav 41498 byte
نزّل WAV رسالة:     download: sound-2.wav 30914 byte
نزّل WAV الوقت خلص: download: sound-3.wav 110294 byte
جوه الـ preview المعزول: «اتشغّل: خطأ» و «اتعمل ملف الوقت خلص: 110294 byte» ومفيش تحميل
~~~

- [[35324 = 44 + 17640 × 2]]: الـ «نجاح» آخر نغمة فيه بتخلص عند 0.35 + 0.05 = 0.4 ثانية × 44100 = 17640 عينة. الحسبة دي هي اختبار إن الـ header والطول صح.` },
        { lvl: 'صغير', dir: "episode-controls", t: R`أزرار حلقة بودكاست: ١٥ لورا و ٣٠ لقدام والسرعة`, what: R`مشغّل حلقة واحدة بشكل تطبيقات البودكاست: شريط وقت، والوقت اللي فات والوقت الباقي بالسالب، وزرار تشغيل كبير، و «↺15» يرجع ١٥ ثانية، و «30↻» يقدّم ٣٠، وزرار سرعة بيلف [[1× ← 1.25× ← 1.5× ← 2× ← 1×]]. والكيبورد: [[k]] تشغيل، والأسهم ١٥ و ٣٠. كل الأزرار [[<button>]] عليها [[aria-label]]، والواجهة بتتحدث من أحداث الصوت. من دروس «HTMLMediaElement» و «مشغّل فيديو خاص».`, done: R`على حلقة ١:٣٠: «30↻» = [[0:30]] و [[-1:00]]، و «↺15» = [[0:15]]، وضغطتين كمان = [[0:00]] (مش سالب). السرعة بعد ٤ ضغطات بترجع [[1×]]. والسهم اليمين وهو شغال = [[0:30]] و [[aria-valuetext]] = «0:30 من 1:30».`, sol: R`## الشكل النهائي

~~~view 300
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>حلقة ١٢: الـ Promises</title>
<style>
  body { font-family: system-ui, sans-serif; margin: 16px; background: #fafaf9; color: #1c1917; }
  .ep { max-width: 520px; background: #fff; border: 1px solid #e7e5e4; border-radius: 14px; padding: 14px; }
  .ep h1 { font-size: 1.1rem; margin: 0 0 10px; }
  .bar { display: flex; align-items: center; gap: 8px; direction: ltr; }
  .bar button { font: inherit; min-width: 48px; min-height: 48px; border: 0; border-radius: 50%; background: #f5f5f4; cursor: pointer; }
  .bar #play { background: #ea580c; color: #fff; min-width: 56px; min-height: 56px; font-size: 1.2rem; }
  .bar #speed { border-radius: 24px; padding: 0 12px; font-variant-numeric: tabular-nums; }
  .bar button:focus-visible { outline: 3px solid #1d4ed8; outline-offset: 2px; }
  .times { display: flex; justify-content: space-between; direction: ltr; font-variant-numeric: tabular-nums; color: #57534e; margin-top: 8px; }
  #seek { width: 100%; accent-color: #ea580c; margin-top: 10px; }
</style>
</head>
<body>
<section class="ep" id="ep" aria-label="مشغّل الحلقة">
  <h1>حلقة ١٢: الـ Promises من غير صداع</h1>
  <audio id="audio" preload="metadata"></audio>
  <input id="seek" type="range" min="0" max="0" step="1" value="0" aria-label="مكان التشغيل">
  <div class="times"><span id="cur">0:00</span><span id="left">-0:00</span></div>
  <div class="bar">
    <button id="back" type="button" aria-label="ارجع ١٥ ثانية">↺15</button>
    <button id="play" type="button" aria-label="شغّل">▶</button>
    <button id="fwd" type="button" aria-label="قدّم ٣٠ ثانية">30↻</button>
    <button id="speed" type="button" aria-label="السرعة 1×">1×</button>
  </div>
</section>
<script>
// الـ preview مفيهوش ملفات صوت: WAV بيتعمل في الذاكرة (صفارة كل ثانية)
function demoWav(seconds, freq) {
  const rate = 8000, n = seconds * rate, buf = new ArrayBuffer(44 + n * 2), v = new DataView(buf);
  const str = (o, s) => [...s].forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)));
  str(0, 'RIFF'); v.setUint32(4, 36 + n * 2, true); str(8, 'WAVE'); str(12, 'fmt ');
  v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
  v.setUint32(24, rate, true); v.setUint32(28, rate * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true);
  str(36, 'data'); v.setUint32(40, n * 2, true);
  for (let i = 0; i < n; i++) v.setInt16(44 + i * 2, (i / rate) % 1 < 0.15 ? Math.sin(2 * Math.PI * freq * i / rate) * 6000 : 0, true);
  return URL.createObjectURL(new Blob([buf], { type: 'audio/wav' }));
}
document.querySelector('#audio').src = demoWav(90, 660);

const $ = (s) => document.querySelector(s);
const audio = $('#audio');
const SPEEDS = [1, 1.25, 1.5, 2];
const fmt = (s) => (Number.isFinite(s) ? Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0') : '--:--');

function jump(sec) {
  if (!Number.isFinite(audio.duration)) return;
  audio.currentTime = Math.min(Math.max(audio.currentTime + sec, 0), audio.duration);
}
function show() {
  $('#seek').value = audio.currentTime;
  $('#cur').textContent = fmt(audio.currentTime);
  $('#left').textContent = '-' + fmt(audio.duration - audio.currentTime);
  $('#seek').setAttribute('aria-valuetext', fmt(audio.currentTime) + ' من ' + fmt(audio.duration));
}
audio.addEventListener('loadedmetadata', () => { $('#seek').max = Math.floor(audio.duration); show(); });
for (const ev of ['timeupdate', 'seeked']) audio.addEventListener(ev, show);
audio.addEventListener('play', () => { $('#play').textContent = '❚❚'; $('#play').setAttribute('aria-label', 'وقّف'); });
audio.addEventListener('pause', () => { $('#play').textContent = '▶'; $('#play').setAttribute('aria-label', 'شغّل'); });
audio.addEventListener('ratechange', () => {
  $('#speed').textContent = audio.playbackRate + '×';
  $('#speed').setAttribute('aria-label', 'السرعة ' + audio.playbackRate + '×');
});

$('#play').addEventListener('click', () => (audio.paused ? audio.play().catch(() => {}) : audio.pause()));
$('#back').addEventListener('click', () => jump(-15));
$('#fwd').addEventListener('click', () => jump(30));
$('#speed').addEventListener('click', () => {
  const i = SPEEDS.indexOf(audio.playbackRate);
  audio.playbackRate = SPEEDS[(i + 1) % SPEEDS.length];       // بعد 2 بيرجع 1
});
$('#seek').addEventListener('input', () => (audio.currentTime = Number($('#seek').value)));

// كيبورد على المشغّل: k للتشغيل، والأسهم ١٥ و ٣٠ زي الأزرار
$('#ep').addEventListener('keydown', (e) => {
  const k = e.key.toLowerCase();
  if (k === 'k') $('#play').click();
  else if (k === 'arrowleft') jump(-15);
  else if (k === 'arrowright') jump(30);
  else return;
  e.preventDefault();
});
</script>
</body>
</html>
~~~

**هتشوف إيه:** كارت أبيض فيه اسم الحلقة، وشريط برتقاني، و [[0:00]] على الشمال و [[-1:30]] على اليمين، وتحتهم ٤ أزرار مدورة: ↺15، والتشغيل البرتقاني الكبير، و 30↻، والسرعة. (الـ preview بيعمل حلقة تجربة ٩٠ ثانية فيها صفارة كل ثانية، لأنه مفيهوش ملفات. ملفك فيه [[episode.wav]] أو MP3.)

## الكود

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>حلقة ١٢: الـ Promises</title>
<style>
  body { font-family: system-ui, sans-serif; margin: 16px; background: #fafaf9; color: #1c1917; }
  .ep { max-width: 520px; background: #fff; border: 1px solid #e7e5e4; border-radius: 14px; padding: 14px; }
  .ep h1 { font-size: 1.1rem; margin: 0 0 10px; }
  .bar { display: flex; align-items: center; gap: 8px; direction: ltr; }
  .bar button { font: inherit; min-width: 48px; min-height: 48px; border: 0; border-radius: 50%; background: #f5f5f4; cursor: pointer; }
  .bar #play { background: #ea580c; color: #fff; min-width: 56px; min-height: 56px; font-size: 1.2rem; }
  .bar #speed { border-radius: 24px; padding: 0 12px; font-variant-numeric: tabular-nums; }
  .bar button:focus-visible { outline: 3px solid #1d4ed8; outline-offset: 2px; }
  .times { display: flex; justify-content: space-between; direction: ltr; font-variant-numeric: tabular-nums; color: #57534e; margin-top: 8px; }
  #seek { width: 100%; accent-color: #ea580c; margin-top: 10px; }
</style>
</head>
<body>
<section class="ep" id="ep" aria-label="مشغّل الحلقة">
  <h1>حلقة ١٢: الـ Promises من غير صداع</h1>
  <audio id="audio" src="episode.wav" preload="metadata"></audio>
  <input id="seek" type="range" min="0" max="0" step="1" value="0" aria-label="مكان التشغيل">
  <div class="times"><span id="cur">0:00</span><span id="left">-0:00</span></div>
  <div class="bar">
    <button id="back" type="button" aria-label="ارجع ١٥ ثانية">↺15</button>
    <button id="play" type="button" aria-label="شغّل">▶</button>
    <button id="fwd" type="button" aria-label="قدّم ٣٠ ثانية">30↻</button>
    <button id="speed" type="button" aria-label="السرعة 1×">1×</button>
  </div>
</section>
<script>
const $ = (s) => document.querySelector(s);
const audio = $('#audio');
const SPEEDS = [1, 1.25, 1.5, 2];
const fmt = (s) => (Number.isFinite(s) ? Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0') : '--:--');

function jump(sec) {
  if (!Number.isFinite(audio.duration)) return;
  audio.currentTime = Math.min(Math.max(audio.currentTime + sec, 0), audio.duration);
}
function show() {
  $('#seek').value = audio.currentTime;
  $('#cur').textContent = fmt(audio.currentTime);
  $('#left').textContent = '-' + fmt(audio.duration - audio.currentTime);
  $('#seek').setAttribute('aria-valuetext', fmt(audio.currentTime) + ' من ' + fmt(audio.duration));
}
audio.addEventListener('loadedmetadata', () => { $('#seek').max = Math.floor(audio.duration); show(); });
for (const ev of ['timeupdate', 'seeked']) audio.addEventListener(ev, show);
audio.addEventListener('play', () => { $('#play').textContent = '❚❚'; $('#play').setAttribute('aria-label', 'وقّف'); });
audio.addEventListener('pause', () => { $('#play').textContent = '▶'; $('#play').setAttribute('aria-label', 'شغّل'); });
audio.addEventListener('ratechange', () => {
  $('#speed').textContent = audio.playbackRate + '×';
  $('#speed').setAttribute('aria-label', 'السرعة ' + audio.playbackRate + '×');
});

$('#play').addEventListener('click', () => (audio.paused ? audio.play().catch(() => {}) : audio.pause()));
$('#back').addEventListener('click', () => jump(-15));
$('#fwd').addEventListener('click', () => jump(30));
$('#speed').addEventListener('click', () => {
  const i = SPEEDS.indexOf(audio.playbackRate);
  audio.playbackRate = SPEEDS[(i + 1) % SPEEDS.length];       // بعد 2 بيرجع 1
});
$('#seek').addEventListener('input', () => (audio.currentTime = Number($('#seek').value)));

// كيبورد على المشغّل: k للتشغيل، والأسهم ١٥ و ٣٠ زي الأزرار
$('#ep').addEventListener('keydown', (e) => {
  const k = e.key.toLowerCase();
  if (k === 'k') $('#play').click();
  else if (k === 'arrowleft') jump(-15);
  else if (k === 'arrowright') jump(30);
  else return;
  e.preventDefault();
});
</script>
</body>
</html>
~~~

حط جنبه أي ملف صوت باسم [[episode.wav]] (أو غيّر الـ [[src]] لـ MP3 عندك). الـ lab عمل [[episode.wav]] ٩٠ ثانية بـ Node.

## الشرح

- **[[jump(sec)]]**: clamp بين 0 والمدة، ومبتعملش حاجة لو المدة لسه [[NaN]].
- **السرعة:** [[SPEEDS.indexOf(audio.playbackRate)]] وبعدين [[(i + 1) % SPEEDS.length]]: الـ [[%]] (باقي القسمة) بيرجّع للأول بعد الآخر. والزرار بيتغيّر من [[ratechange]]، مش من الضغطة.
- **[[seek.max = Math.floor(duration)]] و [[step="1"]]**: البودكاست بالثواني كفاية، والسهم على الشريط (لو عليه الـ focus) بيمشي ثانية.
- **الوقت الباقي** [[duration - currentTime]] بالسالب زي Spotify و Apple Podcasts.
- **[[aria-valuetext]]** على الشريط، و [[aria-label]] على كل زرار لأن «↺15» مش كلام.
- **الكيبورد على [[#ep]]**: لما الـ focus جوه المشغّل بس.

## غلطات وقعت فيها وأنا ببنيها

- في الاختبار الأول السرعة كانت بتبان «متأخرة ضغطة»: بعد ٣ ضغطات مكتوب [[1.5×]]. اتضح إن الكود صح، والاختبار كان بيقرا الزرار قبل ما [[ratechange]] يتبعت (الحدث async). استنيت ١٠٠ ms بعد كل ضغطة والأرقام بقت مظبوطة. الدرس: الواجهة اللي بتتحدث من الأحداث بتتأخر لحظة عن الضغطة، واختبارك لازم يستنى.
- أول ملف تجربة كان ٣ ثواني، و «30↻» من أول ضغطة بيوصل للآخر، فمكنتش شايف حاجة. عملت ملف ٩٠ ثانية.

## اتقاس

~~~text الناتج (Chrome 157، Playwright، episode.wav مدته 1:30)
البداية:        0:00   -1:30
30↻:            0:30   -1:00
↺15:            0:15   -1:15
↺15 مرتين:      0:00   -1:30
السرعة:         1.25× ثم 2× (بعد ٣) ثم 1× (بعد ٤)
k:              aria-label = وقّف
→:              0:30   -0:59   aria-valuetext = 0:30 من 1:30
الـ preview:    0:30 بعد 30↻، والتشغيل اشتغل
~~~` },
        { lvl: 'متوسط', dir: "podcast-resume", t: R`بودكاست بيفتكر انت وقفت فين`, what: R`صفحة برنامج بودكاست فيها ٣ حلقات. كل حلقة في اللستة مكتوب جنبها «لسه متسمعتش» أو «وقفت عند 0:12 من 0:30» وشريط صغير، أو ✓ لو خلصت. المكان بيتحفظ في [[localStorage]] كل ٥ ثواني تشغيل وعند الإيقاف وقبل ما الصفحة تتقفل ([[pagehide]]). لما تفتح حلقة ليها مكان محفوظ يظهر «كمّل من 0:12» و «من الأول». ولما حلقة تخلص تتعلّم ✓ واللي بعدها تشتغل. ولو التخزين مقفول، الصفحة تشتغل من الذاكرة وتقول كده. من دروس «HTMLMediaElement» و «Web Storage».`, done: R`شغّل حلقة ١ واقف عند 0:12 و reload: «كمّل من 0:12»، والضغط عليه بيكمّل من 12. خلّي حلقة ١ تخلص: بتتعلّم ✓ وحلقة ٢ بتشتغل لوحدها من 0:00، والتخزين فيه [[{"ep1":{"t":30,"d":30,"done":true}}]]. وجوه الـ preview الرسالة الصفرا ظاهرة والتشغيل شغال.`, sol: R`## الشكل النهائي

~~~view 420
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>بودكاست كود بالعربي</title>
<style>
  body { font-family: system-ui, sans-serif; margin: 16px; background: #f5f3ff; color: #1e1b4b; }
  main { max-width: 560px; }
  .note { background: #fef9c3; padding: 8px; border-radius: 8px; }
  ol { list-style: none; padding: 0; display: grid; gap: 8px; }
  li button { width: 100%; text-align: start; font: inherit; padding: 10px; border: 1px solid #c4b5fd; border-radius: 10px; background: #fff; cursor: pointer; display: grid; gap: 4px; }
  li button[aria-current="true"] { border-color: #6d28d9; box-shadow: 0 0 0 2px #6d28d9; }
  .meta { font-size: 0.85rem; color: #4c1d95; }
  .done .meta::after { content: ' ✓ خلصت'; color: #15803d; }
  .bar { height: 4px; background: #ede9fe; border-radius: 2px; overflow: hidden; }
  .bar span { display: block; height: 100%; background: #7c3aed; width: 0; }
  #resume { margin: 8px 0; }
  #resume button { font: inherit; min-height: 40px; }
  audio { width: 100%; }
</style>
</head>
<body>
<main>
  <h1>بودكاست كود بالعربي</h1>
  <p class="note" id="note" hidden>التخزين مقفول هنا، فالمكان هيتنسي مع الـ reload. التشغيل شغال عادي.</p>
  <audio id="audio" controls preload="metadata"></audio>
  <p id="resume" hidden><button id="resumeBtn" type="button"></button> <button id="fromStart" type="button">من الأول</button></p>
  <ol id="list"></ol>
</main>
<script>
// الـ preview مفيهوش ملفات صوت: WAV بيتعمل في الذاكرة (صفارة كل ثانية)
function demoWav(seconds, freq) {
  const rate = 8000, n = seconds * rate, buf = new ArrayBuffer(44 + n * 2), v = new DataView(buf);
  const str = (o, s) => [...s].forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)));
  str(0, 'RIFF'); v.setUint32(4, 36 + n * 2, true); str(8, 'WAVE'); str(12, 'fmt ');
  v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
  v.setUint32(24, rate, true); v.setUint32(28, rate * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true);
  str(36, 'data'); v.setUint32(40, n * 2, true);
  for (let i = 0; i < n; i++) v.setInt16(44 + i * 2, (i / rate) % 1 < 0.15 ? Math.sin(2 * Math.PI * freq * i / rate) * 6000 : 0, true);
  return URL.createObjectURL(new Blob([buf], { type: 'audio/wav' }));
}

const EPISODES = [
  { id: 'ep1', title: 'حلقة ١: يعني إيه برنامج', src: demoWav(30, 523) },
  { id: 'ep2', title: 'حلقة ٢: الـ Promises من غير صداع', src: demoWav(45, 659) },
  { id: 'ep3', title: 'حلقة ٣: الـ event loop', src: demoWav(20, 784) },
];
const $ = (s) => document.querySelector(s);
const audio = $('#audio');
const fmt = (s) => Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');

// ١. التخزين: localStorage ممكن يرمي (sandbox أو إعدادات المتصفح)، فبديل في الذاكرة
function safeStorage() {
  try { localStorage.setItem('_t', '1'); localStorage.removeItem('_t'); return localStorage; }
  catch { $('#note').hidden = false; const m = new Map(); return { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, String(v)) }; }
}
const store = safeStorage();
const KEY = 'podcast-progress';
// { ep1: { t: 83.2, d: 1800, done: false }, ... }
function load() { try { return JSON.parse(store.getItem(KEY)) || {}; } catch { return {}; } }
let progress = load();
function save() { store.setItem(KEY, JSON.stringify(progress)); }

// ٢. اللستة: كل حلقة زرار، وفيه المكان اللي وقفت فيه وشريط صغير
function render() {
  $('#list').replaceChildren(...EPISODES.map((ep) => {
    const p = progress[ep.id] || {};
    const li = document.createElement('li');
    li.className = p.done ? 'done' : '';
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-current', String(current?.id === ep.id));
    const pct = p.d ? Math.min(100, (p.t / p.d) * 100) : 0;
    b.innerHTML = '<span></span><span class="meta"></span><span class="bar"><span></span></span>';
    b.children[0].textContent = ep.title;
    b.children[1].textContent = p.d ? (p.done ? fmt(p.d) : 'وقفت عند ' + fmt(p.t) + ' من ' + fmt(p.d)) : 'لسه متسمعتش';
    b.children[2].firstChild.style.width = (p.done ? 100 : pct) + '%';
    b.addEventListener('click', () => open(ep, true));
    li.append(b);
    return li;
  }));
}

// ٣. فتح حلقة: لو فيه مكان محفوظ، نعرض «كمّل من …»
let current = null, lastSave = 0;
function open(ep, autoplay) {
  current = ep;
  audio.src = ep.src;
  const p = progress[ep.id];
  const resumeAt = p && !p.done && p.t > 5 ? p.t : 0;
  lastSave = resumeAt;                        // العدّ لـ ٥ ثواني يبدأ من مكان الحلقة دي
  $('#resume').hidden = !resumeAt;
  if (resumeAt) $('#resumeBtn').textContent = 'كمّل من ' + fmt(resumeAt);
  audio.addEventListener('loadedmetadata', () => {
    if (resumeAt) audio.currentTime = resumeAt;
    if (autoplay) audio.play().catch(() => {});
  }, { once: true });
  render();
}
$('#resumeBtn').addEventListener('click', () => { $('#resume').hidden = true; audio.play().catch(() => {}); });
$('#fromStart').addEventListener('click', () => { audio.currentTime = 0; $('#resume').hidden = true; audio.play().catch(() => {}); });

// ٤. الحفظ: كل ٥ ثواني تشغيل، وعند الإيقاف، وقبل ما الصفحة تتقفل
function remember(force) {
  if (!current || !Number.isFinite(audio.duration)) return;
  if (!force && Math.abs(audio.currentTime - lastSave) < 5) return;
  lastSave = audio.currentTime;
  progress[current.id] = { t: audio.currentTime, d: audio.duration, done: audio.ended || audio.duration - audio.currentTime < 2 };
  save(); render();
}
audio.addEventListener('timeupdate', () => remember(false));
audio.addEventListener('pause', () => remember(true));
addEventListener('pagehide', () => remember(true));

// ٥. خلصت: علّم عليها وشغّل اللي بعدها
audio.addEventListener('ended', () => {
  remember(true);
  const next = EPISODES[EPISODES.indexOf(current) + 1];
  if (next) open(next, true);
});

open(EPISODES.find((ep) => !(progress[ep.id] || {}).done) || EPISODES[0], false);
</script>
</body>
</html>
~~~

**هتشوف إيه:** رسالة صفرا (الـ preview مفيهوش تخزين، اتشرحت تحت)، ومشغّل الصوت بتاع المتصفح، و ٣ كروت بنفسجي فاتح. دوس على حلقة ٢: الكارت بيتحدد بإطار والتشغيل بيبدأ، ولما توقف الكارت بيكتب «وقفت عند…» والشريط البنفسجي بيتملا. (حلقات التجربة صفارات اتعملت في الصفحة، وملفاتك [[ep1.wav]] وغيرها.)

## الكود

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>بودكاست كود بالعربي</title>
<style>
  body { font-family: system-ui, sans-serif; margin: 16px; background: #f5f3ff; color: #1e1b4b; }
  main { max-width: 560px; }
  .note { background: #fef9c3; padding: 8px; border-radius: 8px; }
  ol { list-style: none; padding: 0; display: grid; gap: 8px; }
  li button { width: 100%; text-align: start; font: inherit; padding: 10px; border: 1px solid #c4b5fd; border-radius: 10px; background: #fff; cursor: pointer; display: grid; gap: 4px; }
  li button[aria-current="true"] { border-color: #6d28d9; box-shadow: 0 0 0 2px #6d28d9; }
  .meta { font-size: 0.85rem; color: #4c1d95; }
  .done .meta::after { content: ' ✓ خلصت'; color: #15803d; }
  .bar { height: 4px; background: #ede9fe; border-radius: 2px; overflow: hidden; }
  .bar span { display: block; height: 100%; background: #7c3aed; width: 0; }
  #resume { margin: 8px 0; }
  #resume button { font: inherit; min-height: 40px; }
  audio { width: 100%; }
</style>
</head>
<body>
<main>
  <h1>بودكاست كود بالعربي</h1>
  <p class="note" id="note" hidden>التخزين مقفول هنا، فالمكان هيتنسي مع الـ reload. التشغيل شغال عادي.</p>
  <audio id="audio" controls preload="metadata"></audio>
  <p id="resume" hidden><button id="resumeBtn" type="button"></button> <button id="fromStart" type="button">من الأول</button></p>
  <ol id="list"></ol>
</main>
<script>
const EPISODES = [
  { id: 'ep1', title: 'حلقة ١: يعني إيه برنامج', src: 'ep1.wav' },
  { id: 'ep2', title: 'حلقة ٢: الـ Promises من غير صداع', src: 'ep2.wav' },
  { id: 'ep3', title: 'حلقة ٣: الـ event loop', src: 'ep3.wav' },
];
const $ = (s) => document.querySelector(s);
const audio = $('#audio');
const fmt = (s) => Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');

// ١. التخزين: localStorage ممكن يرمي (sandbox أو إعدادات المتصفح)، فبديل في الذاكرة
function safeStorage() {
  try { localStorage.setItem('_t', '1'); localStorage.removeItem('_t'); return localStorage; }
  catch { $('#note').hidden = false; const m = new Map(); return { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, String(v)) }; }
}
const store = safeStorage();
const KEY = 'podcast-progress';
// { ep1: { t: 83.2, d: 1800, done: false }, ... }
function load() { try { return JSON.parse(store.getItem(KEY)) || {}; } catch { return {}; } }
let progress = load();
function save() { store.setItem(KEY, JSON.stringify(progress)); }

// ٢. اللستة: كل حلقة زرار، وفيه المكان اللي وقفت فيه وشريط صغير
function render() {
  $('#list').replaceChildren(...EPISODES.map((ep) => {
    const p = progress[ep.id] || {};
    const li = document.createElement('li');
    li.className = p.done ? 'done' : '';
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-current', String(current?.id === ep.id));
    const pct = p.d ? Math.min(100, (p.t / p.d) * 100) : 0;
    b.innerHTML = '<span></span><span class="meta"></span><span class="bar"><span></span></span>';
    b.children[0].textContent = ep.title;
    b.children[1].textContent = p.d ? (p.done ? fmt(p.d) : 'وقفت عند ' + fmt(p.t) + ' من ' + fmt(p.d)) : 'لسه متسمعتش';
    b.children[2].firstChild.style.width = (p.done ? 100 : pct) + '%';
    b.addEventListener('click', () => open(ep, true));
    li.append(b);
    return li;
  }));
}

// ٣. فتح حلقة: لو فيه مكان محفوظ، نعرض «كمّل من …»
let current = null, lastSave = 0;
function open(ep, autoplay) {
  current = ep;
  audio.src = ep.src;
  const p = progress[ep.id];
  const resumeAt = p && !p.done && p.t > 5 ? p.t : 0;
  lastSave = resumeAt;                        // العدّ لـ ٥ ثواني يبدأ من مكان الحلقة دي
  $('#resume').hidden = !resumeAt;
  if (resumeAt) $('#resumeBtn').textContent = 'كمّل من ' + fmt(resumeAt);
  audio.addEventListener('loadedmetadata', () => {
    if (resumeAt) audio.currentTime = resumeAt;
    if (autoplay) audio.play().catch(() => {});
  }, { once: true });
  render();
}
$('#resumeBtn').addEventListener('click', () => { $('#resume').hidden = true; audio.play().catch(() => {}); });
$('#fromStart').addEventListener('click', () => { audio.currentTime = 0; $('#resume').hidden = true; audio.play().catch(() => {}); });

// ٤. الحفظ: كل ٥ ثواني تشغيل، وعند الإيقاف، وقبل ما الصفحة تتقفل
function remember(force) {
  if (!current || !Number.isFinite(audio.duration)) return;
  if (!force && Math.abs(audio.currentTime - lastSave) < 5) return;
  lastSave = audio.currentTime;
  progress[current.id] = { t: audio.currentTime, d: audio.duration, done: audio.ended || audio.duration - audio.currentTime < 2 };
  save(); render();
}
audio.addEventListener('timeupdate', () => remember(false));
audio.addEventListener('pause', () => remember(true));
addEventListener('pagehide', () => remember(true));

// ٥. خلصت: علّم عليها وشغّل اللي بعدها
audio.addEventListener('ended', () => {
  remember(true);
  const next = EPISODES[EPISODES.indexOf(current) + 1];
  if (next) open(next, true);
});

open(EPISODES.find((ep) => !(progress[ep.id] || {}).done) || EPISODES[0], false);
</script>
</body>
</html>
~~~

وجنبه [[ep1.wav]] و [[ep2.wav]] و [[ep3.wav]] (أو MP3 وغيّر [[src]] في [[EPISODES]]).

## الشرح

- **[[safeStorage()]]:** بيجرّب يكتب ويمسح. لو رمى (sandbox، أو اليوزر قافل الـ site data) بيرجّع نفس الواجهة على [[Map]]، ويظهر الرسالة. باقي الكود مبيعرفش الفرق. نفس النمط من مشروع «صفحة إعدادات بتفتكر في ٣ أماكن».
- **شكل البيانات:** [[{ ep1: { t, d, done } }]] في مفتاح واحد JSON، و [[load()]] جواها [[try]] عشان JSON بايظ ميوقعش الصفحة.
- **[[remember(force)]]:** من [[timeupdate]] كل ٥ ثواني بس (مش ٤ مرات في الثانية)، ومن [[pause]] و [[pagehide]] على طول. و [[done]] لو باقي أقل من ثانيتين، عشان اللي قفل قبل النهاية بشوية يتحسبله.
- **[[open(ep, autoplay)]]:** بيحط الـ [[src]]، ولو فيه مكان أكبر من ٥ ثواني ومش خلصان بيظهر «كمّل من». والـ [[currentTime]] بيتظبط في [[loadedmetadata]] (قبله مينفعش). و [[{ once: true }]] عشان الـ listener ميتكررش مع كل حلقة.
- **[[ended]]:** يحفظ ✓ ويفتح [[EPISODES[i + 1] ]] بـ autoplay. ده مسموح لأن اليوزر داس قبل كده في الصفحة.
- **أول ما الصفحة تفتح:** بتفتح أول حلقة مش خلصانة، من غير تشغيل.
- **[[aria-current]]** على الحلقة الحالية، والـ [[render()]] بيرسم اللستة كلها من [[progress]] (مصدر واحد).

## غلطات وقعت فيها وأنا ببنيها

- **حلقة ٢ اتحفظت عند 0:00 أول ما بدأت:** [[lastSave]] كان لسه 29 من حلقة ١، فأول [[timeupdate]] في حلقة ٢ لقى فرق أكبر من ٥ وحفظ 0.22، واللستة كتبت «وقفت عند 0:00». التصليح: [[lastSave = resumeAt]] جوه [[open()]]، فالعد يبدأ من مكان الحلقة الجديدة.
- **جوه الـ preview الحلقة مكانتش بتشتغل:** [[src: 'ep2.wav']] ملف مش موجود هناك (الـ preview مالوش فولدر). نسخة الشكل النهائي فوق بتعمل الحلقات في الذاكرة.

## اتقاس

~~~text الناتج (Chrome 157، Playwright من سيرفر محلي)
أول مرة:            لسه متسمعتش / لسه متسمعتش / لسه متسمعتش   stored=null
12 ثانية وإيقاف:     وقفت عند 0:12 من 0:30                      stored={"ep1":{"t":12.36,"d":30,"done":false}}
بعد reload:          resume = «كمّل من 0:12»
كمّل:                t=12.8 paused=false
ep1 خلصت:            src=ep2.wav t=1.4 paused=false
                     اللستة: 0:30 ✓ خلصت / لسه متسمعتش / لسه متسمعتش
                     stored={"ep1":{"t":30,"d":30,"done":true}}
الـ preview:         التخزين مقفول هنا… | حلقة ٢ اشتغلت (duration 45) | «وقفت عند 0:20 من 0:45»
~~~` },
        { lvl: 'متوسط', dir: "voice-notes", t: R`مسجّل ملاحظات صوتية بيحفظ في المتصفح`, what: R`زرار «● سجّل» بيبدأ تسجيل من الميكروفون بعداد، ونفس الزرار «■ وقّف»، والتسجيل بيقف لوحده عند دقيقة. كل ملاحظة في لستة: اسم تقدر تعدّله، ومشغّل، والمدة والحجم والتاريخ، و «نزّل» و «امسح». الملاحظات بتتحفظ في **IndexedDB** (الـ Blob نفسه) فبترجع بعد الـ reload، ولو IndexedDB مقفول بتتحفظ في الذاكرة. ولو الميكروفون مش متاح يظهر زرار «جرّب بصوت تجربة» بيسجّل نغمات من Web Audio. من دروس «getUserMedia» و «MediaRecorder» و «تختار تخزين إيه».`, done: R`تسجيل ٢.٥ ثانية = ملاحظة [[0:02 · 31 KB]]، وتاني ١.٥ ثانية فوقيها. تغيير اسم الأولى لـ «فكرة المشروع» و reload = الاسم والملاحظتين لسه موجودين ومدة التسجيل 1.44. «امسح» بيشيلها. وجوه الـ preview: رسالة الميكروفون بالسبب، و«جرّب بصوت تجربة» بيضيف ملاحظة.`, sol: R`## الشكل النهائي

~~~live 380 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ملاحظات صوتية</title>
<style>
  body { font-family: system-ui, sans-serif; margin: 16px; background: #f0fdf4; color: #052e16; }
  main { max-width: 560px; }
  .rec { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
  button { font: inherit; min-height: 44px; padding: 0 14px; border-radius: 8px; border: 1px solid #86efac; background: #fff; cursor: pointer; }
  #rec { background: #dc2626; color: #fff; border: 0; }
  #rec[aria-pressed="true"] { background: #7f1d1d; }
  #clock { font-variant-numeric: tabular-nums; font-size: 1.3rem; min-width: 4ch; }
  #msg { min-height: 1.5em; }
  #msg.bad { color: #b91c1c; }
  ul { list-style: none; padding: 0; display: grid; gap: 10px; }
  li { background: #fff; border: 1px solid #bbf7d0; border-radius: 10px; padding: 10px; display: grid; gap: 6px; }
  li input { font: inherit; padding: 6px; border: 1px solid #d1d5db; border-radius: 6px; }
  li audio { width: 100%; }
  .row { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
  .meta { color: #166534; font-size: 0.85rem; }
</style>
</head>
<body>
<main>
  <h1>ملاحظات صوتية</h1>
  <div class="rec">
    <button id="rec" type="button" aria-pressed="false">● سجّل</button>
    <span id="clock">0:00</span>
    <button id="demo" type="button" hidden>جرّب بصوت تجربة</button>
  </div>
  <p id="msg" role="status"></p>
  <ul id="list"></ul>
</main>
<script type="module">
const $ = (s) => document.querySelector(s);
const MAX = 60;
const fmt = (s) => Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
const say = (t, bad = false) => { $('#msg').textContent = t; $('#msg').className = bad ? 'bad' : ''; };

// ١. التخزين: IndexedDB بيشيل الـ Blob نفسه. ولو مقفول (sandbox أو private)، الذاكرة
const db = await new Promise((resolve) => {
  try {
    const req = indexedDB.open('voice-notes', 1);
    req.onupgradeneeded = () => req.result.createObjectStore('notes', { keyPath: 'id' });
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => resolve(null);
  } catch { resolve(null); }
});
const memory = new Map();
const tx = (mode) => db.transaction('notes', mode).objectStore('notes');
const store = {
  all: () => db ? new Promise((r) => { const q = tx('readonly').getAll(); q.onsuccess = () => r(q.result); }) : Promise.resolve([...memory.values()]),
  put: (n) => db ? new Promise((r) => { tx('readwrite').put(n).onsuccess = r; }) : Promise.resolve(memory.set(n.id, n)),
  del: (id) => db ? new Promise((r) => { tx('readwrite').delete(id).onsuccess = r; }) : Promise.resolve(memory.delete(id)),
};
if (!db) say('التخزين مقفول هنا: الملاحظات هتتمسح مع الـ reload.');

// ٢. اللستة
const urls = new Map();                                   // id => عنوان blob: عشان نعمله revoke
async function render() {
  const notes = (await store.all()).sort((a, b) => b.created - a.created);
  for (const [id, url] of urls) if (!notes.some((n) => n.id === id)) { URL.revokeObjectURL(url); urls.delete(id); }
  $('#list').replaceChildren(...notes.map((n) => {
    if (!urls.has(n.id)) urls.set(n.id, URL.createObjectURL(n.blob));
    const li = document.createElement('li');
    const name = Object.assign(document.createElement('input'), { value: n.name });
    name.setAttribute('aria-label', 'اسم الملاحظة');
    name.addEventListener('change', () => store.put({ ...n, name: name.value.trim() || n.name }));
    const audio = Object.assign(document.createElement('audio'), { controls: true, src: urls.get(n.id), preload: 'metadata' });
    const ext = n.blob.type.includes('mp4') ? 'm4a' : n.blob.type.includes('ogg') ? 'ogg' : 'webm';
    const dl = Object.assign(document.createElement('a'), { href: urls.get(n.id), download: 'voice-note-' + n.id + '.' + ext, textContent: 'نزّل' });
    const del = Object.assign(document.createElement('button'), { type: 'button', textContent: 'امسح' });
    del.addEventListener('click', async () => { await store.del(n.id); render(); say('اتمسحت: ' + n.name); });
    const meta = Object.assign(document.createElement('span'), { className: 'meta', textContent: fmt(n.seconds) + ' · ' + Math.round(n.blob.size / 1024) + ' KB · ' + new Date(n.created).toLocaleString('ar-EG') });
    const row = document.createElement('div');
    row.className = 'row';
    row.append(meta, dl, del);
    li.append(name, audio, row);
    return li;
  }));
}

// ٣. التسجيل: من الميكروفون، أو من صوت تجربة لو الميكروفون مش متاح
let rec = null, stopSource = null, timer = null;
const pickType = () => ['audio/webm;codecs=opus', 'audio/mp4', 'audio/ogg;codecs=opus'].find((t) => MediaRecorder.isTypeSupported(t)) || '';
async function micSource() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return { stream, stop: () => stream.getTracks().forEach((t) => t.stop()) };
}
function demoSource() {
  const ctx = new AudioContext(), out = ctx.createMediaStreamDestination(), osc = ctx.createOscillator(), g = ctx.createGain();
  g.gain.value = 0.2;
  osc.connect(g).connect(out);
  for (let i = 0; i < 240; i++) osc.frequency.setValueAtTime([392, 440, 494, 523][i % 4], ctx.currentTime + i * 0.25);
  osc.start();
  return { stream: out.stream, stop: () => { osc.stop(); ctx.close(); } };
}
async function start(getSource) {
  let src;
  try { src = await getSource(); }
  catch (e) {
    say('الميكروفون مش متاح: ' + e.name + (e.message ? ' (' + e.message + ')' : '') + '. جرّب بصوت تجربة.', true);
    $('#demo').hidden = false;
    return;
  }
  stopSource = src.stop;
  const mimeType = pickType();
  rec = new MediaRecorder(src.stream, mimeType ? { mimeType } : {});
  const chunks = [];
  const began = performance.now();
  rec.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };
  rec.onstop = async () => {
    clearInterval(timer);
    stopSource();
    const seconds = (performance.now() - began) / 1000;
    const id = Date.now();
    await store.put({ id, name: 'ملاحظة ' + new Date(id).toLocaleTimeString('ar-EG'), seconds, created: id, blob: new Blob(chunks, { type: rec.mimeType }) });
    $('#rec').textContent = '● سجّل';
    $('#rec').setAttribute('aria-pressed', 'false');
    $('#clock').textContent = '0:00';
    say('اتحفظت: ' + fmt(seconds) + (seconds >= MAX ? ' (وقفت لوحدها عند الحد)' : ''));
    rec = null;
    render();
  };
  rec.start();
  timer = setInterval(() => {
    const s = (performance.now() - began) / 1000;
    $('#clock').textContent = fmt(s);
    if (s >= MAX && rec.state === 'recording') rec.stop();
  }, 250);
  $('#rec').textContent = '■ وقّف';
  $('#rec').setAttribute('aria-pressed', 'true');
  say('بيسجّل…');
}
$('#rec').addEventListener('click', () => (rec ? rec.stop() : start(micSource)));
$('#demo').addEventListener('click', () => { if (!rec) start(demoSource); });
render();
</script>
</body>
</html>
~~~

**هتشوف إيه:** زرار أحمر «● سجّل» وعداد [[0:00]]. جوه الـ preview: سطر «التخزين مقفول هنا»، ولما تدوس سجّل هيقولك «الميكروفون مش متاح: SecurityError…» ويظهر «جرّب بصوت تجربة». دوسه، استنى ثانيتين، ودوس «■ وقّف»: كارت أخضر فاتح فيه الاسم والمشغّل والمدة. من [[localhost]] الميكروفون بيشتغل والملاحظات بتفضل بعد الـ reload.

## الشرح

- **[[<script type="module">]]** عشان [[await]] في أول السكربت (top-level await) لفتح الـ IndexedDB قبل أي حاجة.
- **IndexedDB بيشيل [[Blob]] زي ما هو**، مش base64. ده سبب اختياره هنا بدل [[localStorage]] (نص بس وحوالي 5 MB). الـ [[store]] واجهة صغيرة ([[all]] و [[put]] و [[del]]) على IndexedDB أو على [[Map]]، فباقي الكود واحد.
- **[[urls]] Map:** كل ملاحظة ليها عنوان [[blob:]] واحد بيتعمل مرة، ولما الملاحظة تتمسح العنوان بيتعمله revoke. من غيرها كل [[render()]] كان هيعمل عناوين جديدة ويسيب القديمة في الذاكرة.
- **[[micSource]] و [[demoSource]]** بيرجّعوا نفس الشكل [[{ stream, stop }]]، فـ [[start(getSource)]] مبتعرفش جاي منين. الـ demo: oscillator بيتنقل بين ٤ نغمات كل ربع ثانية على [[createMediaStreamDestination()]].
- **الحد:** الـ interval كل ٢٥٠ ms بيحدّث العداد ويوقف عند [[MAX]]، و [[rec.state === 'recording']] عشان [[stop()]] ميتنادهش مرتين.
- **الاسم:** [[change]] (مش [[input]]) بيحفظ لما تسيب الخانة أو تدوس Enter، و [[...n]] بيعمل نسخة من الملاحظة بالاسم الجديد.
- **الامتداد** من نوع الـ Blob: [[m4a]] لـ MP4 (Safari) و [[webm]] لـ Chrome.

## غلطات وقعت فيها وأنا ببنيها

- **[[setAttribute('aria-label', …)]]** على خانة الاسم بدل ما أحطها جوه [[Object.assign]]: كده الـ attribute بيتكتب في الـ HTML نفسه وبيبان في DevTools وقارئ الشاشة بيقراه. (قرار، مش باج اتقاس.)
- **الـ preview مكانش بيعرض حاجة غير الخطأ:** من غير مصدر تجربة، الصفحة جوه الـ preview عبارة عن رسالة حمرا. زرار «جرّب بصوت تجربة» خلّى الشكل يبان، وكمان مفيد لأي يوزر عنده مشكلة في المايك ويجرّب الصفحة.

## اتقاس

~~~text الناتج (Chrome 157 بمايك وهمي، Playwright من سيرفر محلي)
أول مرة:         (اللستة فاضية)
بعد تسجيل:       اتحفظت | ملاحظة ٥:١٣ [0:02 · 31 KB]
بعد تاني:        اتحفظت | ملاحظة ٥:١٣ [0:01 · 16 KB] / ملاحظة ٥:١٣ [0:02 · 31 KB]
بعد reload:      فكرة المشروع [0:01 · 16 KB] / ملاحظة ٥:١٣ [0:02 · 31 KB]
duration أول تسجيل في اللستة: 1.44
بعد امسح:        اتمسحت: فكرة المشروع | ملاحظة ٥:١٣ [0:02 · 31 KB]
الـ preview:     التخزين مقفول هنا… | الميكروفون مش متاح: SecurityError (Invalid security origin). جرّب بصوت تجربة.
                 جرّب بصوت تجربة ثم وقّف: اتحفظت: 0:02 | ملاحظات في اللستة = 1
~~~

- المدة [[1.44]] رقم حقيقي مش [[Infinity]]، لأن [[start()]] من غير timeslice (درس MediaRecorder قسم ٣).` },
        { lvl: 'كبير', dir: "lesson-player", t: R`مشغّل دروس بفصول وترجمة واختصارات وبيفتكر مكانك`, what: R`مشغّل فيديو لمنصة دروس، ٣ ملفات و ٤ ملفات ميديا: الفصول جاية من ملف [[chapters.vtt]] ([[<track kind="chapters">]]) وبتظهر لستة جنب الفيديو (الفصل الحالي متعلّم عليه) وعلامات على شريط الوقت، والضغط على فصل بيروحله. الترجمة من [[captions.vtt]] بزرار CC بيتفتكر. اختصارات: [[k]] و [[j]]/[[l]] و الأسهم و [[n]]/[[p]] للفصل اللي بعده/قبله و [[c]] و [[m]] و [[f]]. وبيفتكر مكانك لكل فيديو ([[data-video-id]]) ويعرض «كمّل من». وكل حاجة من الدرسين الأولين: أزرار حقيقية، و [[aria]]، وملء الشاشة وصورة في صورة لو مسموحين، والأخطاء. من الوحدة كلها.`, done: R`عند التحميل: ٣ فصول في اللستة و ٢ علامة على الشريط و [[aria-valuetext]] = «0:00 من 0:05، المقدمة». [[n]] = الفصل التاني (t≈2.2)، و [[n]] تاني = التالت، و [[p]] في أول ثانيتين من الفصل = الفصل اللي قبله. [[c]] = ترجمة [[showing]] والجملة «الـ Promise وعد بقيمة هتيجي بعدين» ظاهرة. reload = «كمّل من 0:02» والترجمة لسه شغالة.`, ext: R`(١) صورة مصغّرة فوق الشريط وانت بتعدّي عليه (thumbnail track أو sprite). (٢) «اتفرجت على ٨٠٪» من [[video.played]] وتبعتها لسيرفر بـ [[navigator.sendBeacon]]. (٣) Media Session (تمرين في درس المشغّل) عشان أزرار الكيبورد وشاشة القفل. (٤) فيديو HLS بـ hls.js بجودات (درس Web Audio قسم ٨). (٥) نسخة Web Component [[<lesson-player src chapters>]] (وحدة Web Components).`, sol: R`## الشكل النهائي

~~~view 520
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الدرس ٧: الـ Promises</title>
<style>
body { font-family: system-ui, sans-serif; margin: 16px; background: #f4f4f5; color: #18181b; }
h1 { font-size: 1.3rem; }
.layout { display: grid; gap: 16px; grid-template-columns: minmax(0, 2fr) minmax(200px, 1fr); max-width: 980px; }
@media (max-width: 700px) { .layout { grid-template-columns: 1fr; } }
.player { margin: 0; background: #000; border-radius: 10px; overflow: hidden; position: relative; }
.player video { display: block; width: 100%; aspect-ratio: 16 / 9; background: #000; }
.seekwrap { position: relative; background: #18181b; padding: 6px 8px 0; direction: ltr; }
#seek { width: 100%; margin: 0; accent-color: #facc15; }
#marks { position: absolute; inset: 6px 8px auto; height: 100%; pointer-events: none; }
#marks span { position: absolute; top: 4px; width: 3px; height: 10px; background: #fff; border-radius: 1px; }
.controls { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; padding: 8px; background: #18181b; color: #fff; direction: ltr; }
.controls button, .controls select { font: inherit; min-width: 44px; min-height: 44px; border: 0; border-radius: 6px; background: #3f3f46; color: #fff; cursor: pointer; }
.controls button[aria-pressed="true"] { background: #facc15; color: #18181b; }
.controls :focus-visible, nav button:focus-visible { outline: 3px solid #facc15; outline-offset: 2px; }
#time { font-variant-numeric: tabular-nums; min-width: 92px; text-align: center; }
.msg { margin: 0; padding: 8px; background: #7f1d1d; color: #fff; }
.toast { position: absolute; inset: 12px 12px auto auto; margin: 0; }
.toast button { font: inherit; padding: 8px 12px; border: 0; border-radius: 8px; background: #facc15; cursor: pointer; }
nav { background: #fff; border-radius: 10px; padding: 12px; }
nav h2 { margin: 0 0 8px; font-size: 1rem; }
nav ol { list-style: none; padding: 0; margin: 0; display: grid; gap: 6px; }
nav button { width: 100%; text-align: start; font: inherit; padding: 8px; border: 1px solid #e4e4e7; border-radius: 8px; background: #fff; cursor: pointer; display: flex; justify-content: space-between; gap: 8px; }
nav button[aria-current="true"] { background: #fef9c3; border-color: #ca8a04; font-weight: 600; }
.keys { font-size: 0.85rem; color: #52525b; }
kbd { background: #f4f4f5; border: 1px solid #d4d4d8; border-radius: 4px; padding: 0 4px; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.player:fullscreen { display: flex; flex-direction: column; justify-content: center; }
.player:fullscreen video { flex: 1; aspect-ratio: auto; }
</style>
</head>
<body>
<h1>الدرس ٧: الـ Promises</h1>
<p id="wait">بنجهّز فيديو تجربة (٦ ثواني)…</p>
<div class="layout">
  <figure class="player" id="player" data-video-id="lesson-07">
    <video id="video" controls preload="metadata" playsinline>
      <track kind="chapters" srclang="ar" label="الفصول" default>
      <track kind="captions" srclang="ar" label="عربي">
      <p>المتصفح ده مش بيشغّل الفيديو. <a href="lesson.mp4">نزّله</a>.</p>
    </video>
    <div class="seekwrap"><input id="seek" type="range" min="0" max="0" step="0.1" value="0" aria-label="مكان التشغيل"><div id="marks" aria-hidden="true"></div></div>
    <div class="controls" id="controls" role="group" aria-label="التحكم في الفيديو" hidden>
      <button id="play" type="button" aria-label="شغّل">▶</button>
      <span id="time">0:00 / 0:00</span>
      <button id="mute" type="button" aria-label="اكتم الصوت" aria-pressed="false">🔊</button>
      <select id="rate" aria-label="سرعة التشغيل">
        <option value="0.75">0.75×</option><option value="1" selected>1×</option><option value="1.25">1.25×</option><option value="1.5">1.5×</option><option value="2">2×</option>
      </select>
      <button id="cc" type="button" aria-label="الترجمة" aria-pressed="false">CC</button>
      <button id="pip" type="button" aria-label="صورة في صورة">⧉</button>
      <button id="fs" type="button" aria-label="ملء الشاشة">⛶</button>
    </div>
    <p class="msg" id="msg" role="alert" hidden></p>
    <p class="toast" id="toast" hidden><button id="resume" type="button"></button></p>
  </figure>
  <nav aria-label="فصول الدرس">
    <h2>الفصول</h2>
    <ol id="chapters"></ol>
    <p class="keys">الاختصارات: <kbd>k</kbd> تشغيل، <kbd>j</kbd>/<kbd>l</kbd> ١٠ ثواني، <kbd>←</kbd>/<kbd>→</kbd> ٥ ثواني، <kbd>n</kbd>/<kbd>p</kbd> الفصل اللي بعده/قبله، <kbd>c</kbd> الترجمة، <kbd>m</kbd> كتم، <kbd>f</kbd> ملء الشاشة</p>
  </nav>
</div>
<p class="sr-only" id="status" role="status"></p>
<script>
// الـ preview مفيهوش ملفات: الفيديو canvas متسجّل، وملفات الـ VTT بتتعمل Blob
const VTT = { chapters: "WEBVTT\n\n00:00:00.000 --> 00:00:02.000\nالمقدمة\n\n00:00:02.000 --> 00:00:04.000\nإزاي الـ Promise بيشتغل\n\n00:00:04.000 --> 00:00:06.000\nالخلاصة\n", captions: "WEBVTT\n\n00:00:00.200 --> 00:00:01.800\nأهلًا، النهارده هنتكلم عن الـ Promises\n\n00:00:02.200 --> 00:00:03.800\nالـ Promise وعد بقيمة هتيجي بعدين\n\n00:00:04.200 --> 00:00:05.800\nوده كل اللي محتاج تعرفه\n" };
for (const t of document.querySelectorAll('track')) t.src = URL.createObjectURL(new Blob([VTT[t.kind]], { type: 'text/vtt' }));
(async () => {
  const c = document.createElement('canvas'); c.width = 320; c.height = 180;
  const g = c.getContext('2d');
  const type = ['video/mp4', 'video/webm'].find((t) => MediaRecorder.isTypeSupported(t));
  const rec = new MediaRecorder(c.captureStream(30), { mimeType: type });
  const chunks = []; rec.ondataavailable = (e) => chunks.push(e.data);
  const t0 = performance.now(), names = ['المقدمة', 'الـ Promise', 'الخلاصة'], colors = ['#1e3a8a', '#065f46', '#7c2d12'];
  const draw = () => {
    const s = (performance.now() - t0) / 1000, i = Math.min(2, Math.floor(s / 2));
    g.fillStyle = colors[i]; g.fillRect(0, 0, 320, 180);
    g.fillStyle = '#fff'; g.font = 'bold 28px sans-serif'; g.textAlign = 'center'; g.fillText(names[i], 160, 80);
    g.font = '20px sans-serif'; g.fillText(s.toFixed(1) + 's', 160, 120);
  };
  const timer = setInterval(draw, 33); draw();
  rec.start();
  await new Promise((r) => setTimeout(r, 6000));
  rec.stop(); await new Promise((r) => (rec.onstop = r)); clearInterval(timer);
  document.getElementById('video').src = URL.createObjectURL(new Blob(chunks, { type: rec.mimeType }));
  document.getElementById('wait').hidden = true;
})();

// player.js: مشغّل دروس بفصول وترجمة واختصارات، وبيفتكر مكانك
const $ = (id) => document.getElementById(id);
const player = $('player'), video = $('video'), seek = $('seek'), status = $('status');
const VIDEO_ID = player.dataset.videoId;

// ١. JavaScript شغال: أزرارنا بدل أزرار المتصفح
video.controls = false;
$('controls').hidden = false;

function fmt(s) {
  if (!Number.isFinite(s)) return '--:--';
  s = Math.floor(s);
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = String(s % 60).padStart(2, '0');
  return h ? h + ':' + String(m).padStart(2, '0') + ':' + sec : m + ':' + sec;
}
function showError(text) { $('msg').textContent = text; $('msg').hidden = false; }
const clamp = (t) => Math.min(Math.max(t, 0), Number.isFinite(video.duration) ? video.duration : 0);

// ٢. التخزين الآمن (localStorage ممكن يرمي)
const store = (() => {
  try { localStorage.setItem('_t', '1'); localStorage.removeItem('_t'); return localStorage; }
  catch { const m = new Map(); return { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, String(v)) }; }
})();

// ٣. الوقت والشريط
let dragging = false;
function showTime() {
  if (!dragging) seek.value = video.currentTime;
  $('time').textContent = fmt(video.currentTime) + ' / ' + fmt(video.duration);
  seek.setAttribute('aria-valuetext', fmt(video.currentTime) + ' من ' + fmt(video.duration) + (currentChapter ? '، ' + currentChapter.text : ''));
}
function onMeta() { seek.max = video.duration; showTime(); drawMarks(); offerResume(); }
video.addEventListener('timeupdate', () => { showTime(); savePosition(); });
seek.addEventListener('pointerdown', () => (dragging = true));
seek.addEventListener('pointerup', () => (dragging = false));
seek.addEventListener('input', () => { video.currentTime = Number(seek.value); showTime(); });

// ٤. تشغيل وإيقاف من الأحداث
function togglePlay() {
  if (video.paused || video.ended) video.play().catch((e) => { if (e.name !== 'AbortError') showError('التشغيل اترفض: ' + e.name); });
  else video.pause();
}
$('play').addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', () => { $('play').textContent = '❚❚'; $('play').setAttribute('aria-label', 'وقّف'); });
video.addEventListener('pause', () => {
  $('play').textContent = '▶'; $('play').setAttribute('aria-label', 'شغّل');
  status.textContent = video.ended ? 'الدرس خلص' : 'اتوقف عند ' + fmt(video.currentTime);
  savePosition(true);
});

// ٥. الصوت والسرعة
$('mute').addEventListener('click', () => (video.muted = !video.muted));
video.addEventListener('volumechange', () => {
  $('mute').textContent = video.muted ? '🔇' : '🔊';
  $('mute').setAttribute('aria-pressed', String(video.muted));
});
$('rate').addEventListener('change', () => (video.playbackRate = Number($('rate').value)));

// ٦. الفصول: من <track kind="chapters">
const chaptersTrack = [...video.textTracks].find((t) => t.kind === 'chapters');
let chapters = [], currentChapter = null;
function loadChapters() {
  chapters = [...chaptersTrack.cues].map((c) => ({ start: c.startTime, end: c.endTime, text: c.text }));
  $('chapters').replaceChildren(...chapters.map((ch) => {
    const li = document.createElement('li');
    const b = document.createElement('button');
    b.type = 'button';
    b.innerHTML = '<span></span><span></span>';
    b.firstChild.textContent = ch.text;
    b.lastChild.textContent = fmt(ch.start);
    b.addEventListener('click', () => { video.currentTime = ch.start; video.play().catch(() => {}); });
    li.append(b);
    return li;
  }));
  drawMarks();
  markChapter();
}
function markChapter() {
  const t = video.currentTime;
  const now = chapters.find((ch) => t >= ch.start && t < ch.end) || null;
  if (now === currentChapter) return;
  currentChapter = now;
  [...$('chapters').querySelectorAll('button')].forEach((b, i) => b.setAttribute('aria-current', String(chapters[i] === now)));
  if (now && !video.paused) status.textContent = 'الفصل: ' + now.text;
}
function drawMarks() {
  if (!chapters.length || !Number.isFinite(video.duration)) return;
  $('marks').replaceChildren(...chapters.slice(1).map((ch) => {
    const s = document.createElement('span');
    s.style.left = (ch.start / video.duration) * 100 + '%';
    return s;
  }));
}
function goChapter(step) {
  const i = chapters.indexOf(currentChapter);
  // p في أول ثانيتين من الفصل بيرجع للي قبله، بعد كده لأول الفصل نفسه (زي المشغّلات)
  const target = step < 0 && currentChapter && video.currentTime - currentChapter.start > 2 ? currentChapter : chapters[i + step];
  if (target) video.currentTime = target.start;
}
if (chaptersTrack) {
  chaptersTrack.mode = 'hidden';                       // hidden: الـ cues بتتحمّل بس مبتترسمش
  chaptersTrack.addEventListener('cuechange', markChapter);
  const el = video.querySelector('track[kind="chapters"]');
  if (chaptersTrack.cues && chaptersTrack.cues.length) loadChapters();
  else el.addEventListener('load', loadChapters);
}
video.addEventListener('seeked', markChapter);

// ٧. الترجمة: CC بيبدّل showing و hidden
const captions = [...video.textTracks].find((t) => t.kind === 'captions');
$('cc').hidden = !captions;
function setCaptions(on) {
  captions.mode = on ? 'showing' : 'hidden';
  $('cc').setAttribute('aria-pressed', String(on));
  store.setItem('captions', on ? '1' : '0');
}
if (captions) setCaptions(store.getItem('captions') === '1');
$('cc').addEventListener('click', () => setCaptions(captions.mode !== 'showing'));

// ٨. صورة في صورة وملء الشاشة
$('pip').hidden = !document.pictureInPictureEnabled;
$('pip').addEventListener('click', async () => {
  try { document.pictureInPictureElement ? await document.exitPictureInPicture() : await video.requestPictureInPicture(); }
  catch (e) { showError('صورة في صورة: ' + e.message); }
});
$('fs').hidden = !document.fullscreenEnabled;
$('fs').addEventListener('click', () => {
  if (document.fullscreenElement) document.exitFullscreen();
  else player.requestFullscreen().catch((e) => showError('ملء الشاشة: ' + e.message));
});

// ٩. افتكر المكان: كل ٥ ثواني وعند الإيقاف، و «كمّل من» لما ترجع
const POS_KEY = 'pos:' + VIDEO_ID;
let lastSaved = 0;
function savePosition(force) {
  if (!Number.isFinite(video.duration)) return;
  if (!force && Math.abs(video.currentTime - lastSaved) < 5) return;
  lastSaved = video.currentTime;
  const nearEnd = video.duration - video.currentTime < 3;
  store.setItem(POS_KEY, nearEnd ? '0' : String(video.currentTime.toFixed(1)));
}
function offerResume() {
  const t = Number(store.getItem(POS_KEY));
  if (!(t > 1) || t >= video.duration - 3) return;
  $('resume').textContent = 'كمّل من ' + fmt(t);
  $('toast').hidden = false;
  $('resume').onclick = () => { video.currentTime = t; $('toast').hidden = true; video.play().catch(() => {}); };
  setTimeout(() => ($('toast').hidden = true), 8000);
}
addEventListener('pagehide', () => savePosition(true));

// ١٠. الكيبورد على المشغّل
player.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.altKey || e.metaKey || e.target === $('rate')) return;
  const k = e.key.toLowerCase();
  if (k === 'k' || (k === ' ' && !e.target.matches('button'))) togglePlay();
  else if (k === 'j') video.currentTime = clamp(video.currentTime - 10);
  else if (k === 'l') video.currentTime = clamp(video.currentTime + 10);
  else if (k === 'arrowleft') video.currentTime = clamp(video.currentTime - 5);
  else if (k === 'arrowright') video.currentTime = clamp(video.currentTime + 5);
  else if (k === 'n') goChapter(1);
  else if (k === 'p') goChapter(-1);
  else if (k === 'c' && captions) $('cc').click();
  else if (k === 'm') video.muted = !video.muted;
  else if (k === 'f' && document.fullscreenEnabled) $('fs').click();
  else return;
  e.preventDefault();
});

// ١١. الأخطاء: src واحد أو آخر source
video.addEventListener('error', () => showError('الفيديو مش راضي يشتغل (' + video.error.code + ').'));
const sources = video.querySelectorAll('source');
if (sources.length) sources[sources.length - 1].addEventListener('error', () => showError('مفيش ولا صيغة من الفيديو اشتغلت. نزّله من اللينك تحت.'));

// ١٢. آخر سطر: player.js ممكن يوصل بعد ما الـ metadata اتحمّلت فعلًا، فالحدث يكون فات
if (video.readyState >= HTMLMediaElement.HAVE_METADATA) onMeta();
else video.addEventListener('loadedmetadata', onMeta);
</script>
</body>
</html>
~~~

**هتشوف إيه:** «بنجهّز فيديو تجربة (٦ ثواني)» وبعدين فيديو بيتغيّر لونه كل ثانيتين وعليه اسم الفصل، وتحته شريط بعلامتين بيض، وأزرار، وجنبه (أو تحته على الموبايل) كارت «الفصول» فيه ٣ فصول والحالي أصفر، وتحته الاختصارات. دوس CC: الجملة بتظهر على الفيديو. زرار ملء الشاشة مستخبي هنا (الـ iframe مش مسموحله)، والتخزين في الذاكرة بس. (الـ preview بيعمل الفيديو وملفات الـ VTT في الصفحة، وده الجزء الوحيد المختلف عن ملفاتك.)

## شجرة الملفات

~~~text lesson-player
lesson-player/
├── index.html      الهيكل: الفيديو و track للفصول و track للترجمة والأزرار ولستة الفصول
├── player.css      الشكل: grid للفيديو واللستة، والعلامات على الشريط، و :fullscreen
├── player.js       كل السلوك (١٢ جزء مترقّمين)
├── chapters.vtt    الفصول: بداية ونهاية واسم
├── captions.vtt    الترجمة
├── lesson.webm     الفيديو (VP9)
└── lesson.mp4      نفس الفيديو (H.264) للأجهزة اللي مبتشغّلش WebM
~~~

## الكود

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الدرس ٧: الـ Promises</title>
<link rel="stylesheet" href="player.css">
</head>
<body>
<h1>الدرس ٧: الـ Promises</h1>
<div class="layout">
  <figure class="player" id="player" data-video-id="lesson-07">
    <video id="video" controls preload="metadata" playsinline>
      <source src="lesson.webm" type="video/webm">
      <source src="lesson.mp4" type="video/mp4">
      <track kind="chapters" src="chapters.vtt" srclang="ar" label="الفصول" default>
      <track kind="captions" src="captions.vtt" srclang="ar" label="عربي">
      <p>المتصفح ده مش بيشغّل الفيديو. <a href="lesson.mp4">نزّله</a>.</p>
    </video>
    <div class="seekwrap"><input id="seek" type="range" min="0" max="0" step="0.1" value="0" aria-label="مكان التشغيل"><div id="marks" aria-hidden="true"></div></div>
    <div class="controls" id="controls" role="group" aria-label="التحكم في الفيديو" hidden>
      <button id="play" type="button" aria-label="شغّل">▶</button>
      <span id="time">0:00 / 0:00</span>
      <button id="mute" type="button" aria-label="اكتم الصوت" aria-pressed="false">🔊</button>
      <select id="rate" aria-label="سرعة التشغيل">
        <option value="0.75">0.75×</option><option value="1" selected>1×</option><option value="1.25">1.25×</option><option value="1.5">1.5×</option><option value="2">2×</option>
      </select>
      <button id="cc" type="button" aria-label="الترجمة" aria-pressed="false">CC</button>
      <button id="pip" type="button" aria-label="صورة في صورة">⧉</button>
      <button id="fs" type="button" aria-label="ملء الشاشة">⛶</button>
    </div>
    <p class="msg" id="msg" role="alert" hidden></p>
    <p class="toast" id="toast" hidden><button id="resume" type="button"></button></p>
  </figure>
  <nav aria-label="فصول الدرس">
    <h2>الفصول</h2>
    <ol id="chapters"></ol>
    <p class="keys">الاختصارات: <kbd>k</kbd> تشغيل، <kbd>j</kbd>/<kbd>l</kbd> ١٠ ثواني، <kbd>←</kbd>/<kbd>→</kbd> ٥ ثواني، <kbd>n</kbd>/<kbd>p</kbd> الفصل اللي بعده/قبله، <kbd>c</kbd> الترجمة، <kbd>m</kbd> كتم، <kbd>f</kbd> ملء الشاشة</p>
  </nav>
</div>
<p class="sr-only" id="status" role="status"></p>
<script src="player.js"></script>
</body>
</html>
~~~

~~~css player.css
body { font-family: system-ui, sans-serif; margin: 16px; background: #f4f4f5; color: #18181b; }
h1 { font-size: 1.3rem; }
.layout { display: grid; gap: 16px; grid-template-columns: minmax(0, 2fr) minmax(200px, 1fr); max-width: 980px; }
@media (max-width: 700px) { .layout { grid-template-columns: 1fr; } }
.player { margin: 0; background: #000; border-radius: 10px; overflow: hidden; position: relative; }
.player video { display: block; width: 100%; aspect-ratio: 16 / 9; background: #000; }
.seekwrap { position: relative; background: #18181b; padding: 6px 8px 0; direction: ltr; }
#seek { width: 100%; margin: 0; accent-color: #facc15; }
#marks { position: absolute; inset: 6px 8px auto; height: 100%; pointer-events: none; }
#marks span { position: absolute; top: 4px; width: 3px; height: 10px; background: #fff; border-radius: 1px; }
.controls { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; padding: 8px; background: #18181b; color: #fff; direction: ltr; }
.controls button, .controls select { font: inherit; min-width: 44px; min-height: 44px; border: 0; border-radius: 6px; background: #3f3f46; color: #fff; cursor: pointer; }
.controls button[aria-pressed="true"] { background: #facc15; color: #18181b; }
.controls :focus-visible, nav button:focus-visible { outline: 3px solid #facc15; outline-offset: 2px; }
#time { font-variant-numeric: tabular-nums; min-width: 92px; text-align: center; }
.msg { margin: 0; padding: 8px; background: #7f1d1d; color: #fff; }
.toast { position: absolute; inset: 12px 12px auto auto; margin: 0; }
.toast button { font: inherit; padding: 8px 12px; border: 0; border-radius: 8px; background: #facc15; cursor: pointer; }
nav { background: #fff; border-radius: 10px; padding: 12px; }
nav h2 { margin: 0 0 8px; font-size: 1rem; }
nav ol { list-style: none; padding: 0; margin: 0; display: grid; gap: 6px; }
nav button { width: 100%; text-align: start; font: inherit; padding: 8px; border: 1px solid #e4e4e7; border-radius: 8px; background: #fff; cursor: pointer; display: flex; justify-content: space-between; gap: 8px; }
nav button[aria-current="true"] { background: #fef9c3; border-color: #ca8a04; font-weight: 600; }
.keys { font-size: 0.85rem; color: #52525b; }
kbd { background: #f4f4f5; border: 1px solid #d4d4d8; border-radius: 4px; padding: 0 4px; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.player:fullscreen { display: flex; flex-direction: column; justify-content: center; }
.player:fullscreen video { flex: 1; aspect-ratio: auto; }
~~~

~~~js player.js
// player.js: مشغّل دروس بفصول وترجمة واختصارات، وبيفتكر مكانك
const $ = (id) => document.getElementById(id);
const player = $('player'), video = $('video'), seek = $('seek'), status = $('status');
const VIDEO_ID = player.dataset.videoId;

// ١. JavaScript شغال: أزرارنا بدل أزرار المتصفح
video.controls = false;
$('controls').hidden = false;

function fmt(s) {
  if (!Number.isFinite(s)) return '--:--';
  s = Math.floor(s);
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = String(s % 60).padStart(2, '0');
  return h ? h + ':' + String(m).padStart(2, '0') + ':' + sec : m + ':' + sec;
}
function showError(text) { $('msg').textContent = text; $('msg').hidden = false; }
const clamp = (t) => Math.min(Math.max(t, 0), Number.isFinite(video.duration) ? video.duration : 0);

// ٢. التخزين الآمن (localStorage ممكن يرمي)
const store = (() => {
  try { localStorage.setItem('_t', '1'); localStorage.removeItem('_t'); return localStorage; }
  catch { const m = new Map(); return { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, String(v)) }; }
})();

// ٣. الوقت والشريط
let dragging = false;
function showTime() {
  if (!dragging) seek.value = video.currentTime;
  $('time').textContent = fmt(video.currentTime) + ' / ' + fmt(video.duration);
  seek.setAttribute('aria-valuetext', fmt(video.currentTime) + ' من ' + fmt(video.duration) + (currentChapter ? '، ' + currentChapter.text : ''));
}
function onMeta() { seek.max = video.duration; showTime(); drawMarks(); offerResume(); }
video.addEventListener('timeupdate', () => { showTime(); savePosition(); });
seek.addEventListener('pointerdown', () => (dragging = true));
seek.addEventListener('pointerup', () => (dragging = false));
seek.addEventListener('input', () => { video.currentTime = Number(seek.value); showTime(); });

// ٤. تشغيل وإيقاف من الأحداث
function togglePlay() {
  if (video.paused || video.ended) video.play().catch((e) => { if (e.name !== 'AbortError') showError('التشغيل اترفض: ' + e.name); });
  else video.pause();
}
$('play').addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', () => { $('play').textContent = '❚❚'; $('play').setAttribute('aria-label', 'وقّف'); });
video.addEventListener('pause', () => {
  $('play').textContent = '▶'; $('play').setAttribute('aria-label', 'شغّل');
  status.textContent = video.ended ? 'الدرس خلص' : 'اتوقف عند ' + fmt(video.currentTime);
  savePosition(true);
});

// ٥. الصوت والسرعة
$('mute').addEventListener('click', () => (video.muted = !video.muted));
video.addEventListener('volumechange', () => {
  $('mute').textContent = video.muted ? '🔇' : '🔊';
  $('mute').setAttribute('aria-pressed', String(video.muted));
});
$('rate').addEventListener('change', () => (video.playbackRate = Number($('rate').value)));

// ٦. الفصول: من <track kind="chapters">
const chaptersTrack = [...video.textTracks].find((t) => t.kind === 'chapters');
let chapters = [], currentChapter = null;
function loadChapters() {
  chapters = [...chaptersTrack.cues].map((c) => ({ start: c.startTime, end: c.endTime, text: c.text }));
  $('chapters').replaceChildren(...chapters.map((ch) => {
    const li = document.createElement('li');
    const b = document.createElement('button');
    b.type = 'button';
    b.innerHTML = '<span></span><span></span>';
    b.firstChild.textContent = ch.text;
    b.lastChild.textContent = fmt(ch.start);
    b.addEventListener('click', () => { video.currentTime = ch.start; video.play().catch(() => {}); });
    li.append(b);
    return li;
  }));
  drawMarks();
  markChapter();
}
function markChapter() {
  const t = video.currentTime;
  const now = chapters.find((ch) => t >= ch.start && t < ch.end) || null;
  if (now === currentChapter) return;
  currentChapter = now;
  [...$('chapters').querySelectorAll('button')].forEach((b, i) => b.setAttribute('aria-current', String(chapters[i] === now)));
  if (now && !video.paused) status.textContent = 'الفصل: ' + now.text;
}
function drawMarks() {
  if (!chapters.length || !Number.isFinite(video.duration)) return;
  $('marks').replaceChildren(...chapters.slice(1).map((ch) => {
    const s = document.createElement('span');
    s.style.left = (ch.start / video.duration) * 100 + '%';
    return s;
  }));
}
function goChapter(step) {
  const i = chapters.indexOf(currentChapter);
  // p في أول ثانيتين من الفصل بيرجع للي قبله، بعد كده لأول الفصل نفسه (زي المشغّلات)
  const target = step < 0 && currentChapter && video.currentTime - currentChapter.start > 2 ? currentChapter : chapters[i + step];
  if (target) video.currentTime = target.start;
}
if (chaptersTrack) {
  chaptersTrack.mode = 'hidden';                       // hidden: الـ cues بتتحمّل بس مبتترسمش
  chaptersTrack.addEventListener('cuechange', markChapter);
  const el = video.querySelector('track[kind="chapters"]');
  if (chaptersTrack.cues && chaptersTrack.cues.length) loadChapters();
  else el.addEventListener('load', loadChapters);
}
video.addEventListener('seeked', markChapter);

// ٧. الترجمة: CC بيبدّل showing و hidden
const captions = [...video.textTracks].find((t) => t.kind === 'captions');
$('cc').hidden = !captions;
function setCaptions(on) {
  captions.mode = on ? 'showing' : 'hidden';
  $('cc').setAttribute('aria-pressed', String(on));
  store.setItem('captions', on ? '1' : '0');
}
if (captions) setCaptions(store.getItem('captions') === '1');
$('cc').addEventListener('click', () => setCaptions(captions.mode !== 'showing'));

// ٨. صورة في صورة وملء الشاشة
$('pip').hidden = !document.pictureInPictureEnabled;
$('pip').addEventListener('click', async () => {
  try { document.pictureInPictureElement ? await document.exitPictureInPicture() : await video.requestPictureInPicture(); }
  catch (e) { showError('صورة في صورة: ' + e.message); }
});
$('fs').hidden = !document.fullscreenEnabled;
$('fs').addEventListener('click', () => {
  if (document.fullscreenElement) document.exitFullscreen();
  else player.requestFullscreen().catch((e) => showError('ملء الشاشة: ' + e.message));
});

// ٩. افتكر المكان: كل ٥ ثواني وعند الإيقاف، و «كمّل من» لما ترجع
const POS_KEY = 'pos:' + VIDEO_ID;
let lastSaved = 0;
function savePosition(force) {
  if (!Number.isFinite(video.duration)) return;
  if (!force && Math.abs(video.currentTime - lastSaved) < 5) return;
  lastSaved = video.currentTime;
  const nearEnd = video.duration - video.currentTime < 3;
  store.setItem(POS_KEY, nearEnd ? '0' : String(video.currentTime.toFixed(1)));
}
function offerResume() {
  const t = Number(store.getItem(POS_KEY));
  if (!(t > 1) || t >= video.duration - 3) return;
  $('resume').textContent = 'كمّل من ' + fmt(t);
  $('toast').hidden = false;
  $('resume').onclick = () => { video.currentTime = t; $('toast').hidden = true; video.play().catch(() => {}); };
  setTimeout(() => ($('toast').hidden = true), 8000);
}
addEventListener('pagehide', () => savePosition(true));

// ١٠. الكيبورد على المشغّل
player.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.altKey || e.metaKey || e.target === $('rate')) return;
  const k = e.key.toLowerCase();
  if (k === 'k' || (k === ' ' && !e.target.matches('button'))) togglePlay();
  else if (k === 'j') video.currentTime = clamp(video.currentTime - 10);
  else if (k === 'l') video.currentTime = clamp(video.currentTime + 10);
  else if (k === 'arrowleft') video.currentTime = clamp(video.currentTime - 5);
  else if (k === 'arrowright') video.currentTime = clamp(video.currentTime + 5);
  else if (k === 'n') goChapter(1);
  else if (k === 'p') goChapter(-1);
  else if (k === 'c' && captions) $('cc').click();
  else if (k === 'm') video.muted = !video.muted;
  else if (k === 'f' && document.fullscreenEnabled) $('fs').click();
  else return;
  e.preventDefault();
});

// ١١. الأخطاء: src واحد أو آخر source
video.addEventListener('error', () => showError('الفيديو مش راضي يشتغل (' + video.error.code + ').'));
const sources = video.querySelectorAll('source');
if (sources.length) sources[sources.length - 1].addEventListener('error', () => showError('مفيش ولا صيغة من الفيديو اشتغلت. نزّله من اللينك تحت.'));

// ١٢. آخر سطر: player.js ممكن يوصل بعد ما الـ metadata اتحمّلت فعلًا، فالحدث يكون فات
if (video.readyState >= HTMLMediaElement.HAVE_METADATA) onMeta();
else video.addEventListener('loadedmetadata', onMeta);
~~~

~~~text chapters.vtt
WEBVTT

00:00:00.000 --> 00:00:02.000
المقدمة

00:00:02.000 --> 00:00:04.000
إزاي الـ Promise بيشتغل

00:00:04.000 --> 00:00:06.000
الخلاصة
~~~

~~~text captions.vtt
WEBVTT

00:00:00.200 --> 00:00:01.800
أهلًا، النهارده هنتكلم عن الـ Promises

00:00:02.200 --> 00:00:03.800
الـ Promise وعد بقيمة هتيجي بعدين

00:00:04.200 --> 00:00:05.800
وده كل اللي محتاج تعرفه
~~~

**مهم:** شغّله من سيرفر محلي ([[npx serve]] أو [[media-server.mjs]] من درس الأخطاء بعد ما تزوّد [[.css]] و [[.js]] و [[.vtt]] في الأنواع)، مش بفتح [[index.html]] كملف: المتصفح مبيحمّلش ملفات الـ [[<track>]] من [[file://]]، والسيرفر لازم يبعت [[.vtt]] بـ [[text/vtt]].

## ترتيب البناء

1. **الهيكل والأساس:** [[index.html]] و [[player.css]] وأجزاء ١ لـ ٥ في [[player.js]] (نفس مشغّل درس «مشغّل فيديو خاص»). اختبر التشغيل والشريط والصوت.
2. **الفصول:** [[chapters.vtt]] وجزء ٦: اللستة والعلامات و [[n]]/[[p]].
3. **الترجمة:** [[captions.vtt]] وجزء ٧.
4. **صورة في صورة وملء الشاشة** (جزء ٨) و **الكيبورد** (جزء ١٠).
5. **التخزين:** جزء ٢ و ٩.
6. **الأخطاء** (جزء ١١)، وجزء ١٢ في الآخر.

## الشرح

- **الفصول من [[textTracks]]:** [[<track kind="chapters">]] بيتحمّل ويتحوّل لـ cues (بداية ونهاية ونص) من غير ما تكتب parser للـ VTT. [[mode = 'hidden']] بيحمّل الـ cues من غير ما يرسمهم، و [[cuechange]] بيتبعت لما الفصل الحالي يتغيّر.
- **الـ cues ممكن تكون اتحمّلت قبل الـ script:** فبنشيك [[chaptersTrack.cues.length]] الأول، ولو لأ بنستنى [[load]] على عنصر الـ [[<track>]]. نفس فكرة [[readyState]].
- **[[markChapter()]]** من [[cuechange]] و [[seeked]]: بيدوّر على الفصل اللي فيه [[currentTime]]، وبيحدّث [[aria-current]]، وبيعلن «الفصل: …» لقارئ الشاشة وهو شغال بس. واسم الفصل داخل في [[aria-valuetext]] بتاع الشريط كمان.
- **العلامات:** [[left = start / duration × 100%]] لكل فصل بعد الأول، و [[pointer-events: none]] عشان الضغط يروح للشريط. و [[direction: ltr]] على الشريط عشان العلامات تمشي مع الـ thumb حتى والصفحة RTL.
- **[[goChapter(-1)]]:** زي المشغّلات: لو عدّى أكتر من ثانيتين من أول الفصل، بيرجع لأوله؛ ولو لأ، للفصل اللي قبله.
- **الترجمة:** [[captions.mode]] بين [[showing]] و [[hidden]]، و [[aria-pressed]] على CC، والاختيار بيتحفظ.
- **المكان لكل فيديو:** المفتاح [[pos:lesson-07]] من [[data-video-id]]، فكل درس ليه مكانه. وقرب النهاية (أقل من ٣ ثواني) بيتحفظ صفر عشان الدرس اللي خلص ميسألش «كمّل من».
- **«كمّل من»** toast بيختفي بعد ٨ ثواني لوحده، ومش بيشغّل غير لما تدوس.
- **[[clamp]]** لكل القفزات، و [[e.target === rate]] عشان الأسهم في قايمة السرعة تفضل للقايمة.

## غلطات وقعت فيها وأنا ببنيها

- **«كمّل من» مظهرش في أول تشغيل للاختبار، وظهر في التاني.** السبب: [[player.js]] ملف خارجي بيتحمّل بطلب لوحده، والفيديو المحلي الصغير قرا الـ metadata **قبل** ما السكربت يوصل، فـ [[loadedmetadata]] اتبعت ومحدش كان سامع: لا الشريط اتظبط ولا العلامات اترسمت ولا «كمّل من» ظهر. التصليح: [[onMeta()]] بتتنادى على طول لو [[readyState >= HAVE_METADATA]]، وغير كده بنستنى الحدث. نفس غلطة «تقرا [[duration]] بعد ما الحدث فات» من درس [[HTMLMediaElement]].
- **وأول تصليح وقّع الصفحة:** حطيت سطر الـ [[readyState]] مكان الـ listener (فوق)، و [[onMeta]] بتنادي [[drawMarks]] اللي بتقرا [[chapters]] المتعرّفة بـ [[let]] تحت: [[ReferenceError]] (الـ TDZ). نقلت السطر لآخر الملف (جزء ١٢) بعد ما كل حاجة اتعرّفت.

## اتقاس

~~~text الناتج (Chrome 157، Playwright من سيرفر محلي، lesson.webm مدته 5.98، الـ fix اتجرّب مرتين ورا بعض)
load:     t=0.00 chapter#=0 cc=hidden marks=2 valuetext=0:00 من 0:05، المقدمة
n:        t=2.24 chapter#=1 valuetext=0:02 من 0:05، إزاي الـ Promise بيشتغل
n تاني:   t=4.25 chapter#=2 valuetext=0:04 من 0:05، الخلاصة
p:        t=2.24 chapter#=1                  (كان في أول ثانيتين من الخلاصة، فرجع للفصل اللي قبله)
c:        cc=showing
فصل ٢ + k: الترجمة الظاهرة: «الـ Promise وعد بقيمة هتيجي بعدين»
reload:   toast = «كمّل من 0:02»   cc=showing   stored=2.9
كمّل:     t=3.22 paused=false chapter#=1
الـ preview المعزول: الفصول الـ ٣، d=6.006467، marks=2، pip ظاهر، fs مستخبي، n = «إزاي الـ Promise بيشتغل»،
          c = showing و «الـ Promise وعد بقيمة هتيجي بعدين»
~~~` },
        { lvl: 'كبير', dir: "metronome", t: R`مترونوم دقيق بـ Web Audio`, what: R`مترونوم لموسيقي: السرعة من 40 لـ 240 BPM (شريط و ±)، وعدد الضربات في المازورة (2 و 3 و 4 و 6) والأولى بنغمة أعلى، ونقط بتنوّر مع كل ضربة، و Tap tempo (تدوس على الإيقاع والسرعة تتحسب)، والكيبورد: مسافة تشغيل و [[t]] للـ tap والأسهم ±1 و Shift ±10. **الدقة هي المشروع:** الضربات بتتجدول بساعة الصوت ([[ctx.currentTime]]) قبلها بـ ١٠٠ ms، و [[setInterval]] كل ٢٥ ms بس بيصحّي الجدولة، فالـ main thread لو اتشغل الإيقاع ميتأثرش. من درس «Web Audio API».`, done: R`عند 100 BPM الفرق بين كل ضربتين متجدولتين 600 ms بالظبط (أكبر انحراف 0.000000 ms)، حتى والـ main thread مشغول ١٥٠ ms كل ٤٠٠ ms. و ٥ ضغطات Tap كل نص ثانية = حوالي 120 BPM، و Shift+↑ = +10، واختيار ٣ = ٣ نقط.`, ext: R`(١) Tuner: الميكروفون ← [[AnalyserNode]] ← autocorrelation على الـ time domain ← اسم النوتة وكام cent بعيد (درس Web Audio، تمرين الـ fftSize). (٢) تقسيم الضربة (ثمنيات وثلاثيات) بنغمة أوطى. (٣) «تمرين سرعة»: يبدأ 80 ويزيد 2 كل 8 مازورات لحد هدف. (٤) شغّل الـ scheduler في Web Worker عشان التاب في الخلفية (الـ timers في التابات المستخبية بتبطأ).`, sol: R`## الشكل النهائي

~~~view 470
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مترونوم</title>
<style>
  body { font-family: system-ui, sans-serif; margin: 16px; background: #0f172a; color: #e2e8f0; }
  main { max-width: 460px; display: grid; gap: 14px; }
  .bpm { display: flex; align-items: center; gap: 8px; }
  .bpm output { font-size: 2.6rem; font-variant-numeric: tabular-nums; min-width: 3ch; text-align: center; }
  button, select, input[type="number"] { font: inherit; min-height: 44px; border-radius: 8px; border: 1px solid #334155; background: #1e293b; color: #e2e8f0; padding: 0 12px; }
  button:focus-visible, select:focus-visible, input:focus-visible { outline: 3px solid #facc15; outline-offset: 2px; }
  #start { background: #16a34a; border: 0; font-size: 1.1rem; }
  #start[aria-pressed="true"] { background: #dc2626; }
  input[type="range"] { width: 100%; accent-color: #facc15; }
  .dots { display: flex; gap: 10px; direction: ltr; }
  .dots span { width: 28px; height: 28px; border-radius: 50%; background: #334155; transition: background 60ms; }
  .dots span.first { border: 2px solid #facc15; }
  .dots span.on { background: #facc15; }
  .row { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
  #msg { color: #94a3b8; min-height: 1.4em; }
</style>
</head>
<body>
<main id="app">
  <h1>مترونوم</h1>
  <div class="bpm">
    <button id="minus" type="button" aria-label="أبطأ">−</button>
    <output id="bpmOut" for="bpm">100</output>
    <button id="plus" type="button" aria-label="أسرع">+</button>
    <span>BPM</span>
  </div>
  <input id="bpm" type="range" min="40" max="240" value="100" aria-label="السرعة بالـ BPM">
  <div class="row">
    <label>الضربات في المازورة
      <select id="beats"><option>2</option><option>3</option><option selected>4</option><option>6</option></select>
    </label>
    <button id="tap" type="button">Tap (t)</button>
  </div>
  <div class="dots" id="dots" aria-hidden="true"></div>
  <button id="start" type="button" aria-pressed="false">ابدأ (مسافة)</button>
  <p id="msg" role="status"></p>
</main>
<script>
// metronome.js: الضربات بتتجدول بساعة الصوت، والـ timer بس بيصحّى الجدولة
const $ = (id) => document.getElementById(id);
const LOOKAHEAD_MS = 25;        // الـ timer بيصحى كل 25 ms
const AHEAD_S = 0.1;            // ويجدول أي ضربة جاية في الـ 100 ms الجايين
const state = { bpm: 100, beats: 4, running: false };
let ctx = null, timer = null, nextTime = 0, beat = 0;
const visualQueue = [];         // { beat, time } عشان النور يولع مع الصوت مش مع الجدولة
const log = [];                 // للقياس: كل ضربة اتجدولت امتى

// ١. ضربة واحدة: نغمة قصيرة جدًا، والأولى في المازورة أعلى
function click(time, accent) {
  const osc = ctx.createOscillator(), env = ctx.createGain();
  osc.frequency.value = accent ? 1500 : 1000;
  env.gain.setValueAtTime(0, time);
  env.gain.linearRampToValueAtTime(accent ? 0.5 : 0.3, time + 0.002);
  env.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
  osc.connect(env).connect(ctx.destination);
  osc.start(time);
  osc.stop(time + 0.06);
}

// ٢. الجدولة: كل اللي ميعاده قبل «دلوقتي + 100 ms» يتجدول دلوقتي بميعاده بالظبط
function scheduler() {
  while (nextTime < ctx.currentTime + AHEAD_S) {
    click(nextTime, beat === 0);
    visualQueue.push({ beat, time: nextTime });
    log.push(nextTime);
    nextTime += 60 / state.bpm;
    beat = (beat + 1) % state.beats;
  }
}

// ٣. النور: كل frame نشوف أنهي ضربة ميعادها جه في ساعة الصوت
function drawDots() {
  if (!state.running) return;
  while (visualQueue.length && visualQueue[0].time <= ctx.currentTime) {
    const { beat: b } = visualQueue.shift();
    [...$('dots').children].forEach((d, i) => d.classList.toggle('on', i === b));
  }
  requestAnimationFrame(drawDots);
}
function makeDots() {
  $('dots').replaceChildren(...Array.from({ length: state.beats }, (_, i) => Object.assign(document.createElement('span'), { className: i === 0 ? 'first' : '' })));
}

// ٤. تشغيل وإيقاف
async function start() {
  ctx ??= new AudioContext();
  if (ctx.state === 'suspended') await ctx.resume();
  state.running = true;
  beat = 0;
  nextTime = ctx.currentTime + 0.05;
  visualQueue.length = 0;
  log.length = 0;
  scheduler();
  timer = setInterval(scheduler, LOOKAHEAD_MS);
  requestAnimationFrame(drawDots);
  $('start').textContent = 'وقّف (مسافة)';
  $('start').setAttribute('aria-pressed', 'true');
  $('msg').textContent = 'شغال: ' + state.bpm + ' BPM، ' + state.beats + ' في المازورة';
}
function stop() {
  state.running = false;
  clearInterval(timer);
  [...$('dots').children].forEach((d) => d.classList.remove('on'));
  $('start').textContent = 'ابدأ (مسافة)';
  $('start').setAttribute('aria-pressed', 'false');
  $('msg').textContent = 'واقف';
}
$('start').addEventListener('click', () => (state.running ? stop() : start()));

// ٥. السرعة: range وأزرار، والتغيير بيبان من الضربة الجاية
function setBpm(v) {
  state.bpm = Math.min(240, Math.max(40, Math.round(v)));
  $('bpm').value = state.bpm;
  $('bpmOut').textContent = state.bpm;
}
$('bpm').addEventListener('input', () => setBpm(Number($('bpm').value)));
$('minus').addEventListener('click', () => setBpm(state.bpm - 1));
$('plus').addEventListener('click', () => setBpm(state.bpm + 1));
$('beats').addEventListener('change', () => { state.beats = Number($('beats').value); beat = 0; makeDots(); });

// ٦. Tap tempo: متوسط آخر ٤ فترات، ولو سكت أكتر من ثانيتين نبدأ من جديد
const taps = [];
function tap() {
  const now = performance.now();
  if (taps.length && now - taps[taps.length - 1] > 2000) taps.length = 0;
  taps.push(now);
  if (taps.length > 5) taps.shift();
  if (taps.length >= 2) {
    const gaps = taps.slice(1).map((t, i) => t - taps[i]);
    setBpm(60000 / (gaps.reduce((a, b) => a + b, 0) / gaps.length));
    $('msg').textContent = 'Tap: ' + state.bpm + ' BPM من ' + gaps.length + ' فترة';
  }
}
$('tap').addEventListener('click', tap);

// ٧. الكيبورد: مسافة تشغيل، و t للـ tap، والأسهم ±1 (و Shift ±10)
addEventListener('keydown', (e) => {
  if (e.target.matches('input, select') && e.key !== ' ') return;
  if (e.key === ' ' && !e.target.matches('button')) { e.preventDefault(); $('start').click(); }
  else if (e.key.toLowerCase() === 't') tap();
  else if (e.key === 'ArrowUp') { e.preventDefault(); setBpm(state.bpm + (e.shiftKey ? 10 : 1)); }
  else if (e.key === 'ArrowDown') { e.preventDefault(); setBpm(state.bpm - (e.shiftKey ? 10 : 1)); }
});

// ٨. التاب اتخبى: الـ timers بتبطأ، والصوت المتجدول بيكمّل. لما نرجع نكمّل من غير ما نجدول اللي فات
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && state.running && nextTime < ctx.currentTime) nextTime = ctx.currentTime + 0.05;
});
makeDots();
</script>
</body>
</html>
~~~

**هتشوف إيه:** خلفية كحلي، و «−» والرقم 100 الكبير و «+» و BPM، وشريط أصفر، واختيار الضربات و Tap، و ٤ نقط رمادي أولها بإطار أصفر، وزرار أخضر «ابدأ (مسافة)». دوس ابدأ: تكة كل 0.6 ثانية والنقطة الأولى بتكة أعلى، والنقط بتنوّر واحدة واحدة مع الصوت، والزرار بيبقى أحمر «وقّف».

## الكود

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مترونوم</title>
<style>
  body { font-family: system-ui, sans-serif; margin: 16px; background: #0f172a; color: #e2e8f0; }
  main { max-width: 460px; display: grid; gap: 14px; }
  .bpm { display: flex; align-items: center; gap: 8px; }
  .bpm output { font-size: 2.6rem; font-variant-numeric: tabular-nums; min-width: 3ch; text-align: center; }
  button, select, input[type="number"] { font: inherit; min-height: 44px; border-radius: 8px; border: 1px solid #334155; background: #1e293b; color: #e2e8f0; padding: 0 12px; }
  button:focus-visible, select:focus-visible, input:focus-visible { outline: 3px solid #facc15; outline-offset: 2px; }
  #start { background: #16a34a; border: 0; font-size: 1.1rem; }
  #start[aria-pressed="true"] { background: #dc2626; }
  input[type="range"] { width: 100%; accent-color: #facc15; }
  .dots { display: flex; gap: 10px; direction: ltr; }
  .dots span { width: 28px; height: 28px; border-radius: 50%; background: #334155; transition: background 60ms; }
  .dots span.first { border: 2px solid #facc15; }
  .dots span.on { background: #facc15; }
  .row { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
  #msg { color: #94a3b8; min-height: 1.4em; }
</style>
</head>
<body>
<main id="app">
  <h1>مترونوم</h1>
  <div class="bpm">
    <button id="minus" type="button" aria-label="أبطأ">−</button>
    <output id="bpmOut" for="bpm">100</output>
    <button id="plus" type="button" aria-label="أسرع">+</button>
    <span>BPM</span>
  </div>
  <input id="bpm" type="range" min="40" max="240" value="100" aria-label="السرعة بالـ BPM">
  <div class="row">
    <label>الضربات في المازورة
      <select id="beats"><option>2</option><option>3</option><option selected>4</option><option>6</option></select>
    </label>
    <button id="tap" type="button">Tap (t)</button>
  </div>
  <div class="dots" id="dots" aria-hidden="true"></div>
  <button id="start" type="button" aria-pressed="false">ابدأ (مسافة)</button>
  <p id="msg" role="status"></p>
</main>
<script src="metronome.js"></script>
</body>
</html>
~~~

~~~js metronome.js
// metronome.js: الضربات بتتجدول بساعة الصوت، والـ timer بس بيصحّى الجدولة
const $ = (id) => document.getElementById(id);
const LOOKAHEAD_MS = 25;        // الـ timer بيصحى كل 25 ms
const AHEAD_S = 0.1;            // ويجدول أي ضربة جاية في الـ 100 ms الجايين
const state = { bpm: 100, beats: 4, running: false };
let ctx = null, timer = null, nextTime = 0, beat = 0;
const visualQueue = [];         // { beat, time } عشان النور يولع مع الصوت مش مع الجدولة
const log = [];                 // للقياس: كل ضربة اتجدولت امتى

// ١. ضربة واحدة: نغمة قصيرة جدًا، والأولى في المازورة أعلى
function click(time, accent) {
  const osc = ctx.createOscillator(), env = ctx.createGain();
  osc.frequency.value = accent ? 1500 : 1000;
  env.gain.setValueAtTime(0, time);
  env.gain.linearRampToValueAtTime(accent ? 0.5 : 0.3, time + 0.002);
  env.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
  osc.connect(env).connect(ctx.destination);
  osc.start(time);
  osc.stop(time + 0.06);
}

// ٢. الجدولة: كل اللي ميعاده قبل «دلوقتي + 100 ms» يتجدول دلوقتي بميعاده بالظبط
function scheduler() {
  while (nextTime < ctx.currentTime + AHEAD_S) {
    click(nextTime, beat === 0);
    visualQueue.push({ beat, time: nextTime });
    log.push(nextTime);
    nextTime += 60 / state.bpm;
    beat = (beat + 1) % state.beats;
  }
}

// ٣. النور: كل frame نشوف أنهي ضربة ميعادها جه في ساعة الصوت
function drawDots() {
  if (!state.running) return;
  while (visualQueue.length && visualQueue[0].time <= ctx.currentTime) {
    const { beat: b } = visualQueue.shift();
    [...$('dots').children].forEach((d, i) => d.classList.toggle('on', i === b));
  }
  requestAnimationFrame(drawDots);
}
function makeDots() {
  $('dots').replaceChildren(...Array.from({ length: state.beats }, (_, i) => Object.assign(document.createElement('span'), { className: i === 0 ? 'first' : '' })));
}

// ٤. تشغيل وإيقاف
async function start() {
  ctx ??= new AudioContext();
  if (ctx.state === 'suspended') await ctx.resume();
  state.running = true;
  beat = 0;
  nextTime = ctx.currentTime + 0.05;
  visualQueue.length = 0;
  log.length = 0;
  scheduler();
  timer = setInterval(scheduler, LOOKAHEAD_MS);
  requestAnimationFrame(drawDots);
  $('start').textContent = 'وقّف (مسافة)';
  $('start').setAttribute('aria-pressed', 'true');
  $('msg').textContent = 'شغال: ' + state.bpm + ' BPM، ' + state.beats + ' في المازورة';
}
function stop() {
  state.running = false;
  clearInterval(timer);
  [...$('dots').children].forEach((d) => d.classList.remove('on'));
  $('start').textContent = 'ابدأ (مسافة)';
  $('start').setAttribute('aria-pressed', 'false');
  $('msg').textContent = 'واقف';
}
$('start').addEventListener('click', () => (state.running ? stop() : start()));

// ٥. السرعة: range وأزرار، والتغيير بيبان من الضربة الجاية
function setBpm(v) {
  state.bpm = Math.min(240, Math.max(40, Math.round(v)));
  $('bpm').value = state.bpm;
  $('bpmOut').textContent = state.bpm;
}
$('bpm').addEventListener('input', () => setBpm(Number($('bpm').value)));
$('minus').addEventListener('click', () => setBpm(state.bpm - 1));
$('plus').addEventListener('click', () => setBpm(state.bpm + 1));
$('beats').addEventListener('change', () => { state.beats = Number($('beats').value); beat = 0; makeDots(); });

// ٦. Tap tempo: متوسط آخر ٤ فترات، ولو سكت أكتر من ثانيتين نبدأ من جديد
const taps = [];
function tap() {
  const now = performance.now();
  if (taps.length && now - taps[taps.length - 1] > 2000) taps.length = 0;
  taps.push(now);
  if (taps.length > 5) taps.shift();
  if (taps.length >= 2) {
    const gaps = taps.slice(1).map((t, i) => t - taps[i]);
    setBpm(60000 / (gaps.reduce((a, b) => a + b, 0) / gaps.length));
    $('msg').textContent = 'Tap: ' + state.bpm + ' BPM من ' + gaps.length + ' فترة';
  }
}
$('tap').addEventListener('click', tap);

// ٧. الكيبورد: مسافة تشغيل، و t للـ tap، والأسهم ±1 (و Shift ±10)
addEventListener('keydown', (e) => {
  if (e.target.matches('input, select') && e.key !== ' ') return;
  if (e.key === ' ' && !e.target.matches('button')) { e.preventDefault(); $('start').click(); }
  else if (e.key.toLowerCase() === 't') tap();
  else if (e.key === 'ArrowUp') { e.preventDefault(); setBpm(state.bpm + (e.shiftKey ? 10 : 1)); }
  else if (e.key === 'ArrowDown') { e.preventDefault(); setBpm(state.bpm - (e.shiftKey ? 10 : 1)); }
});

// ٨. التاب اتخبى: الـ timers بتبطأ، والصوت المتجدول بيكمّل. لما نرجع نكمّل من غير ما نجدول اللي فات
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && state.running && nextTime < ctx.currentTime) nextTime = ctx.currentTime + 0.05;
});
makeDots();
~~~

## ليه مش [[setInterval(click, 600)]] وخلاص؟

| | [[setInterval]] لوحده | ساعة الصوت + lookahead |
|---|---|---|
| مين بيحدد ميعاد الصوت | الـ timer لما يصحى | [[osc.start(time)]] بميعاد في المستقبل |
| لو الـ main thread مشغول | الصوت بيتأخر مع الـ timer | الصوت متجدول خلاص في thread الصوت |
| اتقاس عند 600 ms، والصفحة مشغولة ١٥٠ ms كل ٤٠٠ | الفترات 608 592 597 607 594 606 (لحد ٨ ms) | 600 بالظبط (0.000000 ms) |

والـ ٨ ms دي والصفحة مشغولة شوية بس؛ صفحة تقيلة (رسم، أو JSON كبير) بتأخر الـ timer أكتر بكتير، والموسيقي بيسمع الإيقاع وهو بيتهز. الطريقة دي اتشرحت في مقال «A Tale of Two Clocks» المشهور، وهي نفس اللي المكتبات الموسيقية بتعمله.

## الشرح

- **[[scheduler()]]:** [[while (nextTime < ctx.currentTime + 0.1)]]: كل ضربة ميعادها في الـ ١٠٠ ms الجايين تتجدول دلوقتي بميعادها بالظبط، و [[nextTime += 60 / bpm]]. الـ timer كل ٢٥ ms، فحتى لو اتأخر ٧٥ ms لسه فيه ضربات متجدولة.
- **[[click(time, accent)]]:** oscillator 1000 Hz (أو 1500 للأولى) بـ envelope ٥٠ ms. صوت قصير جدًا عشان التكة تبقى واضحة.
- **النور مع الصوت مش مع الجدولة:** الجدولة بتحصل قبل الصوت بلحد ١٠٠ ms. لو نوّرنا وقت الجدولة النور هيسبق. فبنحط [[{ beat, time }]] في [[visualQueue]]، و [[requestAnimationFrame]] بينوّر النقطة لما [[ctx.currentTime]] يوصل لـ [[time]].
- **تغيير السرعة** بيبان من الضربة الجاية لوحده، لأن [[nextTime]] بيتحسب من [[state.bpm]] كل مرة.
- **Tap:** آخر ٥ ضغطات (٤ فترات)، والمتوسط ← [[60000 / متوسط ms]]. ولو سكت أكتر من ثانيتين نبدأ عد جديد.
- **الكيبورد على [[window]]** عشان المسافة تشتغل من أي حتة، بس بنسيب الحروف للـ [[input]] و [[select]].
- **[[visibilitychange]]:** لما التاب يرجع ظاهر و [[nextTime]] بقى في الماضي، بنكمّل من دلوقتي بدل ما نجدول كل الضربات اللي فاتت مرة واحدة.

## غلطات وقعت فيها وأنا ببنيها

- **Tap طلّع 110 بدل 120** في أول اختبار: Playwright [[page.click]] كل ٥٠٠ ms بياخد وقت هو كمان (يدوّر على العنصر ويستنى)، فالفترات الحقيقية كانت حوالي ٥٤٥ ms. لما الضغطات اتعملت من جوه الصفحة كل ٥٠٠ ms بـ [[setTimeout]] طلع 118 (الـ timer بيتأخر كام ms). الكود صح، والدرس: الـ tap بيقيس اليوزر بالظبط زي ما داس، وده المطلوب.
- **قرار:** أول ضربة عند [[ctx.currentTime + 0.05]] مش [[ctx.currentTime]] بالظبط، عشان تتجدول في المستقبل دايمًا ومتبقاش ميعادها فات وهي لسه بتتعمل ([[start(time)]] بميعاد فات بيبدأ على طول من غير ما يستنى، من MDN، فالتأخير الصغير ده بيضمن إن كل الضربات بنفس المسافة).

## اتقاس

~~~text الناتج (Chrome 157، Playwright من سيرفر محلي)
ابدأ:                    شغال: 100 BPM، 4 في المازورة
بعد 3.1 ثانية:           ضربات اتجدولت=6 الفترة المطلوبة=600ms أكبر انحراف=0.000000ms
مع main thread مشغول:    ضربات=5 أكبر انحراف في الصوت=0.000000ms
setInterval(600) لوحده:  600.0 600.0 599.8 600.1 (والصفحة فاضية)
                         608 592 597 607 594 606 أكبر انحراف=8ms (والصفحة مشغولة)
tap كل 500ms من جوه الصفحة: Tap: 118 BPM من 4 فترة
Shift+↑ من 110:          120
الضربات 3:               dots=3
الـ preview المعزول:     شغال: 100 BPM، 4 في المازورة، والنقطة بتنوّر
~~~

- **اللي متقاسش:** التاب في الخلفية. وثائق Chrome بتقول الـ timers في التابات المستخبية بتتبطّأ (لحد مرة في الثانية أو أقل)، و ١٠٠ ms lookahead مش هيكفي ساعتها. ده الـ ext رقم ٤.` },
        { lvl: 'فكرة', dir: "photo-booth", t: R`كابينة صور: عد تنازلي وفلاتر وشريط ٤ صور`, what: R`فكرة لحفلة أو فعالية: «افتح الكاميرا»، واختار فلتر (أبيض وأسود، قديم، ألوان قوية)، و «صوّر ٤ صور»: لكل صورة عد ٣ ٢ ١ على الشاشة بصوت تكة، وبعدين فلاش أبيض وصوت أعلى. الـ ٤ صور بيتجمعوا في شريط طولي بهامش أبيض وتاريخ النهارده، وتنزّله PNG. الصورة متقلوبة زي المراية زي الشاشة. ولو الكاميرا مش متاحة، الكابينة بتشتغل على «صورة تجربة» بتتحرك عشان تقدر تجرّب كل حاجة. من دروس «getUserMedia» و «Web Audio API» و «canvas».`, done: R`بالكاميرا: الشريط 324×996 فيه ٤ صور، ومع «أبيض وأسود» pixel من الصورة لونه [[96,96,96]] (رمادي)، والهامش [[255,255,255]]. وجوه الـ preview: «الكاميرا مش متاحة (SecurityError)، فهنصوّر صورة تجربة» والشريط برده بيطلع.`, ext: R`(١) ابعت الشريط بـ [[navigator.share({ files })]] على الموبايل. (٢) إطار PNG شفاف (لوجو الفعالية) يترسم فوق كل صورة. (٣) GIF أو فيديو قصير بـ [[MediaRecorder]] من الـ canvas بدل الصور. (٤) QR code للتحميل من الموبايل لو الكابينة على لابتوب.`, sol: R`## الشكل النهائي

~~~live 560 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>كابينة الصور</title>
<style>
  body { font-family: system-ui, sans-serif; margin: 16px; background: #fdf2f8; color: #500724; }
  main { max-width: 620px; display: grid; gap: 10px; }
  .stage { position: relative; width: 100%; max-width: 480px; aspect-ratio: 4 / 3; background: #111; border-radius: 12px; overflow: hidden; }
  .stage video, .stage canvas { width: 100%; height: 100%; object-fit: cover; display: block; }
  #count { position: absolute; inset: 0; display: grid; place-items: center; font-size: 5rem; color: #fff; text-shadow: 0 2px 8px #000; pointer-events: none; }
  #flash { position: absolute; inset: 0; background: #fff; opacity: 0; pointer-events: none; transition: opacity 250ms; }
  .row { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
  button, select { font: inherit; min-height: 44px; padding: 0 14px; border-radius: 8px; border: 1px solid #f9a8d4; background: #fff; cursor: pointer; }
  #go { background: #be185d; color: #fff; border: 0; }
  #msg { min-height: 1.4em; }
  #strip { max-width: 240px; border-radius: 8px; box-shadow: 0 2px 12px #0003; }
</style>
</head>
<body>
<main>
  <h1>كابينة الصور</h1>
  <div class="stage">
    <video id="cam" muted playsinline hidden></video>
    <canvas id="test" width="640" height="480" hidden></canvas>
    <div id="count" aria-live="assertive"></div>
    <div id="flash"></div>
  </div>
  <div class="row">
    <button id="open" type="button">افتح الكاميرا</button>
    <label>الفلتر
      <select id="filter">
        <option value="none">من غير</option>
        <option value="grayscale(1)">أبيض وأسود</option>
        <option value="sepia(0.9)">قديم</option>
        <option value="contrast(1.4) saturate(1.6)">ألوان قوية</option>
      </select>
    </label>
    <button id="go" type="button" disabled>صوّر ٤ صور</button>
  </div>
  <p id="msg" role="status"></p>
  <img id="strip" alt="شريط الصور" hidden>
  <a id="dl" download="photo-strip.png" hidden>نزّل الشريط</a>
</main>
<script>
const $ = (s) => document.querySelector(s);
const cam = $('#cam'), test = $('#test');
let source = null, stream = null, ctx = null;

// ١. المصدر: الكاميرا، ولو مش متاحة canvas بيتحرك عشان الكابينة تفضل شغالة
function testPattern() {
  const g = test.getContext('2d'), t0 = performance.now();
  (function frame() {
    const s = (performance.now() - t0) / 1000;
    g.fillStyle = 'hsl(' + (s * 40 % 360) + ' 70% 45%)'; g.fillRect(0, 0, 640, 480);
    g.fillStyle = '#fff'; g.beginPath(); g.arc(320 + Math.sin(s * 2) * 160, 240, 70, 0, 7); g.fill();
    g.fillStyle = '#000'; g.font = 'bold 36px sans-serif'; g.textAlign = 'center'; g.fillText('صورة تجربة', 320, 420);
    requestAnimationFrame(frame);
  })();
  test.hidden = false;
  return test;
}
$('#open').addEventListener('click', async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' } });
    cam.srcObject = stream;
    await cam.play();
    cam.hidden = false;
    cam.style.transform = 'scaleX(-1)';                       // مراية زي أي كاميرا أمامية
    source = cam;
    $('#msg').textContent = 'الكاميرا شغالة.';
  } catch (e) {
    source = testPattern();
    $('#msg').textContent = 'الكاميرا مش متاحة (' + e.name + ')، فهنصوّر صورة تجربة.';
  }
  applyFilter();
  $('#go').disabled = false;
  $('#open').disabled = true;
});
// الفلتر على الشاشة: لو المصدر لسه متفتحش، هيتطبّق أول ما يتفتح
const applyFilter = () => { if (source) source.style.filter = $('#filter').value; };
$('#filter').addEventListener('change', applyFilter);

// ٢. صوت العد: Web Audio، من غير ملفات
async function beep(freq, ms) {
  ctx ??= new AudioContext();
  if (ctx.state === 'suspended') await ctx.resume();
  const o = ctx.createOscillator(), g = ctx.createGain(), t = ctx.currentTime;
  o.frequency.value = freq;
  g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.3, t + 0.01); g.gain.exponentialRampToValueAtTime(0.001, t + ms / 1000);
  o.connect(g).connect(ctx.destination); o.start(t); o.stop(t + ms / 1000);
}
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// ٣. صورة واحدة: نفس الفلتر والمراية بتوع الشاشة
function snap() {
  const w = source.videoWidth || source.width, h = source.videoHeight || source.height;
  const c = Object.assign(document.createElement('canvas'), { width: w, height: h });
  const g = c.getContext('2d');
  g.filter = $('#filter').value;
  if (source === cam) { g.translate(w, 0); g.scale(-1, 1); }
  g.drawImage(source, 0, 0, w, h);
  return c;
}

// ٤. العد ٣ ٢ ١ والفلاش، ٤ مرات، وبعدين الشريط
$('#go').addEventListener('click', async () => {
  $('#go').disabled = true;
  const shots = [];
  for (let i = 0; i < 4; i++) {
    for (const n of [3, 2, 1]) { $('#count').textContent = n; beep(660, 120); await wait(700); }
    $('#count').textContent = '';
    beep(1320, 250);
    $('#flash').style.opacity = 1; setTimeout(() => ($('#flash').style.opacity = 0), 120);
    shots.push(snap());
    $('#msg').textContent = 'صورة ' + (i + 1) + ' من ٤';
    await wait(400);
  }
  const W = 300, H = Math.round(W * shots[0].height / shots[0].width), PAD = 12;
  const strip = Object.assign(document.createElement('canvas'), { width: W + PAD * 2, height: (H + PAD) * 4 + PAD + 36 });
  const g = strip.getContext('2d');
  g.fillStyle = '#fff'; g.fillRect(0, 0, strip.width, strip.height);
  shots.forEach((s, i) => g.drawImage(s, PAD, PAD + i * (H + PAD), W, H));
  g.fillStyle = '#500724'; g.font = '18px sans-serif'; g.textAlign = 'center';
  g.fillText(new Date().toLocaleDateString('ar-EG'), strip.width / 2, strip.height - 14);
  strip.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    $('#strip').src = url; $('#strip').hidden = false;
    $('#dl').href = url; $('#dl').hidden = false;
    $('#msg').textContent = 'الشريط جاهز: ' + strip.width + '×' + strip.height + '، ' + Math.round(blob.size / 1024) + ' KB';
    $('#go').disabled = false;
  }, 'image/png');
});
addEventListener('pagehide', () => stream && stream.getTracks().forEach((t) => t.stop()));
</script>
</body>
</html>
~~~

**هتشوف إيه:** مستطيل أسود، و «افتح الكاميرا» واختيار الفلتر و «صوّر ٤ صور». جوه الـ preview: «افتح الكاميرا» بيقول الكاميرا مش متاحة ويشغّل صورة تجربة ألوانها بتتغير ودايرة بيضا بتتحرك. اختار فلتر ودوس «صوّر»: ٣ ٢ ١ كبيرة على الصورة، وفلاش، ٤ مرات، وبعدين الشريط بيظهر تحت. ده نسخة نموذجية لفكرة، وانت حر في التصميم.

## ليه التصميم ده

- **المصدر واحد من اتنين (كاميرا أو canvas)** وباقي الكود مبيفرقش: [[snap()]] بتاخد [[videoWidth || width]]. كده الفكرة بتتجرّب في أي مكان (الـ preview، ولابتوب من غير كاميرا)، والفشل مش نهاية الصفحة.
- **الفلتر واحد في مكانين:** [[style.filter]] على الشاشة (CSS) و [[ctx.filter]] في الصورة (نفس الصيغة بالظبط: [[grayscale(1)]])، فاللي بتشوفه هو اللي بيتصور.
- **المراية:** الشاشة بـ [[transform: scaleX(-1)]]، والصورة بـ [[translate]] و [[scale(-1, 1)]] (تمرين السيلفي في درس getUserMedia). لو صوّرت من غير قلب، الصورة هتطلع عكس اللي اليوزر شافه وهيحس إنها غلط.
- **العد بصوت:** [[beep(660)]] للعد و [[beep(1320)]] للصورة: نفس دالة الـ beep من درس Web Audio. والعد في [[aria-live="assertive"]] عشان قارئ الشاشة يقوله على طول.
- **الشريط:** canvas واحد [[(W + 24) × ((H + 12) × 4 + 48)]]، والصور بنسبة الكاميرا (4:3) مصغّرة لعرض 300. و [[toBlob]] PNG لأن فيه نص وحواف حادة.

## غلطات وقعت فيها وأنا ببنيها

- **اختيار فلتر قبل «افتح الكاميرا» وقّع الصفحة:** [[source.style.filter]] و [[source]] لسه [[null]]: [[Cannot read properties of null (reading 'style')]] (اتقاس). التصليح: [[applyFilter()]] بتشيك [[if (source)]]، وبتتنادى تاني أول ما المصدر يتفتح. بعدها: فلتر «قديم» قبل الفتح ← الكاميرا فتحت و [[style.filter]] = [[sepia(0.9)]].
- **ده مشروع «فكرة»** فالنسخة دي نموذج واحد: مفيهاش حفظ في المتصفح ولا مشاركة (دول الـ ext).

## اتقاس

~~~text الناتج (Chrome 157، Playwright)
بكاميرا وهمية من localhost:  الكاميرا شغالة. ← فلتر أبيض وأسود ← صوّر
                             الشريط جاهز: 324×996، 26 KB
                             pixel صورة 1 (40,40)=96,96,96 | pixel صورة 3 (100,600)=96,96,96 | الهامش (5,5)=255,255,255
جوه الـ preview المعزول:      الكاميرا مش متاحة (SecurityError)، فهنصوّر صورة تجربة.
                             الشريط جاهز: 324×996، 27 KB
~~~

- [[996 = (225 + 12) × 4 + 12 + 36]]: كل صورة 300×225 (نسبة 640×480)، وده يأكد إن الحسبة صح.
- [[96,96,96]]: خلفية الكاميرا الوهمية الخضرا ([[0,144,0]]) بقت رمادي، يعني [[ctx.filter]] اتطبّق على الصورة نفسها مش على الشاشة بس.` },
      ],
      items: [
        {
          cmd: "HTMLMediaElement: play و pause و currentTime والصيغ",
          title: "إزاي تتحكم في audio و video من JavaScript، وتعرف المتصفح هيشغّل أنهي صيغة؟",
          desc: R`[[<audio>]] و [[<video>]] الاتنين من نوع [[HTMLMediaElement]]، فنفس الـ API بيشغّلهم: [[play()]] بيرجّع Promise (ممكن تترفض)، و [[pause()]]، ومفيش [[stop()]] (بتعمله بـ [[pause()]] و [[currentTime = 0]])، و [[currentTime]] للمكان، و [[duration]] للمدة (وهي [[NaN]] لحد [[loadedmetadata]])، و [[volume]] و [[muted]] و [[playbackRate]]، وأحداث بتقولك كل اللي بيحصل.

• الملف = **container** (MP4 أو WebM أو Ogg) جواه **codecs** (فيديو زي H.264 و VP9 و AV1، وصوت زي AAC و Opus و MP3).
• [[canPlayType(type)]] بيرد بـ [["probably"]] أو [["maybe"]] أو [[""]]، و [[navigator.mediaCapabilities.decodingInfo()]] بيقولك كمان هيشتغل smooth وموفّر للبطارية ولا لأ.
• [[play()]] من غير ضغطة من اليوزر بيترفض بـ [[NotAllowedError]]، وده الخطأ اللي لازم تمسكه.`,
          example: R`// media.js: الصفحة فيها <video id="v" src="lesson.webm"> وزرارين #play و #stop
const v = document.querySelector('#v');
console.log(v.duration, v.readyState);
v.addEventListener('loadedmetadata', () => console.log('المدة:', v.duration));
v.addEventListener('ended', () => console.log('خلص'));
document.querySelector('#play').addEventListener('click', async () => {
  try { await v.play(); } catch (e) { console.log(e.name + ': ' + e.message); }
});
document.querySelector('#stop').addEventListener('click', () => { v.pause(); v.currentTime = 0; });
v.playbackRate = 1.5;
console.log(v.canPlayType('video/webm; codecs="vp9, opus"'));`,
          try: R`افتح المختبر الحي في آخر الشرح («مختبر الـ media element»). قبل أي ضغطة اقرا اللوج: [[duration]] كانت كام قبل الـ [[src]]؟ دوس [[play()]] وبعدها [[pause()]] وبعدها «+1s» وبعدها «stop»، وبص على الأحداث اللي ظهرت بالترتيب. وبعدين دوس [[volume = 2]] واقرا الخطأ. آخر حاجة: اختار سرعة 2 وشغّل لحد الآخر: كام [[ended]] ظهر؟ وكان [[paused]] إيه؟`,
          sol: R`~~~text الناتج (نفس المختبر جوه iframe معزول زي الـ preview، Chrome 157، Playwright؛ مختصر: شلنا canplay و playing اللي بيتكرروا)
0ms  قبل الـ src: duration=NaN
20ms  loadedmetadata
65ms  canplay
602ms  play
602ms  playing
603ms  play() اتحقق
1442ms  pause
1476ms  seeking
1476ms  seeked
1709ms  seeking
1709ms  seeked
1933ms  IndexSizeError: Failed to set the 'volume' property on 'HTMLMediaElement': The volume provided (2) is outside the range [0, 1].
1942ms  ratechange
1992ms  play
1993ms  play() اتحقق
3573ms  pause
3573ms  ended

currentTime=3.00 duration=3 paused=true ended=true readyState=4 rate=2
~~~

- [[duration]] كانت [[NaN]] قبل الـ [[src]]: المتصفح لسه ميعرفش حاجة عن الملف. بعد [[loadedmetadata]] بقت [[3]].
- [[play]] و [[playing]] جم قبل ما الـ Promise يتحقق ([[play() اتحقق]]): الأحداث بتتبعت الأول، وبعدها الـ Promise.
- «+1s» و «stop» الاتنين عملوا [[seeking]] ثم [[seeked]]: أي تغيير لـ [[currentTime]] هو seek.
- [[volume = 2]] رمى [[IndexSizeError]]: المسموح من 0 لـ 1 بس.
- في الآخر [[pause]] ثم [[ended]] في نفس اللحظة، و [[paused]] بقت [[true]] لوحدها و [[currentTime]] واقفة على [[3.00]]. الـ 1.6 ثانية بين [[play]] و [[ended]] لأن السرعة 2 (من 0 لـ 3 ثواني في 1.6 ثانية تقريبًا).`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** الكود ده بيتشغّل جوه ضغطة زرار (فالـ autoplay مش مشكلة). إيه اللي هيتطبع؟

~~~js
const v = document.createElement('video');
v.src = 'lesson.webm';
console.log(v.duration, v.paused, typeof v.stop);
const p = v.play();
v.pause();
p.catch((e) => console.log(e.name + ': ' + e.message));
~~~`, done: R`كتبت السطرين قبل ما تشغّل، وعرفت ليه الـ Promise اترفض مع إن مفيش autoplay.`, sol: R`~~~text الناتج (Chrome 157، جوه ضغطة حقيقية)
NaN true undefined
AbortError: The play() request was interrupted by a call to pause(). https://goo.gl/LdLk22
~~~

- [[duration]] بـ [[NaN]] لأن الملف لسه متحمّلش، و [[paused]] بـ [[true]] لأن أي عنصر بيبدأ واقف، و [[stop]] مش موجودة أصلًا ([[undefined]]).
- [[play()]] بيرجّع Promise بيستنى الملف يبقى جاهز. قبل ما يجهز، [[pause()]] لغى الطلب، فالـ Promise اترفض بـ [[AbortError]]. ده مش باج في كودك، بس لو مكتبتش [[catch]] هيظهر [[Uncaught (in promise)]] في الـ Console.
- ونفس الكلام لو غيّرت الـ [[src]] أو عملت [[load()]] وانت مستني: [[AbortError: The play() request was interrupted by a new load request.]] (اتجرّب).
- القاعدة: كل [[play()]] ليه [[catch]]، و [[AbortError]] بالذات تجاهله، و [[NotAllowedError]] اعرض بسببه زرار «شغّل».` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من صفحة [[HTMLMediaElement]] على MDN: [[readyState]] بياخد ٥ قيم و [[networkState]] بياخد ٤. اكتب اسم كل قيمة ورقمها ومعناها في كلمتين، وبعدين اتأكد من الأرقام من الـ Console.`, done: R`عندك جدول بالـ ٩ ثوابت، والأرقام اللي في الـ Console طابقت.`, sol: R`~~~js
console.log(['HAVE_NOTHING', 'HAVE_METADATA', 'HAVE_CURRENT_DATA', 'HAVE_FUTURE_DATA', 'HAVE_ENOUGH_DATA',
  'NETWORK_EMPTY', 'NETWORK_IDLE', 'NETWORK_LOADING', 'NETWORK_NO_SOURCE'].map((k) => k + '=' + HTMLMediaElement[k]).join(' '));
~~~

~~~text الناتج (Chrome 157)
HAVE_NOTHING=0 HAVE_METADATA=1 HAVE_CURRENT_DATA=2 HAVE_FUTURE_DATA=3 HAVE_ENOUGH_DATA=4 NETWORK_EMPTY=0 NETWORK_IDLE=1 NETWORK_LOADING=2 NETWORK_NO_SOURCE=3
~~~

| الثابت | معناه |
|---|---|
| [[HAVE_NOTHING]] (0) | لسه ميعرفش أي حاجة عن الملف |
| [[HAVE_METADATA]] (1) | عرف المدة والمقاس، ده وقت [[loadedmetadata]] |
| [[HAVE_CURRENT_DATA]] (2) | عنده الـ frame الحالي بس، مش اللي بعده |
| [[HAVE_FUTURE_DATA]] (3) | عنده كفاية يبدأ يشغّل شوية ([[canplay]]) |
| [[HAVE_ENOUGH_DATA]] (4) | متوقع يشغّل للآخر من غير ما يقف ([[canplaythrough]]) |
| [[NETWORK_EMPTY]] (0) | العنصر لسه متعملوش أي ملف |
| [[NETWORK_IDLE]] (1) | اختار ملف ومش بيحمّل دلوقتي |
| [[NETWORK_LOADING]] (2) | بيحمّل دلوقتي من الشبكة |
| [[NETWORK_NO_SOURCE]] (3) | ملقاش ولا ملف يشغّله، ودي اللي هنقابلها في درس الأخطاء |

الاستخدام العملي: [[if (v.readyState >= HTMLMediaElement.HAVE_METADATA)]] قبل ما تقرا [[duration]]، بدل ما تستنى حدث فات خلاص.` },
            { lvl: 'تطبيق', t: R`**مسألة:** اكتب [[formatTime(seconds)]] اللي بترجّع الوقت زي المشغّلات: [[75.4]] تبقى [["1:15"]]، و [[3725.9]] تبقى [["1:02:05"]]، و [[NaN]] و [[Infinity]] والسالب يبقوا [["--:--"]] (عشان [[duration]] بتبقى كده قبل الـ metadata وفي البث المباشر). جرّبها في المربع تحت.`, done: R`الاختبارات كلها عدّت، ومنهم [[3599]] = [["59:59"]] و [[3600]] = [["1:00:00"]] و [[9.99]] = [["0:09"]] (مش بتقرّب لفوق).`, sol: R`~~~js
function formatTime(s) {
  if (!Number.isFinite(s) || s < 0) return '--:--';
  s = Math.floor(s);
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = String(s % 60).padStart(2, '0');
  return h ? h + ':' + String(m).padStart(2, '0') + ':' + sec : m + ':' + sec;
}
for (const x of [0, 9.99, 75.4, 600, 3599, 3600, 3725.9, NaN, Infinity, -3]) console.log(String(x).padEnd(8), formatTime(x));
~~~

~~~text الناتج (Node 24.22)
0        0:00
9.99     0:09
75.4     1:15
600      10:00
3599     59:59
3600     1:00:00
3725.9   1:02:05
NaN      --:--
Infinity --:--
-3       --:--
~~~

- [[Number.isFinite]] بيرفض [[NaN]] و [[Infinity]] مع بعض، وده اللي [[duration]] بترجّعه في الحالتين الغريبتين.
- [[Math.floor]] مش [[Math.round]]: المشغّلات بتعرض الثانية اللي انت فيها، فـ [[9.99]] لسه [[0:09]]. لو قرّبت، العداد هيقول [[0:10]] قبل ما الثانية العاشرة تبدأ.
- الدقايق بتتملى بصفر بس لو فيه ساعات ([[1:02:05]])، غير كده [[1:15]] مش [[01:15]]: ده شكل YouTube.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الصفحة دي عايزة تشغّل موسيقى خلفية أول ما تفتح. في الـ Console بيظهر خطأ أحمر، والزرار «شغّل» مش بيظهر خالص. صلّحها بحيث لو التشغيل اترفض يظهر الزرار، والضغط عليه يشغّل.

~~~html
<audio id="bg" src="music.mp3" loop></audio>
<button id="start" hidden>شغّل الموسيقى</button>
<script>
  const bg = document.querySelector('#bg');
  bg.play();
  document.querySelector('#start').hidden = !bg.paused;
</script>
~~~`, done: R`لما تفتح الصفحة الزرار بيظهر ومفيش خطأ أحمر، والضغط عليه بيشغّل ويخفي الزرار.`, sol: R`~~~html
<audio id="bg" src="music.mp3" loop></audio>
<button id="start" hidden>شغّل الموسيقى</button>
<script>
  const bg = document.querySelector('#bg');
  const btn = document.querySelector('#start');
  bg.play().catch((e) => {
    if (e.name === 'NotAllowedError') btn.hidden = false;
  });
  btn.addEventListener('click', async () => {
    await bg.play();
    btn.hidden = true;
  });
</script>
~~~

~~~text الخطأ قبل التصليح (Chrome 157، صفحة اتفتحت ومحدش لمسها)
Uncaught (in promise) NotAllowedError: play() failed because the user didn't interact with the document first. https://goo.gl/xX8pDD
~~~

- **الغلطة الأولى:** [[bg.play()]] من غير [[catch]]. الرفض بيبقى Promise مترفض ومحدش ماسكه، فبيظهر [[Uncaught (in promise)]].
- **الغلطة التانية:** [[bg.paused]] اتقرت في نفس اللحظة، قبل ما المتصفح يقرر. [[play()]] async: [[paused]] بتبقى [[false]] لحظيًا وبعدين ترجع [[true]] لما الرفض يحصل، فالزرار فضل مستخبي. القرار لازم يبقى جوه [[catch]].
- ليه بنشيك على [[NotAllowedError]] بالاسم؟ عشان [[AbortError]] (حد غيّر الـ [[src]]) مش محتاج زرار.
- اللي اتقاس في الـ lab: نفس الفكرة على [[<video>]] فيه صوت = نفس الرفض، و [[<video muted>]] = اشتغل من غير ضغطة.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** [[timeupdate]] بيتبعت كام مرة في الثانية؟ شغّل فيديو ثانيتين بسرعة 1 ومرة بسرعة 2، وعدّ [[timeupdate]] وعدّ [[requestAnimationFrame]] في نفس الوقت. بعدين قرر: شريط وقت ناعم يتحدث من أنهي واحد؟`, done: R`عندك ٤ أرقام من متصفحك، وقرار بسبب.`, sol: R`~~~js
// جوه ضغطة زرار، والفيديو muted وجاهز (canplaythrough)
async function measure(v, rate) {
  v.currentTime = 0; v.playbackRate = rate;
  let tu = 0, raf = 0, go = true;
  const h = () => tu++;
  v.addEventListener('timeupdate', h);
  const loop = () => { if (go) { raf++; requestAnimationFrame(loop); } };
  requestAnimationFrame(loop);
  await v.play();
  await new Promise((r) => setTimeout(r, 2000));
  v.pause(); go = false; v.removeEventListener('timeupdate', h);
  console.log('rate ' + rate + ': timeupdate=' + tu + ' requestAnimationFrame=' + raf + ' currentTime=' + v.currentTime.toFixed(2));
}
~~~

~~~text الناتج (Chrome 157، ثانيتين لكل سرعة)
rate 1: timeupdate=8 requestAnimationFrame=124 currentTime=1.95
rate 2: timeupdate=9 requestAnimationFrame=120 currentTime=3.90
~~~

- [[timeupdate]] حوالي **٤ مرات في الثانية** (كل ٢٥٠ ms)، ومش بيتغيّر مع السرعة: في سرعة 2 الفيديو مشي ٣.٩ ثانية والحدث جه ٩ مرات بس. الـ spec بيقول بين ١٥ و ٢٥٠ ms، و Chrome بياخد الطرف البطيء.
- [[requestAnimationFrame]] ٦٠ مرة في الثانية (على شاشة 60Hz).
- **القرار:** النص [[1:15 / 3:20]] من [[timeupdate]] كفاية (بيتغيّر كل ثانية أصلًا). شريط تقدّم بيتحرك ناعم أو كاريوكي أو ترجمة بتتلوّن كلمة كلمة: من [[requestAnimationFrame]] وتقرا [[currentTime]] جواه، وتوقفه في [[pause]].` },
            { lvl: 'تحدي', t: R`**ابني:** [[pickSource(list)]] بتاخد لستة [[{ src, type }]] وترجّع أول واحد المتصفح رده عليه [["probably"]]، ولو مفيش فأول [["maybe"]]، ولو مفيش ترجّع [[null]]. جرّبها على: [[video/quicktime]] و [[video/ogg; codecs="theora"]] و [[video/x-matroska]] و WebM بـ AV1 و MP4 بـ H.264. وبعدين اكتب في سطر: ليه ترتيب اللستة نفسه مهم؟`, done: R`على Chrome بترجّع الـ WebM، ولما تشيل كل اللي [["probably"]] بترجّع الـ mkv، ولما تسيب [[quicktime]] بس بترجّع [[null]].`, sol: R`~~~js
function pickSource(list) {
  const probe = document.createElement('video');
  return list.find((s) => probe.canPlayType(s.type) === 'probably')
    || list.find((s) => probe.canPlayType(s.type) === 'maybe')
    || null;
}
const list = [
  { src: 'lesson.mov', type: 'video/quicktime' },
  { src: 'lesson.ogv', type: 'video/ogg; codecs="theora"' },
  { src: 'lesson.mkv', type: 'video/x-matroska' },
  { src: 'lesson.webm', type: 'video/webm; codecs="av01.0.05M.08, opus"' },
  { src: 'lesson.mp4', type: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' },
];
console.log(pickSource(list));
console.log(pickSource([list[0], list[2]]));
console.log(pickSource([list[0]]));
~~~

~~~text الناتج (Chrome 157)
{ src: 'lesson.webm', type: 'video/webm; codecs="av01.0.05M.08, opus"' }
{ src: 'lesson.mkv', type: 'video/x-matroska' }
null
~~~

- الـ WebM بـ AV1 والـ MP4 بـ H.264 الاتنين [["probably"]]، فكسب اللي قبل في اللستة. **الترتيب هو الأولوية:** حط الأصغر حجمًا (AV1 ثم VP9) الأول، والأوسع انتشارًا (H.264) في الآخر كاحتياطي. نفس قاعدة [[<source>]] في HTML.
- [[video/x-matroska]] من غير codecs = [["maybe"]]: النوع معروف بس ممكن يكون جواه حاجة مش مدعومة.
- [[quicktime]] و Theora = [[""]] على Chrome 157: فاضي يعني «لأ أكيد».
- [["probably"]] مش وعد: الملف ممكن يبقى بايظ أو تقيل على الجهاز. الضمان الحقيقي هو حدث [[error]] (درس الأخطاء) و [[decodingInfo]] للـ smooth.` },
          ],
          check: { lang: "js", starter: R`function formatTime(s) {
  // 75.4 => "1:15"، 3725.9 => "1:02:05"، NaN أو Infinity أو سالب => "--:--"
}`, tests: R`test("صفر", () => expect(formatTime(0)).toBe("0:00"));
test("ثواني بس ومن غير تقريب لفوق", () => expect(formatTime(9.99)).toBe("0:09"));
test("دقيقة وشوية", () => expect(formatTime(75.4)).toBe("1:15"));
test("آخر ثانية قبل الساعة", () => expect(formatTime(3599)).toBe("59:59"));
test("ساعة بالظبط", () => expect(formatTime(3600)).toBe("1:00:00"));
test("ساعة ودقيقتين", () => expect(formatTime(3725.9)).toBe("1:02:05"));
test("NaN قبل الـ metadata", () => expect(formatTime(NaN)).toBe("--:--"));
test("Infinity في البث", () => expect(formatTime(Infinity)).toBe("--:--"));
test("سالب", () => expect(formatTime(-3)).toBe("--:--"));`, solution: R`function formatTime(s) {
  if (!Number.isFinite(s) || s < 0) return '--:--';
  s = Math.floor(s);
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = String(s % 60).padStart(2, '0');
  return h ? h + ':' + String(m).padStart(2, '0') + ':' + sec : m + ':' + sec;
}` },
          flag: "script",
          deep: {
            why: R`[[controls]] في HTML بيدّيك مشغّل جاهز، بس مجرد ما تحتاج حاجة واحدة زيادة (زرار «قدّم ١٠ ثواني»، أو تفتكر مكان اليوزر، أو تشغّل صوت لما حاجة تحصل، أو تعرف الفيديو خلص عشان تفتح الدرس اللي بعده) لازم تكلّم العنصر من JavaScript. و [[HTMLMediaElement]] هو الـ API الوحيد لده، وكل مكتبة مشغّلات (Video.js و Plyr و hls.js) فوقه. والصيغ مهمة لأن مفيش صيغة واحدة شغالة بنفس الكفاءة في كل مكان: AV1 أصغر بكتير بس أتقل على الأجهزة القديمة، و H.264 في كل حتة بس أكبر.`,
            how: R`لما تحط [[src]]، المتصفح بيبدأ «resource selection»: بيطلب الملف (بـ [[Range: bytes=0-]] زي ما شفنا في لوج السيرفر)، ويقرا الـ header بتاع الـ container عشان يعرف المدة والمقاس والـ codecs. ساعتها [[readyState]] بيبقى 1 ويتبعت [[loadedmetadata]]. بعدين بيفك (decode) أول frames ويبقى 2 ثم 3 ([[canplay]]) ثم 4 ([[canplaythrough]]) لما يحسب إن التحميل أسرع من التشغيل.

[[play()]] بيتحقق من سياسة الـ autoplay (لازم ضغطة، أو العنصر [[muted]] لو فيديو)، ولو مسموح بيبعت [[play]] على طول، ولما الداتا تكفي يبعت [[playing]] ويحقق الـ Promise. أثناء التشغيل [[currentTime]] بيزيد بالسرعة [[playbackRate]] وبيتبعت [[timeupdate]] كل حوالي ٢٥٠ ms. لو الداتا خلصت قبل الوقت: [[waiting]]، ولما ترجع: [[playing]] تاني. وأي كتابة في [[currentTime]] = seek: [[seeking]] ثم [[seeked]]، والقيمة بتتقص على [[0]] و [[duration]]. في الآخر: [[paused]] تبقى [[true]] ويتبعت [[pause]] ثم [[ended]].`,
            when: R`كل ما تحتاج تتحكم أو تعرف: زراير خاصة، وحفظ المكان، وتشغيل الدرس اللي بعده عند [[ended]]، وتحليلات (اتفرج قد إيه)، وأصوات تنبيه صغيرة بـ [[new Audio('ding.mp3')]]، وتشغيل/إيقاف فيديو لما يظهر في الشاشة (مع [[IntersectionObserver]]). واسأل [[canPlayType]] لما بتختار ملف من JavaScript (مش من [[<source>]])، و [[decodingInfo]] لما عندك أكتر من جودة وعايز تختار اللي مش هيقطّع.`,
            mistakes: R`- [[v.play()]] من غير [[catch]]: [[Uncaught (in promise) NotAllowedError]] في الـ Console، واليوزر مش عارف إن فيه زرار المفروض يدوسه.
- تقرا [[duration]] على طول بعد [[src]]: [[NaN]]. استنى [[loadedmetadata]] أو شيك [[readyState >= 1]].
- تدوّر على [[stop()]]: مش موجودة ([[TypeError: v.stop is not a function]]). [[pause()]] و [[currentTime = 0]].
- [[v.volume = 2]] أو [[-0.1]]: [[IndexSizeError]]. استخدم [[Math.min(Math.max(x, 0), 1)]].
- [[playbackRate = 20]] أو بالسالب: [[NotSupportedError]] في Chrome. المسموح اتقاس من [[0.0625]] لـ [[16]]، و [[0]] مسموح وبيوقّف الوقت من غير ما يبعت [[pause]].
- تحدّث شريط ناعم من [[timeupdate]]: هيتنطط ٤ مرات في الثانية.
- تفتكر [[canPlayType('video/mp4')]] = [["probably"]] كفاية: من غير codecs هو [["maybe"]] بس، وممكن الملف يبقى HEVC والجهاز ميعرفش يفكه.`,
          },
          teach: R`## الفكرة في سطر

[[<audio>]] و [[<video>]] نفس الـ object من جوه ([[HTMLMediaElement]])، وانت بتكلمه بـ methods (أوامر) وخصائص (حالة) وأحداث (أخبار). كل الناتج هنا من Chrome 157 على ويندوز 11، شغّال بـ Playwright على سيرفر [[node:http]] محلي، والملفات اتعملت في الـ lab نفسه: [[tone.wav]] (٣ ثواني 440Hz اتكتب بـ Node و [[DataView]])، و [[clip.webm]] و [[clip.mp4]] (canvas بيتحرك اتسجّل بـ [[MediaRecorder]]، درس التسجيل).

---

## ١. الصيغة = container + codecs

لما تقول «ملف MP4» انت بتتكلم عن **الصندوق** (container) بس. جواه **streams**: فيديو متضغوط بـ codec، وصوت متضغوط بـ codec تاني، وأحيانًا ترجمة. الـ codec (coder/decoder) هو طريقة الضغط نفسها.

| الـ container | الامتداد والـ MIME | بيشيل عادةً |
|---|---|---|
| MP4 | [[.mp4]] و [[video/mp4]] و [[audio/mp4]] | فيديو H.264 أو HEVC أو AV1، وصوت AAC أو Opus |
| WebM | [[.webm]] و [[video/webm]] و [[audio/webm]] | فيديو VP8 أو VP9 أو AV1، وصوت Opus أو Vorbis |
| Ogg | [[.ogg]] و [[.ogv]] و [[audio/ogg]] | صوت Opus أو Vorbis (فيديو Theora قديم ومبقاش مدعوم في Chrome) |
| MP3 و WAV و FLAC | [[audio/mpeg]] و [[audio/wav]] و [[audio/flac]] | الملف هو الـ codec نفسه تقريبًا: صوت بس |

| codec فيديو | بيتميز بإيه |
|---|---|
| H.264 (AVC) | شغال في كل جهاز تقريبًا وفيه hardware decoding، بس أكبر حجمًا |
| HEVC (H.265) | أصغر من H.264 بحوالي النص، بس براءات اختراع فدعمه بيعتمد على الجهاز |
| VP9 | من Google ومن غير رسوم، أصغر من H.264، و YouTube بيستخدمه كتير |
| AV1 | الأحدث ومن غير رسوم وأصغر واحد، بس فكه تقيل على الأجهزة اللي مفيهاش hardware له |

| codec صوت | بيتميز بإيه |
|---|---|
| AAC | الافتراضي مع MP4 وشغال في كل مكان |
| Opus | الأحسن جودة في الحجم الصغير، وهو اللي المكالمات و [[MediaRecorder]] بيستخدموه |
| MP3 | قديم وأكبر، بس كل حاجة بتشغّله |
| FLAC و WAV | من غير فقد (lossless): جودة كاملة وحجم كبير |

**الخلاصة العملية:** ملف واحد يشغّل في كل حتة = MP4 بـ H.264 و AAC. ولو عايز توفّر باندويدث: WebM بـ AV1 أو VP9 الأول، و MP4 بعده كاحتياطي.

---

## ٢. [[canPlayType]]: اسأل قبل ما تحمّل

~~~js
const v = document.createElement('video');
console.log(v.canPlayType('video/webm; codecs="vp9, opus"'));
~~~

بيرد بواحدة من ٣: [["probably"]] (غالبًا هيشتغل)، أو [["maybe"]] (النوع معروف بس محتاج أشوف الملف)، أو [[""]] (لأ). ده اللي Chrome 157 رد بيه:

~~~text الناتج (Chrome 157)
"maybe"    video/mp4
"probably" video/mp4; codecs="avc1.42E01E, mp4a.40.2"
"probably" video/mp4; codecs="hvc1.1.6.L93.B0"
"maybe"    video/webm
"probably" video/webm; codecs="vp9, opus"
"probably" video/webm; codecs="av01.0.05M.08, opus"
""         video/ogg; codecs="theora"
"maybe"    video/x-matroska
""         video/quicktime
"maybe"    application/vnd.apple.mpegurl
""         application/dash+xml
"probably" audio/mpeg
"probably" audio/ogg; codecs="opus"
"probably" audio/flac
"maybe"    audio/wav
""         video/webm; codecs="vp9, nope"
~~~

- **من غير [[codecs]]** الرد أقصاه [["maybe"]]: [[video/mp4]] لوحده ممكن يبقى جواه أي حاجة.
- الأرقام في [[avc1.42E01E]] بتحدد الـ profile والـ level (هنا Baseline 3.0)، وده اللي بيخلي المتصفح يقدر يقول [["probably"]]. أداة زي [[ffprobe]] أو MediaInfo بتطلّعهولك من الملف.
- **codec واحد مش معروف بيبوّظ السطر كله:** [[vp9, nope]] رجع [[""]].
- [[application/vnd.apple.mpegurl]] (HLS) طلع [["maybe"]] على Chrome 157 للديسكتوب، يعني Chrome بقى بيفهم HLS بنفسه. ده على المتصفح اللي اتقاس، ومتعتمدش عليه في متصفحات تانية: [[hls.js]] لسه هو الطريق المضمون (آخر الوحدة).
- [[canPlayType]] مبيحمّلش حاجة ومبيضمنش إن الملف نفسه سليم.

---

## ٣. [[MediaCapabilities.decodingInfo]]: هيشتغل كويس؟

[[canPlayType]] بيقول «أعرف أفكه». [[decodingInfo]] بيقول كمان: **smooth** (من غير ما يقطّع) و **powerEfficient** (بالـ hardware، فالبطارية مش هتخلص):

~~~js
const r = await navigator.mediaCapabilities.decodingInfo({
  type: 'file',
  video: { contentType: 'video/mp4; codecs="av01.0.08M.08"', width: 1920, height: 1080, bitrate: 3e6, framerate: 30 },
});
console.log(r.supported, r.smooth, r.powerEfficient);
~~~

~~~text الناتج (Chrome 157 على لابتوب ويندوز)
H.264 1080p  supported=true smooth=true powerEfficient=true
VP9 1080p    supported=true smooth=true powerEfficient=true
AV1 1080p    supported=true smooth=true powerEfficient=false
VP9 4K 60    supported=true smooth=true powerEfficient=true
HEVC 1080p   supported=true smooth=true powerEfficient=true
~~~

- [[type: 'file']] للملفات العادية، و [['media-source']] لو هتشغّل بـ MSE (آخر الوحدة).
- AV1 على الجهاز ده شغال وناعم بس **مش** موفّر: بيتفك بالـ CPU. على موبايل ده معناه سخونة وبطارية، فممكن تختار VP9 هنا حتى لو AV1 أصغر.
- **كل الحقول مطلوبة:** نسيت [[bitrate]] = [[TypeError: Failed to execute 'decodingInfo' on 'MediaCapabilities': Failed to read the 'video' property from 'MediaConfiguration': Failed to read the 'bitrate' property from 'VideoConfiguration': Required member is undefined.]]
- النتيجة بتختلف من جهاز لجهاز، وده المقصود: انت بتسأل جهاز اليوزر نفسه.

---

## ٤. [[readyState]] و [[duration]]: المتصفح يعرف إيه دلوقتي

~~~text الناتج (Chrome 157، video.src = clip.webm)
قبل: duration=NaN readyState=0 paused=true typeof stop=undefined
loadedmetadata: duration=5.975858 readyState=4 320x180
~~~

- قبل الـ metadata: [[duration]] = [[NaN]] و [[readyState]] = 0 ([[HAVE_NOTHING]]). أي حساب زي [[currentTime / duration]] هيطلع [[NaN]].
- بعد [[loadedmetadata]]: المدة والمقاس ([[videoWidth]] و [[videoHeight]]). الملف صغير ومحلي فـ [[readyState]] وصل 4 على طول، وعلى نت بطيء هتشوفه 1 الأول.
- [[duration]] ممكن تبقى [[Infinity]]: في البث المباشر، وفي ملف WebM اتسجّل بـ [[MediaRecorder]] على حتت (درس التسجيل: النسخة الأولى من [[clip.webm]] كانت كده بالظبط).

---

## ٥. [[play()]] بيرجّع Promise

~~~text الناتج (Chrome 157، صفحة بتنادي play() أول ما تفتح، ومحدش داس)
auto: NotAllowedError: play() failed because the user didn't interact with the document first. https://goo.gl/xX8pDD
audio auto: NotAllowedError: play() failed because the user didn't interact with the document first. https://goo.gl/xX8pDD
muted video auto: اشتغل
---- بعد ضغطة على زرار ----
بعد الضغط: اشتغل paused=false
race بعد الضغط: AbortError: The play() request was interrupted by a call to pause(). https://goo.gl/LdLk22
load أثناء play: AbortError: The play() request was interrupted by a new load request. https://goo.gl/LdLk22
~~~

- **[[NotAllowedError]]**: سياسة الـ autoplay (درس «audio و source» شرحها من ناحية HTML). من JavaScript انت بتعرف بالرفض ده، فاعرض زرار.
- **[[<video muted>]]** مسموح يشتغل لوحده، وده اللي فيديو الخلفية بيعتمد عليه.
- **[[AbortError]]**: حد قاطع الطلب ([[pause()]] أو [[load()]] أو [[src]] جديد). مش مشكلة، بس امسكه عشان الـ Console يفضل نضيف.
- ملحوظة اختبار: [[page.evaluate]] في Playwright و [[evaluate_script]] في DevTools بيتحسبوا ضغطة يوزر، فالـ [[play()]] منهم بيعدّي. عشان تقيس الرفض الحقيقي، النداء لازم يبقى من سكربت الصفحة نفسها، وده اللي اتعمل هنا.

---

## ٦. [[pause()]]، ومفيش [[stop()]]

~~~js
v.pause();
v.currentTime = 0;
~~~

~~~text الناتج (Chrome 157)
قبل: duration=NaN readyState=0 paused=true typeof stop=undefined
TypeError: v.stop is not a function
pause() returned undefined
stop() بإيدنا: paused=true t=0
~~~

[[pause()]] بيرجّع [[undefined]] مش Promise، والوقفة فورية. الـ «stop» في أي مشغّل هو السطرين دول.

---

## ٧. [[currentTime]] والـ seeking

~~~text الناتج (Chrome 157، clip.webm مدته 5.98)
currentTime = 2       => seeking ثم seeked، currentTime=2
currentTime = 999     => 5.975858 (اتقص على duration)، ended=false لأن الفيديو كان واقف
currentTime = -5      => 0
buffered=0.00-5.98 seekable=0.00-5.98 played=0.00-0.94
~~~

- القيمة بالثواني ككسر ([[2.5]] = ثانيتين ونص)، والمتصفح بيقصها على [[0]] و [[duration]] من غير error.
- [[buffered]] (اللي اتحمّل) و [[seekable]] (اللي ينفع تروحله) و [[played]] (اللي اتشغّل فعلًا) من نوع [[TimeRanges]]: [[length]] وفيها [[start(i)]] و [[end(i)]]. [[played]] هي اللي بتعمل منها «اتفرج على كام في المية».
- [[seekable]] فاضية = مش هتعرف تقدّم، ودي مشكلة سيرفر (درس الأخطاء: الـ Range).
- [[fastSeek()]] (seek تقريبي أسرع) [[undefined]] في Chrome 157، موجودة في Firefox و Safari (من MDN).

---

## ٨. [[volume]] و [[muted]] و [[playbackRate]]

~~~text الناتج (Chrome 157)
volume=2 => IndexSizeError: Failed to set the 'volume' property on 'HTMLMediaElement': The volume provided (2) is outside the range [0, 1].
volume=-0.1 => IndexSizeError: ... The volume provided (-0.1) is outside the range [0, 1].
playbackRate=20 => NotSupportedError: Failed to set the 'playbackRate' property on 'HTMLMediaElement': The provided playback rate (20) is not in the supported playback range.
playbackRate=-1 => NotSupportedError: ... The provided playback rate (-1) is not in the supported playback range.
playbackRate=0 => 0
playbackRate=16 => 16
playbackRate=0.0625 => 0.0625
muted=true => volume لسه 1
preservesPitch=true defaultPlaybackRate=1
~~~

- [[volume]] من 0 لـ 1، و [[muted]] منفصلة عنها: الكتم مبيمسحش مستوى الصوت، فلما تفك الكتم بيرجع زي ما كان.
- [[playbackRate]] في Chrome من [[0.0625]] (١/١٦) لـ [[16]]، والسالب (تشغيل لورا) مش مدعوم. [[preservesPitch]] [[true]] افتراضيًا: سرعة 2 مش هتخلي الصوت رفيع.
- [[defaultPlaybackRate]] السرعة اللي بيرجعلها بعد [[load()]]، و [[playbackRate]] الحالية.
- كل تغيير بيبعت [[volumechange]] أو [[ratechange]]: حدّث الواجهة منهم، مش من الزرار (الدرس الجاي).

---

## ٩. الأحداث بالترتيب

ده لوج حقيقي لفيديو بيتشغّل، يتوقف، يعمل seek، ويخلص:

~~~text الناتج (Chrome 157، clip.webm، مختصر: شلنا canplay و canplaythrough اللي بيتكرروا بعد كل seek)
play() returned [object Promise]
promise resolved paused=false
1008ms pause t=2.00
1008ms seeking t=2.00
1018ms seeked t=2.00
1036ms seeking t=3.50
1036ms ratechange t=3.50
1036ms play t=3.50
1036ms waiting t=3.50
1038ms seeked t=3.50
1038ms playing t=3.50
2382ms pause t=5.98
2382ms ended t=5.98
after ended paused=true ended=true t=5.975858
2383ms seeking t=0.00
2383ms play t=0.00
play after ended => t=0.00
~~~

| الحدث | بيتبعت إمتى | بتستخدمه في |
|---|---|---|
| [[loadedmetadata]] | المدة والمقاس اتعرفوا | تظبط [[max]] بتاع شريط الوقت وتعرض المدة |
| [[canplay]] و [[canplaythrough]] | فيه داتا تكفي تبدأ، أو تكفي للآخر | تشيل علامة «بيحمّل» |
| [[play]] | [[play()]] اتقبل (لسه ممكن يستنى داتا) | تغيّر الزرار لـ «وقّف» |
| [[playing]] | الصورة والصوت بيتحركوا فعلًا | تشيل الـ spinner بعد [[waiting]] |
| [[pause]] | وقف، بإيدك أو لأنه خلص | تغيّر الزرار لـ «شغّل» |
| [[waiting]] | وقف غصب عنه عشان الداتا خلصت | تعرض spinner |
| [[timeupdate]] | كل حوالي ٢٥٠ ms أثناء التشغيل، ومع كل seek | تحدّث الوقت والشريط |
| [[seeking]] و [[seeked]] | بداية ونهاية الانتقال | تعرف إمتى المكان الجديد جاهز |
| [[ended]] | وصل للآخر (ومفيش [[loop]]) | تشغّل اللي بعده أو تعرض «إعادة» |
| [[ratechange]] و [[volumechange]] | السرعة أو الصوت أو الكتم اتغيروا | تحدّث الأزرار |
| [[error]] | الملف فشل (الدرس الجاي بعده) | تعرض رسالة وبديل |

- [[waiting]] ظهر لحظيًا بعد seek لمكان جديد، و [[playing]] جه بعده بـ ٢ ms: الملف محلي. على نت بطيء المسافة دي هي اللي بتشوف فيها الـ spinner.
- من 3.5 للآخر (5.98) بسرعة 2 خد 1.35 ثانية تقريبًا (من 1036 لـ 2382 ms): السرعة بتأثر على الوقت الحقيقي زي ما متوقع.
- بعد [[ended]]، [[play()]] تاني بيعمل seek لـ [[0]] لوحده ويبدأ من الأول.

---

## ١٠. المختبر الحي

الصوت بيتعمل في الذاكرة كملف WAV (نفس [[DataView]] من درس «DataView»)، فمفيش ملفات. دوس الأزرار وشوف الأحداث:

~~~live 420 مختبر الـ media element
<style>
  body { font-family: system-ui, sans-serif; margin: 12px; }
  .row { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 8px; }
  button, select { font: inherit; min-height: 40px; padding: 0 12px; }
  #state { font-family: monospace; background: #f1f5f9; padding: 8px; direction: ltr; text-align: left; }
  #log { font-family: monospace; font-size: 13px; height: 150px; overflow: auto; background: #0f172a; color: #e2e8f0; padding: 8px; direction: ltr; text-align: left; margin: 0; }
</style>
<div class="row">
  <button id="play">play()</button>
  <button id="pause">pause()</button>
  <button id="stop">stop (pause + 0)</button>
  <button id="back">−1s</button>
  <button id="fwd">+1s</button>
  <select id="rate" aria-label="السرعة"><option>0.5</option><option selected>1</option><option>2</option></select>
  <button id="loud">volume = 2</button>
</div>
<p id="state">…</p>
<pre id="log"></pre>
<script>
  // صوت ٣ ثواني بيتعمل في الذاكرة (WAV): الصفحة مش محتاجة ملفات
  function makeWav(seconds, freq, rate = 8000) {
    const n = seconds * rate, buf = new ArrayBuffer(44 + n * 2), v = new DataView(buf);
    const str = (o, s) => [...s].forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)));
    str(0, 'RIFF'); v.setUint32(4, 36 + n * 2, true); str(8, 'WAVE'); str(12, 'fmt ');
    v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
    v.setUint32(24, rate, true); v.setUint32(28, rate * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true);
    str(36, 'data'); v.setUint32(40, n * 2, true);
    for (let i = 0; i < n; i++) v.setInt16(44 + i * 2, Math.sin(2 * Math.PI * freq * i / rate) * 6000, true);
    return new Blob([buf], { type: 'audio/wav' });
  }
  const audio = new Audio();
  const log = document.querySelector('#log'), state = document.querySelector('#state');
  const t0 = performance.now();
  const say = (s) => { log.textContent += Math.round(performance.now() - t0) + 'ms  ' + s + '\n'; log.scrollTop = 1e9; };
  const show = () => (state.textContent = 'currentTime=' + audio.currentTime.toFixed(2) + '  duration=' + audio.duration +
    '  paused=' + audio.paused + '  ended=' + audio.ended + '  readyState=' + audio.readyState + '  rate=' + audio.playbackRate);
  for (const ev of ['loadedmetadata', 'canplay', 'play', 'playing', 'pause', 'seeking', 'seeked', 'ratechange', 'ended', 'error'])
    audio.addEventListener(ev, () => { say(ev); show(); });
  audio.addEventListener('timeupdate', show);
  say('قبل الـ src: duration=' + audio.duration);
  audio.src = URL.createObjectURL(makeWav(3, 440));
  document.querySelector('#play').onclick = () => audio.play().then(() => say('play() اتحقق')).catch((e) => say(e.name + ': ' + e.message));
  document.querySelector('#pause').onclick = () => audio.pause();
  document.querySelector('#stop').onclick = () => { audio.pause(); audio.currentTime = 0; };
  document.querySelector('#back').onclick = () => (audio.currentTime -= 1);
  document.querySelector('#fwd').onclick = () => (audio.currentTime += 1);
  document.querySelector('#rate').onchange = (e) => (audio.playbackRate = Number(e.target.value));
  document.querySelector('#loud').onclick = () => { try { audio.volume = 2; } catch (e) { say(e.name + ': ' + e.message); } };
  show();
</script>
~~~

- **[[makeWav]]:** ٤٤ byte header (درس «DataView» شرح الـ WAV header) وبعده عينات [[Int16]] لموجة sine. [[new Blob([buf], { type: 'audio/wav' })]] بيحوّلها ملف في الذاكرة، و [[URL.createObjectURL]] بيدّيه عنوان [[blob:]] يتحط في [[src]].
- **[[new Audio()]]** نفس [[document.createElement('audio')]]: عنصر مش ظاهر في الصفحة بس شغال عادي.
- الـ preview ده [[iframe]] معزول ([[sandbox]] من غير [[allow-same-origin]])، والتشغيل من [[blob:]] شغال فيه عادي بعد الضغطة (اتقاس، والناتج في «جرّب» تحت).

---

## الخلاصة

- الصيغة container + codecs. اسأل بـ [[canPlayType]] (مع codecs) وبـ [[decodingInfo]] للـ smooth والبطارية، والترتيب في اللستة هو الأولوية.
- [[play()]] Promise: امسك [[NotAllowedError]] واعرض زرار، وتجاهل [[AbortError]].
- مفيش [[stop()]]: [[pause()]] و [[currentTime = 0]]. و [[duration]] [[NaN]] قبل [[loadedmetadata]] وممكن [[Infinity]].
- [[volume]] من 0 لـ 1، و [[playbackRate]] من [[0.0625]] لـ [[16]] في Chrome، وغير كده exception.
- الواجهة بتتحدث من الأحداث ([[play]] و [[pause]] و [[timeupdate]] و [[ended]])، و [[timeupdate]] ٤ مرات في الثانية بس.`,
          lines: [
            R`بنجيب عنصر الفيديو من الصفحة بالـ id بتاعه. نفس الكود شغال على [[<audio>]] لأن الاتنين [[HTMLMediaElement]].`,
            R`بيطبع [[NaN 0]]: المدة لسه مش معروفة و [[readyState]] صفر لأن الملف لسه متقراش.`,
            R`[[loadedmetadata]] بيتبعت أول ما المتصفح يقرا الـ header، وساعتها [[duration]] بتبقى رقم حقيقي بالثواني.`,
            R`[[ended]] بيتبعت لما الفيديو يوصل للآخر، ومكانه المثالي لتشغيل الحلقة اللي بعدها.`,
            R`زرار «شغّل»: الدالة [[async]] عشان نستنى الـ Promise بتاع [[play()]] بـ [[await]].`,
            R`[[try]] و [[catch]] حوالين [[await v.play()]]: لو اترفض بنطبع اسم الخطأ ورسالته بدل [[Uncaught (in promise)]].`,
            R`قفلة الدالة والـ listener.`,
            R`زرار «stop»: مفيش [[stop()]] في الـ API، فبنوقف بـ [[pause()]] ونرجع للأول بـ [[currentTime = 0]].`,
            R`السرعة ١.٥: المسموح في Chrome من [[0.0625]] لـ [[16]]، والصوت مبيرفعش لأن [[preservesPitch]] [[true]].`,
            R`بنسأل المتصفح عن WebM بـ VP9 و Opus، و Chrome 157 بيرد [["probably"]].`,
          ],
          ref: [
            { t: "MDN: HTMLMediaElement", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement" },
            { t: "MDN: HTMLMediaElement.play()", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play" },
            { t: "MDN: HTMLMediaElement.canPlayType()", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canPlayType" },
            { t: "MDN: MediaCapabilities.decodingInfo()", url: "https://developer.mozilla.org/en-US/docs/Web/API/MediaCapabilities/decodingInfo" },
            { t: "MDN: Media container formats", url: "https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Containers" },
            { t: "MDN: Web video codec guide", url: "https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Video_codecs" },
            { t: "MDN: Web audio codec guide", url: "https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Audio_codecs" },
            { t: "MDN: Autoplay guide for media and Web Audio APIs", url: "https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay" },
            { t: "MDN: timeupdate event", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/timeupdate_event" },
          ],
          pre: [{ to: "css/audio و source", why: R`[[<source type>]] و [[autoplay]] من ناحية HTML` }, { to: "js/async و await", why: R`[[play()]] بيرجّع Promise` }],
        },
        {
          cmd: "مشغّل فيديو خاص: أزرار و range وكيبورد",
          title: "إزاي تبني مشغّل فيديو بأزرارك انت، شغال بالكيبورد وقارئ الشاشة، وفيه ملء الشاشة وصورة في صورة؟",
          desc: R`المشغّل الخاص = [[<video>]] من غير [[controls]]، وتحته أزرار انت عاملها بتكلّم الـ API بتاع الدرس اللي فات. بتعمله لما أزرار المتصفح مش كفاية: شكلها مختلف في كل متصفح، وبعضها مش سهل بالكيبورد، ومحتاج حاجات مش فيها (فصول، «قدّم ٣٠ ثانية»، سرعات معينة).

• [[controls]] يفضل في الـ HTML، و JavaScript هو اللي يشيله ([[video.controls = false]]): من غير JS اليوزر لسه عنده مشغّل.
• أزرار حقيقية [[<button>]] عليها [[aria-label]]، وشريط الوقت [[<input type="range">]].
• الواجهة بتتحدث من **أحداث** الفيديو ([[play]] و [[pause]] و [[timeupdate]] و [[volumechange]])، مش من الضغطة.
• اختصارات كيبورد على المشغّل كله، و [[requestFullscreen()]] على الغلاف، و [[requestPictureInPicture()]] على الفيديو.`,
          example: R`// player.js: أساس أي مشغّل خاص (الصفحة فيها video و #play و #seek و #time و #fs)
const video = document.querySelector('video');
const [playBtn, seek, time] = ['#play', '#seek', '#time'].map((s) => document.querySelector(s));
video.controls = false;
playBtn.addEventListener('click', () => (video.paused || video.ended ? video.play().catch(() => {}) : video.pause()));
video.addEventListener('play', () => playBtn.setAttribute('aria-label', 'وقّف'));
video.addEventListener('pause', () => playBtn.setAttribute('aria-label', 'شغّل'));
video.addEventListener('loadedmetadata', () => (seek.max = video.duration));
video.addEventListener('timeupdate', () => { seek.value = video.currentTime; time.textContent = formatTime(video.currentTime); });
seek.addEventListener('input', () => (video.currentTime = Number(seek.value)));
document.querySelector('#fs').addEventListener('click', () => video.parentElement.requestFullscreen());`,
          try: R`افتح المشغّل الحي في آخر الشرح واستنى ٤ ثواني لحد ما فيديو التجربة يجهز. من غير ماوس خالص: [[Tab]] لحد زرار التشغيل، و [[Enter]]، وبعدين [[k]] و [[→]] و [[5]] و [[m]]. ركّز: الزرار اتغيّر شكله لما شغّلت بـ [[k]] مش بالضغط؟ وبعدين دوس ⧉ (صورة في صورة). ليه زرار ملء الشاشة مش ظاهر؟`,
          sol: R`~~~text الناتج (نفس الصفحة جوه iframe معزول زي الـ preview، Chrome 157، Playwright)
بعد ٥ ثواني:            #time = 0:00 / 0:04    duration=4.000833  src=blob:
                         pipHidden=false  fsHidden=true
click #play + 1.5s:     #time = 0:01 / 0:04
ArrowRight:             #time = 0:04 / 0:04    (1.5 + 5 اتقص على المدة)
k:                      #status = «بيحمّل…»    (k بعد ended بدأ من الأول، و waiting ظهر لحظة)
click ⧉:                document.pictureInPictureElement = [object HTMLVideoElement]
~~~

- الزرار اتغيّر مع [[k]] لأن الـ listener بتاعه على حدث [[play]] نفسه، مش على الضغطة. أي طريقة تشغيل (زرار، كيبورد، Media Session، كود) بتحدّثه.
- زرار ملء الشاشة **مستخبي** لأن [[document.fullscreenEnabled]] = [[false]] جوه الـ preview: الـ [[iframe]] مفهوش [[allowfullscreen]]. الكود بيخفيه بدل ما يسيب زرار بيرمي [[TypeError: Disallowed by permissions policy]] (ده اللي طلع لما جربناه غصب).
- صورة في صورة اشتغلت جوه الـ iframe المعزول ([[pictureInPictureEnabled]] = [[true]]).`,
          practice: [
            { lvl: 'سريع', t: R`**اشرحها:** زميلك شال [[controls]] من الـ HTML خالص وقال «أنا عامل أزرار بـ JavaScript أصلًا». اكتبله ٣ سطور: ليه الأحسن تسيبه في الـ HTML وتشيله من JavaScript؟ وإيه اللي بيحصل لو الـ script وقع؟`, done: R`الـ ٣ سطور فيهم: يوزر من غير JS (أو script وقع أو اتأخر) لسه عنده مشغّل، و [[hidden]] على أزرارك لحد ما JS يشتغل، والمصطلح (progressive enhancement).`, sol: R`**الإجابة النموذجية:**

1. لو [[controls]] في الـ HTML و JavaScript بيشيله ([[video.controls = false]])، اليوزر اللي الـ script عنده وقع (خطأ، أو CDN واقع، أو JS مقفول، أو لسه بيحمّل على نت بطيء) بيلاقي مشغّل المتصفح شغال. ولو شلته من الـ HTML، اليوزر ده عنده صورة ثابتة مبتعملش حاجة.
2. وأزرارك نفسها تبدأ [[hidden]] وتظهر من JavaScript، عشان متبقاش أزرار ميتة لو الـ script مشتغلش.
3. ده اسمه **progressive enhancement**: الأساس شغال من HTML بس، و JavaScript بيحسّن فوقه. MDN بيعمل نفس الحركة في درس «Creating a cross-browser video player».

~~~text الناتج (Chrome 157، المشغّل الكامل في الشرح)
بعد ما الـ script اشتغل: controls attr= false   والأزرار ظاهرة
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** تحت فيديو عادي (بـ [[controls]]) حط زرارين «↺ 10» يرجع ١٠ ثواني و «30 ↻» يقدّم ٣٠ ثانية، وجنبهم الوقت الباقي بالسالب ([[-1:42]]). القفزة متعدّيش أول الفيديو ولا آخره، ومتعملش حاجة لو المدة لسه مش معروفة.`, done: R`على فيديو مدته ٦ ثواني: «30 ↻» بيوصّل لآخره بالظبط (مش أكتر) والباقي [[-0:00]]، و «↺ 10» بعدها بيرجع لـ [[0]] مش لسالب.`, sol: R`~~~html skip.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>تخطي</title></head>
<body>
<video id="v" src="lesson.webm" controls preload="metadata" width="320"></video>
<div>
  <button id="back" type="button" aria-label="ارجع ١٠ ثواني">↺ 10</button>
  <button id="fwd" type="button" aria-label="قدّم ٣٠ ثانية">30 ↻</button>
  <span id="left">--:--</span>
</div>
<script>
  const v = document.querySelector('#v'), left = document.querySelector('#left');
  const fmt = (s) => (Number.isFinite(s) ? Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0') : '--:--');
  // القفزة بتتقص على أول الفيديو وآخره
  function jump(sec) {
    if (!Number.isFinite(v.duration)) return;
    v.currentTime = Math.min(Math.max(v.currentTime + sec, 0), v.duration);
  }
  document.querySelector('#back').addEventListener('click', () => jump(-10));
  document.querySelector('#fwd').addEventListener('click', () => jump(30));
  const showLeft = () => (left.textContent = '-' + fmt(v.duration - v.currentTime));
  for (const ev of ['loadedmetadata', 'timeupdate', 'seeked']) v.addEventListener(ev, showLeft);
</script>
</body>
</html>
~~~

~~~text الناتج (Chrome 157، Playwright، lesson.webm مدته 5.98 ثانية)
البداية:      #left = -0:05
بعد 30 ↻:     #left = -0:00   currentTime = 5.975858
بعد ↺ 10:     #left = -0:05   currentTime = 0
~~~

- **[[Math.min(Math.max(x, 0), v.duration)]]**: الـ clamp. المتصفح نفسه بيقص القيمة (الدرس اللي فات)، بس بنقصها بإيدنا عشان الكود يبقى واضح ومنعتمدش على سلوك ممكن يختلف.
- **[[Number.isFinite(v.duration)]]**: قبل الـ metadata المدة [[NaN]]، و [[NaN]] في أي حساب بيطلّع [[NaN]]، و [[currentTime = NaN]] بيرمي [[TypeError]].
- [[seeked]] في لستة الأحداث عشان الوقت الباقي يتحدث وانت واقف (من غير تشغيل مفيش [[timeupdate]] مستمر).
- [[aria-label]] على الأزرار لأن «↺ 10» قارئ الشاشة هيقراها «سهم دائري عشرة».` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الزرار ده بيغيّر كلامه لما تدوس عليه. شغّل الفيديو لحد الآخر: الزرار لسه بيقول «وقّف»، ومحتاج تدوس مرتين عشان يشتغل تاني. صلّحه.

~~~html
<video id="v" src="lesson.webm" muted width="320"></video>
<button id="play" type="button">▶ شغّل</button>
<script>
  const v = document.querySelector('#v'), btn = document.querySelector('#play');
  let playing = false;
  btn.addEventListener('click', () => {
    if (playing) { v.pause(); btn.textContent = '▶ شغّل'; }
    else { v.play(); btn.textContent = '❚❚ وقّف'; }
    playing = !playing;
  });
</script>
~~~`, done: R`بعد ما الفيديو يخلص الزرار بيقول «شغّل» لوحده، وضغطة واحدة بتشغّله من الأول.`, sol: R`~~~html label-fix.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>الزرار</title></head>
<body>
<video id="v" src="lesson.webm" muted width="320"></video>
<button id="play" type="button">▶ شغّل</button>
<script>
  const v = document.querySelector('#v'), btn = document.querySelector('#play');
  btn.addEventListener('click', () => (v.paused || v.ended ? v.play().catch(() => {}) : v.pause()));
  // الزرار بيعكس حالة الفيديو، أيًّا كان مين غيّرها
  v.addEventListener('play', () => (btn.textContent = '❚❚ وقّف'));
  v.addEventListener('pause', () => (btn.textContent = '▶ شغّل'));
</script>
</body>
</html>
~~~

~~~text الناتج (Chrome 157، Playwright: شغّل، اقفز لـ 5.9، استنى النهاية، دوس تاني)
                    الكود البايظ         بعد التصليح
بعد أول ضغطة:       ❚❚ وقّف              ❚❚ وقّف
بعد ما خلص:         ❚❚ وقّف   ← غلط      ▶ شغّل
الضغطة التانية:     ▶ شغّل والفيديو واقف   ❚❚ وقّف و paused=false
~~~

- **الباج:** متغيّر [[playing]] نسخة تانية من حالة الفيديو، والنسختين بيختلفوا أول ما الفيديو يتغيّر من غير الزرار: خلص لوحده، أو [[k]] من الكيبورد، أو أزرار شاشة القفل، أو [[play()]] اترفض.
- **التصليح:** مفيش متغيّر. الضغطة بتسأل الفيديو نفسه ([[v.paused || v.ended]])، والزرار بيتغيّر من حدثي [[play]] و [[pause]] بس. ودي «مصدر واحد للحقيقة» (single source of truth).
- [[catch(() => {})]] على [[play()]] عشان الرفض ميبقاش [[Uncaught]]. ولو اترفض، [[play]] مش هيتبعت والزرار هيفضل «شغّل»، وده الصح.` },
            { lvl: 'تحدي', t: R`**ابني:** زوّد اختصارات المحترفين على المشغّل: [[.]] و [[,]] يقدّموا أو يرجّعوا **frame** واحد (الفيديو ٣٠ frame في الثانية) ويوقفوا الفيديو لو شغال، و [[>]] و [[<]] يغيّروا السرعة في السلم [[0.25 … 2]]. اعرض النتيجة في سطر [[role="status"]].`, done: R`٣ ضغطات [[.]] من الأول = frame 3 (0.100s)، و [[,]] = frame 2، و [[>]] مرتين من 1 = 1.5×، و [[<]] كتير = 0.25× ومبينزلش أقل.`, sol: R`~~~html keys.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>اختصارات</title></head>
<body>
<div id="player" tabindex="0" aria-label="مشغّل الفيديو، استخدم , و . للـ frames و < و > للسرعة">
  <video id="v" src="lesson.webm" muted width="320"></video>
  <p id="info" role="status"></p>
</div>
<script>
  const v = document.querySelector('#v'), info = document.querySelector('#info');
  const FPS = 30, RATES = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  const show = (text) => (info.textContent = text);
  document.querySelector('#player').addEventListener('keydown', (e) => {
    if (e.key === '.' || e.key === ',') {
      if (!v.paused) v.pause();                  // خطوة frame معناها بس وهو واقف
      const step = (e.key === '.' ? 1 : -1) / FPS;
      v.currentTime = Math.min(Math.max(v.currentTime + step, 0), v.duration);
      show('frame: ' + Math.round(v.currentTime * FPS) + ' (' + v.currentTime.toFixed(3) + 's)');
    } else if (e.key === '>' || e.key === '<') {
      const i = RATES.indexOf(v.playbackRate);
      const next = RATES[Math.min(Math.max((i === -1 ? 3 : i) + (e.key === '>' ? 1 : -1), 0), RATES.length - 1)];
      v.playbackRate = next;
      show('السرعة: ' + next + '×');
    } else return;
    e.preventDefault();
  });
</script>
</body>
</html>
~~~

~~~text الناتج (Chrome 157، Playwright بيدوس على #player)
. . .     => frame: 3 (0.100s)
,         => frame: 2 (0.067s)
> >       => السرعة: 1.5×
< × 6     => السرعة: 0.25×
~~~

- **frame = ١ ÷ ٣٠ ثانية** (0.0333). الـ [[HTMLMediaElement]] مبيعرفش الـ frame rate، فانت لازم تعرفه من الملف. في Chrome فيه [[video.requestVideoFrameCallback()]] بيدّيك [[mediaTime]] بتاع كل frame اتعرض لو محتاج دقة أكتر.
- **[[RATES.indexOf]]**: بنمشي على سلم ثابت بدل [[+ 0.25]] عشان منوصلش لـ [[1.0000000002]] من جمع الكسور.
- [[tabindex="0"]] على الـ [[div]] عشان ياخد focus ويستقبل [[keydown]]، و [[aria-label]] بيقول الاختصارات لقارئ الشاشة.
- [[e.preventDefault()]] بس على المفاتيح اللي استخدمناها، عشان باقي المفاتيح (Tab مثلًا) تفضل شغالة.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك وابني:** من صفحة «Media Session API» على MDN: خلّي أزرار الوسائط في الكيبورد وشاشة القفل والإشعار تتحكم في بودكاست: العنوان واسم البرنامج، وتشغيل وإيقاف، ورجوع ١٠ وتقديم ٣٠، و [[seekto]]، والحلقة اللي قبل واللي بعد، وشريط التقدم ([[setPositionState]]). جرّب كمان action مش موجود واكتب الخطأ.`, done: R`كل الـ actions اتسجلت من غير خطأ، والـ action الغلط رمى [[TypeError]] اسمه فيه، و [[setPositionState]] بمكان أكبر من المدة رمى برده.`, sol: R`~~~html session.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>Media Session</title></head>
<body>
<audio id="a" src="lesson.webm" controls></audio>
<pre id="out"></pre>
<script>
  const a = document.querySelector('#a'), out = document.querySelector('#out');
  const log = (s) => (out.textContent += s + '\n');
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({ title: 'الحلقة ١٢: الـ Promises', artist: 'بودكاست كود بالعربي', album: 'الموسم ٢' });
    const actions = {
      play: () => a.play(),
      pause: () => a.pause(),
      seekbackward: (d) => (a.currentTime = Math.max(a.currentTime - (d.seekOffset || 10), 0)),
      seekforward: (d) => (a.currentTime = Math.min(a.currentTime + (d.seekOffset || 30), a.duration)),
      seekto: (d) => (a.currentTime = d.seekTime),
      previoustrack: () => log('الحلقة اللي قبلها'),
      nexttrack: () => log('الحلقة اللي بعدها'),
      skipad: null,
    };
    for (const [name, fn] of Object.entries(actions)) {
      try { navigator.mediaSession.setActionHandler(name, fn); log('اتسجّل: ' + name); }
      catch (e) { log(name + ': ' + e.name + ': ' + e.message); }
    }
    try { navigator.mediaSession.setActionHandler('nope', () => {}); } catch (e) { log('nope: ' + e.name + ': ' + e.message); }
    // شريط التقدم في شاشة القفل
    a.addEventListener('timeupdate', () => {
      if (Number.isFinite(a.duration)) navigator.mediaSession.setPositionState({ duration: a.duration, playbackRate: a.playbackRate, position: a.currentTime });
    });
    a.addEventListener('loadedmetadata', () => {
      try { navigator.mediaSession.setPositionState({ duration: a.duration, position: a.duration + 5 }); } catch (e) { log('position: ' + e.name + ': ' + e.message); }
      log('metadata: ' + navigator.mediaSession.metadata.title + ' — playbackState=' + navigator.mediaSession.playbackState);
    });
  } else log('Media Session مش مدعوم هنا');
</script>
</body>
</html>
~~~

~~~text الناتج (Chrome 157، Playwright)
اتسجّل: play
اتسجّل: pause
اتسجّل: seekbackward
اتسجّل: seekforward
اتسجّل: seekto
اتسجّل: previoustrack
اتسجّل: nexttrack
اتسجّل: skipad
nope: TypeError: Failed to execute 'setActionHandler' on 'MediaSession': The provided value 'nope' is not a valid enum value of type MediaSessionAction.
position: TypeError: Failed to execute 'setPositionState' on 'MediaSession': The provided position cannot be greater than the duration.
metadata: الحلقة ١٢: الـ Promises — playbackState=none
~~~

- [[MediaMetadata]] هو اللي بيظهر في إشعار أندرويد وشاشة القفل ونافذة الوسائط في ويندوز. ممكن تزوّد [[artwork: [{ src, sizes, type }] ]].
- كل handler بياخد object فيه تفاصيل: [[seekOffset]] في التقديم و [[seekTime]] في [[seekto]]. و [[null]] بيشيل الزرار ([[skipad]] هنا).
- [[setPositionState]] بيرسم شريط التقدم في شاشة القفل، وبيرمي لو [[position > duration]]: امسكه أو اتأكد قبلها.
- **اللي متقاسش:** ضغطة زرار وسائط حقيقية مش هتتعمل في Chrome headless، فالجزء ده من MDN. اللي اتقاس هو التسجيل والأخطاء.` },
          ],
          flag: "script",
          deep: {
            why: R`MDN بيقول سببين في منهجه: جمهورك ممكن يكون محتاج حاجة أزرار المتصفح مبتعملهاش، وبعض أزرار المتصفحات **مش سهلة بالكيبورد** (والتجربة بتختلف من متصفح لمتصفح، فلازم تختبر في كل واحد)، وعايز شكل واحد في كل المتصفحات يمشي مع تصميم موقعك. وفيه سبب تالت في الشغل: ميزات المنتج نفسه (فصول، سرعات، «كمّل من مكانك»، تحليلات، إعلانات) محتاجة واجهة بتاعتك.`,
            how: R`المشغّل الخاص طبقتين: الفيديو نفسه (الحالة الحقيقية) والأزرار (عرض للحالة دي). الأزرار بتطلب ([[play()]] و [[currentTime = x]] و [[muted = true]])، والفيديو بيرد بأحداث، والأحداث بس هي اللي بتغيّر الواجهة. كده مستحيل الزرار يقول «وقّف» والفيديو واقف.

شريط الوقت [[<input type="range">]]: [[max]] = [[duration]] بعد [[loadedmetadata]]، و [[value]] = [[currentTime]] مع كل [[timeupdate]]، و [[input]] (أثناء السحب) بيكتب [[currentTime]]. ومشكلة صغيرة: وانت بتسحب، [[timeupdate]] بيرجّع الـ thumb لمكانه القديم، فبنعمل علم [[dragging]] من [[pointerdown]] لـ [[pointerup]].

ملء الشاشة بيتطلب على **الغلاف** (الـ [[figure]]) مش على الفيديو، عشان أزرارك تبقى معاه، و CSS [[:fullscreen]] بيظبط الشكل. وصورة في صورة على الفيديو نفسه ([[requestPictureInPicture]] موجودة على [[HTMLVideoElement]] بس). الاتنين محتاجين ضغطة يوزر، والـ [[iframe]] محتاج إذن ([[allowfullscreen]]).`,
            when: R`اعمله لما أزرار المتصفح مش كفاية فعلًا: منصة دروس، أو بودكاست، أو منتج ليه هوية بصرية، أو ميزة زي الفصول والسرعات المخصوصة. ولو مشروع صغير وأزرار المتصفح كفاية، سيبها: هي متاحة ومتختبرة ومجانية. ولو محتاج كتير (ترجمات بأشكال، HLS، إعلانات، تحليلات)، مكتبة زي Video.js أو Plyr أو Media Chrome أوفر من إنك تكتبه من الصفر، والدرس ده بيخليك تفهم هي بتعمل إيه وتصلّحها لما تقع.`,
            mistakes: R`- [[<div onclick>]] بدل [[<button>]]: مبياخدش focus ولا بيشتغل بـ Enter ولا Space، وقارئ الشاشة مبيقولش إنه زرار.
- الزرار بيتغيّر من الضغطة: بيبوظ أول ما الفيديو يخلص أو يتشغّل من مكان تاني (التمرين التالت).
- [[aria-live]] على عداد الوقت: قارئ الشاشة هيقرا الوقت ٤ مرات في الثانية. الصح [[aria-valuetext]] على الـ range وإعلان واحد عند الإيقاف.
- [[keydown]] على [[document]] بياخد المسافة والأسهم من أي [[input]] في الصفحة، واليوزر مش عارف يكتب مسافة في خانة البحث.
- نسيت [[e.preventDefault()]] للمسافة: الفيديو يشتغل والصفحة تنزل لتحت في نفس الوقت.
- [[requestFullscreen()]] على [[<video>]]: أزرارك بتختفي والمتصفح بيرسم أزراره هو.
- زرار ملء الشاشة ظاهر جوه [[iframe]] مش مسموحله: بيرمي [[TypeError: Disallowed by permissions policy]] من غير ما اليوزر يفهم. اسأل [[document.fullscreenEnabled]] الأول.`,
          },
          teach: R`## الفكرة في سطر

فيديو من غير أزرار المتصفح، وأزرار من عندك بتكلّمه وبتسمع أحداثه. كل الناتج من Chrome 157 بـ Playwright على سيرفر [[node:http]] محلي، وفيديو التجربة اتسجّل في الـ lab نفسه.

---

## ١. ليه تعمل مشغّل بنفسك؟

| السبب | مثال |
|---|---|
| جمهورك محتاج حاجة مش موجودة | اختصارات زي YouTube، أو «قدّم ٣٠ ثانية» للبودكاست، أو سرعة ١.٧٥ |
| أزرار المتصفح مش سهلة بالكيبورد في كل مكان | MDN بيذكر إن بعض الأزرار الافتراضية مش بتاخد focus كويس، والتجربة بتختلف بين المتصفحات |
| شكل واحد في كل المتصفحات | Chrome و Firefox و Safari كل واحد بيرسم أزراره بشكل، وانت عايز ألوان موقعك |
| ميزات المنتج | فصول، و«كمّل من مكانك»، وتحليلات «اتفرج قد إيه» |

---

## ١ب. الـ HTML: الأساس يشتغل من غير JavaScript

~~~html
<figure class="player" id="player">
  <video id="video" controls preload="metadata" playsinline>
    <source src="lesson.webm" type="video/webm">
    <source src="lesson.mp4" type="video/mp4">
    <p>المتصفح ده مش بيشغّل الفيديو. <a href="lesson.mp4">نزّله وشوفه على جهازك</a>.</p>
  </video>
  <div class="controls" id="controls" role="group" aria-label="التحكم في الفيديو" hidden>
    <button id="play" type="button" aria-label="شغّل">▶</button>
    <input id="seek" type="range" min="0" max="0" step="0.1" value="0" aria-label="مكان التشغيل">
    <span id="time">0:00 / 0:00</span>
    ...
  </div>
</figure>
~~~

- [[controls]] موجود، و [[.controls]] بتاعتنا [[hidden]]. أول سطرين في الـ script بيقلبوا ده: [[video.controls = false]] و [[controls.hidden = false]]. لو الـ script وقع، اليوزر عنده مشغّل المتصفح.
- [[playsinline]]: على iPhone الفيديو من غيره بيفتح ملء الشاشة لوحده (من MDN).
- [[role="group"]] و [[aria-label]]: قارئ الشاشة بيقول «التحكم في الفيديو، مجموعة» لما تدخلها.
- **كل زرار [[<button type="button">]]**: بياخد focus، وبيشتغل بـ Enter و Space، وقارئ الشاشة بيقول «زرار». والأيقونات (▶ و ⛶) مش كلام، فـ [[aria-label]] هو الاسم.

---

## ٢. زرار التشغيل: الحالة من الأحداث

~~~js
function togglePlay() {
  if (video.paused || video.ended) video.play().catch((e) => showError('التشغيل اترفض: ' + e.name));
  else video.pause();
}
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', () => { playBtn.textContent = '❚❚'; playBtn.setAttribute('aria-label', 'وقّف'); });
video.addEventListener('pause', () => { playBtn.textContent = '▶'; playBtn.setAttribute('aria-label', 'شغّل'); });
~~~

- الضغطة **بتطلب** بس. اللي بيغيّر شكل الزرار هو [[play]] و [[pause]]. فلو الفيديو خلص، أو اتشغّل بالكيبورد، أو من شاشة القفل، الزرار صح.
- [[video.ended]] مع [[paused]]: بعد النهاية الاتنين [[true]]، والضغطة تبدأ من الأول.
- الضغط على الفيديو نفسه بيشغّل ويوقف زي YouTube، بس الزرار لسه موجود للكيبورد.

---

## ٣. شريط الوقت: [[<input type="range">]]

~~~js
let dragging = false;
function showTime() {
  if (!dragging) seek.value = video.currentTime;
  time.textContent = fmt(video.currentTime) + ' / ' + fmt(video.duration);
  seek.setAttribute('aria-valuetext', fmt(video.currentTime) + ' من ' + fmt(video.duration));
}
video.addEventListener('loadedmetadata', () => { seek.max = video.duration; showTime(); });
video.addEventListener('timeupdate', showTime);
seek.addEventListener('pointerdown', () => (dragging = true));
seek.addEventListener('pointerup', () => (dragging = false));
seek.addEventListener('input', () => { video.currentTime = Number(seek.value); showTime(); });
~~~

- [[max]] بيتظبط في [[loadedmetadata]] (قبله [[duration]] = [[NaN]]). و [[step="0.1"]] عشان السحب يبقى ناعم.
- **[[dragging]]**: وانت ماسك الـ thumb، [[timeupdate]] كان هيرجّعه مكانه القديم كل ٢٥٠ ms. العلم ده بيوقف التحديث من الفيديو لحد ما تسيب.
- **[[aria-valuetext]]**: من غيره قارئ الشاشة بيقول «12.4» (رقم الـ range). معاه بيقول «0:12 من 0:58».
- [[Number(seek.value)]]: [[value]] نص دايمًا، و [[currentTime]] محتاج رقم.

---

## ٤. الوقت وقارئ الشاشة: إعلان واحد مش ٤ في الثانية

~~~html
<p class="sr-only" id="status" role="status"></p>
~~~

~~~js
video.addEventListener('pause', () => {
  status.textContent = (video.ended ? 'خلص' : 'اتوقف عند ') + (video.ended ? '' : fmt(video.currentTime));
});
video.addEventListener('waiting', () => (status.textContent = 'بيحمّل…'));
~~~

- [[role="status"]] = [[aria-live="polite"]]: قارئ الشاشة بيقرا النص لما يتغيّر، بعد ما يخلص الجملة اللي بيقولها.
- **مش** على عداد الوقت نفسه: ده بيتغيّر ٤ مرات في الثانية، وقارئ الشاشة هيفضل يرغي. الإعلان بس على الأحداث المهمة: وقف عند كذا، وخلص، وبيحمّل.
- [[.sr-only]] بيخفي السطر من الشاشة ويسيبه لقارئ الشاشة (درس «aria» في تاب HTML و CSS).

---

## ٥. الصوت والسرعة من [[volumechange]] و [[ratechange]]

~~~js
muteBtn.addEventListener('click', () => (video.muted = !video.muted));
vol.addEventListener('input', () => { video.volume = Number(vol.value); video.muted = video.volume === 0; });
video.addEventListener('volumechange', () => {
  muteBtn.textContent = video.muted || video.volume === 0 ? '🔇' : '🔊';
  muteBtn.setAttribute('aria-pressed', String(video.muted));
  vol.value = video.muted ? 0 : video.volume;
});
rate.addEventListener('change', () => (video.playbackRate = Number(rate.value)));
~~~

- [[aria-pressed]] بيخلي زرار الكتم «toggle button»: قارئ الشاشة بيقول «مضغوط» أو «مش مضغوط».
- الكتم مبيمسحش [[volume]]، فلما تفك الكتم الصوت بيرجع لمستواه.
- السرعة [[<select>]] جاهز: بيشتغل بالكيبورد وبيقول القيمة لوحده.

---

## ٦. اختصارات الكيبورد

| المفتاح | بيعمل | ملاحظة |
|---|---|---|
| [[k]] أو المسافة | شغّل/وقّف | المسافة بس لو الـ focus مش على زرار (الزرار بيشتغل بالمسافة لوحده) |
| [[j]] و [[l]] | رجوع وتقديم ١٠ ثواني | زي YouTube |
| [[←]] و [[→]] | رجوع وتقديم ٥ ثواني | حتى لو الـ focus على شريط الوقت (بدل خطوة 0.1) |
| [[m]] | كتم | |
| [[f]] | ملء الشاشة | لو مسموح |
| [[0]] لـ [[9]] | يروح لـ ٠٪ لـ ٩٠٪ | |

~~~js
player.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.altKey || e.metaKey) return;
  const onField = e.target === vol || e.target === rate;
  const k = e.key.toLowerCase();
  const jump = (sec) => { video.currentTime = Math.min(Math.max(video.currentTime + sec, 0), video.duration || 0); };
  if (k === 'k' || (k === ' ' && !e.target.matches('button, select'))) togglePlay();
  else if (k === 'm') video.muted = !video.muted;
  else if (!onField && k === 'arrowright') jump(5);
  // ... j و l و f و الأرقام في الصفحة الكاملة تحت
  else return;
  e.preventDefault();
});
~~~

- الـ listener على **المشغّل** ([[#player]]) مش على [[document]]: الاختصارات بتشتغل لما الـ focus جوه المشغّل بس، فخانة بحث في نفس الصفحة متتأثرش.
- [[Ctrl]] و [[Alt]] و [[Meta]] بنسيبهم للمتصفح ([[Ctrl+L]] مثلًا).
- **[[onField]]**: سهم على شريط الصوت أو قايمة السرعة يغيّرهم هم، فمناخدهوش. بس على شريط الوقت بناخده عشان نقفز ٥ ثواني بدل 0.1.
- [[else return]] قبل [[preventDefault]]: أي مفتاح مش بتاعنا (Tab مثلًا) بيكمل عادي.

~~~text الناتج (Chrome 157، Playwright على الصفحة الكاملة، lesson.webm مدته 5.98)
click ▶ + 1.2s:  t=1.15 paused=false  play=وقّف
k:               t=1.15 paused=true   status="اتوقف عند 0:01"
ArrowRight:      t=5.98               (1.15 + 5 = 6.15 اتقص على المدة)
5:               t=2.99               (50٪)
j:               t=0.00               (2.99 − 10 اتقص على صفر)
m:               muted=true
focus على الشريط + ArrowRight:  t=5.00   (خمس ثواني، مش 0.1)
Space على الشريط:               paused=false
~~~

---

## ٧. ملء الشاشة: [[requestFullscreen()]]

~~~js
fsBtn.hidden = !document.fullscreenEnabled;
fsBtn.addEventListener('click', () => {
  if (document.fullscreenElement) document.exitFullscreen();
  else player.requestFullscreen().catch((e) => showError('ملء الشاشة: ' + e.message));
});
document.addEventListener('fullscreenchange', () => fsBtn.setAttribute('aria-label', document.fullscreenElement ? 'اخرج من ملء الشاشة' : 'ملء الشاشة'));
~~~

~~~css
.player:fullscreen { max-width: none; display: flex; flex-direction: column; justify-content: center; }
.player:fullscreen video { flex: 1; aspect-ratio: auto; }
~~~

~~~text الناتج (Chrome 157)
ضغطة على ⛶:                    fullscreenElement = player   label = اخرج من ملء الشاشة
f تاني:                         fullscreenElement = null     label = ملء الشاشة
من سكربت الصفحة من غير ضغطة:    TypeError: Permissions check failed
                                 Console: Failed to execute 'requestFullscreen' on 'Element': API can only be initiated by a user gesture.
جوه iframe من غير allowfullscreen: fullscreenEnabled = false
                                 TypeError: Disallowed by permissions policy
~~~

- على **[[player]]** (الـ [[figure]]) مش على [[video]]، عشان أزرارك تيجي معاه.
- [[Esc]] بيخرج لوحده، و [[fullscreenchange]] بيتبعت في الحالتين، فالزرار دايمًا صح.
- محتاج ضغطة يوزر، والـ [[iframe]] محتاج [[allowfullscreen]] (درس «iframe sandbox و allow»). عشان كده [[fullscreenEnabled]] الأول.

---

## ٨. صورة في صورة: [[requestPictureInPicture()]]

~~~js
pipBtn.hidden = !document.pictureInPictureEnabled;
pipBtn.addEventListener('click', async () => {
  try {
    if (document.pictureInPictureElement) await document.exitPictureInPicture();
    else await video.requestPictureInPicture();
  } catch (e) { showError('صورة في صورة: ' + e.message); }
});
~~~

~~~text الناتج (Chrome 157)
ضغطة على ⧉:       pictureInPictureElement = video
ضغطة تانية:        pictureInPictureElement = null
من غير ضغطة:       NotAllowedError: Failed to execute 'requestPictureInPicture' on 'HTMLVideoElement': Must be handling a user gesture if there isn't already an element in Picture-in-Picture.
على ملف صوت بس:    InvalidStateError: Failed to execute 'requestPictureInPicture' on 'HTMLVideoElement': The video element has no video track.
~~~

- موجودة على [[HTMLVideoElement]] بس، والفيديو لازم يبقى فيه صورة. وفيه حدثين [[enterpictureinpicture]] و [[leavepictureinpicture]].
- Firefox مبيدعمش الـ API ده (من MDN)، بيحط زراره هو على الفيديو، وعشان كده [[pictureInPictureEnabled]] بيخفي الزرار هناك.

---

## ٩. المشغّل كامل (حي)

نفس صفحة المشغّل، بس فيديو الدرس بيتعمل في الصفحة (الـ preview مفيهوش ملفات): canvas بيتحرك ٤ ثواني بيتسجّل بـ [[MediaRecorder]] (درس التسجيل). في مشروعك امسح [[makeDemoClip]] وحط الـ [[<source>]] اللي في قسم ١ب.

~~~live 470 مشغّل الدرس
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مشغّل الدرس</title>
<style>
  body { font-family: system-ui, sans-serif; margin: 16px; background: #f4f4f5; color: #18181b; }
  .player { max-width: 640px; margin: 0; background: #000; border-radius: 10px; overflow: hidden; }
  .player video { display: block; width: 100%; aspect-ratio: 16 / 9; background: #000; }
  .controls { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; padding: 8px; background: #18181b; color: #fff; direction: ltr; }
  .controls button, .controls select { font: inherit; min-width: 44px; min-height: 44px; border: 0; border-radius: 6px; background: #3f3f46; color: #fff; cursor: pointer; }
  .controls button:focus-visible, .controls input:focus-visible, .controls select:focus-visible { outline: 3px solid #facc15; outline-offset: 2px; }
  #seek { flex: 1 1 160px; accent-color: #facc15; }
  #vol { width: 80px; accent-color: #facc15; }
  #time { font-variant-numeric: tabular-nums; min-width: 92px; text-align: center; }
  .msg { margin: 0; padding: 8px; background: #7f1d1d; color: #fff; }
  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
  .player:fullscreen { max-width: none; display: flex; flex-direction: column; justify-content: center; }
  .player:fullscreen video { flex: 1; aspect-ratio: auto; }
</style>
</head>
<body>
<h1>الدرس ١: أول صفحة</h1>
<p id="wait">بنجهّز فيديو تجربة (٤ ثواني)…</p>
<figure class="player" id="player">
  <video id="video" controls preload="metadata" playsinline>
    <p>المتصفح ده مش بيشغّل الفيديو.</p>
  </video>
  <div class="controls" id="controls" role="group" aria-label="التحكم في الفيديو" hidden>
    <button id="play" type="button" aria-label="شغّل">▶</button>
    <input id="seek" type="range" min="0" max="0" step="0.1" value="0" aria-label="مكان التشغيل">
    <span id="time">0:00 / 0:00</span>
    <button id="mute" type="button" aria-label="اكتم الصوت" aria-pressed="false">🔊</button>
    <input id="vol" type="range" min="0" max="1" step="0.05" value="1" aria-label="مستوى الصوت">
    <select id="rate" aria-label="سرعة التشغيل">
      <option value="0.75">0.75×</option><option value="1" selected>1×</option><option value="1.25">1.25×</option><option value="1.5">1.5×</option><option value="2">2×</option>
    </select>
    <button id="pip" type="button" aria-label="صورة في صورة">⧉</button>
    <button id="fs" type="button" aria-label="ملء الشاشة">⛶</button>
  </div>
  <p class="msg" id="msg" role="alert" hidden></p>
  <p class="sr-only" id="status" role="status"></p>
</figure>
<script>
const player = document.querySelector('#player');
const video = document.querySelector('#video');
const $ = (id) => document.querySelector('#' + id);
const [playBtn, seek, time, muteBtn, vol, rate, pipBtn, fsBtn, msg, status] =
  ['play', 'seek', 'time', 'mute', 'vol', 'rate', 'pip', 'fs', 'msg', 'status'].map($);

// 0. الـ preview مفيهوش ملفات: بنسجّل canvas بيتحرك ٤ ثواني ونستخدمه كفيديو
async function makeDemoClip(sec) {
  const c = document.createElement('canvas'); c.width = 320; c.height = 180;
  const g = c.getContext('2d');
  const type = ['video/mp4', 'video/webm'].find((t) => MediaRecorder.isTypeSupported(t));
  const rec = new MediaRecorder(c.captureStream(30), { mimeType: type });
  const chunks = []; rec.ondataavailable = (e) => chunks.push(e.data);
  const t0 = performance.now();
  const draw = () => {
    const s = (performance.now() - t0) / 1000;
    g.fillStyle = '#1e293b'; g.fillRect(0, 0, 320, 180);
    g.fillStyle = '#facc15'; g.fillRect(20 + s * 60, 90, 36, 36);
    g.fillStyle = '#fff'; g.font = 'bold 36px sans-serif'; g.fillText(s.toFixed(1), 200, 60);
  };
  const timer = setInterval(draw, 33); draw();
  rec.start();
  await new Promise((r) => setTimeout(r, sec * 1000));
  rec.stop(); await new Promise((r) => (rec.onstop = r)); clearInterval(timer);
  return URL.createObjectURL(new Blob(chunks, { type: rec.mimeType }));
}
makeDemoClip(4).then((url) => { video.src = url; document.querySelector('#wait').hidden = true; });

// 1. JavaScript شغال: نشيل مشغّل المتصفح ونظهر بتاعنا
video.controls = false;
$('controls').hidden = false;

// 2. الوقت: 75.4 => "1:15"، و NaN أو Infinity => "--:--"
function fmt(s) {
  if (!Number.isFinite(s)) return '--:--';
  s = Math.floor(s);
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = String(s % 60).padStart(2, '0');
  return h ? h + ':' + String(m).padStart(2, '0') + ':' + sec : m + ':' + sec;
}
let dragging = false;
function showTime() {
  if (!dragging) seek.value = video.currentTime;
  time.textContent = fmt(video.currentTime) + ' / ' + fmt(video.duration);
  seek.setAttribute('aria-valuetext', fmt(video.currentTime) + ' من ' + fmt(video.duration));
}
video.addEventListener('loadedmetadata', () => { seek.max = video.duration; showTime(); });
video.addEventListener('durationchange', () => { if (Number.isFinite(video.duration)) seek.max = video.duration; showTime(); });
video.addEventListener('timeupdate', showTime);

// 3. تشغيل وإيقاف: الزرار بيتغيّر من الأحداث، مش من الضغطة
function togglePlay() {
  if (video.paused || video.ended) video.play().catch((e) => showError('التشغيل اترفض: ' + e.name));
  else video.pause();
}
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', () => { playBtn.textContent = '❚❚'; playBtn.setAttribute('aria-label', 'وقّف'); });
video.addEventListener('pause', () => {
  playBtn.textContent = '▶'; playBtn.setAttribute('aria-label', 'شغّل');
  status.textContent = (video.ended ? 'خلص' : 'اتوقف عند ') + (video.ended ? '' : fmt(video.currentTime));
});
video.addEventListener('waiting', () => (status.textContent = 'بيحمّل…'));

// 4. شريط الوقت: وانت بتسحب منحدّثوش من timeupdate
seek.addEventListener('pointerdown', () => (dragging = true));
seek.addEventListener('pointerup', () => (dragging = false));
seek.addEventListener('input', () => { video.currentTime = Number(seek.value); showTime(); });

// 5. الصوت والسرعة
muteBtn.addEventListener('click', () => (video.muted = !video.muted));
vol.addEventListener('input', () => { video.volume = Number(vol.value); video.muted = video.volume === 0; });
video.addEventListener('volumechange', () => {
  const off = video.muted || video.volume === 0;
  muteBtn.textContent = off ? '🔇' : '🔊';
  muteBtn.setAttribute('aria-pressed', String(video.muted));
  muteBtn.setAttribute('aria-label', video.muted ? 'شغّل الصوت' : 'اكتم الصوت');
  vol.value = video.muted ? 0 : video.volume;
});
rate.addEventListener('change', () => (video.playbackRate = Number(rate.value)));

// 6. صورة في صورة وملء الشاشة: الزرار يظهر بس لو المتصفح يسمح
pipBtn.hidden = !document.pictureInPictureEnabled;
pipBtn.addEventListener('click', async () => {
  try {
    if (document.pictureInPictureElement) await document.exitPictureInPicture();
    else await video.requestPictureInPicture();
  } catch (e) { showError('صورة في صورة: ' + e.message); }
});
fsBtn.hidden = !document.fullscreenEnabled;
fsBtn.addEventListener('click', () => {
  if (document.fullscreenElement) document.exitFullscreen();
  else player.requestFullscreen().catch((e) => showError('ملء الشاشة: ' + e.message));
});
document.addEventListener('fullscreenchange', () => fsBtn.setAttribute('aria-label', document.fullscreenElement ? 'اخرج من ملء الشاشة' : 'ملء الشاشة'));

// 7. الكيبورد: على المشغّل كله، وسيب الأسهم للـ range والـ select لما يبقى عليهم الـ focus
player.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.altKey || e.metaKey) return;
  const onField = e.target === vol || e.target === rate;
  const k = e.key.toLowerCase();
  const jump = (sec) => { video.currentTime = Math.min(Math.max(video.currentTime + sec, 0), video.duration || 0); };
  if (k === 'k' || (k === ' ' && !e.target.matches('button, select'))) togglePlay();
  else if (k === 'm') video.muted = !video.muted;
  else if (k === 'f' && document.fullscreenEnabled) fsBtn.click();
  else if (k === 'j') jump(-10);
  else if (k === 'l') jump(10);
  else if (!onField && k === 'arrowright') jump(5);
  else if (!onField && k === 'arrowleft') jump(-5);
  else if (!onField && /^[0-9]$/.test(k) && Number.isFinite(video.duration)) video.currentTime = video.duration * Number(k) / 10;
  else return;
  e.preventDefault();
});

// 8. الأخطاء: error على الـ video (src واحد) أو على آخر source (لما كلهم يفشلوا)
function showError(text) { msg.textContent = text; msg.hidden = false; }
video.addEventListener('error', () => showError('الفيديو مش راضي يشتغل (' + video.error.code + ')'));
const sources = video.querySelectorAll('source');
if (sources.length) sources[sources.length - 1].addEventListener('error', () => showError('مفيش ولا صيغة من الفيديو اشتغلت. اتأكد من الملفات.'));
</script>
</body>
</html>
~~~

**هتشوف إيه:** «بنجهّز فيديو تجربة» ٤ ثواني، وبعدين مربع أصفر بيتحرك ورقم بيعدّ، وتحته شريط أسود: تشغيل، وشريط الوقت، والوقت، والكتم، والصوت، والسرعة، وصورة في صورة. زرار ملء الشاشة مستخبي هنا عمدًا (قسم ٧).

- **[[makeDemoClip(sec)]]:** canvas → [[captureStream(30)]] (stream فيديو ٣٠ frame في الثانية) → [[MediaRecorder]] → [[Blob]] → [[URL.createObjectURL]]. بيجرّب [[video/mp4]] الأول لأن Chrome بيسجّله بمدة صح، وبعدين [[video/webm]]. ومن غير timeslice في [[start()]] عشان المدة تتكتب (درس التسجيل بيشرح ليه).
- **[[showError]] و [[error]]:** درس الأخطاء الجاي بيشرح ليه [[error]] على آخر [[<source>]] كمان.
- اتقاس: Playwright على نفس الملف جوه [[iframe sandbox="allow-scripts allow-forms"]] (نفس الـ preview): المدة 4.000833، والأزرار والكيبورد وصورة في صورة شغالين، و [[fsHidden=true]].

---

## الخلاصة

- [[controls]] في الـ HTML، و JavaScript يشيله ويظهر أزرارك: progressive enhancement.
- [[<button>]] و [[aria-label]] و [[<input type="range">]] و [[aria-valuetext]]، وإعلان [[role="status"]] على الأحداث المهمة بس.
- الواجهة من الأحداث مش من الضغطة. ومتغيّر [[playing]] جنب الفيديو = باج.
- الكيبورد على المشغّل مش [[document]]، وسيب الأسهم للخانات اللي محتاجاها.
- [[requestFullscreen]] على الغلاف بعد [[fullscreenEnabled]]، و [[requestPictureInPicture]] على الفيديو بعد [[pictureInPictureEnabled]]، والاتنين محتاجين ضغطة.`,
          lines: [
            R`بنجيب الفيديو. أي [[<video>]] أو [[<audio>]] ينفع لأن الـ API واحد.`,
            R`بنجيب ٣ عناصر مرة واحدة: [[map]] على لستة selectors، والـ destructuring بيحط كل واحد في متغيّره.`,
            R`JavaScript اشتغل، فبنشيل أزرار المتصفح. لو الـ script ده وقع، [[controls]] اللي في الـ HTML بيفضل شغال.`,
            R`الزرار بيطلب بس: لو واقف أو خلص [[play()]] (ورفضه ممسوك)، وغير كده [[pause()]].`,
            R`حدث [[play]] من الفيديو هو اللي بيغيّر اسم الزرار لـ «وقّف»، أيًّا كان مين شغّل.`,
            R`وحدث [[pause]] بيرجّعه «شغّل»، حتى لو الفيديو وقف لوحده لأنه خلص.`,
            R`أول ما المدة تتعرف بنحطها [[max]] لشريط الوقت.`,
            R`مع كل [[timeupdate]] (حوالي ٤ مرات في الثانية) بنحرّك الشريط ونكتب الوقت بـ [[formatTime]] من الدرس اللي فات.`,
            R`السحب على الشريط بيكتب [[currentTime]] (seek)، و [[Number]] لأن [[value]] نص.`,
            R`ملء الشاشة على الغلاف ([[parentElement]]) مش الفيديو، عشان الأزرار تبقى ظاهرة معاه.`,
          ],
          ref: [
            { t: "MDN Learn: Video and audio APIs", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Client-side_APIs/Video_and_audio_APIs" },
            { t: "MDN: Video player styling basics", url: "https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Audio_and_video_delivery/Video_player_styling_basics" },
            { t: "MDN: Fullscreen API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API" },
            { t: "MDN: Element.requestFullscreen()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen" },
            { t: "MDN: Picture-in-Picture API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Picture-in-Picture_API" },
            { t: "MDN: HTMLVideoElement.requestPictureInPicture()", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement/requestPictureInPicture" },
          ],
          pre: [{ to: "js/HTMLMediaElement: play و pause و currentTime والصيغ", why: R`الـ API اللي الأزرار بتكلّمه والأحداث اللي بتسمعها` }, { to: "css/aria", why: R`[[aria-label]] و [[aria-pressed]] و [[role="status"]]` }, { to: "css/كيبورد وقارئ شاشة", why: R`إزاي تختبر المشغّل بالكيبورد بس وبقارئ شاشة` }],
        },
        {
          cmd: "أخطاء الميديا: MediaError و source و MIME و Range",
          title: "الفيديو مش راضي يشتغل: تعرف ليه من JavaScript إزاي، وتعرض بديل، وتصلّح السيرفر؟",
          desc: R`لما ملف ميديا يفشل، المتصفح بيبعت حدث [[error]]. **مكانه بيفرق:** لو العنصر عليه [[src]]، الحدث على العنصر نفسه و [[element.error]] فيه [[MediaError]] بـ [[code]] و [[message]]. ولو بتستخدم [[<source>]]، كل [[<source>]] بيفشل بيبعت [[error]] على نفسه، و [[element.error]] بيفضل [[null]]، وفشل **آخر** واحد معناه «مفيش ولا ملف اشتغل».

• [[MediaError.code]]: 1 اتلغى، 2 مشكلة شبكة، 3 الملف بايظ، 4 مش مدعوم أو مش موجود. و Chrome بيدّي 4 حتى لـ 404 و 503.
• [[type]] على [[<source>]] بيخلي المتصفح يتخطى الصيغة اللي مبيعرفهاش من غير ما يحمّلها.
• السيرفر لازم يدعم **Range** ([[206 Partial Content]])، وإلا التقديم في الفيديو مبيشتغلش.
• الكلام اللي جوه [[<video>]] مش بيظهر لما الملفات تفشل: البديل بتعرضه انت من JavaScript.`,
          example: R`// fallback.js: الفيديو فيه 3 <source>، ولو كلهم فشلوا نعرض رسالة ولينك
const v = document.querySelector('video');
const sources = [...v.querySelectorAll('source')];
sources.forEach((s) => s.addEventListener('error', () => console.log('فشل:', s.getAttribute('src'))));
sources.at(-1).addEventListener('error', () => {
  v.replaceWith(Object.assign(document.createElement('p'), { textContent: 'الفيديو مش راضي يشتغل. نزّله من اللينك.' }));
});
v.addEventListener('error', () => console.log('MediaError', v.error.code, v.error.message));
v.addEventListener('loadedmetadata', () => console.log('اشتغل:', v.currentSrc));`,
          try: R`افتح «دكتور الميديا» الحي في آخر الشرح: ٦ حالات بتتجرب في متصفحك وبتكتب اللي حصل. قارن: الـ 404 والـ bytes البايظة رجعوا نفس الـ [[code]]؟ والصف اللي فيه [[<source>]] اتنين بايظين: [[a.error]] كان إيه؟ وبعدين اعمل فولدر فيه [[media-server.mjs]] اللي في قسم ٤ وملف MP4، وجرّب [[curl -I]] و [[curl -r 0-99]] عليه.`,
          sol: R`~~~text الناتج (نفس الصفحة جوه iframe معزول زي الـ preview، Chrome 157)
ملف سليم (WAV)                       اشتغل: duration=2 currentSrc=blob:…
bytes بايظة بس النوع video/webm       error على العنصر: code=4 MEDIA_ERR_SRC_NOT_SUPPORTED — "PipelineStatus::DEMUXER_ERROR_COULD_NOT_OPEN: FFmpegDemuxer: open context failed"
blob اتعمله revoke                    error على العنصر: code=4 MEDIA_ERR_SRC_NOT_SUPPORTED — "MEDIA_ELEMENT_ERROR: Media load rejected by URL safety check"
src فاضي                              error على العنصر: code=4 MEDIA_ERR_SRC_NOT_SUPPORTED — "MEDIA_ELEMENT_ERROR: Empty src attribute"
اتنين source الاتنين بايظين            error على آخر source، و a.error = null، و networkState = 3 (NETWORK_NO_SOURCE)
source نوعه مش مدعوم، وبعده سليم        اشتغل: duration=2 currentSrc=blob:…
~~~

- الـ [[code]] **4** في كل الحالات تقريبًا، والفرق كله في [[message]]: [[DEMUXER_ERROR_COULD_NOT_OPEN]] يعني الـ bytes مش ميديا، و [[Empty src attribute]] واضحة. يعني [[code]] للبرنامج و [[message]] للّوج بتاعك (مش لليوزر، وبتختلف بين المتصفحات).
- الـ blob اللي اتعمله revoke: في صفحة عادية الرسالة كانت [[MEDIA_ELEMENT_ERROR: Format error]]، وجوه الـ iframe المعزول [[Media load rejected by URL safety check]]: نفس الغلطة ورسالتين، فمتبنيش منطق على نص الرسالة.
- مع [[<source>]]: [[a.error]] = [[null]]. لو بتشيك على [[a.error]] بس هتفتكر إن مفيش مشكلة.
- [[type="video/x-nope"]] اتعدّى من غير طلب، والـ WAV اللي بعده اشتغل.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** الفيديو ده عليه [[src]] **و** جواه [[<source>]] سليم. [[gone.mp4]] مش موجود و [[lesson.mp4]] موجود. هيشتغل؟ وكام طلب هيروح للسيرفر؟ وأنهي [[error]] هيتبعت؟

~~~html
<video id="v" src="gone.mp4" controls>
  <source src="lesson.webm" type="video/webm">
  <source src="lesson.mp4" type="video/mp4">
</video>
~~~`, done: R`كتبت توقّعك، وعرفت إن الـ [[<source>]] اتجاهلوا خالص.`, sol: R`~~~text الناتج (Chrome 157، صفحة على سيرفر محلي، ولوج السيرفر)
error على الفيديو: 4 MEDIA_ELEMENT_ERROR: Format error
GET /d3/gone.mp4 → 404        (طلب واحد بس)
~~~

- **[[src]] على العنصر بيلغي الـ [[<source>]] اللي جواه**، حتى لو كانوا سليمين. المتصفح جرّب [[gone.mp4]] بس، فشل، وبعت [[error]] على الفيديو نفسه بـ [[MediaError]].
- لاحظ إن الـ 404 طلعت **code 4** و [[Format error]] مش «network error»: Chrome بيعامل الرد اللي مش ميديا (صفحة 404) كصيغة مش مفهومة. وده نفس اللي حصل مع 503 من سيرفر مشغول.
- الصح: يا [[src]] يا [[<source>]]، مش الاتنين.` },
            { lvl: 'تطبيق', t: R`**مسألة:** اكتب [[describeMediaError(err)]] اللي بتاخد [[video.error]] وترجّع جملة لليوزر بالعربي: 1 «التحميل اتلغى»، 2 «النت قطع أثناء التحميل»، 3 «الملف بايظ ومش عارف يتفك»، 4 «الملف مش موجود أو صيغته مش مدعومة»، وأي رقم تاني «خطأ مش معروف». ولو فيه [[message]] تتحط بين قوسين في الآخر، ولو [[err]] بـ [[null]] ترجّع «مفيش خطأ». جرّبها في المربع.`, done: R`الاختبارات عدّت، ومنهم [[null]] (وده اللي هتلاقيه مع [[<source>]]) والرقم الغريب.`, sol: R`~~~js
function describeMediaError(err) {
  if (!err) return 'مفيش خطأ';
  const why = {
    1: 'التحميل اتلغى',
    2: 'النت قطع أثناء التحميل',
    3: 'الملف بايظ ومش عارف يتفك',
    4: 'الملف مش موجود أو صيغته مش مدعومة',
  }[err.code] || 'خطأ مش معروف';
  return why + (err.message ? ' (' + err.message + ')' : '');
}
console.log(describeMediaError({ code: 4, message: 'MEDIA_ELEMENT_ERROR: Format error' }));
console.log(describeMediaError({ code: 2, message: '' }));
console.log(describeMediaError(null));
~~~

~~~text الناتج (Node 24.22)
الملف مش موجود أو صيغته مش مدعومة (MEDIA_ELEMENT_ERROR: Format error)
النت قطع أثناء التحميل
مفيش خطأ
~~~

- object بالأرقام كمفاتيح بدل [[switch]] طويل، و [[|| 'خطأ مش معروف']] للرقم اللي مش في اللستة.
- [[if (!err)]] الأول: مع [[<source>]] الـ [[error]] بيبقى [[null]] (الدرس)، و [[err.code]] على [[null]] كان هيرمي [[TypeError]].
- الأرقام ممكن تكتبها [[MediaError.MEDIA_ERR_NETWORK]] بدل [[2]] في كود المتصفح، بس الـ object هنا شغال في Node والمتصفح الاتنين.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ (سيرفر):** السيرفر ده بيقدّم الفيديو، والفيديو بيشتغل، بس أي تقديم في الشريط بيرجّع للأول. صلّحه بحيث يدعم Range، واثبت بـ [[curl -r 0-99]] وبـ [[seekable]] في المتصفح.

~~~js
// slow-seek-server.mjs: بيبعت الملف كله دايمًا، ومبيعرفش Range
import { createServer } from 'node:http';
import { createReadStream, statSync } from 'node:fs';
const types = { '.html': 'text/html; charset=utf-8', '.mp4': 'video/mp4' };
createServer((req, res) => {
  const file = req.url === '/' ? 'index.html' : req.url.slice(1);
  const type = types[file.slice(file.lastIndexOf('.'))];
  if (!type) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': type, 'content-length': statSync(file).size });
  createReadStream(file).pipe(res);
}).listen(8792, () => console.log('http://localhost:8792'));
~~~`, done: R`[[curl -r 0-99]] بيرجّع [[206]] و [[content-range: bytes 0-99/133477]]، و [[seekable]] في المتصفح بقت من 0 للمدة، و [[currentTime = 4]] بيفضل 4.`, sol: R`~~~js media-server.mjs
// media-server.mjs: نفس السيرفر + Range (206 و 416 و Accept-Ranges)
import { createServer } from 'node:http';
import { createReadStream, statSync } from 'node:fs';
const types = { '.html': 'text/html; charset=utf-8', '.mp4': 'video/mp4', '.webm': 'video/webm', '.mp3': 'audio/mpeg', '.vtt': 'text/vtt' };
createServer((req, res) => {
  const file = req.url === '/' ? 'index.html' : decodeURIComponent(req.url.slice(1));
  const type = types[file.slice(file.lastIndexOf('.'))];
  let size;
  try { size = statSync(file).size; } catch { size = -1; }
  if (!type || size < 0 || file.includes('..')) { res.writeHead(404); return res.end(); }
  const m = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || '');
  if (!m) {
    res.writeHead(200, { 'content-type': type, 'content-length': size, 'accept-ranges': 'bytes' });
    return createReadStream(file).pipe(res);
  }
  // bytes=100-199 أو bytes=100- (للآخر) أو bytes=-500 (آخر 500 byte)
  let start = m[1] === '' ? size - Number(m[2]) : Number(m[1]);
  let end = m[1] !== '' && m[2] !== '' ? Math.min(Number(m[2]), size - 1) : size - 1;
  if (start < 0) start = 0;
  if (start >= size || start > end) {
    res.writeHead(416, { 'content-range': 'bytes */' + size });
    return res.end();
  }
  res.writeHead(206, {
    'content-type': type,
    'content-length': end - start + 1,
    'content-range': 'bytes ' + start + '-' + end + '/' + size,
    'accept-ranges': 'bytes',
  });
  console.log(req.method, req.url, req.headers.range, '→ 206', start + '-' + end);
  createReadStream(file, { start, end }).pipe(res);
}).listen(8792, () => console.log('http://localhost:8792'));
~~~

~~~text الناتج (Chrome 157، نفس الفيديو MP4 مدته 6.02 ثانية، قبل وبعد)
                          السيرفر القديم              بعد التصليح
curl -r 0-99              HTTP/1.1 200 OK             HTTP/1.1 206 Partial Content
                          content-length: 133477      content-range: bytes 0-99/133477
                                                      content-length: 100
                                                      accept-ranges: bytes
duration                  3.39   ← غلط                6.02
seekable                  0.00-0.00 (مفيش)            0.00-6.02
currentTime = 4           رجع 0.00                    4.00
لوج السيرفر               —                           GET /lesson.mp4 bytes=0- → 206 0-133476
~~~

- **[[Range: bytes=0-]]**: Chrome بيطلب كده من أول طلب. لو الرد [[200]] من غير [[Accept-Ranges]]، Chrome بيفهم إن السيرفر مبيعرفش يدّيه حتة من النص، فـ [[seekable]] بتبقى فاضية وأي seek بيرجع لـ 0.
- **المدة نفسها طلعت غلط (3.39 بدل 6.02)** مع السيرفر القديم: Chrome محتاج يقرا أجزاء من آخر الـ MP4 عشان يعرف المدة بالظبط، ومن غير Range مقدرش.
- **الـ ٣ أشكال للـ Range:** [[bytes=100-199]] (من لـ)، و [[bytes=100-]] (للآخر)، و [[bytes=-500]] (آخر 500 byte). والـ regex [[/^bytes=(\d*)-(\d*)$/]] بيمسك التلاتة.
- **[[416]]** لو البداية بعد آخر الملف، ومعاه [[content-range: bytes */size]].
- [[createReadStream(file, { start, end })]]: [[end]] **شاملة** (inclusive)، فطول الرد [[end - start + 1]].
- [[file.includes('..')]]: من غيره [[/../../secret.txt]] كان ممكن يقرا ملفات برّه الفولدر (path traversal).
- في الشغل الحقيقي nginx و Caddy وكل الـ CDNs بيعملوا Range لوحدهم. المشكلة بتظهر في سيرفر Node أو PHP كاتبه بإيدك بيقرا الملف ويبعته.` },
            { lvl: 'تحدي', t: R`**ابني:** فيديو من سيرفر بيرد [[503]] أحيانًا. اكتب [[error]] handler بيعيد المحاولة لحد ٣ مرات بانتظار بيتضاعف (500 ثم 1000 ثم 2000 ms)، ويكمّل من نفس المكان، ويكتب لليوزر بيحصل إيه، ويستسلم برسالة واضحة بعد ٣.`, done: R`على سيرفر بيرد 503 أول مرتين: الرسالة بتقول «بنحاول تاني (1/3)» وبعدين «اشتغل بعد 2 محاولة»، ولوج السيرفر فيه 503 و 503 و 206.`, sol: R`~~~html retry.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>إعادة المحاولة</title></head>
<body>
<video id="v" src="/flaky/clip.webm" controls muted width="320"></video>
<p id="msg" role="status"></p>
<script>
  const v = document.querySelector('#v'), msg = document.querySelector('#msg');
  const MAX = 3;
  let tries = 0, resumeAt = 0;
  v.addEventListener('error', () => {
    const code = v.error.code;
    // 1 = اليوزر لغى، و 4 من غير ما نكون حمّلنا ولا مرة ممكن يبقى سيرفر مشغول (503 بيطلع Format error)
    if (code === MediaError.MEDIA_ERR_ABORTED || tries >= MAX) {
      msg.textContent = 'الفيديو مش راضي يشتغل بعد ' + tries + ' محاولات (' + v.error.message + ').';
      return;
    }
    tries++;
    resumeAt = v.currentTime;
    const wait = 500 * 2 ** (tries - 1);            // 500 ثم 1000 ثم 2000 ms
    msg.textContent = 'مشكلة في التحميل، بنحاول تاني (' + tries + '/' + MAX + ') بعد ' + wait + 'ms…';
    setTimeout(() => { v.load(); }, wait);            // load() بيبدأ الطلب من جديد بنفس الـ src
  });
  v.addEventListener('loadedmetadata', () => {
    if (resumeAt) v.currentTime = resumeAt;           // نكمّل من نفس المكان
    msg.textContent = tries ? 'اشتغل بعد ' + tries + ' محاولة.' : 'اشتغل.';
  });
</script>
</body>
</html>
~~~

~~~text الناتج (Chrome 157، Playwright، سيرفر الـ lab بيرد 503 على أول طلبين)
بعد 300ms:   مشكلة في التحميل، بنحاول تاني (1/3) بعد 500ms…
بعد 3.3s:    اشتغل بعد 2 محاولة.
لوج السيرفر:
GET /flaky/clip.webm bytes=0- 503
GET /flaky/clip.webm bytes=0- 503
GET /flaky/clip.webm bytes=0- 206 bytes 0-145733/145734
~~~

- **[[v.load()]]** بيعيد اختيار الملف وتحميله بنفس الـ [[src]] من غير ما تكتبه تاني.
- **[[resumeAt]]**: [[load()]] بيرجّع [[currentTime]] لـ 0، فبنحفظه قبلها ونرجعله في [[loadedmetadata]].
- **[[500 * 2 ** (tries - 1)]]**: الـ [[**]] أس، فالانتظار ٥٠٠ ثم ١٠٠٠ ثم ٢٠٠٠ (exponential backoff)، عشان منضربش سيرفر مشغول أصلًا بطلبات ورا بعض.
- **[[MEDIA_ERR_ABORTED]]** (1) منعيدش فيه: ده اليوزر أو كودك لغى التحميل.
- **اللي اتقاس كمان:** سيرفر بيقطع الاتصال في نص الملف (بعد 90 KB) **بيدعم** Range: Chrome بعت طلب تاني لوحده [[bytes=90001-]] والفيديو كمّل للآخر من غير ما [[error]] يتبعت خالص. الـ Range مش بس للتقديم: هو اللي بيخلي المتصفح يكمّل بعد انقطاع.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من صفحة «Media container formats» وصفحة «Common media types» على MDN، اكتب الـ MIME type الصح اللي السيرفر يبعته لـ: [[.mp4]] و [[.m4a]] و [[.webm]] و [[.ogg]] و [[.opus]] و [[.mp3]] و [[.wav]] و [[.flac]] و [[.vtt]] و [[.m3u8]] و [[.mpd]]. وبعدين جاوب: Chrome بيرفض الفيديو لو السيرفر بعته بنوع غلط؟ (جرّب بسيرفر بيبعت [[text/plain]]).`, done: R`جدول بالـ ١١ نوع، ورد على السؤال من تجربة.`, sol: R`| الامتداد | الـ MIME type |
|---|---|
| [[.mp4]] | [[video/mp4]] (و [[audio/mp4]] لو صوت بس) |
| [[.m4a]] | [[audio/mp4]] |
| [[.webm]] | [[video/webm]] (و [[audio/webm]] لو صوت بس) |
| [[.ogg]] | [[audio/ogg]] (و [[.ogv]] [[video/ogg]]) |
| [[.opus]] | [[audio/ogg]] غالبًا ([[audio/opus]] بيتستخدم كمان) |
| [[.mp3]] | [[audio/mpeg]] |
| [[.wav]] | [[audio/wav]] |
| [[.flac]] | [[audio/flac]] |
| [[.vtt]] | [[text/vtt]] (ملفات الترجمة، ولازم يبقى كده وإلا [[<track>]] مبيشتغلش، من MDN) |
| [[.m3u8]] | [[application/vnd.apple.mpegurl]] (قايمة HLS) |
| [[.mpd]] | [[application/dash+xml]] (قايمة DASH) |

~~~text الناتج (Chrome 157، نفس clip.webm من سيرفر الـ lab بـ 3 headers مختلفة)
content-type: video/webm                                 canplaythrough duration=5.975858
content-type: text/plain                                 canplaythrough duration=5.975858
content-type: text/plain + X-Content-Type-Options: nosniff  canplaythrough duration=5.975858
~~~

- **Chrome 157 شغّل الفيديو في التلات حالات**: بيبص على أول bytes من الملف (sniffing) وبيعرف إنه WebM، حتى مع [[nosniff]].
- ده **مش** معناه إن النوع مش مهم: MDN بيقول السيرفر لازم يبعت النوع الصح، والمتصفحات التانية مش لازم تعمل زي Chrome (متقستش هنا)، و [[type]] على [[<source>]] هو اللي بيخلي المتصفح يتخطى صيغة من غير ما يحمّلها، والـ [[.vtt]] بالذات بيترفض بنوع غلط. ابعت النوع الصح ومتعتمدش على الـ sniffing.` },
          ],
          check: { lang: "js", starter: R`function describeMediaError(err) {
  // 1 اتلغى، 2 شبكة، 3 بايظ، 4 مش مدعوم/مش موجود، و null => "مفيش خطأ"
}`, tests: R`test("null من source", () => expect(describeMediaError(null)).toBe("مفيش خطأ"));
test("4 ومعاه رسالة", () => expect(describeMediaError({ code: 4, message: "MEDIA_ELEMENT_ERROR: Format error" })).toBe("الملف مش موجود أو صيغته مش مدعومة (MEDIA_ELEMENT_ERROR: Format error)"));
test("2 من غير رسالة", () => expect(describeMediaError({ code: 2, message: "" })).toBe("النت قطع أثناء التحميل"));
test("3", () => expect(describeMediaError({ code: 3, message: "" })).toBe("الملف بايظ ومش عارف يتفك"));
test("1", () => expect(describeMediaError({ code: 1 })).toBe("التحميل اتلغى"));
test("رقم غريب", () => expect(describeMediaError({ code: 9, message: "x" })).toBe("خطأ مش معروف (x)"));`, solution: R`function describeMediaError(err) {
  if (!err) return 'مفيش خطأ';
  const why = { 1: 'التحميل اتلغى', 2: 'النت قطع أثناء التحميل', 3: 'الملف بايظ ومش عارف يتفك', 4: 'الملف مش موجود أو صيغته مش مدعومة' }[err.code] || 'خطأ مش معروف';
  return why + (err.message ? ' (' + err.message + ')' : '');
}` },
          flag: "script",
          deep: {
            why: R`الميديا هي أكتر حاجة بتفشل بصمت في الويب: الملف صيغته مش مدعومة على iPhone، أو اسمه اتغيّر في الـ deploy، أو السيرفر مبيدعمش Range، أو CDN رجّع صفحة خطأ HTML. والمتصفح مبيعرضش لليوزر أي رسالة: مستطيل أسود وخلاص. فلو مكتبتش [[error]] handler، اليوزر بيمشي من غير ما حد يعرف، والـ support بيستقبل «الفيديو مش شغال» من غير تفاصيل. والـ outcome ده في منهج MDN: [[<source>]] لأكتر من صيغة، والـ MIME type الصح، والبديل لما الصيغة مش مدعومة.`,
            how: R`لما العنصر يحتاج يختار ملف (resource selection): لو فيه [[src]]، بيجرّبه هو بس، ولو فشل بيحط [[element.error]] = [[MediaError]] ويبعت [[error]] على العنصر. لو مفيش [[src]]، بيمشي على الـ [[<source>]] بالترتيب: اللي [[type]] بتاعه [[canPlayType]] رد عليه [[""]] بيتعدّى من غير طلب، والباقي بيتطلب، ولو فشل بيتبعت [[error]] على الـ [[<source>]] ده (من غير تفاصيل) ويروح للي بعده. بعد آخر واحد، [[networkState]] بيبقى 3 ([[NETWORK_NO_SOURCE]]) و [[element.error]] بيفضل [[null]] (اتقاس).

الطلب نفسه بيتبعت بـ [[Range: bytes=0-]]. السيرفر اللي بيدعمه بيرد [[206]] و [[Content-Range]] و [[Accept-Ranges: bytes]]، وبعدين أي seek لمكان مش متحمّل بيبقى طلب جديد بـ [[bytes=N-]] (نفس اللي حصل بعد قطع الاتصال). السيرفر اللي بيرد [[200]] دايمًا بيخلي [[seekable]] فاضية. ولو الرد مش ميديا خالص (404 أو 503 فيهم HTML أو نص)، Chrome بيحاول يفكه ويفشل فبيدّي code 4.`,
            when: R`في كل مشغّل حقيقي: [[error]] على العنصر لو بتستخدم [[src]] (أو [[blob:]] من تسجيل)، و [[error]] على آخر [[<source>]] لو عندك صيغ، ورسالة وبديل (لينك تحميل، أو صورة، أو «جرّب متصفح تاني»). ولوج للـ [[code]] و [[message]] و [[currentSrc]] لسيرفرك عشان تعرف المشكلة فين. وإعادة محاولة لما المشكلة ممكن تكون مؤقتة (503، أو شبكة). وافحص السيرفر بـ [[curl -I]] و [[curl -r 0-99]] أول ما تحط فيديو على أي استضافة جديدة.`,
            mistakes: R`- [[error]] على الـ [[<video>]] بس مع [[<source>]]: مش هيتبعت خالص (اتقاس)، والفيديو بيفشل وكودك ساكت.
- تشيك [[video.error]] بعد فشل الـ [[<source>]]: [[null]]. اسأل [[networkState === 3]].
- [[src]] و [[<source>]] مع بعض: الـ [[<source>]] بتتجاهل.
- تكتب لليوزر [[error.message]]: رسايل زي [[PipelineStatus::DEMUXER_ERROR_COULD_NOT_OPEN]] بتختلف بين المتصفحات ومش مفهومة. اعرض جملة من الـ [[code]]، واكتب الـ [[message]] في اللوج.
- تفتكر الكلام اللي جوه [[<video>]] هيظهر لما الملفات تفشل: ده للمتصفحات اللي مبتعرفش [[<video>]] أصلًا. اتقاس: [[getClientRects().length]] = 0 والملفات فاشلة.
- سيرفر مبيدعمش Range: الفيديو بيشتغل والشريط مبيقدّمش، و MP4 مدته بتطلع غلط.
- [[<source type="video/mp4">]] على ملف WebM: المتصفح بيصدّق الـ [[type]] وممكن يتخطى ملف كان هيشتغل.`,
          },
          teach: R`## الفكرة في سطر

الفشل بيوصلك كحدث [[error]]، وانت اللي تقرر تعرض إيه. كل الناتج من Chrome 157 بـ Playwright على سيرفر [[node:http]] بتاع الـ lab: بيقدّم الملفات صح، وفيه مسارات بتغلط بقصد ([[/plain/]] نوع غلط، و [[/norange/]] من غير Range، و [[/flaky/]] بيرد 503 أول مرتين).

---

## ١. الـ [[error]] بيتبعت فين؟

| الـ HTML | الـ [[error]] بيروح فين | [[element.error]] |
|---|---|---|
| [[<video src="x.mp4">]] | على الـ [[<video>]] نفسه | [[MediaError]] فيه [[code]] و [[message]] |
| [[<video>]] وجواه [[<source>]] | على كل [[<source>]] بيفشل، بالترتيب | [[null]] طول الوقت |
| الاتنين مع بعض | [[src]] بس بيتجرّب، والـ [[<source>]] بتتجاهل | زي أول صف |

~~~text الناتج (Chrome 157: video فيه 3 source، الأول 404 والتاني bytes بايظة والتالت نوعه مش معروف)
error على source رقم 1 (/missing.webm) video.error=null networkState=2
error على source رقم 2 (/broken.wav) video.error=null networkState=3
نهاية: networkState=3 (NETWORK_NO_SOURCE=3)
~~~

- التالت ([[type="video/x-nope"]]) **متطلبش خالص** ومبعتش [[error]]: [[canPlayType]] رد [[""]] فاتعدّى.
- الـ [[error]] على الـ [[<source>]] مالوش تفاصيل: [[Event]] عادي. عشان تعرف مين فشل، اقرا [[getAttribute('src')]] من العنصر نفسه.
- **«كله فشل» = [[error]] على آخر [[<source>]]**، أو [[networkState === HTMLMediaElement.NETWORK_NO_SOURCE]].

---

## ٢. [[MediaError]]: الكود والرسالة

| [[code]] | الثابت | المعنى في الـ spec |
|---|---|---|
| 1 | [[MEDIA_ERR_ABORTED]] | التحميل اتلغى بطلب (اليوزر أو كودك) |
| 2 | [[MEDIA_ERR_NETWORK]] | الشبكة فشلت بعد ما الملف اتعرف إنه ميديا |
| 3 | [[MEDIA_ERR_DECODE]] | الملف اتعرف بس فيه حتة بايظة في الفك |
| 4 | [[MEDIA_ERR_SRC_NOT_SUPPORTED]] | الملف مش مناسب: مش موجود، أو صيغة مش مدعومة، أو مش ميديا |

~~~text الناتج (Chrome 157، src واحد على العنصر في كل سطر)
/missing.webm (404)           code=4 message="MEDIA_ELEMENT_ERROR: Format error"
/flaky/tone.wav (503)         code=4 message="MEDIA_ELEMENT_ERROR: Format error"
/broken.wav (bytes عشوائية)    code=4 message="PipelineStatus::DEMUXER_ERROR_COULD_NOT_OPEN: FFmpegDemuxer: open context failed"
/blank.html (صفحة HTML)       code=4 message="PipelineStatus::DEMUXER_ERROR_COULD_NOT_OPEN: FFmpegDemuxer: open context failed"
src=""                         code=4 message="MEDIA_ELEMENT_ERROR: Empty src attribute"
blob اتعمله revokeObjectURL    code=4 message="MEDIA_ELEMENT_ERROR: Format error"
~~~

- **كله 4.** حتى الـ 404 والـ 503 (اللي ممكن تتوقعهم 2)، لأن Chrome استلم رد مش ميديا وحاول يفكه. الـ 2 والـ 3 بيظهروا لما الملف اتعرف إنه ميديا وبعدين حاجة وقعت في النص.
- **الرسالة مش API:** بتختلف بين المتصفحات، وحتى بين الصفحة العادية والـ iframe المعزول (الـ revoke طلع [[Media load rejected by URL safety check]] هناك). استخدمها في اللوج بس.

---

## ٣. الـ MIME type و [[type]] على [[<source>]]

السيرفر بيبعت [[Content-Type]] مع كل ملف، والـ [[type]] على [[<source>]] بيقول للمتصفح «ده نوعه» **قبل** ما يطلب.

~~~text الناتج (Chrome 157، نفس clip.webm بـ 3 headers)
content-type: video/webm                                 canplaythrough duration=5.975858
content-type: text/plain                                 canplaythrough duration=5.975858
content-type: text/plain + X-Content-Type-Options: nosniff  canplaythrough duration=5.975858
~~~

- **Chrome 157 مبيرفضش الميديا بسبب [[Content-Type]] غلط:** بيقرا أول bytes من الملف ويعرف نوعه. ده اللي اتقاس على Chrome بس.
- ومع كده ابعت النوع الصح دايمًا: MDN بيطلبه، ومتصفحات تانية مش مضطرة تعمل sniffing، و [[text/vtt]] للترجمة لازم يبقى صح.
- [[type]] الغلط على [[<source>]] أخطر: لو كتبت [[type="video/x-nope"]] على ملف سليم، المتصفح مش هيطلبه أصلًا.
- وحاجة شبه دي في درس «audio و source»: من غير [[type]]، المتصفح بيطلب كل ملف عشان يعرف.

---

## ٤. Range و [[206 Partial Content]]

الفيديو مش بيتحمّل كله مرة واحدة. المتصفح بيطلب حتت: [[Range: bytes=0-]] في الأول، ولما تقدّم لمكان مش متحمّل [[Range: bytes=90001-]].

~~~text لوج السيرفر (Chrome 157 بيحمّل وبيشغّل clip.webm)
GET /clip.webm bytes=0- 206 bytes 0-145733/145734
~~~

السيرفر ده بيدعم Range (الـ lab بيستخدم نسخة منه فيها المسارات البايظة):

~~~js media-server.mjs
// media-server.mjs: نفس السيرفر + Range (206 و 416 و Accept-Ranges)
import { createServer } from 'node:http';
import { createReadStream, statSync } from 'node:fs';
const types = { '.html': 'text/html; charset=utf-8', '.mp4': 'video/mp4', '.webm': 'video/webm', '.mp3': 'audio/mpeg', '.vtt': 'text/vtt' };
createServer((req, res) => {
  const file = req.url === '/' ? 'index.html' : decodeURIComponent(req.url.slice(1));
  const type = types[file.slice(file.lastIndexOf('.'))];
  let size;
  try { size = statSync(file).size; } catch { size = -1; }
  if (!type || size < 0 || file.includes('..')) { res.writeHead(404); return res.end(); }
  const m = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || '');
  if (!m) {
    res.writeHead(200, { 'content-type': type, 'content-length': size, 'accept-ranges': 'bytes' });
    return createReadStream(file).pipe(res);
  }
  // bytes=100-199 أو bytes=100- (للآخر) أو bytes=-500 (آخر 500 byte)
  let start = m[1] === '' ? size - Number(m[2]) : Number(m[1]);
  let end = m[1] !== '' && m[2] !== '' ? Math.min(Number(m[2]), size - 1) : size - 1;
  if (start < 0) start = 0;
  if (start >= size || start > end) {
    res.writeHead(416, { 'content-range': 'bytes */' + size });
    return res.end();
  }
  res.writeHead(206, {
    'content-type': type,
    'content-length': end - start + 1,
    'content-range': 'bytes ' + start + '-' + end + '/' + size,
    'accept-ranges': 'bytes',
  });
  console.log(req.method, req.url, req.headers.range, '→ 206', start + '-' + end);
  createReadStream(file, { start, end }).pipe(res);
}).listen(8792, () => console.log('http://localhost:8792'));
~~~

~~~bash
node media-server.mjs
curl -I http://localhost:8792/lesson.mp4
curl -s -D - -o /dev/null -r 0-99 http://localhost:8792/lesson.mp4
~~~

~~~text الناتج (Git Bash على ويندوز، سيرفر الـ lab على clip.webm)
HTTP/1.1 200 OK
content-type: video/webm
accept-ranges: bytes
content-length: 145734

HTTP/1.1 206 Partial Content
content-type: video/webm
accept-ranges: bytes
content-range: bytes 0-99/145734
content-length: 100
~~~

~~~text الناتج (نفس السيرفر: curl -r -500 و curl -r 999999-)
HTTP/1.1 206 Partial Content
content-range: bytes 145234-145733/145734
content-length: 500

HTTP/1.1 416 Range Not Satisfiable
content-range: bytes */145734
~~~

- **[[curl -I]]**: [[HEAD]] request، الـ headers بس. اللي بتدوّر عليه [[accept-ranges: bytes]].
- **[[curl -r 0-99]]** = [[Range: bytes=0-99]]، و [[-D -]] بيطبع الـ headers، و [[-o /dev/null]] بيرمي الـ body. على PowerShell نفس الأمر بـ [[curl.exe]] و [[-o NUL]].
- **[[-r -500]]** آخر 500 byte: MP4 كتير بيبقى الـ index بتاعه في الآخر، والمتصفح بيطلبه كده.

ومن غير Range:

~~~text الناتج (Chrome 157، /norange/ بيرد 200 دايمًا)
norange webm: duration=5.975858 seekable=0.00-0.00 → بعد currentTime=2: 0
norange mp4:  duration=3.389458 seekable=0.00-0.00 → بعد currentTime=2: 0   (المدة الحقيقية 6.02)
range mp4:    duration=6.016267 seekable=0.00-6.02 → بعد currentTime=2: 2
~~~

- [[seekable]] فاضية، وأي seek بيرجع لـ 0، والـ MP4 مدته طلعت غلط. ده الباج المشهور «الشريط مش بيقدّم» وأصله دايمًا السيرفر.
- **وقطع الاتصال:** سيرفر قفل الاتصال بعد 90 KB من ملف 145 KB، و Chrome طلب [[bytes=90001-]] لوحده وكمّل الفيديو للآخر من غير [[error]]. Range = تقديم + استكمال بعد انقطاع.

---

## ٥. البديل (fallback) من JavaScript

~~~html
<video controls>
  <source src="lesson.av1.webm" type='video/webm; codecs="av01.0.05M.08, opus"'>
  <source src="lesson.webm" type="video/webm">
  <source src="lesson.mp4" type="video/mp4">
  <p>المتصفح ده مش بيعرف يشغّل فيديو. <a href="lesson.mp4">نزّل الفيديو</a>.</p>
</video>
~~~

الـ [[<p>]] اللي جوه للمتصفحات اللي **مبتعرفش [[<video>]] أصلًا**. لو الملفات كلها فشلت في Chrome، الـ [[<p>]] مش بيظهر:

~~~text الناتج (Chrome 157، الصفحة الكاملة في التمرين، وكل الـ 3 ملفات فاشلين)
الـ p اللي جوه video ظاهرة؟ false
فشل: lesson.av1.webm
فشل: lesson.webm
فشل: gone.mp4
.fallback => الفيديو مش راضي يشتغل هنا. نزّله وشوفه على جهازك.
~~~

فالبديل الحقيقي من JavaScript، على آخر [[<source>]]:

~~~js
sources.at(-1).addEventListener('error', () => {
  const box = document.createElement('p');
  box.className = 'fallback';
  box.innerHTML = 'الفيديو مش راضي يشتغل هنا. <a href="lesson.mp4" download>نزّله وشوفه على جهازك</a>.';
  v.replaceWith(box);
});
~~~

ولما الـ MP4 موجود (الـ AV1 مش موجود، والـ WebM بايظ)، لوج السيرفر بيوريك الترتيب:

~~~text لوج السيرفر
GET /d3/lesson.av1.webm bytes=0- 404
GET /d3/lesson.webm bytes=0- 206 bytes 0-3999/4000
GET /d3/lesson.mp4 bytes=0- 206 bytes 0-133476/133477
اشتغل: lesson.mp4 — 6.02s
~~~

---

## ٦. دكتور الميديا (حي)

كل الحالات بتتعمل في الذاكرة (WAV سليم، و bytes عشوائية، و blob اتعمله revoke)، فبتشتغل جوه الـ preview:

~~~live 380 دكتور الميديا
<style>
  body { font-family: system-ui, sans-serif; margin: 12px; }
  table { border-collapse: collapse; width: 100%; font-size: 14px; }
  td, th { border: 1px solid #cbd5e1; padding: 6px; text-align: start; vertical-align: top; }
  td:last-child { font-family: monospace; direction: ltr; text-align: left; }
  .ok { background: #dcfce7; } .bad { background: #fee2e2; }
</style>
<p>كل صف ملف ميديا اتعمل في الذاكرة، والصفحة بتجرّبه وتكتب اللي المتصفح قاله:</p>
<table>
  <thead><tr><th>الحالة</th><th>اللي حصل</th></tr></thead>
  <tbody id="rows"></tbody>
</table>
<script>
  function makeWav(seconds) {
    const rate = 8000, n = seconds * rate, buf = new ArrayBuffer(44 + n * 2), v = new DataView(buf);
    const str = (o, s) => [...s].forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)));
    str(0, 'RIFF'); v.setUint32(4, 36 + n * 2, true); str(8, 'WAVE'); str(12, 'fmt ');
    v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
    v.setUint32(24, rate, true); v.setUint32(28, rate * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true);
    str(36, 'data'); v.setUint32(40, n * 2, true);
    return new Blob([buf], { type: 'audio/wav' });
  }
  const NAMES = ['', 'MEDIA_ERR_ABORTED', 'MEDIA_ERR_NETWORK', 'MEDIA_ERR_DECODE', 'MEDIA_ERR_SRC_NOT_SUPPORTED'];
  const good = URL.createObjectURL(makeWav(2));
  const junk = URL.createObjectURL(new Blob([new Uint8Array(3000).map((_, i) => i * 37)], { type: 'video/webm' }));
  const gone = URL.createObjectURL(makeWav(1)); URL.revokeObjectURL(gone);

  // بيجرّب عنصر ويرجّع جملة: اشتغل ولا وقع وليه
  function probe(setup) {
    return new Promise((done) => {
      const a = document.createElement('audio');
      const sources = [];
      a.addEventListener('loadedmetadata', () => done(['ok', 'اشتغل: duration=' + a.duration + ' currentSrc=' + (a.currentSrc.startsWith('blob:') ? 'blob:…' : a.currentSrc)]));
      a.addEventListener('error', () => done(['bad', 'error على العنصر: code=' + a.error.code + ' ' + NAMES[a.error.code] + ' — "' + a.error.message + '"']));
      setup(a, sources);
      setTimeout(() => done(['bad', 'مفيش رد في ٣ ثواني: networkState=' + a.networkState]), 3000);
      sources.forEach((s, i) => s.addEventListener('error', () => {
        if (i === sources.length - 1) done(['bad', 'error على آخر source، و a.error = ' + a.error + '، و networkState = ' + a.networkState + ' (NETWORK_NO_SOURCE)']);
      }));
    });
  }
  const cases = [
    ['ملف سليم (WAV)', (a) => (a.src = good)],
    ['bytes بايظة بس النوع video/webm', (a) => (a.src = junk)],
    ['blob اتعمله revoke', (a) => (a.src = gone)],
    ['src فاضي', (a) => a.setAttribute('src', '')],
    ['اتنين source الاتنين بايظين', (a, list) => {
      for (const [src, type] of [[junk, 'video/webm'], [junk, 'audio/wav']]) { const s = document.createElement('source'); s.src = src; s.type = type; a.append(s); list.push(s); }
    }],
    ['source نوعه مش مدعوم، وبعده سليم', (a, list) => {
      for (const [src, type] of [[junk, 'video/x-nope'], [good, 'audio/wav']]) { const s = document.createElement('source'); s.src = src; s.type = type; a.append(s); list.push(s); }
    }],
  ];
  (async () => {
    for (const [label, setup] of cases) {
      const [cls, text] = await probe(setup);
      const tr = document.createElement('tr'); tr.className = cls;
      tr.innerHTML = '<td></td><td></td>'; tr.cells[0].textContent = label; tr.cells[1].textContent = text;
      document.querySelector('#rows').append(tr);
    }
  })();
</script>
~~~

- **[[probe(setup)]]** بترجّع Promise بيتحقق بأول حاجة تحصل: [[loadedmetadata]] (اشتغل)، أو [[error]] على العنصر، أو [[error]] على آخر [[<source>]]، أو ٣ ثواني من غير رد.
- **الـ junk:** [[new Uint8Array(3000).map((_, i) => i * 37)]] أرقام ملهاش معنى، و [[type: 'video/webm']] كدب: المتصفح مش بيصدّق النوع وبيفشل في الفك.
- **[[URL.revokeObjectURL(gone)]]** على طول بعد ما اتعمل: العنوان بقى ميت.
- اتقاس جوه [[iframe sandbox="allow-scripts allow-forms"]] (نفس الـ preview) وفي صفحة عادية، والفرق الوحيد رسالة الـ revoke.

---

## الخلاصة

- [[src]] = الخطأ على العنصر وفيه [[MediaError]]. و [[<source>]] = خطأ على كل [[<source>]] و [[element.error]] بـ [[null]]، وآخر واحد = كله فشل.
- Chrome بيدّي code 4 لأي رد مش ميديا (404 و 503 كمان). الكود للبرنامج والرسالة للّوج.
- الكلام اللي جوه [[<video>]] مش بديل للفشل: البديل من JavaScript.
- السيرفر لازم يرد [[206]] على [[Range]]، وإلا مفيش تقديم والمدة ممكن تطلع غلط. افحص بـ [[curl -I]] و [[curl -r 0-99]].
- ابعت الـ MIME الصح حتى لو Chrome بيسامح، و [[type]] على [[<source>]] لازم يبقى صح.`,
          lines: [
            R`بنجيب الفيديو اللي جواه الـ [[<source>]] التلاتة.`,
            R`الـ spread جوه قوسين مربعين بيحوّل الـ [[NodeList]] لـ array عادية عشان نستخدم [[at(-1)]] و [[forEach]].`,
            R`على كل [[<source>]] بنسمع [[error]] ونطبع اسم الملف اللي فشل، لأن الحدث نفسه مفيهوش تفاصيل.`,
            R`[[at(-1)]] = آخر عنصر. فشله معناه إن المتصفح جرّب كل الملفات ومفيش ولا واحد اشتغل.`,
            R`[[replaceWith]] بيحط [[<p>]] مكان الفيديو، و [[Object.assign]] بيعمل العنصر ويحط نصه في سطر واحد.`,
            R`قفلة الـ listener.`,
            R`ده للحالة التانية: لو الفيديو عليه [[src]] بدل [[<source>]]، الخطأ على العنصر وفيه [[code]] و [[message]].`,
            R`[[currentSrc]] بيقولك أنهي ملف اتاخد فعلًا من التلاتة، ومفيد في اللوج.`,
          ],
          ref: [
            { t: "MDN: MediaError", url: "https://developer.mozilla.org/en-US/docs/Web/API/MediaError" },
            { t: "MDN: HTMLMediaElement error event", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/error_event" },
            { t: "MDN: HTMLSourceElement", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLSourceElement" },
            { t: "MDN: Audio and video delivery", url: "https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Audio_and_video_delivery" },
            { t: "MDN: HTTP range requests", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Range_requests" },
            { t: "MDN: 206 Partial Content", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/206" },
            { t: "MDN: Media container formats", url: "https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Containers" },
          ],
          pre: [{ to: "js/HTMLMediaElement: play و pause و currentTime والصيغ", why: R`[[canPlayType]] و [[networkState]] والأحداث` }, { to: "css/audio و source", why: R`[[<source type>]] من ناحية HTML` }],
        },
        {
          cmd: "getUserMedia: الكاميرا والميكروفون",
          title: "إزاي تفتح كاميرا اليوزر والميكروفون من الصفحة، وتتعامل مع الرفض، وتقفلهم صح، وتصوّر صورة؟",
          desc: R`[[navigator.mediaDevices.getUserMedia(constraints)]] بيطلب إذن الكاميرا أو الميكروفون، وبيرجّع Promise بـ [[MediaStream]]: stream حي فيه tracks (track فيديو و track صوت). بتعرضه في [[<video>]] بـ [[video.srcObject = stream]]، وبتقفله بـ [[track.stop()]] على كل track (وده اللي بيطفي نور الكاميرا).

• الـ constraints: [[{ video: true, audio: true }]]، أو تفاصيل زي [[{ video: { width: { ideal: 1280 }, facingMode: 'user' } }]].
• الرفض أخطاء بأسامي: [[NotAllowedError]] (رفض الإذن)، و [[NotFoundError]] (مفيش جهاز)، و [[NotReadableError]] (الجهاز مشغول)، و [[OverconstrainedError]] (مفيش جهاز بالمواصفات).
• الصفحة لازم تبقى **secure context**: [[https://]] أو [[localhost]]. غير كده [[navigator.mediaDevices]] نفسها [[undefined]].
• [[enumerateDevices()]] بيدّيك الأجهزة، والأسامي بتظهر بعد الإذن بس. والصورة: [[drawImage(video)]] على canvas وبعدين [[toBlob]].`,
          example: R`// camera.js: افتح الكاميرا، اعرضها، صوّر، واقفل (صفحة على https أو localhost فيها <video id="live" muted playsinline>)
const live = document.querySelector('#live');
const stream = await navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 1280 } }, audio: false });
live.srcObject = stream;
await live.play();
console.log(stream.getVideoTracks()[0].label, stream.getVideoTracks()[0].getSettings());
const c = Object.assign(document.createElement('canvas'), { width: live.videoWidth, height: live.videoHeight });
c.getContext('2d').drawImage(live, 0, 0);
const photo = await new Promise((r) => c.toBlob(r, 'image/jpeg', 0.85));
console.log(photo.type, photo.size);
stream.getTracks().forEach((t) => t.stop());`,
          try: R`انسخ صفحة «الكاميرا» اللي في آخر الشرح لملف [[cam.html]]، وشغّلها من سيرفر محلي (مثلًا [[media-server.mjs]] من درس الأخطاء بعد ما تزوّد [[.html]]، أو [[npx serve]]) وافتحها على [[http://localhost]]. دوس «افتح الكاميرا» واسمح، وبعدين «صوّر» و«اقفل»، وبص على نور الكاميرا. وبعدين اقفلها وافتحها تاني، والمرة دي **ارفض** الإذن: الرسالة قالت إيه؟ وفي الآخر افتح نفس الصفحة بالـ IP بتاع جهازك ([[http://192.168…]]) بدل [[localhost]].`,
          sol: R`~~~text الناتج (Chrome 157، Playwright بكاميرا ومايك وهميين: --use-fake-device-for-media-stream)
سمحت:          شغالة: fake_device_0 — 1280×720
صوّر:           اتصورت: 1280×720، 13 KB (image/jpeg)
اقفل:           الكاميرا اتقفلت، ونورها هيطفي.
رفضت:          انت (أو المتصفح) رفضت الإذن. افتحه من علامة القفل جنب العنوان. (NotAllowedError: Permission denied)
مفيش كاميرا:   مفيش كاميرا متوصلة بالجهاز. (NotFoundError: Requested device not found)
http://lab.test (مش localhost):   isSecureContext=false  mediaDevices=undefined
               TypeError: Cannot read properties of undefined (reading 'getUserMedia')
~~~

- **الكاميرا الحقيقية مش اتفتحت في الـ lab:** Chrome اتشغّل بكاميرا وهمية بترسم صورة متحركة ([[fake_device_0]]) وميكروفون بيطلّع صفارة. «مفيش كاميرا» اتعملت بـ [[--use-fake-device-for-media-stream=device-count=0]]، و«الرفض» بـ Chrome headless من غير [[--use-fake-ui-for-media-stream]] (بيرفض الطلب لوحده).
- **نور الكاميرا:** مش هتعرف تقيسه من كود. اللي اتقاس إن [[track.readyState]] بقى [[ended]] و [[stream.active]] بقى [[false]]، وده اللي بيخلي المتصفح يطفي النور ويشيل علامة التسجيل من التاب (من MDN).
- **IP بدل [[localhost]]:** الصفحة مبقتش secure context، فـ [[navigator.mediaDevices]] اختفت خالص والخطأ [[TypeError]] مش [[NotAllowedError]]. اتعمل بـ [[--host-resolver-rules]] بيوجّه اسم [[lab.test]] لنفس السيرفر.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** قبل ما اليوزر يدّي أي إذن، [[enumerateDevices()]] هيرجّع إيه على جهاز فيه كاميرا و ٣ مايكات و ٣ سماعات؟ كام عنصر؟ وفيهم أسامي؟ وبعد الإذن؟

~~~js
const list = await navigator.mediaDevices.enumerateDevices();
console.log(list.map((d) => [d.kind, d.label, d.deviceId.slice(0, 8)]));
~~~`, done: R`كتبت توقّعك للحالتين، وعرفت ليه المتصفح بيخبي.`, sol: R`~~~text الناتج (Chrome 157، أجهزة وهمية: كاميرا و 3 مايكات و 3 سماعات)
قبل الإذن (permission = prompt):
[["audioinput","",""],["videoinput","",""],["audiooutput","",""]]

بعد الإذن (permission = granted):
[["audioinput","Fake Default Audio Input","default"],["audioinput","Fake Audio Input 1","3ef09235"],["audioinput","Fake Audio Input 2","4b401bd0"],
 ["videoinput","fake_device_0","3b809fd1"],["audiooutput","Fake Default Audio Output","default"],["audiooutput","Fake Audio Output 1","d34c7cf5"],["audiooutput","Fake Audio Output 2","859809f8"]]
~~~

- **قبل الإذن:** عنصر واحد بس لكل نوع، من غير اسم ولا [[deviceId]]. المتصفح بيقولك «فيه كاميرا» بس، عشان أي موقع ميعرفش أجهزتك بالاسم والعدد (fingerprinting: الأسامي والعدد بيميّزوا جهازك عن غيره).
- **بعد الإذن:** كل الأجهزة بأساميها و [[deviceId]] ثابت للموقع ده، فتقدر تحفظه وتطلبه تاني بـ [[{ deviceId: { exact: id } }]].
- عشان كده لستة «اختار الكاميرا» بتتملا **بعد** أول [[getUserMedia]] ناجح، مش قبله.` },
            { lvl: 'تطبيق', t: R`**ابني:** زرار «اسمح بالميكروفون»، وبعد الإذن قايمة بكل المايكات بأساميها والمستخدم دلوقتي متعلّم عليه، واختيار واحد تاني من القايمة بيقفل القديم ويفتح الجديد. وحدّث القايمة لو جهاز اتوصل أو اتشال.`, done: R`بعد الإذن القايمة فيها كل المايكات و«الافتراضي» متعلّم، واختيار «Fake Audio Input 2» بيخلي السطر يقول اسمه والعلامة تنتقل عليه.`, sol: R`~~~html mics.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>اختار الميكروفون</title></head>
<body>
<button id="allow" type="button">اسمح بالميكروفون</button>
<label>الميكروفون <select id="mics" disabled></select></label>
<p id="now" role="status">لسه مفيش إذن.</p>
<script>
  const sel = document.querySelector('#mics'), now = document.querySelector('#now');
  let stream = null;
  async function useMic(deviceId) {
    if (stream) stream.getTracks().forEach((t) => t.stop());     // اقفل القديم الأول
    stream = await navigator.mediaDevices.getUserMedia({ audio: deviceId ? { deviceId: { exact: deviceId } } : true });
    const track = stream.getAudioTracks()[0];
    now.textContent = 'شغال: ' + track.label;
    await fillList(track.getSettings().deviceId);
  }
  async function fillList(current) {
    const mics = (await navigator.mediaDevices.enumerateDevices()).filter((d) => d.kind === 'audioinput');
    sel.replaceChildren(...mics.map((d) => new Option(d.label, d.deviceId, false, d.deviceId === current)));
    sel.disabled = false;
  }
  document.querySelector('#allow').addEventListener('click', () => useMic().catch((e) => (now.textContent = e.name + ': ' + e.message)));
  sel.addEventListener('change', () => useMic(sel.value));
  // جهاز اتشال أو اتوصل (سماعة بلوتوث مثلًا): حدّث اللستة
  navigator.mediaDevices.addEventListener('devicechange', () => stream && fillList(stream.getAudioTracks()[0].getSettings().deviceId));
</script>
</body>
</html>
~~~

~~~text الناتج (Chrome 157، Playwright، 3 مايكات وهمية)
بعد الإذن:        شغال: Fake Default Audio Input
القايمة:          Fake Default Audio Input ✓ | Fake Audio Input 1 | Fake Audio Input 2
اختار رقم 2:      شغال: Fake Audio Input 2
القايمة:          Fake Default Audio Input | Fake Audio Input 1 | Fake Audio Input 2 ✓
~~~

- **[[{ deviceId: { exact: id } }]]**: [[exact]] يعني «ده بالظبط أو ارفض». من غيرها ([[{ deviceId: id }]]) المتصفح بيعتبرها رغبة وممكن يدّيك جهاز تاني.
- **اقفل القديم قبل الجديد:** من غير [[stop()]] المايك الأول هيفضل مفتوح ومحدش شايفه.
- **[[getSettings().deviceId]]** بيقولك الجهاز اللي اتاخد فعلًا، وده اللي بنعلّم عليه في القايمة.
- **[[devicechange]]** على [[navigator.mediaDevices]] بيتبعت لما سماعة بلوتوث تتوصل أو تتشال. متقاسش هنا (الأجهزة الوهمية مبتتغيرش)، ده من MDN.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** زرار «اقفل الكاميرا» ده بيخفي الصورة، بس نور الكاميرا فاضل منور وعلامة التسجيل لسه على التاب. ليه؟ وصلّحه.

~~~js
document.querySelector('#stop').addEventListener('click', () => {
  live.srcObject = null;
  live.hidden = true;
});
~~~`, done: R`بعد الضغط [[track.readyState]] = [[ended]] و [[stream.active]] = [[false]].`, sol: R`~~~js
document.querySelector('#stop').addEventListener('click', () => {
  stream.getTracks().forEach((t) => t.stop());   // ده اللي بيقفل الجهاز نفسه
  live.srcObject = null;                          // وده بيفضّي الـ video بس
  live.hidden = true;
});
~~~

~~~text الناتج (Chrome 157، كاميرا وهمية)
بعد srcObject = null بس:   track.readyState=live   stream.active=true    ← الكاميرا لسه شغالة
بعد track.stop():          track.readyState=ended  stream.active=false
~~~

- [[srcObject = null]] بيفصل الـ stream عن **الـ video ده بس**. الـ stream نفسه لسه عايش، والكاميرا لسه بتصوّر، والنور منور.
- الجهاز بيتقفل لما **كل** الـ tracks اللي بتستخدمه تتقفل بـ [[stop()]]. لو عملت [[clone()]] لـ track أو فتحت الكاميرا مرتين، لازم تقفل الكل.
- و [[stop()]] **مبيبعتش** حدث [[ended]] على الـ track (اتقاس: [[ended event=false]]). الحدث ده للقفل اللي مش منك (اليوزر شال الكاميرا، أو سحب الإذن). فلو عايز تحدّث الواجهة، حدّثها في نفس دالة القفل.
- وحط [[stopAll]] على [[pagehide]] كمان، عشان لو اليوزر قفل التاب أو راح صفحة تانية.` },
            { lvl: 'تحدي', t: R`**أشكال على canvas:** صورة «سيلفي» مربعة من الكاميرا: اقص أكبر مربع من **نص** الصورة، واقلبها زي المراية (الكاميرا الأمامية بتبان معكوسة)، وصدّرها WebP. اطبع المقاس والحجم.`, done: R`من كاميرا 640×480 الصورة 480×480، والنوع [[image/webp]].`, sol: R`~~~js
// live فيها stream من الكاميرا وشغالة
const size = Math.min(live.videoWidth, live.videoHeight);
const c = document.createElement('canvas');
c.width = c.height = size;
const g = c.getContext('2d');
g.translate(size, 0);
g.scale(-1, 1);
g.drawImage(live,
  (live.videoWidth - size) / 2, (live.videoHeight - size) / 2, size, size,   // المربع من نص الفيديو
  0, 0, size, size);                                                          // على الـ canvas كله
const blob = await new Promise((r) => c.toBlob(r, 'image/webp', 0.8));
console.log('crop: video ' + live.videoWidth + 'x' + live.videoHeight + ' → canvas ' + c.width + 'x' + c.height + ' ' + blob.type + ' ' + blob.size + 'B');
~~~

~~~text الناتج (Chrome 157، كاميرا وهمية 640×480)
crop: video 640x480 → canvas 480x480 image/webp 3228B
~~~

- **[[drawImage]] بـ ٩ arguments**: الصورة، وبعدين المستطيل اللي هتقص منه (x و y وعرض وطول)، وبعدين مكانه ومقاسه على الـ canvas. المربع بيبدأ من [[(640 - 480) / 2 = 80]] أفقيًا و [[0]] رأسيًا.
- **المراية:** [[translate(size, 0)]] بينقل نقطة الأصل للحافة اليمين، و [[scale(-1, 1)]] بيقلب المحور الأفقي، فكل حاجة بتترسم بعدها معكوسة. لازم الترتيب ده، وإلا الصورة هتترسم برّه الـ canvas.
- [[videoWidth]] و [[videoHeight]] هما مقاس الكاميرا الحقيقي، مش مقاس الـ [[<video>]] في الصفحة (CSS).
- WebP بجودة 0.8 = 3 KB هنا، والـ JPEG في الشرح 13 KB لصورة 1280×720.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك واشرحها:** من صفحتي [[getUserMedia]] و Permissions API على MDN: إمتى [[navigator.permissions.query({ name: 'camera' })]] بيرجّع [[prompt]] و [[granted]] و [[denied]]؟ وليه تسأل عليه قبل ما تطلب الكاميرا؟ ولو [[denied]]، تقدر تطلب تاني من الكود؟`, done: R`إجابة فيها الـ ٣ حالات، وإمتى تسأل، وإن [[denied]] مبيتفكش من الكود.`, sol: R`~~~js
const p = await navigator.permissions.query({ name: 'camera' });
console.log('قبل:', p.state);
try { await navigator.mediaDevices.getUserMedia({ video: true }); } catch (e) { console.log(e.name + ': ' + e.message); }
console.log('بعد:', (await navigator.permissions.query({ name: 'camera' })).state);
p.onchange = () => console.log('اتغيّر:', p.state);
~~~

~~~text الناتج (Chrome 157)
الطلب اترفض:     قبل: prompt    NotAllowedError: Permission denied    بعد: denied
الإذن موجود:      قبل: granted   (الكاميرا فتحت)                      بعد: granted
~~~

- **[[prompt]]**: لسه محدش سأل (أو اليوزر قفل النافذة من غير ما يختار). [[getUserMedia]] هيعرض نافذة الإذن.
- **[[granted]]**: سمح قبل كده للموقع ده. الكاميرا هتفتح من غير نافذة.
- **[[denied]]**: رفض. [[getUserMedia]] هيرمي [[NotAllowedError]] **على طول** من غير نافذة، ومفيش كود يرجّع النافذة: اليوزر لازم يغيّرها بنفسه من علامة القفل جنب العنوان. فاعرض شرح بالصور بدل زرار «اسمح» مبيعملش حاجة.
- **ليه تسأل الأول؟** عشان متفاجئش اليوزر بنافذة إذن أول ما الصفحة تفتح: اعرض زرار «افتح الكاميرا» وشرح ليه محتاجها لو [[prompt]]، وافتح على طول لو [[granted]]. نفس فكرة درس «Notification و permissions».
- [[onchange]] بيتبعت لو اليوزر غيّر الإذن من الإعدادات والصفحة مفتوحة.` },
          ],
          flag: "script",
          deep: {
            why: R`الكاميرا والميكروفون من أخطر الصلاحيات (تجسس حرفيًا)، فالمتصفح حاططها ورا ٣ أقفال: صفحة secure، وإذن صريح من اليوزر لكل موقع، وعلامة ظاهرة (نور الكاميرا وأيقونة في التاب) طول ما الجهاز مفتوح. و [[getUserMedia]] هي الطريقة الوحيدة في الويب تعدّي الأقفال دي، وعليها مبني كل حاجة: مكالمات الفيديو (WebRTC)، وتسجيل رسالة صوتية، وتصوير بطاقة في فورم KYC، وقراءة QR code، وتطبيقات الفلاتر.`,
            how: R`[[getUserMedia(constraints)]] بيشيك الأول إن الصفحة secure context (وإلا [[mediaDevices]] مش موجودة أصلًا)، وإن الـ Permissions Policy بتسمح (جوه [[iframe]] لازم [[allow="camera; microphone"]]، وإلا [[NotAllowedError]] أو [[SecurityError]] جوه الصفحات المعزولة)، وبعدين بيشوف الإذن: [[granted]] يكمّل، و [[denied]] يرمي على طول، و [[prompt]] يعرض النافذة. بعد الإذن بيدوّر على جهاز بيحقق الـ constraints: [[exact]] و [[min]] و [[max]] لازم تتحقق وإلا [[OverconstrainedError]] (و [[error.constraint]] فيه اسم الشرط)، و [[ideal]] أو القيمة العادية رغبة بياخد أقرب حاجة ليها. بعدين بيفتح الجهاز ويرجّع [[MediaStream]] فيه [[MediaStreamTrack]] لكل جهاز.

الـ track ليه [[label]] و [[getSettings()]] (اللي اتاخد فعلًا) و [[getCapabilities()]] (أقصى ما الجهاز يقدر عليه) و [[applyConstraints()]] (تغيّر وهو شغال) و [[stop()]]. الـ [[<video>]] بياخد الـ stream كله بـ [[srcObject]] (مش [[src]]: مفيش URL)، و [[duration]] = [[Infinity]] لأنه بث حي.`,
            when: R`لما الميزة محتاجة صورة أو صوت حي من اليوزر: مكالمة، أو تسجيل، أو تصوير مستند، أو QR، أو قياس مستوى الصوت. واطلبه **بعد** ضغطة اليوزر على حاجة واضحة («افتح الكاميرا»)، مش أول ما الصفحة تفتح: النافذة المفاجئة بتترفض كتير، والرفض [[denied]] صعب يتفك. واطلب أقل حاجة: [[audio: false]] لو مش محتاج صوت. ولو عايز صورة واحدة من ملف أو كاميرا الموبايل، [[<input type="file" accept="image/*" capture>]] أبسط ومش محتاج إذن ولا secure context (درس «input type=file»).`,
            mistakes: R`- تفتح الصفحة بالـ IP على الشبكة ([[http://192.168.1.5]]): مش secure context، و [[navigator.mediaDevices]] [[undefined]]، والخطأ [[TypeError]] مش رسالة إذن. استخدم [[localhost]] أو https (حتى على الموبايل: tunnel أو شهادة محلية).
- [[video.srcObject = null]] من غير [[track.stop()]]: الكاميرا والنور شغالين.
- [[video.src = stream]]: غلط. الـ stream بيتحط في [[srcObject]].
- تنسى [[muted]] و [[playsinline]] على الـ video: الصوت بيرجع في السماعة (صدى)، و iPhone بيفتح الفيديو ملء الشاشة.
- [[{ video: { width: 4000 } }]] فاكره شرط: هو رغبة. و [[{ width: { exact: 4000 } }]] = [[OverconstrainedError]] و [[message]] فاضية (اتقاس)، والمفيد [[error.constraint]] ([[width]]).
- تملا قايمة الأجهزة قبل الإذن: هتلاقي عنصر واحد من غير اسم.
- [[getUserMedia({})]]: [[TypeError: Failed to execute 'getUserMedia' on 'MediaDevices': At least one of audio and video must be requested]].
- تطلب [[ideal: 1280]] وفي نفس الصفحة stream تاني مفتوح بـ 640×480: اتقاس إن Chrome رجّع 640×480 (نفس الكاميرا بنفس الإعداد)، وفي صفحة لوحدها رجّع 1280×720.`,
          },
          teach: R`## الفكرة في سطر

إذن من اليوزر ← [[MediaStream]] حي ← تعرضه أو تسجّله أو تصوّره ← تقفله. كل الناتج من Chrome 157 بـ Playwright على سيرفر [[node:http]] محلي، **بكاميرا ومايك وهميين** (Chrome بيرسمهم بنفسه)، مش كاميرا الجهاز الحقيقية.

---

## ١. Chrome بكاميرا وهمية: إزاي اتقاس

~~~js
// lab.mjs (Node + playwright-core): Chrome بأجهزة وهمية وإذن تلقائي
const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream'],
});
~~~

| الـ flag | بيعمل |
|---|---|
| [[--use-fake-device-for-media-stream]] | كاميرا بترسم صورة متحركة ([[fake_device_0]]) و ٣ مايكات بتطلّع صفارة، بدل أجهزتك |
| [[--use-fake-device-for-media-stream=device-count=0]] | من غير كاميرا خالص، عشان تشوف [[NotFoundError]] |
| [[--use-fake-ui-for-media-stream]] | بيقبل نافذة الإذن لوحده. من غيره Chrome headless بيرفض، وده اللي طلّع [[NotAllowedError]] |
| [[--host-resolver-rules="MAP lab.test 127.0.0.1"]] | اسم [[lab.test]] بيروح للسيرفر المحلي، فالصفحة [[http://]] ومش [[localhost]]: مش secure |

الطريقة دي هي اللي بتخليك تكتب اختبار آلي لصفحة كاميرا، والـ flags نفسها شغالة لو شغّلت [[chrome.exe]] بيها من الترمنال (من وثائق Chromium، الـ lab استخدمها من Playwright بس).

---

## ٢. [[getUserMedia]] والـ constraints

~~~js
const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
console.log(stream.active, stream.getTracks().map((t) => t.kind + ':' + t.label + ':' + t.readyState));
~~~

~~~text الناتج (Chrome 157، أجهزة وهمية)
stream active=true tracks=audio:Fake Default Audio Input:live | video:fake_device_0:live
settings={"aspectRatio":1.333,"deviceId":"3b809fd1…","frameRate":20,"height":480,"resizeMode":"none","width":640, …}
caps width={"max":3840,"min":1} height={"max":2160,"min":1} frameRate={"max":20,"min":0} facingMode=[]
audio settings={"autoGainControl":true,"channelCount":1,"echoCancellation":true,"noiseSuppression":true,"sampleRate":48000, …}
~~~

- [[getSettings()]]: اللي اتاخد فعلًا (640×480 و 20 frame في الثانية لما طلبنا [[video: true]] بس).
- [[getCapabilities()]]: أقصى ما الجهاز يقدر عليه. [[facingMode=[] ]] لأن الكاميرا الوهمية مش «أمامية» ولا «خلفية».
- المايك جاي بـ [[echoCancellation]] و [[noiseSuppression]] و [[autoGainControl]] شغالين: كويس للمكالمات، ووحش لتسجيل موسيقى (اقفلهم بـ [[{ audio: { echoCancellation: false } }]]).

~~~text الناتج (Chrome 157، كل سطر طلب لوحده والـ stream الأول لسه مفتوح)
{"video":{"width":{"ideal":1280},"height":{"ideal":720}}} => ok [640,480]
{"video":{"width":{"exact":4000}}} => OverconstrainedError:  constraint=width
{"video":{"deviceId":{"exact":"nope"}}} => OverconstrainedError:  constraint=deviceId
{"video":{"facingMode":"environment"}} => ok [640,480]
{"video":{"facingMode":{"exact":"environment"}}} => OverconstrainedError:  constraint=facingMode
{} => TypeError: Failed to execute 'getUserMedia' on 'MediaDevices': At least one of audio and video must be requested
applyConstraints({ width: 320, height: 240 }) => 320x240
~~~

| الشكل | معناه |
|---|---|
| [[width: 1280]] أو [[{ ideal: 1280 }]] | رغبة: أقرب حاجة ليها، ومبيرميش أبدًا |
| [[{ exact: 4000 }]] و [[{ min: 720 }]] و [[{ max: 1920 }]] | شرط: لو مفيش، [[OverconstrainedError]] و [[error.constraint]] فيه اسمه |
| [[facingMode: 'user']] و [['environment']] | الكاميرا الأمامية والخلفية في الموبايل |
| [[deviceId: { exact: id }]] | جهاز معين من [[enumerateDevices]] |

- **[[ideal: 1280]] رجع 640×480 هنا** لأن الكاميرا كانت مفتوحة بـ 640×480 في نفس الصفحة. نفس الطلب في صفحة لوحدها (صفحة الكاميرا في الآخر) رجع **1280×720**. الرغبة مش وعد.
- [[OverconstrainedError]] رسالته **فاضية** في Chrome 157: اقرا [[e.constraint]].
- [[applyConstraints]] بيغيّر المقاس والكاميرا شغالة، من غير إذن جديد.

---

## ٣. الأخطاء: كل واحد ومعناه

~~~text الناتج (Chrome 157)
رفض الإذن:                 NotAllowedError: Permission denied
مفيش كاميرا:               NotFoundError: Requested device not found
مفيش جهاز بالمواصفات:      OverconstrainedError: (فاضية) constraint=width
صفحة مش secure:            TypeError: Cannot read properties of undefined (reading 'getUserMedia')
iframe معزول (الـ preview): SecurityError: Invalid security origin
                            Console: Permissions policy violation: camera is not allowed in this document.
~~~

| الخطأ | السبب | تقول لليوزر |
|---|---|---|
| [[NotAllowedError]] | رفض، أو رفض قبل كده ([[denied]])، أو [[iframe]] من غير [[allow="camera"]] | افتح الإذن من علامة القفل جنب العنوان |
| [[NotFoundError]] | مفيش كاميرا أو مايك أصلًا | وصّل كاميرا |
| [[NotReadableError]] | الجهاز موجود بس مشغول (برنامج تاني ماسكه) أو فيه مشكلة hardware | اقفل Zoom أو أي برنامج بيستخدم الكاميرا (من MDN، متقاسش) |
| [[OverconstrainedError]] | شرط [[exact]] أو [[min]] مش متحقق | جرّب من غير الشرط |
| [[SecurityError]] | الصفحة معزولة أو الـ policy مانعة | ده مكان مش مسموح فيه |
| [[TypeError]] | مش secure context، أو طلب فاضي | افتح من https |

---

## ٤. secure context: [[https]] أو [[localhost]]

~~~text الناتج (Chrome 157)
http://127.0.0.1:8791   isSecureContext=true    mediaDevices=object
http://lab.test:8791    isSecureContext=false   mediaDevices=undefined
~~~

نفس السيرفر ونفس الصفحة، والفرق الاسم بس: [[localhost]] و [[127.0.0.1]] متعتبرين secure حتى على [[http]]، وأي اسم أو IP تاني لأ. ففي التطوير على الموبايل محتاج https (tunnel أو شهادة محلية). وشيك الأول: [[if (!navigator.mediaDevices?.getUserMedia)]].

---

## ٥. [[enumerateDevices]]: الأسامي بعد الإذن

~~~text الناتج (Chrome 157)
قبل الإذن:   [["audioinput","",""],["videoinput","",""],["audiooutput","",""]]
بعد الإذن:   audioinput:Fake Default Audio Input | audioinput:Fake Audio Input 1 | audioinput:Fake Audio Input 2 |
             videoinput:fake_device_0 | audiooutput:Fake Default Audio Output | …
~~~

قبل الإذن عنصر واحد لكل نوع من غير اسم (الخصوصية)، وبعده كل حاجة. فـ «اختار الكاميرا» بتتملا بعد أول نجاح، والتمرين التاني بيبنيها.

---

## ٦. العرض، والصورة، والقفل

~~~js
live.srcObject = stream;
await live.play();
const c = document.createElement('canvas');
c.width = live.videoWidth; c.height = live.videoHeight;
c.getContext('2d').drawImage(live, 0, 0);
c.toBlob((blob) => console.log(blob.type, blob.size), 'image/jpeg', 0.85);
stream.getTracks().forEach((t) => t.stop());
~~~

~~~text الناتج (Chrome 157، كاميرا وهمية 640×480)
video 640x480 duration=Infinity src=""
photo pixel(10,10)=0,144,0,255 jpeg=image/jpeg 7395B png=11181B
بعد stop: audio readyState=ended video readyState=ended stream.active=false ended event=false video paused=false
~~~

- **[[srcObject]] مش [[src]]**: الـ stream مش ملف وملوش URL، فـ [[src]] فاضي و [[duration]] = [[Infinity]].
- **الصورة:** [[drawImage(video, 0, 0)]] بياخد الـ frame اللي ظاهر دلوقتي. الـ pixel الأخضر [[0,144,0]] هو خلفية الكاميرا الوهمية. JPEG بجودة 0.85 أصغر من PNG (7 KB مقابل 11 KB).
- **القفل:** [[track.stop()]] لكل track. بعده [[readyState]] = [[ended]] و [[stream.active]] = [[false]]، والمتصفح بيطفي نور الكاميرا. لاحظ: [[ended event=false]] (الـ [[stop()]] منك مبيبعتش [[ended]])، و الـ [[<video>]] نفسه مبيقفش لوحده ([[paused=false]]) فاعمل [[srcObject = null]] كمان.

---

## ٧. صفحة الكاميرا كاملة (حي)

الـ preview ده [[iframe]] معزول، والكاميرا ممنوعة فيه، فلما تدوس «افتح الكاميرا» **هتشوف رسالة حمرا** بالسبب الحقيقي. ده مقصود: الصفحة بتوريك إزاي تتعامل مع الرفض. انسخها وشغّلها من [[localhost]] عشان الكاميرا تفتح.

~~~live 330 الكاميرا
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الكاميرا</title>
<style>
  body { font-family: system-ui, sans-serif; margin: 12px; }
  .row { display: flex; flex-wrap: wrap; gap: 6px; margin: 8px 0; }
  button, select { font: inherit; min-height: 40px; padding: 0 12px; }
  video, img { width: 100%; max-width: 320px; background: #111; border-radius: 8px; display: block; }
  #msg { padding: 8px; border-radius: 6px; background: #f1f5f9; }
  #msg.bad { background: #fee2e2; }
</style>
</head>
<body>
<div class="row">
  <button id="start" type="button">افتح الكاميرا</button>
  <button id="shot" type="button" disabled>صوّر</button>
  <button id="stop" type="button" disabled>اقفل</button>
  <select id="cams" aria-label="الكاميرا" hidden></select>
</div>
<p id="msg" role="status">الكاميرا مقفولة.</p>
<video id="live" muted playsinline></video>
<img id="photo" alt="آخر صورة" hidden>
<script>
const $ = (s) => document.querySelector(s);
const live = $('#live'), msg = $('#msg'), cams = $('#cams');
let stream = null;

// رسالة مفهومة لكل خطأ من getUserMedia
const REASONS = {
  NotAllowedError: 'انت (أو المتصفح) رفضت الإذن. افتحه من علامة القفل جنب العنوان.',
  NotFoundError: 'مفيش كاميرا متوصلة بالجهاز.',
  NotReadableError: 'الكاميرا مشغولة في برنامج تاني (Zoom مثلًا).',
  OverconstrainedError: 'مفيش كاميرا بالمواصفات المطلوبة.',
  SecurityError: 'الصفحة دي مش مسموح لها بالكاميرا (iframe من غير allow="camera"، أو صفحة معزولة).',
  TypeError: 'الطلب نفسه غلط، أو الصفحة مش https.',
};
function say(text, bad = false) { msg.textContent = text; msg.className = bad ? 'bad' : ''; }

async function start(deviceId) {
  if (!navigator.mediaDevices?.getUserMedia) return say('المتصفح هنا مش بيدّي كاميرا: الصفحة لازم تبقى https أو localhost.', true);
  stopAll();
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: deviceId ? { deviceId: { exact: deviceId } } : { width: { ideal: 1280 }, height: { ideal: 720 } },
      audio: false,
    });
  } catch (e) {
    return say((REASONS[e.name] || 'حصل خطأ.') + ' (' + e.name + (e.message ? ': ' + e.message : '') + ')', true);
  }
  live.srcObject = stream;
  await live.play();
  const s = stream.getVideoTracks()[0].getSettings();
  say('شغالة: ' + stream.getVideoTracks()[0].label + ' — ' + s.width + '×' + s.height);
  $('#shot').disabled = $('#stop').disabled = false;
  await listCams(s.deviceId);
}

// بعد الإذن بس الأسامي بتظهر
async function listCams(current) {
  const list = (await navigator.mediaDevices.enumerateDevices()).filter((d) => d.kind === 'videoinput');
  cams.replaceChildren(...list.map((d, i) => new Option(d.label || 'كاميرا ' + (i + 1), d.deviceId, false, d.deviceId === current)));
  cams.hidden = list.length < 2;
}

function stopAll() {
  if (stream) stream.getTracks().forEach((t) => t.stop());
  stream = null;
  live.srcObject = null;
  $('#shot').disabled = $('#stop').disabled = true;
}

function shot() {
  const c = document.createElement('canvas');
  c.width = live.videoWidth; c.height = live.videoHeight;
  c.getContext('2d').drawImage(live, 0, 0);
  c.toBlob((blob) => {
    const img = $('#photo');
    if (img.src) URL.revokeObjectURL(img.src);
    img.src = URL.createObjectURL(blob); img.hidden = false;
    say('اتصورت: ' + c.width + '×' + c.height + '، ' + Math.round(blob.size / 1024) + ' KB (' + blob.type + ')');
  }, 'image/jpeg', 0.85);
}

$('#start').addEventListener('click', () => start());
$('#stop').addEventListener('click', () => { stopAll(); say('الكاميرا اتقفلت، ونورها هيطفي.'); });
$('#shot').addEventListener('click', shot);
cams.addEventListener('change', () => start(cams.value));
addEventListener('pagehide', stopAll);
</script>
</body>
</html>
~~~

~~~text الناتج (نفس الصفحة جوه الـ preview المعزول، Chrome 157)
الصفحة دي مش مسموح لها بالكاميرا (iframe من غير allow="camera"، أو صفحة معزولة). (SecurityError: Invalid security origin)
~~~

~~~text الناتج (نفس الصفحة من http://127.0.0.1، Chrome 157 بكاميرا وهمية)
شغالة: fake_device_0 — 1280×720
اتصورت: 1280×720، 13 KB (image/jpeg)
الكاميرا اتقفلت، ونورها هيطفي.
~~~

- **[[REASONS]]**: رسالة لكل [[e.name]]، ومعاها الاسم والرسالة الأصلية بين قوسين عشان اللي بيساعد اليوزر يعرف.
- **[[navigator.mediaDevices?.getUserMedia]]**: الـ [[?.]] (optional chaining) بيرجّع [[undefined]] بدل ما يرمي لو [[mediaDevices]] مش موجودة.
- **[[start(deviceId)]]** بتقفل أي stream قديم الأول ([[stopAll()]])، فتغيير الكاميرا من القايمة مبيسيبش الأولى مفتوحة.
- **[[listCams]]** بعد النجاح بس، والقايمة بتستخبى لو كاميرا واحدة.
- **[[URL.revokeObjectURL(img.src)]]** قبل الصورة الجديدة: كل [[createObjectURL]] حاجز الـ Blob في الذاكرة لحد ما يتعمله revoke.
- **[[pagehide]]**: لو اليوزر قفل التاب والكاميرا مفتوحة.

---

## الخلاصة

- [[getUserMedia]] = إذن + secure context + Permissions Policy. والنتيجة [[MediaStream]] فيه tracks.
- [[ideal]] رغبة و [[exact]] شرط ([[OverconstrainedError]] برسالة فاضية و [[e.constraint]]).
- كل خطأ ليه اسم ورسالة لليوزر مختلفة، و [[denied]] مبيتفكش من الكود.
- [[srcObject]] للعرض، و [[drawImage]] + [[toBlob]] للصورة، و [[track.stop()]] لكل track للقفل (والنور).
- الأسامي في [[enumerateDevices]] بعد الإذن بس.`,
          lines: [
            R`بنجيب الـ [[<video>]] اللي هيعرض الكاميرا. لازم [[muted]] و [[playsinline]] عشان [[play()]] يعدّي ومفيش صدى.`,
            R`بنطلب الكاميرا من غير صوت، ونفضّل عرض 1280. [[await]] بيستنى اليوزر يسمح، ولو رفض بيرمي [[NotAllowedError]].`,
            R`الـ stream بيتحط في [[srcObject]] مش [[src]]، لأنه بث حي ملوش عنوان.`,
            R`[[play()]] عشان الصورة تبدأ تتحرك. الـ video [[muted]] فالـ autoplay مش مشكلة.`,
            R`اسم الكاميرا ([[label]]) والإعدادات اللي اتاخدت فعلًا: المقاس والـ frame rate و [[deviceId]].`,
            R`canvas بنفس مقاس الكاميرا الحقيقي ([[videoWidth]] و [[videoHeight]])، مش مقاس العنصر في الصفحة.`,
            R`[[drawImage]] بيرسم الـ frame اللي ظاهر دلوقتي من الفيديو على الـ canvas: ده «التصوير».`,
            R`[[toBlob]] بيحوّل الرسمة لملف JPEG بجودة 85٪، ولأنه callback لفّيناه في Promise عشان [[await]].`,
            R`بيطبع [[image/jpeg]] والحجم بالـ bytes. الـ Blob ده ينفع يترفع بـ [[fetch]] أو يتعرض بـ [[createObjectURL]].`,
            R`القفل الحقيقي: [[stop()]] على كل track، وده اللي بيطفي نور الكاميرا.`,
          ],
          ref: [
            { t: "MDN: MediaDevices.getUserMedia()", url: "https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia" },
            { t: "MDN: MediaDevices.enumerateDevices()", url: "https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices" },
            { t: "MDN: Capabilities, constraints, and settings", url: "https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API/Constraints" },
            { t: "MDN: MediaStreamTrack.applyConstraints()", url: "https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/applyConstraints" },
            { t: "MDN: MediaStreamTrack.stop()", url: "https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/stop" },
            { t: "MDN: Taking still photos with getUserMedia()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API/Taking_still_photos" },
            { t: "MDN: MediaStream", url: "https://developer.mozilla.org/en-US/docs/Web/API/MediaStream" },
          ],
          pre: [{ to: "js/Notification و permissions", why: R`نفس فكرة الإذن: تسأل إمتى، وتعمل إيه لو اترفض` }, { to: "js/canvas: ارسم أشكال وحرّكها", why: R`[[drawImage]] و [[translate]] و [[scale]] للصورة والمراية` }, { to: "css/iframe sandbox و allow", why: R`ليه الكاميرا ممنوعة جوه [[iframe]] من غير [[allow="camera"]]` }],
        },
        {
          cmd: "MediaRecorder: سجّل صوت وفيديو ونزّله",
          title: "إزاي تسجّل صوت أو فيديو في المتصفح، وتحوّله ملف تشغّله وتنزّله أو ترفعه؟",
          desc: R`[[MediaRecorder]] بياخد أي [[MediaStream]] (ميكروفون، كاميرا، canvas، صوت من Web Audio) ويحوّله لملف مضغوط. بتعمله [[new MediaRecorder(stream, { mimeType })]]، و [[start()]] و [[stop()]]، والملف بيوصلك حتت في حدث [[dataavailable]] ([[e.data]] = [[Blob]])، ولما يخلص بتجمعهم في [[new Blob(chunks, { type })]].

• [[MediaRecorder.isTypeSupported(type)]] قبل ما تختار: Chrome بيسجّل WebM و MP4، و Safari MP4 (من MDN).
• الحالة [[state]]: [[inactive]] و [[recording]] و [[paused]]، و [[pause()]] و [[resume()]].
• الـ Blob ← [[URL.createObjectURL(blob)]] ← [[<audio src>]] للتشغيل، أو [[<a download>]] للتحميل، أو [[fetch]] للرفع.
• [[start(1000)]] (حتة كل ثانية) بيخلي WebM يطلع **من غير مدة** ([[duration = Infinity]]) في Chrome 157، و [[start()]] من غير رقم بيكتبها.`,
          example: R`// recorder.js: سجّل ٣ ثواني من الميكروفون وشغّلها ونزّلها (صفحة على localhost)
const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
const type = ['audio/webm;codecs=opus', 'audio/mp4'].find((t) => MediaRecorder.isTypeSupported(t));
const rec = new MediaRecorder(stream, { mimeType: type });
const chunks = [];
rec.addEventListener('dataavailable', (e) => chunks.push(e.data));
rec.start();
await new Promise((r) => setTimeout(r, 3000));
rec.stop();
await new Promise((r) => rec.addEventListener('stop', r, { once: true }));
stream.getTracks().forEach((t) => t.stop());
const blob = new Blob(chunks, { type: rec.mimeType });
const url = URL.createObjectURL(blob);
document.body.append(Object.assign(document.createElement('audio'), { controls: true, src: url }));
document.body.append(Object.assign(document.createElement('a'), { href: url, download: 'note.webm', textContent: 'نزّل' }));`,
          try: R`افتح المسجّل الحي في آخر الشرح، واختار «رسمة بتتحرك + نغمة» ودوس «سجّل»، واستنى ٣ ثواني و«وقّف». هتلاقي فيديو في اللستة بيشتغل. دوس «نزّل»: حصل تحميل؟ وبعدين اختار «الميكروفون» وسجّل: الرسالة قالت إيه؟ وبعدين انسخ الصفحة وشغّلها من [[localhost]] وكرّر الاتنين.`,
          sol: R`~~~text الناتج (نفس الصفحة جوه الـ preview المعزول، Chrome 157، Playwright)
سجّل:           بيسجّل (video/webm;codecs=vp9,opus)…
وقّف:           اتسجّل 2.9 ثانية، 82 KB، video/webm;codecs=vp9,opus
اللستة:         video بيشتغل، duration=1.567954 (تسجيل 1.5 ثانية في تجربة تانية)
نزّل:           مفيش تحميل (Playwright مستقبلش أي download)
الميكروفون:     مفيش إذن للجهاز: SecurityError: Invalid security origin
~~~

~~~text الناتج (نفس الصفحة من http://127.0.0.1، Chrome 157 بمايك وهمي)
نزّل:           download event: recording-02-38-44.webm 35760 byte
الميكروفون:     بيسجّل (audio/webm;codecs=opus)… ثم اتسجّل 2.5 ثانية، 31 KB، audio/webm;codecs=opus
~~~

- **التسجيل من canvas و Web Audio شغال جوه الـ preview**، لأنه مش محتاج أي إذن.
- **التحميل مبيحصلش جوه الـ preview** ومن غير أي رسالة: الـ [[iframe]] عليه [[sandbox]] من غير [[allow-downloads]]، فالمتصفح بيتجاهل [[<a download>]]. من صفحة عادية اتنزّل الملف (35 KB).
- **الميكروفون ممنوع جوه الـ preview** ([[SecurityError]] زي الكاميرا في الدرس اللي فات)، ومن [[localhost]] اشتغل وسجّل [[audio/webm;codecs=opus]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** إيه اللي هيتطبع؟ وأنهي سطر هيرمي؟

~~~js
const rec = new MediaRecorder(stream);            // stream فيه صوت وصورة
console.log(JSON.stringify(rec.mimeType), rec.state);
try { rec.stop(); console.log('stop عدّى'); } catch (e) { console.log(e.name); }
try { rec.pause(); } catch (e) { console.log(e.name + ': ' + e.message); }
rec.start();
console.log(rec.state, JSON.stringify(rec.mimeType));
try { rec.start(); } catch (e) { console.log(e.name + ': ' + e.message); }
rec.onstart = () => console.log('onstart:', rec.mimeType);
~~~`, done: R`كتبت توقّعك لكل سطر، واتفاجئت بواحد على الأقل.`, sol: R`~~~text الناتج (Chrome 157، كاميرا ومايك وهميين)
"" inactive
stop عدّى
InvalidStateError: Failed to execute 'pause' on 'MediaRecorder': The MediaRecorder's state is 'inactive'.
recording ""
InvalidStateError: Failed to execute 'start' on 'MediaRecorder': The MediaRecorder's state is 'recording'.
onstart: video/webm;codecs=vp8,opus
~~~

- **[[mimeType]] فاضي** قبل [[start()]] وحتى **بعده على طول**: المتصفح بيختار الصيغة لما التسجيل يبدأ فعلًا، وبتبان في [[onstart]] (أو في [[e.data.type]]). فلو محتاج النوع، اقراه في [[stop]] أو من الـ Blob.
- **[[stop()]] وهو [[inactive]] مبيرميش** في Chrome 157، بس [[pause()]] بيرمي. متعتمدش على ده: شيك [[rec.state !== 'inactive']] قبل [[stop()]] (المسجّل في الشرح بيعمل كده).
- [[start()]] مرتين = [[InvalidStateError]]. زرار «سجّل» لازم يتقفل وانت بتسجّل.
- من غير [[mimeType]] Chrome اختار [[video/webm;codecs=vp8,opus]].` },
            { lvl: 'تطبيق', t: R`**ابني:** صفحة بتطبع جدول «المتصفح ده يقدر يسجّل إيه» لـ ١٥ نوع (WebM بـ VP8 و VP9 و AV1 و H.264، و MP4 بأنواعه، و [[audio/webm]] و [[audio/ogg]] و [[audio/mp4]] و [[audio/mpeg]] و [[audio/wav]])، ودالة [[pickType(kind)]] بترجّع أول نوع مدعوم من لستة الأفضلية لصوت أو فيديو.`, done: R`جدولك بيقول [[audio/mpeg]] و [[audio/wav]] بـ [[false]] على Chrome، و [[pickType('audio')]] بترجّع [[audio/webm;codecs=opus]].`, sol: R`~~~js
const types = ['video/webm', 'video/webm;codecs=vp8,opus', 'video/webm;codecs=vp9,opus', 'video/webm;codecs=av1,opus',
  'video/webm;codecs=h264', 'video/mp4', 'video/mp4;codecs=avc1,mp4a.40.2', 'video/x-matroska;codecs=avc1',
  'audio/webm', 'audio/webm;codecs=opus', 'audio/ogg;codecs=opus', 'audio/mp4', 'audio/mpeg', 'audio/wav'];
console.log(types.map((t) => t + ' => ' + MediaRecorder.isTypeSupported(t)).join('\n'));
function pickType(kind) {
  const prefs = kind === 'audio'
    ? ['audio/webm;codecs=opus', 'audio/mp4', 'audio/ogg;codecs=opus']
    : ['video/webm;codecs=vp9,opus', 'video/webm', 'video/mp4'];
  return prefs.find((t) => MediaRecorder.isTypeSupported(t)) || '';
}
console.log(pickType('audio'), pickType('video'));
~~~

~~~text الناتج (Chrome 157)
video/webm => true
video/webm;codecs=vp8,opus => true
video/webm;codecs=vp9,opus => true
video/webm;codecs=av1,opus => true
video/webm;codecs=h264 => true
video/mp4 => true
video/mp4;codecs=avc1,mp4a.40.2 => true
video/x-matroska;codecs=avc1 => true
audio/webm => true
audio/webm;codecs=opus => true
audio/ogg;codecs=opus => false
audio/mp4 => true
audio/mpeg => false
audio/wav => false
audio/webm;codecs=opus video/webm;codecs=vp9,opus
~~~

- **[[audio/mpeg]] (MP3) و [[audio/wav]] مش بيتسجّلوا** في Chrome. لو محتاج MP3 لازم تحوّل بعد التسجيل (مكتبة WASM أو على السيرفر)، و WAV تعمله بإيدك من Web Audio (مشروع في الوحدة دي).
- **[[audio/ogg]] [[false]]** على Chrome، بس Firefox بيسجّله (من MDN)، فخليه في الآخر في لستة الأفضلية.
- **[[|| '']]**: لو مفيش ولا نوع، [[new MediaRecorder(stream, {})]] بيختار هو. ده أحسن من إنك ترمي.
- Chrome 157 بقى بيسجّل MP4 كمان، وده مهم لأن Safari على iPhone مبيشغّلش WebM القديم كويس (من MDN). لو التسجيل هيتشاف على أجهزة Apple، جرّب [[video/mp4]] الأول.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** المسجّل ده بيبعت حتة كل ثانية عشان «ميضيعش حاجة لو التاب وقع». الملف بيشتغل، بس المشغّل بيكتب [[--:--]] للمدة، والشريط مبيتحركش. ليه؟ صلّحه بطريقتين.

~~~js
rec.start(1000);
// ... بعد stop:
const audio = new Audio(URL.createObjectURL(new Blob(chunks, { type: rec.mimeType })));
audio.onloadedmetadata = () => console.log('المدة:', audio.duration);
~~~`, done: R`عرفت إن المدة كانت [[Infinity]]، والطريقتين بيطلّعوا رقم حقيقي.`, sol: R`~~~text الناتج (Chrome 157، ٢ ثانية لكل سطر، مايك وكاميرا وهميين)
video webm no slice    chunks=1 duration=1.947416  after fix=-
video webm slice 500   chunks=4 duration=Infinity  after fix=1.953
audio webm no slice    chunks=1 duration=1.92      after fix=-
audio webm slice 500   chunks=4 duration=Infinity  after fix=1.92
audio mp4 no slice     chunks=1 duration=1.941     after fix=-
~~~

**الطريقة الأولى (لو مش محتاج الحتت):** [[rec.start()]] من غير رقم. التسجيل بيوصل حتة واحدة في الآخر، والمدة بتتكتب.

**الطريقة التانية (لو محتاج الحتت، للرفع أثناء التسجيل مثلًا):** خلّي المتصفح يعرف المدة بنفسه:

~~~js
async function fixDuration(media) {
  if (media.readyState < 1) await new Promise((r) => media.addEventListener('loadedmetadata', r, { once: true }));
  if (media.duration !== Infinity) return media.duration;
  media.currentTime = 1e101;                                    // اقفز لمكان مستحيل
  await new Promise((r) => media.addEventListener('durationchange', r, { once: true }));
  media.currentTime = 0;                                        // ارجع للأول
  return media.duration;
}
~~~

- **ليه [[Infinity]]؟** ملف WebM بيبدأ بـ header فيه المدة. مع [[start(1000)]] أول حتة اتبعتتلك بعد ثانية، والـ header بتاعها اتكتب قبل ما حد يعرف التسجيل هيبقى قد إيه، فبيقول «مش معروف». ومن غير timeslice، Chrome بيكتب الملف كله في الآخر فبيعرف المدة.
- **[[currentTime = 1e101]]**: بيجبر المتصفح يقرا الملف للآخر عشان يلاقي المكان، فيعرف المدة ويبعت [[durationchange]]. ده حل منتشر للمشكلة دي، واتقاس هنا إنه بيطلّع 1.953.
- MP4 من غير timeslice طلع بمدة صح كمان. ومع timeslice، MP4 في Chrome بيتقسم fragments (متقاسش هنا).` },
            { lvl: 'تحدي', t: R`**ابني:** مسجّل بعداد: «سجّل» و «إيقاف مؤقت/كمّل» و «خلّص»، والعداد [[0:00 / 0:10]] بيعد وقت التسجيل بس (مش وقت الإيقاف المؤقت)، والتسجيل بيقف لوحده عند ١٠ ثواني، والرسالة في الآخر بتقول المدة والحجم.`, done: R`إيقاف مؤقت ثانية ونص = العداد واقف، والتسجيل وقف لوحده عند [[0:10]] بالرسالة «وقف لوحده عند الحد».`, sol: R`~~~html timer.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>تسجيل بعداد</title></head>
<body>
<button id="rec" type="button">سجّل</button>
<button id="pause" type="button" disabled>إيقاف مؤقت</button>
<button id="stop" type="button" disabled>خلّص</button>
<p><span id="clock">0:00</span> / 0:10</p>
<p id="msg" role="status"></p>
<script>
  const MAX = 10;                                     // أقصى مدة بالثواني
  const $ = (s) => document.querySelector(s);
  let rec, stream, recorded = 0, lastTick = 0, timer;
  const fmt = (s) => Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
  // بنعد وقت التسجيل بس: الـ tick بيزوّد الفرق من آخر مرة لو الحالة recording
  function tick() {
    const now = performance.now();
    if (rec.state === 'recording') recorded += (now - lastTick) / 1000;
    lastTick = now;
    $('#clock').textContent = fmt(recorded);
    if (recorded >= MAX) rec.stop();
  }
  $('#rec').addEventListener('click', async () => {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    rec = new MediaRecorder(stream);
    const chunks = [];
    rec.ondataavailable = (e) => chunks.push(e.data);
    rec.onstop = () => {
      clearInterval(timer); stream.getTracks().forEach((t) => t.stop());
      const blob = new Blob(chunks, { type: rec.mimeType });
      $('#msg').textContent = 'خلص: ' + recorded.toFixed(1) + ' ثانية تسجيل، ' + blob.size + ' byte' + (recorded >= MAX ? ' (وقف لوحده عند الحد)' : '');
      $('#rec').disabled = false; $('#pause').disabled = $('#stop').disabled = true;
    };
    recorded = 0; lastTick = performance.now();
    rec.start();
    timer = setInterval(tick, 200);
    $('#rec').disabled = true; $('#pause').disabled = $('#stop').disabled = false;
  });
  $('#pause').addEventListener('click', () => {
    if (rec.state === 'recording') { rec.pause(); $('#pause').textContent = 'كمّل'; }
    else if (rec.state === 'paused') { rec.resume(); $('#pause').textContent = 'إيقاف مؤقت'; }
  });
  $('#stop').addEventListener('click', () => rec.stop());
</script>
</body>
</html>
~~~

~~~text الناتج (Chrome 157، Playwright: سجّل، ٢ ثانية، إيقاف مؤقت، استنى، كمّل)
وقت الإيقاف المؤقت:    0:01  ثم بعد ثانية  0:01   (العداد واقف)
بعد ما كمّل:           0:10
الرسالة:               خلص: 10.0 ثانية تسجيل، 153688 byte (وقف لوحده عند الحد)
~~~

- **[[recorded += (now - lastTick) / 1000]] بس لو [[recording]]**: كل ٢٠٠ ms بنزوّد الفرق من آخر tick. وقت [[paused]] الفرق بيتحسب بس مبيتزادش. أدق من [[recorded += 0.2]] لأن الـ timers بتتأخر.
- **العداد قال 0:01 بعد ٢ ثانية:** طلب المايك ([[getUserMedia]]) خد حوالي ثانية قبل [[start()]]. العداد بيعد من [[start()]] بس، وده الصح.
- **[[rec.state]]** هو مصدر الحقيقة للزرار: [[recording]] ← [[pause()]]، و [[paused]] ← [[resume()]].
- [[MediaRecorder]] نفسه بيعرف يوقف بالحجم مش بالوقت؟ لأ. لو عايز حد بالـ bytes، اجمع [[e.data.size]] مع [[start(1000)]] ووقّف لما توصل.` },
            { lvl: 'تحدي', t: R`**ابني (سيرفر وصفحة):** سجّل ٣ ثواني وارفعهم لسيرفر [[node:http]] بـ [[fetch]] (الـ Blob هو الـ body مباشرة). السيرفر يقبل أنواع الصوت والفيديو بس، ويرفض أكبر من 20 MB، ويختار هو اسم الملف، ويرد [[201]] بالاسم والحجم.`, done: R`الصفحة كتبت «اترفع: note-….webm (40666 byte)»، والملف موجود في [[uploads/]] بنفس الحجم، وطلب بـ [[text/html]] رجع [[415]].`, sol: R`~~~js upload-server.mjs
// upload-server.mjs: بيقدّم الصفحة، وبيستقبل التسجيل على POST /upload ويحفظه في uploads/
import { createServer } from 'node:http';
import { createWriteStream, mkdirSync, readFileSync } from 'node:fs';
import { pipeline } from 'node:stream/promises';
mkdirSync('uploads', { recursive: true });
const MAX = 20 * 1024 * 1024;                       // 20 MB
const EXT = { 'audio/webm': 'webm', 'video/webm': 'webm', 'audio/mp4': 'm4a', 'video/mp4': 'mp4', 'audio/ogg': 'ogg' };
createServer(async (req, res) => {
  if (req.method === 'GET' && (req.url === '/' || req.url === '/upload.html')) {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    return res.end(readFileSync('upload.html'));
  }
  if (req.method !== 'POST' || req.url !== '/upload') { res.writeHead(404); return res.end(); }
  const type = (req.headers['content-type'] || '').split(';')[0];
  const size = Number(req.headers['content-length'] || 0);
  const send = (code, body) => { res.writeHead(code, { 'content-type': 'application/json' }); res.end(JSON.stringify(body)); };
  if (!EXT[type]) return send(415, { error: 'النوع ده مش مقبول: ' + type });
  if (size > MAX) return send(413, { error: 'الملف أكبر من 20 MB' });
  const name = 'note-' + Date.now() + '.' + EXT[type];   // الاسم من السيرفر، مش من اليوزر
  let bytes = 0;
  req.on('data', (c) => (bytes += c.length));
  await pipeline(req, createWriteStream('uploads/' + name));
  console.log('اتحفظ', name, bytes, 'byte', type);
  send(201, { saved: name, bytes, type });
}).listen(8793, () => console.log('http://localhost:8793'));
~~~

~~~html upload.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>ارفع التسجيل</title></head>
<body>
<button id="rec" type="button">سجّل ٣ ثواني وارفع</button>
<p id="msg" role="status"></p>
<script>
  const msg = document.querySelector('#msg');
  async function recordSeconds(sec) {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const rec = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });
    const chunks = [];
    rec.ondataavailable = (e) => chunks.push(e.data);
    const done = new Promise((r) => (rec.onstop = r));
    rec.start();
    setTimeout(() => rec.stop(), sec * 1000);
    await done;
    stream.getTracks().forEach((t) => t.stop());
    return new Blob(chunks, { type: rec.mimeType });
  }
  document.querySelector('#rec').addEventListener('click', async () => {
    msg.textContent = 'بيسجّل…';
    const blob = await recordSeconds(3);
    msg.textContent = 'بيرفع ' + blob.size + ' byte…';
    const res = await fetch('/upload', { method: 'POST', headers: { 'content-type': blob.type }, body: blob });
    const data = await res.json();
    msg.textContent = res.ok ? 'اترفع: ' + data.saved + ' (' + data.bytes + ' byte)' : 'السيرفر رفض (' + res.status + '): ' + data.error;
  });
</script>
</body>
</html>
~~~

~~~text الناتج (Chrome 157 بمايك وهمي، و node upload-server.mjs)
الصفحة:            اترفع: note-1795230057589.webm (40666 byte)
لوج السيرفر:       اتحفظ note-1795230057589.webm 40666 byte audio/webm
ls uploads:        40666 note-1795230057589.webm
POST بـ text/html:  415 {"error":"النوع ده مش مقبول: text/html"}
~~~

- **[[body: blob]]**: [[fetch]] بيبعت الـ bytes زي ما هي، و [[content-type]] من نوع الـ Blob. مفيش [[FormData]] ولا base64 (base64 بيكبّر الحجم الثلث).
- **[[split(';')[0] ]]**: النوع جاي [[audio/webm;codecs=opus]]، والسيرفر بيقارن الجزء الأول بس.
- **الاسم من السيرفر:** لو خدت الاسم من اليوزر، [[../../index.html]] ممكن يكتب فوق ملفات. [[Date.now()]] كفاية هنا، وفي الشغل [[crypto.randomUUID()]].
- **[[pipeline(req, createWriteStream(...))]]**: بيكتب وهو بيستقبل من غير ما يشيل الملف كله في الذاكرة، وبيقفل الملف صح لو الاتصال وقع.
- **[[content-length]]** بيتشيك قبل القراية. يوزر ممكن يكدب فيه، فلو عايز ضمان عدّ الـ bytes وانت بتكتب واقطع لو عدّوا الحد.` },
          ],
          flag: "script",
          deep: {
            why: R`قبل [[MediaRecorder]] كان التسجيل في المتصفح محتاج Flash أو إنك تجمع العينات بنفسك من Web Audio وتكتب WAV ضخم. دلوقتي سطرين بيدّوك ملف مضغوط بـ Opus أو VP9 أو H.264 بالـ hardware. وعليه مبني: الرسايل الصوتية في الشات، وتسجيل الشاشة والكاميرا في أدوات الدعم والتعليم، وحفظ المكالمات، وتسجيل لعبة على canvas، ومقابلات الشغل المسجلة. والـ outcome في منهج MDN إنك تعرف الـ Media Stream Recording API بيتعمل لإيه.`,
            how: R`[[new MediaRecorder(stream, options)]] بيربط encoder بالـ tracks: كل frame فيديو وكل عينة صوت بتدخل بتتضغط وتتحط في container (WebM أو MP4). [[start(timeslice)]] بيبدأ، والـ bytes المتجمعة بتطلعلك في [[dataavailable]]: كل [[timeslice]] ms لو حددته، أو مرة واحدة عند [[stop()]] أو [[requestData()]]. الترتيب في الآخر: آخر [[dataavailable]] ثم [[stop]]، فلما [[stop]] يتبعت الـ chunks كلها عندك.

الـ chunks مش ملفات لوحدها: أول واحد فيه الـ header والباقي بيكمّلوه، فلازم تجمعهم بالترتيب في [[Blob]] واحد. [[URL.createObjectURL(blob)]] بيدّيك [[blob:http://…/uuid]] بيشاور على الـ Blob في الذاكرة، وبيفضل حاجزه لحد [[URL.revokeObjectURL]] أو لحد ما الصفحة تتقفل. ولو الـ tracks اتقفلت (اليوزر سحب الإذن أو انت عملت [[stop()]] على الـ track)، المسجّل بيقف لوحده ويبعت آخر داتا و [[stop]] (اتقاس).

والـ stream ممكن ميبقاش من جهاز: [[canvas.captureStream(30)]] بيدّي track فيديو من canvas، و [[audioContext.createMediaStreamDestination().stream]] بيدّي track صوت من Web Audio. والاتنين مش محتاجين إذن.`,
            when: R`أي حاجة اليوزر بيسجّلها: رسالة صوتية، أو فيديو تعريفي، أو تسجيل لعبة أو رسمة، أو كاميرا مراقبة صغيرة. استخدم [[start()]] من غير timeslice للتسجيلات القصيرة (المدة بتتكتب)، و [[start(1000)]] لو عايز ترفع وانت بتسجّل أو متخسرش التسجيل لو التاب وقع (وصلّح المدة بعدين). ولو محتاج صيغة معينة (MP3 أو WAV) أو تعديل (قص، دمج)، سجّل بالمتصفح وحوّل على السيرفر بـ ffmpeg.`,
            mistakes: R`- تقرا [[rec.mimeType]] قبل [[start]] أو بعده على طول: فاضي في Chrome. اقراه في [[onstart]] أو [[stop]].
- [[new Blob(chunks)]] من غير [[type]]: الـ Blob نوعه فاضي، وبعض المشغّلات والسيرفرات مش هتعرفه.
- [[start(1000)]] وفاكر الملف هيبقى زي التاني: WebM من غير مدة ([[Infinity]]) والشريط مبيتحركش.
- تقفل الميكروفون ([[track.stop()]]) قبل ما [[stop]] بتاع المسجّل يتبعت وفاكر إنك هتخسر الآخر: المسجّل بيقف لوحده ويبعت آخر داتا، بس الأنضف [[rec.stop()]] الأول وتقفل الـ tracks في [[onstop]].
- تنسى [[revokeObjectURL]] في لستة تسجيلات: كل تسجيل محجوز في الذاكرة لحد ما الصفحة تتقفل.
- [[<a download>]] جوه [[iframe]] من غير [[allow-downloads]]: مفيش تحميل ومفيش رسالة.
- تفتكر [[audio/mpeg]] أو [[audio/wav]] بيتسجلوا: [[isTypeSupported]] بـ [[false]] على Chrome.`,
          },
          teach: R`## الفكرة في سطر

stream ← [[MediaRecorder]] ← chunks ← [[Blob]] ← URL للتشغيل أو التحميل أو الرفع. كل الناتج من Chrome 157 بـ Playwright، بمايك وكاميرا وهميين (درس getUserMedia) أو canvas.

---

## ١. إيه اللي يتسجّل: [[isTypeSupported]]

~~~text الناتج (Chrome 157)
video/webm => true            video/webm;codecs=vp9,opus => true     video/webm;codecs=av1,opus => true
video/webm;codecs=h264 => true    video/mp4 => true                  video/mp4;codecs=avc1,mp4a.40.2 => true
audio/webm;codecs=opus => true    audio/mp4 => true                  audio/ogg;codecs=opus => false
audio/mpeg => false               audio/wav => false
~~~

- WebM و MP4 الاتنين، و Opus للصوت. MP3 و WAV **لأ**.
- لستة أفضلية و [[find]]: [[['audio/webm;codecs=opus', 'audio/mp4', 'audio/ogg;codecs=opus'].find((t) => MediaRecorder.isTypeSupported(t))]].
- من غير [[mimeType]] خالص، Chrome اختار [[video/webm;codecs=vp8,opus]] (للصوت والصورة).

---

## ٢. الحالة والأحداث بالترتيب

~~~js
const rec = new MediaRecorder(stream);
rec.onstart = () => log('start'); rec.onpause = () => log('pause'); rec.onresume = () => log('resume');
rec.ondataavailable = (e) => log('data ' + e.data.size + 'B ' + e.data.type);
rec.start(1000);
// بعد 1.5s: pause، وبعد 0.7s: resume و requestData()، وبعد 0.8s: stop
~~~

~~~text الناتج (Chrome 157، كاميرا ومايك وهميين، الأرقام ms من البداية)
default mimeType قبل start="" state=inactive videoBps=2500000 audioBps=128000
بعد start: state=recording mimeType=""
965 start
1007 data 9937B video/webm;codecs=vp8,opus
1501 pause
2203 resume
2203 data 47532B video/webm;codecs=vp8,opus
2260 data 1B video/webm;codecs=vp8,opus
3008 data 48271B video/webm;codecs=vp8,opus
3008 stop
~~~

| الـ method | من حالة | لحالة | لو الحالة غلط |
|---|---|---|---|
| [[start(timeslice?)]] | [[inactive]] | [[recording]] | [[InvalidStateError]] |
| [[pause()]] | [[recording]] | [[paused]] | [[InvalidStateError]] |
| [[resume()]] | [[paused]] | [[recording]] | [[InvalidStateError]] |
| [[requestData()]] | [[recording]] أو [[paused]] | زي ما هي، وبيطلّع حتة دلوقتي | [[InvalidStateError]] |
| [[stop()]] | أي حالة | [[inactive]]، وبعده آخر [[dataavailable]] ثم [[stop]] | مبيرميش في Chrome 157 |

- [[start]] اتبعت بعد 965 ms من الإنشاء: الـ encoder محتاج وقت يجهز.
- [[videoBitsPerSecond]] الافتراضي 2.5 Mbps و [[audioBitsPerSecond]] 128 kbps، وتقدر تغيّرهم في الـ options.
- [[requestData()]] بعد [[resume]] طلّع حتة فيها اللي اتسجّل لحد اللحظة دي.
- آخر [[data]] و [[stop]] في **نفس** الـ ms، والـ data الأول: لما [[onstop]] يشتغل الـ chunks كاملة.

---

## ٣. الـ timeslice والمدة اللي بتضيع

~~~text الناتج (Chrome 157، كل تسجيل ثانيتين)
video webm no slice    chunks=1 duration=1.947416
video webm slice 500   chunks=4 duration=Infinity  → بعد currentTime=1e101: 1.953
audio webm no slice    chunks=1 duration=1.92
audio webm slice 500   chunks=4 duration=Infinity  → بعد currentTime=1e101: 1.92
audio mp4 no slice     chunks=1 duration=1.941
~~~

- **من غير timeslice:** حتة واحدة والمدة مكتوبة. **مع timeslice:** WebM من غير مدة، والمشغّل بيعرض [[--:--]] والشريط مبيشتغلش.
- **الحل لو محتاج الحتت:** [[currentTime = 1e101]] ثم استنى [[durationchange]] ثم [[currentTime = 0]] (التمرين التالت).
- [[clip.webm]] اللي في درس [[HTMLMediaElement]] اتعمل الأول بـ [[start(500)]] وطلع [[duration=Infinity]]، فاتسجّل تاني من غير timeslice. الغلطة دي حصلت فعلًا وانا ببني الـ lab.

---

## ٤. Blob ← تشغيل وتحميل

~~~js
const blob = new Blob(chunks, { type: rec.mimeType });
const url = URL.createObjectURL(blob);
audio.src = url;
link.href = url; link.download = 'voice-note.webm';
// لما متحتاجهوش: URL.revokeObjectURL(url);
~~~

~~~text الناتج (Chrome 157)
audio-only: chunks=1 size=16334 type=audio/webm;codecs=opus
url=blob:http://127.0.0.1:8791/<uuid>
recorded duration at loadedmetadata=1.92
mp4: type=video/mp4;codecs=avc1,opus size=120679 duration=2.0039
بعد revokeObjectURL: 4 MEDIA_ELEMENT_ERROR: Format error
~~~

- [[blob:]] URL مربوط بالصفحة دي بس، ومينفعش يتبعت لحد.
- **بعد [[revokeObjectURL]]** أي عنصر جديد بيحاول يفتحه بيفشل بـ code 4 (درس الأخطاء). العنصر اللي كان فتحه قبل كده بيكمّل عادي، فـ revoke بعد ما المشغّل يحمّل أو لما تمسح التسجيل.
- [[audio/webm;codecs=opus]] تانيتين = 16 KB (حوالي 64 kbps). و [[{ audioBitsPerSecond: 32000 }]] بيصغّره للنص لو صوت كلام بس.

---

## ٥. لما الـ track يتقفل وانت بتسجّل

~~~text الناتج (Chrome 157: سجّل نص ثانية وبعدين track.stop() على المايك)
track.stop أثناء التسجيل: state=inactive events=data 408,stop
~~~

المسجّل وقف لوحده، وبعت آخر داتا و [[stop]]. ده بيحصل كمان لو اليوزر سحب الإذن أو فصل المايك، فكود [[onstop]] لازم يشتغل صح في الحالة دي كمان (مش بس من زرارك).

---

## ٦. تسجيل من غير أجهزة: canvas و Web Audio

~~~js
const video = canvas.captureStream(30);                        // track فيديو من الـ canvas
const ac = new AudioContext(), osc = ac.createOscillator(), out = ac.createMediaStreamDestination();
osc.connect(out); osc.start();                                  // track صوت من Web Audio
const stream = new MediaStream([...video.getVideoTracks(), ...out.stream.getAudioTracks()]);
~~~

- **[[canvas.captureStream(fps)]]**: كل مرة الـ canvas يترسم عليه، frame جديد في الـ track. ده اللي عمل فيديو التجربة في درس المشغّل.
- **[[createMediaStreamDestination()]]**: بدل ما الصوت يروح للسماعة، بيروح لـ track (درس Web Audio الجاي).
- **[[new MediaStream([...tracks])]]**: بتجمع tracks من أماكن مختلفة في stream واحد.
- ولا واحد فيهم محتاج إذن، فالمسجّل ده بيشتغل جوه الـ preview المعزول.

---

## ٧. المسجّل كامل (حي)

~~~live 470 مسجّل
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مسجّل</title>
<style>
  body { font-family: system-ui, sans-serif; margin: 12px; }
  .row { display: flex; flex-wrap: wrap; gap: 6px; margin: 8px 0; align-items: center; }
  button, select { font: inherit; min-height: 40px; padding: 0 12px; }
  canvas { width: 240px; height: 135px; background: #1e293b; border-radius: 8px; display: block; }
  #msg { padding: 8px; border-radius: 6px; background: #f1f5f9; margin: 8px 0; }
  li { margin: 6px 0; }
  li video { width: 200px; display: block; }
</style>
</head>
<body>
<div class="row">
  <select id="from" aria-label="بتسجّل إيه">
    <option value="canvas">رسمة بتتحرك + نغمة (من غير كاميرا)</option>
    <option value="mic">الميكروفون</option>
    <option value="cam">الكاميرا والميكروفون</option>
  </select>
  <button id="rec" type="button">سجّل</button>
  <button id="stop" type="button" disabled>وقّف</button>
</div>
<canvas id="art" width="320" height="180"></canvas>
<p id="msg" role="status">جاهز.</p>
<ol id="list"></ol>
<script>
const $ = (s) => document.querySelector(s);
const msg = $('#msg');
let recorder = null, source = null, stopSource = () => {};

// أول نوع المتصفح يقدر يسجّله
function pickType(kind) {
  const list = kind === 'audio' ? ['audio/webm;codecs=opus', 'audio/mp4', 'audio/ogg;codecs=opus'] : ['video/webm;codecs=vp9,opus', 'video/webm', 'video/mp4'];
  return list.find((t) => MediaRecorder.isTypeSupported(t)) || '';
}

// مصدر من غير أجهزة: canvas بيتحرك + oscillator، الاتنين في MediaStream واحد
function canvasSource() {
  const c = $('#art'), g = c.getContext('2d'), t0 = performance.now();
  const timer = setInterval(() => {
    const s = (performance.now() - t0) / 1000;
    g.fillStyle = '#1e293b'; g.fillRect(0, 0, 320, 180);
    g.fillStyle = '#38bdf8'; g.beginPath(); g.arc(160 + Math.cos(s * 3) * 100, 90, 24, 0, 7); g.fill();
    g.fillStyle = '#fff'; g.font = 'bold 28px sans-serif'; g.fillText(s.toFixed(1) + 's', 20, 40);
  }, 33);
  const ac = new AudioContext(), osc = ac.createOscillator(), gain = ac.createGain(), out = ac.createMediaStreamDestination();
  osc.frequency.value = 330; gain.gain.value = 0.1; osc.connect(gain).connect(out); osc.start();
  const stream = new MediaStream([...c.captureStream(30).getVideoTracks(), ...out.stream.getAudioTracks()]);
  return { stream, stop: () => { clearInterval(timer); stream.getTracks().forEach((t) => t.stop()); ac.close(); } };
}

async function startRec() {
  const from = $('#from').value;
  try {
    if (from === 'canvas') ({ stream: source, stop: stopSource } = canvasSource());
    else {
      source = await navigator.mediaDevices.getUserMedia({ audio: true, video: from === 'cam' });
      stopSource = () => source.getTracks().forEach((t) => t.stop());
    }
  } catch (e) {
    msg.textContent = 'مفيش إذن للجهاز: ' + e.name + (e.message ? ': ' + e.message : '');
    return;
  }
  const mimeType = pickType(source.getVideoTracks().length ? 'video' : 'audio');
  recorder = new MediaRecorder(source, mimeType ? { mimeType } : {});
  const chunks = [];
  const t0 = Date.now();
  recorder.addEventListener('dataavailable', (e) => { if (e.data.size) chunks.push(e.data); });
  recorder.addEventListener('stop', () => {
    stopSource();
    const blob = new Blob(chunks, { type: recorder.mimeType });
    addToList(blob, (Date.now() - t0) / 1000);
    $('#rec').disabled = false; $('#stop').disabled = true;
  });
  recorder.start();
  msg.textContent = 'بيسجّل (' + (recorder.mimeType || 'النوع الافتراضي') + ')…';
  $('#rec').disabled = true; $('#stop').disabled = false;
}

function addToList(blob, seconds) {
  const url = URL.createObjectURL(blob);
  const isVideo = blob.type.startsWith('video');
  const ext = blob.type.includes('mp4') ? 'mp4' : 'webm';
  const name = 'recording-' + new Date().toISOString().slice(11, 19).replaceAll(':', '-') + '.' + ext;
  const li = document.createElement('li');
  const player = document.createElement(isVideo ? 'video' : 'audio');
  player.controls = true; player.src = url;
  const a = document.createElement('a');
  a.href = url; a.download = name; a.textContent = 'نزّل ' + name;
  const del = document.createElement('button');
  del.type = 'button'; del.textContent = 'امسح';
  del.addEventListener('click', () => { URL.revokeObjectURL(url); li.remove(); });
  li.append(player, a, ' ', del);
  $('#list').append(li);
  msg.textContent = 'اتسجّل ' + seconds.toFixed(1) + ' ثانية، ' + Math.round(blob.size / 1024) + ' KB، ' + blob.type;
}

$('#rec').addEventListener('click', startRec);
$('#stop').addEventListener('click', () => recorder && recorder.state !== 'inactive' && recorder.stop());
</script>
</body>
</html>
~~~

**هتشوف إيه:** قايمة تختار منها المصدر، و«سجّل» و«وقّف»، ومربع كحلي فيه دايرة بتلف وعداد. اختار «رسمة بتتحرك + نغمة» وسجّل: التسجيل بيظهر في اللستة بمشغّل ولينك «نزّل» وزرار «امسح». «الميكروفون» و «الكاميرا» هيقولوا [[SecurityError]] هنا، و«نزّل» مش هيعمل حاجة هنا (اتشرح في «جرّب»)، والاتنين شغالين من [[localhost]].

- **[[pickType]]**: لستة أفضلية للصوت ولستة للفيديو، و [['']] لو مفيش.
- **[[canvasSource()]]** بترجّع [[{ stream, stop }]]: الـ [[stop]] بيقفل الـ interval والـ tracks والـ [[AudioContext]] مع بعض، فمصدر الـ canvas ومصدر الميكروفون بيتقفلوا بنفس السطر [[stopSource()]].
- **[[if (e.data.size)]]**: بنتجاهل الحتت الفاضية (Chrome بعت حتة 1 byte في الجدول فوق).
- **[[addToList]]**: [[<video>]] أو [[<audio>]] حسب نوع الـ Blob، والامتداد من النوع، والاسم فيه الوقت.
- **«امسح»** بيعمل [[revokeObjectURL]] ويشيل العنصر.
- اتقاس: Playwright على الصفحة جوه الـ preview المعزول ومن [[localhost]] (الناتج في «جرّب»).

---

## الخلاصة

- [[isTypeSupported]] الأول، و Chrome بيسجّل WebM و MP4 بس (لا MP3 ولا WAV).
- [[dataavailable]] بيجمع، و [[stop]] بيتبعت بعد آخر حتة، و [[new Blob(chunks, { type: rec.mimeType })]].
- [[mimeType]] فاضي لحد [[onstart]]. و [[pause]] و [[start]] بيرموا في الحالة الغلط.
- [[start(timeslice)]] = WebM من غير مدة. يا من غير timeslice، يا [[currentTime = 1e101]].
- [[createObjectURL]] للتشغيل والتحميل، و [[revokeObjectURL]] لما تخلص، و [[fetch]] بالـ Blob مباشرة للرفع.`,
          lines: [
            R`بنطلب المايك بس. الصفحة لازم تبقى على [[localhost]] أو https.`,
            R`بنختار أول نوع المتصفح يقدر يسجّله: Opus في WebM لـ Chrome و Firefox، و MP4 لـ Safari.`,
            R`المسجّل مربوط بالـ stream وبالنوع اللي اخترناه.`,
            R`array فاضية هنجمع فيها حتت التسجيل.`,
            R`كل حتة بتوصل في [[dataavailable]]، و [[e.data]] هو الـ [[Blob]] بتاعها.`,
            R`[[start()]] من غير timeslice: حتة واحدة في الآخر والمدة بتتكتب في الملف.`,
            R`بنستنى ٣ ثواني بـ Promise حوالين [[setTimeout]].`,
            R`[[stop()]] بيوقف التسجيل، وبعده آخر [[dataavailable]] ثم [[stop]].`,
            R`بنستنى حدث [[stop]] بالذات، عشان ساعتها كل الحتت وصلت.`,
            R`بنقفل المايك نفسه: من غيرها علامة التسجيل تفضل على التاب.`,
            R`بنجمع الحتت في ملف واحد بنوعه. [[rec.mimeType]] بعد التسجيل فيه النوع الحقيقي بالـ codecs.`,
            R`عنوان [[blob:]] بيشاور على الملف في الذاكرة.`,
            R`مشغّل صوت بـ [[controls]] على نفس العنوان عشان تسمع التسجيل.`,
            R`لينك [[download]] بنفس العنوان: الضغط عليه بينزّل [[note.webm]] بدل ما يفتحه.`,
          ],
          ref: [
            { t: "MDN: MediaStream Recording API", url: "https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API" },
            { t: "MDN: MediaRecorder", url: "https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder" },
            { t: "MDN: MediaRecorder.isTypeSupported()", url: "https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/isTypeSupported_static" },
            { t: "MDN: MediaRecorder dataavailable event", url: "https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/dataavailable_event" },
            { t: "MDN: HTMLCanvasElement.captureStream()", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/captureStream" },
            { t: "MDN: URL.createObjectURL()", url: "https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static" },
          ],
          pre: [{ to: "js/getUserMedia: الكاميرا والميكروفون", why: R`الـ stream اللي بنسجّله، والإذن والأخطاء` }, { to: "js/input type=file", why: R`[[Blob]] و [[URL.createObjectURL]] اتشرحوا هناك على الملفات` }],
        },
        {
          cmd: "Web Audio API: AudioContext و Oscillator و Analyser و MSE",
          title: "إزاي تولّد صوت من غير ملفات، وتعدّله، وترسم موجته، وإيه هي Media Source Extensions؟",
          desc: R`Web Audio API بيعاملك الصوت كـ **رسم بياني (graph) من nodes** موصّلين ببعض: مصدر (oscillator بيولّد نغمة، أو ملف، أو ميكروفون) ← معالجة (gain للصوت، فلتر، analyser) ← [[ctx.destination]] (السماعة). كله جوه [[AudioContext]] واحد.

• [[new AudioContext()]] بيبدأ [[suspended]] لو مفيش ضغطة من اليوزر، و [[await ctx.resume()]] جوه ضغطة بيشغّله.
• [[ctx.createOscillator()]] نغمة ([[sine]] و [[square]] و [[sawtooth]] و [[triangle]]) و [[frequency]] بالـ Hz، و [[start()]] و [[stop(when)]]، وكل oscillator بيشتغل **مرة واحدة**.
• [[ctx.createGain()]] بيتحكم في العلو، و [[gain.setValueAtTime]] و [[linearRampToValueAtTime]] و [[exponentialRampToValueAtTime]] بيعملوا fade دقيق بساعة الصوت [[ctx.currentTime]].
• [[ctx.createAnalyser()]] بيدّيك الموجة والترددات كأرقام ترسمها على canvas.
• **Media Source Extensions (MSE)**: إنك تغذّي [[<video>]] بحتت فيديو انت بتجيبها بنفسك. ده اللي HLS و DASH (الـ streaming بجودة بتتغير) مبنيين عليه، وبتستخدمه من مكتبة زي hls.js.`,
          example: R`// beep.js: نغمة ٤٤٠ Hz لمدة ٠.٣ ثانية بـ fade، من غير أي ملف (جوه ضغطة زرار)
const ctx = new AudioContext();
const osc = ctx.createOscillator();
const gain = ctx.createGain();
osc.type = 'sine';
osc.frequency.value = 440;
osc.connect(gain).connect(ctx.destination);
const t = ctx.currentTime;
gain.gain.setValueAtTime(0, t);
gain.gain.linearRampToValueAtTime(0.3, t + 0.01);
gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
osc.start(t);
osc.stop(t + 0.3);
osc.onended = () => console.log('خلص', ctx.state);`,
          try: R`افتح البيانو الحي في آخر الشرح. قبل ما تدوس حاجة: السطر بيقول إيه عن الـ [[AudioContext]]؟ دوس على A (أو حرف [[h]] من الكيبورد) وبص على الموجة. غيّر الموجة لـ [[square]] ثم [[sawtooth]] ودوس نفس النغمة: الشكل والصوت اتغيروا إزاي؟ وبعدين دوس ٣ نغمات ورا بعض بسرعة: بيتداخلوا ولا الواحدة بتقطع اللي قبلها؟`,
          sol: R`~~~text الناتج (نفس الصفحة جوه الـ preview المعزول، Chrome 157، Playwright)
قبل أي ضغطة:     AudioContext: لسه متعملش (دوس على أي زرار)
بعد ضغطة A:      AudioContext: running — 48000 Hz
الموجة:           1287 pixel أزرق (خط الموجة) وهي بتلعب، و 758 بعد ما خلصت (خط مستقيم في النص)
~~~

- الـ [[AudioContext]] بيتعمل **مع أول ضغطة** مش لما الصفحة تفتح: لو اتعمل بدري هيبقى [[suspended]] (الشرح، قسم ١).
- [[sine]] موجة ناعمة وصوت هادي، و [[square]] مربعة وصوت زي ألعاب زمان، و [[sawtooth]] سنان منشار وصوت حاد. الرسمة نفسها هي البيانات اللي [[getByteTimeDomainData]] رجّعها.
- النغمات **بتتداخل**: كل ضغطة بتعمل oscillator و gain جداد، وكل واحد بيخلص لوحده بعد ٠.٨ ثانية. مفيش نغمة بتقطع التانية.
- الـ preview المعزول بيسمح بـ Web Audio عادي بعد الضغطة (اتقاس).`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** أنهي سطر هيرمي، وأنهي سطر هيعدّي بهدوء وهو غلط؟

~~~js
const ctx = new AudioContext();               // جوه ضغطة
const osc = ctx.createOscillator();
osc.connect(ctx.destination);
osc.start();
try { osc.start(); } catch (e) { console.log(1, e.name + ': ' + e.message); }
try { ctx.createGain().gain.exponentialRampToValueAtTime(0, ctx.currentTime + 1); } catch (e) { console.log(2, e.name + ': ' + e.message); }
osc.frequency.value = 30000; console.log(3, osc.frequency.value);
osc.type = 'nope'; console.log(4, osc.type);
try { osc.type = 'custom'; } catch (e) { console.log(5, e.name); }
osc.stop(); osc.stop(); console.log(6, 'stop مرتين عدّى');
~~~`, done: R`عرفت التلاتة اللي بيرموا والتلاتة اللي بيعدّوا بصمت.`, sol: R`~~~text الناتج (Chrome 157)
1 InvalidStateError: Failed to execute 'start' on 'AudioScheduledSourceNode': cannot call start more than once.
2 RangeError: Failed to execute 'exponentialRampToValueAtTime' on 'AudioParam': The float target value provided (0) should not be in the range (-1.40130e-45, 1.40130e-45).
3 24000
4 sine
5 InvalidStateError
6 stop مرتين عدّى
Console (تحذيرات): Oscillator.frequency.value 30000 outside nominal range [-24000, 24000]; value will be clamped.
                   The provided value 'nope' is not a valid enum value of type OscillatorType.
~~~

- **(1)** الـ oscillator **مبيتشغلش مرتين**. كل نغمة = oscillator جديد (رخيص جدًا، ده التصميم).
- **(2)** الـ exponential ramp مبيوصلش لصفر (الأُس من صفر مستحيل). انزل لـ [[0.001]] (مش مسموع)، أو استخدم [[setTargetAtTime(0, …)]].
- **(3)** 30000 اتقص لـ 24000 = نص الـ sample rate (48000 ÷ 2، حد Nyquist) مع تحذير في الـ Console بس.
- **(4)** [[type = 'nope']] **اتجاهل بصمت** وفضل [[sine]]: الـ enums في Web IDL بتتجاهل القيمة الغلط ومبترميش. باج صعب تلاقيه لو كتبت [['sawtooh']].
- **(5)** [['custom']] بيرمي لأنه محتاج [[setPeriodicWave()]] بموجة انت راسمها.
- **(6)** [[stop()]] تاني مبيرميش في Chrome 157.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[beep(freq, ms)]] صوت إشعار من غير ملفات: fade in في ١٠ ms، وبعدين fade out exponential لحد آخر المدة، وكل نداء بيعمل nodes جديدة وبيفصلهم لما يخلصوا. واثبت شكل الصوت بالأرقام من غير سماعات: نفس الـ envelope في [[OfflineAudioContext]] واحسب الـ RMS في أجزاء الوقت.`, done: R`الـ RMS عالي في أول ٥٠ ms، وبيقع لـ 0.0155 عند ١٥٠–٢٠٠ ms، وصفر بعد ٣٠٠ ms.`, sol: R`~~~js
let ctx;
async function beep(freq = 880, ms = 300, volume = 0.3) {
  ctx ??= new AudioContext();
  if (ctx.state === 'suspended') await ctx.resume();
  const t = ctx.currentTime, end = t + ms / 1000;
  const osc = ctx.createOscillator(), env = ctx.createGain();
  osc.frequency.value = freq;
  env.gain.setValueAtTime(0, t);
  env.gain.linearRampToValueAtTime(volume, t + 0.01);
  env.gain.exponentialRampToValueAtTime(0.001, end);
  osc.connect(env).connect(ctx.destination);
  osc.start(t); osc.stop(end);
  osc.onended = () => { osc.disconnect(); env.disconnect(); };
}

// الاختبار: نفس الـ envelope (volume = 1) في OfflineAudioContext، ثانية واحدة 48000 عينة
const off = new OfflineAudioContext(1, 48000, 48000);
const o = off.createOscillator(), g = off.createGain();
o.connect(g).connect(off.destination);
g.gain.setValueAtTime(0, 0); g.gain.linearRampToValueAtTime(1, 0.01); g.gain.exponentialRampToValueAtTime(0.001, 0.3);
o.start(0); o.stop(0.3);
const d = (await off.startRendering()).getChannelData(0);
const rms = (a, b) => { let s = 0; for (let i = a; i < b; i++) s += d[i] * d[i]; return Math.sqrt(s / (b - a)).toFixed(4); };
console.log('0-10ms=' + rms(0, 480), '10-50ms=' + rms(480, 2400), '150-200ms=' + rms(7200, 9600), '280-300ms=' + rms(13440, 14400), '300-400ms=' + rms(14400, 19200));
~~~

~~~text الناتج (Chrome 157)
0-10ms=0.4181 10-50ms=0.4704 150-200ms=0.0155 280-300ms=0.0009 300-400ms=0.0000
~~~

- **[[OfflineAudioContext(channels, length, sampleRate)]]**: نفس الـ API بس بيحسب الصوت في الذاكرة أسرع من الوقت الحقيقي ومن غير سماعات، و [[startRendering()]] بيرجّع [[AudioBuffer]]. ده اللي بيخليك تختبر كود صوت بأرقام.
- **الـ RMS** (جذر متوسط المربعات) = «علو» الحتة. موجة sine كاملة الـ RMS بتاعها 0.707، فـ 0.47 في ١٠–٥٠ ms معناه إن الـ fade out بدأ ينزل على طول. و 0.0009 قبل النهاية = مش مسموع، وده ليه [[0.001]] هدف كويس.
- **من غير fade:** [[start]] و [[stop]] على طول بيعملوا «تكة» (click) في الأول والآخر، لأن الموجة بتقطع فجأة من قيمة لصفر.
- **[[ctx ??= new AudioContext()]]**: [[??=]] بيعمل الـ context أول مرة بس. context واحد للصفحة كلها، مش واحد لكل beep (المتصفح بيحدد عددهم).` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** شغّل oscillator 440 Hz على [[AnalyserNode]] بـ [[fftSize]] 2048 ومرة 32768، ولاقي أعلى bin في [[getFloatFrequencyData]] وحوّله لـ Hz. ليه الرقم مش 440 بالظبط؟ وإيه التمن اللي بتدفعه في الـ fftSize الكبير؟`, done: R`عندك الرقمين (445.31 و 439.45 على 48000 Hz) وشرح لعرض الـ bin.`, sol: R`~~~js
// جوه ضغطة: ctx = new AudioContext()
for (const size of [2048, 32768]) {
  const osc = ctx.createOscillator(), an = ctx.createAnalyser(), mute = ctx.createGain();
  an.fftSize = size; mute.gain.value = 0; osc.frequency.value = 440;
  osc.connect(an); an.connect(mute).connect(ctx.destination); osc.start();
  await new Promise((r) => setTimeout(r, 1200));
  const f = new Float32Array(an.frequencyBinCount); an.getFloatFrequencyData(f);
  let bin = 0; f.forEach((v, i) => { if (v > f[bin]) bin = i; });
  console.log('fftSize=' + size + ' bins=' + an.frequencyBinCount + ' width=' + (ctx.sampleRate / size).toFixed(3) + 'Hz peak bin=' + bin + ' => ' + (bin * ctx.sampleRate / size).toFixed(2) + 'Hz');
  osc.stop();
}
~~~

~~~text الناتج (Chrome 157، sampleRate 48000)
fftSize=2048 bins=1024 width=23.438Hz peak bin=19 => 445.31Hz (-27.8 dB)
fftSize=32768 bins=16384 width=1.465Hz peak bin=300 => 439.45Hz (-28.1 dB)
~~~

- **الـ FFT بيقسم الترددات لصناديق (bins)** عرض كل واحد [[sampleRate / fftSize]]. مع 2048 الصندوق 23.4 Hz، فـ 440 وقعت في صندوق 19 اللي بيبدأ عند 445.3. ومع 32768 الصندوق 1.46 Hz، فبقت 439.45.
- **التمن:** 32768 عينة = 0.68 ثانية من الصوت لازم تتجمع قبل الحساب، فالرسمة بتتأخر وبتبقى أبطأ في الرد. للـ visualizer بيبقى 2048 كفاية. ولـ tuner (مشروع في الوحدة) محتاج دقة، فبيستخدموا طرق تانية (autocorrelation) على الـ time domain بدل أعلى bin.
- **[[mute]] gain بـ 0:** الـ analyser فضل جزء من الـ graph اللي رايح للسماعة، والـ gain الصفر بيخليك متسمعش النغمة وانت بتقيس.
- [[frequencyBinCount]] دايمًا نص الـ [[fftSize]].` },
            { lvl: 'تحدي', t: R`**ابني:** صوت «بيو» (تردد بينزل من 880 لـ 220 في ٠.٩ ثانية مع fade) يتعمل في [[OfflineAudioContext]] ويتحوّل **ملف WAV** تنزّله أو تشغّله في [[<audio>]]. اكتب الـ header بـ [[DataView]] بنفسك.`, done: R`الملف 44144 byte ([[44 + 22050 × 2]])، والـ [[<audio>]] بيقول [[duration=1]].`, sol: R`~~~js
const off = new OfflineAudioContext(1, 22050, 22050);          // ثانية واحدة، 22050 عينة
const o = off.createOscillator(), e = off.createGain();
o.connect(e).connect(off.destination);
e.gain.setValueAtTime(0, 0); e.gain.linearRampToValueAtTime(0.8, 0.02); e.gain.exponentialRampToValueAtTime(0.001, 0.9);
o.frequency.setValueAtTime(880, 0); o.frequency.exponentialRampToValueAtTime(220, 0.9);
o.start(); o.stop(1);
const rendered = await off.startRendering();

function toWav(ab) {
  const data = ab.getChannelData(0), rate = ab.sampleRate, n = data.length;
  const buf = new ArrayBuffer(44 + n * 2), v = new DataView(buf);
  const str = (o, s) => [...s].forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)));
  str(0, 'RIFF'); v.setUint32(4, 36 + n * 2, true); str(8, 'WAVE'); str(12, 'fmt ');
  v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
  v.setUint32(24, rate, true); v.setUint32(28, rate * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true);
  str(36, 'data'); v.setUint32(40, n * 2, true);
  for (let i = 0; i < n; i++) v.setInt16(44 + i * 2, Math.max(-1, Math.min(1, data[i])) * 0x7fff, true);
  return new Blob([buf], { type: 'audio/wav' });
}
const wav = toWav(rendered);
const a = new Audio(URL.createObjectURL(wav));
a.onloadedmetadata = () => console.log('WAV: ' + wav.size + ' byte type=' + wav.type + ' duration=' + a.duration);
~~~

~~~text الناتج (Chrome 157)
WAV: 44144 byte type=audio/wav duration=1 (rendered length=22050)
~~~

- **العينات [[Float32]] من -1 لـ 1**، والـ WAV 16-bit عايز أرقام صحيحة من -32768 لـ 32767، فبنضرب في [[0x7fff]] (32767). و [[Math.max(-1, Math.min(1, x))]] (clamp) عشان أي عينة عدّت الحد متلفّش لعلامة عكسية وتطلع «طقة».
- **الـ header:** ٤٤ byte، كل الأرقام little-endian (الـ [[true]] في كل [[setUint32]])، ودرس «DataView» بيشرح كل خانة. [[36 + n * 2]] = حجم الملف ناقص أول ٨ bytes.
- **[[exponentialRampToValueAtTime]] على [[frequency]]**: النزول بالأُس بيبان للودن منتظم (الأوكتاف = الضعف)، و linear كان هيبان إنه بيقع بسرعة في الآخر.
- **22050 Hz** كفاية لصوت تنبيه (أعلى تردد 11025)، ونص حجم 44100. ده مشروع «مولّد أصوات التنبيه» في الوحدة.` },
            { lvl: 'تحدي', t: R`**اشرحها:** زميلك عايز يشغّل فيديو «بجودة بتتغير حسب النت» زي YouTube، وكاتب [[video.src = 'movie.m3u8']]. اكتبله: يعني إيه adaptive streaming، والفرق بين HLS و DASH، وليه [[src]] مش كفاية في كل المتصفحات، و MSE دورها إيه، ويستخدم إيه فعلًا. وقيس: [[MediaSource.isTypeSupported]] بيرد بإيه على [[application/vnd.apple.mpegurl]]؟`, done: R`شرح فيه الـ ٥ نقط، والرقم المتقاس.`, sol: R`~~~js
for (const t of ['video/webm; codecs="vp9, opus"', 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"', 'video/webm', 'video/mp2t; codecs="avc1.42E01E"', 'application/vnd.apple.mpegurl'])
  console.log('MediaSource.isTypeSupported(' + t + ') = ' + MediaSource.isTypeSupported(t));
console.log(document.createElement('video').canPlayType('application/vnd.apple.mpegurl'), typeof window.ManagedMediaSource);
~~~

~~~text الناتج (Chrome 157)
MediaSource.isTypeSupported(video/webm; codecs="vp9, opus") = true
MediaSource.isTypeSupported(video/mp4; codecs="avc1.42E01E, mp4a.40.2") = true
MediaSource.isTypeSupported(video/webm) = false
MediaSource.isTypeSupported(video/mp2t; codecs="avc1.42E01E") = true
MediaSource.isTypeSupported(application/vnd.apple.mpegurl) = false
maybe undefined
~~~

**الإجابة النموذجية:**

1. **adaptive streaming:** الفيديو متقطع حتت صغيرة (٢–١٠ ثواني)، وكل حتة موجودة بكذا جودة (360p و 720p و 1080p). المشغّل بيقيس سرعة النت وبيختار جودة الحتة الجاية، فلو النت وقع الفيديو بيكمّل بجودة أقل بدل ما يقف.
2. **HLS و DASH:** نفس الفكرة بـ «قايمة» بتوصف الحتت والجودات. HLS من Apple وقايمته [[.m3u8]]، و DASH معيار مفتوح وقايمته [[.mpd]] (XML).
3. **ليه [[src]] مش كفاية:** Safari بيشغّل [[.m3u8]] في [[src]] بنفسه، و Chrome 157 للديسكتوب رد [["maybe"]] على [[canPlayType]] (يعني بدأ يدعمه)، بس متصفحات تانية لأ، و DASH محدش بيشغّله في [[src]] لوحده.
4. **MSE:** الطريقة اللي JavaScript بيغذّي بيها [[<video>]] بالحتت بنفسه: بيقرا القايمة، ويختار الجودة، ويجيب الحتة بـ [[fetch]]، ويحطها في [[SourceBuffer]] بـ [[appendBuffer]]. لاحظ إن [[MediaSource.isTypeSupported]] بيرد على **صيغ الحتت** (MP4 و WebM و [[mp2t]])، مش على [[.m3u8]]: القايمة دي شغلة المكتبة.
5. **يستخدم إيه:** hls.js أو Shaka Player أو dash.js، وهم مبنيين على MSE. الشكل المعتاد (من وثائق hls.js، مش متجرّب هنا لأن الـ lab مبينزّلش مكتبات): لو [[canPlayType('application/vnd.apple.mpegurl')]] حط [[src]] على طول، وإلا [[new Hls()]] و [[hls.loadSource(url)]] و [[hls.attachMedia(video)]]. و [[ManagedMediaSource]] ([[undefined]] في Chrome) هو نسخة Safari على iPhone اللي بتوفّر البطارية.` },
          ],
          flag: "script",
          deep: {
            why: R`[[<audio>]] بيشغّل ملف وخلاص. Web Audio بيدّيك الصوت نفسه كأرقام: تولّده (أصوات تنبيه وألعاب من غير ملفات)، وتعدّله (fade، وفلاتر، وصدى، و panning يمين وشمال)، وتحلله (visualizer، ومستوى الميكروفون، و tuner)، وتجدوله بدقة الـ sample (مترونوم وموسيقى). ولأن التوقيت بساعة الصوت مش [[setTimeout]]، النغمات بتنزل في ميعادها بالظبط حتى لو الصفحة مشغولة. و MSE نفس الفكرة للفيديو: JavaScript هو اللي بيقرر أنهي bytes تدخل المشغّل، وده اللي خلّى الـ streaming في الويب ممكن من غير plugins. الاتنين في منهج MDN كـ «APIs تعرف هي بتتعمل لإيه».`,
            how: R`الـ [[AudioContext]] بيشغّل thread صوت لوحده بيحسب الـ graph في حتت صغيرة (128 عينة كل مرة، يعني 2.7 ms على 48000 Hz) ويبعتها للسماعة. كل node ليه inputs و outputs، و [[connect(node)]] بيوصّل الـ output بالـ input وبيرجّع الـ node التاني (عشان كده [[osc.connect(gain).connect(ctx.destination)]] بيشتغل في سطر واحد، واتقاس إنه بيرجّع نفس الـ gain).

الخصائص زي [[gain]] و [[frequency]] مش أرقام عادية: [[AudioParam]] فيه [[value]] وجدول تغييرات بالوقت. [[setValueAtTime(v, t)]] يحط قيمة في لحظة، و [[linearRampToValueAtTime(v, t)]] يمشي بخط مستقيم لحد [[t]]، و [[exponentialRampToValueAtTime]] بمنحنى أُسّي (مبيوصلش لصفر)، و [[setTargetAtTime(v, t, τ)]] يقرّب من [[v]] بسرعة [[τ]] (اتقاس: بعد τ واحدة وصل 0.368 = 1/e). كله بـ [[ctx.currentTime]] (ثواني من بداية الـ context)، مش بـ [[performance.now()]].

المصادر (oscillator و buffer source) «one-shot»: [[start(when)]] مرة و [[stop(when)]]، وبعدين [[ended]]، والـ garbage collector بيشيلهم. والـ [[AnalyserNode]] بيحتفظ بآخر [[fftSize]] عينة وبيحسب FFT لما تطلب. أما MSE: [[new MediaSource()]] و [[video.src = URL.createObjectURL(ms)]]، وفي [[sourceopen]] [[addSourceBuffer(type)]]، وكل [[appendBuffer(bytes)]] بيستنى [[updateend]] قبل اللي بعده، وفي الآخر [[endOfStream()]].`,
            when: R`Web Audio: أصوات واجهة قصيرة (إشعار، نجاح، خطأ)، وألعاب، وآلات موسيقية ومترونوم، و visualizer لمشغّل، ومستوى الميكروفون قبل مكالمة، وتعديل صوت قبل التسجيل (gain أو فلتر قبل [[MediaRecorder]])، وتحليل ملف صوت ([[decodeAudioData]]). ومتستخدموش لتشغيل بودكاست أو أغنية طويلة: [[<audio>]] أوفر وبيدعم الـ streaming وشاشة القفل. MSE: لما عندك HLS أو DASH أو streaming خاص (live، أو فيديو مشفّر بـ EME)، ودايمًا من مكتبة. ولو فيديو عادي MP4، [[src]] كفاية.`,
            mistakes: R`- تعمل [[AudioContext]] أول ما الصفحة تفتح: [[suspended]]، ومفيش صوت، ومفيش خطأ. اعمله أو [[resume()]] جوه ضغطة (اتقاس: الضغطة لوحدها من غير [[resume()]] مشغّلتهوش).
- تعيد استخدام oscillator: [[InvalidStateError: … cannot call start more than once.]]
- [[exponentialRampToValueAtTime(0, t)]]: [[RangeError]]. انزل لـ [[0.001]].
- تغيّر [[gain.value]] على طول وهو بيشتغل: «تكة». استخدم [[setTargetAtTime]] أو ramp قصير.
- [[osc.type = 'sawtooh']] (غلطة إملائية): مفيش خطأ، والموجة بتفضل [[sine]].
- [[createMediaElementSource(audio)]] مرتين لنفس العنصر: [[InvalidStateError: … HTMLMediaElement already connected previously to a different MediaElementSourceNode.]] واعمله مرة واحدة، والعنصر بعدها صوته بيعدّي من الـ graph بس (لازم توصّله بالـ destination).
- [[decodeAudioData(buf)]] وبعدين تستخدم [[buf]] تاني: اتقاس إن [[byteLength]] بقى 0 (detached، درس «ArrayBuffer: resize و transfer و detached»).
- [[appendBuffer]] وانت لسه في [[updating]]: [[InvalidStateError: … This SourceBuffer is still processing an 'appendBuffer' or 'remove' operation.]] استنى [[updateend]].
- تقطع ملف WebM في أي مكان وتديه لـ MSE: اتقاس إن نص الملف بالـ bytes عمل فجوة في [[buffered]]. الحتت لازم تبقى segments كاملة (القايمة والـ packager زي ffmpeg بيعملوها).`,
          },
          teach: R`## الفكرة في سطر

nodes موصّلين ببعض جوه [[AudioContext]]: مصدر ← تعديل ← سماعة، والتوقيت بساعة الصوت. وفي الآخر MSE: تغذية [[<video>]] بحتت بنفسك. كل الناتج من Chrome 157 بـ Playwright.

---

## ١. [[AudioContext]] وسياسة الـ autoplay

~~~text الناتج (Chrome 157)
صفحة بتعمل new AudioContext() أول ما تفتح:      AudioContext.state قبل الضغط: suspended
بعد ضغطة حقيقية، من غير resume():               AudioContext.state بعد الضغط من غير resume: suspended
بعد await ctx.resume() جوه الضغطة:              بعد resume: running
context اتعمل جوه الضغطة نفسها:                 created inside click: running
sampleRate=48000  baseLatency=0.0107 (10.7 ms)
~~~

- **الـ context اللي اتعمل بدري بيفضل [[suspended]]** حتى بعد ما اليوزر يدوس، لحد ما تنادي [[resume()]] بنفسك. فالنمط: [[if (ctx.state === 'suspended') await ctx.resume();]] في أول كل handler بيشغّل صوت.
- أو اعمله أول مرة جوه الضغطة ([[ctx ??= new AudioContext()]])، وده اللي البيانو تحت بيعمله.
- [[sampleRate]] 48000 عينة في الثانية (سماعات الجهاز). [[baseLatency]] التأخير بين الحساب والسماعة.
- [[ctx.close()]] بيقفله خالص: [[state]] = [[closed]]، و [[resume()]] بعدها = [[InvalidStateError: Cannot resume a closed AudioContext.]]

---

## ٢. الـ graph: [[connect]]

~~~js
const osc = ctx.createOscillator();
const gain = ctx.createGain();
const analyser = ctx.createAnalyser();
osc.connect(gain).connect(analyser).connect(ctx.destination);
~~~

~~~text الناتج (Chrome 157)
osc defaults: type=sine frequency=440 detune=0 freq range=-24000..24000
gain default=1
analyser fftSize=2048 bins=1024 smoothing=0.8 minDb=-100 maxDb=-30
connect returns gain? true
~~~

~~~text الشكل
OscillatorNode  ──►  GainNode  ──►  AnalyserNode  ──►  destination (السماعة)
  (بيولّد)         (العلو)          (بيقيس)
~~~

- [[connect]] بيرجّع الـ node اللي اتوصلتله، فالسلسلة في سطر واحد.
- [[disconnect()]] بيفصل كل الـ outputs. وممكن node يتوصل لأكتر من node (فرع للسماعة وفرع للـ analyser).
- الـ [[destination]] هو الوحيد اللي بيطلّع صوت. node مش متوصل بيه (مباشرة أو من خلال nodes تانية) = صوت مش مسموع.

---

## ٣. [[OscillatorNode]]: نغمة من غير ملف

| [[type]] | شكل الموجة | الصوت |
|---|---|---|
| [[sine]] | منحنى ناعم | نقي وهادي، زي صفارة |
| [[square]] | طالع نازل مربع | حاد ومليان، زي ألعاب الـ 8-bit |
| [[sawtooth]] | سنان منشار | حاد جدًا، أساس أصوات السينثسايزر |
| [[triangle]] | مثلثات | بين الـ sine والـ square |

- [[frequency]] بالـ Hz: 440 = نوتة A، والدوبل 880 = نفس النوتة أعلى بأوكتاف. أقصاه نص الـ sample rate (24000 هنا).
- [[detune]] بالـ cents (١٠٠ cent = نص تون): لتعديل صغير من غير ما تحسب Hz.
- [[start(when)]] و [[stop(when)]] بثواني [[ctx.currentTime]]، و [[onended]] لما يخلص. ومرة واحدة بس: [[start()]] التاني = [[InvalidStateError]].

---

## ٤. [[GainNode]] و [[AudioParam]]: الـ envelope

~~~js
const t = ctx.currentTime;
gain.gain.setValueAtTime(0, t);
gain.gain.linearRampToValueAtTime(1, t + 0.01);        // attack: من 0 لـ 1 في 10 ms
gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3); // release: لحد 0.001 عند 300 ms
~~~

~~~text الناتج (Chrome 157، OfflineAudioContext، RMS لكل جزء من الوقت)
envelope rms: 0-10ms=0.4181 10-50ms=0.4704 150-200ms=0.0155 280-300ms=0.0009 300-400ms=0.0000
setTargetAtTime(0, 0.1, 0.05): t=0.1 → 1.000 t=0.15 → 0.368 t=0.25 → 0.050 t=0.35 → 0.0067
~~~

| الـ method | بيعمل |
|---|---|
| [[setValueAtTime(v, t)]] | القيمة تبقى [[v]] عند [[t]] بالظبط. نقطة بداية لأي ramp |
| [[linearRampToValueAtTime(v, t)]] | خط مستقيم من القيمة اللي قبله لـ [[v]] عند [[t]] |
| [[exponentialRampToValueAtTime(v, t)]] | منحنى أُسّي، بيبان للودن طبيعي. [[v]] مينفعش يبقى 0 ([[RangeError]]) |
| [[setTargetAtTime(v, t, τ)]] | يبدأ عند [[t]] يقرّب من [[v]]: بعد τ يقطع ٦٣٪ من المسافة، وبعد 5τ تقريبًا وصل |
| [[cancelScheduledValues(t)]] | يلغي أي تغيير متجدول بعد [[t]] (لو اليوزر داس تاني في النص) |

- الـ envelope بيمنع «التكة»: الموجة بتبدأ وبتخلص من صفر بالتدريج.
- [[setTargetAtTime]] بعد τ واحدة (0.05 ثانية) وصل 0.368 = 1/e، وبعد ٥ τ وصل 0.0067. مناسب لتغيير الصوت وانت بتحرّك slider (البيانو بيستخدمه).

---

## ٥. [[AnalyserNode]]: الموجة والترددات كأرقام

~~~js
const data = new Uint8Array(analyser.fftSize);
analyser.getByteTimeDomainData(data);                      // الموجة: 128 = صفر
const freq = new Uint8Array(analyser.frequencyBinCount);
analyser.getByteFrequencyData(freq);                       // قوة كل تردد من 0 لـ 255
~~~

~~~text الناتج (Chrome 157، sine 440 Hz و gain 0.2)
peak bin=19 value=212 => 445.3Hz (bin width 23.4375)
time domain min..max=102..153
~~~

- **time domain:** آخر 2048 عينة كـ bytes، و 128 هو الصفر. gain 0.2 = الموجة من 102 لـ 153 (حوالي 128 ± 25).
- **frequency:** FFT بيقسم الترددات لـ 1024 صندوق عرض كل واحد [[48000 / 2048]] = 23.4 Hz. الـ 440 بانت في صندوق 19. ولو محتاج دقة: [[fftSize]] أكبر (التمرين التالت).
- و [[getFloatTimeDomainData]] و [[getFloatFrequencyData]] نفس الحاجة بـ [[Float32Array]] (القيم الحقيقية من -1 لـ 1 والـ dB).
- الرسم: كل frame ([[requestAnimationFrame]]) اقرا الـ array وارسمها خط على canvas (البيانو تحت).

---

## ٦. ملفات و [[<audio>]] جوه الـ graph

~~~js
const buf = await ctx.decodeAudioData(await (await fetch('tone.wav')).arrayBuffer());
const src = ctx.createBufferSource();
src.buffer = buf; src.playbackRate.value = 2;
src.connect(ctx.destination); src.start();
~~~

~~~text الناتج (Chrome 157)
decodeAudioData(tone.wav): sampleRate=48000 duration=3 channels=1 length=144000 byteLength after=0
broken: EncodingError: Unable to decode audio data
BufferSource 3s بسرعة 2 خلص بعد 1.50s (ساعة الصوت)
createMediaElementSource مرتين: InvalidStateError: Failed to execute 'createMediaElementSource' on 'AudioContext': HTMLMediaElement already connected previously to a different MediaElementSourceNode.
~~~

- **[[decodeAudioData]]**: الملف كله بيتفك في الذاكرة كأرقام. الـ WAV كان 22050 Hz واتحوّل لـ 48000 (sample rate الـ context)، و 3 ثواني = 144000 عينة. والـ [[ArrayBuffer]] الأصلي اتنقل (detached، [[byteLength]] = 0).
- **[[AudioBufferSourceNode]]**: بيشغّل الـ buffer ده، وهو كمان one-shot، بس الـ buffer نفسه تقدر تشغّله من sources كتير في نفس الوقت. مثالي لأصوات قصيرة بتتكرر (ألعاب).
- **[[createMediaElementSource(audio)]]**: بيدخّل [[<audio>]] عادي في الـ graph (عشان visualizer لبودكاست مثلًا). مرة واحدة لكل عنصر.
- **[[createMediaStreamSource(stream)]]**: نفس الحاجة للميكروفون (قياس المستوى)، و [[createMediaStreamDestination()]] العكس: الـ graph لـ stream تسجّله (درس التسجيل).

---

## ٧. البيانو (حي)

~~~live 360 بيانو صغير
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>بيانو صغير</title>
<style>
  body { font-family: system-ui, sans-serif; margin: 12px; }
  .keys { display: flex; gap: 4px; direction: ltr; margin: 8px 0; }
  .keys button { flex: 1; min-height: 90px; font: inherit; border: 1px solid #94a3b8; border-radius: 0 0 8px 8px; background: #fff; cursor: pointer; }
  .keys button.on { background: #facc15; }
  .row { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
  select, input { font: inherit; }
  canvas { width: 100%; height: 120px; background: #0f172a; border-radius: 8px; display: block; margin-top: 8px; }
  #state { font-family: monospace; direction: ltr; text-align: left; }
</style>
</head>
<body>
<div class="row">
  <label>الموجة <select id="wave"><option>sine</option><option>square</option><option>sawtooth</option><option>triangle</option></select></label>
  <label>الصوت <input id="vol" type="range" min="0" max="0.5" step="0.01" value="0.2"></label>
</div>
<div class="keys" id="keys"></div>
<p id="state">AudioContext: لسه متعملش (دوس على أي زرار)</p>
<canvas id="scope" width="600" height="120"></canvas>
<script>
const NOTES = [['C', 261.63, 'a'], ['D', 293.66, 's'], ['E', 329.63, 'd'], ['F', 349.23, 'f'], ['G', 392.0, 'g'], ['A', 440.0, 'h'], ['B', 493.88, 'j'], ['C5', 523.25, 'k']];
let ac = null, master, analyser;
const state = document.querySelector('#state');

// الـ AudioContext بيتعمل مع أول ضغطة (سياسة الـ autoplay)
async function audio() {
  if (!ac) {
    ac = new AudioContext();
    master = ac.createGain();
    analyser = ac.createAnalyser(); analyser.fftSize = 2048;
    master.connect(analyser).connect(ac.destination);
    master.gain.value = Number(document.querySelector('#vol').value);
    draw();
  }
  if (ac.state === 'suspended') await ac.resume();
  state.textContent = 'AudioContext: ' + ac.state + ' — ' + ac.sampleRate + ' Hz';
  return ac;
}

// نغمة واحدة: oscillator جديد + gain للـ envelope، وبعدين بيتشالوا لوحدهم
async function play(freq, btn) {
  const ctx = await audio();
  const osc = ctx.createOscillator(), env = ctx.createGain(), t = ctx.currentTime;
  osc.type = document.querySelector('#wave').value;
  osc.frequency.value = freq;
  env.gain.setValueAtTime(0, t);
  env.gain.linearRampToValueAtTime(1, t + 0.01);
  env.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
  osc.connect(env).connect(master);
  osc.start(t); osc.stop(t + 0.8);
  osc.onended = () => { osc.disconnect(); env.disconnect(); };
  btn.classList.add('on'); setTimeout(() => btn.classList.remove('on'), 150);
}

// رسم الموجة: AnalyserNode بيدّينا آخر 2048 عينة كل frame
function draw() {
  const c = document.querySelector('#scope'), g = c.getContext('2d');
  const data = new Uint8Array(analyser.fftSize);
  (function frame() {
    analyser.getByteTimeDomainData(data);
    g.fillStyle = '#0f172a'; g.fillRect(0, 0, c.width, c.height);
    g.strokeStyle = '#38bdf8'; g.lineWidth = 2; g.beginPath();
    for (let i = 0; i < data.length; i++) {
      const x = (i / data.length) * c.width, y = (data[i] / 255) * c.height;
      i ? g.lineTo(x, y) : g.moveTo(x, y);
    }
    g.stroke();
    requestAnimationFrame(frame);
  })();
}

const keys = document.querySelector('#keys');
for (const [name, freq, key] of NOTES) {
  const b = document.createElement('button');
  b.type = 'button'; b.textContent = name + ' (' + key + ')'; b.dataset.key = key;
  b.addEventListener('click', () => play(freq, b));
  keys.append(b);
}
addEventListener('keydown', (e) => {
  if (e.repeat || e.target.matches('input, select')) return;
  const b = keys.querySelector('[data-key="' + e.key.toLowerCase() + '"]');
  if (b) b.click();
});
document.querySelector('#vol').addEventListener('input', (e) => { if (master) master.gain.setTargetAtTime(Number(e.target.value), ac.currentTime, 0.02); });
</script>
</body>
</html>
~~~

**هتشوف إيه:** اختيار الموجة وشريط الصوت، و ٨ مفاتيح بيضا (C لـ C5) عليها حرف الكيبورد، وسطر حالة الـ context، ومستطيل كحلي فيه خط أزرق بيترسم عليه شكل الموجة وانت بتعزف.

- **[[audio()]]** بتعمل الـ context والـ master gain والـ analyser **مرة واحدة** مع أول ضغطة، وبعدين [[resume()]] لو [[suspended]].
- **[[play(freq, btn)]]**: كل نغمة oscillator و gain جداد، و envelope ٠.٨ ثانية، و [[onended]] بيعمل [[disconnect]]. ده ليه النغمات بتتداخل من غير ما تقطع بعض.
- **[[draw()]]**: [[requestAnimationFrame]] بيقرا [[getByteTimeDomainData]] ويرسم 2048 نقطة كخط.
- **الكيبورد:** [[e.repeat]] بيمنع التكرار لما تسيب صباعك على الزرار، و [[e.target.matches('input, select')]] بيسيب الحروف للخانات.
- **[[setTargetAtTime]] على الـ master** وانت بتحرّك شريط الصوت: من غير «تكة».

---

## ٨. Media Source Extensions: تغذّي [[<video>]] بنفسك

لما الفيديو مش ملف واحد بتحطه في [[src]] (بث، أو جودة بتتغير)، JavaScript بيجيب الحتت ويحطها في المشغّل بنفسه:

~~~js
const ms = new MediaSource();
video.src = URL.createObjectURL(ms);
ms.addEventListener('sourceopen', async () => {
  const sb = ms.addSourceBuffer('video/webm; codecs="vp9, opus"');
  const data = await (await fetch('clip.webm')).arrayBuffer();
  sb.appendBuffer(data);
  await new Promise((r) => sb.addEventListener('updateend', r, { once: true }));
  ms.endOfStream();
  video.play();
});
~~~

~~~text الناتج (Chrome 157، clip.webm اتقسم بالـ bytes لنصين عمدًا)
ms.readyState before sourceopen=closed url=blob:http://127.0.0.1:8791/<uuid>
sourceopen: open
addSourceBuffer('video/mp4; codecs="nope"') => NotSupportedError: Failed to execute 'addSourceBuffer' on 'MediaSource': The type provided ('video/mp4; codecs="nope"') is unsupported.
after half: buffered=0.00-0.39 readyState=0
appendBuffer وهو لسه updating => InvalidStateError: Failed to execute 'appendBuffer' on 'SourceBuffer': This SourceBuffer is still processing an 'appendBuffer' or 'remove' operation.
after rest: buffered=0.00-0.39,0.73-3.98
endOfStream: ended duration=4.031
MSE play t=0.46
~~~

- **[[readyState]]**: [[closed]] ← [[open]] (بعد ما تتربط بالـ video، [[sourceopen]]) ← [[ended]] (بعد [[endOfStream()]]).
- **[[appendBuffer]] async:** الـ [[SourceBuffer]] بيبقى [[updating]] لحد [[updateend]]، وأي append في النص ده بيرمي. المكتبات بتعمل طابور (queue).
- **الفجوة [[0.39-0.73]]**: قسمنا الملف في نص الـ bytes، والنص ده كان في وسط «cluster» (حتة WebM)، فالحتة دي ضاعت. في الشغل الحقيقي الحتت بيقطعها packager على حدود صح (segments)، ومحدش بيقسم bytes بإيده.
- **[[MediaSource.isTypeSupported]]** على صيغ الحتت: [[video/webm; codecs="vp9, opus"]] و MP4 و [[video/mp2t]] (HLS القديم) [[true]]، و [[application/vnd.apple.mpegurl]] [[false]] (القايمة مش صيغة حتت).
- **HLS و DASH:** قايمة ([[.m3u8]] أو [[.mpd]]) بتوصف الحتت بكذا جودة، والمكتبة (hls.js أو dash.js أو Shaka) بتقرا القايمة وتقيس النت وتختار وتعمل [[appendBuffer]]. انت بتكتب ٣ سطور مكتبة، ودي الحاجة اللي MSE بيخليها ممكنة. التمرين الأخير بيشرحها.
- [[MediaSource.canConstructInDedicatedWorker]] = [[true]] في Chrome 157: المكتبات بتقدر تشتغل في Worker (درس «Web Workers»). و [[ManagedMediaSource]] (Safari على iPhone) [[undefined]] هنا.

---

## الخلاصة

- context واحد للصفحة، يتعمل أو يتعمله [[resume()]] جوه ضغطة.
- مصدر ← gain ← destination، و [[connect]] بيتسلسل. والمصادر one-shot: oscillator جديد لكل نغمة.
- الـ envelope بـ [[AudioParam]] و [[ctx.currentTime]]، و exponential لـ [[0.001]] مش صفر.
- [[AnalyserNode]] = الموجة والترددات كأرقام، والدقة [[sampleRate / fftSize]].
- [[OfflineAudioContext]] بيحسب الصوت من غير سماعات: للاختبار وللتصدير WAV.
- MSE = JavaScript بيغذّي [[<video>]] بـ [[appendBuffer]] بعد [[updateend]]، و HLS و DASH من مكتبة فوقه.`,
          lines: [
            R`الـ context: المكان اللي كل الـ nodes عايشين فيه. جوه ضغطة عشان يبدأ [[running]] مش [[suspended]].`,
            R`مصدر بيولّد موجة. لسه مبيطلعش صوت لحد [[start]].`,
            R`node للعلو: هنستخدمه للـ fade in والـ fade out.`,
            R`[[sine]] أنعم موجة. التانيين [[square]] و [[sawtooth]] و [[triangle]].`,
            R`440 Hz = نوتة A. ده [[AudioParam]] فينفع نتحكم فيه بالوقت كمان.`,
            R`السلسلة: oscillator ← gain ← السماعة. [[connect]] بيرجّع الـ gain فبنكمّل عليه.`,
            R`نحفظ «دلوقتي» بساعة الصوت، وكل المواعيد هتتحسب منها.`,
            R`العلو صفر عند البداية بالظبط، عشان منسمعش «تكة».`,
            R`نطلع لـ 0.3 في 10 ms: الـ attack.`,
            R`ننزل بمنحنى أُسّي لـ 0.001 (مش مسموع) عند 300 ms. صفر هنا كان هيرمي [[RangeError]].`,
            R`نشغّل الموجة في نفس اللحظة اللي الـ envelope بدأ فيها.`,
            R`ونوقفها مع آخر الـ envelope. بعدها الـ oscillator ده خلص ومينفعش يشتغل تاني.`,
            R`[[onended]] بيتبعت لما [[stop]] يحصل فعلًا، وبيطبع [[running]] لأن الـ context لسه شغال لأي صوت جاي.`,
          ],
          ref: [
            { t: "MDN: Web Audio API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API" },
            { t: "MDN: Using the Web Audio API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API" },
            { t: "MDN: Web Audio API best practices", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices" },
            { t: "MDN: Visualizations with Web Audio API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API" },
            { t: "MDN: OscillatorNode", url: "https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode" },
            { t: "MDN: GainNode", url: "https://developer.mozilla.org/en-US/docs/Web/API/GainNode" },
            { t: "MDN: AudioParam", url: "https://developer.mozilla.org/en-US/docs/Web/API/AudioParam" },
            { t: "MDN: AnalyserNode", url: "https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode" },
            { t: "MDN: AudioContext.resume()", url: "https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/resume" },
            { t: "MDN: OfflineAudioContext", url: "https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext" },
            { t: "MDN: BaseAudioContext.decodeAudioData()", url: "https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/decodeAudioData" },
            { t: "MDN: Media Source Extensions API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API" },
            { t: "MDN: Streaming audio and video", url: "https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Streaming" },
          ],
          pre: [{ to: "js/HTMLMediaElement: play و pause و currentTime والصيغ", why: R`سياسة الـ autoplay نفسها بتنطبق على [[AudioContext]]` }, { to: "js/DataView: getUint16 و setFloat32 و endianness", why: R`كتابة ملف WAV من العينات` }, { to: "js/ArrayBuffer: resize و transfer و detached", why: R`[[decodeAudioData]] بينقل الـ buffer` }],
        },
        // @@NEXT@@
      ],
    }
]);
