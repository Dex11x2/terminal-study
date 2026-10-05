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
  findOne(@Req() req, @Param("id") id: string) {
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
          sol: R`لما تشيل [[TasksService]] من [[providers]] وتشغّل، Nest بيقف وقت البداية (مش وقت أول طلب) برسالة زي: [[Nest can't resolve dependencies of the TasksController (?). Please make sure that the argument TasksService at index [0] is available in the TasksModule context.]]

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
create(@Req() req, @Body({ schema: CreateOrderSchema }) dto: CreateOrderDto) { return this.orders.create(req.user.sub, dto); }`,
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
      req.user = jwt.verify(req.headers.authorization?.replace(/^Bearer /, ""), process.env.JWT_SECRET);
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
          try: R`اكتب e2e لـ [[POST /api/orders]]: body صح 201، و [[amountCents: "x"]] 400. وخلي بالك: لازم تستخدم نفس إعداد الـ app اللي في main.ts (الـ pipes والـ prefix)، وإلا الـ 400 هيبقى 201. وبعدين اكتب unit للـ service بـ fake PrismaService.`,
          flag: "script",
          deep: {
            why: R`اختبار Nest من غير الـ testing module معناه تعمل كل الـ services بإيدك بالترتيب، وتفوّت الـ guards والـ pipes. والـ e2e هو اللي بيثبت إن كل الطبقات (guard و pipe و filter) متركّبة صح، ودي أكتر حاجة بتبوظ لما حد يعدّل main.ts.`,
            how: R`[[createNestApplication()]] بيعمل التطبيق بس مبيعملش listen، و supertest بياخد [[app.getHttpServer()]] (نفس فكرة [[app و server]]). و [[app.init()]] لازم قبل الطلبات، و [[app.close()]] في الآخر بيشغّل [[onModuleDestroy]] ويقفل Prisma.

[[setupApp(app)]]: الـ pipes والـ filters والـ prefix اللي في main.ts مش جزء من AppModule، فلو الاختبار معملهمش، هتختبر تطبيق غير اللي بيشتغل. عشان كده دالة واحدة بتعملهم، و main.ts والاختبار الاتنين بينادوها. (البديل: تسجّلهم كـ providers بـ [[APP_PIPE]] و [[APP_FILTER]] جوه الـ module، فيبقوا جزء منه.)

[[overrideProvider(X).useValue(fake)]] بيبدّل الـ provider في الـ DI، و [[moduleRef.get(OrdersService)]] بيجيب الـ instance بالـ fake جواه. في الـ unit مش محتاج [[createNestApplication]] خالص.

الأداة: Nest 12 نفسه بيستخدم Vitest في اختباراته، و Jest لسه منتشر جدًا في المشاريع الموجودة. مع Vitest لازم SWC (باكدج [[unplugin-swc]] في vitest.config) لأن esbuild الافتراضي مبيطلّعش decorator metadata، فالـ DI بالـ types مبيشتغلش (جربناها: من غير إعداد الـ decorators في SWC الملف مبيعملش parse أصلًا). و [[fileParallelism: false]] زي قسم الاختبارات لأن القاعدة مشتركة.`,
            when: "e2e لكل controller (الحالة الناجحة، والـ validation، ومصفوفة الصلاحيات). unit للـ services اللي فيها منطق حقيقي (حسابات أو قرارات). ومتعملش unit لـ service بتعمل findMany وخلاص.",
            mistakes: R`e2e من غير نفس الـ pipes اللي في main.ts، فالـ validation متختبرش. و mock للـ PrismaService في الـ e2e فبتختبر الـ mock. ونسيان [[app.close()]] فـ vitest يفضل مستني. و Vitest من غير SWC فتلاقي «Nest can't resolve dependencies» في الاختبار بس، والتطبيق شغال.`
          },
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

لو الـ 400 طلع 201، الاختبار مش بيستخدم [[setupApp]] (مفيش pipe). ولو ظهر 404 على كل الـ routes، الـ prefix [[api]] مش متظبط في الاختبار. ولو vitest قال «Expression expected» عند [[@Module]]، SWC مش متظبط للـ decorators.

الإعداد اللي جربناه لـ Vitest في الكود.`,
          solCode: R`// vitest.config.ts
import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";
export default defineConfig({
  plugins: [swc.vite({ jsc: { parser: { syntax: "typescript", decorators: true }, transform: { legacyDecorator: true, decoratorMetadata: true }, target: "es2022" } })],
  test: { env: { DATABASE_URL: "postgresql://app:app@localhost:5432/myapp_test", JWT_SECRET: "test-secret" }, fileParallelism: false },
});

// test/orders.e2e.test.ts
it("201 then 400", async () => {
  const u = await db.user.create({ data: { email: "a@t.l" } });
  const auth = { Authorization: $__btBearer $__{tokenFor(u)}$__bt };
  expect((await request(app.getHttpServer()).post("/api/orders").set(auth).send({ amountCents: 500 })).status).toBe(201);
  expect((await request(app.getHttpServer()).post("/api/orders").set(auth).send({ amountCents: "x" })).status).toBe(400);
});`
        }
      ]
    },
    {
      t: "أسئلة انترفيو Backend بـ Node",
      l: 3,
      n: "الأسئلة اللي بتتكرر في انترفيوهات Node و Express، بإجابة تقولها بصوتك في دقيقة، والأسئلة اللي بتيجي بعدها",
      items: [
        {
          cmd: "event loop و blocking",
          title: "Node single-threaded، إزاي بيخدم آلاف الطلبات؟ (event loop)",
          desc: R`الـ JavaScript بتاعي بيشتغل على thread واحد، بس الـ I/O (الشبكة والقاعدة والملفات) مش بيستناه: Node بيطلب العملية من نظام التشغيل أو من thread pool بتاع libuv، ويكمّل يخدم طلبات تانية، ولما النتيجة تيجي الـ callback بتاعها يدخل طابور والـ event loop ينفّذه. فطول ما كل طلب معظم وقته مستني I/O، thread واحد بيكفي آلاف الاتصالات.

المشكلة الحقيقية الـ blocking: أي كود CPU طويل (loop على مليون عنصر، أو [[JSON.parse]] لملف ضخم، أو دالة Sync) بيوقّف الـ loop فكل الطلبات بتستنى. الحل: worker_threads، أو queue، أو تقسيم الشغل.`,
          example: R`console.log("1 sync");
setTimeout(() => console.log("timeout"), 0);
setImmediate(() => console.log("immediate"));
Promise.resolve().then(() => console.log("promise"));
process.nextTick(() => console.log("nextTick"));
console.log("2 sync");
// CommonJS: 1 sync, 2 sync, nextTick, promise, timeout, immediate`,
          try: R`شغّل الكود مرة كـ [[.cjs]] ومرة كـ [[.mjs]]، وقارن مكان [[nextTick]] و [[promise]]. وبعدين حط الـ setTimeout والـ setImmediate جوه callback بتاع [[fs.readFile]] وشوف مين الأول.`,
          flag: "script",
          deep: {
            why: "أشهر سؤال Node على الإطلاق. بيختبر إنك فاهم ليه Node سريع في الـ I/O وضعيف في الـ CPU، وده بيأثر على كل قرار: إمتى تستخدم Sync، وإمتى worker، وإزاي تكتشف إن السيرفر «مهنّج».",
            how: R`الترتيب: الكود الـ sync كله الأول. بعده microtasks: طابور [[process.nextTick]] وطابور الـ promises، وبيتفضّوا بالكامل بعد كل task. بعدها مراحل الـ loop: timers ([[setTimeout]] و [[setInterval]])، ثم poll (callbacks الـ I/O)، ثم check ([[setImmediate]])، ثم close callbacks.

تفصيلة جربناها: في CommonJS الـ nextTick قبل الـ promise. في ESM ([[.mjs]] أو [[type: module]]) الـ promise طلع قبل الـ nextTick، لأن الموديول نفسه بيتنفّذ جوه microtask فطابور الـ promises بيتفضى الأول. والـ timeout والـ immediate في المستوى الأعلى ترتيبهم مش مضمون، بس جوه callback بتاع I/O الـ immediate دايمًا الأول.

thread pool بتاع libuv (افتراضيًا ٤ threads، [[UV_THREADPOOL_SIZE]]) بيعمل fs و dns.lookup و crypto (pbkdf2 و scrypt) و zlib. الشبكة (TCP) مش بتستخدمه، بتعتمد على epoll/kqueue في النظام. عشان كده ٤ عمليات bcrypt تقيلة مع بعض ممكن تبطّأ قراية الملفات.

وتكتشف الـ blocking إزاي؟ [[perf_hooks.monitorEventLoopDelay()]] بيقيس التأخير، ولو p99 فوق ١٠٠ms فيه حاجة بتوقّف. و [[node --cpu-prof]] أو clinic.js يوريك الدالة. والتفاصيل الأعمق للـ event loop في JavaScript نفسها في درس [[event loop]] في تاب «JavaScript».`,
            when: R`أسئلة بعدها: «الفرق بين nextTick و setImmediate؟» (الأسماء معكوسة: nextTick أسرع). «إزاي تعمل حاجة تقيلة من غير ما تبلوك؟» (worker_threads أو queue، درس [[worker_threads و cluster]]). «Node multi-threaded ولا لأ؟» (الـ JS بتاعك thread واحد، و Node نفسه فيه threads للـ libuv والـ GC). «إمتى Node اختيار وحش؟»`,
            mistakes: R`«Node multi-threaded» أو «Node single-threaded فمينفعش يعمل حاجتين مع بعض»: الاتنين غلط. و «async بيخلي الكود أسرع»: async بيخلي السيرفر فاضي لغيرك وانت مستني، مش بيسرّع الحساب نفسه. و «setTimeout(fn, 0) بيتنفّذ فورًا». و nextTick recursion بيجوّع الـ loop ومفيش I/O يتنفّذ.`
          },
          lines: [
            "sync.",
            "timer: مرحلة timers.",
            "مرحلة check.",
            "microtask.",
            "طابور nextTick (microtask برضه، ليه أولوية في CommonJS).",
            "sync."
          ],
          sol: R`CommonJS: [[1 sync]]، [[2 sync]]، [[nextTick]]، [[promise]]، [[timeout]]، [[immediate]].

ESM: [[1 sync]]، [[2 sync]]، [[promise]]، [[nextTick]]، وبعدين الاتنين التانيين. السبب إن الـ ESM بيتنفّذ من جوه microtask، فالـ promises بتخلص الأول قبل ما Node يرجع لطابور الـ nextTick.

وجوه [[readFile]]: [[immediate]] قبل [[timeout]] دايمًا، لأن بعد مرحلة الـ poll (اللي فيها callback الـ I/O) الـ loop بيروح على check (setImmediate) قبل ما يلف للـ timers تاني. وفي المستوى الأعلى ترتيب timeout و immediate ممكن يتغير من تشغيلة للتانية.`,
          solCode: R`const { readFile } = require("node:fs");
readFile(__filename, () => {
  setTimeout(() => console.log("timeout in I/O"), 0);
  setImmediate(() => console.log("immediate in I/O"));
});
// immediate in I/O
// timeout in I/O`
        },
        {
          cmd: "next() والترتيب",
          title: "إزاي middleware بيشتغل في Express؟ وليه الترتيب مهم؟ (middleware order)",
          desc: R`Express بيمشي على الـ middleware والـ routes بالترتيب اللي اتسجّلوا بيه. كل واحد يا إما يرد ويقفل الطلب، يا إما ينادي [[next()]] فالطلب يروح للي بعده، يا إما [[next(err)]] فيقفز على طول لأول error middleware (اللي ليه ٤ باراميترز).

فالترتيب هو المنطق: parsing و security headers و CORS و rate limit الأول، وبعدين auth، وبعدين الـ routes، وبعدين 404، وفي الآخر الـ error handler. وأي route متسجّل قبل الـ auth مش محمي حتى لو شكله جنب routes محمية.`,
          example: R`app.get("/a", (req, res) => res.json({ user: req.user ?? null }));
app.use((req, res, next) => { req.user = "u1"; next(); });
app.get("/b", (req, res) => res.json({ user: req.user }));
app.get("/boom", async () => { throw new Error("db down"); });
app.use((err, req, res, next) => res.status(500).json({ error: "INTERNAL" }));`,
          try: R`شغّل المثال واطلب [[/a]] و [[/b]] و [[/boom]]. وبعدين انقل الـ error handler لأول الملف واطلب [[/boom]] تاني. إيه اللي اتغير، وليه؟`,
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم Express من جوه مش حافظ أسماء. وغلطات الترتيب من أشهر أسباب الثغرات (route من غير auth) والـ bugs (req.body فاضي، CORS مش شغال).",
            how: R`داخليًا Express عنده stack من الـ layers. كل layer ليها path و method (أو أي method في [[app.use]]). مع كل طلب بيلف عليهم بالترتيب ويشغّل اللي بيطابق. [[next()]] يعني «كمّل على الـ layer اللي بعدي». ولو ولا واحد رد، Express بيرجّع 404 الافتراضي.

الـ error middleware بيتعرف بعدد الباراميترز (٤). لما حد ينادي [[next(err)]] أو يرمي خطأ، Express بيتخطى كل الـ middleware العادي ويروح لأول error middleware بعد المكان ده. وفي Express 5، لو async handler رمى أو الـ promise اترفضت، ده بيتحول لـ [[next(err)]] لوحده (درس [[async errors في Express 5]]). في Express 4 كان الطلب بيعلّق.

أمثلة الترتيب اللي بتتسأل: [[express.json()]] قبل الـ routes وإلا [[req.body]] undefined. والـ webhook اللي محتاج raw body قبل [[express.json()]]. و CORS قبل الـ auth عشان الـ preflight (OPTIONS) ميترفضش بـ 401. و [[express.static]] قبل الـ auth لو الملفات عامة. والتفاصيل في درس [[ترتيب الـ middleware]].`,
            when: R`أسئلة بعدها: «إزاي تعمل error handler مركزي؟». «إيه اللي يحصل لو middleware منسيش ينادي next ولا رد؟» (الطلب يعلّق لحد الـ timeout). «الفرق بين app.use و app.get؟». «middleware في Nest بيختلف عن guard إزاي؟» (درس «Nest: guards و interceptors»).`,
            mistakes: R`«الترتيب مش مهم». و error handler بـ ٣ باراميترز فمش بيتنادى أبدًا. وإنك تنادي [[next()]] بعد [[res.json()]] فيحصل «Cannot set headers after they are sent». و [[res.json()]] من غير [[return]] جوه if، فالكود يكمّل ويرد مرتين.`
          },
          lines: [
            "route قبل الـ middleware: مش هيشوف req.user.",
            "middleware بيحط اليوزر ويكمّل.",
            "route بعده: شايف req.user.",
            "route بيرمي من async (Express 5 بيوديه للـ error handler).",
            "error handler بـ ٤ باراميترز في الآخر."
          ],
          sol: R`النتيجة: [[/a]] بيرجّع [[{ user: null }]] لأنه اتسجّل قبل الـ middleware، و [[/b]] بيرجّع [[{ user: "u1" }]]، و [[/boom]] بيرجّع 500 و [[{ error: "INTERNAL" }]].

لما الـ error handler يبقى أول الملف: [[/boom]] بيرجّع 500 بصفحة HTML الافتراضية بتاعة Express (فيها الـ stack في التطوير)، مش الـ JSON بتاعك. السبب إن [[next(err)]] بيدوّر على error middleware بعد مكان الخطأ، واللي فوق مش بيتشاف.`,
          solCode: R`const r = await Promise.all(["/a", "/b", "/boom"].map((p) => request(app).get(p)));
console.log(r[0].body, r[1].body, r[2].status, r[2].body);
// { user: null } { user: 'u1' } 500 { error: 'INTERNAL' }`
        },
        {
          cmd: "JWT ولا session",
          title: "JWT ولا session؟ وفين تحط التوكن؟ (JWT vs sessions)",
          desc: R`session: السيرفر بيحفظ البيانات في store (Redis)، والعميل معاه id عشوائي في كوكي httpOnly. logout والحظر فوري، بس كل طلب فيه lookup. JWT: البيانات موقّعة جوه التوكن، والسيرفر بيتحقق من التوقيع من غير ما يسأل حد. مفيش lookup، بس مفيش سحب للتوكن قبل ما يخلص.

عشان كده الشكل الشائع مع JWT: access token قصير (١٠-١٥ دقيقة) و refresh token طويل في كوكي httpOnly بيتخزن ويتلغي من السيرفر. ولموقع واحد على دومين واحد، الـ session غالبًا أبسط وأأمن.`,
          example: R`// session: الكوكي فيها id بس، والبيانات في Redis
// Set-Cookie: sid=s%3ACzl9ycc...; Path=/; HttpOnly; Secure; SameSite=Lax
// JWT: البيانات في التوكن نفسه، أي حد يقدر يقراها (مش مشفّرة، موقّعة بس)
node -e 'console.log(JSON.parse(Buffer.from(process.argv[1].split(".")[1], "base64url")))' eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3Iiwicm9sZSI6IlVTRVIiLCJleHAiOjE3OTA3MTQ3Nzd9.x`,
          try: R`خد أي JWT من تطبيق عندك وفكّ الجزء التاني بالأمر ده. إيه البيانات اللي فيه؟ ينفع يبقى فيه إيميل أو رقم تليفون؟ وبعدين فكّر: يوزر عمل logout، والـ access token بتاعه لسه فاضله ١٠ دقايق. حد سرقه. يقدر يستخدمه؟`,
          deep: {
            why: "سؤال تصميم بيبان منه إنك بتفهم المقايضات مش بتردد «JWT أحدث». والإجابة الناضجة بتقول إمتى كل واحد، وإيه اللي بيضيع مع JWT، وفين تحط التوكن.",
            how: R`النقط اللي تقولها: الـ session stateful (الحالة عند السيرفر) و JWT stateless (الحالة في التوكن). JWT مناسب لما خدمات كتير محتاجة تتحقق من غير قاعدة مشتركة، أو موبايل، أو API لطرف تالت. والـ session مناسبة لـ web app على دومين واحد.

التخزين: localStorage أي script (XSS) يقدر يقراه ويبعته برّه. الكوكي الـ httpOnly محدش يقدر يقراها بـ JS، بس بتتبعت لوحدها فمحتاجة حماية CSRF ([[SameSite=Lax]] أو Strict، وتوكن CSRF للحالات الحساسة). فالشائع: refresh في كوكي httpOnly، و access في الذاكرة.

سحب التوكن: مع JWT يا إما عمره قصير ومعاه refresh بيتلغي من القاعدة (rotation، درس «refresh rotation» في «تاب بناء مشروع كامل»)، يا إما blocklist بالـ [[jti]] في Redis، وده رجوع لـ lookup. و [[alg]]: حدد الخوارزمية في [[jwt.verify]] صريح عشان هجمات [[alg: none]] أو تبديل الخوارزمية.

الكود في درسي [[express-session]] و [[access و refresh]].`,
            when: R`أسئلة بعدها: «التوكن اتسرق، تعمل إيه؟». «فين تحط الـ JWT في الواجهة؟». «يعني إيه CSRF وليه SameSite بيساعد؟». «ليه الـ access قصير؟». «OAuth و JWT نفس الحاجة؟» (لأ: OAuth بروتوكول تفويض، و JWT شكل توكن).`,
            mistakes: R`«JWT مشفّر»: هو موقّع بس، والـ payload base64 أي حد يقراه، فمتحطش فيه بيانات حساسة. و «JWT أأمن من session». و access token عمره أيام. و logout في الواجهة بس بمسح الـ localStorage والتوكن لسه شغال.`
          },
          lines: [
            "فك الـ payload بتاع JWT من غير أي سر: base64url عادي. (في الـ session بقى، الكوكي فيها id موقّع بس زي السطر المتعلّق فوق.)"
          ],
          sol: R`الأمر بيطبع object زي [[{ sub: "7", role: "USER", exp: 1790714777 }]]. أي حد معاه التوكن يقرا ده من غير أي مفتاح، فمينفعش يبقى فيه باسورد أو بيانات حساسة. الإيميل أحيانًا بيتحط، بس الأحسن id بس.

وسؤال الـ logout: أيوه، التوكن المسروق شغال لحد ما الـ [[exp]] يعدّي، لأن السيرفر مبيسألش حد وهو بيتحقق. عشان كده عمره قصير. ولو محتاج سحب فوري: blocklist للـ [[jti]] في Redis لحد الـ exp، أو [[tokenVersion]] على اليوزر بتزوده مع logout-all والتوكن بيحمله. أو session من الأول.`,
          solCode: R`// blocklist بسيطة في Redis لحد ما التوكن يخلص
await redis.set($__btjwt:revoked:$__{payload.jti}$__bt, "1", "EXAT", payload.exp);
// وفي requireAuth بعد jwt.verify:
if (await redis.exists($__btjwt:revoked:$__{payload.jti}$__bt)) return res.status(401).json({ error: "REVOKED" });`
        },
        {
          cmd: "scale لـ API",
          title: "الـ API بقى بطيء والمستخدمين زادوا ١٠ أضعاف، تعمل إيه؟ (How would you scale it?)",
          desc: R`أبدأ بالقياس مش بالتخمين: أنهي endpoints بطيئة، والوقت رايح فين (القاعدة، ولا CPU، ولا خدمة برّه)، من اللوجات (المدة لكل طلب) و APM و [[EXPLAIN ANALYZE]].

بعدين بالترتيب: صلّح الأرخص (index ناقص، و N+1، و pagination، ورد أصغر)، وبعدين كاش للي بيتقري كتير (Redis و HTTP cache)، وبعدين الشغل التقيل يطلع queue، وبعدين نسخ كتير ورا load balancer (والتطبيق لازم يبقى stateless)، وآخر حاجة القاعدة نفسها (pooler و read replicas).`,
          example: R`EXPLAIN ANALYZE SELECT * FROM "Order" WHERE "userId" = 'u7' ORDER BY "createdAt" DESC LIMIT 20;
-- Seq Scan on "Order" (actual time=0.02..412.30 rows=20)
CREATE INDEX CONCURRENTLY order_user_created_idx ON "Order" ("userId", "createdAt" DESC);
-- Index Scan using order_user_created_idx (actual time=0.03..0.09 rows=20)`,
          try: R`اختار أبطأ endpoint عندك وارسم رحلة الطلب: كام query؟ كام ms لكل واحدة؟ فيه طلب لخدمة برّه؟ اكتب ٣ تحسينات بالترتيب من الأرخص للأغلى، ولكل واحد إزاي هتقيس إنه نفع.`,
          deep: {
            why: "سؤال system design مصغّر. الإجابة الضعيفة «Kubernetes و microservices». الإجابة القوية بتبدأ بالقياس، وبتمشي من الأرخص للأغلى، وبتعرف إن ١٠ سيرفرات على query من غير index هيضربوا القاعدة ١٠ أضعاف.",
            how: R`النقط اللي تقولها بالترتيب:

١. قيس: p50 و p95 و p99 لكل endpoint، و slow query log، و APM (Sentry أو OpenTelemetry). والـ event loop delay لو شاكك في CPU.

٢. القاعدة أول مكان تبص فيه: index على أعمدة الـ WHERE والـ ORDER BY (مثال الـ EXPLAIN من ٤١٢ms لأقل من ms)، و N+1 (درس «indexes و N+1» في «تاب بناء مشروع كامل»)، و [[select]] للأعمدة المطلوبة بس، و pagination.

٣. كاش: HTTP cache و CDN للعام، و Redis (cache-aside) للي بيتقري كتير وبيتغير قليل، مع خطة للمسح.

٤. اطلع من الطلب: إيميلات وصور وتقارير في queue، والرد 202.

٥. horizontal: نسخ ورا load balancer، والشرط stateless: sessions و rate limit و cache في Redis، والملفات في S3، والـ cron في queue scheduler، والـ sockets بـ Redis adapter.

٦. القاعدة لما تبقى هي عنق الزجاجة: connection pooler (PgBouncer)، و read replicas للقراية، وبعدها partitioning. والـ sharding آخر حاجة خالص.

والتفاصيل في درس «scaling path» و «scaling القاعدة» في «تاب بناء مشروع كامل».`,
            when: R`أسئلة بعدها: «ليه الـ stateless مهم؟». «كاش invalidation إزاي؟». «read replica فيها مشكلة إيه؟» (replication lag: اليوزر يكتب وميلاقيش اللي كتبه). «vertical ولا horizontal؟». «إزاي تعرف إن التحسين نفع؟» (نفس المقاييس قبل وبعد).`,
            mistakes: R`تبدأ بـ microservices أو Kubernetes. أو «هنكبّر السيرفر» من غير ما تعرف المشكلة. أو كاش على كل حاجة من غير خطة مسح. أو تنسى القاعدة وتكبّر الـ API بس، فالـ connections تخلص. أو ترد بكلام عام من غير أرقام: قول «p95 كان ٢ ثانية، الـ query دي كانت ١.٨ منهم».`
          },
          lines: [
            "شوف الخطة والوقت الحقيقي.",
            "بتقرا كل الجدول: ٤١٢ms.",
            "index على الفلتر والترتيب، و CONCURRENTLY عشان ميقفلش الجدول.",
            "بعد الـ index: أقل من ms."
          ],
          sol: R`مثال لإجابة كويسة على [[GET /api/orders]]:

الرحلة: auth (Redis، ١ms)، و query الطلبات (٤٠٠ms، Seq Scan)، وبعدين loop بيجيب المنتج لكل طلب (٢٠ query، N+1، ٦٠ms)، وحساب الإجمالي في JS.

التحسينات بالترتيب: (١) index مركّب على [[userId, createdAt]]: أقيس بـ EXPLAIN قبل وبعد. (٢) [[include]] أو [[in]] بدل الـ loop: أقيس عدد الـ queries في لوج Prisma من ٢١ لـ ٢. (٣) كاش للمنتجات لو لسه بطيء: أقيس hit rate و p95.

المهم إن كل خطوة ليها رقم قبل ورقم بعد، وإنك متعدّيش للأغلى إلا لو الأرخص مكفّاش.`,
          solCode: R`const prisma = new PrismaClient({ adapter, log: [{ emit: "event", level: "query" }] });
let queries = 0;
prisma.$on("query", () => queries++);
// اطلب الـ endpoint مرة، واطبع queries قبل وبعد التحسين`
        },
        {
          cmd: "idempotency",
          title: "اليوزر داس «ادفع» مرتين، أو الشبكة عملت retry: إزاي متخصمش مرتين؟ (idempotency)",
          desc: R`العملية idempotent لو تكرارها بيدّي نفس النتيجة زي مرة واحدة. GET و PUT و DELETE كده بطبيعتهم. POST لأ: مرتين يعني طلبين.

الحل: العميل بيبعت [[Idempotency-Key]] (UUID لكل محاولة شراء)، والسيرفر بيحفظ المفتاح مع النتيجة. لو نفس المفتاح جه تاني، يرجّع نفس الرد من غير ما يعمل العملية تاني. ونفس الفكرة جوه السيرفر: unique constraint، وتحديث بشرط على الحالة، و webhooks وـ jobs بتتعالج مرة مهما اتكررت.`,
          example: R`// الواجهة: مفتاح واحد لكل محاولة، ثابت مع أي retry
// fetch("/api/orders", { method: "POST", headers: { "Idempotency-Key": attemptId }, body })
model IdempotencyKey {
  key        String   @id
  userId     String
  status     Int
  response   Json
  createdAt  DateTime @default(now())
}
// SQL تحت: INSERT ... ON CONFLICT (key) DO NOTHING، ولو مدخلش يبقى تكرار`,
          try: R`اعمل [[POST /api/orders]] بيقرا [[Idempotency-Key]]: لو المفتاح موجود لنفس اليوزر رجّع الرد المحفوظ، ولو لأ اعمل الطلب واحفظ الرد. ابعت نفس الطلب ٣ مرات بنفس المفتاح بـ [[Promise.all]] (مع بعض!). كام طلب اتعمل في القاعدة؟`,
          deep: {
            why: "الشبكات بتقطع، والموبايل بيعيد، واليوزر بيدوس مرتين، والبوابة بتعيد الـ webhook، والـ queue بتعيد الـ job. في أي نظام فيه فلوس، التكرار مش حالة نادرة. والسؤال ده بيفرق بين حد بنى API لعب وحد بنى حاجة فيها دفع.",
            how: R`النقط: [[Idempotency-Key]] من العميل (مش من السيرفر، عشان الـ retry يبعت نفس المفتاح). المفتاح مربوط باليوزر (مفتاح يوزر تاني ميرجّعش رد يوزرك). والحفظ لازم atomic: [[INSERT ... ON CONFLICT DO NOTHING]] أو unique على المفتاح، مش «دوّر وبعدين اعمل» (الاتنين هيدوّروا مع بعض ويلاقوه مش موجود). والطلب التاني اللي جه والأول لسه شغال يرجع 409 «in progress» أو يستنى. والمفاتيح ليها عمر (٢٤ ساعة مثلًا) وبتتمسح. ولو نفس المفتاح جه بـ body مختلف: 422.

ده مفصّل في درس [[Idempotency-Key]] في تاب «APIs متقدمة». وجوه السيرفر: الـ webhook بشرط على الحالة و unique على id المعاملة (درس [[اختبار الـ webhook]])، والـ jobs idempotent (درس [[background jobs]])، ومع بوابات الدفع ابعت نفس المفتاح ليهم كمان (Stripe و Paymob بيدعموا حاجة زي كده).`,
            when: R`أسئلة بعدها: «POST ولا PUT idempotent؟». «إزاي تمنع race condition في الحفظ؟». «at-least-once و exactly-once؟» (الـ queues بتضمن at-least-once، و exactly-once بتعمله انت بالـ idempotency). «تمسح المفاتيح إمتى؟».`,
            mistakes: R`«بقفل الزرار في الواجهة» كحل وحيد: الـ retry بيحصل من الشبكة مش من اليوزر. و «دوّر لو موجود، وإلا اعمل» من غير unique فالتكرار المتزامن يعدّي. ومفتاح جديد مع كل retry فمفيش فايدة. ومفتاح عالمي من غير ربط باليوزر.`
          },
          lines: [
            "جدول المفاتيح.",
            "المفتاح نفسه primary key، فالتكرار مستحيل على مستوى القاعدة.",
            "صاحب المفتاح.",
            "الـ status اللي اترد.",
            "الرد المحفوظ عشان يترجع زي ما هو.",
            "وقت الإنشاء عشان المسح بعد مدة.",
            "قفلة."
          ],
          sol: R`المتوقع لو التنفيذ صح: طلب واحد بس في القاعدة، والتلات ردود زي بعض (أو واحد 201 والباقيين نفس الرد المحفوظ، أو 409 «in progress» لو وصلوا والأول لسه بيتعمل).

لو لقيت ٢ أو ٣ طلبات، يبقى بتعمل [[findUnique]] وبعدين [[create]]: التلاتة دوّروا مع بعض قبل ما أي واحد يكتب. الحل إنك تحجز المفتاح الأول بـ [[create]] وتسيب الـ primary key يرفض التكرار (Prisma بيرمي P2002)، وبعدين تعمل الطلب وتحدّث الصف بالرد.`,
          solCode: R`router.post("/", requireAuth, async (req, res) => {
  const key = req.get("Idempotency-Key");
  if (!key) return res.status(400).json({ error: "IDEMPOTENCY_KEY_REQUIRED" });
  try {
    await db.idempotencyKey.create({ data: { key, userId: req.user.id, status: 0, response: {} } });
  } catch (e) {
    if (e.code !== "P2002") throw e;
    const saved = await db.idempotencyKey.findUnique({ where: { key } });
    if (saved.userId !== req.user.id) return res.status(422).json({ error: "KEY_REUSED" });
    if (saved.status === 0) return res.status(409).json({ error: "IN_PROGRESS" });
    return res.status(saved.status).json(saved.response);
  }
  const order = await ordersService.create(req.user.id, req.body);
  await db.idempotencyKey.update({ where: { key }, data: { status: 201, response: order } });
  res.status(201).json(order);
});`
        },
        {
          cmd: "استراتيجية الأخطاء",
          title: "إزاي بتتعامل مع الأخطاء في API بـ Node؟ (error handling strategy)",
          desc: R`عندي نوعين: أخطاء متوقعة (operational) زي validation أو مش موجود أو مش مسموح أو خدمة برّه واقعة، ودي بترميها كـ [[AppError]] فيها status وكود ثابت. وأخطاء bugs (undefined is not a function) ودي بتبقى 500 برسالة عامة وبتتسجّل بالـ stack وبتروح Sentry.

كل ده بيتمسك في error middleware واحد في الآخر بيرجّع نفس شكل الـ JSON دايمًا. والـ process نفسها: [[unhandledRejection]] و [[uncaughtException]] بيتسجّلوا والـ process بتقفل نضيف وتتعاد (PM2 أو Docker)، مش بتكمّل في حالة مش معروفة.`,
          example: R`export class AppError extends Error {
  constructor(status, code, message) { super(message); this.status = status; this.code = code; }
}

app.use((err, req, res, next) => {
  if (err instanceof AppError) return res.status(err.status).json({ error: err.code, message: err.message });
  req.log.error({ err }, "unhandled error");
  res.status(500).json({ error: "INTERNAL", requestId: req.id });
});

process.on("unhandledRejection", (reason) => { logger.fatal({ reason }, "unhandledRejection"); shutdown(1); });
process.on("uncaughtException", (err) => { logger.fatal({ err }, "uncaughtException"); shutdown(1); });`,
          try: R`في الـ API بتاعك: ارمي [[new AppError(404, "ORDER_NOT_FOUND", "...")]] من service، وارمي [[TypeError]] عادي من service تانية، وقارن الردين واللوج. وبعدين اعمل [[Promise.reject(new Error("x"))]] برّه أي route وشوف الـ process عملت إيه.`,
          flag: "script",
          deep: {
            why: "API من غير استراتيجية بيرجّع أشكال أخطاء مختلفة في كل route، وأحيانًا بيسرّب stack traces ورسايل القاعدة للعميل، وأحيانًا بيبلع الخطأ فمحدش يعرف. والسؤال بيبين إنك شغّلت حاجة في الإنتاج.",
            how: R`النقط اللي تقولها: شكل واحد للأخطاء ([[{ error: "CODE", message }]] أو [[application/problem+json]]، درس [[problem+json]] في تاب «APIs متقدمة» ودرس «شكل الأخطاء» في «تاب بناء مشروع كامل»)، والواجهة بتعتمد على الـ code مش النص.

مكان الرمي: الـ validation في الـ middleware (400)، والـ service ترمي أخطاء الـ business (404 و 409 و 422)، ومحدش جوه الـ service يعمل [[res.status]]. والخطأ من مكتبة (Prisma P2002، أو 503 من البوابة) بيتحول لـ AppError في مكان واحد.

Express 5 بيمسك rejections الـ async handlers لوحده (درس [[async errors في Express 5]]). والـ 500 عمره ما يرجّع [[err.message]] للعميل، بس [[requestId]] عشان تدوّر بيه في اللوج (درس [[AsyncLocalStorage]]).

uncaughtException: الـ process بعدها في حالة مش معروفة (اتصال نص مفتوح، أو lock مش اتفك). الصح تسجّل، وتبطّل تقبل طلبات، وتقفل، والـ supervisor يشغّل نسخة جديدة. وفي Node الحديث الـ unhandledRejection بيقفل الـ process افتراضيًا أصلًا.

والأخطاء اللي مش بتاعتك: timeouts على أي طلب لبرّه ([[AbortSignal.timeout(5000)]])، و retry بـ backoff للحاجات الـ idempotent بس، و circuit breaker لو الخدمة واقعة كتير.`,
            when: R`أسئلة بعدها: «operational و programmer errors الفرق إيه؟». «ليه متكمّلش بعد uncaughtException؟». «إزاي تعرف إن فيه أخطاء في الإنتاج؟» (Sentry و alerts على نسبة الـ 5xx). «4xx ولا 5xx لو القاعدة وقعت؟» (503).`,
            mistakes: R`[[try/catch]] في كل route بيرجّع [[res.status(500).json(err)]] فيسرّب كل حاجة. و [[catch (e) {}]] فاضي. و [[process.on("uncaughtException", log)]] والـ process تكمّل. ورسايل خطأ مختلفة للإيميل الغلط والباسورد الغلط في login (بتقول للمهاجم مين مسجّل).`
          },
          lines: [
            "كلاس للأخطاء المتوقعة.",
            "فيه status وكود ثابت ورسالة.",
            "قفلة.",
            "error handler واحد في الآخر.",
            "خطأ متوقع: رد بالـ status والكود.",
            "غير كده bug: سجّله بالـ stack.",
            "ورد 500 عام ومعاه id الطلب بس.",
            "قفلة.",
            "promise اترفضت ومحدش مسكها: سجّل واقفل نضيف.",
            "exception محدش مسكه: نفس الحاجة."
          ],
          sol: R`المتوقع: الـ AppError بيرجع 404 و [[{ error: "ORDER_NOT_FOUND", message: "..." }]] ومفيش سطر error في اللوج (أو سطر info، دي حاجة عادية). والـ TypeError بيرجع 500 و [[{ error: "INTERNAL", requestId: "..." }]] من غير أي تفاصيل، واللوج فيه سطر error بالـ stack والـ requestId نفسه.

والـ rejection برّه الـ routes: سطر fatal في اللوج والـ process بتقفل بـ exit code 1، و Docker أو PM2 يشغّلها تاني. لو الـ process كمّلت عادي، يبقى الـ handler بيسجّل بس ومش بيقفل.

ولو الـ 500 رجع فيه رسالة الـ TypeError أو stack، يبقى الـ handler بيبعت [[err.message]]. دي ثغرة تسريب معلومات.`,
          solCode: R`function shutdown(code) {
  server.close(() => process.exit(code));
  setTimeout(() => process.exit(code), 10_000).unref();
}`
        },
        {
          cmd: "streams في الانترفيو",
          title: "إزاي ترفع أو تنزّل ملف ٢ جيجا في Node؟ (streams & backpressure)",
          desc: R`مستحيل أقرا الملف كله في الذاكرة. بستخدم streams: الملف بيتقري ويتبعت حتة حتة، والذاكرة ثابتة مهما كان الحجم. وبوصّلهم بـ [[pipeline]] عشان الأخطاء والـ backpressure: لو الطرف اللي بيكتب أبطأ، القراية بتستنى بدل ما الحتت تتكوّم في الرام.

وللرفع الكبير جدًا، الأحسن إن الملف ميعدّيش على السيرفر خالص: signed upload URL والمتصفح يرفع لـ S3 مباشرة، والسيرفر ياخد إشعار لما يخلص.`,
          example: R`router.get("/files/:id/download", requireAuth, async (req, res) => {
  const file = await filesService.getMine(req.user.id, req.params.id);
  res.attachment(file.name);
  res.setHeader("Content-Length", file.size);
  await pipeline(createReadStream(file.path), res);
});`,
          try: R`اعمل ملف ١ جيجا ([[fallocate -l 1G big.bin]] أو [[dd]])، ونزّله مرة بـ [[res.send(await readFile(path))]] ومرة بالـ pipeline، وراقب الـ RSS بتاع السيرفر في الحالتين. وبعدين نزّله بـ curl بسرعة محدودة ([[--limit-rate 1M]]) وشوف الذاكرة بتعمل إيه مع pipeline.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم إن الـ RAM محدودة وإن Node عنده أداة معمولة للمشكلة دي بالظبط. وبيفتح كلام عن backpressure، وده مفهوم كتير مبيعرفوهوش.",
            how: R`النقط: ٤ أنواع streams (Readable و Writable و Duplex و Transform). الـ backpressure: [[write()]] بيرجّع false لما البافر ([[highWaterMark]]) يتملى، والمفروض تستنى [[drain]]، و pipeline بيعمل ده لوحده. و [[.pipe()]] مبيمررش الأخطاء، فـ pipeline أو [[stream.promises.pipeline]].

في HTTP: [[req]] Readable و [[res]] Writable. فالرفع ممكن يتقري stream (busboy، أو multer بـ diskStorage) من غير ما يتجمّع في الرام. وفي الإنتاج: حد أقصى للحجم، و signed URL للملفات الكبيرة (درس [[signed upload URL]] في «تاب بناء مشروع كامل»)، ومعالجة بعد الرفع في queue.

والتفاصيل والتجربة بالأرقام في درس [[streams و pipeline]].`,
            when: R`أسئلة بعدها: «يعني إيه highWaterMark؟». «إزاي تعمل Transform بتحوّل CSV لـ JSON؟». «async iterators مع streams؟» ([[for await]]). «لو اليوزر قفل الاتصال في النص؟» (pipeline بيعمل destroy للكل، فالملف بيتقفل).`,
            mistakes: R`«بقرا الملف بـ readFile وأبعته» أو «بزوّد الرام». و [[multer.memoryStorage()]] للملفات الكبيرة. و pipe من غير error handling فملف واحد بايظ بيسيب file descriptors مفتوحة.`
          },
          lines: [
            "endpoint تنزيل ملف.",
            "هات بيانات الملف بتاع اليوزر ده بس.",
            "اسم الملف في Content-Disposition.",
            "الحجم عشان المتصفح يعرض progress.",
            "اقرا واكتب في الرد حتة حتة، والـ backpressure والإغلاق على pipeline.",
            "قفلة."
          ],
          sol: R`المتوقع: مع [[readFile]] الـ RSS بيطلع فوق ١ جيجا وقت كل تنزيل (ولو اتنين نزّلوا مع بعض، اتنين جيجا). ومع pipeline بيفضل ثابت تقريبًا (عشرات الميجا) مهما كان حجم الملف.

ومع [[--limit-rate 1M]]: الذاكرة لسه ثابتة، لأن الـ socket بطيء فبيرجّع false، و pipeline بيوقّف القراية لحد ما البافر يفضى. من غير backpressure، القراية كانت هتخلص في ثانية والجيجا كلها تتكوّم في الرام مستنية الشبكة.`,
          solCode: R`fallocate -l 1G big.bin
curl -s -o /dev/null --limit-rate 1M http://localhost:3000/files/1/download -H "Authorization: Bearer $TOKEN" &
while sleep 1; do ps -o rss= -p $(pgrep -f "node server") ; done`
        },
        {
          cmd: "graceful shutdown",
          title: "إزاي تعمل deploy من غير ما طلبات تضيع؟ (graceful shutdown)",
          desc: R`لما Docker أو Kubernetes أو PM2 عايزين يقفلوا النسخة القديمة، بيبعتوا SIGTERM، ولو مقفلتش في مدة (١٠ ثواني في Docker افتراضيًا) بيبعتوا SIGKILL.

على SIGTERM: ابطّل تقبل اتصالات جديدة ([[server.close()]])، وخلّي الـ health check يرجع 503 عشان الـ load balancer يبطّل يبعتلك، وسيب الطلبات اللي شغالة تخلص، واقفل الـ workers والـ queues والقاعدة و Redis، وبعدين اخرج. ومعاه timeout: لو معلّق أكتر من كذا، اخرج بالعافية.`,
          example: R`let shuttingDown = false;
app.get("/health", (req, res) => res.status(shuttingDown ? 503 : 200).json({ ok: !shuttingDown }));

process.on("SIGTERM", async () => {
  shuttingDown = true;
  logger.info("SIGTERM: draining");
  setTimeout(() => process.exit(1), 25_000).unref();
  server.close(async () => {
    await Promise.allSettled([worker.close(), db.$disconnect(), redis.quit()]);
    process.exit(0);
  });
});`,
          try: R`اعمل route بياخد ٥ ثواني، وابعتله طلب، وفي النص ابعت [[kill -TERM <pid>]]. الطلب كمّل؟ وطلب جديد بعد الـ SIGTERM اتقبل؟ جرّب نفس الحاجة من غير الـ handler.`,
          flag: "script",
          deep: {
            why: "كل deploy بيقفل نسخة. من غير إغلاق نضيف، كل deploy بيقطع طلبات شغالة (دفع في النص، أو رفع ملف)، ويسيب jobs نصها معمول، واتصالات قاعدة معلّقة. والسؤال بيبين إنك شغّلت تطبيق في الإنتاج مش على جهازك بس.",
            how: R`النقط: SIGTERM مش SIGKILL (التاني مفيش handler ليه). و [[server.close()]] بيوقّف قبول اتصالات جديدة ويستنى الموجودة، بس الـ keep-alive connections ممكن تفضل مفتوحة: [[server.closeIdleConnections()]] أو خلي Node الحديث يعملها. والـ health بـ 503 قبل الإغلاق بشوية عشان الـ load balancer يلحق يشيلك.

في Docker: [[CMD ["node", "server.js"]]] مش [[npm start]] (npm مبيوصّلش الـ signal دايمًا)، أو [[--init]]. والـ [[stop_grace_period]] أطول من الـ timeout بتاعك. وفي BullMQ [[worker.close()]] بيستنى الـ job الحالية. وفي Nest [[app.enableShutdownHooks()]].

التفاصيل والكود في درس «الإغلاق النضيف» في تاب «Node و npm».`,
            when: R`أسئلة بعدها: «الفرق بين SIGTERM و SIGKILL و SIGINT؟». «zero-downtime deploy إزاي؟» (rolling update + readiness + graceful shutdown). «websocket connections تعمل فيها إيه؟» (ابعت close للعميل عشان يعمل reconnect على نسخة تانية).`,
            mistakes: R`[[process.exit()]] على طول في SIGTERM. أو handler من غير timeout فالـ process تعلّق لحد SIGKILL. أو [[npm start]] كـ PID 1 في Docker فالـ signal مبيوصلش. ونسيان الـ workers والـ intervals فالـ process مبتخرجش لوحدها.`
          },
          lines: [
            "flag للحالة.",
            "الـ health يرجع 503 وانت بتقفل، فالـ load balancer يشيلك.",
            "لما SIGTERM يوصل...",
            "...علّم إنك بتقفل.",
            "سجّل.",
            "حد أقصى: لو معلّق ٢٥ ثانية اخرج بالعافية (و unref عشان ميمنعش الخروج الطبيعي).",
            "ابطّل تقبل اتصالات جديدة، ولما الموجودة تخلص...",
            "...اقفل الـ worker والقاعدة و Redis، حتى لو واحد فشل.",
            "اخرج بنجاح.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`مع الـ handler: الطلب الشغال كمّل ورجع 200 بعد الـ ٥ ثواني، وأي طلب جديد بعد الـ SIGTERM اترفض بـ connection refused (السيرفر بطّل يسمع)، والـ process خرجت بـ 0 بعد ما الطلب خلص.

من غير الـ handler: Node بيقفل فورًا على SIGTERM، والطلب الشغال بيقطع ([[curl: (52) Empty reply from server]]).

لو الـ process مخرجتش خالص مع الـ handler، يبقى فيه حاجة لسه مفتوحة (interval، أو اتصال keep-alive، أو client Redis)، والـ timeout هو اللي هيطلّعها بعد ٢٥ ثانية.`,
          solCode: R`app.get("/slow", async (req, res) => { await new Promise((r) => setTimeout(r, 5000)); res.json({ ok: true }); });
// ترمنال ١: node server.js
// ترمنال ٢: curl -s localhost:3000/slow & sleep 1; kill -TERM $(pgrep -f "node server.js"); wait
// {"ok":true}   والسيرفر خرج بعدها`
        }
      ]
    }
]);
