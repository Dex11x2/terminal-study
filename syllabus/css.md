# منهج HTML و CSS (css): 1103 من 1180 بند متغطي (93٪)

اتبنى 2026-11-18 من: [WHATWG HTML Living Standard (Index)](https://html.spec.whatwg.org/multipage/indices.html)، [MDN HTML reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference)، [mdn/data (CSS)](https://github.com/mdn/data/tree/main/css)، [web-features (Baseline)](https://github.com/web-platform-dx/web-features)، [MDN Curriculum](https://developer.mozilla.org/en-US/curriculum/). الكورس فيه 207 درس. الملف ده بيتولّد بـ `node tools/syllabus.js css --write`، متعدّلوش بإيدك.

| النوع | في المنهج | متغطي | مذكور من غير شرح | ناقص خالص | مستبعد بسبب |
|---|---|---|---|---|---|
| عناصر HTML | 113 | 113 | 0 | 0 | 20 |
| attributes | 145 | 145 | 0 | 0 | 1 |
| أنواع input | 22 | 22 | 0 | 0 | 0 |
| قيم rel | 27 | 27 | 0 | 0 | 3 |
| خصائص CSS | 422 | 382 | 11 | 29 | 251 |
| selectors | 88 | 88 | 0 | 0 | 56 |
| at-rules | 16 | 15 | 1 | 0 | 3 |
| دوال CSS | 93 | 70 | 7 | 16 | 14 |
| وحدات | 62 | 62 | 0 | 0 | 0 |
| أنواع القيم | 37 | 35 | 0 | 2 | 2 |
| مهارات (MDN Curriculum) | 155 | 144 | 0 | 11 | 0 |

## خصائص CSS: ناقص 40

- **CSS Animations** ناقص: `animation-composition`
- **CSS Transforms** ناقص: `backface-visibility` `perspective` `perspective-origin` `transform-box` `transform-style`. مذكور من غير شرح: `transform-origin` (5)
- **Scalable Vector Graphics** ناقص: `color-interpolation` `cx` `cy` `fill-opacity` `fill-rule` `marker-end` `marker-mid` `marker-start` `path-length` `rx` `ry` `shape-rendering` `stroke-miterlimit` `stroke-opacity` `text-anchor` `text-rendering`. مذكور من غير شرح: `paint-order` (1) `r` (3) `stroke-dasharray` (2) `stroke-dashoffset` (2) `stroke-linecap` (2) `stroke-linejoin` (2) `vector-effect` (1) `x` (7) `y` (5)
- **Motion Path** ناقص: `offset-anchor` `offset-distance` `offset-path` `offset-position` `offset-rotate`. مذكور من غير شرح: `offset` (3)
- **CSS Transitions** ناقص: `transition-timing-function`
- **CSS View Transitions** ناقص: `view-transition-class`

## at-rules: ناقص 1

- **CSS Transitions** مذكور من غير شرح: `@starting-style` (3)

## دوال CSS: ناقص 23

- **CSS Easing Functions** ناقص: `linear()` `steps()`. مذكور من غير شرح: `cubic-bezier()` (2)
- **CSS Transforms** ناقص: `matrix3d()` `perspective()` `rotate3d()` `rotateX()` `rotateY()` `rotateZ()` `scale3d()` `scaleZ()` `skew()` `skewX()` `skewY()` `translate3d()`. مذكور من غير شرح: `matrix()` (7) `rotate()` (9) `scaleX()` (3) `scaleY()` (2) `translate()` (1) `translateZ()` (2)
- **CSS Values and Units** ناقص: `param()`
- **Motion Path** ناقص: `ray()`

## أنواع القيم: ناقص 2

- **CSS Easing Functions** ناقص: `<easing-function>`
- **CSS Transforms** ناقص: `<transform-function>`

## مهارات (MDN Curriculum): ناقص 11

**1. Transform & animate CSS › 0 الموديول كله**

- `out:transform-and-animate-css/0.3` Common transforms — scaling, rotation, and translation. ← no lesson on transform: scale/rotate/translate (only translateY inside the transition lesson)
- `out:transform-and-animate-css/0.4` 3D transforms, and how 3D positioning/perspective is handled on the web. ← 3D transforms, perspective, preserve-3d not taught

**2. Semantic HTML › 2.2 Good document structure**

- `out:semantic-html/2.2.4` SEO benefits: for example, keywords are boosted in headings. ← headings as an outline are taught in «h1 لحد h6» (SEO part from docs, §٦); confirm the SEO claim wording before mapping

**7. Accessibility › 7.1 Accessibility basics**

- `out:accessibility/7.1.1` Understand the point of accessibility — increased usability for everyone, better SEO, and a wider target audience. Also, be aware of the legal requirements. ← no lesson on why accessibility matters (audience, SEO, legal)
- `out:accessibility/7.1.2` Understand that accessibility should be considered from the start of a project, and not bolted on at the end. ← accessibility-from-the-start principle not taught
- `out:accessibility/7.1.5` Accessible best practices: (6 نقطة فرعية) ← alt/labels/tables taught in separate lessons; good link text and plain language absent

**7. Accessibility › 7.2 Accessible styling**

- `out:accessibility/7.2.1` Text sizing and layout: (3 نقطة فرعية) ← partly taught in «rem و em › لما المستخدم يكبّر الخط من الإعدادات»: needs a real section

**7. Accessibility › 7.3 Accessible JavaScript**

- `out:accessibility/7.3.1` Understand that there is such a thing as too much JavaScript. A simpler approach is usually more accessible, and often better for everyone. ← too much JavaScript concept not taught
- `out:accessibility/7.3.2` Understand the value of unobtrusive JavaScript: (2 نقطة فرعية) ← unobtrusive JavaScript / progressive enhancement not taught
- `out:accessibility/7.3.3` Use events sensibly so you don't lock out specific control types. For example, mouse-specific events such as mouseover and mouseout could lock out keyboard or touchscreen users. ← sensible event choice (mouseover vs keyboard/touch) not taught

**7. Accessibility › 7.4 Assistive technology**

- `out:accessibility/7.4.1` Screen readers and other assistive technology (AT) types: (12 نقطة فرعية) ← screen readers touched, but no overview of AT types (magnifiers, braille, voice, switch) or source order


## مستبعد أوتوماتيك (من حالة المرجع)

- **مش في مواصفة WHATWG (مهجور أو تجريبي). يتذكر في جملة مع البديل، من غير درس.** (20): `acronym` `big`✓ `center`✓ `dir`✓ `fencedframe` `font`✓ `frame` `frameset` `geolocation` `marquee` `nobr` `noembed` `noframes` `param` `plaintext` `rb` `rtc` `strike`✓ `tt`✓ `xmp`
- **الأحداث بتتكتب بـ addEventListener وبتتشرح في كورس JavaScript. هنا جملة واحدة: متكتبش onclick في الـ HTML وليه.** (1): `on* (event handler attributes)`
- **مش في جدول Link types في مواصفة WHATWG (تجريبي أو microformat).** (3): `compression-dictionary` `me` `prerender`
- **مش قياسي (prefix أو متصفح واحد).** (145): `-ms-accelerator` `-ms-block-progression` `-ms-content-zoom-chaining` `-ms-content-zoom-limit` `-ms-content-zoom-limit-max` `-ms-content-zoom-limit-min` `-ms-content-zoom-snap` `-ms-content-zoom-snap-points` `-ms-content-zoom-snap-type` `-ms-content-zooming` `-ms-filter` `-ms-flow-from` `-ms-flow-into` `-ms-grid-columns` `-ms-grid-rows` `-ms-high-contrast-adjust` `-ms-hyphenate-limit-chars` `-ms-hyphenate-limit-lines` `-ms-hyphenate-limit-zone` `-ms-ime-align` `-ms-overflow-style` `-ms-scroll-chaining` `-ms-scroll-limit` `-ms-scroll-limit-x-max` `-ms-scroll-limit-x-min` `-ms-scroll-limit-y-max` `-ms-scroll-limit-y-min` `-ms-scroll-rails` `-ms-scroll-snap-points-x` `-ms-scroll-snap-points-y` `-ms-scroll-snap-type` `-ms-scroll-snap-x` `-ms-scroll-snap-y` `-ms-scroll-translation` `-ms-scrollbar-3dlight-color` `-ms-scrollbar-arrow-color` `-ms-scrollbar-base-color` `-ms-scrollbar-darkshadow-color` `-ms-scrollbar-face-color` `-ms-scrollbar-highlight-color` `-ms-scrollbar-shadow-color` `-ms-scrollbar-track-color` `-ms-text-autospace` `-ms-touch-select` `-ms-user-select` `-ms-wrap-flow` `-ms-wrap-margin` `-ms-wrap-through` `-moz-appearance` `-moz-binding` `-moz-border-bottom-colors` `-moz-border-left-colors` `-moz-border-right-colors` `-moz-border-top-colors` `-moz-context-properties` `-moz-float-edge` `-moz-force-broken-image-icon` `-moz-orient` `-moz-outline-radius` `-moz-outline-radius-bottomleft` `-moz-outline-radius-bottomright` `-moz-outline-radius-topleft` `-moz-outline-radius-topright` `-moz-stack-sizing` `-moz-text-blink` `-moz-user-focus` `-moz-user-input` `-moz-user-modify` `-moz-window-dragging` `-moz-window-shadow` `-webkit-appearance` `-webkit-border-after` `-webkit-border-after-color` `-webkit-border-after-style` `-webkit-border-after-width` `-webkit-border-before` `-webkit-border-before-color` `-webkit-border-before-style` `-webkit-border-before-width` `-webkit-border-end` `-webkit-border-end-color` `-webkit-border-end-style` `-webkit-border-end-width` `-webkit-border-start` `-webkit-border-start-color` `-webkit-border-start-style` `-webkit-border-start-width` `-webkit-box-reflect` `-webkit-mask`✓ `-webkit-mask-attachment` `-webkit-mask-clip` `-webkit-mask-composite` `-webkit-mask-image`✓ `-webkit-mask-origin` `-webkit-mask-position` `-webkit-mask-position-x` `-webkit-mask-position-y` `-webkit-mask-repeat` `-webkit-mask-repeat-x` `-webkit-mask-repeat-y` `-webkit-mask-size` `-webkit-overflow-scrolling` `-webkit-tap-highlight-color` `-webkit-touch-callout` `-webkit-user-modify` `-webkit-user-select` `align-tracks` `box-align` `box-direction` `box-flex` `box-flex-group` `box-lines` `box-ordinal-group` `box-orient` `box-pack` `font-smooth` `justify-tracks` `masonry-auto-flow` `overflow-clip-box` `::-ms-browse` `::-ms-check` `::-ms-clear` `::-ms-expand` `::-ms-fill` `::-ms-fill-lower` `::-ms-fill-upper` `::-ms-reveal` `::-ms-thumb` `::-ms-ticks-after` `::-ms-ticks-before` `::-ms-tooltip` `::-ms-track` `::-ms-value` `::-moz-progress-bar` `::-moz-range-progress` `::-moz-range-thumb` `::-moz-range-track` `::-webkit-progress-bar` `::-webkit-progress-inner-value` `::-webkit-progress-value` `::-webkit-slider-runnable-track` `::-webkit-slider-thumb` `@document` `hsla()` `rgba()`
- **مش Baseline: مش شغال في كل المتصفحات الأساسية لسه.** (165): `accent-color`✓ `anchor-name`✓ `anchor-scope` `animation-range`✓ `animation-range-end` `animation-range-start` `animation-timeline`✓ `animation-trigger` `baseline-source` `border-shape` `box-decoration-break` `caret-shape`✓ `column-height` `column-wrap` `corner-block-end-shape` `corner-block-start-shape` `corner-bottom-shape` `corner-bottom-left-shape` `corner-bottom-right-shape` `corner-end-end-shape` `corner-end-start-shape` `corner-inline-end-shape` `corner-inline-start-shape` `corner-left-shape` `corner-right-shape` `corner-shape`✓ `corner-start-start-shape` `corner-start-end-shape` `corner-top-shape` `corner-top-left-shape` `corner-top-right-shape` `d`✓ `dynamic-range-limit` `field-sizing`✓ `font-language-override` `font-synthesis-position` `font-variant-emoji`✓ `font-width` `forced-color-adjust` `frame-sizing` `hanging-punctuation` `hyphenate-limit-chars` `image-resolution` `initial-letter` `initial-letter-align` `interpolate-size` `interactivity` `interest-delay` `interest-delay-end` `interest-delay-start` `line-clamp`✓ `line-height-step` `link-parameters` `margin-trim` `mask-border`✓ `mask-border-outset`✓ `mask-border-repeat`✓ `mask-border-slice`✓ `mask-border-source`✓ `mask-border-width`✓ `mask-mode`✓ `math-shift` `max-lines` `object-view-box` `orphans` `overflow-clip-margin` `overlay` `overscroll-behavior`✓ `overscroll-behavior-block` `overscroll-behavior-inline` `overscroll-behavior-x`✓ `overscroll-behavior-y`✓ `position-anchor` `position-area` `position-try` `position-try-fallbacks` `position-try-order` `position-visibility` `reading-flow` `reading-order` `resize` `ruby-merge` `ruby-overhang` `scroll-axis-lock` `scroll-initial-target` `scroll-marker-group` `scroll-target-group` `scroll-timeline` `scroll-timeline-axis` `scroll-timeline-name` `speak-as`✓ `stroke-color` `text-decoration-skip` `text-fit` `text-justify` `text-size-adjust` `text-spacing-trim` `timeline-scope` `timeline-trigger` `timeline-trigger-activation-range` `timeline-trigger-activation-range-end` `timeline-trigger-activation-range-start` `timeline-trigger-active-range` `timeline-trigger-active-range-end` `timeline-trigger-active-range-start` `timeline-trigger-name` `timeline-trigger-source` `transition-behavior`✓ `trigger-scope` `user-select` `view-timeline` `view-timeline-axis` `view-timeline-inset` `view-timeline-name` `view-transition-scope` `widows` `window-drag` `:autofill`✓ `:blank` `:buffering` `:current` `:fullscreen`✓ `:future` `:has-slotted` `:host-context()`✓ `:left` `:local-link` `:muted` `:past` `:paused` `:picture-in-picture`✓ `:playing` `:right` `:seeking` `:stalled` `:target-current` `:target-within` `:volume-locked` `:xr-overlay` `::checkmark` `::cue-region` `::cue-region()` `::grammar-error` `::marker`✓ `::picker-icon` `::picker()` `::scroll-marker` `::scroll-marker-group` `::selection`✓ `::spelling-error` `@position-try` `@view-transition`✓ `anchor()` `anchor-size()` `calc-size()`✓ `cross-fade()`✓ `element()`✓ `leader()` `paint()` `scroll()`✓ `target-counter()` `target-counters()` `target-text()` `view()`✓ `<text-edge>`
- **اتشال من المواصفة.** (16): `clip`✓ `font-stretch`✓ `grid-column-gap` `grid-gap` `grid-row-gap` `ime-mode` `page-break-after` `page-break-before` `page-break-inside` `scroll-snap-coordinate` `scroll-snap-destination` `scroll-snap-points-x` `scroll-snap-points-y` `scroll-snap-type-x` `scroll-snap-type-y` `<shape>`

✓ = مستبعد من المنهج بس مشروح في الكورس برضه.

