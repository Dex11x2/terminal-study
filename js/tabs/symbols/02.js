// تكملة تاب symbols: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/symbols/01.js (شرح حقول الدرس في أوله)
MORE("symbols", [
    {
      t: "رموز المنطق",
      l: 2,
      n: "! و && و || و ?? و ?. و ? : : إزاي تكتب شروط وقيم افتراضية من غير if طويلة",
      items: [
        {
          cmd: "!x  و  !!x",
          title: "علامة التعجب ! بتعكس (not)، و !! بتحوّل أي قيمة لـ true أو false",
          desc: R`[[!]] (not) بتقلب: [[!true]] بـ false. ولو حطيتها قبل أي قيمة مش boolean بتحوّلها الأول: القيم «الفاضية» (falsy) بتبقى true والباقي false.

القيم الـ falsy في JS ستة بس تقريبًا: [[false]] و [[0]] و [[""]] و [[null]] و [[undefined]] و [[NaN]]. أي حاجة تانية truthy، حتى [["0"]] و [[[]]] و [[{}]].

[[!!x]] يعني «اقلب مرتين»: النتيجة boolean حقيقي بيقول x فيها حاجة ولا لأ. في Python المقابل [[not x]] و [[bool(x)]]، وهناك [[[]]] و [[{}]] falsy عكس JS.`,
          example: R`const name = "";
console.log(!name);
console.log(!!"Ali", !!"0", !![], !!0);
if (!user) console.log("مفيش يوزر");
const isLoggedIn = !!token;`,
          flag: "script",
          try: R`في الـ Console جرّب [[!!" "]] (مسافة) و [[!!""]] و [[!!null]] و [[!!{}]]، وقبل ما تدوس Enter توقّع كل واحدة.`,
          deep: {
            why: R`[[if (!x)]] أقصر وأشهر طريقة تقول «لو مفيش». و [[!!]] بتحتاجها لما دالة لازم ترجّع true/false بالظبط مش القيمة نفسها.`,
            how: R`JS بتحوّل القيمة لـ boolean بقواعد ثابتة (ToBoolean) لما تقابل [[!]] أو if أو [[&&]] أو [[||]]. [[!]] بتحوّل وتقلب، والتانية بتقلب تاني فترجع للمعنى الأصلي بس كـ boolean.`,
            when: R`[[!]] في الشروط. و [[!!]] لما تخزّن أو ترجّع flag: [[isAdmin: !!user.role]].`,
            mistakes: R`تستخدم [[!count]] عشان تعرف «مفيش count» والقيمة ممكن تبقى 0 صحيحة: 0 falsy فهيتعامل كأنه مش موجود. استخدم [[count === undefined]] أو [[??]]. وتفتكر [[[]]] falsy زي Python.`
          },
          lines: [
            R`نص فاضي.`,
            R`[[!""]]: النص الفاضي falsy، فالعكس [[true]].`,
            R`[[true true true false]]: حتى [["0"]] والـ array الفاضي truthy.`,
            R`لو user فاضي أو null أو undefined.`,
            R`boolean حقيقي: فيه token ولا لأ.`
          ],
          sol: R`[[!!" "]] ← [[true]] (المسافة حرف). [[!!""]] ← [[false]]. [[!!null]] ← [[false]]. [[!!{}]] ← [[true]].`,
          check: {
            lang: "js",
            starter: R`// رجّع true لو فيه كلام حقيقي (مش فاضي ومش مسافات بس)، وغير كده false
// لازم ترجّع boolean مش النص نفسه
function hasText(s) {
  return s;
}`,
            tests: R`test("hasText('Ali') ← true", () => expect(hasText("Ali")).toBe(true));
test("hasText('') ← false", () => expect(hasText("")).toBe(false));
test("hasText('   ') ← false (مسافات بس)", () => expect(hasText("   ")).toBe(false));
test("hasText(undefined) ← false", () => expect(hasText(undefined)).toBe(false));
test("hasText(null) ← false", () => expect(hasText(null)).toBe(false));`,
            solution: R`function hasText(s) {
  return !!s && s.trim() !== "";
}`
          }
        },
        {
          cmd: "a && b  و  a || b",
          title: "&& و || في الكود: «و» و «أو»، وكمان بيرجّعوا قيمة: || لقيمة احتياطي، و && لشرط قبل التنفيذ",
          desc: R`[[a && b]] true لو الاتنين true. [[a || b]] true لو واحد على الأقل. ده المعنى المنطقي اللي في كل اللغات. وفي Python بالكلام: [[and]] و [[or]] و [[not]].

بس في JS (و Python) الرمزين بيرجّعوا واحدة من القيمتين نفسها مش true/false. [[||]] بترجّع أول قيمة truthy، فـ [[name || "ضيف"]] بتدي ضيف لو name فاضي. و [[&&]] بترجّع أول قيمة falsy أو آخر قيمة، فـ [[user && user.name]] مش هتوقع لو user فاضي.

وبيعملوا short-circuit: لو الطرف الشمال حسم النتيجة، اليمين مش بيتنفذ خالص. عشان كده [[isAdmin && deleteAll()]] الدالة مش هتشتغل غير لو admin. وفي React بتشوف [[{loading && <Spinner />}]].`,
          example: R`console.log(true && false, true || false);
const name = "";
console.log(name || "ضيف");
console.log(0 || 10, "" && "x");
if (age >= 18 && hasId) console.log("ادخل");
user && console.log(user.name);`,
          flag: "script",
          try: R`في الـ Console جرّب [[null || "a" || "b"]] و [["x" && 0 && "y"]] و [[0 || ""]]. بعدين حل التمرين.`,
          deep: {
            why: R`أي شرط فيه أكتر من حاجة محتاجهم. والقيمة الاحتياطية بـ [[||]] منتشرة جدًا في كود قديم، فلازم تفهم ليه ساعات بتغلط مع 0.`,
            how: R`JS بتقيّم الشمال الأول. [[||]]: لو truthy رجّعه ووقف، غير كده رجّع اليمين. [[&&]]: لو falsy رجّعه ووقف، غير كده رجّع اليمين. والأولوية: [[&&]] قبل [[||]]، فـ [[a || b && c]] هي [[a || (b && c)]].`,
            when: R`[[&&]] و [[||]] في الشروط. [[||]] لقيمة احتياطي لما الـ 0 والنص الفاضي مش قيم مقبولة. لو مقبولة، استخدم [[??]].`,
            mistakes: R`[[port || 3000]] والـ port صفر أو [[count || 10]] والعدد صفر: هيتبدل غصب عنك. وتكتب [[&]] أو [[|]] واحدة: دي bitwise ومبتعملش short-circuit. وتخلط الأولوية من غير أقواس.`
          },
          lines: [
            R`المعنى المنطقي: [[false true]].`,
            R`نص فاضي.`,
            R`[[||]] رجّعت أول قيمة truthy: [[ضيف]].`,
            R`[[0 || 10]] بـ 10، و [["" && "x"]] بـ [[""]] (وقفت عند أول falsy).`,
            R`شرطين لازم الاتنين يتحققوا.`,
            R`short-circuit: لو user فاضي، اليمين مش بيتنفذ ومفيش error.`
          ],
          sol: R`[[null || "a" || "b"]] ← [["a"]]. [["x" && 0 && "y"]] ← [[0]]. [[0 || ""]] ← [[""]] (مفيش truthy فرجّع آخر واحدة).`,
          check: {
            lang: "js",
            starter: R`// رجّع "أهلًا " والاسم، ولو الاسم فاضي أو مش موجود استخدم "ضيف"
function greet(name) {
  return "أهلًا " + name;
}`,
            tests: R`test("greet('Sara') ← أهلًا Sara", () => expect(greet("Sara")).toBe("أهلًا Sara"));
test("greet('') ← أهلًا ضيف", () => expect(greet("")).toBe("أهلًا ضيف"));
test("greet() ← أهلًا ضيف", () => expect(greet()).toBe("أهلًا ضيف"));
test("greet(null) ← أهلًا ضيف", () => expect(greet(null)).toBe("أهلًا ضيف"));`,
            solution: R`function greet(name) {
  return "أهلًا " + (name || "ضيف");
}`
          }
        },
        {
          cmd: "??  و  ??=",
          title: "علامتين استفهام ?? : قيمة احتياطي لو null أو undefined بس، والـ 0 والنص الفاضي بيفضلوا",
          desc: R`[[a ?? b]] (nullish coalescing) بترجّع [[a]] إلا لو كانت [[null]] أو [[undefined]]، ساعتها بترجّع [[b]]. الفرق عن [[||]]: الـ [[0]] و [[""]] و [[false]] قيم حقيقية بتفضل زي ما هي.

فـ [[volume || 50]] لو volume كانت 0 هتبقى 50 (غلط)، لكن [[volume ?? 50]] هتفضل 0 (صح).

و [[x ??= 5]] معناها «لو x فاضية (null أو undefined) حط فيها 5». وفي C# و PHP و Dart و Swift نفس الرمز [[??]] بنفس المعنى. وفي Kotlin المقابل [[?:]].`,
          example: R`const settings = { volume: 0, theme: null };
console.log(settings.volume || 50);
console.log(settings.volume ?? 50);
console.log(settings.theme ?? "light");
settings.lang ??= "ar";`,
          flag: "script",
          try: R`قارن في الـ Console [[0 || 5]] و [[0 ?? 5]] و [["" ?? "x"]] و [[undefined ?? "x"]]. وبعدين حل التمرين.`,
          deep: {
            why: R`الإعدادات والـ API responses مليانة قيم ممكن تبقى 0 أو false بشكل مقصود. [[??]] اتعملت مخصوص عشان تصلّح مشكلة [[||]] دي.`,
            how: R`بتبص على الشمال: لو [[null]] أو [[undefined]] تقيّم اليمين وترجّعه، غير كده ترجّع الشمال واليمين مش بيتنفذ. ومينفعش تخلطها مع [[||]] أو [[&&]] من غير أقواس، JS بترمي [[SyntaxError]].`,
            when: R`قيم افتراضية لأي إعداد أو رقم أو boolean ممكن يبقى 0 أو false. ومع [[?.]]: [[user?.name ?? "مجهول"]].`,
            mistakes: R`تكتب [[a || b ?? c]] من غير أقواس فيطلع SyntaxError. وتستخدم [[||]] مع أرقام ممكن تبقى 0. وتفتكر [[??]] بتمسك النص الفاضي: لأ، [[""]] مش nullish.`
          },
          lines: [
            R`إعدادات فيها volume صفر (مقصود) و theme فاضي.`,
            R`[[||]] شالت الـ 0 وحطت 50: غلط.`,
            R`[[??]] سابت الـ 0 لأنه مش null: صح.`,
            R`theme بـ null، فطلع [[light]].`,
            R`lang مش موجودة، فـ [[??=]] حطت فيها [["ar"]].`
          ],
          sol: R`[[0 || 5]] ← [[5]]. [[0 ?? 5]] ← [[0]]. [["" ?? "x"]] ← [[""]]. [[undefined ?? "x"]] ← [["x"]].`,
          check: {
            lang: "js",
            starter: R`// رجّع الـ volume من الإعدادات، ولو مش موجود (null أو undefined) رجّع 50
// خد بالك: 0 قيمة صحيحة (صامت)
function getVolume(settings) {
  return settings.volume || 50;
}`,
            tests: R`test("volume 80 ← 80", () => expect(getVolume({ volume: 80 })).toBe(80));
test("volume 0 ← 0 مش 50", () => expect(getVolume({ volume: 0 })).toBe(0));
test("من غير volume ← 50", () => expect(getVolume({})).toBe(50));
test("volume null ← 50", () => expect(getVolume({ volume: null })).toBe(50));`,
            solution: R`function getVolume(settings) {
  return settings.volume ?? 50;
}`
          }
        },
        {
          cmd: "?.",
          title: "علامة استفهام ونقطة ?. : ادخل جوه الـ object لو موجود، ولو مش موجود رجّع undefined من غير error",
          desc: R`[[user.address.city]] لو [[address]] مش موجودة بترمي [[TypeError: Cannot read properties of undefined]] والبرنامج يقع. [[user?.address?.city]] (optional chaining) بتقول «لو اللي قبلي null أو undefined، وقف ورجّع undefined».

بتشتغل مع الـ properties ([[a?.b]]) والـ arrays ([[arr?.[0]]]) والدوال ([[obj.save?.()]]: نادي save بس لو موجودة).

غالبًا بتيجي مع [[??]]: [[user?.name ?? "مجهول"]]. وفي Kotlin و Swift و C# و Dart نفس الرمز [[?.]] بنفس الفكرة.`,
          example: R`const user = { name: "Ali", address: null };
console.log(user.address?.city);
console.log(user.address?.city ?? "غير معروف");
console.log(user.orders?.[0]);
user.onLogin?.();`,
          flag: "script",
          try: R`في الـ Console اعمل [[const u = {}]] وجرّب [[u.a.b]] واقرا الـ error، بعدين [[u.a?.b]] و [[u.a?.b.c.d]].`,
          deep: {
            why: R`الداتا اللي جاية من API أو من form ناقصة كتير. من غير [[?.]] كنت محتاج [[user && user.address && user.address.city]].`,
            how: R`لو الجزء اللي قبل [[?.]] null أو undefined، الـ expression كله من هنا للآخر بيقف ويرجّع undefined (short-circuit). فـ [[u.a?.b.c.d]] مش بتقع رغم إن بعد [[?.]] فيه نقط عادية.`,
            when: R`مع أي داتا جاية من برة ومش مضمونة. لكن متحطهاش في كل حتة: لو الحاجة لازم تبقى موجودة، خلّي الكود يقع بوضوح أحسن من إنه يكمّل بـ undefined.`,
            mistakes: R`تكتب [[arr?[0]]] من غير نقطة، الصح [[arr?.[0]]]. وتستخدمها على الشمال في assignment: [[user?.name = "x"]] SyntaxError. وتحطها في كل مكان فتخبّي bugs.`
          },
          lines: [
            R`address بـ null.`,
            R`بدل ما يقع، طلع [[undefined]].`,
            R`مع [[??]] قيمة احتياطي: [[غير معروف]].`,
            R`[[?.[0]]] مع array مش موجودة: [[undefined]].`,
            R`نادي الدالة لو موجودة بس، وهنا مش موجودة فمفيش حاجة حصلت.`
          ],
          sol: R`[[u.a.b]] ← [[TypeError: Cannot read properties of undefined (reading 'b')]]. [[u.a?.b]] ← [[undefined]]. [[u.a?.b.c.d]] ← [[undefined]] برضه، لأن السلسلة وقفت عند أول [[?.]].`,
          check: {
            lang: "js",
            starter: R`// رجّع مدينة اليوزر، ولو أي حاجة في السكة مش موجودة رجّع "غير معروف"
function getCity(user) {
  return user.address.city;
}`,
            tests: R`test("يوزر كامل ← Cairo", () => expect(getCity({ address: { city: "Cairo" } })).toBe("Cairo"));
test("من غير address ← غير معروف", () => expect(getCity({})).toBe("غير معروف"));
test("address فاضي ← غير معروف", () => expect(getCity({ address: {} })).toBe("غير معروف"));
test("user بـ null ← غير معروف", () => expect(getCity(null)).toBe("غير معروف"));`,
            solution: R`function getCity(user) {
  return user?.address?.city ?? "غير معروف";
}`
          }
        },
        {
          cmd: "? :",
          title: "الـ ternary  شرط ? قيمة : قيمة : if/else في سطر بترجّع قيمة",
          desc: R`[[cond ? a : b]] معناها «لو الشرط true خد a، غير كده خد b». ده الـ ternary operator (الوحيد اللي بياخد ٣ حاجات). [[age >= 18 ? "بالغ" : "قاصر"]].

الفرق عن if: الـ ternary expression بيرجّع قيمة، فتقدر تحطه في متغير أو return أو جوه نص أو جوه JSX في React. الـ if جملة (statement) مبترجّعش حاجة.

نفس الرمز في C و Java و C# و PHP و Dart. في Python الشكل مختلف: [[a if cond else b]]. وفي Kotlin مفيش ternary، [[if]] نفسها بترجّع قيمة.`,
          example: R`const age = 20;
const label = age >= 18 ? "بالغ" : "قاصر";
console.log($__btعندك $__{n} $__{n === 1 ? "رسالة" : "رسايل"}$__bt);
const fee = age < 12 ? 50 : age >= 60 ? 70 : 100;
return isLoading ? "جاري التحميل" : data;`,
          flag: "script",
          try: R`اكتب في الـ Console [[const n = 7]] وبعدين [[n % 2 === 0 ? "زوجي" : "فردي"]]. وبعدين حل التمرين.`,
          deep: {
            why: R`بيختصر ٥ سطور if/else لسطر لما كل اللي عايزه قيمة من اتنين. وفي React مفيش if جوه JSX، فالـ ternary هو الطريقة.`,
            how: R`بيقيّم الشرط، وبعدين يقيّم فرع واحد بس ويرجّعه. الأولوية بتاعته واطية، فـ [[a + b ? x : y]] معناها [[(a + b) ? x : y]]. والمتداخل بيتقري من اليمين: [[a ? x : b ? y : z]].`,
            when: R`اختيار قيمة من اتنين. لو فيه أكتر من ٢ أو ٣ حالات أو فيه أوامر مش قيم، if/else أو switch أوضح.`,
            mistakes: R`تداخل ternary جوه ternary جوه ternary لحد ما محدش يفهم. وتستخدمه عشان تشغّل دوال: [[ok ? save() : log()]] شغالة بس if أوضح. وتنسى إن الـ [[:]] إجبارية.`
          },
          lines: [
            R`عمر.`,
            R`لو 18 أو أكتر [[بالغ]]، غير كده [[قاصر]].`,
            R`ternary جوه template literal عشان المفرد والجمع.`,
            R`متداخل: أقل من 12 بـ 50، و 60 أو أكتر بـ 70، والباقي 100.`,
            R`في return: رجّع رسالة أو الداتا حسب الحالة.`
          ],
          sol: R`[[n % 2 === 0 ? "زوجي" : "فردي"]] مع 7 ← [["فردي"]].`,
          check: {
            lang: "js",
            starter: R`// سعر التذكرة: أقل من 12 سنة 50، و 60 أو أكتر 70، والباقي 100
// اكتبها بـ ternary في سطر return واحد
function ticketPrice(age) {
}`,
            tests: R`test("ticketPrice(8) ← 50", () => expect(ticketPrice(8)).toBe(50));
test("ticketPrice(30) ← 100", () => expect(ticketPrice(30)).toBe(100));
test("ticketPrice(65) ← 70", () => expect(ticketPrice(65)).toBe(70));
test("الحدود: ticketPrice(12) ← 100 و ticketPrice(60) ← 70", () => expect([ticketPrice(12), ticketPrice(60)]).toEqual([100, 70]));`,
            solution: R`function ticketPrice(age) {
  return age < 12 ? 50 : age >= 60 ? 70 : 100;
}`
          }
        }
      ]
    },
    {
      t: "الأقواس بأنواعها",
      l: 2,
      n: "( ) و [ ] و { } والـ backtick: كل نوع أقواس ليه أكتر من معنى حسب مكانه",
      items: [
        {
          cmd: "f()  و  (a + b)",
          title: "الأقواس العادية ( ): نداء دالة، وترتيب الحساب، وparameters الدالة، وشرط if",
          desc: R`الأقواس العادية (parentheses) ليها ٤ استخدامات: بعد اسم دالة بتناديها [[greet("Ali")]]. حوالين حساب بتحدد الترتيب [[(2 + 3) * 4]]. وقت تعريف الدالة بتحط فيها الـ parameters [[function add(a, b)]]. وفي [[if (...)]] و [[while (...)]] حوالين الشرط (إجبارية في JS و C و Java، ومش موجودة في Python و Go).

أهم فرق: [[greet]] من غير أقواس هي الدالة نفسها (زي الوصفة)، و [[greet()]] هي ناتج تشغيلها (الأكلة). فـ [[button.onclick = greet]] صح، و [[button.onclick = greet()]] بتشغّلها حالًا وتحط ناتجها.`,
          example: R`function add(a, b) { return a + b; }
console.log(add(2, 3));
console.log(2 + 3 * 4, (2 + 3) * 4);
setTimeout(sayHi, 1000);
const now = (new Date()).getFullYear();`,
          flag: "script",
          try: R`في الـ Console عرّف [[function hi() { return "hi"; }]] واكتب [[hi]] من غير أقواس ثم [[hi()]] وقارن الناتجين.`,
          deep: {
            why: R`نسيان الأقواس أو زيادتها بيطلع bugs محيرة: دالة متنفذتش، أو اتنفذت بدري، أو متغير فيه نص الدالة بدل نتيجتها.`,
            how: R`[[()]] بعد أي expression بيقيّمه كدالة ويناديها. الأقواس حوالين حساب مجرد تجميع (grouping) بتعلّي الأولوية. والـ parser بيفرّق بالمكان: بعد اسم يبقى نداء، لوحدها يبقى تجميع.`,
            when: R`أقواس التجميع حطها حتى لو مش لازمة لو بتوضّح، زي [[(a && b) || c]].`,
            mistakes: R`[[addEventListener("click", handle())]] بتشغّل handle مرة واحدة دلوقتي. الصح [[handle]] أو [[() => handle(id)]]. وفي Python [[print "hi"]] من غير أقواس دي صيغة Python 2 وبتطلع SyntaxError في 3.`
          },
          lines: [
            R`أقواس الـ parameters وقت التعريف.`,
            R`أقواس النداء: شغّل add بـ 2 و 3، فـ [[5]].`,
            R`من غير أقواس الضرب الأول [[14]]، ومع الأقواس [[20]].`,
            R`[[sayHi]] من غير أقواس: بنسلّم الدالة نفسها لـ setTimeout تشغّلها بعد ثانية.`,
            R`أقواس تجميع حوالين [[new Date()]] وبعدين نادي دالة على الناتج.`
          ],
          sol: R`[[hi]] ← بيطبع الدالة نفسها [[ƒ hi() { return "hi"; }]]. [[hi()]] ← [["hi"]].`
        },
        {
          cmd: "arr[0]  و  [a, b]",
          title: "الأقواس المربعة [ ] في الكود: تعمل array، وتجيب عنصر برقمه، وتفك array لمتغيرات",
          desc: R`[[[1, 2, 3]]] بتعمل array (قايمة). و [[arr[0]]] بتجيب أول عنصر (العد بيبدأ من 0)، و [[arr[arr.length - 1]]] آخر عنصر، أو [[arr.at(-1)]].

و [[obj["key"]]] بتجيب property من object بالاسم، ودي اللي بتستخدمها لما الاسم في متغير: [[obj[field]]].

ولما تيجي على شمال [[=]] بتبقى destructuring: [[const [first, second] = arr]] بتحط أول عنصرين في متغيرين. و [[[a, b] = [b, a]]] بتبدّل قيمتين. نفس الأقواس في Python lists و [[arr[0]]] برضه، و [[arr[-1]]] هناك آخر عنصر.`,
          example: R`const nums = [10, 20, 30];
console.log(nums[0], nums[nums.length - 1]);
const [first, , third] = nums;
const [head, ...tail] = nums;
let a = 1, b = 2;
[a, b] = [b, a];`,
          flag: "script",
          try: R`في الـ Console: [[const arr = ["a", "b", "c"]]] وبعدين [[arr[3]]] و [[arr[-1]]] و [[arr.at(-1)]]. لاحظ إن [[arr[-1]]] مش زي Python.`,
          deep: {
            why: R`الـ arrays في كل برنامج. والـ destructuring بقى في كل كود حديث: [[const [count, setCount] = useState(0)]] في React مثلًا.`,
            how: R`الـ array في JS object خاص مفاتيحه أرقام. [[arr[5]]] لعنصر مش موجود بترجّع undefined من غير error. و [[arr[-1]]] بتدوّر على مفتاح اسمه [["-1"]] فبترجّع undefined.`,
            when: R`[[arr[i]]] جوه loops. [[obj[key]]] لما الاسم متغير أو فيه مسافات أو شرطة. والـ destructuring لما دالة بترجّع أكتر من قيمة في array.`,
            mistakes: R`تبدأ العد من 1. وتستخدم [[arr[arr.length]]] وانت قصدك آخر عنصر (ده بعد الآخر). وتكتب [[arr[-1]]] زي Python. وتنسى [[;]] قبل سطر بيبدأ بـ [[[]] لو مش بتحط semicolons، فـ JS تلزّقه في السطر اللي فوقه.`
          },
          lines: [
            R`array فيها ٣ أرقام.`,
            R`أول عنصر رقمه 0، وآخر عنصر رقمه الطول ناقص 1: [[10 30]].`,
            R`destructuring: الفصلة الفاضية بتتخطّى العنصر التاني، فـ first بـ 10 و third بـ 30.`,
            R`[[...tail]] بتلم الباقي: head بـ 10 و tail بـ [[[20, 30]]].`,
            R`متغيرين.`,
            R`تبديل القيمتين في سطر واحد من غير متغير مؤقت.`
          ],
          sol: R`[[arr[3]]] ← [[undefined]] (مفيش عنصر رابع). [[arr[-1]]] ← [[undefined]]. [[arr.at(-1)]] ← [["c"]].`,
          check: {
            lang: "js",
            starter: R`// رجّع array فيها أول عنصر وآخر عنصر: firstAndLast([1, 2, 3]) ← [1, 3]
function firstAndLast(arr) {
  return [arr[1], arr[arr.length]];
}`,
            tests: R`test("firstAndLast([1, 2, 3]) ← [1, 3]", () => expect(firstAndLast([1, 2, 3])).toEqual([1, 3]));
test("firstAndLast(['a', 'b']) ← ['a', 'b']", () => expect(firstAndLast(["a", "b"])).toEqual(["a", "b"]));
test("عنصر واحد: firstAndLast([7]) ← [7, 7]", () => expect(firstAndLast([7])).toEqual([7, 7]));`,
            solution: R`function firstAndLast(arr) {
  const [first] = arr;
  return [first, arr[arr.length - 1]];
}`
          }
        },
        {
          cmd: "{ }",
          title: "الأقواس المعووجة { } في الكود: بلوك كود، أو object، أو تفك object لمتغيرات",
          desc: R`الأقواس المعووجة (curly braces) ليها ٣ معاني كبار في JS، والمكان هو اللي بيحدد:

بعد [[if]] أو [[for]] أو [[function]]: بلوك (block) فيه سطور كود. [[if (ok) { ... }]]. ونفس الحكاية في C و Java و Go و PHP. Python مبتستخدمهاش للبلوك خالص، بتستخدم المسافات.

لما تيجي مكان قيمة: object فيه مفاتيح وقيم [[{ name: "Ali", age: 20 }]]. وفي Python ده dict، و [[{1, 2}]] من غير [[:]] هناك set.

وعلى شمال [[=]] أو في parameters الدالة: destructuring. [[const { name, age } = user]] بتطلّع خانتين في متغيرين بنفس الاسم. و [[{ name = "ضيف" }]] قيمة افتراضية، و [[{ name: userName }]] اسم جديد.`,
          example: R`const user = { name: "Ali", age: 20 };
const { name, age } = user;
const { city = "Cairo" } = user;
function show({ name, age }) { return name + " " + age; }
const short = { name, age };
if (age > 18) { console.log("ok"); }`,
          flag: "script",
          try: R`في الـ Console: [[const { a, b = 5, ...rest } = { a: 1, c: 3, d: 4 }]] وبعدين اطبع [[a]] و [[b]] و [[rest]]. وبعدين حل التمرين.`,
          deep: {
            why: R`الـ objects هي الطريقة اللي بتشيل بيها داتا في JS، و JSON نفس الشكل. والـ destructuring في كل كود React و Node: [[function Card({ title })]] و [[const { data } = await axios.get(...)]].`,
            how: R`الـ parser بيحدد المعنى من المكان: لو مستني statement يبقى بلوك، لو مستني قيمة يبقى object، لو على شمال [[=]] يبقى pattern. و [[{ name, age }]] لوحدها في object هي اختصار [[{ name: name, age: age }]].`,
            when: R`بلوكات في كل if و loop (حتى لو سطر واحد، عشان الأمان). objects لأي داتا ليها خانات. destructuring لما تحتاج خانتين تلاتة من object كبير.`,
            mistakes: R`ترجّع object من arrow function من غير أقواس عادية: [[() => { a: 1 }]] بتترجّع undefined لأن JS فهمتها بلوك، الصح [[() => ({ a: 1 })]]. وتعمل destructuring من undefined فتقع: [[const { a } = undefined]] بترمي TypeError.`
          },
          lines: [
            R`object فيه خانتين.`,
            R`destructuring: name بـ [["Ali"]] و age بـ [[20]].`,
            R`قيمة افتراضية لأن city مش موجودة في user، فـ [["Cairo"]].`,
            R`destructuring جوه parameters الدالة نفسها.`,
            R`الاختصار: نفس [[{ name: name, age: age }]].`,
            R`بلوك كود بعد if.`
          ],
          sol: R`[[a]] ← [[1]]، [[b]] ← [[5]] (الافتراضية، لأن b مش موجودة)، [[rest]] ← [[{ c: 3, d: 4 }]].`,
          check: {
            lang: "js",
            starter: R`// استخدم destructuring في الـ parameters
// describe({ name: "Ali", age: 20 }) ← "Ali (20)"
// ولو مفيش age: describe({ name: "Sara" }) ← "Sara (?)"
function describe(user) {
}`,
            tests: R`test("describe({ name: 'Ali', age: 20 }) ← Ali (20)", () => expect(describe({ name: "Ali", age: 20 })).toBe("Ali (20)"));
test("من غير age ← Sara (?)", () => expect(describe({ name: "Sara" })).toBe("Sara (?)"));
test("age صفر ← Baby (0)", () => expect(describe({ name: "Baby", age: 0 })).toBe("Baby (0)"));`,
            solution: R`function describe({ name, age = "?" }) {
  return $__bt$__{name} ($__{age})$__bt;
}`
          }
        },
        {
          cmd: "$__bt$__{x}$__bt",
          title: "الـ backtick والـ ${ }: نص تحط جواه متغيرات وحسابات وكذا سطر (template literal)",
          desc: R`في JS فيه ٣ أنواع تنصيص: [["..."]] و [['...']] (نفس الحاجة)، والـ backtick (الزرار اللي تحت Esc). الأخير اسمه template literal، وجواه تقدر تكتب [[$__{...}]] وأي حاجة جوه الأقواس بتتحسب وتتحط مكانها.

فبدل [["أهلًا " + name + "، عندك " + n + " رسالة"]] تكتب $__btأهلًا $__{name}، عندك $__{n} رسالة$__bt. وكمان بيكمّل على كذا سطر عادي من غير [[\n]].

نفس الفكرة في لغات تانية بشكل مختلف: Python [[f"Hi {name}"]]، و Kotlin و Dart [["Hi $name"]] و [["$__{a + b}"]]، و C# [[$"Hi {name}"]]، و PHP [["Hi $name"]]. وفي bash الـ backtick معناه تاني خالص (تشغيل أمر).`,
          example: R`const name = "Sara", n = 3;
console.log($__btأهلًا $__{name}، عندك $__{n} رسايل$__bt);
console.log($__btالإجمالي: $__{n * 50} جنيه$__bt);
const html = $__bt<li class="$__{n > 0 ? "new" : ""}">$__{name}</li>$__bt;
console.log("Hi $__{name}");`,
          flag: "script",
          try: R`في الـ Console جرّب نفس الجملة مرة بـ [["..."]] ومرة بالـ backtick: [["Hi $__{1 + 1}"]] وبعدين نفس الكلام بين backticks. وبعدين حل التمرين.`,
          deep: {
            why: R`بناء النصوص من متغيرات أكتر حاجة بتعملها: رسايل وروابط API و HTML. والـ [[+]] بين النصوص بتطلع كود صعب يتقري وسهل تنسى فيه مسافة.`,
            how: R`JS بتقيّم كل [[$__{}]] وتحوّل الناتج لنص وتلزّقه. أي expression شغال جواها: نداء دالة وternary وحساب، لكن مش statement زي if.`,
            when: R`أي نص فيه متغيرات أو أكتر من سطر. والنصوص الثابتة عادي تفضل [["..."]].`,
            mistakes: R`تكتب [[$__{name}]] جوه [["..."]] عادية فتتطبع زي ما هي (السطر الأخير في المثال). وتستخدم [[']] (علامة التنصيص) بدل الـ backtick لأنهم قريبين في الشكل. وتبني SQL أو HTML من input اليوزر بالطريقة دي: ده باب لـ SQL injection و XSS.`
          },
          lines: [
            R`متغيرين.`,
            R`المتغيرات اتحطت جوه النص: [[أهلًا Sara، عندك 3 رسايل]].`,
            R`حساب جوه [[$__{}]]: [[الإجمالي: 150 جنيه]].`,
            R`HTML فيه ternary جوه [[$__{}]].`,
            R`غلط: [["..."]] عادية، فهتطبع [[$__{name}]] حرفيًا.`
          ],
          sol: R`[["Hi $__{1 + 1}"]] ← [[Hi $__{1 + 1}]] زي ما هي. وبالـ backtick ← [[Hi 2]].`,
          check: {
            lang: "js",
            starter: R`// receipt("Ali", 3, 50) ← "Ali: 3 × 50 = 150 جنيه"
// استخدم template literal
function receipt(name, qty, price) {
  return name + ": " + qty + " × " + price;
}`,
            tests: R`test("receipt('Ali', 3, 50)", () => expect(receipt("Ali", 3, 50)).toBe("Ali: 3 × 50 = 150 جنيه"));
test("receipt('Sara', 1, 99)", () => expect(receipt("Sara", 1, 99)).toBe("Sara: 1 × 99 = 99 جنيه"));`,
            solution: R`function receipt(name, qty, price) {
  return $__bt$__{name}: $__{qty} × $__{price} = $__{qty * price} جنيه$__bt;
}`
          }
        }
      ]
    },
    {
      t: "الأسهم والنقط والفواصل",
      l: 2,
      n: "=> و ... و . و ; و // : رموز صغيرة بتغيّر معنى السطر كله",
      items: [
        {
          cmd: "=>",
          title: "السهم => : طريقة مختصرة تكتب بيها دالة (arrow function)",
          desc: R`[[(a, b) => a + b]] دالة بتاخد a و b وترجّع مجموعهم. الشمال الـ parameters، واليمين اللي بترجّعه. ده نفس [[function (a, b) { return a + b; }]] بس أقصر.

لو parameter واحد ممكن تشيل الأقواس: [[x => x * 2]]. لو مفيش: [[() => 42]]. لو الجسم أكتر من سطر حط [[{ }]] واكتب [[return]] بنفسك. ولو بترجّع object حطه بين أقواس: [[() => ({ ok: true })]].

الفرق المهم عن function: الـ arrow مالهاش [[this]] بتاعها، بتاخده من المكان اللي اتكتبت فيه. ونفس الرمز [[=>]] في C# و Dart و Scala، وفي PHP [[fn($x) => $x * 2]]، أما Java و Kotlin بيستخدموا [[->]].`,
          example: R`const double = x => x * 2;
const add = (a, b) => a + b;
const hello = () => "hello";
const toUser = name => ({ name, active: true });
[1, 2, 3].map(n => n * n);
const sum = (arr) => {
  let s = 0;
  for (const n of arr) s += n;
  return s;
};`,
          flag: "script",
          try: R`في الـ Console جرّب [[(() => { a: 1 })()]] و [[(() => ({ a: 1 }))()]] وقارن. وبعدين حل التمرين.`,
          deep: {
            why: R`الـ arrows في كل كود JS حديث: [[map]] و [[filter]] و [[then]] و React event handlers. لازم تقراها بسرعة.`,
            how: R`لو اليمين expression من غير [[{]] بيترجّع لوحده (implicit return). لو فيه [[{]] بيبقى بلوك عادي ومحتاج [[return]]. وبتمسك [[this]] و [[arguments]] من الدالة اللي حواليها، عشان كده مش بتنفع كـ method في object لو محتاج this.`,
            when: R`الـ callbacks وأي دالة صغيرة. للـ methods في objects اللي بتستخدم this، أو constructors، استخدم function أو class.`,
            mistakes: R`[[x => { x * 2 }]] بترجّع undefined لأنك فتحت بلوك ومكتبتش return. و [[() => { a: 1 }]] نفس المشكلة. وتكتب [[=>]] بدل [[>=]] في شرط. وتعمل method كـ arrow وتستخدم this جواها.`
          },
          lines: [
            R`parameter واحد من غير أقواس، وبترجّع الضعف.`,
            R`parameterين لازم أقواس.`,
            R`من غير parameters: أقواس فاضية.`,
            R`بترجّع object، فلازم أقواس عادية حواليه.`,
            R`arrow كـ callback لـ map: [[[1, 4, 9]]].`,
            R`جسم كذا سطر: [[{ }]] و [[return]] صريحة.`,
            R`متغير للمجموع.`,
            R`loop بتجمع.`,
            R`return صريحة لأن فيه بلوك.`,
            R`قفلة البلوك و [[;]] بتاعة الـ const.`
          ],
          sol: R`الأولى ← [[undefined]] (اتفهمت بلوك فيه label اسمه a). التانية ← [[{ a: 1 }]].`,
          check: {
            lang: "js",
            starter: R`// اكتب الاتنين arrow functions
// toUser("Ali") ← { name: "Ali", active: true }
// squares([1, 2, 3]) ← [1, 4, 9]
const toUser = name => { name: name, active: true };
const squares = nums => {
  nums.map(n => n * n);
};`,
            tests: R`test("toUser('Ali') ← { name: 'Ali', active: true }", () => expect(toUser("Ali")).toEqual({ name: "Ali", active: true }));
test("squares([1, 2, 3]) ← [1, 4, 9]", () => expect(squares([1, 2, 3])).toEqual([1, 4, 9]));
test("squares([]) ← []", () => expect(squares([])).toEqual([]));`,
            solution: R`const toUser = name => ({ name, active: true });
const squares = nums => nums.map(n => n * n);`
          }
        },
        {
          cmd: "...",
          title: "التلات نقط ... : تفرد array أو object جوه واحد تاني (spread)، أو تلم الباقي (rest)",
          desc: R`[[...]] ليها معنيين عكس بعض. spread (فرد): [[[...a, 4]]] بتحط كل عناصر a في array جديدة، و [[{ ...user, age: 21 }]] نسخة من object مع تعديل، و [[Math.max(...nums)]] بتبعت العناصر كـ arguments منفصلة.

rest (لمّ): في parameters الدالة [[function sum(...nums)]] بتلم كل الـ arguments في array. وفي الـ destructuring [[const { id, ...rest } = obj]] بتلم الباقي.

القاعدة: لو [[...]] على اليمين أو في نداء، بتفرد. لو على الشمال أو في تعريف، بتلم. في Python المقابل [[*]] و [[**]]. وفي Go [[...]] برضه للـ variadic.`,
          example: R`const a = [1, 2, 3];
const b = [...a, 4];
const user = { name: "Ali", age: 20 };
const older = { ...user, age: 21 };
console.log(Math.max(...a));
function sum(...nums) { return nums.reduce((s, n) => s + n, 0); }
const { name, ...others } = user;`,
          flag: "script",
          try: R`اعمل [[const x = [1, 2]; const y = x; const z = [...x];]] وبعدين [[x.push(3)]] واطبع [[y]] و [[z]]. لاحظ مين اتأثر. وبعدين حل التمرين.`,
          deep: {
            why: R`في React و Redux ممنوع تعدّل الـ state مباشرة، فكل تحديث بيتكتب بـ spread: [[setUser({ ...user, name })]]. ده أكتر رمز هتشوفه في الكود الحديث.`,
            how: R`الـ spread بيعمل نسخة سطحية (shallow copy): العناصر نفسها لو objects بتفضل نفس المرجع. ولو فيه مفتاح متكرر، اللي بعده بيكسب، عشان كده [[{ ...user, age: 21 }]] بتغيّر age.`,
            when: R`نسخ arrays و objects من غير ما تعدّل الأصل، ودمجهم، ودوال بعدد arguments مش ثابت.`,
            mistakes: R`تفتكر الـ spread نسخة عميقة: [[{ ...user }.address.city = "x"]] بيغيّر الأصل. وتكتب [[{ age: 21, ...user }]] بالعكس فالقديم يكسب. والـ rest لازم يبقى آخر حاجة: [[(...a, b)]] SyntaxError.`
          },
          lines: [
            R`array أصلية.`,
            R`spread: array جديدة [[[1, 2, 3, 4]]] و a زي ما هي.`,
            R`object.`,
            R`نسخة من user والـ age اتغيرت، و user الأصلي لسه 20.`,
            R`فرد العناصر كـ arguments: [[Math.max(1, 2, 3)]] يعني 3.`,
            R`rest في الـ parameters: كل الـ arguments في array اسمها nums.`,
            R`rest في الـ destructuring: others بـ [[{ age: 20 }]].`
          ],
          sol: R`[[y]] ← [[[1, 2, 3]]] لأنها نفس الـ array (مرجع واحد). [[z]] ← [[[1, 2]]] لأنها نسخة اتعملت قبل الـ push.`,
          check: {
            lang: "js",
            starter: R`// addItem: رجّع array جديدة فيها العنصر في الآخر، من غير ما تغيّر الأصلية
// updateAge: رجّع object جديد بنفس الخانات والـ age الجديد، من غير ما تغيّر الأصلي
function addItem(cart, item) {
  cart.push(item);
  return cart;
}
function updateAge(user, age) {
  user.age = age;
  return user;
}`,
            tests: R`test("addItem(['a'], 'b') ← ['a', 'b']", () => expect(addItem(["a"], "b")).toEqual(["a", "b"]));
test("addItem مبتغيّرش الأصلية", () => { const c = ["a"]; addItem(c, "b"); expect(c).toEqual(["a"]); });
test("updateAge بيغيّر الـ age", () => expect(updateAge({ name: "Ali", age: 20 }, 21)).toEqual({ name: "Ali", age: 21 }));
test("updateAge مبتغيّرش الأصلي", () => { const u = { name: "Ali", age: 20 }; updateAge(u, 21); expect(u.age).toBe(20); });`,
            solution: R`function addItem(cart, item) {
  return [...cart, item];
}
function updateAge(user, age) {
  return { ...user, age };
}`
          }
        },
        {
          cmd: "obj.key  و  obj[key]",
          title: "النقطة . بتدخل جوه object وتجيب خانة أو تنادي method، والأقواس المربعة لما الاسم في متغير",
          desc: R`النقطة (dot) بين اسمين معناها «اللي جوه»: [[user.name]] خانة name جوه user. و [["ali".toUpperCase()]] نادي method على النص. و [[console.log]] دالة log جوه object اسمه console. والسلسلة [[a.b.c]] بتدخل خطوة خطوة.

[[obj.key]] بتدوّر على خانة اسمها حرفيًا key. لو الاسم في متغير لازم [[obj[key]]]. ولو الاسم فيه مسافة أو شرطة: [[headers["content-type"]]].

النقطة في كل اللغات تقريبًا بنفس المعنى (Python و Java و C# و Go و Kotlin). الاستثناءات: C و C++ بيستخدموا [[->]] مع المؤشرات، و PHP بيستخدم [[->]] للـ objects والنقطة عنده لدمج النصوص.`,
          example: R`const user = { name: "Ali", "last-name": "Hassan" };
console.log(user.name);
const field = "name";
console.log(user[field], user.field);
console.log(user["last-name"]);
console.log("hello".toUpperCase().split(""));`,
          flag: "script",
          try: R`في الـ Console: [[const k = "x"; const o = { x: 1, k: 2 };]] وبعدين [[o.k]] و [[o[k]]]. توقّع قبل ما تدوس Enter.`,
          deep: {
            why: R`كل حاجة في JS objects، فالنقطة في كل سطر. والفرق بين [[obj.key]] و [[obj[key]]] سبب bug مشهور: الكود بيدوّر على خانة اسمها حرفيًا key.`,
            how: R`[[obj.name]] اختصار لـ [[obj["name"]]]. الأقواس بتقيّم اللي جواها الأول. ولو الخانة مش موجودة بترجّع undefined، بس لو obj نفسه undefined بترمي TypeError (وهنا [[?.]] بتساعد).`,
            when: R`النقطة للأسماء الثابتة اللي انت عارفها. الأقواس للأسماء الديناميكية (من متغير أو loop) أو اللي فيها رموز.`,
            mistakes: R`[[user.field]] وانت قصدك [[user[field]]]. وتكتب [[user."last-name"]] SyntaxError. وتنسى إن الأرقام: [[5.toString()]] SyntaxError عشان النقطة اتفهمت كسر عشري، اكتبها [[(5).toString()]].`
          },
          lines: [
            R`object فيه خانة اسمها فيه شرطة.`,
            R`النقطة: خانة name، فـ [[Ali]].`,
            R`اسم الخانة في متغير.`,
            R`[[user[field]]] بـ [[Ali]]، لكن [[user.field]] بـ [[undefined]] (دوّرت على خانة اسمها field).`,
            R`اسم فيه شرطة لازم أقواس ونص.`,
            R`سلسلة نقط: كبّر الحروف وبعدين قسّم: [[["H","E","L","L","O"]]].`
          ],
          sol: R`[[o.k]] ← [[2]] (خانة اسمها k). [[o[k]]] ← [[1]] (k متغير قيمته "x").`
        },
        {
          cmd: "; في آخر السطر",
          title: "الفاصلة المنقوطة ; في الكود: بتقفل الجملة في JS و C و Java، وفي JS بتتحط لوحدها ساعات",
          desc: R`في C و C++ و Java و C# و PHP و Rust، [[;]] إجبارية في آخر كل جملة، ونسيانها error. في Python و Go و Kotlin و Swift مش بتكتبها (Go بيحطها لوحده). في JS هي «اختيارية»: لو نسيتها JS بتحاول تحطها لوحدها (ASI).

المشكلة في JS في حالتين: [[return]] وبعدها سطر جديد، JS بتحط [[;]] بعد return فالدالة ترجّع undefined. وسطر بيبدأ بـ [[(]] أو [[[]] أو backtick، JS بتلزّقه في السطر اللي فوقه.

الحل: يا إما تحط [[;]] دايمًا، يا إما تستخدم Prettier ومتفكرش. وفي [[for (let i = 0; i < 5; i++)]] الـ [[;]] بتفصل الأجزاء التلاتة وإجبارية.`,
          example: R`let total = 10;
for (let i = 0; i < 3; i++) total += i;
function bad() {
  return
    { ok: true };
}
console.log(bad());`,
          flag: "script",
          try: R`انسخ دالة [[bad]] في الـ Console وشغّلها. بعدين اكتب [[{ ok: true }]] في نفس سطر الـ return وشغّلها تاني.`,
          deep: {
            why: R`في لغات زي Java و C أول error هتشوفه [[expected ';']]. وفي JS الـ bug بتاع [[return]] صامت ومحيّر.`,
            how: R`ASI (Automatic Semicolon Insertion) قواعد في JS: لما السطر الجديد ميكمّلش اللي قبله بشكل صحيح، أو بعد return و break و continue على طول، بتتحط [[;]]. لكن لو السطر الجديد ممكن يكمّل اللي قبله (زي [[(]])، مبتتحطش.`,
            when: R`اتبع style المشروع. أغلب المشاريع بتحطها، ومشاريع تانية (Standard style) لأ. المهم Prettier أو ESLint يظبطوها.`,
            mistakes: R`[[return]] لوحدها في سطر. و [[;]] بعد [[if (x);]] أو [[for (...);]] فالبلوك اللي بعدها يتنفذ مرة واحدة بغض النظر عن الشرط. و [[;]] بعد [[}]] بتاعة function عادي ملهاش لازمة بس مش غلط.`
          },
          lines: [
            R`جملة عادية مقفولة بـ [[;]].`,
            R`جوه for الـ [[;]] بتفصل البداية والشرط والزيادة، وإجبارية.`,
            R`دالة.`,
            R`[[return]] لوحدها: JS حطت [[;]] بعدها فوراً.`,
            R`السطر ده مش هيتنفذ خالص.`,
            R`قفلة الدالة.`,
            R`هيطبع [[undefined]] مش [[{ ok: true }]].`
          ],
          sol: R`النسخة الأولى ← [[undefined]]. بعد ما تخلي [[return { ok: true };]] في سطر واحد ← [[{ ok: true }]].`
        },
        {
          cmd: "//  و  /* */",
          title: "التعليقات في الكود: // لآخر السطر، و /* */ لكذا سطر، و # في Python و bash",
          desc: R`التعليق كلام للبشر والكمبيوتر بيتجاهله. في JS و TS و C و C++ و Java و C# و Go و Kotlin و Swift و PHP: [[//]] بتعلّق لآخر السطر، و [[/* ... */]] بتعلّق كل اللي بينهم ولو كذا سطر. و [[/** ... */]] (بنجمتين) اسمها JSDoc أو Javadoc، والمحرر بيعرضها لما تقف على الدالة.

في Python و bash و YAML و Ruby: [[#]]. في SQL: [[--]] و [[/* */]]. في HTML: [[<!-- -->]]. في CSS: [[/* */]] بس، [[//]] مش تعليق في CSS.

الاختصار في VS Code: [[Ctrl+/]] بيعلّق السطر أو يشيل التعليق بالرمز الصح للغة.`,
          example: R`// تعليق سطر واحد
const price = 100; // السعر بالجنيه
/* تعليق
   كذا سطر */
/** بترجّع السعر بعد الخصم */
function discount(p) { return p * 0.9; }`,
          flag: "script",
          try: R`افتح أي ملف JS في VS Code، وحدد ٣ سطور ودوس [[Ctrl+/]]، وبعدين دوسه تاني. وجرّب نفس الحاجة في ملف py و css وشوف الرمز اللي بيتحط.`,
          deep: {
            why: R`عشان تشرح «ليه» مش «إيه»، وعشان تعطّل كود مؤقتًا وانت بتدوّر على bug.`,
            how: R`الـ parser بيشيل التعليقات قبل ما يفهم الكود. [[/* */]] مش بتتداخل: أول [[*/]] بتقفل، فـ [[/* a /* b */ c */]] بتسيب [[c */]] برة وتطلع error.`,
            when: R`فوق أي كود مش واضح أو فيه قرار غريب. و JSDoc فوق الدوال اللي غيرك هيستخدمها.`,
            mistakes: R`[[//]] في CSS أو JSON: الاتنين مبيدعموش التعليقات دي (JSON مفيهوش تعليقات خالص). و [[#]] في JS: مش تعليق (دي private field). وتعليق بيشرح الواضح [[i++ // زوّد i]].`
          },
          lines: [
            R`جملة عادية وبعدها تعليق [[//]] في نفس السطر.`,
            R`بداية تعليق [[/*]]: كل اللي بعدها تعليق لحد ما تلاقي [[*/]].`,
            R`لسه جوه التعليق، و [[*/]] بتقفله.`,
            R`[[/**]] بنجمتين: تعليق JSDoc بيوصف الدالة اللي تحته، والمحرر بيعرضه لما تقف عليها.`,
            R`الدالة نفسها، وده الكود الوحيد اللي بيتنفذ هنا غير السطر الأول.`
          ],
          sol: R`أول [[Ctrl+/]] بيحط [[//]] قدام كل سطر في JS، وتاني مرة بيشيلها. في Python بيحط [[#]]، وفي CSS بيحط [[/* */]] حوالين كل سطر.`
        }
      ]
    },
    {
      t: "رموز الحساب",
      l: 2,
      n: "+ و ++ و += و % و ** والـ bitwise: الحساب والفخاخ اللي فيه",
      items: [
        {
          cmd: "+  و  +=  و  ++",
          title: "علامة + بتجمع أرقام أو بتلزّق نصوص، و += تزوّد على نفس المتغير، و ++ تزوّد واحد",
          desc: R`[[+]] بين رقمين بتجمع. بين نصين بتلزّقهم (concatenation). وفي JS لو واحد منهم نص، التاني بيتحول لنص: [["1" + 1]] بـ [["11"]] مش 2. لكن [[-]] و [[*]] و [[/]] بيحوّلوا لرقم: [["3" - 1]] بـ 2.

[[x += 5]] اختصار [[x = x + 5]]، وفيه زيها [[-=]] و [[*=]] و [[/=]]. و [[x++]] بتزوّد واحد، و [[x--]] بتنقص واحد.

[[i++]] بترجّع القيمة القديمة وبعدين تزوّد، و [[++i]] بتزوّد وترجّع الجديدة. ده بيفرق بس لو استخدمت الناتج في نفس السطر. Python مفيهاش [[++]] خالص، اكتب [[i += 1]].`,
          example: R`console.log(1 + 2, "1" + 2, 1 + 2 + "3");
console.log("5" - 2, +"5" + 1, Number("5") + 1);
let n = 10;
n += 5;
let i = 1;
console.log(i++, i, ++i);`,
          flag: "script",
          try: R`في الـ Console: [["3" + 1 + 2]] و [[3 + 1 + "2"]] و [["3" * "2"]]. وبعدين حل التمرين.`,
          deep: {
            why: R`أي قيمة جاية من input أو URL أو [[localStorage]] بتبقى نص. لو جمعتها على طول هتلزّق بدل ما تجمع، والـ bug ده صامت: [[total = "100" + 50]] بـ [["10050"]].`,
            how: R`JS بتقيّم من الشمال لليمين. لو أي طرف في [[+]] نص، الاتنين يبقوا نص. [[+"5"]] (unary plus) بتحوّل لرقم. و [[i++]] بتحفظ القيمة، تزوّد المتغير، وترجّع المحفوظة.`,
            when: R`حوّل للأرقام بـ [[Number()]] أول ما الداتا تدخل برنامجك. واستخدم template literals للنصوص بدل [[+]].`,
            mistakes: R`تجمع قيم inputs من غير تحويل. وتكتب [[x =+ 5]] بدل [[x += 5]]: الأولى معناها [[x = +5]]. وتكتب [[i++]] في Python. وتستخدم [[0.1 + 0.2]] وتستنى 0.3 بالظبط (بتطلع 0.30000000000000004).`
          },
          lines: [
            R`[[3]]، و [["12"]]، و [["33"]] (جمع 1 + 2 الأول وبعدين لزق).`,
            R`[[-]] حوّلت لرقم: [[3]]، و [[+"5"]] رقم فـ [[6]]، و [[6]].`,
            R`متغير.`,
            R`بقى 15.`,
            R`عداد.`,
            R`[[i++]] رجّعت 1 وبعدين i بقت 2، و [[++i]] زوّدت لـ 3 ورجّعتها: [[1 2 3]].`
          ],
          sol: R`[["3" + 1 + 2]] ← [["312"]]. [[3 + 1 + "2"]] ← [["42"]]. [["3" * "2"]] ← [[6]].`,
          check: {
            lang: "js",
            starter: R`// الأسعار جاية من inputs على شكل نصوص
// addPrices("10", "5") ← 15 (رقم مش "105")
function addPrices(a, b) {
  return a + b;
}`,
            tests: R`test("addPrices('10', '5') ← 15", () => expect(addPrices("10", "5")).toBe(15));
test("addPrices('2.5', '0.5') ← 3", () => expect(addPrices("2.5", "0.5")).toBe(3));
test("addPrices(7, '3') ← 10", () => expect(addPrices(7, "3")).toBe(10));`,
            solution: R`function addPrices(a, b) {
  return Number(a) + Number(b);
}`
          }
        },
        {
          cmd: "%",
          title: "علامة النسبة % في الكود: باقي القسمة (modulo)، مش نسبة مئوية",
          desc: R`[[a % b]] بترجّع الباقي بعد ما تقسم a على b. [[7 % 3]] بـ 1 لأن 7 = 3 × 2 + 1. و [[10 % 2]] بـ 0.

أشهر استخدامات: الرقم زوجي لو [[n % 2 === 0]]. وكل خامس عنصر [[i % 5 === 0]]. وآخر رقم في عدد [[n % 10]]. والدوران (بعد آخر عنصر ارجع للأول) [[(i + 1) % length]]. وتحويل ثواني لدقايق وثواني.

خد بالك مع السالب: في JS و C و Java الناتج بياخد إشارة الشمال [[-7 % 3]] بـ [[-1]]، وفي Python بياخد إشارة اليمين [[-7 % 3]] بـ [[2]]. وفي SQL [[LIKE]] الـ [[%]] معناها تاني خالص (أي حروف)، وفي CMD [[%VAR%]] متغير.`,
          example: R`console.log(7 % 3, 10 % 2, -7 % 3);
const isEven = n => n % 2 === 0;
const secs = 125;
console.log(Math.floor(secs / 60), secs % 60);
const next = (i + 1) % slides.length;`,
          flag: "script",
          try: R`في الـ Console: [[17 % 5]] و [[5 % 17]] و [[0 % 3]]. وفي python3 جرّب [[-7 % 3]] وقارنها بـ JS. وبعدين حل التمرين.`,
          deep: {
            why: R`أي حاجة دورية أو متكررة: ألوان صفوف الجدول بالتبادل، والـ carousel اللي بيرجع للأول، وتنسيق الوقت، وFizzBuzz في أول انترفيو.`,
            how: R`[[a % b]] = [[a - b * trunc(a / b)]] في JS (القسمة بتتقص ناحية الصفر)، عشان كده الإشارة من a. Python بيستخدم floor فالإشارة من b. ومع الكسور شغالة: [[5.5 % 2]] بـ 1.5.`,
            when: R`زوجي وفردي، والدوران على array، وتقسيم وحدات (ثواني ودقايق وساعات، وقروش وجنيهات).`,
            mistakes: R`تفتكرها نسبة مئوية: [[50 % 200]] مش 25٪، دي 50. للنسبة اكتب [[50 / 200 * 100]]. وتستخدمها مع أرقام سالبة في JS وتستنى زي Python (مثلًا index سالب): استخدم [[((n % m) + m) % m]].`
          },
          lines: [
            R`[[1 0 -1]]: الأخيرة سالبة لأن الإشارة من الشمال في JS.`,
            R`دالة: زوجي لو الباقي على 2 صفر.`,
            R`عدد ثواني.`,
            R`دقيقتين و 5 ثواني: [[2 5]].`,
            R`الـ index اللي بعده، ولو وصل للآخر يرجع 0.`
          ],
          sol: R`[[17 % 5]] ← [[2]]. [[5 % 17]] ← [[5]] (أصغر من المقسوم عليه فالباقي هو نفسه). [[0 % 3]] ← [[0]]. وفي Python [[-7 % 3]] ← [[2]]، وفي JS ← [[-1]].`,
          check: {
            lang: "js",
            starter: R`// formatTime(125) ← "2:05"  (دقايق:ثواني، والثواني دايمًا رقمين)
// استخدم Math.floor و %
function formatTime(seconds) {
  return seconds / 60;
}`,
            tests: R`test("formatTime(125) ← 2:05", () => expect(formatTime(125)).toBe("2:05"));
test("formatTime(59) ← 0:59", () => expect(formatTime(59)).toBe("0:59"));
test("formatTime(600) ← 10:00", () => expect(formatTime(600)).toBe("10:00"));
test("formatTime(61) ← 1:01", () => expect(formatTime(61)).toBe("1:01"));`,
            solution: R`function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return $__bt$__{m}:$__{String(s).padStart(2, "0")}$__bt;
}`
          }
        },
        {
          cmd: "**",
          title: "نجمتين ** : الأس (power)، و ^ في أغلب اللغات مش أس",
          desc: R`[[2 ** 10]] يعني 2 أس 10 = 1024. موجودة في JS و Python و bash ([[$((2 ** 10))]]). وقبلها في JS كانوا بيكتبوا [[Math.pow(2, 10)]]. و [[x **= 2]] بتربّع x.

الفخ الكبير: [[2 ^ 3]] في JS و Python و C و Java مش 8، دي XOR (عملية bits) وبتطلع [[1]]. الـ [[^]] للأس موجودة في Excel وفي الرياضيات وبعض اللغات زي R و Lua بس.

وفي C و Java و Go مفيش [[**]] خالص، بتستخدم [[pow()]] أو [[Math.pow()]]. وفي Python النجمتين ليهم معنى تاني في [[**kwargs]] و [[{**d}]] (فرد dict).`,
          example: R`console.log(2 ** 10, 2 ** 0.5, 10 ** -1);
console.log(2 ^ 3);
let side = 4;
side **= 2;
console.log((-2) ** 2);`,
          flag: "script",
          try: R`في الـ Console: [[3 ** 2]] و [[3 ^ 2]] و [[Math.sqrt(16) === 16 ** 0.5]]. وجرّب [[-2 ** 2]] من غير أقواس واقرا الـ error.`,
          deep: {
            why: R`الحسابات العلمية والمالية (فايدة مركّبة) والمسافات (فيثاغورس). والـ [[^]] بدل [[**]] غلطة بتطلع أرقام غلط من غير أي error.`,
            how: R`[[**]] أولويتها أعلى من [[*]] و [[/]]، وبتتقري من اليمين: [[2 ** 3 ** 2]] = [[2 ** 9]] = 512. وفي JS [[-2 ** 2]] ممنوعة (SyntaxError) عشان مش واضح السالب على مين، لازم أقواس. في Python [[-2 ** 2]] بـ [[-4]].`,
            when: R`أي أس أو جذر ([[x ** 0.5]]). وللأرقام الكبيرة جدًا في JS استخدم BigInt: [[2n ** 100n]].`,
            mistakes: R`[[^]] للأس. و [[-2 ** 2]] من غير أقواس في JS. وفي Python تنسى إن [[**]] جوه نداء دالة [[f(**d)]] معناها تاني خالص.`
          },
          lines: [
            R`[[1024]]، والجذر التربيعي لـ 2، و [[0.1]].`,
            R`XOR مش أس: [[1]].`,
            R`ضلع مربع.`,
            R`[[**=]]: side بقت 16.`,
            R`السالب جوه أقواس: [[4]].`
          ],
          sol: R`[[3 ** 2]] ← [[9]]. [[3 ^ 2]] ← [[1]]. [[Math.sqrt(16) === 16 ** 0.5]] ← [[true]]. و [[-2 ** 2]] ← [[SyntaxError: Unary operator used immediately before exponentiation expression...]].`
        },
        {
          cmd: "&  |  ^  ~  <<  >>",
          title: "رموز الـ bits: & و | و ^ و ~ و << و >> بتشتغل على الأرقام bit بـ bit",
          desc: R`دي اسمها bitwise operators، وبتتعامل مع الرقم كـ 0 و 1. [[5 & 3]] (AND) بـ 1، و [[5 | 3]] (OR) بـ 7، و [[5 ^ 3]] (XOR) بـ 6، و [[~5]] (NOT) بـ [[-6]]، و [[1 << 3]] (shift شمال) بـ 8 يعني ضرب في 2 أس 3، و [[16 >> 2]] بـ 4.

مش هتحتاجهم كتير في شغل الويب العادي، بس هتشوفهم في: الصلاحيات والـ flags ([[READ | WRITE]])، والألوان ([[(rgb >> 16) & 255]])، والـ hashing، ومسائل الانترفيو.

المهم إنك متخلطش: [[&]] و [[|]] واحدة bitwise، و [[&&]] و [[||]] منطق. وفي TypeScript [[|]] و [[&]] في الأنواع معناهم union و intersection (درس تاني). وفي Python [[&]] و [[|]] على الـ sets معناهم تقاطع واتحاد.`,
          example: R`console.log(5 & 3, 5 | 3, 5 ^ 3);
console.log(~5, 1 << 3, 16 >> 2);
const READ = 1, WRITE = 2, EXEC = 4;
let perms = READ | WRITE;
console.log((perms & WRITE) !== 0);
console.log((5).toString(2), (3).toString(2));`,
          flag: "script",
          try: R`في الـ Console اكتب [[(6).toString(2)]] و [[(5).toString(2)]] وبعدين احسب [[6 & 5]] بإيدك قبل ما تشغّله. وفكّر ليه [[chmod 755]] في لينكس شبه الـ flags دي.`,
          deep: {
            why: R`عشان تقرا كود فيه flags أو صلاحيات، ومتتلخبطش لو كتبت [[&]] بدل [[&&]] غلط. وصلاحيات لينكس (r=4 و w=2 و x=1) نفس الفكرة بالظبط.`,
            how: R`JS بتحوّل الرقم لـ 32 bit صحيح، وتعمل العملية على كل bit لوحده، وترجّعه رقم. 5 = 101 و 3 = 011: AND بـ 001، OR بـ 111، XOR بـ 110.`,
            when: R`flags وصلاحيات، وتشفير وhashing، ومسائل زي «لاقي الرقم اللي مش متكرر» بـ XOR.`,
            mistakes: R`[[if (a & b)]] وانت قصدك [[&&]]: ممكن تشتغل صدفة مع booleans بس بترجّع رقم ومبتعملش short-circuit. والرقم أكبر من 32 bit بيتقص: [[2 ** 32 | 0]] بـ 0.`
          },
          lines: [
            R`[[1 7 6]].`,
            R`[[-6 8 4]].`,
            R`٣ flags، كل واحد bit مختلف.`,
            R`[[|]] بتجمع flags: perms بـ 3 (قراية وكتابة).`,
            R`[[&]] بتختبر flag: فيه كتابة؟ [[true]].`,
            R`اعرض الرقم بالـ binary: [["101" "11"]].`
          ],
          sol: R`[[6]] = [["110"]] و [[5]] = [["101"]]، و AND بيسيب الـ bit اللي واحد في الاتنين بس: [["100"]] يعني [[4]]. وفي chmod الـ 7 = 4 + 2 + 1 = قراية وكتابة وتشغيل، نفس فكرة [[READ | WRITE | EXEC]].`
        }
      ]
    },
    {
      t: "رموز TypeScript والأسماء",
      l: 2,
      n: ": و <T> و | و ?: و ! و @ و # و $ و _ : الرموز اللي بتظهر في الأنواع والأسماء",
      items: [
        {
          cmd: "x: number",
          title: "النقطتين : في TypeScript: بعدها نوع المتغير أو الـ parameter أو اللي الدالة بترجّعه",
          desc: R`في TypeScript [[let age: number = 20]] معناها age نوعها رقم. النقطتين بعد اسم أي حاجة معناها «نوعها هو». في الدوال: [[function add(a: number, b: number): number]]، والأخيرة بعد الأقواس هي نوع اللي بترجّعه.

نفس النقطتين بالمعنى ده في Python ([[def f(x: int) -> str]])، و Kotlin ([[val age: Int]])، و Swift ([[let age: Int]])، و Rust و Go من غير نقطتين ([[age int]]).

لكن النقطتين ليها معاني تانية في JS: جوه object بتفصل المفتاح عن القيمة [[{ age: 20 }]]، وفي الـ ternary [[a ? b : c]]، وبعد [[case]] في switch. وفي Python بعد if و def و for بتفتح بلوك.`,
          example: R`let age: number = 20;
const names: string[] = ["Ali", "Sara"];
function greet(name: string, times: number = 1): string {
  return name.repeat(times);
}
const user: { id: number; email?: string } = { id: 1 };`,
          flag: "script",
          try: R`افتح [[https://www.typescriptlang.org/play]] واكتب [[let n: number = "5"]] واقرا الـ error. بعدين [[function f(x: string): number { return x; }]].`,
          deep: {
            why: R`الأنواع بتمسك الأخطاء وانت بتكتب مش وانت شغّال: دالة مستنية رقم وجالها نص، أو خانة اسمها غلط. والمحرر بيكمّلك أسماء الخانات لأنه عارف النوع.`,
            how: R`الأنواع في TypeScript بتتشال خالص وقت التحويل لـ JS، يعني مفيش أي تأثير وقت التشغيل. الـ compiler ([[tsc]]) أو المحرر بس هو اللي بيفحص. وكتير مش لازم تكتب النوع لأن TS بيستنتجه (inference): [[let age = 20]] بتبقى number لوحدها.`,
            when: R`في parameters الدوال دايمًا، وفي اللي بترجّعه الدوال المهمة. والمتغيرات اللي ليها قيمة أولية سيب TS يستنتجها.`,
            mistakes: R`تفتكر الأنواع بتتفحص وقت التشغيل: داتا جاية من API ممكن تبقى غلط والنوع مش هيحميك، استخدم validation (زي zod). وتخلط بين [[: number]] (نوع) و [[= 5]] (قيمة). وتكتب [[Number]] و [[String]] بحرف كبير بدل [[number]] و [[string]].`
          },
          lines: [
            R`متغير نوعه number.`,
            R`array من النصوص.`,
            R`parameterين بأنواعهم، والتاني ليه قيمة افتراضية، والدالة بترجّع string.`,
            R`[[repeat]] بتكرر النص.`,
            R`قفلة الدالة.`,
            R`نوع object جوه السطر: id رقم إجباري، و email نص اختياري ([[?:]]).`
          ],
          sol: R`[[let n: number = "5"]] ← [[Type 'string' is not assignable to type 'number'.]]. والدالة ← نفس الرسالة تقريبًا لأنها بترجّع string والمكتوب number.`
        },
        {
          cmd: "<T>",
          title: "الأقواس الزاوية <T> : generics، نوع بيتحدد وقت الاستخدام زي parameter للأنواع",
          desc: R`[[Array<string>]] معناها array من النصوص. والـ [[<>]] بتاخد نوع جواها زي ما الدالة بتاخد قيمة. ولما تكتب دالة بنفسك: [[function first<T>(arr: T[]): T]] معناها «أي نوع، سمّيه T، والدالة بترجّع نفس النوع اللي جه في الـ array».

بتشوفها في كل مكان: [[Promise<User>]] و [[useState<number>(0)]] و [[Map<string, number>]] و [[Record<string, boolean>]].

نفس الفكرة في Java و C# و Kotlin و Swift و Rust: [[List<String>]]. وفي C++ اسمها templates: [[vector<int>]]. وفي Go بأقواس مربعة: [[func Map[T any]()]]. وفي Python: [[list[str]]].`,
          example: R`const ids: Array<number> = [1, 2, 3];
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
const n = first([10, 20]);
const [count, setCount] = useState<number>(0);
const cache = new Map<string, User>();`,
          flag: "script",
          try: R`في TypeScript Playground اكتب دالة [[first]] من المثال، وبعدين [[const s = first(["a", "b"])]] وقف بالماوس على s وشوف نوعها.`,
          deep: {
            why: R`من غيرها كنت هتكتب [[any]] فتخسر كل فايدة الأنواع، أو تكتب نفس الدالة مرة للأرقام ومرة للنصوص.`,
            how: R`[[T]] مجرد اسم (ممكن أي اسم، بس T و K و V عرف). وقت النداء TS بيستنتج T من الـ argument، أو انت تحدده صراحة [[first<string>(...)]]. وكله بيتشال في الـ JS النهائي.`,
            when: R`دوال وكلاسات بتشتغل على أي نوع (utilities و containers و API clients). وفي الاستخدام لما TS ميعرفش يستنتج لوحده، زي [[useState<User | null>(null)]].`,
            mistakes: R`في ملفات [[.tsx]] الـ arrow generic [[<T>(x: T) => x]] بتتلخبط مع JSX، اكتبها [[<T,>(x: T) => x]]. وتستخدم [[any]] بدل generic. وتفتكر [[<]] هنا مقارنة.`
          },
          lines: [
            R`نفس [[number[]]] بصيغة الـ generic.`,
            R`T بيتحدد من الـ array اللي هتبعتها، والدالة بترجّع نفس النوع أو undefined.`,
            R`رجّع أول عنصر.`,
            R`قفلة الدالة.`,
            R`TS استنتج إن T هي number، فـ n نوعها [[number | undefined]].`,
            R`React: الـ state رقم.`,
            R`Map مفاتيحها نصوص وقيمها User.`
          ],
          sol: R`لما تقف على [[s]] هتلاقي [[const s: string | undefined]]. TS استنتج T = string من الـ array.`
        },
        {
          cmd: "A | B  و  A & B",
          title: "الـ | و & في أنواع TypeScript: | يعني «ده أو ده» (union)، و & يعني «الاتنين مع بعض»",
          desc: R`[[string | number]] (union) معناها القيمة ممكن تبقى نص أو رقم. وأشهر استخدام: قيم محددة [[type Status = "idle" | "loading" | "done"]]، فلو كتبت [["laoding"]] غلط TS هيقولك. و [[User | null]] يعني ممكن ميبقاش فيه يوزر.

[[A & B]] (intersection) معناها النوع فيه كل خانات A وكل خانات B مع بعض: [[type Admin = User & { permissions: string[] }]].

ده نفس شكل رموز الـ bits ومعنى قريب بالمنطق، بس هنا في الأنواع بس ومش بيتنفذ. ونفس [[|]] في Python 3.10: [[int | None]]، وفي Rust و Kotlin و Swift الفكرة موجودة بأشكال تانية.`,
          example: R`type Id = string | number;
type Status = "idle" | "loading" | "done";
let state: Status = "idle";
type Admin = User & { permissions: string[] };
function show(id: Id) {
  if (typeof id === "string") return id.toUpperCase();
  return id.toFixed(0);
}`,
          flag: "script",
          try: R`في TypeScript Playground: اكتب [[type Status]] من المثال وبعدين [[let s: Status = "loding"]] واقرا الـ error. بعدين جرّب تنادي [[id.toUpperCase()]] برة الـ if.`,
          deep: {
            why: R`الـ union بيوصف الواقع: API بيرجّع داتا أو error، قيمة ممكن تبقى null، وحالة من عدد محدود. وده بيمنع typos ويجبرك تتعامل مع كل الحالات.`,
            how: R`مع union مسموحلك تستخدم بس الحاجات المشتركة بين كل الأنواع. عشان تستخدم حاجة خاصة بنوع لازم تضيّق (narrowing) بـ [[typeof]] أو [[in]] أو مقارنة، و TS بيفهم ده جوه الـ if.`,
            when: R`[[|]] للقيم اللي ليها أكتر من شكل أو للحالات. [[&]] لدمج أنواع جاهزة بدل ما تكرر خانات.`,
            mistakes: R`تستخدم method خاصة بنوع واحد من غير narrowing فيطلع error. وتفتكر [[A & B]] بين [[string & number]] بتدي «الاتنين»: النتيجة [[never]] (مفيش قيمة نص ورقم في نفس الوقت).`
          },
          lines: [
            R`Id ممكن تبقى نص أو رقم.`,
            R`union من ٣ قيم نصية بالظبط.`,
            R`متغير لازم يبقى واحدة من التلاتة.`,
            R`intersection: كل خانات User ومعاها permissions.`,
            R`دالة بتاخد Id.`,
            R`narrowing: جوه الـ if TS عارف إنها string.`,
            R`هنا TS عارف إنها number.`,
            R`قفلة الدالة.`
          ],
          sol: R`[[let s: Status = "loding"]] ← [[Type '"loding"' is not assignable to type 'Status'. Did you mean '"loading"'?]]. و [[id.toUpperCase()]] برة الـ if ← [[Property 'toUpperCase' does not exist on type 'Id'.]] وتحتها [[Property 'toUpperCase' does not exist on type 'number'.]] (لأن id ممكن تبقى رقم).`
        },
        {
          cmd: "name?:  و  x!",
          title: "الـ ?: خانة اختيارية في TypeScript، و ! بعد قيمة يعني «أنا متأكد إنها مش null»",
          desc: R`[[email?: string]] في نوع أو interface معناها الخانة دي ممكن متكونش موجودة. نوعها الحقيقي [[string | undefined]]. ونفس الحكاية في parameters الدالة: [[function f(name?: string)]].

[[x!]] (non-null assertion) بعد قيمة معناها «يا TypeScript، صدّقني القيمة دي مش null ولا undefined». [[document.getElementById("app")!]].

الـ [[!]] دي مبتعملش أي فحص وقت التشغيل، بتسكّت الـ compiler بس. لو طلعت null فعلًا البرنامج هيقع. والـ [[!]] قبل قيمة ([[!x]]) معناها not، وده غير دي خالص. وفي Kotlin [[!!]] و Swift [[!]] فكرة قريبة بس بيعملوا فحص ويوقعوا البرنامج بشكل واضح.`,
          example: R`interface User {
  id: number;
  email?: string;
}
const u: User = { id: 1 };
console.log(u.email?.length);
const app = document.getElementById("app")!;`,
          flag: "script",
          try: R`في Playground اكتب الـ interface وبعدين [[u.email.length]] من غير [[?.]] واقرا الـ error. بعدين جرّب [[u.email!.length]] وفكّر هيحصل إيه وقت التشغيل.`,
          deep: {
            why: R`أغلب الداتا فيها خانات مش دايمًا موجودة. و [[!]] منتشرة في الكود بس لازم تعرف إنها وعد منك مش ضمان.`,
            how: R`[[?:]] بتضيف [[undefined]] لنوع الخانة وبتسمح إنها تتشال. [[!]] بتشيل null و undefined من النوع وقت الفحص بس، والـ JS اللي بيطلع مفيهوش أي أثر ليها.`,
            when: R`[[?:]] لأي خانة اختيارية. [[!]] بس لما انت متأكد فعلًا (عنصر HTML موجود في الصفحة دايمًا مثلًا)، وغير كده افحص بـ if أو [[?.]].`,
            mistakes: R`تحط [[!]] في كل حتة عشان تسكت الأخطاء: كده لغيت فايدة TypeScript. وتخلط بين [[?:]] في النوع و [[?.]] في الاستخدام و [[? :]] في الـ ternary.`
          },
          lines: [
            R`interface بيوصف شكل User.`,
            R`id إجباري.`,
            R`email اختياري: ممكن ميبقاش موجود.`,
            R`قفلة الـ interface.`,
            R`object من غير email، و TS موافق.`,
            R`لازم [[?.]] لأن email ممكن تبقى undefined: هنا [[undefined]].`,
            R`[[!]] في الآخر: النوع بقى HTMLElement من غير null.`
          ],
          sol: R`[[u.email.length]] ← [['u.email' is possibly 'undefined'.]]. و [[u.email!.length]] ← TS يسكت، لكن وقت التشغيل هيقع بـ [[TypeError: Cannot read properties of undefined (reading 'length')]] لأن email مش موجودة فعلًا.`
        },
        {
          cmd: "@decorator",
          title: "علامة @ قبل اسم فوق كلاس أو دالة: decorator، بيضيف سلوك أو معلومات من غير ما تعدّل الكود",
          desc: R`[[@]] (at) قبل اسم وفوق كلاس أو دالة أو خانة اسمها decorator. بيلف الحاجة اللي تحته ويضيف لها حاجة: تسجيل، أو صلاحيات، أو معلومات للـ framework.

في Python: [[@app.get("/users")]] في FastAPI بتسجّل الدالة كـ route، و [[@staticmethod]] و [[@property]] جاهزين في اللغة. في TypeScript و Angular: [[@Component({...})]] و [[@Injectable()]]. وفي NestJS: [[@Controller()]] و [[@Get()]].

وفي Java و Kotlin نفس الشكل اسمه annotation ([[@Override]])، ودرسه في المستوى ٣. و [[@]] في أماكن تانية: في الإيميل، وفي npm [[@scope/package]]، وفي CSS [[@media]]، وفي Python بين مصفوفتين [[a @ b]] ضرب مصفوفات.`,
          example: R`# Python: decorator بيقيس الوقت
import time
def timed(fn):
    def wrapper(*args):
        start = time.time()
        result = fn(*args)
        print(fn.__name__, time.time() - start)
        return result
    return wrapper
@timed
def slow():
    time.sleep(0.5)
slow()`,
          flag: "script",
          try: R`احفظ المثال في [[deco.py]] وشغّله بـ [[python3 deco.py]]. بعدين امسح سطر [[@timed]] وشغّله تاني وقارن.`,
          deep: {
            why: R`الـ frameworks الكبيرة (FastAPI و Flask و Angular و NestJS و Spring) مبنية عليها. لو مش فاهم إن [[@app.get]] بتسجّل الدالة، هتحس إن الكود بيشتغل بالسحر.`,
            how: R`في Python [[@timed]] فوق [[def slow]] هي بالظبط [[slow = timed(slow)]]: الدالة اتبعتت للـ decorator، واللي رجع (wrapper) أخد مكانها. في TypeScript الفكرة قريبة وبتتنفذ وقت تعريف الكلاس.`,
            when: R`إنك تستخدمها: كل يوم مع الـ frameworks. إنك تكتب واحدة بنفسك: لما نفس الكود (تسجيل أو cache أو فحص صلاحية) بيتكرر حوالين دوال كتير.`,
            mistakes: R`تحط سطر فاضي أو كود بين الـ decorator والدالة. وتنسى الأقواس لما الـ decorator محتاجها ([[@Injectable()]] مش [[@Injectable]] في Angular). وفي TypeScript القديم لازم [[experimentalDecorators]] في tsconfig لـ Angular وNest.`
          },
          lines: [
            R`استورد time.`,
            R`الـ decorator: دالة بتاخد دالة.`,
            R`دالة جديدة بتلف الأصلية.`,
            R`سجّل وقت البداية.`,
            R`شغّل الأصلية.`,
            R`اطبع اسمها والوقت اللي خدته.`,
            R`رجّع ناتج الأصلية.`,
            R`رجّع الدالة اللافة.`,
            R`[[@timed]] = [[slow = timed(slow)]].`,
            R`الدالة الأصلية.`,
            R`بتستنى نص ثانية.`,
            R`النداء دلوقتي بيعدّي على wrapper.`
          ],
          sol: R`مع [[@timed]] هيطبع [[slow 0.50...]] (الاسم والوقت). من غيرها مش هيطبع حاجة، الدالة هتستنى نص ثانية بس.`
        },
        {
          cmd: "#field",
          title: "الـ # قبل اسم خانة في كلاس JavaScript: خانة private حقيقية محدش يوصلها من برة",
          desc: R`في JS الحديث [[#count]] جوه class معناها خانة private: تقدر تستخدمها جوه الكلاس بس بـ [[this.#count]]، ولو حاولت من برة [[obj.#count]] بيطلع SyntaxError.

ده غير [[private]] في TypeScript: دي فحص وقت الكتابة بس، والخانة لسه موجودة عادي في الـ JS. الـ [[#]] حماية حقيقية وقت التشغيل.

قبل [[#]] الناس كانت بتكتب [[_count]] بشرطة تحتية كعُرف «متلمسش»، بس ده مجرد اتفاق ومش حماية. و [[#]] في JS مش تعليق (التعليق [[//]])، وفي CSS [[#id]] selector، وفي URL جزء بعد الـ hash.`,
          example: R`class Counter {
  #count = 0;
  increment() {
    this.#count++;
    return this.#count;
  }
}
const c = new Counter();
c.increment();
console.log(c.count);`,
          flag: "script",
          try: R`انسخ الكلاس في الـ Console، واعمل [[const c = new Counter()]] ونادي [[c.increment()]] مرتين. بعدين جرّب [[c.#count]] واقرا الـ error.`,
          deep: {
            why: R`عشان تحمي حالة الـ object الداخلية: محدش يكتب [[c.count = -5]] من برة ويبوّظ المنطق. الـ API بتاعك يبقى الـ methods بس.`,
            how: R`الـ engine بيحجز الخانة دي جوه الكلاس بشكل مخفي، والاسم مش string عادي فمفيش [[obj["#count"]]] ولا بتظهر في [[Object.keys]] ولا [[JSON.stringify]]. ولازم تتعرّف في جسم الكلاس قبل ما تستخدمها.`,
            when: R`في الكلاسات اللي ليها حالة داخلية مش عايز حد يعدّلها مباشرة. وفيه [[#method()]] كمان لدوال داخلية.`,
            mistakes: R`تفتكر [[#]] تعليق زي Python. وتستخدم [[this.#x]] من غير ما تعرّف [[#x]] في الكلاس (SyntaxError). وتفتكر [[_x]] محمية.`
          },
          lines: [
            R`كلاس.`,
            R`خانة private قيمتها الأولى 0.`,
            R`method عامة.`,
            R`جوه الكلاس عادي تستخدمها بـ [[this.#]].`,
            R`رجّع القيمة.`,
            R`قفلة الـ method.`,
            R`قفلة الكلاس.`,
            R`object جديد.`,
            R`زوّد واحد.`,
            R`[[c.count]] (من غير #) خانة تانية مش موجودة: [[undefined]].`
          ],
          sol: R`[[c.increment()]] ← [[1]] ثم [[2]]. و [[c.#count]] ← [[SyntaxError: Private field '#count' must be declared in an enclosing class]].`
        },
        {
          cmd: "$  و  _",
          title: "علامة $ والشرطة التحتية _ في أسماء المتغيرات: مسموحين، وليهم أعراف معروفة",
          desc: R`في JS أسماء المتغيرات ممكن يبقى فيها [[$]] و [[_]] زي أي حرف. عشان كده [[$]] لوحدها اسم دالة في jQuery [[$("#btn")]]، و [[_]] اسم مكتبة lodash [[_.debounce]].

أعراف هتشوفها: [[_name]] يعني «خاص، متلمسوش من برة» (اتفاق مش حماية). [[_]] لوحدها في parameter يعني «مش هستخدمه»: [[arr.map((_, i) => i)]]. و [[user$]] في Angular و RxJS يعني ده Observable. و [[$el]] في Vue خانات خاصة بالـ framework.

في Python: [[_x]] خاص بالاتفاق، و [[__x]] بيتغيّر اسمه جوه الكلاس، و [[__init__]] (dunder) دوال خاصة باللغة. وفي PHP و Perl و bash الـ [[$]] قبل أي متغير إجبارية. وفي Go الـ [[_]] بتتجاهل قيمة.`,
          example: R`const $btn = document.querySelector("#save");
const _cache = new Map();
const indexes = ["a", "b"].map((_, i) => i);
const user$ = http.get("/api/user");
const MAX_SIZE = 100;`,
          flag: "script",
          try: R`في الـ Console اكتب [[const $ = 5; const _ = 10; $ + _]]. بعدين [[["x", "y", "z"].map((_, i) => i * 2)]].`,
          deep: {
            why: R`هتقرا كود فيه الرموز دي في الأسماء وتفتكر إنها operators. لما تعرف الأعراف، الاسم نفسه بيقولك معلومة عن المتغير.`,
            how: R`قواعد الأسماء في JS: تبدأ بحرف أو [[$]] أو [[_]]، وبعدها أرقام عادي. يعني [[$]] و [[_]] حروف من ناحية اللغة، والمعنى كله اتفاق بين المبرمجين.`,
            when: R`[[_]] للـ parameter اللي مش محتاجه. [[UPPER_SNAKE]] للثوابت. [[$]] بس لو المشروع ماشي على عرف (jQuery أو Observables).`,
            mistakes: R`تسمّي متغير [[$]] أو [[_]] في مشروع فيه jQuery أو lodash فتغطي عليهم. وتفتكر [[_private]] محمية. وفي Python تفتكر [[__x]] private حقيقية.`
          },
          lines: [
            R`[[$]] في أول الاسم: عرف إن ده عنصر من الـ DOM.`,
            R`[[_]] في أول الاسم: داخلي ومتلمسوش.`,
            R`[[_]] لوحدها: الـ parameter الأول مش محتاجينه، عايزين الـ index بس: [[[0, 1]]].`,
            R`[[$]] في الآخر: عرف Angular و RxJS إن ده Observable.`,
            R`حروف كبيرة و [[_]]: ثابت.`
          ],
          sol: R`[[$ + _]] ← [[15]] (مجرد متغيرين أساميهم غريبة). والـ map ← [[[0, 2, 4]]].`
        }
      ]
    }
]);
