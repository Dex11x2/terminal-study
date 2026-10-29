# الناقص في كل تاب (فحص ٢٩ أكتوبر)

قاعدة ٩ في `PLAN.md`: التاب مش بيخلص غير لما المواضيع والدروس والمشاريع يكملوا. الفحص اتعمل بـ ٥ agents للقراية بس (grep على كل ملفات التاب)، فالرقم صفر موثوق، والرقم الصغير (١–٣) معناه ذكر عابر. **قبل ما تكتب أي موضوع هنا، اتأكد بـ `node tools/lesson.js find` إنه مش موجود فعلًا.** علّم `[x]` على اللي اتعمل.

**مشاريع آخر الوحدات موجودة بس في:** js (23–25)، و cmd، و tools، و git (07)، و net، و docker (07–10)، و quality/06، و node و python و go و kotlin و pyapi و swift و pydata و php و cpp (مشروع أو أكتر). **مفيش مشاريع خالص في:** zsh و wsl و os و files و start و symbols و vscode و vps و nginx و sshc و sec و cloud و gha و diag و web و css و ts و react و next و vue و angular و rn و flutter و apps و api و apis و pg و mongo و data و spring و dotnet و الـ ١٢ تاب النظري.

## shell والنظام

- **ps/bash** (شغالين): ps/27 و bash/32 «أوامر قوية للسكربتات».
- **cmd:** [ ] `reg query/add/export` · [ ] افتح CMD كـ Administrator (و `net session` في batch بيرفع نفسه) · [ ] `pushd/popd` و `subst` · [ ] `wevtutil` و `getmac` و `gpresult` و `cmdkey` · [ ] `assoc/ftype`. مشاريع: صيانة يومية .bat، تشخيص شبكة .bat.
- **zsh (mac):** [ ] `bindkey` و history options و `compinit` · [ ] SIP (`csrutil`) و Recovery · [ ] sudo على الماك و Touch ID (`pam_tid`) · [ ] ترتيب `.zshenv/.zprofile/.zshrc` و `path_helper` · [ ] `log show` · [ ] `brew bundle` و dotfiles · [ ] `hdiutil/pkgutil`. مشاريع: mac-setup.sh، تقرير صحة الماك، launchd backup.
- **wsl:** [ ] `wsl -u root` وفك الباسورد · [ ] WSL1 ولا WSL2 · [ ] vmmem واكل رام · [ ] `wsl --mount` · [ ] cron جوه WSL وتشغيله مع ويندوز · [ ] Windows Terminal profiles. مشاريع: بيئة تطوير تتعمل من جديد بأمر، باك أب مجدول، تفتح تطبيق WSL من الموبايل.
- **os:** [ ] Task Scheduler · [ ] msconfig و msinfo32 و Safe Mode و Recovery · [ ] Disk Utility و Recovery على الماك · [ ] diskmgmt/lusrmgr/gpedit. مشاريع: يوم بالكيبورد بس، tune-up لويندوز، تمرين recovery.
- **files:** [ ] symlink و shortcut (.lnk) والصلاحيات · [ ] `.github/workflows/*.yml` · [ ] `~/.ssh/config` و known_hosts · [ ] eslint.config/.prettierrc · [ ] ملفات temp/swap/.bak/.DS_Store.
- **start:** [ ] تشغيل كـ Administrator على كل نظام · [ ] نسخ ولصق في الترمنال · [ ] regex ببساطة · [ ] الفاير وول والـ VPN · [ ] الباسوردات و 2FA. مشروع: أول جلسة ترمنال (فولدر، ملف، git init، commit).
- **tools:** [ ] winget/scoop/choco/brew · [ ] تتأكد إن الملف سليم (hash) · [ ] curl · [ ] باك أب بسكربت مجدول · [ ] ffmpeg. مشاريع: باك أب مجدول، bootstrap لجهاز جديد، تحقق من ملف متنزّل.
- **symbols:** [ ] رموز PowerShell (`$_` و `@()` و `@{}` و `-eq`) · [ ] parameter expansion · [ ] يونيكود والعربي.
- **vscode:** [ ] Testing / Test Explorer · [ ] Workspace Trust وأمان الإضافات · [ ] Prettier و ESLint · [ ] Live Share و Outline. مشاريع: repo جاهز للفريق (.vscode)، debug لـ API.
- **git:** [ ] GitHub Actions أساسيات · [ ] سرّ اتعمله commit (filter-repo وتغيير المفتاح) · [ ] HTTPS auth: PAT و Credential Manager و `gh auth` · [ ] git hooks · [ ] `--depth` و sparse-checkout · [ ] branch protection و CODEOWNERS · [ ] `includeIf`. مشاريع: pre-commit gate، CI على PR، تمرين إنقاذ repo.

## السيرفرات والشبكات

- **docker:** [ ] `--cap-drop` و no-new-privileges و pids-limit · [ ] log rotation (`max-size`) · [ ] `docker context` · [ ] save/load · [ ] rootless. مشروع: registry خاص و pull من VPS.
- **vps:** [ ] sudo و visudo و تبقى root · [ ] باك أب off-site بـ restic واختبار الرجوع · [ ] scp و rsync · [ ] chmod/chown على السيرفر · [ ] dmesg و lsof و vmstat · [ ] lastb و auth.log · [ ] LVM · [ ] deploy بدون توقف. مشاريع: سيرفر production كامل، باك أب 3-2-1، deploy بدون توقف.
- **nginx:** [ ] fastcgi_pass و php-fpm · [ ] CORS · [ ] stub_status · [ ] worker tuning و open_file_cache · [ ] X-Accel-Redirect · [ ] stream (TCP proxy) · [ ] TLS hardening. مشاريع: reverse proxy لـ ٣ خدمات، WordPress/Laravel خلف nginx.
- **sshc:** [ ] scp و sftp و rsync · [ ] ssh-copy-id · [ ] ssh -vvv و Permission denied (publickey) · [ ] autossh · [ ] 2FA للـ SSH. مشاريع: bastion، tunnel دايم.
- **net:** [ ] mtr و iperf · [ ] سجلات DNS للإيميل (MX/SPF/DKIM) · [ ] hosts و resolv.conf · [ ] load balancing L4/L7 · [ ] nftables. مشاريع: VPN بـ WireGuard، load balancer صغير.
- **sec:** [ ] 2FA/TOTP و OAuth · [ ] أمان رفع الملفات · [ ] open redirect و XXE و mass assignment و timing attacks · [ ] اتسرّب سر: rotate و filter-repo · [ ] lynis و SUID · [ ] CORS · [ ] SBOM. مشاريع: ثغرة وإصلاحها (٥ من OWASP)، فحص وتأمين سيرفر.
- **cloud:** [ ] PVC و StatefulSet · [ ] NetworkPolicy · [ ] CronJob · [ ] ArgoCD و Kustomize · [ ] SQS و DynamoDB · [ ] Azure و GCP مقارنة · [ ] tags والتكلفة. مشاريع: 3-tier على AWS بـ Terraform، K8s كامل على kind، موقع على S3+CloudFront بـ CI.
- **gha:** [ ] branch protection و CODEOWNERS · [ ] release automation · [ ] `paths` و continue-on-error · [ ] CodeQL و attestations. مشاريع: pipeline كامل لحد الـ deploy والرجوع، release bot.
- **diag:** [ ] CORS و mixed content · [ ] redirect loop · [ ] WebSocket بيفشل · [ ] slow query و TIME_WAIT · [ ] git bisect. مشاريع: حل ٥ أعطال في lab، stack مراقبة، runbook و postmortem.
- **quality:** [ ] MSW و testcontainers و Testing Library · [ ] Dependabot و Renovate · [ ] k6 · [ ] bundle size و madge · [ ] TDD. مشاريع: pipeline جودة كامل، اختبار API بقاعدة حقيقية.

## الـ frontend

- **web:** [ ] CSRF و SameSite · [ ] WebSocket و SSE في Network · [ ] صيغ الصور · [ ] الكاش و 304. مشروع: تشخيص موقع بطيء ومكسور.
- **css:** [ ] تنظيم CSS (BEM و Modules) · [ ] popover و dialog · [ ] scroll-driven animations · [ ] @property · [ ] gradients و shadows و filter · [ ] @media print · [ ] subgrid. مشاريع: landing page، dashboard layout، فورم تسجيل accessible.
- **js (مواضيع فرعية جوه دروس موجودة، من مراجعة js/11–15):** [ ] `exports`/`imports` في package.json و import maps و `import.meta.resolve` · [ ] الـ handlers العامة (`unhandledrejection` و `process.on('uncaughtException')`) و `AggregateError` · [ ] `AbortSignal.any` و `Promise.try` · [ ] `RegExp.escape` · [ ] مراحل event loop في Node (`setImmediate` و `nextTick`) و `scheduler.yield` · [ ] `WeakRef` و `FinalizationRegistry` و heap snapshot.
- **js:** [ ] Proxy و Reflect · [ ] WebSocket و SSE · [ ] Web Workers · [ ] Clipboard و Geolocation و Share · [ ] Streams · [ ] ESLint و Prettier و Vitest · [ ] requestAnimationFrame. مشاريع: expense tracker، بحث بـ debounce و AbortController، لعبة كتابة.
- **ts:** [ ] function overloads · [ ] template literal types · [ ] typescript-eslint · [ ] Result type · [ ] tRPC · [ ] تحويل مشروع JS لـ TS. مشاريع: migration، API client بـ Zod، event emitter typed.
- **react:** [ ] drag and drop (dnd-kit) · [ ] رفع ملفات بـ progress · [ ] الستايل في React · [ ] e2e. مشاريع: Kanban، admin dashboard، قايمة بـ URL state و infinite scroll.
- **next:** [ ] redirects و rewrites و headers · [ ] رفع ملفات · [ ] Node ولا Edge · [ ] مراقبة الأخطاء (Sentry و instrumentation). مشاريع: blog/CMS، متجر صغير بـ Stripe، موقع عربي/إنجليزي.
- **vue:** [ ] Suspense · [ ] template refs و defineExpose · [ ] route middleware و useAsyncData في Nuxt · [ ] runtimeConfig · [ ] KeepAlive و TransitionGroup. مشاريع: notes app، Nuxt blog، dashboard بـ i18n.
- **angular:** [ ] ControlValueAccessor · [ ] content projection · [ ] ErrorHandler · [ ] animations · [ ] angular-eslint. مشاريع: task manager، admin panel، بحث بـ RxJS.
- **rn:** [ ] gesture handler و bottom sheet · [ ] Firebase · [ ] universal links · [ ] biometric · [ ] maps و svg · [ ] Maestro e2e. مشاريع: notes، متجر، مشاركة صور.
- **flutter:** [ ] Hero و animations · [ ] CustomPaint · [ ] permission_handler · [ ] camera و url_launcher و webview · [ ] gestures · [ ] Slivers · [ ] mocktail · [ ] Semantics و l10n. مشاريع: notes، متجر، weather بالموقع.
- **apps:** [ ] deep links · [ ] Electron IPC و contextBridge · [ ] electron-updater · [ ] توقيع Windows و notarization · [ ] TestFlight · [ ] tray و menu. مشاريع: الموقع كـ exe و APK موقّعين، notes بـ Tauri، Capacitor بكاميرا و push.

## الـ backend والبيانات

- **node:** [ ] رفع ملف من غير مكتبة · [ ] `--cpu-prof`. مشاريع: daemon لمراقبة ملفات، webhook receiver.
- **api:** [ ] OpenAPI من الكود · [ ] Socket.IO في Express · [ ] BullMQ · [ ] نشر Express. مشاريع: Notes API كامل، API لمشاركة الملفات، شات realtime.
- **apis:** [ ] async operation (202) · [ ] deprecation و Sunset. مشاريع: API عام بـ keys و rate limit و webhooks، event pipeline بـ outbox.
- **python:** [ ] جدولة مهام · [ ] sqlite3. مشاريع: بوت Telegram، سكربت مراقبة بتاريخ في sqlite.
- **pyapi:** [ ] Celery/ARQ · [ ] WebSocket و رفع ملفات في FastAPI · [ ] ruff و mypy · [ ] observability · [ ] refresh token. مشاريع: URL shortener، Django blog.
- **pydata:** [ ] إحصاء أساسي · [ ] مقاييس التقييم (precision/recall/ROC) و data leakage · [ ] Streamlit · [ ] SettingWithCopy و dtypes · [ ] feature engineering و K-Means. مشاريع: churn prediction، scraping لـ dashboard.
- **pg:** [ ] partitioning · [ ] replication و PgBouncer · [ ] PITR و WAL · [ ] pgvector و GIN. مشاريع: تمرين باك أب و PITR، صيد query بطيئة بـ pgbench.
- **mongo:** [ ] TTL و partial و text indexes · [ ] NoSQL injection · [ ] sharding · [ ] Atlas Search. مشاريع: analytics store بـ time series، data model لمتجر.
- **data:** [ ] SQL injection و parameters · [ ] timestamptz · [ ] COPY · [ ] soft delete و audit log. مشاريع: schema لمتجر، قاعدة تقارير، حجز من غير double booking.
- **php:** [ ] PHPUnit · [ ] broadcasting و Reverb · [ ] Cache و Redis في Laravel · [ ] Laravel logging. مشاريع: login و CRUD بـ PHP عادي، Laravel API.
- **go:** [ ] JWT و bcrypt · [ ] OpenAPI · [ ] golang-migrate · [ ] gRPC و WebSocket و rate limit · [ ] testify و testcontainers. مشاريع: URL shortener، CLI، شات بـ WebSocket.
- **spring:** [ ] CORS · [ ] springdoc · [ ] رفع ملفات · [ ] @Scheduled و @Async · [ ] @Cacheable · [ ] RestClient و resilience4j · [ ] @Version · [ ] Micrometer. مشاريع: Bookstore API، task API بـ jobs، order service بـ Kafka.
- **dotnet:** [ ] رفع ملفات (IFormFile) · [ ] CORS · [ ] SignalR · [ ] health checks · [ ] Polly · [ ] concurrency token. مشاريع: Library API، worker app، شات بـ SignalR.
- **kotlin:** [ ] Ktor server · [ ] WorkManager · [ ] FCM · [ ] offline-first. مشاريع: weather، to-do بتذكير، Ktor API و Android client.
- **swift:** [ ] Keychain · [ ] notifications · [ ] WidgetKit · [ ] Vapor · [ ] animations. مشاريع: news reader، habit tracker بـ widget.
- **cpp:** [ ] bitwise operations · [ ] alignment و padding · [ ] sockets · [ ] std::format و clang-tidy. مشاريع: CLI، key-value store بـ TCP، text adventure.

## النظري والشغل

- **glossary:** [ ] أقسام ناقصة: web/JS، و Git workflow، و DB، و security، و AI، و architecture، و concurrency (OAuth و CSRF و race condition و middleware و session و WebSocket و Promise و load balancer و queue و RBAC و N+1 و embedding و MCP و prompt injection و canary...).
- **dsa:** [ ] Kadane و LIS · [ ] edit distance · [ ] MST و Bellman-Ford · [ ] quickselect · [ ] «أنهي pattern؟». مشاريع: ٣٠ مسألة بالـ pattern، مكتبة autocomplete + LRU بتستات.
- **sweng:** [ ] mock و fake و stub · [ ] repository و adapter و decorator و state machine · [ ] layered/clean/hexagonal · [ ] coupling و cohesion. مشاريع: refactor لموديول بايظ، feature بالـ TDD، review لـ PR وحش.
- **arch:** [ ] outbox و message broker · [ ] circuit breaker و bulkhead · [ ] blue-green و canary · [ ] CQRS و event sourcing · [ ] SLO و error budget. مشاريع: ADR + design doc، outbox + worker.
- **ai:** [ ] hybrid search و reranking · [ ] hallucination و grounding و guardrails · [ ] fine-tune ولا RAG ولا prompt. مشاريع: chatbot دعم بـ RAG و evals، فاتورة لـ JSON، agent CLI بحد تكلفة.
- **re:** [ ] Frida لتختبر تطبيقك · [ ] MASVS checklist · [ ] root detection. مشروع: audit لـ APK بتاعك.
- **projects:** [ ] مشروع CLI ينزل npm · [ ] API بـ Docker و CI و staging · [ ] أول PR في open source · [ ] تحويل لـ TypeScript.
- **interview:** [ ] أسئلة JS و React و CSS · [ ] ACID و isolation levels و SQL · [ ] أسئلة أمان و Docker · [ ] counter offer. مشاريع: flashcards، mock interview، بنك قصص STAR.
- **career:** [ ] open source كاستراتيجية · [ ] كتابة تقنية · [ ] عقود وضرايب الفريلانس · [ ] مسار senior و lead.
- **english / speak:** [ ] grammar ناقص (present perfect و conditionals و prepositions) · [ ] design docs · [ ] مكالمات واجتماعات وعرض لغير التقنيين.
- **real:** [ ] تأمين السيرفر · [ ] rollback · [ ] k6.

## الترتيب المقترح

١. **المشاريع** (أكبر ناقص: ٤٥ تاب من غير مشروع). وحدة «مشروع» في آخر كل تاب، والدروس الناقصة اللي المشروع محتاجها.
٢. **المواضيع اللي عليها [high] وبتتكرر في أكتر من تاب:** CORS (nginx و diag و sec و spring و dotnet)، ورفع الملفات (sec و next و react و spring و dotnet و pyapi)، والأسرار اللي اتسرّبت (git و sec)، والأدمن (cmd و vps و wsl و zsh و start)، والباك أب (vps و tools)، و OpenAPI (api و go و spring).
٣. باقي المواضيع تاب تاب، مع كتابة الشرح الضعيف (`thin.js`) لنفس التاب في نفس الدفعة.
