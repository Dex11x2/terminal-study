// جدول «نفس المهمة في التلاتة»: [المهمة، bash، PowerShell، CMD]
const CMP = [
  ["مكانك الحالي", "pwd", "Get-Location", "cd"],
  ["عرض الملفات بالمخفي", "ls -la", "Get-ChildItem -Force", "dir /a"],
  ["فولدر جوه فولدر", "mkdir -p a/b", R`New-Item -ItemType Directory a\b -Force`, R`mkdir a\b`],
  ["ملف فاضي", "touch f.txt", "New-Item f.txt", "type nul > f.txt"],
  ["نسخ فولدر", "cp -r a b", "Copy-Item a b -Recurse", "xcopy a b /E /I"],
  ["تغيير اسم", "mv old new", "Rename-Item old new", "ren old new"],
  ["مسح فولدر", "rm -rf dir", "Remove-Item dir -Recurse -Force", "rd /s /q dir"],
  ["قراءة ملف", "cat f", "Get-Content f", "type f"],
  ["متابعة لوج لايف", "tail -f app.log", "Get-Content app.log -Tail 10 -Wait", "لا يوجد"],
  ["بحث في النص", R`grep -rn "x" .`, R`Get-ChildItem -Recurse | Select-String "x"`, R`findstr /s /n "x" *`],
  ["مكان برنامج", "which node", "Get-Command node", "where node"],
  ["العمليات", "ps aux", "Get-Process", "tasklist"],
  ["قتل عملية", "kill -9 1234", "Stop-Process -Id 1234 -Force", "taskkill /PID 1234 /F"],
  [
    "مين على بورت 3000",
    "lsof -i :3000",
    "Get-NetTCPConnection -LocalPort 3000 -State Listen",
    "netstat -ano | findstr :3000"
  ],
  ["متغير مؤقت", "export X=1", R`$env:X = "1"`, "set X=1"],
  ["طباعة متغير", "echo $X", "$env:X", "echo %X%"],
  ["مسح الشاشة", "clear", "cls", "cls"],
  ["ضغط فولدر", "tar -czf a.tar.gz dir", "Compress-Archive dir a.zip", "tar -czf a.tar.gz dir"],
  ["طلب HTTP", "curl URL", "Invoke-RestMethod URL", "curl URL"],
  ["IP بتاعك", "ip -br a", "Get-NetIPConfiguration", "ipconfig"],
  ["سؤال DNS", "dig +short example.com", "Resolve-DnsName example.com", "nslookup example.com"],
  [
    "بورت مفتوح على سيرفر؟",
    "nc -zv host 443",
    "Test-NetConnection host -Port 443",
    "لا يوجد، استخدم PowerShell"
  ],
  ["الطريق للسيرفر", "traceroute host", "Test-NetConnection host -TraceRoute", "tracert host"],
  ["ملف hosts", "/etc/hosts", R`C:\Windows\System32\drivers\etc\hosts`, "نفس مسار PowerShell"],
  ["الشرح", "man ls", "Get-Help ls -Examples", "dir /?"],
  ["افتح الفولدر في مدير الملفات", "xdg-open .", "Invoke-Item .", "start ."],
  ["ناتج أمر على الكليب بورد", "pwd | xclip -selection clipboard", "Get-Location | Set-Clipboard", "cd | clip"],
  ["متغير بيئة دايم", R`echo 'export API_URL=x' >> ~/.bashrc`, R`[Environment]::SetEnvironmentVariable("API_URL","x","User")`, "setx API_URL x"],
  ["عدد سطور ملف", "wc -l app.log", "(Get-Content app.log).Count", R`find /c /v "" app.log`],
  ["آخر 20 سطر", "tail -n 20 app.log", "Get-Content app.log -Tail 20", "لا يوجد، استخدم PowerShell"],
  ["حجم فولدر", "du -sh logs", R`(Get-ChildItem logs -Recurse -File | Measure-Object Length -Sum).Sum / 1MB`, "dir /s logs"],
  ["بصمة ملف (hash)", "sha256sum app.zip", "Get-FileHash app.zip", "certutil -hashfile app.zip SHA256"],
  ["تنزيل ملف", "curl -LO https://example.com/f.zip", "Invoke-WebRequest https://example.com/f.zip -OutFile f.zip", "curl -LO https://example.com/f.zip"],
  ["الأوامر اللي كتبتها", "history", "Get-History", "doskey /history"]
];

// التحديات: t العنوان، d الوصف، s الحل لكل شيل
const MISSIONS = fixDollar([
  {
    t: "هيكل مشروع في سطر واحد",
    d: "جوه lab اعمل فولدر myapp فيه src و public و logs، وملف src/index.js، وملف .env فيه PORT=3000، وبعدين اعرض الهيكل.",
    s: {
      bash: R`mkdir -p myapp/{src,public,logs} && cd myapp && touch src/index.js && echo "PORT=3000" > .env && tree -a`,
      ps: R`New-Item -ItemType Directory myapp\src, myapp\public, myapp\logs -Force; Set-Location myapp; New-Item src\index.js; Set-Content .env "PORT=3000" -Encoding utf8; Get-ChildItem -Recurse -Force`,
      cmd: R`mkdir myapp\src myapp\public myapp\logs && cd myapp && type nul > src\index.js && (echo PORT=3000)> .env && tree /f`,
      zsh: R`mkdir -p myapp/{src,public,logs} && cd myapp && touch src/index.js && echo "PORT=3000" > .env && ls -la **/*`
    }
  },
  {
    t: "البورت مشغول (EADDRINUSE)",
    d: "شغّل سيرفر على بورت 3000 بـ python -m http.server 3000 (أو python3 على لينكس) في نافذة. من نافذة تانية اعرف مين ماسك البورت واقفله.",
    s: {
      bash: R`lsof -i :3000
kill $(lsof -t -iTCP:3000 -sTCP:LISTEN)`,
      ps: R`Get-NetTCPConnection -LocalPort 3000 -State Listen
Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000 -State Listen).OwningProcess -Force`,
      cmd: R`netstat -ano | findstr :3000
REM خد الرقم من آخر عمود
taskkill /PID 1234 /F`,
      zsh: R`lsof -i :3000
kill $(lsof -t -iTCP:3000 -sTCP:LISTEN)`
    }
  },
  {
    t: "حلّل لوج",
    d: "اعمل ملف app.log فيه 4 سطور منهم سطرين فيهم ERROR. اعرف عدد الأخطاء، واحفظ سطورها بأرقامها في errors.txt.",
    s: {
      bash: R`printf "INFO start\nERROR db down\nINFO ok\nERROR timeout\n" > app.log
grep -c ERROR app.log
grep -n ERROR app.log > errors.txt && cat errors.txt`,
      ps: R`"INFO start","ERROR db down","INFO ok","ERROR timeout" | Set-Content app.log
(Select-String ERROR app.log).Count
Select-String ERROR app.log | Out-File errors.txt -Encoding utf8`,
      cmd: R`(echo INFO start& echo ERROR db down& echo INFO ok& echo ERROR timeout) > app.log
find /c "ERROR" app.log
findstr /n "ERROR" app.log > errors.txt`,
      zsh: R`printf "INFO start\nERROR db down\nINFO ok\nERROR timeout\n" > app.log
grep -c ERROR app.log
grep -n ERROR app.log > errors.txt && cat errors.txt`
    }
  },
  {
    t: "أكبر 5 ملفات",
    d: "في أي مشروع عندك اعرف أكبر 5 ملفات من غير node_modules. هنا هتحس بقوة PowerShell قدام CMD.",
    s: {
      bash: R`find . -type f -not -path "*/node_modules/*" -exec du -h {} + | sort -rh | head -5`,
      ps: "Get-ChildItem -Recurse -File | Where-Object FullName -notmatch 'node_modules' | Sort-Object Length -Descending | Select-Object -First 5 Name, @{n='MB'; e={[math]::Round($_.Length / 1MB, 2)}}",
      cmd: R`REM CMD ملوش طريقة نضيفة للمهمة دي
REM dir /o-s بيرتب جوه كل فولدر لوحده بس
REM استخدم PowerShell هنا`,
      zsh: R`find . -type f -not -path "*/node_modules/*" -exec ls -l {} + | sort -k5 -rn | head -5`
    }
  },
  {
    t: "باك أب بتاريخ النهارده",
    d: "اضغط فولدر myapp في ملف اسمه فيه تاريخ النهارده.",
    s: {
      bash: "tar -czf backup-$(date +%F).tar.gz myapp && ls -lh backup-*",
      ps: R`Compress-Archive myapp "backup-$(Get-Date -Format yyyy-MM-dd).zip"; Get-ChildItem backup-*`,
      cmd: R`for /f %d in ('powershell -NoProfile -Command "Get-Date -Format yyyy-MM-dd"') do tar -czf backup-%d.tar.gz myapp
REM جوه ملف .bat اكتب %%d بدل %d
dir backup*`,
      zsh: "tar -czf backup-$(date +%F).tar.gz myapp && open ."
    }
  },
  {
    t: "فحص السيرفر (bash بس)",
    d: "ادخل الـ VPS بتاعك، اتأكد إن Nginx شغال والكونفج سليم، شوف آخر أخطاء، والمساحة والرام، وأكتر 10 IPs بيزوروا الموقع.",
    s: {
      bash: R`ssh deploy@203.0.113.10
sudo systemctl status nginx
sudo nginx -t
sudo tail -n 30 /var/log/nginx/error.log
df -h && free -h
sudo awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -rn | head -10`
    }
  },
  {
    t: "الموقع مش بيفتح: شخّص طبقة طبقة",
    d: "امشي بالترتيب ده بدل ما تخمّن: DNS، بعدين السيرفر بيرد، بعدين البورت مفتوح، بعدين Nginx، بعدين التطبيق. أول خطوة تفشل هي مكان المشكلة. جرّبه على موقعك وهو شغال عشان تعرف شكل النتيجة السليمة.",
    s: {
      bash: R`# 1. DNS: does the domain point to the server?
dig +short example.com
# 2. Is the server reachable?
ping -c 3 203.0.113.10
# 3. Is port 443 open from outside?
nc -zv 203.0.113.10 443
# 4. What does the browser actually get?
curl -vI https://example.com
# 5. On the server: Nginx up? app listening?
ssh deploy@203.0.113.10
sudo systemctl status nginx
sudo ss -tlnp | grep -E ':(80|443|3000)'
sudo tail -n 30 /var/log/nginx/error.log`,
      ps: R`Resolve-DnsName example.com
Test-Connection 203.0.113.10 -Count 3
Test-NetConnection 203.0.113.10 -Port 443
curl.exe -vI https://example.com
ssh deploy@203.0.113.10`,
      cmd: R`nslookup example.com
ping -n 3 203.0.113.10
curl -vI https://example.com
ssh deploy@203.0.113.10`
    }
  },
  {
    t: "افتح قاعدة بيانات السيرفر من جهازك بأمان",
    d: "قاعدة البيانات على السيرفر سامعة على 127.0.0.1 بس، ومفيش أي بورت مفتوح لها. وصّلها بجهازك من غير ما تفتح حاجة للنت.",
    s: {
      bash: R`ssh -N -L 5433:127.0.0.1:5432 deploy@203.0.113.10
# in a second terminal:
psql -h localhost -p 5433 -U postgres`,
      ps: R`ssh -N -L 5433:127.0.0.1:5432 deploy@203.0.113.10
# then connect DBeaver or pgAdmin to localhost:5433`,
      zsh: R`ssh -f -N -L 5433:127.0.0.1:5432 deploy@203.0.113.10
psql -h localhost -p 5433 -U postgres`
    }
  },
  {
    t: "API بترجع خطأ: اعرف السبب",
    d: "من Network انسخ الطلب اللي فشل (Copy as cURL أو Copy as PowerShell)، وشغّله من الترمنال، واقرا الـ status والـ headers والبودي. الأمثلة تحت طلب login بسيط تقدر تعدّل فيه. مثال PowerShell محتاج PowerShell 7 ([[pwsh]])، لأن -SkipHttpErrorCheck مش موجود في 5.1.",
    s: {
      bash: R`curl -i -X POST https://example.com/api/login -H "Content-Type: application/json" -d '{"email":"a@b.com","password":"wrong"}'`,
      ps: R`$r = Invoke-WebRequest https://example.com/api/login -Method Post -ContentType "application/json" -Body '{"email":"a@b.com","password":"wrong"}' -SkipHttpErrorCheck
$r.StatusCode
$r.Headers["Content-Type"]
$r.Content`,
      cmd: R`curl -i -X POST https://example.com/api/login -H "Content-Type: application/json" -d "{\"email\":\"a@b.com\",\"password\":\"wrong\"}"`
    }
  },
  {
    t: "اقفل SSH من غير ما تقفل على نفسك (bash بس)",
    d: "على سيرفر التجربة: اتأكد إن deploy بيدخل بالمفتاح وعنده sudo، اكتب إعدادات الأمان في ملف drop-in عشان ميتغطّاش عليها، طبّقها، وجرّب من نافذة جديدة إن الدخول بالباسورد بقى مرفوض. سيب النافذة الأولى مفتوحة لحد الآخر.",
    s: {
      bash: R`ssh deploy@203.0.113.10 'sudo -v && echo sudo-ok'
ssh deploy@203.0.113.10
printf "PermitRootLogin no\nPasswordAuthentication no\n" | sudo tee /etc/ssh/sshd_config.d/00-hardening.conf
sudo sshd -t && sudo systemctl restart ssh
sudo sshd -T | grep -Ei "permitrootlogin|passwordauthentication"
# from a NEW local terminal (keep the old one open), both must be refused:
ssh -o PubkeyAuthentication=no deploy@203.0.113.10
ssh root@203.0.113.10`
    }
  },
  {
    t: "الديسك اتملى: فضّي مكان بأمان (bash بس)",
    d: "السيرفر بيقول No space left on device. اعرف المساحة، ولاقي مين واكلها، ونضّف Docker واللوجات وكاش apt، من غير ما تلمس بيانات قواعد البيانات (مفيش --volumes في أي prune).",
    s: {
      bash: R`df -h / && df -i /
sudo du -xh / --max-depth=1 2>/dev/null | sort -rh | head
docker system df
docker image prune -a -f
docker builder prune -f
sudo journalctl --vacuum-size=200M
sudo apt clean
df -h /`
    }
  },
  {
    t: "رجّع commit مسحته بالغلط",
    d: "اعمل repo تجربة فيه commitين، امسح التاني بـ reset --hard، وبعدين رجّعه من reflog في branch اسمها rescue. لاحظ علامات التنصيص حوالين HEAD@{1}: من غيرها PowerShell بيبوّظ الأمر.",
    s: {
      bash: R`git init rescue-lab && cd rescue-lab
echo one > a.txt && git add a.txt && git commit -m "one"
echo two >> a.txt && git commit -am "two"
git reset --hard HEAD~1
git reflog
git branch rescue "HEAD@{1}"
git log --oneline rescue`,
      ps: R`git init rescue-lab; Set-Location rescue-lab
"one" | Set-Content a.txt; git add a.txt; git commit -m "one"
"two" | Add-Content a.txt; git commit -am "two"
git reset --hard HEAD~1
git reflog
git branch rescue "HEAD@{1}"
git log --oneline rescue`,
      cmd: R`git init rescue-lab && cd rescue-lab
echo one> a.txt && git add a.txt && git commit -m "one"
echo two>> a.txt && git commit -am "two"
git reset --hard HEAD~1
git reflog
git branch rescue "HEAD@{1}"
git log --oneline rescue`,
      zsh: R`git init rescue-lab && cd rescue-lab
echo one > a.txt && git add a.txt && git commit -m "one"
echo two >> a.txt && git commit -am "two"
git reset --hard "HEAD~1"
git reflog
git branch rescue "HEAD@{1}"
git log --oneline rescue`
    }
  },
  {
    t: "جهّز VS Code لمشروع الفريق",
    d: "في مشروع عندك: اعمل .vscode/settings.json يخلّي Prettier ينسّق مع كل حفظ و ESLint يصلّح لوحده، و extensions.json يقترح الإضافتين على أي حد يفتح المشروع، وافتح المشروع من الترمنال. الشرح في تاب VS Code المستوى ٣.",
    s: {
      bash: R`mkdir -p .vscode
cat > .vscode/settings.json <<'EOF'
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" },
  "files.eol": "\n"
}
EOF
printf '{ "recommendations": ["esbenp.prettier-vscode", "dbaeumer.vscode-eslint"] }\n' > .vscode/extensions.json
code .`,
      ps: R`New-Item -ItemType Directory .vscode -Force | Out-Null
@'
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" },
  "files.eol": "\n"
}
'@ | Set-Content .vscode/settings.json -Encoding utf8
'{ "recommendations": ["esbenp.prettier-vscode", "dbaeumer.vscode-eslint"] }' | Set-Content .vscode/extensions.json -Encoding utf8
code .`
    }
  },
  {
    t: "Postgres في Docker: شغّال ومقفول على جهازك",
    d: "شغّل Postgres في container بباسورد، على بورت متاح لجهازك بس (127.0.0.1)، واستنى لحد ما يبقى جاهز فعلًا، وبعدين اتأكد إن البورت مش مفتوح لباقي الشبكة. الشرح في تاب Docker (healthchecks) و PostgreSQL.",
    s: {
      bash: R`docker run -d --name pg -e POSTGRES_PASSWORD=secret -p 127.0.0.1:5432:5432 postgres:17
until docker exec pg pg_isready -U postgres; do sleep 1; done
docker exec -it pg psql -U postgres -c "SELECT version();"
ss -tlnp | grep 5432`,
      ps: R`docker run -d --name pg -e POSTGRES_PASSWORD=secret -p 127.0.0.1:5432:5432 postgres:17
do { Start-Sleep 1; docker exec pg pg_isready -U postgres } until ($LASTEXITCODE -eq 0)
docker exec -it pg psql -U postgres -c "SELECT version();"
Get-NetTCPConnection -LocalPort 5432 -State Listen | Select-Object LocalAddress, LocalPort`
    }
  },
  {
    t: "باك أب MongoDB وجرّب ترجّعه (bash بس)",
    d: "الباك أب اللي عمره ما اترجع مش باك أب. خد dump من container اسمه mongo، ورجّعه في container تجربة تاني، واتأكد إن عدد الـ documents واحد، وامسح التجربة. الشرح في تاب MongoDB المستوى ٣.",
    s: {
      bash: R`set -euo pipefail
docker exec mongo mongodump -u admin -p secret --authenticationDatabase admin --archive --gzip > app-$(date +%F).archive.gz
docker run -d --name mongo-test mongo:8
until docker exec mongo-test mongosh --quiet --eval "db.adminCommand('ping')" >/dev/null 2>&1; do sleep 1; done
docker exec -i mongo-test mongorestore --archive --gzip < app-$(date +%F).archive.gz
docker exec mongo-test mongosh --quiet app --eval "db.users.countDocuments()"
docker exec mongo mongosh --quiet -u admin -p secret --authenticationDatabase admin app --eval "db.users.countDocuments()"
docker rm -fv mongo-test`
    }
  },
  {
    t: "بعد الـ deploy: اتأكد إن الموقع سليم",
    d: "اكتب smoke test بيطلب أهم ٣ صفحات ويتأكد إنها بترجع 200، وإن صفحة مش موجودة بترجع 404 فعلًا (مش 200 بصفحة الـ SPA). لو أي حاجة غلط يطلع بكود فشل عشان CI يوقف. حل PowerShell محتاج PowerShell 7 (pwsh). الشرح في تاب التشخيص (smoke test).",
    s: {
      bash: R`fail=0
for p in / /api/health /login; do
  code=$(curl -s -o /dev/null -w '%{http_code}' "https://example.com$p")
  echo "$code $p"; [ "$code" = 200 ] || fail=1
done
[ "$(curl -s -o /dev/null -w '%{http_code}' https://example.com/no-such-page)" = 404 ] || { echo "404 page broken"; fail=1; }
exit $fail`,
      ps: R`$fail = 0
foreach ($p in '/', '/api/health', '/login') {
  $code = (Invoke-WebRequest "https://example.com$p" -SkipHttpErrorCheck -UseBasicParsing).StatusCode
  "$code $p"; if ($code -ne 200) { $fail = 1 }
}
if ((Invoke-WebRequest https://example.com/no-such-page -SkipHttpErrorCheck -UseBasicParsing).StatusCode -ne 404) { "404 page broken"; $fail = 1 }
exit $fail`
    }
  },
  {
    t: "ضيف فولدر للـ PATH واتأكد إنه اشتغل",
    d: "عندك أداة في فولدر tools ومش عايز تكتب مسارها كل مرة. ضيف الفولدر للـ PATH بشكل دايم، وافتح ترمنال جديد، واتأكد إن الشيل بيلاقي الأداة. على ويندوز فيه كمان الطريقة من الواجهة (تاب اختصارات النظام).",
    s: {
      bash: R`echo 'export PATH="$HOME/tools:$PATH"' >> ~/.bashrc
source ~/.bashrc
echo "$PATH" | tr ':' '\n' | head -3
command -v mytool`,
      zsh: R`echo 'export PATH="$HOME/tools:$PATH"' >> ~/.zshrc
source ~/.zshrc
echo $PATH | tr ':' '\n' | head -3
command -v mytool`,
      ps: R`$new = "$HOME\tools;" + [Environment]::GetEnvironmentVariable("Path", "User")
[Environment]::SetEnvironmentVariable("Path", $new, "User")
# افتح ترمنال جديد، وبعدين:
Get-Command mytool`,
      cmd: R`rundll32 sysdm.cpl,EditEnvironmentVariables
REM من النافذة: Path بتاع اليوزر → New → اكتب مسار الفولدر → OK
REM افتح CMD جديد، وبعدين:
where mytool`
    }
  },
  {
    t: "امنع أي commit فيه أخطاء lint",
    d: "في مشروع Node عندك: سطّب husky و lint-staged، واعمل hook بيشغّل ESLint و Prettier على الملفات اللي عملتلها add بس، وجرّب تعمل commit لملف فيه غلطة واتأكد إنه اترفض. الشرح في تاب فحص الكود المستوى ٢.",
    s: {
      bash: R`npm i -D husky lint-staged
npx husky init
echo "npx lint-staged" > .husky/pre-commit
printf '{ "*.{js,ts,tsx}": ["eslint --fix", "prettier --write"] }\n' > .lintstagedrc.json
echo "const x = ;" > broken.js && git add broken.js
git commit -m "test: hook" || echo "اترفض زي ما المفروض"
git reset -q broken.js && rm broken.js`
    }
  },
  {
    t: "مشروع Python نضيف: venv واختبارات",
    d: "اعمل venv للمشروع، وسطّب pytest جواه، واكتب اختبار صغير وشغّله، واحفظ النسخ في requirements.txt. الشرح في تاب Python.",
    s: {
      bash: R`python3 -m venv .venv
source .venv/bin/activate
pip install pytest
printf 'def test_add():\n    assert 1 + 1 == 2\n' > test_math.py
pytest -q
pip freeze > requirements.txt`,
      ps: R`py -m venv .venv
.venv\Scripts\Activate.ps1
pip install pytest
Set-Content test_math.py 'def test_add():', '    assert 1 + 1 == 2' -Encoding utf8
pytest -q
pip freeze > requirements.txt`
    }
  }
]);
