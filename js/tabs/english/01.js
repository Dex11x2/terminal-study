// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   teach    اختياري: «الشرح خطوة بخطوة»: markdown صغير (## و ### و ~~~lang عنوان ... ~~~ و جداول | و - و 1. و > و ---). القواعد في README
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("english", {
  label: "إنجليزي للمبرمج: قراية وكتابة",
  prompt: "$ ",
  lab: R`mkdir -p ~/lab/english && cd ~/lab/english
touch words.md mistakes.md errors.md
code .`,
  labText: "كل حاجة في التاب ده نص مش أوامر. اعمل فولدر english فيه ٣ ملفات: words.md للكلمات الجديدة (الكلمة، ومعناها، وجملة من مكان حقيقي شفتها فيه)، و mistakes.md للغلطات اللي بتتكرر منك (الغلط ← الصح)، و errors.md لرسايل الأخطاء اللي فهمتها. ودي أهم ٣ ملفات في رحلتك مع الإنجليزي، فخليهم في repo خاص على GitHub وافتحهم كل يوم.",
  levels: {"1":["تقرا","أشهر الكلمات في الـ docs والأخطاء والـ UI، وتفك رسالة الخطأ كلمة كلمة، وتقرا README وصفحة docs"],"2":["تكتب زي المبرمجين","الـ grammar اللي بيفرق بجد، و commits و PRs و reviews و issues، وأسماء في الكود، ورسايل للفريق والعميل"],"3":["تتعلم لوحدك","تدوّر صح، وتقرا Stack Overflow بعين ناقدة، وتستخدم AI من غير ما تعتمد عليه، و changelogs و specs، وخطة ٩٠ يوم"]},
  categories: [
    {
      t: "أفعال هتقابلها كل يوم (actions)",
      l: 1,
      n: "الأفعال اللي بتتكرر في أسماء الدوال والـ docs ورسايل الأخطاء: تجيب وتحفظ وتمسح وتشغّل وتمسك الخطأ",
      items: [
        {
          cmd: "get / set / fetch / return",
          title: "الفرق بين get و fetch و load و return و send",
          desc: R`أول حاجة: انت مش محتاج «إنجليزي» كامل عشان تقرا docs. انت محتاج حوالي ٣٠٠ كلمة بتتكرر في كل حتة، ولو حفظتهم صح (بمعناهم في البرمجة مش في القاموس العادي) هتفهم أغلب اللي قدامك. التاب ده بيقسّمهم مجموعات صغيرة، وكل كلمة معاها جملة حقيقية شبه اللي هتشوفها.

المجموعة دي أفعال «الداتا بتتحرك»: [[get]] تاخد قيمة موجودة، و [[set]] تحط قيمة، و [[fetch]] تجيب من برا (API أو سيرفر، وغالبًا بياخد وقت)، و [[load]] تجيب وتجهّز للاستخدام، و [[save]] و [[store]] تحفظ، و [[return]] الدالة ترجّع نتيجة، و [[send]] و [[receive]] تبعت وتستقبل، و [[pass]] تمرّر قيمة لدالة، و [[call]] و [[invoke]] تنادي دالة.

القاعدة اللي هتريحك: الكلمة في البرمجة ليها معنى أضيق من القاموس. [[return]] في القاموس «يرجع»، بس في الكود معناها «الدالة تطلّع نتيجة للي ناداها». فلما تقرا [[Returns a Promise]] متترجمهاش «بيرجع وعد»، اقراها «الدالة بتطلّع Promise».`,
          example: R`get      Get the current user from the session.
set      Set the timeout to 5 seconds.
fetch    Fetch the orders from the API.
load     Load the config file on startup.
save     Save the draft before you close the tab.
store    The token is stored in an HttpOnly cookie.
return   This function returns the total price.
send     Send a confirmation email to the user.
receive  The server receives the request and validates it.
pass     Pass the user ID as the first argument.
call     Call this function after the page loads.
invoke   The callback is invoked once for each item.`,
          try: R`افتح أي مشروع عندك وابحث في VS Code (Ctrl+Shift+F) عن [[get]] و [[fetch]] و [[load]] في أسماء الدوال. لكل واحدة اكتب في [[words.md]]: اسم الدالة، وهي بتعمل إيه بالعربي، وهل الاسم ده مناسب ولا المفروض يبقى فعل تاني من القايمة. وبعدين اكتب ٥ جمل إنجليزي من دماغك، كل جملة فيها فعل من القايمة، عن مشروعك انت.`,
          flag: "script",
          deep: {
            why: "الأفعال دي هي نص أسماء الدوال في أي مكتبة ونص جمل الـ docs. لو فاهم الفرق بين get و fetch هتعرف من اسم الدالة لوحده إذا كانت بتاخد وقت (network) ولا لأ، وإذا كانت محتاجة await ولا لأ، من غير ما تفتح الكود.",
            how: R`اتعلمهم أزواج عشان يثبتوا: [[get]] / [[set]]، و [[send]] / [[receive]]، و [[load]] / [[save]]، و [[call]] / [[return]]. والفرق بين الشبه ببعض:

[[get]] عام وسريع غالبًا (من object أو cache). [[fetch]] من برا ومعناه ضمنيًا «هيستنى». [[load]] بيجيب ويجهّز (يقرا ملف ويعمل parse). [[retrieve]] زي get بس أرسمي، بتقابلها في docs الداتابيز.

[[call]] و [[invoke]] نفس المعنى تقريبًا، و invoke أرسمي وبتيجي كتير في الـ docs بالـ passive: [[is invoked]] يعني «بتتنادى».

وخلي بالك من الـ s في آخر الفعل: [[This function returns]] مش [[return]]، لأن الفاعل مفرد (درس present simple في المستوى ٢).`,
            when: "كل ما تسمّي دالة، وكل ما تقرا توقيع دالة في docs. قبل ما تنادي دالة اسمها fetchSomething اسأل نفسك: دي async؟ غالبًا آه.",
            mistakes: R`غلطات المصريين الشائعة: [[I will return you the file]] والصح [[I will send you the file]] (return يعني ترجّع حاجة خدتها). و [[This function return the user]] من غير s، والصح [[returns]]. و [[get the data from the API]] مقبولة في الكلام بس في اسم دالة [[fetchUsers]] أوضح من [[getUsers]] لو فيه network. و [[pass]] مش «تعدّي» بس: [[pass a value]] يعني تمرّر قيمة، و [[tests pass]] يعني الاختبارات نجحت.`
          },
          lines: [
            R`get = تاخد قيمة موجودة. «هات اليوزر الحالي من الـ session».`,
            R`set = تحط قيمة. «خلّي الـ timeout ٥ ثواني».`,
            R`fetch = تجيب من برا وبياخد وقت. «هات الأوردرات من الـ API».`,
            R`load = تجيب وتجهّز. «حمّل ملف الإعدادات أول ما البرنامج يقوم» (on startup = أول التشغيل).`,
            R`save = تحفظ. «احفظ المسودة قبل ما تقفل التاب». draft = مسودة.`,
            R`store = تخزّن، وهنا passive: «الـ token متخزّن في cookie».`,
            R`return = الدالة تطلّع نتيجة. «الدالة دي بترجّع السعر الإجمالي». لاحظ returns بالـ s.`,
            R`send = تبعت. «ابعت إيميل تأكيد لليوزر». confirmation = تأكيد.`,
            R`receive = تستقبل. «السيرفر بيستقبل الطلب ويتحقق منه». validate = يتأكد إنه صح.`,
            R`pass = تمرّر. «ابعت الـ user ID كأول argument».`,
            R`call = تنادي دالة. «نادي الدالة دي بعد ما الصفحة تحمّل».`,
            R`invoke = تنادي (أرسمي). «الـ callback بيتنادى مرة لكل عنصر». once for each = مرة لكل.`
          ],
          sol: R`مثال لـ [[words.md]] صح:

[[fetchProducts]]: بتجيب المنتجات من الـ API. الاسم مناسب لأن فيه network.
[[getProducts]] في ملف تاني بيقرا من state: مناسب، مفيش network.
[[loadData]]: بتقرا ملف JSON وتعمل parse. مناسب بس [[data]] كلمة عامة، الأحسن [[loadSettings]].

وجمل من دماغك، شكل الصح:
[[My app fetches the weather from an external API.]]
[[The login function returns a token.]]
[[I store the cart in localStorage.]]
[[The server sends an email after each order.]]
[[I pass the product ID to the details page.]]

اتأكد من ٣ حاجات في جملك: الـ s مع الفاعل المفرد ([[fetches]] و [[returns]] و [[sends]])، ومفيش [[return you]] بمعنى «ابعتلك»، و [[the]] قبل حاجة معروفة ([[the API]] اللي اتكلمنا عنه).`
        },
        {
          cmd: "create / update / delete",
          title: "أفعال التعديل: add و remove و insert و replace و reset و drop",
          desc: R`دي أفعال الـ CRUD ومعاها أخواتها. [[create]] تعمل حاجة جديدة، و [[update]] تعدّل حاجة موجودة، و [[delete]] و [[remove]] تمسح، و [[add]] تضيف لمجموعة، و [[insert]] تدخّل في مكان معين (صف في جدول، عنصر في array)، و [[append]] تضيف في الآخر، و [[replace]] تبدّل واحدة بواحدة، و [[clear]] تفضّي، و [[reset]] ترجّع للحالة الأولانية، و [[drop]] تمسح حاجة كاملة (جدول أو داتابيز)، و [[overwrite]] تكتب فوق حاجة موجودة فتضيع القديمة.

الفرق بين [[delete]] و [[remove]]: delete غالبًا مسح نهائي (من الداتابيز أو الديسك)، و remove شيل من مكان أو مجموعة (شيل عنصر من الـ cart، شيل event listener). ودي تفرق لما تقرا تحذير في docs.`,
          example: R`create     Create a new branch for each feature.
update     Update the user's email address.
delete     This action permanently deletes the account.
remove     Remove the item from the cart.
add        Add the new route to the router.
insert     Insert a row into the orders table.
append     Append the log line to the end of the file.
replace    Replace the old API key with the new one.
clear      Clear the cache and try again.
reset      Reset the form after a successful submit.
drop       Drop the table if it exists.
overwrite  This will overwrite any existing file with the same name.`,
          try: R`خد ٥ أفعال من القايمة، ولكل واحد اكتب جملة عن مشروع عندك بالشكل ده: [[When the user clicks X, the app ... ]]. وبعدين دوّر في docs Prisma أو MDN على كلمة [[permanently]] أو [[overwrite]] واقرا الجملة اللي حواليها: هي بتحذرك من إيه؟`,
          flag: "script",
          deep: {
            why: "أفعال التعديل هي اللي بتيجي في التحذيرات الخطيرة: overwrite و drop و permanently delete. لو قريتها غلط ممكن تمسح داتا. وهي كمان اللي هتكتبها كل يوم في الـ commits: Add و Remove و Update و Replace.",
            how: R`ركّز على الكلمات اللي بتغيّر درجة الخطورة: [[permanently]] = نهائي ومفيش رجوع، و [[irreversible]] = مينفعش يترجع، و [[existing]] = الموجود قبل كده، و [[if it exists]] = لو موجود بس (مش هيطلع خطأ لو مش موجود)، و [[in place]] = بيعدّل الأصل نفسه مش نسخة.

مثال من JavaScript: [[sort()]] بتعدّل الـ array in place، و [[toSorted()]] بترجّع نسخة جديدة. في الـ docs هتلاقي: [[The sort() method sorts the elements of an array in place]]، وده بالظبط سبب الـ bug المشهور.

وفي الـ commits: [[Add]] لحاجة جديدة، و [[Update]] لتعديل حاجة موجودة (بس حاول تكون أدق)، و [[Remove]] لشيل كود، و [[Replace X with Y]] لتبديل.`,
            when: "وانت بتقرا أي أمر فيه reset أو drop أو force أو overwrite: وقّف واقرا الجملة كلها. ووانت بتكتب commit أو PR عن تغيير في الداتا.",
            mistakes: R`[[I deleted the item from the cart]] لو قصدك شيلته من الـ cart، الأدق [[removed]]. و [[update the page]] بمعنى refresh، الصح [[reload]] أو [[refresh the page]]. و [[make a new branch]] مفهومة بس [[create a branch]] الأشهر. وخلي بالك: [[drop]] في SQL مش «تسيب»، دي مسح كامل للجدول. و [[clear]] مش «واضح» هنا، دي «فضّي».`
          },
          lines: [
            R`create = تعمل جديد. «اعمل branch جديد لكل feature».`,
            R`update = تعدّل موجود. «عدّل إيميل اليوزر».`,
            R`delete + permanently = مسح نهائي. «الأكشن ده بيمسح الحساب نهائي». ده تحذير.`,
            R`remove = تشيل من مجموعة. «شيل المنتج من السلة».`,
            R`add = تضيف. «ضيف الـ route الجديد للـ router».`,
            R`insert = تدخّل في مكان. «دخّل صف في جدول الأوردرات».`,
            R`append = تضيف في الآخر. «ضيف سطر الـ log في آخر الملف».`,
            R`replace ... with ... = تبدّل. «بدّل الـ API key القديم بالجديد».`,
            R`clear = تفضّي. «فضّي الـ cache وجرّب تاني».`,
            R`reset = ترجّع للأول. «رجّع الفورم فاضي بعد submit ناجح».`,
            R`drop = تمسح كامل. «امسح الجدول لو موجود» (دي الجملة اللي بتتكتب SQL: DROP TABLE IF EXISTS).`,
            R`overwrite = تكتب فوق. «ده هيكتب فوق أي ملف موجود بنفس الاسم». existing = موجود قبل كده.`
          ],
          sol: R`جمل صح بالشكل المطلوب:
[[When the user clicks "Remove", the app removes the item from the cart.]]
[[When the user submits the form, the app creates a new order and resets the form.]]
[[When the admin clicks "Delete", the app permanently deletes the product.]]

في docs MDN لـ [[Array.prototype.sort()]] هتلاقي [[sorts the elements of an array in place]]، والتحذير هنا إن الـ array الأصلي بيتغير. وفي Prisma هتلاقي حاجة زي إن [[migrate reset]] بيمسح الداتابيز ويعمل migrations من الأول: الكلمات اللي تمسك فيها [[drop]] و [[all data will be lost]].

لو كتبت [[When the user click]] من غير s، ده أشهر غلط: [[the user]] مفرد فبقت [[clicks]].`
        },
        {
          cmd: "throw / catch / handle",
          title: "أفعال الأخطاء: throw و raise و handle و retry و abort و reject",
          desc: R`دي الأفعال اللي في كل رسالة خطأ وكل صفحة docs بتتكلم عن الأخطاء. [[throw]] الكود يرمي خطأ (JS)، و [[raise]] نفس المعنى في Python، و [[catch]] تمسك الخطأ، و [[handle]] تتعامل معاه (تعرض رسالة، تسجّله، تجرب تاني)، و [[fail]] حاجة تفشل، و [[retry]] تجرّب تاني، و [[ignore]] تتجاهل، و [[skip]] تعدّي من غير ما تنفّذ، و [[abort]] تلغي في النص، و [[cancel]] تلغي (غالبًا بطلب من اليوزر)، و [[resolve]] الـ Promise تخلص بنجاح، و [[reject]] الـ Promise تخلص بخطأ، و [[recover]] ترجع تشتغل عادي بعد خطأ.

جملة هتشوفها كتير: [[Throws: TypeError if the argument is not a string]]. اقراها: «بترمي TypeError لو الـ argument مش string». يعني انت المسؤول تتأكد قبل ما تنادي، أو تحط try/catch.`,
          example: R`throw    The function throws an error if the input is empty.
raise    Python raises a KeyError when the key is missing.
catch    Catch the error and show a friendly message.
handle   Make sure you handle network errors.
fail     The build failed because of a type error.
retry    The client retries the request up to 3 times.
ignore   Unknown fields are ignored.
skip     Skip this test on Windows.
abort    The request was aborted after 10 seconds.
cancel   The user can cancel the upload at any time.
resolve  The promise resolves with the response object.
reject   The promise rejects if the network fails.`,
          try: R`افتح MDN صفحة [[fetch()]] (الـ global function). دوّر على قسم [[Exceptions]] واقرا أول سطرين. اكتب بالعربي: fetch بترمي إيه، وإمتى. وبعدين دوّر في نفس الصفحة على جملة فيها [[resolves]] و [[rejects]] واكتب معناها.`,
          flag: "script",
          deep: {
            why: "أغلب وقتك كمبرمج بيروح في الأخطاء، والـ docs بتقولك بالظبط الدالة بتفشل إمتى وإزاي، بس بالأفعال دي. لو فاهمها، هتعرف تكتب try/catch في المكان الصح بدل ما تلفّ كل حاجة في try.",
            how: R`اتعلمهم في جمل كاملة، لأن معناهم بيتغير مع الـ preposition: [[resolve with]] = تخلص بالقيمة دي، [[reject with]] = تفشل بالخطأ ده، [[fail with]] = تفشل ومعاها رسالة/كود، [[fall back to]] = لو فشلت استخدم البديل ده.

و [[up to 3 times]] يعني «لحد ٣ مرات، مش أكتر». و [[at any time]] يعني «في أي وقت». و [[after 10 seconds]] = بعد ما تعدي ١٠ ثواني.

والـ passive كتير هنا: [[was aborted]] = اتلغى، و [[are ignored]] = بيتم تجاهلهم، و [[is thrown]] = بيترمي. الـ docs بتحب الـ passive لأن المهم الحاجة اللي حصلت، مش مين عملها.`,
            when: "وانت بتقرا قسم Exceptions أو Throws أو Errors في أي docs، ووانت بتكتب error handling، ووانت بتكتب bug report (The request fails with 500).",
            mistakes: R`[[The code is throwing me an error]] دي ترجمة حرفية، الصح [[The code throws an error]] أو [[I'm getting an error]]. و [[handle]] مش «يمسك» بس، دي «يتصرف»، فـ [[catch]] من غير ما تعمل حاجة مش handling (شوف درس [[catch {}]] في «تاب هندسة البرمجيات»). و [[the test was failed]] غلط، الصح [[the test failed]] لأن fail هنا مش passive.`
          },
          lines: [
            R`throw = ترمي خطأ. «الدالة بترمي خطأ لو الإدخال فاضي». empty = فاضي.`,
            R`raise = ترمي (في Python). «Python بترمي KeyError لما المفتاح مش موجود». missing = ناقص/مش موجود.`,
            R`catch = تمسك. «امسك الخطأ واعرض رسالة لطيفة». friendly = سهلة ومش مخيفة لليوزر.`,
            R`handle = تتصرف مع. «اتأكد إنك بتتعامل مع أخطاء الشبكة». make sure = اتأكد.`,
            R`fail = تفشل. «الـ build فشل بسبب خطأ أنواع». because of = بسبب.`,
            R`retry = تجرّب تاني. «الـ client بيعيد الطلب لحد ٣ مرات». up to = لحد.`,
            R`ignore = تتجاهل (passive هنا). «الحقول اللي مش معروفة بيتم تجاهلها».`,
            R`skip = تعدّي. «متشغّلش الاختبار ده على ويندوز».`,
            R`abort = تلغي في النص. «الطلب اتلغى بعد ١٠ ثواني» (timeout).`,
            R`cancel = تلغي بإرادتك. «اليوزر يقدر يلغي الرفع في أي وقت».`,
            R`resolve with = الـ Promise تخلص بالقيمة دي. «الـ promise بتخلص بالـ response object».`,
            R`reject = الـ Promise تفشل. «بتفشل لو الشبكة وقعت».`
          ],
          sol: R`في صفحة MDN بتاعة [[fetch()]] قسم Exceptions بيقول إن fetch بترمي (بشكل أدق: الـ Promise بتعمل reject) بـ [[AbortError]] لو الطلب اتلغى بـ [[AbortController]]، و [[TypeError]] لو فيه مشكلة زي URL فيه بيانات دخول أو مشكلة شبكة. بالعربي: «fetch بتفشل لو الطلب اتلغى، أو لو الشبكة وقعت، أو الـ URL/الإعدادات غلط».

والجملة المهمة اللي فيها resolves: الـ Promise بتخلص بنجاح ([[resolves]]) بالـ Response أول ما الـ headers توصل، حتى لو السيرفر رد 404 أو 500. يعني fetch مبتعملش reject على HTTP errors، ولازم تفحص [[response.ok]] بنفسك. ودي بالظبط الحاجة اللي لو قريتها صح هتوفر عليك bug مشهور.

لو فهمت إن fetch بترمي خطأ على 404، ارجع اقرا الجملة تاني وركز على كلمة [[even if]] أو [[only]] فيها.`
        },
        {
          cmd: "run / build / deploy",
          title: "أفعال التشغيل: install و build و deploy و enable و upgrade",
          desc: R`دي الأفعال اللي في الـ README وفي الـ terminal وفي الـ CI. [[install]] تسطّب، و [[run]] تشغّل أمر أو برنامج، و [[execute]] نفس المعنى (أرسمي)، و [[build]] تبني نسخة للإنتاج، و [[compile]] تحوّل كود لكود تاني (TS لـ JS)، و [[bundle]] تجمع ملفات في ملف واحد، و [[deploy]] تنشر على سيرفر، و [[start]] و [[stop]] و [[restart]] تشغّل وتوقّف وتعيد، و [[enable]] و [[disable]] تفعّل وتقفل، و [[configure]] تظبط الإعدادات، و [[update]] تحدّث لنسخة أحدث (نفس الإصدار الكبير غالبًا)، و [[upgrade]] ترقّي لإصدار أكبر، و [[downgrade]] ترجع لنسخة أقدم، و [[migrate]] تنقل (داتابيز أو كود) من شكل قديم لجديد.`,
          example: R`install    Install the dependencies with npm ci.
run        Run the tests before you push.
execute    The script is executed in a separate process.
build      Build the app for production.
compile    TypeScript compiles your code to JavaScript.
bundle     Vite bundles your modules into a few files.
deploy     Deploy the app to the staging server first.
restart    Restart the service after you change the config.
enable     Enable two-factor authentication in your settings.
configure  Configure the database URL in the .env file.
upgrade    Upgrade to the latest major version.
migrate    Migrate the database before you start the server.`,
          try: R`افتح README أي مكتبة مشهورة بتستخدمها (Express أو Prisma أو Vite) على GitHub. عدّ الأفعال من القايمة دي اللي في أول شاشة. لكل فعل انقل الجملة كاملة في [[words.md]] وترجمها ترجمة «بتاعة مبرمج» مش ترجمة قاموس.`,
          flag: "script",
          deep: {
            why: "أي README وأي «Getting started» عبارة عن سلسلة أوامر بالأفعال دي. لو فاهم الفرق بين update و upgrade، و build و compile، و restart و reload، هتعرف تمشي الخطوات بالترتيب ومن غير ما تبوّظ حاجة.",
            how: R`الأفعال دي بتيجي في الـ README بصيغة الأمر (imperative): [[Install the dependencies]]، [[Run the tests]]. من غير «you» ومن غير «please». ده مش قلة أدب، ده الشكل الطبيعي للتعليمات بالإنجليزي، وهتكتبه انت كمان.

وبتيجي مع [[before]] و [[after]] و [[first]] و [[then]] عشان الترتيب: [[Migrate the database before you start the server]] يعني الترتيب مهم.

فرق مهم: [[update]] عادة تحديث صغير آمن، و [[upgrade]] نقلة ممكن تكسر حاجات (major version)، وعشان كده بتلاقي «upgrade guide» أو «migration guide» معاه. و [[reload]] = إعادة قراية الإعدادات من غير إيقاف، و [[restart]] = إيقاف وتشغيل.`,
            when: "وانت ماشي في أي خطوات تسطيب، أو بتقرا خطوات CI فشلت، أو بتكتب README لمشروعك.",
            mistakes: R`[[I made install to the packages]] ترجمة حرفية، الصح [[I installed the packages]]. و [[I uploaded the site]] مفهومة بس في شغلنا [[I deployed the site]]. و [[open the server]] غلط، الصح [[start the server]]. و [[close the server]] الصح [[stop]] أو [[shut down]]. و [[the app is running]] = شغال دلوقتي، مش «بيجري».`
          },
          lines: [
            R`install = تسطّب. «سطّب الـ dependencies بـ npm ci».`,
            R`run = تشغّل. «شغّل الاختبارات قبل ما تعمل push».`,
            R`execute (passive) = بيتنفّذ. «السكربت بيتنفذ في process منفصلة».`,
            R`build = تبني. «ابني التطبيق للإنتاج».`,
            R`compile = تحوّل. «TypeScript بيحوّل كودك لـ JavaScript».`,
            R`bundle = تجمع. «Vite بيجمّع الـ modules في كام ملف».`,
            R`deploy = تنشر. «انشر على سيرفر الـ staging الأول». first = الأول.`,
            R`restart = تعيد تشغيل. «أعد تشغيل الخدمة بعد ما تغيّر الإعدادات».`,
            R`enable = تفعّل. «فعّل التحقق بخطوتين من الإعدادات».`,
            R`configure = تظبط. «حط رابط الداتابيز في ملف .env».`,
            R`upgrade = ترقّي. «رقّي لأحدث إصدار كبير». latest = الأحدث، major = كبير.`,
            R`migrate = تنقل. «اعمل migration للداتابيز قبل ما تشغّل السيرفر».`
          ],
          sol: R`مثال من README بتاع Vite أو Express هتلاقي جمل زي:
[[npm install express]] مع جملة [[Install the module with npm]] ← «سطّب المكتبة بـ npm».
[[Run the development server]] ← «شغّل سيرفر التطوير».
[[Build for production]] ← «ابني نسخة الإنتاج».

المفروض تلاقي على الأقل ٣ لـ ٥ أفعال من القايمة في أول شاشة. الترجمة الصح «بتاعة مبرمج» قصيرة وفيها المصطلح زي ما هو: «شغّل سيرفر التطوير»، مش «قم بتشغيل خادم التطوير».

لو لقيت كلمة زي [[scaffold]] أو [[bootstrap]]: دي معناها «تعمل هيكل مشروع جاهز». ضيفها لـ [[words.md]].`
        }
      ]
    },
    {
      t: "كلمات الحالة والوصف (states)",
      l: 1,
      n: "الكلمات اللي بتوصف حاجة عاملة إيه دلوقتي: pending و failed و deprecated و invalid و disabled",
      items: [
        {
          cmd: "pending / failed / done",
          title: "حالات الشغل: pending و in progress و succeeded و failed و timed out",
          desc: R`أي حاجة بتاخد وقت (طلب network، build في CI، دفع، job في queue) ليها حالات، وأسماء الحالات دي ثابتة تقريبًا في كل الأدوات. هتشوفها في GitHub Actions، وفي Stripe، وفي React Query، وفي أي dashboard.

[[pending]] مستنية لسه مبدأتش أو مخلصتش، و [[queued]] واقفة في الطابور، و [[in progress]] و [[running]] شغالة دلوقتي، و [[loading]] بتحمّل، و [[idle]] واقفة مستنية أمر، و [[succeeded]] و [[completed]] و [[done]] خلصت، و [[failed]] فشلت، و [[cancelled]] اتلغت، و [[skipped]] اتعدّت من غير ما تشتغل، و [[timed out]] خدت وقت أكتر من المسموح فاتقفلت، و [[stale]] قديمة ومحتاجة تتحدث، و [[retrying]] بتتجرب تاني.

خلي بالك إن نفس الكلمة ممكن تيجي صفة أو فعل: [[The job failed]] (فعل: فشلت) و [[3 failed jobs]] (صفة: ٣ jobs فاشلة).`,
          example: R`pending      Your payment is still pending.
queued       The job is queued and will start soon.
in progress  The deployment is in progress.
loading      Show a spinner while the data is loading.
idle         The query is idle until you enable it.
succeeded    All checks have succeeded.
completed    The migration completed in 2 seconds.
failed       1 failing check: build failed on Node 22.
cancelled    The workflow run was cancelled.
skipped      This step was skipped because the condition was false.
timed out    The request timed out after 30 seconds.
stale        The cached data is stale and will be refetched.`,
          try: R`افتح تاب Actions في أي repo عندك على GitHub (أو repo مفتوح المصدر مشهور). اكتب كل كلمة حالة شايفها جنب الـ runs والـ steps، ولكل واحدة الأيقونة واللون. وبعدين اكتب جملة إنجليزي واحدة لكل حالة تشرح لزميل إيه اللي حصل: [[The build ... because ...]].`,
          flag: "script",
          deep: {
            why: "الكلمات دي هي أول حاجة بتشوفها لما حاجة تبوظ: الـ CI بيقول failed، والدفع pending، والـ query stale. ولو هتكتب status update لفريقك هتستخدمها نفسها.",
            how: R`اتعلمها كـ «رحلة»: [[queued]] ← [[in progress]] ← واحدة من [[succeeded]] أو [[failed]] أو [[cancelled]] أو [[timed out]]. وأي خطوة مشتغلتش أصلًا [[skipped]].

وفي React Query مثلًا الحالات: [[status]] بيبقى [[pending]] أو [[error]] أو [[success]]، و [[fetchStatus]] بيبقى [[fetching]] أو [[paused]] أو [[idle]]. شوف إزاي نفس الكلمات بتتكرر من مكتبة للتانية.

و [[still]] = لسه، و [[yet]] في النفي = لسه: [[It hasn't started yet]] «لسه مبدأش». و [[already]] = خلاص: [[It has already finished]].`,
            when: "وانت بتقرا dashboard أو CI، ووانت بتسمّي state في الكود ([[status: 'idle' | 'loading' | 'success' | 'error']])، ووانت بتكتب status update.",
            mistakes: R`[[The request is timeout]] غلط، الصح [[The request timed out]] (فعل) أو [[a timeout error]] (اسم). و [[the payment is pended]] مفيش كلمة زي دي، الصح [[pending]]. و [[canceled]] و [[cancelled]] الاتنين صح (أمريكي وبريطاني)، بس اختار واحدة وثبّت عليها في الكود. و [[the test is failed]] الصح [[the test failed]] أو [[the test is failing]].`
          },
          lines: [
            R`pending = لسه مستنية. «الدفع لسه متعلّق». still = لسه.`,
            R`queued = في الطابور. «الـ job في الطابور وهتبدأ قريب».`,
            R`in progress = شغالة. «النشر شغال دلوقتي».`,
            R`loading = بتحمّل. «اعرض spinner والداتا بتحمّل». while = طول ما.`,
            R`idle = واقفة. «الـ query واقفة لحد ما تفعّلها». until = لحد.`,
            R`succeeded = نجحت. «كل الـ checks نجحت».`,
            R`completed = خلصت. «الـ migration خلصت في ثانيتين».`,
            R`failed/failing = فشلت. «check واحد فاشل: الـ build فشل على Node 22». دي صيغة GitHub.`,
            R`cancelled = اتلغت. «تشغيل الـ workflow اتلغى».`,
            R`skipped = اتعدّت. «الخطوة دي متشغلتش لأن الشرط كان false».`,
            R`timed out = عدّت الوقت المسموح. «الطلب وقف بعد ٣٠ ثانية».`,
            R`stale = قديمة. «الداتا اللي في الـ cache قديمة وهتتجاب تاني». refetch = تجيب تاني.`
          ],
          sol: R`في GitHub Actions هتلاقي تقريبًا: [[Success]] بعلامة صح خضرا، و [[Failure]] بـ X حمرا، و [[Cancelled]] بدايرة رمادي، و [[Skipped]] رمادي بشرطة، و [[In progress]] أو [[Queued]] بدايرة صفرا بتلف. (الأسماء بالظبط ممكن تختلف شوية في الواجهة، المهم المعنى.)

جمل صح:
[[The build failed because a test timed out.]]
[[The deploy job was skipped because the build failed.]]
[[The workflow is queued; it will start when a runner is free.]]
[[The lint step succeeded, but the tests are still running.]]

لو كتبت [[The build is failed]] صلّحها لـ [[The build failed]]. ولو كتبت [[because of the test timed out]] صلّحها لـ [[because the test timed out]]: [[because of]] بعدها اسم بس ([[because of a timeout]]).`
        },
        {
          cmd: "deprecated / invalid / required",
          title: "valid و invalid و required و optional و deprecated و legacy",
          desc: R`دي الكلمات اللي بتوصف قيمة أو ميزة: مسموحة ولا لأ، لازمة ولا لأ، لسه مدعومة ولا لأ.

[[valid]] صحيحة ومقبولة، و [[invalid]] مش مقبولة (شكلها غلط)، و [[required]] لازم تتبعت، و [[optional]] اختيارية، و [[missing]] ناقصة (كان المفروض تيجي ومجاتش)، و [[empty]] فاضية، و [[unknown]] مش معروفة، و [[unexpected]] مكانتش متوقعة، و [[deprecated]] لسه شغالة بس هتتشال ومتستخدمهاش في كود جديد، و [[obsolete]] قديمة ومبقتش مستخدمة، و [[legacy]] كود أو نظام قديم لسه شغال، و [[experimental]] تجريبية وممكن تتغير، و [[stable]] ثابتة وآمنة، و [[unsupported]] مش مدعومة.

أهم واحدة فيهم [[deprecated]]: مش معناها «اتمسحت»، معناها «لسه شغالة النهارده، بس بلّغناك إنها هتتشال، فابدأ انقل». ودايمًا جنبها كلمة [[use X instead]] = «استخدم X بدلها».`,
          example: R`valid         Enter a valid email address.
invalid       Invalid input: expected a number.
required      The "name" field is required.
optional      The second argument is optional.
missing       Missing required parameter: userId.
empty         The list is empty.
unknown       Unknown option: --verbos.
unexpected    Unexpected token '<', "<!DOCTYPE html>" is not valid JSON
deprecated    This method is deprecated. Use fetchUsers() instead.
legacy        The legacy API will be removed in v5.
experimental  This feature is experimental and may change.
unsupported   Node 16 is no longer supported.`,
          try: R`شغّل [[npm i request@2.88.2]] في فولدر تجربة (ومتنساش تمسحه بعد كده). اقرا سطور [[npm warn deprecated]] اللي هتطلع، وترجم كل واحدة. وبعدين اقرا سطر [[vulnerabilities]] في الآخر. إيه اللي المفروض تعمله؟`,
          flag: "script",
          deep: {
            why: "الكلمات دي هي اللي بتقولك «انت اللي غلطان» (invalid و missing و required) ولا «المكتبة بتتغير» (deprecated و experimental و legacy). الفرق ده بيحدد تصلّح كودك ولا تنقل لحاجة جديدة.",
            how: R`البادئات (prefixes) بتقلب المعنى، فاحفظها مرة واحدة وهتفهم كلمات كتير: [[in-]] ([[invalid]] و [[incorrect]] و [[incompatible]])، و [[un-]] ([[unknown]] و [[unexpected]] و [[unsupported]] و [[undefined]])، و [[dis-]] ([[disabled]] و [[disconnected]])، و [[non-]] ([[non-empty]] و [[non-null]])، و [[mis-]] = غلط ([[misconfigured]] و [[mismatch]]).

وفي الـ docs: [[no longer]] = مبقاش ([[no longer supported]] = مبقاش مدعوم)، و [[will be removed in]] = هيتشال في إصدار كذا، و [[in favor of]] = لصالح (يعني البديل)، و [[as of v5]] = من أول v5.

الـ deprecation المظبوط بيقولك ٣ حاجات: إيه اللي deprecated، وإيه البديل، وهيتشال إمتى. دوّر على التلاتة.`,
            when: "كل مرة npm أو المتصفح أو TS يطلّع warning فيه deprecated، وكل مرة validation يرفض فورم، وقبل ما تختار مكتبة (experimental؟ legacy؟).",
            mistakes: R`تتجاهل الـ deprecated warnings لأنها «مش errors»: بعد إصدارين بتبقى errors فعلًا. و [[the field is require]] الصح [[required]]. و [[not valid]] مقبولة بس [[invalid]] أشهر. و [[deprecated]] بتتنطق «ديبريكيتد» مش «ديبرسيتد». وفي رسايل الـ validation اللي بتكتبها لليوزر: [[Email is not correct]] أضعف من [[Enter a valid email address]].`
          },
          lines: [
            R`valid = صحيحة. «دخّل إيميل صحيح». رسالة فورم مشهورة.`,
            R`invalid = مش مقبولة. «إدخال غلط: كان متوقع رقم». expected = المتوقع.`,
            R`required = لازم. «حقل name لازم يتملى».`,
            R`optional = اختياري. «الـ argument التاني اختياري».`,
            R`missing = ناقص. «ناقص باراميتر لازم: userId».`,
            R`empty = فاضي. «الليستة فاضية».`,
            R`unknown = مش معروف. «option مش معروف: --verbos» (غلطة إملائية في الأمر).`,
            R`unexpected = مش متوقع. رسالة JSON.parse الحقيقية في Node 22 لما يستلم صفحة HTML بدل JSON: «الحرف < مش متوقع، والنص ده مش JSON صحيح». not valid = مش صحيح.`,
            R`deprecated + instead = هتتشال، واستخدم البديل. «الـ method دي هتتشال. استخدم fetchUsers() بدلها».`,
            R`legacy = قديم. «الـ API القديم هيتشال في v5». will be removed = هيتشال.`,
            R`experimental = تجريبي. «الميزة دي تجريبية وممكن تتغير». may = ممكن.`,
            R`no longer supported = مبقاش مدعوم. «Node 16 مبقاش مدعوم».`
          ],
          sol: R`اللي هيطلعلك (جربناه في سبتمبر ٢٠٢٦، والنص ممكن يتغير):
[[npm warn deprecated request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142]] ← «مكتبة request اتعملها deprecate، شوف الـ issue ده».
[[npm warn deprecated har-validator@5.1.5: this library is no longer supported]] ← «المكتبة دي مبقتش مدعومة».
[[npm warn deprecated uuid@3.4.0: uuid@10 and below is no longer supported.]] ← «uuid 10 وأقدم مبقوش مدعومين» وبعدها بيقولك تحدّث لأحدث إصدار.

وفي الآخر: [[5 vulnerabilities (3 moderate, 2 critical)]] ← «٥ ثغرات: ٣ متوسطة و ٢ خطيرة جدًا». و [[npm audit]] هيقولك [[No fix available]] = مفيش إصلاح، لأن المكتبة نفسها مبقتش بتتحدث.

اللي المفروض تعمله: متستخدمش [[request]] في كود جديد، استخدم [[fetch]] المبني في Node. لاحظ إن الـ warnings دي جاية من dependencies جوه request نفسها، مش من كودك. وامسح الفولدر بعد التجربة.`
        },
        {
          cmd: "enabled / available / allowed",
          title: "enabled و available و allowed و denied و read-only و expired",
          desc: R`المجموعة دي بتوصف «تقدر ولا متقدرش»: صلاحيات وإعدادات ووجود.

[[enabled]] / [[disabled]] متفعّل / مقفول (إعداد)، و [[available]] / [[unavailable]] موجود ومتاح / مش متاح دلوقتي، و [[allowed]] مسموح، و [[forbidden]] ممنوع (403)، و [[denied]] اترفض (permission denied)، و [[unauthorized]] مش متعرّف عليك (401، يعني سجّل دخول)، و [[public]] / [[private]] للكل / ليك بس، و [[read-only]] قراية بس، و [[visible]] / [[hidden]] باين / مخفي، و [[locked]] مقفول، و [[expired]] خلصت مدته (token أو شهادة)، و [[revoked]] اتسحب (key أو token).

الفرق المشهور في الانترفيو: [[401 Unauthorized]] معناها فعليًا «مش عارفين انت مين» (authentication)، و [[403 Forbidden]] «عارفينك بس ممنوع» (authorization). الاسم نفسه مضلل شوية، وده من المشهور.`,
          example: R`enabled      Dark mode is enabled by default.
disabled     The submit button is disabled until the form is valid.
available    This feature is only available on the Pro plan.
unavailable  Service Unavailable: please try again later.
allowed      Only 5 requests per minute are allowed.
forbidden    403 Forbidden: you don't have access to this resource.
denied       Permission denied (publickey).
unauthorized 401 Unauthorized: the token is missing or invalid.
read-only    The file system is read-only.
hidden       Hidden files start with a dot.
expired      Your session has expired. Please log in again.
revoked      The API key was revoked.`,
          try: R`جرّب [[ssh -T git@github.com]] من جهاز معندوش SSH key مضاف (أو استخدم [[-i]] بمفتاح غلط). اقرا الرسالة كلمة كلمة. وبعدين افتح أي API عندك بـ curl من غير token وشوف الـ status والرسالة: 401 ولا 403؟ اكتب ليه.`,
          flag: "script",
          deep: {
            why: "نص مشاكل الـ deploy والـ API بتيجي في رسالة فيها واحدة من الكلمات دي. لو قريت denied وفهمتها «السيرفر واقع» هتدوّر في المكان الغلط، والصح «الصلاحيات أو المفتاح».",
            how: R`اربط كل كلمة بسؤال:
[[unauthorized]] / [[unauthenticated]] ← «انت مين؟» ← ابعت token أو سجّل دخول.
[[forbidden]] / [[denied]] ← «انت معروف بس مش مسموحلك» ← صلاحيات أو دور.
[[expired]] / [[revoked]] ← «كان صح وبقى مش صح» ← جدّد الـ token أو المفتاح.
[[unavailable]] ← «المشكلة عندهم مش عندك» ← استنى وجرب تاني (503).
[[disabled]] ← «موجود بس مقفول» ← دوّر على إعداد يفعّله.

و [[by default]] = افتراضيًا، و [[only]] = بس (بتقيّد المعنى جامد: [[only available on]] = متاح بس في)، و [[per]] = لكل ([[per minute]] = في الدقيقة).`,
            when: "وانت بتقرا رسالة ssh أو git push أو curl أو داتابيز فيها denied، ووانت بتختار status code لـ API بتكتبه.",
            mistakes: R`[[I don't have a permission]] الصح [[I don't have permission]] (permission هنا uncountable في الجملة دي)، أو [[I don't have access to the repo]]. و [[the key is finished]] الصح [[the key expired]]. و [[the button is closed]] الصح [[the button is disabled]]. و [[Access is refused]] مش شائعة، الشائع [[Access denied]] أو [[Permission denied]].`
          },
          lines: [
            R`enabled + by default = متفعّل افتراضيًا. «الوضع الغامق شغال من الأول».`,
            R`disabled + until = مقفول لحد. «زرار الإرسال مقفول لحد ما الفورم يبقى صح».`,
            R`only available on = متاح بس في. «الميزة دي في الباقة Pro بس».`,
            R`Service Unavailable = 503. «الخدمة مش متاحة، جرّب كمان شوية». later = بعدين.`,
            R`allowed + per = مسموح لكل. «مسموح ٥ طلبات في الدقيقة» (rate limit).`,
            R`403 Forbidden = ممنوع. «ملكش صلاحية على الحاجة دي».`,
            R`Permission denied (publickey) = رسالة ssh الحقيقية: السيرفر رفضك لأن مفيش مفتاح مقبول.`,
            R`401 = مش متعرّف عليك. «الـ token مش موجود أو غلط».`,
            R`read-only = قراية بس. «نظام الملفات قراية بس» (بتحصل في Docker و CI).`,
            R`hidden = مخفي. «الملفات المخفية بتبدأ بنقطة».`,
            R`expired = خلصت مدتها. «الـ session خلصت، سجّل دخول تاني».`,
            R`revoked = اتسحب. «مفتاح الـ API اتلغى» (غالبًا لأنه اتسرّب).`
          ],
          sol: R`رسالة ssh الحقيقية: [[git@github.com: Permission denied (publickey).]] وبتتقري: «GitHub رفض دخولك، وطريقة الدخول الوحيدة اللي جربها كانت المفتاح العام (publickey)، ومفيش مفتاح مقبول». يعني الحل: اعمل SSH key وضيفه في GitHub (درس [[ssh key لـ GitHub]] في «تاب Git»)، مش إن GitHub واقع.

و curl من غير token على API محمي: المفروض [[401]] مع رسالة زي [[Unauthorized]] أو [[Missing token]]، لأن السيرفر مش عارف انت مين. لو بعت token صح بس ليوزر عادي وبتنادي على endpoint للأدمن، المفروض [[403 Forbidden]].

لو الـ API بتاعك بيرجّع 403 في الحالتين، دي نقطة تحسين تكتبها في issue: [[The API returns 403 when the token is missing; it should return 401.]]`
        }
      ]
    },
    {
      t: "أماكن وأشياء وكلمات صغيرة",
      l: 1,
      n: "أسماء الأماكن (root و path و scope) وأسماء حاجات الكود والويب، والكلمات الصغيرة اللي بتغيّر معنى الجملة كلها",
      items: [
        {
          cmd: "root / path / directory",
          title: "root و path و directory و parent و nested و relative",
          desc: R`دي كلمات «فين»: فين الملف، وفين الأمر شغال، وفين الإعداد.

[[root]] الأصل أو أعلى نقطة (root directory للمشروع، و root user الأدمن في Linux)، و [[path]] المسار لملف أو فولدر، و [[directory]] و [[folder]] نفس الحاجة (directory في الـ terminal والـ docs، و folder في الواجهات)، و [[working directory]] الفولدر اللي انت واقف فيه دلوقتي، و [[home directory]] فولدر اليوزر [[~]]، و [[parent]] الأب (الفولدر اللي فوق)، و [[child]] الابن، و [[nested]] جوه بعض، و [[relative path]] مسار نسبةً لمكانك ([[./src]])، و [[absolute path]] مسار كامل من الـ root ([[/home/sara/app]])، و [[extension]] امتداد الملف ([[.ts]])، و [[entry point]] الملف اللي البرنامج بيبدأ منه، و [[location]] مكان.

كلمة [[root]] نفسها ليها معاني كتير حسب السياق: root directory، و root user، و root element في HTML، و root cause = السبب الأصلي لمشكلة. السياق هو اللي بيحدد.`,
          example: R`root              Run the command from the project root.
path              The path must point to an existing file.
directory         No such file or directory.
working directory The current working directory is /home/sara/app.
home              Config files are stored in your home directory.
parent            The parent directory is ../ (one level up).
nested            Nested folders are created automatically.
relative          Relative paths are resolved from the current directory.
absolute          Use an absolute path in the cron job.
extension         Rename the file extension from .js to .ts.
entry point       The entry point of the app is src/main.tsx.
root cause        We found the root cause: a missing index.`,
          try: R`شغّل [[node -e 'require("fs").readFileSync("nope.txt")']] واقرا الرسالة. وبعدين في أي مشروع عندك افتح [[package.json]] ودوّر على [[main]] أو [[module]] أو [[bin]]: ده الـ entry point. اكتب جملة إنجليزي بتقول الـ entry point بتاعك فين.`,
          flag: "script",
          deep: {
            why: R`أشهر رسالة خطأ في الدنيا فيها كلمة من دول: [[No such file or directory]]. ونص مشاكل السكربتات والـ cron و Docker سببها relative path بيتحسب من working directory غير اللي انت فاكره.`,
            how: R`[[resolve]] هنا معناها «يحسب المسار الكامل»، مش «يحل». فـ [[Relative paths are resolved from the current directory]] = «المسارات النسبية بتتحسب من الفولدر الحالي». نفس الكلمة في Promise معناها «تخلص بنجاح»، وفي DNS «يترجم اسم لـ IP». السياق تاني.

و [[point to]] = يشاور على، و [[one level up]] = مستوى واحد لفوق، و [[automatically]] = لوحده من غير ما تعمل حاجة.

[[directory]] بتتنطق «دايركتوري» أو «ديركتوري» والاتنين صح.`,
            when: "كل ما تقرا خطأ ENOENT أو Cannot find module، وكل ما تكتب مسار في سكربت أو Dockerfile أو cron.",
            mistakes: R`[[in the root of the project]] صح، بس [[in the project's root]] أو [[at the project root]] أشهر. و [[the file is not exist]] غلط، الصح [[the file doesn't exist]]. و [[open the folder of the project]] الأطبع [[open the project folder]]: بالإنجليزي الاسم اللي بيوصف بييجي قبل ([[project folder]] و [[config file]] و [[error message]]). ودي من أهم الفروق بين العربي والإنجليزي.`
          },
          lines: [
            R`project root = أصل المشروع. «شغّل الأمر من فولدر المشروع الرئيسي».`,
            R`path + must point to = المسار لازم يشاور على ملف موجود.`,
            R`دي رسالة ENOENT الحقيقية: «مفيش ملف أو فولدر بالاسم ده».`,
            R`working directory = الفولدر الحالي. «الفولدر اللي انت فيه دلوقتي هو ...».`,
            R`home directory = فولدر اليوزر. «ملفات الإعداد متخزنة في الـ home».`,
            R`parent = الأب. «الفولدر الأب هو ../ مستوى واحد لفوق».`,
            R`nested = جوه بعض. «الفولدرات المتداخلة بتتعمل لوحدها» (زي mkdir -p).`,
            R`relative + resolved = النسبية بتتحسب من الفولدر الحالي.`,
            R`absolute = كامل. «استخدم مسار كامل في الـ cron» لأن الـ cron مبيبدأش من فولدرك.`,
            R`extension = الامتداد. «غيّر امتداد الملف من .js لـ .ts».`,
            R`entry point = نقطة البداية. «التطبيق بيبدأ من src/main.tsx».`,
            R`root cause = السبب الأصلي. «لقينا السبب: index ناقص».`
          ],
          sol: R`الرسالة الحقيقية (Node 22):
[[Error: ENOENT: no such file or directory, open 'nope.txt']]
[[ENOENT]] = Error NO ENTry، يعني «مفيش حاجة بالاسم ده». [[open 'nope.txt']] = العملية اللي فشلت كانت فتح الملف ده. والمسار نسبي، فاتحسب من الـ working directory اللي شغّلت منه الأمر.

الـ entry point: في مشروع Node غالبًا [[main]] في package.json، وفي Vite بتلاقي [[src/main.tsx]] أو [[src/main.ts]] متنادي من [[index.html]]. جملة صح:
[[The entry point of my app is src/main.tsx, which is loaded by index.html.]]

لو كتبت [[which loaded by]] نسيت [[is]]: الـ passive محتاج [[is + loaded]].`
        },
        {
          cmd: "scope / module / instance",
          title: "كلمات الكود: scope و module و instance و argument و property",
          desc: R`دي الأسماء اللي بتوصف حاجات جوه الكود نفسه. انت عارف معناها في JS، بس المهم تعرف اسمها بالإنجليزي عشان تقرا الـ docs ورسايل الأخطاء وتسأل صح.

[[variable]] متغير، و [[value]] قيمة، و [[type]] نوع، و [[function]] دالة، و [[method]] دالة جوه object أو class، و [[parameter]] الاسم في تعريف الدالة، و [[argument]] القيمة اللي بتبعتها وقت النداء، و [[property]] و [[field]] خاصية في object، و [[key]] المفتاح، و [[object]] و [[array]] و [[string]]، و [[class]] و [[instance]] نسخة من class ([[new User()]])، و [[module]] ملف بيصدّر حاجات، و [[package]] مكتبة على npm، و [[dependency]] مكتبة مشروعك معتمد عليها، و [[scope]] المكان اللي المتغير معروف فيه، و [[callback]] دالة بتتبعت لدالة تانية، و [[return value]] اللي الدالة بترجّعه، و [[side effect]] أثر جانبي (الدالة غيّرت حاجة برّاها).`,
          example: R`parameter     The function takes two parameters: name and age.
argument      Expected 2 arguments, but got 1.
property      Cannot read properties of undefined (reading 'name').
method        The map() method creates a new array.
instance      Each request creates a new instance of the service.
module        Cannot find module 'expresss'.
dependency    Add zod as a dependency.
scope         The variable is not defined in this scope.
callback      The callback is called with (err, data).
return value  The return value is a Promise.
side effect   This function has no side effects.
key           Each child in a list should have a unique "key" prop.`,
          try: R`اقرا الجملة دي بصوت عالي وترجمها بالعربي: [[The map() method of Array instances creates a new array populated with the results of calling a provided function on every element in the calling array.]] (دي أول جملة في MDN لـ map). علّم كل كلمة من القايمة موجودة فيها.`,
          flag: "script",
          deep: {
            why: R`رسايل الأخطاء بتستخدم الكلمات دي بدقة: [[Expected 2 arguments]] مش parameters، و [[Cannot read properties]] مش variables. لو عارف الفرق هتعرف تحدد المشكلة فين بالظبط.`,
            how: R`الفرق اللي بيتسأل في الانترفيو: [[parameter]] في التعريف ([[function greet(name)]] ← name parameter)، و [[argument]] في النداء ([[greet("Sara")]] ← "Sara" argument). كتير من الناس بتخلطهم في الكلام وده مقبول، بس في الكتابة الرسمية الـ docs بتفرّق.

و [[takes]] مع الدوال = بتاخد ([[takes two parameters]])، و [[accepts]] نفس المعنى. و [[populated with]] = متعبّي بـ. و [[provided]] = اللي انت بعته. و [[on every element]] = على كل عنصر.

[[method]] = دالة مربوطة بـ object. و MDN بتكتب [[Array.prototype.map()]] يعني «method موجودة على كل array».`,
            when: "وانت بتقرا MDN أو docs أي مكتبة، ووانت بتسأل سؤال على Stack Overflow أو لزميل.",
            mistakes: R`[[I sent the variable to the function]] مفهومة، بس الأدق [[I passed the value as an argument]]. و [[a dependence]] غلط، الصح [[a dependency]] وجمعها [[dependencies]]. و [[attribute]] في HTML ([[href]] attribute) مش زي [[property]] في JS object. و [[the function takes a callback]] صح، و [[the function takes a callback function as parameter]] محتاجة [[a]]: [[as a parameter]].`
          },
          lines: [
            R`parameter = في التعريف. «الدالة بتاخد باراميترين: name و age».`,
            R`argument = في النداء. رسالة TS الحقيقية: «متوقع ٢ arguments، وجالك ١».`,
            R`property = خاصية. رسالة Node الحقيقية: «مش قادر يقرا خصايص من undefined (وهو بيقرا name)».`,
            R`method = دالة على object. «map() بتعمل array جديد».`,
            R`instance = نسخة. «كل طلب بيعمل نسخة جديدة من الـ service».`,
            R`module = ملف/مكتبة. رسالة Node الحقيقية لما تكتب اسم مكتبة غلط (expresss بـ ٣ s).`,
            R`dependency = مكتبة معتمد عليها. «ضيف zod كـ dependency».`,
            R`scope = نطاق. «المتغير مش متعرّف في النطاق ده».`,
            R`callback = دالة بتتنادى بعدين. «الـ callback بتتنادى بـ (err, data)».`,
            R`return value = اللي بيرجع. «اللي بيرجع Promise».`,
            R`side effect = أثر برّا الدالة. «الدالة دي ملهاش آثار جانبية» (pure).`,
            R`key = مفتاح. تحذير React المشهور: «كل ابن في ليستة لازم يبقى ليه key فريد».`
          ],
          sol: R`الترجمة: «الـ method اللي اسمها map() الموجودة على أي array بتعمل array جديد، متعبّي بنتايج نداء دالة انت بتبعتها، على كل عنصر في الـ array اللي نادينا عليه map».

الكلمات من القايمة: [[method]]، و [[instances]]، و [[array]]، و [[function]]، و [[element]] (عنصر). وكلمات جديدة تضيفها لـ [[words.md]]: [[populated with]] = متعبّي بـ، و [[provided]] = اللي اتبعت، و [[calling array]] = الـ array اللي اتنادى عليه.

لو ترجمتها «الطريقة map تخلق مصفوفة جديدة مأهولة...» ده مش غلط بس مش مفيد: اقرا بمصطلحات المبرمجين زي ما هي (method و array)، وفكّر في الكود: [[const doubled = nums.map(n => n * 2)]].`
        },
        {
          cmd: "request / response / header",
          title: "كلمات الويب: request و payload و endpoint و query و token",
          desc: R`دي كلمات أي API وأي docs لـ backend. [[request]] الطلب، و [[response]] الرد، و [[header]] سطر معلومات فوق الطلب أو الرد، و [[body]] جسم الطلب/الرد، و [[payload]] الداتا المهمة اللي جوه، و [[endpoint]] عنوان محدد في الـ API ([[POST /orders]])، و [[route]] نفس الفكرة من ناحية السيرفر، و [[query string]] الجزء بعد [[?]] في الـ URL، و [[query parameter]] واحد منهم ([[?page=2]])، و [[path parameter]] جزء متغير في المسار ([[/users/:id]])، و [[status code]] الرقم (200 و 404)، و [[token]] قيمة بتثبت انت مين، و [[session]] جلسة، و [[cookie]]، و [[timeout]] أقصى وقت، و [[rate limit]] حد لعدد الطلبات، و [[redirect]] تحويل لعنوان تاني، و [[upstream]] السيرفر اللي ورا.`,
          example: R`request        Each request must include an Authorization header.
response       The response body is JSON.
header         Set the Content-Type header to application/json.
payload        The payload is too large (max 1 MB).
endpoint       The /users endpoint returns a paginated list.
query          Filter the results with the ?status= query parameter.
path param     Replace :id with the order ID.
status code    The server responds with status code 201 Created.
token          The access token expires after 15 minutes.
rate limit     You have exceeded the rate limit. Try again in 60 seconds.
redirect       Unauthenticated users are redirected to /login.
timeout        Set a timeout so the request doesn't hang forever.`,
          try: R`شغّل [[curl -i https://api.github.com/users/octocat]] واقرا أول ١٥ سطر (الـ headers). لكل header اكتب اسمه ومعناه في كلمتين. ركّز على اللي فيهم [[ratelimit]]: فاضلك كام طلب؟ وبيتجدد إمتى؟`,
          flag: "script",
          deep: {
            why: "الـ API docs مكتوبة بالكلمات دي بالظبط: «ابعت الـ token في الـ header، والـ payload في الـ body، وهترجعلك 201». ولو فاهمهم، هتقرا صفحة endpoint كاملة في دقيقة.",
            how: R`في أي صفحة API هتلاقي نفس الترتيب: الـ [[method]] والـ [[endpoint]]، وبعدين [[Parameters]] مقسومة ([[path]] و [[query]] و [[body]])، وبعدين [[Headers]]، وبعدين [[Responses]] بالـ status codes، وأمثلة.

كلمات مهمة جنبهم: [[paginated]] = مقسوم صفحات، و [[exceeded]] = عدّيت الحد، و [[include]] = لازم يبقى جوه، و [[hang]] = يفضل معلّق من غير رد، و [[forever]] = للأبد.

و [[Too Many Requests]] (429) و [[Payload Too Large]] (413) أسماء الـ status codes نفسها جمل إنجليزي مفهومة: اقراها زي ما هي.`,
            when: "وانت بتقرا docs أي API (Stripe و GitHub و أي API في شغلك)، ووانت بتكتب docs للـ API بتاعك.",
            mistakes: R`[[I sent a request for the API]] الصح [[I sent a request to the API]]. و [[the response is come]] الصح [[the response came back]] أو [[I got a response]]. و [[the header of the request]] مقبولة بس [[the request headers]] أطبع. و [[params]] اختصار parameters وبتتقال عادي في الكلام.`
          },
          lines: [
            R`request + must include = كل طلب لازم يبقى فيه header اسمه Authorization.`,
            R`response body = جسم الرد. «جسم الرد JSON».`,
            R`header = سطر معلومات. «خلّي Content-Type يبقى application/json».`,
            R`payload too large = الداتا أكبر من المسموح (413). max = الحد الأقصى.`,
            R`endpoint + paginated = الـ endpoint ده بيرجّع ليستة مقسومة صفحات.`,
            R`query parameter = بعد ?. «فلتر النتايج بـ ?status=».`,
            R`path parameter = جزء في المسار. «حط رقم الأوردر مكان :id».`,
            R`status code = الرقم. «السيرفر بيرد بـ 201 Created» (اتعمل).`,
            R`token + expires after = الـ token بيخلص بعد ١٥ دقيقة.`,
            R`rate limit + exceeded = عدّيت الحد. رسالة 429 نموذجية.`,
            R`redirected to = اتحوّل لـ. «اللي مش مسجّلين بيتحوّلوا لـ /login».`,
            R`timeout + hang = حط أقصى وقت عشان الطلب ميفضلش معلّق للأبد. so = عشان.`
          ],
          sol: R`هتلاقي headers زي (الأرقام بتتغير):
[[HTTP/2 200]] ← الطلب نجح.
[[content-type: application/json; charset=utf-8]] ← الرد JSON بترميز utf-8.
[[cache-control: public, max-age=60, s-maxage=60]] ← ممكن يتخزن ٦٠ ثانية.
[[x-ratelimit-limit: 60]] ← مسموحلك ٦٠ طلب (من غير token، في الساعة).
[[x-ratelimit-remaining: 59]] ← فاضلك ٥٩.
[[x-ratelimit-reset: 17...]] ← الوقت اللي العداد هيتصفّر فيه، بصيغة Unix timestamp (ثواني من ١٩٧٠).
[[x-ratelimit-used: 1]] ← استخدمت ١.

جملة تكتبها في issue لو اتقفلت: [[I exceeded the unauthenticated rate limit (60 requests per hour); I will use a token.]]

لو مش فاهم [[reset]] هنا: مش «ارجع للأول» بالظبط، هي «امتى العداد هيبدأ من جديد».`
        },
        {
          cmd: "if / unless / instead of",
          title: "الكلمات الصغيرة اللي بتقلب المعنى: unless و otherwise و at least و e.g.",
          desc: R`دي أخطر مجموعة، لأنها صغيرة ومش بتاخد بالك منها، وبتقلب معنى الجملة كلها. جملة زي [[Do not use this in production unless you know what you are doing]] لو فوّت [[unless]] هتفهمها عكس.

الشروط: [[if]] لو، و [[unless]] إلا لو (= if not)، و [[whether]] سواء/هل، و [[only if]] بس لو، و [[even if]] حتى لو، و [[otherwise]] وإلا/غير كده، و [[as long as]] طول ما.
الوقت: [[before]] و [[after]] و [[until]] لحد، و [[once]] أول ما، و [[while]] طول ما، و [[as soon as]] أول ما.
البدائل: [[instead of]] بدل، و [[rather than]] بدل، و [[either ... or]] يا ده يا ده، و [[neither ... nor]] لا ده ولا ده.
الكمية: [[at least]] على الأقل، و [[at most]] على الأكتر، و [[up to]] لحد، و [[per]] لكل، و [[within]] خلال/جوه.
اختصارات: [[e.g.]] مثلًا، و [[i.e.]] يعني بالظبط، و [[etc.]] إلخ، و [[vs.]] مقابل، و [[via]] عن طريق، و [[respectively]] بالترتيب.`,
          example: R`unless         The cache is used unless you pass --no-cache.
only if        The hook runs only if the file has changed.
even if        fetch() resolves even if the server returns 404.
otherwise      Use a token; otherwise, requests are limited to 60 per hour.
until          The button stays disabled until the upload finishes.
once           Once the build is done, the app is deployed automatically.
instead of     Use const instead of let when the value never changes.
at least       The password must be at least 8 characters long.
at most        A page can contain at most 100 items.
within         The link expires within 24 hours.
e.g. / i.e.    Use a package manager (e.g. npm or pnpm), i.e. never copy files by hand.
respectively   The defaults are 3000 and 5432, respectively.`,
          try: R`اكتب «عكس» كل جملة من الـ example بتغيير الكلمة الصغيرة بس (مثلًا [[unless]] ← [[only if]]، و [[at least]] ← [[at most]]). وبعدين ترجم الجملتين (الأصلية والمعكوسة) بالعربي عشان تحس إن كلمة واحدة قلبت المعنى.`,
          flag: "script",
          deep: {
            why: R`معظم الـ bugs اللي سببها «قريت الـ docs غلط» جاية من الكلمات دي: [[at least]] و [[at most]]، أو [[unless]]، أو [[even if]]. الـ docs الكويسة بتحط كل الشروط المهمة في كلمة واحدة زي دي.`,
            how: R`طريقة القراية: لما تشوف جملة فيها شرط، اقسمها نصين عند الكلمة الصغيرة، واقرا كل نص لوحده، وبعدين اربطهم بمعنى الكلمة.

[[unless]] = [[if not]]. فـ [[The cache is used unless you pass --no-cache]] = [[If you don't pass --no-cache, the cache is used]].

[[respectively]] بتربط ليستتين بالترتيب: [[The defaults for the app and the database are 3000 and 5432, respectively]] = الـ app على 3000 والداتابيز على 5432.

[[e.g.]] (exempli gratia) = مثلًا، فيه غيرهم. [[i.e.]] (id est) = يعني بالظبط، مفيش غيره. وده غلط شائع حتى عند الأجانب.

و [[once]] ليها معنيين: «مرة واحدة» ([[runs once]]) و «أول ما» ([[once the build is done]]). لو بعدها جملة فيها فعل يبقى «أول ما».`,
            when: "في أي جملة docs فيها شرط أو رقم أو قيد، وخصوصًا جمل الأمان والإعدادات والـ validation.",
            mistakes: R`[[at least 8 characters]] بتتفهم «٨ بالظبط»، والصح «٨ أو أكتر». و [[e.g.]] و [[i.e.]] بيتبدّلوا. و [[until now]] بتتكتب بمعنى «لحد دلوقتي لسه» في جملة زي [[Until now I didn't find the bug]]، والأطبع [[I still haven't found the bug]] أو [[So far, I haven't found it]]. و [[instead of to use]] غلط، بعد [[instead of]] الفعل بـ ing: [[instead of using]].`
          },
          lines: [
            R`unless = إلا لو. «الـ cache شغال إلا لو بعت --no-cache».`,
            R`only if = بس لو. «الـ hook بيشتغل بس لو الملف اتغير».`,
            R`even if = حتى لو. «fetch بتخلص بنجاح حتى لو السيرفر رجّع 404». ودي حقيقة مهمة.`,
            R`otherwise = وإلا. «استخدم token، وإلا هتتحدد بـ ٦٠ طلب في الساعة».`,
            R`until = لحد. «الزرار يفضل مقفول لحد ما الرفع يخلص».`,
            R`once + جملة = أول ما. «أول ما الـ build يخلص، التطبيق بيتنشر لوحده».`,
            R`instead of = بدل. «استخدم const بدل let لما القيمة مبتتغيرش».`,
            R`at least = على الأقل. «الباسورد لازم ٨ حروف أو أكتر».`,
            R`at most = على الأكتر. «الصفحة فيها ١٠٠ عنصر كحد أقصى».`,
            R`within = خلال. «الرابط بيخلص خلال ٢٤ ساعة».`,
            R`e.g. = مثلًا (فيه غيرهم)، i.e. = يعني بالظبط. «استخدم package manager (زي npm أو pnpm)، يعني متنسخش ملفات بإيدك أبدًا».`,
            R`respectively = بالترتيب. «القيم الافتراضية 3000 و 5432، بالترتيب» (يعني لحاجتين اتذكروا قبلها).`
          ],
          sol: R`أمثلة للعكس:
[[The cache is used only if you pass --cache.]] ← «الـ cache شغال بس لو بعت --cache» (عكس الأصل تمامًا).
[[fetch() rejects if the server returns 404.]] ← دي جملة غلط في الحقيقة! والأصلية ([[resolves even if]]) هي الصح. شايف إزاي كلمة واحدة بتفرق بين فهم صح و bug؟
[[The password must be at most 8 characters long.]] ← «٨ حروف كحد أقصى»، وده عكس المطلوب تمامًا.
[[Use let instead of const when the value changes.]] ← صح وبمعنى مختلف.

لو في جملة [[once]] فهمتها «مرة واحدة»، راجع القاعدة: بعدها [[the build is done]] (جملة فيها فعل)، يبقى «أول ما».`
        }
      ]
    },
    {
      t: "تقرا رسالة الخطأ كلمة كلمة",
      l: 1,
      n: "رسايل حقيقية من Node و npm و git و TypeScript و PostgreSQL و Python، اتشغّلت فعلًا، ومتفككة كلمة كلمة ومعاها تعمل إيه",
      items: [
        {
          cmd: "شكل رسالة الخطأ",
          title: "رسالة الخطأ متقسمة إزاي، وتبدأ تقرا منين؟",
          desc: R`أول قاعدة: متخافش من طول الرسالة. أغلب الرسايل الطويلة سطر واحد مهم والباقي تفاصيل. وأغلب الناس اللي إنجليزيتهم ضعيفة بيشوفوا الأحمر فيقفلوا ويسألوا، مع إن الحل مكتوب في الرسالة نفسها.

أي رسالة خطأ تقريبًا فيها الأجزاء دي: [[نوع الخطأ]] ([[TypeError]] و [[SyntaxError]] و [[ENOENT]] و [[TS2322]])، و [[الرسالة]] جملة قصيرة بتقول إيه اللي حصل، و [[المكان]] ملف وسطر وعمود ([[a.ts(1,7)]] أو [[at index.js:12:5]])، و [[stack trace]] مين نادى مين لحد ما الخطأ حصل، وساعات [[hint]] أو [[Did you mean]] = اقتراح للحل، و [[code]] كود ثابت تدوّر بيه.

طريقة القراية: ١) دوّر على أول سطر فيه [[Error]] أو [[error]] أو [[fatal]] أو [[ERROR]]. ٢) اقرا الجملة دي بس، وقسّمها: مين؟ حصله إيه؟ ٣) شوف المكان: ملف وسطر من كودك انت (مش node_modules). ٤) اقرا أي سطر فيه [[hint]] أو [[Did you mean]] أو [[try]] أو [[run]]: ده الحل غالبًا. ٥) لو لسه مش فاهم، انسخ الجملة الأساسية بس (من غير أسماء ملفاتك) ودوّر بيها.`,
          example: R`node app.js
/home/sara/app/app.js:3
console.log(user.name);
                 ^
TypeError: Cannot read properties of undefined (reading 'name')
    at Object.<anonymous> (/home/sara/app/app.js:3:18)
    at Module._compile (node:internal/modules/cjs/loader:1705:14)
    at Object..js (node:internal/modules/cjs/loader:1838:10)
Node.js v22.22.2`,
          try: R`اكتب ملف [[app.js]] فيه [[const user = undefined;]] وفي السطر اللي بعده [[console.log(user.name);]] وشغّله بـ [[node app.js]]. طبّق الخطوات الخمسة: اكتب في [[errors.md]] نوع الخطأ، والجملة بالعربي، والملف والسطر والعمود، وأنهي سطور من الـ stack trace كودك وأنهي كود Node نفسه.`,
          flag: "script",
          deep: {
            why: "مهارة قراية الخطأ أهم من أي حاجة في التاب ده، لأنها بتوفر ساعات كل أسبوع. والرسايل مكتوبة بإنجليزي بسيط جدًا ومتكرر: حوالي ٥٠ جملة بتغطي أغلب اللي هتشوفه في سنتك الأولى.",
            how: R`الـ stack trace بيتقري من فوق لتحت: أول سطر [[at ...]] هو المكان اللي الخطأ حصل فيه فعلًا، واللي تحته اللي ناداه، وهكذا. السطور اللي فيها [[node:internal]] أو [[node_modules]] مش كودك، عدّيها ودوّر على أول سطر فيه ملف من مشروعك.

والـ [[^]] (caret) تحت السطر بيشاور على العمود بالظبط. و [[(reading 'name')]] بتقولك إيه اللي كان بيتقري وقت ما وقع.

الأرقام [[3:18]] = سطر ٣، عمود ١٨. في VS Code تقدر تعمل Ctrl+Click على المسار في الـ terminal ويفتحلك السطر على طول.

وقاعدة عامة لكل الأدوات: [[error]] = وقف، [[warning]] أو [[warn]] = اشتغل بس فيه حاجة غلط أو هتبوظ بعدين، [[fatal]] = خطأ وقّف البرنامج كله، [[note]] أو [[hint]] أو [[info]] = معلومة إضافية.`,
            when: "كل مرة تشوف أحمر. قبل ما تسأل حد أو AI، اكتب الجملة بالعربي بنفسك الأول، ده لوحده بيحل نص المشاكل.",
            mistakes: R`تنسخ الرسالة كلها بأسماء ملفاتك وتدوّر بيها فمتلاقيش حاجة: دوّر بالجملة الأساسية بس. وتقرا آخر سطر في الـ terminal بدل أول سطر خطأ: في npm مثلًا آخر سطر دايمًا [[A complete log of this run can be found in]] ودي مش المشكلة. وتفتكر إن المشكلة في node_modules لأن الـ stack فيه أسماءها: غالبًا انت اللي بعت قيمة غلط لمكتبة.`
          },
          lines: [
            "الأمر اللي شغّلته.",
            "الملف ورقم السطر اللي فيه المشكلة (٣).",
            "السطر نفسه من كودك.",
            R`الـ [[^]] بيشاور على المكان بالظبط: عند [[.name]].`,
            R`أهم سطر: النوع TypeError، والجملة «مش قادر يقرا خصايص من undefined، وهو بيقرا name». يعني [[user]] قيمته undefined.`,
            R`أول سطر [[at]]: كودك انت، ملف app.js سطر ٣ عمود ١٨. هنا تبص.`,
            R`[[node:internal]] = كود Node نفسه. عدّيه.`,
            "برضه كود Node داخلي. عدّيه.",
            "إصدار Node، مفيد لما تسأل أو تكتب bug report."
          ],
          sol: R`الشكل المتوقع في [[errors.md]]:

[[TypeError: Cannot read properties of undefined (reading 'name')]]
النوع: TypeError (استخدمت قيمة بطريقة مينفعش مع نوعها).
بالعربي: «حاولت تقرا [[name]] من حاجة قيمتها undefined».
المكان: [[app.js:2:18]] (سطر ٢ لو الملف فيه سطرين بس، والعمود بتاع [[.name]]).
كودي: أول سطر [[at Object.<anonymous> (.../app.js:2:18)]]. كود Node: كل اللي فيه [[node:internal]].
الحل: اتأكد إن [[user]] ليه قيمة قبل ما تقرا منه، أو استخدم [[user?.name]].

(أرقام السطور الداخلية زي [[loader:1705]] بتختلف من إصدار Node للتاني، ومش مهمة.)`
        },
        {
          cmd: "أخطاء Node و JS",
          title: "٨ رسايل Node حقيقية: Cannot read properties و is not defined و EADDRINUSE",
          desc: R`دي رسايل اتشغّلت فعلًا على Node 22 (سبتمبر ٢٠٢٦). كل واحدة جملة إنجليزي بسيطة لو قسمتها. احفظ «الهيكل» مش النص بالظبط، لأن الصياغة ممكن تتغير شوية بين الإصدارات.

الكلمات المفتاحية: [[not defined]] = مش متعرّف (مفيش متغير بالاسم ده)، و [[is not a function]] = انت بتنادي حاجة مش دالة، و [[Assignment to constant variable]] = بتحط قيمة في const، و [[Cannot find module]] = مش لاقي المكتبة أو الملف، و [[EADDRINUSE]] = Error ADDRess IN USE، و [[ECONNREFUSED]] = CONNection REFUSED (مفيش حد بيسمع على البورت ده)، و [[is not valid JSON]] = النص مش JSON.`,
          example: R`ReferenceError: foo is not defined
TypeError: f is not a function
TypeError: Assignment to constant variable.
TypeError: Cannot read properties of null (reading 'map')
Error: Cannot find module 'expresss'
SyntaxError: Unexpected token '<', "<!DOCTYPE html>" is not valid JSON
Error: listen EADDRINUSE: address already in use 0.0.0.0:3000
TypeError: fetch failed  [cause]: Error: connect ECONNREFUSED 127.0.0.1:5999`,
          try: R`اتسبب في كل خطأ من دول بنفسك بسطر [[node -e '...']] (مثلًا [[node -e 'foo()']] و [[node -e 'const x=1; x=2']] و [[node -e 'require("expresss")']]). ولكل واحد اكتب في [[errors.md]]: الجملة بالعربي، وسببها عندك، والحل في سطر.`,
          flag: "script",
          deep: {
            why: "الـ ٨ دول لوحدهم هتقابلهم تقريبًا كل أسبوع في سنتك الأولى. لو اتعودت تقراهم هتحلهم في ثواني بدل ما تدوّر.",
            how: R`حلول سريعة:
[[foo is not defined]] ← غلطة في الاسم، أو نسيت import، أو المتغير في scope تاني.
[[f is not a function]] ← القيمة مش دالة: نسيت تعمل export، أو import default بدل named، أو اسم property غلط.
[[Assignment to constant variable]] ← غيّر [[const]] لـ [[let]] أو متعدّلش القيمة.
[[Cannot read properties of null (reading 'map')]] ← الداتا لسه null (غالبًا لسه بتحمّل): استخدم [[data?.map]] أو قيمة أولية [[[]]].
[[Cannot find module 'expresss']] ← اسم غلط (٣ s)، أو مش متسطّبة: [[npm i express]].
[[Unexpected token '<' ... is not valid JSON]] ← السيرفر رجّع صفحة HTML (غالبًا 404 أو صفحة خطأ) وانت عامل [[res.json()]]. اطبع [[res.status]] و [[await res.text()]].
[[EADDRINUSE ... :::3000]] ← فيه برنامج تاني ماسك البورت ٣٠٠٠ (غالبًا نسخة قديمة من سيرفرك). اقفله أو غيّر البورت. ([[:::]] معناها كل العناوين في IPv6.)
[[fetch failed ... ECONNREFUSED 127.0.0.1:5999]] ← مفيش سيرفر شغال على البورت ده. شغّله أو صلّح الـ URL. لاحظ إن السبب الحقيقي في [[cause]] مش في [[fetch failed]].`,
            when: "كل ما Node يوقع. واعمل الـ try ده مرة واحدة كتمرين: لما تتسبب في الخطأ بنفسك بتفهمه أحسن بكتير.",
            mistakes: R`تقرا [[fetch failed]] وتقف: دي رسالة عامة، والسبب الحقيقي في [[cause]] تحتها. وتفتكر إن [[not defined]] و [[undefined]] نفس الحاجة: [[not defined]] = مفيش متغير أصلًا (ReferenceError)، و [[undefined]] = المتغير موجود بس ملوش قيمة. ودي بتتسأل في الانترفيو.`
          },
          lines: [
            R`ReferenceError + not defined = «مفيش حاجة اسمها foo». اسم غلط أو ناقص import.`,
            R`is not a function = «f مش دالة» وانت بتناديها بـ ().`,
            R`Assignment to constant = «بتحط قيمة في متغير const».`,
            R`of null = القيمة null، وكنت بتنادي map عليها. الداتا لسه مجتش.`,
            R`Cannot find module = «مش لاقي المكتبة». بص على الإملاء (expresss).`,
            R`«الحرف < مش متوقع، والنص ده مش JSON». استلمت HTML بدل JSON.`,
            R`listen + address already in use = «العنوان/البورت مستخدم خلاص». حد تاني ماسك 3000. على جهاز فيه IPv6 هتشوفها [[:::3000]] بدل [[0.0.0.0:3000]].`,
            R`fetch failed وسببها [[cause]]: الاتصال اترفض، مفيش حد بيسمع على 5999. في الحقيقة دول سطرين بينهم stack trace، وجمعناهم هنا في سطر.`
          ],
          sol: R`اللي هيطلعلك (Node 22.22):
[[node -e 'foo()']] ← [[ReferenceError: foo is not defined]]. «مفيش حاجة اسمها foo». الحل: عرّفها أو صلّح الاسم.
[[node -e 'const x=1; x=2']] ← [[TypeError: Assignment to constant variable.]] الحل: [[let]].
[[node -e 'require("expresss")']] ← [[Error: Cannot find module 'expresss']] ومعاها [[code: 'MODULE_NOT_FOUND']] و [[requireStack]]. الحل: صلّح الاسم لـ express وسطّبه.
[[node -e 'JSON.parse("<!DOCTYPE html>")']] ← الرسالة اللي فوق بالظبط.

ورسالة EADDRINUSE شكلها عندك ممكن يبقى [[listen EADDRINUSE: address already in use :::3000]] أو بعنوان [[0.0.0.0]] حسب إنت عامل listen على إيه. الجملة المهمة [[address already in use]] ثابتة.

لو الناتج مختلف شوية في الصياغة (إصدار Node تاني)، مفيش مشكلة: الكلمات المفتاحية هي هي.`
        },
        {
          cmd: "أخطاء npm",
          title: "رسايل npm: E404 و Missing script و ERESOLVE و deprecated",
          desc: R`npm بيحب يطبع كتير، وكل سطر بيبدأ بـ [[npm error]] أو [[npm warn]]. القاعدة: اقرا سطر [[npm error code]] الأول (الكود)، وبعدين أول ٣ سطور بعده. وآخر سطر [[A complete log of this run can be found in]] مجرد مكان ملف اللوج، مش المشكلة.

الأكواد اللي هتشوفها: [[E404]] الباكدج مش موجودة في الـ registry (غالبًا اسم غلط)، و [[ENOENT]] ملف مش موجود (غالبًا مفيش package.json في الفولدر ده)، و [[Missing script]] مفيش script بالاسم ده في package.json، و [[ERESOLVE]] تعارض في الإصدارات بين المكتبات (peer dependencies)، و [[EACCES]] مفيش صلاحية (متستخدمش sudo، صلّح الصلاحيات)، و [[npm warn deprecated]] تحذير إن مكتبة قديمة.`,
          example: R`npm error code E404
npm error 404 'this-package-does-not-exist-xyz-123@*' is not in this registry.
npm error enoent Could not read package.json: Error: ENOENT: no such file or directory
npm error Missing script: "startt"
npm error Did you mean one of these?
npm error   npm start # Start a package
npm error ERESOLVE unable to resolve dependency tree
npm error Could not resolve dependency:
npm error peer react@"17.0.2" from react-dom@17.0.2
npm error Fix the upstream dependency conflict, or retry
npm error this command with --force or --legacy-peer-deps
npm error to accept an incorrect (and potentially broken) dependency resolution.`,
          try: R`في فولدر تجربة فاضي: شغّل [[npm run start]] (من غير package.json)، وبعدين [[npm init -y]] وشغّل [[npm run startt]]، وبعدين [[npm i react@19 react-dom@17]]. لكل واحد اكتب الكود والجملة المهمة بالعربي والحل. وامسح الفولدر بعدها.`,
          flag: "script",
          deep: {
            why: R`npm بيطلع أخطاء طويلة ومخيفة، ونص المبتدئين بيحلوها بـ [[--force]] أو بمسح node_modules من غير ما يفهموا. قراية ERESOLVE صح بتقولك بالظبط مين متعارض مع مين.`,
            how: R`فك ERESOLVE: [[Found: react@19.3.0]] = اللي عندك. [[Could not resolve dependency: peer react@"17.0.2" from react-dom@17.0.2]] = react-dom 17 عايز (peer) react 17 بالظبط. يعني المشكلة: react-dom قديم على react جديد. الحل الصح: خلّي الاتنين نفس الإصدار ([[npm i react@19 react-dom@19]]).

والرسالة نفسها بتقترح [[--force]] أو [[--legacy-peer-deps]]، بس اقرا الباقي: [[to accept an incorrect (and potentially broken) dependency resolution]] = «عشان تقبل حل غلط (وممكن يكون بايظ)». يعني npm بنفسه بيقولك الاقتراح ده خطر. [[potentially]] = احتمال.

و [[upstream]] هنا = المكتبة اللي انت معتمد عليها (مش كودك).

و [[Did you mean one of these?]] = «تقصد واحدة من دول؟»، وبعدها الاقتراحات. ده في npm و git والـ CLI عمومًا.`,
            when: R`أي [[npm install]] أو [[npm run]] بيفشل. اقرا [[npm error code]] الأول.`,
            mistakes: R`تحط [[--force]] أو [[--legacy-peer-deps]] على طول لأن npm اقترحها: بتخبّي المشكلة وتطلعلك بعدين في runtime. وتقرا آخر سطر (مكان اللوج) وتفتكره المشكلة. وتستخدم [[sudo npm i -g]] لما تشوف EACCES: بيعمل مشاكل صلاحيات أكبر (استخدم nvm).`
          },
          lines: [
            R`الكود: E404 = مش موجود.`,
            R`«الباكدج دي مش موجودة في الـ registry». [[@*]] = أي إصدار. الحل: صلّح الاسم.`,
            R`enoent + Could not read package.json = مفيش package.json هنا. انت في الفولدر الغلط.`,
            R`Missing script = «مفيش script اسمه startt». غلطة كتابة.`,
            R`«تقصد واحد من دول؟»`,
            R`الاقتراح الصح: [[npm start]]. (الـ # وبعدها وصف الأمر.)`,
            R`ERESOLVE = «مش قادر يحل شجرة الـ dependencies». فيه تعارض.`,
            R`«مش قادر يحل dependency:» والسطر الجاي بيقول مين.`,
            R`peer = react-dom 17.0.2 عايز react 17.0.2 بالظبط، وانت عندك غيره.`,
            R`«صلّح التعارض في المكتبات، أو أعد الأمر بـ --force أو --legacy-peer-deps»`,
            "تكملة الجملة اللي فوق.",
            R`«عشان تقبل حل غلط وممكن يكون بايظ». يعني الاقتراح ده خطر، والحل الصح توحّد الإصدارات.`
          ],
          sol: R`اللي هيطلعلك (npm 10.9، سبتمبر ٢٠٢٦):

[[npm run start]] من غير package.json ← [[npm error code ENOENT]] و [[Could not read package.json: Error: ENOENT: no such file or directory, open '.../package.json']]. بالعربي: «مش لاقي package.json». الحل: [[cd]] للفولدر الصح أو [[npm init -y]].

[[npm run startt]] ← [[npm error Missing script: "startt"]] وبعدها [[Did you mean one of these?]] وفيها اقتراحات زي [[npm star]] و [[npm start]]. الحل: [[npm start]] أو صلّح الاسم في package.json.

[[npm i react@19 react-dom@17]] ← ERESOLVE: [[Found: react@19.3.0]] ثم [[peer react@"17.0.2" from react-dom@17.0.2]]. الحل: [[npm i react@19 react-dom@19]]، مش [[--force]]. (رقم إصدار react 19 عندك ممكن يبقى مختلف.)`
        },
        {
          cmd: "أخطاء git",
          title: "رسايل git: pathspec و rejected و CONFLICT و Please tell me who you are",
          desc: R`git بيكتب بثلاث مستويات: [[fatal:]] وقف خالص، و [[error:]] العملية فشلت، و [[hint:]] نصيحة للحل (اقراها دايمًا!). وكتير من رسايل git فيها الحل مكتوب حرفيًا، زي [[use "git add" to track]] أو [[Run git config --global user.email]].

كلمات git المهمة: [[track]] يتابع ملف، و [[staged]] جاهز للـ commit، و [[pathspec]] اسم ملف أو مسار انت كتبته، و [[ref]] و [[refspec]] اسم branch أو tag، و [[remote]] الـ repo اللي برا (GitHub)، و [[upstream]] و [[tracking information]] الـ branch اللي برا المربوط بالـ branch بتاعك، و [[fast-forward]] دمج من غير commit جديد، و [[unrelated histories]] تاريخين ملهمش أصل مشترك، و [[detached HEAD]] انت واقف على commit مش على branch.`,
          example: R`nothing to commit (create/copy files and use "git add" to track)
error: pathspec 'nobranch' did not match any file(s) known to git
fatal: not a git repository (or any of the parent directories): .git
*** Please tell me who you are.
! [rejected]        HEAD -> master (fetch first)
hint: Updates were rejected because the remote contains work that you do not
hint: have locally.
CONFLICT (content): Merge conflict in f
Automatic merge failed; fix conflicts and then commit the result.
There is no tracking information for the current branch.
fatal: refusing to merge unrelated histories
fatal: cannot switch branch while merging`,
          try: R`في فولدر تجربة: [[git init]]، وبعدين [[git commit -m x]] (من غير ملفات)، وبعدين [[git checkout nobranch]]، وبعدين اعمل branch وعدّل نفس السطر في ملف على الـ branch وعلى main واعمل merge. لكل رسالة اكتب الجملة المهمة بالعربي والأمر اللي يحلها.`,
          flag: "script",
          deep: {
            why: R`git من أكتر الأدوات اللي المبتدئ بيخاف منها، ونص الخوف ده من الرسايل. بس رسايل git من أوضح الرسايل: غالبًا فيها [[hint:]] بتقولك تعمل إيه بالظبط.`,
            how: R`الحلول:
[[nothing to commit ... use "git add" to track]] ← مفيش تغييرات متضافة. [[git add]] الأول.
[[pathspec 'nobranch' did not match]] ← مفيش branch أو ملف بالاسم ده. [[git branch -a]] وشوف الأسماء.
[[not a git repository]] ← انت مش جوه repo. [[cd]] للفولدر الصح.
[[Please tell me who you are]] ← git مش عارف اسمك وإيميلك، والرسالة نفسها فيها الأمرين: [[git config --global user.email ...]] و [[user.name]].
[[rejected ... (fetch first)]] + [[the remote contains work that you do not have locally]] ← حد عمل push قبلك. [[git pull]] (أو [[git pull --rebase]]) وبعدين push.
[[CONFLICT (content): Merge conflict in f]] ← نفس السطر اتغير في الناحيتين. افتح الملف، اختار، [[git add]]، [[git commit]].
[[no tracking information]] ← الـ branch مش مربوط بـ branch برا. [[git push -u origin main]] أو [[git branch --set-upstream-to]].
[[refusing to merge unrelated histories]] ← غالبًا عملت repo على GitHub فيه README وrepo محلي منفصل. فكّر كويس قبل [[--allow-unrelated-histories]].
[[cannot switch branch while merging]] ← كمّل الـ merge أو [[git merge --abort]].

والكلمات: [[contains]] = فيه، و [[locally]] = عندك على جهازك، و [[refusing]] = رافض، و [[while]] = وانت في النص.`,
            when: "أي أمر git فشل. اقرا hint قبل ما تدوّر. والتفاصيل التقنية لكل أمر في «تاب Git».",
            mistakes: R`تحل [[rejected]] بـ [[git push --force]]: كده بتمسح شغل زميلك. الـ hint قالك [[git pull]] مش force. وتتجاهل [[hint:]] لأنها «مش error». وتفهم [[fetch first]] «هات الأول» فتعمل [[git fetch]] بس وتنسى تدمج.`
          },
          lines: [
            R`«مفيش حاجة تتعمل commit (اعمل ملفات واستخدم git add عشان git يتابعها)». الحل مكتوب.`,
            R`pathspec = الاسم اللي كتبته. «مطابقش أي ملف أو branch git يعرفه».`,
            R`fatal = وقف. «ده مش repo (ولا أي فولدر فوقه)». انت في المكان الغلط.`,
            R`«قولّي انت مين». git محتاج user.name و user.email، والأوامر مكتوبة تحتها في الرسالة الكاملة.`,
            R`rejected = اترفض. «fetch first» = هات التغييرات اللي برا الأول.`,
            R`hint: «التحديثات اترفضت لأن الـ remote فيه شغل مش عندك»...`,
            R`«... على جهازك». الحل اللي الـ hint بيقوله بعدها: git pull قبل الـ push.`,
            R`CONFLICT = تعارض في محتوى ملف f.`,
            R`«الدمج الأوتوماتيك فشل؛ صلّح التعارضات وبعدين اعمل commit للنتيجة».`,
            R`«مفيش tracking information»: الـ branch بتاعك مش مربوط بـ branch على الـ remote.`,
            R`«رافض يدمج تاريخين ملهمش علاقة ببعض».`,
            R`«مينفعش تغيّر الـ branch وانت في نص merge».`
          ],
          sol: R`اللي هيطلعلك (git 2.43):
[[git commit -m x]] من غير ملفات ← [[nothing to commit (create/copy files and use "git add" to track)]]. الحل: اعمل ملف و [[git add]].
[[git checkout nobranch]] ← [[error: pathspec 'nobranch' did not match any file(s) known to git]]. الحل: [[git branch]] وشوف الاسم الصح، أو [[git switch -c nobranch]] لو عايز تعمله.
الـ merge ← [[CONFLICT (content): Merge conflict in f]] و [[Automatic merge failed; fix conflicts and then commit the result.]] الحل: افتح f، هتلاقي [[<<<<<<<]] و [[=======]] و [[>>>>>>>]]، سيب السطر الصح، وبعدين [[git add f]] و [[git commit]]. أو [[git merge --abort]] ترجع زي ما كنت.

ولو git قالك [[Author identity unknown]] و [[*** Please tell me who you are.]] وانت بتعمل commit، يبقى محتاج [[git config --global user.name]] و [[user.email]] زي ما الرسالة كاتبة بالظبط.`
        },
        {
          cmd: "أخطاء TypeScript",
          title: "رسايل TypeScript: is not assignable و possibly undefined و does not exist on type",
          desc: R`رسايل TS شكلها واحد: [[file.ts(line,col): error TSxxxx: message]]. الرقم [[TS2322]] ثابت وتقدر تدوّر بيه. والرسايل بتستخدم كام كلمة بتتكرر: [[assignable to]] = ينفع يتحط مكان، و [[possibly]] = ممكن يبقى، و [[implicitly]] = ضمنيًا (من غير ما تكتب)، و [[does not exist on type]] = مش موجود في النوع ده، و [[Expected ... but got ...]] = كان متوقع كذا وجالي كذا، و [[Object literal may only specify known properties]] = الـ object اللي كاتبه بإيدك فيه خاصية مش في النوع، و [[corresponding type declarations]] = ملف الأنواع المقابل.

دي ٨ رسايل حقيقية اتطلعت من [[tsc --noEmit --strict]] (TypeScript 6 و 7، والناتج واحد في الاتنين).`,
          example: R`a.ts(1,7): error TS2322: Type 'string' is not assignable to type 'number'.
a.ts(3,33): error TS2353: Object literal may only specify known properties, and 'age' does not exist in type 'User'.
a.ts(4,30): error TS18048: 'u.email' is possibly 'undefined'.
a.ts(6,19): error TS2307: Cannot find module 'zodd' or its corresponding type declarations.
a.ts(7,12): error TS7006: Parameter 'a' implicitly has an 'any' type.
a.ts(8,29): error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
a.ts(9,1): error TS2554: Expected 1 arguments, but got 0.
a.ts(10,3): error TS2339: Property 'nmae' does not exist on type 'User'.`,
          try: R`اكتب ملف [[a.ts]] فيه ٨ سطور بتعمل الأخطاء دي (مثلًا [[const n: number = "5";]] للأول)، وشغّل [[npx tsc --noEmit --strict a.ts]]. ولكل خطأ اكتب الجملة بالعربي بطريقة «مين، حصله إيه، ليه»، والحل.`,
          flag: "script",
          deep: {
            why: "TS بيطلّع أخطاء أكتر من أي أداة تانية، وكلها بنفس الـ ١٠ كلمات تقريبًا. لو اتعودت عليهم هتلاقي TS بيكلمك بوضوح بدل ما يبان بيزعقلك.",
            how: R`اقرا [[X is not assignable to Y]] كده: «X مينفعش يتحط مكان محتاج Y». الترتيب مهم: الأول اللي عندك، والتاني اللي مطلوب.

[[possibly 'undefined']] = «ممكن يبقى undefined» ← لازم تفحص الأول ([[if (u.email)]]) أو [[u.email?.toLowerCase()]].
[[implicitly has an 'any' type]] = «نوعه any ضمنيًا لأنك مكتبتلوش نوع» ← اكتب النوع.
[[Cannot find module 'zodd' or its corresponding type declarations]] ← الاسم غلط أو المكتبة مش متسطبة، أو مفيش ملف أنواع ليها ([[@types/...]]).
[[Expected 1 arguments, but got 0]] ← لاحظ إن TS نفسه كاتب [[1 arguments]] بالجمع، وده مش صح في الـ grammar بس ده النص الحقيقي. متتعلمش الـ grammar من رسايل الأخطاء!
[[does not exist on type 'User']] ← غلطة إملائية (nmae) أو النوع ناقص الخاصية. ساعات TS بيضيف [[Did you mean 'name'?]] (كود TS2551) لما يلاقي اسم قريب.

تفاصيل أكتر عن كل خطأ في «تاب TypeScript».`,
            when: "كل ما المحرر يطلع خط أحمر أو الـ CI يفشل في typecheck. اقرا الجملة للآخر قبل ما تحط [[as any]].",
            mistakes: R`تقرا [[not assignable]] بالعكس وتفتكر المشكلة في النوع المطلوب. وتحل [[possibly 'undefined']] بـ [[!]] من غير ما تفكر ليه ممكن تبقى undefined. وتحط [[any]] عشان [[implicitly has an 'any' type]] تختفي: كده قفلت TS بدل ما تسمعه.`
          },
          lines: [
            R`«نوع string مينفعش يتحط مكان number». سطر ١ عمود ٧. TS2322 أشهر خطأ.`,
            R`«الـ object اللي كاتبه مسموحله بخصايص معروفة بس، و age مش في نوع User».`,
            R`possibly = ممكن. «u.email ممكن يبقى undefined» لأنه اختياري ([[email?]]).`,
            R`«مش لاقي المكتبة zodd ولا ملف أنواعها». الاسم غلط (zod).`,
            R`implicitly = ضمنيًا. «الباراميتر a نوعه any لأنك مكتبتلوش نوع».`,
            R`«argument نوعه string مينفعش يتحط مكان باراميتر number» (push("x") في array أرقام).`,
            R`«متوقع ١ وجالي صفر». ناديت الدالة من غير الـ argument.`,
            R`«الخاصية nmae مش موجودة في User». غلطة إملائية.`
          ],
          sol: R`الكود اللي بيطلّع الـ ٨ أخطاء بالظبط:
[[const n: number = "5";]]
[[type User = { name: string; email?: string };]]
[[const u: User = { name: "sara", age: 3 };]]
[[function f(u: User) { return u.email.toLowerCase(); }]]
[[import { z } from "zodd";]] (في سطر ٦ بعد سطر فاضي أو [[let x;]])
[[function g(a) { return a; }]]
[[const arr = [1,2]; arr.push("x");]]
[[f();]]
[[u.nmae;]]

الحلول: [[const n = 5]]، شيل [[age]] أو ضيفه للنوع، [[u.email?.toLowerCase()]]، [[import { z } from "zod"]] بعد [[npm i zod]]، [[function g(a: string)]]، [[arr.push(3)]]، [[f(u)]]، [[u.name]].

وملحوظة: الرقم في [[a.ts(3,33)]] = سطر ٣، عمود ٣٣. لو أرقامك مختلفة يبقى سطورك مترتبة بشكل تاني، ومفيش مشكلة.`,
          solCode: R`const n: number = "5";
type User = { name: string; email?: string };
const u: User = { name: "sara", age: 3 };
function f(u: User) { return u.email.toLowerCase(); }
let x;
import { z } from "zodd";
function g(a) { return a; }
const arr = [1,2]; arr.push("x");
f();
u.nmae;`
        },
        {
          cmd: "أخطاء PostgreSQL",
          title: "رسايل PostgreSQL: violates constraint و does not exist و GROUP BY و Connection refused",
          desc: R`رسايل Postgres منظمة جدًا: سطر [[ERROR:]] فيه الجملة، وساعات [[DETAIL:]] فيه التفاصيل (أي صف وأي قيمة)، و [[HINT:]] فيه اقتراح، و [[LINE 1:]] ومعاه [[^]] بيشاور على المكان في الـ SQL.

الكلمات: [[violates]] = بيخالف، و [[constraint]] = قيد/شرط على الجدول (unique أو not-null أو foreign key)، و [[duplicate key value]] = قيمة مكررة، و [[relation]] = جدول (في لغة Postgres)، و [[does not exist]] = مش موجود، و [[invalid input syntax for type integer]] = الشكل مش رقم، و [[at or near]] = عند أو قريب من، و [[must appear in the GROUP BY clause or be used in an aggregate function]] = العمود ده لازم يبقى في GROUP BY أو جوه دالة تجميع زي count، و [[permission denied for table]] = مفيش صلاحية.`,
          example: R`ERROR:  duplicate key value violates unique constraint "users_email_key"
DETAIL:  Key (email)=(a@b.c) already exists.
ERROR:  null value in column "email" of relation "users" violates not-null constraint
ERROR:  column "nmae" does not exist
ERROR:  relation "user_s" does not exist
ERROR:  invalid input syntax for type integer: "abc"
ERROR:  syntax error at or near "selct"
ERROR:  column "users.email" must appear in the GROUP BY clause or be used in an aggregate function
ERROR:  permission denied for table users
FATAL:  database "shopdb" does not exist
connection to server at "localhost" (127.0.0.1), port 5433 failed: Connection refused
	Is the server running on that host and accepting TCP/IP connections?`,
          try: R`في psql اعمل جدول [[users(id serial primary key, email text unique not null, age int)]]، وحاول تدخّل نفس الإيميل مرتين، وصف من غير إيميل، و [[age]] = 'abc'، و [[selct 1]]. لكل خطأ اكتب الجملة بالعربي وإيه اللي المفروض يحصل في كود الـ backend بتاعك لما يطلع (مثلًا: ترجع 409 لليوزر).`,
          flag: "script",
          deep: {
            why: "الأخطاء دي مش بس للمطور: كتير منها المفروض تتحول لرسالة لليوزر (الإيميل مستخدم قبل كده). ولو فاهمها، هتعرف تمسكها في الكود وترد صح بدل 500.",
            how: R`[[duplicate key value violates unique constraint "users_email_key"]] ← «قيمة مكررة بتخالف القيد الفريد». [[DETAIL: Key (email)=(a@b.c) already exists]] ← «الإيميل ده موجود خلاص». في الـ API رجّع 409 Conflict أو رسالة «Email is already registered». كود الخطأ في Postgres [[23505]].
[[null value in column "email" ... violates not-null constraint]] ← بعت صف من غير إيميل. [[relation "users"]] = جدول users.
[[column "nmae" does not exist]] و [[relation "user_s" does not exist]] ← إملاء. ولو الاسم فيه حروف كبيرة، Postgres بيحوّل الأسماء اللي من غير علامات تنصيص لحروف صغيرة، فمحتاج [["User"]] بعلامات.
[[invalid input syntax for type integer: "abc"]] ← بعت نص في عمود رقم. اعمل validation قبل.
[[syntax error at or near "selct"]] ← خطأ كتابة في الـ SQL عند الكلمة دي أو قبلها بشوية.
[[must appear in the GROUP BY clause or be used in an aggregate function]] ← ضيف العمود لـ GROUP BY أو لفّه في [[count]]/[[max]].
[[FATAL: database "shopdb" does not exist]] ← اعمله بـ [[createdb]] أو صلّح الاسم في [[DATABASE_URL]].
[[Connection refused ... Is the server running on that host and accepting TCP/IP connections?]] ← «السيرفر شغال وبيستقبل اتصالات؟». غالبًا Postgres مش شغال أو البورت غلط.

تفاصيل الـ SQL نفسه في «تاب SQL و Prisma» و «تاب PostgreSQL».`,
            when: "كل ما query يفشل، وكل ما تكتب error handling في الـ backend.",
            mistakes: R`ترجّع [[violates unique constraint]] لليوزر زي ما هي: دي رسالة داخلية وبتكشف اسم الجدول. ترجمها لرسالة لطيفة. وتفهم [[relation]] «علاقة» بين جدولين: في رسايل Postgres معناها جدول (أو view). وتفهم [[at or near]] إن الغلط في الكلمة دي بالظبط: ممكن يبقى قبلها (فاصلة ناقصة مثلًا).`
          },
          lines: [
            R`«قيمة مكررة بتخالف القيد الفريد users_email_key».`,
            R`DETAIL: «المفتاح (email)=(a@b.c) موجود خلاص». already = خلاص/قبل كده.`,
            R`«قيمة null في عمود email في جدول users بتخالف قيد not-null».`,
            R`«العمود nmae مش موجود». إملاء.`,
            R`relation = جدول. «الجدول user_s مش موجود».`,
            R`«شكل الإدخال غلط لنوع integer: abc».`,
            R`«خطأ في الكتابة عند أو قرب selct».`,
            R`«العمود لازم يبقى في GROUP BY أو جوه دالة تجميع».`,
            R`«مفيش صلاحية على جدول users» لليوزر ده.`,
            R`FATAL = الاتصال نفسه فشل. «الداتابيز shopdb مش موجودة».`,
            R`«الاتصال بالسيرفر على localhost بورت 5433 فشل: الاتصال اترفض».`,
            R`«السيرفر شغال على الجهاز ده وبيقبل اتصالات TCP/IP؟». سؤال بيقترح السبب.`
          ],
          sol: R`اللي هيطلعلك (PostgreSQL 16):
الإيميل مرتين ← [[ERROR: duplicate key value violates unique constraint "users_email_key"]] و [[DETAIL: Key (email)=(a@b.c) already exists.]] ← في الـ backend: امسك كود [[23505]] ورجّع 409 مع [[{"error": "Email is already registered"}]].
من غير إيميل ← [[ERROR: null value in column "email" of relation "users" violates not-null constraint]] و [[DETAIL: Failing row contains (...)]] ← المفروض الـ validation (Zod مثلًا) يمسكها قبل الداتابيز ويرجع 400.
[[age = 'abc']] ← [[ERROR: invalid input syntax for type integer: "abc"]] ← validation برضه، 400.
[[selct 1]] ← [[ERROR: syntax error at or near "selct"]] و [[LINE 1: selct 1]] و [[^]] تحت أول حرف ← دي غلطتك انت في الكود، مش حاجة لليوزر.

اسم الـ constraint [[users_email_key]] Postgres بيعمله لوحده بالشكل [[table_column_key]]. لو شفت اسم تاني يبقى حد سمّاه بنفسه.`
        },
        {
          cmd: "أخطاء Python",
          title: "رسايل Python: Traceback و KeyError و NoneType و missing 1 required",
          desc: R`في Python الخطأ اسمه exception، والرسالة بتبدأ بـ [[Traceback (most recent call last):]] = «تتبع النداءات (آخر نداء في الآخر)». يعني عكس Node: هنا المكان الأهم في آخر الرسالة، وآخر سطر فيه النوع والجملة.

الكلمات: [[No module named]] = مفيش مكتبة بالاسم ده، و [[KeyError]] = المفتاح مش في الـ dict، و [[can only concatenate str (not "int") to str]] = تقدر تلزق string في string بس (مش رقم)، و [['NoneType' object has no attribute]] = القيمة None ومفيهاش الخاصية دي، و [[expected an indented block]] = كان مستني سطر بمسافة (indentation)، و [[invalid literal for int() with base 10]] = النص ده مينفعش يتحول لرقم عشري، و [[list index out of range]] = الـ index برا حدود الليستة، و [[missing 1 required positional argument]] = ناقص argument واحد لازم.`,
          example: R`ModuleNotFoundError: No module named 'requestz'
KeyError: 'b'
TypeError: can only concatenate str (not "int") to str
AttributeError: 'NoneType' object has no attribute 'upper'
IndentationError: expected an indented block after function definition on line 1
ValueError: invalid literal for int() with base 10: 'abc'
NameError: name 'undefined_name' is not defined
IndexError: list index out of range
FileNotFoundError: [Errno 2] No such file or directory: 'nope.txt'
TypeError: f() missing 1 required positional argument: 'b'`,
          try: R`اتسبب في كل خطأ بسطر [[python3 -c '...']] (مثلًا [[python3 -c 'd={"a":1}; d["b"]']]). وقارن كل واحد بالمقابل بتاعه في Node من الدرس اللي فات: إيه اللي شبه بعض؟ اكتب جدول صغير في [[errors.md]]: Python ← Node.`,
          flag: "script",
          deep: {
            why: R`حتى لو شغلك JS، هتقابل Python في سكربتات وأدوات و AI. ونفس المهارة بتنقل: الرسايل في اللغتين بتستخدم نفس الكلمات ([[not defined]] و [[no attribute]] و [[missing]]).`,
            how: R`المقابلات:
[[NameError: name 'x' is not defined]] ← [[ReferenceError: x is not defined]] في JS.
[[AttributeError: 'NoneType' object has no attribute 'upper']] ← [[TypeError: Cannot read properties of null]] في JS. [[NoneType]] = نوع None (زي null).
[[KeyError: 'b']] ← في JS مفيش خطأ، بيرجع [[undefined]] بهدوء. في Python استخدم [[d.get("b")]] لو المفتاح ممكن ميكونش موجود.
[[ModuleNotFoundError]] ← [[Cannot find module]]. الحل [[pip install]] جوه venv (شوف «تاب Python»).
[[can only concatenate str (not "int") to str]] ← في JS [["age: " + 5]] بيشتغل عادي ويطلع [["age: 5"]]، في Python لأ: [[f"age: {5}"]] أو [[str(5)]].
[[missing 1 required positional argument: 'b']] ← في JS الباراميتر الناقص بيبقى undefined بهدوء، في Python خطأ. positional = بالترتيب (مش بالاسم).
[[invalid literal for int() with base 10]] ← في JS [[Number("abc")]] بيرجع [[NaN]] من غير خطأ.

لاحظ: Python أصرم من JS في حاجات كتير، والرسايل بتقولك كده صراحة.`,
            when: "أي سكربت Python، وأي Traceback في أداة CLI أو في شغل AI.",
            mistakes: R`تقرا أول سطر في الـ Traceback وتفتكره المشكلة: في Python اقرا من تحت. و [[IndentationError]] بتيجي من خلط tabs ومسافات: خلّي المحرر يستخدم ٤ مسافات. و [[most recent call last]] معناها «آخر نداء آخر حاجة»، مش «النداء الأخير فشل».`
          },
          lines: [
            R`«مفيش module اسمه requestz». إملاء (requests) أو مش متسطّب.`,
            R`KeyError: المفتاح 'b' مش في الـ dict.`,
            R`«تقدر تلزق str في str بس (مش int)». حوّل الرقم لنص.`,
            R`«الـ object من نوع NoneType ملوش attribute اسمه upper». القيمة None.`,
            R`«كان مستني سطر بمسافة بعد تعريف الدالة في سطر ١». ناقص indentation.`,
            R`«نص مينفعش يتحول لـ int بالأساس ١٠: abc».`,
            R`«الاسم undefined_name مش متعرّف». زي ReferenceError.`,
            R`«الـ index برا حدود الليستة».`,
            R`«[Errno 2] مفيش ملف أو فولدر بالاسم ده». نفس رسالة ENOENT.`,
            R`«الدالة f ناقصها argument واحد لازم بالترتيب: b».`
          ],
          sol: R`اللي هيطلعلك (Python 3.11) هو السطور اللي في الـ example بالظبط، وقبلها Traceback بيقول الملف والسطر.

جدول المقابلات الصح:
[[NameError]] ← [[ReferenceError ... is not defined]]
[[AttributeError: 'NoneType' ...]] ← [[TypeError: Cannot read properties of null]]
[[ModuleNotFoundError]] ← [[Error: Cannot find module]]
[[FileNotFoundError]] ← [[Error: ENOENT]]
[[IndexError]] ← مفيش في JS، بيرجع undefined.
[[KeyError]] ← مفيش في JS، بيرجع undefined.
[[TypeError ... missing 1 required positional argument]] ← مفيش في JS، الباراميتر بيبقى undefined.

الملاحظة المهمة: Python بترمي خطأ في حالات كتير JS بيسكت فيها. عشان كده في JS لازم تبقى أحرص، وده من أسباب TypeScript.`
        }
      ]
    }
  ]
});
