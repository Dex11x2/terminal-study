// تكملة تاب php: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/php/01.js (شرح حقول الدرس في أوله)
MORE("php", [
    {
      t: "Laravel",
      l: 3,
      n: "الـ framework اللي أغلب شغل PHP بيطلبه: routes و Eloquent و validation و auth و API و queues و testing، وآخرها نشره على VPS",
      items: [
        {
          cmd: "laravel new",
          title: "ابدأ مشروع Laravel واعرف كل فولدر فيه بيعمل إيه",
          desc: R`Laravel 13 (نزل مارس 2026) محتاج PHP 8.3 أو أحدث. فيه طريقتين تبدأ بيهم: [[laravel new shop]] بالـ installer، وده بيسألك على starter kit (React أو Vue أو Svelte أو Livewire أو من غير)، وعلى Pest ولا PHPUnit، وعلى القاعدة. أو [[composer create-project laravel/laravel shop]] من غير أي أسئلة، ودي بتنزّل الـ skeleton العادي.

الاتنين بيعملوا نفس الحاجات: ملف [[.env]]، و [[APP_KEY]] عشوائي، وقاعدة SQLite في [[database/database.sqlite]]، ويشغّلوا الـ migrations الأولى. يعني المشروع شغال من أول دقيقة من غير MySQL.

خريطة الفولدرات: [[app/]] فيه كودك ([[Models]] و [[Http/Controllers]])، و [[routes/web.php]] الصفحات، و [[routes/console.php]] أوامر الترمنال والـ scheduler، و [[database/]] فيه migrations و factories و seeders، و [[resources/views]] ملفات Blade، و [[config/]] الإعدادات، و [[storage/]] اللوجات والكاش والملفات المرفوعة، و [[bootstrap/app.php]] فيه الـ middleware والـ routing والـ exceptions. و [[public/]] هو الفولدر الوحيد اللي المفروض يبقى على الويب، وفيه [[index.php]] ومعاه ملفات ثابتة صغيرة ([[favicon.ico]] و [[robots.txt]] و [[.htaccess]] لـ Apache) (نفس فكرة front controller في «Composer وتنظيم المشروع»).`,
          example: R`composer global require laravel/installer
laravel new shop
cd shop
php artisan --version
php artisan about
ls app/Models app/Http/Controllers routes database/migrations
composer run dev`,
          try: R`اعمل مشروع جديد بأي طريقة، وشغّل [[php artisan about]] واقرا أول قسمين. بعدين افتح [[localhost:8000]] و [[localhost:8000/up]]. وغيّر [[APP_NAME]] في [[.env]] لـ [[Shop]] وشغّل [[about]] تاني. آخر حاجة: شغّل [[php artisan config:cache]] وغيّر [[APP_NAME]] تاني وشوف [[about]] بيقول إيه، وفسّر.`,
          deep: {
            why: "Laravel هو اللي بيتطلب في أغلب إعلانات شغل PHP، ومشروع جديد صح (من غير ما تلزق فولدرات من مشروع قديم) بيوفّر عليك مشاكل إعدادات كتير. ولازم تعرف كل فولدر فيه إيه عشان تعرف تدوّر على أي حاجة، ومتحطش ملف في مكان غلط.",
            how: R`[[laravel new]] نفسه غلاف حوالين [[composer create-project]] بيضيف الأسئلة ويسطّب الـ starter kit و npm. ولو معندكش PHP أصلًا، موقع Laravel بيدّيك سطر واحد من [[php.new]] بيسطّب PHP و Composer والـ installer.

[[php artisan about]] بيطبع نسخة Laravel و PHP، والـ environment، والـ debug mode، والـ drivers (cache و database و queue و session). وده أول أمر تشغّله على أي سيرفر أو مشروع جديد عليك.

[[composer run dev]] بيشغّل [[php artisan dev]]: السيرفر، و Vite، والـ queue worker، واللوجات، كلهم في ترمنال واحد. و [[/up]] route جاهز بيرجّع 200 لو التطبيق قام، وده اللي تحطه في أي uptime monitor.

الـ config: كل ملف في [[config/]] بيقرا من [[.env]] بـ [[env('APP_NAME')]]، وانت في الكود بتقرا [[config('app.name')]] مش [[env()]]. ليه؟ لأن بعد [[config:cache]] ملف [[.env]] مبيتقراش خالص، والـ [[env()]] برّه [[config/]] هترجّع null.`,
            when: "أي مشروع PHP جديد فيه login وقاعدة وأكتر من كام صفحة. وفي الانترفيو غالبًا هيسألوك عن رحلة الطلب ومكان كل حاجة، مش الأوامر.",
            mistakes: R`تستخدم [[env('X')]] جوه controller أو service: شغال على جهازك وبيرجّع null على السيرفر بعد [[config:cache]]. وترفع [[.env]] على git (هو في [[.gitignore]] من الأول، متشيلوش). وتنسخ مشروع من غير [[php artisan key:generate]] فتاخد «No application encryption key». وتبدأ بـ MySQL من أول يوم وانت لسه بتتعلم: SQLite كفاية لحد ما تنشر.`
          },
          teach: R`## الأول: المثال ده بيعمل إيه؟

٧ أوامر: تسطّب أداة بتعمل مشاريع Laravel، وتعمل مشروع، وتدخله، وتسأله نسخته وإعداداته، وتبص على أهم فولدراته، وتشغّله.

كل الناتج تحت اتشغّل فعلًا على Laravel 13.35.0 و PHP 8.4.26 في container لينكس ([[php:8.4-cli]])، والمشروع اتعمل بـ [[composer create-project laravel/laravel shop]] (نفس الـ skeleton اللي [[laravel new]] بينزّله لو اخترت «من غير starter kit»).

---

## ١. [[composer global require laravel/installer]]

- [[composer]] مدير مكتبات PHP (درس «Composer وتنظيم المشروع»).
- [[global]] يعني سطّبه لليوزر بتاعك كله، مش جوه مشروع معيّن. بيتحط في فولدر Composer الـ global، وجواه [[vendor/bin/laravel]].
- [[require]] = سطّب الباكدج دي، و [[laravel/installer]] اسمها: «vendor/package».

~~~text الناتج (laravel --version بعد التسطيب)
Laravel Installer 5.32.0
~~~

> عشان تكتب [[laravel]] بس من أي مكان، فولدر [[vendor/bin]] ده لازم يبقى في الـ PATH. [[composer global config bin-dir --absolute]] بيقولك مكانه بالظبط على جهازك.

## ٢. [[laravel new shop]]

[[new]] = اعمل مشروع جديد، و [[shop]] اسم الفولدر اللي هيتعمل. الأمر بيسألك أسئلة (starter kit، و Pest ولا PHPUnit، والقاعدة)، وكل سؤال ليه flag لو عايز تجاوب من غير أسئلة. من [[laravel new --help]]:

| الـ flag | معناه |
|---|---|
| [[--react]] / [[--vue]] / [[--svelte]] / [[--livewire]] | الـ starter kit (فيه login و register جاهزين) |
| [[--no-authentication]] | من غير auth |
| [[--pest]] / [[--phpunit]] | framework الـ tests |
| [[--database=sqlite]] | القاعدة: mysql أو mariadb أو pgsql أو sqlite أو sqlsrv |
| [[--git]] | يعمل git repo |
| [[--no-node]] | ميعملش npm install |

والبديل من غير installer ولا أسئلة:

~~~bash
composer create-project laravel/laravel shop
~~~

وفي الآخر الاتنين بيشغّلوا نفس الـ scripts اللي في [[composer.json]] للمشروع:

~~~text post-create-project-cmd في composer.json
"@php artisan key:generate --ansi",
"@php -r \"file_exists('database/database.sqlite') || touch('database/database.sqlite');\"",
"@php artisan migrate --graceful --ansi"
~~~

يعني: [[APP_KEY]] عشوائي في [[.env]]، وملف SQLite فاضي، و migrations. والناتج عندي:

~~~text الناتج
 INFO  Application key set successfully.

 INFO  Running migrations.

0001_01_01_000000_create_users_table ......................... 129.14ms DONE
0001_01_01_000001_create_cache_table .......................... 59.80ms DONE
0001_01_01_000002_create_jobs_table .......................... 106.11ms DONE
~~~

الـ ٣ migrations دول بيعملوا جداول users و sessions و cache و jobs و failed_jobs وغيرهم. و [[APP_KEY]] هو المفتاح اللي Laravel بيشفّر بيه الكوكيز والجلسات، فلازم يبقى سر ومختلف لكل بيئة.

## ٣. [[cd shop]]

ادخل الفولدر. كل أوامر [[artisan]] لازم تتشغّل من جوه المشروع، لأن [[artisan]] ملف PHP في أوله.

## ٤. [[php artisan --version]]

[[artisan]] هو الـ CLI بتاع Laravel: ملف PHP اسمه [[artisan]] في جذر المشروع، فبتشغّله بـ [[php artisan ...]].

~~~text الناتج
Laravel Framework 13.35.0
~~~

13 النسخة الكبيرة (major)، و 35 الـ minor، و 0 الـ patch.

## ٥. [[php artisan about]]

~~~text الناتج (مختصر)
  Environment ................................................................
  Application Name ................................................... Laravel
  Laravel Version .................................................... 13.35.0
  PHP Version ......................................................... 8.4.26
  Environment .......................................................... local
  Debug Mode ......................................................... ENABLED
  URL ......................................................... localhost:8000
  Timezone ............................................................... UTC

  Cache ......................................................................
  Config .......................................................... NOT CACHED
  Routes .......................................................... NOT CACHED
  Views ........................................................... NOT CACHED

  Drivers ....................................................................
  Cache ............................................................. database
  Database ............................................................ sqlite
  Mail ................................................................... log
  Queue ............................................................. database
  Session ........................................................... database

  Storage ....................................................................
  public/storage .................................................. NOT LINKED
~~~

| السطر | معناه |
|---|---|
| Environment = local | قيمة [[APP_ENV]] في [[.env]]: على السيرفر لازم [[production]] |
| Debug Mode = ENABLED | [[APP_DEBUG=true]]: أي خطأ بيطلع بالتفاصيل. على السيرفر لازم OFF |
| Config / Routes / Views = NOT CACHED | لسه متعملهمش cache (ده للسيرفر، درس النشر) |
| Drivers | كل خدمة شغالة على إيه: القاعدة SQLite، والـ queue والـ session والـ cache في جداول القاعدة، والإيميل بيتكتب في اللوج |
| public/storage = NOT LINKED | لسه معملتش [[storage:link]] (درس الملفات) |

## ٦. [[ls app/Models app/Http/Controllers routes database/migrations]]

~~~text الناتج
app/Http/Controllers:
Controller.php

app/Models:
User.php

database/migrations:
0001_01_01_000000_create_users_table.php
0001_01_01_000001_create_cache_table.php
0001_01_01_000002_create_jobs_table.php

routes:
console.php
web.php
~~~

مشروع جديد فيه موديل واحد ([[User]])، و controller أساسي فاضي كل الـ controllers بتورث منه، وملفين routes. ومفيش [[routes/api.php]]: ده بيتعمل لما تشغّل [[php artisan install:api]] (درس Sanctum).

### الفولدرات اللي هتفتحها كل يوم

| الفولدر | فيه إيه |
|---|---|
| [[app/Models]] | كلاس لكل جدول |
| [[app/Http/Controllers]] | الكود اللي بيرد على الطلبات |
| [[routes/web.php]] | URL ← controller |
| [[routes/console.php]] | أوامر artisan بتاعتك والـ scheduler |
| [[database/]] | migrations و factories و seeders وملف SQLite |
| [[resources/views]] | ملفات Blade |
| [[config/]] | الإعدادات، وكلها بتقرا من [[.env]] |
| [[storage/]] | لوجات وكاش وملفات مرفوعة |
| [[bootstrap/app.php]] | تسجيل الـ routes والـ middleware والـ exceptions |
| [[public/]] | الحاجة الوحيدة اللي على الويب |

### [[public/]] و [[bootstrap/app.php]]

~~~text ls public
.htaccess  favicon.ico  index.php  robots.txt
~~~

[[index.php]] هو الـ front controller: كل طلب بيدخل منه. جواه ٣ خطوات بس: لو فيه maintenance mode اقف، و [[require]] لـ [[vendor/autoload.php]]، وبعدين [[$app->handleRequest(Request::capture())]]. والـ [[$app]] جاي من [[bootstrap/app.php]]:

~~~php
return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
~~~

- [[web:]] ملف الصفحات، و [[commands:]] ملف أوامر الترمنال.
- [[health: '/up']] هو اللي بيعمل route الـ [[/up]].

## ٧. [[composer run dev]]

[[composer run]] بيشغّل script من [[composer.json]]، و [[dev]] هو:

~~~text من composer.json
"dev": [
    "Composer\\Config::disableProcessTimeout",
    "@php artisan dev"
]
~~~

السطر الأول بيلغي الـ timeout بتاع Composer (٥ دقايق افتراضيًا) عشان السيرفر يفضل شغال. والتاني [[php artisan dev]]، وده بيشغّل السيرفر و Vite (محتاج Node و [[npm install]]) والـ queue واللوجات في ترمنال واحد. من غير Node تقدر تشغّل السيرفر لوحده:

~~~bash
php artisan serve
~~~

وبعدها:

~~~bash
curl -s -o /dev/null -w "%{http_code}\n" localhost:8000/up
~~~

~~~text الناتج
200
~~~

[[-o /dev/null]] ارمي الـ body، و [[-w "%{http_code}"]] اطبع الـ status بس. وصفحة [[/up]] نفسها فيها «Application up».

---

## تجربة الـ [[config:cache]] (من الـ try)

اتشغّلت بالترتيب ده:

~~~bash
sed -i "s/^APP_NAME=.*/APP_NAME=Shop/" .env
php artisan config:cache
sed -i "s/^APP_NAME=.*/APP_NAME=Shop2/" .env
php artisan about | grep -E "Application Name|Config "
~~~

~~~text الناتج
   INFO  Configuration cached successfully.

  Application Name ...................................................... Shop
  Config .............................................................. CACHED
~~~

الاسم لسه [[Shop]] مع إن [[.env]] بقى [[Shop2]]: [[config:cache]] جمع كل الإعدادات في ملف واحد [[bootstrap/cache/config.php]]، وبعدها Laravel مبيقراش [[.env]] خالص. وبعد [[php artisan config:clear]]:

~~~text الناتج
  Application Name ..................................................... Shop2
  Config .......................................................... NOT CACHED
~~~

وده سبب القاعدة: [[env('X')]] جوه ملفات [[config/]] بس، وفي الكود [[config('app.name')]].

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[composer global require laravel/installer]] | يسطّب أمر [[laravel]] مرة على جهازك |
| [[laravel new shop]] | مشروع جديد بأسئلة (أو [[composer create-project laravel/laravel shop]] من غير أسئلة) |
| [[php artisan --version]] | نسخة Laravel |
| [[php artisan about]] | البيئة والـ debug والـ cache والـ drivers |
| [[composer run dev]] | السيرفر و Vite والـ queue واللوجات |

الويب بيشوف [[public/]] بس، والأسرار في [[.env]] (مش في git)، وبعد [[config:cache]] تعديل [[.env]] مش بيبان غير بعد cache تاني أو [[config:clear]].`,
          lines: [
            R`سطّب الـ installer مرة واحدة على جهازك (بيتحط في [[~/.composer/vendor/bin]] أو [[~/.config/composer/vendor/bin]]، ولازم يبقى في الـ PATH).`,
            "مشروع جديد، والـ installer بيسألك على الـ starter kit والـ tests والقاعدة.",
            "ادخل المشروع.",
            R`النسخة، مثلًا [[Laravel Framework 13.x]].`,
            "ملخص البيئة: النسخ والـ drivers والـ debug mode.",
            "أهم الفولدرات اللي هتشتغل فيها.",
            "السيرفر و Vite والـ queue واللوجات مع بعض."
          ],
          sol: R`[[about]] بيطلّع قسم Environment فيه [[Application Name ... Laravel]] و [[Laravel Version ... 13.x]] و [[PHP Version ... 8.4.x]] و [[Environment ... local]] و [[Debug Mode ... ENABLED]]، وتحته قسم Cache و Drivers فيه [[Database ... sqlite]] و [[Queue ... database]] و [[Session ... database]].

[[localhost:8000]] صفحة الترحيب، و [[/up]] صفحة صغيرة «Application up» بـ status 200. بعد تغيير [[APP_NAME]] الاسم بيتغيّر في [[about]] على طول، لأن [[.env]] بيتقرا مع كل تشغيل.

بعد [[config:cache]]: الاسم الجديد مش هيظهر، و [[about]] هيكتب [[Config ... CACHED]]. الإعدادات اتجمعت في [[bootstrap/cache/config.php]] و [[.env]] مبقاش بيتقرا. [[php artisan config:clear]] يرجّع الوضع. والغلط الشائع: تفتكر إن التعديل في [[.env]] مشتغلش وتقعد تدوّر على bug، وده بالظبط اللي بيحصل على السيرفر لو نسيت تعمل [[config:cache]] تاني بعد تعديل [[.env]].`
        },
        {
          cmd: "Route::resource",
          title: "اربط الـ URL بـ controller، وخلّي Laravel يجيب الموديل من الـ id لوحده",
          desc: R`الـ routes في [[routes/web.php]]. كل route: method و URL و action. والـ action غالبًا method في controller: [[Route::get('/posts/{post}', [PostController::class, 'show'])]].

[[Route::resource('posts', PostController::class)]] سطر واحد بيعمل ٧ routes للـ CRUD كله بأسماء ثابتة: index و create و store و show و edit و update و destroy. و [[php artisan make:controller PostController --resource --model=Post]] بيعمل الكلاس بالـ ٧ methods فاضيين.

route model binding: لو الـ route فيه [[{post}]] والـ method بتاخد [[Post $post]]، Laravel بيعمل [[Post::findOrFail($id)]] لوحده، ولو مش موجود 404 من غير ولا سطر منك. و [[{post:slug}]] بيدوّر بعمود تاني غير الـ id.`,
          example: R`<?php
// routes/web.php
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PostController::class, 'index'])->name('home');
Route::resource('posts', PostController::class)->except(['index']);
Route::get('/p/{post:slug}', [PostController::class, 'show'])->name('posts.slug');

Route::middleware('auth')->prefix('admin')->name('admin.')->group(function () {
    Route::get('/stats', fn () => view('admin.stats'))->name('stats');
});`,
          try: R`اعمل موديل [[Post]] بـ migration فيه [[title]] و [[slug]] (unique)، و [[make:controller PostController --resource --model=Post]]. اكتب [[show(Post $post)]] بترجّع [[$post->title]]، وحط الـ routes دي. شغّل [[php artisan route:list --except-vendor]]، وافتح [[/posts/1]] و [[/posts/999]] و [[/p/<slug>]]، وبعدين [[/admin/stats]] وانت مش عامل login.`,
          flag: "script",
          deep: {
            why: "الـ routes هي خريطة التطبيق كله، وأول مكان أي حد بيفتحه في مشروع Laravel. والـ resource والـ binding بيشيلوا كود متكرر بيتنسى: كل show كانت هتبدأ بـ find ولو null ارجع 404، وكل واحدة منهم مكان لـ bug.",
            how: R`الـ ٧ routes بتاعة resource: [[GET /posts]] index، و [[GET /posts/create]] create، و [[POST /posts]] store، و [[GET /posts/{post}]] show، و [[GET /posts/{post}/edit]] edit، و [[PUT/PATCH /posts/{post}]] update، و [[DELETE /posts/{post}]] destroy. والأسماء [[posts.index]] و [[posts.show]] وهكذا، فتكتب [[route('posts.show', $post)]] بدل ما تلزق URL بإيدك، ولو غيّرت الـ URL كل اللينكات تتغير لوحدها.

[[Route::apiResource]] نفس الكلام من غير create و edit (مفيش فورم في API). و [[->only([...])]] و [[->except([...])]] بيقلّلوا.

الفورم HTML مبيعرفش غير GET و POST، فـ Blade بيحط [[@method('DELETE')]] كـ hidden input وLaravel بيقراه.

الـ binding بيطابق اسم الباراميتر في الـ URL مع اسم المتغير في الـ method بالظبط: [[{post}]] مع [[$post]]. ولو عايز كل الـ routes تدوّر بالـ slug افتراضيًا اعمل في الموديل [[getRouteKeyName()]] ترجّع [['slug']].

و [[->middleware('auth')]] بيحمي route أو group كامل: اللي مش عامل login بيتحوّل لـ route اسمه [[login]]، ولو مش موجود بياخد 500 (Route [login] not defined)، ولو الطلب JSON بياخد 401.`,
            when: "أي صفحة أو endpoint جديد. resource لما فيه CRUD على نوع واحد، و routes عادية لأي حاجة مش CRUD (dashboard، بحث، webhook). و [[route:list]] أول أمر لما صفحة تطلع 404 وانت متأكد إنها موجودة.",
            mistakes: R`تسمّي الباراميتر [[{id}]] والمتغير [[Post $post]]: الـ binding مش هيشتغل وهيجيلك موديل فاضي بـ id null، وأي حاجة بعدها غلط. وترتيب الـ routes: [[/posts/{post}]] قبل [[/posts/create]] (في routes عادية مش resource) فـ «create» يتعامل كأنه id. والـ binding بيجيب الموديل بس مش بيتأكد إن المستخدم ليه حق يشوفه: ده شغل الـ policy (IDOR). وفي الانترفيو: «إيه الفرق بين implicit و explicit binding؟» الأول بالاسم والنوع، والتاني بـ [[Route::model()]] أو [[Route::bind()]] في provider.`
          },
          teach: R`## الأول: الملف ده بيعمل إيه؟

[[routes/web.php]] هو خريطة الموقع: كل سطر بيقول «لو جه طلب بالـ method دي على الـ URL ده، شغّل الكود ده». المثال فيه ٤ أنواع: route عادي، و resource (٦ routes في سطر)، و binding بالـ slug، و group محمي بـ login.

كل اللي تحت اتشغّل على Laravel 13.35.0 و PHP 8.4.26 (container لينكس)، والسيرفر [[php artisan serve]]، والقاعدة SQLite فيها يوزر واحد وبوست واحد: id = 1، و title = [[Hello Laravel]]، و slug = [[hello-laravel]]. والـ controller هو اللي في الـ solCode ([[index]] و [[show]] بس).

---

## ١. الـ imports

~~~php
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;
~~~

- [[use]] بيدّي اسم قصير لكلاس طويل (مبيحمّلش حاجة، الـ autoloader هو اللي بيحمّل).
- [[Route]] اسمه **facade**: كلاس بـ methods شكلها static ([[Route::get]])، بس من جوه بينادي الـ router الحقيقي اللي Laravel عامله. الـ [[::]] معناها «method على الكلاس نفسه».

## ٢. route عادي

~~~php
Route::get('/', [PostController::class, 'index'])->name('home');
~~~

| الحتة | معناها |
|---|---|
| [[Route::get]] | الـ method: GET (و HEAD معاها أوتوماتيك) |
| [['/']] | الـ URL |
| [[PostController::class]] | اسم الكلاس الكامل كنص: [[App\Http\Controllers\PostController]] |
| [[[..., 'index']]] | array فيها الكلاس واسم الـ method |
| [[->name('home')]] | اسم للـ route، فتكتب [[route('home')]] بدل الـ URL |

~~~bash
curl -s localhost:8000/
~~~

~~~text الناتج
["Hello Laravel"]
~~~

[[index()]] رجّعت Collection من [[pluck('title')]]، و Laravel بيحوّل أي Collection أو array لـ JSON لوحده.

## ٣. [[Route::resource]]

~~~php
Route::resource('posts', PostController::class)->except(['index']);
~~~

[[resource]] بيعمل ٧ routes بأسماء ثابتة، و [[->except(['index'])]] بيشيل واحد (لأن الصفحة الرئيسية بتعمل شغله). و [[->only([...])]] العكس.

## ٤. binding بعمود تاني

~~~php
Route::get('/p/{post:slug}', [PostController::class, 'show'])->name('posts.slug');
~~~

- [[{post}]] بين أقواس = جزء متغير في الـ URL اسمه post.
- [[:slug]] = دوّر في عمود [[slug]] مش [[id]].
- والـ method [[show(Post $post)]]: اسم المتغير [[$post]] نفس اسم الباراميتر [[{post}]]، والنوع [[Post]]، فـ Laravel بيعمل الـ query لوحده.

## ٥. group محمي

~~~php
Route::middleware('auth')->prefix('admin')->name('admin.')->group(function () {
    Route::get('/stats', fn () => view('admin.stats'))->name('stats');
});
~~~

اقراها من الشمال لليمين، وكل حاجة بتتطبّق على كل اللي جوه الـ group:

| الحتة | الأثر على [[/stats]] |
|---|---|
| [[middleware('auth')]] | لازم يكون عامل login |
| [[prefix('admin')]] | الـ URL يبقى [[admin/stats]] |
| [[name('admin.')]] | الاسم يبقى [[admin.stats]] |
| [[group(function () {...})]] | الـ routes اللي جوه الدالة دي |

و [[fn () => view('admin.stats')]] اسمها arrow function: دالة من غير اسم بترجّع اللي بعد [[=>]] على طول. و [[view('admin.stats')]] = الملف [[resources/views/admin/stats.blade.php]] (النقطة = فولدر).

---

## ٦. [[php artisan route:list --except-vendor]]

[[--except-vendor]] = متعرضش الـ routes اللي جاية من مكتبات (زي [[/up]] و [[storage/{path}]]).

~~~text الناتج
  GET|HEAD        / .............................. home › PostController@index
  GET|HEAD        admin/stats ................ admin.stats › routes/web.php:11
  GET|HEAD        p/{post:slug} ............. posts.slug › PostController@show
  POST            posts ................... posts.store › PostController@store
  GET|HEAD        posts/create .......... posts.create › PostController@create
  GET|HEAD        posts/{post} .............. posts.show › PostController@show
  PUT|PATCH       posts/{post} .......... posts.update › PostController@update
  DELETE          posts/{post} ........ posts.destroy › PostController@destroy
  GET|HEAD        posts/{post}/edit ......... posts.edit › PostController@edit

                                                            Showing [9] routes
~~~

كل سطر: الـ method، والـ URL، وبعد النقط الاسم، وبعد [[›]] مين بينفّذ ([[Controller@method]]، أو ملف وسطر لو closure). و [[admin/stats]] اتعمله الـ prefix والاسم من الـ group.

### الـ ٦ اللي جم من resource

| method و URL | الاسم | الـ method في الـ controller |
|---|---|---|
| GET [[posts/create]] | [[posts.create]] | [[create]]: فورم جديد |
| POST [[posts]] | [[posts.store]] | [[store]]: احفظ |
| GET [[posts/{post}]] | [[posts.show]] | [[show]]: اعرض واحد |
| GET [[posts/{post}/edit]] | [[posts.edit]] | [[edit]]: فورم التعديل |
| PUT/PATCH [[posts/{post}]] | [[posts.update]] | [[update]]: احفظ التعديل |
| DELETE [[posts/{post}]] | [[posts.destroy]] | [[destroy]]: امسح |

ولو مكتبتش [[except]] كان هيبقى فيه سابع: GET [[posts]] باسم [[posts.index]].

---

## ٧. جرّبنا الـ URLs

| الطلب | الـ status | الرد |
|---|---|---|
| [[/posts/1]] | 200 | [[Hello Laravel]] |
| [[/posts/999]] | 404 | صفحة Not Found |
| [[/p/hello-laravel]] | 200 | [[Hello Laravel]] |
| [[/admin/stats]] | 500 | [[Route [login] not defined.]] |
| [[/admin/stats]] بـ [[Accept: application/json]] | 401 | [[{"message":"Unauthenticated."}]] |
| [[/posts/create]] | 500 | [[Call to undefined method App\Http\Controllers\PostController::create()]] |

- **[[/posts/999]]**: محدش كتب [[findOrFail]]. الـ binding عمل [[select * from posts where id = 999]]، ملقاش، فرمى 404. ولو طلبته كـ JSON الرسالة: [[No query results for model [App\Models\Post] 999]].
- **[[/admin/stats]]**: الـ middleware [[auth]] لقى إنك مش عامل login، فحاول يحوّلك لـ route اسمه [[login]]، ومفيش starter kit فمفيش route بالاسم ده: 500. ولو الطلب JSON مبيحوّلش، بيرجّع 401 على طول.
- **[[/posts/create]]**: الـ route موجود بس الـ method مش موجودة في الـ controller (الـ solCode فيه [[index]] و [[show]] بس). يعني [[resource]] بيعمل الـ routes، ومش بيتأكد إن الـ methods موجودة؛ عشان كده [[make:controller --resource]] بيعملهم فاضيين، أو استخدم [[only]].

---

## ٨. الـ solCode

~~~php
public function index()
{
    return Post::latest()->pluck('title');
}
~~~

[[latest()]] = [[ORDER BY created_at DESC]]، و [[pluck('title')]] = هات عمود واحد بس كـ Collection.

~~~php
public function show(Post $post)
{
    return $post->title;
}
~~~

الـ type [[Post]] هو اللي بيشغّل الـ binding. و [[$post->title]] نص، و Laravel بيرجّعه كـ response عادي. ولو غيّرت الاسم لـ [[show(Post $p)]] الـ binding مش هيلاقي باراميتر اسمه [[p]]، فهيحقن [[Post]] فاضي (موديل جديد مش من القاعدة) والعنوان يطلع فاضي من غير أي خطأ.

---

## الخلاصة

| اللي كتبته | اللي حصل |
|---|---|
| [[Route::get(url, [Controller::class, 'm'])]] | route واحد |
| [[Route::resource('posts', ...)]] | ٧ routes بأسماء [[posts.*]] |
| [[{post}]] + [[Post $post]] | الموديل من القاعدة أو 404 |
| [[{post:slug}]] | نفس الكلام بعمود slug |
| [[middleware('auth')->prefix()->name()->group()]] | حماية و URL واسم لكل اللي جوه |
| [[route:list --except-vendor]] | الخريطة كلها |

والـ binding بيجيب الموديل بس، مش بيقول مين مسموحله يشوفه: ده شغل الـ policy (درس Gate و Policy).`,
          lines: [
            "بداية الملف.",
            "استيراد الـ controller.",
            "والـ facade بتاع الـ routes.",
            R`الصفحة الرئيسية، ولها اسم [[home]] تستخدمه في [[route('home')]].`,
            R`٦ routes من الـ ٧ (من غير index لأننا عملناها في [[/]]).`,
            R`binding بعمود [[slug]] بدل الـ id.`,
            R`group: كله لازم login، وكله تحت [[/admin]]، وأسماؤه بتبدأ بـ [[admin.]].`,
            R`route اسمه [[admin.stats]] على [[/admin/stats]].`,
            "قفلة الـ group."
          ],
          sol: R`[[route:list --except-vendor]] بيطلّع ٩ routes: [[GET|HEAD /]] home، و [[posts.create]] و [[posts.store]] و [[posts.show]] و [[posts.edit]] و [[posts.update]] و [[posts.destroy]]، و [[p/{post:slug}]] اسمه [[posts.slug]]، و [[admin/stats]] اسمه [[admin.stats]]. و [[PUT|PATCH]] بتظهر سطر واحد.

[[/posts/1]] بيطبع العنوان. [[/posts/999]] صفحة 404 من غير ما تكتب أي حاجة. [[/p/<slug>]] نفس البوست. و [[/admin/stats]] وانت مش عامل login: خطأ 500 «Route [login] not defined» لأن مفيش starter kit لسه، ولما تسطّب واحد هيحوّلك لصفحة الـ login.

الغلط الشائع: [[show($id)]] بدل [[show(Post $post)]]، فبترجع تكتب [[findOrFail]] بإيدك، أو [[show(Post $p)]] باسم مختلف عن [[{post}]] فيجيلك موديل فاضي.`,
          solCode: R`<?php

namespace App\Http\Controllers;

use App\Models\Post;

class PostController extends Controller
{
    public function index()
    {
        return Post::latest()->pluck('title');
    }

    public function show(Post $post)
    {
        return $post->title;
    }
}`
        },
        {
          cmd: "hasMany / belongsTo",
          title: "اربط الموديلات ببعض: يوزر ليه بوستات، وبوست ليه تعليقات",
          desc: R`في Eloquent كل جدول كلاس، والعلاقة method في الموديل بترجّع نوع العلاقة. المستخدم [[hasMany]] بوستات، والبوست [[belongsTo]] مستخدم، والبوست [[belongsToMany]] tags من خلال جدول وسيط.

وبعدها تستخدمها كأنها property: [[$user->posts]] بيرجّع Collection، و [[$post->user]] بيرجّع User واحد. أو كـ method تبني عليها query: [[$user->posts()->where('published', true)->count()]].

الاتفاقية: البوست فيه عمود [[user_id]] (اسم الموديل + [[_id]])، و Laravel بيستنتجه لوحده. في الـ migration: [[$table->foreignId('user_id')->constrained()->cascadeOnDelete()]].`,
          example: R`<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Post extends Model
{
    protected $fillable = ['title', 'slug', 'body', 'published_at'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class)->latest();
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class)->withTimestamps();
    }
}`,
          try: R`ضيف في [[User]] العلاقة العكسية [[posts(): HasMany]]. وفي [[php artisan tinker]]: هات أول يوزر، واعمله بوست بـ [[$user->posts()->create([...])]] من غير ما تكتب [[user_id]]، واطبع [[$user->posts()->count()]] و [[$user->posts->count()]] بعدها على طول. ليه الرقمين ممكن يختلفوا؟`,
          flag: "script",
          deep: {
            why: "أي تطبيق حقيقي بياناته مترابطة: طلبات ومنتجات، ومستخدمين وأدوار. العلاقات في Eloquent بتخليك تكتب [[$order->items]] بدل JOIN في كل مكان، وبتحط الـ user_id لوحدها وقت الإنشاء، فمبتنساش تربط.",
            how: R`الأنواع الأساسية: [[hasOne]] و [[belongsTo]] (واحد لواحد، والـ foreign key عند اللي بيعمل belongsTo)، و [[hasMany]] (واحد لكتير)، و [[belongsToMany]] (كتير لكتير بجدول وسيط اسمه أسماء الموديلين مفرد بالترتيب الأبجدي: [[post_tag]])، و [[hasManyThrough]] (البلد ليها بوستات عن طريق المستخدمين)، و [[morphMany]] (تعليقات على بوستات وفيديوهات بنفس الجدول).

الـ property مقابل الـ method: [[$user->posts]] بتنفّذ query أول مرة وتحفظ النتيجة في الموديل، وأي مرة بعدها بترجّع نفس الـ Collection من الذاكرة. [[$user->posts()]] بترجّع query builder جديد، فـ [[->count()]] بيعمل [[SELECT COUNT(*)]] في القاعدة.

الإنشاء من خلال العلاقة: [[$user->posts()->create([...])]] بيحط [[user_id]] لوحده. و [[belongsToMany]] ليها [[attach]] و [[detach]] و [[sync([1, 2, 3])]] (بيخلي الجدول الوسيط فيه دول بس بالظبط).

وفي Laravel 13 تقدر تكتب [[$fillable]] كـ attribute فوق الكلاس: [[#[Fillable(['title', 'slug'])]]]، وده اللي في موديل [[User]] الجديد. الاتنين شغالين.`,
            when: "كل ما يكون فيه foreign key في الجدول. ولو محتاج بيانات على العلاقة نفسها (الكمية في order_product مثلًا) [[->withPivot('qty')]].",
            mistakes: R`تنسى إن [[$user->posts]] محفوظة: تضيف بوست وتعد [[$user->posts->count()]] فيطلع الرقم القديم؛ [[$user->refresh()]] أو [[$user->load('posts')]]. وتكتب العلاقة من غير return type فالـ IDE و Larastan ميعرفوش نوعها. وتنسى [[constrained()]] فالقاعدة تقبل [[user_id]] مش موجود. والأخطر: تستخدم العلاقة جوه loop من غير [[with()]] (الدرس الجاي).`
          },
          teach: R`## الأول: الكلاس ده بيعمل إيه؟

موديل [[Post]] فيه ٣ methods، كل واحدة بتوصف علاقة بجدول تاني: البوست بتاع يوزر واحد، وليه تعليقات كتير، وليه tags كتير. ولما تناديها، Eloquent بيكتب الـ SQL لوحده.

كل اللي تحت اتشغّل على Laravel 13.35.0 و PHP 8.4.26 (container لينكس، SQLite)، بجداول [[users]] و [[posts]] (من درس make:migration) و [[comments]] ([[post_id]] و [[user_id]] و [[body]]) و [[tags]] ([[name]]) و [[post_tag]] ([[post_id]] و [[tag_id]] و timestamps).

---

## ١. الـ namespace والـ imports

~~~php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
~~~

- [[namespace App\Models]]: الكلاس ده اسمه الكامل [[App\Models\Post]]، والملف [[app/Models/Post.php]] (PSR-4).
- [[Model]] الكلاس الأساسي اللي فيه كل حاجة: [[find]] و [[create]] و [[save]].
- الـ ٣ التانيين أنواع العلاقات، محتاجينهم بس عشان نكتبهم كـ return type بعد [[:]].

## ٢. [[class Post extends Model]] و [[$fillable]]

~~~php
class Post extends Model
{
    protected $fillable = ['title', 'slug', 'body', 'published_at'];
~~~

- [[extends Model]] = Post بيورث كل اللي في Model.
- اسم الجدول بيتستنتج: [[Post]] ← [[posts]] (snake_case وجمع).
- [[$fillable]] الأعمدة اللي ينفع تتملى بـ [[create([...])]]. ولاحظ إن [[user_id]] **مش** فيها، وده مقصود (تحت هتشوف ليه مش محتاجينه).

## ٣. [[belongsTo]]: البوست بتاع مين؟

~~~php
public function user(): BelongsTo
{
    return $this->belongsTo(User::class);
}
~~~

- [[$this]] = البوست الحالي، و [[User::class]] = النص [[App\Models\User]].
- **belongs to** = «ينتمي لـ». القاعدة: اللي عنده الـ foreign key هو اللي بيعمل belongsTo. البوست فيه عمود [[user_id]]، فـ Eloquent بيستنتج اسم العمود من اسم الـ method ([[user]] + [[_id]]).

الـ SQL اللي بيطلع (بـ [[$post->user()->toRawSql()]]):

~~~text الناتج
select * from "users" where "users"."id" = 1
~~~

الـ [[1]] دي قيمة [[user_id]] في البوست.

## ٤. [[hasMany]]: تعليقات البوست

~~~php
public function comments(): HasMany
{
    return $this->hasMany(Comment::class)->latest();
}
~~~

- **has many** = «عنده كتير». الـ foreign key في الجدول التاني: [[comments.post_id]].
- [[->latest()]] بتضيف ترتيب للعلاقة نفسها، فكل مرة تجيب التعليقات بتيجي الأحدث الأول.

~~~text الناتج
select * from "comments" where "comments"."post_id" = 1 and "comments"."post_id" is not null order by "created_at" desc
~~~

## ٥. [[belongsToMany]]: كتير لكتير

~~~php
public function tags(): BelongsToMany
{
    return $this->belongsToMany(Tag::class)->withTimestamps();
}
~~~

البوست ليه tags كتير، والـ tag عليها بوستات كتير، فمفيش مكان لعمود واحد. الحل جدول وسيط اسمه أسماء الموديلين مفرد بالترتيب الأبجدي: [[post_tag]].

~~~text الناتج
select * from "tags" inner join "post_tag" on "tags"."id" = "post_tag"."tag_id" where "post_tag"."post_id" = 1
~~~

و [[withTimestamps()]] بيخلي Eloquent يملى [[created_at]] و [[updated_at]] في [[post_tag]] لما تربط.

### [[sync]] اتجربت

~~~php
$p->tags()->sync([1, 2]);
print_r($p->tags()->sync([2, 3]));
~~~

~~~text الناتج (التانية)
Array
(
    [attached] => Array ( [0] => 3 )
    [detached] => Array ( [0] => 1 )
    [updated] => Array ( )
)
~~~

[[sync([2, 3])]] خلّى الجدول الوسيط فيه 2 و 3 بس بالظبط: ضاف 3، وشال 1، وساب 2. وبعد أول sync، [[created_at]] في [[post_tag]] اتملى بسبب [[withTimestamps]].

---

## ٦. الـ try: property مقابل method

ضفنا في [[User]] العلاقة العكسية (هي نفسها الـ solCode):

~~~php
public function posts(): HasMany
{
    return $this->hasMany(Post::class);
}
~~~

> لازم [[use Illuminate\Database\Eloquent\Relations\HasMany;]] فوق في User. من غيره PHP بيفهم [[HasMany]] على إنه [[App\Models\HasMany]] وبيرمي: [[Return value must be of type App\Models\HasMany, Illuminate\Database\Eloquent\Relations\HasMany returned]]. حصلت فعلًا وإحنا بنجرّب.

وبعدين (اليوزر كان عنده بوست واحد قبلها):

~~~php
$u = User::first();
echo $u->posts->count();                       // قريناها مرة
$p = $u->posts()->create(['title' => 'x', 'slug' => 'x', 'body' => '...']);
echo $p->user_id;
echo $u->posts->count();
echo $u->posts()->count();
echo $u->load('posts')->posts->count();
~~~

~~~text الناتج
before: 1
user_id: 1
property: 1
method: 2
load: 2
~~~

| الكتابة | نوعها | بتعمل إيه |
|---|---|---|
| [[$u->posts]] (من غير أقواس) | [[Illuminate\Database\Eloquent\Collection]] | query أول مرة، وبعدين النتيجة محفوظة في الموديل |
| [[$u->posts()]] (بأقواس) | [[Illuminate\Database\Eloquent\Relations\HasMany]] | query builder جديد كل مرة |
| [[$p->user]] | [[App\Models\User]] | موديل واحد |

فـ [[property: 1]] رقم قديم: الـ Collection اتحمّلت قبل الإنشاء واتحفظت. و [[method: 2]] عمل [[SELECT COUNT(*)]] جديد. و [[load('posts')]] حمّلها تاني.

و [[$p->user_id]] طلع 1 من غير ما نكتبه: [[$u->posts()->create(...)]] بيحط الـ foreign key لوحده. عشان كده [[user_id]] مش في [[$fillable]].

والـ query builder تقدر تكمّل عليه:

~~~text $u->posts()->where('title', 'x')->toRawSql()
select * from "posts" where "posts"."user_id" = 1 and "posts"."user_id" is not null and "title" = 'x'
~~~

---

## الخلاصة

| العلاقة | الـ foreign key فين | مثال |
|---|---|---|
| [[belongsTo]] | عندي ([[posts.user_id]]) | [[$post->user]] |
| [[hasMany]] | عند التاني ([[comments.post_id]]) | [[$post->comments]] |
| [[belongsToMany]] | في جدول وسيط ([[post_tag]]) | [[$post->tags]]، و [[attach]] و [[detach]] و [[sync]] |

من غير أقواس = النتيجة (ومحفوظة)، وبأقواس = query تبني عليه. والإنشاء من خلال العلاقة بيحط الـ id لوحده.`,
          lines: [
            "بداية الملف.",
            "الـ namespace بتاع الموديلات.",
            "الكلاس الأساسي لأي موديل.",
            "نوع علاقة belongsTo (للـ return type).",
            "نوع belongsToMany.",
            "نوع hasMany.",
            R`موديل [[Post]] = جدول [[posts]] (جمع الاسم لوحده).`,
            "فتحة الكلاس.",
            "الأعمدة المسموح تتملى بـ create و fill (mass assignment).",
            "العلاقة الأولى: البوست بتاع مين.",
            "فتحة.",
            R`بيدوّر في [[users]] بقيمة [[user_id]] اللي في البوست.`,
            "قفلة.",
            "العلاقة التانية: تعليقات البوست.",
            "فتحة.",
            R`[[comments.post_id]] = id البوست، ومترتبة الأحدث الأول.`,
            "قفلة.",
            "كتير لكتير.",
            "فتحة.",
            R`جدول وسيط [[post_tag]]، وبيملى [[created_at]] فيه كمان.`,
            "قفلة.",
            "قفلة الكلاس."
          ],
          sol: R`في tinker: [[$u = User::first();]] و [[$u->posts()->create(['title' => 'x', 'slug' => 'x', 'body' => '...']);]] بيرجّع موديل Post فيه [[user_id]] = id اليوزر من غير ما تكتبه.

لو كنت قريت [[$u->posts]] قبل الإنشاء، [[$u->posts->count()]] هيطلّع الرقم القديم (مثلًا 0)، و [[$u->posts()->count()]] الرقم الصح (1). الأولى Collection اتحمّلت مرة واتحفظت في الموديل، والتانية query جديدة. ولو مكنتش قريتها قبل كده، الاتنين هيطلعوا 1 لأن أول قراية حصلت بعد الإنشاء.

الغلط الشائع: تكتب [['user_id' => $u->id]] بإيدك في [[Post::create]] وتضيف [[user_id]] للـ [[$fillable]]، فتفتح باب إن أي طلب يحدد صاحب البوست.`,
          solCode: R`// app/Models/User.php (جوه الكلاس)
public function posts(): HasMany
{
    return $this->hasMany(Post::class);
}

// php artisan tinker
$u = User::first();
$u->posts->count();          // 0 واتحفظت
$u->posts()->create(['title' => 'x', 'slug' => 'x', 'body' => '...']);
$u->posts->count();          // لسه 0
$u->posts()->count();        // 1
$u->load('posts')->posts->count(); // 1`
        },
        {
          cmd: "with() و N+1",
          title: "ليه الصفحة بتعمل 51 query بدل 2؟ (N+1 و eager loading)",
          desc: R`N+1: بتجيب 50 بوست بـ query واحدة، وبعدين في الـ loop بتكتب [[$post->user->name]]، فكل لفة بتعمل query تجيب اليوزر. 1 + 50 = 51 query لصفحة واحدة. على جهازك مش هتحس، وعلى السيرفر مع قاعدة بعيدة كل query بـ 1 أو 2 ms فالصفحة تبقى بطيئة.

الحل eager loading: [[Post::with('user')->get()]] بيجيب البوستات، وبعدين كل اليوزرز اللي محتاجهم في query واحدة [[WHERE id IN (...)]]. يعني 2 query مهما كان العدد.

و [[withCount('comments')]] بيجيب عدد التعليقات كعمود [[comments_count]] من غير ما يحمّل التعليقات نفسها.`,
          example: R`<?php
use App\Models\Post;
use Illuminate\Support\Facades\DB;

DB::enableQueryLog();
foreach (Post::latest()->take(50)->get() as $post) {
    $post->user->name;
}
echo count(DB::getQueryLog()), " queries\n";

DB::flushQueryLog();
$posts = Post::with('user')->withCount('comments')->latest()->take(50)->get();
foreach ($posts as $post) {
    $post->user->name . ' ' . $post->comments_count;
}
echo count(DB::getQueryLog()), " queries\n";`,
          try: R`اعمل 50 بوست بـ factory (الدرس بعد الجاي، أو [[Post::factory(50)->create()]] لو عندك). حط الكود ده في [[php artisan tinker]] وشوف الرقمين. بعدين ضيف في [[AppServiceProvider::boot()]] السطر [[Model::preventLazyLoading(! app()->isProduction());]] وشغّل أول loop تاني.`,
          flag: "script",
          deep: {
            why: "N+1 أشهر مشكلة أداء في أي ORM (Eloquent و Prisma و Django)، وأشهر سؤال انترفيو Laravel بعد «إيه هو service container». والـ ORM بيخبّيها لأن [[$post->user]] شكلها property عادية.",
            how: R`[[with('user')]] بيعمل [[select * from users where id in (1, 2, 3)]] ويوزّع النتايج على البوستات في الذاكرة. ومتداخل: [[with('comments.user')]]. ومشروط: [[with(['comments' => fn ($q) => $q->latest()->limit(3)])]]. وأعمدة معينة: [[with('user:id,name')]] (لازم الـ id).

[[load('user')]] نفس الفكرة بس على موديلات اتجابت خلاص (lazy eager loading)، مفيد لما القرار يتاخد بعد الـ query.

[[Model::preventLazyLoading()]] بيخلي أي lazy loading يرمي [[LazyLoadingViolationException]] بدل ما يعدّي ساكت. تحطه في التطوير بس، فتكتشف الـ N+1 وانت بتكتب. و [[Model::shouldBeStrict()]] بيجمعه مع حاجتين تانيين (منع الأعمدة الغلط في fill، ومنع قراية عمود مجبتوش).

وفي Laravel 13 فيه [[Model::automaticallyEagerLoadRelationships()]] بيكتشف العلاقة اللي بتتقرا في loop ويحمّلها للكل مرة واحدة. مفيد، بس [[with()]] الصريح لسه أوضح وهو اللي هيتسأل عليه.

وعشان تشوف الـ queries في المتصفح: Laravel Debugbar، أو Telescope، أو [[DB::listen]] في الـ provider.`,
            when: "أي loop على موديلات فيه علاقة، وأي API Resource بيرجّع علاقة. قاعدة ثابتة: الـ controller يعمل [[with()]] لكل حاجة الـ view هتقراها.",
            mistakes: R`تعمل [[with()]] لكل العلاقات «احتياطي» فتحمّل آلاف الصفوف مش محتاجها. وتعمل [[$post->comments->count()]] (بيحمّل كل التعليقات عشان يعدّهم) بدل [[withCount]]. وتنسى إن [[with('user:name')]] من غير [[id]] بيرجّع user null. وفي الانترفيو قول الأرقام: «51 query بقت 2»، واذكر إنك بتكتشفها بـ preventLazyLoading مش بالصدفة.`
          },
          teach: R`## الأول: الكود ده بيقيس إيه؟

نفس الشغلة مرتين: هات ٥٠ بوست واقرا اسم صاحب كل واحد. المرة الأولى بالطريقة «الطبيعية»، والتانية بـ [[with()]]، وفي الآخر كل مرة بنطبع عدد الـ queries اللي اتبعتت للقاعدة.

كل اللي تحت اتشغّل على Laravel 13.35.0 و PHP 8.4.26 (container لينكس، SQLite)، بعد [[migrate:fresh]] و [[Post::factory(50)->has(Comment::factory(2))->create()]]: ٥٠ بوست، كل واحد ليه تعليقين.

---

## ١. التجهيز

~~~php
use App\Models\Post;
use Illuminate\Support\Facades\DB;

DB::enableQueryLog();
~~~

- [[DB]] الـ facade بتاع القاعدة.
- [[enableQueryLog()]] بيقول لـ Laravel: احفظ في الذاكرة كل query بتتبعت من دلوقتي. و [[DB::getQueryLog()]] بيرجّعهم array، كل عنصر فيه [[query]] و [[bindings]] (القيم) و [[time]].

## ٢. الطريقة اللي فيها N+1

~~~php
foreach (Post::latest()->take(50)->get() as $post) {
    $post->user->name;
}
echo count(DB::getQueryLog()), " queries\n";
~~~

- [[Post::latest()]] = رتّب بـ [[created_at]] من الأحدث، و [[take(50)]] = [[LIMIT 50]]، و [[get()]] = نفّذ ورجّع Collection.
- [[foreach (... as $post)]] لف على البوستات واحد واحد.
- [[$post->user->name]]: [[user]] من غير أقواس = هات العلاقة. البوست لسه مجابش صاحبه، فـ Eloquent بيعمل query **دلوقتي** (اسمها lazy loading، يعني تحميل وقت الحاجة).
- [[count(...)]] عدد العناصر، و [[", "]] و [["\n"]] نص وسطر جديد.

~~~text الناتج
51 queries
~~~

أول ٣ منهم من الـ log:

~~~text الناتج
select * from "posts" order by "created_at" desc limit 50 []
select * from "users" where "users"."id" = ? limit 1 [41]
select * from "users" where "users"."id" = ? limit 1 [42]
~~~

واحدة للبوستات (الـ **1**)، وبعدين واحدة لكل بوست (الـ **N** = ٥٠). والـ [[?]] هي الـ placeholder والقيمة بين الأقواس المربعة: يعني prepared statements.

## ٣. [[DB::flushQueryLog()]]

بيفضّي السجل، عشان نعد الطريقة التانية لوحدها.

## ٤. الطريقة الصح

~~~php
$posts = Post::with('user')->withCount('comments')->latest()->take(50)->get();
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[with('user')]] | بعد ما تجيب البوستات، هات كل اليوزرز بتوعهم في query واحدة |
| [[withCount('comments')]] | ضيف عمود [[comments_count]] محسوب جوه نفس الـ SELECT |
| [[latest()->take(50)->get()]] | زي الأول |

~~~php
foreach ($posts as $post) {
    $post->user->name . ' ' . $post->comments_count;
}
echo count(DB::getQueryLog()), " queries\n";
~~~

النقطة [[.]] في PHP بتلزق نصوص. والسطر ده مبيطبعش حاجة، بس بيقرا العلاقة، وده كفاية يعمل query لو مكانتش محمّلة.

~~~text الناتج
2 queries
~~~

والـ ٢ دول بالظبط:

~~~text الناتج
select "posts".*, (select count(*) from "comments" where "posts"."id" = "comments"."post_id") as "comments_count" from "posts" order by "created_at" desc limit 50
select * from "users" where "users"."id" in (1, 2, 3, 4, 5, ..., 50)
~~~

- الأولى: البوستات، ومعاها subquery بيعد التعليقات لكل بوست. فـ [[$post->comments_count]] = 2 من غير ما التعليقات نفسها تتحمّل.
- التانية: [[where id in (...)]] بكل الـ ids المطلوبة مرة واحدة، و Eloquent بيوزّعهم على البوستات في الذاكرة.

> الـ factory عمل ١٥٠ يوزر: يوزر لكل بوست، ويوزر لكل تعليق (لأن [[CommentFactory]] فيه [[User::factory()]] برضه). عشان كده الـ ids في الـ IN من 1 لـ 50 بس: دول أصحاب البوستات.

---

## ٥. الـ try: [[preventLazyLoading]]

~~~php
Model::preventLazyLoading(! app()->isProduction());
~~~

- [[Model]] هو [[Illuminate\Database\Eloquent\Model]].
- [[app()->isProduction()]] true لو [[APP_ENV=production]]. و [[!]] بتعكس: يعني «امنع الـ lazy loading في أي بيئة غير الإنتاج». في الإنتاج متكسرش الصفحة، بس وانت بتطوّر الغلطة تبان على طول.
- مكانه [[boot()]] في [[app/Providers/AppServiceProvider.php]]، وده بيتنفّذ مع كل طلب.

وبعده أول loop:

~~~text الناتج
Illuminate\Database\LazyLoadingViolationException: Attempted to lazy load [user] on model [App\Models\Post] but lazy loading is disabled.
~~~

وجرّبنا [[Post::take(1)->get()]] (بوست واحد) وقرينا [[->user]]: **مرماش**. لأن مع موديل واحد مفيش N+1 أصلًا، فـ Laravel بيسيبه. عشان كده جرّب دايمًا على ٢ أو أكتر.

---

## الخلاصة

| الكود | عدد الـ queries لـ ٥٠ بوست |
|---|---|
| [[Post::...->get()]] وبعدين [[$post->user]] في loop | 51 (1 + N) |
| [[Post::with('user')->...->get()]] | 2 |
| [[withCount('comments')]] | صفر زيادة (subquery جوه الأولى) |

القاعدة: أي علاقة الـ view أو الـ loop هيقراها، اعملها [[with()]] في الـ query. و [[preventLazyLoading]] بيخلي النسيان exception وانت لسه بتكتب.`,
          lines: [
            "بداية الكود (في tinker تقدر تلزقه من غير السطر ده).",
            "موديل البوست.",
            "الـ facade بتاع القاعدة.",
            "ابدأ سجّل كل query.",
            "50 بوست بـ query واحدة...",
            "...وكل لفة query تجيب صاحب البوست (N).",
            "قفلة الـ loop.",
            R`هيطبع [[51 queries]].`,
            "امسح السجل.",
            "البوستات، واليوزرز في query، وعدد التعليقات جوه الـ query الأولى.",
            "نفس الـ loop.",
            "مفيش أي query هنا: كل حاجة في الذاكرة.",
            "قفلة.",
            R`هيطبع [[2 queries]].`
          ],
          sol: R`أول رقم [[51 queries]] (واحدة للبوستات و 50 لليوزرز)، وتاني رقم [[2 queries]]: البوستات ومعاها [[comments_count]] كـ subquery في نفس الـ SELECT، واليوزرز بـ [[where id in (...)]]. ولو كل البوستات لنفس اليوزر هيبقى الأول برضه 51، لأن Eloquent مبيعملش cache للعلاقة بين موديلات مختلفة.

بعد [[preventLazyLoading]] أول loop بيرمي: [[Attempted to lazy load [user] on model [App\Models\Post] but lazy loading is disabled.]]. ودي بالظبط الفايدة: الغلطة بقت exception وانت بتكتب.

ملحوظة: [[preventLazyLoading]] مبيرميش لو الـ query رجّعت موديل واحد بس، فجرّبه على 2 بوست على الأقل.`
        },
        {
          cmd: "scopes و $fillable",
          title: "اكتب شرط الـ query مرة واحدة، واقفل الأعمدة اللي المستخدم ميقدرش يغيّرها",
          desc: R`local scope: شرط بيتكرر (البوستات المنشورة، المنتجات اللي في المخزن) بتكتبه مرة في الموديل وتستخدمه كأنه method: [[Post::published()->latest()->get()]].

في Laravel 13 الطريقة الجديدة: method [[protected]] عليها attribute [[#[Scope]]]. والطريقة القديمة [[scopePublished($query)]] لسه شغالة، وهتلاقيها في أغلب المشاريع.

mass assignment: [[Post::create($request->all())]] بيحط أي حقل جه في الطلب. لو المستخدم بعت [[is_admin=1]] أو [[user_id=5]] وهما في الجدول، اتكتبوا. عشان كده Eloquent رافض أي create من غير ما تقول الأعمدة المسموحة: [[$fillable]] (أو [[#[Fillable([...])]]] في 13). والعكس [[$guarded]]: كله مسموح ما عدا دول.`,
          example: R`<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['title', 'slug', 'body', 'published_at'];

    protected function casts(): array
    {
        return ['published_at' => 'datetime'];
    }

    #[Scope]
    protected function published(Builder $query): void
    {
        $query->whereNotNull('published_at')->where('published_at', '<=', now());
    }

    #[Scope]
    protected function search(Builder $query, ?string $term): void
    {
        $query->when($term, fn ($q) => $q->where('title', 'like', "%{$term}%"));
    }
}`,
          try: R`حط الموديل ده، وفي tinker: [[Post::published()->search('laravel')->toRawSql()]] واقرا الـ SQL. بعدين جرّب [[Post::create(['title' => 'a', 'slug' => 'a', 'body' => 'b', 'user_id' => 1, 'views' => 999])]] (ضيف عمود [[views]] للجدول لو مش موجود) وشوف الصف اتكتب إزاي.`,
          flag: "script",
          deep: {
            why: "الـ scopes بتخلي «منشور» ليه تعريف واحد في المشروع: لو اتغيّر (بقى فيه [[is_hidden]] كمان) بتغيّره في مكان واحد بدل 12 controller. و [[$fillable]] خط دفاع قدام ثغرة حقيقية: GitHub اتخترق بيها سنة 2012 في Rails (mass assignment) وأي حد قدر يضيف مفتاحه لأي repo.",
            how: R`الـ scope بياخد الـ Builder كأول باراميتر، وأي باراميترات بعده بتيجي من النداء: [[search('laravel')]]. و [[when($term, ...)]] بيطبّق الشرط لو [[$term]] مش فاضي بس، فالـ scope ينفع من غير بحث.

global scope: شرط بيتطبّق على كل query للموديل من غير ما تنادي عليه، زي [[SoftDeletes]] اللي بيضيف [[whereNull('deleted_at')]] لوحده. وتلغيه بـ [[withoutGlobalScope]] أو [[withTrashed()]].

الـ casts: [[published_at]] بيرجع Carbon بدل نص، فتكتب [[$post->published_at->diffForHumans()]]. و [['password' => 'hashed']] في موديل User بيعمل hash لوحده. و [['meta' => 'array']] لعمود JSON.

[[$fillable]] بيتطبّق على [[create]] و [[fill]] و [[update]] بس. [[$post->user_id = 1; $post->save();]] بيعدّي عادي، لأنك انت اللي كتبته صراحة. والأعمدة اللي مش في [[$fillable]] بتتشال بصمت. و [[Model::preventSilentlyDiscardingAttributes()]] بيخليها exception في التطوير.

والأأمن من الاتنين: متبعتش [[$request->all()]] أصلًا، ابعت [[$request->validated()]] (درس Form Request).`,
            when: "scope لأي شرط اتكرر مرتين. و [[$fillable]] في كل موديل بيتعمل create من بيانات مستخدم. [[$guarded = []]] (كله مسموح) بس لو متأكد إنك دايمًا بتبعت validated.",
            mistakes: R`تحط [[user_id]] أو [[role]] أو [[is_admin]] في [[$fillable]] عشان create اشتغل، ومعاها [[$request->all()]]: رجعت الثغرة. وتعمل [[$guarded = []]] في كل الموديلات عشان «الـ MassAssignmentException مزعجة». وتنسى إن الـ scope لازم يبدأ [[protected]] مع [[#[Scope]]]: لو [[public]] ممكن تناديه بالغلط على موديل بدل query. وفي الانترفيو: «إيه هو mass assignment وإزاي Laravel بيحميك؟».`
          },
          teach: R`## الأول: الموديل ده فيه إيه جديد؟

٣ حاجات: [[$fillable]] (مين من الأعمدة ينفع يتملى من array)، و [[casts()]] (حوّل عمود لنوع PHP)، و scopes (شروط query ليها اسم). والهدف: الشرط يتكتب مرة، والمستخدم ميقدرش يملى عمود مش بتاعه.

كل اللي تحت اتشغّل على Laravel 13.35.0 و PHP 8.4.26 (container لينكس، SQLite)، على ٥٠ بوست من الـ factory (فيهم مسودات)، والجدول فيه عمود [[views]] من درس make:migration.

---

## ١. الـ imports الجديدة

~~~php
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
~~~

- [[Scope]] هو الـ **attribute** اللي هنحطه فوق الـ method. الـ attribute هو [[#[...]]] فوق كلاس أو method: معلومة إضافية Laravel بيقراها (ميزة PHP 8.0).
- [[Builder]] نوع الـ query builder بتاع Eloquent (اللي بتكتب عليه [[where]] و [[orderBy]]).

## ٢. [[$fillable]]

~~~php
protected $fillable = ['title', 'slug', 'body', 'published_at'];
~~~

[[protected]] = متشافش من برّه الكلاس. و [[$fillable]] اسم ثابت Eloquent بيدوّر عليه: الأعمدة دي بس ينفع تيجي من [[create([...])]] أو [[fill([...])]] أو [[update([...])]].

## ٣. [[casts()]]

~~~php
protected function casts(): array
{
    return ['published_at' => 'datetime'];
}
~~~

القاعدة بترجّع التاريخ نص زي [['2025-12-10 08:12:33']]. الـ cast بيحوّله object من نوع Carbon (مكتبة تواريخ) لما تقراه:

~~~text الناتج (get_class و diffForHumans)
Illuminate\Support\Carbon | 10 months ago
~~~

## ٤. scope من غير باراميتر: [[published]]

~~~php
#[Scope]
protected function published(Builder $query): void
{
    $query->whereNotNull('published_at')->where('published_at', '<=', now());
}
~~~

- [[#[Scope]]] بيقول لـ Laravel: الـ method دي scope، فتقدر تناديها [[Post::published()]] كأنها method على الـ query.
- [[protected]] مع إننا بنناديها من برّه؟ أيوه: Laravel بيلتقط النداء ويديها الـ query. ولو ناديتها على موديل جاهز بدل query ([[$post->published()]]) مش هتشتغل.
- أول باراميتر دايمًا الـ query، وانت مبتبعتهوش. و [[: void]] لأنك بتعدّل الـ query نفسه مش بترجّع حاجة.
- [[whereNotNull]] = مش مسودة، و [[where('published_at', '<=', now())]] = ميعاد نشره جه (مش متجدول في المستقبل). و [[now()]] الوقت الحالي.

## ٥. scope بباراميتر: [[search]]

~~~php
#[Scope]
protected function search(Builder $query, ?string $term): void
{
    $query->when($term, fn ($q) => $q->where('title', 'like', "%{$term}%"));
}
~~~

- [[?string $term]]: الـ [[?]] قبل النوع = nullable، يعني نص أو null.
- [[when($term, ...)]]: لو [[$term]] قيمته «truthy» (مش null ولا فاضي) نفّذ الدالة، غير كده سيب الـ query زي ما هو.
- [[fn ($q) => ...]] arrow function بتاخد الـ query.
- [["%{$term}%"]]: نص بعلامات تنصيص مزدوجة، فـ [[{$term}]] بتتبدّل بالقيمة. و [[%]] في [[LIKE]] = أي حروف قبل وبعد.

> القيمة دي **مش** ملزوقة في الـ SQL. [[where]] بيبعتها كـ binding. شوف تحت.

---

## ٦. الـ try: اقرا الـ SQL

~~~php
Post::published()->search('laravel')->toRawSql()
~~~

~~~text الناتج
select * from "posts" where "published_at" is not null and "published_at" <= '2026-10-07 16:54:39' and "title" like '%laravel%'
~~~

والـ query الحقيقي اللي بيتبعت ([[toSql()]]):

~~~text الناتج
select * from "posts" where "published_at" is not null and "published_at" <= ? and "title" like ?
~~~

[[toRawSql]] بيحط القيم مكان الـ [[?]] عشان تقراه بس؛ اللي بيروح للقاعدة prepared. و [[search(null)]]:

~~~text الناتج
select * from "posts" where "published_at" is not null and "published_at" <= '2026-10-07 16:54:39'
~~~

شرط الـ like اختفى بسبب [[when]]. و [[Post::published()->count()]] طلع [[39 of 50]]: الـ factory بيعمل حوالي ٢٠٪ مسودات.

## ٧. الـ try: mass assignment

~~~php
Post::create(['title' => 'a', 'slug' => 'a', 'body' => 'b', 'user_id' => 1, 'views' => 999]);
~~~

~~~text الناتج
Illuminate\Database\QueryException: SQLSTATE[23000]: Integrity constraint violation: 19 NOT NULL constraint failed: posts.user_id
~~~

ليه؟ [[user_id]] و [[views]] مش في [[$fillable]]، فـ Eloquent **شالهم بصمت**، والـ INSERT راح من غير [[user_id]]، والعمود NOT NULL فالقاعدة رفضت. نتأكد بـ [[new Post([...])]] (من غير حفظ):

~~~text الناتج (var_dump($n->user_id, $n->views))
NULL
NULL
~~~

وبعدين:

~~~php
$n->user_id = 1;
$n->save();
~~~

~~~text الناتج (بعد refresh)
user_id=1 views=0
~~~

- [[$n->user_id = 1]] عدّى، لأن [[$fillable]] على الـ arrays بس؛ انت هنا كاتبه صراحة بإيدك.
- [[views]] = 0: القيمة الافتراضية من الـ migration، والـ 999 اللي «المستخدم» بعتها راحت.

---

## الخلاصة

| الحاجة | بتعمل إيه |
|---|---|
| [[$fillable = [...]]] | الأعمدة اللي تيجي من array، والباقي يتشال بصمت |
| [[$model->col = x]] | بيعدّي دايمًا (انت اللي كاتبه) |
| [[casts()]] | عمود ← نوع PHP (Carbon، array، hashed) |
| [[#[Scope] protected function x(Builder $q)]] | [[Post::x()]] |
| [[when($v, fn)]] | شرط بيتطبّق لو فيه قيمة بس |
| [[toRawSql()]] | اقرا الـ SQL بالقيم |

والأأمن من [[$fillable]] لوحده: ابعت [[$request->validated()]] مش [[$request->all()]].`,
          lines: [
            "بداية الملف.",
            "الـ namespace.",
            R`attribute الـ scope (Laravel 12 وأحدث).`,
            "نوع الـ query builder.",
            "الموديل الأساسي.",
            "الكلاس.",
            "فتحة.",
            "الأعمدة المسموحة في create و update.",
            "الـ casts: تحويل الأعمدة لأنواع PHP.",
            "فتحة.",
            R`[[published_at]] يرجع Carbon.`,
            "قفلة.",
            R`scope اسمه [[published]].`,
            "فتحة.",
            "ليه تاريخ نشر وجه وقته.",
            "قفلة.",
            R`scope بباراميتر: [[search($term)]].`,
            "فتحة.",
            R`الشرط بيتطبّق لو فيه كلمة بحث بس (والقيمة parameter مش ملزوقة).`,
            "قفلة.",
            "قفلة الكلاس."
          ],
          sol: R`[[toRawSql()]] بيطلّع حاجة زي: [[select * from "posts" where "published_at" is not null and "published_at" <= '2026-09-29 ...' and "title" like '%laravel%']]. و [[toRawSql]] بيحط القيم عشان تقراها بس، الـ query الحقيقي فيه [[?]] (prepared). ولو ناديت [[search(null)]] شرط الـ like بيختفي.

الـ create بيعدّي من غير أي error، بس [[user_id]] و [[views]] مش هيتكتبوا: [[user_id]] هيبقى null (أو الـ insert هيفشل بـ NOT NULL constraint لو العمود مطلوب)، و [[views]] القيمة الافتراضية. الـ keys اللي مش في [[$fillable]] بتتشال بصمت.

الغلط الشائع: تفتكر إن Laravel هيرمي exception للأعمدة الزيادة. هو بيرمي [[MassAssignmentException]] بس لما يكون مفيش [[$fillable]] خالص (أو [[$guarded = ['*']]]).`
        },
        {
          cmd: "make:migration",
          title: "غيّر شكل الجدول بملف في git بدل ما تعدّل في phpMyAdmin",
          desc: R`الـ migration ملف PHP فيه [[up()]] (التغيير) و [[down()]] (الرجوع). [[php artisan migrate]] بيشغّل كل اللي ماتشغلش، وبيسجّل أساميهم في جدول [[migrations]]. فأي حد يعمل [[git pull]] و [[migrate]] بيوصل لنفس شكل القاعدة بالظبط، على جهازه أو على السيرفر.

[[php artisan make:model Post -mfs]] بيعمل الموديل ومعاه migration و factory و seeder مرة واحدة. ولأي تعديل بعد كده ملف جديد: [[make:migration add_views_to_posts_table]]. متعدّلش migration اتشغّل على السيرفر.`,
          example: R`<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('body');
            $table->timestamp('published_at')->nullable()->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};`,
          try: R`اعمل الـ migration ده وشغّل [[migrate]]. بعدين اعمل migration تاني يضيف [[unsignedInteger('views')->default(0)]] بعد [[body]]، وشغّل [[migrate:status]] و [[migrate]] و [[migrate:rollback]] و [[migrate:status]] تاني. إيه اللي اتغيّر في كل مرة؟`,
          flag: "script",
          deep: {
            why: "من غير migrations كل مطوّر قاعدته شكل، والسيرفر شكل تالت، والـ deploy بيقع لأن عمود ناقص. الـ migration بيخلي شكل القاعدة جزء من الكود: بيتراجع في PR، وبيترجع مع git.",
            how: R`الأنواع الأشهر: [[id()]] (bigint auto increment)، [[string]] (varchar 255)، [[text]]، [[integer]] و [[unsignedInteger]]، [[decimal('price', 10, 2)]] للفلوس (مش float)، [[boolean]]، [[json]]، [[timestamp]]، [[timestamps()]] (created_at و updated_at)، [[softDeletes()]]. والـ modifiers: [[nullable()]] و [[default()]] و [[unique()]] و [[index()]] و [[after('col')]] (MySQL بس).

[[foreignId('user_id')->constrained()]] بيعمل عمود وقيد foreign key على [[users.id]]. و [[cascadeOnDelete()]] يمسح البوستات لما اليوزر يتمسح، و [[nullOnDelete()]] يخلي العمود null.

تعديل عمود موجود: [[$table->string('title', 500)->change();]]، ولازم تكتب كل الـ modifiers تاني وإلا بيتشالوا.

الأوامر: [[migrate]]، و [[migrate:status]] (اتشغل ولا لأ وفي أنهي batch)، و [[migrate:rollback]] (آخر batch)، و [[migrate:fresh --seed]] (يمسح كل الجداول ويبني من الأول ويملى، للتطوير بس)، و [[migrate --pretend]] (يطبع الـ SQL من غير ما ينفّذ). وعلى السيرفر [[migrate --force]] لأن في production بيسألك تأكيد.

والجداول الافتراضية في المشروع الجديد: users و password_reset_tokens و sessions، و cache، و jobs و failed_jobs.`,
            when: "أي تغيير في شكل القاعدة، حتى index واحد. والـ deploy بيشغّل [[migrate --force]] كل مرة.",
            mistakes: R`تعدّل migration قديم بعد ما اتشغّل على السيرفر: السيرفر مش هيشغّله تاني لأنه متسجّل، والقاعدتين يختلفوا. و [[migrate:fresh]] على production (بيمسح كل البيانات). و [[float]] للفلوس. وتضيف عمود NOT NULL من غير default لجدول فيه بيانات فالـ migration يقع. و [[down()]] فاضية فالـ rollback ميرجّعش. وعلى جداول كبيرة في MySQL، إضافة index ممكن تقفل الجدول: اعملها في وقت هادي.`
          },
          teach: R`## الأول: الملف ده إيه؟

migration بيعمل جدول [[posts]]. فيه دالتين: [[up()]] بتعمل الجدول، و [[down()]] بتمسحه لو رجعت. و Laravel بيترجم كل سطر فيه لـ SQL حسب القاعدة اللي شغال عليها.

كل اللي تحت اتشغّل على Laravel 13.35.0 و PHP 8.4.26 (container لينكس) والقاعدة SQLite (الافتراضي في المشروع الجديد). وعشان نشوف الـ SQL من غير ما ينفّذ، استخدمنا [[php artisan migrate --pretend]].

---

## ١. اعمل الملف

~~~bash
php artisan make:model Post -m
~~~

~~~text الناتج
   INFO  Model [app/Models/Post.php] created successfully.

   INFO  Migration [database/migrations/2026_10_07_164053_create_posts_table.php] created successfully.
~~~

اسم الملف بيبدأ بالتاريخ والوقت، وده اللي بيحدد ترتيب التنفيذ. و [[-m]] = migration مع الموديل (و [[-mfs]] = migration و factory و seeder).

## ٢. الـ imports و [[return new class]]

~~~php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
~~~

- [[Schema]] الـ facade اللي بيعمل ويعدّل ويمسح جداول.
- [[Blueprint]] الـ object اللي بتوصف عليه الأعمدة ([[$table]]).
- [[return new class extends Migration]]: كلاس **من غير اسم** (anonymous class)، والملف بيرجّع object منه على طول. ليه من غير اسم؟ عشان لو عندك migrationين اسمهم [[AddViewsToPostsTable]] في سنتين مختلفتين، PHP مش هيقول «الكلاس ده متعرّف قبل كده».

## ٣. [[up()]]: الأعمدة سطر سطر

~~~php
public function up(): void
{
    Schema::create('posts', function (Blueprint $table) {
~~~

[[Schema::create('posts', ...)]] = اعمل جدول اسمه posts، والدالة اللي بعده بتستلم [[$table]] وانت بتضيف عليه. و [[: void]] يعني الدالة مبترجّعش حاجة.

| السطر | العمود |
|---|---|
| [[$table->id();]] | [[id]] رقم بيزيد لوحده و primary key |
| [[$table->foreignId('user_id')->constrained()->cascadeOnDelete();]] | [[user_id]] رقم، وقيد foreign key على [[users.id]]، ولو اليوزر اتمسح بوستاته تتمسح |
| [[$table->string('title');]] | نص قصير (varchar) |
| [[$table->string('slug')->unique();]] | نص، ومينفعش يتكرر (وده بيعمل index) |
| [[$table->text('body');]] | نص طويل |
| [[$table->timestamp('published_at')->nullable()->index();]] | تاريخ، ممكن يبقى NULL، وعليه index |
| [[$table->timestamps();]] | عمودين: [[created_at]] و [[updated_at]] |

- [[constrained()]] من غير باراميتر: بيستنتج الجدول من اسم العمود ([[user_id]] ← [[users]]).
- [[nullable()]]: مسموح يبقى فاضي، يعني البوست مسودة لسه.
- [[index()]]: بيخلي الفلترة والترتيب بالعمود ده سريع.

الـ SQL اللي طلع فعلًا على SQLite:

~~~text الناتج (migrate --pretend)
create table "posts" ("id" integer primary key autoincrement not null, "user_id" integer not null, "title" varchar not null, "slug" varchar not null, "body" text not null, "published_at" datetime, "created_at" datetime, "updated_at" datetime, foreign key("user_id") references "users"("id") on delete cascade)
create unique index "posts_slug_unique" on "posts" ("slug")
create index "posts_published_at_index" on "posts" ("published_at")
~~~

لاحظ: كل عمود [[not null]] إلا [[published_at]] والـ timestamps. و [[unique()]] و [[index()]] طلعوا أوامر منفصلة، وكل index ليه اسم أوتوماتيك: جدول_عمود_نوع.

## ٤. [[down()]]

~~~php
public function down(): void
{
    Schema::dropIfExists('posts');
}
~~~

[[dropIfExists]] = امسح الجدول لو موجود. ده اللي [[migrate:rollback]] بيشغّله.

---

## ٥. الـ try: migration تاني يضيف عمود

~~~bash
php artisan make:migration add_views_to_posts_table
~~~

الاسم بالشكل ده ([[add_..._to_posts_table]]) بيخلي Laravel يعمل الملف جاهز بـ [[Schema::table('posts', ...)]] بدل [[create]]. وملينا الـ [[up]] والـ [[down]] زي الـ solCode:

~~~php
Schema::table('posts', function (Blueprint $table) {
    $table->unsignedInteger('views')->default(0)->after('body');
});
~~~

- [[Schema::table]] = عدّل جدول موجود.
- [[unsignedInteger]] رقم صحيح من غير سالب، و [[default(0)]] قيمة للصفوف الموجودة والجديدة.
- و [[down()]] فيها [[$table->dropColumn('views');]]: العكس بالظبط.

### [[migrate:status]] قبل

~~~text الناتج
  Migration name .............................................. Batch / Status
  0001_01_01_000000_create_users_table ............................... [1] Ran
  ...
  2026_10_07_164442_create_post_tag_table ............................ [1] Ran
  2026_10_07_165200_add_views_to_posts_table ......................... Pending
~~~

[[Ran]] اتشغّل، و [[Pending]] لسه. والرقم بين القوسين هو الـ **batch**: كل مرة تشغّل [[migrate]] كل اللي اتشغّل فيها ياخد نفس الرقم.

### [[migrate --pretend]] ثم [[migrate]]

~~~text الناتج
  2026_10_07_165200_add_views_to_posts_table .................................
  ⇂ alter table "posts" add column "views" integer not null default '0'
~~~

~~~text الناتج
   INFO  Running migrations.

  2026_10_07_165200_add_views_to_posts_table .................... 82.02ms DONE
~~~

و [[status]] بقى [[[2] Ran]]: batch رقم ٢.

### [[migrate:rollback]]

~~~text الناتج
   INFO  Rolling back migrations.

  2026_10_07_165200_add_views_to_posts_table ................... 360.81ms DONE
~~~

رجّع آخر batch بس (ملف الـ views)، والـ [[status]] رجع [[Pending]]، والجداول التانية محدش لمسها.

### فين [[after('body')]]؟

بعد [[migrate]] تاني، الأعمدة بالترتيب:

~~~text الناتج (Schema::getColumnListing('posts'))
id, user_id, title, slug, body, published_at, created_at, updated_at, views
~~~

[[views]] في **الآخر** مش بعد [[body]]: [[after()]] بيشتغل في MySQL و MariaDB بس، و SQLite بيتجاهله من غير أي رسالة.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[make:migration add_x_to_posts_table]] | ملف جديد بالتاريخ |
| [[migrate]] | يشغّل كل الـ Pending في batch جديد |
| [[migrate:status]] | Ran ولا Pending وفي أنهي batch |
| [[migrate --pretend]] | يطبع الـ SQL من غير تنفيذ |
| [[migrate:rollback]] | يرجّع آخر batch بـ [[down()]] |
| [[migrate:fresh]] | يمسح كل الجداول ويبني من الأول (للتطوير بس) |

كل تغيير في القاعدة = ملف جديد. والملف اللي اتشغّل على السيرفر متعدّلوش.`,
          lines: [
            "بداية الملف.",
            "كلاس الـ migration.",
            "الـ Blueprint اللي بيوصف الأعمدة.",
            "الـ facade بتاع الـ schema.",
            "كلاس من غير اسم (anonymous) عشان متحصلش مشكلة أسماء متكررة.",
            "فتحة.",
            "التغيير.",
            "فتحة.",
            R`اعمل جدول [[posts]].`,
            "id رقم بيزيد لوحده.",
            "صاحب البوست، foreign key، ويتمسح معاه.",
            "العنوان.",
            "الـ slug، unique (وده بيعمل index لوحده).",
            "النص الطويل.",
            "تاريخ النشر، ممكن فاضي (مسودة)، وعليه index للفرز والفلترة.",
            R`[[created_at]] و [[updated_at]].`,
            "قفلة.",
            "قفلة up.",
            "الرجوع.",
            "فتحة.",
            "امسح الجدول.",
            "قفلة.",
            "قفلة الكلاس."
          ],
          sol: R`بعد الـ migration التاني، [[migrate:status]] بيوري ملف الـ views [[Pending]]. [[migrate]] بيشغّله ويكتب [[DONE]]، و [[status]] يبقى [[Ran]] في batch رقم أكبر. [[migrate:rollback]] بيرجّع آخر batch بس (ملف الـ views)، و [[status]] يرجع يقول Pending، والجدول من غير العمود.

لازم [[down()]] في التاني تبقى [[$table->dropColumn('views');]]، وإلا الـ rollback هيقول DONE ومش هيشيل حاجة.

ملحوظة: [[after('body')]] بيشتغل في MySQL و MariaDB بس. في SQLite (الافتراضي) بيتجاهله والعمود يتحط في الآخر.`,
          solCode: R`<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->unsignedInteger('views')->default(0)->after('body');
        });
    }

    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->dropColumn('views');
        });
    }
};`
        },
        {
          cmd: "factories و db:seed",
          title: "املى القاعدة ببيانات تجربة واقعية في ثانية",
          desc: R`الـ factory بيوصف «بوست عشوائي» شكله إيه، بـ Faker لقيم واقعية. و [[Post::factory(50)->create()]] بيعمل 50 صف. و [[->for($user)]] بيربطهم بيوزر، و [[->has(Comment::factory(3))]] يعمل لكل بوست 3 تعليقات.

الـ seeder كلاس بيستخدم الـ factories عشان يبني قاعدة تجربة كاملة، و [[php artisan db:seed]] بيشغّل [[DatabaseSeeder]]. و [[migrate:fresh --seed]] يبني القاعدة من الصفر ويملاها، وده أمر هتشغّله كل يوم في التطوير.

والـ factories نفسها هي اللي بتستخدمها في الـ tests.`,
          example: R`<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PostFactory extends Factory
{
    public function definition(): array
    {
        $title = fake()->sentence(4);

        return [
            'user_id' => User::factory(),
            'title' => $title,
            'slug' => Str::slug($title) . '-' . Str::random(5),
            'body' => fake()->paragraphs(3, true),
            'published_at' => fake()->optional(0.8)->dateTimeBetween('-1 year'),
        ];
    }

    public function draft(): static
    {
        return $this->state(['published_at' => null]);
    }
}`,
          try: R`اكتب [[DatabaseSeeder]] يعمل يوزر ثابت ([[test@example.com]]) ليه 10 بوستات، منهم 3 draft، وكل بوست ليه 2 تعليق، وكمان 5 يوزرز عشوائيين كل واحد ليه 3 بوستات. شغّل [[migrate:fresh --seed]]، وفي tinker اعد البوستات والتعليقات، و [[Post::published()->count()]].`,
          flag: "script",
          deep: {
            why: "صفحة بتتجرّب على 3 صفوف كتبتهم بإيدك مش هتوريك pagination، ولا N+1، ولا عنوان طويل بيكسر التصميم. والـ tests محتاجة بيانات تتعمل في سطر. الـ factory بيعمل الاتنين من نفس التعريف.",
            how: R`[[User::factory()]] جوه [[definition]] معناها: لو محدش حدد يوزر، اعمل واحد جديد. لكن [[->for($user)]] أو [[->create(['user_id' => $id])]] بيلغي ده.

الـ states: [[draft()]] بيغيّر حقول معينة، فتكتب [[Post::factory()->draft()->create()]]. و [[->count(3)]] زي [[factory(3)]]. و [[->make()]] بيعمل موديل من غير ما يحفظ (للـ unit tests). و [[->sequence(['published_at' => null], ['published_at' => now()])]] بيبدّل بين القيم.

العلاقات: [[User::factory()->has(Post::factory(3))->create()]]، أو بالاختصار السحري [[->hasPosts(3)]]. و [[Post::factory()->for($user)]] للعكس.

[[fake()]] helper بيرجّع Faker، و [[fake('ar_EG')]] لبيانات عربي. و [[unique()]]: [[fake()->unique()->safeEmail()]].

والـ seeder بينادي seeders تانية بـ [[$this->call([...])]]. و [[db:seed --class=ProductSeeder]] واحد بس.`,
            when: "مع كل موديل جديد. seeders للتطوير والـ demo، وبيانات إنتاج أساسية (أدوار، إعدادات، دول) بتبقى في seeder منفصل تشغّله على السيرفر بـ [[--class]] أو في migration.",
            mistakes: R`[[slug]] من [[sentence]] بس فيتكرر مع 500 بوست والـ unique يقع (عشان كده الـ random في الآخر). و [[bcrypt('password')]] جوه loop بطيء، والـ UserFactory الجاهز بيعمله static مرة واحدة. وتشغّل [[db:seed]] على production فيتعمل يوزر [[test@example.com]] بباسورد معروف. و factory لموديل من غير [[HasFactory]] trait.`
          },
          teach: R`## الأول: الكلاس ده بيوصف إيه؟

[[PostFactory]] بيقول «بوست عشوائي شكله كده»: عنوان، و slug، ونص، وتاريخ نشر، وصاحب. ومنه تعمل بوست واحد أو ألف في سطر، للتجربة وللـ tests.

كل اللي تحت اتشغّل على Laravel 13.35.0 و PHP 8.4.26 (container لينكس، SQLite). والقيم العشوائية بتتغير كل مرة، فاللي هتشوفه عندك أرقام وكلام مختلف بنفس الشكل.

---

## ١. الـ imports والكلاس

~~~php
namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PostFactory extends Factory
~~~

- الـ factories في [[database/factories]] والـ namespace [[Database\Factories]].
- [[Factory]] الكلاس الأساسي اللي فيه [[create]] و [[make]] و [[count]] و [[for]] و [[has]].
- [[Str]] helpers للنصوص.
- الاسم [[PostFactory]] = [[Post]] + Factory، فـ Laravel بيربطه بالموديل لوحده. والموديل لازم فيه [[use HasFactory;]] عشان [[Post::factory()]] يشتغل.

## ٢. [[definition()]]

~~~php
public function definition(): array
{
    $title = fake()->sentence(4);
~~~

- [[definition]] بترجّع array: عمود ← قيمة، لصف واحد. بتتنادى مرة لكل صف.
- [[fake()]] بيرجّع Faker، مكتبة بتعمل بيانات شكلها حقيقي. و [[sentence(4)]] جملة حوالي ٤ كلمات (مش بالظبط).

~~~php
    return [
        'user_id' => User::factory(),
        'title' => $title,
        'slug' => Str::slug($title) . '-' . Str::random(5),
        'body' => fake()->paragraphs(3, true),
        'published_at' => fake()->optional(0.8)->dateTimeBetween('-1 year'),
    ];
}
~~~

| السطر | بيعمل إيه |
|---|---|
| [['user_id' => User::factory()]] | factory مش رقم: «لو محدش حدد صاحب، اعمل يوزر جديد وحط الـ id بتاعه» |
| [[Str::slug($title)]] | العنوان حروف صغيرة وشُرط: [[Qui optio nihil]] ← [[qui-optio-nihil]] |
| [[. '-' . Str::random(5)]] | النقطة بتلزق، و ٥ حروف عشوائية عشان الـ slug unique ميتكررش |
| [[paragraphs(3, true)]] | ٣ فقرات، و [[true]] = رجّعهم نص واحد مش array |
| [[optional(0.8)->dateTimeBetween('-1 year')]] | ٨٠٪ تاريخ في آخر سنة، و ٢٠٪ [[null]] (مسودة) |

بوست واحد بـ [[Post::factory()->make()]]:

~~~text الناتج
{
    "title": "Qui optio nihil dolores vel.",
    "slug": "qui-optio-nihil-dolores-vel-JjAtn",
    "published_at": "2026-01-26T00:40:36.000000Z"
}
~~~

و [[make()]] بيعمل الموديل **من غير حفظ**: [[$p->exists]] = [[false]] و [[$p->id]] = [[NULL]]. أما [[create()]] بيحفظ في القاعدة.

## ٣. state: [[draft()]]

~~~php
public function draft(): static
{
    return $this->state(['published_at' => null]);
}
~~~

- [[state([...])]] بيغيّر حقول معينة فوق الـ definition.
- [[: static]] = بترجّع factory من نفس النوع، فتقدر تكمّل عليها: [[Post::factory()->draft()->create()]].
- اتجربت: [[Post::factory()->draft()->make()->published_at]] طلع [[null]].

---

## ٤. الـ try: الـ seeder (الـ solCode)

~~~php
$me = User::factory()->create(['email' => 'test@example.com']);
~~~

يوزر واحد، والـ array بتغيّر الإيميل بس، والباقي من [[UserFactory]] (الباسورد فيه [['password']] متعمله hash).

~~~php
Post::factory(7)->for($me)->state(['published_at' => now()->subDay()])
    ->has(Comment::factory(2)->for($me))->create();
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[Post::factory(7)]] | ٧ بوستات |
| [[->for($me)]] | صاحبهم [[$me]]، فـ [[User::factory()]] اللي في الـ definition مبيتنفّذش |
| [[->state([...])]] | منشورين أكيد من امبارح |
| [[->has(Comment::factory(2)->for($me))]] | لكل بوست تعليقين، كاتبهم [[$me]] |
| [[->create()]] | احفظ |

~~~php
Post::factory(3)->draft()->for($me)->has(Comment::factory(2)->for($me))->create();
User::factory(5)->has(Post::factory(3))->create();
~~~

٣ مسودات، وبعدين ٥ يوزرز عشوائيين كل واحد ليه ٣ بوستات (هنا [[has]] على اليوزر، فـ Laravel بيحط [[user_id]] لكل بوست).

~~~bash
php artisan migrate:fresh --seed
~~~

[[migrate:fresh]] يمسح كل الجداول ويشغّل كل الـ migrations، و [[--seed]] يشغّل [[DatabaseSeeder]] بعدها.

~~~text الناتج
  Dropping all tables .......................................... 192.26ms DONE
  ...
   INFO  Seeding database.
~~~

والعدّ:

~~~text الناتج
posts=25 comments=20 users=6 published=18
me posts=10 me published=7
~~~

- 25 = 7 + 3 + 5×3، و 20 = 10 بوست × 2.
- 18 منشور = 7 بتوعي + 11 من الـ 15 العشوائيين (حوالي ٨٠٪، بيتغيّر كل مرة).

### غلطتين اتجربوا قبل ما نوصل للحل ده

| الكود | اللي طلع | ليه |
|---|---|---|
| [[Post::factory(7)->for($me)]] من غير state | [[me published=4]] بدل 7 | الـ definition نفسه بيعمل ٢٠٪ مسودات |
| [[->has(Comment::factory(2))]] من غير [[for($me)]] | [[users=26]] بدل 6 | [[CommentFactory]] فيه [[User::factory()]]، فكل تعليق عمل يوزر |

---

## الخلاصة

| الكتابة | النتيجة |
|---|---|
| [[Post::factory()->make()]] | موديل من غير حفظ |
| [[Post::factory(50)->create()]] | ٥٠ صف في القاعدة |
| [[->draft()]] | state بتاعتك |
| [[->state([...])]] | قيم ثابتة للدفعة دي |
| [[->for($user)]] | الأب (belongsTo) |
| [[->has(Comment::factory(2))]] | أبناء (hasMany) |
| [[migrate:fresh --seed]] | القاعدة من الصفر ومليانة |

أي عمود فيه [[X::factory()]] في الـ definition هيعمل صف جديد إلا لو حددته بـ [[for]].`,
          lines: [
            "بداية الملف.",
            "الـ namespace بتاع الـ factories.",
            "عشان نعمل صاحب للبوست.",
            "الكلاس الأساسي.",
            "helpers النصوص.",
            R`اسمه [[PostFactory]] فـ Laravel بيربطه بـ [[Post]] لوحده.`,
            "فتحة.",
            "شكل الصف العشوائي.",
            "فتحة.",
            "عنوان من 4 كلمات تقريبًا.",
            "الصف.",
            "يعمل يوزر جديد لو محدش حدد.",
            "العنوان.",
            "slug من العنوان ومعاه 5 حروف عشوائية عشان ميتكررش.",
            "3 فقرات كنص واحد.",
            "80% منشور في سنة فاتت، و20% null (draft).",
            "قفلة المصفوفة.",
            "قفلة definition.",
            R`state: [[Post::factory()->draft()]].`,
            "فتحة.",
            "يغيّر حقل واحد.",
            "قفلة.",
            "قفلة الكلاس."
          ],
          sol: R`الأرقام: البوستات 10 + 15 = 25، والتعليقات 10 × 2 = 20 (لو اليوزرز العشوائيين من غير تعليقات)، واليوزرز 6. و [[Post::published()->count()]] = 7 من بوستات اليوزر الثابت + حوالي 80% من الـ 15 (في تجربتي 18، وبتختلف كل مرة لأن [[optional(0.8)]] عشوائي).

خلي بالك من حاجتين في الحل: الـ 7 «المنشورين» لازم [[state(['published_at' => now()->subDay()])]]، لأن الـ factory لوحده بيطلّع حوالي 20% منهم مسودات (من غير الـ state طلعوا عندي 4 من 7 بس). و [[Comment::factory(2)->for($me)]]: لو الـ CommentFactory فيه [[User::factory()]] لصاحب التعليق، كل تعليق هيعمل يوزر جديد (طلعوا 26 يوزر بدل 6).

الغلط الشائع: [[Post::factory(10)->create()]] من غير [[for($user)]] فكل بوست يعمل يوزر جديد: 10 يوزرز زيادة، وتلاقي في الجدول 16 يوزر بدل 6. أو [[published_at]] في المستقبل من الـ factory فالـ scope ميعدّهوش.`,
          solCode: R`<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $me = User::factory()->create(['email' => 'test@example.com']);

        Post::factory(7)->for($me)->state(['published_at' => now()->subDay()])
            ->has(Comment::factory(2)->for($me))->create();
        Post::factory(3)->draft()->for($me)->has(Comment::factory(2)->for($me))->create();

        User::factory(5)->has(Post::factory(3))->create();
    }
}`
        },
        {
          cmd: "make:request",
          title: "اتأكد من بيانات الفورم في كلاس لوحده (Form Request و validation)",
          desc: R`أبسط validation: [[$data = $request->validate([...])]] جوه الـ controller. لو فشل، Laravel بيرجّع للفورم ومعاه الأخطاء والقيم القديمة (ولو الطلب JSON بيرجّع 422 بالأخطاء). ولو نجح، [[$data]] فيها الحقول اللي عليها rules بس.

لما الـ rules تكبر أو تتكرر بين store و update: Form Request. [[php artisan make:request StorePostRequest]] بيعمل كلاس فيه [[authorize()]] (مسموحله؟) و [[rules()]]. والـ controller بياخده كـ type: [[store(StorePostRequest $request)]]، والـ validation بيحصل قبل ما يدخل الـ method أصلًا.

وجوه الـ method: [[$request->validated()]] بس، مش [[all()]].`,
          example: R`<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'min:3', 'max:200'],
            'slug' => ['required', 'alpha_dash', Rule::unique('posts')->ignore($this->route('post'))],
            'body' => ['required', 'string'],
            'tags' => ['array', 'max:5'],
            'tags.*' => ['integer', 'exists:tags,id'],
            'cover' => ['nullable', 'image', 'max:2048'],
        ];
    }
}`,
          try: R`اعمل الـ request ده، و [[store(StorePostRequest $request)]] بترجّع [[$request->validated()]]. ابعت بـ curl: [[curl -s -X POST localhost:8000/api/posts -H 'Accept: application/json' -d 'title=ab&slug=a b&tags[]=999']] (حط الـ route في [[routes/api.php]] بعد [[php artisan install:api]]، وخلّي [[authorize]] ترجّع true مؤقتًا). اقرا الرد، وبعدين ابعت بيانات صح ومعاها [[user_id=1]].`,
          flag: "script",
          deep: {
            why: "أي بيانات جاية من المستخدم لازم تتفحص قبل ما تلمس القاعدة، وده مكانها الطبيعي: كلاس واحد تقراه وتعرف الـ endpoint بيقبل إيه. والـ controller يفضل صغير ومبيشوفش غير بيانات سليمة.",
            how: R`الترتيب: [[authorize()]] الأول، ولو false الرد 403. بعدين [[rules()]]، ولو فيه خطأ [[ValidationException]]: طلب عادي بيرجع redirect للصفحة اللي قبلها و [[$errors]] في Blade و [[old('title')]] في الفورم، وطلب بيقبل JSON بياخد 422 وشكله [[{"message": "...", "errors": {"title": ["..."]}}]].

rules مهمة: [[required]] و [[nullable]] و [[sometimes]] (يتفحص لو موجود بس، مفيد في PATCH)، [[email]]، [[confirmed]] (لازم [[password_confirmation]])، [[unique:users,email]]، [[exists:tags,id]]، [[in:draft,published]] أو [[Rule::enum(Status::class)]]، [[image]] و [[mimes:pdf]] و [[max:2048]] (كيلوبايت للملفات)، [[date]] و [[after:today]]. و [[tags.*]] بيطبّق على كل عنصر في المصفوفة.

[[Rule::unique('posts')->ignore($this->route('post'))]] عشان في update البوست نفسه ميتحسبش تكرار.

تجهيز البيانات قبل الفحص: [[prepareForValidation()]] مثلًا تعمل slug من العنوان لو فاضي. ورسايل عربي: [[messages()]] و [[attributes()]]، أو ملفات lang.

[[validated()]] بيرجّع الحقول اللي ليها rules بس، فـ [[user_id]] الزيادة بتتشال حتى لو في [[$fillable]]. ودي الحماية الحقيقية من mass assignment.`,
            when: "Form Request لأي فورم فيه أكتر من 3 حقول أو بيتعمله store و update. [[$request->validate()]] للحاجات الصغيرة. والـ authorization الحقيقي (البوست ده بتاعه؟) في policy، ومن [[authorize()]] تقدر تنادي [[$this->user()->can('update', $this->route('post'))]].",
            mistakes: R`[[Post::create($request->all())]] بعد الـ validation: الـ validation نجح بس [[all()]] فيها حقول زيادة. و [[unique]] من غير [[ignore]] في update فالتعديل يفشل بـ «already taken». و [[max:2]] على ملف فاكرها ميجا وهي كيلو. وتنسى [[Accept: application/json]] على route في [[web.php]] فترجعلك redirect 302 بدل 422 وتفتكر الـ API بايظ (routes الـ [[api/*]] في مشروع 13 جديد بترجّع JSON لوحدها، بس مشاريع أقدم لأ). وتعتمد على validation المتصفح أو React بس: أي حد يبعت بـ curl.`
          },
          teach: R`## الأول: الكلاس ده بيعمل إيه؟

Form Request: كلاس بيتأكد من الطلب **قبل** ما يوصل للـ controller. فيه سؤالين: [[authorize()]] (مسموحلك تبعت أصلًا؟) و [[rules()]] (البيانات شكلها صح؟). لو أي واحد فشل، الـ controller مبيتنفّذش خالص.

كل اللي تحت اتشغّل على Laravel 13.35.0 و PHP 8.4.26 (container لينكس، SQLite)، بعد [[php artisan install:api]]، والطلبات بـ curl على [[php artisan serve]].

---

## ١. [[php artisan make:request StorePostRequest]]

~~~text الناتج
   INFO  Request [app/Http/Requests/StorePostRequest.php] created successfully.
~~~

الملف اللي بيتعمل فيه [[authorize()]] بترجّع **[[false]]** و [[rules()]] فاضية. يعني لو سبته كده كل طلب هياخد 403.

## ٢. الـ imports والكلاس

~~~php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePostRequest extends FormRequest
~~~

- [[FormRequest]] بيورث من [[Request]] العادي، فـ [[$this]] جواه هو الطلب نفسه: [[$this->user()]] و [[$this->route()]] و [[$this->input()]].
- [[Rule]] كلاس بيبني rules معقدة بـ methods بدل نص.

## ٣. [[authorize()]]

~~~php
public function authorize(): bool
{
    return $this->user() !== null;
}
~~~

[[$this->user()]] اليوزر اللي عامل login، أو [[null]]. و [[!==]] «مش مساوي» من غير تحويل أنواع. يعني: أي حد عامل login. لو رجّعت false:

~~~text الناتج (curl كـ JSON من غير login)
{
    "message": "This action is unauthorized.",
    ...
}
HTTP 403
~~~

(الـ [[...]] هنا stack trace طويل، لأن [[APP_DEBUG=true]] على جهازك.)

## ٤. [[rules()]] سطر سطر

~~~php
'title' => ['required', 'string', 'min:3', 'max:200'],
~~~

المفتاح اسم الحقل، والقيمة array من الـ rules بتتفحص بالترتيب. [[required]] لازم موجود ومش فاضي، و [[string]] نص، و [[min:3]] و [[max:200]] على النصوص بعدد الحروف.

~~~php
'slug' => ['required', 'alpha_dash', Rule::unique('posts')->ignore($this->route('post'))],
~~~

- [[alpha_dash]]: حروف وأرقام و [[-]] و [[_]] بس (مفيش مسافات).
- [[Rule::unique('posts')]]: القيمة مش موجودة في عمود [[slug]] في جدول [[posts]] (العمود بيتاخد من اسم الحقل).
- [[->ignore($this->route('post'))]]: [[$this->route('post')]] = البوست من الـ URL لو فيه [[{post}]] (في update). فالبوست نفسه مبيتحسبش تكرار. في الـ store مفيش [[{post}]] فبترجّع null والـ ignore مبيعملش حاجة.

~~~php
'body' => ['required', 'string'],
'tags' => ['array', 'max:5'],
'tags.*' => ['integer', 'exists:tags,id'],
'cover' => ['nullable', 'image', 'max:2048'],
~~~

| الحقل | الـ rules | المعنى |
|---|---|---|
| [[tags]] | [[array]] و [[max:5]] | لو موجود يبقى مصفوفة، ٥ عناصر بالكتير (على الـ array الـ max عدد عناصر) |
| [[tags.*]] | [[integer]] و [[exists:tags,id]] | الـ [[*]] = كل عنصر: رقم وموجود في [[tags.id]] |
| [[cover]] | [[nullable]] و [[image]] و [[max:2048]] | اختياري، صورة، و ٢٠٤٨ **كيلوبايت** (على الملفات الـ max بالكيلو) |

يعني [[max]] معناها بيتغير حسب النوع: حروف للنص، وعدد للـ array، وكيلوبايت للملف.

---

## ٥. الـ try: الـ controller والـ route

~~~php
// routes/api.php
Route::post('/posts', [PostController::class, 'store']);

// PostController
public function store(StorePostRequest $request)
{
    return $request->validated();
}
~~~

النوع [[StorePostRequest]] في الباراميتر هو اللي بيشغّل كل حاجة: Laravel بيعمل الكلاس، ويشغّل [[authorize]] ثم [[rules]]، وبعدين بس يدخل [[store]]. ([[authorize]] رجّعناها [[true]] مؤقتًا عشان نجرّب من غير login زي ما الـ try بيقول.)

### طلب غلط

~~~bash
curl -s -X POST localhost:8000/api/posts -H 'Accept: application/json' --data-urlencode 'title=ab' --data-urlencode 'slug=a b' -d 'tags[]=999'
~~~

- [[-X POST]] الـ method، و [[-H]] header، و [[-d]] بيانات فورم.
- [[--data-urlencode]] بيعمل encode للمسافة اللي في [['a b']].
- [[tags[]=999]] = array فيها عنصر واحد.

~~~text الناتج (HTTP 422)
{"message":"The title field must be at least 3 characters. (and 3 more errors)","errors":{"title":["The title field must be at least 3 characters."],"slug":["The slug field must only contain letters, numbers, dashes, and underscores."],"body":["The body field is required."],"tags.0":["The selected tags.0 is invalid."]}}
~~~

422 = Unprocessable Content: الطلب مفهوم بس البيانات غلط. و [[errors]] فيها مفتاح لكل حقل وليه array رسايل. و [[tags.0]] = أول عنصر في tags (الـ 999 مش في جدول tags).

### من غير [[Accept]]

نفس الطلب من غير header برضه رجّع **422 JSON**، لأن [[bootstrap/app.php]] في المشروع الجديد فيه:

~~~php
$exceptions->shouldRenderJsonWhen(
    fn (Request $request) => $request->is('api/*') || $request->expectsJson(),
);
~~~

يعني أي URL بيبدأ بـ [[api/]] بيرجّع JSON دايمًا.

### طلب صح ومعاه حقل زيادة

~~~bash
curl -s -X POST localhost:8000/api/posts -H 'Accept: application/json' -d 'title=Hello Laravel&slug=hello-2&body=x&user_id=1'
~~~

~~~text الناتج (HTTP 200)
{"title":"Hello Laravel","slug":"hello-2","body":"x"}
~~~

[[user_id]] اختفى: [[validated()]] بترجّع الحقول اللي ليها rules بس. وده سبب إنك تبعت [[validated()]] لـ [[create]] مش [[all()]].

### slug متكرر

~~~text الناتج (HTTP 422)
{"message":"The slug has already been taken.","errors":{"slug":["The slug has already been taken."]}}
~~~

### نفس الـ store على route في [[web.php]]

| الطلب | النتيجة |
|---|---|
| curl POST من غير CSRF token | 419 (Page Expired): الـ middleware بتاع CSRF وقّفه قبل الـ validation |
| POST بالـ token والكوكي (زي فورم فيه [[@csrf]]) وبيانات غلط | 302 redirect لـ الصفحة اللي قبلها (من الـ [[Referer]]) |

routes الـ web فيها session و CSRF، فالـ validation الفاشل هناك بيرجّعك للفورم بالأخطاء بدل JSON.

---

## الخلاصة

| الخطوة | لو فشلت |
|---|---|
| [[authorize()]] | 403 «This action is unauthorized.» |
| [[rules()]] | 422 JSON في [[api/*]] أو مع [[Accept: application/json]]، و 302 للفورم في web |
| [[validated()]] | الحقول اللي ليها rules بس |

و [[max]] بتتقرا حسب النوع: حروف، أو عناصر، أو كيلوبايت.`,
          lines: [
            "بداية الملف.",
            "الـ namespace.",
            "الكلاس الأساسي.",
            "helpers للـ rules المعقدة.",
            "الكلاس.",
            "فتحة.",
            "مين مسموحله يبعت؟",
            "فتحة.",
            "أي حد عامل login (الملكية في policy).",
            "قفلة.",
            "القواعد.",
            "فتحة.",
            "المصفوفة.",
            "لازم، نص، من 3 لـ 200 حرف.",
            "حروف وأرقام و - و _ بس، ومش متكرر (ما عدا البوست ده نفسه في التعديل).",
            "لازم.",
            "مصفوفة، 5 عناصر بالكتير.",
            "كل عنصر رقم وموجود في جدول tags.",
            "صورة اختيارية، 2 ميجا بالكتير (الرقم بالكيلوبايت).",
            "قفلة المصفوفة.",
            "قفلة.",
            "قفلة الكلاس."
          ],
          sol: R`أول طلب بيرجّع status 422 وJSON زي: [[{"message":"The title field must be at least 3 characters. (and 3 more errors)","errors":{"title":["The title field must be at least 3 characters."],"slug":["The slug field must only contain letters, numbers, dashes, and underscores."],"body":["The body field is required."],"tags.0":["The selected tags.0 is invalid."]}}]].

الطلب الصح بيرجّع 200 و [[validated()]] فيها title و slug و body بس (و tags لو بعتها). [[user_id]] مش موجود لأن مفيش عليه rule.

ولو بعت من غير [[Accept]] على [[/api/...]] هتاخد برضه 422 JSON، لأن [[bootstrap/app.php]] في مشروع Laravel 13 الجديد فيه [[shouldRenderJsonWhen]] لأي [[api/*]]. ونفس الطلب على route في [[web.php]]: من فورم فيه [[@csrf]] بيرجّع 302 redirect للصفحة اللي قبلها بالأخطاء، ومن curl من غير CSRF token بيرجّع 419 قبل ما الـ validation يشتغل أصلًا.

الغلط الشائع: تسيب [[authorize()]] زي ما [[make:request]] عملها: بترجّع false، فكل طلب ياخد 403 «This action is unauthorized.» ومش فاهم ليه.`,
          solCode: R`// routes/api.php
Route::post('/posts', [PostController::class, 'store']);

// PostController
public function store(StorePostRequest $request)
{
    return $request->validated();
}`
        },
        {
          cmd: "Blade components",
          title: "اعمل layout واحد وقطع HTML بتتكرر (Blade layouts و components)",
          desc: R`Blade هو محرك الـ views. [[{{ $post->title }}]] بيطبع مع escape (زي [[e()]] في الدروس اللي فاتت)، و [[@if]] و [[@foreach]] و [[@auth]] بدل [[<?php ?>]].

الـ component: ملف في [[resources/views/components/]]، وبيتنادى زي tag HTML. [[components/layout.blade.php]] بيبقى [[<x-layout>]]، والمحتوى اللي جواه بيوصل كـ [[$slot]]. و [[@props]] بيعرّف الباراميترات، و [[$attributes]] فيه أي attribute زيادة (class مثلًا).

ده الأسلوب الحديث للـ layouts. الأسلوب القديم [[@extends('layouts.app')]] و [[@section('content')]] و [[@yield]] لسه شغال وهتلاقيه في مشاريع كتير.`,
          example: R`{{-- resources/views/components/layout.blade.php --}}
@props(['title' => config('app.name')])
<!doctype html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="utf-8">
    <title>{{ $title }}</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
    @auth <p>أهلًا {{ auth()->user()->name }}</p> @endauth
    <main>{{ $slot }}</main>
</body>
</html>

{{-- resources/views/components/alert.blade.php --}}
@props(['type' => 'info'])
<div {{ $attributes->merge(['class' => "alert alert-$type"]) }}>{{ $slot }}</div>

{{-- resources/views/posts/index.blade.php --}}
<x-layout title="المقالات">
    <x-alert type="success" class="mb-4">اتحفظ</x-alert>
    @forelse ($posts as $post)
        <a href="{{ route('posts.show', $post) }}">{{ $post->title }}</a>
    @empty
        <p>مفيش مقالات</p>
    @endforelse
    {{ $posts->links() }}
</x-layout>`,
          try: R`اعمل الـ 3 ملفات، و route بيرجّع [[view('posts.index', ['posts' => Post::latest()->paginate(10)])]]. افتح الصفحة واعمل view source. بعدين اعمل بوست عنوانه [[<script>alert(1)</script>]] وشوف بيظهر إزاي. وجرّب تبعت [[:type="$someVar"]] بدل [[type="success"]].`,
          deep: {
            why: "كل صفحة في الموقع ليها نفس الـ head والـ nav والـ footer. من غير layout هتنسخهم، وأول تعديل هتنسى صفحة. والـ components بتخلي الزرار والـ alert والكارت شكلهم واحد في كل حتة، زي React components بس على السيرفر.",
            how: R`[[{{ }}]] بيعدّي على [[htmlspecialchars]]، و [[{!! !!}]] من غير escape: بس لـ HTML انت اللي عامله أو متنضّف. و [[@{{ }}]] بيطبع الأقواس زي ما هي (لـ Vue).

الباراميترات: [[title="نص"]] بيوصل نص، و [[:title="$post->title"]] (بـ [[:]]) بيوصل تعبير PHP. وأي attribute مش في [[@props]] بيروح لـ [[$attributes]]، و [[merge]] بيدمج الـ class بدل ما يستبدله.

الـ named slots: [[<x-slot:header>...</x-slot>]] وجوه الـ component [[{{ $header }}]]. و [[<x-forms.input>]] = ملف [[components/forms/input.blade.php]].

class components: [[php artisan make:component Alert]] بيعمل كلاس PHP (منطق) ومعاه view. والـ anonymous (ملف Blade بس) كفاية في أغلب الحالات.

directives مفيدة: [[@csrf]] و [[@method('PUT')]] في الفورم، و [[@error('title') {{ $message }} @enderror]]، و [[@can('update', $post)]]، و [[@include('partials.nav')]]، و [[@vite]] للـ CSS و JS. و [[$posts->links()]] بيطبع أزرار الصفحات (Tailwind افتراضيًا).

الـ views بتتترجم لـ PHP عادي وتتحفظ في [[storage/framework/views]]، و [[view:cache]] بيترجمهم كلهم مرة واحدة وقت الـ deploy.`,
            when: "أي تطبيق Laravel بيرجّع HTML من السيرفر (مع Livewire كمان). لو الواجهة React أو Vue عن طريق Inertia، Blade بيبقى ملف واحد بس فيه الـ root.",
            mistakes: R`[[{!! $post->body !!}]] لمحتوى من المستخدم: XSS. لو محتاج HTML من محرر، نضّفه الأول بـ HTML Purifier أو ما شابه. و [[type="$var"]] من غير [[:]] فيوصل النص [[$var]] حرفيًا. و query جوه الـ view ([[Post::all()]] في Blade): صعب تلاقيه وأغلب الوقت N+1. و [[{{ $attributes }}]] منسي فالـ class اللي بتبعتها مبتظهرش.`
          },
          teach: R`## الأول: الـ ٣ ملفات دول بيعملوا إيه؟

ملف [[layout]] فيه هيكل الصفحة (head و body) مرة واحدة، وملف [[alert]] قطعة HTML صغيرة بتتكرر، وصفحة [[posts/index]] بتستخدم الاتنين زي tags HTML. كلهم Blade، و Blade بيتحوّل لـ PHP عادي قبل التشغيل.

كل اللي تحت اتشغّل على Laravel 13.35.0 و PHP 8.4.26 (container لينكس)، على قاعدة فيها ٢٦ بوست، و route [[/blog]] بيرجّع [[view('posts.index', ['posts' => Post::latest()->paginate(10)])]].

---

## ١. layout: [[components/layout.blade.php]]

~~~blade
{{-- resources/views/components/layout.blade.php --}}
@props(['title' => config('app.name')])
~~~

- [[{{-- --}}]] تعليق Blade: مبيطلعش في الـ HTML خالص (عكس [[<!-- -->]]).
- [[@props([...])]] الباراميترات اللي الـ component بياخدها. هنا [[title]] وقيمته الافتراضية اسم التطبيق.
- أي ملف في [[resources/views/components/]] بيتنادى [[<x-اسمه>]]، فده [[<x-layout>]].

~~~blade
<html lang="ar" dir="rtl">
<head>
    <meta charset="utf-8">
    <title>{{ $title }}</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
~~~

- [[lang="ar" dir="rtl"]] لغة الصفحة واتجاهها من اليمين.
- [[{{ $title }}]] اطبع مع escape. Blade بيترجمها فعلًا لـ [[<?php echo e($title); ?>]] (شفناها في الملف المترجم في [[storage/framework/views]])، و [[e()]] هي [[htmlspecialchars]].
- [[@vite([...])]] بيطبع tags الـ CSS و JS من Vite. ومن غير [[npm run build]] أو [[npm run dev]]:

~~~text الناتج
Vite manifest not found at: /w/shop/public/build/manifest.json
~~~

(في التجربة دي حطينا [[manifest.json]] صغير بإيدنا عشان مفيش Node في الـ container.)

~~~blade
<body>
    @auth <p>أهلًا {{ auth()->user()->name }}</p> @endauth
    <main>{{ $slot }}</main>
</body>
~~~

- [[@auth ... @endauth]] اللي جواه بيظهر للي عامل login بس. و [[auth()->user()]] اليوزر الحالي.
- [[$slot]] = أي حاجة اتكتبت بين [[<x-layout>]] و [[</x-layout>]].

## ٢. component صغير: [[components/alert.blade.php]]

~~~blade
@props(['type' => 'info'])
<div {{ $attributes->merge(['class' => "alert alert-$type"]) }}>{{ $slot }}</div>
~~~

- [[type]] باراميتر افتراضيه [[info]].
- [[$attributes]] = كل attribute اتبعت ومش في [[@props]] (زي [[class="mb-4"]]).
- [[merge(['class' => ...])]] بيدمج الـ class بتاعك مع اللي جاي بدل ما يستبدله.
- [["alert alert-$type"]] نص بعلامات مزدوجة فـ [[$type]] بتتبدّل.

## ٣. الصفحة: [[posts/index.blade.php]]

~~~blade
<x-layout title="المقالات">
    <x-alert type="success" class="mb-4">اتحفظ</x-alert>
~~~

[[title="المقالات"]] بيروح لـ [[$title]] في الـ layout. و [[type]] لـ [[@props]] بتاع الـ alert، و [[class]] لـ [[$attributes]].

~~~blade
    @forelse ($posts as $post)
        <a href="{{ route('posts.show', $post) }}">{{ $post->title }}</a>
    @empty
        <p>مفيش مقالات</p>
    @endforelse
    {{ $posts->links() }}
</x-layout>
~~~

- [[@forelse]] زي [[foreach]]، ومعاه فرع [[@empty]] لو مفيش ولا عنصر.
- [[route('posts.show', $post)]] URL بالاسم، والموديل بيتحط مكان [[{post}]] بالـ id.
- [[$posts->links()]] أزرار الصفحات، لأن [[paginate(10)]] رجّع paginator مش Collection.

---

## ٤. الـ try: الـ HTML اللي طلع

~~~text الناتج (curl localhost:8000/blog، مختصر)
<html lang="ar" dir="rtl">
<head>
    <meta charset="utf-8">
    <title>المقالات</title>
    <link rel="preload" as="style" href="http://localhost:8000/build/assets/app-demo.css" />...
<body>
        <main><div class="alert alert-success mb-4">اتحفظ</div>
            <a href="http://localhost:8000/posts/26">&lt;script&gt;alert(1)&lt;/script&gt;</a>
            <a href="http://localhost:8000/posts/23">Pariatur omnis voluptatem minus.</a>
            ...
        <nav role="navigation" aria-label="Pagination Navigation">
            ...
            <a href="http://localhost:8000/blog?page=2" rel="next" ...>Next &raquo;</a>
            ...
                    Showing 1 to 10 of 26 results
~~~

| اللي في الناتج | جه منين |
|---|---|
| [[class="alert alert-success mb-4"]] | [[merge]] دمج [[mb-4]] مع الـ class الأصلي |
| [[href="http://localhost:8000/posts/26"]] | [[route()]] بيطلّع URL كامل |
| [[&lt;script&gt;...]] | البوست اللي عنوانه [[<script>alert(1)</script>]] اتطبع **نص** بسبب [[{{ }}]] |
| [[nav]] و [[?page=2]] و [[Showing 1 to 10 of 26]] | [[links()]]، و ٢٦ جاية من query [[count(*)]] اللي [[paginate]] بيعمله |
| مفيش «أهلًا ...» | مش عامل login، فـ [[@auth]] مطلّعش حاجة |

## ٥. الـ try: [[type="$someVar"]] مقابل [[:type="$someVar"]]

اتجربت بـ [[Blade::render]] و [[$someVar = 'danger']]:

~~~text الناتج
<x-alert type="$someVar">   ←  <div class="alert alert-$someVar">a</div>
<x-alert :type="$someVar">  ←  <div class="alert alert-danger">b</div>
<x-alert>                   ←  <div class="alert alert-info">c</div>
~~~

من غير [[:]] القيمة نص حرفي. بالـ [[:]] قبل اسم الـ attribute، القيمة بتتقري كـ PHP. ومن غيرها خالص بتاخد الافتراضي.

## ٦. الـ ٣ أنواع طباعة

~~~text الناتج (القيمة <b>x</b>)
{!! $h !!}  →  <b>x</b>
{{ $h }}    →  &lt;b&gt;x&lt;/b&gt;
@{{ $h }}   →  {{ $h }}
~~~

[[{!! !!}]] من غير escape (خطر مع بيانات مستخدم)، و [[@{{ }}]] بيطبع الأقواس زي ما هي (لـ Vue أو Alpine).

---

## الخلاصة

| Blade | معناه |
|---|---|
| [[{{ $x }}]] | اطبع مع escape |
| [[{!! $x !!}]] | من غير escape |
| [[<x-name>]] | [[components/name.blade.php]] |
| [[@props(['a' => 'default'])]] | باراميترات الـ component |
| [[$slot]] | المحتوى بين الـ tags |
| [[$attributes->merge([...])]] | الـ attributes الزيادة مدموجة |
| [[:attr="$var"]] | قيمة PHP مش نص |
| [[@forelse / @empty]] | loop ومعاه حالة فاضية |
| [[$posts->links()]] | أزرار الصفحات |`,
          lines: [
            R`تعليق Blade (مبيطلعش في الـ HTML): اسم الملف الأول.`,
            "الـ props وقيمتها الافتراضية.",
            "بداية الصفحة.",
            "عربي ومن اليمين.",
            "الـ head.",
            "الترميز.",
            "العنوان مع escape.",
            "الـ CSS و JS من Vite.",
            "قفلة.",
            "الـ body.",
            "بيظهر للي عامل login بس.",
            "المحتوى اللي جوه الـ tag.",
            "قفلة.",
            "قفلة.",
            "الملف التاني: component الـ alert.",
            "props الـ alert.",
            "الـ attributes الزيادة بتندمج مع الـ class.",
            "الملف التالت: صفحة بتستخدمهم.",
            "الصفحة كلها جوه الـ layout.",
            "component بـ type و class زيادة.",
            "loop، وليه فرع لو مفيش ولا عنصر.",
            "لينك بالاسم، والـ binding بيحط الـ id.",
            "لو فاضية.",
            "رسالة.",
            "قفلة.",
            "أزرار الصفحات.",
            "قفلة الـ layout."
          ],
          sol: R`الـ view source بيوري HTML كامل: [[<html lang="ar" dir="rtl">]] و [[<title>المقالات</title>]] و [[<div class="alert alert-success mb-4">اتحفظ</div>]]؛ الـ [[mb-4]] اتدمجت مع الـ class الأصلي بسبب [[merge]]. وتحت، لينكات كاملة زي [[http://localhost:8000/posts/58]] (الـ [[route()]] بيطلّع URL كامل من [[APP_URL]] والطلب)، و [[nav]] الـ pagination لو فيه أكتر من 10.

البوست اللي عنوانه script بيظهر كنص [[<script>alert(1)</script>]] ومبيتنفّذش، وفي الـ source هتلاقيه [[&lt;script&gt;alert(1)&lt;/script&gt;]].

[[type="$someVar"]] من غير [[:]] بيطلّع [[class="alert alert-$someVar"]] حرفيًا. مع [[:type="$someVar"]] بتوصل القيمة.

ملحوظة: [[@vite]] محتاج [[npm run dev]] أو [[npm run build]]، وإلا الصفحة ترمي «Vite manifest not found».`
        },
        {
          cmd: "starter kit و Gate و Policy",
          title: "مين يعمل login، ومين يقدر يعدّل البوست ده؟ (auth و policies)",
          desc: R`authentication (مين انت): متكتبهاش بنفسك. [[laravel new]] بيعرض starter kits رسمية: React أو Vue أو Svelte (عن طريق Inertia) أو Livewire. كلهم فيهم login و register و reset password و email verification و 2FA، والـ backend بتاعهم Laravel Fortify. وفيه نسخ منهم بـ WorkOS AuthKit (social login و passkeys). و Breeze القديم لسه بيشتغل بس مبقاش الاختيار الرسمي للمشاريع الجديدة من Laravel 12.

authorization (مسموحلك؟): ده شغلك انت. Gate قاعدة عامة ([[Gate::define('view-admin', fn (User $u) => $u->is_admin)]]). و Policy كلاس لكل موديل فيه method لكل فعل: [[update(User $user, Post $post)]] ترجّع [[$user->id === $post->user_id]].

وتتحقق بـ [[Gate::authorize('update', $post)]] في الـ controller (بيرمي 403)، أو [[@can('update', $post)]] في Blade، أو [[->can('update', 'post')]] على الـ route.`,
          example: R`<?php

namespace App\Policies;

use App\Models\Post;
use App\Models\User;

class PostPolicy
{
    public function before(User $user, string $ability): ?bool
    {
        return $user->is_admin ? true : null;
    }

    public function update(User $user, Post $post): bool
    {
        return $user->id === $post->user_id;
    }

    public function delete(User $user, Post $post): bool
    {
        return $this->update($user, $post) && $post->comments()->doesntExist();
    }
}`,
          try: R`[[php artisan make:policy PostPolicy --model=Post]] واكتب الـ policy دي. في [[update]] بتاعة الـ controller اكتب [[Gate::authorize('update', $post);]]. اعمل يوزرين في tinker وبوست لأول واحد، وجرّب [[$u2->can('update', $post)]] و [[$u1->can('update', $post)]]. وفي test أو بـ [[actingAs]] ابعت PUT كيوزر تاني وشوف الـ status.`,
          flag: "script",
          deep: {
            why: "أشهر ثغرة في APIs هي IDOR: [[PUT /posts/7]] بيعدّي لأي حد عامل login، مش بس صاحب البوست. الـ policy بتحط قرار «مين يقدر» في مكان واحد لكل موديل، بدل if متفرقة في controllers تتنسى في واحد منهم.",
            how: R`Laravel بيلاقي الـ policy لوحده بالاسم: [[App\Models\Post]] ← [[App\Policies\PostPolicy]]. غير كده تستخدم [[Gate::policy()]] أو attribute [[#[UsePolicy(PostPolicy::class)]]] على الموديل.

[[before()]] بيتنفّذ قبل أي method: لو رجّع true أو false القرار خلص، ولو null يكمّل للـ method. مناسب للأدمن.

methods من غير موديل: [[create(User $user)]] وتتنادى [[Gate::authorize('create', Post::class)]].

لو اليوزر مش عامل login، الـ policy مبتتنداش أصلًا وبترجّع false، إلا لو الـ type بتاع اليوزر nullable ([[?User $user]]).

في Form Request: [[authorize()]] ترجّع [[$this->user()->can('update', $this->route('post'))]]. وفي Blade: [[@can('delete', $post) <button>امسح</button> @endcan]]، بس ده إخفاء للزرار، والحماية الحقيقية في الـ controller.

والأدوار الأكبر (admin و editor و viewer بصلاحيات في القاعدة) غالبًا بمكتبة spatie/laravel-permission.`,
            when: "starter kit في أي مشروع فيه صفحات login. policy لكل موديل المستخدم بيملكه. Gate لقرارات مش مربوطة بموديل (لوحة الأدمن، ميزة مدفوعة).",
            mistakes: R`تحمي الـ route بـ [[auth]] بس وتفتكر كده خلاص: ده بيقول مين انت مش مسموحلك ولا لأ. وتخفي الزرار بـ [[@can]] ومتتحققش في الـ controller. وتكتب [[$user->id == $post->user_id]] وواحد منهم نص والتاني رقم في قاعدة قديمة (استخدم [[===]] مع casts صح، أو [[$user->is($post->user)]]). وتسطّب starter kit على مشروع فيه كود قديم: الـ starter kits بتتسطب مع المشروع الجديد بس. وفي الانترفيو: «authentication vs authorization» و«إيه هو IDOR وإزاي تمنعه في Laravel».`
          },
          teach: R`## الأول: الكلاس ده بيجاوب على سؤال واحد

«اليوزر ده مسموحله يعمل الفعل ده على البوست ده؟». كل method في الـ policy اسمها فعل ([[update]] و [[delete]])، بتاخد اليوزر والبوست، وبترجّع true أو false. والـ controller بيسأل قبل ما يعمل أي حاجة.

كل اللي تحت اتشغّل على Laravel 13.35.0 و PHP 8.4.26 (container لينكس، SQLite)، والـ tests بـ Pest 5.3. أما الـ starter kits نفسها (login و register جاهزين) متسطبتش هنا لأنها محتاجة مشروع جديد و Node، فكلامها من docs Laravel 13 ومن [[laravel new --help]] ([[--react]] و [[--vue]] و [[--svelte]] و [[--livewire]] و [[--workos]]).

---

## ١. [[php artisan make:policy PostPolicy --model=Post]]

~~~text الناتج
   INFO  Policy [app/Policies/PostPolicy.php] created successfully.
~~~

[[--model=Post]] بيعمل الملف جاهز بـ ٧ methods: [[viewAny]] و [[view]] و [[create]] و [[update]] و [[delete]] و [[restore]] و [[forceDelete]]، وكلهم بيرجّعوا false. إحنا كتبنا مكانهم الـ ٣ اللي في المثال.

## ٢. الكلاس

~~~php
namespace App\Policies;

use App\Models\Post;
use App\Models\User;

class PostPolicy
~~~

مفيش [[extends]]: الـ policy كلاس عادي. Laravel بيلاقيه بالاسم: [[App\Models\Post]] ← [[App\Policies\PostPolicy]]. اتأكدنا:

~~~text الناتج (Gate::getPolicyFor(Post::class)::class)
string(23) "App\Policies\PostPolicy"
~~~

## ٣. [[before()]]

~~~php
public function before(User $user, string $ability): ?bool
{
    return $user->is_admin ? true : null;
}
~~~

- بتتنادى **قبل** أي method تانية. [[$ability]] اسم الفعل المطلوب ([['update']] مثلًا).
- [[?bool]] = true أو false أو null.
- [[? :]] (ternary): لو [[is_admin]] صح رجّع true، غير كده null.
- القواعد: true = مسموح ومتكملش، false = ممنوع ومتكملش، null = كمّل للـ method العادية.

في مشروعنا مفيش عمود [[is_admin]]، فـ [[$user->is_admin]] طلع [[NULL]]، يعني before بترجّع null والقرار للـ method.

## ٤. [[update()]]

~~~php
public function update(User $user, Post $post): bool
{
    return $user->id === $post->user_id;
}
~~~

صاحب البوست بس. و [[===]] بيقارن القيمة والنوع: الاتنين int هنا، فمفيش مشكلة. (لو واحد منهم نص في قاعدة قديمة، [[===]] هترجّع false دايمًا.)

## ٥. [[delete()]]

~~~php
public function delete(User $user, Post $post): bool
{
    return $this->update($user, $post) && $post->comments()->doesntExist();
}
~~~

- [[$this->update(...)]] بتعيد استخدام القاعدة اللي فوق.
- [[&&]] الاتنين لازم يبقوا صح.
- [[comments()->doesntExist()]] query [[EXISTS]] بترجّع true لو مفيش ولا تعليق.

---

## ٦. الـ try: [[can()]]

~~~php
$u1 = User::factory()->create();
$u2 = User::factory()->create();
// بوست صاحبه $u1 ومن غير تعليقات
var_dump($u1->can('update', $post), $u2->can('update', $post), $u1->can('delete', $post));
~~~

~~~text الناتج
bool(true)
bool(false)
bool(true)
~~~

[[$user->can('فعل', $model)]] بيلاقي الـ policy من نوع الموديل، وينادي [[before]] ثم الـ method.

## ٧. الـ solCode: الـ controller

~~~php
public function update(UpdatePostRequest $request, Post $post)
{
    Gate::authorize('update', $post);

    $post->update($request->validated());

    return redirect()->route('posts.show', $post);
}
~~~

| السطر | بيعمل إيه |
|---|---|
| [[UpdatePostRequest $request]] | الـ validation (درس Form Request) بيحصل قبل الـ method |
| [[Post $post]] | route model binding |
| [[Gate::authorize('update', $post)]] | اسأل الـ policy، ولو false ارمي exception ← 403 |
| [[$post->update($request->validated())]] | احفظ الحقول المسموحة بس |
| [[redirect()->route('posts.show', $post)]] | 302 لصفحة البوست |

ولو ناديتها غلط:

~~~text الناتج (Gate::authorize('update') من غير $post)
Illuminate\Auth\Access\AuthorizationException: This action is unauthorized.
~~~

حتى لصاحب البوست: من غير موديل، Laravel مش عارف أنهي policy، فبيدوّر على Gate اسمه [[update]] وملقاش.

## ٨. الـ solCode: الـ test

~~~php
it('forbids editing someone else post', function () {
    $post = Post::factory()->create();

    $this->actingAs(User::factory()->create())
        ->put(route('posts.update', $post), ['title' => 'xyz', 'slug' => 'x', 'body' => 'y'])
        ->assertForbidden();
});
~~~

- [[Post::factory()->create()]] بوست، والـ factory عمله صاحب جديد.
- [[actingAs(...)]] اعمل login كيوزر **تاني**.
- [[put(route('posts.update', $post), [...])]] طلب PUT ببيانات صح (عشان الـ validation يعدّي ونوصل للـ policy).
- [[assertForbidden()]] الـ status لازم 403.

وضفنا test تاني بنفس الطلب بس [[actingAs($post->user)]] و [[assertRedirect(route('posts.show', $post))]]:

~~~text الناتج (php artisan test --filter=PostPolicyTest)
  ✓ it forbids editing someone else post
  ✓ it lets the owner edit
~~~

وجرّبنا كمان:

| الطلب | الـ status |
|---|---|
| [[putJson]] كيوزر تاني | 403 و [[{"message": "This action is unauthorized."}]] |
| [[putJson]] من غير login خالص | 403 |

ليه مش 401 من غير login؟ لأن الـ route ده معلهوش middleware [[auth]]، فالطلب وصل للـ Gate، والـ Gate بيرفض الضيف لوحده (الـ policy مبتتنداش لأن [[User $user]] مش nullable). لو حطيت [[->middleware('auth')]] على الـ route، الضيف ياخد 401 في JSON قبل ما يوصل.

---

## الخلاصة

| فين | إزاي |
|---|---|
| الـ policy | [[make:policy PostPolicy --model=Post]]، method لكل فعل بترجّع bool |
| الأدمن | [[before()]] بترجّع true، أو null عشان تكمّل |
| الـ controller | [[Gate::authorize('update', $post)]] ← 403 |
| أي مكان | [[$user->can('update', $post)]] |
| Blade | [[@can('update', $post) ... @endcan]] (إخفاء زرار بس) |
| الـ test | [[actingAs($other)->put(...)->assertForbidden()]] |

authentication (مين انت) من الـ starter kit، و authorization (مسموحلك؟) انت اللي بتكتبه في الـ policy.`,
          lines: [
            "بداية الملف.",
            "الـ namespace.",
            "الموديل اللي بنحميه.",
            "اليوزر اللي بيطلب.",
            "الكلاس (من غير أي parent).",
            "فتحة.",
            "بيتنفّذ قبل أي فعل.",
            "فتحة.",
            "الأدمن مسموحله كل حاجة، وغيره null يعني كمّل للـ method.",
            "قفلة.",
            R`[[update]]: مين يعدّل البوست ده؟`,
            "فتحة.",
            "صاحبه بس.",
            "قفلة.",
            "الحذف.",
            "فتحة.",
            "صاحبه، وبشرط مفيش تعليقات.",
            "قفلة.",
            "قفلة الكلاس."
          ],
          sol: R`[[$u1->can('update', $post)]] بيرجّع true (صاحبه)، و [[$u2->can('update', $post)]] false. ولو [[is_admin]] مش عمود عندك، [[$user->is_admin]] هيبقى null فـ before بيرجّع null ويكمّل عادي.

الـ PUT كيوزر تاني بيرجّع 403 «This action is unauthorized.» (أو JSON فيه نفس الرسالة لو الطلب JSON). ومن غير login خالص: 401 لـ JSON، أو redirect لـ login في الويب لو الـ route عليه [[auth]].

وخلي بالك إن الـ Form Request بيتفحص قبل ما الـ controller يبدأ، فلو البيانات نفسها غلط (عنوان حرفين) هتاخد خطأ validation قبل ما توصل للـ policy؛ ابعت بيانات صح في الـ test عشان تختبر الـ 403 فعلًا.

الغلط الشائع: تكتب [[Gate::authorize('update')]] من غير [[$post]] فتاخد 403 دايمًا، لأن Laravel بيدوّر على Gate اسمه update مش على الـ policy.`,
          solCode: R`public function update(UpdatePostRequest $request, Post $post)
{
    Gate::authorize('update', $post);

    $post->update($request->validated());

    return redirect()->route('posts.show', $post);
}

// tests/Feature/PostPolicyTest.php (Pest)
it('forbids editing someone else post', function () {
    $post = Post::factory()->create();

    $this->actingAs(User::factory()->create())
        ->put(route('posts.update', $post), ['title' => 'xyz', 'slug' => 'x', 'body' => 'y'])
        ->assertForbidden();
});`
        },
        {
          cmd: "Sanctum",
          title: "اعمل API عليها login لتطبيق موبايل أو SPA (Laravel Sanctum)",
          desc: R`[[php artisan install:api]] بيعمل [[routes/api.php]] (كل الـ routes فيه بتبدأ بـ [[/api]] ومن غير session و CSRF)، ويسطّب Sanctum، ويعمل جدول [[personal_access_tokens]].

Sanctum بيدّيك طريقتين: tokens لتطبيقات الموبايل و clients برّه الموقع ([[$user->createToken('iphone')->plainTextToken]] والتطبيق يبعته في [[Authorization: Bearer ...]])، أو cookies و session لـ SPA على نفس الدومين (React أو Vue على [[app.example.com]] والـ API على [[api.example.com]]).

والحماية: [[->middleware('auth:sanctum')]] على الـ routes، و [[$request->user()]] جوه بيرجّع صاحب الـ token.`,
          example: R`<?php
// routes/api.php
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;

Route::post('/tokens', function (Request $request) {
    $data = $request->validate(['email' => 'required|email', 'password' => 'required', 'device' => 'required|string|max:100']);
    $user = User::where('email', $data['email'])->first();
    if (! $user || ! Hash::check($data['password'], $user->password)) {
        throw ValidationException::withMessages(['email' => 'بيانات الدخول غلط']);
    }
    return ['token' => $user->createToken($data['device'], ['posts:write'])->plainTextToken];
})->middleware('throttle:5,1');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', fn (Request $request) => $request->user());
    Route::delete('/tokens/current', fn (Request $request) => $request->user()->currentAccessToken()->delete());
});`,
          try: R`شغّل [[install:api]] وضيف [[HasApiTokens]] لموديل User. اعمل الـ routes دي، وخد token بـ [[curl -s localhost:8000/api/tokens -H 'Accept: application/json' -d 'email=test@example.com&password=password&device=cli']]. نادي [[/api/me]] من غيره ومعاه. بعدين امسحه بـ DELETE ونادي [[/me]] تاني. وافتح جدول [[personal_access_tokens]]: الـ token متخزن إزاي؟`,
          flag: "script",
          deep: {
            why: "أي تطبيق موبايل (Flutter مثلًا) أو frontend منفصل محتاج API عليه login. Sanctum هو الحل الرسمي البسيط، وبيغطي أغلب الحالات من غير تعقيد OAuth و Passport.",
            how: R`الـ token شكله [[5|AbC...]]: رقم الصف و [[|]] وسر عشوائي 40 حرف ووراه 8 حروف checksum. القاعدة بتخزن SHA-256 للسر بس، فلو القاعدة اتسرّبت الـ tokens متتستخدمش. عشان كده [[plainTextToken]] بيظهر مرة واحدة وقت الإنشاء.

abilities: [[createToken('x', ['posts:write'])]] و [[$request->user()->tokenCan('posts:write')]]. والـ tokens مبتنتهيش افتراضيًا؛ [[expiration]] في [[config/sanctum.php]] بالدقايق.

الـ SPA mode: [[$middleware->statefulApi()]] في [[bootstrap/app.php]]، والدومينات في [[SANCTUM_STATEFUL_DOMAINS]]، والـ SPA بتنادي [[/sanctum/csrf-cookie]] الأول، وبعدين [[/login]] عادي، والـ cookie بتتبعت مع كل طلب ([[withCredentials]]). مفيش token في localStorage يتسرق بـ XSS.

[[throttle:5,1]] = 5 طلبات في الدقيقة لكل IP على الـ login، ضد التخمين. و [[Hash::check]] بيقارن بـ timing-safe.

المقارنة: JWT (مكتبات برّه) token مش بيتخزن في القاعدة وبيتفحص بالتوقيع، فمينفعش تلغيه قبل ما ينتهي إلا بـ blacklist. Sanctum token بيتلغي بمسح الصف فورًا. و Passport لو محتاج تبقى OAuth2 server (تطبيقات برّه بتطلب إذن على حسابات يوزرزك).`,
            when: "API لموبايل أو CLI أو شركاء ← tokens. SPA على نفس الدومين الأب ← cookie mode. «Login with my app» لأطراف تالتة ← Passport.",
            mistakes: R`تحفظ الـ token في localStorage في SPA على نفس الدومين بدل cookie mode. وتنسى [[Accept: application/json]] فالـ auth الفاشل يحاول يعمل redirect لـ login بدل 401 (ولو مفيش route اسمه login: 500). وتسيب tokens من غير expiration ولا طريقة للمستخدم يلغيها. وترجّع اليوزر كله في [[/me]] من غير [[#[Hidden]]] أو Resource فيطلع أعمدة مش المفروض تطلع. وتلغي الـ throttle على route الـ login.`
          },
          teach: R`## الأول: الملف ده بيعمل إيه؟

٣ routes في [[routes/api.php]]: واحد بيعمل login ويرجّع token، وواحد بيرجّع «أنا مين» بالـ token، وواحد بيمسح الـ token (logout). التطبيق (موبايل مثلًا) بيحفظ الـ token ويبعته في header مع كل طلب.

كل اللي تحت اتشغّل على Laravel 13.35.0 و PHP 8.4.26 (container لينكس، SQLite)، بعد [[php artisan install:api]] وإضافة [[HasApiTokens]] لموديل User، والطلبات بـ curl على [[php artisan serve]]. اليوزر [[test@example.com]] وباسورده [[password]] (من الـ UserFactory).

---

## ٠. [[php artisan install:api]]

~~~text الناتج (آخره)
   INFO  Published API routes file.

   INFO  Running migrations.

  2026_10_07_165805_create_personal_access_tokens_table ........ 106.91ms DONE

   INFO  API scaffolding installed. Please add the [Laravel\Sanctum\HasApiTokens] trait to your User model.
~~~

سطّب [[laravel/sanctum]] بـ Composer، وعمل [[routes/api.php]] وسجّله في [[bootstrap/app.php]] ([[api: __DIR__.'/../routes/api.php']])، وعمل جدول [[personal_access_tokens]]. والسطر الأخير مهم: من غير [[use HasApiTokens;]] في User مفيش [[createToken()]].

## ١. الـ imports

~~~php
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
~~~

[[Request]] الطلب، و [[Hash]] لمقارنة الباسورد بالـ hash، و [[ValidationException]] عشان نرجّع خطأ بنفس شكل الـ validation (422).

## ٢. route الـ login

~~~php
Route::post('/tokens', function (Request $request) {
~~~

كل اللي في [[api.php]] بيبدأ بـ [[/api]]، فده [[POST /api/tokens]]. والـ action هنا closure (دالة من غير اسم) بدل controller.

~~~php
    $data = $request->validate(['email' => 'required|email', 'password' => 'required', 'device' => 'required|string|max:100']);
~~~

الـ rules ممكن تتكتب نص واحد مفصول بـ [[|]] بدل array. و [[device]] اسم الجهاز، بيتحفظ مع الـ token عشان اليوزر يعرف كل token بتاع أنهي جهاز.

~~~php
    $user = User::where('email', $data['email'])->first();
    if (! $user || ! Hash::check($data['password'], $user->password)) {
        throw ValidationException::withMessages(['email' => 'بيانات الدخول غلط']);
    }
~~~

- [[first()]] أول نتيجة أو null.
- [[!]] = not، و [[||]] = أو. يعني «مفيش يوزر، أو الباسورد مش مطابق».
- [[Hash::check(نص, hash)]] بيعمل hash للنص بنفس الـ salt والـ cost ويقارن. ([[$user->password]] نفسه hash bcrypt.)
- نفس الرسالة في الحالتين: متقولش للمهاجم إن الإيميل موجود.

~~~php
    return ['token' => $user->createToken($data['device'], ['posts:write'])->plainTextToken];
})->middleware('throttle:5,1');
~~~

- [[createToken(اسم, abilities)]] بيعمل صف في [[personal_access_tokens]]. و [[['posts:write']]] صلاحيات الـ token ده (abilities).
- [[plainTextToken]] الـ token نفسه كنص، وده **المرة الوحيدة** اللي بيظهر فيها.
- الـ array اللي بترجع بتتحوّل JSON لوحدها.
- [[throttle:5,1]] = ٥ طلبات كل دقيقة واحدة لكل IP.

## ٣. الـ routes المحمية

~~~php
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', fn (Request $request) => $request->user());
    Route::delete('/tokens/current', fn (Request $request) => $request->user()->currentAccessToken()->delete());
});
~~~

- [[auth:sanctum]]: الـ middleware [[auth]] بالـ guard اسمه [[sanctum]]، بيقرا [[Authorization: Bearer ...]] ويدوّر على الـ token.
- [[$request->user()]] صاحب الـ token.
- [[currentAccessToken()->delete()]] امسح الـ token اللي جه بيه الطلب ده بس (الأجهزة التانية تفضل داخلة).

---

## ٤. الـ try بالترتيب

### خد token

~~~bash
curl -s -H 'Accept: application/json' localhost:8000/api/tokens -d 'email=test@example.com&password=password&device=cli'
~~~

~~~text الناتج
{"token":"1|D8zsDz2IRcP1JtTlKiHCRV0IkDqYpU9r7YyDz6Kj600171f9"}
~~~

شكله: رقم الصف في الجدول، ثم [[|]]، ثم ٤٨ حرف (٤٠ عشوائي و ٨ checksum).

### [[/api/me]]

| الطلب | الرد |
|---|---|
| من غير token، و [[Accept: application/json]] | 401 [[{"message":"Unauthenticated."}]] |
| من غير token ومن غير [[Accept]] | **500**: الـ middleware حاول يحوّلك لـ route اسمه [[login]] ومفيش |
| مع header [[Authorization: Bearer]] والـ token | 200 ويوزر JSON |

~~~text الناتج (مع الـ token)
{"id":1,"name":"Declan Kihn","email":"test@example.com","email_verified_at":"2026-10-07T16:56:00.000000Z","created_at":"...","updated_at":"..."}
~~~

مفيش [[password]] ولا [[remember_token]]: موديل User عليه [[#[Hidden(['password', 'remember_token'])]]].

### امسحه ونادي تاني

~~~text الناتج
DELETE /api/tokens/current   →  1  (HTTP 200)
GET /api/me بنفس الـ token   →  {"message":"Unauthenticated."}  (HTTP 401)
~~~

الـ [[1]] = عدد الصفوف اللي اتمسحت. والـ token بقى ملوش لازمة فورًا، لأن مفيش صف يطابقه.

### الجدول من جوه

~~~text الناتج (صف token تاني اتعمل بـ createToken)
[id] => 2
[tokenable_type] => App\Models\User
[tokenable_id] => 1
[name] => cli
[token] => c65507625176adee85138137854b2c1f2e5a3fcf8c5852eaee0e0a1dba1690f2
[abilities] => ["posts:write"]
[expires_at] =>
~~~

- [[token]] = ٦٤ حرف hex. حسبنا [[hash('sha256', الجزء_اللي_بعد_|)]] بإيدنا وطلع نفس القيمة بالظبط: القاعدة فيها SHA-256 بس، مش الـ token.
- [[tokenable_type]] و [[tokenable_id]]: الـ token بتاع مين (polymorphic، ممكن يبقى موديل غير User).
- [[expires_at]] فاضي: مبينتهيش إلا لو ظبطت [[expiration]] في [[config/sanctum.php]].

### الـ throttle

٥ طلبات بباسورد غلط ورا بعض، بعد الـ login الناجح اللي فوق في نفس الدقيقة:

~~~text الناتج
422 422 422 422 429
{"message": "Too Many Attempts.", ...}
~~~

الخامس 429 مش الأولاني بعد الخمسة، لأن الطلب الناجح اتحسب من الـ ٥.

---

## الخلاصة

| الحاجة | فين |
|---|---|
| تسطيب | [[php artisan install:api]] + [[use HasApiTokens;]] في User |
| login | [[Hash::check]] ثم [[createToken('device', ['ability'])->plainTextToken]] |
| حماية | [[middleware('auth:sanctum')]] و [[$request->user()]] |
| logout | [[currentAccessToken()->delete()]] |
| التخزين | SHA-256 للسر بس، فالـ token يظهر مرة واحدة |
| ضد التخمين | [[throttle:5,1]] |

وابعت [[Accept: application/json]] دايمًا من الـ client، وإلا الـ 401 ممكن يبقى redirect أو 500.`,
          lines: [
            "بداية الملف.",
            "الموديل.",
            "الطلب.",
            "مقارنة الباسورد.",
            "الـ routes.",
            "عشان نرجّع خطأ validation (422) لو الباسورد غلط.",
            R`[[POST /api/tokens]]: login بيرجّع token.`,
            "الإيميل والباسورد واسم الجهاز.",
            "دوّر على اليوزر.",
            "مش موجود أو الباسورد غلط.",
            "نفس الرسالة في الحالتين (متقولش أنهي فيهم الغلط).",
            "قفلة.",
            "token بصلاحية واحدة، والنص بيظهر مرة واحدة بس.",
            "5 محاولات في الدقيقة.",
            "كل اللي جوه محتاج token.",
            "اليوزر صاحب الـ token.",
            "logout: امسح الـ token ده بس.",
            "قفلة."
          ],
          sol: R`أول curl بيرجّع [[{"token":"1|mSou...48 حرف"}]]. [[/api/me]] من غير header بيرجّع 401 و [[{"message":"Unauthenticated."}]]. مع [[-H 'Authorization: Bearer 1|x8Kd...']] بيرجّع اليوزر JSON من غير password و remember_token (بسبب Hidden في الموديل).

بعد الـ DELETE (بيرجّع [[1]] أو 200)، نفس الـ token بيرجّع 401 تاني. وفي الجدول، عمود [[token]] فيه 64 حرف hex (SHA-256) مش النص اللي معاك، و [[abilities]] فيه [[["posts:write"]]].

الغلط الشائع: تجرّب باسورد غلط كذا مرة ورا بعض، فبعد 5 طلبات في نفس الدقيقة (والـ login الناجح بيتحسب منهم) الرد يبقى 429 «Too Many Attempts.»، ودي الـ throttle شغالة مش bug. ولو نسيت [[Accept: application/json]] في [[/api/me]] من غير token، في مشروع من غير starter kit هتاخد 500 «Route [login] not defined.» بدل 401: الـ middleware بيحاول يحوّلك لصفحة login. ولو نسيت [[HasApiTokens]] هتاخد «Call to undefined method createToken()».`
        },
        {
          cmd: "API Resources و paginate",
          title: "تحكّم في شكل الـ JSON اللي الـ API بترجّعه، وقسّمه صفحات",
          desc: R`لو رجّعت الموديل على طول، الـ JSON بيبقى شكل الجدول بالظبط: أي عمود جديد يطلع للعالم، وأي تغيير في اسم عمود يكسر التطبيق. الـ API Resource كلاس بيحدد شكل الرد: [[php artisan make:resource PostResource]]، وفيه [[toArray()]] بترجّع الحقول اللي عايزها.

[[PostResource::collection(Post::paginate(15))]] بيرجّع [[data]] و [[links]] و [[meta]] (الصفحة الحالية والإجمالي) من غير ما تكتب حاجة. و [[whenLoaded('user')]] بيحط العلاقة بس لو اتحمّلت بـ [[with()]]، فالـ resource مبيعملش N+1.`,
          example: R`<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'excerpt' => str($this->body)->limit(120),
            'published_at' => $this->published_at?->toIso8601String(),
            'author' => new UserResource($this->whenLoaded('user')),
            'comments_count' => $this->whenCounted('comments'),
            'can_edit' => $request->user()?->can('update', $this->resource) ?? false,
        ];
    }
}`,
          try: R`اعمل [[PostResource]] و [[UserResource]] (id و name بس)، و route في api.php: [[Route::get('/posts', fn () => PostResource::collection(Post::with('user')->withCount('comments')->published()->latest()->paginate(5)));]]. افتح [[/api/posts]] و [[/api/posts?page=2]]، وبعدين شيل [[with('user')]] وشوف [[author]]. وجرّب [[simplePaginate]] و [[cursorPaginate]] بدل [[paginate]] وقارن [[meta]].`,
          flag: "script",
          deep: {
            why: "الـ API عقد مع الـ frontend وتطبيق الموبايل: لازم يفضل ثابت حتى لو القاعدة اتغيرت. والـ Resource بيفصل الاتنين، وبيمنع تسريب أعمدة زي [[password]] أو [[internal_notes]] بالغلط.",
            how: R`[[$this->title]] جوه الـ resource بيقرا من الموديل ([[$this->resource]]). والـ helpers: [[whenLoaded('rel')]]، و [[whenCounted('rel')]]، و [[when($cond, $value)]] (الحقل بيختفي لو الشرط false، مش null)، و [[mergeWhen]].

الـ pagination: [[paginate(15)]] بيعمل query للعدد الكلي كمان ([[COUNT(*)]]) عشان [[meta.total]] و [[last_page]]. [[simplePaginate]] من غير العدد (أسرع، بس «التالي» و«السابق» بس). [[cursorPaginate]] بيستخدم [[WHERE]] على أعمدة الترتيب (مثلًا [[created_at < آخر_قيمة]]) بدل OFFSET، ولازم الترتيب يبقى unique وإلا صفوف بتضيع بين الصفحات (ضيف [[->latest('id')]] بعد [[latest()]])، فبيفضل سريع في الصفحة 10000 ومبيكررش صفوف لو فيه بيانات بتتضاف، بس مفيش «روح لصفحة 7». وده الأنسب للـ infinite scroll.

[[?page=2]] بيتقرا لوحده، و [[->withQueryString()]] بيحافظ على باقي الـ query (فلتر، بحث) في لينكات الصفحات.

الرد بيتلف في [[data]] افتراضيًا. و [[->additional(['meta' => ...])]] لحقول زيادة، و [[->response()->setStatusCode(201)]] للـ store. وفي Laravel 13 فيه كمان JSON:API resources لو محتاج المواصفة دي بالظبط.`,
            when: "أي endpoint بيرجّع موديل. [[paginate]] للوحات الأدمن (محتاج أرقام صفحات)، و [[cursorPaginate]] للـ feeds والموبايل.",
            mistakes: R`[[return Post::all()]] في API: كل الأعمدة وكل الصفوف. و [[new UserResource($this->user)]] من غير [[whenLoaded]] فكل بوست يعمل query (N+1 مستخبي في الـ resource). و [[paginate(request('per_page'))]] من غير حد أقصى فحد يطلب مليون. و [[paginate]] على جدول فيه ملايين الصفوف والـ COUNT بيبقى أبطأ من الـ query نفسها.`
          },
          teach: R`## الأول: الكلاس ده بيعمل إيه؟

[[PostResource]] بيحوّل موديل Post لـ JSON بالشكل اللي انت عايزه: الحقول دي بس، بالأسماء دي، وبالأنواع دي. فالجدول يتغيّر براحته والـ API تفضل ثابتة.

كل اللي تحت اتشغّل على Laravel 13.35.0 و PHP 8.4.26 (container لينكس، SQLite)، على ٢٥ بوست من الـ seeder (١٨ منهم منشورين)، والـ route من الـ try:

~~~php
Route::get('/posts', fn () => PostResource::collection(
    Post::with('user')->withCount('comments')->published()->latest()->paginate(5)
));
~~~

---

## ١. الكلاس

~~~php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    public function toArray(Request $request): array
    {
~~~

- [[php artisan make:resource PostResource]] بيعمله في [[app/Http/Resources]].
- [[JsonResource]] بيلف موديل واحد. الموديل نفسه في [[$this->resource]]، و [[$this->title]] اختصار لـ [[$this->resource->title]].
- [[toArray]] بترجّع array، و Laravel بيحوّلها JSON. و [[$request]] الطلب الحالي (عشان تعرف مين بيطلب).

## ٢. الحقول سطر سطر

~~~php
'id' => $this->id,
'title' => $this->title,
'slug' => $this->slug,
~~~

زي ما هي من الموديل.

~~~php
'excerpt' => str($this->body)->limit(120),
~~~

[[str(...)]] بيلف النص في object فيه methods، و [[limit(120)]] أول ١٢٠ حرف وبعدهم [[...]].

~~~php
'published_at' => $this->published_at?->toIso8601String(),
~~~

[[published_at]] Carbon (من الـ cast)، و [[?->]] (nullsafe): لو null رجّع null من غير خطأ. و [[toIso8601String()]] الصيغة القياسية [[2026-04-07T19:05:28+00:00]] اللي أي لغة بتفهمها.

~~~php
'author' => new UserResource($this->whenLoaded('user')),
'comments_count' => $this->whenCounted('comments'),
~~~

- [[whenLoaded('user')]]: لو العلاقة اتحمّلت بـ [[with('user')]] رجّعها، غير كده رجّع علامة خاصة بتخلي **المفتاح نفسه يختفي**. فالـ resource عمره ما يعمل query لوحده (مفيش N+1 مستخبي).
- [[new UserResource(...)]] اليوزر بشكل الـ resource بتاعه (id و name بس، الـ solCode).
- [[whenCounted('comments')]] نفس الفكرة مع [[withCount]].

~~~php
'can_edit' => $request->user()?->can('update', $this->resource) ?? false,
~~~

[[$request->user()?->can(...)]]: لو مفيش يوزر، [[?->]] بترجّع null، و [[?? false]] بتحوّلها false. والـ policy من درس Gate و Policy.

---

## ٣. الرد: [[/api/posts]]

~~~text الناتج (أول عنصر)
{"id":25,"title":"Quisquam natus ipsum qui.","slug":"quisquam-natus-ipsum-qui-txH36","excerpt":"Sit quod velit eos iste voluptate temporibus. Et facere quia nesciunt fugiat. Aperiam impedit iste debitis tempore. Illu...","published_at":"2026-04-07T19:05:28+00:00","author":{"id":6,"name":"Prof. Karlee Weissnat"},"comments_count":0,"can_edit":false}
~~~

مفيش [[body]] كامل ولا [[user_id]] ولا [[views]] ولا [[created_at]]: اللي في [[toArray]] بس.

وحوالين الـ ٥ عناصر:

~~~text الناتج
"links": {"first":".../api/posts?page=1","last":".../api/posts?page=4","prev":null,"next":".../api/posts?page=2"}
"meta": {"current_page":1,"from":1,"last_page":4,"links":[6 عناصر],"path":".../api/posts","per_page":5,"to":5,"total":18}
~~~

- [[total]] = 18 منشور، و [[last_page]] = 4 لأن ١٨ ÷ ٥ = ٣.٦ تتقرّب لفوق.
- [[from]] و [[to]]: العناصر رقم ١ لـ ٥.
- [[?page=2]]: [[current_page]] = 2، و [[from]] = 6 و [[to]] = 10، و [[prev]] بقى ليه لينك.

## ٤. من غير [[with('user')]]

مفاتيح أول عنصر:

~~~text الناتج
id,title,slug,excerpt,published_at,comments_count,can_edit
~~~

[[author]] **اختفى** خالص، مش [[null]].

## ٥. [[simplePaginate]] و [[cursorPaginate]]

| النوع | [[meta]] | اللينكات |
|---|---|---|
| [[paginate(5)]] | فيها [[total]] و [[last_page]] (query [[count(*)]] زيادة) | [[?page=N]] و [[last]] |
| [[simplePaginate(5)]] | [[current_page]] و [[from]] و [[to]] بس، من غير total | [[last]] = null |
| [[cursorPaginate(5)]] | [[next_cursor]] و [[prev_cursor]] | [[?cursor=eyJ...]] |

والـ cursor ده إيه؟ base64 لـ JSON:

~~~text الناتج (فك الـ cursor)
{"created_at":"2026-10-07 16:56:01","_pointsToNextItems":true}
~~~

يعني الصفحة الجاية = [[WHERE created_at < '2026-10-07 16:56:01']]. وهنا اكتشفنا مشكلة حقيقية: الـ seeder عمل البوستات كلها في نفس الثانية، فلما لفّينا على الصفحات بـ [[latest()->cursorPaginate(5)]]:

~~~text الناتج
الصفحة ١: 25,24,17,20,13
الصفحة ٢: (فاضية)
~~~

١٣ بوست ضاعوا، لأن مفيش ولا بوست [[created_at]] بتاعه أصغر من القيمة دي. والحل عمود ترتيب unique في الآخر:

~~~php
Post::with('user')->published()->latest()->latest('id')->cursorPaginate(5)
~~~

~~~text الناتج
25,24,21,20,19
17,16,14,13,12
11,7,6,5,4
3,2,1
~~~

الـ ١٨ كلهم.

---

## الخلاصة

| الحاجة | بتعمل إيه |
|---|---|
| [[PostResource::collection($paginator)]] | [[data]] و [[links]] و [[meta]] لوحدهم |
| [[whenLoaded('rel')]] | العلاقة لو اتحمّلت، وإلا المفتاح يختفي |
| [[whenCounted('rel')]] | العدد لو [[withCount]] |
| [[?->]] و [[??]] | null من غير أخطاء |
| [[paginate]] | أرقام صفحات و total |
| [[simplePaginate]] | التالي والسابق بس، من غير count |
| [[cursorPaginate]] | سريع للـ feeds، والترتيب لازم يبقى unique |`,
          lines: [
            "بداية الملف.",
            "الـ namespace.",
            "الطلب (عشان نعرف مين بيطلب).",
            "الكلاس الأساسي.",
            "الكلاس.",
            "فتحة.",
            "شكل كل عنصر.",
            "فتحة.",
            "المصفوفة.",
            "الـ id.",
            "العنوان.",
            "الـ slug.",
            "أول 120 حرف من النص.",
            "التاريخ بصيغة ISO، أو null لو draft.",
            "الكاتب بشكل UserResource، بس لو اتحمّل بـ with.",
            "العدد بس لو اتعمل withCount.",
            "هل اليوزر الحالي يقدر يعدّل (للـ frontend يعرض الزرار).",
            "قفلة المصفوفة.",
            "قفلة.",
            "قفلة الكلاس."
          ],
          sol: R`[[/api/posts]] بيرجّع [[{"data":[{"id":..,"title":"..","slug":"..","excerpt":"..","published_at":"2026-...T..:..:..+00:00","author":{"id":1,"name":".."},"comments_count":2,"can_edit":false}, ...5 عناصر],"links":{"first":"...?page=1","last":"...?page=N","prev":null,"next":"...?page=2"},"meta":{"current_page":1,"from":1,"last_page":N,"per_page":5,"to":5,"total":..,"links":[...],"path":"..."}}]].

من غير [[with('user')]] المفتاح [[author]] بيختفي خالص من كل عنصر (مش null). [[simplePaginate]]: [[meta]] من غير [[total]] و [[last_page]]. [[cursorPaginate]]: [[meta]] فيها [[next_cursor]] و [[prev_cursor]]، واللينك [[?cursor=eyJ...]] بدل [[?page=2]]. ولو البوستات اتعملت في نفس الثانية (seeder)، [[latest()->cursorPaginate]] لوحده بيرجّع صفحة تانية فاضية والباقي يضيع، لأن [[created_at]] مش unique: زوّد [[->latest('id')]].

الغلط الشائع: تتوقع [[author: null]] وتكتب الـ frontend عليه، والمفتاح مش موجود أصلًا.`,
          solCode: R`<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return ['id' => $this->id, 'name' => $this->name];
    }
}`
        },
        {
          cmd: "queue:work",
          title: "ابعت الإيميل في الخلفية بدل ما المستخدم يستنى (queues و jobs)",
          desc: R`بعض الشغل بطيء أو ممكن يفشل: إيميل، أو resize صور، أو نداء API برّه. لو عملته جوه الطلب، المستخدم بيستنى، ولو الـ SMTP وقع الطلب كله يقع. الحل queue: الطلب بيحط job في طابور ويرد على طول، وعملية تانية ([[php artisan queue:work]]) بتسحب الـ jobs وتنفّذها.

[[php artisan make:job ProcessCover]]، و [[ProcessCover::dispatch($post)]] بيحطه في الطابور. والمشروع الجديد بيستخدم driver [[database]] (جدول jobs موجود من الأول)، وفي الإنتاج غالبًا Redis.

والإيميل نفسه: [[Mail::to($user)->queue(new PostPublished($post))]] بدل [[send]]، أو الـ Mailable يعمل [[implements ShouldQueue]].`,
          example: R`<?php

namespace App\Jobs;

use App\Models\Post;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Storage;

class ProcessCover implements ShouldQueue
{
    use Queueable;

    public int $tries = 3;
    public array $backoff = [10, 60];

    public function __construct(public Post $post) {}

    public function handle(): void
    {
        $path = $this->post->cover_path;
        $image = imagecreatefromstring(Storage::disk('public')->get($path));
        $thumb = imagescale($image, 400);
        ob_start();
        imagewebp($thumb, null, 80);
        Storage::disk('public')->put("thumbs/{$this->post->id}.webp", ob_get_clean());
    }
}`,
          try: R`اعمل job بسيط بيكتب في اللوج [[Log::info('job ran', ['post' => $this->post->id])]] وبيعمل [[sleep(2)]]. اعمله dispatch من route، وافتح الـ route: الرد جه بسرعة؟ بعدين شغّل [[php artisan queue:work --once]] وبص في [[storage/logs/laravel.log]]. وخلّي الـ job يرمي exception وشغّل الـ worker لحد ما يستسلم، وبعدين [[php artisan queue:failed]].`,
          flag: "script",
          deep: {
            why: "زمن الرد بيفرق مع المستخدم، والـ worker بيعيد المحاولة لوحده لو خدمة برّه وقعت دقيقة. وده نفس الـ pattern في كل backend (BullMQ في Node، و Celery في Python)، فلو فهمته هنا فهمته في كل حتة.",
            how: R`الـ job بيتحوّل لنص (serialize) ويتخزن. والموديل بيتخزن كـ id بس ([[SerializesModels]] جوه [[Queueable]])، فالـ worker بيجيبه من القاعدة تاني وقت التنفيذ بأحدث نسخة. ولو اتمسح في النص: [[ModelNotFoundException]]، أو [[public bool $deleteWhenMissingModels = true;]].

[[$tries]] عدد المحاولات، و [[$backoff]] الانتظار بين كل محاولة بالثواني، و [[failed(Throwable $e)]] بيتنادى بعد آخر محاولة. والفاشل بيروح جدول [[failed_jobs]]: [[queue:failed]] تشوفه، و [[queue:retry all]] تعيده.

[[queue:work]] عملية شغالة على طول ومحمّلة الكود في الذاكرة، فبعد أي deploy لازم [[php artisan queue:restart]] وإلا هتفضل تشغّل الكود القديم. وفي الإنتاج بيشتغل تحت systemd أو Supervisor (درس النشر)، مش في tmux.

[[queue:work --queue=high,default]] أولويات. و Laravel Horizon لوحة و worker manager لو الـ driver Redis.

و [[dispatch()->afterCommit()]] (أو [[after_commit]] في الإعدادات): متحطش الـ job غير لما الـ transaction تخلص، وإلا الـ worker ممكن يبدأ قبل ما الصف يتكتب.`,
            when: "أي حاجة بتاخد أكتر من ثانية أو بتنادي خدمة برّه: إيميلات، إشعارات، webhooks خارجة، صور، تقارير، استيراد CSV. وحاجة لازم تحصل قبل الرد (خصم الرصيد مثلًا) متحطهاش في queue.",
            mistakes: R`[[QUEUE_CONNECTION=sync]] في الإنتاج (الـ job بيتنفّذ جوه الطلب، فكأن مفيش queue). ونسيان [[queue:restart]] بعد الـ deploy. و job مش idempotent: اتنفّذ مرتين بعد retry فالعميل خد إيميلين أو اتخصم مرتين. وتبعت object كبير (ملف كامل) للـ job بدل path أو id. وفي الانترفيو: «إيه اللي يحصل لو الـ worker مات في نص job؟» الـ job بيرجع الطابور بعد [[retry_after]] ويتنفّذ تاني، عشان كده idempotency.`
          },
          teach: R`## الأول: الكلاس ده بيعمل إيه؟

job: شغلة بتتحط في طابور وتتنفّذ بعدين في عملية تانية. [[ProcessCover]] بياخد صورة غلاف البوست، ويصغّرها لعرض ٤٠٠، ويحفظها WebP. والطلب اللي عمل [[dispatch]] بيرد على طول من غير ما يستنى.

كل اللي تحت اتشغّل على Laravel 13.35.0 و PHP 8.4.26 (container لينكس، SQLite، و [[QUEUE_CONNECTION=database]] الافتراضي). الـ [[php:8.4-cli]] مفيهوش extension الـ [[gd]] اللي بتشتغل على الصور، فـ [[ProcessCover]] اتجرّب في container اتسطّب فيه [[gd]] بـ [[docker-php-ext-install gd]]، وعلى السيرفر الحقيقي ده [[php8.4-gd]].

---

## ١. الـ imports

~~~php
use App\Models\Post;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Storage;
~~~

- [[ShouldQueue]] interface فاضي تقريبًا، وظيفته علامة: «الكلاس ده يروح الطابور، متنفّذهوش دلوقتي».
- [[Queueable]] trait فيه [[dispatch]] و [[delay]] و [[onQueue]]، ومعاه [[SerializesModels]] (تحت).
- [[Storage]] الملفات (درس Storage).

## ٢. الكلاس والإعدادات

~~~php
class ProcessCover implements ShouldQueue
{
    use Queueable;

    public int $tries = 3;
    public array $backoff = [10, 60];
~~~

- [[implements]] = الكلاس بينفّذ الـ interface.
- [[$tries = 3]] = ٣ محاولات بالكتير.
- [[$backoff = [10, 60]]] = استنى ١٠ ثواني قبل المحاولة التانية، و ٦٠ قبل التالتة.

~~~php
    public function __construct(public Post $post) {}
~~~

constructor promotion: [[public Post $post]] جوه الأقواس بيعمل property ويحط فيها القيمة في سطر. والـ [[{}]] الفاضية = مفيش كود تاني.

## ٣. [[handle()]]: الشغل نفسه

~~~php
$path = $this->post->cover_path;
$image = imagecreatefromstring(Storage::disk('public')->get($path));
~~~

[[Storage::disk('public')->get($path)]] بيقرا الملف كـ bytes، و [[imagecreatefromstring]] (من gd) بيفهمه صورة أيًا كان نوعها (PNG أو JPEG أو WebP).

~~~php
$thumb = imagescale($image, 400);
~~~

عرض ٤٠٠، والطول بيتحسب لوحده بنفس النسبة.

~~~php
ob_start();
imagewebp($thumb, null, 80);
Storage::disk('public')->put("thumbs/{$this->post->id}.webp", ob_get_clean());
~~~

- [[imagewebp($img, null, 80)]]: الـ [[null]] مكان اسم الملف معناها «اطبعها» بدل ما تكتبها في ملف، و ٨٠ الجودة من ١٠٠.
- [[ob_start()]] (output buffering) بيمسك أي حاجة بتتطبع بدل ما تروح للشاشة، و [[ob_get_clean()]] بيرجّعها كنص ويقفل الـ buffer. كده الصورة بقت في متغير.
- [[put(مسار, محتوى)]] بيكتبها. و [[{$this->post->id}]] جوه نص بعلامات مزدوجة بيتبدّل بالـ id.

### اتجرّب

صورة PNG مقاسها ١٦٠٠×٩٠٠، في [[covers/a.png]]، وبوست عمود [[cover_path]] فيه المسار ده:

~~~text الناتج
original: 6421 bytes
thumbs/1.webp: 258 bytes
Array ( [0] => 400 [1] => 225 )
~~~

٤٠٠×٢٢٥: نفس النسبة ١٦:٩. والملف في [[storage/app/public/thumbs/1.webp]].

> في أول تجربة حطينا [[cover_path]] على الموديل من غير [[save()]]، والـ job وقع بـ [[Storage::get]] على null. ليه؟ الـ job بيتخزن ويرجع، والموديل بيرجع **من القاعدة** (الفقرة الجاية)، فأي حاجة مش محفوظة بتضيع.

---

## ٤. الـ job بيتخزن إزاي؟

الـ try (الـ solCode): job اسمه [[LogPost]] بيعمل [[sleep(2)]] ويكتب في اللوج، و route بيعمله dispatch:

~~~php
Route::get('/dispatch', function () {
    LogPost::dispatch(Post::first());
    return 'queued';
});
~~~

[[LogPost::dispatch(...)]] بيبعت الباراميترات للـ constructor ويحط الـ job في جدول [[jobs]]. الصف ده من جوه:

~~~text الناتج (عمود payload، مختصر)
{"uuid":"e73de43b-...","displayName":"App\\Jobs\\LogPost","maxTries":3,...,
 "data":{"command":"O:16:\"App\\Jobs\\LogPost\":1:{s:4:\"post\";O:45:\"Illuminate\\Contracts\\Database\\ModelIdentifier\":5:{s:5:\"class\";s:15:\"App\\Models\\Post\";s:2:\"id\";i:1;...}}"}}
~~~

الـ [[O:16:...]] ده شكل [[serialize()]] في PHP. والمهم: البوست مش متخزن كله، متخزن **[[ModelIdentifier]]**: اسم الكلاس و [[id]] = 1 بس. ده [[SerializesModels]]. والـ worker بيعمل [[Post::find(1)]] وقت التنفيذ، فبياخد أحدث نسخة.

## ٥. الرد سريع؟

| الطلب | الوقت |
|---|---|
| [[/dispatch]] (تاني مرة) | 0.46 ثانية |
| route عادي | 0.16 ثانية |

أقل من الـ ٢ ثانية بتوع [[sleep]]: الطلب كتب صف في [[jobs]] ورد، ومحدش نفّذ الـ job لسه.

## ٦. [[php artisan queue:work --once]]

[[--once]] = نفّذ job واحد واقفل.

~~~text الناتج
  2026-10-07 17:13:50 App\Jobs\LogPost ............................... RUNNING
  2026-10-07 17:13:53 App\Jobs\LogPost ............................... 2s DONE
~~~

~~~text storage/logs/laravel.log
[2026-10-07 17:13:53] local.INFO: job ran {"post":1}
~~~

[[local]] اسم البيئة ([[APP_ENV]])، و [[INFO]] المستوى، وبعده الرسالة والـ context كـ JSON.

## ٧. job بيفشل

غيّرنا [[handle]] ترمي [[throw new \RuntimeException('SMTP down');]] (الـ [[\]] قبل الاسم = الكلاس من الـ namespace العام، من غيرها PHP دوّر على [[App\Jobs\RuntimeException]] وطلع خطأ تاني)، و [[$tries = 3]] و [[$backoff = [10, 60]]]، وشغّلنا worker عادي:

~~~text الناتج
  17:15:18 App\Jobs\LogPost ......................... 258.09ms FAIL
  17:15:57 App\Jobs\LogPost ......................... 353.71ms FAIL
  17:16:57 App\Jobs\LogPost .......................... 45.02ms FAIL
~~~

٣ محاولات، والتالتة بعد ٦٠ ثانية بالظبط من التانية (التانية اتأخرت أكتر من ١٠ لأن الـ worker اتقفل واتشغّل تاني بينهم). بعد كده:

~~~bash
php artisan queue:failed
~~~

~~~text الناتج
  2026-10-07 17:16:57 7036afc8-cb3c-4afc-90ed-750745024aa5  database@default App\Jobs\LogPost
~~~

الوقت، والـ UUID (تستخدمه في [[queue:retry 7036afc8-...]])، و [[database@default]] = الـ connection والطابور، واسم الـ job. والـ exception كاملة في عمود [[exception]] في [[failed_jobs]]:

~~~text الناتج
RuntimeException: SMTP down in /w/shop/app/Jobs/LogPost.php:21
~~~

> فخ اتقابل: [[queue:work --stop-when-empty]] بعد أول FAIL **وقف** وقال [[Queue empty]]، لأن الـ job رجع الطابور بـ [[available_at]] بعد ١٠ ثواني، فمفيش job «متاح» دلوقتي. الـ worker العادي (من غير الـ flag) هو اللي بيستنى ويكمّل.

---

## الخلاصة

| الحاجة | بتعمل إيه |
|---|---|
| [[implements ShouldQueue]] + [[use Queueable]] | الكلاس يروح الطابور |
| [[X::dispatch($post)]] | صف في [[jobs]]، والموديل كـ id بس |
| [[$tries]] و [[$backoff]] | عدد المحاولات والانتظار بينهم |
| [[queue:work]] / [[--once]] | العملية اللي بتنفّذ |
| [[queue:failed]] و [[queue:retry]] | الفاشلين وإعادتهم |
| [[queue:restart]] | بعد كل deploy، عشان الـ worker يقرا الكود الجديد |`,
          lines: [
            "بداية الملف.",
            "الـ namespace.",
            "الموديل.",
            "الـ interface اللي بيقول «ده يروح الطابور».",
            "الـ trait اللي فيه dispatch و delay والـ serialize.",
            "التخزين.",
            "الكلاس.",
            "فتحة.",
            "الـ trait.",
            "3 محاولات بالكتير.",
            "استنى 10 ثواني بعد أول فشل، و60 بعد التاني.",
            "البوست بيتخزن كـ id ويتجاب تاني وقت التنفيذ.",
            "الشغل نفسه.",
            "فتحة.",
            "مسار الصورة الأصلية.",
            "افتحها.",
            "صغّرها لعرض 400.",
            "اكتب الناتج في الذاكرة...",
            "...بصيغة WebP وجودة 80.",
            "واحفظه على الـ disk العام.",
            "قفلة.",
            "قفلة الكلاس."
          ],
          sol: R`الـ route بيرد فورًا (من غير الـ 2 ثانية) لأن الـ job اتحط في جدول [[jobs]] بس. [[queue:work --once]] بيطبع سطر زي [[App\Jobs\... ....... RUNNING]] وبعده [[DONE]] بعد حوالي 2 ثانية، واللوج فيه [[local.INFO: job ran {"post":1}]].

مع exception و [[$tries = 3]]: هتشوف [[FAIL]] 3 مرات (مع [[$backoff]] الـ worker بيستنى بينهم)، وبعدين [[queue:failed]] بيوري سطر فيه وقت الفشل والـ UUID و [[database@default]] واسم الـ job، والـ exception كاملة في عمود [[exception]] في جدول [[failed_jobs]].

الغلط الشائع: [[QUEUE_CONNECTION=sync]] في [[.env]] فالـ route نفسه ياخد ثانيتين والـ worker ميلاقيش حاجة. أو تشغّل [[queue:work]] قبل ما تعدّل الكود ومتعملش restart فتفضل تشوف السلوك القديم.`,
          solCode: R`<?php

namespace App\Jobs;

use App\Models\Post;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class LogPost implements ShouldQueue
{
    use Queueable;

    public int $tries = 3;

    public function __construct(public Post $post) {}

    public function handle(): void
    {
        sleep(2);
        Log::info('job ran', ['post' => $this->post->id]);
    }
}

// routes/web.php
Route::get('/dispatch', function () {
    LogPost::dispatch(Post::first());
    return 'queued';
});`
        },
        {
          cmd: "Schedule و Mail و Storage",
          title: "شغّل مهام كل يوم، وابعت إيميل، وخزّن ملفات بنفس الكود محلي أو S3",
          desc: R`الـ scheduler: بدل سطر cron لكل مهمة، سطر cron واحد على السيرفر بيشغّل [[php artisan schedule:run]] كل دقيقة، والمهام نفسها مكتوبة في [[routes/console.php]] وبتتراجع في git: [[Schedule::command('posts:publish-due')->everyMinute()]]. و [[php artisan schedule:list]] يوريك كل مهمة وإمتى هتشتغل.

الإيميل: Mailable كلاس بموضوع و view. [[php artisan make:mail PostPublished --markdown=mail.post-published]]، و [[Mail::to($user)->queue(...)]]. وفي التطوير [[MAIL_MAILER=log]] (الافتراضي) فالإيميلات بتتكتب في اللوج بدل ما تتبعت.

التخزين: [[Storage::disk('public')->put()]] أو [[$request->file('cover')->store('covers', 'public')]]. نفس الكود يشتغل على فولدر محلي أو S3 أو R2، بتغيير الـ disk في الإعدادات بس.`,
          example: R`<?php
// routes/console.php
use App\Mail\WeeklyDigest;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Schedule;

Schedule::call(function () {
    Post::whereNull('published_at')->where('publish_at', '<=', now())->update(['published_at' => now()]);
})->everyMinute()->name('publish-due')->withoutOverlapping();

Schedule::command('queue:prune-failed --hours=168')->daily();
Schedule::command('model:prune')->dailyAt('03:10');

Schedule::call(function () {
    User::where('wants_digest', true)->each(fn (User $u) => Mail::to($u)->queue(new WeeklyDigest($u)));
})->weeklyOn(5, '09:00')->timezone('Africa/Cairo')->name('weekly-digest')->onOneServer();`,
          try: R`اكتب مهمة [[Schedule::call(fn () => Log::info('tick'))->everyMinute();]] وشغّل [[php artisan schedule:list]] وبعدين [[php artisan schedule:work]] دقيقتين وبص في اللوج. وبعدين: فورم رفع صورة يخزّنها بـ [[store('covers', 'public')]]، وشغّل [[php artisan storage:link]]، واعرضها بـ [[Storage::url($path)]].`,
          flag: "script",
          deep: {
            why: "أي تطبيق فيه شغل دوري (تقارير، تنضيف، تذكيرات) وإيميلات وملفات مرفوعة. الـ scheduler بيخلي المهام في الكود بدل crontab على سيرفر محدش فاكره، والـ Storage بيخليك تنقل الملفات لـ S3 يوم ما السيرفر الواحد يبقى مش كفاية من غير ما تعدّل الكود.",
            how: R`الـ cron الوحيد على السيرفر: [[* * * * * cd /var/www/shop/current && php artisan schedule:run >> /dev/null 2>&1]] (بيوزر الموقع، زي درس crontab في «تاب VPS»). وفي التطوير [[schedule:work]] بيعمل نفس الحاجة كل دقيقة.

[[withoutOverlapping()]]: لو المرة اللي فاتت لسه شغالة متبدأش تانية (بيحتاج cache driver). [[onOneServer()]]: لو عندك أكتر من سيرفر، واحد بس ينفّذ. و [[timezone('Africa/Cairo')]] للمهمة لوحدها، والـ app نفسه خليه UTC.

الإيميل: [[config/mail.php]] و [[MAIL_*]] في [[.env]] (SMTP، أو Postmark و Resend و SES). و Markdown mailables بيطلّعوا إيميل HTML متظبط لوحدهم. و [[Mail::fake()]] في الـ tests.

الـ disks: [[local]] (في [[storage/app/private]]، مش على الويب)، و [[public]] (في [[storage/app/public]] ويظهر على الويب عن طريق symlink [[public/storage]] اللي بيعمله [[storage:link]])، و [[s3]]. والخاص بيتعرض بـ [[Storage::temporaryUrl($path, now()->addMinutes(5))]] (S3، أو local مع serve) أو route بيتحقق من الصلاحية ويرجّع [[Storage::download()]].`,
            when: "scheduler لأي حاجة دورية. queue لأي إيميل. [[public]] disk للصور العامة، و [[local]] أو S3 private للفواتير والمستندات.",
            mistakes: R`تنسى سطر الـ cron على السيرفر فولا مهمة بتشتغل ومحدش واخد باله. وتحط ملفات المستخدمين الخاصة في [[public]] disk فتبقى على رابط يتخمن. و [[store()]] باسم الملف الأصلي من المستخدم (استخدم الاسم العشوائي اللي بيعمله [[store]]). وتنسى [[storage:link]] على السيرفر فكل الصور 404. و [[Mail::send]] جوه الطلب مع SMTP بطيء.`
          },
          teach: R`## الأول: الملف ده بيعمل إيه؟

[[routes/console.php]] فيه مواعيد: «اعمل كذا كل دقيقة»، و «كذا كل يوم الساعة ٣:١٠»، و «ابعت إيميل كل جمعة». ومحدش بيشغّلهم غير أمر واحد [[php artisan schedule:run]] بيشتغل كل دقيقة، ويشوف مين ميعاده جه.

كل اللي تحت اتشغّل على Laravel 13.35.0 و PHP 8.4.26 (container لينكس، SQLite)، والإيميل بـ [[MAIL_MAILER=log]] (الافتراضي). وضفنا للتجربة عمود [[publish_at]] للبوستات و [[wants_digest]] لليوزرز، و Mailable اسمه [[WeeklyDigest]] بـ [[php artisan make:mail WeeklyDigest]].

---

## ١. الـ imports

~~~php
use App\Mail\WeeklyDigest;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Schedule;
~~~

[[Schedule]] الـ facade بتاع المواعيد، و [[Mail]] بتاع الإيميل.

## ٢. مهمة كود كل دقيقة

~~~php
Schedule::call(function () {
    Post::whereNull('published_at')->where('publish_at', '<=', now())->update(['published_at' => now()]);
})->everyMinute()->name('publish-due')->withoutOverlapping();
~~~

- [[Schedule::call(function () {...})]]: المهمة دالة PHP.
- جواها query واحدة: البوستات اللي لسه مش منشورة ([[published_at]] null) وميعادها المجدول ([[publish_at]]) جه، اعملهم [[UPDATE]] مرة واحدة. (عمودين مختلفين: [[publish_at]] «انشره إمتى» و [[published_at]] «اتنشر إمتى».)
- [[everyMinute()]] الميعاد، و [[name('publish-due')]] اسم يظهر في اللوج والقايمة.
- [[withoutOverlapping()]]: لو المرة اللي فاتت لسه شغالة متبدأش تانية (بيستخدم lock في الـ cache).

## ٣. أوامر artisan بمواعيد

~~~php
Schedule::command('queue:prune-failed --hours=168')->daily();
Schedule::command('model:prune')->dailyAt('03:10');
~~~

- [[Schedule::command('...')]] = شغّل أمر artisan.
- [[queue:prune-failed --hours=168]] امسح الـ jobs الفاشلة الأقدم من ١٦٨ ساعة (أسبوع).
- [[model:prune]] امسح الصفوف القديمة من الموديلات اللي عليها [[Prunable]].
- [[daily()]] = نص الليل، و [[dailyAt('03:10')]] كل يوم ٣:١٠.

## ٤. إيميل أسبوعي

~~~php
Schedule::call(function () {
    User::where('wants_digest', true)->each(fn (User $u) => Mail::to($u)->queue(new WeeklyDigest($u)));
})->weeklyOn(5, '09:00')->timezone('Africa/Cairo')->name('weekly-digest')->onOneServer();
~~~

- [[each(fn ...)]] بيلف على اليوزرز على دفعات (١٠٠٠ كل مرة)، مش كلهم في الذاكرة مرة واحدة.
- [[Mail::to($u)]] المرسل إليه (Laravel بياخد [[email]] و [[name]] من الموديل)، و [[->queue(new WeeklyDigest($u))]] حط الإيميل في الطابور بدل ما تبعته دلوقتي.
- [[weeklyOn(5, '09:00')]]: اليوم رقم ٥ (الأحد = 0، فـ ٥ = الجمعة) الساعة ٩.
- [[timezone('Africa/Cairo')]] الـ ٩ دي بتوقيت القاهرة، مع إن التطبيق UTC.
- [[onOneServer()]] لو عندك كذا سيرفر، واحد بس ينفّذ.

> المثال الأصلي كان من غير [[name(...)]] قبل [[onOneServer()]]، وده بيوقّع **أي** أمر artisan: [[LogicException: A scheduled event name is required to only run on one server. Use the 'name' method before 'onOneServer'.]] الـ closure ملهاش اسم لوحدها، و [[onOneServer]] محتاج اسم يعمل بيه الـ lock. اتصلّح في المثال.

---

## ٥. [[php artisan schedule:list]]

~~~text الناتج
  *  * * * *  publish-due ...................... Next Due: 13 seconds from now
  0  0 * * *  php artisan queue:prune-failed --hours=168  Next Due: 6 hours from now
  10 3 * * *  php artisan model:prune ............. Next Due: 9 hours from now
  0  6 * * 5  weekly-digest ......................... Next Due: 1 day from now
  *  * * * *  Closure at: routes/console.php:21  Next Due: 13 seconds from now
~~~

أول عمود صيغة cron: دقيقة، ساعة، يوم الشهر، الشهر، يوم الأسبوع. و [[*]] = أي قيمة. فـ [[10 3 * * *]] = الدقيقة ١٠ من الساعة ٣ كل يوم.

ليه [[weekly-digest]] بيقول [[0 6 * * 5]] مش ٩؟ القايمة بتعرض بتوقيت التطبيق (UTC)، والقاهرة في أكتوبر ٢٠٢٦ UTC+3 (توقيت صيفي)، فـ ٩ القاهرة = ٦ UTC.

والسطر الأخير مهمة الـ try ([[Schedule::call(fn () => Log::info('tick'))->everyMinute();]]): من غير اسم بتظهر بمكانها في الملف.

## ٦. [[schedule:run]] و [[schedule:work]]

حطينا بوست مسودة [[publish_at]] بتاعه من دقيقة، وبعدين:

~~~text الناتج (php artisan schedule:run)
  2026-10-07 17:21:18 Running [publish-due] .................... 120.21ms DONE
  2026-10-07 17:21:18 Running [Callback] ....................... 204.19ms DONE
~~~

[[schedule:run]] شغّل اللي ميعاده جه بس (الـ ٢ اللي كل دقيقة)، والبوست بقى [[published_at]] = [[2026-10-07 17:21:18]]. و [[schedule:work]] هو نفس الكلام في loop كل دقيقة (للتطوير):

~~~text الناتج (دقيقتين)
  2026-10-07 17:22:06 Running [publish-due] .................... 155.93ms DONE
  2026-10-07 17:22:06 Running [Callback] ....................... 314.65ms DONE

  2026-10-07 17:23:05 Running [publish-due] .................... 112.10ms DONE
  2026-10-07 17:23:05 Running [Callback] ....................... 219.97ms DONE
~~~

~~~text storage/logs/laravel.log
[2026-10-07 17:22:07] local.INFO: tick
[2026-10-07 17:23:06] local.INFO: tick
~~~

## ٧. الإيميل في اللوج

يوزر واحد [[wants_digest = true]]، و [[schedule:test --name=weekly-digest]] (بيشغّل مهمة واحدة دلوقتي من غير ما تستنى ميعادها)، وبعدين [[queue:work --once]]:

~~~text الناتج
  Running [weekly-digest] ............................................ 1s DONE
  2026-10-07 17:24:35 App\Mail\WeeklyDigest .......................... RUNNING
  2026-10-07 17:24:37 App\Mail\WeeklyDigest .......................... 1s DONE
~~~

~~~text storage/logs/laravel.log
local.DEBUG: From: Laravel <hello@example.com>
To: Declan Kihn <test@example.com>
Subject: =?utf-8?Q?=D9=85=D9=84=D8=AE=D8=B5_=D8=A7=D9=84=D8=A3?=
<p>ملخص الأسبوع</p>
~~~

الإيميل كامل في اللوج بدل ما يتبعت. و [[Subject]] شكله غريب لأنه عربي: headers الإيميل ASCII بس، فالعربي بيتكتب بـ encoding اسمه quoted-printable ([[=?utf-8?Q?...?=]])، وبرنامج الإيميل بيرجّعه «ملخص الأسبوع».

## ٨. الـ try: رفع ملف

~~~php
$path = $request->file('cover')->store('covers', 'public');
return ['path' => $path, 'url' => Storage::url($path)];
~~~

[[file('cover')]] الملف المرفوع، و [[store('فولدر', 'disk')]] بيحفظه باسم عشوائي ويرجّع المسار.

~~~bash
curl -s -F "cover=@up.png;filename=my photo.png" localhost:8000/api/upload
~~~

[[-F]] بيبعت فورم [[multipart]] (اللي الملفات بتتبعت بيه)، و [[@up.png]] = محتوى الملف ده.

~~~text الناتج
{"path":"covers\/CpgNuGV2fAY4Goc3ptxwyxBhTNipZrLWtbpOmRkm.png","url":"\/storage\/covers\/CpgNuGV2fAY4Goc3ptxwyxBhTNipZrLWtbpOmRkm.png"}
~~~

- الاسم 40 حرف عشوائي، والـ [[my photo.png]] اللي بعتناه اتجاهل: اسم المستخدم مبيوصلش لنظام الملفات. والامتداد [[.png]] من محتوى الملف الحقيقي.
- [[\/]] = [[/]] عادي، JSON بيعمل escape للـ slash.

~~~bash
php artisan storage:link
~~~

~~~text الناتج
   INFO  The [public/storage] link has been connected to [storage/app/public].
~~~

~~~text ls -la public
storage -> /w/shop/storage/app/public
~~~

symlink: الفولدر [[public/storage]] بيشاور على [[storage/app/public]]، فالملفات اللي هناك بقت على الويب. و [[/storage/covers/....png]] رجع 200 و [[image/png]].

---

## الخلاصة

| الحاجة | الكود |
|---|---|
| مهمة كود | [[Schedule::call(fn)->everyMinute()->name('x')]] |
| أمر artisan | [[Schedule::command('...')->dailyAt('03:10')]] |
| على سيرفر واحد | [[->name('x')->onOneServer()]] (الاسم الأول) |
| شوف المواعيد | [[schedule:list]] |
| على السيرفر | cron واحد: [[* * * * * php artisan schedule:run]] |
| إيميل في الطابور | [[Mail::to($u)->queue(new X($u))]] |
| رفع ملف | [[->store('covers', 'public')]] ← اسم عشوائي |
| ظهوره على الويب | [[storage:link]] و [[Storage::url($path)]] |`,
          lines: [
            "بداية الملف.",
            "الإيميل.",
            "البوست.",
            "اليوزر.",
            "الإيميلات.",
            "الـ scheduler.",
            "مهمة كود (closure).",
            "انشر البوستات اللي ميعادها جه، بـ query واحدة.",
            "كل دقيقة، باسم، ومتتداخلش مع نفسها.",
            "امسح الـ jobs الفاشلة اللي عدّى عليها أسبوع.",
            "امسح الموديلات القديمة (اللي عليها Prunable).",
            "مهمة أسبوعية.",
            "لكل يوزر مشترك إيميل في الطابور، على دفعات.",
            "الجمعة 9 الصبح بتوقيت القاهرة، باسم (لازم قبل onOneServer)، وعلى سيرفر واحد."
          ],
          sol: R`[[schedule:list]] بيطلّع سطر زي [[* * * * *  Closure at: routes/console.php:10 .... Next Due: 30 seconds from now]]. و [[schedule:work]] بيطبع كل دقيقة [[Running [Callback] ... DONE]]، واللوج فيه سطرين [[local.INFO: tick]].

الرفع: [[store]] بيرجّع حاجة زي [[covers/8fK2...jpg]] (اسم عشوائي 40 حرف والامتداد من نوع الملف الحقيقي). [[storage:link]] بيكتب [[The [public/storage] link has been connected to [storage/app/public].]]، و [[Storage::url($path)]] بيرجّع [[/storage/covers/8fK2...jpg]] والصورة تفتح.

الغلط الشائع: الصورة 404 لأن [[storage:link]] متعملش، أو [[APP_URL]] غلط فالرابط الكامل بيشاور على [[localhost]].`
        },
        {
          cmd: "Pest",
          title: "اكتب test بيبعت طلب حقيقي ويتأكد من الرد والقاعدة (Pest feature tests)",
          desc: R`Pest هو framework الـ tests اللي Laravel بيعرضه في [[laravel new]]، ومبني فوق PHPUnit بشكل أقصر: [[it('...', function () { ... })]] و [[expect($x)->toBe(3)]]. والـ feature test بيبعت طلب HTTP جوه التطبيق (من غير سيرفر) ويتأكد من الـ status والـ JSON والقاعدة.

[[RefreshDatabase]] بيعمل migrate مرة ويلف كل test في transaction بيترجع، فكل test بيبدأ على قاعدة نضيفة. و [[phpunit.xml]] في المشروع الجديد بيستخدم SQLite في الذاكرة للـ tests.

[[php artisan test]] يشغّلهم، و [[--filter]] لواحد، و [[--parallel]] على كذا process.`,
          example: R`<?php

use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

it('lists only published posts', function () {
    Post::factory()->count(2)->create(['published_at' => now()->subDay()]);
    Post::factory()->draft()->create();

    $this->getJson('/api/posts')
        ->assertOk()
        ->assertJsonCount(2, 'data')
        ->assertJsonPath('meta.total', 2);
});

it('validates the title', function () {
    $this->actingAs(User::factory()->create())
        ->postJson('/api/posts', ['title' => 'ab'])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['title', 'slug', 'body']);
});

it('stores a post for the current user', function () {
    Mail::fake();
    $user = User::factory()->create();

    $this->actingAs($user)
        ->postJson('/api/posts', ['title' => 'Hello Laravel', 'slug' => 'hello', 'body' => 'x'])
        ->assertCreated();

    expect($user->posts()->count())->toBe(1);
    $this->assertDatabaseHas('posts', ['slug' => 'hello', 'user_id' => $user->id]);
});`,
          try: R`لو المشروع عامل بـ PHPUnit: [[composer remove phpunit/phpunit]] و [[composer require pestphp/pest pestphp/pest-plugin-laravel --dev -W]] و [[./vendor/bin/pest --init]]. فعّل [[RefreshDatabase]] في [[tests/Pest.php]]. اكتب الـ 3 tests دول على الـ API بتاعتك، وشغّل [[php artisan test]]. بعدين بوّظ الكود (شيل [[published()]] من الـ route) وشوف أنهي test بيقع وبيقول إيه.`,
          flag: "script",
          deep: {
            why: "الـ feature tests بتختبر اللي المستخدم فعلًا بيعمله: طلب ورد. test واحد زي ده بيغطي routing و validation و policy و query و resource مرة واحدة، وبيخليك تعدّل وتعمل refactor وانت مطمن. وشركات كتير بتسأل في الانترفيو «بتكتب tests؟ وريني».",
            how: R`[[tests/Pest.php]] فيه [[pest()->extend(Tests\TestCase::class)->use(Illuminate\Foundation\Testing\RefreshDatabase::class)->in('Feature');]]، فكل ملف في [[tests/Feature]] بيورث TestCase ويعمل refresh. سطر الـ [[use(RefreshDatabase)]] بيبقى متعلّق عليه في المشروع الجديد: شيل التعليق.

الطلبات: [[get]] و [[post]] و [[put]] و [[delete]]، و [[getJson]] و [[postJson]] بيحطوا [[Accept: application/json]]. [[actingAs($user)]] بيعمل login من غير فورم. والـ asserts: [[assertOk]] و [[assertCreated]] (201) و [[assertForbidden]] و [[assertUnprocessable]] (422) و [[assertRedirect]] و [[assertSee]] (HTML) و [[assertJsonPath('data.0.title', 'x')]] و [[assertDatabaseHas]] و [[assertDatabaseMissing]].

الـ fakes: [[Mail::fake()]] ثم [[Mail::assertQueued(PostPublished::class)]]، و [[Queue::fake()]] و [[Queue::assertPushed]]، و [[Storage::fake('public')]] مع [[UploadedFile::fake()->image('a.jpg')]]، و [[Http::fake([...])]] لأي API برّه.

Pest زيادة: [[beforeEach]]، و datasets ([[->with([...])]]) لنفس الـ test بقيم كتير، و [[arch()]] tests ([[arch()->expect('App\Models')->toExtend(Model::class)]])، و [[--coverage]]. و Pest 5 (النسخة الحالية) محتاج PHP 8.4 أو أحدث، يعني أعلى من Laravel 13 نفسه (8.3)؛ على PHP 8.3 composer هيختار Pest 4.`,
            when: "test لكل endpoint مهم: الحالة الناجحة، و validation، و «يوزر تاني مينفعش». وقبل ما تصلّح bug اكتب test بيقع بسببه الأول. وفي CI على كل PR («تاب GitHub Actions»).",
            mistakes: R`tests من غير [[RefreshDatabase]] فبيعتمدوا على بعض وبيقعوا بترتيب مختلف. وتختبر على قاعدة التطوير (راجع [[DB_DATABASE]] في [[phpunit.xml]]). و [[post]] بدل [[postJson]] على route في [[web.php]] فيرجعلك 302 بدل 422 (routes الـ [[api/*]] في مشروع 13 جديد بترجّع JSON في الحالتين). وتنسى [[Mail::fake()]] فالـ tests تبعت إيميلات حقيقية لو [[MAIL_MAILER]] مش log. وتختبر التفاصيل الداخلية (الـ method اتنادت) بدل النتيجة (الصف اتكتب، الرد صح).`
          },
          teach: R`## الأول: الملف ده بيعمل إيه؟

٣ tests، كل واحد بيجهّز بيانات، ويبعت طلب HTTP للـ API **من غير سيرفر** (Laravel بيبعته جوه نفس العملية)، ويتأكد من الرد ومن القاعدة. لو أي حاجة اتكسرت في الـ routes أو الـ validation أو الـ query، test منهم يقع ويقولك فين.

كل اللي تحت اتشغّل على Laravel 13.35.0 و PHP 8.4.26 (container لينكس) بـ Pest 5.3.0 فوق PHPUnit 13.3.6، والـ API هي اللي عملناها في الدروس اللي فاتت ([[GET /api/posts]] بالـ PostResource و [[POST /api/posts]] بالـ StorePostRequest).

---

## ٠. التسطيب (الـ try)

~~~bash
composer remove phpunit/phpunit --dev
composer require pestphp/pest pestphp/pest-plugin-laravel --dev -W
./vendor/bin/pest --init
~~~

~~~text الناتج (composer require)
Using version ^5.3 for pestphp/pest
Using version ^5.0 for pestphp/pest-plugin-laravel
  - Locking pestphp/pest (v5.3.0)
  - Locking phpunit/phpunit (13.3.6)
~~~

- [[--dev]] = مكتبة للتطوير بس (مش هتتسطب على السيرفر مع [[--no-dev]]).
- [[-W]] (with all dependencies) = اسمح لـ Composer يغيّر نسخ مكتبات تانية عشان التوافق، لأن Pest بيحتاج نسخة PHPUnit معينة.
- Pest 5 محتاج PHP 8.4 أو أحدث. (في أول محاولة كنا عاملين [[composer config platform.php 8.4.0]]، و Pest 5 محتاج [[symfony/process]] اللي عايز PHP 8.4.1 أو أحدث، فـ Composer نزل Pest 4.7.8 من غير ما يقول. لما خليناها 8.4.26 زي الحقيقة نزل 5.3.)
- [[pest --init]] بيعمل [[tests/Pest.php]].

وفي [[tests/Pest.php]] السطر ده بييجي متعلّق عليه، شيلنا الـ [[//]]:

~~~php
pest()->extend(TestCase::class)
    ->use(RefreshDatabase::class)
    ->in('Feature');
~~~

- [[extend(TestCase::class)]]: كل test في [[tests/Feature]] بيورث [[Tests\TestCase]]، فبيبقى معاه [[$this->getJson]] و [[actingAs]] وغيرهم.
- [[use(RefreshDatabase::class)]]: قبل كل test القاعدة ترجع نضيفة.
- و [[phpunit.xml]] فيه [[DB_DATABASE=:memory:]]: SQLite في الذاكرة، فالـ tests مبتلمسش قاعدة التطوير.

---

## ١. أول test: البوستات المنشورة بس

~~~php
it('lists only published posts', function () {
    Post::factory()->count(2)->create(['published_at' => now()->subDay()]);
    Post::factory()->draft()->create();
~~~

- [[it('وصف', function () {...})]] = test. الوصف بيتقري «it lists only published posts».
- بوستين منشورين امبارح أكيد ([[now()->subDay()]]). ليه مش الـ factory لوحده؟ لأنه بيطلّع ٢٠٪ مسودات عشوائي، فالـ test كان هيقع مرة كل كام مرة من غير سبب.
- ومسودة واحدة بـ state [[draft()]].

~~~php
    $this->getJson('/api/posts')
        ->assertOk()
        ->assertJsonCount(2, 'data')
        ->assertJsonPath('meta.total', 2);
});
~~~

| السطر | بيتأكد من إيه |
|---|---|
| [[getJson('/api/posts')]] | طلب GET ومعاه [[Accept: application/json]] |
| [[assertOk()]] | الـ status = 200 |
| [[assertJsonCount(2, 'data')]] | المصفوفة [[data]] فيها عنصرين |
| [[assertJsonPath('meta.total', 2)]] | [[meta]] ← [[total]] = 2 (النقطة = جوه) |

## ٢. test الـ validation

~~~php
it('validates the title', function () {
    $this->actingAs(User::factory()->create())
        ->postJson('/api/posts', ['title' => 'ab'])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['title', 'slug', 'body']);
});
~~~

- [[actingAs($user)]] login من غير فورم (الـ StorePostRequest بيرفض الضيف بـ 403).
- [[postJson(url, [...])]] POST بـ JSON.
- [[assertUnprocessable()]] = 422.
- [[assertJsonValidationErrors([...])]] الـ [[errors]] فيها مفاتيح للـ ٣ حقول دول: title (حرفين بس)، و slug و body (مش موجودين).

## ٣. test الإنشاء

~~~php
it('stores a post for the current user', function () {
    Mail::fake();
    $user = User::factory()->create();

    $this->actingAs($user)
        ->postJson('/api/posts', ['title' => 'Hello Laravel', 'slug' => 'hello', 'body' => 'x'])
        ->assertCreated();

    expect($user->posts()->count())->toBe(1);
    $this->assertDatabaseHas('posts', ['slug' => 'hello', 'user_id' => $user->id]);
});
~~~

- [[Mail::fake()]] أي إيميل بيتسجّل في الذاكرة بدل ما يتبعت، وتقدر تسأل عليه بعدين بـ [[Mail::assertQueued]].
- [[assertCreated()]] = 201.
- [[expect(x)->toBe(1)]] أسلوب Pest: «اتوقع x يبقى 1» بـ [[===]].
- [[assertDatabaseHas('posts', [...])]] فيه صف في [[posts]] بالقيم دي. يعني اتربط باليوزر فعلًا.

---

## ٤. [[php artisan test]]: أول مرة

الـ [[store]] كان لسه بيرجّع [[$request->validated()]] (من درس Form Request):

~~~text الناتج
   FAIL  Tests\Feature\PostApiTest
  ✓ it lists only published posts
  ✓ it validates the title
  ⨯ it stores a post for the current user
   FAILED  Tests\Feature\PostApiTest > it stores a post for the current user
  Expected response status code [201] but received 200.
~~~

ده الغلط اللي في الـ sol بالظبط. فطبّقنا الـ solCode:

~~~php
public function store(StorePostRequest $request)
{
    $post = $request->user()->posts()->create($request->validated());

    return (new PostResource($post))->response()->setStatusCode(201);
}
~~~

[[$request->user()->posts()->create(...)]] بيحط [[user_id]] لوحده، و [[->response()->setStatusCode(201)]] بيحوّل الـ resource لـ response بالـ status ده.

~~~text الناتج
   PASS  Tests\Feature\PostApiTest
  ✓ it lists only published posts                                        6.28s
  ✓ it validates the title                                               0.39s
  ✓ it stores a post for the current user                                0.26s
  Tests:    3 passed (11 assertions)
~~~

١١ assertion: ٣ في الأول، و ٢ في التاني (الـ status والأخطاء)، والباقي في التالت. وأول test أبطأ لأنه بيعمل الـ migrations مرة.

## ٥. بوّظ الكود (الـ try)

شلنا [[->published()]] من route الـ [[/api/posts]]:

~~~text الناتج
  ⨯ it lists only published posts
   FAILED  Tests\Feature\PostApiTest > it lists only published posts
  Failed to assert that the response count matched the expected 2
Failed asserting that actual size 3 matches expected size 2.
  at tests/Feature/PostApiTest.php:13
  ➜  13▕         ->assertJsonCount(2, 'data')
~~~

٣ بدل ٢: المسودة ظهرت. والسهم [[➜]] على السطر اللي وقع.

---

## الخلاصة

| الحاجة | Pest / Laravel |
|---|---|
| test | [[it('...', function () {...})]] |
| قاعدة نضيفة | [[->use(RefreshDatabase::class)]] في [[tests/Pest.php]] |
| login | [[$this->actingAs($user)]] |
| طلب JSON | [[getJson]] و [[postJson]] |
| الـ status | [[assertOk]] 200، [[assertCreated]] 201، [[assertForbidden]] 403، [[assertUnprocessable]] 422 |
| الـ JSON | [[assertJsonCount]] و [[assertJsonPath]] و [[assertJsonValidationErrors]] |
| القاعدة | [[assertDatabaseHas]] |
| تشغيل | [[php artisan test]] و [[--filter=اسم]] |`,
          lines: [
            "بداية الملف.",
            "الموديل.",
            "اليوزر.",
            "الإيميلات.",
            "أول test.",
            R`2 بوست منشورين أكيد (الـ factory لوحده بيطلّع draft أحيانًا، فالـ test كان هيقع بالصدفة).`,
            "و draft.",
            "اطلب الـ API كـ JSON.",
            "200.",
            R`[[data]] فيها 2 بس.`,
            R`و [[meta.total]] = 2.`,
            "قفلة.",
            "test الـ validation.",
            "يوزر عامل login.",
            "ابعت عنوان قصير ومن غير الباقي.",
            "422.",
            "والأخطاء على الـ 3 حقول دول.",
            "قفلة.",
            "test الإنشاء.",
            "أي إيميل مش هيتبعت فعلًا، وهيتسجّل عشان تتأكد منه.",
            "يوزر.",
            "كـ اليوزر ده...",
            "...ابعت بيانات صح.",
            "201.",
            "البوست اتربط باليوزر.",
            "والصف في القاعدة بالقيم دي.",
            "قفلة."
          ],
          sol: R`[[php artisan test]] بيطبع حاجة زي: [[PASS  Tests\Feature\PostApiTest]] وتحتها [[✓ it lists only published posts]] و [[✓ it validates the title]] و [[✓ it stores a post for the current user]]، وفي الآخر [[Tests: 3 passed (11 assertions)]].

بعد ما تشيل [[published()]]: أول test بيقع بـ «Failed to assert that the response count matched the expected 2» و [[Failed asserting that actual size 3 matches expected size 2.]] ومعاه اسم الـ test والسطر. ده بالظبط اللي عايزه: الـ test بيقولك إيه اتكسر مش بس إن حاجة اتكسرت.

لازم الـ store يرجّع 201: [[PostResource]] مع [[->response()->setStatusCode(201)]]، أو إرجاع موديل اتعمل حالًا ([[wasRecentlyCreated]]) بيرجّع 201 لوحده. والغلط الشائع: [[assertCreated]] يقع بـ 200 لأنك رجّعت [[$request->validated()]] بدل البوست.`,
          solCode: R`// tests/Pest.php
pest()->extend(Tests\TestCase::class)
    ->use(Illuminate\Foundation\Testing\RefreshDatabase::class)
    ->in('Feature');

// PostController@store
public function store(StorePostRequest $request)
{
    $post = $request->user()->posts()->create($request->validated());

    return (new PostResource($post))->response()->setStatusCode(201);
}`
        },
        {
          cmd: "Larastan و Pint",
          title: "خلّي الكود يتفحص ويتنسّق لوحده قبل ما يوصل الـ PR (PHPStan و Pint)",
          desc: R`PHPStan بيقرا الكود من غير ما يشغّله ويلاقي bugs: method مش موجودة، أو null ممكن يوصل لمكان مش متوقعه، أو نوع غلط. زي [[tsc]] بالظبط بس لـ PHP. و Larastan إضافة بتفهّمه سحر Laravel (الـ facades، والعلاقات، و [[$post->user]]).

Pint بيظبط التنسيق (مسافات، ترتيب الـ imports، الأقواس) على ستايل Laravel، وموجود في المشروع الجديد من الأول. [[./vendor/bin/pint]] يصلّح، و [[--test]] يفحص بس.

الاتنين بيتحطوا في CI فأي PR فيه خطأ نوع أو تنسيق غلط بيقع قبل المراجعة.`,
          example: R`composer require --dev larastan/larastan
cat > phpstan.neon <<'EOF'
includes:
    - vendor/larastan/larastan/extension.neon
parameters:
    paths:
        - app/
    level: 5
EOF
./vendor/bin/phpstan analyse --memory-limit=1G
./vendor/bin/pint --test
./vendor/bin/pint --dirty`,
          try: R`سطّب Larastan وشغّله على level 5. بعدين حط bug متعمد في controller: [[$post->titel]] (غلط إملائي)، و [[Post::find($id)->title]]. شغّله تاني واقرا الرسايل. ارفع لـ level 8 وشوف عدد الأخطاء اتغيّر إزاي. وبعدين بوّظ المسافات في ملف وشغّل [[pint --test]] ثم [[pint]].`,
          deep: {
            why: "PHP لغة dynamic، فأغلب الأخطاء بتظهر وقت التشغيل عند مستخدم. PHPStan بيطلّعها وقت الكتابة. و Pint بيشيل أي نقاش عن التنسيق من الـ code review. والاتنين بقوا متوقعين في أي فريق Laravel جاد، وسؤال «بتستخدم static analysis؟» بيتسأل.",
            how: R`الـ levels من 0 لـ 10: 0 أساسيات (classes و functions موجودة)، و 5 أنواع الباراميترات، و 6 الـ return types الناقصة، و 8 null safety (بيشتكي من [[Post::find($id)->title]] لأن find ممكن ترجّع null)، و 9 و 10 صارمين على mixed. ابدأ بمستوى يطلّع أخطاء قليلة، وصلّحها، وارفع.

مشروع قديم فيه مئات الأخطاء: [[phpstan analyse --generate-baseline]] بيحفظ الأخطاء الموجودة في [[phpstan-baseline.neon]] ويتجاهلها، فأي خطأ جديد بس هو اللي يوقع الـ CI.

Larastan بيقرا الـ migrations عشان يعرف أعمدة كل موديل، فـ [[$post->titel]] بتطلع «Access to an undefined property». والـ return types على العلاقات ([[: HasMany]]) و generics في الـ docblocks ([[@return HasMany<Comment, $this>]]) بتساعده أكتر.

Pint: [[pint.json]] لو عايز preset تاني ([[psr12]] أو [[per]]) أو تقفل rules. و [[--dirty]] على الملفات المتغيرة في git بس (أسرع قبل commit). وفي CI: [[pint --test]] بيطلع exit code 1 لو فيه ملف محتاج تنسيق.

في GitHub Actions: job فيه [[composer install]] ثم [[vendor/bin/pint --test]] ثم [[vendor/bin/phpstan analyse]] ثم [[php artisan test]].`,
            when: "من أول يوم في المشروع، وفي CI على كل PR. في مشروع قديم: baseline الأول، وبعدين ارفع المستوى تدريجيًا.",
            mistakes: R`تشغّل PHPStan من غير Larastan على مشروع Laravel فيطلعلك مئات الأخطاء الوهمية عن الـ facades وتقفله. وتحط [[@phpstan-ignore]] على كل خطأ بدل ما تصلّحه. وتعمل [[pint]] على المشروع كله في نفس الـ PR اللي فيه feature، فالـ diff يبقى آلاف السطور ومحدش يعرف يراجع: اعمله PR لوحده. و level 9 من أول يوم على مشروع قديم فالفريق يكرهه.`
          },
          teach: R`## الأول: الأوامر دي بتعمل إيه؟

أداتين: PHPStan بيقرا الكود من غير ما يشغّله ويدوّر على أخطاء (property مش موجودة، null ممكن يوصل، نوع غلط)، و Larastan إضافة بتعرّفه على Laravel. و Pint بيظبط شكل الكود (مسافات وأقواس). المثال بيسطّب Larastan، ويكتب ملف إعداداته، ويشغّل الاتنين.

كل اللي تحت اتشغّل على مشروع Laravel 13.35.0 و PHP 8.4.26 (container لينكس): Larastan 3.13.0 و PHPStan 2.3.0 و Pint 1.32.1.

---

## ١. [[composer require --dev larastan/larastan]]

~~~text الناتج
  - Locking larastan/larastan (v3.13.0)
  - Locking phpstan/phpstan (2.3.0)
Using version ^3.13 for larastan/larastan
~~~

[[--dev]] أداة تطوير بس، و PHPStan نفسه بييجي معاه كـ dependency. أما Pint فموجود من الأول في المشروع الجديد ([[vendor/bin/pint]]).

## ٢. [[phpstan.neon]] بـ heredoc

~~~bash
cat > phpstan.neon <<'EOF'
includes:
    - vendor/larastan/larastan/extension.neon
parameters:
    paths:
        - app/
    level: 5
EOF
~~~

- [[cat > ملف <<'EOF' ... EOF]] اسمها heredoc: كل السطور لحد [[EOF]] بتتكتب في الملف. و [['EOF']] بين علامات تنصيص = متبدّلش أي [[$]] جوه.
- [[.neon]] صيغة شبه YAML: المسافات في أول السطر بتحدد مين جوه مين، و [[- ]] عنصر في قايمة.
- [[includes]]: حمّل إعدادات Larastan. من غيرها PHPStan مش فاهم [[$post->title]] ولا الـ facades.
- [[paths: - app/]]: افحص فولدر [[app]] بس.
- [[level: 5]] درجة الصرامة من 0 لـ 10.

## ٣. [[./vendor/bin/phpstan analyse --memory-limit=1G]]

[[analyse]] الأمر، و [[--memory-limit=1G]] لأن الافتراضي (128M في CLI غالبًا) مبيكفيش مشروع Laravel.

### الـ try: bugs متعمدة

controller فيه:

~~~php
$a = $post->titel;
$b = Post::find($id)->title;
~~~

~~~text الناتج (level 5)
 ------ -----------------------------------------------------------------------
  Line   BugController.php
 ------ -----------------------------------------------------------------------
  11     Access to an undefined property App\Models\Post::$titel.
         🪪  property.notFound
 ------ -----------------------------------------------------------------------

 [ERROR] Found 1 error
~~~

- [[titel]] اتمسك: Larastan قرا الـ migrations وعارف أعمدة [[posts]].
- [[🪪 property.notFound]] اسم القاعدة (تستخدمه لو عايز تتجاهل حاجة معينة).
- الـ exit code = 1، فأي CI هيقع.

و [[Post::find($id)->title]] متمسكتش على 5. على 8:

~~~text الناتج (--level=8 --error-format=raw)
BugController.php:9:Method App\Http\Controllers\BugController::show() has no return type specified.
BugController.php:11:Access to an undefined property App\Models\Post::$titel.
BugController.php:12:Cannot access property $title on App\Models\Post|null.
~~~

[[Post|null]] = النوع «Post أو null»: [[find]] بترجّع null لو مش موجود، و [[->title]] على null = crash وقت التشغيل. الحل [[findOrFail]] أو route model binding. وسطر ٩: من level 6 PHPStan عايز return type لكل method.

### عدد الأخطاء على المشروع كله

| الـ level | الأخطاء |
|---|---|
| 5 | 11 |
| 6 | 31 |
| 8 | 38 |
| 9 | 38 |

القفزة الكبيرة في 6 (return types ناقصة). ومن الـ ١١ على level 5: [[Access to an undefined property App\Http\Resources\PostResource::$id]] وأخواتها. ليه؟ جوه الـ resource [[$this->id]] بيروح للموديل بـ magic method، و PHPStan مش عارف أنهي موديل. الحل docblock فوق الكلاس: [[/** @mixin \App\Models\Post */]].

لو مفيش [[phpstan.neon]]:

~~~text الناتج
At least one path must be specified to analyse.
~~~

## ٤. [[./vendor/bin/pint --test]]

بوّظنا سطرين:

~~~php
return $a . $b ;
$x=[1,2];
~~~

~~~text الناتج (pint --test -v)
    FAIL   ............................................. 1 file, 1 style issue
  ⨯ app/Http/Controllers/BugController.php no_singleline_whitespace_before_sem…
  -        return $a.$b  ;
  -        $x=[1,2];
  +        return $a.$b;
  +        $x = [1, 2];
~~~

- [[--test]] = افحص بس متعدّلش، والـ exit code = 1 لو فيه حاجة (اتأكدنا: [[pint --test exit=1]]).
- [[-v]] بيوري الـ diff: [[-]] السطر قبل و [[+]] بعد.
- لاحظ إن ستايل Laravel بيكتب [[$a.$b]] من غير مسافات حوالين النقطة، و [[$x = [1, 2]]] بمسافات.

ومن غير [[--test]]:

~~~text الناتج
    FIXED   ...................................... 1 file, 1 style issue fixed
~~~

## ٥. [[./vendor/bin/pint --dirty]]

الملفات اللي اتغيرت في git بس. في فولدر مش git repo:

~~~text الناتج
  The [--dirty] option is only available when using Git.
~~~

---

## الخلاصة

| الأمر | بيعمل إيه | الـ exit code |
|---|---|---|
| [[composer require --dev larastan/larastan]] | PHPStan + فهم Laravel | |
| [[phpstan analyse --memory-limit=1G]] | يدوّر على bugs بالـ level اللي في [[phpstan.neon]] | 1 لو فيه أخطاء |
| [[--level=8]] | أصرم مرة واحدة (null safety) | |
| [[pint --test]] | يفحص التنسيق | 1 لو فيه ملف محتاج تظبيط |
| [[pint]] | يظبط | |
| [[pint --dirty]] | الملفات المتغيرة في git بس | |

ابدأ بـ level يطلّع أخطاء قليلة، وصلّحها، وارفع واحد واحد. والـ exit code 1 هو اللي بيخلي الـ CI يوقف الـ PR.`,
          lines: [
            "سطّب Larastan (ومعاه PHPStan) للتطوير بس.",
            "اكتب ملف الإعدادات.",
            "حمّل إضافة Larastan.",
            "المسار ده.",
            "الإعدادات.",
            "الفولدرات اللي تتفحص.",
            "فولدر app.",
            "المستوى.",
            "نهاية الملف.",
            "افحص (المشاريع الكبيرة محتاجة ذاكرة أكتر من الافتراضي).",
            "افحص التنسيق من غير تعديل (للـ CI).",
            "نسّق الملفات المتغيرة في git بس."
          ],
          sol: R`على level 5، [[$post->titel]] بيطلع: [[Access to an undefined property App\Models\Post::$titel.]] ومعاه رقم السطر، والـ exit code 1. أما [[Post::find($id)->title]] مش هيظهر غير من level 8: [[Cannot access property $title on App\Models\Post|null.]] والحل [[findOrFail]] أو route model binding.

على level 8 عدد الأخطاء غالبًا بيزيد كتير (return types ناقصة و null). ده طبيعي، ومتصلّحهمش كلهم مرة واحدة.

[[pint --test]] بيطبع [[FAIL]] واسم الملف ونوع المشكلة (مثلًا [[binary_operator_spaces]])، و [[pint]] بعدها بيصلّح ويطبع [[FIXED]]. والغلط الشائع: تشغّل phpstan من غير [[phpstan.neon]] فيقولك «At least one path must be specified».`
        },
        {
          cmd: "Laravel على VPS",
          title: "انشر Laravel على سيرفرك: Nginx و php-fpm والـ cache والـ worker",
          desc: R`على VPS (راجع «تاب VPS» للسيرفر نفسه و ufw و certbot، و «تاب Nginx» للـ server blocks): بتسطّب PHP-FPM بنفس النسخة اللي بتطوّر عليها، ومعاه extensions Laravel (mbstring و xml و curl و zip و bcmath و intl و mysql أو pgsql و sqlite3)، و Composer.

أهم نقطة: [[root]] في Nginx بيشاور على [[public/]] مش على فولدر المشروع، وكل طلب مش ملف موجود بيروح لـ [[index.php]]. وPHP بيتكلم مع Nginx عن طريق socket الـ FPM.

خطوات كل deploy: [[composer install --no-dev -o]]، و [[php artisan migrate --force]]، و [[php artisan optimize]] (بيعمل cache للـ config والـ routes والـ views والـ events)، و [[storage:link]] أول مرة، و [[queue:restart]]، و reload لـ FPM.`,
          example: R`sudo add-apt-repository -y ppa:ondrej/php
sudo apt install -y php8.4-fpm php8.4-{mbstring,xml,curl,zip,bcmath,intl,mysql,sqlite3} unzip
cd /var/www/shop && git pull --ff-only
composer install --no-dev --optimize-autoloader --no-interaction
php artisan migrate --force
php artisan storage:link
php artisan optimize
php artisan queue:restart
sudo chown -R www-data:www-data storage bootstrap/cache
sudo systemctl reload php8.4-fpm
curl -fsS https://shop.example.com/up`,
          try: R`على VPS تجربة (أو container Ubuntu): انشر مشروعك بالخطوات دي. اكتب server block لـ Nginx بـ [[root /var/www/shop/public;]] و [[try_files $uri $uri/ /index.php?$query_string;]] و [[fastcgi_pass unix:/run/php/php8.4-fpm.sock;]]. اعمل unit systemd للـ worker، وسطر cron للـ scheduler. وبعدين جرّب تفتح [[https://shop.example.com/.env]] و [[/../.env]] و [[/storage/logs/laravel.log]].`,
          deep: {
            why: "أغلب شغل Laravel في مصر بيتنشر على VPS أو استضافة، مش على منصة managed. ونشر غلط بيطلّع أسرار ([[.env]] على رابط)، أو كود قديم شغال بسبب cache أو worker ماتعملوش restart، أو صفحة 500 من غير لوج بسبب صلاحيات.",
            how: R`Nginx (من docs Laravel 13 باختصار): [[server_name shop.example.com; root /var/www/shop/public; index index.php;]] و [[location / { try_files $uri $uri/ /index.php?$query_string; }]] و [[location ~ ^/index\.php(/|$) { fastcgi_pass unix:/run/php/php8.4-fpm.sock; fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name; include fastcgi_params; }]] و [[location ~ /\.(?!well-known).* { deny all; }]]. الـ PHP الوحيد اللي بيتنفّذ هو [[index.php]]، فلو حد رفع [[shell.php]] في [[public/storage]] مش هيشتغل. وبعدها certbot و headers الأمان من «تاب Nginx».

[[.env]] على السيرفر: [[APP_ENV=production]] و [[APP_DEBUG=false]] (وإلا أي خطأ بيطلّع stack trace فيه أسرار) و [[APP_URL]] الصح و [[DB_*]] و [[QUEUE_CONNECTION=database]] أو redis. وصلاحياته [[chmod 640]].

الصلاحيات: [[storage]] و [[bootstrap/cache]] لازم يتكتب فيهم من [[www-data]] (يوزر FPM)، وباقي الكود ملك يوزر الـ deploy ومش مسموح لـ FPM يكتب فيه.

الـ worker بـ systemd (زي درس [[/etc/systemd/system/myapp.service]] في «تاب VPS»): [[ExecStart=/usr/bin/php /var/www/shop/artisan queue:work --sleep=3 --tries=3 --max-time=3600]] و [[User=www-data]] و [[Restart=always]]. و [[--max-time]] بيخلي الـ worker يقفل نفسه كل ساعة و systemd يقومه، ضد تسريب الذاكرة. أو Supervisor بنفس الفكرة لو ده الموجود.

الـ scheduler: [[* * * * * cd /var/www/shop && php artisan schedule:run >> /dev/null 2>&1]] في crontab بتاع [[www-data]].

[[optimize]] بيخلي [[.env]] مبيتقراش؛ أي تعديل فيه محتاج [[optimize]] تاني. و [[optimize:clear]] لو حاجة غريبة بتحصل.

zero-downtime: الطريقة الأنضف فولدر لكل release ([[releases/2026...]]) و symlink [[current]] بيتنقل بعد ما كل حاجة تخلص، و [[storage]] و [[.env]] مشتركين. Deployer أو Envoy بيعملوها.`,
            when: "أول نشر، وكل deploy بعده (حطهم في script واحد أو GitHub Actions). ولو مش عايز تدير سيرفر: Laravel Cloud أو Forge (Forge بيدير VPS بتاعك بنفس الخطوات دي).",
            mistakes: R`[[root]] بيشاور على فولدر المشروع فـ [[/.env]] يفتح. و [[APP_DEBUG=true]] في الإنتاج. و [[chmod -R 777 storage]] بدل الـ owner الصح. ونسيان [[queue:restart]] فالـ worker شغال بكود أسبوع فات. ونسيان cron الـ scheduler. و [[composer install]] من غير [[--no-dev]] فأدوات التطوير على السيرفر. ونسخة PHP على السيرفر أقدم من اللي في [[composer.lock]] فـ composer يرفض. وتشغّل [[artisan]] كـ root فالملفات اللي بتتعمل في [[storage]] تبقى ملك root و FPM ميقدرش يكتب: خطأ 500 «Permission denied» في اللوج.`
          },
          teach: R`## الأول: الأوامر دي بتعمل إيه؟

دي خطوات النشر بالترتيب: تسطّب PHP-FPM مرة، وبعدين في كل deploy: تسحب الكود، وتسطّب المكتبات، وتطبّق الـ migrations، وتعمل cache، وتقول للـ workers يقوموا من جديد، وتظبط الصلاحيات، وتتأكد إن الموقع قام.

اتجرّبت في container [[ubuntu:24.04]] كأنه VPS: نفس الأوامر بالظبط من غير [[sudo]] (الـ container شغال root)، والكود اتنسخ بـ [[rsync]] بدل [[git pull]]، وبدل [[systemctl]] (مفيش systemd في container) شغّلنا [[php-fpm8.4 -D]] و [[nginx]] بإيدينا. جزء systemd و cron من docs Laravel 13 و Ubuntu.

---

## ١. [[sudo add-apt-repository -y ppa:ondrej/php]]

جرّبنا الأول من غيره:

~~~text الناتج (apt-cache policy على Ubuntu 24.04 و 26.04)
24.04:  php8.3-fpm  Candidate: 8.3.6-0ubuntu0.24.04.11
26.04:  php8.5-fpm  Candidate: 8.5.4-0ubuntu1.3
~~~

يعني [[php8.4-fpm]] **مش موجود** في Ubuntu لوحده. عشان كده السطر ده: PPA (Personal Package Archive) = مستودع packages إضافي، وده بتاع Ondřej Surý اللي بيبني كل نسخ PHP لـ Ubuntu. و [[-y]] = متسألنيش.

## ٢. [[sudo apt install -y php8.4-fpm php8.4-{mbstring,xml,...} unzip]]

- [[php8.4-fpm]] = FPM (FastCGI Process Manager): عملية بتشغّل PHP وتستنى طلبات من Nginx.
- [[php8.4-{mbstring,xml,curl}]]: الأقواس دي **brace expansion** في bash، بتتفرد لـ [[php8.4-mbstring php8.4-xml php8.4-curl]] قبل ما apt يشوفها.
- [[unzip]] عشان Composer يفك المكتبات أسرع.

~~~text الناتج
PHP 8.4.26 (cli) (built: Sep 24 2026 17:15:37) (NTS)
~~~

## ٣. [[cd /var/www/shop && git pull --ff-only]]

[[&&]] = نفّذ التاني لو الأول نجح. و [[--ff-only]] = حدّث بس لو الفرع ماشي لقدام عادي؛ لو فيه تعارض اقف بدل ما تعمل merge commit على السيرفر.

## ٤. [[composer install --no-dev --optimize-autoloader --no-interaction]]

~~~text الناتج
Installing dependencies from lock file
Package operations: 77 installs, 0 updates, 0 removals
Generating optimized autoload files
~~~

| الـ flag | معناه |
|---|---|
| [[install]] | النسخ اللي في [[composer.lock]] بالظبط (مش [[update]]) |
| [[--no-dev]] | من غير Pest و Larastan و Pint (٧٧ package بس) |
| [[--optimize-autoloader]] | classmap جاهز بدل ما يدوّر على الملفات |
| [[--no-interaction]] | متسألش (السكربت مفيهوش حد يرد) |

## ٥. [[php artisan migrate --force]]

في [[APP_ENV=production]]، [[migrate]] بيسأل «متأكد؟». [[--force]] = متسألش. هنا الناتج كان [[Nothing to migrate.]] لأن القاعدة اتنسخت جاهزة.

## ٦. [[php artisan storage:link]]

~~~text الناتج (أول مرة ثم تاني مرة)
   INFO  The [public/storage] link has been connected to [storage/app/public].
   ERROR  The [public/storage] link already exists.
~~~

التانية [[ERROR]] بس مش مشكلة (السكربت كمّل). عشان كده بيتعمل أول مرة بس.

## ٧. [[php artisan optimize]]

~~~text الناتج
   INFO  Caching framework bootstrap, configuration, and metadata.

  config ........................................................ 16.43ms DONE
  events ......................................................... 1.60ms DONE
  routes ........................................................ 17.16ms DONE
  views ......................................................... 50.01ms DONE
~~~

٤ caches في أمر واحد. ومن ساعتها [[.env]] مبيتقراش (درس laravel new).

## ٨. [[php artisan queue:restart]]

~~~text الناتج
   INFO  Broadcasting queue restart signal.
~~~

مبيقفلش حاجة بنفسه: بيكتب علامة في الـ cache، وكل worker بيشوفها بعد ما يخلّص الـ job اللي في إيده فيقفل نفسه، و systemd يقوّمه بالكود الجديد.

## ٩. [[sudo chown -R www-data:www-data storage bootstrap/cache]]

[[chown]] = غيّر المالك، و [[-R]] لكل اللي جوه، و [[www-data:www-data]] = اليوزر:الجروب اللي FPM شغال بيه. (في التجربة ضفنا [[database]] كمان لأن القاعدة SQLite.)

جرّبنا العكس: رجّعنا [[storage]] ملك root ومسحنا الـ views المترجمة:

~~~text الناتج
GET /blog  →  500
ls storage/logs/  →  (فاضي)
~~~

500 ومفيش لوج خالص، لأن FPM مش قادر يكتب لا الـ view ولا اللوج. ده الـ «500 بيضا» اللي في الـ sol.

## ١٠. [[sudo systemctl reload php8.4-fpm]]

[[reload]] مش [[restart]]: FPM بيقوّم workers جديدة والقديمة تخلّص طلباتها الأول، فمفيش طلب بيقع. وده كمان بيفضّي OPcache. (systemctl من الـ docs، مفيش systemd في الـ container.)

## ١١. [[curl -fsS https://shop.example.com/up]]

[[-f]] = لو الـ status 400 أو أكتر اعتبره فشل (exit code غير صفر)، و [[-s]] ساكت، و [[-S]] بس اطبع الخطأ لو حصل. فالسكربت يقف لو الموقع مقامش.

~~~text الناتج
curl -f ok
~~~

---

## ١٢. الـ solCode: Nginx

~~~nginx
root /var/www/shop/public;
~~~

أهم سطر: الويب بيشوف [[public/]] بس.

~~~nginx
location / {
    try_files $uri $uri/ /index.php?$query_string;
}
~~~

جرّب الملف زي ما هو ([[$uri]])، أو فولدر ([[$uri/]])، وإلا ابعته لـ [[index.php]] ومعاه الـ query string.

~~~nginx
location ~ ^/index\.php(/|$) {
    fastcgi_pass unix:/run/php/php8.4-fpm.sock;
    fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
    include fastcgi_params;
    fastcgi_hide_header X-Powered-By;
}
~~~

- [[~]] = regex، و [[^/index\.php(/|$)]] = [[index.php]] بس، مش أي [[.php]]. فلو حد رفع [[shell.php]] مش هيتنفّذ.
- [[fastcgi_pass unix:...sock]] ابعت لـ FPM على socket file.
- [[$realpath_root]] المسار الحقيقي بعد الـ symlinks (مهم مع zero-downtime).
- [[fastcgi_hide_header X-Powered-By]]: مفيش [[X-Powered-By: PHP/8.4.26]] في الرد. اتأكدنا: الـ headers فيها [[Server: nginx/1.24.0 (Ubuntu)]] بس.

~~~nginx
location ~ /\.(?!well-known).* {
    deny all;
}
~~~

أي مسار فيه [[/.]] (ملف مخفي) = 403، إلا [[.well-known]] (certbot محتاجه). و [[(?!...)]] اسمها negative lookahead: «مش متبوع بـ».

و [[nginx -t]] قبل ما تشغّل:

~~~text الناتج
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
~~~

### الـ try: اختبار الأمان

~~~text الناتج (curl -H "Host: shop.example.com")
/up                          200
/.env                        403
/../.env                     400
/storage/logs/laravel.log    404
/index.php/../.env           403
/composer.json               404
~~~

| الطلب | ليه |
|---|---|
| [[/.env]] 403 | [[deny all]] للملفات اللي بتبدأ بنقطة، وهو أصلًا برّه [[public]] |
| [[/../.env]] 400 | بعتناه زي ما هو بـ [[--path-as-is]]: Nginx رفض مسار طالع برّه الـ root. من غير الـ flag، curl بيحوّله [[/.env]] = 403 |
| [[/storage/logs/laravel.log]] 404 | [[public/storage]] بيشاور على [[storage/app/public]] بس |
| [[/composer.json]] 404 | مش في [[public]]، فراح لـ Laravel ومفيش route |

و [[php artisan about]] على «السيرفر»:

~~~text الناتج
  Debug Mode ............................................................. OFF
  Config .............................................................. CACHED
  Events .............................................................. CACHED
  Routes .............................................................. CACHED
  Views ............................................................... CACHED
~~~

## ١٣. الـ solCode: الـ worker والـ scheduler (من الـ docs)

- [[[Service] User=www-data]] نفس يوزر FPM، و [[Restart=always]] أي خروج يتقام تاني (وده اللي بيخلي [[queue:restart]] و [[--max-time=3600]] يشتغلوا).
- [[[Install] WantedBy=multi-user.target]] يقوم مع السيرفر بعد [[systemctl enable --now shop-worker]].
- الـ cron: [[* * * * *]] كل دقيقة، و [[>> /dev/null 2>&1]] ارمي الناتج والأخطاء (الـ scheduler بيكتب في لوج Laravel).

---

## الخلاصة

| الخطوة | الأمر |
|---|---|
| PHP 8.4 على Ubuntu | [[add-apt-repository ppa:ondrej/php]] ثم [[apt install php8.4-fpm ...]] |
| الكود | [[git pull --ff-only]] |
| المكتبات | [[composer install --no-dev -o]] |
| القاعدة | [[migrate --force]] |
| الملفات العامة | [[storage:link]] (مرة) |
| السرعة | [[optimize]] |
| الـ workers | [[queue:restart]] |
| الصلاحيات | [[chown -R www-data:www-data storage bootstrap/cache]] |
| الكود الجديد في FPM | [[systemctl reload php8.4-fpm]] |
| اتأكد | [[curl -fsS .../up]] |

والـ [[root]] في Nginx = [[public/]]، وده لوحده بيقفل [[.env]] والكود كله.`,
          lines: [
            R`Ubuntu 24.04 فيه PHP 8.3 بس و 26.04 فيه 8.5، فـ 8.4 من الـ PPA بتاع Ondřej Surý (المصدر المعتاد لنسخ PHP على Ubuntu).`,
            "PHP-FPM والـ extensions اللي Laravel محتاجها (غيّر mysql لـ pgsql لو Postgres).",
            "اسحب آخر كود (من غير merge commits).",
            "المكتبات من غير أدوات التطوير، و autoloader سريع.",
            "طبّق الـ migrations من غير سؤال التأكيد.",
            "symlink للملفات العامة (أول مرة بس، والمرات الجاية بيقولك موجود).",
            "cache للـ config والـ routes والـ views والـ events.",
            "قول للـ workers يقفلوا بعد الـ job الحالي، و systemd يقومهم بالكود الجديد.",
            "FPM يقدر يكتب في دول بس.",
            "امسح OPcache وخلّي FPM يقرا الكود الجديد.",
            R`اتأكد إن التطبيق قام (200 من [[/up]]، و [[-f]] بيخلي curl يفشل لو 500).`
          ],
          sol: R`لو كله صح: [[curl /up]] بيرجّع 200، و [[systemctl status shop-worker]] بيقول [[active (running)]]، و [[php artisan about]] على السيرفر فيه [[Environment ... production]] و [[Debug Mode ... OFF]] و [[Config ... CACHED]] و [[Routes ... CACHED]] و [[Views ... CACHED]].

[[/.env]] بيرجّع 403 (بسبب [[deny all]] للملفات اللي بتبدأ بنقطة) أو 404، ومش بيرجّع محتوى الملف أبدًا لأنه برّه [[public]] أصلًا. [[/../.env]]: المتصفح و curl بيطبّعوه لـ [[/.env]] قبل ما يبعتوه فنفس الـ 403، ولو اتبعت زي ما هو ([[curl --path-as-is]]) Nginx بيرد 400 Bad Request لأن المسار طالع برّه الـ root. و [[/storage/logs/laravel.log]] 404 لأن الـ symlink بيشاور على [[storage/app/public]] بس.

الـ unit:

[[[Unit] Description=shop queue worker After=network.target]] ثم [[[Service] User=www-data Restart=always ExecStart=/usr/bin/php /var/www/shop/artisan queue:work --sleep=3 --tries=3 --max-time=3600]] ثم [[[Install] WantedBy=multi-user.target]]، وبعدين [[daemon-reload]] و [[enable --now]].

الغلط الشائع: صفحة 500 بيضا ومفيش لوج في [[storage/logs]]: غالبًا FPM مش قادر يكتب هناك؛ بص في لوج Nginx و [[journalctl -u php8.4-fpm]].`,
          solCode: R`# /etc/nginx/sites-available/shop
server {
    listen 80;
    server_name shop.example.com;
    root /var/www/shop/public;
    index index.php;
    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ ^/index\.php(/|$) {
        fastcgi_pass unix:/run/php/php8.4-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_hide_header X-Powered-By;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}

# /etc/systemd/system/shop-worker.service
[Unit]
Description=shop queue worker
After=network.target

[Service]
User=www-data
Restart=always
ExecStart=/usr/bin/php /var/www/shop/artisan queue:work --sleep=3 --tries=3 --max-time=3600

[Install]
WantedBy=multi-user.target

# crontab -u www-data -e
* * * * * cd /var/www/shop && php artisan schedule:run >> /dev/null 2>&1`
        }
      ]
    }
]);
