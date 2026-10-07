// تكملة تاب php: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/php/01.js (شرح حقول الدرس في أوله)
MORE("php", [
    {
      t: "OOP في PHP الحديث",
      l: 3,
      n: "كلاسات بأنواع، و readonly، و interfaces، و enums، و property hooks: نفس أفكار TypeScript بصيغة PHP",
      items: [
        {
          cmd: "class",
          title: "object بيحمي بياناته: constructor promotion و readonly",
          desc: R`الكلاس قالب، و [[new]] بيعمل object منه. constructor promotion (PHP 8): [[public function __construct(public readonly int $amount)]] بيعرّف property ويملاها في سطر واحد. و [[readonly]] (8.1) معناها القيمة بتتحط مرة واحدة ومحدش يقدر يغيّرها بعد كده، فالـ object ثابت: أي عملية بترجّع object جديد.

والفلوس بتتخزن int بالقرش (10000 = 100 جنيه)، مش float. و [[new Money(10000)->add(...)]] من غير أقواس حوالين [[new]] ميزة جديدة في PHP 8.4.`,
          example: R`<?php
declare(strict_types=1);
final class Money {
    public function __construct(
        public readonly int $amount,
        public readonly string $currency = 'EGP',
    ) {
        if ($amount < 0) throw new InvalidArgumentException('المبلغ سالب');
    }
    public function add(Money $other): self {
        return new self($this->amount + $other->amount, $this->currency);
    }
}
$total = new Money(10000)->add(new Money(5000));
echo $total->amount;`,
          try: R`ضيف [[$total->amount = 1;]] واقرا [[Cannot modify readonly property]]. وجرّب [[new Money(-5)]]. وبعدين اطبع [[0.1 + 0.2 == 0.3]] بـ [[var_dump]] عشان تعرف ليه الفلوس مش float.`,
          flag: "script",
          deep: {
            why: "array زي [[['amount' => 100]]] أي حد يحط فيه أي حاجة: مبلغ سالب، أو نص، أو key غلط. الكلاس بيحط القواعد في مكان واحد: الـ constructor بيرفض القيم الغلط، والأنواع بتتفحص، و readonly بتضمن إن محدش يغيّر المبلغ من وراك بعد ما اتعمل.",
            how: R`الـ visibility: [[public]] أي حد، و [[protected]] الكلاس وأولاده، و [[private]] الكلاس بس. [[$this]] الـ object الحالي، و [[self]] الكلاس نفسه، و [[static]] الكلاس اللي اتنادى فعلًا (مع الوراثة).

[[readonly]] لازم يبقى معاها نوع، وبتتملي مرة من جوه الكلاس بس. أي محاولة تانية: [[Error]]. و [[readonly class]] (8.2) بتخلي كل الـ properties readonly. عشان «تعدّل» object ثابت بترجّع نسخة جديدة، زي [[add]] هنا.

الـ objects بتتبعت بالـ handle، مش بتتنسخ زي الـ arrays: لو اديت object لدالة وغيّرت فيه، الأصل بيتغير. وده سبب تاني إن readonly مريحة.

[[final]] بيمنع حد يورث من الكلاس. ابدأ بيه، وشيله لما تحتاج وراثة فعلًا.

و float مش دقيق في الكسور: [[0.1 + 0.2]] مش بالظبط [[0.3]]. الفلوس بالقرش كـ int، أو [[DECIMAL]] في القاعدة، أو [[BcMath\Number]] في 8.4.`,
            when: "أي بيانات ليها قواعد: مبلغ، إيميل، فترة زمنية، إعدادات. ده اسمه value object.",
            mistakes: R`كل الـ properties [[public]] ومن غير أنواع، فأي حد يكتب فيها أي حاجة. و getter و setter لكل property زي Java من غير سبب. و float للفلوس. و properties مش متعرّفة (dynamic properties) اتعملت deprecated في 8.2.`
          },
          teach: R`## المثال بيعمل إيه؟

بيعرّف كلاس [[Money]] بيمثّل مبلغ فلوس بالقرش، بيرفض المبلغ السالب، ومحدش يقدر يغيّر قيمته بعد ما يتعمل. وبعدين بيجمع ١٠٠ جنيه على ٥٠ جنيه ويطبع الناتج. كل الأوامر اتشغّلت جوه Docker على [[php:8.4-cli]].

---

## ١. أول سطرين

~~~php
<?php
declare(strict_types=1);
~~~

[[declare(strict_types=1)]] بيقول لـ PHP: «متحوّلش الأنواع لوحدك في الملف ده». من غيره، لو بعت النص [['100']] لـ parameter نوعه [[int]]، PHP بيحوّله رقم ويكمّل ساكت. معاه بيرمي غلطة:

~~~text الناتج (new Money('100') مع strict_types)
TypeError: Money::__construct(): Argument #1 ($amount) must be of type int, string given
~~~

> خلي بالك: [[strict_types]] بيتحسب حسب الملف اللي **بينادي** الدالة، مش الملف اللي هي متعرّفة فيه. جربناها من ملف مفيهوش السطر ده: [[new Money('100')]] عدّت ساكتة واتحوّلت [[100]].

---

## ٢. [[final class Money]]

~~~php
final class Money {
~~~

- [[class]]: قالب. بيوصف شكل الـ object (البيانات اللي فيه) والدوال اللي بتشتغل عليه (اسمها methods).
- [[Money]]: اسم الكلاس، والعادة إنه يبدأ بحرف كبير.
- [[final]]: محدش يقدر يعمل كلاس يورث منه. جربنا [[class X extends Money {}]]:

~~~text الناتج
Fatal error: Class X cannot extend final class Money in /app/class3.php on line 3
~~~

---

## ٣. الـ constructor و constructor promotion

~~~php
    public function __construct(
        public readonly int $amount,
        public readonly string $currency = 'EGP',
    ) {
~~~

[[__construct]] (شرطتين تحت قبلها) دالة خاصة PHP بينفّذها لوحده أول ما تكتب [[new Money(...)]]. وظيفتها تجهّز الـ object.

الحتة الجديدة إن الـ parameters نفسها مكتوب قبلها [[public readonly]]. ده اسمه **constructor promotion** (من PHP 8): PHP بيعمل property بنفس الاسم ويحط فيها القيمة لوحده. يعني السطرين دول بيعملوا نفس اللي كان بيتكتب زمان كده:

~~~php
public readonly int $amount;
public function __construct(int $amount) {
    $this->amount = $amount;
}
~~~

| الكلمة | معناها |
|---|---|
| [[public]] | أي حد برّه الكلاس يقدر يقرا [[$total->amount]] |
| [[readonly]] | القيمة بتتحط مرة واحدة بس (PHP 8.1)، وأي كتابة بعدها غلطة |
| [[int]] | النوع: رقم صحيح بس. وعلى readonly النوع إجباري |
| [[$amount]] | اسم الـ property |
| [[= 'EGP']] | قيمة افتراضية لو محدش بعت عملة |
| الفاصلة بعد آخر parameter | مسموحة (من PHP 8)، بتسهّل إضافة parameter جديد |

---

## ٤. القاعدة جوه الـ constructor

~~~php
        if ($amount < 0) throw new InvalidArgumentException('المبلغ سالب');
    }
~~~

[[throw]] بيرمي exception ويوقف التنفيذ. و [[InvalidArgumentException]] كلاس exception جاهز في PHP معناه «القيمة اللي اتبعتت غلط». جربنا [[new Money(-5)]]:

~~~text الناتج
Fatal error: Uncaught InvalidArgumentException: المبلغ سالب in /app/classdef.php:8
Stack trace:
#0 /app/class6.php(7): Money->__construct(-5)
~~~

ولأن الـ constructor هو الباب الوحيد لعمل [[Money]]، مستحيل يبقى عندك object فيه مبلغ سالب.

---

## ٥. [[add]]: بترجّع object جديد

~~~php
    public function add(Money $other): self {
        return new self($this->amount + $other->amount, $this->currency);
    }
}
~~~

| الحتة | معناها |
|---|---|
| [[Money $other]] | الـ parameter لازم يكون object من [[Money]] |
| [[: self]] | الدالة بترجّع object من نفس الكلاس |
| [[$this]] | الـ object اللي اتنادت عليه الدالة |
| [[->]] | «هات من الـ object ده» property أو method |
| [[new self(...)]] | اعمل object جديد من نفس الكلاس |

[[add]] مبتغيّرش [[$this->amount]] (أصلًا مينفعش، readonly). بتحسب المجموع وتعمل [[Money]] جديد. جربنا [[$b = $a->add(...)]] وبعدين [[var_dump($a === $b, $a->amount)]]:

~~~text الناتج
bool(false)
int(100)
~~~

يعني [[$a]] زي ما هو (100)، و [[$b]] object تاني خالص.

---

## ٦. السطر الأخير: [[new]] من غير أقواس (PHP 8.4)

~~~php
$total = new Money(10000)->add(new Money(5000));
echo $total->amount;
~~~

الترتيب: [[new Money(5000)]] الأول (لأنه argument)، وبعدين [[new Money(10000)]]، وبعدين [[->add(...)]] عليه، والناتج يتحط في [[$total]]. قبل 8.4 كان لازم تكتب [[(new Money(10000))->add(...)]] بأقواس حوالين [[new]]، وإلا Parse error.

~~~text الناتج
15000
~~~

يعني ١٥٠ جنيه، لأن المبلغ بالقرش. ولو عملت [[var_dump($total)]]:

~~~text الناتج
object(Money)#3 (2) {
  ["amount"]=>
  int(15000)
  ["currency"]=>
  string(3) "EGP"
}
~~~

[[#3]] رقم الـ object: ده التالت اللي اتعمل (5000 ثم 10000 ثم المجموع).

---

## ٧. ليه int بالقرش مش float؟

~~~php
var_dump(0.1 + 0.2 == 0.3);
printf("%.20f\n", 0.1 + 0.2);
~~~

~~~text الناتج
bool(false)
0.30000000000000004441
~~~

الكمبيوتر بيخزن الـ float بالـ binary، و [[0.1]] مالهاش تمثيل مظبوط فيه (زي ١/٣ في العشري). فالفرق الصغير ده بيتجمّع مع كل عملية. الـ int مفيهوش المشكلة دي: [[10000 + 5000]] هي [[15000]] بالظبط.

---

## الخلاصة

| الحاجة | بتعمل إيه |
|---|---|
| constructor promotion | property وقيمتها في سطر واحد |
| [[readonly]] | القيمة تتحط مرة، والتعديل [[Error: Cannot modify readonly property]] |
| قاعدة في الـ constructor | مفيش object غلط يتعمل أصلًا |
| [[add]] بترجّع [[new self]] | بدل ما تعدّل، اعمل نسخة جديدة |
| [[final]] | محدش يورث من الكلاس |
| الفلوس | [[int]] بالقرش، مش float |`,
          lines: [
            "بداية الملف.",
            "أنواع صارمة.",
            "كلاس محدش يورث منه.",
            "constructor...",
            "...property عامة للقراية، متتغيرش، بتتعرّف وتتملي هنا.",
            "...وعملة بقيمة افتراضية.",
            "جسم الـ constructor.",
            "قاعدة: مبلغ سالب مرفوض.",
            "قفلة.",
            "الجمع بيرجّع object جديد من نفس النوع.",
            "مبيعدّلش الحالي، بيعمل واحد جديد.",
            "قفلة.",
            "قفلة الكلاس.",
            "PHP 8.4: [[new]] وبعدها method على طول.",
            "15000 (يعني 150 جنيه)."
          ],
          sol: R`المثال بيطبع [[15000]]. [[$total->amount = 1;]]: [[Error: Cannot modify readonly property Money::$amount]]. عشان تغيّر مبلغ لازم تعمل object جديد، زي ما [[add]] بتعمل.

[[new Money(-5)]]: [[InvalidArgumentException: المبلغ سالب]]. الـ constructor هو الباب الوحيد، فمستحيل يبقى عندك Money سالب في أي حتة في الكود.

[[var_dump(0.1 + 0.2 == 0.3)]] بيطلّع [[bool(false)]]، لأن [[0.1 + 0.2]] فعليًا [[0.30000000000000004441]]. عشان كده المبلغ [[int]] بالقروش (10000 = 100 جنيه)، وفي القاعدة [[DECIMAL(10,2)]] أو [[INT]] مش [[FLOAT]]. ولو [[new Money(10000)->add(...)]] من غير أقواس حوالين [[new]] طلّع Parse error، يبقى انت على PHP أقدم من 8.4.`
        },
        {
          cmd: "interface و abstract",
          title: "عقد يلتزم بيه كذا كلاس، وأساس مشترك بينهم",
          desc: R`الـ interface عقد: أسماء methods وأنواعها من غير تنفيذ، والكلاس ممكن ينفّذ أكتر من interface. الـ abstract class أساس فيه كود مشترك و methods ناقصة لازم الابن يكمّلها، والكلاس يورث من واحد بس.

الفايدة الكبيرة: دالة بتاخد [[PaymentGateway]] (الـ interface) مش كلاس معين، فتقدر تديها بوابة دفع حقيقية في الإنتاج و fake في الاختبار من غير ما تغيّر سطر فيها.`,
          example: R`<?php
interface PaymentGateway {
    public function charge(int $amount): string;
}
abstract class BaseGateway implements PaymentGateway {
    public function __construct(protected string $apiKey) {}
    protected function log(string $msg): void { error_log(static::class . ": $msg"); }
}
final class FakeGateway extends BaseGateway {
    public function charge(int $amount): string {
        $this->log("charge $amount");
        return 'txn_' . bin2hex(random_bytes(4));
    }
}
function checkout(PaymentGateway $gw): string { return $gw->charge(500); }
echo checkout(new FakeGateway('YOUR_KEY'));`,
          try: R`شيل method [[charge]] من [[FakeGateway]] واقرا الغلطة: PHP بيرفض الكلاس من قبل ما يشتغل. بعدين اعمل كلاس تاني [[LoggingGateway]] بينفّذ الـ interface مباشرة من غير الـ abstract، وابعته لـ [[checkout]].`,
          flag: "script",
          deep: {
            why: "لو [[checkout]] بتعمل [[new RealGateway()]] جواها، مستحيل تختبرها من غير ما تدفع فلوس حقيقية، ومستحيل تغيّر بوابة الدفع من غير ما تفتح كل الدوال. الـ interface بيفصل «محتاج حد يعمل charge» عن «مين بالظبط».",
            how: R`[[implements]] للـ interfaces (أكتر من واحد مسموح)، و [[extends]] للكلاس (واحد بس). الكلاس اللي مبينفّذش كل methods الـ interface لازم يبقى abstract، وإلا PHP بيرفضه.

الـ abstract class ينفع يبقى فيه constructor و properties و methods كاملة (زي [[log]]) و methods [[abstract]] من غير جسم. ومينفعش تعمل منه [[new]].

[[static::class]] جوه الأب بيرجّع اسم الكلاس الفعلي ([[FakeGateway]])، مش [[BaseGateway]]. ده late static binding.

ده تطبيق لـ dependency inversion: الكود العالي ([[checkout]]) بيعتمد على abstraction، والتفاصيل (Paymob أو Stripe أو Fake) بتتحقن من برّه. و Laravel مبني على الفكرة دي: الـ container بيربط interface بكلاس.`,
            when: "لما يبقى فيه أكتر من تنفيذ فعلًا (بوابتين دفع، تخزين محلي و S3، إيميل حقيقي و fake)، أو محتاج تستبدل حاجة في الاختبار.",
            mistakes: R`interface لكل كلاس حتى لو ليه تنفيذ واحد وعمره ما هيتبدّل: تعقيد من غير فايدة. وسلاسل وراثة طويلة (A يورث B يورث C) عشان تشارك كود: غالبًا التركيب (object جوه object) أو trait أحسن.`
          },
          teach: R`## المثال بيعمل إيه؟

٣ طبقات: عقد ([[interface]]) بيقول «أي بوابة دفع لازم يبقى فيها [[charge]]»، وأساس مشترك ([[abstract class]]) فيه كود بيتكرر، وكلاس حقيقي ([[FakeGateway]]) بيكمّل الناقص. ودالة [[checkout]] بتشتغل مع أي حاجة بتنفّذ العقد. اتشغّل جوه Docker على [[php:8.4-cli]].

---

## ١. الـ interface: العقد

~~~php
interface PaymentGateway {
    public function charge(int $amount): string;
}
~~~

- [[interface]]: لستة methods بأسمائها وأنواعها **من غير جسم** (مفيش [[{ }]]، السطر بيخلص بـ [[;]]).
- [[charge(int $amount): string]]: أي كلاس عايز يبقى [[PaymentGateway]] لازم يبقى فيه method بالاسم ده، بتاخد رقم وترجّع نص (رقم العملية).
- كل methods الـ interface لازم تبقى [[public]].

الـ interface مبيعملش حاجة لوحده. هو مجرد وعد.

---

## ٢. الـ abstract class: أساس مشترك

~~~php
abstract class BaseGateway implements PaymentGateway {
    public function __construct(protected string $apiKey) {}
    protected function log(string $msg): void { error_log(static::class . ": $msg"); }
}
~~~

| الحتة | معناها |
|---|---|
| [[abstract]] | كلاس ناقص: مينفعش تعمل منه [[new]] |
| [[implements PaymentGateway]] | بيوعد إنه هيلتزم بالعقد. ولأنه abstract، مسموح يسيب [[charge]] للابن |
| [[protected string $apiKey]] | constructor promotion؛ و [[protected]] يعني الكلاس ده واللي بيورثوا منه بس يشوفوه |
| [[protected function log]] | method كاملة بيورثها كل الأبناء |
| [[: void]] | الدالة مبترجّعش حاجة |
| [[error_log(...)]] | بيكتب رسالة في الـ log. في الترمنال بتطلع على الـ stderr |
| [[static::class]] | اسم الكلاس **الفعلي** اللي اتعمل منه الـ object (late static binding) |
| [[.]] | لزق نصوص |

جربنا [[new BaseGateway('k')]]:

~~~text الناتج
Cannot instantiate abstract class BaseGateway
~~~

وجربنا ننادي [[log]] من برّه: [[(new FakeGateway('k'))->log('x')]]:

~~~text الناتج
Call to protected method BaseGateway::log() from global scope
~~~

---

## ٣. الكلاس الحقيقي

~~~php
final class FakeGateway extends BaseGateway {
    public function charge(int $amount): string {
        $this->log("charge $amount");
        return 'txn_' . bin2hex(random_bytes(4));
    }
}
~~~

- [[extends BaseGateway]]: بيورث الـ constructor و [[log]]. والوراثة من كلاس واحد بس.
- [[charge]]: ده الجزء الناقص اللي العقد طالبه.
- [[$this->log(...)]]: بينادي method الأب كأنها بتاعته.
- [[random_bytes(4)]]: ٤ بايت عشوائية آمنة، و [[bin2hex]] بيحوّلهم لـ ٨ حروف hex (0-9 و a-f)، فيطلع حاجة زي [[txn_555d050f]].

---

## ٤. الدالة بتطلب العقد، مش الكلاس

~~~php
function checkout(PaymentGateway $gw): string { return $gw->charge(500); }
echo checkout(new FakeGateway('YOUR_KEY'));
~~~

[[PaymentGateway $gw]] معناها: «ابعتلي أي object بينفّذ العقد ده». [[checkout]] متعرفش ولا يهمها هو Fake ولا Stripe ولا Paymob.

~~~text الناتج
FakeGateway: charge 500
txn_555d050f
~~~

السطر الأول من [[error_log]]، و [[static::class]] طلّع [[FakeGateway]] مش [[BaseGateway]] رغم إن الكود مكتوب في الأب. والسطر التاني رقم العملية، وبيتغير كل مرة.

ولو بعتنا حاجة مش بتنفّذ العقد: [[checkout(new stdClass)]]:

~~~text الناتج
checkout(): Argument #1 ($gw) must be of type PaymentGateway, stdClass given
~~~

---

## ٥. لو الكلاس مكمّلش العقد

شلنا [[charge]] من [[FakeGateway]] وحطينا بعد الكلاس [[echo "before\n";]]:

~~~text الناتج
Fatal error: Class FakeGateway contains 1 abstract method and must therefore be declared abstract or implement the remaining methods (PaymentGateway::charge) in /app/if2.php on line 9
~~~

و [[before]] مطلعتش خالص: PHP بيفحص الكلاس وهو بيعرّفه، قبل ما أي سطر تاني يشتغل.

---

## ٦. الحل: كلاس من غير الأساس

~~~php
final class LoggingGateway implements PaymentGateway {
    public function charge(int $amount): string {
        echo "[LoggingGateway] charge $amount\n";
        return 'log_' . $amount;
    }
}
echo checkout(new FakeGateway('YOUR_KEY')), "\n";
echo checkout(new LoggingGateway()), "\n";
~~~

[[LoggingGateway]] مش وارث من [[BaseGateway]] خالص، بس بينفّذ العقد، فـ [[checkout]] قبلته. والفاصلة في [[echo a, b]] بتطبع الاتنين ورا بعض.

~~~text الناتج
FakeGateway: charge 500
txn_41f8f46a
[LoggingGateway] charge 500
log_500
~~~

و [[instanceof]] بيأكد: [[new FakeGateway('k') instanceof PaymentGateway]] طلعت [[bool(true)]]، لأن الأب نفّذ العقد فالابن كمان.

---

## الخلاصة

| | [[interface]] | [[abstract class]] |
|---|---|---|
| فيه كود؟ | لأ، أسماء وأنواع بس | آه، ومعاه methods ناقصة |
| properties و constructor | لأ (من 8.4 ممكن يطلب property بـ hooks، درس «property hooks») | آه |
| الكلاس ياخد كام؟ | كذا واحد بـ [[implements]] | واحد بس بـ [[extends]] |
| [[new]] منه | لأ | لأ |
| الفايدة | دالة تطلب «أي حد بيعمل كذا» | كود مشترك بين الأبناء |`,
          lines: [
            "بداية الملف.",
            "العقد.",
            "أي بوابة دفع لازم يبقى فيها charge بالشكل ده.",
            "قفلة.",
            "أساس مشترك بينفّذ العقد جزئيًا.",
            "مفتاح الـ API، متاح للأبناء.",
            "method مشتركة، و [[static::class]] اسم الكلاس الفعلي.",
            "قفلة.",
            "تنفيذ حقيقي للعقد.",
            "الـ method اللي العقد طالبها.",
            "بيستخدم كود الأب.",
            "رقم عملية وهمي.",
            "قفلة.",
            "قفلة.",
            "الدالة عايزة أي حاجة بتنفّذ العقد.",
            "ابعتلها الـ fake."
          ],
          sol: R`من غير [[charge]] في [[FakeGateway]]: [[Fatal error: Class FakeGateway contains 1 abstract method and must therefore be declared abstract or implement the remaining methods (PaymentGateway::charge)]]، والغلطة بتطلع أول ما PHP يوصل لتعريف الكلاس (قبل ما [[checkout]] يتنادى أصلًا)، مش لما حد ينادي [[charge]]: PHP بيفحص إن الكلاس مكمّل كل الـ methods وهو بيعرّفه.

[[LoggingGateway]] بيعدّي لـ [[checkout]] عادي رغم إنه مش وارث من [[BaseGateway]]، لأن [[checkout]] طالب الـ interface بس. الناتج مثلًا [[txn_26a81e2e]] للأول و [[log_500]] للتاني، وسطر [[FakeGateway: charge 500]] من [[error_log]] بيظهر في الترمنال.`,
          solCode: R`final class LoggingGateway implements PaymentGateway {
    public function charge(int $amount): string {
        echo "[LoggingGateway] charge $amount\n";
        return 'log_' . $amount;
    }
}
echo checkout(new FakeGateway('YOUR_KEY')), "\n";
echo checkout(new LoggingGateway()), "\n";`
        },
        {
          cmd: "trait",
          title: "شارك methods بين كلاسات ملهاش علاقة ببعض",
          desc: R`الـ trait مجموعة methods و properties بتتنسخ جوه الكلاس بـ [[use]]، كأنك كتبتها فيه بإيدك. مش نوع، ومش وراثة: الكلاس ممكن ياخد كذا trait، ويفضل يورث من أي كلاس هو عايزه.

مثال مشهور: [[SoftDeletes]] و [[HasFactory]] في Laravel، سلوك صغير بيتكرر في موديلات كتير.`,
          example: R`<?php
trait HasTimestamps {
    public ?DateTimeImmutable $createdAt = null;
    public function touch(): void {
        $this->createdAt ??= new DateTimeImmutable();
    }
}
trait SoftDeletes {
    public ?DateTimeImmutable $deletedAt = null;
    public function softDelete(): void { $this->deletedAt = new DateTimeImmutable(); }
    public function trashed(): bool { return $this->deletedAt !== null; }
}
class Post {
    use HasTimestamps, SoftDeletes;
}
$p = new Post();
$p->touch();
$p->softDelete();
var_dump($p->trashed());`,
          try: R`ضيف [[class Comment { use SoftDeletes; }]] وجرّب نفس الـ methods. بعدين اعمل method اسمها [[touch]] في trait تاني وخلي [[Post]] ياخد الاتنين: هتاخد غلطة تعارض، وحلها بـ [[insteadof]].`,
          flag: "script",
          deep: {
            why: "PHP فيه وراثة واحدة بس. لو [[Post]] و [[Comment]] و [[User]] محتاجين نفس الـ soft delete، ومش منطقي يورثوا من نفس الأب، الـ trait بيدّيهم الكود من غير ما يلزق أشجار الوراثة في بعض.",
            how: R`وقت الـ compile، PHP بينسخ محتوى الـ trait جوه الكلاس. فـ [[$this]] جوه الـ trait هو الـ object بتاع الكلاس اللي استخدمه.

الـ trait مش نوع: مينفعش [[function f(SoftDeletes $x)]]، و [[$p instanceof SoftDeletes]] دايمًا false. لو محتاج نوع، اعمل interface والـ trait ينفّذ الـ methods بتاعته. و [[class_uses($p)]] بيقولك الكلاس بيستخدم أنهي traits.

التعارض: لو traitين فيهم نفس الـ method، [[use A, B { A::touch insteadof B; B::touch as touchB; }]]. والـ trait ممكن يبقى فيه [[abstract]] methods يطلبها من الكلاس، و static methods.`,
            when: "سلوك صغير ومستقل بيتكرر في كلاسات مختلفة: timestamps، soft delete، logging، تحويل لـ array.",
            mistakes: R`trait بيفترض إن الكلاس فيه property معينة من غير ما يقول (اعتماد مستخبي). و traits ضخمة فيها نص منطق التطبيق، فالكلاس بقى ١٠ traits ومحدش فاهم الـ method دي جاية منين. وتستخدم trait مكان interface وانت محتاج نوع.`
          },
          teach: R`## المثال بيعمل إيه؟

بيعمل traitين: واحد بيسجّل وقت الإنشاء، والتاني بيعمل «مسح منطقي» (soft delete: نعلّم الصف إنه اتمسح من غير ما نمسحه من القاعدة). وبعدين كلاس [[Post]] بياخد الاتنين بسطر واحد. اتشغّل جوه Docker على [[php:8.4-cli]].

---

## ١. أول trait

~~~php
trait HasTimestamps {
    public ?DateTimeImmutable $createdAt = null;
    public function touch(): void {
        $this->createdAt ??= new DateTimeImmutable();
    }
}
~~~

[[trait]] شكله زي الكلاس، بس مينفعش تعمل منه [[new]]. هو حتة كود مستنية كلاس ياخدها.

| الحتة | معناها |
|---|---|
| [[?DateTimeImmutable]] | النوع: object تاريخ ووقت، و [[?]] قبله يعني «أو [[null]]» |
| [[DateTimeImmutable]] | كلاس جاهز في PHP للتاريخ، و immutable يعني أي تعديل بيرجّع object جديد |
| [[= null]] | القيمة في الأول: لسه متعملش |
| [[??=]] | «حط القيمة دي **لو** الخانة [[null]] بس». يعني [[touch]] أول مرة بتحط الوقت، والمرات اللي بعدها مبتغيّرش حاجة |
| [[new DateTimeImmutable()]] | من غير arguments = دلوقتي |

جربنا [[touch()]] مرتين وقارنّا: [[var_dump($first === $p->createdAt)]] طلعت [[bool(true)]]، يعني التانية مغيّرتش الوقت.

---

## ٢. التاني trait

~~~php
trait SoftDeletes {
    public ?DateTimeImmutable $deletedAt = null;
    public function softDelete(): void { $this->deletedAt = new DateTimeImmutable(); }
    public function trashed(): bool { return $this->deletedAt !== null; }
}
~~~

- [[softDelete]]: بتحط وقت المسح في [[$deletedAt]]. في Laravel الخانة دي عمود [[deleted_at]] في الجدول، والصف بيفضل موجود.
- [[trashed]]: [[!==]] يعني «مش متطابق»، فبترجّع [[true]] لو فيه وقت مسح.

---

## ٣. الكلاس بياخدهم بـ [[use]]

~~~php
class Post {
    use HasTimestamps, SoftDeletes;
}
~~~

[[use]] **جوه** الكلاس معناها «انسخ محتوى الـ traits دي هنا». (و [[use]] **برّه** الكلاس في أول الملف حاجة تانية خالص: اختصار لاسم namespace، هتشوفها في درس PSR-4.)

PHP بينسخ الكود وقت الـ compile، فـ [[Post]] بقى فيه properties و methods كأنك كتبتها فيه بإيدك. جربنا [[get_object_vars($p)]] بعد [[touch()]]:

~~~text الناتج
Array
(
    [createdAt] => DateTimeImmutable Object
        (
            [date] => 2026-10-07 16:32:59.890007
            [timezone_type] => 3
            [timezone] => UTC
        )

    [deletedAt] =>
)
~~~

الـ properties الاتنين بقوا جوه الـ object نفسه. والوقت UTC لأن جوه الـ container مفيش timezone متظبطة.

---

## ٤. الاستخدام

~~~php
$p = new Post();
$p->touch();
$p->softDelete();
var_dump($p->trashed());
~~~

~~~text الناتج
bool(true)
~~~

و [[$p->trashed()]] قبل [[softDelete()]] كانت [[bool(false)]].

---

## ٥. الـ trait مش نوع

~~~php
print_r(class_uses($p));
var_dump($p instanceof SoftDeletes);
~~~

~~~text الناتج
Array
(
    [HasTimestamps] => HasTimestamps
    [SoftDeletes] => SoftDeletes
)
bool(false)
~~~

[[class_uses]] بيقولك الكلاس بياخد أنهي traits، بس [[instanceof]] بيقول لأ: الـ trait نسخ كود، مش نوع زي الـ interface.

---

## ٦. تعارض اسمين

لو trait تالت فيه [[touch]] برضه:

~~~php
trait Touchable {
    public function touch(): void { echo "Touchable::touch\n"; }
}
class Post { use HasTimestamps, SoftDeletes, Touchable; }
~~~

~~~text الناتج
Fatal error: Trait method Touchable::touch has not been applied as Post::touch, because of collision with HasTimestamps::touch in /app/tr3.php on line 6
~~~

PHP مش هيختار لوحده. الحل بقوسين بعد [[use]]:

~~~php
class Post {
    use HasTimestamps, SoftDeletes, Touchable {
        HasTimestamps::touch insteadof Touchable;
        Touchable::touch as touchLog;
    }
}
~~~

| السطر | معناه |
|---|---|
| [[HasTimestamps::touch insteadof Touchable;]] | [[touch]] تيجي من [[HasTimestamps]] **بدل** [[Touchable]] |
| [[Touchable::touch as touchLog;]] | وخلي [[touch]] بتاعة [[Touchable]] موجودة باسم تاني [[touchLog]] |
| [[::]] | «الـ method دي من الـ trait ده» |

~~~php
$p = new Post();
$p->touch();
$p->touchLog();
$c = new Comment();   // class Comment { use SoftDeletes; }
$c->softDelete();
var_dump($c->trashed());
~~~

~~~text الناتج
Touchable::touch
bool(true)
~~~

[[touch()]] مطبعتش حاجة (بتاعة [[HasTimestamps]] بتحط الوقت بس)، و [[touchLog()]] طبعت. و [[Comment]] خد [[SoftDeletes]] لوحده واشتغل.

جربنا كمان [[as]] لوحدها من غير [[insteadof]]: نفس الـ Fatal error بتاع التعارض، لأن [[as]] بتضيف اسم جديد بس والاسم [[touch]] لسه متعارض.

---

## الخلاصة

| | trait | وراثة ([[extends]]) | interface |
|---|---|---|---|
| بينقل كود؟ | آه، بينسخه | آه | لأ |
| الكلاس ياخد كام؟ | كذا واحد | واحد | كذا واحد |
| نوع ([[instanceof]])؟ | لأ | آه | آه |
| التعارض | [[insteadof]] و [[as]] | الابن بيكتب فوق الأب | مفيش كود يتعارض |`,
          lines: [
            "بداية الملف.",
            "trait أول.",
            "property هتتنسخ في الكلاس.",
            "method...",
            "...بتحط الوقت لو مش موجود.",
            "قفلة.",
            "قفلة.",
            "trait تاني.",
            "property.",
            "مسح منطقي (من غير DELETE).",
            "اتمسح؟",
            "قفلة.",
            "كلاس عادي...",
            "...بياخد الاتنين.",
            "قفلة.",
            "object.",
            "من الـ trait الأول.",
            "من التاني.",
            "true."
          ],
          sol: R`[[Comment]] بياخد [[softDelete]] و [[trashed]] زي [[Post]] بالظبط: [[trashed()]] false في الأول و true بعد [[softDelete()]].

trait تاني فيه [[touch]] ومن غير حل: [[Fatal error: Trait method Touchable::touch has not been applied as Post::touch, because of collision with HasTimestamps::touch]]. الحل بـ [[insteadof]] بتختار واحدة، و [[as]] بتدّي التانية اسم تاني لو محتاجها.

لو كتبت [[as]] لوحدها من غير [[insteadof]] هيفضل التعارض، لأن [[as]] بتضيف اسم جديد بس ومبتحلّش الاسم الأصلي.`,
          solCode: R`<?php
trait Touchable {
    public function touch(): void { echo "Touchable::touch\n"; }
}
class Post {
    use HasTimestamps, SoftDeletes, Touchable {
        HasTimestamps::touch insteadof Touchable;
        Touchable::touch as touchLog;
    }
}
class Comment { use SoftDeletes; }
$p = new Post();
$p->touch();     // بتاعة HasTimestamps
$p->touchLog();  // Touchable::touch
$c = new Comment();
$c->softDelete();
var_dump($c->trashed()); // bool(true)`
        },
        {
          cmd: "enum",
          title: "لستة قيم ثابتة بدل نصوص متفرقة في الكود",
          desc: R`[[enum]] (PHP 8.1) نوع ليه قيم محددة بس. الـ backed enum كل حالة ليها قيمة ([[string]] أو [[int]]) بتتخزن في القاعدة. [[from()]] بيحوّل من القيمة للـ enum ويرمي لو غلط، و [[tryFrom()]] بيرجّع null. والـ enum ممكن يبقى فيه methods، زي [[label()]] للنص العربي.

كده الـ status نوع: دالة بتاخد [[OrderStatus]] مستحيل يوصلها [['payed']] بغلطة إملائية.`,
          example: R`<?php
enum OrderStatus: string {
    case Pending = 'pending';
    case Paid = 'paid';
    case Shipped = 'shipped';
    public function label(): string {
        return match ($this) {
            self::Pending => 'في الانتظار',
            self::Paid    => 'اتدفع',
            self::Shipped => 'اتشحن',
        };
    }
}
$status = OrderStatus::from($row['status']);
echo $status->label(), ' ', $status->value;
$filter = OrderStatus::tryFrom($_GET['status'] ?? '') ?? OrderStatus::Pending;`,
          try: R`ضيف [[case Cancelled = 'cancelled';]] ومتضيفهاش في [[match]]: أول ما تنادي [[label()]] عليها هتاخد [[UnhandledMatchError]]، فمش هتنسى. وجرّب [[OrderStatus::from('nope')]] واقرا الـ ValueError، وقارنها بـ [[tryFrom]].`,
          flag: "script",
          deep: {
            why: "الحالات كنصوص ([['pending']] و [['paid']]) بتبقى متفرقة في عشرين ملف، وكل ملف بيعمل allowlist بإيده، وغلطة إملائية واحدة بتعدّي. الـ enum بيجمّعهم في مكان واحد ونوع واحد.",
            how: R`الحالات objects ثابتة (singletons)، فالمقارنة [[===]]: [[$status === OrderStatus::Paid]]. ومقارنتها بنص [[$status === 'paid']] دايمًا false؛ قارن بـ [[->value]] أو حوّل النص الأول.

[[->value]] القيمة اللي في القاعدة، و [[->name]] اسم الحالة ([[Paid]])، و [[OrderStatus::cases()]] كل الحالات (مفيد لـ dropdown). و [[json_encode]] بيطلّع القيمة.

[[from]] بيرمي [[ValueError]]، فمع أي قيمة جاية من المستخدم استخدم [[tryFrom]] وقرر انت تعمل إيه لو null.

والـ enum ينفع ينفّذ interface ويبقى فيه constants و static methods، بس مفيهوش properties ولا [[new]].

في القاعدة: عمود [[VARCHAR]] بيخزن الـ value أبسط من عمود [[ENUM]] في MySQL، لأن إضافة حالة في [[ENUM]] محتاجة [[ALTER TABLE]].`,
            when: "status، و role، ونوع اشتراك، وأي حقل ليه قيم محددة معروفة.",
            mistakes: R`في مشروع حقيقي حالات العميل كانت نصوص زي [['pending']] و [['active']] و [['hold']]، ومعاها allowlist بـ [[in_array]] متكررة في كذا endpoint، وحالة اسمها [['unactive']] (غلطة إملائية) عايشة في القاعدة للأبد. enum واحد كان هيجمّعهم ويخلي الغلطة في مكان واحد يتصلّح. و [[from($_GET[...])]] مباشرة فأي قيمة غلط = صفحة 500.`
          },
          teach: R`## المثال بيعمل إيه؟

بيعرّف نوع اسمه [[OrderStatus]] ليه ٣ حالات بس (في الانتظار، اتدفع، اتشحن)، كل حالة ليها قيمة نصية بتتخزن في القاعدة ونص عربي للعرض. وبعدين بيحوّل قيمة جاية من القاعدة وقيمة جاية من الرابط لـ enum. اتشغّل جوه Docker على [[php:8.4-cli]]، ومعرّفين قبله [[$row = ['status' => 'paid'];]] عشان يشتغل لوحده.

---

## ١. تعريف الـ enum

~~~php
enum OrderStatus: string {
    case Pending = 'pending';
    case Paid = 'paid';
    case Shipped = 'shipped';
~~~

| الحتة | معناها |
|---|---|
| [[enum]] | نوع ليه قيم محددة بس (PHP 8.1) |
| [[: string]] | backed enum: كل حالة ليها قيمة نصية (ممكن [[int]] بدلها) |
| [[case Paid]] | حالة اسمها [[Paid]]، وده اللي بتكتبه في الكود |
| [[= 'paid']] | القيمة اللي بتتخزن في القاعدة أو تيجي في الرابط |

الاسم ([[name]]) للكود، والقيمة ([[value]]) للتخزين. لو غيّرت الاسم بعدين القاعدة متتأثرش.

---

## ٢. method جوه الـ enum

~~~php
    public function label(): string {
        return match ($this) {
            self::Pending => 'في الانتظار',
            self::Paid    => 'اتدفع',
            self::Shipped => 'اتشحن',
        };
    }
}
~~~

- [[$this]] هنا الحالة نفسها اللي اتنادت عليها الدالة (مثلًا [[OrderStatus::Paid]]).
- [[self::Paid]]: [[self]] يعني الـ enum ده نفسه، و [[::]] بيوصل لحالة جواه.
- [[match]] بيقارن بـ [[===]] ويرجّع النص المطابق (درس [[match]]). ومفيش [[default]] عن قصد، الفايدة في الخطوة ٦.

---

## ٣. من القيمة للـ enum: [[from]]

~~~php
$status = OrderStatus::from($row['status']);
echo $status->label(), ' ', $status->value;
~~~

[[OrderStatus::from('paid')]] بيدوّر على الحالة اللي قيمتها [['paid']] ويرجّعها. وبعدين [[->label()]] و [[->value]]:

~~~text الناتج
اتدفع paid
~~~

جربنا قيمة مش موجودة [[OrderStatus::from('nope')]]:

~~~text الناتج
Fatal error: Uncaught ValueError: "nope" is not a valid backing value for enum OrderStatus in /app/en1.php:26
~~~

ولو شغّلت المثال من غير [[$row]] خالص، هتشوف سلسلة: [[Warning: Undefined variable $row]]، وبعدها [[Warning: Trying to access array offset on null]]، وبعدها [[Deprecated: OrderStatus::from(): Passing null to parameter #1 ($value) of type string|int is deprecated]]، وفي الآخر [[ValueError: "0" is not a valid backing value]].

---

## ٤. من الرابط: [[tryFrom]] و [[??]]

~~~php
$filter = OrderStatus::tryFrom($_GET['status'] ?? '') ?? OrderStatus::Pending;
~~~

من جوه لبرة:

1. [[$_GET['status'] ?? '']]: قيمة [[?status=]] من الرابط، ولو مش موجودة نص فاضي. (في الترمنال [[$_GET]] فاضي، فطلعت [['']].)
2. [[OrderStatus::tryFrom('')]]: زي [[from]] بس لو القيمة غلط بيرجّع [[null]] بدل ما يرمي. جربنا [[var_dump(OrderStatus::tryFrom('nope'))]] وطلعت [[NULL]].
3. [[?? OrderStatus::Pending]]: لو [[null]]، خد [[Pending]].

~~~text الناتج (var_dump($filter))
enum(OrderStatus::Pending)
~~~

القاعدة: [[from]] للقيم اللي جاية من قاعدتك (لو غلط يبقى bug لازم يبان)، و [[tryFrom]] للي جاي من المستخدم (لو غلط مش مشكلتك، اختار افتراضي).

---

## ٥. المقارنة و [[name]] و [[cases]]

جربنا:

~~~php
echo $status->name, "\n";
var_dump($status === OrderStatus::Paid, $status === 'paid', $status == 'paid');
echo json_encode(['s' => $status]), "\n";
print_r(array_map(fn($c) => $c->value, OrderStatus::cases()));
~~~

~~~text الناتج
Paid
bool(true)
bool(false)
bool(false)
{"s":"paid"}
Array
(
    [0] => pending
    [1] => paid
    [2] => shipped
)
~~~

- [[->name]] اسم الحالة في الكود.
- [[=== OrderStatus::Paid]] صح، لأن كل حالة object واحد بس في البرنامج كله. لكن مقارنتها بالنص [['paid']] (حتى بـ [[==]]) دايمًا false: قارن بـ [[->value]].
- [[json_encode]] بيطلّع القيمة، فالـ API بيرجّع [["paid"]] لوحده.
- [[cases()]] كل الحالات بالترتيب، مفيدة لـ dropdown.

ومينفعش [[new OrderStatus()]]: [[Cannot instantiate enum OrderStatus]].

---

## ٦. حالة جديدة نسيتها في [[match]]

ضيفنا [[case Cancelled = 'cancelled';]] ومضيفناهاش في [[label()]]:

~~~php
echo OrderStatus::Paid->label(), "\n";
echo OrderStatus::Cancelled->label(), "\n";
~~~

~~~text الناتج
اتدفع

Fatal error: Uncaught UnhandledMatchError: Unhandled match case OrderStatus::Cancelled in /app/en2.php:9
Stack trace:
#0 /app/en2.php(14): OrderStatus->label()
~~~

السطر الأول اشتغل عادي، والغلطة طلعت بس لما الحالة الجديدة اتعرضت، وفيها اسم الحالة بالظبط. عشان كده بلاش [[default]] في [[match]] على enum: من غيره مستحيل تنسى حالة وتعدّي بصمت.

---

## الخلاصة

| | بيعمل إيه | لو القيمة غلط |
|---|---|---|
| [[OrderStatus::from($v)]] | القيمة → الحالة | [[ValueError]] |
| [[OrderStatus::tryFrom($v)]] | القيمة → الحالة | [[null]] |
| [[$s->value]] | القيمة اللي في القاعدة | |
| [[$s->name]] | اسم الحالة في الكود | |
| [[OrderStatus::cases()]] | كل الحالات | |
| [[$s === OrderStatus::Paid]] | المقارنة الصح | |`,
          lines: [
            "بداية الملف.",
            "enum قيمه نصوص.",
            "حالة وقيمتها في القاعدة.",
            "حالة.",
            "حالة.",
            "method على الـ enum.",
            "match على الحالة نفسها.",
            "نص عربي.",
            "نص عربي.",
            "نص عربي.",
            "قفلة الـ match.",
            "قفلة الـ method.",
            "قفلة الـ enum.",
            "من القيمة اللي في القاعدة (بيرمي لو غلط).",
            "«اتدفع paid».",
            "من الرابط: null لو غلط، فخد الافتراضي."
          ],
          sol: R`بعد ما تضيف [[Cancelled]] من غير ما تعدّل [[match]]: الكود شغال عادي لحد ما حد ينادي [[OrderStatus::Cancelled->label()]]، ساعتها [[Fatal error: Uncaught UnhandledMatchError: Unhandled match case OrderStatus::Cancelled]] (PHP 8.4 بيكتب اسم الحالة نفسها) والـ stack trace بيشاور على [[label()]]. أدوات زي PHPStan بتمسكها قبل ما تشغّل.

[[OrderStatus::from('nope')]]: [[ValueError: "nope" is not a valid backing value for enum OrderStatus]]. و [[OrderStatus::tryFrom('nope')]] بيرجّع [[NULL]] من غير غلطة. [[from]] للقيم اللي جاية من قاعدتك (لو غلط يبقى bug)، و [[tryFrom]] + [[??]] للي جاي من المستخدم زي [[$_GET]].

ملاحظة: [[$row]] في المثال جاي من القاعدة، فعشان تجرّبه لوحده عرّفه الأول: [[$row = ['status' => 'paid'];]] والناتج [[اتدفع paid]].`
        },
        {
          cmd: "property hooks",
          title: "PHP 8.4: property بتتحقق وتتحسب لوحدها من غير getters",
          desc: R`property hooks: بتكتب [[get]] أو [[set]] جوه الـ property نفسها. [[set => strtolower(trim($value))]] بيتنفّذ مع كل تخصيص، حتى جوه الكلاس، والناتج هو اللي بيتخزن. و property فيها [[get]] بس ومش بتستخدم نفسها بتبقى محسوبة (virtual)، زي computed property.

و asymmetric visibility: [[public private(set) int $id]] يعني أي حد يقرا، والكلاس بس يكتب.`,
          example: R`<?php
class User {
    public private(set) int $id;
    public string $email {
        set => strtolower(trim($value));
    }
    public string $displayName {
        get => $this->name !== '' ? $this->name : strstr($this->email, '@', true);
    }
    public function __construct(int $id, string $email, public string $name = '') {
        $this->id = $id;
        $this->email = $email;
    }
}
$u = new User(1, '  Sara@Example.com ');
echo $u->email, ' / ', $u->displayName;`,
          try: R`جرّب [[$u->id = 5;]] و [[$u->displayName = 'x';]] واقرا الرسالتين. وبعدين [[$u->email = ' ALI@EXAMPLE.COM';]] واطبعه: الـ hook اشتغل على التخصيص من برّه كمان.`,
          flag: "script",
          deep: {
            why: "قبل 8.4 كنت بتختار: property عامة (سهلة بس مفيش تحقق)، أو private ومعاها [[getEmail()]] و [[setEmail()]] لكل حاجة. الـ hooks بتدّيك الاتنين: تكتب [[$u->email]] عادي، والتحقق بيحصل لوحده.",
            how: R`نوعين: backed property ليها قيمة متخزنة، والـ [[set]] بيحدد إيه اللي يتخزن (الشكل القصير [[set => expr]] بيخزن ناتج التعبير، والشكل الطويل [[set { $this->email = ...; }]] بتخزن بإيدك). و virtual property: الـ hooks مش بتلمس الـ property نفسها، فمفيش قيمة متخزنة. لو ليها [[get]] بس، الكتابة فيها Error.

الـ hooks بتشتغل حتى جوه الـ constructor، عشان كده الإيميل اتنضّف من أول ما الـ object اتعمل.

[[private(set)]] و [[protected(set)]]: القراية حسب الـ visibility الأولى، والكتابة حسب اللي بين القوسين. ده بديل لـ readonly لما محتاج الكلاس نفسه يغيّر القيمة بعدين.

والـ interfaces في 8.4 تقدر تطلب property: [[public string $email { get; }]].`,
            when: "تنضيف أو تحقق بسيط وقت التخصيص، وقيم محسوبة من properties تانية. لو المنطق تقيل (query، API)، method عادية أوضح.",
            mistakes: R`تعمل query أو شغل تقيل جوه [[get]]، والـ property بتتقري في loop ١٠٠٠ مرة. وتنسى إن الـ [[set]] بيشتغل جوه الكلاس كمان. وتحاول تخلي property فيها hooks [[readonly]]: ممنوع. والأهم: الكود ده محتاج PHP 8.4، فاتأكد من نسخة السيرفر قبل ما تستخدمه (تاب VPS، درس [[php -l]]).`
          },
          teach: R`## المثال بيعمل إيه؟

كلاس [[User]] فيه ٣ properties بـ ٣ سلوكيات: [[id]] الكل يقراه والكلاس بس يكتبه، و [[email]] بيتنضّف لوحده مع كل تخصيص، و [[displayName]] مش متخزن أصلًا وبيتحسب كل ما تقراه. الكود ده كله PHP 8.4، واتشغّل جوه Docker على [[php:8.4-cli]].

---

## ١. asymmetric visibility: [[public private(set)]]

~~~php
class User {
    public private(set) int $id;
~~~

كلمتين visibility بدل واحدة:

| الحتة | بتتحكم في | معناها |
|---|---|---|
| [[public]] | القراية | أي حد يقرا [[$u->id]] |
| [[private(set)]] | الكتابة | الكلاس نفسه بس يكتب |
| [[int $id]] | النوع والاسم | من غير قيمة افتراضية: بيتملي في الـ constructor |

جربنا الكتابة من برّه [[$u->id = 5;]]:

~~~text الناتج
Cannot modify private(set) property User::$id from global scope
~~~

[[global scope]] يعني «من كود برّه أي كلاس». والفرق عن [[readonly]]: الكلاس يقدر يغيّر [[$id]] تاني بعدين لو احتاج.

---

## ٢. [[set]] hook: تنضيف مع كل تخصيص

~~~php
    public string $email {
        set => strtolower(trim($value));
    }
~~~

بدل [[;]] بعد اسم الـ property فيه أقواس [[{ }]] جواها hook:

- [[set]]: كود بيشتغل كل ما حد يكتب في [[$email]].
- [[$value]]: متغير جاهز فيه القيمة اللي اتبعتت.
- [[=>]] الشكل القصير: ناتج التعبير هو اللي بيتخزن.
- [[trim]]: بيشيل المسافات من الأول والآخر.
- [[strtolower]]: بيصغّر الحروف (to lower case).

يعني [['  Sara@Example.com ']] بتتخزن [['sara@example.com']].

---

## ٣. [[get]] hook: property محسوبة (virtual)

~~~php
    public string $displayName {
        get => $this->name !== '' ? $this->name : strstr($this->email, '@', true);
    }
~~~

مفيش [[set]] هنا، والـ [[get]] مبيقراش [[$this->displayName]] نفسها، فـ PHP مبيحجزلهاش مكان خالص: كل ما تقرا [[$u->displayName]] الكود ده بيشتغل.

من جوه لبرة:

1. [[$this->name !== '']]: الاسم مش فاضي؟
2. [[? $this->name]]: لو آه، رجّع الاسم.
3. [[: strstr($this->email, '@', true)]]: لو لأ، اللي قبل [[@]] في الإيميل. ([[? :]] ده الـ ternary: شرط ؟ لو صح : لو غلط.)

[[strstr]] بيدوّر على حرف في نص. من غير التالت بيرجّع من الحرف للآخر، و [[true]] بيرجّع اللي **قبله**:

~~~text الناتج
strstr('sara@example.com', '@')        → @example.com
strstr('sara@example.com', '@', true)  → sara
~~~

جربنا الكتابة فيها [[$u->displayName = 'x';]]:

~~~text الناتج
Property User::$displayName is read-only
~~~

---

## ٤. الـ constructor

~~~php
    public function __construct(int $id, string $email, public string $name = '') {
        $this->id = $id;
        $this->email = $email;
    }
}
~~~

- [[public string $name = '']] promoted (درس [[class]])، والباقي parameters عادية.
- [[$this->id = $id]] مسموح، لأننا جوه الكلاس.
- [[$this->email = $email]] الـ [[set]] hook بيشتغل هنا كمان، مش من برّه بس.

---

## ٥. التشغيل

~~~php
$u = new User(1, '  Sara@Example.com ');
echo $u->email, ' / ', $u->displayName;
~~~

~~~text الناتج
sara@example.com / sara
~~~

الإيميل اتنضّف من أول ما الـ object اتعمل، و [[displayName]] رجع [[sara]] لأن مفيش اسم. ومع اسم [[new User(2, 'x@y.com', 'Omar')]] طلع [[Omar]].

و [[var_dump($u)]] بيأكد إن [[displayName]] مش متخزنة:

~~~text الناتج
object(User)#1 (3) {
  ["id"]=>
  int(1)
  ["email"]=>
  string(16) "sara@example.com"
  ["name"]=>
  string(0) ""
}
~~~

٣ properties بس، و [[16]] طول النص بالحروف.

وتخصيص من برّه: [[$u->email = ' ALI@EXAMPLE.COM';]]:

~~~text الناتج
ali@example.com / ali
~~~

---

## ٦. hooks مع [[readonly]] ممنوع

~~~php
class A { public readonly string $e { set => strtolower($value); } }
~~~

~~~text الناتج
Fatal error: Hooked properties cannot be readonly in /app/ph2.php on line 2
~~~

لو عايز «يتكتب جوه بس»، استخدم [[private(set)]] بداله.

---

## الخلاصة

| الشكل | بيعمل إيه | الكتابة من برّه |
|---|---|---|
| [[public private(set) int $id]] | قراية للكل، كتابة للكلاس | [[Cannot modify private(set) property]] |
| [[{ set => ...; }]] | القيمة بتتعدّل قبل ما تتخزن، من جوه ومن برّه | مسموحة وبتتنضّف |
| [[{ get => ...; }]] لوحده | محسوبة ومش متخزنة | [[is read-only]] |
| hooks + [[readonly]] | ممنوع | |

وكل ده محتاج PHP 8.4: على 8.3 الملف كله Parse error (ده من الـ docs).`,
          lines: [
            "بداية الملف.",
            "كلاس.",
            "الكل يقرا، والكلاس بس يكتب.",
            "property فيها hook...",
            "...أي قيمة بتتخزن صغيرة ومن غير مسافات.",
            "قفلة.",
            "property محسوبة (مش متخزنة)...",
            "...الاسم لو موجود، وإلا اللي قبل @ في الإيميل.",
            "قفلة.",
            "constructor، والاسم promoted.",
            "مسموح: جوه الكلاس.",
            "الـ hook بيشتغل هنا كمان.",
            "قفلة.",
            "قفلة الكلاس.",
            "إيميل بمسافات وحروف كبيرة.",
            "«sara@example.com / sara»."
          ],
          sol: R`[[$u->id = 5;]]: [[Error: Cannot modify private(set) property User::$id from global scope]]. القراية مسموحة من برّه والكتابة من جوه الكلاس بس.

[[$u->displayName = 'x';]]: [[Error: Property User::$displayName is read-only]]. الـ property دي ليها [[get]] بس ومش متخزنة أصلًا (virtual)، فمفيش مكان تتكتب فيه.

[[$u->email = ' ALI@EXAMPLE.COM';]] وبعدين [[echo $u->email]]: [[ali@example.com]]، و [[displayName]] بقت [[ali]]. الـ [[set]] hook بيشتغل على أي تخصيص، من الـ constructor أو من برّه. والناتج الأول للمثال: [[sara@example.com / sara]].`
        }
      ]
    }
]);
