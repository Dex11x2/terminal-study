// تكملة تاب pydata: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pydata/01.js (شرح حقول الدرس في أوله)
MORE("pydata", [
    {
      t: "جمع الداتا من APIs والويب",
      l: 3,
      n: "API رسمي الأول، ولو مفيش: requests و BeautifulSoup بأدب (robots.txt والتأخير والقانون). كل التجارب على API وصفحة بتشغّلهم انت على جهازك",
      items: [
        {
          cmd: "API و json_normalize",
          title: "تسحب داتا من API بصفحات، وتفرد الـ JSON المتداخل جدول",
          desc: R`لو الموقع أو النظام ليه API، ده الطريق الصح قبل أي scraping: [[requests]] بـ token في الـ header، و loop على الصفحات لحد ما [[next_page]] يبقى فاضي، وبعدين [[pd.json_normalize(records)]] بيفرد الـ objects المتداخلة لأعمدة ([[customer.city]] تبقى [[customer_city]])، و [[record_path="lines"]] بيعمل صف لكل عنصر في list جوه كل record.

الـ token من environment variable، مش مكتوب في الكود. والتجربة على API تجريبي بتشغّله على جهازك.`,
          example: R`import os
import pandas as pd
import requests
BASE = "http://127.0.0.1:8000"
TOKEN = os.environ["SHOP_TOKEN"]
session = requests.Session()
session.headers["Authorization"] = f"Bearer {TOKEN}"
records, page = [], 1
while page:
    resp = session.get(f"{BASE}/orders", params={"page": page}, timeout=10)
    resp.raise_for_status()
    body = resp.json()
    records.extend(body["data"])
    page = body["next_page"]
print(len(records), records[0]["customer"])
orders = pd.json_normalize(records, sep="_").drop(columns="lines")
print(orders)
city_path = ["customer", "city"]
lines = pd.json_normalize(records, record_path="lines", meta=["id", city_path], sep="_")
lines["total"] = lines["qty"] * lines["price"]
print(lines)
orders["created"] = pd.to_datetime(orders["created"]).dt.tz_convert("Africa/Cairo")
print(lines.groupby("customer_city", dropna=False)["total"].sum())`,
          try: R`شغّل الـ API التجريبي، وشغّل الـ client من غير ما تحط [[SHOP_TOKEN]] في البيئة: إيه الخطأ؟ وبعدين حطه غلط ([[wrong]]): إيه الخطأ المرة دي ومن أنهي سطر؟ وفي الآخر هات إجمالي كل [[sku]] من جدول [[lines]].`,
          flag: "script",
          deep: {
            why: R`الـ API معمول عشان البرامج تقرا منه: الداتا منظمة (JSON)، وثابتة الشكل، ومسموح بيها، وفيها pagination و rate limits معلنة. الـ scraping بيقع مع أي تغيير في تصميم الصفحة ومحاط بأسئلة قانونية. فأول سؤال قبل ما تكتب scraper: فيه API؟ (حتى الصفحات اللي شغالة بـ JavaScript غالبًا بتكلم API تقدر تشوفه في Network tab في المتصفح.)`,
            how: R`أغلب الـ APIs بترجّع الداتا على صفحات (pagination) عشان الرد ميبقاش ضخم: هنا [[?page=N]] والرد فيه [[next_page]]، ولما يبقى [[null]] (يعني [[None]] في Python) الـ loop بيقف. أنواع تانية: [[offset]] و [[limit]]، أو [[cursor]] بتبعته زي ما هو، أو header اسمه [[Link]]. اقرا الـ docs بتاعة الـ API.

[[params={"page": page}]] بيبني الـ query string بنفسه (ويعمل encoding للعربي والرموز). و [[resp.json()]] بيحوّل الرد dict. و [[records.extend(list)]] بيزوّد عناصر الـ list على [[records]].

[[pd.json_normalize(records)]] بيعمل صف لكل record، والـ dict المتداخل بيتفرد أعمدة باسم [[الأب.الابن]] (و [[sep="_"]] بيخليها [[الأب_الابن]]). والـ list المتداخلة ([[lines]]) بتفضل عمود فيه lists، فبنشيلها ونعمل لها جدول لوحدها: [[record_path="lines"]] = صف لكل سطر، و [[meta=[...]]] = أعمدة من الـ record الأب تتكرر جنب كل سطر (والحقل المتداخل مساره list زي [[["customer", "city"]]]).

التواريخ بالـ [[Z]] في الآخر = UTC، و [[pd.to_datetime]] بيفهمها timezone-aware، و [[tz_convert("Africa/Cairo")]] بيحوّلها للقاهرة.

[[os.environ["SHOP_TOKEN"]]] بيرمي [[KeyError]] لو المتغير مش موجود: أحسن من إن السكربت يكمل بـ token فاضي (درس [[os.environ و .env]] في تاب Python).`,
            when: R`أي مصدر داتا ليه API: أنظمة الشغل الداخلية، والـ CRM، والمتاجر، والـ APIs الحكومية والمفتوحة. ولو هتسحب كتير: احترم الـ rate limit المكتوب في الـ docs، وابعت [[If-Modified-Since]] أو اسحب التغييرات بس لو الـ API بيدعم.`,
            mistakes: R`الـ token مكتوب في الكود ورايح GitHub. وتسحب الصفحة الأولى بس وتفتكرها كل الداتا. و loop pagination من غير شرط وقوف واضح. و [[json_normalize]] من غير ما تتعامل مع الـ lists المتداخلة فتلاقي عمود فيه lists. وتجمع تواريخ UTC مع تواريخ محلية في نفس العمود.`
          },
          teach: R`## المثال بيعمل إيه؟

بنسحب كل الطلبات من API محمي بـ token وراجع على صفحات، وكل طلب جواه عميل (object) وسطور (list)، وبنفرده جدولين: جدول للطلبات وجدول للسطور. اتشغّل في Docker بـ requests 2.34 و pandas 3.1، والـ API التجريبي FastAPI شغال في نفس الـ container.

---

## ٠. الـ API التجريبي

ده API صغير بيقلّد نظام متجر (اكتبه في [[mock_api.py]]):

~~~python mock_api.py
from fastapi import FastAPI, Header, HTTPException
app = FastAPI()
ORDERS = [
    {"id": 1, "created": "2026-01-05T10:15:00Z", "customer": {"name": "أحمد", "city": "القاهرة"}, "lines": [{"sku": "T1", "qty": 2, "price": 60}, {"sku": "C1", "qty": 1, "price": 350}]},
    {"id": 2, "created": "2026-01-06T18:40:00Z", "customer": {"name": "سارة", "city": "الجيزة"}, "lines": [{"sku": "S1", "qty": 5, "price": 45}]},
    {"id": 3, "created": "2026-01-07T09:05:00Z", "customer": {"name": "منى", "city": None}, "lines": [{"sku": "T1", "qty": 1, "price": 60}]},
]
@app.get("/orders")
def orders(page: int = 1, size: int = 2, authorization: str = Header(None)):
    if authorization != "Bearer test-token":
        raise HTTPException(401, "missing token")
    start = (page - 1) * size
    chunk = ORDERS[start:start + size]
    nxt = page + 1 if start + size < len(ORDERS) else None
    return {"data": chunk, "next_page": nxt}
~~~

~~~bash
uvicorn mock_api:app --host 127.0.0.1 --port 8000
~~~

طلبين في كل صفحة، و [[next_page]] رقم الصفحة الجاية أو [[null]]. ومن غير الـ header الصح: [[401 {"detail":"missing token"}]] (جرّبناها). (أساسيات FastAPI في تاب Python و FastAPI.)

وفي الترمنال اللي هتشغّل فيه الـ client حط الـ token في البيئة: [[export SHOP_TOKEN=test-token]] في bash، أو [[$env:SHOP_TOKEN = "test-token"]] في PowerShell.

---

## ١. الـ token والـ session

~~~python
TOKEN = os.environ["SHOP_TOKEN"]
session = requests.Session()
session.headers["Authorization"] = f"Bearer {TOKEN}"
~~~

- [[os.environ["SHOP_TOKEN"]]]: من البيئة، مش من الكود. لو مش موجود [[KeyError: 'SHOP_TOKEN']] على طول.
- [[Authorization: Bearer ...]]: الشكل المعتاد لـ token في الـ APIs. اتحط في الـ session فبيتبعت مع كل طلب.

## ٢. الصفحات

~~~python
records, page = [], 1
while page:
    resp = session.get(f"{BASE}/orders", params={"page": page}, timeout=10)
    resp.raise_for_status()
    body = resp.json()
    records.extend(body["data"])
    page = body["next_page"]
print(len(records), records[0]["customer"])
~~~

~~~text الناتج
3 {'name': 'أحمد', 'city': 'القاهرة'}
~~~

- [[while page:]]: طول ما [[page]] رقم. لما الـ API يرجّع [[null]] بتبقى [[None]] والـ loop يقف.
- [[params={"page": page}]]: requests بيبني [[/orders?page=1]].
- [[records.extend(...)]]: زوّد طلبات الصفحة دي على القايمة.

لوج الـ API أكّد طلبين بس: [[GET /orders?page=1]] و [[GET /orders?page=2]].

---

## ٣. [[json_normalize]]: الطلبات

~~~python
orders = pd.json_normalize(records, sep="_").drop(columns="lines")
~~~

~~~text الناتج
   id               created customer_name customer_city
0   1  2026-01-05T10:15:00Z          أحمد       القاهرة
1   2  2026-01-06T18:40:00Z          سارة        الجيزة
2   3  2026-01-07T09:05:00Z           منى           NaN
~~~

- [[customer]] كان dict جواه [[name]] و [[city]]، فاتفرد عمودين [[customer_name]] و [[customer_city]] ([[sep="_"]]، والافتراضي نقطة).
- [[city: None]] عند منى بقت NaN.
- [[lines]] list، و [[json_normalize]] مبيفردهاش هنا (هتفضل عمود فيه lists)، فشلناها بـ [[drop]].

## ٤. السطور: [[record_path]] و [[meta]]

~~~python
city_path = ["customer", "city"]
lines = pd.json_normalize(records, record_path="lines", meta=["id", city_path], sep="_")
lines["total"] = lines["qty"] * lines["price"]
~~~

~~~text الناتج
  sku  qty  price id customer_city  total
0  T1    2     60  1       القاهرة    120
1  C1    1    350  1       القاهرة    350
2  S1    5     45  2        الجيزة    225
3  T1    1     60  3           NaN     60
~~~

- [[record_path="lines"]]: صف لكل عنصر جوه [[lines]] في كل طلب. الطلب ١ فيه سطرين فطلع صفين.
- [[city_path]]: مسار لحقل متداخل: [[city]] اللي جوه [[customer]]، فبيتكتب list.
- [[meta=["id", city_path]]]: أعمدة من الطلب الأب تتكرر جنب كل سطر: [[id]] عشان تربط بجدول الطلبات، والمدينة.

---

## ٥. الوقت والتجميع

~~~python
orders["created"] = pd.to_datetime(orders["created"]).dt.tz_convert("Africa/Cairo")
print(lines.groupby("customer_city", dropna=False)["total"].sum())
~~~

~~~text الناتج
customer_city
الجيزة     225
القاهرة    470
NaN         60
Name: total, dtype: int64
~~~

- [[Z]] في آخر التاريخ = UTC. بعد [[tz_convert]]: أول طلب بقى [[2026-01-05 12:15:00+02:00]] بتوقيت القاهرة.
- [[dropna=False]]: من غيرها طلب منى (مدينتها ناقصة) كان هيختفي من التجميع والإجمالي يطلع ٦٩٥ بدل ٧٥٥.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| token من البيئة | [[os.environ["NAME"]]] و [[session.headers["Authorization"] = f"Bearer {t}"]] |
| كل الصفحات | [[while page:]] و [[page = body["next_page"]]] |
| query string | [[session.get(url, params={...}, timeout=10)]] |
| تفرد objects | [[pd.json_normalize(records, sep="_")]] |
| صف لكل عنصر في list | [[record_path="lines", meta=[...]]] |
| UTC للقاهرة | [[pd.to_datetime(s).dt.tz_convert("Africa/Cairo")]] |

- API رسمي قبل أي scraping.`,
          lines: [
            "عشان متغيرات البيئة.",
            "pandas.",
            "requests.",
            "عنوان الـ API (التجريبي على جهازك).",
            R`الـ token من البيئة ([[KeyError]] لو مش موجود).`,
            "اتصال واحد...",
            "...والـ token مع كل طلب.",
            "النتايج وأول صفحة.",
            R`طول ما فيه صفحة ([[None]] = خلصنا):`,
            "اطلب الصفحة بمهلة.",
            "401 أو 500 يوقف.",
            "JSON لـ dict.",
            "زوّد طلبات الصفحة.",
            "رقم الصفحة الجاية أو None.",
            "٣ طلبات، وأول عميل dict.",
            R`الطلبات جدول، والعميل اتفرد أعمدة، والسطور اتشالت.`,
            "جدول الطلبات.",
            "مسار المدينة جوه العميل.",
            R`صف لكل سطر، ومعاه رقم الطلب ومدينة العميل.`,
            "إجمالي السطر.",
            "جدول السطور.",
            "UTC لتوقيت القاهرة.",
            R`إجمالي كل مدينة ومعاهم الناقص ([[dropna=False]]).`
          ],
          sol: R`من غير [[SHOP_TOKEN]]: [[KeyError: 'SHOP_TOKEN']] من سطر [[TOKEN = os.environ[...]]]، قبل أي طلب. وبـ token غلط: الطلب بيتبعت والـ API بيرد 401، و [[raise_for_status()]] بيرمي [[requests.exceptions.HTTPError: 401 Client Error: Unauthorized for url: http://127.0.0.1:8000/orders?page=1]]. والفرق مهم: الأولى غلطة إعداد عندك، والتانية الـ API رافضك.

وإجمالي كل [[sku]]: [[lines.groupby("sku")["total"].sum()]]: [[C1]] ٣٥٠، و [[S1]] ٢٢٥، و [[T1]] ١٨٠ (١٢٠ + ٦٠).`,
          solCode: R`print(lines.groupby("sku")["total"].sum())
# sku
# C1    350
# S1    225
# T1    180`
        },
        {
          cmd: "requests و BeautifulSoup",
          title: "تجيب صفحة HTML وتطلّع منها جدول منتجات",
          desc: R`[[requests.get(url, timeout=10)]] بيجيب الصفحة، و [[BeautifulSoup(resp.content, "html.parser")]] بيحوّلها شجرة تدوّر فيها بـ CSS selectors: [[soup.select("div.product")]] كل العناصر، و [[select_one(".price")]] أول واحد، و [[get_text(strip=True)]] الكلام، و [[el["href"]]] قيمة attribute.

التجربة على صفحة **بتاعتك** على جهازك ([[python -m http.server]])، مش موقع حد. وقبل أي موقع حقيقي: الدرس الجاي (robots.txt والقانون والتأخير). وأول سؤال دايمًا: الموقع ليه API رسمي؟ استخدمه بدل الـ scraping.`,
          example: R`from urllib.parse import urljoin
import requests
from bs4 import BeautifulSoup
URL = "http://127.0.0.1:8000/"
resp = requests.get(URL, headers={"User-Agent": "study-bot/0.1 (+mailto:ali@example.com)"}, timeout=10)
resp.raise_for_status()
print(resp.status_code, resp.encoding, resp.headers["Content-Type"])
soup = BeautifulSoup(resp.content, "html.parser")
print(soup.title.string)
for card in soup.select("div.product"):
    print({
        "id": int(card["data-id"]),
        "name": card.select_one(".name").get_text(strip=True),
        "price": card.select_one(".price").get_text(strip=True),
        "sale": card.select_one(".badge") is not None,
        "url": urljoin(URL, card.a["href"]),
    })
print(soup.select_one("a.next")["href"])
# قبلها في ترمنال تاني، جنب فولدر site:
# python -m http.server 8000 --bind 127.0.0.1 --directory site`,
          try: R`زوّد في [[site/index.html]] منتج رابع من غير [[span class="price"]] خالص، وشغّل الكود: هيقع فين وليه؟ صلّحه بحيث السعر يبقى [[None]] لو العنصر مش موجود. وبعدين جرّب [[BeautifulSoup(resp.text, ...)]] بدل [[resp.content]] وشوف العنوان طلع إزاي.`,
          flag: "script",
          deep: {
            why: R`ساعات الداتا اللي محتاجها موجودة في صفحات ويب ومفيش API ولا ملف تنزّله: أسعار في كتالوج، أو جدول في صفحة حكومية، أو قايمة في موقع شغلك القديم. الـ scraping هو إنك تخلي سكربت يقرا الصفحة بدالك. بس هو آخر حل مش أول حل: لو فيه API أو ملف CSV للتحميل استخدمهم، لأنهم ثابتين ومسموحين، والـ HTML بيتغير في أي لحظة.`,
            how: R`[[requests.get]] بيبعت طلب HTTP ويرجّع response: [[status_code]] و [[headers]] و [[content]] (bytes) و [[text]] (نص بعد فك الـ encoding). [[timeout=10]] أقصى ١٠ ثواني (من غيرها ممكن يستنى للأبد، درس [[requests و urllib مع timeout]] في تاب Python). و [[raise_for_status()]] بيرمي خطأ لو الرد 4xx أو 5xx.

الـ encoding: requests بياخده من [[Content-Type]] بتاع الرد، ولو مفيهوش charset بيفترض [[ISO-8859-1]] لصفحات النص (ده اللي حصل مع [[http.server]])، فـ [[resp.text]] بيطلع عربي بايظ. لما تدّي BeautifulSoup الـ [[content]] (bytes)، هو بيقرا [[<meta charset="utf-8">]] اللي جوه الصفحة ويفك صح.

BeautifulSoup بيبني شجرة من الـ HTML (حتى لو مكتوب غلط). [[select]] بياخد CSS selector زي اللي في CSS بالظبط: [[div.product]] div عليه class product، و [[.price]] أي عنصر عليه class price، و [[a.next]] لينك عليه class next. [[select]] بيرجّع list (فاضية لو مفيش)، و [[select_one]] أول واحد أو [[None]]. و [[card["data-id"]]] قيمة attribute، و [[card.a]] أول [[<a>]] جوه العنصر.

[[urljoin(base, "/p/1.html")]] بيحوّل الرابط النسبي لرابط كامل، صح في كل الحالات (رابط بيبدأ بـ / أو من غيرها أو كامل).`,
            when: R`داتا عامة مفيش لها API، وموقع شروطه مبتمنعش، وكمية معقولة. للصفحات اللي المحتوى بيتبني فيها بـ JavaScript (الـ HTML اللي بييجي فاضي) محتاج متصفح حقيقي زي Playwright (من الـ docs)، أو دوّر في Network tab على الـ API اللي الصفحة نفسها بتكلمه. وجداول HTML بسيطة: [[pd.read_html(url)]] بيرجّع كل جدول DataFrame (محتاج [[lxml]]، من الـ docs).`,
            mistakes: R`من غير [[timeout]]. و [[resp.text]] مع صفحة مبتقولش الـ charset فالعربي يبوظ. و [[select_one(...).get_text()]] على عنصر مش موجود: [[AttributeError: 'NoneType' object has no attribute 'get_text']]. و selectors طويلة جدًا متربطة بشكل الصفحة ([[div > div:nth-child(3) > span]]) فتقع مع أي تعديل. وتنسى إن [[href]] غالبًا نسبي. وتجرّب على موقع حقيقي وانت لسه بتكتب الكود فتبعت مئات الطلبات بالغلط.`
          },
          teach: R`## المثال بيعمل إيه؟

بنقدّم صفحة HTML صغيرة من جهازنا، ونجيبها بـ requests، ونطلّع منها كل منتج (الرقم والاسم والسعر وعليه خصم ولا لأ ورابطه)، ورابط الصفحة الجاية. اتشغّل في Docker بـ requests 2.34 و BeautifulSoup 4.15، والسيرفر [[python -m http.server]] في نفس الـ container.

---

## ٠. الصفحة اللي هنجرّب عليها

اعمل فولدر [[site]] وفيه [[index.html]]:

~~~text site/index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>متجر تجريبي</title></head>
<body>
  <h1>المنتجات</h1>
  <div class="product" data-id="1">
    <h2 class="name">شاي كرتونة</h2>
    <span class="price">1,200 ج.م</span>
    <a href="/p/1.html">التفاصيل</a>
  </div>
  <div class="product" data-id="2">
    <h2 class="name">بن ٢٥٠ جرام</h2>
    <span class="price">350 ج.م</span>
    <span class="badge">خصم</span>
    <a href="/p/2.html">التفاصيل</a>
  </div>
  <div class="product" data-id="3">
    <h2 class="name">زيت ١ لتر</h2>
    <span class="price">غير متاح</span>
    <a href="/p/3.html">التفاصيل</a>
  </div>
  <a class="next" href="/page2.html">الصفحة التالية</a>
</body>
</html>
~~~

وشغّله في ترمنال لوحده من الفولدر اللي فيه [[site]]:

~~~bash
python -m http.server 8000 --bind 127.0.0.1 --directory site
~~~

[[--bind 127.0.0.1]]: جهازك بس، و [[--directory site]]: الفولدر ده بس (درس [[python -m http.server]] في تاب Python). ولوجه بيطبع كل طلب: [[«GET / HTTP/1.1» 200]]. كده بتجرّب براحتك من غير ما تبعت طلب واحد لموقع حد.

---

## ١. الطلب

~~~python
resp = requests.get(URL, headers={"User-Agent": "study-bot/0.1 (+mailto:ali@example.com)"}, timeout=10)
resp.raise_for_status()
print(resp.status_code, resp.encoding, resp.headers["Content-Type"])
~~~

~~~text الناتج
200 ISO-8859-1 text/html
~~~

- [[headers={"User-Agent": ...}]]: عرّف نفسك: اسم البوت ووسيلة تواصل. من غيره requests بيبعت [[python-requests/2.34.2]] (اتأكدنا)، ومواقع كتير بتحظره.
- [[timeout=10]]: لو مفيش رد في ١٠ ثواني ارمي خطأ بدل ما تستنى للأبد.
- [[raise_for_status()]]: لو الرد 404 أو 500 ارمي [[HTTPError]] بدل ما تكمل على صفحة خطأ.
- [[encoding]] = [[ISO-8859-1]]: السيرفر قال [[text/html]] من غير charset، فـ requests افترض الـ encoding القديم ده.

## ٢. العربي والـ encoding

لو استخدمت [[resp.text]] (النص بالـ encoding اللي requests افترضه):

~~~text الناتج: BeautifulSoup(resp.text, ...).title.string
'Ù\x85ØªØ¬Ø± ØªØ¬Ø±Ù\x8aØ¨Ù\x8a'
~~~

bytes الـ UTF-8 اتقرت كأنها ISO-8859-1. عشان كده بنبعت [[resp.content]] (الـ bytes نفسها):

~~~python
soup = BeautifulSoup(resp.content, "html.parser")
print(soup.title.string)
~~~

~~~text الناتج
متجر تجريبي
~~~

BeautifulSoup قرا [[<meta charset="utf-8">]] من الصفحة وفك صح. (أو تصلّح requests نفسه: [[resp.encoding = "utf-8"]] قبل [[resp.text]].) و [[html.parser]] الـ parser اللي جوه Python من غير تسطيب. و [[soup.title.string]]: أول [[<title>]] والنص اللي جواه.

---

## ٣. كل منتج

~~~python
for card in soup.select("div.product"):
    print({
        "id": int(card["data-id"]),
        "name": card.select_one(".name").get_text(strip=True),
        "price": card.select_one(".price").get_text(strip=True),
        "sale": card.select_one(".badge") is not None,
        "url": urljoin(URL, card.a["href"]),
    })
~~~

~~~text الناتج
{'id': 1, 'name': 'شاي كرتونة', 'price': '1,200 ج.م', 'sale': False, 'url': 'http://127.0.0.1:8000/p/1.html'}
{'id': 2, 'name': 'بن ٢٥٠ جرام', 'price': '350 ج.م', 'sale': True, 'url': 'http://127.0.0.1:8000/p/2.html'}
{'id': 3, 'name': 'زيت ١ لتر', 'price': 'غير متاح', 'sale': False, 'url': 'http://127.0.0.1:8000/p/3.html'}
~~~

| الكود | بيجيب إيه |
|---|---|
| [[soup.select("div.product")]] | list بكل الـ [[<div class="product">]] (٣) |
| [[card["data-id"]]] | قيمة الـ attribute ([[«1»]] نص، فـ [[int()]]) |
| [[card.select_one(".name")]] | أول عنصر **جوه الكارت ده** عليه class name |
| [[.get_text(strip=True)]] | الكلام اللي جواه من غير مسافات وسطور في الأول والآخر |
| [[card.select_one(".badge") is not None]] | فيه شارة خصم؟ [[select_one]] بترجّع [[None]] لو مفيش |
| [[card.a["href"]]] | أول [[<a>]] في الكارت، وقيمة [[href]] ([[/p/1.html]]) |
| [[urljoin(URL, ...)]] | الرابط النسبي لرابط كامل |

السعر لسه نص ([[«1,200 ج.م»]] و [[«غير متاح»]])، وتنضيفه بنفس طريقة درس [[astype و to_datetime]] (الدرس الجاي بيعمله).

## ٤. الصفحة الجاية

~~~text الناتج: print(soup.select_one("a.next")["href"])
/page2.html
~~~

ده اللي الدرس الجاي بيمشي عليه صفحة صفحة.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| تجيب صفحة | [[requests.get(url, headers={"User-Agent": ...}, timeout=10)]] |
| تقف على الخطأ | [[resp.raise_for_status()]] |
| شجرة بعربي سليم | [[BeautifulSoup(resp.content, "html.parser")]] |
| كل العناصر / أول واحد | [[soup.select("css")]] / [[soup.select_one("css")]] |
| الكلام / attribute | [[el.get_text(strip=True)]] / [[el["href"]]] |
| رابط كامل | [[urljoin(base, href)]] |

- جرّب على صفحة بتقدّمها انت. وقبل أي موقع حقيقي: API رسمي؟ الدرس الجاي.`,
          lines: [
            R`[[urljoin]] للروابط.`,
            "requests للطلبات.",
            "BeautifulSoup للـ HTML.",
            "صفحتنا على جهازنا.",
            "اطلب الصفحة بـ User-Agent واضح ومهلة.",
            "لو 4xx أو 5xx ارمي خطأ.",
            R`[[200 ISO-8859-1 text/html]].`,
            R`الشجرة من الـ bytes (العربي يفضل سليم).`,
            "العنوان.",
            "لكل كارت منتج:",
            "اطبع dict:",
            R`الرقم من [[data-id]].`,
            "الاسم.",
            "السعر (نص لسه).",
            "عليه خصم؟",
            "رابطه الكامل.",
            "قفلة.",
            "رابط الصفحة الجاية."
          ],
          sol: R`الكارت اللي ملوش [[.price]]: [[card.select_one(".price")]] بترجّع [[None]]، و [[None.get_text()]] بترمي [[AttributeError: 'NoneType' object has no attribute 'get_text']] والسكربت كله يقف عند المنتج ده. الحل: افحص قبلها (اعمل دالة صغيرة [[text_or_none]]).

وبـ [[resp.text]]: العنوان بيطلع [[Ù\x85ØªØ¬Ø± ...]] بدل «متجر تجريبي»، لأن requests فك الـ bytes بـ ISO-8859-1. الحل [[resp.content]] أو [[resp.encoding = "utf-8"]].`,
          solCode: R`def text_or_none(parent, selector):
    el = parent.select_one(selector)
    return el.get_text(strip=True) if el else None
# وفي الـ loop:
#     "price": text_or_none(card, ".price"),`
        },
        {
          cmd: "robots.txt و rate limiting",
          title: "scraper محترم: robots.txt، وتأخير بين الطلبات، و 429، والقانون",
          desc: R`قبل أي موقع: اقرا [[robots.txt]] بتاعه بـ [[urllib.robotparser]] واحترم [[Disallow]] و [[Crawl-delay]]، وعرّف نفسك بـ [[User-Agent]] فيه وسيلة تواصل، واستنى بين كل طلب واللي بعده، ولو السيرفر رد [[429]] (طلبات كتير) استنى المدة اللي في [[Retry-After]].

وده الحد الأدنى التقني بس: شروط استخدام الموقع، وحقوق المحتوى، والداتا الشخصية (في مصر قانون حماية البيانات الشخصية رقم ١٥١ لسنة ٢٠٢٠) ممكن يمنعوا الجمع حتى لو robots.txt سامح. لو مش متأكد: اسأل صاحب الموقع، أو متعملهوش.`,
          example: R`import time
from urllib.parse import urljoin
from urllib.robotparser import RobotFileParser
import pandas as pd
import requests
from bs4 import BeautifulSoup
BASE = "http://127.0.0.1:8000/"
UA = "study-bot/0.1 (+mailto:ali@example.com)"
robots = RobotFileParser(urljoin(BASE, "robots.txt"))
robots.read()
delay = robots.crawl_delay(UA) or 1
print("delay:", delay, "| admin allowed:", robots.can_fetch(UA, urljoin(BASE, "admin/")))
session = requests.Session()
session.headers["User-Agent"] = UA
rows, url = [], BASE
while url and robots.can_fetch(UA, url):
    resp = session.get(url, timeout=10)
    if resp.status_code == 429:
        wait = int(resp.headers.get("Retry-After", 60))
        print("429, waiting", wait, "s")
        time.sleep(wait)
        continue
    resp.raise_for_status()
    soup = BeautifulSoup(resp.content, "html.parser")
    for card in soup.select("div.product"):
        rows.append({"name": card.select_one(".name").get_text(strip=True),
                     "price": card.select_one(".price").get_text(strip=True)})
    print("got", resp.url, "| rows:", len(rows))
    nxt = soup.select_one("a.next")
    url = urljoin(url, nxt["href"]) if nxt else None
    time.sleep(delay)
df = pd.DataFrame(rows)
df["price"] = pd.to_numeric(df["price"].str.replace(",", "").str.extract(r"(\d+)")[0])
print(df)
df.to_csv("products_scraped.csv", index=False, encoding="utf-8-sig")`,
          try: R`الـ loop ده لو السيرفر فضل يرد 429 هيفضل يستنى ويحاول للأبد. حط حد: بعد ٣ محاولات لنفس الصفحة اقف واطبع رسالة. وبعدين زوّد في [[site/robots.txt]] سطر [[Disallow: /page2.html]] وشغّل تاني: كام صف هيتجمع؟`,
          flag: "script",
          deep: {
            why: R`السكربت بتاعك بيبعت طلبات أسرع من أي بني آدم بكتير. على موقع صغير ده ممكن يبطّأه أو يوقعه لكل الناس، وده ضرر حقيقي ممكن يتحاسب عليه. وأصحاب المواقع بيحظروا الـ IP أو يرفعوا قضايا لما الجمع يضر بيهم أو ينسخ محتواهم. الأدب هنا مش رفاهية: هو اللي بيخليك تجمع الداتا من غير مشاكل، ومن غير ما تأذي حد.`,
            how: R`[[robots.txt]] ملف نص في جذر الموقع بيقول لأي bot إيه المسموح: [[User-agent: *]] (القواعد دي لكل البوتات)، و [[Disallow: /admin/]] (متدخلش هنا)، و [[Crawl-delay: 2]] (استنى ثانيتين بين الطلبات، مش كل المواقع بتكتبه). [[RobotFileParser]] بيقراه، و [[can_fetch(ua, url)]] بيقول مسموح ولا لأ، و [[crawl_delay(ua)]] بيرجّع التأخير أو [[None]]. هو اتفاق مش حماية تقنية: محدش هيمنعك، بس تجاهله سوء نية واضح.

[[requests.Session()]] بيعيد استخدام نفس الاتصال (أسرع وأخف على السيرفر)، وبيبعت الـ headers اللي حطيتها فيه مع كل طلب. و [[429 Too Many Requests]] معناها «بطّأ»، و [[Retry-After]] (لو موجود) عدد الثواني اللي يستناها.

القانون (مش استشارة قانونية): شروط الاستخدام (Terms of Service) ممكن تمنع الجمع الآلي. والمحتوى نفسه (مقالات، صور، تقييمات) ليه حقوق، فجمعه للتحليل غير إنك تعيد نشره. والداتا الشخصية (أسامي، تليفونات، إيميلات) عليها قوانين حماية بيانات، في مصر القانون رقم ١٥١ لسنة ٢٠٢٠، وفي أوروبا GDPR. والدخول ورا تسجيل دخول أو تخطي حماية (CAPTCHA أو حظر) خط أحمر.`,
            when: R`كل مرة تجمع من موقع مش بتاعك. والترتيب: API رسمي أو ملف تحميل؟ استخدمه. مفيش؟ اقرا الشروط و robots.txt. مسموح؟ ابدأ بطلبات قليلة وتأخير، وخزّن الصفحات اللي جبتها (cache) عشان متطلبهاش تاني وانت بتطوّر الكود، واجمع اللي محتاجه بس.`,
            mistakes: R`loop من غير [[sleep]] (مئات الطلبات في ثانية). وتجاهل 429 أو إعادة المحاولة فورًا. و User-Agent متزوّر كأنه متصفح عشان تعدّي حظر. وتجمع داتا شخصية أو محتوى عليه حقوق وتنشره. وتجري الكود وانت بتطوّره على الموقع الحقيقي كل مرة بدل نسخة محفوظة. وتفتكر إن robots.txt سامح = قانونيًا مسموح.`
          },
          teach: R`## المثال بيعمل إيه؟

scraper بيمشي على صفحات المتجر التجريبي (من الدرس اللي فات) واحدة واحدة عن طريق رابط «الصفحة التالية»، وبيقرا robots.txt الأول ويحترمه، وبيستنى بين الطلبات، وبيتعامل مع 429، وفي الآخر بينضّف الأسعار ويحفظ CSV. اتشغّل في Docker على صفحتنا المحلية.

زوّد في [[site]] ملفين:

~~~text site/robots.txt
User-agent: *
Disallow: /admin/
Crawl-delay: 2
~~~

و [[site/page2.html]] فيها منتج واحد (سكر ١ كيلو، 45 ج.م) ومن غير رابط «التالية».

---

## ١. robots.txt

~~~python
robots = RobotFileParser(urljoin(BASE, "robots.txt"))
robots.read()
delay = robots.crawl_delay(UA) or 1
print("delay:", delay, "| admin allowed:", robots.can_fetch(UA, urljoin(BASE, "admin/")))
~~~

~~~text الناتج
delay: 2 | admin allowed: False
~~~

- [[RobotFileParser(url)]] و [[read()]]: نزّل الملف وافهمه.
- [[crawl_delay(UA)]]: ٢ من [[Crawl-delay: 2]]. ولو الموقع مكتبوش بيرجّع [[None]]، و [[or 1]] بيخلي الافتراضي ثانية.
- [[can_fetch(UA, ".../admin/")]]: False عشان [[Disallow: /admin/]].
- [[UA]]: اسم البوت ونسخته ووسيلة تواصل ([[+mailto:]]). لو صاحب الموقع عنده مشكلة يعرف يكلمك بدل ما يحظرك.

---

## ٢. Session

~~~python
session = requests.Session()
session.headers["User-Agent"] = UA
~~~

اتصال واحد بيتعاد استخدامه، والـ User-Agent بيتبعت مع كل طلب لوحده.

## ٣. الـ loop

~~~python
rows, url = [], BASE
while url and robots.can_fetch(UA, url):
~~~

- [[rows, url = [], BASE]]: متغيرين في سطر: list فاضية للنتايج، وأول صفحة.
- الـ loop بيكمل طول ما فيه صفحة **و** robots.txt سامح بيها.

## ٤. 429: استنى

~~~python
    if resp.status_code == 429:
        wait = int(resp.headers.get("Retry-After", 60))
        print("429, waiting", wait, "s")
        time.sleep(wait)
        continue
~~~

[[headers.get("Retry-After", 60)]]: المدة اللي السيرفر طلبها، ولو مقالش ٦٠ ثانية. و [[continue]] يرجع لأول الـ loop ويطلب نفس الصفحة تاني.

عشان نجرّب ده من غير موقع حقيقي، عملنا سيرفر تجريبي صغير (subclass من [[SimpleHTTPRequestHandler]]) بيرد 429 و [[Retry-After: 3]] أول مرة تطلب [[/page2.html]]:

~~~text الناتج (مع السيرفر التجريبي)
delay: 2 | admin allowed: False
got http://127.0.0.1:8000/ | rows: 3
429, waiting 3 s
got http://127.0.0.1:8000/page2.html | rows: 4
~~~

~~~text لوج السيرفر
"GET /robots.txt HTTP/1.1" 200 -
"GET / HTTP/1.1" 200 -
"GET /page2.html HTTP/1.1" 429 -
"GET /page2.html HTTP/1.1" 200 -
~~~

الطلب اتعاد بعد ٣ ثواني بالظبط ونجح.

## ٥. الصفحة والجاية

~~~python
    resp.raise_for_status()
    soup = BeautifulSoup(resp.content, "html.parser")
    for card in soup.select("div.product"):
        rows.append({...})
    nxt = soup.select_one("a.next")
    url = urljoin(url, nxt["href"]) if nxt else None
    time.sleep(delay)
~~~

- نفس استخراج الدرس اللي فات، بس كل منتج بيتحط في [[rows]].
- [[nxt]]: رابط «التالية». في آخر صفحة مش موجود فـ [[url]] بيبقى [[None]] والـ loop يقف.
- [[urljoin(url, ...)]] على الصفحة الحالية مش الأولى، عشان الروابط النسبية تتحسب صح.
- [[time.sleep(delay)]]: ثانيتين قبل الطلب الجاي.

مع [[python -m http.server]] العادي:

~~~text الناتج
delay: 2 | admin allowed: False
got http://127.0.0.1:8000/ | rows: 3
got http://127.0.0.1:8000/page2.html | rows: 4
~~~

~~~text لوج السيرفر (لاحظ الوقت)
[27/Oct/2026 17:53:39] "GET /robots.txt HTTP/1.1" 200 -
[27/Oct/2026 17:53:39] "GET / HTTP/1.1" 200 -
[27/Oct/2026 17:53:41] "GET /page2.html HTTP/1.1" 200 -
~~~

ثانيتين بالظبط بين الصفحتين. والسكربت كله خد ٥ ثواني لصفحتين: ده بطيء عن قصد. ١٠٠٠ صفحة = حوالي ٣٣ دقيقة، وده الطبيعي لـ scraper محترم.

---

## ٦. التنضيف والحفظ

~~~python
df = pd.DataFrame(rows)
df["price"] = pd.to_numeric(df["price"].str.replace(",", "").str.extract(r"(\d+)")[0])
df.to_csv("products_scraped.csv", index=False, encoding="utf-8-sig")
~~~

~~~text الناتج
          name   price
0   شاي كرتونة  1200.0
1  بن ٢٥٠ جرام   350.0
2    زيت ١ لتر     NaN
3   سكر ١ كيلو    45.0
~~~

نفس أسلوب درس [[astype و to_datetime]]: شيل الفاصلة وطلّع أول رقم. «غير متاح» مفيهاش رقم فبقت NaN (وده صح: مش صفر). والملف بـ BOM ([[ef bb bf]]) عشان Excel.

---

## ٧. قبل أي موقع حقيقي

| السؤال | لو الإجابة لأ |
|---|---|
| فيه API رسمي أو ملف للتحميل؟ | استخدمه بدل الـ scraping |
| شروط الاستخدام بتسمح بالجمع الآلي؟ | متجمعش، أو اطلب إذن |
| robots.txt سامح بالمسارات دي؟ | متدخلهاش |
| الداتا مفيهاش بيانات شخصية؟ | قانون حماية البيانات الشخصية (مصر ١٥١ لسنة ٢٠٢٠) و GDPR بيحكموها |
| هتستخدمها للتحليل بس مش هتعيد نشر محتوى حد؟ | حقوق المحتوى |
| الصفحات من غير تسجيل دخول وحماية؟ | متعدّيش CAPTCHA أو حظر أو login |

> ده مش استشارة قانونية. لو المشروع شغل حقيقي أو هيتباع، اسأل محامي.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| تقرا robots.txt | [[RobotFileParser(url)]] ثم [[read()]] |
| مسموح؟ | [[robots.can_fetch(UA, url)]] |
| التأخير | [[robots.crawl_delay(UA) or 1]] و [[time.sleep]] |
| تعرّف نفسك | [[session.headers["User-Agent"] = "bot/1.0 (+mailto:...)"]] |
| 429 | استنى [[Retry-After]] وحاول تاني بحد أقصى |
| الصفحة الجاية | [[urljoin(url, next["href"])]] لحد ما ميبقاش فيه |`,
          lines: [
            R`[[time.sleep]] للتأخير.`,
            "الروابط.",
            "قارئ robots.txt من المكتبة الأساسية.",
            "pandas.",
            "requests.",
            "BeautifulSoup.",
            "الموقع (صفحتنا المحلية).",
            "اسم البوت ووسيلة تواصل.",
            "robots.txt بتاع الموقع...",
            "...نزّله وافهمه.",
            R`التأخير من [[Crawl-delay]]، وإلا ثانية.`,
            R`[[delay: 2 | admin allowed: False]].`,
            "اتصال واحد بيتعاد استخدامه...",
            "...ومعاه الـ User-Agent في كل طلب.",
            "النتايج وأول صفحة.",
            "طول ما فيه صفحة ومسموح بيها:",
            "اطلبها بمهلة.",
            "لو 429:",
            R`المدة من [[Retry-After]]، وإلا ٦٠.`,
            "قول إنك مستني.",
            "استنى.",
            "وارجع اطلب نفس الصفحة.",
            "أي خطأ تاني يوقف.",
            "الشجرة.",
            "لكل منتج...",
            "...الاسم...",
            "...والسعر.",
            "وصلنا لحد فين.",
            "رابط «التالية»...",
            R`...كامل، أو [[None]] في آخر صفحة.`,
            "استنى قبل الطلب الجاي.",
            "جدول.",
            "السعر رقم، و«غير متاح» NaN.",
            "النتيجة.",
            R`CSV بـ [[utf-8-sig]].`
          ],
          sol: R`عدّاد للمحاولات: [[tries]] بيزيد مع كل 429 ويرجع صفر بعد أي رد ناجح، ولو وصل ٣ اطبع رسالة واعمل [[break]]. كده لو الموقع قالك «بطّأ» ٣ مرات ورا بعض انت بتقف خالص بدل ما تفضل تخبط.

ومع [[Disallow: /page2.html]]: [[can_fetch]] على [[/page2.html]] بيرجّع False، فالـ loop بيقف بعد الصفحة الأولى وتتجمع [[3]] صفوف بس، والسيرفر مش هيشوف أي طلب لـ page2 خالص.`,
          solCode: R`tries = 0
while url and robots.can_fetch(UA, url):
    resp = session.get(url, timeout=10)
    if resp.status_code == 429:
        tries += 1
        if tries >= 3:
            print("السيرفر بيقول بطّأ ٣ مرات: هقف")
            break
        time.sleep(int(resp.headers.get("Retry-After", 60)))
        continue
    tries = 0
    # ... باقي الـ loop زي ما هو`
        },
      ]
    }
]);
