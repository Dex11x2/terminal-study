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
          teach: R`## الـ ١٢ جملة ٣ أشكال بس

كل سطر في المثال: الفعل، وبعده جملة شبه اللي في الـ docs. ولو بصيت كويس هتلاقي الجمل ٣ أشكال grammar بس، ولو فهمتهم هتقرا أي جملة زيهم.

---

## الشكل ١: أمر (imperative)

~~~text
Get the current user from the session.
Fetch the orders from the API.
Pass the user ID as the first argument.
~~~

الجملة بتبدأ بالفعل على طول، من غير [[you]] ولا [[please]]. ده شكل التعليمات في أي README. الترتيب: **فعل + الحاجة + منين/إزاي**.

| الحتة | في الجملة | معناها |
|---|---|---|
| الفعل | [[Fetch]] | هات من برا |
| الحاجة | [[the orders]] | الأوردرات |
| منين | [[from the API]] | من الـ API |

## الشكل ٢: وصف لحاجة بتحصل دايمًا (present simple)

~~~text
This function returns the total price.
The server receives the request and validates it.
~~~

الفاعل مفرد ([[This function]] و [[The server]])، فالفعل بياخد [[s]]: [[returns]] و [[receives]] و [[validates]]. ده أشهر غلط عند المصريين، وليه درس لوحده في المستوى ٢.

## الشكل ٣: passive (الحاجة اتعمل فيها)

~~~text
The token is stored in an HttpOnly cookie.
The callback is invoked once for each item.
~~~

[[is + stored]] و [[is + invoked]]: المهم الحاجة اللي حصلت، مش مين عملها. اقراها «بيتخزّن» و «بيتنادى».

---

## الأزواج والفروق

| الكلمة | معناها في الكود | بتفرق عن |
|---|---|---|
| [[get]] | تاخد قيمة موجودة، غالبًا سريع | [[fetch]]: من برا وبياخد وقت (async غالبًا) |
| [[load]] | تجيب وتجهّز (تقرا ملف وتعمل parse) | [[save]]: العكس |
| [[return]] | الدالة تطلّع نتيجة للي ناداها | مش «ابعتلك ملف»: دي [[send]] |
| [[pass]] | تمرّر قيمة لدالة | و [[tests pass]] = الاختبارات نجحت |
| [[call]] و [[invoke]] | تنادي دالة | [[invoke]] أرسمي، بييجي كتير passive |

كلمات صغيرة في الجمل: [[on startup]] أول ما البرنامج يقوم، و [[once for each item]] مرة لكل عنصر، و [[draft]] مسودة.

---

## الخلاصة

- الجمل كلها أمر، أو present simple بـ [[s]]، أو passive بـ [[is + فعل تالت]].
- [[fetch]] في اسم دالة = غالبًا محتاجة [[await]].
- [[return]] للدالة بس. «هبعتلك الملف» = [[I'll send you the file]].`,
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
          teach: R`## الجمل بتعلّمك حاجتين: الفعل، ودرجة الخطورة

كل الجمل أمر (imperative) ما عدا ٢، والأهم إنك تلاحظ الكلمات اللي حوالين الفعل، لأنها بتقول قد إيه الأمر ده خطر.

---

## الأمر البسيط: فعل + حاجة + مكان

~~~text
Remove the item from the cart.
Insert a row into the orders table.
Replace the old API key with the new one.
~~~

الأفعال دي بتيجي مع prepositions ثابتة، احفظها مع بعض:

| الفعل | الـ preposition | المعنى |
|---|---|---|
| [[remove X from Y]] | from | شيل X من Y |
| [[add X to Y]] | to | ضيف X لـ Y |
| [[insert X into Y]] | into | دخّل X جوه Y |
| [[append X to Y]] | to | ضيف X في آخر Y |
| [[replace X with Y]] | with | بدّل X بـ Y |

و [[orders table]]: الاسم اللي بيوصف بييجي **قبل** (جدول الأوردرات = orders table)، عكس العربي.

---

## جمل التحذير

~~~text
This action permanently deletes the account.
Drop the table if it exists.
This will overwrite any existing file with the same name.
~~~

| الكلمة | معناها | ليه تقف عندها |
|---|---|---|
| [[permanently]] | نهائي | مفيش رجوع |
| [[drop]] | امسح كامل (جدول أو داتابيز) | مش «سيب» |
| [[if it exists]] | لو موجود بس | مش هيطلع خطأ لو مش موجود |
| [[overwrite]] | اكتب فوق | القديم بيضيع |
| [[existing]] | الموجود قبل كده | |

و [[This will ...]] = «ده هيعمل كذا»: [[will]] للمستقبل، والـ docs بتستخدمها في التحذيرات.

---

## delete ولا remove؟

| [[delete]] | [[remove]] |
|---|---|
| مسح نهائي من الداتابيز أو الديسك | شيل من مكان أو مجموعة |
| [[delete the account]] | [[remove the item from the cart]] |

---

## الخلاصة

- احفظ الفعل مع الـ preposition بتاعه: [[from]] و [[to]] و [[into]] و [[with]].
- [[permanently]] و [[drop]] و [[overwrite]] = وقّف واقرا الجملة كلها.
- [[clear]] هنا «فضّي» مش «واضح»، و [[reset]] «رجّع للأول».`,
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
          teach: R`## الجمل دي بتحكي «رحلة خطأ»

الخطأ بيترمي ([[throw]] و [[raise]])، وحد بيمسكه ([[catch]])، ويتصرف ([[handle]]: يعرض رسالة، أو يجرب تاني [[retry]]، أو يلغي [[abort]]). و الـ Promise بتخلص يا بنجاح ([[resolve]]) يا بخطأ ([[reject]]).

---

## ٣ أشكال grammar في الجمل

### present simple بـ s: الدالة بتعمل كذا دايمًا

~~~text
The function throws an error if the input is empty.
The client retries the request up to 3 times.
The promise rejects if the network fails.
~~~

[[throws]] و [[retries]] و [[rejects]]: فاعل مفرد = [[s]]. ولاحظ [[retry]] ← [[retries]]: الـ [[y]] بعد حرف ساكن بتبقى [[ies]].

و [[if]] بتربط الحالة بالشرط: «بترمي خطأ **لو** الإدخال فاضي».

### الماضي: حاجة حصلت

~~~text
The build failed because of a type error.
~~~

[[failed]] ماضي عادي، **مش** passive. فـ [[The build was failed]] غلط. و [[because of]] بعدها اسم ([[a type error]])، و [[because]] لوحدها بعدها جملة ([[because a test failed]]).

### passive: الحاجة اتعمل فيها

~~~text
Unknown fields are ignored.
The request was aborted after 10 seconds.
~~~

[[are ignored]] (دايمًا) و [[was aborted]] (حصلت مرة). اقراها «بيتم تجاهلهم» و «اتلغى».

---

## الكلمات الصغيرة اللي بتحدد المعنى

| الكلمة | معناها | في الجملة |
|---|---|---|
| [[up to 3 times]] | لحد ٣ مرات، مش أكتر | retry |
| [[after 10 seconds]] | بعد ما ١٠ ثواني تعدّي | abort |
| [[at any time]] | في أي وقت | cancel |
| [[resolves with X]] | تخلص بنجاح والنتيجة X | resolve |
| [[friendly message]] | رسالة سهلة ومش مخيفة لليوزر | catch |

---

## الخلاصة

- [[throw]] في JS = [[raise]] في Python.
- [[catch]] بس من غير ما تعمل حاجة مش [[handle]].
- [[The test failed]] مش [[was failed]].
- [[resolve]] و [[reject]] كلمات الـ Promise: نجح وفشل.`,
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
          teach: R`## جمل README: أوامر بترتيب

الجمل دي هي شكل أي «Getting started»: فعل أمر في الأول، وكلمة ترتيب ([[before]] و [[after]] و [[first]]).

---

## الأمر بالترتيب

~~~text
Run the tests before you push.
Deploy the app to the staging server first.
Restart the service after you change the config.
Migrate the database before you start the server.
~~~

| الكلمة | معناها | بتقولك إيه |
|---|---|---|
| [[before you ...]] | قبل ما | الأمر ده الأول |
| [[after you ...]] | بعد ما | الأمر ده بعد |
| [[first]] في آخر الجملة | الأول | قبل أي حاجة تانية |

لاحظ إن بعد [[before]] و [[after]] جملة كاملة بفاعل: [[before you push]]، مش [[before push]].

---

## الجمل اللي مش أمر

~~~text
The script is executed in a separate process.
TypeScript compiles your code to JavaScript.
Vite bundles your modules into a few files.
~~~

- [[is executed]]: passive، «بيتنفّذ».
- [[compiles X to Y]]: بيحوّل X لـ Y. و [[bundles X into Y]]: بيجمع X في Y.
- [[a few files]] = «كام ملف». (و [[few files]] من غير [[a]] = «ملفات قليلة» بمعنى سلبي.)

---

## الأزواج اللي بتتلخبط

| الكلمة | معناها | والتانية |
|---|---|---|
| [[update]] | تحديث صغير آمن | [[upgrade]]: نقلة لإصدار كبير وممكن تكسر |
| [[build]] | تبني نسخة للإنتاج | [[compile]]: تحوّل كود لكود |
| [[restart]] | توقّف وتشغّل | [[reload]]: تقرا الإعدادات من غير إيقاف |
| [[enable]] | تفعّل | [[disable]]: تقفل |
| [[install]] | تسطّب | [[uninstall]]: تشيل |

و [[latest major version]] = أحدث إصدار كبير (الرقم الأول في [[5.2.1]]).

---

## الخلاصة

- README = أوامر بالترتيب، من غير [[you]] ولا [[please]].
- [[before]] و [[after]] و [[first]] بيحددوا الترتيب، اقراهم.
- [[start the server]] مش [[open]]، و [[deploy]] مش [[upload]].`,
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
          teach: R`## الحالات رحلة واحدة

أي job (build، أو دفع، أو طلب) بيمشي في نفس الطريق تقريبًا، وكل حالة كلمة:

~~~text الرحلة
queued  →  in progress  →  succeeded / failed / cancelled / timed out
                            (أو skipped لو مشتغلش أصلًا)
~~~

---

## نفك الجمل

| الجملة | الحالة | الـ grammar |
|---|---|---|
| [[Your payment is still pending.]] | مستنية | [[still]] = لسه |
| [[The job is queued and will start soon.]] | في الطابور | [[is queued]] passive، و [[will start]] مستقبل |
| [[The deployment is in progress.]] | شغالة | [[in progress]] = جاري |
| [[Show a spinner while the data is loading.]] | بتحمّل | [[while]] = طول ما |
| [[The query is idle until you enable it.]] | واقفة | [[until]] = لحد ما |
| [[All checks have succeeded.]] | نجحت | [[have succeeded]] present perfect: نجحت ولسه النتيجة قايمة |
| [[1 failing check: build failed on Node 22.]] | فشلت | [[failing]] صفة، و [[failed]] فعل |
| [[This step was skipped because the condition was false.]] | اتعدّت | [[was skipped]] passive |
| [[The request timed out after 30 seconds.]] | عدّت الوقت | [[timed out]] فعل ماضي |
| [[The cached data is stale and will be refetched.]] | قديمة | [[re-]] = تاني: [[refetch]] تجيب تاني |

---

## غلطتين مشهورين

| غلط | صح | ليه |
|---|---|---|
| [[The request is timeout]] | [[The request timed out]] | [[time out]] فعل، و [[timeout]] اسم |
| [[The test is failed]] | [[The test failed]] أو [[is failing]] | [[fail]] مش passive |

و [[canceled]] (أمريكي) و [[cancelled]] (بريطاني) الاتنين صح، بس اختار واحدة في الكود.

---

## الخلاصة

- [[queued]] ← [[in progress]] ← نتيجة.
- [[still]] لسه، [[yet]] لسه في النفي، [[already]] خلاص.
- [[timed out]] و [[failed]] أفعال: من غير [[is]].`,
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
          teach: R`## كل كلمة هنا بتجاوب سؤال

| السؤال | الكلمات |
|---|---|
| القيمة مقبولة؟ | [[valid]] و [[invalid]] و [[unexpected]] و [[unknown]] |
| لازم تيجي؟ | [[required]] و [[optional]] و [[missing]] و [[empty]] |
| الميزة لسه مدعومة؟ | [[deprecated]] و [[legacy]] و [[experimental]] و [[unsupported]] |

---

## البادئات بتقلب المعنى

احفظ البادئة مرة وهتفهم كلمات كتير:

| البادئة | مثال | المعنى |
|---|---|---|
| [[in-]] | [[invalid]] | مش صحيح |
| [[un-]] | [[unknown]] و [[unexpected]] و [[unsupported]] | مش |
| [[dis-]] | [[disabled]] | العكس |
| [[non-]] | [[non-empty]] | مش (فاضي) |
| [[mis-]] | [[misconfigured]] | غلط |

---

## جملة حقيقية: [[Unexpected token '<' ...]]

~~~text
Unexpected token '<', "<!DOCTYPE html>" is not valid JSON
~~~

جرّبتها في Node 22 بـ [[JSON.parse("<!DOCTYPE html>")]] وطلعت كده بالظبط:

~~~text الناتج
SyntaxError: Unexpected token '<', "<!DOCTYPE html>" is not valid JSON
~~~

- [[Unexpected token '<']]: «الحرف [[<]] مكانش متوقع». [[token]] هنا = حتة من النص.
- [[is not valid JSON]]: «ده مش JSON صحيح».
- المعنى الحقيقي: استلمت صفحة HTML بدل JSON (غالبًا صفحة 404).

---

## جمل الـ deprecation

~~~text
This method is deprecated. Use fetchUsers() instead.
The legacy API will be removed in v5.
Node 16 is no longer supported.
~~~

الـ deprecation الكويس بيقولك ٣ حاجات: إيه ([[This method]])، والبديل ([[Use ... instead]])، وإمتى هيتشال ([[will be removed in v5]]). و [[no longer]] = «مبقاش».

ودي سطور حقيقية من [[npm i request@2.88.2]] (npm 10.9 في Docker، أكتوبر ٢٠٢٦):

~~~text الناتج
npm warn deprecated har-validator@5.1.5: this library is no longer supported
npm warn deprecated request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142
5 vulnerabilities (3 moderate, 2 critical)
~~~

[[has been deprecated]] = «اتعملها deprecate» (present perfect passive). و [[moderate]] متوسطة، و [[critical]] خطيرة جدًا.

---

## الخلاصة

- [[deprecated]] = لسه شغالة بس هتتشال، دوّر على [[instead]].
- [[missing]] = كان المفروض ييجي ومجاش. [[empty]] = جه بس فاضي.
- البادئات [[in-]] و [[un-]] و [[mis-]] بتقلب المعنى.`,
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
          teach: R`## كل كلمة بتقولك تصلّح فين

| الكلمة | السؤال اللي بتجاوبه | الحل |
|---|---|---|
| [[unauthorized]] (401) | انت مين؟ | ابعت token أو سجّل دخول |
| [[forbidden]] (403) و [[denied]] | معروف بس ممنوع | صلاحيات أو دور |
| [[expired]] و [[revoked]] | كان صح وبقى مش صح | جدّد الـ token أو المفتاح |
| [[unavailable]] (503) | المشكلة عندهم | استنى وجرّب تاني |
| [[disabled]] | موجود بس مقفول | دوّر على إعداد يفعّله |

---

## رسالتين حقيقيتين

### [[Permission denied (publickey)]]

شغّلت [[ssh -T git@github.com]] من Ubuntu 24.04 (Docker) مفيهوش أي مفتاح:

~~~text الناتج
git@github.com: Permission denied (publickey).
~~~

| الحتة | معناها |
|---|---|
| [[git@github.com:]] | السيرفر اللي بيرد |
| [[Permission denied]] | «اترفضت» |
| [[(publickey)]] | الطريقة الوحيدة اللي اتجرّبت: المفتاح العام، ومفيش مفتاح مقبول |

يعني المشكلة عندك (مفتاح)، مش إن GitHub واقع.

### 401 من غير token

~~~bash
curl -s -o /dev/null -w "%{http_code}\n" https://api.github.com/user
~~~

~~~text الناتج
401
~~~

[[/user]] بيرجّع اليوزر الحالي، ومن غير token مفيش «يوزر حالي»: 401 مش 403.

---

## الكلمات الصغيرة

- [[by default]] = افتراضيًا: [[Dark mode is enabled by default]].
- [[only]] بتقيّد جامد: [[only available on the Pro plan]] = في Pro **بس**.
- [[per]] = لكل: [[5 requests per minute]].
- [[until]] = لحد: [[disabled until the form is valid]].
- [[no longer]] = مبقاش.

---

## الخلاصة

- 401 = مش عارفين انت مين. 403 = عارفينك بس ممنوع.
- [[denied]] و [[forbidden]] = صلاحيات، مش السيرفر واقع.
- [[the key expired]] مش [[the key is finished]].`,
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
    }
  ]
});
