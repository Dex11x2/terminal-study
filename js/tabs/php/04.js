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

خريطة الفولدرات: [[app/]] فيه كودك ([[Models]] و [[Http/Controllers]])، و [[routes/web.php]] الصفحات، و [[routes/console.php]] أوامر الترمنال والـ scheduler، و [[database/]] فيه migrations و factories و seeders، و [[resources/views]] ملفات Blade، و [[config/]] الإعدادات، و [[storage/]] اللوجات والكاش والملفات المرفوعة، و [[bootstrap/app.php]] فيه الـ middleware والـ routing والـ exceptions. و [[public/]] هو الفولدر الوحيد اللي المفروض يبقى على الويب، وفيه [[index.php]] بس (نفس فكرة front controller في «Composer وتنظيم المشروع»).`,
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
          sol: R`الأرقام: البوستات 10 + 15 = 25، والتعليقات 10 × 2 = 20 (لو اليوزرز العشوائيين من غير تعليقات). و [[Post::published()->count()]] = 7 من بوستات اليوزر الثابت + حوالي 80% من الـ 15 (بتختلف كل مرة لأن [[optional(0.8)]] عشوائي).

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

        Post::factory(7)->for($me)->has(Comment::factory(2))->create();
        Post::factory(3)->draft()->for($me)->has(Comment::factory(2))->create();

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

ولو بعت من غير [[Accept]] على [[/api/...]] هتاخد برضه 422 JSON، لأن [[bootstrap/app.php]] في مشروع Laravel 13 الجديد فيه [[shouldRenderJsonWhen]] لأي [[api/*]]. نفس الطلب على route في [[web.php]] بيرجّع 302 redirect للصفحة اللي قبلها.

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

الـ pagination: [[paginate(15)]] بيعمل query للعدد الكلي كمان ([[COUNT(*)]]) عشان [[meta.total]] و [[last_page]]. [[simplePaginate]] من غير العدد (أسرع، بس «التالي» و«السابق» بس). [[cursorPaginate]] بيستخدم [[WHERE id < آخر_id]] بدل OFFSET، فبيفضل سريع في الصفحة 10000 ومبيكررش صفوف لو فيه بيانات بتتضاف، بس مفيش «روح لصفحة 7». وده الأنسب للـ infinite scroll.

[[?page=2]] بيتقرا لوحده، و [[->withQueryString()]] بيحافظ على باقي الـ query (فلتر، بحث) في لينكات الصفحات.

الرد بيتلف في [[data]] افتراضيًا. و [[->additional(['meta' => ...])]] لحقول زيادة، و [[->response()->setStatusCode(201)]] للـ store. وفي Laravel 13 فيه كمان JSON:API resources لو محتاج المواصفة دي بالظبط.`,
            when: "أي endpoint بيرجّع موديل. [[paginate]] للوحات الأدمن (محتاج أرقام صفحات)، و [[cursorPaginate]] للـ feeds والموبايل.",
            mistakes: R`[[return Post::all()]] في API: كل الأعمدة وكل الصفوف. و [[new UserResource($this->user)]] من غير [[whenLoaded]] فكل بوست يعمل query (N+1 مستخبي في الـ resource). و [[paginate(request('per_page'))]] من غير حد أقصى فحد يطلب مليون. و [[paginate]] على جدول فيه ملايين الصفوف والـ COUNT بيبقى أبطأ من الـ query نفسها.`
          },
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

من غير [[with('user')]] المفتاح [[author]] بيختفي خالص من كل عنصر (مش null). [[simplePaginate]]: [[meta]] من غير [[total]] و [[last_page]]. [[cursorPaginate]]: [[meta]] فيها [[next_cursor]] و [[prev_cursor]]، واللينك [[?cursor=eyJ...]] بدل [[?page=2]].

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
})->weeklyOn(5, '09:00')->timezone('Africa/Cairo')->onOneServer();`,
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
            "الجمعة 9 الصبح بتوقيت القاهرة، وعلى سيرفر واحد."
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
          example: R`sudo apt install -y php8.4-fpm php8.4-{mbstring,xml,curl,zip,bcmath,intl,mysql,sqlite3} unzip
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
          lines: [
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

[[/.env]] بيرجّع 403 (بسبب [[deny all]] للملفات اللي بتبدأ بنقطة) أو 404، ومش بيرجّع محتوى الملف أبدًا لأنه برّه [[public]] أصلًا. [[/../.env]] Nginx بيطبّعه لـ [[/.env]] فنفس النتيجة. و [[/storage/logs/laravel.log]] 404 لأن الـ symlink بيشاور على [[storage/app/public]] بس.

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
