// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
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
    },
    {
      t: "تقرا README وصفحة docs",
      l: 1,
      n: "أقسام الـ README و Getting started، وصفحة API reference (parameters و returns و throws)، وكلمات زي optional و defaults to و must و should، وإزاي تقرا بسرعة",
      items: [
        {
          cmd: "README و Getting started",
          title: "README فيه إيه، وتقرا Getting started إزاي من غير ما تتوه؟",
          desc: R`أي مكتبة أو أداة ليها README على GitHub، وأغلبهم بنفس الترتيب تقريبًا. لو عارف الترتيب ده هتروح للقسم اللي محتاجه على طول بدل ما تقرا كل حاجة.

الأقسام الشائعة: وصف في سطر (المكتبة بتعمل إيه)، و [[Features]] المميزات، و [[Prerequisites]] أو [[Requirements]] اللي لازم يبقى عندك قبل ما تبدأ (Node 20+ مثلًا)، و [[Installation]] التسطيب، و [[Quick start]] أو [[Getting started]] أقصر طريق لأول نتيجة، و [[Usage]] الاستخدام بأمثلة، و [[Configuration]] أو [[Options]] الإعدادات، و [[API]] قايمة الدوال، و [[FAQ]] أسئلة متكررة، و [[Troubleshooting]] لو حاجة باظت، و [[Contributing]] لو عايز تساهم، و [[License]] الرخصة، و [[Changelog]] التغييرات.

الـ Getting started بيبقى خطوات بالأمر (imperative) ومرقّمة. اقراها زي وصفة أكل: كل خطوة بالترتيب، ومتعدّيش خطوة لأنها «شكلها مش مهمة».`,
          example: R`# acme-cli
A tiny CLI to resize images from the terminal.
## Prerequisites
- Node.js 20 or later
## Installation
npm install -g acme-cli
## Quick start
acme resize photo.jpg --width 800
This creates photo-800.jpg in the same folder.
## Configuration
Options can be set in acme.config.json. CLI flags take precedence over the config file.
## Troubleshooting
If you see "command not found", make sure your global npm bin folder is in your PATH.`,
          try: R`افتح README بتاع مكتبة بتستخدمها (مثلًا [[zod]] أو [[vite]] أو [[express]] على GitHub). اعمل قايمة بالأقسام اللي فيه، ولكل قسم جملة عربي بيقول فيه إيه. وبعدين نفّذ الـ Quick start بتاعه خطوة خطوة في فولدر تجربة، واكتب أي كلمة وقفتك في [[words.md]].`,
          flag: "script",
          deep: {
            why: "أول حاجة بتعملها مع أي أداة جديدة هي قراية README. لو بتوه فيه، بتروح لـ YouTube tutorial قديم بدل المصدر الرسمي، وده بيجيبلك كود قديم وأخطاء غريبة.",
            how: R`كلمات الـ README اللي لازم تعرفها: [[or later]] / [[or higher]] / [[+]] = الإصدار ده أو أحدث، و [[take precedence over]] = ليها الأولوية على (لما يتعارضوا، دي اللي بتكسب)، و [[make sure]] = اتأكد، و [[out of the box]] = شغال من غير إعداد، و [[zero-config]] = مش محتاج إعداد، و [[lightweight]] = خفيفة، و [[drop-in replacement]] = بديل تحطه مكان التاني من غير ما تغيّر كودك، و [[boilerplate]] = كود متكرر جاهز، و [[under the hood]] = من جوه، و [[opinionated]] = ليها طريقة واحدة بتفرضها عليك.

السطر اللي بعد الأمر غالبًا بيقولك النتيجة المتوقعة ([[This creates photo-800.jpg]]). لو النتيجة عندك غيرها، وقف هنا قبل الخطوة الجاية.

وخلي بالك: الـ README على GitHub بيبقى لآخر إصدار في الـ main branch، وساعات لإصدار لسه منزلش. لو انت على إصدار أقدم، شوف الـ docs بتاعة إصدارك أو الـ tag.`,
            when: "أول ما تفكر تستخدم أي مكتبة، وقبل ما تسأل سؤال عنها. ولما تكتب README لمشروعك (المستوى ٢) انقل نفس الترتيب.",
            mistakes: R`تقفز على [[Usage]] وتعدّي [[Prerequisites]]، وبعدين تلاقي خطأ غريب سببه إن Node عندك قديم. وتفهم [[take precedence over]] بالعكس. وتنسخ الأوامر من README الـ main وانت مسطّب إصدار قديم.`
          },
          lines: [
            R`الوصف في سطر: «CLI صغير بيغيّر مقاس الصور من الـ terminal». tiny = صغير جدًا.`,
            R`- Node.js 20 or later = «Node 20 أو أحدث». قبل أي حاجة اتأكد بـ [[node -v]].`,
            R`أمر التسطيب. [[-g]] = global، يعني يبقى متاح في أي فولدر.`,
            R`أول أمر تجربة: غيّر عرض الصورة لـ ٨٠٠.`,
            R`النتيجة المتوقعة: «ده بيعمل photo-800.jpg في نفس الفولدر». لو مطلعش، وقف.`,
            R`«الإعدادات ممكن تتحط في acme.config.json. الـ flags في الأمر ليها الأولوية على ملف الإعدادات». take precedence over = تكسب لما يتعارضوا.`,
            R`«لو شفت command not found، اتأكد إن فولدر npm العام موجود في الـ PATH».`
          ],
          sol: R`مثال لـ README بتاع zod (الأقسام بتتغير مع الوقت): فيه وصف ([[TypeScript-first schema validation with static type inference]] ← «validation بـ schema مبنية لـ TypeScript الأول، وبتستنتج الأنواع لوحدها»)، و Installation ([[npm install zod]])، و Requirements (نسخة TypeScript معينة و [[strict]] مفعّل)، وأمثلة Basic usage، ولينك للـ docs الكاملة.

الـ Quick start نفّذته صح لو: الأمر اشتغل، والنتيجة زي ما الـ README قال. لو فيه خطوة فشلت، اكتب الرسالة في [[errors.md]] وارجع لقسم Prerequisites: غالبًا إصدار Node أو TypeScript.

كلمات متوقع تقابلها وتضيفها: [[static]] = وقت الكتابة مش التشغيل، و [[inference]] = استنتاج، و [[schema]] = وصف لشكل الداتا، و [[ecosystem]] = المكتبات اللي حوالين الأداة.`
        },
        {
          cmd: "صفحة API reference",
          title: "صفحة API: Syntax و Parameters و Return value و Exceptions و Examples",
          desc: R`صفحة الـ API reference هي «كتالوج» الدالة. MDN و Node docs وأغلب المكتبات بيستخدموا نفس الأقسام تقريبًا، فلو اتعلمتهم مرة هتقرا أي docs.

[[Syntax]] أو [[Signature]] شكل النداء، و [[Parameters]] أو [[Arguments]] اللي بتبعته (ومعاها النوع، ومطلوب ولا اختياري، والـ default)، و [[Return value]] أو [[Returns]] اللي بيرجع، و [[Exceptions]] أو [[Throws]] أو [[Errors]] إمتى بيرمي خطأ، و [[Description]] شرح مفصّل، و [[Examples]] أمثلة، و [[Browser compatibility]] المتصفحات اللي بتدعمه، و [[See also]] صفحات مرتبطة.

علامات مهمة في الـ Syntax: الأقواس المربعة [[[ ]]] حوالين باراميتر يعني اختياري. فـ [[fs.readFile(path[, options], callback)]] يعني [[options]] ممكن تسيبه. و [[...args]] يعني أي عدد.`,
          example: R`fs.readFile(path[, options], callback)
  path <string> | <Buffer> | <URL> | <integer> filename or file descriptor
  options <Object> | <string>
    encoding <string> | <null> Default: null
    flag <string> Default: 'r'
  callback <Function>
    err <Error> | <AggregateError>
    data <string> | <Buffer>
Asynchronously reads the entire contents of a file.
The callback is passed two arguments (err, data), where data is the contents of the file.
If no encoding is specified, then the raw buffer is returned.
If options is a string, then it specifies the encoding.`,
          try: R`شغّل [[node -e 'console.log(require("fs").readFileSync("package.json"))']] في أي فولدر فيه package.json، وبعدين نفس الأمر بـ [[, "utf8"]] بعد اسم الملف. قارن الناتجين بالجملة [[If no encoding is specified, then the raw buffer is returned]]. هل الـ docs صادقة؟`,
          flag: "script",
          deep: {
            why: "الـ docs هي المصدر الوحيد اللي أكيد صح لإصدارك. الـ tutorials والـ AI ممكن يكونوا قدام أو ورا. ولو عرفت تقرا صفحة API في دقيقتين، هتبطّل تخمّن.",
            how: R`اقرا الصفحة بالترتيب ده: ١) الـ Syntax (شكل النداء). ٢) الـ Parameters: إيه الإجباري؟ وإيه الـ Default؟ ٣) الـ Return value: هيرجعلي إيه؟ Promise؟ ٤) Exceptions: إمتى يفشل؟ ٥) أول مثال. الـ Description سيبها للآخر أو لما تحتاج تفصيلة.

الكلمات: [[Asynchronously]] = مش بيستنى (callback أو Promise)، و [[Synchronously]] = بيوقف لحد ما يخلص، و [[entire]] = كله، و [[contents]] = المحتوى، و [[is passed]] = بيتبعتله، و [[where]] هنا = «بحيث إن» (بتشرح حاجة اتذكرت)، و [[specified]] = اتحدد، و [[raw]] = خام (bytes مش نص)، و [[file descriptor]] = رقم بيمثل ملف مفتوح.

علامات النوع [[<string> | <Buffer>]] يعني «string أو Buffer» ([[|]] = أو، زي union في TypeScript).`,
            when: "كل مرة تستخدم دالة لأول مرة، وكل مرة دالة بترجع حاجة غير اللي متوقعها.",
            mistakes: R`تفتكر إن [[[, options]]] جزء من الكود وتكتب الأقواس المربعة. وتعدّي [[Default:]] وتستغرب ليه النتيجة Buffer مش نص. وتقرا docs إصدار غير اللي عندك: Node docs فوق فيها اختيار الإصدار، وكل دالة فيها [[Added in: vX]] و [[History]].`
          },
          lines: [
            R`الـ Syntax. الأقواس المربعة حوالين [[, options]] = اختياري.`,
            R`path: ممكن string أو Buffer أو URL أو رقم. «اسم الملف أو file descriptor».`,
            R`options: object أو string.`,
            R`encoding: الافتراضي null. يعني لو مبعتهوش، مفيش تحويل لنص.`,
            R`flag: الافتراضي 'r' (read = قراية).`,
            R`callback: دالة.`,
            R`err: خطأ لو حصل.`,
            R`data: المحتوى، string أو Buffer.`,
            R`«بتقرا محتوى الملف كله بشكل async».`,
            R`«الـ callback بيتبعتله اتنين arguments (err, data)، بحيث إن data هي محتوى الملف».`,
            R`«لو محددتش encoding، بيرجع الـ buffer الخام». ودي الجملة اللي بتفسر الـ Buffer الغريب.`,
            R`«لو options كانت string، يبقى هي الـ encoding». عشان كده [[readFile(p, "utf8", cb)]] شغالة.`
          ],
          sol: R`الأمر الأول بيطبع حاجة زي [[<Buffer 7b 0a 20 20 22 6e 61 6d 65 ...>]]: bytes خام، لأنك مبعتش encoding والـ Default [[null]]. التاني بيطبع محتوى package.json كنص عادي، لأن [["utf8"]] كـ string اتفهمت encoding.

يعني الـ docs صادقة بالظبط: [[If no encoding is specified, then the raw buffer is returned]] و [[If options is a string, then it specifies the encoding]].

(ده النص من Node docs لـ [[fs.readFile]]، و [[readFileSync]] ليها نفس القاعدة. الصفحة الرسمية فيها كمان [[signal]] وحاجات تانية حسب إصدارك.)`
        },
        {
          cmd: "optional و defaults to",
          title: "optional و defaults to و must و should و may: الـ docs بتلزمك بإيه؟",
          desc: R`الـ docs بتستخدم كلمات بعينها عشان تقول «ده إجباري» أو «ده نصيحة» أو «ده مسموح». لو قريتهم بدقة هتفرق بين قاعدة لو كسرتها الكود هيقع، ونصيحة لو كسرتها هتدفع التمن بعدين.

[[must]] / [[required]] لازم (مش اختيار)، و [[must not]] ممنوع، و [[should]] المفروض (نصيحة قوية، ممكن تخالفها لو عارف ليه)، و [[should not]] المفروض لأ، و [[may]] / [[can]] مسموح أو ممكن، و [[optional]] اختياري، و [[defaults to]] قيمته الافتراضية، و [[if omitted]] لو سبته، و [[by default]] افتراضيًا، و [[recommended]] يُفضّل، و [[discouraged]] مش مُفضّل، و [[note]] خد بالك، و [[warning]] / [[caution]] تحذير، و [[caveat]] استثناء أو عيب لازم تعرفه، و [[deprecated]] هيتشال.

[[may]] ليها معنيين: «مسموح» ([[You may pass a second argument]]) و «ممكن يحصل» ([[This may take a few minutes]]). السياق بيحدد.`,
          example: R`must          The name must be unique.
must not      You must not commit the .env file.
should        You should run migrations in a transaction.
may           The callback may be called more than once.
optional      timeout (optional): number of milliseconds to wait.
defaults to   port defaults to 3000.
if omitted    If omitted, the current directory is used.
by default    By default, logs are written to stdout.
recommended   This option is recommended for production.
note          Note: this method does not modify the original array.
warning       Warning: this action cannot be undone.
caveat        One caveat: the cache is not shared between workers.`,
          try: R`افتح صفحة MDN لـ [[Array.prototype.splice()]] وصفحة [[Array.prototype.toSpliced()]]. دوّر في كل واحدة على [[modifies]] أو [[changes]] أو [[new array]] أو [[in place]]. اكتب جملة إنجليزي واحدة بتقول الفرق، واستخدم فيها [[must]] أو [[should]].`,
          flag: "script",
          deep: {
            why: R`فيه مواصفات رسمية (زي RFC 2119) معرّفة فيها [[MUST]] و [[SHOULD]] و [[MAY]] بمعاني دقيقة، والـ docs العادية بتمشي على نفس الروح. لو خلطت must بـ should هتعمل حاجات مش لازم، أو تسيب حاجات لازم.`,
            how: R`الترتيب من الأقوى للأضعف: [[must]] > [[should]] > [[may]]. وفي النفي: [[must not]] ممنوع، و [[should not]] مش مفضّل، و [[need not]] / [[don't have to]] مش لازم (مسموح تعمل أو لأ).

وخلي بالك من الفرق ده بالظبط: [[You must not use X]] = ممنوع تستخدمه. [[You don't have to use X]] = مش لازم تستخدمه (بس مسموح). الترجمة الحرفية لـ «مش لازم» بتخلي ناس كتير تقول [[mustn't]] وهي تقصد [[don't have to]].

و [[cannot be undone]] = مينفعش يترجع. و [[more than once]] = أكتر من مرة (ودي تحذير: الـ callback بتاعك لازم يستحمل ده). و [[does not modify the original]] = مبيغيّرش الأصل.

تفاصيل MUST/SHOULD/MAY في الـ specs في المستوى ٣.`,
            when: "كل صفحة docs، وكل ما تكتب تعليمات لحد (README، أو رسالة review).",
            mistakes: R`[[You mustn't install it globally]] وانت قصدك «مش لازم»: الصح [[You don't have to install it globally]]. و [[This parameter is optional, defaults 10]] ناقصة [[to]]: [[defaults to 10]]. و [[it's must]] غلط شائع جدًا عند المصريين، الصح [[it's required]] أو [[you must]] أو [[it's a must]] (عامية).`
          },
          lines: [
            R`must = لازم. «الاسم لازم يبقى فريد».`,
            R`must not = ممنوع. «ممنوع تعمل commit لملف .env».`,
            R`should = المفروض. «المفروض تشغّل الـ migrations جوه transaction».`,
            R`may = ممكن يحصل. «الـ callback ممكن يتنادى أكتر من مرة». تحذير.`,
            R`optional = اختياري. «timeout (اختياري): عدد المللي ثانية للانتظار».`,
            R`defaults to = قيمته الافتراضية. «البورت افتراضيًا 3000».`,
            R`If omitted = لو سبته. «لو مبعتهوش، بيستخدم الفولدر الحالي».`,
            R`By default = افتراضيًا. «الـ logs بتتكتب في stdout».`,
            R`recommended = يُفضّل. «الإعداد ده مفضّل في الإنتاج».`,
            R`Note = خد بالك. «الدالة دي مبتغيرش الـ array الأصلي».`,
            R`Warning + cannot be undone = تحذير: «مينفعش ترجع فيه».`,
            R`caveat = عيب/استثناء. «فيه حاجة: الـ cache مش مشترك بين الـ workers».`
          ],
          sol: R`في MDN: [[splice()]] [[changes the contents of an array]] (بتعدّل الأصل in place)، و [[toSpliced()]] بترجع [[a new array]] ومبتغيرش الأصل (دي نسخة الـ copying من splice).

جملة صح:
[[splice() modifies the original array, so you should use toSpliced() when you must keep the original unchanged (for example, in React state).]]

لو كتبت [[you must use toSpliced()]] بس من غير شرط، ده أقوى من اللازم: splice مش ممنوعة، هي بس مش مناسبة للـ state. عشان كده [[should]] هنا أدق. و [[unchanged]] = من غير تغيير.`
        },
        {
          cmd: "skimming",
          title: "تقرا صفحة docs طويلة في ٣ دقايق (skimming) من غير ما تترجم كل كلمة",
          desc: R`أكبر غلطة عند اللي إنجليزيته ضعيفة: يقرا كل كلمة ويترجمها، فالصفحة تاخد ساعة وهو زهق بعد ١٠ دقايق. المبرمجين المتعودين مبيقروش كده. بيعملوا [[skimming]] (يلقطوا الشكل العام بسرعة) و [[scanning]] (يدوّروا على حاجة معينة).

الطريقة: ١) اقرا العناوين بس ([[h2]] و [[h3]]) عشان تعرف الصفحة فيها إيه. ٢) بص على الكود قبل الكلام: الأمثلة بتفهمك ٧٠٪. ٣) اقرا أول جملة في كل فقرة بس (غالبًا هي الفكرة). ٤) دوّر على الكلمات المهمة: [[must]] و [[not]] و [[only]] و [[unless]] و [[Warning]] و [[Note]] و [[deprecated]] والأرقام. ٥) Ctrl+F بالكلمة اللي انت محتاجها. ٦) الكلمة اللي مش فاهمها: لو ممكن تفهم الجملة من غيرها، عدّيها. لو لأ، دوّر عليها واكتبها في [[words.md]].`,
          example: R`Skim plan for one docs page (3 minutes)
1. Headings only          -> what is on this page?
2. Code blocks            -> what does it look like in practice?
3. First sentence of each paragraph -> the main idea
4. Signal words           -> must, not, only, unless, Warning, Note, deprecated, numbers
5. Ctrl+F                 -> the exact word you need (e.g. "timeout")
6. Unknown word           -> skip it if the sentence still makes sense; otherwise look it up
7. Write one line         -> "This page explains ... The key rule is ..."`,
          try: R`خد صفحة docs طويلة ماقريتهاش قبل كده (مثلًا صفحة [[Caching]] في Next.js docs أو صفحة [[useEffect]] في react.dev). اضبط تايمر ٣ دقايق وطبّق الخطة. بعدها اقفل الصفحة واكتب سطرين: [[This page explains ... The key rule is ...]]. وبعدين ارجع اقرا الصفحة كويس وقارن: فاتك إيه؟`,
          flag: "script",
          deep: {
            why: "مش هتقدر تقرا كل حاجة بعمق، ومحدش بيعمل كده. الـ skimming بيخليك تعرف الصفحة دي فيها اللي محتاجه ولا لأ في دقيقتين، وتقرا بعمق الجزء المهم بس. ومع الوقت سرعتك في القراية كلها بتزيد.",
            how: R`اللي بيخلي الـ skimming ينفع مع الـ docs إن الـ docs مكتوبة بطريقة ثابتة: عنوان بيقول الموضوع، وجملة أولى بتقول الفكرة، وكود بيوضّح، وتحذيرات في صناديق ملونة (Note و Warning و Caution و Pitfall في react.dev).

لما تقابل كلمة مش عارفها، اسأل نفسك ٣ أسئلة: هل هي في العنوان؟ هل بتتكرر؟ هل الجملة من غيرها مفهومة؟ لو «لأ، لأ، آه» عدّيها. لو غير كده دوّر عليها.

ومع الوقت: الصفحة اللي خدت منك ١٥ دقيقة هتاخد ٥. ده بيحصل بعد حوالي شهرين من القراية اليومية (خطة الـ ٩٠ يوم في المستوى ٣).`,
            when: "أول مرة تفتح أي صفحة docs. والقراية العميقة لما تلاقي الجزء اللي انت محتاجه فعلًا.",
            mistakes: R`تترجم الصفحة كلها بـ Google Translate: بتفهم الفكرة بس مبتتعلمش حاجة، والترجمة ساعات بتغلط في المصطلحات ([[state]] تبقى «ولاية»!). وتعدّي صناديق Warning و Pitfall لأنها «مش جزء من الشرح»: دي أهم حاجة في الصفحة. وتقرا من غير هدف: قبل ما تفتح الصفحة اكتب سؤالك.`
          },
          lines: [
            "عنوان الخطة: صفحة docs واحدة في ٣ دقايق.",
            "العناوين بس: الصفحة دي فيها إيه؟",
            "الكود: شكله في الحقيقة إيه؟",
            "أول جملة في كل فقرة: الفكرة الأساسية.",
            "الكلمات اللي بتقلب المعنى والأرقام.",
            "Ctrl+F بالكلمة اللي انت محتاجها بالظبط.",
            "كلمة مش عارفها: عدّيها لو الجملة مفهومة، وإلا دوّر عليها.",
            "اكتب سطر: «الصفحة دي بتشرح ... والقاعدة الأهم ...»."
          ],
          sol: R`مثال على صفحة [[useEffect]] في react.dev، سطرين صح بعد ٣ دقايق:
[[This page explains how useEffect synchronizes a component with an external system. The key rule is that you might not need an Effect if you are only transforming data for rendering.]]

الكلمات اللي غالبًا وقفتك: [[synchronize]] = يزامن، و [[external system]] = حاجة برا React (network أو DOM أو timer)، و [[cleanup]] = تنضيف، و [[dependencies]] = اللي الـ effect معتمد عليه.

لو ملخّصك طلع «الصفحة بتشرح useEffect» بس، ده عام جدًا: رجع للخطوة ٣ و ٤ ودوّر على القاعدة. ولو فاتتك صناديق Pitfall، ارجعلها: فيها غالبًا أهم حاجة. (عناوين الصفحة بتتغير مع الوقت، فالمهم الطريقة.)`
        }
      ]
    },
    {
      t: "الـ grammar اللي المبرمج محتاجه بس",
      l: 2,
      n: "مش كتاب grammar: ٦ قواعد بتغطي أغلب اللي هتكتبه في شغلك، ومعاها أشهر غلطات المصريين والصح",
      items: [
        {
          cmd: "present simple",
          title: "ليه الـ docs بتقول returns مش return؟ (present simple والـ s)",
          desc: R`الـ docs والتعليقات ووصف الدوال بتتكتب بالـ present simple: الزمن اللي بيوصف حاجة بتحصل دايمًا. [[This function returns the user]] = «الدالة دي بترجّع اليوزر» (كل مرة، مش مرة واحدة).

القاعدة الوحيدة اللي لازم تحفظها: لو الفاعل مفرد وغايب (he/she/it، أو اسم مفرد زي [[the function]] أو [[the server]] أو [[this hook]])، الفعل بياخد [[s]] أو [[es]]. [[The server sends]]، [[It returns]]، [[This method throws]]. لو الفاعل جمع أو I/you/we/they، من غير s: [[The servers send]]، [[We return]].

النفي: [[doesn't]] + الفعل من غير s: [[It doesn't return anything]] (مش [[doesn't returns]]). والسؤال: [[Does it return a Promise?]].`,
          example: R`The function returns a Promise.
This hook fetches the data on mount.
The server sends a 201 status code.
Each request creates a new session.
The API does not support pagination yet.
Does this method modify the original array?
These functions return strings.
We cache the result for 60 seconds.
Wrong: This function return the user.  Right: This function returns the user.
Wrong: It doesn't returns anything.     Right: It doesn't return anything.`,
          try: R`اكتب تعليق JSDoc (سطر واحد) لـ ٥ دوال في مشروعك بالشكل ده: [[/** Returns ... */]] أو [[/** Fetches ... */]]. اتأكد من الـ s في كل واحد. وبعدين اكتب جملة نفي واحدة لكل دالة: [[It doesn't ...]].`,
          flag: "script",
          deep: {
            why: "الـ s المنسية هي أشهر غلطة في كتابة المصريين، وبتبان من أول سطر. وهي سهلة جدًا تتصلح: قاعدة واحدة. ولما تصلحها، كتابتك بتبان أحسن بكتير من غير ما تتعلم حاجة تانية.",
            how: R`إزاي تضيف الـ s: أغلب الأفعال [[s]] ([[returns]] و [[runs]])، والأفعال اللي آخرها [[s]] أو [[sh]] أو [[ch]] أو [[x]] أو [[o]] بتاخد [[es]] ([[fetches]] و [[pushes]] و [[fixes]] و [[does]] و [[goes]])، واللي آخرها حرف ساكن + [[y]] بتبقى [[ies]] ([[applies]] و [[copies]] و [[retries]])، و [[have]] بتبقى [[has]].

وفي التعليقات وعناوين الـ functions في الـ docs، بيحذفوا الفاعل: [[Returns the user.]] بدل [[This function returns the user.]]. ده عادي ومقبول، والـ s برضه موجودة (لأن الفاعل المحذوف مفرد).

في الـ commit messages بقى القاعدة عكس: من غير s ([[Fix bug]]). ده الدرس الجاي.`,
            when: "تعليقات JSDoc، ووصف الـ PR (This PR adds ...)، والـ README (The app shows ...)، و docs الـ API.",
            mistakes: R`[[The user click the button]] ← [[clicks]]. و [[It don't work]] ← [[It doesn't work]]. و [[He have access]] ← [[has]]. و [[This PR add]] ← [[This PR adds]]. و [[Does it returns]] ← [[Does it return]] (بعد does الفعل من غير s). و [[The data are]] و [[The data is]] الاتنين مقبولين في شغلنا، و [[is]] أشهر.`
          },
          lines: [
            R`the function (مفرد) + returns. «الدالة بترجّع Promise».`,
            R`fetch ← fetches (آخرها ch). «الـ hook بيجيب الداتا أول ما الـ component يظهر». on mount = أول ما يتركّب.`,
            R`the server + sends. «السيرفر بيبعت 201».`,
            R`each + مفرد: creates. «كل طلب بيعمل session جديدة».`,
            R`نفي: does not + support (من غير s). «الـ API مبيدعمش pagination لسه».`,
            R`سؤال: Does + modify (من غير s). «الـ method دي بتغيّر الـ array الأصلي؟».`,
            R`these functions (جمع) + return من غير s.`,
            R`we + cache من غير s. «بنخزّن النتيجة ٦٠ ثانية».`,
            "أشهر غلطة: الـ s ناقصة مع فاعل مفرد.",
            "الغلطة العكسية: s بعد doesn't. بعد does/doesn't الفعل دايمًا من غير s."
          ],
          sol: R`أمثلة صح:
[[/** Returns the total price including tax. */]] ← [[It doesn't round the result.]]
[[/** Fetches the user's orders from the API. */]] ← [[It doesn't cache the response.]]
[[/** Applies the coupon to the cart. */]] ← [[It doesn't validate the coupon code.]]
[[/** Checks whether the email is already registered. */]] ← [[It doesn't send any email.]]
[[/** Retries the request up to 3 times. */]] ← [[It doesn't retry on 4xx errors.]]

راجع: كل فعل في أول التعليق فيه s ([[Returns]] و [[Fetches]] و [[Applies]] و [[Checks]] و [[Retries]])، وكل فعل بعد [[doesn't]] من غير s. لو كتبت [[Retrys]] صلّحها: y بعد حرف ساكن تبقى [[ies]].`
        },
        {
          cmd: "imperative",
          title: "صيغة الأمر (imperative): Add و Fix و Run، من غير please ومن غير to",
          desc: R`الـ imperative = الفعل في أوله من غير فاعل ومن غير s ومن غير to: [[Run the tests]]، [[Add a login page]]، [[Don't commit secrets]]. بتستخدمه في ٣ أماكن: خطوات الـ README ([[Install the dependencies]])، وأسماء الأزرار والقوائم ([[Save]]، [[Delete account]])، والـ commit messages ([[Fix login redirect]]).

في العربي بنحس إن الأمر من غير «من فضلك» قلة ذوق، بس بالإنجليزي في التعليمات ده الطبيعي تمامًا. [[Please install the dependencies]] مش غلط بس غريبة في README. والـ please مكانها الرسايل للناس، مش التعليمات.

النفي: [[Don't]] أو [[Do not]] + الفعل: [[Do not edit this file manually]].`,
          example: R`Install the dependencies.
Copy .env.example to .env and fill in the values.
Run the migrations before you start the server.
Do not edit this file manually.
Click "Save" to apply the changes.
Fix login redirect loop
Add rate limiting to the /login endpoint
Wrong: Adding login page / Added login page / Adds login page
Right: Add login page
Wrong: To install, you should to run npm install.  Right: To install, run npm install.`,
          try: R`خد آخر ١٠ commits في أي repo عندك ([[git log --oneline -10]]). اكتب كل واحد تاني بالـ imperative (من غير ed ومن غير ing ومن غير s). وبعدين اكتب ٥ خطوات تشغيل مشروعك بالـ imperative كأنها README.`,
          flag: "script",
          deep: {
            why: R`git نفسه بيكتب بالـ imperative: لما تعمل [[git revert]] الرسالة بتبقى [[Revert "..."]]، ولما تعمل merge [[Merge branch 'x']]. و GitHub وأغلب المشاريع الكبيرة ماشيين على كده. فلما تكتب زيهم، الـ history بتاعك بيبان متسق ومحترف.`,
            how: R`القاعدة السهلة للـ commit: الرسالة لازم تكمّل الجملة دي صح: [[If applied, this commit will ___]]. «لو اتطبق، الـ commit ده هـ ___». [[If applied, this commit will fix login redirect]] ✓. [[... will fixed login redirect]] ✗.

في الـ README الترتيب بيتقال بـ [[first]] و [[then]] و [[finally]] أو بالترقيم. والشرط قبل الأمر: [[To run the tests, use npm test]] أو [[If you use Windows, run ...]].

و [[you should to]] غلط دايمًا: بعد [[should]] و [[must]] و [[can]] و [[will]] الفعل من غير to: [[you should run]].`,
            when: "كل commit، وكل خطوة في README أو runbook، وكل label على زرار في الـ UI.",
            mistakes: R`[[Added feature]] و [[Fixing bug]] في الـ commits: مش كارثة بس خالف العرف. و [[Please to run]] أو [[you have to must]] ترجمة حرفية. و [[Don't forget to don't commit]] نفي مكرر، الصح [[Remember not to commit]] أو [[Don't commit]].`
          },
          lines: [
            "خطوة README: فعل في الأول من غير فاعل.",
            R`خطوتين في جملة: Copy و fill in. fill in = املى.`,
            R`أمر + before + جملة. «شغّل الـ migrations قبل ما تشغّل السيرفر».`,
            R`نفي: Do not. «متعدّلش الملف ده بإيدك» (ملف بيتولّد أوتوماتيك).`,
            R`تعليمات UI. «دوس Save عشان التغييرات تتطبق».`,
            "commit message: فعل في الأول ومن غير نقطة.",
            "commit message أطول: الفعل + إيه + فين.",
            R`٣ صيغ غلط للـ commit: ing و ed و s.`,
            "الصح: الفعل زي ما هو.",
            R`should to غلط، و To + فعل في الأول معناها «عشان».`
          ],
          sol: R`مثال على تحويل:
[[added navbar]] ← [[Add navbar]]
[[fixing the cart bug]] ← [[Fix cart total when coupon is removed]] (ووضّحت الـ bug)
[[updates]] ← [[Update README with setup steps]]
[[final version]] ← دي مش رسالة؛ اكتب اللي اتغير فعلًا: [[Remove debug logs]]

خطوات README:
[[1. Clone the repository.]]
[[2. Copy .env.example to .env and set DATABASE_URL.]]
[[3. Install the dependencies with npm ci.]]
[[4. Run the migrations with npx prisma migrate dev.]]
[[5. Start the dev server with npm run dev.]]

لو فيه جملة زي [[You need to install ...]] مش غلط، بس الـ imperative أقصر وأوضح.`
        },
        {
          cmd: "passive voice",
          title: "الـ passive في الـ docs: is called و is thrown و was deprecated و must be provided",
          desc: R`الـ passive = الحاجة اللي «حصلها» الفعل هي الفاعل: [[The callback is called]] = «الـ callback بيتنادى» (مش مهم مين اللي ناداه). الـ docs بتحبه جدًا لأن المهم إيه اللي بيحصل للكود، مش مين عمله.

الشكل: [[is/are]] + التصريف التالت (past participle) للحاضر: [[is called]] و [[are ignored]]. و [[was/were]] + التصريف التالت للماضي: [[was deprecated]] و [[were removed]]. ومع must/can/will/should: [[must be provided]] و [[can be used]] و [[will be removed]]. و [[has been]] + التصريف التالت: [[has been deprecated]] = اتعمله deprecate (ولسه ساري).

التصريف التالت لأغلب الأفعال بـ [[ed]]، بس فيه أفعال شاذة لازم تحفظها: [[throw → thrown]] و [[write → written]] و [[send → sent]] و [[set → set]] و [[run → run]] و [[build → built]] و [[get → got/gotten]] و [[find → found]] و [[take → taken]] و [[give → given]] و [[choose → chosen]] و [[hide → hidden]].`,
          example: R`The callback is called once for each element.
An error is thrown if the file does not exist.
Unknown keys are ignored.
This method was deprecated in v4 and removed in v5.
The token must be provided in the Authorization header.
The config file can be written in JSON or YAML.
Your changes have been saved.
The email has already been sent.
Wrong: The error is throw.        Right: The error is thrown.
Wrong: The file was write to disk. Right: The file was written to disk.`,
          try: R`حوّل الجمل دي لـ passive: [[React calls the cleanup function before the next effect.]] و [[npm writes the log to a file.]] و [[We removed the old API in v3.]] و [[You must provide an API key.]]. وبعدين دوّر في أي صفحة docs على ٣ جمل passive وانقلهم.`,
          flag: "script",
          deep: {
            why: R`لو مش واخد بالك من الـ passive، هتقرا [[The callback is called]] وتفتكر إنك انت اللي لازم تناديه. والرسايل اللي بتكتبها لليوزر كمان passive: [[Your changes have been saved]] أطبع من [[We saved your changes]].`,
            how: R`إزاي تعرفه وانت بتقرا: [[be]] (is/are/was/were/been/be) + فعل بـ [[ed]] أو تصريف تالت. لو لقيت [[by]] بعده، ده الفاعل الحقيقي: [[The request is handled by the middleware]] = «الـ middleware هو اللي بيتعامل مع الطلب».

إمتى تستخدمه في كتابتك: رسايل الـ UI ([[Your password has been reset]])، والـ docs ([[The value is cached for 60 seconds]])، ووصف bug لما مش عارف السبب ([[The order is created twice]]). وإمتى لأ: في الـ commits (imperative) وفي الكلام العادي مع الفريق (active أوضح: [[I fixed the bug]]).`,
            when: "وانت بتقرا أي docs، ووانت بتكتب رسايل نجاح أو خطأ لليوزر، ووانت بتوصف bug.",
            mistakes: R`[[is throw]] و [[was send]] و [[has been write]]: التصريف التالت ناقص. و [[The bug was happened]] غلط: [[happen]] مبيجيش passive، الصح [[The bug happened]]. ونفس الكلام [[was occurred]] ← [[occurred]]، و [[is exist]] ← [[exists]]، و [[was failed]] ← [[failed]]. دي من أشهر غلطات المصريين لأن العربي بيقول «حصل» و «اتعمل» بنفس الطريقة.`
          },
          lines: [
            R`is called = بيتنادى. «الـ callback بيتنادى مرة لكل عنصر».`,
            R`is thrown (throw ← thrown شاذ). «بيترمي خطأ لو الملف مش موجود».`,
            R`are ignored = بيتم تجاهلهم. جمع فـ are.`,
            R`was deprecated و removed (ماضي). «اتعمله deprecate في v4 واتشال في v5».`,
            R`must be provided = لازم يتبعت. «الـ token لازم يتبعت في الـ Authorization header».`,
            R`can be written (write ← written). «ملف الإعدادات ممكن يتكتب JSON أو YAML».`,
            R`have been saved = اتحفظت. رسالة UI مشهورة.`,
            R`has already been sent = اتبعت خلاص.`,
            R`throw ← thrown. التصريف التالت الصح.`,
            R`write ← written.`
          ],
          sol: R`الحل:
[[The cleanup function is called by React before the next effect.]] (أو من غير [[by React]]).
[[The log is written to a file (by npm).]]
[[The old API was removed in v3.]]
[[An API key must be provided.]]

أمثلة من docs حقيقية هتلاقيها كتير: [[The callback is invoked with ...]]، [[This option is ignored if ...]]، [[... will be removed in a future version]].

لو كتبت [[The log is wrote]] صلّحها: [[write/wrote/written]]، والـ passive بياخد التالت [[written]].`
        },
        {
          cmd: "a / an / the",
          title: "a و an و the: إمتى تحط إيه (القواعد اللي بتفرق بجد)",
          desc: R`العربي فيه «ال» بس، والإنجليزي فيه [[a/an]] و [[the]] ومن غير خالص، فده من أصعب حاجات المصريين. بس مش محتاج كل القواعد، دي اللي بتغطي ٩٠٪:

١) [[a/an]] = واحد من كتير، أول مرة تذكره: [[I found a bug]] (bug، مش معروف لسه أنهي). [[an]] قبل صوت حرف علّة: [[an error]] و [[an API]] (إيه-بي-آي بتبدأ بصوت علّة) و [[an hour]]، بس [[a user]] و [[a URL]] (يو بتبدأ بصوت ي).
٢) [[the]] = حاجة معروفة للي بيقرا: اتذكرت قبل كده، أو واحدة بس، أو محددة بعدها: [[The bug is in the login page]] و [[the database]] (بتاعتنا) و [[the file you sent]].
٣) من غير حاجة: جمع أو uncountable بمعنى عام: [[Bugs happen]]، [[Data is stored in Postgres]]، [[I like TypeScript]]. وأسماء الأدوات والمنتجات: [[Postgres]] و [[GitHub]] و [[React]] (مش [[the React]]).

وقاعدة مهمة: اسم مفرد countable ميقفش لوحده أبدًا. [[I created branch]] غلط، لازم [[a branch]] أو [[the branch]] أو [[my branch]].`,
          example: R`I found a bug in the checkout page.
The bug happens when the cart is empty.
It returns an error, not an empty array.
Add a URL to the README.
We use Postgres and Redis.
Users can reset their password.
The server returns a 500 when the database is down.
Wrong: I created new branch.     Right: I created a new branch.
Wrong: The React is a library.   Right: React is a library.
Wrong: I need an information.    Right: I need some information.`,
          try: R`حط [[a]] أو [[an]] أو [[the]] أو ولا حاجة (اكتب [[-]]) في كل فراغ: [[I opened ___ issue on GitHub. ___ issue explains ___ problem with ___ login. ___ users can't log in when ___ password has ___ emoji. It's ___ hour-long fix.]]`,
          flag: "script",
          deep: {
            why: "الـ articles الغلط مش بتخلي الكلام مش مفهوم، بس بتخليه يبان مش طبيعي، ولو كترت في رسالة لعميل أو CV بتفرق. والخبر الحلو: ٣ قواعد بتصلح أغلبها.",
            how: R`سؤال واحد بيحل أغلب الحالات: «القارئ يعرف أنهي واحدة بالظبط؟». لو آه: [[the]]. لو لأ ومفرد: [[a/an]]. لو جمع أو حاجة عامة: ولا حاجة.

[[a/an]] على حسب الصوت مش الحرف: [[an SQL query]] لو بتنطقها «إس-كيو-إل»، و [[a SQL query]] لو بتنطقها «سيكوِل». الاتنين موجودين. و [[a unique ID]] (يو) و [[an undefined value]] (أن).

ومع الأرقام والإصدارات: [[Node 22]] من غير the، و [[the latest version]] بـ the، و [[version 5]] من غير.

وقبل أسماء الـ status codes والأخطاء: [[a 404]] و [[a TypeError]] (واحد من النوع ده)، و [[the 404 page]] (الصفحة بتاعتنا).`,
            when: "راجعها في أي حاجة رسمية: CV، وإيميل لعميل، و README، ووصف PR. في Slack مع الفريق محدش هيدقق.",
            mistakes: R`[[the]] قبل كل حاجة لأن العربي فيه «ال» كتير: [[The TypeScript is better]] ← [[TypeScript is better]]. واسم مفرد لوحده: [[I have question]] ← [[I have a question]]. و [[an user]] ← [[a user]]. و [[a information]] ← information مبتاخدش a (الدرس الجاي).`
          },
          lines: [
            R`a bug (أول مرة، مش معروف) و the checkout page (معروفة، واحدة بس في الموقع).`,
            R`The bug (اتذكر خلاص) و the cart (سلة اليوزر الحالي).`,
            R`an error (صوت علّة) و an empty array.`,
            R`a URL: بتتنطق «يو-آر-إل» فبتبدأ بصوت ي، فـ a. و the README (بتاع المشروع ده).`,
            R`أسماء أدوات من غير the.`,
            R`Users (جمع بمعنى عام) من غير the.`,
            R`a 500 (واحد من النوع ده) و the database (بتاعتنا).`,
            R`branch مفرد لازم قبله حاجة.`,
            R`اسم المكتبة من غير the.`,
            R`information uncountable: some مش an.`
          ],
          sol: R`الحل:
[[I opened an issue on GitHub. The issue explains a problem with the login. - Users can't log in when the password has an emoji. It's an hour-long fix.]]

الشرح: [[an issue]] (أول مرة + صوت علّة)، [[The issue]] (اتذكر)، [[a problem]] (أول مرة)، [[the login]] (صفحة الدخول بتاعتنا)، [[Users]] من غير (جمع عام)، [[the password]] (باسورد اليوزر ده)، [[an emoji]] (إيموجي: صوت علّة)، [[an hour-long]] (الـ h في hour مبتتنطقش).

لو كتبت [[a hour]] ده أشهر غلط هنا: القاعدة الصوت مش الحرف. و [[The users can't log in]] مقبولة لو تقصد يوزرز معينين اتكلمنا عنهم.`
        },
        {
          cmd: "informations و a feedback",
          title: "informations و a feedback و advices: الكلمات اللي مبتتجمعش (uncountable)",
          desc: R`فيه كلمات في الإنجليزي مبتتعدّش: مبتاخدش [[s]] ومبتاخدش [[a/an]]. وللأسف أغلبها كلمات بنستخدمها كل يوم في الشغل، وفي العربي بتتجمع عادي («معلومات» و «نصايح»)، فبنغلط فيها.

أشهرهم في شغلنا: [[information]] و [[feedback]] و [[advice]] و [[code]] (بمعنى source code) و [[software]] و [[hardware]] و [[data]] (غالبًا) و [[documentation]] و [[research]] و [[knowledge]] و [[progress]] و [[work]] (بمعنى شغل) و [[equipment]] و [[traffic]] و [[stuff]] و [[experience]] (بمعنى خبرة عامة) و [[homework]] و [[news]].

عشان تعدّهم: [[a piece of]] أو [[some]] أو كلمة تانية countable: [[some feedback]]، [[a piece of advice]]، [[a few tips]]، [[two pull requests]]، [[a code review]]، [[a line of code]]، [[a job]] بدل [[a work]].`,
          example: R`Thanks for the feedback!
Can you give me some advice on this PR?
I need more information about the bug.
The documentation is outdated.
We made good progress this week.
This code is hard to read.
I have 3 years of experience with React.
Wrong: Thanks for your feedbacks.     Right: Thanks for your feedback.
Wrong: I need an information.         Right: I need some information / a piece of information.
Wrong: I wrote a new code.            Right: I wrote some new code / a new function.`,
          try: R`صلّح الرسالة دي: [[Hi, thanks for the feedbacks. I did some researches and I have few informations. The softwares we use need new equipments. I will send the codes and the documentations tomorrow, any advices are welcome.]]`,
          flag: "script",
          deep: {
            why: R`[[feedbacks]] و [[informations]] و [[advices]] بتبان على طول لأي حد إنجليزيته كويسة، وبتتكرر في رسايل الشغل والـ CV والانترفيو. تصليح ٥ كلمات بس بيفرق جدًا.`,
            how: R`الفعل معاهم مفرد: [[The information is]] و [[The feedback was]] و [[The code is]]. و [[data]] في شغلنا بتتعامل غالبًا مفرد ([[the data is]])، و [[the data are]] موجودة في الكتابة العلمية.

[[experience]]: [[3 years of experience]] (خبرة، uncountable)، بس [[a great experience]] (تجربة، countable). و [[work]]: [[I have a lot of work]] (شغل)، بس [[works]] ممكن بمعنى «أعمال فنية». في CV اكتب [[work experience]].

[[few]] و [[a few]] مع countable، و [[little]] و [[a little]] مع uncountable: [[a few bugs]] و [[a little information]]. و [[few]] من غير a معناها «قليل جدًا» (سلبي)، و [[a few]] «شوية» (عادي).

وكلمات تبان uncountable بس هي countable: [[a bug]] و [[a feature]] و [[a task]] و [[a tip]] و [[a suggestion]] و [[a question]] و [[a job]].`,
            when: "أي رسالة شكر على review، أي طلب معلومات، أي CV (experience و work).",
            mistakes: R`[[feedbacks]] و [[informations]] و [[advices]] و [[softwares]] و [[equipments]] و [[researches]] و [[knowledges]] و [[codes]] بمعنى source code. و [[a work]] بمعنى وظيفة ← [[a job]]. و [[I have few informations]] ← [[I have a little information]] أو [[I have some details]].`
          },
          lines: [
            R`feedback من غير s. «شكرًا على رأيك».`,
            R`some advice مش advices.`,
            R`more information، مش informations.`,
            R`documentation + is (مفرد). outdated = قديم.`,
            R`progress من غير a.`,
            R`code + is. «الكود ده صعب يتقري».`,
            R`experience في الخبرة uncountable: 3 years of experience.`,
            R`الغلط الأشهر: feedbacks.`,
            R`an information غلط.`,
            R`a new code غلط. استخدم some code أو كلمة countable.`
          ],
          sol: R`النسخة الصح:
[[Hi, thanks for the feedback. I did some research and I have a little information. The software we use needs new equipment. I will send the code and the documentation tomorrow; any advice is welcome.]]

التصليحات: [[feedbacks → feedback]]، [[researches → research]]، [[few informations → a little information]] (أو [[some details]])، [[softwares → software]] و [[need → needs]] (بقى مفرد)، [[equipments → equipment]]، [[codes → code]]، [[documentations → documentation]]، [[advices are → advice is]].

لو فاتتك [[needs]]: لما [[software]] بقت مفرد، الفعل لازم ياخد s (درس present simple).`
        },
        {
          cmd: "غلطات المصريين",
          title: "أشهر ١٥ غلطة عند المصريين في رسايل الشغل (والصح)",
          desc: R`دي الغلطات اللي بتتكرر في رسايل Slack والإيميلات والـ PRs من ناس كتير في مصر والعالم العربي. معظمها ترجمة حرفية من العربي. اتعلمها كـ «أزواج»: الغلط ← الصح، وحطها في [[mistakes.md]].

السبب الأساسي: العربي بيقول «ناقش في» فبنقول [[discuss about]]، و «اشرحلي» فبنقول [[explain me]]، و «من يومين» فبنقول [[since 2 days]]. الحل مش إنك تحفظ grammar، الحل إنك تحفظ الجملة الصح كاملة وتستخدمها.`,
          example: R`Wrong: Let's discuss about the API.       Right: Let's discuss the API.
Wrong: Can you explain me this?           Right: Can you explain this to me?
Wrong: I'm working on it since 2 days.    Right: I've been working on it for 2 days.
Wrong: I didn't understood.               Right: I didn't understand.
Wrong: I am agree.                        Right: I agree.
Wrong: It depends of the config.          Right: It depends on the config.
Wrong: Please revert back to me.          Right: Please get back to me.
Wrong: I have a doubt about this.         Right: I have a question about this.
Wrong: Waiting your reply.                Right: Looking forward to your reply.
Wrong: Kindly do the needful.             Right: Could you please update the config?
Wrong: I will make a search.              Right: I will look into it.
Wrong: Me and Ahmed fixed it.             Right: Ahmed and I fixed it.
Wrong: The meeting is postponed to 3pm.   Right: The meeting has been moved to 3pm.
Wrong: Open the PR and check it.          Right: Please take a look at the PR.
Wrong: Sorry for late.                    Right: Sorry for the delay. / Sorry I'm late.`,
          try: R`دوّر في رسايلك القديمة (Slack أو WhatsApp أو LinkedIn بالإنجليزي) على أي غلطة من الـ ١٥. انسخ ٥ جمل كتبتها فيها غلطة، وصلّحها، وحطها في [[mistakes.md]] بالشكل ده: [[Wrong: ... → Right: ...]]. لو ملقتش، اكتب رسالة لـ tech lead بتطلب مساعدة في bug، واستخدم ٥ من الجمل الصح.`,
          flag: "script",
          deep: {
            why: "الغلطات دي بتبان من أول سطر، ومش بتخلي كلامك مش مفهوم، بس بتخليه يبان «غير محترف» في رسالة لعميل أو انترفيو. وهي محدودة: لو صلحت الـ ١٥ دول هتفرق جدًا.",
            how: R`ليه كل واحدة غلط:
[[discuss]] فعل متعدي، مياخدش [[about]] (بس [[a discussion about]] صح).
[[explain]] مياخدش الشخص على طول: [[explain X to me]].
[[since]] مع نقطة زمنية ([[since Monday]])، و [[for]] مع مدة ([[for 2 days]])، والزمن [[have been + ing]].
بعد [[didn't]] الفعل في الأول: [[understand]].
[[agree]] فعل، مش صفة: [[I agree]].
[[depend on]] دايمًا.
[[revert]] في شغلنا يعني «ترجّع كود»، فـ [[revert back to me]] بتلخبط. قول [[get back to me]] أو [[reply]].
[[doubt]] بالإنجليزي «شك» (مش مصدق)، مش «سؤال».
[[Waiting your reply]] ناقصة [[for]]، والأطبع [[Looking forward to hearing from you]].
[[do the needful]] مفهومة في جنوب آسيا بس غريبة لأغلب الناس: قول بالظبط عايز إيه.
[[make a search]] ترجمة حرفية؛ [[look into it]] = «هشوفها وأدوّر».
[[Me and Ahmed]] في أول الجملة ← [[Ahmed and I]].
[[postponed to 3pm]] ممكن تتفهم إن الميعاد اتأجل ليوم تاني؛ [[moved to]] أوضح.
[[Sorry for late]] ناقصة: [[Sorry for the delay]] أو [[Sorry I'm late]].`,
            when: "راجع الليستة دي قبل أي إيميل أو رسالة مهمة، لحد ما تبقى طبيعية.",
            mistakes: R`تحاول تتعلمهم كلهم مرة واحدة. خد ٣ في الأسبوع، واستخدمهم عمدًا في رسايلك لحد ما يتثبتوا. وبرضه متخافش لدرجة إنك متكتبش: رسالة فيها غلطة أحسن من رسالة مااتبعتتش.`
          },
          lines: [
            R`discuss من غير about.`,
            R`explain X to me.`,
            R`مدة = for، والزمن have been + ing.`,
            R`بعد didn't الفعل في الأول.`,
            R`agree فعل: I agree.`,
            R`depend on دايمًا.`,
            R`revert = ترجّع كود؛ استخدم get back to me.`,
            R`doubt = شك، مش سؤال.`,
            R`Looking forward to (وبعدها اسم أو ing).`,
            R`قول الطلب بالظبط بدل do the needful.`,
            R`look into it = هشوف الموضوع.`,
            R`Ahmed and I في مكان الفاعل.`,
            R`moved to أوضح من postponed to في الساعات.`,
            R`take a look at = بص على. أذوق من «افتح واتأكد».`,
            R`Sorry for the delay (تأخير في رد/شغل) أو Sorry I'm late (ميعاد).`
          ],
          sol: R`مثال لرسالة طلب مساعدة بـ ٥ جمل صح:
[[Hi Mona, could you take a look at a bug when you have a moment? I've been working on it for 2 days. The checkout total depends on the coupon, but it doesn't update after I remove it. Can you explain the cart state logic to me? I'll look into the tests in the meantime. Looking forward to your reply, and sorry for the delay on the ticket.]]

الجمل المستخدمة: [[take a look at]]، و [[I've been working on it for 2 days]]، و [[depends on]]، و [[explain ... to me]]، و [[I'll look into]]، و [[Looking forward to]]، و [[sorry for the delay]].

راجع رسالتك: مفيش [[discuss about]]، ومفيش [[since]] مع مدة، ومفيش [[revert back]]. و [[in the meantime]] = في الوقت ده.`
        }
      ]
    },
    {
      t: "commit messages",
      l: 2,
      n: "سطر عنوان قصير بالـ imperative، وجسم بيقول ليه، و Conventional Commits، و ٢٤ مثال قبل وبعد",
      items: [
        {
          cmd: "commit message كويس",
          title: "شكل الـ commit message الكويس: عنوان قصير وسطر فاضي وجسم بيقول ليه",
          desc: R`الـ commit message ليها شكل ثابت متفق عليه من أيام git الأولى: سطر عنوان قصير (حوالي ٥٠ حرف، وأقصى حد مقبول تقريبًا ٧٢)، وبعده سطر فاضي، وبعده جسم (اختياري) بيشرح [[why]] (ليه) مش [[what]] (إيه)، لأن «إيه» باين في الـ diff.

الـ git tutorial الرسمي بيقول بالنص: [[it's a good idea to begin the commit message with a single short (no more than 50 characters) line summarizing the change, followed by a blank line and then a more thorough description]]. والسطر الأول ده هو الـ title اللي بيظهر في [[git log --oneline]] وفي GitHub وفي أي أداة.

قواعد العنوان: فعل imperative في الأول ([[Fix]] و [[Add]] و [[Remove]] و [[Update]] و [[Rename]] و [[Refactor]])، من غير نقطة في الآخر، ومحدد (فين وإيه). والجسم: جمل عادية بالـ present أو past، سطور حوالي ٧٢ حرف.`,
          example: R`Fix cart total when a coupon is removed

The total was computed once when the coupon was applied and never
recalculated, so removing the coupon kept the discount. Recalculate
the total in the cart reducer instead of in the coupon handler.

Closes #42`,
          try: R`خد تغيير عملته قريب (أو اعمل تغيير صغير) واكتب commit بالشكل ده: [[git commit]] من غير [[-m]] عشان يفتحلك المحرر، واكتب عنوان أقل من ٥٠ حرف، وسطر فاضي، وجملتين «ليه». بعدها [[git log -1]] وشوف الشكل. ولو غلطت في الرسالة: [[git commit --amend]] (قبل الـ push بس).`,
          flag: "script",
          deep: {
            why: "بعد ٦ شهور، الـ commit message هي الحاجة الوحيدة اللي هتقولك (أو لزميلك) ليه الكود ده كده. [[git log]] و [[git blame]] بيوصلوك للـ commit، ولو الرسالة «fix» مش هتفيدك بحاجة. وفي الانترفيو وفي GitHub profile، الـ history بيبان.",
            how: R`الجسم بيجاوب ٣ أسئلة: المشكلة كانت إيه؟ ليه حصلت؟ الحل ده ليه؟ مثال: [[The total was computed once ... and never recalculated]] (السبب)، [[so removing the coupon kept the discount]] (الأثر)، [[Recalculate the total in ...]] (الحل بالـ imperative).

كلمات مفيدة للجسم: [[Previously, ...]] = قبل كده، و [[Now, ...]] = دلوقتي، و [[so that ...]] = عشان، و [[instead of]] = بدل، و [[This caused ...]] = ده سبب، و [[This avoids ...]] = ده بيتجنب، و [[Note that ...]] = خد بالك إن.

والـ footer في الآخر: [[Closes #42]] يربط الـ issue ويقفلها لما يتدمج (درس [[Closes #12]] في «تاب Git»)، و [[Co-authored-by:]] لو حد شاركك.

ومحتاج جسم إمتى؟ لما التغيير مش واضح من العنوان: bug fix، أو قرار تصميم، أو حاجة غريبة. تغيير تافه ([[Fix typo in README]]) عنوان كفاية.`,
            when: "كل commit. ولو الفريق بيعمل squash merge، عنوان الـ PR بيبقى هو الـ commit، فنفس القواعد على عنوان الـ PR.",
            mistakes: R`[[fix]] و [[update]] و [[wip]] و [[changes]] و [[asdf]] و [[final]] و [[final2]]: مفيش معلومة. وعنوان طويل جدًا فيه كل حاجة. وتشرح «إيه» في الجسم (غيّرت السطر ده) بدل «ليه». و [[Fixed a bug where the user was not able to see the cart when he was logged in]] طويل وبالماضي؛ الأحسن [[Show cart for logged-in users]].`
          },
          lines: [
            R`العنوان: imperative، أقل من ٥٠ حرف، من غير نقطة. «صلّح إجمالي السلة لما الكوبون يتشال».`,
            R`السبب: «الإجمالي كان بيتحسب مرة واحدة لما الكوبون يتطبّق ومكانش بيتحسب تاني،»`,
            R`الأثر: «فشيل الكوبون كان بيسيب الخصم». وبعدين الحل بالـ imperative: «احسب الإجمالي...»`,
            R`«... في الـ reducer بتاع السلة بدل الـ handler بتاع الكوبون».`,
            R`footer: يربط الـ issue رقم ٤٢ ويقفلها لما يتدمج في الـ default branch.`
          ],
          sol: R`شكل صح في [[git log -1]]:
[[Validate email format on the signup form]]
(سطر فاضي)
[[Invalid emails reached the API and returned a 500 from the database.]]
[[Check the format on the client so the user sees the error immediately.]]

راجع: العنوان [[Validate email format on the signup form]] = ٤٠ حرف، فعل imperative، من غير نقطة. والجسم بيقول ليه (كانت بتوصل للـ API وتعمل 500) مش إيه (ضفت regex).

لو [[git log -1]] ورّاك العنوان والجسم لازقين من غير سطر فاضي، git هيعتبرهم عنوان واحد طويل. صلّح بـ [[git commit --amend]] (لو لسه معملتش push).`
        },
        {
          cmd: "Conventional Commits",
          title: "Conventional Commits: feat و fix و chore و الـ scope و ! للـ breaking change",
          desc: R`Conventional Commits مواصفة (الإصدار 1.0.0) بتضيف «نوع» في أول الرسالة، عشان الأدوات تفهم الـ history: تعمل changelog لوحدها، وتحدد الإصدار الجاي (semver). الشكل من المواصفة:

[[<type>[optional scope]: <description>]] وبعدين سطر فاضي وجسم اختياري وسطر فاضي و footers اختيارية.

المواصفة بتعرّف نوعين بس: [[feat]] (ميزة جديدة، يقابلها MINOR) و [[fix]] (تصليح bug، يقابلها PATCH). وبتقول إن أنواع تانية مسموحة زي [[build]] و [[chore]] و [[ci]] و [[docs]] و [[style]] و [[refactor]] و [[perf]] و [[test]]. والـ breaking change (MAJOR) بيتعلّم بـ [[!]] قبل الـ [[:]] مباشرة، أو بـ footer اسمه [[BREAKING CHANGE:]] بحروف كبيرة.

والـ config المشهور [[@commitlint/config-conventional]] بيسمح بالأنواع دي بالظبط: [[build]] و [[chore]] و [[ci]] و [[docs]] و [[feat]] و [[fix]] و [[perf]] و [[refactor]] و [[revert]] و [[style]] و [[test]]، وبيطلب النوع بحروف صغيرة، والعنوان مش أكتر من ١٠٠ حرف، والوصف ميبدأش بحرف كبير ومينتهيش بنقطة.`,
          example: R`feat: add password reset by email
fix(auth): handle expired refresh token
docs: explain how to run migrations locally
refactor(cart): extract price calculation into a pure function
perf: cache product list for 60 seconds
test: add e2e test for checkout
ci: run tests on Node 22 and 24
chore: bump eslint to v9
feat!: drop support for Node 18
fix(api): return 409 when email is already registered
BREAKING CHANGE: the /users endpoint now requires authentication.`,
          try: R`في فولدر تجربة: [[npm i -D @commitlint/cli @commitlint/config-conventional]]، واعمل [[commitlint.config.mjs]] فيه [[export default { extends: ["@commitlint/config-conventional"] };]]. وبعدين جرّب: [[echo "Added login page" | npx commitlint]] و [[echo "feat: Added login page." | npx commitlint]] و [[echo "Feat: add x" | npx commitlint]] و [[echo "feat: add login page" | npx commitlint]]. اقرا كل رسالة خطأ وصلّح الـ commit لحد ما يعدّي.`,
          flag: "script",
          deep: {
            why: "مشاريع ومكتبات كتير بتطلبها (وبتفحصها في CI أو hook)، وأدوات زي release-please و semantic-release بتعتمد عليها. وحتى لو مش مطلوبة، النوع في الأول بيخلي الـ history سهل تقراه.",
            how: R`اختيار النوع: اليوزر هيحس بحاجة جديدة؟ [[feat]]. bug اتصلح؟ [[fix]]. الكود اتغير من غير ما السلوك يتغير؟ [[refactor]]. أسرع؟ [[perf]]. اختبارات بس؟ [[test]]. docs بس؟ [[docs]]. تنسيق (مسافات، فواصل)؟ [[style]] (مش CSS!). CI؟ [[ci]]. أدوات البناء أو الـ dependencies؟ [[build]] أو [[chore]]. غير كده؟ [[chore]].

الـ scope اختياري بين قوسين: اسم الجزء اللي اتغير ([[auth]] و [[cart]] و [[api]]). الفريق بيتفق على الأسماء.

الوصف بعد [[: ]] بحرف صغير (في config-conventional) وبالـ imperative ومن غير نقطة: [[feat: add ...]] مش [[feat: Added ...]].

إعداد الـ hook نفسه (husky و commitlint) في درس [[commitlint]] في «تاب فحص الكود».`,
            when: "لو المشروع بيستخدمها (بص على الـ history أو CONTRIBUTING.md)، أو في مشاريعك انت عشان الـ changelog.",
            mistakes: R`[[style]] بمعنى CSS: لأ، style = تنسيق الكود من غير تغيير معناه. تغيير CSS بيغيّر شكل الموقع = [[feat]] أو [[fix]]. و [[Feat:]] بحرف كبير. و [[feat: Added ...]] بالماضي. و [[fix: fix bug]]: مكرر ومفيهوش معلومة، [[fix(cart): keep discount after page reload]]. و [[BREAKING CHANGES:]] بالجمع أو بحروف صغيرة: المواصفة بتقول [[BREAKING CHANGE]] (و [[BREAKING-CHANGE]] مرادفها).`
          },
          lines: [
            R`feat = ميزة. «ضيف reset للباسورد بالإيميل».`,
            R`fix + scope (auth). «اتعامل مع refresh token خلصت مدته».`,
            R`docs. «اشرح إزاي تشغّل الـ migrations على جهازك».`,
            R`refactor. «طلّع حساب السعر في دالة pure». extract = تطلّع/تفصل.`,
            R`perf. «خزّن ليستة المنتجات ٦٠ ثانية».`,
            R`test. «ضيف اختبار e2e للـ checkout».`,
            R`ci. «شغّل الاختبارات على Node 22 و 24».`,
            R`chore. «رقّي eslint لـ v9». bump = ترفع رقم الإصدار.`,
            R`! = breaking change. «وقف دعم Node 18». drop = تبطّل.`,
            R`fix + scope api. «رجّع 409 لما الإيميل متسجل قبل كده».`,
            R`footer: BREAKING CHANGE بحروف كبيرة. «الـ /users دلوقتي محتاج تسجيل دخول».`
          ],
          sol: R`اللي هيطلعلك (commitlint 21، سبتمبر ٢٠٢٦):
[[Added login page]] ← [[✖ subject may not be empty [subject-empty]]] و [[✖ type may not be empty [type-empty]]]. «الوصف والنوع مينفعش يبقوا فاضيين». يعني مفيش [[type:]] في الأول.
[[feat: Added login page.]] ← [[✖ subject must not be sentence-case [subject-case]]] و [[✖ subject may not end with full stop [subject-full-stop]]]. «الوصف مينفعش يبدأ بحرف كبير» و «مينفعش ينتهي بنقطة».
[[Feat: add x]] ← [[✖ type must be lower-case [type-case]]] و [[✖ type must be one of [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test] [type-enum]]].
[[feat: add login page]] ← مفيش أي خطأ.

لاحظ إن رسايل commitlint نفسها بتستخدم [[must]] و [[may not]] و [[must not]]: درس «optional و defaults to». و [[full stop]] = نقطة (بريطاني)، و [[sentence-case]] = أول حرف كبير زي الجملة.`
        },
        {
          cmd: "٢٤ commit قبل وبعد",
          title: "٢٤ commit message حقيقي: الغلط والصح",
          desc: R`أحسن طريقة تتعلم بيها: تشوف commits وحشة وتشوف نسختها الكويسة، لحد ما عينك تتعود. دي أشهر أنماط الغلط عند المبتدئين (مش بس المصريين)، وجنب كل واحد النسخة الصح بشكل Conventional Commits.

الأنماط: رسالة فاضية من المعنى ([[fix]] و [[update]] و [[wip]])، وماضي بدل imperative ([[Added]] و [[Fixed]])، ورسالة طويلة جدًا في السطر الأول، ورسالة بتقول «إيه» مش «فين»، وعربي مكتوب بحروف إنجليزي، وكذا تغيير في commit واحد (قسّمه).`,
          example: R`Before: fix                              After: fix(cart): keep discount after page reload
Before: update                           After: docs: add setup steps to README
Before: wip                              After: feat(profile): add avatar upload (UI only)
Before: Added login page                 After: feat(auth): add login page
Before: Fixed the bug                    After: fix(api): return 404 for unknown product IDs
Before: changes                          After: refactor: rename getData to fetchOrders
Before: final version                    After: chore: remove debug logs
Before: final2                           After: fix: correct typo in checkout button
Before: fixed bug in login when user enters wrong password he gets 500 error instead of 401
After:  fix(auth): return 401 instead of 500 on wrong password
Before: sala7t el moshkla                After: fix(search): handle empty query
Before: Updated package.json             After: build: add zod dependency
Before: css                              After: fix(navbar): stop overlap on small screens
Before: tests                            After: test(cart): cover coupon removal
Before: fix eslint                       After: style: apply eslint autofix
Before: new feature                      After: feat(orders): export orders as CSV
Before: Merge fixes and new UI and API   After: split into three commits: fix(api) / feat(ui) / refactor(api)
Before: README                           After: docs: document environment variables
Before: speed                            After: perf(products): add index on category_id
Before: remove stuff                     After: chore: remove unused lodash dependency
Before: fix CI                           After: ci: use npm ci instead of npm install
Before: Update index.js                  After: fix(server): read PORT from environment
Before: added dark mode.                 After: feat(theme): add dark mode toggle
Before: hotfix!!!                        After: fix(payments): verify webhook signature
Before: security                         After: fix(auth): hash passwords with bcrypt instead of md5`,
          try: R`شغّل [[git log --oneline -30]] في أكبر مشروع عندك. اختار أوحش ١٠ رسايل واكتبلهم نسخة «After» بنفس الطريقة (افتح الـ commit بـ [[git show <hash>]] عشان تعرف اتغير إيه فعلًا). متعدّلش الـ history القديم على الـ main، ده تمرين كتابة بس.`,
          flag: "script",
          deep: {
            why: R`الـ history بتاعك على GitHub بيتقري: من الـ recruiters، ومن زمايلك، ومنك انت بعد سنة. و [[git log --oneline]] فيه رسايل واضحة = تقدر تلاقي أي تغيير في ثواني.`,
            how: R`الوصفة: [[type(scope): verb + what + (where/when)]].

أفعال بتنفع في الوصف: [[add]] و [[remove]] و [[fix]] مش كفاية لوحدها بس مع التفاصيل تنفع، و [[handle]] (تتعامل مع حالة)، و [[prevent]] (تمنع)، و [[allow]] (تسمح)، و [[show]] و [[hide]]، و [[rename]]، و [[move]]، و [[extract]]، و [[replace X with Y]]، و [[use X instead of Y]]، و [[return]]، و [[validate]]، و [[support]]، و [[cover]] (في الاختبارات)، و [[bump]] (إصدار)، و [[drop]] (وقف دعم)، و [[document]] (تكتب docs).

والـ bug fix الأحسن يوصف السلوك الصح الجديد مش الـ bug: [[return 401 instead of 500 on wrong password]] أحسن من [[fix 500 error]].

ولو محتاج «و» في العنوان ([[fix X and add Y]]) غالبًا دول commitين.`,
            when: "كل commit، وخصوصًا قبل ما تعمل push لـ branch هيتعمله review.",
            mistakes: R`تكتب commits كويسة في مشاريعك الشخصية بس وتكسل في الشغل (أو العكس). وتعدّل history الـ main بـ rebase عشان تجمّل الرسايل: متعملش كده على branch مشترك. وتكتب بالعربي بحروف إنجليزي ([[sala7t el moshkla]]): محدش هيعرف يدوّر بيها، وأي حد مش مصري مش هيفهمها.`
          },
          lines: [
            "fix لوحدها ← فين وإيه.",
            "update ← النوع docs وإيه اللي اتضاف.",
            "wip = شغل مش خلصان ← قول اللي خلص فعلًا.",
            R`Added (ماضي) ← add (imperative) + scope.`,
            "Fixed the bug ← أنهي bug؟ السلوك الصح.",
            "changes ← الـ refactor بالظبط.",
            "final version ← اللي اتعمل فعلًا.",
            "final2 ← وصف التغيير.",
            "عنوان طويل جدًا بالماضي ومن غير فواصل...",
            "... ← نسخة قصيرة بتوصف السلوك الصح (٥٥ حرف تقريبًا).",
            "عربي بحروف إنجليزي ← إنجليزي واضح.",
            R`اسم ملف ← build + إيه اتضاف.`,
            R`css ← fix + الـ component + المشكلة. (مش style!)`,
            "tests ← test + بيغطي إيه. cover = يغطي.",
            R`fix eslint ← style (تنسيق من غير تغيير معنى). autofix = تصليح أوتوماتيك.`,
            "new feature ← أنهي feature.",
            "٣ حاجات في commit ← قسّمهم ٣ commits.",
            "README ← docs + اتوثّق إيه.",
            "speed ← perf + التغيير.",
            "stuff ← اسم الحاجة. unused = مش مستخدمة.",
            "fix CI ← ci + التغيير.",
            "Update index.js (رسالة GitHub الافتراضية) ← وصف حقيقي.",
            "ماضي ونقطة ← imperative من غير نقطة.",
            R`hotfix!!! ← الـ ! في Conventional Commits يعني breaking، مش «مستعجل». قول المشكلة.`,
            R`security ← إيه بالظبط. instead of = بدل.`
          ],
          sol: R`أمثلة لتحويل رسايل حقيقية بتتكرر:
[[Update App.jsx]] ← تفتح [[git show]] وتلاقي إنه ضاف loading spinner ← [[feat(ui): show spinner while products load]].
[[fix bug]] ← كان بيصلّح إن الفورم بيتبعت مرتين ← [[fix(checkout): prevent double submit]].
[[.]] أو [[..]] ← كان بيغيّر الـ port ← [[fix(server): read PORT from environment]].
[[responsive]] ← [[fix(layout): stack cards on screens under 640px]].
[[first commit]] على مشروع جديد: دي مقبولة فعلًا ([[chore: initial commit]] أو [[Initial commit]]).

لو لقيت نفسك مش عارف تكتب After لأنك مش فاكر الـ commit عمل إيه: ده بالظبط سبب إن الرسالة الأصلية كانت وحشة. ودي أحسن حجة تقنع بيها نفسك.`
        }
      ]
    },
    {
      t: "PRs و code review",
      l: 2,
      n: "عنوان ووصف PR بـ template، وتعليقات review مؤدبة وواضحة (سؤال ولا اقتراح ولا blocker)، وإزاي ترد على review",
      items: [
        {
          cmd: "وصف PR",
          title: "عنوان PR ووصفه: template فيه What و Why و How to test",
          desc: R`الـ PR هو «طلب» إن كودك يتدمج، والوصف هو اللي بيقنع المراجع ويوفر وقته. المراجع محتاج يعرف في دقيقة: إيه اتغير؟ ليه؟ يجرّبه إزاي؟ فيه حاجة خطيرة؟

العنوان: نفس قواعد الـ commit (imperative، محدد، وممكن Conventional Commits). لو الفريق بيعمل squash merge، العنوان ده هو اللي هيفضل في الـ history.

الوصف بقالب بسيط: [[## What]] إيه اتغير (نقط)، و [[## Why]] ليه (والـ issue)، و [[## How to test]] خطوات المراجع يجرّب، و [[## Screenshots]] لو فيه UI، و [[## Notes]] أي حاجة المراجع لازم يعرفها (حاجة مش متأكد منها، أو حاجة سبتها عن قصد لـ PR تاني). وجملة [[This PR ...]] بالـ present simple (مع الـ s).`,
          example: R`feat(orders): export orders as CSV
## What
- Add an "Export CSV" button to the orders page
- Add GET /api/orders/export, which streams a CSV file
## Why
Admins copy orders into Excel by hand every week (#118).
## How to test
1. Log in as admin@example.com
2. Open /admin/orders and click "Export CSV"
3. Open the file: it should have one row per order
## Notes
- Large exports are streamed, so memory stays flat.
- Filters are not applied yet; I'll add them in a follow-up PR.`,
          try: R`خد آخر PR عملته (أو branch عندك) واكتبله وصف بالقالب ده. وبعدين اعمل ملف [[.github/pull_request_template.md]] في repo بتاعك فيه العناوين دي بس، عشان GitHub يحطها لوحده في أي PR جديد.`,
          flag: "script",
          deep: {
            why: "المراجع مشغول، و PR من غير وصف بيستنى أيام أو بياخد review سطحي. الوصف الكويس = review أسرع وأدق، وبيبيّن إنك فاهم تغييرك. وفي الـ open source، PR من غير وصف ممكن يتقفل من غير ما حد يبص عليه.",
            how: R`جمل جاهزة:
[[This PR adds / fixes / removes / refactors ...]]
[[Closes #118]] أو [[Part of #118]] (لو مش بيخلّصها كلها).
[[No UI changes.]] أو [[No behavior change; this is a pure refactor.]]
[[I'm not sure about ...; happy to change it.]] = مش متأكد من كذا، ومعنديش مشكلة أغيّره.
[[Out of scope: ...]] = مش جزء من الـ PR ده.
[[Follow-up: ...]] = هيتعمل في PR جاي.
[[Breaking change: ...]] = حاجة هتكسر حد.
[[Reviewers: please focus on ...]] = ركزوا على كذا.

و [[Draft PR]] لما لسه مش جاهز بس عايز رأي بدري (شوف [[draft PR و التقسيم]] في «تاب هندسة البرمجيات»). و [[gh pr create]] بيفتح المحرر بالـ template (درس [[gh pr]] في «تاب Git»).`,
            when: "كل PR، حتى في مشاريعك الشخصية (بيبان في GitHub profile وبيتعلمك العادة).",
            mistakes: R`وصف فاضي أو «as discussed». و [[Please review my code]] من غير أي معلومة. وقايمة بكل ملف اتغير (ده باين في الـ diff). و PR فيه ٣٠ ملف و ٣ مواضيع مختلفة: قسّمه. و [[This PR add]] من غير s.`
          },
          lines: [
            "العنوان: Conventional Commits، imperative، محدد.",
            R`«ضيف زرار Export CSV في صفحة الأوردرات».`,
            R`«ضيف endpoint بيعمل stream لملف CSV». which = اللي.`,
            R`السبب ورقم الـ issue: «الأدمنز بينسخوا الأوردرات لـ Excel بإيدهم كل أسبوع». by hand = يدوي.`,
            R`خطوة ١: «سجّل دخول بالأدمن».`,
            R`خطوة ٢: «افتح الصفحة ودوس Export CSV».`,
            R`خطوة ٣ ومعاها النتيجة المتوقعة: «المفروض يبقى فيه صف لكل أوردر». should = المتوقع.`,
            R`«الـ exports الكبيرة بتتعمل stream، فالذاكرة بتفضل ثابتة». flat = مش بتزيد.`,
            R`«الفلاتر لسه مش مطبّقة، هضيفها في PR بعده». follow-up = متابعة.`
          ],
          sol: R`مثال على PR صغير:
[[fix(auth): return 401 instead of 500 on wrong password]]
[[## What]]
[[- Catch InvalidPasswordError in the login route and return 401]]
[[- Add a test for the wrong-password case]]
[[## Why]]
[[Wrong passwords crashed the handler and returned a 500 (#57).]]
[[## How to test]]
[[1. npm test]]
[[2. POST /api/login with a wrong password: the response should be 401 {"error": "Invalid email or password"}]]
[[## Notes]]
[[- The message is the same for a wrong email, so we don't reveal which emails exist.]]

والـ template في [[.github/pull_request_template.md]] فيه العناوين بس ([[## What]] و [[## Why]] و [[## How to test]] و [[## Notes]])، و GitHub بيحطه في خانة الوصف أوتوماتيك لما تفتح PR.

راجع: كل جملة فيها s لو الفاعل مفرد، والـ How to test فيه نتيجة متوقعة ([[should be 401]]) مش خطوات بس.`
        },
        {
          cmd: "تعليقات review",
          title: "تكتب تعليق review مؤدب وواضح: nit و suggestion و blocker و سؤال",
          desc: R`تعليق الـ review الكويس بيقول ٣ حاجات: المشكلة، وليه مهمة، وقد إيه مهمة (لازم تتصلح قبل الدمج، ولا رأي). وبيتكتب بلغة بتتكلم عن الكود مش عن الشخص.

كتير من الفرق بتستخدم «labels» في أول التعليق عشان الدرجة تبان: [[nit:]] (nitpick) حاجة صغيرة جدًا ومش لازمة، و [[suggestion:]] اقتراح، و [[question:]] سؤال بجد مش هجوم، و [[issue:]] أو [[blocking:]] لازم تتصلح قبل الدمج، و [[praise:]] مدح لحاجة حلوة. (فيه مواصفة اسمها Conventional Comments بتقترح الشكل ده.)

الأسلوب: أسئلة واقتراحات بدل أوامر ([[What do you think about ...?]] بدل [[Change this]])، و [[we]] بدل [[you]] ([[We could ...]])، واقتراح الحل مع المشكلة. التفاصيل غير اللغوية في درس [[تعليق review]] في «تاب هندسة البرمجيات».`,
          example: R`nit: typo in the variable name, "recieve" -> "receive".
suggestion: What do you think about extracting this into a helper? It's used in three places.
question: Is there a reason we fetch the user twice here? I might be missing something.
blocking: This query builds SQL from user input, so it's open to SQL injection. Could we use a parameterized query instead?
issue: If the API returns 404, $__btuser$__bt is undefined and the page crashes. Should we handle that case?
praise: Nice test coverage on the edge cases!
Wrong: Why did you do this? This is wrong.
Right: I'm not sure this handles an empty list. What happens if items is []?
Wrong: Change it to map.
Right: Could we use map() here? It would avoid mutating the array.`,
          try: R`خد PR لزميل (أو PR قديم بتاعك، أو PR في مشروع open source) واكتب ٣ تعليقات: واحد [[nit:]] وواحد [[question:]] وواحد [[suggestion:]] أو [[blocking:]]. كل واحد فيه المشكلة وليه والحل المقترح، ومن غير ولا جملة فيها [[you are wrong]].`,
          flag: "script",
          deep: {
            why: "النص في الـ review بيتقري من غير نبرة صوت ولا تعبيرات وش، فجملة عادية بالعربي ممكن تتقري بالإنجليزي كأنها هجوم. والإنجليزي المهني بيعتمد على «التلطيف» (softening) بشكل كبير. لو اتعلمته، زمايلك هيحبوا الـ reviews بتاعتك.",
            how: R`عبارات التلطيف:
[[Could we ...?]] و [[What do you think about ...?]] و [[Have you considered ...?]] = اقتراح.
[[I might be missing something, but ...]] = يمكن أنا اللي فاتني حاجة.
[[I'm not sure ...]] و [[I wonder if ...]] = شك مؤدب.
[[It might be worth ...]] = ممكن يستاهل.
[[Not a blocker, but ...]] و [[Optional:]] = مش لازم.
[[Feel free to ignore]] = لو مش عاجبك سيبه.
[[Happy to discuss]] = نتكلم لو حابب.

وعبارات الحزم (لما الموضوع مهم بجد): [[This needs to be fixed before we merge because ...]] و [[This will break ... in production]]. الحزم مش قلة أدب لو فيه سبب واضح.

و [[LGTM]] = Looks Good To Me (موافقة). و [[PTAL]] = Please Take Another Look. و [[WDYT]] = What Do You Think. و [[IMO]] / [[IMHO]] = In My (Humble) Opinion. و [[FYI]] = For Your Information. و [[TL;DR]] = الخلاصة.

لاحظ في المثال: الـ [[issue:]] كاتب السيناريو ([[If the API returns 404]]) والنتيجة ([[the page crashes]]). ده بيخلي التعليق مقنع مش رأي.`,
            when: "أي review، وكمان في تعليقات الـ issues والـ design docs.",
            mistakes: R`[[Why you did this?]]: غلط grammar ([[Why did you do this?]]) وكمان بيتقري هجومي. و [[This is wrong]] من غير سبب. و [[Please fix]] على كل حاجة من غير ما تفرّق بين nit و blocker، فالمراجَع بيتوه. و [[Kindly]] كتير: بتبان رسمية زيادة. وتعليقات بالـ ALL CAPS: بتتقري زعيق.`
          },
          lines: [
            R`nit = حاجة صغيرة. «غلطة إملائية في اسم المتغير». -> = تبقى.`,
            R`suggestion بسؤال: «إيه رأيك نطلّع ده في helper؟ مستخدم في ٣ أماكن».`,
            R`question حقيقي: «فيه سبب إننا بنجيب اليوزر مرتين؟ يمكن فاتني حاجة».`,
            R`blocking + السبب + الحل: «ده بيبني SQL من إدخال اليوزر فمعرّض لـ SQL injection. ممكن نستخدم parameterized query؟»`,
            R`issue + سيناريو: «لو الـ API رجّع 404، user هيبقى undefined والصفحة هتقع. نتعامل مع الحالة دي؟»`,
            R`praise = مدح. «تغطية حلوة للحالات الطرفية». edge cases = الحالات النادرة.`,
            R`غلط: هجومي ومن غير سبب.`,
            R`صح: شك مؤدب + سيناريو محدد.`,
            R`غلط: أمر من غير سبب.`,
            R`صح: اقتراح + فايدته. mutate = تعدّل الأصل.`
          ],
          sol: R`أمثلة لـ ٣ تعليقات صح:
[[nit: "lenght" -> "length" in line 24.]]
[[question: Is the setTimeout here needed? I might be missing something, but the data is already loaded at this point.]]
[[suggestion: What do you think about moving the price formatting into a formatPrice() helper? The same logic is in Cart.tsx and Checkout.tsx.]]
أو لو فيه مشكلة حقيقية:
[[blocking: The API key is hardcoded in this file and will end up in the client bundle. Could we move it to the backend and call it through our API?]]

راجع كل تعليق: فيه المشكلة؟ فيه ليه مهمة؟ فيه اقتراح؟ باين قد إيه مهم (nit/blocking)؟ مفيش [[you]] كتير؟ لو كتبت [[You forgot to handle errors]]، خليها [[It looks like errors aren't handled here. Should we add a try/catch?]].`
        },
        {
          cmd: "ترد على review",
          title: "ترد على تعليقات الـ review: Done و Good catch و تختلف بأدب",
          desc: R`لما حد يراجع كودك، كل تعليق محتاج رد (حتى لو كلمة)، عشان المراجع يعرف إنك شفته وعملت إيه. الردود بتتقسم ٤ أنواع: وافقت وصلّحت، أو وافقت بس هتعمله بعدين، أو عندك سؤال، أو مختلف معاه وعندك سبب.

والاختلاف عادي ومطلوب، بس بسبب مش بإحساس: [[I'd prefer to keep it because ...]] مع سبب تقني، أو اقتراح حل وسط. ولو النقاش طول (أكتر من ردين تلاتة)، اقترح مكالمة: [[Happy to jump on a quick call]].`,
          example: R`Good catch, thanks! Fixed in a1b2c3d.
Done.
Makes sense. I extracted it into formatPrice() in the latest commit.
Good point. I'll handle that in a follow-up PR (#131) to keep this one small.
I'm not sure I understand. Do you mean moving the check to the middleware?
I'd prefer to keep it inline, because it's only used here and a helper would hide the query.
You're right, I missed that case. Added a test for it.
I tried that first, but it caused a re-render loop. Happy to discuss if you see another way.
Thanks for the review! I addressed all comments. PTAL.`,
          try: R`تخيّل إن جالك التعليقات الـ ٦ اللي في درس «تعليقات review» على PR بتاعك. اكتب رد لكل واحد: اتنين موافقة وتصليح، وواحد «هعمله في PR تاني»، وواحد سؤال توضيح، وواحد اختلاف بسبب تقني، وآخر رسالة للمراجع بعد ما خلصت.`,
          flag: "script",
          deep: {
            why: "الرد بيقفل الحلقة: المراجع ميضطرش يدوّر إذا كنت صلحت ولا لأ. والطريقة اللي بترد بيها على النقد بتبني سمعتك في الفريق أكتر من الكود نفسه.",
            how: R`عبارات:
موافقة: [[Good catch!]] و [[Good point.]] و [[Makes sense.]] و [[You're right.]] و [[Done.]] و [[Fixed in <commit>.]] و [[Updated.]].
تأجيل: [[I'll handle that in a follow-up.]] و [[Created #131 to track it.]] و [[Out of scope for this PR, but good idea.]]
سؤال: [[Could you clarify ...?]] و [[Do you mean ...?]] و [[Just to make sure I understand: ...]]
اختلاف: [[I see your point, but ...]] و [[I'd prefer to ... because ...]] و [[I considered that, but ...]] و [[I tried that, but ...]]
خلصت: [[I addressed all comments.]] و [[Ready for another look.]] و [[PTAL]].

و [[address]] هنا مش «عنوان»، دي «اتعاملت مع». و [[resolve]] الـ thread على GitHub: خليه للمراجع لو التعليق مهم (شوف عادة الفريق). وتفاصيل التعامل مع الـ review نفسه في درس [[تستقبل review]] في «تاب هندسة البرمجيات».`,
            when: "بعد أي review، قبل ما تطلب المراجعة تاني.",
            mistakes: R`تصلّح من غير ما ترد. أو ترد [[ok]] على كل حاجة حتى اللي مش موافق عليها. أو تاخدها شخصي وترد بدفاع طويل. و [[I will fix it later]] من غير issue: «later» بتبقى «never». و [[I have fixed]] من غير مفعول: [[I fixed it]] أو [[Fixed.]].`
          },
          lines: [
            R`«ملاحظة حلوة، شكرًا! اتصلحت في الـ commit ده». اكتب الـ hash عشان يلاقيه.`,
            R`كلمة واحدة كفاية للـ nits.`,
            R`«منطقي. طلّعته في formatPrice في آخر commit».`,
            R`«نقطة حلوة. هعملها في PR بعده (#131) عشان ده يفضل صغير».`,
            R`سؤال توضيح: «مش متأكد إني فاهم. تقصد ننقل الـ check للـ middleware؟»`,
            R`اختلاف بسبب: «أفضّل أسيبه هنا، لأنه مستخدم هنا بس والـ helper هيخبّي الـ query».`,
            R`«عندك حق، فاتتني الحالة دي. ضفت اختبار ليها».`,
            R`«جربت ده الأول بس عمل loop في الـ render. نتكلم لو شايف طريقة تانية».`,
            R`الرسالة الأخيرة: «اتعاملت مع كل التعليقات. بص تاني لو سمحت».`
          ],
          sol: R`ردود صح على التعليقات الـ ٦:
nit (recieve) ← [[Fixed, thanks!]]
suggestion (helper) ← [[Good idea. Extracted it into getUserName() in 4f5e6a7.]]
question (fetch twice) ← [[Good catch, the second fetch was left over from debugging. Removed.]]
blocking (SQL injection) ← [[You're right, thanks for catching this. Switched to a parameterized query and added a test with a malicious input.]]
issue (404) ← [[I'll handle the 404 case in a follow-up to keep this PR small: #140.]] (بس لو هي فعلًا مش هتوقع الإنتاج، وإلا صلّحها دلوقتي)
اختلاف (على أي واحد) ← [[I considered a helper, but it's only used here and I think inline is easier to read. Happy to change it if you feel strongly.]]
وفي الآخر: [[Thanks for the review! I addressed all comments except the 404 one (#140). Ready for another look.]]

لاحظ: [[if you feel strongly]] = «لو انت شايف إنها مهمة» (بتسيبله القرار بأدب). ولو كتبت رد فيه [[but you are wrong]]، شيل النص ده وخلي السبب التقني يتكلم.`
        }
      ]
    },
    {
      t: "issues و bug reports",
      l: 2,
      n: "bug report فيه steps to reproduce و expected و actual، و feature request وسؤال لمشروع open source من غير ما حد يقفله",
      items: [
        {
          cmd: "bug report",
          title: "bug report: Steps to reproduce و Expected و Actual و Environment",
          desc: R`الـ bug report الكويس بيخلي أي حد يشوف الـ bug بعينه في دقيقتين. والشكل ده ثابت في كل الفرق وكل مشاريع الـ open source تقريبًا (وأغلبها عندها issue template بيطلبه):

[[Title]] جملة بتوصف السلوك الغلط ومكانه، و [[Steps to reproduce]] خطوات مرقمة بالـ imperative، و [[Expected behavior]] كان المفروض يحصل إيه، و [[Actual behavior]] حصل إيه فعلًا (ومعاه رسالة الخطأ بالنص، و screenshot)، و [[Environment]] الإصدارات (OS و browser و Node و المكتبة)، و [[Additional context]] أي حاجة تانية (بيحصل دايمًا ولا ساعات؟ بدأ إمتى؟).

الكلمة المفتاحية: [[reproduce]] = تخلي الـ bug يحصل تاني عمدًا. و [[repro]] اختصارها. و [[minimal reproduction]] = أصغر كود ممكن بيطلّع الـ bug.`,
          example: R`Title: Cart total ignores coupon after page reload
Steps to reproduce
1. Add any product to the cart.
2. Apply the coupon SAVE10.
3. Reload the page.
Expected behavior
The total still includes the 10% discount.
Actual behavior
The discount disappears, but the coupon is still shown as applied.
No error in the console.
Environment
- Chrome 140 on Windows 11
- Production (shop.example.com), commit 3f2a1bc
Additional context
It happens every time. It started after the cart was moved to localStorage (#97).`,
          try: R`اختار bug حقيقي في مشروع عندك (أو في موقع بتستخدمه) واكتبله report بالشكل ده بالإنجليزي. وبعدين ادّيه لحد تاني من غير ما تشرحله: لو قدر يعمل reproduce من الخطوات بس، الـ report ناجح.`,
          flag: "script",
          deep: {
            why: "bug report غامض ([[the cart is broken]]) بيضيع ساعات في «بيحصل إزاي؟» و «عندك إيه؟». والـ report الكويس نصه الحل: لما تكتب الخطوات والفرق بين expected و actual، كتير بتلاقي السبب وانت بتكتب.",
            how: R`عنوان كويس = [[what + where + when]]: [[Cart total ignores coupon after page reload]]. مش [[Cart bug]] ولا [[URGENT!!! not working]].

الخطوات: imperative ومرقّمة وكل خطوة حاجة واحدة. ابدأ من حالة معروفة ([[Log in as a new user]]).

Expected و Actual: جملتين بالـ present simple. الفرق بينهم هو الـ bug. [[Actual]] فيه رسالة الخطأ منسوخة كنص (مش صورة بس)، عشان حد يقدر يدوّر بيها.

كلمات مفيدة: [[consistently]] / [[every time]] = دايمًا، و [[intermittently]] / [[sometimes]] = ساعات، و [[regression]] = حاجة كانت شغالة وباظت، و [[workaround]] = حل مؤقت، و [[It started after ...]] = بدأ بعد، و [[I can't reproduce it locally]] = مش بيحصل عندي.

تفاصيل الـ issue في GitHub (labels و [[gh issue create]]) في «تاب Git».`,
            when: "أي bug في شغلك (Jira أو GitHub Issues أو Linear)، وأي bug في مكتبة open source.",
            mistakes: R`[[It doesn't work]] من غير تفاصيل. وصورة للخطأ بدل النص. ونسيان الإصدارات. وخلط كذا bug في issue واحد. و [[Expected: it works]]: ده مش expected، قول بيعمل إيه بالظبط. و [[I think the problem is in the useEffect]] في مكان Actual: التخمين مكانه Additional context.`
          },
          lines: [
            R`العنوان: إيه + فين + إمتى. «إجمالي السلة بيتجاهل الكوبون بعد reload».`,
            "عنوان قسم: خطوات تكرار الـ bug.",
            "خطوة ١ بالـ imperative.",
            "خطوة ٢. apply = تطبّق.",
            "خطوة ٣. reload = تعمل تحديث للصفحة.",
            "عنوان قسم: المتوقع.",
            R`«الإجمالي لسه فيه خصم ١٠٪». still = لسه.`,
            "عنوان قسم: اللي حصل فعلًا.",
            R`«الخصم بيختفي، بس الكوبون لسه ظاهر إنه متطبق». disappears = يختفي.`,
            R`«مفيش خطأ في الـ console». معلومة مهمة حتى لو سلبية.`,
            "عنوان قسم: البيئة.",
            "المتصفح والنظام.",
            "البيئة والـ commit بالظبط.",
            "عنوان قسم: معلومات إضافية.",
            R`«بيحصل كل مرة. بدأ بعد ما السلة اتنقلت لـ localStorage». ده غالبًا مكان السبب (regression).`
          ],
          sol: R`مثال صح:
[[Title: Signup form accepts emails without a domain]]
[[Steps to reproduce]]
[[1. Open /signup.]]
[[2. Enter "sara@" as the email and fill in the other fields.]]
[[3. Click "Create account".]]
[[Expected behavior]]
[[The form shows "Enter a valid email address" and does not submit.]]
[[Actual behavior]]
[[The form submits and the API returns 500: "invalid input syntax" in the server logs.]]
[[Environment]]
[[- Firefox 143 on macOS; local dev, commit 8e1d2f0]]

الاختبار الحقيقي: حد غيرك عمل reproduce من غير أسئلة. لو سألك «أنهي صفحة؟» أو «بإيه سجلت؟»، الإجابة لازم تدخل في الخطوات. (أرقام إصدارات المتصفحات في الأمثلة للتوضيح، اكتب اللي عندك من [[about:]] أو [[chrome://version]].)`
        },
        {
          cmd: "issue لمشروع open source",
          title: "تسأل أو تطلب feature في مشروع open source من غير ما الـ issue يتقفل",
          desc: R`الـ maintainers متطوعين غالبًا وعندهم مئات الـ issues. الـ issue اللي بيتقفل بسرعة هو اللي مكرر، أو سؤال مكانه مش هنا، أو من غير repro. واللي بياخد رد هو اللي بيوفّر وقتهم.

قبل ما تكتب: ١) دوّر في الـ issues (المفتوحة والمقفولة) بكلمات الخطأ. ٢) اقرا [[CONTRIBUTING.md]] والـ issue templates. ٣) شوف لو فيه Discussions أو Discord للأسئلة (مش كل سؤال bug). ٤) جرّب آخر إصدار.

وفي الـ feature request: ابدأ بالمشكلة مش بالحل ([[I'm trying to ... but ...]])، وقول بتعمل إيه دلوقتي كـ workaround، واقترح API لو عندك فكرة، واعرض تساعد ([[I'd be happy to open a PR]]).`,
          example: R`Title: Support custom headers in the retry hook
Is your feature request related to a problem?
I need to refresh the auth token before retrying a 401, but the retry hook
doesn't let me change the request headers.
Describe the solution you'd like
Pass the request options to the hook so they can be modified, e.g.
retry: { onRetry: (req) => { req.headers.set("Authorization", newToken) } }
Describe alternatives you've considered
Wrapping every call in my own retry loop, which duplicates the library logic.
Additional context
I searched existing issues and found #412, which is related but only covers timeouts.
I'd be happy to open a PR if this sounds good.`,
          try: R`اختار مكتبة بتستخدمها وافتح تاب Issues بتاعها. دوّر على مشكلة قابلتك فعلًا (بكلمات رسالة الخطأ) واقرا ٣ issues: واحد اتحل، وواحد اتقفل من غير حل، وواحد لسه مفتوح. اكتب لكل واحد ليه أخد النتيجة دي. وبعدين اكتب (من غير ما تنشر) issue لحاجة عايزها بالقالب اللي فوق.`,
          flag: "script",
          deep: {
            why: "الـ open source أحسن مكان تتعلم فيه إنجليزي تقني حقيقي، وأول PR أو issue مقبول في مكتبة مشهورة حاجة بتتحط في الـ CV. بس issue مكتوب وحش بيتقفل وبيزعّل.",
            how: R`عبارات جاهزة:
[[I searched the existing issues and couldn't find this.]]
[[This might be related to #412.]]
[[Here's a minimal reproduction: <link to StackBlitz / CodeSandbox / repo>]]
[[I'm not sure if this is a bug or expected behavior.]]
[[Is this something you'd accept a PR for?]]
[[Thanks for maintaining this library!]] (في الآخر، مش مبالغ فيه)

كلمات هتشوفها من الـ maintainers: [[duplicate of #]] = مكرر، و [[wontfix]] = مش هنعمله، و [[needs repro]] = محتاج reproduction، و [[good first issue]] = مناسب لأول مساهمة، و [[stale]] = اتقفل لأن محدش رد، و [[upstream]] = المشكلة في مكتبة تانية، و [[by design]] = السلوك ده مقصود، و [[PRs welcome]] = اعمله انت.

وقوالب GitHub الافتراضية للـ feature request بتسأل بالظبط الأسئلة اللي في المثال ([[Is your feature request related to a problem?]] و [[Describe the solution you'd like]] و [[Describe alternatives you've considered]]).`,
            when: "أي مشكلة في مكتبة: دوّر الأول، واكتب issue لو متأكد إنه جديد.",
            mistakes: R`[[+1]] أو [[any update?]] على issue قديم: استخدم reaction (علامة الإبهام) بدل تعليق. وسؤال «إزاي أعمل كذا» كـ bug. و [[This library is garbage]] أو زعيق. و [[please fix ASAP]]: محدش مدينلك بحاجة. ولصق ٢٠٠ سطر من الكود بتاعك بدل minimal reproduction.`
          },
          lines: [
            R`العنوان: الـ feature بالظبط. «ادعم headers مخصصة في الـ retry hook».`,
            "سؤال القالب: الطلب ده مرتبط بمشكلة؟",
            R`المشكلة: «محتاج أجدد الـ token قبل ما أعيد طلب رجّع 401، بس...»`,
            R`«... الـ hook مش بيسمحلي أغيّر الـ headers».`,
            "سؤال القالب: الحل اللي عايزه.",
            R`«ابعت options الطلب للـ hook عشان تتعدّل، مثلًا:»`,
            "اقتراح API بالكود.",
            "سؤال القالب: البدائل اللي فكرت فيها.",
            R`«إني ألف كل نداء في retry loop بتاعي، وده بيكرر منطق المكتبة». duplicates = بيكرر.`,
            "سؤال القالب: معلومات إضافية.",
            R`«دوّرت في الـ issues ولقيت #412، مرتبط بس بيغطي الـ timeouts بس».`,
            R`«أكون مبسوط أعمل PR لو الفكرة كويسة». ده بيفرق جدًا مع الـ maintainers.`
          ],
          sol: R`الأنماط اللي المفروض تلاقيها:
الـ issue اللي اتحل: فيه repro واضح (لينك أو كود صغير)، والإصدارات، والـ maintainer قدر يشوف المشكلة بسرعة.
اللي اتقفل من غير حل: غالبًا [[duplicate]]، أو [[needs repro]] ومحدش رد فبقى [[stale]]، أو السلوك [[by design]]، أو المشكلة [[upstream]] في مكتبة تانية.
اللي لسه مفتوح: ممكن يكون صعب، أو مستني حد يعمل PR ([[help wanted]] أو [[PRs welcome]]).

والـ issue اللي كتبته صح لو: العنوان محدد، والمشكلة قبل الحل، وفيه workaround، وقلت إنك دوّرت، ومفيش [[ASAP]] ولا [[any update]]. ولو ملقتش قالب في الـ repo، استخدم نفس الأسئلة دي.`
        }
      ]
    },
    {
      t: "تسمّي حاجات في الكود وتكتب README",
      l: 2,
      n: "الدوال أفعال والمتغيرات أسماء، و is/has/can للـ booleans، ومفيش Arabizi، والكلمات اللي بتتكتب غلط كتير، و README لمشروعك",
      items: [
        {
          cmd: "أسماء الدوال والمتغيرات",
          title: "الدالة فعل والمتغير اسم: getUser و orders و calculateTotal",
          desc: R`أسماء الكود إنجليزي، والإنجليزي هنا له قواعد بسيطة بتخلي الكود يتقري زي جملة. القاعدة الأساسية: الدوال بتعمل حاجة، فاسمها [[فعل]] (أو فعل + اسم): [[getUser]] و [[fetchOrders]] و [[calculateTotal]] و [[sendEmail]] و [[validateInput]] و [[formatPrice]]. والمتغيرات والـ properties حاجات، فاسمها [[اسم]]: [[user]] و [[total]] و [[orderCount]]. والـ arrays جمع: [[users]] و [[orderItems]]. والـ classes والـ types اسم مفرد بحرف كبير: [[User]] و [[OrderService]].

وفي React: الـ components أسماء ([[ProductCard]])، والـ hooks [[use]] + اسم ([[useCart]])، والـ event handlers [[handle]] + حدث ([[handleSubmit]]) والـ props بتاعتها [[on]] + حدث ([[onSubmit]]).

الجمع: أغلب الكلمات [[s]]، واللي آخرها [[y]] بعد حرف ساكن [[ies]] ([[category → categories]] و [[entry → entries]])، و [[box → boxes]] و [[status → statuses]]، وشواذ: [[child → children]] و [[person → people]] و [[index → indexes/indices]] و [[datum → data]] (بس بنقول data على طول).`,
          example: R`const users = await fetchUsers();
const activeUsers = users.filter(isActive);
const totalPrice = calculateTotal(cartItems);
function formatPrice(amount: number): string { /* ... */ }
function sendWelcomeEmail(user: User) { /* ... */ }
const categories = await getCategories();
const children = node.children;
function ProductCard({ product, onSelect }: Props) { /* ... */ }
const handleSubmit = (event: FormEvent) => { /* ... */ };
Wrong: function userData() {}      Right: function getUserData() {}
Wrong: const user = await getUsers();  Right: const users = await getUsers();
Wrong: const categorys = [];       Right: const categories = [];`,
          try: R`افتح ملف فيه منطق كتير في مشروع عندك، وعلّم كل اسم دالة مش فعل، وكل array اسمه مفرد، وكل اسم فيه [[data]] أو [[info]] أو [[temp]] أو [[x]] من غير داعي. اكتب الاسم الجديد لكل واحد (ومتغيّرش الكود دلوقتي لو مفيش اختبارات: ده تمرين).`,
          flag: "script",
          deep: {
            why: "الكود بيتقري أكتر ما بيتكتب بعشر مرات. لو الأسماء بتمشي على قواعد الإنجليزي، السطر بيتقري زي جملة: [[if (user.isActive) sendWelcomeEmail(user)]]. ولو لأ، كل سطر محتاج تفكير. وأسماء الكود جزء من إنجليزيتك اللي بيتشاف في الـ PRs والانترفيو.",
            how: R`أفعال شائعة وإمتى:
[[get]] من مكان قريب/سريع، و [[fetch]] من الشبكة، و [[load]] من ملف أو storage، و [[find]] دوّر وممكن مترجعش حاجة، و [[create]] / [[build]] / [[make]] تعمل جديد، و [[calculate]] / [[compute]] تحسب، و [[parse]] تحوّل نص لبيانات، و [[format]] تحوّل بيانات لنص، و [[validate]] تتأكد، و [[normalize]] توحّد الشكل، و [[map]] / [[convert]] / [[to...]] تحوّل ([[toCents]])، و [[handle]] تتعامل مع حدث، و [[render]] ترسم UI، و [[init]] / [[setup]] تجهّز.

الاسم يبقى بطول مجاله: متغير في loop من ٣ سطور [[i]] مقبول، ومتغير في ملف كله لازم اسم واضح.

قواعد الكتابة (camelCase و PascalCase و snake_case و UPPER_CASE) وفكرة الأسماء عمومًا في درس [[naming]] في «تاب هندسة البرمجيات».`,
            when: "كل اسم بتكتبه. ولما تراجع PR، الأسماء من أول حاجات تعلّق عليها.",
            mistakes: R`[[data]] و [[info]] و [[obj]] و [[temp]] و [[result]] في كل حتة. ودالة اسمها اسم ([[userData()]]). و array مفرد ([[const user = []]]). و [[categorys]] و [[statuss]]. واسم بيكذب: [[getUser]] بتعمل تعديل في الداتابيز كمان. و [[checkUser]] مش واضح: بتتأكد من إيه وبترجع إيه؟ [[isUserActive]] أو [[assertUserExists]] أوضح.`
          },
          lines: [
            R`array جمع، ودالة fetch لأنها network.`,
            R`صفة + جمع، و isActive دالة بترجع boolean.`,
            R`اسم للنتيجة، وفعل للدالة.`,
            R`format = تحوّل رقم لنص (زي "١٢٠ ج.م").`,
            R`فعل + اسم مفصّل.`,
            R`categories جمع category (y ← ies).`,
            R`child ← children جمع شاذ.`,
            R`Component اسم بحرف كبير، والـ prop on + حدث.`,
            R`handler = handle + حدث.`,
            R`دالة لازم فعل.`,
            R`اللي راجع ليستة، فالمتغير جمع.`,
            R`categorys غلط إملائي.`
          ],
          sol: R`أمثلة لتغييرات منطقية:
[[function data()]] ← [[function fetchDashboardStats()]]
[[const product = await getProducts()]] ← [[const products = ...]]
[[let temp = price * 0.14]] ← [[const vat = price * VAT_RATE]]
[[function check(u)]] ← [[function isAdmin(user)]] (لو بترجع boolean)
[[const info = res.json()]] ← [[const order = await res.json()]]
[[function userOrders()]] ← [[function getUserOrders()]]

لو لقيت اسم مش عارف تسميه كويس، غالبًا الدالة بتعمل حاجتين: قسّمها (وده «تاب هندسة البرمجيات»).`
        },
        {
          cmd: "is / has / can",
          title: "أسماء الـ booleans: isLoading و hasAccess و canEdit و shouldRetry",
          desc: R`الـ boolean = سؤال إجابته آه أو لأ. فاسمه لازم يتقري كسؤال لما تحطه في [[if]]: [[if (isLoading)]] = «لو بيحمّل». البادئات المشهورة:

[[is]] + صفة أو حالة: [[isLoading]] و [[isOpen]] و [[isValid]] و [[isAdmin]]. و [[has]] + اسم (عنده): [[hasAccess]] و [[hasError]] و [[hasChildren]]. و [[can]] + فعل (يقدر): [[canEdit]] و [[canDelete]]. و [[should]] + فعل (المفروض): [[shouldRetry]] و [[shouldRedirect]]. و [[was]] / [[did]] للماضي: [[wasSent]] و [[didFetch]]. و [[needs]] + اسم أو فعل: [[needsReview]].

وخلّي الاسم إيجابي: [[isEnabled]] أحسن من [[isNotDisabled]]، لأن [[!isNotDisabled]] بيوجع الدماغ.`,
          example: R`const isLoading = status === "pending";
const hasItems = cart.items.length > 0;
const canCheckout = hasItems && !isLoading;
const shouldRetry = error.status >= 500 && attempts < 3;
const isEmailVerified = user.emailVerifiedAt !== null;
if (!canCheckout) return;
Wrong: const loading = true;        Right: const isLoading = true;
Wrong: const isNotVisible = false;  Right: const isVisible = true;
Wrong: const isHasAccess = true;    Right: const hasAccess = true;
Wrong: const isCanEdit = true;      Right: const canEdit = true;`,
          try: R`دوّر في مشروعك على [[useState(false)]] و [[useState(true)]] وأي متغير قيمته true/false. غيّر اسم أي واحد مش ماشي على القاعدة (في ذهنك أو في branch). وبعدين اقرا كل [[if]] فيه boolean بصوت عالي بالإنجليزي: لو الجملة طبيعية، الاسم كويس.`,
          flag: "script",
          deep: {
            why: R`[[if (loading)]] ممكن تتقري «لو فيه loading» أو «لو الـ loading object موجود». [[if (isLoading)]] مفيهاش لبس. ودي من أكتر تعليقات الـ review تكرارًا على كود المبتدئين.`,
            how: R`اختار البادئة بسؤال: الحاجة «هي» كذا؟ [[is]]. «عندها» كذا؟ [[has]]. «تقدر» تعمل كذا؟ [[can]]. «المفروض» تعمل كذا؟ [[should]].

متجمعش بادئتين: [[isHasAccess]] غلط، و [[isCanEdit]] غلط. و [[is]] مع اسم ساعات مقبولة لو معناها «هو كذا»: [[isAdmin]] = هو أدمن.

في React الـ props الـ boolean ساعات من غير بادئة لو مفهومة زي attributes الـ HTML: [[disabled]] و [[open]] و [[checked]] و [[required]]. ده عرف مقبول لأنهم زي HTML.

وفي الداتابيز: أعمدة زي [[is_active]] أو [[email_verified_at]] (timestamp أحسن من boolean لأنه بيقولك إمتى كمان).`,
            when: "أي state أو متغير أو دالة بترجع true/false.",
            mistakes: R`[[flag]] و [[check]] و [[status]] لـ boolean: مش واضح. و [[isNotX]] نفي في الاسم. و [[isLoaded]] و [[isLoading]] الاتنين في نفس الـ component بمعاني متداخلة: استخدم [[status]] واحد بقيم ([['idle' | 'loading' | 'success' | 'error']]). و [[isUserHaveAccess]]: grammar غلط، الصح [[userHasAccess]] أو [[hasAccess]].`
          },
          lines: [
            R`is + حالة. «هو بيحمّل؟»`,
            R`has + اسم. «فيه منتجات؟»`,
            R`can + فعل. «يقدر يعمل checkout؟» والـ if هتتقري جملة.`,
            R`should + فعل. «المفروض نعيد؟» لو خطأ سيرفر وأقل من ٣ محاولات.`,
            R`is + صفة مركبة. «الإيميل متأكد منه؟»`,
            R`بيتقري: «لو مش يقدر يعمل checkout، ارجع».`,
            R`loading من غير بادئة: غامض.`,
            R`اسم منفي: اقلبه.`,
            R`بادئتين: has بس.`,
            R`بادئتين: can بس.`
          ],
          sol: R`أمثلة من مشاريع React بتتكرر:
[[const [loading, setLoading] = useState(false)]] ← [[const [isLoading, setIsLoading] = useState(false)]]
[[const [show, setShow] = useState(false)]] ← [[const [isModalOpen, setIsModalOpen] = useState(false)]]
[[const [error, setError] = useState(false)]] ← لو boolean: [[hasError]]؛ والأحسن تخزن الخطأ نفسه: [[useState<string | null>(null)]].
[[const admin = user.role === "admin"]] ← [[const isAdmin = ...]]

قراية بصوت عالي: [[if (isModalOpen && !isLoading)]] ← «if the modal is open and it is not loading». طبيعية؟ الاسم كويس.`
        },
        {
          cmd: "Arabizi والإملاء",
          title: "Arabizi في الكود وأشهر الكلمات اللي بتتكتب غلط (recieve و lenght و seperate)",
          desc: R`حاجتين بيبوّظوا أسماء الكود عند ناس كتير: أسماء عربي بحروف إنجليزي (Arabizi) زي [[mostakhdem]] و [[gam3]] و [[el_se3r]]، وكلمات إنجليزي مكتوبة غلط زي [[recieve]] و [[lenght]].

الـ Arabizi: محدش مش مصري هيفهمه، ومفيش طريقة واحدة لكتابته ([[mostakhdem]] ولا [[mustakhdim]]؟)، فمستحيل تدوّر بيه. القاعدة: الكود كله إنجليزي، والعربي مكانه النصوص اللي بتظهر لليوزر (وأحسن في ملفات ترجمة i18n). أسماء حاجات مصرية ملهاش مقابل (زي [[governorate]] للمحافظة، أو [[nationalId]] للرقم القومي) ترجمها.

الإملاء الغلط: بيعمل bugs حقيقية ([[user.adress]] في مكان و [[user.address]] في مكان تاني = undefined)، ومبيتلاقاش في البحث. ركّب extension زي Code Spell Checker في VS Code.`,
          example: R`receive      (not recieve)      i before e, except after c
length       (not lenght)
address      (not adress)
separate     (not seperate)
success      (not sucess)
response     (not responce)
occurred     (not occured)
environment  (not enviroment)
dependency   (not dependancy)
parameter    (not paramter)
retrieve     (not retreive)
existing     (not existant)
Wrong: const mostakhdem = await getUser();   Right: const user = await getUser();
Wrong: function e7sebElSe3r() {}             Right: function calculatePrice() {}`,
          try: R`سطّب extension اسمه Code Spell Checker في VS Code وافتح أكبر ٣ ملفات في مشروعك. عدّ الكلمات اللي عليها خط أزرق. صلّح اللي في أسماء متغيرات (بـ F2 عشان يتغير في كل مكان)، وضيف الكلمات التقنية الصح للقاموس.`,
          flag: "script",
          deep: {
            why: R`اسم زي [[recieveMessage]] بيفضل في الكود سنين لأن تغييره بيكسر حاجات. وفي API عام بيبقى مصيبة: مثال مشهور إن الـ HTTP header اسمه [[Referer]] (غلط إملائي في المواصفة الأصلية لـ referrer)، واتقفل كده للأبد. متعملش كده في الـ API بتاعك.`,
            how: R`ليه الكلمات دي بتتغلط: بتتنطق بطريقة مختلفة عن كتابتها. [[length]] بتتنطق «لينجث» بس الـ g قبل الـ th. و [[separate]] فيها [[a]] في النص («sep-A-rate»). و [[occurred]] حرفين r لأن الضغط على آخر مقطع. و [[environment]] فيها [[n]] قبل [[ment]] (environ + ment).

كلمات تانية بتتلخبط: [[its]] (بتاعه) و [[it's]] (it is)، و [[then]] (بعدين) و [[than]] (من، في المقارنة)، و [[lose]] (يضيّع) و [[loose]] (واسع)، و [[affect]] (فعل) و [[effect]] (اسم غالبًا)، و [[login]] (اسم: صفحة الـ login) و [[log in]] (فعل: [[Log in to continue]])، ونفس الكلام [[setup]] و [[set up]]، و [[checkout]] و [[check out]]، و [[backup]] و [[back up]].`,
            when: "كل اسم جديد، وكل نص بيظهر لليوزر. واعمل spell check في الـ CI لو المشروع كبير (فيه أدوات زي cspell).",
            mistakes: R`تغيّر اسم غلط يدوي في ملف واحد بس. استخدم Rename Symbol (F2). وتخلط [[login]] و [[log in]] في الـ UI: الزرار [[Log in]] (فعل)، والصفحة [[the login page]] (اسم). و [[Its not working]] ← [[It's not working]].`
          },
          lines: [
            R`receive: القاعدة القديمة «i قبل e إلا بعد c».`,
            R`length: الـ g قبل الـ th.`,
            R`address: حرفين d وحرفين s.`,
            R`separate: فيها a في النص.`,
            R`success: حرفين c وحرفين s.`,
            R`response: آخرها se مش ce.`,
            R`occurred: حرفين c وحرفين r.`,
            R`environment: n قبل ment.`,
            R`dependency: ency مش ancy.`,
            R`parameter: الـ e بعد الـ m.`,
            R`retrieve: ie بعد tr (مفيش c).`,
            R`existing (والاسم existence)، مفيش existant.`,
            R`Arabizi ← اسم إنجليزي.`,
            R`Arabizi ← فعل إنجليزي + اسم.`
          ],
          sol: R`اللي بيحصل عادة في مشروع حقيقي: بتلاقي من ٥ لـ ٢٠ كلمة. أغلبها:
أسماء مكتبات ومصطلحات صح بس مش في القاموس ([[prisma]] و [[zod]] و [[upsert]] و [[tsx]]) ← «Add to Workspace Dictionary» عشان تتحفظ في [[.vscode/settings.json]] ويشاركها الفريق.
غلط إملائي حقيقي ([[recieved]] و [[lenght]] و [[sucess]]) ← F2 وغيّره.
Arabizi ([[talabat]] و [[mowazafeen]]) ← [[orders]] و [[employees]].

لو لقيت الغلط في اسم عمود داتابيز أو field في API بيستخدمه حد تاني: متغيروش مباشرة. ده محتاج migration أو deprecation (اكتبه في issue).`
        },
        {
          cmd: "README لمشروعك",
          title: "تكتب README لمشروعك بإنجليزي بسيط: جملة الوصف و Features و Run locally",
          desc: R`الـ README بتاعك هو أول حاجة حد بيقراها عن مشروعك. ومش محتاج إنجليزي قوي: محتاج جمل قصيرة، ومسميات أقسام معروفة، وأوامر تتنسخ. درس [[README بيبيع]] في «تاب الشغل والكارير» بيشرح «إيه» يتحط وليه. هنا «إزاي تكتبه» بالإنجليزي.

جملة الوصف: [[<Name> is a <what> that helps <who> <do what>.]] أو أقصر: [[<What> for <who>.]]. مثال: [[Online booking for small clinics.]] أو [[ShopLite is a small e-commerce API that lets store owners manage products and orders.]]

الـ Features: كل bullet يبدأ بفعل (present simple من غير فاعل أو imperative-ish): [[Book appointments online]] أو [[Books ...]]. خلّيهم كلهم نفس الشكل.

Run locally: خطوات imperative مرقمة، وكل أمر في code block.`,
          example: R`# ClinicBook
Online appointment booking for small clinics.
**Live demo:** https://clinicbook.example.com (login: demo@example.com / demo1234)
## Features
- Book, reschedule, and cancel appointments
- Prevent double booking with a database constraint
- Send email reminders 24 hours before each appointment
## Tech stack
- Next.js, PostgreSQL, Prisma, Resend (email)
## Run locally
1. Copy .env.example to .env and set DATABASE_URL.
2. Run npm ci, then npx prisma migrate dev.
3. Run npm run dev and open http://localhost:3000.
## Known limitations
- Arabic UI only; no online payments yet.`,
          try: R`اكتب README لمشروع عندك بالشكل ده، من غير ولا جملة أطول من ١٥ كلمة. وبعدين اقراه بصوت عالي: أي جملة وقفت فيها، قسّمها جملتين. وجرّب «Run locally» في فولدر جديد بعد [[git clone]].`,
          flag: "script",
          deep: {
            why: "الـ README بيتقري من recruiters وناس من برا مصر. الإنجليزي البسيط الواضح أحسن مليون مرة من الإنجليزي «المعقد» المليان غلطات. والجمل القصيرة بتخبّي ضعف الـ grammar لأن مفيهاش مكان تغلط فيه.",
            how: R`قواعد الكتابة البسيطة: جملة واحدة = فكرة واحدة. فعل واضح بدل اسم معقد ([[It sends reminders]] مش [[It provides a reminder-sending functionality]]). ومن غير كلمات فاضية زي [[very]] و [[simply]] و [[just]] و [[easily]] و [[powerful]] و [[amazing]].

قوالب جمل:
[[<Name> lets you <do X>.]]
[[It uses <tool> for <purpose>.]]
[[I chose <tool> because <reason>.]]
[[The hardest part was <problem>. I solved it by <solution>.]]
[[To run the tests, run npm test.]]
[[Known limitations: <X>; <Y>.]]

وفي الـ Markdown: [[#]] للعنوان، و [[##]] للأقسام، و [[-]] للـ bullets، و [[**...**]] للـ bold، و code blocks بتلات backticks.`,
            when: "كل مشروع في الـ portfolio، وكل مكتبة أو أداة صغيرة بتعملها.",
            mistakes: R`[[This project is a web application which is made by using React and it is used for booking]]: طويلة ومكررة. الأحسن [[Online booking built with React.]] و [[This project is made for learn]] ← [[I built this project to learn ...]]. و [[Features: login, register, dashboard]]: أسماء صفحات مش مميزات؛ قول اليوزر يقدر يعمل إيه.`
          },
          lines: [
            R`جملة الوصف: ماذا + لمين. من غير فعل حتى، وده مقبول في الوصف.`,
            R`الـ live link وحساب demo.`,
            R`feature بأفعال: «احجز وغيّر ميعاد وألغي».`,
            R`«امنع الحجز المزدوج بـ constraint في الداتابيز». ده الجزء الصعب.`,
            R`«ابعت تذكير بالإيميل قبل كل ميعاد بـ ٢٤ ساعة».`,
            R`الأدوات في سطر.`,
            R`خطوة ١ imperative.`,
            R`خطوة ٢: then = وبعدين.`,
            R`خطوة ٣ مع النتيجة (open ...).`,
            R`«حدود معروفة»: بالصراحة. yet = لسه.`
          ],
          sol: R`اختبار الجمل: كل جملة في الـ README أقل من ١٥ كلمة، وأغلبها بتبدأ بفعل أو باسم المشروع. أمثلة لتقسيم جملة طويلة:
[[This app is a full-stack application that I built using Next.js and Prisma in order to help the users to track their expenses easily and see charts]]
← [[Track your expenses and see monthly charts. Built with Next.js and Prisma.]]

و [[Run locally]] نجح لو فولدر جديد بعد [[git clone]] اشتغل بالخطوات دي بس. لو احتجت خطوة مش مكتوبة (مثلًا [[createdb]] أو تشغيل Docker)، ضيفها.`
        }
      ]
    },
    {
      t: "رسايل الفريق والعميل (Slack و email)",
      l: 2,
      n: "تطلب مساعدة صح، وتدّي status update، وتقول لأ بأدب، وتتابع وتعتذر عن تأخير، وتكتب إيميل لعميل: كلها بقوالب جاهزة",
      items: [
        {
          cmd: "تطلب مساعدة",
          title: "تطلب مساعدة في Slack: context و tried و question في رسالة واحدة",
          desc: R`أسوأ رسالة في Slack: [[Hi]] وبس، وتستنى الرد عشان تكتب سؤالك. الشخص التاني بيشوف «Hi» ومش عارف عايز إيه، ويا يسيبها يا يرد وبعدين يستنى. العرف في الشغل (وفيه موقع مشهور اسمه nohello.net عن الفكرة دي): التحية والسؤال كله في رسالة واحدة.

والرسالة الكويسة فيها: ١) السياق: شغال على إيه. ٢) المشكلة: إيه اللي حصل (والخطأ بالنص). ٣) جربت إيه. ٤) السؤال بالظبط. ٥) قد إيه مستعجل. كده الشخص يقدر يرد في رسالة واحدة، أو يقولك «مش أنا، اسأل فلان».`,
          example: R`Hi Omar, quick question about the payments webhook when you have a moment.
Context: I'm working on #231 (order status after payment).
Problem: the webhook returns 400 "No signatures found matching the expected signature for payload".
What I tried: I checked the secret in .env and logged the raw body; it looks correct.
Question: do we parse the body as JSON before the webhook route? I think the signature needs the raw body.
Not urgent: I'm working on the tests in the meantime.`,
          try: R`فكّر في آخر مرة كنت «معلّق» في مشكلة. اكتب رسالة Slack واحدة بالقالب ده (سياق، مشكلة، جربت، سؤال، إلحاح)، أقل من ٨٠ كلمة. وبعدين اقراها كأنك الشخص التاني: تقدر ترد من غير ما تسأل حاجة؟`,
          flag: "script",
          deep: {
            why: "اللي بيطلب مساعدة بشكل كويس بياخد ردود أسرع وبيبان إنه بيحترم وقت الناس. وفي الشغل remote مع ناس من بلاد تانية، الرسالة المكتوبة هي كل اللي بيعرفوه عنك.",
            how: R`عبارات افتتاح: [[Quick question about X]]، [[Could you help me with X when you have a moment?]]، [[Do you have 10 minutes today to look at X?]].

الإلحاح: [[Not urgent]]، [[No rush]]، [[Whenever you have time]]، [[This is blocking me]] (موقفني)، [[This is blocking the release]] (مستعجل بجد).

الإغلاق: [[Thanks in advance!]] أو [[Thanks!]]. (مش [[Thanks in advance for your cooperation]]: رسمية زيادة.)

و [[I think ...]] بعد ما تقول جربت إيه = بيبيّن إنك فكرت، حتى لو تخمينك غلط.

ولو السؤال طويل، اكتبه في thread أو في issue وحط اللينك. وتفاصيل «إمتى تسأل وقد إيه تحاول لوحدك» في درس [[تسأل صح]] في «تاب الشغل والكارير».`,
            when: "أي مرة تحتاج حد، في Slack أو Teams أو Discord أو إيميل.",
            mistakes: R`[[Hi]] لوحدها. و [[Can I ask a question?]] (اسأل على طول). و [[It's not working, can you help?]] من غير أي تفاصيل. و [[Please help urgently!!!]] على حاجة مش مستعجلة. و screenshot للكود بدل نص (مينفعش يتنسخ). و [[I have a doubt]] (درس غلطات المصريين).`
          },
          lines: [
            R`تحية + السؤال في نفس الرسالة. when you have a moment = لما تفضى.`,
            R`السياق: شغال على إيه ورقم التاسك.`,
            R`المشكلة ورسالة الخطأ بالنص (دي رسالة Stripe المشهورة لما الـ body يتعمله parse).`,
            R`جربت إيه: «راجعت السر وطبعت الـ body الخام؛ شكله صح».`,
            R`السؤال بالظبط + تخمينك: «هل بنعمل parse للـ body قبل الـ route؟ أظن التوقيع محتاج الـ body الخام».`,
            R`الإلحاح: «مش مستعجل، شغال على الاختبارات في الوقت ده». in the meantime = في الأثناء.`
          ],
          sol: R`مثال صح (٦٥ كلمة تقريبًا):
[[Hi Sara, could you help me with a CORS error when you have a moment? I'm working on the new admin page (#88). The browser says "No 'Access-Control-Allow-Origin' header is present on the requested resource" when I call /api/stats from localhost:5173. I added the origin to the CORS config and restarted the server. Is there another place we set allowed origins? Not urgent. Thanks!]]

راجع: فيه السياق (#88)، والخطأ بالنص، واللي جربته، وسؤال واحد واضح (Is there another place...)، والإلحاح (Not urgent). لو رسالتك فيها [[It doesn't work]] من غير الخطأ بالنص، ضيفه. ولو مفيهاش سؤال (بس وصف)، الشخص مش هيعرف يرد بإيه.`
        },
        {
          cmd: "status update",
          title: "status update و standup: Yesterday و Today و Blockers",
          desc: R`الـ standup (اليومي، مكتوب أو في مكالمة) ليه شكل ثابت: [[Yesterday]] عملت إيه، و [[Today]] هتعمل إيه، و [[Blockers]] إيه اللي موقفك. والـ status update لمدير أو عميل نفس الفكرة بس بيركز على: خلص إيه، وفاضل إيه، وفيه خطر على الميعاد؟

الأزمنة هنا مهمة: الماضي للي خلص ([[I finished]] و [[I fixed]] و [[I merged]])، والـ present continuous للي شغال فيه دلوقتي ([[I'm working on]])، والمستقبل للخطة ([[I'll start]] و [[I'm going to]])، والـ present perfect لحاجة خلصت ولسه مهمة ([[I've opened a PR]] = فتحته وهو موجود دلوقتي).`,
          example: R`Yesterday: I finished the signup form and opened a PR (#140).
Today: I'll address the review comments and start on password reset.
Blockers: none.
---
Yesterday: I investigated the slow orders page. The query was missing an index.
Today: I'm adding the index and testing it on staging.
Blockers: I need access to the staging database. @Omar, could you add me?
---
Weekly update (client): The booking flow is done and deployed to staging.
Next week: email reminders. Risk: the SMS provider hasn't replied yet, so SMS may slip to the following week.`,
          try: R`اكتب standup لآخر ٣ أيام شغل أو مذاكرة بتاعتك (حتى لو لنفسك)، ٣ سطور لكل يوم. وبعدين اكتب weekly update لعميل خيالي عن مشروع من مشاريعك، فيه حاجة خلصت، وحاجة جاية، وخطر واحد.`,
          flag: "script",
          deep: {
            why: "في الشغل الـ remote الـ updates المكتوبة هي اللي بتقول إنك شغال. ولو كتبتها واضحة وقصيرة، المدير ميضطرش يسألك. والـ blockers لو اتقالت بدري بتتحل بدري.",
            how: R`أفعال الـ standup: [[finished]] و [[completed]] و [[fixed]] و [[merged]] و [[deployed]] و [[reviewed]] و [[investigated]] (بحثت في مشكلة) و [[paired with X on]] (اشتغلت مع حد) و [[started]] و [[continued]] و [[I'm still working on]].

للـ blockers: [[I'm blocked on X]] و [[waiting for X]] و [[I need X from Y]]. وخلّي الـ blocker طلب محدد لشخص ([[@Omar, could you ...]]) مش شكوى.

للمخاطر مع العميل: [[Risk:]] و [[may slip]] (ممكن يتأخر) و [[on track]] (ماشي في ميعاده) و [[behind schedule]] (متأخر) و [[ahead of schedule]] (قدام الميعاد) و [[ETA]] (الوقت المتوقع) و [[by Thursday]] (قبل أو يوم الخميس).

ولو مفيش حاجة تتقال في Blockers: [[None]] كفاية.`,
            when: "كل يوم في الـ standup، وكل أسبوع لمدير أو عميل.",
            mistakes: R`[[Yesterday I am working on ...]] ← [[I worked on]] أو [[I was working on]]. و [[I will finish it inshallah]] لعميل أجنبي: مفهوم بس الأوضح [[I expect to finish it by Thursday]]. و update كله «working on it» من غير نتيجة. وتخبّي إنك متأخر لحد يوم التسليم: [[may slip]] قبلها بأيام أحسن بكتير.`
          },
          lines: [
            R`ماضي للي خلص + present perfect ضمني (opened).`,
            R`future: address = اتعامل مع التعليقات. start on = ابدأ في.`,
            R`مفيش blockers.`,
            R`فاصل بين مثالين.`,
            R`investigated = بحثت في. «الـ query كان ناقصه index».`,
            R`present continuous للي شغال فيه دلوقتي.`,
            R`blocker بطلب محدد لشخص: «محتاج access، يا عمر ممكن تضيفني؟»`,
            "فاصل.",
            R`update لعميل: خلص إيه وفين (staging).`,
            R`الجاي + الخطر: «الـ SMS provider مردش لسه، فالـ SMS ممكن يتأخر أسبوع». slip = يتأخر.`
          ],
          sol: R`مثال صح:
[[Mon: Yesterday: I finished the product list page. Today: I'll add pagination. Blockers: none.]]
[[Tue: Yesterday: I added pagination and opened a PR (#12). Today: I'm writing tests for the cart. Blockers: none.]]
[[Wed: Yesterday: I wrote the cart tests; two are failing because of a rounding bug. Today: I'll fix the rounding and address review comments on #12. Blockers: waiting for review on #12.]]

Weekly update:
[[This week: the product pages and the cart are done and deployed to staging. Next week: checkout and payment. Risk: we still don't have the payment provider's API keys, so checkout may slip by 2–3 days if we don't get them by Tuesday.]]

راجع الأزمنة: الماضي في Yesterday، و [[I'll]] أو [[I'm ...ing]] في Today. ولو كتبت [[Yesterday I finish]] صلّحها لـ [[finished]].`
        },
        {
          cmd: "تقول لأ بأدب",
          title: "تقول لأ، أو «مش هلحق»، أو «محتاج وقت أكتر» من غير ما تبان رافض",
          desc: R`أصعب رسايل في الشغل: لما حد يطلب حاجة ومش هتقدر، أو الـ deadline مش واقعي، أو الطلب خارج الـ scope. في مصر ساعات بنقول «حاضر» وبعدين منعملش، وده بيخسّرك الثقة أكتر بكتير من «لأ» مؤدبة بدري.

التركيبة: ١) اعترف بالطلب ([[Thanks for thinking of me]] أو [[I understand this is important]]). ٢) قول لأ أو الحد بوضوح ومن غير لف. ٣) قول السبب في جملة. ٤) اعرض بديل (وقت تاني، أو جزء منه، أو شخص تاني، أو تضحية بحاجة تانية).

الجملة الذهبية في الشغل: [[I can do X by Thursday, or Y by Monday. Which is more important?]] = بتخلي اللي طلب يختار الأولوية بدل ما انت تشيل الشيلة.`,
          example: R`I can't take this on this week; I'm fully booked with the checkout release. I could start on Monday. Would that work?
I don't think we can ship all three features by Friday. I can finish login and signup by Friday, and password reset by Tuesday. Does that work for you?
That's outside the scope we agreed on, but I'm happy to send a quote for it as a separate task.
I'd rather not skip the tests to save time; last time that caused a production bug. Can we cut the export feature instead?
I'm not the best person for this. Mona worked on the payment module; she may be able to help.
Let me check and get back to you by 3pm.`,
          try: R`اكتب رد على الرسالة دي من مدير: [[Can you also add the admin dashboard before Thursday's demo?]] وانت عارف إن الـ dashboard محتاج ٣ أيام وانت عندك يومين. اكتب ٣ ردود مختلفة: واحد يعرض جزء، وواحد يعرض ميعاد تاني، وواحد يسأل عن الأولوية.`,
          flag: "script",
          deep: {
            why: R`«حاضر» اللي مبتتنفذش بتهد الثقة، ودي أغلى حاجة في الكارير. و «لأ» مع بديل بتبيّن إنك فاهم الـ trade-offs، ودي صفة الـ senior. وده ليه علاقة مباشرة بـ [[scope creep]] في «تاب الشغل والكارير».`,
            how: R`عبارات تلطيف «لأ»:
[[I'm afraid I can't ...]] (للأدب الزيادة)
[[I don't think I can ... by ...]]
[[Unfortunately, ...]]
[[I'd rather not ... because ...]] (أفضّل لأ)
[[That's outside the scope we agreed on]] (برا الـ scope، للعملاء)
[[I'm fully booked / at capacity this week]] (مليان)
[[I'm not the best person for this]] (فيه حد أنسب)

عبارات البديل:
[[I could ... instead.]]
[[What if we ...?]]
[[Would it work if ...?]]
[[Which is more important: X or Y?]]

ولو محتاج وقت تفكر قبل ما ترد: [[Let me check and get back to you by 3pm.]] (وارجع فعلًا الساعة ٣).`,
            when: "طلبات فوق طاقتك، و deadlines غير واقعية، وطلبات عملاء برا الاتفاق، وطلب «تتخطى الاختبارات عشان نلحق».",
            mistakes: R`[[Yes, no problem]] وانت عارف إنها مشكلة. و [[No.]] من غير أي حاجة (بتبان عدوانية بالإنجليزي). و [[It's impossible]]: درامية، قول [[It's not possible by Thursday]] مع السبب. و [[I will try]] كرد على deadline مستحيل: بيتسمع «آه». و [[I can't because I'm very very busy]] من غير بديل.`
          },
          lines: [
            R`«مش هقدر آخدها الأسبوع ده، مليان بالـ release. أقدر أبدأ الاتنين. ينفع؟» take on = تاخد مهمة.`,
            R`«مش شايف إننا نلحق التلاتة الجمعة. login و signup الجمعة، و reset التلات. ينفع كده؟» ship = تنزّل.`,
            R`للعميل: «ده برا الـ scope اللي اتفقنا عليه، بس مبسوط أبعتلك سعر ليه كتاسك منفصلة». quote = عرض سعر.`,
            R`«أفضّل منعديش الاختبارات؛ آخر مرة عملت bug في الإنتاج. نشيل الـ export بدلها؟» cut = نشيل.`,
            R`«مش أنسب واحد لده. منى اشتغلت على الدفع، ممكن تساعد».`,
            R`«هشوف وأرجعلك قبل الساعة ٣». get back to you = أرد عليك.`
          ],
          sol: R`٣ ردود صح:
عرض جزء: [[I don't think I can finish the full dashboard by Thursday; it needs about three days. I can have the orders chart and the KPIs ready for the demo, and the rest by next Tuesday. Would that work?]]
ميعاد تاني: [[The full dashboard will take about three days, so the earliest I can deliver it is Monday. Could we show a mockup in Thursday's demo instead?]]
الأولوية: [[I can do the dashboard by Thursday only if I pause the search bug fix. Which is more important for the demo?]]

راجع: كل رد فيه لأ أو حد واضح (مش «هحاول»)، وسبب (٣ أيام)، وبديل، وسؤال في الآخر بيرجّع القرار. لو كتبت [[I will try my best]] بس، ده مش رد: ده «آه» متأجلة.`
        },
        {
          cmd: "follow up و تأخير",
          title: "تتابع رسالة مردش عليها (follow up) وتعتذر عن تأخير من غير مبالغة",
          desc: R`موقفين بيتكرروا كل أسبوع: بعت رسالة أو PR ومحدش رد، أو انت اللي اتأخرت في حاجة.

الـ follow-up: ابعت بعد وقت معقول (يوم أو اتنين في الشغل، ٣–٥ أيام في إيميل لعميل)، وفي نفس الـ thread، وافترض حسن النية (الشخص مشغول)، ولخّص الطلب تاني في سطر عشان ميضطرش يدوّر.

الاعتذار عن التأخير: قصير، ومن غير أعذار طويلة، وفيه الجديد (امتى هتخلص). [[Sorry for the delay]] وبعدين المعلومة على طول. المبالغة ([[I'm deeply sorry for the inconvenience caused]]) بتلفت النظر للمشكلة أكتر.`,
          example: R`Hi Omar, just following up on this. Could you take a look at #140 when you get a chance? It's blocking the release.
Hi Sara, friendly reminder about the API keys. We need them by Tuesday to keep the launch date.
Bumping this in case it got lost. Any thoughts on the approach?
Sorry for the late reply! Yes, Thursday works for me.
Sorry for the delay on the report. It will be ready by 5pm today.
Apologies, I missed the deadline for the login fix. It's in review now (#152) and should be merged tomorrow.
Thanks for your patience. The export is now live on staging.`,
          try: R`اكتب ٣ رسايل: (١) follow-up على PR بتاعك محدش راجعه من يومين. (٢) follow-up لعميل مبعتش المحتوى اللي وعد بيه من ٥ أيام. (٣) اعتذار عن إنك اتأخرت يوم في تاسك، ومعاه الميعاد الجديد.`,
          flag: "script",
          deep: {
            why: R`الـ follow-up اللي بيتكتب غلط بيتقري «انت مقصّر». ولو متكتبش خالص، الشغل بيقف. ونفس الكلام في الاعتذار: الكتير منه أو القليل منه بيبان مش مهني.`,
            how: R`عبارات الـ follow-up من الألطف للأقوى:
[[Just following up on this.]] / [[Friendly reminder about ...]] / [[Bumping this in case it got lost.]] / [[Any update on this?]] / [[We need this by Tuesday to ...]] (مع السبب، للحاجات المستعجلة).

[[bump]] في Slack = ترفع الرسالة تاني للانتباه. و [[in case it got lost]] = لو ضاعت وسط الرسايل (بتفترض حسن النية).

الاعتذار:
بسيط: [[Sorry for the late reply!]] و [[Sorry for the delay.]]
أرسمي: [[Apologies for the delay.]]
لو غلطتك بوضوح: [[I missed the deadline for X. It's now ...]] (قول اللي حصل ببساطة).
شكر بدل اعتذار: [[Thanks for your patience.]] (لطيفة جدًا وبتقفل الموضوع بإيجابية).

و [[when you get a chance]] = لما تلاقي وقت. و [[keep the launch date]] = نحافظ على ميعاد الإطلاق.`,
            when: "أي طلب اتعلّق أكتر من يوم أو اتنين، وأي ميعاد فاتك (والأحسن تبعت قبله إنه هيفوت).",
            mistakes: R`[[Why didn't you reply?]] = هجوم. و [[As per my last email]] = بتتقري عصبية في ثقافة الشغل الإنجليزي. و [[Sorry for late]] ناقصة. واعتذار طويل بأعذار شخصية كتير. و follow-up في رسالة جديدة بدل الـ thread، فالشخص مش لاقي السياق.`
          },
          lines: [
            R`follow-up لطيف + الطلب في سطر + السبب (blocking). when you get a chance = لما تلاقي وقت.`,
            R`friendly reminder + الميعاد والسبب.`,
            R`bump = بترفع الرسالة. in case it got lost = لو ضاعت. Any thoughts = عندك رأي؟`,
            R`اعتذار بسيط عن رد متأخر + الرد على طول.`,
            R`اعتذار + الميعاد الجديد.`,
            R`اعتراف واضح + الحالة دلوقتي + المتوقع. missed = فوّت.`,
            R`شكر بدل اعتذار + الخبر الحلو.`
          ],
          sol: R`أمثلة صح:
(١) [[Hi team, just following up on #145 (search filters). Could someone take a look when you get a chance? It's a small PR, about 80 lines.]]
(٢) [[Hi Ahmed, I hope you're well. Friendly reminder about the product photos and descriptions. We need them by Sunday to launch on the 15th as planned. If it's easier, you can send the first 10 products now and the rest later.]]
(٣) [[Sorry for the delay on the cart task. I underestimated the coupon logic. It's in review now and should be merged by tomorrow noon.]]

راجع: الـ follow-up فيه الطلب ملخص وسبب/ميعاد. والاعتذار جملة واحدة وبعدها الجديد. ولو (٢) عرضت حل أسهل للعميل (يبعت جزء)، ده بيزود فرص الرد جدًا. و [[underestimated]] = قدّرت الوقت أقل من الحقيقي.`
        },
        {
          cmd: "إيميل لعميل",
          title: "إيميل لعميل: Subject واضح، وتحية، ونقط، وخطوة جاية، وتوقيع",
          desc: R`الإيميل أرسمي من Slack، وخصوصًا مع عميل. الشكل: [[Subject]] بيقول الموضوع والمطلوب، وتحية ([[Hi Ahmed,]] مع أغلب العملاء، و [[Dear Mr. Ahmed,]] لو رسمي جدًا أو أول مرة)، وجملة أولى فيها الهدف، ونقط مرقمة لو فيه أكتر من حاجة، وخطوة جاية واضحة (مين يعمل إيه وإمتى)، وإغلاق ([[Best regards,]] أو [[Best,]] أو [[Thanks,]])، واسمك.

العنوان مهم جدًا: [[Update]] وحدها وحشة. الأحسن [[Clinic website: staging ready for review]] أو [[Action needed: product photos by Sunday]].`,
          example: R`Subject: Clinic website: staging ready for your review
Hi Dr. Ahmed,
The booking flow is ready on staging: https://staging.clinicbook.example.com
Could you try it and send me your feedback by Thursday? In particular:
1. Are the working hours correct for each doctor?
2. Is the confirmation message clear for patients?
Two notes:
- Payments are not included in this phase, as agreed.
- Test bookings on staging will not notify real patients.
Once I have your feedback, I'll make the changes and we can go live next week.
Best regards,
Youssef`,
          try: R`اكتب إيميل لعميل (خيالي أو حقيقي) عن مشروع من مشاريعك: بتقوله إن مرحلة خلصت، وبتطلب منه حاجتين محددين بميعاد، وبتفكره بحاجة مش في الاتفاق. أقل من ١٢٠ كلمة. وبعدين اكتب ٣ subject lines مختلفة واختار أوضحهم.`,
          flag: "script",
          deep: {
            why: "العميل بيحكم على احترافيتك من إيميلاتك قبل ما يشوف الكود. إيميل واضح فيه طلبات مرقمة وميعاد = ردود أسرع وخناقات أقل على «احنا متفقناش على كده».",
            how: R`جمل افتتاح: [[I hope you're well.]] (اختيارية ولطيفة)، [[I'm writing to ...]] (أرسمي)، [[Quick update on ...]]، [[Following our call, ...]] (بعد مكالمة).

الطلب: [[Could you ... by Thursday?]] و [[Please let me know if ...]] و [[I'd appreciate it if you could ...]] (أرسمي).

التذكير بالاتفاق: [[as agreed]] و [[as discussed]] و [[per our agreement]] و [[This is not included in the current scope, but ...]].

الإغلاق: [[Let me know if you have any questions.]] و [[Looking forward to your feedback.]] و [[Best regards,]] / [[Kind regards,]] / [[Best,]] / [[Thanks,]].

و [[go live]] = ينزل للناس. و [[phase]] = مرحلة. و [[once]] = أول ما. و [[notify]] = يبعت إشعار.

ولو فيه اتفاق شفهي في مكالمة، ابعت إيميل بعدها يلخّصه ([[Just to confirm what we agreed on the call: ...]]). ده بيحميك (درس [[scope مكتوب]] في «تاب الشغل والكارير»).`,
            when: "أي تواصل مع عميل أو حد برا الفريق، وأي حاجة محتاجة تتوثق.",
            mistakes: R`Subject فاضي أو [[Hello]]. و [[Dear Sir/Madam]] لشخص عارف اسمه. و [[Waiting your reply]] و [[Kindly revert]] (درس الغلطات). وفقرة واحدة طويلة فيها ٥ طلبات: حد هيرد على أول واحد وينسى الباقي. و [[Thanks and regards]] + [[Best regards]] + [[Sincerely]] مع بعض: واحدة كفاية.`
          },
          lines: [
            R`العنوان: المشروع + إيه الجديد + المطلوب.`,
            R`تحية بالاسم (Dr. لأنه دكتور).`,
            R`أول جملة: الهدف واللينك.`,
            R`الطلب بميعاد: «ممكن تجرّبه وتبعتلي رأيك قبل الخميس؟ خصوصًا:»`,
            R`سؤال محدد ١: «مواعيد الشغل صح لكل دكتور؟»`,
            R`سؤال محدد ٢: «رسالة التأكيد واضحة للمرضى؟»`,
            R`«ملاحظتين:»`,
            R`تذكير بالاتفاق: «الدفع مش في المرحلة دي، زي ما اتفقنا».`,
            R`«الحجوزات التجريبية مش هتبعت إشعارات لمرضى حقيقيين». يطمّنه.`,
            R`الخطوة الجاية: «أول ما رأيك يوصل، هعمل التعديلات وننزل الأسبوع الجاي».`,
            R`إغلاق.`,
            R`اسمك.`
          ],
          sol: R`مثال صح (١٠٥ كلمة تقريبًا):
[[Subject: Online store: product pages ready + 2 items needed by Sunday]]
[[Hi Mariam,]]
[[Quick update: the product pages and the cart are ready on staging (link below).]]
[[To launch on the 15th, I need two things from you by Sunday:]]
[[1. The final prices for the 12 new products.]]
[[2. The shipping cost for each governorate.]]
[[A note: the discount codes you mentioned on Monday's call are not included in the current scope. I'm happy to send a quote for them as a separate task.]]
[[Let me know if you have any questions.]]
[[Best regards,]]
[[Youssef]]

Subject lines للمقارنة: [[Update]] (وحش)، [[Store progress]] (عام)، [[Online store: product pages ready + 2 items needed by Sunday]] (الأوضح: الخبر والمطلوب والميعاد). و [[governorate]] = محافظة.`
        }
      ]
    },
    {
      t: "تدوّر صح بالإنجليزي",
      l: 3,
      n: "تدوّر في Google بالكلمات الصح والـ operators، وفي GitHub issues، وتقرا إجابات Stack Overflow بعين ناقدة",
      items: [
        {
          cmd: "Google للمبرمجين",
          title: "تدوّر في Google صح: الجملة الأساسية من الخطأ و \"...\" و site: و -",
          desc: R`البحث بالإنجليزي مهارة لوحدها، وهي اللي بتفرق بين حد بيقعد ساعتين وحد بيلاقي الحل في ٥ دقايق. والخبر الحلو: البحث مش محتاج جمل صح، محتاج كلمات صح.

القواعد: ١) دوّر بالإنجليزي دايمًا، حتى لو الموضوع سهل: المحتوى الإنجليزي أكتر بمية مرة. ٢) انسخ الجملة الأساسية من الخطأ ومن غير الحاجات الخاصة بيك (أسماء ملفاتك، أرقام البورت، الـ IDs). ٣) ضيف اسم الأداة والإصدار ([[prisma 6]] أو [[next 15]]). ٤) اكتب كلمات مش أسئلة: [[react useEffect runs twice]] أحسن من [[why my useEffect is running two times in react]].

الـ operators: [["exact phrase"]] جملة بالظبط، و [[site:github.com]] في موقع معين، و [[-word]] من غير الكلمة دي، و [[OR]] يا ده يا ده، و [[after:2025-01-01]] بعد تاريخ (مفيد جدًا عشان تتجنب إجابات قديمة).`,
          example: R`"Cannot read properties of undefined (reading 'map')" react
"EADDRINUSE" node kill process port 3000
prisma "P2002" unique constraint upsert
next.js app router "cookies" server action -pages
site:github.com vite "Failed to resolve import"
tailwind v4 dark mode after:2025-01-01
eslint flat config typescript "parserOptions"
Wrong: why my code say cannot read properties of undefined when i use map in my component
Right: "Cannot read properties of undefined (reading 'map')" react useState initial value`,
          try: R`خد آخر ٣ أخطاء قابلتك (من [[errors.md]]). لكل واحد اكتب query بالقواعد: الجملة الأساسية بين علامات تنصيص، واسم الأداة، ومن غير حاجاتك الخاصة. دوّر، واكتب رقم النتيجة اللي لقيت فيها الحل (١؟ ٣؟ ١٠؟). وبعدين جرّب نفس الـ query من غير علامات التنصيص وقارن.`,
          flag: "script",
          deep: {
            why: "أغلب المشاكل اللي هتقابلها، حد قابلها قبلك وكتب عنها بالإنجليزي. مهارة البحث بتوصلك له. ومع الـ AI، البحث لسه مهم: الـ AI ممكن يألف، لكن issue على GitHub فيه نفس رسالتك بالظبط ورد من الـ maintainer مصدر أقوى.",
            how: R`إيه اللي تشيله من رسالة الخطأ: المسارات ([[/home/sara/app/src/...]])، وأسماء متغيراتك ([[reading 'products']] ← خليها بس لو مهمة)، والأرقام الخاصة (بورت، ID، timestamp). وإيه اللي تسيبه: كود الخطأ ([[P2002]] و [[TS2322]] و [[EADDRINUSE]])، والجملة الثابتة، واسم الأداة.

كلمات تضيفها للبحث حسب اللي عايزه: [[how to]] (طريقة)، و [[example]] (مثال)، و [[vs]] (مقارنة)، و [[best practice]]، و [[migration guide]] (نقل إصدار)، و [[breaking change]]، و [[workaround]]، و [[docs]] (توديك للمصدر الرسمي)، و [[github issue]].

وافتكر: إصدارات الأدوات بتتغير بسرعة. إجابة من ٢٠١٩ على React أو Next ممكن تكون غلط النهارده. بص على التاريخ دايمًا، واستخدم [[after:]] أو فلتر Tools في Google.`,
            when: "قبل ما تسأل حد، وبعد ما تقرا رسالة الخطأ وتفهمها.",
            mistakes: R`تدوّر بالعربي. وتلصق الـ stack trace كله. وتكتب سؤال طويل بـ grammar صح (مش لازم). وتاخد أول نتيجة من غير ما تبص على تاريخها وإصدارها. وتدوّر باسم متغير خاص بيك ([[reading 'myProducts']]) فمتلاقيش حاجة.`
          },
          lines: [
            R`الجملة الثابتة من خطأ Node بين علامات تنصيص + اسم المكتبة.`,
            R`كود الخطأ + اللي عايز تعمله (تقفل الـ process اللي ماسكة البورت).`,
            R`كود خطأ Prisma (unique constraint) + الـ method.`,
            R`[[-pages]] = من غير نتايج الـ Pages Router القديم.`,
            R`[[site:github.com]] = issues و discussions بس.`,
            R`[[after:]] = نتايج بعد التاريخ ده (الإصدار الجديد).`,
            R`أسماء الإعداد نفسها بين علامات تنصيص.`,
            "غلط: سؤال طويل فيه كلام خاص بيك.",
            "صح: الجملة الثابتة + الأداة + الكلمة اللي بتوصف السياق."
          ],
          sol: R`أمثلة لتحويل:
[[TypeError: Cannot read properties of undefined (reading 'price') at CartItem (/home/me/shop/src/CartItem.tsx:12:30)]]
← [["Cannot read properties of undefined (reading" react props]] أو بـ [['price']] لو عايز. غالبًا أول ٣ نتايج فيها السبب (الـ prop مش مبعوت أو الداتا لسه بتحمّل).

[[Error: P2002 Unique constraint failed on the fields: ($__btemail$__bt)]]
← [[prisma "P2002" unique constraint handle error]].

الفرق مع وبدون علامات التنصيص: من غيرها Google بيدوّر على الكلمات متفرقة، فبتطلعلك نتايج عامة. بيها بتطلعلك صفحات فيها نفس الرسالة بالظبط. لو لقيت الحل في النتيجة ١–٣، الـ query كويس. لو في ١٠ أو ملقتش، قلّل الكلمات أو غيّر اسم الأداة.`
        },
        {
          cmd: "GitHub issues search",
          title: "تدوّر في GitHub issues: is:issue و is:closed و label: و in:title",
          desc: R`لما المشكلة في مكتبة، أحسن مصدر هو الـ issues بتاعتها على GitHub: الـ maintainers بيردوا هناك، والحلول بتبقى للإصدار الحالي، وساعات بتلاقي «ده bug اتصلح في v5.2.1». ومش محتاج Google: خانة البحث في تاب Issues بتقبل qualifiers.

أشهرها: [[is:issue]] أو [[is:pr]]، و [[is:open]] أو [[is:closed]]، و [[label:bug]]، و [[in:title]] (الكلمات في العنوان بس)، و [[author:username]]، و [[sort:updated-desc]] أو [[sort:reactions-+1-desc]] (الأكتر تفاعل)، و [[repo:owner/name]] في البحث العام على github.com/search. وعلامات التنصيص للجملة بالظبط.

اقرا الـ issue صح: العنوان والوصف، وبعدين دوّر على تعليقات الـ maintainers (عليهم علامة Member أو Maintainer أو Collaborator)، وعلى أي PR مربوط ([[linked pull request]] أو [[fixed by #]])، وعلى آخر تعليقات (ممكن حد لاقى workaround).`,
          example: R`is:issue "Failed to resolve import" vite
is:issue is:closed "hydration mismatch" label:bug
is:issue is:open in:title "memory leak"
is:pr is:merged "fix" "useSearchParams"
repo:prisma/prisma is:issue "P2002" sort:reactions-+1-desc
Maintainer: "This is expected behavior. See the docs: ..."
Maintainer: "Fixed in #4521, released in 5.2.1."
User: "Same issue here on v5.2.0. Workaround: pin to 5.1.4 for now."
Bot: "This issue has been automatically marked as stale because it has not had recent activity."`,
          try: R`اختار مكتبة بتستخدمها وخطأ قابلته (أو خد [[Failed to resolve import]] مع vite). دوّر في الـ issues بتاعتها ٣ مرات: بـ [[is:issue is:closed]]، وبـ [[is:issue is:open]]، وبـ [[in:title]]. لكل بحث اكتب: فيه نتيجة مفيدة؟ اتقفل ليه (fixed؟ duplicate؟ stale؟ expected؟)؟`,
          flag: "script",
          deep: {
            why: "المكتبات بتتغير أسرع من Stack Overflow والـ tutorials. الـ issues هي المكان الوحيد اللي هتلاقي فيه «الـ bug ده اتصلح في الإصدار ده» أو «ده سلوك مقصود وده السبب». ومنها كمان بتتعلم إنجليزي الـ maintainers: مختصر ودقيق.",
            how: R`الكلمات اللي هتقابلها في الـ issues: [[repro]] / [[reproduction]]، و [[regression]] (كان شغال وباظ)، و [[expected behavior]] / [[by design]] (مقصود)، و [[duplicate of #]]، و [[stale]] (اتقفل لعدم النشاط)، و [[wontfix]]، و [[upstream]] (المشكلة في مكتبة تانية)، و [[pin to X]] (ثبّت الإصدار ده)، و [[bump]] (رفّع الإصدار)، و [[released in]]، و [[landed in]] (اتدمج في)، و [[canary]] / [[nightly]] / [[beta]] (إصدارات تجريبية)، و [[help wanted]]، و [[good first issue]].

و [[Same issue here]] أو [[+1]] تعليقات بتزعج الـ maintainers: استخدم reaction. ولو عندك معلومة جديدة (إصدار تاني، workaround، repro)، ده التعليق المفيد.

و [[in:title]] مفيد لما الكلمة عامة وبتظهر في تعليقات كتير. و [[sort:reactions-+1-desc]] بيطلعلك المشاكل اللي ناس كتير عندها.`,
            when: "أول ما تشك إن المشكلة من المكتبة مش من كودك، أو بعد ما ترقّي إصدار وحاجة تبوظ.",
            mistakes: R`تفتح issue جديد قبل ما تدوّر في المقفولة. وتقرا أول تعليق وتسيب الباقي (الحل ساعات في آخر تعليق). وتطبّق workaround من سنتين على إصدار جديد. وتفهم [[closed]] إنه «اتحل»: ممكن يكون اتقفل duplicate أو stale أو wontfix.`
          },
          lines: [
            R`issues بس + الجملة بالظبط + اسم الأداة.`,
            R`المقفولة + label bug: غالبًا فيها الحل أو الإصدار اللي صلحه.`,
            R`المفتوحة + الكلمات في العنوان بس.`,
            R`PRs اتدمجت فيها fix و useSearchParams: تعرف اتصلح إمتى.`,
            R`في repo معين + ترتيب بالأكتر تفاعل.`,
            R`رد maintainer: «ده سلوك متوقع، شوف الـ docs». يعني مش bug.`,
            R`رد maintainer: «اتصلح في PR رقم كذا، ونزل في 5.2.1». رقّي.`,
            R`يوزر: «نفس المشكلة على 5.2.0. حل مؤقت: ثبّت على 5.1.4 دلوقتي». pin = تثبّت.`,
            R`bot: «اتعلّم stale لأن مفيش نشاط قريب». يعني ممكن يتقفل من غير حل.`
          ],
          sol: R`النتايج بتختلف حسب المكتبة، بس المفروض تلاقي نمط زي كده:
[[is:issue is:closed]]: issues فيها [[Fixed in #...]] أو [[Closed as completed]] ← شوف الإصدار وقارن بإصدارك ([[npm ls vite]]).
[[is:issue is:open]]: مشاكل لسه مفتوحة، ساعات فيها workaround في التعليقات.
[[in:title]]: نتايج أقل وأدق.

وأسباب القفل اللي هتشوفها في GitHub: [[completed]] (اتحل)، و [[not planned]] (مش هيتعمل: غالبًا wontfix أو stale)، وساعات [[duplicate]]. والـ labels والتعليق الأخير بيوضحوا السبب.

لو ملقتش حاجة خالص، جرّب كلمات أقل، أو ابحث بكود الخطأ بس، أو ابحث في الـ Discussions. ولو متأكد إنه جديد: درس «issue لمشروع open source».`
        },
        {
          cmd: "Stack Overflow بعين ناقدة",
          title: "تقرا إجابة Stack Overflow بعين ناقدة: التاريخ والإصدار والتعليقات",
          desc: R`Stack Overflow لسه فيه إجابات ممتازة لمشاكل كتير، بس فيه كمان إجابات قديمة كانت صح في ٢٠١٥ وبقت غلط أو خطر النهارده. القراية الناقدة = تسأل ٥ أسئلة قبل ما تنسخ أي كود:

١) الإجابة تاريخها إيه، واتعدلت إمتى؟ ٢) الإصدار اللي بتتكلم عنه زي بتاعك؟ ٣) التعليقات تحتها بتقول إيه؟ (هنا بتلاقي «this is deprecated» أو «doesn't work anymore»). ٤) فيه إجابة تانية أحدث تحت؟ (الترتيب الافتراضي بالـ score، والإجابة الـ accepted مبقتش متثبتة فوق من ٢٠٢١، فالأحسن ممكن يبقى تاني أو تالت). ٥) أنا فاهم الكود ده بيعمل إيه؟ لو لأ، متنسخوش.`,
          example: R`Question: How do I make an HTTP request in Node.js?
Answer (2013, score 900): Use the request module: npm install request
Comment (2020): request has been deprecated. See https://github.com/request/request/issues/3142
Answer (2023, score 150): Node 18+ has fetch built in: const res = await fetch(url);
Comment: This works in Node 18+. For older versions, use node-fetch.
Red flags: "just use --force", "disable SSL verification", "chmod 777", "it works for me"
Good signs: explains why, links to docs, mentions the version, has a recent edit`,
          try: R`دوّر على Stack Overflow على سؤال عن [[how to deep clone an object in javascript]]. اقرا أعلى ٣ إجابات بالـ ٥ أسئلة. اكتب: أنهي إجابة هتستخدم النهارده، وليه (تلميح: دوّر على [[structuredClone]])، وأنهي إجابة كانت صح زمان ومبقتش الأحسن.`,
          flag: "script",
          deep: {
            why: "النسخ من غير فهم بيجيب bugs وثغرات أمان. وأخطر الإجابات هي اللي بتحل المشكلة بسرعة بطريقة غلط: تقفل SSL، أو تدّي صلاحيات 777، أو [[--force]]. القراية الناقدة بتحميك، وبتعلمك إنجليزي تقني حقيقي من التعليقات والنقاشات.",
            how: R`كلمات هتقابلها: [[deprecated]] و [[outdated]] (قديم)، و [[as of v18]] (من أول إصدار كذا)، و [[this no longer works]]، و [[edit:]] / [[update:]] (الكاتب زوّد حاجة بعدين)، و [[caveat]] (عيب لازم تعرفه)، و [[this is a hack]] (حل مش نضيف)، و [[this is an anti-pattern]] (أسلوب غلط)، و [[footgun]] (حاجة سهل تأذي بيها نفسك)، و [[TL;DR]]، و [[possible duplicate of]].

علامات الخطر: [[just use --force]]، و [[set rejectUnauthorized: false]] أو [[NODE_TLS_REJECT_UNAUTHORIZED=0]] (بيقفل التحقق من الشهادات)، و [[chmod 777]]، و [[sudo npm install]]، و [[eval]]، و [[it works for me]] من غير شرح.

والإجابة الكويسة بتشرح ليه، وبتلينك الـ docs، وبتقول الإصدار، وساعات بتقول «ده مش مناسب لو...».`,
            when: "كل مرة تفتح Stack Overflow أو أي blog أو إجابة AI.",
            mistakes: R`تنسخ الإجابة الـ accepted على طول. وتتجاهل التعليقات. وتطبّق حل jQuery من ٢٠١٢ في React. وتصدّق إن الـ score العالي = صح النهارده (الـ score اتجمع على سنين).`
          },
          lines: [
            R`السؤال: «أعمل HTTP request في Node إزاي؟»`,
            R`إجابة قديمة بـ score عالي: استخدم مكتبة request.`,
            R`تعليق: «request اتعملها deprecate». ده اللي شفناه في npm بنفسنا في المستوى ١.`,
            R`إجابة أحدث بـ score أقل: Node 18 فيه fetch مدمج. دي الأصح النهارده.`,
            R`تعليق بيحدد الإصدار: «شغال في 18 وفوق، وللأقدم استخدم node-fetch».`,
            R`علامات خطر: «استخدم --force بس»، «اقفل التحقق من SSL»، «chmod 777»، «شغالة عندي».`,
            R`علامات كويسة: بتشرح ليه، ولينك docs، والإصدار، وتعديل قريب.`
          ],
          sol: R`اللي هتلاقيه تقريبًا: إجابات قديمة بـ score عالي بتقترح [[JSON.parse(JSON.stringify(obj))]] (بيضيّع [[Date]] و [[undefined]] و [[Map]] والدوال)، أو [[_.cloneDeep]] من lodash، أو recursive function مكتوبة بإيد. وإجابة أحدث (أو تعديل) بتقول إن [[structuredClone(obj)]] مدمج في المتصفحات الحديثة و Node 17+.

الاختيار النهارده: [[structuredClone]]، لأنه مدمج ومبيحتاجش مكتبة وبيحافظ على Date و Map و Set. والـ caveat: مبينسخش الدوال ولا DOM nodes. [[JSON.parse(JSON.stringify())]] كانت الحل المشهور زمان، ولسه بتنفع لـ JSON بسيط بس.

لو اخترت الإجابة الأعلى score من غير ما تقرا التعليقات، غالبًا فاتك الـ caveat ده.`
        }
      ]
    },
    {
      t: "AI يساعدك متعتمدش عليه",
      l: 3,
      n: "تستخدم الـ AI يشرحلك ويصحّحلك ويعلّمك، مش يكتب بدالك ويترجم وخلاص",
      items: [
        {
          cmd: "AI يشرح مش يترجم",
          title: "تخلي الـ AI يشرح الإنجليزي مش يترجمه: prompts للتعلم",
          desc: R`لو كل مرة تشوف فقرة صعبة تقول للـ AI «ترجم»، هتفهم الفقرة دي وبس، وبعد سنة إنجليزيتك زي ما هي. الطريقة التانية: تخليه «مدرّس» يشرح الكلمات الصعبة، ويبسّط الإنجليزي بالإنجليزي، ويسألك أسئلة.

القاعدة: اطلب شرح الكلمة في سياقها (مش ترجمة قاموس)، واطلب نسخة إنجليزي أبسط بدل ترجمة عربي، واطلب منه يسألك يتأكد إنك فهمت. وفي الآخر، اكتب الكلمات الجديدة في [[words.md]] بنفسك. ده الجزء اللي بيخليك تتعلم.

وخلي بالك إن الـ AI ممكن يغلط في حقائق تقنية (إصدار أو API)، فالمعلومة التقنية تتأكد منها من الـ docs. التفاصيل في درس [[تتحقق من الناتج]] في «تاب الذكاء الاصطناعي».`,
          example: R`Explain the words "idempotent" and "side effect" as they are used in this paragraph. Use simple English, then one Arabic word for each.
Rewrite this paragraph in simple English (A2 level). Keep all technical terms in English.
Don't translate. Ask me 3 questions to check that I understood this paragraph.
List the 5 most useful words in this text for a junior developer, with an example sentence for each.
What does "take precedence over" mean here? Give me two more examples from real docs.
I think this sentence means: "..."  Am I right? If not, explain what I missed.`,
          try: R`خد فقرة من docs صعبة عليك (مثلًا أول فقرتين من صفحة [[Idempotent]] على MDN). استخدم ٣ prompts من المثال بالترتيب: بسّطها، وبعدين يسألك ٣ أسئلة، وبعدين اكتب فهمك وخليه يصححه. اكتب في [[words.md]] الكلمات اللي اتعلمتها ومعاها الجملة الأصلية.`,
          flag: "script",
          deep: {
            why: R`الترجمة بتحل مشكلة النهارده. الشرح والأسئلة بيحلوا مشكلة السنة الجاية. والـ AI أحسن مدرّس لغة متاح: صبور، ومتاح ٢٤ ساعة، وبيعرف السياق التقني. بس لازم انت اللي تقود.`,
            how: R`prompts بتنفع:
[[Rewrite this in simple English]] ← إنجليزي أبسط بدل عربي: بتفضل تقرا إنجليزي.
[[Explain X as it is used here]] ← المعنى في السياق ده (resolve في Promise غير resolve في DNS).
[[Ask me questions to check I understood]] ← بيقلب الدور: انت اللي بتجاوب.
[[I think this means ... Am I right?]] ← أقوى واحد: بتفكر الأول وبعدين تتأكد.
[[Give me more examples from real docs]] ← الكلمة بتثبت لما تشوفها في كذا جملة.
[[Don't give me the answer, give me a hint]] ← للمسائل والأكواد.

وبعد كل جلسة: اكتب ٣–٥ كلمات في [[words.md]] بإيدك. لو الـ AI كتبهم هو، مش هيتحفظوا.

وفي الشغل: متلصقش كود الشركة أو بيانات عملاء أو secrets في أي AI من غير ما تعرف سياسة الشركة (درس [[context من غير أسرار]] في «تاب الذكاء الاصطناعي»).`,
            when: "لما فقرة أو صفحة بتوقفك أكتر من ٥ دقايق. مش لكل جملة: خلي الـ skimming (المستوى ١) هو الأساس.",
            mistakes: R`[[Translate to Arabic]] لكل حاجة. وتقبل الشرح من غير ما تتأكد إنك فهمت (اطلب أسئلة). وتتعلم كلمة وتنساها لأنك مكتبتهاش. وتصدّق حقيقة تقنية من الـ AI من غير docs (خصوصًا الإصدارات والـ APIs الجديدة).`
          },
          lines: [
            R`«اشرح الكلمتين دول زي ما هما مستخدمين في الفقرة دي، بإنجليزي بسيط، وبعدين كلمة عربي لكل واحدة».`,
            R`«اكتب الفقرة دي بإنجليزي بسيط (مستوى A2). سيب المصطلحات التقنية زي ما هي».`,
            R`«متترجمش. اسألني ٣ أسئلة تتأكد إني فهمت».`,
            R`«طلّع أهم ٥ كلمات في النص لمطور junior، مع جملة لكل واحدة».`,
            R`«take precedence over معناها إيه هنا؟ اديني مثالين كمان من docs حقيقية».`,
            R`«أنا فاهم الجملة دي كده: ... صح؟ لو لأ، اشرحلي فاتني إيه». الأقوى.`
          ],
          sol: R`النتيجة المتوقعة: نسخة مبسّطة زي [[A method is idempotent if calling it many times has the same effect on the server as calling it once.]] وأسئلة زي [[Is POST idempotent? Why or why not?]] و [[Is DELETE idempotent even if the second call returns 404?]].

إجاباتك الصح: POST مش idempotent (كل طلب ممكن يعمل حاجة جديدة). و DELETE idempotent لأن التأثير على السيرفر واحد (الحاجة ممسوحة)، حتى لو الرد اتغير (200 بعدين 404). الفكرة إن idempotent عن التأثير (effect) مش عن الرد.

و [[words.md]] المفروض يبقى فيه حاجة زي: [[idempotent = same effect if you repeat it — "All safe methods are idempotent, as well as PUT and DELETE" (MDN)]]. لو الـ AI قالك حاجة عن HTTP مش متأكد منها، ارجع لـ MDN أو RFC 9110.`
        },
        {
          cmd: "تصحيح كتابتك",
          title: "تكتب انت الأول، وبعدين الـ AI يصحح ويشرح الغلط (مش يكتب بدالك)",
          desc: R`الغلطة الأشهر: تقول للـ AI «اكتبلي commit message» أو «اكتبلي إيميل للعميل»، وتنسخ. كده الرسالة حلوة، بس انت متعلمتش حاجة، وفي الانترفيو أو المكالمة مش هيبقى معاك.

الطريقة الصح (وهي نفس فكرة درس [[تكتب بإيدك الأول]] في «تاب الذكاء الاصطناعي»): اكتب انت المسودة بإنجليزيتك مهما كانت. وبعدين اطلب تصحيح مع شرح كل غلطة. وبعدين اكتب النسخة النهائية بإيدك (مش copy). وفي الآخر، حط الغلطات المتكررة في [[mistakes.md]].

بعد شهر هتلاحظ إن نفس الغلطات بتتكرر (الـ s، و a/an، و since/for). دي «قايمتك الشخصية»، وهي أهم من أي كتاب grammar.`,
          example: R`My draft: "Hi, I am working in the bug since yesterday, the problem is the API return 500 when user dont send the email."
Prompt: Correct my English. Show each mistake, the correction, and a one-line reason. Keep my style; don't make it longer.
AI: "working in" -> "working on" (we work ON a task)
AI: "since yesterday" -> OK, but use "I've been working on it since yesterday" (present perfect continuous)
AI: "the API return" -> "the API returns" (third person -s)
AI: "when user dont send" -> "when the user doesn't send" (article + doesn't)
Final (typed by me): "Hi, I've been working on the bug since yesterday. The API returns 500 when the user doesn't send the email."
mistakes.md: working in -> working on | API return -> API returns | dont -> doesn't`,
          try: R`اكتب ٣ حاجات بإنجليزيتك من غير أي مساعدة: commit message، ورسالة Slack بتطلب مساعدة، و standup. وبعدين استخدم الـ prompt اللي في المثال على كل واحدة. اكتب النسخة الصح بإيدك، وحط كل غلطة في [[mistakes.md]]. بعد أسبوع اعمل نفس الحاجة وشوف: فيه غلطات اتكررت؟`,
          flag: "script",
          deep: {
            why: "التعلم بيحصل لما تغلط وتشوف الصح جنب الغلط وتفهم ليه. لما الـ AI يكتب بدالك، مفيش غلط ومفيش تعلم. ولما يصحح مع السبب، كل رسالة بتبقى درس صغير عن غلطاتك انت بالظبط.",
            how: R`الـ prompt المهم: [[Correct my English. Show each mistake, the correction, and a one-line reason. Keep my style; don't make it longer.]]

ليه [[Keep my style; don't make it longer]]؟ لأن الـ AI بيحب يعيد الكتابة بأسلوبه الطويل الرسمي ([[I hope this message finds you well]])، فالرسالة متبقاش بتاعتك وبتبان «AI». عايز تصحيح، مش إعادة كتابة.

prompts تانية مفيدة:
[[Is this natural English for a Slack message to a teammate?]]
[[Make this more polite but keep it short.]]
[[What would a native speaker write instead of "..."?]]
[[Give me 3 ways to say "..." from casual to formal.]]

و [[mistakes.md]] بالشكل ده: [[غلط -> صح | سبب قصير]]. وكل أسبوع اقراه مرة، واختار غلطة واحدة تركز عليها الأسبوع ده.`,
            when: "كل رسالة مهمة في أول ٣ شهور. وبعدين للرسايل الرسمية بس (عميل، CV، انترفيو)، ومع الوقت هتلاقي نفسك مش محتاجه.",
            mistakes: R`تنسخ النسخة المصححة بـ Ctrl+C بدل ما تكتبها. وتطلب [[make it professional]] فيرجعلك إيميل ٣ أضعاف الطول. وتتجاهل الشرح وتاخد الناتج بس. وتصحح كل حاجة بما فيها Slack العادي مع زمايلك: الرسايل السريعة مش محتاجة كمال.`
          },
          lines: [
            R`المسودة بإنجليزيتك: فيها ٤ غلطات.`,
            R`الـ prompt: «صحح، ووريني كل غلطة والتصحيح وسبب في سطر، وخلّي أسلوبي ومتطوّلش».`,
            R`working in ← working on.`,
            R`since yesterday صح، بس مع present perfect continuous.`,
            R`the API return ← returns (الـ s).`,
            R`user dont ← the user doesn't.`,
            R`النسخة النهائية كتبتها بإيدك.`,
            R`اللي اتسجل في mistakes.md.`
          ],
          sol: R`مثال على ناتج أسبوع:
commit: [[fixed the login bug that make user cant enter]] ← [[fix(auth): allow login with uppercase emails]] | الغلطات: ماضي بدل imperative، و [[make]] ← [[makes]]، و [[cant enter]] ← [[can't log in]] (ومش محدد).
Slack: [[can you explain me how the deploy work]] ← [[Can you explain how the deploy works?]] | [[explain me]] و [[works]].
standup: [[yesterday I work on the cart]] ← [[Yesterday I worked on the cart]] | ماضي.

[[mistakes.md]] بعد أسبوع:
[[explain me -> explain to me | explain + something + to someone]]
[[the deploy work -> the deploy works | third person -s]]
[[yesterday I work -> worked | past tense]]

لو لاحظت إن الـ s اتكررت ٣ مرات: دي غلطة الأسبوع اللي جاي. ركّز عليها في كل رسالة.`
        }
      ]
    },
    {
      t: "نصوص أصعب: changelogs و specs وجمل طويلة",
      l: 3,
      n: "تقرا release notes و migration guide، وتفهم MUST و SHOULD في الـ RFCs والمواصفات، وتفك الجملة الطويلة لأجزاء",
      items: [
        {
          cmd: "changelog و release notes",
          title: "تقرا changelog و release notes: Breaking changes و Deprecated و Migration guide",
          desc: R`قبل ما ترقّي أي مكتبة لإصدار جديد، لازم تقرا الـ changelog أو الـ release notes. ده المكان اللي بيقولك إيه اتغير، وإيه اللي هيكسر كودك.

فيه شكل مشهور اسمه Keep a Changelog بيقسّم كل إصدار لأقسام ثابتة: [[Added]] حاجات جديدة، و [[Changed]] حاجات اتغيرت، و [[Deprecated]] هتتشال قريب، و [[Removed]] اتشالت، و [[Fixed]] bugs اتصلحت، و [[Security]] ثغرات اتقفلت. وأغلب المكتبات الكبيرة عندها صفحة [[Upgrade guide]] أو [[Migration guide]] للإصدارات الكبيرة (major).

والإصدار نفسه بيقولك حاجة (semver): [[MAJOR.MINOR.PATCH]]. الـ MAJOR (من 4 لـ 5) = فيه breaking changes. الـ MINOR (من 5.1 لـ 5.2) = features جديدة ومفيش كسر. الـ PATCH (من 5.2.0 لـ 5.2.1) = bug fixes بس.`,
          example: R`## [5.0.0] - 2026-08-12
### Breaking changes
- Dropped support for Node 18. Node 20 or later is now required.
- $__btcreateClient()$__bt no longer accepts a URL string; pass $__bt{ url }$__bt instead.
### Added
- Retry options for network errors.
### Deprecated
- $__btclient.query()$__bt is deprecated in favor of $__btclient.execute()$__bt and will be removed in 6.0.
### Fixed
- Connections are now closed correctly on shutdown (#812).
### Security
- Headers containing CRLF are rejected.`,
          try: R`افتح صفحة الـ Releases لمكتبة بتستخدمها على GitHub (أو ملف [[CHANGELOG.md]])، واختار آخر إصدار major. اقرا قسم الـ breaking changes، ولكل واحد اكتب: إيه اتغير، وهل يأثر على كودك، ولو آه هتغيّر إيه. استخدم [[npm ls <package>]] عشان تعرف إصدارك.`,
          flag: "script",
          deep: {
            why: R`أغلب مصايب «رقّيت المكتبة والمشروع باظ» سببها إن حد مقراش الـ breaking changes. وقراية changelog بتاخد ٥ دقايق وبتوفر يوم. وكمان لما تعرف [[semver]]، هتفهم ليه [[^5.2.0]] في package.json بيسمح بـ 5.9 بس مش 6.0.`,
            how: R`كلمات الـ changelogs: [[dropped support for]] = وقف دعم، و [[now required]] = بقى لازم، و [[no longer]] = مبقاش، و [[in favor of]] = لصالح (البديل)، و [[will be removed in]] = هيتشال في، و [[renamed X to Y]]، و [[moved to]]، و [[now defaults to]] = القيمة الافتراضية اتغيرت (خطيرة وساكتة!)، و [[opt-in]] = لازم تفعّلها بنفسك، و [[opt-out]] = شغالة وتقدر تقفلها، و [[behind a flag]] = محتاجة flag، و [[stable]] = بقت ثابتة بعد ما كانت تجريبية، و [[codemod]] = سكربت بيعدّل كودك أوتوماتيك للإصدار الجديد.

وفي release notes بتاعة Node مثلًا هتلاقي [[Notable changes]] (أهم التغييرات) و [[semver-major]] على التغييرات الكاسرة.

الترتيب الصح للترقية: اقرا الـ breaking changes → دوّر في كودك على الحاجات دي (Ctrl+Shift+F) → شوف فيه codemod → رقّي → شغّل الاختبارات.`,
            when: "قبل أي ترقية major، ولما Dependabot أو Renovate يفتحلك PR، ولما حاجة تبوظ بعد [[npm update]].",
            mistakes: R`ترقّي من 4 لـ 6 مرة واحدة من غير ما تقرا 5. وتعدّي [[now defaults to]] لأنها مش في Breaking. وتفهم [[Deprecated]] إنها اتشالت (لأ، لسه شغالة، بس ابدأ انقل). وتقرا الـ changelog بتاع main بدل بتاع الإصدار اللي هتنزله.`
          },
          lines: [
            R`«وقفنا دعم Node 18. لازم Node 20 أو أحدث».`,
            R`«createClient مبقتش بتقبل URL كـ string؛ ابعت object فيه url بدلها». لازم تعدّل كودك.`,
            R`«إعدادات retry لأخطاء الشبكة». جديد.`,
            R`«query هتتشال لصالح execute، وهتتشال فعلًا في 6.0». ابدأ انقل.`,
            R`«الاتصالات بتتقفل صح وقت الإيقاف». bug اتصلح ورقم الـ issue.`,
            R`«الـ headers اللي فيها CRLF بتترفض». ثغرة اتقفلت.`
          ],
          sol: R`شكل الإجابة الصح لكل breaking change:
[[Dropped support for Node 18]] ← إيه اتغير: لازم Node 20+. يأثر؟ [[node -v]] عندي 22، والسيرفر؟ لو 18 لازم يترقّى الأول.
[[createClient() no longer accepts a URL string]] ← دوّرت بـ Ctrl+Shift+F على [[createClient(]] ولقيت ٢ مكان بيبعتوا string ← هغيّرهم لـ [[createClient({ url })]].
[[client.query() is deprecated]] ← مش هيكسر دلوقتي، بس هعمل issue عشان ننقل لـ [[execute()]] قبل 6.0.

لو المكتبة عندها Migration guide، لازم تلاقي فيه أمثلة before/after للكود. ولو فيه [[codemod]]، ده بيوفر وقت (بس راجع الـ diff بتاعه).`
        },
        {
          cmd: "RFC و spec",
          title: "تقرا RFC أو spec: MUST و SHOULD و MAY بحروف كبيرة، و «when, and only when»",
          desc: R`المواصفات الرسمية (RFCs بتاعة الإنترنت زي HTTP، ومواصفات زي Conventional Commits و semver و OpenAPI) بتتكتب بإنجليزي دقيق جدًا، وبتستخدم كلمات بحروف كبيرة ليها معنى قانوني تقريبًا.

الكلمات دي متعرّفة في RFC 2119 و RFC 8174 (مع بعض اسمهم BCP 14): [[MUST]] / [[REQUIRED]] / [[SHALL]] = إجباري تمامًا، و [[MUST NOT]] / [[SHALL NOT]] = ممنوع تمامًا، و [[SHOULD]] / [[RECOMMENDED]] = المفروض، إلا لو عندك سبب قوي وفاهم العواقب، و [[SHOULD NOT]] / [[NOT RECOMMENDED]] = المفروض لأ بنفس المنطق، و [[MAY]] / [[OPTIONAL]] = اختياري فعلًا.

و RFC 8174 وضّح إن المعنى الخاص ده للكلمات لما تكون بحروف كبيرة بس. عشان كده المواصفات الحديثة بتبدأ بجملة ثابتة فيها [[when, and only when, they appear in all capitals]].`,
          example: R`The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in BCP 14 [RFC2119] [RFC8174] when, and only when, they appear in all capitals, as shown here.
Commits MUST be prefixed with a type, which consists of a noun, feat, fix, etc., followed by the OPTIONAL scope, OPTIONAL !, and REQUIRED terminal colon and space.
A request method is considered "idempotent" if the intended effect on the server of multiple identical requests with that method is the same as the effect for a single such request.`,
          try: R`اقرا الجملة التانية (من مواصفة Conventional Commits) وقسّمها: إيه الإجباري؟ إيه الاختياري؟ وبعدين اكتب ٣ commit messages: واحد بيحقق كل حاجة، وواحد بيكسر MUST، وواحد بيستخدم كل الحاجات الـ OPTIONAL. وبعدين اقرا الجملة التالتة (من RFC 9110 عن HTTP) وقول بجملتك: ليه PUT idempotent و POST لأ؟`,
          flag: "script",
          deep: {
            why: R`المواصفات هي «الحقيقة الأصلية» اللي الأدوات والمكتبات مبنية عليها. لما تختلف مع حد في الانترفيو أو الـ review على «هل PUT المفروض يبقى idempotent؟»، الإجابة في الـ RFC. ومعرفة MUST/SHOULD بتخليك تعرف أنهي قاعدة مرنة وأنهي لأ.`,
            how: R`طريقة قراية الجملة الطويلة في المواصفات: ١) دوّر على الكلمة الكبيرة (MUST أو SHOULD). ٢) اللي قبلها = مين (الفاعل: [[A server]]، [[The client]]، [[Commits]]). ٣) اللي بعدها = يعمل إيه. ٤) أي [[if]] أو [[unless]] أو [[when]] = الشرط.

الجملة المشهورة [[when, and only when, they appear in all capitals]] = «لما، ولما بس، تكون بحروف كبيرة». يعني [[should]] الصغيرة في نفس المستند مجرد كلمة عادية.

كلمات المواصفات: [[is considered]] = يُعتبر، و [[intended effect]] = التأثير المقصود، و [[identical]] = متطابق، و [[such]] = زي ده، و [[consists of]] = بيتكون من، و [[terminal]] هنا = في الآخر (مش terminal الأوامر!)، و [[prefixed with]] = قبله، و [[interpreted as]] = يتفهم على إنه.

و [[terminal colon and space]] = «نقطتين ومسافة في الآخر» (بعد النوع). مثال حلو إن نفس الكلمة (terminal) ليها معنى تاني خالص في سياق تاني.`,
            when: "لما تحتاج إجابة نهائية على سؤال تقني عن بروتوكول أو مواصفة، أو تبني حاجة لازم تتوافق معاها (API، أو parser، أو أداة).",
            mistakes: R`تعامل SHOULD زي MUST (فتعقّد حاجات من غير داعي)، أو زي MAY (فتكسر توقعات ناس تانية). وتقرا RFC قديم اتلغى: RFC 7231 مثلًا اتحل محله RFC 9110 لـ HTTP. أول الصفحة بيقولك [[Obsoletes]] و [[Obsoleted by]]. وتحاول تقرا الـ RFC كله: دوّر على القسم اللي محتاجه بس.`
          },
          lines: [
            R`الجملة الثابتة من RFC 8174: «الكلمات دي تتفهم زي ما BCP 14 بيقول، لما، ولما بس، تكون بحروف كبيرة زي هنا».`,
            R`من مواصفة Conventional Commits: «الـ commits لازم يبقى قبلها نوع (اسم زي feat و fix)، وبعده scope اختياري، و ! اختيارية، ونقطتين ومسافة إجباري».`,
            R`من RFC 9110: «الـ method بتتعتبر idempotent لو التأثير المقصود على السيرفر من طلبات كتير متطابقة زي تأثير طلب واحد».`
          ],
          sol: R`تقسيم جملة Conventional Commits: الإجباري ([[MUST]] و [[REQUIRED]]) = نوع (type) + [[: ]] (نقطتين ومسافة). الاختياري ([[OPTIONAL]]) = الـ scope و الـ [[!]].

٣ أمثلة:
بيحقق كل حاجة: [[fix: handle empty cart]]
بيكسر MUST: [[handle empty cart]] (مفيش نوع) أو [[fix:handle empty cart]] (مفيش مسافة بعد النقطتين).
كل الـ OPTIONAL: [[feat(api)!: remove v1 endpoints]]

و idempotent: [[PUT /users/5]] بنفس الـ body ١٠ مرات = المستخدم ٥ بنفس الداتا (نفس تأثير مرة واحدة)، فهو idempotent. و [[POST /orders]] ١٠ مرات = ١٠ أوردرات، فمش idempotent. والكلمة المهمة في الـ RFC [[intended effect]]: الكلام عن التأثير على السيرفر، مش إن الرد لازم يبقى نفسه.`
        },
        {
          cmd: "تفك جملة طويلة",
          title: "تفك جملة إنجليزي طويلة: الفعل الأساسي، و which و that، والأقواس",
          desc: R`الـ docs والـ specs فيها جمل ٤٠ كلمة، واللي إنجليزيته ضعيفة بيتوه في النص. الحل مش إنك تترجم كل كلمة، الحل إنك تلاقي «هيكل» الجملة الأول:

١) لاقي الفعل الأساسي والفاعل بتاعه (غالبًا في أول الجملة). ٢) شيل كل حاجة بين فواصل أو أقواس مؤقتًا (دي تفاصيل). ٣) شيل الـ [[which]] و [[that]] و [[who]] والكلام اللي بعدهم (دي وصف لكلمة قبلها). ٤) اقرا الهيكل: [[The server returns a 409]]. ٥) رجّع التفاصيل واحدة واحدة.

الكلمات اللي بتفصل أجزاء: [[which]] / [[that]] = اللي (وصف)، و [[where]] = بحيث/فين، و [[when]] = لما، و [[if]] / [[unless]] = شرط، و [[so that]] = عشان، و [[because]] / [[since]] = عشان/لأن، و [[although]] / [[while]] = مع إن، و [[however]] = بس/لكن، و [[such as]] = زي.`,
          example: R`Full: When a client sends a request with an If-Match header that does not match the current ETag of the resource, which usually means that another client has modified it in the meantime, the server returns 412 Precondition Failed instead of applying the update.
Step 1 (core): the server returns 412 Precondition Failed
Step 2 (condition): When a client sends a request with an If-Match header
Step 3 (describes the header): that does not match the current ETag of the resource
Step 4 (extra explanation): which usually means that another client has modified it in the meantime
Step 5 (alternative): instead of applying the update
Short version: If the ETag doesn't match, someone else changed it, so the server refuses the update with 412.`,
          try: R`فك الجملة دي بنفس الخطوات: [[By default, the build output, which is written to the dist directory unless you set outDir in the config file, is cleaned before each build so that stale files from previous builds are not deployed accidentally.]] واكتب النسخة القصيرة بإنجليزي بسيط وبالعربي.`,
          flag: "script",
          deep: {
            why: "الجمل الطويلة هي أكتر حاجة بتخلي الناس تقفل الصفحة وتفتح الترجمة. ولما تتعلم تفكها، بتكتشف إن أغلبها فكرة بسيطة جدًا متغطية بتفاصيل.",
            how: R`حيل للسرعة:
الفعل الأساسي غالبًا بعد أول اسم كبير ([[the server returns]]، [[the build output ... is cleaned]]). لو لقيت [[which]] أو فاصلة بعد الفاعل، الفعل الأساسي بعد الجزء ده.
الفواصل بتقسم، والأقواس = تفاصيل تقدر تعدّيها في أول قراية.
[[that]] بعد اسم = وصف ([[a header that does not match]])، بس [[that]] بعد فعل زي [[means]] أو [[ensure]] = «إن» ([[means that another client ...]]).
[[instead of]] و [[rather than]] = البديل اللي محصلش.
[[so that]] = الهدف. و [[unless]] = الاستثناء.

وبعد ما تفك الجملة، اكتب «short version» لنفسك. ده بيثبت الفهم، وبيعلمك إزاي تكتب انت بجمل قصيرة.`,
            when: "أي جملة قرأتها مرتين ومفهمتهاش. وخصوصًا في الـ specs، و docs الأمان، وشروط الخدمات (terms).",
            mistakes: R`تترجم من أول الجملة لآخرها بالترتيب: الإنجليزي ترتيبه غير العربي، فبتطلع ترجمة ملخبطة. وتتلخبط بين [[that]] الوصف و [[that]] بمعنى «إن». وتفوّت [[unless]] أو [[instead of]] في النص فالمعنى يتقلب.`
          },
          lines: [
            R`الجملة كاملة (٤٥ كلمة تقريبًا).`,
            R`الهيكل: «السيرفر بيرجّع 412». ده الأساس.`,
            R`الشرط: «لما client يبعت طلب فيه If-Match header».`,
            R`[[that]] بتوصف الـ header: «مش مطابق للـ ETag الحالي».`,
            R`[[which]] شرح إضافي: «وده غالبًا معناه إن client تاني عدّله في الوقت ده».`,
            R`[[instead of]]: البديل اللي محصلش: «بدل ما يطبّق التعديل».`,
            R`النسخة القصيرة: لو الـ ETag مش مطابق، حد غيّره، فالسيرفر يرفض بـ 412.`
          ],
          sol: R`التفكيك:
الهيكل: [[the build output is cleaned before each build]] ← «ناتج الـ build بيتمسح قبل كل build».
[[By default]] ← افتراضيًا.
[[which is written to the dist directory]] ← وصف: «اللي بيتكتب في فولدر dist».
[[unless you set outDir in the config file]] ← استثناء: «إلا لو حطيت outDir في ملف الإعدادات».
[[so that stale files from previous builds are not deployed accidentally]] ← الهدف: «عشان ملفات قديمة من builds قبل كده متتنشرش بالغلط».

Short version: [[By default, the output folder (dist) is emptied before every build, so old files don't get deployed by mistake.]]
بالعربي: «افتراضيًا فولدر الناتج (dist، أو اللي في outDir) بيتفضّى قبل كل build، عشان ملفات قديمة متتنشرش بالغلط».

لو فهمت إن الـ [[unless]] بتاعة الـ cleaning (يعني «مش هيتمسح لو حطيت outDir»)، ارجع للخطوة ٣: [[unless]] جوه جملة الـ [[which]] بتاعة dist، فهي بتوصف مكان الناتج بس.`
        }
      ]
    },
    {
      t: "خطة ٩٠ يوم: ٢٠ دقيقة في اليوم",
      l: 3,
      n: "روتين يومي صغير (قراية ومراجعة كلمات وكتابة)، ومراجعة متباعدة للكلمات، و «اختبرني» في الموقع ده، وتقيس تقدمك كل ٣٠ يوم",
      items: [
        {
          cmd: "٢٠ دقيقة في اليوم",
          title: "الخطة اليومية: صفحة docs و ١٠ كلمات ورسالة واحدة في ٢٠ دقيقة",
          desc: R`الإنجليزي بيتحسن بالتكرار اليومي الصغير، مش بكورس مكثف أسبوع وبعدين تبطّل. ٢٠ دقيقة كل يوم لمدة ٩٠ يوم = ٣٠ ساعة، وده كفاية تفرق جدًا في القراية والكتابة التقنية، لأنك بتتعلم الـ ٣٠٠ كلمة اللي بتتكرر، مش اللغة كلها.

الـ ٢٠ دقيقة متقسمة ٣ أجزاء: ١) [[8 دقايق قراية]]: صفحة docs واحدة (أو جزء منها) لأداة بتستخدمها فعلًا، بطريقة الـ skimming وبعدين تقرا الجزء المهم كويس. ٢) [[5 دقايق كلمات]]: مراجعة الكلمات القديمة اللي عليها الدور وإضافة كلمات جديدة من القراية (الدرس الجاي). ٣) [[7 دقايق كتابة]]: حاجة واحدة حقيقية بالإنجليزي: commit، أو وصف PR، أو رسالة، أو standup، أو ٣ جمل عن اللي قريته. وبعدين تصحيح (درس «تصحيح كتابتك»).

والمهم: نفس الميعاد كل يوم (مثلًا أول ما تفتح اللابتوب قبل الشغل)، ولو فوّت يوم متعوّضوش بساعة: كمّل عادي بكرة.`,
          example: R`Daily routine (20 min)
08:00-08:08  Read: one docs page for a tool I use (skim, then read the key part)
08:08-08:13  Words: review today's due cards in words.md + add up to 10 new words
08:13-08:20  Write: one real text in English (commit, PR, message, or 3-sentence summary)
Weekly (Friday, 15 min)
- Re-read mistakes.md and pick one mistake to focus on next week
- Count: pages read, words added, texts written
Month 1: docs of tools I use daily (npm, git, the framework)
Month 2: error messages + GitHub issues + one PR description a day
Month 3: RFC/spec sections, changelogs, and writing a README or blog post`,
          try: R`اعمل ملف [[plan.md]] في فولدر [[english]] وانسخ فيه الروتين ده بمواعيدك انت. حط تذكير يومي في موبايلك بنفس الميعاد. وسجّل النهارده أول يوم: الصفحة اللي قريتها، والكلمات، والنص اللي كتبته.`,
          flag: "script",
          deep: {
            why: "المشكلة مش إنك مش ذكي في اللغات، المشكلة إن محدش علّمك إنجليزي «المبرمج» بشكل مباشر. والطريقة دي بتركز على اللي هتستخدمه فعلًا بكرة الصبح في شغلك. والـ ٢٠ دقيقة صغيرة كفاية إنك متبطّلش.",
            how: R`اختيار صفحة القراية: حاجة محتاجها الأسبوع ده (مكتبة بتستخدمها، أو خطأ قابلك). القراية اللي ليها هدف بتتفهم وبتتفتكر أكتر بكتير من القراية العامة.

الكتابة: لازم تبقى حاجة حقيقية هتتبعت أو هتتحفظ، مش تمارين: commit فعلي، أو PR فعلي، أو رسالة فعلية. ولو مفيش شغل النهارده، اكتب ٣ جمل عن الصفحة اللي قريتها: [[Today I read about ... The key idea is ... I didn't know that ...]].

الشهور: الشهر الأول الأدوات اللي بتستخدمها كل يوم (المفردات الأساسية). التاني الأخطاء والـ issues والـ PRs (قراية سريعة وكتابة قصيرة). التالت الـ specs والـ changelogs والكتابة الطويلة (README أو blog).

ولو عندك وقت زيادة: اسمع talk تقني (YouTube أو podcast) بترجمة إنجليزي (مش عربي) ١٠ دقايق. ده بيجهزك للمكالمات والانترفيو (شوف درس [[English وانجليزيتك مش قوية]] في «تاب الانترفيو»).`,
            when: "ابدأ النهارده. أحسن وقت: قبل الشغل أو المذاكرة على طول، مش آخر اليوم وانت تعبان.",
            mistakes: R`تبدأ بساعتين في اليوم وتبطّل بعد أسبوع. وتقرا حاجات مش محتاجها (رواية أو أخبار) وتسيب الـ docs. وتكتب تمارين مش حاجات حقيقية. وتعوّض الأيام الفايتة بيوم طويل: الانتظام أهم من الكمية. وتقيس نفسك كل يوم: قيس كل ٣٠ يوم (آخر درس).`
          },
          lines: [
            "عنوان: الروتين اليومي.",
            R`٨ دقايق قراية: صفحة docs واحدة لأداة بستخدمها.`,
            R`٥ دقايق كلمات: مراجعة اللي عليها الدور + لحد ١٠ جديدة. due = عليها الدور.`,
            R`٧ دقايق كتابة: نص حقيقي واحد.`,
            "عنوان: الأسبوعي.",
            R`اقرا mistakes.md واختار غلطة واحدة للأسبوع الجاي.`,
            R`عدّ: صفحات، وكلمات، ونصوص.`,
            R`الشهر ١: docs أدوات يومية.`,
            R`الشهر ٢: رسايل أخطاء و issues ووصف PR كل يوم.`,
            R`الشهر ٣: specs و changelogs و README أو مقال.`
          ],
          sol: R`[[plan.md]] صح بيبقى فيه: ميعاد ثابت (مثلًا [[07:30]])، والتلات أجزاء بالدقايق، وسطر لكل يوم بالشكل ده:
[[Day 1 — Read: Vite "Getting Started" (Scaffolding section). Words: scaffold, template, preset. Wrote: commit "docs: add setup steps to README".]]
[[Day 2 — Read: MDN fetch() Exceptions. Words: abort, resolve, reject. Wrote: 3-sentence summary of when fetch rejects.]]

اختبار إن الخطة واقعية: لو اليوم الأول خد أكتر من ٢٥ دقيقة، قلّل القراية لنص صفحة. الهدف إن اليوم ٤٠ يبقى سهل زي اليوم ١. ولو فوّت يومين ورا بعض، مفيش مشكلة: الـ plan.md بيوريك إنك عملت كذا يوم قبلهم، وده بيشجع ترجع.`
        },
        {
          cmd: "مراجعة الكلمات",
          title: "١٠ كلمات في اليوم بمراجعة متباعدة (spaced repetition): بعد ١ و ٣ و ٧ و ٢١ يوم",
          desc: R`الكلمة اللي بتشوفها مرة بتتنسى في أيام. اللي بتراجعها في الوقت الصح بتفضل. الفكرة اسمها [[spaced repetition]] (المراجعة المتباعدة): تراجع الكلمة بعد يوم، وبعدين ٣ أيام، وبعدين أسبوع، وبعدين ٣ أسابيع. كل مرة تفتكرها صح، المسافة بتزيد. ولو نسيتها، ترجع للأول.

ملف [[words.md]] بسيط يكفي، أو تطبيق زي Anki لو بتحب. كل كلمة ليها: الكلمة، والمعنى بكلامك (عربي أو إنجليزي بسيط)، والجملة الحقيقية اللي شفتها فيها (ومنين)، وجملة من عندك، وتاريخ المراجعة الجاية.

القاعدة الذهبية: الكلمة من غير جملة متتحفظش. [[deprecated = مهمل]] هتتنسى. [[deprecated: "request has been deprecated" (npm warning) = still works but will be removed; use X instead]] هتفضل.`,
          example: R`| word          | meaning (my words)                    | real sentence (source)                               | my sentence                               | next review |
| deprecated    | still works, will be removed; move on | "request has been deprecated" (npm warn)             | "This method is deprecated; use fetch()." | Oct 3       |
| idempotent    | same effect if you repeat it          | "All safe methods are idempotent, as well as PUT and DELETE" (MDN) | "Our payment endpoint must be idempotent."| Oct 1       |
| take precedence over | wins when both are set         | "CLI flags take precedence over the config file"     | "Env vars take precedence over defaults." | Oct 7       |
| stale         | old, needs refresh                    | "by default consider cached data as stale" (TanStack Query docs) | "The cache was stale after the deploy."   | Oct 21      |
Review rule: correct -> next gap (1 -> 3 -> 7 -> 21 -> 60 days). Wrong -> back to 1 day.`,
          try: R`اعمل [[words.md]] بالجدول ده. ضيف ١٠ كلمات من أي درس في المستوى ١ من التاب ده، ولكل واحدة جملة حقيقية (انسخها من الـ docs أو من رسالة خطأ شفتها) وجملة من عندك عن مشروعك. حط مراجعة بكرة. وبكرة: غطّي عمود المعنى، وحاول تفتكر، وحدّث التاريخ.`,
          flag: "script",
          deep: {
            why: "الكلمات هي أكبر عائق في القراية: لو ٣ كلمات في كل جملة مش معروفة، الفقرة مستحيلة. ولو عارف الـ ٣٠٠ كلمة المتكررة، أغلب الـ docs بتبقى مفهومة. والمراجعة المتباعدة من أكتر طرق الحفظ المدروسة والفعالة.",
            how: R`إزاي تختار الكلمات: من القراية اليومية بس، واللي بتتكرر أو في عنوان أو وقفتك عن الفهم. متضيفش كل كلمة جديدة: ١٠ في اليوم كحد أقصى، وأقل عادي.

إزاي تراجع: بص على الكلمة، وقول معناها واعمل جملة بصوت عالي، وبعدين اكشف. صح؟ المسافة الجاية أكبر ([[1 → 3 → 7 → 21 → 60]] يوم). غلط؟ ارجع ليوم ١. المراجعة كلها ٥ دقايق لأن كل يوم عليه عدد محدود.

ولو بتستخدم Anki: الوجه الأمامي الجملة الحقيقية والكلمة متعلّم عليها، والخلفي المعنى وجملتك. Anki بيحسب المواعيد لوحده.

وبعد ٩٠ يوم بـ ٥ كلمات في المتوسط = حوالي ٤٥٠ كلمة. أغلبهم هيبقوا جزء منك، مش محفوظين بس.`,
            when: "كل يوم في الـ ٥ دقايق بتوع الكلمات. والكلمات الجديدة بتيجي من الـ ٨ دقايق بتوع القراية.",
            mistakes: R`تضيف ٥٠ كلمة في يوم وتبطّل. وتكتب الكلمة ومعناها من غير جملة. وتراجع كل الكلمات كل يوم (بيبقى ممل وطويل). وتحفظ كلمات عامة من قايمة «أشهر ١٠٠٠ كلمة إنجليزي» بدل الكلمات اللي في شغلك فعلًا.`
          },
          lines: [
            R`عناوين الأعمدة: الكلمة، المعنى بكلامك، جملة حقيقية ومصدرها، جملتك، المراجعة الجاية.`,
            R`deprecated: جملة من تحذير npm اللي شفناه في المستوى ١.`,
            R`idempotent: من MDN. وجملتك عن مشروعك.`,
            R`take precedence over: من README (درس README و Getting started).`,
            R`stale: من docs React Query. مراجعتها بعد ٣ أسابيع لأنك افتكرتها ٣ مرات.`,
            R`قاعدة المراجعة: صح ← المسافة الجاية. غلط ← ارجع ليوم واحد.`
          ],
          sol: R`[[words.md]] صح بعد اليوم الأول: ١٠ صفوف، كل صف فيه جملة حقيقية بين علامات تنصيص ومصدرها ([[(npm warn)]]، [[(MDN)]]، [[(git hint)]])، وجملة من عندك فيها اسم حاجة من مشروعك، وتاريخ بكرة.

مثال صف كويس:
[[| pending | still waiting, not done yet | "Your payment is still pending." (Stripe docs) | "The order stays pending until the webhook arrives." | Oct 1 |]]

مثال صف ضعيف:
[[| pending | معلق | - | - | - |]] ← مفيش جملة حقيقية ولا جملة ليك ولا ميعاد. هتتنسى.

وبكرة في المراجعة: لو افتكرت ٧ من ١٠، ممتاز. الـ ٣ اللي نسيتهم ميعادهم بعد يوم تاني، والـ ٧ بعد ٣ أيام.`
        },
        {
          cmd: "اختبرني للكلمات",
          title: "تستخدم «اختبرني» و «راجع اللي نسيته» و «اكتب ملاحظة» في الموقع ده للإنجليزي",
          desc: R`الموقع ده نفسه فيه أدوات مراجعة تنفع جدًا مع التاب ده:

«اختبرني» (الزرار جنب المستويات): بيطلعلك بطاقات عشوائية من التاب والمستوى اللي انت فيهم. البطاقة بتوريك عنوان الدرس كسؤال (زي «الفرق بين get و fetch و load و return و send»). قبل ما تكشف، قول بصوت عالي كل كلمة ومعناها وجملة إنجليزي بيها. وبعدين اكشف (مسافة) وقارن بالمثال، واختار «عرفتها» (1) أو «لسه» (2). البطاقات اللي بتقول عليها «لسه» بتطلعلك أكتر.

«راجع اللي نسيته» (فوق الصفحة): بيجمع البطاقات اللي نسيتها أكتر ما افتكرتها من كل التابات. ودي فعليًا مراجعة متباعدة جاهزة. والبطاقة بتخرج من الكومة لما تفتكرها أكتر ما نسيتها.

«اكتب ملاحظة» تحت كل درس: اكتب فيها كلماتك وجملك انت عن الدرس ده. والملاحظات بتدخل في البحث، فلو كتبت [[stale]] في ملاحظة، البحث عن stale هيلاقيها.`,
          example: R`Card: "الفرق بين get و fetch و load و return و send"
Say before you reveal:
  get = take a value that already exists: "Get the current user from the session."
  fetch = bring it from outside, takes time: "Fetch the orders from the API."
  load = bring and prepare: "Load the config file on startup."
  return = a function gives back a result: "This function returns the total."
  send = "Send a confirmation email to the user."
Reveal -> compare with the example -> press 1 (knew it) or 2 (not yet)
Daily: 5 cards from this tab + "راجع اللي نسيته" once
Note on the lesson: "My sentence: My app fetches products from Supabase and returns them sorted."`,
          try: R`افتح «اختبرني» على المستوى ١ من التاب ده، وجاوب ١٠ بطاقات بالطريقة دي (قول الكلمات وجملة لكل واحدة بصوت عالي قبل ما تكشف). لكل بطاقة قلت عليها «لسه»، افتح الدرس واكتب ملاحظة فيها جملة من عندك. وبكرة اعمل «راجع اللي نسيته».`,
          flag: "script",
          deep: {
            why: "انت هنا خلاص كل يوم عشان التابات التانية، فالمراجعة مش محتاجة أداة جديدة. و «اختبرني» مبني على نفس فكرة المراجعة المتباعدة: اللي بتنساه بيرجعلك أكتر.",
            how: R`ليه «قول بصوت عالي قبل ما تكشف»: التذكر الفعلي (active recall) هو اللي بيثبت، مش إنك تقرا الإجابة وتقول «آه عارفها». لو مقدرتش تقول جملة بالكلمة، اضغط «لسه» حتى لو فاكر معناها بالعربي.

قسّم المستويات: المستوى ١ (الكلمات ورسايل الأخطاء) بطاقاته أنسب للكلمات. المستوى ٢ بطاقاته أنسب لـ «اكتب commit/رسالة من دماغك قبل ما تكشف». المستوى ٣ للأفكار والخطة.

والبطاقات بتتحفظ في المتصفح بتاعك، فلو غيّرت جهاز، استخدم تصدير التقدم (backup) لو متاح في الصفحة عندك.

و «جربتها» (الـ checkbox): علّم عليه لما تعمل الـ try فعلًا، مش لما تقرا الدرس. و زرار «اللي فاضل بس» بيخبّي اللي علّمت عليه.`,
            when: "كل يوم ٥ دقايق (جزء الكلمات في الخطة اليومية)، ومرة في الأسبوع «راجع اللي نسيته» لكل التابات.",
            mistakes: R`تكشف على طول وتضغط «عرفتها» لأن الإجابة «شكلها مألوف». وتعمل ٥٠ بطاقة مرة واحدة في الأسبوع بدل ٥ كل يوم. وتسيب الملاحظات فاضية: جملة واحدة منك أحسن من قراية الدرس ٣ مرات.`
          },
          lines: [
            R`البطاقة: عنوان الدرس كسؤال.`,
            R`قبل ما تكشف، قول:`,
            R`get + جملة.`,
            R`fetch + جملة.`,
            R`load + جملة.`,
            R`return + جملة.`,
            R`send + جملة.`,
            R`اكشف وقارن واختار 1 أو 2.`,
            R`يوميًا: ٥ بطاقات من التاب + «راجع اللي نسيته» مرة.`,
            R`ملاحظة على الدرس فيها جملتك انت.`
          ],
          sol: R`اللي المفروض يحصل: من ١٠ بطاقات في المستوى ١، طبيعي في الأول تقول «لسه» على ٤–٦. البطاقات الصعبة غالبًا: «الكلمات الصغيرة اللي بتقلب المعنى» ([[unless]] و [[respectively]] و [[i.e.]])، و «valid و invalid و required ... deprecated و legacy»، ورسايل الأخطاء (لأن فيها كذا جملة).

ملاحظة كويسة على درس «if / unless / instead of»:
[[unless = if not. "The cache is used unless you pass --no-cache." My sentence: "The page is public unless the user is banned."]]

وبكرة في «راجع اللي نسيته» هتلاقي البطاقات دي. لو افتكرتها وضغطت 1، بتقرب تخرج من الكومة. ولو زرار «راجع اللي نسيته» مش ظاهر، ده معناه إن مفيش بطاقات منسية لسه (بيظهر لما تضغط «لسه» على بطاقة).`
        },
        {
          cmd: "تقيس تقدمك",
          title: "تقيس تقدمك كل ٣٠ يوم: نفس الصفحة ونفس الرسالة، وقارن",
          desc: R`من غير قياس، هتحس إنك مش بتتحسن (لأن التحسن اليومي صغير ومش باين)، وممكن تبطّل. الحل: اختبار بسيط تعمله يوم ١ ويوم ٣٠ ويوم ٦٠ ويوم ٩٠، بنفس الحاجات، وتقارن الأرقام.

الاختبار (٣٠ دقيقة): ١) [[Reading]]: صفحة docs ثابتة تختارها يوم ١ (متقراهاش في النص). عدّ الكلمات اللي مش فاهمها، واحسب الوقت اللي خدته عشان تكتب ملخص ٣ جمل. ٢) [[Errors]]: ٥ رسايل خطأ جديدة (من التاب ده أو من شغلك): كام واحدة فهمتها وعرفت حلها من غير بحث؟ ٣) [[Writing]]: نفس المهمة كل مرة (مثلًا: «اكتب وصف PR لميزة بحث في موقع»)، ١٠ دقايق، من غير مساعدة. وبعدين عدّ الغلطات بالتصحيح. ٤) [[Words]]: عدد الكلمات في [[words.md]] اللي بقت «٢١ يوم أو أكتر».`,
          example: R`| Check                         | Day 1   | Day 30  | Day 60  | Day 90  |
| Unknown words in test page    | 23      | 14      | 8       | 4       |
| Time to 3-sentence summary    | 25 min  | 15 min  | 10 min  | 7 min   |
| Error messages solved (of 5)  | 2       | 3       | 4       | 5       |
| Mistakes in PR description    | 9       | 6       | 4       | 2       |
| Words at 21+ days             | 0       | 60      | 150     | 260     |
Notes Day 30: still forgetting third-person -s; articles better.
Notes Day 60: reading faster; writing still slow. Focus: PR templates.`,
          try: R`اعمل الاختبار ده النهارده (يوم ١) وسجّل الأرقام في [[progress.md]]. اختار الصفحة الثابتة ومهمة الكتابة الثابتة واكتبهم في الملف عشان تستخدمهم يوم ٣٠. وحط تذكير بعد ٣٠ يوم.`,
          flag: "script",
          deep: {
            why: R`الأرقام بتحميك من إحساس «مفيش فايدة». لما تشوف إن الكلمات المش مفهومة نزلت من ٢٣ لـ ١٤ في شهر، ده دليل. وكمان بتوريك فين الضعف بالظبط (القراية اتحسنت والكتابة لأ؟ يبقى الشهر الجاي ركّز على الكتابة).`,
            how: R`الأرقام في المثال للتوضيح، أرقامك هتختلف، والمهم الاتجاه.

اختيار صفحة الاختبار: صفحة متوسطة الصعوبة لأداة بتستخدمها، مش سهلة جدًا (مش هتقيس حاجة) ولا صعبة جدًا (هتحبطك). مثلًا صفحة من react.dev أو Node docs عن حاجة بتستخدمها.

عدّ غلطات الكتابة: استخدم الـ prompt من درس «تصحيح كتابتك» وعدّ الغلطات اللي طلعت. وبص على نوعها: هل نفس النوع بيتكرر؟ ده «موضوع الشهر الجاي».

بعد ٩٠ يوم: كمّل بنفس الروتين بس غيّر المصادر (مكتبات جديدة، specs، مقالات تقنية طويلة)، وابدأ تكتب حاجة أطول (مقال تقني قصير، أو README كامل، أو رد على issue في open source). وده بيبني جزء الـ English اللي في الانترفيو والـ CV كمان.`,
            when: "يوم ١، ويوم ٣٠، ويوم ٦٠، ويوم ٩٠. ومش أكتر من كده: القياس اليومي بيخلي التقلبات الصغيرة تحبطك.",
            mistakes: R`تغيّر صفحة الاختبار أو مهمة الكتابة كل مرة (مبقتش بتقيس نفس الحاجة). وتقرا صفحة الاختبار في النص (بقت محفوظة). وتستخدم AI أو قاموس في الاختبار نفسه. وتقارن نفسك بحد تاني بدل نفسك من شهر.`
          },
          lines: [
            R`عناوين: الاختبار، ويوم ١ و ٣٠ و ٦٠ و ٩٠.`,
            R`عدد الكلمات المش مفهومة في صفحة الاختبار: المفروض ينزل.`,
            R`وقت كتابة ملخص ٣ جمل: المفروض ينزل.`,
            R`رسايل الأخطاء اللي فهمتها وحليتها من ٥: المفروض يطلع.`,
            R`غلطات وصف الـ PR: المفروض ينزل.`,
            R`الكلمات اللي وصلت لمراجعة ٢١ يوم أو أكتر: المفروض يطلع.`,
            R`ملاحظات يوم ٣٠: فين لسه ضعيف وفين اتحسنت.`,
            R`ملاحظات يوم ٦٠: وتحديد التركيز الجاي.`
          ],
          sol: R`[[progress.md]] يوم ١ صح فيه: اسم صفحة الاختبار ولينكها (مثلًا [[react.dev: "You Might Not Need an Effect"]])، ومهمة الكتابة الثابتة ([[Write a PR description for adding search to a product list]])، و ٥ رسايل أخطاء اخترتهم، والأرقام:
[[Unknown words: 19 | Summary time: 22 min | Errors solved: 2/5 | Writing mistakes: 11 | Words at 21+ days: 0]]
وتذكير على الموبايل بعد ٣٠ يوم.

الأرقام العالية يوم ١ مش مشكلة خالص: ده خط البداية. المهم إنها تبقى حقيقية (من غير قاموس ولا AI). ولو يوم ٣٠ رقم منهم متحسنش، ده مش فشل: ده تحديد لمكان التركيز في الشهر الجاي.

ولو خلصت الـ ٩٠ يوم: ارجع للتاب ده من الأول وعدّي على الـ try بتاع كل درس بسرعة. هتلاقي حاجات كانت صعبة بقت عادية، وده أحسن قياس.`
        }
      ]
    },
  ]
});
