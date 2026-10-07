// تكملة تاب php: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/php/01.js (شرح حقول الدرس في أوله)
MORE("php", [
    {
      t: "Composer وتنظيم المشروع",
      l: 3,
      n: "Composer للمكتبات والـ autoload، وملف دخول واحد بيوزّع الطلبات على controllers و views",
      items: [
        {
          cmd: "composer require",
          title: "سطّب مكتبات PHP وثبّت نسخها",
          desc: R`Composer هو npm بتاع PHP. [[composer require vendor/package]] بيسطّب المكتبة في [[vendor/]] ويكتبها في [[composer.json]]، والنسخ المضبوطة بتتسجل في [[composer.lock]]. الاتنين يتعملهم commit، و [[vendor/]] لأ.

على السيرفر: [[composer install --no-dev --optimize-autoloader]] بيسطّب بالظبط اللي في الـ lock من غير أدوات التطوير. ولو نسخة PHP على الاستضافة أقدم من جهازك، [[platform.php]] بيخلي Composer يختار نسخ مكتبات شغالة عليها.`,
          example: R`composer init
composer config platform.php 8.3
composer require phpmailer/phpmailer
composer require --dev phpunit/phpunit
composer install
composer install --no-dev --optimize-autoloader
composer update phpmailer/phpmailer
composer outdated --direct
composer audit`,
          try: R`في فولدر فاضي: [[composer init]] واقبل الافتراضي، وبعدين [[composer require phpmailer/phpmailer]]، وافتح [[composer.json]] و [[composer.lock]] وقارن النسخة في الاتنين. امسح [[vendor/]] وشغّل [[composer install]]: رجع زي ما كان.`,
          deep: {
            why: "من غير Composer بتنزّل المكتبات zip وتحطها في المشروع، ومحدش عارف أنهي نسخة، والتحديث كابوس. نفس المشكلة اللي npm بيحلها في JavaScript (تاب «Node و npm»).",
            how: R`[[composer.json]] فيه القيود: [[^7.0]] يعني أي 7.x. و [[composer.lock]] فيه النسخة بالظبط اللي اتسطبت وتاريخها. [[install]] بيقرا الـ lock (نفس النسخ عند الكل)، و [[update]] بيتجاهله ويجيب أحدث نسخة تناسب القيود ويكتب lock جديد.

[[--dev]]: مكتبات للتطوير بس (اختبارات، أدوات فحص)، و [[--no-dev]] على السيرفر بيسيبها. و [[--optimize-autoloader]] (أو [[-o]]) بيبني classmap جاهز لكل الكلاسات، أسرع في الإنتاج.

[[platform.php]] في [[composer.json]]: بتقول لـ Composer «افترض إن PHP نسختها 8.3» حتى لو جهازك 8.4، فمش هيختار مكتبة محتاجة أحدث من السيرفر.

[[composer audit]] بيقارن مكتباتك بقاعدة الثغرات المعروفة. و [[composer outdated --direct]] بيوريك المكتبات اللي انت طلبتها بس ولها نسخ أحدث.

على استضافة مشتركة من غير Composer: شغّل [[composer install --no-dev -o]] عندك وارفع [[vendor/]] مع الـ deploy، أو ارفع [[composer.phar]] وشغّله بـ [[php composer.phar]] لو فيه SSH.`,
            when: "من أول مكتبة. حتى لو مفيش مكتبات خالص، Composer مفيد للـ autoload بتاع كلاساتك (الدرس الجاي).",
            mistakes: R`commit لـ [[vendor/]]. و [[composer update]] على السيرفر فيجيب نسخ عمرها ما اتجربت. وتتجاهل الـ lock (مش في git) فكل واحد عنده نسخ مختلفة. وتسطّب مكتبة محتاجة PHP أحدث من الاستضافة وتكتشف على السيرفر.`
          },
          teach: R`## المثال بيعمل إيه؟

٩ أوامر هي دورة حياة المكتبات في أي مشروع PHP: تعمل ملف المشروع، تقول نسخة PHP على السيرفر، تسطّب مكتبة ومكتبة تطوير، وبعدين تسطّب على السيرفر، وتحدّث، وتدوّر على نسخ أحدث وثغرات. كله اتشغّل جوه Docker على الصورة الرسمية [[composer:2]] (Composer 2.10.3 وجواها PHP 8.5).

> هتلاقي مع أغلب الأوامر سطر [[Composer could not detect the root package (ali/demo) version, defaulting to '1.0.0']]. ده تنبيه عادي لمشروع لسه مفيهوش git، تجاهله.

---

## ١. [[composer init]]

بيسألك أسئلة (اسم المشروع، الوصف، المؤلف...) ويكتب [[composer.json]]. شغّلناه بـ [[--no-interaction --name ali/demo]] عشان ياخد الافتراضي من غير أسئلة:

~~~text الناتج
Writing ./composer.json
~~~

~~~text composer.json
{
    "name": "ali/demo",
    "require": {}
}
~~~

[[ali/demo]] اسم المشروع بصيغة [[vendor/package]]: صاحبه / اسمه. ونفس الصيغة لكل مكتبة: [[phpmailer/phpmailer]].

---

## ٢. [[composer config platform.php 8.3]]

بيكتب في [[composer.json]]:

~~~text composer.json (جزء)
"config": {
    "platform": {
        "php": "8.3"
    }
}
~~~

يعني: «وانت بتختار نسخ المكتبات، اعتبر إن PHP نسخته 8.3» حتى لو جهازك أحدث. ولازم يتعمل **قبل** أي [[require]]. جربنا الترتيب العكسي (سطّبنا PHPUnit الأول وبعدين حطينا platform): Composer كان اختار PHPUnit 13.4.1 اللي محتاج PHP 8.4، وبعدها [[composer update]] رفض:

~~~text الناتج (الترتيب الغلط)
phpunit/phpunit 13.4.1 requires php >=8.4.1 -> your php version (8.3; overridden via config.platform, actual: 8.5.11) does not satisfy that requirement.
~~~

---

## ٣. [[composer require phpmailer/phpmailer]]

~~~text الناتج
./composer.json has been updated
Running composer update phpmailer/phpmailer
Loading composer repositories with package information
Updating dependencies
Lock file operations: 1 install, 0 updates, 0 removals
  - Locking phpmailer/phpmailer (v7.1.1)
Writing lock file
Installing dependencies from lock file (including require-dev)
Package operations: 1 install, 0 updates, 0 removals
  - Downloading phpmailer/phpmailer (v7.1.1)
  - Installing phpmailer/phpmailer (v7.1.1): Extracting archive
Generating autoload files
No security vulnerability advisories found.
Using version ^7.1 for phpmailer/phpmailer
~~~

السطور بالترتيب:

| السطر | معناه |
|---|---|
| [[composer.json has been updated]] | ضاف المكتبة في [[require]] |
| [[Loading composer repositories]] | بيسأل Packagist (مخزن مكتبات PHP، زي npm registry) |
| [[Locking ... (v7.1.1)]] | قرر النسخة وكتبها في [[composer.lock]] |
| [[Installing ...]] | نزّلها وفكّها في [[vendor/phpmailer/phpmailer]] |
| [[Generating autoload files]] | عمل [[vendor/autoload.php]] (درس PSR-4) |
| [[No security vulnerability advisories found]] | فحص الثغرات لوحده بعد التسطيب |
| [[Using version ^7.1]] | القيد اللي اتكتب في composer.json |

### [[^7.1]] يعني إيه؟

الـ [[^]] (caret) معناها «أي نسخة من 7.1 وطالع بس من غير ما توصل 8»: 7.1.1 و 7.2 و 7.9 مسموحين، و 8.0 لأ. لأن النسخة الكبيرة (أول رقم) هي اللي بتكسر الكود القديم.

و [[composer.lock]] فيه النسخة بالظبط:

~~~text composer.lock (جزء)
"name": "phpmailer/phpmailer",
"version": "v7.1.1",
~~~

يعني [[composer.json]] = المسموح، و [[composer.lock]] = اللي اتسطّب فعلًا.

---

## ٤. [[composer require --dev phpunit/phpunit]]

[[--dev]] بيكتبها في قسم تاني [[require-dev]]: مكتبات للتطوير بس (هنا PHPUnit للاختبارات). وهنا [[platform.php]] اشتغلت:

~~~text الناتج
Cannot use phpunit/phpunit's latest version 13.4.1 as it requires php >=8.4.1 which is not satisfied by your platform.
...
Lock file operations: 25 installs, 0 updates, 0 removals
  - Locking phpunit/phpunit (12.5.38)
...
Using version ^12.5 for phpunit/phpunit
~~~

اختار 12.5.38 اللي شغالة على 8.3. و [[25 installs]] لأن PHPUnit نفسه محتاج ٢٤ مكتبة تانية (اسمها transitive dependencies)، وكلهم اتسجلوا في الـ lock.

---

## ٥. [[composer install]]

مسحنا [[vendor/]] من الجهاز وشغّلناه:

~~~text الناتج
Installing dependencies from lock file (including require-dev)
Verifying lock file contents can be installed on current platform.
Package operations: 26 installs, 0 updates, 0 removals
  - Installing phpmailer/phpmailer (v7.1.1): Extracting archive
  - Installing phpunit/phpunit (12.5.38): Extracting archive
...
~~~

[[from lock file]]: [[install]] مبيسألش عن نسخ جديدة، بيسطّب اللي في الـ lock بالحرف. عشان كده [[vendor/]] مبيترفعش على git: أي حد يعمل clone ويشغّل [[composer install]] ياخد نفس النسخ بالظبط. و ٢٦ = phpmailer + phpunit + الـ ٢٤ بتوعه.

---

## ٦. [[composer install --no-dev --optimize-autoloader]]

ده أمر السيرفر:

~~~text الناتج
Installing dependencies from lock file
Package operations: 0 installs, 0 updates, 25 removals
Generating optimized autoload files
~~~

- [[--no-dev]]: من غير [[require-dev]]، فشال الـ ٢٥ بتوع PHPUnit وفضل [[vendor/phpmailer]] بس.
- [[--optimize-autoloader]] (أو [[-o]]): [[optimized autoload files]] يعني عمل classmap: لستة جاهزة «الكلاس ده في الملف ده» بدل ما يدوّر كل مرة.

---

## ٧. [[composer update phpmailer/phpmailer]]

[[update]] عكس [[install]]: بيتجاهل الـ lock ويدوّر على أحدث نسخة تناسب [[^7.1]]، ويكتب lock جديد. واسم المكتبة بيحدده عليها بس. هنا مكانش فيه أحدث:

~~~text الناتج
Updating dependencies
Nothing to modify in lock file
Installing dependencies from lock file (including require-dev)
Package operations: 25 installs, 0 updates, 0 removals
~~~

لاحظ إنه رجّع الـ ٢٥ بتوع PHPUnit: [[update]] بيسطّب الـ dev كمان افتراضيًا. عشان كده [[update]] مكانه جهازك، و [[install --no-dev]] مكانه السيرفر.

---

## ٨. [[composer outdated --direct]]

~~~text الناتج
All your direct dependencies are up to date
~~~

[[--direct]]: المكتبات اللي انت كاتبها في composer.json بس، مش الـ ٢٤ اللي تحت PHPUnit. وليه PHPUnit 13 مظهرش كنسخة أحدث؟ لأن [[platform.php]] بتقول 8.3، فـ 13 مش متاحة أصلًا للمشروع ده.

---

## ٩. [[composer audit]]

~~~text الناتج
No security vulnerability advisories found.
~~~

بيقارن كل نسخة في الـ lock بقاعدة الثغرات المعروفة. ولو لقى حاجة بيطبع اسم المكتبة والثغرة وبيخرج بكود غير صفر، فينفع يتحط في CI يوقف الـ deploy.

---

## الخلاصة

| الأمر | بيقرا | بيكتب | فين |
|---|---|---|---|
| [[require]] | Packagist | json + lock + vendor | جهازك |
| [[install]] | lock | vendor | أي مكان |
| [[install --no-dev -o]] | lock | vendor من غير dev | السيرفر |
| [[update]] | Packagist + قيود json | lock + vendor | جهازك |
| [[config platform.php]] | | json | أول المشروع |

و git: [[composer.json]] و [[composer.lock]] آه، و [[vendor/]] لأ.`,
          lines: [
            "اعمل composer.json بأسئلة.",
            "افترض نسخة PHP بتاعة السيرفر (قبل أي require، عشان النسخ تتختار على أساسها).",
            "سطّب مكتبة وضيفها للمشروع.",
            "مكتبة للتطوير بس.",
            "سطّب بالظبط اللي في composer.lock.",
            "للإنتاج: من غير أدوات التطوير، و autoload أسرع.",
            "حدّث مكتبة واحدة واكتب lock جديد.",
            "إيه اللي ليه نسخ أحدث (من اللي انت طلبته بس).",
            "دوّر على ثغرات معروفة في مكتباتك."
          ],
          sol: R`[[composer.json]] فيه [["phpmailer/phpmailer": "^7.1"]] (قيد: أي 7.x من 7.1 وطالع)، و [[composer.lock]] فيه النسخة بالظبط [["version": "v7.1.1"]] ومعاها الـ commit hash. ده الفرق: json = المسموح، lock = اللي اتسطّب فعلًا.

بعد [[rm -rf vendor]] و [[composer install]]: [[Installing phpmailer/phpmailer (v7.1.1)]] نفس النسخة من الـ lock، حتى لو نزلت 7.2 في الوقت ده. [[composer update]] هو اللي بيتجاهل الـ lock ويجيب أحدث نسخة مسموحة.

الغلط الشائع: ترفع [[vendor/]] على git وتنسى [[composer.lock]]. العكس هو الصح: [[vendor/]] في [[.gitignore]] و [[composer.lock]] في git (للمشاريع والمواقع).`
        },
        {
          cmd: "PSR-4 autoload",
          title: "كلاساتك تتحمّل لوحدها من غير require لكل ملف",
          desc: R`PSR-4 قاعدة بتربط الـ namespace بالفولدر: [[App\\]] → [[src/]]، فكلاس [[App\Controllers\PostController]] يبقى في [[src/Controllers/PostController.php]]. تكتبها في [[composer.json]]، وتشغّل [[composer dump-autoload]] مرة، وبعدها [[require]] واحد لـ [[vendor/autoload.php]] وأي كلاس بيتحمّل أول ما تستخدمه.

و [[files]] للدوال العادية (زي [[e()]] و [[view()]]) اللي عايزها تتحمّل دايمًا.`,
          example: R`{
  "autoload": {
    "psr-4": { "App\\": "src/" },
    "files": ["src/helpers.php"]
  }
}
// src/Controllers/PostController.php
<?php
namespace App\Controllers;
use App\Models\PostRepository;
final class PostController { }
// public/index.php
<?php
require dirname(__DIR__) . '/vendor/autoload.php';
$controller = new App\Controllers\PostController();`,
          try: R`اعمل الفولدرات والملفات، وشغّل [[composer dump-autoload]]، وافتح [[public/index.php]]. بعدين غيّر اسم الملف لـ [[postController.php]] (p صغيرة): على ويندوز هيشتغل، وعلى سيرفر Linux هيقع بـ [[Class not found]].`,
          flag: "script",
          deep: {
            why: "مشروع فيه ٥٠ كلاس محتاج ٥٠ سطر require، وترتيبهم مهم، وأي نسيان = Class not found. الـ autoload بيخلي PHP يجيب الملف لوحده وقت الحاجة، فمفيش require غير سطر واحد.",
            how: R`تحت الغطا: PHP فيه [[spl_autoload_register()]]. لما الكود يستخدم كلاس مش متعرّف، PHP بينادي الدوال المسجلة دي بالاسم الكامل. Composer بيسجّل دالة بتشيل [[App\]] من أول الاسم، وتحوّل باقي [[\]] لـ [[/]]، وتضيف [[src/]] و [[.php]]، وتعمل require. ده lazy: الكلاس اللي مستخدمتوش في الطلب ده مبيتحمّلش.

[[use App\Models\PostRepository;]] مجرد اختصار للاسم وقت الـ compile، مبيحمّلش حاجة.

جوه ملف فيه [[namespace]]، أي كلاس من غير [[\]] في أوله بيتدوّر عليه في نفس الـ namespace: [[new DateTime()]] جوه [[App\Controllers]] يبقى [[App\Controllers\DateTime]] ويقع. اكتب [[\DateTime]] أو [[use DateTime;]]. الدوال مختلفة: لو مش لاقيها في الـ namespace بترجع للعامة، فـ [[strlen]] شغالة عادي.

[[composer dump-autoload]] محتاجه لما تغيّر قسم [[autoload]] في composer.json. الكلاسات الجديدة في فولدرات PSR-4 بتتلاقي لوحدها، إلا لو عامل [[--classmap-authoritative]] ([[-a]])، ساعتها أي كلاس مش في الـ classmap مبيتلاقيش ولازم dump تاني. أما [[-o]] لوحده فلو الكلاس مش في الـ classmap بيرجع يدوّر بقواعد PSR-4 عادي.`,
            when: "أي مشروع فيه أكتر من كام كلاس. وده نفس اللي Laravel وأي مكتبة PHP حديثة بتعمله.",
            mistakes: R`اسم الملف أو الفولدر مختلف في حالة الحروف عن الكلاس: ويندوز مش فارق معاه، والسيرفر Linux بيفرق، فبيشتغل عندك ويقع بعد الـ deploy. و [[new DateTime]] من غير [[\]] جوه namespace. وتخلط require يدوي مع autoload لنفس الكلاس فيتعرّف مرتين.`
          },
          teach: R`## المثال بيعمل إيه؟

المثال ٣ ملفات في صندوق واحد: [[composer.json]] بيقول «الكلاسات اللي اسمها بيبدأ بـ [[App\]] موجودة في [[src/]]»، وملف كلاس في المكان الصح، وملف دخول بيعمل [[require]] واحد بس ويستخدم الكلاس. الـ [[composer dump-autoload]] اتشغّل في صورة [[composer:2]]، و [[public/index.php]] على [[php:8.4-cli]]، جوه Docker.

---

## ١. [[composer.json]]: القاعدة

~~~text composer.json
{
  "autoload": {
    "psr-4": { "App\\": "src/" },
    "files": ["src/helpers.php"]
  }
}
~~~

| الحتة | معناها |
|---|---|
| [["autoload"]] | إعدادات تحميل الكلاسات بتاعة مشروعك انت (مش المكتبات) |
| [["psr-4"]] | PSR-4 قاعدة متفق عليها (PSR = PHP Standards Recommendation) بتربط الـ namespace بالفولدر |
| [["App\\": "src/"]] | الـ namespace [[App\]] = فولدر [[src/]]. الـ [[\\]] لأن [[\]] في JSON لازم تتكتب مرتين |
| [["files"]] | ملفات بتتحمّل مع كل طلب، للدوال العادية (الدوال مبتتحمّلش بالـ autoload، الكلاسات بس) |

وبعدها:

~~~bash
composer dump-autoload
~~~

~~~text الناتج
Generating autoload files
Generated autoload files
~~~

بيكتب فولدر [[vendor/composer/]]، وجواه مثلًا [[autoload_psr4.php]] فيه القاعدة دي بالظبط:

~~~text vendor/composer/autoload_psr4.php (جزء)
return array(
    'App\\' => array($baseDir . '/src'),
);
~~~

---

## ٢. ملف الكلاس

~~~php
// src/Controllers/PostController.php
<?php
namespace App\Controllers;
use App\Models\PostRepository;
final class PostController { }
~~~

- السطر الأول تعليق بيقول اسم الملف ومكانه، مش جزء من الكود.
- [[namespace App\Controllers;]]: «الكلاسات اللي في الملف ده اسمها الكامل بيبدأ بـ [[App\Controllers\]]». الـ namespace زي الفولدر للأسامي، عشان كلاسين اسمهم [[User]] من مكتبتين ميتخانقوش.
- [[use App\Models\PostRepository;]]: اختصار: من هنا ورايح اكتب [[PostRepository]] بدل الاسم الطويل. **مبيحمّلش** الملف.
- [[final class PostController]]: اسم الكلاس لازم يطابق اسم الملف بالحرف.

### إزاي الاسم بيتحوّل لمسار؟

~~~text
App\Controllers\PostController
App\  →  src/                        (من القاعدة)
Controllers\PostController  →  Controllers/PostController.php
النتيجة: src/Controllers/PostController.php
~~~

---

## ٣. ملف الدخول

~~~php
// public/index.php
<?php
require dirname(__DIR__) . '/vendor/autoload.php';
$controller = new App\Controllers\PostController();
~~~

- [[__DIR__]]: فولدر الملف الحالي ([[/app/public]]).
- [[dirname(...)]]: الفولدر اللي فوقه ([[/app]]).
- [[. '/vendor/autoload.php']]: لزق المسار، فيبقى [[/app/vendor/autoload.php]]. ده الـ [[require]] الوحيد في المشروع كله.
- [[new App\Controllers\PostController()]]: أول ما PHP يشوف كلاس مش متعرّف، بيسأل الـ autoloader، فيحمّل الملف ويكمّل.

ضيفنا للتجربة [[var_dump($controller)]] و [[get_included_files()]] (لستة كل الملفات اللي اتحمّلت):

~~~text الناتج
object(App\Controllers\PostController)#2 (0) {
}
Array
(
    [0] => public/index.php
    [1] => vendor/autoload.php
    [2] => vendor/composer/autoload_real.php
    [3] => vendor/composer/ClassLoader.php
    [4] => vendor/composer/autoload_static.php
    [5] => src/helpers.php
    [6] => src/Controllers/PostController.php
)
~~~

لاحظ ٣ حاجات:

1. [[src/helpers.php]] اتحمّل لوحده من قسم [["files"]]، قبل أي حاجة تانية.
2. [[PostController.php]] اتحمّل بس لما استخدمناه.
3. [[PostRepository]] **مش** في اللستة: [[use]] مبيحمّلش، والكلاس عمره ما اتستخدم.

---

## ٤. حالة الحروف: بيشتغل عندك ويقع على السيرفر

غيّرنا اسم الملف لـ [[postController.php]] (p صغيرة) على نظام ملفات Linux جوه الـ container:

~~~text الناتج
Fatal error: Uncaught Error: Class "App\Controllers\PostController" not found in /p/public/index.php:3
~~~

الـ autoloader بيدوّر على [[PostController.php]] بالحرف، و Linux بيعتبر [[P]] و [[p]] اسمين مختلفين. أما Windows و macOS فنظام الملفات افتراضيًا مش بيفرّق، فالملف هيتلاقي عندك (ده من الـ docs، Windows مفيهوش PHP هنا نجرب عليه). يعني الغلطة مبتظهرش غير بعد الـ deploy.

والحل يمسكها بدري: [[composer dump-autoload -o]] بيفحص كل ملف:

~~~text الناتج
Generating optimized autoload files
Class App\Controllers\PostController located in ./src/Controllers/postController.php does not comply with psr-4 autoloading standard (rule: App\ => ./src). Skipping.
Generated optimized autoload files containing 1 classes
~~~

[[Skipping]]: مدخلوش الـ classmap. حط الأمر ده في CI.

---

## ٥. كلاسات PHP نفسها جوه namespace

~~~php
namespace App\Controllers;
echo strlen('abc'), "\n";
echo (new \DateTime('2026-01-01'))->format('Y'), "\n";
new DateTime();
~~~

~~~text الناتج
3
2026

Fatal error: Uncaught Error: Class "App\Controllers\DateTime" not found in /p/dt.php:5
~~~

جوه namespace، أي كلاس من غير [[\]] في أوله بيتدوّر عليه **جوه الـ namespace ده**. [[\DateTime]] بالشرطة معناها «من البداية» (الـ global namespace). أما الدوال زي [[strlen]] فلو ملقتهاش في الـ namespace بترجع للعامة لوحدها.

---

## الخلاصة

| الحاجة | بتعمل إيه |
|---|---|
| [["psr-4": {"App\\": "src/"}]] | [[App\X\Y]] → [[src/X/Y.php]] |
| [["files"]] | ملفات دوال بتتحمّل دايمًا |
| [[composer dump-autoload]] | بعد أي تغيير في قسم [[autoload]] |
| [[-o]] | classmap أسرع + تحذير للملفات المخالفة |
| [[require .../vendor/autoload.php]] | الـ require الوحيد |
| [[use]] | اختصار اسم، مبيحمّلش |
| [[\DateTime]] | كلاسات PHP جوه namespace محتاجة [[\]] أو [[use DateTime;]] |`,
          lines: [
            "composer.json.",
            "قسم الـ autoload.",
            R`أي كلاس يبدأ بـ App\\ في فولدر src.`,
            "ملف دوال بيتحمّل مع كل طلب.",
            "قفلة.",
            "قفلة.",
            "ملف الكلاس.",
            "الـ namespace = الفولدر (Controllers).",
            "اختصار لاسم كلاس تاني (مبيحمّلوش).",
            "اسم الكلاس = اسم الملف بالظبط.",
            "ملف الدخول.",
            "السطر الوحيد اللي فيه require.",
            "الكلاس اتحمّل لوحده."
          ],
          sol: R`بعد [[composer dump-autoload]] ([[Generated autoload files]]) الصفحة بتشتغل من غير ولا [[require]] للكلاسات: [[App\Controllers\PostController]] = [[src/]] + [[Controllers/PostController.php]].

بعد تغيير الاسم لـ [[postController.php]]: على Linux [[Fatal error: Uncaught Error: Class "App\Controllers\PostController" not found]]. الـ autoloader بيدوّر على [[PostController.php]] بالحرف، ونظام ملفات Linux بيفرّق بين الكبير والصغير. على Windows و macOS (افتراضيًا) هيلاقيه، فالغلطة مبتظهرش غير لما ترفع.

ولو [[composer dump-autoload -o]] شغّلته، هيطبعلك تحذير إن الملف [[does not comply with psr-4 autoloading standard]]، فحطه في CI عشان تمسكها بدري.`
        },
        {
          cmd: "front controller",
          title: "ملف دخول واحد بيوزّع كل الطلبات",
          desc: R`بدل ما كل صفحة ملف [[.php]] لوحده، كل الطلبات بتروح لـ [[public/index.php]]، وهو بيبص على الـ method والمسار ويقرر مين يرد (router). كده الـ bootstrap والجلسة والأمان في مكان واحد، والروابط نضيفة زي [[/posts/42]].

على Apache: [[.htaccess]] في [[public]] يحوّل أي طلب مش لملف موجود لـ [[index.php]]. وعلى [[php -S]]: [[php -S localhost:8000 -t public public/index.php]].`,
          example: R`<?php
if (PHP_SAPI === 'cli-server' && is_file(__DIR__ . parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH))) return false;
require dirname(__DIR__) . '/vendor/autoload.php';
use App\Controllers\PostController;
$routes = [
    ['GET',  '#^/$#',            fn() => (new PostController())->index()],
    ['GET',  '#^/posts/(\d+)$#', fn($id) => (new PostController())->show((int) $id)],
    ['POST', '#^/posts$#',       fn() => (new PostController())->store()],
];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
foreach ($routes as [$method, $pattern, $action]) {
    if ($_SERVER['REQUEST_METHOD'] === $method && preg_match($pattern, $path, $m)) {
        echo $action(...array_slice($m, 1));
        exit;
    }
}
http_response_code(404);
echo 'الصفحة مش موجودة';`,
          try: R`شغّل [[php -S localhost:8000 -t public public/index.php]] وافتح [[/]] و [[/posts/1]] و [[/posts/abc]] (404) و [[/style.css]] (الملف نفسه، بسبب أول سطر). ضيف route جديد [[/about]].`,
          flag: "script",
          deep: {
            why: "مع ملف لكل صفحة، كل ملف لازم يفتكر يعمل require للإعدادات ويبدأ الجلسة ويتحقق من الدخول. نسيان واحد = صفحة مكشوفة. ملف دخول واحد بيعمل الحاجات دي مرة، وكل الـ URLs بتعدّي عليه.",
            how: R`على Apache، الـ [[.htaccess]] في [[public]] فيه ٤ سطور: [[RewriteEngine On]]، وشرطين [[RewriteCond %{REQUEST_FILENAME} !-f]] و [[!-d]] (مش ملف ولا فولدر موجود)، و [[RewriteRule ^ index.php [QSA,L]]]. الصور والـ CSS بتتخدم مباشرة، والباقي لـ PHP. على Nginx: [[try_files $uri $uri/ /index.php?$query_string;]] (تاب Nginx).

أول سطر في المثال للـ [[php -S]] بس: لما السيرفر ده بياخد router، كل الطلبات بتروحله حتى الملفات، و [[return false]] بيقوله «ابعت الملف زي ما هو».

الـ router: كل route = method + regex + دالة. [[#^/posts/(\d+)$#]] بيطابق المسار كله، والرقم بين القوسين بيطلع في [[$m[1]]]. [[array_slice($m, 1)]] بيشيل التطابق الكامل ويسيب الأجزاء، و [[...]] بيبعتهم arguments.

في الحقيقي بتلف الـ dispatch في [[try]]: [[catch (NotFound)]] → 404، وأي حاجة تانية تروح للـ exception handler (500). وفيه مكتبات router جاهزة (زي FastRoute) بتعمل ده أسرع وبـ [[{id}]] بدل regex. و Laravel [[Route::get()]] نفس الفكرة بالظبط.

وعلى الاستضافة: الدومين لازم يشاور على [[public]] مش جذر المشروع، أو [[public_html]] يبقى هو [[public]]، و [[src]] و [[vendor]] و [[config.php]] فوقه.`,
            when: "أي مشروع أكبر من كام صفحة، وأي API. وده الشكل اللي كل frameworks بتاع PHP ماشية عليه.",
            mistakes: R`تحط المشروع كله جوه [[public_html]] وتعتمد على [[.htaccess]] يقفل [[src]] و [[config.php]]. و [[preg_match]] من غير [[^]] و [[$]] فـ [[/posts/1/delete]] يطابق route غلط. وتنسى إن الـ regex بيرجّع نصوص، فالـ controller محتاج [[(int)]].`
          },
          teach: R`## المثال بيعمل إيه؟

ده [[public/index.php]]: الملف الوحيد اللي الطلبات بتوصله. فيه لستة routes (method + شكل المسار + دالة)، وبيلف عليها لحد ما يلاقي واحد مطابق وينفّذه، ولو مفيش يرجّع 404. جربناه بـ [[php -S]] جوه Docker على [[php:8.4-cli]] (port 5910 على الجهاز)، ومعاه [[PostController]] صغير فيه [[index]] و [[show]] و [[store]] بيرجّعوا نص، و [[public/style.css]].

---

## ١. أول سطر: للسيرفر المدمج بس

~~~php
if (PHP_SAPI === 'cli-server' && is_file(__DIR__ . parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH))) return false;
~~~

من جوه لبرة:

| الحتة | معناها |
|---|---|
| [[$_SERVER['REQUEST_URI']]] | الرابط اللي اتطلب، زي [[/style.css]] أو [[/posts/7?x=1]] |
| [[parse_url(..., PHP_URL_PATH)]] | خد المسار بس من غير [[?x=1]] |
| [[__DIR__ . ...]] | لزقه على فولدر [[public]]: [[/app/public/style.css]] |
| [[is_file(...)]] | الملف ده موجود فعلًا؟ |
| [[PHP_SAPI === 'cli-server']] | احنا شغالين على [[php -S]]؟ (SAPI = Server API، طريقة تشغيل PHP) |
| [[return false]] | قول للسيرفر المدمج «ابعت الملف زي ما هو» |

ليه؟ لما [[php -S]] بياخد ملف router في آخره، **كل** الطلبات بتروحله حتى الـ CSS. شلنا السطر ده وطلبنا [[/style.css]]:

~~~text الناتج (من غير أول سطر)
HTTP/1.1 404 Not Found

الصفحة مش موجودة
~~~

ومعاه:

~~~text الناتج
HTTP/1.1 200 OK
Content-Type: text/css; charset=UTF-8

body { color: red; }
~~~

على Apache أو Nginx السطر ده مبيعملش حاجة: [[.htaccess]] أو [[try_files]] بيخدموا الملفات قبل ما توصل PHP.

---

## ٢. الـ autoload والاختصار

~~~php
require dirname(__DIR__) . '/vendor/autoload.php';
use App\Controllers\PostController;
~~~

نفس درس PSR-4: [[require]] واحد، و [[use]] عشان نكتب [[PostController]] بس.

---

## ٣. جدول الـ routes

~~~php
$routes = [
    ['GET',  '#^/$#',            fn() => (new PostController())->index()],
    ['GET',  '#^/posts/(\d+)$#', fn($id) => (new PostController())->show((int) $id)],
    ['POST', '#^/posts$#',       fn() => (new PostController())->store()],
];
~~~

كل route array من ٣ حاجات:

1. الـ method: [['GET']] للفتح، [['POST']] للفورم.
2. regex للمسار:
  - [[#]] في الأول والآخر: حدود الـ regex (بدل [[/]] عشان المسار نفسه فيه [[/]]).
  - [[^]] بداية النص و [[$]] آخره: المسار كله لازم يطابق، مش جزء منه.
  - [[(\d+)]]: [[\d]] رقم، و [[+]] واحد أو أكتر، والقوسين معناهم «امسك الجزء ده».
3. الدالة: [[fn() => ...]] arrow function (دالة في سطر). [[(new PostController())->index()]] يعمل object وينادي method.

و [[(int) $id]] لأن أي حاجة بتتمسك من الـ regex نص.

---

## ٤. المسار الحالي

~~~php
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
~~~

[[/posts/7?x=1]] → [[/posts/7]]، فالـ query string ميبوظش المطابقة. جربناها: [[/posts/7?x=1]] طلّعت [[بوست رقم 7]].

---

## ٥. اللفة

~~~php
foreach ($routes as [$method, $pattern, $action]) {
    if ($_SERVER['REQUEST_METHOD'] === $method && preg_match($pattern, $path, $m)) {
        echo $action(...array_slice($m, 1));
        exit;
    }
}
~~~

- [[as [$method, $pattern, $action]]]: كل route بيتفك لـ ٣ متغيرات (array destructuring).
- [[$_SERVER['REQUEST_METHOD']]]: [[GET]] أو [[POST]]...
- [[preg_match($pattern, $path, $m)]]: بيرجّع [[1]] لو طابق، ويحط التطابقات في [[$m]].

جربنا [[preg_match('#^/posts/(\d+)$#', '/posts/42', $m)]]:

~~~text الناتج
$m                  → [0 => '/posts/42', 1 => '42']
array_slice($m, 1)  → [0 => '42']
~~~

[[$m[0]]] التطابق كله، و [[$m[1]]] اللي بين القوسين. [[array_slice($m, 1)]] بيشيل الأول، و [[...]] (spread) بيبعت كل عنصر كـ argument، فـ [[$action('42')]]. وبعدها [[exit]] عشان ميكمّلش.

---

## ٦. مفيش route

~~~php
http_response_code(404);
echo 'الصفحة مش موجودة';
~~~

[[http_response_code(404)]] بيغيّر رقم الحالة اللي بيرجع للمتصفح (الافتراضي 200).

---

## ٧. النتايج

| الطلب | الرد | ليه |
|---|---|---|
| [[GET /]] | 200 [[كل البوستات]] | أول route |
| [[GET /posts/1]] | 200 [[بوست رقم 1]] | [[(\d+)]] مسك [[1]] |
| [[GET /posts/abc]] | 404 [[الصفحة مش موجودة]] | [[abc]] مش أرقام |
| [[GET /style.css]] | 200 الملف نفسه | أول سطر رجّع [[false]] |
| [[POST /posts]] | 200 [[اتعمل بوست]] | route الـ POST |
| [[GET /posts]] | 404 | المسار ده متعرّف لـ POST بس |

---

## ٨. route جديد [[/about]]

~~~php
    ['GET',  '#^/about$#',       fn() => 'صفحة عن الموقع'],
~~~

[[/about]] رجّعت [[صفحة عن الموقع]]، و [[/about-us]] رجّعت 404 بفضل [[$]]. ولو شلت [[^]] و [[$]] الـ regex بيدوّر على أي جزء: جربنا [[preg_match('#/posts/(\d+)#', '/posts/1/delete')]] ورجّعت [[1]] (طابق غلط).

---

## الخلاصة

| الجزء | دوره |
|---|---|
| أول سطر | [[php -S]] بس: الملفات الموجودة تتخدم زي ما هي |
| [[$routes]] | method + regex + دالة لكل صفحة |
| [[parse_url]] | المسار من غير query string |
| [[preg_match]] + [[array_slice]] + [[...]] | الأجزاء اللي اتمسكت تبقى arguments |
| [[http_response_code(404)]] | لو مفيش route |

والتشغيل: [[php -S localhost:8000 -t public public/index.php]]: [[-t public]] جذر الموقع، والملف الأخير هو الـ router.`,
          lines: [
            "بداية الملف.",
            "على php -S بس: لو ملف موجود (CSS، صورة) ابعته زي ما هو.",
            "autoload.",
            "اختصار اسم الكلاس.",
            "الـ routes: method و regex للمسار ودالة.",
            "الرئيسية.",
            "بوست برقمه، والرقم بيتبعت للدالة.",
            "إنشاء بوست (POST بس).",
            "قفلة.",
            "المسار من غير query string.",
            "لف على الـ routes، وفك كل واحد لـ ٣ متغيرات.",
            "الـ method مطابقة والمسار مطابق؟",
            "نادي الدالة بالأجزاء اللي اتمسكت واطبع الناتج.",
            "خلاص.",
            "قفلة.",
            "قفلة.",
            "مفيش route: 404.",
            "رسالة."
          ],
          sol: R`[[/]] بيرجّع ناتج [[index()]] بـ 200، و [[/posts/1]] ناتج [[show(1)]]، و [[/posts/abc]] [[404]] و [[الصفحة مش موجودة]] لأن [[\d+]] أرقام بس، و [[/style.css]] بيرجّع الملف نفسه لأن أول سطر رجّع [[false]] فالسيرفر المدمج خدمه كملف.

[[/about]]: route جديد بـ regex [[#^/about$#]]. خلي بالك من [[^]] و [[$]]: من غيرهم [[/about-us]] و [[/x/about]] هيتطابقوا. ولو كل الطلبات رجّعت 404، غالبًا نسيت [[public/index.php]] في آخر أمر [[php -S]]، أو الـ controller مفيهوش [[index()]] و [[show()]] لسه.`,
          solCode: R`$routes = [
    ['GET',  '#^/$#',            fn() => (new PostController())->index()],
    ['GET',  '#^/posts/(\d+)$#', fn($id) => (new PostController())->show((int) $id)],
    ['POST', '#^/posts$#',       fn() => (new PostController())->store()],
    ['GET',  '#^/about$#',       fn() => 'صفحة عن الموقع'],
];`
        },
        {
          cmd: "MVC",
          title: "افصل القاعدة عن المنطق عن الـ HTML",
          desc: R`MVC تقسيم مسؤوليات: الـ Model بيكلم القاعدة (repository فيه PDO)، والـ View قالب بيطبع بس (وكل طباعة بـ [[e()]])، والـ Controller بيقرا الطلب ويسأل الـ Model ويختار الـ View. الـ router بينادي الـ controller.

دالة [[view()]] صغيرة بتحمّل القالب وتمسك الـ output في string بـ [[ob_start()]]، فالـ controller بيرجّع HTML زي ما بيرجّع JSON.`,
          example: R`// src/Controllers/PostController.php
namespace App\Controllers;
use App\Models\PostRepository;
final class PostController {
    public function __construct(private PostRepository $posts = new PostRepository()) {}
    public function show(int $id): string {
        $post = $this->posts->find($id) ?? throw new \App\NotFound();
        return view('posts/show', ['post' => $post]);
    }
}
// src/helpers.php
function view(string $name, array $data = []): string {
    extract($data);
    ob_start();
    require dirname(__DIR__) . "/views/$name.php";
    return ob_get_clean();
}`,
          try: R`اعمل [[views/posts/show.php]] فيه [[<h1><?= e($post['title']) ?></h1>]] و [[src/Models/PostRepository.php]] فيه [[find()]] بـ PDO، ووصّلهم بالـ router. بعدين اكتب اختبار بيدّي الـ controller repository وهمي (array بدل القاعدة).`,
          flag: "script",
          deep: {
            why: "صفحة PHP فيها SQL و if و HTML مخلوطين بتبقى سهلة في الأول ومستحيلة بعد سنة: تغيير شكل الصفحة بيلمس SQL، ومفيش طريقة تختبر المنطق من غير متصفح. الفصل بيخلي كل جزء يتغير لوحده.",
            how: R`الرحلة: [[index.php]] (front controller) → router → [[PostController::show]] → [[PostRepository::find]] (PDO و prepared statement) → [[view('posts/show')]] → HTML → الرد.

[[new]] في قيمة افتراضية لـ parameter (PHP 8.1) بيخلي الـ controller يشتغل لوحده، وفي نفس الوقت تقدر تديله repository تاني في الاختبار. ده dependency injection من غير container.

[[extract($data)]] بيحوّل [[['post' => ...]]] لمتغير [[$post]] جوه القالب. آمن هنا لأن الـ keys انت اللي كاتبها. و [[ob_start()]] بيبدأ يمسك أي طباعة، و [[ob_get_clean()]] بيرجّعها كنص ويقفل.

الـ view متعملش query ولا تقرر حاجة: بتطبع اللي اتبعتلها بس. ولـ layout مشترك: الـ view بترجّع المحتوى، و [[views/layout.php]] بيطبعه جوه الـ header والـ footer.

ده بالظبط اللي Laravel بيقدّمه جاهز: Eloquent كـ Model، و Blade كـ View، و Controllers، و [[Route]].`,
            when: "أول ما المشروع يعدّي كام صفحة، أو لما تبدأ تكرر نفس الـ queries في أكتر من مكان.",
            mistakes: R`[[extract($_POST)]]: المستخدم يقدر يكتب فوق أي متغير في الـ scope. و SQL جوه الـ views. و controller فيه ٥٠٠ سطر منطق (خليه رفيع، والمنطق في classes خدمة). و HTML بيتطبع بـ [[echo]] جوه الـ controller.`
          },
          teach: R`## المثال بيعمل إيه؟

ملفين: controller بيجيب بوست من الـ Model ويرجّع HTML من الـ View، ودالة [[view()]] بتحوّل ملف قالب لنص. عشان نشغّله عملنا مشروع صغير كامل: [[PostRepository]] بـ PDO على SQLite، و [[views/posts/show.php]]، و [[App\NotFound]]، والـ router من الدرس اللي فات. اتشغّل جوه Docker على [[php:8.4-cli]] (السيرفر على port 5911).

---

## ١. الـ controller

~~~php
namespace App\Controllers;
use App\Models\PostRepository;
final class PostController {
    public function __construct(private PostRepository $posts = new PostRepository()) {}
~~~

- [[private PostRepository $posts]]: constructor promotion (درس [[class]])، و [[private]] يعني الكلاس بس يشوفه.
- [[= new PostRepository()]]: قيمة افتراضية فيها [[new]] (مسموح من PHP 8.1). يعني [[new PostController()]] من غير arguments بيستخدم الـ repository الحقيقي، و [[new PostController($fake)]] بيستخدم اللي انت بعته. ده dependency injection.
- [[{}]] فاضية: الـ promotion عمل كل الشغل.

~~~php
    public function show(int $id): string {
        $post = $this->posts->find($id) ?? throw new \App\NotFound();
        return view('posts/show', ['post' => $post]);
    }
}
~~~

| الحتة | معناها |
|---|---|
| [[$this->posts->find($id)]] | اسأل الـ Model: البوست ده موجود؟ بيرجّع array أو [[null]] |
| [[?? throw ...]] | لو [[null]]، ارمي exception. ([[throw]] بقى ينفع جوه تعبير من PHP 8) |
| [[\App\NotFound]] | الـ [[\]] في الأول: الاسم من البداية، مش [[App\Controllers\App\NotFound]] |
| [[view('posts/show', [...])]] | اعرض القالب ده، وابعتله متغير اسمه [[post]] |

الـ controller مفيهوش SQL ولا HTML: بيسأل ويختار بس.

---

## ٢. الـ Model (من الـ solCode)

~~~php
class PostRepository {
    public function find(int $id): ?array {
        $stmt = db()->prepare('SELECT id, title FROM posts WHERE id = :id');
        $stmt->execute(['id' => $id]);
        return $stmt->fetch() ?: null;
    }
}
~~~

- [[db()]] دالة في [[helpers.php]] بترجّع object PDO واحد (عندنا SQLite، وفي MySQL نفس الكود).
- [[prepare]] + [[:id]] + [[execute]]: prepared statement، القيمة منفصلة عن الـ SQL (درس [[prepare / execute]]).
- [[fetch()]] بيرجّع الصف أو [[false]] لو مفيش. و [[?: null]] بيحوّل [[false]] لـ [[null]] عشان النوع [[?array]].

---

## ٣. [[view()]]: القالب يبقى نص

~~~php
function view(string $name, array $data = []): string {
    extract($data);
    ob_start();
    require dirname(__DIR__) . "/views/$name.php";
    return ob_get_clean();
}
~~~

خطوة خطوة:

1. [[extract($data)]]: كل key في الـ array يبقى متغير. الـ key [[post]] → المتغير [[$post]]. جربناه (بـ array فيها key اسمه [[post]] وقيمته array فيها [[title]]، وبعدين [[var_dump($post)]]):

~~~text الناتج
array(1) {
  ["title"]=>
  string(1) "x"
}
~~~

2. [[ob_start()]]: ob = output buffering. من دلوقتي أي [[echo]] أو HTML بيتحجز في الذاكرة بدل ما يروح للمتصفح.
3. [[require ".../views/$name.php"]]: يشغّل القالب، وطباعته كلها بتتحجز. [[$name]] جوه نص بـ [["..."]] بيتبدّل بقيمته: [[views/posts/show.php]]. والقالب بيشوف [[$post]] لأن [[require]] جوه دالة بيشتغل في نفس الـ scope بتاعها.
4. [[ob_get_clean()]]: رجّع اللي اتحجز كنص، وقفل الـ buffer.

جربنا الفكرة لوحدها: [[ob_start(); echo "<p>hi</p>"; $x = ob_get_clean(); echo strtoupper($x);]]:

~~~text الناتج
<P>HI</P>
~~~

الطباعة اتمسكت في [[$x]] واتعدّلت قبل ما تطلع.

---

## ٤. الـ View

~~~php
<h1><?= e($post['title']) ?></h1>
~~~

[[<?=]] اختصار [[<?php echo]]، و [[e()]] هي [[htmlspecialchars]] (درس [[htmlspecialchars]]). القالب بيطبع بس.

---

## ٥. التشغيل

حطينا في القاعدة بوست عنوانه [[أول بوست <b>عريض</b>]] وطلبنا [[/posts/1]]:

~~~text الناتج
HTTP/1.1 200 OK
Content-type: text/html; charset=UTF-8

<h1>أول بوست &lt;b&gt;عريض&lt;/b&gt;</h1>
~~~

الرحلة: router → [[PostController::show(1)]] → [[PostRepository::find(1)]] → [[view('posts/show')]] → النص ده. و [[<b>]] اتحوّلت [[&lt;b&gt;]] فبتظهر كنص مش كـ bold.

و [[/posts/999]] مع الـ [[try / catch (App\NotFound)]] اللي في الـ solCode:

~~~text الناتج
HTTP/1.1 404 Not Found

مش موجود
~~~

ومن غير [[catch]]، مع [[display_errors=0]]:

~~~text الناتج
HTTP/1.0 500 Internal Server Error
~~~

---

## ٦. الاختبار من غير قاعدة

~~~php
final class FakePostRepository extends PostRepository {
    public function __construct(private array $rows) {}
    public function find(int $id): ?array { return $this->rows[$id] ?? null; }
}
$c = new PostController(new FakePostRepository([1 => ['id' => 1, 'title' => '<b>تجربة</b>']]));
assert($c->show(1) === "<h1>&lt;b&gt;تجربة&lt;/b&gt;</h1>\n");
try { $c->show(2); assert(false); } catch (App\NotFound) {}
echo "OK: 2 اختبارات عدّوا\n";
~~~

- [[FakePostRepository]] بيورث من الحقيقي ويكتب فوق [[find]]: بيدوّر في array بدل القاعدة. عشان كده [[PostRepository]] في الـ solCode مش [[final]].
- [[assert(شرط)]]: لو الشرط false بيرمي [[AssertionError]]. وبيشتغل بس لو [[zend.assertions=1]]، عشان كده الأمر [[php -d zend.assertions=1 tests/PostControllerTest.php]] ([[-d]] بيغيّر إعداد ini للتشغيل ده بس).
- [[\n]] في آخر النص المتوقع: ملف القالب بيخلص بسطر جديد بعد [[</h1>]].
- [[catch (App\NotFound) {}]]: من PHP 8 ينفع [[catch]] من غير متغير. ولو [[show(2)]] مرماش، [[assert(false)]] هيفشل الاختبار.

~~~text الناتج
OK: 2 اختبارات عدّوا
~~~

---

## الخلاصة

| الجزء | الملف | بيعمل إيه | ممنوع فيه |
|---|---|---|---|
| Model | [[src/Models/PostRepository.php]] | SQL و PDO | HTML |
| View | [[views/posts/show.php]] | طباعة بـ [[e()]] | SQL وقرارات |
| Controller | [[src/Controllers/PostController.php]] | يسأل الـ Model ويختار الـ View | SQL و [[echo]] |
| [[view()]] | [[src/helpers.php]] | [[extract]] + [[ob_start]] + [[require]] + [[ob_get_clean]] | [[extract($_POST)]] |`,
          lines: [
            "الـ namespace بتاع الـ controllers.",
            "الـ Model اللي هنستخدمه.",
            "الـ controller.",
            "الـ repository بيتحقن، وليه قيمة افتراضية (PHP 8.1).",
            "action لعرض بوست.",
            "هات البوست أو ارمي NotFound (الـ router يحوّلها 404).",
            "رجّع HTML من القالب.",
            "قفلة.",
            "قفلة الكلاس.",
            "دالة عامة لعرض القوالب.",
            "حوّل الـ array لمتغيرات جوه القالب.",
            "ابدأ امسك أي طباعة.",
            "حمّل القالب (بيطبع في الـ buffer).",
            "رجّع اللي اتطبع كنص.",
            "قفلة."
          ],
          sol: R`[[/posts/1]] بيطلّع [[<h1>أول بوست &lt;b&gt;عريض&lt;/b&gt;</h1>]]: العنوان من القاعدة ومتأمّن بـ [[e()]]. و [[/posts/999]] من غير ما تمسك [[NotFound]] بيطلع 500 مع [[display_errors=0]] (زي الإنتاج)، ومع [[display_errors]] مفتوح (التطوير) بيطلع 200 ونص [[Fatal error: Uncaught App\NotFound]] في الصفحة، لأن طباعة الغلطة بتبعت الـ headers الأول. في الحالتين غلط، فامسكه في الـ router ورجّع 404.

الاختبار بيطبع [[OK: 2 اختبارات عدّوا]] من غير ما يلمس القاعدة، لأن الـ controller بياخد الـ repository من الـ constructor. عشان الـ fake يورث منه، [[PostRepository]] متبقاش [[final]]، أو الأحسن تعمل interface. ولو العربي طلع [[Ø£ÙˆÙ„]]، الصف اتخزن من client charset غلط، مش مشكلة في الكود.`,
          solCode: R`<?php // src/Models/PostRepository.php
namespace App\Models;
class PostRepository {
    public function find(int $id): ?array {
        $stmt = db()->prepare('SELECT id, title FROM posts WHERE id = :id');
        $stmt->execute(['id' => $id]);
        return $stmt->fetch() ?: null;
    }
}

<?php // tests/PostControllerTest.php  (php -d zend.assertions=1 tests/PostControllerTest.php)
require dirname(__DIR__) . '/vendor/autoload.php';
use App\Controllers\PostController;
use App\Models\PostRepository;
final class FakePostRepository extends PostRepository {
    public function __construct(private array $rows) {}
    public function find(int $id): ?array { return $this->rows[$id] ?? null; }
}
$c = new PostController(new FakePostRepository([1 => ['id' => 1, 'title' => '<b>تجربة</b>']]));
assert($c->show(1) === "<h1>&lt;b&gt;تجربة&lt;/b&gt;</h1>\n");
try { $c->show(2); assert(false); } catch (App\NotFound) {}
echo "OK: 2 اختبارات عدّوا\n";

// public/index.php: جوه الـ foreach
try {
    echo $action(...array_slice($m, 1));
} catch (App\NotFound) {
    http_response_code(404);
    echo 'مش موجود';
}
exit;`
        }
      ]
    }
]);
