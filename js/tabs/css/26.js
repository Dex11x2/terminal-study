// الفورم: باقي الحقول وإرسال البيانات (وحدة من منهج syllabus/css.json)
// كل القياسات والمعاينات في الوحدة دي من Chrome 157 headless على Windows 11. الطلبات (GET و POST و multipart) اتبعتت من Chrome لسيرفر Node محلي (127.0.0.1) بيكتب الطلب اللي وصله زي ما هو.
// كيبورد الموبايل، وشكل الحقول في المتصفحات التانية، ونطق قارئ الشاشة: من MDN، ومكتوب جنب كل واحدة.
MORE("css", [
    {
      t: "الفورم: باقي الحقول وإرسال البيانات",
      l: 1,
      n: "الفورم بيبعت إيه بالظبط وبأنهي شكل، وباقي أنواع الحقول وحالاتها، ورفع الملفات، والاقتراحات والنتايج والشرايط، وأزرار الفورم",
      pre: [
        { to: "css/form و label", why: R`الوحدة دي بتكمّل عليه: هناك عرفت [[<form>]] و [[<label>]] و [[name]] و [[required]]، وهنا هتعرف الطلب اللي بيخرج وباقي الحقول` },
        { to: "css/fieldset و radio", why: R`الـ radio والـ checkbox والـ [[<select>]] و [[FormData]] اتشرحوا هناك، وهنا بنكمّل حالاتهم ([[checked]] و [[selected]] و [[disabled]])` }
      ],
      goal: [
        R`تقرا أي طلب فورم (GET أو POST أو multipart) وتعرف منه الفورم اللي بعته، وتختار [[method]] و [[enctype]] و [[action]] الصح لأي فورم.`,
        R`تختار النوع المناسب من الـ 22 نوع بتوع [[<input>]] لأي بيانات، وتعرف كل نوع بيبعت قيمته بأنهي شكل، ومين فيهم محتاج بديل.`,
        R`تبني فورم رفع ملفات شغال: [[type="file"]] و [[accept]] و [[multiple]] و [[multipart/form-data]]، وتعرف إيه اللي الـ HTML مبيحميش منه.`,
        R`تفرّق بين [[readonly]] و [[disabled]] من اللي بيتبعت، وتظبط الحالة الأولى بـ [[checked]] و [[selected]]، وتقسّم قايمة بـ [[<optgroup>]].`,
        R`تزوّد اقتراحات بـ [[<datalist>]]، وتعرض نتيجة بـ [[<output>]]، وتختار بين [[<progress>]] و [[<meter>]] وتلوّن المقياس بـ [[low]] و [[high]] و [[optimum]].`,
        R`تحط أكتر من زرار في فورم واحد: كل زرار بعنوانه ([[formaction]])، وزرار مسودة بيعدّي من الفحص ([[formnovalidate]])، وزرار برّه الفورم ([[form]])، من غير ما زرار عادي يبعت الفورم بالغلط.`
      ],
      projects: [
        { lvl: 'صغير', dir: "club-join", t: R`اشتراك عضو جديد: فورم وصفحة «طلبك وصل»`, what: R`أول صفحتين في موقع «نادي الموج» (نادي رياضي متخيل)، للي عايز يشترك. [[index.html]] فيها: اسم النادي في [[<header>]]، وعنوان «اشتراك عضو جديد»، وفورم بيبعت [[post]] لـ [[thanks.html]] وجواه حقل مخفي بيقول إن الباقة [[basic]]، وحقل الاسم، وحقل الموبايل ([[type="tel"]])، والاتنين إجباريين وليهم label و [[autocomplete]]، وزرار [[type="submit"]]. و [[thanks.html]] فيها «طلبك وصل» ولينك يرجّع للرئيسية. من درس «GET و POST و enctype»، والحقول من «form و label».`, done: R`الإرسال الفاضي بيقف عند الاسم. وبعد ما تملا وتدوس «اشترك» بتتفتح [[thanks.html]] والعنوان **مفيهوش** بيانات (لأنه POST). ولو غيّرت [[post]] لـ [[get]] مؤقتًا، العنوان بيبقى آخره [[?plan=basic&name=...&phone=...]]: تلات حقول منهم واحد مكتبتوش.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>اشتراك عضو جديد | نادي الموج</title>
</head>
<body>
<header>
  <p><strong>نادي الموج</strong></p>
</header>
<main>
  <h1>اشتراك عضو جديد</h1>
  <form action="thanks.html" method="post">
    <input type="hidden" name="plan" value="basic">
    <p><label for="name">الاسم بالكامل</label><br>
    <input id="name" name="name" autocomplete="name" required></p>
    <p><label for="phone">الموبايل</label><br>
    <input id="phone" name="phone" type="tel" autocomplete="tel" required></p>
    <button type="submit">اشترك</button>
  </form>
</main>
</body>
</html>
~~~

~~~live 148 thanks.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>طلبك وصل | نادي الموج</title>
</head>
<body>
<main>
  <h1>طلبك وصل</h1>
  <p>هنكلمك على الموبايل خلال يومين عشان نأكد الاشتراك.</p>
  <p><a href="index.html">ارجع للرئيسية</a></p>
</main>
</body>
</html>
~~~

~~~view 295 شكل index.html (الإرسال هنا بيتكتب تحت بدل ما يفتح thanks.html)
<header>
  <p><strong>نادي الموج</strong></p>
</header>
<main>
  <h1>اشتراك عضو جديد</h1>
  <form onsubmit="event.preventDefault(); sent.value = decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
    <input type="hidden" name="plan" value="basic">
    <p><label for="name">الاسم بالكامل</label><br>
    <input id="name" name="name" autocomplete="name" required></p>
    <p><label for="phone">الموبايل</label><br>
    <input id="phone" name="phone" type="tel" autocomplete="tel" required></p>
    <button type="submit">اشترك</button>
  </form>
  <p>اللي كان هيتبعت: <output id="sent">(لسه)</output></p>
</main>
~~~

**هتشوف إيه:**

- حقلين وزرار. الحقل المخفي ملوش أثر في الصفحة.
- «اشترك» والحقول فاضية: رسالة المتصفح عند الاسم.
- بعد ما تملا: الناتج أوله [[plan=basic]].

**ليه كده:**

- [[method="post"]]: فيه اسم وموبايل، والطلب بيعمل اشتراك. الاتنين سبب كفاية.
- [[action="thanks.html"]]: مسار نسبي لملف جنب الصفحة (درس «المسارات: مطلق ونسبي»). الصفحة الثابتة مبتقراش البيانات، بس الزائر بيتنقل لصفحة حقيقية بتقوله إيه اللي هيحصل.
- الباقة في hidden لأن الصفحة دي بتاعة الباقة الأساسية بس، والزائر مش هيختار.

**الغلطة الشائعة:** تنسى [[name]] على حقل الموبايل لأن عليه [[id]] و [[type]]. الفورم هيتبعت والموبايل مش فيه.

**ملحوظة عن النشر:** بدبل كليك على الملف، POST لـ [[thanks.html]] بيفتحها عادي. على استضافة ملفات ثابتة، السيرفر غالبًا بيرفض POST لملف HTML. ده مش غلط في الفورم: POST محتاج كود على السيرفر يستقبله، وده في كورسات الباك إند.

~~~text القياس من Chrome (نفس الفورم على السيرفر المحلي)
POST /thanks.html
content-type: application/x-www-form-urlencoded

plan=basic&name=%D9%85%D9%86%D9%89+%D8%B9%D9%84%D9%8A&phone=01012345678
~~~` },
        { lvl: 'صغير', dir: "club-join", cont: true, t: R`كل حقل بالنوع بتاعه`, what: R`زي المشروع اللي فات (نفس [[index.html]])، وزوّد على الفورم خمس حقول، كل واحد بالنوع المناسب: اللعبة (قايمة [[<select>]] متقسّمة بـ [[<optgroup>]] لـ «ألعاب مية» و «ألعاب صالة»، وبتبدأ على «سباحة»)، والمدينة (خانة نص باقتراحات [[<datalist>]])، ومستواك من ١ لـ ٥ (شريط [[range]] ومعاه [[<output>]] بيعرض الرقم)، وميعاد التمرين المفضّل ([[time]] من ٩ الصبح لـ ١٠ بالليل وكل نص ساعة)، وشهر بداية الاشتراك ([[month]])، و checkbox «ابعتولي مواعيد البطولات» بيبدأ متعلّم. من دروس «أنواع input كلها» و «readonly و disabled و checked» و «datalist و output».`, done: R`كل حقل ليه label و [[name]]. والقايمة مفتوحة على «سباحة» وتحت عنوانين. وسحب الشريط بيغيّر الرقم اللي جنبه. والميعاد [[18:10]] بيترفض. والإرسال من غير ما تلمس الجديد بيبعت [[sport=swim]] و [[level=3]] و [[news=on]] ومعاهم [[time=]] و [[start=]] فاضيين.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>اشتراك عضو جديد | نادي الموج</title>
</head>
<body>
<header>
  <p><strong>نادي الموج</strong></p>
</header>
<main>
  <h1>اشتراك عضو جديد</h1>
  <form action="thanks.html" method="post" oninput="shown.value = level.value">
    <input type="hidden" name="plan" value="basic">
    <p><label for="name">الاسم بالكامل</label><br>
    <input id="name" name="name" autocomplete="name" required></p>
    <p><label for="phone">الموبايل</label><br>
    <input id="phone" name="phone" type="tel" autocomplete="tel" required></p>
    <p><label for="sport">اللعبة</label><br>
    <select id="sport" name="sport">
      <optgroup label="ألعاب مية">
        <option value="swim" selected>سباحة</option>
        <option value="polo">كرة ماء</option>
      </optgroup>
      <optgroup label="ألعاب صالة">
        <option value="basket">سلة</option>
        <option value="judo">جودو</option>
      </optgroup>
    </select></p>
    <p><label for="city">المدينة</label><br>
    <input id="city" name="city" list="cities" autocomplete="address-level2">
    <datalist id="cities">
      <option value="طنطا"></option>
      <option value="المنصورة"></option>
      <option value="أسوان"></option>
    </datalist></p>
    <p><label for="level">مستواك (١ مبتدئ، ٥ محترف)</label><br>
    <input id="level" name="level" type="range" min="1" max="5" value="3">
    <output id="shown" for="level">3</output></p>
    <p><label for="time">ميعاد التمرين المفضّل (من ٩ ص لـ ١٠ م)</label><br>
    <input id="time" name="time" type="time" min="09:00" max="22:00" step="1800"></p>
    <p><label for="start">شهر بداية الاشتراك</label><br>
    <input id="start" name="start" type="month"></p>
    <p><input id="news" name="news" type="checkbox" checked>
    <label for="news">ابعتولي مواعيد البطولات</label></p>
    <button type="submit">اشترك</button>
  </form>
</main>
</body>
</html>
~~~

~~~view 626 شكل index.html (الإرسال هنا بيتكتب تحت)
<header>
  <p><strong>نادي الموج</strong></p>
</header>
<main>
  <h1>اشتراك عضو جديد</h1>
  <form oninput="shown.value = level.value" onsubmit="event.preventDefault(); sent.value = decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
    <input type="hidden" name="plan" value="basic">
    <p><label for="name">الاسم بالكامل</label><br>
    <input id="name" name="name" autocomplete="name" required value="منى علي"></p>
    <p><label for="phone">الموبايل</label><br>
    <input id="phone" name="phone" type="tel" autocomplete="tel" required value="01012345678"></p>
    <p><label for="sport">اللعبة</label><br>
    <select id="sport" name="sport">
      <optgroup label="ألعاب مية">
        <option value="swim" selected>سباحة</option>
        <option value="polo">كرة ماء</option>
      </optgroup>
      <optgroup label="ألعاب صالة">
        <option value="basket">سلة</option>
        <option value="judo">جودو</option>
      </optgroup>
    </select></p>
    <p><label for="city">المدينة</label><br>
    <input id="city" name="city" list="cities" autocomplete="address-level2">
    <datalist id="cities">
      <option value="طنطا"></option>
      <option value="المنصورة"></option>
      <option value="أسوان"></option>
    </datalist></p>
    <p><label for="level">مستواك (١ مبتدئ، ٥ محترف)</label><br>
    <input id="level" name="level" type="range" min="1" max="5" value="3">
    <output id="shown" for="level">3</output></p>
    <p><label for="time">ميعاد التمرين المفضّل (من ٩ ص لـ ١٠ م)</label><br>
    <input id="time" name="time" type="time" min="09:00" max="22:00" step="1800"></p>
    <p><label for="start">شهر بداية الاشتراك</label><br>
    <input id="start" name="start" type="month"></p>
    <p><input id="news" name="news" type="checkbox" checked>
    <label for="news">ابعتولي مواعيد البطولات</label></p>
    <button type="submit">اشترك</button>
  </form>
  <p>اللي كان هيتبعت: <output id="sent">(لسه)</output></p>
</main>
~~~

**هتشوف إيه:**

- الفورم طوّل: قايمة، وخانة باقتراحات، وشريط جنبه رقم، وحقل ساعة، وحقل شهر، ومربع متعلّم.
- دوس «اشترك» من غير ما تلمس الجديد: [[plan=basic&name=...&phone=...&sport=swim&city=&level=3&time=&start=&news=on]].
- اللي ليه قيمة أولى اتبعت بيها ([[sport]] و [[level]] و [[news]])، واللي ملوش اتبعت فاضي.

**ليه كده:**

- اللعبة [[<select>]] لأن القايمة مقفولة (النادي فيه ٤ ألعاب بس). المدينة [[<datalist>]] لأن أي مدينة مقبولة.
- [[value]] بتاع كل [[<option>]] إنجليزي قصيّر، والكلام المعروض عربي.
- الـ [[<output>]] بيبدأ بـ ٣ زي الشريط، وسطر [[oninput]] على الفورم بينسخ القيمة.
- [[step="1800"]] بالثواني: نص ساعة.
- «مواعيد البطولات» معلومة مفيدة ومش إعلان، فمقبول تبدأ متعلّمة. لو كانت «عروض الشركاء» كانت لازم تبدأ فاضية.

**الغلطة الشائعة:** [[<output>]] من غير قيمة أولى. الشريط هيبان عند ٣ والرقم جنبه فاضي لحد أول سحبة.

~~~text القياس من Chrome (الطلب اللي وصل السيرفر المحلي، من غير لمس الحقول الجديدة)
plan=basic&name=%D9%85%D9%86%D9%89+%D8%B9%D9%84%D9%8A&phone=01012345678&sport=swim&city=&level=3&time=&start=&news=on
~~~` },
        { lvl: 'متوسط', dir: "club-join", cont: true, t: R`المستندات، وزرار «احفظ كمسودة»`, what: R`زي المشروع اللي فات، وزوّد على نفس الفورم حاجتين. **الملفات:** حقل «صورة شخصية» (صورة واحدة، إجباري، JPG أو PNG) وحقل «صور البطاقة» (أكتر من ملف، صور أو PDF)، وكل label فيه النوع وأقصى حجم، والفورم يبقى شكله صح للملفات. **الأزرار:** «اشترك» (الأساسي، بيبعت [[act=send]])، و «احفظ كمسودة» (بيبعت [[act=draft]] لصفحة جديدة [[draft.html]] ومن غير فحص)، و «إلغاء» (مبيبعتش). من دروس «file و accept و multiple» و «أزرار الفورم: formaction وإخواته».`, done: R`الفورم [[post]] و [[multipart/form-data]]. و «اشترك» من غير صورة شخصية بيقف عند حقلها. و «احفظ كمسودة» والفورم فاضي بيفتح [[draft.html]]. و «إلغاء» مبيعملش أي تنقّل. و Enter جوه خانة الاسم بيتصرف زي «اشترك».`, sol: R`الجديد على [[index.html]] بتاع المشروع اللي فات: [[enctype]] على الفورم، وحقلين الملفات قبل الـ checkbox، والتلات أزرار. الملف كامل:

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>اشتراك عضو جديد | نادي الموج</title>
</head>
<body>
<header>
  <p><strong>نادي الموج</strong></p>
</header>
<main>
  <h1>اشتراك عضو جديد</h1>
  <form action="thanks.html" method="post" enctype="multipart/form-data" oninput="shown.value = level.value">
    <input type="hidden" name="plan" value="basic">
    <p><label for="name">الاسم بالكامل</label><br>
    <input id="name" name="name" autocomplete="name" required></p>
    <p><label for="phone">الموبايل</label><br>
    <input id="phone" name="phone" type="tel" autocomplete="tel" required></p>
    <p><label for="sport">اللعبة</label><br>
    <select id="sport" name="sport">
      <optgroup label="ألعاب مية">
        <option value="swim" selected>سباحة</option>
        <option value="polo">كرة ماء</option>
      </optgroup>
      <optgroup label="ألعاب صالة">
        <option value="basket">سلة</option>
        <option value="judo">جودو</option>
      </optgroup>
    </select></p>
    <p><label for="city">المدينة</label><br>
    <input id="city" name="city" list="cities" autocomplete="address-level2">
    <datalist id="cities">
      <option value="طنطا"></option>
      <option value="المنصورة"></option>
      <option value="أسوان"></option>
    </datalist></p>
    <p><label for="level">مستواك (١ مبتدئ، ٥ محترف)</label><br>
    <input id="level" name="level" type="range" min="1" max="5" value="3">
    <output id="shown" for="level">3</output></p>
    <p><label for="time">ميعاد التمرين المفضّل (من ٩ ص لـ ١٠ م)</label><br>
    <input id="time" name="time" type="time" min="09:00" max="22:00" step="1800"></p>
    <p><label for="start">شهر بداية الاشتراك</label><br>
    <input id="start" name="start" type="month"></p>
    <p><label for="photo">صورة شخصية (JPG أو PNG، أقصى حجم ٢ ميجا)</label><br>
    <input id="photo" name="photo" type="file" accept="image/jpeg, image/png" required></p>
    <p><label for="docs">صور البطاقة: الوش والضهر (صور أو PDF، أقصى حجم ٥ ميجا للملف)</label><br>
    <input id="docs" name="docs" type="file" accept="image/*, .pdf" multiple></p>
    <p><input id="news" name="news" type="checkbox" checked>
    <label for="news">ابعتولي مواعيد البطولات</label></p>
    <button type="submit" name="act" value="send">اشترك</button>
    <button type="submit" name="act" value="draft" formaction="draft.html" formnovalidate>احفظ كمسودة</button>
    <button type="button">إلغاء</button>
  </form>
</main>
</body>
</html>
~~~

~~~live 148 draft.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>المسودة اتحفظت | نادي الموج</title>
</head>
<body>
<main>
  <h1>المسودة اتحفظت</h1>
  <p>تقدر تكمّل الطلب في أي وقت خلال أسبوع.</p>
  <p><a href="index.html">كمّل الطلب</a></p>
</main>
</body>
</html>
~~~

~~~view 197 215 الجزء الجديد من الفورم (الإرسال هنا بيتكتب تحت)
<form action="thanks.html" onsubmit="event.preventDefault(); sent.value = (event.submitter.getAttribute('formaction') || this.getAttribute('action')) + ' ← ' + Array.from(new FormData(this, event.submitter), p => p[0] + '=' + (p[1].name === undefined ? p[1] : 'ملف «' + p[1].name + '»')).join(' & ')">
  <p><label for="photo">صورة شخصية (JPG أو PNG، أقصى حجم ٢ ميجا)</label><br>
  <input id="photo" name="photo" type="file" accept="image/jpeg, image/png" required></p>
  <p><label for="docs">صور البطاقة: الوش والضهر (صور أو PDF، أقصى حجم ٥ ميجا للملف)</label><br>
  <input id="docs" name="docs" type="file" accept="image/*, .pdf" multiple></p>
  <button type="submit" name="act" value="send">اشترك</button>
  <button type="submit" name="act" value="draft" formaction="draft.html" formnovalidate>احفظ كمسودة</button>
  <button type="button">إلغاء</button>
</form>
<p>الطلب: <output id="sent">(لسه)</output></p>
~~~

(سطر المعاينة هنا متغيّر شوية عشان يكتب العنوان اللي الزرار كان هيبعتله، ويكتب اسم كل ملف بدل محتواه.)

**هتشوف إيه:**

- «اشترك» من غير صورة شخصية: رسالة «Please select a file.» عند الحقل.
- «احفظ كمسودة» والحقول فاضية: [[draft.html ← photo=ملف «» & docs=ملف «» & act=draft]]. الحقلين اتبعتوا فاضيين، والفحص معدّاش عليهم.
- «إلغاء»: ولا حاجة.

**ليه كده:**

- [[enctype="multipart/form-data"]] على الفورم: من غيره أسامي الملفات بس اللي هتتبعت. وهو على الفورم مش على زرار، فالمسودة كمان بتبعت الملفات المختارة.
- حقلين مش حقل واحد [[multiple]]: الصورة الشخصية حاجة والبطاقة حاجة، والسيرفر بيفرّق بالاسم.
- «اشترك» أول زرار في الكود: هو اللي Enter بيدوس عليه.
- «احفظ كمسودة» عليه [[formnovalidate]]: اللي بيحفظ مسودة لسه مخلّصش، فمينفعش نطلب منه كل الإجباري.
- «إلغاء» [[type="button"]]: من غيرها كان هيبعت الفورم.

**الغلطة الشائعة:** [[formenctype]] على زرار «اشترك» بس «عشان هو اللي بيرفع». المسودة ساعتها هتبعت أسامي الملفات من غير محتواها، والعضو هيفتكر صوره اتحفظت.

~~~text القياس من Chrome (الطلبات اللي وصلت السيرفر المحلي)
«احفظ كمسودة» والفورم فاضي:
POST /draft.html
content-type: multipart/form-data; boundary=----WebKitFormBoundary...
(كل الحقول في أجزاء، وآخر جزء: name="act" وقيمته draft)

«اشترك» من غير صورة شخصية:   ولا طلب
«إلغاء»:                      ولا طلب
~~~` },
        { lvl: 'متوسط', dir: "club-join", cont: true, t: R`الفورم على ٣ خطوات، وشريط «الخطوة ٢ من ٣»`, what: R`الفورم بقى طويل (١١ حقل). قسّمه على تلات صفحات، وفي أول كل صفحة [[<progress>]] و label بيقولوا الزائر في أنهي خطوة. [[step1.html]] «بياناتك» (الاسم والموبايل والمدينة)، و [[step2.html]] «اللعبة والمواعيد» (اللعبة والمستوى والميعاد وشهر البداية)، و [[step3.html]] «المستندات» (الملفات والـ checkbox). كل صفحة فورم لوحده بيبعت للي بعدها، والأخيرة لـ [[thanks.html]]. وفي الخطوة ٢ و ٣ زرار «رجوع» بيرجّع للصفحة اللي قبلها **من غير فحص**. و [[index.html]] تبقى صفحة قصيّرة فيها لينك «ابدأ الاشتراك». الحقول نفسها من المشروعين اللي فاتوا: انقلها زي ما هي. من درس «progress و meter»، وزرار الرجوع من «أزرار الفورم: formaction وإخواته».`, done: R`كل صفحة فيها شريط قيمته رقم الخطوة من ٣، و label فيه «الخطوة كذا من ٣» واسمها. و «التالي» بيفحص حقول صفحته بس. و «رجوع» بيرجّع حتى لو الصفحة فيها إجباري فاضي. و «التالي» هو أول زرار في الكود في كل صفحة.`, sol: R`**ترتيب الشغل:** انسخ [[index.html]] القديم تلات مرات بأسامي [[step1.html]] و [[step2.html]] و [[step3.html]]، وامسح من كل نسخة الحقول اللي مش بتاعتها، وزوّد الشريط والأزرار. وبعدين قصّر [[index.html]].

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>نادي الموج</title>
</head>
<body>
<header>
  <p><strong>نادي الموج</strong></p>
</header>
<main>
  <h1>اشترك في نادي الموج</h1>
  <p>الاشتراك ٣ خطوات: بياناتك، واللعبة والمواعيد، والمستندات. جهّز صورة شخصية وصورة البطاقة.</p>
  <p><a href="step1.html">ابدأ الاشتراك</a></p>
</main>
</body>
</html>
~~~

~~~html step1.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الخطوة ١ من ٣: بياناتك | نادي الموج</title>
</head>
<body>
<main>
  <h1>اشتراك عضو جديد</h1>
  <p><label for="step">الخطوة ١ من ٣: بياناتك</label><br>
  <progress id="step" value="1" max="3">١ من ٣</progress></p>
  <form action="step2.html" method="post">
    <input type="hidden" name="plan" value="basic">
    <p><label for="name">الاسم بالكامل</label><br>
    <input id="name" name="name" autocomplete="name" required></p>
    <p><label for="phone">الموبايل</label><br>
    <input id="phone" name="phone" type="tel" autocomplete="tel" required></p>
    <p><label for="city">المدينة</label><br>
    <input id="city" name="city" list="cities" autocomplete="address-level2">
    <datalist id="cities">
      <option value="طنطا"></option>
      <option value="المنصورة"></option>
      <option value="أسوان"></option>
    </datalist></p>
    <button type="submit">التالي</button>
  </form>
</main>
</body>
</html>
~~~

~~~html step2.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الخطوة ٢ من ٣: اللعبة والمواعيد | نادي الموج</title>
</head>
<body>
<main>
  <h1>اشتراك عضو جديد</h1>
  <p><label for="step">الخطوة ٢ من ٣: اللعبة والمواعيد</label><br>
  <progress id="step" value="2" max="3">٢ من ٣</progress></p>
  <form action="step3.html" method="post" oninput="shown.value = level.value">
    <p><label for="sport">اللعبة</label><br>
    <select id="sport" name="sport">
      <optgroup label="ألعاب مية">
        <option value="swim" selected>سباحة</option>
        <option value="polo">كرة ماء</option>
      </optgroup>
      <optgroup label="ألعاب صالة">
        <option value="basket">سلة</option>
        <option value="judo">جودو</option>
      </optgroup>
    </select></p>
    <p><label for="level">مستواك (١ مبتدئ، ٥ محترف)</label><br>
    <input id="level" name="level" type="range" min="1" max="5" value="3">
    <output id="shown" for="level">3</output></p>
    <p><label for="time">ميعاد التمرين المفضّل (من ٩ ص لـ ١٠ م)</label><br>
    <input id="time" name="time" type="time" min="09:00" max="22:00" step="1800" required></p>
    <p><label for="start">شهر بداية الاشتراك</label><br>
    <input id="start" name="start" type="month"></p>
    <button type="submit">التالي</button>
    <button type="submit" formaction="step1.html" formnovalidate>رجوع</button>
  </form>
</main>
</body>
</html>
~~~

~~~html step3.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الخطوة ٣ من ٣: المستندات | نادي الموج</title>
</head>
<body>
<main>
  <h1>اشتراك عضو جديد</h1>
  <p><label for="step">الخطوة ٣ من ٣: المستندات</label><br>
  <progress id="step" value="3" max="3">٣ من ٣</progress></p>
  <form action="thanks.html" method="post" enctype="multipart/form-data">
    <p><label for="photo">صورة شخصية (JPG أو PNG، أقصى حجم ٢ ميجا)</label><br>
    <input id="photo" name="photo" type="file" accept="image/jpeg, image/png" required></p>
    <p><label for="docs">صور البطاقة: الوش والضهر (صور أو PDF، أقصى حجم ٥ ميجا للملف)</label><br>
    <input id="docs" name="docs" type="file" accept="image/*, .pdf" multiple></p>
    <p><input id="news" name="news" type="checkbox" checked>
    <label for="news">ابعتولي مواعيد البطولات</label></p>
    <button type="submit" name="act" value="send">اشترك</button>
    <button type="submit" formaction="step2.html" formnovalidate>رجوع</button>
  </form>
</main>
</body>
</html>
~~~

~~~view 425 شكل step2.html (الأزرار هنا بتكتب تحت بدل ما تتنقّل)
<main>
  <h1>اشتراك عضو جديد</h1>
  <p><label for="step">الخطوة ٢ من ٣: اللعبة والمواعيد</label><br>
  <progress id="step" value="2" max="3">٢ من ٣</progress></p>
  <form action="step3.html" oninput="shown.value = level.value" onsubmit="event.preventDefault(); sent.value = 'هيفتح ' + (event.submitter.getAttribute('formaction') || this.getAttribute('action'))">
    <p><label for="sport">اللعبة</label><br>
    <select id="sport" name="sport">
      <optgroup label="ألعاب مية">
        <option value="swim" selected>سباحة</option>
        <option value="polo">كرة ماء</option>
      </optgroup>
      <optgroup label="ألعاب صالة">
        <option value="basket">سلة</option>
        <option value="judo">جودو</option>
      </optgroup>
    </select></p>
    <p><label for="level">مستواك (١ مبتدئ، ٥ محترف)</label><br>
    <input id="level" name="level" type="range" min="1" max="5" value="3">
    <output id="shown" for="level">3</output></p>
    <p><label for="time">ميعاد التمرين المفضّل (من ٩ ص لـ ١٠ م)</label><br>
    <input id="time" name="time" type="time" min="09:00" max="22:00" step="1800" required></p>
    <p><label for="start">شهر بداية الاشتراك</label><br>
    <input id="start" name="start" type="month"></p>
    <button type="submit">التالي</button>
    <button type="submit" formaction="step1.html" formnovalidate>رجوع</button>
  </form>
  <p><output id="sent">(دوس زرار)</output></p>
</main>
~~~

**هتشوف إيه:**

- شريط مليان تلتينه، وفوقه «الخطوة ٢ من ٣: اللعبة والمواعيد».
- «التالي» والميعاد فاضي: رسالة المتصفح عند الميعاد (بقى [[required]] في النسخة دي).
- «رجوع» والميعاد فاضي: «هيفتح step1.html». عدّى من غير فحص.

**ليه كده:**

- الشريط قيمته ثابتة في كل ملف (١ و ٢ و ٣): مفيش JavaScript. و [[max="3"]] في التلاتة.
- الرقم مكتوب في الـ label وفي [[<title>]]: الشريط لوحده مبيقولش «٢ من ٣»، وعنوان التاب بيفرق مع اللي فاتح كذا تاب.
- [[enctype]] في الخطوة ٣ بس: هي الوحيدة اللي فيها ملفات.
- «رجوع» زرار إرسال بـ [[formaction]] و [[formnovalidate]]، مش لينك: في موقع حقيقي السيرفر بيحفظ اللي اتكتب في الصفحة قبل ما يرجّع. و «التالي» قبله في الكود عشان Enter.
- الحقل المخفي [[plan]] في الخطوة ١ بس.

**اللي ناقص ومش من شغل الـ HTML:** البيانات مبتتنقلش من صفحة للي بعدها. كل صفحة بتبعت حقولها وبس، وصفحة ثابتة مبتحفظش حاجة. في موقع حقيقي السيرفر بيحفظ كل خطوة عنده (أو بيرجّعها في حقول hidden في الصفحة الجاية). الهيكل اللي بنيته هو نفسه اللي السيرفر هيشتغل عليه.

**الغلطة الشائعة:** «رجوع» من غير [[formnovalidate]]. الزائر اللي عايز يرجع يصلّح اسمه هيتحبس لحد ما يملا الصفحة الحالية.

~~~text القياس من Chrome
step1:  progress.position = 0.333…     step2: 0.666…     step3: 1
step2 والميعاد فاضي:   «التالي» ← ولا طلب      «رجوع» ← POST /step1.html
~~~` },
        { lvl: 'كبير', dir: "club-join", cont: true, t: R`بوابة العضو: اشتراك، وتجديد، ولوحة متابعة`, what: R`موقع «نادي الموج» كامل للعضو، بيكمّل على كل اللي بنيته: صفحات الخطوات التلاتة و [[thanks.html]] و [[draft.html]] من المشاريع اللي فاتت **زي ما هم**، وتلات حاجات جديدة. (١) [[index.html]] تبقى الرئيسية: [[<nav>]] فيه لينكات «اشتراك جديد» و «جدّد اشتراكك» و «لوحتي». (٢) [[renew.html]] فورم تجديد لعضو موجود: رقم العضوية [[1042]] يتشاف ويتبعت وميتعدّلش، والباقة الحالية «دهبي» مقفولة بس قيمتها بتتبعت، وكود خصم متعطّل ومكتوب جنبه السبب، وعدد الشهور شريط من ١ لـ ١٢ عليه علامات عند ١ و ٣ و ٦ و ١٢ ومعاه إجمالي بيتحسب (٣٠٠ جنيه للشهر)، وزرارين: «جدّد» و «معاينة الإيصال» (GET لـ [[receipt.html]] في تاب جديدة). (٣) [[dashboard.html]] لوحة العضو: إكمال البيانات (٤ من ٥)، ونسبة الحضور ٨٥٪ (العالي كويس)، والحصص المستخدمة ٩ من ١٠ (القليل كويس)، وكل شريط بالعنصر الصح وليه label فيه الرقم. من كل دروس الوحدة: «readonly و disabled و checked» و «datalist و output» و «progress و meter» و «أزرار الفورم: formaction وإخواته».`, done: R`كل لينكات الـ [[<nav>]] شغالة بدبل كليك. في [[renew.html]]: الإرسال بيبعت [[id=1042]] و [[plan=gold]] و [[months]]، ومبيبعتش [[coupon]] ولا [[total]]. وسحب الشريط بيغيّر الإجمالي. و «معاينة الإيصال» بتفتح تاب جديدة عنوانها فيه البيانات. في [[dashboard.html]]: الحضور أخضر والحصص أحمر، و DevTools بيقول role بتاع كل شريط ([[progressbar]] أو [[meter]]) واسمه. وكل حقل في الموقع ليه label، وكل زرار عليه [[type]].`, ext: R`زوّد في [[renew.html]] حقل «إيصال التحويل» ([[type="file"]]) وخلّي زرار «جدّد» بس هو اللي [[formenctype="multipart/form-data"]]، وقارن الطلبين في Network. وزوّد في [[dashboard.html]] مقياس حرارة حمام السباحة (الوسط كويس).`, sol: R`**شجرة الملفات:**

~~~text club-join
club-join/
  index.html        الرئيسية (اتعدّلت)
  step1.html        من المشروع اللي فات، زي ما هي
  step2.html        زي ما هي
  step3.html        زي ما هي
  thanks.html       زي ما هي
  draft.html        زي ما هي
  renew.html        جديدة
  receipt.html      جديدة
  dashboard.html    جديدة
~~~

**ترتيب البناء:** الرئيسية واللينكات الأول (عشان تتنقّل وانت بتجرّب)، وبعدين [[dashboard.html]] (عرض بس)، وبعدين [[renew.html]] (أصعب واحدة)، وآخر حاجة [[receipt.html]].

~~~live 218 236 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>نادي الموج</title>
</head>
<body>
<header>
  <p><strong>نادي الموج</strong></p>
  <nav aria-label="الرئيسية">
    <ul>
      <li><a href="step1.html">اشتراك جديد</a></li>
      <li><a href="renew.html">جدّد اشتراكك</a></li>
      <li><a href="dashboard.html">لوحتي</a></li>
    </ul>
  </nav>
</header>
<main>
  <h1>أهلًا بيك في نادي الموج</h1>
  <p>سباحة، وكرة ماء، وسلة، وجودو. الاشتراك ٣ خطوات وبياخد ٥ دقايق.</p>
</main>
</body>
</html>
~~~

~~~live 304 dashboard.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>لوحتي | نادي الموج</title>
</head>
<body>
<header>
  <p><a href="index.html">نادي الموج</a></p>
</header>
<main>
  <h1>لوحتي</h1>
  <p><label for="profile">إكمال بياناتك: ٤ من ٥ خطوات</label><br>
  <progress id="profile" value="4" max="5">٤ من ٥</progress></p>
  <p><label for="attend">نسبة حضورك الشهر ده: ٨٥٪ (ممتاز)</label><br>
  <meter id="attend" value="85" min="0" max="100" low="50" high="80" optimum="100">٨٥٪</meter></p>
  <p><label for="used">حصصك المستخدمة: ٩ من ١٠ (قرّبت تخلص)</label><br>
  <meter id="used" value="9" min="0" max="10" low="5" high="8" optimum="0">٩ من ١٠</meter></p>
  <p><a href="renew.html">جدّد اشتراكك</a></p>
</main>
</body>
</html>
~~~

~~~html renew.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>جدّد اشتراكك | نادي الموج</title>
</head>
<body>
<header>
  <p><a href="index.html">نادي الموج</a></p>
</header>
<main>
  <h1>جدّد اشتراكك</h1>
  <form action="thanks.html" method="post" oninput="shown.value = months.value; total.value = Number(months.value) * 300">
    <input type="hidden" name="plan" value="gold">
    <p><label for="id">رقم العضوية</label><br>
    <input id="id" name="id" value="1042" size="6" readonly></p>
    <p><label for="plan">الباقة الحالية (التغيير من الاستقبال)</label><br>
    <select id="plan" disabled>
      <option value="silver">فضي</option>
      <option value="gold" selected>دهبي</option>
    </select></p>
    <p><label for="coupon">كود الخصم (مقفول: عرض نوفمبر خلص)</label><br>
    <input id="coupon" name="coupon" disabled></p>
    <p><label for="months">عدد الشهور (من ١ لـ ١٢)</label><br>
    <input id="months" name="months" type="range" min="1" max="12" value="3" list="marks">
    <datalist id="marks">
      <option value="1"></option>
      <option value="3"></option>
      <option value="6"></option>
      <option value="12"></option>
    </datalist>
    <output id="shown" for="months">3</output> شهور</p>
    <p><label for="total">الإجمالي بالجنيه</label>
    <output id="total" name="total" for="months">900</output></p>
    <button type="submit" name="act" value="renew">جدّد</button>
    <button type="submit" formaction="receipt.html" formmethod="get" formtarget="_blank">معاينة الإيصال</button>
  </form>
</main>
</body>
</html>
~~~

~~~live 132 receipt.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>معاينة الإيصال | نادي الموج</title>
</head>
<body>
<main>
  <h1>معاينة الإيصال</h1>
  <p>بيانات التجديد موجودة في عنوان الصفحة دي (بعد علامة الاستفهام). في موقع حقيقي السيرفر بيقراها ويعرض الإيصال.</p>
</main>
</body>
</html>
~~~

~~~view 410 شكل renew.html (الأزرار هنا بتكتب الطلب تحت)
<main>
  <h1>جدّد اشتراكك</h1>
  <form action="thanks.html" method="post" oninput="shown.value = months.value; total.value = Number(months.value) * 300" onsubmit="event.preventDefault(); sent.value = (event.submitter.getAttribute('formmethod') || this.getAttribute('method')) + ' ' + (event.submitter.getAttribute('formaction') || this.getAttribute('action')) + ' ← ' + decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
    <input type="hidden" name="plan" value="gold">
    <p><label for="id">رقم العضوية</label><br>
    <input id="id" name="id" value="1042" size="6" readonly></p>
    <p><label for="plan">الباقة الحالية (التغيير من الاستقبال)</label><br>
    <select id="plan" disabled>
      <option value="silver">فضي</option>
      <option value="gold" selected>دهبي</option>
    </select></p>
    <p><label for="coupon">كود الخصم (مقفول: عرض نوفمبر خلص)</label><br>
    <input id="coupon" name="coupon" disabled></p>
    <p><label for="months">عدد الشهور (من ١ لـ ١٢)</label><br>
    <input id="months" name="months" type="range" min="1" max="12" value="3" list="marks">
    <datalist id="marks">
      <option value="1"></option>
      <option value="3"></option>
      <option value="6"></option>
      <option value="12"></option>
    </datalist>
    <output id="shown" for="months">3</output> شهور</p>
    <p><label for="total">الإجمالي بالجنيه</label>
    <output id="total" name="total" for="months">900</output></p>
    <button type="submit" name="act" value="renew">جدّد</button>
    <button type="submit" formaction="receipt.html" formmethod="get" formtarget="_blank">معاينة الإيصال</button>
  </form>
  <p>الطلب: <output id="sent">(دوس زرار)</output></p>
</main>
~~~

**هتشوف إيه:**

- **الرئيسية:** تلات لينكات في قايمة.
- **اللوحة:** شريط أزرق طويل (٤ من ٥)، ومقياس أخضر (٨٥٪)، ومقياس أحمر (٩ من ١٠).
- **التجديد:** رقم العضوية شكله عادي ومبيتكتبش فيه. الباقة وكود الخصم باهتين. الشريط عليه ٤ علامات، وسحبه بيغيّر «٣ شهور» والإجمالي.
- «جدّد»: [[post thanks.html ← plan=gold&id=1042&months=3&act=renew]].
- «معاينة الإيصال»: [[get receipt.html ← plan=gold&id=1042&months=3]].

**ليه كل حاجة كده:**

| الحتة | الاختيار | السبب |
|---|---|---|
| رقم العضوية | [[readonly]] | يتشاف ويتبعت وميتعدّلش |
| الباقة | [[<select disabled>]] + [[hidden]] | مفيش select للقراية بس، والقيمة لازم تتبعت |
| كود الخصم | [[disabled]] والسبب في الـ label | مش متاح، وقيمته مش مطلوبة |
| الشهور | [[range]] + [[<datalist>]] + [[<output>]] | مدى صغير، والعلامات عند المدد اللي بتتباع |
| الإجمالي | [[<output>]] | نتيجة للعرض. السيرفر بيحسب تاني من [[months]] |
| المعاينة | [[formmethod="get"]] و [[formtarget="_blank"]] | مبتغيّرش حاجة، والعضو يفضل في الفورم |
| إكمال البيانات | [[<progress>]] | مهمة ليها نهاية |
| الحضور والحصص | [[<meter>]] و [[optimum]] عكس بعض | قياسين، واحد العالي فيه كويس والتاني القليل |

**الأخطاء اللي اتعاملنا معاها:**

- الزرار الأساسي «جدّد» أول زرار، فـ Enter بيجدّد مش بيفتح المعاينة.
- كل شريط جنبه الرقم والحالة بالكلام («ممتاز»، «قرّبت تخلص»): اللون لوحده مش كفاية.
- الـ select المتعطّل ملوش [[name]]، والاسم على الـ hidden: مفيش قيمتين بنفس الاسم.

**الغلطة الشائعة:** [[name="total"]] على الـ output وكود سيرفر مستني [[total]]. مش هيوصل. وحتى لو وصل بطريقة تانية، الإجمالي اللي بيتدفع بيتحسب على السيرفر.

~~~text القياس من Chrome (الطلبات اللي وصلت السيرفر المحلي)
«جدّد»:
POST /thanks.html
content-type: application/x-www-form-urlencoded

plan=gold&id=1042&months=3&act=renew

«معاينة الإيصال»:
GET /receipt.html?plan=gold&id=1042&months=3

اللوحة:   progress 4/5 position = 0.8      الحضور: أخضر      الحصص: أحمر
~~~` },
        { lvl: 'فكرة', dir: "my-signup", t: R`فورم تسجيل لنشاط حقيقي حواليك، على خطوتين`, what: R`اختار نشاط تعرفه (مركز كورسات، ورشة، فريق كورة الحي، حضانة) واعمل فورم التسجيل بتاعه على صفحتين: [[index.html]] «بياناتك» و [[step2.html]] «التفاصيل والمستندات»، وكل صفحة فيها شريط الخطوة. انت اللي تقرر الحقول، بشرط إن الفورم يستخدم على الأقل: ٤ أنواع [[<input>]] غير [[text]]، وقايمة متقسّمة أو [[<datalist>]]، وشريط [[range]] معاه [[<output>]]، وحقل ملف واحد بـ [[accept]]، وحقل [[hidden]]، وزرارين إرسال واحد فيهم [[formnovalidate]].`, done: R`كل حقل ليه label و [[name]]، وجنب كل حقل تعليق HTML من سطر بيقول ليه النوع ده. والفورم اللي فيه ملف [[post]] و [[multipart/form-data]]. وكل [[<button>]] عليه [[type]]. وجرّبت كل زرار وكتبت في آخر الصفحة (في تعليق) الطلب اللي بيبعته.`, ext: R`خلّي صاحب النشاط نفسه (أو حد من أهلك) يملاه من موبايله من غير ما تشرحله حاجة، واكتب الحقول اللي وقف عندها وعدّلها. وزوّد صفحة «لوحة المشترك» فيها [[<meter>]] للأماكن الباقية.`, sol: R`**نسخة نموذجية:** مركز «لسان» (مركز كورسات لغات متخيل).

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الخطوة ١ من ٢: بياناتك | مركز لسان</title>
</head>
<body>
<main>
  <h1>سجّل في كورس</h1>
  <p><label for="step">الخطوة ١ من ٢: بياناتك</label><br>
  <progress id="step" value="1" max="2">١ من ٢</progress></p>
  <form action="step2.html" method="post">
    <!-- hidden: الصفحة دي بتاعة دورة يناير، والزائر مش هيختارها -->
    <input type="hidden" name="round" value="2027-01">
    <!-- text + autocomplete: الاسم نص حر -->
    <p><label for="name">الاسم</label><br>
    <input id="name" name="name" autocomplete="name" required></p>
    <!-- email: المتصفح بيفحص الشكل، والموبايل بيفتح كيبورد فيه @ -->
    <p><label for="email">الإيميل</label><br>
    <input id="email" name="email" type="email" autocomplete="email" required></p>
    <!-- date: تاريخ الميلاد يوم محدد -->
    <p><label for="birth">تاريخ الميلاد</label><br>
    <input id="birth" name="birth" type="date" autocomplete="bday" max="2015-12-31"></p>
    <!-- datalist: إجابات شائعة، وأي إجابة تانية مقبولة -->
    <p><label for="from">عرفت المركز منين؟</label><br>
    <input id="from" name="from" list="sources">
    <datalist id="sources">
      <option value="صاحب أو قريب"></option>
      <option value="إعلان في الشارع"></option>
      <option value="بحث على الإنترنت"></option>
    </datalist></p>
    <button type="submit">التالي</button>
  </form>
</main>
</body>
</html>
~~~

~~~html step2.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الخطوة ٢ من ٢: الكورس | مركز لسان</title>
</head>
<body>
<main>
  <h1>سجّل في كورس</h1>
  <p><label for="step">الخطوة ٢ من ٢: الكورس والمستندات</label><br>
  <progress id="step" value="2" max="2">٢ من ٢</progress></p>
  <form action="done.html" method="post" enctype="multipart/form-data" oninput="shown.value = hours.value">
    <!-- select + optgroup: قايمة مقفولة وليها تقسيم طبيعي -->
    <p><label for="course">الكورس</label><br>
    <select id="course" name="course" required>
      <option value="">اختار الكورس</option>
      <optgroup label="إنجليزي">
        <option value="en-a1">مبتدئ</option>
        <option value="en-b1">متوسط</option>
      </optgroup>
      <optgroup label="ألماني">
        <option value="de-a1">مبتدئ</option>
      </optgroup>
    </select></p>
    <!-- range + output: رقم تقريبي في مدى صغير، والـ output بيعرضه -->
    <p><label for="hours">كام ساعة مذاكرة تقدر عليها في الأسبوع؟ (من ١ لـ ١٥)</label><br>
    <input id="hours" name="hours" type="range" min="1" max="15" value="5">
    <output id="shown" for="hours">5</output></p>
    <!-- time: ميعاد في اليوم، كل نص ساعة -->
    <p><label for="at">أنسب ميعاد للحصة (من ١٠ ص لـ ٩ م)</label><br>
    <input id="at" name="at" type="time" min="10:00" max="21:00" step="1800"></p>
    <!-- file + accept: مستند واحد، PDF أو صورة -->
    <p><label for="cert">آخر شهادة لغة لو معاك (PDF أو صورة، أقصى حجم ٣ ميجا)</label><br>
    <input id="cert" name="cert" type="file" accept=".pdf, image/*"></p>
    <button type="submit" name="act" value="send">سجّل</button>
    <button type="submit" formaction="index.html" formnovalidate>رجوع</button>
  </form>
</main>
</body>
</html>
~~~

~~~live 114 done.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>اتسجّلت | مركز لسان</title>
</head>
<body>
<main>
  <h1>اتسجّلت</h1>
  <p>هنبعتلك ميعاد اختبار تحديد المستوى على الإيميل.</p>
</main>
</body>
</html>
~~~

~~~view 425 شكل step2.html (الأزرار هنا بتكتب تحت)
<main>
  <h1>سجّل في كورس</h1>
  <p><label for="step">الخطوة ٢ من ٢: الكورس والمستندات</label><br>
  <progress id="step" value="2" max="2">٢ من ٢</progress></p>
  <form action="done.html" oninput="shown.value = hours.value" onsubmit="event.preventDefault(); sent.value = 'هيفتح ' + (event.submitter.getAttribute('formaction') || this.getAttribute('action'))">
    <p><label for="course">الكورس</label><br>
    <select id="course" name="course" required>
      <option value="">اختار الكورس</option>
      <optgroup label="إنجليزي">
        <option value="en-a1">مبتدئ</option>
        <option value="en-b1">متوسط</option>
      </optgroup>
      <optgroup label="ألماني">
        <option value="de-a1">مبتدئ</option>
      </optgroup>
    </select></p>
    <p><label for="hours">كام ساعة مذاكرة تقدر عليها في الأسبوع؟ (من ١ لـ ١٥)</label><br>
    <input id="hours" name="hours" type="range" min="1" max="15" value="5">
    <output id="shown" for="hours">5</output></p>
    <p><label for="at">أنسب ميعاد للحصة (من ١٠ ص لـ ٩ م)</label><br>
    <input id="at" name="at" type="time" min="10:00" max="21:00" step="1800"></p>
    <p><label for="cert">آخر شهادة لغة لو معاك (PDF أو صورة، أقصى حجم ٣ ميجا)</label><br>
    <input id="cert" name="cert" type="file" accept=".pdf, image/*"></p>
    <button type="submit" name="act" value="send">سجّل</button>
    <button type="submit" formaction="index.html" formnovalidate>رجوع</button>
  </form>
  <p><output id="sent">(دوس زرار)</output></p>
</main>
~~~

**هتشوف إيه:**

- شريط الخطوة مليان (٢ من ٢)، وقايمة الكورسات مكتوب فيها «اختار الكورس».
- «سجّل» من غير اختيار كورس: رسالة المتصفح عند القايمة. «رجوع»: «هيفتح index.html» من غير فحص.

**ليه التصميم ده:**

- صفحتين: الأولى أسئلة سهلة (اسم وإيميل) عشان الزائر يبدأ، والتانية الاختيارات والملف.
- [[<option value="">اختار الكورس</option>]] و [[required]]: القايمة مبتبدأش على كورس ممكن الزائر يسيبه بالغلط (درس «form و label»).
- [[max="2015-12-31"]] على تاريخ الميلاد: المركز بيقبل من ١١ سنة.
- الشهادة اختيارية، فمفيش [[required]] عليها.
- التعليقات فوق كل حقل هي المطلوب في «تعرف إنك خلصت»: لو مش عارف تكتب سبب للنوع، غالبًا النوع غلط.

**الغلطة الشائعة:** تبدأ بالحقول اللي عايز تجرّبها («عايز أستخدم color») وتدوّر لها على سؤال. ابدأ من الأسئلة اللي النشاط محتاجها فعلًا، واختار لكل سؤال نوعه.

~~~text القياس من Chrome (الطلبات اللي وصلت السيرفر المحلي)
الخطوة ١:   POST /step2.html     round=2027-01&name=...&email=...&birth=&from=
الخطوة ٢ «سجّل» من غير كورس:   ولا طلب
الخطوة ٢ «رجوع»:               POST /index.html     (multipart، ومن غير فحص)
~~~` },
      ],
      items: [
        {
          cmd: "GET و POST و enctype",
          title: "الفورم بيبعت إيه بالظبط؟ action و method و enctype و hidden",
          pre: ["css/form و label", { to: "css/المسارات: مطلق ونسبي", why: R`قيمة [[action]] مسار زي [[href]] بالظبط، والـ query ([[?a=1&b=2]]) اتشرحت هناك` }],
          ref: [
            { t: "MDN: <form>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form" },
            { t: "MDN: Sending form data", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Sending_and_retrieving_form_data" },
            { t: "MDN: <input type=\"hidden\">", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/hidden" },
            { t: "WHATWG: Form submission attributes", url: "https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#form-submission-attributes" },
            { t: "WHATWG: the form element", url: "https://html.spec.whatwg.org/multipage/forms.html#the-form-element" }
          ],
          desc: R`لما الزائر يدوس زرار الإرسال، المتصفح بيجمع الحقول اللي ليها [[name]] ويبعتها في **طلب** (request) للسيرفر. تلات attributes على [[<form>]] بيحددوا شكل الطلب ده: [[action]] (يروح فين)، و [[method]] (البيانات تتحط في العنوان ولا في جسم الطلب)، و [[enctype]] (البيانات تتكتب بأنهي شكل).
في الدرس ده هتشوف الطلب نفسه زي ما خرج من Chrome، حرف بحرف، لنفس الفورم وهو مبعوت بأربع طرق.`,
          example: R`<form action="/join" method="post" enctype="multipart/form-data">
  <input type="hidden" name="plan" value="gold">
  <label for="name">الاسم</label>
  <input id="name" name="name" required>
  <label for="photo">صورة شخصية</label>
  <input id="photo" name="photo" type="file">
  <button type="submit">اشترك</button>
</form>`,
          flag: "script",
          lines: [
            R`[[action="/join"]] العنوان اللي الطلب هيروحله. [[method="post"]] معناها البيانات تتحط في جسم الطلب مش في العنوان. و [[enctype="multipart/form-data"]] الشكل اللي بيسمح بإرسال ملفات: لازم يتكتب في أي فورم فيه [[type="file"]].`,
            R`حقل [[type="hidden"]]: مش بيظهر في الصفحة خالص، بس بيتبعت مع الباقي. هنا بيقول للسيرفر إن الاشتراك ده في الباقة [[gold]] من غير ما الزائر يكتب حاجة.`,
            R`[[<label>]] مربوط بالحقل بـ [[for]] (درس «form و label»). الـ label للزائر، ومبيتبعتش.`,
            R`[[name="name"]] هو المفتاح اللي القيمة هتتبعت تحته. [[id]] للربط بالـ label جوه الصفحة، و [[name]] للإرسال: من غير [[name]] الحقل مبيتبعتش.`,
            R`اسم الحقل التاني اللي الزائر شايفه. زي الأول: للزائر مش للسيرفر.`,
            R`[[type="file"]] بيفتح نافذة اختيار ملف من الجهاز. محتوى الملف بيتبعت بس لو الفورم [[post]] و [[multipart/form-data]] (درس «file و accept و multiple»).`,
            R`زرار الإرسال: الضغط عليه بيخلّي المتصفح يفحص الحقول ([[required]])، وبعدين يبني الطلب ويبعته لـ [[/join]].`,
            R`[[</form>]] آخر الفورم. اللي بيتبعت هو الحقول اللي بين الفتحة والقفلة (أو المربوطة بالفورم بـ [[form=]]، درس «أزرار الفورم: formaction وإخواته»).`
          ],
          teach: R`## الفكرة في سطرين

الفورم مش بيبعت «الصفحة». بيبعت **طلب HTTP** فيه أزواج [[اسم=قيمة]]، واحد لكل حقل ليه [[name]]. والسيرفر بيقرا الأزواج دي ويرد بصفحة.

وعشان تشوف الطلب بعينك، كل القياسات في الدرس ده معمولة كده: Chrome 157 على Windows 11 بيبعت الفورم لسيرفر صغير شغال على نفس الجهاز، والسيرفر بيكتب الطلب اللي وصله زي ما هو.

---

## ٠. المعمل: سيرفر بيرجّع اللي وصله

ده السيرفر اللي قسنا بيه (ملف Node واحد من غير أي مكتبات). **مش مطلوب منك تكتبه ولا تفهمه دلوقتي:** هو أداة قياس. لو عندك Node وعايز تجرّب بنفسك: احفظه باسم [[echo.js]] وشغّله بـ [[node echo.js]]، وخلّي [[action]] بتاع الفورم [[http://127.0.0.1:8126/join]].

~~~js echo.js
const http = require("http");
http.createServer((req, res) => {
  const chunks = [];
  req.on("data", (c) => chunks.push(c));
  req.on("end", () => {
    const body = Buffer.concat(chunks).toString("utf8");
    const text = req.method + " " + req.url + "\n" +
      "content-type: " + (req.headers["content-type"] || "(none)") + "\n" +
      "content-length: " + (req.headers["content-length"] || "(none)") + "\n\n" + body;
    console.log(text + "\n=====");
    res.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
    res.end(text);
  });
}).listen(8126, "127.0.0.1");
~~~

كل طلب بيتطبع منه ٤ حاجات:

| السطر | معناه |
|---|---|
| [[POST /join]] | الـ method والعنوان اللي الطلب راحله (ومعاه الـ query لو فيه) |
| [[content-type]] | الشكل اللي جسم الطلب مكتوب بيه (ده اللي [[enctype]] بيحدده) |
| [[content-length]] | حجم جسم الطلب بالبايت |
| بعد السطر الفاضي | **جسم الطلب** (body): البيانات نفسها |

والفورم اللي هنبعته في كل التجارب هو ده (٤ حقول، واحد منهم من غير [[name]]):

~~~html
<form action="http://127.0.0.1:8126/join">
  <input name="name" value="منى علي">
  <input name="phone" value="01012345678">
  <input value="من غير name">
  <input type="hidden" name="plan" value="gold">
</form>
~~~

---

## ١. [[<form method="get">]]: البيانات في العنوان

[[get]] هي القيمة الافتراضية: لو مكتبتش [[method]] خالص، الفورم بيتبعت GET.

~~~text الطلب اللي وصل السيرفر (Chrome 157)
GET /join?name=%D9%85%D9%86%D9%89+%D8%B9%D9%84%D9%8A&phone=01012345678&plan=gold
content-type: (none)
content-length: (none)

~~~

اقرا العنوان حتة حتة:

| الحتة | معناها |
|---|---|
| [[/join]] | المسار اللي مكتوب في [[action]] على الفورم |
| [[?]] | بداية الـ query: المتصفح حطها لوحده |
| [[name=%D9%85%D9%86%D9%89+%D8%B9%D9%84%D9%8A]] | الحقل [[name]] وقيمته «منى علي»: كل حرف عربي بقى بايتين مكتوبين [[%XX]]، والمسافة بقت [[+]] |
| [[&]] | الفاصل بين كل حقل واللي بعده |
| [[phone=01012345678]] | الأرقام والحروف الإنجليزي بتتبعت زي ما هي |
| [[plan=gold]] | الحقل الـ hidden اتبعت زي أي حقل |

واللي **مش** موجود:

- الحقل التالت («من غير name») مش في الطلب خالص. **[[name]] هو اللي بيخلّي الحقل موجود عند السيرفر.**
- مفيش جسم للطلب ([[content-length]] مش موجود): في GET كل البيانات في العنوان.

### لو [[action]] فيه query أصلًا

~~~html
<form method="get" action="/search?old=1&x=2">
  <input name="q" value="a b&c=d">
</form>
~~~

~~~text الطلب اللي وصل
GET /search?q=a+b%26c%3Dd
~~~

حاجتين اتقاسوا هنا:

- الـ query القديمة ([[old=1&x=2]]) **اتمسحت**: في GET المتصفح بيبدّل الـ query كلها ببيانات الفورم. لو عايز قيمة ثابتة تتبعت، حطها في حقل [[hidden]] (القسم ٦).
- علامة [[&]] و [[=]] اللي جوه القيمة اتشفّروا ([[%26]] و [[%3D]])، فالسيرفر مش هيتلخبط بين «علامة جوه الكلام» و «فاصل بين حقلين».

### GET إمتى؟

لما الطلب **بيسأل** ومبيغيّرش حاجة: بحث، فلترة، ترتيب، رقم صفحة. العنوان فيه كل حاجة، فالزائر يقدر يحفظه أو يبعته لحد والنتيجة نفسها تفتح.

ومتستخدمهوش لـ: كلمة سر (هتظهر في شريط العنوان وفي الـ history)، ولا لطلب بيغيّر حاجة (اشتراك، دفع، حذف)، ولا لملف.

---

## ٢. [[<form method="post">]]: البيانات في جسم الطلب

نفس الفورم، وغيّرنا كلمة واحدة: [[method="post"]].

~~~text الطلب اللي وصل السيرفر
POST /join
content-type: application/x-www-form-urlencoded
content-length: 70

name=%D9%85%D9%86%D9%89+%D8%B9%D9%84%D9%8A&phone=01012345678&plan=gold
~~~

- العنوان بقى [[/join]] بس: مفيش [[?]] ومفيش بيانات فيه.
- البيانات نفسها، بنفس التشفير بالظبط، نزلت تحت السطر الفاضي: ده جسم الطلب، وحجمه ٧٠ بايت.
- ظهر [[content-type]]: المتصفح بيقول للسيرفر «الجسم ده مكتوب بشكل [[application/x-www-form-urlencoded]]»، يعني نفس شكل الـ query.

### POST مش معناها «متشفّر»

البيانات في POST مش ظاهرة في شريط العنوان، بس هي ماشية في الطلب نص عادي زي ما انت شايف فوق. اللي بيشفّر الطلب كله (GET أو POST) هو **HTTPS** مش الـ method. فكلمة السر: POST **و** موقع HTTPS.

### القيم المسموحة

| قيمة [[method]] | اللي بيحصل لما الفورم يتبعت |
|---|---|
| [[get]] (الافتراضي) | البيانات في العنوان |
| [[post]] | البيانات في جسم الطلب |
| [[dialog]] | بيقفل الـ [[<dialog>]] اللي الفورم جواه من غير ما يبعت حاجة (الوحدة الجاية) |
| أي كلمة تانية ([[put]] مثلًا) | اتقاس: [[form.method]] بيرجّع [[get]]. الفورم مبيعرفش غير التلاتة دول |

---

## ٣. [[<form enctype="multipart/form-data">]]: شكل جسم الطلب

[[enctype]] (encoding type) بيحدد جسم الطلب يتكتب إزاي. **بيشتغل مع POST بس**، وليه تلات قيم.

### القيمة الأولى: [[application/x-www-form-urlencoded]] (الافتراضية)

هي اللي شفتها في القسم ٢: [[اسم=قيمة]] وبينهم [[&]]، والعربي والرموز [[%XX]]. مناسبة لأي فورم مفيهوش ملفات.

### القيمة التانية: [[multipart/form-data]]

~~~text الطلب اللي وصل السيرفر
POST /join
content-type: multipart/form-data; boundary=----WebKitFormBoundaryTZlBNYdkEPdNSzMR
content-length: 346

------WebKitFormBoundaryTZlBNYdkEPdNSzMR
Content-Disposition: form-data; name="name"

منى علي
------WebKitFormBoundaryTZlBNYdkEPdNSzMR
Content-Disposition: form-data; name="phone"

01012345678
------WebKitFormBoundaryTZlBNYdkEPdNSzMR
Content-Disposition: form-data; name="plan"

gold
------WebKitFormBoundaryTZlBNYdkEPdNSzMR--
~~~

- **multipart** = «من كذا جزء». كل حقل بقى جزء لوحده.
- [[boundary]]: سطر فاصل المتصفح بيألّفه عشوائي في كل طلب، وبيكتبه في [[content-type]] عشان السيرفر يعرف الأجزاء بتتقطّع فين. آخر فاصل بعده [[--]] يعني «خلصنا».
- كل جزء أوله [[Content-Disposition: form-data; name="..."]] (اسم الحقل)، وبعدين سطر فاضي، وبعدين القيمة **زي ما هي من غير تشفير**: «منى علي» مكتوبة عربي.
- الحجم ٣٤٦ بايت بدل ٧٠: الفواصل بتاخد مساحة. فمتستخدمهوش من غير سبب.

والسبب الوحيد: **الملفات**. محتوى الملف (صورة مثلًا) بايتات مش نص، وكتابته [[%XX]] هتكبّره ٣ مرات. في multipart الملف بياخد جزء لوحده بمحتواه الخام (هتشوفه في درس «file و accept و multiple»).

### القيمة التالتة: [[text/plain]]

~~~text الطلب اللي وصل السيرفر
POST /join
content-type: text/plain
content-length: 50

name=منى علي
phone=01012345678
plan=gold
~~~

كل حقل في سطر، من غير أي تشفير. شكله مقروء للبني آدم، بس السيرفر ميقدرش يثق فيه: لو قيمة فيها سطر جديد و [[plan=free]]، مين هيفرّق؟ المواصفة نفسها بتقول إن الشكل ده مش مضمون يتقري بالكمبيوتر. استخدامه الوحيد: التجربة والـ debugging.

| [[enctype]] | الجسم | إمتى |
|---|---|---|
| [[application/x-www-form-urlencoded]] | [[a=1&b=2]] متشفّر | الافتراضي: أي فورم من غير ملفات |
| [[multipart/form-data]] | أجزاء بينها [[boundary]] | أي فورم فيه [[type="file"]] |
| [[text/plain]] | سطر لكل حقل من غير تشفير | تجربة بس |

---

## ٤. [[<form action="/join">]]: الطلب يروح فين

[[action]] مسار، وبيتكتب بنفس قواعد [[href]] في درس «المسارات: مطلق ونسبي»:

| المكتوب | الطلب بيروح |
|---|---|
| [[action="https://example.test/join"]] | العنوان الكامل ده |
| [[action="/join"]] | [[/join]] من جذر نفس الموقع |
| [[action="thanks.html"]] | ملف جنب الصفحة الحالية |
| من غير [[action]] | **نفس الصفحة الحالية** (اتقاس: [[button.formAction]] رجّع عنوان الصفحة نفسها) |

لما الرد ييجي، المتصفح **بيفتحه مكان الصفحة**: الإرسال تنقّل زي الضغط على لينك. عشان كده في المشاريع بنحط في [[action]] صفحة «شكرًا» ثابتة: مفيش سيرفر يقرا البيانات، بس الزائر بيتنقل لصفحة حقيقية.

> صفحة HTML ثابتة مبتقراش جسم طلب POST. اللي بيقراه كود على السيرفر (كورسات Node و PHP و Python). في الكورس ده بنبني الفورم صح، والطرف التاني لسه جاي.

---

## ٥. [[<form target="_blank">]]: الرد يتفتح فين

زي [[target]] على اللينك (درس «target و rel»):

- من غيره (أو [[_self]]): الرد بيتفتح مكان الصفحة الحالية.
- [[target="_blank"]]: الرد بيتفتح في تاب جديدة، والصفحة اللي فيها الفورم بتفضل مكانها. مفيد لـ «معاينة» أو «اطبع الإيصال».
- [[target="اسم"]]: الرد بيتفتح جوه [[<iframe name="اسم">]] في نفس الصفحة. دي الطريقة اللي قياسات الدرس ده اتعملت بيها: كل فورم بيبعت جوه iframe والصفحة الأصلية مبتتحركش.

---

## ٦. [[<input type="hidden">]]: حقل الزائر مش شايفه

~~~html
<input type="hidden" name="plan" value="gold">
~~~

~~~text القياس من Chrome
display = none      العرض = 0      بيتبعت: plan=gold
~~~

- [[display: none]]: مش بيظهر، ومبياخدش مكان، والـ Tab مبيقفش عنده.
- بيتبعت زي أي حقل: شفته في كل الطلبات اللي فوق.

بيتستخدم لمعلومة السيرفر محتاجها والزائر مش هيكتبها: رقم المنتج اللي الفورم ده بتاعه، الباقة اللي اختارها في الصفحة اللي فاتت، الصفحة اللي جه منها.

**مش مكان للأسرار ولا للأسعار.** أي حد يفتح DevTools ويغيّر [[value="gold"]] لأي حاجة ويبعت. السيرفر لازم يتأكد من كل قيمة جاية من hidden زي ما بيتأكد من أي حقل الزائر كتبه.

---

## ٧. [[<form accept-charset="UTF-8">]]: ترميز الحروف

بيقول الحروف تتحوّل لبايتات بأنهي ترميز قبل ما تتبعت. الافتراضي ترميز الصفحة نفسها، وصفحتك [[<meta charset="utf-8">]] (درس «<!doctype html>»)، فالنتيجة UTF-8 من غير ما تكتب حاجة.

اتقاس: كلمة «قهوة» في فورم GET:

~~~text الطلب اللي وصل
من غير accept-charset:            GET /?q=%D9%82%D9%87%D9%88%D8%A9      (UTF-8: بايتين لكل حرف)
accept-charset="windows-1256":    GET /?q=%DE%E5%E6%C9                  (ترميز عربي قديم: بايت لكل حرف)
~~~

نفس الكلمة وبايتات مختلفة خالص. لو السيرفر مستني UTF-8 وجاله التاني، هيقراها رموز غريبة. المواصفة دلوقتي بتقول إن القيمة الوحيدة الصح هي [[UTF-8]]، فعمليًا: **متكتبوش**، وخلّي الصفحة UTF-8.

---

## ٨. [[<form name="join">]] و [[<form autocomplete="off">]]

- [[name]] على الفورم نفسه **مبيتبعتش**. هو اسم للفورم جوه الصفحة: JavaScript بيلاقيه بـ [[document.forms.join]] (اتقاس: رجّع نفس عنصر الفورم). ملوش علاقة بـ [[name]] بتاع الحقول.
- [[autocomplete="off"]] على الفورم بيقول للمتصفح ميقترحش قيم محفوظة لكل حقول الفورم مرة واحدة. الافتراضي [[on]] (اتقاس: [[form.autocomplete]] رجّع [[on]]). والأحسن دايمًا تسيبه [[on]] وتكتب [[autocomplete]] المناسب على كل حقل (درس «form و label»). MDN بيقول كمان إن المتصفحات ممكن تتجاهل [[off]] في فورم تسجيل الدخول.

وباقي الـ attributes بتاعة [[<form>]]: [[novalidate]] في درس «أزرار الفورم: formaction وإخواته»، و [[rel]] زي اللينك.

---

## ٩. سطر المعاينة اللي هتشوفه في الوحدة دي

صناديق المعاينة هنا معزولة: مفيش سيرفر وراها. فلو الفورم اتبعت بجد، الصندوق هيفتح صفحة مش موجودة. عشان كده فورمات المعاينة فيها سطر JavaScript واحد بيمنع الإرسال وبيكتبلك **البيانات اللي كانت هتتبعت**:

~~~html
<form onsubmit="event.preventDefault(); sent.value = decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[onsubmit="..."]] | كود بيشتغل لحظة ما الفورم يتبعت (كورس JavaScript بيشرح الأحداث) |
| [[event.preventDefault()]] | «متبعتش»: بيوقف الإرسال الحقيقي |
| [[new FormData(this, event.submitter)]] | بيجمع نفس الحقول اللي المتصفح كان هيبعتها، ومعاهم الزرار اللي اتداس |
| [[new URLSearchParams(...)]] | بيكتب الحقول دي في سطر واحد بشكل [[a=1&b=2]] |
| [[decodeURIComponent(...)]] | بيفك [[%XX]] عشان تقرا العربي |
| [[sent.value = ...]] | بيحط الناتج في العنصر اللي [[id]] بتاعه [[sent]] |

~~~live 161 179 اكتب اسمك ودوس «اشترك»
<form onsubmit="event.preventDefault(); sent.value = decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
  <input type="hidden" name="plan" value="gold">
  <p><label for="n">الاسم</label> <input id="n" name="name" value="منى علي"></p>
  <p><label for="c">كود الخصم (الحقل ده من غير name)</label> <input id="c" value="MOGA10"></p>
  <button>اشترك</button>
</form>
<p>اللي كان هيتبعت: <output id="sent">(لسه)</output></p>
~~~

**هتشوف إيه:**

- بعد ما تدوس «اشترك» هيتكتب [[plan=gold&name=منى+علي]].
- [[plan]] ظهر مع إنك مش شايف حقله في الصفحة: ده الـ hidden.
- كود الخصم مش في الناتج مع إنه مكتوب قدامك: حقله ملوش [[name]].
- المسافة اللي في الاسم بقت [[+]].

السطر ده للمعاينة بس. الفورم الحقيقي بيتكتب من غيره.

---

## ١٠. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| حقل من غير [[name]] | مبيتبعتش، ومفيش أي رسالة خطأ |
| فورم تسجيل دخول من غير [[method="post"]] | كلمة السر بتظهر في شريط العنوان وبتتحفظ في الـ history |
| [[type="file"]] من غير [[enctype="multipart/form-data"]] | اسم الملف بس اللي بيتبعت، ومحتواه لأ |
| [[enctype]] على فورم GET | ملوش أي تأثير: GET مفيهوش جسم |
| سعر أو صلاحية في حقل hidden | أي زائر يغيّره من DevTools |
| [[action="/search?lang=ar"]] مع GET | [[lang=ar]] بتتمسح: حطها hidden |
| [[method="put"]] أو [[delete]] | الفورم بيتبعت GET كأنك مكتبتش method |
| تفتكر POST مأمّن البيانات | الأمان من HTTPS |

---

## الخلاصة

- الحقل اللي ليه [[name]] بس هو اللي بيتبعت، بشكل [[اسم=قيمة]].
- [[method="get"]] (الافتراضي): البيانات في العنوان. للبحث والفلترة.
- [[method="post"]]: البيانات في جسم الطلب. لأي حاجة بتغيّر أو فيها بيانات شخصية.
- [[enctype]] مع POST بس: الافتراضي للنص، و [[multipart/form-data]] للملفات، و [[text/plain]] للتجربة.
- [[action]] مسار زي [[href]]، ومن غيره الطلب بيروح لنفس الصفحة. و [[target]] بيحدد الرد يتفتح فين.
- [[type="hidden"]] بيتبعت من غير ما يظهر، وأي زائر يقدر يغيّره.`,
          try: R`اعمل ملف [[join.html]] فيه فورم [[method="get"]] و [[action="join.html"]] (يعني بيبعت لنفسه)، وفيه: حقل [[name="name"]]، وحقل hidden [[name="plan"]] قيمته [[gold]]، وحقل [[type="password"]] اسمه [[pass]]، وزرار. افتحه، واكتب اسم وكلمة سر، ودوس الزرار، وبص على شريط العنوان. وبعدين غيّر [[get]] لـ [[post]] وجرّب تاني.`,
          sol: R`~~~html join.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>اشتراك</title>
</head>
<body>
<form action="join.html" method="get">
  <input type="hidden" name="plan" value="gold">
  <p><label for="name">الاسم</label> <input id="name" name="name"></p>
  <p><label for="pass">كلمة السر</label> <input id="pass" name="pass" type="password"></p>
  <button type="submit">اشترك</button>
</form>
</body>
</html>
~~~

~~~view 161 شكل الصفحة (الإرسال هنا بيتكتب تحت بدل ما يتبعت)
<form onsubmit="event.preventDefault(); sent.value = decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
  <input type="hidden" name="plan" value="gold">
  <p><label for="name">الاسم</label> <input id="name" name="name"></p>
  <p><label for="pass">كلمة السر</label> <input id="pass" name="pass" type="password"></p>
  <button type="submit">اشترك</button>
</form>
<p>اللي كان هيتبعت: <output id="sent">(لسه)</output></p>
~~~

**هتشوف إيه:**

- **بـ [[get]]:** الصفحة اتحمّلت من جديد، وشريط العنوان بقى آخره [[?plan=gold&name=...&pass=...]]. كلمة السر اللي كانت نقط في الحقل بقت **مكتوبة بحروفها** في العنوان.
- **بـ [[post]]:** الصفحة اتحمّلت من جديد والعنوان [[join.html]] بس. البيانات راحت في جسم الطلب. (لو فاتح الملف بدبل كليك مفيش سيرفر يقراها، وده عادي.)

~~~text الطلب في الحالتين (متقاس بنفس الفورم على السيرفر المحلي، Chrome 157)
get:    GET /join.html?plan=gold&name=mona&pass=s3cret

post:   POST /join.html
        content-type: application/x-www-form-urlencoded

        plan=gold&name=mona&pass=s3cret
~~~

[[type="password"]] بيخبّي الحروف **على الشاشة** بس. في الطلب هي نص عادي، ومكانها في العنوان أو الجسم بيتحدد من [[method]].`,
          deep: {
            why: R`الفورم هو الطريقة الوحيدة اللي HTML لوحده (من غير JavaScript) بيبعت بيها بيانات من الزائر للسيرفر: بحث، تسجيل، دفع، رفع ملف. ولما الطلب يوصل غلط (حقل ناقص، ملف من غير محتوى، كلمة سر في العنوان) السبب في أغلب الحالات واحد من تلاتة: [[name]] أو [[method]] أو [[enctype]]. اللي فاهم شكل الطلب بيلاقي الغلطة من تاب Network في دقيقة.`,
            how: R`لحظة الإرسال المتصفح بيبني «قايمة البيانات»: بيلف على حقول الفورم بترتيبها في الصفحة، وبياخد كل حقل ليه [[name]] ومش [[disabled]] (والـ checkbox والـ radio المتعلّمين بس، والزرار اللي اتداس بس). بعدين بيحوّل الحروف لبايتات بترميز الصفحة (UTF-8)، ويكتب القايمة بالشكل اللي [[enctype]] بيقوله. في GET بيحطها مكان الـ query في عنوان [[action]]، وفي POST بيحطها في جسم الطلب ويكتب [[content-type]] و [[content-length]]. وأخيرًا بيتنقّل للرد في المكان اللي [[target]] بيقوله.`,
            when: R`[[get]]: بحث وفلاتر وأي صفحة نتايج تتحفظ أو تتبعت. [[post]] من غير [[enctype]]: تسجيل، دخول، تعليق، طلب، أي حاجة بتغيّر. [[post]] مع [[multipart/form-data]]: أول ما يبقى فيه [[type="file"]]. [[hidden]]: معلومة ثابتة السيرفر محتاجها مع الفورم ده. [[target="_blank"]]: لما الزائر لازم يفضل في الصفحة والرد يتفتح جنبها.`,
            mistakes: R`حقل من غير [[name]] وتستنى قيمته توصل. كلمة سر في فورم GET. ملف في فورم من غير [[multipart/form-data]]. تحط الـ query في [[action]] مع GET وتستناها تفضل. تثق في قيمة hidden كأن الزائر مش قادر يغيّرها. تكتب [[enctype]] على فورم GET. وتفتكر إن [[name]] على [[<form>]] هو اللي بيتبعت.`
          },
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع، وبعدين صلّح:** فورم البحث ده في متجر «نادي الموج». الزائر كتب «شنطة سباحة» واختار المقاس. اكتب على ورقة العنوان اللي هيطلع، ودوس «دوّر» وقارن. وبعدين صلّح الفورم عشان المقاس يتبعت هو كمان. (من قسم ١ في الشرح: [[name]] والبيانات في العنوان)`, done: R`توقّعت إن [[q]] بس هي اللي هتتبعت، وبعد التصليح الناتج بقى فيه [[q]] و [[size]].`, work: { h: 161, start: R`<form onsubmit="event.preventDefault(); sent.value = decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
  <p><label for="q">الكلمة</label> <input id="q" name="q" value="شنطة سباحة"></p>
  <p><label for="size">المقاس</label> <input id="size" value="L"></p>
  <button>دوّر</button>
</form>
<p>الـ query: <output id="sent">(دوس «دوّر»)</output></p>`, checks: [
              { say: R`حقل الكلمة لسه عليه [[name="q"]]`, q: "input[name=\"q\"]" },
              { say: R`حقل المقاس بقى عليه [[name="size"]]`, q: "input#size[name=\"size\"]" },
              { say: R`كل حقل لسه ليه [[<label>]] مربوط بيه`, q: "label[for]", n: 2 },
            ] }, sol: R`~~~live 161 بعد التصليح
<form onsubmit="event.preventDefault(); sent.value = decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
  <p><label for="q">الكلمة</label> <input id="q" name="q" value="شنطة سباحة"></p>
  <p><label for="size">المقاس</label> <input id="size" name="size" value="L"></p>
  <button>دوّر</button>
</form>
<p>الـ query: <output id="sent">(دوس «دوّر»)</output></p>
~~~

**هتشوف إيه:**

- قبل التصليح: [[q=شنطة+سباحة]] بس. المقاس [[L]] مكتوب قدامك في الحقل ومش في الناتج.
- بعد التصليح: [[q=شنطة+سباحة&size=L]].

**ليه:** حقل المقاس كان ليه [[id="size"]] ومفيش [[name]]. الـ [[id]] بيربط الـ [[<label>]] بالحقل جوه الصفحة، ومبيتبعتش. اللي بيتبعت [[name]].

**الغلطة الشائعة:** تمسح [[id]] وتحط [[name]] مكانه. محتاج الاتنين: [[id]] للـ label و [[name]] للسيرفر، وعادي يبقوا نفس الكلمة.

~~~text القياس من Chrome (العنوان الحقيقي لما الفورم اتبعت GET)
قبل:   /search?q=%D8%B4%D9%86%D8%B7%D8%A9+%D8%B3%D8%A8%D8%A7%D8%AD%D8%A9
بعد:   /search?q=%D8%B4%D9%86%D8%B7%D8%A9+%D8%B3%D8%A8%D8%A7%D8%AD%D8%A9&size=L
~~~

العنوان الحقيقي فيه العربي [[%XX]]، وسطر المعاينة بيفكّه عشان تقراه.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** فورم دخول الأعضاء في «نادي الموج» فيه ٣ مشاكل: كلمة السر هتظهر في العنوان، ورقم العضوية مش هيوصل، وفيه [[enctype]] ملوش لازمة. صلّحهم. (من قسم ٢ و ٣ و ١٠ في الشرح)`, done: R`الفورم بقى [[post]]، ورقم العضوية ليه [[name]]، ومفيش [[enctype]]، وكل الشروط ✓.`, work: { h: 120, start: R`<form action="/login" method="get" enctype="multipart/form-data">
  <p><label for="id">رقم العضوية</label> <input id="id"></p>
  <p><label for="pass">كلمة السر</label> <input id="pass" name="pass" type="password"></p>
  <button>ادخل</button>
</form>`, checks: [
              { say: R`الفورم بيبعت بـ [[method="post"]]`, q: "form[method=\"post\" i]" },
              { say: R`رقم العضوية عليه [[name]]`, q: "input#id[name]" },
              { say: R`كلمة السر لسه [[type="password"]] وعليها [[name]]`, q: "input[type=\"password\"][name]" },
              { say: R`مفيش [[enctype="multipart/form-data"]] (الفورم مفيهوش ملفات)`, q: "form[enctype=\"multipart/form-data\"]", n: 0 },
              { say: R`[[action]] لسه [[/login]]`, q: "form[action=\"/login\"]" },
            ] }, sol: R`~~~live 119 بعد التصليح
<form action="/login" method="post" onsubmit="return false">
  <p><label for="id">رقم العضوية</label> <input id="id" name="member"></p>
  <p><label for="pass">كلمة السر</label> <input id="pass" name="pass" type="password"></p>
  <button>ادخل</button>
</form>
~~~

(المعاينة عليها [[onsubmit="return false"]] عشان الصندوق ميتنقلش لصفحة مش موجودة. الشكل في الصفحة زي ما هو قبل وبعد: التصليح كله في الطلب.)

| المشكلة | التصليح | ليه |
|---|---|---|
| [[method="get"]] | [[method="post"]] | في GET كلمة السر بتتحط في العنوان |
| رقم العضوية من غير [[name]] | [[name="member"]] | من غير [[name]] مبيتبعتش |
| [[enctype="multipart/form-data"]] | اتشال | مفيش ملفات، والافتراضي أصغر وأبسط |

**هتشوف إيه:** مفيش فرق في شكل الصفحة. الفرق في الطلب:

~~~text القياس من Chrome (الطلب اللي وصل السيرفر المحلي)
قبل:   GET /login?pass=s3cret
       (رقم العضوية مش موجود، وكلمة السر في العنوان)

بعد:   POST /login
       content-type: application/x-www-form-urlencoded

       member=1042&pass=s3cret
~~~

**الغلطة الشائعة:** تغيّر [[get]] لـ [[post]] وتسيب [[enctype]]. الفورم هيشتغل، بس كل طلب هيتبعت بالأجزاء والفواصل من غير أي سبب، وبعض أكواد السيرفر البسيطة مبتقراش multipart أصلًا.` },
            { lvl: 'تطبيق', t: R`**ابني:** فورم «احجز حصة سباحة» لـ «نادي الموج». المطلوب: يبعت [[post]] لـ [[/book]]، وفيه حقل الاسم ([[name="name"]])، وحقل الموبايل ([[type="tel"]] و [[name="phone"]])، وحقل مخفي بيقول إن الحصة هي [[swim-101]] ([[name="class"]])، وزرار «احجز». (من قسم ٢ و ٤ و ٦ في الشرح)`, done: R`الفورم فيه حقلين ظاهرين بـ labels وحقل hidden وزرار، وكل الشروط ✓.`, work: { h: 225, start: R`<h1>احجز حصة سباحة</h1>
<form>
  الاسم
  الموبايل
  احجز
</form>`, checks: [
              { say: R`الفورم [[method="post"]] و [[action="/book"]]`, q: "form[method=\"post\" i][action=\"/book\"]" },
              { say: R`حقل الاسم [[name="name"]] وليه [[<label>]]`, q: "form:has(label) input[name=\"name\"]" },
              { say: R`حقل الموبايل [[type="tel"]] و [[name="phone"]]`, q: "input[type=\"tel\"][name=\"phone\"]" },
              { say: R`حقل [[type="hidden"]] اسمه [[class]] وقيمته [[swim-101]]`, q: "input[type=\"hidden\"][name=\"class\"][value=\"swim-101\"]" },
              { say: R`فيه [[<label>]] لكل حقل ظاهر`, q: "label[for]", n: 2 },
              { say: R`زرار «احجز» جوه الفورم`, q: "form button", has: "احجز" },
            ] }, sol: R`~~~live 225 الحل
<h1>احجز حصة سباحة</h1>
<form action="/book" method="post" onsubmit="event.preventDefault(); sent.value = decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
  <input type="hidden" name="class" value="swim-101">
  <p><label for="name">الاسم</label> <input id="name" name="name"></p>
  <p><label for="phone">الموبايل</label> <input id="phone" name="phone" type="tel"></p>
  <button>احجز</button>
</form>
<p>اللي كان هيتبعت: <output id="sent">(لسه)</output></p>
~~~

(سطر [[onsubmit]] للمعاينة بس، والشروط مبتطلبوش.)

**هتشوف إيه:**

- حقلين وزرار. الحقل المخفي ملوش أي أثر في الصفحة.
- اكتب اسم ورقم ودوس «احجز»: الناتج أوله [[class=swim-101]] مع إنك مكتبتهاش.

**ليه كده:**

- [[post]] لأن الحجز بيغيّر حاجة عند النادي (حصة اتحجزت)، ولأن فيه رقم موبايل.
- الـ hidden أول حقل أو آخر حقل، مش مهم: مكانه في الكود بيحدد ترتيبه في الطلب بس.
- مفيش [[enctype]]: مفيش ملفات.

**الغلطة الشائعة:** تكتب اسم الحصة في [[<input name="class" value="swim-101">]] عادي وتخبّيه بـ CSS. الحقل هيفضل الـ Tab يقف عنده وقارئ الشاشة يقراه. [[type="hidden"]] هو اللي بيشيله من الاتنين.

~~~text القياس من Chrome (الطلب اللي وصل السيرفر المحلي)
POST /book
content-type: application/x-www-form-urlencoded

class=swim-101&name=%D9%85%D9%86%D9%89&phone=01012345678
~~~` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** ده طلب وصل سيرفر «نادي الموج» (الجسم تحت السطر الفاضي). اكتب الفورم اللي بعته: نفس العنوان، ونفس الـ method، ونفس أسامي الحقول الأربعة بنفس الترتيب، وخلّي [[sport]] مخفي. (من قسم ٢ في الشرح: قراية طلب POST)`, done: R`الفورم بيبعت لـ [[/trial]] بـ [[post]]، وفيه الأربع حقول بأساميهم، وكل الشروط ✓.`, work: { h: 198, start: R`<!--
POST /trial
content-type: application/x-www-form-urlencoded

sport=polo&name=Omar&age=14&phone=01112345678
-->
<form>
</form>`, checks: [
              { say: R`الفورم [[action="/trial"]] و [[method="post"]]`, q: "form[action=\"/trial\"][method=\"post\" i]" },
              { say: R`حقل [[sport]] مخفي وقيمته [[polo]]`, q: "input[type=\"hidden\"][name=\"sport\"][value=\"polo\"]" },
              { say: R`حقل [[name]]`, q: "input[name=\"name\"]" },
              { say: R`حقل [[age]]`, q: "input[name=\"age\"]" },
              { say: R`حقل [[phone]]`, q: "input[name=\"phone\"]" },
              { say: R`[[sport]] أول حقل في الفورم (زي ترتيب الطلب)`, q: "form input:first-of-type[name=\"sport\"]" },
            ] }, sol: R`~~~live 198 الحل
<form action="/trial" method="post" onsubmit="event.preventDefault(); sent.value = decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
  <input type="hidden" name="sport" value="polo">
  <p><label for="name">الاسم</label> <input id="name" name="name" value="Omar"></p>
  <p><label for="age">السن</label> <input id="age" name="age" type="number" value="14"></p>
  <p><label for="phone">الموبايل</label> <input id="phone" name="phone" type="tel" value="01112345678"></p>
  <button>جرّب حصة</button>
</form>
<p>اللي كان هيتبعت: <output id="sent">(لسه)</output></p>
~~~

**هتشوف إيه:** دوس «جرّب حصة»: الناتج [[sport=polo&name=Omar&age=14&phone=01112345678]]، نفس جسم الطلب اللي في التمرين حرف بحرف.

**إزاي قريت الطلب:**

- [[POST /trial]] ← [[method="post"]] و [[action="/trial"]].
- [[content-type: application/x-www-form-urlencoded]] ← الافتراضي، يبقى مفيش [[enctype]] مكتوب.
- الجسم بيتقطّع عند كل [[&]]: أربع أزواج، يبقى أربع حقول ليها [[name]]. والترتيب في الجسم هو ترتيب الحقول في الكود.
- الزرار مش في الجسم: ملوش [[name]].

**الغلطة الشائعة:** تكتب [[<form name="trial">]] وتفتكر إن ده العنوان. [[name]] على الفورم اسم ليه جوه الصفحة، والعنوان من [[action]].` },
            { lvl: 'سريع', t: R`**اشرحها:** زميلك كتب فورم رفع صورة العضوية، والسيرفر بيقوله «الملف فاضي». الفورم: [[<form action="/photo" method="post">]] وجواه [[<input type="file" name="photo">]]. اشرحله في ٣ سطور إيه اللي وصل السيرفر فعلًا وإيه التصليح. (من قسم ٣ في الشرح: [[enctype]])`, done: R`كتبت إن اللي وصل اسم الملف بس، وإن التصليح [[enctype="multipart/form-data"]]، وليه.`, sol: R`**إجابة نموذجية:**

1. الفورم من غير [[enctype]]، فالجسم اتكتب بالشكل الافتراضي ([[application/x-www-form-urlencoded]]): [[اسم=قيمة]]. والشكل ده نص بس، فالمتصفح بعت **اسم الملف** مكان القيمة.
2. اللي وصل السيرفر فعلًا هو السطر [[photo=avatar.svg]]: كلمة، مش ملف. محتوى الصورة مخرجش من الجهاز أصلًا.
3. التصليح كلمتين على الفورم: [[enctype="multipart/form-data"]]. ساعتها كل حقل بياخد جزء لوحده، وجزء الملف فيه اسمه ونوعه ومحتواه الخام.

~~~text القياس من Chrome (نفس الفورم على السيرفر المحلي، والملف صورة صغيرة اسمها avatar.svg)
من غير enctype:
POST /photo
content-type: application/x-www-form-urlencoded
content-length: 16

photo=avatar.svg

بـ enctype="multipart/form-data":
POST /photo
content-type: multipart/form-data; boundary=----WebKitFormBoundarypBpda26Cx6A2Agms
content-length: 305

------WebKitFormBoundarypBpda26Cx6A2Agms
Content-Disposition: form-data; name="photo"; filename="avatar.svg"
Content-Type: image/svg+xml

<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><circle cx="20" cy="20" r="18" fill="#0a7ea4"/></svg>

------WebKitFormBoundarypBpda26Cx6A2Agms--
~~~

١٦ بايت في الأول (اسم الملف) و ٣٠٥ في التاني (الملف نفسه): الفرق ده هو الصورة.

**الغلطة الشائعة:** تدوّر على المشكلة في كود السيرفر ساعة. افتح تاب Network في DevTools وبص على الطلب: لو [[content-type]] مش [[multipart/form-data]]، المشكلة في الـ HTML.` }
          ]
        },
        {
          cmd: "أنواع input كلها",
          title: "الـ 22 نوع بتوع input: كل واحد بيرسم إيه وبيبعت إيه",
          pre: ["css/form و label", "css/textarea و date و number", { to: "css/GET و POST و enctype", why: R`سطر المعاينة اللي بيكتب «اللي كان هيتبعت» اتشرح هناك في القسم ٩` }],
          ref: [
            { t: "MDN: <input> types", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#input_types" },
            { t: "WHATWG: States of the type attribute", url: "https://html.spec.whatwg.org/multipage/input.html#states-of-the-type-attribute" },
            { t: "MDN: <input type=\"color\">", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/color" },
            { t: "MDN: <input type=\"range\">", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/range" },
            { t: "MDN: <input type=\"time\">", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/time" },
            { t: "MDN: <input type=\"datetime-local\">", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/datetime-local" },
            { t: "MDN: <input type=\"month\">", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/month" },
            { t: "MDN: <input type=\"week\">", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/week" },
            { t: "MDN: <input type=\"image\">", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/image" },
            { t: "MDN: <input type=\"reset\">", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/reset" }
          ],
          desc: R`[[<input>]] عنصر واحد بـ 22 شكل. كلمة [[type]] هي اللي بتقرر: المتصفح يرسم إيه (خانة نص، ولا شريط بيتسحب، ولا نافذة ألوان)، والقيمة اللي بتتبعت شكلها إيه، والموبايل يفتح أنهي كيبورد، وإيه اللي يترفض.
الدرس ده فيه جدول مرجعي بالـ 22 نوع كلهم، وشرح الأنواع اللي لسه ماتشرحتش: [[color]] و [[range]] و [[time]] و [[datetime-local]] و [[month]] و [[week]] و [[image]] و [[reset]].`,
          example: R`<label for="color">لون الفانلة</label>
<input id="color" name="color" type="color" value="#0a7ea4">
<label for="level">مستواك في السباحة</label>
<input id="level" name="level" type="range" min="1" max="5" value="3">
<label for="at">ميعاد الحصة</label>
<input id="at" name="at" type="time" min="09:00" max="22:00" step="900">
<label for="start">بداية الاشتراك</label>
<input id="start" name="start" type="month" min="2026-11">
<input type="reset" value="امسح">
<input type="submit" value="ابعت">`,
          flag: "script",
          lines: [
            R`اسم حقل اللون. كل نوع من دول محتاج [[<label>]] زي حقل النص بالظبط، لأن الشكل لوحده (مربع ملوّن) مبيقولش ده لون إيه.`,
            R`[[type="color"]] بيرسم مربع ملوّن، والضغط عليه بيفتح نافذة اختيار لون. [[value="#0a7ea4"]] اللون اللي الحقل بيبدأ بيه، والقيمة اللي بتتبعت دايمًا بالشكل [[#rrggbb]].`,
            R`اسم حقل المستوى. مهم هنا بالذات: الشريط مبيكتبش رقمه، فالـ label هو اللي بيقول الشريط ده بيقيس إيه.`,
            R`[[type="range"]] شريط بيتسحب. [[min="1"]] و [[max="5"]] أول وآخر الشريط، و [[value="3"]] مكان الدايرة في الأول. القيمة اللي بتتبعت رقم بين ١ و ٥.`,
            R`اسم حقل الميعاد، مربوط بيه بـ [[for="at"]].`,
            R`[[type="time"]] حقل ساعة ودقايق. [[min]] و [[max]] أول وآخر ميعاد مقبول (من ٩ الصبح لـ ١٠ بالليل)، و [[step="900"]] بالثواني: ٩٠٠ ثانية يعني المواعيد كل ربع ساعة.`,
            R`اسم حقل الشهر، مربوط بيه بـ [[for="start"]].`,
            R`[[type="month"]] بيختار شهر وسنة من غير يوم. [[min="2026-11"]] يعني مينفعش شهر قبل نوفمبر ٢٠٢٦. القيمة بتتبعت [[YYYY-MM]].`,
            R`[[type="reset"]] زرار بيرجّع كل حقول الفورم لقيمها الأولى. [[value]] هنا هو الكلام المكتوب على الزرار. (وهتعرف في القسم ٦ ليه الأحسن متحطوش.)`,
            R`[[type="submit"]] زرار الإرسال بشكله القديم: [[value]] هو الكلام اللي عليه. بيعمل نفس شغل [[<button type="submit">]].`
          ],
          teach: R`## الفكرة في سطرين

المواصفة: [[type]] بيحدد «الحالة» اللي الـ [[<input>]] فيها، وكل حالة ليها شكل وقيمة وقواعد. ولو كتبت نوع المتصفح ميعرفوش، بيتعامل معاه كـ [[text]]، فمفيش نوع بيكسر الصفحة.

القياسات من Chrome 157 على Windows 11. اللي جاي من MDN بس (كيبورد الموبايل وشكل المتصفحات التانية) مكتوب جنبه.

---

## ١. الجدول المرجعي: الـ 22 نوع

| النوع | بيرسم إيه | القيمة اللي بتتبعت | مشروح في |
|---|---|---|---|
| [[<input type="text">]] | خانة نص سطر واحد (الافتراضي) | النص زي ما اتكتب | «form و label» |
| [[<input type="search">]] | خانة نص معناها «كلمة بحث» | النص | «search» |
| [[<input type="tel">]] | خانة نص، وعلى الموبايل كيبورد التليفون | النص من غير أي فحص | «form و label» |
| [[<input type="url">]] | خانة نص بتفحص إن المكتوب عنوان كامل | العنوان | «textarea و date و number» |
| [[<input type="email">]] | خانة نص بتفحص شكل الإيميل | الإيميل | «form و label» |
| [[<input type="password">]] | خانة الحروف فيها نقط | النص **زي ما هو** من غير تشفير | «form و label»، والقسم ٧ هنا |
| [[<input type="number">]] | خانة أرقام بسهمين | الرقم | «textarea و date و number» |
| [[<input type="range">]] | شريط بيتسحب | رقم بين [[min]] و [[max]] | القسم ٣ هنا |
| [[<input type="date">]] | تاريخ ونتيجة | [[2026-11-18]] | «textarea و date و number» |
| [[<input type="time">]] | ساعة ودقايق | [[18:30]] | القسم ٤ هنا |
| [[<input type="datetime-local">]] | تاريخ وساعة مع بعض | [[2026-11-18T18:30]] | القسم ٤ هنا |
| [[<input type="month">]] | شهر وسنة | [[2026-11]] | القسم ٤ هنا |
| [[<input type="week">]] | رقم أسبوع وسنة | [[2026-W47]] | القسم ٤ هنا |
| [[<input type="color">]] | مربع ملوّن بيفتح نافذة ألوان | [[#c8102e]] | القسم ٢ هنا |
| [[<input type="checkbox">]] | مربع صح: كل واحد لوحده | [[on]] أو الـ [[value]]، ولو مش متعلّم مبيتبعتش | «fieldset و radio» |
| [[<input type="radio">]] | دايرة: واحدة بس من المجموعة | [[value]] بتاع المختارة | «fieldset و radio» |
| [[<input type="file">]] | زرار «Choose File» | الملف (أو اسمه بس) | «file و accept و multiple» |
| [[<input type="hidden">]] | ولا حاجة | [[value]] زي ما هو | «GET و POST و enctype» |
| [[<input type="submit">]] | زرار بيبعت الفورم | مبيتبعتش إلا لو هو اللي اتداس وليه [[name]] | القسم ٦ هنا |
| [[<input type="image">]] | صورة بتبعت الفورم | مكان الضغطة: [[x]] و [[y]] | القسم ٥ هنا |
| [[<input type="reset">]] | زرار بيرجّع الحقول لأولها | مبيتبعتش | القسم ٦ هنا |
| [[<input type="button">]] | زرار مبيعملش حاجة لوحده | مبيتبعتش | القسم ٦ هنا |

وده شكلهم كلهم في متصفحك دلوقتي (الشكل بيختلف من متصفح لمتصفح ومن نظام لنظام):

~~~live 312 454 الـ 22 نوع
<p><label>text <input type="text" value="نص"></label>
<label>search <input type="search" value="بحث"></label>
<label>tel <input type="tel" value="01012345678"></label>
<label>url <input type="url" value="https://example.test"></label>
<label>email <input type="email" value="mona@example.test"></label>
<label>password <input type="password" value="s3cret"></label>
<label>number <input type="number" value="3"></label>
<label>range <input type="range"></label></p>
<p><label>date <input type="date" value="2026-11-18"></label>
<label>time <input type="time" value="18:30"></label>
<label>datetime-local <input type="datetime-local" value="2026-11-18T18:30"></label>
<label>month <input type="month" value="2026-11"></label>
<label>week <input type="week" value="2026-W47"></label></p>
<p><label>color <input type="color" value="#c8102e"></label>
<label>checkbox <input type="checkbox" checked></label>
<label>radio <input type="radio" checked></label>
<label>file <input type="file"></label>
<label>hidden (مش ظاهر) <input type="hidden" value="x"></label></p>
<p><label>submit <input type="submit"></label>
<label>image <input type="image" alt="صورة بتبعت" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='24'%3E%3Crect width='60' height='24' rx='6' fill='%230a7ea4'/%3E%3C/svg%3E"></label>
<label>reset <input type="reset"></label>
<label>button <input type="button" value="زرار"></label></p>
~~~

~~~text القياس من Chrome (فورم فيه نوع من كل دول، اتبعت POST للسيرفر المحلي)
color=#000000          لون من غير value: أسود
range=50               شريط من غير value: النص بين 0 و 100
time=18:30
dt=2026-11-18T18:30    (datetime-local)
month=2026-11
week=2026-W47
date=2026-11-18
pw=s3cret              كلمة السر نص عادي
الـ submit والـ reset والـ button: مش في الطلب
~~~

(علامة [[#]] و [[:]] بيتبعتوا في الطلب [[%23]] و [[%3A]]. مكتوبين هنا مفكوكين عشان يتقروا.)

---

## ٢. [[<input type="color">]]

مربع ملوّن. الضغط عليه بيفتح نافذة اختيار اللون بتاعة النظام، فشكلها مش في إيدك.

~~~live 43 اختار لون وبص على القيمة
<form oninput="shown.value = color.value">
  <label for="color">لون الفانلة</label>
  <input id="color" name="color" type="color" value="#0a7ea4">
  <output id="shown">#0a7ea4</output>
</form>
~~~

([[oninput]] بيشتغل مع كل تغيير في أي حقل جوه الفورم، وهنا بينسخ قيمة الحقل للـ [[<output>]]. الاتنين في درس «datalist و output».)

~~~text القياس من Chrome
الحجم الافتراضي:     50 × 27 px
من غير value:        #000000      (أسود)
value="#C8102E":     #c8102e      (الحروف بتبقى صغيرة)
value="#f00":        #ff0000      (المختصر بيتفك)
value="red":         #ff0000      (اسم اللون بيتحوّل)
value="blah":        #000000      (مش لون: بيرجع أسود)
~~~

اللي يهمك:

- القيمة **دايمًا** [[#rrggbb]]: علامة [[#]] و ٦ خانات، بحروف صغيرة. مهما كتبت في [[value]]، ده اللي السيرفر هيستلمه.
- **الحقل ده عمره ما بيبقى فاضي.** لو الزائر ملمسوش، هيتبعت [[#000000]]. فـ [[required]] عليه ملوش معنى، والسيرفر ميقدرش يفرّق بين «اختار أسود» و «مختارش».
- MDN: زمان كانت القيمة المقبولة في [[value]] هي [[#rrggbb]] بس، ودلوقتي أي لون CSS مقبول. فلو لازم تدعم متصفحات أقدم، اكتب [[value]] بالشكل الكامل [[#rrggbb]].

### [[<input type="color" alpha>]] و [[<input type="color" colorspace="display-p3">]]

> ميزة جديدة لسه مش في كل المتصفحات. يعني إيه «مش Baseline» و «ورا flag»، وإزاي تتأكد بنفسك قبل ما تستخدم أي ميزة: درس «Baseline و @supports».

اتنين attributes جداد في المواصفة على حقل اللون:

- [[alpha]]: بيسمح للزائر يختار شفافية اللون، مش لون مصمت بس.
- [[colorspace]]: بيختار مساحة الألوان. القيمة [[limited-srgb]] (الافتراضية) أو [[display-p3]] (ألوان أوسع على الشاشات الحديثة).

~~~text القياس من Chrome 157
'alpha' in HTMLInputElement.prototype       false
'colorSpace' in HTMLInputElement.prototype  false
<input type="color" value="#ff000080" alpha>  →  value = #ff0000   (الشفافية اتشالت)

ولما شغّلنا Chrome بخيار الميزات التجريبية:
<input type="color" value="#ff000080" alpha>  →  value = color(srgb 1 0 0 / 0.501961)
~~~

يعني في Chrome 157 العادي الاتنين **متجاهَلين**، والمنهج بيقول إنهم مش Baseline. ولاحظ إن لما بيشتغلوا، شكل القيمة بيتغيّر من [[#rrggbb]] لـ [[color(...)]]، فكود السيرفر اللي مستني ٧ حروف هيتكسر. **متستخدمهمش دلوقتي.**

---

## ٣. [[<input type="range">]]

شريط عليه دايرة بتتسحب. المواصفة بتقول إنه لقيمة «مش مهم تبقى دقيقة بالظبط»: مستوى صوت، درجة رضا، مستوى لاعب.

~~~live 38 56 اسحب الدايرة
<form oninput="shown.value = level.value">
  <label for="level">مستواك في السباحة (١ مبتدئ، ٥ محترف)</label>
  <input id="level" name="level" type="range" min="1" max="5" value="3">
  <output id="shown">3</output>
</form>
~~~

~~~text القياس من Chrome
من غير أي attribute:                 min=0  max=100  step=1  value=50   (النص)
min="0" max="10" من غير value:       5
min="1" max="7" value="9":           7      (أكبر من max: بيرجع لـ max)
min="1" max="5" step="0.5" value="2.3":   2.5    (بيتقرّب لأقرب خطوة)
min="0" max="10" step="4" value="5":      4      (الخطوات 0 و 4 و 8)
value="abc":                         50     (مش رقم: بيرجع للنص)
الـ role:  slider      الحجم: 129 × 16 px
~~~

- [[min]] و [[max]] طرفين الشريط، والافتراضي ٠ و ١٠٠. و [[step]] المسافة بين كل وقفة والتانية، والافتراضي ١. و [[step="any"]] بيلغي الوقفات.
- **الحقل ده كمان عمره ما بيبقى فاضي ولا غلط.** أي قيمة برّه المدى أو بين خطوتين المتصفح بيصلّحها في صمت. فمفيش رسالة خطأ هتطلع منه أبدًا.
- **الشريط مبيكتبش رقمه.** الزائر شايف دايرة على خط، ومش عارف هي ٣ ولا ٤. عشان كده دايمًا جنبه [[<output>]] بيعرض القيمة (المعاينة اللي فوق)، وطرفين الشريط مكتوبين في الـ label.
- بالكيبورد: الأسهم بتحرّك خطوة، و Home و End بيروحوا للطرفين (ده من ARIA Authoring Practices للـ slider).

**range ولا number؟** لو الرقم بالظبط مهم (سن، كمية، سعر): [[number]]. لو المهم «قد إيه تقريبًا»: [[range]].

---

## ٤. الوقت والتاريخ: [[<input type="time">]] وإخواته

[[type="date"]] اتشرح في درس «textarea و date و number». باقي العيلة ٤ أنواع، وكلهم بنفس القاعدة: **الشكل اللي الزائر شايفه بيتبع لغة متصفحه، والقيمة اللي بتتبعت شكلها ثابت.**

~~~live 168 الأربعة
<p><label for="t">الميعاد</label> <input id="t" type="time" value="18:30"></p>
<p><label for="dt">ميعاد الماتش</label> <input id="dt" type="datetime-local" value="2026-11-18T18:30"></p>
<p><label for="m">شهر بداية الاشتراك</label> <input id="m" type="month" value="2026-11"></p>
<p><label for="w">أسبوع المعسكر</label> <input id="w" type="week" value="2026-W47"></p>
~~~

**هتشوف إيه:** في Chrome إنجليزي على Windows الأربعة ظهروا كده: [[06:30 PM]] و [[11/18/2026 06:30 PM]] و [[November 2026]] و [[Week 47, 2026]]. عندك ممكن يظهروا بشكل تاني، بس القيمة هي هي:

| النوع | القيمة اللي بتتبعت | الشكل |
|---|---|---|
| [[time]] | [[18:30]] | [[HH:MM]] بنظام ٢٤ ساعة دايمًا، حتى لو الزائر شايف PM |
| [[datetime-local]] | [[2026-11-18T18:30]] | تاريخ، وحرف [[T]]، وساعة |
| [[month]] | [[2026-11]] | [[YYYY-MM]] |
| [[week]] | [[2026-W47]] | السنة، و [[W]]، ورقم الأسبوع |

### [[<input type="time">]]

~~~text القياس من Chrome
value="18:30"        →  18:30        valueAsNumber = 66600000   (ملّي ثانية من نص الليل = 18.5 ساعة)
value="18:30:15"     →  18:30:15     (الثواني بتظهر لو اتكتبت)
value="6pm"          →  ""           (مش بالشكل المطلوب: الحقل بيبدأ فاضي)
~~~

[[min]] و [[max]] و [[step]] بيشتغلوا عليه. و [[step]] هنا **بالثواني**:

~~~text القياس من Chrome (min="09:00" max="22:00" step="900")
18:40   stepMismatch = true    الرسالة: Please enter a valid value. The two nearest valid values are 6:30 PM and 6:45 PM.
23:00   rangeOverflow = true   الرسالة: Value must be 10:00 PM or earlier.
~~~

### [[<input type="datetime-local">]]

تاريخ وساعة في حقل واحد. كلمة **local** معناها إن القيمة **من غير منطقة زمنية**: [[2026-11-18T18:30]] يعني «ستة ونص مساءً» على ساعة الزائر، ومحدش عارف دي في أنهي بلد.

~~~text القياس من Chrome
value="2026-11-18T18:30"       →  2026-11-18T18:30
value="2026-11-18 18:30"       →  2026-11-18T18:30    (المسافة بتتحوّل T)
value="2026-11-18T18:30:00Z"   →  ""                  (Z يعني منطقة زمنية: مرفوض)
~~~

مناسب لميعاد في مكان واحد (ماتش في النادي). لو الميعاد لناس في بلاد مختلفة (اجتماع أونلاين)، السيرفر لازم يعرف المنطقة الزمنية من حقل تاني.

### [[<input type="month">]] و [[<input type="week">]]

- [[month]]: شهر وسنة من غير يوم. مناسب لتاريخ انتهاء كارت، أو «شهر بداية الاشتراك».
- [[week]]: أسبوع من السنة. الأسابيع بتتعد بنظام ISO: الأسبوع بيبدأ الاتنين، و [[2026-W47]] هو الأسبوع اللي أوله الاتنين ١٦ نوفمبر ٢٠٢٦ (اتقاس: [[valueAsDate]] رجّع [[2026-11-16]]).

~~~text القياس من Chrome
type="month" value="11/2026"    →  ""     (الشكل لازم YYYY-MM)
type="week"  value="2026-W54"   →  ""     (مفيش أسبوع 54)
~~~

**الدعم:** المنهج و MDN بيقولوا إن [[month]] و [[week]] **مش Baseline**: حسب جدول MDN، Firefox و Safari على الكمبيوتر مبيدعموهمش، والحقل هناك بيبقى خانة نص عادية. فلو كتبتهم:

- اكتب الشكل المطلوب في الـ label («الشهر، بالشكل 2026-11») وحط [[pattern]] يفحصه (درس «form و label»)، عشان اللي هيكتب بإيده يكتب صح.
- أو استخدم البديل اللي شغال في كل حتة: [[<select>]] للشهر و [[<input type="number">]] للسنة.

[[time]] و [[datetime-local]] و [[date]] شغالين في كل المتصفحات الأساسية حسب MDN.

---

## ٥. [[<input type="image">]]

زرار إرسال شكله صورة. [[src]] مسار الصورة و [[alt]] اسم الزرار، زي [[<img>]] بالظبط (درس «img»).

~~~html
<input type="image" name="pos" src="images/send.png" alt="ابعت الطلب">
~~~

~~~text القياس من Chrome
الـ role: button      الاسم: ابعت الطلب   (من alt)
من غير alt:           الاسم بقى «Submit»  (المتصفح حط كلمة من عنده)

الطلب اللي وصل السيرفر لما الصورة اتداست:
a=1&pos.x=0&pos.y=0
~~~

الغريب فيه: بيبعت **مكان الضغطة** جوه الصورة: [[pos.x]] و [[pos.y]] بالبيكسل من ركن الصورة. (في القياس الضغطة كانت بكود فطلعت ٠ و ٠. بالماوس هتبقى الأرقام الحقيقية.) ده كان بيتستخدم زمان لخريطة الزائر بيدوس على مكان فيها.

النهارده مش محتاجه: [[<button>]] بيقبل صورة جواه، ومبيبعتش أرقام زيادة:

~~~html
<button type="submit"><img src="images/send.png" alt="ابعت الطلب"></button>
~~~

---

## ٦. [[<input type="submit">]] و [[<input type="reset">]] و [[<input type="button">]]

التلاتة أزرار بالشكل القديم (من قبل ما [[<button>]] يتعمل). الكلام اللي على الزرار بييجي من [[value]].

~~~live 82 اكتب في الحقل وبعدين دوس «Reset»
<form onsubmit="return false">
  <p><label for="n">الاسم</label> <input id="n" name="name" value="منى"></p>
  <input type="submit">
  <input type="reset">
  <input type="button" value="زرار">
</form>
~~~

~~~text القياس من Chrome
<input type="submit"> من غير value:   مكتوب عليه «Submit»   (role: button)
<input type="reset">  من غير value:   مكتوب عليه «Reset»    (role: button)
<input type="button"> من غير value:   فاضي، عرضه 16px

غيّرنا الاسم لـ «changed» ودوسنا reset:   القيمة رجعت «منى»
~~~

- [[submit]]: بيبعت الفورم. نفس [[<button type="submit">]].
- [[button]]: مبيعملش حاجة لوحده. مستني JavaScript. نفس [[<button type="button">]].
- [[reset]]: بيرجّع **كل** حقول الفورم لقيمتها الأولى، يعني لـ [[value]] المكتوب في الكود (مش بيفضّيها: الاسم رجع «منى» مش فاضي).
- من غير [[value]] الكلمة اللي على الزرار بتيجي من المتصفح بلغته هو. في صفحة عربي اكتب [[value]] دايمًا.

### ليه [[reset]] فكرة وحشة

الزائر ملا فورم من ١٠ حقول، وإيده راحت على «امسح» بدل «ابعت» (والاتنين جنب بعض ونفس الشكل). كل اللي كتبه راح بضغطة، ومفيش تراجع. ومين أصلًا محتاج يمسح فورم كله؟ اللي غلط في حقل بيصلّحه.

MDN بينصح صراحة: متحطش زرار reset في الفورم إلا لو فيه سبب حقيقي. ولو حطيته: بعيد عن زرار الإرسال، وشكله أهدى.

### [[<input>]] ولا [[<button>]]؟

[[<button>]] أحسن في كل حاجة: الكلام بيتكتب بين الفتحة والقفلة فممكن يبقى فيه أيقونة أو [[<strong>]]، وتنسيقه أسهل. الأزرار الـ [[<input>]] هتقابلها في كود قديم، فلازم تعرف تقراها. درس «أزرار الفورم: formaction وإخواته» كله عن [[<button>]].

---

## ٧. خانات النص: نفس الخانة، ومعنى مختلف

[[text]] و [[search]] و [[tel]] و [[url]] و [[email]] و [[password]] كلهم خانة نص بنفس الحجم (اتقاس: ١٧٧ × ٢١ px). الفرق في تلات حاجات:

| النوع | الفحص | كيبورد الموبايل (من MDN) | role في Chrome |
|---|---|---|---|
| [[text]] | مفيش | العادي | [[textbox]] |
| [[search]] | مفيش | العادي، وزرار Enter ممكن يتكتب عليه «بحث» | [[searchbox]] |
| [[tel]] | مفيش (أشكال التليفونات كتير): استخدم [[pattern]] | لوحة أرقام التليفون | [[textbox]] |
| [[url]] | لازم عنوان كامل بـ [[https://]] | فيه [[/]] و [[.com]] | [[textbox]] |
| [[email]] | لازم شكل إيميل | فيه [[@]] و [[.]] | [[textbox]] |
| [[password]] | مفيش | العادي، والحروف نقط | [[textbox]] |

- شكل الكيبورد من MDN ومش متقاس هنا (محتاج موبايل حقيقي).
- عايز لوحة أرقام من غير ما تغيّر النوع؟ [[inputmode="numeric"]] (درس «textarea و date و number»).
- [[password]] بيخبّي الحروف **عن اللي واقف وراك** بس. في الطلب القيمة نص عادي (شفتها في القياس: [[pw=s3cret]]). ومعاه دايمًا [[autocomplete="current-password"]] في الدخول و [[autocomplete="new-password"]] في التسجيل، عشان مدير كلمات السر يشتغل.

---

## ٨. لو النوع مش معروف

~~~text القياس من Chrome
<input type="foo">        →  input.type = text
<input type="datetime">   →  input.type = text     (نوع قديم اتشال من المواصفة)
<input>                   →  input.type = text
~~~

المتصفح اللي ميعرفش نوع بيرسم خانة نص، والقيمة بتتبعت زي ما اتكتبت. دي اللي بتخلّي الأنواع الجديدة آمنة: في أسوأ الأحوال الزائر هيكتب بإيده. بس معناها كمان إن **السيرفر لازم يفحص الشكل**: ممكن ييجيله «نوفمبر ٢٠٢٦» في حقل كان المفروض [[2026-11]].

---

## ٩. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[range]] من غير رقم ظاهر جنبه | الزائر بيخمّن هو اختار كام |
| [[range]] لقيمة لازم تبقى دقيقة (سن، سعر) | صعب تقف على الرقم اللي عايزه |
| [[required]] على [[color]] أو [[range]] | ملوش تأثير: الحقلين دايمًا فيهم قيمة |
| [[step="15"]] على [[time]] عشان ربع ساعة | الـ step بالثواني: ١٥ يعني ١٥ ثانية. الصح [[900]] |
| [[value="6:30 PM"]] على [[time]] | مش [[HH:MM]]: الحقل بيبدأ فاضي |
| [[month]] أو [[week]] من غير بديل | خانة نص في Firefox و Safari على الكمبيوتر (MDN) |
| [[type="image"]] من غير [[alt]] | زرار اسمه «Submit» أو من غير اسم |
| [[reset]] جنب [[submit]] | ضغطة غلط بتمسح الفورم |
| [[type="datetime"]] | نوع ملغي: خانة نص |
| تفتكر [[password]] بيشفّر | بيخبّي على الشاشة بس |

---

## الخلاصة

- [[type]] بيحدد الشكل والقيمة والكيبورد والفحص. النوع اللي المتصفح ميعرفوش بيبقى [[text]].
- [[color]] بيبعت [[#rrggbb]]، و [[range]] بيبعت رقم، والاتنين عمرهم ما بيبقوا فاضيين.
- [[range]] محتاج [[min]] و [[max]] ورقم ظاهر جنبه.
- [[time]] ([[HH:MM]]) و [[datetime-local]] و [[month]] ([[YYYY-MM]]) و [[week]] ([[YYYY-Www]]): الشكل المعروض بيتغيّر، والقيمة ثابتة.
- [[month]] و [[week]] مش في كل المتصفحات: جهّز بديل.
- [[image]] و [[submit]] و [[reset]] و [[button]] أزرار قديمة: استخدم [[<button>]]، وابعد عن reset.`,
          try: R`اعمل ملف [[types.html]] فيه فورم [[method="get"]] و [[action="types.html"]] جواه: [[color]] اسمه [[c]] من غير value، و [[range]] اسمه [[r]] من غير أي attribute تاني، و [[time]] اسمه [[t]]، وزرار. دوس الزرار **من غير ما تلمس أي حقل** وبص على شريط العنوان. مين اتبعت بقيمة ومين اتبعت فاضي؟`,
          sol: R`~~~html types.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>أنواع</title>
</head>
<body>
<form action="types.html" method="get">
  <p><label for="c">اللون</label> <input id="c" name="c" type="color"></p>
  <p><label for="r">المستوى</label> <input id="r" name="r" type="range"></p>
  <p><label for="t">الميعاد</label> <input id="t" name="t" type="time"></p>
  <button type="submit">ابعت</button>
</form>
</body>
</html>
~~~

~~~view 208 شكل الصفحة (الإرسال هنا بيتكتب تحت بدل ما يتبعت)
<form onsubmit="event.preventDefault(); sent.value = decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
  <p><label for="c">اللون</label> <input id="c" name="c" type="color"></p>
  <p><label for="r">المستوى</label> <input id="r" name="r" type="range"></p>
  <p><label for="t">الميعاد</label> <input id="t" name="t" type="time"></p>
  <button type="submit">ابعت</button>
</form>
<p>اللي كان هيتبعت: <output id="sent">(لسه)</output></p>
~~~

**هتشوف إيه:**

- العنوان بقى آخره [[?c=%23000000&r=50&t=]].
- اللون اتبعت أسود ([[%23]] هي علامة [[#]] متشفّرة) مع إنك مختارتش حاجة.
- الشريط اتبعت [[50]]: النص بين ٠ و ١٠٠.
- الميعاد اتبعت **فاضي** ([[t=]]): ده الوحيد في التلاتة اللي بيبدأ من غير قيمة، فهو الوحيد اللي [[required]] ليه معنى عليه.

~~~text القياس من Chrome (الطلب اللي وصل السيرفر المحلي)
GET /types.html?c=%23000000&r=50&t=
~~~`,
          deep: {
            why: R`النوع الصح بيدّيك تلات حاجات ببلاش: واجهة جاهزة (نتيجة، ساعة، نافذة ألوان) من غير سطر JavaScript، وكيبورد مناسب على الموبايل، وقيمة شكلها ثابت السيرفر يقراها من غير تخمين. والنوع الغلط بيعمل العكس: زائر بيكتب تاريخ بتلات أشكال مختلفة في خانة نص، وسيرفر بيحاول يفهمهم.`,
            how: R`كل نوع ليه في المواصفة «خوارزمية تنضيف القيمة» (value sanitization): لما القيمة تتحط (من [[value]] في الكود أو من الزائر)، المتصفح بيعدّيها عليها. [[color]] بيحوّلها لـ [[#rrggbb]] أو يحط أسود. [[range]] بيقرّبها لأقرب خطوة جوه المدى أو يحط النص. [[time]] و [[month]] و [[week]] بيقبلوا الشكل المحدد بس وإلا يفضّوا الحقل. عشان كده الأنواع دي مستحيل تبعت قيمة شكلها غلط من متصفح بيدعمها. والمتصفح اللي مبيدعمش النوع بيعامله كـ [[text]] من غير تنضيف.`,
            when: R`[[color]]: لون ثيم أو منتج، لما أي لون مقبول (لو الاختيارات ٥ ألوان بس، [[radio]] أحسن). [[range]]: قيمة تقريبية في مدى صغير. [[time]]: ميعاد في اليوم. [[datetime-local]]: ميعاد حدث في مكان واحد. [[month]]: شهر وسنة، مع بديل. [[week]]: نادر، وفي أنظمة الشغل والجداول. [[image]] و [[reset]]: تقراهم في كود قديم ومتكتبهمش.`,
            mistakes: R`[[range]] من غير [[<output>]] جنبه. [[step]] على [[time]] بالدقايق بدل الثواني. [[required]] على [[color]] أو [[range]]. [[month]] و [[week]] من غير بديل لـ Firefox و Safari. تثق إن القيمة جاية بالشكل الصح من غير فحص على السيرفر. [[type="image"]] من غير [[alt]]. وزرار reset جنب زرار الإرسال.`
          },
          practice: [
            { lvl: 'تطبيق', t: R`**ابني:** فورم «احجز ملعب» في «نادي الموج». كل سطر في البداية محتاج حقل بالنوع المناسب: الميعاد من ٩ الصبح لـ ١٠ بالليل وكل نص ساعة، وعدد اللاعبين شريط من ٢ لـ ١٠، ولون الفانلات، وشهر الحجز. (من قسم ١ و ٢ و ٣ و ٤ في الشرح)`, done: R`كل حقل بالنوع الصح وليه [[<label>]] و [[name]]، وكل الشروط ✓.`, work: { h: 309, start: R`<h1>احجز ملعب</h1>
<form>
  الميعاد
  عدد اللاعبين (من ٢ لـ ١٠)
  لون الفانلات
  شهر الحجز
  <button>احجز</button>
</form>`, checks: [
              { say: R`الميعاد [[type="time"]] بين [[09:00]] و [[22:00]]`, q: "input[type=\"time\"][min=\"09:00\"][max=\"22:00\"]" },
              { say: R`الميعاد كل نص ساعة: [[step="1800"]] (بالثواني)`, q: "input[type=\"time\"][step=\"1800\"]" },
              { say: R`عدد اللاعبين [[type="range"]] من ٢ لـ ١٠`, q: "input[type=\"range\"][min=\"2\"][max=\"10\"]" },
              { say: R`لون الفانلات [[type="color"]]`, q: "input[type=\"color\"]" },
              { say: R`شهر الحجز [[type="month"]]`, q: "input[type=\"month\"]" },
              { say: R`الأربع حقول ليهم [[name]] و [[<label>]]`, q: "label[for]", n: 4 },
            ] }, sol: R`~~~live 309 الحل
<h1>احجز ملعب</h1>
<form onsubmit="event.preventDefault(); sent.value = decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
  <p><label for="at">الميعاد</label> <input id="at" name="at" type="time" min="09:00" max="22:00" step="1800" value="18:00"></p>
  <p><label for="players">عدد اللاعبين (من ٢ لـ ١٠)</label> <input id="players" name="players" type="range" min="2" max="10" value="6"></p>
  <p><label for="color">لون الفانلات</label> <input id="color" name="color" type="color" value="#0a7ea4"></p>
  <p><label for="month">شهر الحجز</label> <input id="month" name="month" type="month" value="2026-12"></p>
  <button>احجز</button>
</form>
<p>اللي كان هيتبعت: <output id="sent">(لسه)</output></p>
~~~

**هتشوف إيه:**

- أربع حقول كل واحد بشكل: ساعة، وشريط، ومربع لون، وشهر.
- دوس «احجز»: [[at=18:00&players=6&color=#0a7ea4&month=2026-12]]. كل قيمة بشكلها الثابت.
- جرّب تكتب في الميعاد [[18:10]] وتدوس «احجز»: المتصفح هيرفض ويقولك أقرب ميعادين.

**ليه كده:**

- [[step="1800"]]: نص ساعة = ٣٠ × ٦٠ ثانية.
- الشريط مناسب هنا لأن المدى صغير (٩ قيم) وطرفيه مكتوبين في الـ label.
- [[month]] مش [[date]] لأن الحجز بالشهر.

**الغلطة الشائعة:** [[step="30"]] على الميعاد. ده ٣٠ ثانية، فالحقل هيقبل [[18:10]] عادي ومش هتلاحظ إلا لما حجزين يتداخلوا.

~~~text القياس من Chrome
step="1800" والقيمة 18:10:   stepMismatch = true
step="30"   والقيمة 18:10:   stepMismatch = false
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** فورم بطولة النادي كل حقوله بالنوع الغلط: ميعاد الماتش خانة نص، والسن شريط، والنوع [[datetime]] اللي اتلغى، وزرار «امسح» جنب «سجّل». صلّح الأربعة. (من قسم ٣ و ٤ و ٦ و ٩ في الشرح)`, done: R`ميعاد الماتش [[datetime-local]]، والسن [[number]]، وميعاد التمرين [[time]]، ومفيش زرار reset، وكل الشروط ✓.`, work: { h: 159, start: R`<form>
  <p><label for="match">ميعاد الماتش</label> <input id="match" name="match" type="datetime"></p>
  <p><label for="age">السن</label> <input id="age" name="age" type="range" min="6" max="60"></p>
  <p><label for="train">ميعاد التمرين</label> <input id="train" name="train" type="text" placeholder="6:30 PM"></p>
  <input type="reset" value="امسح">
  <input type="submit" value="سجّل">
</form>`, checks: [
              { say: R`ميعاد الماتش [[type="datetime-local"]]`, q: "input#match[type=\"datetime-local\"]" },
              { say: R`السن [[type="number"]] ولسه بين ٦ و ٦٠`, q: "input#age[type=\"number\"][min=\"6\"][max=\"60\"]" },
              { say: R`ميعاد التمرين [[type="time"]]`, q: "input#train[type=\"time\"]" },
              { say: R`مفيش زرار reset`, q: "[type=\"reset\"]", n: 0 },
              { say: R`لسه فيه زرار إرسال`, q: "input[type=\"submit\"], button:not([type=\"button\"])" },
            ] }, sol: R`~~~live 159 بعد التصليح
<form onsubmit="return false">
  <p><label for="match">ميعاد الماتش</label> <input id="match" name="match" type="datetime-local"></p>
  <p><label for="age">السن</label> <input id="age" name="age" type="number" min="6" max="60"></p>
  <p><label for="train">ميعاد التمرين</label> <input id="train" name="train" type="time"></p>
  <button type="submit">سجّل</button>
</form>
~~~

وده اللي كان باين قبل التصليح:

~~~live 157 قبل
<form onsubmit="return false">
  <p><label for="match">ميعاد الماتش</label> <input id="match" name="match" type="datetime"></p>
  <p><label for="age">السن</label> <input id="age" name="age" type="range" min="6" max="60"></p>
  <p><label for="train">ميعاد التمرين</label> <input id="train" name="train" type="text" placeholder="6:30 PM"></p>
  <input type="reset" value="امسح">
  <input type="submit" value="سجّل">
</form>
~~~

**هتشوف إيه:**

- قبل: ميعاد الماتش خانة نص فاضية (النوع [[datetime]] مش معروف)، والسن شريط من غير رقم، وميعاد التمرين خانة نص.
- بعد: ميعاد الماتش بقى حقل تاريخ وساعة بنتيجة، والسن خانة أرقام بسهمين، وميعاد التمرين حقل ساعة.
- زرار «امسح» اختفى.

| المشكلة | التصليح | ليه |
|---|---|---|
| [[type="datetime"]] | [[datetime-local]] | النوع القديم اتلغى وبيتعامل كـ [[text]] |
| السن [[range]] | [[number]] | السن رقم دقيق، والشريط من غير رقم ظاهر |
| ميعاد في [[text]] | [[time]] | كل زائر كان هيكتبه بشكل |
| [[reset]] جنب [[submit]] | اتشال | ضغطة غلط بتمسح الفورم |

**الغلطة الشائعة:** تسيب [[placeholder="6:30 PM"]] على حقل [[time]]. الـ placeholder مبيظهرش على الأنواع اللي ليها واجهة خاصة، والقيمة أصلًا مش بالشكل ده.

~~~text القياس من Chrome
<input type="datetime">  →  input.type = text
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع، وبعدين صلّح:** فورم تقييم المدرب فيه شريط [[min="1" max="7" value="9"]] ولون [[value="blah"]]. اكتب على ورقة القيمتين اللي هيتبعتوا ودوس «قيّم» وقارن. وبعدين صلّح الشريط عشان التقييم يبقى من ١ لـ ١٠ ويبدأ من ٥. (من قسم ٢ و ٣ في الشرح: المتصفح بيصلّح القيمة في صمت)`, done: R`توقّعت [[rate=7]] و [[color=#000000]]، وبعد التصليح الشريط بقى من ١ لـ ١٠ وبيبدأ من ٥.`, work: { h: 168, start: R`<form onsubmit="event.preventDefault(); sent.value = decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
  <p><label for="rate">تقييم المدرب (من ١ لـ ٧)</label> <input id="rate" name="rate" type="range" min="1" max="7" value="9"></p>
  <p><label for="color">لون الشارة</label> <input id="color" name="color" type="color" value="blah"></p>
  <button>قيّم</button>
</form>
<p>اللي كان هيتبعت: <output id="sent">(دوس «قيّم»)</output></p>`, checks: [
              { say: R`الشريط من ١ لـ ١٠`, q: "input[type=\"range\"][min=\"1\"][max=\"10\"]" },
              { say: R`الشريط بيبدأ من ٥`, q: "input[type=\"range\"][value=\"5\"]" },
              { say: R`الـ [[<label>]] بقى مكتوب فيه «١٠» مش «٧»`, q: "label[for=\"rate\"]", has: "١٠" },
              { say: R`حقل اللون لسه موجود وليه [[name]]`, q: "input[type=\"color\"][name]" },
            ] }, sol: R`~~~live 168 بعد التصليح
<form onsubmit="event.preventDefault(); sent.value = decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
  <p><label for="rate">تقييم المدرب (من ١ لـ ١٠)</label> <input id="rate" name="rate" type="range" min="1" max="10" value="5"></p>
  <p><label for="color">لون الشارة</label> <input id="color" name="color" type="color" value="#0a7ea4"></p>
  <button>قيّم</button>
</form>
<p>اللي كان هيتبعت: <output id="sent">(دوس «قيّم»)</output></p>
~~~

**هتشوف إيه:**

- قبل التصليح: الدايرة في آخر الشريط، ومربع اللون أسود. والناتج [[rate=7&color=#000000]].
- بعد التصليح: الدايرة قرب النص، والناتج [[rate=5&color=#0a7ea4]].

**ليه:** [[value="9"]] أكبر من [[max="7"]]، فالمتصفح رجّعها لـ ٧ من غير أي رسالة. و [[blah]] مش لون، فالحقل أخد اللون الافتراضي الأسود. النوعين دول مبيطلّعوش أخطاء: بيصلّحوا في صمت.

**الغلطة الشائعة:** تغيّر [[max]] وتنسى الـ label. الشريط مبيكتبش أرقامه، فالزائر هيصدّق الـ label اللي بيقول «لـ ٧» ويسحب للآخر وهو فاكر إنه ادّى الدرجة النهائية من ٧.

~~~text القياس من Chrome
<input type="range" min="1" max="7" value="9">   →  value = 7
<input type="color" value="blah">                →  value = #000000
~~~` },
            { lvl: 'تطبيق', t: R`**refactor:** الأزرار دي شغالة بس مكتوبة بالشكل القديم: زرار صورة من غير [[alt]]، وزرارين [[<input>]]. حوّلهم لـ [[<button>]] من غير ما تغيّر اللي كل زرار بيعمله، وشيل اللي ملوش لازمة. (من قسم ٥ و ٦ في الشرح)`, done: R`مفيش [[<input type="image">]] ولا [[<input type="submit">]] ولا reset، وفيه [[<button type="submit">]] جواه صورة ليها [[alt]]، وكل الشروط ✓.`, work: { h: 120, start: R`<form>
  <p><label for="q">دوّر على لاعب</label> <input id="q" name="q" type="search"></p>
  <input type="image" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='10' cy='10' r='7' fill='none' stroke='%230a7ea4' stroke-width='3'/%3E%3Cpath d='M15 15l7 7' stroke='%230a7ea4' stroke-width='3'/%3E%3C/svg%3E">
  <input type="reset" value="امسح">
  <input type="button" value="بحث متقدم">
</form>`, checks: [
              { say: R`مفيش [[<input type="image">]]`, q: "input[type=\"image\"]", n: 0 },
              { say: R`زرار الإرسال بقى [[<button type="submit">]] وجواه [[<img>]]`, q: "button[type=\"submit\"] img" },
              { say: R`الصورة ليها [[alt]] مكتوب فيه اسم الزرار`, q: "button img[alt]:not([alt=\"\"])" },
              { say: R`«بحث متقدم» بقى [[<button type="button">]]`, q: "button[type=\"button\"]", has: "بحث متقدم" },
              { say: R`مفيش زرار reset`, q: "[type=\"reset\"]", n: 0 },
            ] }, sol: R`~~~live 94 بعد
<form onsubmit="return false">
  <p><label for="q">دوّر على لاعب</label> <input id="q" name="q" type="search"></p>
  <button type="submit"><img alt="دوّر" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='10' cy='10' r='7' fill='none' stroke='%230a7ea4' stroke-width='3'/%3E%3Cpath d='M15 15l7 7' stroke='%230a7ea4' stroke-width='3'/%3E%3C/svg%3E"></button>
  <button type="button">بحث متقدم</button>
</form>
~~~

**هتشوف إيه:** نفس العدسة، بس بقت جوه زرار ليه إطار، وجنبها «بحث متقدم». زرار «امسح» اختفى: حقل بحث واحد مش محتاج زرار يمسحه.

**ليه كده:**

- [[<input type="image">]] كان بيبعت [[x]] و [[y]] مع كلمة البحث، ومن غير [[alt]] كان اسمه عند قارئ الشاشة «Submit». [[<button>]] جواه [[<img alt="دوّر">]] بيبعت الكلمة بس، واسمه «دوّر».
- [[<input type="button">]] و [[<button type="button">]] نفس السلوك: مبيبعتوش. كتبنا [[type="button"]] صريح لأن [[<button>]] من غير type جوه فورم بيبعت (درس «أزرار الفورم: formaction وإخواته»).

**الغلطة الشائعة:** تكتب [[<button>بحث متقدم</button>]] من غير type. الزرار هيبعت الفورم بدل ما يفتح البحث المتقدم.

~~~text القياس من Chrome
قبل:   input type=image من غير alt   →  role=button  الاسم «Submit»      وبيبعت: q=...&x=0&y=0
بعد:   button > img alt="دوّر"       →  role=button  الاسم «دوّر»        وبيبعت: q=...
~~~` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** افتح صفحة [[<input>]] على MDN (اللينك تحت الدرس) ودوّر على جدول الأنواع. طلّع منه: مين من الـ 22 نوع عليه علامة إنه مش مدعوم في كل المتصفحات؟ وإيه النوع اللي الصفحة بتقول عليه deprecated؟ (من قسم ٤ و ٨ في الشرح)`, done: R`كتبت اسم النوعين اللي دعمهم ناقص، والنوع الملغي، وإيه اللي بيحصل في المتصفح اللي مبيدعمش.`, sol: R`**إجابة نموذجية:**

- **دعمهم ناقص:** [[month]] و [[week]]. صفحة كل واحد فيهم على MDN فيها جدول Browser compatibility، وفيه إن Firefox و Safari على الكمبيوتر مبيدعموهمش. (وفي منهج الكورس ده، المبني على بيانات Baseline، [[color]] كمان متعلّم عليه «مش Baseline» بسبب اختلافات في بعض المتصفحات، مع إن الحقل الأساسي شغال في Chrome.)
- **الملغي (deprecated):** [[datetime]]. كان المفروض يبقى تاريخ وساعة بمنطقة زمنية، ومحدش نفّذه، واتشال. البديل [[datetime-local]].
- **اللي بيحصل في متصفح مبيدعمش:** الحقل بيبقى [[type="text"]]. الزائر بيكتب بإيده، والقيمة بتتبعت زي ما كتبها.

~~~text القياس من Chrome 157
<input type="datetime">   →  input.type = text
<input type="month">      →  input.type = month     (Chrome بيدعمه)
<input type="week">       →  input.type = week      (Chrome بيدعمه)
~~~

**الطريقة اللي تتعلمها من التمرين:** قبل ما تستخدم أي نوع (أو أي عنصر) جديد عليك، انزل لآخر صفحته في MDN وبص على جدول Browser compatibility. خانة حمرا في متصفح أساسي = لازم بديل.` }
          ]
        },
        {
          cmd: "file و accept و multiple",
          title: "رفع الملفات: type=file و accept و multiple وشكل الطلب",
          pre: [{ to: "css/GET و POST و enctype", why: R`شكل طلب [[multipart/form-data]] والـ [[boundary]] اتشرحوا هناك في القسم ٣` }],
          ref: [
            { t: "MDN: <input type=\"file\">", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/file" },
            { t: "MDN: accept", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/accept" },
            { t: "MDN: multiple", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/multiple" },
            { t: "MDN: capture", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/capture" },
            { t: "WHATWG: File Upload state (type=file)", url: "https://html.spec.whatwg.org/multipage/input.html#file-upload-state-(type=file)" }
          ],
          desc: R`[[<input type="file">]] بيخلّي الزائر يختار ملف (أو كذا ملف) من جهازه عشان يتبعت مع الفورم. معاه attributes ليه هو بس: [[accept]] (أنواع الملفات اللي نافذة الاختيار تعرضها)، و [[multiple]] (أكتر من ملف)، و [[capture]] (افتح الكاميرا على الموبايل).
والملف مبيتبعتش إلا لو الفورم [[method="post"]] و [[enctype="multipart/form-data"]]. من غيرهم اللي بيوصل السيرفر اسم الملف بس.`,
          example: R`<form action="/join" method="post" enctype="multipart/form-data">
  <label for="photo">صورة شخصية (JPG أو PNG، أقصى حجم ٢ ميجا)</label>
  <input id="photo" name="photo" type="file" accept="image/jpeg, image/png" required>
  <label for="docs">صور البطاقة: الوش والضهر</label>
  <input id="docs" name="docs" type="file" accept="image/*, .pdf" multiple>
  <button type="submit">ارفع</button>
</form>`,
          flag: "script",
          lines: [
            R`التلاتة لازم مع بعض في أي فورم فيه ملف: [[action]] (الملف يروح فين)، و [[method="post"]] (الملف في جسم الطلب)، و [[enctype="multipart/form-data"]] (الشكل اللي بيشيل محتوى الملف).`,
            R`الـ label بيقول للزائر المطلوب **قبل** ما يختار: نوع الملف وأقصى حجم. الـ HTML مبيعرضش الشروط دي لوحده.`,
            R`[[type="file"]] بيرسم زرار اختيار الملف. [[accept="image/jpeg, image/png"]] نوعين مفصولين بفاصلة: نافذة الاختيار هتعرض الـ JPG والـ PNG بس. و [[required]]: الفورم مش هيتبعت من غير ملف.`,
            R`label الحقل التاني. كلمة «الوش والضهر» بتفهّم الزائر إنه هيختار ملفين.`,
            R`[[multiple]] بيسمح باختيار أكتر من ملف في نفس الحقل. و [[accept="image/*, .pdf"]]: أي صورة ([[image/*]])، أو ملف امتداده [[.pdf]].`,
            R`زرار الإرسال. الرفع بيبدأ لحظة الضغط عليه، مش لحظة اختيار الملف: اختيار الملف بيسجّله في الحقل بس.`,
            R`[[</form>]] آخر الفورم: الحقلين والزرار اللي فوقه هم اللي بيتبعتوا في الطلب.`
          ],
          teach: R`## الفكرة في سطرين

حقل الملف مختلف عن كل الحقول: قيمته مش نص الزائر كتبه، دي **ملف على جهازه**. عشان كده المتصفح بيحميه: الصفحة متقدرش تختار ملف من عندها، ومتقدرش تعرف مساره الحقيقي.

القياسات من Chrome 157 على Windows 11. الملفات في القياسات اتحطت في الحقل بكود (من غير نافذة الاختيار)، واتبعتت للسيرفر المحلي اللي في درس «GET و POST و enctype».

---

## ١. [[<input type="file">]]: الشكل والقيمة

~~~live 79 97 اختار ملف وشوف المتصفح عرف عنه إيه
<form onchange="shown.value = photo.files.length + ' ملف: ' + Array.from(photo.files, f => f.name + ' (' + f.size + ' بايت، النوع ' + (f.type || 'مش معروف') + ')').join(' و ')">
  <label for="photo">صورة شخصية</label>
  <input id="photo" name="photo" type="file">
  <p><output id="shown">(لسه مختارتش)</output></p>
</form>
~~~

(سطر [[onchange]] بيشتغل لما قيمة حقل تتغيّر، وهنا بيكتب عدد الملفات واسم وحجم ونوع كل واحد. للمعاينة بس.)

**هتشوف إيه:**

- زرار مكتوب عليه «Choose File» وجنبه «No file chosen». الكلمتين من المتصفح بلغته هو، ومش في إيدك تغيّرهم من الـ HTML.
- بعد ما تختار ملف: اسم الملف بيظهر مكان «No file chosen»، والسطر اللي تحت بيكتب اسمه وحجمه ونوعه.
- الملف لسه على جهازك: مفيش حاجة اتبعتت.

~~~text القياس من Chrome (بعد اختيار ملف اسمه id-card.txt حجمه 11 بايت)
الحجم الافتراضي:    253 × 21 px        الـ role: button
input.value         C:\fakepath\id-card.txt
input.files.length  1
files[0].name       id-card.txt
files[0].size       11
files[0].type       text/plain
~~~

كل رقم معناه إيه:

- [[input.value]] هو **اسم الملف وقبله [[C:\fakepath\]]**. ده مش مسار حقيقي: MDN بيقول إن المتصفح بيخبّي المسار الحقيقي عشان الصفحة متعرفش شكل الفولدرات على جهاز الزائر، و [[fakepath]] كلمة ثابتة في المواصفة بتتكتب على أي نظام (حتى الماك واللينكس).
- [[input.files]] قايمة الملفات المختارة. كل ملف ليه [[name]] و [[size]] (بالبايت) و [[type]] (نوعه بصيغة MIME زي [[image/png]]). دي اللي JavaScript بيقراها.

### الصفحة متقدرش تختار ملف

~~~text القياس من Chrome
input.value = "C:\x.txt"   →   InvalidStateError: This input element accepts a filename,
                               which may only be programmatically set to the empty string.
input.value = ""           →   files.length بقى 0   (المسموح الوحيد: تفضّي الحقل)
~~~

يعني مينفعش تكتب [[value="..."]] على حقل ملف عشان يبدأ بملف جاهز، ومينفعش كود يحط فيه مسار. لو ينفع، أي صفحة كانت هتسحب ملفات من جهازك من غير ما تعرف.

---

## ٢. الفورم لازم [[post]] و [[multipart/form-data]]

نفس الحقل ونفس الملف (صورة صغيرة اسمها [[avatar.svg]])، في تلات فورمات:

~~~text 1. من غير enctype (الافتراضي)
POST /photo
content-type: application/x-www-form-urlencoded
content-length: 16

photo=avatar.svg
~~~

~~~text 2. بـ method="get"
GET /photo?photo=avatar.svg
~~~

~~~text 3. بـ method="post" و enctype="multipart/form-data"
POST /join
content-type: multipart/form-data; boundary=----WebKitFormBoundarycEnzdF75rhwtzFWS
content-length: 409

------WebKitFormBoundarycEnzdF75rhwtzFWS
Content-Disposition: form-data; name="name"

منى علي
------WebKitFormBoundarycEnzdF75rhwtzFWS
Content-Disposition: form-data; name="photo"; filename="avatar.svg"
Content-Type: image/svg+xml

<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><circle cx="20" cy="20" r="18" fill="#0a7ea4"/></svg>

------WebKitFormBoundarycEnzdF75rhwtzFWS--
~~~

في الأول والتاني اللي اتبعت **كلمة** [[avatar.svg]] وبس. في التالت جزء الملف فيه:

| السطر | معناه |
|---|---|
| [[name="photo"]] | اسم الحقل ([[name]] بتاع الـ input) |
| [[filename="avatar.svg"]] | اسم الملف على جهاز الزائر (الاسم بس، من غير مسار) |
| [[Content-Type: image/svg+xml]] | نوع الملف زي ما المتصفح خمّنه |
| بعد السطر الفاضي | **محتوى الملف نفسه** بايت ببايت |

الصورة هنا SVG فمحتواها نص وبيتقري. لو كانت PNG أو JPG كان هيظهر مكانه بايتات مش مقروءة، بنفس الترتيب.

### لو الزائر مختارش ملف

~~~text القياس من Chrome (حقل ملف فاضي في فورم multipart)
Content-Disposition: form-data; name="photo"; filename=""
Content-Type: application/octet-stream

~~~

الحقل **بيتبعت برضه**: جزء باسم الحقل، و [[filename]] فاضي، ومحتوى فاضي. فالسيرفر لازم يفحص «فيه ملف فعلًا ولا لأ»، مش «الحقل موجود ولا لأ».

ولو الملف إجباري: [[required]] بيشتغل على حقل الملف.

~~~text القياس من Chrome
<input type="file" required> وهو فاضي:   valueMissing = true    الرسالة: Please select a file.
~~~

---

## ٣. [[<input type="file" accept="image/*">]]

[[accept]] قايمة أنواع مفصولة بفاصلة. MDN: كل نوع بيتكتب بواحد من تلات أشكال:

| الشكل | مثال | معناه |
|---|---|---|
| امتداد أوله نقطة | [[.pdf]] ، [[.docx]] | الملفات اللي آخر اسمها كده |
| نوع MIME كامل | [[image/png]] ، [[application/pdf]] | النوع ده بالظبط |
| عيلة كاملة | [[image/*]] ، [[video/*]] ، [[audio/*]] | أي صورة، أي فيديو، أي صوت |

~~~html
<input type="file" accept="image/*, .pdf">
~~~

اللي بيعمله: نافذة اختيار الملف بتفتح وهي عارضة الأنواع دي بس. وعلى الموبايل المتصفح بيعرض المصادر المناسبة للنوع (المعرض مثلًا)، وده بيختلف من نظام لنظام ومتقاسش هنا.

### [[accept]] اقتراح، مش فحص

MDN بالنص: [[accept]] مبيفحصش أنواع الملفات المختارة، هو تلميح بيوجّه الزائر، ولسه ممكن الزائر يغيّر اختيار في نافذة الملفات ويختار أي ملف.

~~~text القياس من Chrome (ملف نصي اتحط في حقل accept="image/*")
files[0].name = id-card.txt    files[0].type = text/plain
validity.valid = true          (المتصفح مش شايف أي غلط)
والملف اتبعت للسيرفر عادي
~~~

فـ [[accept]] راحة للزائر، مش حماية. **السيرفر لازم يفحص نوع الملف بنفسه**، وميثقش في [[filename]] ولا في [[Content-Type]] اللي في الطلب: الاتنين جايين من جهاز الزائر وممكن يتكتب فيهم أي حاجة.

---

## ٤. [[<input type="file" multiple>]]

من غير [[multiple]] نافذة الاختيار بتقبل ملف واحد. بيه، الزائر يقدر يعلّم على كذا ملف (بـ Ctrl أو Shift وهو بيختار).

~~~text القياس من Chrome (3 ملفات في حقل multiple)
input.value          C:\fakepath\a.svg        (أول ملف بس)
input.files.length   3
~~~

[[value]] بيعرض أول ملف بس، والعدد الحقيقي في [[files]]. وفي الطلب كل ملف بياخد جزء لوحده **بنفس اسم الحقل**:

~~~text الطلب اللي وصل السيرفر (ملفين في الحقل docs)
POST /join
content-type: multipart/form-data; boundary=----WebKitFormBoundaryHAsPocwarUti2DCQ
content-length: 575

------WebKitFormBoundaryHAsPocwarUti2DCQ
Content-Disposition: form-data; name="docs"; filename="front.svg"
Content-Type: image/svg+xml

<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><circle cx="20" cy="20" r="18" fill="#c8102e"/></svg>

------WebKitFormBoundaryHAsPocwarUti2DCQ
Content-Disposition: form-data; name="docs"; filename="ضهر البطاقة.svg"
Content-Type: image/svg+xml

<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><circle cx="20" cy="20" r="18" fill="#333"/></svg>

------WebKitFormBoundaryHAsPocwarUti2DCQ--
~~~

- جزئين اسمهم [[docs]]: السيرفر بيستلم الحقل ده كقايمة.
- اسم الملف العربي اللي فيه مسافة اتبعت زي ما هو. السيرفر اللي بيحفظ الملف بالاسم ده من غير تنضيف هيتعب، وده شغل السيرفر مش الـ HTML.

**[[multiple]] مبيحددش عدد.** مفيش attribute بيقول «٢ بالظبط» أو «أقصى حاجة ٥». لو العدد مهم، يا إما حقل لكل ملف (حقل للوش وحقل للضهر: أوضح للزائر كمان)، يا إما السيرفر يفحص.

[[multiple]] بيتكتب كمان على [[<input type="email">]] (كذا إيميل بينهم فاصلة) وعلى [[<select>]] (درس «readonly و disabled و checked»).

---

## ٥. [[<input type="file" capture="environment">]]

على الموبايل، [[capture]] مع [[accept="image/*"]] أو [[video/*]] بيطلب من المتصفح يفتح **الكاميرا مباشرة** بدل نافذة الملفات. القيمة [[environment]] الكاميرا الخلفية، و [[user]] كاميرا السيلفي. على الكمبيوتر ملوش تأثير. (كله من MDN، ومتقاسش هنا لأنه محتاج موبايل.)

مناسب لـ «صوّر البطاقة». وبما إنه بيطلب الكاميرا بدل نافذة الملفات، متحطوش إلا لو التصوير دلوقتي هو المطلوب: اللي عنده الصورة جاهزة هيتضايق.

---

## ٦. الحجم: الـ HTML مبيحددوش

مفيش attribute للحجم. مفيش [[maxsize]] ولا حاجة شبهه في المواصفة. الزائر يقدر يختار فيديو ٢ جيجا في حقل صورة شخصية، والمتصفح هيبدأ يرفعه.

اللي بتعمله في الـ HTML:

- **اكتب الحد في الـ label:** «أقصى حجم ٢ ميجا». ده أهم سطر، لأن الزائر اللي عارف الشرط قبل ما يختار مش هيستنى رفع ملف هيترفض.
- السيرفر هو اللي بيرفض الملف الكبير فعلًا.
- فحص الحجم قبل الرفع ([[file.size]]) بيتعمل بـ JavaScript، وده في كورس JavaScript.

---

## ٧. الاسم والـ label

حقل الملف محتاج [[<label>]] زي أي حقل: الزرار مكتوب عليه «Choose File» بس، ومبيقولش ملف إيه. و Chrome بيزوّد على الاسم حالة الحقل («No file chosen» أو اسم الملف المختار)، فقارئ الشاشة بيعرف الحقل فيه ملف ولا لأ.

~~~text القياس من Chrome (شجرة الـ accessibility)
<label for="photo">صورة شخصية</label> <input id="photo" type="file">
→  role = button    الاسم = «صورة شخصية :No file chosen»
من غير label:                 الاسم = «Choose File :No file chosen»
~~~

وشكل الزرار نفسه (اللون، والكلام اللي عليه) صعب يتغيّر: ده من العناصر اللي المتصفح والنظام بيرسموها. تنسيقه في دروس CSS الجاية.

---

## ٨. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| فورم ملف من غير [[enctype="multipart/form-data"]] | اسم الملف بس بيوصل: [[photo=avatar.svg]] |
| فورم ملف بـ [[method="get"]] | اسم الملف في العنوان، ومفيش محتوى |
| حقل ملف من غير [[name]] | ولا حتى الاسم بيتبعت |
| [[accept="jpg"]] | مش واحد من التلات أشكال: الصح [[.jpg]] أو [[image/jpeg]] |
| تعتمد على [[accept]] كحماية | الزائر يقدر يختار أي ملف، و [[validity.valid]] بيفضل [[true]] |
| [[value="photo.jpg"]] على الحقل | مرفوض: الصفحة متقدرش تختار ملف |
| مفيش حد حجم مكتوب | الزائر بيرفع ملف كبير وبيترفض بعد دقايق انتظار |
| تستنى عدد محدد من [[multiple]] | [[multiple]] يعني «واحد أو أكتر» وبس |
| السيرفر بيحفظ الملف باسمه زي ما جه | الاسم من الزائر: ممكن فيه مسافات أو عربي أو أي حاجة |

---

## الخلاصة

- حقل ملف = [[method="post"]] + [[enctype="multipart/form-data"]] + [[name]]. ناقص واحد، مفيش ملف.
- [[accept]]: امتداد ([[.pdf]])، أو MIME ([[image/png]])، أو عيلة ([[image/*]]). اقتراح لنافذة الاختيار، مش فحص.
- [[multiple]]: كذا ملف في حقل واحد، وكل ملف جزء في الطلب بنفس الاسم.
- [[capture]]: الكاميرا على الموبايل.
- [[value]] دايمًا [[C:\fakepath\]] واسم الملف، والصفحة متقدرش تحط فيه حاجة.
- الحجم والنوع الحقيقي: السيرفر هو اللي بيفحص. اكتب الشروط في الـ label.`,
          try: R`اعمل ملف [[upload.html]] فيه فورم [[method="post"]] و [[enctype="multipart/form-data"]] و [[action="upload.html"]]، وجواه حقل ملف [[name="photo"]] عليه [[accept="image/*"]] و [[required]]، وزرار. افتحه ودوس الزرار **من غير ما تختار ملف**. وبعدين دوس «Choose File» وبص نافذة الاختيار عارضة أنهي ملفات.`,
          sol: R`~~~html upload.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ارفع صورتك</title>
</head>
<body>
<form action="upload.html" method="post" enctype="multipart/form-data">
  <p><label for="photo">صورة شخصية (أي صورة، أقصى حجم ٢ ميجا)</label></p>
  <p><input id="photo" name="photo" type="file" accept="image/*" required></p>
  <button type="submit">ارفع</button>
</form>
</body>
</html>
~~~

~~~view 116 شكل الصفحة
<form onsubmit="return false">
  <p><label for="photo">صورة شخصية (أي صورة، أقصى حجم ٢ ميجا)</label></p>
  <p><input id="photo" name="photo" type="file" accept="image/*" required></p>
  <button type="submit">ارفع</button>
</form>
~~~

**هتشوف إيه:**

- **من غير ملف:** الفورم متبعتش، وطلعت رسالة المتصفح جنب الحقل: «Please select a file.» (أو ترجمتها بلغة متصفحك). ده شغل [[required]].
- **نافذة الاختيار:** نوع الملفات تحت في النافذة مكتوب «Image Files» (أو شبهه)، والملفات اللي مش صور مش ظاهرة. بس في نفس القايمة فيه اختيار «All Files»: ده اللي بيخلّي [[accept]] اقتراح مش فحص.
- بعد اختيار صورة: اسمها ظهر مكان «No file chosen».

~~~text القياس من Chrome
فاضي:        valueMissing = true     الرسالة: Please select a file.
بعد اختيار:  input.value = C:\fakepath\avatar.svg      files.length = 1
~~~

شكل نافذة الاختيار وكلمة «All Files» من Windows، ومتقاسوش في المتصفح الآلي (النافذة بتاعة النظام مش بتاعة الصفحة). جرّبها بإيدك.`,
          deep: {
            why: R`أي موقع فيه صورة بروفايل، أو مستند، أو سيرة ذاتية، أو إيصال، فيه حقل ملف. وأشهر باج فيه مبيطلّعش أي خطأ: الفورم بيتبعت، والسيرفر بيرد «تمام»، والملف مش موجود، لأن اللي وصل اسمه بس. اللي شاف شكل الطلب مرة بيعرف السبب من أول نظرة.`,
            how: R`لما الزائر يختار، المتصفح بيسجّل في الحقل قايمة ملفات ([[FileList]]): لكل ملف اسمه وحجمه ونوعه (من الامتداد غالبًا) وإشارة لمكانه على الديسك. المحتوى مبيتقريش دلوقتي. لحظة الإرسال، لو الفورم multipart، المتصفح بيفتح كل ملف ويصبّ بايتاته في جزء من جسم الطلب بين فاصلين، وقبله سطر فيه اسم الحقل واسم الملف وسطر فيه النوع. لو الفورم مش multipart، بيحط اسم الملف كنص مكان القيمة ومبيفتحش الملف خالص.`,
            when: R`[[accept="image/*"]] لصورة شخصية أو صورة منتج. [[accept=".pdf"]] أو مع [[image/*]] لمستند رسمي. [[multiple]] لمعرض صور أو مرفقات عددها مش ثابت. حقل لكل ملف لما كل ملف ليه معنى (وش البطاقة، ضهر البطاقة). [[capture]] لما المطلوب «صوّر دلوقتي» على الموبايل.`,
            mistakes: R`نسيان [[enctype]] (أشهر واحدة). نسيان [[name]]. [[accept]] بامتداد من غير نقطة. الثقة في [[accept]] أو في نوع الملف اللي في الطلب. مفيش حد حجم مكتوب للزائر. محاولة ملء الحقل بـ [[value]]. و [[multiple]] لما المطلوب ملفين محددين.`
          },
          practice: [
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** فورم «ارفع صورة الكارنيه» في «نادي الموج» بيتبعت والسيرفر بيقول «مفيش صورة». فيه ٤ مشاكل: شكل الطلب، والـ method، والحقل ملوش [[name]]، و [[accept]] مكتوب غلط. (من قسم ٢ و ٣ و ٨ في الشرح)`, done: R`الفورم [[post]] و [[multipart/form-data]]، والحقل ليه [[name]] و [[accept]] صح و label، وكل الشروط ✓.`, work: { h: 120, start: R`<form action="/card">
  <p>صورة الكارنيه</p>
  <p><input type="file" accept="jpg, png"></p>
  <button>ارفع</button>
</form>`, checks: [
              { say: R`الفورم [[method="post"]]`, q: "form[method=\"post\" i]" },
              { say: R`الفورم [[enctype="multipart/form-data"]]`, q: "form[enctype=\"multipart/form-data\" i]" },
              { say: R`حقل الملف ليه [[name]]`, q: "input[type=\"file\"][name]" },
              { say: R`[[accept]] مكتوب صح: فيه [[image/]] أو امتداد بنقطة`, q: "input[type=\"file\"][accept*=\"image/\"], input[type=\"file\"][accept^=\".\"]" },
              { say: R`«صورة الكارنيه» بقت [[<label>]] مربوط بالحقل`, q: "label[for]", has: "صورة الكارنيه" },
            ] }, sol: R`~~~live 116 بعد التصليح
<form action="/card" method="post" enctype="multipart/form-data" onsubmit="return false">
  <p><label for="card">صورة الكارنيه (JPG أو PNG)</label></p>
  <p><input id="card" name="card" type="file" accept="image/jpeg, image/png"></p>
  <button>ارفع</button>
</form>
~~~

**هتشوف إيه:** الشكل زي ما هو تقريبًا. الفرق إن الضغط على «صورة الكارنيه» بقى يفتح نافذة الاختيار (بقت label)، والنافذة بتعرض الصور بس.

| المشكلة | التصليح |
|---|---|
| من غير [[method]] (يعني GET) | [[method="post"]] |
| من غير [[enctype]] | [[enctype="multipart/form-data"]] |
| الحقل من غير [[name]] | [[name="card"]] |
| [[accept="jpg, png"]] | [[accept="image/jpeg, image/png"]] (أو [[.jpg, .png]]) |
| اسم الحقل في [[<p>]] | [[<label for="card">]] |

**الغلطة الشائعة:** تصلّح [[enctype]] وتنسى [[method]]. [[enctype]] مع GET ملوش تأثير، فاسم الملف هيفضل يتبعت في العنوان.

~~~text القياس من Chrome (الطلب اللي وصل السيرفر المحلي)
قبل:   GET /card?
       (ولا حتى اسم الملف: الحقل ملوش name)

بعد:   POST /card
       content-type: multipart/form-data; boundary=----WebKitFormBoundary...

       ------WebKitFormBoundary...
       Content-Disposition: form-data; name="card"; filename="avatar.svg"
       Content-Type: image/svg+xml

       (محتوى الصورة)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** فورم «الكشف الطبي» للعضو الجديد. المطلوب: يبعت لـ [[/medical]]، وفيه حقل [[report]] للتقرير الطبي (PDF بس، وإجباري)، وحقل [[scans]] لصور الأشعة (أي صور، وأكتر من واحدة)، وكل حقل ليه label مكتوب فيه النوع المطلوب. (من قسم ٢ و ٣ و ٤ و ٦ في الشرح)`, done: R`حقلين ملفات بالـ [[accept]] المناسب، والتاني [[multiple]]، والفورم شكله صح للملفات، وكل الشروط ✓.`, work: { h: 251, start: R`<h1>الكشف الطبي</h1>
<form>
  التقرير الطبي (PDF)
  صور الأشعة (أي عدد)
  <button>ابعت</button>
</form>`, checks: [
              { say: R`الفورم بيبعت لـ [[/medical]] بـ [[post]] و [[multipart/form-data]]`, q: "form[action=\"/medical\"][method=\"post\" i][enctype=\"multipart/form-data\" i]" },
              { say: R`حقل [[report]] بيقبل PDF بس: [[accept=".pdf"]] أو [[application/pdf]]`, q: "input[type=\"file\"][name=\"report\"][accept=\".pdf\"], input[type=\"file\"][name=\"report\"][accept=\"application/pdf\"]" },
              { say: R`حقل [[report]] إجباري`, q: "input[name=\"report\"][required]" },
              { say: R`حقل [[scans]] بيقبل أي صورة`, q: "input[type=\"file\"][name=\"scans\"][accept=\"image/*\"]" },
              { say: R`حقل [[scans]] عليه [[multiple]]`, q: "input[name=\"scans\"][multiple]" },
              { say: R`كل حقل ليه [[<label>]]`, q: "label[for]", n: 2 },
            ] }, sol: R`~~~live 251 الحل
<h1>الكشف الطبي</h1>
<form action="/medical" method="post" enctype="multipart/form-data" onsubmit="return false">
  <p><label for="report">التقرير الطبي (ملف PDF، أقصى حجم ٥ ميجا)</label></p>
  <p><input id="report" name="report" type="file" accept=".pdf" required></p>
  <p><label for="scans">صور الأشعة (أي عدد من الصور)</label></p>
  <p><input id="scans" name="scans" type="file" accept="image/*" multiple></p>
  <button>ابعت</button>
</form>
~~~

**هتشوف إيه:**

- زرارين اختيار. الأول مكتوب عليه «Choose File» والتاني «Choose Files» بالجمع: ده أثر [[multiple]] الوحيد الظاهر.
- دوس «ابعت» من غير ملفات: الرسالة بتطلع عند التقرير بس، لأنه الوحيد اللي عليه [[required]].

**ليه كده:**

- حقلين مش حقل واحد [[multiple]]: التقرير والأشعة حاجتين مختلفتين، والسيرفر محتاج يعرف مين فين من اسم الحقل.
- الحد الأقصى للحجم مكتوب في الـ label لأن مفيش attribute بيعمله.

**الغلطة الشائعة:** [[accept="pdf"]] من غير نقطة. دي مش واحدة من التلات أشكال اللي المواصفة بتقبلها، فمتستناش من المتصفح يفهمها: الامتداد لازم أوله نقطة.

~~~text القياس من Chrome (الطلب اللي وصل: تقرير وصورتين أشعة)
POST /medical
content-type: multipart/form-data; boundary=----WebKitFormBoundaryyVk2Kbz5HkUNBoLX
content-length: 818

الأجزاء بالترتيب:
name="report"; filename="report.pdf"     Content-Type: application/pdf
name="scans";  filename="knee-1.svg"     Content-Type: image/svg+xml
name="scans";  filename="knee-2.svg"     Content-Type: image/svg+xml
~~~` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** ده ملخص طلب وصل السيرفر (الأجزاء بالترتيب). اكتب الفورم اللي بعته: كام حقل؟ مين فيهم ملف؟ ومين عليه [[multiple]]؟ (من قسم ٢ و ٤ في الشرح: قراية أجزاء الطلب)`, done: R`الفورم فيه حقل نص مخفي وحقلين ملفات، والتاني [[multiple]]، وكل الشروط ✓.`, work: { h: 120, start: R`<!--
POST /kit
content-type: multipart/form-data; boundary=----X

name="member"                                →  1042
name="logo";   filename="logo.png"
name="photos"; filename="team-1.jpg"
name="photos"; filename="team-2.jpg"
name="photos"; filename="team-3.jpg"
-->
<form>
</form>`, checks: [
              { say: R`الفورم [[action="/kit"]] و [[post]] و [[multipart/form-data]]`, q: "form[action=\"/kit\"][method=\"post\" i][enctype=\"multipart/form-data\" i]" },
              { say: R`[[member]] حقل مش ملف (مفيش [[filename]] في جزئه)`, q: "input[name=\"member\"]:not([type=\"file\"])" },
              { say: R`[[logo]] حقل ملف واحد (من غير [[multiple]])`, q: "input[type=\"file\"][name=\"logo\"]:not([multiple])" },
              { say: R`[[photos]] حقل ملف عليه [[multiple]]`, q: "input[type=\"file\"][name=\"photos\"][multiple]" },
              { say: R`تلات حقول بس، مش خمسة`, q: "form input", n: 3 },
            ] }, sol: R`~~~live 119 الحل
<form action="/kit" method="post" enctype="multipart/form-data" onsubmit="return false">
  <input type="hidden" name="member" value="1042">
  <p><label for="logo">شعار الفريق</label> <input id="logo" name="logo" type="file" accept="image/*"></p>
  <p><label for="photos">صور الفريق</label> <input id="photos" name="photos" type="file" accept="image/*" multiple></p>
  <button>ابعت</button>
</form>
~~~

**هتشوف إيه:** حقلين ملفات وزرار. رقم العضو مش ظاهر (hidden).

**إزاي قريت الطلب:**

- [[multipart/form-data]] ← فيه ملفات، والـ method أكيد [[post]].
- [[member]] مفيش في جزئه [[filename]] ← حقل عادي مش ملف. وقيمته رقم الزائر مكتبوش غالبًا ← [[hidden]] (ولو عملته حقل نص عادي فالطلب هيطلع نفسه، والشرط بيقبله).
- [[logo]] جزء واحد فيه [[filename]] ← حقل ملف.
- [[photos]] اتكرر ٣ مرات ← حقل واحد [[multiple]] اتختار فيه ٣ ملفات، مش ٣ حقول.

**الغلطة الشائعة:** تكتب ٣ حقول اسمهم [[photos]]. الطلب هيطلع شبهه، بس الزائر هيلاقي ٣ أزرار، ولو عنده ٤ صور مش هيعرف يبعتهم.` },
            { lvl: 'سريع', t: R`**اشرحها:** مدير النادي سألك تلات أسئلة عن فورم رفع الصور. جاوب على كل واحد في سطرين: (١) «ليه مبنعرفش الصورة كانت في أنهي فولدر على جهاز العضو؟» (٢) «حطينا [[accept="image/*"]]، يبقى محدش يقدر يرفع ملف تاني، صح؟» (٣) «عايزين نمنع الملفات اللي أكبر من ٢ ميجا من الـ HTML.» (من قسم ١ و ٣ و ٦ في الشرح)`, done: R`جاوبت على التلاتة: المسار متخبّي للخصوصية، و [[accept]] اقتراح مش حماية، والحجم ملوش attribute.`, sol: R`**إجابة نموذجية:**

1. **المسار:** المتصفح بيدّي الصفحة اسم الملف بس، وبيكتب قبله [[C:\fakepath\]] مكان المسار الحقيقي. ده مقصود: مسار الملف بيكشف اسم المستخدم على الجهاز وترتيب فولدراته، ودي حاجة مش من حق أي موقع يعرفها.
2. **[[accept]]:** لأ. هو بيخلّي نافذة الاختيار تعرض الصور بس، والزائر يقدر يغيّرها لـ «All Files» ويختار أي حاجة، والمتصفح هيبعتها من غير اعتراض. اللي بيمنع فعلًا هو السيرفر لما يفحص الملف اللي وصله.
3. **الحجم:** مفيش attribute في HTML بيحدد حجم الملف. اللي نقدر نعمله في الصفحة: نكتب «أقصى حجم ٢ ميجا» في الـ label، وبعدين (بـ JavaScript) نفحص الحجم قبل الرفع ونقول للعضو. والرفض الحقيقي برضه على السيرفر.

~~~text القياس من Chrome
input.value                              C:\fakepath\id-card.txt
ملف text/plain في حقل accept="image/*"   validity.valid = true ، واتبعت
files[0].size                            11      (الحجم معروف للصفحة، بس HTML مبيستخدموش)
~~~

**الخلاصة للمدير:** الـ HTML بيساعد العضو يختار صح. اللي بيحمي النادي هو السيرفر.` }
          ]
        },
        {
          cmd: "readonly و disabled و checked",
          title: "حالات الحقل: مقفول، متعطّل، متعلّم، ومختار، وإيه اللي بيتبعت من كل واحد",
          pre: ["css/fieldset و radio", { to: "css/Constraint Validation API", why: R`[[required]] و [[pattern]] و [[min]] و [[max]] ورسايل المتصفح اتشرحوا هناك، وهنا بنراجعهم في جدول` }, "css/GET و POST و enctype"],
          ref: [
            { t: "MDN: readonly", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/readonly" },
            { t: "MDN: disabled", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/disabled" },
            { t: "MDN: <input type=\"checkbox\">", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/checkbox" },
            { t: "MDN: <option>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/option" },
            { t: "MDN: <optgroup>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/optgroup" },
            { t: "MDN: <selectedcontent>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/selectedcontent" },
            { t: "MDN: <textarea>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/textarea" },
            { t: "MDN: dirname", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/dirname" },
            { t: "WHATWG: Attributes common to form controls", url: "https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attributes-common-to-form-controls" },
            { t: "MDN Curriculum: Forms", url: "https://developer.mozilla.org/en-US/curriculum/core/semantic-html/" }
          ],
          desc: R`كل حقل في الفورم ليه **حالة**: يتعدّل ولا مقفول، شغال ولا متعطّل، متعلّم ولا لأ. الحالة بتتكتب بكلمة واحدة على الحقل ([[readonly]] أو [[disabled]] أو [[checked]] أو [[selected]])، وبتغيّر تلات حاجات: الزائر يقدر يعمل إيه، والحقل شكله إيه، **والقيمة بتتبعت ولا لأ**.
وفي الدرس ده كمان باقي الـ attributes اللي بتحدد شكل الحقل وحدود قيمته: [[size]] و [[rows]] و [[cols]] و [[wrap]] و [[dirname]]، ومراجعة لـ [[min]] و [[max]] و [[step]] و [[minlength]] و [[maxlength]] و [[pattern]].`,
          example: R`<form action="/renew" method="post">
  <label for="id">رقم العضوية</label>
  <input id="id" name="id" value="1042" readonly>
  <label for="coupon">كود الخصم</label>
  <input id="coupon" name="coupon" value="انتهى العرض" disabled>
  <input id="news" name="news" type="checkbox" checked>
  <label for="news">ابعتولي أخبار النادي</label>
  <button type="submit">جدّد</button>
</form>`,
          flag: "script",
          lines: [
            R`فورم تجديد الاشتراك، بيتبعت [[post]] لـ [[/renew]] (درس «GET و POST و enctype»).`,
            R`اسم الحقل الأول، مربوط بيه بـ [[for="id"]].`,
            R`[[readonly]]: الزائر شايف رقم عضويته ومش قادر يغيّره، **والقيمة بتتبعت** ([[id=1042]]). ده اللي عايزينه: السيرفر محتاج الرقم، والزائر ميلعبش فيه.`,
            R`اسم الحقل التاني، مربوط بيه بـ [[for="coupon"]].`,
            R`[[disabled]]: الحقل باهت، ومش بيتداس عليه، **ومش بيتبعت خالص**. العرض خلص، فالحقل موجود للعلم بس.`,
            R`[[checked]]: الـ checkbox بيبدأ متعلّم. الزائر يقدر يشيل العلامة. لو فضلت، بيتبعت [[news=on]]. لو شالها، مبيتبعتش حاجة.`,
            R`الـ label بتاع الـ checkbox جاي بعده (درس «fieldset و radio»): الضغط على الكلام بيعلّم المربع.`,
            R`زرار الإرسال. اللي هيتبعت من الفورم ده: [[id=1042&news=on]] بس.`,
            R`[[</form>]] آخر الفورم: تلات حقول وزرار، وواحد منهم مش هيتبعت.`
          ],
          teach: R`## الفكرة في سطرين

الـ attributes دي كلها «boolean»: وجود الكلمة لوحدها معناه «أيوه»، ومفيش قيمة تتكتب. [[<input disabled>]] متعطّل، ومن غير الكلمة شغال. (و [[disabled="false"]] برضه **متعطّل**: المهم وجود الكلمة مش اللي بعد علامة يساوي.)

القياسات من Chrome 157 على Windows 11، والطلبات على السيرفر المحلي بتاع درس «GET و POST و enctype».

---

## ١. التلات حالات جنب بعض

~~~live 198 جرّب تكتب في كل حقل، وبعدين دوس «ابعت»
<form onsubmit="event.preventDefault(); sent.value = decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
  <p><label for="a">عادي</label> <input id="a" name="normal" value="1"></p>
  <p><label for="b">readonly</label> <input id="b" name="locked" value="2" readonly></p>
  <p><label for="c">disabled</label> <input id="c" name="off" value="3" disabled></p>
  <button>ابعت</button>
</form>
<p>اللي كان هيتبعت: <output id="sent">(لسه)</output></p>
~~~

**هتشوف إيه:**

- الأول بيتكتب فيه عادي.
- التاني شكله زي الأول بالظبط، وبتقدر تدوس جواه وتعلّم على الكلام وتنسخه، بس الكتابة مبتعملش حاجة.
- التالت باهت ورمادي، والدوس عليه مبيعملش أي حاجة.
- بعد «ابعت»: [[normal=1&locked=2]]. التالت مش موجود.

~~~text القياس من Chrome
                      عادي              readonly          disabled
بيتكتب فيه            أيوه              لأ                لأ
الـ Tab بيقف عنده     أيوه              أيوه              لأ
بيتبعت                أيوه              أيوه              لأ
بيتفحص (required)     أيوه              لأ                لأ
لون الكلام            rgb(0, 0, 0)      rgb(0, 0, 0)      rgb(84, 84, 84)
لون الخلفية           أبيض              أبيض              rgba(239, 239, 239, 0.3)
شكل الماوس فوقه       text              text              default
~~~

السطر اللي بيفرق في الشغل هو التالت: **[[readonly]] بيتبعت و [[disabled]] لأ.**

---

## ٢. [[<input readonly>]]

«اقراه ومتعدّلوش». بيتستخدم لقيمة الزائر لازم يشوفها والسيرفر لازم يستلمها: رقم العضوية، الإجمالي المحسوب، الإيميل اللي مينفعش يتغيّر.

تلات حاجات لازم تعرفها:

**١. بيشتغل على خانات الكتابة بس.** [[<input>]] النصي بأنواعه (text و email و number و date...) و [[<textarea>]]. على الباقي ملوش أي تأثير:

~~~text القياس من Chrome
<input type="checkbox" checked readonly>   دوسنا عليه   →   checked = false   (اتغيّر عادي)
<select readonly>                          غيّرنا الاختيار   →   اتغيّر عادي
~~~

يعني مفيش checkbox للقراية بس ولا [[<select>]] للقراية بس. البديل: [[disabled]] عليه، ومعاه حقل [[hidden]] بنفس الـ [[name]] يشيل القيمة للسيرفر (هتعمله في التمارين).

**٢. المتصفح مبيفحصوش.** حقل [[readonly]] و [[required]] وفاضي بيعدّي:

~~~text القياس من Chrome
<input required readonly value="">    willValidate = false     والفورم checkValidity() = true
~~~

المنطق: مينفعش تطلب من الزائر يصلّح حقل هو مش قادر يكتب فيه.

**٣. مش حماية.** JavaScript يقدر يغيّر القيمة (اتقاس)، وأي زائر يقدر يشيل كلمة [[readonly]] من DevTools ويكتب اللي عايزه. السيرفر لازم يتأكد إن رقم العضوية ده بتاع اللي باعت فعلًا.

---

## ٣. [[<input disabled>]]

«الحقل ده مش متاح دلوقتي». بيشتغل على **كل** عناصر الفورم: [[<input>]] بكل أنواعه و [[<select>]] و [[<textarea>]] و [[<button>]]، وعلى [[<option>]] و [[<optgroup>]]، وعلى [[<fieldset>]] كله مرة واحدة:

~~~html
<fieldset disabled>
  <legend>بيانات الكارت القديم</legend>
  <input name="old_card" value="7781">
</fieldset>
~~~

~~~text القياس من Chrome
الحقل اللي جوه <fieldset disabled>:   :disabled = true      مش بيتبعت
<button disabled>:                    لون الكلام rgba(16, 16, 16, 0.3)      الضغط مبيعملش حاجة
~~~

اللي بيحصل للعنصر المتعطّل: باهت، مبيتداسش، الـ Tab بيعدّيه، مبيتفحصش، **ومبيتبعتش**.

**المشكلة فيه:** الزائر اللي بيتنقّل بالكيبورد مبيوصلوش أصلًا، فمش هيعرف إنه موجود ولا ليه مقفول. فلو عطّلت حاجة، اكتب السبب في نص عادي جنبها («كود الخصم: العرض خلص»). وزرار الإرسال المتعطّل «لحد ما تملا الفورم صح» من أسوأ الأفكار: الزائر مش عارف إيه الناقص، ومفيش رسالة هتطلعله.

### readonly ولا disabled؟

| الموقف | الاختيار |
|---|---|
| قيمة تتشاف وتتبعت ومتتعدّلش | [[readonly]] |
| حقل مش متاح دلوقتي، وقيمته مش مطلوبة | [[disabled]] |
| checkbox أو select «للعرض بس» وقيمته مطلوبة | [[disabled]] + حقل [[hidden]] بنفس الاسم |
| معلومة للعرض بس، مش هتتبعت | مش حقل أصلًا: نص عادي |

---

## ٤. الحالات في الـ CSS، وليه مهمة

الزائر لازم **يشوف** الحقل في أنهي حالة: ده اللي أنا واقف عليه؟ ده مقفول؟ ده اتعلّم؟ المتصفح بيرسم جزء من ده لوحده (الـ disabled باهت)، والباقي عليك. والـ CSS بيمسك كل حالة بكلمة أولها [[:]] اسمها pseudo-class (درس «selectors» في وحدات CSS):

| الـ pseudo-class | بيمسك |
|---|---|
| [[:focus]] | الحقل اللي الكتابة هتنزل فيه دلوقتي (درس «focus-visible») |
| [[:disabled]] و [[:enabled]] | العنصر المتعطّل، والعنصر اللي شغال |
| [[:read-only]] و [[:read-write]] | اللي مبيتكتبش فيه، واللي بيتكتب فيه |
| [[:checked]] | الـ checkbox أو الـ radio المتعلّم، والـ [[<option>]] المختار |
| [[:required]] و [[:optional]] | الحقل الإجباري، والحقل اللي مش إجباري |
| [[:invalid]] و [[:user-invalid]] | اللي قيمته غلط (درس «Constraint Validation API») |

~~~live 110 131 الحالات متلوّنة
<style>
  input:read-only { background: #e5e7eb; }
  input:disabled  { text-decoration: line-through; }
  input:checked + label { font-weight: bold; }
</style>
<p><input value="عادي" aria-label="عادي"> <input value="readonly" readonly aria-label="للقراية"> <input value="disabled" disabled aria-label="متعطّل"></p>
<p><input id="x" type="checkbox" checked> <label for="x">علّم وشيل العلامة</label></p>
~~~

(تلات سطور CSS: الأول بيدّي خلفية رمادي لكل [[<input>]] مبيتكتبش فيه، والتاني بيشطب على كلام المتعطّل، والتالت بيتقّل الـ label اللي بعد checkbox متعلّم. كتابة CSS في الوحدات الجاية.)

**هتشوف إيه:** التاني والتالت خلفيتهم رمادي، والتالت كلامه مشطوب. والـ label تقيل طول ما المربع متعلّم.

لاحظ إن التالت أخد الخلفية الرمادي هو كمان. ده فخ:

~~~text القياس من Chrome: مين :read-only؟
<input readonly>            true
<input disabled>            true     (المتعطّل برضه «مبيتكتبش فيه»)
<input type="checkbox">     true     (مفيش كتابة فيه أصلًا)
<button> ، <select>         true
<p>فقرة</p>                 true     (أي عنصر مبيتكتبش فيه!)
<input> العادي              false
~~~

[[:read-only]] معناها «أي حاجة الزائر ميقدرش يكتب فيها»، مش «عليه كلمة readonly». لو عايز اللي عليهم الكلمة بس، الـ selector هو [[input[readonly]]].

---

## ٥. [[<input type="checkbox" checked>]]

[[checked]] بيخلّي الـ checkbox أو الـ radio **يبدأ** متعلّم.

~~~text القياس من Chrome (checkbox عليه checked، وبعدين الزائر شال العلامة)
                          في الأول     بعد ما شال العلامة     بعد reset للفورم
input.checked             true         false                  true
الـ attribute في الكود    موجود        موجود                  موجود
:checked في الـ CSS       true         false                  true
~~~

- كلمة [[checked]] في الكود هي **الحالة الأولى** بس. لما الزائر يغيّر، الكود مبيتغيّرش، واللي بيتغيّر الحالة الحقيقية ([[input.checked]] في JavaScript و [[:checked]] في CSS). MDN بيقولها صريحة: الـ attribute مبيعكسش الحالة الحالية.
- اللي بيتبعت بيتبع الحالة الحقيقية: متعلّم ← [[news=on]] (أو الـ [[value]] لو مكتوب)، مش متعلّم ← ولا حاجة (درس «fieldset و radio»).
- في مجموعة radio، لو كتبت [[checked]] على اتنين، **الأخير** هو اللي بيفضل متعلّم (اتقاس).
- الحالة التالتة «نص نص» (شرطة جوه المربع، اسمها indeterminate) ملهاش attribute: بتتعمل بـ JavaScript بس، وهي شكل بس ومبتغيّرش اللي بيتبعت (من MDN).

**إمتى تبدأ بيه متعلّم؟** لما ده اللي أغلب الناس عايزاه **ومفيهوش ضرر**: «افتكرني على الجهاز ده». ومتبدأش بيه متعلّم في موافقة على إعلانات أو مشاركة بيانات: ده بيتعدّ خداع للزائر، وقوانين حماية البيانات (زي GDPR في أوروبا) بتشترط إن الموافقة تبقى باختيار الزائر نفسه.

### [[<input type="checkbox" switch>]]

attribute جديد في المواصفة: بيخلّي الـ checkbox يترسم كـ **مفتاح** on/off (زي بتاع إعدادات الموبايل)، وقارئ الشاشة يقول «switch».

~~~text القياس من Chrome 157
'switch' in HTMLInputElement.prototype    false
<input type="checkbox" switch>            اترسم checkbox عادي 13 × 13، والـ role = checkbox
(وبخيار الميزات التجريبية: role = switch)
~~~

MDN: الـ attribute ده تجريبي ودعمه محدود، والمتصفح اللي مبيدعموش بيتجاهله. والمنهج بيقول مش Baseline. فلو كتبته، الصفحة شغالة في كل حتة (checkbox عادي)، بس متعتمدش على شكل المفتاح. لو المفتاح مطلوب دلوقتي: checkbox عادي و [[role="switch"]] وشكله بالـ CSS (درس «aria»).

---

## ٦. [[<option selected>]] و [[<optgroup label="...">]]

[[<select>]] اتشرح في درس «fieldset و radio». ناقصه حالتين وعنصر:

~~~live 35 القايمة بتفتح على «سلة» مش على أول اختيار
<label for="sport">اللعبة</label>
<select id="sport" name="sport">
  <optgroup label="ألعاب مية">
    <option value="swim">سباحة</option>
    <option value="polo">كرة ماء</option>
  </optgroup>
  <optgroup label="ألعاب صالة">
    <option value="basket" selected>سلة</option>
    <option value="judo">جودو</option>
  </optgroup>
  <optgroup label="متوقفة مؤقتًا" disabled>
    <option value="tennis">تنس</option>
  </optgroup>
</select>
~~~

**هتشوف إيه:** القايمة مقفولة ومكتوب فيها «سلة». افتحها: الاختيارات تحت تلات عناوين تقيلة، والعناوين نفسها مبتتختارش، و «تنس» باهت ومبيتداسش.

- [[selected]] على [[<option>]] زي [[checked]] على الـ checkbox: الاختيار اللي القايمة **تبدأ** بيه. من غيره القايمة بتبدأ بأول [[<option>]].
- [[<optgroup label="...">]] بيجمّع اختيارات تحت عنوان. العنوان من [[label]] ومبيتختارش. و [[disabled]] عليه بيعطّل كل اللي جواه.

~~~text القياس من Chrome
select.value = basket      selectedIndex = 2
role:  select = combobox     optgroup = group     option = option
option اللي جوه <optgroup disabled>:   :disabled = true
اتبعت:  sport=basket
option من غير value:   القيمة اللي بتتبعت هي الكلام اللي جواه
selected على اتنين في قايمة عادية:   الأخير هو اللي بيتختار
~~~

### [[<select multiple size="3">]]

- [[multiple]]: الزائر يختار أكتر من واحد. القايمة بتتحوّل من قايمة منسدلة لصندوق مفتوح.
- [[size]]: عدد السطور الظاهرة من الصندوق.

~~~live 70 اختار كذا يوم (Ctrl والضغط)
<form onchange="sent.value = decodeURIComponent(new URLSearchParams(new FormData(this)))">
  <label for="days">أيام التمرين</label>
  <select id="days" name="days" multiple size="3">
    <option selected>sat</option>
    <option>sun</option>
    <option selected>mon</option>
    <option>tue</option>
  </select>
  <output id="sent">days=sat&days=mon</output>
</form>
~~~

~~~text القياس من Chrome
role = listbox      الارتفاع بـ size="3": 53px
اتبعت:  days=sat&days=mon       (الاسم اتكرر مرة لكل اختيار، زي الـ checkboxes)
~~~

الاختيار المتعدد هنا محتاج Ctrl مع الضغط، وناس كتير متعرفش ده. **مجموعة checkboxes أوضح دايمًا** وبتبعت نفس الشكل.

وفخ اتقاس: [[<select size="3">]] **من غير** [[multiple]] بيتحوّل هو كمان لصندوق مفتوح، وبيبدأ **من غير أي اختيار** ([[selectedIndex = -1]])، فمش هيبعت حاجة لو الزائر ملمسوش.

### [[<selectedcontent>]]: القايمة اللي بتتنسّق

> ميزة جديدة لسه مش في كل المتصفحات. يعني إيه «مش Baseline» و «ورا flag»، وإزاي تتأكد بنفسك قبل ما تستخدم أي ميزة: درس «Baseline و @supports».

[[<select>]] العادي شكله بتاع النظام، وتنسيقه بالـ CSS محدود جدًا. المواصفة ضافت «customizable select»: قايمة كل حتة فيها بتتنسّق، وممكن الاختيار يبقى فيه صورة. و [[<selectedcontent>]] عنصر بيتحط جوه [[<button>]] في أول الـ [[<select>]]، والمتصفح بينسخ فيه محتوى الاختيار الحالي:

~~~html
<select>
  <button><selectedcontent></selectedcontent></button>
  <option value="swim">🏊 سباحة</option>
  <option value="polo" selected>🤽 كرة ماء</option>
</select>
~~~

~~~text القياس من Chrome 157
typeof HTMLSelectedContentElement                 function   (Chrome عارفه)
CSS.supports("appearance", "base-select")         true
النص اللي جوه <selectedcontent> بعد التحميل:       🤽 كرة ماء   (اتنسخ من الاختيار المختار)
~~~

**حالته:** MDN كاتب عليه «Limited availability»: مش Baseline لأنه مش شغال في بعض المتصفحات الأساسية. والشكل الجديد محتاج سطر CSS ([[appearance: base-select]]) عشان يتفعّل. فده عنصر تعرف إنه موجود وتستناه، ومتبنيش عليه دلوقتي.

---

## ٧. حدود القيمة: مراجعة في جدول

دول اتشرحوا بالتفصيل في «form و label» و «textarea و date و number» و «Constraint Validation API». هنا كلهم جنب بعض، بالرسالة اللي Chrome بيطلّعها:

| المكتوب | الحد | رسالة Chrome لما يتكسر |
|---|---|---|
| [[<input maxlength="5">]] | أقصى عدد حروف | مفيش رسالة: الكتابة بتقف عند الحرف الخامس (اتقاس بكتابة حقيقية) |
| [[<input minlength="3">]] | أقل عدد حروف | Please lengthen this text to 3 characters or more (you are currently using 2 characters). |
| [[<input pattern="...">]] | الشكل المطلوب (regex) | Please match the requested format. |
| [[<input type="number" min="16">]] | أقل قيمة | Value must be greater than or equal to 16. |
| [[<input type="number" max="60">]] | أكبر قيمة | Value must be less than or equal to 60. |
| [[<input type="number" step="5">]] | القفزة بين القيم | Please enter a valid value. The two nearest valid values are 10 and 15. |

[[min]] و [[max]] و [[step]] بيشتغلوا على [[number]] و [[range]] و [[date]] و [[time]] وباقي أنواع التاريخ (درس «أنواع input كلها»). و [[minlength]] و [[maxlength]] على خانات النص و [[<textarea>]]. و [[pattern]] على خانات النص بس.

فخ اتقاس في [[maxlength]]:

~~~text القياس من Chrome
<input maxlength="5" value="1234567890">
validity.tooLong = false      validity.valid = true      واتبعت:  code=1234567890
~~~

[[maxlength]] بيمنع **الزائر** إنه يكتب أكتر من ٥. القيمة اللي جاية من الكود ([[value]] أو JavaScript) مبتتقصّش ومبتتفحصش. ونفس الكلام على [[minlength]] (درس «Constraint Validation API» القسم ٦). فالحدود دي كلها مساعدة للزائر، **والسيرفر بيفحص تاني**.

---

## ٨. [[<input size="4">]]

عرض الخانة بعدد الحروف تقريبًا. الافتراضي ٢٠.

~~~live 58 76 size مختلف لكل خانة
<label>كود <input size="4" value="A12"></label>
<label>الافتراضي <input value="عشرين حرف"></label>
<label>عنوان <input size="40" value="خانة أعرض"></label>
~~~

~~~text القياس من Chrome
size="4":   65px       من غير size (20):   177px       size="40":   317px
~~~

- **شكل بس.** الخانة اللي [[size="4"]] بتقبل ١٠٠ حرف عادي. الحد من [[maxlength]].
- مفيد لتلميح: خانة كود من ٤ حروف شكلها قصيّر، فالزائر يفهم إن المطلوب قصيّر.
- العرض بالـ CSS ([[width]]) أدق وبيتغيّر مع الشاشة. [[size]] مناسب لصفحة من غير CSS.

---

## ٩. [[<textarea rows="5" cols="40">]] و [[<textarea wrap="hard">]]

[[rows]] عدد السطور الظاهرة و [[cols]] عدد الحروف في السطر تقريبًا. الافتراضي سطرين وعشرين حرف.

~~~text القياس من Chrome
من غير حاجة:          181 × 36 px     (rows=2  cols=20)
rows="5":             181 × 81 px
cols="40":            341 × 36 px
~~~

الاتنين **شكل بس** زي [[size]]: الزائر يكتب ٥٠ سطر في [[rows="3"]] ويطلعله scroll. و Chrome بيحط في ركن الـ textarea مقبض بيكبّرها بالسحب.

### [[wrap]]: السطور اللي المتصفح كسرها بتتبعت ولا لأ؟

لما السطر يوصل لآخر الخانة، المتصفح بينزّل الكلام لسطر جديد **في العرض**. [[wrap]] بيحدد ده يتبعت إزاي:

- [[wrap="soft"]] (الافتراضي): الكسر في العرض بس. القيمة بتتبعت سطر واحد زي ما الزائر كتبها.
- [[wrap="hard"]]: المتصفح **بيحط سطر جديد حقيقي** في القيمة عند كل كسر. ولازم معاه [[cols]].

~~~text القياس من Chrome (نفس الجملة في خانتين cols="20"، والجملة من غير أي Enter)
wrap="soft":   عايز حصة الصبح عشان عندي شغل بعد الضهر كل يوم

wrap="hard":   عايز حصة الصبح عشان
               عندي شغل بعد الضهر كل
               يوم
~~~

في الطلب، السطر الجديد بيتبعت [[%0D%0A]] (حرفين: CR و LF)، سواء حطه المتصفح بـ [[hard]] أو الزائر داس Enter.

[[hard]] نادر: لما النص هيتعرض في مكان عرضه ثابت (تذكرة مطبوعة، رسالة نصية). في الباقي سيبه [[soft]] وخلّي المكان اللي هيعرض النص هو اللي يكسره.

---

## ١٠. [[<input dirname="comment.dir">]]

الزائر ممكن يكتب عربي أو إنجليزي في نفس الخانة. [[dirname]] بيخلّي المتصفح يبعت **اتجاه** النص مع النص، في حقل زيادة بالاسم اللي تكتبه:

~~~html
<input name="comment" dirname="comment.dir" dir="auto">
~~~

~~~text القياس من Chrome (الطلب اللي وصل)
كتب «كلام عربي»:   comment=...&comment.dir=rtl
كتب hello:         comment=hello&comment.dir=ltr
~~~

- [[dir="auto"]] بيخلّي الخانة تاخد اتجاهها من أول حرف (درس «lang و dir»).
- [[dirname="comment.dir"]] بيبعت الاتجاه ده تحت الاسم [[comment.dir]]. السيرفر بيحفظه، ولما يعرض التعليق بعدين يحطه في [[dir]] الصح.
- بيشتغل على خانات النص و [[<textarea>]].

قليل الاستخدام، ومفيد في المواقع اللي تعليقاتها بلغات مختلفة.

---

## ١١. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[disabled]] على حقل قيمته مطلوبة | القيمة مبتتبعتش: استخدم [[readonly]] |
| [[readonly]] على checkbox أو select | ملوش تأثير: الزائر يغيّر عادي |
| [[disabled="false"]] | الحقل متعطّل: المهم وجود الكلمة |
| تثق في [[readonly]] أو hidden كحماية | بيتغيّروا من DevTools |
| زرار إرسال [[disabled]] لحد ما الفورم يتملى | الزائر مش عارف إيه الناقص، والكيبورد مبيوصلش للزرار |
| [[input:read-only]] في الـ CSS عشان المقفول | بيمسك الـ disabled والـ checkbox كمان |
| checkbox موافقة على إعلانات [[checked]] من الأول | خداع للزائر، ومش موافقة حقيقية |
| [[size]] أو [[cols]] كحد للطول | شكل بس: الحد [[maxlength]] |
| [[maxlength]] من غير فحص على السيرفر | القيمة اللي من الكود بتعدّي |
| [[wrap="hard"]] من غير [[cols]] | المواصفة بتطلب [[cols]] معاه |
| [[<select size>]] من غير اختيار أولي | مبيبعتش حاجة لو الزائر ملمسوش |

---

## الخلاصة

- [[readonly]]: يتشاف ويتبعت وميتعدّلش. لخانات الكتابة بس. مبيتفحصش.
- [[disabled]]: باهت، مبيتداسش، **مبيتبعتش**. لكل عناصر الفورم وللـ [[<fieldset>]] كله.
- [[checked]] و [[selected]]: الحالة **الأولى**. اللي بيتبعت هو الحالة الحالية.
- الحالات بتتمسك في CSS بـ [[:disabled]] و [[:read-only]] و [[:checked]] و [[:focus]]، ولازم الزائر يشوف الفرق.
- [[size]] و [[rows]] و [[cols]] شكل. [[maxlength]] و [[min]] و [[max]] و [[pattern]] حدود للزائر، والسيرفر بيفحص تاني.
- [[wrap="hard"]] بيبعت كسر السطور، و [[dirname]] بيبعت اتجاه النص.
- [[switch]] و [[<selectedcontent>]] لسه مش في كل المتصفحات.`,
          try: R`اعمل ملف [[renew.html]] فيه الفورم اللي في المثال، بس خلّيه [[method="get"]] و [[action="renew.html"]]. افتحه ودوس «جدّد» وبص على العنوان. وبعدين شيل العلامة من الـ checkbox ودوس تاني. وبعدين غيّر [[disabled]] اللي على كود الخصم لـ [[readonly]] وجرّب مرة تالتة.`,
          sol: R`~~~html renew.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تجديد الاشتراك</title>
</head>
<body>
<form action="renew.html" method="get">
  <p><label for="id">رقم العضوية</label> <input id="id" name="id" value="1042" readonly></p>
  <p><label for="coupon">كود الخصم</label> <input id="coupon" name="coupon" value="انتهى العرض" disabled></p>
  <p><input id="news" name="news" type="checkbox" checked> <label for="news">ابعتولي أخبار النادي</label></p>
  <button type="submit">جدّد</button>
</form>
</body>
</html>
~~~

~~~view 197 شكل الصفحة (الإرسال هنا بيتكتب تحت بدل ما يتبعت)
<form onsubmit="event.preventDefault(); sent.value = decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
  <p><label for="id">رقم العضوية</label> <input id="id" name="id" value="1042" readonly></p>
  <p><label for="coupon">كود الخصم</label> <input id="coupon" name="coupon" value="انتهى العرض" disabled></p>
  <p><input id="news" name="news" type="checkbox" checked> <label for="news">ابعتولي أخبار النادي</label></p>
  <button type="submit">جدّد</button>
</form>
<p>اللي كان هيتبعت: <output id="sent">(لسه)</output></p>
~~~

**هتشوف إيه:**

- **أول مرة:** العنوان آخره [[?id=1042&news=on]]. كود الخصم مش موجود (disabled).
- **بعد ما شلت العلامة:** [[?id=1042]] بس. مفيش [[news=off]]: الـ checkbox اللي مش متعلّم مبيتبعتش خالص.
- **بعد ما خليت الكود readonly:** [[?id=1042&coupon=...&news=on]]. الحقل بقى شكله عادي (مش باهت)، وقيمته بقت تتبعت.

~~~text القياس من Chrome (الطلب اللي وصل السيرفر المحلي، بالمثال زي ما هو)
POST /renew
content-type: application/x-www-form-urlencoded

id=1042&news=on
~~~`,
          deep: {
            why: R`فورم التعديل (تعديل بروفايل، تجديد اشتراك، تأكيد طلب) بيبقى نصه حقول جاية مملية ومقفولة. والغلطة اللي بتتكرر: المبرمج بيقفل الحقل بـ [[disabled]] عشان شكله «مقفول»، والسيرفر بيستلم الطلب من غير القيمة دي ويمسحها من قاعدة البيانات. الفرق بين الكلمتين في الشكل بسيط، وفي الطلب هو الفرق بين قيمة وصلت وقيمة ضاعت.`,
            how: R`لما المتصفح بيبني قايمة البيانات، بيعدّي على كل عنصر في الفورم وبيتخطّى: المتعطّل (هو نفسه أو [[<fieldset>]] فوقه)، والـ checkbox والـ radio اللي حالتهم مش checked، والـ [[<select>]] اللي مفيهوش اختيار، والعنصر اللي ملوش [[name]]. الـ readonly مش في القايمة دي، فبيتبعت. والفحص ([[required]] وإخواته) ليه قايمة تانية: المواصفة بتقول إن الـ disabled والـ readonly «barred from constraint validation»، يعني مستثنيين من الفحص. و [[checked]] و [[selected]] في الكود بيحددوا القيمة الافتراضية اللي زرار reset بيرجّعلها، والحالة الحالية متخزنة في المتصفح مش في الكود.`,
            when: R`[[readonly]]: رقم طلب أو عضوية، إجمالي محسوب، إيميل الحساب. [[disabled]]: اختيار مش متاح لباقة الزائر، حقل بيتفتح بعد اختيار تاني، زرار وهو بيبعت (لمنع الدبل كليك). [[checked]] و [[selected]]: القيمة الأشيع أو قيمة الزائر المحفوظة من قبل كده. [[<optgroup>]]: قايمة أطول من ٧ أو ٨ اختيارات ليها تقسيم طبيعي. [[size]]: خانة قصيّرة لكود قصيّر. [[wrap="hard"]] و [[dirname]]: حالات خاصة.`,
            mistakes: R`[[disabled]] مكان [[readonly]] والقيمة تضيع. [[readonly]] على checkbox أو select. الثقة في المقفول كأنه محمي. زرار إرسال متعطّل من غير سبب مكتوب. [[disabled="false"]]. [[:read-only]] في CSS وتستنى يمسك اللي عليه الكلمة بس. [[select multiple]] بدل checkboxes. و [[size]] أو [[cols]] على إنهم حدود.`
          },
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع، وبعدين صلّح:** فورم طلب الدولاب في «نادي الموج». اكتب على ورقة مين من الخمس حقول هيتبعت، ودوس «اطلب» وقارن. وبعدين صلّحه عشان الإجمالي ([[total]]) يوصل السيرفر والزائر برضه ميقدرش يغيّره. (من قسم ١ و ٢ و ٣ في الشرح)`, done: R`توقّعت [[member]] و [[locker]] بس، وبعد التصليح [[total=450]] بقى في الناتج، وكل الشروط ✓.`, work: { h: 270, start: R`<form onsubmit="event.preventDefault(); sent.value = decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
  <p><label for="m">رقم العضوية</label> <input id="m" name="member" value="1042" readonly></p>
  <p><label for="t">الإجمالي</label> <input id="t" name="total" value="450" disabled></p>
  <fieldset disabled>
    <legend>الكارت القديم</legend>
    <input name="old_card" value="7781" aria-label="رقم الكارت القديم">
  </fieldset>
  <p><label><input type="checkbox" name="towel"> فوطة</label>
     <label><input type="checkbox" name="locker" checked> دولاب</label></p>
  <button>اطلب</button>
</form>
<p>اللي كان هيتبعت: <output id="sent">(دوس «اطلب»)</output></p>`, checks: [
              { say: R`الإجمالي بقى [[readonly]]`, q: "input[name=\"total\"][readonly]" },
              { say: R`الإجمالي مش [[disabled]]`, q: "input[name=\"total\"][disabled]", n: 0 },
              { say: R`رقم العضوية لسه [[readonly]]`, q: "input[name=\"member\"][readonly]" },
              { say: R`الكارت القديم لسه جوه [[<fieldset disabled>]]`, q: "fieldset[disabled] input[name=\"old_card\"]" },
            ] }, sol: R`~~~live 270 بعد التصليح
<form onsubmit="event.preventDefault(); sent.value = decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
  <p><label for="m">رقم العضوية</label> <input id="m" name="member" value="1042" readonly></p>
  <p><label for="t">الإجمالي</label> <input id="t" name="total" value="450" readonly></p>
  <fieldset disabled>
    <legend>الكارت القديم</legend>
    <input name="old_card" value="7781" aria-label="رقم الكارت القديم">
  </fieldset>
  <p><label><input type="checkbox" name="towel"> فوطة</label>
     <label><input type="checkbox" name="locker" checked> دولاب</label></p>
  <button>اطلب</button>
</form>
<p>اللي كان هيتبعت: <output id="sent">(دوس «اطلب»)</output></p>
~~~

**هتشوف إيه:**

- قبل التصليح: الإجمالي باهت، والناتج [[member=1042&locker=on]].
- بعد التصليح: الإجمالي بقى شكله عادي ولسه مبيتكتبش فيه، والناتج [[member=1042&total=450&locker=on]].

| الحقل | اتبعت؟ | ليه |
|---|---|---|
| [[member]] (readonly) | أيوه | الـ readonly بيتبعت |
| [[total]] (كان disabled) | لأ، وبعد التصليح أيوه | الـ disabled مبيتبعتش |
| [[old_card]] (جوه fieldset disabled) | لأ | الـ fieldset عطّل كل اللي جواه |
| [[towel]] (مش متعلّم) | لأ | الـ checkbox المش متعلّم مبيتبعتش |
| [[locker]] (checked) | أيوه | متعلّم ومن غير value: [[on]] |

**الغلطة الشائعة:** تسيب الإجمالي disabled وتزوّد hidden بنفس الاسم. بيشتغل، بس readonly أبسط لخانة نص. الـ hidden بتحتاجه مع checkbox و select بس.

~~~text القياس من Chrome (الطلب اللي وصل السيرفر المحلي)
قبل:   member=1042&locker=on
بعد:   member=1042&total=450&locker=on
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** في صفحة «باقتك الحالية» المبرمج حط [[readonly]] على الـ [[<select>]] وعلى الـ checkbox عشان العضو ميغيّرهمش. بس الاتنين بيتغيّروا عادي. اقفلهم بجد، وخلّي قيمتهم ([[plan=gold]] و [[rules=on]]) تفضل تتبعت. (من قسم ٢ و ٣ في الشرح: الجدول «readonly ولا disabled؟»)`, done: R`الـ select والـ checkbox بقوا [[disabled]]، وفيه حقلين hidden بيبعتوا [[plan]] و [[rules]]، وكل الشروط ✓.`, work: { h: 158, start: R`<form onsubmit="event.preventDefault(); sent.value = decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
  <p><label for="plan">الباقة</label>
  <select id="plan" name="plan" readonly>
    <option value="silver">فضي</option>
    <option value="gold" selected>دهبي</option>
  </select></p>
  <p><label><input type="checkbox" name="rules" checked readonly> موافق على لايحة النادي</label></p>
  <button>أكّد</button>
</form>
<p>اللي كان هيتبعت: <output id="sent">(غيّر الباقة ودوس «أكّد»)</output></p>`, checks: [
              { say: R`الـ [[<select>]] بقى [[disabled]]`, q: "select[disabled]" },
              { say: R`الـ checkbox بقى [[disabled]] ولسه [[checked]]`, q: "input[type=\"checkbox\"][disabled][checked]" },
              { say: R`حقل hidden بيبعت [[plan=gold]]`, q: "input[type=\"hidden\"][name=\"plan\"][value=\"gold\"]" },
              { say: R`حقل hidden بيبعت [[rules=on]]`, q: "input[type=\"hidden\"][name=\"rules\"][value=\"on\"]" },
              { say: R`مفيش [[readonly]] على select أو checkbox`, q: "select[readonly], input[type=\"checkbox\"][readonly]", n: 0 },
            ] }, sol: R`~~~live 158 بعد التصليح
<form onsubmit="event.preventDefault(); sent.value = decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
  <input type="hidden" name="plan" value="gold">
  <input type="hidden" name="rules" value="on">
  <p><label for="plan">الباقة</label>
  <select id="plan" disabled>
    <option value="silver">فضي</option>
    <option value="gold" selected>دهبي</option>
  </select></p>
  <p><label><input type="checkbox" checked disabled> موافق على لايحة النادي</label></p>
  <button>أكّد</button>
</form>
<p>اللي كان هيتبعت: <output id="sent">(دوس «أكّد»)</output></p>
~~~

**هتشوف إيه:**

- قبل التصليح: تقدر تفتح القايمة وتختار «فضي» وتشيل علامة الموافقة، والناتج يبقى [[plan=silver]] بس. الـ readonly معملش حاجة.
- بعد التصليح: القايمة والمربع باهتين ومبيتداسوش، والناتج دايمًا [[plan=gold&rules=on]].

**ليه كده:**

- [[readonly]] بيشتغل على خانات الكتابة بس. على select و checkbox المتصفح بيتجاهله.
- [[disabled]] بيقفلهم، بس بيمنعهم يتبعتوا. فالقيمة راحت لحقل [[hidden]] بنفس الـ [[name]].
- شلنا [[name]] من الـ select والـ checkbox المتعطّلين: مش هيتبعتوا في كل الأحوال، والاسم دلوقتي بتاع الـ hidden.

**الغلطة الشائعة:** تحط [[disabled]] وتنسى الـ hidden. الشكل هيبقى صح، والسيرفر هيستلم طلب من غير باقة.

~~~text القياس من Chrome (الطلب اللي وصل السيرفر المحلي)
قبل (بعد ما غيّرنا الباقة وشلنا العلامة):   plan=silver
بعد:                                        plan=gold&rules=on
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** فورم «جدّد اشتراكك». المطلوب: رقم العضوية [[1042]] يتشاف ويتبعت وميتعدّلش، وقايمة اللعبة متقسّمة مجموعتين («ألعاب مية»: سباحة وكرة ماء، و «ألعاب صالة»: سلة وجودو) وبتبدأ على «سلة»، و checkbox الأخبار بيبدأ متعلّم، وخانة ملاحظات ٤ سطور وأقصاها ٢٠٠ حرف. (من قسم ٢ و ٥ و ٦ و ٧ و ٩ في الشرح)`, done: R`الفورم فيه الأربع حاجات بحالاتها الأولى الصح، وكل الشروط ✓.`, work: { h: 363, start: R`<h1>جدّد اشتراكك</h1>
<form>
  رقم العضوية: 1042
  اللعبة: سباحة، كرة ماء، سلة، جودو
  ابعتولي أخبار النادي
  ملاحظات
  <button>جدّد</button>
</form>`, checks: [
              { say: R`رقم العضوية حقل [[readonly]] قيمته [[1042]] وليه [[name]]`, q: "input[readonly][value=\"1042\"][name]" },
              { say: R`القايمة فيها مجموعتين [[<optgroup>]] بعناوين`, q: "select optgroup[label]", n: 2 },
              { say: R`أربع اختيارات، كل واحد جوه مجموعة`, q: "select optgroup option", n: 4 },
              { say: R`«سلة» عليها [[selected]]`, q: "option[selected]", has: "سلة" },
              { say: R`الـ checkbox بيبدأ متعلّم ([[checked]])`, q: "input[type=\"checkbox\"][checked][name]" },
              { say: R`الملاحظات [[<textarea>]] بـ [[rows="4"]] و [[maxlength="200"]]`, q: "textarea[rows=\"4\"][maxlength=\"200\"][name]" },
            ] }, sol: R`~~~live 363 الحل
<h1>جدّد اشتراكك</h1>
<form onsubmit="event.preventDefault(); sent.value = decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
  <p><label for="id">رقم العضوية</label> <input id="id" name="id" value="1042" readonly size="6"></p>
  <p><label for="sport">اللعبة</label>
  <select id="sport" name="sport">
    <optgroup label="ألعاب مية">
      <option value="swim">سباحة</option>
      <option value="polo">كرة ماء</option>
    </optgroup>
    <optgroup label="ألعاب صالة">
      <option value="basket" selected>سلة</option>
      <option value="judo">جودو</option>
    </optgroup>
  </select></p>
  <p><input id="news" name="news" type="checkbox" checked> <label for="news">ابعتولي أخبار النادي</label></p>
  <p><label for="note">ملاحظات (٢٠٠ حرف)</label><br>
  <textarea id="note" name="note" rows="4" cols="30" maxlength="200"></textarea></p>
  <button>جدّد</button>
</form>
<p>اللي كان هيتبعت: <output id="sent">(لسه)</output></p>
~~~

**هتشوف إيه:**

- خانة رقم العضوية قصيّرة ([[size="6"]]) ومبيتكتبش فيها.
- القايمة مقفولة على «سلة»، ولما تفتحها الاختيارات تحت عنوانين.
- المربع متعلّم من الأول.
- دوس «جدّد» من غير ما تلمس حاجة: [[id=1042&sport=basket&news=on&note=]]. الملاحظات اتبعتت فاضية.

**ليه كده:**

- [[value]] على كل [[<option>]] بالإنجليزي: السيرفر بيستلم [[basket]] مش «سلة»، فالاسم المعروض يتغيّر من غير ما كود السيرفر يتكسر.
- [[rows]] و [[cols]] للشكل، و [[maxlength]] هو الحد.

**الغلطة الشائعة:** تكتب [[<option selected="false">]] على الباقي «للتأكيد». أي [[selected]] معناها «مختار» مهما كانت القيمة، والأخير هو اللي هيكسب.

~~~text القياس من Chrome (الطلب اللي وصل السيرفر المحلي)
POST /renew2
content-type: application/x-www-form-urlencoded

id=1042&sport=basket&news=on&note=
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** خانة كود الخصم في المتجر فيها ٣ غلطات: [[size="8"]] مكتوب على إنه الحد الأقصى، و [[disabled="false"]] عشان «الخانة شغالة»، وخانة الملاحظات [[wrap="hard"]] من غير [[cols]]. صلّحهم: الكود أقصاه ٨ حروف، والخانة شغالة، والملاحظات بتتبعت سطر واحد. (من قسم ٧ و ٨ و ٩ و ١١ في الشرح)`, done: R`الخانة بتتكتب فيها وبتقف عند ٨ حروف، والملاحظات [[soft]]، وكل الشروط ✓.`, work: { h: 213, start: R`<form onsubmit="event.preventDefault(); sent.value = decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
  <p><label for="code">كود الخصم (٨ حروف)</label> <input id="code" name="code" size="8" disabled="false"></p>
  <p><label for="note">ملاحظات</label><br>
  <textarea id="note" name="note" rows="3" wrap="hard"></textarea></p>
  <button>طبّق</button>
</form>
<p>اللي كان هيتبعت: <output id="sent">(لسه)</output></p>`, checks: [
              { say: R`خانة الكود مفيهاش [[disabled]] خالص`, q: "input#code[disabled]", n: 0 },
              { say: R`خانة الكود عليها [[maxlength="8"]]`, q: "input#code[maxlength=\"8\"]" },
              { say: R`الملاحظات مش [[wrap="hard"]]`, q: "textarea[wrap=\"hard\" i]", n: 0 },
              { say: R`الملاحظات لسه [[rows="3"]] وليها [[name]]`, q: "textarea[rows=\"3\"][name]" },
            ] }, sol: R`~~~live 213 بعد التصليح
<form onsubmit="event.preventDefault(); sent.value = decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
  <p><label for="code">كود الخصم (٨ حروف)</label> <input id="code" name="code" size="8" maxlength="8"></p>
  <p><label for="note">ملاحظات</label><br>
  <textarea id="note" name="note" rows="3" cols="30"></textarea></p>
  <button>طبّق</button>
</form>
<p>اللي كان هيتبعت: <output id="sent">(لسه)</output></p>
~~~

وده اللي كان باين قبل التصليح:

~~~live 171 قبل
<form onsubmit="return false">
  <p><label for="code">كود الخصم (٨ حروف)</label> <input id="code" name="code" size="8" disabled="false"></p>
  <p><label for="note">ملاحظات</label><br>
  <textarea id="note" name="note" rows="3" wrap="hard"></textarea></p>
  <button>طبّق</button>
</form>
~~~

**هتشوف إيه:**

- قبل: خانة الكود باهتة ومبيتكتبش فيها خالص.
- بعد: بتكتب فيها، والكتابة بتقف لوحدها عند الحرف الثامن.

| الغلطة | التصليح | ليه |
|---|---|---|
| [[disabled="false"]] | الكلمة اتشالت كلها | attribute من نوع boolean: وجوده = أيوه، مهما كانت القيمة |
| [[size="8"]] كحد | زوّدنا [[maxlength="8"]] | [[size]] عرض الخانة بس |
| [[wrap="hard"]] من غير [[cols]] | رجعت للافتراضي ([[soft]]) | المطلوب سطر واحد، و [[hard]] أصلًا محتاج [[cols]] |

**الغلطة الشائعة:** تمسح [[="false"]] وتسيب كلمة [[disabled]]. لازم الكلمة نفسها تتشال.

~~~text القياس من Chrome
<input disabled="false">    →   input.disabled = true
<input size="8"> وفيه 20 حرف        →   اتقبلوا كلهم
<input maxlength="8"> وكتبنا 12 حرف   →   اتسجّل أول 8 بس: ABCDEFGH
~~~` },
            { lvl: 'سريع', t: R`**اشرحها:** زميلك كتب في الـ CSS [[input:read-only { background: #eee; }]] عشان يلوّن الحقلين اللي عليهم [[readonly]]، ولقى أزرار الـ submit والـ checkboxes والحقول المتعطّلة اتلوّنوا كلهم. اشرحله ليه في سطرين، واكتبله الـ selector الصح. (من قسم ٤ في الشرح: الحالات في الـ CSS)`, done: R`كتبت إن [[:read-only]] بيمسك أي عنصر مبيتكتبش فيه، وإن البديل [[input[readonly]]].`, sol: R`**إجابة نموذجية:**

1. [[:read-only]] مش معناها «عليه كلمة readonly». معناها «الزائر ميقدرش يكتب فيه»: وده بيشمل الحقل المتعطّل، والـ checkbox والـ radio والزرار (مفيش كتابة فيهم أصلًا)، وحتى [[<p>]] العادي.
2. لو المطلوب الحقول اللي عليها الكلمة بالظبط، امسكهم بالـ attribute نفسه:

~~~css
input[readonly] { background: #eee; }
~~~

والأقواس المربعة في الـ CSS معناها «العنصر اللي عليه الـ attribute ده» (درس «selectors»).

~~~text القياس من Chrome: matches(":read-only")
<input readonly>            true
<input disabled>            true
<input type="checkbox">     true
<input type="submit">       true
<input type="date">         false
<input> العادي              false
~~~

**الغلطة الشائعة العكسية:** تستخدم [[input[disabled]]] وتنسى الحقول اللي اتعطّلت بسبب [[<fieldset disabled>]] فوقها: دي مفيش عليها الكلمة. هناك الصح [[:disabled]]، لأنه بيمسك الحالة الفعلية.` }
          ]
        },
        {
          cmd: "datalist و output",
          title: "اقتراحات وانت بتكتب، ونتيجة بتتحسب قدامك",
          pre: ["css/fieldset و radio", { to: "css/أنواع input كلها", why: R`[[type="range"]] اللي هنحط جنبه [[<output>]] اتشرح هناك في القسم ٣` }],
          ref: [
            { t: "MDN: <datalist>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/datalist" },
            { t: "MDN: <output>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/output" },
            { t: "WHATWG: the datalist element", url: "https://html.spec.whatwg.org/multipage/form-elements.html#the-datalist-element" },
            { t: "WHATWG: the output element", url: "https://html.spec.whatwg.org/multipage/form-elements.html#the-output-element" },
            { t: "WHATWG: the list attribute", url: "https://html.spec.whatwg.org/multipage/input.html#the-list-attribute" }
          ],
          desc: R`عنصرين بيكمّلوا الحقول: [[<datalist>]] قايمة **اقتراحات** بتظهر تحت الخانة والزائر بيكتب (ولسه يقدر يكتب أي حاجة تانية)، و [[<output>]] مكان بتتعرض فيه **نتيجة** اتحسبت من حقول الفورم.
الأول بيتربط بالخانة بـ [[list]]، والتاني بيقول هو نتيجة أنهي حقول بـ [[for]].`,
          example: R`<form oninput="total.value = Number(months.value) * 300">
  <label for="city">المدينة</label>
  <input id="city" name="city" list="cities">
  <datalist id="cities">
    <option value="طنطا"></option>
    <option value="المنصورة"></option>
  </datalist>
  <label for="months">عدد الشهور</label>
  <input id="months" name="months" type="range" min="1" max="12" value="3">
  <output id="total" name="total" for="months">900</output>
</form>`,
          flag: "script",
          lines: [
            R`[[oninput]] سطر JavaScript بيشتغل مع كل تغيير في أي حقل جوه الفورم: بياخد قيمة [[months]]، يحوّلها رقم بـ [[Number()]]، يضربها في ٣٠٠، ويحط الناتج في [[total]]. (القسم ٥ بيفكّه.)`,
            R`اسم خانة المدينة، مربوط بيها بـ [[for="city"]].`,
            R`خانة نص عادية، والجديد فيها [[list="cities"]]: «اقتراحاتك في العنصر اللي الـ [[id]] بتاعه [[cities]]».`,
            R`[[<datalist id="cities">]] قايمة الاقتراحات. العنصر نفسه مبيظهرش في الصفحة: المتصفح بيعرض اللي جواه تحت الخانة لما الزائر يكتب.`,
            R`كل [[<option>]] اقتراح. [[value]] هو الكلام اللي هيتحط في الخانة لو الزائر اختاره.`,
            R`اقتراح تاني. الزائر مش مجبر على الاتنين: يقدر يكتب «أسيوط» عادي.`,
            R`[[</datalist>]] آخر الاقتراحات: أي [[<option>]] بعد كده مش تبع القايمة دي.`,
            R`اسم الشريط، وهو اللي بيقول الشريط ده بيقيس إيه.`,
            R`شريط من ١ لـ ١٢ بيبدأ من ٣ (درس «أنواع input كلها»). الشريط مبيكتبش رقمه، وعشان كده محتاج اللي في السطر الجاي.`,
            R`[[<output>]] مكان النتيجة. [[for="months"]] بيقول إنها محسوبة من الحقل [[months]]. و [[900]] القيمة اللي بتظهر قبل ما الزائر يلمس حاجة (٣ × ٣٠٠).`,
            R`[[</form>]] آخر الفورم: سطر [[oninput]] بيسمع للحقول اللي جوه الفورم ده بس.`
          ],
          teach: R`## الفكرة في سطرين

[[<datalist>]] بيحل مشكلة «عايز أساعد الزائر باختيارات جاهزة من غير ما أحبسه فيها». و [[<output>]] بيحل مشكلة «عايز أعرض نتيجة، ويبقى واضح للمتصفح ولقارئ الشاشة إنها نتيجة مش كلام عادي».

القياسات من Chrome 157 على Windows 11.

---

## ١. [[<datalist>]] و [[<input list="cities">]]

~~~live 37 دوس في الخانة
<label for="city">المدينة</label>
<input id="city" name="city" list="cities">
<datalist id="cities">
  <option value="طنطا"></option>
  <option value="المنصورة"></option>
  <option value="أسوان"></option>
</datalist>
~~~

**هتشوف إيه:**

- خانة نص شكلها عادي.
- لما تدوس جواها أو تكتب، قايمة بتنزل تحتها فيها الاقتراحات اللي فيها الحروف اللي كتبتها.
- اختار واحد: اتكتب في الخانة. أو كمّل كتابة «أسيوط» (مش في القايمة): الخانة قبلتها عادي.
- الـ [[<datalist>]] نفسه ملوش أي أثر في الصفحة.

الربط بكلمتين لازم يتطابقوا حرف بحرف: [[list="cities"]] على الخانة، و [[id="cities"]] على القايمة. زي [[for]] و [[id]] بتوع الـ label.

~~~text القياس من Chrome
input.list === عنصر الـ datalist       true        (الربط اتعمل)
عدد الاقتراحات                         3
role الخانة                            combobox    (بدل textbox: قارئ الشاشة بيعرف إن معاها قايمة)
datalist:  display = none
كتبنا «بلد مش في القايمة»:             validity.valid = true      واتبعتت زي ما هي
list="nope" (id مش موجود):             input.list = null ، والخانة رجعت textbox عادي
~~~

آخر سطر مهم: لو الـ [[id]] غلط، **مفيش أي خطأ بيظهر**. الخانة بتشتغل كخانة نص عادية من غير اقتراحات.

### [[value]] و [[label]] على الاقتراح

~~~html
<option value="ASW" label="أسوان"></option>
~~~

[[value]] هو اللي بيتكتب في الخانة وبيتبعت. و [[label]] كلام بيتعرض جنبه في القايمة. شكل العرض بيختلف من متصفح لمتصفح (من MDN)، فالأضمن إن [[value]] نفسه يبقى الكلام اللي الزائر يفهمه.

---

## ٢. [[<datalist>]] ولا [[<select>]]؟

| | [[<datalist>]] | [[<select>]] |
|---|---|---|
| الزائر يكتب حاجة برّه القايمة | **أيوه** | لأ |
| بيدوّر جوه الاختيارات بالكتابة | أيوه | على الأول حرف بس |
| القيمة مضمونة من القايمة | **لأ** | أيوه |
| مناسب لـ | اقتراحات: مدينة، مهنة، اسم نادي | اختيار من مجموعة مقفولة: المقاس، الباقة |

القاعدة: لو السيرفر بيقبل **أي** قيمة والقايمة للمساعدة بس، [[<datalist>]]. لو القيمة لازم تبقى واحدة من القايمة، [[<select>]] (أو radio لو الاختيارات قليلة).

ومتحاولش تحوّل [[<datalist>]] لقايمة مقفولة: هو مبيفحصش حاجة، ومفيش attribute بيقوله «اللي في القايمة بس».

---

## ٣. [[list]] مع أنواع غير النص

[[list]] بيشتغل مع أغلب أنواع [[<input>]]، وكل نوع بيعرض الاقتراحات بطريقته (التفاصيل من MDN):

~~~live 44 الشريط بقى عليه علامات
<label for="months">عدد الشهور (١ لـ ١٢)</label>
<input id="months" type="range" min="1" max="12" value="3" list="marks">
<datalist id="marks">
  <option value="1"></option>
  <option value="3"></option>
  <option value="6"></option>
  <option value="12"></option>
</datalist>
~~~

**هتشوف إيه:** تحت الشريط ٤ شرط صغيرة عند ١ و ٣ و ٦ و ١٢ (المدد اللي النادي بيبيعها). الدايرة لسه بتقف في أي مكان، بس الزائر شايف القيم المهمة فين.

| النوع | الاقتراحات بتظهر إزاي |
|---|---|
| [[text]] و [[search]] و [[url]] و [[tel]] و [[email]] و [[number]] | قايمة تحت الخانة |
| [[range]] | علامات على الشريط |
| [[color]] | ألوان جاهزة في نافذة الألوان |
| [[date]] و [[time]] وباقي أنواع التاريخ | قيم جاهزة في نافذة الاختيار |

مبيشتغلش مع: [[hidden]] و [[password]] و [[checkbox]] و [[radio]] و [[file]] والأزرار.

**الدعم:** المنهج (بيانات Baseline) بيقول إن [[<datalist>]] مش Baseline، و MDN بيقول إن الدعم في بعض المتصفحات ناقص مع الأنواع غير النصية. مع خانة النص الخطر قليل: المتصفح اللي مبيعرضش الاقتراحات بيسيب خانة نص شغالة.

وحاجتين من MDN عن الـ accessibility: حجم خط الاقتراحات مبيكبرش مع تكبير الصفحة، وشكل القايمة مبيتنسّقش بالـ CSS. فمتحطش في الاقتراحات معلومة الزائر محتاجها عشان يكمّل.

---

## ٤. [[<output>]]: مكان النتيجة

المواصفة: [[<output>]] بيمثّل نتيجة عملية حسابية عملها التطبيق، أو نتيجة حاجة الزائر عملها.

~~~live 88 اسحب الشريط
<form oninput="total.value = Number(months.value) * 300">
  <p><label for="months">عدد الشهور</label>
  <input id="months" name="months" type="range" min="1" max="12" value="3"></p>
  <p><label for="total">الإجمالي بالجنيه</label>
  <output id="total" name="total" for="months">900</output></p>
</form>
~~~

**هتشوف إيه:** الإجمالي بيتغيّر وانت بتسحب: ٣ شهور ٩٠٠، و ٦ شهور ١٨٠٠، و ١٢ شهر ٣٦٠٠.

شكله زي [[<span>]] بالظبط: كلام عادي في السطر. الفرق كله في المعنى:

~~~text القياس من Chrome
display = inline                 (ملوش شكل خاص)
role = status                    (في شجرة الـ accessibility)
الاسم = «الإجمالي بالجنيه»       (من الـ label: output بيقبل label زي الحقول)
output.value = 900               output.htmlFor = months
بعد ما الشريط بقى 6:             output.value = 1800
بعد reset للفورم:                output.value = 900      (رجع للكلام المكتوب جواه في الكود)
مفاتيح البيانات اللي بتتبعت:     months      (total مش فيهم)
~~~

- **[[role = status]]:** ده «live region»: قارئ الشاشة بيقرا التغيير لما يحصل، من غير ما الزائر يسيب الحقل اللي هو فيه (حسب MDN و ARIA، ومش متقاس بقارئ شاشة هنا). لو النتيجة في [[<span>]] عادي، الزائر الكفيف هيسحب الشريط ومش هيعرف إن فيه رقم اتغيّر.
- **بياخد [[<label>]]:** الاسم اللي فوق اتقاس من [[<label for="total">]].
- **[[for]]:** الـ [[id]] بتاع الحقل (أو الحقول، بينهم مسافة) اللي النتيجة محسوبة منهم: [[for="qty price"]]. معلومة للمتصفح والأدوات، ومش هي اللي بتحسب.
- **مبيتبعتش.** حتى وعليه [[name]]. الـ [[name]] بيخلّي JavaScript يوصله من الفورم ([[total.value]])، مش أكتر. لو السيرفر محتاج الإجمالي، يحسبه هو من [[months]] (وده الصح: متثقش في إجمالي جاي من المتصفح).

---

## ٥. سطر الحساب، حتة حتة

الـ HTML لوحده مبيحسبش. اللي بيحسب سطر JavaScript واحد مكتوب في [[oninput]] على الفورم:

~~~html
<form oninput="total.value = Number(months.value) * 300">
~~~

| الحتة | معناها |
|---|---|
| [[oninput="..."]] | الكود ده يشتغل كل ما قيمة أي حقل جوه الفورم تتغيّر (حرف اتكتب، شريط اتسحب) |
| [[months.value]] | قيمة الحقل اللي اسمه [[months]]. جوه [[oninput]] بتاع الفورم، حقول الفورم بتتنادى بأساميها |
| [[Number(...)]] | قيمة أي حقل **نص** حتى لو شكلها رقم (درس «textarea و date و number»). [[Number]] بيحوّلها لرقم |
| [[* 300]] | ضرب في سعر الشهر |
| [[total.value = ...]] | حط الناتج في الـ output اللي اسمه [[total]] |

ولو عايز رقم الشهور نفسه يظهر جنب الشريط، [[<output>]] تاني وأمر تاني قبله، وبينهم فاصلة منقوطة:

~~~live 88 الاتنين بيتحركوا
<form oninput="shown.value = months.value; total.value = Number(months.value) * 300">
  <p><label for="months">عدد الشهور</label>
  <input id="months" name="months" type="range" min="1" max="12" value="3">
  <output id="shown" for="months">3</output></p>
  <p><label for="total">الإجمالي بالجنيه</label>
  <output id="total" name="total" for="months">900</output></p>
</form>
~~~

ده أقصى JavaScript في الكورس ده. الأحداث ([[input]] و [[change]] و [[submit]]) وكتابة الكود في ملف لوحده بدل الـ attribute: كورس JavaScript.

**لازم تكتب القيمة الأولى بإيدك** جوه الـ [[<output>]] ([[900]]): [[oninput]] مبيشتغلش إلا لما الزائر يغيّر حاجة، فمن غيرها النتيجة هتبدأ فاضية.

---

## ٦. [[<output>]] ولا حاجة تانية؟

| عايز تعرض | العنصر |
|---|---|
| نتيجة بتتغيّر مع الحقول (إجمالي، عدد حروف باقي، قيمة شريط) | [[<output>]] |
| قيمة ثابتة لازم تتبعت | [[<input readonly>]] (درس «readonly و disabled و checked») |
| نسبة إنجاز أو قياس | [[<progress>]] أو [[<meter>]] (الدرس الجاي) |
| كلام عادي مبيتغيّرش | [[<p>]] أو [[<span>]] |

---

## ٧. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[list]] و [[id]] مش متطابقين | مفيش اقتراحات، ومفيش خطأ |
| [[list="cities"]] و [[id="cities"]] على نفس الخانة | [[list]] بيشاور على الـ [[<datalist>]] مش على الخانة |
| [[<datalist>]] على إنه قايمة مقفولة | أي قيمة بتتقبل وبتتبعت |
| اقتراحات [[<option>]] من غير [[value]] ومن غير كلام | القايمة بتطلع فيها سطور فاضية |
| نتيجة في [[<span>]] | قارئ الشاشة مبيعرفش إنها اتغيّرت |
| [[<output>]] فاضي في الكود | النتيجة فاضية لحد ما الزائر يلمس حقل |
| تستنى [[<output name="total">]] يتبعت | مبيتبعتش أبدًا، حتى وعليه [[name]] |
| [[months.value * 300]] من غير [[Number]] | الضرب هنا بيشتغل، بس الجمع ([[+]]) هيلزق النصين في بعض |

---

## الخلاصة

- [[<datalist id="x">]] + [[<input list="x">]]: اقتراحات، والزائر حر يكتب غيرها. مفيش فحص.
- قيمة لازم تبقى من القايمة: [[<select>]].
- [[list]] مع [[range]] بيرسم علامات على الشريط.
- [[<output>]]: نتيجة. شكله نص عادي، و role بتاعه [[status]]، وبياخد label، ومبيتبعتش.
- [[for]] على الـ output: الحقول اللي النتيجة منهم.
- الحساب نفسه سطر [[oninput]] على الفورم، والقيمة الأولى مكتوبة بإيدك.`,
          try: R`اعمل ملف [[price.html]] فيه فورم جواه: خانة عدد ([[type="number"]] اسمها [[qty]] وقيمتها ٢)، و [[<output>]] اسمه [[total]] جواه ١٠٠، وسطر [[oninput]] بيضرب العدد في ٥٠. افتحه وغيّر العدد. وبعدين امسح [[Number( )]] من السطر وخلّي العملية جمع: [[qty.value + 50]]، وبص على النتيجة.`,
          sol: R`~~~live 37 price.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>السعر</title>
</head>
<body>
<form oninput="total.value = Number(qty.value) * 50">
  <label for="qty">عدد الحصص</label>
  <input id="qty" name="qty" type="number" min="1" value="2">
  <label for="total">الإجمالي</label>
  <output id="total" name="total" for="qty">100</output>
</form>
</body>
</html>
~~~

**هتشوف إيه:**

- غيّر العدد لـ ٣: الإجمالي بقى ١٥٠. لـ ١٠: بقى ٥٠٠.
- **بعد ما خليتها [[qty.value + 50]]:** العدد ٣ بيطلّع [[350]] مش ٥٣. القيمة نص، وعلامة [[+]] بين نصين بتلزقهم: «3» و «50» بقوا «350».
- رجّع [[Number(qty.value) + 50]]: بقت ٥٣.

~~~text القياس من Chrome
Number(qty.value) * 50   والعدد 3   →   150
qty.value + 50           والعدد 3   →   350     (لزق مش جمع)
Number(qty.value) + 50   والعدد 3   →   53
~~~

عشان كده [[Number()]] بيتكتب دايمًا، حتى مع الضرب اللي بيشتغل من غيره.`,
          deep: {
            why: R`الاتنين بيعملوا حاجة كانت بتتعمل بمكتبات JavaScript كاملة. الاقتراحات وانت بتكتب (autocomplete) من أكتر الحاجات المطلوبة في أي فورم، و [[<datalist>]] بيدّيها بـ ٥ سطور HTML بتشتغل بالكيبورد وعلى الموبايل. والنتيجة اللي بتتغيّر قدام الزائر (إجمالي، عدّاد) لو اتحطت في عنصر عادي، مستخدم قارئ الشاشة مبيعرفش إنها موجودة أصلًا.`,
            how: R`الخانة اللي عليها [[list]] بتدوّر في الصفحة على عنصر [[<datalist>]] بنفس الـ [[id]]. لو لقته، المتصفح بياخد الـ [[<option>]] اللي جواه (اللي مش [[disabled]] وليهم [[value]]) ويعرضهم كاقتراحات مفلترة بالمكتوب، وبيغيّر role الخانة لـ [[combobox]]. الاختيار بيحط الـ [[value]] في الخانة كأن الزائر كتبه، ومفيش أي ربط تاني. و [[<output>]] عنصر من عناصر الفورم ([[form.elements]] بيعدّه) بس مستثنى من الإرسال ومن الفحص. قيمته هي النص اللي جواه، وقيمته الافتراضية (اللي reset بيرجّعلها) هي النص المكتوب في الكود. والمتصفح بيدّيه role [[status]]، وده معناه [[aria-live="polite"]] ضمنًا.`,
            when: R`[[<datalist>]]: مدينة، مهنة، جنسية، اسم مدرسة، كلمات بحث شائعة، قيم جاهزة لخانة رقم. [[list]] على [[range]]: لما فيه قيم مميزة على الشريط. [[<output>]]: الرقم اللي جنب [[range]]، إجمالي سلة، عدد الحروف الباقية، نتيجة حاسبة.`,
            mistakes: R`[[list]] بيشاور على [[id]] مش موجود ومحدش بيلاحظ. الاعتماد على [[<datalist>]] كأنه بيمنع القيم التانية. اقتراحات بالمئات (القايمة بتبقى مش عملية: ده شغل بحث على السيرفر). [[<output>]] من غير قيمة أولى. نسيان [[Number()]]. وإنك تبعت الإجمالي من المتصفح وتثق فيه.`
          },
          practice: [
            { lvl: 'تطبيق', t: R`**ابني:** خانة «اللعبة اللي بتحبها» في استبيان «نادي الموج»: خانة نص معاها ٣ اقتراحات (سباحة، كرة ماء، جودو)، والعضو يقدر يكتب لعبة تانية. وتحتها شريط «كام ساعة في الأسبوع» من ١ لـ ١٠ ومعاه [[<output>]] بيعرض الرقم. (من قسم ١ و ٤ و ٥ في الشرح)`, done: R`الخانة مربوطة بـ [[<datalist>]] فيه ٣ اقتراحات، والـ output مربوط بالشريط وبيبدأ بنفس قيمته، وكل الشروط ✓.`, work: { h: 120, start: R`<form>
  اللعبة اللي بتحبها: سباحة، كرة ماء، جودو (أو اكتب غيرهم)
  كام ساعة في الأسبوع (من ١ لـ ١٠)
</form>`, checks: [
              { say: R`خانة عليها [[list="sports"]] وليها [[name]]`, q: "input[list=\"sports\"][name]" },
              { say: R`[[<datalist id="sports">]] فيه ٣ اقتراحات ليهم [[value]]`, q: "datalist#sports option[value]", n: 3 },
              { say: R`شريط [[type="range"]] من ١ لـ ١٠ والـ [[id]] بتاعه [[hours]]`, q: "input#hours[type=\"range\"][min=\"1\"][max=\"10\"]" },
              { say: R`[[<output for="hours">]] جنب الشريط`, q: "output[for=\"hours\"]" },
              { say: R`الفورم عليه سطر [[oninput]] بيحدّث الـ output`, q: "form[oninput]" },
              { say: R`الخانة والشريط ليهم [[<label>]]`, q: "label[for]", min: 2 },
            ] }, sol: R`~~~live 91 109 الحل
<form oninput="shown.value = hours.value">
  <p><label for="sport">اللعبة اللي بتحبها</label>
  <input id="sport" name="sport" list="sports">
  <datalist id="sports">
    <option value="سباحة"></option>
    <option value="كرة ماء"></option>
    <option value="جودو"></option>
  </datalist></p>
  <p><label for="hours">كام ساعة في الأسبوع (من ١ لـ ١٠)</label>
  <input id="hours" name="hours" type="range" min="1" max="10" value="4">
  <output id="shown" for="hours">4</output></p>
</form>
~~~

**هتشوف إيه:**

- دوس في الخانة: التلات اقتراحات نزلوا. اكتب «تنس»: اتقبلت.
- اسحب الشريط: الرقم اللي جنبه بيتغيّر معاه.

**ليه كده:**

- [[<datalist>]] مش [[<select>]] لأن السؤال مفتوح: العضو ممكن يحب لعبة النادي معندوش.
- الـ output بيبدأ بـ [[4]] مكتوبة بإيدينا، نفس [[value="4"]] على الشريط. لو اختلفوا، الزائر هيشوف رقم غلط لحد ما يسحب.
- [[shown.value = hours.value]] من غير [[Number]]: بننسخ النص زي ما هو، مفيش حساب.

**الغلطة الشائعة:** [[list="sport"]] بدل [[sports]] (نفس [[id]] الخانة). الخانة هتشاور على نفسها، ومفيش اقتراحات، ومفيش خطأ.

~~~text القياس من Chrome
input.list === datalist      true         role الخانة: combobox
عدد الاقتراحات               3
الشريط 7 بعد السحب           output.value = 7
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** خانة «الفرع» مبتطلّعش اقتراحات، والنتيجة مكتوبة في [[<span>]]، وبتبدأ فاضية. فيه ٣ مشاكل. (من قسم ١ و ٤ و ٧ في الشرح)`, done: R`الاقتراحات بتظهر، والنتيجة [[<output>]] مربوط بالحقل وبيبدأ بـ ٢٠٠، وكل الشروط ✓.`, work: { h: 120, start: R`<form oninput="total.value = Number(kids.value) * 200">
  <p><label for="branch">الفرع</label>
  <input id="branch" name="branch" list="branch">
  <datalist id="branches">
    <option value="فرع الكورنيش"></option>
    <option value="فرع الجامعة"></option>
  </datalist></p>
  <p><label for="kids">عدد الأطفال</label>
  <input id="kids" name="kids" type="number" min="1" value="1">
  الإجمالي: <span id="total"></span></p>
</form>`, checks: [
              { say: R`[[list]] على الخانة بيطابق [[id]] الـ [[<datalist>]]`, q: "input[list=\"branches\"]" },
              { say: R`النتيجة بقت [[<output>]] مش [[<span>]]`, q: "output#total" },
              { say: R`مفيش [[<span id="total">]]`, q: "span#total", n: 0 },
              { say: R`الـ output مربوط بالحقل: [[for="kids"]]`, q: "output[for=\"kids\"]" },
              { say: R`الـ output بيبدأ بـ ٢٠٠ (طفل واحد × ٢٠٠)`, q: "output#total", has: "200" },
            ] }, sol: R`~~~live 90 بعد التصليح
<form oninput="total.value = Number(kids.value) * 200">
  <p><label for="branch">الفرع</label>
  <input id="branch" name="branch" list="branches">
  <datalist id="branches">
    <option value="فرع الكورنيش"></option>
    <option value="فرع الجامعة"></option>
  </datalist></p>
  <p><label for="kids">عدد الأطفال</label>
  <input id="kids" name="kids" type="number" min="1" value="1">
  <label for="total">الإجمالي:</label> <output id="total" for="kids">200</output></p>
</form>
~~~

**هتشوف إيه:**

- قبل: خانة الفرع من غير اقتراحات، وبعد «الإجمالي:» مفيش حاجة لحد ما تغيّر العدد.
- بعد: الاقتراحين بيظهروا، و «٢٠٠» مكتوبة من الأول، وبتبقى ٤٠٠ و ٦٠٠ مع العدد.

| المشكلة | التصليح |
|---|---|
| [[list="branch"]] والـ datalist اسمه [[branches]] | [[list="branches"]] |
| النتيجة في [[<span>]] | [[<output for="kids">]]، ومعاه label |
| النتيجة فاضية في الأول | [[200]] مكتوبة جوه الـ output |

السطر [[total.value = ...]] كان شغال مع الـ [[<span>]] في الشكل؟ لأ: [[<span>]] ملوش [[value]] بيتعرض، فالنتيجة مكانتش بتظهر أصلًا. [[<output>]] هو اللي [[value]] بتاعه هو النص اللي جواه.

**الغلطة الشائعة:** تصلّح الـ [[list]] بإنك تغيّر [[id]] الـ datalist لـ [[branch]]. كده بقى فيه عنصرين بنفس الـ [[id]] (الخانة والقايمة)، والـ [[id]] لازم يبقى فريد في الصفحة.

~~~text القياس من Chrome
قبل:   input.list = null       span.textContent = ""    (حتى بعد تغيير العدد)
بعد:   input.list = datalist   output.value = 200 ، وبعد العدد 3: 600
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع، وبعدين صلّح:** في فورم حجز الملعب ده، الزائر اختار ساعتين ودوس «احجز». اكتب على ورقة إيه اللي هيتبعت: هل [[total]] معاهم؟ ودوس وقارن. وبعدين صلّح الـ output عشان يبقى مربوط بالحقلين اللي بيتحسب منهم. (من قسم ٤ في الشرح: «مبيتبعتش» و [[for]])`, done: R`توقّعت إن [[total]] مش هيتبعت، وبعد التصليح الـ output عليه [[for="hours price"]]، وكل الشروط ✓.`, work: { h: 195, start: R`<form oninput="total.value = Number(hours.value) * Number(price.value)" onsubmit="event.preventDefault(); sent.value = decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
  <p><label for="hours">عدد الساعات</label> <input id="hours" name="hours" type="number" min="1" value="2"></p>
  <p><label for="price">سعر الساعة</label> <input id="price" name="price" value="150" readonly></p>
  <p>الإجمالي: <output id="total" name="total">300</output></p>
  <button>احجز</button>
</form>
<p>اللي كان هيتبعت: <output id="sent">(دوس «احجز»)</output></p>`, checks: [
              { say: R`الـ output عليه [[for]] فيه [[hours]]`, q: "output#total[for~=\"hours\"]" },
              { say: R`الـ output عليه [[for]] فيه [[price]]`, q: "output#total[for~=\"price\"]" },
              { say: R`الـ output ليه [[<label>]]`, q: "label[for=\"total\"]" },
              { say: R`سعر الساعة لسه [[readonly]] (عشان يتبعت)`, q: "input[name=\"price\"][readonly]" },
            ] }, sol: R`~~~live 195 بعد التصليح
<form oninput="total.value = Number(hours.value) * Number(price.value)" onsubmit="event.preventDefault(); sent.value = decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
  <p><label for="hours">عدد الساعات</label> <input id="hours" name="hours" type="number" min="1" value="2"></p>
  <p><label for="price">سعر الساعة</label> <input id="price" name="price" value="150" readonly></p>
  <p><label for="total">الإجمالي:</label> <output id="total" name="total" for="hours price">300</output></p>
  <button>احجز</button>
</form>
<p>اللي كان هيتبعت: <output id="sent">(دوس «احجز»)</output></p>
~~~

**هتشوف إيه:**

- الناتج قبل وبعد التصليح واحد: [[hours=2&price=150]]. الإجمالي ٣٠٠ ظاهر في الصفحة ومش في الطلب.
- التصليح مغيّرش شكل الصفحة: [[for]] و [[<label>]] معلومات للمتصفح وقارئ الشاشة.

**ليه:**

- [[<output>]] مبيتبعتش أبدًا، حتى وعليه [[name]]. والسيرفر مش محتاجه: عنده الساعات والسعر ويحسب هو.
- سعر الساعة [[readonly]] فبيتبعت (درس «readonly و disabled و checked»).
- [[for="hours price"]]: اسمين بينهم مسافة، لأن النتيجة من حقلين.

**الغلطة الشائعة:** تحوّل الـ output لـ [[<input name="total" readonly>]] عشان يتبعت، والسيرفر يستخدم الرقم ده للدفع. أي زائر يغيّره من DevTools ويدفع جنيه واحد.

~~~text القياس من Chrome
مفاتيح البيانات اللي بتتبعت:   hours , price
output.htmlFor بعد التصليح:   hours price
الاسم في شجرة الـ accessibility:   status «الإجمالي:»
~~~` },
            { lvl: 'سريع', t: R`**اشرحها:** تلات خانات في فورم الاشتراك. لكل واحدة قول تستخدم [[<datalist>]] ولا [[<select>]] ولا radio، وليه، في سطر: (١) المحافظة اللي العضو ساكن فيها (٢٧ محافظة). (٢) «عرفت النادي منين؟» (٣) مقاس التيشيرت: S و M و L و XL. (من قسم ٢ في الشرح)`, done: R`اخترت عنصر لكل خانة وكتبت السبب: القايمة مقفولة ولا مفتوحة، وعدد الاختيارات.`, sol: R`**إجابة نموذجية:**

1. **المحافظة: [[<select>]].** القايمة مقفولة (مفيش محافظة برّه الـ ٢٧) وطويلة. السيرفر محتاج قيمة مضمونة من القايمة، و [[<datalist>]] كان هيقبل «القاهره» بالهاء و «cairo» وأي حاجة.
2. **عرفت النادي منين: [[<datalist>]].** السؤال مفتوح: فيه إجابات شائعة تستاهل تتقترح (صاحب، إعلان، مشيت قدامه)، بس أي إجابة تانية مقبولة ومفيدة.
3. **المقاس: radio.** ٤ اختيارات بس ومقفولة. الـ radio بيعرضهم كلهم قدام العضو من غير ما يفتح قايمة، وضغطة واحدة تكفي (درس «fieldset و radio»).

| السؤال | مقفول؟ | عدد الاختيارات | العنصر |
|---|---|---|---|
| المحافظة | أيوه | ٢٧ | [[<select>]] |
| عرفتنا منين | لأ | مفتوح | [[<datalist>]] |
| المقاس | أيوه | ٤ | radio |

**القاعدة:** مفتوح ← [[<datalist>]]. مقفول وقليل (لحد ٥ تقريبًا) ← radio. مقفول وكتير ← [[<select>]].

**الغلطة الشائعة:** [[<datalist>]] للمحافظة «عشان البحث بالكتابة أسهل». أسهل فعلًا، بس البيانات اللي هتتجمع هتبقى بعشرين شكل للمحافظة الواحدة.` }
          ]
        },
        {
          cmd: "progress و meter",
          title: "شريطين بيتملوا: واحد لمهمة ماشية، وواحد لقياس",
          pre: [{ to: "css/datalist و output", why: R`الجدول اللي بيفرّق بين [[<output>]] و [[<progress>]] و [[<meter>]] بدأ هناك في القسم ٦` }],
          ref: [
            { t: "MDN: <progress>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/progress" },
            { t: "MDN: <meter>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meter" },
            { t: "WHATWG: the progress element", url: "https://html.spec.whatwg.org/multipage/form-elements.html#the-progress-element" },
            { t: "WHATWG: the meter element", url: "https://html.spec.whatwg.org/multipage/form-elements.html#the-meter-element" }
          ],
          desc: R`[[<progress>]] و [[<meter>]] الاتنين بيرسموا شريط جزء منه مليان، وعشان كده بيتلخبطوا. الفرق في المعنى: [[<progress>]] بيقول **مهمة خلص منها قد إيه** (رفع ملف، خطوات فورم)، و [[<meter>]] بيقول **قياس واقف فين في مدى معروف** (مساحة مستخدمة، أماكن محجوزة، نسبة حضور).
و [[<meter>]] بيعرف كمان القيمة دي كويسة ولا وحشة، من [[low]] و [[high]] و [[optimum]]، وبيلوّن الشريط على أساسها.`,
          example: R`<label for="step">الخطوة ٢ من ٤</label>
<progress id="step" value="2" max="4">٢ من ٤</progress>
<label for="load">جاري رفع الصورة</label>
<progress id="load"></progress>
<label for="seats">الأماكن المحجوزة: ١٨ من ٢٠</label>
<meter id="seats" value="18" min="0" max="20" low="10" high="16" optimum="5">١٨ من ٢٠</meter>`,
          flag: "script",
          lines: [
            R`اسم الشريط الأول. الاتنين ([[<progress>]] و [[<meter>]]) بياخدوا [[<label>]] زي الحقول، والـ label هنا فيه الرقم مكتوب: الشريط لوحده مبيقولش «٢ من ٤».`,
            R`[[<progress>]] مهمة من ٤ خطوات ([[max="4"]]) خلص منها ٢ ([[value="2"]]): الشريط مليان نصه. والكلام اللي بين الفتحة والقفلة بيظهر بس في متصفح قديم ميعرفش العنصر.`,
            R`اسم الشريط التاني: مهمة شغالة دلوقتي.`,
            R`[[<progress>]] من غير [[value]]: «شغال، ومش عارف خلص قد إيه». المتصفح بيرسمه شريط بيتحرك رايح جاي.`,
            R`اسم المقياس، وفيه القيمة بالأرقام.`,
            R`[[<meter>]] قياس: ١٨ في مدى من ٠ لـ ٢٠. [[low="10"]] و [[high="16"]] بيقسموا المدى تلات مناطق، و [[optimum="5"]] بيقول إن المنطقة القليلة هي الكويسة (حصة فاضية أحسن للي عايز يحجز). ١٨ في أبعد منطقة عنها، فالشريط أحمر.`
          ],
          teach: R`## الفكرة في سطرين

المواصفة: [[<progress>]] بيمثّل «مدى اكتمال مهمة»، و [[<meter>]] بيمثّل «قياس عددي جوه مدى معروف، أو كسر من كل». الأول ليه نهاية بيتحرك ناحيتها، والتاني رقم ممكن يطلع وينزل.

القياسات من Chrome 157 على Windows 11. الألوان اتشافت في صورة للصفحة من نفس المتصفح.

---

## ١. [[<progress value="2" max="4">]]

~~~live 34 مهمة من ٤ خطوات، خلص منها ٢
<label for="step">الخطوة ٢ من ٤</label>
<progress id="step" value="2" max="4">٢ من ٤</progress>
~~~

**هتشوف إيه:** شريط نصه الأول ملوّن (أزرق في Chrome على Windows) ونصه التاني رمادي. اللون وشكل الحواف بيختلفوا من متصفح لمتصفح ومن نظام لنظام.

- [[value]]: خلص قد إيه.
- [[max]]: المهمة كلها قد إيه. من غيره [[max]] = ١، و [[value]] ساعتها كسر بين ٠ و ١.
- مفيش [[min]]: المهمة دايمًا بتبدأ من صفر.

~~~text القياس من Chrome
الحجم الافتراضي: 160 × 16 px     display: inline-block     role: progressbar

<progress value="2" max="4">        position = 0.5     (النسبة المليانة)
<progress value="0.3">              max = 1      position = 0.3
<progress value="30" max="100">     position = 0.3
<progress value="150" max="100">    value = 100  position = 1      (أكبر من max: بيتقفل عند max)
<progress value="-5" max="100">     value = 0    position = 0
~~~

[[position]] هو [[value ÷ max]]: الجزء المليان من الشريط. والقيمة اللي برّه المدى المتصفح بيرجّعها جواه في صمت.

الكلام اللي بين [[<progress>]] و [[</progress>]] (هنا «٢ من ٤») **مبيظهرش** في أي متصفح حديث. هو للمتصفح القديم اللي ميعرفش العنصر: هيعرض الكلام ده مكان الشريط.

---

## ٢. [[<progress>]] من غير [[value]]

~~~live 34 مهمة مش معروف هتخلص إمتى
<label for="load">جاري رفع الصورة</label>
<progress id="load"></progress>
~~~

**هتشوف إيه:** في Chrome على Windows: حتة ملوّنة بتتحرك من طرف الشريط للطرف التاني وترجع، من غير ما تقف.

~~~text القياس من Chrome
<progress></progress>     position = -1      :indeterminate = true      role = progressbar
~~~

دي الحالة «غير المحددة» (indeterminate): المهمة شغالة، ومفيش رقم نقوله. [[position = -1]] معناها «مفيش نسبة»، والـ CSS بيمسكها بـ [[:indeterminate]].

الفرق بينها وبين [[value="0"]]: صفر معناه «لسه مبدأش»، ومن غير [[value]] معناه «شغال ومش عارف وصل فين».

---

## ٣. الشريط مبيتحركش لوحده

[[<progress>]] بيعرض الرقم اللي في [[value]] وبس. عشان يتحرك لازم حاجة تغيّر [[value]]:

- **فورم من كذا صفحة:** كل صفحة ملف HTML لوحده، وفيه الشريط بقيمة ثابتة مكتوبة بإيدك: صفحة ١ فيها [[value="1"]]، وصفحة ٢ فيها [[value="2"]]. مفيش JavaScript خالص (ده اللي هتعمله في مشاريع الوحدة).
- **رفع ملف أو تحميل:** JavaScript بيغيّر [[progress.value]] مع كل جزء بيخلص. ده في كورس JavaScript.

~~~live 162 الخطوة ٣ من ٤ في فورم اشتراك
<p><label for="step">اشتراك عضو جديد: الخطوة ٣ من ٤ (المستندات)</label><br>
<progress id="step" value="3" max="4">٣ من ٤</progress></p>
<ol>
  <li>بياناتك ✓</li>
  <li>اللعبة والمواعيد ✓</li>
  <li><strong>المستندات</strong></li>
  <li>المراجعة والدفع</li>
</ol>
~~~

**هتشوف إيه:** الشريط مليان تلات أرباعه، وتحته الخطوات الأربعة مكتوبة والحالية تقيلة. الشريط بيدّي الإحساس، والقايمة بتقول الأسامي: الاتنين مع بعض.

---

## ٤. [[<meter value="12" min="0" max="20">]]

~~~live 34 قياس: ١٢ من ٢٠
<label for="seats">الأماكن المحجوزة: ١٢ من ٢٠</label>
<meter id="seats" value="12" min="0" max="20">١٢ من ٢٠</meter>
~~~

**هتشوف إيه:** شريط أقصر من بتاع [[<progress>]]، مليان ٦٠٪ منه بالأخضر.

- [[value]]: القياس الحالي. **إجباري** (من غيره القياس صفر).
- [[min]] و [[max]]: أول وآخر المدى. الافتراضي ٠ و ١.

~~~text القياس من Chrome
الحجم الافتراضي: 80 × 16 px     display: inline-block     role: meter

<meter value="0.6">                    min = 0   max = 1      (من غير min و max: كسر)
<meter value="60" min="0" max="100">   60 من 100
<meter value="150" max="100">          value = 100    (بيتقفل عند max)
<meter value="5" min="10" max="100">   value = 10     (بيتقفل عند min)
~~~

**أشهر غلطة:** [[<meter value="60">]] من غير [[max]]. المدى الافتراضي من ٠ لـ ١، فالـ ٦٠ بتتقفل عند ١ والشريط بيطلع مليان على الآخر.

---

## ٥. [[<meter low="10" high="16" optimum="5">]]: القيمة كويسة ولا وحشة

التلاتة مع بعض بيخلّوا الشريط يتلوّن:

- [[low]] و [[high]] بيقسموا المدى **تلات مناطق**: القليلة (من [[min]] لـ [[low]])، والوسط (من [[low]] لـ [[high]])، والعالية (من [[high]] لـ [[max]]).
- [[optimum]] رقم بيقع في واحدة من التلات مناطق: **المنطقة دي هي الكويسة.**

~~~live 118 172 نفس التقسيم (low=30 و high=70) ونفس القيم، و optimum مختلف
<p>العالي كويس (optimum=90):
<meter value="20" max="100" low="30" high="70" optimum="90">20</meter>
<meter value="50" max="100" low="30" high="70" optimum="90">50</meter>
<meter value="85" max="100" low="30" high="70" optimum="90">85</meter></p>
<p>القليل كويس (optimum=10):
<meter value="20" max="100" low="30" high="70" optimum="10">20</meter>
<meter value="50" max="100" low="30" high="70" optimum="10">50</meter>
<meter value="85" max="100" low="30" high="70" optimum="10">85</meter></p>
<p>الوسط كويس (optimum=50):
<meter value="20" max="100" low="30" high="70" optimum="50">20</meter>
<meter value="50" max="100" low="30" high="70" optimum="50">50</meter>
<meter value="85" max="100" low="30" high="70" optimum="50">85</meter></p>
~~~

~~~text القياس من Chrome على Windows (ألوان الشريط، والقيم 20 و 50 و 85)
                           القيمة 20      القيمة 50      القيمة 85
optimum=90 (العالي كويس)   أحمر           أصفر           أخضر
optimum=10 (القليل كويس)   أخضر           أصفر           أحمر
optimum=50 (الوسط كويس)    أصفر           أخضر           أصفر

من غير low و high خالص:    أخضر           أخضر           أخضر
low و high من غير optimum: أصفر           أخضر           أصفر
~~~

القاعدة اللي ورا الجدول:

- القيمة في **نفس منطقة** الـ [[optimum]]: أخضر.
- القيمة في المنطقة **اللي جنبها**: أصفر.
- القيمة في المنطقة **البعيدة** (والـ optimum في الطرف التاني): أحمر.

وسطرين في آخر الجدول:

- من غير [[low]] و [[high]] مفيش مناطق، فالشريط أخضر دايمًا.
- [[low]] و [[high]] من غير [[optimum]]: الـ optimum الافتراضي نص المدى (اتقاس: [[meter.optimum = 50]])، فالوسط هو الكويس. عشان كده مفيش أحمر: مفيش منطقة «بعيدة» عن الوسط.

أمثلة من الواقع:

| القياس | الكويس | [[optimum]] |
|---|---|---|
| شحن البطارية، نسبة الحضور، الدرجة | العالي | قرب [[max]] |
| مساحة الديسك المستخدمة، الأماكن المحجوزة، استهلاك الباقة | القليل | قرب [[min]] |
| درجة حرارة المية، ضغط الكاوتش | الوسط | بين [[low]] و [[high]] |

الألوان نفسها (أخضر وأصفر وأحمر) من Chrome. MDN بيقول إن المتصفح «ممكن» يلوّن الشريط حسب المنطقة، فمتعتمدش على لون معين.

---

## ٦. مين فيهم؟

| عايز تعرض | العنصر | ليه |
|---|---|---|
| رفع ملف، خطوات فورم، تحميل | [[<progress>]] | مهمة ليها نهاية |
| حاجة شغالة ومش عارف مدتها | [[<progress>]] من غير [[value]] | |
| مساحة مستخدمة، أماكن محجوزة، درجة من ١٠٠، نسبة تصويت | [[<meter>]] | قياس في مدى معروف |
| رقم الزائر **بيختاره** في مدى | [[<input type="range">]] | ده حقل، والاتنين التانيين للعرض بس |
| رقم من غير مدى (السن، السعر، عدد الأعضاء) | نص عادي أو [[<output>]] | مفيش «من كام» |

المواصفة بتحدد حالتين [[<meter>]] مش ليهم:

- **مش للتقدّم.** ده شغل [[<progress>]].
- **مش لرقم ملوش حد أقصى معروف.** الوزن أو الطول مينفعش يتحطوا في [[<meter>]] إلا لو فيه [[max]] ليه معنى.

والاتنين **للعرض بس**: الزائر مبيغيّرهمش، ومبيتبعتوش مع الفورم.

---

## ٧. الاسم والرقم المكتوب

~~~text القياس من Chrome (شجرة الـ accessibility)
<label for="step">الخطوة ٢ من ٤</label> <progress id="step" value="2" max="4">
→  progressbar «الخطوة ٢ من ٤»

<label for="seats">الأماكن المحجوزة: ١٨ من ٢٠</label> <meter id="seats" value="18" max="20">
→  meter «الأماكن المحجوزة: ١٨ من ٢٠»
~~~

تلات حاجات لازم تبقى مع أي شريط:

1. **[[<label>]].** شريط من غير اسم ملوش معنى لحد.
2. **الرقم مكتوب نص.** الشريط بيدّي فكرة تقريبية. «١٨ من ٢٠» بتقول الحقيقة. حطها في الـ label أو جنب الشريط.
3. **متعتمدش على اللون.** أحمر وأخضر بيتلخبطوا عند ناس كتير (عمى الألوان). لو الحالة مهمة اكتبها: «الحصة قربت تكمل».

إزاي قارئ الشاشة بينطق القيمة بيختلف من برنامج لبرنامج (ومتقاسش هنا)، وده سبب تاني إن الرقم يبقى في الـ label.

---

## ٨. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[<meter value="60">]] من غير [[max]] | المدى ٠ لـ ١: الشريط مليان على الآخر |
| [[<progress>]] لمساحة الديسك | المعنى غلط: ده قياس مش مهمة، ومفيش ألوان تحذير |
| [[<meter>]] لخطوات فورم | المعنى غلط، وقارئ الشاشة هيقول «meter» مش «progress» |
| [[<progress min="1">]] | مفيش [[min]] على progress: بيتجاهله |
| شريط من غير label ومن غير رقم | محدش عارف ده شريط إيه ولا واصل فين |
| [[optimum]] من غير [[low]] و [[high]] | مفيش مناطق، فمفيش تغيير في اللون |
| [[low]] أكبر من [[high]] | التقسيم ملوش معنى، والمتصفح بيعدّل القيم في صمت |
| تستنى الشريط يتحرك لوحده | [[value]] ثابت لحد ما JavaScript أو صفحة جديدة يغيّروه |

---

## الخلاصة

- [[<progress value max>]]: مهمة خلص منها قد إيه. من غير [[value]]: شغال ومش معروف.
- [[<meter value min max>]]: قياس في مدى. [[max]] لازم يتكتب لو المدى مش من ٠ لـ ١.
- [[low]] و [[high]] بيعملوا تلات مناطق، و [[optimum]] بيقول مين فيهم الكويسة: نفس المنطقة أخضر، اللي جنبها أصفر، البعيدة أحمر (في Chrome).
- الاتنين للعرض: مبيتغيّروش من الزائر ومبيتبعتوش.
- دايمًا معاهم [[<label>]] والرقم مكتوب.`,
          try: R`اعمل ملف [[bars.html]] فيه [[<meter>]] لشحن بطارية: المدى من ٠ لـ ١٠٠، و [[low="20"]] و [[high="80"]] و [[optimum="100"]]. اكتبه ٣ مرات بقيم ١٠ و ٥٠ و ٩٠، ومع كل واحد label فيه الرقم. افتح الصفحة وبص على الألوان. وبعدين غيّر [[optimum]] في التلاتة لـ [[0]] وبص تاني.`,
          sol: R`~~~live 118 bars.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>البطارية</title>
</head>
<body>
<p><label for="a">الشحن ١٠٪</label>
<meter id="a" value="10" min="0" max="100" low="20" high="80" optimum="100">١٠٪</meter></p>
<p><label for="b">الشحن ٥٠٪</label>
<meter id="b" value="50" min="0" max="100" low="20" high="80" optimum="100">٥٠٪</meter></p>
<p><label for="c">الشحن ٩٠٪</label>
<meter id="c" value="90" min="0" max="100" low="20" high="80" optimum="100">٩٠٪</meter></p>
</body>
</html>
~~~

**هتشوف إيه:**

- **بـ [[optimum="100"]]** (العالي كويس): ١٠٪ أحمر، و ٥٠٪ أصفر، و ٩٠٪ أخضر. زي أيقونة البطارية.
- **بـ [[optimum="0"]]** (القليل كويس): الألوان اتعكست: ١٠٪ أخضر، و ٥٠٪ أصفر، و ٩٠٪ أحمر. نفس الأرقام ونفس [[low]] و [[high]]، والمعنى اتقلب. ده مناسب لـ «مساحة مستخدمة» مش لبطارية.

~~~text القياس من Chrome على Windows
                 10        50        90
optimum="100"    أحمر      أصفر      أخضر
optimum="0"      أخضر      أصفر      أحمر
~~~

[[optimum]] مش لازم يبقى [[max]] أو [[min]] بالظبط: أي رقم جوه المنطقة الكويسة بيدّي نفس النتيجة. ٩٠ زي ١٠٠ هنا.`,
          deep: {
            why: R`قبل العنصرين دول، أي شريط كان [[<div>]] جواه [[<div>]] عرضه نسبة، وقارئ الشاشة مكانش بيشوف حاجة. العنصرين بيدّوك الشريط والمعنى مع بعض: role صح، وقيمة بتتقري، ومن غير CSS ولا JavaScript. وفورم الاشتراك الطويل من غير «الخطوة ٢ من ٤» الناس بتسيبه في النص، لأنها مش عارفة باقي قد إيه.`,
            how: R`المتصفح بيحسب لـ [[<progress>]] النسبة [[value ÷ max]] (بعد ما يحبس [[value]] بين ٠ و [[max]]) ويرسم الجزء ده مليان. لو مفيش [[value]] بيدخل الحالة غير المحددة ويشغّل حركة. و [[<meter>]] بيحبس كل أرقامه جوه [[min]] و [[max]]، وبعدين بيحدد منطقة القيمة ومنطقة الـ [[optimum]]: نفس المنطقة «optimum»، متجاورتين «suboptimum»، متباعدتين «even less good» (دي أسامي الحالات في المواصفة)، وكل حالة ليها لون في المتصفح. والعنصرين في شجرة الـ accessibility بـ role [[progressbar]] و [[meter]] ومعاهم القيمة الحالية والمدى.`,
            when: R`[[<progress>]]: خطوات فورم أو طلب، رفع وتحميل، نسبة إكمال كورس أو بروفايل. من غير [[value]]: انتظار رد سيرفر مش معروف مدته. [[<meter>]]: استهلاك باقة أو مساحة، أماكن فاضية، درجة امتحان، قوة كلمة سر، تقييم من ٥.`,
            mistakes: R`[[<meter>]] من غير [[max]] وقيمة أكبر من ١. استخدام واحد مكان التاني. [[min]] على [[<progress>]]. [[optimum]] لوحده من غير [[low]] و [[high]]. شريط من غير label ولا رقم مكتوب. والاعتماد على اللون لوحده عشان يقول «خطر».`
          },
          practice: [
            { lvl: 'تطبيق', t: R`**ابني:** لوحة العضو في «نادي الموج» فيها تلات شرايط، كل واحد بالعنصر المناسب: (١) «إكمال بياناتك: ٣ من ٥ خطوات». (٢) «نسبة حضورك: ٨٥٪» والعالي كويس، وتحت ٥٠ ضعيف وفوق ٨٠ ممتاز. (٣) «حصصك المستخدمة: ٩ من ١٠» والقليل كويس، ولحد ٥ مريح وفوق ٨ قرّبت تخلص. (من قسم ١ و ٤ و ٥ و ٦ في الشرح)`, done: R`شريط [[<progress>]] واتنين [[<meter>]] بالمدى والمناطق والـ optimum الصح، وكل واحد ليه label، وكل الشروط ✓.`, work: { h: 182, start: R`<h1>لوحة العضو</h1>
<p>إكمال بياناتك: ٣ من ٥ خطوات</p>
<p>نسبة حضورك: ٨٥٪</p>
<p>حصصك المستخدمة: ٩ من ١٠</p>`, checks: [
              { say: R`إكمال البيانات [[<progress>]] قيمته ٣ من ٥`, q: "progress[value=\"3\"][max=\"5\"]" },
              { say: R`الحضور [[<meter>]] قيمته ٨٥ من ١٠٠`, q: "meter[value=\"85\"][max=\"100\"]" },
              { say: R`الحضور: [[low="50"]] و [[high="80"]]`, q: "meter[value=\"85\"][low=\"50\"][high=\"80\"]" },
              { say: R`الحصص [[<meter>]] قيمته ٩ من ١٠ و [[low="5"]] و [[high="8"]]`, q: "meter[value=\"9\"][max=\"10\"][low=\"5\"][high=\"8\"]" },
              { say: R`الاتنين meter ليهم [[optimum]]`, q: "meter[optimum]", n: 2 },
              { say: R`التلات شرايط ليهم [[<label>]]`, q: "label[for]", n: 3 },
            ] }, sol: R`~~~live 182 الحل
<h1>لوحة العضو</h1>
<p><label for="profile">إكمال بياناتك: ٣ من ٥ خطوات</label>
<progress id="profile" value="3" max="5">٣ من ٥</progress></p>
<p><label for="attend">نسبة حضورك: ٨٥٪</label>
<meter id="attend" value="85" min="0" max="100" low="50" high="80" optimum="100">٨٥٪</meter></p>
<p><label for="used">حصصك المستخدمة: ٩ من ١٠</label>
<meter id="used" value="9" min="0" max="10" low="5" high="8" optimum="0">٩ من ١٠</meter></p>
~~~

**هتشوف إيه:**

- الأول شريط طويل مليان ٦٠٪ (أزرق في Chrome).
- التاني قصيّر وأخضر: ٨٥ في المنطقة العالية، وهي الكويسة.
- التالت قصيّر وأحمر: ٩ في المنطقة العالية، والكويسة هي القليلة.

**ليه كده:**

- إكمال البيانات مهمة ليها نهاية ← [[<progress>]]. الحضور والحصص قياسات ← [[<meter>]].
- الحضور: [[optimum="100"]] في المنطقة فوق ٨٠. الحصص: [[optimum="0"]] في المنطقة تحت ٥.
- نفس الشكل تقريبًا (٨٥٪ و ٩٠٪ مليانين)، واللون عكس بعض: ده شغل [[optimum]].

**الغلطة الشائعة:** [[<meter value="85">]] من غير [[max="100"]]. الشريط هيتملي كله، لأن المدى الافتراضي آخره ١.

~~~text القياس من Chrome على Windows
progress 3/5:                               position = 0.6
meter 85 (low=50 high=80 optimum=100):      أخضر
meter 9  (low=5  high=8  optimum=0):        أحمر
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** في صفحة الاشتراك تلات شرايط كلهم غلط: خطوات الفورم معمولة [[<meter>]]، ومساحة ملفات العضو معمولة [[<progress>]]، ودرجة اختبار السباحة [[<meter value="70">]] مليان على الآخر مع إنها ٧٠ من ١٠٠. (من قسم ٤ و ٦ و ٨ في الشرح)`, done: R`الخطوات [[<progress>]]، والمساحة [[<meter>]] والقليل فيه كويس، والدرجة ليها [[max="100"]]، وكل الشروط ✓.`, work: { h: 120, start: R`<p><label for="s">الخطوة ٢ من ٤</label>
<meter id="s" value="2" max="4">٢ من ٤</meter></p>
<p><label for="d">مساحة ملفاتك: ٤٥٠ من ٥٠٠ ميجا</label>
<progress id="d" value="450" max="500">٤٥٠ من ٥٠٠</progress></p>
<p><label for="g">درجة اختبار السباحة: ٧٠ من ١٠٠</label>
<meter id="g" value="70">٧٠</meter></p>`, checks: [
              { say: R`الخطوات بقت [[<progress>]] قيمته ٢ من ٤`, q: "progress#s[value=\"2\"][max=\"4\"]" },
              { say: R`المساحة بقت [[<meter>]] قيمته ٤٥٠ من ٥٠٠`, q: "meter#d[value=\"450\"][max=\"500\"]" },
              { say: R`المساحة ليها [[low]] و [[high]] و [[optimum]]`, q: "meter#d[low][high][optimum]" },
              { say: R`الدرجة ليها [[max="100"]]`, q: "meter#g[value=\"70\"][max=\"100\"]" },
              { say: R`كل شريط لسه ليه [[<label>]]`, q: "label[for]", n: 3 },
            ] }, sol: R`~~~live 118 بعد التصليح
<p><label for="s">الخطوة ٢ من ٤</label>
<progress id="s" value="2" max="4">٢ من ٤</progress></p>
<p><label for="d">مساحة ملفاتك: ٤٥٠ من ٥٠٠ ميجا</label>
<meter id="d" value="450" min="0" max="500" low="250" high="400" optimum="0">٤٥٠ من ٥٠٠</meter></p>
<p><label for="g">درجة اختبار السباحة: ٧٠ من ١٠٠</label>
<meter id="g" value="70" min="0" max="100">٧٠</meter></p>
~~~

وده اللي كان باين قبل التصليح:

~~~live 118 136 قبل
<p><label for="s">الخطوة ٢ من ٤</label>
<meter id="s" value="2" max="4">٢ من ٤</meter></p>
<p><label for="d">مساحة ملفاتك: ٤٥٠ من ٥٠٠ ميجا</label>
<progress id="d" value="450" max="500">٤٥٠ من ٥٠٠</progress></p>
<p><label for="g">درجة اختبار السباحة: ٧٠ من ١٠٠</label>
<meter id="g" value="70">٧٠</meter></p>
~~~

**هتشوف إيه:**

- قبل: الخطوات شريط قصيّر أخضر، والمساحة شريط أزرق عادي (مفيش أي تحذير مع إنها قرّبت تخلص)، والدرجة مليانة ١٠٠٪.
- بعد: الخطوات شريط تقدّم نصه مليان، والمساحة **حمرا**، والدرجة مليانة ٧٠٪.

| المشكلة | التصليح | ليه |
|---|---|---|
| خطوات في [[<meter>]] | [[<progress>]] | مهمة ليها نهاية |
| مساحة في [[<progress>]] | [[<meter>]] بمناطق و [[optimum="0"]] | قياس، والقليل كويس، ولازم يحذّر |
| [[<meter value="70">]] | زوّدنا [[max="100"]] | المدى الافتراضي ٠ لـ ١ |

**الغلطة الشائعة:** تصلّح الدرجة بـ [[value="0.7"]] بدل [[max="100"]]. الشريط هيطلع صح، بس قارئ الشاشة هيقرا «٠٫٧» والـ label بيقول «٧٠».

~~~text القياس من Chrome
قبل:   <meter value="70">             →  meter.value = 1     (اتقفلت عند max الافتراضي)
بعد:   <meter value="70" max="100">   →  meter.value = 70
       meter 450 من 500 (low=250 high=400 optimum=0)   →  أحمر
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع، وبعدين صلّح:** تلات مقاييس لحرارة مية حمام السباحة، نفس القيمة (٢٠ درجة) ونفس المناطق، و [[optimum]] مختلف. اكتب على ورقة لون كل واحد وقارن باللي قدامك. وبعدين: الحرارة المثالية للسباحة ٢٧ درجة، فصلّح المقياس التالت عشان الوسط يبقى هو الكويس. (من قسم ٥ في الشرح: جدول الألوان)`, done: R`توقّعت أحمر ثم أخضر ثم أحمر، وبعد التصليح التالت بقى أصفر (٢٠ جنب المنطقة الكويسة)، وكل الشروط ✓.`, work: { h: 120, start: R`<p><label for="a">أ: الحرارة ٢٠°</label>
<meter id="a" value="20" min="10" max="40" low="24" high="30" optimum="38">٢٠°</meter></p>
<p><label for="b">ب: الحرارة ٢٠°</label>
<meter id="b" value="20" min="10" max="40" low="24" high="30" optimum="12">٢٠°</meter></p>
<p><label for="c">ج: الحرارة ٢٠°</label>
<meter id="c" value="20" min="10" max="40" low="24" high="30" optimum="38">٢٠°</meter></p>`, checks: [
              { say: R`المقياس «ج» بقى [[optimum="27"]]`, q: "meter#c[optimum=\"27\"]" },
              { say: R`«ج» لسه بنفس المناطق: [[low="24"]] و [[high="30"]]`, q: "meter#c[low=\"24\"][high=\"30\"]" },
              { say: R`«أ» و «ب» زي ما هم`, q: "meter#a[optimum=\"38\"], meter#b[optimum=\"12\"]", n: 2 },
            ] }, sol: R`~~~live 118 بعد التصليح
<p><label for="a">أ: الحرارة ٢٠°</label>
<meter id="a" value="20" min="10" max="40" low="24" high="30" optimum="38">٢٠°</meter></p>
<p><label for="b">ب: الحرارة ٢٠°</label>
<meter id="b" value="20" min="10" max="40" low="24" high="30" optimum="12">٢٠°</meter></p>
<p><label for="c">ج: الحرارة ٢٠°</label>
<meter id="c" value="20" min="10" max="40" low="24" high="30" optimum="27">٢٠°</meter></p>
~~~

**هتشوف إيه:**

- «أ» أحمر، و «ب» أخضر، و «ج» قبل التصليح أحمر زي «أ» وبعده **أصفر**.

**ليه:** القيمة ٢٠ في المنطقة القليلة (من ١٠ لـ ٢٤).

| المقياس | الـ optimum في أنهي منطقة | القيمة ٢٠ منها | اللون |
|---|---|---|---|
| أ ([[38]]) | العالية | بعيدة (بينهم منطقة) | أحمر |
| ب ([[12]]) | القليلة | نفسها | أخضر |
| ج ([[27]]) | الوسط | جنبها | أصفر |

يعني مية ٢٠ درجة «مش مثالية بس مش كارثة»، وده المعنى الصح لحمام سباحة: المثالي في النص، والبرد والسخونة الاتنين وحشين.

**الغلطة الشائعة:** تحاول تخلّي «ج» أخضر بتغيير [[low]] لـ ١٥. الشريط هيخضرّ، بس انت كده بتقول إن ٢٠ درجة مثالية، وده مش صحيح. المناطق بتتحدد من الواقع، مش من اللون اللي عايزه.

~~~text القياس من Chrome على Windows
أ (optimum=38):   أحمر
ب (optimum=12):   أخضر
ج (optimum=27):   أصفر
~~~` },
            { lvl: 'سريع', t: R`**اشرحها:** صنّف الست حاجات دي: [[<progress>]] ولا [[<meter>]] ولا ولا واحد فيهم؟ وسبب في كلمتين لكل واحدة: (١) رفع فيديو التمرين. (٢) عدد أعضاء النادي: ١٢٤٠. (٣) قوة كلمة السر. (٤) «الطلب: اتأكد ← بيتجهز ← في الطريق ← وصل». (٥) شحن الساعة الرياضية. (٦) مستوى الصوت اللي العضو بيظبطه. (من قسم ٦ في الشرح: «مين فيهم؟»)`, done: R`صنّفت الستة وكتبت السبب: مهمة ليها نهاية، ولا قياس في مدى، ولا رقم من غير مدى، ولا حقل الزائر بيغيّره.`, sol: R`**إجابة نموذجية:**

| الحاجة | العنصر | السبب |
|---|---|---|
| رفع فيديو التمرين | [[<progress>]] | مهمة بتخلص عند ١٠٠٪ |
| عدد الأعضاء ١٢٤٠ | ولا واحد: نص عادي | رقم من غير حد أقصى معروف |
| قوة كلمة السر | [[<meter>]] | قياس في مدى (ضعيفة لقوية)، والعالي كويس |
| مراحل الطلب | [[<progress>]] | مهمة من ٤ خطوات ليها نهاية |
| شحن الساعة | [[<meter>]] | قياس من ٠ لـ ١٠٠، بيطلع وينزل |
| مستوى الصوت اللي بيتظبط | ولا واحد: [[<input type="range">]] | الزائر **بيغيّره**، والاتنين التانيين للعرض بس |

**السؤالين اللي بيحسموها:**

1. الزائر بيغيّر القيمة؟ أيوه ← [[range]]. لأ ← كمّل.
2. فيه «من كام»؟ لأ ← نص. أيوه وبيمشي ناحية نهاية ← [[<progress>]]. أيوه وبيطلع وينزل ← [[<meter>]].

**الغلطة الشائعة:** شحن البطارية [[<progress>]] «عشان بيتملي». الشحن بينزل تاني، ومفيش مهمة بتخلص: ده قياس.` }
          ]
        },
        {
          cmd: "أزرار الفورم: formaction وإخواته",
          title: "أكتر من زرار في الفورم: type و name و value و form و formaction و formnovalidate",
          pre: ["css/a و button", { to: "css/GET و POST و enctype", why: R`[[action]] و [[method]] و [[enctype]] و [[target]] على الفورم اتشرحوا هناك، وهنا الزرار بيغيّرهم` }, { to: "css/Constraint Validation API", why: R`فحص المتصفح اللي [[novalidate]] بيوقفه` }],
          ref: [
            { t: "MDN: <button>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button" },
            { t: "WHATWG: the button element", url: "https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element" },
            { t: "WHATWG: Form submission attributes (formaction...)", url: "https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#form-submission-attributes" },
            { t: "WHATWG: Implicit submission", url: "https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#implicit-submission" },
            { t: "MDN: form attribute", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/form" },
            { t: "MDN Curriculum: Semantic HTML › Other interactive elements", url: "https://developer.mozilla.org/en-US/curriculum/core/semantic-html/" }
          ],
          desc: R`الفورم بيتبعت لما **زرار** يتداس، والزرار ده مش مجرد «ابعت»: يقدر يبعت قيمة باسمه ([[name]] و [[value]])، ويقدر يغيّر للطلب ده بس العنوان والـ method وشكل الجسم ([[formaction]] و [[formmethod]] و [[formenctype]] و [[formtarget]])، ويقدر يعدّي من فحص المتصفح ([[formnovalidate]])، ويقدر يبقى مكتوب برّه الفورم خالص ([[form]]).
وأول حاجة في الدرس الفخ اللي كل مبتدئ بيقع فيه: [[<button>]] جوه فورم **بيبعت الفورم** حتى لو مكتبتش إنه زرار إرسال.`,
          example: R`<form id="join" action="/join" method="post">
  <label for="email">الإيميل</label>
  <input id="email" name="email" type="email" required>
  <button type="submit" name="act" value="send">اشترك</button>
  <button type="submit" name="act" value="draft" formaction="/draft" formnovalidate>احفظ كمسودة</button>
  <button type="button">إلغاء</button>
</form>
<button type="submit" form="join" name="act" value="send">اشترك دلوقتي</button>`,
          flag: "script",
          lines: [
            R`الفورم ليه [[id="join"]] عشان الزرار اللي برّه (آخر سطر) يقدر يشاور عليه. وبيبعت [[post]] لـ [[/join]].`,
            R`اسم الحقل، مربوط بيه بـ [[for="email"]].`,
            R`حقل إيميل إجباري: المتصفح مش هيبعت الفورم وهو فاضي أو شكله غلط.`,
            R`زرار الإرسال الأساسي. [[name="act"]] و [[value="send"]]: لو هو اللي اتداس، هيتبعت [[act=send]] مع باقي البيانات.`,
            R`زرار إرسال تاني لنفس الفورم. [[value="draft"]] بيقول للسيرفر إن ده حفظ مش اشتراك، و [[formaction="/draft"]] بيبعت الطلب لعنوان تاني، و [[formnovalidate]] بيعدّي من الفحص: المسودة تتحفظ حتى لو الإيميل لسه فاضي.`,
            R`[[type="button"]]: زرار مبيبعتش. مستني JavaScript يقوله يعمل إيه (يقفل النافذة مثلًا). من غير الكلمة دي كان هيبعت الفورم.`,
            R`[[</form>]] آخر الفورم: التلات أزرار اللي فوق تبعه لأنهم جواه.`,
            R`زرار مكتوب **برّه** الفورم، و [[form="join"]] بيربطه بيه: الضغط عليه بيبعت الفورم كأنه جواه.`
          ],
          teach: R`## الفكرة في سطرين

الفورم بيقول القاعدة ([[action]] و [[method]])، والزرار اللي اتداس يقدر يكسرها للمرة دي. وده اللي بيخلّي فورم واحد يعمل كذا حاجة: «اشترك»، «احفظ كمسودة»، «معاينة».

القياسات من Chrome 157 على Windows 11، والطلبات على السيرفر المحلي بتاع درس «GET و POST و enctype».

---

## ١. [[<button type="submit">]] و [[<button type="button">]] و [[<button type="reset">]]

[[<button>]] ليه تلات أنواع:

| قيمة [[type]] | الزرار بيعمل إيه لما يتداس |
|---|---|
| [[submit]] | بيبعت الفورم اللي هو تبعه |
| [[button]] | ولا حاجة لوحده: مستني JavaScript |
| [[reset]] | بيرجّع حقول الفورم لقيمها الأولى |

### الفخ: من غير [[type]] الزرار [[submit]]

~~~text القياس من Chrome
<button> جوه فورم، من غير type:      button.type = submit
<button type="foo">:                 button.type = submit     (قيمة غلط = الافتراضي)
<button type="button">:              button.type = button
~~~

يعني أي [[<button>]] تكتبه جوه [[<form>]] من غير [[type]] هو زرار إرسال. جرّب:

~~~live 161 دوس «أظهر كلمة السر»
<form onsubmit="event.preventDefault(); sent.value = 'الفورم اتبعت! ' + decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
  <p><label for="email">الإيميل</label> <input id="email" name="email" value="mona@example.test"></p>
  <p><label for="pass">كلمة السر</label> <input id="pass" name="pass" type="password" value="s3cret">
  <button>أظهر كلمة السر</button></p>
  <button>ادخل</button>
</form>
<p><output id="sent">(لسه محصلش إرسال)</output></p>
~~~

**هتشوف إيه:** دوست على «أظهر كلمة السر» فطلع «الفورم اتبعت!». الزرار ده المفروض يكشف الحروف بس، لكنه من غير [[type]] فبعت الفورم. في صفحة حقيقية الزائر كان هيتنقل لصفحة تانية وهو لسه بيكتب.

**القاعدة:** كل [[<button>]] جوه فورم يتكتب عليه [[type]] صريح. اللي بيبعت [[type="submit"]]، وأي زرار تاني [[type="button"]].

وبرّه أي فورم، الزرار برضه [[type]] بتاعه [[submit]]، بس مفيش فورم يبعته، فالضغط مبيعملش حاجة (اتقاس: [[button.form = null]]).

### [[<button type="reset">]]

نفس [[<input type="reset">]] في درس «أنواع input كلها»: بيرجّع كل الحقول لـ [[value]] المكتوب في الكود.

~~~text القياس من Chrome
غيّرنا الحقل من «1» لـ «changed» ودوسنا <button type="reset">:   القيمة رجعت «1» ، ومفيش طلب اتبعت
~~~

**وليه وحش:** ضغطة غلط بتمسح كل اللي الزائر كتبه ومفيش تراجع، وهو أصلًا نادر حد يحتاجه. MDN بينصح متحطوش. لو فيه سبب حقيقي (فورم فلاتر مثلًا): بعيد عن زرار الإرسال، وشكله أهدى، وكلمته واضحة («امسح الفلاتر»).

---

## ٢. [[<button name="act" value="send">]]: مين الزرار اللي اتداس؟

الزرار بيتبعت زي الحقول: [[name]] هو المفتاح و [[value]] هو القيمة. بفرق واحد: **الزرار اللي اتداس بس** هو اللي بيتبعت.

~~~live 124 دوس كل زرار وشوف الفرق
<form onsubmit="event.preventDefault(); sent.value = decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
  <p><label for="note">الطلب</label> <input id="note" name="note" value="حصة سباحة"></p>
  <button type="submit" name="act" value="save">حفظ</button>
  <button type="submit" name="act" value="send">إرسال</button>
  <button type="submit" value="x">من غير name</button>
</form>
<p>اللي كان هيتبعت: <output id="sent">(لسه)</output></p>
~~~

**هتشوف إيه:**

- «حفظ»: [[note=حصة+سباحة&act=save]].
- «إرسال»: [[note=حصة+سباحة&act=send]].
- «من غير name»: [[note=حصة+سباحة]] بس. الزرار اللي ملوش [[name]] مبيتبعتش حتى لو ليه [[value]].

~~~text القياس من Chrome (الطلب اللي وصل السيرفر المحلي)
دوسنا «إرسال»:           a=1&act=send
زرار ليه value من غير name:   a=1
~~~

- الكلام اللي بين [[<button>]] و [[</button>]] للزائر. [[value]] للسيرفر. فالكلام يتغيّر أو يتترجم من غير ما كود السيرفر يتأثر.
- التلات أزرار ممكن ياخدوا نفس [[name]]: واحد بس هيتبعت.

### Enter جوه خانة: مين اللي بيتبعت؟

المواصفة: الضغط على Enter جوه خانة نص بيبعت الفورم كأن الزائر داس على **الزرار الافتراضي**، وهو **أول زرار إرسال في الفورم** بترتيب الكود.

~~~text القياس من Chrome
مين الزرار الافتراضي (:default) في:
<form> <button>أ</button> <input type="submit"> <button type="button">ج</button> </form>
أ = true      الـ input = false      ج = false

ضغطة Enter حقيقية جوه الخانة، في فورم فيه «امسح حسابي» (act=delete) قبل «حفظ» (act=save):
اتبعت:   name=منى+علي&act=delete

ضغطة Enter في فورم أول زرار فيه type="button" والتاني submit:
اتبعت، والزرار اللي اتحسب هو التاني   (الـ type="button" مبيتعدّش)
~~~

فترتيب الأزرار في الكود مهم: **الزرار الأساسي الأول.** لو أول زرار «امسح حسابي» والتاني «حفظ»، الزائر اللي بيدوس Enter بعد ما يكتب هيمسح حسابه.

---

## ٣. الأربعة اللي بيغيّروا الطلب

كل attribute على [[<form>]] ليه أخ على الزرار اسمه بيبدأ بـ [[form]]. لو الزرار اللي اتداس عليه الأخ ده، **بيكسب** على اللي مكتوب على الفورم، للطلب ده بس:

| على الفورم | على الزرار | بيغيّر |
|---|---|---|
| [[action]] | [[formaction]] | الطلب يروح فين |
| [[method]] | [[formmethod]] | GET ولا POST |
| [[enctype]] | [[formenctype]] | شكل جسم الطلب |
| [[target]] | [[formtarget]] | الرد يتفتح فين |
| [[novalidate]] | [[formnovalidate]] | الفحص (القسم ٤) |

كلهم بيشتغلوا على أزرار الإرسال بس: [[<button type="submit">]] و [[<input type="submit">]] و [[<input type="image">]].

فورم واحد بأربع أزرار:

~~~html
<form action="/cart" method="post">
  <input name="qty" value="2">
  <button type="submit">حدّث السلة</button>
  <button type="submit" formaction="/checkout">ادفع</button>
  <button type="submit" formaction="/cart/preview" formmethod="get">معاينة</button>
  <button type="submit" formaction="/cart/receipt" formenctype="text/plain">إيصال نصي</button>
</form>
~~~

~~~text القياس من Chrome: الطلب اللي كل زرار بعته
«حدّث السلة»:    POST /cart                content-type: application/x-www-form-urlencoded     qty=2
«ادفع»:          POST /checkout            content-type: application/x-www-form-urlencoded     qty=2
«معاينة»:        GET  /cart/preview?qty=2
«إيصال نصي»:     POST /cart/receipt        content-type: text/plain                            qty=2
~~~

### [[<button formaction="/checkout">]]

أكترهم استخدامًا: نفس البيانات، وعنوان تاني. «حدّث» و «ادفع»، أو «حفظ» و «حفظ ومعاينة».

### [[<button formmethod="get">]]

الزرار ده بيبعت GET والفورم POST (أو العكس). في المثال: «معاينة» مبتغيّرش حاجة عند السيرفر، فتبقى GET وعنوانها يتحفظ.

### [[<button formenctype="multipart/form-data">]]

بيغيّر شكل الجسم. نادر. استخدام منطقي: فورم فيه حقل ملف اختياري، وزرار «ارفع» بس هو اللي multipart.

### [[<button formtarget="_blank">]]

الرد بتاع الزرار ده بيتفتح في تاب جديدة والفورم يفضل مكانه. مناسب لـ «معاينة» أو «اطبع».

~~~live 124 كل زرار بيبعت لعنوان
<form action="/cart" method="post" onsubmit="event.preventDefault(); sent.value = (event.submitter.getAttribute('formmethod') || this.getAttribute('method')) + ' ' + (event.submitter.getAttribute('formaction') || this.getAttribute('action')) + ' ← ' + decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
  <p><label for="qty">عدد الحصص</label> <input id="qty" name="qty" type="number" value="2"></p>
  <button type="submit">حدّث السلة</button>
  <button type="submit" formaction="/checkout">ادفع</button>
  <button type="submit" formaction="/cart/preview" formmethod="get">معاينة</button>
</form>
<p>الطلب: <output id="sent">(دوس زرار)</output></p>
~~~

(سطر المعاينة هنا زايد عليه حتة: قبل البيانات بيكتب الـ method والعنوان، وبياخدهم من الزرار اللي اتداس لو عليه [[formmethod]] أو [[formaction]]، وإلا من الفورم.)

**هتشوف إيه:** [[post /cart ← qty=2]]، و [[post /checkout ← qty=2]]، و [[get /cart/preview ← qty=2]]. نفس الفورم، وتلات طلبات مختلفة.

---

## ٤. [[<form novalidate>]] و [[<button formnovalidate>]]

المتصفح بيفحص الحقول ([[required]] و [[type="email"]] و [[pattern]]...) قبل ما يبعت، ولو فيه غلط مبيبعتش. كلمتين بيوقفوا الفحص ده:

- [[novalidate]] على [[<form>]]: مفيش فحص لأي إرسال من الفورم ده.
- [[formnovalidate]] على زرار: مفيش فحص لما **الزرار ده** يتداس. باقي الأزرار بتفحص عادي.

~~~live 124 سيب الإيميل فاضي ودوس كل زرار
<form action="/join" method="post" onsubmit="event.preventDefault(); sent.value = decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
  <p><label for="email">الإيميل (إجباري)</label> <input id="email" name="email" type="email" required></p>
  <button type="submit" name="act" value="send">اشترك</button>
  <button type="submit" name="act" value="draft" formnovalidate>احفظ كمسودة</button>
</form>
<p>اللي كان هيتبعت: <output id="sent">(لسه)</output></p>
~~~

**هتشوف إيه:**

- «اشترك» والإيميل فاضي: رسالة المتصفح بتطلع على الحقل، ومفيش حاجة اتبعتت.
- «احفظ كمسودة»: اتبعت [[email=&act=draft]] من غير أي رسالة.

~~~text القياس من Chrome (الطلبات اللي وصلت السيرفر المحلي، والإيميل فاضي)
«اشترك»:                               ولا طلب (الفحص وقّف الإرسال)
«احفظ كمسودة» (formnovalidate):        POST /draft     email=&act=draft
«اشترك» بعد كتابة إيميل صح:            POST /join      email=mona%40example.test&act=send

<form novalidate> وفيه «مش إيميل» في حقل type="email":
POST /novalidate     email=%D9%85%D8%B4+%D8%A5%D9%8A%D9%85%D9%8A%D9%84      (القيمة الغلط اتبعتت)
~~~

إمتى كل واحدة:

- [[formnovalidate]]: «احفظ كمسودة»، «رجوع للخطوة اللي فاتت»، «إلغاء» اللي بيبعت للسيرفر. الزائر مش لازم يملا الفورم صح عشان يحفظ أو يرجع.
- [[novalidate]] على الفورم: لما الفحص والرسايل هيتعملوا بـ JavaScript بتاعك (درس «ملخص الأخطاء»)، فمش عايز رسايل المتصفح تطلع فوق رسايلك.

والاتنين بيوقفوا **المنع** بس: الحقل لسه بيتعدّ غلط ([[:invalid]] لسه شغال، و [[checkValidity()]] لسه بيرجّع [[false]]، اتقاس).

**ومهما كان، السيرفر بيفحص تاني.** [[novalidate]] بيتكتب من DevTools في ثانية.

---

## ٥. [[<button form="join">]]: زرار برّه الفورم

العنصر بيبقى تبع الفورم اللي هو **جواه**. [[form="..."]] بيغيّر ده: بيكتب [[id]] بتاع الفورم، والعنصر يبقى تبعه وهو في أي مكان في الصفحة.

~~~live 198 216 الزرار والموبايل برّه الفورم
<form id="join" onsubmit="event.preventDefault(); sent.value = decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
  <p><label for="name">الاسم</label> <input id="name" name="name" value="منى"></p>
</form>
<p><label for="phone">الموبايل (برّه الفورم، وعليه form="join")</label> <input id="phone" name="phone" value="010" form="join"></p>
<p><label for="lost">حقل برّه من غير form</label> <input id="lost" name="lost" value="x"></p>
<p><button type="submit" form="join" name="act" value="go">اشترك</button></p>
<p>اللي كان هيتبعت: <output id="sent">(لسه)</output></p>
~~~

**هتشوف إيه:** الزرار تحت خالص وبرّه الفورم، وبرضه بيبعته: [[name=منى&phone=010&act=go]]. الموبايل اتبعت (عليه [[form="join"]])، والحقل «lost» لأ (برّه ومش مربوط).

~~~text القياس من Chrome
الطلب اللي وصل:   name=%D9%85%D9%86%D9%89&phone=010&act=go

<button> برّه أي فورم ومن غير form:      button.form = null    (مبيعملش حاجة)
<button form="join">:                     button.form = الفورم
<button form="nope"> (id مش موجود):       button.form = null
~~~

- [[form]] بيتكتب على [[<button>]] و [[<input>]] و [[<select>]] و [[<textarea>]] و [[<fieldset>]] و [[<output>]].
- القيمة [[id]] الفورم، مش [[name]] بتاعه.
- لو الـ [[id]] غلط: العنصر يتيم ومفيش خطأ.

بيتستخدم لما شكل الصفحة بيحط الزرار بعيد عن الحقول: زرار «حفظ» في شريط ثابت فوق، أو زرار «ادفع» في ملخص الطلب على الجنب. وبيحل مشكلة تانية: **فورم جوه فورم ممنوع** في HTML، و [[form]] بيخلّي حقل في وسط فورم يبقى تبع فورم تاني.

---

## ٦. attributes على [[<button>]] ملهاش علاقة بالإرسال

[[<button>]] ليه أربع attributes تانيين بيفتحوا ويقفلوا عناصر في الصفحة من غير JavaScript: [[popovertarget]] و [[popovertargetaction]] (بيفتحوا popover)، و [[command]] و [[commandfor]] (بيدّوا أمر لعنصر تاني، زي فتح [[<dialog>]]). دول موضوع الوحدة الجاية مع [[<dialog>]] و popover.

و [[disabled]] على الزرار اتشرح في درس «readonly و disabled و checked»، ومنع الإرسال مرتين في درس «ملخص الأخطاء».

---

## ٧. الغلطات اللي بتحصل فعلًا

| الغلطة | اللي بيحصل |
|---|---|
| [[<button>]] من غير [[type]] جوه فورم | بيبعت الفورم: «أظهر كلمة السر» و «زوّد صف» بيبعتوا |
| زرار خطير أول زرار إرسال في الكود | Enter جوه أي خانة بيدوس عليه |
| زرار ليه [[value]] من غير [[name]] | مبيتبعتش، والسيرفر ميعرفش مين اتداس |
| السيرفر بيقرا الكلام اللي على الزرار | أول ترجمة أو تعديل في الكلمة بيكسر الكود |
| [[formaction]] على [[type="button"]] | ملوش تأثير: الزرار مبيبعتش أصلًا |
| «احفظ كمسودة» من غير [[formnovalidate]] | الزائر ميقدرش يحفظ إلا لما يملا كل الإجباري |
| [[novalidate]] ومفيش فحص بديل | بيانات غلط بتتبعت من غير أي تنبيه |
| [[form="join"]] والـ [[id]] مش موجود أو مكرر | الزرار مبيعملش حاجة، ومفيش خطأ |
| [[<form>]] جوه [[<form>]] | ممنوع: المتصفح بيتجاهل الفورم الجواني. استخدم [[form=]] |
| زرار reset جنب الإرسال | ضغطة غلط بتمسح كل حاجة |

---

## الخلاصة

- [[<button>]] جوه فورم = [[submit]]. اكتب [[type]] دايمًا: [[submit]] للي بيبعت و [[button]] للباقي. وابعد عن [[reset]].
- [[name]] و [[value]] على الزرار بيتبعتوا لو هو اللي اتداس بس. و Enter بيدوس على أول زرار إرسال.
- [[formaction]] و [[formmethod]] و [[formenctype]] و [[formtarget]]: الزرار بيغيّر العنوان والـ method والشكل ومكان الرد، للطلب ده بس.
- [[formnovalidate]] للزرار اللي لازم يعدّي من غير فحص (مسودة، رجوع). [[novalidate]] للفورم كله لما الفحص عليك.
- [[form="id"]] بيربط زرار أو حقل بفورم هو مش جواه.`,
          try: R`اعمل ملف [[buttons.html]] فيه فورم [[method="get"]] و [[action="buttons.html"]] جواه حقل [[name="q"]] وتلات أزرار من غير [[type]]: «دوّر» و «امسح الخانة» و «مساعدة». افتحه واكتب كلمة ودوس «مساعدة» وبص على العنوان. وبعدين اكتب على الأزرار [[type]] المناسب وجرّب تاني.`,
          sol: R`~~~html buttons.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>أزرار</title>
</head>
<body>
<form action="buttons.html" method="get">
  <label for="q">دوّر على حصة</label>
  <input id="q" name="q" type="search">
  <button type="submit">دوّر</button>
  <button type="button">امسح الخانة</button>
  <button type="button">مساعدة</button>
</form>
</body>
</html>
~~~

~~~view 79 100 شكل الصفحة (الإرسال هنا بيتكتب تحت بدل ما يتبعت)
<form onsubmit="event.preventDefault(); sent.value = 'اتبعت: ' + decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
  <label for="q">دوّر على حصة</label>
  <input id="q" name="q" type="search" value="سباحة">
  <button type="submit">دوّر</button>
  <button type="button">امسح الخانة</button>
  <button type="button">مساعدة</button>
</form>
<p><output id="sent">(لسه محصلش إرسال)</output></p>
~~~

**هتشوف إيه:**

- **من غير [[type]]:** «مساعدة» حمّلت الصفحة من جديد والعنوان بقى آخره [[?q=...]]. و «امسح الخانة» نفس الكلام. التلاتة كانوا زرار إرسال.
- **بعد [[type]]:** «دوّر» بس هو اللي بيبعت. الاتنين التانيين مبيعملوش حاجة (لسه محتاجين JavaScript عشان يمسحوا أو يفتحوا المساعدة)، بس الأهم إنهم مبقوش بيبعتوا.

ليه «امسح الخانة» [[type="button"]] مش [[type="reset"]]؟ هنا reset كان هيشتغل (حقل واحد)، بس reset بيمسح **كل** الفورم، ولو الفورم كبر هيمسح حاجات مش مقصودة. وحقل [[type="search"]] في Chrome فيه علامة × بتمسحه أصلًا.

~~~text القياس من Chrome
<button> من غير type جوه فورم:   button.type = submit
<button type="button">:          button.type = button ، والضغط مبعتش أي طلب
~~~`,
          deep: {
            why: R`أغلب الفورمات الحقيقية فيها أكتر من زرار: حفظ وإرسال، التالي والسابق، حذف وتعديل. من غير الـ attributes دي كان الحل فورم لكل زرار (وتكرار الحقول)، أو JavaScript بيغيّر [[action]] قبل الإرسال. والفخ بتاع [[type]] من أكتر الباجات اللي بتتعب: الصفحة «بتعمل refresh لوحدها» لما الزائر يدوس زرار ملوش علاقة بالإرسال، والمبرمج بيدوّر في الـ JavaScript والمشكلة كلمة ناقصة في الـ HTML.`,
            how: R`لما زرار إرسال يتداس، المتصفح بيسجّله كـ «submitter». بعدين: لو مفيش [[novalidate]] على الفورم ولا [[formnovalidate]] على الـ submitter، بيفحص الحقول، ولو فيه غلط بيقف ويعرض الرسالة. بعدها بيبني قايمة البيانات وبيضيف عليها [[name]] و [[value]] بتوع الـ submitter. وبعدين بيحدد العنوان والـ method والـ enctype والـ target: بياخد كل واحد من الـ submitter لو مكتوب عليه ([[formaction]]...)، وإلا من الفورم. و Enter جوه خانة بيدوّر على الزرار الافتراضي (أول زرار إرسال تبع الفورم بترتيب الشجرة) ويعمل كأنه اتداس. ومين «تبع الفورم»: العنصر اللي جواه، أو اللي عليه [[form]] بيشاور على [[id]] بتاعه.`,
            when: R`[[name]] و [[value]] على الأزرار: لما السيرفر يستلم كل الأزرار على نفس العنوان ويفرّق بالقيمة. [[formaction]]: لما كل زرار ليه عنوان. [[formnovalidate]]: مسودة، رجوع، إلغاء. [[formtarget="_blank"]]: معاينة أو طباعة. [[form=]]: الزرار في header أو footer أو عمود جانبي بعيد عن الحقول، أو زرار في صف جدول بيبعت فورم موجود في مكان تاني.`,
            mistakes: R`[[<button>]] من غير [[type]]. زرار خطير هو الأول في الكود. الاعتماد على نص الزرار في السيرفر. [[formnovalidate]] على الزرار الأساسي «عشان الرسايل مضايقة». [[novalidate]] من غير فحص بديل. [[form]] بـ [[name]] الفورم بدل [[id]]. ومحاولة حل كل ده بفورم جوه فورم.`
          },
          practice: [
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** فورم تسجيل فريق في بطولة «نادي الموج». العضو بيدوس «+ زوّد لاعب» أو «أظهر الكود» فالفورم بيتبعت قبل ما يخلّص. صلّح أنواع الأزرار: واحد بس يبعت. (من قسم ١ في الشرح: الفخ)`, done: R`«سجّل الفريق» بس هو [[submit]]، والاتنين التانيين [[type="button"]]، وكل الشروط ✓.`, work: { h: 198, start: R`<form onsubmit="event.preventDefault(); sent.value = 'الفورم اتبعت! ' + decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
  <p><label for="team">اسم الفريق</label> <input id="team" name="team" value="القروش"></p>
  <p><label for="p1">اللاعب ١</label> <input id="p1" name="player" value="عمر">
  <button>+ زوّد لاعب</button></p>
  <p><label for="code">كود البطولة</label> <input id="code" name="code" type="password" value="MOGA26">
  <button>أظهر الكود</button></p>
  <button>سجّل الفريق</button>
</form>
<p><output id="sent">(لسه محصلش إرسال)</output></p>`, checks: [
              { say: R`«+ زوّد لاعب» بقى [[type="button"]]`, q: "button[type=\"button\"]", has: "زوّد لاعب" },
              { say: R`«أظهر الكود» بقى [[type="button"]]`, q: "button[type=\"button\"]", has: "أظهر الكود" },
              { say: R`«سجّل الفريق» مكتوب عليه [[type="submit"]] صريح`, q: "button[type=\"submit\"]", has: "سجّل الفريق" },
              { say: R`زرار إرسال واحد بس في الفورم`, q: "form button:not([type=\"button\"]):not([type=\"reset\"])", n: 1 },
            ] }, sol: R`~~~live 198 بعد التصليح
<form onsubmit="event.preventDefault(); sent.value = 'الفورم اتبعت! ' + decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
  <p><label for="team">اسم الفريق</label> <input id="team" name="team" value="القروش"></p>
  <p><label for="p1">اللاعب ١</label> <input id="p1" name="player" value="عمر">
  <button type="button">+ زوّد لاعب</button></p>
  <p><label for="code">كود البطولة</label> <input id="code" name="code" type="password" value="MOGA26">
  <button type="button">أظهر الكود</button></p>
  <button type="submit">سجّل الفريق</button>
</form>
<p><output id="sent">(لسه محصلش إرسال)</output></p>
~~~

**هتشوف إيه:**

- قبل: أي زرار من التلاتة بيطلّع «الفورم اتبعت!».
- بعد: «+ زوّد لاعب» و «أظهر الكود» مبيعملوش حاجة (محتاجين JavaScript عشان يشتغلوا، وده مش موضوعنا)، و «سجّل الفريق» بس هو اللي بيبعت.

**ليه:** [[<button>]] جوه فورم من غير [[type]] بياخد [[submit]]. المتصفح ميعرفش إن «أظهر الكود» مش قصده الإرسال: انت اللي بتقوله بـ [[type="button"]].

**الغلطة الشائعة:** تسيب الأزرار زي ما هي وتحل المشكلة بـ JavaScript ([[event.preventDefault()]] على كل زرار). بيشتغل، بس لو الـ JavaScript اتأخر في التحميل أو فيه خطأ، الأزرار هترجع تبعت. [[type="button"]] شغال من غير أي كود.

~~~text القياس من Chrome
قبل:   التلات أزرار  button.type = submit
بعد:   submit , button , button      وزرار الإرسال الافتراضي: «سجّل الفريق»
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** فورم «طلب اشتراك» فيه حقل إيميل إجباري وزرارين: «ابعت الطلب» (بيبعت [[act=send]] لـ [[/join]] وبيفحص)، و «احفظ كمسودة» (بيبعت [[act=draft]] لـ [[/draft]] **من غير فحص**). (من قسم ٢ و ٣ و ٤ في الشرح)`, done: R`الإيميل فاضي: «ابعت الطلب» بيطلّع رسالة المتصفح، و «احفظ كمسودة» بيبعت. وكل الشروط ✓.`, work: { h: 188, start: R`<h1>طلب اشتراك</h1>
<form>
  الإيميل
  ابعت الطلب
  احفظ كمسودة
</form>`, checks: [
              { say: R`الفورم [[action="/join"]] و [[method="post"]]`, q: "form[action=\"/join\"][method=\"post\" i]" },
              { say: R`حقل إيميل [[type="email"]] إجباري وليه label`, q: "form:has(label[for]) input[type=\"email\"][required][name]" },
              { say: R`«ابعت الطلب» زرار [[submit]] بيبعت [[act=send]]`, q: "button[type=\"submit\"][name=\"act\"][value=\"send\"]" },
              { say: R`«احفظ كمسودة» بيبعت [[act=draft]]`, q: "button[type=\"submit\"][name=\"act\"][value=\"draft\"]" },
              { say: R`«احفظ كمسودة» عليه [[formnovalidate]] و [[formaction="/draft"]]`, q: "button[value=\"draft\"][formnovalidate][formaction=\"/draft\"]" },
              { say: R`«ابعت الطلب» **مش** عليه [[formnovalidate]] وهو أول زرار`, q: "form button:first-of-type[value=\"send\"]:not([formnovalidate])" },
            ] }, sol: R`~~~live 188 الحل
<h1>طلب اشتراك</h1>
<form action="/join" method="post" onsubmit="event.preventDefault(); sent.value = (event.submitter.getAttribute('formaction') || this.getAttribute('action')) + ' ← ' + decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
  <p><label for="email">الإيميل</label> <input id="email" name="email" type="email" required></p>
  <button type="submit" name="act" value="send">ابعت الطلب</button>
  <button type="submit" name="act" value="draft" formaction="/draft" formnovalidate>احفظ كمسودة</button>
</form>
<p>الطلب: <output id="sent">(لسه)</output></p>
~~~

**هتشوف إيه:**

- الإيميل فاضي و «ابعت الطلب»: رسالة المتصفح على الحقل، ومفيش إرسال.
- الإيميل فاضي و «احفظ كمسودة»: [[/draft ← email=&act=draft]].
- اكتب إيميل صح و «ابعت الطلب»: [[/join ← email=...&act=send]].

**ليه كده:**

- «ابعت الطلب» الأول في الكود: هو اللي Enter جوه الخانة بيدوس عليه.
- [[formaction]] و [[name]] و [[value]] مع بعض مش تكرار: واحد بيحدد العنوان والتاني بيقول للسيرفر مين اتداس. ينفع تكتفي بواحد فيهم حسب السيرفر مستني إيه.

**الغلطة الشائعة:** [[novalidate]] على الفورم كله عشان المسودة تعدّي. كده «ابعت الطلب» كمان هيبعت إيميل فاضي.

~~~text القياس من Chrome (الطلبات اللي وصلت السيرفر المحلي)
«ابعت الطلب» والإيميل فاضي:     ولا طلب
«احفظ كمسودة» والإيميل فاضي:    POST /draft    email=&act=draft
«ابعت الطلب» بإيميل صح:         POST /join     email=mona%40example.test&act=send
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع، وبعدين صلّح:** في صفحة «حسابي» الزائر غيّر اسمه وداس **Enter** وهو في الخانة. اكتب على ورقة: [[act]] هيتبعت بأنهي قيمة؟ جرّب في الصندوق (دوس جوه الخانة و Enter). وبعدين صلّح الترتيب عشان Enter يحفظ. (من قسم ٢ في الشرح: «Enter جوه خانة»)`, done: R`توقّعت [[act=delete]]، وبعد التصليح Enter بيبعت [[act=save]]، وكل الشروط ✓.`, work: { h: 124, start: R`<form onsubmit="event.preventDefault(); sent.value = decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
  <p><label for="name">الاسم</label> <input id="name" name="name" value="منى علي"></p>
  <button type="submit" name="act" value="delete">امسح حسابي</button>
  <button type="submit" name="act" value="save">حفظ</button>
</form>
<p>اللي كان هيتبعت: <output id="sent">(دوس Enter جوه الخانة)</output></p>`, checks: [
              { say: R`أول زرار إرسال في الفورم هو «حفظ»`, q: "form button:first-of-type[value=\"save\"]" },
              { say: R`«امسح حسابي» لسه موجود وبيبعت [[act=delete]]`, q: "button[name=\"act\"][value=\"delete\"]" },
              { say: R`الزرارين لسه [[type="submit"]]`, q: "button[type=\"submit\"]", n: 2 },
            ] }, sol: R`~~~live 124 بعد التصليح
<form onsubmit="event.preventDefault(); sent.value = decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
  <p><label for="name">الاسم</label> <input id="name" name="name" value="منى علي"></p>
  <button type="submit" name="act" value="save">حفظ</button>
  <button type="submit" name="act" value="delete">امسح حسابي</button>
</form>
<p>اللي كان هيتبعت: <output id="sent">(دوس Enter جوه الخانة)</output></p>
~~~

**هتشوف إيه:**

- قبل: Enter جوه خانة الاسم طلّع [[name=منى+علي&act=delete]]. الزائر كان عايز يحفظ اسمه، والطلب اللي راح «امسح حسابي».
- بعد: Enter بيطلّع [[name=منى+علي&act=save]].

**ليه:** Enter جوه خانة بيدوس على الزرار الافتراضي، وهو أول زرار إرسال في الكود. الترتيب في الكود هو اللي بيحسم، مش شكل الزرار ولا حجمه.

**وأحسن من كده:** الحذف ميبقاش زرار في نفس الفورم أصلًا. فورم لوحده، أو صفحة لوحدها فيها تأكيد.

**الغلطة الشائعة:** تسيب الترتيب وتعكس الأزرار بالـ CSS عشان «حفظ» يظهر الأول. Enter بيتبع ترتيب الكود، فالشكل هيقول حاجة والكيبورد هيعمل حاجة تانية.

~~~text القياس من Chrome (مين :default)
قبل:   «امسح حسابي» = true    «حفظ» = false
بعد:   «حفظ» = true           «امسح حسابي» = false
~~~

ولما اتداس Enter فعلًا جوه الخانة في Chrome قبل التصليح، اللي اتبعت: [[name=منى+علي&act=delete]].` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** دي تلات طلبات وصلت السيرفر من **نفس الفورم**، كل واحد من زرار. اكتب الفورم: حقل واحد وتلات أزرار. (من قسم ٣ في الشرح: جدول «الطلب اللي كل زرار بعته»)`, done: R`فورم واحد بـ [[post]] لـ [[/class]]، وزرارين بيغيّروا العنوان، وواحد منهم بيغيّر الـ method، وكل الشروط ✓.`, work: { h: 124, start: R`<!--
1)  POST /class               hours=3
2)  POST /class/waitlist      hours=3
3)  GET  /class/price?hours=3
-->
<form>
</form>`, checks: [
              { say: R`الفورم [[action="/class"]] و [[method="post"]]`, q: "form[action=\"/class\"][method=\"post\" i]" },
              { say: R`حقل اسمه [[hours]]`, q: "input[name=\"hours\"]" },
              { say: R`زرار من غير [[formaction]] (بيبعت للفورم نفسه)`, q: "form button[type=\"submit\"]:not([formaction])" },
              { say: R`زرار [[formaction="/class/waitlist"]]`, q: "button[formaction=\"/class/waitlist\"]:not([formmethod])" },
              { say: R`زرار [[formaction="/class/price"]] و [[formmethod="get"]]`, q: "button[formaction=\"/class/price\"][formmethod=\"get\" i]" },
              { say: R`تلات أزرار بس، ومفيش فيهم [[name]] (الطلبات مفيهاش غير [[hours]])`, q: "form button:not([name])", n: 3 },
            ] }, sol: R`~~~live 124 الحل
<form action="/class" method="post" onsubmit="event.preventDefault(); sent.value = (event.submitter.getAttribute('formmethod') || this.getAttribute('method')) + ' ' + (event.submitter.getAttribute('formaction') || this.getAttribute('action')) + ' ← ' + decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
  <p><label for="hours">عدد الساعات</label> <input id="hours" name="hours" type="number" value="3"></p>
  <button type="submit">احجز</button>
  <button type="submit" formaction="/class/waitlist">قايمة الانتظار</button>
  <button type="submit" formaction="/class/price" formmethod="get">احسب السعر</button>
</form>
<p>الطلب: <output id="sent">(دوس زرار)</output></p>
~~~

**هتشوف إيه:** كل زرار بيطلّع سطر: [[post /class ← hours=3]]، و [[post /class/waitlist ← hours=3]]، و [[get /class/price ← hours=3]]. زي التلات طلبات بالظبط.

**إزاي قريت الطلبات:**

- اتنين POST وواحد GET، فالأغلبية على الفورم: [[method="post"]]، والتالت [[formmethod="get"]].
- [[/class]] أقصر عنوان وهو الأساس: [[action="/class"]]. والاتنين التانيين [[formaction]].
- الجسم [[hours=3]] بس في التلاتة: مفيش زرار ليه [[name]].

**الغلطة الشائعة:** تلات فورمات، كل واحد فيه نسخة من حقل [[hours]]. الزائر هيكتب الرقم في واحد ويدوس زرار التاني.

~~~text القياس من Chrome (نفس التركيبة بعناوين المثال اللي في الشرح)
POST /cart                 qty=2
POST /checkout             qty=2
GET  /cart/preview?qty=2
~~~` },
            { lvl: 'تطبيق', t: R`**refactor:** الصفحة دي شغالة، بس المصمم عايز زرار «أكّد الحجز» يتنقل للـ [[<footer>]] اللي في آخر الصفحة، **برّه** الفورم، من غير ما يبطّل يبعته. انقله. (من قسم ٥ في الشرح: [[form=]])`, done: R`الزرار جوه [[<footer>]] وبرّه [[<form>]]، ولسه بيبعت الفورم باسمه وقيمته، وكل الشروط ✓.`, work: { h: 214, start: R`<main>
  <h1>حجز ملعب</h1>
  <form onsubmit="event.preventDefault(); sent.value = decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
    <p><label for="day">اليوم</label> <input id="day" name="day" type="date" value="2026-12-01"></p>
    <button type="submit" name="act" value="book">أكّد الحجز</button>
  </form>
  <p>اللي كان هيتبعت: <output id="sent">(لسه)</output></p>
</main>
<footer>
  <p>الإجمالي: ٣٠٠ جنيه</p>
</footer>`, checks: [
              { say: R`الفورم ليه [[id="booking"]]`, q: "form#booking" },
              { say: R`الزرار بقى جوه [[<footer>]]`, q: "footer button[type=\"submit\"]" },
              { say: R`مفيش زرار جوه [[<form>]]`, q: "form button", n: 0 },
              { say: R`الزرار عليه [[form="booking"]]`, q: "footer button[form=\"booking\"]" },
              { say: R`الزرار لسه بيبعت [[act=book]]`, q: "button[name=\"act\"][value=\"book\"]" },
            ] }, sol: R`~~~live 214 بعد
<main>
  <h1>حجز ملعب</h1>
  <form id="booking" onsubmit="event.preventDefault(); sent.value = decodeURIComponent(new URLSearchParams(new FormData(this, event.submitter)))">
    <p><label for="day">اليوم</label> <input id="day" name="day" type="date" value="2026-12-01"></p>
  </form>
  <p>اللي كان هيتبعت: <output id="sent">(لسه)</output></p>
</main>
<footer>
  <p>الإجمالي: ٣٠٠ جنيه</p>
  <button type="submit" form="booking" name="act" value="book">أكّد الحجز</button>
</footer>
~~~

**هتشوف إيه:** الزرار بقى تحت الإجمالي في آخر الصفحة. دوس عليه: [[day=2026-12-01&act=book]]. نفس الناتج اللي كان بيطلع وهو جوه الفورم.

**ليه كده:**

- [[id="booking"]] على الفورم و [[form="booking"]] على الزرار: نفس فكرة [[for]] و [[id]].
- [[name]] و [[value]] اتنقلوا مع الزرار، فلسه بيتبعتوا.
- الفحص ([[required]]) و Enter جوه الخانة لسه شغالين: الزرار لسه «تبع الفورم» في كل حاجة.

**الغلطة الشائعة:** تنقل الزرار وتنسى [[form=]]. الزرار هيبقى [[submit]] من غير فورم، والضغط عليه مش هيعمل أي حاجة ومش هيطلّع أي خطأ.

~~~text القياس من Chrome
زرار في footer من غير form:       button.form = null
زرار في footer بـ form="booking":  button.form = الفورم      والطلب: day=2026-12-01&act=book
~~~` }
          ]
        }
      ]
    }
]);
