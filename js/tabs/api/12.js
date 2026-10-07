// تكملة تاب api: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/api/01.js (شرح حقول الدرس في أوله)
MORE("api", [
    {
      t: "NestJS",
      l: 3,
      n: "الـ framework اللي في إعلانات شغل كتير: نفس Express من تحت، بس بـ modules و DI و decorators، و validation و guards واختبارات جاهزة",
      items: [
        {
          cmd: "Nest: modules و DI",
          title: "module و controller و provider: مين بيعمل إيه",
          desc: R`NestJS مبني على Express (افتراضيًا)، بس بيفرض هيكل: كل feature ليها module، جواه controller (الـ routes) و provider/service (المنطق). والـ service مبتعملش [[new]] لحاجة: بتطلب اللي محتاجاه في الـ constructor، و Nest بيعمله ويدّيهولها (dependency injection).

ده نفس «routes / controllers / services» اللي عملناه بإيدنا في Express، بس الـ framework هو اللي بيوصّل القطع ببعض. والكود TypeScript بـ decorators (درس الأنواع في تاب «TypeScript»).`,
          example: R`// orders/orders.service.ts
@Injectable()
export class OrdersService {
  constructor(private readonly db: PrismaService) {}
  async findMine(userId: string, id: string) {
    const order = await this.db.order.findFirst({ where: { id, userId } });
    if (!order) throw new NotFoundException("Order not found");
    return order;
  }
}

// orders/orders.controller.ts
@Controller("orders")
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly orders: OrdersService) {}
  @Get(":id")
  findOne(@Req() req: { user: { sub: string } }, @Param("id") id: string) {
    return this.orders.findMine(req.user.sub, id);
  }
}

// orders/orders.module.ts
@Module({ controllers: [OrdersController], providers: [OrdersService], exports: [OrdersService] })
export class OrdersModule {}

// app.module.ts
@Module({ imports: [PrismaModule, OrdersModule] })
export class AppModule {}`,
          try: R`اعمل مشروع بـ [[npx @nestjs/cli new shop]] وبعدين [[npx nest g resource tasks]] (اختار REST). افتح الملفات اللي اتولدت وارسم على ورقة: مين بيستورد مين، ومين بيطلب مين في الـ constructor. وبعدين شيل [[TasksService]] من [[providers]] في الـ module وشغّل: رسالة الخطأ بتقول إيه؟`,
          flag: "script",
          deep: {
            why: R`Express بيسيبك تنظّم زي ما انت عايز، وفي مشروع فيه ١٠ مطورين كل واحد بينظّم بطريقة، وبعد سنة الكود بقى عجينة. Nest بيدّي الفريق كله نفس الشكل: أي مطور Nest يفتح أي مشروع Nest ويعرف الحاجة فين. وعشان كده بيتطلب كتير في الشركات والإعلانات، خصوصًا في الخليج ومصر.`,
            how: R`[[@Module]] بيعرّف حدود الـ feature: [[controllers]] بتاعته، و [[providers]] اللي بيعملها، و [[exports]] اللي بيسمح لـ modules تانية تستخدمها، و [[imports]] للـ modules اللي محتاجها. والـ provider افتراضيًا singleton: instance واحد للتطبيق كله.

DI: Nest بيقرا نوع الباراميتر في الـ constructor ([[PrismaService]]) من الـ metadata اللي TypeScript بيطلّعها ([[emitDecoratorMetadata]])، ويدوّر عليه في الـ providers المتاحة للـ module ده، ويعمله لو لسه متعملش. لو مش لاقيه، بيرمي خطأ واضح وقت التشغيل: «Nest can't resolve dependencies of the OrdersService (?)». ده بيحصل غالبًا لما تنسى تضيفه في [[providers]]، أو الـ module اللي فيه مش عامل [[exports]] ليه، أو انت مش عامل [[imports]] للـ module.

[[@Global()]] على module (زي PrismaModule) بيخلي الـ exports بتاعته متاحة في كل حتة من غير import. استخدمه للحاجات المشتركة بجد بس.

والـ exceptions: [[NotFoundException]] و [[ForbiddenException]] وأخواتهم بتتحول لرد JSON بالـ status المناسب لوحدها ([[{"statusCode":404,"message":"Order not found","error":"Not Found"}]]). و [[@Controller("orders")]] مع [[@Get(":id")]] بيعملوا [[GET /orders/:id]].

النسخة الحالية (Nest 12) بقت ESM (زي [[import ... from "./orders.service.js"]] بالامتداد) ومحتاجة Node 20 أو أحدث. الـ CLI بيعمل الإعداد ده لوحده.`,
            when: "فريق كبير، أو مشروع هيعيش سنين، أو الشركة شغالة Nest. لـ API صغير أو MVP لوحدك، Express (أو Fastify) أخف وأسرع في البداية.",
            mistakes: R`[[new OrdersService(new PrismaService())]] بإيدك جوه controller: كده ضيّعت الـ DI والاختبار بقى صعب. و module واحد ضخم فيه كل حاجة. و circular dependency بين modules (A بيحتاج B و B بيحتاج A): الحل غالبًا module تالت أو إعادة تقسيم، مش [[forwardRef]] في كل حتة. وفي الانترفيو: «يعني إيه dependency injection وليه؟» قول: الكلاس بيطلب اللي محتاجه بدل ما يعمله، فتقدر تبدّله بـ fake في الاختبار (درس «Nest: الاختبارات»).`
          },
          teach: R`## ٤ ملفات، وكل واحد ليه شغلانة

المثال feature واحدة اسمها orders (الطلبات) متقسمة على ٤ ملفات: الـ service فيها المنطق، والـ controller فيه الـ route، والـ module بيجمعهم، و [[AppModule]] بيجمع كل الـ modules. وانت مش بتعمل [[new]] لأي حاجة فيهم: Nest هو اللي بيعمل كل كلاس ويدّيه اللي طلبه.

جربنا الكود ده بالظبط على Nest 12.1 (Node 24 على ويندوز 11) مع Prisma 7 و Postgres في Docker، وكل الردود تحت حقيقية من التجربة دي.

---

## الأول: يعني إيه [[@]] قبل الاسم؟

[[@Injectable()]] و [[@Controller("orders")]] و [[@Module({...})]] اسمهم **decorators**. الـ decorator دالة بتتنادى على الكلاس (أو الـ method أو الباراميتر) اللي تحتها، وبتلزق عليه معلومة (metadata). الكلاس نفسه مبيتغيرش، بس Nest وهو بيبدأ بيقرا المعلومات دي:

| الـ decorator | بيتحط على | معناه لـ Nest |
|---|---|---|
| [[@Injectable()]] | كلاس | «ده provider، اعمله وادّيه لأي حد يطلبه» |
| [[@Controller("orders")]] | كلاس | «ده controller، وكل الـ routes بتاعته تبدأ بـ [[/orders]]» |
| [[@Get(":id")]] | method | «الـ method دي بترد على GET» |
| [[@Param("id")]] | باراميتر | «حط هنا قيمة [[:id]] من الـ URL» |
| [[@Module({...})]] | كلاس | «ده module، وده اللي جواه» |

والأقواس [[()]] بعد الاسم لأن [[Injectable]] نفسها دالة بترجّع الـ decorator. عشان كده بتكتب [[@Injectable()]] مش [[@Injectable]].

---

## ١. الـ service: [[orders.service.ts]]

~~~ts
@Injectable()
export class OrdersService {
  constructor(private readonly db: PrismaService) {}
~~~

- [[export class OrdersService]]: كلاس عادي، و [[export]] عشان الملفات التانية تقدر تعمله import.
- [[constructor(...)]]: الدالة اللي بتشتغل لما الكلاس يتعمل منه نسخة (instance).
- [[private readonly db: PrismaService]]: دي اختصار TypeScript لـ ٣ حاجات مرة واحدة: اعمل خانة اسمها [[db]] على الكلاس، و [[private]] يعني محدش برّه الكلاس يشوفها، و [[readonly]] يعني متتغيرش بعد ما تتحط. و [[: PrismaService]] هو **النوع**.
- [[{}]] الفاضيين: جسم الـ constructor فاضي، لأن الاختصار عمل كل حاجة.

وهنا السحر كله: Nest بيبص على **النوع** [[PrismaService]]، ويدوّر عليه في الـ providers، ويعمل منه نسخة (أو ياخد اللي اتعملت قبل كده)، ويبعتها للـ constructor. ده الـ **dependency injection** (DI): الكلاس بيقول «أنا محتاج ده» بدل ما يعمله بنفسه.

~~~ts
  async findMine(userId: string, id: string) {
    const order = await this.db.order.findFirst({ where: { id, userId } });
~~~

- [[async]]: الدالة بترجّع Promise، وجواها ينفع [[await]].
- [[this.db.order]]: جدول الطلبات من Prisma (اللي اتحقن فوق).
- [[findFirst({ where: { id, userId } })]]: هات أول طلب الـ id بتاعه كذا **و** صاحبه اليوزر ده. [[{ id, userId }]] اختصار لـ [[{ id: id, userId: userId }]].

ليه الاتنين مع بعض مش الـ id بس؟ عشان لو يوزر خمّن id طلب حد تاني، الشرط مش هيتحقق ويرجع [[null]]. ده اسمه ownership check.

~~~ts
    if (!order) throw new NotFoundException("Order not found");
    return order;
~~~

[[!order]] يعني «لو مفيش طلب». و [[NotFoundException]] كلاس جاهز من [[@nestjs/common]]، ولما يترمي Nest بيحوّله لوحده لرد 404. جربناه بتوكن يوزر تاني على طلب مش بتاعه:

~~~text الرد
HTTP/1.1 404 Not Found
{"message":"Order not found","error":"Not Found","statusCode":404}
~~~

مفيش [[res.status(404)]] في أي حتة. الـ service مبتعرفش حاجة عن HTTP، بترمي خطأ بمعنى، و Nest بيترجمه.

---

## ٢. الـ controller: [[orders.controller.ts]]

~~~ts
@Controller("orders")
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly orders: OrdersService) {}
~~~

- [[@Controller("orders")]]: الـ prefix بتاع كل الـ routes هنا.
- [[@UseGuards(AuthGuard)]]: قبل أي route هنا، شغّل [[AuthGuard]] (بيتحقق من التوكن، درس «Nest: guards و interceptors»). من غير توكن الرد كان:

~~~text الرد
HTTP/1.1 401 Unauthorized
{"message":"Unauthorized","statusCode":401}
~~~

- الـ constructor: نفس الفكرة، الـ controller بيطلب [[OrdersService]] و Nest بيدّيهاله.

~~~ts
  @Get(":id")
  findOne(@Req() req: { user: { sub: string } }, @Param("id") id: string) {
    return this.orders.findMine(req.user.sub, id);
  }
~~~

- [[@Get(":id")]] مع [[@Controller("orders")]] = [[GET /orders/:id]]. و [[:id]] معناها «أي قيمة في المكان ده، واسمها id».
- [[@Req() req]]: الـ request بتاع Express كله. والـ guard حط عليه [[req.user]] (محتوى التوكن).
- [[: { user: { sub: string } }]]: النوع. مشروع Nest 12 الجديد بيطلع بـ [["strict": true]] في [[tsconfig.json]]، ومن غير نوع هنا الـ build بيقف بـ [[error TS7006: Parameter 'req' implicitly has an 'any' type.]] (جربناها).
- [[req.user.sub]]: [[sub]] اختصار subject، يعني id اليوزر صاحب التوكن (اسم ثابت في JWT).
- [[return]]: اللي بيرجع (حتى لو Promise) Nest بيستناه ويبعته JSON بـ 200:

~~~text الرد بتوكن صاحب الطلب
HTTP/1.1 200 OK
{"id":"cmuxu98ap0002i8ieiayks064","userId":"cmuxu97gq0000i8iel7kjrsa7","amountCents":500,"createdAt":"2026-10-07T08:21:23.137Z"}
~~~

---

## ٣. الـ module: [[orders.module.ts]]

~~~ts
@Module({ controllers: [OrdersController], providers: [OrdersService], exports: [OrdersService] })
export class OrdersModule {}
~~~

الكلاس فاضي ([[{}]])، والمهم كله في الـ object اللي جوه [[@Module]]:

| الحقل | معناه |
|---|---|
| [[controllers]] | الـ controllers اللي الـ routes بتاعتهم تتسجل |
| [[providers]] | الكلاسات اللي Nest يعملها جوه الـ module ده ويحقنها |
| [[exports]] | مين من الـ providers دول مسموح لـ modules تانية تستخدمه |
| [[imports]] (مش هنا) | modules تانية الـ module ده محتاج حاجة منها |

---

## ٤. [[app.module.ts]]

~~~ts
@Module({ imports: [PrismaModule, OrdersModule] })
export class AppModule {}
~~~

ده الـ module الرئيسي اللي [[main.ts]] بيبدأ منه. [[PrismaModule]] بيوفر [[PrismaService]] (درس «Nest: Prisma»)، و [[OrdersModule]] بتاعنا. ولما التطبيق بيقوم بيطبع اللي اتعمل:

~~~text من لوج البداية
[InstanceLoader] PrismaModule dependencies initialized
[InstanceLoader] OrdersModule dependencies initialized
[RoutesResolver] OrdersController {/orders}:
[RouterExplorer] Mapped {/orders/:id, GET} route
[NestApplication] Nest application successfully started
~~~

---

## الطلب ماشي إزاي من أوله لآخره

| الخطوة | مين | بيعمل إيه |
|---|---|---|
| ١ | Nest وقت البداية | يعمل [[PrismaService]] ثم [[OrdersService]] (ويحقن فيها Prisma) ثم [[OrdersController]] |
| ٢ | [[GET /orders/abc]] يوصل | [[AuthGuard]] يتحقق من التوكن ويحط [[req.user]] |
| ٣ | [[findOne]] | ياخد [[req.user.sub]] و [[id]] ويكلّم الـ service |
| ٤ | [[findMine]] | يدوّر بالاتنين، ويرمي 404 لو مش لاقي |
| ٥ | Nest | يبعت اللي رجع JSON بـ 200، أو الـ exception كـ 404 |

---

## جرّب انت: الأوامر اللي في «جرّب»

~~~bash
npx @nestjs/cli new shop
~~~

[[npx]] بيشغّل الـ CLI بتاع Nest من غير ما تسطّبه global، و [[new shop]] بيعمل فولدر [[shop]] فيه مشروع جاهز (بيسألك تختار npm ولا pnpm ولا yarn). المشروع اللي طلع عندنا كان فيه [["type": "module"]] (يعني ESM) و Vitest للاختبارات بدل Jest.

~~~bash
npx nest g resource tasks
~~~

[[g]] اختصار generate. بيسألك على الـ transport (اختار REST API) و «Would you like to generate CRUD entry points?». وطلّع:

~~~text الناتج
CREATE src/tasks/tasks.controller.ts (937 bytes)
CREATE src/tasks/tasks.controller.spec.ts (592 bytes)
CREATE src/tasks/tasks.module.ts (263 bytes)
CREATE src/tasks/tasks.service.ts (641 bytes)
CREATE src/tasks/tasks.service.spec.ts (474 bytes)
CREATE src/tasks/dto/create-task.dto.ts (31 bytes)
CREATE src/tasks/dto/update-task.dto.ts (176 bytes)
CREATE src/tasks/entities/task.entity.ts (22 bytes)
UPDATE package.json (1506 bytes)
UPDATE src/app.module.ts (331 bytes)
~~~

لاحظ [[UPDATE src/app.module.ts]]: الـ CLI ضاف [[TasksModule]] في [[imports]] لوحده.

ولما شلنا [[TasksService]] من [[providers]]، التطبيق وقف وقت البداية (قبل أي طلب):

~~~text الناتج
ERROR [ExceptionHandler] UnknownDependenciesException [Error]: Nest can't resolve dependencies of the TasksController (?). Please make sure that the argument TasksService at index [0] is available in the TasksModule module.
~~~

[[(?)]] مكان الباراميتر اللي ملقاش ليه provider، و [[index [0]]] يعني أول باراميتر في الـ constructor.

---

## الخلاصة

- الـ service فيها المنطق ومبتعرفش HTTP، بترمي [[NotFoundException]] وخلاص.
- الـ controller بيوصّل الـ URL بالـ service، ومش بيعمل [[new]] لحاجة.
- الـ module بيقول مين موجود ([[providers]]) ومين مسموح يطلع برّه ([[exports]]).
- DI = الكلاس بيطلب بالنوع في الـ constructor، و Nest بيدوّر عليه في الـ providers. لو مش لاقيه، التطبيق مبيقومش أصلًا.`,
          lines: [
            "الـ service بتتعلّم إنها provider ينفع يتحقن.",
            "كلاس الـ service.",
            "بتطلب PrismaService في الـ constructor، و Nest بيدّيهولها.",
            "دالة: طلب اليوزر ده بالـ id ده.",
            "دوّر بالـ id وصاحبه مع بعض (ownership).",
            "مش موجود؟ exception بتتحول لـ 404 JSON لوحدها.",
            "رجّعه.",
            "قفلة.",
            "قفلة.",
            "controller على [[/orders]].",
            "كل الـ routes هنا محتاجة الـ guard (درس «Nest: guards و interceptors»).",
            "الكلاس.",
            "بيطلب الـ service.",
            "GET /orders/:id.",
            "خد الـ request والـ param.",
            "نادي الـ service بـ id اليوزر من التوكن. اللي بيرجع بيتبعت JSON.",
            "قفلة.",
            "قفلة.",
            "الـ module: الـ controller والـ service، وبيصدّر الـ service لو module تاني احتاجه.",
            "قفلة.",
            "الـ module الرئيسي بيجمع الكل.",
            "قفلة."
          ],
          sol: R`لما تشيل [[TasksService]] من [[providers]] وتشغّل، Nest بيقف وقت البداية (مش وقت أول طلب) برسالة زي: [[Nest can't resolve dependencies of the TasksController (?). Please make sure that the argument TasksService at index [0] is available in the TasksModule module.]] (ونسخة Nest 12.1 بتكمّل تحتها بـ «Potential solutions» فيها نفس الحلول التلاتة اللي تحت)

الـ [[?]] مكان الباراميتر اللي ملقاش ليه provider. والحل واحد من ٣: ضيفه في [[providers]]، أو لو هو في module تاني تأكد إن الـ module ده بيعمل [[exports]] ليه وإنك عامل [[imports]] للـ module.

والرسم: [[AppModule]] بيستورد [[TasksModule]]، و [[TasksController]] بيطلب [[TasksService]]، والاتنين متسجّلين في [[TasksModule]].`,
          solCode: R`npx @nestjs/cli new shop
cd shop
npx nest g resource tasks
# ✔ What transport layer do you use? REST API
npm run start:dev
# شيل TasksService من providers في tasks.module.ts:
# ERROR [ExceptionHandler] Nest can't resolve dependencies of the TasksController (?) ...`
        },
        {
          cmd: "Nest: DTO و pipes",
          title: "الـ body بيتفحص قبل ما يوصل للـ controller",
          desc: R`الـ DTO بيوصف شكل الـ body اللي الـ endpoint بيقبله، والـ pipe بيفحصه قبل ما الـ controller يشتغل. لو غلط، الرد 400 برسالة واضحة والـ controller عمره ما يتنادى.

طريقتين: class بـ decorators من [[class-validator]] مع [[ValidationPipe]] (الأشهر في المشاريع الموجودة)، أو schema بـ Zod مع [[StandardSchemaValidationPipe]] اللي بقى جوه Nest 12 نفسه.`,
          example: R`// الطريقة الكلاسيكية: class-validator
export class CreateTaskDto {
  @IsString() @MaxLength(200) title!: string;
  @IsOptional() @IsInt() @Min(1) priority?: number;
}
app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));

@Post()
create(@Body() dto: CreateTaskDto) { return this.tasks.create(dto); }

@Get(":id")
findOne(@Param("id", ParseIntPipe) id: number) { return this.tasks.findOne(id); }

// Zod (Nest 12): schema على الباراميتر
export const CreateOrderSchema = z.object({ amountCents: z.number().int().positive(), note: z.string().max(200).optional() });
export type CreateOrderDto = z.infer<typeof CreateOrderSchema>;
app.useGlobalPipes(new StandardSchemaValidationPipe());

@Post()
create(@Req() req: { user: { sub: string } }, @Body({ schema: CreateOrderSchema }) dto: CreateOrderDto) { return this.orders.create(req.user.sub, dto); }`,
          try: R`ركّب [[ValidationPipe]] بالإعدادات دي، وابعت بـ curl: body صح، و body فيه حقل زيادة [[isAdmin: true]]، و body من غير title، و [[GET /tasks/abc]]. اكتب الرد بتاع كل واحد. وبعدين شيل [[forbidNonWhitelisted]] وابعت الـ isAdmin تاني: اتقبل؟ وصل للـ controller؟`,
          flag: "script",
          deep: {
            why: R`نفس سبب درس [[validate(schema)]]: متصدّقش أي حاجة جاية. الفرق إن في Nest الفحص جزء من الـ framework: pipe واحد global بيحمي كل الـ endpoints، والـ DTO نفسه توثيق (و [[@nestjs/swagger]] بيقراه ويطلّع OpenAPI).`,
            how: R`[[ValidationPipe]] بياخد الـ body (object عادي)، ويحوّله لـ instance من الـ class بـ class-transformer، ويشغّل الـ decorators بـ class-validator. عشان كده محتاج الباكدجين دول متسطّبين، ومحتاج الـ type في الباراميتر يبقى class مش interface (الـ interface بيتمسح وقت التشغيل ومفيش حاجة يفحص بيها).

الإعدادات: [[whitelist: true]] بيشيل أي حقل ملوش decorator. و [[forbidNonWhitelisted: true]] بدل ما يشيله بيرفض الطلب بـ 400 «property isAdmin should not exist». ودي حماية من mass assignment: حد يبعت [[role: "ADMIN"]] والـ service تعمل [[create(dto)]]. و [[transform: true]] بيخلي [[dto]] instance حقيقي من الـ class، وبيحوّل الأنواع البسيطة لو الـ type بيقول كده. و [[ParseIntPipe]] على الـ param بيحوّل [[42]] لرقم أو يرجّع 400 «numeric string is expected». جربناها كلها على Nest 12.

Zod: في Nest 12 بتحط الـ schema في [[@Body({ schema })]]، و [[StandardSchemaValidationPipe]] بيشغّله. Standard Schema معناها أي مكتبة بتطبّق نفس الواجهة (Zod و Valibot وغيرهم). الرد لـ [[amountCents: "x"]] كان 400 برسالة [[amountCents: Invalid input: expected number, received string]]. وميزتها إنك بتعرّف الشكل مرة، والنوع [[z.infer]] بيطلع منه، وممكن تشارك نفس الـ schema مع الواجهة (درس «Express + Zod» في تاب «TypeScript»). وفي نسخ Nest الأقدم كنت بتكتب pipe بنفسك أو تستخدم مكتبة زي [[nestjs-zod]].

والـ pipe على مستوى: global ([[useGlobalPipes]])، أو controller، أو route، أو باراميتر واحد ([[@Param("id", ParseIntPipe)]]).`,
            when: "global pipe من أول يوم في أي مشروع Nest. class-validator لو المشروع قايم عليه أو بتستخدم swagger بالـ decorators. Zod لو مشروع جديد وعايز نفس الـ schema في الواجهة والباك.",
            mistakes: R`DTO كـ [[interface]] أو [[type]] مع ValidationPipe: مفيش أي فحص خالص والطلب بيعدّي. و ValidationPipe من غير [[whitelist]] فأي حقل زيادة يوصل للـ service ولـ Prisma. ونسيان [[@IsOptional()]] على حقل اختياري فيرفض لما ميتبعتش. و [[@ValidateNested()]] من غير [[@Type(() => ItemDto)]] على array من objects، فالعناصر جوه متتفحصش.`
          },
          teach: R`## الطلب بيعدّي على «بوابة» قبل الـ controller

الـ pipe دالة بتاخد قيمة الباراميتر (الـ body أو الـ id) قبل ما يوصل للـ method: يا إما يرجّعها (ويمكن يحوّلها)، يا إما يرمي 400 والـ method متتناداش خالص. المثال فيه نفس الفكرة بطريقتين: class-validator (الكلاسيكية) و Zod (الجديدة في Nest 12).

جربنا الكود ده على Nest 12.1 و class-validator 0.15 و Zod 4.6، والطلبات بـ curl من Git Bash، وكل الردود تحت حقيقية.

---

## الطريقة الأولى: class-validator

### ١. الـ DTO

~~~ts
export class CreateTaskDto {
  @IsString() @MaxLength(200) title!: string;
  @IsOptional() @IsInt() @Min(1) priority?: number;
}
~~~

DTO اختصار Data Transfer Object: «شكل البيانات اللي جاية في الطلب». كل سطر حقل، والـ decorators اللي قبله هي القواعد:

| الـ decorator | القاعدة |
|---|---|
| [[@IsString()]] | لازم نص |
| [[@MaxLength(200)]] | ٢٠٠ حرف بالكتير |
| [[@IsOptional()]] | لو مش موجود (أو null) عدّي ومتفحصش الباقي |
| [[@IsInt()]] | رقم صحيح (مش 2.5 ومش "2") |
| [[@Min(1)]] | ١ أو أكتر |

وفي TypeScript: [[title!: string]] الـ [[!]] معناها «أنا عارف إن القيمة هتتحط، متشتكيش إني معملتهاش في الـ constructor». و [[priority?: number]] الـ [[?]] معناها اختياري.

ليه **class** مش [[interface]]؟ لأن الـ interface بيتمسح خالص لما TypeScript يتحوّل JavaScript، فمفيش حاجة وقت التشغيل يتلزق عليها decorators. الكلاس بيفضل موجود.

### ٢. الـ pipe الـ global

~~~ts
app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
~~~

السطر ده في [[main.ts]]، و [[useGlobalPipes]] معناها «شغّل الـ pipe ده على كل باراميتر في كل route». والإعدادات التلاتة:

- [[whitelist: true]]: أي حقل في الـ body ملوش decorator في الـ DTO يتشال.
- [[forbidNonWhitelisted: true]]: بدل ما يتشال بهدوء، ارفض الطلب كله بـ 400.
- [[transform: true]]: حوّل الـ body من object عادي لـ instance حقيقي من [[CreateTaskDto]].

### ٣. الـ route

~~~ts
@Post()
create(@Body() dto: CreateTaskDto) { return this.tasks.create(dto); }
~~~

[[@Body()]] يعني «الباراميتر ده هو الـ body». والـ pipe بيعرف يفحص بإيه من **النوع** [[CreateTaskDto]] (Nest بيقراه من الـ metadata اللي TypeScript بيطلّعها).

نبعت ٣ طلبات:

~~~bash
curl -si -X POST localhost:5860/tasks -H "Content-Type: application/json" -d '{"title":"x","priority":2}'
~~~

- [[-s]] silent: من غير progress bar. و [[-i]]: اطبع الـ status والـ headers مع الـ body.
- [[-X POST]] الـ method، و [[-H]] header، و [[-d]] الـ body. والـ [[Content-Type: application/json]] لازم، من غيره Express مش هيقرا الـ body كـ JSON.

~~~text الرد
HTTP/1.1 201 Created
{"created":{"title":"x","priority":2},"isInstance":true}
~~~

الـ service بتاعتنا في التجربة بترجّع الـ dto ومعاه [[dto instanceof CreateTaskDto]]: [[true]]، يعني [[transform]] اشتغل. و 201 مش 200 لأن Nest بيرجّع 201 لأي [[@Post]] افتراضيًا.

~~~text حقل زيادة: {"title":"x","isAdmin":true}
{"message":["property isAdmin should not exist"],"error":"Bad Request","statusCode":400}
~~~

~~~text من غير title: {"priority":2}
{"message":["title must be shorter than or equal to 200 characters","title must be a string"],"error":"Bad Request","statusCode":400}
~~~

[[message]] مصفوفة فيها كل قاعدة اتكسرت، مش أول واحدة بس. ولما شلنا [[forbidNonWhitelisted]] وسيبنا [[whitelist]]، نفس طلب [[isAdmin]] رجع 201 والـ service وصلها [[{"title":"x"}]] بس. ده الفرق بين «ارفض» و «امسح في صمت».

---

## ٤. [[ParseIntPipe]] على باراميتر واحد

~~~ts
@Get(":id")
findOne(@Param("id", ParseIntPipe) id: number) { return this.tasks.findOne(id); }
~~~

كل حاجة في الـ URL نص. [[ParseIntPipe]] تاني باراميتر في [[@Param]] معناه «حوّل [[id]] لرقم صحيح قبل ما تديهولي، أو ارفض»:

~~~text GET /tasks/42
{"id":42,"type":"number"}
~~~

~~~text GET /tasks/abc
{"message":"Validation failed (numeric string is expected)","error":"Bad Request","statusCode":400}
~~~

---

## الطريقة التانية: Zod (Nest 12)

~~~ts
export const CreateOrderSchema = z.object({ amountCents: z.number().int().positive(), note: z.string().max(200).optional() });
~~~

- [[z.object({...})]]: الـ body لازم object فيه الحقول دي.
- [[z.number().int().positive()]]: رقم، وصحيح، وأكبر من صفر. كل نقطة بتضيف قاعدة.
- [[z.string().max(200).optional()]]: نص ٢٠٠ حرف بالكتير، ومش لازم يتبعت.

~~~ts
export type CreateOrderDto = z.infer<typeof CreateOrderSchema>;
~~~

[[typeof CreateOrderSchema]] نوع الـ schema نفسه، و [[z.infer<...>]] بيطلّع منه نوع TypeScript للبيانات: [[{ amountCents: number; note?: string }]]. يعني بتكتب القواعد مرة واحدة، والنوع بيطلع منها لوحده.

~~~ts
app.useGlobalPipes(new StandardSchemaValidationPipe());

@Post()
create(@Req() req: { user: { sub: string } }, @Body({ schema: CreateOrderSchema }) dto: CreateOrderDto) { return this.orders.create(req.user.sub, dto); }
~~~

هنا النوع مش class، فمش هو اللي بيقول للـ pipe يفحص بإيه. بدل كده الـ schema متحطوط صريح في [[@Body({ schema: ... })]]، و [[StandardSchemaValidationPipe]] (جاي مع [[@nestjs/common]] في Nest 12) بيشغّل أي schema بيلاقيه على باراميتر. و [[@Req() req: {...}]] زي الدرس اللي فات: اليوزر من التوكن، والنوع لازم عشان [[strict]].

~~~text amountCents: "x"
HTTP/1.1 400 Bad Request
{"message":["amountCents: Invalid input: expected number, received string"],"error":"Bad Request","statusCode":400}
~~~

~~~text amountCents: -5
{"message":["amountCents: Too small: expected number to be >0"],"error":"Bad Request","statusCode":400}
~~~

الرسالة شكلها [[اسم الحقل: رسالة Zod]]. وشغّلنا الـ pipe-ين global مع بعض في نفس التطبيق ومحدش ضايق التاني: [[ValidationPipe]] بيسيب الباراميتر اللي نوعه مش class، و [[StandardSchemaValidationPipe]] بيسيب اللي ملوش [[schema]].

---

## على ويندوز

| الطريقة | PowerShell 7 | Windows PowerShell 5.1 |
|---|---|---|
| [[Invoke-RestMethod ... -Body $body]] | شغال | شغال |
| [[curl.exe ... -d '{"title":"x"}']] | شغال | الـ JSON بيوصل بايظ (400 [[Expected property name]]) |
| [[curl.exe ... -d '{\"title\":\"x\"}']] | الـ JSON بيوصل بايظ | شغال |

يعني الأضمن [[Invoke-RestMethod]] (جربناه في الاتنين):

~~~powershell
$body = @{ title = "x"; isAdmin = $true } | ConvertTo-Json -Compress
Invoke-RestMethod -Method Post -Uri http://localhost:5860/tasks -ContentType "application/json" -Body $body
~~~

[[@{ ... }]] hashtable في PowerShell، و [[ConvertTo-Json -Compress]] بيحوّله JSON في سطر واحد. ولما الرد 400، [[Invoke-RestMethod]] بيرمي خطأ، والـ body بتاعه في [[$_.ErrorDetails.Message]] جوه [[catch]].

---

## الخلاصة

| | class-validator | Zod |
|---|---|---|
| القواعد فين | decorators على class | schema |
| الـ pipe بيعرف الشكل منين | من نوع الباراميتر | من [[@Body({ schema })]] |
| النوع | الكلاس نفسه | [[z.infer]] |
| الـ pipe | [[ValidationPipe]] | [[StandardSchemaValidationPipe]] |

- [[whitelist]] و [[forbidNonWhitelisted]] هما اللي بيمنعوا حد يبعت [[isAdmin]] أو [[role]] ويوصل للقاعدة.
- لو الـ 400 مش راجع وانت متوقعه: الـ DTO [[interface]] مش class، أو الـ pipe مش متركّب.`,
          lines: [
            "DTO كـ class بـ decorators.",
            "title: نص وأقصاه ٢٠٠.",
            "priority: اختياري، ولو موجود رقم صحيح من ١.",
            "قفلة.",
            "pipe global: شيل وارفض أي حقل مش في الـ DTO، وحوّل لـ instance.",
            "route بيقبل الـ DTO.",
            "الـ body بيوصل هنا بعد ما اتفحص.",
            "param بيتحوّل لرقم، أو 400 لو مش رقم.",
            "خد الـ id كرقم.",
            "schema بـ Zod.",
            "النوع من الـ schema.",
            "pipe global بيشغّل أي schema متحطوط على باراميتر.",
            "route.",
            "الـ schema متحطوط على الـ Body نفسه."
          ],
          sol: R`النتايج (جربناها على Nest 12):

body صح: 201 والـ dto instance من [[CreateTaskDto]].

حقل زيادة: 400 و [[message: ["property isAdmin should not exist"]]].

من غير title: 400 وفيه أكتر من رسالة، منهم [[title must be a string]].

[[GET /tasks/abc]]: 400 و [[Validation failed (numeric string is expected)]]، و [[/tasks/42]] بيوصل الـ id رقم مش string.

من غير [[forbidNonWhitelisted]] (و [[whitelist]] لسه true): الطلب بيتقبل بـ 201، بس [[isAdmin]] بيتشال قبل ما يوصل للـ controller. لو وصل، يبقى [[whitelist]] مش متفعّل.`,
          solCode: R`curl -s -X POST localhost:3000/tasks -H "Content-Type: application/json" -d '{"title":"x","isAdmin":true}'
# {"message":["property isAdmin should not exist"],"error":"Bad Request","statusCode":400}
curl -s localhost:3000/tasks/abc
# {"message":"Validation failed (numeric string is expected)","error":"Bad Request","statusCode":400}`
        },
        {
          cmd: "Nest: guards و interceptors",
          title: "guards للـ auth والأدوار، و interceptors، و exception filters",
          desc: R`الـ request في Nest بيعدّي على طبقات بترتيب ثابت: middleware ← guards ← interceptors (قبل) ← pipes ← الـ controller ← interceptors (بعد) ← exception filters لو حصل خطأ.

الـ guard بيقرر «يدخل ولا لأ» (توكن صح؟ الـ role مسموح؟). الـ interceptor بيلف حوالين الـ handler (وقت، أو تغيير شكل الرد، أو كاش). والـ exception filter بيحوّل نوع خطأ معين لرد (مثلًا خطأ Prisma unique ← 409).`,
          example: R`export const Roles = Reflector.createDecorator<string[]>();

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    try {
      req.user = jwt.verify(req.headers.authorization?.replace(/^Bearer /, ""), process.env.JWT_SECRET!);
    } catch {
      throw new UnauthorizedException();
    }
    const roles = this.reflector.getAllAndOverride(Roles, [ctx.getHandler(), ctx.getClass()]);
    if (roles && !roles.includes(req.user.role)) throw new ForbiddenException();
    return true;
  }
}

@Delete(":id")
@Roles(["ADMIN"])
@HttpCode(204)
remove(@Param("id") id: string) { return this.orders.remove(id); }

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaErrorFilter implements ExceptionFilter {
  catch(err: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse();
    if (err.code === "P2002") return res.status(409).json({ statusCode: 409, error: "CONFLICT" });
    res.status(500).json({ statusCode: 500, error: "INTERNAL" });
  }
}`,
          try: R`اعمل الـ guard والـ decorator، وحطهم على controller فيه GET و DELETE. جرّب: من غير توكن، وبتوكن يوزر عادي على GET ثم DELETE، وبتوكن أدمن على DELETE. وبعدين اعمل interceptor بيطبع [[METHOD URL المدة]] وركّبه global.`,
          flag: "script",
          deep: {
            why: R`في Express كل ده middleware بترتيب انت بتظبطه بإيدك، وسهل تنسى [[requireAuth]] على route. في Nest كل مسؤولية ليها نوع، والـ decorators على الـ controller بتقولك الحماية بتاعته في سطر وانت بتقرا. والـ interviewer في وظيفة Nest هيسأل عن الترتيب ده تقريبًا أكيد.`,
            how: R`الـ guard: [[canActivate]] بيرجّع true أو false (false تبقى 403 افتراضيًا)، أو بيرمي exception بالكود اللي انت عايزه. عشان كده بنرمي [[UnauthorizedException]] للتوكن الغلط (401) و [[ForbiddenException]] للـ role (403)، والفرق مهم للواجهة (درس [[401 و 403 و 404]]). وجربنا المصفوفة دي كلها على Nest 12 بـ supertest.

[[Reflector.createDecorator]] بيعمل decorator زي [[@Roles(["ADMIN"])]] بيحط metadata على الـ method، والـ guard بيقراها بـ [[getAllAndOverride]] من الـ handler الأول وبعدين الـ class. كده تقدر تحط [[@Roles]] على الـ controller كله وتغيّره لـ route واحد.

[[@UseGuards(AuthGuard)]] على الـ controller أو الـ route. أو global بـ [[APP_GUARD]] provider وتعمل decorator [[@Public()]] للـ routes المفتوحة: كده الأصل إن كله محمي، واللي مفتوح لازم يتكتب صريح. ده أأمن. وفيه [[@nestjs/passport]] و [[@nestjs/jwt]] لو عايز strategies جاهزة، بس الـ guard اليدوي ده بيوضّح اللي بيحصل.

الـ interceptor: [[intercept(ctx, next)]] بيرجّع [[next.handle()]] وده Observable (RxJS)، فتقدر تعمل [[pipe(tap(...))]] بعد الرد، أو [[map]] تغيّر شكله. استخدامات: logging بالمدة، أو [[{ data: ... }]] حوالين كل رد، أو [[ClassSerializerInterceptor]] اللي بيشيل الحقول المعلّمة [[@Exclude()]] (زي الباسورد).

الـ filter: [[@Catch(Type)]] بيمسك النوع ده بس. خطأ Prisma [[P2002]] (unique) من غير filter بيبقى 500، ومعاه 409 بمعنى واضح. و [[P2025]] (record مش موجود في update/delete) ← 404. أي خطأ مش [[HttpException]] ومفيش filter ليه، Nest بيرجّع 500 [[Internal server error]] من غير تفاصيل، ويطبع الـ stack في اللوج.`,
            when: "guard global للـ auth في أي مشروع Nest، و Roles للأدمن. interceptor للوج والشكل الموحد. filter لأخطاء المكتبات اللي ليها معنى HTTP (Prisma و Stripe وغيرهم).",
            mistakes: R`التحقق من الـ role جوه كل method بـ if بدل guard. و guard بيرجّع false للتوكن الغلط فالواجهة تاخد 403 بدل 401. و [[@Roles]] من غير ما الـ guard يقراه أصلًا (الـ decorator لوحده مبيعملش حاجة). و filter بيمسك [[@Catch()]] كل حاجة ويرجّع رسالة الخطأ الأصلية للعميل، فبيسرّب تفاصيل القاعدة. وفي الانترفيو: «الفرق بين middleware و guard و interceptor؟» الـ guard عارف الـ handler اللي هيتنفّذ (ExecutionContext والـ metadata)، والـ middleware لأ.`
          },
          teach: R`## ٣ حتت: decorator و guard و filter

المثال فيه ٣ حاجات منفصلة: decorator اسمه [[Roles]] بيعلّم الـ route بالأدوار المسموحة، و guard بيتحقق من التوكن والدور قبل الـ handler، و exception filter بيحوّل خطأ Prisma لرد HTTP مفهوم. وفي الحل interceptor بيقيس وقت كل طلب.

جربناهم على Nest 12.1 مع Prisma 7 و Postgres في Docker، والتوكنات اتعملت بـ jsonwebtoken وسر تجريبي، والطلبات بـ curl. كل الردود تحت من التجربة دي.

---

## ١. الـ decorator: [[Reflector.createDecorator]]

~~~ts
export const Roles = Reflector.createDecorator<string[]>();
~~~

- [[Reflector]] كلاس من [[@nestjs/core]] شغلته يقرا ويكتب metadata.
- [[createDecorator<string[]>()]] بيعمل decorator جديد قيمته مصفوفة نصوص ([[string[]]]). الـ [[<...>]] هنا generic: بتقول لـ TypeScript نوع القيمة.

بعد السطر ده تقدر تكتب [[@Roles(["ADMIN"])]] فوق أي method. الـ decorator لوحده **مبيعملش أي حاجة**: بيلزق [[["ADMIN"]]] على الـ method وخلاص. اللي بيقراها هو الـ guard.

---

## ٢. الـ guard

~~~ts
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
~~~

- [[implements CanActivate]]: وعد لـ TypeScript إن الكلاس فيه method اسمها [[canActivate]]. لو نسيتها الـ build يقف.
- الـ guard provider عادي، فبيطلب [[Reflector]] في الـ constructor بالـ DI زي أي service.

~~~ts
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
~~~

[[ExecutionContext]] معلومات عن الطلب الحالي **والـ handler اللي هيتنفّذ**. ونفس الـ guard ممكن يشتغل على HTTP أو WebSocket أو microservice، فـ [[switchToHttp()]] بتقول «احنا في HTTP»، و [[getRequest()]] بيجيب الـ request بتاع Express.

### التوكن

~~~ts
    try {
      req.user = jwt.verify(req.headers.authorization?.replace(/^Bearer /, ""), process.env.JWT_SECRET!);
    } catch {
      throw new UnauthorizedException();
    }
~~~

من جوه لبرة:

1. [[req.headers.authorization]]: الـ header اللي شكله [[Bearer eyJhbGci...]].
2. [[?.]]: لو الـ header مش موجود (undefined) متكمّلش وارجع undefined بدل ما ترمي خطأ.
3. [[.replace(/^Bearer /, "")]]: شيل كلمة [[Bearer ]] من الأول. [[/.../]] regex، و [[^]] معناها «في أول النص».
4. [[process.env.JWT_SECRET!]]: السر من متغيرات البيئة. والـ [[!]] بتقول لـ TypeScript «مش undefined». من غيرها، المشروع الجديد (اللي فيه [[strict]]) مبيعملش build: [[Argument of type 'string | undefined' is not assignable...]] (جربناها).
5. [[jwt.verify(...)]]: بيتأكد من التوقيع والـ [[exp]]، ويرجّع الـ payload ([[{ sub, role, ... }]]). لو أي حاجة غلط بيرمي.
6. [[req.user = ...]]: الـ payload يتحط على الطلب، والـ controller يقراه بعدين.

و [[catch]] أي خطأ يبقى [[UnauthorizedException]] = 401:

~~~text من غير توكن، وبتوكن بايظ
HTTP/1.1 401 Unauthorized
{"message":"Unauthorized","statusCode":401}
~~~

### الدور

~~~ts
    const roles = this.reflector.getAllAndOverride(Roles, [ctx.getHandler(), ctx.getClass()]);
    if (roles && !roles.includes(req.user.role)) throw new ForbiddenException();
    return true;
~~~

- [[ctx.getHandler()]]: الـ method اللي هتتنفّذ (مثلًا [[remove]])، و [[ctx.getClass()]]: الـ controller بتاعها.
- [[getAllAndOverride(Roles, [...])]]: دوّر على قيمة [[Roles]] على الـ method الأول، ولو مش لاقي على الـ class. أول واحدة يلاقيها تكسب (override).
- [[roles &&]]: لو الـ route ملوش [[@Roles]] خالص، [[roles]] بتبقى undefined والشرط كله false، فأي يوزر داخل بتوكن صح يعدّي.
- [[!roles.includes(req.user.role)]]: الدور اللي في التوكن مش في القايمة ← [[ForbiddenException]] = 403.
- [[return true]]: عدّي للـ handler.

ليه بنرمي exceptions بدل [[return false]]؟ لأن [[false]] Nest بيحوّلها 403 دايمًا (من الـ docs)، وإحنا عايزين 401 للتوكن و 403 للدور.

---

## ٣. الـ route

~~~ts
@Delete(":id")
@Roles(["ADMIN"])
@HttpCode(204)
remove(@Param("id") id: string) { return this.orders.remove(id); }
~~~

[[@Delete(":id")]] = [[DELETE /orders/:id]]. و [[@Roles(["ADMIN"])]] الأدمن بس. و [[@HttpCode(204)]] بيغيّر الـ status الافتراضي (200) لـ 204 No Content، يعني «اتعمل ومفيش body».

المصفوفة اللي جربناها (الـ guard متركّب على الـ controller كله بـ [[@UseGuards(AuthGuard)]]):

| الطلب | الرد |
|---|---|
| GET أو DELETE من غير توكن | [[401 {"message":"Unauthorized","statusCode":401}]] |
| يوزر عادي: GET لطلبه | [[200]] والطلب |
| يوزر عادي: DELETE لطلبه | [[403 {"message":"Forbidden","statusCode":403}]] |
| توكن [[role: "ADMIN"]]: DELETE | [[204 No Content]] من غير body |

لاحظ إن الدور جاي من **التوكن**، مش من القاعدة. عشان كده التوكن لازم يتعمل من السيرفر بس، وبسر محدش يعرفه.

---

## ٤. الـ exception filter

~~~ts
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaErrorFilter implements ExceptionFilter {
  catch(err: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse();
~~~

- [[@Catch(النوع)]]: الـ filter ده بيتنادى بس لما خطأ من النوع ده يترمي. و [[PrismaClientKnownRequestError]] هو خطأ Prisma اللي ليه كود معروف.
- [[catch(err, host)]]: [[err]] الخطأ نفسه، و [[host]] زي الـ ExecutionContext، ومنه [[getResponse()]] بيجيب [[res]] بتاع Express.

~~~ts
    if (err.code === "P2002") return res.status(409).json({ statusCode: 409, error: "CONFLICT" });
    res.status(500).json({ statusCode: 500, error: "INTERNAL" });
~~~

[[P2002]] كود Prisma لـ «unique constraint اتكسر» (زي إيميل متكرر). جربنا نعمل يوزر بنفس الإيميل مرتين:

~~~text من غير الـ filter
HTTP/1.1 500 Internal Server Error
{"statusCode":500,"message":"Internal server error"}
~~~

واللوج فيه [[PrismaClientKnownRequestError]] و [[code: 'P2002']] و [[Unique constraint failed on the constraint: $__btUser_email_key$__bt]].

~~~text مع app.useGlobalFilters(new PrismaErrorFilter())
HTTP/1.1 409 Conflict
{"statusCode":409,"error":"CONFLICT"}
~~~

وأي كود Prisma تاني بيقع على السطر الأخير. جربنا DELETE لطلب اتمسح خلاص (ده [[P2025]]: «record مش موجود»): رجع [[500 {"statusCode":500,"error":"INTERNAL"}]]. لو عايزه 404 ضيف [[if (err.code === "P2025")]] قبل السطر الأخير.

---

## ٥. الـ interceptor (الحل)

~~~ts
intercept(ctx: ExecutionContext, next: CallHandler) {
  const req = ctx.switchToHttp().getRequest();
  const start = Date.now();
  return next.handle().pipe(tap(() => this.logger.log($__bt$__{req.method} $__{req.url} $__{Date.now() - start}ms$__bt)));
}
~~~

- اللي قبل [[next.handle()]] بيتنفّذ **قبل** الـ handler: هنا بنسجّل وقت البداية بـ [[Date.now()]] (ملّي ثانية من ١٩٧٠).
- [[next.handle()]] بيشغّل الـ handler ويرجّع Observable (من مكتبة RxJS): قناة الرد هيطلع منها.
- [[.pipe(tap(...))]]: [[tap]] بيتنادى لما الرد يطلع، من غير ما يغيّره. فاللي جواه بيتنفّذ **بعد** الـ handler.
- [[$__{Date.now() - start}ms]]: المدة.
- [[new Logger("HTTP")]] في الحل: اللوجر بتاع Nest، و [[HTTP]] اسم بيظهر بين قوسين.

اللوج الحقيقي من التجربة:

~~~text اللوج
[Nest] 5840  - 10/07/2026, 11:21:22 AM     LOG [HTTP] POST /users 185ms
[Nest] 5840  - 10/07/2026, 11:21:23 AM     LOG [HTTP] POST /orders 19ms
[Nest] 5840  - 10/07/2026, 11:21:23 AM     LOG [HTTP] GET /orders/cmuxu98ap0002i8ieiayks064 17ms
[Nest] 5840  - 10/07/2026, 11:21:23 AM     LOG [HTTP] DELETE /orders/cmuxu98ap0002i8ieiayks064 12ms
~~~

[[5840]] رقم الـ process. وأول [[POST /users]] أبطأ (185ms) لأن Prisma بيفتح الاتصال بالقاعدة مع أول query. ولاحظ إن الطلبات اللي رجعت 401 أو 403 مش في اللوج: الـ guard رمى قبل ما الـ interceptor يشتغل، والطلبات اللي رمت جوه الـ handler [[tap]] العادي مبيشوفهاش.

---

## الترتيب كله

| الترتيب | الطبقة | في الدرس ده |
|---|---|---|
| ١ | middleware | (مفيش) |
| ٢ | guard | [[AuthGuard]]: 401 أو 403 أو عدّي |
| ٣ | interceptor (قبل) | [[start = Date.now()]] |
| ٤ | pipe | فحص الـ body والـ params |
| ٥ | الـ handler | [[remove]] |
| ٦ | interceptor (بعد) | سطر اللوج |
| لو حصل خطأ | exception filter | [[P2002]] ← 409 |

---

## الخلاصة

- [[@Roles]] بيعلّم بس، والـ guard هو اللي بيقرا بـ [[getAllAndOverride]].
- ارمي [[UnauthorizedException]] للتوكن و [[ForbiddenException]] للدور، متعملش [[return false]].
- الـ filter بيمسك النوع اللي في [[@Catch]] بس، وأي كود مش متعامل معاه جواه بيرجع للسطر الأخير.
- الـ interceptor بيلف حوالين الـ handler: قبله عادي، وبعده جوه [[pipe(tap(...))]].`,
          lines: [
            "decorator للأدوار بـ Reflector.",
            "الـ guard provider عادي.",
            "كلاس بيطبّق CanActivate.",
            "بيطلب الـ Reflector عشان يقرا الـ metadata.",
            "بيتنادى قبل كل handler.",
            "هات الـ request بتاع Express.",
            "جرّب...",
            "...تتحقق من التوكن وتحط اليوزر على الطلب.",
            "لو غلط...",
            "...401.",
            "قفلة.",
            "اقرا [[@Roles]] من الـ method الأول وبعدين الـ class.",
            "فيه roles واليوزر مش منهم؟ 403.",
            "عدّي.",
            "قفلة.",
            "قفلة.",
            "route المسح.",
            "للأدمن بس.",
            "204 بدل 200.",
            "الـ handler.",
            "filter لأخطاء Prisma المعروفة بس.",
            "كلاس الـ filter.",
            "بيتنادى لما الخطأ ده يترمي.",
            "رد Express.",
            "unique اتكسر: 409.",
            "غير كده 500 من غير تفاصيل.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`المتوقع: من غير توكن 401 في الاتنين. يوزر عادي: GET لطلبه 200، و DELETE 403 (حتى على طلبه). أدمن: DELETE 204.

ولو يوزر عادي عمل DELETE ورجع 204، يبقى الـ guard مش بيقرا [[Roles]]: اتأكد إنك بتقرا نفس الـ decorator اللي عملته بـ [[createDecorator]]، وإن [[@Roles]] على الـ method نفسها.

والـ interceptor بيطبع سطر زي [[[HTTP] GET /orders/cm... 4ms]] بعد كل رد ناجح. (لو الـ handler رمى خطأ، الـ [[tap]] العادي مبيتناداش: استخدم [[tap({ next, error })]] أو [[finalize]] لو عايز تسجّل الأخطاء كمان.)`,
          solCode: R`@Injectable()
export class TimingInterceptor implements NestInterceptor {
  private readonly logger = new Logger("HTTP");
  intercept(ctx: ExecutionContext, next: CallHandler) {
    const req = ctx.switchToHttp().getRequest();
    const start = Date.now();
    return next.handle().pipe(tap(() => this.logger.log($__bt$__{req.method} $__{req.url} $__{Date.now() - start}ms$__bt)));
  }
}
// main.ts
app.useGlobalInterceptors(new TimingInterceptor());`
        },
        {
          cmd: "Nest: Prisma",
          title: "Prisma جوه Nest: provider واحد للتطبيق كله",
          desc: R`[[PrismaService]] كلاس بيورث من [[PrismaClient]] وعليه [[@Injectable()]]، فأي service تطلبه في الـ constructor. وبيتحط في [[PrismaModule]] عليه [[@Global()]] و [[exports]]، فمتحتاجش تعمل import ليه في كل module.

ولأن الـ provider singleton، التطبيق كله بيستخدم client واحد و pool اتصالات واحد، زي [[db.js]] في Express.`,
          example: R`// prisma.service.ts
import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  constructor() {
    super({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }) });
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}

// prisma.module.ts
@Global()
@Module({ providers: [PrismaService], exports: [PrismaService] })
export class PrismaModule {}

// main.ts
const app = await NestFactory.create(AppModule);
app.enableShutdownHooks();
await app.listen(process.env.PORT ?? 3000);`,
          try: R`حط PrismaModule في [[AppModule]] واستخدم [[PrismaService]] في service. وبعدين اعمل endpoint بيعمل يوزر بإيميل، وابعته مرتين بنفس الإيميل: بيرجع إيه من غير الـ filter بتاع الدرس اللي فات، وبيرجع إيه معاه؟`,
          flag: "script",
          deep: {
            why: R`لو كل service عملت [[new PrismaClient()]]، كل واحدة ليها pool، والقاعدة توصل للحد الأقصى من الاتصالات بسرعة. والـ DI بيخلي في الاختبار تبدّل PrismaService بـ fake من غير ما تلمس الـ service.`,
            how: R`[[extends PrismaClient]] بيخلي كل الـ models ([[this.db.order.findMany]]) موجودة على الـ service مباشرة. و Prisma 7: الـ client بيتولّد في فولدر انت محدده ([[generated/prisma]]) وبيحتاج driver adapter ([[PrismaPg]])، والتفاصيل في تاب «SQL و Prisma».

الاتصال: Prisma بيتصل لوحده مع أول query، فمش لازم [[$connect]] في [[onModuleInit]] (لو عملتها، الغلطة في الـ URL تظهر وقت البداية بدل أول طلب، ودي ميزة). و [[onModuleDestroy]] بيقفل الـ pool لما التطبيق يقفل. بس الـ hooks دي مبتتناديش على SIGTERM إلا لو [[app.enableShutdownHooks()]] في main.ts، وده اللي Docker بيبعته وقت الـ deploy.

الـ transactions: [[this.db.$transaction(async (tx) => ...)]] زي Express بالظبط (درس [[$transaction]]). ولو عايز transaction تعدّي على أكتر من service، ابعت [[tx]] كباراميتر، أو استخدم مكتبة زي [[@nestjs-cls/transactional]] (مبنية على AsyncLocalStorage، درس [[AsyncLocalStorage]]).

أخطاء Prisma ([[P2002]] وغيرها) مش HttpException، فمن غير filter بتبقى 500 (الدرس اللي فات).`,
            when: "أي مشروع Nest بـ Prisma. ولو المشروع بـ TypeORM (منتشر في مشاريع Nest القديمة)، نفس الفكرة بـ [[@nestjs/typeorm]] و repositories.",
            mistakes: R`[[new PrismaClient()]] في كل service. ونسيان [[enableShutdownHooks]] فالاتصالات متتقفلش نضيف. و PrismaModule من غير [[exports]] فالـ modules التانية مش شايفاه («can't resolve dependencies»). وإنك تحط منطق في PrismaService نفسه وتحوّله لـ service لكل حاجة.`
          },
          teach: R`## كلاس واحد بيبقى الـ client والـ provider مع بعض

[[PrismaService]] هو نفسه [[PrismaClient]] (بالوراثة)، وعليه [[@Injectable()]] عشان Nest يحقنه. والـ module بتاعه [[@Global()]] فأي service في التطبيق تطلبه من غير import. والإضافة الوحيدة: يقفل الاتصالات لما التطبيق يقفل.

جربناه بـ Nest 12.1 و Prisma 7.10 و Postgres 16 في Docker. والإغلاق جربناه في container لينكس ([[node:22-slim]]) لأن SIGTERM على ويندوز مش بيشتغل بنفس الطريقة.

---

## قبل الكود: الـ client جاي منين؟

Prisma 7 بيولّد الـ client كملفات TypeScript جوه مشروعك، في المكان اللي انت بتحدده في [[schema.prisma]]. ده الـ generator اللي جربنا بيه:

~~~text prisma/schema.prisma (أوله)
generator client {
  provider     = "prisma-client"
  output       = "../src/generated/prisma"
  moduleFormat = "esm"
}
~~~

و [[npx prisma generate]] طبع:

~~~text الناتج
✔ Generated Prisma Client (7.10.0) to .\src\generated\prisma in 42ms
~~~

عشان كده الـ import في المثال [[./generated/prisma/client.js]] مش [[@prisma/client]]. والمسار نسبي للملف: لو [[prisma.service.ts]] جوه [[src/prisma/]] يبقى [[../generated/prisma/client.js]]. و [[.js]] في الآخر رغم إن الملف [[.ts]]: ده شرط ESM في Node، بتكتب الامتداد اللي هيبقى موجود بعد الـ build.

---

## ١. الـ imports

~~~ts
import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";
~~~

- [[OnModuleDestroy]]: interface فيه method واحدة [[onModuleDestroy]]، و Nest بينادي عليها وهو بيقفل.
- [[PrismaPg]]: الـ driver adapter. في Prisma 7، Prisma بيكلّم Postgres من خلال درايفر [[pg]] العادي، والـ adapter هو الوصلة.

---

## ٢. الكلاس

~~~ts
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
~~~

- [[extends PrismaClient]]: [[PrismaService]] **هو** [[PrismaClient]] + أي حاجة نضيفها. فكل الجداول موجودة عليه: [[this.db.order.findFirst]] و [[this.db.user.create]].
- [[implements OnModuleDestroy]]: وعد إن فيه [[onModuleDestroy]].

~~~ts
  constructor() {
    super({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }) });
  }
~~~

- [[super(...)]]: نادي الـ constructor بتاع الأب ([[PrismaClient]]). لازم في أي كلاس بيورث وعنده constructor.
- [[new PrismaPg({ connectionString })]]: الـ adapter برابط القاعدة، وشكل الرابط [[postgresql://user:password@host:port/db]].
- [[process.env.DATABASE_URL!]]: الرابط من البيئة، و [[!]] عشان [[strict]] (نفس قصة [[JWT_SECRET!]]).

الـ constructor ده بيتنادى **مرة واحدة**: الـ provider في Nest singleton، يعني نسخة واحدة للتطبيق كله، و pool اتصالات واحد.

~~~ts
  async onModuleDestroy() {
    await this.$disconnect();
  }
~~~

[[$disconnect()]] بيقفل كل اتصالات الـ pool. والـ [[$]] في أول الاسم عادة Prisma للدوال اللي مش جداول ([[$transaction]] و [[$executeRaw]])، عشان متتلخبطش مع جدول اسمه [[disconnect]].

---

## ٣. الـ module

~~~ts
@Global()
@Module({ providers: [PrismaService], exports: [PrismaService] })
export class PrismaModule {}
~~~

- [[providers: [PrismaService]]]: Nest يعمله.
- [[exports: [PrismaService]]]: مسموح يطلع برّه الـ module.
- [[@Global()]]: أي module في التطبيق يشوف الـ exports دي من غير ما يكتب [[imports: [PrismaModule]]]. بس [[AppModule]] لازم يستورده مرة واحدة.

ولما التطبيق قام:

~~~text من لوج البداية
[InstanceLoader] PrismaModule dependencies initialized +13ms
~~~

---

## ٤. [[main.ts]]

~~~ts
const app = await NestFactory.create(AppModule);
app.enableShutdownHooks();
await app.listen(process.env.PORT ?? 3000);
~~~

- [[NestFactory.create(AppModule)]]: ابني التطبيق من الـ module الرئيسي (هنا كل الـ providers بتتعمل).
- [[app.listen(process.env.PORT ?? 3000)]]: اسمع على البورت. [[??]] معناها «لو اللي على الشمال undefined أو null خد اللي على اليمين».
- [[app.enableShutdownHooks()]]: خلي Nest يسمع على signals زي SIGTERM، ولما توصل ينادي [[onModuleDestroy]] على كل الـ providers.

### جربنا الفرق

شغّلنا التطبيق في container لينكس، وبعتنا [[kill -TERM]] للـ process:

~~~text مع enableShutdownHooks
>>> kill -TERM 9
onModuleDestroy: $disconnect
Terminated
>>> exit code: 143
~~~

~~~text من غيرها
>>> kill -TERM 9
Terminated
>>> exit code: 143
~~~

(سطر [[onModuleDestroy: $disconnect]] من [[console.log]] حطيناه جوه الـ method عشان نشوفها.) من غير الـ hooks الـ process ماتت والاتصالات اتقطعت من غير ما تتقفل. و [[143]] = 128 + 15، و 15 رقم SIGTERM: Nest بعد ما يخلّص الـ hooks بيبعت نفس الـ signal لنفسه، فالـ process بتخرج كأنها اتقفلت بـ SIGTERM.

---

## «جرّب»: إيميل متكرر

الحل بيعمل route بيعمل يوزر:

~~~ts
@Post("users")
create(@Body({ schema: z.object({ email: z.email() }) }) dto: { email: string }) {
  return this.db.user.create({ data: dto });
}
~~~

[[z.email()]] في Zod 4 بيفحص شكل الإيميل. والنتايج:

| الطلب | الرد |
|---|---|
| أول مرة [[{"email":"user@test.local"}]] | 201 واليوزر |
| [[{"email":"nope"}]] | [[400 {"message":["email: Invalid email address"],...}]] |
| نفس الإيميل تاني، من غير filter | [[500 {"statusCode":500,"message":"Internal server error"}]] |
| نفس الإيميل تاني، مع [[PrismaErrorFilter]] | [[409 {"statusCode":409,"error":"CONFLICT"}]] |

---

## الخلاصة

- [[PrismaService extends PrismaClient]] + [[@Injectable()]] = client واحد متحقن في كل حتة.
- [[@Global()]] + [[exports]] عشان متكررش الـ import، و [[AppModule]] يستورده مرة.
- [[onModuleDestroy]] مبتتناداش على SIGTERM إلا لو [[app.enableShutdownHooks()]].
- في Prisma 7 الـ client جاي من فولدر [[generated]] بتاعك، ومحتاج driver adapter.`,
          lines: [
            "decorators و hook الإغلاق.",
            "الـ driver adapter لـ Postgres.",
            "الـ client المتولّد (Prisma 7).",
            "provider ينفع يتحقن.",
            "بيورث كل حاجة من PrismaClient.",
            "الـ constructor.",
            "ابني الـ client بالـ adapter ورابط القاعدة.",
            "قفلة.",
            "لما التطبيق يقفل...",
            "...اقفل الـ pool.",
            "قفلة.",
            "قفلة.",
            "الـ module متاح في كل حتة.",
            "بيعمل PrismaService ويصدّره.",
            "كلاس الـ module.",
            "اعمل التطبيق.",
            "خلي SIGTERM يشغّل الـ hooks (onModuleDestroy).",
            "اسمع على البورت."
          ],
          sol: R`من غير filter: الطلب التاني بيرجع 500 و [[{"statusCode":500,"message":"Internal server error"}]]، واللوج فيه [[PrismaClientKnownRequestError]] كوده [[P2002]]. 500 غلط هنا، لأن ده خطأ من العميل (الإيميل مستخدم).

مع [[PrismaErrorFilter]] مركّب global ([[app.useGlobalFilters(new PrismaErrorFilter())]]): 409 و [[{"statusCode":409,"error":"CONFLICT"}]].

والأحسن كمان إن الـ service تتحقق وترمي [[ConflictException("Email already used")]] برسالة واضحة، والـ filter يفضل شبكة أمان لأي unique تاني نسيته.`,
          solCode: R`@Post("users")
create(@Body({ schema: z.object({ email: z.email() }) }) dto: { email: string }) {
  return this.db.user.create({ data: dto });
}
// curl -X POST ... -d '{"email":"a@b.co"}'  → 201
// نفس الطلب تاني بدون filter → 500
// نفس الطلب تاني مع PrismaErrorFilter → 409 {"statusCode":409,"error":"CONFLICT"}`
        },
        {
          cmd: "Nest: الاختبارات",
          title: "testing module: unit بـ fake، و e2e بـ supertest",
          desc: R`[[Test.createTestingModule]] بيبني نفس الـ DI بتاع التطبيق في الاختبار. للـ unit: بتدّيله الـ service وتبدّل الـ dependencies بـ [[overrideProvider(...).useValue(fake)]]. وللـ e2e: بتستورد [[AppModule]] كله، وتعمل [[createNestApplication()]]، وتبعت طلبات بـ supertest على [[app.getHttpServer()]].

نفس أفكار قسم الاختبارات بالظبط: قاعدة اختبار، و TRUNCATE، ومصفوفة 401 و 403 و 404.`,
          example: R`let app: INestApplication;
let db: PrismaService;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
  app = setupApp(moduleRef.createNestApplication());
  await app.init();
  db = moduleRef.get(PrismaService);
});
beforeEach(() => db.$executeRawUnsafe('TRUNCATE TABLE "Order", "User" CASCADE'));
afterAll(() => app.close());

it("404 for another user's order", async () => {
  const [a, b] = [await db.user.create({ data: { email: "a@t.l" } }), await db.user.create({ data: { email: "b@t.l" } })];
  const order = await db.order.create({ data: { userId: a.id, amountCents: 100 } });
  const res = await request(app.getHttpServer()).get($__bt/api/orders/$__{order.id}$__bt).set("Authorization", $__btBearer $__{tokenFor(b)}$__bt);
  expect(res.status).toBe(404);
});

it("unit: NotFound when the order is not mine", async () => {
  const moduleRef = await Test.createTestingModule({ providers: [OrdersService, PrismaService] })
    .overrideProvider(PrismaService).useValue({ order: { findFirst: async () => null } })
    .compile();
  await expect(moduleRef.get(OrdersService).findMine("u1", "o1")).rejects.toMatchObject({ status: 404 });
});`,
          try: R`اكتب e2e لـ [[POST /api/orders]]: body صح 201، و [[amountCents: "x"]] 400. وخلي بالك: لازم تستخدم نفس إعداد الـ app اللي في main.ts (الـ pipes والـ prefix)، وإلا الـ 400 مش هيرجع (في تجربتنا رجع 500، لأن Prisma هو اللي رفض الـ [["x"]]). وبعدين اكتب unit للـ service بـ fake PrismaService.`,
          flag: "script",
          deep: {
            why: R`اختبار Nest من غير الـ testing module معناه تعمل كل الـ services بإيدك بالترتيب، وتفوّت الـ guards والـ pipes. والـ e2e هو اللي بيثبت إن كل الطبقات (guard و pipe و filter) متركّبة صح، ودي أكتر حاجة بتبوظ لما حد يعدّل main.ts.`,
            how: R`[[createNestApplication()]] بيعمل التطبيق بس مبيعملش listen، و supertest بياخد [[app.getHttpServer()]] (نفس فكرة [[app و server]]). و [[app.init()]] لازم قبل الطلبات، و [[app.close()]] في الآخر بيشغّل [[onModuleDestroy]] ويقفل Prisma.

[[setupApp(app)]]: الـ pipes والـ filters والـ prefix اللي في main.ts مش جزء من AppModule، فلو الاختبار معملهمش، هتختبر تطبيق غير اللي بيشتغل. عشان كده دالة واحدة بتعملهم، و main.ts والاختبار الاتنين بينادوها. (البديل: تسجّلهم كـ providers بـ [[APP_PIPE]] و [[APP_FILTER]] جوه الـ module، فيبقوا جزء منه.)

[[overrideProvider(X).useValue(fake)]] بيبدّل الـ provider في الـ DI، و [[moduleRef.get(OrdersService)]] بيجيب الـ instance بالـ fake جواه. في الـ unit مش محتاج [[createNestApplication]] خالص.

الأداة: مشروع Nest 12 الجديد ([[nest new]]) بيطلع بـ Vitest 4 وملفين config جاهزين ([[vitest.config.ts]] و [[vitest.config.e2e.ts]])، و Jest لسه منتشر جدًا في المشاريع الموجودة. Vitest 4 (فوق Vite 8) بيطلّع الـ decorator metadata من [[emitDecoratorMetadata]] في tsconfig لوحده، فالـ DI بالـ types شغال من غير أي إضافة (جربناها على Vitest 4.1). أما Vitest 3 وأقدم (esbuild) مبيطلّعهاش (جربنا: [[design:paramtypes]] طلعت undefined)، فلو مشروعك عليهم محتاج SWC: باكدج [[unplugin-swc]] في vitest.config بـ [[decoratorMetadata: true]]. و [[fileParallelism: false]] زي قسم الاختبارات لأن القاعدة مشتركة.`,
            when: "e2e لكل controller (الحالة الناجحة، والـ validation، ومصفوفة الصلاحيات). unit للـ services اللي فيها منطق حقيقي (حسابات أو قرارات). ومتعملش unit لـ service بتعمل findMany وخلاص.",
            mistakes: R`e2e من غير نفس الـ pipes اللي في main.ts، فالـ validation متختبرش. و mock للـ PrismaService في الـ e2e فبتختبر الـ mock. ونسيان [[app.close()]] فـ vitest يفضل مستني. و Vitest 3 أو أقدم من غير SWC فتلاقي «Nest can't resolve dependencies» في الاختبار بس، والتطبيق شغال.`
          },
          teach: R`## نوعين اختبارات في ملف واحد

المثال فيه اختبار **e2e** (end to end): التطبيق كله بيقوم بالـ DI الحقيقي والقاعدة الحقيقية، و supertest بيبعتله طلب HTTP زي أي عميل. واختبار **unit**: الـ service لوحدها، والـ dependency بتاعتها (Prisma) متبدّلة بـ fake.

جربناهم على Nest 12.1 و Vitest 4.1 و supertest 7.3 وقاعدة اختبار Postgres في Docker، بالإعداد اللي في الحل:

~~~text الناتج
 Test Files  1 passed (1)
      Tests  3 passed (3)
   Duration  1.70s
~~~

(التلاتة: الاتنين اللي في المثال، و «201 then 400» اللي في الحل.)

---

## ١. التجهيز

~~~ts
let app: INestApplication;
let db: PrismaService;
~~~

متغيرين برّه كل الاختبارات عشان الكل يشوفهم. [[INestApplication]] نوع التطبيق في Nest.

~~~ts
beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
~~~

- [[beforeAll]]: تتنفّذ **مرة واحدة** قبل كل الاختبارات اللي في الملف.
- [[Test.createTestingModule({...})]] من [[@nestjs/testing]]: بتبني module للاختبار. و [[imports: [AppModule]]] يعني «كل التطبيق».
- [[.compile()]]: يعمل كل الـ providers ويحل الـ DI. ده نفس اللي [[NestFactory.create]] بيعمله وقت التشغيل. والنتيجة [[moduleRef]]: مرجع تجيب منه أي provider.

~~~ts
  app = setupApp(moduleRef.createNestApplication());
  await app.init();
~~~

- [[createNestApplication()]]: اعمل تطبيق HTTP من الـ module، **من غير listen** على بورت.
- [[setupApp(...)]]: دالة بتعملها انت، فيها كل اللي [[main.ts]] بيضيفه على التطبيق (الـ pipes والـ filters والـ prefix). [[main.ts]] بيناديها، والاختبار بيناديها. ليه؟ شوف «لو نسيتها» تحت.
- [[app.init()]]: شغّل الـ lifecycle hooks وسجّل الـ routes. من غيرها الطلبات مش هتلاقي routes.

~~~ts
  db = moduleRef.get(PrismaService);
});
~~~

[[moduleRef.get(PrismaService)]]: هات نفس نسخة Prisma اللي التطبيق بيستخدمها، عشان نجهّز بيها بيانات الاختبار.

~~~ts
beforeEach(() => db.$executeRawUnsafe('TRUNCATE TABLE "Order", "User" CASCADE'));
afterAll(() => app.close());
~~~

- [[beforeEach]]: قبل **كل** اختبار. [[TRUNCATE]] بيفضّي الجداول، و [[CASCADE]] بيفضّي اللي معتمد عليها كمان. كده كل اختبار بيبدأ من قاعدة نضيفة ومش متأثر باللي قبله. و [[$executeRawUnsafe]] بتشغّل SQL نصي (Unsafe لأنها مش بتحمي من SQL injection، وده مقبول هنا لأن النص ثابت ومفيهوش input).
- [[afterAll(() => app.close())]]: في الآخر اقفل التطبيق، فـ [[onModuleDestroy]] يتنادى ويقفل Prisma. من غيرها Vitest ممكن يفضل مستني اتصالات مفتوحة.

---

## ٢. اختبار e2e: طلب حد تاني = 404

~~~ts
it("404 for another user's order", async () => {
  const [a, b] = [await db.user.create({ data: { email: "a@t.l" } }), await db.user.create({ data: { email: "b@t.l" } })];
  const order = await db.order.create({ data: { userId: a.id, amountCents: 100 } });
~~~

- [[it("الاسم", async () => {...})]]: اختبار واحد.
- [[const [a, b] = [...]]]: destructuring، أول عنصر في [[a]] والتاني في [[b]]. يعني يوزرين.
- طلب واحد بتاع [[a]].

~~~ts
  const res = await request(app.getHttpServer()).get($__bt/api/orders/$__{order.id}$__bt).set("Authorization", $__btBearer $__{tokenFor(b)}$__bt);
  expect(res.status).toBe(404);
});
~~~

من جوه لبرة:

1. [[app.getHttpServer()]]: الـ HTTP server اللي جوه التطبيق (من غير بورت).
2. [[request(...)]] من supertest: بيشغّل السيرفر ده على بورت مؤقت ويبعتله.
3. [[.get($__bt/api/orders/$__{order.id}$__bt)]]: GET على طلب [[a]]. والـ [[$__bt...$__bt]] template string، و [[$__{...}]] جواه بيحط القيمة.
4. [[.set("Authorization", ...)]]: header بتوكن [[b]]. [[tokenFor]] دالة مساعدة بتعملها انت (بتعمل [[jwt.sign]] بالسر بتاع الاختبار).
5. [[expect(res.status).toBe(404)]]: [[b]] مش صاحب الطلب، فلازم 404.

---

## ٣. اختبار unit: الـ service من غير قاعدة

~~~ts
  const moduleRef = await Test.createTestingModule({ providers: [OrdersService, PrismaService] })
    .overrideProvider(PrismaService).useValue({ order: { findFirst: async () => null } })
    .compile();
~~~

- [[providers: [OrdersService, PrismaService]]]: module صغير فيه الـ service واللي محتاجاه بس، مش التطبيق كله.
- [[.overrideProvider(PrismaService).useValue({...})]]: «لما حد يطلب [[PrismaService]] ادّيله الـ object ده بدله». والـ object ده فيه اللي الـ service بتستخدمه بس: [[order.findFirst]] بترجّع [[null]] على طول. محدش بيتصل بقاعدة.

~~~ts
  await expect(moduleRef.get(OrdersService).findMine("u1", "o1")).rejects.toMatchObject({ status: 404 });
~~~

- [[moduleRef.get(OrdersService)]]: الـ service والـ fake متحقن جواها.
- [[expect(promise).rejects]]: «الـ Promise دي لازم تترفض».
- [[.toMatchObject({ status: 404 })]]: والخطأ اللي رفضها فيه [[status: 404]] (ده اللي [[NotFoundException]] فيه).

ده الفايدة العملية من الـ DI: الـ service مبتعملش [[new PrismaService()]]، فتقدر تدّيها أي حاجة.

---

## ٤. الإعداد (الحل)

~~~ts
export default defineConfig({
  test: {
    globals: true,
    include: ["**/*.e2e-spec.ts"],
    env: { DATABASE_URL: "postgresql://app:app@localhost:5432/myapp_test", JWT_SECRET: "test-secret" },
    fileParallelism: false,
  },
});
~~~

| الإعداد | معناه |
|---|---|
| [[globals: true]] | [[it]] و [[expect]] و [[beforeAll]] متاحين من غير import |
| [[include]] | الملفات اللي بتتشغل. [[**]] أي فولدر، و [[*.e2e-spec.ts]] أي ملف بالنهاية دي |
| [[env]] | متغيرات بيئة للاختبار: قاعدة **تانية** غير قاعدة التطوير، وسر تجريبي |
| [[fileParallelism: false]] | الملفات تتشغل ورا بعض، لأن كلهم بيعملوا TRUNCATE لنفس القاعدة |

وده تقريبًا الملف اللي [[nest new]] بيعمله ([[vitest.config.e2e.ts]])، مضاف عليه [[env]] و [[fileParallelism]]. ومش محتاج SWC: Vitest 4 بيطلّع الـ decorator metadata لوحده. جربنا نقرا [[Reflect.getMetadata("design:paramtypes", OrdersService)]] جوه اختبار: Vitest 4.1 رجّع [[["PrismaService"]]]، و Vitest 3.2 رجّع [[undefined]] (يعني Nest مش هيعرف يحقن حاجة).

---

## لو نسيت [[setupApp]] أو الـ prefix

جربنا نشيل [[setupApp]] من الاختبار (والمسارات من غير [[/api]]):

~~~text الناتج
FAIL  > 201 then 400
AssertionError: expected 500 to be 400 // Object.is equality
~~~

مفيش pipe، فالـ [["x"]] عدّى الـ controller ووصل لـ Prisma، و Prisma رفضه بخطأ مش HTTP فبقى 500. الاختبار بيقول إن التطبيق بايظ، والحقيقة إن التطبيق اللي بيشتغل فيه pipe والاختبار هو اللي ناقص.

وجربنا نسيب [[setupApp]] بس نطلب [[/orders]] بدل [[/api/orders]]:

~~~text الناتج
AssertionError: expected 404 to be 201 // Object.is equality
      Tests  1 failed | 2 passed (3)
~~~

والخطير إن اختبار «404 for another user's order» **نجح**: الـ 404 جه لأن الـ route مش موجود أصلًا، مش لأن الـ ownership شغال. عشان كده اختبار 404 لوحده ميكفيش، لازم معاه حالة ناجحة (200 لصاحب الطلب).

---

## الخلاصة

| | e2e | unit |
|---|---|---|
| بيبني | [[imports: [AppModule]]] | [[providers: [...]]] اللي محتاجه بس |
| القاعدة | حقيقية (قاعدة اختبار) | fake بـ [[overrideProvider]] |
| بيختبر | الـ guards والـ pipes والـ filters والـ routes | منطق الـ service |
| محتاج [[createNestApplication]] | أيوه، ومعاه [[setupApp]] و [[init]] | لأ |

- [[setupApp]] واحدة لـ [[main.ts]] والاختبار، وإلا هتختبر تطبيق غير اللي شغال.
- [[TRUNCATE]] قبل كل اختبار، و [[app.close()]] في الآخر.`,
          lines: [
            "التطبيق للاختبارات.",
            "الـ Prisma للتجهيز والتنضيف.",
            "مرة قبل الكل...",
            "...ابني AppModule كله بالـ DI.",
            "اعمل التطبيق بنفس إعداد main.ts (pipes و prefix و filters).",
            "جهّزه من غير listen.",
            "هات PrismaService من الـ DI.",
            "قفلة.",
            "فضّي الجداول قبل كل اختبار.",
            "في الآخر اقفل التطبيق (و Prisma معاه).",
            "اختبار الـ ownership.",
            "يوزرين.",
            "طلب بتاع A.",
            "B يطلب طلب A.",
            "404.",
            "قفلة.",
            "unit test.",
            "module فيه الـ service والـ dependency...",
            "...والـ dependency اتبدّلت بـ fake بيرجّع null.",
            "ابنيه.",
            "الـ service لازم ترمي 404.",
            "قفلة."
          ],
          sol: R`المتوقع: الـ 201 و الـ 400 الاتنين بينجحوا، ورسالة الـ 400 من Zod زي [[amountCents: Invalid input: expected number, received string]]. والـ unit بينجح من غير قاعدة بيانات خالص.

لو الـ 400 طلع حاجة تانية، الاختبار مش بيستخدم [[setupApp]] (مفيش pipe): في تجربتنا رجع 500، لأن الـ [["x"]] وصل لحد Prisma وهو اللي رفضه. ولو ظهر 404 على كل الـ routes، الـ prefix [[api]] مش متظبط في الاختبار (وساعتها اختبار الـ 404 بتاع الـ ownership بينجح غلط!). ولو Vitest 3 أو أقدم قال «Expression expected» عند [[@Module]]، محتاج SWC للـ decorators.

الإعداد اللي جربناه (Vitest 4.1، الملف اللي [[nest new]] بيعمله وضفنا عليه [[env]] و [[fileParallelism]]) في الكود.`,
          solCode: R`// vitest.config.e2e.ts (Vitest 4: مش محتاج SWC)
import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    globals: true,
    include: ["**/*.e2e-spec.ts"],
    env: { DATABASE_URL: "postgresql://app:app@localhost:5432/myapp_test", JWT_SECRET: "test-secret" },
    fileParallelism: false,
  },
});

// test/orders.e2e-spec.ts
it("201 then 400", async () => {
  const u = await db.user.create({ data: { email: "a@t.l" } });
  const auth = { Authorization: $__btBearer $__{tokenFor(u)}$__bt };
  expect((await request(app.getHttpServer()).post("/api/orders").set(auth).send({ amountCents: 500 })).status).toBe(201);
  expect((await request(app.getHttpServer()).post("/api/orders").set(auth).send({ amountCents: "x" })).status).toBe(400);
});`
        }
      ]
    }
]);
