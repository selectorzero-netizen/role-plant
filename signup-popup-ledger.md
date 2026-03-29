# signup-popup-ledger

## 1. 外層容器
- 原始 selector：`div#shopify-section-signup-popup.signup-popup`
- 直接子層順序：1. `div.signup-bg`（背景遮罩）、 2. `div.signup-box.u-grid-desktop`（主對話框本體）
- 外層屬性：`id="shopify-section-signup-popup"`, `class="signup-popup"`
- 是否位於 `.page_wrap` 之外：是（代表它位於 PJAX 轉場重新渲染區域之外，生命週期為全域唯一）。

## 2. 子段逐條帳

### [1] `div.signup-bg`
- 父層：`div#shopify-section-signup-popup.signup-popup`
- 同層前後鄰接：後方相接對話框本體 `div.signup-box`
- 直接子層：無
- 關鍵屬性：`data-cursor="close"`, `class="signup-bg"`
- 是否含表單掛載：否
- 原樣摘錄到哪一層為止：單純為滿版覆蓋遮罩層。

### [2] `div.signup-box.u-grid-desktop`
- 父層：`div#shopify-section-signup-popup.signup-popup`
- 同層前後鄰接：前方為 `div.signup-bg`
- 直接子層：水平並列左右兩個欄位 `div.signup-col`
- 關鍵屬性：`class="signup-box u-grid-desktop"`
- 是否含表單掛載：包裹於其右側欄位深層。
- 原樣摘錄到哪一層為止：用以宣告桌面端雙欄網格佈局的實體畫布。

### [3] `div.signup-col` (第一欄 / 圖像區塊)
- 父層：`div.signup-box.u-grid-desktop`
- 同層前後鄰接：後方緊接第二欄 `div.signup-col.m-stretch`
- 直接子層：`div.signup-img_wrap`
- 關鍵屬性：`class="signup-col u-column-6"`
- 是否含表單掛載：否
- 原樣摘錄到哪一層為止：一半寬度佔比的包裝層。

### [4] `div.signup-img_wrap`
- 父層：`div.signup-col` (第一欄)
- 同層前後鄰接：無同層節點
- 直接子層：單純的一張 `<img class="img-fill">`
- 關鍵屬性：`class="signup-img_wrap"`
- 是否含表單掛載：否
- 原樣摘錄到哪一層為止：實際影像定位容器。

### [5] `div.signup-col` (第二欄 / 內容區塊)
- 父層：`div.signup-box.u-grid-desktop`
- 同層前後鄰接：前方為第一欄圖像區塊
- 直接子層：`div.signup-content`
- 關鍵屬性：`class="signup-col u-column-6 m-stretch"`
- 是否含表單掛載：包裹於深層。
- 原樣摘錄到哪一層為止：右半邊填滿寬度之容器宣告標點。

### [6] `div.signup-content`
- 父層：`div.signup-col` (第二欄)
- 同層前後鄰接：無
- 直接子層：切分為垂直上、下兩塊，即 `div.signup-top` 與 `div.signup-bot`
- 關鍵屬性：`class="signup-content"`
- 是否含表單掛載：往下層延伸。
- 原樣摘錄到哪一層為止：負責處理這半邊上下佈局流的限制框。

### [7] `div.signup-top`
- 父層：`div.signup-content`
- 同層前後鄰接：後方接表單區塊 `div.signup-bot`
- 直接子層：併排標題區 `div.signup-head` 與關閉鈕區 `div.signup-close`
- 關鍵屬性：`class="signup-top"`
- 是否含表單掛載：否
- 原樣摘錄到哪一層為止：橫向標題頭部區塊。

### [8] `div.signup-head`
- 父層：`div.signup-top`
- 同層前後鄰接：後方接 `div.signup-close`
- 直接子層：存放文字的 `div.body-upper.p-contents`
- 關鍵屬性：`class="signup-head"`
- 是否含表單掛載：否
- 原樣摘錄到哪一層為止：為彈窗標題的外層標籤。

### [9] `div.signup-close`
- 父層：`div.signup-top`
- 同層前後鄰接：前方接標題 `div.signup-head`
- 直接子層：帶有叉叉圖案的 `<img class="close-svg">`
- 關鍵屬性：`class="signup-close"`
- 是否含表單掛載：否
- 原樣摘錄到哪一層為止：實體關閉鈕點擊熱區。

### [10] `div.signup-bot`
- 父層：`div.signup-content`
- 同層前後鄰接：前方為標題列 `div.signup-top`
- 直接子層：單一 `div.split-col.u-column-3.is-form`
- 關鍵屬性：`class="signup-bot"`
- 是否含表單掛載：是。
- 原樣摘錄到哪一層為止：負責限制 Klaviyo 表單的排版下半框。

### [11] `div.split-col.u-column-3.is-form`
- 父層：`div.signup-bot`
- 同層前後鄰接：無
- 直接子層：表單掛載點 `div.klaviyo-form-SCSKtr.klaviyo-form...`
- 關鍵屬性：`class="split-col u-column-3 is-form"`
- 是否含表單掛載：是，這是 Klaviyo 第三方掛起腳本直連的第一外殼。
- 原樣摘錄到哪一層為止：最末端的 Webflow 網格寬度控制器。

## 3. 表單掛載對帳
- klaviyo 掛載點 selector：`div.klaviyo-form-SCSKtr.klaviyo-form.form-version-cid-2`
- 外層包裹鏈：`signup-col` -> `signup-content` -> `signup-bot` -> `split-col(is-form)` -> `klaviyo-form-SCSKtr` -> 內層滿版 `div.needsclick.kl-private-reset-css-*`
- `form` 是否存在：實體存在且極重度複雜。
  - `<form aria-live="polite" data-testid="klaviyo-form-SCSKtr" novalidate="" class="needsclick klaviyo-form ...">`
- 最深列帳到哪一層：
  深入至此節點為止 `div[data-testid="form-row"]` 及其內層含有的 `div[component="[object Object]"][data-testid="form-component"]`，因為之後即進入無數 Klaviyo inject 的 `needsclick` 動態樣式欄位堆疊。這代表此處資料與表單為第三方動態打入，非 Webflow 原生靜態寫死節點。

## 4. 最終對帳
- 這個 popup 內共有幾個不可再合併的子段：
  以外部 DOM 到表單邊界計算，共有 11 階緊密嵌套的骨架層完全不能減併（從 `signup-popup` 歷經雙欄 `signup-box`、下潛到 `signup-bot` 的 `split-col(is-form)` 網格控制）。
- 哪些 selector 之後完整復刻時必須原樣保留：
  - 代表它位於 PJAX 轉場安全區外的頂層身份：`#shopify-section-signup-popup`。
  - `data-cursor="close"` 關閉事件綁定與遮罩 `signup-bg`。
  - 所有帶有 `signup-*`、`u-grid-desktop`、`u-column-*` 等雙欄及左右劃分版面層級的 Webflow 排版 class。
  - 掛載點容器 `klaviyo-form-SCSKtr` 及其特定 `data-testid` 和連動的 `needsclick` 特徵類名。
- 哪些層先前被錯誤合併進抽象 overlay：
  前一版的「7. Fixed Absolute Layers」在未經盤點生命週期的情況下，強硬地將它這長達 11 階深、包裝著強耦合版面與 Klaviyo 掛載特徵的 `#shopify-section-signup-popup` 與其他普通全域容器混為一談，忽視了它是游離於 `.page_wrap` 外獨立於 SPA 的重型外層彈窗。
