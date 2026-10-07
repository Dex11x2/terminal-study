// تكملة تاب php: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/php/01.js (شرح حقول الدرس في أوله)
MORE("php", [
    {
      t: "arrays والتحكم والدوال",
      l: 1,
      n: "الـ array في PHP لستة وقاموس في نفس الوقت، والدوال بأنواع صريحة بتمسك الغلط بدري",
      items: [
        {
          cmd: "array",
          title: "لستة وقاموس في نوع واحد",
          desc: R`الـ array في PHP ordered map: كل عنصر ليه key وقيمة، والترتيب محفوظ. لو مكتبتش keys بتبقى أرقام من 0 (indexed)، ولو كتبت [['name' => 'Ali']] يبقى associative، زي object في JavaScript.

[[$a[] = x]] بيضيف في الآخر، و [[count()]] العدد، و [[isset()]] يشوف الـ key موجود، و [[unset()]] يمسح. وأهم فرق عن JavaScript: الـ array بيتنسخ لما تديه لمتغير تاني أو لدالة، مش بيتشارك.`,
          example: R`<?php
$langs = ['PHP', 'JS'];
$langs[] = 'SQL';
$user = ['name' => 'Ali', 'age' => 30];
$user['email'] = 'ali@example.com';
echo count($langs), ' ', $langs[0], ' ', $user['name'], "\n";
var_dump(isset($user['phone']), array_key_exists('age', $user));
unset($user['age']);
$copy = $langs;
$copy[] = 'Go';
echo count($langs), ' vs ', count($copy), "\n";
[$first, $second] = $langs;
['name' => $n, 'email' => $mail] = $user;
print_r($user);`,
          try: R`اعمل دالة بتاخد array وتضيف فيه عنصر، ونادي عليها، واطبع الـ array الأصلي: متغيرش. بعدين خلي الدالة ترجّع الـ array الجديد وخد النتيجة.`,
          flag: "script",
          deep: {
            why: "كل حاجة تقريبًا في PHP arrays: صفوف القاعدة، و [[$_POST]]، والإعدادات، و JSON بعد ما يتفك. لو فهمت الـ array فهمت نص اللغة.",
            how: R`جوه PHP الـ array hash table مترتب. الـ key يا int يا string، والنص الرقمي [["5"]] بيتحول لـ int 5 لوحده. وتقدر تخلط: [[[1, 2, 'x' => 3]]].

النسخ (copy-on-write): [[$copy = $langs]] مبينسخش فعلًا لحد ما تعدّل في واحد منهم، وساعتها بس بيتنسخ. فالنسخ رخيص، والنتيجة إن الأصل عمره ما بيتغير من وراك. الـ objects مختلفة: بتتشارك (handle)، زي JavaScript.

[[isset]] بترجع false لو الـ key موجود وقيمته null، و [[array_key_exists]] بترجع true. غالبًا [[isset]] أو [[??]] هما اللي محتاجهم.

الـ destructuring: [[[$a, $b] = $arr]] بالترتيب، و [[['name' => $n] = $row]] بالاسم. مفيد مع صفوف القاعدة ومع دوال بترجع أكتر من قيمة. و [[...]] بيفرد array جوه array تاني: [[[...$a, ...$b]]].

[[print_r]] أنضف للقراية من [[var_dump]] بس من غير أنواع. و [[array_is_list]] (8.1) بتقولك الـ keys هي 0 و 1 و 2 بالترتيب ولا لأ، ودي اللي بتحدد [[json_encode]] هيطلّع list ولا object.`,
            when: "أي مجموعة بيانات: لستة منتجات، أو صف من القاعدة، أو إعدادات. ولو البيانات ليها شكل ثابت ومعاها سلوك، الكلاس أحسن (المستوى الثالث).",
            mistakes: R`تقرا key مش موجود فتاخد [[Warning: Undefined array key]] و null، والحل [[$a['x'] ?? 'default']]. وتعدّل array جوه دالة ومستني الأصل يتغير. و [[$a[5] = 'x']] في array فيه ٣ عناصر مبيملاش اللي في النص، بيعمل key اسمه 5 بس.`
          },
          teach: R`## المثال بيعمل إيه؟

بيعمل array لستة ([[$langs]]) و array بأسامي ([[$user]])، ويضيف ويقرا ويمسح فيهم، ويوريك إن نسخ الـ array بيعمل نسخة مستقلة، وإزاي تفك array في متغيرات. اتشغّل جوه Docker على [[php:8.4-cli]].

---

## ١. لستة: [[['PHP', 'JS']]]

~~~php
$langs = ['PHP', 'JS'];
$langs[] = 'SQL';
~~~

- [[[ ... ]]] بتعمل array، والعناصر مفصولة بفاصلة.
- مكتبتش keys، فـ PHP رقّمها لوحده من [[0]]: [[0 => 'PHP']] و [[1 => 'JS']]. ده اسمه indexed array.
- [[$langs[] = 'SQL']]: الأقواس **فاضية** معناها «ضيف في الآخر»، وبياخد الرقم اللي بعد أكبر رقم: [[2]].

---

## ٢. array بأسامي: [[=>]]

~~~php
$user = ['name' => 'Ali', 'age' => 30];
$user['email'] = 'ali@example.com';
~~~

[[=>]] بتربط key بقيمة: [['name' => 'Ali']] يعني الـ key [['name']] قيمته [['Ali']]. ده associative array، زي object في JavaScript. و [[$user['email'] = ...]] بتضيف key جديد (أو تغيّر قيمته لو موجود).

---

## ٣. القراية و [[count]]

~~~php
echo count($langs), ' ', $langs[0], ' ', $user['name'], "\n";
~~~

| التعبير | القيمة |
|---|---|
| [[count($langs)]] | عدد العناصر: [[3]] |
| [[$langs[0]]] | العنصر اللي الـ key بتاعه 0 |
| [[$user['name']]] | القيمة اللي الـ key بتاعها name |

~~~text الناتج
3 PHP Ali
~~~

---

## ٤. موجود ولا لأ؟ [[isset]] و [[array_key_exists]]

~~~php
var_dump(isset($user['phone']), array_key_exists('age', $user));
~~~

~~~text الناتج
bool(false)
bool(true)
~~~

- [[isset($user['phone'])]]: الـ key موجود **وقيمته مش null**؟ مفيش phone، فـ false. ومبيطلعش Warning.
- [[array_key_exists('age', $user)]]: الـ key موجود؟ (حتى لو قيمته null). [[age]] موجود، فـ true. لاحظ الترتيب: الـ key الأول وبعدين الـ array.

---

## ٥. المسح: [[unset]]

~~~php
unset($user['age']);
~~~

بيشيل الـ key وقيمته من الـ array خالص.

---

## ٦. النسخ: [[$copy = $langs]]

~~~php
$copy = $langs;
$copy[] = 'Go';
echo count($langs), ' vs ', count($copy), "\n";
~~~

~~~text الناتج
3 vs 4
~~~

[[$copy]] بقى **نسخة** مستقلة: الإضافة فيها مأثرتش في [[$langs]]. وده عكس JavaScript، اللي فيها الاتنين بيشاوروا على نفس الـ array. وPHP مبينسخش فعلًا غير لما تعدّل (copy-on-write)، فالنسخ مش مكلف.

---

## ٧. الفك (destructuring)

~~~php
[$first, $second] = $langs;
['name' => $n, 'email' => $mail] = $user;
~~~

- [[[$first, $second] = $langs]]: بالترتيب: [[$first]] = [['PHP']] و [[$second]] = [['JS']] (و [['SQL']] اتساب).
- [[['name' => $n, ...] = $user]]: بالاسم: [[$n]] = [['Ali']] و [[$mail]] = [['ali@example.com']].

الأقواس هنا **على شمال** [[=]]، فمعناها «فُك» مش «اعمل array».

---

## ٨. [[print_r]]

~~~php
print_r($user);
~~~

~~~text الناتج
Array
(
    [name] => Ali
    [email] => ali@example.com
)
~~~

[[print_r]] بيطبع الـ array بشكل مقروء: كل [[[key] => القيمة]] في سطر. و [[age]] مش موجود لأننا عملناله [[unset]]. ومن غير أنواع؛ لو محتاج الأنواع استخدم [[var_dump]].

---

## ٩. الحل: الـ array بيتبعت للدالة نسخة

~~~php
function addItem(array $list): void {
    $list[] = 'Go';
}
~~~

| الحتة | معناها |
|---|---|
| [[function addItem(...)]] | تعريف دالة اسمها addItem (درس «function») |
| [[array $list]] | بتاخد parameter لازم يبقى array، وجوه الدالة اسمه [[$list]] |
| [[: void]] | مبترجعش حاجة |
| [[$list[] = 'Go']] | بتضيف في **نسختها** هي |

~~~php
function withItem(array $list): array {
    $list[] = 'Go';
    return $list;
}
~~~

نفس الإضافة، بس [[: array]] و [[return $list]]: بترجّع النسخة المعدّلة.

~~~php
$langs = ['PHP', 'JS'];
addItem($langs);
print_r($langs);
$langs = withItem($langs);
print_r($langs);
~~~

~~~text الناتج
Array
(
    [0] => PHP
    [1] => JS
)
Array
(
    [0] => PHP
    [1] => JS
    [2] => Go
)
~~~

[[addItem]] عدّلت نسختها واتمسحت لما الدالة خلصت، فالأصل زي ما هو. [[withItem]] رجّعت النسخة، و [[$langs = ...]] خدتها مكان القديمة.

---

## الخلاصة

| العملية | الكود |
|---|---|
| لستة | [[['a', 'b']]] |
| بأسامي | [[['k' => 'v']]] |
| ضيف في الآخر | [[$a[] = x]] |
| العدد | [[count($a)]] |
| موجود؟ | [[isset($a['k'])]] |
| امسح | [[unset($a['k'])]] |
| فك | [[[$x, $y] = $a]] |

والـ array بيتنسخ لما تديه لمتغير أو دالة. عايز التعديل؟ رجّعه من الدالة وخده.`,
          lines: [
            "بداية الملف.",
            "indexed: الـ keys هي 0 و 1.",
            "ضيف في الآخر (key 2).",
            "associative: keys نصوص.",
            "ضيف key جديد.",
            "3، و PHP، و Ali.",
            "false (مفيش phone)، و true (age موجود).",
            "امسح key.",
            "نسخة، مش نفس الـ array.",
            "التعديل في النسخة بس.",
            "3 مقابل 4: الأصل متغيرش.",
            "فك بالترتيب: PHP و JS.",
            "فك بالاسم.",
            "اطبع الـ array بشكل مقروء."
          ],
          sol: R`أول [[print_r]] بيطبع الـ array زي ما هو ([[PHP]] و [[JS]] بس)، رغم إن الدالة أضافت فيه. التاني بعد ما خدت النتيجة فيه [[Go]] كمان. الـ arrays في PHP بتتبعت للدالة كنسخة (copy-on-write)، مش reference زي JavaScript.

الغلط الشائع إنك تتوقع إن الأصل اتغير لأنك متعود على JS. لو فعلًا عايز الدالة تعدّل الأصل، اكتب [[array &$list]] في الـ parameter، بس الأوضح إنك ترجّع array جديد وتاخده.`,
          solCode: R`<?php
function addItem(array $list): void {
    $list[] = 'Go';
}
function withItem(array $list): array {
    $list[] = 'Go';
    return $list;
}
$langs = ['PHP', 'JS'];
addItem($langs);
print_r($langs);           // PHP, JS بس
$langs = withItem($langs);
print_r($langs);           // PHP, JS, Go`
        },
        {
          cmd: "array_map / array_filter",
          title: "حوّل وفلتر ورتّب لستة من غير loop",
          desc: R`[[array_filter]] بيسيب العناصر اللي الشرط بتاعها true، و [[array_map]] بيحوّل كل عنصر، و [[array_column]] بيطلّع عمود واحد من صفوف، و [[usort]] بيرتّب بدالة مقارنة. و PHP 8.4 زوّد [[array_find]] و [[array_any]] و [[array_all]].

[[fn($p) => ...]] دالة سهم قصيرة (زي JavaScript)، وبتشوف المتغيرات اللي براها لوحدها.`,
          example: R`<?php
$products = [
    ['name' => 'Laptop', 'price' => 30000, 'stock' => 4],
    ['name' => 'Mouse',  'price' => 350,   'stock' => 0],
    ['name' => 'Screen', 'price' => 7000,  'stock' => 2],
];
$inStock = array_filter($products, fn($p) => $p['stock'] > 0);
$names   = array_map(fn($p) => strtoupper($p['name']), $inStock);
$prices  = array_column($products, 'price', 'name');
$total   = array_sum(array_column($inStock, 'price'));
usort($products, fn($a, $b) => $a['price'] <=> $b['price']);
$cheap   = array_find($products, fn($p) => $p['price'] < 1000);
echo implode(', ', $names), " | total: $total\n";
echo json_encode($names), ' ', json_encode(array_values($names));`,
          try: R`شغّل المثال وبص على آخر سطر: [[{"0":"LAPTOP","2":"SCREEN"}]] مقابل [[["LAPTOP","SCREEN"]]]. بعدين رتّب المنتجات من الأغلى للأرخص بتبديل [[$a]] و [[$b]].`,
          flag: "script",
          deep: {
            why: "الـ loop اللي بيبني array جديد بإيده بياخد ٥ سطور وفيه مكان للغلط. الدوال دي بتقول النية في سطر: «فلتر المتاح»، «هات الأسماء».",
            how: R`ترتيب الـ arguments مش ثابت، ودي من أشهر عيوب PHP: [[array_map(callback, array)]] لكن [[array_filter(array, callback)]]. الـ editor بيفكّرك.

[[array_filter]] بيحافظ على الـ keys الأصلية. فبعد الفلترة الـ keys بقت 0 و 2، و [[json_encode]] شافها مش list فطلّع object. [[array_values]] بيرجّع الترقيم من 0. ولو ندهت [[array_filter]] من غير دالة بيشيل كل القيم الـ falsy (ومنها [[0]] و [["0"]]!).

[[array_column($rows, 'price', 'name')]]: التالت اختياري وبيبقى الـ key، فبتاخد map من الاسم للسعر. مفيد جدًا مع صفوف القاعدة.

[[usort]] بيرتّب نفس الـ array (in place) وبيرجّع true، مش الـ array. و [[<=>]] (spaceship) بيرجّع -1 أو 0 أو 1، وده اللي دالة المقارنة محتاجاه.

[[fn]] بتشوف المتغيرات اللي براها بالقيمة أوتوماتيك. الدالة العادية [[function ($p) use ($min) { ... }]] لازم تقولها [[use]]. و [[array_find]] (8.4) بترجّع أول عنصر مطابق أو null.`,
            when: "تحويل صفوف القاعدة قبل ما تعرضها أو ترجّعها JSON. ولو المنطق جوه طويل (أكتر من سطر)، [[foreach]] عادي أوضح.",
            mistakes: R`[[$sorted = usort(...)]] فتلاقي [[$sorted]] بقت true. و [[json_encode(array_filter(...))]] ترجع object والـ frontend يقع لأنه مستني array. و [[in_array($x, $list)]] من غير [[true]] في الآخر: المقارنة بتبقى [[==]]، و [[in_array('1e1', ['10'])]] بترجع true. اكتب [[in_array($x, $list, true)]] دايمًا.`
          },
          teach: R`## المثال بيعمل إيه؟

عندنا ٣ منتجات (زي صفوف جاية من قاعدة بيانات). المثال بيفلتر المتاح منهم، ويطلّع أسماءهم، ويعمل map من الاسم للسعر، ويجمع الأسعار، ويرتّب، ويدوّر على أول منتج رخيص. كل ده من غير ولا loop. النواتج من تشغيل جوه Docker على [[php:8.4-cli]] (PHP 8.4، لأن [[array_find]] جديدة فيها)، واحنا طبعنا كل متغير لوحده عشان نشوفه.

---

## ١. البيانات

~~~php
$products = [
    ['name' => 'Laptop', 'price' => 30000, 'stock' => 4],
    ['name' => 'Mouse',  'price' => 350,   'stock' => 0],
    ['name' => 'Screen', 'price' => 7000,  'stock' => 2],
];
~~~

array فيه ٣ arrays: الـ keys بتاعته [[0]] و [[1]] و [[2]]، وكل عنصر صف فيه [[name]] و [[price]] و [[stock]]. والفاصلة بعد آخر صف مسموحة (trailing comma) وبتسهّل الإضافة.

---

## ٢. [[fn($p) => ...]]: دالة في سطر

قبل الدوال، الأداة اللي هنستخدمها مع كلهم:

~~~php
fn($p) => $p['stock'] > 0
~~~

| الحتة | معناها |
|---|---|
| [[fn]] | دالة سهم (arrow function)، من غير اسم |
| [[($p)]] | بتاخد parameter واحد اسمه [[$p]] (منتج واحد) |
| [[=>]] | وبترجّع... |
| [[$p['stock'] > 0]] | ...النتيجة دي: true لو المخزون أكبر من صفر |

ومش بنناديها احنا: بنديها للدالة اللي بتلف، وهي بتناديها مرة لكل عنصر.

---

## ٣. [[array_filter]]: سيب اللي الشرط بتاعه true

~~~php
$inStock = array_filter($products, fn($p) => $p['stock'] > 0);
~~~

| المنتج | [[stock > 0]] | |
|---|---|---|
| Laptop (key 0) | true | فضل |
| Mouse (key 1) | false | اتشال |
| Screen (key 2) | true | فضل |

والمهم: **الـ keys فضلت زي ما هي**. طبعنا [[array_keys($inStock)]]:

~~~text الناتج
Array
(
    [0] => 0
    [1] => 2
)
~~~

يعني [[0]] و [[2]]، مفيش [[1]]. افتكر ده للسطر الأخير.

---

## ٤. [[array_map]]: حوّل كل عنصر

~~~php
$names = array_map(fn($p) => strtoupper($p['name']), $inStock);
~~~

لاحظ الترتيب اتعكس: [[array_map(الدالة, الـ array)]] بينما [[array_filter(الـ array, الدالة)]]. ده من عيوب PHP المشهورة، والـ editor بيفكّرك. الدالة بتاخد منتج وترجّع اسمه بحروف كبيرة، و [[array_map]] بيحافظ على الـ keys هو كمان:

~~~text الناتج: print_r($names)
Array
(
    [0] => LAPTOP
    [2] => SCREEN
)
~~~

---

## ٥. [[array_column]]: عمود واحد من الصفوف

~~~php
$prices  = array_column($products, 'price', 'name');
~~~

[[array_column(الصفوف, عمود القيمة, عمود الـ key)]]: هات [[price]] من كل صف، وخلي [[name]] هو الـ key:

~~~text الناتج
Array
(
    [Laptop] => 30000
    [Mouse] => 350
    [Screen] => 7000
)
~~~

ومن غير التالت كانت هتبقى لستة أسعار [[0]] و [[1]] و [[2]].

---

## ٦. [[array_sum]]: المجموع

~~~php
$total   = array_sum(array_column($inStock, 'price'));
~~~

من جوه لبرة: [[array_column($inStock, 'price')]] = [[30000]] و [[7000]]، و [[array_sum]] جمعهم: [[int(37000)]].

---

## ٧. [[usort]] و [[<=>]]: الترتيب

~~~php
usort($products, fn($a, $b) => $a['price'] <=> $b['price']);
~~~

[[usort]] (user sort) بيرتّب بدالة انت كاتبها: بياخد عنصرين [[$a]] و [[$b]] ويسأل الدالة «مين الأول؟». والدالة لازم ترجّع رقم:

| الرجوع | معناه |
|---|---|
| سالب | [[$a]] قبل [[$b]] |
| [[0]] | زي بعض |
| موجب | [[$b]] قبل [[$a]] |

و [[<=>]] (اسمه spaceship) بيعمل ده بالظبط. جربنا [[1 <=> 2]] و [[2 <=> 2]] و [[3 <=> 2]]: [[-1]] و [[0]] و [[1]].

[[usort]] بيرتّب **نفس** [[$products]] (in place)، وبيرجّع [[true]] مش الـ array. الترتيب بعدها: [[Mouse,Screen,Laptop]]. ومن الأغلى للأرخص: بدّل [[$a]] و [[$b]] على يمين [[=>]]، فيطلع [[Laptop > Screen > Mouse]].

---

## ٨. [[array_find]]: أول واحد مطابق (PHP 8.4)

~~~php
$cheap   = array_find($products, fn($p) => $p['price'] < 1000);
~~~

بيلف لحد أول عنصر الدالة ترجّعله true، ويرجّعه هو (مش array من النتايج):

~~~text الناتج
Array
(
    [name] => Mouse
    [price] => 350
    [stock] => 0
)
~~~

ولو مفيش ولا عنصر بيرجّع [[NULL]] (جربنا [[< 1]]). وفي نسخة قبل 8.4 الدالة مش موجودة أصلًا.

---

## ٩. الطباعة و [[json_encode]]

~~~php
echo implode(', ', $names), " | total: $total\n";
echo json_encode($names), ' ', json_encode(array_values($names));
~~~

- [[implode(', ', $names)]]: لزق العناصر بـ [[, ]] بينهم.
- [[json_encode]]: حوّل لنص JSON (اللي الـ frontend بيقراه).
- [[array_values]]: رجّع الترقيم من 0.

~~~text الناتج
LAPTOP, SCREEN | total: 37000
{"0":"LAPTOP","2":"SCREEN"} ["LAPTOP","SCREEN"]
~~~

ليه الأولى طلعت [[{...}]]؟ JSON فيه list بـ [[[ ]]] من غير keys، و object بـ [[{ }]] بـ keys. [[json_encode]] بيطلّع list **بس** لو الـ keys [[0]] و [[1]] و [[2]]... بالترتيب من غير فجوات. [[$names]] فيه [[0]] و [[2]]، فطلع object. بعد [[array_values]] الـ keys بقت [[0]] و [[1]]، فطلع list.

---

## الخلاصة

| الدالة | بتعمل إيه | الـ keys |
|---|---|---|
| [[array_filter($a, fn)]] | تسيب اللي الشرط true | زي ما هي |
| [[array_map(fn, $a)]] | تحوّل كل عنصر | زي ما هي |
| [[array_column($rows, 'col', 'key')]] | عمود من صفوف | من العمود التالت لو موجود |
| [[array_sum($a)]] | المجموع | |
| [[usort($a, fn)]] | ترتّب نفس الـ array، وترجّع true | من 0 من جديد |
| [[array_find($a, fn)]] | أول عنصر مطابق أو null | |
| [[array_values($a)]] | ترقيم من 0 | من 0 |

وقبل أي [[json_encode]] لـ array اتفلتر: [[array_values]].`,
          lines: [
            "بداية الملف.",
            "array من صفوف، زي اللي بيرجع من القاعدة.",
            "صف.",
            "صف.",
            "صف.",
            "قفلة.",
            "المتاح بس (Mouse اتشال)، والـ keys بقت 0 و 2.",
            "الأسماء بحروف كبيرة.",
            "map من الاسم للسعر.",
            "مجموع أسعار المتاح: 37000.",
            "رتّب من الأرخص للأغلى، على نفس الـ array.",
            "أول منتج أقل من 1000 (PHP 8.4): Mouse.",
            "LAPTOP, SCREEN | total: 37000.",
            "object بسبب الـ keys، مقابل list بعد array_values."
          ],
          sol: R`آخر سطر بيطبع [[{"0":"LAPTOP","2":"SCREEN"} ["LAPTOP","SCREEN"]]]. [[array_filter]] شال الـ Mouse بس ساب المفاتيح الأصلية (0 و 2)، ولأن فيه فجوة [[json_encode]] حوّلها object. [[array_values]] بيعيد الترقيم من 0 فتبقى list. وأول سطر [[LAPTOP, SCREEN | total: 37000]].

للترتيب من الأغلى: [[usort($products, fn($a, $b) => $b['price'] <=> $a['price']);]] والترتيب يبقى [[Laptop > Screen > Mouse]]. ولاحظ إن [[usort]] بيعدّل الـ array نفسه وبيرجّع true، فمتكتبش [[$sorted = usort(...)]].

الغلط الشائع: API بيرجّع [[{"0":...,"2":...}]] والـ frontend بيعمل [[.map]] عليه فيقع، لأن ده object مش array. أي [[array_filter]] قبل [[json_encode]] محتاج [[array_values]].`
        },
        {
          cmd: "foreach",
          title: "لف على البيانات واختار بالشروط",
          desc: R`[[foreach ($rows as $row)]] أشهر loop في PHP، و [[as $key => $value]] لو محتاج الـ key. و [[if / elseif / else]] للشروط، و [[for]] و [[while]] لما تحتاج عدّاد أو شرط، و [[continue]] يتخطى و [[break]] يخرج.

وفي المقارنة استخدم [[===]] دايمًا (نفس القيمة ونفس النوع). [[==]] بيحوّل الأنواع قبل ما يقارن، وبيعمل مفاجآت.`,
          example: R`<?php
$scores = ['Ali' => 85, 'Sara' => 92, 'Omar' => 47, 'Mona' => 0];
foreach ($scores as $name => $score) {
    if ($score === 0) continue;
    if ($score >= 90) {
        $grade = 'ممتاز';
    } elseif ($score >= 50) {
        $grade = 'ناجح';
    } else {
        $grade = 'راسب';
    }
    echo "$name: $grade\n";
}
for ($i = 3; $i > 0; $i--) echo $i, ' ';`,
          try: R`جرّب فخ الـ reference: [[$a = [1, 2, 3]; foreach ($a as &$v) { $v *= 10; } foreach ($a as $v) {} print_r($a);]]. هتلاقي آخر عنصر 20 مش 30. بعدين ضيف [[unset($v);]] بعد أول loop وشوف الفرق.`,
          flag: "script",
          deep: {
            why: "أي صفحة فيها لستة (منتجات، طلبات، تعليقات) هي [[foreach]] على صفوف جاية من القاعدة، وجواها شروط بتقرر إيه يظهر وإزاي.",
            how: R`[[foreach]] بيلف على نسخة من الـ array، فلو غيّرت [[$score]] جوه الـ loop الأصل مبيتغيرش. عشان تعدّل: [[$scores[$name] = ...]]، أو [[foreach ($a as &$v)]] بالـ reference.

فخ الـ reference: بعد الـ loop، [[$v]] لسه مربوط بآخر عنصر. أي loop بعدها بنفس الاسم بيكتب في آخر عنصر مع كل لفة. عشان كده [[unset($v)]] على طول بعد أي loop بـ [[&]].

في القوالب: [[foreach ($rows as $row):]] و [[endforeach;]]. ومع القاعدة هتشوف [[while ($row = $stmt->fetch())]]: بيلف لحد ما [[fetch]] ترجّع false.

الـ truthy والـ falsy: [[0]] و [[0.0]] و [[""]] و [["0"]] و [[[]]] و [[null]] و [[false]] كلهم falsy. [["0"]] دي اللي بتفاجئ: [[if ($qty)]] لما [[$qty]] جاية من فورم بقيمة [["0"]] بتبقى false.

وفيه [[?:]] للشرط القصير ([[$a > 5 ? 'كبير' : 'صغير']]). ومتحطش ternary جوه ternary من غير أقواس: PHP 8 بيرفضها.`,
            when: "عرض أي لستة، وتجميع أرقام، وتحويل بيانات منطقها أطول من سطر (غير كده [[array_map]] و [[array_filter]]).",
            mistakes: R`[[if ($x = 5)]] (تخصيص مش مقارنة) دايمًا true. وفخ [[&$v]] من غير [[unset]]. و [[==]] بدل [[===]]: [["abc" == 0]] بقت false في PHP 8 بس [["1" == "01"]] لسه true، فمتعتمدش على [[==]]. وتعمل query جوه [[foreach]] لكل صف (N+1)، والصح query واحد بـ JOIN أو [[IN]].`
          },
          teach: R`## المثال بيعمل إيه؟

عندنا درجات ٤ طلاب. المثال بيلف عليهم بـ [[foreach]]، يتخطى اللي درجته صفر، ويحدد تقدير كل واحد بـ [[if / elseif / else]]، وفي الآخر عدّاد تنازلي بـ [[for]]. اتشغّل جوه Docker على [[php:8.4-cli]].

---

## ١. البيانات

~~~php
$scores = ['Ali' => 85, 'Sara' => 92, 'Omar' => 47, 'Mona' => 0];
~~~

array بأسامي: الـ key اسم الطالب، والقيمة درجته.

---

## ٢. [[foreach ($scores as $name => $score)]]

~~~php
foreach ($scores as $name => $score) {
    ...
}
~~~

| الحتة | معناها |
|---|---|
| [[foreach]] | لكل عنصر في... |
| [[$scores]] | ...الـ array ده |
| [[as $name => $score]] | حط الـ key في [[$name]] والقيمة في [[$score]] |
| [[{ ... }]] | الكود اللي بيتكرر مرة لكل عنصر |

اللفّات بالترتيب:

| اللفة | [[$name]] | [[$score]] |
|---|---|---|
| ١ | Ali | 85 |
| ٢ | Sara | 92 |
| ٣ | Omar | 47 |
| ٤ | Mona | 0 |

ولو مش محتاج الـ key: [[foreach ($scores as $score)]].

---

## ٣. [[continue]]: اتخطى اللفة دي

~~~php
    if ($score === 0) continue;
~~~

- [[===]] مقارنة صارمة: نفس القيمة **ونفس النوع**. [[0 === 0]] true، لكن [["0" === 0]] false.
- [[continue]]: سيب باقي الكود في اللفة دي، وروح للعنصر اللي بعده.
- [[if]] من غير [[{ }]] مسموح لما يبقى بعده جملة واحدة.

في لفة Mona الشرط true، فمفيش حاجة اتطبعت ليها. ([[break]] بدلها كانت هتخرج من الـ loop كله.)

---

## ٤. [[if / elseif / else]]

~~~php
    if ($score >= 90) {
        $grade = 'ممتاز';
    } elseif ($score >= 50) {
        $grade = 'ناجح';
    } else {
        $grade = 'راسب';
    }
~~~

PHP بيجرّب الشروط من فوق لتحت، **وأول واحد true بيكسب** والباقي بيتساب:

| الطالب | [[>= 90]] | [[>= 50]] | التقدير |
|---|---|---|---|
| Ali (85) | لأ | آه | ناجح |
| Sara (92) | آه | (متجربش) | ممتاز |
| Omar (47) | لأ | لأ | راسب ([[else]]) |

[[>=]] أكبر من أو يساوي. و [[elseif]] كلمة واحدة في PHP.

---

## ٥. الطباعة

~~~php
    echo "$name: $grade\n";
~~~

~~~text الناتج
Ali: ناجح
Sara: ممتاز
Omar: راسب
~~~

٣ سطور بس: Mona اتخطّت بـ [[continue]].

---

## ٦. [[for]]: عدّاد

~~~php
for ($i = 3; $i > 0; $i--) echo $i, ' ';
~~~

جوه القوسين ٣ أجزاء مفصولين بـ [[;]]:

| الجزء | الكود | إمتى بيتنفّذ |
|---|---|---|
| البداية | [[$i = 3]] | مرة واحدة في الأول |
| الشرط | [[$i > 0]] | قبل كل لفة، ولو false الـ loop يخلص |
| الخطوة | [[$i--]] | بعد كل لفة: [[$i]] تقل 1 |

~~~text الناتج
3 2 1 
~~~

لما [[$i]] بقت 0 الشرط بقى false فوقف.

---

## ٧. فخ الـ reference (التجربة)

[[foreach]] بيديك **نسخة** من كل قيمة، فلو غيّرت [[$v]] الأصل مبيتغيرش. عشان تعدّل الأصل بتكتب [[&$v]] (reference: [[$v]] بقت اسم تاني لنفس العنصر):

~~~php
$a = [1, 2, 3];
foreach ($a as &$v) { $v *= 10; }
foreach ($a as $v) {}
print_r($a);
~~~

[[$v *= 10]] اختصار [[$v = $v * 10]]. المتوقع 10 و 20 و 30، بس:

~~~text الناتج
Array
(
    [0] => 10
    [1] => 20
    [2] => 20
)
~~~

ليه؟ بعد أول loop، [[$v]] لسه مربوطة بآخر عنصر [[$a[2]]]. التانية بتكتب في [[$v]] مع كل لفة، يعني في [[$a[2]]]:

| لفة التانية | [[$v]] = | [[$a[2]]] بقى |
|---|---|---|
| ١ | [[$a[0]]] = 10 | 10 |
| ٢ | [[$a[1]]] = 20 | 20 |
| ٣ | [[$a[2]]] = 20 | 20 |

الحل [[unset($v);]] بعد أول loop على طول: بيفك الربط من غير ما يمسح العنصر. ومعاه طلعت [[10]] و [[20]] و [[30]].

---

## الخلاصة

| الأداة | إمتى |
|---|---|
| [[foreach ($a as $k => $v)]] | تلف على array |
| [[if / elseif / else]] | أول شرط true يكسب |
| [[continue]] / [[break]] | اتخطى اللفة / اخرج خالص |
| [[for (بداية; شرط; خطوة)]] | عدّاد |
| [[===]] | المقارنة دايمًا |
| [[&$v]] | لازم [[unset($v)]] بعدها |`,
          lines: [
            "بداية الملف.",
            "associative: الاسم والدرجة.",
            "لف: الـ key في [[$name]] والقيمة في [[$score]].",
            "الصفر: اتخطّاه وكمّل اللي بعده.",
            "أول شرط.",
            "قيمة.",
            "شرط تاني لو الأول غلط.",
            "قيمة.",
            "لو ولا شرط اتحقق.",
            "قيمة.",
            "قفلة الشروط.",
            "Ali: ناجح، وهكذا.",
            "قفلة الـ loop.",
            "عدّاد: 3 2 1."
          ],
          sol: R`أول تشغيل بيطبع [[[0] => 10, [1] => 20, [2] => 20]]. بعد اللوب الأولى [[$v]] لسه reference على آخر عنصر، فاللوب التانية بتكتب في آخر عنصر كل قيمة بتعدّي عليها: 10، بعدين 20، وآخر لفة بتكتب فيه قيمته هو اللي بقت 20.

بعد [[unset($v);]] النتيجة الصح: [[10, 20, 30]]. الـ [[unset]] بيقطع الربط من غير ما يمسح العنصر نفسه. والقاعدة: أي [[foreach (... as &$v)]] بعده [[unset($v)]] على طول، أو استخدم [[array_map]] بدلها.`
        },
        {
          cmd: "match",
          title: "اختار قيمة من حالات كتير بأمان",
          desc: R`[[match]] بيقارن قيمة بحالات ويرجّع نتيجة. أنضف من [[switch]] في ٣ حاجات: بيرجّع قيمة تحطها في متغير، وبيقارن بـ [[===]] من غير تحويل أنواع، ومفيش [[break]] تنساه.

ولو مفيش حالة اتطابقت ومفيش [[default]]، بيرمي [[UnhandledMatchError]] بدل ما يعدّي بصمت. و [[match (true)]] بيخليك تكتب شروط زي [[$score >= 90]].`,
          example: R`<?php
$status = 'paid';
$label = match ($status) {
    'pending'         => 'في الانتظار',
    'paid', 'shipped' => 'اتدفع',
    'cancelled'       => 'اتلغى',
    default           => 'مش معروف',
};
echo $label, "\n";
$score = 77;
$grade = match (true) {
    $score >= 90 => 'A',
    $score >= 70 => 'B',
    default      => 'C',
};
echo $grade;`,
          try: R`شيل سطر [[default]] وخلي [[$status = 'refunded']]، وشوف الـ UnhandledMatchError. بعدين جرّب [[match ('1') { 1 => 'one' }]]: مفيش تطابق لأن [['1']] نص و [[1]] رقم.`,
          flag: "script",
          deep: {
            why: "[[switch]] القديم بيقارن بـ [[==]]، ولو نسيت [[break]] بيكمّل على الحالة اللي بعدها (fallthrough)، والاتنين bugs مشهورة. [[match]] اتعمل في PHP 8 عشان يقفل الاتنين.",
            how: R`كل حالة (arm) فيها شرط أو أكتر مفصولين بفاصلة، وبعد [[=>]] تعبير واحد بس، مش block. لو محتاج أكتر من سطر، نادي دالة.

الترتيب مهم: أول حالة تطابق بتكسب والباقي مبيتنفذش. عشان كده في [[match (true)]] الشروط من الأكبر للأصغر.

و [[throw]] بقت expression في PHP 8، فتقدر تكتب [[default => throw new InvalidArgumentException('status غلط')]]. ودي أحسن من قيمة افتراضية بتخبّي bug.

[[UnhandledMatchError]] نوع من [[Error]]، يعني لو محدش مسكه الصفحة بتقع بـ 500. وده غالبًا اللي انت عايزه: حالة مش متوقعة يبقى لازم تعرف.`,
            when: "تحويل قيمة لقيمة: status لنص عربي، أو نوع ملف لامتداد، أو method و path لـ controller. ومع الـ enums في المستوى الثالث بيبقى أحسن.",
            mistakes: R`[[match ($_GET['page'])]] والحالات أرقام: اللي جاي من الرابط دايمًا نص، فمفيش ولا حالة هتتطابق. حوّل الأول [[(int)]]. وتحاول تكتب أكتر من جملة بعد [[=>]]. وتحط [[default]] يرجّع قيمة عادية في حالة المفروض متحصلش.`
          },
          teach: R`## المثال بيعمل إيه؟

جزئين: الأول بيحوّل حالة طلب ([[paid]]) لنص عربي، والتاني بيحوّل درجة (77) لتقدير بشروط. الاتنين بـ [[match]]. اتشغّل جوه Docker على [[php:8.4-cli]].

---

## ١. [[match]] بيرجّع قيمة

~~~php
$status = 'paid';
$label = match ($status) {
    'pending'         => 'في الانتظار',
    'paid', 'shipped' => 'اتدفع',
    'cancelled'       => 'اتلغى',
    default           => 'مش معروف',
};
~~~

| الحتة | معناها |
|---|---|
| [[match ($status)]] | قارن القيمة دي بالحالات اللي جاية |
| [['pending' => 'في الانتظار']] | حالة (arm): لو القيمة [['pending']] رجّع [['في الانتظار']] |
| [['paid', 'shipped' => ...]] | قيمتين مفصولين بفاصلة ليهم نفس النتيجة |
| [[default]] | أي قيمة تانية |
| [[};]] | [[match]] تعبير بيرجّع قيمة، فالجملة كلها [[$label = ...;]] محتاجة [[;]] |

PHP بيقارن من فوق لتحت بـ [[===]]: [['paid' === 'pending']]؟ لأ. [['paid' === 'paid']]؟ آه، فرجّع [['اتدفع']] ووقف.

~~~php
echo $label, "\n";
~~~

~~~text الناتج
اتدفع
~~~

والمسافات اللي بعد [['pending']] عشان الأسهم تيجي تحت بعض بس، ملهاش معنى.

---

## ٢. [[match (true)]]: شروط بدل قيم

~~~php
$score = 77;
$grade = match (true) {
    $score >= 90 => 'A',
    $score >= 70 => 'B',
    default      => 'C',
};
echo $grade;
~~~

هنا بنقارن [[true]] بنتيجة كل شرط:

| الحالة | الشرط | النتيجة | [[=== true]]؟ |
|---|---|---|---|
| ١ | [[77 >= 90]] | false | لأ |
| ٢ | [[77 >= 70]] | true | **آه**: رجّع [['B']] |

~~~text الناتج
B
~~~

ولأن أول حالة تطابق بتكسب، رتّب الشروط من الأكبر للأصغر. لو [[>= 70]] كانت الأول، الـ 95 كانت هتاخد B.

---

## ٣. مفيش حالة اتطابقت ومفيش [[default]]

شلنا [[default]] وخلينا [[$status = 'refunded']]:

~~~text الناتج
Fatal error: Uncaught UnhandledMatchError: Unhandled match case 'refunded' in /app/match.php:4
~~~

[[UnhandledMatchError]] نوع غلطة بيوقف البرنامج، والرسالة فيها القيمة اللي مكانش ليها حالة. ده أحسن من إن [[$label]] تفضل فاضية والغلط يبان بعدين في حتة تانية.

ولو عايز رسالة أوضح، [[throw]] ينفع بعد [[=>]]:

~~~php
default => throw new InvalidArgumentException('status غلط')
~~~

~~~text الناتج
Fatal error: Uncaught InvalidArgumentException: status غلط in /app/sw.php:4
~~~

---

## ٤. [[===]] مش [[==]]

جربنا [[match ('1') { 1 => 'one' }]]:

~~~text الناتج
UnhandledMatchError: Unhandled match case '1'
~~~

[['1']] نص و [[1]] رقم، و [[===]] بيقول مش زي بعض. أما [[switch]] بيقارن بـ [[==]]، فنفس الحالة دخلت:

~~~php
switch ('1') { case 1: echo "switch: one\n"; break; }
~~~

~~~text الناتج
switch: one
~~~

عشان كده أي قيمة من [[$_GET]] (نص دايمًا) حوّلها الأول: [[match ((int) $page)]].

---

## الخلاصة

| | [[match]] | [[switch]] |
|---|---|---|
| بيرجّع قيمة | آه | لأ |
| المقارنة | [[===]] | [[==]] |
| [[break]] | مش محتاجه | لو نسيته بيكمّل للحالة اللي بعدها |
| مفيش حالة | [[UnhandledMatchError]] | بيعدّي بصمت |
| بعد السهم | تعبير واحد | أي عدد جمل |`,
          lines: [
            "بداية الملف.",
            "القيمة اللي هنقارنها.",
            "match بيرجّع قيمة في [[$label]].",
            "حالة.",
            "حالتين ليهم نفس النتيجة.",
            "حالة.",
            "أي حاجة تانية.",
            "قفلة، وبعدها [[;]] لأنها expression.",
            "اتدفع.",
            "درجة.",
            "[[match (true)]]: أول شرط true يكسب.",
            "شرط.",
            "شرط (77 هنا).",
            "الباقي.",
            "قفلة.",
            "B."
          ],
          sol: R`من غير [[default]] و [[$status = 'refunded']]: [[Fatal error: Uncaught UnhandledMatchError: Unhandled match case 'refunded']] (PHP 8.4 بيكتب القيمة نفسها في الرسالة). [[match]] رفض يعدّي بصمت، و [[switch]] في نفس الموقف كان هيسيب [[$label]] من غير قيمة.

[[match ('1') { 1 => 'one' }]] بيطلّع نفس الـ UnhandledMatchError، لأن [[match]] بيقارن بـ [[===]]: النص [['1']] مش هو الرقم [[1]]. ده الفرق الأساسي عن [[switch]] اللي بيقارن بـ [[==]] وكان هيدخل الحالة. لو القيمة جاية من [[$_GET]] (دايمًا نص) حوّلها الأول: [[match ((int) $x)]].`
        },
        {
          cmd: "function",
          title: "دالة بأنواع واضحة وقيم افتراضية",
          desc: R`[[function name(type $param): returnType]]. الأنواع اختيارية، بس اكتبها دايمًا: PHP بيرمي [[TypeError]] لو اتبعت نوع غلط، فالغلط بيبان عند الدالة مش بعدها بعشر سطور. [[?string]] يعني string أو null، و [[int|float]] الاتنين، و [[void]] مبترجعش حاجة.

و named arguments (PHP 8): [[price(amount: 100, coupon: 'SAVE10')]] بتبعت بالاسم وتفوّت اللي ليه قيمة افتراضية. و [[declare(strict_types=1);]] في أول الملف بتمنع التحويل التلقائي، فـ [['100']] مش هيعدّي كـ float.`,
          example: R`<?php
declare(strict_types=1);
function price(float $amount, int $qty = 1, ?string $coupon = null): float {
    $total = $amount * $qty;
    if ($coupon === 'SAVE10') {
        $total *= 0.9;
    }
    return round($total, 2);
}
echo price(100), "\n";
echo price(100, 3, 'SAVE10'), "\n";
echo price(amount: 100, coupon: 'SAVE10'), "\n";
$double = fn(int $x): int => $x * 2;
echo $double(21), "\n";
echo price('100');`,
          try: R`شغّل المثال واقرا رسالة الـ TypeError في الآخر: فيها اسم الـ parameter ورقم السطر. بعدين شيل سطر [[declare]] وشغّل تاني: [['100']] هتعدّي وتتحوّل لـ 100.`,
          flag: "script",
          deep: {
            why: "من غير أنواع، دالة بتاخد [[$qty]] ممكن توصلها [[\"3\"]] أو [[null]] أو array، والنتيجة غلط هادي يتكشف بعد أسبوع. الأنواع بتخلي PHP نفسه يمسك الغلط في مكانه، والـ editor يكمّلك صح.",
            how: R`فيه وضعين: العادي (coercive) بيحاول يحوّل ([["5"]] يبقى 5)، و strict بيرفض أي تحويل ما عدا int لـ float. [[strict_types]] بتتطبق على النداءات اللي خارجة من الملف اللي فيه الـ declare، مش على الدالة نفسها. ولازم تبقى أول سطر بعد [[<?php]].

نوع الرجوع بيتفحص كمان: لو الدالة بتقول [[: float]] ورجّعت نص، TypeError. و [[never]] لدالة عمرها ما بترجع (بترمي exception أو [[exit]]).

الـ parameters الاختيارية بعد الإجبارية. و [[?string $coupon = null]] هي الصح؛ الشكل [[string $coupon = null]] بقى deprecated في PHP 8.4. و named arguments بتخلي أسماء الـ parameters جزء من الـ API: لو غيّرت اسم parameter، النداءات بالاسم هتقع.

الدالة مبتشوفش المتغيرات اللي براها. تديها اللي محتاجاه كـ parameters. [[fn]] استثناء: بتشوف اللي براها للقراية بس. و [[...$items]] بتجمّع أي عدد arguments في array.

الدوال المعرّفة في أول مستوى في الملف متاحة من أوله (hoisting). بس لو اتعرّفت جوه [[if]] مبتبقاش موجودة غير لما الـ if يتنفّذ.`,
            when: "أي منطق هيتكرر أو محتاج اسم. وحط [[declare(strict_types=1);]] في كل ملف جديد.",
            mistakes: R`في مشروع حقيقي دوال كانت بتستخدم [[global $site]] جواها: اعتماد مستخبي، والدالة متتجربش لوحدها. ابعته parameter. ودالة رفع ملفات كانت متعرّفة جوه [[if (POST)]]، فأي نداء ليها من مكان تاني بيقع. ونفس الملف لو اتعمله [[require]] مرتين: [[Cannot redeclare function]]، والحل [[require_once]].`
          },
          teach: R`## المثال بيعمل إيه؟

بيعرّف دالة [[price]] بتحسب سعر: المبلغ × الكمية، وخصم ١٠٪ لو فيه كوبون. وبيناديها ٣ مرات بطرق مختلفة، ويعرّف دالة سهم صغيرة، وفي الآخر بيبعت نوع غلط عشان تشوف الـ TypeError. اتشغّل بـ [[php fn.php]] جوه Docker على [[php:8.4-cli]].

---

## ١. [[declare(strict_types=1);]]

~~~php
declare(strict_types=1);
~~~

[[declare]] بيدّي PHP تعليمة للملف ده، و [[strict_types=1]] معناها «النداءات اللي في الملف ده متحوّلش الأنواع لوحدها». لازم تبقى **أول جملة** بعد [[<?php]]. جربنا نحطها بعد دالة:

~~~text الناتج
Fatal error: strict_types declaration must be the very first statement in the script in /app/d.php on line 3
~~~

---

## ٢. سطر تعريف الدالة

~~~php
function price(float $amount, int $qty = 1, ?string $coupon = null): float {
~~~

نفكّه حتة حتة:

| الحتة | معناها |
|---|---|
| [[function price]] | دالة اسمها price |
| [[float $amount]] | أول parameter: لازم float، واسمه جوه الدالة [[$amount]] |
| [[int $qty = 1]] | int، ولو محدش بعته قيمته [[1]] (قيمة افتراضية) |
| [[?string $coupon = null]] | [[?]] قبل النوع = string **أو null**، والافتراضي null |
| [[: float]] | الدالة بترجّع float |
| [[{]] | بداية جسم الدالة |

والـ parameters اللي ليها قيمة افتراضية بتيجي **بعد** الإجبارية. ولو كتبت [[string $c = null]] من غير [[?]]، PHP 8.4 بيطلّع:

~~~text الناتج
Deprecated: f(): Implicitly marking parameter $c as nullable is deprecated, the explicit nullable type must be used instead
~~~

---

## ٣. جسم الدالة

~~~php
    $total = $amount * $qty;
    if ($coupon === 'SAVE10') {
        $total *= 0.9;
    }
    return round($total, 2);
}
~~~

1. [[$total = $amount * $qty]]: السعر × الكمية.
2. [[if ($coupon === 'SAVE10')]]: الكوبون ده بالظبط؟
3. [[$total *= 0.9]]: اختصار [[$total = $total * 0.9]]، يعني ادفع ٩٠٪ (خصم ١٠٪).
4. [[return round($total, 2)]]: [[return]] بترجّع القيمة للي نادى وتخرج من الدالة. و [[round(..., 2)]] بتقرّب لرقمين بعد العلامة، عشان حسابات الكسور زي [[0.9]] ممكن تطلّع ذيل طويل.

و [[$total]] متغير **جوه** الدالة بس: بيتعمل مع كل نداء ويتمسح لما الدالة تخلص.

---

## ٤. ٣ نداءات

~~~php
echo price(100), "\n";
echo price(100, 3, 'SAVE10'), "\n";
echo price(amount: 100, coupon: 'SAVE10'), "\n";
~~~

| النداء | [[$amount]] | [[$qty]] | [[$coupon]] | الحساب | الناتج |
|---|---|---|---|---|---|
| [[price(100)]] | 100.0 | 1 (افتراضي) | null | 100 × 1 | [[100]] |
| [[price(100, 3, 'SAVE10')]] | 100.0 | 3 | SAVE10 | 300 × 0.9 | [[270]] |
| [[price(amount: 100, coupon: 'SAVE10')]] | 100.0 | 1 (افتراضي) | SAVE10 | 100 × 0.9 | [[90]] |

~~~text الناتج
100
270
90
~~~

- [[100]] مكتوب int، بس الـ parameter [[float]]: التحويل من int لـ float **مسموح حتى في strict**، فبقى [[100.0]]. والـ [[echo]] بيطبع float من غير كسور كده: [[100]] مش [[100.0]].
- النداء التالت **named arguments** (PHP 8): [[اسم: قيمة]]. بعتنا [[coupon]] ونطّينا [[qty]] من غير ما نكتب [[1]] بإيدنا.

---

## ٥. دالة سهم بأنواع

~~~php
$double = fn(int $x): int => $x * 2;
echo $double(21), "\n";
~~~

[[fn]] دالة من غير اسم، اتحطت في متغير [[$double]]. بتاخد int وترجّع int: [[$x * 2]]. وبتتنادي بالمتغير وبعده أقواس: [[$double(21)]] = [[42]].

---

## ٦. النوع الغلط: TypeError

~~~php
echo price('100');
~~~

~~~text الناتج
Fatal error: Uncaught TypeError: price(): Argument #1 ($amount) must be of type float, string given, called in /app/fn.php on line 15 and defined in /app/fn.php:3
Stack trace:
#0 /app/fn.php(15): price('100')
#1 {main}
  thrown in /app/fn.php on line 3
~~~

| حتة من الرسالة | بتقولك |
|---|---|
| [[price(): Argument #1 ($amount)]] | الدالة، وأنهي parameter (رقمه واسمه) |
| [[must be of type float, string given]] | المطلوب float، والجاي string |
| [[called in /app/fn.php on line 15]] | **مين** نادى غلط: السطر 15 |
| [[defined in /app/fn.php:3]] | الدالة متعرّفة فين |
| [[Stack trace]] | سلسلة النداءات اللي وصّلت هنا. [[{main}]] = الملف نفسه بره أي دالة |

ولما شلنا سطر [[declare]]، آخر سطر طبع [[100]] عادي: من غير strict، PHP حوّل النص الرقمي [['100']] لـ float لوحده.

---

## الخلاصة

| الكتابة | معناها |
|---|---|
| [[float $x]] | النوع المطلوب |
| [[int $qty = 1]] | قيمة افتراضية |
| [[?string]] | النوع ده أو null |
| [[: float]] / [[: void]] | نوع الرجوع / مبترجعش حاجة |
| [[price(coupon: 'X')]] | named argument |
| [[fn($x) => ...]] | دالة سهم في سطر |
| [[declare(strict_types=1);]] | أول سطر، وبيمنع التحويل التلقائي |`,
          lines: [
            "بداية الملف.",
            "strict: ممنوع تحويل الأنواع في النداءات من الملف ده.",
            "float إجباري، و qty افتراضي 1، و coupon نص أو null، والناتج float.",
            "احسب.",
            "كوبون معروف؟",
            "خصم ١٠٪.",
            "قفلة.",
            "قرّب لرقمين.",
            "قفلة الدالة.",
            "100.",
            "270 (300 ناقص ١٠٪).",
            "بالاسم: فوّتنا qty. الناتج 90.",
            "دالة سهم بأنواع.",
            "42.",
            "TypeError: نص بدل float."
          ],
          sol: R`التشغيل بيطبع [[100]] و [[270]] و [[90]] و [[42]]، وبعدين: [[Fatal error: Uncaught TypeError: price(): Argument #1 ($amount) must be of type float, string given, called in .../fn.php on line 15]]. الرسالة بتقولك الدالة ورقم الـ argument واسمه ونوعه والسطر اللي ناداها.

من غير [[declare(strict_types=1)]] آخر سطر بيطبع [[100]] عادي: PHP حوّل [['100']] لـ float بصمت. ولو بعت [['abc']] كان هيقع برضه، لأن التحويل بيحصل بس لو النص رقم. خلي بالك إن [[declare]] بيأثر على النداءات اللي في الملف ده بس، مش على الدالة في كل مكان.`
        },
        {
          cmd: "?? و ?->",
          title: "قيمة ناقصة أو null من غير ما الصفحة تقع",
          desc: R`[[$a ?? 'default']]: لو [[$a]] مش موجود أو null خد الافتراضي، ومن غير Warning. ودي اللي هتستخدمها مع [[$_GET]] و [[$_POST]] كل شوية. و [[??=]] بيحط قيمة بس لو مفيش.

[[?->]] (nullsafe): [[$user?->address?->city]] لو أي حلقة null، النتيجة null بدل Warning (ولو بتنادي method على null يبقى Error). و [[?:]] حاجة تانية: بيبص على truthy، فـ [[0]] و [[""]] بيتعاملوا كأنهم مفيش.`,
          example: R`<?php
$page = (int) ($_GET['page'] ?? 1);
$sort = $_GET['sort'] ?? 'newest';
$config = [];
$config['lang'] ??= 'ar';
$qty = 0;
echo $qty ?: 'مفيش', ' / ', $qty ?? 'مفيش', "\n";
class Address { public function __construct(public string $city) {} }
class User { public function __construct(public ?Address $address = null) {} }
$u = new User();
echo $u->address?->city ?? 'مدينة مش معروفة', "\n";
$u2 = new User(new Address('Cairo'));
echo $u2->address?->city;`,
          try: R`بدّل [[??]] في أول سطر بـ [[?:]] وشغّل: هتاخد Warning إن الـ key مش موجود. وبدّل [[?->]] بـ [[->]] في سطر [[$u]] وشيل [[?? 'مدينة مش معروفة']] من آخره: هتاخد Warning «Attempt to read property "city" on null». ولاحظ إن [[??]] لوحده كان هيخفيها، لأنه بيشتغل زي [[isset]].`,
          flag: "script",
          deep: {
            why: "أي حاجة جاية من المستخدم ممكن تكون مش موجودة: رابط من غير [[?page=]]، أو فورم ناقص حقل. من غير [[??]] الكود بيتملي [[isset($x) ? $x : ...]]، أو warnings في اللوج.",
            how: R`[[??]] بيشتغل زي [[isset]]: مبيطلعش warning لو المتغير أو الـ key مش موجود، حتى لو السلسلة طويلة: [[$data['user']['name'] ?? 'ضيف']] آمنة لو [[user]] نفسه مش موجود.

[[?:]] بيقيّم الشمال الأول، فلو مش موجود بيطلع warning، وبعدين بيشوف truthy ولا لأ. فـ [[0 ?: 'مفيش']] = «مفيش»، و [[0 ?? 'مفيش']] = 0.

[[?->]] بيوقف السلسلة كلها أول ما يلاقي null، حتى الـ arguments بتاعة الدوال اللي بعده مبتتنفذش. ومينفعش تكتب بيه ([[$u?->name = 'x']] ممنوع).

والمثال فيه constructor promotion: [[public function __construct(public string $city) {}]] بيعرّف property ويملاها في سطر، هنشرحها في درس الكلاسات.`,
            when: "أي قراية من [[$_GET]] و [[$_POST]] و [[$_COOKIE]] وإعدادات ممكن تكون ناقصة، وسلسلة objects أي حلقة فيها ممكن تبقى null.",
            mistakes: R`[[??]] مع حقل فورم فاضي: [["" ?? 'x']] = [[""]] لأن النص الفاضي مش null. للفورم: [[trim($_POST['name'] ?? '')]] وبعدين [[=== '']]. واستخدام [[@]] قدام الكود عشان تخفي الـ warning: بيخفي مشاكل حقيقية كمان.`
          },
          teach: R`## المثال بيعمل إيه؟

بيقرا قيم ممكن تكون **مش موجودة** (من الرابط، أو من array، أو من object جواه object) من غير ما يطلع Warning أو الصفحة تقع، بـ ٣ أدوات: [[??]] و [[??=]] و [[?->]]، ويقارنهم بـ [[?:]]. اتشغّل في الترمنال جوه Docker على [[php:8.4-cli]]، فمفيش رابط وكل [[$_GET]] فاضي، وده بالظبط اللي عايزين نجربه.

---

## ١. [[??]]: لو مش موجود، خد ده

~~~php
$page = (int) ($_GET['page'] ?? 1);
$sort = $_GET['sort'] ?? 'newest';
~~~

[[$a ?? $b]] اسمه null coalescing: «لو [[$a]] موجود ومش null خده، وإلا خد [[$b]]». ومن غير Warning حتى لو الـ key مش موجود أصلًا.

السطر الأول من جوه لبرة:

1. [[$_GET['page']]]: مش موجود (مفيش [[?page=]] في الرابط).
2. [[?? 1]]: فخد [[1]].
3. [[(int) (...)]]: حوّله رقم صحيح. القوسين حوالين [[??]] مهمين عشان الـ cast يتطبق على النتيجة كلها.

طبعنا القيم: [[$page]] = [[int(1)]] و [[$sort]] = [[string(6) "newest"]].

وجربنا نبدّل [[??]] بـ [[?:]] في أول سطر:

~~~text الناتج
Warning: Undefined array key "page" in /app/n.php on line 2
~~~

[[?:]] بيقرا القيمة الأول (فيطلع Warning لو مش موجودة)، أما [[??]] بيسأل «موجود؟» زي [[isset]] من غير ما يقرا.

---

## ٢. [[??=]]: حط قيمة لو مفيش

~~~php
$config = [];
$config['lang'] ??= 'ar';
~~~

[[$a ??= $b]] اختصار [[$a = $a ?? $b]]: لو [[lang]] مش موجود أو null، حط [['ar']]. وبعدها [[print_r($config)]] طبع [[[lang] => ar]]. ولما عملنا [[??= 'en']] تاني، فضلت [[ar]]: القيمة موجودة فمتغيرتش.

---

## ٣. [[?:]] مقابل [[??]] مع الصفر

~~~php
$qty = 0;
echo $qty ?: 'مفيش', ' / ', $qty ?? 'مفيش', "\n";
~~~

~~~text الناتج
مفيش / 0
~~~

| المعامل | بيسأل | مع [[0]] |
|---|---|---|
| [[$a ?: $b]] | [[$a]] truthy؟ (اختصار [[$a ? $a : $b]]) | [[0]] falsy، فخد [['مفيش']] |
| [[$a ?? $b]] | [[$a]] موجود ومش null؟ | [[0]] مش null، فخد [[0]] |

القيم الـ falsy: [[0]] و [[0.0]] و [[""]] و [["0"]] و array فاضي و [[null]] و [[false]]. فلو الصفر قيمة صحيحة (كمية، سعر، درجة) استخدم [[??]].

---

## ٤. الكلاسين

~~~php
class Address { public function __construct(public string $city) {} }
class User { public function __construct(public ?Address $address = null) {} }
~~~

ده تعريف نوعين objects بأقصر شكل (هتتشرح بالتفصيل في درس class في المستوى التالت):

- [[class Address]]: نوع اسمه Address.
- [[__construct(...)]]: الدالة اللي بتشتغل لما تعمل [[new Address(...)]].
- [[public string $city]] جوه الأقواس: بيعمل خانة (property) اسمها [[city]] وبيحط فيها القيمة اللي اتبعتت. ده اسمه constructor promotion.
- في [[User]]: الخانة [[address]] نوعها [[?Address]] يعني Address أو null، والافتراضي null.

---

## ٥. [[?->]]: وقّف لو null

~~~php
$u = new User();
echo $u->address?->city ?? 'مدينة مش معروفة', "\n";
~~~

- [[new User()]]: مستخدم من غير عنوان، فـ [[$u->address]] = null.
- [[->]] بيقرا خانة من object: [[$u->address]].
- [[?->]] (nullsafe): «لو اللي على الشمال null، متكمّلش ورجّع null». فـ [[$u->address?->city]] = null.
- [[?? 'مدينة مش معروفة']]: null، فخد الافتراضي.

~~~text الناتج
مدينة مش معروفة
~~~

ولما شلنا [[?]] و [[??]] (يعني [[$u->address->city]]):

~~~text الناتج
Warning: Attempt to read property "city" on null in /app/n.php on line 11
~~~

وسطر فاضي مكان المدينة.

---

## ٦. المستخدم اللي ليه عنوان

~~~php
$u2 = new User(new Address('Cairo'));
echo $u2->address?->city;
~~~

[[new Address('Cairo')]] بيعمل عنوان، وبيتبعت لـ [[User]]. هنا [[address]] مش null، فـ [[?->]] بيكمّل عادي ويقرا [[city]]:

~~~text الناتج
Cairo
~~~

---

## الخلاصة

| المعامل | يعني | Warning لو مش موجود؟ |
|---|---|---|
| [[$a ?? 'x']] | لو مش موجود أو null | لأ |
| [[$a ??= 'x']] | حط قيمة لو مفيش | لأ |
| [[$a ?: 'x']] | لو falsy (حتى 0 و "") | آه |
| [[$obj?->prop]] | لو [[$obj]] null رجّع null | لأ |

> [[??]] مع حقل فورم فاضي: [["" ?? "x"]] بيرجّع [[""]] (جربناها: [[string(0) ""]])، لأن النص الفاضي مش null.`,
          lines: [
            "بداية الملف.",
            "رقم الصفحة من الرابط، ولو مش موجود 1.",
            "طريقة الترتيب، والافتراضي newest.",
            "array فاضي.",
            "حط ar بس لو مفيش lang.",
            "صفر.",
            "[[?:]] شاف الصفر falsy فطبع «مفيش»، و [[??]] طبع 0.",
            "كلاس صغير: عنوان فيه مدينة.",
            "مستخدم عنوانه ممكن يبقى null.",
            "مستخدم من غير عنوان.",
            "[[?->]] رجّع null، و [[??]] حط الافتراضي.",
            "مستخدم بعنوان.",
            "Cairo."
          ],
          sol: R`مع [[?:]] في أول سطر: [[Warning: Undefined array key "page"]] والقيمة 1. [[?:]] بيقرا المفتاح الأول وبعدين يشوف هو truthy ولا لا، أما [[??]] بيسأل «موجود ومش null؟» من غير ما يقرا، فمفيش Warning.

مع [[->]] بدل [[?->]] ومن غير [[??]]: [[Warning: Attempt to read property "city" on null]] وبيطبع سطر فاضي. ولو سبت [[??]] في الآخر مش هتشوف الـ Warning أصلًا، لأن [[??]] بيحمي السلسلة كلها زي [[isset]]، ودا ممكن يخبّي bug حقيقي.

وسطر [[$qty]] بيطبع [[مفيش / 0]]: [[?:]] شاف 0 falsy فجاب البديل، و [[??]] شاف 0 مش null فسابه. للكميات والأسعار اللي ممكن تبقى صفر استخدم [[??]].`
        }
      ]
    }
]);
