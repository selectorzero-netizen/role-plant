# easter-egg-ledger

## 1. 外層容器
- 原始 selector：`div#shopify-section-easter.easter-egg`
- 直接子層順序：1. `div.easter-bg` (全域遮罩背板)、 2. `div.easter-outer` (實體彈出框體)
- 外層屬性：`id="shopify-section-easter"`, `class="easter-egg"`

## 2. 子段逐條帳

### [1] `div.easter-bg`
- 父層：`div#shopify-section-easter`
- 同層前後鄰接：後方緊接著 `div.easter-outer`
- 直接子層：無
- 關鍵屬性：`data-cursor="close"`, `class="easter-bg"`
- 原樣摘錄到哪一層為止：用以綁定全畫布關閉事件、並渲染半透明背景的全域遮罩層。

### [2] `div.easter-outer`
- 父層：`div#shopify-section-easter`
- 同層前後鄰接：前方緊接著 `div.easter-bg`
- 直接子層：`div.easter-contain`
- 關鍵屬性：`class="easter-outer"`
- 原樣摘錄到哪一層為止：負責作為彈窗內容本體最外層防護框。

### [3] `div.easter-contain`
- 父層：`div.easter-outer`
- 同層前後鄰接：無同層節點
- 直接子層：`div.easter-layout.u-grid-desktop`
- 關鍵屬性：`class="easter-contain"`
- 原樣摘錄到哪一層為止：作為排版內縮與四周安全邊界 (padding / margin limits) 限制點。

### [4] `div.easter-layout.u-grid-desktop`
- 父層：`div.easter-contain`
- 同層前後鄰接：無同層節點
- 直接子層：平行並列的兩個 `div.easter-col.u-column-6`
- 關鍵屬性：`class="easter-layout u-grid-desktop"`
- 原樣摘錄到哪一層為止：為內部宣示桌面端網格排版系統與佈局型態的母網格。

### [5] 第一個 `div.easter-col` (字元與裝飾圖標區塊)
- 父層：`div.easter-layout.u-grid-desktop`
- 同層前後鄰接：後方銜接同一階層的第二個映像展示區 `div.easter-col`
- 直接子層：依序包含裝飾物件 `div.easter-icon_el` 與文字組件 `div.easter-text_wrap`
- 關鍵屬性：`class="easter-col u-column-6"`
- 原樣摘錄到哪一層為止：佔據網欄 50% (`.u-column-6`) 比例宣告。

### [6] `div.easter-icon_el`
- 父層：第一欄 `div.easter-col`
- 同層前後鄰接：後方緊接 `div.easter-text_wrap`
- 直接子層：無實體內容，主要倚靠 CSS 樣式渲染符號。
- 關鍵屬性：`class="easter-icon_el"`
- 原樣摘錄到哪一層為止：純裝飾識別容器。

### [7] `div.easter-text_wrap`
- 父層：第一欄 `div.easter-col`
- 同層前後鄰接：前方緊接 `div.easter-icon_el`
- 直接子層：文字區塊 `div.body-upper.p-contents` 及內嵌的 `<p>` 標籤連帶 `<br>` 斷行符號
- 關鍵屬性：`class="easter-text_wrap"`
- 原樣摘錄到哪一層為止：承載並綁定文案字體樣式 (`body-upper`) 的末端掛載點。

### [8] 第二個 `div.easter-col` (映像展示區塊)
- 父層：`div.easter-layout.u-grid-desktop`
- 同層前後鄰接：前方緊接第一個文字與裝飾區塊
- 直接子層：單一相片封裝層 `div.easter-img_wrap`
- 關鍵屬性：`class="easter-col u-column-6"`
- 原樣摘錄到哪一層為止：佔據另一 50% 網欄空間。

### [9] `div.easter-img_wrap`
- 父層：第二欄 `div.easter-col`
- 同層前後鄰接：無同層節點
- 直接子層：單一張相片 `<img class="img-fill" loading="auto" data-placeholder="image">`
- 關鍵屬性：`class="easter-img_wrap"`
- 原樣摘錄到哪一層為止：限制照片填滿邏輯 (`img-fill`) 並防止溢出的防護封裝層。

## 3. 圖片/重複節點統計
- 是否存在重複節點：是，做為網欄切分的子單元階層存在重複。
- 數量：兩組
- 每個共同 class / 屬性：`class="easter-col u-column-6"`
- 是否存在非圖片子層：是，因為網欄一 (左半部) 為全文本容器 `easter-text_wrap` 與字標 `easter-icon_el`。僅網欄二 (右半部) 套掛了圖像容器 `easter-img_wrap` 與 `<img>`。

## 4. 最終對帳
- `div#shopify-section-easter.easter-egg` 內共有幾個不可再合併的子段：
  以 DOM 從外至內追蹤，至少存在 9層 難分難捨的組建包裝，涵蓋了 4道 外部控制 (`#shopify-section-easter` > `.easter-outer` > `.easter-contain` > `.easter-layout`) 以及各自精確分工的 5層 子元件與內層容器，沒有一階是冗餘能被縮減的。
- 哪些 selector 之後完整復刻時必須原樣保留：
  - 代表獨立 Shopify 模組入口的 `#shopify-section-easter`。
  - `.easter-bg` 上面負責觸發自訂鼠標關閉動畫的事件掛鉤 `data-cursor="close"`。
  - Webflow 網格化標註 `.u-grid-desktop` 與切分半體的 `.u-column-6`。
  - 佔位掛載與自適應圖片所需之 `<img data-placeholder="image">` 連同 `.img-fill`。
- 哪些層先前被錯誤合併進抽象 overlay：
  先前將它丟入「7. Fixed Absolute Layers」統一稱為「固定定位互動彈窗」時，完全漠視了它同樣在內部擁有整套嚴謹的 Layout 網格分斷系統 (`.u-grid-desktop` 和雙子攔切割)。它的結構不比正常頁面簡單，不可被當成普通一層透明 DIV 無腦帶過。
