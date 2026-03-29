# home-slider-large-ledger

## 1. 外層容器
- 原始 selector：`section#shopify-section-home-slider.hero-slider.is-large`
- 外層屬性：
  - `id="shopify-section-home-slider"`
  - `class="hero-slider is-large"`
  - `full-slider=""`
  - `nav-light=""`
  - `style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"`
- 直接子層順序：
  1. `div.slides-info.is-large`
  2. `div.hero-slider_wrap`
  3. `div.slider_btn.is-prev`
  4. `div.slider_btn.is-next`

## 2. 子段逐條帳

### [1] `div.slides-info.is-large`
- 父層：`section#shopify-section-home-slider`
- 同層前後鄰接：後方鄰接 `div.hero-slider_wrap`
- 直接子層：包含 3 個區塊 `div.slide-left`、`div.slide-indicator.is-desktop`、`div.swipe-eyebrow.is-mobile`
- 關鍵屬性：`class="slides-info is-large"`
- 是否含媒體掛載：否
- 是否含文字層：是
- 是否含控制元素：否
- 原樣摘錄到哪一層為止：列至文字層標籤（如 `<p>`, `<span class="slide-current">`, `div.orgc-detail`）為止。

### [2] `div.slide-left` / `div.slide-indicator` / `div.swipe-eyebrow`
- 父層：`div.slides-info.is-large`
- 同層前後鄰接：彼此前後相鄰
- 直接子層：
  - 左側區塊：`<p class="text-style_alt-med">ORGC_26</p>`
  - 右側指示器（桌面端）：`<p class="text-style_alt-med">0<span class="slide-current">1</span></p>`
  - 提示文字（行動端）：`div.orgc-detail.body-upper` > `div.detail-text` (Swipe)
- 關鍵屬性：各自帶有辨識屬性如 `class="slide-left"`, `class="slide-indicator is-desktop"`, `class="swipe-eyebrow is-mobile"`
- 是否含媒體掛載：否
- 是否含文字層：是
- 是否含控制元素：否
- 原樣摘錄到哪一層為止：末端文字與 `span` 掛載節點。

### [3] `div.hero-slider_wrap`
- 父層：`section#shopify-section-home-slider`
- 同層前後鄰接：前方緊接 `div.slides-info.is-large`，後方緊接 `div.slider_btn.is-prev`
- 直接子層：`div.hero-slider_list`
- 關鍵屬性：`class="hero-slider_wrap"`, `nav-light=""`
- 是否含媒體掛載：深層含有
- 是否含文字層：否
- 是否含控制元素：否
- 原樣摘錄到哪一層為止：包裹容器自身。

### [4] `div.hero-slider_list`
- 父層：`div.hero-slider_wrap`
- 同層前後鄰接：無同層鄰接
- 直接子層：多個重複的 `div.hero-slider_item`
- 關鍵屬性：`class="hero-slider_list"`
- 是否含媒體掛載：深層含有
- 是否含文字層：否
- 是否含控制元素：否
- 原樣摘錄到哪一層為止：清單列表容器。

### [5] `div.hero-slider_item` (共 7 個重複節點)
- 父層：`div.hero-slider_list`
- 同層前後鄰接：彼此前後相鄰
- 直接子層：單一 `div.hero-slide_visual.u-cover-absolute.is-large`
- 關鍵屬性：
  - 第一個：`style="display: flex;"`, `class="hero-slider_item"`
  - 第 2~7 個：`style="display: none;"`, `class="hero-slider_item"`
- 是否含媒體掛載：是
- 是否含文字層：否
- 是否含控制元素：否
- 原樣摘錄到哪一層為止：單一 slide 單元的外殼區塊。

### [6] `div.hero-slide_visual.u-cover-absolute.is-large`
- 父層：`div.hero-slider_item`
- 同層前後鄰接：未有其他子節點
- 直接子層：`<img alt="" class="hero-visual_el u-cover-absolute" loading="auto" data-placeholder="image">`
- 關鍵屬性：`class="hero-slide_visual u-cover-absolute is-large"`
- 是否含媒體掛載：是（單獨影像）
- 是否含文字層：否
- 是否含控制元素：否
- 原樣摘錄到哪一層為止：末端 img 結構。

### [7] `div.slider_btn.is-prev` / `div.slider_btn.is-next`
- 父層：`section#shopify-section-home-slider`
- 同層前後鄰接：前接包裹媒體的 `div.hero-slider_wrap`
- 直接子層：無（空容器）
- 關鍵屬性：`data-cursor="Prev"` 與 `data-cursor="Next"`, 並各自帶有 `class="slider_btn is-prev"` 或 `class="slider_btn is-next"`
- 是否含媒體掛載：否
- 是否含文字層：否
- 是否含控制元素：是（本身作為上/下張圖片功能控制塊，同時具有游標事件綁定）
- 原樣摘錄到哪一層為止：末端空元素。

## 3. 重複 slide 統計
- 是否存在重複 slide 群組：是，`div.hero-slider_item`
- 數量：共計 7 個 slide
- 每個共同 class / 屬性：
  - 皆含有 `class="hero-slider_item"` 及其內部純圖片掛載 `img.hero-visual_el` 結構。
  - 第一個自帶 `display: flex;` 行內樣式以供初始顯示；後續皆為 `display: none;` 在初始化前隱藏。
  - 每個內部僅包含純粹的影像元素（無獨立之 video placeholder 或是 text overlay / CTA）。
- 是否存在非 slide 子層：是，整個區塊頂部設有包含數字掛鉤的 `div.slides-info.is-large`，底部同層級有 `div.slider_btn` 的上下一頁透明觸控層。

## 4. 最終對帳
- `section#shopify-section-home-slider.hero-slider.is-large` 內共有幾個不可再合併的子段：
  以 DOM 流而言，共有 4 大關鍵平行的子區塊：
  1. `slides-info`
  2. `hero-slider_wrap`（內部再包 `hero-slider_list` 與 7 個 `hero-slider_item`）
  3. `slider_btn.is-prev`
  4. `slider_btn.is-next`
- 哪些 selector / 屬性 之後完整復刻時必須原樣保留：
  - 最外殼雙向綁定：`full-slider=""` 與 `nav-light=""`（其中 `nav-light` 出現在外層 section 及內部 wrap 這兩層）。
  - 對 Safari 及觸控事件的原生影響：`style="touch-action: pan-y; ..."` 行內屬性。
  - 在 JS 生命週期前必須為隱藏屬性：`style="display: none;"` (在非 active slides)。
  - 目前所在圖片編號注入節點：`<span class="slide-current">`。
  - 客製游標綁定加上下翻頁觸發器：空節點即帶有 `data-cursor="Prev/Next"` 屬性的元素。
- 哪些層先前完全遺漏：
  這個大型全畫面 `home-slider.is-large` 的 pure image 輪播佔位區塊，介位於 `dark-section_wrap` 和 `community-section` 中間。這座高聳龐大的區域，在此前的 7 大樓層分塊與包含所有 ledger 挖掘過程皆遭到徹底無視、不留半點痕跡地被抽象與遺忘。
