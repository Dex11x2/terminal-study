// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "Dependencies",
      l: 2,
      n: "Depends بيجهّز اللي الـ route محتاجه (اتصال، مستخدم، إعدادات) قبل ما يشتغل، ويقفله بعد ما يخلص",
      items: [
        {
          cmd: "Depends و Annotated",
          title: "تجهّز حاجة لكل route من غير ما تكررها",
          desc: R`الـ dependency دالة FastAPI بيناديها قبل الـ route ويبعت ناتجها كباراميتر. بتاخد باراميترات زي الـ route بالظبط (query و headers وغيرها)، وممكن تعتمد على dependencies تانية.

والطريقة الحديثة: [[Annotated[Type, Depends(fn)]]] وتسمّيه مرة ([[CurrentUser]] و [[Conn]] و [[PageDep]])، وبعدين أي route يكتب [[user: CurrentUser]] وخلاص.`,
          example: R`from typing import Annotated
from fastapi import Depends, FastAPI, Header, HTTPException, Query
from pydantic import BaseModel
app = FastAPI()
class Page(BaseModel):
    limit: int
    offset: int
def pagination(page: Annotated[int, Query(ge=1)] = 1, size: Annotated[int, Query(ge=1, le=100)] = 20) -> Page:
    return Page(limit=size, offset=(page - 1) * size)
PageDep = Annotated[Page, Depends(pagination)]
async def tenant_id(x_tenant_id: Annotated[str, Header()]) -> str:
    if not x_tenant_id.isalnum():
        raise HTTPException(400, "bad tenant")
    return x_tenant_id
TenantDep = Annotated[str, Depends(tenant_id)]
@app.get("/orders")
async def list_orders(page: PageDep, tenant: TenantDep):
    return {"tenant": tenant, "limit": page.limit, "offset": page.offset}
@app.get("/products")
async def list_products(page: PageDep):
    return {"limit": page.limit, "offset": page.offset}`,
          try: R`اطلب [[/orders?page=3]] من غير header [[X-Tenant-Id]] وشوف الـ 422، وبعدين بيه ([[curl -H "X-Tenant-Id: acme" "localhost:8000/orders?page=3"]]). وافتح [[/docs]] وشوف باراميترات الـ dependency ظهرت على الـ route.`,
          flag: "script",
          deep: {
            why: "كل route محتاج نفس الحاجات: اتصال بالقاعدة، والمستخدم الحالي، والإعدادات، والـ pagination. من غير dependencies بتنسخ نفس ٥ سطور في كل route، وأول ما تغيّر حاجة تنسى مكان. وكمان الـ dependency injection بيخلّي الاختبار سهل: تبدّل الـ dependency بنسخة وهمية.",
            how: R`FastAPI بيقرا الـ signature، ويلاقي [[Depends(fn)]]، فيقرا signature الـ fn هي كمان، ويبني شجرة. ومع كل request بيحل الشجرة من تحت لفوق: ينادي كل dependency، ويبعت نواتجها.

الـ cache: لو نفس الـ dependency مطلوبة في كذا مكان في نفس الـ request (الـ route واتنين dependencies تانيين)، بتتنادى مرة واحدة والناتج بيتشارك. و [[Depends(fn, use_cache=False)]] لو عايزها كل مرة.

باراميترات الـ dependency بتظهر في التوثيق وبتتفحص زي باراميترات الـ route بالظبط، و [[HTTPException]] منها بيوقف الـ request قبل ما الـ route يشتغل. و [[x_tenant_id]] بيتقري من header اسمه [[x-tenant-id]] (الـ _ بتتحوّل -).

[[def]] ولا [[async def]]: نفس قاعدة الـ routes، والـ [[def]] بتشتغل في threadpool.

والـ class ينفع يبقى dependency ([[Depends(Pagination)]] بينادي الـ constructor)، والـ Pydantic model كمان.`,
            when: "أي حاجة بتتكرر في أكتر من route: auth، واتصال القاعدة، والإعدادات، والـ pagination، و tenant، و rate limit، و feature flags.",
            mistakes: R`[[Depends(get_db())]] بالقوسين: كده بتنادي الدالة مرة وقت التعريف وتبعت ناتجها. اكتب اسمها بس. و [[page: Page = Depends(pagination)]] في كل route بدل ما تعمل النوع مرة بـ Annotated. و dependency تقيلة (query على القاعدة) على كل الـ routes وهي لازمة لبعضهم بس.`
          },
          lines: [
            "Annotated.",
            "Depends، و Header لقراية الـ headers.",
            "موديل للنتيجة.",
            "التطبيق.",
            "شكل الـ pagination.",
            "حقل.",
            "حقل.",
            "dependency: باراميتراتها query عادية بقيود.",
            "حوّلهم لـ limit و offset.",
            "نوع بالـ dependency بتاعته، تكتبه مرة واحدة.",
            R`dependency بتقرا header [[X-Tenant-Id]].`,
            "فحص.",
            "بيوقف الـ request قبل الـ route.",
            "رجّع القيمة.",
            "نوع تاني.",
            "route.",
            "باراميترين، كل واحد جاي من dependency.",
            "استخدمهم.",
            "route تاني بنفس الـ pagination.",
            "سطر واحد.",
            "رجّع."
          ],
          sol: R`من غير الـ header: 422 و [[{"detail": [{"type": "missing", "loc": ["header", "x-tenant-id"], "msg": "Field required", "input": null}]}]]. لاحظ إن FastAPI حوّل [[x_tenant_id]] لـ [[x-tenant-id]] لوحده (الـ underscore بقى شرطة). وبالـ header: [[{"tenant": "acme", "limit": 20, "offset": 40}]]، لأن الصفحة 3 بحجم 20 تبدأ من 40. ولو بعت [[X-Tenant-Id: ac-me]] هتاخد [[400]] و [[bad tenant]] من الـ HTTPException اللي جوه الـ dependency.

وفي [[/docs]] هتلاقي على [[/orders]] تلات باراميترات: [[page]] و [[size]] (query) و [[x-tenant-id]] (header)، مع إن الـ route نفسه مكتوب فيه [[page]] و [[tenant]] بس. FastAPI بيفك الـ dependencies ويضيف باراميتراتها للـ route، وده اللي بيخلي الـ pagination تتكتب مرة وتتوثق في كل مكان.`
        },
        {
          cmd: "dependency بـ yield",
          title: "تفتح اتصال قبل الـ route وتقفله بعده",
          desc: R`لو الـ dependency فيها [[yield]]، اللي قبل الـ yield بيشتغل قبل الـ route، والقيمة اللي بتتعمل لها yield بتروح للـ route، واللي بعد الـ yield (التنضيف) بيشتغل بعد ما الـ route يخلص. ده المكان الطبيعي لـ: خد اتصال من الـ pool، وابدأ transaction، و commit أو rollback، ورجّع الاتصال.

والحاجات المشتركة بين كل الطلبات (الـ pool نفسه، و HTTP client) مكانها الـ [[lifespan]]: بتتعمل مرة لما التطبيق يقوم وتتقفل لما يقفل.`,
          example: R`from collections.abc import AsyncIterator
from contextlib import asynccontextmanager
from typing import Annotated
import asyncpg
from fastapi import Depends, FastAPI, Request
@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    app.state.pool = await asyncpg.create_pool("postgresql://app:secret@localhost/shop", min_size=2, max_size=10)
    yield
    await app.state.pool.close()
app = FastAPI(lifespan=lifespan)
async def get_conn(request: Request) -> AsyncIterator[asyncpg.Connection]:
    async with request.app.state.pool.acquire() as conn:
        async with conn.transaction():
            yield conn
Conn = Annotated[asyncpg.Connection, Depends(get_conn, scope="function")]
@app.post("/orders")
async def create_order(conn: Conn):
    order_id = await conn.fetchval("INSERT INTO orders DEFAULT VALUES RETURNING id")
    await conn.execute("INSERT INTO order_events (order_id, kind) VALUES ($1, 'created')", order_id)
    return {"id": order_id}`,
          try: R`ضيف [[raise HTTPException(400)]] بعد أول INSERT وشوف إن مفيش صف اتحط (rollback). وبعدين اطبع حاجة بعد الـ [[yield]] مرة بـ [[scope="function"]] ومرة من غيرها، وشوف بتتطبع قبل الرد ولا بعده.`,
          flag: "script",
          deep: {
            why: "اتصال بيتاخد من الـ pool ومبيرجعش لأن exception حصل في النص: بعد ١٠ أخطاء الـ pool خلص والـ API واقف. و transaction نصها اتنفذ بتسيب داتا بايظة. الـ dependency بـ yield بتضمن التنضيف في كل الحالات، في مكان واحد.",
            how: R`FastAPI بيشغّل الـ dependency لحد الـ yield، ويدّي القيمة للـ route. ولو الـ route رمى exception (حتى [[HTTPException]])، بيترمي جوه الـ dependency عند الـ yield: [[async with conn.transaction()]] بيشوفه فيعمل rollback. ولو مفيش exception بيعمل commit.

التوقيت: الافتراضي ([[scope="request"]]) إن اللي بعد الـ yield بيشتغل بعد ما الرد يتبعت للعميل. يعني الـ commit بيحصل بعد ما العميل خد 200، ولو فشل العميل مش هيعرف. و [[Depends(get_conn, scope="function")]] (FastAPI الحديث) بيخلي التنضيف يشتغل أول ما الـ route يخلص وقبل الرد، فالـ commit الفاشل يبقى 500 زي ما المفروض. (الـ StreamingResponse محتاج العكس: الاتصال مفتوح لحد ما الـ stream يخلص، فسيبها request.)

ولو عملت [[try/except]] حوالين الـ yield، لازم ترمي الـ exception تاني بعد ما تتعامل معاه ([[raise]])، وإلا FastAPI ميعرفش إن حصل خطأ.

والـ [[lifespan]]: [[@asynccontextmanager]] (درس [[with و context managers]]) بيتنادى مرة: اللي قبل الـ yield وقت ما التطبيق يقوم (قبل أي request)، واللي بعده وقت ما يقفل (SIGTERM من [[docker stop]]). و [[app.state]] مكان تحط فيه الحاجات المشتركة وتوصلها من [[request.app.state]]. و [[@app.on_event("startup")]] القديمة deprecated.`,
            when: "أي مورد ليه فتح وقفل لكل request: اتصال DB، و session، و transaction، و lock. والموارد المشتركة طول عمر التطبيق (pool، و httpx client، و Redis، وموديل AI): lifespan.",
            mistakes: R`تعمل [[asyncpg.connect()]] جديد مع كل request (بطيء، وبيخلّص اتصالات Postgres). و [[except Exception: pass]] حوالين الـ yield. وتستخدم الاتصال في BackgroundTask (بعد الرد، الاتصال ممكن يكون رجع للـ pool). و pool على مستوى الـ module بيتعمل وقت الـ import قبل ما يبقى فيه event loop.`
          },
          lines: [
            "نوع الرجوع للـ generators الـ async.",
            "decorator الـ lifespan.",
            "Annotated.",
            "درايفر Postgres async (المستوى ٣).",
            "Request عشان نوصل لـ app.state.",
            "بيحوّل الـ generator لـ context manager.",
            "بيتنادى مرة واحدة مع التطبيق.",
            "الـ pool بيتعمل وقت ما التطبيق يقوم (والـ URL من الإعدادات في الحقيقة).",
            "هنا التطبيق بيستقبل requests.",
            "وقت القفل: اقفل كل الاتصالات.",
            "اربط الـ lifespan بالتطبيق.",
            "dependency لكل request.",
            "خد اتصال من الـ pool، وهيرجع لوحده.",
            "transaction: commit لو الـ route نجح، و rollback لو رمى.",
            "الـ route بيشتغل هنا.",
            R`[[scope="function"]]: التنضيف (والـ commit) يحصل قبل ما الرد يتبعت.`,
            "route.",
            "بياخد الاتصال جاهز.",
            "INSERT ويرجّع الـ id.",
            "INSERT تاني في نفس الـ transaction: الاتنين يا يتنفذوا يا لأ.",
            "رجّع."
          ],
          sol: R`مع [[raise HTTPException(400)]] بعد أول INSERT، الرد [[400]] و [[{"detail": "Bad Request"}]]، و [[SELECT * FROM orders]] مش هيلاقي الصف. الـ exception عدّى من الـ [[yield]] جوه [[conn.transaction()]] فعمل rollback. بس لاحظ إن الطلب اللي بعده هياخد [[id]] 2 مش 1: الـ sequence مبيرجعش في الـ rollback، فالفجوات في الـ ids طبيعية ومتعتمدش إنها متتالية.

وعشان تشوف التوقيت، اطبع حاجة بعد الـ [[async with conn.transaction()]] واطبع حاجة في middleware بعد [[call_next]]. مع [[scope="function"]] الترتيب: [[endpoint returning]] وبعدين طباعة الـ dependency (الـ commit حصل) وبعدين [[response ready in middleware]]، يعني الـ commit خلص قبل الرد. من غير [[scope]] (الافتراضي [[request]]) الطباعة بتاعة الـ dependency بتيجي بعد ما الرد اتجهّز، يعني العميل ممكن ياخد 200 والـ commit لسه مخلصش أو يفشل. عشان كده الـ transaction مع [[scope="function"]]. ولو ظهر [[TypeError]] عند [[scope]]، نسخة FastAPI عندك قديمة (الـ scope اتضاف في 0.121)، فحدّثها.`
        },
        {
          cmd: "auth dependency",
          title: "تجيب المستخدم من التوكن وتحمي الـ routes",
          desc: R`[[OAuth2PasswordBearer]] (أو [[HTTPBearer]]) بيقرا [[Authorization: Bearer <token>]] من الـ header ويرجّع 401 لو مش موجود. وفوقه dependency بتاعتك بتفك التوكن وتجيب المستخدم: [[CurrentUser]]. وفوقها dependency للصلاحيات: [[require_role("admin")]].

أي route محتاج مستخدم يكتب [[user: CurrentUser]]، وأي router محمي كله بـ [[dependencies=[Depends(...)]]].`,
          example: R`from typing import Annotated
import jwt
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
SECRET = "change-me"
oauth2 = OAuth2PasswordBearer(tokenUrl="/auth/token")
app = FastAPI()
class User(BaseModel):
    id: int
    role: str
async def current_user(token: Annotated[str, Depends(oauth2)]) -> User:
    try:
        payload = jwt.decode(token, SECRET, algorithms=["HS256"])
    except jwt.InvalidTokenError:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "invalid token", headers={"WWW-Authenticate": "Bearer"})
    return User(id=int(payload["sub"]), role=payload.get("role", "user"))
CurrentUser = Annotated[User, Depends(current_user)]
def require_role(role: str):
    async def checker(user: CurrentUser) -> User:
        if user.role != role:
            raise HTTPException(status.HTTP_403_FORBIDDEN, "forbidden")
        return user
    return checker
@app.get("/me")
async def me(user: CurrentUser):
    return user
@app.delete("/users/{user_id}", dependencies=[Depends(require_role("admin"))])
async def delete_user(user_id: int):
    return {"deleted": user_id}`,
          try: R`اعمل توكن للتجربة: [[python -c "import jwt; print(jwt.encode({'sub': '1', 'role': 'admin'}, 'change-me', algorithm='HS256'))"]]، وجرّبه بـ [[curl -H "Authorization: Bearer <التوكن>" localhost:8000/me]] (زرار Authorize في [[/docs]] مع OAuth2PasswordBearer بيطلب username و password ويبعتهم لـ [[tokenUrl]]، فمينفعش تلزق فيه توكن؛ لو عايز تلزقه من /docs استخدم [[HTTPBearer]]). وبعدين غيّر حرف في التوكن، واعمل واحد بـ role عادي وجرّب الـ DELETE.`,
          flag: "script",
          deep: {
            why: "الـ auth أكتر كود بيتكرر، وأخطر كود لو اتنسى في route. لما يبقى نوع في الـ signature، نسيانه بيبان بالعين في الـ code review، والـ router كله يتقفل بسطر.",
            how: R`[[OAuth2PasswordBearer(tokenUrl=...)]] بيعمل حاجتين: dependency بتقرا الـ header وترجّع التوكن (أو 401)، وبيعرّف الـ security scheme في OpenAPI فيظهر زرار Authorize في [[/docs]]. و [[tokenUrl]] مسار الـ login بتاعك اللي بيدّي توكن (بياخد [[OAuth2PasswordRequestForm]]).

[[jwt.decode]] (مكتبة PyJWT) بيتأكد من التوقيع، ومن [[exp]] لو موجود. ولازم تحدد [[algorithms]] صريح. والـ 401 معناها «مش عارف انت مين»، و 403 «عارف، بس مش مسموحلك».

[[require_role("admin")]] factory: دالة بترجع dependency، فتقدر تعمل [[require_role("editor")]] كمان. ولأنها معتمدة على [[CurrentUser]]، والـ dependencies بتتعمل cache في نفس الـ request، التوكن بيتفك مرة واحدة حتى لو الـ route طالب الاتنين.

والباسوردات: خزّن hash بس، بـ Argon2 (مكتبة [[pwdlib]] اللي توثيق FastAPI بيستخدمها) أو bcrypt، والتحقق تقيل فخليه في [[def]] أو [[to_thread]]. وتفاصيل access و refresh tokens في تاب «بناء مشروع كامل»، والمصادقة السليمة في تاب «الأمان».`,
            when: R`أي API فيه مستخدمين. التوكن لـ APIs و mobile؛ ولو الـ frontend على نفس الدومين، cookie بـ [[HttpOnly]] غالبًا أأمن (FastAPI بيقراها بـ [[Cookie()]] أو [[APIKeyCookie]]).`,
            mistakes: R`السر مكتوب في الكود ([[SECRET = "..."]]): مكانه الإعدادات بـ [[SecretStr]]. و [[jwt.decode(..., options={"verify_signature": False})]]. وتوكن من غير [[exp]]. و [[if user.role != "admin"]] جوه كل route بدل dependency. و 401 من غير header الـ [[WWW-Authenticate]].`
          },
          lines: [
            "Annotated.",
            "PyJWT.",
            R`الأدوات، و [[status]] لأسماء الأكواد.`,
            "بيقرا Bearer token من الـ header.",
            "الموديل.",
            "للتجربة بس: السر مكانه الإعدادات.",
            "مسار الـ login اللي بيدّي التوكن، وبيظهر زرار Authorize في /docs.",
            "التطبيق.",
            "المستخدم.",
            "حقل.",
            "حقل.",
            "dependency فوق dependency: بتاخد التوكن من oauth2.",
            "نحاول نفكه.",
            "بيتأكد من التوقيع والانتهاء، والخوارزمية محددة.",
            "توكن بايظ أو منتهي.",
            "401 مع الـ header اللي المعيار طالبه.",
            "المستخدم من الـ payload (في مشروع حقيقي: من القاعدة أو الـ cache).",
            "النوع اللي كل الـ routes هتستخدمه.",
            "factory: بترجع dependency حسب الدور.",
            "الـ dependency الحقيقية، ومعتمدة على CurrentUser.",
            "الدور غلط؟",
            "403: عارفينك بس مش مسموحلك.",
            "رجّع المستخدم لو حد محتاجه.",
            "رجّع الدالة.",
            "route لأي مستخدم مسجّل.",
            "من غير توكن: 401 قبل ما الدالة تشتغل.",
            "رجّع.",
            "للأدمن بس، والـ route مش محتاج قيمة الـ dependency.",
            "الدالة.",
            "رجّع."
          ],
          sol: R`[[jwt.encode]] بيطبع توكن من ٣ أجزاء بينهم نقط، زي [[eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwicm9sZSI6ImFkbWluIn0.3au3...]]، ومعاه تحذير [[InsecureKeyLengthWarning: The HMAC key is 9 bytes long]] من نسخ PyJWT الجديدة، لأن [[change-me]] أقصر من 32 byte. في الإنتاج السر يبقى طويل وعشوائي. و [[/me]] بالتوكن ده بترجع [[{"id": 1, "role": "admin"}]].

لو غيّرت حرف في الجزء التالت (التوقيع): [[401]] و [[{"detail": "invalid token"}]] ومعاها header [[WWW-Authenticate: Bearer]]. ومن غير header خالص: [[401]] و [[{"detail": "Not authenticated"}]] من [[OAuth2PasswordBearer]] نفسه قبل ما دالتك تشتغل. وتوكن من غير [[role]] على الـ DELETE: [[403]] و [[{"detail": "forbidden"}]]، وبتوكن الأدمن: [[{"deleted": 5}]]. الفرق اللي بيتسأل في الانترفيو: 401 يعني «مش عارف إنت مين»، و 403 يعني «عارفك بس مش مسموحلك». ولو غيّرت حرف في الجزء التاني (الـ payload) هتاخد 401 برضه، لأن التوقيع مبقاش مطابق.`
        },
        {
          cmd: "dependency_overrides",
          title: "تختبر الـ API وتبدّل القاعدة والمستخدم بنسخ وهمية",
          desc: R`[[TestClient]] بيبعت requests لتطبيقك من غير سيرفر: [[client.get("/me")]] ويرجّع response تفحصه. و [[app.dependency_overrides[real] = fake]] بيبدّل أي dependency بواحدة تانية في الاختبارات: مستخدم وهمي بدل التوكن، وقاعدة اختبار، وإعدادات test.

pytest نفسه والـ fixtures و pytest.ini في تاب Python. هنا الحتة الخاصة بـ FastAPI.`,
          example: R`import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.deps import User, current_user
@pytest.fixture
def client():
    app.dependency_overrides[current_user] = lambda: User(id=1, role="admin")
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()
def test_me(client: TestClient):
    r = client.get("/me")
    assert r.status_code == 200
    assert r.json() == {"id": 1, "role": "admin"}
def test_validation(client: TestClient):
    r = client.get("/items/abc")
    assert r.status_code == 422
    assert r.json()["detail"][0]["loc"] == ["path", "item_id"]`,
          try: R`اكتب اختبار لـ DELETE بمستخدم role عادي ([[User(id=2, role="user")]]) وتأكد إنه 403. وبعدين شيل الـ [[with]] واستخدم [[TestClient(app)]] بس، وشوف الـ lifespan اشتغل ولا لأ (اطبع حاجة فيه).`,
          flag: "script",
          deep: {
            why: "من غير overrides، كل اختبار محتاج توكن حقيقي، وقاعدة شغالة، و Redis، و API خارجي. الاختبارات بتبقى بطيئة وهشة، فمحدش بيكتبها. والـ DI بتاع FastAPI معمول عشان تبدّل أي حاجة من برّه من غير ما تلمس كود الـ routes.",
            how: R`[[dependency_overrides]] dict على التطبيق: المفتاح الدالة الأصلية (نفس الـ object، مش اسمها)، والقيمة البديلة. FastAPI بيبص فيه قبل ما يحل أي dependency. والبديلة ممكن تاخد باراميترات أو dependencies هي كمان، أو تبقى generator بـ yield (اتصال بقاعدة اختبار جوه transaction تعمله rollback في الآخر، فكل اختبار يبدأ نضيف).

[[TestClient]] مبني على httpx (أو httpx2 لو متسطّب، ودي النسخة اللي Starlette الحديث بيفضّلها): نفس الـ API ([[get]] و [[post(json=...)]] و [[headers]]). ولما تستخدمه بـ [[with]]، الـ lifespan بيشتغل (الـ pool بيتعمل ويتقفل)، ومن غير with لأ.

ولو الاختبارات نفسها async (عايز تعمل await على حاجة تانية جوه الاختبار)، استخدم [[httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://test")]] مع pytest-asyncio أو anyio. والـ ASGITransport مبيشغّلش الـ lifespan، فلو محتاجه شغّله بنفسك.

و [[.clear()]] في آخر الـ fixture مهم، وإلا الـ override يفضل لباقي الاختبارات.`,
            when: "كل تطبيق FastAPI. override للـ auth في أغلب الاختبارات، وقاعدة اختبار حقيقية (Postgres في Docker) لاختبارات الـ integration بدل mocks للـ SQL.",
            mistakes: R`override بمفتاح غلط (دالة تانية بنفس الاسم من module تاني، أو [[Depends(...)]] بدل الدالة). ونسيان [[clear()]]. و [[TestClient(app)]] من غير with وتستغرب إن [[app.state.pool]] مش موجود. واختبارات بتكلّم API خارجي حقيقي.`
          },
          lines: [
            "pytest (تفاصيله في تاب Python).",
            "client بيكلّم التطبيق من غير سيرفر.",
            "التطبيق.",
            "الـ dependency اللي هنبدّلها، ونفس الـ object بالظبط.",
            "fixture بيتشارك بين الاختبارات.",
            "الـ fixture.",
            "أي route محتاج current_user هياخد المستخدم ده من غير توكن.",
            R`[[with]] بتشغّل الـ lifespan.`,
            "ادّي الـ client للاختبار.",
            "بعد الاختبار: شيل الـ overrides.",
            "اختبار.",
            "request.",
            "الكود.",
            "الـ JSON.",
            "اختبار الفحص.",
            "id مش رقم.",
            "422.",
            "مكان الخطأ بالظبط."
          ],
          sol: R`الاختبار بيعمل override لـ [[current_user]] بمستخدم عادي، ويتأكد من [[status_code == 403]] و [[{"detail": "forbidden"}]]. ولو [[require_role]] بيعتمد على [[current_user]] جواه، الـ override بيوصل له كمان لأن FastAPI بيستبدل الـ dependency في أي مكان في الشجرة. ولو الاختبار رجع 401 يبقى عملت override لحاجة غير اللي الـ route بيستخدمها فعلًا (مثلًا نسخة اتعملت import من مكان تاني)، لازم نفس الـ object بالظبط.

ولو ضفت [[print("LIFESPAN START")]] في الـ lifespan وشغّلت بـ [[pytest -s]]: مع [[with TestClient(app) as c]] هتشوف [[LIFESPAN START]] وبعدين [[LIFESPAN STOP]]، ومن غير [[with]] مش هتشوف حاجة، والـ lifespan مش هيشتغل خالص. يعني لو الـ lifespan بيعمل pool لقاعدة البيانات، الـ endpoints هتقع بـ [[AttributeError]] على [[app.state.pool]]. ومتنساش [[dependency_overrides.clear()]] وإلا الـ override هيفضل موجود في الاختبارات اللي بعده.`,
          solCode: R`import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.deps import User, current_user
@pytest.fixture
def as_user():
    app.dependency_overrides[current_user] = lambda: User(id=2, role="user")
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()
def test_delete_forbidden_for_normal_user(as_user: TestClient):
    r = as_user.delete("/users/5")
    assert r.status_code == 403
    assert r.json() == {"detail": "forbidden"}`
        }
      ]
    },
    {
      t: "الأخطاء والـ middleware",
      l: 2,
      n: "HTTPException، و exceptions بتاعتك تتحوّل لردود، وشكل واحد لكل الأخطاء، و CORS و middleware",
      items: [
        {
          cmd: "HTTPException",
          title: "ترجّع 404 أو 409 برسالة",
          desc: R`[[raise HTTPException(status_code=404, detail="...")]] بيوقف الـ route ويرجّع الرد ده. والـ detail ممكن يبقى string أو dict أو list. ولأنها raise مش return، تقدر ترميها من أي حتة: من الـ route، أو dependency، أو دالة بتتنادى جوه.

والأكواد اللي هتستخدمها: 400 طلب غلط، و 401 مش مسجّل، و 403 مش مسموح، و 404 مش موجود، و 409 تعارض (إيميل مستخدم)، و 422 الداتا مش صح (FastAPI بيرجّعها لوحده)، و 429 طلبات كتير، و 500 bug عندك.`,
          example: R`from fastapi import FastAPI, HTTPException, status
app = FastAPI()
USERS = {1: {"id": 1, "email": "sara@example.com"}}
@app.get("/users/{user_id}")
async def get_user(user_id: int):
    user = USERS.get(user_id)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user
@app.post("/users", status_code=201)
async def create_user(email: str):
    if any(u["email"] == email for u in USERS.values()):
        raise HTTPException(409, detail={"code": "EMAIL_TAKEN", "message": "الإيميل ده مستخدم"})
    new_id = max(USERS) + 1
    USERS[new_id] = {"id": new_id, "email": email}
    return USERS[new_id]
@app.delete("/users/{user_id}", status_code=204)
async def delete_user(user_id: int) -> None:
    USERS.pop(user_id, None)`,
          try: R`اطلب [[/users/99]] واقرا شكل الرد ([[{"detail": "User not found"}]]). وبعدين [[curl -i -X POST "localhost:8000/users?email=sara@example.com"]] وشوف الـ 409 والـ detail اللي هو dict.`,
          flag: "script",
          deep: {
            why: "العميل (موبايل أو frontend) بيقرر يعمل إيه من الكود: 401 يروح للـ login، و 404 صفحة «مش موجود»، و 409 رسالة تحت حقل الإيميل. لو كل حاجة 200 أو 500، الـ frontend مش هيعرف يتصرف.",
            how: R`[[HTTPException]] exception عادي بيحمل status و detail و headers. و FastAPI عنده handler جاهز ليه بيرجّع [[{"detail": ...}]] بالكود ده. ولأنه exception، بيعدّي على الـ dependencies اللي فيها yield (فالـ transaction بيعمل rollback).

الـ detail بيظهر للعميل زي ما هو: متحطش فيه stack trace أو SQL أو بيانات داخلية. و detail كـ dict فيه [[code]] ثابت (زي [["EMAIL_TAKEN"]]) أحسن من رسالة بس: الـ frontend يعتمد على الكود، والرسالة تتغير براحتك.

والـ 404 مقابل 403: لو المستخدم بيطلب order مش بتاعه، ناس كتير بترجّع 404 مش 403، عشان متأكدش إن الـ order ده موجود أصلًا.

و [[status_code=204]] (No Content) للـ DELETE: FastAPI مبيبعتش body. وتفاصيل اختيار الأكواد في تاب «APIs متقدمة».`,
            when: "في الـ routes والـ dependencies. أما في طبقة الـ services فالأحسن exceptions بتاعتك (الدرس الجاي)، عشان المنطق ميعرفش حاجة عن HTTP.",
            mistakes: R`[[return {"error": "not found"}]] بكود 200. و [[raise HTTPException(500, str(e))]] فتسرّب رسالة القاعدة للعميل. و [[except Exception]] حوالين الـ route كله بيبلع الـ HTTPException نفسها ويحوّلها 500.`
          },
          lines: [
            "HTTPException، و status لأسماء الأكواد.",
            "التطبيق.",
            "داتا وهمية.",
            "route.",
            "الدالة.",
            R`[[get]] بترجع None لو مش موجود.`,
            "مش موجود؟",
            "وقّف الـ route وارجع 404.",
            "موجود.",
            "إنشاء، والنجاح 201.",
            "email هنا query للتبسيط؛ في الحقيقة body model.",
            "الإيميل مستخدم؟",
            "409 بـ detail فيه code ثابت يعتمد عليه الـ frontend.",
            "id جديد.",
            "احفظ.",
            "رجّع.",
            "حذف، والنجاح 204 من غير body.",
            "مبترجعش حاجة.",
            "احذف لو موجود، ومتعترضش لو مش موجود (DELETE متكرر بيدّي نفس النتيجة)."
          ],
          sol: R`[[/users/99]] بترجع [[404 Not Found]] و [[{"detail":"User not found"}]]: FastAPI بيحط اللي في [[detail]] جوه مفتاح اسمه [[detail]] دايمًا.

و [[curl -i -X POST "localhost:8000/users?email=sara@example.com"]] بيطبع [[HTTP/1.1 409 Conflict]] والـ headers، وبعدين [[{"detail":{"code":"EMAIL_TAKEN","message":"الإيميل ده مستخدم"}}]]. الـ [[detail]] ممكن يبقى أي حاجة تتحوّل JSON، فالـ dict بيدّي الـ frontend [[code]] ثابت يعمل عليه if، ورسالة يعرضها. ولو شلت [[-i]] مش هتشوف الـ status، وده سبب إنك تستخدمه دايمًا وإنت بتجرّب. ولو كتبت [[return HTTPException(...)]] بدل [[raise]] هتاخد 200 والـ exception نفسه متحوّل JSON، ودي غلطة مشهورة.`
        },
        {
          cmd: "exception handlers",
          title: "exceptions بتاعتك تتحوّل لردود، وشكل واحد لكل الأخطاء",
          desc: R`[[@app.exception_handler(MyError)]] بيحوّل أي exception من نوعك لـ response، فالـ service يرمي [[NotFoundError]] من غير ما يعرف حاجة عن HTTP، والـ handler يحوّله 404. وتقدر تعيد تعريف handler الـ 422 ([[RequestValidationError]]) عشان كل الأخطاء تطلع بنفس الشكل.

و handler لـ [[Exception]] نفسها آخر خط: يسجّل الخطأ كامل في اللوج، ويرجّع 500 برسالة عامة ورقم للتتبع.`,
          example: R`import logging
import uuid
from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
log = logging.getLogger("app")
app = FastAPI()
class AppError(Exception):
    status = 400
    code = "APP_ERROR"
    def __init__(self, message: str):
        self.message = message
class NotFoundError(AppError):
    status, code = 404, "NOT_FOUND"
@app.exception_handler(AppError)
async def app_error(request: Request, exc: AppError):
    return JSONResponse({"error": {"code": exc.code, "message": exc.message}}, status_code=exc.status)
@app.exception_handler(RequestValidationError)
async def validation_error(request: Request, exc: RequestValidationError):
    fields = [{"field": ".".join(map(str, e["loc"][1:])), "message": e["msg"]} for e in exc.errors()]
    return JSONResponse({"error": {"code": "VALIDATION", "fields": fields}}, status_code=422)
@app.exception_handler(Exception)
async def unhandled(request: Request, exc: Exception):
    ref = uuid.uuid4().hex[:8]
    log.exception("unhandled error ref=%s path=%s", ref, request.url.path)
    return JSONResponse({"error": {"code": "INTERNAL", "ref": ref}}, status_code=500)
@app.get("/orders/{order_id}")
async def get_order(order_id: int):
    raise NotFoundError(f"order {order_id} not found")`,
          try: R`اطلب [[/orders/5]] و [[/orders/abc]] وقارن الشكلين: نفس الـ [[error.code]] كمفتاح. وبعدين ضيف route بيعمل [[1 / 0]] وشوف الـ ref في الرد وفي اللوج.`,
          flag: "script",
          deep: {
            why: "الـ frontend محتاج يتعامل مع الأخطاء بطريقة واحدة. لو الـ 422 ليه شكل، و HTTPException شكل، والـ 500 نص، كل شاشة هتكتب parsing مختلف. والـ services اللي بترمي HTTPException مربوطة بـ HTTP ومينفعش تستخدمها من CLI أو worker.",
            how: R`لما exception يطلع من الـ route ومحدش مسكه، Starlette بيدوّر على handler لنوعه أو لأقرب parent في الوراثة. عشان كده handler واحد لـ [[AppError]] بيغطي [[NotFoundError]] و [[ConflictError]] وأي حاجة بتورث منه.

[[RequestValidationError]] هو اللي FastAPI بيرميه لما الـ request مش مطابق. و [[exc.errors()]] نفس ليستة Pydantic ([[loc]] و [[msg]] و [[type]])، و [[loc[0]]] بيبقى [[body]] أو [[query]] أو [[path]]، عشان كده شلناه بـ [[[1:]]].

handler الـ [[Exception]] بيشتغل في ServerErrorMiddleware (آخر طبقة)، ورده بيتبعت، وبعدين الـ exception بيتسجّل من السيرفر كمان. و [[log.exception]] بيكتب الـ traceback كامل. والـ ref بيربط الرد اللي المستخدم شافه بالسطر في اللوج؛ وفي مشروع أكبر خليه نفس الـ request id اللي في الـ middleware (الدرس الجاي). وشكل الأخطاء الموحّد القياسي (problem+json) في تاب «APIs متقدمة».

ولو عايز تكمّل على السلوك الافتراضي: [[from fastapi.exception_handlers import http_exception_handler]] وناديه من الـ handler بتاعك.`,
            when: "أي مشروع فيه frontend أو عملاء خارجيين: شكل واحد للأخطاء من أول يوم، و exceptions بتاعتك في الـ services.",
            mistakes: R`handler لـ [[Exception]] بيرجّع [[str(exc)]] للعميل. وتنسى تسجّل الخطأ في handler الـ 500 فيضيع. و handler على HTTPException بتاعة FastAPI بس: سجّله على [[starlette.exceptions.HTTPException]] عشان يمسك الاتنين (الـ 404 بتاعة route مش موجود جاية من Starlette).`
          },
          lines: [
            "logging.",
            "لرقم التتبع.",
            "FastAPI و Request.",
            "exception الـ 422.",
            "رد JSON بكود.",
            "logger باسم.",
            "التطبيق.",
            "الأب لكل أخطاء التطبيق.",
            "الكود الافتراضي.",
            "code ثابت للـ frontend.",
            "constructor.",
            "الرسالة.",
            "نوع مخصوص.",
            "بيغيّر الكود والـ code بس.",
            "أي AppError أو ابن ليه يوصل هنا.",
            "الـ handler بياخد الـ request والـ exception.",
            "شكل موحّد.",
            "بدّل شكل الـ 422 الافتراضي.",
            "الـ handler.",
            "حوّل الأخطاء لـ field و message، من غير body أو query في أول الـ loc.",
            "نفس الشكل.",
            "آخر خط: أي حاجة محدش مسكها.",
            "الـ handler.",
            "رقم قصير للتتبع.",
            "سجّل الـ traceback كامل في اللوج، مش في الرد.",
            "رسالة عامة ورقم.",
            "route.",
            "الدالة.",
            "بترمي خطأ business، والـ handler بيحوّله 404."
          ],
          sol: R`[[/orders/5]] بترجع [[404]] و [[{"error": {"code": "NOT_FOUND", "message": "order 5 not found"}}]]، و [[/orders/abc]] بترجع [[422]] و [[{"error": {"code": "VALIDATION", "fields": [{"field": "order_id", "message": "Input should be a valid integer, unable to parse string as an integer"}]}}]]. الاتنين تحت [[error.code]]، فالـ frontend يعمل parse بطريقة واحدة. و [[loc[1:]]] شالت [[path]] من أول الـ loc عشان الاسم يبقى [[order_id]] بس.

والـ route اللي فيه [[1 / 0]] بيرجع [[500]] و [[{"error": {"code": "INTERNAL", "ref": "44f9e7b5"}}]] (الـ ref عشوائي)، وفي اللوج [[ERROR:app:unhandled error ref=44f9e7b5 path=/boom]] ومعاه traceback الـ [[ZeroDivisionError]]. نفس الـ ref في الاتنين، فلما مستخدم يبعتلك الـ ref تلاقي الخطأ في اللوج على طول، من غير ما تسرّب تفاصيل للعميل. وخد بالك إن تحت uvicorn هتلاقي الـ traceback مرتين: مرة من الـ [[log.exception]] بتاعك، ومرة [[Exception in ASGI application]]، لأن Starlette بيرمي الخطأ تاني للسيرفر بعد ما الـ handler بتاعك يرد. ده طبيعي ومش معناه إن الـ handler مشتغلش.`
        },
        {
          cmd: "CORS و middleware",
          title: "تسمح لـ frontend على دومين تاني، وتعمل كود يلف كل request",
          desc: R`المتصفح بيمنع الـ JavaScript إنه يقرا رد API على origin تاني، إلا لو الـ API قال إنه موافق. و [[CORSMiddleware]] بيقول ده: [[allow_origins]] بالدومينات المسموحة بالظبط.

والـ middleware عمومًا كود بيلف كل request: قبل ما يوصل للـ route وبعد ما الرد يطلع. أمثلة: request id، وقياس الوقت، و headers أمان.`,
          example: R`import time
import uuid
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://shop.example.com", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)
app.add_middleware(GZipMiddleware, minimum_size=1000)
@app.middleware("http")
async def timing(request: Request, call_next):
    request_id = request.headers.get("x-request-id") or uuid.uuid4().hex
    start = time.perf_counter()
    response = await call_next(request)
    response.headers["X-Request-ID"] = request_id
    response.headers["Server-Timing"] = f"app;dur={(time.perf_counter() - start) * 1000:.1f}"
    return response`,
          try: R`من console صفحة على دومين تاني اعمل [[fetch("http://localhost:8000/health")]] قبل وبعد ما تضيف الدومين في [[allow_origins]]، واقرا رسالة CORS في الـ console. وشوف [[X-Request-ID]] في الرد بـ [[curl -i]].`,
          flag: "script",
          deep: {
            why: R`أول مرة تربط React بالـ API: كل حاجة شغالة في Postman، والمتصفح بيقول blocked by CORS policy. والحل مش [[allow_origins=["*"]]] وخلاص. والـ middleware بيحل الحاجات اللي لازم تحصل لكل request من غير ما تفتكرها في كل route.`,
            how: R`CORS قاعدة في المتصفح بس (curl و Postman مبيهتموش). ولما الطلب «مش بسيط» (فيه [[Authorization]] أو JSON أو PATCH)، المتصفح بيبعت الأول [[OPTIONS]] (preflight) يسأل، والـ middleware بيرد بالمسموح، وبعدين المتصفح يبعت الطلب الحقيقي. و [[allow_credentials=True]] (للـ cookies) لازم معاها الدومينات بالاسم. وخلي الدومينات جاية من الإعدادات، مش مكتوبة في الكود.

الـ middleware بيتنفذ على شكل بصلة: آخر واحد اتضاف هو أول واحد بيشوف الـ request، وآخر واحد بيشوف الـ response. و [[call_next(request)]] بيعدّي الطلب للي جوه ويستنى الرد.

[[@app.middleware("http")]] سهل، بس مبني على BaseHTTPMiddleware اللي فيه مشاكل مع الـ streaming و contextvars. فللحاجات الحساسة للأداء اكتب pure ASGI middleware. و [[GZipMiddleware]] بيضغط الردود الكبيرة (لو nginx مش عامل ده).

والـ middleware بيلف كل الطلبات (حتى الـ 404)، أما الـ dependency فعلى routes معينة وليها وصول للـ DI. فالـ auth مكانها dependency غالبًا، والـ request id والتوقيت و CORS مكانهم middleware.`,
            when: R`CORS لما الـ frontend على origin تاني (حتى [[localhost:5173]] و [[localhost:8000]] origins مختلفة). و middleware للحاجات اللي بتخص كل request: ids ولوج وتوقيت و headers.`,
            mistakes: R`[[allow_origins=["*"]]] مع [[allow_credentials=True]]: Starlette بيرجّع origin الطالب نفسه لما فيه cookies، فعمليًا أي موقع يقدر يكلّم الـ API بـ cookies المستخدم. ونسيان [[http://localhost:5173]] في التطوير. و CORS مضاف في nginx وفي FastAPI الاتنين فالـ header يتكرر والمتصفح يرفض. وتقرا [[await request.body()]] في middleware على كل request: بيحمّل الـ body كله في الذاكرة (حتى الـ uploads الكبيرة)، ولو في pure ASGI middleware استهلكت الـ receive بنفسك، الـ route مش هيلاقي body.`
          },
          lines: [
            "للتوقيت.",
            "للـ request id.",
            "FastAPI و Request.",
            "CORS جاهز.",
            "ضغط gzip جاهز.",
            "التطبيق.",
            "ضيف middleware بإعداداته.",
            "CORS.",
            "الـ origins المسموحة بالظبط (من الإعدادات في الحقيقة).",
            R`اسمح بالـ cookies (fetch بـ [[credentials: "include"]])؛ أما header الـ Authorization فبيتسمح بيه من allow_headers.`,
            "الـ methods المسموحة.",
            "الـ headers المسموحة.",
            "قفلة.",
            "اضغط الردود اللي أكبر من 1000 byte.",
            "middleware بدالة.",
            "بياخد الـ request ودالة بتعدّيه للي جوه.",
            "خد الـ id من اللي قبلك (nginx) أو اعمل واحد.",
            "ابدأ العداد.",
            "عدّي الطلب واستنى الرد.",
            "رجّع الـ id في الرد، عشان العميل يقولهولك لما يشتكي.",
            "الوقت، وبيظهر في DevTools في تاب Timing.",
            "رجّع الرد."
          ],
          sol: R`قبل ما تضيف الدومين، الـ console هيطبع حاجة زي: [[Access to fetch at 'http://localhost:8000/health' from origin 'https://example.com' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.]] و [[fetch]] بيرمي [[TypeError: Failed to fetch]]. والمهم: لو بصيت في لوج السيرفر هتلاقي الطلب وصل ورجع [[200]]. الـ CORS مش بيمنع الطلب، بيمنع JavaScript إنه يقرا الرد. وبعد ما تضيف الدومين، الرد بيبقى فيه [[access-control-allow-origin: https://example.com]] والـ fetch بينجح. (Chrome الجديد ممكن كمان يسألك إذن «local network access» لما صفحة من الإنترنت تكلم localhost، وده غير الـ CORS.)

و [[curl -i localhost:8000/health]] هيطلع فيه [[x-request-id: 8cd8b4e4...]] (32 حرف hex عشوائي) و [[server-timing: app;dur=0.6]]. ولو بعت [[-H "X-Request-ID: abc123"]] هيرجعلك [[abc123]] نفسه، ودي الفكرة: الـ id يمشي مع الطلب من الـ frontend أو الـ proxy لحد اللوج. و [[curl]] مبيعملش CORS خالص، فلو جرّبت منه هيشتغل في كل الحالات.`
        }
      ]
    },
    {
      t: "قاعدة البيانات",
      l: 3,
      n: "asyncpg بـ pool و SQL صريح، و transactions، و SQLAlchemy async لو عايز ORM، و Alembic للـ migrations",
      items: [
        {
          cmd: "asyncpg",
          title: "تكلّم Postgres بـ asyncpg: pool و $1 و fetch",
          desc: R`asyncpg أسرع درايفر Postgres لـ Python async، وبتكتب بيه SQL عادي. الباراميترات بـ [[$1]] و [[$2]] مش f-string، والدوال: [[fetch]] (صفوف)، و [[fetchrow]] (صف أو None)، و [[fetchval]] (قيمة واحدة)، و [[execute]] (من غير نتيجة)، و [[executemany]] (نفس الأمر لكذا صف).

والـ pool بيتعمل مرة في الـ lifespan، وكل request بياخد اتصال ويرجّعه (درس dependency بـ yield). والـ SQL نفسه والـ indexes في تاب PostgreSQL وتاب «SQL و Prisma».`,
          example: R`import asyncpg
from pydantic import BaseModel
class Product(BaseModel):
    id: int
    name: str
    price_cents: int
async def demo(dsn: str) -> None:
    pool = await asyncpg.create_pool(dsn, min_size=2, max_size=10, command_timeout=10)
    async with pool.acquire() as conn:
        rows = await conn.fetch("SELECT id, name, price_cents FROM products WHERE price_cents < $1 ORDER BY id LIMIT $2", 5000, 20)
        products = [Product(**dict(r)) for r in rows]
        row = await conn.fetchrow("SELECT id, name, price_cents FROM products WHERE id = $1", 7)
        count = await conn.fetchval("SELECT count(*) FROM products")
        await conn.execute("UPDATE products SET price_cents = $1 WHERE id = $2", 4500, 7)
        await conn.executemany("INSERT INTO tags (product_id, tag) VALUES ($1, $2)", [(7, "hot"), (7, "new")])
        ids = await conn.fetch("SELECT id FROM products WHERE id = ANY($1::int[])", [1, 2, 3])
    await pool.close()`,
          try: R`شغّل Postgres في Docker (تاب Docker)، واعمل جدول products فيه كام صف، وجرّب كل دالة في المثال. وبعدين اكتب query بـ f-string زي [[f"... WHERE name = '{name}'"]] وجرّب [[name = "x' OR '1'='1"]]، وشوف ليه الـ [[$1]] مش اختيارية.`,
          flag: "script",
          deep: {
            why: R`الـ ORM مش إجباري. asyncpg بيديك SQL كامل (CTEs و window functions و [[ON CONFLICT]] و [[RETURNING]]) وأداء أعلى من أي حاجة تانية في Python، ومفيش طبقة سحرية بتولّد queries مش شايفها. ومشاريع حقيقية كتير ماشية بـ asyncpg و SQL في ملفات repository.`,
            how: R`[[create_pool]] بيفتح [[min_size]] اتصالات ويكبر لحد [[max_size]]، و [[pool.acquire()]] بيستنى لو كل الاتصالات مشغولة. وخلي [[max_size]] × عدد الـ workers × عدد الـ containers أقل من [[max_connections]] بتاع Postgres (الافتراضي 100).

asyncpg بيستخدم البروتوكول الثنائي و prepared statements: الـ query والقيم بيتبعتوا منفصلين، فمفيش SQL injection أصلًا، والـ statements المتكررة بتتعمل cache. عشان كده مع PgBouncer في وضع transaction لازم [[statement_cache_size=0]].

الـ [[Record]] اللي بيرجع بيتقري بالاسم [[r["name"]]] أو بالـ index، و [[dict(r)]] بيحوّله dict تبعته لـ Pydantic. والأنواع بتتحوّل لوحدها: [[timestamptz]] لـ datetime، و [[numeric]] لـ Decimal، و [[uuid]] لـ UUID، و [[jsonb]] لـ string (إلا لو عملت codec بـ [[set_type_codec]]).

وأي list بتتبعت كـ Postgres array: [[= ANY($1::int[])]] بدل ما تبني [[IN (1, 2, 3)]] بإيدك.`,
            when: "لما عايز SQL صريح وأداء عالي، أو الـ queries معقدة. ولو الفريق متعود على ORM والـ CRUD كتير: SQLAlchemy (بعد درسين).",
            mistakes: R`f-string في SQL (injection). و [[asyncpg.connect()]] مع كل request بدل pool. و [[%s]] أو [[?]] (دي بتاعة psycopg و sqlite)؛ asyncpg بيقبل [[$1]] بس. ونسيان [[command_timeout]] فـ query معلّقة تمسك اتصال للأبد. و [[fetch]] من غير LIMIT على جدول فيه مليون صف.`
          },
          lines: [
            "الدرايفر.",
            "موديل للنتيجة.",
            "شكل المنتج.",
            "حقل.",
            "حقل.",
            "السعر بالقروش int.",
            "دالة للتجربة (في التطبيق: الـ pool في الـ lifespan).",
            "pool: من ٢ لـ ١٠ اتصالات، وأي query أكتر من ١٠ ثواني تتلغي.",
            "خد اتصال، ويرجع للـ pool لوحده.",
            R`صفوف: الباراميترات [[$1]] و [[$2]] بتتبعت منفصلة عن الـ SQL.`,
            "كل Record لـ dict وبعدين لـ Pydantic.",
            "صف واحد أو None.",
            "قيمة واحدة.",
            R`أمر من غير نتيجة، وبيرجع string زي [[UPDATE 1]].`,
            "نفس الأمر لكذا صف.",
            "list بتتبعت كـ Postgres array.",
            "اقفل الـ pool (في التطبيق: بعد الـ yield في الـ lifespan)."
          ],
          sol: R`على جدول فيه ١٠ منتجات بأسعار من 700 لـ 7000: [[fetch]] بيرجع list من [[Record]] زي [[<Record id=1 name='p1' price_cents=700>]]، و [[fetchrow]] بيرجع Record واحد أو [[None]] لو مفيش، و [[fetchval]] قيمة واحدة ([[10]])، و [[execute]] بيرجع حالة الأمر كـ string ([[UPDATE 1]])، و [[executemany]] بيرجع [[None]]، و [[ANY($1::int[])]] مع list Python بيرجع التلاتة.

والـ f-string مع [[name = "x' OR '1'='1"]] بيرجع الـ ١٠ صفوف كلهم، لأن الـ query بقت [[WHERE name = 'x' OR '1'='1']] والشرط بقى صح دايمًا (SQL injection). ونفس الكلام بـ [[$1]] بيرجع ٠ صفوف: القيمة بتتبعت لـ Postgres منفصلة عن الـ SQL، فمهما كان فيها مبتبقاش كود. ولاحظ إن asyncpg صارم في الأنواع: [[fetch("... WHERE id = $1", "7")]] بترمي [[DataError: invalid input for query argument $1: '7' ('str' object cannot be interpreted as an integer)]]، فحوّل القيم قبلها (وده دور Pydantic).`
        },
        {
          cmd: "transactions",
          title: "كذا عملية يا تتنفذ كلها يا ولا واحدة",
          desc: R`[[async with conn.transaction():]] بيبدأ transaction: لو البلوك خلص عادي بيعمل commit، ولو حصل exception بيعمل rollback. وأي خطوتين مرتبطين (خصم من المخزون وإنشاء طلب) لازم يبقوا في transaction واحدة.

وللحاجات اللي ممكن تحصل من طلبين في نفس اللحظة (آخر قطعة في المخزون): UPDATE بشرط، أو [[SELECT ... FOR UPDATE]]، عشان متبيعش نفس القطعة مرتين.`,
          example: R`import json
import asyncpg
class OutOfStock(Exception):
    pass
async def place_order(conn: asyncpg.Connection, user_id: int, product_id: int, qty: int) -> int:
    async with conn.transaction():
        left = await conn.fetchval(
            "UPDATE products SET stock = stock - $1 WHERE id = $2 AND stock >= $1 RETURNING stock",
            qty, product_id,
        )
        if left is None:
            raise OutOfStock(product_id)
        order_id = await conn.fetchval(
            "INSERT INTO orders (user_id, product_id, qty) VALUES ($1, $2, $3) RETURNING id",
            user_id, product_id, qty,
        )
        await conn.execute(
            "INSERT INTO outbox (topic, payload) VALUES ('order.created', $1::jsonb)",
            json.dumps({"order_id": order_id}),
        )
    return order_id`,
          try: R`افتح اتنين [[psql]] وجرّب نفس الـ UPDATE على نفس المنتج من الاتنين جوه [[BEGIN]] من غير COMMIT: التاني هيستنى الأول. وبعدين في Python ارمي exception بعد أول INSERT، واتأكد إن المخزون منقصش.`,
          flag: "script",
          deep: {
            why: "من غير transaction: المخزون نقص والطلب متعملش لأن الـ INSERT فشل، أو طلبين في نفس اللحظة شافوا «فاضل قطعة» والاتنين اشتروا. دي bugs بتظهر تحت الضغط بس، وبتكلّف فلوس حقيقية.",
            how: R`[[conn.transaction()]] بيبعت [[BEGIN]]، والخروج من البلوك [[COMMIT]] أو [[ROLLBACK]]. ولو اتنادت جوه transaction تانية، بتعمل [[SAVEPOINT]] (nested).

الـ UPDATE بالشرط ([[WHERE stock >= $1]]) atomic: Postgres بيقفل الصف، فمن طلبين مع بعض واحد بس هيلاقي المخزون كفاية، والتاني [[RETURNING]] مش هيرجّع حاجة (None). وده أبسط وأسرع من [[SELECT ... FOR UPDATE]] وبعدين UPDATE.

الـ outbox: بدل ما تبعت إيميل أو event جوه الـ transaction (لو الإرسال نجح والـ commit فشل، تبقى بعت عن حاجة محصلتش)، بتكتب الـ event في جدول [[outbox]] في نفس الـ transaction، و worker منفصل يقرا ويبعت. كده الـ event موجود لو وبس لو الطلب اتعمل.

والـ isolation الافتراضي [[READ COMMITTED]]. وممكن [[conn.transaction(isolation="serializable")]] بس ساعتها لازم تعيد المحاولة لو Postgres رمى serialization error. وتفاصيل الـ isolation والـ locks في تاب «SQL و Prisma» وتاب PostgreSQL.`,
            when: "أي عملية كتابة فيها أكتر من statement، أو قراية بعدها كتابة على نفس الداتا. وخلي الـ transaction قصيرة: متعملش HTTP call جواها.",
            mistakes: R`transaction بتستنى API خارجي (الـ locks والاتصال محجوزين ثواني). و SELECT المخزون، تحسب في Python، وبعدين UPDATE بالرقم ([[SET stock = 4]]): race condition. وتمسك الـ exception جوه البلوك وتبلعه، فالـ commit يحصل على نص شغل.`
          },
          lines: [
            "لـ JSON الـ event.",
            "الدرايفر.",
            "exception بتاعك.",
            "فاضي.",
            "دالة بتاخد اتصال (من الـ dependency).",
            "BEGIN، و COMMIT أو ROLLBACK حسب البلوك.",
            "UPDATE بشرط...",
            "...ينقص بس لو المخزون كفاية، ويرجّع الباقي.",
            R`الباراميترات، و [[$1]] اتستخدمت مرتين.`,
            "قفلة.",
            "مفيش صف اتعدّل = المخزون مش كفاية.",
            "exception = rollback لكل حاجة.",
            "اعمل الطلب...",
            "...ورجّع الـ id.",
            "القيم.",
            "قفلة.",
            "event في نفس الـ transaction (outbox)...",
            "...worker هيقراه ويبعته بعدين.",
            "الـ payload كـ JSON.",
            "قفلة.",
            "هنا الـ commit حصل."
          ],
          sol: R`في الـ psql التاني، الـ UPDATE هيفضل واقف من غير ما يطبع حاجة لحد ما تعمل [[COMMIT]] (أو [[ROLLBACK]]) في الأول. Postgres عامل row lock على الصف. ولما الأول يعمل commit، التاني بيكمّل على القيمة الجديدة: لو المخزون كان 10 وكل واحد نقّص 1 هتلاقي [[8]] مش [[9]]. ده اللي بيخلي [[stock = stock - $1 WHERE stock >= $1]] آمن من غير ما تقرا الأول وتكتب بعدين.

وفي Python لو رميت exception بعد أول INSERT: المخزون هيفضل زي ما هو وجدول orders مفيهوش صف، لأن [[async with conn.transaction()]] عمل rollback للـ UPDATE والـ INSERT مع بعض. الطلب اللي بعده هياخد id أكبر بواحد (الـ sequence مبترجعش). ولو لقيت المخزون نقص، غالبًا الـ UPDATE كان برّه الـ [[async with]]، أو استخدمت connection تاني غير اللي فتح الـ transaction.`
        },
        {
          cmd: "SQLAlchemy async",
          title: "ORM بـ SQLAlchemy 2 وهو async",
          desc: R`SQLAlchemy 2 بيدّيك models بـ type hints ([[Mapped[int]]] و [[mapped_column]])، و queries بـ [[select()]]، ويشتغل async فوق asyncpg: [[create_async_engine("postgresql+asyncpg://...")]] و [[AsyncSession]].

الـ session بتتعمل لكل request في dependency بـ yield، والـ engine مرة واحدة. و [[expire_on_commit=False]] مهمة في async.

التسطيب: [[pip install "sqlalchemy[asyncio]" asyncpg]]، مش [[pip install sqlalchemy]] بس. من SQLAlchemy 2.1 مكتبة [[greenlet]] مبقتش بتتسطّب لوحدها، والجزء الـ async محتاجها، فمن غير الـ extra ده أول استخدام async هيرمي [[ImportError]] إن [[greenlet]] مش متسطّبة.`,
          example: R`from datetime import datetime
from typing import Annotated
from fastapi import Depends
from sqlalchemy import ForeignKey, func, select
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship, selectinload
class Base(DeclarativeBase):
    pass
class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(unique=True)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
class Order(Base):
    __tablename__ = "orders"
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    total_cents: Mapped[int]
    user: Mapped[User] = relationship()
engine = create_async_engine("postgresql+asyncpg://app:secret@localhost/shop", pool_size=10)
SessionLocal = async_sessionmaker(engine, expire_on_commit=False)
async def get_session():
    async with SessionLocal() as session:
        yield session
SessionDep = Annotated[AsyncSession, Depends(get_session)]
async def recent_orders(session: AsyncSession, user_id: int) -> list[Order]:
    stmt = select(Order).where(Order.user_id == user_id).options(selectinload(Order.user)).order_by(Order.id.desc()).limit(20)
    return list(await session.scalars(stmt))
async def create_user(session: AsyncSession, email: str) -> User:
    user = User(email=email)
    session.add(user)
    await session.commit()
    return user`,
          try: R`شيل [[selectinload(Order.user)]] وجرّب تقرا [[order.user.email]] بعد الـ query: هيطلع [[MissingGreenlet]]. ده الـ lazy loading اللي async مبيسمحش بيه. وبعدين اعمل الـ engine بـ [[echo=True]] وشوف الـ SQL اللي اتولّد.`,
          flag: "script",
          deep: {
            why: "لما الـ CRUD كتير والعلاقات متشعبة، كتابة SQL لكل حاجة بتتقل. و SQLAlchemy أشهر ORM في Python، ونسخة 2 نضّفت الـ API وبقت typed وبتشتغل async. وهتقابلها في أغلب مشاريع FastAPI.",
            how: R`[[DeclarativeBase]] أساس الـ models، و [[Mapped[T]]] النوع (و [[Mapped[str | None]]] يبقى nullable)، و [[mapped_column]] للإعدادات.

الـ engine جواه pool الاتصالات، وإنشاؤه مبيفتحش اتصال فورًا، فعادي يبقى على مستوى الـ module، وفي آخر الـ lifespan [[await engine.dispose()]]. والـ session وحدة شغل لكل request: بتتابع الـ objects اللي اتضافت أو اتعدّلت، و [[commit]] بيكتبهم.

[[expire_on_commit=False]]: الافتراضي إن بعد commit كل الـ attributes بتتمسح وتتقري تاني من القاعدة أول ما تلمسها. وفي async ده محتاج await، والـ attribute access مينفعش يعمل await، فبيطلع [[MissingGreenlet]]. ونفس السبب بيخلي الـ lazy loading للعلاقات ممنوع: حمّلها مقدمًا بـ [[selectinload]] (query تانية بـ IN) أو [[joinedload]] (JOIN)، أو استخدم [[AsyncAttrs]] و [[await obj.awaitable_attrs.user]].

[[session.scalars(stmt)]] بيرجع الـ objects نفسها، و [[session.execute(stmt)]] بيرجع صفوف. و [[session.get(User, 5)]] بالـ primary key. وتقدر تحوّل الناتج لـ Pydantic بـ [[from_attributes]].

والـ migrations مش شغل SQLAlchemy نفسه: [[Base.metadata.create_all]] للتجربة بس، و Alembic للحقيقي (الدرس الجاي). وفيه كمان SQLModel (من صاحب FastAPI) مبني على SQLAlchemy و Pydantic مع بعض.`,
            when: R`CRUD كتير وعلاقات، وفريق متعود على ORM. وتقدر تخلط: ORM للعادي، و [[text()]] أو asyncpg مباشرة للـ queries التقيلة.`,
            mistakes: R`N+1: loop على طلبات وكل واحد يعمل query لمستخدمه (في async بيطلع error، وده أحسن من sync اللي بيبطّأ في صمت). و session واحدة مشتركة بين requests. و [[create_engine]] الـ sync جوه تطبيق async. ونسيان [[await session.commit()]] فمفيش حاجة اتحفظت.`
          },
          lines: [
            "datetime.",
            "Annotated.",
            "Depends.",
            "أدوات الـ SQL.",
            "الحتت الـ async.",
            "الـ models والعلاقات والتحميل المسبق.",
            "أساس كل الـ models.",
            "فاضي.",
            "model للمستخدمين.",
            "اسم الجدول.",
            "primary key.",
            "string ومفيش اتنين زي بعض.",
            "القاعدة بتحط الوقت لوحدها.",
            "model للطلبات.",
            "اسم الجدول.",
            "primary key.",
            "foreign key.",
            "annotation لوحدها كفاية: عمود int مش null.",
            "علاقة: الطلب بيشاور على صاحبه.",
            "engine بدرايفر asyncpg، وجواه pool.",
            "مصنع sessions، ومبيمسحش الـ attributes بعد commit.",
            "dependency: session لكل request.",
            "افتحها، وهتتقفل لوحدها.",
            "ادّيها للـ route.",
            "النوع للـ routes.",
            "دالة repository.",
            "select بشرط، وحمّل المستخدم مقدمًا (مفيش lazy loading في async)، ورتّب، و LIMIT.",
            "نفّذ ورجّع الـ objects.",
            "إنشاء.",
            "object جديد.",
            "ضيفه للـ session.",
            "INSERT و COMMIT، والـ id و created_at بيرجعوا بـ RETURNING.",
            "رجّع."
          ],
          sol: R`من غير [[selectinload]]، [[order.user.email]] بترمي [[MissingGreenlet: greenlet_spawn has not been called; can't call await_() here. Was IO attempted in an unexpected place?]]. الـ [[user]] متحمّلش، فـ SQLAlchemy حاول يعمل query وإنت بتقرا attribute عادي من غير [[await]]، وده مينفعش في async. الحل تحمّله مقدمًا بـ [[selectinload]]، أو [[await session.refresh(order, ["user"])]]، أو [[lazy="raise"]] على الـ relationship عشان الغلطة تبان بدري.

ومع [[echo=True]] هتشوف [[SELECT orders.id, orders.user_id, orders.total_cents FROM orders WHERE orders.user_id = $1::INTEGER ORDER BY orders.id DESC LIMIT $2::INTEGER]]، وبعدها query تانية من [[selectinload]]: [[SELECT users.id, users.email, users.created_at FROM users WHERE users.id IN ($1::INTEGER)]]، يعني ٢ queries مهما كان عدد الطلبات، مش N+1. ولو ظهر [[ImportError: The SQLAlchemy asyncio module requires that the Python 'greenlet' library is installed]]، سطّب [[pip install "sqlalchemy[asyncio]" asyncpg]]: من SQLAlchemy 2.1 الـ greenlet مبقاش بيتسطّب لوحده.`
        },
        {
          cmd: "alembic",
          title: "تغيّر شكل الجداول بـ migrations بتتعمل commit",
          desc: R`Alembic أداة الـ migrations لـ SQLAlchemy: كل تغيير في الجداول ملف Python فيه [[upgrade()]] و [[downgrade()]]، بيتعمله commit مع الكود، ويتطبق على كل بيئة بنفس الترتيب. و [[--autogenerate]] بيقارن الـ models بالقاعدة ويكتب الـ migration، وانت تراجعه.

ولو مش بتستخدم SQLAlchemy (asyncpg و SQL بس)، نفس الفكرة بملفات SQL وسكربت (تاب PostgreSQL فيه «سكربت migrations»)، أو Alembic نفسه بـ [[op.execute("...")]].`,
          example: R`pip install alembic
alembic init -t async migrations
alembic revision --autogenerate -m "add orders.total_cents"
alembic upgrade head
alembic current
alembic history --verbose
alembic downgrade -1
alembic upgrade head --sql > upgrade.sql`,
          try: R`اعمل [[alembic init -t async migrations]]، وفي [[migrations/env.py]] خلّي [[target_metadata = Base.metadata]] والـ URL جاي من الإعدادات. ضيف عمود للـ model، واعمل autogenerate، وافتح الملف اللي اتعمل واقراه قبل [[upgrade]].`,
          deep: {
            why: R`[[create_all]] بيعمل الجداول لو مش موجودة بس، ومبيعدّلش جدول موجود. ومن غير migrations، كل تغيير بيتعمل بإيدك على السيرفر، ومحدش عارف القاعدة في الإنتاج شكلها إيه.`,
            how: R`[[alembic init -t async]] بيعمل [[alembic.ini]] وفولدر فيه [[env.py]] جاهز لـ engine async. في [[env.py]] بتربط [[target_metadata]] بـ [[Base.metadata]] عشان autogenerate يعرف الـ models، وتقرا الـ URL من الإعدادات بدل ما يتكتب في alembic.ini.

كل migration ليه [[revision]] و [[down_revision]]، فالملفات سلسلة. و Alembic بيسجّل آخر واحد اتطبق في جدول [[alembic_version]]، و [[upgrade head]] بيطبق كل اللي بعده بالترتيب.

autogenerate بيلقط الجداول والأعمدة والـ indexes والـ foreign keys، بس مش كل حاجة: تغيير اسم عمود بيطلع drop و add (والداتا تضيع!)، وبعض تغييرات الأنواع والـ constraints بتفوته. عشان كده الملف لازم يتقري ويتعدّل قبل ما يتعمله commit.

[[--sql]] (offline mode) بيطلّع الـ SQL من غير ما ينفّذه، تراجعه أو تديه للـ DBA.

وفي الديبلوي: [[alembic upgrade head]] خطوة قبل ما الـ containers الجديدة تقوم (job منفصل أو أمر في الـ entrypoint)، مش جوه التطبيق وكل worker بيحاول يعملها. والتغييرات الكاسرة (مسح عمود بيستخدمه الكود القديم) بتتعمل على مرحلتين: expand وبعدين contract. التفاصيل في «تغييرات آمنة في الإنتاج» في تاب PostgreSQL.`,
            when: "أي مشروع فيه قاعدة بيانات هتعيش أكتر من أسبوع.",
            mistakes: R`تعدّل migration اتطبق خلاص على الإنتاج بدل ما تعمل واحد جديد. وتعمل commit لـ autogenerate من غير ما تقراه (الـ rename بقى drop). واتنين في الفريق عملوا migration من نفس النقطة فبقى فيه اتنين head ([[alembic heads]]، والحل [[alembic merge]]). و [[downgrade]] على الإنتاج بيمسح داتا.`
          },
          lines: [
            "سطّب Alembic.",
            "اعمل فولدر migrations بقالب async.",
            "قارن الـ models بالقاعدة واكتب migration جديد (واقراه!).",
            "طبّق كل الـ migrations اللي لسه متطبقتش.",
            "القاعدة واقفة على أنهي revision.",
            "السلسلة كلها بالتفصيل.",
            "ارجع خطوة (بحذر: ممكن يمسح داتا).",
            "اطبع الـ SQL من غير ما تنفّذه، للمراجعة."
          ],
          sol: R`[[alembic init -t async migrations]] بيعمل [[alembic.ini]] وفولدر [[migrations/]] فيه [[env.py]] و [[versions/]]. وفي [[env.py]] بتحط [[from app.models import Base]] و [[target_metadata = Base.metadata]] و [[config.set_main_option("sqlalchemy.url", settings.database_url)]]. بعد ما تضيف [[total_cents: Mapped[int] = mapped_column(server_default="0")]]، الـ autogenerate بيطبع [[Detected added column 'orders.total_cents']] ويعمل ملف في [[versions/]] فيه [[revision]] و [[down_revision]] (اللي قبله)، و [[upgrade()]] فيها [[op.add_column('orders', sa.Column('total_cents', sa.Integer(), server_default='0', nullable=False))]]، و [[downgrade()]] فيها [[op.drop_column]]. وبعد [[upgrade head]]، [[alembic current]] بيطبع الـ revision ومعاه [[(head)]].

ليه تقراه قبل [[upgrade]]؟ لو القاعدة فيها جداول مش في الـ models، الـ autogenerate هيكتب [[Detected removed table]] ويحط [[op.drop_table]] في الملف، وفي تجربتنا ده حصل فعلًا. وكمان تغيير اسم عمود بيطلع drop و add (يعني البيانات تضيع)، مش rename. ولو ضفت عمود NOT NULL من غير [[server_default]] على جدول فيه صفوف، الـ upgrade هيفشل. الملف اللي اتولّد مسودة، مش حاجة تشغّلها من غير ما تبص فيها.`
        }
      ]
    },
    {
      t: "httpx و Redis والشغل في الخلفية",
      l: 3,
      n: "تكلّم APIs تانية صح، و cache و rate limit بـ Redis، وشغل بعد الرد أو في worker",
      items: [
        {
          cmd: "httpx.AsyncClient",
          title: "تكلّم API خارجي من جوه الـ API بتاعك",
          desc: R`[[httpx.AsyncClient]] واحد مشترك للتطبيق كله (يتعمل في الـ lifespan)، مش client جديد مع كل request: بيعيد استخدام الاتصالات (keep-alive)، وده فرق كبير في السرعة. وحدد timeout دايمًا، و [[raise_for_status()]] عشان الـ 4xx و 5xx تبقى exceptions.

وللمحاولة تاني عند فشل مؤقت: retry بـ backoff (مكتبة tenacity، أو loop بسيطة)، بس للطلبات الآمنة (GET، أو اللي فيها idempotency key).

ملحوظة 2026: httpx نفسه نشاطه قلّ، و Pydantic بقت بتصون استكمال ليه اسمه [[httpx2]] بنفس الـ API بالظبط (الفرق [[import httpx2]])، و Starlette الحديث بيفضّله للـ TestClient. الأمثلة هنا بـ httpx لأنه لسه اللي [[fastapi[standard]]] بيسطّبه، والنقل غالبًا تغيير اسم الـ import بس.`,
          example: R`import asyncio
from contextlib import asynccontextmanager
import httpx
from fastapi import FastAPI, HTTPException, Request
@asynccontextmanager
async def lifespan(app: FastAPI):
    async with httpx.AsyncClient(
        base_url="https://api.payments.example",
        timeout=httpx.Timeout(5.0, connect=2.0),
        limits=httpx.Limits(max_connections=50, max_keepalive_connections=20),
        headers={"User-Agent": "shop-api/1.0"},
    ) as client:
        app.state.http = client
        yield
app = FastAPI(lifespan=lifespan)
async def get_json(client: httpx.AsyncClient, url: str, tries: int = 3) -> dict:
    for attempt in range(tries):
        try:
            r = await client.get(url)
            r.raise_for_status()
            return r.json()
        except (httpx.TransportError, httpx.HTTPStatusError) as e:
            retryable = isinstance(e, httpx.TransportError) or e.response.status_code == 429 or e.response.status_code >= 500
            if not retryable or attempt == tries - 1:
                raise
            await asyncio.sleep(0.2 * 2**attempt)
    raise RuntimeError("unreachable")
@app.get("/payments/{pid}")
async def payment(pid: str, request: Request):
    try:
        return await get_json(request.app.state.http, f"/v1/payments/{pid}")
    except httpx.HTTPError:
        raise HTTPException(502, "payment provider unavailable")`,
          try: R`خلّي الـ [[base_url]] يبقى [[https://httpbin.org]] واطلب [[/status/503]] وشوف الـ retries في اللوج (شغّل [[logging.basicConfig(level=logging.INFO)]]، و httpx بيسجّل كل طلب). وبعدين [[/delay/10]] وشوف الـ timeout.`,
          flag: "script",
          deep: {
            why: R`الـ API بتاعك بيعتمد على خدمات تانية: دفع، وشحن، و SMS، و AI. لو واحدة بطيئة أو واقعة ومفيش timeout، الطلبات عندك بتتراكم لحد ما الـ API كله يقف. ولو كل request بيعمل client جديد، كل طلب بيعمل TCP و TLS handshake من الأول.`,
            how: R`[[AsyncClient]] جواه connection pool: [[max_connections]] أقصى اتصالات مفتوحة، و [[max_keepalive_connections]] اللي بيفضلوا مفتوحين للطلب الجاي. و [[async with]] بيقفل كل الاتصالات لما التطبيق يقفل.

[[httpx.Timeout(5.0, connect=2.0)]]: ٥ ثواني لكل حاجة (read و write و pool)، و ٢ للاتصال. والـ timeout الافتراضي في httpx ٥ ثواني (عكس [[requests]] اللي ملوش timeout خالص)، بس اكتبه صريح عشان تفكّر فيه.

[[raise_for_status()]] بيرمي [[HTTPStatusError]] لأي 4xx أو 5xx، و [[TransportError]] للمشاكل قبل الرد (timeout، واتصال اتقطع)، و [[HTTPError]] الأب للاتنين.

الـ retry: exponential backoff (0.2 وبعدين 0.4 وبعدين 0.8)، وبس للأخطاء المؤقتة (شبكة و 5xx و 429)، مش 400 أو 404. ومع 429 احترم header الـ [[Retry-After]] لو موجود. ومتعملش retry لـ POST بيدفع فلوس إلا لو الـ API بيدعم idempotency key (تاب «APIs متقدمة»). ومكتبة tenacity بتعمل ده بـ decorator.

ورد الخدمة الخارجية يتفحص بـ Pydantic ([[Payment.model_validate(r.json())]]) زي أي داتا جاية من برّه. وفي الاختبارات، [[httpx.MockTransport]] أو مكتبة respx بتبدّل الـ API الحقيقي.`,
            when: R`أي نداء لـ API تاني من جوه تطبيق async. وفي السكربتات الـ sync العادية، [[httpx.Client]] بنفس الـ API من غير await.`,
            mistakes: R`[[requests]] جوه [[async def]]. و [[async with httpx.AsyncClient() as c:]] جوه كل route (مفيش إعادة استخدام للاتصالات). ومفيش timeout، أو timeout ٦٠ ثانية. و retry من غير حد أو من غير backoff (بتضرب خدمة واقعة أصلًا). وترجّع خطأ الخدمة الخارجية للعميل زي ما هو بدل 502.`
          },
          lines: [
            "لـ sleep في الـ backoff.",
            "الـ lifespan.",
            "httpx.",
            "FastAPI.",
            "lifespan.",
            "بيتنادى مرة.",
            "client واحد للتطبيق كله...",
            "...كل الطلبات تبدأ بالـ URL ده.",
            "٥ ثواني عمومًا، و ٢ للاتصال.",
            "حدود الـ pool.",
            "headers لكل طلب.",
            "والـ client هيتقفل لما التطبيق يقفل.",
            "خزّنه في app.state.",
            "التطبيق شغال هنا.",
            "التطبيق.",
            "GET بـ retry.",
            "لحد ٣ محاولات.",
            "حاول.",
            "الطلب (المسار بيتضاف على base_url).",
            "4xx أو 5xx يبقى exception.",
            "نجح.",
            "مشكلة شبكة أو رد خطأ.",
            "يستاهل نعيد؟ الشبكة و 5xx و 429 آه، وباقي الـ 4xx لأ.",
            "مش مؤقت، أو دي آخر محاولة؟",
            "ارمي نفس الخطأ.",
            "استنى 0.2 وبعدين 0.4 قبل المحاولة الجاية.",
            "عشان mypy: مش هنوصل هنا.",
            "route.",
            "بياخد الـ request عشان يوصل للـ client.",
            "حاول.",
            "رجّع رد الخدمة.",
            "الخدمة فشلت.",
            "502: المشكلة في خدمة ورانا، مش عندنا ولا عند العميل."
          ],
          sol: R`مع [[/status/503]] هتشوف في اللوج ٣ سطور [[INFO:httpx:HTTP Request: GET https://httpbin.org/status/503 "HTTP/1.1 503 Service Unavailable"]]، بينهم 0.2 ثانية وبعدين 0.4 (الـ backoff)، وبعد التالتة الـ [[raise]] بيطلّع [[HTTPStatusError: Server error '503 Service Unavailable']] والـ route بيحوّلها [[502]] و [[payment provider unavailable]]. وجرّب كمان [[/status/404]]: طلب واحد بس ومفيش retry، لأن 404 غلط عندك مش عند السيرفر، وإعادته مش هتغيّر حاجة.

و [[/delay/10]] مع [[Timeout(5.0)]]: كل محاولة بتقف بعد ٥ ثواني بـ [[ReadTimeout]]، والـ [[ReadTimeout]] نوع من [[TransportError]] فبيتعاد، فالطلب كله بياخد حوالي ١٥.٦ ثانية (٣ × ٥ + 0.6 backoff) قبل الـ 502. خد بالك: الـ retry بيضرب الـ timeout في عدد المحاولات، فلو عندك حد أقصى لوقت الرد، احسبه على كده. ولو httpbin.org مش متاح عندك، اعمل FastAPI صغير فيه [[/status/{code}]] بيرجع [[Response(status_code=code)]] و [[/delay/{n}]] بـ [[asyncio.sleep]]، والنتيجة هتبقى هي هي.`
        },
        {
          cmd: "redis cache",
          title: "cache بـ Redis: تحفظ النتيجة وصلاحيتها تنتهي لوحدها",
          desc: R`[[redis.asyncio]] (من مكتبة [[redis]]) النسخة async من الـ client. والـ pattern الأشهر cache-aside: دوّر في Redis، لو موجود رجّعه، لو مش موجود هاته من القاعدة وحطه في Redis بـ TTL ([[ex=60]]). وأول ما الداتا تتغير امسح المفتاح.

والـ client يتعمل مرة في الـ lifespan زي أي مورد مشترك. وتشغيل Redis نفسه في تاب Docker، وتصميم طبقات الكاش في تاب «بناء مشروع كامل».`,
          example: R`import redis.asyncio as redis
from pydantic import BaseModel, TypeAdapter
class Product(BaseModel):
    id: int
    name: str
    price_cents: int
Products = TypeAdapter(list[Product])
r = redis.from_url("redis://localhost:6379/0", decode_responses=True)
async def load_products_from_db(category: str) -> list[Product]:
    return [Product(id=1, name="Tea", price_cents=1500)]
async def products_by_category(category: str) -> list[Product]:
    key = f"products:v1:{category}"
    cached = await r.get(key)
    if cached is not None:
        return Products.validate_json(cached)
    items = await load_products_from_db(category)
    await r.set(key, Products.dump_json(items), ex=60)
    return items
async def on_product_changed(category: str) -> None:
    await r.delete(f"products:v1:{category}")`,
          try: R`شغّل Redis ([[docker run -d -p 6379:6379 redis:8]])، ونادي الدالة مرتين وقيس الوقت. وبعدين من [[redis-cli]]: [[GET products:v1:tea]] و [[TTL products:v1:tea]]، وشوف العداد بينزل.`,
          flag: "script",
          deep: {
            why: "نفس الـ query التقيلة (قايمة منتجات، إحصائيات) بتتنفذ ألف مرة في الدقيقة ونتيجتها واحدة. Redis بيرجّعها من الذاكرة في أقل من ملّي ثانية، والقاعدة ترتاح للكتابة وللحاجات اللي لازم تبقى طازة.",
            how: R`[[from_url]] بيعمل client جواه connection pool، و [[decode_responses=True]] بيرجّع strings بدل bytes. و [[set(key, value, ex=60)]] بيحط المفتاح بعمر ٦٠ ثانية، و Redis بيمسحه لوحده. والقفل في آخر الـ lifespan بـ [[await r.aclose()]].

cache-aside يعني التطبيق هو اللي بيقرر يقرا ويكتب في الـ cache. والمشكلتين الكبار: invalidation (الداتا اتغيرت والـ cache لسه قديم: امسح المفتاح عند التعديل، والـ TTL شبكة أمان)، و stampede (المفتاح انتهى و ١٠٠٠ request راحوا للقاعدة مع بعض: TTL فيه عشوائية بسيطة، أو lock بـ [[SET key val NX EX 10]] عشان واحد بس يحسب).

[[v1]] في اسم المفتاح: لو شكل الموديل اتغير، غيّرها لـ v2، والمفاتيح القديمة تموت لوحدها بالـ TTL بدل ما تقع في الـ parsing.

و [[TypeAdapter]] بيعمل الـ JSON في Rust في الاتجاهين، أسرع من [[json.dumps]]، وبيفحص وهو بيقرا.

و [[@lru_cache]] في الذاكرة مش بديل: كل worker وكل container ليه نسخته، ومحدش يعرف يمسحها لما الداتا تتغير.`,
            when: "داتا بتتقري كتير وبتتغير قليل، ومقبول تبقى قديمة ثواني: كتالوج، وإعدادات، وصفحات عامة، وردود APIs خارجية. ومش للداتا اللي لازم تبقى دقيقة لحظيًا (رصيد، مخزون وقت الشراء).",
            mistakes: R`cache من غير TTL (بيكبر للأبد، والداتا القديمة عايشة). ومفتاح مشترك بين المستخدمين ([[products:list]]) لرد فيه حاجات خاصة بكل واحد. و cache لـ ORM objects بـ pickle. ونسيان إن Redis ممكن يقع: الـ cache لازم يبقى اختياري (لو Redis مش متاح، روح للقاعدة).`
          },
          lines: [
            "الـ client الـ async من مكتبة redis.",
            "الموديل، و TypeAdapter للـ JSON.",
            "موديل.",
            "حقل.",
            "حقل.",
            "حقل.",
            "adapter لليستة منتجات، يتعمل مرة واحدة.",
            "client جواه pool (في التطبيق: في الـ lifespan).",
            "القاعدة (وهمية هنا).",
            "رجّع.",
            "الدالة اللي بالـ cache.",
            "المفتاح: نوع الداتا ونسختها والفئة.",
            "دوّر في Redis.",
            "موجود؟",
            "حوّله من JSON لموديلات وارجع، من غير ما تلمس القاعدة.",
            "مش موجود: هاته من القاعدة.",
            "خزّنه JSON لمدة ٦٠ ثانية.",
            "رجّع.",
            "لما منتج يتغير.",
            "امسح المفتاح، والطلب الجاي يجيب الجديد."
          ],
          sol: R`النداء الأول بيروح للقاعدة ويكتب في Redis، والتاني بيرجع من Redis. عشان الفرق يبان، خلّي [[load_products_from_db]] تعمل [[await asyncio.sleep(0.3)]] كأنها query بطيئة: في تجربتنا الأول أخد حوالي [[301ms]] والتاني [[0.3ms]]. بالـ fake اللي في المثال زي ما هو، الاتنين أقل من ملّي ثانية ومش هتحس بفرق.

و [[GET products:v1:tea]] في [[redis-cli]] بيرجع [[[{"id":1,"name":"Tea","price_cents":1500}]]] (JSON مضغوط من [[dump_json]])، و [[TTL products:v1:tea]] بيبدأ من [[60]] وبعد ثانيتين [[58]]، ولما يوصل للصفر المفتاح بيتمسح و [[TTL]] بيرجع [[-2]] (مش موجود). ولو [[TTL]] رجع [[-1]] يبقى المفتاح اتكتب من غير [[ex]] وهيفضل للأبد، ودي أشهر غلطة في الـ cache. ولو الدالة رجعت [[bytes]] بدل [[str]]، انت نسيت [[decode_responses=True]].`
        },
        {
          cmd: "redis rate limit",
          title: "تحدد عدد الطلبات لكل مستخدم في الدقيقة",
          desc: R`أبسط rate limit (fixed window): مفتاح لكل مستخدم ولكل دقيقة، و [[INCR]] مع كل طلب، و [[EXPIRE]] عشان يموت لوحده. لو العدد عدّى الحد: 429 مع [[Retry-After]]. ولأن العداد في Redis، الحد بيتطبق على كل الـ workers والـ containers مع بعض.

وتعمله dependency، فتحطه على الـ routes الحساسة (login و OTP والبحث) بحدود مختلفة.`,
          example: R`import time
import redis.asyncio as redis
from fastapi import Depends, FastAPI, HTTPException, Request
r = redis.from_url("redis://localhost:6379/0")
app = FastAPI()
def rate_limit(limit: int, window: int = 60):
    async def dep(request: Request) -> None:
        who = request.client.host if request.client else "unknown"
        bucket = int(time.time() // window)
        key = f"rl:{request.url.path}:{who}:{bucket}"
        async with r.pipeline(transaction=True) as pipe:
            count, _ = await pipe.incr(key).expire(key, window).execute()
        if count > limit:
            retry = window - int(time.time()) % window
            raise HTTPException(429, "Too many requests", headers={"Retry-After": str(retry)})
    return dep
@app.post("/auth/login", dependencies=[Depends(rate_limit(5))])
async def login():
    return {"ok": True}`,
          try: R`ابعت ٧ طلبات ورا بعض: [[for i in $(seq 7); do curl -s -o /dev/null -w "%{http_code}\n" -X POST localhost:8000/auth/login; done]] وشوف آخر اتنين 429. وبص على المفاتيح في [[redis-cli]] بـ [[SCAN 0 MATCH rl:*]].`,
          flag: "script",
          deep: {
            why: R`من غير rate limit، أي حد يجرّب مليون باسورد على [[/auth/login]]، أو يبعت ألف OTP ويخلّص رصيد الـ SMS، أو سكربت يسحب الكتالوج كله. والعداد في ذاكرة الـ process مبيشتغلش مع كذا worker: كل واحد عنده عداد لوحده.`,
            how: R`المفتاح فيه رقم النافذة ([[time // 60]])، فكل دقيقة مفتاح جديد. و [[INCR]] atomic في Redis: طلبين في نفس اللحظة مستحيل ياخدوا نفس الرقم. و [[pipeline(transaction=True)]] بيبعت [[INCR]] و [[EXPIRE]] في رحلة واحدة جوه [[MULTI]] و [[EXEC]]، فمفيش مفتاح يفضل من غير expire لو حاجة وقعت بينهم.

والـ fixed window عيبه إن الحد ممكن يتضاعف على حدود الدقيقة (٥ في آخر ثانية و ٥ في أول ثانية بعدها). لو محتاج دقة: sliding window بـ sorted set، أو token bucket بـ Lua script. ومكتبات زي [[limits]] و [[slowapi]] بتعمل ده جاهز.

المفتاح بالـ IP للـ routes اللي قبل الـ login، وبالـ user id بعده. وورا nginx الـ IP لازم ييجي من [[X-Forwarded-For]] بشكل آمن ([[--proxy-headers]] و [[--forwarded-allow-ips]] في تاب Python)، وإلا كل الناس ليهم نفس الـ IP ويتقفلوا مع بعض. ولو فيه rate limit في nginx كمان ([[limit_req]] في تاب Nginx)، ده خط أول، وده للحدود الذكية حسب المستخدم. والفكرة العامة في تاب «الأمان».`,
            when: "login و register و OTP و reset password والبحث والـ endpoints الغالية (AI، تصدير)، و APIs عامة ليها API keys.",
            mistakes: R`عداد في dict في الذاكرة. و [[INCR]] من غير [[EXPIRE]] (المفتاح بيعيش للأبد والمستخدم متقفل للأبد). و IP بتاع nginx لكل الناس. و 429 من غير [[Retry-After]]. وإنك متقررش مسبقًا تعمل إيه لو Redis وقع: تعدّي الطلبات (fail open) ولا ترفضها (fail closed).`
          },
          lines: [
            "للوقت.",
            "Redis async.",
            "FastAPI.",
            "client (في التطبيق: في الـ lifespan).",
            "التطبيق.",
            "factory: الحد وطول النافذة بالثواني.",
            "الـ dependency الحقيقية.",
            "مين؟ الـ IP هنا، أو الـ user id بعد الـ login.",
            "رقم النافذة الحالية: بيتغير كل دقيقة.",
            "مفتاح لكل مسار ومستخدم ونافذة.",
            "أوامر في رحلة واحدة جوه MULTI و EXEC.",
            "زوّد العداد، وحط له عمر، وخد الناتج.",
            "عدّى الحد؟",
            "فاضل كام ثانية للنافذة الجاية.",
            R`429، و [[Retry-After]] بيقول للعميل يستنى قد إيه.`,
            "رجّع الـ dependency.",
            "٥ محاولات login في الدقيقة لكل IP.",
            "الـ route.",
            "رجّع."
          ],
          sol: R`الناتج: خمس [[200]] وبعدين [[429]] و [[429]]. ولو جربت [[curl -i]] على طلب زيادة هتشوف [[HTTP/1.1 429 Too Many Requests]] و [[retry-after: 11]] مثلًا (الثواني الباقية على الدقيقة) و [[{"detail":"Too many requests"}]].

و [[SCAN 0 MATCH rl:*]] بيرجع cursor ([[0]] يعني خلص) ومفتاح زي [[rl:/auth/login:127.0.0.1:29845334]]: الـ path، والـ IP، ورقم الدقيقة من أول 1970. و [[GET]] عليه بيطلّع [[7]]. لو لقيت الطلب السادس رجع 200، غالبًا الدقيقة خلصت في النص والعداد بدأ من جديد: ده عيب الـ fixed window، ممكن حد يبعت ١٠ في ثانيتين على حدود دقيقتين. ولو السيرفر ورا Nginx أو load balancer، [[request.client.host]] هيبقى IP الـ proxy للكل، فالكل هيتقفل مع بعض، لازم تقرا [[X-Forwarded-For]] من proxy بتثق فيه.`
        },
        {
          cmd: "BackgroundTasks",
          title: "شغل بعد ما الرد يتبعت: إيميل، لوج، webhook",
          desc: R`[[BackgroundTasks]] بيخلّيك تضيف دالة تشتغل بعد ما الرد يوصل للعميل: [[tasks.add_task(send_email, to, body)]]. فالعميل مش بيستنى الإيميل يتبعت.

بس هي بتشتغل جوه نفس الـ process: لو السيرفر اتعمله restart أو وقع، الشغل ضاع، ومفيش retry. فهي للحاجات الخفيفة اللي لو ضاعت مش مشكلة. والشغل المهم أو التقيل (فواتير، معالجة صور، تقارير) مكانه queue و worker منفصل: arq أو Celery أو Dramatiq أو taskiq.`,
          example: R`import asyncio
import logging
from fastapi import BackgroundTasks, FastAPI
from pydantic import BaseModel, EmailStr
log = logging.getLogger("app")
app = FastAPI()
class Signup(BaseModel):
    email: EmailStr
async def send_welcome(email: str) -> None:
    try:
        await asyncio.sleep(1)
        log.info("welcome sent to %s", email)
    except Exception:
        log.exception("welcome email failed for %s", email)
def audit(event: str, email: str) -> None:
    log.info("audit %s %s", event, email)
@app.post("/signup", status_code=201)
async def signup(data: Signup, tasks: BackgroundTasks):
    tasks.add_task(send_welcome, data.email)
    tasks.add_task(audit, "signup", data.email)
    return {"ok": True}
# شغل مهم: queue و worker بـ arq (بيتخزن في Redis وبيتعاد لو فشل)
# pool = await arq.create_pool(RedisSettings())
# await pool.enqueue_job("generate_invoice", order_id)`,
          try: R`خلّي [[send_welcome]] تستنى ٥ ثواني، وابعت [[curl -w "%{time_total}\n" -X POST localhost:8000/signup -H "Content-Type: application/json" -d '{"email": "a@example.com"}']]: الرد هيرجع فورًا، واللوج هيظهر بعد ٥ ثواني. وبعدين اقفل السيرفر بالقوة في النص (Ctrl+C مرتين، أو [[kill -9]] للـ PID) وشوف الإيميل ضاع. (الـ restart العادي uvicorn بيستنى فيه الـ tasks تخلص، بس الـ crash أو الـ SIGKILL بعد مهلة الـ deploy بيضيّعها.)`,
          flag: "script",
          deep: {
            why: "التسجيل بياخد ٣ ثواني لأن الـ route مستني SMTP يرد، والمستخدم مش محتاج يستنى الإيميل عشان يشوف «تم». بس لو حطيت شغل مهم في BackgroundTasks، أول deploy هيضيّع طلبات من غير ما حد يعرف.",
            how: R`الـ tasks بتتنفذ بالترتيب بعد ما الـ response يتبعت، في نفس الـ event loop (لو [[async def]]) أو في threadpool (لو [[def]]). ولو واحدة رمت exception، اللي بعدها مش هتشتغل، فحط try/except جواها.

و [[BackgroundTasks]] ينفع ييجي في dependency كمان، و FastAPI بيجمعهم كلهم.

ومهم: متستخدمش حاجة من الـ request في الـ task (الاتصال من dependency بـ yield، أو الـ session): ممكن تكون اتقفلت. ابعت القيم اللي محتاجها (الإيميل، الـ id)، والـ task تفتح اللي محتاجاه بنفسها.

الـ worker والـ queue: الطلب بيتكتب في Redis أو RabbitMQ، و process منفصلة (container تاني) بتسحب وتنفّذ، ولو فشلت بتعيد، ولو السيرفر وقع الطلب لسه في الـ queue. و arq بسيط و async ومبني على Redis، و Celery الأقدم والأكبر. وفي الـ outbox pattern (درس transactions)، الـ worker بيقرا من جدول في القاعدة بدل queue. والفكرة كاملة في «background jobs» في تاب «بناء مشروع كامل».`,
            when: "BackgroundTasks: لوج، و analytics، وإيميل «أهلًا» مش حرج، و invalidate cache. و queue: أي حاجة لازم تحصل (فواتير، webhooks للعملاء)، أو تقيلة (صور، PDF، AI)، أو محتاجة retry أو جدولة.",
            mistakes: R`معالجة فيديو في BackgroundTasks (بتاكل CPU الـ API نفسه). وتبعت الـ db session للـ task. وتفتكر إن الـ task بتتعاد لو فشلت. وحسبة CPU تقيلة في task [[async def]]: بتقفل الـ loop بعد الرد، والطلبات الجاية هي اللي تستنى.`
          },
          lines: [
            "لـ sleep.",
            "logging.",
            "BackgroundTasks.",
            "الموديل.",
            "logger.",
            "التطبيق.",
            "الـ body.",
            "حقل.",
            "الشغل اللي هيحصل بعد الرد.",
            "أي خطأ هنا مش هيوصل للعميل، فلازم تمسكه بنفسك.",
            "كأنه اتصال بـ SMTP.",
            "لوج.",
            "امسك.",
            "سجّل الخطأ كامل.",
            "task sync: بتشتغل في threadpool.",
            "لوج.",
            "route.",
            "FastAPI بيدّيك object الـ tasks.",
            "ضيف task بالباراميترات (قيم، مش objects من الـ request).",
            "تانية، بتشتغل بعد الأولى.",
            "الرد بيتبعت فورًا، والـ tasks بعده."
          ],
          sol: R`[[curl]] بيطبع [[{"ok":true}]] و [[time_total]] حوالي [[0.002]] ثانية، ولوج السيرفر بيطبع [[POST /signup HTTP/1.1" 201 Created]] على طول، وبعد ٥ ثواني [[welcome sent to a@example.com]] وبعده على طول [[audit signup a@example.com]]. لاحظ إن الـ audit استنى الإيميل يخلص: الـ tasks بتشتغل ورا بعض بالترتيب، مش مع بعض.

ولو بعت طلب تاني وعملت [[kill -9]] للسيرفر قبل الخمس ثواني: الـ curl خد 201، بس [[welcome sent to b@example.com]] عمرها ما هتظهر، ومفيش أي أثر إنها كانت موجودة. ده الفرق بين BackgroundTasks و queue زي arq: الـ task عايشة في ذاكرة البروسيس بس. فلو ضياعها مشكلة (فاتورة، دفع، إيميل تأكيد) لازم تتكتب في Redis أو القاعدة الأول.`
        }
      ]
    }
]);
