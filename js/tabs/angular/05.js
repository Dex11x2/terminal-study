// تكملة تاب angular: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/angular/01.js (شرح حقول الدرس في أوله)
MORE("angular", [
    {
      t: "الـ routing",
      l: 2,
      n: "صفحات بـ provideRouter، وتحميل lazy، و params كـ inputs، و guards و resolvers كـ functions",
      items: [
        {
          cmd: "provideRouter و routerLink",
          title: "تعمل صفحات وتتنقل بينها من غير reload",
          desc: R`الراوتر جزء من Angular نفسه ([[@angular/router]]). بتعرّف الصفحات في array اسمها [[routes]]: كل route فيه [[path]] و [[component]]، وبتسجّلها بـ [[provideRouter(routes)]] في [[app.config.ts]].

في الـ template: [[<router-outlet />]] المكان اللي الصفحة بتترسم فيه، و [[routerLink="/products"]] لينك بيتنقل من غير reload، و [[routerLinkActive="active"]] بيحط class على اللينك الحالي. ومن الكود: [[inject(Router).navigate(['/products'])]].

ده زي React Router في «تاب React»، بس جاي مع الـ framework.`,
          example: R`export const routes: Routes = [
  { path: '', component: Home, title: 'الرئيسية' },
  { path: 'products', component: ProductList, title: 'المنتجات' },
  { path: 'products/:id', component: ProductDetails },
  { path: 'old-shop', redirectTo: 'products' },
  { path: '**', component: NotFound },
];
// app.config.ts
providers: [provideRouter(routes, withComponentInputBinding())]
// app.html
<nav>
  <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">الرئيسية</a>
  <a routerLink="/products" routerLinkActive="active">المنتجات</a>
</nav>
<router-outlet />`,
          try: R`اعمل ٣ components ([[Home]] و [[ProductList]] و [[NotFound]]) وحط الـ routes دي. اتنقل بين اللينكات وشوف عنوان التاب في المتصفح. افتح [[/old-shop]] و [[/xyz]]. وبعدين بدّل ترتيب [[**]] وخليه أول route وشوف إيه اللي حصل.`,
          flag: "script",
          deep: {
            why: "تطبيق فيه صفحات كتير محتاج URL لكل صفحة: المستخدم يعمل refresh أو bookmark أو يبعت لينك ويرجع لنفس المكان، وزرار back يشتغل. الراوتر بيربط الـ URL بالـ component من غير ما الصفحة تعمل reload كامل، فالتطبيق يفضل سريع والـ state محفوظ.",
            how: R`الراوتر بيقرا الـ URL ويدوّر في [[routes]] بالترتيب، وأول واحد يطابق بيكسب. عشان كده [[**]] (أي حاجة) لازم يبقى آخر واحد. [[:id]] جزء متغير. و [[redirectTo]] بيحوّل، ومع path فاضي لازم [[pathMatch: 'full']] وإلا كل URL هيطابقه.

[[routerLink]] بيعمل [[<a href>]] حقيقي (فـ ctrl+click يفتح tab جديد) بس بيمنع الـ reload ويستخدم History API ([[pushState]]، فيه درس في «تاب JavaScript»). [[title]] بيغيّر عنوان التاب.

[[routerLinkActive]] بيطابق بالبداية: [[/]] يطابق كل حاجة، عشان كده [[exact: true]] على لينك الرئيسية.

والـ SPA محتاجة السيرفر يرجّع [[index.html]] لأي مسار، وإلا refresh على [[/products]] يطلع 404. [[ng serve]] بيعمل ده، وفي الإنتاج بتظبطه في Nginx (المستوى ٣).`,
            when: "أي تطبيق فيه أكتر من شاشة. ومع كل route جديد فكّر: هل محتاج lazy loading (الدرس الجاي)؟ غالبًا أيوه لأي حاجة مش الصفحة الرئيسية.",
            mistakes: R`[[<a href="/products">]] بدل [[routerLink]]: شغال بس بيعمل reload كامل وبيضيّع الـ state. و [[**]] في الأول فكل الصفحات تبقى NotFound. وتنسى [[RouterLink]] و [[RouterOutlet]] في imports الـ component. و [[{ path: '', redirectTo: 'home' }]] من غير [[pathMatch: 'full']]: خطأ NG04014 أو loop.`
          },
          teach: R`## الفكرة: جدول «URL ده يعرض component ده»، ومكان في الصفحة يتعرض فيه

المثال ٣ ملفات: [[app.routes.ts]] (الجدول)، و [[app.config.ts]] (تسجيل الراوتر)، و [[app.html]] (اللينكات والمكان). اتعمل بالظبط في مشروع Angular 22.2 بأربع components صغيرة ([[Home]] و [[ProductList]] و [[ProductDetails]] و [[NotFound]])، واتفحص في Chrome.

---

## ١. الجدول: [[routes]]

~~~text app.routes.ts
export const routes: Routes = [
  { path: '', component: Home, title: 'الرئيسية' },
  { path: 'products', component: ProductList, title: 'المنتجات' },
  { path: 'products/:id', component: ProductDetails },
  { path: 'old-shop', redirectTo: 'products' },
  { path: '**', component: NotFound },
];
~~~

[[Routes]] نوع من [[@angular/router]]: array من objects، كل واحد route.

| المفتاح | معناه |
|---|---|
| [[path: '']] | المسار الفاضي = [[/]]، الصفحة الرئيسية. ومن غير [[/]] في الأول |
| [[component: Home]] | الـ component اللي يترسم |
| [[title: 'الرئيسية']] | عنوان تاب المتصفح |
| [[path: 'products/:id']] | [[:]] قبل اسم = جزء متغير. [[/products/5]] و [[/products/abc]] الاتنين بيطابقوا، والقيمة اسمها [[id]] |
| [[redirectTo: 'products']] | متعرضش حاجة، حوّل لمسار تاني |
| [[path: '**']] | أي حاجة. لازم آخر واحد |

---

## ٢. التسجيل: [[provideRouter]]

~~~text app.config.ts
providers: [provideRouter(routes, withComponentInputBinding())]
~~~

- [[providers]] في [[app.config.ts]] هي الخدمات اللي التطبيق كله بيستخدمها، و [[provideRouter(routes)]] بتضيف الراوتر بالجدول بتاعنا.
- [[withComponentInputBinding()]] ميزة إضافية: [[:id]] توصل للصفحة كـ input اسمه [[id]] (درس route params). وبيها [[ProductDetails]] عندنا عرضت «منتج 5».

---

## ٣. اللينكات والمكان: [[app.html]]

~~~text app.html
<nav>
  <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">الرئيسية</a>
  <a routerLink="/products" routerLinkActive="active">المنتجات</a>
</nav>
<router-outlet />
~~~

| الحتة | معناها |
|---|---|
| [[routerLink="/products"]] | لينك بيتنقل جوه التطبيق من غير reload |
| [[routerLinkActive="active"]] | حط class [[active]] على اللينك لما الـ URL يطابقه |
| [[[routerLinkActiveOptions]="{ exact: true }"]] | طابق الـ URL كله بالظبط، مش بدايته |
| [[<router-outlet />]] | هنا الصفحة الحالية بتترسم |

والـ component اللي فيه الـ template ده لازم يعمل import لـ [[RouterLink]] و [[RouterLinkActive]] و [[RouterOutlet]].

---

## ٤. الناتج في Chrome

~~~text الناتج
open /         | url: /           | title: الرئيسية | h2: الرئيسية
  <a href="/" class="active">الرئيسية</a> <a href="/products">المنتجات</a>
click المنتجات | url: /products   | title: المنتجات | h2: المنتجات
  <a href="/" class="">الرئيسية</a> <a href="/products" class="active">المنتجات</a>
/products/5    | url: /products/5 | h2: منتج 5
  <a href="/">الرئيسية</a> <a href="/products" class="active">المنتجات</a>
/old-shop      | url: /products   | title: المنتجات | h2: المنتجات
/xyz           | url: /xyz        | h2: الصفحة مش موجودة
~~~

(اختصرنا الـ attributes من اللينكات.)

- [[routerLink]] حط [[href]] حقيقي، فـ ctrl+click بيفتح تاب جديد عادي.
- في [[/products/5]] لينك المنتجات لسه [[active]]: [[routerLinkActive]] بيطابق بالبداية، و [[/products/5]] بادئة بـ [[/products]].
- ولينك الرئيسية مش active في [[/products]] بسبب [[exact: true]]. من غيرها كان هيبقى active في كل الصفحات لأن كل URL بيبدأ بـ [[/]].
- [[/old-shop]] الـ URL نفسه اتغير لـ [[/products]].
- [[/xyz]] مطابقش أي حاجة غير [[**]].

### مفيش reload فعلًا؟

عدّينا طلبات الـ document (الصفحة الكاملة) اللي المتصفح عملها:

~~~text الناتج
docs after first load: 1
after click products: docs = 1
after click home: docs = 1
~~~

طلب واحد بس في الأول، والضغطات مطلبتش صفحة جديدة: الراوتر غيّر الـ URL بـ History API ورسم الـ component.

---

## ٥. [[**]] في الأول

نقلنا [[{ path: '**', component: NotFound }]] لأول الجدول:

~~~text الناتج
docs after first load: 2 | h2: الصفحة مش موجودة
after click products: docs = 2 | h2: الصفحة مش موجودة
/products h2: الصفحة مش موجودة
~~~

كل حاجة بقت NotFound: الراوتر بيمشي على الجدول بالترتيب وبيقف عند **أول** route يطابق، و [[**]] بيطابق أي حاجة.

---

## ٦. [[redirectTo]] من غير [[pathMatch]]

زوّدنا [[{ path: '', redirectTo: 'home' }]]. الـ build عدّى، والصفحة طلعت فاضية وفي الـ console:

~~~text الـ Console
ERROR RuntimeError: NG04014: Invalid configuration of route '{path: "", redirectTo: "home"}': please provide 'pathMatch'. The default value of 'pathMatch' is 'prefix', but often the intent is to use 'full'.
~~~

[[path: '']] بالـ prefix بيطابق بداية أي URL (كل URL بيبدأ بـ «لا حاجة»)، فالراوتر بيرفضه. الصح: [[{ path: '', redirectTo: 'home', pathMatch: 'full' }]].

---

## الخلاصة

| الحاجة | الشكل |
|---|---|
| صفحة | [[{ path: 'products', component: ProductList, title: '...' }]] |
| جزء متغير | [[products/:id]] |
| تحويل | [[redirectTo]]، ومع [[path: '']] لازم [[pathMatch: 'full']] |
| 404 | [[{ path: '**', component: NotFound }]] آخر واحد |
| تسجيل | [[provideRouter(routes)]] في [[app.config.ts]] |
| لينك | [[routerLink="/x"]]، و [[routerLinkActive]] للـ class |
| مكان الصفحة | [[<router-outlet />]] |`,
          lines: [
            R`array الصفحات، نوعها [[Routes]].`,
            R`المسار الفاضي = الصفحة الرئيسية، و [[title]] عنوان التاب.`,
            "صفحة المنتجات.",
            R`[[:id]] جزء متغير: [[/products/5]] و [[/products/abc]].`,
            "مسار قديم بيتحوّل للجديد.",
            "أي حاجة تانية: صفحة 404. لازم آخر واحد.",
            "قفلة.",
            R`بتسجّل الراوتر، و [[withComponentInputBinding]] بتخلي الـ params توصل كـ inputs (بعد درسين).`,
            "القايمة.",
            R`لينك الرئيسية: [[exact]] عشان متبقاش active في كل الصفحات.`,
            R`لينك المنتجات، بياخد class [[active]] لما تكون فيها أو في [[/products/5]].`,
            "قفلة.",
            "هنا الصفحة الحالية بتترسم."
          ],
          sol: R`اللينكات بتتنقل من غير ما الصفحة تعمل reload (مفيش وميض، والـ Network مفيهوش طلب index.html جديد)، وعنوان التاب بيبقى «الرئيسية» أو «المنتجات». [[/old-shop]] بيتحوّل لـ [[/products]] والـ URL نفسه بيتغير. [[/xyz]] بيعرض NotFound.

لما تحط [[**]] أول واحد: كل الصفحات بقت NotFound، حتى الرئيسية، لأن الراوتر بيقف عند أول تطابق. رجّعه آخر واحد.`
        },
        {
          cmd: "lazy routes",
          title: "تحمّل الصفحة وقت ما المستخدم يروحلها بـ loadComponent و loadChildren",
          desc: R`بدل [[component: About]]، اكتب [[loadComponent: () => import('./about/about').then(m => m.About)]]: الصفحة بتتقسم في ملف JS لوحدها، ومش بتتحمّل غير لما حد يفتحها.

ولقسم كامل (لوحة أدمن فيها ١٠ صفحات): [[loadChildren: () => import('./admin/admin.routes').then(m => m.adminRoutes)]]، والملف ده فيه [[Routes]] تانية.

ولو الـ component عامل [[export default]]، تقدر تختصر [[loadComponent: () => import('./about/about')]].`,
          example: R`export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', loadComponent: () => import('./about/about').then((m) => m.About) },
  { path: 'cart', loadComponent: () => import('./cart/cart-page') },
  {
    path: 'admin',
    canMatch: [adminMatch],
    loadChildren: () => import('./admin/admin.routes').then((m) => m.adminRoutes),
  },
];
// admin/admin.routes.ts
export const adminRoutes: Routes = [
  { path: '', component: Dashboard },
  { path: 'orders', loadComponent: () => import('./orders/orders').then((m) => m.Orders) },
];`,
          try: R`حوّل صفحتين من routes الدرس اللي فات لـ lazy. اعمل [[ng build]] وقارن جدول «Initial chunk files» و «Lazy chunk files» قبل وبعد. وفي [[ng serve]] افتح Network (فلتر JS) واتنقل للصفحة: إمتى الـ chunk بيتحمّل؟`,
          flag: "script",
          deep: {
            why: R`كل صفحة بتضيفها بتكبّر الـ bundle الأساسي، والمستخدم اللي فاتح الرئيسية بيحمّل كود لوحة الأدمن اللي عمره ما هيفتحها. في تطبيق enterprise فيه ٥٠ شاشة، الفرق بين أول تحميل ٢ ميجا و ٣٠٠ كيلو. والـ lazy loading كمان بيعزل الأقسام: فريق الأدمن يشتغل في [[admin/]] من غير ما يلمس الباقي.`,
            how: R`[[import()]] دي dynamic import من JS نفسها ([[dynamic import()]] في «تاب JavaScript»). الـ bundler (esbuild) بيشوفها ويعمل chunk منفصل لكل واحدة. الراوتر بيناديها أول ما route يطابق، ويستنى الـ Promise، وبعدين يرسم.

[[loadChildren]] بيحمّل array routes كاملة، ودي بتتدمج تحت [[admin/]]. وممكن تحط [[providers]] على الـ route نفسه، فتتعمل injector خاص بالقسم ده (سؤال DI في الانترفيو).

الراوتر ممكن يحمّل بدري: [[withPreloading(PreloadAllModules)]] في [[provideRouter]] بيحمّل كل الـ lazy routes في الخلفية بعد ما التطبيق يفتح.

[[canMatch]] (درس الـ guards) بيتفحص قبل التحميل، فلو المستخدم مش أدمن، كود الأدمن مش بيتحمّل أصلًا. [[canActivate]] بيتفحص بعد التحميل.

وفيه migration جاهز: [[ng g @angular/core:route-lazy-loading]] بيحوّل الـ routes الـ eager لـ lazy.`,
            when: "كل route ما عدا الرئيسية والصفحات اللي الكل بيفتحها في أول ثانية. وأي قسم كبير (أدمن، إعدادات، تقارير) بـ loadChildren.",
            mistakes: R`تعمل lazy route وفي نفس الوقت تستورد الـ component عادي في ملف تاني (زي [[import { About }]] في app.ts عشان تستخدمه في حتة): الـ bundler بيضمّه في الأساسي والـ lazy بقى ملوش لازمة. وتكتب [[import('./about/about.ts')]] بالامتداد. وتستخدم [[canActivate]] بدل [[canMatch]] للحماية من تحميل الكود: canActivate بيمنع الدخول بس الكود اتحمّل.`
          },
          teach: R`## الفكرة: بدل «الصفحة دي هي About»، «لما حد يروح هنا، روح هات About»

الفرق كله في كلمة: [[component:]] بتشاور على كلاس موجود في الـ bundle، و [[loadComponent:]] بتشاور على **دالة** بتجيب الملف وقت الحاجة. اتعمل المثال بالظبط في Angular 22.2 بـ components صغيرة، واتقارن [[ng build]] قبل وبعد، واتفحص التحميل في Chrome مع [[ng serve --no-hmr]].

---

## ١. [[loadComponent]] مع [[then]]

~~~text app.routes.ts
{ path: 'about', loadComponent: () => import('./about/about').then((m) => m.About) },
~~~

من جوه لبرة:

| الحتة | معناها |
|---|---|
| [[import('./about/about')]] | dynamic import: بيحمّل الملف وقت ما يتنادى، وبيرجّع Promise. والمسار من غير [[.ts]] |
| [[.then((m) => m.About)]] | لما يخلص: [[m]] هو الـ module كله (كل اللي متصدّر من الملف)، وإحنا عايزين [[About]] منه |
| [[() => ...]] | الكل جوه دالة، فمش بيتنفّذ دلوقتي. الراوتر بيناديها لما حد يروح [[/about]] |

---

## ٢. [[loadComponent]] من غير [[then]]

~~~text app.routes.ts
{ path: 'cart', loadComponent: () => import('./cart/cart-page') },
~~~

الملف عامل [[export default class CartPage]]. الراوتر لو لقى [[default]] في الـ module بياخده لوحده، فمش محتاج [[then]].

---

## ٣. [[loadChildren]]: قسم كامل

~~~text app.routes.ts
{
  path: 'admin',
  canMatch: [adminMatch],
  loadChildren: () => import('./admin/admin.routes').then((m) => m.adminRoutes),
},
~~~

~~~text admin/admin.routes.ts
export const adminRoutes: Routes = [
  { path: '', component: Dashboard },
  { path: 'orders', loadComponent: () => import('./orders/orders').then((m) => m.Orders) },
];
~~~

- [[loadChildren]] بيجيب **جدول routes** مش component، وبيحطه تحت [[admin/]]: فـ [['']] جواه = [[/admin]]، و [['orders']] = [[/admin/orders]].
- [[Dashboard]] eager جوه الملف ده، يعني بيتحمّل مع [[admin.routes]] نفسه. و [[Orders]] lazy جوه القسم اللي هو lazy أصلًا.
- [[canMatch: [adminMatch]]]: دالة بتتفحص **قبل** التحميل. في الـ lab خليناها [[() => localStorage.getItem('role') === 'admin']].

---

## ٤. [[ng build]] قبل وبعد

### قبل (كله [[component:]] و [[children:]])

~~~text الناتج
Initial chunk files | Names         |  Raw size | Estimated transfer size
chunk-6KI7XEV4.js   | -             | 120.45 kB |                36.09 kB
main-EBVUINZP.js    | main          | 100.67 kB |                25.20 kB

                    | Initial total | 221.12 kB |                61.28 kB

Lazy chunk files    | Names         |  Raw size | Estimated transfer size
chunk-2VYZOAAB.js   | orders        | 330 bytes |               330 bytes
~~~

### بعد (المثال)

~~~text الناتج
Initial chunk files | Names         |  Raw size | Estimated transfer size
main-SVMZ62GD.js    | main          | 221.29 kB |                59.66 kB

                    | Initial total | 221.29 kB |                59.66 kB

Lazy chunk files    | Names         |  Raw size | Estimated transfer size
chunk-DbOaGoMp.js   | admin-routes  | 415 bytes |               415 bytes
chunk-g7F6wEtf.js   | about         | 364 bytes |               364 bytes
chunk-Cjmumw5H.js   | cart-page     | 296 bytes |               296 bytes
chunk-uuhEpRIE.js   | orders        | 296 bytes |               296 bytes
~~~

- كل [[import()]] بقى ملف في Lazy chunk files، واسمه من اسم الملف.
- الـ Initial total تقريبًا هو هو: الصفحات هنا سطر HTML واحد (أقل من نص كيلو)، فاللي اتنقل صغير. في مشروع حقيقي الصفحة فيها مئات السطور ومكتبات، والفرق بيبقى كبير.

---

## ٥. في Chrome: إمتى بيتحمّل؟

~~~text الناتج (Chrome، ng serve --no-hmr)
+876ms home loaded
  +900ms request chunk-YBJ2MGC5.js            ← دوسنا «عن المحل»
+1314ms h2: عن المحل
+2091ms about again, h2: عن المحل             ← مفيش request تاني
+2529ms /admin (no role), h2: الصفحة مش موجودة   ← ولا request
  +2869ms request chunk-LV2IRFJM.js           ← بعد role=admin
+3276ms /admin (admin), h2: لوحة الأدمن
  +3289ms request chunk-KNVPG4AF.js
+3698ms /admin/orders, h2: الطلبات
~~~

| اللي حصل | ليه |
|---|---|
| الرئيسية فتحت من غير chunk | about لسه محدش طلبها |
| الضغطة طلبت الـ chunk | الراوتر نادى الدالة |
| المرة التانية مفيش طلب | الـ module اتحمّل مرة وخلاص |
| [[/admin]] من غير role = NotFound ومفيش طلب | [[canMatch]] رجّعت false قبل التحميل، فالراوتر كمّل للـ [[**]] |
| مع role = admin | الـ chunk بتاع [[admin-routes]] اتحمّل، وبعده [[orders]] لما رحنا لها |

---

## ٦. الغلطة: import عادي في حتة تانية

زوّدنا [[import { About } from './about/about';]] في [[app.ts]] واستخدمناه في خاصية، و [[ng build]]:

~~~text الناتج
chunk-CRw_mPh2.js   | about         |  58 bytes |                58 bytes
~~~

الـ chunk لسه موجود بس 58 bytes بس: الـ component نفسه اتنقل لـ [[main]] لأنه مطلوب من البداية، والـ chunk بقى فاضي تقريبًا. الـ lazy بقى ملوش لازمة.

---

## الخلاصة

| الحاجة | الشكل |
|---|---|
| صفحة lazy | [[loadComponent: () => import('./x/x').then(m => m.X)]] |
| لو [[export default]] | [[loadComponent: () => import('./x/x')]] |
| قسم lazy | [[loadChildren: () => import('./admin/admin.routes').then(m => m.adminRoutes)]] |
| تمنع التحميل نفسه | [[canMatch]] (مش [[canActivate]]) |
| اتأكد | «Lazy chunk files» في [[ng build]]، ومفيش import عادي للصفحة في أي حتة |`,
          lines: [
            "الـ routes.",
            "الرئيسية eager: جوه الـ bundle الأساسي.",
            R`[[About]] في chunk لوحده، بيتحمّل لما حد يروح [[/about]].`,
            R`نفس الكلام، بس الملف فيه [[export default]] فمش محتاج [[then]].`,
            "قسم كامل.",
            "المسار.",
            "بيتفحص قبل ما الكود يتحمّل (درس الـ guards).",
            R`بيحمّل routes تانية وبيحطها تحت [[/admin]].`,
            "قفلة.",
            "قفلة.",
            R`ملف القسم: routes عادية بتتصدّر باسم.`,
            R`[[/admin]] نفسه.`,
            R`[[/admin/orders]]، وlazy هو كمان جوه القسم.`,
            "قفلة."
          ],
          sol: R`قبل: كل الصفحات في «Initial chunk files» ومفيش «Lazy chunk files». بعد: فيه سطر لكل صفحة بقت lazy، واسمه من اسم الملف، زي [[chunk-XXXX.js | admin-routes | 397 bytes]] (ده ناتج حقيقي من الـ lab)، والـ initial total بيقل بحجم كود الصفحات اللي اتنقلت. لو صفحاتك لسه صغيرة (سطر HTML واحد) الفرق مش هيبان: في الـ lab الـ initial فضل حوالي 221 kB قبل وبعد، لأن كل صفحة كانت أقل من نص كيلو، والراوتر زوّد كود التحميل الـ lazy.

في Network: الـ chunk مش بيتحمّل مع الصفحة الأولى، وبيتحمّل أول ما تدوس على اللينك. ولو رجعت للصفحة تاني، مش بيتحمّل تاني (الـ module اتخزن). لو لقيت الصفحة لسه في الـ initial، دوّر على import عادي ليها في أي ملف eager.`
        },
        {
          cmd: "route params",
          title: "تقرا :id و ?query من الـ URL كـ inputs",
          desc: R`مع [[withComponentInputBinding()]] في [[provideRouter]]، الراوتر بيحط params الـ URL في الـ inputs بتاعة الصفحة بنفس الاسم: [[/products/:id]] يوصل لـ [[id = input.required<string>()]]، و [[?tab=reviews]] يوصل لـ [[tab = input<string>()]]، وبيانات الـ resolver كمان.

ولأنها signals، تقدر تبني عليها [[computed]] أو [[httpResource]] وهيتحدّثوا لوحدهم لما تتنقل من [[/products/5]] لـ [[/products/6]].

الطريقة القديمة ([[inject(ActivatedRoute).paramMap]] وهو Observable) لسه شغالة، وهتلاقيها في كل مشروع قديم.`,
          example: R`@Component({
  selector: 'app-details',
  imports: [RouterLink],
  template: $__bt
    <h1>منتج رقم {{ id() }} - تاب {{ tab() ?? 'specs' }}</h1>
    <a [routerLink]="['/products', nextId()]" [queryParams]="{ tab: 'reviews' }">اللي بعده</a>
    <button (click)="back()">رجوع للقايمة</button>
  $__bt,
})
export class Details {
  id = input.required<string>();
  tab = input<string>();
  nextId = computed(() => Number(this.id()) + 1);
  private router = inject(Router);
  back() { this.router.navigate(['/products'], { queryParams: { from: this.id() } }); }
}
// الطريقة القديمة: inject(ActivatedRoute).paramMap.pipe(map(p => p.get('id')))`,
          try: R`حط الصفحة على [[products/:id]] وافتح [[/products/5?tab=specs]]. دوس «اللي بعده» كذا مرة: الـ component بيتعمل من جديد ولا نفسه بيتحدّث؟ (حط [[console.log]] في الـ constructor). وبعدين شيل [[withComponentInputBinding()]] وشوف إيه اللي بيحصل.`,
          flag: "script",
          deep: {
            why: R`صفحة التفاصيل محتاجة تعرف هي بتعرض أنهي منتج، والفلاتر والترتيب والتاب المفتوح أحسن يبقوا في الـ URL عشان الـ refresh والـ share يرجّعوا نفس الشاشة. قبل الـ input binding كان لازم تكتب [[subscribe]] على [[paramMap]] وتنسى تعمل unsubscribe. دلوقتي هي inputs عادية.`,
            how: R`الراوتر لما يتنقل لنفس الـ route بـ params مختلفة ([[/products/5]] لـ [[/products/6]]) بيعيد استخدام نفس الـ component instance افتراضيًا ومبيعملوش من جديد. عشان كده لازم تتعامل مع الـ id كقيمة بتتغير (signal أو Observable)، مش تقراه مرة في الـ constructor وخلاص.

الـ params دايمًا strings، فـ [[Number(this.id())]] لو محتاج رقم. أو [[input.required({ transform: numberAttribute })]].

الأولوية لو نفس الاسم موجود في أكتر من مصدر: بيانات الـ resolver، وبعدين الـ path params، وبعدين الـ query params (الراوتر بيدمج query وبعدين path وبعدين data، فاللي بيتدمج آخر، الـ resolver، هو اللي بيكسب. والأحسن متكررش الاسم).

[[navigate(['/products', 6])]] بياخد array أجزاء. و [[navigateByUrl('/products/6?x=1')]] بياخد string كامل. و [[queryParamsHandling: 'merge']] بيحافظ على الـ query params الموجودة.`,
            when: "أي صفحة تفاصيل، وأي فلتر أو sort أو pagination أو tab عايز المستخدم يقدر يشاركه أو يرجعله بالـ back.",
            mistakes: R`تقرا [[this.route.snapshot.paramMap.get('id')]] مرة في [[ngOnInit]]: لما تتنقل من منتج لمنتج من نفس الصفحة، الـ component نفسه بيفضل والـ id القديم بيفضل. وتنسى إن الـ id string فتعمل [[id() + 1]] فتطلع [["51"]]. وتنسى [[withComponentInputBinding()]] فالـ inputs تفضل undefined، والـ required منهم يطلع NG0950 وقت التشغيل.`
          },
          teach: R`## الفكرة: الـ URL بقى مصدر inputs للصفحة

في [[/products/5?tab=specs]] فيه حتتين بيانات: [[5]] (path param، مكانه [[:id]] في الـ route) و [[tab=specs]] (query param، بعد [[?]]). مع [[withComponentInputBinding()]] الراوتر بيحطهم في inputs بنفس الاسم. المثال اتشغّل على [[{ path: 'products/:id', ... }]] في Angular 22.2، وزوّدنا [[console.log]] في الـ constructor زي التجربة، واتفحص في Chrome.

---

## ١. الـ template

~~~text details.ts
<h1>منتج رقم {{ id() }} - تاب {{ tab() ?? 'specs' }}</h1>
<a [routerLink]="['/products', nextId()]" [queryParams]="{ tab: 'reviews' }">اللي بعده</a>
<button (click)="back()">رجوع للقايمة</button>
~~~

| الحتة | معناها |
|---|---|
| [[tab() ?? 'specs']] | لو مفيش [[?tab=]] في الـ URL، [[tab()]] بـ [[undefined]]، فاكتب specs |
| [[[routerLink]="['/products', nextId()]"]] | لينك من array أجزاء: [[/products]] و [[6]] بيتلزقوا [[/products/6]] |
| [[[queryParams]="{ tab: 'reviews' }"]] | زوّد [[?tab=reviews]] |

---

## ٢. الكلاس

~~~text details.ts
id = input.required<string>();
tab = input<string>();
nextId = computed(() => Number(this.id()) + 1);
private router = inject(Router);
back() { this.router.navigate(['/products'], { queryParams: { from: this.id() } }); }
~~~

| السطر | معناه |
|---|---|
| [[id = input.required<string>()]] | من [[:id]]. إجباري لأن الـ route مش هيطابق من غيره. ونوعه string دايمًا: الـ URL نص |
| [[tab = input<string>()]] | من [[?tab=]]، اختياري |
| [[Number(this.id()) + 1]] | [[Number]] بيحوّل النص لرقم. من غيره [["5" + 1]] = [["51"]] (لزق نصوص مش جمع) |
| [[inject(Router)]] | الراوتر نفسه عشان نتنقل من الكود |
| [[navigate(['/products'], { queryParams: {...} })]] | روح [[/products?from=7]] |

---

## ٣. الناتج

~~~text الناتج (Chrome)
Details constructor
open   | url: /products/5?tab=specs   | h1: منتج رقم 5 - تاب specs   | href: /products/6?tab=reviews
next 1 | url: /products/6?tab=reviews | h1: منتج رقم 6 - تاب reviews | href: /products/7?tab=reviews
next 2 | url: /products/7?tab=reviews | h1: منتج رقم 7 - تاب reviews | href: /products/8?tab=reviews
back   | url: /products?from=7        | h2: المنتجات
~~~

- [[Details constructor]] اتطبعت **مرة واحدة** مع إننا اتنقلنا مرتين. الراوتر لما بيروح لنفس الـ route بـ params مختلفة بيستخدم نفس الـ component، وبيحدّث الـ inputs بس.
- عشان كده [[nextId]] لازم [[computed]]: اتحسبت تاني لوحدها مع كل [[id]] جديد، واللينك اتغير [[6]] ثم [[7]] ثم [[8]]. لو كنت حسبتها مرة في الـ constructor، كانت هتفضل 6.
- [[back()]] وداك [[/products?from=7]].

---

## ٤. من غير [[withComponentInputBinding()]]

شلناها من [[provideRouter]] وفتحنا نفس الـ URL:

~~~text الـ Console
Details constructor
ERROR RuntimeError: NG0950: Input "id" is required but no value is available yet.
~~~

الراوتر مبقاش بيحط حاجة في الـ inputs، و [[id]] required، فأول ما الـ template قراه وقع. والصفحة فضلت فاضية.

---

## ٥. الطريقة القديمة (في التعليق)

~~~text القديم
inject(ActivatedRoute).paramMap.pipe(map(p => p.get('id')))
~~~

[[ActivatedRoute]] معلومات الـ route الحالي، و [[paramMap]] Observable بيطلّع قيمة جديدة مع كل تغيير في الـ params، و [[map]] بيطلّع منه الـ id. نفس النتيجة، بس محتاج RxJS و subscribe (تاب RxJS في المستوى ٢).

---

## الخلاصة

| الحاجة | الشكل |
|---|---|
| تشغيلها | [[provideRouter(routes, withComponentInputBinding())]] |
| [[/products/:id]] | [[id = input.required<string>()]] |
| [[?tab=x]] | [[tab = input<string>()]] |
| رقم | [[Number(this.id())]]، الـ params نصوص |
| قيمة من الـ param | [[computed]]، لأن نفس الـ component بيتعاد استخدامه |
| تنقّل من الكود | [[router.navigate(['/products', 6], { queryParams })]] |`,
          lines: [
            "الـ decorator.",
            "الـ selector.",
            R`[[RouterLink]] عشان [[[routerLink]]] و [[[queryParams]]].`,
            "بداية الـ template.",
            R`[[id]] من الـ path و [[tab]] من الـ query، ولو مفيش tab نكتب specs.`,
            R`لينك بـ array أجزاء: [[/products/6?tab=reviews]].`,
            "تنقّل من الكود.",
            "قفلة الـ template.",
            "قفلة الـ decorator.",
            "الكلاس.",
            R`من [[:id]]. دايمًا string.`,
            R`من [[?tab=]]. ممكن متبقاش موجودة.`,
            R`محسوبة من الـ id، وبتتحدّث لما الـ URL يتغير.`,
            "الراوتر نفسه.",
            R`[[navigate]] بـ array أجزاء و query params.`,
            "قفلة."
          ],
          sol: R`في [[/products/5?tab=specs]] العنوان «منتج رقم 5 - تاب specs». لما تدوس «اللي بعده» العنوان بيبقى «منتج رقم 6 - تاب reviews» والـ [[console.log]] اللي في الـ constructor مش بيتطبع تاني: نفس الـ instance، والـ inputs بس اتحدّثت. ده اتجرّب في الـ lab بـ [[RouterTestingHarness]]: [[/products/5?tab=reviews]] طلّع «id من الرابط: 5 - tab: reviews».

من غير [[withComponentInputBinding()]]: [[id]] required ومحدش بيحطه، فالصفحة بتقع بـ [[NG0950: Input "id" is required but no value is available yet]] أول ما حاجة تقراه.`
        },
        {
          cmd: "guards",
          title: "تمنع صفحة عن اللي مش مسجّل دخول بـ canActivate و canMatch",
          desc: R`الـ guard دالة بترجّع [[true]] (ادخل) أو [[false]] (لأ) أو [[UrlTree]] (روح هنا بدالها، زي صفحة login). بتتحط على الـ route:

[[canActivate]]: قبل ما تدخل الصفحة. [[canMatch]]: قبل ما الـ route يتطابق أصلًا، فلو false الراوتر يكمّل يدوّر في اللي بعده، والـ lazy code مش بيتحمّل. [[canDeactivate]]: قبل ما تخرج (فيه تعديلات مش محفوظة؟). [[canActivateChild]]: على كل الأبناء.

الشكل الحديث functions من نوع [[CanActivateFn]] وجواها [[inject()]]. القديم classes بتعمل [[implements CanActivate]].`,
          example: R`export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);
  if (auth.isLoggedIn()) return true;
  return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};
export const adminMatch: CanMatchFn = () => inject(Auth).role() === 'admin';
export const unsavedGuard: CanDeactivateFn<{ dirty(): boolean }> = (c) =>
  !c.dirty() || confirm('فيه تعديلات مش محفوظة، تخرج؟');
// في الـ routes:
{ path: 'orders', component: Orders, canActivate: [authGuard] },
{ path: 'admin', canMatch: [adminMatch], loadChildren: () => import('./admin/admin.routes').then((m) => m.adminRoutes) },
{ path: 'profile/edit', component: EditProfile, canDeactivate: [unsavedGuard] },`,
          try: R`اعمل [[Auth]] service فيها [[token = signal<string | null>(null)]] و [[isLoggedIn = computed(...)]]. حط [[authGuard]] على صفحة وافتحها: هتروح فين والـ URL شكله إيه؟ بعدين في صفحة الـ login اعمل زرار بيحط token ويرجّعك للـ [[returnUrl]].`,
          flag: "script",
          deep: {
            why: R`صفحات كتير مش لأي حد: الطلبات للمسجّلين، ولوحة الأدمن للأدمن. لو كل صفحة بتفحص في [[ngOnInit]] وتعمل redirect، الصفحة هتظهر لحظة وبعدين تتحوّل، والكود هيتكرر. الـ guard بيفحص قبل التنقل خالص. ومهم جدًا: ده UX بس، مش أمان. الأمان الحقيقي في الـ API اللي بيرفض الطلب لو مفيش صلاحية.`,
            how: R`الراوتر بيشغّل الـ guards بالترتيب قبل ما يكمّل التنقل. الـ guard ممكن يرجّع قيمة مباشرة، أو Promise، أو Observable (أول قيمة هي اللي بتتاخد)، فتقدر تسأل السيرفر.

رجوع [[UrlTree]] أحسن من [[router.navigate()]] جوه الـ guard: الراوتر بيلغي التنقل الحالي ويبدأ واحد جديد بشكل نضيف. وفيه كمان [[new RedirectCommand(urlTree, { replaceUrl: true })]] لو محتاج خيارات للتنقل الجديد.

[[state.url]] الـ URL اللي المستخدم كان رايحه، فبتحطه في [[returnUrl]] عشان بعد الـ login ترجّعه.

الـ guards بتتنادى في injection context، فـ [[inject()]] شغالة جواها. وفي الشكل القديم كانت classes عليها [[@Injectable]] وبتعمل [[implements CanActivate]] وبتاخد dependencies من الـ constructor، ولسه هتلاقيها في مشاريع كتير.`,
            when: R`[[canActivate]] للـ login والصلاحيات العادية. [[canMatch]] لما عايز الـ route يبقى «مش موجود» لغير المسموح (الـ lazy code ميتحمّلش)، أو عايز route تاني بنفس الـ path يطابق بداله (نفس [[/dashboard]] لأدمن ولمستخدم). [[canDeactivate]] للفورمات الطويلة.`,
            mistakes: R`تعتبر الـ guard حماية: أي حد يقدر يفتح DevTools ويغيّر الـ signal أو يكلّم الـ API مباشرة. الـ API لازم يفحص الـ token والصلاحية. و [[router.navigate(['/login'])]] مع [[return false]] بدل [[return router.createUrlTree(...)]]. وتنسى إن [[canActivate]] مش بيمنع تحميل الـ lazy chunk.`
          },
          teach: R`## الفكرة: دالة بيسألها الراوتر «أكمّل ولا لأ؟» قبل التنقل

المثال ٣ guards من ٣ أنواع، وتحتهم الـ routes اللي بتستخدمهم. اتشغّل كله في Angular 22.2 مع [[Auth]] service بتاعة التجربة:

~~~text guards.ts
@Service()
export class Auth {
  token = signal<string | null>(null);
  role = signal<'user' | 'admin'>('user');
  isLoggedIn = computed(() => this.token() !== null);
}
~~~

و [[LoginPage]] بتاعة الـ solCode، واتفحص في Chrome.

---

## ١. [[authGuard]]: [[CanActivateFn]]

~~~text guards.ts
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);
  if (auth.isLoggedIn()) return true;
  return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};
~~~

| السطر | معناه |
|---|---|
| [[: CanActivateFn]] | نوع الدالة: بتاخد [[route]] (الـ route اللي رايحله) و [[state]] (فيه [[state.url]] الـ URL كله) |
| [[inject(Auth)]] | [[inject]] شغالة هنا لأن الراوتر بينادي الـ guard في injection context |
| [[return true]] | كمّل التنقل |
| [[router.createUrlTree(['/login'], ...)]] | بيبني URL ([[UrlTree]]) من غير ما يتنقل. لما الـ guard يرجّعه، الراوتر بيلغي التنقل الحالي ويروح ده بداله |
| [[queryParams: { returnUrl: state.url }]] | خلي الصفحة اللي كان رايحها في الـ URL، عشان نرجّعه بعد الـ login |

والـ route:

~~~text routes
{ path: 'orders', component: Orders, canActivate: [authGuard] },
~~~

[[canActivate]] array، فينفع تحط كذا guard، ولازم كلهم يوافقوا.

### الناتج

~~~text الناتج (Chrome)
open /orders   | url: /login?returnUrl=%2Forders | h2: دخول
click دخول     | url: /orders                    | h2: طلباتي
~~~

- فتحنا [[/orders]] من غير token، فلقينا نفسنا في [[/login]]. والـ [[/]] جوه الـ query بقت [[%2F]]: الـ URL encoding، لأن [[/]] ليها معنى في الـ URL.
- صفحة الـ login (الـ solCode) استلمت [[returnUrl]] كـ input بفضل [[withComponentInputBinding]]، وعملت [[token.set('demo-token')]] و [[navigateByUrl('/orders')]]، والـ guard المرة دي رجّع [[true]].

---

## ٢. [[adminMatch]]: [[CanMatchFn]]

~~~text guards.ts
export const adminMatch: CanMatchFn = () => inject(Auth).role() === 'admin';
~~~

دالة سطر واحد بترجّع [[true]] أو [[false]]. و [[canMatch]] بيتفحص قبل ما الراوتر يعتبر الـ route مطابق أصلًا:

~~~text routes
{ path: 'admin', canMatch: [adminMatch], loadChildren: () => import('./admin/admin.routes').then((m) => m.adminRoutes) },
~~~

~~~text الناتج (Chrome، role = 'user')
/admin as user | url: /admin | h2: الصفحة مش موجودة
~~~

الـ URL فضل [[/admin]]، بس الراوتر اعتبر الـ route مش موجود وكمّل يدوّر لحد [[**]]. ومفيش chunk أدمن اتحمّل (اتأكدنا من ده في درس lazy routes).

---

## ٣. [[unsavedGuard]]: [[CanDeactivateFn]]

~~~text guards.ts
export const unsavedGuard: CanDeactivateFn<{ dirty(): boolean }> = (c) =>
  !c.dirty() || confirm('فيه تعديلات مش محفوظة، تخرج؟');
~~~

- [[CanDeactivateFn<...>]] بيتنادى وانت **خارج** من الصفحة، وأول argument هو الـ component نفسه ([[c]]).
- [[<{ dirty(): boolean }>]] النوع: أي component فيه دالة [[dirty]] بترجّع boolean.
- [[!c.dirty() || confirm(...)]]: لو مفيش تعديلات ([[!]] = not) خلاص [[true]] ومتسألش (الـ [[||]] بيقف عند أول true). وإلا اعرض [[confirm]]، والنتيجة [[true]] لو المستخدم داس OK.

جرّبناها على صفحة فيها input، و [[dirty()]] بترجّع true لما حد يكتب:

~~~text الناتج (Chrome)
leave clean | url: /             | h2: الرئيسية
[dialog] confirm فيه تعديلات مش محفوظة، تخرج؟
leave dirty (OK)     | url: /              | h2: الرئيسية
leave dirty (Cancel) | url: /profile/edit  | h2: تعديل البروفايل
~~~

من غير كتابة خرجنا على طول. بعد الكتابة ظهر الـ confirm: OK خرّجنا، و Cancel خلّانا في الصفحة.

---

## ٤. ده UX مش أمان

الـ guard كود في المتصفح. أي حد يقدر يفتح DevTools ويغيّر الـ signal، أو يكلّم الـ API مباشرة من غير ما يفتح الصفحة أصلًا. الـ guard بيمنع المستخدم العادي يشوف صفحة مش ليه، والـ API هو اللي لازم يرفض الطلب.

---

## الخلاصة

| الـ guard | بيتفحص إمتى | false معناها |
|---|---|---|
| [[canActivate]] | قبل الدخول، بعد تحميل الكود | التنقل بيتلغي، أو [[UrlTree]] يحوّل |
| [[canMatch]] | قبل المطابقة والتحميل | الراوتر يكمّل للـ route اللي بعده |
| [[canDeactivate]] | قبل الخروج | تفضل في الصفحة |
| [[canActivateChild]] | قبل أي ابن | زي canActivate |
| تحويل لصفحة تانية | أي guard | [[return router.createUrlTree([...])]]، مش [[navigate]] + false |`,
          lines: [
            R`guard كـ function: بياخد الـ route والـ state (فيه الـ URL اللي رايحله).`,
            R`[[inject]] شغالة جوه الـ guard.`,
            "الراوتر عشان نعمل redirect.",
            "مسجّل؟ ادخل.",
            R`لأ؟ روح للـ login ومعاك الصفحة اللي كنت رايحها.`,
            "قفلة.",
            R`[[canMatch]]: لو مش أدمن، الـ route ده كأنه مش موجود.`,
            R`[[canDeactivate]] بياخد الـ component نفسه، فيقدر يسأله عنده تعديلات ولا لأ.`,
            "لو مفيش تعديلات اخرج، ولو فيه اسأل.",
            R`[[canActivate]] على صفحة.`,
            R`[[canMatch]] على قسم lazy: الكود مش هيتحمّل لغير الأدمن.`,
            R`[[canDeactivate]] على صفحة تعديل.`
          ],
          sol: R`من غير token، لما تفتح [[/orders]] (أو [[/secret]]) هتلاقي نفسك في [[/login?returnUrl=%2Forders]]. الـ [[/]] اتعملت encode لـ [[%2F]]. ده اللي طلع في الـ lab بالظبط: [[/login?returnUrl=%2Fsecret]]، وبعد ما حطينا token نفس الـ URL فتح الصفحة.

صفحة الـ login:`,
          solCode: R`@Component({
  selector: 'app-login-page',
  template: $__bt<button (click)="login()">دخول تجريبي</button>$__bt,
})
export class LoginPage {
  private auth = inject(Auth);
  private router = inject(Router);
  returnUrl = input<string>('/'); // من ?returnUrl= بفضل withComponentInputBinding
  login() {
    this.auth.token.set('demo-token');
    this.router.navigateByUrl(this.returnUrl());
  }
}`
        },
        {
          cmd: "resolvers",
          title: "تجيب بيانات الصفحة قبل ما تفتح بـ resolve",
          desc: R`الـ resolver دالة بتجيب بيانات قبل ما الراوتر يكمّل التنقل، والصفحة بتفتح والبيانات جاهزة. بتتحط في [[resolve: { product: productResolver }]] على الـ route، ومع [[withComponentInputBinding()]] بتوصل للصفحة كـ [[product = input.required<Product>()]].

الشكل الحديث [[ResolveFn<T>]] بـ [[inject()]] جواها، وبترجّع Observable أو Promise أو قيمة.

البديل إن الصفحة تفتح على طول وتجيب البيانات هي (بـ [[httpResource]] في درس HTTP) وتعرض loading. الاتنين صح، والفرق في تجربة المستخدم.`,
          example: R`export const productResolver: ResolveFn<Product> = (route) =>
  inject(ProductsApi).getOne(route.paramMap.get('id')!);
// الـ route:
{ path: 'products/:id', component: Details, resolve: { product: productResolver } }
// الصفحة:
export class Details {
  product = input.required<Product>();
}
// template: <h1>{{ product().name }}</h1>`,
          try: R`حط الـ resolver على صفحة التفاصيل وخلي الـ API بطيء (Network throttling على Slow 3G). دوس على منتج: إيه اللي بيحصل في الفترة دي؟ بعدين خلي الـ API يرجّع 404 وشوف إيه اللي بيحصل للتنقل.`,
          flag: "script",
          deep: {
            why: R`صفحات زي «تعديل منتج» ملهاش معنى من غير البيانات، ولو فتحت فاضية وبعدين اتملت، الفورم بتنط والمستخدم ممكن يبدأ يكتب في حقل فاضي. الـ resolver بيضمن إن لما الصفحة تفتح البيانات موجودة، فمفيش [[@if (loading)]] ولا [[?]] في كل حتة.`,
            how: R`الراوتر بيشغّل الـ guards الأول، وبعدين الـ resolvers، وبيستنى كلهم. لو Observable، بياخد أول قيمة ويكمّل. طول ما هو مستني، الصفحة القديمة فاضلة والـ URL لسه متغيرش، فلازم تعرض مؤشر تحميل عام: [[inject(Router).events]] فيه [[NavigationStart]] و [[NavigationEnd]]، أو ببساطة loading bar في الـ layout.

لو الـ resolver وقع بخطأ، التنقل بيتلغي والمستخدم بيفضل في الصفحة القديمة، وبيطلع [[NavigationError]]. عشان كده الأحسن تمسك الخطأ وترجّع [[RedirectCommand]] لصفحة 404، أو تستخدم [[withNavigationErrorHandler]].

والـ resolver بيشتغل تاني لما الـ params تتغير (من منتج لمنتج) افتراضيًا، ودي بتتظبط بـ [[runGuardsAndResolvers]].`,
            when: "صفحات تعديل، أو صفحات لازم تبقى كاملة من أول لحظة، أو لما عايز تحوّل لـ 404 قبل ما الصفحة تفتح. للـ dashboards والـ lists، الصفحة تفتح على طول وتعرض skeleton أحسن غالبًا: المستخدم بيحس إن الضغطة اشتغلت.",
            mistakes: R`API بطيء + resolver + مفيش loading indicator: المستخدم بيدوس ومفيش حاجة بتحصل، فيدوس تاني وتالت. و resolver بيرمي error فالتنقل يتلغي بصمت. وتستخدم resolver لكل صفحة فالتطبيق كله يبقى بطيء في الإحساس.`
          },
          teach: R`## الفكرة: الراوتر بيستنى البيانات، وبعدين يفتح الصفحة ومعاها

المثال ٤ حتت: الـ resolver، والـ route، والصفحة، والـ template. اتشغّل في Angular 22.2 مع [[ProductsApi]] service فيها [[getOne(id)]] بتعمل [[http.get<Product>('/api/products/' + id)]]. ومكان سيرفر حقيقي، عملنا interceptor بيرد على [[/api/products/5]] بعد ١٫٥ ثانية (زي نت بطيء)، وعلى أي id تاني بـ 404. واتفحص في Chrome.

---

## ١. الـ resolver

~~~text resolve.ts
export const productResolver: ResolveFn<Product> = (route) =>
  inject(ProductsApi).getOne(route.paramMap.get('id')!);
~~~

| الحتة | معناها |
|---|---|
| [[ResolveFn<Product>]] | نوع الدالة: بترجّع [[Product]]، أو Observable أو Promise بيطلّعوا [[Product]] |
| [[(route) =>]] | الـ route اللي رايحله، وفيه الـ params |
| [[route.paramMap.get('id')]] | قيمة [[:id]] من الـ URL، كنص. وممكن ترجّع [[null]] لو مفيش param بالاسم ده |
| [[!]] | (non-null assertion) بتقول لـ TypeScript «متأكد إنها مش null»، لأن الـ route فيه [[:id]] أكيد |
| [[inject(ProductsApi).getOne(...)]] | بيرجّع Observable من HttpClient. الراوتر بيعمل subscribe ويستنى أول قيمة |

---

## ٢. الـ route

~~~text routes
{ path: 'products/:id', component: Details, resolve: { product: productResolver } }
~~~

[[resolve]] object: المفتاح [[product]] هو اسم البيانات، والقيمة الـ resolver. ومع [[withComponentInputBinding()]] المفتاح ده بيبقى اسم الـ input.

---

## ٣. الصفحة

~~~text details.ts
export class Details {
  product = input.required<Product>();
}
// template: <h1>{{ product().name }}</h1>
~~~

[[input.required]] من غير قلق: الصفحة مش هتتعمل أصلًا غير لما البيانات تبقى موجودة. فمفيش [[@if (loading)]] ولا [[?.]].

---

## ٤. الناتج: API بطيء

كنا في [[/products]] ودوسنا لينك [[/products/5]] (في الـ lab المسار [[/r/5]]):

~~~text الناتج (Chrome)
+1388ms  on list        | url: /products | page: المنتجات
HTTP GET /api/products/5
+1552ms  after click 5  | url: /products | page: المنتجات
+2265ms  after click 5  | url: /products | page: المنتجات
+3282ms  after click 5  | url: /r/5      | page: قلم
~~~

- الطلب خرج أول ما دوسنا.
- لمدة ١٫٥ ثانية: الـ URL لسه [[/products]] والصفحة القديمة لسه ظاهرة. من ناحية المستخدم: «دوست ومفيش حاجة حصلت».
- لما الرد وصل: الـ URL اتغير والصفحة فتحت كاملة فيها «قلم».

عشان كده مع resolvers لازم مؤشر تحميل عام في الـ layout، بتشغّله من [[inject(Router).events]] ([[NavigationStart]] لحد [[NavigationEnd]]).

---

## ٥. الناتج: 404

~~~text الناتج (Chrome)
HTTP GET /api/products/99
ERROR HttpErrorResponse
+4479ms  after click 99 | url: /products | page: المنتجات
~~~

الـ resolver وقع، فالراوتر **لغى** التنقل: فضلنا في [[/products]]، والخطأ في الـ console، والمستخدم مش فاهم حاجة.

---

## ٦. الـ solCode: [[safeProductResolver]]

~~~text resolve.ts
export const safeProductResolver: ResolveFn<Product> = (route) => {
  const router = inject(Router);
  return inject(ProductsApi).getOne(route.paramMap.get('id')!).pipe(
    catchError(() => of(new RedirectCommand(router.parseUrl('/not-found')))),
  );
};
~~~

| الحتة | معناها |
|---|---|
| [[const router = inject(Router)]] | في أول الدالة، لأن جوه [[catchError]] احنا برا الـ injection context |
| [[.pipe(...)]] | بتعدّي الـ Observable على operators (تاب RxJS) |
| [[catchError(() => ...)]] | لو حصل خطأ، رجّع Observable تاني بداله |
| [[of(x)]] | Observable بيطلّع قيمة واحدة: [[x]] |
| [[router.parseUrl('/not-found')]] | بيحوّل النص لـ [[UrlTree]] |
| [[new RedirectCommand(...)]] | قيمة بتقول للراوتر «سيب التنقل ده وروح هنا» |

~~~text الناتج (Chrome)
HTTP GET /api/products/99
+5321ms  safe 99 | url: /not-found | page: الصفحة مش موجودة
~~~

مفيش خطأ في الـ console، والمستخدم وصل لصفحة بتفهّمه (هنا [[/not-found]] طابقت [[**]]).

---

## الخلاصة

| الحاجة | الشكل |
|---|---|
| resolver | [[ResolveFn<T> = (route) => inject(Api).get(...)]] |
| على الـ route | [[resolve: { product: productResolver }]] |
| في الصفحة | [[product = input.required<T>()]] مع [[withComponentInputBinding()]] |
| وهو مستني | الصفحة القديمة والـ URL القديم، فاعرض loading عام |
| لو وقع | التنقل بيتلغي، فامسكه بـ [[catchError]] و [[RedirectCommand]] |`,
          lines: [
            R`resolver بيرجّع [[Product]]، وبياخد الـ route عشان يقرا الـ id.`,
            R`بيطلب المنتج من الـ API. الـ [[!]] لأن الـ route فيه [[:id]] أكيد.`,
            R`[[resolve]] على الـ route: المفتاح [[product]] هو اسم الـ input.`,
            "الصفحة.",
            "البيانات وصلت كـ input جاهز، من غير loading.",
            "قفلة."
          ],
          sol: R`مع Slow 3G: بتدوس على المنتج ومفيش حاجة بتتغير لثواني، لا الصفحة ولا الـ URL، وبعدين الصفحة بتفتح كاملة. ده بالظبط ليه محتاج loading bar عام. في الـ lab، [[/products/5]] مع resolver طلب [[/api/products/5]] الأول، والصفحة اترسمت بعد الـ flush وفيها «قلم».

مع 404: التنقل بيتلغي وبتفضل في صفحة القايمة، وفي الـ console خطأ HttpErrorResponse. الحل: [[catchError]] في الـ resolver يرجّع [[of(new RedirectCommand(router.parseUrl('/not-found')))]]، والـ [[router]] يتعمل له inject في أول الـ resolver مش جوه catchError (برا injection context)، أو تسيب الصفحة تجيب بنفسها وتعرض رسالة:`,
          solCode: R`export const safeProductResolver: ResolveFn<Product> = (route) => {
  const router = inject(Router);
  return inject(ProductsApi).getOne(route.paramMap.get('id')!).pipe(
    catchError(() => of(new RedirectCommand(router.parseUrl('/not-found')))),
  );
};`
        }
      ]
    }
]);
