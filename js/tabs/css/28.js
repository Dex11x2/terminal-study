// HTML: الصوت والفيديو والـ embed (وحدة من منهج syllabus/css.json). بتكمّل وحدة «الصور والفيديو و SVG» (08.js).
// كل القياسات والمعاينات من Chrome 157 headless على Windows 11، على صفحات من سيرفر Node محلي على بورتين (127.0.0.1:8731 و 8732 كـ origin تاني) بيكتب كل طلب وصله.
// ملفات الميديا اتعملت بـ ffmpeg (نغمة MP3 و Ogg، وفيديو WebM و MP4)، وملف WAV و PDF اتكتبوا بـ Node. سياسة الـ autoplay اتقاست بالإعداد الافتراضي (والـ headless طلع زي العادي).
// المتصفحات التانية، ونطق قارئ الشاشة، و iPhone (playsinline)، وأنواع التراخيص: من MDN و WHATWG و Creative Commons، ومكتوب جنب كل واحدة.
// المعاينات الحية مبتقراش ملفات، فالصوت والفيديو والـ VTT والصور فيها data: URIs قصيرة (WAV 0.2 ثانية، و WebM 4 ثواني 160×90).
MORE("css", [
    {
      t: "HTML: الصوت والفيديو والـ embed",
      l: 1,
      n: "مشغّل صوت بأكتر من صيغة، وكابشن وترجمة للفيديو، و iframe مقفول عليه، و PDF جوه الصفحة، وصورة فيها لينكات، و canvas و template، ومعنى replaced element، وتراخيص الميديا",
      pre: [
        { to: "css/img", why: R`[[alt]] و [[width]] و [[height]] و [[loading]] اتشرحوا هناك، والوحدة دي بتبني عليهم في الفيديو والـ iframe والـ image map` },
        { to: "css/video و iframe", why: R`الوحدة دي تكملته: هناك اتبنى فيديو بـ [[controls]] وأول ملف VTT و iframe بـ [[title]]، وهنا الصوت، وأنواع الـ track، و [[sandbox]] و [[allow]]، وباقي عناصر التضمين` }
      ],
      goal: [
        R`تحط ملف صوت بمشغّل ظاهر وأكتر من صيغة ولينك تحميل، وتعرف ليه [[autoplay]] مبيشتغلش وإمتى [[muted]] بينفع.`,
        R`تكتب ملف WebVTT وتربطه بـ [[<track>]] بالنوع واللغة والاسم الصح، وتفرّق بين الكابشن والترجمة والنص المكتوب، وتحجز مكان الفيديو بـ [[poster]] و [[width]] و [[height]].`,
        R`تضمّن صفحة من موقع تاني في [[<iframe>]] وتقفل عليها بـ [[sandbox]] وتدّيها بـ [[allow]] اللي محتاجاه بس، وتقرا رسايل المنع في الـ Console.`,
        R`تعرض PDF بـ [[<object>]] ببديل ولينك، وتعرف ليه [[<img>]] و [[<iframe>]] أحسن من [[<object>]] و [[<embed>]] في الباقي.`,
        R`تعمل image map بـ [[<map>]] و [[<area>]]، وتعرف إمتى يبوظ، وتحوّله SVG بلينكات.`,
        R`تعرف [[<canvas>]] و [[<noscript>]] و [[<template>]] و [[<slot>]] بيعملوا إيه من غير JavaScript، وإيه اللي مستني كورس JavaScript.`,
        R`تشرح يعني إيه replaced element، وتختار بين [[loading]] و [[decoding]] و [[fetchpriority]]، وتقرا رخصة أي ملف ميديا وتكتب نسبته.`
      ],
      projects: [
        { lvl: 'صغير', dir: "mahatta", t: R`صفحة الحلقة الأولى: مشغّل ولينك تحميل`, what: R`أول صفحة في موقع «بودكاست المحطة» (بودكاست متخيل عن تعلّم الويب، بيقدّمه منى وكريم)، للي عايز يسمع الحلقة. [[index.html]] فيها: اسم البودكاست في [[<header>]]، وعنوان الحلقة [[<h1>]] «الحلقة ١: يعني إيه صوت في الصفحة»، وفقرة وصف، ومشغّل [[<audio>]] ظاهر لملف [[media/ep1.mp3]] (بـ [[<source>]] ونوعه، و [[preload="metadata"]]، واسم بـ [[aria-label]]، ومن غير [[autoplay]])، ولينك تحميل برّه المشغّل مكتوب فيه النوع، وقايمة «في الحلقة دي» من تلات نقط. ملف الصوت: سجّل ٣٠ ثانية بموبايلك وحوّلها MP3، أو أي MP3 عندك، وحطه في فولدر [[media]]. من درس «audio و source».`, done: R`الصفحة بتفتح والمشغّل واقف (مفيش صوت لوحده) والمدة مكتوبة عليه. ولما تدوس ▶ الصوت بيشتغل. ولينك التحميل بينزّل الملف. وفي الـ Console: [[document.querySelector("audio").currentSrc]] آخره [[ep1.mp3]].`, sol: R`فولدر [[media]] وملف الصوت الأول. لو معندكش تسجيل، ده أمر بيعمل نغمة تجربة ٣ ثواني (محتاج ffmpeg):

~~~bash
mkdir media
ffmpeg -f lavfi -i "sine=frequency=440:duration=3" -c:a libmp3lame -b:a 32k media/ep1.mp3
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الحلقة ١: يعني إيه صوت في الصفحة | بودكاست المحطة</title>
</head>
<body>
<header>
  <p><strong>بودكاست المحطة</strong></p>
</header>
<main>
  <h1>الحلقة ١: يعني إيه صوت في الصفحة</h1>
  <p>منى وكريم بيحطوا أول ملف صوت في صفحة، وبيشرحوا ليه المتصفح بيرفض يشغّله لوحده.</p>
  <audio controls preload="metadata" aria-label="الحلقة ١: يعني إيه صوت في الصفحة">
    <source src="media/ep1.mp3" type="audio/mpeg">
  </audio>
  <p><a href="media/ep1.mp3" download>نزّل الحلقة ١ (MP3)</a></p>
  <h2>في الحلقة دي</h2>
  <ul>
    <li>مشغّل الصوت بيظهر إمتى</li>
    <li>أكتر من صيغة لنفس الملف</li>
    <li>ليه التشغيل التلقائي ممنوع</li>
  </ul>
</main>
</body>
</html>
~~~

~~~view 384 438 شكل index.html (الصوت هنا صفارة قصيرة مكتوبة جوه الصفحة)
<header>
  <p><strong>بودكاست المحطة</strong></p>
</header>
<main>
  <h1>الحلقة ١: يعني إيه صوت في الصفحة</h1>
  <p>منى وكريم بيحطوا أول ملف صوت في صفحة، وبيشرحوا ليه المتصفح بيرفض يشغّله لوحده.</p>
  <audio controls preload="metadata" aria-label="الحلقة ١: يعني إيه صوت في الصفحة">
    <source src="data:audio/wav;base64,UklGRnwCAABXQVZFZm10IBAAAAABAAEAuAsAALgLAAABAAgAZGF0YVgCAABgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKA=" type="audio/wav">
  </audio>
  <p><a href="#">نزّل الحلقة ١ (MP3)</a></p>
  <h2>في الحلقة دي</h2>
  <ul>
    <li>مشغّل الصوت بيظهر إمتى</li>
    <li>أكتر من صيغة لنفس الملف</li>
    <li>ليه التشغيل التلقائي ممنوع</li>
  </ul>
</main>
~~~

**هتشوف إيه:**

- اسم البودكاست، والعنوان، والوصف، وتحتهم المشغّل واقف، وبعده لينك التحميل والقايمة.
- مفيش أي صوت لحد ما تدوس ▶.

**ليه كده:**

- [[<source>]] ومعاه [[type]] بدل [[src]] على [[<audio>]]: لما تزوّد صيغة تانية (Ogg) هتبقى سطر فوقه وخلاص.
- [[preload="metadata"]]: المدة بتبان من غير ما الملف كله يتحمّل.
- لينك التحميل برّه [[<audio>]]: جواه كان هيبقى نص بديل مبيظهرش.

**الغلطة الشائعة:** تنسى [[controls]]، فتفتح الصفحة وتلاقي مكان المشغّل فاضي وتفتكر إن المسار غلط.

~~~text القياس من Chrome (الملف اللي اتعمل بالأمر اللي فوق، من سيرفر محلي)
currentSrc = .../media/ep1.mp3      paused = true      duration = 3      الحجم 300 × 54
Audio «الحلقة ١: يعني إيه صوت في الصفحة»
~~~` },
        { lvl: 'صغير', dir: "mahatta", cont: true, t: R`النص المكتوب، والكلام بيظهر مع الصوت`, what: R`زي المشروع اللي فات (نفس [[index.html]])، وزوّد عليه حاجتين عشان الحلقة توصل للي مش سامع. **النص المكتوب:** قسم [[<h2>]] «نص الحلقة» تحته أربع فقرات، كل واحدة بتبدأ باسم اللي بيتكلم تقيل، وواحدة منهم وصف صوت بين قوسين. **الكابشن:** ملف [[media/ep1.ar.vtt]] فيه نفس الأربع جمل بتوقيتهم (واسم المتكلم بـ [[<v>]])، وبدّل [[<audio>]] بـ [[<video>]] بيشغّل نفس ملف الصوت، عليه [[poster]] هو غلاف الحلقة [[media/cover.svg]] و [[width]] و [[height]]، وجواه [[<track>]] كابشن عربي شغال من الأول. من درس «track و WebVTT» (قسم ٢ و ٣ و ٥)، والـ [[<audio>]] من المشروع اللي فات.`, done: R`الصفحة مفتوحة من سيرفر ([[npx serve .]]). الغلاف ظاهر مكان المشغّل، ولما تدوس ▶ الصوت بيشتغل والجمل بتظهر فوق الغلاف في وقتها. وفي الـ Console: [[document.querySelector("video").textTracks[0].cues.length]] بيرجّع [[4]]. والنص المكتوب مقري تحت المشغّل من غير تشغيل.`, sol: R`~~~text media/ep1.ar.vtt
WEBVTT

00:00.000 --> 00:02.000
<v منى>أهلًا بيكم في المحطة.

00:02.000 --> 00:04.000
[موسيقى المقدمة]

00:04.000 --> 00:06.000
<v كريم>النهارده هنحط صوت في صفحة.

00:06.000 --> 00:08.000
<v منى>ومن غير ما يشتغل لوحده.
~~~

~~~xml media/cover.svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360">
  <rect width="640" height="360" fill="#0f766e"/>
  <text x="320" y="170" font-size="48" fill="white" text-anchor="middle">بودكاست المحطة</text>
  <text x="320" y="230" font-size="28" fill="white" text-anchor="middle">الحلقة ١</text>
</svg>
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الحلقة ١: يعني إيه صوت في الصفحة | بودكاست المحطة</title>
</head>
<body>
<header>
  <p><strong>بودكاست المحطة</strong></p>
</header>
<main>
  <h1>الحلقة ١: يعني إيه صوت في الصفحة</h1>
  <p>منى وكريم بيحطوا أول ملف صوت في صفحة، وبيشرحوا ليه المتصفح بيرفض يشغّله لوحده.</p>
  <video controls preload="metadata" width="640" height="360" poster="media/cover.svg" aria-label="الحلقة ١: يعني إيه صوت في الصفحة">
    <source src="media/ep1.mp3" type="audio/mpeg">
    <track default kind="captions" srclang="ar" label="عربي" src="media/ep1.ar.vtt">
  </video>
  <p><a href="media/ep1.mp3" download>نزّل الحلقة ١ (MP3)</a></p>
  <h2>في الحلقة دي</h2>
  <ul>
    <li>مشغّل الصوت بيظهر إمتى</li>
    <li>أكتر من صيغة لنفس الملف</li>
    <li>ليه التشغيل التلقائي ممنوع</li>
  </ul>
  <h2>نص الحلقة</h2>
  <p><strong>منى:</strong> أهلًا بيكم في المحطة.</p>
  <p>[موسيقى المقدمة]</p>
  <p><strong>كريم:</strong> النهارده هنحط صوت في صفحة.</p>
  <p><strong>منى:</strong> ومن غير ما يشتغل لوحده.</p>
</main>
</body>
</html>
~~~

~~~view 576 630 شكل index.html (دوس ▶: الصوت هنا صفارة، والكابشن بيظهر فوق الغلاف)
<header>
  <p><strong>بودكاست المحطة</strong></p>
</header>
<main>
  <h1>الحلقة ١: يعني إيه صوت في الصفحة</h1>
  <p>منى وكريم بيحطوا أول ملف صوت في صفحة، وبيشرحوا ليه المتصفح بيرفض يشغّله لوحده.</p>
  <video controls preload="metadata" width="320" height="180" poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'%3E%3Crect width='320' height='180' fill='%230f766e'/%3E%3Ctext x='160' y='100' font-size='30' fill='white' text-anchor='middle'%3Eالحلقة ١%3C/text%3E%3C/svg%3E" aria-label="الحلقة ١: يعني إيه صوت في الصفحة" src="data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAKjEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHWTbuMU6uEElTDZ1OsggEyTbuMU6uEHFO7a1OsggKN7AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmsCrXsYMPQkBNgIxMYXZmNjMuMS4xMDJXQYxMYXZmNjMuMS4xMDJEiYhAr0AAAAAAABZUrmvXrgEAAAAAAABO14EBc8WImSL+3MoIdEScgQAitZyDdW5kiIEAhoVWX1ZQOYOBASPjg4QdzWUA4JCwgaC6gVqagQJVsIRVuYEBVe6BAOwBAAAAAAAAAgAAElTDZ/5zc59jwIBnyJlFo4dFTkNPREVSRIeMTGF2ZjYzLjEuMTAyc3PZY8CLY8WImSL+3MoIdERnyKRFo4dFTkNPREVSRIeXTGF2YzYzLjEuMTAyIGxpYnZweC12cDlnyKFFo4hEVVJBVElPTkSHkzAwOjAwOjA0LjAwMDAwMDAwMAAfQ7Z1QNLngQCjrIEAAICCSYNCAAnwBZYAOCQcGU4AADBgAAATv/QgAAI/+zz///46VuMndD5Ao5WBAfQAhgBAkhwAXgAAAyAAAFn5huCjlYED6ACGAECSHABdAAADIAAAWfmG4KOVgQXcAIYAQJIcAF4AAAMgAABZ+Ybgo5WBB9AAhgBAkhwAW8AAAyAAAFn5huCjlYEJxACGAECSHABeAAADIAAAWfmG4KOVgQu4AIYAQJIcAF0AAAMgAABZ+Ybgo5WBDawAhgBAkhwAXgAAAyAAAFn5huAcU7trkbuPs4EAt4r3gQHxggG18IED">
    <track default kind="captions" srclang="ar" label="عربي" src="data:text/vtt,WEBVTT%0A%0A00:00.000 --> 00:02.000%0Aأهلًا بيكم في المحطة%0A%0A00:02.000 --> 00:04.000%0A[موسيقى هادية]">
  </video>
  <p><a href="#">نزّل الحلقة ١ (MP3)</a></p>
  <h2>نص الحلقة</h2>
  <p><strong>منى:</strong> أهلًا بيكم في المحطة.</p>
  <p>[موسيقى المقدمة]</p>
  <p><strong>كريم:</strong> النهارده هنحط صوت في صفحة.</p>
  <p><strong>منى:</strong> ومن غير ما يشتغل لوحده.</p>
</main>
~~~

**هتشوف إيه:**

- مكان الشريط الرمادي بقى مستطيل أخضر عليه اسم البودكاست ورقم الحلقة، وعليه أزرار المشغّل.
- دوس ▶: الصوت بيشتغل، والغلاف بيفضل ظاهر (الملف مفيهوش صورة)، والجمل بتتبدّل في أسفله.
- تحت: النص كله مكتوب، وده اللي بيتقري من غير تشغيل وبيتدوّر فيه.

**ليه [[<video>]] لملف صوت:** [[<audio>]] مبيرسمش الكابشن (درس «audio و source» قسم ٨). [[<video>]] بيشغّل ملف الصوت عادي، وبيدّي مساحة يترسم عليها الـ [[poster]] والكابشن.

**ليه الاتنين (الكابشن والنص):** الكابشن ماشي مع الصوت. والنص المكتوب بيتقري ويتنسخ ويتدوّر فيه، ومحرك البحث بيقراه.

**ليه [[npx serve .]]:** لو فتحت الملف بدبل كليك ([[file://]])، ملف الـ VTT بيترفض والكابشن مبيظهرش.

**الغلطة الشائعة:** الوقت في الـ VTT أطول من الملف. الجمل اللي توقيتها بعد آخر الصوت عمرها ما هتظهر، ومفيش رسالة.

~~~text القياس من Chrome (من سيرفر محلي، وملف الصوت 3 ثواني)
video.currentSrc = .../media/ep1.mp3      videoWidth = 0      الحجم 640 × 360 (من width و height)
textTracks[0]:  kind = captions   mode = showing   cues = 4
من file:// :    cues = 0    track.readyState = 3 (ERROR)
~~~` },
        { lvl: 'متوسط', dir: "mahatta", cont: true, t: R`صفحة «شاهد الدرس»: فيديو بكابشن وترجمة وفصول`, what: R`زي المشروع اللي فات (نفس الفولدر ونفس [[media]])، وزوّد صفحة تانية [[watch.html]] للي عايز يتفرّج على شرح الحلقة. فيها: نفس الـ [[<header>]]، و [[<nav>]] فيه لينكين («الحلقة» لـ [[index.html]] و «شاهد الدرس» لـ [[watch.html]])، وعنوان [[<h1>]]، وفيديو [[media/lesson1.mp4]] بـ [[controls]] و [[preload="metadata"]] و [[width]] و [[height]] و [[poster]] (نفس [[media/cover.svg]])، وجواه [[<source>]] بنوعه، وكابشن عربي [[default]] (نفس [[media/ep1.ar.vtt]] بتاع المشروع اللي فات)، وترجمة إنجليزي [[media/lesson1.en.vtt]] ملف جديد، ونص بديل فيه لينك. وتحت الفيديو قايمة مرقّمة «فصول الدرس» بتوقيت كل فصل في [[<time>]]. وزوّد نفس الـ [[<nav>]] في [[index.html]]. الفيديو: صوّر ١٠ ثواني بموبايلك، أو استخدم الأمر اللي في الحل. من درس «track و WebVTT»، و [[<time>]] من درس «abbr و dfn و time».`, done: R`من السيرفر: [[watch.html]] بتفتح والغلاف ظاهر بمقاس الفيديو قبل ما يشتغل (مفيش قفزة). دوس ▶: الكابشن العربي ظاهر، ومن زرار CC تقدر تبدّل لـ English. وفي الـ Console: [[textTracks.length]] بيرجّع [[2]]، والأول [[showing]] والتاني [[disabled]]. واللينكين في الـ [[<nav>]] بيودّوا بين الصفحتين.`, sol: R`فيديو تجربة ٨ ثواني بصوت (لو معندكش فيديو):

~~~bash
ffmpeg -f lavfi -i "testsrc2=size=640x360:rate=24" -f lavfi -i "sine=frequency=330" -t 8 -c:v libx264 -pix_fmt yuv420p -c:a aac -movflags +faststart media/lesson1.mp4
~~~

~~~text media/lesson1.en.vtt
WEBVTT

00:00.000 --> 00:02.000
Welcome to El-Mahatta.

00:02.000 --> 00:04.000
[intro music]

00:04.000 --> 00:06.000
Today we put a sound on a page.

00:06.000 --> 00:08.000
And it will not play by itself.
~~~

~~~html watch.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>شاهد الدرس ١ | بودكاست المحطة</title>
</head>
<body>
<header>
  <p><strong>بودكاست المحطة</strong></p>
  <nav aria-label="صفحات الحلقة">
    <a href="index.html">الحلقة</a> |
    <a href="watch.html" aria-current="page">شاهد الدرس</a>
  </nav>
</header>
<main>
  <h1>شاهد الدرس ١: صوت في الصفحة</h1>
  <video controls preload="metadata" width="640" height="360" poster="media/cover.svg">
    <source src="media/lesson1.mp4" type="video/mp4">
    <track default kind="captions" srclang="ar" label="عربي" src="media/ep1.ar.vtt">
    <track kind="subtitles" srclang="en" label="English" src="media/lesson1.en.vtt">
    <p>متصفحك مش بيشغّل الفيديو. <a href="media/lesson1.mp4">نزّل الدرس (MP4)</a></p>
  </video>
  <h2>فصول الدرس</h2>
  <ol>
    <li><time datetime="PT0S">0:00</time> المقدمة</li>
    <li><time datetime="PT4S">0:04</time> أول ملف صوت</li>
    <li><time datetime="PT6S">0:06</time> ليه مبيشتغلش لوحده</li>
  </ol>
</main>
</body>
</html>
~~~

وفي [[index.html]] زوّد نفس الـ [[<nav>]] جوه [[<header>]] (و [[aria-current="page"]] على لينك «الحلقة» هناك):

~~~html
<nav aria-label="صفحات الحلقة">
  <a href="index.html" aria-current="page">الحلقة</a> |
  <a href="watch.html">شاهد الدرس</a>
</nav>
~~~

~~~view 476 شكل watch.html (دوس ▶ وجرّب زرار CC)
<header>
  <p><strong>بودكاست المحطة</strong></p>
  <nav aria-label="صفحات الحلقة">
    <a href="#">الحلقة</a> |
    <a href="#" aria-current="page">شاهد الدرس</a>
  </nav>
</header>
<main>
  <h1>شاهد الدرس ١: صوت في الصفحة</h1>
  <video controls preload="metadata" width="320" height="180" poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'%3E%3Crect width='320' height='180' fill='%230f766e'/%3E%3Ctext x='160' y='100' font-size='30' fill='white' text-anchor='middle'%3Eالحلقة ١%3C/text%3E%3C/svg%3E" src="data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAKjEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHWTbuMU6uEElTDZ1OsggEyTbuMU6uEHFO7a1OsggKN7AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmsCrXsYMPQkBNgIxMYXZmNjMuMS4xMDJXQYxMYXZmNjMuMS4xMDJEiYhAr0AAAAAAABZUrmvXrgEAAAAAAABO14EBc8WImSL+3MoIdEScgQAitZyDdW5kiIEAhoVWX1ZQOYOBASPjg4QdzWUA4JCwgaC6gVqagQJVsIRVuYEBVe6BAOwBAAAAAAAAAgAAElTDZ/5zc59jwIBnyJlFo4dFTkNPREVSRIeMTGF2ZjYzLjEuMTAyc3PZY8CLY8WImSL+3MoIdERnyKRFo4dFTkNPREVSRIeXTGF2YzYzLjEuMTAyIGxpYnZweC12cDlnyKFFo4hEVVJBVElPTkSHkzAwOjAwOjA0LjAwMDAwMDAwMAAfQ7Z1QNLngQCjrIEAAICCSYNCAAnwBZYAOCQcGU4AADBgAAATv/QgAAI/+zz///46VuMndD5Ao5WBAfQAhgBAkhwAXgAAAyAAAFn5huCjlYED6ACGAECSHABdAAADIAAAWfmG4KOVgQXcAIYAQJIcAF4AAAMgAABZ+Ybgo5WBB9AAhgBAkhwAW8AAAyAAAFn5huCjlYEJxACGAECSHABeAAADIAAAWfmG4KOVgQu4AIYAQJIcAF0AAAMgAABZ+Ybgo5WBDawAhgBAkhwAXgAAAyAAAFn5huAcU7trkbuPs4EAt4r3gQHxggG18IED">
    <track default kind="captions" srclang="ar" label="عربي" src="data:text/vtt,WEBVTT%0A%0A00:00.000 --> 00:02.000%0Aأهلًا بيكم في المحطة%0A%0A00:02.000 --> 00:04.000%0A[موسيقى هادية]">
    <track kind="subtitles" srclang="en" label="English" src="data:text/vtt,WEBVTT%0A%0A00:00.000 --> 00:02.000%0AWelcome to El-Mahatta%0A%0A00:02.000 --> 00:04.000%0A[soft music]">
  </video>
  <h2>فصول الدرس</h2>
  <ol>
    <li><time datetime="PT0S">0:00</time> المقدمة</li>
    <li><time datetime="PT4S">0:04</time> أول ملف صوت</li>
    <li><time datetime="PT6S">0:06</time> ليه مبيشتغلش لوحده</li>
  </ol>
</main>
~~~

**هتشوف إيه:**

- الغلاف الأخضر بمقاس الفيديو، ولما تدوس ▶ الفيديو بيبدأ والكابشن العربي تحته.
- زرار CC فيه «عربي» و «English».
- تحت الفيديو الفصول مكتوبة بوقتها.

**ليه كده:**

- نفس ملف الكابشن بتاع الحلقة اتستخدم تاني: ملف الـ VTT منفصل عن الفيديو، فبيخدم الصوت والفيديو.
- [[width]] و [[height]] بنفس نسبة الفيديو (16:9)، فالصفحة مبتتهزّش لما المعلومات توصل.
- الفصول قايمة HTML عادية: [[kind="chapters"]] مبيترسمش في Chrome (درس «track و WebVTT» قسم ٢)، فالقايمة هي اللي الزائر بيشوفها. و [[datetime="PT4S"]] مدة بصيغة بيقراها البرامج: ٤ ثواني.
- [[aria-current="page"]] بيقول لقارئ الشاشة «انت في الصفحة دي».

**الغلطة الشائعة:** [[label="إنجليزي"]] على الترجمة. اللي محتاجها بيقرا إنجليزي: اكتب [[English]].

~~~text القياس من Chrome (من سيرفر محلي، بالفيديو اللي اتعمل بالأمر اللي فوق)
قبل التشغيل:   الحجم 640 × 360      videoWidth × videoHeight = 640 × 360      duration = 8
textTracks.length = 2
[0] captions   ar   mode = showing    cues = 4
[1] subtitles  en   mode = disabled   cues = null      (ملفه متطلبش من السيرفر)
~~~` },
        { lvl: 'متوسط', dir: "mahatta", cont: true, t: R`صفحة «إضافات الحلقة»: iframe مقفول عليه، وملخص PDF`, what: R`زي المشروع اللي فات، وزوّد صفحة تالتة [[extras.html]] ولينكها في الـ [[<nav>]] بتاع التلات صفحات. فيها حاجتين. **بطاقة الحلقة في iframe:** صفحة صغيرة [[card.html]] (فيها اسم الحلقة وزرار «👏 صفّق» بيعدّ الضغطات بسطر [[onclick]])، ومعروضة في [[extras.html]] جوه [[<iframe>]] ليه [[title]] ومقاس و [[loading="lazy"]] و [[sandbox]] بيسمح بالسكربتات بس. دي نفس طريقة تضمين أي مشغّل أو خريطة من مزوّد، والبطاقة هنا واقفة مكان المزوّد. وتحتها iframe تاني بـ [[srcdoc]] فيه تعليق مستمع، و [[sandbox]] فاضي. **الملخص PDF:** [[<object>]] لملف [[media/ep1-notes.pdf]] بنوعه ومقاسه و [[title]]، وجواه بديل بلينك، وتحته لينك تحميل. الـ PDF: افتح [[index.html]] في Chrome ودوس [[Ctrl+P]] واختار «Save as PDF» واحفظه بالاسم ده. من دروس «iframe sandbox و allow» و «object و embed».`, done: R`زرار التصفيق جوه البطاقة بيعدّ. ولو شلت [[allow-scripts]] مؤقتًا، بيبطّل والـ Console فيه رسالة «Blocked script execution». والتعليق ظاهر في صندوقه. والـ PDF معروض جوه الصفحة، ولو غيّرت اسمه في [[data]] لاسم غلط بيظهر البديل بلينكه.`, sol: R`~~~html card.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>بطاقة الحلقة ١</title>
</head>
<body>
<p><strong>الحلقة ١: يعني إيه صوت في الصفحة</strong></p>
<p><button type="button" onclick="n.textContent++">👏 صفّق</button> <b id="n">0</b></p>
</body>
</html>
~~~

~~~html extras.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>إضافات الحلقة ١ | بودكاست المحطة</title>
</head>
<body>
<header>
  <p><strong>بودكاست المحطة</strong></p>
  <nav aria-label="صفحات الحلقة">
    <a href="index.html">الحلقة</a> |
    <a href="watch.html">شاهد الدرس</a> |
    <a href="extras.html" aria-current="page">إضافات</a>
  </nav>
</header>
<main>
  <h1>إضافات الحلقة ١</h1>
  <h2>بطاقة الحلقة</h2>
  <iframe src="card.html" title="بطاقة الحلقة ١ وعدّاد التصفيق" width="320" height="110"
          loading="lazy" sandbox="allow-scripts"></iframe>
  <h2>تعليق من مستمع</h2>
  <iframe sandbox title="تعليق من مستمع على الحلقة ١" width="320" height="70"
          srcdoc="<p>حلقة جميلة، كمّلوا!</p>"></iframe>
  <h2>ملخص الحلقة</h2>
  <object data="media/ep1-notes.pdf" type="application/pdf" width="320" height="400" title="ملخص الحلقة ١ (PDF)">
    <p>المتصفح مش عارض الملف هنا. <a href="media/ep1-notes.pdf">افتح ملخص الحلقة ١ (PDF)</a></p>
  </object>
  <p><a href="media/ep1-notes.pdf" download>نزّل ملخص الحلقة ١ (PDF)</a></p>
</main>
</body>
</html>
~~~

وزوّد لينك «إضافات» في الـ [[<nav>]] بتاع [[index.html]] و [[watch.html]]:

~~~html
<a href="extras.html">إضافات</a>
~~~

~~~view 598 شكل extras.html (البطاقة هنا مكتوبة بـ srcdoc، والـ PDF مبيتعرضش في المعاينة فظاهر بديله)
<header>
  <p><strong>بودكاست المحطة</strong></p>
  <nav aria-label="صفحات الحلقة">
    <a href="#">الحلقة</a> |
    <a href="#">شاهد الدرس</a> |
    <a href="#" aria-current="page">إضافات</a>
  </nav>
</header>
<main>
  <h1>إضافات الحلقة ١</h1>
  <h2>بطاقة الحلقة</h2>
  <iframe title="بطاقة الحلقة ١ وعدّاد التصفيق" width="320" height="110" loading="lazy" sandbox="allow-scripts"
          srcdoc="<html dir=rtl><p><strong>الحلقة ١: يعني إيه صوت في الصفحة</strong></p><p><button type=button onclick='n.textContent++'>👏 صفّق</button> <b id=n>0</b></p>"></iframe>
  <h2>تعليق من مستمع</h2>
  <iframe sandbox title="تعليق من مستمع على الحلقة ١" width="320" height="70"
          srcdoc="<p>حلقة جميلة، كمّلوا!</p>"></iframe>
  <h2>ملخص الحلقة</h2>
  <object data="media/ep1-notes.pdf" type="application/pdf" width="320" height="400" title="ملخص الحلقة ١ (PDF)">
    <p>المتصفح مش عارض الملف هنا. <a href="#">افتح ملخص الحلقة ١ (PDF)</a></p>
  </object>
  <p><a href="#">نزّل ملخص الحلقة ١ (PDF)</a></p>
</main>
~~~

**هتشوف إيه:**

- صندوق فيه اسم الحلقة وزرار، والرقم بيزيد مع كل ضغطة.
- صندوق تاني فيه التعليق.
- في مشروعك: صندوق 320 × 400 فيه صفحة الـ PDF، وتحته لينك التحميل.

**ليه كده:**

- [[sandbox="allow-scripts"]] على البطاقة: العدّاد محتاج سكربت، ومش محتاج فورم ولا نوافذ ولا يقرا صفحتك. ومفيش [[allow-same-origin]]، لأن البطاقة من نفس موقعك والاتنين مع بعض بيلغوا القفل.
- التعليق كلام من زائر: [[sandbox]] فاضي، فلو كتب كود مش هيشتغل.
- البديل اللي جوه [[<object>]] بيظهر لما الـ PDF ميتعرضش، واللينك اللي برّه موجود دايمًا.

**لما تبدّل البطاقة بمزوّد حقيقي:** [[src]] يبقى عنوان التضمين بتاعه، وغالبًا هتحتاج تزوّد [[allow-same-origin]] (ساعتها آمن لأنه موقع تاني) و [[allow="fullscreen"]] لو فيديو.

**الغلطة الشائعة:** تحط [[sandbox]] على الـ [[<object>]]. مفيش: [[sandbox]] على [[<iframe>]] بس. وده سبب إن الصفحات بتتحط في iframe مش object.

~~~text القياس من Chrome (من سيرفر محلي)
البطاقة:      Iframe «بطاقة الحلقة ١ وعدّاد التصفيق»      بعد ضغطتين: الرقم 2
من غير allow-scripts، بعد ضغطة:
   Blocked script execution in 'http://127.0.0.1:8731/p4/card.html' because the document's frame is sandboxed and the 'allow-scripts' permission is not set.
الـ PDF:      الحجم 320 × 400      ارتفاع البديل = 0      PluginObject «ملخص الحلقة ١ (PDF)»
data غلط:     ارتفاع البديل = 18 (ظاهر)
~~~` },
        { lvl: 'كبير', dir: "mahatta", cont: true, t: R`موقع «المحطة» كامل: الحلقة، والدرس، والإضافات، والاستوديو، والمصادر`, what: R`موقع البودكاست كله، بيكمّل على اللي بنيته: [[index.html]] (المشغّل والكابشن والنص المكتوب من المشروعين الأول والتاني)، و [[watch.html]] (من التالت)، و [[extras.html]] و [[card.html]] (من الرابع). وزوّد صفحتين و ٣ تحسينات. **[[studio.html]]:** مسقط الاستوديو مرسوم SVG ([[viewBox]]) فيه تلات أشكال، كل شكل جوه [[<a>]] بـ [[aria-label]] بيودّي لقسم في نفس الصفحة ([[#rec]] و [[#mix]] و [[#wait]])، وتحته التلات أقسام، كل قسم [[<h2>]] بـ [[id]] وفقرة. **[[credits.html]]:** «مصادر الميديا»: قايمة بكل ملف مش من صنعك (صورة، وموسيقى، وأيقونة) بنسبته الكاملة: الاسم لينك للمصدر، وصاحبه، والرخصة لينك عليه [[rel="license"]]، والتعديل. **التحسينات:** (١) [[<nav>]] واحد بالخمس لينكات في كل الصفحات. (٢) في [[index.html]]: صورة للاستوديو تحت النص المكتوب، جوه [[<figure>]] بنسبتها، وعليها [[width]] و [[height]] و [[loading="lazy"]] و [[decoding="async"]]. (٣) في [[index.html]]: [[<noscript>]] بيقول إن عدّاد التصفيق في صفحة الإضافات محتاج JavaScript. من كل دروس الوحدة: «audio و source» و «track و WebVTT» و «iframe sandbox و allow» و «object و embed» و «map و area» (البديل الحديث) و «canvas و noscript و template» و «replaced elements والتراخيص».`, done: R`الخمس صفحات بيتنقّل بينهم من الـ [[<nav>]]. في [[studio.html]] كل شكل بيودّي لقسمه، ولما تصغّر النافذة لـ 360 الأشكال بتصغر ولينكاتها لسه في مكانها. في [[credits.html]] كل بند فيه اسم ومصدر ورخصة. وصورة الاستوديو في [[index.html]] مكانها محجوز، وفي الـ Console: [[document.querySelector("img").loading]] بيرجّع [[lazy]]. و validator.w3.org مبيطلّعش أخطاء في الخمس صفحات.`, ext: R`زوّد حلقة تانية ([[ep2.html]]) بنفس الهيكل، وخلّي [[index.html]] قايمة حلقات، كل حلقة مشغّلها [[preload="none"]]. وزوّد في [[studio.html]] نسخة image map من نفس المسقط ([[<img usemap>]] و [[<map>]] و [[<area>]]) وقارن الاتنين على عرض 360. وزوّد [[<canvas>]] في صفحة الإضافات بيرسم عمود لكل حلقة، ببديل نصي فيه الأرقام.`, sol: R`شجرة الملفات:

~~~text
mahatta/
├── index.html        الحلقة: المشغّل، والكابشن، والنص المكتوب، وصورة الاستوديو
├── watch.html        شاهد الدرس (من المشروع التالت، والـ nav بس اللي اتغيّر)
├── extras.html       الإضافات (من المشروع الرابع، والـ nav بس اللي اتغيّر)
├── card.html         البطاقة اللي جوه الـ iframe (زي ما هي)
├── studio.html       جديد: مسقط الاستوديو SVG بلينكات
├── credits.html      جديد: مصادر الميديا
└── media/
    ├── ep1.mp3   ep1.ar.vtt   cover.svg          (من المشروعين الأول والتاني)
    ├── lesson1.mp4   lesson1.en.vtt              (من التالت)
    ├── ep1-notes.pdf                             (من الرابع)
    └── studio.svg                                جديد: صورة الاستوديو
~~~

ترتيب البناء: الـ [[<nav>]] الجديد في الصفحات التلاتة الموجودة، وبعده [[studio.html]]، وبعده [[credits.html]]، وآخر حاجة الصورة والـ [[<noscript>]] في [[index.html]] (عشان نسبة الصورة بتشاور على صفحة المصادر).

الـ [[<nav>]] اللي في الخمس صفحات (و [[aria-current="page"]] بيتنقل للينك الصفحة اللي انت فيها):

~~~html
<nav aria-label="صفحات الموقع">
  <a href="index.html">الحلقة</a> |
  <a href="watch.html">شاهد الدرس</a> |
  <a href="extras.html">إضافات</a> |
  <a href="studio.html">الاستوديو</a> |
  <a href="credits.html">المصادر</a>
</nav>
~~~

~~~xml media/studio.svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360">
  <rect width="640" height="360" fill="#e2e8f0"/>
  <rect x="80" y="220" width="480" height="30" fill="#92400e"/>
  <circle cx="220" cy="150" r="46" fill="#334155"/>
  <circle cx="420" cy="150" r="46" fill="#334155"/>
  <rect x="212" y="196" width="16" height="24" fill="#334155"/>
  <rect x="412" y="196" width="16" height="24" fill="#334155"/>
</svg>
~~~

~~~html studio.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الاستوديو | بودكاست المحطة</title>
<style>
  svg { display: block; width: 100%; max-width: 600px; height: auto; }
  svg a:hover, svg a:focus-visible { opacity: 0.7; }
</style>
</head>
<body>
<header>
  <p><strong>بودكاست المحطة</strong></p>
  <nav aria-label="صفحات الموقع">
    <a href="index.html">الحلقة</a> |
    <a href="watch.html">شاهد الدرس</a> |
    <a href="extras.html">إضافات</a> |
    <a href="studio.html" aria-current="page">الاستوديو</a> |
    <a href="credits.html">المصادر</a>
  </nav>
</header>
<main>
  <h1>استوديو المحطة</h1>
  <p>دوس على أي غرفة في المسقط، أو اختار من القايمة اللي تحته.</p>
  <svg viewBox="0 0 300 150" role="group" aria-label="مسقط استوديو المحطة">
    <rect width="300" height="150" fill="#e2e8f0"/>
    <a href="#rec" aria-label="غرفة التسجيل"><rect x="10" y="10" width="130" height="130" fill="#0f766e"/></a>
    <a href="#mix" aria-label="غرفة المكساج"><circle cx="220" cy="50" r="40" fill="#b45309"/></a>
    <a href="#wait" aria-label="الاستقبال"><polygon points="160,140 220,100 280,140" fill="#1d4ed8"/></a>
  </svg>
  <ul>
    <li><a href="#rec">غرفة التسجيل</a> (المربع الأخضر)</li>
    <li><a href="#mix">غرفة المكساج</a> (الدايرة البرتقالي)</li>
    <li><a href="#wait">الاستقبال</a> (المثلث الأزرق)</li>
  </ul>
  <h2 id="rec">غرفة التسجيل</h2>
  <p>مايكين وترابيزة خشب، والحيطان مبطّنة عشان الصدى.</p>
  <h2 id="mix">غرفة المكساج</h2>
  <p>هنا الحلقة بتتقصّ وبيتزوّد عليها الموسيقى.</p>
  <h2 id="wait">الاستقبال</h2>
  <p>الضيوف بيستنوا هنا قبل التسجيل.</p>
</main>
</body>
</html>
~~~

~~~html credits.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مصادر الميديا | بودكاست المحطة</title>
</head>
<body>
<header>
  <p><strong>بودكاست المحطة</strong></p>
  <nav aria-label="صفحات الموقع">
    <a href="index.html">الحلقة</a> |
    <a href="watch.html">شاهد الدرس</a> |
    <a href="extras.html">إضافات</a> |
    <a href="studio.html">الاستوديو</a> |
    <a href="credits.html" aria-current="page">المصادر</a>
  </nav>
</header>
<main>
  <h1>مصادر الميديا</h1>
  <p>كل ملف في الموقع مش من صنعنا مكتوب هنا بصاحبه ورخصته.</p>
  <h2>الصور</h2>
  <ul>
    <li id="studio-photo">«<a href="https://photos.example.test/p/4821">استوديو صغير</a>» رسم سلمى فؤاد، رخصة <a href="https://creativecommons.org/licenses/by/4.0/" rel="license">CC BY 4.0</a>. اتغيّرت ألوانها.</li>
  </ul>
  <h2>الموسيقى</h2>
  <ul>
    <li>«<a href="https://music.example.test/t/307">صباح هادي</a>» تأليف نادر حلمي، رخصة <a href="https://creativecommons.org/licenses/by/4.0/" rel="license">CC BY 4.0</a>. اتقصّ منها أول ٥ ثواني لمقدمة الحلقة.</li>
  </ul>
  <h2>الأيقونات</h2>
  <ul>
    <li>أيقونة السماعة 🎧: من حروف النظام (emoji)، مش ملف.</li>
  </ul>
  <h2>من صنعنا</h2>
  <p>التسجيلات، والفيديو، وغلاف الحلقة، ومسقط الاستوديو، وملفات الكابشن: فريق المحطة.</p>
</main>
</body>
</html>
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الحلقة ١: يعني إيه صوت في الصفحة | بودكاست المحطة</title>
<style>
  img, video { max-width: 100%; height: auto; }
</style>
</head>
<body>
<header>
  <p><strong>بودكاست المحطة</strong></p>
  <nav aria-label="صفحات الموقع">
    <a href="index.html" aria-current="page">الحلقة</a> |
    <a href="watch.html">شاهد الدرس</a> |
    <a href="extras.html">إضافات</a> |
    <a href="studio.html">الاستوديو</a> |
    <a href="credits.html">المصادر</a>
  </nav>
</header>
<main>
  <h1>الحلقة ١: يعني إيه صوت في الصفحة</h1>
  <p>منى وكريم بيحطوا أول ملف صوت في صفحة، وبيشرحوا ليه المتصفح بيرفض يشغّله لوحده.</p>
  <video controls preload="metadata" width="640" height="360" poster="media/cover.svg" aria-label="الحلقة ١: يعني إيه صوت في الصفحة">
    <source src="media/ep1.mp3" type="audio/mpeg">
    <track default kind="captions" srclang="ar" label="عربي" src="media/ep1.ar.vtt">
  </video>
  <p><a href="media/ep1.mp3" download>نزّل الحلقة ١ (MP3)</a></p>
  <noscript><p>عدّاد التصفيق في صفحة «إضافات» محتاج JavaScript. باقي الموقع شغال من غيره.</p></noscript>
  <h2>في الحلقة دي</h2>
  <ul>
    <li>مشغّل الصوت بيظهر إمتى</li>
    <li>أكتر من صيغة لنفس الملف</li>
    <li>ليه التشغيل التلقائي ممنوع</li>
  </ul>
  <h2>نص الحلقة</h2>
  <p><strong>منى:</strong> أهلًا بيكم في المحطة.</p>
  <p>[موسيقى المقدمة]</p>
  <p><strong>كريم:</strong> النهارده هنحط صوت في صفحة.</p>
  <p><strong>منى:</strong> ومن غير ما يشتغل لوحده.</p>
  <figure>
    <img src="media/studio.svg" alt="رسم لاستوديو المحطة: مايكين على ترابيزة خشب" width="640" height="360" loading="lazy" decoding="async">
    <figcaption>«استوديو صغير» رسم سلمى فؤاد، <a href="https://creativecommons.org/licenses/by/4.0/" rel="license">CC BY 4.0</a>. <a href="credits.html#studio-photo">التفاصيل في صفحة المصادر</a>.</figcaption>
  </figure>
</main>
</body>
</html>
~~~

~~~view 828 714 شكل studio.html (صغّر العرض بزرار «موبايل»: اللينكات لسه في مكانها)
<style>
  svg { display: block; width: 100%; max-width: 600px; height: auto; }
  svg a:hover, svg a:focus-visible { opacity: 0.7; }
</style>
<header>
  <p><strong>بودكاست المحطة</strong></p>
  <nav aria-label="صفحات الموقع">
    <a href="#">الحلقة</a> | <a href="#">شاهد الدرس</a> | <a href="#">إضافات</a> | <a href="#" aria-current="page">الاستوديو</a> | <a href="#">المصادر</a>
  </nav>
</header>
<main>
  <h1>استوديو المحطة</h1>
  <p>دوس على أي غرفة في المسقط، أو اختار من القايمة اللي تحته.</p>
  <svg viewBox="0 0 300 150" role="group" aria-label="مسقط استوديو المحطة">
    <rect width="300" height="150" fill="#e2e8f0"/>
    <a href="#rec" aria-label="غرفة التسجيل"><rect x="10" y="10" width="130" height="130" fill="#0f766e"/></a>
    <a href="#mix" aria-label="غرفة المكساج"><circle cx="220" cy="50" r="40" fill="#b45309"/></a>
    <a href="#wait" aria-label="الاستقبال"><polygon points="160,140 220,100 280,140" fill="#1d4ed8"/></a>
  </svg>
  <ul>
    <li><a href="#rec">غرفة التسجيل</a> (المربع الأخضر)</li>
    <li><a href="#mix">غرفة المكساج</a> (الدايرة البرتقالي)</li>
    <li><a href="#wait">الاستقبال</a> (المثلث الأزرق)</li>
  </ul>
  <h2 id="rec">غرفة التسجيل</h2>
  <p>مايكين وترابيزة خشب، والحيطان مبطّنة عشان الصدى.</p>
  <h2 id="mix">غرفة المكساج</h2>
  <p>هنا الحلقة بتتقصّ وبيتزوّد عليها الموسيقى.</p>
  <h2 id="wait">الاستقبال</h2>
  <p>الضيوف بيستنوا هنا قبل التسجيل.</p>
</main>
~~~

~~~view 408 462 شكل credits.html
<header>
  <p><strong>بودكاست المحطة</strong></p>
</header>
<main>
  <h1>مصادر الميديا</h1>
  <p>كل ملف في الموقع مش من صنعنا مكتوب هنا بصاحبه ورخصته.</p>
  <h2>الصور</h2>
  <ul>
    <li>«<a href="#">استوديو صغير</a>» رسم سلمى فؤاد، رخصة <a href="#" rel="license">CC BY 4.0</a>. اتغيّرت ألوانها.</li>
  </ul>
  <h2>الموسيقى</h2>
  <ul>
    <li>«<a href="#">صباح هادي</a>» تأليف نادر حلمي، رخصة <a href="#" rel="license">CC BY 4.0</a>. اتقصّ منها أول ٥ ثواني لمقدمة الحلقة.</li>
  </ul>
  <h2>من صنعنا</h2>
  <p>التسجيلات، والفيديو، وغلاف الحلقة، ومسقط الاستوديو، وملفات الكابشن: فريق المحطة.</p>
</main>
~~~

**هتشوف إيه:**

- شريط تنقّل واحد في كل الصفحات، واللينك بتاع الصفحة الحالية هو اللي عليه [[aria-current]].
- [[studio.html]]: المسقط واخد عرض الصفحة (لحد 600)، وكل شكل بيبهت لما الماوس يعدّي عليه، وبيودّي لقسمه. وتحته نفس اللينكات قايمة.
- [[credits.html]]: كل بند سطر فيه لينكين.
- [[index.html]]: صورة الاستوديو تحت النص، وتحتها نسبتها.

**ليه التصميم ده:**

- المسقط SVG مش image map: الصفحة بتتصغّر على الموبايل، وإحداثيات [[<area>]] مبتتصغّرش (درس «map و area» قسم ٤). والقايمة اللي تحته للي مش هيدوس على رسم.
- النسبة في مكانين: مختصرة تحت الصورة، وكاملة في صفحة المصادر. لما الملفات تكتر، صفحة واحدة بتتراجع أسهل.
- الصورة تحت أول الشاشة: [[loading="lazy"]] و [[decoding="async"]]. والغلاف (الـ [[poster]]) أول الشاشة ومفيهوش الاتنين. في صفحة قصيرة زي دي الـ lazy مش هيبان في Network (القياس تحت)، وهيفرق لما الصفحة تطول بحلقات أكتر.
- [[<noscript>]] بيقول الحقيقة: حاجة واحدة بس محتاجة JavaScript. باقي الموقع HTML شغال من غيره.
- السطرين CSS في [[studio.html]]: [[width: 100%]] و [[max-width]] و [[height: auto]] بيخلّوا الـ SVG يتصغّر مع الصفحة بنسبته، و [[opacity]] مع [[:hover]] و [[:focus-visible]] بيبيّن الشكل اللي الماوس أو الـ Tab عليه (درس «selectors»).

**الأخطاء اللي المشروع بيتعامل معاها:** الـ PDF مبيتعرضش: فيه بديل ولينك. الكابشن مبيتحمّلش: النص المكتوب موجود. JavaScript مقفول: [[<noscript>]]، والعدّاد بس اللي واقف. الصورة متحمّلتش: [[alt]] ومكانها محجوز.

**الغلطة الشائعة:** تنسخ الـ [[<nav>]] وتنسى تنقل [[aria-current="page"]]، فكل الصفحات بتقول إنك في «الحلقة».

~~~text القياس من Chrome (الخمس صفحات من سيرفر محلي)
studio.html بعرض 800:   الـ SVG 600 × 300       نص الدايرة → circle جوه a[href="#mix"]
studio.html بعرض 360:   الـ SVG 344 × 172       نص الدايرة برده → circle جوه a[href="#mix"]
شجرة الـ accessibility: group «مسقط استوديو المحطة»   link «غرفة التسجيل»   link «غرفة المكساج»   link «الاستقبال»
index.html:             img.loading = "lazy". الصفحة قصيرة، فـ Chrome طلب media/studio.svg مع فتح الصفحة (نافذة 800 × 600):
                        المتصفح بيبدأ يحمّل الصورة الـ lazy قبل ما توصل الشاشة بمسافة. على بعد 6000px (قياس درس «iframe sandbox و allow») التحميل اتأجّل
credits.html:           document.querySelectorAll('a[rel~="license"]').length = 2
~~~` },
        { lvl: 'فكرة', dir: "my-recording", t: R`صفحة لتسجيل من عندك: صوت، ونصه، وصورة بنسبتها`, what: R`اختار حاجة حقيقية حواليك تتسجّل صوت: حكاية بيحكيها حد كبير في العيلة، أو شرح درس لزميلك، أو وصفة بتتقال، أو تعريف بمحل في شارعكم. سجّلها بموبايلك (دقيقة كفاية) واعمللها صفحة [[index.html]] فيها: عنوان، وجملة مين بيتكلم وإمتى اتسجّلت، والمشغّل (بكل اللي اتعلمته: [[controls]] و [[<source>]] بنوعه و [[aria-label]] ومن غير [[autoplay]])، ولينك تحميل، والنص المكتوب كامل، وصورة واحدة من تصويرك في [[<figure>]] بنسبتها ورخصة انت اللي تختارها. مفيش حل واحد صح: اللي تحت نسخة نموذجية.`, done: R`حد غيرك يقدر يسمع التسجيل، ويقدر يقراه من غير ما يسمعه، ويعرف من الصفحة مين صاحب التسجيل والصورة ومسموحله يعمل بيهم إيه. والمشغّل واقف لحد ما يتداس، وليه اسم في شجرة الـ accessibility.`, ext: R`اكتب ملف [[.vtt]] للتسجيل وشغّله في [[<video>]] بغلاف زي المشروع التاني. وزوّد تسجيل تاني في نفس الصفحة، كل واحد [[preload="none"]] وتحته نصه. واسأل صاحب الحكاية: يوافق تتنشر بأنهي رخصة؟ واكتب اللي اتفقتوا عليه.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>حكاية الساقية: تسجيل من بيتنا</title>
<style>
  img { max-width: 100%; height: auto; }
</style>
</head>
<body>
<main>
  <h1>حكاية الساقية</h1>
  <p>جدتي فاطمة بتحكي عن الساقية اللي كانت جنب بيتهم. اتسجّلت في البيت، في <time datetime="2026-11">نوفمبر 2026</time>.</p>
  <audio controls preload="metadata" aria-label="حكاية الساقية بصوت جدتي فاطمة">
    <source src="media/saqia.mp3" type="audio/mpeg">
  </audio>
  <p><a href="media/saqia.mp3" download>نزّل التسجيل (MP3، دقيقة)</a></p>
  <h2>نص الحكاية</h2>
  <p><strong>جدتي:</strong> الساقية كانت بتلف من الفجر، وصوتها يوصل لآخر الغيط.</p>
  <p><strong>جدتي:</strong> وكنا نقعد جنبها نستنى أبويا يرجع.</p>
  <p>[ضحكة]</p>
  <p><strong>جدتي:</strong> دلوقتي مكانها عمارة.</p>
  <figure>
    <img src="media/garden.jpg" alt="شجرة توت قديمة قدام بيت من دور واحد" width="800" height="600" loading="lazy" decoding="async">
    <figcaption>«شجرة التوت» تصوير هشام نبيل، رخصة <a href="https://creativecommons.org/licenses/by/4.0/" rel="license">CC BY 4.0</a>.</figcaption>
  </figure>
  <h2>حقوق التسجيل</h2>
  <p>التسجيل والنص: هشام نبيل، بموافقة صاحبة الحكاية. مسموح بالنشر مع ذكر المصدر (<a href="https://creativecommons.org/licenses/by/4.0/" rel="license">CC BY 4.0</a>).</p>
</main>
</body>
</html>
~~~

~~~view 618 672 شكل الصفحة (الصوت صفارة قصيرة، والصورة بانر مكان صورتك)
<main>
  <h1>حكاية الساقية</h1>
  <p>جدتي فاطمة بتحكي عن الساقية اللي كانت جنب بيتهم. اتسجّلت في البيت، في <time datetime="2026-11">نوفمبر 2026</time>.</p>
  <audio controls preload="metadata" aria-label="حكاية الساقية بصوت جدتي فاطمة">
    <source src="data:audio/wav;base64,UklGRnwCAABXQVZFZm10IBAAAAABAAEAuAsAALgLAAABAAgAZGF0YVgCAABgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKA=" type="audio/wav">
  </audio>
  <p><a href="#">نزّل التسجيل (MP3، دقيقة)</a></p>
  <h2>نص الحكاية</h2>
  <p><strong>جدتي:</strong> الساقية كانت بتلف من الفجر، وصوتها يوصل لآخر الغيط.</p>
  <p><strong>جدتي:</strong> وكنا نقعد جنبها نستنى أبويا يرجع.</p>
  <p>[ضحكة]</p>
  <p><strong>جدتي:</strong> دلوقتي مكانها عمارة.</p>
  <figure>
    <img alt="شجرة توت قديمة قدام بيت من دور واحد" width="320" height="80" loading="lazy" decoding="async" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='80'%3E%3Crect width='320' height='80' fill='%230f766e'/%3E%3Ctext x='160' y='48' font-size='24' fill='white' text-anchor='middle'%3Eبودكاست المحطة%3C/text%3E%3C/svg%3E">
    <figcaption>«شجرة التوت» تصوير هشام نبيل، رخصة <a href="#" rel="license">CC BY 4.0</a>.</figcaption>
  </figure>
  <h2>حقوق التسجيل</h2>
  <p>التسجيل والنص: هشام نبيل، بموافقة صاحبة الحكاية. مسموح بالنشر مع ذكر المصدر (<a href="#" rel="license">CC BY 4.0</a>).</p>
</main>
~~~

**هتشوف إيه:** العنوان، وسطر مين وإمتى، والمشغّل، واللينك، والنص، والصورة بنسبتها، وفي الآخر حقوق التسجيل.

**ليه اخترت التصميم ده:**

- **النص تحت المشغّل مباشرة:** اللي مش هيسمع (أو مش فاهم لهجة جدتي) بيلاقي الكلام على طول.
- **«[ضحكة]» مكتوبة:** جزء من الحكاية، والنص من غيرها ناقص.
- **قسم لحقوق التسجيل:** الصوت بتاع حد تاني (جدتي)، فمكتوب إن النشر بموافقتها، وبأنهي رخصة.
- **صورة من تصويري:** مفيش مصدر خارجي، فالنسبة اسم ورخصة بس.
- **[[<audio>]] مش [[<video>]]:** مفيش كابشن في النسخة دي. لما تكتب ملف الـ VTT (بند «زوّد عليه»)، بدّله.

**الغلطة الشائعة:** تنشر صوت حد من غير ما تسأله. الرخصة بتنظّم حق صاحب العمل، وصاحب الصوت ليه حق تاني: إنه يوافق.

~~~text القياس من Chrome (بملف صوت تجربة 3 ثواني مكان التسجيل، من سيرفر محلي)
Audio «حكاية الساقية بصوت جدتي فاطمة»      paused = true      duration = 3
document.querySelectorAll('a[rel~="license"]').length = 2
~~~` }
      ],
      items: [
        {
          cmd: "audio و source",
          title: "ملف صوت بيشتغل في الصفحة: مشغّل، وأكتر من صيغة، ومن غير تشغيل مفاجئ",
          pre: [{ to: "css/video و iframe", why: R`[[<video>]] و [[<source>]] و [[preload]] اتشرحوا هناك على الفيديو، وهنا نفس الأفكار على الصوت، ومعاها اللي متقالش: سياسة الـ autoplay بالتفصيل، و [[media]] على [[<source>]]، والنص البديل` }],
          ref: [
            { t: "MDN: <audio>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/audio" },
            { t: "MDN: <source>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/source" },
            { t: "MDN: Autoplay guide for media and Web Audio APIs", url: "https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay" },
            { t: "WHATWG: the audio element", url: "https://html.spec.whatwg.org/multipage/media.html#the-audio-element" },
            { t: "WHATWG: the source element", url: "https://html.spec.whatwg.org/multipage/embedded-content.html#the-source-element" }
          ],
          desc: R`[[<audio>]] بيحط ملف صوت في الصفحة (حلقة بودكاست، تسجيل درس، نطق كلمة). من غير [[controls]] مبيظهرش خالص، وبـ [[controls]] المتصفح بيرسم مشغّل فيه تشغيل وإيقاف وشريط وقت وصوت.
و [[<source>]] جواه بيدّي المتصفح أكتر من ملف لنفس الصوت، وهو بياخد أول واحد يعرف يشغّله. والتشغيل التلقائي للصوت ([[autoplay]]) المتصفحات بتمنعه، فمتبنيش عليه.`,
          example: R`<h2>الحلقة ١: يعني إيه صوت في الصفحة</h2>
<audio controls preload="metadata" aria-label="الحلقة ١: يعني إيه صوت في الصفحة">
  <source src="media/ep1.ogg" type="audio/ogg; codecs=opus">
  <source src="media/ep1.mp3" type="audio/mpeg">
  <p>متصفحك مش بيشغّل الصوت.</p>
</audio>
<p><a href="media/ep1.mp3" download>نزّل الحلقة (MP3، ٣ ميجا)</a></p>`,
          flag: "script",
          lines: [
            R`عنوان الحلقة قبل المشغّل. المشغّل نفسه مفيهوش أي كلام، فالعنوان هو اللي بيقول للزائر ده صوت إيه.`,
            R`[[<audio>]] بـ [[controls]] عشان المشغّل يظهر، و [[preload="metadata"]] عشان المتصفح يجيب مدة الملف بس مش الملف كله، و [[aria-label]] اسم المشغّل لقارئ الشاشة.`,
            R`أول ملف: Ogg بكودك Opus (حجمه أصغر لنفس الجودة). [[type]] بيقول للمتصفح الصيغة من غير ما يحمّل الملف، فلو مش بيعرفها بيعدّي على اللي بعده.`,
            R`تاني ملف: MP3، وده بيشتغل في كل المتصفحات الحالية، فهو آخر واحد في الترتيب (الاحتياطي).`,
            R`النص البديل: بيظهر بس في متصفح قديم جدًا ميعرفش [[<audio>]] أصلًا. في المتصفحات الحالية مبيظهرش حتى لو الملفات كلها باظت.`,
            R`قفلة [[</audio>]]. العنصر ده لازم يتقفل: الـ [[<source>]] والنص البديل بيتحطوا بين الفتحة والقفلة.`,
            R`لينك تحميل **برّه** المشغّل: ده اللي بيشتغل لو المشغّل مشتغلش، وللي عايز يسمع الحلقة من غير نت. و [[download]] بيخلّي المتصفح ينزّل الملف بدل ما يفتحه.`
          ],
          teach: R`## الفكرة في سطرين

المواصفة بتقول: [[<audio>]] بيمثّل صوت أو stream صوتي. ملوش شكل من عنده: الشكل كله هو المشغّل اللي المتصفح بيرسمه لما تكتب [[controls]].

القياسات كلها من Chrome 157 على Windows 11، بملفات صوت اتعملت بـ ffmpeg (نغمة ٣ ثواني بصيغة MP3 و Ogg) واتفتحت من سيرفر محلي.

> **عن المعاينات في الوحدة دي:** المعاينة الحية مبتقراش ملفات من جهازك، فملف الصوت مكتوب جوه الصفحة نفسها بـ [[data:]] (سطر طويل من حروف وأرقام هو ملف WAV صغير: صفارة خُمس ثانية). في موقعك هتكتب مكانه مسار ملف عادي زي [[src="media/ep1.mp3"]]. المسارات اتشرحت في درس «المسارات: مطلق ونسبي».

---

## ١. [[<audio controls>]]

~~~live 80 مشغّل صوت (دوس ▶ هتسمع صفارة قصيرة)
<audio controls src="data:audio/wav;base64,UklGRnwCAABXQVZFZm10IBAAAAABAAEAuAsAALgLAAABAAgAZGF0YVgCAABgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKA="></audio>
~~~

**هتشوف إيه:** شريط رمادي فيه زرار ▶، والوقت، وشريط التقدّم، وزرار الصوت، وتلات نقط (قايمة فيها سرعة التشغيل والتحميل). ده شكله في Chrome، وكل متصفح بيرسمه بشكله.

~~~text القياس من Chrome
<audio src="ep.mp3">            display: none      الحجم: 0 × 0      (موجود في الصفحة ومش باين)
<audio controls src="ep.mp3">   display: inline    الحجم: 300 × 54
الاتنين بعد التحميل:            paused = true      (واقف لحد ما حد يدوس)
~~~

- [[paused]] خاصية بتتقري من JavaScript: [[true]] يعني واقف.
- من غير [[controls]] العنصر موجود والملف بيتحمّل، بس مفيش حاجة تتشاف ولا تتداس. ده بيتستخدم بس لما JavaScript هو اللي بيشغّل الصوت (زرار «اسمع النطق» مثلًا).
- [[controls]] من الـ boolean attributes: وجوده يكفي، ومبياخدش قيمة (زي [[required]] في الفورم).

---

## ٢. [[<source src="..." type="...">]]: أكتر من ملف لنفس الصوت

بدل [[src]] على [[<audio>]]، حط جواه [[<source>]] لكل صيغة. المتصفح بيمشي عليهم بالترتيب وياخد **أول** واحد يعرف يشغّله.

~~~html
<audio controls>
  <source src="media/ep1.xyz" type="audio/x-nope">
  <source src="media/ep1.ogg" type="audio/ogg; codecs=opus">
  <source src="media/ep1.mp3" type="audio/mpeg">
</audio>
~~~

~~~text القياس من Chrome (currentSrc = الملف اللي اتاخد فعلًا)
التلات sources اللي فوق:                          currentSrc = ep1.ogg
   ← النوع الأول مش معروف فاتعدّى من غير ما ملفه يتطلب، والتاني اتاخد، والتالت متلمسش

<source src="missing.ogg"> وبعده <source src="ep1.mp3">  (من غير type):
                                                  currentSrc = ep1.mp3
   ← من غير type المتصفح اضطر يطلب الملف الأول (رجع 404) وبعدين راح للتاني
~~~

[[type]] هو نوع الملف (MIME type). لما يتكتب، المتصفح بيقرر من غير ما يحمّل حاجة. ولما ميتكتبش، بيجرّب كل ملف بطلب حقيقي.

المتصفح بيعرف يشغّل إيه؟ ده اللي Chrome 157 رد بيه لما اتسأل بـ [[canPlayType()]]:

| [[type]] | رد Chrome | معناه |
|---|---|---|
| [[audio/mpeg]] (MP3) | [[probably]] | هيشتغل غالبًا |
| [[audio/ogg; codecs=opus]] | [[probably]] | هيشتغل غالبًا |
| [[audio/ogg]] و [[audio/wav]] و [[audio/mp4]] | [[maybe]] | النوع معروف، والكودك اللي جواه متحددش |
| [[audio/x-nope]] | نص فاضي | مش هيشتغل |

- **MP3** بيشتغل في كل المتصفحات الحالية (MDN). لو هتحط صيغة واحدة، هي دي.
- الصيغ الأحدث (Opus) حجمها أصغر. حطها الأول، و MP3 في الآخر كاحتياطي.
- [[<source>]] عنصر فاضي (void): ملوش قفلة، زي [[<img>]].
- لو كتبت [[src]] على [[<audio>]] نفسه، الـ [[<source>]] اللي جواه بيتجاهلوا.

---

## ٣. [[<source media="...">]]: ملف مختلف حسب الشاشة

[[media]] بياخد شرط زي بتاع [[<picture>]] (درس «picture»). الـ [[<source>]] اللي شرطه مش متحقق بيتعدّى.

~~~html
<audio controls>
  <source src="media/ep1-hq.ogg" type="audio/ogg" media="(min-width: 2000px)">
  <source src="media/ep1.mp3" type="audio/mpeg">
</audio>
~~~

~~~text القياس من Chrome (نافذة عرضها 800)
media="(min-width: 2000px)"  ← الشرط مش متحقق      currentSrc = ep1.mp3
media="(min-width: 600px)"   ← الشرط متحقق          currentSrc = ep1-hq.ogg
~~~

الاختيار بيحصل **مرة واحدة** وقت التحميل. تكبير النافذة بعد كده مبيغيّرش الملف. والاستخدام الحقيقي ليه في الفيديو أكتر (فيديو صغير للموبايل وكبير للديسكتوب). اتقاس في Chrome بس، ودعم المتصفحات التانية راجعه في صفحة [[<source>]] على MDN قبل ما تعتمد عليه.

---

## ٤. النص البديل، ولينك التحميل

اللي بين [[<audio>]] و [[</audio>]] (غير الـ [[<source>]]) هو النص البديل. MDN: بيظهر في المتصفحات اللي **مبتعرفش العنصر**. يعني مش بيظهر لما الملف يبوظ.

~~~live 122 ملف مش موجود: المشغّل رمادي، والنص البديل اللي جواه مش ظاهر
<audio controls>
  <source src="media/missing.mp3" type="audio/mpeg">
  <p>النص ده جوه audio: مش هتشوفه.</p>
</audio>
<p><a href="media/ep1.mp3" download>نزّل الحلقة (MP3)</a> ← ده برّه، فباين.</p>
~~~

**هتشوف إيه:** مشغّل باهت زراره مبيتداسش، وتحته اللينك. الجملة اللي جوه [[<audio>]] مش موجودة في الصفحة.

~~~text القياس من Chrome (ملف مش موجود)
ارتفاع النص البديل: 0      networkState = 3  (NO_SOURCE: مفيش ملف ينفع)
~~~

عشان كده لينك التحميل بيتحط **برّه** المشغّل. هو اللي بينقذ الزائر لما المشغّل ميشتغلش.

---

## ٥. [[<audio loop muted>]]

- [[loop]]: لما الصوت يخلص يرجع من الأول لوحده. لصوت خلفية قصير، مش لحلقة.
- [[muted]]: يبدأ مكتوم. الزائر يقدر يفتح الصوت من المشغّل.

الاتنين boolean. والغلطة المشهورة فيهم:

~~~text القياس من Chrome
<audio controls muted="false">     muted = true     ← لسه مكتوم!
<audio controls loop muted>        loop = true      muted = true
~~~

[[muted="false"]] مبتفتحش الصوت. الـ boolean attribute شغال طول ما هو مكتوب، بأي قيمة. عشان تلغيه امسحه كله.

---

## ٦. [[<audio autoplay>]] وسياسة المتصفح

[[autoplay]] بيطلب من المتصفح يشغّل الصوت أول ما الصفحة تفتح. المتصفحات بترفض الطلب ده لو فيه صوت مسموع والزائر لسه ملمسش الصفحة.

~~~text القياس من Chrome 157 (صفحة لسه مفتوحة، ومحدش داس على حاجة)
<audio autoplay>                         paused = true    اتمنع
<audio autoplay muted>                   paused = true    اتمنع برده
<video autoplay>          (فيه صوت)      paused = true    اتمنع
<video autoplay muted>                   paused = false   اشتغل
<video autoplay>          (ملف من غير صوت خالص، ومن غير muted)
                                         paused = true    اتمنع

audio.play() من JavaScript من غير ضغطة:
NotAllowedError: play() failed because the user didn't interact with the document first.

بعد ضغطة حقيقية بالماوس في الصفحة:    audio.play() اشتغل   (paused = false)
~~~

اللي يطلع من الجدول:

1. **الصوت بـ [[autoplay]] مبيشتغلش.** ومفيش رسالة خطأ: المشغّل بيفضل واقف وخلاص.
2. **[[muted]] بينفع مع [[<video>]] بس.** في Chrome، [[<audio autoplay muted>]] فضل واقف. الاستثناء معمول لفيديو الخلفية الصامت.
3. **الفيديو لازم عليه [[muted]] مكتوبة**، حتى لو ملفه مفيهوش صوت أصلًا.
4. **بعد أول ضغطة من الزائر** التشغيل من JavaScript بيبقى مسموح. عشان كده زرار «شغّل» بيشتغل دايمًا.

الـ headless هنا زي Chrome العادي: نفس السياسة ([[document-user-activation-required]]) من غير ما نغيّر حاجة. ولما شغّلنا Chrome بـ [[--autoplay-policy=no-user-gesture-required]] الخمسة اشتغلوا، وده إعداد للاختبار مش عند أي زائر.

باقي المتصفحات (من دليل Autoplay في MDN، مش متقاس هنا): التشغيل التلقائي مسموح لو الصوت مكتوم، أو الزائر اتفاعل مع الموقع، أو الموقع في قايمة مسموح ليها (المتصفح بيضيفه لوحده لو الزائر بيشغّل ميديا عليه كتير، أو الزائر يضيفه بإيده)، أو الصفحة جوه [[<iframe>]] واخد الإذن بـ [[allow="autoplay"]] (درس «iframe sandbox و allow»). و Firefox فيه إعداد يمنع الكل، و Safari محتاج [[playsinline]] للفيديو.

**الخلاصة العملية:** متكتبش [[autoplay]] على [[<audio>]]. الزائر هو اللي يدوس.

---

## ٧. [[<audio preload="none">]]

[[preload]] تلميح للمتصفح: يحمّل قد إيه قبل ما حد يدوس ▶.

| القيمة | المتصفح بيحمّل |
|---|---|
| [[none]] | ولا حاجة لحد ما الزائر يدوس |
| [[metadata]] | معلومات الملف (المدة) |
| [[auto]] | ممكن يحمّل الملف كله |

~~~text القياس من Chrome (ملف 3 ثواني، من سيرفر محلي)
من غير preload:        الخاصية preload = "metadata"   (الافتراضي في Chrome)
preload="none":        duration = NaN    readyState = 0    ← المشغّل بيعرض 0:00
preload="metadata":    duration = 3      readyState = 4
preload="auto":        duration = 3      readyState = 4
~~~

- [[duration]] مدة الملف بالثواني. [[NaN]] معناها «لسه مش معروفة».
- [[readyState]] رقم من ٠ لـ ٤: ٠ مفيش أي بيانات، و ٤ فيه اللي يكفي للتشغيل. الملف هنا صغير فاتحمّل كله مع [[metadata]].
- MDN: الافتراضي بيختلف من متصفح لمتصفح، والمواصفة بتنصح بـ [[metadata]]. والقيمة دي تلميح، المتصفح مش مجبر عليها.
- صفحة فيها ٢٠ حلقة: [[preload="none"]] على الكل. صفحة حلقة واحدة: [[metadata]].

قياس الـ bytes لكل قيمة موجود في درس «video و iframe» (قسم «preload بيفرق قد إيه؟»).

---

## ٨. اسم المشغّل، والنص المكتوب

~~~text القياس من Chrome (شجرة الـ accessibility)
<audio controls>                                        →  Audio «»        (من غير اسم)
<audio controls aria-label="الحلقة ١: يعني إيه صوت">    →  Audio «الحلقة ١: يعني إيه صوت»
<figure><figcaption>الحلقة ٢</figcaption><audio controls></figure>
                                                        →  Audio «»        (الـ figcaption مسمّاش المشغّل)
~~~

شجرة الـ accessibility هي النسخة اللي قارئ الشاشة بيقراها من الصفحة. المشغّل فيها من غير اسم، فلو الصفحة فيها ٥ حلقات، القارئ هيسمع «Audio» خمس مرات. الحل: عنوان ([[<h2>]]) قبل كل مشغّل، و [[aria-label]] عليه. ونطق قارئ الشاشة نفسه متقاسش هنا.

والأهم: **الصوت لوحده مبيوصلش للكل.** الأصم، واللي في مكان دوشة، ومحرك البحث، محتاجين الكلام مكتوب (transcript) في الصفحة. MDN: أي صوت فيه كلام محتاج نص مكتوب.

و [[<audio>]] مبيعرضش كابشن: جرّبنا [[<track>]] جواه، الملف اتحمّل ([[cues = 3]]) ومفيش أي حاجة ظهرت، والمشغّل فضل 300 × 54. لو عايز كلام بيظهر مع الصوت، شغّل الملف في [[<video>]] (الدرس الجاي).

---

## ٩. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[<audio src="ep.mp3">]] من غير [[controls]] | مفيش حاجة في الصفحة: [[display: none]] |
| [[autoplay]] على الصوت | مبيشتغلش، ومن غير أي رسالة |
| [[muted="false"]] | الصوت مكتوم: الـ attribute موجود |
| [[<audio src="a.mp3">]] وجواه [[<source>]] | الـ sources بيتجاهلوا |
| [[<source>]] من غير [[type]] | المتصفح بيطلب كل ملف عشان يجرّبه |
| MP3 أول واحد وبعده Ogg | Ogg عمره ما هيتاخد: الأول اللي بيشتغل هو اللي بيكسب |
| لينك التحميل جوه [[<audio>]] بس | محدش هيشوفه في متصفح حديث |
| حلقة من غير نص مكتوب | الأصم ومحرك البحث مش واصلهم حاجة |

---

## الخلاصة

- [[<audio controls>]]: من غير [[controls]] مفيش مشغّل.
- [[<source src type>]]: أول صيغة المتصفح يعرفها. الأحدث الأول و MP3 الآخر، ودايمًا [[type]].
- [[autoplay]] على الصوت بيتمنع، و [[muted]] مبينقذش غير [[<video>]].
- [[preload="none"]] لصفحة فيها مشغّلات كتير، و [[metadata]] لواحد.
- عنوان و [[aria-label]]، ولينك تحميل برّه، ونص مكتوب للحلقة.`,
          try: R`اعمل ملف [[player.html]] فيه عنوان «تجربة الصوت» ومشغّلين لنفس الملف (أي ملف MP3 عندك، سمّيه [[test.mp3]] وحطه جنب الصفحة): الأول [[<audio controls>]] عادي، والتاني [[<audio controls autoplay muted="false" loop>]]. افتح الصفحة في Chrome من غير ما تدوس على حاجة: مين فيهم اشتغل؟ وبعدين دوس ▶ على التاني: فيه صوت؟ وبيعيد لما يخلص؟`,
          sol: R`~~~html player.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تجربة الصوت</title>
</head>
<body>
<h1>تجربة الصوت</h1>
<p>الأول: <audio controls src="test.mp3"></audio></p>
<p>التاني: <audio controls autoplay muted="false" loop src="test.mp3"></audio></p>
</body>
</html>
~~~

~~~view 234 نفس الصفحة (الملف هنا صفارة قصيرة مكتوبة جوه الصفحة)
<h1>تجربة الصوت</h1>
<p>الأول: <audio controls src="data:audio/wav;base64,UklGRnwCAABXQVZFZm10IBAAAAABAAEAuAsAALgLAAABAAgAZGF0YVgCAABgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKA="></audio></p>
<p>التاني: <audio controls autoplay muted="false" loop src="data:audio/wav;base64,UklGRnwCAABXQVZFZm10IBAAAAABAAEAuAsAALgLAAABAAgAZGF0YVgCAABgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKA="></audio></p>
~~~

**هتشوف إيه:**

- ولا واحد اشتغل لوحده. التاني عليه [[autoplay]]، و Chrome منعه في سكوت.
- التاني أيقونة الصوت عليها شرطة: مكتوم، مع إن المكتوب [[muted="false"]].
- لما تدوس ▶ على التاني: الشريط بيتحرك ومفيش صوت، ولما يخلص بيرجع من الأول ([[loop]]).

**ليه كده:** [[autoplay]] طلب والمتصفح بيرفضه للصوت. و [[muted]] boolean: أي قيمة معناها «مكتوم». امسح [[muted="false"]] خالص وجرّب تاني: الصوت هيطلع.

~~~text القياس من Chrome
الأول:    paused = true    muted = false
التاني:   paused = true    muted = true     loop = true
~~~`,
          deep: {
            why: R`قبل [[<audio>]] الصوت في الصفحة كان محتاج plugin (Flash)، ومكانش بيشتغل على الموبايل. العنصر ده بيشتغل في كل متصفح من غير أي حاجة تتسطّب، وبيدّي مشغّل الكيبورد وقارئ الشاشة بيعرفوا يستخدموه. وسياسة الـ autoplay اتعملت لأن المواقع كانت بتشغّل إعلانات بصوت أول ما الصفحة تفتح.`,
            how: R`المتصفح بيمشي على الـ [[<source>]] بالترتيب. اللي [[media]] بتاعه مش متحقق أو [[type]] بتاعه مش معروف بيتعدّى من غير طلب، وأول واحد ينفع بيبقى [[currentSrc]]. بعدها بيحمّل حسب [[preload]]، وبيرفع [[readyState]] من ٠ لـ ٤. ولما حاجة تطلب التشغيل ([[autoplay]] أو [[play()]]) بيسأل السياسة: فيه ضغطة من الزائر على الصفحة؟ لو لأ والصوت مسموع، [[autoplay]] بيتجاهل و [[play()]] بيرجّع Promise مرفوض بـ [[NotAllowedError]].`,
            when: R`حلقة بودكاست، تسجيل محاضرة، نطق كلمة في قاموس، مقطع من كتاب صوتي، رسالة صوتية في صفحة «عن الشركة». لو فيه صورة بتتحرك مع الصوت يبقى [[<video>]]. ولو الصوت مستضاف عند خدمة تانية، هتاخد منها [[<iframe>]] (درس «iframe sandbox و allow»).`,
            mistakes: R`نسيان [[controls]] فالمشغّل ميظهرش. [[autoplay]] على صوت والاعتماد عليه. [[muted="false"]] على أساس إنها بتفتح الصوت. [[<source>]] من غير [[type]]. ترتيب الصيغ بالعكس (MP3 الأول). لينك التحميل جوه العنصر. وصفحة حلقات من غير نص مكتوب ولا أسامي للمشغّلات.`
          },
          practice: [
            { lvl: 'تطبيق', t: R`**ابني:** مشغّل الحلقة ٢ في بودكاست «المحطة». المطلوب: مشغّل ظاهر، جواه ملفين بالترتيب الصح (Ogg الأول وبعده MP3) وكل واحد بنوعه، ومن غير تشغيل تلقائي، واسم للمشغّل بـ [[aria-label]]، ولينك تحميل للـ MP3 برّه المشغّل. (من قسم ١ و ٢ و ٤ و ٨ في الشرح)`, done: R`المشغّل ظاهر تحت العنوان، واللينك تحته، وكل الشروط ✓. (المشغّل هيبان باهت لأن الملفين مش موجودين في المعاينة، والمطلوب هنا الكود.)`, work: { h: 170, start: R`<h2>الحلقة ٢: الكابشن والترجمة</h2>
<p>ملفات الحلقة: media/ep2.ogg و media/ep2.mp3</p>`, checks: [
              { say: R`فيه [[<audio>]] عليه [[controls]]`, q: "audio[controls]" },
              { say: R`جواه اتنين [[<source>]]`, q: "audio > source", n: 2 },
              { say: R`الأول Ogg ومعاه [[type]] بتاعه`, q: "audio > source:first-of-type[src$=\".ogg\"][type^=\"audio/ogg\"]" },
              { say: R`التاني MP3 ونوعه [[audio/mpeg]]`, q: "audio > source:last-of-type[src$=\".mp3\"][type=\"audio/mpeg\"]" },
              { say: R`المشغّل ليه [[aria-label]] ومفيهوش [[autoplay]]`, q: "audio[aria-label]:not([autoplay])" },
              { say: R`لينك [[download]] للـ MP3 برّه المشغّل`, q: ":not(audio) > a[download][href$=\".mp3\"]" },
            ] }, sol: R`~~~live 182 الحل
<h2>الحلقة ٢: الكابشن والترجمة</h2>
<audio controls preload="metadata" aria-label="الحلقة ٢: الكابشن والترجمة">
  <source src="media/ep2.ogg" type="audio/ogg; codecs=opus">
  <source src="media/ep2.mp3" type="audio/mpeg">
</audio>
<p><a href="media/ep2.mp3" download>نزّل الحلقة ٢ (MP3)</a></p>
~~~

**هتشوف إيه:**

- العنوان، وتحته المشغّل (باهت هنا لأن الملفين مش موجودين في المعاينة)، وتحته لينك التحميل.
- في فولدر مشروعك، بالملفين في [[media/]]، المشغّل هيبان عادي والمدة مكتوبة.

**ليه كده:**

- Ogg/Opus الأول لأن حجمه أصغر، و MP3 الآخر لأنه بيشتغل في كل حتة.
- [[type]] على الاتنين: المتصفح اللي مبيعرفش Ogg بيعدّيه من غير ما يطلب الملف.
- اللينك برّه [[<audio>]]: جواه مكانش هيبان.

**الغلطة الشائعة:** [[<audio controls src="media/ep2.mp3">]] ومعاه الـ sources. الـ [[src]] اللي على العنصر بيكسب، والـ Ogg مش هيتاخد أبدًا.

~~~text القياس من Chrome (بالملفين موجودين على سيرفر محلي)
currentSrc = ep2.ogg      paused = true      الحجم: 300 × 54
Audio «الحلقة ٢: الكابشن والترجمة»
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** مشغّل «نشرة المحطة» فيه ٤ مشاكل: مش ظاهر في الصفحة، وعليه تشغيل تلقائي، ومكتوب عليه [[muted="false"]] «عشان الصوت يطلع»، ولينك التحميل محطوط جواه. (من قسم ١ و ٤ و ٥ و ٦ في الشرح)`, done: R`المشغّل ظاهر، ومفيهوش [[autoplay]] ولا [[muted]]، واللينك برّه وباين، وكل الشروط ✓.`, work: { h: 150, start: R`<h2>نشرة المحطة: أخبار الأسبوع</h2>
<audio autoplay muted="false" src="data:audio/wav;base64,UklGRnwCAABXQVZFZm10IBAAAAABAAEAuAsAALgLAAABAAgAZGF0YVgCAABgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKA=">
  <a href="media/news.mp3" download>نزّل النشرة</a>
</audio>`, checks: [
              { say: R`المشغّل عليه [[controls]]`, q: "audio[controls]" },
              { say: R`مفيش [[autoplay]]`, q: "audio[autoplay]", n: 0 },
              { say: R`مفيش [[muted]] بأي قيمة`, q: "audio[muted]", n: 0 },
              { say: R`مفيش لينك جوه [[<audio>]]`, q: "audio a", n: 0 },
              { say: R`لينك التحميل موجود برّه المشغّل`, q: ":not(audio) > a[download]" },
            ] }, sol: R`~~~live 182 بعد التصليح
<h2>نشرة المحطة: أخبار الأسبوع</h2>
<audio controls src="data:audio/wav;base64,UklGRnwCAABXQVZFZm10IBAAAAABAAEAuAsAALgLAAABAAgAZGF0YVgCAABgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKA="></audio>
<p><a href="media/news.mp3" download>نزّل النشرة</a></p>
~~~

وده اللي كان باين قبل التصليح:

~~~live 74 قبل
<h2>نشرة المحطة: أخبار الأسبوع</h2>
<audio autoplay muted="false" src="data:audio/wav;base64,UklGRnwCAABXQVZFZm10IBAAAAABAAEAuAsAALgLAAABAAgAZGF0YVgCAABgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKA=">
  <a href="media/news.mp3" download>نزّل النشرة</a>
</audio>
~~~

**هتشوف إيه:**

- قبل: العنوان لوحده. مفيش مشغّل، ومفيش لينك، ومفيش صوت.
- بعد: المشغّل ظاهر وواقف، واللينك تحته.

| المشكلة | التصليح | ليه |
|---|---|---|
| من غير [[controls]] | زوّدناه | من غيره [[display: none]] |
| [[autoplay]] | اتمسح | Chrome بيمنعه، والزائر مبيحبوش |
| [[muted="false"]] | اتمسح كله | أي قيمة معناها «مكتوم» |
| اللينك جوه [[<audio>]] | طلع برّه في [[<p>]] | اللي جوه نص بديل مبيظهرش |

**الغلطة الشائعة:** تغيّر [[muted="false"]] لـ [[muted="no"]] أو [[muted="0"]]. كلهم مكتوم. الحل الوحيد إن الكلمة تتمسح.

~~~text القياس من Chrome
قبل:   display = none    paused = true    muted = true
بعد:   display = inline  paused = true    muted = false    300 × 54
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع، وبعدين صلّح:** اكتب على ورقة: Chrome هياخد أنهي ملف من التلاتة؟ وليه الـ Opus (الأصغر) عمره ما هيتاخد؟ وبعدين رتّبهم صح: الأصغر الأول، والنوع اللي مفيش متصفح يعرفه يتمسح. (من قسم ٢ في الشرح)`, done: R`كتبت توقّعك، والـ sources بقوا اتنين: Opus الأول و MP3 الآخر، وكل الشروط ✓.`, work: { h: 110, start: R`<audio controls>
  <source src="media/ep3.mp3" type="audio/mpeg">
  <source src="media/ep3.opus.ogg" type="audio/ogg; codecs=opus">
  <source src="media/ep3.rm" type="audio/x-realaudio">
</audio>`, checks: [
              { say: R`الـ sources بقوا اتنين بس`, q: "audio > source", n: 2 },
              { say: R`مفيش [[audio/x-realaudio]]`, q: "source[type=\"audio/x-realaudio\"]", n: 0 },
              { say: R`Opus هو الأول`, q: "audio > source:first-of-type[type*=\"opus\"]" },
              { say: R`MP3 هو الآخر`, q: "audio > source:last-of-type[type=\"audio/mpeg\"]" },
            ] }, sol: R`~~~live 80 بعد الترتيب
<audio controls>
  <source src="media/ep3.opus.ogg" type="audio/ogg; codecs=opus">
  <source src="media/ep3.mp3" type="audio/mpeg">
</audio>
~~~

**التوقّع:** Chrome هياخد [[ep3.mp3]]. هو أول واحد في الترتيب وبيعرف يشغّله، فبيقف عنده ومبيبصش على اللي بعده. الـ Opus كان تاني واحد، فعمره ما هيتوصله في أي متصفح بيشغّل MP3 (يعني كلهم).

**هتشوف إيه:** نفس المشغّل قبل وبعد (باهت هنا لأن الملفات مش في المعاينة). الفرق في الملف اللي بيتحمّل، وده بيتشاف في DevTools › Network مش في الصفحة.

**ليه كده:** الترتيب هو الأولوية. «الأحسن الأول، والمضمون الآخر». و [[audio/x-realaudio]] صيغة قديمة مفيش متصفح حالي بيشغّلها، فسطرها ملوش فايدة.

**الغلطة الشائعة:** تفتكر المتصفح بيختار «أحسن» ملف. هو بيختار **أول** ملف ينفع.

~~~text القياس من Chrome
قبل:   currentSrc = ep3.mp3
بعد:   currentSrc = ep3.opus.ogg
canPlayType("audio/x-realaudio") = ""      (مش هيشتغل)
~~~` },
            { lvl: 'سريع', t: R`**اشرحها:** صاحب بودكاست «المحطة» طلب منك «أول ما الصفحة تفتح، مقدمة البودكاست تشتغل لوحدها». اشرحله في ٣ سطور: ليه ده مش هيحصل، وإيه البديل اللي بيشتغل فعلًا. (من قسم ٦ في الشرح)`, done: R`كتبت ٣ سطور فيهم: المتصفح بيمنع، و [[muted]] مبينفعش مع الصوت، والبديل زرار الزائر يدوسه.`, sol: R`إجابة نموذجية:

1. المتصفحات بتمنع أي صوت يشتغل قبل ما الزائر يلمس الصفحة. [[<audio autoplay>]] بيفضل واقف، ومن غير أي رسالة خطأ.
2. حيلة [[muted]] بتشتغل مع فيديو الخلفية بس، والصوت المكتوم ملوش معنى أصلًا.
3. البديل: مشغّل ظاهر في أول الصفحة وجنبه «اسمع المقدمة (٣٠ ثانية)». أول ضغطة من الزائر بتسمح بالتشغيل.

~~~text القياس من Chrome 157 (من غير أي ضغطة)
<audio autoplay>           paused = true
<audio autoplay muted>     paused = true
بعد ضغطة حقيقية:          audio.play() اشتغل
~~~

**الغلطة الشائعة:** إنك تجرّب على جهازك وتلاقيها اشتغلت، لأنك دوست في الصفحة قبل كده أو بتفتح الموقع ده كتير (Chrome بيحسب تفاعلك معاه). جرّب دايمًا في نافذة Incognito.` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** افتح صفحة [[<audio>]] على MDN (اللينك تحت الدرس) ودوّر على [[controlslist]]: بياخد أنهي تلات قيم؟ وأنهي واحدة بتشيل «تحميل» من قايمة التلات نقط؟ وهل ده بيمنع الزائر ينزّل الملف فعلًا؟ (بيكمّل قسم ١ في الشرح)`, done: R`كتبت التلات قيم، واللي بتشيل التحميل، وجملة عن ليه ده مش حماية.`, sol: R`من MDN: [[controlslist]] بيساعد المتصفح يختار أنهي أزرار تظهر في المشغّل، وقيمه [[nodownload]] و [[nofullscreen]] و [[noremoteplayback]].

~~~live 80 من غير «تحميل» في قايمة التلات نقط
<audio controls controlslist="nodownload" src="data:audio/wav;base64,UklGRnwCAABXQVZFZm10IBAAAAABAAEAuAsAALgLAAABAAgAZGF0YVgCAABgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKBgYGBgYGCgoKCgoKA="></audio>
~~~

**هتشوف إيه:** نفس المشغّل. افتح التلات نقط وقارن بمشغّل قسم ١: بند «تحميل» مش موجود هنا.

**هل ده حماية؟** لأ. الملف لسه بيتحمّل للمتصفح عشان يتسمع، وعنوانه مكتوب في الكود وفي DevTools › Network. [[nodownload]] بيشيل الزرار بس.

~~~text القياس من Chrome 157
audio.controlsList.supports("nodownload")        = true
audio.controlsList.supports("nofullscreen")      = true
audio.controlsList.supports("noremoteplayback")  = true
~~~

دعم المتصفحات التانية للـ attribute ده راجعه في جدول MDN قبل ما تعتمد عليه.` },
          ]
        },
        {
          cmd: "track و WebVTT",
          title: "كلام بيظهر مع الفيديو في وقته: كابشن وترجمة، وصورة قبل التشغيل",
          pre: [
            { to: "css/video و iframe", why: R`الـ [[<video>]] و [[controls]] و [[preload]] وأول ملف VTT اتشرحوا هناك (قسم «ملف الـ VTT»). الدرس ده بيكمّل: أنواع الـ track الخمسة، وباقي صيغة WebVTT، و [[poster]] و [[playsinline]]` },
            "css/audio و source"
          ],
          ref: [
            { t: "MDN: <track>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/track" },
            { t: "MDN: <video>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video" },
            { t: "MDN: WebVTT format", url: "https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API/Web_Video_Text_Tracks_Format" },
            { t: "WHATWG: the track element", url: "https://html.spec.whatwg.org/multipage/media.html#the-track-element" },
            { t: "WHATWG: the video element", url: "https://html.spec.whatwg.org/multipage/media.html#the-video-element" }
          ],
          desc: R`[[<track>]] بيربط الفيديو بملف نص فيه كلام بتوقيت (WebVTT): كل جملة بتظهر فوق الفيديو في ثوانيها. [[kind]] بيقول الكلام ده إيه (كابشن للي مش سامع، ولا ترجمة للغة تانية، ولا فصول)، و [[srclang]] لغته، و [[label]] اسمه في قايمة المشغّل، و [[default]] بيشغّله من الأول.
ومعاه في الدرس باقي attributes الفيديو: [[poster]] (الصورة اللي قبل التشغيل)، و [[width]] و [[height]] اللي بيحجزوا مكانه، و [[playsinline]] و [[muted]] و [[loop]].`,
          example: R`<video controls preload="metadata" width="640" height="360" poster="media/lesson1.jpg">
  <source src="media/lesson1.webm" type="video/webm">
  <source src="media/lesson1.mp4" type="video/mp4">
  <track kind="captions" srclang="ar" label="عربي (كابشن)" src="media/lesson1.ar.vtt" default>
  <track kind="subtitles" srclang="en" label="English" src="media/lesson1.en.vtt">
  <track kind="chapters" srclang="ar" label="الفصول" src="media/lesson1.chapters.vtt">
  <p>متصفحك مش بيشغّل الفيديو. <a href="media/lesson1.mp4">نزّل الدرس</a></p>
</video>`,
          flag: "script",
          lines: [
            R`الفيديو: [[controls]] للأزرار، و [[preload="metadata"]] يجيب المدة والمقاس بس، و [[width]] و [[height]] بيحجزوا مكانه قبل ما يتحمّل، و [[poster]] صورة بتتعرض لحد ما الزائر يدوس ▶.`,
            R`الصيغة الأولى WebM. [[<source>]] هنا زي ما هو في [[<audio>]]: أول نوع المتصفح يعرفه بيتاخد.`,
            R`MP4 كاحتياطي للمتصفح اللي مبيشغّلش WebM.`,
            R`الكابشن العربي: [[kind="captions"]] يعني كل اللي بيتسمع مكتوب (الكلام والأصوات)، و [[srclang="ar"]] لغة الملف، و [[label]] اسمه في القايمة، و [[default]] بيخلّيه شغال من أول ما الفيديو يفتح.`,
            R`ترجمة إنجليزي: [[kind="subtitles"]] للي سامع ومش فاهم اللغة. من غير [[default]]، فبتفضل مقفولة وملفها مبيتحمّلش لحد ما الزائر يختارها.`,
            R`الفصول: [[kind="chapters"]] عناوين أجزاء الفيديو بتوقيتها. مبتترسمش فوق الفيديو، وبتتقري من JavaScript أو من مشغّل بيدعمها.`,
            R`النص البديل ولينك تحميل، للمتصفح اللي ميعرفش [[<video>]] خالص.`,
            R`قفلة [[</video>]]. الـ [[<source>]] الأول، وبعدهم الـ [[<track>]]، وبعدهم النص البديل: ده الترتيب اللي المواصفة بتطلبه.`
          ],
          teach: R`## الفكرة في سطرين

المواصفة: [[<track>]] بيحدد «text track» للفيديو أو الصوت، يعني نص مربوط بالوقت. الملف نفسه بصيغة WebVTT (Web Video Text Tracks)، ملف نص عادي امتداده [[.vtt]].

القياسات من Chrome 157 على Windows 11. الفيديوهات وملفات الـ VTT اتفتحت من سيرفر محلي.

> في المعاينات: الفيديو تيل أخضر ٤ ثواني من غير صوت، مكتوب جوه الصفحة بـ [[data:]] زي ملف الصوت في الدرس اللي فات، وكذلك ملف الـ VTT والـ poster. في موقعك دي كلها مسارات ملفات.

---

## ١. [[<track>]] جوه [[<video>]]

~~~live 206 دوس ▶ وبص على أسفل الفيديو
<video controls width="320" height="180" src="data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAKjEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHWTbuMU6uEElTDZ1OsggEyTbuMU6uEHFO7a1OsggKN7AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmsCrXsYMPQkBNgIxMYXZmNjMuMS4xMDJXQYxMYXZmNjMuMS4xMDJEiYhAr0AAAAAAABZUrmvXrgEAAAAAAABO14EBc8WImSL+3MoIdEScgQAitZyDdW5kiIEAhoVWX1ZQOYOBASPjg4QdzWUA4JCwgaC6gVqagQJVsIRVuYEBVe6BAOwBAAAAAAAAAgAAElTDZ/5zc59jwIBnyJlFo4dFTkNPREVSRIeMTGF2ZjYzLjEuMTAyc3PZY8CLY8WImSL+3MoIdERnyKRFo4dFTkNPREVSRIeXTGF2YzYzLjEuMTAyIGxpYnZweC12cDlnyKFFo4hEVVJBVElPTkSHkzAwOjAwOjA0LjAwMDAwMDAwMAAfQ7Z1QNLngQCjrIEAAICCSYNCAAnwBZYAOCQcGU4AADBgAAATv/QgAAI/+zz///46VuMndD5Ao5WBAfQAhgBAkhwAXgAAAyAAAFn5huCjlYED6ACGAECSHABdAAADIAAAWfmG4KOVgQXcAIYAQJIcAF4AAAMgAABZ+Ybgo5WBB9AAhgBAkhwAW8AAAyAAAFn5huCjlYEJxACGAECSHABeAAADIAAAWfmG4KOVgQu4AIYAQJIcAF0AAAMgAABZ+Ybgo5WBDawAhgBAkhwAXgAAAyAAAFn5huAcU7trkbuPs4EAt4r3gQHxggG18IED">
  <track default kind="captions" srclang="ar" label="عربي" src="data:text/vtt,WEBVTT%0A%0A00:00.000 --> 00:02.000%0Aأهلًا بيكم في المحطة%0A%0A00:02.000 --> 00:04.000%0A[موسيقى هادية]">
</video>
~~~

**هتشوف إيه:** أول ما تدوس ▶، في أسفل الفيديو بيظهر «أهلًا بيكم في المحطة» على خلفية سودا، وبعد ثانيتين بيتبدّل بـ «[موسيقى هادية]». وفي أزرار المشغّل زرار **CC**: منه بتقفل الكابشن وتفتحه.

~~~text القياس من Chrome
video.textTracks.length = 1
textTracks[0]:   kind = captions   language = "ar"   label = "عربي"   mode = showing   cues = 2
~~~

- [[textTracks]]: قايمة الـ tracks بتاعة الفيديو، بتتقري من JavaScript.
- [[cues]]: الجمل اللي في الملف. كل جملة بتوقيتها اسمها cue.
- [[mode]]: حالة الـ track. [[showing]] يعني ظاهر.

[[<track>]] عنصر فاضي (void) ملوش قفلة، ومكانه جوه [[<video>]] أو [[<audio>]] بس. لما حطيناه برّه الفيديو: [[textTracks.length = 0]] والملف متطلبش.

---

## ٢. [[<track kind="captions" srclang="ar" label="عربي" default>]]

### [[kind]]: الكلام ده إيه

| [[kind]] | لمين (من MDN) | Chrome عمل إيه (متقاس) |
|---|---|---|
| [[subtitles]] | سامع الصوت ومش فاهم اللغة: ترجمة الحوار | بيترسم فوق الفيديو |
| [[captions]] | مش سامع (أصم، أو الصوت مقفول، أو دوشة): الحوار **ومعاه** الأصوات المهمة ومين بيتكلم | بيترسم فوق الفيديو |
| [[descriptions]] | مش شايف: وصف مكتوب للي في الصورة، المفروض يتنطق | مترسمش |
| [[chapters]] | عناوين أجزاء الفيديو للتنقّل | مترسمش |
| [[metadata]] | بيانات للسكربتات، مش للزائر | مترسمش، و [[mode = hidden]] |

~~~text القياس من Chrome
من غير kind:        kind = subtitles     (ده الافتراضي)
kind="banana":      kind = metadata      (قيمة غلط بتتحوّل metadata: مش هتتعرض!)
kind="caption":     kind = metadata      (غلطة حرف واحد، والكابشن اختفى من غير أي رسالة)
~~~

**captions ولا subtitles؟** الترجمة بتفترض إنك سامع، فمبتكتبش «[باب بيتقفل]». الكابشن بيفترض إنك مش سامع، فبيكتب كل صوت ليه معنى. فيديو عربي لجمهور عربي: اكتبله [[captions]] بالعربي.

### [[srclang]] و [[label]]

- [[srclang]]: لغة الكلام اللي في الملف، بنفس أكواد [[lang]] (درس «lang و dir»): [[ar]] و [[en]]. MDN: لو [[kind="subtitles"]] يبقى [[srclang]] **إجباري**.
- [[label]]: الاسم اللي الزائر بيشوفه في قايمة CC. اكتبه بلغة الترجمة نفسها: «English» مش «إنجليزي»، لأن اللي هيختارها بيقرا إنجليزي.

### [[default]]

~~~text القياس من Chrome
track عليه default:              mode = showing     الملف اتحمّل (readyState = LOADED)
track من غير default:            mode = disabled    cues = null    الملف متطلبش من السيرفر خالص
اتنين عليهم default:             الأول showing، والتاني disabled
مفيش default على أي واحد:        الكل disabled لحد ما الزائر يختار من زرار CC
~~~

- [[disabled]]: مقفول، وملفه مبيتحمّلش. يعني ١٠ لغات في الفيديو مبيكلّفوش حاجة لحد ما حد يختار واحدة.
- [[default]] على واحد بس لكل فيديو (MDN). وهو «شغّله إلا لو إعدادات الزائر بتفضّل track تاني».

---

## ٣. ملف WebVTT: اللي بعد الأساسيات

الأساس (سطر [[WEBVTT]]، وسطر فاضي، وكل cue سطر توقيت وتحته الكلام) في درس «video و iframe». ده ملف فيه الباقي:

~~~text media/lesson1.ar.vtt
WEBVTT

NOTE الملف ده كابشن الحلقة الأولى. السطر ده تعليق ومبيتعرضش.

intro
00:00:00.000 --> 00:00:02.000
<v منى>أهلًا بيكم في الحلقة الأولى.

2
00:00:02.000 --> 00:00:04.000 line:0 align:start
[موسيقى هادية]

00:04.000 --> 00:06.000
<v كريم>النهارده هنتكلم عن <i>الصوت</i> في الصفحة.
~~~

| الحتة | معناها |
|---|---|
| [[NOTE ...]] | تعليق ليك انت. مبيتعرضش، وبعده سطر فاضي |
| [[intro]] أو [[2]] فوق سطر التوقيت | اسم الـ cue (اختياري). بيتقري من JavaScript في [[cue.id]] |
| [[00:00:02.000]] | ساعات:دقايق:ثواني.أجزاء من ألف. الساعات اختيارية: [[00:04.000]] زيها |
| [[-->]] | سهم من شرطتين وعلامة أكبر، وحواليه مسافة من كل ناحية |
| [[<v منى>]] | مين بيتكلم (voice). مبيتكتبش على الشاشة، وبيتقري من السكربتات والتنسيق |
| «[موسيقى هادية]» | وصف صوت بين قوسين مربعين: ده اللي بيخلّي الملف captions مش subtitles |
| [[line:0 align:start]] | إعدادات الـ cue بعد التوقيت: [[line:0]] يعني أول سطر فوق بدل تحت (لو فيه كلام مكتوب في أسفل الصورة)، و [[align:start]] بيبدأ الكلام من أول السطر |
| [[<i>]] و [[<b>]] و [[<u>]] | مايل وتقيل وتحته خط، جوه الكلام |

~~~text القياس من Chrome (الملف اللي فوق)
cues = 3
cue 1:  id = "intro"   0 → 2    text = "<v منى>أهلًا بيكم في الحلقة الأولى."    line = auto   align = center
cue 2:  id = "2"       2 → 4    text = "[موسيقى هادية]"                         line = 0      align = start
cue 3:  id = ""        4 → 6    text = "<v كريم>النهارده هنتكلم عن <i>الصوت</i> في الصفحة."
~~~

### الملف البايظ بيتصرف إزاي

المتصفح مبيقولش حاجة لما ملف الـ VTT يبقى فيه غلط. الجملة بتختفي وخلاص.

~~~text القياس من Chrome (كل سطر ملف فيه غلطة واحدة)
أول سطر "VTT" بدل "WEBVTT":                 cues = 0    readyState = ERROR   (الملف كله اترفض)
ملف SRT (أرقام وفواصل، ومن غير WEBVTT):      cues = 0    readyState = ERROR
الملف مش موجود (404):                       cues = 0    readyState = ERROR
00:00:02,000 (فاصلة بدل النقطة، زي SRT):     الـ cue ده اتشال، والباقي اشتغل
00:04.000 -> 00:06.000 (شرطة واحدة):        الـ cue ده اتشال
0:06.000 (الدقايق رقم واحد):                الـ cue ده اتشال
00:02.00 (جزئين بدل تلاتة بعد النقطة):       الـ cue ده اتشال
الملف من دومين تاني من غير CORS:            readyState = ERROR، وفي الـ Console:
   Unsafe attempt to load URL http://127.0.0.1:8732/ar.vtt from frame with URL http://127.0.0.1:8731/t1.html. Domains, protocols and ports must match.
~~~

- عشان تتأكد: في DevTools › Console اكتب [[document.querySelector("video").textTracks[0].cues.length]] وقارن بعدد الجمل اللي كتبتها.
- ملف الـ VTT لازم يبقى من نفس الموقع. لو من دومين تاني: [[crossorigin]] على [[<video>]] والسيرفر التاني يسمح بـ CORS (MDN).
- ملفات الترجمة اللي بتتنزّل من النت غالبًا SRT: التوقيت فيها بفاصلة، وفيها رقم فوق كل جملة، ومفيهاش [[WEBVTT]]. بتتحوّل بإنك تزوّد السطر الأول وتغيّر الفواصل اللي في التوقيت لنقط.

---

## ٤. كابشن، ولا ترجمة، ولا وصف، ولا نص مكتوب؟

| الزائر | محتاج | بيتعمل بإيه |
|---|---|---|
| أصم أو ضعيف السمع، أو الصوت مقفول | كل اللي بيتسمع، مكتوب في وقته | [[<track kind="captions">]] |
| سامع ومش فاهم اللغة | ترجمة الحوار | [[<track kind="subtitles">]] |
| كفيف | وصف للي في الصورة | [[kind="descriptions"]] مبيتنطقش في Chrome (متقاس: مترسمش ومفيش صوت)، فالعملي: الوصف يتقال في الفيديو نفسه، أو يتكتب في الصفحة |
| أي حد عايز يقرا أو يدوّر، ومحرك البحث | الكلام كله مكتوب في الصفحة | نص مكتوب (transcript) تحت الفيديو: HTML عادي |

الكابشن والنص المكتوب مش بدل بعض: الأول ماشي مع الصورة، والتاني بيتقري لوحده وبيتدوّر فيه.

---

## ٥. [[<video poster="media/lesson1.jpg" width="640" height="360">]]

[[poster]] عنوان صورة بتتعرض مكان الفيديو لحد ما يشتغل. من غيرها بيتعرض أول frame (بعد ما يتحمّل)، وده غالبًا أسود أو لقطة ملهاش معنى.

~~~live 206 poster وعليه عنوان الحلقة، ولما تدوس ▶ بيختفي
<video controls width="320" height="180" preload="none" poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'%3E%3Crect width='320' height='180' fill='%230f766e'/%3E%3Ctext x='160' y='100' font-size='30' fill='white' text-anchor='middle'%3Eالحلقة ١%3C/text%3E%3C/svg%3E" src="data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAKjEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHWTbuMU6uEElTDZ1OsggEyTbuMU6uEHFO7a1OsggKN7AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmsCrXsYMPQkBNgIxMYXZmNjMuMS4xMDJXQYxMYXZmNjMuMS4xMDJEiYhAr0AAAAAAABZUrmvXrgEAAAAAAABO14EBc8WImSL+3MoIdEScgQAitZyDdW5kiIEAhoVWX1ZQOYOBASPjg4QdzWUA4JCwgaC6gVqagQJVsIRVuYEBVe6BAOwBAAAAAAAAAgAAElTDZ/5zc59jwIBnyJlFo4dFTkNPREVSRIeMTGF2ZjYzLjEuMTAyc3PZY8CLY8WImSL+3MoIdERnyKRFo4dFTkNPREVSRIeXTGF2YzYzLjEuMTAyIGxpYnZweC12cDlnyKFFo4hEVVJBVElPTkSHkzAwOjAwOjA0LjAwMDAwMDAwMAAfQ7Z1QNLngQCjrIEAAICCSYNCAAnwBZYAOCQcGU4AADBgAAATv/QgAAI/+zz///46VuMndD5Ao5WBAfQAhgBAkhwAXgAAAyAAAFn5huCjlYED6ACGAECSHABdAAADIAAAWfmG4KOVgQXcAIYAQJIcAF4AAAMgAABZ+Ybgo5WBB9AAhgBAkhwAW8AAAyAAAFn5huCjlYEJxACGAECSHABeAAADIAAAWfmG4KOVgQu4AIYAQJIcAF0AAAMgAABZ+Ybgo5WBDawAhgBAkhwAXgAAAyAAAFn5huAcU7trkbuPs4EAt4r3gQHxggG18IED"></video>
~~~

**هتشوف إيه:** صورة خضرا مكتوب عليها «الحلقة ١» وفوقها أزرار المشغّل. دوس ▶: الصورة بتروح والفيديو بيبدأ.

و [[width]] و [[height]] بيعملوا إيه؟ نفس اللي بيعملوه في [[<img>]]: بيحجزوا المكان.

~~~text القياس من Chrome (فيديو مقاسه الحقيقي 320 × 180، وقبل ما أي بيانات توصل)
من غير width/height ولا poster:          الحجم 300 × 150    ← المقاس الافتراضي
من غير width/height ومعاه poster 480×270: الحجم 480 × 270    ← خد مقاس الصورة
width="640" height="360":                الحجم 640 × 360    aspect-ratio: auto 640 / 360
بعد ما معلومات الفيديو وصلت (من غير width/height):  الحجم بقى 320 × 180
~~~

يعني من غير [[width]] و [[height]] الفيديو بيبدأ 300 × 150 وبعدين بيقفز لمقاسه الحقيقي، وكل اللي تحته بيتزق. دي نفس مشكلة الصور اللي في درس «CLS»، ونفس الحل.

---

## ٦. [[<video playsinline muted loop>]]

التلاتة دول مع [[autoplay]] هما فيديو الخلفية الصامت (اتبنى في درس «video و iframe»). كل واحد لوحده:

| attribute | بيعمل إيه |
|---|---|
| [[muted]] | يبدأ مكتوم. وهو الشرط اللي بيخلّي [[autoplay]] يشتغل على الفيديو (القياس في درس «audio و source» قسم ٦) |
| [[loop]] | يعيد من الأول لما يخلص |
| [[playsinline]] | على iPhone: الفيديو يشتغل في مكانه جوه الصفحة بدل ما يفتح ملو الشاشة. المواصفة بتقول إنه «بيشجّع» المتصفح على كده |

~~~text القياس من Chrome
<video playsinline muted loop>     playsInline = true    muted = true    loop = true
~~~

[[playsinline]] مبيغيّرش حاجة في Chrome على الكمبيوتر (الفيديو أصلًا بيشتغل في مكانه)، ووجوده مبيضرّش. تأثيره على iPhone من MDN، متقاسش هنا.

والفيديو اللي فيه كلام محدش بيحط عليه [[muted]] ولا [[loop]] ولا [[autoplay]]: الزائر يدوس ▶ بنفسه.

---

## ٧. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[kind="caption"]] (من غير s) | بقى [[metadata]]: مفيش كابشن، ومفيش رسالة |
| [[default]] على اتنين | الأول بس اللي بيشتغل |
| نسيان [[default]] خالص | الكابشن موجود ومقفول، ومعظم الزوار مش هيعرفوا |
| [[kind="subtitles"]] من غير [[srclang]] | مخالف للمواصفة، والمتصفح مش عارف لغة الملف |
| [[label="إنجليزي"]] على ترجمة إنجليزي | اللي محتاجها مش هيعرف يقرا اسمها |
| فاصلة في التوقيت [[00:00:02,000]] | الجملة دي بتختفي |
| [[<track>]] برّه [[<video>]] | بيتجاهل، والملف مبيتطلبش |
| فيديو من غير [[width]] و [[height]] | بيبدأ 300 × 150 وبعدين يقفز |
| الكلام محروق في الفيديو نفسه بدل [[<track>]] | مبيتقفلش، ومبيتكبرش، ومبيتدوّرش فيه |

---

## الخلاصة

- [[<track kind srclang label default>]] جوه [[<video>]]، وملفه [[.vtt]] من نفس الموقع.
- [[captions]] للي مش سامع (بالأصوات)، و [[subtitles]] للي مش فاهم اللغة. دول الاتنين اللي Chrome بيرسمهم.
- [[default]] على واحد بس، والباقي ملفاتهم مبتتحمّلش لحد ما حد يختارهم.
- غلطة في الـ VTT معناها جملة بتختفي في سكوت: عدّ الـ [[cues]] من الـ Console.
- [[poster]] للصورة، و [[width]] و [[height]] للمكان، و [[playsinline muted loop]] لفيديو الخلفية بس.`,
          try: R`في فولدر فيه فيديو قصير عندك (سمّيه [[clip.mp4]]): اكتب ملف [[clip.ar.vtt]] فيه تلات جمل (كل واحدة ثانيتين)، والتانية وصف صوت بين قوسين مربعين. واكتب [[watch.html]] فيها الفيديو بالـ track ده شغال من الأول. شغّل [[npx serve .]] وافتح الصفحة، وعدّ الـ cues من الـ Console. وبعدين غيّر النقطة في توقيت الجملة التانية لفاصلة، واعمل Ctrl+R وعدّ تاني.`,
          sol: R`~~~text clip.ar.vtt
WEBVTT

00:00.000 --> 00:02.000
أهلًا بيكم في المحطة.

00:02.000 --> 00:04.000
[موسيقى هادية]

00:04.000 --> 00:06.000
النهارده أول حلقة.
~~~

~~~html watch.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تجربة الكابشن</title>
</head>
<body>
<h1>تجربة الكابشن</h1>
<video controls width="640" height="360" src="clip.mp4">
  <track default kind="captions" srclang="ar" label="عربي" src="clip.ar.vtt">
</video>
</body>
</html>
~~~

~~~view 278 شكل watch.html (الفيديو والملف هنا مكتوبين جوه الصفحة)
<h1>تجربة الكابشن</h1>
<video controls width="320" height="180" src="data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAKjEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHWTbuMU6uEElTDZ1OsggEyTbuMU6uEHFO7a1OsggKN7AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmsCrXsYMPQkBNgIxMYXZmNjMuMS4xMDJXQYxMYXZmNjMuMS4xMDJEiYhAr0AAAAAAABZUrmvXrgEAAAAAAABO14EBc8WImSL+3MoIdEScgQAitZyDdW5kiIEAhoVWX1ZQOYOBASPjg4QdzWUA4JCwgaC6gVqagQJVsIRVuYEBVe6BAOwBAAAAAAAAAgAAElTDZ/5zc59jwIBnyJlFo4dFTkNPREVSRIeMTGF2ZjYzLjEuMTAyc3PZY8CLY8WImSL+3MoIdERnyKRFo4dFTkNPREVSRIeXTGF2YzYzLjEuMTAyIGxpYnZweC12cDlnyKFFo4hEVVJBVElPTkSHkzAwOjAwOjA0LjAwMDAwMDAwMAAfQ7Z1QNLngQCjrIEAAICCSYNCAAnwBZYAOCQcGU4AADBgAAATv/QgAAI/+zz///46VuMndD5Ao5WBAfQAhgBAkhwAXgAAAyAAAFn5huCjlYED6ACGAECSHABdAAADIAAAWfmG4KOVgQXcAIYAQJIcAF4AAAMgAABZ+Ybgo5WBB9AAhgBAkhwAW8AAAyAAAFn5huCjlYEJxACGAECSHABeAAADIAAAWfmG4KOVgQu4AIYAQJIcAF0AAAMgAABZ+Ybgo5WBDawAhgBAkhwAXgAAAyAAAFn5huAcU7trkbuPs4EAt4r3gQHxggG18IED">
  <track default kind="captions" srclang="ar" label="عربي" src="data:text/vtt,WEBVTT%0A%0A00:00.000 --> 00:02.000%0Aأهلًا بيكم في المحطة.%0A%0A00:02.000 --> 00:04.000%0A[موسيقى هادية]%0A%0A00:04.000 --> 00:06.000%0Aالنهارده أول حلقة.">
</video>
~~~

**هتشوف إيه:**

- دوس ▶: «أهلًا بيكم في المحطة» في أسفل الفيديو، وبعدها «[موسيقى هادية]»، وبعدها «النهارده أول حلقة» (الفيديو اللي في المعاينة ٤ ثواني، فالجملة التالتة مش هتلحق تظهر).
- بعد ما تغيّر [[00:02.000]] لـ [[00:02,000]]: الجملة التانية مبتظهرش، والأولى والتالتة زي ما هم.

**ليه [[npx serve .]]:** المتصفح بيرفض يقرا ملف VTT من [[file://]]، فلازم الصفحة تتفتح من سيرفر (اتشرح في درس «video و iframe»).

**الغلطة الشائعة:** تفضل تدوّر على رسالة خطأ. مفيش. الطريقة الوحيدة: تعدّ.

~~~text القياس من Chrome (في الـ Console)
> document.querySelector("video").textTracks[0].cues.length
3                                    ← الملف السليم
2                                    ← بعد الفاصلة: الجملة التانية اتشالت
~~~`,
          deep: {
            why: R`فيديو من غير كابشن مقفول قدام الأصم، وقدام كل اللي فاتحين الموبايل والصوت مقفول (في المواصلات، أو جنب حد نايم). والكلام المحروق جوه الصورة مبيحلّش: مبيتقفلش، ومبيتترجمش، ومحرك البحث مبيقراهوش. [[<track>]] بيخلّي الكلام ملف نص منفصل: يتصلّح في دقيقة، ويتعمل منه ١٠ لغات، والزائر يختار.`,
            how: R`المتصفح بيعمل لكل [[<track>]] كائن text track وبيحدد الـ [[mode]] بتاعه: اللي عليه [[default]] (ونوعه captions أو subtitles) بيبقى [[showing]]، والباقي [[disabled]]. الملف بيتطلب بس لما الـ mode ميبقاش [[disabled]]. الـ parser بيقرا [[WEBVTT]] وبعدين cue ورا cue، واللي سطر توقيته مش مظبوط بيتشال لوحده. ووقت التشغيل، مع كل تغيير في [[currentTime]] المتصفح بيشوف أنهي cues وقتها دلوقتي (اسمها [[activeCues]]) وبيرسمها في صندوق فوق الفيديو، وبيبعت حدث [[cuechange]].`,
            when: R`أي فيديو فيه كلام: [[captions]] بلغة الفيديو، و [[subtitles]] لكل لغة تانية جمهورك بيتكلمها. فيديو تعليمي طويل: [[chapters]] ومعاها قايمة فصول مكتوبة في الصفحة. [[poster]] دايمًا. و [[width]] و [[height]] دايمًا.`,
            mistakes: R`[[kind]] مكتوب غلط فالـ track بيبقى [[metadata]]. [[default]] على أكتر من واحد أو ولا واحد. ملف SRT متسمّي [[.vtt]]. فاصلة في التوقيت. فتح الصفحة من [[file://]] والاستغراب إن الكابشن مش ظاهر. ملف VTT من دومين تاني. و [[label]] بلغة غير لغة الترجمة.`
          },
          practice: [
            { lvl: 'تطبيق', t: R`**ابني:** فيديو «الدرس ١» في «المحطة» محطوط ومعاه ملفين نص جاهزين (العربي الأول والإنجليزي التاني)، بس الـ [[<track>]] ناقصهم كل حاجة غير [[src]]. كمّلهم: العربي كابشن وشغال من الأول، والإنجليزي ترجمة، وكل واحد بلغته واسمه. (من قسم ٢ في الشرح)`, done: R`لما تدوس ▶ الكابشن العربي بيظهر لوحده، وزرار CC فيه الاسمين، وكل الشروط ✓.`, work: { h: 250, start: R`<video controls width="320" height="180" src="data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAKjEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHWTbuMU6uEElTDZ1OsggEyTbuMU6uEHFO7a1OsggKN7AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmsCrXsYMPQkBNgIxMYXZmNjMuMS4xMDJXQYxMYXZmNjMuMS4xMDJEiYhAr0AAAAAAABZUrmvXrgEAAAAAAABO14EBc8WImSL+3MoIdEScgQAitZyDdW5kiIEAhoVWX1ZQOYOBASPjg4QdzWUA4JCwgaC6gVqagQJVsIRVuYEBVe6BAOwBAAAAAAAAAgAAElTDZ/5zc59jwIBnyJlFo4dFTkNPREVSRIeMTGF2ZjYzLjEuMTAyc3PZY8CLY8WImSL+3MoIdERnyKRFo4dFTkNPREVSRIeXTGF2YzYzLjEuMTAyIGxpYnZweC12cDlnyKFFo4hEVVJBVElPTkSHkzAwOjAwOjA0LjAwMDAwMDAwMAAfQ7Z1QNLngQCjrIEAAICCSYNCAAnwBZYAOCQcGU4AADBgAAATv/QgAAI/+zz///46VuMndD5Ao5WBAfQAhgBAkhwAXgAAAyAAAFn5huCjlYED6ACGAECSHABdAAADIAAAWfmG4KOVgQXcAIYAQJIcAF4AAAMgAABZ+Ybgo5WBB9AAhgBAkhwAW8AAAyAAAFn5huCjlYEJxACGAECSHABeAAADIAAAWfmG4KOVgQu4AIYAQJIcAF0AAAMgAABZ+Ybgo5WBDawAhgBAkhwAXgAAAyAAAFn5huAcU7trkbuPs4EAt4r3gQHxggG18IED">
  <track src="data:text/vtt,WEBVTT%0A%0A00:00.000 --> 00:02.000%0Aأهلًا بيكم في المحطة%0A%0A00:02.000 --> 00:04.000%0A[موسيقى هادية]">
  <track src="data:text/vtt,WEBVTT%0A%0A00:00.000 --> 00:02.000%0AWelcome to El-Mahatta%0A%0A00:02.000 --> 00:04.000%0A[soft music]">
</video>`, checks: [
              { say: R`الأول [[kind="captions"]] ولغته [[ar]]`, q: "video > track:first-of-type[kind=\"captions\"][srclang=\"ar\"]" },
              { say: R`التاني [[kind="subtitles"]] ولغته [[en]]`, q: "video > track:last-of-type[kind=\"subtitles\"][srclang=\"en\"]" },
              { say: R`الاتنين ليهم [[label]]`, q: "video > track[label]", n: 2 },
              { say: R`[[label]] بتاع الإنجليزي مكتوب إنجليزي`, q: "track[srclang=\"en\"][label=\"English\"]" },
              { say: R`[[default]] على العربي بس`, q: "track[default]", n: 1 },
              { say: R`العربي هو اللي عليه [[default]]`, q: "track[srclang=\"ar\"][default]" },
            ] }, sol: R`~~~live 206 الحل (دوس ▶)
<video controls width="320" height="180" src="data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAKjEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHWTbuMU6uEElTDZ1OsggEyTbuMU6uEHFO7a1OsggKN7AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmsCrXsYMPQkBNgIxMYXZmNjMuMS4xMDJXQYxMYXZmNjMuMS4xMDJEiYhAr0AAAAAAABZUrmvXrgEAAAAAAABO14EBc8WImSL+3MoIdEScgQAitZyDdW5kiIEAhoVWX1ZQOYOBASPjg4QdzWUA4JCwgaC6gVqagQJVsIRVuYEBVe6BAOwBAAAAAAAAAgAAElTDZ/5zc59jwIBnyJlFo4dFTkNPREVSRIeMTGF2ZjYzLjEuMTAyc3PZY8CLY8WImSL+3MoIdERnyKRFo4dFTkNPREVSRIeXTGF2YzYzLjEuMTAyIGxpYnZweC12cDlnyKFFo4hEVVJBVElPTkSHkzAwOjAwOjA0LjAwMDAwMDAwMAAfQ7Z1QNLngQCjrIEAAICCSYNCAAnwBZYAOCQcGU4AADBgAAATv/QgAAI/+zz///46VuMndD5Ao5WBAfQAhgBAkhwAXgAAAyAAAFn5huCjlYED6ACGAECSHABdAAADIAAAWfmG4KOVgQXcAIYAQJIcAF4AAAMgAABZ+Ybgo5WBB9AAhgBAkhwAW8AAAyAAAFn5huCjlYEJxACGAECSHABeAAADIAAAWfmG4KOVgQu4AIYAQJIcAF0AAAMgAABZ+Ybgo5WBDawAhgBAkhwAXgAAAyAAAFn5huAcU7trkbuPs4EAt4r3gQHxggG18IED">
  <track kind="captions" srclang="ar" label="عربي" default src="data:text/vtt,WEBVTT%0A%0A00:00.000 --> 00:02.000%0Aأهلًا بيكم في المحطة%0A%0A00:02.000 --> 00:04.000%0A[موسيقى هادية]">
  <track kind="subtitles" srclang="en" label="English" src="data:text/vtt,WEBVTT%0A%0A00:00.000 --> 00:02.000%0AWelcome to El-Mahatta%0A%0A00:02.000 --> 00:04.000%0A[soft music]">
</video>
~~~

**هتشوف إيه:**

- دوس ▶: «أهلًا بيكم في المحطة» بالعربي في أسفل الفيديو.
- دوس CC: القايمة فيها «عربي» و «English». اختار English: الجملة بتبقى «Welcome to El-Mahatta».

**ليه كده:**

- العربي [[captions]] لأن فيه «[موسيقى هادية]»: وصف صوت. الإنجليزي ترجمة حوار بس.
- [[default]] على لغة الفيديو الأصلية. الإنجليزي مقفول وملفه مبيتحمّلش لحد ما يتختار.

**الغلطة الشائعة:** [[default]] على الاتنين «عشان يبقوا جاهزين». الأول بس اللي هيشتغل.

~~~text القياس من Chrome
[0]  kind = captions    language = "ar"   label = "عربي"      mode = showing    cues = 2
[1]  kind = subtitles   language = "en"   label = "English"   mode = disabled   cues = null
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** فيديو «جولة في الاستوديو» كابشنه مش بيظهر. فيه ٤ مشاكل: [[kind]] مكتوب غلط، و [[default]] على الاتنين، والترجمة الإنجليزي من غير لغة، والـ track التالت برّه الفيديو. (من قسم ١ و ٢ و ٧ في الشرح)`, done: R`التلاتة جوه الفيديو، والعربي [[captions]] وعليه [[default]] لوحده، والإنجليزي ليه [[srclang]]، وكل الشروط ✓.`, work: { h: 250, start: R`<video controls width="320" height="180" src="data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAKjEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHWTbuMU6uEElTDZ1OsggEyTbuMU6uEHFO7a1OsggKN7AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmsCrXsYMPQkBNgIxMYXZmNjMuMS4xMDJXQYxMYXZmNjMuMS4xMDJEiYhAr0AAAAAAABZUrmvXrgEAAAAAAABO14EBc8WImSL+3MoIdEScgQAitZyDdW5kiIEAhoVWX1ZQOYOBASPjg4QdzWUA4JCwgaC6gVqagQJVsIRVuYEBVe6BAOwBAAAAAAAAAgAAElTDZ/5zc59jwIBnyJlFo4dFTkNPREVSRIeMTGF2ZjYzLjEuMTAyc3PZY8CLY8WImSL+3MoIdERnyKRFo4dFTkNPREVSRIeXTGF2YzYzLjEuMTAyIGxpYnZweC12cDlnyKFFo4hEVVJBVElPTkSHkzAwOjAwOjA0LjAwMDAwMDAwMAAfQ7Z1QNLngQCjrIEAAICCSYNCAAnwBZYAOCQcGU4AADBgAAATv/QgAAI/+zz///46VuMndD5Ao5WBAfQAhgBAkhwAXgAAAyAAAFn5huCjlYED6ACGAECSHABdAAADIAAAWfmG4KOVgQXcAIYAQJIcAF4AAAMgAABZ+Ybgo5WBB9AAhgBAkhwAW8AAAyAAAFn5huCjlYEJxACGAECSHABeAAADIAAAWfmG4KOVgQu4AIYAQJIcAF0AAAMgAABZ+Ybgo5WBDawAhgBAkhwAXgAAAyAAAFn5huAcU7trkbuPs4EAt4r3gQHxggG18IED">
  <track kind="caption" srclang="ar" label="عربي" default src="data:text/vtt,WEBVTT%0A%0A00:00.000 --> 00:02.000%0Aأهلًا بيكم في المحطة%0A%0A00:02.000 --> 00:04.000%0A[موسيقى هادية]">
  <track kind="subtitles" label="English" default src="data:text/vtt,WEBVTT%0A%0A00:00.000 --> 00:02.000%0AWelcome to El-Mahatta%0A%0A00:02.000 --> 00:04.000%0A[soft music]">
</video>
<track kind="chapters" srclang="ar" label="الفصول" src="media/tour.chapters.vtt">`, checks: [
              { say: R`العربي [[kind="captions"]]`, q: "track[srclang=\"ar\"][kind=\"captions\"]" },
              { say: R`مفيش [[kind="caption"]]`, q: "track[kind=\"caption\"]", n: 0 },
              { say: R`[[default]] على واحد بس، وهو العربي`, q: "track[default]", n: 1 },
              { say: R`الإنجليزي ليه [[srclang="en"]]`, q: "track[kind=\"subtitles\"][srclang=\"en\"]" },
              { say: R`التلاتة جوه [[<video>]]`, q: "video > track", n: 3 },
            ] }, sol: R`~~~live 206 بعد التصليح (دوس ▶)
<video controls width="320" height="180" src="data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAKjEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHWTbuMU6uEElTDZ1OsggEyTbuMU6uEHFO7a1OsggKN7AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmsCrXsYMPQkBNgIxMYXZmNjMuMS4xMDJXQYxMYXZmNjMuMS4xMDJEiYhAr0AAAAAAABZUrmvXrgEAAAAAAABO14EBc8WImSL+3MoIdEScgQAitZyDdW5kiIEAhoVWX1ZQOYOBASPjg4QdzWUA4JCwgaC6gVqagQJVsIRVuYEBVe6BAOwBAAAAAAAAAgAAElTDZ/5zc59jwIBnyJlFo4dFTkNPREVSRIeMTGF2ZjYzLjEuMTAyc3PZY8CLY8WImSL+3MoIdERnyKRFo4dFTkNPREVSRIeXTGF2YzYzLjEuMTAyIGxpYnZweC12cDlnyKFFo4hEVVJBVElPTkSHkzAwOjAwOjA0LjAwMDAwMDAwMAAfQ7Z1QNLngQCjrIEAAICCSYNCAAnwBZYAOCQcGU4AADBgAAATv/QgAAI/+zz///46VuMndD5Ao5WBAfQAhgBAkhwAXgAAAyAAAFn5huCjlYED6ACGAECSHABdAAADIAAAWfmG4KOVgQXcAIYAQJIcAF4AAAMgAABZ+Ybgo5WBB9AAhgBAkhwAW8AAAyAAAFn5huCjlYEJxACGAECSHABeAAADIAAAWfmG4KOVgQu4AIYAQJIcAF0AAAMgAABZ+Ybgo5WBDawAhgBAkhwAXgAAAyAAAFn5huAcU7trkbuPs4EAt4r3gQHxggG18IED">
  <track kind="captions" srclang="ar" label="عربي" default src="data:text/vtt,WEBVTT%0A%0A00:00.000 --> 00:02.000%0Aأهلًا بيكم في المحطة%0A%0A00:02.000 --> 00:04.000%0A[موسيقى هادية]">
  <track kind="subtitles" srclang="en" label="English" src="data:text/vtt,WEBVTT%0A%0A00:00.000 --> 00:02.000%0AWelcome to El-Mahatta%0A%0A00:02.000 --> 00:04.000%0A[soft music]">
  <track kind="chapters" srclang="ar" label="الفصول" src="media/tour.chapters.vtt">
</video>
~~~

وده اللي كان باين قبل التصليح:

~~~live 206 قبل (دوس ▶)
<video controls width="320" height="180" src="data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAKjEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHWTbuMU6uEElTDZ1OsggEyTbuMU6uEHFO7a1OsggKN7AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmsCrXsYMPQkBNgIxMYXZmNjMuMS4xMDJXQYxMYXZmNjMuMS4xMDJEiYhAr0AAAAAAABZUrmvXrgEAAAAAAABO14EBc8WImSL+3MoIdEScgQAitZyDdW5kiIEAhoVWX1ZQOYOBASPjg4QdzWUA4JCwgaC6gVqagQJVsIRVuYEBVe6BAOwBAAAAAAAAAgAAElTDZ/5zc59jwIBnyJlFo4dFTkNPREVSRIeMTGF2ZjYzLjEuMTAyc3PZY8CLY8WImSL+3MoIdERnyKRFo4dFTkNPREVSRIeXTGF2YzYzLjEuMTAyIGxpYnZweC12cDlnyKFFo4hEVVJBVElPTkSHkzAwOjAwOjA0LjAwMDAwMDAwMAAfQ7Z1QNLngQCjrIEAAICCSYNCAAnwBZYAOCQcGU4AADBgAAATv/QgAAI/+zz///46VuMndD5Ao5WBAfQAhgBAkhwAXgAAAyAAAFn5huCjlYED6ACGAECSHABdAAADIAAAWfmG4KOVgQXcAIYAQJIcAF4AAAMgAABZ+Ybgo5WBB9AAhgBAkhwAW8AAAyAAAFn5huCjlYEJxACGAECSHABeAAADIAAAWfmG4KOVgQu4AIYAQJIcAF0AAAMgAABZ+Ybgo5WBDawAhgBAkhwAXgAAAyAAAFn5huAcU7trkbuPs4EAt4r3gQHxggG18IED">
  <track kind="caption" srclang="ar" label="عربي" default src="data:text/vtt,WEBVTT%0A%0A00:00.000 --> 00:02.000%0Aأهلًا بيكم في المحطة%0A%0A00:02.000 --> 00:04.000%0A[موسيقى هادية]">
  <track kind="subtitles" label="English" default src="data:text/vtt,WEBVTT%0A%0A00:00.000 --> 00:02.000%0AWelcome to El-Mahatta%0A%0A00:02.000 --> 00:04.000%0A[soft music]">
</video>
<track kind="chapters" srclang="ar" label="الفصول" src="media/tour.chapters.vtt">
~~~

**هتشوف إيه:**

- قبل: لما تدوس ▶ بيظهر الإنجليزي «Welcome to El-Mahatta». العربي مش بيظهر.
- بعد: العربي هو اللي بيظهر، والإنجليزي في القايمة.

| المشكلة | التصليح | ليه |
|---|---|---|
| [[kind="caption"]] | [[captions]] | القيمة الغلط بتتحوّل [[metadata]]، وده مبيترسمش |
| [[default]] على الاتنين | اتشال من الإنجليزي | واحد بس لكل فيديو |
| ترجمة من غير [[srclang]] | [[srclang="en"]] | إجباري مع [[subtitles]] |
| [[<track>]] برّه [[<video>]] | دخل جواه | برّه بيتجاهل |

**الغلطة الشائعة:** تدوّر على الغلط في ملف الـ VTT وهو سليم. لما الكابشن ميظهرش، بص على [[kind]] الأول.

~~~text القياس من Chrome
قبل:   [0] kind = metadata   mode = hidden       [1] kind = subtitles  language = ""  mode = showing
       التالت (برّه الفيديو): مش في textTracks، وملفه متطلبش
بعد:   [0] kind = captions   mode = showing      [1] subtitles  en  disabled      [2] chapters  disabled
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ (ملف VTT):** ملف كابشن مقدمة «المحطة» فيه ٤ جمل، ومبيظهرش منه ولا واحدة. صلّحه لحد ما الأربعة يظهروا، وزوّد مين بيتكلم في آخر جملتين. (من قسم ٣ في الشرح)

~~~text intro.ar.vtt (البايظ)
VTT

00:00.000 --> 00:02.000
أهلًا بيكم في المحطة.

00:00:02,000 --> 00:00:04,000
[موسيقى المقدمة]

00:04.000 -> 00:06.000
معاكم منى.

0:06.000 --> 0:08.000
ومعاكم كريم.
~~~`, done: R`في الـ Console: [[textTracks[0].cues.length]] بقى [[4]] بعد ما كان [[0]].`, sol: R`~~~text intro.ar.vtt
WEBVTT

00:00.000 --> 00:02.000
أهلًا بيكم في المحطة.

00:00:02.000 --> 00:00:04.000
[موسيقى المقدمة]

00:04.000 --> 00:06.000
<v منى>معاكم منى.

00:06.000 --> 00:08.000
<v كريم>ومعاكم كريم.
~~~

| السطر | الغلطة | التصليح |
|---|---|---|
| ١ | [[VTT]] | [[WEBVTT]] بالظبط. دي اللي كانت مانعة الملف كله |
| ٦ | [[00:00:02,000]] فاصلة | نقطة: [[00:00:02.000]] |
| ٩ | [[->]] شرطة واحدة | [[-->]] شرطتين |
| ١٢ | [[0:06.000]] الدقايق رقم واحد | رقمين: [[00:06.000]] |

**ليه بالترتيب ده:** صلّح السطر الأول الأول. طول ما هو غلط، الملف كله مرفوض ومش هتعرف باقي الغلطات اتصلّحت ولا لأ. بعده، كل غلطة بتشيل جملتها بس.

**الغلطة الشائعة:** تصلّح [[WEBVTT]] وتلاقي جملة واحدة ظهرت، فتفتكر إن الباقي «لسه بيتحمّل». هو مش هييجي: عدّ الـ cues.

~~~text القياس من Chrome
الملف البايظ:                         cues = 0    readyState = ERROR
بعد تصليح السطر الأول بس:             cues = 1    (أهلًا بيكم في المحطة.)
بعد تصليح الأربعة:                    cues = 4    readyState = LOADED
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع، وبعدين صلّح:** الفيديو ده عليه تلات tracks. اكتب على ورقة: أنهي واحد هيظهر لما تدوس ▶؟ وأنهي ملف مش هيتحمّل خالص؟ وبعدين خلّي العربي هو اللي يظهر من الأول. (من قسم ٢ في الشرح، جزء [[default]])`, done: R`كتبت توقّعك، والعربي بقى عليه [[default]] لوحده من الـ tracks اللي بتترسم، وكل الشروط ✓.`, work: { h: 250, start: R`<video controls width="320" height="180" src="data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAKjEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHWTbuMU6uEElTDZ1OsggEyTbuMU6uEHFO7a1OsggKN7AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmsCrXsYMPQkBNgIxMYXZmNjMuMS4xMDJXQYxMYXZmNjMuMS4xMDJEiYhAr0AAAAAAABZUrmvXrgEAAAAAAABO14EBc8WImSL+3MoIdEScgQAitZyDdW5kiIEAhoVWX1ZQOYOBASPjg4QdzWUA4JCwgaC6gVqagQJVsIRVuYEBVe6BAOwBAAAAAAAAAgAAElTDZ/5zc59jwIBnyJlFo4dFTkNPREVSRIeMTGF2ZjYzLjEuMTAyc3PZY8CLY8WImSL+3MoIdERnyKRFo4dFTkNPREVSRIeXTGF2YzYzLjEuMTAyIGxpYnZweC12cDlnyKFFo4hEVVJBVElPTkSHkzAwOjAwOjA0LjAwMDAwMDAwMAAfQ7Z1QNLngQCjrIEAAICCSYNCAAnwBZYAOCQcGU4AADBgAAATv/QgAAI/+zz///46VuMndD5Ao5WBAfQAhgBAkhwAXgAAAyAAAFn5huCjlYED6ACGAECSHABdAAADIAAAWfmG4KOVgQXcAIYAQJIcAF4AAAMgAABZ+Ybgo5WBB9AAhgBAkhwAW8AAAyAAAFn5huCjlYEJxACGAECSHABeAAADIAAAWfmG4KOVgQu4AIYAQJIcAF0AAAMgAABZ+Ybgo5WBDawAhgBAkhwAXgAAAyAAAFn5huAcU7trkbuPs4EAt4r3gQHxggG18IED">
  <track kind="captions" srclang="ar" label="عربي" src="data:text/vtt,WEBVTT%0A%0A00:00.000 --> 00:02.000%0Aأهلًا بيكم في المحطة%0A%0A00:02.000 --> 00:04.000%0A[موسيقى هادية]">
  <track kind="subtitles" srclang="en" label="English" default src="data:text/vtt,WEBVTT%0A%0A00:00.000 --> 00:02.000%0AWelcome to El-Mahatta%0A%0A00:02.000 --> 00:04.000%0A[soft music]">
  <track kind="chapters" srclang="ar" label="الفصول" default src="media/ep1.chapters.vtt">
</video>`, checks: [
              { say: R`العربي عليه [[default]]`, q: "track[kind=\"captions\"][srclang=\"ar\"][default]" },
              { say: R`الإنجليزي مفيهوش [[default]]`, q: "track[srclang=\"en\"][default]", n: 0 },
              { say: R`التلاتة لسه موجودين جوه الفيديو`, q: "video > track", n: 3 },
            ] }, sol: R`~~~live 206 بعد التعديل (دوس ▶)
<video controls width="320" height="180" src="data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAKjEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHWTbuMU6uEElTDZ1OsggEyTbuMU6uEHFO7a1OsggKN7AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmsCrXsYMPQkBNgIxMYXZmNjMuMS4xMDJXQYxMYXZmNjMuMS4xMDJEiYhAr0AAAAAAABZUrmvXrgEAAAAAAABO14EBc8WImSL+3MoIdEScgQAitZyDdW5kiIEAhoVWX1ZQOYOBASPjg4QdzWUA4JCwgaC6gVqagQJVsIRVuYEBVe6BAOwBAAAAAAAAAgAAElTDZ/5zc59jwIBnyJlFo4dFTkNPREVSRIeMTGF2ZjYzLjEuMTAyc3PZY8CLY8WImSL+3MoIdERnyKRFo4dFTkNPREVSRIeXTGF2YzYzLjEuMTAyIGxpYnZweC12cDlnyKFFo4hEVVJBVElPTkSHkzAwOjAwOjA0LjAwMDAwMDAwMAAfQ7Z1QNLngQCjrIEAAICCSYNCAAnwBZYAOCQcGU4AADBgAAATv/QgAAI/+zz///46VuMndD5Ao5WBAfQAhgBAkhwAXgAAAyAAAFn5huCjlYED6ACGAECSHABdAAADIAAAWfmG4KOVgQXcAIYAQJIcAF4AAAMgAABZ+Ybgo5WBB9AAhgBAkhwAW8AAAyAAAFn5huCjlYEJxACGAECSHABeAAADIAAAWfmG4KOVgQu4AIYAQJIcAF0AAAMgAABZ+Ybgo5WBDawAhgBAkhwAXgAAAyAAAFn5huAcU7trkbuPs4EAt4r3gQHxggG18IED">
  <track kind="captions" srclang="ar" label="عربي" default src="data:text/vtt,WEBVTT%0A%0A00:00.000 --> 00:02.000%0Aأهلًا بيكم في المحطة%0A%0A00:02.000 --> 00:04.000%0A[موسيقى هادية]">
  <track kind="subtitles" srclang="en" label="English" src="data:text/vtt,WEBVTT%0A%0A00:00.000 --> 00:02.000%0AWelcome to El-Mahatta%0A%0A00:02.000 --> 00:04.000%0A[soft music]">
  <track kind="chapters" srclang="ar" label="الفصول" default src="media/ep1.chapters.vtt">
</video>
~~~

**التوقّع:** قبل التعديل الإنجليزي هو اللي بيظهر (عليه [[default]])، وملف العربي مبيتطلبش من السيرفر خالص. والفصول عليها [[default]] برده، فملفها بيتحمّل، بس مبتترسمش.

**هتشوف إيه:** قبل: «Welcome to El-Mahatta». بعد: «أهلًا بيكم في المحطة».

**ليه [[default]] على الفصول مش مشكلة:** قاعدة «واحد بس» في Chrome طلعت بتتحسب لكل مجموعة: الكابشن والترجمة مجموعة، والفصول مجموعة لوحدها. بس MDN بيقول واحد لكل فيديو، فالأضمن تشيله من الفصول لو مش محتاجه.

**الغلطة الشائعة:** تفتكر إن لغة المتصفح هي اللي بتختار. من غير [[default]] مفيش حاجة بتظهر لوحدها في Chrome.

~~~text القياس من Chrome (قبل التعديل)
[0] captions  ar   mode = disabled   cues = null   (الملف متطلبش)
[1] subtitles en   mode = showing    cues = 2
[2] chapters  ar   mode = showing    cues = 2      (محمّل، ومش مرسوم)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** كارت «شاهد الدرس ٢»: الفيديو محتاج يحجز مكانه (320 × 180) قبل ما يتحمّل، ويعرض صورة لحد ما حد يدوس، وميحمّلش أي حاجة من الملف قبلها، ومن غير تشغيل تلقائي. الصورة جاهزة في البداية في [[<img>]] صغير: انقل عنوانها ([[src]]) لمكانها الصح على الفيديو وامسح الـ [[<img>]]. (من قسم ٥ و ٦ في الشرح)`, done: R`الصورة «الحلقة ١» ظاهرة مكان الفيديو بمقاس 320 × 180، وكل الشروط ✓.`, work: { h: 250, start: R`<h2>شاهد الدرس ٢</h2>
<img alt="" width="96" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'%3E%3Crect width='320' height='180' fill='%230f766e'/%3E%3Ctext x='160' y='100' font-size='30' fill='white' text-anchor='middle'%3Eالحلقة ١%3C/text%3E%3C/svg%3E">
<video src="data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAKjEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHWTbuMU6uEElTDZ1OsggEyTbuMU6uEHFO7a1OsggKN7AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmsCrXsYMPQkBNgIxMYXZmNjMuMS4xMDJXQYxMYXZmNjMuMS4xMDJEiYhAr0AAAAAAABZUrmvXrgEAAAAAAABO14EBc8WImSL+3MoIdEScgQAitZyDdW5kiIEAhoVWX1ZQOYOBASPjg4QdzWUA4JCwgaC6gVqagQJVsIRVuYEBVe6BAOwBAAAAAAAAAgAAElTDZ/5zc59jwIBnyJlFo4dFTkNPREVSRIeMTGF2ZjYzLjEuMTAyc3PZY8CLY8WImSL+3MoIdERnyKRFo4dFTkNPREVSRIeXTGF2YzYzLjEuMTAyIGxpYnZweC12cDlnyKFFo4hEVVJBVElPTkSHkzAwOjAwOjA0LjAwMDAwMDAwMAAfQ7Z1QNLngQCjrIEAAICCSYNCAAnwBZYAOCQcGU4AADBgAAATv/QgAAI/+zz///46VuMndD5Ao5WBAfQAhgBAkhwAXgAAAyAAAFn5huCjlYED6ACGAECSHABdAAADIAAAWfmG4KOVgQXcAIYAQJIcAF4AAAMgAABZ+Ybgo5WBB9AAhgBAkhwAW8AAAyAAAFn5huCjlYEJxACGAECSHABeAAADIAAAWfmG4KOVgQu4AIYAQJIcAF0AAAMgAABZ+Ybgo5WBDawAhgBAkhwAXgAAAyAAAFn5huAcU7trkbuPs4EAt4r3gQHxggG18IED"></video>`, checks: [
              { say: R`الفيديو عليه [[controls]]`, q: "video[controls]" },
              { say: R`ليه [[width="320"]] و [[height="180"]]`, q: "video[width=\"320\"][height=\"180\"]" },
              { say: R`ليه [[poster]]`, q: "video[poster^=\"data:image\"]" },
              { say: R`[[preload="none"]]`, q: "video[preload=\"none\"]" },
              { say: R`مفيش [[autoplay]]`, q: "video[autoplay]", n: 0 },
              { say: R`الـ [[<img>]] الصغير اتمسح`, q: "img", n: 0 },
            ] }, sol: R`~~~live 266 الحل
<h2>شاهد الدرس ٢</h2>
<video controls width="320" height="180" preload="none" poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'%3E%3Crect width='320' height='180' fill='%230f766e'/%3E%3Ctext x='160' y='100' font-size='30' fill='white' text-anchor='middle'%3Eالحلقة ١%3C/text%3E%3C/svg%3E" src="data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAKjEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHWTbuMU6uEElTDZ1OsggEyTbuMU6uEHFO7a1OsggKN7AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmsCrXsYMPQkBNgIxMYXZmNjMuMS4xMDJXQYxMYXZmNjMuMS4xMDJEiYhAr0AAAAAAABZUrmvXrgEAAAAAAABO14EBc8WImSL+3MoIdEScgQAitZyDdW5kiIEAhoVWX1ZQOYOBASPjg4QdzWUA4JCwgaC6gVqagQJVsIRVuYEBVe6BAOwBAAAAAAAAAgAAElTDZ/5zc59jwIBnyJlFo4dFTkNPREVSRIeMTGF2ZjYzLjEuMTAyc3PZY8CLY8WImSL+3MoIdERnyKRFo4dFTkNPREVSRIeXTGF2YzYzLjEuMTAyIGxpYnZweC12cDlnyKFFo4hEVVJBVElPTkSHkzAwOjAwOjA0LjAwMDAwMDAwMAAfQ7Z1QNLngQCjrIEAAICCSYNCAAnwBZYAOCQcGU4AADBgAAATv/QgAAI/+zz///46VuMndD5Ao5WBAfQAhgBAkhwAXgAAAyAAAFn5huCjlYED6ACGAECSHABdAAADIAAAWfmG4KOVgQXcAIYAQJIcAF4AAAMgAABZ+Ybgo5WBB9AAhgBAkhwAW8AAAyAAAFn5huCjlYEJxACGAECSHABeAAADIAAAWfmG4KOVgQu4AIYAQJIcAF0AAAMgAABZ+Ybgo5WBDawAhgBAkhwAXgAAAyAAAFn5huAcU7trkbuPs4EAt4r3gQHxggG18IED"></video>
~~~

**هتشوف إيه:** تحت العنوان مستطيل أخضر مكتوب عليه «الحلقة ١» وعليه أزرار المشغّل. في البداية كانت الصورة لوحدها صغيرة، وتحتها فيديو من غير أزرار.

**ليه كده:**

- [[width]] و [[height]]: المكان محجوز من أول لحظة، فاللي تحت الفيديو مبيتزقش.
- [[poster]]: مع [[preload="none"]] مفيش أول frame يتعرض، فمن غيرها المكان يبقى أسود.
- [[preload="none"]]: مناسب لصفحة فيها دروس كتير.

**الغلطة الشائعة:** [[poster]] مقاسه غير مقاس الفيديو، ومن غير [[width]] و [[height]]. الفيديو بياخد مقاس الصورة الأول، وبعدين يتغيّر لما يشتغل.

~~~text القياس من Chrome
قبل التحميل:   الحجم 320 × 180    readyState = 0    aspect-ratio: auto 320 / 180
~~~` },
            { lvl: 'سريع', t: R`**اشرحها:** لكل حالة قول محتاجة إيه (captions ولا subtitles ولا نص مكتوب في الصفحة ولا أكتر من واحد) وليه، في سطر: (١) درس طبخ بالعربي لجمهور عربي. (٢) نفس الدرس وعايز توصل لناس بتتكلم إنجليزي. (٣) حلقة بودكاست صوت بس. (من قسم ٤ في الشرح)`, done: R`تلات إجابات، كل واحدة فيها النوع والسبب.`, sol: R`إجابة نموذجية:

1. **captions بالعربي.** اللغة مفهومة، فالمحتاج هو اللي مش سامع: يتكتب الكلام ومعاه الأصوات اللي ليها معنى («[صوت الزيت بيطشّ]»). ومعاه المقادير مكتوبة في الصفحة.
2. **subtitles بالإنجليزي، ومعاها الـ captions العربي.** الترجمة للي سامع ومش فاهم. والاتنين مع بعض في نفس الفيديو: [[default]] على العربي.
3. **نص مكتوب (transcript) في الصفحة.** [[<audio>]] مبيرسمش كابشن (درس «audio و source» قسم ٨)، فالكلام كله يتكتب HTML تحت المشغّل. ولو عايز الكلام يظهر مع الصوت في وقته: شغّل الملف في [[<video>]] بـ [[poster]] وحط عليه [[<track>]].

**الغلطة الشائعة:** تعتبر الترجمة الإنجليزي «كابشن» وتقول الفيديو accessible. الأصم العربي لسه مش واصله حاجة.` },
          ]
        },
        {
          cmd: "iframe sandbox و allow",
          title: "صفحة من موقع تاني جوه صفحتك: تقفل عليها إيه وتسمحلها بإيه",
          pre: [{ to: "css/video و iframe", why: R`[[<iframe>]] نفسه و [[title]] و [[loading="lazy"]] والـ facade بتاع يوتيوب اتشرحوا هناك. الدرس ده بيكمّل بالأمان: [[sandbox]] و [[allow]] و [[srcdoc]] و [[referrerpolicy]]` }],
          ref: [
            { t: "MDN: <iframe>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe" },
            { t: "MDN: Permissions Policy", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Permissions_Policy" },
            { t: "WHATWG: the iframe element", url: "https://html.spec.whatwg.org/multipage/iframe-embed-object.html#the-iframe-element" },
            { t: "WHATWG: sandboxing", url: "https://html.spec.whatwg.org/multipage/browsers.html#sandboxing" }
          ],
          desc: R`[[<iframe>]] بيفتح صفحة كاملة جوه صفحتك: مشغّل فيديو، خريطة، فورم دفع. الصفحة دي كود مش بتاعك، فالسؤال: مسموحلها تعمل إيه؟ [[sandbox]] بيقفل عليها كل حاجة (سكربتات، فورم، نوافذ) وانت بتفتح اللي محتاجاه بالاسم. و [[allow]] بيدّيها صلاحيات الجهاز (ملو الشاشة، الكاميرا، المكان).
ومعاهم: [[srcdoc]] (محتوى الـ iframe مكتوب في نفس الملف)، و [[loading="lazy"]]، و [[referrerpolicy]]، و [[title]] اللي من غيره قارئ الشاشة مش عارف الصندوق ده إيه.`,
          example: R`<iframe src="https://player.example.test/embed/ep1"
        title="فيديو الحلقة ١ من بودكاست المحطة"
        width="560" height="315"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-presentation"
        allow="fullscreen; picture-in-picture"
        referrerpolicy="strict-origin-when-cross-origin"></iframe>
<iframe srcdoc="<p>أهلًا من جوه الـ iframe</p>" title="بطاقة ترحيب" width="300" height="80" sandbox></iframe>`,
          flag: "script",
          lines: [
            R`[[src]] عنوان الصفحة اللي هتتفتح جوه. هنا مشغّل فيديو عند مزوّد متخيل ([[player.example.test]])، وده الشكل اللي بييجي في «كود التضمين» من أي خدمة فيديو.`,
            R`[[title]] اسم الـ iframe. قارئ الشاشة بيقراه قبل ما يدخل جوه، فاكتب فيه المحتوى مش «iframe» ولا «فيديو».`,
            R`المقاس بالبيكسل. من غيره الـ iframe بيبقى 300 × 150 مهما كان اللي جواه.`,
            R`[[loading="lazy"]]: الصفحة اللي جوه متتحمّلش غير لما الزائر يقرّب منها بالـ scroll.`,
            R`[[sandbox]] بيقفل كل حاجة، والتلات كلمات بيفتحوا: السكربتات، وإن الصفحة تفضل على الـ origin بتاعها (عشان الـ cookies والتخزين بتوع المزوّد يشتغلوا)، والعرض على شاشة خارجية.`,
            R`[[allow]] صلاحيات الجهاز: ملو الشاشة، وصورة جوه صورة. كل صلاحية باسمها وبينهم [[;]].`,
            R`[[referrerpolicy]]: المزوّد يعرف إيه عن الصفحة اللي الطلب جاي منها. القيمة دي بتبعت اسم موقعك بس من غير مسار الصفحة، وهي الافتراضية، ومكتوبة هنا عشان تبان. وبعدها قفلة [[</iframe>]]، وهي إجبارية.`,
            R`iframe محتواه مكتوب في [[srcdoc]] بدل ما ييجي من عنوان، وعليه [[sandbox]] فاضي: كل القيود شغالة، وده كفاية لمحتوى ثابت.`
          ],
          teach: R`## الفكرة في سطرين

المواصفة: [[<iframe>]] بيمثّل «navigable» جوه الصفحة، يعني نافذة متصفح صغيرة ليها صفحتها وعنوانها وسكربتاتها. والقاعدة الأمنية اللي فوق كل ده اسمها same-origin policy: صفحتين من موقعين مختلفين مبيقروش بعض.

القياسات من Chrome 157 على Windows 11، على صفحتين من سيرفر Node محلي على بورتين ([[127.0.0.1:8731]] للصفحة الأم، و [[127.0.0.1:8732]] كـ «موقع تاني»: بورت مختلف يعني origin مختلف). الصفحة اللي جوه بتبعت للأم اللي قدرت تعمله، والسيرفر بيكتب كل طلب وصله.

---

## ١. الـ iframe صفحة لوحدها

~~~live 132 iframe محتواه مكتوب جوه الكود
<p>ده كلام في الصفحة الأم.</p>
<iframe srcdoc="<p>وده كلام في صفحة تانية جوه iframe.</p>" title="مثال iframe" width="300" height="60"></iframe>
~~~

**هتشوف إيه:** السطر الأول، وتحته صندوق ليه برواز رفيع جواه السطر التاني. الخط جوه الصندوق مختلف واتجاهه من الشمال: دي صفحة تانية، مبتورّثش أي CSS ولا [[dir]] من صفحتك.

~~~text القياس من Chrome
<iframe> من غير أي attribute:     المحتوى 300 × 150    البرواز 2px inset    display: inline
الصفحة الأم بتقرا iframe من نفس الموقع:     contentDocument موجود
الصفحة الأم بتقرا iframe من موقع تاني:      contentDocument = null
الصفحة اللي جوه (من موقع تاني) بتقرا الأم:  SecurityError
~~~

- [[contentDocument]]: صفحة الـ iframe زي ما الأم شايفاها من JavaScript. [[null]] يعني ممنوع.
- الـ iframe مبيكبرش على قد اللي جواه. المقاس منك انت: [[width]] و [[height]]، أو CSS (تمرين الـ [[aspect-ratio]] في درس «video و iframe»).
- البرواز بيتشال بـ [[border: 0]] في الـ CSS.

---

## ٢. [[<iframe srcdoc="...">]]

[[srcdoc]] بياخد HTML مكتوب، والمتصفح بيعمل منه صفحة الـ iframe من غير أي طلب للسيرفر.

~~~text القياس من Chrome
<iframe src="far.html" srcdoc="<p>من srcdoc</p>">
   اللي اتعرض: «من srcdoc»       far.html متطلبش من السيرفر خالص   ← srcdoc بيكسب
جوه الـ iframe:
   location.href = about:srcdoc
   origin        = http://127.0.0.1:8731     ← نفس origin الصفحة الأم
   والصفحة اللي جوه قرت عنوان الأم (parent.document.title) عادي
مع sandbox="allow-scripts":
   origin        = null
~~~

- [[srcdoc]] من غير [[sandbox]] **جزء من موقعك**: نفس الـ origin، ويقدر يقرا صفحتك ويغيّرها. فلو المحتوى جاي من مستخدم (تعليق، إيميل، معاينة كود)، لازم معاه [[sandbox]].
- علامة [["]] جوه [[srcdoc]] بتتكتب [[&quot;]]، و [[&]] بتتكتب [[&amp;]]، لأن القيمة كلها جوه علامتين تنصيص.
- المعاينات الحية في الموقع ده معمولة بالظبط كده: [[<iframe sandbox="allow-scripts allow-forms" srcdoc="...">]].

---

## ٣. [[<iframe sandbox>]]: اقفل كل حاجة، وافتح اللي محتاجه

[[sandbox]] لوحده (من غير قيمة) بيشغّل **كل** القيود. وكل كلمة تتكتب في قيمته بتشيل قيد واحد.

~~~live 86 150 نفس الصفحة مرتين: بـ sandbox فاضي، وبـ allow-scripts
<iframe sandbox title="sandbox فاضي" width="230" height="56"
  srcdoc="<noscript>السكربتات مقفولة</noscript><script>document.write('السكربت اشتغل')</script>"></iframe>
<iframe sandbox="allow-scripts" title="sandbox مع allow-scripts" width="230" height="56"
  srcdoc="<noscript>السكربتات مقفولة</noscript><script>document.write('السكربت اشتغل')</script>"></iframe>
~~~

**هتشوف إيه:** صندوقين جواهم نفس الكود. الأول مكتوب فيه «السكربتات مقفولة» (ده محتوى [[<noscript>]]، درس «canvas و noscript و template»)، والتاني «السكربت اشتغل».

ده اللي اتقاس لكل قيد، على صفحة من نفس السيرفر:

| الحاجة | من غير [[sandbox]] | بـ [[sandbox]] فاضي | الكلمة اللي بتفتحها |
|---|---|---|---|
| السكربتات | بتشتغل | مقفولة | [[allow-scripts]] |
| إرسال فورم | بيتبعت | مبيتبعتش | [[allow-forms]] |
| الـ origin | [[http://127.0.0.1:8731]] | [[null]]: مفيش cookies ولا [[localStorage]] (بيرموا [[SecurityError]]) | [[allow-same-origin]] |
| [[alert()]] و [[confirm()]] و [[print()]] | بيظهروا | بيتجاهلوا | [[allow-modals]] |
| إنها تنقل الصفحة الأم لعنوان تاني ([[top.location]]) | مسموح بشروط | [[SecurityError]] | [[allow-top-navigation-by-user-activation]] |
| نافذة جديدة ([[target="_blank"]]) | مسموح | بيفشل في سكوت (MDN) | [[allow-popups]] |
| تنزيل ملف | مسموح | ممنوع (MDN) | [[allow-downloads]] |

~~~text رسايل Chrome بنصها (من الـ Console)
Blocked script execution in 'http://127.0.0.1:8731/child.html?t=s5' because the document's frame is sandboxed and the 'allow-scripts' permission is not set.

Blocked form submission to 'http://127.0.0.1:8731/submitted?tag=s3' because the form's frame is sandboxed and the 'allow-forms' permission is not set.

Ignored call to 'alert()'. The document is sandboxed, and the 'allow-modals' keyword is not set.

Unsafe attempt to initiate navigation for frame with URL 'http://127.0.0.1:8731/if1.html' from frame with URL 'http://127.0.0.1:8731/child.html?t=s3'. The frame attempting navigation of the top-level window is sandboxed, but the flag of 'allow-top-navigation' or 'allow-top-navigation-by-user-activation' is not set.
~~~

وملاحظة من القياس: بـ [[sandbox="allow-scripts"]] الصفحة اتعاملت كـ origin مجهول، **حتى وهي من نفس السيرفر**. يعني مش قادرة تقرا صفحتك، ولا الـ cookies بتاعة موقعك.

### [[allow-scripts]] مع [[allow-same-origin]]: إمتى خطر

~~~text القياس من Chrome (صفحة من نفس موقعك، وعليها الاتنين)
جوه الـ iframe:   origin = http://127.0.0.1:8731    parent.document.title = "parent page"   ← قرت الصفحة الأم
تحذير Chrome:
An iframe which has both allow-scripts and allow-same-origin for its sandbox attribute can escape its sandboxing.
~~~

صفحة **من موقعك** معاها الاتنين تقدر توصل لعنصر الـ [[<iframe>]] نفسه في الصفحة الأم وتمسح منه [[sandbox]]. يعني القفل ملوش لازمة. MDN: ده «strongly discouraged».

أما صفحة **من موقع تاني** (مشغّل فيديو، خريطة) فالاتنين مع بعض عادي ومطلوب غالبًا: [[allow-same-origin]] بيخلّيها على الـ origin **بتاعها هي** (مش بتاعك)، فتقدر تستخدم الـ cookies والتخزين بتوعها، ولسه مش قادرة تقرا صفحتك.

### تختار الكلمات إزاي

1. ابدأ بـ [[sandbox]] فاضي.
2. افتح الصفحة و DevTools › Console. كل حاجة اتمنعت ليها رسالة فيها اسم الكلمة الناقصة.
3. زوّد الكلمة دي بس، وجرّب تاني.

| المحتوى | [[sandbox]] المناسب |
|---|---|
| HTML ثابت (معاينة رسالة، بطاقة) | [[sandbox]] فاضي |
| ويدجت فيه JavaScript، ومش محتاج يحفظ حاجة | [[allow-scripts]] |
| مشغّل فيديو أو خريطة من مزوّد | [[allow-scripts allow-same-origin]] وغالبًا [[allow-popups]] للينك «افتح في الموقع» |
| فورم دفع أو اشتراك من مزوّد | [[allow-scripts allow-same-origin allow-forms]] |

---

## ٤. [[<iframe allow="fullscreen; geolocation">]]: صلاحيات الجهاز

[[sandbox]] عن اللي الصفحة تعمله **في المتصفح**. [[allow]] عن **مزايا الجهاز**: الكاميرا، المايك، المكان، ملو الشاشة، التشغيل التلقائي. اسمه الرسمي Permissions Policy.

~~~text القياس من Chrome (document.featurePolicy.allowsFeature جوه الـ iframe)
                                           geolocation   camera   fullscreen   autoplay
iframe من نفس الموقع، من غير allow:         true          true     true         true
iframe من موقع تاني، من غير allow:          false         false    false        false
   + allow="geolocation; camera; fullscreen; autoplay":
                                           true          true     true         true
   + allowfullscreen بس:                   false         false    true         false
iframe من نفس الموقع + allow="geolocation 'none'":
                                           false         true     true         true
~~~

- صفحة من موقع تاني **مبتاخدش أي حاجة** لحد ما تسمّيها في [[allow]]. عشان كده كود التضمين بتاع أي مشغّل فيديو فيه [[allow="..."]] طويل.
- الصلاحيات بينها [[;]]. و [['none']] بعد الاسم بتمنعها حتى عن صفحة من موقعك.
- [[allow]] مبيدّيش الصلاحية للصفحة مباشرة. هو بيسمحلها **تطلب**. الزائر لسه هيشوف «الموقع عايز يعرف مكانك» ويوافق أو يرفض.
- [[autoplay]] هنا هو البند الرابع في شروط التشغيل التلقائي (درس «audio و source» قسم ٦).

الأسامي اللي بتقابلها: [[fullscreen]] و [[autoplay]] و [[picture-in-picture]] و [[encrypted-media]] و [[camera]] و [[microphone]] و [[geolocation]] و [[clipboard-write]]. القايمة الكاملة في صفحة Permissions Policy على MDN.

### [[<iframe allowfullscreen>]]

ده الشكل القديم لـ [[allow="fullscreen"]]. MDN: «legacy»، واتعرّف من جديد على إنه [[allow="fullscreen *"]]. القياس اللي فوق بيأكد: فتح [[fullscreen]] بس. لسه موجود في كود التضمين بتاع خدمات كتير، ووجوده مع [[allow]] مبيضرّش. في كود جديد اكتب [[allow="fullscreen"]].

---

## ٥. [[<iframe loading="lazy">]]

~~~text القياس من Chrome (الاتنين تحت الشاشة بـ 6000px، والسيرفر بيكتب الطلبات)
<iframe src="far.html?eager">                    GET /far.html?eager     ← اتطلب مع الصفحة
<iframe loading="lazy" src="far.html?lazy">      (مفيش أي طلب)           ← مستني الـ scroll
~~~

مشغّل فيديو من مزوّد بيحمّل معاه سكربتات كتير (الأرقام في درس «video و iframe»). لو تحت في الصفحة، [[loading="lazy"]] بيأجّل ده كله. MDN: التأجيل بيحصل بس لما JavaScript شغال في المتصفح.

---

## ٦. [[<iframe referrerpolicy="no-referrer">]]

كل طلب بيخرج من صفحتك معاه header اسمه [[Referer]]: «الطلب ده جاي من الصفحة الفلانية». [[referrerpolicy]] بيحدد يتبعت منه قد إيه.

~~~text القياس من Chrome (الـ Referer اللي وصل السيرفر، والصفحة الأم http://127.0.0.1:8731/if1.html)
iframe لموقع تاني، من غير referrerpolicy:      Referer: http://127.0.0.1:8731/           ← اسم الموقع بس
iframe لنفس الموقع، من غير referrerpolicy:     Referer: http://127.0.0.1:8731/if1.html   ← العنوان كامل
referrerpolicy="no-referrer":                  (مفيش Referer)
referrerpolicy="unsafe-url":                   Referer: http://127.0.0.1:8731/if1.html   ← كامل، حتى لموقع تاني
~~~

- الافتراضي [[strict-origin-when-cross-origin]]: الموقع التاني بيعرف اسم موقعك ومبيعرفش الصفحة. ده كويس في أغلب الحالات.
- [[no-referrer]]: لو عنوان الصفحة نفسه فيه حاجة خاصة (رقم طلب، اسم مستخدم) أو مش عايز المزوّد يعرف موقعك.
- [[unsafe-url]]: متستخدمهاش.
- نفس الـ attribute على [[<a>]] و [[<img>]] و [[<area>]] بنفس القيم.

---

## ٧. [[<iframe title="...">]]

~~~text القياس من Chrome (شجرة الـ accessibility)
<iframe src="..." title="خريطة فرع المعادي">     →  Iframe «خريطة فرع المعادي»
<iframe src="...">                               →  Iframe «»
<iframe src="..." name="byname">                 →  Iframe «»       ← name مش اسم للقارئ
~~~

MDN: من غير [[title]] مستخدم قارئ الشاشة لازم يدخل جوه الـ iframe عشان يعرف هو إيه، وده متعب في صفحة فيها كذا واحد. اكتب المحتوى: «خريطة: استوديو المحطة في المعادي»، مش «خريطة» ولا «iframe».

---

## ٨. الحالة الحقيقية: مشغّل أو خريطة من مزوّد

المزوّد بيدّيك «كود التضمين» جاهز. ده شكله (بعنوان متخيل):

~~~html
<iframe width="560" height="315" src="https://player.example.test/embed/ep1"
        frameborder="0" allowfullscreen></iframe>
~~~

قبل ما تلزقه، عدّي عليه:

| البند | تعمل إيه |
|---|---|
| [[title]] | مش موجود في أغلب الأكواد الجاهزة: زوّده |
| [[loading="lazy"]] | زوّده لو الـ iframe مش في أول الشاشة |
| [[allow]] | سيب اللي المشغّل محتاجه بس. كود جاهز فيه [[camera; microphone]] لمشغّل فيديو: امسحهم |
| [[sandbox]] | جرّبه بالترتيب اللي في قسم ٣. لو المزوّد مش بيشتغل بيه خالص، انت بتثق فيه بالكامل: قرار، مش تفصيلة |
| [[frameborder="0"]] | attribute قديم. مكانه [[border: 0]] في الـ CSS |
| [[width]] و [[height]] | سيبهم، وخلّيه يتصغّر بـ [[aspect-ratio]] (درس «video و iframe») |

### «الموقع رفض يتعرض»

مش كل موقع بيقبل يتحط في iframe. الموقع نفسه بيقرر، بـ header في رد السيرفر:

~~~text القياس من Chrome (صفحة سيرفرها بيبعت الـ header ده)
X-Frame-Options: DENY
   → مكان الـ iframe: صندوق رمادي في نصه أيقونة ورقة حزينة      contentDocument = null

Content-Security-Policy: frame-ancestors 'none'
   → نفس الصندوق، وفي الـ Console:
Framing 'http://127.0.0.1:8731/' violates the following Content Security Policy directive: "frame-ancestors 'none'". The request has been blocked.
~~~

ده مش غلط في كودك ومفيش attribute بيحلّه. البنوك وصفحات تسجيل الدخول بتعمل كده عشان محدش يحطها جوه صفحة مزيّفة. الحل: لينك عادي للموقع، أو صفحة التضمين الرسمية لو المزوّد عنده واحدة (العنوان اللي فيه [[/embed/]]).

---

## ٩. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| iframe من غير [[title]] | قارئ الشاشة بيقول «Iframe» وبس |
| محتوى من مستخدم في [[srcdoc]] من غير [[sandbox]] | الكود ده بيشتغل كأنه صفحتك: يقرا ويغيّر أي حاجة |
| [[allow-scripts allow-same-origin]] على صفحة من موقعك | تقدر تشيل الـ sandbox عن نفسها |
| [[sandbox]] على مشغّل فيديو من غير [[allow-scripts]] | صندوق فاضي: المشغّل كله JavaScript |
| [[allowfullscreen="false"]] | attribute boolean: وجوده معناه «مسموح» |
| لصق كود التضمين زي ما هو | صلاحيات زيادة، ومن غير [[title]]، ومن غير lazy |
| تحاول تحط موقع بيبعت [[X-Frame-Options]] | صندوق رمادي، ومفيش حل من ناحيتك |
| تستنى الـ iframe يكبر على قد محتواه | بيفضل 300 × 150 أو المقاس اللي كتبته |

---

## الخلاصة

- الـ iframe صفحة تانية: مبتورّثش CSS، ومن موقع تاني مبتقراش صفحتك ولا انت بتقراها.
- [[sandbox]] فاضي بيقفل الكل، وكل كلمة [[allow-...]] بتفتح حاجة. ابدأ فاضي وزوّد.
- [[allow-scripts]] مع [[allow-same-origin]]: عادي لمزوّد من موقع تاني، وممنوع لمحتوى من موقعك.
- [[allow]] لمزايا الجهاز، و iframe من موقع تاني مبياخدش أي واحدة من غيره.
- [[srcdoc]] للمحتوى المكتوب، و [[loading="lazy"]] للي تحت، و [[title]] دايمًا.`,
          try: R`اعمل [[frames.html]] فيها نفس الـ iframe تلات مرات: مرة من غير [[sandbox]]، ومرة بـ [[sandbox]] فاضي، ومرة بـ [[sandbox="allow-scripts"]]. والمحتوى في [[srcdoc]]: زرار عليه [[onclick]] بيغيّر الكلام اللي جنبه من «لسه» لـ «اتداس». وكل واحد ليه [[title]] مختلف. افتحها ودوس على التلات أزرار: مين اشتغل؟ وافتح الـ Console وشوف الرسالة.`,
          sol: R`~~~live 162 298 frames.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تجربة sandbox</title>
</head>
<body>
<h1>تجربة sandbox</h1>
<iframe title="من غير sandbox" width="210" height="60"
  srcdoc="<button onclick=&quot;s.textContent='اتداس'&quot;>دوس</button> <span id=s>لسه</span>"></iframe>
<iframe sandbox title="sandbox فاضي" width="210" height="60"
  srcdoc="<button onclick=&quot;s.textContent='اتداس'&quot;>دوس</button> <span id=s>لسه</span>"></iframe>
<iframe sandbox="allow-scripts" title="sandbox مع allow-scripts" width="210" height="60"
  srcdoc="<button onclick=&quot;s.textContent='اتداس'&quot;>دوس</button> <span id=s>لسه</span>"></iframe>
</body>
</html>
~~~

**هتشوف إيه:**

- الأول والتالت: الكلمة بتتغيّر لـ «اتداس».
- التاني ([[sandbox]] فاضي): الزرار بيتداس ومفيش حاجة بتحصل.

**ليه كده:** [[onclick]] سكربت. [[sandbox]] الفاضي بيمنع السكربتات كلها، ومنها اللي مكتوب في attribute. و [[allow-scripts]] بيرجّعها، والصفحة لسه مقفول عليها الباقي (فورم، نوافذ، origin).

**لاحظ [[&quot;]]:** قيمة [[srcdoc]] بين علامتين تنصيص، فأي علامة تنصيص جواها بتتكتب [[&quot;]].

**الغلطة الشائعة:** تحل المشكلة بإنك تمسح [[sandbox]] كله. اللي ناقص كلمة واحدة.

~~~text القياس من Chrome (الـ Console بعد ما دوست على التاني)
Blocked script execution in 'about:srcdoc' because the document's frame is sandboxed and the 'allow-scripts' permission is not set.
~~~`,
          deep: {
            why: R`أي [[<iframe>]] معناه إنك شغّلت كود حد تاني جوه صفحتك، قدام زوارك. لو المزوّد اتخترق، أو الإعلان طلع خبيث، من غير [[sandbox]] يقدر يفتح نوافذ، وينقل الزائر لموقع تاني، ويطلب الكاميرا باسم موقعك. [[sandbox]] و [[allow]] بيخلّوا القاعدة «ممنوع إلا اللي سمحت بيه» بدل «مسموح إلا اللي منعته».`,
            how: R`لما المتصفح بيعمل الـ iframe بيحسبله مجموعة «sandboxing flags» من قيمة [[sandbox]]: كل flag قيد، وكل كلمة [[allow-...]] بتشيل flag. الـ flags دي بتتورّث لأي iframe أو نافذة تتفتح من جوه (إلا مع [[allow-popups-to-escape-sandbox]]). ومن غير [[allow-same-origin]] الصفحة بتاخد origin فريد «opaque» بيتكتب [[null]]، فكل فحص same-origin بيفشل. و [[allow]] بيتحوّل لـ policy بتتحط على الـ iframe: كل ميزة ليها قايمة origins مسموح ليها، والافتراضي لمعظمها [[self]]، يعني موقعك بس.`,
            when: R`[[sandbox]]: أي محتوى مش انت اللي كاتبه (تعليقات، معاينة إيميل أو كود، إعلانات، ويدجت من طرف تالت). [[allow]]: أي مزوّد محتاج ميزة جهاز (فيديو ملو الشاشة، خريطة عايزة مكانك، مكالمة فيديو عايزة الكاميرا). [[srcdoc]]: معاينة أو محتوى صغير بيتولّد في نفس الصفحة. ولو المحتوى بتاعك ومن موقعك: متستخدمش iframe أصلًا، اكتبه في الصفحة.`,
            mistakes: R`iframe من غير [[title]]. [[srcdoc]] فيه كلام من مستخدم من غير [[sandbox]]. [[allow-same-origin]] مع [[allow-scripts]] على صفحة من نفس الموقع. نسخ كود التضمين بكل الصلاحيات اللي فيه. [[allowfullscreen="false"]]. والاستغراب من صندوق رمادي سببه [[X-Frame-Options]] عند الموقع التاني.`
          },
          practice: [
            { lvl: 'تطبيق', t: R`**ابني:** مشغّل فيديو الحلقة ١ من مزوّد خارجي في صفحة «المحطة». (عشان المعاينة، صفحة المزوّد مكتوبة في [[srcdoc]] بدل [[src]]، وده السطر الوحيد اللي متغيّروش.) كمّل الـ iframe: اسم يوصف المحتوى، ومقاس 320 × 180، وتحميل متأجّل، وقفل بيسمح بالسكربتات بس، وصلاحية ملو الشاشة. (من قسم ٣ و ٤ و ٥ و ٧ في الشرح)`, done: R`الصندوق بقى 320 × 180 والسكربت اللي جواه لسه شغال (مكتوب «المشغّل جاهز»)، وكل الشروط ✓.`, work: { h: 250, start: R`<h2>شاهد الحلقة ١</h2>
<iframe srcdoc="<body style='margin:0;background:#0f766e;color:#fff;font:16px sans-serif;text-align:center'><p>▶ فيديو الحلقة ١</p><script>document.body.append('المشغّل جاهز')</script>"></iframe>`, checks: [
              { say: R`الـ iframe ليه [[title]] فيه كلمة «الحلقة»`, q: "iframe[title*=\"الحلقة\"]" },
              { say: R`المقاس [[width="320"]] و [[height="180"]]`, q: "iframe[width=\"320\"][height=\"180\"]" },
              { say: R`[[loading="lazy"]]`, q: "iframe[loading=\"lazy\"]" },
              { say: R`عليه [[sandbox]] فيه [[allow-scripts]]`, q: "iframe[sandbox~=\"allow-scripts\"]" },
              { say: R`الـ sandbox مفيهوش [[allow-top-navigation]]`, q: "iframe[sandbox~=\"allow-top-navigation\"]", n: 0 },
              { say: R`[[allow]] فيه [[fullscreen]]`, q: "iframe[allow*=\"fullscreen\"]" },
            ] }, sol: R`~~~live 270 الحل
<h2>شاهد الحلقة ١</h2>
<iframe title="فيديو الحلقة ١ من بودكاست المحطة" width="320" height="180" loading="lazy"
  sandbox="allow-scripts" allow="fullscreen"
  srcdoc="<body style='margin:0;background:#0f766e;color:#fff;font:16px sans-serif;text-align:center'><p>▶ فيديو الحلقة ١</p><script>document.body.append('المشغّل جاهز')</script>"></iframe>
~~~

**هتشوف إيه:** صندوق أخضر 320 × 180 فيه «▶ فيديو الحلقة ١» وتحتها «المشغّل جاهز». الجملة التانية كتبها سكربت، فوجودها معناه إن [[allow-scripts]] شغال. لو كتبت [[sandbox]] فاضي كانت هتختفي.

**ليه كده:**

- [[title]] فيه رقم الحلقة واسم البودكاست: في صفحة فيها ٥ فيديوهات كل واحد ليه اسم مختلف.
- [[sandbox="allow-scripts"]]: المشغّل محتاج JavaScript، ومش محتاج يبعت فورم ولا يفتح نوافذ.
- [[allow="fullscreen"]]: من غيره زرار ملو الشاشة جوه المشغّل مش هيشتغل، لأن المزوّد موقع تاني.

**في موقعك** السطر الأخير هيبقى [[src="https://player.example.test/embed/ep1"]]، والمزوّد الحقيقي غالبًا هيحتاج [[allow-same-origin]] كمان عشان الـ cookies بتاعته.

**الغلطة الشائعة:** [[sandbox="allow-scripts; allow-forms"]] بـ [[;]]. الكلمات في [[sandbox]] بينها **مسافة**، والـ [[;]] بتاعة [[allow]].

~~~text القياس من Chrome
Iframe «فيديو الحلقة ١ من بودكاست المحطة»      الحجم 324 × 184 (بالبرواز)
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** صفحة الحلقة بتعرض «تعليق المستمع» في iframe، والتعليق كلام بيكتبه أي زائر. المبرمج نسخ الـ attributes من مشغّل الفيديو. فيه ٤ مشاكل: الصلاحيات أكتر من اللازم لمحتوى ثابت، و [[allow]] بيدّي الكاميرا والمكان، و [[allowfullscreen="false"]]، ومفيش اسم. (من قسم ٣ و ٤ و ٧ و ٩ في الشرح)`, done: R`التعليق بيتعرض، والـ [[sandbox]] فاضي، ومفيش [[allow]] ولا [[allowfullscreen]]، وفيه [[title]]، وكل الشروط ✓.`, work: { h: 150, start: R`<h2>تعليق المستمع</h2>
<iframe sandbox="allow-scripts allow-same-origin allow-top-navigation allow-forms"
  allow="camera; geolocation" allowfullscreen="false" width="320" height="70"
  srcdoc="<p>حلقة جميلة، كمّلوا!</p>"></iframe>`, checks: [
              { say: R`[[sandbox]] موجود وفاضي`, q: "iframe[sandbox=\"\"]" },
              { say: R`مفيش [[allow]]`, q: "iframe[allow]", n: 0 },
              { say: R`مفيش [[allowfullscreen]]`, q: "iframe[allowfullscreen]", n: 0 },
              { say: R`فيه [[title]]`, q: "iframe[title]" },
              { say: R`التعليق لسه في [[srcdoc]]`, q: "iframe[srcdoc*=\"حلقة جميلة\"]" },
            ] }, sol: R`~~~live 160 بعد التصليح
<h2>تعليق المستمع</h2>
<iframe sandbox title="تعليق من مستمع على الحلقة ١" width="320" height="70"
  srcdoc="<p>حلقة جميلة، كمّلوا!</p>"></iframe>
~~~

**هتشوف إيه:** نفس الصندوق ونفس التعليق قبل وبعد. الفرق مش في الشكل: الفرق في اللي التعليق **يقدر يعمله** لو زائر كتب فيه كود بدل الكلام.

| المشكلة | التصليح | ليه |
|---|---|---|
| [[allow-scripts allow-same-origin]] على محتوى من موقعك | [[sandbox]] فاضي | الاتنين مع بعض بيلغوا القفل، والتعليق مش محتاج سكربتات أصلًا |
| [[allow-top-navigation]] و [[allow-forms]] | اتمسحوا | تعليق خبيث كان يقدر ينقل الزائر لموقع تاني |
| [[allow="camera; geolocation"]] | اتمسح | تعليق مش محتاج كاميرا |
| [[allowfullscreen="false"]] | اتمسح | boolean: وجوده معناه «مسموح» |
| من غير [[title]] | زوّدناه | قارئ الشاشة كان بيقول «Iframe» بس |

**الغلطة الشائعة:** تسيب [[allow-scripts]] «احتياطي». لو زائر كتب [[<script>]] في تعليقه، هيشتغل عند كل اللي يفتحوا الصفحة.

~~~text القياس من Chrome (نفس الـ attributes القديمة على صفحة من نفس السيرفر)
قبل:   origin = http://127.0.0.1:8731     parent.document.title = "parent page"   (قرت الصفحة الأم)
       An iframe which has both allow-scripts and allow-same-origin for its sandbox attribute can escape its sandboxing.
بعد:   السكربتات مقفولة:  Blocked script execution in '...' because the document's frame is sandboxed and the 'allow-scripts' permission is not set.
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع، وبعدين صلّح:** ويدجت «عدّاد التصفيق» في iframe. اكتب على ورقة: لما تدوس 👏 الرقم هيزيد؟ ليه؟ وبعدين خلّيه يشتغل بأقل صلاحية ممكنة. (من قسم ٣ في الشرح، جزء «تختار الكلمات إزاي»)`, done: R`كتبت توقّعك، والرقم بيزيد مع كل ضغطة، والـ [[sandbox]] فيه [[allow-scripts]] بس، وكل الشروط ✓.`, work: { h: 130, start: R`<iframe sandbox title="عدّاد التصفيق للحلقة ١" width="240" height="60"
  srcdoc="<button onclick='n.textContent++'>👏 صفّق</button> <b id=n>0</b>"></iframe>`, checks: [
              { say: R`الـ [[sandbox]] فيه [[allow-scripts]]`, q: "iframe[sandbox~=\"allow-scripts\"]" },
              { say: R`مفيهوش [[allow-same-origin]]`, q: "iframe[sandbox~=\"allow-same-origin\"]", n: 0 },
              { say: R`[[sandbox]] لسه موجود (متمسحش)`, q: "iframe[sandbox]" },
              { say: R`الـ iframe لسه ليه [[title]]`, q: "iframe[title]" },
            ] }, sol: R`~~~live 90 بعد التعديل (دوس 👏)
<iframe sandbox="allow-scripts" title="عدّاد التصفيق للحلقة ١" width="240" height="60"
  srcdoc="<button onclick='n.textContent++'>👏 صفّق</button> <b id=n>0</b>"></iframe>
~~~

وده اللي كان باين قبل التعديل:

~~~live 90 قبل (دوس 👏: مفيش حاجة)
<iframe sandbox title="عدّاد التصفيق للحلقة ١" width="240" height="60"
  srcdoc="<button onclick='n.textContent++'>👏 صفّق</button> <b id=n>0</b>"></iframe>
~~~

**التوقّع:** لأ، الرقم هيفضل ٠. [[sandbox]] الفاضي بيقفل السكربتات، و [[onclick]] سكربت.

**هتشوف إيه:** قبل: الزرار بيتداس والرقم ٠. بعد: ١ و ٢ و ٣ مع كل ضغطة.

**ليه [[allow-scripts]] لوحدها:** العدّاد بيغيّر رقم جوه صفحته بس. مش بيبعت فورم، ولا بيحفظ في [[localStorage]]، ولا بيفتح نافذة. فكلمة واحدة تكفي.

**الغلطة الشائعة:** تمسح [[sandbox]] خالص «عشان يشتغل». هيشتغل، وهيبقى [[srcdoc]] من غير قفل: جزء من صفحتك بكل صلاحياتها.

~~~text القياس من Chrome (الـ Console قبل التعديل، بعد ضغطة)
Blocked script execution in 'about:srcdoc' because the document's frame is sandboxed and the 'allow-scripts' permission is not set.
~~~` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** ده لوج سيرفر مزوّد الخرايط، فيه تلات طلبات جاية من تلات iframes في صفحة [[https://mahatta.example.test/orders/7731/track]] (صفحة تتبّع طلب، ورقم الطلب في العنوان). لكل سطر: أنهي [[referrerpolicy]] كان على الـ iframe؟ وأنهي واحد فيهم سرّب رقم الطلب للمزوّد؟ (من قسم ٦ في الشرح)

~~~text لوج المزوّد
GET /embed?place=studio    Referer: https://mahatta.example.test/
GET /embed?place=branch    Referer: https://mahatta.example.test/orders/7731/track
GET /embed?place=depot     (من غير Referer)
~~~`, done: R`كتبت القيمة لكل سطر، وحددت السطر اللي فيه التسريب، وكتبت الـ iframe الأنسب لصفحة زي دي.`, sol: R`| الطلب | الـ [[Referer]] اللي وصل | [[referrerpolicy]] |
|---|---|---|
| [[place=studio]] | اسم الموقع بس | مفيش (الافتراضي [[strict-origin-when-cross-origin]]) أو [[origin]] |
| [[place=branch]] | العنوان كامل برقم الطلب | [[unsafe-url]] |
| [[place=depot]] | مفيش | [[no-referrer]] |

**التسريب في السطر التاني:** المزوّد عرف إن فيه طلب رقمه 7731 وعرف عنوان صفحة تتبّعه. لو الصفحة دي بتتفتح باللينك من غير تسجيل دخول، أي حد عند المزوّد يقدر يفتحها.

الأنسب لصفحة عنوانها فيه بيانات:

~~~html
<iframe src="https://maps.example.test/embed?place=depot" title="خريطة: مخزن التسليم"
        width="400" height="300" loading="lazy" referrerpolicy="no-referrer"></iframe>
~~~

**ليه مش الافتراضي وخلاص:** الافتراضي كان هيبعت اسم الموقع بس، وده كفاية هنا برده. [[no-referrer]] أضمن لما مفيش سبب يخلّي المزوّد يعرف موقعك أصلًا. المهم إن محدش يكتب [[unsafe-url]].

**الغلطة الشائعة:** تفتكر إن [[sandbox]] بيمنع الـ [[Referer]]. ملوش علاقة: الـ header ده بيتبعت مع طلب تحميل الصفحة نفسه.

~~~text القياس من Chrome (على السيرفر المحلي، والصفحة الأم http://127.0.0.1:8731/if1.html)
الافتراضي لموقع تاني:    Referer: http://127.0.0.1:8731/
unsafe-url:              Referer: http://127.0.0.1:8731/if1.html
no-referrer:             (مفيش)
~~~` },
            { lvl: 'سريع', t: R`**اشرحها:** صاحب «المحطة» عايز صفحة «ادفع اشتراكك» فيها صفحة البنك نفسها جوه iframe «عشان الزائر ميخرجش من موقعنا». جرّبتها وطلع صندوق رمادي. اشرحله في ٣ سطور: ليه، وليه ده في مصلحته، والبديل. (من قسم ٨ في الشرح، جزء «الموقع رفض يتعرض»)`, done: R`٣ سطور فيهم: الـ header، وسبب وجوده، والبديل.`, sol: R`إجابة نموذجية:

1. موقع البنك بيبعت مع صفحته header ([[X-Frame-Options: DENY]] أو [[Content-Security-Policy: frame-ancestors 'none']]) بيقول للمتصفح «متعرضنيش جوه أي صفحة تانية»، والمتصفح بيلتزم. مفيش attribute عندنا بيلغي ده.
2. ده حماية للعميل: لو الصفحة بتتعرض في iframe، أي موقع مزيّف يقدر يحطها ويرسم فوقها أزرار مخفية (clickjacking). فالبنك اللي بيرفض ده بنك بياخد باله.
3. البديل: زرار «ادفع» بيودّي الزائر لصفحة الدفع عند البنك أو شركة الدفع وبيرجّعه لموقعنا بعدها، أو ويدجت الدفع الرسمي لو الشركة عندها واحد معمول للتضمين.

~~~text القياس من Chrome (صفحة سيرفرها بيبعت الـ header)
مكان الـ iframe: صندوق رمادي فيه أيقونة ورقة حزينة        contentDocument = null
Framing 'http://127.0.0.1:8731/' violates the following Content Security Policy directive: "frame-ancestors 'none'". The request has been blocked.
~~~` },
          ]
        },
        {
          cmd: "object و embed",
          title: "ملف PDF جوه الصفحة، والعنصرين اللي فضلوا من أيام الـ plugins",
          pre: ["css/iframe sandbox و allow", "css/img"],
          ref: [
            { t: "MDN: <object>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/object" },
            { t: "MDN: <embed>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/embed" },
            { t: "WHATWG: the object element", url: "https://html.spec.whatwg.org/multipage/iframe-embed-object.html#the-object-element" },
            { t: "WHATWG: the embed element", url: "https://html.spec.whatwg.org/multipage/iframe-embed-object.html#the-embed-element" }
          ],
          desc: R`[[<object>]] و [[<embed>]] بيحطوا «ملف خارجي» في الصفحة والمتصفح هو اللي يقرر يعرضه بإيه. اتعملوا لأيام الـ plugins (Flash و Java)، والـ plugins راحت. اللي فضل ليهم في الشغل الحقيقي حاجة واحدة تقريبًا: عرض ملف **PDF** جوه الصفحة.
الفرق بينهم: [[<object>]] ليه محتوى بديل بيظهر لو الملف متعرضش، و [[<embed>]] عنصر فاضي ملوش بديل. وللصور والصفحات والفيديو: [[<img>]] و [[<iframe>]] و [[<video>]] أحسن منهم دايمًا.`,
          example: R`<object data="media/ep1-notes.pdf" type="application/pdf" width="600" height="400" title="ملخص الحلقة ١ (PDF)">
  <p>المتصفح مش عارض الملف هنا.</p>
</object>
<p><a href="media/ep1-notes.pdf" download>نزّل ملخص الحلقة ١ (PDF، صفحتين)</a></p>
<embed src="media/ep1-notes.pdf" type="application/pdf" width="600" height="400" title="ملخص الحلقة ١ (PDF)">`,
          flag: "script",
          lines: [
            R`[[<object>]]: [[data]] عنوان الملف، و [[type]] نوعه (PDF)، و [[width]] و [[height]] مقاس الصندوق، و [[title]] اسمه لقارئ الشاشة.`,
            R`المحتوى البديل: اللي بين الفتحة والقفلة بيتعرض **بس** لو المتصفح معرفش يعرض الملف (مش موجود، أو النوع مش مدعوم، أو المتصفح مبيعرضش PDF).`,
            R`قفلة [[</object>]]. إجبارية، لأن العنصر بياخد محتوى.`,
            R`لينك تحميل برّه العنصر: بيفضل موجود في كل الحالات، حتى لو العارض اشتغل والملف نفسه فيه مشكلة.`,
            R`[[<embed>]] لنفس الملف: [[src]] بدل [[data]]، ومن غير قفلة ولا محتوى بديل. مكتوب هنا للمقارنة، وفي صفحة حقيقية بتختار واحد منهم.`
          ],
          teach: R`## الفكرة في سطرين

المواصفة: [[<object>]] بيمثّل «مورد خارجي» بيتعامل معاه حسب نوعه: كصورة، أو كصفحة جوه الصفحة، أو كحاجة بيعرضها plugin. و [[<embed>]] «نقطة دمج» لمحتوى خارجي. MDN: المتصفحات الحالية مبقتش بتدعم الـ plugins زي Flash، والعنصرين لسه بيعرضوا اللي المتصفح نفسه بيعرف يعرضه، زي الـ PDF في العارض اللي جواه.

القياسات من Chrome 157 على Windows 11، بملف PDF صفحة واحدة (590 byte) وملف SVG من سيرفر محلي.

---

## ١. [[<object data="..." type="...">]]

| attribute | بيعمل إيه |
|---|---|
| [[data]] | عنوان الملف. ده مكان [[src]] في العناصر التانية |
| [[type]] | نوع الملف (MIME type): [[application/pdf]] و [[image/svg+xml]]. MDN: لازم واحد على الأقل من [[data]] و [[type]]، والأحسن الاتنين |
| [[width]] و [[height]] | مقاس الصندوق بالبيكسل |
| [[title]] | الاسم اللي قارئ الشاشة بيقراه |

~~~text القياس من Chrome
<object></object>                                   الحجم 300 × 150    display: inline
<object data="notes.pdf" type="application/pdf" width="300" height="200">
   الـ PDF اتعرض في عارض Chrome (شريط أدوات غامق والصفحة تحته)      ارتفاع المحتوى البديل = 0
   navigator.pdfViewerEnabled = true
~~~

[[navigator.pdfViewerEnabled]] خاصية المتصفح بيقول بيها هو بيعرض PDF جوه الصفحة ولا لأ. في Chrome على الكمبيوتر [[true]]. مش كل متصفح كده (خصوصًا على الموبايل)، وده سبب وجود البديل ولينك التحميل.

~~~live 56 object لملف PDF (المعاينة هنا معزولة ومبتعرضش PDF، فهتشوف البديل)
<object data="media/ep1-notes.pdf" type="application/pdf" width="300" height="120" title="ملخص الحلقة ١ (PDF)">
  <p>المتصفح مش عارض الملف هنا. <a href="media/ep1-notes.pdf">افتح ملخص الحلقة ١ (PDF)</a></p>
</object>
~~~

**هتشوف إيه:** في المعاينة دي: الجملة البديلة واللينك (العارض مقفول جوه المعاينة، واتقاس: حتى PDF مكتوب بـ [[data:]] مبيتعرضش فيها والبديل هو اللي بيظهر). في فولدر مشروعك، بملف PDF حقيقي في [[media/]]: صندوق 300 × 120 جواه صفحة الـ PDF وفوقها شريط العارض.

---

## ٢. المحتوى البديل

هنا [[<object>]] مختلف عن [[<audio>]] و [[<video>]]: البديل بتاعه بيظهر فعلًا لما الملف يفشل.

~~~live 90 نوع المتصفح مبيعرفوش، وملف مش موجود
<object data="media/game.swf" type="application/x-shockwave-flash">
  <p>اللعبة دي كانت Flash، و Flash اتقفل. <a href="games.html">جرّب الألعاب الجديدة</a></p>
</object>
<object data="media/missing.pdf" type="application/pdf">
  <p>الملف مش موجود. <a href="index.html">ارجع للحلقات</a></p>
</object>
~~~

**هتشوف إيه:** سطرين كلام عاديين بلينكاتهم. مفيش صندوق فاضي ولا أيقونة مكسورة: البديل أخد مكان العنصر.

~~~text القياس من Chrome
type="application/x-shockwave-flash":     البديل اتعرض (ارتفاعه 18px)
data="nofile.pdf" (404):                  البديل اتعرض (ارتفاعه 18px)
data="notes.pdf" موجود:                   البديل متعرضش (ارتفاعه 0)
~~~

والبديل ممكن يبقى [[<object>]] تاني: المتصفح بيجرّب البرّاني، ولو فشل بيجرّب اللي جواه، وهكذا. اتقاس: [[<object>]] لفيديو مش موجود وجواه [[<object>]] لـ SVG، فاللي اتعرض الـ SVG.

---

## ٣. [[<object>]] بيعرض صورة أو صفحة كمان

~~~live 106 SVG جوه object
<object type="image/svg+xml" title="بانر بودكاست المحطة" data="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='80'%3E%3Crect width='320' height='80' fill='%230f766e'/%3E%3Ctext x='160' y='48' font-size='24' fill='white' text-anchor='middle'%3Eبودكاست المحطة%3C/text%3E%3C/svg%3E">
  <p>بودكاست المحطة</p>
</object>
~~~

**هتشوف إيه:** مستطيل أخضر مكتوب عليه «بودكاست المحطة». شكله زي [[<img>]] بالظبط.

~~~text القياس من Chrome
<object data="pic.svg" type="image/svg+xml">   الحجم 120 × 60 (مقاس الـ SVG)
     contentDocument موجود، والـ <script> اللي جوه ملف الـ SVG اشتغل
<img src="pic.svg">                            نفس الشكل، والسكربت اللي جوه الملف مبيشتغلش
<object data="far.html">                       الحجم 300 × 150، وجواه الصفحة: زي iframe
~~~

يعني [[<object>]] بيفتح الـ SVG كـ **مستند** (بسكربتاته)، و [[<img>]] بيعرضه كـ **صورة** وبس. ده كان بيتستخدم لـ SVG تفاعلي، والنهارده الـ SVG بيتكتب inline في الصفحة (درس «SVG»).

وللصفحات: [[<object>]] معندوش [[sandbox]] ولا [[allow]] ولا [[loading]]. يعني صفحة جوه [[<object>]] ملهاش أي قفل من اللي في الدرس اللي فات. استخدم [[<iframe>]].

---

## ٤. [[<embed src="..." type="...">]]

~~~html
<embed src="media/ep1-notes.pdf" type="application/pdf" width="600" height="400" title="ملخص الحلقة ١ (PDF)">
~~~

- عنصر فاضي (void): ملوش قفلة، يعني **ملوش محتوى بديل**.
- [[src]] للعنوان (مش [[data]])، و [[type]] و [[width]] و [[height]] زي [[<object>]]. MDN: المقاس بالبيكسل بس، من غير نسب مئوية.

~~~text القياس من Chrome
<embed>  من غير أي حاجة:                      الحجم 0 × 0
<embed src="notes.pdf" type="application/pdf" width="300" height="200">     الـ PDF اتعرض
<embed src="nofile.pdf" type="application/pdf">
     صندوق 300 × 150 غامق جواه نص رد السيرفر «not found»      ← مفيش بديل يتعرض
~~~

لما الملف يفشل، [[<embed>]] بيسيب صندوق بايظ قدام الزائر، و [[<object>]] بيعرض البديل اللي انت كاتبه. عشان كده MDN بيقول: لعرض PDF فكّر في [[<object>]] أو [[<iframe>]].

---

## ٥. PDF في الصفحة: أنهي عنصر؟

| الطريقة | لو الملف متعرضش | قفل وتحكّم | إمتى |
|---|---|---|---|
| لينك [[<a href="x.pdf">]] | مفيش حاجة تبوظ | مش محتاج | **دايمًا موجود**، لوحده أو مع أي طريقة تانية |
| [[<object data type>]] | بيعرض البديل اللي جواه | مفيش | معاينة PDF جوه الصفحة |
| [[<iframe src="x.pdf">]] | صندوق فاضي أو رسالة المتصفح | [[loading="lazy"]] و [[title]] | PDF تحت في صفحة طويلة |
| [[<embed src type>]] | صندوق بايظ | مفيش | كود قديم بتصونه |

والقواعد اللي فوق الجدول:

1. **لينك التحميل مش اختياري.** الموبايل، وقارئ الشاشة، واللي عايز يطبع، كلهم محتاجينه. واكتب فيه النوع والحجم: «(PDF، صفحتين)».
2. **الـ PDF مش بديل عن الصفحة.** لو المحتوى مهم (منيو، أسعار، ملخص حلقة)، اكتبه HTML والـ PDF نسخة للتحميل. الـ PDF مبيتظبطش على عرض الموبايل، ومحرك البحث بيفضّل الصفحة.
3. **[[title]] على العنصر.**

~~~text القياس من Chrome (شجرة الـ accessibility)
<object data="notes.pdf" type="application/pdf">                            →  PluginObject «»
<object ... title="ملخص الحلقة ١ (PDF)">                                    →  PluginObject «ملخص الحلقة ١ (PDF)»
<embed src="notes.pdf" type="application/pdf" title="ملخص في embed">        →  EmbeddedObject «ملخص في embed»
~~~

---

## ٦. ليه [[<img>]] و [[<iframe>]] أحسن في الغالب

| عايز تحط | العنصر | اللي [[<object>]] و [[<embed>]] معندهمش |
|---|---|---|
| صورة (ومنها SVG) | [[<img>]] | [[alt]] و [[srcset]] و [[loading="lazy"]] و [[decoding]] |
| صفحة من موقع تاني | [[<iframe>]] | [[sandbox]] و [[allow]] و [[loading]] و [[referrerpolicy]] |
| فيديو أو صوت | [[<video>]] و [[<audio>]] | [[controls]] و [[<track>]] و [[<source>]] |
| PDF | [[<object>]] مع لينك | ده مكانهم |
| Flash أو Java applet | مفيش | اتقفلوا. المحتوى لازم يتعمل من جديد بـ HTML |

---

## ٧. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| PDF في [[<embed>]] ومن غير لينك | على متصفح مبيعرضش PDF: صندوق فاضي، ومفيش طريقة للملف |
| كلام بين [[<embed>]] و [[</embed>]] على إنه بديل | [[<embed>]] ملوش قفلة: الكلام بيتعرض دايمًا تحته كنص عادي |
| [[<object src="x.pdf">]] | مفيش [[src]] على object: اسمه [[data]] |
| [[<object>]] من غير [[type]] | المتصفح بيستنى رد السيرفر عشان يعرف النوع |
| صورة عادية في [[<object>]] | ضاع [[alt]] و lazy و [[srcset]] |
| صفحة موقع تاني في [[<object>]] | من غير أي [[sandbox]] |
| المنيو كله PDF | مبيتقريش على الموبايل، ومبيظهرش في البحث |

---

## الخلاصة

- [[<object data type>]] ليه بديل بيظهر لما الملف يفشل. [[<embed src type>]] فاضي وملوش بديل.
- استخدامهم الحقيقي النهارده: معاينة PDF. ومعاها دايمًا لينك تحميل و [[title]].
- صورة ← [[<img>]]، صفحة ← [[<iframe>]]، فيديو ← [[<video>]].`,
          try: R`اعمل [[notes.html]] وجنبها أي ملف PDF عندك باسم [[notes.pdf]]. حط الملف مرتين: مرة في [[<object>]] ببديل فيه لينك، ومرة في [[<embed>]]، وتحتهم لينك تحميل. افتح الصفحة: الاتنين عرضوا الملف؟ وبعدين غيّر اسم الملف في الاتنين لـ [[nofile.pdf]] واعمل Ctrl+R: مين فيهم اتصرف أحسن؟`,
          sol: R`~~~html notes.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ملخص الحلقة</title>
</head>
<body>
<h1>ملخص الحلقة</h1>
<object data="notes.pdf" type="application/pdf" width="400" height="300" title="ملخص الحلقة (PDF) في object">
  <p>المتصفح مش عارض الملف. <a href="notes.pdf">افتح الملخص (PDF)</a></p>
</object>
<embed src="notes.pdf" type="application/pdf" width="400" height="300" title="ملخص الحلقة (PDF) في embed">
<p><a href="notes.pdf" download>نزّل الملخص (PDF)</a></p>
</body>
</html>
~~~

~~~view 274 شكلها والملف مش موجود (وده برده شكلها جوه المعاينة المعزولة)
<h1>ملخص الحلقة</h1>
<object data="nofile.pdf" type="application/pdf" width="300" height="200" title="ملخص الحلقة (PDF) في object">
  <p>المتصفح مش عارض الملف. <a href="notes.pdf">افتح الملخص (PDF)</a></p>
</object>
<embed src="nofile.pdf" type="application/pdf" width="300" height="100" title="ملخص الحلقة (PDF) في embed">
<p><a href="notes.pdf" download>نزّل الملخص (PDF)</a></p>
~~~

**هتشوف إيه:**

- **والملف موجود** (على جهازك): صندوقين جنب بعض أو تحت بعض، في كل واحد صفحة الـ PDF وشريط العارض. مفيش فرق في الشكل.
- **والملف مش موجود:** [[<object>]] اختفى وظهر مكانه «المتصفح مش عارض الملف» باللينك. و [[<embed>]] ساب صندوق فاضي (ومن سيرفر بيظهر جواه نص الخطأ).

**ليه كده:** [[<object>]] ليه محتوى، والمتصفح بيعرضه لما الملف يفشل. [[<embed>]] ملوش.

**الغلطة الشائعة:** تجرّب والملف موجود بس، وتقرر إن الاتنين زي بعض.

~~~text القياس من Chrome (من سيرفر محلي)
notes.pdf:      object 400 × 300 (البديل ارتفاعه 0)        embed 400 × 300
nofile.pdf:     object: البديل ظاهر (ارتفاعه 18)            embed: صندوق جواه «not found»
~~~`,
          deep: {
            why: R`زمان المتصفح مكانش بيعرف يشغّل فيديو ولا صوت ولا حتى PDF، فكان لازم عنصر يقول «الملف ده، وهاتله البرنامج اللي يشغّله». ده كان [[<object>]] (القياسي) و [[<embed>]] (اللي المتصفحات عملته الأول). لما [[<video>]] و [[<audio>]] و [[<canvas>]] و SVG دخلوا HTML، والـ plugins اتقفلت لأسباب أمان، العنصرين فضلوا من غير شغل تقريبًا. بتتعلمهم عشان تعرف تقرا الكود القديم، وتعرف الحالة الوحيدة اللي لسه ليهم.`,
            how: R`المتصفح بياخد [[type]] (أو نوع الرد من السيرفر) ويقرر: لو صورة بيعرضها كصورة، ولو نوع بيفتحه كمستند (HTML أو SVG أو PDF في العارض) بيعمل جوه العنصر navigable زي بتاع [[<iframe>]]، ولو مفيش حاجة تنفع بيعرض أولاد العنصر كمحتوى بديل. [[<embed>]] بيمشي نفس الطريق من غير الخطوة الأخيرة، لأنه ملوش أولاد.`,
            when: R`[[<object>]]: معاينة PDF (ملخص، منيو، فاتورة) مع لينك تحميل. [[<embed>]]: مفيش سبب لكود جديد. ولما تلاقي واحد فيهم في موقع قديم حواليه Flash أو [[<param>]]: المحتوى ده مبيشتغلش عند حد دلوقتي، وبيتشال أو بيتعمل من جديد.`,
            mistakes: R`الاعتماد على معاينة الـ PDF من غير لينك. بديل مكتوب «جوه» [[<embed>]]. [[src]] على [[<object>]] أو [[data]] على [[<embed>]]. صور وصفحات في [[<object>]] بدل [[<img>]] و [[<iframe>]]. ونسيان [[title]].`
          },
          practice: [
            { lvl: 'تطبيق', t: R`**ابني:** قسم «ملخص الحلقة ٢» في صفحة الحلقة: معاينة للملف [[media/ep2-notes.pdf]] بمقاس 320 × 200، واسم لقارئ الشاشة، وبديل جواه جملة ولينك للملف، ولينك تحميل تحت المعاينة مكتوب فيه النوع. (من قسم ١ و ٢ و ٥ في الشرح)`, done: R`في المعاينة هنا هتشوف البديل (الـ PDF مبيتعرضش فيها)، وتحته لينك التحميل، وكل الشروط ✓.`, work: { h: 190, start: R`<h2>ملخص الحلقة ٢</h2>
<p>الملف: media/ep2-notes.pdf (صفحتين)</p>`, checks: [
              { say: R`فيه [[<object>]] بـ [[data]] بيشاور على الـ PDF`, q: "object[data$=\"ep2-notes.pdf\"]" },
              { say: R`نوعه [[application/pdf]]`, q: "object[type=\"application/pdf\"]" },
              { say: R`مقاسه 320 × 200`, q: "object[width=\"320\"][height=\"200\"]" },
              { say: R`ليه [[title]]`, q: "object[title]" },
              { say: R`البديل اللي جواه فيه لينك للملف`, q: "object a[href$=\".pdf\"]" },
              { say: R`لينك [[download]] برّه الـ object`, q: ":not(object) > a[download][href$=\".pdf\"]" },
            ] }, sol: R`~~~live 142 الحل
<h2>ملخص الحلقة ٢</h2>
<object data="media/ep2-notes.pdf" type="application/pdf" width="320" height="200" title="ملخص الحلقة ٢ (PDF)">
  <p>المتصفح مش عارض الملف هنا. <a href="media/ep2-notes.pdf">افتح ملخص الحلقة ٢ (PDF)</a></p>
</object>
<p><a href="media/ep2-notes.pdf" download>نزّل ملخص الحلقة ٢ (PDF، صفحتين)</a></p>
~~~

**هتشوف إيه:**

- هنا: «المتصفح مش عارض الملف هنا» واللينك، وتحتهم لينك التحميل.
- في مشروعك والملف موجود: صندوق 320 × 200 فيه الـ PDF، وتحته لينك التحميل، والجملة البديلة مش ظاهرة.

**ليه لينكين:** اللي جوه بديل: بيظهر بس لما المعاينة تفشل. واللي برّه ثابت: للي عايز الملف على جهازه حتى والمعاينة شغالة.

**الغلطة الشائعة:** [[<object src="...">]]. المتصفح بيتجاهل [[src]] هنا: اتقاس إن الملف مبيتطلبش من السيرفر أصلًا، وبيفضل صندوق فاضي بالمقاس المكتوب (والبديل كمان مبيظهرش)، فتفتكر إن الملف هو اللي فيه مشكلة.

~~~text القياس من Chrome (الملف موجود، سيرفر محلي)
الحجم 320 × 200      ارتفاع البديل = 0      PluginObject «ملخص الحلقة ٢ (PDF)»
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** صفحة «جدول الحلقات» فيها ٣ مشاكل: الجدول PDF في [[<embed>]] ومكتوب «جواه» بديل، ومن غير نوع ولا اسم، ولوجو البودكاست محطوط في [[<object>]]. (من قسم ٤ و ٦ و ٧ في الشرح)`, done: R`الـ PDF بقى [[<object>]] ببديل حقيقي ونوع واسم، واللوجو [[<img>]] بـ [[alt]]، ومفيش [[<embed>]]، وكل الشروط ✓.`, work: { h: 230, start: R`<object data="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='80'%3E%3Crect width='320' height='80' fill='%230f766e'/%3E%3Ctext x='160' y='48' font-size='24' fill='white' text-anchor='middle'%3Eبودكاست المحطة%3C/text%3E%3C/svg%3E"></object>
<h2>جدول حلقات الشهر</h2>
<embed src="media/schedule.pdf" width="320" height="100">
  <p>مش شايف الجدول؟ <a href="media/schedule.pdf">افتحه من هنا</a></p>
</embed>`, checks: [
              { say: R`مفيش [[<embed>]]`, q: "embed", n: 0 },
              { say: R`الجدول في [[<object>]] بـ [[data]] ونوعه PDF`, q: "object[data$=\"schedule.pdf\"][type=\"application/pdf\"]" },
              { say: R`الـ object ليه [[title]]`, q: "object[data$=\"schedule.pdf\"][title]" },
              { say: R`البديل ولينكه **جوه** الـ object`, q: "object > p > a[href$=\"schedule.pdf\"]" },
              { say: R`اللوجو [[<img>]] ليه [[alt]] فيه كلام`, q: "img[src^=\"data:image/svg\"][alt]:not([alt=\"\"])" },
              { say: R`مفيش object للصورة`, q: "object[data^=\"data:image\"]", n: 0 },
            ] }, sol: R`~~~live 200 بعد التصليح
<img alt="بودكاست المحطة" width="320" height="80" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='80'%3E%3Crect width='320' height='80' fill='%230f766e'/%3E%3Ctext x='160' y='48' font-size='24' fill='white' text-anchor='middle'%3Eبودكاست المحطة%3C/text%3E%3C/svg%3E">
<h2>جدول حلقات الشهر</h2>
<object data="media/schedule.pdf" type="application/pdf" width="320" height="100" title="جدول حلقات الشهر (PDF)">
  <p>مش شايف الجدول؟ <a href="media/schedule.pdf">افتحه من هنا</a></p>
</object>
~~~

وده اللي كان باين قبل التصليح:

~~~live 320 قبل
<object data="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='80'%3E%3Crect width='320' height='80' fill='%230f766e'/%3E%3Ctext x='160' y='48' font-size='24' fill='white' text-anchor='middle'%3Eبودكاست المحطة%3C/text%3E%3C/svg%3E"></object>
<h2>جدول حلقات الشهر</h2>
<embed src="media/schedule.pdf" width="320" height="100">
  <p>مش شايف الجدول؟ <a href="media/schedule.pdf">افتحه من هنا</a></p>
</embed>
~~~

**هتشوف إيه:**

- قبل: تحت العنوان صندوق فاضي 320 × 100 (الـ [[<embed>]])، **وتحته** جملة «مش شايف الجدول؟». الجملة دي كانت هتفضل ظاهرة حتى لو الـ PDF اتعرض.
- بعد: الصندوق الفاضي راح، والجملة ظاهرة لأنها بقت بديل حقيقي والملف مش بيتعرض هنا. في مشروعك والملف موجود: الـ PDF يظهر والجملة تختفي.
- اللوجو نفس الشكل في الاتنين.

| المشكلة | التصليح | ليه |
|---|---|---|
| بديل «جوه» [[<embed>]] | [[<object>]] والبديل جواه | [[<embed>]] void: اللي بعده أخ ليه مش ابنه |
| من غير [[type]] ولا [[title]] | اتكتبوا | النوع عشان المتصفح يقرر بدري، والاسم للقارئ |
| لوجو في [[<object>]] | [[<img alt>]] بمقاسه | صورة: محتاجة [[alt]] ومقاس يحجز مكانها |

**الغلطة الشائعة:** تسيب [[</embed>]] في الكود. المتصفح بيتجاهلها في سكوت، والـ validator بيعلّم عليها.

~~~text القياس من Chrome
قبل:   embed.children.length = 0      الفقرة أخت الـ embed مش ابنه       اللوجو: PluginObject «»
بعد:   object > p > a موجود           اللوجو: image «بودكاست المحطة»
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع، وبعدين صلّح:** ده كود بانر من نسخة ٢٠١٠ من موقع «المحطة»: Flash، ولو مشتغلش يبقى SVG، ولو مشتغلش يبقى نص. اكتب على ورقة: إيه اللي هيتعرض في متصفح النهارده؟ وبعدين اكتبه زي ما يتكتب دلوقتي: الصورة لوحدها بنص بديل. (من قسم ٢ و ٦ في الشرح)`, done: R`كتبت توقّعك، ومفيش [[<object>]] خالص، والبانر [[<img>]] بـ [[alt]]، وكل الشروط ✓.`, work: { h: 130, start: R`<object data="media/banner.swf" type="application/x-shockwave-flash" width="320" height="80">
  <object data="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='80'%3E%3Crect width='320' height='80' fill='%230f766e'/%3E%3Ctext x='160' y='48' font-size='24' fill='white' text-anchor='middle'%3Eبودكاست المحطة%3C/text%3E%3C/svg%3E" type="image/svg+xml" width="320" height="80">
    <p>بودكاست المحطة</p>
  </object>
</object>`, checks: [
              { say: R`مفيش [[<object>]]`, q: "object", n: 0 },
              { say: R`البانر [[<img>]]`, q: "img[src^=\"data:image/svg\"]" },
              { say: R`[[alt]] فيه «بودكاست المحطة»`, q: "img[alt*=\"بودكاست المحطة\"]" },
              { say: R`الصورة ليها [[width]] و [[height]]`, q: "img[width][height]" },
            ] }, sol: R`~~~live 106 الحل
<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='80'%3E%3Crect width='320' height='80' fill='%230f766e'/%3E%3Ctext x='160' y='48' font-size='24' fill='white' text-anchor='middle'%3Eبودكاست المحطة%3C/text%3E%3C/svg%3E" alt="بودكاست المحطة" width="320" height="80">
~~~

**التوقّع:** هيتعرض الـ SVG. Flash مش مدعوم في أي متصفح حالي، فالـ [[<object>]] البرّاني بيفشل ويعرض بديله، وبديله [[<object>]] تاني بيشتغل. والنص «بودكاست المحطة» مبيظهرش لأن اللي قبله نجح.

**هتشوف إيه:** نفس البانر الأخضر قبل وبعد. الكود نزل من ٥ سطور لسطر.

**ليه [[<img>]]:** الملف صورة. و [[alt]] بياخد مكان النص البديل القديم، وبيتقري لقارئ الشاشة.

**الغلطة الشائعة:** تسيب سطر الـ Flash «يمكن حد لسه عنده». محدش: المتصفحات شالت الدعم، وأول طلب للملف ده وقت ضايع.

~~~text القياس من Chrome
قبل:   البرّاني (Flash) فشل ← الجوّاني (SVG) اتعرض 320 × 80       PluginObject «»
بعد:   image «بودكاست المحطة»      320 × 80
~~~` },
            { lvl: 'سريع', t: R`**اشرحها:** لكل حاجة من الخمسة قول العنصر المناسب وسبب في كلمتين: (١) لوجو SVG. (٢) منيو المطعم PDF. (٣) خريطة من مزوّد خرايط. (٤) تسجيل صوتي. (٥) لعبة Flash قديمة. (من قسم ٥ و ٦ في الشرح)`, done: R`خمس إجابات، كل واحدة عنصر وسبب.`, sol: R`| الحاجة | العنصر | السبب |
|---|---|---|
| لوجو SVG | [[<img>]] (أو SVG inline لو هيتلوّن بالـ CSS) | صورة: [[alt]] ومقاس |
| منيو PDF | المنيو نفسه HTML، ومعاه لينك للـ PDF. ولو لازم معاينة: [[<object>]] ببديل | الـ PDF مبيتقريش على الموبايل |
| خريطة من مزوّد | [[<iframe>]] بـ [[title]] و [[loading="lazy"]] و [[sandbox]] | صفحة موقع تاني: محتاجة قفل |
| تسجيل صوتي | [[<audio controls>]] | مشغّل، وكيبورد، وقارئ شاشة |
| لعبة Flash | ولا واحد | Flash اتقفل. تتعمل من جديد بـ [[<canvas>]] و JavaScript |

**الغلطة الشائعة:** «كله ينفع في [[<object>]]». ينفع يتعرض، بس بيضيّع كل اللي العنصر المتخصص بيدّيه.` },
          ]
        },
        {
          cmd: "map و area",
          title: "صورة واحدة فيها كذا لينك، كل لينك على حتة منها",
          pre: ["css/img", { to: "css/a و button", why: R`كل [[<area>]] هو لينك زي [[<a>]]: نفس [[href]] ونفس قواعد النص اللي بيوصفه` }],
          ref: [
            { t: "MDN: <map>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/map" },
            { t: "MDN: <area>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/area" },
            { t: "MDN: <img> (usemap, ismap)", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img" },
            { t: "WHATWG: image maps", url: "https://html.spec.whatwg.org/multipage/image-maps.html" }
          ],
          desc: R`الـ image map بيخلّي أجزاء من صورة واحدة تتداس، وكل جزء يودّي لعنوان: مسقط مبنى، خريطة محافظات، صورة فريق. [[<map>]] بيجمع المناطق وليه اسم، و [[<area>]] منطقة واحدة بشكلها ([[shape]]) وإحداثياتها ([[coords]]) وعنوانها ([[href]]) ونصها البديل ([[alt]])، و [[usemap]] على [[<img>]] بيربط الصورة بالخريطة.
وعيبه الكبير: الإحداثيات بالبيكسل ومبتتصغّرش مع الصورة، فعلى الموبايل اللينكات بتروح في غير مكانها. البديل الحديث SVG بلينكات جواه.`,
          example: R`<img src="media/studio-plan.png" alt="مسقط استوديو المحطة: غرفة التسجيل، وغرفة المكساج، والاستقبال" width="300" height="150" usemap="#studio">
<map name="studio">
  <area shape="rect" coords="10,10,140,140" href="rooms.html#rec" alt="غرفة التسجيل">
  <area shape="circle" coords="220,50,40" href="rooms.html#mix" alt="غرفة المكساج">
  <area shape="poly" coords="160,140,220,100,280,140" href="rooms.html#wait" alt="الاستقبال">
  <area shape="default" href="rooms.html" alt="كل الغرف">
</map>`,
          flag: "script",
          lines: [
            R`الصورة: [[alt]] بيوصفها كلها، و [[width]] و [[height]] مقاسها (الإحداثيات محسوبة عليه)، و [[usemap="#studio"]] بيقول «مناطقي في الخريطة اللي اسمها studio». علامة [[#]] إجبارية.`,
            R`[[<map name="studio">]]: الحاوية بتاعة المناطق. الاسم في [[name]] من غير [[#]]، ولازم يطابق اللي في [[usemap]].`,
            R`مستطيل: [[coords]] فيها ركنين، فوق-شمال (10,10) وتحت-يمين (140,140). و [[href]] اللينك، و [[alt]] اسمه.`,
            R`دايرة: المركز (220,50) ونص القطر 40.`,
            R`مضلّع: نقطة ورا نقطة (x,y)، هنا تلات نقط يعني مثلث. المتصفح بيقفل الشكل من آخر نقطة لأول نقطة.`,
            R`[[shape="default"]]: كل اللي فاضل من الصورة برّه المناطق التانية. من غير [[coords]].`,
            R`قفلة [[</map>]]. الـ [[<map>]] نفسه مبيترسمش، فمكانه في الكود مش مهم، والمعتاد بعد الصورة على طول.`
          ],
          teach: R`## الفكرة في سطرين

المواصفة: الـ image map بيخلّي مناطق هندسية على صورة مربوطة بلينكات. الصورة [[<img>]] عادية، والمناطق متعرّفة في عنصر تاني اسمه [[<map>]]، والاتنين مربوطين بالاسم.

القياسات من Chrome 157 على Windows 11. الصورة في المعاينات مسقط 300 × 150 مرسوم SVG: مربع أخضر (غرفة التسجيل)، ودايرة برتقالي (المكساج)، ومثلث أزرق (الاستقبال).

---

## ١. [[<img usemap="#studio">]] و [[<map name="studio">]]

~~~live 176 حرّك الماوس على الأشكال، أو دوس Tab
<img alt="مسقط استوديو المحطة: غرفة التسجيل، وغرفة المكساج، والاستقبال" width="300" height="150" usemap="#studio" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 150'%3E%3Crect width='300' height='150' fill='%23e2e8f0'/%3E%3Crect x='10' y='10' width='130' height='130' fill='%230f766e'/%3E%3Ccircle cx='220' cy='50' r='40' fill='%23b45309'/%3E%3Cpolygon points='160,140 220,100 280,140' fill='%231d4ed8'/%3E%3C/svg%3E">
<map name="studio">
  <area shape="rect" coords="10,10,140,140" href="#rec" alt="غرفة التسجيل">
  <area shape="circle" coords="220,50,40" href="#mix" alt="غرفة المكساج">
  <area shape="poly" coords="160,140,220,100,280,140" href="#wait" alt="الاستقبال">
</map>
~~~

**هتشوف إيه:** الصورة عادية، ومفيش أي حاجة بتقول إن فيها لينكات. لما الماوس يعدّي على المربع أو الدايرة أو المثلث بيبقى إيد، وعلى الرمادي بيفضل سهم. ولما تدوس Tab، حدود الشكل بتترسم حواليه (ده الـ focus).

~~~text القياس من Chrome (document.elementFromPoint: العنصر اللي تحت النقطة)
النقطة (50,50)    →  AREA  (المستطيل)
النقطة (220,50)   →  AREA  (الدايرة)
النقطة (220,125)  →  AREA  (المثلث)
النقطة (150,5)    →  IMG   (مفيش منطقة هنا)

<map>:   display: inline     <area>:  display: none
document.links.length بيعدّ كل <area> ليه href
~~~

- [[usemap]] بياخد [[#]] وبعدها اسم الخريطة. اتقاس: [[usemap="studio"]] من غير [[#]] مبيشتغلش خالص (النقطة رجّعت [[IMG]]).
- الاسم بيتكتب في [[name]] على [[<map>]]. (Chrome قِبل [[id]] لوحده كمان، بس المواصفة بتطلب [[name]].)
- نفس الخريطة ممكن تتربط بأكتر من صورة.
- MDN: [[usemap]] مينفعش على صورة جوه [[<a>]] أو [[<button>]].

---

## ٢. [[<area shape="rect" coords="10,10,140,140" href="..." alt="...">]]

### [[shape]] و [[coords]]

الإحداثيات بالبيكسل (CSS pixels)، محسوبة من **الركن فوق-شمال** للصورة: x بيزيد ناحية اليمين، و y بيزيد لتحت. ده حتى في صفحة عربي RTL.

| [[shape]] | [[coords]] | معناها |
|---|---|---|
| [[rect]] | [[x1,y1,x2,y2]] | ركن فوق-شمال، وركن تحت-يمين |
| [[circle]] | [[x,y,r]] | المركز، ونص القطر |
| [[poly]] | [[x1,y1,x2,y2,x3,y3,...]] | نقط الشكل بالترتيب، وبيتقفل لوحده |
| [[default]] | (من غير) | كل الصورة اللي مش تبع منطقة تانية |

من غير [[shape]] المتصفح بيعتبرها [[rect]].

بتجيب الأرقام منين؟ افتح الصورة في أي برنامج رسم وحرّك الماوس: الإحداثيات بتتكتب تحت. أو ارسم الأشكال في برنامج بيطلّع كود الـ [[<map>]] جاهز.

### لما منطقتين يركبوا على بعض

~~~text القياس من Chrome
<area rect 0,0,100,50  href="/big">  وبعده  <area rect 0,0,30,30  href="/small">
   النقطة (10,10)  →  big          ← اللي مكتوب الأول هو اللي فوق، والصغير مبيتوصلوش
<area shape="default">  وبعده  <area rect 0,0,50,50>
   النقطة (20,20)  →  rect         ← default دايمًا آخر واحد، مهما كان مكانه في الكود
~~~

القاعدة: **الصغير الأول والكبير بعده.**

### [[href]] و [[alt]]

- [[<area href>]] لينك كامل: بياخد [[target]] و [[rel]] و [[download]] و [[referrerpolicy]] زي [[<a>]].
- [[alt]] هو **نص اللينك**: [[<area>]] عنصر فاضي ملوش كلام جواه، فالاسم كله من [[alt]]. MDN: إجباري طول ما فيه [[href]].
- [[<area>]] من غير [[href]] منطقة ميتة: مبتتداسش. بتتستخدم عشان «تخرم» حتة من منطقة أكبر مكتوبة بعدها.

~~~text القياس من Chrome (شجرة الـ accessibility)
image «مسقط استوديو المحطة: غرفة التسجيل، وغرفة المكساج، والاستقبال»
link «غرفة التسجيل»
link «غرفة المكساج»
link «الاستقبال»
<area> من غير href:   مش في الشجرة      computedRole فاضي
~~~

قارئ الشاشة بيشوف صورة وبعدها تلات لينكات بأساميهم من [[alt]]. من غير [[alt]] بيبقوا تلات لينكات من غير اسم.

---

## ٣. [[<img ismap>]]: الخريطة اللي السيرفر بيحسبها

[[ismap]] شكل تاني أقدم: الصورة جوه [[<a>]]، والمتصفح بيزوّد مكان الضغطة على آخر العنوان، والسيرفر هو اللي يقرر.

~~~html
<a href="/pick"><img src="media/studio-plan.png" alt="اختار مكان في الاستوديو" width="300" height="150" ismap></a>
~~~

~~~text القياس من Chrome (ضغطة حقيقية على النقطة 120,40 من الصورة، والسيرفر كتب الطلب)
GET /pick?120,40
~~~

- MDN: [[ismap]] مسموح بس على صورة جوه [[<a>]] ليه [[href]].
- اللي بيدوس Enter بالكيبورد مبيبعتش مكان، وقارئ الشاشة بيشوف لينك واحد. عشان كده مبقاش بيتستخدم: [[usemap]] (المتصفح بيحسب) أحسن منه في كل حاجة.

---

## ٤. المشكلة: الصورة بتتصغّر، والإحداثيات لأ

دي نفس الخريطة، والصورة معروضة بنص المقاس (150 × 75) زي ما بيحصل على شاشة ضيقة مع [[max-width: 100%]]:

~~~live 102 نفس الـ coords على صورة متصغّرة: الماوس بيبقى إيد في أماكن غلط
<img alt="مسقط استوديو المحطة" style="width:150px;height:75px" usemap="#small" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 150'%3E%3Crect width='300' height='150' fill='%23e2e8f0'/%3E%3Crect x='10' y='10' width='130' height='130' fill='%230f766e'/%3E%3Ccircle cx='220' cy='50' r='40' fill='%23b45309'/%3E%3Cpolygon points='160,140 220,100 280,140' fill='%231d4ed8'/%3E%3C/svg%3E">
<map name="small">
  <area shape="rect" coords="10,10,140,140" href="#rec" alt="غرفة التسجيل">
  <area shape="circle" coords="220,50,40" href="#mix" alt="غرفة المكساج">
  <area shape="poly" coords="160,140,220,100,280,140" href="#wait" alt="الاستقبال">
</map>
~~~

**هتشوف إيه:** الصورة الصغيرة كلها تقريبًا بقت لينك واحد: حرّك الماوس على الدايرة البرتقالي، هتلاقيه إيد، والعنوان اللي بيظهر تحت في المتصفح بتاع «غرفة التسجيل» مش «المكساج».

~~~text القياس من Chrome (الصورة 150 × 75)
النقطة (25,25)    مكان المربع الأخضر      →  المستطيل   ✓
النقطة (110,25)   مكان الدايرة البرتقالي  →  المستطيل   ✗ لينك غلط
النقطة (145,70)   جنب المثلث              →  مفيش منطقة
~~~

الإحداثيات مكتوبة لصورة 300 × 150. المستطيل (من 10 لـ 140) لسه واخد نفس البيكسلات، يعني غطّى الصورة الصغيرة كلها تقريبًا، والدايرة اللي مركزها عند 220 بقت برّه الصورة خالص. HTML معندوش طريقة يكتب بيها الإحداثيات كنسبة.

---

## ٥. البديل الحديث: SVG بلينكات

في SVG، [[viewBox]] بيعرّف مساحة الرسم بأرقامها (هنا 300 × 150)، والأشكال بتتكتب بالأرقام دي، وكل حاجة بتكبر وتصغر مع بعض. واللينك [[<a>]] عادي حوالين الشكل.

~~~live 102 نفس المسقط SVG بنص المقاس: كل لينك في مكانه
<svg viewBox="0 0 300 150" width="150" role="group" aria-label="مسقط استوديو المحطة">
  <rect width="300" height="150" fill="#e2e8f0"/>
  <a href="#rec" aria-label="غرفة التسجيل"><rect x="10" y="10" width="130" height="130" fill="#0f766e"/></a>
  <a href="#mix" aria-label="غرفة المكساج"><circle cx="220" cy="50" r="40" fill="#b45309"/></a>
  <a href="#wait" aria-label="الاستقبال"><polygon points="160,140 220,100 280,140" fill="#1d4ed8"/></a>
</svg>
~~~

**هتشوف إيه:** نفس الرسم متصغّر، والماوس بيبقى إيد على كل شكل لوحده، والعنوان اللي تحت صح.

~~~text القياس من Chrome (الـ SVG معروض بعرض 150)
النقطة (30,30)    →  rect جوه <a href="#rec">      ✓
النقطة (110,25)   →  circle جوه <a href="#mix">    ✓
شجرة الـ accessibility:   group «مسقط استوديو المحطة»   link «غرفة التسجيل»   link «غرفة المكساج»   link «الاستقبال»
~~~

والمكسب التاني: الأشكال عناصر حقيقية، فالـ CSS بيلوّنها مع [[:hover]] و [[:focus-visible]] والزائر يشوف هو فوق إيه. الـ [[<area>]] مبيتلوّنش. شرح SVG نفسه في درس «SVG».

ولو الصورة فوتوغرافية ومش هتتحوّل SVG: قايمة لينكات عادية تحت الصورة، وده أبسط وأضمن حل.

---

## ٦. إمتى الـ image map فكرة وحشة؟

| الحالة | الحكم |
|---|---|
| صفحة responsive والصورة بتتصغّر | لأ: اللينكات هتروح في غير مكانها (قسم ٤) |
| المناطق صغيرة أو لازقة في بعض | لأ: الصباع على الموبايل محتاج هدف كبير |
| محتاج المنطقة تتلوّن لما الماوس يعدّي عليها | لأ: [[<area>]] مبيتنسّقش بالـ CSS |
| قايمة تنقّل أو أزرار معمولة صورة واحدة | لأ: دي لينكات عادية بـ CSS |
| صورة مقاسها ثابت فعلًا (إيميل، كشك عرض) | ممكن |
| موقع قديم بتصونه | سيبه شغال، وزوّد قايمة لينكات نصية تحته |

---

## ٧. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[usemap="studio"]] من غير [[#]] | الخريطة مش مربوطة: الصورة مفيهاش ولا لينك |
| [[<area href>]] من غير [[alt]] | لينك من غير اسم لقارئ الشاشة |
| منطقة كبيرة مكتوبة قبل صغيرة جواها | الصغيرة عمرها ما بتتداس |
| [[coords]] محسوبة على مقاس الملف، والصورة معروضة بمقاس تاني | كل اللينكات مزحزحة |
| [[coords="10%,10%,50%,50%"]] أو [[coords="10px,10px,140px,140px"]] | أرقام بيكسل بس، من غير [[px]] ولا [[%]] |
| الاعتماد على الصورة لوحدها | محدش عارف إن فيها لينكات: مفيش أي علامة |

---

## الخلاصة

- [[<img usemap="#اسم">]] + [[<map name="اسم">]] + [[<area shape coords href alt>]].
- [[rect]] ركنين، و [[circle]] مركز ونص قطر، و [[poly]] نقط، و [[default]] الباقي. من فوق-شمال وبالبيكسل.
- [[alt]] هو نص اللينك، والصغير يتكتب قبل الكبير.
- الإحداثيات مبتتصغّرش: في صفحة responsive استخدم SVG بـ [[<a>]]، أو لينكات عادية.
- [[ismap]] بيبعت مكان الضغطة للسيرفر، ومبقاش ليه استخدام.`,
          try: R`انسخ كود قسم ١ في ملف [[plan.html]] (الصورة بـ [[data:]] زي ما هي) وزوّد منطقة رابعة [[shape="default"]] بتودّي لـ [[#all]] واسمها «باقي الاستوديو». افتحها وحرّك الماوس على الرمادي: بقى إيد؟ وبعدين انقل سطر الـ [[default]] لأول الـ [[<map>]] وجرّب المربع الأخضر: لسه بيودّي لـ [[#rec]]؟`,
          sol: R`~~~live 176 plan.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مسقط الاستوديو</title>
</head>
<body>
<img alt="مسقط استوديو المحطة: غرفة التسجيل، وغرفة المكساج، والاستقبال" width="300" height="150" usemap="#studio" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 150'%3E%3Crect width='300' height='150' fill='%23e2e8f0'/%3E%3Crect x='10' y='10' width='130' height='130' fill='%230f766e'/%3E%3Ccircle cx='220' cy='50' r='40' fill='%23b45309'/%3E%3Cpolygon points='160,140 220,100 280,140' fill='%231d4ed8'/%3E%3C/svg%3E">
<map name="studio">
  <area shape="rect" coords="10,10,140,140" href="#rec" alt="غرفة التسجيل">
  <area shape="circle" coords="220,50,40" href="#mix" alt="غرفة المكساج">
  <area shape="poly" coords="160,140,220,100,280,140" href="#wait" alt="الاستقبال">
  <area shape="default" href="#all" alt="باقي الاستوديو">
</map>
</body>
</html>
~~~

**هتشوف إيه:**

- الماوس بقى إيد على **كل** الصورة: الأشكال التلاتة كل واحد بلينكه، والرمادي بيودّي لـ [[#all]].
- بعد ما تنقل [[default]] لأول سطر: مفيش أي تغيير. المربع لسه [[#rec]].

**ليه كده:** [[default]] معناه «اللي فاضل»، فالمتصفح بيحسبه آخر واحد مهما كان ترتيبه في الكود. الترتيب بيفرق بين المناطق اللي ليها [[coords]] بس.

**الغلطة الشائعة:** [[<area shape="default" coords="0,0,300,150">]]. MDN: [[coords]] ممنوع مع [[default]].

~~~text القياس من Chrome
النقطة (150,5) قبل ما تزوّد default:   IMG
بعد default:                           AREA (باقي الاستوديو)
default مكتوب الأول، والنقطة (20,20) جوه مستطيل بعده:   AREA (المستطيل)
~~~`,
          deep: {
            why: R`أول الويب، قايمة التنقّل كانت صورة واحدة مرسوم عليها الأزرار، والـ image map كان الطريقة الوحيدة تخلّي كل زرار يودّي لمكان. الـ CSS شال الحاجة دي. اللي فضل: صورة فعلًا فيها أماكن (خريطة، مسقط، صورة جماعية) وعايز كل مكان يتداس. وحتى ده، SVG بيعمله أحسن.`,
            how: R`لما الماوس يتحرك فوق صورة عليها [[usemap]]، المتصفح بيدوّر على [[<map>]] بالاسم، وبيمشي على الـ [[<area>]] بالترتيب: أول واحدة النقطة تقع جوه شكلها هي اللي بتاخد الضغطة، و [[default]] بيتجرّب في الآخر. الإحداثيات بتتحسب من ركن الصورة فوق-شمال بالـ CSS pixels من غير أي تحويل، وعشان كده تصغير الصورة بيبوّظها. وكل [[<area href>]] بيدخل ترتيب الـ Tab وشجرة الـ accessibility كلينك اسمه من [[alt]].`,
            when: R`صورة بمقاس ثابت فيها مناطق واضحة وكبيرة: مسقط في صفحة داخلية للديسكتوب، أو قالب إيميل (الإيميل مبيدعمش SVG كويس). في أي حاجة responsive: SVG inline بلينكات، أو صورة وتحتها قايمة لينكات.`,
            mistakes: R`نسيان [[#]] في [[usemap]]. [[alt]] ناقص على المناطق. إحداثيات على مقاس غير المعروض. منطقة كبيرة قبل الصغيرة. والاعتماد على image map في صفحة بتتصغّر على الموبايل.`
          },
          practice: [
            { lvl: 'تطبيق', t: R`**ابني:** مسقط الاستوديو محطوط صورة عادية. خلّي غرفتين يتداسوا: المربع الأخضر (ركنه فوق-شمال 10,10 وتحت-يمين 140,140) يودّي لـ [[#rec]] واسمه «غرفة التسجيل»، والدايرة البرتقالي (مركزها 220,50 ونص قطرها 40) تودّي لـ [[#mix]] واسمها «غرفة المكساج». سمّي الخريطة [[plan]]. (من قسم ١ و ٢ في الشرح)`, done: R`الماوس بيبقى إيد على المربع والدايرة بس، وكل الشروط ✓.`, work: { h: 200, start: R`<img alt="مسقط استوديو المحطة" width="300" height="150" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 150'%3E%3Crect width='300' height='150' fill='%23e2e8f0'/%3E%3Crect x='10' y='10' width='130' height='130' fill='%230f766e'/%3E%3Ccircle cx='220' cy='50' r='40' fill='%23b45309'/%3E%3Cpolygon points='160,140 220,100 280,140' fill='%231d4ed8'/%3E%3C/svg%3E">`, checks: [
              { say: R`الصورة عليها [[usemap="#plan"]]`, q: "img[usemap=\"#plan\"]" },
              { say: R`فيه [[<map name="plan">]]`, q: "map[name=\"plan\"]" },
              { say: R`جواه منطقتين`, q: "map[name=\"plan\"] > area", n: 2 },
              { say: R`المستطيل بإحداثياته ولينكه`, q: "area[shape=\"rect\"][coords=\"10,10,140,140\"][href=\"#rec\"]" },
              { say: R`الدايرة بإحداثياتها ولينكها`, q: "area[shape=\"circle\"][coords=\"220,50,40\"][href=\"#mix\"]" },
              { say: R`كل منطقة ليها [[alt]] فيه كلام`, q: "area[alt]:not([alt=\"\"])", n: 2 },
            ] }, sol: R`~~~live 176 الحل
<img alt="مسقط استوديو المحطة" width="300" height="150" usemap="#plan" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 150'%3E%3Crect width='300' height='150' fill='%23e2e8f0'/%3E%3Crect x='10' y='10' width='130' height='130' fill='%230f766e'/%3E%3Ccircle cx='220' cy='50' r='40' fill='%23b45309'/%3E%3Cpolygon points='160,140 220,100 280,140' fill='%231d4ed8'/%3E%3C/svg%3E">
<map name="plan">
  <area shape="rect" coords="10,10,140,140" href="#rec" alt="غرفة التسجيل">
  <area shape="circle" coords="220,50,40" href="#mix" alt="غرفة المكساج">
</map>
~~~

**هتشوف إيه:** الصورة زي ما هي. الماوس إيد على المربع والدايرة، وسهم على المثلث والرمادي. و Tab بيقف مرتين.

**ليه كده:**

- [[usemap="#plan"]] بالـ [[#]]، و [[name="plan"]] من غيرها.
- [[rect]] أربع أرقام، و [[circle]] تلاتة، بينهم فواصل من غير مسافات.
- المثلث مالوش [[<area>]]، فمبيتداسش.

**الغلطة الشائعة:** تكتب إحداثيات الدايرة أربع أرقام زي المستطيل. [[circle]] مركز ونص قطر بس.

~~~text القياس من Chrome
(50,50) → AREA      (220,50) → AREA      (220,125) → IMG
link «غرفة التسجيل»      link «غرفة المكساج»
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** خريطة مسقط الاستوديو مفيش فيها ولا حتة بتتداس. فيه ٤ مشاكل: الربط بين الصورة والخريطة ناقصه حرف، والأسامي مش زي بعض، والمناطق من غير أسامي، وشكل مكتوب غلط. (من قسم ١ و ٢ و ٧ في الشرح)`, done: R`الماوس بيبقى إيد على المربع والدايرة، وكل الشروط ✓.`, work: { h: 200, start: R`<img alt="مسقط استوديو المحطة" width="300" height="150" usemap="studio" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 150'%3E%3Crect width='300' height='150' fill='%23e2e8f0'/%3E%3Crect x='10' y='10' width='130' height='130' fill='%230f766e'/%3E%3Ccircle cx='220' cy='50' r='40' fill='%23b45309'/%3E%3Cpolygon points='160,140 220,100 280,140' fill='%231d4ed8'/%3E%3C/svg%3E">
<map name="studio-map">
  <area shape="rectangle" coords="10,10,140,140" href="#rec">
  <area shape="circle" coords="220,50,40" href="#mix">
</map>`, checks: [
              { say: R`[[usemap]] بيبدأ بـ [[#]]`, q: "img[usemap^=\"#\"]" },
              { say: R`اسم الخريطة هو نفسه اللي في [[usemap]]`, q: "img[usemap=\"#studio\"] ~ map[name=\"studio\"], img[usemap=\"#studio-map\"] ~ map[name=\"studio-map\"]" },
              { say: R`المستطيل [[shape="rect"]]`, q: "area[shape=\"rect\"][href=\"#rec\"]" },
              { say: R`مفيش [[shape="rectangle"]]`, q: "area[shape=\"rectangle\"]", n: 0 },
              { say: R`المنطقتين ليهم [[alt]] فيه كلام`, q: "area[alt]:not([alt=\"\"])", n: 2 },
            ] }, sol: R`~~~live 176 بعد التصليح
<img alt="مسقط استوديو المحطة" width="300" height="150" usemap="#studio" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 150'%3E%3Crect width='300' height='150' fill='%23e2e8f0'/%3E%3Crect x='10' y='10' width='130' height='130' fill='%230f766e'/%3E%3Ccircle cx='220' cy='50' r='40' fill='%23b45309'/%3E%3Cpolygon points='160,140 220,100 280,140' fill='%231d4ed8'/%3E%3C/svg%3E">
<map name="studio">
  <area shape="rect" coords="10,10,140,140" href="#rec" alt="غرفة التسجيل">
  <area shape="circle" coords="220,50,40" href="#mix" alt="غرفة المكساج">
</map>
~~~

**هتشوف إيه:** الصورة نفسها قبل وبعد (الخريطة مبتترسمش، فمفيش فرق في الشكل). الفرق في الماوس: قبل سهم في كل حتة، وبعد إيد على المربع والدايرة.

| المشكلة | التصليح | ليه |
|---|---|---|
| [[usemap="studio"]] | [[usemap="#studio"]] | من غير [[#]] الربط مبيحصلش |
| [[name="studio-map"]] | [[name="studio"]] | الاسمين لازم يتطابقوا بالحرف |
| من غير [[alt]] | زوّدناه | هو اسم اللينك |
| [[shape="rectangle"]] | [[rect]] | القيم أربعة بس: [[rect]] و [[circle]] و [[poly]] و [[default]] |

**الغلطة الشائعة:** تصلّح الاسم وتنسى الـ [[#]] أو العكس. الاتنين لازم مع بعض.

~~~text القياس من Chrome
usemap="studio" (من غير #):    النقطة (20,20) → IMG       ولا لينك
usemap="#studio" واسم مطابق:   النقطة (20,20) → AREA      link «غرفة التسجيل»
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع، وبعدين صلّح:** في خريطة الاستوديو منطقة صغيرة «باب الطوارئ» (30 × 30 في ركن غرفة التسجيل) ومنطقة غرفة التسجيل كلها. اكتب على ورقة: لما تدوس على ركن الباب (النقطة 20,20) هتروح فين؟ وبعدين رتّبهم عشان الباب يتداس. (من قسم ٢ في الشرح، جزء «لما منطقتين يركبوا على بعض»)`, done: R`كتبت توقّعك، ومنطقة الباب بقت مكتوبة قبل غرفة التسجيل، وكل الشروط ✓.`, work: { h: 200, start: R`<img alt="مسقط استوديو المحطة" width="300" height="150" usemap="#s" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 150'%3E%3Crect width='300' height='150' fill='%23e2e8f0'/%3E%3Crect x='10' y='10' width='130' height='130' fill='%230f766e'/%3E%3Ccircle cx='220' cy='50' r='40' fill='%23b45309'/%3E%3Cpolygon points='160,140 220,100 280,140' fill='%231d4ed8'/%3E%3C/svg%3E">
<map name="s">
  <area shape="rect" coords="10,10,140,140" href="#rec" alt="غرفة التسجيل">
  <area shape="rect" coords="10,10,40,40" href="#exit" alt="باب الطوارئ">
</map>`, checks: [
              { say: R`الباب هو أول [[<area>]]`, q: "map > area:first-child[href=\"#exit\"]" },
              { say: R`غرفة التسجيل بعده`, q: "map > area:last-child[href=\"#rec\"]" },
              { say: R`الإحداثيات متغيّرتش`, q: "area[coords=\"10,10,40,40\"][href=\"#exit\"]" },
            ] }, sol: R`~~~live 176 بعد الترتيب
<img alt="مسقط استوديو المحطة" width="300" height="150" usemap="#s" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 150'%3E%3Crect width='300' height='150' fill='%23e2e8f0'/%3E%3Crect x='10' y='10' width='130' height='130' fill='%230f766e'/%3E%3Ccircle cx='220' cy='50' r='40' fill='%23b45309'/%3E%3Cpolygon points='160,140 220,100 280,140' fill='%231d4ed8'/%3E%3C/svg%3E">
<map name="s">
  <area shape="rect" coords="10,10,40,40" href="#exit" alt="باب الطوارئ">
  <area shape="rect" coords="10,10,140,140" href="#rec" alt="غرفة التسجيل">
</map>
~~~

**التوقّع:** هتروح [[#rec]]. غرفة التسجيل مكتوبة الأول وبتغطّي النقطة، فالمتصفح بيقف عندها ومبيوصلش للباب.

**هتشوف إيه:** الصورة واحدة. بعد الترتيب: حرّك الماوس على ركن المربع الأخضر فوق-شمال، العنوان اللي بيظهر تحت في المتصفح آخره [[#exit]]، وفي باقي المربع [[#rec]].

**ليه كده:** أول [[<area>]] النقطة تقع جواها هي اللي بتكسب. فالمنطقة اللي جوه منطقة تانية لازم تتكتب قبلها.

**الغلطة الشائعة:** تحاول تحلها بـ [[z-index]]. الـ [[<area>]] مبيترسمش، فالـ CSS ملوش كلمة هنا: الترتيب في الكود بس.

~~~text القياس من Chrome (مستطيل كبير 0,0,100,50 وصغير 0,0,30,30)
الكبير الأول:    النقطة (10,10) → big
الصغير الأول:    النقطة (10,10) → small      النقطة (60,25) → big
~~~` },
            { lvl: 'تطبيق', t: R`**refactor:** الخريطة دي شغالة، بس الصفحة بقت responsive والصورة بتتصغّر. حوّلها لـ SVG بلينكات: نفس المربع ونفس الدايرة بنفس الأرقام، وكل شكل جوه [[<a>]] بنفس الـ [[href]] واسمه في [[aria-label]]، والـ SVG بـ [[viewBox="0 0 300 150"]] ومعروض بعرض 150. (من قسم ٥ في الشرح)`, done: R`مفيش [[<img>]] ولا [[<map>]]، والرسم بنص المقاس وكل شكل بيتداس في مكانه، وكل الشروط ✓.`, work: { h: 200, start: R`<img alt="مسقط استوديو المحطة" style="width:150px;height:75px" usemap="#plan" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 150'%3E%3Crect width='300' height='150' fill='%23e2e8f0'/%3E%3Crect x='10' y='10' width='130' height='130' fill='%230f766e'/%3E%3Ccircle cx='220' cy='50' r='40' fill='%23b45309'/%3E%3Cpolygon points='160,140 220,100 280,140' fill='%231d4ed8'/%3E%3C/svg%3E">
<map name="plan">
  <area shape="rect" coords="10,10,140,140" href="#rec" alt="غرفة التسجيل">
  <area shape="circle" coords="220,50,40" href="#mix" alt="غرفة المكساج">
</map>`, checks: [
              { say: R`مفيش [[<map>]] ولا [[<area>]]`, q: "map, area", n: 0 },
              { say: R`فيه [[<svg>]] بـ [[viewBox="0 0 300 150"]]`, q: "svg[viewBox=\"0 0 300 150\"]" },
              { say: R`المربع [[<rect>]] جوه لينك [[#rec]]`, q: "svg a[href=\"#rec\"] > rect[x=\"10\"][y=\"10\"][width=\"130\"][height=\"130\"]" },
              { say: R`الدايرة [[<circle>]] جوه لينك [[#mix]]`, q: "svg a[href=\"#mix\"] > circle[cx=\"220\"][cy=\"50\"][r=\"40\"]" },
              { say: R`اللينكين ليهم [[aria-label]]`, q: "svg a[aria-label]", n: 2 },
              { say: R`الـ SVG كله ليه اسم ([[aria-label]])`, q: "svg[aria-label]" },
            ] }, sol: R`~~~live 102 الحل
<svg viewBox="0 0 300 150" width="150" role="group" aria-label="مسقط استوديو المحطة">
  <rect width="300" height="150" fill="#e2e8f0"/>
  <a href="#rec" aria-label="غرفة التسجيل"><rect x="10" y="10" width="130" height="130" fill="#0f766e"/></a>
  <a href="#mix" aria-label="غرفة المكساج"><circle cx="220" cy="50" r="40" fill="#b45309"/></a>
</svg>
~~~

وده اللي كان قبل (جرّب الماوس على الدايرة في الاتنين):

~~~live 102 قبل
<img alt="مسقط استوديو المحطة" style="width:150px;height:75px" usemap="#plan" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 150'%3E%3Crect width='300' height='150' fill='%23e2e8f0'/%3E%3Crect x='10' y='10' width='130' height='130' fill='%230f766e'/%3E%3Ccircle cx='220' cy='50' r='40' fill='%23b45309'/%3E%3Cpolygon points='160,140 220,100 280,140' fill='%231d4ed8'/%3E%3C/svg%3E">
<map name="plan">
  <area shape="rect" coords="10,10,140,140" href="#rec" alt="غرفة التسجيل">
  <area shape="circle" coords="220,50,40" href="#mix" alt="غرفة المكساج">
</map>
~~~

**هتشوف إيه:**

- قبل: الدايرة البرتقالي بتودّي لـ [[#rec]] (لينك المربع)، لأن إحداثيات المربع غطّت الصورة الصغيرة.
- بعد: نفس الرسم (من غير المثلث)، والدايرة بتودّي لـ [[#mix]].

**التحويل:**

| في الـ map | في الـ SVG |
|---|---|
| [[rect]] و [[coords="10,10,140,140"]] (ركنين) | [[<rect x="10" y="10" width="130" height="130">]] (ركن وعرض وارتفاع: 140 − 10 = 130) |
| [[circle]] و [[coords="220,50,40"]] | [[<circle cx="220" cy="50" r="40">]] |
| [[href]] على [[<area>]] | [[<a href>]] حوالين الشكل |
| [[alt]] | [[aria-label]] على [[<a>]] |

**الغلطة الشائعة:** تكتب [[width="140" height="140"]] للمربع. [[coords]] فيها ركنين، و SVG عايز عرض وارتفاع: اطرح.

~~~text القياس من Chrome (الاتنين معروضين بعرض 150)
map:   النقطة (110,25) → المستطيل (غلط)
SVG:   النقطة (110,25) → circle جوه a[href="#mix"]      link «غرفة المكساج»
~~~` },
            { lvl: 'سريع', t: R`**اشرحها:** لكل حالة قول: image map ولا SVG بلينكات ولا لينكات عادية؟ وسبب في سطر: (١) خريطة مصر، كل محافظة تودّي لصفحة فروعها، والموقع بيتفتح على الموبايل. (٢) شريط تنقّل فيه خمس كلمات، المصمم بعته صورة واحدة. (٣) قالب إيميل فيه صورة عرض، نصها الشمال يودّي لمنتج ونصها اليمين لمنتج تاني. (من قسم ٦ في الشرح)`, done: R`تلات إجابات بأسبابها.`, sol: R`إجابة نموذجية:

1. **SVG بلينكات، ومعاه قايمة المحافظات نص.** الصفحة responsive فالإحداثيات هتبوظ، والمحافظات الصغيرة صعب تتداس بالصباع، فالقايمة النصية هي اللي هتتستخدم فعلًا على الموبايل.
2. **لينكات عادية بـ CSS.** ده نص، ومكانه [[<nav>]] فيه [[<a>]]. الصورة مبتتترجمش ومبتتكبرش مع الخط ومحرك البحث مبيقراش اللي فيها.
3. **image map (أو صورتين جنب بعض، كل واحدة جوه [[<a>]]).** برامج الإيميل دعمها لـ SVG والـ CSS ضعيف، والمقاس ثابت. والصورتين أبسط وأضمن من الخريطة.

**الغلطة الشائعة:** تختار image map «عشان أسرع». كتابته أسرع فعلًا، وبعدين أول شاشة موبايل بتكشفه.` },
          ]
        },
        {
          cmd: "canvas و noscript و template",
          title: "تلات عناصر مستنيين JavaScript: لوحة رسم، ورسالة للي مقفّله، وقالب مستخبي",
          pre: [{ to: "css/iframe sandbox و allow", why: R`معاينة [[<noscript>]] هنا معمولة بـ [[<iframe sandbox>]] اللي بيقفل السكربتات، واتشرح هناك` }],
          ref: [
            { t: "MDN: <canvas>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/canvas" },
            { t: "MDN: <noscript>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/noscript" },
            { t: "MDN: <template>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/template" },
            { t: "MDN: <slot>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/slot" },
            { t: "WHATWG: the canvas element", url: "https://html.spec.whatwg.org/multipage/canvas.html#the-canvas-element" },
            { t: "WHATWG: scripting (noscript, template, slot)", url: "https://html.spec.whatwg.org/multipage/scripting.html" }
          ],
          desc: R`التلاتة دول HTML شغله بيبدأ لما JavaScript ييجي. [[<canvas>]] مساحة فاضية السكربت بيرسم عليها بالبيكسل. [[<noscript>]] محتوى بيظهر بس عند اللي JavaScript مقفول عنده. و [[<template>]] حتة HTML المتصفح بيقراها وميعرضهاش، لحد ما سكربت ينسخها ويحطها في الصفحة.
ومعاهم [[<slot>]]: فتحة جوه component بيتحط فيها محتوى من برّه. الدرس ده بيشرح جزء الـ HTML بس: العنصر بيعمل إيه لوحده، وإيه اللي بيتكتب جواه. الرسم والنسخ والـ components في كورس JavaScript.`,
          example: R`<canvas id="chart" width="300" height="120">عدد مرات سماع الحلقات: الأولى ٤٠، والتانية ٦٥، والتالتة ٩٠.</canvas>
<script>
  const ctx = document.getElementById("chart").getContext("2d");
  ctx.fillStyle = "teal";
  ctx.fillRect(20, 20, 100, 60);
</script>
<noscript><p>الرسم محتاج JavaScript. الأرقام مكتوبة في الجدول تحت.</p></noscript>
<template id="episode-row">
  <li><a href="#">عنوان الحلقة</a></li>
</template>`,
          flag: "script",
          lines: [
            R`[[<canvas>]] بمقاس 300 × 120 بيكسل و [[id]] عشان السكربت يلاقيه. والكلام اللي جواه هو المحتوى البديل: نفس المعلومة اللي الرسم هيقولها، مكتوبة.`,
            R`فتحة [[<script>]]: من هنا JavaScript. التلات سطور الجايين هم كل الرسم.`,
            R`[[getElementById("chart")]] بيجيب الـ canvas، و [[getContext("2d")]] بيرجّع «أداة الرسم» بتاعته (اسمها context). كل أمر رسم بيتنادى عليها.`,
            R`[[fillStyle]] لون التعبئة لأي شكل هيترسم بعد كده.`,
            R`[[fillRect(x, y, العرض, الارتفاع)]]: مستطيل مليان، ركنه فوق-شمال عند (20,20)، وعرضه 100 وارتفاعه 60.`,
            R`قفلة السكربت. لازم ييجي **بعد** الـ canvas في الكود، عشان يلاقيه موجود.`,
            R`[[<noscript>]]: الفقرة دي بتظهر بس لو JavaScript مقفول في المتصفح. عند باقي الناس كأنها مش مكتوبة.`,
            R`[[<template>]] بـ [[id]]: اللي جواه قالب، مبيتعرضش.`,
            R`صف حلقة جوه القالب. موجود في الكود ومش موجود في الصفحة: لا بيترسم، ولا لينكه بيتداس، ولا [[querySelector]] بيلاقيه.`,
            R`قفلة القالب. سكربت في الصفحة هينسخ اللي جواه مرة لكل حلقة ويملاه.`
          ],
          teach: R`## الفكرة في سطرين

الصفحة من غير JavaScript هي HTML و CSS وبس. العناصر دي بتحدد اللي بيحصل على الحدود: مكان السكربت بيرسم فيه، ورسالة للي السكربت مش شغال عنده، ومخزن HTML السكربت بياخد منه.

القياسات من Chrome 157 على Windows 11.

---

## ١. [[<canvas>]]

المواصفة: [[<canvas>]] بيدّي السكربتات «لوحة bitmap» ترسم عليها: رسوم بيانية، ألعاب، تعديل صور. bitmap يعني شبكة بيكسلات، زي صورة PNG، مش عناصر.

~~~live 148 canvas وعليه مستطيل اترسم بتلات سطور
<canvas id="chart" width="300" height="120" style="border:1px solid #94a3b8">عدد مرات سماع الحلقات: الأولى ٤٠، والتانية ٦٥، والتالتة ٩٠.</canvas>
<script>
  const ctx = document.getElementById("chart").getContext("2d");
  ctx.fillStyle = "teal";
  ctx.fillRect(20, 20, 100, 60);
</script>
~~~

**هتشوف إيه:** صندوق ليه خط رمادي رفيع (ده من [[border]] اللي مكتوب في [[style]] عشان حدود اللوحة تبان، والـ CSS ده بيتشرح في درس «box model»)، وجواه مستطيل أخضر مزرق. والجملة اللي جوه [[<canvas>]] مش ظاهرة.

~~~text القياس من Chrome
<canvas></canvas>                   width = 300   height = 150   display: inline     (فاضي وشفاف)
بعد fillRect(20, 10, 100, 50):
   البيكسل (30,20)  = 0,128,128,255      ← teal، و 255 يعني مش شفاف
   البيكسل (150,80) = 0,0,0,0            ← شفاف: مفيش حاجة مرسومة هنا
~~~

- من غير سكربت، [[<canvas>]] مستطيل شفاف 300 × 150 مفيهوش أي حاجة.
- الإحداثيات من فوق-شمال: x لليمين و y لتحت (زي [[coords]] في الدرس اللي فات).
- اللي اترسم بقى بيكسلات. مفيش «عنصر مستطيل» تدوس عليه أو تلوّنه بالـ CSS أو قارئ الشاشة يشوفه. ده الفرق بينه وبين SVG.

### [[width]] و [[height]] هنا مش زي الـ CSS

~~~text القياس من Chrome
<canvas width="200" height="100" style="width:400px; height:100px">
   اللوحة (bitmap):  200 × 100          الصندوق في الصفحة:  400 × 100
~~~

الـ attributes بيحددوا **عدد بيكسلات اللوحة**. والـ CSS بيحدد **المقاس المعروض**. لو مختلفين، الرسم بيتمط زي صورة اتكبّرت: هنا كل حاجة هتبان عرضها الضعف ومهزوزة. فالمقاس يتكتب في الـ attributes.

### المحتوى البديل

MDN: اللي بين [[<canvas>]] و [[</canvas>]] بيتعرض في المتصفحات اللي مبتدعمش canvas. دي مبقتش موجودة، بس المحتوى ده ليه شغل تاني اتقاس:

~~~text القياس من Chrome (شجرة الـ accessibility)
<canvas width="200" height="100">رسم بياني: ... <a href="#t">الجدول</a></canvas>
   على الشاشة: ارتفاع اللينك = 0 (مش مرسوم)
   في الشجرة:  Canvas «»   وجواه   link «الجدول»          ← قارئ الشاشة شايف اللينك

<canvas role="img" aria-label="رسم: ٣ أعمدة">      →  image «رسم: ٣ أعمدة»
~~~

يعني البديل هو اللي قارئ الشاشة بياخده بدل الرسم. اكتب فيه المعلومة اللي الرسم بيقولها (الأرقام، أو لينك لجدول)، مش «متصفحك لا يدعم canvas». ولرسم بسيط: [[role="img"]] و [[aria-label]] بيخلّوه يتقري كصورة باسمها.

| عايز | العنصر |
|---|---|
| صورة جاهزة | [[<img>]] |
| رسم من أشكال (أيقونة، مسقط، رسم بياني بسيط) بيتكبّر ويتداس ويتلوّن | SVG |
| رسم بيتغيّر بسرعة أو فيه آلاف القطع (لعبة، تعديل صورة، رسم بياني تقيل) | [[<canvas>]] |

باقي أوامر الرسم (خطوط، دواير، نص، صور، حركة) في كورس JavaScript، درس «canvas: ارسم أشكال وحرّكها».

---

## ٢. [[<noscript>]]

~~~live 126 230 نفس الكود في صفحتين: واحدة JavaScript مقفول فيها، وواحدة شغال
<iframe sandbox title="JavaScript مقفول" width="250" height="96"
  srcdoc="<noscript><p>الصفحة دي محتاجة JavaScript.</p></noscript><p>باقي الصفحة.</p>"></iframe>
<iframe sandbox="allow-scripts" title="JavaScript شغال" width="250" height="96"
  srcdoc="<noscript><p>الصفحة دي محتاجة JavaScript.</p></noscript><p>باقي الصفحة.</p>"></iframe>
~~~

**هتشوف إيه:** الصندوق الأول فيه سطرين: «الصفحة دي محتاجة JavaScript» و «باقي الصفحة». والتاني فيه «باقي الصفحة» بس. ([[sandbox]] الفاضي بيقفل السكربتات في الصندوق الأول، وده بيخلّي المتصفح يعامله كصفحة JavaScript مقفول فيها.)

MDN: لو السكربتات مقفولة، [[<noscript>]] بيمثّل أولاده كـ HTML عادي. ولو شغالة، بيمثّلهم كـ **نص**.

~~~text القياس من Chrome (JavaScript شغال)
<noscript><p>...</p><img src="/ns-pixel.gif"></noscript>
   مش مرسوم في الصفحة       children.length = 0       childNodes.length = 1 (نص واحد)
   textContent = "<p>الصفحة محتاجة JavaScript. ..."     ← الكود نفسه كحروف، مش عناصر
   الصورة اللي جواه: متطلبتش من السيرفر
~~~

يعني عند زائر JavaScript شغال عنده، اللي جوه [[<noscript>]] مبيتحوّلش لعناصر أصلًا: لا بيترسم، ولا صوره بتتحمّل، ولا [[querySelector]] بيلاقيه.

- في [[<body>]]: بياخد أي محتوى (فقرة، لينك لنسخة أبسط، صورة).
- في [[<head>]]: بياخد [[<link>]] و [[<style>]] و [[<meta>]] بس. مثلًا CSS بيظهر محتوى كان مستخبي ومستني سكربت.

**اللي مبيعملوش:** [[<noscript>]] بيشتغل لما JavaScript **مقفول**. لو السكربت بتاعك محمّلش (النت قطع، أو فيه error، أو اتمنع)، JavaScript لسه «شغال» في المتصفح، فالـ [[<noscript>]] مش هيظهر. الحل الحقيقي: الصفحة الأساسية تبقى HTML شغال من غير سكربت، والسكربت يزوّد عليها.

---

## ٣. [[<template>]]

المواصفة: [[<template>]] بيعرّف حتة HTML السكربت يقدر ينسخها ويحطها في الصفحة. MDN: محتواه مبيتعرضش.

~~~live 170 القالب مستخبي، وكل ضغطة بتنسخ منه صف
<template id="row">
  <li>🎧 <a href="#">حلقة جديدة</a></li>
</template>
<ul id="list">
  <li>🎧 <a href="#">الحلقة ١ (مكتوبة في الصفحة)</a></li>
</ul>
<button type="button" onclick="list.append(row.content.cloneNode(true))">زوّد حلقة من القالب</button>
~~~

**هتشوف إيه:** قايمة فيها حلقة واحدة وزرار. الصف اللي جوه [[<template>]] مش ظاهر. كل ضغطة على الزرار بتزوّد صف «حلقة جديدة».

السطر الوحيد من JavaScript هنا: [[list.append(row.content.cloneNode(true))]].

- [[row.content]]: محتوى القالب. مش أولاد عاديين: «قطعة مستند» منفصلة (DocumentFragment).
- [[cloneNode(true)]]: نسخة منه بكل اللي جواه. القالب نفسه بيفضل زي ما هو للمرة الجاية.
- [[list.append(...)]]: النسخة بتتحط في آخر القايمة، ومن اللحظة دي بقت عناصر حقيقية.

~~~text القياس من Chrome
<template id="row"><li class="ep"><img src="/tpl-img.gif"><a>عنوان</a><script>window.tplRan = true</script></li></template>

قبل النسخ:    display: none      template.childNodes.length = 0      template.content.children.length = 1
              document.querySelectorAll(".ep").length = 0
              الصورة: متطلبتش من السيرفر          السكربت اللي جواه: متشغّلش
بعد نسختين:   querySelectorAll(".ep").length = 2
              الصورة اتطلبت                       السكربت اشتغل       القالب لسه فيه نسخته
~~~

ده معنى «خامل» (inert): المتصفح قرا الـ HTML واتأكد إنه سليم، وحطه على جنب. لا صور بتتحمّل، ولا سكربتات بتشتغل، ولا CSS بيطبّق، لحد ما نسخة تدخل الصفحة.

**ليه مش [[<div hidden>]]؟** الـ [[<div>]] المستخبي جزء من الصفحة: صوره بتتحمّل، وسكربتاته بتشتغل، و [[querySelectorAll]] بيلاقي اللي جواه، وقارئ الشاشة ممكن يوصله. [[<template>]] برّه ده كله.

---

## ٤. [[<slot>]]

[[<slot>]] «فتحة» جوه الـ shadow tree بتاع component: مكان بيقول «المحتوى اللي صاحب الصفحة هيكتبه جوه الـ component يتعرض هنا». والـ shadow tree شجرة عناصر خاصة بالـ component، مستخبية عن باقي الصفحة والـ CSS بتاعها.

الـ HTML يقدر يعمل shadow tree من غير JavaScript: [[<template shadowrootmode="open">]] كأول ابن لعنصر. اسمها Declarative Shadow DOM.

~~~live 86 كارت حلقة: القالب فيه فتحتين، والمحتوى بييجي من برّه
<article>
  <template shadowrootmode="open">
    <style>h3 { color: teal; margin: 0; }</style>
    <h3><slot name="title">حلقة من غير عنوان</slot></h3>
    <p><slot>مفيش وصف لسه.</slot></p>
  </template>
  <span slot="title">الحلقة ٣: التراخيص</span>
  نجيب الصور والموسيقى منين من غير مشاكل.
</article>
~~~

**هتشوف إيه:** «الحلقة ٣: التراخيص» عنوان بلون أخضر مزرق، وتحته الوصف في فقرة. الـ [[<span>]] اللي كتبته اتعرض **جوه** الـ [[<h3>]] اللي في القالب.

| الحتة | معناها |
|---|---|
| [[<slot name="title">]] | فتحة ليها اسم. اللي جواها («حلقة من غير عنوان») محتوى افتراضي بيظهر لو محدش ملا الفتحة |
| [[<span slot="title">]] | الـ attribute [[slot]] على عنصر برّه القالب: «حطني في الفتحة اللي اسمها title» |
| [[<slot>]] من غير اسم | الفتحة الافتراضية: بتاخد كل اللي ملوش [[slot]] (هنا جملة الوصف) |

~~~text القياس من Chrome
article.shadowRoot.mode = "open"        عدد الـ <template> اللي فضلت في الصفحة = 0
الفتحة title  ←  <span>                 الفتحة الافتراضية  ←  النص "نجيب الصور والموسيقى منين من غير مشاكل."
لون الـ <h3> اللي جوه القالب = rgb(0, 128, 128)    (الـ style اللي جوه القالب طبّق جواه بس)

<slot>نص</slot> برّه أي shadow tree:     display: contents      النص ظاهر عادي
<template shadowrootmode="banana">:      مفيش shadow root، والقالب فضل template عادي (مستخبي)، وفي الـ Console:
   Invalid declarative shadowrootmode attribute value. Valid values are "open" and "closed".
~~~

- المتصفح لما قابل القالب ده، **شاله** من الصفحة وعمل مكانه shadow root للعنصر الأب.
- [[<slot>]] لوحده برّه shadow tree ملوش أي تأثير: محتواه بيتعرض كأنه مش موجود.
- الـ CSS اللي جوه القالب مبيخرجش برّه، والـ CSS بتاع الصفحة مبيدخلش جوه.

### attributes الـ shadow root على [[<template>]]

| attribute | بيعمل إيه (من MDN) | القياس في Chrome 157 | الحالة |
|---|---|---|---|
| [[<template shadowrootmode="open">]] | بيعمل shadow root للأب. [[open]] بيخلّيه يتقري من JavaScript، و [[closed]] بيخبّيه | [[shadowRoot.mode = "open"]]، ومع [[closed]]: [[shadowRoot = null]] | Baseline |
| [[<template shadowrootclonable>]] | نسخ العنصر الأب ([[cloneNode]]) ياخد الـ shadow root معاه | [[clonable = true]] | Baseline جديد |
| [[<template shadowrootdelegatesfocus>]] | الضغط على حتة مبتاخدش focus جوه القالب بيودّي الـ focus لأول عنصر ياخده | [[delegatesFocus = true]] | Baseline جديد |
| [[<template shadowrootserializable>]] | [[getHTML()]] يقدر يكتب الـ shadow root كنص تاني | [[serializable = true]] | Baseline جديد |
| [[<template shadowrootslotassignment="manual">]] | الفتحات مبتتملاش لوحدها، والسكربت بيوزّع بـ [[slot.assign()]]. الافتراضي [[named]] | [[slotAssignment = "manual"]]، ومفيش حاجة اتوزّعت | مش Baseline |
| [[<template shadowrootcustomelementregistry>]] | الـ shadow root يبدأ من غير سجل custom elements، وسكربت يركّبله سجل خاص بعدين | [[customElementRegistry = null]] | Baseline جديد |

«Baseline» يعني شغال في كل المتصفحات الأساسية من سنين، و «Baseline جديد» يعني شغال في آخر نسخة من كل واحد ولسه مش في النسخ الأقدم. الحالة من بيانات المنهج (web-features)، مش متقاسة هنا: احنا قسنا Chrome بس. في كود للناس كلها: [[shadowrootmode]] آمن، والباقي راجع جدول الدعم في MDN قبله.

دول كلهم إعدادات لـ component بيتبني بـ JavaScript. شرحهم الكامل في كورس JavaScript: دروس «shadow DOM» و «slots» و «Declarative Shadow DOM و :defined».

---

## ٥. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| مقاس الـ canvas في الـ CSS بس | اللوحة لسه 300 × 150 والرسم بيتمط |
| السكربت مكتوب قبل [[<canvas>]] | [[getElementById]] بيرجّع [[null]]، والـ Console فيه error |
| canvas من غير محتوى بديل ولا [[aria-label]] | قارئ الشاشة: «Canvas» من غير اسم ولا معلومة |
| الاعتماد على [[<noscript>]] لما السكربت يقع | مبيظهرش: JavaScript مش مقفول، السكربت بس اللي فشل |
| رسالة «جاري التحميل» جوه [[<template>]] | عمرها ما بتظهر: القالب مبيتعرضش |
| [[document.querySelector]] على عنصر جوه القالب | [[null]]: لازم [[template.content.querySelector]] |
| [[<slot>]] في صفحة عادية من غير shadow tree | ملوش تأثير |
| [[shadowrootmode]] على قالب مش أول ابن، أو بقيمة غلط | بيفضل قالب عادي مستخبي |

---

## الخلاصة

- [[<canvas width height>]]: لوحة بيكسلات فاضية، والرسم بـ JavaScript. المقاس في الـ attributes، والمعلومة في المحتوى البديل.
- [[<noscript>]]: بيظهر بس لما JavaScript مقفول، مش لما السكربت يفشل.
- [[<template>]]: HTML خامل، بيتنسخ بـ [[content.cloneNode(true)]].
- [[<slot>]]: فتحة جوه shadow tree، بتتملي بالـ attribute [[slot]] من برّه.
- الباقي في كورس JavaScript.`,
          try: R`اعمل [[lab.html]] فيها: (١) [[<canvas>]] 200 × 100 وسكربت بيرسم مستطيلين بلونين مختلفين. (٢) [[<noscript>]] فيه جملة. (٣) [[<template>]] فيه [[<p>]] مكتوب فيه «أنا في القالب»، وبرّه القالب [[<p>]] مكتوب فيه «أنا في الصفحة». افتحها في Chrome، وفي الـ Console اكتب [[document.querySelectorAll("p").length]]. الرقم كام؟ وليه مش ٣؟`,
          sol: R`~~~live 168 lab.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>معمل العناصر</title>
</head>
<body>
<canvas id="c" width="200" height="100" role="img" aria-label="مستطيلين: أخضر وبرتقالي"></canvas>
<script>
  const ctx = document.getElementById("c").getContext("2d");
  ctx.fillStyle = "teal";
  ctx.fillRect(10, 10, 80, 80);
  ctx.fillStyle = "orange";
  ctx.fillRect(110, 30, 80, 40);
</script>
<noscript><p>JavaScript مقفول عندك.</p></noscript>
<template><p>أنا في القالب</p></template>
<p>أنا في الصفحة</p>
</body>
</html>
~~~

**هتشوف إيه:** مربع أخضر مزرق ومستطيل برتقالي جنب بعض، وتحتهم «أنا في الصفحة». الجملتين التانيين مش ظاهرين.

**الرقم:** [[1]]. فيه تلات [[<p>]] مكتوبين في الملف، وواحد بس في الصفحة:

- اللي جوه [[<noscript>]]: JavaScript شغال، فمحتواه نص مش عناصر.
- اللي جوه [[<template>]]: في [[template.content]]، مش في الصفحة.

**الغلطة الشائعة:** تغيّر [[fillStyle]] بعد [[fillRect]]. اللون بيتحدد قبل الرسم، وبيفضل ماشي على كل اللي بعده لحد ما تغيّره.

~~~text القياس من Chrome
document.querySelectorAll("p").length = 1
document.querySelector("template").content.querySelectorAll("p").length = 1
البيكسل (20,20) = 0,128,128,255 (teal)      البيكسل (120,40) = 255,165,0,255 (orange)
~~~`,
          deep: {
            why: R`[[<canvas>]] اتعمل عشان الرسم السريع اللي الـ DOM مبيقدرش عليه. [[<noscript>]] من أيام ما JavaScript كان اختياري، ولسه مفيد لرسالة واضحة أو بديل. و [[<template>]] حل مشكلة قديمة: المبرمجين كانوا بيخبّوا قوالب الـ HTML في [[<div style="display:none">]] أو جوه [[<script type="text/template">]] كنص، والاتنين ليهم مشاكل (الأول صوره بتتحمّل، والتاني مبيتفحصش).`,
            how: R`الـ parser بيعامل كل واحد معاملة خاصة. [[<canvas>]]: بيعمل bitmap بمقاس الـ attributes، وأولاده بيدخلوا الـ DOM من غير ما يترسموا. [[<noscript>]]: لو السكربتات شغالة بيقرا اللي جواه كنص خام لحد القفلة، ولو مقفولة بيقراه HTML. [[<template>]]: أولاده بيتحطوا في DocumentFragment تابع لمستند تاني خامل، وده اللي بيمنع التحميل والتشغيل. ولو عليه [[shadowrootmode]] وهو أول ابن: بيتعمل shadow root للأب والمحتوى بيتحط فيه، والقالب نفسه مبيدخلش الصفحة.`,
            when: R`[[<canvas>]]: رسم بياني تقيل، لعبة، توقيع بالماوس، تعديل صور. [[<noscript>]]: جملة «الجزء ده محتاج JavaScript» أو لينك لنسخة بسيطة. [[<template>]]: صف أو كارت بيتكرر والسكربت بيملاه ببيانات (قايمة حلقات، نتايج بحث). [[<slot>]]: جوه web component بتكتبه.`,
            mistakes: R`مقاس canvas بالـ CSS. سكربت الرسم قبل العنصر. canvas من غير بديل. انتظار [[<noscript>]] لما السكربت يفشل. محتوى مهم جوه [[<template>]] على أمل إنه يظهر. و [[<slot>]] من غير shadow tree.`
          },
          practice: [
            { lvl: 'تطبيق', t: R`**ابني:** رسم «مرات سماع الحلقة ١» في صفحة «المحطة». السكربت جاهز وبيرسم على عنصر [[id]] بتاعه [[plays]]. اكتب الـ [[<canvas>]] اللي ناقص: 300 × 100، وبيتقري لقارئ الشاشة كصورة اسمها «رسم بياني: الحلقة ١ اتسمعت ٤٠ مرة»، وجواه نفس المعلومة كنص بديل. وحطه في المكان اللي يخلّي السكربت يلاقيه. (من قسم ١ في الشرح)`, done: R`المستطيل الأخضر بيترسم تحت العنوان، وكل الشروط ✓.`, work: { h: 200, start: R`<h2>مرات السماع</h2>
<script>
  const ctx = document.getElementById("plays").getContext("2d");
  ctx.fillStyle = "teal";
  ctx.fillRect(10, 30, 160, 40);
</script>`, checks: [
              { say: R`فيه [[<canvas id="plays">]]`, q: "canvas#plays" },
              { say: R`مقاسه 300 × 100 في الـ attributes`, q: "canvas[width=\"300\"][height=\"100\"]" },
              { say: R`[[role="img"]] و [[aria-label]]`, q: "canvas[role=\"img\"][aria-label]" },
              { say: R`جواه نص بديل فيه الرقم «٤٠»`, q: "canvas", has: "٤٠" },
              { say: R`الـ canvas مكتوب قبل السكربت`, q: "canvas#plays ~ script" },
            ] }, sol: R`~~~live 186 الحل
<h2>مرات السماع</h2>
<canvas id="plays" width="300" height="100" role="img" aria-label="رسم بياني: الحلقة ١ اتسمعت ٤٠ مرة">الحلقة ١ اتسمعت ٤٠ مرة.</canvas>
<script>
  const ctx = document.getElementById("plays").getContext("2d");
  ctx.fillStyle = "teal";
  ctx.fillRect(10, 30, 160, 40);
</script>
~~~

**هتشوف إيه:** تحت العنوان شريط أخضر مزرق عرضه 160. في البداية مكانش فيه حاجة: السكربت كان بيدوّر على [[plays]] وميلاقيهوش.

**ليه كده:**

- [[id="plays"]] هو اللي السكربت بيدوّر عليه.
- المقاس في الـ attributes عشان اللوحة تبقى 300 × 100 بيكسل فعلًا.
- الـ canvas قبل السكربت: المتصفح بيقرا من فوق لتحت، والسكربت بيشتغل أول ما يتقري.

**الغلطة الشائعة:** تحط الـ canvas تحت السكربت. في الـ Console: [[TypeError: Cannot read properties of null (reading 'getContext')]].

~~~text القياس من Chrome
canvas: 300 × 100      البيكسل (20,40) = 0,128,128,255      image «رسم بياني: الحلقة ١ اتسمعت ٤٠ مرة»
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** صفحة «إحصائيات المحطة» فيها ٣ مشاكل: المربع المرسوم طالع مبطّط مش مربع، وجملة «الأرقام بتتحدّث كل ساعة» مش ظاهرة لحد، والـ canvas ملوش أي اسم. (من قسم ١ و ٣ و ٥ في الشرح)`, done: R`المربع بقى مربع، والجملة ظاهرة، والـ canvas ليه اسم، وكل الشروط ✓.`, work: { h: 200, start: R`<canvas id="c" style="width:300px;height:60px;border:1px solid #94a3b8"></canvas>
<script>
  const ctx = document.getElementById("c").getContext("2d");
  ctx.fillStyle = "teal";
  ctx.fillRect(10, 5, 50, 50);
</script>
<template><p>الأرقام بتتحدّث كل ساعة.</p></template>`, checks: [
              { say: R`الـ canvas مقاسه في الـ attributes: 300 × 60`, q: "canvas[width=\"300\"][height=\"60\"]" },
              { say: R`مفيش [[width]] ولا [[height]] في [[style]] بتاعه`, q: "canvas[style*=\"width\"], canvas[style*=\"height\"]", n: 0 },
              { say: R`الجملة في [[<p>]] ظاهر في الصفحة`, q: "p", has: "الأرقام بتتحدّث كل ساعة" },
              { say: R`مفيش [[<template>]]`, q: "template", n: 0 },
              { say: R`الـ canvas ليه [[aria-label]] أو نص بديل`, q: "canvas[aria-label], canvas:not(:empty)" },
            ] }, sol: R`~~~live 130 بعد التصليح
<canvas id="c" width="300" height="60" role="img" aria-label="مربع أخضر: عدد الحلقات" style="border:1px solid #94a3b8"></canvas>
<script>
  const ctx = document.getElementById("c").getContext("2d");
  ctx.fillStyle = "teal";
  ctx.fillRect(10, 5, 50, 50);
</script>
<p>الأرقام بتتحدّث كل ساعة.</p>
~~~

وده اللي كان باين قبل التصليح:

~~~live 88 قبل
<canvas id="c" style="width:300px;height:60px;border:1px solid #94a3b8"></canvas>
<script>
  const ctx = document.getElementById("c").getContext("2d");
  ctx.fillStyle = "teal";
  ctx.fillRect(10, 5, 50, 50);
</script>
<template><p>الأرقام بتتحدّث كل ساعة.</p></template>
~~~

**هتشوف إيه:**

- قبل: مستطيل مبطّط (عرضه 50 وارتفاعه 20) وحوافه مهزوزة شوية، ومفيش أي جملة.
- بعد: مربع 50 × 50 حاد، وتحته الجملة.

| المشكلة | التصليح | ليه |
|---|---|---|
| المقاس في [[style]] بس | [[width="300" height="60"]] | اللوحة كانت 300 × 150 واتضغطت في 60: كل ارتفاع اتضرب في 0.4 |
| جملة جوه [[<template>]] | [[<p>]] عادي | القالب مبيتعرضش أبدًا |
| canvas من غير اسم | [[role="img"]] و [[aria-label]] | قارئ الشاشة كان بيقول «Canvas» بس |

**الغلطة الشائعة:** تصلّح التبطيط بإنك تغيّر أرقام [[fillRect]] لحد ما يبان مربع. الرسم هيفضل مهزوز، وأي شكل تاني هيتبطّط برده.

~~~text القياس من Chrome
قبل:   اللوحة 300 × 150    الصندوق 300 × 60     المربع المرسوم 50 × 50 باين 50 × 20
بعد:   اللوحة 300 × 60     الصندوق 300 × 60     باين 50 × 50
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع، وبعدين صلّح:** اكتب على ورقة: كام حلقة هتظهر في القايمة؟ وبعدين خلّي التلات حلقات يظهروا من غير أي JavaScript، وسيب القالب فيه صف واحد فاضي للحلقات الجاية. (من قسم ٣ في الشرح)`, done: R`كتبت توقّعك، والقايمة فيها تلات حلقات ظاهرين، والقالب لسه موجود، وكل الشروط ✓.`, work: { h: 170, start: R`<ul>
  <li>الحلقة ١: الصوت</li>
  <template id="row">
    <li>الحلقة ٢: الكابشن</li>
    <li>الحلقة ٣: التراخيص</li>
  </template>
</ul>`, checks: [
              { say: R`القايمة فيها تلات [[<li>]] ظاهرين`, q: "ul > li", n: 3 },
              { say: R`الحلقة ٢ ظاهرة`, q: "ul > li", has: "الحلقة ٢" },
              { say: R`الحلقة ٣ ظاهرة`, q: "ul > li", has: "الحلقة ٣" },
              { say: R`القالب [[<template id="row">]] لسه موجود`, q: "template#row" },
            ] }, sol: R`~~~live 92 بعد التعديل
<ul>
  <li>الحلقة ١: الصوت</li>
  <li>الحلقة ٢: الكابشن</li>
  <li>الحلقة ٣: التراخيص</li>
  <template id="row">
    <li></li>
  </template>
</ul>
~~~

وده اللي كان باين قبل التعديل:

~~~live 56 قبل
<ul>
  <li>الحلقة ١: الصوت</li>
  <template id="row">
    <li>الحلقة ٢: الكابشن</li>
    <li>الحلقة ٣: التراخيص</li>
  </template>
</ul>
~~~

**التوقّع:** حلقة واحدة. الاتنين التانيين جوه [[<template>]]، فمش في الصفحة.

**هتشوف إيه:** قبل: نقطة واحدة. بعد: تلات نقط، والصف الفاضي اللي في القالب مش ظاهر.

**ليه كده:** المحتوى اللي الزائر لازم يشوفه يتكتب HTML عادي. القالب للي **هيتكرر** بسكربت: شكل الصف من غير بيانات. ([[<template>]] مسموح جوه [[<ul>]].)

**الغلطة الشائعة:** تسيب بيانات حقيقية في القالب «والسكربت يطلّعها». لو السكربت محمّلش، الزائر ومحرك البحث مش شايفين غير حلقة واحدة.

~~~text القياس من Chrome
قبل:   document.querySelectorAll("li").length = 1      template.content.children.length = 2
بعد:   document.querySelectorAll("li").length = 3      template.content.children.length = 1
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** كارت حلقة معمول بقالب فيه فتحتين: [[title]] للعنوان، وفتحة افتراضية للوصف. الكارت فاضي دلوقتي فبيعرض الكلام الافتراضي. املاه **من برّه القالب**: العنوان «الحلقة ٤: الخرايط» في [[<span>]] رايح للفتحة [[title]]، والوصف «صورة فيها كذا لينك.» كنص عادي. ومتغيّرش حاجة جوه [[<template>]]. (من قسم ٤ في الشرح)`, done: R`الكارت بيعرض «الحلقة ٤: الخرايط» بالأخضر وتحته الوصف، بدل «حلقة من غير عنوان»، وكل الشروط ✓.`, work: { h: 150, start: R`<article>
  <template shadowrootmode="open">
    <style>h3 { color: teal; margin: 0; }</style>
    <h3><slot name="title">حلقة من غير عنوان</slot></h3>
    <p><slot>مفيش وصف لسه.</slot></p>
  </template>
</article>`, checks: [
              { say: R`فيه [[<span slot="title">]] ابن مباشر للـ [[<article>]]`, q: "article > span[slot=\"title\"]" },
              { say: R`العنوان فيه «الحلقة ٤»`, q: "article > span[slot=\"title\"]", has: "الحلقة ٤" },
              { say: R`الوصف مكتوب جوه الـ [[<article>]]`, q: "article", has: "صورة فيها كذا لينك" },
              { say: R`القالب لسه أول ابن وعليه [[shadowrootmode="open"]]`, q: "article > template[shadowrootmode=\"open\"]:first-child" },
            ] }, sol: R`~~~live 86 الحل
<article>
  <template shadowrootmode="open">
    <style>h3 { color: teal; margin: 0; }</style>
    <h3><slot name="title">حلقة من غير عنوان</slot></h3>
    <p><slot>مفيش وصف لسه.</slot></p>
  </template>
  <span slot="title">الحلقة ٤: الخرايط</span>
  صورة فيها كذا لينك.
</article>
~~~

وده اللي كان باين قبل:

~~~live 52 قبل
<article>
  <template shadowrootmode="open">
    <style>h3 { color: teal; margin: 0; }</style>
    <h3><slot name="title">حلقة من غير عنوان</slot></h3>
    <p><slot>مفيش وصف لسه.</slot></p>
  </template>
</article>
~~~

**هتشوف إيه:** قبل: «حلقة من غير عنوان» و «مفيش وصف لسه». بعد: «الحلقة ٤: الخرايط» بنفس اللون والحجم (جوه الـ [[<h3>]] بتاع القالب)، وتحتها الوصف.

**ليه كده:**

- [[slot="title"]] على الـ [[<span>]] بيودّيه للفتحة اللي [[name]] بتاعها [[title]].
- النص اللي ملوش [[slot]] بيروح للفتحة اللي من غير اسم.
- الكلام اللي جوه [[<slot>]] في القالب افتراضي: بيتعرض بس لو الفتحة فضلت فاضية.

**الغلطة الشائعة:** تكتب العنوان جوه القالب مكان [[<slot>]]. هيظهر، بس كده القالب بقى لكارت واحد، وفكرته إن نفس القالب يخدم كل الكروت.

~~~text القياس من Chrome
قبل:   الفتحتين فاضيين ← المحتوى الافتراضي معروض
بعد:   title ← <span>      الافتراضية ← النص       article.shadowRoot.mode = "open"
~~~` },
            { lvl: 'سريع', t: R`**اشرحها:** زميلك كتب في الصفحة [[<noscript>الموقع محتاج JavaScript</noscript>]]، وبعدين ملف [[app.js]] اتمسح من السيرفر بالغلط، فالصفحة فتحت فاضية عند الكل **ومن غير** الرسالة. اشرحله في ٣ سطور ليه الرسالة مظهرتش، وإيه اللي كان المفروض يتعمل. (من قسم ٢ في الشرح، جزء «اللي مبيعملوش»)`, done: R`٣ سطور: شرط ظهور [[<noscript>]]، وليه مش متحقق، والحل.`, sol: R`إجابة نموذجية:

1. [[<noscript>]] بيظهر في حالة واحدة: JavaScript **مقفول** في المتصفح (من الإعدادات، أو إضافة بتمنعه، أو [[sandbox]] من غير [[allow-scripts]]).
2. عند زوارك JavaScript شغال. اللي حصل إن ملف واحد رجع 404. المتصفح لسه «بيدعم السكربتات»، فاعتبر محتوى [[<noscript>]] نص ومرسمهوش.
3. الحل إن الصفحة متبقاش فاضية من غير السكربت: المحتوى الأساسي (العناوين، قايمة الحلقات، المشغّلات) HTML مكتوب، والسكربت يزوّد الإضافات. ساعتها لو الملف وقع، الزائر يشوف الصفحة ناقصة ميزة، مش فاضية.

~~~text القياس من Chrome (JavaScript شغال)
noscript:   مش مرسوم      children.length = 0      الصور اللي جواه متطلبتش
iframe بـ sandbox فاضي (السكربتات مقفولة):   محتوى noscript اتعرض واتحمّلت صورته
~~~` },
          ]
        },
        {
          cmd: "replaced elements والتراخيص",
          title: "ليه الصورة والفيديو بيتصرفوا غير باقي العناصر، وتجيب الميديا منين من غير مشاكل",
          pre: [
            { to: "css/img", why: R`[[loading]] و [[fetchpriority]] و [[width]] و [[height]] اتشرحوا هناك. الدرس ده بيزوّد [[decoding]] وبيجمع التلاتة في جدول` },
            { to: "css/figure و figcaption", why: R`سطر «مصدر الصورة ورخصتها» بيتكتب في [[<figcaption>]]` }
          ],
          ref: [
            { t: "MDN Glossary: Replaced elements", url: "https://developer.mozilla.org/en-US/docs/Glossary/Replaced_elements" },
            { t: "MDN: <img> (decoding, fetchpriority, loading)", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img" },
            { t: "MDN Curriculum: Semantic HTML (2.6 Media)", url: "https://developer.mozilla.org/en-US/curriculum/core/semantic-html/" },
            { t: "Creative Commons: About CC Licenses", url: "https://creativecommons.org/share-your-work/cclicenses/" },
            { t: "Creative Commons: Recommended practices for attribution", url: "https://wiki.creativecommons.org/Recommended_practices_for_attribution" },
            { t: "WHATWG: the img element (decoding)", url: "https://html.spec.whatwg.org/multipage/embedded-content.html#attr-img-decoding" }
          ],
          desc: R`«replaced element» اسم المجموعة اللي فيها [[<img>]] و [[<video>]] و [[<iframe>]] وإخواتهم: عناصر محتواها مش من كلام الصفحة، المتصفح «بيبدّل» مكانها حاجة جاية من برّه (صورة، فيديو، صفحة). وده بيفسّر تصرفات غريبة عليها: inline وبتاخد عرض وارتفاع، وليها مقاس من نفسها، وتحتها فراغ صغير.
والنص التاني من الدرس عن الميديا نفسها: [[decoding]] آخر تلميحات الصورة، وبعدها السؤال اللي قبل أي كود: الصورة أو الصوت ده بتاع مين، ومسموحلي أستخدمه إزاي؟`,
          example: R`<figure>
  <img src="media/studio.jpg" alt="استوديو المحطة: مايكين على ترابيزة خشب" width="800" height="450" loading="lazy" decoding="async">
  <figcaption>«استوديو صغير» تصوير سلمى فؤاد، رخصة <a href="https://creativecommons.org/licenses/by/4.0/" rel="license">CC BY 4.0</a>. اتقصّت من الأصل.</figcaption>
</figure>`,
          flag: "script",
          lines: [
            R`[[<figure>]] بيجمع الصورة وسطر الكلام اللي تحتها في وحدة واحدة.`,
            R`الصورة: [[alt]] بيوصفها، و [[width]] و [[height]] بيحجزوا مكانها، و [[loading="lazy"]] بيأجّل تحميلها لحد ما تقرّب، و [[decoding="async"]] بيقول للمتصفح «فكّ الصورة على مهلك، ومتعطّلش رسم باقي الصفحة عشانها».`,
            R`سطر النسبة (attribution): اسم العمل، وصاحبه، ورخصته بلينك لنص الرخصة، وإنك عدّلت فيه. [[rel="license"]] بيقول إن اللينك ده هو رخصة المحتوى.`,
            R`قفلة [[</figure>]]: الصورة ونسبتها مع بعض، فلو الصورة اتنقلت في الصفحة النسبة تتنقل معاها.`
          ],
          teach: R`## الفكرة في سطرين

معظم العناصر محتواها هو الكلام والعناصر اللي جواها في ملف الـ HTML. شوية عناصر محتواها بييجي من ملف تاني، والـ CSS بيتعامل مع «الصندوق» بتاعها بس من غير ما يعرف اللي جواه. دول الـ replaced elements.

القياسات من Chrome 157 على Windows 11. وجزء التراخيص من موقع Creative Commons ومن منهج MDN، ومفيش فيه حاجة تتقاس.

---

## ١. يعني إيه replaced element

MDN: عناصر HTML محتواها «بيتبدّل» بمورد خارجي أو بمحتوى متعرّف برّه بنية المستند، وشكلها مستقل عن نموذج التنسيق بتاع CSS.

| العنصر | replaced؟ (من MDN) | مقاسه من غير أي CSS (متقاس) |
|---|---|---|
| [[<img>]] | دايمًا | مقاس ملف الصورة نفسه (صورة 120 × 60 خدت 120 × 60) |
| [[<video>]] | دايمًا | 300 × 150 لحد ما معلومات الفيديو توصل |
| [[<iframe>]] | دايمًا | 300 × 150 (و 2px برواز) |
| [[<embed>]] | دايمًا | 0 × 0 من غير ملف |
| [[<audio>]] | في حالات | 300 × 54 بـ [[controls]]، ومن غيره مبيترسمش |
| [[<canvas>]] | في حالات | 300 × 150 |
| [[<object>]] | في حالات | 300 × 150 |
| [[<input type="image">]] | الوحيد من عناصر الفورم | مقاس صورته |

وباقي عناصر الفورم ([[<input>]] و [[<button>]] و [[<textarea>]])؟ MDN: دي «widgets» مش replaced، ما عدا [[<input type="image">]].

### ده بيفرق في إيه

**١. inline، وبياخد عرض وارتفاع.**

~~~live 76 صورة وكلمة، الاتنين inline، وعلى الاتنين نفس الـ CSS: width 200px و height 50px
<img alt="" style="width:200px; height:50px" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='80'%3E%3Crect width='320' height='80' fill='%230f766e'/%3E%3Ctext x='160' y='48' font-size='24' fill='white' text-anchor='middle'%3Eبودكاست المحطة%3C/text%3E%3C/svg%3E">
<span style="width:200px; height:50px; background:#fde68a">كلمة</span>
~~~

**هتشوف إيه:** الصورة بقت 200 × 50 (واتمطّت). والكلمة فضلت بحجمها، وخلفيتها الصفرا على قدها بس.

~~~text القياس من Chrome
<img style="width:200px; height:50px">     display: inline     الحجم 200 × 50
<span style="width:200px; height:50px">    display: inline     الحجم 21.9 × 17      ← اتجاهلهم
~~~

العنصر الـ inline العادي بيتجاهل [[width]] و [[height]] (درس «display»). الـ replaced element inline برده، بس بيحترمهم، لأن ليه صندوق بمقاس.

**٢. ليه مقاس من نفسه.** الصورة عارفة عرضها وارتفاعها ونسبتهم من الملف. واللي ملوش مقاس (iframe، أو فيديو لسه متحمّلش) بياخد 300 × 150. عشان كده [[width]] و [[height]] في الـ HTML مهمين: بيدّوا المتصفح المقاس قبل ما الملف يوصل (درس «CLS»).

**٣. اللي جواه بيتظبط بـ [[object-fit]].** لما الصندوق نسبته غير نسبة المحتوى، [[object-fit]] و [[object-position]] بيقرروا المحتوى يتقص ولا يتمط (درس «object-fit»). الخاصيتين دول للـ replaced elements بس.

**٤. تحته فراغ صغير.**

~~~live 198 نفس الصورة مرتين جوه صندوق أصفر: الأولى inline، والتانية display: block
<div style="background:#fde68a; width:320px; margin-bottom:12px"><img alt="" width="320" height="80" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='80'%3E%3Crect width='320' height='80' fill='%230f766e'/%3E%3Ctext x='160' y='48' font-size='24' fill='white' text-anchor='middle'%3Eبودكاست المحطة%3C/text%3E%3C/svg%3E"></div>
<div style="background:#fde68a; width:320px"><img alt="" width="320" height="80" style="display:block" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='80'%3E%3Crect width='320' height='80' fill='%230f766e'/%3E%3Ctext x='160' y='48' font-size='24' fill='white' text-anchor='middle'%3Eبودكاست المحطة%3C/text%3E%3C/svg%3E"></div>
~~~

**هتشوف إيه:** تحت الصورة الأولى شريط أصفر رفيع. تحت التانية مفيش.

~~~text القياس من Chrome (صورة ارتفاعها 60)
الصورة inline:            ارتفاع الصندوق اللي حواليها = 64     ← 4px زيادة
الصورة display: block:    ارتفاع الصندوق = 60
~~~

الصورة الـ inline قاعدة على سطر الكتابة (baseline) زي الحرف، والسطر سايب تحتها مكان لديل الحروف اللي بتنزل (زي «ج» و «ع»). [[display: block]] بيطلّعها من السطر. ده سبب الفراغ اللي بيظهر تحت أي صورة في كارت.

**٥. الـ CSS مبيدخلش جواه.** متقدرش تلوّن أزرار [[<video controls>]] ولا تنسّق صفحة جوه [[<iframe>]] من صفحتك. و [[::before]] و [[::after]] مبيشتغلوش على [[<img>]] (من مواصفة CSS، متقاسش هنا): مفيش «جوه» يتحط فيه محتوى.

---

## ٢. [[<img decoding="async">]]

ملف الصورة (JPEG أو WebP) مضغوط. عشان يترسم، المتصفح لازم «يفكّه» (decode) لبيكسلات، وده بياخد وقت في الصور الكبيرة. [[decoding]] تلميح: الفكّ ده يحصل إمتى بالنسبة لرسم باقي الصفحة.

| القيمة | معناها (من MDN) |
|---|---|
| [[sync]] | فكّ الصورة مع رسم باقي المحتوى، واعرض الكل مرة واحدة |
| [[async]] | ارسم باقي المحتوى الأول، وفكّ الصورة واعرضها بعده |
| [[auto]] | المتصفح يقرر. ده الافتراضي |

~~~text القياس من Chrome
<img>                       decoding = "auto"
<img decoding="async">      decoding = "async"
<img decoding="banana">     decoding = "auto"      ← القيمة الغلط بترجع للافتراضي
~~~

MDN صريح في ده: على صورة عادية مكتوبة في الـ HTML، الفرق صعب يتشاف بالعين (بيتقاس بالأدوات). الفرق بيبان أكتر لما JavaScript بيزوّد صور كبيرة للصفحة. فاستخدامه العملي: [[decoding="async"]] على الصور الكبيرة اللي مش أهم حاجة في الشاشة، ومش هيضرّ. تأثيره على الوقت متقاسش هنا.

---

## ٣. تلميحات الصورة التلاتة في جدول

| | [[loading]] | [[decoding]] | [[fetchpriority]] |
|---|---|---|---|
| بيتحكم في | **إمتى** الملف يتطلب | **إمتى** الملف يتفكّ بالنسبة للرسم | **ترتيب** الملف في طابور التحميل |
| القيم | [[eager]] و [[lazy]] | [[sync]] و [[async]] و [[auto]] | [[high]] و [[low]] و [[auto]] |
| من غيره (الخاصية في Chrome) | [[auto]] (يعني يتحمّل على طول) | [[auto]] | [[auto]] |
| صورة الهيرو (أول الشاشة) | متكتبوش | متكتبوش | [[high]] |
| صور تحت في الصفحة | [[lazy]] | [[async]] | متكتبوش |
| اتشرح في | درس «img» قسم ٢ | هنا | درس «img» |

التلاتة «تلميحات»: المتصفح ممكن ميلتزمش. والقاعدة اللي بتجمعهم: الصورة الأهم في أول الشاشة تاخد [[fetchpriority="high"]] ومتاخدش [[lazy]]، وكل اللي تحت ياخد [[loading="lazy" decoding="async"]]. وكلهم محتاجين [[width]] و [[height]].

---

## ٤. الميديا بتيجي منين: التراخيص

كل صورة وصوت وفيديو وخط ليه صاحب. «لقيتها على النت» مش إذن. اللي بيحدد مسموحلك بإيه هو **الرخصة** (license): الشروط اللي صاحب العمل حاططها لاستخدامه.

### أنواع التراخيص

| النوع | معناه | محتاج منك |
|---|---|---|
| ملكية عامة (public domain) و CC0 | صاحبه اتنازل عن حقوقه، أو مدتها خلصت | ولا حاجة. موقع CC عن CC0: من غير إذن، ومن غير نسبة إجبارية |
| رخص حرة بشروط (Creative Commons، و MIT للكود والأيقونات) | مسموح بشروط مكتوبة | تنفّذ الشروط، وأولها تكتب اسم صاحبه |
| royalty-free | بتدفع مرة (أو بتاخده مجانًا من موقع) وتستخدمه كتير بشروط الموقع | تقرا شروط الموقع: «royalty-free» مش معناها «مجاني» ولا «من غير شروط» |
| rights-managed | بتدفع على كل استخدام محدد (المدة، والبلد، وعدد النسخ) | عقد لكل استخدام |
| «كل الحقوق محفوظة»، أو مفيش رخصة مكتوبة | ممنوع من غير إذن مكتوب من صاحبه | متستخدموش |

### رخص Creative Commons

كل رخصة CC مركّبة من حروف، وكل حرف شرط:

| الحرف | الشرط |
|---|---|
| **BY** | لازم تنسب العمل لصاحبه. في كل الرخص الستة |
| **SA** (ShareAlike) | لو عدّلت فيه، اللي تطلّعه لازم يتنشر بنفس الرخصة |
| **NC** (NonCommercial) | للاستخدام غير التجاري بس |
| **ND** (NoDerivatives) | من غير تعديل: تستخدمه زي ما هو |

| الرخصة | تجاري؟ | تعدّل فيه؟ | مناسبة لموقع شركة أو بودكاست بإعلانات؟ |
|---|---|---|---|
| CC BY | آه | آه | آه |
| CC BY-SA | آه | آه، وتنشر تعديلك بنفس الرخصة | آه، مع الشرط ده |
| CC BY-ND | آه | لأ | آه لو هتستخدمه من غير أي تعديل |
| CC BY-NC | لأ | آه | لأ |
| CC BY-NC-SA | لأ | آه، بنفس الرخصة | لأ |
| CC BY-NC-ND | لأ | لأ | لأ |

(الجدول من صفحة «About CC Licenses» على موقع Creative Commons. وتعريفهم لـ «غير تجاري»: مش مقصود بيه أساسًا مكسب تجاري أو مقابل مادي.)

### بتدوّر فين

منهج MDN بيسمّي أمثلة: بحث الصور في Google (فيه فلتر «حقوق الاستخدام»)، و Flickr (فيه فلتر بالرخصة)، و The Noun Project للأيقونات. والقاعدة مع أي موقع: الرخصة بتتقري من **صفحة العمل نفسه**، مش من الفلتر. الفلتر بيقرّبك، والصفحة هي اللي بتقول.

والأضمن من ده كله: صوّر وسجّل وارسم بنفسك. ساعتها انت صاحب الحق.

### تلتزم بالرخصة إزاي: النسبة (attribution)

Creative Commons بتنصح بأربع حاجات، اختصارهم **TASL**:

| الحرف | إيه | مثال |
|---|---|---|
| **T**itle | اسم العمل (لو ليه اسم) | «استوديو صغير» |
| **A**uthor | صاحبه، بالاسم اللي هو طالبه | سلمى فؤاد |
| **S**ource | لينك للمكان الأصلي اللي العمل منشور فيه | صفحة الصورة |
| **L**icense | اسم الرخصة بالظبط، ولينك لنصها | CC BY 4.0 |

ولو عدّلت: اكتب إيه اللي اتغيّر («اتقصّت من الأصل»).

~~~live 140 158 صورة ونسبتها
<figure>
  <img alt="بانر أخضر مكتوب عليه بودكاست المحطة" width="320" height="80" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='80'%3E%3Crect width='320' height='80' fill='%230f766e'/%3E%3Ctext x='160' y='48' font-size='24' fill='white' text-anchor='middle'%3Eبودكاست المحطة%3C/text%3E%3C/svg%3E">
  <figcaption>«<a href="https://photos.example.test/p/4821">استوديو صغير</a>» تصوير سلمى فؤاد، رخصة <a href="https://creativecommons.org/licenses/by/4.0/" rel="license">CC BY 4.0</a>. اتقصّت من الأصل.</figcaption>
</figure>
~~~

**هتشوف إيه:** الصورة وتحتها سطر فيه لينكين: اسم العمل بيودّي لمصدره، واسم الرخصة بيودّي لنصها.

- CC: مفيش شكل واحد إجباري للنسبة، المهم الأربع معلومات يوصلوا «بطريقة معقولة» حسب المكان. تحت الصورة، أو في صفحة «المصادر» لو الصور كتير.
- [[<a rel="license">]] بيقول للمتصفح ومحركات البحث إن اللينك ده رخصة المحتوى (جدول [[rel]] في درس «target و rel»).
- الموسيقى في حلقة بودكاست: النسبة بتتقال في آخر الحلقة وبتتكتب في صفحتها.

---

## ٥. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[span { width: 200px }]] وتستغرب إنه مشتغلش زي الصورة | الـ span مش replaced: بيتجاهل العرض |
| فراغ تحت الصورة في الكارت وتحاول تشيله بـ [[margin]] | سببه سطر الكتابة: [[display: block]] |
| [[img::before]] | مبيظهرش |
| [[decoding="lazy"]] أو [[loading="async"]] | القيمتين متبدّلين: كل واحد بيرجع للافتراضي في سكوت |
| صورة من بحث الصور من غير ما تفتح صفحتها | مفيش رخصة يعني ممنوع |
| CC BY-NC في موقع تجاري | مخالفة للرخصة |
| تقصّ صورة رخصتها ND | التعديل ممنوع |
| «الصورة من النت» كنسبة | لا اسم، ولا مصدر، ولا رخصة: مش نسبة |

---

## الخلاصة

- replaced element: محتواه من برّه ([[<img>]] و [[<video>]] و [[<iframe>]] و [[<embed>]] دايمًا، و [[<audio>]] و [[<canvas>]] و [[<object>]] في حالات). inline وبياخد مقاس، وليه مقاس من نفسه أو 300 × 150، وبيتظبط بـ [[object-fit]].
- [[decoding="async"]] للصور اللي تحت، مع [[loading="lazy"]]. و [[fetchpriority="high"]] للهيرو لوحده.
- قبل أي ملف ميديا: مين صاحبه، وإيه رخصته. مفيش رخصة يعني لأ.
- CC: [[BY]] انسب، [[SA]] انشر بنفس الرخصة، [[NC]] غير تجاري، [[ND]] من غير تعديل.
- النسبة: الاسم، وصاحبه، والمصدر، والرخصة، واللي غيّرته.`,
          try: R`اعمل [[credit.html]] فيها صورة من تصويرك انت (أي صورة على جهازك، سمّيها [[photo.jpg]])، جوه [[<figure>]]، وتحتها نسبة كأنك بتنشرها برخصة CC BY 4.0: اسم للصورة، واسمك، واسم الرخصة بلينك لنصها. وعلى الصورة [[width]] و [[height]] و [[loading="lazy"]] و [[decoding="async"]]. وبعدين في الـ Console اكتب [[document.querySelector("img").decoding]] وشوف الرد، وغيّر القيمة في الملف لـ [[fast]] واعمل Ctrl+R واسأل تاني.`,
          sol: R`~~~html credit.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>صورة ونسبتها</title>
</head>
<body>
<figure>
  <img src="photo.jpg" alt="كوباية شاي على سور البلكونة وقت الغروب" width="800" height="600" loading="lazy" decoding="async">
  <figcaption>«شاي المغرب» تصوير هشام نبيل، رخصة <a href="https://creativecommons.org/licenses/by/4.0/" rel="license">CC BY 4.0</a>.</figcaption>
</figure>
</body>
</html>
~~~

~~~view 140 158 شكل الصفحة (الصورة هنا بانر مكان صورتك)
<figure>
  <img alt="كوباية شاي على سور البلكونة وقت الغروب" width="320" height="80" loading="lazy" decoding="async" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='80'%3E%3Crect width='320' height='80' fill='%230f766e'/%3E%3Ctext x='160' y='48' font-size='24' fill='white' text-anchor='middle'%3Eبودكاست المحطة%3C/text%3E%3C/svg%3E">
  <figcaption>«شاي المغرب» تصوير هشام نبيل، رخصة <a href="https://creativecommons.org/licenses/by/4.0/" rel="license">CC BY 4.0</a>.</figcaption>
</figure>
~~~

**هتشوف إيه:** الصورة وتحتها سطر النسبة، و «CC BY 4.0» لينك.

**ليه مفيش لينك «مصدر»:** الصورة أول مرة تتنشر هنا، فالصفحة دي هي المصدر. لو كانت من موقع تاني كان اسمها هيبقى لينك ليه.

**الغلطة الشائعة:** تكتب «رخصة Creative Commons» وخلاص. فيه ست رخص شروطهم مختلفة: الاسم بالظبط والنسخة (CC BY 4.0).

~~~text القياس من Chrome (في الـ Console)
> document.querySelector("img").decoding
"async"
بعد ما القيمة بقت decoding="fast":
"auto"                 ← قيمة مش معروفة، فرجعت للافتراضي
~~~`,
          deep: {
            why: R`اسم «replaced element» بيظهر في كل وثائق CSS: [[object-fit]] «بتشتغل على replaced elements»، و [[width]] «مبتشتغلش على inline non-replaced elements». من غير ما تعرف المصطلح، الجمل دي ملهاش معنى، والتصرفات اللي وراها بتبان عشوائية. والتراخيص: موقع العميل اللي عليه صورة من غير حق ممكن يجيله إنذار قانوني وفاتورة، والمسؤولية على اللي حط الصورة.`,
            how: R`في الـ layout، المتصفح بيسأل الـ replaced element عن «مقاسه الطبيعي» (العرض، والارتفاع، والنسبة) ويحسب الصندوق منهم ومن الـ CSS، وبعدين يرسم المحتوى جوه الصندوق حسب [[object-fit]]. العنصر العادي العكس: مقاسه بيتحسب من محتواه وأولاده. والصورة بتعدّي بتلات مراحل: طلب الملف (بيتحكم فيه [[loading]] و [[fetchpriority]])، وفكّه لبيكسلات ([[decoding]])، ورسمه.`,
            when: R`المصطلح: كل ما تقرا عن خاصية CSS وتلاقي «replaced». [[decoding="async"]]: صور المحتوى الكبيرة تحت أول الشاشة، والمعارض. والتراخيص: قبل ما أي ملف مش من صنعك يدخل فولدر المشروع. واعمل ملف أو صفحة «المصادر» من أول يوم.`,
            mistakes: R`معاملة [[<img>]] كأنها [[<span>]] أو [[<div>]]. محاولة شيل الفراغ اللي تحت الصورة بالـ margin. تبديل قيم [[loading]] و [[decoding]]. استخدام صور من غير رخصة مكتوبة. رخصة NC في شغل تجاري. تعديل عمل رخصته ND. ونسبة ناقصة من غير اسم الرخصة.`
          },
          practice: [
            { lvl: 'تطبيق', t: R`**ابني:** صورة غلاف الحلقة ٣ محتاجة نسبة. البيانات في البداية. اكتبها: الصورة والنسبة في [[<figure>]]، والنسبة في [[<figcaption>]] فيها اسم العمل لينك للمصدر، واسم المصوّر، واسم الرخصة لينك لنصها وعليه [[rel="license"]]، وإن الصورة اتعدّلت. (من قسم ٤ في الشرح، جزء «النسبة»)`, done: R`الصورة وتحتها سطر فيه لينكين، وكل الشروط ✓.`, work: { h: 250, start: R`<img alt="غلاف الحلقة ٣" width="320" height="80" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='80'%3E%3Crect width='320' height='80' fill='%230f766e'/%3E%3Ctext x='160' y='48' font-size='24' fill='white' text-anchor='middle'%3Eبودكاست المحطة%3C/text%3E%3C/svg%3E">
<p>اسم العمل: موجة خضرا</p>
<p>المصوّر: طارق سامي</p>
<p>المصدر: https://photos.example.test/p/9012</p>
<p>الرخصة: CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0/)</p>
<p>التعديل: اتكتب عليها اسم البودكاست</p>`, checks: [
              { say: R`الصورة جوه [[<figure>]]`, q: "figure > img" },
              { say: R`النسبة في [[<figcaption>]] فيه اسم المصوّر`, q: "figure > figcaption", has: "طارق سامي" },
              { say: R`اسم العمل لينك للمصدر`, q: "figcaption a[href=\"https://photos.example.test/p/9012\"]", has: "موجة خضرا" },
              { say: R`اسم الرخصة لينك لنصها وعليه [[rel="license"]]`, q: "figcaption a[rel~=\"license\"][href=\"https://creativecommons.org/licenses/by-sa/4.0/\"]", has: "CC BY-SA 4.0" },
              { say: R`مكتوب إيه اللي اتعدّل`, q: "figcaption", has: "اسم البودكاست" },
              { say: R`مفيش فقرات البيانات الخام`, q: "p", n: 0 },
            ] }, sol: R`~~~live 140 158 الحل
<figure>
  <img alt="غلاف الحلقة ٣" width="320" height="80" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='80'%3E%3Crect width='320' height='80' fill='%230f766e'/%3E%3Ctext x='160' y='48' font-size='24' fill='white' text-anchor='middle'%3Eبودكاست المحطة%3C/text%3E%3C/svg%3E">
  <figcaption>«<a href="https://photos.example.test/p/9012">موجة خضرا</a>» تصوير طارق سامي، رخصة <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="license">CC BY-SA 4.0</a>. اتكتب عليها اسم البودكاست.</figcaption>
</figure>
~~~

**هتشوف إيه:** الصورة، وتحتها سطر واحد: «موجة خضرا» لينك، واسم المصوّر، و «CC BY-SA 4.0» لينك، وجملة التعديل.

**ليه كده:** دي الـ TASL بالترتيب: الاسم (Title)، وصاحبه (Author)، ولينك المصدر (Source) على الاسم، والرخصة (License) بلينكها.

**خد بالك من SA:** الغلاف ده عمل معدّل من صورة رخصتها BY-SA، فالغلاف نفسه لازم يتنشر بـ CC BY-SA 4.0. لو مش عايز كده، دوّر على صورة CC BY أو CC0.

**الغلطة الشائعة:** تحط لينك الرخصة على كلمة «هنا». اسم الرخصة نفسه هو اللي يتكتب ويبقى اللينك.

~~~text القياس من Chrome (شجرة الـ accessibility)
figure     image «غلاف الحلقة ٣»     link «موجة خضرا»     link «CC BY-SA 4.0»
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** صفحة الحلقة فيها صورتين: الغلاف الكبير أول الشاشة، وصورة الضيف تحت خالص. التلميحات عليهم متلخبطة: القيم متبدّلة بين الـ attributes، والغلاف متأجّل، وصورة الضيف واخدة أولوية عالية. (من قسم ٢ و ٣ في الشرح)`, done: R`الغلاف عليه [[fetchpriority="high"]] بس، وصورة الضيف [[loading="lazy"]] و [[decoding="async"]]، وكل الشروط ✓.`, work: { h: 230, start: R`<img id="cover" alt="غلاف الحلقة ٣" width="320" height="80" loading="lazy" decoding="lazy" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='80'%3E%3Crect width='320' height='80' fill='%230f766e'/%3E%3Ctext x='160' y='48' font-size='24' fill='white' text-anchor='middle'%3Eبودكاست المحطة%3C/text%3E%3C/svg%3E">
<p>وصف الحلقة...</p>
<img id="guest" alt="ضيفة الحلقة: المصوّرة سلمى فؤاد" width="320" height="80" loading="async" fetchpriority="high" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='80'%3E%3Crect width='320' height='80' fill='%230f766e'/%3E%3Ctext x='160' y='48' font-size='24' fill='white' text-anchor='middle'%3Eبودكاست المحطة%3C/text%3E%3C/svg%3E">`, checks: [
              { say: R`الغلاف [[fetchpriority="high"]]`, q: "#cover[fetchpriority=\"high\"]" },
              { say: R`الغلاف مفيهوش [[loading="lazy"]]`, q: "#cover[loading=\"lazy\"]", n: 0 },
              { say: R`صورة الضيف [[loading="lazy"]]`, q: "#guest[loading=\"lazy\"]" },
              { say: R`صورة الضيف [[decoding="async"]]`, q: "#guest[decoding=\"async\"]" },
              { say: R`صورة الضيف مفيهاش [[fetchpriority="high"]]`, q: "#guest[fetchpriority=\"high\"]", n: 0 },
              { say: R`مفيش قيم متبدّلة ([[decoding="lazy"]] أو [[loading="async"]])`, q: "img[decoding=\"lazy\"], img[loading=\"async\"]", n: 0 },
            ] }, sol: R`~~~live 240 بعد التصليح
<img id="cover" alt="غلاف الحلقة ٣" width="320" height="80" fetchpriority="high" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='80'%3E%3Crect width='320' height='80' fill='%230f766e'/%3E%3Ctext x='160' y='48' font-size='24' fill='white' text-anchor='middle'%3Eبودكاست المحطة%3C/text%3E%3C/svg%3E">
<p>وصف الحلقة...</p>
<img id="guest" alt="ضيفة الحلقة: المصوّرة سلمى فؤاد" width="320" height="80" loading="lazy" decoding="async" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='80'%3E%3Crect width='320' height='80' fill='%230f766e'/%3E%3Ctext x='160' y='48' font-size='24' fill='white' text-anchor='middle'%3Eبودكاست المحطة%3C/text%3E%3C/svg%3E">
~~~

**هتشوف إيه:** نفس الصفحة قبل وبعد: التلميحات مبتغيّرش الشكل، بتغيّر ترتيب ووقت التحميل (بيتشاف في DevTools › Network عمود Priority).

| المشكلة | التصليح | ليه |
|---|---|---|
| [[decoding="lazy"]] على الغلاف | اتمسح | [[lazy]] قيمة [[loading]] مش [[decoding]]، فكانت بترجع [[auto]] |
| [[loading="lazy"]] على الغلاف | اتمسح، وزوّدنا [[fetchpriority="high"]] | أول صورة في الشاشة: التأجيل بيأخّر أهم حاجة |
| [[loading="async"]] على صورة الضيف | [[loading="lazy"]] و [[decoding="async"]] | القيمتين كانوا متبدّلين |
| [[fetchpriority="high"]] على صورة تحت | اتمسح | لو كل الصور «عالية» محدش فيهم عالي |

**الغلطة الشائعة:** تحط التلاتة على كل الصور «للأداء». [[lazy]] و [[high]] على نفس الصورة عكس بعض.

~~~text القياس من Chrome
decoding="lazy"   →  الخاصية decoding = "auto"
loading="async"   →  الخاصية loading  = "auto"
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع، وبعدين صلّح:** صندوق أصفر جواه صورة ارتفاعها 80 وبس. اكتب على ورقة: ارتفاع الصندوق كام؟ ٨٠ بالظبط؟ وبعدين خلّي الصندوق على قد الصورة بالظبط بسطر CSS واحد على الصورة. (من قسم ١ في الشرح، بند ٤)`, done: R`كتبت توقّعك، والشريط الأصفر اللي تحت الصورة اختفى، وكل الشروط ✓.`, work: { h: 130, start: R`<div style="background:#fde68a; width:320px">
  <img alt="بودكاست المحطة" width="320" height="80" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='80'%3E%3Crect width='320' height='80' fill='%230f766e'/%3E%3Ctext x='160' y='48' font-size='24' fill='white' text-anchor='middle'%3Eبودكاست المحطة%3C/text%3E%3C/svg%3E">
</div>`, checks: [
              { say: R`الصورة عليها [[display: block]]`, q: "img[style*=\"display:block\"], img[style*=\"display: block\"]" },
              { say: R`الصورة لسه جوه الـ [[<div>]] الأصفر`, q: "div[style*=\"background\"] > img" },
              { say: R`المقاس في الـ HTML زي ما هو`, q: "img[width=\"320\"][height=\"80\"]" },
            ] }, sol: R`~~~live 102 بعد التعديل
<div style="background:#fde68a; width:320px">
  <img alt="بودكاست المحطة" width="320" height="80" style="display:block" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='80'%3E%3Crect width='320' height='80' fill='%230f766e'/%3E%3Ctext x='160' y='48' font-size='24' fill='white' text-anchor='middle'%3Eبودكاست المحطة%3C/text%3E%3C/svg%3E">
</div>
~~~

وده اللي كان باين قبل:

~~~live 106 قبل
<div style="background:#fde68a; width:320px">
  <img alt="بودكاست المحطة" width="320" height="80" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='80'%3E%3Crect width='320' height='80' fill='%230f766e'/%3E%3Ctext x='160' y='48' font-size='24' fill='white' text-anchor='middle'%3Eبودكاست المحطة%3C/text%3E%3C/svg%3E">
</div>
~~~

**التوقّع:** أكتر من ٨٠ بكام بيكسل. الصورة inline، فقاعدة على سطر الكتابة والسطر سايب تحتها مكان لديل الحروف.

**هتشوف إيه:** قبل: شريط أصفر رفيع تحت البانر. بعد: مفيش أصفر باين خالص، الصندوق على قد الصورة.

**ليه [[display: block]]:** بيطلّع الصورة من السطر، فمبقاش فيه baseline ولا مكان تحته. ([[vertical-align: bottom]] بيحلها برده والصورة تفضل inline.)

**الغلطة الشائعة:** [[margin-bottom: -4px]]. الرقم بيتغيّر مع حجم الخط ونوعه، فهيبوظ أول ما الخط يتغيّر.

~~~text القياس من Chrome (صورة 120 × 60، والخط الافتراضي 16px)
inline:   ارتفاع الصندوق = 64
block:    ارتفاع الصندوق = 60
~~~` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** فريق «المحطة» جمع خمس ملفات لصفحة الحلقة (البودكاست فيه إعلانات، يعني استخدام تجاري). لكل ملف قول: يتستخدم ولا لأ؟ وبأنهي شرط؟ (من قسم ٤ في الشرح)

~~~text ملفات الحلقة
1. صورة استوديو    CC BY 4.0           هتتقصّ مربع
2. موسيقى المقدمة  CC BY-NC 4.0        زي ما هي
3. أيقونة مايك     CC0                 هيتغيّر لونها
4. صورة الضيفة     CC BY-ND 4.0        هتتقصّ دايرة
5. صورة غلاف       من بحث الصور، ومفيش أي رخصة مكتوبة في صفحتها
~~~`, done: R`خمس أحكام، كل واحد بسببه من حروف الرخصة.`, sol: R`| الملف | الحكم | السبب |
|---|---|---|
| ١. صورة الاستوديو، CC BY | **آه** | تجاري وتعديل مسموحين. الشرط: نسبة كاملة، وتكتب «اتقصّت» |
| ٢. الموسيقى، CC BY-NC | **لأ** | NC = غير تجاري، والبودكاست فيه إعلانات |
| ٣. الأيقونة، CC0 | **آه** | من غير أي شرط، والنسبة اختيارية |
| ٤. صورة الضيفة، CC BY-ND | **لأ بالشكل ده** | ND = من غير تعديل، والقصّ دايرة بيغيّر شكل العمل. تتستخدم زي ما هي مع النسبة، أو تطلبوا من الضيفة صورة |
| ٥. صورة من غير رخصة | **لأ** | مفيش رخصة معناها كل الحقوق محفوظة. الحل: إذن مكتوب من صاحبها، أو صورة تانية |

**القاعدة:** اقرا الحروف واحد واحد وقارنها باللي هتعمله: هتكسب منه؟ (NC). هتعدّل فيه؟ (ND و SA). وفي كل الحالات BY: انسب.

**الغلطة الشائعة:** تعتبر القصّ «مش تعديل». CC نفسها بتعتبر القصّ تغيير بسيط لازم يتذكر، ومع ND الأضمن متلمسش العمل.

النسبة للملف الأول زي ما تتكتب في الصفحة:

~~~live 56 نسبة الملف ١
<p><small>«<a href="https://photos.example.test/p/4821">استوديو صغير</a>» تصوير سلمى فؤاد، رخصة <a href="https://creativecommons.org/licenses/by/4.0/" rel="license">CC BY 4.0</a>. اتقصّت من الأصل.</small></p>
~~~` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** افتح صفحة «Replaced elements» في قاموس MDN (اللينك تحت الدرس). طلّع منها: (١) أنهي عناصر مكتوب إنها replaced دايمًا، وأنهي «في حالات معينة». (٢) إيه اللي بيتقال عليه «anonymous replaced element»؟ (بيكمّل قسم ١ في الشرح)`, done: R`كتبت القايمتين، وجملة عن الـ anonymous replaced elements.`, sol: R`من صفحة MDN:

1. **دايمًا:** [[<img>]] و [[<video>]] و [[<iframe>]] و [[<embed>]] (ومعاهم [[<fencedframe>]]، عنصر تجريبي مش في الكورس). **في حالات معينة:** [[<audio>]] و [[<canvas>]] و [[<object>]] و [[<input>]] من نوع [[image]] بس.
2. **anonymous replaced elements:** الحاجات اللي بتتحط في الصفحة بخاصية [[content]] في الـ CSS (زي صورة في [[::before]]). «anonymous» لأنها مش موجودة في كود الـ HTML.

~~~text القياس من Chrome (بيأكد الجدول)
<audio> من غير controls:   display: none   (مش replaced: مفيش صندوق أصلًا)
<audio controls>:          300 × 54
<canvas>:                  300 × 150       <object>: 300 × 150       <embed>: 0 × 0
~~~

**ليه «في حالات»:** [[<audio>]] من غير [[controls]] مبيترسمش خالص، و [[<object>]] اللي ملفه فشل بيعرض أولاده (محتوى عادي)، و [[<canvas>]] في متصفح مبيدعمهوش بيعرض بديله. في الحالات دي العنصر مبقاش «محتوى من برّه».` },
          ]
        }
      ]
    }
]);
