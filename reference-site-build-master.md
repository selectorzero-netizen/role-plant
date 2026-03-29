# reference-site-build-master

> 整併來源：reference-site-parity-audit.md、site-shell-map.md、component-boundaries.md、skeleton-build-plan.md、dark-section-wrap-ledger.md（至 Round 16A）、home-slider-large-ledger.md（Round 16B）、nav-component-ledger.md、preloader-wrap-ledger.md、cursor-ledger.md、signup-popup-ledger.md、easter-egg-ledger.md、page-code-wrap-ledger.md、home-hero-ledger.md、community-section-ledger.md、footer-light-ledger.md

---

## 1. 最終 top-level 順序

| 序號 | 原始 selector | 類型 | 已有精準 ledger |
|--|--|--|--|
| 1 | `div.page_code_wrap` | global layer | ✅ page-code-wrap-ledger.md |
| 2 | `div.preloader_wrap` | global layer (overlay) | ✅ preloader-wrap-ledger.md |
| 3 | `div.nav-component` | commerce layer + overlay | ✅ nav-component-ledger.md |
| 4 | `section#home-hero.hero-slider` | static section (含 image 佔位) | ✅ home-hero-ledger.md |
| 5 | `div[nav-dark=""].dark-section_wrap` | dynamic section (commerce) — 外層 | ✅ dark-section-wrap-ledger.md |
| 5a | ↳ `div#shopify-section-intro-section` | static section (内層) | ✅ dark-section-wrap-ledger.md |
| 5b | ↳ `div.product-draggable_wrap.is-home` | dynamic section + commerce | ✅ dark-section-wrap-ledger.md |
| 5c | ↳ `div.products-all_wrap` | static section (CTA 連結) | ✅ dark-section-wrap-ledger.md |
| 5d | ↳ `div#shopify-section-home-image-section` | static section (3欄 CTA) | ✅ dark-section-wrap-ledger.md |
| 5e | ↳ `div#shopify-section-or-text-section` | static section (置中文字) | ✅ dark-section-wrap-ledger.md |
| 6 | `section#shopify-section-home-slider.hero-slider.is-large` | static section (純圖滑軌) | ✅ home-slider-large-ledger.md |
| 7 | `section#shopify-section-community-section.community-section` | static section | ✅ community-section-ledger.md |
| 8 | `footer#shopify-section-footer-light.footer.u-theme-light` | static section + form mount | ✅ footer-light-ledger.md |
| 9 | `div#shopify-section-easter.easter-egg` | popup (page_wrap 内) | ✅ easter-egg-ledger.md |
| 10 | `div.cursor` | global layer (overlay) | ✅ cursor-ledger.md |
| 11 | `div#shopify-section-signup-popup.signup-popup` | popup (page_wrap 外) | ✅ signup-popup-ledger.md |

---

## 2. 各段施工判定

### `div.page_code_wrap`
- 類型：global layer
- 目前依據文件：page-code-wrap-ledger.md
- 必須原樣保留：`class="page_code_wrap"`、`class="page_code_base w-embed"`、`class="page_code_custom w-embed"`
- 可否先做靜態 staging：可以，作為空殼容器先建立即可
- 若不可，原因：N/A
- 目前狀態：精準 ledger

### `div.preloader_wrap`
- 類型：global layer (overlay)
- 目前依據文件：preloader-wrap-ledger.md
- 必須原樣保留：`class="preloader_wrap"`, `class="preloader-inner"`, `class="preloader_logo-contain"`, `class="preloader-inner_bg"`, `class="preloader_img-contain"`, 8 張 `img.preloader-img[data-placeholder="image"]`
- 可否先做靜態 staging：可以，建立空殼容器與 8 個 img 佔位即可
- 若不可，原因：N/A
- 目前狀態：精準 ledger

### `div.nav-component`
- 類型：commerce layer + overlay
- 目前依據文件：nav-component-ledger.md（含 Round 6A 補帳）
- 必須原樣保留：
  - `div[img-hover_wrap=""][data-nav="closed"]`
  - `div[data-menu-toggle=""]`（overlay 關閉觸發）
  - `nav.menu` 全部網格層（`menu-layout u-grid-desktop`、`.u-column-5`、`.u-column-1` 等）
  - `nav.orgc-nav` 及其雙欄網格
  - 購物車七層套娃及自定義屬性：`data-wf-cart-type="rightSidebar"`, `data-wf-cart-query=""`, `data-node-type="commerce-cart-wrapper"`, `data-wf-collection="database.commerceOrder.userItems"`, `data-lenis-prevent=""`
  - `img-hover_triggers-wrap=""`, `img-hover_trigger=""`
  - `target-imgs_hidden=""` 在 nav 內的隱藏圖庫容器
- 可否先做靜態 staging：可以（nav bar 骨架及全螢幕選單骨架），但購物車子鏈不可
- 若不可，原因：commerce layer 邊界 — 購物車 DOM 強耦合 API，須留空或僅作為靜態殼隔離
- 目前狀態：精準 ledger

### `section#home-hero.hero-slider`
- 類型：static section（含 image placeholder）
- 目前依據文件：home-hero-ledger.md
- 必須原樣保留：
  - `full-slider=""`, `nav-light=""`（出現兩次）
  - `style="touch-action: pan-y; ..."`
  - `solo-img_hov=""`, `solo-img=""`
  - `div.hero-slider_nav-item.active`
  - `style="display: flex/none;"`
  - `split=""`
  - `div.hero-visual_el-vid.u-cover-absolute`
- 可否先做靜態 staging：可以
- 若不可，原因：N/A
- 目前狀態：精準 ledger

### `div[nav-dark=""].dark-section_wrap`（含內部所有靜態子段）
- 類型：dynamic section (commerce) — 外部容器 + 靜態子段群
- 目前依據文件：dark-section-wrap-ledger.md
- 必須原樣保留：
  - 外層：`nav-dark=""`, `class="dark-section_wrap"`, `class="page-contain u-container"`
  - Intro：`id="shopify-section-intro-section"`, `split-grid m-vflex`
  - CTA (View All)：`class="products-all_wrap"`, `data-text="View all products"`
  - CTA (3 欄圖塊)：`id="shopify-section-home-image-section"`, `overlay="trigger"`, `overlay="el"`, `cta-cursor_wrap=""`, `cta-cursor_el=""`
  - Text段：`id="shopify-section-or-text-section"`, `div.logo-icon_wrap`, `is-hidden`
- 可否先做靜態 staging：可以
- 若不可，原因：N/A
- 目前狀態：精準 ledger

### `div.product-draggable_wrap.is-home`（dark-section_wrap 內的動態清單軌道）
- 類型：dynamic section + commerce
- 目前依據文件：dark-section-wrap-ledger.md
- 必須原樣保留：
  - `product-slider=""`, `class="product-draggable_el"`
  - Webflow CMS 群：`udy-collection="product"`, `w-dyn-list`, `w-dyn-items`, `w-dyn-item`, `data-commerce-type="variation-image"`
- 可否先做靜態 staging：可以做外殼軌道佔位，內部實體清單不可
- 若不可，原因：dynamic resource 邊界 — 強耦合 CMS 集合與 commerce 圖片資料
- 目前狀態：精準 ledger

### `section#shopify-section-home-slider.hero-slider.is-large`
- 類型：static section（純圖全寬滑軌）
- 目前依據文件：home-slider-large-ledger.md
- 必須原樣保留：
  - `id="shopify-section-home-slider"`, `class="hero-slider is-large"`
  - `full-slider=""`, `nav-light=""`（出現兩次）
  - `style="touch-action: pan-y; ..."`
  - `data-cursor="Prev"`, `data-cursor="Next"`（在空殼按鈕上）
  - 7個滑動項的 `style="display: flex/none;"`
  - `<span class="slide-current">`
- 可否先做靜態 staging：可以
- 若不可，原因：N/A
- 目前狀態：精準 ledger

### `section#shopify-section-community-section.community-section`
- 類型：static section
- 目前依據文件：community-section-ledger.md
- 必須原樣保留：
  - `id="shopify-section-community-section"`, `nav-dark=""`（兩次）
  - `solo-img=""`, `solo-trig=""`
  - `data-scroll-overlap=""` (在前 4 個 item）
  - `div.community-h_line` 的無 `is-hidden` (第 1 條) 與有 `is-hidden` (後續)
  - `div.is-mobile` 與 `div.community-col.is-hidden`
- 可否先做靜態 staging：可以
- 若不可，原因：N/A
- 目前狀態：精準 ledger

### `footer#shopify-section-footer-light.footer.u-theme-light`
- 類型：static section + form mount
- 目前依據文件：footer-light-ledger.md
- 必須原樣保留：
  - `id="shopify-section-footer-light"`, `img-hover_wrap=""`
  - `easter-trigger=""`
  - `img-hover_triggers-wrap=""`, `img-hover_trigger=""`, `text-btn=""`, `text-btn-icon=""`
  - `target-img_wrap=""`, `target-imgs_hidden=""`
  - Klaviyo 空殼：`klaviyo-form-SCSKtr`, `form-version-cid-1`
- 可否先做靜態 staging：可以
- 若不可，原因：表單內容需第三方 SDK 載入
- 目前狀態：精準 ledger

### `div#shopify-section-easter.easter-egg`
- 類型：popup
- 目前依據文件：easter-egg-ledger.md
- 必須原樣保留：`data-cursor="close"` 等
- 可否先做靜態 staging：可以（空殼）
- 目前狀態：精準 ledger

### `div.cursor`
- 類型：global layer (overlay)
- 目前依據文件：cursor-ledger.md
- 必須原樣保留：`class="cursor"`, `class="orgc-detail"`, `class="cursor-text"`
- 可否先做靜態 staging：可以（空殼）
- 目前狀態：精準 ledger

### `div#shopify-section-signup-popup.signup-popup`
- 類型：popup (page_wrap 外)
- 目前依據文件：signup-popup-ledger.md
- 必須原樣保留：`data-cursor="close"`, Klaviyo 掛鉤等
- 可否先做靜態 staging：可以（空殼，放於 page_wrap 外）
- 若不可，原因：若包含在 PJAX `page_wrap` 內將影響生命週期
- 目前狀態：精準 ledger

---

## 3. staging 可先做的範圍

- **可先做靜態 staging（第一波可完整建構 DOM 防護罩的段落）**：
  - `div.page_code_wrap`（空殼）
  - `div.preloader_wrap`（含 8 個圖層佔位）
  - `div.nav-component` 頂端與滿版選單網格
  - `section#home-hero.hero-slider`（3 個投影片骨架與標籤）
  - `div.dark-section_wrap` 容器本體，及內部靜態區：`#shopify-section-intro-section`、`products-all_wrap`、`#shopify-section-home-image-section`、`#shopify-section-or-text-section`
  - `div.product-draggable_wrap.is-home` 拖曳軌道外層空殼
  - `section#shopify-section-home-slider.hero-slider.is-large`（7 個純圖滑軌骨架與 Prev/Next 按鈕）
  - `section#shopify-section-community-section.community-section`（4 + 1 列表項骨架）
  - `footer#shopify-section-footer-light.footer.u-theme-light`（骨架與表單外部掛載點）
  - 兩個 popup 空殼：`easter-egg` 與 `signup-popup`
  - `<div class="cursor">`（空殼）

- **需延後接真資料 / dynamic list**：
  - `div.product-draggable_el` 內的完整集合：`w-dyn-list`, `w-dyn-items`, `w-dyn-item` 結構。在靜態階段可先寫死 1 個 mockup DOM，但必須等待與 CMS/Backend 資料流進行真正的資料回填綁定。

- **需延後接 commerce / popup / global lifecycle**：
  - `nav-component` 內的右側購物車區塊（`w-commerce-*` 子鏈），需要等 commerce 邏輯就位才能掛載事件與對應 API。
  - 兩個 Klaviyo 表單實體區塊（Footer `form-version-cid-1` 及 Signup Popup `form-version-cid-2`），需等第三方 SDK 驅動發佈。
  - 游標元素 (`.cursor`) 與過場彈窗 (`.easter-egg`, `.signup-popup`) 的開關邏輯，需等全域腳本啟動時方會綁上事件。

---

## 4. 目前仍待補的缺口

- 所有先前全站遺漏及斷層缺口（`home-slider` 大型純圖幻燈片、`dark-section_wrap` 尾段三區塊等）均已於 Round 16A、16B 全數補齊至獨立 ledger。
- **唯一待確認欄位**：`nav-component-ledger.md` 購物車內部的 `data-wf-template-id` 實際字串值將在回填真實 DOM 時從 HTML 中 1:1 照搬。

---

## 5. 整併結論

- **現在是否已足夠進入 staging 首頁施工**：是。所有的頂層容器與主要自定義屬性防護圈已完全揭開，沒有任何藍圖抽象或結構斷片。可以保證目前建構出的骨架能無縫與舊版的腳本與樣式咬合。
- **第一波 staging 應該先做哪些段**：
  建構時，請嚴格按照 `reference-site-build-master.md` 表格第一點「標記為【可先做靜態 staging】」的 11 個頂層元素序列進行逐一掛載。確保將原始檔案中的所有 `class`、`id`、`data-*`，無論懂或不懂，全部以 1:1 的方式轉移（包含空的預留標籤）。
- **哪些段仍必須延後**：
  1. CMS 滑軌商品層（product-card）實際列表替換
  2. Footer / Popup 的表單內部邏輯
  3. Navbar 右側長達 7 層深的 Commerce 購物車操作面板DOM。 
  這些將作為骨架搭完後的「邏輯接合（Phase 2/3）」進行後續處理。
