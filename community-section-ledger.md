# community-section-ledger

## 1. 外層容器
- 原始 selector：`section#shopify-section-community-section.community-section`
- 外層屬性：
  - `id="shopify-section-community-section"`
  - `class="community-section"`
  - `nav-dark=""`
- 直接子層順序：唯一直接子層為 `div.community-contain.u-container`

## 2. 子段逐條帳

### [1] `div.community-contain.u-container`
- 父層：`section#shopify-section-community-section`
- 同層前後鄰接：無同層鄰居（為唯一子節點）
- 直接子層：依序為 `div.section-intro_wrap`、空的 `div.split-grid.u-grid-desktop`、`div.split-grid.u-grid-desktop.is-giving`、`div.community-items_section`
- 關鍵屬性：`nav-dark=""`, `class="community-contain u-container"`
- 是否含圖片掛載：深層含有
- 是否含文字層：深層含有
- 是否含連結 / CTA：深層含有
- 是否為空容器：否
- 原樣摘錄到哪一層為止：往下分四段子層逐條列帳。

### [2] `div.section-intro_wrap`
- 父層：`div.community-contain.u-container`
- 同層前後鄰接：後接空的 `div.split-grid.u-grid-desktop`
- 直接子層：`div.split-grid.u-grid-desktop`
- 關鍵屬性：`class="section-intro_wrap"`
- 是否含圖片掛載：否
- 是否含文字層：否（其內部的 `div.split-col.u-column-6` 為空節點）
- 是否含連結 / CTA：否
- 是否為空容器：功能上為空（子孫節點全是空殼）
- 原樣摘錄到哪一層為止：往下拆解。

### [3] `div.split-grid.u-grid-desktop` (第一個，位於 `section-intro_wrap` 內)
- 父層：`div.section-intro_wrap`
- 同層前後鄰接：無
- 直接子層：`div.split-col.u-column-6`（空容器）
- 關鍵屬性：`class="split-grid u-grid-desktop"`
- 是否含圖片掛載：否
- 是否含文字層：否
- 是否含連結 / CTA：否
- 是否為空容器：是，`div.split-col.u-column-6` 內無任何子節點
- 原樣摘錄到哪一層為止：此為完整的空殼佔位網格。

### [4] `div.split-grid.u-grid-desktop` (第二個，直接子層的空容器)
- 父層：`div.community-contain.u-container`
- 同層前後鄰接：前接 `div.section-intro_wrap`，後接 `div.split-grid.u-grid-desktop.is-giving`
- 直接子層：無任何子節點
- 關鍵屬性：`class="split-grid u-grid-desktop"`
- 是否含圖片掛載：否
- 是否含文字層：否
- 是否含連結 / CTA：否
- 是否為空容器：是，完全空白的網格佔位容器
- 原樣摘錄到哪一層為止：此為頂層的完整空殼網格。

### [5] `div.split-grid.u-grid-desktop.is-giving`
- 父層：`div.community-contain.u-container`
- 同層前後鄰接：前接空的 `div.split-grid.u-grid-desktop`，後接 `div.community-items_section`
- 直接子層：左欄 `div.split-col.u-column-6`（含圖片） 與 右欄 `div.split-col.u-column-5`（含文字與 heading）
- 關鍵屬性：`class="split-grid u-grid-desktop is-giving"`
- 是否含圖片掛載：是
- 是否含文字層：是
- 是否含連結 / CTA：否
- 是否為空容器：否
- 原樣摘錄到哪一層為止：往下各欄列帳。

### [6] `div.split-col.u-column-6` (is-giving 的左欄)
- 父層：`div.split-grid.u-grid-desktop.is-giving`
- 同層前後鄰接：後接右欄 `div.split-col.u-column-5`
- 直接子層：`div.small-img_wrap`
- 關鍵屬性：`class="split-col u-column-6"`
- 是否含圖片掛載：是
- 是否含文字層：否
- 是否含連結 / CTA：否
- 是否為空容器：否
- 原樣摘錄到哪一層為止：至 `div.small-img_wrap` 為止。

### [7] `div.small-img_wrap`
- 父層：左欄 `div.split-col.u-column-6`
- 同層前後鄰接：無
- 直接子層：`<img loading="auto" alt="" class="img-fill" data-placeholder="image">`
- 關鍵屬性：`solo-img=""`, `class="small-img_wrap"`
- 是否含圖片掛載：是，`<img class="img-fill" data-placeholder="image">`
- 是否含文字層：否
- 是否含連結 / CTA：否
- 是否為空容器：否
- 原樣摘錄到哪一層為止：至 img 掛載點為止。

### [8] `div.split-col.u-column-5` (is-giving 的右欄)
- 父層：`div.split-grid.u-grid-desktop.is-giving`
- 同層前後鄰接：前接左欄 `div.split-col.u-column-6`
- 直接子層：`div.community-col`、`div.community-head`
- 關鍵屬性：`class="split-col u-column-5"`
- 是否含圖片掛載：否
- 是否含文字層：是
- 是否含連結 / CTA：否
- 是否為空容器：否
- 原樣摘錄到哪一層為止：至各子節點為止。

### [9] `div.community-col`
- 父層：右欄 `div.split-col.u-column-5`
- 同層前後鄰接：後接 `div.community-head`
- 直接子層：`h4.body-upper.p-contents`、`div.u-text-style-small.f-4`
- 關鍵屬性：`solo-trig=""`, `class="community-col"`
- 是否含圖片掛載：否
- 是否含文字層：是
- 是否含連結 / CTA：否
- 是否為空容器：否
- 原樣摘錄到哪一層為止：至文字子節點為止。

### [10] `div.community-head`
- 父層：右欄 `div.split-col.u-column-5`
- 同層前後鄰接：前接 `div.community-col`
- 直接子層：`<p class="u-text-style-h4">`
- 關鍵屬性：`class="community-head"`
- 是否含圖片掛載：否
- 是否含文字層：是
- 是否含連結 / CTA：否
- 是否為空容器：否
- 原樣摘錄到哪一層為止：純文字標題容器。

### [11] `div.community-items_section`
- 父層：`div.community-contain.u-container`
- 同層前後鄰接：前接 `div.split-grid.u-grid-desktop.is-giving`
- 直接子層：5 個重複的 `div.community-item`（其中第 5 個為空殼）
- 關鍵屬性：`class="community-items_section"`
- 是否含圖片掛載：深層含有
- 是否含文字層：深層含有
- 是否含連結 / CTA：深層含有
- 是否為空容器：否
- 原樣摘錄到哪一層為止：往下列帳重複 item 群組。

### [12] `div.community-item` (共 5 個重複節點，第 1–4 個有內容，第 5 個為空殼)
- 父層：`div.community-items_section`
- 同層前後鄰接：彼此前後相鄰排列
- 直接子層：（第 1–4 個）`div.community-h_line`、`div.split-grid.u-grid-desktop`
  （第 5 個）僅含 `div.community-h_line.is-hidden`，無其他節點
- 關鍵屬性：
  - 第 1 個：`data-scroll-overlap=""`, `class="community-item"`
  - 第 2–4 個：`data-scroll-overlap=""`, `class="community-item"`
  - 第 5 個：`class="community-item"`（無 `data-scroll-overlap`）
- 是否含圖片掛載：是（第 1–4 個，在右欄 `div.split-col.u-column-6 > a.community-img-wrap > img.img-contain`）
- 是否含文字層：是（第 1–4 個，在左欄 `div.community-col`）
- 是否含連結 / CTA：是（第 1–4 個，左欄有 `a.orgc-detail.w-inline-block`，右欄有 `a.community-img-wrap.w-inline-block`）
- 是否為空容器：第 5 個為內容空殼
- 原樣摘錄到哪一層為止：往下列帳單個 item 的共同骨架。

### [13] `div.community-h_line` (每個 community-item 的分隔線)
- 父層：`div.community-item`
- 同層前後鄰接：後接 `div.split-grid.u-grid-desktop`
- 直接子層：無
- 關鍵屬性：第 2–5 個額外帶有 `class="community-h_line is-hidden"`
- 是否含圖片掛載：否
- 是否含文字層：否
- 是否含連結 / CTA：否
- 是否為空容器：是（純線條裝飾用空殼）
- 原樣摘錄到哪一層為止：此為末端節點。

### [14] `div.split-grid.u-grid-desktop` (每個 community-item 內，第 1–4 個 item 含有)
- 父層：`div.community-item`
- 同層前後鄰接：前接 `div.community-h_line`
- 直接子層：左欄 `div.split-col.u-column-6`（文字 + CTA）、右欄 `div.split-col.u-column-6`（圖片連結）
- 關鍵屬性：`class="split-grid u-grid-desktop"`
- 是否含圖片掛載：是（右欄）
- 是否含文字層：是（左欄）
- 是否含連結 / CTA：是（左右欄各有）
- 是否為空容器：否
- 原樣摘錄到哪一層為止：往下各欄列帳。

### [15] 左欄 `div.split-col.u-column-6` (每個 community-item 的文字 + CTA 欄)
- 父層：`div.split-grid.u-grid-desktop` (community-item 內)
- 同層前後鄰接：後接右欄 `div.split-col.u-column-6`（圖片欄）
- 直接子層：`div.community-layout.u-grid-column-2`
- 關鍵屬性：`class="split-col u-column-6"`
- 是否含圖片掛載：否
- 是否含文字層：是
- 是否含連結 / CTA：是，`a.orgc-detail.w-inline-block`（桌面端隱藏欄位）
- 是否為空容器：否
- 原樣摘錄到哪一層為止：至 `community-layout` 內的 `community-col` 及 `community-col.is-hidden` 為止。

### [16] 右欄 `div.split-col.u-column-6` (每個 community-item 的圖片連結欄)
- 父層：`div.split-grid.u-grid-desktop` (community-item 內)
- 同層前後鄰接：前接左欄 `div.split-col.u-column-6`
- 直接子層：`a.community-img-wrap.w-inline-block`（帶有 `href`、`target="_blank"`）
- 關鍵屬性：`class="split-col u-column-6"`
- 是否含圖片掛載：是，`<img alt="" class="img-contain" loading="auto" data-placeholder="image">`
- 是否含文字層：是，行動端帶有 `div.is-mobile > div.orgc-detail.body-upper > div.detail-text`
- 是否含連結 / CTA：是，整個欄位被 `<a>` 包裹
- 是否為空容器：否
- 原樣摘錄到哪一層為止：至 img 掛載點與行動端文字層為止。

## 3. 重複 item / block 統計
- 是否存在重複 item / block 群組：是，兩個維度
  - `div.community-item`：共 5 個（第 1–4 個含完整內容，第 5 個為空殼）
  - 每個有內容的 `community-item` 內部的雙欄網格骨架：重複 4 次
- 數量：5 個 `community-item`，其中 4 個含完整雙欄 DOM 結構
- 每個共同 class / 屬性：
  - `data-scroll-overlap=""` 出現於第 1–4 個 `community-item`，第 5 個不含
  - 右欄圖片連結為 `a.community-img-wrap.w-inline-block`
  - 行動端顯示文字容器 `div.is-mobile` 出現於每個右欄內
  - 桌面端 CTA 隱藏欄 `div.community-col.is-hidden` 出現於每個左欄的 `community-layout` 內
- 是否存在非 item 子層：是，`div.section-intro_wrap`、空的 `div.split-grid`（兩個）、`div.split-grid.u-grid-desktop.is-giving` 皆為非重複的頂部獨立佈局層。

## 4. 最終對帳
- `section#shopify-section-community-section.community-section` 內共有幾個不可再合併的子段：
  從頂層算下，共有 16 個已識別的獨立結構層，以「不可再合併」的標準來看最關鍵的有：外層 `community-contain`（含二個 `nav-dark=""` 屬性）、三個 `split-grid` 頂層（含 2 空殼 + 1 is-giving）、`community-items_section` 以及內部 5 組 `community-item` 各自的雙欄網格展開。
- 哪些 selector / 屬性 之後完整復刻時必須原樣保留：
  - 外層 Shopify 模組標識：`id="shopify-section-community-section"` 與 `nav-dark=""`（同時出現在外層 section 與 `community-contain` 兩層）
  - 圖片掛鉤：`solo-img=""` 在 `div.small-img_wrap` 上
  - hover 觸發器：`solo-trig=""` 在 `div.community-col` 上
  - 捲動觸發掛鉤：`data-scroll-overlap=""` 在第 1–4 個 `community-item` 上（第 5 個有意缺漏）
  - 分割線的顯隱狀態差異：第 1 個 `community-h_line` 無 `is-hidden`，第 2–5 個皆有
  - 行動端顯示層的 wrapper `div.is-mobile` 在每個右欄圖片連結內
  - 桌面端隱藏 CTA 欄 `div.community-col.is-hidden` 在每個左欄 `community-layout` 內
- 哪些層先前被抽象名抹平：
  先前的「5. Stacked Split List」將整個 section 的頂部 is-giving 雙欄（有具體的 `solo-img/solo-trig` 掛鉤）、3 個 `split-grid` 頂層容器（其中 2 個為空殼佔位）、以及 `community-items_section` 5 組堆疊 item 的各別的行動端/桌面端欄位顯隱邏輯（`is-hidden`/`is-mobile`），全部被壓縮成「Repeating split-item unit」一個詞而徹底抹平。
