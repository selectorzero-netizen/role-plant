# dark-section-wrap-ledger

## 1. 外層容器
- 原始 selector：`div.dark-section_wrap`
- 直接子層順序：只有 1 個直接子層 `div.page-contain.u-container`
- 外層屬性：`nav-dark=""`, `class="dark-section_wrap"`

## 2. 子段逐條帳

### [1] `div.page-contain.u-container`
- 父層：`div.dark-section_wrap`
- 同層前後鄰接：無同層鄰居（為外層容器的唯一子節點）
- 直接子層：包含 2 個主要段落。第一段是 `div#shopify-section-intro-section.split-grid.u-grid-desktop.m-vflex`，第二段是 `div.product-draggable_wrap.is-home`
- 關鍵屬性：`class="page-contain u-container"`
- 是否含 data binding / dynamic list：否
- 原樣摘錄到哪一層為止：僅作為內縮與版面限制的排版容器，往下一層發展出兩個平行主要板塊。

### [2] `div#shopify-section-intro-section.split-grid.u-grid-desktop.m-vflex`
- 父層：`div.page-contain.u-container`
- 同層前後鄰接：後方鄰接 `div.product-draggable_wrap.is-home`
- 直接子層：包含 2 個 `div.split-col.u-column-6`（左放 logo、右放文字說明）
- 關鍵屬性：`id="shopify-section-intro-section"`, `class="split-grid u-grid-desktop m-vflex"`
- 是否含 data binding / dynamic list：否
- 原樣摘錄到哪一層為止：此區塊為單純的 Shopify 組件，內部由雙網格靜態佈局構成。

### [3] `div.product-draggable_wrap.is-home`
- 父層：`div.page-contain.u-container`
- 同層前後鄰接：前方鄰接 `div#shopify-section-intro-section.split-grid.u-grid-desktop.m-vflex`
- 直接子層：包含標題文字段 `div.or-info` 以及實際滑動軌道 `div.product-draggable_el`
- 關鍵屬性：`class="product-draggable_wrap is-home"`
- 是否含 data binding / dynamic list：其深層節點具有資料綁定
- 原樣摘錄到哪一層為止：此層僅為滑動區塊的靜態外部防護罩，實質的列表在下一層。

### [4] `div.product-draggable_el`
- 父層：`div.product-draggable_wrap.is-home`
- 同層前後鄰接：前方鄰接 `div.or-info`
- 直接子層：`div.product-slider.w-dyn-list`
- 關鍵屬性：`product-slider=""`, `class="product-draggable_el"`
- 是否含 data binding / dynamic list：內部包裹 CMS 資料表清單
- 原樣摘錄到哪一層為止：此為具備滾動或滑鼠拖曳特性 `translate / transform` 的直接作用層，往下一層即為資料列表包裹層。

### [5] `div.product-slider.w-dyn-list`
- 父層：`div.product-draggable_el`
- 同層前後鄰接：無同層節點
- 直接子層：`div.product-slider_list.w-dyn-items`
- 關鍵屬性：`class="product-slider w-dyn-list"`, `udy-collection="product"`
- 是否含 data binding / dynamic list：是，定義為動態清單的根節點，且帶有 `udy-collection="product"` 綁定特徵。
- 原樣摘錄到哪一層為止：此層負責界定 collection 範圍。

### [6] `div.product-slider_list.w-dyn-items`
- 父層：`div.product-slider.w-dyn-list`
- 同層前後鄰接：無同層節點
- 直接子層：多個陣列重複的 `div.product-card.w-dyn-item`
- 關鍵屬性：`role="list"`, `class="product-slider_list w-dyn-items"`
- 是否含 data binding / dynamic list：是，定義為動態清單的項目容器。
- 原樣摘錄到哪一層為止：負責實際排列陣列項目。

### [7] `div.product-card.w-dyn-item`
- 父層：`div.product-slider_list.w-dyn-items`
- 同層前後鄰接：前後被無數個 `w-dyn-item` 鄰接包夾
- 直接子層：`div.product-block`
- 關鍵屬性：`role="listitem"`, `class="product-card w-dyn-item"`
- 是否含 data binding / dynamic list：是，為單一筆 CMS 迴圈實體。且內部圖像元件帶有 `data-commerce-type="variation-image"`。
- 原樣摘錄到哪一層為止：這是 CMS 輸出重複區塊的最小單元（卡片）。

### [8] `div.products-all_wrap`
- 父層：`div.page-contain.u-container`
- 同層前後鄰接：前方緊接 `div.product-draggable_wrap.is-home`，後方緊接 `div#shopify-section-home-image-section`
- 直接子層：單一 `a.orgc-detail.w-inline-block`（連結整塊）
- 關鍵屬性：`class="products-all_wrap"`
- 是否含圖片掛載：否
- 是否含文字層：是，`<a>` 內含 `div[data-text="View all products"].detail-wrap.body-upper` > `div.detail-text`
- 是否含連結 / CTA：是，`href="/collections/all"`, `class="orgc-detail w-inline-block"`
- 是否為空容器：否
- 原樣摘錄到哪一層為止：至 `div.detail-text` 文字節點為止。

### [9] `div#shopify-section-home-image-section.split-grid.u-grid-desktop`
- 父層：`div.page-contain.u-container`
- 同層前後鄰接：前方緊接 `div.products-all_wrap`，後方緊接 `div#shopify-section-or-text-section`
- 直接子層：3 個 `div.split-col`（比例依序為 `u-column-6.is-100`、`u-column-3`、`u-column-3.is-100`）
- 關鍵屬性：`id="shopify-section-home-image-section"`, `class="split-grid u-grid-desktop"`
- 是否含圖片掛載：是，每個 split-col 內各含一個 `<img class="g_visual_img m-absolute" loading="auto" data-placeholder="image">`
- 是否含文字層：是，每個 CTA block 含桌面端標題 `div.body-upper.is-desktop` 與 hover 文字層 `div.cta-hover_el`
- 是否含連結 / CTA：是，每欄的直接子節點為 `a[overlay="trigger"].cta-block.w-inline-block`
- 是否為空容器：否
- 原樣摘錄到哪一層為止：至各欄 CTA block 內部骨架層為止。

**`div#shopify-section-home-image-section` 內 3 個 CTA block 共同骨架：**
- 外殼：`a[overlay="trigger"].cta-block.w-inline-block`（`href` 各異）
- 桌面端標題：`div.body-upper.is-desktop > p`
- 圖片容器：`div[cta-cursor_wrap=""].cta-img_wrap`
  - 圖片：`<img class="g_visual_img m-absolute" loading="auto" data-placeholder="image">`
  - 疊加遮罩：`div[overlay="el"].img-overlay`
  - hover 狀態層：`div[cta-cursor_el=""].cta-hover_el` > `div.body-upper` + `div.orgc-detail.body-upper > div.detail-text`

| 欄位 | class | href | 桌面端標題 |
|--|--|--|--|
| 第 1 欄 | `split-col u-column-6 is-100` | `/collections/all` | Our Products |
| 第 2 欄 | `split-col u-column-3` | `/pages/about` | Our Story |
| 第 3 欄 | `split-col u-column-3 is-100` | `https://www.instagram.com/oddritual.gc/` (target=_blank) | Our Community |

### [10] `div#shopify-section-or-text-section.u-container`
- 父層：`div.page-contain.u-container`
- 同層前後鄰接：前方緊接 `div#shopify-section-home-image-section`，無後繼鄰接（為 `page-contain` 最後一個子段）
- 直接子層：唯一子節點 `div.or-info`
- 關鍵屬性：`id="shopify-section-or-text-section"`, `class="u-container"`
- 是否含圖片掛載：否
- 是否含文字層：是
- 是否含連結 / CTA：否
- 是否為空容器：否
- 原樣摘錄到哪一層為止：往下拆解子節點。

**`div.or-info` 的直接子層（3 個平行節點）：**

1. `div.u-text-align-center` > `div.text-style_alt-large` > `<p>`（主置中大標）
2. `div.split-grid.u-grid-desktop`（3欄橫向網格）
   - 欄 1：`div.u-column-3.is-hidden` > `div.body-upper.f-5 > p`
   - 欄 2：`div.u-column-6.text-width` > `div.u-vflex-center-top.u-text-align-center` > `div.body-upper.f-5 > p`
   - 欄 3：`div.u-column-3.u-text-align-right.is-hidden` > `div.body-upper.f-5 > p`
3. `div.logo-icon_wrap`（空殼，無子節點，靠 CSS 渲染 logo 符號）

---

## 3. 最終對帳
- 這一塊內部共有幾個不可再合併的子段（已完整補帳後）：
  以 DOM 流而言，`page-contain.u-container` 的直接子層共有 **5 個**，再向下展開計共有 **10 個** 關鍵獨立節點不可隨意替換或省略：
  1. 內縮容器 `.page-contain.u-container`
  2. Shopify 前置宣告區 `#shopify-section-intro-section`
  3. 橫捲外罩 `.product-draggable_wrap.is-home`
  4. 位移軌道本體 `.product-draggable_el`
  5. CMS清單包裹層 `.product-slider.w-dyn-list`
  6. CMS清單陣列層 `.product-slider_list.w-dyn-items`
  7. CMS實體項目單元 `.product-card.w-dyn-item`
  8. View all 連結段 `.products-all_wrap`
  9. 三欄 CTA 圖方塊段 `#shopify-section-home-image-section`
  10. 置中品牌文字段 `#shopify-section-or-text-section`
- 哪些子段先前被誤合併：
  - 外層 `.dark-section_wrap` 被抹除，.`page-contain.u-container` 完全被忽略。
  - `#shopify-section-intro-section` 直接被視為平行的「3. 2-Column Split Block」。
  - `.product-draggable_wrap.is-home` 直接被拆出為「4. Horizontal Draggable Band」，`w-dyn-*` 結構遭到嚴重抹除。
  - `div.products-all_wrap`、`div#shopify-section-home-image-section`、`div#shopify-section-or-text-section` 在全部早期文件中完全遺漏未記錄。
- 哪些子段含資料綁定：
  - `div.product-slider.w-dyn-list`：含有 `udy-collection="product"`
  - `div.product-slider_list.w-dyn-items`
  - `div.product-card.w-dyn-item`
  - `<img data-commerce-type="variation-image">`
- 哪些 selector 之後完整復刻時必須原樣保留：
  - 狀態連動的最外防護：`div[nav-dark=""]` 與 `class="dark-section_wrap"`
  - 內容主容器：`class="page-contain u-container"`
  - Shopify 原生掛載宣告段：`id="shopify-section-intro-section"` 及其網格 `split-grid u-grid-desktop m-vflex`
  - 商品滑動區域外殼：`class="product-draggable_wrap is-home"`
  - 移動機制的綁定點：`product-slider=""` 與 `class="product-draggable_el"`
  - 所有 Webflow CMS 三連屬性：`w-dyn-list`, `udy-collection="product"`, `w-dyn-items`, `w-dyn-item`, `data-commerce-type="variation-image"`
  - CTA 掛鉤屬性群：`overlay="trigger"`, `overlay="el"`, `cta-cursor_wrap=""`, `cta-cursor_el=""`（在 `#shopify-section-home-image-section` 每個 CTA block 上）
  - `data-text="View all products"` 在 `.products-all_wrap` 的連結容器上
  - `div.logo-icon_wrap`（空殼但具有識別意義的 CSS 渲染容器，在 `#shopify-section-or-text-section` 尾部）
  - 三欄網格中 `is-hidden` 欄位：`div.u-column-3.is-hidden` 與 `div.u-column-3.u-text-align-right.is-hidden`（必須保留，勿刪）
