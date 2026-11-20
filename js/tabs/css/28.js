// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "الأداء",
      pre: [
        { to: "css/img", why: R`width و height والصور اللي بتعمل CLS` },
        { to: "css/<!doctype html>", why: R`الـ head اللي بيحمّل الـ CSS والخطوط` },
      ],
      l: 3,
      n: "الصفحة تظهر بسرعة ومتتنطش، والـ JavaScript ميجبرش المتصفح يعيد الحساب على الفاضي",
      projects: [
        { lvl: 'صغير', dir: "article-cls", t: R`صفحة مقال CLS بتاعها صفر`, what: R`صفحة مقال فيها صورة هيرو، و ٣ صور جوه الكلام، وفيديو مضمّن، ومكان إعلان، وخط من موقعك. احجز مكان كل حاجة ([[width]] و [[height]] و [[aspect-ratio]] و [[min-height]] وخط احتياطي مظبوط). من درس CLS.`, done: R`snippet الـ [[PerformanceObserver]] على [[layout-shift]] بيطبع صفر entries (أو مجموع أقل من 0.01) على Slow 4G و Disable cache، و Lighthouse بيقول CLS أقل من 0.05.`, sol: R`**المعمل:** كل مشاريع الوحدة دي في فولدر واحد، وفيه ٣ ملفات مشتركة: سيرفر صغير، وأداة القياس، و Lighthouse. اتعملوا مرة هنا، والمشاريع اللي بعد كده بتستخدمهم.

~~~bash الترمنال
mkdir perf-lab && cd perf-lab
npm init -y && npm pkg set type=module
npm i -D playwright-core@1.64.1 @axe-core/playwright@4.14.0 lighthouse@13.6.0 @fontsource/cairo@5.3.0
node serve.mjs . 8817
~~~

~~~js serve.mjs
// node serve.mjs [dir] [port]: a static server with no packages, for Playwright's webServer
import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(process.argv[2] || "site");
const port = Number(process.argv[3] || 4173);
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".json": "application/json" };

http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://x");
  let file = path.join(root, decodeURIComponent(url.pathname));
  if (!file.startsWith(root)) { res.writeHead(403).end(); return; }      // no ../ out of the folder
  if (file.endsWith(path.sep)) file = path.join(file, "index.html");
  try {
    const body = await fs.readFile(file);
    res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" }).end(body);
  } catch {
    res.writeHead(404).end("not found");
  }
}).listen(port, () => console.log("http://localhost:" + port));
~~~

~~~js lab.mjs
// shared measuring helpers for the performance unit
import { chromium } from "playwright-core";

// like DevTools › Network › "Slow 4G" (Chrome's preset values) + CPU 4x slower, cache off
export const SLOW_4G = { offline: false, latency: 562.5, downloadThroughput: (1.4 * 1024 * 1024) / 8 * 0.9, uploadThroughput: (675 * 1024) / 8 * 0.9 };

export async function browser() {
  // --no-proxy-server: Chrome on Windows looks for a proxy first (~850ms on every new browser, measured)
  return chromium.launch({ channel: "chrome", args: ["--no-proxy-server"] });
}

export async function throttled(b, { viewport = { width: 412, height: 823 }, cpu = 4, net = SLOW_4G, ...o } = {}) {
  const ctx = await b.newContext({ viewport, deviceScaleFactor: 1, ...o });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
  if (net) await cdp.send("Network.emulateNetworkConditions", net);
  if (cpu > 1) await cdp.send("Emulation.setCPUThrottlingRate", { rate: cpu });
  return { ctx, page, cdp };
}

// records every layout shift (and what moved) from the very start of the page
export async function recordShifts(page) {
  await page.addInitScript(() => {
    window.__shifts = [];
    new PerformanceObserver(list => {
      for (const e of list.getEntries()) {
        if (e.hadRecentInput) continue;
        window.__shifts.push({
          at: Math.round(e.startTime), value: Number(e.value.toFixed(4)),
          moved: e.sources.map(s => (s.node ? s.node.nodeName.toLowerCase() + (s.node.className ? "." + String(s.node.className).split(" ")[0] : "") : "?")).join(",")
        });
      }
    }).observe({ type: "layout-shift", buffered: true });
  });
}

// scrolls to the bottom in small steps, like a reader, so lazy things load and late things arrive
export async function readThrough(page, ms = 4000) {
  const steps = 20;
  for (let i = 0; i < steps; i++) { await page.mouse.wheel(0, 300); await page.waitForTimeout(ms / steps); }
}
~~~

~~~js lh.mjs
// node lh.mjs <url> [label]: Lighthouse 13.6.0, Mobile (its default: simulated Slow 4G + CPU 4x), prints the numbers that matter
import { execFileSync } from "node:child_process";
import fs from "node:fs";

const [url, label = url] = process.argv.slice(2);
const out = "lh-" + label.replace(/\W+/g, "_") + ".json";
execFileSync(process.execPath, ["node_modules/lighthouse/cli/index.js", url, "--only-categories=performance", "--output=json", "--output-path=" + out, "--quiet",
  "--chrome-flags=--headless=new --no-proxy-server"], { env: { ...process.env, CHROME_PATH: "C:/Program Files/Google/Chrome/Application/chrome.exe" }, stdio: "inherit" });
const r = JSON.parse(fs.readFileSync(out, "utf8")), a = r.audits;
const lcpEl = (JSON.stringify(a["lcp-breakdown-insight"]?.details || "").match(/"snippet":"([^"]{0,60})/) || [])[1];
console.log(label + " | Performance " + Math.round(r.categories.performance.score * 100) +
  " | FCP " + a["first-contentful-paint"].displayValue + " | LCP " + a["largest-contentful-paint"].displayValue +
  " | TBT " + a["total-blocking-time"].displayValue + " | CLS " + a["cumulative-layout-shift"].displayValue + " | LCP element: " + lcpEl);
~~~

الصور اتعملت بـ [[gen-images.mjs]]: بيرسم منظر (سما وتلال وشمس ونقط زي الصور الحقيقية) في canvas جوه Chrome، ويحفظه WebP بـ [[canvas.toDataURL("image/webp", 0.8)]]. فمحتاجتش أي برنامج صور.

~~~js gen-images.mjs
// node gen-images.mjs <out-dir> <name> <w1,w2,...> <ratio> <seed> [quality | png]
// draws a photo-like scene (sky, hills, sun, noise) in Chrome's canvas and saves it as WebP at each width
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";

const [out, name, widths, ratio = "1.777", seed = "1", q = "0.8"] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch({ channel: "chrome", args: ["--no-proxy-server"] });
const p = await b.newPage();
for (const w of widths.split(",").map(Number)) {
  const h = Math.round(w / Number(ratio));
  const data = await p.evaluate(({ w, h, seed, q }) => {
    let s = Number(seed) * 9301;
    const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
    const c = Object.assign(document.createElement("canvas"), { width: w, height: h });
    const x = c.getContext("2d");
    const hue = (Number(seed) * 47) % 360;
    const sky = x.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, $__bthsl($__{hue} 70% 75%)$__bt); sky.addColorStop(1, $__bthsl($__{(hue + 40) % 360} 80% 88%)$__bt);
    x.fillStyle = sky; x.fillRect(0, 0, w, h);
    x.fillStyle = $__bthsl($__{(hue + 30) % 360} 90% 70%)$__bt; x.beginPath(); x.arc(w * 0.75, h * 0.3, h * 0.12, 0, 7); x.fill();
    for (let layer = 0; layer < 4; layer++) {
      x.fillStyle = $__bthsl($__{(hue + 120 + layer * 15) % 360} 35% $__{55 - layer * 10}%)$__bt;
      x.beginPath(); x.moveTo(0, h);
      for (let i = 0; i <= 12; i++) x.lineTo((w * i) / 12, h * (0.45 + layer * 0.12) + rnd() * h * 0.12);
      x.lineTo(w, h); x.fill();
    }
    const img = x.getImageData(0, 0, w, h);                     // grain, so the file has photo-like weight
    for (let i = 0; i < img.data.length; i += 4) { const n = (rnd() - 0.5) * 18; img.data[i] += n; img.data[i + 1] += n; img.data[i + 2] += n; }
    x.putImageData(img, 0, 0);
    return q === "png" ? c.toDataURL("image/png") : c.toDataURL("image/webp", Number(q));
  }, { w, h, seed, q });
  const file = path.join(out, $__bt$__{name}-$__{w}.$__{q === "png" ? "png" : "webp"}$__bt);
  fs.writeFileSync(file, Buffer.from(data.split(",")[1], "base64"));
  console.log(file, w + "x" + h, Math.round(fs.statSync(file).size / 1024) + "KB");
}
await b.close();
~~~

**المقال:**

~~~html article-cls/index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>رحلة حبة البن: من الشجرة للفنجان</title>
<link rel="preload" href="fonts/cairo-arabic-700-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="style.css">
<script src="late.js" defer></script>
</head>
<body>
<main class="article">
  <h1>رحلة حبة البن: من الشجرة للفنجان</h1>
  <p class="meta">مقال متخيل للتجربة · ٦ دقايق قراية</p>
  <img class="hero" src="img/hero-1200.webp" alt="تلال خضرا تحت شمس الصبح" width="1200" height="675">

  <p>البن بيبدأ ثمرة حمرا على شجرة في الجبل. المزارع بيقطفها بإيده لما تستوي، وجوه كل ثمرة حبتين.</p>
  <figure><img src="img/a-800.webp" alt="ثمر البن على الشجرة" width="800" height="533" loading="lazy"><figcaption>الثمرة لما بتستوي.</figcaption></figure>
  <p>بعد القطف الثمر بيتغسل أو بيتنشف في الشمس. الطريقتين بيدّوا طعم مختلف: المغسول أنضف، والمتنشف أحلى.</p>

  <aside class="ad" aria-label="إعلان"></aside>

  <p>الحبوب الخضرا بتسافر في شكاير خيش، وممكن تستنى شهور من غير ما تبوظ، لحد ما توصل للمحمصة.</p>
  <figure><img src="img/b-800.webp" alt="شكاير بن خضرا في مخزن" width="800" height="600" loading="lazy"><figcaption>البن الأخضر بيستحمل السفر.</figcaption></figure>

  <div class="video"><!-- the player comes later from late.js; its box is already here --></div>

  <p>في المحمصة كل دقيقة بتفرق. ١٠ دقايق بتطلّع تحميص فاتح، و ١٤ بتطلّع غامق ومر.</p>
  <figure><img src="img/c-800.webp" alt="بن محمص في صينية التبريد" width="800" height="800" loading="lazy"><figcaption>بعد التحميص على طول.</figcaption></figure>
  <p>وآخر خطوة الطحن، وده أحسن يحصل قبل ما تعمل الفنجان على طول.</p>
</main>
</body>
</html>
~~~

~~~css article-cls/style.css
/* the real font, shown as soon as it arrives */
@font-face { font-family: "Cairo"; src: url("fonts/cairo-arabic-400-normal.woff2") format("woff2"); font-weight: 400; font-display: swap; }
@font-face { font-family: "Cairo"; src: url("fonts/cairo-arabic-700-normal.woff2") format("woff2"); font-weight: 700; font-display: swap; }

/* the fallback, scaled so a line of Arabic takes the same width as in Cairo (measured: 97.6% and 96.8%).
   Each one is a separate family: if a machine doesn't have Segoe UI, the browser moves on to Tahoma */
@font-face { font-family: "Cairo fallback"; src: local("Segoe UI"); size-adjust: 97.6%; }
@font-face { font-family: "Cairo fallback 2"; src: local("Tahoma"); size-adjust: 96.8%; }

*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: "Cairo", "Cairo fallback", "Cairo fallback 2", sans-serif; line-height: 1.8; color: #1f2937; background: #fff; }
.article { max-width: 42rem; margin: 0 auto; padding: 1.5rem 1rem 3rem; }
h1 { margin: 0; font-size: clamp(1.7rem, 1.2rem + 2.5vw, 2.6rem); line-height: 1.3; }
.meta { margin: 0.25rem 0 1rem; color: #4b5563; }

/* images: width/height in the HTML give the ratio; this keeps it while the width follows the column */
img { display: block; max-width: 100%; height: auto; border-radius: 0.75rem; }
figure { margin: 1.5rem 0; }
figcaption { margin-block-start: 0.4rem; color: #4b5563; font-size: 0.9rem; }

/* the ad slot: its size is booked before the ad exists */
.ad { min-height: 250px; margin: 1.5rem 0; display: grid; place-items: center; border-radius: 0.75rem; background: #f3f4f6; }
.ad:empty::before { content: "إعلان"; color: #6b7280; font-size: 0.8rem; }

/* the video: a 16:9 box, the iframe fills it when it comes */
.video { aspect-ratio: 16 / 9; margin: 1.5rem 0; border-radius: 0.75rem; background: #111827; overflow: hidden; }
.video iframe { display: block; width: 100%; height: 100%; border: 0; }
~~~

~~~js article-cls/late.js
// things that arrive late on real sites: an ad after 1s, a video player after 1.5s
setTimeout(() => {
  const ad = document.querySelector(".ad");
  ad.innerHTML = '<a href="#" style="display:grid;place-items:center;width:300px;height:250px;background:#fde68a;color:#78350f;font-weight:700;text-decoration:none;border-radius:8px">محمصة حبّاية: خصم ٢٠٪</a>';
}, 1000);

setTimeout(() => {
  const box = document.querySelector(".video");
  box.innerHTML = '<iframe src="player.html" title="فيديو: التحميص في ٣ دقايق" loading="lazy"></iframe>';
}, 1500);
~~~

[[player.html]] صفحة سودا فيها «▶ التحميص في ٣ دقايق» (بدل مشغّل فيديو من موقع تاني). و [[before.html]] هو نفس المقال **من غير** [[width]] و [[height]] على الصور، ومن غير الـ preload، وبـ [[before.css]] ده:

~~~css article-cls/before.css
@font-face { font-family: "Cairo"; src: url("fonts/cairo-arabic-400-normal.woff2") format("woff2"); font-weight: 400; font-display: swap; }
@font-face { font-family: "Cairo"; src: url("fonts/cairo-arabic-700-normal.woff2") format("woff2"); font-weight: 700; font-display: swap; }

*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: "Cairo", sans-serif; line-height: 1.8; color: #1f2937; background: #fff; }
.article { max-width: 42rem; margin: 0 auto; padding: 1.5rem 1rem 3rem; }
h1 { margin: 0; font-size: clamp(1.7rem, 1.2rem + 2.5vw, 2.6rem); line-height: 1.3; }
.meta { margin: 0.25rem 0 1rem; color: #4b5563; }

img { display: block; max-width: 100%; height: auto; border-radius: 0.75rem; }
figure { margin: 1.5rem 0; }
figcaption { margin-block-start: 0.4rem; color: #4b5563; font-size: 0.9rem; }

.ad { margin: 1.5rem 0; }
.video { margin: 1.5rem 0; }
.video iframe { display: block; width: 100%; aspect-ratio: 16 / 9; border: 0; border-radius: 0.75rem; }
~~~

~~~js article-cls/measure.mjs
// node article-cls/measure.mjs: CLS of before.html and index.html on Slow 4G, cache off, CPU 4x
import { browser, throttled, recordShifts, readThrough } from "../lab.mjs";
const b = await browser();
for (const file of ["before.html", "index.html"]) {
  const { ctx, page } = await throttled(b);
  await recordShifts(page);
  await page.goto("http://127.0.0.1:8817/article-cls/" + file, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(2500);                 // the ad (1s) and the player (1.5s) arrive
  await readThrough(page);
  const shifts = await page.evaluate(() => window.__shifts);
  const total = shifts.reduce((s, e) => s + e.value, 0);
  console.log("== " + file + ": " + shifts.length + " shifts، المجموع " + total.toFixed(4));
  for (const s of shifts) console.log("   " + s.at + "ms  " + s.value + "  ← " + s.moved);
  await ctx.close();
}
await b.close();
~~~

~~~view 760 900 المقال (الصور في المعاينة نسخة صغيرة)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>رحلة حبة البن: من الشجرة للفنجان</title>
<style>
/* the real font, shown as soon as it arrives */
@font-face { font-family: "Cairo"; src: url("data:font/woff2;base64,d09GMgABAAAAADPsABAAAAAAoNwAADOIAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGoQSG6JeHJFGBmA/U1RBVEQAiiIRCAqBvWyBoRgLhhQAATYCJAOMJAQgBYQ8B6VgDAcbXI4X8OYZq9KbVU0oMP6IFezYK7idEFToDKMop2T3s///z0g6xnCgDoDUWz1QMzON7uGWaUlDXY5gzAWfaas2IpIhDVSJED+Zto+MIXOCIpxxjqgc7sIhpmC/ktRY1olqiaVwvJuyQOTecz4XHsXEq2yHKSaocC/xrGW38MfwvpcsNgSovWCrg8ZeB/yn/I23Gz5sjfWJWYgW1zgQ56etDvcSu0epR2jsk1we4vO+/lTdJAMiPV/yCsKO0spawXqd4fm5/Z9z7t2YlwkDJiJOmDi2EdLliIe8sQejUuhRY9BS/bGIMmpiFqFY2IjfmU2ZYCODf779/rePzNz30aSSOotMMm+ESkiJkkVneP7/7/nfXGu/c98INNAo4YSi5CehpZZAgHV2AAyuNQi5kF5P1N/EtlChFIbnt9lbijmRaPEjESX0f0h8idZeFFbOdeouw6UX1Yvr1umiuRy4TVTT3VmzlSUQqV8NYGl77HCd8jRH/P97obpK/xs8Hrb4d8u3sFzaHULgEL+aW0LOqajAb/JXVYUeEbr5l3YzjUAZxcC2Te9Gm4ywUB27svZ0pPT7w2BwXqqrh9sfld7ANPAyArq5dO+AlggNnv9/rl6bu58yv8CsaqcMmo1J3ptM8pKhzOyHTD7RQk9nt0R5SSbzMpNkpwDAsuwYHYIDlCsra2tcnakUVa5CfqMLT/9rr5Ef5hZ3VMHpPRWKnGn25b2PEx4ZUgWghUIAXYmEqdCVVarw/99+r3b2u6H5wfOjACXq2Bfh4wTB/BeiUZFJgRQAKF2hu6rZPV0gVcnLo26FqTKysrL/5zRrZ/jLewOM/GC/I7sOspxyUbkt4X/QahhpA2gTOCLnXKV0qb2uTrEprr7yeHg8GrdXNw15as2aNeoSyo7T6mPKmeb3TpVavctUuhZ0FsERLitgJTC92D/D6p6oL4D3Re7yvaLAY746npzJzDzTCuEqqvH94zux8vfJvY69gileEYRQXdUVxvVPhxCG+cc9dKpNmyVQNWokyKohfv3n3tUCinSA4UA8yBhxgl+AYAIvuYANvXJXiInIwC1gTAQeEdEDApg5jYpclcyGGiLU50At/L8ABHcxbED0SY9VMZAB8VkuGxJgaKgoYPkDzIfAOAWEW9Mh9IWj0S1zWZI1etHTn88HRBFOBaRGDbRAIWi1C2AUQ4YM/e2i8Fc4WCQpCSxSVA0GQoD1AENBsk6LYXAEEl8olsrkCqVGqzeYzBarzeHt4+sXJCYWTySLJGod6CwEAgbzUQFb57GPEFh8F8fEAtZHjCQd0OEAnVwACaPBsOQXR+z3WZwOTJZZ/V+UnUDnZ2pa0KwUjjRu2gMEQO8/RB6J8isnChJIihIyGogAwRBKCPQO1WIyI644b8AJh+yxwyYd1mtSo0whiXRJYoULJOCNx4kNSNxIoJY+AIrtUaDcWQSUMyFAuX240B6zxl5JnH2jGks7RW7oqt7K6z4qGytjuZqnNmZPic49sbtT69u8VTKN8H2jzMGK9lN9VH+yGBh+88DlnM3xHMm+7M4ObMJ66R1YiWXoYzbjGcngUlVWh/Vn97cf9utt+n7rTM3EgSZ16ogc3TSP68GFHQtGuHQwqIPydnhJ1i7flIKV2DmtxvtMJXevsjZwy/6+wNJGuS8OO/edEzma/dmZzViLJZh+Y0M3M6SvPVDAYX5QoSGzcE/+TfFJWAnEA6uXxx4ECeCfd6QX29dN3TTYbW5V0xtZYb1rUf3SM5eZTORRRjOUQ5GmJzUvZBJNYLkLVrBhOKpHs3xljGF3YtK26C3QRhPFiInFDy93E066m/43NjLLdOOB/QYZh4QAqDIQftRsNBCX3YU57+CE+Ly4UWXFhD6YZ8oD58Cvs2jRCG7AMNnSpbS1niiR8vmlMkyKivJStZOUlH8D0eqVQ3xUgdB75ig7JCBEHjtyj0xgqQ+bd/vScMw2/FibetfOorNl19BZbNrKOCs+VwQQAxwOK9Yvru9JhNf56Ght+bhfDP0TOwlJJC0N4kZpE9P96nY5EHn2djDXPmEczQfzHHv6GZuH7Rx8+h2jqD2NeX7Kekrk0Xmxi5OH5xBe9B1q6PhUfoOe5umQP++mnY74HYsPahE9Eqfoh4h9KqRzgOAn34Hj6orTAcaer3NOV9GHSMEX+QOihRKCOWq6n0XrYZvBwZrojwWyQ2mIRt+Uavf4ScfrhtiIigbqrKoZ1E0PgeLvkFA4OpJZ5SiH7K0/1zTUqzsPyO+WnBHtw6tp3O30eE1hkMae5H1KP7sp7z59tLfFx73xTrHE0SL6ZDbRW9qf5B/swu5dojM/zqR5UiDAOLpY1m11qGzgqrzKghhQNHsTvLzNg5096oM7e1hDY+vRHPTlUhZ3V6RTZ0un8HvpbxzydsW9ydDOi7OM2deVPpp93eu1trrR4alXW+o3xIRt4o4P8IFP89i0h4l6Hy9ck4i9uxhAWqKkFsqGKLcpsmxa1ISllSy2qdngK3E4up0F00MkYK1cP+1HDYk00eWX4eAK2amULeOo9bJ9fpbYSMZ+x2U23/0l5xFa9YZQDHtJBj7N5owMumH53Ns+dqR5IV8o8aEqievQp0m3kQ8PsJPa2R5SEPjOHdyarH2UCkK50kW1Ik6qXHoFUwb4nr11QNfk/k7Dg2rgUZ+0SZDxd5o0F5MJ0s+Z8XXi7hS+Gy/w0ZAlWowgxV5Bgj2PBDPAwgmLOVRPZPZAwB3jBW4aMuwYL3D9kGHTqMGyUfgSl5LTJTYdJgmCiYWA4SPQFbjeyBtOro1r5hoiezBRc9CNEgSkkOgGIdCks/0O/DyYZgICvukzfND/mxsQzDCE3x5qX4/1QHu7rT1t61pkg6ySJU1+xUBREzC6YgxtAgorRn4T0KturgNaNQFNxgvULwu1qtGHVJXUmowDzGD/ZgY/Zgxf5Qneyyhey0U8M2SDU+Rz5fKPOZJ9kWZLutKS5tTRyRUpTm4ykyLjZKQMPu8XnweySg/pkud2qseOOrHYZBSuoxOPR2HMRD1cpA1ZbpnTagLDqYPmXvzpr0BFK128zIR1aWsjbw0WZf82G8Z6Oi0T6n5v4+j/WVRrnyRgG7RYw1vbIpVgwCoKXLdFgWuilnFudIzpYE2oW25rKuuolCsZnjRtZd16hQuZNljNpflgyaoUYAHLOkaPNvRN7bpOrJQbqrDWwbrmruJF2Te2ZaVq1Mrw6KNKbrH2Uvh4vLZ6MNrbwig+0Bu97yP7F3bUGuZ5RRn+vdpc2ji0qhI3YxrnNPlpJMThv6UctKimIKetN4ELOIGR8RZSHD4ncImYKxOcgAtGtrDCNi+20AqFtjlBczjs13Gx9evE4xX8K/+tT6SROKg8kYpvfgLrXT5QJy2ONtFE/L1WJN/ekaC7+FgR6A7/5K026L5DidAS9O9jO8WxrVamLh3thgk0eT5TnMYg+g7mextX1y23dpUIw8rhyMuVwi8/gRalDzNq54+zr7qDcH4GKxXKKmgEPowsfmENAJRA+cEcukBsMZ00o2YdnFgBMxaBzUw0d8YCYrhCuXsCaBbwJ+BnPvYwJjHB5zMfJh7wFq8wzBNdjwMeLL87uzVzPVfOXnwhWp38xN6nTzllKNePYlYOL2V/GluUR6tQWsuNeczItBLCWxqahxeyqZhHe6yI3cwtdu4ln8HGRktm+VTYMZ9+ZSGHTGnLnhGW616MvCcWhPRbEwYg8otRDIlKoadc1TAhFBAFQocD+qJn6DI/YEkYNMmuBHZxkeKjqgyTtzNb9A5UdbYTHu+uIVduVuBx58GTF5FMEoVuGnHPfU889cprY8Z99Ml3P/z0KxCgompeeBUIqiD4hGTkVGjCLMYMQ4QcEXRM0AkhpwQNCBoSdL47hOBEgjIFSQQVAkvgzHTiN1bMxej3d8EAt33KYyKATm7+9kokIb9c5Ggs+QEH1hNwrLDbx7RMIFyaz39usgYev3J6Blw+MlaJgN2/93ECLH6JkhOBYUV9UWdQEwg1HPW2Sr8HNI/mwFQfZ8orExp8Pv8OyzPUZjSbIopdKGjELY61ib5rQA0Kljoy25SJZIjMEBuTJjqlMAPhxQrkVCxBjsUUxC3mIOtjAXIEfn7Yw8jYTCyWJ+NHFbex5aZXz+BFQ0vpYmHSsewj5eK3R8uaGDM3spI7+YhrG6orZyYMZ4qLUeUV1VrIKiv55otPPrwIrFJKQlAkivUoLC0pJCr+rv32zO6Y2C7AzzNotjv8XVFVFj4GnVdzWoCACykeyfybb/Pr22N2it/uDt9g864v7zWK1YQ+VJUrvVWrNBujOmCKF7lMJIlSM1co4PBKPp3NojFKJo5ExHKFW0Yx/ykQHtbgmjTqAqkhWWixpXSt5MOXgD+hIMEaNdngsONOX6YtUc9jHmkbYAb1PUif0BPkf0kClRIadZqYWLgMmbBgw4ETF254PHjxxucnUKhIsRKkSCeWK1+JCjUaNFuvQ5dNtpHaY58DDjnimFMGDDnvksuuuu4umXGTPvjki2nf/PDLH3/JBUNe8pFGzQmkk0EhBCQUNAwsrJI2UCgSBfMomk/ZAotoW4bDgDFz1uw5cuZqBXee/vGv/wQIESFGvGRpsuTIs1q5avX+Z51WnTbaaqfd9trvoMOOOqnfWedcNOyKa264Y8yEKR999tWM7376bdZcAJgQh2RIgQSkQiVIk6roUpeGNMWQ1tAP9NKlMs3Xp2c5U5ZsreTLX5AwUVZJlCpDtgKlKtVqtMYGbbpttt0uS+Z95SCel4AuNRoYdLDpM2LGih0fAkLBwkWLk3Qk//5lqtRpslaLdj222KGXlhP6nAHpDvb8o7ygF1MDPCPgz6DCwleuEgBh8Y9WymfTdoYqivFrP3NDn15tqohFY2OA8BCDQrTruZLtyFP5qUIVK0elytdq5apMBaoIKY0D2aQiZWdpKysjvVxkpelMK7lSUmGr0xlWnM4KklhJ9hqkQ2gZtYtYqayglmkZSfpYn1TsKQJS/KOAkPZHACHv5Uzh+CSV4DmntZCAPN3BABvnO8eOmMWQ25aZ7zL8QE9tyW9CDzCEeWfrhf8vAfVM298Hb6MA8bsHAGbCwVlFYOzi5uY+7Eu6BEIAjvqRJIEABDocBkKBw7WAuuMCkKFFGnsXSn3EwCy8Vvp3+YYyZAJMrrY4FzQjV+gV0RixM5fkg2JY/yVasr24NpyuGOX8579CSi6t1dWHhkfHZxZXqdagaX/9/8ril7qs5a1otUNHjhk3Yf9/KcvTc0vbX5mrkFNQgiEwOBKNxRNJZKrq2vrG5hAEhkBhcAQShUZnmJuVb92U+4XkGJoespA09A8qsdSKRMYqLM3TaNJv7+yKxS1xactewWqGDB99M/z4S0lLUyJFbQCBGihQGBxBvqauoaklDIUj0Vg8kUx1476+7Sxpfj9AsXi53l0y355/5NWPv/ftr/39yTdee/tzDIF/fgL+3baD3C5Uj2ihp+9Z/QOgHgWoL5WzV7Pb70uri9vanna3i/RTqnlxV4OqrK8KQBwNyPHKYpz/5lpuHOqMJ3SeK4PKn4tPicfv6o0x60oVF6OjywJqTY2qbZU4iEv4c8XByMwWbFBoxOvzZZ5pEImnsoW+sERbduHWHMvVnSVeoHITzHY5JRgKR6KxeCIZ0HI1NYG+WHCKFBw0z0kkC+zerzMGByF+Ybtnmxckv8C7tTio+/dp2x2moKp95+JTlShb2SkGZTlJYf7Oru49Fh+xiUATw2Jc+vSky5TBhBlTFapUqlGn1iZbbCbVa5fz8ZdQQQpWmMIVolC0LDHgjEF3wpC5LGR5wdhyy6jbL1ueee7FhaMpy5LD15w1d8ienbo0+G4sCNLOJsy/5GcN/3taqEX8MB4MqnBKn9PUaViIScdSLGy6DBlZzoIVSzbs2PLmYyU+AV9+hPwFChYkVLgwkaJFiRVnlQRJEqUQSZWvUIESZUo1aNKo2VprrNdigy49uh1zwnHXXDfssiuuuugSCHZylwHiNABlNCAeAEz4A6b/BmDYoYABzwCQUCfvOgZh3S1aD4XDDV7RUIbnCYqcsgPlSRUKyQtgyqcXki5zus2OEKzeOX5N1C4pUS0QlzMdNxEMt2ogUS3FlEad2voHV6wscgyODzOK09CLg8KD7dq1XYosF4p7N3EoaqSRPjmq452hpnUHWAYx6+zlYWFxAEAp8EvAEu9UtHJwwyanaBg1kGIJsBGwl5i5Gcd5uQAkOAEWDQzRtHFa4Q4MEfSeg54IiRgOiiAid6FDD5NlA1EWncFRLQAGSTbDnWj7ZhhMKmlmgnRhgkR8MnoL4ixduevllU4hJX25L5KcBEsVqqQH9wB6vPdlhiUyGlnO+jozg2UEj1CzPdoLVwp6Eu3bMCQRkwgyEBaty22yKCdiBD2CVHgkQ6dCtlKjYcwa0xJLJSrNgRAjlJP+uwC+wFXFLGfTHDKgei4jbkr2Blmuv5a5Hw6NQ2ljlkGuvwb0w7YsJoWf6oLBn3ebVsmV8TjHKjWRdIyjQ+PCKY1Bm7Yci7EBFxL/SKKDarwoweFh9ldmOCh5sOQZPuTRIDm/aeu1Yr8EVIT/muB+Oo282BXnXVLHfrqZpCv4wCAoyXMuz7iqwBm6A55/v3HPnYpb+63TqtD4UYbuhccgKH+1FVcDjCIsJ4eK4iEowsAmhn7bw6XoIytV9kfcvCHKdIBJQjcYVARDcWzrR/rpZVWD7gRt7g2wzq/hGJtTBAsJoK5pHpTYO+S8SCj4DljAcWSr+29JMqqpDi4/aF5y1dDfE0h2UVjFFjbg7K3SO6pDBakW1Vl8pSCAmYIUhB5UbKv6S6y03qWWE8TsAz5cSD5w4V0CQc0F1kB1mze0qYVVarHIMKFmAi88wo/ZjM4RQeUEX+07z7kyADoKLlbZJ9Q8PMMEtZXcqjpydzaoe81ViEMChI7xS7NkDXxvMCwuduEA2VEFw3T12Tnv779fd8xde/1rCpJZVnSvCKY7k4MqjAOs9sKzCisMwWVNiguGulswNX1g4WXUV1mlaogAokWolaTWon7UbkKr++/an2WYdHg78+J29GSH9dNB/4Z0eBTN9l8T0aivmj5xTC8umAkB9CN6Jlod5NlzKA3c375/PnJ+fJuDb4G9UBJNE5OdLYnoEcCWd4dzSR+WHcf4QcZU7zBR94gDv0BZI+8JudMrVLvYiQ+E1B+DEYSFSo1FrVrsuXcyCXaXdI/buioGRL2WJMySiTE9sH0G8tdQtnAcfV+TnyI5+1jtXQ/r+vx6wuzcAYMTVM2AR3OHtUUSTxF1mSalWGHP4GmJXhTrRt+CTT0GXZ7fft1AgSKqDG9TCNIz6yntBvVkuNLirEjqCCMIDMdImcBzawMtWCcRK0LmsDhIx5Ye3lhztlUSd+mFmeOb2XbEYR7DzkTNg0359KWO3+bHm7LiLEKcbz8eadRWinXgWvyAGyJ5WxhTGdlGdHnQndLlCCLBePj84fpQ8TsoqWGjDCuDz451RRIvlLlAgNamg9ofNM4mPBCgmG7WTySnX1AlfWt+P1iboKg1Wm2yh1Lf1pdmLYvCikx88+ke+7eVmkEluft2hpq7dKunz22Juar0f26YEMqL8kWawkcdTG/l1o6wVDjIGhtm7dLcueQMG49WqVh7BtePdnVf9MSJVEGOmgQFPfAc7x0yvdLYXaAI0y/rm3aWA/q3+RCmXUbeQVOCpkdb2Uj+BetZnGGAU153N1Osfp38Uft5V8a8Zcp/tvvrqlB58qXfg8+P8nrQmSy5WHzGtgMGjzngXwAU8TKI5jwjZcrvPu/vQlP50JZSNQMNFTipattSfqDX/GsN9YHn7waZQMLMgw0VGtSiWGlGHGqGFs7c9q1Wnqzqyh1FlbAhVbc2RbSGbbnBq2GGrX+jrbMpb7uR3rFm77wcrC5dtMKux1assvtaT7jQ+6Wg+g4iiWm/gwwTCnXYBRTDhpqDrzXVTgJHNM+kqWSrc8u84vFW/j6S6M+d5MFQiwlqaf/zFiY+5Nqyh28jQa3DqYDtUws4HZbrbV3VsAn/TrPGwGpA6coGBmxXS5nqGJYpBmajs+yD7WW4busB5RXDILvfadtoapk+z50ds03I9JYNs060m4FPV/4RvGRQ6O+OTnV+svDiiOucY+cxBzoVmSUC1ut2HrQzH2636JnqspQqnp+7G2Cdb9+vJSgXS5GIraiXcv8vilSUJWx/0bpvlp90RiMachiaR/2fp20ah4ldL48zwpLrwL6ndW0J40bCFt73Tm3yMUYqTtuu5cHgInfe2AVwuldvnr007WHPuSqVUKkt48KtmHBb8vSbPOaJiq8j6/rl8+IMbx4VR7r+WG9J50JJ2VPzNpqDTs9Krt7vxNHqVXGi08qDvFXfWVd5wquKXPqjEky20w9qAjON1+lsU+z8OdcooQVCxeXwl8uzcqxz86Fdy4vbj7pdlv5i0JXJDVWQLCFYN23evweO23c95awlp+D9gCrc8ARuCyU5s7ud63FXJwlft2WNz4+rp96p1a0pSwY3lBSTvuhdVhdqTnW6NJFCXaC6deiQfN/cgPyMcBbCnZzJ9D9nBAWt1RV6dSgLU9cJhEgbisEyrLuQPe7upiRJu0Kc7zwGkVsSxjvtj+5LrhurhG6TGu+3X4pU3DUpsQEH5KbreX9Hb9va4YC3VThxgXtrgePzEnWbKxZ5P/zwNHxb33tCxZ83bzy7O7Pnzf3S4G4PkvP63OGQFkyUjvIzGnV17N84ouJ5CI8fD52gy1GhEJXzmK5fnrPCMxC0nAqdApNwBL77LZxfahf2GZk4HMvYByKLN8ucjbXU5eMDCwOliiP3snhLObFFNfxJ7Bp4G+bgT7Vsjgp5oY7wfz4XLFyxfAcOwgPWDw4MKFaVHhoByLMvlDqdXGBkos5dt/6W2lVSY8pmMyblnvI//Ksz4ojRW3Gp/Ttby+TBnNyccYqvxIK2GmvQFq34lVDi2nILUd0PE9y34yU1DPKf12jw5ly7Q6aXCXeoTKqkUW1SLzz9aEu+vac6pDryY9OvTGNF1bi94cNwB6LBBfjdFHqFxHR1gGvsiPfT+q/PehgusvVBPZjn+/LOsOxUmwgEILIXWXwggRD257/xI4kg1xmBkXC3ytK3dAqcgDl4sZKi/YHGfae/8RuHnu0pVJhQ+3xsfo28IaIGJ+EGyLmtn/2OcPSPjpt16021y92khZ6ieGkyGSwu8pT34aJEuRqtF1qtCZ7MLT+GHUN9i4e1b9yEXRzNt+bL2GWsqh7lmz/lOGgz3DYH4YkfL1YUOEuiw4GSttIELkglg16Yg6af8gllfO4SNNkGN+qlaAP3bRclLOyyEwqFqvM4pGkMHQCe3ZxqEZyXraIUbRlh1srXA0dOXIqV/qesADpm7JyoR6SV+pn/r/haQEP3yQZcojqqGmYVaoyQEV8G9bAdGrvyTNl2nQ84DXMw0aar/kq6ENQjy6KT2OQQGucekdR9i9psZ4jwVlnn94c9EKhp5tlejDLoNmwbOATbYSEqLdthtBHm4HkyZr98vlkafuLYtcMP4Yfjh6ofXz4dI45G44DbJGjxwma+geUqPpdy7RBR9FGVImnSSrI94NjUq+PQD7gSifz7+mxnnaBWeQfiEVrv2dvF0uk6WXvvsXJ5ERdW72jnW9fBddh2VXsUaxO1iawTKVayTChKlKVYE1aLoilYmzGMjZUpjiMjYxPCmqA9SvUtBBf98lpss7bz6x1ujBfhWu+5u5P+ytoANyiiQnAEVwj6YNvcsYA1W//VXH0n08VU8lJxdlOxEf69WsIdpHnK/VrebH1643HzDCXo91OCM2ZNqkXMX5JM8jtatKkz18CTMAdfw6NGCyCw61t6NH8RhQFoDMG4z4i8sHZQ5222kwp8xcnSTDxYXOTG9+BiFIXMGeUYpgxB5C5xIZuSjXBjulk7oHshbzJ9Ru5FG3pkLln/EHXJtl1euDJq9VsfxE5lrhupW+DHH/pMXHvuiJ6JbpJ8Y0yIo0/fXf+Bg/+haedDqmbbtD0slnrxYd5PpOEBsmX1lVR72opwz155K7K7vXZRVuDfTmOsbw3KjW7t4Yc4jndSWSvvcWmF35I+ulZRizgEztlv6+b9lu1kq2PLpOKyqT0LJpI+/B2U98MVbMgPDPOBzSOP04kyPT9O8Af2x3EM1MEcHEaul98MDHm3MavhO2oIPYWd+r3DYfhCfXr4lB1WbjRVgdvKlnKd0oa4yoJ3JRtEh35G2XVBxCWOFq+8mCr2LYyJJQsjd0pqidZHcRmNCtdQEkimm/Fmdbj87V2EuPG6eF5jLb48LU7K+aWtuwAH5mCEYf2CgA4HNMAcfLDn7UT1bV8yhoKFLDjyeJfK0NF0vRt6jBu5YQEke9czZBqckfBSi6G7SxWLd6ry1W65dIy18ZHuD33saBBxuQIIO+oDBamW8S8xNh/gI+xI97HhcccWCHQeJQyi1739rAMcpyxSPMwVQbxL+MyKHbi0Wo1rLPWj/QSWeOfnyr83zPmiBPbD7qqq7c8ZvExBfwOB2HgibFmWLpB7/fh3kbtCd1kMsLPyyI3NYY87vm0AwKcKjzeZBvtMaV6koK6YdHxpuKK1VGkfRJpChi2L302jYaUiElNpdVGVPKIMY2H2Y7OVrH9fY4ffQllcvPDvrLC9VRU/8xpnPXzh7C/36Vn/90cafmo+V3uc82iuNFcTpWwF0a4x+PKcJYtGOc5bJSUHqjcq0NHn4X7Oag4842N9UlkS1RmP8Mwqyb7WZeXNjVuvLrhgnfqLGcw/29P3C45yjFR6ZLKNoXtbB4Rwk87Q2xBdeHdMFFEpxviXhft1RxVjb8UA6vc/AwSU/D0DzjsJpr6rxoqmX6LoAlosYLP+MnxseqZj80W3zGZMrZSCL2AOpnF8ZXu6X+TMN80LqvxmUURFXOgsiq4KFhW5StopMpUnzTczglg0Idp38YA8wjg8o7Spw80CDydViJXgHN6CRhxb/sxpPlt32yd3ztZWBhkejVe3cpklQLE1FkFCHLRn3HKTM7aU9MJXd1wlvehg90fljyOj9Y2ma/aRITYHNQ+GBg3MxIfNlZ7If15O/dFzIhNsHpiFuZItr/zRV/6/KVKb6Jc9/dKT2KlVaD6UBxqYg4NHvp3+DvDYvBBX0RE2XeOPqqLt65jaKCzssfPZ0t7v933l81/DroE9b4Dgdn5HRbDd4J2Fju9htvPp7/h5HS3bZC4aI0fy0FzUCCc5UHv5pdRG/+WClioA22HMkZeB2g5H/pwLo3tw4jMyB8C4WwUd+Wy3Vr+Wl4r+eyP1x78GAJlAJwksBLW3phebAN+1xSpX57Kt974GtsuJ7wTtCQhgYnvuHvo4Nm8Sm9TY3M2nq2iVt7OA0vbb5R03FeuMvSpsgQRF0PSYmX/JyGv5B2pF+Rredg37wHoAHqz1feXbx48TrqIysPGC7ep3pzf//vpnslh29CqdzhL2RvSmQqfLOSfnol74/EkOq5zXqTEOObwGWzM3nhAGc1B5KnRqV3UI5/K6xm8TLM3oirU8hZRL2Fw2O7/o6udb+SUeVt0B+S7ktvxbL5ONPPvxS6ykfO7j67jrGITlQr9ryHDVpEs9CXzJTdkm0DceGgeS8UFY5xsA76ESyLpjw5wuOn3udNuHQw/rkICLv8s7ho2ZvdWftf05KyFX3hGgiOdoleoTFqs+3iqzUR56LoH3CDI0J7QbTbDGPWfUNolXDZYmB3RDG3eczUnL8PGe+HMPEXXQCUF0nraZE/BKlnmkhOWi5fZkUmswJDX2pA4irJB63gRfiB44DWpKKBXNXhO7Q5fx6Lhcj06XZbebPIrmhAogGzZZYXgczH45Fnl3wCFqmT49EP5hDPwZyzqVsOamW0rBe/JHQGzDA6PpFOpy1bp99OQ2gucZN44VbbVIGjUOS0O3Orx/HGRrrE00p5IDZfeF7jOnbPXWIMMrWIotrbEkuqSYZjw0/rxvq8djsMd9bupXS97YeP1XnIwh4NPk4AnCoknxGNsnH8iudmr+/9uNit2EgEq5rnRRlOUqOzjZF1VZt9qj7o8tbossOgbj7kjctUTQba8+Yn7xf3xK4t09Z84angXQrTqDIUN1+q6E56tcD3xwfTIObY2oelPDbt78YIAlZzXciEMuojxZlWmu1EFDhIPc4vR9RyD++DPjLKB/OFZLfDqolUJAaM1iWTA/dKqWrxx+rDOwHZnjyB0iX8IHyL/7gszHDEjs34x4Qe7+mX7w1J/SP1PuP8EHivzUTHv+pLzQH+8HzPed1chTT7V0fSkxS9EM2017/+Vkk2dkgOSe0TK/SNsmdo5QCfsXfGr2xsGW0Tnc5soewrDFQlhXOcRdMT8whbQzRvDDOi2+n9GLLP0dLBkN/I4sZfTi+7U6/DBjBGmfCsznrqgcIqxrUIYbW7nNABlR4gKmuoVrV2FTq7AVwXMrQ/oAlQvWbtJuFoyCDyoqT0+yEUtTtmnoQFOmCRgusl78i5mdfpGlJ75ILnuJWOZTa85rzqh363dfTGpivZQfY+qlIaQPidH0lASEz9dx1wE4u4+7K1ICETUtKmzjurmFH6X9KgSf28F/ME9LTj2wrID7NhcQWO9bn2Idtu3Eyf6/IdD6PHVgkELbL4hKHVxGoywf6CV9TyR/T+q+l8nE74HeOP2i5k5GOf7cHRP7n7dRyPdcAN2DhJd/Yi5gKnhFQhz+Oj31O76ESBXYSxYwf5oESINb/vVimgfgxvAKD7KG7MMXVHMpc3zkNR7EzxY7iqeH5gMBA6KG/ahkv2+9ls1EikXQouOSITf+k1MArao9TQYAreT9LSgBSDn2l8O/CZfGKpZgV42U41B+dWdcmlGNmtOr7yvTh1e8Mdmrfxq1tLYVJAX5ZjBgPeiRpMC+GcYvJKARdiVJQCuJt0yCVFJZhda5dG/ZKQ1pK2SW/URfRUTx5obVh/tYWzB42b0fYGKPVf93U0WH4u3DkKt2SJmrZeFN0S1513ekUHBLsK+H3TKTJv8gDnM/QHsnXmll4/rQf7G/5/ak68f+Vo09woizkL9t63X4EPHMfwfXoakUFjknFWY+1pGzGLJMc6wVVlpFpFIcKXOW9SlXzNlWGq7EZ42FcrQYnG2560ooZz1Ir91czmZcCRXFIgF5Wm/xBxmUAuekzOJbA64i+XrdkYxK1IyfRT9WK89koHoi3jeg04E6YxH7xfhNjLpKm2/37vLaUs8gJh3zXfTfVtnd5Pf7TDpd9YFEh+MgrfiHu0dYdZdl/+Z66Khpifb3jg6g+3XR7V2S0ocOmyM/8OWzu6jcIT3EShdX87W6lyA3/pOBAaZNVL2EL5KCdyvJr4suxZ7hY9W/CcZteqJfSE+1UfMGVKnnFuMLhXQ4n+Fo6jjAGIqX2mecXb0q14SN57edXWf6qvVoZpiW45G1KV8QpECTA0HyBeCd4JBZP2OD5dC4RaehkAJN9g+Tq6yBzTCPClsOohYIhADXTOgjQ+NOFsd27OJ40V9PXD2d9ISznoQfi2v8xQ00kKkN2mEdtuVWujWvpH2ugBidsK4ECINMbdj710JoC/vKp0uhmKPH2ospyoDmNY8potG8FKEJZ60IQu/+bt0phEHcBlHy15oytKl/dfdUtC+FjHC3/Z9WZIbgNq8Pbr9nQ19fCDjlc/fYgozl61IlQAp2qeU9JfgCogISFhDkIwGawA+7xR7/5mQNCGNDGyGxOyJ5EcPtbFxRq74PdEVRRTBIQCgALRuSYbxIa7+AAziCE7jBCsmjc5kQ9DZK8/prZIkKyrkE/n+fbA6VbhCw9+Z6GPP//9EkE/pN2hSW9JAJQe8YSmnNfQX7p1NMeB0KcwFz8vl8IGQrAAvnQYzUH61kQRjmOGbK6v+fcOCMfpfWrzQbmvskH15l1fuZs77U5v14VxHA/HK50uU9p3N9u4ncb67FtG4j75ZUN8v730nNgmvyC37IfDOgaKCrIqX/PgVf9V+Xglz+5ft88/Yp/zLxVfTK/L15rdo/OvmI1/ety3L5/6csl6P5Ut07Ss/4BWACkKtmRw7bYMW+mQt+rHzInTbem17YH6oI+K+s8mJlQYv1yk4vVj6Uuz6+pBkVd7WntOxK+qSlOxIxZdBrKkmlORoD+BhgVYCypwISybTAvYOOHO7w1HAQzqCfHO5ed6+lQgyiSMvOiDj8FCHjao0w3TxfCmrPoo5q2jzIG6DiJw/u6I4IZmGY61ATTpHf3ssYam9HLqiMUV0XxDGOcDkK7lKq7OF0D+NyMJbzZ6kJ8y6IJ6wN90Env+le6ZvQp+5VZUm22AAn6qXNS/eSaiNLw3Oh4l+FlS4PLFdLa1MXbMgxOhwdTg4x5jrc+73UML6woTafiXszi9TcbBkN5mfqbZK+5kPcenXm4vE3b5H5mRQEie22yqfWxUojnmfesLam3ZvTq/yBXaZ7QfAdeNj1i5Nmvl9H/1aW8oboKBrR2Tod31oOKv1RmyeH+yY8rLtM71RMlvcoQrN0rOA8cNidTnPflEdZ075HYGuhsXUuOUEzVLm31fDb6MZVanROI4KTRluDPajWXyOcGQkEwmvAfK7F61pN9Wr3avf2LSvh5Myqw/HDYSwQ/GbhRHAGw8pWuoRu47ju7G2pWSSSGCK8ZNUYh+lVntXqcHIClNJvnRHzEaEBwR6TTLvdC7PdPqqIIlHasjwmo+cjJ06Z8Nrat/FyezklZFICJfLOwJyJqa8VfrMlUjUhIk4gpHg5s+vWDu0YlNX1FpNmm0FZmnFX1NNfMNIEv6o6W00qjSAL2ZMcJIAn24JYfDddBphRq2UBuQlH7xnXzWr3iUXm666PJeBkGCF78PTytJfHd0tYRaxcn2vVlp5pbJpVe0EiHmKixgceTSSMHJOiSueF/sZED8ePqypceRLo2seX4FvD74kYM/h9dlr7K/YznY/3j6y8tzE/0m6SWkkYc/2dWswUxZv3FAgos54c6Fl2i1J2+E7BsDEAH3/Wi3B5XzSjfXv5zcq8BWiuKJAC/62s3hwUcN9EoW/PJ05j0oIKWfgwXybczAfR4QgZWPEsUARFjiYwq1GHO6ZThL2nuipSkiN3QvngzeMr4Ru2LNsgptfcQvvcpCC/LcPdDUraD/f1nFlN+J6KvT2HXXAFAhbCosSz0GcJej9orffUxIXbPCHFLISgpPOA1UsbvaUswqg2iYI7pUhZloAGphgisL5bliOHi9x23l18+/mYx6QGYm4DlpkKTZ4R01WQpNdLwI1r4cOQedpNtwMftfyYP9hY5bwgS/kpG2ckclvRAhFPyBpuCffhvJBB19D1u4Qq2OwaRb99+2EeeQn3FWQQZZY0w+JG91Tiq0C+efzk809GMiURG285UgJYA0KusbXYeshWcIIonEW4m/z5mIAIWPmDAIRTjXuSxyMmINyPgpIpzdbuqj5XG8IfA4Vn6Di3z/c3QSyRVPnq7CAjMswqxTOv0GomrJudVAB0i96OdGQ6eOQZbjjbmhKXvWh6AqQVYyzU0MSPvnozksUKz5n6zSNn4GQHVvGMbxiomgWtN1YTQgBTyMkXhvqmEk3Ocq/uF+BH/K/Ub+gGAxOnHesj6iZ2ErOdAh4STZmoWrE5PswCxlDbPm2mmgeAS6P0ciaICHwmRMn3mTAmhmfCado3E4kdMSF73YJnVGKBpcI2XTVmghAQ6iDurUMt7h5gHZeEMnhPVzHB5Wqo5OJ6EIbptlDR1IsP39guHc/uJVMmnQ7h0dWty/IYymO1opS7E1iQ2mhHxad9XYBGrtIoLcvZta7TObhyk1ytbfRbEEDXn7KqQJlF7WlmtZB4N7Zfk303AbVybTJVxQugVAQtnInyNGw0nfewtLW/gUA4uPT5UhBNqtp9nkUWV5HZIdC20KAtDIHJ0mCoNvd2zWhm3FBoZwZ+L16Z6Pp0w7Rsh9Pl9lyt6K4iIiGjoKKhY2BiqcRWBcFRjYuHT3CN2xgxkQ6bllNQUlH/V9e/u/QMjEzMLKxq2Ng5AM4urm7uHp5eQBAYAoXBEUgUGoPF4QlEEplCpdEZTBabw+XxBUKRWHJ14R1V6v/y23qVYWZ/+U+0gqKSMgQKgyOQKDQGi8MTiCQyhUqjM5gsNofL4wuEIrFEKlNRVVPX0NTS1tHV0zcwNDI2MTUzB4LAECgMjkCi0BgsDk8gksgUKo3OYLLYHC6PLxCKxBKpTK5QqtQarU5vMJrMFqvN7nC63B6vz/cKIUqyomq6YVq243LDq0BAREJGQUVDx8DEUomtCoKjGhcPn4CQiJiElIycgpKKmoaWjp6BkYmZhVUNGzsHwNnF1c3dw9MLCAJDoLAQPwgkCo3B4vAEIolModLoDGa4zPbH5nB5fIFQJJZIZXKFUqXWaHV6g9Fktlhtdoe3j28B3tJpnVPzB1oSFYzODXG4cGLulFgcnoQRczxqR++1FHifhs2Vs3pPiv81a8MxLjV13ir9SR61SKlA/GqSPKuMMf3VYYsgS1LO6ZsX8BxAsqiBACRo0ctDJHLyhoQVlMjxFJYwIihGtVIUjDmYTcnTAiylFN2EC6hVRq0lecoa2pjEZKg8a6sVkAyBTTUxKjhtUwTYxqDhAQgkCCspRKKSMUeptSQIOkSSIegQJSmCAmVOUyiUOLslDJgpRprrfZR/WI6DTk/Cj0M8tZCuxPYYAumpuB/VYVm1PyvDB/X9JFU+FwtAht+e5e/3WLJmbUpLEtY8zHnjhJWVCcQrG3HKlpAyaRyxhLCP8sAyhKkQiERlEMoYjbpyiIlsSXOzj/J3KiOTnpTgyJ9rmCnpNJfs2X1p7AY7mdRp2p1xFjTJLooDcZAIgvEEGUr9C7kUILH1YjFcQcQ6aqBAyCJIZAD/73AU10WnzgfDn/VjXus7lihABinw7XLdHYw7f/drn+viX/2pL8rDMa5CP1IK59QjxNzh1th6j787R3P/KuXi6eVq1b4M5H/8UWcfm/fLw3/b168rj0eVo7G4L/DXLTaBSAZ+G2/acXaiKPZikBcFi6ojNJ/2zpwj2mP98U+gFGqCayKouGnmBFwZjTfLJZtfnoTH0XlZ3e36m7tm5Snf5f1qLNOGk18BNtQFgT1QUTCaSrFchBfgArlWCruteE3ZkBu4e9b+hR19p7tQHu4CqNzZMeg5abOLoyonvOkiYd6cEdQpuO76tFFp1eos2iVnIjkCqZGHiCVdyJ31K0lT/8UdjWf1mL2kGWgCw5wCz8uN4s3E6y+7eXmE2MZtWavZ316VV6xVqao8bHEHemzyj00DzvZf6wLxlHGedY7BSdDg8ETSwfxqmdeNnCUxx8mLTVs/xrPBYL56MQQQCo3B4vAEIkmyikJjsDg8gUjK8v4Drtm89ze/ujE0PqhA7dqrVu/iO/xPMRNrl+3vlZn+OCeZcGgoi4hcl84rJlw2lPbuR+f/90xxWZx7TECsLYlIh099s76oHMe7OIdHl2SKXGMukoWShlq3DFKTAeqK3+rm7EkshsJ9yHHu94oX9/1OfvKU5xyqN22fUyOn1mQGIQosMu2B6wNQkL3X6L3CevrJlzznpKfIem00BvvXtGP0Nu2g6dX1zn68+Fq3f345T3fm/3W/es8CAAA=") format("woff2"); font-weight: 400; font-display: swap; }
@font-face { font-family: "Cairo"; src: url("data:font/woff2;base64,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") format("woff2"); font-weight: 700; font-display: swap; }

/* the fallback, scaled so a line of Arabic takes the same width as in Cairo (measured: 97.6% and 96.8%).
   Each one is a separate family: if a machine doesn't have Segoe UI, the browser moves on to Tahoma */
@font-face { font-family: "Cairo fallback"; src: local("Segoe UI"); size-adjust: 97.6%; }
@font-face { font-family: "Cairo fallback 2"; src: local("Tahoma"); size-adjust: 96.8%; }

*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: "Cairo", "Cairo fallback", "Cairo fallback 2", sans-serif; line-height: 1.8; color: #1f2937; background: #fff; }
.article { max-width: 42rem; margin: 0 auto; padding: 1.5rem 1rem 3rem; }
h1 { margin: 0; font-size: clamp(1.7rem, 1.2rem + 2.5vw, 2.6rem); line-height: 1.3; }
.meta { margin: 0.25rem 0 1rem; color: #4b5563; }

/* images: width/height in the HTML give the ratio; this keeps it while the width follows the column */
img { display: block; max-width: 100%; height: auto; border-radius: 0.75rem; }
figure { margin: 1.5rem 0; }
figcaption { margin-block-start: 0.4rem; color: #4b5563; font-size: 0.9rem; }

/* the ad slot: its size is booked before the ad exists */
.ad { min-height: 250px; margin: 1.5rem 0; display: grid; place-items: center; border-radius: 0.75rem; background: #f3f4f6; }
.ad:empty::before { content: "إعلان"; color: #6b7280; font-size: 0.8rem; }

/* the video: a 16:9 box, the iframe fills it when it comes */
.video { aspect-ratio: 16 / 9; margin: 1.5rem 0; border-radius: 0.75rem; background: #111827; overflow: hidden; }
.video iframe { display: block; width: 100%; height: 100%; border: 0; }
</style>
</head>
<body>
<main class="article">
  <h1>رحلة حبة البن: من الشجرة للفنجان</h1>
  <p class="meta">مقال متخيل للتجربة · ٦ دقايق قراية</p>
  <img class="hero" src="data:image/webp;base64,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" alt="تلال خضرا تحت شمس الصبح" width="1200" height="675">

  <p>البن بيبدأ ثمرة حمرا على شجرة في الجبل. المزارع بيقطفها بإيده لما تستوي، وجوه كل ثمرة حبتين.</p>
  <figure><img src="data:image/webp;base64,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" alt="ثمر البن على الشجرة" width="800" height="533" loading="lazy"><figcaption>الثمرة لما بتستوي.</figcaption></figure>
  <p>بعد القطف الثمر بيتغسل أو بيتنشف في الشمس. الطريقتين بيدّوا طعم مختلف: المغسول أنضف، والمتنشف أحلى.</p>

  <aside class="ad" aria-label="إعلان"></aside>

  <p>الحبوب الخضرا بتسافر في شكاير خيش، وممكن تستنى شهور من غير ما تبوظ، لحد ما توصل للمحمصة.</p>
  <figure><img src="data:image/webp;base64,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" alt="شكاير بن خضرا في مخزن" width="800" height="600" loading="lazy"><figcaption>البن الأخضر بيستحمل السفر.</figcaption></figure>

  <div class="video"><!-- the player comes later from late.js; its box is already here --></div>

  <p>في المحمصة كل دقيقة بتفرق. ١٠ دقايق بتطلّع تحميص فاتح، و ١٤ بتطلّع غامق ومر.</p>
  <figure><img src="data:image/webp;base64,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" alt="بن محمص في صينية التبريد" width="800" height="800" loading="lazy"><figcaption>بعد التحميص على طول.</figcaption></figure>
  <p>وآخر خطوة الطحن، وده أحسن يحصل قبل ما تعمل الفنجان على طول.</p>
</main>
<script>
// things that arrive late on real sites: an ad after 1s, a video player after 1.5s
setTimeout(() => {
  const ad = document.querySelector(".ad");
  ad.innerHTML = '<a href="#" style="display:grid;place-items:center;width:300px;height:250px;background:#fde68a;color:#78350f;font-weight:700;text-decoration:none;border-radius:8px">محمصة حبّاية: خصم ٢٠٪</a>';
}, 1000);

setTimeout(() => {
  const box = document.querySelector(".video");
  box.innerHTML = '<iframe srcdoc="<body style=&quot;margin:0;height:100vh;display:grid;place-items:center;background:#111827;color:#f9fafb;font-family:system-ui&quot;>▶ التحميص في ٣ دقايق</body>" title="فيديو: التحميص في ٣ دقايق"></iframe>';
}, 1500);
</script>
</body>
</html>
~~~

**هتشوف إيه:** مقال «رحلة حبة البن» بخط Cairo: صورة تلال كبيرة، وفقرات، و ٣ صور بتعليق تحت كل واحدة، ومربع رمادي مكتوب فيه «إعلان» بيتملي بعد ثانية بإعلان أصفر، ومربع أسود بيجي فيه مشغّل الفيديو. ولا حاجة بتتحرك من مكانها وهي بتوصل.

**كل حاجة ليها مكان محجوز قبل ما توصل:**
- **الصور:** [[width]] و [[height]] في الـ HTML بيدّوا المتصفح النسبة، و [[height: auto]] في الـ CSS بيخلّي الارتفاع يمشي مع عرض العمود. المكان بيتحجز قبل ما أول byte من الصورة يوصل.
- **الإعلان:** [[min-height: 250px]] (مقاس الإعلان المعروف 300×250).
- **الفيديو:** صندوق [[aspect-ratio: 16 / 9]]، والـ iframe بيملاه لما ييجي.
- **الخط:** [[font-display: swap]] بيوري الكلام بخط الجهاز على طول، وبعدين يبدّله بـ Cairo. التبديل ده بيحرّك الكلام لو الخطين عرضهم مختلف. فالخط الاحتياطي [[size-adjust]] بتاعه متظبط عشان السطر ياخد نفس العرض.

**[[size-adjust]] اتحسب إزاي:** نفس الجملة العربي بحجم 100px: Cairo عرضها 3782px، و Segoe UI عرضها 3874px. يبقى Segoe UI محتاج يصغر لـ 3782 ÷ 3874 = 97.6٪. و Tahoma 96.8٪. كل خط احتياطي في [[@font-face]] لوحده، فلو جهاز مفيهوش Segoe UI، المتصفح بيروح للي بعده.

**غلطة في القياس:** أول مرة قست العرض على صفحة عملتها بـ [[page.setContent]]، والخط مااتحمّلش («NetworkError»). الصفحة دي origin غير السيرفر، والخطوط من origin تاني محتاجة CORS. حطيت صفحة القياس على نفس السيرفر واشتغلت.

**الـ shifts اللي فاضلة (0.001 لكل واحدة):** دي الكلام وهو بيتبدّل لـ Cairo. صغيرة لأن العرض متظبط. ولو عايز صفر بالظبط: [[font-display: optional]] (المتصفح بيستخدم Cairo بس لو وصل بسرعة، وإلا بيكمّل بخط الجهاز).

~~~text node article-cls/measure.mjs (Slow 4G حقيقي، cache مقفول، CPU 4x، شاشة 412px، scroll لآخر المقال)
== before.html: 4 shifts، المجموع 0.2582 (والتشغيل التاني 0.3610: الإعلان والصور بيوصلوا في أوقات مختلفة)
   1324ms  0.1647  ← p,p,p,p,figure
   1957ms  0.0914  ← p,p,p,figcaption,figure
   1999ms  0.0011  ← #text
   2037ms  0.001   ← #text,#text,#text,#text
== index.html: 2 shifts، المجموع 0.0023 (نفس الرقم في التشغيلين)
   1489ms  0.0013  ← #text
   1984ms  0.001   ← #text,#text,#text,#text
~~~

~~~text node lh.mjs (Lighthouse 13.6.0، Mobile)
before | Performance 79 لـ 80 | FCP 0.8 s | LCP 2.6 لـ 2.9 s | CLS 0.318 لـ 0.361
after  | Performance 98       | FCP 0.8 s | LCP 2.4 s       | CLS 0.001
axe: 0 على الاتنين   الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~

**غلطة مسكها الـ validator ومسكهاش axe:** الإعلان كان [[<div aria-label="إعلان">]]. الـ [[aria-label]] ممنوع على [[div]] من غير role، فبقى [[<aside aria-label="إعلان">]].` },
        { lvl: 'صغير', dir: "reflow-hunter", t: R`صياد الـ forced reflow`, what: R`خد صفحة فيها scroll handler أو loop بيقرا ويكتب مقاسات (اكتبها انت لو مفيش)، وسجّل Performance trace، ولاقي كل «Forced reflow» بالسطر بتاعه، وصلّحهم بالترتيب (اقرا الكل ثم اكتب الكل) أو CSS. من درس layout thrashing.`, done: R`الـ trace بعد التصليح مفيهوش ولا تحذير Forced reflow في الـ handler، والوقت بتاع الـ handler نزل لرقم مكتوب قبل وبعد.`, sol: R`المثال: صفحة متابعة طلبات فيها ٣٠٠ طلب، والطلب اللي في نص الشاشة بيكبر. ٣ نسخ بنفس الـ HTML والـ CSS، والفرق في السكربت.

~~~html reflow-hunter/bad.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>متابعة الطلبات (النسخة البطيئة)</title>
<link rel="stylesheet" href="style.css">
<script src="rows.js" defer></script>
<script src="bad.js" defer></script>
</head>
<body>
<main class="wrap">
  <h1>متابعة الطلبات</h1>
  <p class="note">الطلب اللي في نص الشاشة بيكبر وانت بتعمل scroll.</p>
  <ol class="timeline"></ol>
</main>
</body>
</html>
~~~

[[batch.html]] نفس الملف بـ [[batch.js]] بدل [[bad.js]]، و [[view.html]] من غير سكربت للـ scroll خالص وفيه [[view.css]].

~~~css reflow-hunter/style.css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.6; color: #1e293b; background: #f8fafc; }
.wrap { max-width: 36rem; margin: 0 auto; padding: 1rem; }
h1 { margin: 0 0 0.25rem; font-size: 1.4rem; }
.note { margin: 0 0 1rem; color: #475569; }
.timeline { margin: 0; padding: 0; list-style: none; }
.row { padding: 0.5rem 1rem; margin-block-end: 0.4rem; border-radius: 0.5rem; background: #fff; border: 1px solid #e2e8f0; }
.row b { color: #4f46e5; }
/* the row in the middle of the screen gets bigger: padding changes = layout changes */
.row.near { padding-block: 1rem; font-size: 1.15rem; border-color: #4f46e5; }
~~~

~~~js reflow-hunter/rows.js
// builds the 300 rows of the timeline once, on load (not on scroll)
const list = document.querySelector(".timeline");
const events = ["اتسجّل طلب", "اتأكد الدفع", "اتجهّز في المخزن", "خرج مع المندوب", "وصل للعميل"];
for (let i = 0; i < 300; i++) {
  const li = document.createElement("li");
  li.className = "row";
  li.innerHTML = "<b>" + (i + 1).toLocaleString("ar-EG") + "</b> طلب رقم " + (4100 + i).toLocaleString("ar-EG") + ": " + events[i % 5];
  list.append(li);
}
~~~

~~~js reflow-hunter/bad.js
// the slow version: read, write, read, write… for 300 rows on every scroll event
const rows = document.querySelectorAll(".row");
addEventListener("scroll", function onScrollBad() {
  const middle = innerHeight / 2;
  for (const row of rows) {
    const r = row.getBoundingClientRect();                          // READ: needs an up-to-date layout
    row.classList.toggle("near", Math.abs(r.top + r.height / 2 - middle) < 120);   // WRITE: changes the layout
  }                                                                 // → the next READ forces a new layout, 300 times
});
~~~

~~~js reflow-hunter/batch.js
// fix 1: read everything first, then write everything, once per frame
const rows = [...document.querySelectorAll(".row")];
let queued = false;
addEventListener("scroll", () => {
  if (queued) return;                                               // many scroll events, one update per frame
  queued = true;
  requestAnimationFrame(function updateRows() {
    queued = false;
    const middle = innerHeight / 2;
    const near = rows.map(row => {                                  // 1. all the READs (one layout, at the start)
      const r = row.getBoundingClientRect();
      return Math.abs(r.top + r.height / 2 - middle) < 120;
    });
    rows.forEach((row, i) => row.classList.toggle("near", near[i])); // 2. all the WRITEs (no reads between them)
  });
}, { passive: true });
~~~

~~~css reflow-hunter/view.css
/* fix 2: no JavaScript on scroll. Each row is scaled by its own place in the viewport (view timeline).
   scale = transform = no layout at all; the scroll itself drives it */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .row {
      animation: grow-in-middle linear both;
      animation-timeline: view();
    }
    @keyframes grow-in-middle {
      0%, 35%, 65%, 100% { scale: 1; border-color: #e2e8f0; }
      50% { scale: 1.06; border-color: #4f46e5; }
    }
  }
}
~~~

~~~js reflow-hunter/measure.mjs
// node reflow-hunter/measure.mjs: scroll each version with the CPU 4x slower and read the Performance trace
import { browser, throttled } from "../lab.mjs";
const b = await browser();
for (const v of ["bad", "batch", "view"]) {
  const { ctx, page } = await throttled(b, { net: null, cpu: 4 });
  await page.goto("http://127.0.0.1:8817/reflow-hunter/" + v + ".html"); await page.waitForTimeout(500);
  await page.evaluate(() => { window.__f = []; let last = performance.now(); const t = n => { window.__f.push(n - last); last = n; if (!window.__stop) requestAnimationFrame(t); }; requestAnimationFrame(t); });
  await b.startTracing(page, { categories: ["devtools.timeline", "disabled-by-default-devtools.timeline", "disabled-by-default-devtools.timeline.stack"] });
  for (let i = 0; i < 40; i++) { await page.mouse.wheel(0, 200); await page.waitForTimeout(30); }
  await page.waitForTimeout(300);
  const ev = JSON.parse((await b.stopTracing()).toString()).traceEvents;
  const frames = await page.evaluate(() => { window.__stop = true; return window.__f.slice(1); });
  const forced = ev.filter(e => e.name === "Layout" && e.args?.beginData?.stackTrace?.length);
  const where = [...new Set(forced.map(e => e.args.beginData.stackTrace[0].functionName + ":" + e.args.beginData.stackTrace[0].lineNumber))];
  const handlers = ev.filter(e => e.name === "FunctionCall" && e.ph === "X" && /onScrollBad|updateRows/.test(e.args?.data?.functionName || ""));
  const ms = handlers.reduce((s, e) => s + e.dur / 1000, 0);
  const layouts = ev.filter(e => e.name === "Layout");
  const layoutMs = layouts.reduce((s, e) => s + (e.dur || 0) / 1000, 0);
  console.log(v.padEnd(6) + "| handler اشتغل " + handlers.length + " مرة، مجموع " + ms.toFixed(0) + "ms، متوسط " + (handlers.length ? (ms / handlers.length).toFixed(1) : 0) + "ms" +
    " | Layout " + layouts.length + " (" + layoutMs.toFixed(0) + "ms)، forced " + forced.length + (where.length ? " ← " + where.join(" ") : "") +
    " | frames أطول من 25ms: " + frames.filter(f => f > 25).length + " من " + frames.length + "، أطول " + Math.round(Math.max(...frames)) + "ms");
  await ctx.close();
}
await b.close();
~~~

~~~view 700 760 نسخة «اقرا الكل ثم اكتب الكل» (اعمل scroll جوه)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>متابعة الطلبات (اقرا الكل ثم اكتب الكل)</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.6; color: #1e293b; background: #f8fafc; }
.wrap { max-width: 36rem; margin: 0 auto; padding: 1rem; }
h1 { margin: 0 0 0.25rem; font-size: 1.4rem; }
.note { margin: 0 0 1rem; color: #475569; }
.timeline { margin: 0; padding: 0; list-style: none; }
.row { padding: 0.5rem 1rem; margin-block-end: 0.4rem; border-radius: 0.5rem; background: #fff; border: 1px solid #e2e8f0; }
.row b { color: #4f46e5; }
/* the row in the middle of the screen gets bigger: padding changes = layout changes */
.row.near { padding-block: 1rem; font-size: 1.15rem; border-color: #4f46e5; }
</style>
</head>
<body>
<main class="wrap">
  <h1>متابعة الطلبات</h1>
  <p class="note">الطلب اللي في نص الشاشة بيكبر وانت بتعمل scroll.</p>
  <ol class="timeline"></ol>
</main>
<script>
// builds the 300 rows of the timeline once, on load (not on scroll)
const list = document.querySelector(".timeline");
const events = ["اتسجّل طلب", "اتأكد الدفع", "اتجهّز في المخزن", "خرج مع المندوب", "وصل للعميل"];
for (let i = 0; i < 300; i++) {
  const li = document.createElement("li");
  li.className = "row";
  li.innerHTML = "<b>" + (i + 1).toLocaleString("ar-EG") + "</b> طلب رقم " + (4100 + i).toLocaleString("ar-EG") + ": " + events[i % 5];
  list.append(li);
}
</script>
<script>
// fix 1: read everything first, then write everything, once per frame
const rows = [...document.querySelectorAll(".row")];
let queued = false;
addEventListener("scroll", () => {
  if (queued) return;                                               // many scroll events, one update per frame
  queued = true;
  requestAnimationFrame(function updateRows() {
    queued = false;
    const middle = innerHeight / 2;
    const near = rows.map(row => {                                  // 1. all the READs (one layout, at the start)
      const r = row.getBoundingClientRect();
      return Math.abs(r.top + r.height / 2 - middle) < 120;
    });
    rows.forEach((row, i) => row.classList.toggle("near", near[i])); // 2. all the WRITEs (no reads between them)
  });
}, { passive: true });
</script>
</body>
</html>
~~~

**هتشوف إيه:** لستة طويلة من الطلبات («١ طلب رقم ٤١٠٠: اتسجّل طلب»…). وانت بتعمل scroll، الطلب اللي في نص الشاشة بيكبر وحده بنفسجي.

**ليه [[bad.js]] بطيء:** [[getBoundingClientRect()]] محتاج layout محدّث. وأول [[classList.toggle("near")]] بيغيّر الـ padding (layout). فالقراية الجاية مش هتلاقي layout جاهز، والمتصفح بيعمل layout كامل **حالًا** جوه الـ loop. ده الـ forced reflow، وبيحصل في كل كارت بيتغيّر.

**[[batch.js]]:** نفس الحساب، بس:
1. كل الـ reads الأول في [[map]]: layout واحد في الأول.
2. كل الـ writes بعدهم: مفيش قراية بينهم، فمفيش حاجة تجبر المتصفح.
3. جوه [[requestAnimationFrame]] ومرة واحدة لكل frame مهما الـ scroll بعت events، و [[passive: true]] عشان الـ scroll ميستناش الـ handler.

**[[view.css]] من غير JavaScript خالص:** كل كارت بيتحرك على حسب مكانه في الشاشة ([[animation-timeline: view()]])، والحركة [[scale]] بس، يعني composite من غير layout. جوه [[@supports]]، والمتصفح اللي مبيدعمهوش بيوري اللستة عادي.

**إزاي تلاقيها في DevTools:** Performance › سجّل وانت بتعمل scroll › في Main هتلاقي مثلثات حمرا على Layout، وفي Summary «Forced reflow» والسطر اللي عمله ([[bad.js:6]]). القياس هنا بيقرا نفس الحاجة من الـ trace.

**٣ حاجات في القياس نفسه:**
- **[[stackTrace]] بيظهر بس مع الـ category [[disabled-by-default-devtools.timeline.stack]].** من غيرها كل الـ forced بتطلع صفر.
- **الكتابة لازم تغيّر الـ layout:** لو بتكتب [[transform]] أو [[opacity]] بس وبعدين تقرا، ده style recalc مش layout (اتقاس في وحدة الحركة).
- **عدد الـ frames الطويلة مش مقياس ثابت هنا:** نفس النسخة الغلط طلّعت 13 و 1 و 2 و 41 في تشغيلات مختلفة. الثابت هو عدد الـ forced layouts ووقت الـ handler.

~~~text node reflow-hunter/measure.mjs (CPU 4x، ٤٠ scroll × 200px)
bad   | handler اشتغل 40 مرة، متوسط 23.2 لـ 42.4ms | Layout 316، forced 316 ← onScrollBad:6
batch | handler اشتغل 40 مرة، متوسط 2.1 لـ 3.0ms  | Layout 40، forced 0
view  | handler اشتغل 0 مرة                       | Layout 0، forced 0
(الأرقام بالمللي ثانية اتغيرت بين ٤ تشغيلات حسب ضغط الجهاز، والـ forced ثابتة)
frames أطول من 25ms: مش ثابتة (bad: 13، 1، 2، 41)، فمش في الحكم
axe: 0 على التلاتة   الـ validator: مفيش رسايل
CSS validator: style.css No Error Found | view.css: «Property animation-timeline doesn't exist»
(الـ validator لسه مبيعرفش الخاصية دي، و Chrome بيشغّلها، وهي جوه @supports)
~~~` },
        { lvl: 'متوسط', dir: "hero-fast", t: R`هيرو بيظهر في أقل من ثانيتين`, what: R`صفحة landing أول شاشة فيها صورة كبيرة وعنوان بخط عربي. اعمل: [[srcset]] و [[sizes]] و [[fetchpriority="high"]] للصورة (ومن غير [[loading="lazy"]] عليها)، و preload للخط الوحيد اللي في أول شاشة، و CSS أول شاشة inline والباقي ملف واحد صغير، و JavaScript بـ [[defer]]. بيجمع دروس الوحدة.`, done: R`Lighthouse (Mobile، Slow 4G) بيدّي LCP أقل من 2.5s و CLS أقل من 0.1 و TBT أقل من 200ms، وفي Network الصورة والخط أولويتهم High وبيبدأوا قبل ما الـ CSS الكبير يخلص، ومفيش تحذير «preloaded but not used».`, sol: R`المثال: landing لشركة رحلات متخيلة «رحّال». الصورة بـ ٣ مقاسات من [[gen-images.mjs]] ([[node gen-images.mjs hero-fast/img hero 480,960,1600 1.5 13 0.75]]: ‏13KB و 47KB و 125KB)، والخط Cairo العريض بس.

~~~html hero-fast/index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>رحّال: رحلات صغيرة في الويك إند</title>
<!-- 1. the only font in the first screen: the headline's bold Arabic -->
<link rel="preload" href="fonts/cairo-arabic-700-normal.woff2" as="font" type="font/woff2" crossorigin>
<!-- 2. the first screen's CSS, inline: nothing to wait for before the first paint -->
<style>
  @font-face { font-family: "Cairo"; src: url("fonts/cairo-arabic-700-normal.woff2") format("woff2"); font-weight: 700; font-display: swap; }
  @font-face { font-family: "Cairo fallback"; src: local("Segoe UI"); size-adjust: 97.6%; }
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; color: #10231b; background: #f6faf7; }
  .top { display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; }
  .logo { font-weight: 800; color: #10231b; text-decoration: none; }
  .hero { position: relative; display: grid; min-height: min(80vh, 40rem); }
  .hero img { grid-area: 1 / 1; width: 100%; height: 100%; object-fit: cover; }
  .hero__text { grid-area: 1 / 1; align-self: end; padding: 2rem 1rem; background: linear-gradient(transparent, #0b1f17d9 45%); color: #fff; }
  .hero h1 { margin: 0 0 0.5rem; font-family: "Cairo", "Cairo fallback", sans-serif; font-weight: 700; font-size: clamp(2rem, 1.2rem + 4vw, 3.6rem); line-height: 1.25; }
  .hero p { margin: 0 0 1rem; max-width: 32rem; font-size: 1.1rem; }
  .btn { display: inline-block; padding: 0.7rem 1.5rem; border-radius: 999px; background: #facc15; color: #10231b; font-weight: 800; text-decoration: none; }
</style>
<!-- 3. the rest of the CSS: loaded without blocking the first paint -->
<link rel="stylesheet" href="rest.css" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="rest.css"></noscript>
<!-- 4. JavaScript: runs after the HTML is read, never blocks it -->
<script src="app.js" defer></script>
</head>
<body>
<header class="top"><a class="logo" href="#">رحّال</a><a href="#trips">الرحلات</a></header>
<main>
  <section class="hero">
    <!-- the LCP image: the browser picks the width from sizes, starts it early (high), and never lazy -->
    <img src="img/hero-960.webp"
         srcset="img/hero-480.webp 480w, img/hero-960.webp 960w, img/hero-1600.webp 1600w"
         sizes="100vw" width="1600" height="1067" fetchpriority="high"
         alt="جبال خضرا تحت شمس العصر">
    <div class="hero__text">
      <h1>رحلات صغيرة، ذكريات كبيرة</h1>
      <p>يومين في الجبل أو على البحر، والمواصلات والأكل علينا.</p>
      <a class="btn" href="#trips">شوف رحلات الشهر</a>
    </div>
  </section>

  <section id="trips" class="trips">
    <h2>رحلات الشهر</h2>
    <ul class="cards">
      <li class="card"><h3>سانت كاترين</h3><p>طلوع الجبل والشروق من فوق. ٢٤٠٠ ج.</p></li>
      <li class="card"><h3>الفيوم</h3><p>وادي الريان والشلالات. ٩٥٠ ج.</p></li>
      <li class="card"><h3>دهب</h3><p>غطس في البلو هول. ٣١٠٠ ج.</p></li>
    </ul>
  </section>
</main>
<footer class="foot">رحّال، شركة متخيلة للتجربة.</footer>
</body>
</html>
~~~

~~~css hero-fast/rest.css
/* everything under the first screen: it can arrive a little later */
.top a:not(.logo) { color: #14532d; }
.trips { max-width: 56rem; margin: 0 auto; padding: 3rem 1rem; }
.trips h2 { margin: 0 0 1rem; font-size: 1.6rem; }
.cards { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(14rem, 100%), 1fr)); margin: 0; padding: 0; list-style: none; }
.card { padding: 1.25rem; border-radius: 1rem; background: #fff; border: 1px solid #cfe3d6; }
.card h3 { margin: 0 0 0.25rem; }
.card p { margin: 0; color: #335c4a; }
.foot { padding: 2rem 1rem; text-align: center; color: #335c4a; }
.btn:hover { background: #fde047; }
:focus-visible { outline: 3px solid #1d4ed8; outline-offset: 3px; }
~~~

~~~js hero-fast/app.js
// defer: this runs after the HTML is parsed; nothing in the first screen waits for it
document.querySelectorAll('a[href="#trips"]').forEach(a => a.addEventListener("click", e => {
  e.preventDefault();
  document.getElementById("trips").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}));
~~~

~~~js hero-fast/measure.mjs
// node hero-fast/measure.mjs: what the Network panel shows on Slow 4G (priority, start, end) + console warnings
import { browser, throttled } from "../lab.mjs";
const b = await browser();
const { ctx, page, cdp } = await throttled(b);
const req = new Map();
cdp.on("Network.requestWillBeSent", e => req.set(e.requestId, { url: e.request.url.split("/").pop(), prio: e.request.initialPriority, start: e.timestamp }));
cdp.on("Network.resourceChangedPriority", e => { const r = req.get(e.requestId); if (r) r.prio += " ← " + e.newPriority; });
cdp.on("Network.loadingFinished", e => { const r = req.get(e.requestId); if (r) { r.end = e.timestamp; r.kb = Math.round(e.encodedDataLength / 1024); } });
const warnings = [];
page.on("console", m => { if (m.type() === "warning" || m.type() === "error") warnings.push(m.text()); });
await page.goto("http://127.0.0.1:8817/hero-fast/index.html", { waitUntil: "load", timeout: 60000 });
await page.waitForTimeout(5000);                    // "preloaded but not used" shows up a few seconds after load
const t0 = Math.min(...[...req.values()].map(r => r.start));
console.log("Slow 4G، cache مقفول، CPU 4x، شاشة 412px:");
for (const r of [...req.values()].sort((a, b) => a.start - b.start))
  console.log("  " + r.url.padEnd(32) + (r.prio || "").padEnd(16) + "بدأ " + String(Math.round((r.start - t0) * 1000)).padStart(5) + "ms  خلص " + String(Math.round((r.end - t0) * 1000)).padStart(5) + "ms  " + r.kb + "KB");
console.log("الصورة اللي اختارها srcset: " + await page.$eval(".hero img", i => i.currentSrc.split("/").pop()));
console.log("تحذيرات الكونسول: " + (warnings.length ? warnings.join(" | ") : "مفيش"));
await ctx.close(); await b.close();
~~~

~~~js hero-fast/lcp.mjs
// node hero-fast/lcp.mjs: real LCP (PerformanceObserver) on Slow 4G + CPU 4x, 3 runs per page and screen
import { browser, throttled } from "../lab.mjs";
const b = await browser();
for (const [w, h] of [[412, 823], [1350, 900]]) {
  for (const f of ["before.html", "index.html"]) {
    const runs = [];
    for (let i = 0; i < 3; i++) {
      const { ctx, page } = await throttled(b, { viewport: { width: w, height: h } });
      await page.goto("http://127.0.0.1:8817/hero-fast/" + f, { waitUntil: "networkidle", timeout: 60000 });
      await page.waitForTimeout(3000);   // the last LCP entry can come late (a lazy image)
      runs.push(await page.evaluate(() => new Promise(r => new PerformanceObserver(l => { const e = l.getEntries().at(-1); r(Math.round(e.startTime) + (e.element?.tagName === "IMG" ? "img" : "txt")); }).observe({ type: "largest-contentful-paint", buffered: true }))));
      await ctx.close();
    }
    console.log(w + "px " + f.padEnd(12) + " LCP: " + runs.join("  "));
  }
}
await b.close();
~~~

~~~view 940 970 الشكل (الصورة في المعاينة نسخة صغيرة)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>رحّال: رحلات صغيرة في الويك إند</title>
<!-- 1. the only font in the first screen: the headline's bold Arabic -->
<!-- 2. the first screen's CSS, inline: nothing to wait for before the first paint -->
<style>
  @font-face { font-family: "Cairo"; src: url("data:font/woff2;base64,d09GMgABAAAAADaAABAAAAAAoUgAADYdAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGoQSG6NWHJFGBmA/U1RBVEAAiiIRCAqBvXyBoRALhhQAATYCJAOMJAQgBYQkB6VgDAcbsI4X2DaNGnY7gC2f6h0yOa6D84Kg62euo6gdnJR09v//ScnJGDIsUNUsq/+HmG3mrJJRlYuMJvfiqgFlqJeOUqROrEPEs3UFocRxXhmLGNPkttkTRDRaHMNvyOeNOdGpGh5y7O+QPoren9Kv726fcBFtsUQUBYVTMndiY3k6SgkfJUtVaarBB+7g32D1X1cu78CT3rnSB194iTEn845vXEwb9DesLQo9QmOf5ML//+fV73NfKml+QOn1RwJHNEcWR6zhebf1/meKqCigiKSIiKg4QFyIiIioqIiIinOAOPm6KyfZPK/MxtnYNraZjaXWlY1l3e663VhnpTaF4l2Dd2Y3yX2C56EgHKMuy7Kqb4VxrScSCvjC8/3f+7jPzCs/FA9oKMIVONQaaOVQkAMW7RSN/XUnAHyxlr60UNBbFwE+oT0KT1Ignqt9KyJPcjl3cF7Ikw8yAobWWtYaPZHJKypnKnOzoUIp//2PsHkUIm/HXjEvF9W0fKFWDK3zh54Waju94MnZr4+OcjDhlmoEhmxoMMVyPuhQHbuydvTkcq2SgOimAijTnfQ96pdXWcTMkVY/MOdSXT2ijTZTv1oCvvf9teaQS2a+2ltEpLKeoieLkG1e+muAlggPwibMARjP+dbstTOfOL/AZFMC9d89X1AVbncmd5PZDR4m2SPKZ9xZyE2ym/1EoEoMwjApJMn+G1slK3SFMRWyskL21e9b1k5uqH9ptt+hTjiiUXMo5AWhMA6mprs21eV2hByme0bMQnYpCoPQSIziYQ1CG3w+nVk7f0fzMrIVkCcE1qlZOMB+dVD21ozsEVgGrb2ksDdAYIewuqq4omPokjLVdYivv7JIUTQHz+O02SaP1ZSVU5xDyTuwBhJmPrNhV1HktHtU4rAahJ4eo9EgDMpJIEx08rKTtDvzVM6oRihmwuN8i+RJ23uPK4TimiCEEF7XmJCaIT2/p3M/pvU7qVeSLc13l5jYEBBGQCSKNf5WPtAIWFUAkgG0iyfqovseqjeJVQpD+OGhWun5C7gZyoTrHIcANZhpGtRRS0OIj1CyszTQfwzAoJkIB6AkPSmKt96UxMcQSqEgIYIHcp+GBmFSo5OgvcsSmKnKmA28KcdoAE24PFwdMJagsQVBRgZB1QJioXHQKBSmMIUrX89NMRuUyi1fZLDnQ4GAAVQDSADCKXxuqulmmGX549VoldXWWGud9TbYZLOttrnQRS62w0677LYHCIK0pqkz02wrrBSx0RYgAHEk6ISq8kqCFggf1RUUAvaLAqQKUKABEJ1XAAaq9kL1fH9Et4/rqoC/xl5/KMuA9bKiMqEnbTSYILQHIID88SGwKT4nyfG8qN2NNVhIIAhAQNKqBeJfRJxMueWqMWeNOGKfnTZbb7UVzNq1QFQpVyhbGjUlOYkQEK1VAMS5+gUIQ10Aor3DgFjdrUC01+yGfXlLZzgJckCjvaLe2l21MN9V/xScy1f1lNIDUNrH+vDs8t4nZr3KvWsoga78QK8R4OydjRLpvfNQFHACkmfrkYr4ZrLf+IIXeIRrOIUj469hBzZhNZaymZicji3p8B0D0fsedV0dfSUErKBXL3Ll0nxdBSkRIV9cLAz2ILpmfENXadWKNcfV9s6RWVuvX/MsClcs/KMOb657IYAmHlB+XvAGf+NHXMFpDGHg9rqXGfn/egF1AFtNTgFkiC3T4+GfWTaXTfiBAZnfnHJ9l7149DS64mBwDx0oCuu70rJTJI4TKSx3HupzX/TP3utYR3uoqw9oQCmymRRB4IBBiCb8GdN4gitkpBZrZyvogxkNMCIbCZCREGuMfW/CjXOsoa++85mPfegNxzzmkOvttckqc1UpV8RX/0KjEktGzI4/r8sRIPs4SkATVH8kNmc0dpf1QApNsJPtTRvPWMsLKhJem1YkDonPo4BxrsfHoeMGMJR6eFw9RoAh2I3j/DEK5B43tXbudfiCOl9eQ8j98+KNTpZ/vHirFzOjml/Z5iAE3UcTkOdzToGdGYJ9zVxK6aGDUG6srrWQ1Vtj+4sWxUhpdIfykB+qSXEVx5/HkVVpuVjcwiOLU3OxtLpRXf/19WC4nIN2YMuMwxqHX+XZ56PLKhq3ldq4gouM0l3uReeS1OSj1B1H0j9K+TGJbhi5x8W0dyLURsN459Wpsbxjo9TQKh5GqXyZmWOH5Pk/4FEYBTBM9KMNApDungQAQ0LwjeG1m9iDTRE+nIeDAD3jXFY9dDEp0WPpOmHE4W1lmDu2GtXdfACw2O0/6Cxylh0kuoVPj7tykmM7Pe6aL860O20XJg2J2ByeRr0fQxn0bPtVMqsOKaUWZfexaIDvhvb5aDgahoO5756o8/+7RHcfmDA+11sKj/gEduEcLtBTcGLuxGoC17iLps4t3LVTVtbtyimf7y6Uc004P98td6tOHVPl4jOTyaJRR7I5by8m4Wg6yo5Fvzvrrd7nMbMM/itluzrL2EoNAwosV4nVx1dalgcA9OZGVa0Za/GKsXPNtnussgdHn+1zCpN7MzXWX11PKefIOSa3l54Iz2A7+rEeSmAD6dh4wfH2DtKTqe6mPEcy1XE3t25J3ZcQ0Nwl7GFn0wfFtj//oBfU9xPe7r70L2ljebCOiX132FOaaFnr/IaCUdVfvCDshZjphRfvWypCVCK+aWIC962B9VVecyOKbHZvvDpb5lEk20sE6Ht9efBqdX6MvxkiZ4+aZVjFK/ct04nipREJK5cphHSJhHD5CuniCuFiCeli2PaL1CREZtFYEavm1zknppdIvJhz4t8l2vV4+c6fbT41byGuzrGLSM5yEckI0REk0T4kYufczNZjNVYI82xnLUB2Vc3yWYhEZM80oZ7KSI4kkiARIVMgeJMTMZFEdCSCMq1LeAzcQn9GIWYm/OFvxrPx93g0fhz3xo1xZVwEpzGMQ/nQ2I4YHANRH5JoGZKoG0m0CIloGnXMKErHgMgfmUI7VCJ2yGpAjKDcf3gh2MNZ0IadIKKxJYD6varv+ko8Wb7hnxy17OfcEpZT+msf9k4n9cBEz3dUnnusB7q7W7sR/ViF3ryzbV/yhtZEYSDFWvPc6oRp7IQqIIXoCeGyr2+7XA/cnLV8qUa012L0ayepBBRaeb6+BTyXaSDaZtP3Zt6JLXmvLXlVqv7cVjK/sUse/rNTGWx3MYoLa+r+lT9V/5KdB8JOvyPoUh41YM5v0mgspyxCa8v2pjTfyaqiV9X5s02FMrFRDMNSMrrKHVMx+VlIqr8sza31Zk0oPxcn/KHGicYXQgt16BOIzc3InuSHKJGPaE1ytm2u5AxbdYabNK87ySxAYul926V9zKNeqEvYXH5e/VA/A8Y+aWaywW1ploXsuXNroNTVs1t9z5AtCzYrpseHcPicZI8b9khmsxK8oSYJxWSwDDMyqy+orfjMIQkZCtmbkHMqA1H2yj7lXLjjRBfpc6f3TpI7nM5ZTut61OOSMS6PVh9Fk9CHDMk5xzqdayv2Sssnz2/OUja0+G4b3G+FKLlsccLrFhlbev9veI9siwGQ0J7T7OtD4QdNK1rC5gu2i7LBaMuvXIUV3xa/Xup474ZWznNB3EGzTH6NS7iFGMtPL9t08sCjXdF/+MTUAWf0ahNiyaYNu5m+adaA2dhmdnc0MYodFfZfc4L+bz0Aa2wSeLN67oBqAUmuKIcQFAIP+cBEJlC+fjIAFAMgwQDwF8QMwDeAD7X6oiz8jSfOPRD3cAlncDE9AHalWzRdJ1iL5fHC/wYXYxqimzlhry4Hu92DUkv2mtmTd/H4ry91VJspLN11iDFiCrCP5WG0XKRAgFVS4ibJcjNhZmM+zP7MY4EUUMwcL+2EV9Zsuggmyr1Q/B4FMJi3WRKhAISPr8NSiIuhpMMemGCyDXjg5Yr3T+IMAgYAWqjYBAOFrgfkNhcm36eboPYcVezKAKKsKo//Y55IMlHkoinEiGVUA9Hiplse+sGvfvOnvzzx1CuvzZg150NgCAWhIQxE0lY7yTJ1lSNXH33lKwAGDwMDzDHHQAwbBjFiBMyoURBnnQVx0UUQY8ZAwKAxMoKoUQMCgYBo0QICAhBHrtEFHSqllM+XYoCavi5nAgIgOm8t6+QYsHs2ZXgDGnA9DxyJa/dhZQ3QftgiCX+rSg4Ud2wPAemL6iIjEP01IweA8J1RXwZ4FH7nbeDXQMCChpHnlwlA4P+8zi77eX7IBxMStH2+OuQeQe473VxjRcXDt9Kfwvg741mXqdOeKdu1y8WDhYeDiY7CWgJg5AkCZjSBwAyHD4wsAcCsjhCYY9BjzihfQvEnwUf7nU2FK5x48aTH+wKBuOIOGyYs3J7AI553xziTakbqhrXmvj1mcpXI1c0SuGLxTFRhqXFhAQ+Y4jrX+J7LFyDGDjo0SFCq7FWEjBOO2ELF4T5uWaggBU2ONURghS/WB0s1OAEMNliBwgJchSXCjDkNjFb/zM28HvsQ84Q/d96VX2RmjpcjI204QVypBu9ZuDLRceZYNSDURdZQk1NWVcREZKSExIMlOAT42LiDecjoaEgoqH9lw167JydYYbmNIMgwOHDiyl28BEnUUmil01luhTWOOuHU3C/HPvA8GkMUNA2lb8KcltlA/ksSIGINiT06JjYuHn9CIcQkpGTkFGIpqWikyZSrUCmDKnUaNFmkk9kyq6y23kabbbfbPgcccsQxw0adddGYy753zXUPTHnquZde+99b78364JMv5iEhFISBcJAFZAlZQTaQrWSpOuiokwt0ASITBhwWWGKFDVSOXLjx4M1PgGBhwkWIFCVajDiJkqXKkKNACb1Kteo1WqhDj6VW+tZaG2yyzS577XfQYUcdd9IZF1wy4YqrJt1w3xPPvPDKG9PemTHno8++BkAGoSEshIcIEBGyhkjaSdFemnQZOht9d4g7W2t+nicffIFCxUuSIl2WPEXKVKhm0myxLkss9401Bnxnix32WGDvu+fgtdTckdEwsHB48SUQRCSBmpZOtnzFyvvk39+uW68V+vRbZ9BWOw1xNuK08yDcDXu5Ka+0GzfgGYTfQQSlJCNVA4FSnPEmOG2/7LDUz37khtOGDOhWJx8HAwRadcAyer1k0boa7dhsi2223sW2yYW2wXbbbKcYBAuWyLZqmq68ol1VtRpZ3FjDorsIBQsbq2lrrBUElzYtgemFIqISRZe1SKmhWld5NVXnZisQlr8GIZW/9iCN+8mW4TldoJ00Z8EAbGp0AGoH/UvLV0sE4fG8TY6znaYx3G8F72oVYCvm+oxx+P8yEMmRsLvgJjxAv3IWQA5oIFspgDQfIM/16PdpFQJBAAx6XI5AAAgSiQIU0FBRZHIusoMBcLQKCihwoSPW/11e0w6LGlOkrS4FVhqsFZbKiQuRNDp6tZotYkYQGUIpeVUDE0si0/NTMhnoqWQhS6NjE1Pzy1euWr9Jf/2NllhhrY22uuTp51965bX/9wWPhI6NJ8L0104IDIHBkSgMjkBKTkFJRU1Lz8gMxhKpTK5QqtQazdavn+cDZRoSXa6kGctngHOXbt1vOmVU0Orik13Zirem3rjfvp+jLLbMSk02a37q2RcfhPPPFcOKA1eeJAApKBxRY/FEMreuoWNgYoHGk+lsvliu1j+A6cdb/s+u/r8LoJ+CnMhE8H3+5egemr38umututu4ubMXrDm6r49eaj43z6E4WZrVP9/4AKDZTlsf778ZgIrziIHUnOwsyNy9F+4Qb7TL7I6XnQANBli6lLDmTqD/FAPKdMwx3NXwjHLCu1R7WehoKqmX5hBKI02GzJ1QNll7zSMXoPyvvYQiJQCVU6EKoCb0z7eOGnXmWqyBL2wPOvanzhqtEVHMs0anW2Cb7Xbb6wr77He9g251p0MeWKGPa6mWFoLGEhyHWXASBqq9vjrg3Qvinaa/Vsbpdx5PHdvgoI/W9C45dvucS6+wzFBFFmBDfQxYeXVpf5/4rE0OdAxOuLx4qlKjmj8Bvk7dupj1WmKzrbbYbcgeY0lRa7o6s8w2w0ycLXDWeefcD8MAhQbOFjvcdsfdfYdHfvd41qhMZUHPq3z2tYc9N3tpzHgSGCKNJJQv5kcM/3ty0JFZT4OCbAcyevqUPc2ByXJlc9x5vj7CoMAQUaiSoTmBlxRZM3TLsb3Aj5I4K/Kqqbf73fm6+H/F8lVg9/nGav3W2GjQd4aNOGHSdVd876prJlwGAUW5DgBNAYBLBdBOQPrvINtXAon9AcEpAGDAUTMCBCr6jK4rQIMmSNSqQkAHmwywvnBgeGqdCGTNfhk+eWDSSZgVMx4Mil4fvyUsjsSpRaAwCVi8HmRYVD0MI1JMflhRTf72xRWEOdpHG9OJC0aPTXBvmtfGyT2YyYkJJ87icCBBMuaHbqrrIkS/LxAVgENq2xNj4dhiACk5socofCCOq8UNE+lhw2ABp6gQ3HKg2xmHjACemIzCWBEKcYWvYtE7cHiqezHsr3OnmtpvW6WiR3TK+ihMqdJGFm1kw2ypFajTxcnT+OdXeUT33F88u8WL3nn3zGzOZuednniyn6YQELaqaCL5YaBMv/wW5dKXMRHn89fFnWFNgzpvFop5q55poO5QRi8D/XrLSU2JKiFgJdb99VDUuA7o5yKAdzgulkibkDdQMtjE2ZuOMIFPeTtWOqjfUDRehT5D4AfWZWwWz8NU1emDFg3NODI0Ia0D/dcolgC6OWcYKAG1eCXte6l89Vb9o5w1G5X2Rnt84L3/ZdpFYhUlog8hJ0lNDcKrp810xJ8ek/We9t0Q8siBQRKcbVB37CGN7duNh/v7iY8dau6U4PDOl8ybFCaLTEMG1YtX50Xc3oCC13bu5cTeBWLYNGg4PtfO5uPPoMQ1YFUmUFVB1kOVzgngBIoHU6Jb5YumVE8i5Ku073Z3qVY2TgtyYAYFLI1XgUQXGCVixWQfCtMLrHHXgawClDZMMm8tZ+lp/Z3HieVm4kA0fD1j55oxeBoOSSIrWXGSKicAtAI5wo/ZmErXjFDDB9T5TDNV0whLziO3BXwHgypBrbWGVaU17R0YY+Rcsfg1ziLTElI92cvwGDMoJOa3h1GabgOCY+3Uxbk0GzNoDb0aO3L9YIOyWy4krGjA6FF/GZ58fd0nJofa0U2gx6aOvBVfBvj8uEU0Tb59spKSEmWvk5zGVJ404vo55l2URWah65jJFqxkeFQoWTo1m/I8cvWFm0hWF2mWMGifuLU0VjObUR8/u+ug5KP3rN9VAglJPZvp2f7c/NT107NrzO6tHYV/0U4cMRcKKWS+J1oaWbFCNND21PXjTY73zheQNF1fYhLHhHAZ5rv4SHX5bai841a+m3ZZ38dHxmRHSvbucigfpA3i9xNDahPtjdkne5xBxcRiplMLHTwSGmQucpRyNxRSwOklNOnM7hhnavPIbUlCGvC+b07jrkik+6rP+rtS7XwL+3UD2udMKetVaL1DXmfM/K5N5e+zIYgTkp2VqCyOLiXBEszNLj8uZ8BQ1U3R5cIgXXKrGE2BMq7/XWUsR2LKtOq1x57OC6GxXZloa/o4iboIqcNjnXmpauC5xUedkoYxhH9Eavg3pYsajbvySFOrpWW3PnXjd/PhSUr4UYijrduX36SOyIbikvw2Z9fkdOpz0qzR5jKbN3kGs8iQRBZQBg/nymn/mX96iWl23ym9DC+twfiGWOKjs0cBO8zwsNveUmCX7uswGR5pGaWHorC91L+jwZ4lO2Nmnwmr8aiL9FoqxF6RdVTuiu+dJ/oxP+SO9AK913fDYA6+pX3Vh7Q6+lcYqZW+Qcje6m4/QfK/w7DAYoUtGZrrR1zLirMVTpbvENpNJ2gZ8TnSbGrrccLKQXrtxBCzI42pAuKcyTK+6dp5OEzXFvaeXQKpbeaItMezuK0T8QUbr2FQTipvf3prf7wqY7az8p9r6zSZv/Oi64vXl3Q8qE+XNViUdFi5fDV9AiAuqpxZTeeGScTuPAr/k+U7L2AooaQ+1bviVZeGpmg54O6MTvvBt77qnKvKmlbjVs2JBWq4wbLhwBmsGzFltikXzChSNFYk5Zo0h9bzNWs9C2u3ogo1fMxNN/zrx+wbbwFqkx5X6w37VozZcGKCCmHnSzZ5hpKVM7G2Tnc6w0lvyPXTIdlfoqqWBMY7JrMF1aXTGS1vndc38/NIavZtYASaxaA59nB2cRb3hoY1i7Q3dFfmqQPd+6YXtCSXqaFiPjZHG+Z+DmlZoyBT+AYttqGhTGrTLjMclAq/aILdmwhxp+HpiKFUhx4OjWxHhWfRNnTWCtnZKWypaK8H8oYKmpvtYS9V2wjZQzc/nXFBLo1xTwdmC7ii0L7R1XY24k/kGUXffRQ+v7Ad7lKt6yUMMnEgmfpjLUa+RyGh9if0UXbjwds1SE3eFdjkUIHyCDZG2eJpNxVOtEzO9yT+Rt6X6HjQrcuzOecypvBJl3DTlzHCuGNXq2VOglGPYzg/eHh1r+i/9+ta32WE4r59zXfkxz0hVDmBRX/ph3Xp49vXpXlFzu5ttt04fbvcjTPoUnJTe6xPOZsa63e9Z4ZrCd732Fk4Kz63nypiVzbOUMx4g/DHC5XQ8r1PKA1aGevrakitaFwkpcXUebq0Sibj7k6OytHslXq2V2Re6HlmfIF0nDDcWZ1X9sd+oN9Q2talhyqsYHE7XKgI7AqlkY10Au68rNJx7rf41zJunNewNGm+Q9hfoZ4UxKdO02ZDEXY20hMHS22VjkPL43GdxwaXJtUOwjhtM+yYJ97pGI3edKLSKb0JhOg6DC5yUr2H0L9Alm73C0WWpDvz8V+K+txVt/nI3aPXdW6nG2Hcbj50uxFJOLS3mg3fYVLduDhSF3v4tJ2aY4Rpa+fMvvNt87Rq8nzw4m7jy+7WAzQuFH6UCt4XkvvS125LQ+cuJ0R6gb32m7kZAUHcjJjIXHagp4oyHpYvWubgccSC41Iy+F8h8gkBmeM94+B3pA6Z/RO2b7XYsiSKlRVVVQZqK1YHKys1NG17Pa2D5vdtg6NHl3O8ZYBlp3kGWBQ9AiXyeib0ddul6rBlKqqVXcgqHIKcTJSOpzZrjDgLSSNgIwsRgGAsYE/rLinbkxG+rOqZAYAi+Do6D4Atx778CUD2Z+VkDQ4kNwXICuXRsoImocbYL44PVztqcBzL8tM51jxNW4hCH4//P0YaIBRKAxRWcAGuBjYBZCg7J/vckMxjOl/G4mr8JkP0CEB6JKESn5WKCEWRZB3TFveeNBmMfXW1XOu9PG5nuKomcHLnI0ay+R2jMTwxi7wePOe1BnggeuRa3mHfNzvDqbHFgNRcm0MTp8TK8GSHJOy/hf5enZW3ppUyaDhOWiMABBwWPtFcpCJTNRTDSJS5iJKR5Oz2MFmn4SY4j+iR+WjGAT+J7rNWd3+ga99cwr28DMGYMfIgfYEIPEE6EFnssNCsMv8CmTqb3itJrI6hYCIJyURtepctQWZdhUu04zYrmYHBUS7/uW0wb4hVVnSIJmchUzLT7uewy+bLGT7VOQFKyDPJ2TdZ66eyOxsteUTCSS01LZ3kIisdXuVABuOIHgnPn+PNKN8lBjEgRw3ZVbzJU+3sfMtOEb7kM/I9YaVEzbIuF1Fnce4xyOpHYeY+gCQz7SbF1OPxpdXldAJtML5o0+bcYt7sb11vagruhTrLF3O9E1wjAxeOvnXOr5IkLv8hniKQ5fBEifSCwL9BC2JAQh7PMVU7KfaLfJ1jS+9ot1gg/wYsAOFN/lM2ilr2MlOnubPS5EwOAZphUCaNlVCQ0982jXeVXUyXIiNRlsOWRGXzwhIdD933mpJ6ksCfmkgQKZKN1JMldArRIyw67pp84wqYCI9koR8bdwwZ8yMytaX5kmzU+AkqwsO8C+NjijkhzpGWP3Uzpi0h+8g47Cgelxn9HFwes6vwSA9peEBuXvizPdfurBw56CqN0IcZnfz5FU5hEXqpCyOaL4sKSmJ6TSJbVEv4lRpVoWehZ+iefJc8kpdXHkk/0j2hAd65yuScSKrpV+Kna4ikkiWQCeU0BRa6apmupryTmLIgP8aIdingzCuc+P5GJ+923EJ2bpZP8vR6VoIjuEJQoNqnlaTvTDvCMzYKt+luVLTiRZXS85HpieQcFbC4J/4e+L86FWORD0YZFBYL+5SnGf2E5WkaYbUxJO3PGXAd0SMncrFdO/R33xC+33lLGx5VtJ8QO155auUmlSGpRDn7gIjzV+rBibPQdInjDXIqNoqQTExP67KziLSpxCdSuYpoBv8Z/8N013Eij0gOkjNsLhRWv7rTY2JL24LVQIkYEP3DMIstmrmxAVJPGYnSPvP43ngyc4Rq91NfxZnjvcKc66xfNI2CvPb04FPVkoHp1E4PZfglaYZnUJxjluBHbZrOHFTzzsK9E0VdvdSnsj490Hrbn0uxsPK662/JHC6+zONUlcQ8Hb26bbNU5xkcR+vXEsBADAiVkmkn312eAb9onassxyTlRKDuY+HJsM65aMvWTTViQEDf+kHZDnzlcSxZoknqIUHfR5+LBO/oFVYaue2fqasDkUzc9Ny8xh1POzr3bYe4yQ3zjTUINCB6pJc0KXAwQ2dvC+YXWVtjGjeP/x+3Fnntav7aa64W2T80RcT3WJd4qMJqKsPjbXzESt61c0Lj3hCOilCeklhGiMEksNwxyqVei1iJh/FpfD4+20qZtqGEFBaZTbspsUrkzfDyMqJsSDqvNF82MW8VSEEMSBvDYefinW/8JMTQ3K4hbvx2UNuQ0FNF0GkS0wjROBXHDRvP+MDhF/DpfIFFNvH5NJXYSjIb+KLqvFlHdhZQOpw00iGVmiBSFvrm/lUU3tQclJG5CHrLiv4aDP607vmQ2EFxKyT4lr1CDJiplYHCSq1WWOPvXvdJcz5xoaedQRwaa+sdj4Du7xZbxComA1s3BHirCOWaxDQLOS7JnY2N20BfxAonSnGp1dDRWqkoL1X13q/Km7HES0qtSiL/w5O7O056W9TqydFrKA6p29SpyjQNnhe4Wesy0nMmRqRtcD+Kn0cRV0sanvb9yEeylfvTeGX5vonu6eg0rJtVBi2DXGjlF9nCKlCHLimdajQJ/P01qf6BgSn+/sl8gUHgmBZsbx+T5ii4a5osvNeftIHVVUEpf2550YE8uSyRfedLoQd/GrHol8bD50oalq0sY0m0jFXAcOIgMgMXWrUxZFyOhdpue2B06wxy8ExNGEq3LRvOVYW/qXF9M6yazhqNvq0LVUGeNBbnkBvZ8CMDscPT1lOJPQfaBLHTsYCLrCl3/bwDp2IDrDO4OnLRkaSQD4WQDyr2pIixp8aUrnXgb0SPuOcfvt7U3RS6I4BVYx/gRiqCAQstYCD1aZ5qRI8ozXblb2e7qgk/NjZQozG02LfCk7haOH42ku2gr5hkuaywKQDARY805EhiN4vfH3SzkVXsZKmvTkjOIiRWdNlutiygcDYkMIVOkRFSmau2JelYhuv6azxZqLbCS8nKsUgkWFfF4LJwTPdbEkeq0iR5Wq3hdDAU/NiISkSSzE0YCjk9nEyvVTvrqyVnxOd9XPYX9TcE1L0vQ+hb8/LKiqjM+OCAPWX8rp4uoaNOLCtlJ8QMad1iUtydw5H0kmzEGDN82dtKgh9VSjLT5f4+R0R+ax4fMd0Fms+A6JH9V/xG20SATYk6FGAaJe7fpVqYZxapQxiyOp+sqvt9ad9EFWgaSCC28bIXRJTsXH+v3nnGPAOQ+a1158R9vOWIQZMTS5TOEUwFof+cuIS6yiigTQ4SQjW7HZKQzpke7idgTaaEpEoiLgr82erzAWJAMmvmEPAGB6vSkIBXthbkMwHL6T4yIiiA93W4O3W144sWXATDGNK8mcBP+eD2OZnYOxk5OmQJACzgPOfi8Vxx4nf/QSA/8G5NsebXxhSy/myksUdgTL6ZFTMzEIfU3ykgdyhIZlTKNWhfZ09nY4Wpm+b4My3HGFJd1PuY3DKLaqNrTtZv7qKc6LsfYqD4cRn/eKmP54pmpoBv1r0Z83ii9CRycUH9vfr91NoBMkj9ycyasevIFKhUuXA0bqaHNqPIpTlzv36aasUNshhvVGeu2+nIBgtNPLif3Cgsnpc7a7Z1JHegTbnIqw6dJpj9RIL/ZG8a1LomkUZXLQIRK7y20yU9Ja8RA9KDFCKl4z3jroJtJ4+oLRznWCyfq2Q65J7GZ/mwWHPW1H/2j1qrWLqN1qvTbkf3v6dYz7HOv0ry03C3g89ylzWLRV4NR5PjherACyAJ37myE1T19/SvD/56xKhLrAJzPEEG63aB6rX1CXXLDtctPVsieBla35vea8xr3L19UhbszUz59RcqZcvx+LsNUOzkBv/wjPBwcYaBLyMPfy8kGHemUvziPb0y+XCfzMAXZ4rF4d1fdLmJn+XpGe9HSd1BMAqvDNssMClMoBAVUsJSR/uWynmUMl5ZVFq2MEyUHRCVxiujlvPkvqXq6FJWkMlPznaLDeLT871VVXSnPJ6KnscPdIuTs4FjU3l6MdLeD2Z+WNM7lKYL6ksIOajrfbQGvF+z8dGa3oO6hJA+XdBQWi9QFauiFkf/FSD0D6JcLnGu2SXFO6kNYcJCUZS0oDEw+UQ/GHCUGReogr2SBVt7tgYkCzSiKOpvrBJziVxe0BHQ5djf039SPR4XHRqhjYmkpLlZR+UXaXDuJiazlgN+gg768qdto7wjQxoNJmXQwc9RCq9Icoyf5zWyVdD8nNBHs+EQbX7uHeCdH5+Tl5WYnmeRkZqQEZLrUhTkR46Bv9ls64gW72Iy14opgGcdbeCLjQr0Z0ed+E+4oOZhDMU36/D0ErzobE44sCRbB0z8hAivprQyayQGAcVjIl5WYqDA8Q9VYz5DiPgl0pvQEpe1JLuhHxzGAOX6mkWue1wgLgLI0XXmOoDndR11gcuPTQPS4c7uOFH7RrQcpBgB6PNW7SQbi6fWE7aE/T+/KfDjfGj15luBG1gTC5Sb+5f1g9DbFUTHhccTKp/6RfISc1gxzlEWUptSTGFAXIl9sK2Hw/k3T35oCqZRd1r8GJYvBy0tNm55C0zkRdIIcvsCxK0AtD1wLndstGkODrZpdqx3LnkAVrXUYUmpQtgYTT9oA02VxkpzK0J6U+XGvW55wLFOkm9TWMqqy4vzjyyMLojyj8qNZZlUdE5NA6xtgDm14DeHbT+d2M5R1LXWXeowtZiAeMr1DyPTNft/V6n9S5rNb11JWlEYMeyFaFA6eKEkZ/5ZmGY+qMNL+9wwMVEMyDeW+ywH6t84oTRW0GY3cvNPjG7YYv7G1w4+4rjpOBDrDBthJ5mP1ge2lrtoQ9xLcfJNV69+pNOfnWy08PndB5BpPo98QC7taHLSiqOjpIE82nB8N7s1IFbud6NWKteKXn8VHr9AP+z00wE6Y/8vTk6Tgwz64LUD9q+oDq/sHb46UL+CZFqMUJX4cxaFEj+56biM4ko7ywAtdbT//2ZgnfxGLD1wpPd0+nuSBdVx1M8Jy3h3FzS/VrEGagxeYPu7wGh3X6wOdkp2dknOtWOpC1bykjuYUPw7OB8QgEBmviG5ii2hGMeIjQK9WG0X//6p0bjd+zHTGo2r33NB9UFtnBTj/vvHSzJsi6R6ydTGyeTdLPWSYEf89u3BYlDCW16MbeVvhKyzbjrv5yddaUT6M8xq0fElWbzUqrGyHq6qhpRbei5WZmvjGGUUm+xSGjgpPXhjEPXAeci7ytQlDQjYp0E3CisWaG+YeW8Qwojffo0o48Vp2DDULxWL7Wu8HhkZ+uR6maaRbxPHuCW7JK5VgMi6ybyoII4EszmIeJVGfFGBN4EmOyl5hqVXY6QUbRqnJWQZ//ravYA0w8xKGfzGTGVZRFNNIJ8+EqsXSJHXrJDOeYtYMX1s1Baz1VtnmIpivEhaey40/sY6DFORI16E1ot073sbDFORUS9CWx2jlvMf35ZjweIHibanayezP8zUjesFtsSP33rbJJdNWGD3IOY+2NCAbnCMHNCabq7oerZl5txktrLBYEy6Nt0o6BxoezenB9skG5veeEjpUSdd3//AvGPAG3YrcLp+GEfRGde4Z8ZHo6cXxjuttVKBHsWxK2hrXFiB3ZpvXKzMwbEJW++A97K2reusZn055311P17+vS3ydov+9WYvZ+36528crih0D/qmnm5SoXrLxAUK5TRDw53Oo3hY0TQA51C/3L/t0c00Zi/t5+tbPA693CS/D3k6045heHVxg/s6pMte6dbClLdMViV5Qt4zdaJQJg0Nh3RZPEs9H4X5Wfl9XlbJXAkxQ5jiWe73HM3c5/UnN3b9aRmdfnDrb5VbSWNGlOFxm338TjS3KQz6xY/tae6UJZOBffpbo/ksq9odc56zTWE4e1zjMZmrVLzwGfVmSxo1gn/7uhbVCuHEe/7MtWwTXONRS9rw8ZTc2J1CmjCFwSjx4yj+1M6njCyIo5UaQ0LzZJwbtayaBApjc1BYLSZzlRjyyEfv2NpUFfc5xYgGt9QMRKaEPSHOnt+zOUJoRLq4dnJbLFL33wc5ClwRL+nSNmer0V5aKSyOy+5kvgrbjE2hLFchNATwF2GhEmJJ2EbFNJxKqIxGQS6X1gb/HvZS+F21guXlMQf+fuNEn9VJB/r34a4s8H9/vW1T6QZ9thpwrb9mFoF/76WeSqBmYB4yix4E8KIGKNre1IQlCAlBGZsIEvkzXbCl7tEwcKb+fllTj/Rra+azcJh5Adtn6rJt8O+/3K0viX7E5VYA+bL/8mTb/mz8uMdXw1dxUaP09pdxdZd9WWd50/81KTT/xptuREG1geyh+UsIZCDVvjtfcfP+vv/fIRzn8f8dfzm1bjV/bzmL9uzM3/xi374+7/r5lB6rrvW+x774PQaQALAW7d6J2yql7T9DHcasW6FmnJS8YH8BVLydpIOJvcjVUXQYyx3vWkAzxMz3C0tjxuu32drmKVH0zuOeoLTNzA4gagE4MAEvgkxUmu/OBGREgIWysGphNalCNctm6IzoXs/ZshWMxNOtpI4dQdZKEuyIe87FI6cgO2WmZ+NzEuLLlh0dGaFtpUXVVgUnNWA/33iBp4QtdKIq2G/RIxEZTVKjVuiMceVTKqXrTpNW9/KWjEPmFOlEjFhuV0wopReZ4K61Ii6GIp6YpeOcdLJPLNtm6kcYhOUudr0aGJsXWAGrSVaTqpACL4C7ZlDKTNzqaja4EjYejJxfzk8SNlA5Wy8NWQF5G1xZkOV8Da54wIpMWu29WC8yuMKec6IOZiXm7GmCvOpVGaN0jcGyVw6jvPahxb0lQLWswB4R6jQTq2ycMM3KCdE8qRtO++tqUa84bzZQpZeUIzlDzISHyN86MkLetVkMvR2zbpUh4/hPeVbmJCoa+67OXB44I8EMvZGQFSQPR08ENAi1T2rTKn6bXXFuy1MlkgrtkYek/nl2RUKoVQ8ZqamSNA88VL2sTNQik02SIFoFDyWSJqHeHb8GnKFzUHpZY5c1LXqLkRVgAyHIqOQirCYp+usgWxW2gQ741HoHouqU4FFC0CrPyWElFyTdeX+URH1mduFSScV1mU1V+HagXE4rNhGoUOUwrqvWAapWIkV7sehqlZCVUmQtkdRWZMCq6Ktjh9nhGw9HlfZfOV3hE0Qm67UHLSWSQu0VKaH+qvRZ6Y6V1LEAv2U5VQA/qx/TfKccZKORM9f3glAKujls1toIz8u93VpgMx2B4JmRfp7j0FRjj5syW3O918GUvCKymtOwycQCAc/DFailhCI40JQBayfH+XpiAoHRN6wwYLoG+Ow1heHjSz1mLnvEoyyIHfegAycxCe+yzoFojjLqzsPBAALgcr7298qB5l0X/45HoZ4A4NmtA+s1u73/Mb1QgKMMAoDAvkSgDp4l2w4IyF5f+j++j6bwHLWKIX55tgxOQslMsq9wG+fG95cKviX2FYa1Am7XjYhuv3AbQkhlv3V9iNQXe4PF2NYvN6ttQQw8Rbz6eNW8zpFh+oZ4DN53Re3n6pc+Ntbut3rQRAHuzpNhfXS/6MqB8HHR3P5G3SuoDikXSicQsXgFyiEJg1sDpIMjD5KDhhNBm1DatYHX2HBI++D2MNVdW1ChTuGDU1iLwluZa3wkP/Cc4fU7T75pODZcdy6qPXWlgdRWQVrtMgkqyCFetqpRHG3gFrnwevFO7LaSalZHkhjVO++Rhb1br5IvIDQIIw30OpkZ2VdwMo5ZneNw6/5lM3tpP//yjBECdxubIXippM2R6EGMB4hvPtEbCZbOXSbce87He75+5Seo7RpSwI+eAOWBoDMDIwNb6Ci2Y7/afUAjYg3WeE+CcKnM5Ys+Hz+B0BlbhHPEFv/Abhhv8eRcDeVDkWfcwv1/uD6gu4EeH9QpoKrYVNUrynMjNwjRRQTOtfLLBPlQIuH6TZdXgzxPkXKulUJx7kLxM6DtgjQwFsa5p7wuGTOI0By3WAJBruKS7eOVhQIFmVzObzuepUMJkI2jS+MviS4WScdRiM6RR8IO/KZk/TilyV284wsawbwAAmgKNYisRfzrQ3FAWWngV8mbtWixmXe7QRB4sRsMnr93Q+Hl9G5oKHbvhkHESLH4dexqjRBbgvr4aaDWDaxPAOHuRch5o6yBPM3CVbOUm7Bb6mmZF8svQr/T8OcXN8WTHx2WxfVhoo3Saofm0dknYQwclhOX9i7rm0RLp6jAte2AAF9+gH9YWbbsQ699tr98Q30FwpxGjQAmKWo8XsEGvZ5EVDaF+y7DbpovDgj8p3goU1vBlOkoq3daeXIcVCJXpyL305QA3BPyzz8oZaUbXUVCi5po69AYG01/v+LhFCZVh4oF/PGM5gcFbV4viIwSNvfSoRuTShvLdlzPfxHRtcWEMi6k0sa6FxSdUxBGcZK+NrdpQat+4Kbt+uFZ1j0s6/YEbUz/9nndz/uBEIygGE6QFM2wHC+I0pOyd1U13eAnZv971/ODMIqTNMuLsqqb9oXFb83LZ3oXX1xcu/7wPxoGRyBRaAwWhycQSWQKlUZnMFlsDpfHFwhFYilpGVk5eQVFJWUVVTV1DU0tbR1dPX0DQyNjE1MzABEmNMNyvCBKsqJqumFatuN6fhBGcZJmeVFWddN2/TBO87KW2vqYa5+L7wfvkkOSFVXTDdOyHdfjBUAIRlAMJ0iKZliOxxcIRWKJVCZXKFVqjVanNxhNZovVZnc4XW6P1wcEgSFQGByBRKExWBw+6iOSyBQqjc5gstgcLo8vEIrieqRfIpXJFUqVWqPV6Q1Gk9nSytrG1s7ewdHJ2cXVzd3Ds2qXyMai/d5eqSd9ZgTfW/YkJZdqSChoOAgSieUedKuDJm1Kv3oplvwm+x+xRnY5XeVRcbp91UKuGfabkfOe7RDKvzmSWuDJmeTd756C9wY4tR4AAUigtpU3VuBdayAlExhR4sxBsACiYpaiCUIVKtW1VIM6daMr1RSMZIq9yXnnPXBNQqIDzHse1QicApAuo0pUeg41wMFCIwABMJQMMhBZg0IVrjc5IHAcyQOB4+gsCyKwozgiIqIPajUUdkRFz/NNilE3SxK4nGW3g21aoDZZ8RAwcPfYzWHuxGn5/ze8lRd76yAvJAJQQT711T2kwHiuLM3FQaoGVbyhKJnElIC0SYKUSRLGBXBDCwchbELRYB0IOQoQWZMCYSeBolI+2DW8ujQvNqFYUQkKOSuAh5RXIUB0zZy894o15Ii0jFPUeWcoNWnkPbEwgjUkCAThXQiATn1CTxFAVvRmFGETiKQHDmAAoFqAg0eA/r3ZGeXxWx61O//ycpTzAg6iCQEAEelKOm20e29fy/kfefyd/ycZxTpuCL9GZw6Z2wxr27MbGwt73tpZ+84Uw7OT6bR5zPQ//ZuHy3qxn/hqnlaVx1sWgENCfYQ+LblhYOERfhjOSm97ILK0UkG8SRA23ALX3cZ/xsPqo757YkackJsmh8BMK3twtturJxOefHzFT4PDqNh3PTtUQ4/4hd9c9mSq753lWTmJBQoECK2qiOrDSOvhiDguhZ7HVJQNdBHWl7m1052f7sDRfGAIDroLYqQnHV2EBUErD8OsiwOKGEI9va6C2nA2D9dbu2ulWmhF5IGFhFtKHbRkVaH5Qk3Zg3hOWZWDcUEhQERapzPk5dT149u86CGe4TyqUb1aTqIDbQVxweNTLkD4pK/LWpxnu08S6lw573kAAUXGGAUNC/e6v9dM1ZpzkMTu6uGq5GVv2G6PRi8KAAQDh4CEgoaBhSNviIFDQEJBw8DCdfzmTaqqF636rG059WYW2HprWsqd/eT/p8zY0ePyMTXLy//mTL6OR1lCnBb+qzL5Ph4px8Hh/6Um22f/nRkmjEZYool9X892waU92D7cmqTD0HMIiDomurbWywQuTQPpQb3y0WczqLWF1yaA8nojvG95VdEpjemUAqNFU6fYQOHarwAgIhLRsgbPtyCje6PiG6E6ntIxnVIkSOpcaQjIX7q13KxLu2rm2dp8PPtR2/wv69z7Nvo/31NrJQA=") format("woff2"); font-weight: 700; font-display: swap; }
  @font-face { font-family: "Cairo fallback"; src: local("Segoe UI"); size-adjust: 97.6%; }
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; color: #10231b; background: #f6faf7; }
  .top { display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; }
  .logo { font-weight: 800; color: #10231b; text-decoration: none; }
  .hero { position: relative; display: grid; min-height: min(80vh, 40rem); }
  .hero img { grid-area: 1 / 1; width: 100%; height: 100%; object-fit: cover; }
  .hero__text { grid-area: 1 / 1; align-self: end; padding: 2rem 1rem; background: linear-gradient(transparent, #0b1f17d9 45%); color: #fff; }
  .hero h1 { margin: 0 0 0.5rem; font-family: "Cairo", "Cairo fallback", sans-serif; font-weight: 700; font-size: clamp(2rem, 1.2rem + 4vw, 3.6rem); line-height: 1.25; }
  .hero p { margin: 0 0 1rem; max-width: 32rem; font-size: 1.1rem; }
  .btn { display: inline-block; padding: 0.7rem 1.5rem; border-radius: 999px; background: #facc15; color: #10231b; font-weight: 800; text-decoration: none; }
</style>
<!-- 3. the rest of the CSS: loaded without blocking the first paint -->
<style>
/* everything under the first screen: it can arrive a little later */
.top a:not(.logo) { color: #14532d; }
.trips { max-width: 56rem; margin: 0 auto; padding: 3rem 1rem; }
.trips h2 { margin: 0 0 1rem; font-size: 1.6rem; }
.cards { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(14rem, 100%), 1fr)); margin: 0; padding: 0; list-style: none; }
.card { padding: 1.25rem; border-radius: 1rem; background: #fff; border: 1px solid #cfe3d6; }
.card h3 { margin: 0 0 0.25rem; }
.card p { margin: 0; color: #335c4a; }
.foot { padding: 2rem 1rem; text-align: center; color: #335c4a; }
.btn:hover { background: #fde047; }
:focus-visible { outline: 3px solid #1d4ed8; outline-offset: 3px; }
</style>
<!-- 4. JavaScript: runs after the HTML is read, never blocks it -->
</head>
<body>
<header class="top"><a class="logo" href="#">رحّال</a><a href="#trips">الرحلات</a></header>
<main>
  <section class="hero">
    <!-- the LCP image: the browser picks the width from sizes, starts it early (high), and never lazy -->
    <img src="data:image/webp;base64,UklGRigTAABXRUJQVlA4WAoAAAAgAAAA3wEAPwEASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggOhEAABBpAJ0BKuABQAE+0WiqUaglpCOi+AmRABoJZ2hv5+Ov1c/b+/yGzrlN/JNdxGP15i1vLBsLZz0uv3+b2duG///jy+W3phHNu5R8jf/DipwJmkMvP5/D9kRZxHzynk9egD6n/0eZuvqsis2S5HM7W7L///XmKokhTBD5EKYAHxtYdAeezajVgPrk+nUtOFPacBSFbuc9cbQRkXLC2JAiDH9pPub3+Uz5Pjdw6srSUsZTKAXMF+fGAz//9V+7p30QU5YyiFZsIBbJFzq+XnV+7b7/Wu2etLigbIXZ0RcWXiHFl4u3QEzj1eESSyMQCM3nrPt1C0M2MjWoxM0qDJU/TgC2qWnIxApLWK9mXzemxedGJSz2zPqC8XuPXH+t0zBAUbMEdebgRNVOdSsJEvKJMwQ6pdVn3RKaXg093aTcSrkeDt2suWkFBQeYrHn2zM1sK3INolW3YqwHFfUehJpUREL6aO7l9IcGEPIhOBMzKIBcuekN7+IBCIuAG6/+pGs/ecdxNYTU2OU6934cHLbSJNguf037lzxXeLdkZc2lRTROQJWdKYlTDa3ZRsD+IDdDGgsZUvquxKyEDdMf55EiXQfUG0koqELfaODRhdNExfsXqypgU8geKIwiJg3PjqaxubmKT11RWhppTYALadB94uny8lMUIDEARy3x8IeII1kAxYKbXnm+qorliecydT4ievQKCS3e+ZEM/ius3141jNYXixcNg12+UqTGwD4clfEOpAFkmDKG8iF3WBbhAG9k7r5tPT9AkfAjCVjbs3B4b80gvWCH1DLOxxpM0NJjLiY4nj2jMHM5bt3pl2AhsRnsIX6E1YJdhYfXePziXj45SQTLlwZ9FBmLmDg/4ZhoK83D4NqMIUpXKQwsCNf4nqJFLG/fdz6y0fnjorqhJRkpaJR16OQ85ZYV731HmEwOYB8vWJQC4JBUtSsGurhAABJT9W9UEELgE4NFViyX0PqM8iP8gqDifA68nTV95lAque5feWW+RNVW12qKw5I5wMfF4ehaoHlF/2YEVCMELRDyhWpD9izsdX6hosMpVsi2Q3DZ41PPN1TfF4iXfksP2vQUHFzsnMcrN/N0PnVv1OLc+CsFbLDfXrxDzf3FGitCmACAwAD+kAXX9vL9Yy8ZbLS2Kw1LYdrvZ7TyEvNBSk33NtD/DWnfGHYzYki2XymSazF53z55TLwT10QTcUbDZeWlEb5wj28p39atigYCFYVsnLb9tONyiJ0kJw7zH+KTcOBkQ4Q3F6J/oc6kHiozbHGnAetOoGzz6k0JEmT5kVmn9J8WWBGZrLakiMYT9a5D0ZerJdZHjuT5iqmP9D17PLdkC6zmF3PlcfBQhKF9CzDTRrqDQwEvihLVPKb/fyI0Jg1o0SawKv/8gL9K1eYYp2pKvGAaImmLH7F4aHOrYxZTTuAn7fhEaeCDraTb9JgyhCxUal5ua2EEU7dmFd44BopR7273SQvOeIfHjpRWtg+0WRxcLY9/SWL4fVTV0T+M6KGvwvs9ROJU5FWO8bklfcj5Vj0ckJRq7LYPpXvsjqvzb+JPEhIhQpGLgjGIvqt2o9J7MzSktZnzCkeAEvRqFvtZOYi/aGTPq3IXd6xxXGTCBapqTDFTyeOM+0tUvtAh6ivvWuW5PTDF3XBd5ALe6xk4rfkgFAezsn0FIUu0huyxSjxuaR5h/pwrV5xciQGz3hNBvn1L0gggZWxiyB9UQjLB8OCMFJ4BNayuQjPJg6jThIAz+WROCQpsOBpFuamMFkqWRa/bHjQt8HEJqYzuTHXHsT2AovHRCJ2Q6XjkQbNWbYlLTdqLTJYoi7f0PChUX9SwbE64m7T7zMMqGmdcWWumN1YPpCqxHs0PJhe1TXCFwDbbuyCC26XyQZOEdljk9B7yEDhqCntRYrK4RZyTfX0+coSpgQ2HuXp4HYLUR3iFeYyv4XTiYW96a89zV/Bl4WlMI3vP7YIxKiw1N7k2oBDHNH406VCLsoq24wl9Ka6jZypMFb+3MyhLwEDIXkYUK3UZkgBKiEaBW9IYAlOw/S6zYwWm/MeNUbryMuMT64MPWnhyFzTwFfphn5tKF1HaRl4xe1fP01bAzGtxGbn91Ix/86PR5izuqz/wSWRcXuT3srfELTjG/BtJzntlroeSz/+6cDy3oLnECDaj6m9rl9kCFsljQzowRaBUpDAjWG+Mwq6GzaCF2bqiOjh/9mHXGcgxhqNFN13SJ+XbaZTES9UBfpOrt7fD+8zr3iZARuajTdhydwsAjDbHMOtmZ9CKzsbr6OmzB9nHR4QRMVwLOh3jpX4xfLVkfuA3+hVeZPKxeFnVg2wTBnjIid7l/W3NYFV0YNWCMLYVW57iy+p1Js2SYarYJx0Fn7Rs+DB3awPCqcxcmSCspST3m6hpH3Vc9Ly9eK0K8GyEBly7nBwlNaFqMu2M6xbeVOqzBGfZb0vbGPNhGSSYzXmdcJhEgjt5ly28m8FEuYMoUfRsMl1hpJ/Td/JdqwTkoKeXtT2+m0JlqhKvp5KFR7o5HfU0engYBnCJHj/K8NTy7RaXfBDW6DuHxIXRgeDM6rsAiWLoc9APLEv4m008cEvjTksuv2EUy/pPa4BEqx7CVitohl+J+LuYkrTY52RLL41g0IO3OGWPTgKCawl2YCuBFF1fCiV7vhC+K4Z7SxNaeBRvBVPcYQW5Bs9iexvTN2MY6Rw3IuzJSgOHGaSIOKFg8IdVgjLEYgtaNRl+bmCNKlrGTJDaaxPSOrFnnMQGeKn2bD95vPy0N31W6lPCSqy8/rowOhwv+0FVz2y4ngQyaZGKO78iUH4vj1TNKHB5NY8Eym13l1vtV99+T+SbID1zjUkg17rQSBpTJwRME7cdRahD3nidIOcRdHxhmRbZ85gdwYwU3667IhRYDwjx37y5tgIjwbOpAqLyQYlqX9njdWdsLqSGoJMifed1npq5EMQGqZxht7E+p0MFdtkXQ7MPXnYNoOJFrL4qfeuhNKeLlhjYT1uPuhCkcC8SmMEcHmbN4Zm0FYs/GSwNzAKfAQLuiGGCeKwXU8ly2j6yqVbp8UeP/gzh2/YHZCM0kKbwyOZfa2tePOF3NCrV2nUk6PxcAtTTG+vjADIw1kQKEALDSfEaUDldwfBvvf/xg7+2cP53iHVaUM2V+NqCWUmk9ybUndSvMauyjbmpkOCbzY9cKfBKJaM/drWr7lZFGn17HB66Tb212x0EYIUdLJkFnWYDDGxi5w0n1S/167kU8bxtzngu3izPOjWli7h0i7GhLsUD9el7+oxAd3Vg7zafbh2w7bisgMyPnRaugn3ggXlIP76hmcV9ufjPueaYEfyEAKlz4aJf5o1pod3D4EFj8BgTL4WPac4XPflxw/lopoNqGQKzBjmGkTJXrFb5SO/kY2nRWcr/1+8u+ftuxn5bx9ThyakuivDTCbllZgUgxowGcgRsRI7ekHAOSh1N/MiXviAaoBU841iLsfyeWnz3fRsbcRblLXkK/UjRYRw3H6BUUYOTzYwYOHQVIA6JiWMYshhDovzuogU5PNoaPAfj8v0WPNlSxT7AVuXUZzFUy7GDU/IhdcGAZ2rWf+raaXeOq+6O2mXDWHPGbbLVqwNVbSSyH9SCS6dAUk3D8/rMwOMMufRPzrgrf/gWhaU1aSBNejLNxbodFn5kFn1g9QUoh6N11wlqSLn9XVeZlUrYcbgdQvq7PDbqxCaHmvHIEL7pPjNnfUxjrckMPbyMd4ga+FcHsqwGeFO5tAsuc+E9uCz8oDGfANx0L9RB18sauTwB8jqrcOctqfUMvEBJ97DnPGZOOHqUtkdE6gEbPuZxva2msR7WvWf8mvpE3fkNZ71vyKAmb5jiJOvcz6O+huBzCfHG378NFsMf8cx8Xn3Co13mfDOPchir/+XolkOA/nDq+ls+Vyq4Ehx8+ayXH5iCJGrnxyIOq0fNDZiq3Qr5Qk58Zb6ZR9SAnpB5QBSfz3p1zw6VOwQTpvqT1W2de+JWTlvSD7RKdn/kUZgW+fbK0FcRrO6AwkXvrbql4kGmM5vLbNJFgvaSM+zLtCgP26jMpv2GMJ/CyJUlqV8dRCTat6rzY7EwUO4mt6e2B5hGy96p0Oxcq2iJarffhpGq5sxFxndijkuuGn/yqdLDE+Ljcs5txASfQzKSTEZrY9kF68rEbSy8xMOsRI86yCHGgfN1G139+HvoazKbnpwQc+XK6H7MlMg8yjHyLNNb1vWSZvB4PqrKrk6CHt9GVAMk3Feg4OcMH98yneG4B2cTnultklcLbMrY5YPI9grROYn1u8j82t9RTwtj93Ub8V5Yee+dWd3dm1mqIJgRy1Phy2Ickb6eA7aw8rtV1oeeqEDLffVz668/8cBVG8zqQZ68/WGQroqj+pAoDj3I+Gmcbj66ZV8m79FwJ1O5JjE7DfCEXA3biXBzeABZURpvDJnwwiCepPAyaXQZyJuPbS8il9Ihof3f0fQGO/zeLoXnZHvbZqIJaGM37vl4g2NowF0NZ4xi0j8xfvt06j8v/wOW0sPtKzU4N2NWa4RBrO2GKG8ygVr9D6zv+tS8cWoGEC/VWSyHKWaLFns5XLnbdsIKdNQYCWwenLpcqg6lVzNGSrLOQ0Sm+X4cjnuOCerUYaRPKDW1dXqZ6bInzEaeJFZX8z8h00H/Ki28IO/PYezvX7u505ErKt7x7ExsG54sJ1Kbnypw5xAiNLdIGhiutIHUC5R9vJhdqJI4rW01G4LtWBQGG+EowdLOD/RMwoMgn/lFnQpKYrrXk4HPXbGWZ/N6bhGryMIlhgGKYEQuFieS0g1vRdLtdVH0qMGjAix7jxZWyl1WksOxhI8xnFjCaz9iBuWZXfxbVPfFsmmYbPJFgvPJRBm36F45NLO75rNJNHnj7AvndBm/DNtC2Bj2S3k+7LM+HfzvceoZYLzbj8NG2mPuJlkbGwM4NoT5VH29NbWnbpbL7+RsQxpbyjKaC35hybNG8/bNyQBn0L2KmzdXnR1jhVTTmY8ElmmKG8p0mzDUcTn7kBnyt09LWCHkd1h8q151b35XDW6GUNwciATG5rsJQimHNNGOVBxF9ICNr3oK+lGro7z2siF72zfH3I/1zfUBuIleJMmUB7zXZoXp5Un2/OXCu411YlukXhDKhiJKVDaMh5lHVVde/I4KuFxzIx/zba2foPL+nB2QHGw/h2EqFs7NaynsBJQ7Chf62p3ZEKeVOV3dpwNRe8P80OR2f1oPSOsY464mBpaFMaaQQ2x5gJGMyz+O7MvVuZDPfxE8E+bfBsNDBCTRWoislK1X+0RUUNXKg5dYkTaRnWExSO+NKzZXaWi9+FMDMBZKEjZM/tYTVo1VAAMbXx+XniA7/GFpICFYcYcsts07fQ0x/BPL5EZwZ7eCwFGUFzSXCgUPLVk8RGBIHGqdO6dsU03F6j/jomqnEW4diR2SnFzp4GyK5uumxVsMOgakXnQRCu7ScbK6kX3g5PWCKqb6yUjQZ0IZyZ5HcOs7rVnDG34/QF0Mh8FZVkvqJbbhC7EdNbeXxElpZxW4t7e3EfiJu0AatVp5IkbmOLOBRg+vbnRNX5CxoiD1PxwF49CTNW1P65ZgT5eZa2v6im5GF54YdNiy26A1ExxbsDuOxfWEE3GKi3H/S3zc0N53vS4LEYd6eDvm0qsgkGEkPmZvDLIlWgmq748VYdZDW9il8q3UbyPVTpYovvvrFvyE9OSXvez4vjU55PSySivWpFfz1SjvkANZRcnnbBSNYMVaodRYWOViLz6D18/muFweSWMs+yHD3W/II4L07GWB/ciuwo8ERt/MoZRU5yq2ApDTBMMbE5IPKa+2c8YROMQJIIhLJtL74Q5kqmPeCsXulCvQujYJKt51wJ7/Xp2jL4wAAA==" width="1600" height="1067" fetchpriority="high"
         alt="جبال خضرا تحت شمس العصر">
    <div class="hero__text">
      <h1>رحلات صغيرة، ذكريات كبيرة</h1>
      <p>يومين في الجبل أو على البحر، والمواصلات والأكل علينا.</p>
      <a class="btn" href="#trips">شوف رحلات الشهر</a>
    </div>
  </section>

  <section id="trips" class="trips">
    <h2>رحلات الشهر</h2>
    <ul class="cards">
      <li class="card"><h3>سانت كاترين</h3><p>طلوع الجبل والشروق من فوق. ٢٤٠٠ ج.</p></li>
      <li class="card"><h3>الفيوم</h3><p>وادي الريان والشلالات. ٩٥٠ ج.</p></li>
      <li class="card"><h3>دهب</h3><p>غطس في البلو هول. ٣١٠٠ ج.</p></li>
    </ul>
  </section>
</main>
<footer class="foot">رحّال، شركة متخيلة للتجربة.</footer>
<script>
// defer: this runs after the HTML is parsed; nothing in the first screen waits for it
document.querySelectorAll('a[href="#trips"]').forEach(a => a.addEventListener("click", e => {
  e.preventDefault();
  document.getElementById("trips").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}));
</script>
</body>
</html>
~~~

**هتشوف إيه:** صورة جبال خضرا مالية أول شاشة، وعليها من تحت تدرّج غامق فيه «رحلات صغيرة، ذكريات كبيرة» بخط عريض، وجملة، وزرار أصفر. وتحت ٣ كروت رحلات.

**الـ ٤ حاجات في الـ [[<head>]] بالترتيب:**
1. **preload للخط العريض بس:** هو الوحيد اللي في أول شاشة. و [[crossorigin]] لازم حتى من نفس السيرفر، لأن الخطوط بتتطلب بـ CORS. من غيره الـ preload بيتحمّل مرتين.
2. **CSS أول شاشة inline:** المتصفح يرسم من غير ما يستنى أي ملف.
3. **الباقي [[media="print"]]:** ملف [[print]] مبيوقفش الرسم، و [[onload]] بيقلبه [[all]] لما يوصل. و [[<noscript>]] للي الـ JavaScript عنده مقفول.
4. **[[defer]]:** السكربت بيستنى لحد ما الـ HTML يتقري، ومبيوقفوش.

**الصورة:** [[srcset]] بـ ٣ مقاسات و [[sizes="100vw"]]: على شاشة 412px المتصفح اختار [[hero-480.webp]] (13KB). و [[fetchpriority="high"]] بيقول للمتصفح «دي أهم صورة». ومن غير [[loading="lazy"]]: الـ lazy بيأخر الصورة لحد ما المتصفح يحسب الـ layout ويتأكد إنها في الشاشة.

**مقارنة بالغلطات الشائعة ([[before.html]]):** نفس الصفحة بس فيها [[loading="lazy"]] بدل [[fetchpriority]]، ومن غير preload، والـ CSS كله في ملف بيوقف الرسم، والسكربت من غير [[defer]].

~~~text node hero-fast/measure.mjs (Network على Slow 4G، cache مقفول، CPU 4x، شاشة 412px)
index.html                      VeryHigh   بدأ     0ms  خلص   617ms  4KB
cairo-arabic-700-normal.woff2   High       بدأ   627ms  خلص  1380ms  14KB
app.js                          Low        بدأ   628ms  خلص  1220ms  1KB
hero-480.webp                   High       بدأ   628ms  خلص  1390ms  13KB
rest.css                        VeryLow    بدأ   633ms  خلص  1235ms  1KB
الصورة والخط High، وبدأوا قبل ما rest.css يخلص
تحذيرات الكونسول: 404 لـ favicon.ico بس (مفيش «preloaded but not used»)
~~~

~~~text Lighthouse 13.6.0 Mobile، و LCP حقيقي (PerformanceObserver، Slow 4G و CPU 4x، ٣ مرات)
Lighthouse  index.html : Performance 100 | FCP 0.6 s | LCP 1.5 s | TBT 30 ms | CLS 0
Lighthouse  before.html: Performance 100 | FCP 0.9 s | LCP 1.2 s | TBT 0 ms  | CLS 0.001
LCP حقيقي 412px  before.html: 2020  2060  2052 ms
LCP حقيقي 412px  index.html : 1388  1392  1420 ms
axe: 0   الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~

**ليه Lighthouse قال إن القديمة أسرع؟** Lighthouse في Mobile **بيحسب** الأرقام (simulated throttling): بيحمّل الصفحة بسرعة وبعدين يقدّر هتاخد قد إيه على Slow 4G. في صفحة صغيرة كده (٤ ملفات صغيرين) التقدير مشافش فرق، وحسب الـ preload بتاع الخط بيزاحم الصورة. أما على الشبكة البطيئة الحقيقية (Network.emulateNetworkConditions، زي DevTools) الفرق ثابت: ٢ ثانية مقابل ١.٤. الدرس: لما Lighthouse يقول حاجة مستغربة، قيسها بالـ throttling الحقيقي قبل ما تصدّق أي واحد فيهم.

**على شاشة كبيرة (1350px)** الـ LCP كان مرة الصورة ومرة العنوان في نفس النسخة، فمعتمدتش عليه. والـ done بيطلب Mobile.` },
        { lvl: 'متوسط', dir: "products", t: R`لستة ٢٠٠٠ منتج بتعمل scroll ناعم`, what: R`صفحة فيها ٢٠٠٠ كارت منتج. قيس وقت أول رسم ووقت الـ scroll، وبعدين حط [[content-visibility: auto]] و [[contain-intrinsic-size: auto 320px]] على كل كارت، والصور [[loading="lazy"]] و [[decoding="async"]] بمقاسات، وقيس تاني.`, done: R`جدول قبل وبعد: وقت الـ Rendering في Performance لأول تحميل، وعدد الصور اللي اتحمّلت في أول شاشة، وإن الـ scrollbar مبيتنطش لما توصل للكروت (بفضل [[contain-intrinsic-size]]).`, sol: R`الصفحة متولّدة بسكربت: ٢٠٠٠ كارت في الـ HTML نفسه (445KB)، و ١٠ صور منتجات 300×300 بـ [[?n=]] مختلف، فكل كارت طلب لوحده زي ٢٠٠٠ صورة حقيقية. ٣ نسخ: قبل، وبعد، وبعد من غير [[contain-intrinsic-size]] (عشان تشوف هو بيعمل إيه).

~~~js products/make-pages.mjs
// node products/make-pages.mjs: writes 3 versions of a 2000-product page (same cards, different CSS/attributes)
import fs from "node:fs";

const names = ["سماعة", "شاحن", "كابل", "ساعة", "حافظة", "باور بانك", "ماوس", "كيبورد", "لمبة ذكية", "ستاند"];
const colors = ["أسود", "أبيض", "أزرق", "رمادي", "أحمر"];
const card = (i, imgAttrs) =>
  $__bt<li class="card"><img src="img/p$__{i % 10}-300.webp?n=$__{i}" alt="" $__{imgAttrs}><h2>$__{names[i % 10]} $__{colors[i % 5]}</h2>$__bt +
  $__bt<p class="price">$__{((i * 37) % 900 + 99).toLocaleString("ar-EG")} ج</p><button type="button">أضف للسلة</button></li>$__bt;

const page = (title, css, imgAttrs) => $__bt<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>$__{title}</title>
<link rel="stylesheet" href="$__{css}">
</head>
<body>
<main class="wrap">
<h1>كل المنتجات (٢٠٠٠)</h1>
<ul class="grid">
$__{Array.from({ length: 2000 }, (_, i) => card(i, imgAttrs)).join("\n")}
</ul>
</main>
</body>
</html>
$__bt;

// the "?n=" makes every card its own request, like 2000 different product photos
fs.writeFileSync("products/before.html", page("٢٠٠٠ منتج (قبل)", "base.css", ""));
fs.writeFileSync("products/index.html", page("٢٠٠٠ منتج", "fast.css", 'width="300" height="300" loading="lazy" decoding="async"'));
fs.writeFileSync("products/no-intrinsic.html", page("٢٠٠٠ منتج (من غير contain-intrinsic-size)", "no-intrinsic.css", 'width="300" height="300" loading="lazy" decoding="async"'));
console.log("3 pages, " + Math.round(fs.statSync("products/index.html").size / 1024) + "KB each");
~~~

~~~css products/base.css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.5; color: #1f2937; background: #f9fafb; }
.wrap { max-width: 72rem; margin: 0 auto; padding: 1rem; }
h1 { margin: 0 0 1rem; font-size: 1.4rem; }
.grid { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fill, minmax(min(11rem, 100%), 1fr)); margin: 0; padding: 0; list-style: none; }
.card { display: grid; gap: 0.35rem; padding: 0.75rem; border-radius: 0.75rem; background: #fff; border: 1px solid #e5e7eb; }
.card img { width: 100%; height: auto; border-radius: 0.5rem; }
.card h2 { margin: 0; font-size: 1rem; }
.price { margin: 0; font-weight: 700; color: #047857; }
.card button { padding: 0.45rem; border: 0; border-radius: 999px; background: #111827; color: #fff; font: inherit; }
:focus-visible { outline: 3px solid #b45309; outline-offset: 2px; }
~~~

[[fast.css]] = [[base.css]] + الأسطر دي:

~~~css products/fast.css (الزيادة)
/* off-screen cards: the browser skips their layout and paint until they come near the screen.
   contain-intrinsic-size = the size to assume for a card it hasn't drawn yet. It is the CONTENT box:
   the card is 314px tall on a wide screen and 285px on a phone (measured), minus 24px padding and 2px border.
   "auto" = once drawn, remember the real size */
.card { content-visibility: auto; contain-intrinsic-size: auto 288px; }
@media (max-width: 40rem) { .card { contain-intrinsic-size: auto 259px; } }
~~~

و [[no-intrinsic.css]] = [[base.css]] + [[.card { content-visibility: auto; }]] بس.

~~~js products/measure.mjs
// node products/measure.mjs: the before/after table for the 2000-product page (CPU 4x, cache off)
import { browser, throttled } from "../lab.mjs";
const b = await browser();
const RENDER = new Set(["UpdateLayoutTree", "Layout", "PrePaint", "Paint", "Layerize"]);
for (const f of ["before.html", "no-intrinsic.html", "index.html"]) {
  const { ctx, page } = await throttled(b, { net: null, cpu: 4, viewport: { width: 1280, height: 800 } });
  // the browser keeps only 250 resource entries by default: the first run stopped counting at 249
  await page.addInitScript(() => performance.setResourceTimingBufferSize(5000));
  await b.startTracing(page, { categories: ["devtools.timeline", "disabled-by-default-devtools.timeline"] });
  await page.goto("http://127.0.0.1:8817/products/" + f, { waitUntil: "load", timeout: 120000 });
  await page.waitForTimeout(1500);
  const ev = JSON.parse((await b.stopTracing()).toString()).traceEvents.filter(e => e.ph === "X" && RENDER.has(e.name));
  const sum = n => ev.filter(e => e.name === n).reduce((s, e) => s + e.dur / 1000, 0);
  const firstLayout = Math.max(...ev.filter(e => e.name === "Layout").map(e => e.dur / 1000));
  const t = await page.evaluate(() => ({
    fcp: Math.round(performance.getEntriesByName("first-contentful-paint")[0].startTime),
    load: Math.round(performance.getEntriesByType("navigation")[0].loadEventEnd),
    imgs: performance.getEntriesByType("resource").filter(r => r.initiatorType === "img").length,
  }));
  // scroll through: does the page height (= the scrollbar) change on the way down?
  const hs = [await page.evaluate(() => document.documentElement.scrollHeight)];
  for (let i = 0; i < 40; i++) { await page.mouse.wheel(0, 900); await page.waitForTimeout(60); hs.push(await page.evaluate(() => document.documentElement.scrollHeight)); }
  const step = Math.max(...hs.slice(1).map((h, i) => Math.abs(h - hs[i])));
  console.log(f.padEnd(18) + "| FCP " + t.fcp + "ms، load " + t.load + "ms" +
    " | Rendering (style+layout+paint) " + Math.round(sum("UpdateLayoutTree") + sum("Layout") + sum("PrePaint") + sum("Paint") + sum("Layerize")) + "ms، أكبر Layout " + Math.round(firstLayout) + "ms" +
    " | صور اتحمّلت من غير scroll: " + t.imgs +
    " | طول الصفحة: من " + Math.min(...hs) + " لـ " + Math.max(...hs) + "px، أكبر نطّة في خطوة scroll واحدة " + step + "px");
  await ctx.close();
}
await b.close();
~~~

~~~view 760 900 أول ٢٠ كارت (الصور في المعاينة نسخة صغيرة)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>كل المنتجات</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.5; color: #1f2937; background: #f9fafb; }
.wrap { max-width: 72rem; margin: 0 auto; padding: 1rem; }
h1 { margin: 0 0 1rem; font-size: 1.4rem; }
.grid { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fill, minmax(min(11rem, 100%), 1fr)); margin: 0; padding: 0; list-style: none; }
.card { display: grid; gap: 0.35rem; padding: 0.75rem; border-radius: 0.75rem; background: #fff; border: 1px solid #e5e7eb; }
.card img { width: 100%; height: auto; border-radius: 0.5rem; }
.card h2 { margin: 0; font-size: 1rem; }
.price { margin: 0; font-weight: 700; color: #047857; }
.card button { padding: 0.45rem; border: 0; border-radius: 999px; background: #111827; color: #fff; font: inherit; }
:focus-visible { outline: 3px solid #b45309; outline-offset: 2px; }

/* off-screen cards: the browser skips their layout and paint until they come near the screen.
   contain-intrinsic-size = the size to assume for a card it hasn't drawn yet. It is the CONTENT box:
   the card is 314px tall on a wide screen and 285px on a phone (measured), minus 24px padding and 2px border.
   "auto" = once drawn, remember the real size */
.card { content-visibility: auto; contain-intrinsic-size: auto 288px; }
@media (max-width: 40rem) { .card { contain-intrinsic-size: auto 259px; } }
</style>
</head>
<body>
<main class="wrap">
<h1>كل المنتجات (أول ٢٠ من ٢٠٠٠)</h1>
<ul class="grid">
<li class="card"><img src="data:image/webp;base64,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" alt="" width="300" height="300" loading="lazy" decoding="async"><h2>سماعة أسود</h2><p class="price">٩٩ ج</p><button type="button">أضف للسلة</button></li>
<li class="card"><img src="data:image/webp;base64,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" alt="" width="300" height="300" loading="lazy" decoding="async"><h2>شاحن أبيض</h2><p class="price">١٣٦ ج</p><button type="button">أضف للسلة</button></li>
<li class="card"><img src="data:image/webp;base64,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" alt="" width="300" height="300" loading="lazy" decoding="async"><h2>كابل أزرق</h2><p class="price">١٧٣ ج</p><button type="button">أضف للسلة</button></li>
<li class="card"><img src="data:image/webp;base64,UklGRqAHAABXRUJQVlA4WAoAAAAgAAAAnwAAnwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggsgUAADAkAJ0BKqAAoAA+0WCmTiglo6Ipt3rZABoJZWKO41Pvz79jNkuOeVXTPHT/rxYVoLCFQDOAc//BL3nZ+o91euHsUYE1zeSkDM7yzoeiOhKbH0REwWqk8w7Wq2NybKP+j4xXP+Lugd6ckoNDt6X2MbSjYhAc9Wc2qs5Ttg2EBfUuK/NSYjXdshPBQzVIdjE6XaFiZflMW3800Edg/GY2Fi9sq175Hr8Oiiq7jrNks1BDV3EPSntH8cisWbUFWeYw3ffKF4OdW4UN2XbFobXdTOSx14j99YscTKC0/td8hZYYdXXupspANQyk2n2jsb/CbSanYwB5EP//CXJX/yO467P631T9ZYI+z1XMp4IOHpMStvI6b4dR88fVf4AoWLZ67AMzvvZSHyoVaAAA/uqs+EX92exGRgB7pP1P8whq8/f4469+VGW5vvehInLUqY3NgIcN6yDQ41YtsvLsTiItUQg84qvSLE6o95LaDgU4I8A33jwz14Xs3o7Ga/JF0IYkOXo8qMoRJpYHCQ1qRKum6QsCEIKpXJZYOJaiF37xEmrIg3h+FaUj/ydObg1lrLrxBoTuI0YBNFDvPTdtudExp3gpGLHhsLaCX/MJJFNmb4vQnNfLLW+LvU9F8DRRX5c82UbNkRAKOVCRIylCO8OLs+t2DNx/9IpZhtjqI4VsFkgvsg7a9KJxA7rY6Jz/exlXDdtfQM1wddT6AUH9oFkPMQy4E34DzPKEj/EqIvw9f+HAHe0Ds68hBBx+V628kN8OmoJLOZn2nJhlHLf7hqVWmB8TQh41CQghSkgXf6kbi2Ttf/7rltvAkGNoI/sNZ5qL3an3Qj0tbvlh6keQwrZ2GaTPwkWo8uZQrWfz0/KJmTON3pFHA+0HU/bFBBLM+Kl6wSI2wRLKovNUurWsQw4iumCnEaBzTWXGy+cgLadJSXQInH9DgJUBv973c7qzJ8JDi3OS0veLodf3KPC6D3wKKU2hnEV46+rp5ADSCvcT5SshS6+yJvnLqyt2gC1bGXK4Q95QOnsy+gIxx1/3ti3TY4EO7GebmU3XRhdzD7mozMc60GiP8yWHFzTqwhtn2sAw7mgXMdzb+uqPLMW8TraeV4EDyPdpNct97vPjyyhiSP+fRaYbRKEIPmdRMnOTLsptK0Yeg9HPLb2RxbKSdEor3aoTQw6vbi8tfgquQE6Ggctd4TLe7TjiHw/bR8Gv0hxCbqNxIT1itvf3XMoBIOtGIL01BInxXhCFTvFDVbLDXtIAhyg5Eh6YJ6NDcVK6Bq4QlKKyto8YbZin+iveKSM0CB3vGYJ/gSEyqZWRcb4nfIKliYwPcj2B1+UEZXyREkY1IDLLZc3OkNMcS7NWagRIGVlTdj/EjhZFXYUmCChLRTNTKMp8D939Rm8b5CzHWxbyalUguGIGyYPdJv4GgNulk2tTwPBjJa57YTwtFfFUCHDkR/MdmC6CWdJXTV3Y1sSZgMlJG9FKJ949verh7aWpPVSy1RspKYmCabHf5pHupSoMNsZ71nHKlMtpG3IWzsba/7aqEfgNajmcldMaCtlGmptu2lb2LDiAfHdJ+3ATcUEZZDq9jDUNFthRbUcdggH/tCrV6eenW+klPDwxWGYh1/q8yiJpYNFr+9pglCMfH+MAQ8LZbTArC+Yx1ZCpeEqv1HDP3d5ykXCSvGDxMIJSlOafPu+x8oqAtPa/JyrPU5Ibq5VN/akgh/xYi8cBKnv6vfgtrKZ5skvwtOmHdzpwgNw07tWKtgN5edi82c5n2yiFekdJ1fRKtFftCRFyB+pc7qSFdoj8YoPGO+NEdh4G/mEIAFfjMjAAeDaf3p5BtzEyLL+mWmJNw2bshr4VRnEi4+jBiHW+U3UAWDE/EO9nudlSWGkHPUxPphXqPo0hkYkOrQYSvoR31fwHYi0DWAzWTZyejq/rNlcoDS+30cAP6wAAAA==" alt="" width="300" height="300" loading="lazy" decoding="async"><h2>ساعة رمادي</h2><p class="price">٢١٠ ج</p><button type="button">أضف للسلة</button></li>
<li class="card"><img src="data:image/webp;base64,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" alt="" width="300" height="300" loading="lazy" decoding="async"><h2>حافظة أحمر</h2><p class="price">٢٤٧ ج</p><button type="button">أضف للسلة</button></li>
<li class="card"><img src="data:image/webp;base64,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" alt="" width="300" height="300" loading="lazy" decoding="async"><h2>باور بانك أسود</h2><p class="price">٢٨٤ ج</p><button type="button">أضف للسلة</button></li>
<li class="card"><img src="data:image/webp;base64,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" alt="" width="300" height="300" loading="lazy" decoding="async"><h2>ماوس أبيض</h2><p class="price">٣٢١ ج</p><button type="button">أضف للسلة</button></li>
<li class="card"><img src="data:image/webp;base64,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" alt="" width="300" height="300" loading="lazy" decoding="async"><h2>كيبورد أزرق</h2><p class="price">٣٥٨ ج</p><button type="button">أضف للسلة</button></li>
<li class="card"><img src="data:image/webp;base64,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" alt="" width="300" height="300" loading="lazy" decoding="async"><h2>لمبة ذكية رمادي</h2><p class="price">٣٩٥ ج</p><button type="button">أضف للسلة</button></li>
<li class="card"><img src="data:image/webp;base64,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" alt="" width="300" height="300" loading="lazy" decoding="async"><h2>ستاند أحمر</h2><p class="price">٤٣٢ ج</p><button type="button">أضف للسلة</button></li>
<li class="card"><img src="data:image/webp;base64,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" alt="" width="300" height="300" loading="lazy" decoding="async"><h2>سماعة أسود</h2><p class="price">٤٦٩ ج</p><button type="button">أضف للسلة</button></li>
<li class="card"><img src="data:image/webp;base64,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" alt="" width="300" height="300" loading="lazy" decoding="async"><h2>شاحن أبيض</h2><p class="price">٥٠٦ ج</p><button type="button">أضف للسلة</button></li>
<li class="card"><img src="data:image/webp;base64,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" alt="" width="300" height="300" loading="lazy" decoding="async"><h2>كابل أزرق</h2><p class="price">٥٤٣ ج</p><button type="button">أضف للسلة</button></li>
<li class="card"><img src="data:image/webp;base64,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" alt="" width="300" height="300" loading="lazy" decoding="async"><h2>ساعة رمادي</h2><p class="price">٥٨٠ ج</p><button type="button">أضف للسلة</button></li>
<li class="card"><img src="data:image/webp;base64,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" alt="" width="300" height="300" loading="lazy" decoding="async"><h2>حافظة أحمر</h2><p class="price">٦١٧ ج</p><button type="button">أضف للسلة</button></li>
<li class="card"><img src="data:image/webp;base64,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" alt="" width="300" height="300" loading="lazy" decoding="async"><h2>باور بانك أسود</h2><p class="price">٦٥٤ ج</p><button type="button">أضف للسلة</button></li>
<li class="card"><img src="data:image/webp;base64,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" alt="" width="300" height="300" loading="lazy" decoding="async"><h2>ماوس أبيض</h2><p class="price">٦٩١ ج</p><button type="button">أضف للسلة</button></li>
<li class="card"><img src="data:image/webp;base64,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" alt="" width="300" height="300" loading="lazy" decoding="async"><h2>كيبورد أزرق</h2><p class="price">٧٢٨ ج</p><button type="button">أضف للسلة</button></li>
<li class="card"><img src="data:image/webp;base64,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" alt="" width="300" height="300" loading="lazy" decoding="async"><h2>لمبة ذكية رمادي</h2><p class="price">٧٦٥ ج</p><button type="button">أضف للسلة</button></li>
<li class="card"><img src="data:image/webp;base64,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" alt="" width="300" height="300" loading="lazy" decoding="async"><h2>ستاند أحمر</h2><p class="price">٨٠٢ ج</p><button type="button">أضف للسلة</button></li>
</ul>
</main>
</body>
</html>
~~~

**هتشوف إيه:** grid كروت بيضا: صورة منظر مربعة، واسم المنتج («سماعة أسود»)، وسعر أخضر، وزرار أسود «أضف للسلة». الشكل في النسختين واحد بالظبط.

**[[content-visibility: auto]]:** الكارت اللي بعيد عن الشاشة المتصفح مبيحسبش الـ layout بتاعه ومبيرسموش، لحد ما يقرب. فأول تحميل بيشتغل على حوالي ٣٠ كارت بدل ٢٠٠٠.

**[[contain-intrinsic-size]]:** الكارت اللي اتساب محتاج مقاس افتراضي، وإلا هيتحسب 0px. من غيره الصفحة بتبان أقصر بكتير (30419px بدل 132209px)، وبتطول وانت نازل، فالـ scrollbar بيتنطط (لحد 5767px في خطوة scroll واحدة). و [[auto]] قبل الرقم معناها «أول ما ترسمه، افتكر مقاسه الحقيقي».

**غلطتين في الرقم نفسه:**
- **أول رقم كان تخمين (320px):** الصفحة طلعت أطول بـ 7000px، والنطّة 77px. قست الكارت الحقيقي: 314px على الشاشة الواسعة و 285px على الموبايل.
- **[[contain-intrinsic-size]] مقاس الـ content box:** حطيت 314 والصفحة لسه أطول بـ 26px لكل كارت. الكارت فيه padding 12px من كل ناحية و border 1px، فالرقم الصح 314 − 26 = 288، و 285 − 26 = 259 للموبايل. بعدها النطّة بقت 2px.

**الصور:** [[loading="lazy"]] (اللي بعيد مبيتحمّلش) و [[decoding="async"]] (فك الصورة مبيوقفش الرسم) و [[width]] و [[height]].

**غلطة في القياس:** أول تشغيل قال إن «قبل» حمّلت 249 صورة بس. المتصفح بيحتفظ بـ **250** entry بس في Resource Timing بشكل افتراضي. [[performance.setResourceTimingBufferSize(5000)]] طلّع الرقم الحقيقي: 2000.

~~~text node products/measure.mjs (CPU 4x، cache مقفول، ٤٠ scroll × 900px)
شاشة 1280px:
before.html       | FCP 1352ms، load 4547ms | Rendering 847ms، أكبر Layout 376ms | صور من غير scroll: 2000 | الطول ثابت 132209px
no-intrinsic.html | FCP  288ms، load  726ms | Rendering 318ms، أكبر Layout  87ms | صور: 30 | الطول من 30419 لـ 50892px، أكبر نطّة 5767px
index.html        | FCP  232ms، load  692ms | Rendering 251ms، أكبر Layout  41ms | صور: 30 | الطول من 132068 لـ 132107px، أكبر نطّة 2px
شاشة 412px:
before.html       | FCP 1100ms، load 4298ms | Rendering 803ms، أكبر Layout 374ms | صور: 2000
index.html        | FCP  240ms، load  600ms | Rendering 231ms، أكبر Layout  46ms | صور: 14 | أكبر نطّة 1px
(Rendering = مجموع UpdateLayoutTree و Layout و PrePaint و Paint و Layerize في الـ trace)
axe: 0   الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~` },
        { lvl: 'كبير', dir: "rescue", t: R`إنقاذ صفحة بطيئة`, what: R`ابني صفحة فيها ٨ مشاكل أداء بقصد زي اللي بتتكرر في المشاريع: خط من غير [[font-display]] بـ [[@import]]، وصورة الهيرو [[loading="lazy"]]، وصور من غير مقاسات، و CSS 300KB نصه مش مستخدم، و scroll handler بيعمل layout thrashing، و [[filter: blur(80px)]] على عنصر قد الشاشة، و [[will-change]] على كل الكروت، وبانر بيتحط فوق الصفحة بعد ثانية. وبعدين شخّص كل واحدة بأداة (Lighthouse، و Performance، و Coverage، و Rendering › Paint flashing و Layer borders) وصلّحها. بيجمع الوحدة دي مع الحركة والصور.`, done: R`تقرير فيه لكل مشكلة: العَرَض، والأداة اللي كشفتها، والسبب، والتصليح، والرقم قبل وبعد. Lighthouse Performance من تحت الـ 50 لـ 90 أو أكتر على Mobile، والصفحة شكلها زي ما هو، والتقرير بيتعاد بنفس الخطوات على جهاز تاني بنفس النتيجة تقريبًا.`, ext: R`اعمل GitHub Action بيشغّل Lighthouse CI بـ budget ([[budget.json]]) ويوقّع الـ PR لو LCP أو CLS أو حجم الـ CSS عدّى الحد.`, sol: R`المثال: متجر متخيل «دكّان». [[before.html]] فيها الـ ٨ مشاكل بقصد، و [[index.html]] بعد التصليح، و [[REPORT.md]] التقرير. الشكل في الاتنين واحد.

~~~css rescue/base.css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: "Cairo", system-ui, sans-serif; line-height: 1.7; color: #1c1917; background: #fffbeb; }
a { color: #9a3412; }
:focus-visible { outline: 3px solid #1d4ed8; outline-offset: 3px; }
.top { position: sticky; top: 0; z-index: 10; display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; background: #fffbebf2; }
.top.scrolled { box-shadow: 0 4px 16px #0002; }
.logo { font-weight: 700; font-size: 1.3rem; color: #1c1917; text-decoration: none; }
.banner { padding: 0.75rem 1rem; text-align: center; background: #1c1917; color: #fde68a; font-weight: 700; }
.hero { position: relative; display: grid; gap: 1.5rem; max-width: 64rem; margin: 0 auto; padding: 2rem 1rem; isolation: isolate; }
.hero h1 { margin: 0; font-size: clamp(2rem, 1.2rem + 4vw, 3.4rem); line-height: 1.25; }
.hero p { margin: 0; font-size: 1.1rem; color: #57534e; }
.hero img { width: 100%; height: auto; border-radius: 1.25rem; }
.btn { justify-self: start; padding: 0.7rem 1.5rem; border-radius: 999px; background: #9a3412; color: #fff; font-weight: 700; text-decoration: none; }
.items { max-width: 64rem; margin: 0 auto; padding: 1rem; }
.items h2 { margin: 0 0 1rem; }
.grid { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fill, minmax(min(13rem, 100%), 1fr)); margin: 0; padding: 0; list-style: none; }
.card { padding: 0.75rem; border-radius: 1rem; background: #fff; border: 1px solid #fde68a; }
.card img { width: 100%; height: auto; border-radius: 0.75rem; }
.card h3 { margin: 0.5rem 0 0; font-size: 1.05rem; }
.card p { margin: 0; color: #047857; font-weight: 700; }
.card.seen { border-color: #f59e0b; }
.foot { padding: 2rem 1rem; text-align: center; color: #57534e; }
~~~

~~~js rescue/make-before.mjs (بيعمل before.css: ‏288KB)
// node rescue/make-before.mjs: builds the slow page's CSS (the real rules + a big unused "framework") and its HTML
import fs from "node:fs";

// problem 4: ~300KB of CSS; the page uses only base.css from it
const sizes = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64];
const props = { m: "margin", p: "padding", mt: "margin-top", mb: "margin-bottom", ms: "margin-inline-start", me: "margin-inline-end", pt: "padding-top", pb: "padding-bottom", ps: "padding-inline-start", pe: "padding-inline-end", gap: "gap", w: "width", h: "height", maxw: "max-width", minh: "min-height" };
const colors = ["red", "orange", "amber", "lime", "green", "teal", "sky", "blue", "violet", "pink", "slate", "stone"];
let junk = "/* a whole utility framework, imported for 10 classes */\n";
for (const bp of ["", "sm-", "md-", "lg-", "xl-"]) {
  let block = "";
  for (const [k, v] of Object.entries(props)) for (const s of sizes) block += $__bt.$__{bp}$__{k}-$__{s} { $__{v}: $__{s * 0.25}rem; }\n$__bt;
  for (const c of colors) for (let n = 1; n <= 9; n++) block += $__bt.$__{bp}text-$__{c}-$__{n}00 { color: hsl($__{colors.indexOf(c) * 30} 70% $__{95 - n * 9}%); }\n.$__{bp}bg-$__{c}-$__{n}00 { background-color: hsl($__{colors.indexOf(c) * 30} 70% $__{95 - n * 9}%); }\n.$__{bp}border-$__{c}-$__{n}00 { border-color: hsl($__{colors.indexOf(c) * 30} 70% $__{95 - n * 9}%); }\n$__bt;
  const min = { "": 0, "sm-": 640, "md-": 768, "lg-": 1024, "xl-": 1280 }[bp];
  // and a hover: copy of every class, like real utility frameworks generate
  const states = block + block.replace(/^\.([\w-]+) \{/gm, ".hover\\:$1:hover {");
  junk += min ? $__bt@media (min-width: $__{min}px) {\n$__{states}}\n$__bt : states;
}

// problems 1, 6 and 7 live in the CSS too
const problems = $__bt
/* 1. the font comes through an @import chain, with no font-display (invisible text while it loads) */
@import url("before-fonts.css");

/* 6. a full-screen glow made with a huge blur */
.glow { position: fixed; inset: 0; z-index: -1; background: radial-gradient(circle at 20% 20%, #fdba74, transparent 40%), radial-gradient(circle at 80% 60%, #fde047, transparent 40%); filter: blur(80px); }

/* 7. "for smooth animations": every card is its own layer */
.card { will-change: transform; }
$__bt;
// @import must come first in a stylesheet, so it goes at the top
fs.writeFileSync("rescue/before.css", problems.trim().split("\n").filter(l => l.startsWith("@import")).join("\n") + "\n" +
  fs.readFileSync("rescue/base.css", "utf8") + problems.split("\n").filter(l => !l.startsWith("@import")).join("\n") + junk);
console.log("before.css: " + Math.round(fs.statSync("rescue/before.css").size / 1024) + "KB");
~~~

~~~css rescue/before-fonts.css
/* no font-display: the browser hides the text until the font arrives (up to 3 seconds) */
@font-face { font-family: "Cairo"; src: url("fonts/cairo-arabic-400-normal.woff2") format("woff2"); font-weight: 400; }
@font-face { font-family: "Cairo"; src: url("fonts/cairo-arabic-700-normal.woff2") format("woff2"); font-weight: 700; }
~~~

~~~html rescue/before.html (أول كارت، والـ ٢٤ زيه)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>دكّان: حاجات البيت المصري</title>
<link rel="stylesheet" href="before.css">
<script src="before.js" defer></script>
</head>
<body>
<div class="glow" aria-hidden="true"></div>
<header class="top"><a class="logo" href="#">دكّان</a><a href="#items">المنتجات</a></header>
<main>
  <section class="hero">
    <h1>حاجات البيت المصري، من إيد الصنايعي لبيتك</h1>
    <p>فوانيس وكليم وفخار، كل قطعة معمولة بإيد.</p>
    <a class="btn" href="#items">اتفرّج على المنتجات</a>
    <img src="img/hero-1600.webp" alt="رسمة تلال بألوان الغروب" loading="lazy">
  </section>
  <section id="items" class="items">
    <h2>وصل جديد</h2>
    <ul class="grid">
      <li class="card"><img src="img/item0-400.webp" alt="فانوس نحاس"><h3>فانوس نحاس</h3><p>٤٥٠ ج</p></li>
    </ul>
  </section>
</main>
<footer class="foot">دكّان، متجر متخيل للتجربة.</footer>
</body>
</html>
~~~

~~~js rescue/before.js
// 5. on every scroll: read a card's position, write its class, read the next one…
addEventListener("scroll", function markSeen() {
  document.querySelector(".top").classList.toggle("scrolled", scrollY > 10);
  for (const card of document.querySelectorAll(".card")) {
    const top = card.getBoundingClientRect().top;               // read
    card.classList.toggle("seen", top < innerHeight);           // write
    card.style.paddingBlockEnd = top < innerHeight ? "1rem" : "0.75rem";   // a write that changes layout
  }
});

// 8. a promo banner, one second later, at the very top: everything under it moves down
setTimeout(() => {
  const banner = document.createElement("aside");
  banner.setAttribute("aria-label", "عرض الشحن");
  banner.className = "banner";
  banner.textContent = "شحن مجاني على أي طلب فوق ٥٠٠ ج";
  document.body.prepend(banner);
}, 1000);
~~~

**بعد التصليح:**

~~~html rescue/index.html (أول كارت، والـ ٢٤ زيه)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>دكّان: حاجات البيت المصري</title>
<link rel="preload" href="fonts/cairo-arabic-700-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="style.css">
<script src="app.js" defer></script>
</head>
<body>
<div class="glow" aria-hidden="true"></div>
<aside class="banner-slot" aria-label="عرض الشحن"></aside>
<header class="top"><a class="logo" href="#">دكّان</a><a href="#items">المنتجات</a></header>
<main>
  <section class="hero">
    <h1>حاجات البيت المصري، من إيد الصنايعي لبيتك</h1>
    <p>فوانيس وكليم وفخار، كل قطعة معمولة بإيد.</p>
    <a class="btn" href="#items">اتفرّج على المنتجات</a>
    <img src="img/hero-960.webp" srcset="img/hero-480.webp 480w, img/hero-960.webp 960w, img/hero-1600.webp 1600w"
         sizes="(min-width: 64rem) 62rem, calc(100vw - 2rem)" width="1600" height="1000" fetchpriority="high"
         alt="رسمة تلال بألوان الغروب">
  </section>
  <section id="items" class="items">
    <h2>وصل جديد</h2>
    <ul class="grid">
      <li class="card"><img src="img/item0-400.webp" alt="فانوس نحاس" width="400" height="400" loading="lazy" decoding="async"><h3>فانوس نحاس</h3><p>٤٥٠ ج</p></li>
    </ul>
  </section>
</main>
<footer class="foot">دكّان، متجر متخيل للتجربة.</footer>
</body>
</html>
~~~

~~~css rescue/style.css
/* 1. the font: declared here (no @import chain), shown with swap, and a fallback scaled to the same width */
@font-face { font-family: "Cairo"; src: url("fonts/cairo-arabic-400-normal.woff2") format("woff2"); font-weight: 400; font-display: swap; }
@font-face { font-family: "Cairo"; src: url("fonts/cairo-arabic-700-normal.woff2") format("woff2"); font-weight: 700; font-display: swap; }
@font-face { font-family: "Cairo fallback"; src: local("Segoe UI"); size-adjust: 97.6%; }
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: "Cairo", "Cairo fallback", system-ui, sans-serif; line-height: 1.7; color: #1c1917; background: #fffbeb; }
a { color: #9a3412; }
:focus-visible { outline: 3px solid #1d4ed8; outline-offset: 3px; }
.top { position: sticky; top: 0; z-index: 10; display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; background: #fffbebf2; }
.top.scrolled { box-shadow: 0 4px 16px #0002; }
.logo { font-weight: 700; font-size: 1.3rem; color: #1c1917; text-decoration: none; }
.banner { padding: 0.75rem 1rem; text-align: center; background: #1c1917; color: #fde68a; font-weight: 700; }
.hero { position: relative; display: grid; gap: 1.5rem; max-width: 64rem; margin: 0 auto; padding: 2rem 1rem; isolation: isolate; }
.hero h1 { margin: 0; font-size: clamp(2rem, 1.2rem + 4vw, 3.4rem); line-height: 1.25; }
.hero p { margin: 0; font-size: 1.1rem; color: #57534e; }
.hero img { width: 100%; height: auto; border-radius: 1.25rem; }
.btn { justify-self: start; padding: 0.7rem 1.5rem; border-radius: 999px; background: #9a3412; color: #fff; font-weight: 700; text-decoration: none; }
.items { max-width: 64rem; margin: 0 auto; padding: 1rem; }
.items h2 { margin: 0 0 1rem; }
.grid { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fill, minmax(min(13rem, 100%), 1fr)); margin: 0; padding: 0; list-style: none; }
.card { padding: 0.75rem; border-radius: 1rem; background: #fff; border: 1px solid #fde68a; }
.card img { width: 100%; height: auto; border-radius: 0.75rem; }
.card h3 { margin: 0.5rem 0 0; font-size: 1.05rem; }
.card p { margin: 0; color: #047857; font-weight: 700; }
.card.seen { border-color: #f59e0b; }
.foot { padding: 2rem 1rem; text-align: center; color: #57534e; }

/* 6. the same glow without a filter: soft gradients are already blurry, nothing to blur every frame */
.glow { position: fixed; inset: 0; z-index: -1; background: radial-gradient(circle at 20% 20%, #fdba7499, transparent 55%), radial-gradient(circle at 80% 60%, #fde04799, transparent 55%); }

/* 7. no will-change on 24 cards: the browser makes a layer by itself when something really animates */

/* 8. the banner's place is booked before it arrives */
.banner-slot { min-height: 3.2rem; background: #1c1917; }
.banner-slot .banner { margin: 0; }
~~~

~~~js rescue/app.js
// 5. no reading positions on scroll: the browser tells us when a card enters the screen
const seen = new IntersectionObserver(entries => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add("seen"); seen.unobserve(e.target); }
});
document.querySelectorAll(".card").forEach(c => seen.observe(c));

// the header shadow: a 1px sentinel at the top; when it leaves the screen, we scrolled
const sentinel = document.createElement("div");
sentinel.style.cssText = "position:absolute;top:0;height:1px;width:1px";
document.body.prepend(sentinel);
new IntersectionObserver(([e]) => document.querySelector(".top").classList.toggle("scrolled", !e.isIntersecting)).observe(sentinel);

// 8. the banner fills a slot that already has its height
setTimeout(() => {
  document.querySelector(".banner-slot").innerHTML = '<p class="banner">شحن مجاني على أي طلب فوق ٥٠٠ ج</p>';
}, 1000);
~~~

~~~js rescue/diagnose.mjs
// node rescue/diagnose.mjs: the numbers for the report, each from the tool that shows it in DevTools
import { browser, throttled, recordShifts, readThrough } from "../lab.mjs";
const b = await browser();
const U = f => "http://127.0.0.1:8817/rescue/" + f;
for (const f of ["before.html", "index.html"]) {
  console.log("== " + f);

  // Network (Slow 4G): when does the font start, compared to the page?  [problem 1]
  {
    const { ctx, page, cdp } = await throttled(b);
    const starts = {};
    cdp.on("Network.requestWillBeSent", e => { starts[e.request.url.split("/").pop()] ??= e.timestamp; });
    await recordShifts(page);
    await page.goto(U(f), { waitUntil: "load", timeout: 90000 });
    await page.waitForTimeout(2500);
    const t0 = starts[f];
    const font = Object.keys(starts).find(k => k.includes("700"));
    console.log("  [Network] الخط بدأ بعد " + Math.round((starts[font] - t0) * 1000) + "ms من الصفحة" + (starts["before-fonts.css"] ? " (بعد before.css ثم before-fonts.css)" : " (من الـ preload)"));
    const fcp = await page.evaluate(() => Math.round(performance.getEntriesByName("first-contentful-paint")[0].startTime));
    console.log("  [Performance] FCP على Slow 4G: " + fcp + "ms");
    const shifts = await page.evaluate(() => window.__shifts);
    console.log("  [Performance › Layout shifts] " + (shifts.map(s => s.at + "ms " + s.value + " ← " + s.moved).join(" | ") || "مفيش"));
    await ctx.close();
  }

  // Coverage + Layers + scroll trace (CPU 4x, fast network)  [problems 4, 5, 6, 7]
  {
    const { ctx, page, cdp } = await throttled(b, { net: null });
    await page.coverage.startCSSCoverage();
    await page.goto(U(f), { waitUntil: "load" }); await page.waitForTimeout(1500);
    const cov = await page.coverage.stopCSSCoverage();
    const css = cov.filter(c => /\.css$/.test(c.url) && !c.url.includes("fonts"));
    const total = css.reduce((s, c) => s + c.text.length, 0), used = css.reduce((s, c) => s + c.ranges.reduce((t, r) => t + r.end - r.start, 0), 0);
    console.log("  [Coverage] CSS " + Math.round(total / 1024) + "KB، المستخدم منه " + Math.round(used / 1024) + "KB (" + Math.round((1 - used / total) * 100) + "% مش مستخدم)");

    await cdp.send("LayerTree.enable");
    let layers = 0;
    cdp.on("LayerTree.layerTreeDidChange", e => { if (e.layers) layers = e.layers.filter(l => l.drawsContent).length; });
    await page.mouse.wheel(0, 10); await page.waitForTimeout(500);
    console.log("  [Layers] طبقات بترسم: " + layers);

    await page.mouse.wheel(0, -10); await page.waitForTimeout(200);
    await b.startTracing(page, { categories: ["devtools.timeline", "disabled-by-default-devtools.timeline", "disabled-by-default-devtools.timeline.stack"] });
    for (let i = 0; i < 30; i++) { await page.mouse.wheel(0, 150); await page.waitForTimeout(30); }
    await page.waitForTimeout(300);
    const ev = JSON.parse((await b.stopTracing()).toString()).traceEvents.filter(e => e.ph === "X" || e.ph === "B");
    const forced = ev.filter(e => e.name === "Layout" && e.args?.beginData?.stackTrace?.length);
    const paint = ev.filter(e => e.name === "Paint").reduce((s, e) => s + (e.dur || 0) / 1000, 0);
    const handler = ev.filter(e => e.name === "FunctionCall" && /markSeen/.test(e.args?.data?.functionName || "")).reduce((s, e) => s + e.dur / 1000, 0);
    console.log("  [Performance وقت الـ scroll] forced layout: " + forced.length + (forced[0] ? " ← " + forced[0].args.beginData.stackTrace[0].functionName : "") + " | وقت الـ handler: " + handler.toFixed(0) + "ms | Paint: " + paint.toFixed(0) + "ms");
    await ctx.close();
  }
}
await b.close();
~~~

~~~text rescue/REPORT.md
# دكّان: إنقاذ الأداء

$__btbefore.html$__bt قبل، و $__btindex.html$__bt بعد. الشكل واحد.

Lighthouse 13.6.0، Mobile (simulated Slow 4G و CPU 4x)، ٣ مرات ورا بعض:

| | Performance | FCP | LCP | TBT | CLS |
|---|---|---|---|---|---|
| قبل | 70، 64، 70 | 2.4 s | 4.5 لـ 6.4 s | 0 ms | 0.219 |
| بعد | 96، 96، 96 | 0.8 s | 2.7 s | 0 ms | 0 |

الـ LCP في «قبل» بيتغير من مرة للتانية لأن الصورة lazy: وقت بدايتها مش ثابت. و «بعد» ثابت.

باقي الأرقام من $__btnode rescue/diagnose.mjs$__bt (Slow 4G حقيقي و CPU 4x لـ Network و CLS، و CPU 4x لـ Coverage و Layers و الـ scroll).

| # | العَرَض | الأداة | السبب | التصليح | قبل ← بعد |
|---|---|---|---|---|---|
| ١ | الكلام مش باين أول ثانيتين | Network: الخط بدأ متأخر؛ Lighthouse: render-blocking | الخط جاي من $__bt@import$__bt جوه CSS جوه CSS، ومن غير $__btfont-display$__bt | $__bt@font-face$__bt في نفس الملف بـ $__btswap$__bt، و preload للخط العريض، وخط احتياطي $__btsize-adjust$__bt | بداية الخط 4377 ← 609ms، FCP 4672 ← 1500ms |
| ٢ | الصورة الكبيرة آخر حاجة بتظهر | Lighthouse: lcp-discovery-insight | $__btloading="lazy"$__bt على صورة الـ LCP | من غير lazy، و $__btfetchpriority="high"$__bt، و $__btsrcset$__bt | LCP 4.5 لـ 6.4 ← 2.7 s |
| ٣ | الكروت بتتنطط لما الصور توصل | Lighthouse: unsized-images؛ Performance › Layout shifts | صور من غير $__btwidth$__bt و $__btheight$__bt | المقاسات في الـ HTML | shift 0.1609 ← 0 |
| ٤ | الصفحة بتستنى ملف CSS كبير | Coverage | framework كامل لـ ١٠ كلاسات | ملف فيه اللي مستخدم بس | 288KB (99٪ مش مستخدم) ← 3KB |
| ٥ | الـ scroll بيقطّع على موبايل ضعيف | Performance: Forced reflow في $__btmarkSeen$__bt | قراية مكان كل كارت وكتابة padding في نفس اللفة | $__btIntersectionObserver$__bt للكروت وللـ header | forced layout 9 ← 0، الـ handler 38 لـ 60 ← 0ms |
| ٦ | تقيل لما الشاشة تتغير (لف الموبايل) | Rendering › Paint flashing و Layer borders؛ الـ trace | $__btfilter: blur(80px)$__bt على عنصر قد الشاشة | نفس الشكل بـ $__btradial-gradient$__bt ناعم من غير filter | raster في ٥ resize: 51.9 ← 24.3ms |
| ٧ | ذاكرة كتير | Layers | $__btwill-change: transform$__bt على كل كارت | شيله؛ المتصفح بيعمل طبقة لوحده وقت الحركة | طبقات بترسم 14 ← 5 |
| ٨ | الصفحة بتنزل لتحت بعد ثانية | Performance › Layout shifts (main) | بانر بيتحط فوق الصفحة | مكانه محجوز $__btmin-height$__bt من الأول | shift 0.0577 ← 0 |

**ملاحظات:**
- Lighthouse مسك ٥ من الـ ٨ لوحده (١ و ٢ و ٣ و ٤ و ٨). الـ ٣ التانيين (٥ و ٦ و ٧) محتاجين Performance و Layers، لأنهم بيحصلوا وانت بتستخدم الصفحة، مش وهي بتفتح.
- الـ blur ماغيّرش وقت الـ Paint وقت الـ scroll (14 لـ 40ms في الاتنين، بيتغير من تشغيل للتاني): العنصر $__btfixed$__bt في طبقة لوحده بتترسم مرة. التمن بيبان لما الطبقة تترسم تاني (resize).
- الـ ٨ مشاكل نزّلوا الصفحة لـ 64 لـ 70 مش تحت 50: ولا واحدة منهم بتشغّل JavaScript وقت الفتح، فـ TBT صفر، و TBT ليه ٣٠٪ من الدرجة.
- $__btcache-insight$__bt فاضل في الاتنين: سيرفر التجربة مبيبعتش $__btCache-Control$__bt. على السيرفر الحقيقي ده سطر في الإعدادات.

**تعيده إزاي على جهاز تاني:** شغّل $__btnode serve.mjs . 8817$__bt من فولدر المعمل، وبعدين $__btnode lh.mjs http://127.0.0.1:8817/rescue/before.html$__bt و $__btnode rescue/diagnose.mjs$__bt. الأرقام بالمللي ثانية هتختلف مع سرعة الجهاز، والاتجاه والنسب هي اللي تتقارن.
~~~

~~~view 760 900 بعد التصليح (و «قبل» نفس الشكل؛ الصور في المعاينة نسخة صغيرة)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>دكّان: حاجات البيت المصري</title>
<style>
/* 1. the font: declared here (no @import chain), shown with swap, and a fallback scaled to the same width */
@font-face { font-family: "Cairo"; src: url("data:font/woff2;base64,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") format("woff2"); font-weight: 400; font-display: swap; }
@font-face { font-family: "Cairo"; src: url("data:font/woff2;base64,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") format("woff2"); font-weight: 700; font-display: swap; }
@font-face { font-family: "Cairo fallback"; src: local("Segoe UI"); size-adjust: 97.6%; }
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: "Cairo", "Cairo fallback", system-ui, sans-serif; line-height: 1.7; color: #1c1917; background: #fffbeb; }
a { color: #9a3412; }
:focus-visible { outline: 3px solid #1d4ed8; outline-offset: 3px; }
.top { position: sticky; top: 0; z-index: 10; display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; background: #fffbebf2; }
.top.scrolled { box-shadow: 0 4px 16px #0002; }
.logo { font-weight: 700; font-size: 1.3rem; color: #1c1917; text-decoration: none; }
.banner { padding: 0.75rem 1rem; text-align: center; background: #1c1917; color: #fde68a; font-weight: 700; }
.hero { position: relative; display: grid; gap: 1.5rem; max-width: 64rem; margin: 0 auto; padding: 2rem 1rem; isolation: isolate; }
.hero h1 { margin: 0; font-size: clamp(2rem, 1.2rem + 4vw, 3.4rem); line-height: 1.25; }
.hero p { margin: 0; font-size: 1.1rem; color: #57534e; }
.hero img { width: 100%; height: auto; border-radius: 1.25rem; }
.btn { justify-self: start; padding: 0.7rem 1.5rem; border-radius: 999px; background: #9a3412; color: #fff; font-weight: 700; text-decoration: none; }
.items { max-width: 64rem; margin: 0 auto; padding: 1rem; }
.items h2 { margin: 0 0 1rem; }
.grid { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fill, minmax(min(13rem, 100%), 1fr)); margin: 0; padding: 0; list-style: none; }
.card { padding: 0.75rem; border-radius: 1rem; background: #fff; border: 1px solid #fde68a; }
.card img { width: 100%; height: auto; border-radius: 0.75rem; }
.card h3 { margin: 0.5rem 0 0; font-size: 1.05rem; }
.card p { margin: 0; color: #047857; font-weight: 700; }
.card.seen { border-color: #f59e0b; }
.foot { padding: 2rem 1rem; text-align: center; color: #57534e; }

/* 6. the same glow without a filter: soft gradients are already blurry, nothing to blur every frame */
.glow { position: fixed; inset: 0; z-index: -1; background: radial-gradient(circle at 20% 20%, #fdba7499, transparent 55%), radial-gradient(circle at 80% 60%, #fde04799, transparent 55%); }

/* 7. no will-change on 24 cards: the browser makes a layer by itself when something really animates */

/* 8. the banner's place is booked before it arrives */
.banner-slot { min-height: 3.2rem; background: #1c1917; }
.banner-slot .banner { margin: 0; }
</style>
</head>
<body>
<div class="glow" aria-hidden="true"></div>
<aside class="banner-slot" aria-label="عرض الشحن"></aside>
<header class="top"><a class="logo" href="#">دكّان</a><a href="#items">المنتجات</a></header>
<main>
  <section class="hero">
    <h1>حاجات البيت المصري، من إيد الصنايعي لبيتك</h1>
    <p>فوانيس وكليم وفخار، كل قطعة معمولة بإيد.</p>
    <a class="btn" href="#items">اتفرّج على المنتجات</a>
    <img src="data:image/webp;base64,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" width="1600" height="1000" fetchpriority="high"
         alt="رسمة تلال بألوان الغروب">
  </section>
  <section id="items" class="items">
    <h2>وصل جديد</h2>
    <ul class="grid">
      <li class="card"><img src="data:image/webp;base64,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" alt="فانوس نحاس" width="400" height="400" loading="lazy" decoding="async"><h3>فانوس نحاس</h3><p>٤٥٠ ج</p></li>
      <li class="card"><img src="data:image/webp;base64,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" alt="كليم يدوي" width="400" height="400" loading="lazy" decoding="async"><h3>كليم يدوي</h3><p>١٢٠٠ ج</p></li>
      <li class="card"><img src="data:image/webp;base64,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" alt="طقم فناجين" width="400" height="400" loading="lazy" decoding="async"><h3>طقم فناجين</h3><p>٣٢٠ ج</p></li>
      <li class="card"><img src="data:image/webp;base64,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" alt="سلة خوص" width="400" height="400" loading="lazy" decoding="async"><h3>سلة خوص</h3><p>١٨٠ ج</p></li>
      <li class="card"><img src="data:image/webp;base64,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" alt="مخدة تلّي" width="400" height="400" loading="lazy" decoding="async"><h3>مخدة تلّي</h3><p>٢٦٠ ج</p></li>
      <li class="card"><img src="data:image/webp;base64,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" alt="صينية مطعّمة" width="400" height="400" loading="lazy" decoding="async"><h3>صينية مطعّمة</h3><p>٩٠٠ ج</p></li>
    </ul>
  </section>
</main>
<footer class="foot">دكّان، متجر متخيل للتجربة.</footer>
<script>
// 5. no reading positions on scroll: the browser tells us when a card enters the screen
const seen = new IntersectionObserver(entries => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add("seen"); seen.unobserve(e.target); }
});
document.querySelectorAll(".card").forEach(c => seen.observe(c));

// the header shadow: a 1px sentinel at the top; when it leaves the screen, we scrolled
const sentinel = document.createElement("div");
sentinel.style.cssText = "position:absolute;top:0;height:1px;width:1px";
document.body.prepend(sentinel);
new IntersectionObserver(([e]) => document.querySelector(".top").classList.toggle("scrolled", !e.isIntersecting)).observe(sentinel);

// 8. the banner fills a slot that already has its height
setTimeout(() => {
  document.querySelector(".banner-slot").innerHTML = '<p class="banner">شحن مجاني على أي طلب فوق ٥٠٠ ج</p>';
}, 1000);
</script>
</body>
</html>
~~~

**هتشوف إيه:** خلفية كريمي فيها نور برتقالي وأصفر ناعم، وشريط أسود فوق «شحن مجاني على أي طلب فوق ٥٠٠ ج» (بيظهر بعد ثانية في مكانه المحجوز)، وهيدر «دكّان»، وعنوان كبير، وصورة تلال بألوان الغروب، و ٢٤ كارت (فانوس نحاس، وكليم يدوي…).

**أهم حاجة في المشروع: كل مشكلة ليها أداة بتكشفها.** Lighthouse مسك ٥ لوحده (التقرير بيقول أنهي audit لكل واحدة). الـ ٣ التانيين بيحصلوا وانت بتستخدم الصفحة مش وهي بتفتح، فمحتاجين أدوات تانية:
- **الـ scroll handler:** Performance وانت بتعمل scroll: 9 forced layouts بتشاور على [[markSeen]].
- **[[will-change]] على ٢٤ كارت:** Layers (أو Rendering › Layer borders): 14 طبقة بترسم بدل 5.
- **الـ blur:** Paint flashing وقت الـ scroll **مبيوريش** فرق (الـ [[fixed]] في طبقة لوحده بيترسم مرة). التمن بيبان لما الطبقة تترسم تاني: في ٥ resize، شغل الـ raster كان 51.9ms بدل 24.3ms.

**الـ banner:** في «قبل» بيتحط في أول [[body]] بعد ثانية، فكل اللي تحته بينزل (shift 0.0577 في [[main]]). في «بعد» ليه [[<aside>]] بـ [[min-height]] من الأول، والإعلان بيتملي جواه.

**الـ CSS:** في «قبل» 288KB من framework والصفحة بتستخدم 2KB (Coverage: ‏99٪ مش مستخدم). ده كمان سبب بداية الخط المتأخرة: المتصفح لازم ينزّل الـ 288KB ويقراهم عشان يلاقي [[@import]]، وبعدين ينزّل [[before-fonts.css]]، وبعدين الخط. يعني ٣ طلبات ورا بعض.

**الصراحة في الأرقام:**
- الـ ٨ مشاكل نزّلوا الصفحة لـ 64 لـ 70 مش تحت 50. ولا واحدة منهم بتشغّل JavaScript وقت الفتح، فـ TBT صفر، و TBT ليه ٣٠٪ من الدرجة. معملتش مشاكل زيادة عشان أنزّل الرقم.
- «قبل» نفسها بتتغير من تشغيل للتاني (LCP 4.5 لـ 6.4) بسبب الصورة الـ lazy، و «بعد» ثابت 96 في ٣ تشغيلات.
- الجهاز التاني ماتجرّبش. التقرير فيه الأوامر عشان تعيده.

**غلطتين صلّحتهم بعد axe:** البانر كان [[<p>]] برّه أي landmark (axe [[region]])، فبقى [[<aside aria-label="عرض الشحن">]] في النسختين. والتغيير ده نفسه غيّر الـ CLS بتاع «قبل» من 0.262 لـ 0.219، لأن الـ [[<p>]] كان ليه margin فالبانر كان أطول.

~~~text node lh.mjs (Lighthouse 13.6.0 Mobile، ٣ مرات بعد آخر تعديل)
before | Performance 70، 64، 70 | FCP 2.4 s | LCP 4.5 لـ 6.4 s | TBT 0 ms | CLS 0.219
after  | Performance 96، 96، 96 | FCP 0.8 s | LCP 2.7 s       | TBT 0 ms | CLS 0
الـ audits اللي وقعت في before: unused-css-rules (286 KiB)، unsized-images، lcp-discovery-insight،
  cls-culprits-insight، render-blocking-insight (1,750 ms)، image-delivery-insight
فاضل في after: cache-insight (السيرفر مبيبعتش Cache-Control)، render-blocking 150 ms
~~~

~~~text node rescue/diagnose.mjs
== before.html
  [Network] الخط بدأ بعد 4377ms (بعد before.css ثم before-fonts.css) | FCP على Slow 4G: 4672ms
  [Layout shifts] 5190ms 0.1609 ← section.items | 5583ms 0.0577 ← main
  [Coverage] CSS 288KB، المستخدم 2KB (99% مش مستخدم)
  [Layers] 14 | [scroll] forced layout 9 ← markSeen، الـ handler 38ms
== index.html
  [Network] الخط بدأ بعد 609ms (preload) | FCP على Slow 4G: 1500ms
  [Layout shifts] 0.0024 و 0.0003 (الكلام وقت تبديل الخط)
  [Coverage] CSS 3KB، المستخدم 2KB | [Layers] 5 | [scroll] forced layout 0
raster في ٥ resize: before 51.9ms، after 24.3ms
axe: 0 على الاتنين   الـ validator: مفيش رسايل   CSS validator: No Error Found (style.css و base.css)
~~~` },
        { lvl: 'فكرة', dir: "daily", t: R`قيس موقع بتستخدمه كل يوم`, what: R`اختار موقع بتفتحه كتير وبتحس إنه تقيل، وقيسه بـ Lighthouse و Performance (من غير ما تلمس الكود بتاعه)، وطلّع أكبر ٣ أسباب للبطء بأدلة، واكتب إزاي كنت هتصلّحهم.`, done: R`تقرير صفحة واحدة: ٣ مشاكل، ولكل واحدة لقطة من الأداة ورقم، والتصليح المقترح والمكسب المتوقع.`, ext: R`اعمل نسخة محلية صغيرة من الجزء البطيء وجرّب التصليح فعلًا وقيس الفرق.`, sol: R`**ليه صفحة متخيلة:** الكورس مبيقيسش مواقع حقيقية بأساميها. فعملت صفحة «الخبر النهارده» بنفس المشاكل اللي بتتكرر في مواقع الأخبار التقيلة، وطبّقت عليها نفس الطريقة بالظبط. على موقعك الحقيقي: نفس الأوامر مع اللينك بتاعه، من غير ما تلمس الكود.

~~~js daily/make-js.mjs
// node daily/make-js.mjs: builds the heavy files a typical news site ships (a bundle with all its data, a chat widget)
import fs from "node:fs";

// bundle.js: 3000 old articles inlined as data, and a search index built on startup, for a box most readers never use
const words = ["الدوري", "الأهلي", "الزمالك", "الطقس", "الأسعار", "البنزين", "الدولار", "المدارس", "الامتحانات", "القطار", "المترو", "الكهربا"];
const items = Array.from({ length: 3000 }, (_, i) => ({ id: i, t: words[i % 12] + " " + words[(i * 7) % 12] + " خبر رقم " + i, body: (words[(i * 3) % 12] + " ").repeat(30) }));
const bundle = $__bt// the whole site in one file (generated)
const ARCHIVE = $__{JSON.stringify(items)};
function buildIndex() {                                   // runs as soon as the page loads, on the main thread
  const index = new Map();
  for (let pass = 0; pass < 6; pass++)
    for (const a of ARCHIVE) for (const w of (a.t + " " + a.body).split(" ")) {
      if (!index.has(w)) index.set(w, new Set());
      index.get(w).add(a.id);
    }
  return index;
}
window.searchIndex = buildIndex();
document.querySelector(".search").addEventListener("input", e => {
  const hits = window.searchIndex.get(e.target.value.trim()) || new Set();
  document.querySelector(".hits").textContent = hits.size.toLocaleString("ar-EG") + " نتيجة";
});
$__bt;
fs.writeFileSync("daily/bundle.js", bundle);

// chat.js: a "third-party" widget; most of it is a library the page never calls
const lib = Array.from({ length: 1500 }, (_, i) => $__btfunction helper$__{i}(a,b){return (a*$__{i}+b)%$__{i + 7};}$__bt).join("\n");
fs.mkdirSync("daily/third", { recursive: true });
fs.writeFileSync("daily/third/chat.js", $__bt// chat widget (pretend this comes from another company)
$__{lib}
(function () {
  const start = performance.now(); while (performance.now() - start < 60) {}   // its own startup work
  const b = document.createElement("button");
  b.className = "chat-bubble"; b.type = "button"; b.textContent = "💬 كلّمنا";
  (document.body || document.documentElement).append(b);
})();
$__bt);
for (const f of ["daily/bundle.js", "daily/third/chat.js"]) console.log(f + ": " + Math.round(fs.statSync(f).size / 1024) + "KB");
~~~

الصور: ٤ PNG بعرض 1600 ([[node gen-images.mjs daily/img news0 1600 1.5 50 png]]، كل واحدة 2.4MB)، ونفس الـ ٤ WebP بعرض 400 (10KB).

~~~html daily/before.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الخبر النهارده</title>
<link rel="stylesheet" href="style.css">
<!-- a chat widget from another company, in the head, without defer -->
<script src="http://localhost:8817/daily/third/chat.js"></script>
<script src="bundle.js" defer></script>
</head>
<body>
<header class="top">
  <h1 class="logo">الخبر النهارده</h1>
  <div class="search-box"><label for="q">دوّر في الأرشيف</label><input id="q" class="search" type="search"><span class="hits" aria-live="polite"></span></div>
</header>
<main>
  <ul class="news">
    <li class="story"><img src="img/news0-1600.png" alt=""><h2>تعديل مواعيد المترو في رمضان</h2><p>خبر متخيل للتجربة.</p></li>
    <li class="story"><img src="img/news1-1600.png" alt=""><h2>الطقس: أمطار خفيفة على السواحل</h2><p>خبر متخيل للتجربة.</p></li>
    <li class="story"><img src="img/news2-1600.png" alt=""><h2>أسعار الخضار في سوق العبور</h2><p>خبر متخيل للتجربة.</p></li>
    <li class="story"><img src="img/news3-1600.png" alt=""><h2>نتيجة الشهادة الإعدادية الأسبوع الجاي</h2><p>خبر متخيل للتجربة.</p></li>
  </ul>
</main>
</body>
</html>
~~~

~~~css daily/style.css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.6; color: #111827; background: #fff; }
.top { display: flex; flex-wrap: wrap; gap: 0.5rem 1rem; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; border-block-end: 3px solid #b91c1c; }
.logo { margin: 0; font-size: 1.4rem; font-weight: 800; color: #b91c1c; }
.search-box { display: flex; gap: 0.5rem; align-items: center; }
.search { padding: 0.4rem 0.7rem; border: 1px solid #6b7280; border-radius: 0.5rem; font: inherit; }
.hits { color: #4b5563; font-size: 0.9rem; }
.news { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fill, minmax(min(16rem, 100%), 1fr)); max-width: 64rem; margin: 0 auto; padding: 1rem; list-style: none; }
.story img { width: 100%; height: auto; border-radius: 0.5rem; }
.story h2 { margin: 0.5rem 0 0.25rem; font-size: 1.1rem; }
.story p { margin: 0; color: #4b5563; }
.chat-bubble { position: fixed; inset-block-end: 1rem; inset-inline-start: 1rem; padding: 0.6rem 1rem; border: 0; border-radius: 999px; background: #1d4ed8; color: #fff; font: inherit; font-weight: 700; box-shadow: 0 6px 20px #0003; }
:focus-visible { outline: 3px solid #b45309; outline-offset: 2px; }
~~~

~~~js daily/measure.mjs
// node daily/measure.mjs: long tasks (Performance › Main) and bytes by type (Network) for both versions
import { browser, throttled } from "../lab.mjs";
const b = await browser();
for (const f of ["before.html", "index.html"]) {
  const { ctx, page, cdp } = await throttled(b, { net: null, cpu: 4 });
  const bytes = {};
  const types = new Map();
  cdp.on("Network.responseReceived", e => types.set(e.requestId, e.type));
  cdp.on("Network.loadingFinished", e => { const t = types.get(e.requestId) || "Other"; bytes[t] = (bytes[t] || 0) + e.encodedDataLength; });
  await b.startTracing(page, { categories: ["devtools.timeline", "disabled-by-default-devtools.timeline"] });
  await page.goto("http://127.0.0.1:8817/daily/" + f, { waitUntil: "load", timeout: 120000 });
  await page.waitForTimeout(1500);
  const ev = JSON.parse((await b.stopTracing()).toString()).traceEvents;
  // a long task = a main-thread task over 50ms; named after the biggest thing inside it (a script, or Layout)
  const tasks = ev.filter(e => e.name === "RunTask" && e.ph === "X" && e.dur > 50000);
  const longs = tasks.map(t => {
    const inside = ev.filter(x => x.ph === "X" && x !== t && x.tid === t.tid && x.ts >= t.ts && x.ts + (x.dur || 0) <= t.ts + t.dur && /EvaluateScript|FunctionCall|Layout|UpdateLayoutTree|ParseHTML|Paint/.test(x.name));
    const top = inside.sort((p, q) => q.dur - p.dur)[0];
    const what = top ? top.name + (top.args?.data?.url ? " " + top.args.data.url.split("/").pop() : "") : "?";
    return Math.round(t.dur / 1000) + "ms " + what;
  });
  const tbt = tasks.reduce((s, t) => s + t.dur / 1000 - 50, 0);
  console.log("== " + f + " (CPU 4x)");
  console.log("   long tasks: " + (longs.join(" | ") || "مفيش") + " | مجموع الزيادة فوق 50ms: " + Math.round(tbt) + "ms");
  console.log("   الحجم: " + Object.entries(bytes).sort((a, b) => b[1] - a[1]).map(([t, n]) => t + " " + Math.round(n / 1024) + "KB").join("، "));
  await ctx.close();
}
await b.close();
~~~

~~~text daily/REPORT.md
# «الخبر النهارده»: أكبر ٣ أسباب للبطء

صفحة متخيلة بتقلّد موقع أخبار تقيل ($__btbefore.html$__bt). القياس: Lighthouse 13.6.0 Mobile، و Performance و Network بـ CPU 4x ($__btnode daily/measure.mjs$__bt).

**قبل:** Performance 58، FCP 1.8 s، **LCP 60.3 s**، **TBT 330 ms**، CLS 0. الصفحة بتنزّل 11MB: صور 9752KB، و JavaScript 1434KB.

## ١. صور PNG بـ 1600px في كروت عرضها 400

- **الدليل:** Network › Img: ٤ صور × 2.4MB = 9752KB. ودي سبب الـ LCP اللي بـ 60 ثانية على Slow 4G (Lighthouse بيحاكيه).
- **التصليح المقترح:** WebP بالعرض اللي بيتعرض فعلًا (400px)، و $__btwidth$__bt و $__btheight$__bt، و $__btloading="lazy"$__bt للي تحت أول شاشة.
- **المكسب المتوقع:** الصور تنزل من حوالي 10MB لأقل من 50KB، و LCP تحت 2.5 ثانية.

## ٢. ملف JavaScript واحد 1.4MB بيبني index للبحث أول ما الصفحة تفتح

- **الدليل:** Performance › Main: long task **391ms** $__btEvaluateScript bundle.js$__bt (على CPU 4x)، و Lighthouse TBT 330ms.
- **السبب:** الأرشيف كله (٣٠٠٠ خبر) جوه الـ bundle، والـ index بيتبني لكل زائر، مع إن أغلبهم مبيستخدمش البحث.
- **التصليح المقترح:** الأرشيف في ملف JSON لوحده، يتحمّل ويتبني أول ما حد يحط الماوس أو الكيبورد في خانة البحث.
- **المكسب المتوقع:** TBT قريب من الصفر، و 1.4MB ميتحمّلوش أصلًا لأغلب الزوار.

## ٣. widget الشات من شركة تانية في الـ head من غير defer

- **الدليل:** Performance: $__btParseHTML$__bt اتوقف 67ms والسكربت شغال، لأن السكربت في نص قراية الـ HTML. و Network: طلب لـ origin تاني قبل أول رسم.
- **التصليح المقترح:** facade: زرار شكله زي الـ widget، والسكربت الحقيقي يتحمّل بأول ضغطة بس.
- **المكسب المتوقع:** مفيش سكربت من برّه قبل أول رسم، و 70KB ميتحمّلوش للي مبيكلّمش حد.

## الـ ext: التصليح اتعمل واتقاس ($__btindex.html$__bt)

| | قبل | بعد |
|---|---|---|
| Lighthouse Performance | 58 | 100 |
| LCP | 60.3 s | 1.2 s |
| TBT | 330 ms | 20 ms |
| الصور | 9752KB | 41KB |
| JavaScript وقت الفتح | 1434KB | 1KB |
| long tasks (CPU 4x) | 391ms bundle.js، 67ms ParseHTML، 64ms Layout | 141ms Layout (أول layout للصفحة) |

البحث بيشتغل زي ما هو («الأهلي» = ٥٠٠ نتيجة)، والشات بيتحمّل بأول ضغطة.
~~~

**الـ ext: التصليح نفسه.** [[archive.json]] = الـ [[ARCHIVE]] اللي كانت جوه الـ bundle، في ملف لوحده.

~~~html daily/index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الخبر النهارده</title>
<link rel="stylesheet" href="style.css">
<script src="search.js" defer></script>
</head>
<body>
<header class="top">
  <h1 class="logo">الخبر النهارده</h1>
  <div class="search-box"><label for="q">دوّر في الأرشيف</label><input id="q" class="search" type="search"><span class="hits" aria-live="polite"></span></div>
</header>
<main>
  <ul class="news">
    <li class="story"><img src="img/news0-400.webp" alt="" width="400" height="267"><h2>تعديل مواعيد المترو في رمضان</h2><p>خبر متخيل للتجربة.</p></li>
    <li class="story"><img src="img/news1-400.webp" alt="" width="400" height="267"><h2>الطقس: أمطار خفيفة على السواحل</h2><p>خبر متخيل للتجربة.</p></li>
    <li class="story"><img src="img/news2-400.webp" alt="" width="400" height="267" loading="lazy"><h2>أسعار الخضار في سوق العبور</h2><p>خبر متخيل للتجربة.</p></li>
    <li class="story"><img src="img/news3-400.webp" alt="" width="400" height="267" loading="lazy"><h2>نتيجة الشهادة الإعدادية الأسبوع الجاي</h2><p>خبر متخيل للتجربة.</p></li>
  </ul>
</main>
<button type="button" class="chat-bubble" id="chat">💬 كلّمنا</button>
<script src="chat-facade.js" defer></script>
</body>
</html>
~~~

~~~js daily/search.js
// the archive and its index only load when someone actually uses the search box
let index = null;
const box = document.querySelector(".search"), hits = document.querySelector(".hits");
async function ready() {
  if (index) return index;
  hits.textContent = "بيحمّل الأرشيف…";
  const archive = await (await fetch("archive.json")).json();
  index = new Map();
  for (const a of archive) for (const w of (a.t + " " + a.body).split(" ")) {
    if (!index.has(w)) index.set(w, new Set());
    index.get(w).add(a.id);
  }
  hits.textContent = "";
  return index;
}
box.addEventListener("focus", ready, { once: true });
box.addEventListener("input", async () => {
  const found = (await ready()).get(box.value.trim()) || new Set();
  hits.textContent = found.size.toLocaleString("ar-EG") + " نتيجة";
});
~~~

~~~js daily/chat-facade.js
// a facade: a plain button that looks like the widget. The real widget loads on the first click only
document.getElementById("chat").addEventListener("click", function load() {
  this.remove();
  const s = document.createElement("script");
  s.src = "http://localhost:8817/daily/third/chat.js";
  document.body.append(s);
}, { once: true });
~~~

~~~view 740 900 بعد التصليح (البحث والشات محتاجين السيرفر، فمش شغالين في المعاينة)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الخبر النهارده</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.6; color: #111827; background: #fff; }
.top { display: flex; flex-wrap: wrap; gap: 0.5rem 1rem; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; border-block-end: 3px solid #b91c1c; }
.logo { margin: 0; font-size: 1.4rem; font-weight: 800; color: #b91c1c; }
.search-box { display: flex; gap: 0.5rem; align-items: center; }
.search { padding: 0.4rem 0.7rem; border: 1px solid #6b7280; border-radius: 0.5rem; font: inherit; }
.hits { color: #4b5563; font-size: 0.9rem; }
.news { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fill, minmax(min(16rem, 100%), 1fr)); max-width: 64rem; margin: 0 auto; padding: 1rem; list-style: none; }
.story img { width: 100%; height: auto; border-radius: 0.5rem; }
.story h2 { margin: 0.5rem 0 0.25rem; font-size: 1.1rem; }
.story p { margin: 0; color: #4b5563; }
.chat-bubble { position: fixed; inset-block-end: 1rem; inset-inline-start: 1rem; padding: 0.6rem 1rem; border: 0; border-radius: 999px; background: #1d4ed8; color: #fff; font: inherit; font-weight: 700; box-shadow: 0 6px 20px #0003; }
:focus-visible { outline: 3px solid #b45309; outline-offset: 2px; }
</style>
</head>
<body>
<header class="top">
  <h1 class="logo">الخبر النهارده</h1>
  <div class="search-box"><label for="q">دوّر في الأرشيف</label><input id="q" class="search" type="search"><span class="hits" aria-live="polite"></span></div>
</header>
<main>
  <ul class="news">
    <li class="story"><img src="data:image/webp;base64,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" alt="" width="400" height="267"><h2>تعديل مواعيد المترو في رمضان</h2><p>خبر متخيل للتجربة.</p></li>
    <li class="story"><img src="data:image/webp;base64,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" alt="" width="400" height="267"><h2>الطقس: أمطار خفيفة على السواحل</h2><p>خبر متخيل للتجربة.</p></li>
    <li class="story"><img src="data:image/webp;base64,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" alt="" width="400" height="267" loading="lazy"><h2>أسعار الخضار في سوق العبور</h2><p>خبر متخيل للتجربة.</p></li>
    <li class="story"><img src="data:image/webp;base64,UklGRtgpAABXRUJQVlA4WAoAAAAgAAAAjwEACgEASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDgg6icAAPB8AJ0BKpABCwE+kUicSyWkIqGk1JlgsBIJZ14L2MLfnMGj+H//9JZ5/7fNkbv/i5u+Q5/o6YHM7/rc8X//8vn+T//97ipZxG+NxGEQduYteIRTyPQ579n9xidMu/r9nc+Fv1OsDljerpnvzxuPPQR5//om/7m+Ab0LjGv6TyJ/kf9Pwh/gP8Xne//+Uf9fdr9wuJz/77p0qv//15v6f/H///C5/+YZOUPqfBWOQf5BkIGCscgIW454anbBJW35BkIFyjVL5uaxjT2ygOyAftgdMz4jv1IriXfg/yDIQMFUQFiVZ2Rox7CLtv2L3C4t1s2ziJRbbCXovQv/CMpNAVauTAqYtmicezmWuzd7eTNHBM6Ccedoo+ZLon0jkH9HuXCdr3L+P6vZ7bCIaAR3TGr0Wc/2ce4Z9xMzkZB1y9JelDHWoPEMwquIiRB0FRDmdkg++1wyWCOZpjOu5dQ/9+l/90Mbl2lbm35Bji7VHd1ZUbQTM4q+4MFboilQyk15Rv/oVO/OJkSbWWfzopKPb/GLKvenUwd3F551hspt0kCGZhj4T9e5RFqMLIgdUYhH0o5/0ky3gQaitDCLclLrwHi4aHnUn+32xWwUXoBNsWhefGwqdFLiHQusSgcR+lYynunYZ1eYHWhMdqTuhCslHxi6aLR91KTE8Bj9O26QMqKWO7Zt/Zwt37Ug7TeP1HLMJ9MRGk0NppZlM+fB4RkVBCJXLSKbDJxhml2fMvjuSOEoH5XjNKgk82cPR9hYZTP89bUCkt/PGRHhlT+qvgnRjqYJFhQO2vysAIp0MZlxzOGa+ff8pPX8g9VtwFdqeZgrYlI5+rqXCxQqoogwy6WEUMQ999DduBdQn8p1FBjGF8vIdtD6tRuXYFhEmjfcPIzS1eVm7VzST9euUDVHywuV43vrta9gbBTRkoLL7joNO63NAKPrRaki09bYK0/z7w1JTu5Pz7ymPvMUxBb9Wr6YkMoNHGzWA9uJVar4r/hhs/8Yb46Lq5UxabM+ivfwmzW7DzGOJwQPrYjSANufc3WHczIfqqMnhV+D/ZCWS1FMHzdmvhMr1S3W6SMRPR5Vq4xnS7ACG7szabYUyyOgJxbq5JG8LOdbLfevvvvlvrPqH8ijHyq9GHcSn52VITiV9QV4iV24AfHV5SUdakmWA9a6OfJ1RfVW5sGKKrZMEsQxtG8lpI/xwqTt203iB6TzGxuqUDCgs+xHDcFlHMWmhtGsACwXOWGchknOruSGvhOsrvxNyVe7ll9e/gd2SUf5XFrOOU7qSYETZ1qltBQdtZo1FnllfJHlE7nbUg9EUogKu4DVRjj0t4GnJn0eudN7G/s5CAD+8TS1C3IOw4IkV+XcuanWGo0WlAwxZVRBsj5ZxdksErPWR9EFFlgEzeEDvmTwIK4oDWkE9O1xl2qEShukbjO/2iuKdqy/YcCpafmXsrGoA/TJ1vpn1NXlevF+R5Q5KOviwpoXmtUFKOx1GxMac95OxFDyrGnIPDyDDndrZajiHRruNJ9AeVqQZHRgsRuMw+tCTAhcs3FN3XA1G2ndvryqBBppZ462hCdVKBK+66AUBTQI8K8Q2orhInjQ08cHYTD2NbCrwRfBpj+kDR0c06xZyWwxvGIp7OpsvsO7C+KveM3W2zab2RdSTONZK0aJi1Q1CVX6o3pKmfceEqlCEDh03F0qr+JA37cMSKmPO/jf4HYCjplIwOlImzE8+qZpJBdE604kJUAUCh3MAhimachXRp0gjIc3JUzE1ImmVaEEPLBUNENS4hW9/BOUn0Y4LeH756XIi+34lM7sCgGxBfgdJcJLK1a2LWuEmTlWeHS6hJiG8JBYqmwg9SjNdfX8+8EFqq0ghKmSgZE9s4pTsDkzDdysnX6Gm848I2Ub/fPBMp9DmkACmiUyd48zD2YHB5gKDrgurolkmt+CdnLxbipJEGdMmIn/6RNPWIstIJeT05f9q0coTQKxWsqbsxgC2zSUHsBuCxZasPZ5RBom68SAjENLWTJAo+NPyKbZ+wTljPhz4c+GFOrL8kCDaP8YkLRYXjstAfD8e2KknjQLRXfSzwBJafGlx2EgF1WZBkFRyqDBMtl1UB6V6JaRc8z5FGdje/1a/Ru/bQCnB2wiHr95gP/MnxSOLXnfj3jxH9j2E1vm3tsZyjZWKlgT3deJFhmL/q96nx8ns1nN+srxtMGZPVbAX7CL6OBSjNXn5D93BOFYYwaWRpnjLRqtvGXYaOn20iI+vZZDF117NebFw0M4bfb4qAJrOUUEB9X9uYQhEvnmGJ7U3unayxV1JLmtgiofKmGr/K52QxH39i6fBQDViah0vT35+bB11DOo5fucNzZkuw8UXTLCQFtbwiQccf5CAxBkE+KqaPFzI2jOHXHFKOglCibTXodFE6AEEBKAnGO2dQyHKsKqwvdqMQ18/+wMUVrOI+MWnSv4MU3fcnKXAR6h0qjnKWKnRi2NlkTzXDgHz4KuL9ZS6XGR9fAcotso8N9AuUabuFTfqq0qBGJKABtZaYNHN6HaAWxPeS3MSYXCgOLveIpp/q3cEhdz7u3F63cIRuksWip/5EYViuGY6tOEoCZv2a5OlhQOELiWrADWOMRrrdolTWRAUoi0GupzsodIEigjc/wR0hk/dzYvFLkYUrgEUb8N7hS5cmokHDRAKUJHmnmDxNPPe7NITNwrnxwZZDkg9+6tNjNbKWVtbB+3x3/BlR+/uG4PLU76E7P9Vo3pD8ic+bsHzEeArDkXBgdHO/2L8Fg3ME3HFOyZoVxnbIOOwKzPPlH2F4fukc3jA6reIP1wfWgV+1k38cMIBX/tSrlRaNfnO74TVTyrZPU74Xm0UKSxIzPK+p+d5MY3fEAuUaYCPoRZQOZbIAuLOSEzKqZo2H9VIo3YJDemtgUyRJ1LWlmYsmvbqmwwJf0QJCkh8CWdEANzSd3lf1Ah/0q9XUYl8CWHaCBEOLCJXCMCYWswkPlF0a/nlemIvaureUbB/d5xi9dXrjudTHtFnvEYy2urCUKkSGQv4qWKP9jFpZk+mm5goMtyZI3SjyH+PG5mBcX+i30afjx3iQx3HdYXwyGzH9h3vgupCuZcNHmgBc0bDtHUCyzsesif1nvbkMwYXIs+QB6w87gsHigZmdfW1xeWyNMlQdZraaIa1m1Q8RNtFI1jn9qKODBn8SEqNUZ3l+3xmBUtM4ptr0vgA6OfevjeRYfLRxVOGyzSm3UNwxCilK8RJ/7ASfLnqPu2We0JbPN2cywaJwzDXijGoO9RhXwul0gYUU5ijUbJ0eSkQ3i0216s2oDYo7Cno0gwqsvZVcDCqxPTjTYr2kOJsQxs4X7zuspo0w49KdOex+Wi78PlAdim41sxGb/9e7k+xO/wardeooAWu5wp+khLralhRMI4UQmj0VXbFhdMLftFsesEqrTSAB2mysqtqre1Bnj6ko0x5JtmblRin7UK1oWHq69BjIqoJClmaEwaiCwGTYVz1D+PF2uwv5L4MIvB06MXFBS3c+ZVv9IzD/20HUAXsLRJ9pSQH1O6ckV/Ekyg1EnCJYOPKZ6qlfXGcXE7XfK/9P8RgvtdNILtEoceGh7pTkaCf0ldSCRSxwD0NyVO+lST+WrPX79xQrQnOcofKTrAqM6fxr2gVGAxIyTu+6CtDaDy2rxrfv35QyCS4/DCsRqZrrcRZn6gaWoQgmaKmUJtEmOeqgJsWBWZPeYVFXl8kDTRHXXA6AC8V1/EtOBvs9Y4vKPvgiFBPfSJw8ASji4NPgjuSoz7ZO34RM5VEtJSuVnuEHmbcKkuFbqnaEgCbc+rE4is5z0trJk2x0TM0zTXvw0WmU5rH+v5/KQrptcyce00R+BbsqZuMthw4rz6xsNBOyj00Gnb7ltIpdtadqHyAtrxp+K6WbyyYKzyaI20ptxDHhr/4czg0wRJh268WoYEcWeHM4Y/DpVU/pcJB5kRX9l/2ts4BbVQQ+RLgyAB6ypWGGOkqGMKmFMTF8KMUsYmW2dwWzLTqCwg32QEYT1o1n8cgU2nq9LcEEah2uFAMDzjYCnIDgmV6XCHxvvOQCrGC2ZXyg1zoHCdt/hwVzNbDHAHjtSb5sjk/ZN0EANYbApeN8L0wUwYImmaIE7mj0SuivxCNDFf7kyjWV6dDNjdRTO5bMqIzAGeoQhqSblO/hD+mPK4BMO05y1QpEohbObZKIUlD7rGQb4UlXHdrjnTRYPjxn4mRhuG+IhW/JnAz2rs6geK8MzwXQ6kO3dR8Vu3k/02cLqXB4ihOHhuO0L3x2DNOA/wh/tqkrDJtLqd1+I3iuW+HG1aEi9nA4tTC1vTm97fTw8RLKxVNhLRTDLAxMPC1uU6thZAgQfhmsrFDM4Wgb7e2sMDYn+hQ3ubRy7/HSzoyRbYEJCpEBi6frK2duuPzNRzl9JsCdGwjLmyFU6zMmhRwvfOmQzLq/+nVql7e9g0ncDTJuGau2UVtsSnG4qL/YMR0OBWPlCP2VE33pvRgHa7Og59XLVpZIfZxCDegf9VJXCU+L6m/qh690UCDkY5W2SpQ7daKnOexpxPPG1knSEmNgBhwc8JmfOSdr+m2mf9fUxR4atwdZDlXlWFY5Q3n+LkPRjfji5oVnN4e+0KeEBWVPLQAAgib2moKy7VgI0PgIlBrOEH5a2dngcdb8iEyn1mmentNHb7KROblJiG4JfhahMBLjXZSoIALWEs8Ciqcyp66Y5iLwV/AwB6rH86jgKZZV00DyckYhsKRe/KlavELHXcN+pnH+7t7n2BjdNA+c1MCC/l0Lk6jEXgsczuWEaVR8EaN+ynDt78XSQyz1sMUcWBqPO8PlNnbBuyuCXB7ukNxOKT6kUiQUti2BDn4GJPDHrAjfwqyTbj6b3kB+KacnYwfImM0lrfJTbI0upQUNvBTBoCcVvQ4CoiYvdvMkOJMzdAAq2XUmCD/tuFBJGbvQTCmU9HWlT9Bvbi8e5tFQ/MOpBH29KA8qOUwW6JzXNIDQdq+VUPvltrWxAFdlZIMfJWjIzz1wBo7rnsaILbiRTI85+2AEZP34m/1z7Gv2TNFfEJaOWRy2MOYvDB6wecP//QM8QsTtZxmxt/t6V0pvaXTdYt/1J/JpJNdpIr7wyoaVeAplxMZPXPvGgrHEsdyn/qg7ydpKyk/EMrkiX1O1ddERPwhe9XZB7tjRJ9xYGAeISGUzyI0m6FScSovAP1H+WQU0j6eRyMZwD6ktF2K2/eZKXLUlVc9IMb8RQeHYOPAZSwQUDIzjbzimElAc20YPa8vbiAHS+EehSUd7KSYpaCNzmTTCa6G28lmblqLy1Go5Bz43lQKxaEwsMAOEzmUXyUmix0AWmLLVEFeqt09+uWgF9F83wg+q08ySpF0eysX25C1tux+an5jzAmynZYs/9FDLvjXMYSuepkdjNB52GCsfNi6DrLIsuvCfbGO2wwuxCl2JXZl4C1G9jo0AQe2vcSNMCvp9FNPkONecoOwy9vbGZcTeqJwB6NWV76AD01DvHaQXorSI/ZY9pNqGI7GNf4y8Du8WgoQZyci9KbyEj+bLLGszjLQCXNM0nsyDqzfZDLcpzhKYCGUdjmZVnYvJiWhydpD/x8P5lTTtbZIn9NGL1zkHTbsI4pVRhFqzpLIDtoghFarf/OfdI38zmamKqscFrkWfKTZA90jPvO2G2cG54u/OW52sScDCn4KhL5c8OXvDO+tS0NMqmuwB2xOUnAHASdN2USDy2VZRpNEUYAnYLhsROvDeOYBYKBXYT9cBMgm2F66ol4EildrXyikkYyR0z4RAR0eIwvZk/q3bz0hhjU1i0k6RpnwCR+Qr3MaMbGPxtZzWDoglhN+S7jSwB9ZOKbmpZW2gCTaZE3scSpAUdIUaZQkCHEj6gtrB3ZqR5GiGAjkN9aFD3l1TsSvvAmROxqHSgySQUUYeVBPjnPGAQDPodEjzR9LmEOC9X1RaxMDPZp+7RArlZMP1CADKAJzNsWWWl6c6+rBY4ik5qfwkTPRoblofdC7YuEdfhOqUH9bCPg+tMPTQZJAUJBXrveFpNS3EnVNiAuAhSBxoxMlKhkJ3bNGweu6zo4sXz4/YtH4dSIKLS4RTFgXS1WeT6G9ISwY46p94+Z/ybjYMDILdncsW7AQHklukx7QyeecF5UBZMKaRG1XYZCOlg4cBHtBRSeQ0PyPSkzD47/vKndHUfEVoe6Kr23z56CA77+rgMZU6HL09c2m3YV9Im4BhTTI2oWNK8TpyWq8GytJaOqwRBTaZzXBujqXF/93ejP50n4QqY+aYO3TqCJnq69sPxJs4i0HeZaYm7hj3+Qh2MYfVN6xxnz81aknlsodD0aXOrJGXNZhIx2wFDEHYXYkMx+UeVcYSbsNoxaA+wa8GSf7q6JBZsLdz8laMEd966IhOs2sO0BE6g1qYg09cua9f1whU3MHelwwh4tRj/Cz/FcXj8xBtzhRE+BfPc7Q/QWeF6iRf+IbKtTavLZhs7nGHVlhO8SKY+F3LFe0fVSrV1cpSeSNI9kExoDgPSTOksFW+Lr3ItAgNLYMSMYzwQqmkJ/gQu86z3YJb9XcRQhsfA7gF3VR93CZCO+NIVbZfxQXyTSxoGuxvdkBsuRKAu5fbeOmJS6NKLCv4ZiFLHR4zg4aUHdOGS7RBWeY1zYY9IFziSP08OBbc1lQ0x+a3C2uSZWzYuzhkwxLXqBFwwGyXYm71h0WYnxKIpJa2ZNNiwD1cSuMQlkxH4gmJmGr2WrwU7KFlfPfkmvloUlqo7szgk/BFqb2B0/RvyFDtBW1+MmlKGeZkGp+1f+zoBIlbqBtIaGHtWBHFzjgNbw1621AF/zEKlckdimZ4EfbZCxHjRkxbEFSlOfp2CtyNbjgSnN+vYbFuRfTAPorCqB9sckDIhxCgWQVwH/9HJO2dYFWvnjleDcu488P1Tf9QYyaQ14PZJ269e5unzaWFm2OxrtFu3bdh0G/lKziVwDEp2RPYxSFzezH77l7G6/5C0vRS2UEA9vPO4RNivXKc/iXmsW3orLdaBWgpU4/xeQW46Q8m0HveH1d7HhjAC0qMkGTuVU9raSuJNTJch47OsabwAh5ndhNPicyu/ECcxGtZp+4WeBWG2dUwOp7yiY/sYGyE17iopN7ecqSNwzawnbJdKHAFgw+PG6OJsMHggGaDUjKxqxDB9GEOY0CGDaA7aytZkXdKYGSTXmheuAXGADfgNDrIlEkYfKB7vBLU9ND+zOof6a0uHxJrlNfU+tO12IJcBsdRoAT8OVqlxdsXdDV7eo8qnbYKwJI4BwcoDHY/9ludyaMrsAYiQK3g1OMIwSOY+hgabonYLtEVqWm72BCqWDcoU0X8wik9mzmVp1bUwFS0cLeGOPNDT5oiaJn1yoDEupElIy4rvB/4MFIDHgyY0yx3wZp5We3c6mWMFr4bB4R5mTjVOo9VHD84pm8ct61NTFpuLH4vCYvPky/sCay/6oa3K6yvrXY5EcMqcpe/z5Uxwunvf77sf5b5NQUmvIpyh+/apO5axGoFWD5h4GCNVUNe+El0X3/kZKjKxwV/HZVzx0HuPzopO6aKNE0q0wrTQAjFu4UIhsb93trpvjH5o/bOXMqLiZ+b6+Tv+rxIrAgo8UF/y7r5Uc0oufNvslbhwjuoQOs76F7rfkUxKzzPdGzuyZOT2ew6QZvX3ilRCVlY0ejzMnGqSkWZlgRQezAv1yIX+CpzVveZJDviHoYr8YGAvLBE8XTQzErWmQ/tw8i1VBiLUndwUnaC5f/AA2JDYRBKFaS3m0EawP8OK4pAtUuObwW1H3pd6rnZPssi+oMgRgjErlb3oyWPYmvIH2iwdnNoyPsU76GZh2uyBcekX88gCisdljufY+xyessGkVlIvaa78o0VKkzosOJaOKGtKWo+wzJ9u1WK113RLKWDpnvMCRZYdHEHsiD8N8wd8oquhefz5C2mvztni8gUdqwjiiAs+VykS6+jFCrd7Nf0avXPbrDnV1f9r7ljc75Ix/Qa8CSqAkyvokLx+EmPU4drtpin8QHzG0JmBXMO2a78JM72Zus51MmYj8r5yvbv6YZ4cPOijVJvBZC8hne/rUCS6/o5a+Exlk7pIqBTLLivr43/0RU3aeruOae/345XO9HrFL5Ft2YNg3i8Lduhgjd3nuyhJQVOLDZpjqOFAlOS0MiCq0hXnvFvHVVyVyrbSMaDDLOFNCtighk8EmpFZfCu9cbrTaL8MjV5lwXLTzB8DCjnjDpqNmgeqG4iGCxWwFPU03WzU9/rcqOtl4dmB0/Rox28KgBLUvfiZ2/37wke8AMeezWf2UwRNJydTAJb2GjEe9uW8VeG16dai9OvEpyj70BiT34+UXYNtjdE0FnW+2UaPMEJ8v0gnawPcTmMfmgsGe4oTW0PBfsvIGeF5g6uj7i0mV7T4/ocNDbTgbsApdOiKfkDYggiuscWUE5tsCHvBvcR8lB8YVqCIrbmgZKrkIoEqtS4ngvzdPUMpGyWMHeTb5Nf0y+Dm9AQAnpk3BMg98qv48svJU1PtWy+5RitDE4gCEPE1XRgxvvSMeBKJUM12WNrTAJ2+kenTjDJxIFs6xcwlaLuc2mGxkDSw00wJc0l/XPSiqcsWyo6ORytoB/zOkU17ce8tFQ76g0bFhFr22pYMJin+Rgj42JM6qOks8QPIF5RRng9JH1lTeAlqQDm/QmTsle8nLxp96Gf1MVcDaRQiuTRda1gvEk4y4PWSfe8ZQpTQ4AhZvBSRADyWmLg2RlWVsEOzgSlHhE/ot7okXZ0D03C3r+SwqASku4DZG8e+Xop3ye2lwLxhn+YU7fj4eXaJ4jtxV9rSPQ4PcWdX/kmFM7cuRJVJcQfjUTGmxApppWwtv4WxvqQ56R9XAHryDl/eolf04ZHqQnKxduq4hM+csDKqmUaENQfGjkau/IZ442a/b7+dRz3C8TzgnQfUdalHuy7nEF+F80uySSZp9BTgygNxSAdbBELt+wMx5fwBVtufD8q+RlfilqPKtgZ7nCkhin9QSqw06V2BmTRxXhklm7Ff6on7CpLCEp7lAW4x5pWKhPZdZ6+3yUR3wn6UnnuE3BVUDt7C2sA8wo3T5rQ9SnkefVYeU8yrUrlubJK1xmAxyiKPVSk8TAoK68UjvXlwKhbtAUuvkNso9tvRjNIYIKkF81X6cGW5jRrGG9TXQp4oFTSbBSPDpGfMu+l2lF9d/YcH4ksGA4c0tX27aEKxJLguIdPQ6gqdjmmnj/UOOOvQIB2j9vVfFD85fILSDfEGchNseukLfXkwYH7+lFG7VaeQBSshf6jMDqfrk/TjsS1rOaAwfQgABGhcdhgI+66OReM0RNDXS2EEGC08hyXb26mZtMHrE01aVxX/LubjWEY/337CzpoydfoyogZGehxjbr36y+4TnMuxYjiSpumUXZm+9AyR2kEER5WffspekhYdAquGIl/VYSUSEMCRTXBgl/yN2Y5ymJna8CnAdmfIejCQZwV6f0J//jzvK5Vwm8mWC4rUsg3P0mDcEF14A+s9PUzScmQUMDKiJTr0AUPYTusQ3g8BNyYYqfx4Aodjp2SCPk72/L63d/bQRT2zsvptfMiyZ30lkv+/yDs1ksDcH3WbJFRHzPjuP6Y1eEuYAkzhTHWVaW31wvCKHS05uDcrKb8tpMAYIFhbKPgviZRHECs95vUvtvyqYQq7ndnSO0YDGWxEUJTMCrhpnaHYX7ywvBDvZPnSyodCocgSUpBxCvt8VAzg7sPriJIC1FgtQ9QwSAgi6g+KjJxCafa8CAnvceIDkIMrCbE9gTUe5IA/VZ+LQCzODKPYjMMkFOjEA2EtmksohBFnzaQ8DtsOIRxsQ0Bs3wQrKu+zdlbQQO9xTh6/8jjdL+P4+FkV11AlZIvDudJFgMIdPhnVxHmKMsEFEQPaLuNdB4pkVMU8F1mthiwz9EaRfd2zX7QNrFAos1BFhXEBNfXIM70jYQk18rybY1mbyJLDCSXARItj40V/25as4aoL942NIJjOfZFoKXpYbMFQqbvn23w+76F2s4Ub3ZvLwiecCMbKHau/77TDApkyogC2njPzuj86DXSGEb888glJMQvJbCxKWkp2zY4HFTPy4Q7DVtNakAEqv/At5tz0fKPKfk7bnyzUUW8ZcucJE4cVmXltG34AUugzYyhetZBpz3pOGJNQ6Gh0Frt/mneOtrSOv6pLh93lMLf5dSVeonqd6NJATgo28Cknu3LwIwAAU/QfYPJEEJTfulq2RQ/IDP2YWB8hFZZtl6YVcyPA/Q4rpRztvGXGpMdEZWDvngt8O2JMXSBKuwzaA0KN8FMT5ocI6WonYDsLNM+ciPKnDkNzeXcd6DqoEQN9INiWMLP0U5cUM7qhdmQ7XCRiQowZ0XcH16yDdA6xXTcgZpEE64IKA5eyIDfa+b53OkOG9/ZGUOTCMPjA+reXGpT+VTXZh0AG8CVJInbQNUmjvWlmlsedPKOIEIRUSakxDfDkFfumlHCkwdPodfo34EtVsZDLvEDQbFfLH85Zvm+/myDQaRgC+Lg2LhuAPTZayw34iZdmcaNxJvd1g9WX31U0yNPL+9F7l9KTP9k50CF7O64f0lr4D7nXu0mTKDtvfJ5giXCjkqcz82+2/nvmIt/qAvWDhqqds6SIZEU6r0/LB6nrsykFNn4IBDs2cN96ByzsFC9zx+Wm+66CW7I01RZqUNEKw/mwE/sIvgjfkXUK97S5DNHOZxSMmxmCjIoItcKS0XinGskamFyJCdAqjmMsqSnj387FxKxxWWVocdAIVUlYcVQOVDvgqwjCnrUCB2y9qwF3+yGO8bvgzdYtpF/Sx9yxBwq78N0a2KDHU33oMPnyWvxYisqFwejEPn4dZsOCz1XzOXxFmt7LXng4+MdU0DqkHZ3FCYDk5OAZZ5f4hzA7H2nKT34HUntcR9V5HFDST18dGLeE2rM0MQOjVpx7pFh9fvP2/wTiFXH2yd9eDvXLSdvmKmMt/ueJu/Kdj4him7RXRdPC8KOYlaLSQolH25nnGTa13U4Qv19ZMq4XmxbqrcrLW9PWQf+Bt6o9mlXH59jLm9Zyk/tnvMxM3HK4ISHLnKFG4MhSHebWXnX6DSUiqe0oiwBoB/G08d5kFSQ3MZVokaa02hXJEk7A0Ks0WvA4Gi6CjRVD1Q8EdeEcCz+vdUY14eTAp0NI/stsDrdngcpTJwNlcY9e9HjxW5QJ8t7QtZ4IUwajHF+DMzi3+ntOMBH8Y/grDdoy0eh4qG72G6vxCp5B8W7F6AnnrbAPjIAQU10fw4QyThMCpnvm3JqRFdItaTMVIrGDNwVI/y6zmQc37WH+p2ofnSQTBZrTbGf2qc21hPcCfNnGH3/QKxzmpSgDotg6nVh6uhPAsTVC5s8EWT4kvsXXlJ4FGmnQfm665wbpVjgcu7asxTh4UnuoSK7VW2nJfSTclZl0kfq926DvyIA6Elh6yeIDHA+aaVwU6+gGiKMcxAWRplTkMJaffHG9RvK/ykoJT3VpcpMfIVf6l5vl7QWn5lRuDxGqjRDkFXU/FayNbF4YwjH7ojmIEZY9To2sscvzipOQxOrQR4KwYz9S6AF2BemSxLO1HCgh3aSpSn8/Z8/pRGxJTSBZnOiI0K2L7ShtGISXng6yvBgzOOKG5JI7tQE6Pl8xrb5AOq/23wl4smgAU8G33iJ0895fsh0LvjRwculd0N3EmejKLbxQSt993CYMpoaRPO8DrCpwan/9AUFiFyNMiwoeGy487YWUvIWqzBrRZ6/wjfFUXpc0VxqysNOLBdZxICKvCBJHS9p9+AHbPJthVU2LwRdEF+3g8w7yT76OzCi9RDSVcAlqwD72UEjh3vM16qym7Ru5I1KjW5miqDZlkLks5dYlR20WVCfODNsR0opwRAtRCxPblyGBfxb0TVjr8GEQqR2ysmh0KubcgrbhEpUsMntHcA3JM0lpgukhmYDKmD7ji8AcHQW68+N/tQucq0NG59Cy2c+b2dUswEh3q9JOoGswnycBRy1y8q2Gfp0DK1c+ZPWmEMDbTDs/zAEwzCaTL/77Fgxt4S/uWwUVQRQ+m2ewSfA3xESBrLZjrgdTfB1eK42uLQrhIO7o2X/+TNvvAt/+nLDHdrEpOtTL1hmPBIbw9Ps3W9PK8EaZGUKWT6ZpWIGkeDlTpMrF6Zm7CjoEd2gsr+TIfqAqeLT4JGCJC2yux3sUIzH7nX+KQuHkMDeR6Z8NR3eeVtAqIqrE80PMgk8jTn3EthzKXhwkaoqEuEoEA64TQ5h9hn6p9RYNbUHA4CZU85Xzk4TA5PLGWl/5xQ5TKoUVUQKrhg80KnxuJRCTyOEzF4TiTgFXBOvAlfCkMdVYWFgRXo1GyMNitH7MF8v5HWNSz0eXXDM5WBDyXfw20H2K3V5SOL4ayukJsfa2D0igzJAx06cSJBoK+Bis3RjMleCXxyqD2VqdIywcuHKw08ik4OEjjWeP+4PekzWG8+anWQAz+UAgx+VXpWE+lYKcgBWehNxitxuOfmJmceMY5DQwJRAb0XY7+Grv+31jwhvmQ08mormrrWoE5jKP8++5EaqVlplBx6kf/qFGiEj50yQXdx/9EVxsDvBHzU3jBWifw8RRI9MDWkeuAWpUIacA4sP5e3mH2EgYgH/WM9RSPyXveL5vp/DSWV2ic3/wRLN7Z1CLirYFhTTFq4VRWBox7IoxMkGzMkVXLuzt7SNwIIadl+XjOrIq33V/cUJNLkshrb4oCVlqyU+vDv4+cA5w498NPIYx4iNcIMiENfBUKzVJuMzXsrEooVedCG/9bPCsHdDYw4EGLuDO69HWeEjIVtiKmpwBdOIyRuc5zg1nYsWPNCmWupy7x3xSkXs6p/jTRNzFTWfMvaxkd+Hol2z2YUh23nVVpDbF3KDQTB2+8Yk53wy++1EoV9MIeG2rLUfb9VstAGxjda8sZUPYqQXyvIbu92lrBTfQ7KlIsQHv0jYo73BCPO7x/picX3h9g54cFazWoAoQXy8d9vNcZtCuVEtUJEs721r3lW0+wavJPN4kMiZQ8Ki2Ui+L4CYHkm2ofspyNZfZiH6Ps98gWNrf0L7X6bS9yg4gBcoiZefb9DJ/EJYroKeQ9JyXALwXXBPK0JZRzizbDQukaZwujVUkUr35X9+Qu74FIn8kepA5tnDkUnpcWWwzjKmNbx1lFQLyzEHJy13bxnlHap+PwGOvluRVxMU1Bls7XAyFWao2ccSjWGHuTIUAfLxlYE2nK19a02l6rq9gx5u42Gl7SrhdWvniQa02mXuK3vogduBwQ7boaT+AR6d8hlxkgo+/y1O+SUYCg9uLYsk095QgQf6uYp8WqZfF+x8SHxDQdrOl37qs/ON6XiNVQtT62hxhb1mOh8UIPr1k0Mad8wt7ButGCAGMJsRfDhNmCI+LXoJaPdmE7WspWsb94S9HlQLCuNh7Z0GQdaRYd28F7ZpC5eLcIMxNp6AtcpO9WY1qCrYhUDDkn1pT87lpQ5ROvtK7sr5CIG7KdjSgcjHgTEqDzStWmiurbXHTaKEm1vuph5xL9vv2lLSSsRPEvQ9cOnxiUL1BfdL93g76ZWWsQ0rOqxolCGYfehc7uheqi3GveCola/ILV8LEPhg2a0GEKgh79c8JydUAAAA==" alt="" width="400" height="267" loading="lazy"><h2>نتيجة الشهادة الإعدادية الأسبوع الجاي</h2><p>خبر متخيل للتجربة.</p></li>
  </ul>
</main>
<button type="button" class="chat-bubble" id="chat">💬 كلّمنا</button>
</body>
</html>
~~~

**هتشوف إيه:** هيدر بخط أحمر «الخبر النهارده» وخانة «دوّر في الأرشيف»، و ٤ كروت أخبار بصور، وزرار أزرق «💬 كلّمنا» في الركن. الشكل في النسختين واحد، الفرق في اللي بيتحمّل.

**الطريقة (اللي التقرير مبني عليها):**
1. **Lighthouse Mobile:** الدرجة والأرقام، وأنهي metric أسوأ حاجة (هنا LCP و TBT).
2. **Network:** الحجم حسب النوع. الصور 9752KB من 11MB، يعني نص المشكلة في ملفات مش كود.
3. **Performance › Main:** كل long task وإيه اللي جواها. ٣٩١ms [[bundle.js]].
4. **لكل سبب:** الدليل، والتصليح المقترح، والمكسب المتوقع.

**الـ facade:** زرار شكله زي الـ widget، والسكربت الحقيقي ([[chat.js]] من origin تاني) بيتحمّل بأول ضغطة. اتقاس: [[chat.js]] مش موجود في Resource Timing قبل الضغط، وموجود بعده.

**البحث عند الطلب:** [[archive.json]] بيتحمّل بأول focus في خانة البحث، مش وقت الفتح. اتقاس: قبل الـ focus مش موجود، وبعد كتابة «الأهلي» طلع «٥٠٠ نتيجة» (نفس نتيجة النسخة القديمة).

**غلطة في أداة القياس:** أول نسخة من [[measure.mjs]] سمّت كل long task بأول سكربت جواها، فطلع إن [[chat-facade.js]] (٧ سطور) عامل task بـ 143ms. لما فصّلت الـ task لقيته **Layout بـ 144ms**: أول layout للصفحة على CPU 4x. دلوقتي كل task بيتسمّى بأكبر حاجة جواه.

~~~text node lh.mjs و node daily/measure.mjs
Lighthouse before | Performance 58  | FCP 1.8 s | LCP 60.3 s | TBT 330 ms | CLS 0
Lighthouse after  | Performance 100 | FCP 0.8 s | LCP 1.2 s  | TBT 0 لـ 20 ms | CLS 0
== before.html (CPU 4x)
   long tasks: 67ms ParseHTML | 64ms Layout | 391ms EvaluateScript bundle.js | الزيادة فوق 50ms: 373ms
   الحجم: Image 9752KB، Script 1434KB، Document 2KB، Stylesheet 1KB
== index.html (CPU 4x)
   long tasks: 141ms Layout | الزيادة فوق 50ms: 91ms
   الحجم: Image 41KB، Document 2KB، Script 1KB، Stylesheet 1KB
الـ 67ms ParseHTML = chat.js شغال في نص قراية الـ HTML (في الـ head من غير defer)
axe: 0 (بعد ما اللوجو بقى h1: «page-has-heading-one»)   الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~` },
      ],
      items: [
        {
          cmd: "CLS",
          ref: [
            { t: "web.dev: Cumulative Layout Shift (CLS)", url: "https://web.dev/articles/cls" },
            { t: "web-vitals (GitHub)", url: "https://github.com/GoogleChrome/web-vitals" },
            { t: "MDN: aspect-ratio", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/aspect-ratio" },
            { t: "WHATWG: the style element", url: "https://html.spec.whatwg.org/multipage/semantics.html#the-style-element" },
            { t: "MDN: <style>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/style" },
          ],
          title: "الصفحة بتتنط وانت بتقرا",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** أنهي تغيير من دول بيعمل layout shift: عنصر [[position: relative]] الـ [[top]] بتاعه اتغير من 0 لـ 40px، وعنصر عليه [[transform: translateY(40px)]]، و div ارتفاعه 80px اتحط في أول الـ body؟ اكتب، وبعدين جرّب بـ [[new PerformanceObserver(l => console.log(l.getEntries())).observe({ type: "layout-shift", buffered: true })]].`, done: R`[[top]] طلّع entry، و transform مطلّعش حاجة، والـ div اللي اتحط فوق طلّع entry قيمته أكبر (قسناها 0.022 في Chrome 156) لأنه زق كل اللي تحته. فالحركة بـ transform مبتأثرش على CLS.`, sol: R`~~~live 420 420 test.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>layout shift</title>
<style>
  body { margin: 0; font: 18px system-ui; }
  #a { position: relative; top: 0; height: 60px; background: #def; }
</style>
</head>
<body>
<main>
  <div id="a">عنصر</div>
  <p>سطر تحت العنصر</p><p>سطر تحت العنصر</p><p>سطر تحت العنصر</p><p>سطر تحت العنصر</p>
  <p>سطر تحت العنصر</p><p>سطر تحت العنصر</p><p>سطر تحت العنصر</p><p>سطر تحت العنصر</p>
</main>
<script>
  new PerformanceObserver((l) => console.log(l.getEntries())).observe({ type: "layout-shift", buffered: true });
  setTimeout(() => {
    const a = document.getElementById("a");
    a.style.top = "40px";                     // جرّب واحد في المرة
    // a.style.transform = "translateY(40px)";
    // document.body.insertAdjacentHTML("afterbegin", '<div style="height: 80px"></div>');
  }, 800);
$__lt/script>
</body>
</html>
~~~

**الإجابة:** [[top]] بيطلّع entry، و [[transform]] لأ، والـ div اللي اتحط فوق بيطلّع رقم أكبر.

**ليه:** Layout Shift API بيقيس تغيّر **مكان العناصر في الـ layout**. [[transform]] بيتطبق بعد الـ layout، فالمكان في الحساب متغيرش. والـ div الجديد بيزق كل اللي تحته، فنسبة الشاشة اللي اتحركت أكبر.

**ملحوظة:** [[top]] لازم يكون متعرّف في الأول. من [[auto]] لـ 40px مطلّعش entry في Chrome 156، ومن [[0]] لـ 40px طلّع.

**الغلطة الشائعة:** تحرّك العناصر بـ [[top]] في animation.

~~~text الناتج
top من 0 لـ 40px:     entry بقيمة 0.0039
transform:             مفيش entry
div فوق كل حاجة:       entry بقيمة 0.0372
~~~` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** صفحة فيها ٣ صور من غير [[width]] و [[height]]. افتحها بـ Slow 4G و Disable cache وقيس CLS بالـ snippet أو Lighthouse، وبعدين زوّد المقاسات وقيس تاني.`, done: R`رقمين قبل وبعد، والبعد صفر أو قريب منه، وفي Performance › Layout Shifts مبقاش فيه مستطيلات على الصور.`, sol: R`قبل:

~~~live 310 310 before.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>من غير مقاسات</title>
<style>body { margin: 0; font-family: system-ui, sans-serif; } img { display: block; max-width: 100%; height: auto; }</style></head>
<body><main><h1>المعرض</h1>
<img src="/a.jpg" alt="صورة 1"><p>كلام تحت الصورة الأولى</p>
<img src="/b.jpg" alt="صورة 2"><p>كلام تحت الصورة التانية</p>
<img src="/c.jpg" alt="صورة 3"><p>كلام تحت الصورة التالتة</p>
</main></body>
</html>
~~~

بعد:

~~~live 600 720 after.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>بمقاسات</title>
<style>body { margin: 0; font-family: system-ui, sans-serif; } img { display: block; max-width: 100%; height: auto; }</style></head>
<body><main><h1>المعرض</h1>
<img src="/a.jpg" width="800" height="400" alt="صورة 1"><p>كلام تحت الصورة الأولى</p>
<img src="/b.jpg" width="800" height="400" alt="صورة 2"><p>كلام تحت الصورة التانية</p>
<img src="/c.jpg" width="800" height="400" alt="صورة 3"><p>كلام تحت الصورة التالتة</p>
</main></body>
</html>
~~~

**ليه شغال:** لما المتصفح يشوف [[width="800" height="400"]]، بيحسب [[aspect-ratio: 800 / 400]] قبل ما الصورة توصل، فبيحجز ارتفاعها. مع [[height: auto]] و [[max-width: 100%]] النسبة بتفضل صح على أي عرض.

من غير المقاسات، الصورة ارتفاعها صفر، ولما توصل بتزق اللي تحتها، وكل صورة تعمل shift لوحدها.

**ليه التأخير:** بنأخر الصور (أو Slow 4G) عشان الـ shift يبان. على كاش سريع مش هتشوفه.

**الغلطة الشائعة:** تحط [[height="400"]] من غير [[height: auto]] في CSS، فالصورة تتمط لما تصغر.

~~~text الناتج
الصور وصلت بعد 200 و 500 و 800ms:

           CLS       عدد الـ shifts
قبل        0.0829    2
بعد        0         0
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** بانر «خصم ٢٠٪» بيتحط في أول الصفحة بـ JavaScript بعد ثانية من التحميل وبيزق كل حاجة لتحت. صلّحه بطريقتين: مكان محجوز بـ [[min-height]] من الأول، أو بانر [[position: fixed]] فوق المحتوى.`, done: R`الـ snippet بيطلّع صفر layout shifts من البانر في الطريقتين، والبانر لسه بيتقفل بزرار ليه اسم، وفي طريقة الـ fixed المحتوى اللي تحته مش مستخبي (فيه [[padding]] بنفس ارتفاعه أو البانر تحت).`, sol: R`الطريقة ١، مكان محجوز:

~~~live 210 210 reserve.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>بانر محجوز</title>
<style>
  body { margin: 0; font-family: system-ui, sans-serif; }
  /* الطريقة ١: المكان محجوز من الأول */
  .slot { min-height: 3rem; }
  .banner { display: flex; align-items: center; justify-content: space-between; min-height: 3rem; padding-inline: 1rem; background: #fef3c7; color: #451a03; box-sizing: border-box; }
  .banner button { min-block-size: 2.25rem; min-inline-size: 2.25rem; }
  main { padding: 1rem; }
</style>
</head>
<body>
<div class="slot" id="slot"></div>
<main><h1>المتجر</h1><p>كل المنتجات هنا.</p></main>
<script>
  setTimeout(() => {
    const slot = document.getElementById("slot");
    slot.innerHTML = '<div class="banner"><span>خصم ٢٠٪ النهارده</span><button type="button" aria-label="اقفل العرض">✕</button></div>';
    slot.querySelector("button").onclick = () => slot.firstElementChild.remove();
  }, 1000);
$__lt/script>
</body>
</html>
~~~

الطريقة ٢، فوق المحتوى:

~~~live 220 220 fixed.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>بانر fixed</title>
<style>
  body { margin: 0; padding-block-end: 3.5rem; font-family: system-ui, sans-serif; }
  /* الطريقة ٢: فوق المحتوى، تحت الشاشة، و padding بنفس الارتفاع عشان ميغطيش آخر الصفحة */
  .banner { position: fixed; inset-inline: 0; inset-block-end: 0; display: flex; align-items: center; justify-content: space-between; min-height: 3.5rem; padding-inline: 1rem; background: #fef3c7; color: #451a03; box-sizing: border-box; }
  .banner button { min-block-size: 2.25rem; min-inline-size: 2.25rem; }
  main { padding: 1rem; }
</style>
</head>
<body>
<main><h1>المتجر</h1><p>كل المنتجات هنا.</p></main>
<script>
  setTimeout(() => {
    document.body.insertAdjacentHTML("beforeend", '<div class="banner" id="b"><span>خصم ٢٠٪ النهارده</span><button type="button" aria-label="اقفل العرض">✕</button></div>');
    document.querySelector("#b button").onclick = () => document.getElementById("b").remove();
  }, 1000);
$__lt/script>
</body>
</html>
~~~

**الطريقة ١:** [[.slot]] موجود من الأول بـ [[min-height: 3rem]]، فالمكان فاضي لحد ما البانر ييجي، ومفيش حاجة بتتحرك. العيب: فراغ لو البانر مظهرش.

**الطريقة ٢:** [[position: fixed]] طالع من الـ flow، فمبيزقش حاجة. و [[padding-block-end]] على الـ body بنفس ارتفاعه، عشان آخر الصفحة ميتغطاش.

**الاسم:** [[aria-label="اقفل العرض"]] على زرار ✕.

**الغلطة الشائعة:** تعمل [[position: fixed]] فوق الصفحة [[top: 0]]، فيغطي الهيدر. أو تقفل البانر بـ [[display: none]] في الطريقة ١ فتسيب فراغ أو shift عند القفل.

~~~text الناتج
                 CLS       زرار الاسم        بعد القفل
قبل              0.0116    مفيش              -
مكان محجوز       0         «اقفل العرض»      البانر راح
fixed            0         «اقفل العرض»      البانر راح
axe صفر في الطريقتين
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** لستة جاية من API وهمي بتتأخر 1.5 ثانية. وهي بتتحمّل اعرض skeleton بنفس مقاس الكارت الحقيقي (shimmer من درس الحركة)، والحاوية عليها [[aria-busy="true"]] لحد ما البيانات توصل.`, done: R`CLS صفر لحظة ما البيانات تيجي، وارتفاع الـ skeleton والكارت الحقيقي الفرق بينهم أقل من 4px، و [[aria-busy]] بقى [[false]] بعدها، والـ shimmer واقف مع reduce.`, sol: R`~~~live 440 440 list.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>skeleton</title>
<style>
  body { margin: 0; padding: 1rem; font-family: system-ui, sans-serif; }
  .list { display: grid; gap: 1rem; max-inline-size: 28rem; padding: 0; margin: 0; list-style: none; }
  .card { box-sizing: border-box; block-size: 6rem; padding: 1rem; border: 1px solid #cbd5e1; border-radius: .5rem; }
  .card h2 { margin: 0; font-size: 1rem; line-height: 1.5rem; }
  .card p { margin: .5rem 0 0; line-height: 1.25rem; color: #475569; }
  .sk { position: relative; overflow: hidden; background: #e2e8f0; border-radius: .25rem; }
  .sk.t { block-size: 1.5rem; inline-size: 60%; }
  .sk.l { block-size: 1.25rem; margin-block-start: .5rem; inline-size: 90%; }
  .sk::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, #f8fafc, transparent);
               transform: translateX(-100%); animation: slide 1.2s linear infinite; }
  @keyframes slide { to { transform: translateX(100%); } }
  @media (prefers-reduced-motion: reduce) { .sk::after { animation: none; } }
</style>
</head>
<body>
<main>
  <h1>المنتجات</h1>
  <ul class="list" id="list" aria-busy="true">
    <li class="card"><div class="sk t"></div><div class="sk l"></div></li>
    <li class="card"><div class="sk t"></div><div class="sk l"></div></li>
    <li class="card"><div class="sk t"></div><div class="sk l"></div></li>
  </ul>
</main>
<script>
  const fakeApi = () => new Promise((resolve) => setTimeout(() => resolve([
    { name: "سماعة", desc: "بطارية 30 ساعة" },
    { name: "ساعة", desc: "ضد الماء" },
    { name: "شاحن", desc: "65 وات" },
  ]), 1500));

  fakeApi().then((items) => {
    const list = document.getElementById("list");
    list.replaceChildren(...items.map((item) => {
      const li = document.createElement("li");
      li.className = "card";
      const h2 = document.createElement("h2");
      h2.textContent = item.name;
      const p = document.createElement("p");
      p.textContent = item.desc;
      li.append(h2, p);
      return li;
    }));
    list.setAttribute("aria-busy", "false");
  });
$__lt/script>
</body>
</html>
~~~

**ليه مفيش قفزة:** [[.card]] ارتفاعها ثابت [[6rem]] في الحالتين، و [[box-sizing: border-box]] بيخلي الحساب واضح. الـ skeleton بياخد نفس أحجام العنوان والسطر، فلما المحتوى ييجي مفيش حاجة بتتحرك.

**[[aria-busy]]:** [[true]] وقت التحميل، و [[false]] بعد ما الداتا توصل.

**[[textContent]]** مش [[innerHTML]]: الداتا جاية من API، فأي HTML فيها ميتنفذش.

**ملحوظة من القياس:** الـ PerformanceObserver طلّع entry صغير 0.0066 عند 668ms، مصدره [[::after]] بتاع الـ shimmer وهو بيبدأ، مش وصول البيانات. لما وقفت الـ shimmer الرقم بقى صفر. والـ entry ده صغير وبرا لحظة وصول البيانات اللي التمرين بيسأل عنها.

**الغلطة الشائعة:** تعمل skeleton شكله قريب بس، فيقفز 20px لحظة الوصول.

~~~text الناتج
ارتفاع الكارت:   skeleton 96 ، 96 ، 96  ←  حقيقي 96 ، 96 ، 96
aria-busy:       true ← false
shift عند وصول البيانات (1.5 ثانية): صفر
shift كلي: 0.0067 من بداية الـ shimmer (من غيره: صفر)
reduce: 0 animations
axe صفر
~~~` },
            { lvl: 'تحدي', t: R`**بيانات حقيقية:** استخدم مكتبة [[web-vitals]] (نسخة attribution) و [[onCLS(console.log, { reportAllChanges: true })]] على صفحة بتتنط، وطلّع من النتيجة العنصر اللي عمل أكبر shift ووقته.`, done: R`عرفت الـ selector من [[attribution.largestShiftTarget]] والوقت من [[attribution.largestShiftTime]]، وصلّحت العنصر ده بالذات، والرقم نزل تحت 0.1.`, sol: R`~~~js entry.js
import { onCLS } from "web-vitals/attribution";

onCLS((metric) => {
  console.log(metric.value, metric.attribution.largestShiftTarget, metric.attribution.largestShiftTime);
}, { reportAllChanges: true });
~~~

~~~html bad.html
<div id="ad"></div>
<main id="content">…</main>
<script>
  setTimeout(() => {
    document.getElementById("ad").innerHTML = '<div style="height: 200px">إعلان</div>';
  }, 500);
$__lt/script>
~~~

والتصليح:

~~~css fix.css
#ad { min-height: 200px; }
~~~

~~~view 240 240 الشكل في المتصفح (من ملفات الحل)
<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body>
<style>
#ad { min-height: 200px; }
</style>
<div id="ad"></div>
<main id="content">…</main>
<script>
  setTimeout(() => {
    document.getElementById("ad").innerHTML = '<div style="height: 200px">إعلان</div>';
  }, 500);
</script>
</body></html>
~~~

**ليه [[attribution]]:** الرقم لوحده بيقولك إن فيه مشكلة، و [[attribution]] بيقولك مين. [[largestShiftTarget]] selector لأكبر عنصر اتحرك.

**لاحظ:** العنصر المذكور [[#content]]، مش [[#ad]]. اللي اتحرك هو الضحية، والسبب هو اللي قبله. دوّر فوق العنصر.

**[[reportAllChanges]]:** من غيره الـ callback بيتأخر لحد ما الصفحة تتقفل أو تتخبى.

**الغلطة الشائعة:** تصلّح [[#content]] نفسه، فمش هيتغير حاجة.

~~~text الناتج
web-vitals 6.2.3:

قبل:  value 0.215 ، largestShiftTarget #content ، largestShiftTime 540.5
بعد:  value 0
~~~` },
          ],
          desc: R`CLS (Cumulative Layout Shift) مقياس من جوجل لكمية الحركة المفاجئة للمحتوى: صورة اتحمّلت ودفعت الكلام، أو إعلان ظهر فوق الزرار. المطلوب [[0.1]] أو أقل.

الأسباب المشهورة: صور وفيديو و iframes من غير مقاسات، وخطوط بتتبدّل بمقاسات مختلفة، ومحتوى بيتحط فوق محتوى موجود (بانر كوكيز، أو إشعار) بعد ما الصفحة ترسم.`,
          example: R`<img src="/hero.webp" width="1200" height="600" alt="...">
<iframe src="https://example.com/embed/video" class="video" title="فيديو الشرح"></iframe>
<div class="ad-slot"></div>
<div class="skeleton"></div>
<style>
  img, video { max-width: 100%; height: auto; }
  .video { width: 100%; aspect-ratio: 16 / 9; }
  .ad-slot { min-height: 250px; }
  .skeleton { height: 7.5rem; border-radius: 0.75rem; background: whitesmoke; }
  .toast { position: fixed; bottom: 1rem; }
</style>`,
          try: R`افتح موقعك وفي DevTools › Performance اعمل record مع reload، ودوّر على Layout shifts (أو شغّل Lighthouse). وبعدين امسح width و height من صورة الهيرو، واعمل Slow 4G، وشوف الرقم بيزيد.`,
          flag: "script",
          deep: {
            why: R`انت داخل تدوس «إلغاء» والصفحة اتنطت فدست «تأكيد الدفع». CLS مش مجرد إزعاج، ده بيخلي الناس تدوس حاجات غلط، وجوجل بيحسبه ضمن Core Web Vitals (مع LCP و INP) اللي بتأثر على الترتيب.`,
            how: R`المتصفح بيسجّل كل مرة عنصر ظاهر يتحرك من مكانه بين frame والتاني من غير ما المستخدم يكون السبب. الـ score لكل shift = (نسبة الشاشة اللي اتأثرت) × (المسافة اللي اتحركتها كنسبة من الشاشة). والـ shifts القريبة من بعض بتتجمع في مجموعة (session window)، و CLS = أكبر مجموعة في عمر الصفحة.

الحركة اللي بتحصل في خلال 500ms بعد ضغطة من المستخدم (فتح accordion مثلًا) مش بتتحسب لأنها متوقعة. وحركات [[transform]] مش بتتحسب لأنها مش بتغيّر الـ layout، عشان كده الـ animations بتاعة transform آمنة.

الحلول كلها فكرة واحدة: احجز المكان قبل ما المحتوى يوصل. للصور: width و height (أو [[aspect-ratio]]). للخطوط: [[size-adjust]] للخط الاحتياطي (next/font بيعمله) أو [[font-display: optional]]. للمحتوى الديناميكي: skeleton بنفس المقاس، أو اعرضه في مكان مش هيزق حاجة. وفي Next.js، [[next/image]] بيجبرك على المقاسات، و [[loading.tsx]] بيعرض skeleton.

القياس: في المعمل Lighthouse و Performance panel. وفي الحقيقة من المستخدمين (field data): Search Console و PageSpeed Insights، أو مكتبة [[web-vitals]] بتبعت الأرقام للـ analytics بتاعك.`,
            when: "قبل أي launch، وبعد ما تضيف صور أو خطوط أو widgets من برا (شات، وإعلانات، و embeds).",
            mistakes: R`تقيس على جهازك بنت سريع ومفيش shift، والمستخدم على 4G بيشوف الصفحة بتتنط. بانر كوكيز بيزق الصفحة لتحت بدل ما يبقى fixed. و [[<Image fill>]] جوه أب ملوش ارتفاع.`
          },
          teach: R`## كل سطر في المثال بيحجز مكان قبل ما المحتوى يوصل

CLS بيزيد لما حاجة ظاهرة تتنقل من مكانها لوحدها. والمثال كله فكرة واحدة: كل حاجة ممكن توصل متأخر (صورة، أو فيديو، أو إعلان، أو بيانات) ليها مكان محجوز من الأول. حطيناه في صفحة فيها عنوان، وصورة هيرو 1200×600 السيرفر بيأخّرها 800ms، و 20 فقرة تحتها، وبعدهم الـ iframe والإعلان والـ skeleton. شاشة 1000×800 في Chrome، وجمعنا الـ CLS بـ [[PerformanceObserver]] على نوع [[layout-shift]] (نفس الأرقام اللي Lighthouse بيجمعها).

---

## ١. الصورة

~~~text HTML
<img src="/hero.webp" width="1200" height="600" alt="...">
~~~

~~~text CSS
img, video { max-width: 100%; height: auto; }
~~~

- [[width="1200" height="600"]]: مقاس الصورة الأصلي. المتصفح بيحسب منهم النسبة (1200 ÷ 600 = 2:1) قبل ما الصورة توصل.
- [[max-width: 100%]]: متعديش عرض الأب. الشاشة كانت 1000 والـ body ليه margin، فالصورة بقت 968px.
- [[height: auto]]: الارتفاع يتحسب من العرض والنسبة: 968 ÷ 2 = 484. من غيرها الـ [[height="600"]] كان هيفضل 600 والصورة تتمط.
- [[alt]]: وصف الصورة لقارئ الشاشة (ملوش علاقة بالـ CLS).

### القياس

~~~text اتقاس في Chrome (الصورة متأخرة 800ms)
مع width و height:
  قبل ما الصورة توصل:  img 968×484   أول فقرة top=584
  بعد ما وصلت:         img 968×484   أول فقرة top=584   CLS = 0

من غيرهم:
  قبل ما الصورة توصل:  img 0×0       أول فقرة top=114
  بعد ما وصلت:         img 968×484   أول فقرة top=584   CLS = 0.2323
~~~

من غير المقاسات، الكلام كان بادئ عند 114 ونط 470px لتحت مرة واحدة، والـ CLS طلع أكتر من ضعف الحد (0.1). الرقم ده بيتحسب تقريبًا كده: (قد إيه من الشاشة اتأثر) × (المسافة اللي اتحركها كنسبة من ارتفاع الشاشة)، فبيكبر مع كمية الكلام اللي تحت الصورة وقد إيه نطت.

---

## ٢. الـ iframe

~~~text HTML + CSS
<iframe src="https://example.com/embed/video" class="video" title="فيديو الشرح"></iframe>
.video { width: 100%; aspect-ratio: 16 / 9; }
~~~

- [[iframe]] صفحة جوه صفحتك (زي فيديو YouTube). مقاسه الافتراضي 300×150 مهما كان جواه.
- [[title]]: اسم الـ iframe لقارئ الشاشة.
- [[aspect-ratio: 16 / 9]]: الارتفاع = العرض × 9 ÷ 16. قسناه: [[972 × 548.5]]. المحتوى نفسه 968 (زي الصورة) و 968 × 9 ÷ 16 = 544.5، والـ iframe عليه border افتراضي 2px من كل ناحية فبيزوّد 4 على العرض والارتفاع.

## ٣. الإعلان والـ skeleton

~~~text CSS
.ad-slot { min-height: 250px; }
.skeleton { height: 7.5rem; border-radius: 0.75rem; background: whitesmoke; }
~~~

- [[min-height: 250px]]: الـ div فاضي، بس ارتفاعه 250 (قسناه: [[ad h=250]]). لما الإعلان يوصل بنفس المقاس مفيش حاجة تتزق. و [[min]] عشان لو الإعلان طلع أطول يكبر.
- [[.skeleton]]: مربع رمادي ([[whitesmoke]]) بارتفاع 7.5rem = 120px (قسناه: [[skeleton h=120]])، تقريبًا قد المحتوى الحقيقي. و [[border-radius: 0.75rem]] = 12px تدوير.

## ٤. الإشعار

~~~text CSS
.toast { position: fixed; bottom: 1rem; }
~~~

[[position: fixed]]: العنصر بيطلع من مكانه في الصفحة ويتثبّت في الشاشة، فلما يظهر مش بيزق حاجة. و [[bottom: 1rem]] = 16px من تحت. أظهرناه بعد التحميل: الـ CLS زاد [[0.0000]].

## ٥. [[<style>]] نفسه

الـ CSS في المثال جوه [[<style>]] في نفس الصفحة، فمتطبّق من أول رسمة. لو المقاسات دي كانت في ملف CSS بيتحمّل متأخر، الصورة كانت هتترسم من غير [[height: auto]] الأول وتتغير بعدين.

---

## الملخص

| المحتوى المتأخر | الحجز | اتقاس |
|---|---|---|
| صورة | [[width]] و [[height]] + [[height: auto]] | 968×484 من أول لحظة، CLS ‏0 (من غيرهم 0.2323) |
| iframe | [[aspect-ratio: 16 / 9]] | 972×548.5 |
| إعلان | [[min-height: 250px]] | 250 |
| بيانات من API | skeleton بنفس الارتفاع | 120 |
| إشعار | [[position: fixed]] | CLS زاد 0 |

## الخلاصة

- CLS = الحاجات اللي بتتنقل لوحدها، والحد الكويس 0.1.
- الحل دايمًا: احجز المكان قبل ما المحتوى يوصل.
- اختبر بنت بطيء أو صورة متأخرة: على نت سريع والصورة في الكاش مش هتشوف النطة.`,
          lines: [
            "width و height بيحجزوا مكان بنسبة 2:1 قبل ما الصورة توصل.",
            "iframe فيديو: ملوش مقاسات من نفسه.",
            "مكان إعلان أو widget بيتحمّل متأخر.",
            "مكان محتوى جاي من API.",
            R`بلوك [[<style>]] صغير فيه القواعد اللي بتحجز المكان (في مشروع حقيقي في ملف الـ CSS).`,
            "الصورة تصغر مع الشاشة والارتفاع يتحسب من النسبة، فالمكان المحجوز صح.",
            R`[[aspect-ratio]] بيحجز ارتفاع الفيديو من عرضه.`,
            "احجز أقل ارتفاع للإعلان حتى لو لسه فاضي.",
            "skeleton بنفس ارتفاع المحتوى الحقيقي تقريبًا، فلما البيانات توصل مفيش نطة.",
            R`الإشعارات [[fixed]]: بتظهر فوق الصفحة من غير ما تزق حاجة.`,
            R`قفلة الـ style؛ القواعد دي لازم تبقى في الـ CSS اللي بيتحمّل قبل الرسم مش بعده.`
          ],
          sol: R`في Performance بعد record مع reload: هتلاقي track اسمه Layout shifts (أو مربعات بنفسجي) عند اللحظة اللي الصورة وصلت فيها، ولما تدوس عليه يوريك العناصر اللي اتحركت. وفي Lighthouse الرقم تحت Cumulative Layout Shift؛ الكويس أقل من 0.1.

قست ده على صفحة فيها عنوان وصورة هيرو 1200×600 وكلام كتير تحتها، والصورة بتتأخر 800ms: مع [[width]] و [[height]] الـ CLS كان [[0]]، لأن المتصفح حجز مكان بنسبة 2:1 من الأول. من غيرهم الـ CLS طلع حوالي [[0.43]] (أكتر من 4 أضعاف الحد)، لأن الكلام كله نط لتحت مرة واحدة لما الصورة وصلت.

لو الرقم مزدش بعد ما مسحت المقاسات: غالبًا الصورة في الكاش فبتيجي فورًا، اعمل Disable cache. أو فيه [[aspect-ratio]] في الـ CSS بيحجز المكان بدل الـ attributes. وخلي بالك إن Lighthouse بيقيس التحميل بس؛ الـ shifts اللي بتحصل بعد ما المستخدم يعمل scroll بتبان في Web Vitals الحقيقية (CrUX) مش في Lighthouse.`
        },
        {
          cmd: "critical CSS",
          ref: [
            { t: "web.dev: Extract critical CSS", url: "https://web.dev/articles/extract-critical-css" },
            { t: "MDN: rel=preload", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/preload" },
            { t: "MDN: rel=preconnect", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/preconnect" },
            { t: "MDN: svh", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length" },
          ],
          title: "ليه الصفحة بيضا ثانيتين قبل ما تظهر؟",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** أنهي واحد من دول بيوقّف أول رسم: [[<link rel="stylesheet" media="print">]]، و [[<link rel="stylesheet" media="(min-width: 2000px)">]] على شاشة 1280، و [[<script src>]] في الـ head من غير defer، و [[<script defer>]]، و [[<script type="module">]]، و [[@import]] جوه ملف CSS؟`, done: R`بيوقّف: السكربت العادي (بيوقف قراية الـ HTML)، و [[@import]] (سلسلة طلبات قبل الرسم). مش بيوقّف: print، والـ media اللي مش متطابقة (بتتحمّل بأولوية قليلة)، و defer، و module. واتأكدت من عمود Priority في Network و Lighthouse «Render-blocking resources».`, sol: R`**الإجابة:**

| العنصر | بيوقّف الرسم؟ | FCP مع ملف متأخر 1.5 ثانية |
|---|---|---|
| مفيش حاجة | | 28ms |
| [[media="print"]] | لأ | 44ms |
| [[media="(min-width: 2000px)"]] | لأ | 36ms |
| [[<script src>]] | أيوه | 1544ms |
| [[<script defer>]] | لأ | 32ms |
| [[<script type="module">]] | لأ | 32ms |
| [[@import]] جوه CSS | أيوه، ومرتين | 3060ms |

~~~html test.html
<!doctype html>
<html lang="ar">
<head>
<meta charset="utf-8">
<title>مين بيوقّف؟</title>
<!-- حط سطر واحد في المرة، وأخّر الملف من السيرفر 1.5 ثانية -->
<link rel="stylesheet" href="/main.css">
</head>
<body><main><h1>النص</h1></main></body>
</html>
~~~

~~~js console
performance.getEntriesByName("first-contentful-paint")[0].startTime
~~~

**القاعدة:** المتصفح مبيرسمش قبل ما CSS اللي بينطبق دلوقتي يوصل، عشان ميرسمش مرتين. الـ [[media]] اللي مش متطابق مش بينطبق، فبيتحمّل بأولوية قليلة من غير ما يوقّف. والسكربت العادي بيوقف قراية الـ HTML لأنه ممكن يعدّله.

[[@import]] أسوأ: الملف الأول لازم يوصل، وبعدين يبدأ التاني.

**الغلطة الشائعة:** تفتكر إن [[@import]] زي [[<link>]]. الاتنين شكلهم واحد في الناتج، بس الوقت ضعف.

~~~text الناتج
baseline 28 ، print 44 ، nomatch 36 ، script 1544 ، defer 32 ، module 32 ، @import 3060
~~~` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** نفس الصفحة مرتين على Slow 4G: مرة بملف CSS واحد 200KB في الـ head، ومرة بـ CSS أول شاشة inline (أقل من 14KB) والباقي بيتحمّل من غير ما يوقّف ([[media="print"]] و [[onload="this.media='all'"]]).`, done: R`FCP قبل وبعد من Lighthouse أو Performance، والتانية أسرع، ومفيش «وميض» لما الـ CSS الكامل يوصل (الأول شاشة شكلها واحد في الحالتين).`, sol: R`النسخة التانية:

~~~html two.html
<head>
<style>
  /* CSS أول شاشة بس، أقل من 14KB */
  body { margin: 0; font-family: system-ui; }
  .hero { padding: 2rem; background: #0f172a; color: #fff; }
  .hero h1 { font-size: 2rem; }
</style>
<link rel="stylesheet" href="/full.css" media="print" onload="this.media='all'">
</head>
~~~

**الحيلة:** [[media="print"]] بيخلي الملف مش بيوقّف الرسم. أول ما يتحمّل، [[onload]] بيغيّره لـ [[all]] فينطبق.

**ليه 14KB:** أول رحلة TCP بتشيل حوالي 14KB، فلو الـ HTML مع CSS الحرج جوه الحد ده، أول رسم ميستناش رحلة تانية.

**ليه مفيش وميض:** CSS أول شاشة نفس القواعد اللي في الملف الكامل، فلما يوصل مفيش حاجة بتتغيّر.

**جهّز fallback:** لو JavaScript مقفول، [[onload]] مش هيشتغل، فضيف [[<noscript><link rel="stylesheet" href="/full.css"></noscript>]].

**الغلطة الشائعة:** تعمل inline لـ CSS ناقص، فالصفحة تبان مبهدلة لحظة وبعدين تتعدل.

~~~text الناتج
CSS كامل 201KB ، و CSS حرج 109 byte. Lighthouse مرتين (devtools throttling):

                  FCP
ملف واحد          2.4 s ، 2.5 s
inline + print    0.7 s ، 0.7 s

لقطة قبل وبعد وصول الـ CSS الكامل: متطابقين byte بـ byte
link.media بعد التحميل: all
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** صورة الهيرو عليها [[loading="lazy"]] «عشان الأداء». قيس LCP، وبعدين شيل الـ lazy وزوّد [[fetchpriority="high"]] (أو preload بـ [[imagesrcset]] لو الصورة background).`, done: R`LCP قبل وبعد من Lighthouse، وفي Network الصورة بقت أولويتها High وبتبدأ بدري في الـ waterfall، وباقي الصور اللي تحت لسه lazy.`, sol: R`~~~live 120 120 hero.html
<!-- الهيرو -->
<img src="/hero.jpg" width="1600" height="1000" alt="رفوف قهوة" fetchpriority="high">

<!-- تحت الشاشة -->
<img src="/below.jpg" width="1600" height="1000" alt="المحمصة" loading="lazy">
~~~

ولو الصورة [[background]] في CSS:

~~~html head.html
<link rel="preload" as="image" href="/hero.jpg" imagesrcset="/hero-800.jpg 800w, /hero.jpg 1600w" imagesizes="100vw" fetchpriority="high">
~~~

**ليه:** [[loading="lazy"]] معناها «استنى لحد ما تعرف مكانها». صورة الهيرو هي عنصر LCP غالبًا، فالتأخير بيتحسب عليك مباشرة.

**[[imagesrcset]]** لأن المتصفح مش بيشوف الـ background بدري، فلازم تقوله.

**ليه الأرقام قريبة في الصفحة البسيطة:** صفحة فيها صورة واحدة مفيهاش حاجة تنافسها، فالأولوية مش بتفرق. الفرق بيبان مع CSS وسكربتات كتير، زي القياس في درس [[picture]]: 7.7 ثانية ضد 7.3.

**الغلطة الشائعة:** تحط [[fetchpriority="high"]] على كل الصور. لو كله مهم، مفيش حاجة مهمة.

~~~text الناتج
                       Network Priority    below.jpg    LCP (صفحة فيها صورة بس)
loading="lazy"         Low                 مطلبش        10.7 s
fetchpriority="high"   High                مطلبش        10.7 s

في صفحة فيها CSS وست سكربتات:
lazy 7.7 s ، fetchpriority 7.3 s
~~~` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** عملت [[<link rel="preload" href="/f.woff2" as="font" type="font/woff2" crossorigin>]] بس مفيش CSS بيستخدم الخط ده. الكونسول هيقول إيه بعد التحميل؟`, done: R`Chrome 156 طلّع تحذير: «The resource http://…/f.woff2 was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate [[as]] value and it is preloaded intentionally.» يعني preload غلط بيضيّع bandwidth من حاجات تانية.`, sol: R`~~~live 120 120 preload.html
<!doctype html>
<html lang="ar">
<head>
<meta charset="utf-8">
<title>preload</title>
<link rel="preload" href="/f.woff2" as="font" type="font/woff2" crossorigin>
</head>
<body><main><h1>مفيش CSS بيستخدم الخط</h1></main></body>
</html>
~~~

**الإجابة:** تحذير في الكونسول بعد ثواني من [[load]].

**ليه:** [[preload]] بيقول للمتصفح «هحتاج ده أكيد». المتصفح نزّله بأولوية عالية، وزاحم بيه حاجات تانية، ومحدش استخدمه. فهو بيحذّرك.

**نفس التحذير بيطلع لو:** الملف اللي في CSS مختلف عن اللي في preload، أو ناسي [[crossorigin]] على خط، فالمتصفح بينزّله مرتين.

**الغلطة الشائعة:** تفتح الكونسول على طول وتقول مفيش تحذير. لازم تستنى كام ثانية بعد [[load]].

~~~text الناتج
The resource http://localhost/f.woff2 was preloaded using link preload but not
used within a few seconds from the window's load event. Please make sure it has
an appropriate $__btas$__bt value and it is preloaded intentionally.
~~~` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** افتح DevTools › Coverage (من Command Menu) وسجّل وانت بتفتح الرئيسية بتاعتك. كام في المية من الـ CSS مش مستخدم؟ وأنهي ملف أسوأ؟`, done: R`رقم لكل ملف (Unused Bytes)، وعرفت إن الرقم ده لصفحة واحدة بس (الصفحات التانية ممكن تستخدم الباقي)، وطلعت بخطة: إيه يتقسم أو يتمسح.`, sol: R`~~~text الخطوات
1. DevTools ← Ctrl+Shift+P ← اكتب Coverage ← Show Coverage
2. دوس زرار التسجيل بتاع reload
3. بص على عمود Unused Bytes لكل ملف CSS
4. دوس على الملف: الأحمر مش مستخدم والأزرق مستخدم
~~~

وبرمجيًا:

~~~js coverage.mjs
await page.coverage.startCSSCoverage();
await page.goto(url);
const entries = await page.coverage.stopCSSCoverage();
for (const entry of entries) {
  const used = entry.ranges.reduce((sum, r) => sum + r.end - r.start, 0);
  console.log(entry.url, entry.text.length, used);
}
~~~

**ازاي تقرا الرقم:** Coverage بيقيس الصفحة دي بس، في اللحظة دي. القواعد بتاعة [[:hover]] أو صفحة تانية هتطلع «مش مستخدمة» وهي مستخدمة. فالرقم بيقولك فين تبص، مش إيه تمسح.

**الخطة:** لفّ على الصفحات المهمة مع التسجيل، وبعدين قسّم CSS حسب الصفحة أو احذف اللي مش مستخدم في أي مكان.

**الغلطة الشائعة:** تمسح كل الأحمر من أول صفحة، فالموقع ينكسر في الصفحات التانية.

~~~text الناتج
ملف تجريبي فيه قاعدة واحدة مستخدمة من 100:

cov.css:  1,997 byte ، مستخدم 16 ، مش مستخدم 1,981 (99.2٪)

رقم موقعك هيختلف، واكتبه لكل ملف.
~~~` },
          ],
          desc: R`المتصفح مش بيرسم أي حاجة لحد ما كل ملفات الـ CSS اللي في الـ head تتحمّل (render-blocking). فكل ملف CSS كبير أو بطيء أو جاي من سيرفر تاني بيأخّر أول ظهور للصفحة.

الحل: CSS صغير (Tailwind بيطلّع المستخدم بس)، والـ CSS الضروري لأول شاشة (critical CSS) يبقى أول حاجة أو inline، والباقي يتأجّل. و [[preload]] و [[preconnect]] للحاجات اللي هتحتاجها بدري.`,
          example: R`<head>
  <link rel="preconnect" href="https://cdn.example.com" crossorigin>
  <link rel="preload" href="/fonts/cairo-var.woff2" as="font" type="font/woff2" crossorigin>
  <style>header{height:4rem}.hero{min-height:60svh}</style>
  <link rel="stylesheet" href="/app.css">
  <link rel="stylesheet" href="/print.css" media="print">
  <script src="/app.js" defer></script>
</head>`,
          try: R`افتح DevTools › Network واعمل reload وبص على الـ Waterfall: شوف أول رسم حصل امتى بالنسبة لملفات الـ CSS. وبعدين في Lighthouse دوّر على تحذير الـ render-blocking requests.`,
          flag: "script",
          deep: {
            why: "لو المتصفح رسم الصفحة قبل الـ CSS، هتظهر HTML خام وبعدين تتقلب فجأة (FOUC). عشان كده بيستنى. بس ده معناه إن كل ميلي ثانية في تحميل الـ CSS هي ميلي ثانية الشاشة فيها بيضا، ودا بيأثر مباشرة على FCP و LCP.",
            how: R`المتصفح بيقرا الـ HTML، ولما يلاقي [[<link rel="stylesheet">]] بيبدأ تحميله ويكمّل قراية، بس مش بيرسم لحد ما الـ CSS كله يتحمّل ويتحلل. لو ملف CSS فيه [[@import]] لملف تاني، المتصفح مش هيعرف عنه غير بعد ما الأول يوصل، فبيبقى تحميل ورا تحميل. ودا ليه [[@import url()]] لخطوط خارجية جوه ملف CSS أبطأ من [[<link>]] في الـ head، وأبطأ بكتير من next/font.

[[media]] على الـ link بيخلّي الملفات اللي مش مطابقة (print مثلًا) تتحمّل بأولوية قليلة ومن غير ما توقف الرسم.

الـ critical CSS: تطلّع القواعد اللي أول شاشة محتاجاها وتحطها inline، والباقي يتحمّل بعدين. في مشروع Tailwind الـ CSS كله غالبًا عشرات الـ KB بعد الضغط، فالمكسب صغير ومش مستاهل التعقيد. و Next.js بيقسّم الـ CSS حسب الـ route، فكل صفحة بتحمّل الـ CSS بتاعها.

[[preconnect]] بيوفّر وقت الـ DNS والـ TCP والـ TLS مع سيرفر تاني (ممكن مئات الـ ms على الموبايل). و [[preload]] بيقول «هتحتاج الملف ده أكيد، ابدأ دلوقتي» بأولوية عالية، فاستخدمه لحاجة أو اتنين بس، وإلا كل حاجة بقت أولوية ومفيش حاجة أولوية.`,
            when: "صفحات الـ landing والصفحات اللي جاية من جوجل، واللي LCP بتاعها وحش. وأي موقع بيحمّل CSS أو خطوط من CDN خارجي.",
            mistakes: R`مكتبة CSS كاملة عشان كلاسين. [[@import]] جوه [[@import]]. preload لكل الخطوط والصور فالأولويات تبوظ. و CSS كل الصفحات في ملف واحد ضخم في مشروع PHP، فالصفحة الرئيسية بتحمّل تنسيق الداشبورد.`
          },
          teach: R`## الـ head بالترتيب اللي بيخلّي أول رسمة تيجي بدري

المثال [[<head>]] فيه 6 سطور، كل واحد بيقول للمتصفح حاجة عن الأولوية: افتح اتصال بدري، حمّل الخط بدري، ده CSS جاهز، ده CSS لازم تستناه، ده CSS متستناهوش، وده JavaScript متوقفش عشانه. حطيناه في صفحة على سيرفر محلي، وخلّينا السيرفر يأخّر [[app.css]] ثانية و [[print.css]] ثانيتين عشان نشوف مين بيوقف الرسم، وقرينا من Chrome أولوية كل request (من DevTools Protocol) ووقت أول رسمة (FCP = First Contentful Paint) من [[performance]].

---

## ١. [[<link rel="preconnect" href="https://cdn.example.com" crossorigin>]]

- [[rel]] = relation، نوع العلاقة بين الصفحة واللينك.
- [[preconnect]]: «هتحتاج السيرفر ده قريب، افتح الاتصال من دلوقتي». فتح اتصال جديد = DNS (يعرف الـ IP) + TCP (يفتح الخط) + TLS (التشفير بتاع https)، وده ممكن ياخد مئات الـ ms على موبايل.
- [[crossorigin]]: الاتصالات اللي بتجيب خطوط بتتعمل في وضع CORS، والمتصفح بيفصلها عن العادية. فلو هتجيب خطوط من السيرفر ده، الـ preconnect لازم يبقى بنفس الوضع، وإلا الاتصال اللي اتفتح مش هيتستخدم.

ده مش request، فمش هتلاقيه في قايمة الـ requests تحت.

## ٢. [[<link rel="preload" href="/fonts/cairo-var.woff2" as="font" type="font/woff2" crossorigin>]]

- [[preload]]: «حمّل الملف ده دلوقتي بأولوية عالية، هتحتاجه أكيد».
- [[as="font"]]: نوعه، عشان المتصفح يدّيه الأولوية الصح ويعيد استخدامه لما الـ CSS يطلبه.
- [[type="font/woff2"]]: لو المتصفح مبيدعمش النوع ده، ميحمّلوش.
- [[crossorigin]]: الخطوط دايمًا بتتطلب بـ CORS، حتى من نفس الموقع. من غيره الملف بيتحمّل مرتين.

من غير preload، المتصفح مش هيعرف إن فيه خط غير لما يقرا [[app.css]] ويلاقي [[@font-face]]، يعني بعد ما الـ CSS يوصل.

## ٣. [[<style>header{height:4rem}.hero{min-height:60svh}</style>]]

CSS جوه الصفحة نفسها (inline): مفيش request، فمتطبّق من أول رسمة. و [[60svh]] = 60% من ارتفاع الشاشة الصغير (s = small: لما شريط المتصفح في الموبايل ظاهر). قسناه: الهيدر [[64px]]، والهيرو [[432px]] (60% من شاشة ارتفاعها 720).

## ٤. [[<link rel="stylesheet" href="/app.css">]]

CSS عادي، و **render-blocking**: المتصفح مش هيرسم أي حاجة لحد ما يوصل.

## ٥. [[<link rel="stylesheet" href="/print.css" media="print">]]

[[media="print"]]: القواعد دي للطباعة بس. المتصفح لسه بيحمّله (لو المستخدم طبع)، بس بأولوية واطية ومن غير ما يوقف الرسم.

## ٦. [[<script src="/app.js" defer></script>]]

[[defer]]: حمّل الملف وانت بتكمّل قراية الـ HTML، ونفّذه بعد ما الـ HTML يخلص، بالترتيب. من غيره، الـ script في الـ head كان هيوقف قراية الصفحة لحد ما يتحمّل ويتنفذ.

---

## القياس

الأولوية اللي Chrome اداها لكل request (DevTools بيكتبها Highest و High و Low و Lowest، والـ protocol بيكتبها VeryHigh و High و Low و VeryLow):

~~~text اتقاس في Chrome
/crit.html            VeryHigh  Document
/fonts/cairo-var.woff2 High     Font        ← بدأ عند 76ms مع app.css
/app.css              VeryHigh  Stylesheet
/app.js               Low       Script
/print.css            VeryLow   Stylesheet
~~~

والأوقات (بالـ ms من أول الصفحة):

~~~text اتقاس في Chrome
app.css خلص:     1090
FCP:             1096    ← أول رسمة بعد app.css على طول
print.css خلص:   2098    ← بعد الرسم بثانية، ومأخّرهوش
app.js اتنفذ:    1092
~~~

- الصفحة فضلت بيضا لحد ما [[app.css]] وصل، حتى مع إن الـ HTML والـ [[<style>]] جاهزين من الأول. ده معنى render-blocking: كل ms في تحميل الـ CSS ده = ms شاشة بيضا.
- [[print.css]] خلص عند 2098 والرسم حصل عند 1096، يعني [[media="print"]] شالته من الطريق.
- الخط بدأ يتحمّل عند 76ms، نفس لحظة [[app.css]]، بدل ما يستنى لحد 1090.
- [[app.js]] برضه اتنفذ عند 1092 بعد [[app.css]]: المتصفح مش بينفّذ scripts قبل ما الـ CSS اللي قبلها يوصل (ممكن تكون بتقرا styles). يعني CSS بطيء بيأخّر الـ JavaScript كمان.

## الملخص

| السطر | بيوقف الرسم؟ | الأولوية | ليه |
|---|---|---|---|
| [[preconnect]] | لأ | (مش request) | يوفّر وقت فتح الاتصال |
| [[preload]] خط | لأ | High | الخط يبدأ مع الـ CSS مش بعده |
| [[<style>]] inline | لأ (جاهز) | مفيش request | أول شاشة متنسقة من أول رسمة |
| [[app.css]] | **أيوه** | VeryHigh | خليه صغير |
| [[print.css]] بـ [[media="print"]] | لأ | VeryLow | مش للشاشة |
| [[app.js]] بـ [[defer]] | لأ | Low | يتنفذ بعد الـ HTML |

## الخلاصة

- كل [[<link rel="stylesheet">]] عادي في الـ head = الشاشة بيضا لحد ما يوصل.
- [[media]] بيشيل الـ CSS اللي مش للشاشة من الطريق، و [[defer]] بيشيل الـ JS.
- [[preload]] و [[preconnect]] لحاجة أو اتنين مهمين بس.`,
          lines: [
            R`الـ [[<head>]]: كل اللي فيه بيتقري قبل ما المتصفح يرسم أي حاجة، فترتيبه بيفرق.`,
            "افتح الاتصال بسيرفر تاني بدري (DNS و TLS) قبل ما تحتاجه.",
            R`حمّل الخط الأساسي من الأول بدل ما المتصفح يكتشفه بعد ما يقرا الـ CSS. [[crossorigin]] لازم مع الخطوط حتى لو من نفس الموقع.`,
            "CSS أول شاشة inline: مفيش request.",
            "باقي الـ CSS: بيوقف الرسم، فخليه صغير.",
            R`CSS الطباعة: [[media="print"]] بيخليه يتحمّل من غير ما يوقف الرسم.`,
            R`الـ JS بـ [[defer]]: ميوقفش القراية ولا الرسم.`,
            R`قفلة الـ head؛ بعدها الـ body، وأول رسم بيحصل لما الـ CSS اللي فوق يخلص.`
          ],
          sol: R`في الـ Waterfall: ملف [[app.css]] بيتحمّل بأولوية Highest، وخط أول رسم (FCP، الخط الأخضر أو الأزرق في الـ Timeline) بيبقى بعد ما يخلص. يعني طول ما الملف ده بيتحمّل الصفحة بيضا. بطّأ النت لـ Slow 4G وهتشوف الفرق بوضوح: الصفحة البيضا بتطول قد مدة تحميل الـ CSS. أما [[print.css]] فبيتحمّل بأولوية Lowest ومش بيأخّر الرسم، لأن الـ [[media="print"]] مش متحققة على الشاشة.

الـ [[<style>]] اللي في الـ head متطبّق من غير request، فالهيدر والهيرو بياخدوا مقاسهم من أول رسمة. والـ font بتاع الـ preload بيظهر في أول الـ waterfall جنب الـ HTML بدل ما يستنى الـ CSS يتقري.

في Lighthouse هتلاقي «Render-blocking requests» (أو «Eliminate render-blocking resources» في النسخ الأقدم) وفيها [[app.css]] والوقت اللي ممكن توفّره. ولو لقيت ملف JavaScript فيها كمان، يبقى فيه [[<script>]] في الـ head من غير [[defer]] ولا [[async]].`
        },
        {
          cmd: "layout thrashing",
          ref: [
            { t: "web.dev: Avoid large, complex layouts and layout thrashing", url: "https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing" },
            { t: "MDN: requestAnimationFrame()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame" },
            { t: "What forces layout / reflow (Paul Irish)", url: "https://gist.github.com/paulirish/5d52fb081b3570c81e3a" },
            { t: "MDN: addEventListener() passive", url: "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener" },
          ],
          title: "JavaScript بيخلي المتصفح يعيد حساب الصفحة مية مرة",
          practice: [
            { lvl: 'سريع', t: R`**قارن وقيس:** اعمل ١٠٠٠ [[.card]] وجرّب الطريقتين اللي في المثال، وحوّط كل واحدة بـ [[performance.now()]].`, done: R`رقمين: في Chrome 156 قسناهم 274.8ms للقراية والكتابة بالتبادل و 7.6ms للقراية كلها ثم الكتابة. وجهازك أرقامه مختلفة بس الفرق بنفس الحجم تقريبًا.`, sol: R`~~~js console
const cards = [...document.querySelectorAll(".card")];

let t = performance.now();
for (const el of cards) {
  el.style.height = el.offsetWidth * 0.75 + "px";
}
console.log("بالتبادل", performance.now() - t);

// اعمل reload قبل التجربة التانية
t = performance.now();
const widths = cards.map((el) => el.offsetWidth);
cards.forEach((el, i) => (el.style.height = widths[i] * 0.75 + "px"));
console.log("قراية ثم كتابة", performance.now() - t);
~~~

**ليه الفرق ضخم:** [[offsetWidth]] لازم يرجّع رقم صحيح. لو فيه كتابة قبله، المتصفح بيحسب الـ layout كله دلوقتي. في الـ loop الأولى: كتابة ثم قراية ١٠٠٠ مرة، يعني ١٠٠٠ layout. في التانية: layout واحد.

**الحل الأحسن:** [[.card { aspect-ratio: 4 / 3; }]] من غير JavaScript.

**الغلطة الشائعة:** تقيس التانية من غير reload، فالـ layout متخزن والرقم يطلع أصغر من الحقيقة.

~~~text الناتج
1000 كارت في Chrome 156 ، 3 مرات:

بالتبادل:         285.3 ، 265 ، 247.2 ms
قراية ثم كتابة:   1 ، 0.7 ، 0.6 ms
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** هيدر بيصغر مع الـ scroll: الـ handler بيقرا [[scrollY]] و [[header.offsetHeight]] ويكتب [[style.height]] و [[style.padding]] في كل event. سجّل Performance وانت بتعمل scroll، وصلّحه: اقرا مرة، واكتب في [[requestAnimationFrame]]، وغيّر [[transform: scale]] بدل الارتفاع.`, done: R`الـ trace قبل فيه علامات بنفسجي «Forced reflow»، وبعد مفيش، والـ frames أقصر. وعارف إن فيه حل من غير JavaScript خالص بـ [[animation-timeline: scroll()]] في وحدة CSS الحديث.`, sol: R`قبل:

~~~live 600 720 before.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>هيدر تقيل</title>
<style>body { margin: 0; font-family: system-ui, sans-serif; } header { position: sticky; top: 0; height: 96px; padding: 24px; box-sizing: border-box; background: #0f172a; color: #fff; } main { height: 4000px; }</style></head>
<body>
<header id="h">المتجر</header>
<main><h1>المحتوى</h1></main>
<script>
  const header = document.getElementById("h");
  addEventListener("scroll", () => {
    const small = scrollY > 80;
    if (header.offsetHeight > 0) header.style.height = small ? "64px" : "96px";
    if (header.offsetHeight > 0) header.style.padding = small ? "8px" : "24px";
  });
$__lt/script>
</body>
</html>
~~~

بعد:

~~~live 600 720 after.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>هيدر خفيف</title>
<style>
  body { margin: 0; font-family: system-ui, sans-serif; }
  header { position: sticky; top: 0; height: 96px; padding: 24px; box-sizing: border-box; background: #0f172a; color: #fff;
           transform-origin: top; transition: transform .2s; }
  header.small { transform: scaleY(.67); }
  main { height: 4000px; }
</style>
</head>
<body>
<header id="h">المتجر</header>
<main><h1>المحتوى</h1></main>
<script>
  const header = document.getElementById("h");
  let queued = false;
  addEventListener("scroll", () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      header.classList.toggle("small", scrollY > 80);
    });
  }, { passive: true });
$__lt/script>
</body>
</html>
~~~

**التغييرات:**

- [[requestAnimationFrame]] مع [[queued]]: مهما جت أحداث scroll في الـ frame، بيتنفّذ مرة واحدة.
- [[{ passive: true }]]: المتصفح ميستناش handler عشان يعمل scroll.
- [[classList.toggle]] بدل [[style.height]]: الحركة كلها في CSS.
- [[transform: scaleY(.67)]] بدل [[height]]: من غير layout.

**ملحوظة:** [[scale]] بيضغط الكلام كمان. لو الشكل ده مش مقبول، خلي الخلفية في [[::before]] هي اللي تتضغط.

**بدون JavaScript:** [[animation-timeline: scroll()]] في وحدة CSS الحديث.

**الغلطة الشائعة:** تحط كل الشغل في [[requestAnimationFrame]] وتسيب القراية والكتابة بالتبادل جواه. الترتيب هو المهم.

~~~text الناتج
trace وانت بتعمل scroll 30 خطوة:

          أحداث Layout     وقت Layout
قبل       348              14.2ms
بعد       0                0ms
~~~` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** دوّر على gist «What forces layout / reflow» (Paul Irish)، وطلّع ٨ حاجات بتجبر layout غير [[offsetWidth]].`, done: R`لستة ٨ فيها مثلًا [[getComputedStyle()]] و [[scrollIntoView()]] و [[innerText]] و [[focus()]] و [[scrollTop]] و [[clientHeight]] و [[getClientRects()]] و [[window.innerHeight]]، وجنب كل واحدة إمتى بتستخدمها.`, sol: R`**إجابة نموذجية من gist «What forces layout / reflow» لـ Paul Irish:**

| الحاجة | بتستخدمها إمتى |
|---|---|
| [[getComputedStyle()]] | قراية قيمة CSS محسوبة |
| [[el.scrollIntoView()]] | تنقّل لعنصر |
| [[el.innerText]] | قراية النص الظاهر |
| [[el.focus()]] | نقل الـ focus |
| [[el.scrollTop]] | مكان الـ scroll |
| [[el.clientHeight]] | ارتفاع العنصر |
| [[el.getClientRects()]] | مستطيلات عنصر inline |
| [[window.innerHeight]] | ارتفاع الشاشة |

**ليه ده مش معناه متستخدمهمش:** القراية نفسها مش مشكلة. المشكلة قراية بعد كتابة في نفس الـ frame.

**[[textContent]] أرخص من [[innerText]]:** مش بيحتاج layout.

**الغلطة الشائعة:** تعتبر [[getBoundingClientRect]] ممنوع. استخدمه، بس في أول الـ frame قبل أي كتابة.

~~~text الناتج
لستة ٨ بنود.
(إجابة من الوثائق، مش ناتج تشغيل.)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** عدّاد أرقام بيعد من 0 لـ 12,500 في ثانية ونص لما يظهر (IntersectionObserver ثم [[requestAnimationFrame]])، بـ [[font-variant-numeric: tabular-nums]] و [[min-inline-size]] بعدد الحروف، و [[Intl.NumberFormat("ar-EG")]] للأرقام. ومع reduce يطلع الرقم النهائي على طول.`, done: R`العرض ثابت وهو بيعد (الكلام اللي جنبه مبيتهزش و layout-shift صفر)، ومفيش forced reflow في كل frame (مبتقراش مقاسات جوه الـ loop)، والرقم النهائي بيتقري لقارئ الشاشة مرة واحدة مش كل رقم.`, sol: R`~~~live 380 380 counter.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>عدّاد</title>
<style>
  body { margin: 0; padding: 1rem; font-family: system-ui, sans-serif; }
  .gap { block-size: 120vh; }
  .stat { display: flex; align-items: baseline; gap: .5rem; font-size: 2.5rem; }
  .num { display: inline-block; min-inline-size: 7ch; font-variant-numeric: tabular-nums; text-align: end; }
  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
</style>
</head>
<body>
<main>
  <h1>أرقامنا</h1>
  <div class="gap"></div>
  <p class="stat"><span class="num" id="n" aria-hidden="true">٠</span> <span id="after">عميل</span><span class="sr-only">١٢٬٥٠٠ عميل</span></p>
</main>
<script>
  const el = document.getElementById("n");
  const target = 12500;
  const duration = 1500;
  const format = new Intl.NumberFormat("ar-EG");

  function run() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = format.format(target);
      return;
    }
    const start = performance.now();
    requestAnimationFrame(function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = format.format(Math.round(target * progress));
      if (progress < 1) requestAnimationFrame(tick);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    observer.disconnect();
    run();
  });
  observer.observe(el);
$__lt/script>
</body>
</html>
~~~

**ليه العرض ثابت:**

- [[font-variant-numeric: tabular-nums]]: كل الأرقام نفس العرض، فـ 1 مبياخدش أقل من 8.
- [[min-inline-size: 7ch]]: مكان آخر رقم محجوز من الأول، و [[text-align: end]] بيخلي النهاية ثابتة.

**ليه مفيش forced reflow:** الـ [[tick]] بيكتب [[textContent]] بس، ومفيش قراية مقاسات. و [[performance.now()]] مش بيعمل layout. و [[Intl.NumberFormat("ar-EG")]] بيدّي الأرقام العربي والفاصل.

**قارئ الشاشة:** العدّاد [[aria-hidden="true"]]، والرقم النهائي في [[sr-only]] مرة واحدة، بدل ما يقرا كل رقم.

**[[observer.disconnect()]]:** العد يحصل مرة واحدة.

**الغلطة الشائعة:** تعمل [[setInterval]] كل 16ms. مش متزامن مع الشاشة، والوقت بيبوظ مع أي تأخير. الحساب من الوقت الفعلي بيخلص في 1.5 ثانية حتى لو frames اتفوّتت.

~~~text الناتج
كل 250ms بعد ما ظهر:
٢٬١٩٨ ، ٤٬٣٩٣ ، ٦٬٦١٤ ، ٨٬٨٠٨ ، ١١٬٠٠٣ ، ١٢٬٥٠٠

right بتاع الكلمة اللي جنبه: 425.06 في كل القراءات
layout shift: صفر
reduce: ١٢٬٥٠٠ على طول
axe صفر
~~~` },
          ],
          desc: R`لما تقرا مقاس من الـ DOM ([[offsetWidth]] أو [[getBoundingClientRect()]] أو [[scrollTop]]) بعد ما غيّرت style، المتصفح لازم يعيد حساب الـ layout فورًا عشان يديك رقم صح (forced reflow). ولو عملت ده جوه loop (اكتب، اقرا، اكتب، اقرا)، بيحسب الصفحة في كل لفة.

الحل: اقرا كل اللي محتاجه الأول، وبعدين اكتب كله. وأي حاجة بتتكرر مع الـ scroll أو الحركة حطها في [[requestAnimationFrame]].`,
          example: R`const cards = [...document.querySelectorAll(".card")];
// وحش: قراية وكتابة بالتبادل
for (const el of cards) {
  el.style.height = el.offsetWidth * 0.75 + "px";
}
// كويس: اقرا الكل، وبعدين اكتب الكل
const widths = cards.map((el) => el.offsetWidth);
cards.forEach((el, i) => (el.style.height = widths[i] * 0.75 + "px"));
// أحسن: CSS يعملها من غير JavaScript: .card { aspect-ratio: 4 / 3; }
window.addEventListener("scroll", () => requestAnimationFrame(updateHeader), { passive: true });`,
          try: R`اعمل صفحة فيها 500 div وشغّل النسخة الوحشة، وسجّل في DevTools › Performance: هتلاقي بلوكات Layout كتير وتحذير Forced reflow. شغّل النسخة الكويسة وقارن.`,
          flag: "script",
          deep: {
            why: "الـ JavaScript والـ layout شغالين على نفس الـ thread. كل reflow على صفحة كبيرة ممكن ياخد ملي ثواني، ولو اتكرر مية مرة في frame واحد، الصفحة بتقف والـ scroll بيقطّع، و INP (سرعة الاستجابة للضغط) بيبوظ.",
            how: R`المتصفح كسول بذكاء: لما تغيّر style، مش بيحسب على طول. بيعلّم إن الـ layout «قديم» ويستنى آخر الـ frame يحسب كل التغييرات مرة واحدة. بس لو طلبت رقم بيعتمد على الـ layout (offsetWidth و offsetTop و clientHeight و scrollHeight و getBoundingClientRect و getComputedStyle و scrollTop)، لازم يحسب حالًا، ودا الـ forced synchronous layout. لو كتبت بعده وقريت تاني يحسب تاني، ودا الـ thrashing.

الفرق بين reflow و repaint: الـ reflow (layout) = حساب أماكن ومقاسات العناصر، وممكن يأثر على الصفحة كلها. والـ repaint = رسم البكسلات من جديد من غير ما الأماكن تتغير (لون، وخلفية، وظل). والـ composite = تركيب الطبقات بس (transform و opacity). من الأغلى للأرخص.

[[requestAnimationFrame(fn)]] بينفّذ fn قبل الرسم الجاي مباشرة، فالكتابات بتتجمع في frame واحد. ولو الحدث بيتكرر كتير (scroll أو mousemove)، استخدم flag عشان متطلبش أكتر من rAF في الـ frame. و [[ResizeObserver]] و [[IntersectionObserver]] بيدّوك المقاسات والظهور من غير ما تقرا في loop.

وفي React: القراية بتبقى في [[useLayoutEffect]] (قبل الرسم) أو ref callback، مش في كل render.`,
            when: "أي كود بيقيس عناصر: masonry، أو sticky بـ JavaScript، أو animations يدوي، أو قوايم طويلة virtualized، وأي حاجة على scroll أو resize.",
            mistakes: R`تحسب مقاسات في scroll handler من غير rAF. تحرّك بـ [[top]] و [[left]] من JavaScript بدل transform. و [[getComputedStyle]] جوه loop. وفي مشروع حقيقي كان فيه handler على الـ scroll بيعمل [[setScrolled(window.scrollY > 8)]] مع [[passive: true]]: كويس، لأنه بيقرا رقم واحد رخيص ومش بيكتب في الـ DOM مباشرة، و React مش بيعيد الـ render غير لما القيمة تتغير فعلًا.`
          },
          teach: R`## نفس الشغل، مرة بـ 500 layout ومرة بـ layout واحد

المثال بيدّي كل كارت ارتفاع = عرضه × 0.75 (نسبة 4:3)، بطريقتين: واحدة بتخلط القراية والكتابة جوه الـ loop، وواحدة بتقرا الكل الأول وبعدين تكتب الكل. شغّلنا الـ solCode حرفيًا في Chrome (500 كارت، شاشة 1280 عرض) 3 مرات، وعدّينا عدد مرات الـ layout بـ [[LayoutCount]] من Chrome DevTools Protocol.

---

## ١. هات الكروت

~~~text JavaScript
const cards = [...document.querySelectorAll(".card")];
~~~

- [[document.querySelectorAll(".card")]]: كل العناصر اللي عليها كلاس [[card]]، بس بترجع NodeList مش array.
- [[[...]]]: الـ [[...]] (spread) بيفرد العناصر جوه array جديدة، عشان نقدر نستخدم [[map]] و [[forEach]] عليها براحتنا.

## ٢. الطريقة الوحشة

~~~text JavaScript
for (const el of cards) {
  el.style.height = el.offsetWidth * 0.75 + "px";
}
~~~

- [[for (const el of cards)]]: لف على الكروت واحد واحد، و [[el]] الكارت الحالي.
- [[el.offsetWidth]]: عرض العنصر بالبكسل كرقم صحيح (بالـ border والـ padding). ده **قراية** من الـ layout.
- [[* 0.75 + "px"]]: اضرب في 0.75، وزوّد [[px]] في الآخر فيبقى نص زي [[285.75px]].
- [[el.style.height = ...]]: ده **كتابة**: غيّرت style، فالـ layout بقى قديم.

المشكلة في الترتيب: لفة 1 كتبت height، لفة 2 بتقرا [[offsetWidth]]، فالمتصفح لازم يعيد حساب الـ layout الأول عشان يدّيك رقم صح (ده الـ forced reflow). وبعدين تكتب، واللفة اللي بعدها تقرا تاني... 500 مرة.

## ٣. الطريقة الكويسة

~~~text JavaScript
const widths = cards.map((el) => el.offsetWidth);
cards.forEach((el, i) => (el.style.height = widths[i] * 0.75 + "px"));
~~~

- [[cards.map((el) => el.offsetWidth)]]: [[map]] بيعمل array جديدة من نتيجة الدالة على كل عنصر، يعني array بالعروض. كله قراية، فأول قراية بتحسب الـ layout مرة، والباقي بيقرا من نفس الحساب.
- [[cards.forEach((el, i) => ...)]]: لف على الكروت، و [[i]] رقم الكارت (index) عشان نجيب عرضه من [[widths[i]]].
- الأقواس حوالين [[(el.style.height = ...)]]: الـ arrow function بترجع نتيجة الـ assignment، والأقواس بتوضح إن ده مقصود.
- كله كتابة، والمتصفح يحسب الـ layout مرة واحدة بعدها.

## ٤. القياس (الـ solCode)

في الـ solCode فيه سطرين زيادة للقياس: [[performance.now()]] بيرجّع الوقت بالـ ms بدقة كسور، فالفرق بين قبل وبعد = مدة الكود. و [[document.body.offsetHeight]] قراية فاضية بتجبر المتصفح يخلّص أي layout مستني، عشان الوقت يتحسب كامل.

~~~text الناتج في Chrome (3 مرات)
bad 123.7   good 2.5
bad 123.7   good 2.5
bad 227.6   good 6.2
~~~

~~~text اتقاس بـ LayoutCount
الوحشة:   500 layout
الكويسة:  1 layout
~~~

والنتيجة واحدة في الاتنين: كل كارت عرضه [[381]] (30% من عرض الـ body + الـ border) وارتفاعه [[285.75px]]. الوحشة أبطأ حوالي 37 مرة، و 124ms يعني أكتر من 7 frames (الـ frame في شاشة 60Hz حوالي 16.7ms) الصفحة واقفة فيهم.

## ٥. الـ CSS بدل كل ده

~~~text CSS
.card { aspect-ratio: 4 / 3; }
~~~

الارتفاع = العرض × 3 ÷ 4 = نفس الـ 0.75، والمتصفح بيحسبه في نفس الـ layout من غير أي JavaScript.

## ٦. الـ scroll

~~~text JavaScript
window.addEventListener("scroll", () => requestAnimationFrame(updateHeader), { passive: true });
~~~

- [[addEventListener("scroll", fn)]]: شغّل fn كل ما الصفحة تعمل scroll (ممكن عشرات المرات في الثانية).
- [[requestAnimationFrame(updateHeader)]]: متنفّذش دلوقتي، نفّذ قبل الرسمة الجاية. فالقراية والكتابة اللي في [[updateHeader]] بتتعمل مرة في الـ frame مع باقي التغييرات.
- [[{ passive: true }]]: وعد إن الـ handler مش هيعمل [[preventDefault()]]. على الـ scroll مش فارق، فايدته مع [[wheel]] و [[touchmove]].

## الخلاصة

| الحركة | بتكلّف |
|---|---|
| كتابة style | ولا حاجة لحد آخر الـ frame |
| قراية مقاس بعد كتابة | layout كامل فورًا |
| اكتب، اقرا، اكتب، اقرا | layout في كل لفة (500 هنا) |
| اقرا الكل، اكتب الكل | layout واحد |
| [[aspect-ratio]] | صفر JavaScript |`,
          lines: [
            "كل الكروت كـ array.",
            R`[[for...of]] على الكروت واحد واحد، وكل لفة فيها قراية وكتابة.`,
            R`بتقرا [[offsetWidth]] بعد ما كتبت height للكارت اللي قبله، فالمتصفح يعيد الـ layout كل لفة. 500 كارت = 500 reflow.`,
            "قفلة.",
            "القراية كلها مرة واحدة: layout واحد.",
            "الكتابة كلها بعدها: المتصفح يحسب مرة واحدة في الـ frame الجاي.",
            R`مع الـ scroll: حدّث في الـ frame الجاي بس. و [[passive]] هنا مش فارق لأن الـ scroll event مبيتلغيش أصلًا، فايدته الحقيقية مع [[wheel]] و [[touchmove]].`
          ],
          sol: R`النسخة الوحشة في Performance: بلوك Scripting طويل جواه عشرات أو مئات من البلوكات البنفسجي الصغيرة [[Layout]] ورا بعض، وعلى كتير منهم مثلث أحمر وتحذير «Forced reflow is a likely performance bottleneck». النسخة الكويسة: Layout واحد بس (أو اتنين) في الآخر.

قست الفرق على 500 div: الوحشة أخدت حوالي 125ms (يعني أكتر من 7 frames متعطلة، والصفحة بتهنّج)، والكويسة حوالي 4ms. أكتر من 30 مرة أسرع بنفس النتيجة بالظبط، والفرق بيزيد مع عدد العناصر. والأحسن من الاتنين [[aspect-ratio: 4 / 3]] في الـ CSS: صفر JavaScript.

لو مشفتش فرق، غالبًا العناصر بعرض ثابت ومش بيتأثروا ببعض، أو الجهاز سريع جدًا: زوّد العدد أو فعّل CPU throttling ‏(4x slowdown) في Performance.`,
          solCode: R`<style>.card { width: 30%; display: inline-block; border: 1px solid; }</style>
<body>
<script>
  document.body.insertAdjacentHTML("beforeend", '<div class="card">x</div>'.repeat(500));
  const cards = [...document.querySelectorAll(".card")];
  let t = performance.now();
  for (const el of cards) el.style.height = el.offsetWidth * 0.75 + "px";
  console.log("bad", performance.now() - t); // ~125ms
  cards.forEach((el) => (el.style.height = ""));
  document.body.offsetHeight;
  t = performance.now();
  const widths = cards.map((el) => el.offsetWidth);
  cards.forEach((el, i) => (el.style.height = widths[i] * 0.75 + "px"));
  document.body.offsetHeight;
  console.log("good", performance.now() - t); // ~4ms
</script>`
        }
      ]
    }
]);
