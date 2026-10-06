// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "regex",
      l: 2,
      n: "تدوّر وتتحقق وتستبدل بـ patterns: classes و quantifiers و anchors و groups و flags، والعربي، وإمتى regex غلط",
      items: [
        {
          cmd: "regex: classes و quantifiers",
          title: "تكتب pattern إزاي؟ (classes و quantifiers و anchors)",
          desc: R`الـ regex (regular expression) نص بيوصف شكل نصوص: «01 وبعدها رقم من 0 أو 1 أو 2 أو 5 وبعدها ٨ أرقام». بيتكتب بين [[/ /]] و [[pattern.test(text)]] بترجّع true أو false.

الـ classes (نوع الحرف): [[\d]] رقم، و [[\w]] حرف إنجليزي أو رقم أو [[_]]، و [[\s]] مسافة أو tab أو سطر جديد، و [[.]] أي حرف غير السطر الجديد. والكابيتال عكسهم ([[\D]] أي حاجة مش رقم). و [[[abc]]] واحد من دول، و [[[a-z]]] مدى، و [[[^0-9]]] أي حاجة غير دول.

الـ quantifiers (كام مرة): [[?]] صفر أو مرة، و [[*]] صفر أو أكتر، و [[+]] مرة أو أكتر، و [[{8}]] ٨ بالظبط، و [[{2,}]] ٢ أو أكتر، و [[{2,5}]] من ٢ لـ ٥. ولو حطيت [[?]] بعدهم ([[*?]] و [[+?]]) بيبقوا lazy: ياخدوا أقل حاجة ممكنة بدل أكبر حاجة.

الـ anchors (مكان مش حرف): [[^]] أول النص، و [[$]] آخره، و [[\b]] حدود كلمة. من غير [[^...$]]، الـ test بتدوّر على الـ pattern في أي حتة في النص.`,
          example: R`const phone = /^01[0125]\d{8}$/;
console.log(phone.test("01012345678"), phone.test("0101234567"), phone.test("01312345678"));
console.log(/colou?r/.test("color"), /\bcat\b/.test("concat"), /\bcat\b/.test("a cat!"));
console.log("a1 b22 c333".match(/\d+/g), "a1 b22".match(/\d{2,}/g));
console.log("<b>x</b><b>y</b>".match(/<b>.*<\/b>/)[0]);
console.log("<b>x</b><b>y</b>".match(/<b>.*?<\/b>/)[0]);
const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
console.log(slug.test("my-first-post"), slug.test("My--post"));
console.log("١٢٣ و 45".match(/\d+/g), "١٢٣ و 45".match(/\p{Nd}+/gu));
console.log("سعر القهوة 45 جنيه".match(/\p{Script=Arabic}+/gu));`,
          try: R`اكتب regex لـ: (١) كود بريدي مصري ٥ أرقام بالظبط، (٢) username من ٣ لـ ١٦ حرف إنجليزي صغير أو رقم أو [[_]] ولازم يبدأ بحرف، (٣) لون hex زي [[#fff]] أو [[#1F2430]]. جرّب كل واحد على ٣ أمثلة صح و ٣ غلط. وبعدين شيل [[^]] و [[$]] من الـ phone وجرّب [[phone.test("x010123456789999")]].`,
          flag: "script",
          deep: {
            why: "هتحتاجه أكتر ما تتخيل: تحقق من رقم موبايل و slug و كود خصم، و [[.regex()]] في Zod (تاب TypeScript)، وتقطيع logs، و find & replace في VS Code (Alt+R بيشغّل regex)، و [[grep -E]] و [[sed]] في الترمنال (تاب bash). نفس الـ syntax تقريبًا في كل حتة.",
            how: R`الـ engine بيمشي على النص حرف حرف ويحاول يطابق الـ pattern من كل مكان. [[+]] و [[*]] greedy: بياخدوا أكبر حاجة ممكنة وبعدين يرجعوا لورا لو اللي بعدهم مش مطابق. عشان كده [[<b>.*<\/b>]] أكلت من أول [[<b>]] لآخر [[</b>]]، و [[.*?]] وقفت عند أول واحد.

[[\d]] في JS بيطابق [[0-9]] بس، مش الأرقام العربية المشرقية (١٢٣). عشان تدعم العربي استخدم Unicode property escapes مع flag [[u]]: [[\p{Nd}]] أي رقم في أي لغة، و [[\p{L}]] أي حرف، و [[\p{Script=Arabic}]] حروف عربي. و [[\w]] و [[\b]] كمان إنجليزي بس، فـ [[\bقهوة\b]] مش هتشتغل زي ما متوقع.

الحروف اللي ليها معنى ([[. * + ? ^ $ ( ) [ ] { } | \ /]]) لو عايزها حرفيًا حط قبلها [[\]]: [[\.]] نقطة، و [[<\/b>]] عشان [[/]] بتقفل الـ regex. وجوه [[[...]]] أغلبهم بيبقوا حرفيين.

[[(?:...)]] group من غير ما يتحفظ (الدرس الجاي)، هنا بيخلي [[-[a-z0-9]+]] يتكرر كوحدة. فالـ slug: كلمة، وبعدين صفر أو أكتر من (شرطة + كلمة)، فمفيش شرطتين ورا بعض ولا شرطة في الأول أو الآخر.`,
            when: R`تحقق من شكل نص قصير (phone و slug و postal code)، وتدوّر أو تستبدل في نصوص، وتقطّع سطور logs. ولو الـ pattern بقى أطول من سطر، أو محتاج «فهم» (HTML، JSON، URL، تواريخ)، استخدم parser (آخر درس في القسم).`,
            mistakes: R`تنسى [[^]] و [[$]] في التحقق فـ [["abc01012345678xyz"]] تعدّي. و [[.]] وانت عايز نقطة حرفية. و [[\d]] مع أرقام عربي من الموبايل (كيبورد عربي بيكتب ١٢٣): طبّع الأرقام الأول أو استخدم [[\p{Nd}]]. و [[[A-z]]] (فيها رموز بين Z و a). و [[.*]] greedy في نص فيه أكتر من match.`
          },
          teach: R`## الفكرة

الـ regex بيوصف **شكل** نص، مش نص بعينه. والمثال ٥ تجارب: رقم موبايل، وكلمة بحدودها، وأرقام كتير، و greedy ضد lazy، و slug، والعربي. الناتج كله من Node 24 على Windows.

قبل أي حاجة: الـ regex في JavaScript بيتكتب بين شرطتين [[/.../]]، والشرطتين مش جزء منه، زي علامتين التنصيص حوالين النص.

---

## ١. رقم موبايل مصري

~~~text app.js
const phone = /^01[0125]\d{8}$/;
console.log(phone.test("01012345678"), phone.test("0101234567"), phone.test("01312345678"));
~~~

نفك الـ pattern حتة حتة من الشمال لليمين، بنفس ترتيب ما الـ engine بيقراه:

| الحتة | نوعها | معناها |
|---|---|---|
| [[^]] | anchor | لازم نكون في أول النص |
| [[01]] | حروف عادية | الحرفين 0 و 1 بالظبط |
| [[[0125]]] | class | حرف واحد بس، يا 0 يا 1 يا 2 يا 5 (فودافون وإتصالات وأورنج و WE) |
| [[\d]] | class | رقم واحد من 0 لـ 9 (d = digit) |
| [[{8}]] | quantifier | اللي قبله يتكرر ٨ مرات بالظبط |
| [[$]] | anchor | لازم نكون في آخر النص |

و [[phone.test(text)]] بيسأل: «النص ده ماشي على الـ pattern؟» ويرجّع [[true]] أو [[false]].

~~~text الناتج
true false false
~~~

- [["01012345678"]]: 01 ثم 0 ثم ٨ أرقام. صح.
- [["0101234567"]]: بعد [[010]] فيه ٧ أرقام بس، و [[{8}]] عايزة ٨.
- [["01312345678"]]: 3 مش من [[[0125]]].

### ليه [[^]] و [[$]] مهمين؟

من غيرهم، [[test]] بتدوّر على الـ pattern **في أي حتة** جوه النص. جرّبنا في الحل:

~~~text app.js
console.log(/01[0125]\d{8}/.test("x010123456789999"));
~~~

~~~text الناتج
true
~~~

لقى [["01012345678"]] في النص وقال true، رغم إن النص كله زبالة. فأي regex للتحقق (validation) لازم يبقى [[^...$]].

---

## ٢. [[?]] و [[\b]]

~~~text app.js
console.log(/colou?r/.test("color"), /\bcat\b/.test("concat"), /\bcat\b/.test("a cat!"));
~~~

- [[u?]]: الـ [[?]] بعد حرف معناها «الحرف ده مرة أو مفيش». فـ [[colou?r]] بتقبل color و colour.
- [[\b]]: (b = boundary) **مكان** مش حرف: الحد بين حرف كلمة ([[\w]]) وحاجة مش حرف كلمة (مسافة أو علامة أو أول/آخر النص).

~~~text الناتج
true false true
~~~

في [["concat"]] الـ cat موجودة بس قبلها n، فمفيش حد كلمة: false. وفي [["a cat!"]] قبلها مسافة وبعدها [[!]]: true.

---

## ٣. [[+]] و [[{2,}]] و flag [[g]]

~~~text app.js
console.log("a1 b22 c333".match(/\d+/g), "a1 b22".match(/\d{2,}/g));
~~~

- [[\d+]]: [[+]] = «مرة أو أكتر»، يعني سلسلة أرقام ورا بعض.
- [[g]] بعد الشرطة الأخيرة اسمه **flag** (global): هات **كل** الـ matches مش أول واحد بس. ومع [[str.match(re)]] بيرجّع array بالنصوص.
- [[{2,}]]: «٢ أو أكتر». (و [[{2,5}]] من ٢ لـ ٥.)

~~~text الناتج
[ '1', '22', '333' ] [ '22' ]
~~~

في التاني الـ [[1]] لوحده اترمى لأنه رقم واحد.

---

## ٤. greedy ضد lazy

~~~text app.js
console.log("<b>x</b><b>y</b>".match(/<b>.*<\/b>/)[0]);
console.log("<b>x</b><b>y</b>".match(/<b>.*?<\/b>/)[0]);
~~~

- [[.]]: أي حرف (غير السطر الجديد). و [[.*]]: أي حاجة، أي عدد من المرات (حتى صفر).
- [[<\/b>]]: الـ [[/]] لوحدها كانت هتقفل الـ regex، فقبلها [[\]] (escape) عشان تبقى حرف عادي.
- [[match]] من غير [[g]] بيرجّع array أولها ([[[0]]]) النص اللي اتطابق.

~~~text الناتج
<b>x</b><b>y</b>
<b>x</b>
~~~

[[.*]] **greedy** (طمّاع): بياكل لحد آخر النص، وبعدين يرجع لورا حرف حرف لحد ما يلاقي [[</b>]]، فبيقف عند **آخر** واحدة. ولما تحط [[?]] بعده ([[.*?]]) بيبقى **lazy** (كسول): ياخد أقل حاجة ممكنة، فبيقف عند **أول** [[</b>]].

---

## ٥. slug

~~~text app.js
const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
console.log(slug.test("my-first-post"), slug.test("My--post"));
~~~

slug هو الجزء اللي في اللينك زي [[my-first-post]].

| الحتة | معناها |
|---|---|
| [[^[a-z0-9]+]] | من الأول: حرف صغير أو رقم، مرة أو أكتر (كلمة أولى) |
| [[(?:-[a-z0-9]+)]] | group: شرطة وبعدها كلمة |
| [[*]] بعد الـ group | الـ group كله يتكرر صفر مرة أو أكتر |
| [[$]] | لحد الآخر |

[[[a-z]]] **مدى** (range): أي حرف من a لـ z. والأقواس [[(?:...)]] بتجمّع حتة عشان الـ [[*]] يتطبّق عليها كلها، و [[?:]] معناها «متحفظش اللي اتطابق» (الدرس الجاي).

~~~text الناتج
true false
~~~

[["My--post"]] فيها M كابيتال، وشرطتين ورا بعض (كل شرطة لازم بعدها كلمة).

---

## ٦. الأرقام والحروف العربي

~~~text app.js
console.log("١٢٣ و 45".match(/\d+/g), "١٢٣ و 45".match(/\p{Nd}+/gu));
console.log("سعر القهوة 45 جنيه".match(/\p{Script=Arabic}+/gu));
~~~

- [[\d]] في JavaScript = [[[0-9]]] بس. الأرقام المشرقية (١٢٣) مش منها.
- [[\p{...}]] اسمها **Unicode property escape**: «أي حرف ليه الخاصية دي في Unicode». [[\p{Nd}]] = أي رقم عشري في أي لغة (N = Number، d = decimal digit). و [[\p{Script=Arabic}]] = أي حرف من الكتابة العربي.
- [[u]] flag (unicode): لازم عشان [[\p{...}]] تتفهم. وهنا معاها [[g]]: الـ flags بتتكتب جنب بعض.

~~~text الناتج
[ '45' ] [ '١٢٣', '45' ]
[ 'سعر', 'القهوة', 'جنيه' ]
~~~

---

## ٧. الحل (solCode)

~~~text app.js
const postal = /^\d{5}$/;
const username = /^[a-z][a-z0-9_]{2,15}$/;
const hex = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;
console.log(["11511", "1151", "115111"].map((s) => postal.test(s)));
console.log(["sara_99", "9sara", "ab", "a".repeat(16), "a".repeat(17)].map((s) => username.test(s)));
console.log(["#fff", "#1F2430", "#ffff", "fff"].map((s) => hex.test(s)));
console.log(/01[0125]\d{8}/.test("x010123456789999"));
~~~

- [[postal]]: ٥ أرقام بالظبط من الأول للآخر.
- [[username]]: [[[a-z]]] حرف أول واحد، وبعده [[[a-z0-9_]{2,15}]] من ٢ لـ ١٥. المجموع من ٣ لـ ١٦.
- [[hex]]: [[#]] وبعدها group فيها بديلين يفصل بينهم [[|]] (يعني «أو»): ٣ أو ٦ من [[[0-9a-f]]]. و [[i]] flag = مش حساس للكابيتال، فـ [[1F2430]] بيعدّي.
- [[.map((s) => re.test(s))]]: بيجرّب الـ regex على كل نص ويرجّع array بالنتايج. و [["a".repeat(16)]] = ١٦ حرف a.

~~~text الناتج
[ true, false, false ]
[ true, false, false, true, false ]
[ true, true, false, false ]
true
~~~

[["9sara"]] بتبدأ برقم، و [["ab"]] حرفين بس، و ١٧ حرف أكتر من اللازم. و [["#ffff"]] ٤ حروف (لا ٣ ولا ٦)، و [["fff"]] من غير [[#]].

---

## الخلاصة

| النوع | أمثلة | معناه |
|---|---|---|
| class | [[\d]] [[\w]] [[\s]] [[.]] [[[abc]]] [[[^0-9]]] [[\p{L}]] | حرف واحد من نوع معيّن |
| quantifier | [[?]] [[*]] [[+]] [[{8}]] [[{2,}]] [[{2,5}]] | اللي قبله يتكرر كام مرة |
| lazy | [[*?]] [[+?]] | أقل تكرار ممكن |
| anchor | [[^]] [[$]] [[\b]] | مكان، مش حرف |
| flag | [[g]] [[i]] [[u]] | بيغيّر طريقة البحث |

وأي regex للتحقق: [[^...$]] دايمًا.`,
          lines: [
            R`موبايل مصري: 01 وبعدها 0 أو 1 أو 2 أو 5 وبعدها ٨ أرقام، من الأول للآخر.`,
            R`[[true false false]]: التاني ١٠ أرقام بس، والتالت 013.`,
            R`[[?]] الحرف اختياري، و [[\b]] حدود كلمة: [[true false true]].`,
            R`flag [[g]] مع [[match]] بيرجّع كل الـ matches: [[['1', '22', '333']]] و [[['22']]].`,
            R`greedy: [[<b>x</b><b>y</b>]] كلها.`,
            R`lazy بـ [[?]]: [[<b>x</b>]] بس.`,
            "slug: كلمات صغيرة بينها شرطة واحدة.",
            R`[[true false]]: فيه حرف كبير وشرطتين.`,
            R`[[\d]] إنجليزي بس: [['45']]، و [[\p{Nd}]] بـ u: [['١٢٣', '45']].`,
            R`الكلمات العربي بس: [['سعر', 'القهوة', 'جنيه']].`
          ],
          sol: R`الكود البريدي: [[/^\d{5}$/]] (أو [[/^\p{Nd}{5}$/u]] لو هتقبل أرقام عربي). الـ username: [[/^[a-z][a-z0-9_]{2,15}$/]]: حرف واحد وبعده من ٢ لـ ١٥، فالمجموع من ٣ لـ ١٦. الغلطة الشائعة [[{3,16}]] بعد الحرف الأول فيبقى المجموع لـ ١٧. الـ hex: [[/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i]]، و [[i]] عشان الحروف الكبيرة، والـ [[|]] جوه group عشان «٣ أو ٦» (من غيرها [[{3,6}]] كانت هتقبل ٤ و ٥).

ومن غير anchors [[phone.test("x010123456789999")]] بـ true: لقى [["01012345678"]] في النص وخلاص. ده ليه أي regex للتحقق لازم يبقى [[^...$]].`,
          solCode: R`const postal = /^\d{5}$/;
const username = /^[a-z][a-z0-9_]{2,15}$/;
const hex = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;
console.log(["11511", "1151", "115111"].map((s) => postal.test(s)));
console.log(["sara_99", "9sara", "ab", "a".repeat(16), "a".repeat(17)].map((s) => username.test(s)));
console.log(["#fff", "#1F2430", "#ffff", "fff"].map((s) => hex.test(s)));
console.log(/01[0125]\d{8}/.test("x010123456789999"));`
        },
        {
          cmd: "groups و flags",
          title: "تمسك أجزاء من الـ match إزاي؟ (groups و named groups و flags)",
          desc: R`الأقواس [[( )]] بتعمل group: بتجمّع جزء عشان quantifier يتطبق عليه كله، وبتحفظ اللي اتطابق فيه عشان تقراه بعدين ([[m[1]]] و [[m[2]]]). و [[(?<year>...)]] named group: تقراه بالاسم [[m.groups.year]] بدل الرقم، وده أوضح بكتير. و [[(?:...)]] group بيجمّع بس من غير ما يحفظ.

والـ flags بعد [[/]] الأخيرة: [[g]] (global: كل الـ matches مش أول واحد)، و [[i]] (مش حساس للحروف الكبيرة)، و [[m]] (multiline: [[^]] و [[$]] لكل سطر)، و [[s]] (dotAll: [[.]] تطابق السطر الجديد كمان)، و [[u]] (unicode: emoji صح و [[\p{...}]])، و [[y]] (sticky: لازم يطابق من [[lastIndex]] بالظبط)، و [[v]] (الأحدث، بديل u بـ set operations جوه [[[...]]]، مدعوم في كل المتصفحات الحديثة و Node 20+).

و [[(?=...)]] lookahead: «بعده كذا» من غير ما ياخده، و [[(?<=...)]] lookbehind: «قبله كذا».`,
          example: R`const re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const m = "الطلب اتعمل 2026-09-29 الصبح".match(re);
console.log(m[0], m[1], m.groups.month, m.index);
console.log(/^b/m.test("a\nb"), /^b/.test("a\nb"), /a.b/.test("a\nb"), /a.b/s.test("a\nb"));
console.log(/hello/i.test("HeLLo"), /(\w)\1/.test("hello"), /(?:ab)+/.exec("ababx")[0]);
const g = /o/g;
console.log(g.test("foo"), g.lastIndex, g.test("foo"), g.test("foo"));
const sticky = /\d+/y;
sticky.lastIndex = 4;
console.log(sticky.exec("abc 42")?.[0], /\d+/y.exec("abc 42"));
console.log("😀".length, /^.$/.test("😀"), /^.$/u.test("😀"));
console.log(/[\p{L}--\p{Ll}]/v.test("A"), /[\p{L}--\p{Ll}]/v.test("a"), /[\p{L}--\p{Ll}]/v.test("ع"));
console.log("price: 100 EGP".match(/\d+(?= EGP)/)[0], "$50 €30".match(/(?<=€)\d+/)[0]);`,
          try: R`اكتب regex بـ named groups يفك [["Sara Ahmed <sara@example.com>"]] لـ [[name]] و [[email]]. وبعدين اعمل bug الـ [[g]] بإيدك: [[const re = /\d/g]] وفلتر [[["1", "2", "3"].filter((s) => re.test(s))]]. الناتج المتوقع كل الـ ٣، طلع كام؟ وليه؟ اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[parseContact(str)]] بترجّع [[{ name, email }]] من الـ named groups، أو null لو النص مش بالشكل ده.`,
          flag: "script",
          deep: {
            why: "التحقق بـ test بيقولك «الشكل صح» بس. أغلب الشغل الحقيقي «هات لي الجزء ده»: السنة من تاريخ، والـ status من سطر log، والإيميل من نص. والـ groups هي اللي بتعمل كده، والـ named groups بتخلي الكود يتقري بعد ٦ شهور.",
            how: R`[[match]] من غير g بيرجّع array: [[m[0]]] الـ match كله، و [[m[1]]] أول group، و [[m.groups]] الـ named، و [[m.index]] مكانه في النص. ولو مفيش match بيرجّع [[null]] (مش array فاضية)، فلازم تفحص قبل ما تقرا.

[[\1]] back-reference: «نفس اللي اتطابق في group 1»، فـ [[(\w)\1]] حرف متكرر ورا بعض (ll في hello).

فخ الـ g: الـ regex اللي فيه [[g]] أو [[y]] عنده [[lastIndex]] بيتحفظ بين النداءات. [[test]] الأولى لقت o عند 1 وخلّت [[lastIndex = 2]]، والتانية بدأت من 2 ولقت o تانية، والتالتة بدأت من 3 وملقتش فرجعت false ورجّعت lastIndex لـ 0. فلو regex بـ g متخزّن في متغير واستخدمته في test جوه loop أو filter، النتيجة بتتبادل true و false. متحطش g مع test.

[[y]] (sticky) بيطابق من lastIndex بالظبط وبس، مفيدة للـ tokenizers. و [[u]] بيخلي الـ emoji (اللي هو ٢ UTF-16 code units، عشان كده [[length]] بـ 2) حرف واحد. و [[v]] بيضيف طرح وتقاطع جوه الـ class: [[[\p{L}--\p{Ll}]]] «أي حرف ما عدا الحروف الصغيرة» (فـ A و ع يعدّوا و a لأ). v و u مينفعش مع بعض.

الـ lookaround مش بياكل حروف: [[\d+(?= EGP)]] رجّع [[100]] من غير [[" EGP"]].`,
            when: R`named groups في أي regex فيه أكتر من group. و [[i]] في التحقق من حاجات مش حساسة (hex، أوامر). و [[m]] مع النصوص متعددة السطور (logs). و [[u]] أو [[v]] دايمًا لو فيه عربي أو emoji.`,
            mistakes: R`[[g]] مع [[test]] أو [[exec]] على regex متشارك. و [[m[1]]] على null لما مفيش match. وتنسى [[u]] مع [[\p{...}]]: مفيش error، بس من غير u الـ [[\p{L}]] بتتقري حرفيًا «p{L}»، فـ [[/\p{L}+/.test("سعر")]] بترجّع false في صمت. وتعد الـ groups غلط بعد ما تضيف قوس في النص فالأرقام تتزحلق (named groups بتحل ده). وفي الانترفيو: «ليه test بترجع نتيجة مختلفة كل مرة؟» الإجابة: lastIndex مع g.`
          },
          teach: R`## المثال بيعمل إيه

الدرس اللي فات كان «النص ماشي على الشكل ولا لأ». هنا بنمسك **أجزاء** من النص بالأقواس (groups)، ونغيّر طريقة البحث بالـ flags. المثال ١٣ سطر، كل سطر فكرة. الناتج كله من Node 24 على Windows.

---

## ١. named groups: [[(?<name>...)]]

~~~text app.js
const re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const m = "الطلب اتعمل 2026-09-29 الصبح".match(re);
console.log(m[0], m[1], m.groups.month, m.index);
~~~

الـ pattern: ٤ أرقام، شرطة، رقمين، شرطة، رقمين. وكل جزء جوه أقواس شكلها [[(?<اسم>...)]]:

- الأقواس [[( )]] لوحدها = **capturing group**: بتحفظ اللي اتطابق جواها.
- [[?<year>]] في أولها بتدّي الـ group اسم. فتقدر تقراه بالاسم أو بالرقم.

و [[str.match(re)]] من غير [[g]] بيرجّع array فيها تفاصيل أول match. جرّبنا نطبعها كلها على نص أقصر ([["x 2026-09-29"]]):

~~~text الناتج
[
  '2026-09-29',
  '2026',
  '09',
  '29',
  index: 2,
  input: 'x 2026-09-29',
  groups: [Object: null prototype] { year: '2026', month: '09', day: '29' }
]
~~~

| الحتة | فيها إيه |
|---|---|
| [[m[0]]] | الـ match كله |
| [[m[1]]] و [[m[2]]] و [[m[3]]] | الـ groups بالترتيب (من أول قوس مفتوح) |
| [[m.groups]] | الـ named groups كـ object |
| [[m.index]] | مكان أول حرف في الـ match جوه النص (من 0) |
| [[m.input]] | النص الأصلي |

([[null prototype]] معناها object فاضي من غير methods موروثة، عادي تقرا منه بالاسم.)

ونرجع للمثال:

~~~text الناتج
2026-09-29 2026 09 12
~~~

[[m.index]] = 12 لأن قبل التاريخ [["الطلب اتعمل "]]: ٥ حروف + مسافة + ٥ + مسافة = 12.

> لو مفيش match، [[match]] بترجّع [[null]] مش array فاضية: [["hello".match(/z/)]] طلع [[null]]. فـ [[m[1]]] هنا هترمي TypeError، لازم تفحص [[if (m)]] الأول.

---

## ٢. flags [[m]] و [[s]]

~~~text app.js
console.log(/^b/m.test("a\nb"), /^b/.test("a\nb"), /a.b/.test("a\nb"), /a.b/s.test("a\nb"));
~~~

النص [["a\nb"]] سطرين: [[\n]] حرف السطر الجديد.

| الـ regex | الناتج | ليه |
|---|---|---|
| [[/^b/m]] | true | [[m]] (multiline): [[^]] بتطابق أول **كل سطر**، و b أول السطر التاني |
| [[/^b/]] | false | من غير m: [[^]] أول النص كله بس، وهو a |
| [[/a.b/]] | false | [[.]] مش بتطابق السطر الجديد |
| [[/a.b/s]] | true | [[s]] (dotAll): [[.]] بتطابق أي حرف حتى [[\n]] |

~~~text الناتج
true false false true
~~~

---

## ٣. [[i]] و back-reference و [[(?:)]]

~~~text app.js
console.log(/hello/i.test("HeLLo"), /(\w)\1/.test("hello"), /(?:ab)+/.exec("ababx")[0]);
~~~

- [[i]] (ignore case): الكابيتال زي الصغير.
- [[(\w)\1]]: [[(\w)]] بيمسك حرف، و [[\1]] معناها «نفس الحرف اللي group 1 مسكه بالظبط». يعني حرف متكرر ورا بعض. في hello: [[ll]].
- [[(?:ab)+]]: [[(?:...)]] group **من غير حفظ** (non-capturing): بيجمّع [[ab]] عشان [[+]] يكرّرها كوحدة. و [[exec]] نفس [[match]] بس method على الـ regex نفسه: [[re.exec(str)]].

~~~text الناتج
true true abab
~~~

لو كتبتها [[(ab)+]] الـ match برضه [[abab]]، بس الـ array هيبقى فيها group زيادة ([['abab', 'ab']]). [[?:]] بتوفّر ده لما مش محتاجه.

---

## ٤. فخ [[g]] مع [[test]]: [[lastIndex]]

~~~text app.js
const g = /o/g;
console.log(g.test("foo"), g.lastIndex, g.test("foo"), g.test("foo"));
~~~

الـ regex اللي فيه [[g]] (أو [[y]]) عنده خانة اسمها [[lastIndex]]: «هبدأ أدوّر من الحرف رقم كام المرة الجاية». وهي **بتتحفظ على الـ regex نفسه** بين النداءات. تتبّعنا ٤ نداءات على [["foo"]] (f في 0، و o في 1 و 2):

| النداء | بدأ من | لقى | [[lastIndex]] بعده |
|---|---|---|---|
| ١ | 0 | o عند 1: true | 2 |
| ٢ | 2 | o عند 2: true | 3 |
| ٣ | 3 | مفيش: false | رجع 0 |
| ٤ | 0 | true | 2 |

~~~text الناتج
true 2 true false
~~~

نفس النص، ونتايج مختلفة. ولو regex بـ g في متغير واستخدمته في [[filter]] أو loop، هيحصل كده بالظبط (الحل تحت).

---

## ٥. [[y]] (sticky)

~~~text app.js
const sticky = /\d+/y;
sticky.lastIndex = 4;
console.log(sticky.exec("abc 42")?.[0], /\d+/y.exec("abc 42"));
~~~

[[y]] معناها «لازم الـ match **يبدأ** عند [[lastIndex]] بالظبط، متدوّرش بعده».

- حطينا [[lastIndex = 4]]: الحرف رقم 4 في [["abc 42"]] هو 4، فلقى [["42"]].
- [[?.[0]]]: [[?.]] اسمها optional chaining: لو اللي قبلها [[null]] رجّع [[undefined]] بدل ما ترمي error، ولو مش null خد [[[0]]].
- التاني regex جديد [[lastIndex]] بتاعه 0، والحرف 0 هو a مش رقم، فـ [[null]].

~~~text الناتج
42 null
~~~

الـ [[y]] بتتستخدم في الـ tokenizers: كود بيقطّع نص لأجزاء ورا بعض من غير ما يقفز.

---

## ٦. [[u]] والـ emoji

~~~text app.js
console.log("😀".length, /^.$/.test("😀"), /^.$/u.test("😀"));
~~~

النصوص في JavaScript متخزّنة UTF-16: وحدات كل واحدة 16 bit. الـ emoji ده محتاج **وحدتين** (اسمهم surrogate pair)، فـ [[length]] بيقول 2.

~~~text الناتج
2 false true
~~~

من غير [[u]]، [[.]] بتشوف «حرفين» فـ [[^.$]] (حرف واحد بس) فشلت. ومع [[u]] الـ engine بيفهم إن دول حرف واحد.

---

## ٧. [[v]]: طرح جوه الـ class

~~~text app.js
console.log(/[\p{L}--\p{Ll}]/v.test("A"), /[\p{L}--\p{Ll}]/v.test("a"), /[\p{L}--\p{Ll}]/v.test("ع"));
~~~

- [[\p{L}]]: أي حرف (L = Letter) في أي لغة. و [[\p{Ll}]]: حرف صغير (Ll = Lowercase letter).
- [[--]] جوه [[[ ]]] مع flag [[v]]: **طرح**. يعني «أي حرف ما عدا الصغير».

~~~text الناتج
true false true
~~~

A كابيتال فعدّى، و a صغير فاتشال، و ع ملوش صغير وكبير أصلًا فمش من [[\p{Ll}]] وعدّى.

و [[v]] بديل [[u]] (فيها كل حاجة في u وزيادة)، ومينفعوش مع بعض. جرّبنا [[new RegExp("x", "uv")]]:

~~~text الناتج
SyntaxError: Invalid flags supplied to RegExp constructor 'uv'
~~~

---

## ٨. lookahead و lookbehind

~~~text app.js
console.log("price: 100 EGP".match(/\d+(?= EGP)/)[0], "$50 €30".match(/(?<=€)\d+/)[0]);
~~~

- [[(?= EGP)]] **lookahead**: «لازم بعدي يبقى [[" EGP"]]»، بس من غير ما ياخدها في الـ match.
- [[(?<=€)]] **lookbehind**: «لازم قبلي يبقى €». فـ [[50]] اللي قبلها [[$]] اتجاهلت.

~~~text الناتج
100 30
~~~

الاتنين بيتسموا lookaround: بيبصوا من غير ما ياكلوا حروف.

---

## ٩. فخ [[g]] في [[filter]] (من الحل)

~~~text app.js
const withG = /\d/g;
console.log(["1", "2", "3"].filter((s) => withG.test(s)));
const noG = /\d/;
console.log(["1", "2", "3"].filter((s) => noG.test(s)));
~~~

~~~text الناتج
[ '1', '3' ]
[ '1', '2', '3' ]
~~~

مع [[g]]: أول test لقت 1 وخلّت [[lastIndex = 1]]. التانية على [["2"]] (حرف واحد) بدأت من 1، يعني بعد آخر النص، ففشلت ورجّعت [[lastIndex]] لـ 0. التالتة نجحت. فالـ [["2"]] وقعت من غير سبب. ومن غير [[g]] مفيش [[lastIndex]] بيتحفظ، فكله صح.

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[( )]] | group بيتحفظ: [[m[1]]] |
| [[(?<name>...)]] | group باسم: [[m.groups.name]] |
| [[(?:...)]] | تجميع من غير حفظ |
| [[\1]] | نفس اللي group 1 مسكه |
| [[(?=...)]] و [[(?<=...)]] | بعده / قبله كذا، من غير ما ياخده |
| [[g]] [[i]] [[m]] [[s]] [[u]] [[v]] [[y]] | كله، مش حساس، كل سطر، النقطة تاخد السطر الجديد، unicode، unicode + طرح، من lastIndex بالظبط |

ومتحطش [[g]] على regex بتستخدمه مع [[test]] أكتر من مرة.`,
          lines: [
            "٣ named groups لتاريخ.",
            R`[[match]] من غير g: أول match بالتفاصيل.`,
            R`[[2026-09-29 2026 09 12]]: الكل، وأول group، والشهر بالاسم، والمكان.`,
            R`[[true false false true]]: m بتخلي ^ لكل سطر، و s بتخلي . تاخد السطر الجديد.`,
            R`[[true true abab]]: i، و [[\1]] حرف متكرر، و [[(?:)]] بيكرر وحدة.`,
            R`regex بـ g في متغير.`,
            R`[[true 2 true false]]: lastIndex بيفتكر، فالتالتة فشلت. فخ مشهور.`,
            R`[[y]]: لازم يطابق من lastIndex بالظبط.`,
            "ابدأ من الحرف الرابع.",
            R`[[42 null]]: من 4 لقى، ومن 0 لأ (a مش رقم).`,
            R`[[2 false true]]: الـ emoji اتنين code units، و u بتخليه حرف واحد.`,
            R`[[true false true]]: v بتسمح بطرح classes (العربي ملوش صغير وكبير فبيعدّي).`,
            R`lookahead و lookbehind: [[100 30]] من غير EGP ولا €.`
          ],
          sol: R`الـ regex: [[/^(?<name>.+?)\s*<(?<email>[^>]+)>$/]]، و [[m.groups]] بـ [[{ name: "Sara Ahmed", email: "sara@example.com" }]]. الـ [[+?]] lazy عشان الاسم ميبلعش المسافة، و [[[^>]+]] «أي حاجة غير >» أحسن وأسرع من [[.+?]] جوه الأقواس.

فخ الـ g: [[filter]] بترجّع [[["1", "3"]]] مش الـ ٣. أول test لقت 1 وخلّت lastIndex = 1، التانية على "2" بدأت من index 1 (بعد آخر النص) ففشلت ورجّعت lastIndex لـ 0، والتالتة نجحت. الحل: شيل g، أو اعمل الـ regex جوه الـ callback.`,
          solCode: R`const contact = /^(?<name>.+?)\s*<(?<email>[^>]+)>$/;
console.log("Sara Ahmed <sara@example.com>".match(contact).groups);
const withG = /\d/g;
console.log(["1", "2", "3"].filter((s) => withG.test(s)));
const noG = /\d/;
console.log(["1", "2", "3"].filter((s) => noG.test(s)));`,
          check: {
            lang: "js",
            starter: R`function parseContact(str) {
  const m = str.match(/(.+) <(.+)>/);
  return m ? { name: m[1], email: m[2] } : null;
}`,
            tests: R`test("'Sara Ahmed <sara@example.com>'", () => expect(parseContact("Sara Ahmed <sara@example.com>")).toEqual({ name: "Sara Ahmed", email: "sara@example.com" }));
test("الاسم ميبلعش المسافة: 'Ali   <ali@x.io>' ← name 'Ali'", () => expect(parseContact("Ali   <ali@x.io>")).toEqual({ name: "Ali", email: "ali@x.io" }));
test("من غير مسافة: 'Mona<m@x.io>'", () => expect(parseContact("Mona<m@x.io>")).toEqual({ name: "Mona", email: "m@x.io" }));
test("من غير <> ← null", () => expect(parseContact("sara@example.com")).toBe(null));
test("كلام بعد الـ > ← null (^ و $)", () => expect(parseContact("Sara <s@x.io> extra")).toBe(null));`,
            solution: R`function parseContact(str) {
  const m = str.match(/^(?<name>.+?)\s*<(?<email>[^>]+)>$/);
  return m ? { name: m.groups.name, email: m.groups.email } : null;
}`
          }
        },
        {
          cmd: "test و match و matchAll و replace",
          title: "تدوّر وتستبدل إزاي؟ (test و match و matchAll و replace)",
          desc: R`[[re.test(str)]]: فيه match ولا لأ (boolean). [[str.match(re)]]: من غير g أول match بالتفاصيل والـ groups، ومع g array نصوص بس (من غير groups). [[str.matchAll(re)]]: لازم g، وبترجّع كل الـ matches بالتفاصيل كل واحد بالـ groups بتاعته، فتلف عليها بـ for...of. [[str.replace(re, x)]]: بتستبدل، ومع g كل الـ matches.

في نص الاستبدال: [[$1]] و [[$2]] الـ groups بالرقم، و [[$<name>]] بالاسم، و [[$&]] الـ match كله. ولو محتاج منطق، ابعت دالة: بتاخد الـ match والـ groups وترجّع النص الجديد.

و [[split]] بتقبل regex كمان، و [[replaceAll]] بنص عادي بتستبدل الكل من غير regex خالص.`,
          example: R`const log = "GET /api/users 200 12ms\nPOST /api/login 401 8ms\nGET /api/orders 500 230ms";
const re = /^(?<method>[A-Z]+) (?<path>\S+) (?<status>\d{3}) (?<ms>\d+)ms$/gm;
for (const m of log.matchAll(re)) {
  const { method, path, status, ms } = m.groups;
  if (Number(status) >= 400) console.log(method, path, status, ms);
}
console.log(log.match(/\b\d{3}\b(?= )/g));
console.log("2026-09-29".replace(/(\d+)-(\d+)-(\d+)/, "$3/$2/$1"));
console.log("2026-09-29".replace(/(?<y>\d+)-(?<m>\d+)-(?<d>\d+)/, "$<d>/$<m>/$<y>"));
console.log("hello big world".replace(/\b\w/g, (ch) => ch.toUpperCase()));
console.log("a.b.c".replaceAll(".", "/"), "a-b_c  d".split(/[-_\s]+/));
const userInput = "1+1";
const safe = userInput.replace(/[.*+?^$__{}()|[\]\\]/g, "\\$&");
console.log(safe, new RegExp(safe).test("1+1=2"));`,
          try: R`اكتب [[slugify(title)]]: [["  Hello, World! JS 2026  "]] ← [["hello-world-js-2026"]] (حروف صغيرة، وأي حاجة مش حرف أو رقم تبقى شرطة، ومفيش شرطات مكررة ولا في الأطراف). وبعدين اكتب [[maskPhone]] بـ replace ودالة: [["01012345678"]] ← [["010*****678"]]. وبعدين من الـ log اللي فوق اطبع متوسط الـ ms لكل الطلبات. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات بتجرّب [[slugify]] و [[maskPhone]] و [[avgMs(log)]] (متوسط الـ ms من الـ log).`,
          flag: "script",
          deep: {
            why: "ده الاستخدام اليومي: تقطّع logs، وتعمل slug، وتخفي بيانات حساسة قبل ما تطبعها (masking)، وتعيد ترتيب تاريخ، وتنظّف input. ومعرفة أنهي method ترجّع إيه بتوفّر عليك «undefined is not iterable» كتير.",
            how: R`[[matchAll]] بترجّع iterator (مش array)، كل عنصر فيه نفس تفاصيل [[match]] من غير g. فهي الطريقة الحديثة لـ «كل الـ matches بالـ groups» بدل loop الـ [[exec]] القديم. ولازم الـ regex فيه g وإلا ترمي TypeError. وبما إن [[m]] موجودة، [[^]] و [[$]] بيطابقوا أول وآخر كل سطر.

[[match]] مع g بيرمي الـ groups وبيرجّع النصوص بس: [[['200', '401', '500']]]. و [[\b\d{3}\b(?= )]]: ٣ أرقام كلمة لوحدها وبعدها مسافة، فـ 230 (بعدها ms) مدخلتش.

الدالة في replace بتاخد [[(match, g1, g2, ..., offset, string, groups)]]. في المثال بتاخد أول حرف كل كلمة وترجعه كابيتال.

آخر سطرين: لو هتبني regex من input اليوزر ([[new RegExp(text)]])، أي [[+]] أو [[.]] أو [[(]] هيبقى ليه معنى، وممكن حد يدخّل pattern يوقّع السيرفر (آخر درس). فلازم تعمل escape لكل الحروف الخاصة: [[$&]] في الاستبدال معناها «الحرف اللي اتطابق»، فكل حرف خاص بيبقى [[\]] + نفسه. وفيه [[RegExp.escape(text)]] الجديدة (ES2025) بتعمل ده، مدعومة في المتصفحات الحديثة و Node 24+، بس مش في Node 22.`,
            when: R`matchAll: استخراج كل الحاجات بتفاصيلها (logs، hashtags، mentions). replace بدالة: تحويلات فيها منطق. split بـ regex: فواصل متعددة. replaceAll بنص: استبدال حرفي من غير regex.`,
            mistakes: R`[[str.replace("a", "b")]] بنص عادي بتستبدل أول واحد بس: استخدم replaceAll. و [[matchAll]] من غير g. و [[match]] بـ g وتتوقع groups. و [[$]] في نص الاستبدال وانت عايزه حرفي (اكتب [[$$]]). و [[new RegExp(userInput)]] من غير escape. و [[new RegExp("\d+")]] بـ backslash واحد: في الـ string بيبقى [["d+"]]، لازم [["\\d+"]].`
          },
          teach: R`## المثال بيعمل إيه

بياخد ٣ سطور log ويطلّع منهم الطلبات اللي فشلت، وبعدين يجرّب كل طريقة استبدال: بالرقم، وبالاسم، وبدالة، ونص عادي، وفي الآخر بيحمي نص جاي من اليوزر قبل ما يحوّله regex. الناتج كله من Node 24 على Windows.

> المربع اللي تحت الدرس بيطلب [[slugify]] و [[maskPhone]] و [[avgMs]]. الشرح هنا بيفك المثال والأدوات اللي هتحتاجها، والحل نفسه عليك.

---

## ١. الـ log والـ regex

~~~text app.js
const log = "GET /api/users 200 12ms\nPOST /api/login 401 8ms\nGET /api/orders 500 230ms";
const re = /^(?<method>[A-Z]+) (?<path>\S+) (?<status>\d{3}) (?<ms>\d+)ms$/gm;
~~~

الـ log نص واحد فيه ٣ سطور مفصولين بـ [[\n]]. وكل سطر شكله: method، مسافة، path، مسافة، status، مسافة، وقت بالـ ms.

| الحتة | بتمسك | من السطر الأول |
|---|---|---|
| [[^]] | أول السطر (بسبب [[m]]) | |
| [[(?<method>[A-Z]+)]] | حروف كابيتال | [[GET]] |
| مسافة | المسافة نفسها | |
| [[(?<path>\S+)]] | أي حاجة مش مسافة ([[\S]] عكس [[\s]]) | [[/api/users]] |
| [[(?<status>\d{3})]] | ٣ أرقام | [[200]] |
| [[(?<ms>\d+)ms]] | أرقام وبعدها الحرفين ms | [[12]] |
| [[$]] | آخر السطر | |

والـ flags: [[g]] عشان نلاقي كل السطور، و [[m]] عشان [[^]] و [[$]] يبقوا لكل سطر مش للنص كله.

---

## ٢. [[matchAll]]: كل match بتفاصيله

~~~text app.js
for (const m of log.matchAll(re)) {
  const { method, path, status, ms } = m.groups;
  if (Number(status) >= 400) console.log(method, path, status, ms);
}
~~~

- [[log.matchAll(re)]]: بترجّع **iterator** (حاجة بتلف عليها بـ [[for...of]] أو تفردها بـ [[[...x]]])، مش array. كل عنصر فيه نفس اللي [[match]] من غير g بترجّعه: [[[0]]] و [[groups]] و [[index]].
- [[const { method, path, status, ms } = m.groups]]: **destructuring**: بيطلّع ٤ متغيرات من الـ object مرة واحدة بنفس الأسامي.
- [[Number(status)]]: الـ groups دايمًا **نصوص**، فبنحوّل لرقم قبل المقارنة بـ [[>=]].

لما فردناها ([[[...log.matchAll(re)]]]) لقينا 3 matches، وأول واحد:

~~~text الناتج
3 GET /api/users 200 12ms | {"method":"GET","path":"/api/users","status":"200","ms":"12"} 24
~~~

و [[index]] بتاع التاني 24: السطر الأول ٢٣ حرف + [[\n]].

وناتج المثال (الـ status 400 أو أكتر بس):

~~~text الناتج
POST /api/login 401 8
GET /api/orders 500 230
~~~

ولو نسيت [[g]]:

~~~text الناتج لـ "a1".matchAll(/\d/)
TypeError: String.prototype.matchAll called with a non-global RegExp argument
~~~

---

## ٣. [[match]] مع [[g]]: نصوص بس

~~~text app.js
console.log(log.match(/\b\d{3}\b(?= )/g));
~~~

[[\b\d{3}\b]]: ٣ أرقام لوحدهم ككلمة، و [[(?= )]]: بعدهم مسافة (lookahead، الدرس اللي فات).

~~~text الناتج
[ '200', '401', '500' ]
~~~

[[230]] مدخلتش: بعدها [[ms]] مش مسافة. ولاحظ إن مع [[g]] الـ [[match]] بيرجّع النصوص وخلاص، من غير groups ولا index. عشان كده [[matchAll]] موجودة.

---

## ٤. [[replace]] بـ [[$1]] و [[$<name>]]

~~~text app.js
console.log("2026-09-29".replace(/(\d+)-(\d+)-(\d+)/, "$3/$2/$1"));
console.log("2026-09-29".replace(/(?<y>\d+)-(?<m>\d+)-(?<d>\d+)/, "$<d>/$<m>/$<y>"));
~~~

[[str.replace(re, نص)]]: بيستبدل الـ match بالنص التاني. وجوه نص الاستبدال رموز خاصة:

| الرمز | معناه |
|---|---|
| [[$1]] [[$2]] [[$3]] | group رقم 1 و 2 و 3 |
| [[$<name>]] | الـ group اللي اسمه name |
| [[$&]] | الـ match كله |
| [[$$]] | علامة [[$]] حرفية |

فـ [["$3/$2/$1"]] = اليوم/الشهر/السنة:

~~~text الناتج
29/09/2026
29/09/2026
~~~

نفس النتيجة، والتاني أوضح لأنك بتقرا [[$<d>]] وفاهم.

---

## ٥. [[replace]] بدالة

~~~text app.js
console.log("hello big world".replace(/\b\w/g, (ch) => ch.toUpperCase()));
~~~

[[\b\w]]: أول حرف بعد حد كلمة، يعني أول حرف في كل كلمة. ومع [[g]] كل الكلمات. وبدل نص، بعتنا **دالة**: [[replace]] بتناديها مع كل match، واللي ترجّعه بيتحط مكانه.

~~~text الناتج
Hello Big World
~~~

الدالة بتاخد arguments بالترتيب ده: الـ match، وبعدين كل group، وبعدين المكان ([[offset]])، والنص الأصلي، والـ named groups لو فيه. جرّبنا:

~~~text الناتج لـ "a1".replace(/(\d)/, (match, g1, offset, str) => JSON.stringify([match, g1, offset, str]))
a["1","1",1,"a1"]
~~~

---

## ٦. [[replaceAll]] و [[split]]

~~~text app.js
console.log("a.b.c".replaceAll(".", "/"), "a-b_c  d".split(/[-_\s]+/));
~~~

- [[replaceAll(".", "/")]]: بنص عادي (مش regex)، فالنقطة نقطة حرفية، وكل النقط اتغيرت. ([[replace]] بنص عادي بيغيّر **أول واحدة بس**: [["a-b-c".replace("-", "+")]] طلّعت [[a+b-c]].)
- [[split(/[-_\s]+/)]]: يقطّع عند أي سلسلة من شرطة أو [[_]] أو مسافات. والـ [[+]] بتخلي المسافتين فاصل واحد.

~~~text الناتج
a/b/c [ 'a', 'b', 'c', 'd' ]
~~~

---

## ٧. regex من نص اليوزر: escape

~~~text app.js
const userInput = "1+1";
const safe = userInput.replace(/[.*+?^$__{}()|[\]\\]/g, "\\$&");
console.log(safe, new RegExp(safe).test("1+1=2"));
~~~

- [[new RegExp(نص)]]: بيعمل regex من string. مفيد لما الـ pattern مش معروف وانت بتكتب الكود (بحث بكلمة اليوزر).
- المشكلة: [[+]] في [["1+1"]] ليها معنى في الـ regex («واحد أو أكتر»). ولو اليوزر كتب [["(a+"]] الـ regex نفسه هيبوظ:

~~~text الناتج لـ new RegExp("(a+")
SyntaxError: Invalid regular expression: /(a+/: Unterminated group
~~~

- الحل: قبل كل حرف خاص حط [[\]]. الـ class [[[.*+?^$__{}()|[\]\\]]] فيها كل الحروف الخاصة (و [[\]]] و [[\\]] عشان [[]]] و [[\]] نفسهم)، و [["\\$&"]] = [[\]] + الحرف اللي اتطابق ([[$&]]).

~~~text الناتج
1\+1 true
~~~

بقت [[1\+1]]، فبتدوّر على «1+1» حرفيًا.

وفيه دالة جاهزة [[RegExp.escape()]] جوه اللغة. جرّبناها في Node 24: [[RegExp.escape("1+1")]] طلّعت [[\x31\+1]] (بتعمل escape لأول رقم كمان كـ [[\x31]]، عشان ميتلزقش في حاجة قبله)، و test عليها طلع [[true]]. بس مش موجودة في Node 22.

---

## الخلاصة

| عايز | استخدم | بترجّع |
|---|---|---|
| فيه ولا لأ | [[re.test(str)]] | true / false |
| أول match بتفاصيله | [[str.match(re)]] من غير g | array أو null |
| كل الـ matches كنصوص | [[str.match(re)]] مع g | array نصوص أو null |
| كل الـ matches بتفاصيلها | [[str.matchAll(re)]] (لازم g) | iterator |
| تستبدل | [[str.replace(re, نص أو دالة)]] | نص جديد |
| تستبدل نص حرفي في كل حتة | [[str.replaceAll(نص, نص)]] | نص جديد |
| تقطّع بفواصل مختلفة | [[str.split(re)]] | array |

والـ groups دايمًا نصوص: حوّلها بـ [[Number]] قبل ما تحسب.`,
          lines: [
            "٣ سطور log.",
            R`named groups لكل جزء، و [[g]] لكل الـ matches، و [[m]] عشان ^ و $ لكل سطر.`,
            R`[[matchAll]]: كل match بالـ groups بتاعته.`,
            R`فك الـ groups في متغيرات.`,
            R`الأخطاء بس: [[POST /api/login 401 8]] و [[GET /api/orders 500 230]].`,
            "قفلة.",
            R`match بـ g: نصوص بس، [[['200', '401', '500']]].`,
            R`[[$3/$2/$1]]: [[29/09/2026]].`,
            R`نفس الحاجة بالأسماء: أوضح.`,
            R`دالة استبدال: [[Hello Big World]].`,
            R`[[replaceAll]] بنص: [[a/b/c]]، و split بـ regex: [['a', 'b', 'c', 'd']].`,
            "نص من اليوزر فيه + (حرف خاص).",
            R`escape لكل الحروف الخاصة: بقى [[1\+1]].`,
            R`[[1\+1 true]]: بيدوّر على «1+1» حرفيًا.`
          ],
          sol: R`[[slugify]]: [[title.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "")]]. أول replace بيحوّل أي سلسلة حروف مش حرف ولا رقم (مسافات وفواصل وعلامات) لشرطة واحدة (بسبب الـ [[+]])، والتاني بيشيل الشرطات من الأطراف. استخدمنا [[\p{L}]] مش [[a-z]] عشان العناوين العربي متتمسحش. الناتج [["hello-world-js-2026"]]، وعنوان عربي زي [["أول درس في JS"]] بيطلع [["أول-درس-في-js"]].

[[maskPhone]]: [[/^(\d{3})(\d+)(\d{3})$/]] ودالة ترجّع [[a + "*".repeat(mid.length) + c]]، فالناتج [["010*****678"]] وطوله زي الأصل.

المتوسط: [[(12 + 8 + 230) / 3]] = 83.33. الغلطة الشائعة إنك تجمع [[m.groups.ms]] من غير Number فتلزق نصوص: [["0" + "12" + "8" + "230"]].`,
          solCode: R`const slugify = (title) => title.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "");
console.log(slugify("  Hello, World! JS 2026  "), slugify("أول درس في JS"));
const maskPhone = (p) => p.replace(/^(\d{3})(\d+)(\d{3})$/, (_, a, mid, c) => a + "*".repeat(mid.length) + c);
console.log(maskPhone("01012345678"));
const log = "GET /api/users 200 12ms\nPOST /api/login 401 8ms\nGET /api/orders 500 230ms";
const times = [...log.matchAll(/(?<ms>\d+)ms$/gm)].map((m) => Number(m.groups.ms));
console.log(times, (times.reduce((a, b) => a + b, 0) / times.length).toFixed(2));`,
          check: {
            lang: "js",
            starter: R`const slugify = (title) => title.toLowerCase().replaceAll(" ", "-");
const maskPhone = (p) => p;
function avgMs(log) {
  // matchAll على /(?<ms>\d+)ms$/gm وحوّل لـ Number قبل الجمع
}`,
            tests: R`test("slugify('  Hello, World! JS 2026  ') ← 'hello-world-js-2026'", () => expect(slugify("  Hello, World! JS 2026  ")).toBe("hello-world-js-2026"));
test("العربي ميتمسحش: 'أول درس في JS' ← 'أول-درس-في-js'", () => expect(slugify("أول درس في JS")).toBe("أول-درس-في-js"));
test("مفيش شرطات مكررة ولا في الأطراف: '--a  --  b--' ← 'a-b'", () => expect(slugify("--a  --  b--")).toBe("a-b"));
test("maskPhone('01012345678') ← '010*****678' بنفس الطول", () => expect(maskPhone("01012345678")).toBe("010*****678"));
test("avgMs للـ log اللي في المثال ← 83.33 تقريبًا (Number مش لزق نصوص)", () => {
  const log = "GET /api/users 200 12ms\nPOST /api/login 401 8ms\nGET /api/orders 500 230ms";
  expect(Math.round(avgMs(log) * 100) / 100).toBe(83.33);
});`,
            solution: R`const slugify = (title) => title.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "");
const maskPhone = (p) => p.replace(/^(\d{3})(\d+)(\d{3})$/, (_, a, mid, c) => a + "*".repeat(mid.length) + c);
function avgMs(log) {
  const times = [...log.matchAll(/(?<ms>\d+)ms$/gm)].map((m) => Number(m.groups.ms));
  return times.reduce((a, b) => a + b, 0) / times.length;
}`
          }
        },
        {
          cmd: "إمتى regex غلط",
          title: "إمتى متستخدمش regex؟ (email و HTML و ReDoS)",
          desc: R`regex أداة للأشكال البسيطة. ٣ أماكن هو فيها غلط:

الإيميل: الـ regex «الكامل» حسب المواصفات صفحة كاملة ولسه بيغلط. اللي بيهمك إن الإيميل موجود وبتاع اليوزر، وده مفيش regex بيقوله. اعمل فحص بسيط ([[@]] ونقطة بعدها، أو [[type="email"]] أو [[z.email()]])، وابعت رسالة تأكيد.

HTML و JSON و URLs: دي لغات متداخلة (tag جوه tag، و quotes، و comments)، و regex مبيعرفش يعد العمق. استخدم parser: [[DOMParser]] في المتصفح، و [[JSON.parse]]، و [[new URL()]] و [[URLSearchParams]].

ReDoS (catastrophic backtracking): patterns فيها quantifier جوه quantifier زي [[(a+)+]] أو [[(\w+\s?)*]] ممكن تاخد وقت بيتضاعف مع كل حرف في input معيّن. ولأن Node thread واحد، request واحد بـ ٣٠ حرف ممكن يوقّف السيرفر كله.`,
          example: R`const evil = /^(a+)+$/;
const fixed = /^a+$/;
for (const n of [20, 24, 26]) {
  const input = "a".repeat(n) + "!";
  const t0 = performance.now();
  evil.test(input);
  const t1 = performance.now();
  fixed.test(input);
  console.log(n, Math.round(t1 - t0) + "ms", (performance.now() - t1).toFixed(3) + "ms");
}
const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log(email.test("sara@example.com"), email.test("sara@localhost"), email.test("a b@x.com"));
console.log(new URL("https://shop.example/p?id=7&ref=fb").searchParams.get("id"));`,
          try: R`شغّل المثال، وبعدين زوّد الـ n لـ 28 و 30 (خلي Ctrl+C جاهز). الوقت بيزيد إزاي مع كل حرفين؟ وبعدين في Console بتاع المتصفح: استخرج كل اللينكات من [['<p>اقرا <a href="/a">ده</a> و <a href="/b" class="x">ده</a></p>']] مرة بـ regex ومرة بـ DOMParser، وبعدين حط [[>]] جوه قيمة attribute وشوف مين فيهم بيبوظ.`,
          flag: "script",
          deep: {
            why: "أشهر outage بسبب regex: Cloudflare في يوليو 2019، سطر regex واحد في قواعد الـ WAF خلّى الـ CPU ١٠٠٪ على كل السيرفرات حوالي نص ساعة. و Stack Overflow وقع سنة 2016 بسبب regex بيشيل المسافات من آخر السطر. وفي Node الموضوع أخطر: الـ event loop واحد، فـ regex بطيء = السيرفر مبيردش على حد (قسم الـ event loop).",
            how: R`الـ engine في JS (زي أغلب اللغات) backtracking: لو فشل بيرجع يجرّب طريقة تقسيم تانية. [[(a+)+]] على [["aaaa...!"]]: الـ a's ممكن تتقسم بين الـ [[+]] الداخلي والخارجي بعدد طرق بيتضاعف مع كل حرف (2^n تقريبًا)، وكلهم هيفشلوا عند [[!]]، والـ engine لازم يجرّبهم كلهم قبل ما يقول false. عشان كده الوقت بيتضاعف مع كل حرف زيادة، و [[/^a+$/]] اللي بتقبل نفس النصوص بالظبط بتخلص في أقل من ملّي ثانية.

العلامات الخطر: quantifier جوه group عليه quantifier ([[(x+)+]] و [[(x*)*]] و [[(x+)*]])، أو بدائل بتتداخل ([[(a|a)+]] و [[(\w|\d)+]])، وبعدهم حاجة ممكن تفشل.

الحماية: حدّد طول الـ input قبل الـ regex (إيميل أقصاه 254 حرف)، واكتب patterns من غير تداخل، وفيه ESLint plugin اسمه [[eslint-plugin-regexp]] بيكشف الـ backtracking الخطر، ولو الـ pattern نفسه جاي من يوزر (بحث متقدم) استخدم مكتبة [[re2]] (engine وقته خطي، مفيهوش backtracking بس كمان مفيهوش back-references ولا lookaround).

الإيميل: الـ regex في المثال عملي: مفيش مسافات، و [[@]] واحدة، ونقطة في الدومين. [["sara@localhost"]] قانوني تقنيًا بس مش مفيد لموقع. والتأكيد الحقيقي لينك في إيميل.`,
            when: R`regex: أشكال قصيرة ومسطحة (أرقام، أكواد، slugs، سطور logs ليها شكل ثابت). parser: أي حاجة فيها تداخل أو quoting أو escaping. مكتبة validation (Zod): إيميلات و URLs و UUIDs، لأنهم كتبوا الـ patterns وجرّبوها.`,
            mistakes: R`regex إيميل من Stack Overflow طوله ٤٠٠ حرف ومحدش فاهمه. و HTML بـ regex (sanitize بالذات: استخدم DOMPurify، تاب الأمان). و [[new RegExp(req.query.q)]] على السيرفر (ReDoS و injection). ومفيش حد للطول. وفي الانترفيو: «إيه هو ReDoS وإزاي تحمي منه؟» الإجابة: backtracking بيتضاعف مع nested quantifiers، والحل patterns من غير تداخل + حد للطول + re2 للـ patterns اللي من برّه.`
          },
          teach: R`## المثال بيعمل إيه

٣ تجارب: regex «شكله بريء» بيبطّأ بشكل مرعب مع كل حرف زيادة (ReDoS)، وفحص إيميل عملي، و URL بـ parser بدل regex. الناتج من Node 24 على Windows، والأوقات بتختلف من جهاز لجهاز.

---

## ١. الـ regex الخطر والآمن

~~~text app.js
const evil = /^(a+)+$/;
const fixed = /^a+$/;
~~~

- [[evil]]: [[a+]] (a مرة أو أكتر) جوه group، والـ group نفسه عليه [[+]]. ده اسمه **nested quantifier**: quantifier جوه quantifier.
- [[fixed]]: a مرة أو أكتر، من الأول للآخر.

الاتنين بيقبلوا **نفس النصوص بالظبط** (a أو أكتر وبس). الفرق في طريقة البحث.

---

## ٢. القياس

~~~text app.js
for (const n of [20, 24, 26]) {
  const input = "a".repeat(n) + "!";
  const t0 = performance.now();
  evil.test(input);
  const t1 = performance.now();
  fixed.test(input);
  console.log(n, Math.round(t1 - t0) + "ms", (performance.now() - t1).toFixed(3) + "ms");
}
~~~

- [[for (const n of [20, 24, 26])]]: نجرّب ٣ أطوال.
- [["a".repeat(n) + "!"]]: n حرف a وفي الآخر [[!]]. الـ [[!]] هي اللي بتخلي الـ match **يفشل**، وده المهم: الـ regex بيتعب لما بيفشل، مش لما بينجح.
- [[performance.now()]]: الوقت بالـ ms بكسور (أدق من [[Date.now()]]). نقيس قبل وبعد كل test.
- [[Math.round(t1 - t0)]]: وقت الخطر مقرّب. و [[.toFixed(3)]]: وقت الآمن بـ ٣ أرقام بعد العلامة، لأنه صغير جدًا.

~~~text الناتج (مرة من التشغيلات)
20 57ms 0.038ms
24 100ms 0.067ms
26 417ms 0.013ms
~~~

وجرّبنا أطوال أكتر في تشغيل لوحده:

~~~text الناتج
20 58ms
22 25ms
24 97ms
26 407ms
28 1593ms
~~~

(أول قياس دايمًا أبطأ من المتوقع، لأن V8 بيجهّز الـ regex أول مرة.) من 22 لـ 28: كل **حرفين** زيادة الوقت تقريبًا **×4**، يعني كل حرف ×2. والآمن فضل أقل من عُشر ملّي ثانية.

### ليه بيحصل كده؟

الـ engine في JavaScript بيشتغل بـ **backtracking**: لو طريقة فشلت، يرجع يجرّب طريقة تانية. وفي [[(a+)+]] الـ a's ممكن تتقسم بين الـ [[+]] اللي جوه والـ [[+]] اللي برّه بطرق كتير جدًا. مثلًا [["aaa"]] ممكن تبقى:

~~~text طرق تقسيم aaa بين المجموعات
(aaa)
(aa)(a)
(a)(aa)
(a)(a)(a)
~~~

٤ طرق لـ ٣ حروف، وكل حرف زيادة بيضاعفهم (2 أس n−1). ولما توصل لـ [[!]] وكل طريقة تفشل، الـ engine لازم يجرّبهم **كلهم** قبل ما يقول false. و [[/^a+$/]] مفيهاش غير طريقة واحدة، فتفشل على طول.

### ليه ده خطر على سيرفر؟

Node بيشغّل JavaScript على **thread واحد** (قسم الـ event loop الجاي). وطول ما الـ regex شغال، مفيش ولا request تاني بيترد. فاليوزر اللي يبعت ٣٠ حرف مختارين صح ممكن يوقّف السيرفر ثواني أو دقايق. ده اسمه **ReDoS**: Regular expression Denial of Service.

---

## ٣. فحص إيميل عملي

~~~text app.js
const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log(email.test("sara@example.com"), email.test("sara@localhost"), email.test("a b@x.com"));
~~~

| الحتة | معناها |
|---|---|
| [[[^\s@]+]] | حرف أو أكتر، أي حاجة **غير** مسافة و [[@]] ([[^]] في أول الـ class = «غير») |
| [[@]] | @ واحدة |
| [[[^\s@]+]] | اسم الدومين |
| [[\.]] | نقطة حرفية ([[.]] لوحدها = أي حرف) |
| [[[^\s@]+$]] | الامتداد لحد الآخر |

~~~text الناتج
true false false
~~~

[["sara@localhost"]] مفيهاش نقطة، و [["a b@x.com"]] فيها مسافة. والـ regex ده مش «كامل»، ومش محتاج يبقى: الفحص الحقيقي إنك تبعت إيميل تأكيد.

---

## ٤. URL بـ parser

~~~text app.js
console.log(new URL("https://shop.example/p?id=7&ref=fb").searchParams.get("id"));
~~~

- [[new URL(نص)]]: بيفك اللينك لأجزاء (البروتوكول، الدومين، الـ path، الـ query) بنفس قواعد المتصفح.
- [[.searchParams]]: الجزء اللي بعد [[?]] كـ object، و [[.get("id")]] بيجيب قيمة واحدة.

~~~text الناتج
7
~~~

لاحظ إنها نص [["7"]] مش رقم.

---

## ٥. اللينكات من HTML: regex ضد DOMParser

ده من الـ «جرّب»، واتشغّل في Chrome (headless). على HTML بسيط الاتنين جابوا [[["/a", "/b"]]]. وبعدين جرّبنا HTML فيه ٣ حاجات عادية جدًا: [[>]] جوه قيمة attribute، و href بـ single quotes، ولينك قديم جوه comment، ومسافات حوالين [[=]]:

~~~text HTML التجربة
<p><a title="1 > 0" href='/a'>ده</a> <!-- <a href="/old"> --> <a href = "/b">ده</a></p>
~~~

~~~text app.js
const rx = (h) => [...h.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
const dp = (h) => [...new DOMParser().parseFromString(h, "text/html").querySelectorAll("a")].map((a) => a.getAttribute("href"));
~~~

~~~text الناتج
rx: ["/old"]
dp: ["/a","/b"]
~~~

الـ regex جاب اللينك الوحيد **الغلط** (اللي جوه الـ comment) وفوّت الاتنين الصح. و [[DOMParser]] بيقرا الـ HTML بنفس الـ parser اللي المتصفح بيعرض بيه الصفحة، فجاب الصح.

---

## الخلاصة

| الحالة | الأداة |
|---|---|
| شكل قصير ومسطح (رقم، كود، slug) | regex |
| HTML | [[DOMParser]] (وللـ sanitize: DOMPurify) |
| URL | [[new URL()]] و [[URLSearchParams]] |
| JSON | [[JSON.parse]] |
| إيميل | فحص بسيط + رسالة تأكيد (أو [[z.email()]]) |

وعلامة الخطر في أي regex: quantifier جوه group عليه quantifier ([[(x+)+]] و [[(x*)*]])، وبعده حاجة ممكن تفشل.`,
          lines: [
            R`nested quantifier: [[+]] جوه [[+]]. خطر.`,
            "بتقبل نفس النصوص بالظبط، من غير تداخل.",
            "جرّب ٣ أطوال.",
            R`a's كتير وفي الآخر حرف بيخلي الـ match يفشل.`,
            "وقت البداية.",
            "الـ regex الخطر.",
            "وقت بداية الآمن.",
            "الآمن.",
            R`عندي: [[20 46ms]] و [[24 119ms]] و [[26 461ms]]، والآمن [[0.0xms]].`,
            "قفلة.",
            "فحص إيميل عملي، والتأكيد الحقيقي برسالة.",
            R`[[true false false]].`,
            R`URL بـ parser مش regex: [["7"]].`
          ],
          sol: R`الأرقام بتختلف حسب جهازك، بس الشكل ثابت: كل حرف زيادة الوقت تقريبًا بيتضاعف (من 24 لـ 26 حوالي ٤ أضعاف). يعني 30 حوالي ٨ ثواني، و 40 ساعات. وطول الوقت ده الـ process واقف: لو ده سيرفر Node، ولا request تاني بيترد. والـ regex الآمن ثابت تقريبًا في كل الأطوال.

اللينكات بـ regex: [[/href="([^"]+)"/g]] بيشتغل على المثال ده، بس بيبوظ لو الـ attribute بـ single quotes، أو فيه مسافة حوالين [[=]]، أو اللينك جوه comment، أو [[href]] مكتوب في نص عادي. و DOMParser: [[[...new DOMParser().parseFromString(html, "text/html").querySelectorAll("a")].map((a) => a.getAttribute("href"))]] بيرجّع [[["/a", "/b"]]] مهما كان شكل الـ HTML، لأنه نفس الـ parser اللي المتصفح بيعرض بيه الصفحة.`
        }
      ]
    }
]);
