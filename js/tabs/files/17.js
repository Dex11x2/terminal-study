// تكملة تاب files: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/files/01.js (شرح حقول الدرس في أوله)
MORE("files", [
    {
      t: "الصور والميديا والخطوط",
      l: 3,
      n: "تختار صيغة الصورة صح (png ولا jpg ولا webp ولا avif)، و favicon، و SVG اللي هو كود XML، والفيديو والصوت (الـ container غير الـ codec)، والخطوط ttf و woff2",
      items: [
        {
          cmd: ".png و .jpg",
          title: "إمتى PNG وإمتى JPG، وإيه المعلومات المخفية (EXIF) اللي جوه صور الموبايل؟",
          desc: R`الاتنين صور bitmap (raster): شبكة بكسلات، وكل بكسل لون. لو كبّرتهم أكتر من حجمهم الحقيقي بيبقوا مربعات (pixelated).

• [[.png]]: ضغط lossless (من غير ما يضيّع أي بكسل)، ويدعم الشفافية (alpha). ممتاز للـ screenshots واللوجوهات والأيقونات والرسومات اللي فيها ألوان قليلة ومساحات سادة ونص. وحش للصور الفوتوغرافية (بيطلع ضخم).
• [[.jpg]] أو [[.jpeg]] (نفس الحاجة، الـ [[.jpg]] من أيام الامتدادات ٣ حروف): ضغط lossy: بيرمي تفاصيل العين مش هتاخد بالها منها. ممتاز للصور الفوتوغرافية (أصغر ١٠ مرات من PNG)، وحش للنص واللوجوهات (بيعمل «غبار» حوالين الحواف)، ومفيهوش شفافية. والـ quality (من 1 لـ 100) بتتحكم في الحجم، و 75 لـ 85 كفاية غالبًا. وكل ما تفتحه وتحفظه تاني بيخسر جودة تاني.

البصمات: PNG بيبدأ بـ [[89 50 4E 47 0D 0A 1A 0A]]، و JPG بـ [[FF D8 FF]].

EXIF: صور الموبايل والكاميرا (JPG و HEIC) جواها metadata: نوع الموبايل، والتاريخ، والإعدادات، وأحيانًا مكان التصوير بالـ GPS. لو اليوزر رفع صورة على موقعك وانت عرضتها زي ما هي، أي حد ينزّلها يعرف بيته فين. الحل: امسح الـ metadata وقت الرفع (مكتبة sharp في Node بتعمل ده افتراضيًا لما تعيد حفظ الصورة، أو [[magick -strip]]، أو [[exiftool -all=]]). ووسائل التواصل الكبيرة بتمسحها لوحدها، بس مواقع كتير لأ. وكمان EXIF فيه [[Orientation]]: الموبايل بيحفظ الصورة «نايمة» ويكتب «لفّها»، وبرامج بتحترم ده وبرامج لأ.

وأخ: [[.heic]] و [[.heif]]: الصيغة الافتراضية على الآيفون (أصغر من JPG)، بس المتصفحات (غير Safari) وويندوز القديم مبيعرضوهاش، فحوّلها لـ JPG أو WebP قبل ما تعرضها على الويب.

قاعدة الويب: متحطش صورة 4000 بكسل في مكان عرضه 400. صغّر المقاس الأول (ده أكبر توفير)، وبعدين اختار الصيغة (الدرس الجاي: WebP و AVIF).`,
          example: R`file photo.png camera.jpg
xxd -l 8 camera.png
magick camera.png -quality 80 camera.jpg
ls -l camera.png camera.jpg
exiftool -GPSPosition -Model phone.jpg
magick phone.jpg -strip clean.jpg`,
          try: R`خد صورة بموبايلك (والـ location شغال) وانقلها للجهاز من غير WhatsApp (بيمسح الـ metadata): كابل أو Google Photos «download original». نفّذ [[exiftool phone.jpg]] (أو على ويندوز: كليك يمين ثم Properties ثم Details) وشوف فيه إيه. بعدين خد screenshot لصفحة واحفظها PNG وحوّلها JPG وقارن الحجم والشكل حوالين الحروف. (الأدوات: [[sudo apt install imagemagick libimage-exiftool-perl]]، أو [[brew install imagemagick exiftool]].)`,
          deep: {
            why: R`الصور أتقل حاجة في أغلب المواقع، وكل صورة أكبر من اللازم بتبطّأ الصفحة خصوصًا على موبايل وباقة. واختيار الصيغة الغلط ممكن يضاعف الحجم ١٠ مرات. والـ EXIF موضوع خصوصية حقيقي بقى بيتحاسب عليه في قوانين حماية البيانات.`,
            how: R`PNG بيمشي على البكسلات صف صف ويضغط التكرار بـ Deflate (نفس اللي في zip)، فالمساحات السادة بتتضغط جدًا والصور المليانة تفاصيل لأ. JPG بيقسم الصورة مربعات ٨×٨، ويحوّل كل مربع لترددات، ويرمي الترددات العالية (التفاصيل الدقيقة) على حسب الـ quality. عشان كده الحواف الحادة (نص) بتبوظ في JPG.`,
            when: R`PNG: لوجو وأيقونة وscreenshot وأي حاجة فيها نص أو محتاجة شفافية. JPG: صور فوتوغرافية لو مش هتستخدم WebP أو AVIF. ودايمًا امسح EXIF من صور اليوزرز.`,
            mistakes: R`صور فوتوغرافية PNG على الموقع (ميجات بدل كيلوبايتات). لوجو أو screenshot JPG (حواف مبهدلة). تحفظ JPG أكتر من مرة فتبوظ. تعرض صور اليوزرز بالـ GPS. وتغيّر امتداد [[.heic]] لـ [[.jpg]] وتفتكر إنه اتحوّل (درس «الامتداد»).`
          },
          teach: R`## المثال: نفس الصورة بصيغتين، وبعدين المعلومات المخفية

المثال بيعرف نوع الصورة من محتواها، ويحوّل PNG لـ JPG ويقارن الحجم، ويقرا الـ EXIF من صورة موبايل ويمسحه. الأوامر بتستخدم ImageMagick ([[magick]]) و [[exiftool]]، والاتنين مكانوش متسطّبين على الجهاز اللي جربنا عليه (ويندوز)، فعملنا نفس الخطوات بمكتبة Pillow في Python، و [[file]] و [[xxd]] من Git Bash. الأرقام تحت حقيقية من التجربة دي.

---

## ١. [[file photo.png camera.jpg]]

[[file]] بيقرا أول bytes ويقول النوع والمقاس، والامتداد مش فارق معاه:

~~~text الناتج
camera.png: PNG image data, 1200 x 800, 8-bit/color RGB, non-interlaced
camera.jpg: JPEG image data, JFIF standard 1.01, ..., baseline, precision 8, 1200x800, components 3
~~~

| الكلمة | معناها |
|---|---|
| [[1200 x 800]] | العرض × الطول بالبكسل |
| [[8-bit/color RGB]] | كل لون (أحمر وأخضر وأزرق) رقم من 0 لـ 255 (8 bit). لو فيه شفافية هتلاقي [[RGBA]] |
| [[non-interlaced]] | الصورة متخزنة صف ورا صف (مش على مراحل) |
| [[JFIF]] | الشكل المعتاد لملف JPEG |
| [[baseline]] | JPG بيتعرض من فوق لتحت وهو بيتحمّل ([[progressive]] بيتعرض مغبش وبعدين يوضح) |
| [[components 3]] | ٣ قنوات ألوان |

---

## ٢. [[xxd -l 8 camera.png]]: البصمة

~~~text الناتج
00000000: 8950 4e47 0d0a 1a0a                      .PNG....
~~~

| الـ byte | ليه موجود |
|---|---|
| [[89]] | byte مش حرف عادي، عشان أي برنامج يفتكره نص يعرف إنه غلطان |
| [[50 4e 47]] | الحروف [[PNG]] |
| [[0d 0a]] | [[\r\n]] (سطر جديد بتاع ويندوز) |
| [[1a]] | Ctrl+Z، كان معناه «آخر الملف» في DOS |
| [[0a]] | [[\n]] (سطر جديد بتاع لينكس) |

البصمة دي معمولة بذكاء: لو الملف اتنقل بطريقة بتغيّر السطور الجديدة (FTP في وضع النص مثلًا)، الـ [[0d 0a]] أو الـ [[0a]] هيتغيروا والبرنامج يعرف إن الملف باظ. و JPG بيبدأ بـ [[ff d8 ff]] ([[xxd]] على [[camera.jpg]] طلّع [[ffd8 ffe0]]).

---

## ٣. [[magick camera.png -quality 80 camera.jpg]]

- [[magick]]: أمر ImageMagick (النسخة 7، وفي النسخ القديمة اسمه [[convert]]).
- اسم الـ input، وبعده الإعدادات، وبعده اسم الـ output. وامتداد الـ output هو اللي بيحدد الصيغة.
- [[-quality 80]]: جودة الـ JPG من 1 لـ 100. الأقل = ملف أصغر وتفاصيل أقل.

---

## ٤. [[ls -l camera.png camera.jpg]]: قارن

عملنا صورتين 1200×800 بـ Pillow، وحفظنا كل واحدة PNG و JPG بجودة 80 (نفس اللي [[-quality 80]] بيعمله):

| الصورة | PNG | JPG (80) | مين أصغر |
|---|---|---|---|
| شبه صورة كاميرا (تدرجات ألوان وتشويش) | 1010946 | 110349 | JPG أصغر ٩ مرات |
| رسمة 800×500 (خطوط ومستطيل ونص على أبيض) | 4081 | 27672 | PNG أصغر ٧ مرات |

ليه العكس؟ PNG بيضغط **التكرار**: صف كله أبيض بيتخزن تقريبًا ببلاش، بس صورة كل بكسل فيها مختلف عن اللي جنبه مفيهاش تكرار. و JPG بيرمي **التفاصيل الدقيقة**: في الصورة الفوتوغرافية العين مش هتاخد بالها، بس في الرسمة الحواف الحادة نفسها هي التفاصيل، فبيحاول يحفظها ويكبر، وبيعمل «غبار» حواليها.

---

## ٥. [[exiftool -GPSPosition -Model phone.jpg]]

[[exiftool]] بيقرا الـ metadata. ومن غير أي حاجة بعده بيطبع كل الـ tags، ولو كتبت أسامي tags بـ [[-]] قبلها بيطبعهم هما بس: [[GPSPosition]] (مكان التصوير) و [[Model]] (موديل الموبايل).

عشان نجرّب من غير صورة حد حقيقية، كتبنا بـ Pillow EXIF في [[phone.jpg]] زي اللي الموبايل بيكتبه: الشركة [[samsung]]، والموديل [[SM-S918B]]، و [[Orientation]] = 6، و GPS: [[30° 2' 39.84" N]] و [[31° 14' 8.52" E]] (وسط القاهرة). وقريناه تاني:

~~~text الناتج
Model: SM-S918B | Orientation: 6
{'GPSLatitudeRef': 'N', 'GPSLatitude': (30.0, 2.0, 39.84), 'GPSLongitudeRef': 'E', 'GPSLongitude': (31.0, 14.0, 8.52)}
~~~

- [[GPSLatitude]] (خط العرض) و [[GPSLongitude]] (خط الطول)، كل واحد درجات ودقايق وثواني، و [[N]] شمال و [[E]] شرق. الرقمين دول بيتحطوا في أي خريطة ويوصلوا للمكان بالمتر تقريبًا.
- [[Orientation]] = 6 معناها «لفّ الصورة ٩٠ درجة مع عقارب الساعة وانت بتعرضها». الكاميرا حفظتها نايمة وكتبت الملاحظة دي.

و [[file]] كمان شايفهم:

~~~text الناتج
phone.jpg: JPEG image data, ..., Exif Standard: [TIFF image data, big-endian, direntries=4, manufacturer=samsung, model=SM-S918B, orientation=upper-right, GPS-Data], ...
~~~

---

## ٦. [[magick phone.jpg -strip clean.jpg]]

[[-strip]] = شيل كل الـ metadata (EXIF والـ GPS وأي تعليقات) واحفظ الصورة من غيرها. عملنا نفس الحكاية بإننا فتحنا الصورة بـ Pillow وحفظناها من غير ما نديله الـ EXIF:

~~~text الناتج
clean exif tags: 0
clean.jpg: JPEG image data, JFIF standard 1.01, ..., 1200x800, components 3
~~~

مفيش [[Exif]] ولا [[GPS-Data]] في ناتج [[file]]، و [[grep -c "SM-S918B"]] على الملف طلّع 0. والحجم نزل من 110545 لـ 110353 (الـ EXIF كان حوالي ٢٠٠ byte بس، بس فيهم عنوان بيتك).

> لاحظ إن [[-strip]] بيشيل [[Orientation]] كمان. لو الصورة كانت نايمة، لفّها الأول ([[magick phone.jpg -auto-orient -strip clean.jpg]]) وبعدين امسح.

---

## الخلاصة

| | PNG | JPG |
|---|---|---|
| الضغط | lossless (مفيش بكسل بيضيع) | lossy (بيرمي تفاصيل، بالـ quality) |
| الشفافية | آه | لأ |
| أحسن لـ | لوجو وscreenshot ونص ورسومات | صور فوتوغرافية |
| البصمة | [[89 50 4E 47 0D 0A 1A 0A]] | [[FF D8 FF]] |

وأي صورة يوزر رافعها: امسح الـ EXIF قبل ما تعرضها.`,
          lines: [
            R`النوع والمقاس من المحتوى.`,
            R`بصمة PNG: [[89]] و [[PNG]] و [[\r\n]] و [[1a]] و [[\n]].`,
            R`ImageMagick: حوّل لـ JPG بجودة 80.`,
            R`قارن الحجم.`,
            R`اقرا مكان التصوير ونوع الموبايل من الـ EXIF.`,
            R`[[-strip]] بيمسح كل الـ metadata.`
          ],
          sol: R`على صورة 1200×800 شبه صورة الكاميرا (تدرجات وتفاصيل):
[[camera.png]] ← 633504 byte، و [[camera.jpg]] (quality 80) ← 54876 byte. يعني PNG أكبر ١١ مرة.
لكن على رسمة 800×500 فيها خطوط ومساحات سادة: PNG ← 46444، و JPG ← 113121. يعني العكس!

[[00000000: 8950 4e47 0d0a 1a0a                      .PNG....]]

و [[exiftool]] على صورة موبايل:
[[GPSPosition                     : 30 deg 2' 39.84" N, 31 deg 14' 8.52" E]] (ده وسط القاهرة)
[[Model                           : SM-S918B]]
وعلى [[clean.jpg]] بعد [[-strip]]: مفيش ولا سطر.`
        },
        {
          cmd: ".webp و .avif و .gif و .ico",
          title: "WebP و AVIF أحسن من JPG ليه، وإيه دور .gif و favicon.ico النهارده؟",
          desc: R`صيغ الويب الحديثة:
• [[.webp]] (من Google): lossy أو lossless، وفيه شفافية وحركة. أصغر من JPG بحوالي ٢٥ لـ ٣٥٪ لنفس الجودة. مدعوم في كل المتصفحات الحالية. ده الاختيار الآمن الافتراضي للويب.
• [[.avif]] (مبني على AV1): غالبًا أصغر من WebP، خصوصًا في الجودة المنخفضة. مدعوم في كل المتصفحات الحديثة، بس الضغط أبطأ.
• [[.gif]]: قديم جدًا (1987)، ٢٥٦ لون بس، وبيستخدم للصور المتحركة. الـ GIF المتحرك غالبًا ضخم: فيديو [[.mp4]] أو [[.webm]] صامت بـ [[autoplay muted loop]] أصغر بـ ١٠ مرات.
• [[.ico]]: صيغة أيقونات ويندوز، فيها كذا مقاس جوه ملف واحد (16 و 32 و 48). لسه بتستخدم كـ [[favicon.ico]] لأن المتصفحات بتطلبها من [[/favicon.ico]] لوحدها لو ملقتش حاجة.

الـ favicon النهارده:
• [[<link rel="icon" href="/favicon.ico" sizes="32x32">]] للمتصفحات القديمة.
• [[<link rel="icon" href="/icon.svg" type="image/svg+xml">]]: SVG بيبقى حاد على أي شاشة.
• [[<link rel="apple-touch-icon" href="/apple-touch-icon.png">]] (180×180) للآيفون لما حد يضيف الموقع للشاشة الرئيسية.
• و [[manifest.webmanifest]] (JSON) فيه أيقونات 192 و 512 للـ PWA و Android.
وفي Next.js بتحط [[app/icon.png]] و [[app/favicon.ico]] والإطار بيعمل الـ tags لوحده.

تدّي المتصفح أكتر من صيغة، وهو ياخد أول واحدة بيفهمها:
[[<picture>]] وجواه [[<source srcset="a.avif" type="image/avif">]] و [[<source srcset="a.webp" type="image/webp">]] و [[<img src="a.jpg" alt="...">]].
والأسهل: أدوات زي [[next/image]] و Cloudinary و Cloudflare Images بيعملوا التحويل والمقاسات لوحدهم.`,
          example: R`cwebp -q 80 camera.png -o camera.webp
avifenc -q 60 camera.png camera.avif
ls -l camera.*
magick logo.png -define icon:auto-resize=16,32,48 favicon.ico
file camera.webp camera.avif favicon.ico`,
          try: R`على نفس [[camera.png]] أو أي صورة فوتوغرافية عندك، نفّذ المثال وقارن الأحجام الأربعة (png و jpg و webp و avif) وافتح الأربعة جنب بعض في المتصفح ([[file:///]] أو سيرفر محلي) ودوّر على فرق في الجودة. (الأدوات: [[sudo apt install webp libavif-bin imagemagick]]، أو Squoosh.app في المتصفح من غير تسطيب.) وافتح [[F12]] ثم Network على أي موقع كبير وفلتر بـ Img وشوف الصيغ.`,
          deep: {
            why: R`JPG و PNG من التسعينات، والشاشات والإنترنت اتغيروا. WebP و AVIF بيستخدموا تقنيات ضغط الفيديو الحديثة على الصور، فبيدّوا نفس الجودة بحجم أقل بكتير، وده بيفرق في سرعة الموقع وترتيبه في Google (Core Web Vitals).`,
            how: R`WebP (VP8) و AVIF (AV1) بيتوقعوا كل حتة في الصورة من الحتت اللي جنبها ويحفظوا الفرق بس، وبيقسموا الصورة بلوكات بمقاسات مختلفة على حسب التفاصيل. والبصمات: WebP بيبدأ بـ [[RIFF]] وبعدها [[WEBP]]، و AVIF فيه [[ftypavif]]، و GIF بـ [[GIF89a]]، و ICO بـ [[00 00 01 00]].`,
            when: R`WebP كافتراضي لكل صور الموقع، و AVIF لو الأداة بتاعتك بتعمله لوحدها. و ICO للـ favicon بس. و GIF لأ (حوّله فيديو).`,
            mistakes: R`ترفع GIF متحرك ٨ ميجا. تغيّر امتداد JPG لـ WebP وتفتكر إنه اتحوّل. تحط [[<img src="x.avif">]] من غير بديل لمتصفحات قديمة لو جمهورك فيه أجهزة قديمة. وتعمل favicon بـ PNG كبير 1000×1000 بدل المقاسات الصغيرة.`
          },
          teach: R`## المثال: نفس الصورة بأربع صيغ، وأيقونة فيها ٣ مقاسات

بناخد [[camera.png]] (الصورة الفوتوغرافية بتاعة الدرس اللي فات) ونحوّلها WebP و AVIF ونقارن الأحجام، وبعدين نعمل [[favicon.ico]]. الأدوات اللي في المثال ([[cwebp]] من Google، و [[avifenc]] من مكتبة libavif، و ImageMagick) مكانتش متسطّبة على جهاز التجربة (ويندوز)، فعملنا نفس التحويلات بـ Pillow 12.1 في Python (بيستخدم نفس المكتبات libwebp و libavif من جوه)، و [[file]] و [[xxd]] من Git Bash.

---

## ١. [[cwebp -q 80 camera.png -o camera.webp]]

- [[cwebp]] = compress WebP، أداة Google الرسمية (حزمة [[webp]]). وأخوها [[dwebp]] بيفك.
- [[-q 80]]: الجودة من 0 لـ 100، زي JPG.
- [[-o]] = output: اسم الملف الناتج.

في Pillow: [[im.save("camera.webp", quality=80)]].

## ٢. [[avifenc -q 60 camera.png camera.avif]]

- [[avifenc]] = AVIF encoder (حزمة [[libavif-bin]]).
- [[-q 60]]: الجودة من 0 لـ 100. AVIF بيدّي شكل كويس بجودة أقل من JPG، فـ 60 هنا تقريبًا زي 80 في JPG.
- مفيش [[-o]]: الـ input الأول وبعده الـ output.

في Pillow: [[im.save("camera.avif", quality=60)]].

---

## ٣. [[ls -l camera.*]]: الأحجام

[[camera.*]] = كل الملفات اللي اسمها [[camera]] بأي امتداد.

| الملف | الحجم (byte) | بالنسبة لـ JPG |
|---|---|---|
| [[camera.png]] | 1010946 | ٩ أضعاف |
| [[camera.jpg]] (quality 80) | 110349 | ١٠٠٪ |
| [[camera.webp]] (quality 80) | 49114 | حوالي ٤٥٪ |
| [[camera.avif]] (quality 60) | 31419 | حوالي ٢٨٪ |

في الصورة دي AVIF كسب، و WebP أقل من نص JPG. (صورتنا فيها تشويش عشوائي، والـ JPG بيتعب معاه أكتر من الصور الحقيقية، فالفرق في صور الموبايل العادية بيبقى أقل من كده، بس الترتيب غالبًا نفسه.) وجربنا كمان AVIF بـ ffmpeg ([[-c:v libaom-av1 -crf 30 -still-picture 1]]) وطلع 28409 byte: نفس الصيغة بأداة تانية وإعدادات تانية.

---

## ٤. [[magick logo.png -define icon:auto-resize=16,32,48 favicon.ico]]

- [[-define icon:auto-resize=16,32,48]]: إعداد خاص بصيغة ICO: اعمل من الصورة ٣ نسخ، 16×16 و 32×32 و 48×48، وحطهم كلهم في ملف واحد.
- ليه كذا مقاس؟ المتصفح بيستخدم 16 في التاب، و 32 في الشاشات اللي كثافتها عالية، وويندوز 48 في الاختصارات. وكل مقاس بيتصغر من الأصل لوحده، فبيبقى أحد من إنك تصغّر الكبير وقت العرض.

في Pillow: [[logo.save("favicon.ico", sizes=[(16,16),(32,32),(48,48)])]]، والملف طلع 2134 byte.

---

## ٥. [[file camera.webp camera.avif favicon.ico]]

~~~text الناتج
camera.webp: RIFF (little-endian) data, WebP image, VP8 encoding, 1200x800, ...
camera.avif: ISO Media, AVIF Image
favicon.ico: MS Windows icon resource - 3 icons, 16x16 with  PNG image data, 16 x 16, 8-bit/color RGBA, ... 32x32 with  PNG image data, ...
~~~

- **WebP**: الملف من بره صندوق [[RIFF]] (نفس صندوق ملفات [[.wav]])، وجواه [[WEBP]] وبعدها [[VP8]]، يعني الصورة مضغوطة بـ codec فيديو VP8 كأنها frame واحد. [[xxd -l 16]] بيوري ده بالظبط: [[RIFF....WEBPVP8 ]]، والـ ٤ bytes اللي بعد [[RIFF]] هي حجم الملف.
- **AVIF**: بيبدأ بـ [[ftypavif]]، نفس شكل الـ mp4 ([[ISO Media]]): صورة AV1 جوه صندوق فيديو.
- **ICO**: بيبدأ بـ [[00 00 01 00]]، وجواه ٣ أيقونات، كل واحدة PNG صغيرة ([[RGBA]]: فيها شفافية).

---

## ٦. الـ HTML اللي بيستخدم الصيغ دي

~~~text
<picture>
  <source srcset="camera.avif" type="image/avif">
  <source srcset="camera.webp" type="image/webp">
  <img src="camera.jpg" alt="صورة الصالة">
</picture>
~~~

المتصفح بيمشي على الـ [[<source>]] بالترتيب، وأول [[type]] يفهمه بياخده ويتجاهل الباقي. لو مفهمش ولا واحد (متصفح قديم جدًا)، بيعرض الـ [[<img>]]. والـ [[alt]] والمقاس بيتحطوا على الـ [[<img>]] بس.

---

## الخلاصة

| الصيغة | البصمة | تستخدمها في |
|---|---|---|
| [[.webp]] | [[RIFF]] ... [[WEBP]] | الافتراضي لصور الموقع |
| [[.avif]] | [[ftypavif]] | أصغر، لو أداتك بتعمله |
| [[.gif]] | [[GIF89a]] | ولا حاجة تقريبًا: الحركة فيديو أحسن |
| [[.ico]] | [[00 00 01 00]] | [[favicon.ico]] بس، بمقاسات 16 و 32 و 48 |`,
          lines: [
            R`[[cwebp]] بيحوّل لـ WebP بجودة 80.`,
            R`[[avifenc]] بيحوّل لـ AVIF.`,
            R`قارن الأحجام.`,
            R`ICO فيه ٣ مقاسات في ملف واحد.`,
            R`البصمات والمقاسات.`
          ],
          sol: R`على صورة 1200×800 (الأحجام بالـ byte):
[[camera.png]] 633504
[[camera.jpg]] 54876 (quality 80)
[[camera.avif]] 24524
[[camera.webp]] 23550
يعني WebP و AVIF أقل من نص JPG، وفي الصورة دي WebP كسب بفرق صغير (في صور تانية AVIF بيكسب).

و [[file]]:
[[camera.webp: RIFF (little-endian) data, Web/P image, VP8 encoding, 1200x800, ...]]
[[camera.avif: ISO Media, AVIF Image]]
[[favicon.ico: MS Windows icon resource - 3 icons, 16x16, 32 bits/pixel, 32x32, 32 bits/pixel]]`
        },
        {
          cmd: ".svg",
          title: "ليه SVG مش بيبوظ مهما كبّرته، وليه هو XML تقدر تفتحه في المحرر؟",
          desc: R`[[.svg]] (Scalable Vector Graphics) مش بكسلات: هو وصف للرسمة بالأشكال (دايرة هنا، خط من هنا لهنا، لون كذا)، والمتصفح بيرسمها بالمقاس المطلوب. عشان كده حاد على أي حجم وأي شاشة، وحجمه صغير جدًا للوجوهات والأيقونات. ومش مناسب للصور الفوتوغرافية.

والمفاجأة: SVG ملف XML نصي (درس [[.xml]]). تقدر تفتحه في VS Code وتعدّل اللون بإيدك.

الرموز:
• [[<svg xmlns="http://www.w3.org/2000/svg">]]: الـ root، والـ namespace لازم لما الملف يبقى لوحده (درس xmlns).
• [[viewBox="0 0 100 100"]]: نظام الإحداثيات: الرسمة مرسومة في مربع ١٠٠×١٠٠ وحدة، وبتتمط لأي مقاس. أهم attribute: من غيره الأيقونة مش هتكبر وتصغر صح.
• [[width]] و [[height]]: المقاس الافتراضي.
• الأشكال: [[<circle cx cy r>]] و [[<rect x y width height rx>]] و [[<line>]] و [[<polygon>]] و [[<path d="...">]] (أي شكل: [[M]] روح لـ، [[L]] خط لـ، [[v]] خط رأسي، [[C]] منحنى، [[Z]] اقفل).
• [[fill]] (لون الملي) و [[stroke]] (لون الخط) و [[stroke-width]]. و [[fill="currentColor"]] بياخد لون النص من الـ CSS، وده سر الأيقونات اللي بتغيّر لونها مع النص.
• [[<text>]] نص، و [[<title>]] وصف لقارئ الشاشة، و [[<g>]] مجموعة.

بتحطه في الصفحة إزاي:
• [[<img src="logo.svg" alt="...">]]: زي أي صورة (مفيش CSS من بره ولا scripts).
• inline: الكود نفسه جوه الـ HTML، فتقدر تغيّر ألوانه بـ CSS وتحرّكه. React و Vue بيستخدموا ده للأيقونات.
• [[background-image: url(icon.svg)]] في CSS.

الأمان: SVG ممكن يبقى جواه [[<script>]] و links. لو بتسمح لليوزرز يرفعوا SVG وبتعرضه من نفس الدومين، ده XSS. اعرضه بـ [[<img>]] بس، أو نضّفه (DOMPurify)، أو امنع SVG في الرفع.

والسيرفر لازم يبعته بـ [[Content-Type: image/svg+xml]] (درس MIME). ولتصغيره: SVGO ([[npx svgo logo.svg]]).`,
          example: R`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <title>لوجو الجيم</title>
  <circle cx="50" cy="50" r="45" fill="#e11d48"/>
  <rect x="25" y="45" width="50" height="10" rx="3" fill="white"/>
  <path d="M20 40 v20 M80 40 v20" stroke="white" stroke-width="8" stroke-linecap="round"/>
  <text x="50" y="85" font-size="12" text-anchor="middle" fill="white">GYM</text>
</svg>`,
          flag: "script",
          try: R`احفظ المثال في [[logo.svg]] وافتحه في المتصفح، وكبّر الصفحة ([[Ctrl +]]) لحد 500٪: الحواف فضلت حادة؟ غيّر [[#e11d48]] لـ [[#2563eb]] واحفظ واعمل refresh. شيل [[viewBox]] وحطه في [[<img src="logo.svg" width="300">]] وقارن. وبعدين [[npx svgo logo.svg -o logo.min.svg]] وافتح الناتج.`,
          deep: {
            why: R`اللوجو والأيقونات لازم يبانوا حادين على شاشة موبايل 3x وعلى بانر كبير. لو PNG هتحتاج كذا نسخة بمقاسات مختلفة، والـ SVG ملف واحد صغير لكل المقاسات، وكمان ممكن يتلوّن ويتحرّك بالـ CSS.`,
            how: R`المتصفح بيقرا الـ XML ويحوّل كل شكل لمسارات رياضية، وبعدين بيحسب البكسلات وقت العرض على حسب المقاس الحقيقي على الشاشة. الـ [[viewBox]] بيقول «الإحداثيات اللي في الملف من (0,0) لـ (100,100)»، والمتصفح بيضرب كل حاجة في النسبة بين ده والمقاس المعروض.`,
            when: R`اللوجو والأيقونات والرسومات البسيطة والـ illustrations والـ favicon الحديث. ومش للصور الفوتوغرافية ولا الرسومات المعقدة جدًا (الملف بيبقى ضخم).`,
            mistakes: R`تشيل [[viewBox]] فالأيقونة متتمطش. SVGO نسخة 3 بإعداداته الافتراضية كان بيشيل [[viewBox]] و [[<title>]] (نسخة 4 بقت تسيبهم)، فبص على الناتج قبل ما ترفعه. تنسى [[xmlns]] فالملف لوحده ميتعرضش. وتعرض SVG رفعه يوزر inline من غير تنضيف.`
          },
          teach: R`## المثال: لوجو مرسوم بالكلام

الملف ده مفيهوش ولا بكسل. هو ٦ تعليمات رسم: «دايرة حمرا هنا، مستطيل أبيض هنا، خطين، وكلمة». والمتصفح بيقراهم ويرسم الصورة بأي مقاس. الناتج لوجو جيم: دايرة حمرا جواها شكل دمبل أبيض وتحته كلمة GYM.

---

## ١. نظام الإحداثيات: [[viewBox]]

~~~text
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
~~~

- [[<svg>]]: الـ root، كل الرسمة جواه.
- [[xmlns="http://www.w3.org/2000/svg"]]: الـ namespace (درس xmlns). ده مش رابط بيتفتح، ده «اسم» بيقول إن التاجات دي تاجات SVG. لو الـ SVG جوه HTML المتصفح بيعرف لوحده، بس لو ملف لوحده من غيره مش هيتعرض كصورة.
- [[viewBox="0 0 100 100"]]: ٤ أرقام: أول نقطة (x=0, y=0) فوق على الشمال، والعرض 100، والطول 100. يعني الرسام بيرسم على ورقة ١٠٠×١٠٠ وحدة. ولاحظ إن [[y]] بيزيد **لتحت** مش لفوق زي الرياضيات.
- [[width="100" height="100"]]: المقاس اللي يتعرض بيه لو محدش قال غير كده. لو عرضته 500، كل وحدة هتبقى ٥ بكسل.

~~~text الورقة
(0,0) ─────────── (100,0)
  │                  │
  │      (50,50)     │
  │                  │
(0,100) ───────── (100,100)
~~~

---

## ٢. [[<title>لوجو الجيم</title>]]

وصف بيقراه قارئ الشاشة للكفيف، وبيظهر كـ tooltip في بعض المتصفحات. مبيترسمش.

---

## ٣. [[<circle cx="50" cy="50" r="45" fill="#e11d48"/>]]

- [[cx]] و [[cy]] (c = center): المركز في نص الورقة بالظبط (50,50).
- [[r]] (radius): نص القطر 45، فالدايرة من 5 لـ 95، وسايبة ٥ وحدات فاضية حواليها.
- [[fill="#e11d48"]]: لون الملي، أحمر بالـ hex (أحمر [[e1]] وأخضر [[1d]] وأزرق [[48]]).
- [[/>]]: التاج بيقفل نفسه. في XML لازم أي تاج يتقفل، والـ [[/]] قبل [[>]] اختصار لـ [[<circle ...></circle>]].

## ٤. [[<rect x="25" y="45" width="50" height="10" rx="3" fill="white"/>]]

مستطيل: الركن الشمال الفوقاني عند (25,45)، عرضه 50 (لحد 75) وطوله 10 (لحد 55). و [[rx="3"]] بيدوّر الحواف بنص قطر 3. ده العصاية بتاعة الدمبل في نص الدايرة.

## ٥. [[<path d="M20 40 v20 M80 40 v20" .../>]]

[[path]] أقوى شكل: [[d]] (data) سلسلة أوامر رسم، كل أمر حرف وبعده أرقام:

| الأمر | معناه | هنا |
|---|---|---|
| [[M20 40]] | Move: ارفع القلم وروح للنقطة (20,40) | بداية الخط الشمال |
| [[v20]] | vertical: خط رأسي طوله 20 لتحت | لحد (20,60) |
| [[M80 40]] | روح لـ (80,40) من غير ما ترسم | بداية الخط اليمين |
| [[v20]] | خط 20 لتحت | لحد (80,60) |

والحرف الصغير ([[v]]) معناه «بالنسبة لمكانك»، والكبير ([[V]]) معناه «لحد الإحداثي ده بالظبط».

- [[stroke="white"]]: لون الخط (الـ path ده خطوط مش شكل مقفول، فـ [[fill]] مالوش لازمة).
- [[stroke-width="8"]]: تخن الخط ٨ وحدات.
- [[stroke-linecap="round"]]: طرف الخط مدوّر بدل ما يبقى مقصوص.

الخطين دول هما التقلين على طرفين الدمبل.

## ٦. [[<text x="50" y="85" font-size="12" text-anchor="middle" fill="white">GYM</text>]]

- [[x="50" y="85"]]: مكان النص. و [[y]] هنا هو الخط اللي الحروف قاعدة عليه (baseline)، مش فوق الحروف.
- [[text-anchor="middle"]]: خلّي [[x]] نص الكلمة مش أولها، فالكلمة تتوسّط.
- [[font-size="12"]]: الحجم بوحدات الـ viewBox.

---

## ٧. جربناه

~~~bash
file logo.svg
wc -c logo.svg
~~~

~~~text الناتج
logo.svg: SVG Scalable Vector Graphics image
422 logo.svg
~~~

[[file]] عرفه من [[<svg]] في أول الملف (هو نص، فمفيش magic bytes). و [[wc -c]] (word count، و [[-c]] = عدد الـ bytes) قال ٤٢٢ byte بس.

ورسمناه (بمكتبة PyMuPDF في Python على ويندوز) مرة بمقاسه ومرة مكبّر ٥ مرات:

| المقاس | حجم الـ PNG الناتج |
|---|---|
| 100×100 | 1829 byte |
| 500×500 | 14645 byte |

الملف الـ SVG هو هو (٤٢٢ byte)، والحواف في الـ 500×500 حادة، لأن الرسمة اتحسبت من جديد على المقاس الكبير، مش بكسلات اتمطت. أما الـ PNG فكل مقاس محتاج ملف لوحده، والكبير أكبر ٨ مرات.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[xmlns]] | يعرّف الملف إنه SVG (لازم لو لوحده) |
| [[viewBox]] | الورقة اللي الإحداثيات محسوبة عليها، وهي سر إنه يكبر ويصغر |
| [[circle]] و [[rect]] و [[path]] و [[text]] | الأشكال |
| [[fill]] و [[stroke]] | لون الملي ولون الخط |
| [[<title>]] | وصف لقارئ الشاشة |`,
          lines: [
            R`الـ root: الـ namespace، ونظام إحداثيات ١٠٠×١٠٠، والمقاس الافتراضي.`,
            R`وصف لقارئ الشاشة.`,
            R`دايرة: المركز (50,50) ونص القطر 45، ومليانة أحمر. و [[/>]] لأنه XML.`,
            R`مستطيل بحواف مدورة ([[rx]]).`,
            R`[[d]]: [[M20 40]] روح للنقطة دي، و [[v20]] خط ٢٠ لتحت، وبعدين نفس الحكاية عند 80.`,
            R`نص في النص ([[text-anchor="middle"]]).`,
            R`قفل الـ root.`
          ],
          sol: R`الـ SVG بيفضل حاد مهما كبّرت، وتغيير اللون بيبان علطول. و [[file logo.svg]] بيقول [[SVG Scalable Vector Graphics image]]، وحجمه 422 byte بس (و PNG 512×512 من نفس اللوجو 15004 byte).

من غير [[viewBox]] و [[width="300"]] على الـ img، الرسمة بتفضل ١٠٠×١٠٠ في زاوية مساحة ٣٠٠ بدل ما تتمط.

و [[npx svgo]] (نسخة 4 الحالية) بيطبع [[0.412 KiB - 5.5% = 0.39 KiB]]، والناتج سطر واحد: [[white]] بقت [[#fff]]، و [[M20 40 v20 M80 40 v20]] بقت [[M20 40v20m60-20v20]]، والـ [[viewBox]] و [[<title>]] فضلوا. أما لو مشروعك على SVGO 3 ([[npx svgo@3]])، هيطبع [[0.412 KiB - 18.7% = 0.335 KiB]] لأنه شال [[viewBox]] و [[<title>]]، فالأيقونة مش هتتمط تاني.`
        },
        {
          cmd: ".mp4 و .webm و .mp3",
          title: "إيه الفرق بين الـ container (mp4 و webm) والـ codec (H.264 و VP9)، وليه الفيديو مش بيشتغل في المتصفح؟",
          desc: R`ملف الفيديو حاجتين:
• الـ container (الصندوق): الصيغة اللي في الامتداد: [[.mp4]] و [[.webm]] و [[.mkv]] و [[.mov]] و [[.avi]]. بيحط جواه مسار فيديو ومسار صوت وترجمة ومعلومات (المدة).
• الـ codec (طريقة الضغط) لكل مسار: فيديو [[H.264]] (أو AVC، الأشهر وكله بيشغّله) و [[H.265]] (أو HEVC، أصغر بس دعمه في المتصفحات ناقص) و [[VP9]] و [[AV1]]. وصوت [[AAC]] و [[Opus]] و [[MP3]].

عشان كده ممكن ملفين [[.mp4]] واحد يشتغل والتاني لأ: الامتداد واحد والـ codec جواه مختلف (فيديو آيفون HEVC مثلًا). ونفس الكلام لـ [[.mkv]]: صندوق المتصفحات مبتدعموش رسميًا.

للويب:
• [[.mp4]] فيه H.264 + AAC: بيشتغل في كل حتة. ده الافتراضي الآمن.
• [[.webm]] فيه VP9 أو AV1 + Opus: أصغر، ومدعوم في كل المتصفحات الحديثة.
• [[<video controls>]] وجواه [[<source src="a.webm" type="video/webm">]] و [[<source src="a.mp4" type="video/mp4">]]: المتصفح ياخد أول واحدة يقدر يشغّلها.
• [[-movflags +faststart]] وانت بتعمل mp4: بيحط الفهرس (moov) في أول الملف، فالفيديو يبدأ قبل ما يتنزّل كله.
• فيديو طويل: متحطوش ملف واحد على سيرفرك. استخدم HLS ([[.m3u8]] وقطع [[.ts]]) عن طريق خدمة (Mux و Cloudflare Stream و YouTube)، لأن فيها جودات متعددة على حسب سرعة النت.

الصوت: [[.mp3]] (قديم ومدعوم في كل حتة)، و [[.m4a]] (AAC في صندوق mp4)، و [[.ogg]] و [[.opus]] (Opus، أحسن جودة لنفس الحجم)، و [[.wav]] (من غير ضغط، ضخم)، و [[.flac]] (lossless).

الأداة اللي بتعمل كل ده: [[ffmpeg]] (و [[ffprobe]] يقولك الملف فيه إيه). أغلب برامج الفيديو والمواقع بتستخدمها من جوه.`,
          example: R`ffprobe -v error -show_entries format=format_name,duration:stream=codec_type,codec_name -of compact clip.mp4
ffmpeg -i clip.mp4 -c:v libvpx-vp9 -crf 35 -b:v 0 -c:a libopus clip.webm
ffmpeg -i clip.mp4 -vn -c:a libmp3lame -b:a 128k sound.mp3
ffmpeg -i input.mov -c:v libx264 -crf 23 -c:a aac -movflags +faststart web.mp4
file clip.mp4 clip.webm sound.mp3`,
          try: R`سطّب ffmpeg ([[sudo apt install ffmpeg]] أو [[brew install ffmpeg]] أو [[winget install ffmpeg]]). اعمل فيديو تجربة ٣ ثواني: [[ffmpeg -f lavfi -i testsrc=duration=3:size=640x360:rate=30 -f lavfi -i sine=frequency=440:duration=3 -c:v libx264 -pix_fmt yuv420p -c:a aac clip.mp4]]، ونفّذ المثال. وجرّب [[ffprobe]] على فيديو من موبايلك وشوف الـ codec. وغيّر امتداد [[clip.webm]] لـ [[fake.mp4]] ونفّذ [[file]] و [[ffprobe]] عليه.`,
          deep: {
            why: R`الفيديو الخام ضخم جدًا (دقيقة 1080p من غير ضغط حوالي ١٠ جيجا)، فالـ codecs بتضغطه مئات المرات. وكل شركة عملت codec وكل نظام دعم مجموعة، فبقى الامتداد مش كفاية تعرف الفيديو هيشتغل ولا لأ.`,
            how: R`الـ codec بيحفظ صورة كاملة كل شوية (keyframe)، وفي النص بيحفظ «اللي اتغير بس» من الصورة اللي قبلها. والـ container بيلف مسارات الفيديو والصوت مع بعض بتوقيتات عشان يفضلوا متزامنين. و [[ffprobe]] بيقرا الـ container ويقولك كل مسار فيه أنهي codec.`,
            when: R`فيديو على موقعك (hero video، شرح منتج)، أو صوت إشعارات، أو تحويل فيديوهات اليوزرز قبل عرضها.`,
            mistakes: R`ترفع فيديو آيفون HEVC [[.mov]] وتغيّر امتداده لـ [[.mp4]] وتستغرب إنه مش شغال في Chrome. فيديو من غير [[faststart]] فميبدأش غير لما يتنزّل كله. فيديو ٢٠٠ ميجا على صفحة الـ home. و [[autoplay]] من غير [[muted]] (المتصفحات بتمنعه).`
          },
          teach: R`## المثال: نسأل الفيديو فيه إيه، وبعدين نحوّله

[[ffprobe]] بيقرا الملف ويقول الـ container والـ codecs، و [[ffmpeg]] بيحوّل من صيغة لصيغة. اتشغّلوا على ويندوز (ffmpeg 9.0.2 من [[winget]]) في Git Bash، على فيديو تجربة ٣ ثواني عملناه بأمر «جرّب»، و [[file]] و [[xxd]] من Git Bash. الأوامر نفسها هي هي على لينكس والماك.

---

## ٠. فيديو التجربة

~~~bash
ffmpeg -f lavfi -i testsrc=duration=3:size=640x360:rate=30 -f lavfi -i sine=frequency=440:duration=3 -c:v libx264 -pix_fmt yuv420p -c:a aac clip.mp4
~~~

- [[-f lavfi]]: الـ input مش ملف، ده «فلتر» بيولّد حاجة. و [[-i]] = input.
- [[testsrc=duration=3:size=640x360:rate=30]]: صورة اختبار ملونة بعدّاد، ٣ ثواني، 640×360، و ٣٠ صورة في الثانية (fps).
- [[sine=frequency=440:duration=3]]: صوت نغمة 440Hz (نوتة لا).
- [[-c:v libx264]]: [[-c]] = codec، و [[:v]] = للفيديو: اضغطه H.264. و [[-c:a aac]]: الصوت AAC.
- [[-pix_fmt yuv420p]]: طريقة تخزين الألوان اللي كل المشغلات بتفهمها. من غيرها ممكن يطلع فيديو مبيشتغلش في المتصفح.

---

## ١. [[ffprobe -v error -show_entries ... -of compact clip.mp4]]

| الحتة | معناها |
|---|---|
| [[-v error]] | [[-v]] = verbosity: متطبعش غير الأخطاء (من غيرها بيطبع معلومات كتير عن نسخته) |
| [[-show_entries format=format_name,duration]] | من معلومات الـ container ([[format]]): اسم الصيغة والمدة |
| [[:stream=codec_type,codec_name]] | ومن كل مسار ([[stream]]): نوعه واسم الـ codec |
| [[-of compact]] | [[-of]] = output format: كل حاجة في سطر بـ [[|]] |

~~~text الناتج
stream|codec_name=h264|codec_type=video
stream|codec_name=aac|codec_type=audio
format|format_name=mov,mp4,m4a,3gp,3g2,mj2|duration=3.000000
~~~

مسارين جوه صندوق واحد: فيديو H.264 وصوت AAC. و [[format_name]] فيه أسامي كتير لأن mp4 و mov و m4a و 3gp كلهم نفس عيلة الصيغة (ISO Base Media)، و ffprobe بيقول اسم العيلة كلها.

---

## ٢. [[ffmpeg -i clip.mp4 -c:v libvpx-vp9 -crf 35 -b:v 0 -c:a libopus clip.webm]]

- [[-c:v libvpx-vp9]]: الفيديو بـ VP9 (المكتبة اسمها libvpx من Google).
- [[-crf 35]]: Constant Rate Factor: جودة ثابتة بدل حجم ثابت. الرقم الأقل = جودة أعلى وملف أكبر. في VP9 من 0 لـ 63.
- [[-b:v 0]]: [[-b]] = bitrate. صفر معناه «متحطش حد للـ bitrate، امشي على الـ crf بس». ده المطلوب في VP9 عشان الـ crf يشتغل لوحده.
- [[-c:a libopus]]: الصوت Opus.
- امتداد الناتج [[.webm]] هو اللي بيخلي ffmpeg يختار الصندوق.

و ffprobe على الناتج:

~~~text الناتج
stream|codec_name=vp9|codec_type=video
stream|codec_name=opus|codec_type=audio
format|format_name=matroska,webm|duration=3.008000
~~~

WebM نسخة مبسطة من صندوق Matroska ([[.mkv]])، عشان كده الاسمين. والمدة 3.008 مش 3: Opus بيشتغل بقطع صوت ثابتة الطول، فآخر قطعة بتكمّل شوية.

---

## ٣. [[ffmpeg -i clip.mp4 -vn -c:a libmp3lame -b:a 128k sound.mp3]]

- [[-vn]] = video none: ارمي الفيديو.
- [[-c:a libmp3lame]]: الصوت MP3 بمكتبة LAME.
- [[-b:a 128k]]: bitrate الصوت 128 kbps (كيلوبت في الثانية). الأعلى = جودة أحسن وحجم أكبر.

---

## ٤. [[ffmpeg -i input.mov -c:v libx264 -crf 23 -c:a aac -movflags +faststart web.mp4]]

ده الأمر اللي هتستخدمه أكتر حاجة: أي فيديو (مثلًا [[.mov]] من آيفون فيه HEVC) لـ mp4 يشتغل في أي متصفح.

- [[-crf 23]]: في x264 المدى من 0 لـ 51، و 23 هو الافتراضي (جودة كويسة).
- [[-movflags +faststart]]: الـ mp4 فيه جزئين كبار: [[moov]] (الفهرس: المدة وأماكن كل frame) و [[mdat]] (الداتا نفسها). ffmpeg بيكتب [[moov]] في الآخر افتراضيًا، فالمتصفح لازم ينزّل الملف كله عشان يلاقيه. [[faststart]] بينقله لأول الملف.

بصّينا جوه الملفين بـ Python على مكان الكلمتين:

~~~text الناتج
clip.mp4 moov at 47425 mdat at 44
web.mp4  moov at 36 mdat at 4684
~~~

في [[clip.mp4]] الفهرس عند الـ byte رقم 47425 (في الآخر)، وفي [[web.mp4]] عند 36 (في الأول). ده كل الفرق.

---

## ٥. [[file clip.mp4 clip.webm sound.mp3]]

~~~text الناتج
clip.mp4:  ISO Media, MP4 Base Media v1 [ISO 14496-12:2003]
clip.webm: WebM
sound.mp3: Audio file with ID3 version 2.4.0, contains: MPEG ADTS, layer III, v1, 128 kbps, 44.1 kHz, Monaural
~~~

- mp4 بيبدأ بـ [[ftyp]] بعد ٤ bytes ([[xxd]] طلّع [[0000 0020 6674 7970 6973 6f6d]] = حجم، و [[ftyp]]، و [[isom]]).
- WebM بيبدأ بـ [[1a 45 df a3]] (بصمة Matroska).
- الـ mp3: [[ID3]] tag (الاسم والفنان) وبعده إطارات MPEG layer III، و 44.1 kHz عدد العينات في الثانية، و [[Monaural]] = قناة واحدة (mono) لأن النغمة كانت mono.

### الأحجام

| الملف | الحجم (byte) |
|---|---|
| [[clip.mp4]] (H.264 + AAC) | 52061 |
| [[clip.webm]] (VP9 + Opus) | 49319 |
| [[sound.mp3]] (صوت بس) | 49047 |
| [[web.mp4]] (H.264 crf 23 + faststart) | 52661 |

فيديو الاختبار بسيط جدًا (ألوان سادة)، فالفيديو نفسه صغير والصوت واخد أغلب الحجم. في فيديو حقيقي الفرق بين H.264 و VP9 بيبان أكتر.

---

## ٦. امتداد كداب

نسخنا [[clip.webm]] باسم [[fake.mp4]]:

~~~text الناتج
fake.mp4: WebM
format|format_name=matroska,webm
~~~

[[file]] و [[ffprobe]] الاتنين بيقروا المحتوى مش الاسم. وده بالظبط اللي بيحصل لما حد يغيّر امتداد فيديو آيفون لـ mp4: الـ codec جواه زي ما هو.

---

## الخلاصة

| | الـ container | الـ codec |
|---|---|---|
| هو إيه | الصندوق: الامتداد | طريقة ضغط كل مسار |
| أمثلة | mp4 و webm و mkv و mov | H.264 و VP9 و AV1 و AAC و Opus |
| تعرفه منين | [[file]] أو [[format_name]] | [[codec_name]] في [[ffprobe]] |
| الآمن للويب | mp4 | H.264 + AAC، ومعاه [[-movflags +faststart]] |`,
          lines: [
            R`[[ffprobe]] بيقول الـ container والمدة وكل مسار بالـ codec بتاعه.`,
            R`حوّل لـ WebM: فيديو VP9 بجودة ثابتة ([[-crf]]) وصوت Opus.`,
            R`استخرج الصوت بس ([[-vn]] من غير فيديو) لـ MP3 بـ 128kbps.`,
            R`حوّل أي فيديو (زي mov من آيفون) لـ mp4 مناسب للويب.`,
            R`[[file]] بيعرف الـ container من البصمة.`
          ],
          sol: R`الناتج الحقيقي على فيديو التجربة:
[[stream|codec_name=h264|codec_type=video]]
[[stream|codec_name=aac|codec_type=audio]]
[[format|format_name=mov,mp4,m4a,3gp,3g2,mj2|duration=3.000000]]
والـ webm: [[codec_name=vp9]] و [[codec_name=opus]] و [[format_name=matroska,webm]].
[[clip.mp4:  ISO Media, MP4 Base Media v1 [ISO 14496-12:2003]]]
[[clip.webm: WebM]]
[[sound.mp3: Audio file with ID3 version 2.4.0, contains: MPEG ADTS, layer III, v1, 128 kbps, 44.1 kHz, Monaural]]

و [[fake.mp4]]: [[file]] بيقول [[WebM]]، و [[ffprobe]] بيقول [[format_name=matroska,webm]]. الامتداد اتغيّر والمحتوى لأ.`
        },
        {
          cmd: ".woff2 و .ttf و .otf",
          title: "ملفات الخطوط ttf و otf و woff2 إيه، وتحط خط عربي في موقعك إزاي؟",
          desc: R`الخط (font) ملف فيه شكل كل حرف (glyph) كمنحنيات، ومعلومات المسافات بين الحروف، وقواعد زي اتصال الحروف العربية (أول ووسط وآخر الكلمة).

• [[.ttf]] (TrueType) و [[.otf]] (OpenType): الصيغ اللي بتسطّبها على الجهاز. OpenType أحدث وفيه مميزات أكتر، وعمليًا الاتنين شغالين في كل حتة.
• [[.woff2]] (Web Open Font Format 2): نفس الخط مضغوط بـ Brotli للويب، أصغر بحوالي ٣٠ لـ ٦٠٪ من ttf. ده اللي تستخدمه في المواقع، وكل المتصفحات بتدعمه.
• [[.woff]]: النسخة الأولى (ضغط أضعف). مبقاش ليه لازمة.
• [[.eot]]: كان لـ Internet Explorer. انساه.
• Variable fonts: ملف واحد فيه كل الأوزان (من 100 لـ 900) بدل ملف لكل وزن.

في الموقع:
[[@font-face { font-family: "Cairo"; src: url("/fonts/cairo.woff2") format("woff2"); font-weight: 400; font-display: swap; }]]
وبعدين [[font-family: "Cairo", system-ui, sans-serif;]].
• [[font-display: swap]]: اعرض النص بخط النظام لحد ما الخط يتحمّل، بدل ما الصفحة تفضل فاضية.
• [[unicode-range]]: حمّل الملف ده بس لو الصفحة فيها حروف من المدى ده (Google Fonts بيقسم الخط ملف للعربي وملف للاتيني).
• أو أسهل: Google Fonts بلينك، أو [[next/font]] في Next.js (بينزّل الخط وقت الـ build ويخدمه من موقعك).

خطوط عربي مجانية كويسة: Cairo و Tajawal و IBM Plex Sans Arabic و Noto Sans Arabic و Almarai (كلهم على Google Fonts برخصة OFL).

الرخصة: الخط برنامج ليه رخصة. خط اشتريته للطباعة غالبًا مش مسموح تحطه على موقع. اتأكد إن الرخصة فيها web embedding.

تصغير الخط (subsetting): لو الموقع إنجليزي بس، شيل الحروف اللي مش محتاجها: [[pyftsubset]] من fonttools بيعمل كده.`,
          example: R`fc-list : family file | head -3
file DejaVuSans.ttf
fonttools ttLib.woff2 compress -o DejaVuSans.woff2 DejaVuSans.ttf
pyftsubset DejaVuSans.ttf --unicodes="U+0020-007E" --flavor=woff2 --output-file=latin.woff2
ls -l DejaVuSans.ttf DejaVuSans.woff2 latin.woff2`,
          try: R`نزّل خط Cairo من Google Fonts (بييجي ttf) وحوّله woff2 ([[pip install fonttools brotli]] وبعدين أمر المثال)، وحطه في صفحة HTML بـ [[@font-face]] وشوف الفرق في العربي. افتح [[F12]] ثم Network وفلتر بـ Font وشوف الملف اتحمّل وحجمه. وعلى لينكس [[fc-list :lang=ar family]] بيعرض الخطوط اللي فيها عربي على جهازك.`,
          deep: {
            why: R`شكل الخط جزء كبير من هوية الموقع، والعربي بالذات خطوط النظام الافتراضية فيه مش حلوة في كل الأجهزة. بس كل ملف خط بيتنزّل قبل ما النص يتعرض بشكله النهائي، فلازم يبقى صغير (woff2، و subset، ووزنين أو تلاتة بس).`,
            how: R`المتصفح بيقرا الـ CSS، ولما يلاقي نص محتاج الخط ده بيطلب ملف الـ woff2 ويفك ضغطه (Brotli) ويرسم الحروف منه. وفي العربي، محرك اسمه HarfBuzz بيستخدم جداول جوه الخط (GSUB) عشان يختار شكل الحرف على حسب مكانه ويوصّله باللي جنبه.`,
            when: R`أي موقع ليه هوية، خصوصًا عربي. ومش محتاج تحمّل خط لو [[system-ui]] كفاية (لوحات التحكم الداخلية مثلًا).`,
            mistakes: R`تحمّل ٨ أوزان من الخط وانت بتستخدم ٢. تستخدم ttf على الويب (أكبر). تنسى [[font-display: swap]] فالنص يختفي ثواني. تحط خط مش مرخّص للويب. وتعمل subset للاتيني بس وموقعك فيه عربي فالعربي يرجع لخط النظام.`
          },
          teach: R`## المثال: من خط ٧٥٠ كيلو لملف ويب ١٤ كيلو

بناخد خط حقيقي (DejaVu Sans)، نتأكد إنه TrueType، نحوّله woff2، وبعدين نعمل نسخة فيها الحروف الإنجليزية بس، ونقارن الأحجام. اتشغّل في [[docker run --rm ubuntu:24.04]] بعد ما سطّبنا [[fonts-dejavu-core]] (الخط) و [[fontconfig]] (فيه [[fc-list]]) و [[fonttools]] و [[python3-brotli]].

> على أوبونتو، حزمة [[python3-fonttools]] لوحدها بتدّيك المكتبة بس من غير الأوامر، فـ [[fonttools]] و [[pyftsubset]] طلعوا [[command not found]]. الأوامر في حزمة [[fonttools]]، أو [[pip install fonttools brotli]].

---

## ١. [[fc-list : family file | head -3]]

- [[fc-list]] (font config list): الخطوط المتسطّبة على لينكس.
- [[:]]: الشرط (pattern). فاضي = كل الخطوط. (و [[:lang=ar]] مثلًا = اللي فيها عربي.)
- [[family file]]: اطبع الخانتين دول بس: اسم العيلة ومكان الملف.

~~~text الناتج
/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf: DejaVu Sans
/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf: DejaVu Sans Mono
/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf: DejaVu Sans
~~~

لاحظ إن العيلة الواحدة ([[DejaVu Sans]]) ليها ملف لكل وزن: عادي و Bold. ده اللي الـ variable fonts بتحله.

---

## ٢. [[file DejaVuSans.ttf]]

~~~text الناتج
DejaVuSans.ttf: TrueType Font data, 20 tables, 1st "FFTM", 26 names, Macintosh
~~~

الخط من جوه **جداول** (tables)، كل جدول ليه اسم ٤ حروف: [[glyf]] (أشكال الحروف كمنحنيات)، و [[cmap]] (أنهي رقم Unicode بيروح لأنهي شكل)، و [[GSUB]] (قواعد استبدال زي أشكال الحرف العربي)، و [[name]] (الاسم والنسخة والرخصة)... و [[FFTM]] جدول بيحطه برنامج FontForge فيه تواريخ. و [[26 names]] عدد السطور في جدول [[name]]. وبصمة TrueType أول ٤ bytes: [[00 01 00 00]].

وقريناه بـ fontTools في Python: فيه 6253 glyph (شكل حرف)، لأن DejaVu بيغطي لاتيني ويوناني وكيريلي وعربي ورموز. واسمه من جدول [[name]]: [[DejaVu Sans]] و [[Version 2.37]].

---

## ٣. [[fonttools ttLib.woff2 compress -o DejaVuSans.woff2 DejaVuSans.ttf]]

- [[fonttools]]: الأمر الرئيسي لمكتبة fontTools.
- [[ttLib.woff2]]: الجزء المسؤول عن woff2 جوه المكتبة.
- [[compress]]: حوّل ttf لـ woff2. (و [[decompress]] العكس.)
- [[-o DejaVuSans.woff2]]: اسم الناتج، وبعده الـ input.

~~~text الناتج
Processing DejaVuSans.ttf => DejaVuSans.woff2
~~~

نفس الجداول بالظبط، بس مضغوطة بـ Brotli، وجدول [[glyf]] بيتعاد ترتيبه بطريقة بتتضغط أحسن. المتصفح بيفكها ويرجع نفس الخط.

---

## ٤. [[pyftsubset DejaVuSans.ttf --unicodes="U+0020-007E" --flavor=woff2 --output-file=latin.woff2]]

- [[pyftsubset]]: اعمل subset، يعني نسخة من الخط فيها حروف معينة بس.
- [[--unicodes="U+0020-007E"]]: الحروف دي. [[U+0020]] هي المسافة و [[U+007E]] هي [[~]]، وبينهم كل حروف لوحة المفاتيح الإنجليزية: [[A-Z]] و [[a-z]] و [[0-9]] والرموز (ده مدى ASCII المطبوع، 95 حرف).
- [[--flavor=woff2]]: احفظ الناتج woff2 علطول.
- [[--output-file=latin.woff2]]: اسم الناتج.

~~~text الناتج
WARNING: FFTM NOT subset; don't know how to subset; dropped
~~~

مش غلط: جدول [[FFTM]] (التواريخ بتاعة FontForge) الأداة متعرفش تقصّه فشالته، ومالوش لازمة للعرض. والناتج فيه 120 glyph بدل 6253 (الـ 95 حرف وأشكال مساعدة زي [[.notdef]] اللي بيظهر مربع لما الحرف مش موجود).

---

## ٥. [[ls -l ...]]: الأحجام

| الملف | الحجم (byte) | بالنسبة للأصل |
|---|---|---|
| [[DejaVuSans.ttf]] | 759720 | ١٠٠٪ |
| [[DejaVuSans.woff2]] | 258720 | حوالي الثلث |
| [[latin.woff2]] | 13680 | أصغر ٥٥ مرة |

وبصمة woff2: [[xxd -l 4]] طلّع [[774f 4632]] = [[wOF2]].

الدرس هنا: الضغط (woff2) بيوفّر الثلثين، بس الـ subset بيوفّر أكتر بكتير لأن أغلب الخط حروف لغات مش هتظهر في موقعك. ولو موقعك عربي، الـ subset لازم يشمل المدى العربي ([[U+0600-06FF]] وأخواته)، وإلا العربي هيرجع لخط النظام.

---

## ٦. بعدين في CSS

~~~text
@font-face {
  font-family: "DejaVu Latin";
  src: url("/fonts/latin.woff2") format("woff2");
  font-display: swap;
}
body { font-family: "DejaVu Latin", system-ui, sans-serif; }
~~~

[[font-family]] جوه [[@font-face]] اسم انت بتختاره، وبتستخدمه بعدين. و [[format("woff2")]] بيقول للمتصفح الصيغة قبل ما ينزّل. و [[font-display: swap]] اعرض النص بخط النظام لحد ما الملف يوصل.

---

## الخلاصة

| الصيغة | البصمة | فين |
|---|---|---|
| [[.ttf]] | [[00 01 00 00]] | تسطيب على الجهاز |
| [[.otf]] | [[OTTO]] | تسطيب على الجهاز |
| [[.woff2]] | [[wOF2]] | الويب (أصغر بالتلت تقريبًا) |
| subset | نفس الصيغة | الويب: الحروف اللي هتستخدمها بس |`,
          lines: [
            R`الخطوط المتسطّبة على الجهاز (لينكس) بأساميها ومكانها.`,
            R`[[file]] بيعرف إنه TrueType.`,
            R`fonttools بيحوّله woff2 (محتاج حزمة brotli).`,
            R`subset: الحروف الإنجليزية والأرقام والرموز بس ([[U+0020]] لـ [[U+007E]]).`,
            R`قارن الأحجام.`
          ],
          sol: R`الناتج الحقيقي على DejaVu Sans:
[[DejaVuSans.ttf: TrueType Font data, 20 tables, 1st "FFTM", 26 names, Macintosh]]
[[DejaVuSans.ttf]] ← 759720 byte
[[DejaVuSans.woff2]] ← 258720 byte (حوالي الثلث)
[[latin.woff2]] ← 13680 byte (أصغر ٥٥ مرة: الخط الأصلي فيه آلاف الحروف لغات كتير)
وبصمة woff2 هي [[wOF2]]، و ttf بيبدأ بـ [[00 01 00 00]].

[[pyftsubset]] ممكن يطبع تحذير زي [[WARNING: FFTM NOT subset; don't know how to subset; dropped]]: جدول معلومات مش مهم، عادي.`
        }
      ]
    }
]);
