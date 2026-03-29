# home-hero-ledger

## 1. 外層容器
- 原始 selector：`section#home-hero.hero-slider`
- 外層屬性：
  - `id="home-hero"`
  - `class="hero-slider"`
  - `full-slider=""`
  - `nav-light=""`
  - `style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"`
- 直接子層順序：
  1. `div.hero-center.is-desktop`（桌面端左側控制列）
  2. `div.hero-center.is-mobile`（行動端控制列）
  3. `div.hero-slider_wrap`（全部 slide 的容器，含第二個 `nav-light=""` 宣告）

## 2. 子段逐條帳

### [1] `div.hero-center.is-desktop`
- 父層：`section#home-hero.hero-slider`
- 同層前後鄰接：後接 `div.hero-center.is-mobile`
- 直接子層：`div.hero-slider_nav-wrap.u-container`、`h2.hero-slider_scroll`
- 關鍵屬性：`class="hero-center is-desktop"`
- 是否含媒體掛載：否
- 是否含文字層：是，包含 `<h2 italics="" class="hero-slider_scroll">Scroll</h2>`
- 原樣摘錄到哪一層為止：分出導航清單容器與純文字 scroll 指示器。

### [2] `div.hero-slider_nav-wrap.u-container`
- 父層：`div.hero-center.is-desktop`
- 同層前後鄰接：後接 `h2.hero-slider_scroll`
- 直接子層：`div.hero-slider_nav-list`
- 關鍵屬性：`class="hero-slider_nav-wrap u-container"`
- 是否含媒體掛載：否（但子節點內含縮圖圖層）
- 是否含文字層：是（編號文字）
- 原樣摘錄到哪一層為止：內縮邊界容器。

### [3] `div.hero-slider_nav-list`
- 父層：`div.hero-slider_nav-wrap.u-container`
- 同層前後鄰接：無
- 直接子層：3 個 `div.hero-slider_nav-item`（含第一個帶 `active` class）
- 關鍵屬性：`class="hero-slider_nav-list"`
- 是否含媒體掛載：每個 nav-item 內含縮圖圖片容器
- 是否含文字層：是（編號）
- 原樣摘錄到哪一層為止：所有導航縮圖節點的陣列父容器。

### [4] `div.hero-slider_nav-item` (共 3 個重複節點)
- 父層：`div.hero-slider_nav-list`
- 同層前後鄰接：彼此前後相鄰排列，三組
- 直接子層：每個內含 1個 `div.slide-nav_layout`
- 關鍵屬性：
  - `class="hero-slider_nav-item"` (第 1 個額外帶有 `active`)
- 是否含媒體掛載：是，深層含縮圖 `<img class="img-fill">`
- 是否含文字層：是，含序號 `<h2 italics="" class="hero-slider_num">`
- 原樣摘錄到哪一層為止：往下再進一層。

### [5] `div.slide-nav_layout` (每個 nav-item 的直接子層)
- 父層：`div.hero-slider_nav-item`
- 同層前後鄰接：無（為 nav-item 的唯一子節點）
- 直接子層：`h2.hero-slider_num`（序號）、`div.slide-nav_img`（縮圖容器）
- 關鍵屬性：`solo-img_hov=""`, `class="slide-nav_layout"`
- 是否含媒體掛載：是，`div.slide-nav_img` 內含 `<img class="img-fill">`
- 是否含文字層：是，`<h2 italics="" class="hero-slider_num">0N</h2>`
- 原樣摘錄到哪一層為止：到 img 掛載點為止。

### [6] `div.hero-center.is-mobile`
- 父層：`section#home-hero.hero-slider`
- 同層前後鄰接：前接 `div.hero-center.is-desktop`，後接 `div.hero-slider_wrap`
- 直接子層：單一 `<h2 italics="" class="hero-slider_scroll is-next slider_btn">Next</h2>`
- 關鍵屬性：`class="hero-center is-mobile"`
- 是否含媒體掛載：否
- 是否含文字層：是
- 原樣摘錄到哪一層為止：行動端的控制觸發點文字元素。

### [7] `div.hero-slider_wrap`
- 父層：`section#home-hero.hero-slider`
- 同層前後鄰接：前接 `div.hero-center.is-mobile`
- 直接子層：`div.hero-slider_list`
- 關鍵屬性：`nav-light=""`, `class="hero-slider_wrap"`
- 是否含媒體掛載：深層含有
- 是否含文字層：深層含有
- 原樣摘錄到哪一層為止：slide 陣列母容器。

### [8] `div.hero-slider_list`
- 父層：`div.hero-slider_wrap`
- 同層前後鄰接：無
- 直接子層：3 個 `div.hero-slider_item`
- 關鍵屬性：`class="hero-slider_list"`
- 是否含媒體掛載：深層含有
- 是否含文字層：深層含有
- 原樣摘錄到哪一層為止：全部 slide 項目的直接父容器。

### [9] `div.hero-slider_item` (共 3 個重複節點)
- 父層：`div.hero-slider_list`
- 同層前後鄰接：彼此前後相鄰排列，三組
- 直接子層：每個內含 2 個子層：`div.hero-slide_visual.u-cover-absolute`（視覺媒體層）與 `div.site-info`（文字 CTA 層）
- 關鍵屬性：
  - `class="hero-slider_item"`
  - 第 1 個：`style="display: flex;"`
  - 第 2、3 個：`style="display: none;"`
- 是否含媒體掛載：是
- 是否含文字層：是
- 原樣摘錄到哪一層為止：往下再進一層。

### [10] `div.hero-slide_visual.u-cover-absolute` (每個 slide 的媒體層)
- 父層：`div.hero-slider_item`
- 同層前後鄰接：後接 `div.site-info`
- 直接子層：`div.g_visual_background`、`<img class="hero-visual_el u-cover-absolute">`、`div.hero-visual_el-vid.u-cover-absolute`、`div.slide-overlay`、`h2.hero-slider_num.is-mobile`（行動端序號）
- 關鍵屬性：`class="hero-slide_visual u-cover-absolute"`
- 是否含媒體掛載：是，圖片：`<img class="hero-visual_el u-cover-absolute" loading="auto" data-placeholder="image">`，影片容器：`div.hero-visual_el-vid.u-cover-absolute`
- 是否含文字層：是，`<h2 italics="" class="hero-slider_num is-mobile">0N</h2>`
- 原樣摘錄到哪一層為止：到各媒體掛載節點與疊加層為止。

### [11] `div.site-info` (每個 slide 的文字 CTA 層)
- 父層：`div.hero-slider_item`
- 同層前後鄰接：前接 `div.hero-slide_visual`
- 直接子層：`div.hero-intro_copy`
- 關鍵屬性：`split=""`, `class="site-info"`
- 是否含媒體掛載：否
- 是否含文字層：是，包含 `<a>` 連結 (CTA) 與 `<h2 class="hero-title">` 標題文字
- 原樣摘錄到哪一層為止：到 `hero-intro_copy` 的內部 `<a>` CTA 與 `<h2>` 為止。

## 3. 重複 slide 統計
- 是否存在重複 slide 群組：是，兩組不同維度的重複節點。
  - **nav 縮圖層重複**：`div.hero-slider_nav-item` 共 3 個，對應 01 / 02 / 03
  - **主 slide 內容層重複**：`div.hero-slider_item` 共 3 個，對應 01 / 02 / 03
- 數量：兩個維度各 3 個，合計 6 組重複結構
- 每個共同 class / 屬性：
  - nav 縮圖：`class="hero-slider_nav-item"`，內含 `solo-img_hov=""` 與 `solo-img=""`
  - slide 本體：`class="hero-slider_item"`，可見性由 `style="display: flex/none;"` 控制
  - 兩組共同具備：第一個為 active / visible，後兩個初始隱藏
- 是否存在非 slide 子層：
  是。`div.hero-center.is-desktop` 與 `div.hero-center.is-mobile` 皆為非 slide 的獨立控制層。

## 4. 最終對帳
- `section#home-hero.hero-slider` 內共有幾個不可再合併的子段：
  7 個骨架上的「不可再合併父容器」（`hero-center.is-desktop`、`hero-center.is-mobile`、`hero-slider_wrap`、`hero-slider_list`，以及兩系列各 3 組的重複節點），各自承擔獨立的 DOM 責任，無一可偷為合一。
- 哪些 selector / 屬性 之後完整復刻時必須原樣保留：
  - 最外層的 `full-slider=""` 與 `nav-light=""` 雙自定義屬性（影響全域選單顏色反轉）
  - 內層 `div.hero-slider_wrap` 的第二個 `nav-light=""` 屬性
  - 所有 `solo-img_hov=""` 與 `solo-img=""` 掛鉤屬性（外部腳本的 hover 圖換機制）
  - 初始 active 狀態的 `div.hero-slider_nav-item.active`
  - slide 本體的 `display: flex/none` inline style 初始狀態
  - 媒體合體的 `<img class="hero-visual_el u-cover-absolute">` 與影片佔位 `div.hero-visual_el-vid.u-cover-absolute`
  - `split=""` 屬性在 `div.site-info` 上的出現
- 哪些層先前被抽象名抹平：
  先前被稱為「2. Full-bleed Media Block」底下的「Media viewport」與「Text overlay layer」完全融合了 3+3 共 6 組真實的重複 DOM 節點組，並消抹了控制列（`div.hero-center`）、導航縮圖陣列（`hero-slider_nav-list`）、視覺層與 video 佔位層（`hero-visual_el-vid`）、以及觸控禁止樣式（外層 `touch-action / user-select` inline)  等多達 10 種以上的精確屬性對應點。
