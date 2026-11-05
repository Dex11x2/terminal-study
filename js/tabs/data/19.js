// تكملة تاب data: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/data/01.js (شرح حقول الدرس في أوله)
MORE("data", [
    {
      t: "PocketBase في الإنتاج، والمقارنة بـ Supabase",
      l: 3,
      n: "اللي لازم يتظبط قبل ما تطلع على سيرفر، وإمتى تختار PocketBase وإمتى Supabase، وإزاي المنطق بيتنقل بينهم، وحالتين حقيقيتين، ومشروع كامل بيبيع كتاب رقمي بإيصال دفع",
      projects: [
        { lvl: 'صغير', t: R`دفتر زوار`, what: R`جدول [[guestbook]] أي حد يكتب فيه ويقراه، ومحدش يعدّل أو يمسح، من غير سطر كود في السيرفر.`, done: R`[[POST]] و [[GET]] يشتغلوا من غير login، و [[PATCH]] و [[DELETE]] يرجّعوا 403، ورسالة فاضية ترجع 400.`, sol: R`~~~js
migrate((app) => {
  app.save(new Collection({
    type: "base", name: "guestbook",
    listRule: "", viewRule: "", createRule: "", updateRule: null, deleteRule: null,
    fields: [
      { name: "name", type: "text", required: true, max: 60 },
      { name: "message", type: "text", required: true, max: 280 },
      { name: "created", type: "autodate", onCreate: true },
    ],
  }));
}, (app) => {
  app.delete(app.findCollectionByNameOrId("guestbook"));
});
~~~

القواعد هي البرنامج كله: [[""]] للقراية والكتابة، و [[null]] للتعديل والمسح. والـ [[max]] بيمنع رسايل ضخمة. وفي الإنتاج فعّل حدود الطلبات، لأن الجدول مفتوح لأي حد.

~~~text الناتج
[create] 200
[list]   200 {"items":[{"message":"موقع حلو","name":"نور"}], ...
[patch]  403 Only superusers can perform this action.
[delete] 403 Only superusers can perform this action.
[empty]  400 {"message":{"code":"validation_required","message":"Cannot be blank."}}
~~~` },
        { lvl: 'صغير', t: R`ملاحظاتي`, what: R`كل يوزر يضيف ملاحظاته ويشوفها ويعدّلها، ومحدش يشوف ملاحظات غيره، بالقواعد بس.`, done: R`اليوزر التاني يشوف صفر، وصاحب الملاحظة يعدّلها.`, sol: R`~~~js
migrate((app) => {
  const users = app.findCollectionByNameOrId("users");
  app.save(new Collection({
    type: "base", name: "notes",
    listRule: "owner = @request.auth.id",
    viewRule: "owner = @request.auth.id",
    createRule: "@request.auth.id != '' && owner = @request.auth.id",
    updateRule: "owner = @request.auth.id && @request.body.owner:isset = false",
    deleteRule: "owner = @request.auth.id",
    fields: [
      { name: "owner", type: "relation", collectionId: users.id, maxSelect: 1, required: true, cascadeDelete: true },
      { name: "body", type: "text", required: true, max: 500 },
    ],
  }));
}, (app) => {
  app.delete(app.findCollectionByNameOrId("notes"));
});
~~~

و [[cascadeDelete]] بيمسح ملاحظات اليوزر لما حسابه يتمسح. الشرح الكامل والناتج في درس «PocketBase: API rules».` },
        { lvl: 'متوسط', t: R`طابور استعارة`, what: R`مسار [[POST /api/lab/loans]] بيرقّم الطلبات برقم متسلسل، ويمنع طلبين مستنيين لنفس اليوزر ونفس الكتاب.`, done: R`الأرقام 1001 و 1002 من غير تكرار، والطلب المكرر يرجّع [[Loan_pending.]] ومايسحبش رقم.`, sol: R`المسار نفسه في مثال درس «pb_hooks». الجداول:

~~~js
migrate((app) => {
  const users = app.findCollectionByNameOrId("users");
  const books = app.findCollectionByNameOrId("books");
  const closed = { listRule: null, viewRule: null, createRule: null, updateRule: null, deleteRule: null };
  app.save(new Collection({
    type: "base", name: "loans", ...closed,
    fields: [
      { name: "user", type: "relation", collectionId: users.id, maxSelect: 1, required: true },
      { name: "book", type: "relation", collectionId: books.id, maxSelect: 1, required: true },
      { name: "status", type: "select", maxSelect: 1, values: ["pending", "approved", "rejected"], required: true },
      { name: "number", type: "number", onlyInt: true, required: true, min: 1 },
    ],
    indexes: [
      "CREATE UNIQUE INDEX idx_loans_number ON loans (number)",
      "CREATE UNIQUE INDEX idx_loans_one_pending ON loans (user, book) WHERE status = 'pending'",
    ],
  }));
  const counters = new Collection({
    type: "base", name: "counters", ...closed,
    fields: [{ name: "seq", type: "number", onlyInt: true }],
  });
  app.save(counters);
  const row = new Record(counters);
  row.set("seq", 1000);
  app.save(row);
}, () => {});
~~~

الـ index التاني هو اللي بيمنع التكرار حتى لو طلبين وصلوا مع بعض، مش الكود. والـ transaction هي اللي بترجّع العداد لو الحفظ فشل.

~~~text الناتج
[loan 1]      200 {"number":1001}
[loan dup]    400 {"message":"Loan_pending."}
[loan marwan] 200 {"number":1002}
~~~` },
        { lvl: 'متوسط', t: R`وصلت لحد فين`, what: R`مسار بيحفظ آخر صفحة وأبعد صفحة لكل يوزر في كل كتاب. الرجوع لورا مايقللش أبعد صفحة، ورقم أكبر من الكتاب يتقص.`, done: R`الصفحة 2 ثم 1 ثم 999 في كتاب صفحتين تدّي 2/2 ثم 1/2 ثم 2/2.`, sol: R`~~~js
routerAdd("POST", "/api/raff/read/{slug}/progress", (e) => {
  const app = e.app;
  const book = app.findFirstRecordByData("books", "slug", e.request.pathValue("slug"));
  const total = book.getInt("pages_count");
  const page = Math.max(1, Math.min(total, parseInt((e.requestInfo().body || {}).page, 10) || 1));
  let p;
  try {
    p = app.findFirstRecordByFilter("progress", "user = {:u} && book = {:b}", { u: e.auth.id, b: book.id });
  } catch (err) {
    p = new Record(app.findCollectionByNameOrId("progress"));
    p.set("user", e.auth.id);
    p.set("book", book.id);
  }
  p.set("last_page", page);
  p.set("max_page", Math.max(p.getInt("max_page"), page));
  app.save(p);
  return e.json(200, { last_page: page, max_page: p.getInt("max_page") });
}, $apis.requireAuth("users"));
~~~

[[findFirstRecordByFilter]] بيرمي خطأ لو مفيش صف، فالـ [[catch]] هنا معناها «أول مرة». و [[{:u}]] متغير آمن، ومتركبش الفلتر بجمع نصوص أبدًا. وفهرس [[(user, book)]] الفريد بيمنع صفين لنفس الكتاب.

~~~text الناتج
ok   progress
ok   going back keeps max
ok   page clamped
~~~` },
        { lvl: 'كبير', t: R`«رفّ»: بيع كتاب رقمي بإيصال دفع`, what: R`مكتبة مخترعة: العميل يعمل حساب ويرفع إيصال، والموظف يراجعه ويوافق أو يرفض بسبب، والكتاب يفتح صفحة صفحة لصاحبه بس، والتقدم يتحفظ.`, done: R`الـ 31 فحص في [[test.mjs]] كلهم يعدّوا من قاعدة فاضية.`, ext: R`ضيف إيميل عند الموافقة، وكتاب تاني، ولوحة أرقام، وإلغاء الطلب من العميل.`, sol: R`الشرح خطوة خطوة في درس «مشروع: بيع كتاب بإيصال». الملفات:

~~~text الشجرة
raff/
  Dockerfile              من درس PocketBase
  pb_migrations/1700000000_raff.js
  pb_hooks/raff.pb.js
  test.mjs
~~~

~~~js pb_migrations/1700000000_raff.js
/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const closed = { listRule: null, viewRule: null, createRule: null, updateRule: null, deleteRule: null };
  const rel = (name, target, extra) => ({ name, type: "relation", collectionId: target.id, maxSelect: 1, ...extra });
  const int = (name, extra) => ({ name, type: "number", onlyInt: true, min: 0, ...extra });

  const users = app.findCollectionByNameOrId("users");
  Object.assign(users, closed);
  users.fields.add(new TextField({ name: "phone", max: 24 }));
  app.save(users);

  const staff = new Collection({
    type: "auth", name: "staff", ...closed,
    passwordAuth: { enabled: true, identityFields: ["email"] },
  });
  app.save(staff);

  const books = new Collection({
    type: "base", name: "books", ...closed,
    fields: [
      { name: "slug", type: "text", required: true, pattern: "^[a-z0-9-]+$" },
      { name: "title", type: "text", required: true },
      { name: "price_egp", type: "number", min: 0 },
      int("pages_count"),
    ],
    indexes: ["CREATE UNIQUE INDEX idx_books_slug ON books (slug)"],
  });
  app.save(books);

  const pages = new Collection({
    type: "base", name: "book_pages", ...closed,
    fields: [
      rel("book", books, { required: true, cascadeDelete: true }),
      int("n", { required: true, min: 1 }),
      { name: "image", type: "file", maxSelect: 1, maxSize: 5242880, protected: true, required: true,
        mimeTypes: ["image/webp", "image/png"] },
    ],
    indexes: ["CREATE UNIQUE INDEX idx_pages_book_n ON book_pages (book, n)"],
  });
  app.save(pages);

  const orders = new Collection({
    type: "base", name: "orders", ...closed,
    fields: [
      int("number", { required: true, min: 1 }),
      rel("user", users, { required: true }),
      rel("book", books, { required: true }),
      { name: "amount", type: "number", min: 0 },
      { name: "status", type: "select", maxSelect: 1, required: true, values: ["pending", "approved", "rejected"] },
      { name: "receipt", type: "file", maxSelect: 1, maxSize: 8388608, protected: true,
        mimeTypes: ["image/jpeg", "image/png", "image/webp", "application/pdf"] },
      { name: "sender", type: "text", max: 60 },
      { name: "reject_reason", type: "text", max: 500 },
      { name: "created", type: "autodate", onCreate: true },
    ],
    indexes: [
      "CREATE UNIQUE INDEX idx_orders_number ON orders (number)",
      "CREATE UNIQUE INDEX idx_orders_one_pending ON orders (user, book) WHERE status = 'pending'",
    ],
  });
  app.save(orders);

  const library = new Collection({
    type: "base", name: "library", ...closed,
    fields: [rel("user", users, { required: true }), rel("book", books, { required: true })],
    indexes: ["CREATE UNIQUE INDEX idx_library ON library (user, book)"],
  });
  app.save(library);

  const progress = new Collection({
    type: "base", name: "progress", ...closed,
    fields: [rel("user", users, { required: true }), rel("book", books, { required: true }), int("last_page"), int("max_page")],
    indexes: ["CREATE UNIQUE INDEX idx_progress ON progress (user, book)"],
  });
  app.save(progress);

  const counters = new Collection({ type: "base", name: "counters", ...closed, fields: [int("seq")] });
  app.save(counters);
  const c = new Record(counters);
  c.set("seq", 1000);
  app.save(c);

  const book = new Record(books);
  book.set("slug", "shelf-guide");
  book.set("title", "دليل الرف");
  book.set("price_egp", 150);
  book.set("pages_count", 2);
  app.save(book);

  const s = app.settings();
  s.rateLimits.enabled = true;
  s.rateLimits.rules = [...s.rateLimits.rules, { label: "POST /api/raff/orders", maxRequests: 6, duration: 60 }];
  s.backups.cron = "0 3 * * *";
  s.backups.cronMaxKeep = 14;
  app.save(s);
}, () => {});
~~~

~~~js pb_hooks/raff.pb.js
/// <reference path="../pb_data/types.d.ts" />

// أول موظف من متغيرات البيئة، مرة واحدة
$app.onServe().bindFunc((e) => {
  const email = ($os.getenv("STAFF_EMAIL") || "").trim().toLowerCase();
  const password = $os.getenv("STAFF_PASSWORD") || "";
  if (email && password && e.app.countRecords("staff") === 0) {
    const staff = new Record(e.app.findCollectionByNameOrId("staff"));
    staff.set("email", email);
    staff.setPassword(password);
    staff.setVerified(true);
    e.app.save(staff);
  }
  return e.next();
});

// حساب عميل
routerAdd("POST", "/api/raff/register", (e) => {
  const body = e.requestInfo().body || {};
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) throw new BadRequestError("invalid_email");
  if (password.length < 8) throw new BadRequestError("weak_password");
  try {
    e.app.findAuthRecordByEmail("users", email);
    throw new BadRequestError("email_taken");
  } catch (err) {
    if (/email_taken/i.test(String(err))) throw err;
  }
  const user = new Record(e.app.findCollectionByNameOrId("users"));
  user.set("email", email);
  user.set("name", String(body.name || "").slice(0, 80));
  user.setPassword(password);
  e.app.save(user);
  return $apis.recordAuthResponse(e, user, "password");
});

// إرسال الإيصال: السعر من القاعدة، والرقم والحفظ في عملية واحدة
routerAdd("POST", "/api/raff/orders", (e) => {
  const app = e.app;
  const body = e.requestInfo().body || {};
  const book = app.findFirstRecordByData("books", "slug", String(body.book || ""));
  let files = [];
  try { files = e.findUploadedFiles("receipt"); } catch (err) {}
  if (!files.length) throw new BadRequestError("receipt_required");

  let number = 0;
  const userId = e.auth.id;
  try {
    app.runInTransaction((tx) => {
      const c = tx.findFirstRecordByFilter("counters", "id != ''");
      number = c.getInt("seq") + 1;
      c.set("seq", number);
      tx.save(c);
      const rec = new Record(tx.findCollectionByNameOrId("orders"));
      rec.set("number", number);
      rec.set("user", userId);
      rec.set("book", book.id);
      rec.set("amount", book.getFloat("price_egp"));
      rec.set("status", "pending");
      rec.set("sender", String(body.sender || "").slice(0, 60));
      rec.set("receipt", files[0]);
      tx.save(rec);
    });
  } catch (err) {
    const text = String(err);
    if (/must be unique/i.test(text)) throw new BadRequestError("order_pending");
    if (/receipt/i.test(text)) throw new BadRequestError("invalid_receipt");
    throw err;
  }
  return e.json(200, { number, status: "pending" });
}, $apis.requireAuth("users"), $apis.bodyLimit(10 << 20));

// قايمة الطلبات للموظف
routerAdd("GET", "/api/raff/staff/orders", (e) => {
  const list = e.app.findRecordsByFilter("orders", "status = {:s}", "created", 50, 0, {
    s: e.requestInfo().query.status || "pending",
  });
  return e.json(200, list.map((r) => ({
    id: r.id, number: r.getInt("number"), amount: r.getFloat("amount"),
    sender: r.getString("sender"), status: r.getString("status"),
  })));
}, $apis.requireAuth("staff"));

// الإيصال نفسه: ملف محمي بيتقدم من هنا بس
routerAdd("GET", "/api/raff/staff/orders/{id}/receipt", (e) => {
  const order = e.app.findRecordById("orders", e.request.pathValue("id"));
  const fsys = e.app.newFilesystem();
  try {
    const reader = fsys.getReader(order.baseFilesPath() + "/" + order.getString("receipt"));
    try {
      e.response.header().set("Cache-Control", "private, no-store");
      e.response.header().set("X-Content-Type-Options", "nosniff");
      e.stream(200, reader.contentType(), reader);
    } finally { reader.close(); }
  } finally { fsys.close(); }
}, $apis.requireAuth("staff"));

// الموافقة: الطلب والمكتبة مع بعض أو مفيش
routerAdd("POST", "/api/raff/staff/orders/{id}/approve", (e) => {
  const id = e.request.pathValue("id");
  e.app.runInTransaction((tx) => {
    const order = tx.findRecordById("orders", id);
    if (order.getString("status") !== "pending") throw new BadRequestError("already_reviewed");
    order.set("status", "approved");
    tx.save(order);
    const row = new Record(tx.findCollectionByNameOrId("library"));
    row.set("user", order.getString("user"));
    row.set("book", order.getString("book"));
    tx.save(row);
  });
  return e.json(200, { ok: true });
}, $apis.requireAuth("staff"));

routerAdd("POST", "/api/raff/staff/orders/{id}/reject", (e) => {
  const reason = String((e.requestInfo().body || {}).reason || "").trim();
  if (reason.length < 3) throw new BadRequestError("reason_required");
  const order = e.app.findRecordById("orders", e.request.pathValue("id"));
  if (order.getString("status") !== "pending") throw new BadRequestError("already_reviewed");
  order.set("status", "rejected");
  order.set("reject_reason", reason);
  e.app.save(order);
  return e.json(200, { ok: true });
}, $apis.requireAuth("staff"));

// رفع صفحة من الموظف
routerAdd("POST", "/api/raff/staff/books/{slug}/pages", (e) => {
  const book = e.app.findFirstRecordByData("books", "slug", e.request.pathValue("slug"));
  const page = new Record(e.app.findCollectionByNameOrId("book_pages"));
  page.set("book", book.id);
  page.set("n", parseInt((e.requestInfo().body || {}).n, 10));
  page.set("image", e.findUploadedFiles("image")[0]);
  e.app.save(page);
  return e.json(200, { ok: true });
}, $apis.requireAuth("staff"));

// صفحة الكتاب: التحقق في كل طلب
routerAdd("GET", "/api/raff/read/{slug}/{n}", (e) => {
  const book = e.app.findFirstRecordByData("books", "slug", e.request.pathValue("slug"));
  try {
    e.app.findFirstRecordByFilter("library", "user = {:u} && book = {:b}", { u: e.auth.id, b: book.id });
  } catch (err) {
    throw new ForbiddenError("not_owned");
  }
  const page = e.app.findFirstRecordByFilter("book_pages", "book = {:b} && n = {:n}", {
    b: book.id, n: parseInt(e.request.pathValue("n"), 10),
  });
  const fsys = e.app.newFilesystem();
  try {
    const reader = fsys.getReader(page.baseFilesPath() + "/" + page.getString("image"));
    try {
      e.response.header().set("Cache-Control", "private, max-age=3600");
      e.response.header().set("Vary", "Authorization");
      e.stream(200, reader.contentType(), reader);
    } finally { reader.close(); }
  } finally { fsys.close(); }
}, $apis.requireAuth("users"));

// حفظ التقدم: أبعد صفحة مبتقلش
routerAdd("POST", "/api/raff/read/{slug}/progress", (e) => {
  const app = e.app;
  const book = app.findFirstRecordByData("books", "slug", e.request.pathValue("slug"));
  const total = book.getInt("pages_count");
  const page = Math.max(1, Math.min(total, parseInt((e.requestInfo().body || {}).page, 10) || 1));
  let p;
  try {
    p = app.findFirstRecordByFilter("progress", "user = {:u} && book = {:b}", { u: e.auth.id, b: book.id });
  } catch (err) {
    p = new Record(app.findCollectionByNameOrId("progress"));
    p.set("user", e.auth.id);
    p.set("book", book.id);
  }
  p.set("last_page", page);
  p.set("max_page", Math.max(p.getInt("max_page"), page));
  app.save(p);
  return e.json(200, { last_page: page, max_page: p.getInt("max_page") });
}, $apis.requireAuth("users"));
~~~

~~~js test.mjs
const B = process.env.BASE || "http://127.0.0.1:8793";
let pass = 0, fail = 0;
const ok = (c, m, x) => { if (c) { pass++; console.log("ok  ", m); } else { fail++; console.log("FAIL", m, JSON.stringify(x)); } };
async function j(path, { method = "GET", token, body, form } = {}) {
  const h = {}; if (token) h.Authorization = token; let b = form;
  if (!form && body !== undefined) { h["Content-Type"] = "application/json"; b = JSON.stringify(body); }
  const r = await fetch(B + path, { method, headers: h, body: b });
  const t = await r.text(); let d; try { d = JSON.parse(t); } catch { d = t; }
  return { s: r.status, d };
}
const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==", "base64");
const fd = (o, field, buf = png) => { const f = new FormData(); for (const k in o) f.set(k, o[k]); if (field) f.set(field, new Blob([buf], { type: "image/png" }), "a.png"); return f; };
const code = (r) => String(r.d.message || "").toLowerCase().replace(/\.$/, "");

let r = await j("/api/collections/staff/auth-with-password", { method: "POST", body: { identity: "staff@example.com", password: "lab-password-123" } });
ok(r.s === 200, "staff login", r.d); const STAFF = r.d.token;

for (const c of ["orders", "users", "book_pages", "library", "progress", "staff"]) {
  r = await j($__bt/api/collections/$__{c}/records$__bt); ok(r.s === 403, $__btclosed $__{c}$__bt, r.s);
}
for (const n of [1, 2]) { r = await j("/api/raff/staff/books/shelf-guide/pages", { method: "POST", token: STAFF, form: fd({ n }, "image") }); ok(r.s === 200, "upload page " + n, r.d); }

r = await j("/api/raff/register", { method: "POST", body: { name: "سلمى", email: "salma@example.com", password: "testpass123" } });
ok(r.s === 200 && r.d.token, "register", r.d); const U = r.d.token;
r = await j("/api/raff/register", { method: "POST", body: { email: "SALMA@example.com", password: "testpass123" } }); ok(code(r) === "email_taken", "duplicate email", r.d);
r = await j("/api/raff/read/shelf-guide/1", { token: U }); ok(r.s === 403, "page locked before payment", r.s);

r = await j("/api/raff/orders", { method: "POST", token: U, form: fd({ book: "shelf-guide", sender: "01000000000" }) }); ok(code(r) === "receipt_required", "receipt required", r.d);
r = await j("/api/raff/orders", { method: "POST", token: U, form: fd({ book: "shelf-guide", sender: "01000000000" }, "receipt", Buffer.from("<script>")) }); ok(code(r) === "invalid_receipt", "fake image refused", r.d);
r = await j("/api/raff/orders", { method: "POST", token: U, form: fd({ book: "shelf-guide", sender: "01000000000", amount: "1" }, "receipt") }); ok(r.d.number === 1001 || r.d.number === 1003, "order created", r.d); const first = r.d.number;
r = await j("/api/raff/orders", { method: "POST", token: U, form: fd({ book: "shelf-guide", sender: "01000000000" }, "receipt") }); ok(code(r) === "order_pending", "no second pending", r.d);

r = await j("/api/raff/staff/orders", { token: U }); ok(r.s === 403, "customer cannot list", r.s);
r = await j("/api/raff/staff/orders", { token: STAFF }); ok(r.d[0].amount === 150, "server price", r.d); const id = r.d[0].id;
r = await fetch($__bt$__{B}/api/raff/staff/orders/$__{id}/receipt$__bt, { headers: { Authorization: STAFF } }); ok(r.status === 200 && r.headers.get("content-type") === "image/png", "staff reads receipt", r.status); await r.arrayBuffer();
r = await j($__bt/api/raff/staff/orders/$__{id}/receipt$__bt, { token: U }); ok(r.s === 403, "customer cannot read receipt", r.s);

r = await j($__bt/api/raff/staff/orders/$__{id}/reject$__bt, { method: "POST", token: STAFF, body: { reason: "x" } }); ok(code(r) === "reason_required", "reason required", r.d);
r = await j($__bt/api/raff/staff/orders/$__{id}/reject$__bt, { method: "POST", token: STAFF, body: { reason: "الإيصال مش واضح" } }); ok(r.s === 200, "rejected", r.d);
r = await j("/api/raff/orders", { method: "POST", token: U, form: fd({ book: "shelf-guide", sender: "01000000000" }, "receipt") }); ok(r.s === 200, "resend after reject", r.d);
r = await j("/api/raff/staff/orders", { token: STAFF }); const id2 = r.d[0].id;
r = await j($__bt/api/raff/staff/orders/$__{id2}/approve$__bt, { method: "POST", token: U }); ok(r.s === 403, "customer cannot approve", r.s);
r = await j($__bt/api/raff/staff/orders/$__{id2}/approve$__bt, { method: "POST", token: STAFF }); ok(r.s === 200, "approved", r.d);
r = await j($__bt/api/raff/staff/orders/$__{id2}/approve$__bt, { method: "POST", token: STAFF }); ok(code(r) === "already_reviewed", "no double approve", r.d);

r = await fetch($__bt$__{B}/api/raff/read/shelf-guide/2$__bt, { headers: { Authorization: U } }); ok(r.status === 200, "page opens after approve", r.status); await r.arrayBuffer();
r = await j("/api/raff/read/shelf-guide/progress", { method: "POST", token: U, body: { page: 2 } }); ok(r.d.max_page === 2, "progress", r.d);
r = await j("/api/raff/read/shelf-guide/progress", { method: "POST", token: U, body: { page: 1 } }); ok(r.d.last_page === 1 && r.d.max_page === 2, "going back keeps max", r.d);
r = await j("/api/raff/read/shelf-guide/progress", { method: "POST", token: U, body: { page: 999 } }); ok(r.d.last_page === 2, "page clamped", r.d);
r = await j("/api/raff/register", { method: "POST", body: { email: "other@example.com", password: "testpass123" } }); const U2 = r.d.token;
r = await j("/api/raff/read/shelf-guide/1", { token: U2 }); ok(r.s === 403, "other customer locked", r.s);
console.log($__bt\n$__{pass} passed, $__{fail} failed$__bt);
process.exit(fail ? 1 : 0);
~~~

~~~bash
docker run -d --name pbraff -p 127.0.0.1:8793:8090 -e STAFF_EMAIL=staff@example.com -e STAFF_PASSWORD=lab-password-123 pblab:0.40.4
node test.mjs
~~~

الصورة لازم تتبني من فولدر فيه الملفات دي عشان [[COPY]] يحطها جواها.

~~~text الناتج
ok   staff login
ok   closed orders
...
ok   page clamped
ok   other customer locked

31 passed, 0 failed
~~~` },
        { lvl: 'فكرة', t: R`نفس دفتر الزوار على Supabase`, what: R`ابني دفتر الزوار مرة بـ PocketBase ومرة بـ Supabase محليًا، وسجّل في جدول: عدد الخدمات، والذاكرة، وسطور الكود، والوقت لحد أول طلب.`, done: R`جدول أرقام حقيقية من جهازك، وقرار مكتوب إمتى تختار كل واحد.`, ext: R`زوّد رفع صورة، وشوف قد إيه الفرق كبر.`, sol: R`نسخة نموذجية من الجانب بتاع Supabase، من الوثائق. لازم تتجرب على مشروع تجربة محلي بـ [[supabase start]] (درس Supabase CLI في تاب PostgreSQL)، مش على مشروع حقيقي:

~~~sql
create table public.guestbook (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) <= 60),
  message text not null check (char_length(message) <= 280),
  created_at timestamptz not null default now()
);
alter table public.guestbook enable row level security;
create policy guestbook_read on public.guestbook for select to anon, authenticated using (true);
create policy guestbook_write on public.guestbook for insert to anon, authenticated with check (true);
~~~

القواعد نفس الفكرة: قراية وإضافة للكل، ومفيش policy للتعديل أو المسح فهما ممنوعين. الفرق هتشوفه في التشغيل: عدد الحاويات والذاكرة. اخترنا الجدول ده عشان أبسط مقارنة تعدل بين الاتنين، من غير منطق يميل لواحد.` }
      ],
      items: [
        {
          cmd: "PocketBase في الإنتاج",
          title: "حدود الطلبات والباك أب و nginx: اللي لازم تظبطه قبل ما تطلع",
          desc: R`الافتراضي مناسب للتجربة بس: **حدود الطلبات مقفولة، ومفيش باك أب مجدول، ولوحة الإدارة مفتوحة.** الدرس ده اللي لازم يتغير قبل أول يوزر حقيقي.

الإعدادات دي تتحط في migration عشان تبقى كود، و nginx قدامه يعدّي المسارات اللي الموقع بيستخدمها بس.`,
          example: R`migrate((app) => {
  const s = app.settings();
  s.meta.appName = "رف";
  s.meta.appURL = "https://raff.example.com";
  s.meta.hideControls = true;
  s.rateLimits.enabled = true;
  s.rateLimits.rules = [...s.rateLimits.rules, { label: "POST /api/raff/orders", maxRequests: 6, duration: 60 }];
  s.trustedProxy.headers = ["X-Real-IP"];
  s.backups.cron = "0 3 * * *";
  s.backups.cronMaxKeep = 14;
  app.save(s);
}, () => {});`,
          try: R`بـ superuser اطلب [[GET /api/settings]] وشوف [[rateLimits.enabled]] و [[backups.cron]]. وبعدين فعّل قاعدة 3 طلبات في 10 ثواني على مسار من بتاعك، وابعت 5 طلبات.`,
          sol: R`~~~text الناتج قبل التعديل
rateLimits {"rules":[{"label":"*:auth","duration":3,"maxRequests":2},{"label":"*:create","duration":5,"maxRequests":20},{"label":"/api/batch","duration":1,"maxRequests":3},{"label":"/api/","duration":10,"maxRequests":300}],"excludedIPs":[],"enabled":false}
backups {"cron":"","cronMaxKeep":3, ...
~~~

القواعد موجودة بس [[enabled: false]]. وبعد التفعيل:

~~~text الناتج
200 200 200 429 429
{"data":{},"message":"Too Many Requests.","status":429}
~~~`,
          flag: "script",
          deep: {
            why: R`من غير حدود، أي حد يقدر يجرب آلاف كلمات السر أو يملى قاعدتك. ومن غير باك أب، غلطة واحدة تمسح كل حاجة. ولوحة [[/_/]] المفتوحة معناها إن كلمة سر واحدة بين المهاجم وكل بياناتك.`,
            how: R`[[rateLimits.rules]] كل قاعدة ليها [[label]]: مسار زي [[/api/lab/check]]، أو [[POST /api/x]] لـ method واحد، أو [[*:auth]] لكل مسارات الدخول. الحد بيتحسب لكل IP.

وورا proxy كل الطلبات بتيجي من IP واحد، فالحد هيقفل الكل. [[trustedProxy.headers]] بيقول للبرنامج ياخد الـ IP الحقيقي من [[X-Real-IP]]. وده آمن بس لو محدش يقدر يوصل للحاوية غير الـ proxy، وإلا أي حد يبعت الـ header ده ويزوّر الـ IP.

الباك أب: [[POST /api/backups]] بيعمل ملف zip فيه [[pb_data]] كله، و [[backups.cron]] جدول، و [[cronMaxKeep]] عدد النسخ، و [[backups.s3]] لرفعها برة السيرفر. والـ restore بيبدّل البيانات وبيعيد تشغيل العملية.

و [[--encryptionEnv]] بيشفر الإعدادات، زي كلمة سر SMTP، جوه القاعدة.`,
            when: "قبل أول يوزر حقيقي. ولو موقعك على سيرفر مشترك، nginx قدامه والحاوية من غير بورت مفتوح.",
            mistakes: R`الباك أب على نفس السيرفر بس: لو السيرفر راح، النسخ راحت معاه. ونسخ [[data.db]] وحده والبرنامج شغال، من غير [[-wal]]، فالنسخة تطلع ناقصة: استخدم [[POST /api/backups]]. وتفعيل الحدود ورا proxy من غير [[trustedProxy]]. واختبار الموقع من superuser بعد ما تقفل المسارات، فمتشوفش اللي اتقفل.`
          },
          teach: R`## الفكرة

تلات طبقات: إعدادات جوه البرنامج، ونسخ احتياطية، و nginx قدامه.

---

## ١. حدود الطلبات

~~~js
s.rateLimits.enabled = true;
s.rateLimits.rules = [...s.rateLimits.rules, { label: "POST /api/raff/orders", maxRequests: 6, duration: 60 }];
~~~

[[...s.rateLimits.rules]] بيحتفظ بالقواعد الموجودة، وبيزوّد عليها. بعدها جربنا مسار حده 3:

~~~text الناتج
200 200 200 429 429
~~~

---

## ٢. ورا proxy

~~~js
s.trustedProxy.headers = ["X-Real-IP"];
~~~

من غيرها كل زوارك IP واحد، وأول حد يوصل الحد يقفل الموقع على الكل.

---

## ٣. الباك أب

~~~bash
curl -s -X POST -H "Authorization: $TOKEN" -H 'Content-Type: application/json' -d '{"name":"before_delete.zip"}' http://127.0.0.1:8790/api/backups
curl -s -H "Authorization: $TOKEN" http://127.0.0.1:8790/api/backups
~~~

~~~text الناتج
[{"modified":"2026-11-05 08:41:36.363Z","key":"lab_backup.zip","size":230613}]
~~~

---

## ٤. جرّب الرجوع فعلًا

باك أب من غير تجربة رجوع مش باك أب. عملنا نسخة، ومسحنا كتاب، ورجّعنا:

~~~bash
curl -s -X POST -H "Authorization: $TOKEN" http://127.0.0.1:8790/api/backups/before_delete.zip/restore
~~~

بيرجّع 204، والعملية بتعيد تشغيل نفسها، والكتاب رجع:

~~~text الناتج
{"items":[..., {"title":"before-restore"}],"totalItems":4, ...} 200
~~~

والمسارات دي للـ superuser بس: يوزر عادي رجّع 403.

---

## ٥. nginx: اسمح باللي محتاجه بس

~~~bash
server {
    listen 80;
    location ^~ /api/ {
        location ~ ^/api/(lab/.+|collections/users/auth-with-password|health)$ {
            resolver 127.0.0.11 valid=30s ipv6=off;
            set $pb http://pbng-app:8090;
            proxy_pass $pb;
        }
        return 404;
    }
    location ^~ /_/ { return 404; }
}
~~~

- [[location ^~ /api/]] أي حاجة تحت [[/api/]] بتيجي هنا.
- الـ [[location]] اللي جواها قايمة المسموح، وأي حاجة تانية بتوصل لـ [[return 404]].
- [[set $pb]] مع [[resolver]] بيخلي nginx يقوم حتى لو الحاوية التانية واقعة.

اختبار بحلقة [[curl]]:

~~~text الناتج
/api/health                                          200
/api/lab/hello/nour                                  200
/api/collections/secrets/records                     404
/api/collections/_superusers/auth-with-password      404
/api/backups                                         404
/api/settings                                        404
/_/                                                  404
~~~

ده حاجز تاني فوق القواعد. لو قاعدة اتظبطت غلط، الجدول برضه مش ظاهر من بره. وللوصول للوحة استخدم [[ssh -L]] (درس SSH tunnel في تاب bash).

---

## ٦. القايمة قبل الإطلاق

| البند | ليه |
|---|---|
| volume لـ [[pb_data]] | البيانات تعيش بعد الحاوية |
| [[rateLimits.enabled]] | مقفولة افتراضيًا |
| [[trustedProxy]] | لو ورا nginx |
| [[backups.cron]] ونسخة برة السيرفر | الافتراضي مفيش باك أب |
| جرّب [[restore]] | تتأكد إن النسخة بتشتغل |
| [[/_/]] مقفولة | الإدارة من tunnel |
| [[hideControls]] | محدش يغيّر الجداول من اللوحة بالغلط |
| [[appURL]] و SMTP | لينكات الإيميلات ووصولها |
| [[protected: true]] | الملفات الخاصة |
| [[--automigrate=false]] | التغييرات من ملفات بس |`,
          lines: [
            "ملف migration مخصوص للإعدادات.",
            "هات إعدادات البرنامج الحالية في متغير.",
            "اسم التطبيق، بيظهر في الإيميلات.",
            "رابط الموقع، بيتحط في لينكات الإيميلات.",
            "اخفي أدوات تعديل الجداول من اللوحة.",
            "فعّل حدود الطلبات، مقفولة افتراضيًا.",
            "احتفظ بالقواعد الموجودة وزوّد مسار الطلبات.",
            "خد الـ IP الحقيقي من الـ header ده، لأن الحاوية ورا proxy.",
            "باك أب كل يوم الساعة 3 الفجر UTC.",
            "احتفظ بآخر 14 نسخة.",
            "احفظ الإعدادات الجديدة في القاعدة.",
            "دالة الرجوع فاضية، لأن مفيش حاجة تترجع هنا."
          ],
          practice: [
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من [[GET /api/settings]] هات قيمة [[rateLimits.enabled]] و [[backups.cron]] على تثبيت جديد.`, done: R`[[false]] وقيمة فاضية.`, sol: R`~~~bash
curl -s -H "Authorization: $TOKEN" http://127.0.0.1:8790/api/settings | node -pe "const s=JSON.parse(require('fs').readFileSync(0));[s.rateLimits.enabled, JSON.stringify(s.backups.cron)].join(' ')"
~~~

~~~text الناتج
false ""
~~~

يعني من غير تعديل: مفيش حدود ومفيش باك أب مجدول.` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** حلقة [[curl]] بتتأكد إن قايمة مسارات لازم تكون مقفولة بترجّع 404 ورا nginx.`, done: R`الاختبار يطبع كل مسار وكوده.`, sol: R`~~~bash
for p in /api/health /api/collections/secrets/records /api/backups /api/settings /_/; do
  printf '%-44s %s\n' "$p" "$(curl -s -m 5 -o /dev/null -w '%{http_code}' http://127.0.0.1:8795$p)"
done
~~~

[[-o /dev/null]] بيرمي الجسم، و [[-w '%{http_code}']] بيطبع الكود بس، و [[printf '%-44s']] بيظبط العمود. شغّله بعد كل تغيير في nginx، عشان فتح مسار بالغلط يبان.

~~~text الناتج
/api/health                                  200
/api/collections/secrets/records             404
/api/backups                                 404
/api/settings                                404
/_/                                          404
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** باك أب ورجوع: اعمل نسخة، وامسح صف، ورجّع، وأثبت إن الصف رجع.`, done: R`الصف يظهر تاني بعد الـ restore.`, sol: R`~~~bash
curl -s -X POST -H "Authorization: $TOKEN" -H 'Content-Type: application/json' -d '{"name":"before_delete.zip"}' http://127.0.0.1:8790/api/backups
curl -s -X DELETE -H "Authorization: $TOKEN" "http://127.0.0.1:8790/api/collections/books/records/$ID"
curl -s -X POST -H "Authorization: $TOKEN" http://127.0.0.1:8790/api/backups/before_delete.zip/restore
curl -s "http://127.0.0.1:8790/api/collections/books/records?fields=title"
~~~

استنى كام ثانية قبل آخر أمر، لأن العملية بتعيد التشغيل. والـ restore بيرجّع **كل** حاجة للنسخة، فأي بيانات جت بعدها بتضيع.

~~~text الناتج
backup 204
delete 204
restore 204
{"items":[{"title":"دليل الجيب"},...,{"title":"before-restore"}],...} 200
~~~` },
            { lvl: 'تحدي', t: R`**اشرحها:** ليه [[trustedProxy.headers = ["X-Real-IP"]]] خطر لو الحاوية بورتها مفتوح للنت مباشرة؟`, done: R`تشرح السيناريو في ٣ سطور.`, sol: R`لو حد يقدر يكلّم الحاوية مباشرة، يبعت [[X-Real-IP: 1.2.3.4]] من عنده، والبرنامج يصدّقه. فبيغيّر الـ IP مع كل طلب، وحدود الطلبات مش بتمسكه. عشان كده الحاوية على شبكة داخلية من غير [[ports]]، والـ proxy بس يوصلها.` }
          ]
        },
        {
          cmd: "PocketBase ولا Supabase",
          title: "نفس الفكرة بتصميمين: إمتى تختار كل واحد",
          desc: R`الاتنين بيدّوك حسابات وجداول وملفات و realtime من غير ما تكتب backend. PocketBase عملية واحدة وملف SQLite بتشغّله انت. و Supabase مجموعة خدمات حوالين Postgres، مستضافة أو بتشغّلها بنفسك.

القرار غالبًا بييجي من تلات أسئلة: هتحتاج أكتر من سيرفر؟ محتاج قوة Postgres؟ عايز تدير السيرفر بنفسك؟`,
          example: R`docker ps --filter name=pblab --format '{{.Names}} {{.Image}}'
docker stats --no-stream --format '{{.Name}} {{.MemUsage}}' pblab
docker exec pblab du -sh /pb/pb_data
docker images pblab:0.40.4 --format '{{.Repository}}:{{.Tag}} {{.Size}}'`,
          try: R`شغّل PocketBase وقيس الذاكرة بـ [[docker stats --no-stream]]، وحجم [[pb_data]]، وعدد الطلبات في الثانية. وبعدين اقرا درس «Supabase CLI» في تاب PostgreSQL، وشوف [[supabase start]] بيشغّل كام حاوية.`,
          sol: R`عندنا طلعت الأرقام دي، بقاعدة تجربة صغيرة ومن غير ضغط:

~~~text الناتج
pblab pblab:0.40.4
pblab 17.66MiB / 15.33GiB
3.2M	/pb/pb_data
pblab:0.40.4 60.7MB
~~~

والمهم عدد الحاويات: PocketBase حاوية واحدة، و Supabase في الـ compose الرسمي 11 خدمة أساسية (من الوثائق: Studio و API gateway و Auth و PostgREST و Realtime و Storage و imgproxy و postgres-meta و Edge Runtime و Postgres و Supavisor)، وزيادة عليهم Logflare و Vector للوجات. مقسناش ذاكرة Supabase هنا.

ده مش معناه إن Supabase أسوأ. كل خدمة فيهم بتدّيك قدرة، بس على مشروع صغير بتدفع تمنها في الموارد أو الاشتراك.`,
          deep: {
            why: "اللي بيضيع وقت مش اختيار الأداة الأقل، اللي بيضيع وقت إنك تختار من غير ما تعرف الفرق، وتكتشفه بعد ما المشروع يكبر. القرار ده بيأثر على الاستضافة والتكلفة وطريقة كتابة المنطق.",
            how: R`**PocketBase:** ملف Go واحد، و SQLite مدمج. القراءة والكتابة على نفس الجهاز، والكتابة بتمشي واحدة ورا التانية. سريع جدًا لسيرفر واحد، بس مفيش كذا سيرفر بيكتبوا مع بعض.

**Supabase:** Postgres حقيقي، و PostgREST بيعمل API، و Auth منفصل، و Realtime منفصل، و Storage منفصل. كل واحد ممكن يكبر لوحده، وعندك كل قدرات Postgres: joins معقدة، و extensions زي pgvector، و RLS جوه القاعدة نفسها.

قسنا PocketBase على جهاز تطوير في Docker Desktop، 20 طلب متوازي: حوالي 2370 قراية و 3165 كتابة لصف واحد في الثانية، والعملية بتستخدم حوالي 18 ميجا ذاكرة وهي فاضية. الرقم للتوضيح بس، لأن الجهاز والعميل بيأثروا، ومش مقارنة بـ Supabase لأن مقسناش التاني بنفس الطريقة.`,
            when: "PocketBase: مشروع واحد، ميزانية صغيرة، بياناتك عندك، ومنطق بسيط لمتوسط. Supabase: محتاج Postgres نفسه، أو فريق بيستخدم SQL، أو نمو متوقع، أو مش عايز تدير سيرفر وباك أب.",
            mistakes: R`اختيار PocketBase لمشروع محتاج كذا سيرفر. واختيار Supabase Free لموقع بيبيع من غير ما تعرف إن المشروع ممكن يتوقف لقلة النشاط، ومفيش باك أب تلقائي. والمقارنة بالسرعة بس. ونسيان إن PocketBase لسه قبل [[1.0]]، فالترقية محتاجة قراية.`
          },
          teach: R`## الفكرة

مفيش واحد أحسن. فيه واحد أنسب لسؤالك. الجدول ده أساس القرار.

**المصدر:** جانب PocketBase اتجرّب على [[0.40.4]] في المعمل. جانب Supabase من الوثائق الرسمية (نوفمبر 2026) ومن دروس Supabase في التاب ده، ومتجرّبش على مشروع Supabase حقيقي. الأسعار بتتغير، فراجع صفحة الأسعار.

---

## ١. جدول المقارنة

| الموضوع | PocketBase | Supabase |
|---|---|---|
| هو إيه | برنامج واحد | مجموعة خدمات حوالين Postgres |
| قاعدة البيانات | SQLite مدمج | Postgres كامل |
| الاستضافة | سيرفرك انت | سحابة Supabase، أو Docker بنفسك |
| عدد الخدمات | عملية واحدة | 11 خدمة أساسية في الـ self-host |
| الصلاحيات | API rules جوه التطبيق | RLS جوه القاعدة |
| المنطق المخصوص | [[pb_hooks]] بـ JavaScript، أو Go | دوال SQL بـ [[rpc]]، و Edge Functions على Deno |
| الحسابات | جدول [[auth]]، وكذا جدول | [[auth.users]] وخدمة منفصلة |
| الملفات | حقل في الجدول، على ديسك أو S3 | Buckets و policies |
| Realtime | SSE على تغييرات الجداول | WebSocket: Postgres Changes و Broadcast و Presence |
| الباك أب | zip لـ [[pb_data]]، وجدوله بنفسك | يومي من Pro، و PITR إضافة مدفوعة |
| التوسع | سيرفر واحد أكبر | القاعدة والخدمات منفصلين |
| لغة الاستعلام | فلاتر PocketBase، و SQLite في الـ hooks | SQL كامل |
| لوحة الإدارة | [[/_/]] بسيطة | Studio كبير فيه SQL Editor |
| الترخيص والتكلفة | مفتوح المصدر، بتدفع السيرفر بس | مفتوح المصدر، وخطط مجانية ومدفوعة |

---

## ٢. أسئلة القرار

| السؤال | لو الإجابة أيوه |
|---|---|
| هتحتاج كذا سيرفر بيكتبوا في نفس القاعدة؟ | Supabase |
| محتاج pgvector أو تقارير SQL معقدة؟ | Supabase |
| فريقك بيكتب SQL كل يوم؟ | Supabase |
| مش عايز تدير سيرفر ولا باك أب؟ | Supabase |
| عندك سيرفر بالفعل وعايز تكلفة ثابتة؟ | PocketBase |
| مشروع واحد ومنطق بسيط لمتوسط؟ | PocketBase |
| البيانات لازم تفضل على سيرفرك؟ | PocketBase، أو Supabase بنفسك |
| عايز تنقل كل حاجة بنسخ فولدر؟ | PocketBase |

---

## ٣. على الخطة المجانية بتاعة Supabase

من الوثائق: المشروع ممكن يتوقف لو نشاطه قليل خلال 7 أيام، والخطط المدفوعة مش بتتوقف. ومفيش باك أب تلقائي، والباك أب اليومي من Pro. يعني موقع بيبيع لازم يعمل حساب ده.

---

## ٤. نفس القيد في الاتنين

«طلب واحد مستني لكل يوزر» بنفس الفكرة:

~~~sql
CREATE UNIQUE INDEX loans_one_pending ON loans (uid, book) WHERE status = 'pending';
~~~

الـ partial index موجود في SQLite و Postgres. وده أهم حاجة في المقارنة: **المفاهيم بتتنقل**: جداول وعلاقات و indexes و transactions، فاللي تتعلمه في واحد بينفعك في التاني.

---

## ٥. نقل الداتا بعدين

PocketBase لـ Postgres ممكن بس مش ببلاش: أنواع الأعمدة، و [[id]] نصي، والملفات، وكلمات السر. عشان كده لو متوقع تكبر جامد، ابدأ بـ Postgres. ولو مش متأكد، ابدأ بالأبسط، واكتب المنطق نضيف. الدرس الجاي بيوري المقابل لكل حاجة.

---

## الخلاصة

- PocketBase: بساطة وتكلفة ثابتة، وسيرفر واحد.
- Supabase: Postgres كامل وخدمات أكتر، وتكلفة أو إدارة أعلى.
- القرار من الأسئلة، مش من الشهرة.`,
          lines: [
            "اعرض حاويات المشروع وصورها عشان تعدّها.",
            "اعرض الذاكرة اللي الحاوية بتستخدمها دلوقتي، مرة واحدة.",
            "اعرف حجم بيانات PocketBase على الديسك.",
            "اعرف حجم الصورة نفسها."
          ],
          practice: [
            { lvl: 'سريع', t: R`**اشرحها:** لزميلك في ٣ سطور: إيه الفرق الأساسي بين API rules و RLS؟`, done: R`تذكر مكان تطبيق القاعدة.`, sol: R`الاتنين شرط بيحدد مين يوصل لأنهي صف. الـ API rule جوه PocketBase، فبتتطبق على طلبات الـ API بس، وكود [[pb_hooks]] بيعدّيها. و RLS جوه Postgres نفسه، فبتتطبق على أي اتصال بدور عادي، حتى لو من برة الـ API. والتجاوز في Supabase بيبقى بالـ secret key أو دالة [[SECURITY DEFINER]].` },
            { lvl: 'تطبيق', t: R`**قارن:** اختار لكل مشروع وقول ليه: موقع كتاب واحد على سيرفر عندك، وتطبيق بحث بالـ embeddings، ولوحة داخلية لـ 5 موظفين، ومنصة كورسات لفريق كبير بيكتب SQL.`, done: R`أربع إجابات بسبب لكل واحدة.`, sol: R`| المشروع | الاختيار | السبب |
|---|---|---|
| موقع كتاب واحد على سيرفر عندك | PocketBase أو Supabase | الاتنين ينفعوا. PocketBase لو عايز تكلفة ثابتة، و Supabase لو مش عايز تدير باك أب وعندك خطة مدفوعة |
| بحث بالـ embeddings | Supabase | محتاج pgvector، و SQLite في PocketBase مش معاه ده جاهز |
| لوحة لـ 5 موظفين | PocketBase | ضغط قليل، وعملية واحدة |
| منصة كورسات لفريق SQL | Supabase | SQL وتقارير ونمو، والفريق جاهز لـ Postgres |

مفيش إجابة واحدة صح في الأول، المهم السبب.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** قيس عدد القراءات في الثانية على PocketBase عندك بـ 20 طلب متوازي.`, done: R`رقم من جهازك، ومكتوب جنبه الجهاز.`, sol: R`~~~js
const B = "http://127.0.0.1:8790";
const run = async (n, c, fn) => {
  const t = Date.now();
  let i = 0;
  await Promise.all(Array.from({ length: c }, async () => { while (i++ < n) await fn(); }));
  return Math.round(n / ((Date.now() - t) / 1000));
};
console.log("reads/s", await run(1000, 20, () => fetch(B + "/api/collections/books/records?perPage=5").then((x) => x.text())));
~~~

[[run]] بيشغّل 20 عامل بياخدوا من عدّاد واحد، فالعدد الكلي 1000 مهما كان التوازي.

~~~text الناتج على جهاز تطوير في Docker Desktop
reads/s 2370
~~~

الرقم بيقيس العميل والشبكة والجهاز كمان، فقارنه بنفسه بعد أي تغيير، مش بأرقام حد تاني.` }
          ]
        },
        {
          cmd: "نقل المنطق بين PocketBase و Supabase",
          title: "المقابل لكل حاجة: rule و policy، و hook و rpc",
          desc: R`لو فاهم PocketBase، فـ Supabase نفس المفاهيم بأسامي تانية، والعكس صحيح. [[@request.auth.id]] هو [[auth.uid()]]، و API rule هي policy، والمسار في [[pb_hooks]] هو دالة [[rpc]] أو Edge Function.

الدرس ده بيترجم نفس المنطق بين الاتنين. جانب Postgres اتجرّب على Postgres 16 محلي بدور بديل لـ [[auth.uid()]]، مش على مشروع Supabase.`,
          example: R`CREATE TABLE loans (id serial PRIMARY KEY, uid text NOT NULL, book text NOT NULL, status text NOT NULL, number int UNIQUE NOT NULL);
CREATE UNIQUE INDEX loans_one_pending ON loans (uid, book) WHERE status = 'pending';
CREATE SEQUENCE loan_numbers START 1001;
CREATE FUNCTION request_loan(p_book text) RETURNS int LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_number int;
BEGIN
  v_number := nextval('public.loan_numbers');
  INSERT INTO loans (uid, book, status, number) VALUES (current_setting('app.uid', true), p_book, 'pending', v_number);
  RETURN v_number;
EXCEPTION WHEN unique_violation THEN
  RAISE EXCEPTION 'loan_pending' USING ERRCODE = 'P0001';
END $$;
REVOKE ALL ON FUNCTION request_loan(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION request_loan(text) TO reader;`,
          try: R`خد مسار [[POST /api/lab/loans]] من درس pb_hooks، وقارنه سطر سطر بالدالة دي. وبعدين شغّل الدالة في [[docker run postgres:16-alpine]] واطلبها مرتين.`,
          sol: R`~~~text الناتج على Postgres 16
 request_loan
--------------
         1001
(1 row)

ERROR:  loan_pending
CONTEXT:  PL/pgSQL function request_loan(text) line 8 at RAISE
~~~

و [[SELECT * FROM loans]] مباشرة بالدور العادي بترجّع [[permission denied for table loans]]: الكتابة من الدالة بس، زي جدول قواعده [[null]] في PocketBase ومسار بيكتب فيه.

في الدالة دي، رقم التسلسل بيتحرق لو الطلب اترفض، لأن [[nextval]] مش بترجع مع الـ rollback. وده بيعمل فجوة في الأرقام، بعكس العداد في transaction في PocketBase.`,
          flag: "script",
          deep: {
            why: "مشاريع كتير بتبدأ في واحد وتنتقل للتاني، أو بتشتغل على الاتنين في نفس الوقت. لو عارف المقابل، الانتقال بيبقى ترجمة مش تعلم من الصفر، وبتعرف أنهي حاجة مش هتتنقل لوحدها.",
            how: R`الفرق الكبير في **مين بيفرض القاعدة**. في PocketBase المسار بيعدّي القواعد، فالتحقق في الكود. في Supabase الدالة العادية بتشتغل بصلاحية اللي طلبها، و [[SECURITY DEFINER]] بتشتغل بصلاحية صاحبها، وده زي مسار hook. وعشان كده [[SET search_path]] لازم، و [[REVOKE ... FROM PUBLIC]] بعدها، لأن الدوال مسموحة للكل افتراضيًا.

في Supabase الحقيقي بدل [[current_setting('app.uid')]] بتستخدم [[auth.uid()]]، وبتدّي الدالة لدور [[authenticated]]. شوف درس «rpc» و «policies و auth.uid()».

و [[RAISE EXCEPTION 'loan_pending']] هو [[throw new BadRequestError("loan_pending")]]، والنص بيوصل للـ client في [[error.message]].

الإيصالات: في PocketBase حقل [[protected]] ومسار. في Supabase bucket خاص و [[createSignedUrl]] و policies على [[storage.objects]].`,
            when: "وقت ما تقرر تنقل، أو تكتب مشروع جديد بالأداة التانية، أو تقرا كود مشروع مش بتاعك.",
            mistakes: R`ترجمة [[SECURITY DEFINER]] من غير [[SET search_path]]، وده باب معروف للاستغلال. ونسيان [[REVOKE]]، فالدالة تبقى متاحة لـ [[anon]]. وافتراض إن الصف الممنوع بيرجع 404 في الاتنين: في Supabase القايمة بترجع فاضية، والمفيش 404. وتحويل [[id]] النصي لـ [[uuid]] من غير خطة للعلاقات.`
          },
          teach: R`## الفكرة

نفس المفهوم، باسم تاني، ومكان تطبيق مختلف.

---

## ١. جدول الترجمة

| PocketBase | Supabase | ملاحظة |
|---|---|---|
| collection | جدول في [[public]] | |
| migration بـ JS | ملف SQL في [[supabase/migrations]] | |
| [[listRule]] | [[CREATE POLICY ... FOR SELECT]] | بتفلتر في الاتنين |
| [[createRule]] | [[FOR INSERT WITH CHECK]] | |
| [[updateRule]] | [[FOR UPDATE USING ... WITH CHECK]] | |
| [[deleteRule]] | [[FOR DELETE USING]] | |
| [[null]] | RLS مفعّل ومفيش policy | مقفول على الطريق الجاهز |
| [[""]] | [[USING (true)]] | مفتوح للكل |
| [[@request.auth.id]] | [[auth.uid()]] | |
| جدول [[staff]] | [[role]] في [[app_metadata]] أو جدول | |
| [[routerAdd]] مع تحقق | دالة [[SECURITY DEFINER]] بـ [[rpc]] | أو Edge Function |
| [[runInTransaction]] | جسم الدالة نفسه | |
| [[BadRequestError]] | [[RAISE EXCEPTION]] | |
| [[onRecordCreate]] | Trigger | |
| [[cronAdd]] | [[pg_cron]] | |
| [[file]] [[protected]] | bucket خاص و signed URL | |
| [[/api/realtime]] | [[channel().on("postgres_changes")]] | |
| [[pb.collection().getList]] | [[supabase.from().select]] | الـ SDK بيرمي، و supabase-js بيرجّع [[error]] |

---

## ٢. rule لـ policy

~~~js
listRule: "owner = @request.auth.id",
createRule: "@request.auth.id != '' && owner = @request.auth.id",
~~~

بقت:

~~~sql
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY notes_select ON notes FOR SELECT TO reader USING (owner = current_setting('app.uid', true));
CREATE POLICY notes_insert ON notes FOR INSERT TO reader WITH CHECK (owner = current_setting('app.uid', true));
~~~

في المعمل استخدمنا دور [[reader]] و [[app.uid]] كبديل. في Supabase بتبقى [[TO authenticated]] و [[(select auth.uid())]]. الناتج:

~~~text الناتج
 owner |  body
-------+---------
 sara  | سر سارة
(1 row)

ERROR:  new row violates row-level security policy for table "notes"
~~~

لاحظ إن الرسالة هنا صريحة، و PocketBase بيقول [[Failed to create record.]] بس.

---

## ٣. hook لدالة

| سطر في المسار | المقابل في الدالة |
|---|---|
| [[$apis.requireAuth("users")]] | صلاحية التنفيذ: [[GRANT EXECUTE ... TO authenticated]] |
| [[e.auth.id]] | رقم اليوزر من الـ JWT: [[auth.uid()]] |
| العداد في transaction | [[nextval]] |
| [[tx.save(rec)]] | سطر [[INSERT]] جوه الدالة |
| [[catch]] مع [[must be unique]] | جزء [[EXCEPTION WHEN unique_violation]] في آخر الدالة |
| [[new BadRequestError(...)]] | كود مفهوم بـ [[RAISE EXCEPTION]] |
| [[e.json(200, { number })]] | قيمة الدالة بـ [[RETURN v_number]] |

والعداد: [[nextval]] مش بترجع مع الفشل، فالأرقام ممكن يبقى فيها فجوات. لو لازم من غير فجوات، استخدم صف عداد بـ [[UPDATE ... RETURNING]] جوه الدالة.

---

## ٤. اللي مبيتنقلش لوحده

- **كلمات السر:** الهاش مش مضمون يشتغل في النظام التاني. جرّب على حساب واحد، وإلا اطلب من الكل يعمل reset.
- **الـ IDs:** PocketBase نصوص من 15 حرف، و Supabase [[uuid]]. حدد هتحتفظ بيهم ولا تعمل خريطة.
- **الملفات:** لازم تترفع تاني، وتتحدث مساراتها.
- **الوقت:** PocketBase نص، و Postgres [[timestamptz]].
- **الـ frontend:** كل استدعاء API بيتغير.

---

## الخلاصة

- المفاهيم واحدة، والفرق في مكان التنفيذ.
- مسار hook يقابله [[SECURITY DEFINER]] بـ [[SET search_path]] و [[REVOKE]].
- انقل الجداول والمنطق الأول، والحسابات والملفات آخر حاجة، بعد تجربة.`,
          lines: [
            "جدول الاستعارات، الرقم فريد.",
            "نفس partial index بتاع PocketBase: طلب واحد مستني.",
            "تسلسل للأرقام يبدأ من 1001.",
            "دالة بتشتغل بصلاحية صاحبها، وبمسار بحث ثابت.",
            "عرّف متغير للرقم الجديد.",
            "من هنا بيبدأ جسم الدالة.",
            "خد الرقم اللي بعده من التسلسل.",
            "سجل الطلب باسم اليوزر الحالي.",
            "رجّع الرقم للي نادى الدالة.",
            "لو الفهرس رفض طلب مكرر:",
            "ارمي كود مفهوم للـ client.",
            "هنا بيخلص جسم الدالة.",
            "اقفل الدالة على الكل، لأنها مفتوحة افتراضيًا.",
            "اسمح بيها للدور ده بس."
          ],
          check: {
            lang: "sql",
            setup: R`CREATE TABLE hits (page text PRIMARY KEY, n int NOT NULL); INSERT INTO hits VALUES ('home', 1);`,
            starter: R`-- زوّد عداد home بأمر واحد، ولو الصفحة جديدة ابدأها بـ 1
SELECT page, n FROM hits;`,
            expect: [["home", 2]],
            solution: R`INSERT INTO hits VALUES ('home', 1) ON CONFLICT (page) DO UPDATE SET n = hits.n + 1; SELECT page, n FROM hits;`
          },
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** اكتب المقابل في Supabase لـ: [[listRule]] و [[null]] و [[@request.auth.id]] و [[cronAdd]] و [[onRecordCreate]].`, done: R`خمس مقابلات صح.`, sol: R`[[listRule]]: policy بـ [[FOR SELECT]]. و [[null]]: RLS مفعّل من غير policy. و [[@request.auth.id]]: [[auth.uid()]]. و [[cronAdd]]: [[pg_cron]]. و [[onRecordCreate]]: Trigger [[BEFORE INSERT]].` },
            { lvl: 'تطبيق', t: R`**ترجم:** القاعدة [[owner = @request.auth.id]] على القراية والإضافة لـ policies في Postgres، وجرّبها بدور عادي.`, done: R`صف واحد يظهر، والإضافة باسم غيرك ترجّع خطأ.`, sol: R`~~~sql
CREATE ROLE reader NOLOGIN;
CREATE TABLE notes (id serial PRIMARY KEY, owner text NOT NULL, body text NOT NULL);
INSERT INTO notes (owner, body) VALUES ('sara', 'سر سارة'), ('marwan', 'سر مروان');
GRANT SELECT, INSERT ON notes TO reader;
GRANT USAGE ON SEQUENCE notes_id_seq TO reader;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY notes_select ON notes FOR SELECT TO reader USING (owner = current_setting('app.uid', true));
CREATE POLICY notes_insert ON notes FOR INSERT TO reader WITH CHECK (owner = current_setting('app.uid', true));
SET ROLE reader;
SET app.uid = 'sara';
SELECT owner, body FROM notes;
INSERT INTO notes (owner, body) VALUES ('marwan', 'هكر');
~~~

[[USING]] للصفوف الموجودة، و [[WITH CHECK]] للصف الجديد. والـ [[GRANT]] لازم مع RLS: الاتنين طبقتين. و [[SET ROLE reader]] مهم، لأن صاحب الجدول بيعدّي RLS.

~~~text الناتج
 owner |  body
-------+---------
 sara  | سر سارة
(1 row)

ERROR:  new row violates row-level security policy for table "notes"
~~~` },
            { lvl: 'تحدي', t: R`**مسألة:** في المربع تحت، زوّد عداد الصفحة بأمر واحد من غير race، زي [[ON CONFLICT]] في درس pb_hooks. الأمر نفسه في SQLite و Postgres.`, done: R`الزرار يقول نجحت، والعداد [[2]].`, sol: R`~~~sql
INSERT INTO hits VALUES ('home', 1) ON CONFLICT (page) DO UPDATE SET n = hits.n + 1;
SELECT page, n FROM hits;
~~~

في Postgres لازم تكتب [[hits.n]] عشان تفرّق بين القيمة الحالية و [[excluded.n]]، وهي القيمة اللي كنت هتضيفها. في SQLite كتبناها [[n + 1]] واشتغلت، و [[hits.n]] بتشتغل في الاتنين.

~~~text الناتج
 page | n
------+---
 home | 2
~~~` },
            { lvl: 'تحدي', t: R`**صلّح:** الدالة دي فيها مشكلتين أمان: [[CREATE FUNCTION f() RETURNS int LANGUAGE sql SECURITY DEFINER AS 'SELECT count(*)::int FROM loans';]]`, done: R`تكتب المشكلتين والنسخة المصلحة.`, sol: R`~~~sql
CREATE FUNCTION f() RETURNS int LANGUAGE sql SECURITY DEFINER SET search_path = public AS 'SELECT count(*)::int FROM public.loans';
REVOKE ALL ON FUNCTION f() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION f() TO reader;
~~~

الأولى: من غير [[SET search_path]]، اليوزر يقدر يعمل جدول [[loans]] في schema بتاعه ويخلي الدالة تقراه بصلاحية صاحبها. التانية: من غير [[REVOKE]]، أي دور يقدر ينادي الدالة، لأن [[EXECUTE]] مسموح لـ [[PUBLIC]] افتراضيًا.

~~~text الناتج: دور reader ثم دور تاني
 f
---
 0
(1 row)

ERROR:  permission denied for function f
~~~` }
          ]
        },
        {
          cmd: "حالة: health ناجح والمسار 404",
          title: "السيرفر قايم وكل مساراتك مش موجودة",
          desc: R`الموقف: [[/api/health]] بيرجّع 200، بس أي مسار كتبته بيرجّع 404، وعلى جهازك كان شغال.

السبب كان إن الصورة اتبنت قبل كتابة الكود. [[COPY pb_hooks]] نسخ مجلد قديم، ونسخة التطوير كانت شغالة عشان عاملة [[-v]] فوقه. الدرس: health ناجح مش دليل إن تطبيقك شغال.`,
          example: R`curl -s -o /dev/null -w 'health %{http_code} %{content_type}\n' http://127.0.0.1:8791/api/health
curl -s -o /dev/null -w 'ping  %{http_code} %{content_type}\n' http://127.0.0.1:8791/api/shelf/ping
docker exec pbstale ls -a /pb/pb_hooks
docker build -t pblab-stale:1 .
docker rm -f pbstale
docker run -d --name pbstale -p 127.0.0.1:8791:8090 pblab-stale:1
curl -s http://127.0.0.1:8791/api/shelf/ping`,
          try: R`ابني صورة من فولدر [[pb_hooks]] فيه ملف فاضي، وبعدين ضيف ملف مسار، وشغّل الصورة القديمة. قارن بين [[docker run]] عادي، و [[docker run -v]] للفولدر، وبعد إعادة البناء.`,
          sol: R`~~~text الناتج
health 200 application/json
ping  404 application/json
.  ..  .keep.js
mounted ping 200
{"pong":true} rebuilt 200
~~~

بالـ volume المسار اشتغل وهو مش في الصورة أصلًا. عشان كده التجربة على جهازك مكانتش بتختبر الصورة.`,
          deep: {
            why: "سيناريو بيتكرر: كله تمام عندك، ويقع على السيرفر. فهم إن الصورة نسخة مجمّدة من وقت البناء بيوفر ساعات تدوير في المكان الغلط.",
            how: R`[[COPY]] بينسخ الملفات وقت [[docker build]]، والحاوية مش بتشوف أي تغيير بعدها. أما [[-v]] فبيركّب فولدر من جهازك فوق المكان ده وقت التشغيل، فبيخفي اللي في الصورة.

عشان كده فيه نسختين من الحقيقة: اللي على جهازك، واللي جوه الصورة. والسيرفر بيشوف التانية بس.

ونوع الـ 404 بيضيّق المشكلة. [[application/json]] معناها الطلب وصل PocketBase وملقاش المسار. لو [[text/html]] يبقى nginx هو اللي رد، والطلب موصلش.`,
            when: "أي 404 بعد نشر صورة جديدة. وأي مرة الكود شغال محليًا بـ volume ووقع في الصورة.",
            mistakes: R`اعتبار [[/api/health]] دليل. وإعادة تشغيل الحاوية بدل إعادة البناء: [[docker restart]] مش بيغيّر الصورة. واختبار نسخة بـ volume قبل النشر. والبناء من فولدر تاني أو branch قديم من غير ما تاخد بالك.`
          },
          teach: R`## العرَض

~~~text الناتج
health 200 application/json
ping  404 application/json
~~~

---

## ١. ضيّق: مين اللي رد؟

~~~bash
curl -s -o /dev/null -w 'ping  %{http_code} %{content_type}\n' http://127.0.0.1:8791/api/shelf/ping
~~~

[[%{content_type}]] هو المفتاح: [[application/json]] يعني رد PocketBase، مش nginx. فالطلب وصل والبرنامج مش عارف المسار.

---

## ٢. اسأل الحاوية نفسها

مش الفولدر اللي على جهازك:

~~~bash
docker exec pbstale ls -a /pb/pb_hooks
~~~

~~~text الناتج
.  ..  .keep.js
~~~

الملف مش موجود. السبب هنا.

---

## ٣. ليه كان شغال عندك؟

~~~bash
docker run -d --name pbstale -p 127.0.0.1:8791:8090 -v "$PWD/pb_hooks:/pb/pb_hooks" pblab-stale:1
~~~

~~~text الناتج
mounted ping 200
~~~

الـ [[-v]] بيخبي اللي في الصورة.

---

## ٤. الحل

~~~bash
docker build -t pblab-stale:1 .
docker rm -f pbstale
docker run -d --name pbstale -p 127.0.0.1:8791:8090 pblab-stale:1
~~~

~~~text الناتج
{"pong":true}
~~~

ومع compose: [[docker compose up -d --build]]، و [[--force-recreate]] لو الحاوية متغيرتش.

---

## ٥. بدايل رفضناها

| البديل | ليه لأ |
|---|---|
| [[docker restart]] | بيشغّل نفس الصورة |
| [[docker cp]] الملف للحاوية | بيضيع مع أي حاوية جديدة |
| [[-v]] على السيرفر | الكود ميبقاش في الصورة، ومفيش نسخة معروفة |

---

## ٦. يتمنع إزاي

- فحص بعد النشر لمسار **من بتاعك**، مش [[/api/health]] بس.
- CI يبني الصورة ويشغّلها من غير volume ويشغّل الاختبارات.
- لو عايز تتأكد من اللي جوه: [[docker exec app ls /pb/pb_hooks]].

---

## الخلاصة

| الملاحظة | المعنى |
|---|---|
| 404 و [[application/json]] | وصل التطبيق والمسار مش موجود |
| 404 و [[text/html]] | nginx رد، أو ملف ثابت |
| شغال بـ [[-v]] ومش شغال من غيره | الصورة قديمة |`,
          lines: [
            "اطبع كود وصنف رد مسار الصحة.",
            "نفس الفحص على مسارك: 404 و JSON يعني وصل PocketBase.",
            "شوف الملفات جوه الحاوية نفسها.",
            "ابني الصورة من جديد عشان تاخد الكود الحالي.",
            "امسح الحاوية القديمة.",
            "شغّل حاوية من الصورة الجديدة.",
            "اتأكد إن المسار اشتغل من غير volume."
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** عدّلت ملف [[pb_hooks]] وعملت [[docker restart app]] والحاوية من غير [[-v]]. التعديل هيظهر؟`, done: R`تشرح ليه لأ.`, sol: R`لأ. [[restart]] بيشغّل نفس الحاوية بنفس الملفات اللي اتنسخت وقت البناء. اللازم [[docker build]] وبعدين حاوية جديدة.` },
            { lvl: 'تطبيق', t: R`**ابني:** سكربت فحص بعد النشر: يقف بكود خطأ لو مسار من بتاعك مش 200.`, done: R`كود خروج 1 لو المسار 404.`, sol: R`~~~bash
code=$(curl -s -m 5 -o /dev/null -w '%{http_code}' http://127.0.0.1:8791/api/shelf/ping)
echo "ping $code"
[ "$code" = "200" ] || exit 1
~~~

[[$( )]] بيخزن ناتج الأمر. و [[||]] معناها نفذ اللي بعدها لو اللي قبلها فشل. فأي أداة نشر هتعتبر الخطوة فشلت. والغلطة الشائعة فحص [[/api/health]] بس.

~~~text الناتج مع الصورة القديمة
ping 404
~~~

وكود الخروج 1، ومع الصورة الجديدة [[ping 200]] وكود الخروج 0.` },
            { lvl: 'تحدي', t: R`**اشرحها:** زميلك بيقول «nginx هو السبب». إزاي تثبت أو تنفي ده بأمر واحد؟`, done: R`تكتب الأمر وتفسير الناتج.`, sol: R`~~~bash
curl -s -o /dev/null -w '%{http_code} %{content_type}\n' https://raff.example.com/api/shelf/ping
~~~

لو [[application/json]] فـ PocketBase رد، و nginx عدّى الطلب. لو [[text/html]]، يبقى nginx رجّع صفحته، ولازم تراجع قايمة المسارات. الأدق كمان: كلّم الحاوية مباشرة من جوه الشبكة، فلو اشتغل هناك يبقى العيب قبلها.` }
          ]
        },
        {
          cmd: "حالة: السيرفر بيقع مع أول تشغيل",
          title: "كود يقرا جدول قبل ما الجداول تتعمل",
          desc: R`الموقف: حاوية جديدة بقاعدة فاضية بتقع فورًا، ومع إعادة التشغيل بتقع تاني. وعلى جهازك، اللي قاعدته قديمة، مفيش مشكلة.

السبب إن [[onBootstrap]] بيشتغل قبل الـ migrations. فالكود بيقرا جدول لسه ماتعملش. الحل [[$app.onServe().bindFunc]]، وبيشتغل بعد الـ migrations.`,
          example: R`$app.onServe().bindFunc((e) => {
  const email = ($os.getenv("STAFF_EMAIL") || "").trim().toLowerCase();
  const password = $os.getenv("STAFF_PASSWORD") || "";
  if (email && password && e.app.countRecords("staff") === 0) {
    const staff = new Record(e.app.findCollectionByNameOrId("staff"));
    staff.set("email", email);
    staff.setPassword(password);
    staff.setVerified(true);
    e.app.save(staff);
  }
  return e.next();
});`,
          try: R`حط [[onBootstrap]] فيه [[e.app.countRecords("books")]] في [[pb_hooks]]، وشغّل حاوية بـ volume جديد. شوف [[docker logs]]، و [[docker inspect -f '{{.State.ExitCode}}']]، وبعدين [[docker restart]].`,
          sol: R`~~~text الناتج
context canceled; failed query: SELECT count(*) FROM $__bt@@__invalidCollectionModelOrIdentifier$__bt
running=false exit=1
~~~

وبعد الـ restart نفس السطر تاني، لأن الـ migrations عمرها ما اتنفذت، فمش هيتصلح لوحده. وده فخ: على جهازك قاعدتك فيها الجداول، فنفس الكود شغال.`,
          flag: "script",
          deep: {
            why: "اختبار على قاعدة موجودة بيخبي مشاكل أول تشغيل. والسيرفر الجديد، أو أي استرجاع، هو بالظبط أول تشغيل. فالمشكلة بتظهر في أسوأ وقت.",
            how: R`ترتيب التشغيل: [[onBootstrap]] (تحميل التطبيق)، بعدين الـ migrations جوه أمر [[serve]]، بعدين [[OnServe]] وفتح البورت.

وفي [[pb_hooks]] مفيش دالة عامة اسمها [[onServe]]. جربناها: الملف فشل، بس **السيرفر قام عادي**، والسطر الوحيد في اللوج:

[[ReferenceError: onServe is not defined at /pb.js:1:8(2)]]

ده فخ تاني: ملف hook فيه خطأ مش بيوقف السيرفر، فالمسارات اللي في الملف ده بتختفي من غير ما حاجة تقع. عشان كده استخدمنا [[$app.onServe().bindFunc]]، وده بيربط على الحدث من كائن التطبيق مباشرة، ولازم يرجّع [[e.next()]].`,
            when: "أي كود بيقرا جداول وقت التشغيل: أول حساب أدمن، أو seed، أو إعدادات من متغيرات البيئة.",
            mistakes: R`[[try/catch]] حوالين الكود عشان السيرفر يقوم: كده أول أدمن مش هيتعمل، ومحدش هيعرف. ونسيان [[return e.next()]]، فالسيرفر مبيكملش. واختبار على قاعدة موجودة بس. وكلمة السر في الكود بدل متغير بيئة.`
          },
          teach: R`## العرَض

حاوية جديدة وقعت، و [[docker logs]] فيها سطر واحد:

~~~text الناتج
context canceled; failed query: SELECT count(*) FROM $__bt@@__invalidCollectionModelOrIdentifier$__bt
~~~

الرسالة مش بتقول «الجدول مش موجود» صراحة. [[invalidCollectionModelOrIdentifier]] معناها إن [[countRecords]] ملقاش الجدول باسمه.

---

## ١. ضيّق

| الفحص | النتيجة | المعنى |
|---|---|---|
| [[docker inspect -f '{{.State.Running}} {{.State.ExitCode}}' pbcase]] | [[false 1]] | العملية خرجت بخطأ |
| [[docker restart]] | نفس السطر | مش عطل عابر |
| نفس الكود على قاعدة قديمة | شغال | الفرق في البيانات، مش الكود |

الفحص الأخير هو اللي بيوجّه: حاجة موجودة في القديمة ومش في الجديدة، يعني الجداول.

---

## ٢. السبب

~~~js
onBootstrap((e) => {
  e.next();
  if (e.app.countRecords("books") === 0) console.log("empty");
});
~~~

حتى بعد [[e.next()]]، الـ migrations لسه متنفذتش. وهي بتتنفذ بعد الخطوة دي، فالعملية بتموت قبلها، فكل تشغيل نفس الحكاية.

---

## ٣. أول محاولة حل فشلت

~~~js
onServe((e) => { e.next(); });
~~~

~~~text الناتج
failed to execute seed.pb.js:
 - ReferenceError: onServe is not defined at /pb.js:1:8(2)
Server started at http://0.0.0.0:8090
~~~

السيرفر قام! الملف بس هو اللي فشل. يعني لو مبصيتش في اللوج، المسارات هتختفي بهدوء. كل [[docker logs]] بعد تعديل hooks لازم تتقري.

---

## ٤. الحل

~~~js
$app.onServe().bindFunc((e) => {
  console.log("books:", e.app.countRecords("books"));
  return e.next();
});
~~~

~~~text الناتج
books: 1
Server started at http://0.0.0.0:8090
~~~

---

## ٥. المثال سطر سطر

- [[$os.getenv]] بيقرا متغير بيئة، فكلمة السر مش في الكود.
- [[countRecords("staff") === 0]] يخليه يتنفذ مرة واحدة، فلو غيّرت كلمة السر من اللوحة مش هترجع مع إعادة التشغيل.
- [[setVerified(true)]] لأن الإيميل ده انت عارفه.
- [[return e.next()]] يكمّل التشغيل.

---

## ٦. بدايل رفضناها

| البديل | ليه لأ |
|---|---|
| [[try/catch]] حوالين الكود | بيخبي إن الحساب ماتعملش |
| تشغيله من migration | الـ migration بتتنفذ مرة، فمتغيرات البيئة مبتتطبقش بعدين |
| إنشاء الأدمن يدوي بعد التشغيل | خطوة بتتنسي في كل سيرفر |

---

## ٧. يتمنع إزاي

جرّب من قاعدة فاضية قبل أي نشر:

~~~bash
docker run --rm -e STAFF_EMAIL=staff@example.com -e STAFF_PASSWORD=lab-password-123 --name pbfresh -p 127.0.0.1:8793:8090 pblab:0.40.4
~~~

من غير [[-v]] ده معناه قاعدة جديدة كل مرة. وبعد ما يقوم شغّل اختباراتك.

---

## الخلاصة

| الحدث | الوقت | ينفع يقرا جداول؟ |
|---|---|---|
| [[onBootstrap]] | قبل الـ migrations | لأ |
| migration | أثناء [[serve]] | أيوه، مرة واحدة |
| [[$app.onServe()]] | بعد الـ migrations | أيوه، كل تشغيل |`,
          lines: [
            "اربط على حدث التشغيل، وده بعد الـ migrations.",
            "اقرا الإيميل من متغير بيئة.",
            "واقرا كلمة السر كذلك.",
            "لو القيم موجودة ومفيش موظفين خالص:",
            "جهّز صف موظف جديد في جدول staff.",
            "حط الإيميل اللي جه من متغير البيئة.",
            "حط كلمة السر، وبتتخزن مشفرة.",
            "اعتبر الإيميل متأكد منه.",
            "احفظ الحساب الجديد في القاعدة.",
            "قفلة الشرط.",
            "كمّل تشغيل السيرفر، من غيرها مش هيفتح البورت.",
            "قفلة الدالة."
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** ملف hook فيه [[onServe((e) => { e.next(); })]]. السيرفر هيقوم؟ وباقي المسارات؟`, done: R`تكتب اللي هيحصل وتجرب.`, sol: R`السيرفر هيقوم، والملف ده بس هيفشل. مسارات الملف ده مش هتتسجل، وباقي الملفات شغالة.

~~~text الناتج
failed to execute seed.pb.js:
 - ReferenceError: onServe is not defined at /pb.js:1:8(2)
Server started at http://0.0.0.0:8090
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[onBootstrap((e) => { e.next(); if (e.app.countRecords("books") === 0) console.log("empty"); });]] بيوقع السيرفر على قاعدة جديدة. صلّحه.`, done: R`يطبع العدد ويقوم من قاعدة فاضية.`, sol: R`~~~js
$app.onServe().bindFunc((e) => {
  console.log("books:", e.app.countRecords("books"));
  return e.next();
});
~~~

الغلطة الشائعة [[try/catch]]، وده بيخلي السيرفر يقوم من غير ما يحل حاجة.

~~~text الناتج
books: 1
Server started at http://0.0.0.0:8090
~~~` },
            { lvl: 'تحدي', t: R`**ابني:** seed بيعمل أول موظف من متغيرات البيئة، ومايغيّرش حاجة لو فيه موظفين.`, done: R`الدخول ينجح من قاعدة فاضية، و restart مايعملش حساب تاني.`, sol: R`الحل هو مثال الدرس. شغّله:

~~~bash
docker run -d --name pbraff -p 127.0.0.1:8793:8090 -e STAFF_EMAIL=staff@example.com -e STAFF_PASSWORD=lab-password-123 pblab:0.40.4
~~~

[[countRecords === 0]] هو اللي بيخليها آمنة مع إعادة التشغيل، وكلمة السر برة الكود.

~~~text الناتج
ok   staff login
~~~` }
          ]
        },
        {
          cmd: "مشروع: بيع كتاب بإيصال",
          title: "«رفّ»: حسابات وإيصال دفع وموافقة وقراءة محمية",
          desc: R`مشروع كامل على PocketBase لمكتبة مخترعة اسمها «رفّ»: العميل يعمل حساب ويرفع إيصال تحويل، والموظف يراجعه، والكتاب يفتح لصاحبه صفحة صفحة، وكل واحد بيتحفظ وصل لحد فين.

الكود كله في مشروع «رفّ» في آخر الوحدة، و 31 فحص عدّوا من قاعدة فاضية. الدرس ده بيشرح القرارات وترتيب البناء.`,
          example: R`docker build -t raff:1 .
docker run -d --name pbraff -p 127.0.0.1:8793:8090 -e STAFF_EMAIL=staff@example.com -e STAFF_PASSWORD=lab-password-123 raff:1
curl -s -o /dev/null -w 'orders %{http_code}\n' http://127.0.0.1:8793/api/collections/orders/records
node test.mjs`,
          try: R`ابني المشروع من الوحدة، وشغّل [[test.mjs]]. وبعدين امسح [[$apis.requireAuth("staff")]] من مسار الموافقة وشوف أنهي فحص هيقع.`,
          sol: R`~~~text الناتج
orders 403
...
31 passed, 0 failed
~~~

ولما تمسح الـ middleware، [[e.auth]] مش بيتحقق، فالفحص [[customer cannot approve]] هيقع. ده اللي بيخلي الاختبار مهم: بيثبت إن المنع موجود، مش إن المسار شغال بس.`,
          deep: {
            why: "ده شكل حقيقي لمنتج رقمي صغير: فلوس بتتحول يدوي، وإنسان بيراجع، وملفات خاصة. وفيه أغلب اللي اتعلمته في مكان واحد، وكل قرار فيه ليه سبب.",
            how: R`كل الجداول [[null]]، وكل وصول من مسار بيتأكد بنفسه. ده أقل راحة من القواعد، بس هنا كل عملية فيها أكتر من خطوة، فالمسارات أوضح.

والسعر من جدول [[books]] وقت الطلب، فالمتصفح مايقدرش يغيّره: اختبرنا إرسال [[amount: 1]] والمبلغ فضل 150.

والموافقة في transaction واحدة: حالة الطلب وصف المكتبة مع بعض.

والصفحات صور محمية، مش PDF، فمفيش ملف واحد ينزل ويتنشر. وده ردع، مش منع: أي حد يقدر يصور الشاشة.`,
            when: "منتج رقمي بدفع يدوي، أو أي عملية فيها موافقة بشرية. ولو الدفع بكارت، webhook من شركة الدفع بيحل محل الموظف.",
            mistakes: R`إن الموظف يوافق مرتين فيتكرر صف المكتبة: [[already_reviewed]] والفهرس الفريد بيمنعوا ده. واستخدام قاعدة مفتوحة على [[orders]] عشان الموظف يقراها. ونسيان [[Vary: Authorization]] على الصفحات. والاعتماد على الإيميل لتوصيل الكتاب: لازم الحالة تبقى ظاهرة في الحساب، لو الإيميل وقع.`
          },
          teach: R`## الصورة الكبيرة

التطبيق بيبيع كتاب رقمي. المشتري بيحوّل فلوس بإيده ويرفع إيصال، والموظف بيأكد.

~~~text رحلة الطلب
العميل: حساب  ←  إيصال  ←  pending
الموظف:                     approved  ←  صف في library
                            rejected  ←  سبب، والعميل يبعت تاني
العميل: صفحات الكتاب  ←  يتحفظ وصل لحد فين
~~~

---

## ليه الأدوات دي؟

| الأداة | البديل | ليه هنا | إمتى تختار البديل |
|---|---|---|---|
| PocketBase | Supabase | سيرفر واحد، وتكلفة ثابتة، والملفات عندك | لو محتاج Postgres أو مش عايز تدير باك أب |
| صور صفحات | PDF للتحميل | مفيش ملف واحد يتنشر | لو الوعد للعميل إنه ينزّل PDF |
| مسارات مع [[null]] | API rules | كل عملية فيها أكتر من خطوة | CRUD بسيط |
| جدول [[staff]] | حقل [[role]] | فصل واضح بين الحسابات | تطبيق كل يوزر فيه ليه دور |
| partial index | فحص في الكود بس | بيمنع السباق بين طلبين | مفيش بديل كويس |

---

## الهيكل

~~~text الملفات
raff/
  Dockerfile
  pb_migrations/1700000000_raff.js   كل الجداول والإعدادات
  pb_hooks/raff.pb.js                أول موظف وكل المسارات
  test.mjs                           31 فحص
~~~

---

## ١. الجداول

[[users]] و [[staff]] حسابات، و [[books]] و [[book_pages]] المنتج، و [[orders]] الطلبات، و [[library]] مين يملك إيه، و [[progress]] وصل لحد فين، و [[counters]] للترقيم.

~~~js
const closed = { listRule: null, viewRule: null, createRule: null, updateRule: null, deleteRule: null };
Object.assign(users, closed);
~~~

جدول [[users]] الجاهز بييجي مفتوح للتسجيل، فبنقفله ونسجل من مسار.

غلطة حصلت: [[orders]] مكانش فيه [[created]]، فمسار القايمة رجّع 400 عام. الحل [[autodate]].

---

## ٢. إرسال الإيصال

~~~js
rec.set("amount", book.getFloat("price_egp"));
rec.set("status", "pending");
rec.set("receipt", files[0]);
~~~

الفحوصات: [[receipt_required]] لو مفيش ملف، و [[invalid_receipt]] لو نص متخفي في صورة، و [[order_pending]] لو فيه طلب مستني.

---

## ٣. مراجعة الموظف

~~~js
e.app.runInTransaction((tx) => {
  const order = tx.findRecordById("orders", id);
  if (order.getString("status") !== "pending") throw new BadRequestError("already_reviewed");
  order.set("status", "approved");
  tx.save(order);
  const row = new Record(tx.findCollectionByNameOrId("library"));
  row.set("user", order.getString("user"));
  row.set("book", order.getString("book"));
  tx.save(row);
});
~~~

---

## ٤. القراءة

المسار بيتأكد من [[library]] مع كل صفحة، و [[Cache-Control: private]]، و [[Vary: Authorization]].

---

## ٥. الاختبارات

~~~text الناتج
ok   staff login
ok   closed orders
ok   closed users
ok   closed book_pages
ok   closed library
ok   closed progress
ok   closed staff
ok   upload page 1
ok   upload page 2
ok   register
ok   duplicate email
ok   page locked before payment
ok   receipt required
ok   fake image refused
ok   order created
ok   no second pending
ok   customer cannot list
ok   server price
ok   staff reads receipt
ok   customer cannot read receipt
ok   reason required
ok   rejected
ok   resend after reject
ok   customer cannot approve
ok   approved
ok   no double approve
ok   page opens after approve
ok   progress
ok   going back keeps max
ok   page clamped
ok   other customer locked

31 passed, 0 failed
~~~

نص الفحوصات دي بتثبت **المنع**: مش مسموح، مش موجود، مش تاني. دي اللي بتحمي الفلوس.

---

## ٦. الأمان

- كل الجداول مقفولة، و nginx قدامها (درس «PocketBase في الإنتاج»).
- السعر من السيرفر، والإيصال يتفحص من محتواه.
- الملفات محمية، ومفيش لها لينك عام.
- إرسال الطلبات ليه حد 6 في الدقيقة.

---

## ٧. النشر والتكلفة

حاوية واحدة ورا nginx، و volume لـ [[pb_data]]، ونسخة احتياطية برة السيرفر، لأن فيها الإيصالات. التكلفة الثابتة هي السيرفر، والإيميل لو عدّى الحد المجاني بتاع الخدمة. الخطوات في درس الإنتاج، ومجرّبة محليًا ورا nginx، مش برابط حقيقي، لأن ده مشروع مخترع.

---

## ٨. بعد ما يخلص

- **لو كبر:** [[pb_data]] على سيرفر أكبر، والملفات على S3. ولو محتاج كذا سيرفر، الانتقال لـ Postgres.
- **خليه بتاعك:** غيّر المنتج لكورس، أو لقالب للتحميل، وضيف كوبون خصم.`,
          lines: [
            "ابني الصورة، و COPY بيحط الكود جواها.",
            "شغّل حاوية، وأول موظف من متغيرات البيئة.",
            "اتأكد إن جدول الطلبات مقفول من بره.",
            "شغّل الفحوصات كلها."
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** عميل بعت [[amount: 1]] مع الطلب. المبلغ في القاعدة هيبقى كام؟`, done: R`150، وتشرح ليه.`, sol: R`150. المسار مش بيقرا [[amount]] من الطلب خالص، بياخد [[price_egp]] من صف الكتاب.

~~~text الناتج
ok   server price
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** مسار يخلي العميل يلغي طلبه لو لسه [[pending]]، ومايقدرش يلغي طلب غيره.`, done: R`الإلغاء ينجح لصاحبه، وطلب غيره يرجّع 404.`, sol: R`~~~js
routerAdd("POST", "/api/raff/orders/{id}/cancel", (e) => {
  const order = e.app.findRecordById("orders", e.request.pathValue("id"));
  if (order.getString("user") !== e.auth.id) throw new NotFoundError("order_not_found");
  if (order.getString("status") !== "pending") throw new BadRequestError("already_reviewed");
  e.app.delete(order);
  return e.json(200, { ok: true });
}, $apis.requireAuth("users"));
~~~

404 مش 403 عشان ماتقولش إن الطلب موجود. والمسح بيفضّي الـ partial index، فالعميل يقدر يطلب تاني. لو عايز سجل، زوّد حالة [[cancelled]] بدل المسح.

~~~text الناتج
other cancels    404 Order_not_found.
owner cancels    200 {"ok":true}
order again      200 {"number":1002,"status":"pending"}
cancel approved  400 Already_reviewed.
~~~` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** أضف فحص إن العميل مايقدرش يقرا إيصال عميل تاني، وفحص إن صف [[library]] مش بيتكرر لو الموظف وافق مرتين.`, done: R`الفحصين يعدّوا.`, sol: R`~~~js
r = await j($__bt/api/raff/staff/orders/$__{id}/receipt$__bt, { token: U });
ok(r.s === 403, "customer cannot read receipt", r.s);

r = await j($__bt/api/raff/staff/orders/$__{id2}/approve$__bt, { method: "POST", token: STAFF });
ok(code(r) === "already_reviewed", "no double approve", r.d);
~~~

الفحص التاني بيمر على [[already_reviewed]] قبل ما يوصل للفهرس الفريد على [[library]]، فعندك طبقتين.

~~~text الناتج
ok   customer cannot read receipt
ok   no double approve
~~~` }
          ]
        }
      ]
    }
]);
