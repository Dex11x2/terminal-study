// بيرسم كل درس وكل وحدة في متصفح حقيقي على عرض موبايل (400px) وبيدوّر على مشاكل العرض:
// [[ أو ]] أو ** أو $__ أو ~~~ ظاهرين، و undefined، وحاجة أعرض من الشاشة.
//   في CI: npm i --no-save playwright && npx playwright install chromium && node tools/render-check.js
//   محليًا من غير تسطيب: شغّل الموقع، وفي console الصفحة الصق ناتج: node tools/render-check.js --print
const path = require('path'), fs = require('fs'), http = require('http');

// runs inside the page: uses the site's own render functions on every lesson and unit
function checkInPage(width) {
  const box = document.createElement('div');
  box.style.cssText = `position:absolute;left:0;top:0;width:${width}px;visibility:hidden`;
  document.body.appendChild(box);
  const problems = [], saved = shell;
  // ** alone is real text (Python's power, masked *** in logs); a pair around words is bold that didn't render
  const RAW = [[/\[\[|\]\]/, '[[ أو ]] ظاهرين'], [/\$__/, '$__ ظاهر'], [/(^|[^*])\*\*[^*\s][^*]{0,80}[^*\s]\*\*(?!\*)/, '**عريض** ماتعرضش'], [/~~~/, '~~~ ظاهرة'], [/\\\|/, '\\| ظاهرة']];
  // code, the lesson's name and title, and exercise code are shown as written, so look at prose only
  // text nodes joined with a space, so two table cells like «[ ]» and «]» don't read as «]]»
  const prose = el => {
    const c = el.cloneNode(true); c.querySelectorAll('code,pre,.term,.name,.title,.chk-code').forEach(x => x.remove());
    const w = document.createTreeWalker(c, NodeFilter.SHOW_TEXT), parts = [];
    while (w.nextNode()) parts.push(w.currentNode.textContent);
    return parts.join(' ');
  };
  // a missing field shows up as an element whose whole text is undefined (outside code), or as an attribute value
  const UNDEF_ATTR = /="undefined"/;
  const undefEl = el => [...el.querySelectorAll('*')].some(e => !e.closest('code,pre,.term,td,th') &&[...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim() === 'undefined'));
  // too wide = sticks out of the box and no ancestor inside the box scrolls it (a scrolling table or terminal is fine)
  const scrolls = e => { const o = getComputedStyle(e).overflowX; return o === 'auto' || o === 'scroll' || o === 'hidden'; };
  const wide = el => {
    const edge = el.getBoundingClientRect();
    return [...el.querySelectorAll('*')].filter(e => {
      const r = e.getBoundingClientRect();
      if (r.left >= edge.left - 2 && r.right <= edge.right + 2) return false;
      for (let p = e.parentElement; p && p !== el; p = p.parentElement) if (scrolls(p)) return false;
      return !scrolls(e) || r.width > width + 2 && !scrolls(e);
    }).slice(0, 2).map(e => e.tagName.toLowerCase() + (e.className ? '.' + String(e.className).split(' ')[0] : '') + ' «' + (e.textContent || '').trim().slice(0, 30) + '»');
  };
  let n = 0;
  for (const tab of Object.keys(DATA)) {
    shell = tab;
    DATA[tab].forEach((cat, ci) => {
      const head = (typeof unitHead === 'function' ? unitHead(cat) : '') + (typeof unitFoot === 'function' ? unitFoot(cat, tab + '-c' + ci) : '');
      if (head) {
        box.innerHTML = head;
        const t = prose(box);
        for (const [re, what] of RAW) if (re.test(t)) problems.push([tab, '(وحدة) ' + cat.t, what]);
        const w = wide(box); if (w.length) problems.push([tab, '(وحدة) ' + cat.t, 'أعرض من ' + width + 'px: ' + w.join(' ')]);
      }
      for (const it of cat.items) {
        n++;
        const html = articleHTML(it);
        box.innerHTML = html;
        if (UNDEF_ATTR.test(html) || undefEl(box)) problems.push([tab, it[0], 'undefined مكان حقل']);
        const t = prose(box);
        for (const [re, what] of RAW) if (re.test(t)) problems.push([tab, it[0], what]);
        const w = wide(box); if (w.length) problems.push([tab, it[0], 'أعرض من ' + width + 'px: ' + w.join(' ')]);
      }
    });
  }
  shell = saved; box.remove();
  return { lessons: n, problems };
}

if (process.argv.includes('--print')) {
  console.log('(' + checkInPage.toString() + ')(400)');
  process.exit(0);
}

// CI runner: a tiny static server + headless Chromium
(async () => {
  const { chromium } = require('playwright');
  const root = path.join(__dirname, '..');
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webmanifest': 'application/manifest+json' };
  const srv = http.createServer((req, res) => {
    const p = path.join(root, decodeURIComponent(req.url.split('?')[0]).replace(/^\/$/, '/index.html'));
    if (!p.startsWith(root) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'content-type': types[path.extname(p)] || 'application/octet-stream' });
    fs.createReadStream(p).pipe(res);
  }).listen(0);
  const port = srv.address().port;
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 400, height: 800 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(`http://localhost:${port}/index.html`, { waitUntil: 'load' });
  const r = await page.evaluate(checkInPage, 400);
  await browser.close(); srv.close();
  for (const [tab, c, what] of r.problems) console.log('✗', tab, '›', c, '—', what);
  for (const e of errors) console.log('✗ JS error:', e);
  console.log(`\n${r.lessons} درس اتفحصوا، ${r.problems.length} مشكلة، ${errors.length} JS error`);
  process.exit(r.problems.length || errors.length ? 1 : 0);
})();
