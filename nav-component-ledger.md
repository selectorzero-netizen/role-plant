# nav-component-ledger

## 1. 外層容器
- 原始 selector：`div.nav-component`
- 直接子層順序：1. `div.nav`（全螢幕覆蓋狀態容器）、 2. `nav.orgc-nav`（頂部導覽列）
- 外層屬性：`class="nav-component"`

## 2. 主幹分支
### [A] `.nav > nav.menu` 分支
- 父層：`div.nav`（本身帶有 `img-hover_wrap=""`, `data-nav="closed"` 屬性）
- 直接子層順序：`div.menu-bg`, `div.menu-inner`, `div.target-imgs_hidden`
- 關鍵屬性：`class="menu"`
- 是否含 commerce/data binding：是，底層嵌套購物車。

### [B] `nav.orgc-nav` 分支
- 父層：`div.nav-component`
- 直接子層順序：`div.nav-contain.u-container`
- 關鍵屬性：`class="orgc-nav"`
- 是否含 commerce/data binding：是，底層嵌套同一結構購物車。

## 3. 子段逐條帳（非 commerce 容器層補齊）

### [1] `div.nav`
- 父層：`div.nav-component`
- 同層前後鄰接：後方接 `nav.orgc-nav`
- 直接子層：`div.overlay`, `nav.menu`
- 關鍵屬性：`img-hover_wrap=""`, `data-nav="closed"`, `class="nav"`
- 是否含 commerce/data binding：否
- 原樣摘錄到哪一層為止：全螢幕選單的頂層狀態外殼。

### [2] `div.overlay`
- 父層：`div.nav`
- 同層前後鄰接：後方接 `nav.menu`
- 直接子層：無
- 關鍵屬性：`data-menu-toggle=""`, `class="overlay"`
- 是否含 commerce/data binding：否
- 原樣摘錄到哪一層為止：純阻擋點擊的背景遮罩層。

### [3] `nav.menu`
- 父層：`div.nav`
- 同層前後鄰接：前方接 `div.overlay`
- 直接子層：`div.menu-bg`, `div.menu-inner`, `div.target-imgs_hidden`
- 關鍵屬性：`class="menu"`
- 是否含 commerce/data binding：內部子節點包含。
- 原樣摘錄到哪一層為止：選單主體佈局開端。

### [4] `div.menu-bg`
- 父層：`nav.menu`
- 同層前後鄰接：後方接 `div.menu-inner`
- 直接子層：`div.bg-panel_full`, `div.bg-panel.first`, `div.bg-panel`
- 關鍵屬性：`class="menu-bg"`
- 是否含 commerce/data binding：否
- 原樣摘錄到哪一層為止：選單的底圖渲染層。

### [5] `div.bg-panel_full`
- 父層：`div.menu-bg`
- 同層前後鄰接：後方接 `div.bg-panel` 系列
- 直接子層：`div.bg-panel_full-img`
- 關鍵屬性：`class="bg-panel_full"`
- 是否含 commerce/data binding：否
- 原樣摘錄到哪一層為止：版面劃分的圖像容器外殼。

### [6] `div.bg-panel_full-img`
- 父層：`div.bg-panel_full`
- 同層前後鄰接：無
- 直接子層：`img.img-fill`, `div.menu-extras`
- 關鍵屬性：`class="bg-panel_full-img"`
- 是否含 commerce/data binding：否
- 原樣摘錄到哪一層為止：包含圖像與附屬資訊區塊。

### [7] `div.menu-extras`
- 父層：`div.bg-panel_full-img`
- 同層前後鄰接：前方接 `img.img-fill`
- 直接子層：`div.bg-panel_contain.u-container`
- 關鍵屬性：`class="menu-extras"`
- 是否含 commerce/data binding：否
- 原樣摘錄到哪一層為止：底圖層的附加文字資訊塊。

### [8] `div.bg-panel_contain.u-container`
- 父層：`div.menu-extras`
- 同層前後鄰接：無
- 直接子層：`div.menu-bottom_layout.u-grid-desktop.m-centered`
- 關鍵屬性：`class="bg-panel_contain u-container"`
- 是否含 commerce/data binding：否
- 原樣摘錄到哪一層為止：內縮邊界容器。

### [9] `div.menu-bottom_layout.u-grid-desktop.m-centered`
- 父層：`div.bg-panel_contain.u-container`
- 同層前後鄰接：無
- 直接子層：三個 `div.menu-footer_col` 網格（放 logo、版權、城市字樣）
- 關鍵屬性：`class="menu-bottom_layout u-grid-desktop m-centered"`
- 是否含 commerce/data binding：否
- 原樣摘錄到哪一層為止：此為底部附屬資訊的三欄網格排版層。

### [10] `div.menu-inner`
- 父層：`nav.menu`
- 同層前後鄰接：前方接 `div.menu-bg`，後方接 `div.target-imgs_hidden`
- 直接子層：兩組 `div.menu-contain.u-container`
- 關鍵屬性：`class="menu-inner"`
- 是否含 commerce/data binding：否直接含有，但其子容器包含購物車。
- 原樣摘錄到哪一層為止：選單主選列與功能操作的集合層。

### [11] `div.menu-contain.u-container` (第一組 / 主選單區塊)
- 父層：`div.menu-inner`
- 同層前後鄰接：後方接第二組同名容器
- 直接子層：`div.menu-layout.u-grid-desktop`
- 關鍵屬性：`class="menu-contain u-container"`
- 是否含 commerce/data binding：否
- 原樣摘錄到哪一層為止：內縮邊界容器。

### [12] `div.menu-layout.u-grid-desktop`
- 父層：第一組 `div.menu-contain.u-container`
- 同層前後鄰接：無
- 直接子層：`div.menu-img_wrap.u-column-1`, `div.menu-list_wrap.u-column-5`, `div.menu-close_wrap.u-column-1`
- 關鍵屬性：`class="menu-layout u-grid-desktop"`
- 是否含 commerce/data binding：否
- 原樣摘錄到哪一層為止：選單橫向網格排列層。

### [13] `div.menu-list_wrap.u-column-5`
- 父層：`div.menu-layout.u-grid-desktop`
- 同層前後鄰接：前方接 `div.menu-img_wrap`，後方接 `div.menu-close_wrap`
- 直接子層：`div.menu-list`
- 關鍵屬性：`class="menu-list_wrap u-column-5"`
- 是否含 commerce/data binding：否
- 原樣摘錄到哪一層為止：網格占比宣告。

### [14] `div.menu-list`
- 父層：`div.menu-list_wrap.u-column-5`
- 同層前後鄰接：無
- 直接子層：多個 `div.menu-list-item[img-hover_trigger=""]`
- 關鍵屬性：`img-hover_triggers-wrap=""`, `class="menu-list"`
- 是否含 commerce/data binding：否
- 原樣摘錄到哪一層為止：選單文字陣列本體。

### [15] `div.menu-contain.u-container` (第二組 / 底部功能區塊)
- 父層：`div.menu-inner`
- 同層前後鄰接：前方接第一組的主選單容器
- 直接子層：`div.menu-bottom_layout.u-grid-desktop.is-menu`
- 關鍵屬性：`class="menu-contain u-container"`
- 是否含 commerce/data binding：下層結構包夾 commerce wrapper。
- 原樣摘錄到哪一層為止：內縮容器。

### [16] `div.target-imgs_hidden`
- 父層：`nav.menu`
- 同層前後鄰接：前方接 `div.menu-inner`
- 直接子層：多個預留替換的 `<img alt="" class="img-fill">`
- 關鍵屬性：`target-imgs_hidden=""`, `class="target-imgs_hidden"`
- 是否含 commerce/data binding：否
- 原樣摘錄到哪一層為止：隱藏影像庫。

### [17] `nav.orgc-nav`
- 父層：`div.nav-component`
- 同層前後鄰接：前方接第一大支線 `div.nav`
- 直接子層：`div.nav-contain.u-container`
- 關鍵屬性：`class="orgc-nav"`
- 是否含 commerce/data binding：內部包含購物車。
- 原樣摘錄到哪一層為止：頂端導覽列實體層。

### [18] `div.nav-contain.u-container`
- 父層：`nav.orgc-nav`
- 同層前後鄰接：無
- 直接子層：`div.nav-layout.u-grid-column-2`
- 關鍵屬性：`class="nav-contain u-container"`
- 是否含 commerce/data binding：包夾在下層。
- 原樣摘錄到哪一層為止：內縮容器。

### [19] `div.nav-layout.u-grid-column-2`
- 父層：`div.nav-contain.u-container`
- 同層前後鄰接：無
- 直接子層：三個 `div.nav-col` (依序為 .is-mobile 漢堡、無綴飾 Logo、無綴飾 Desktop動作區)
- 關鍵屬性：`class="nav-layout u-grid-column-2"`
- 是否含 commerce/data binding：包夾在下層。
- 原樣摘錄到哪一層為止：頂列實體網格劃分層。

### [20] `div.nav-links_layout`
- 父層：第三個 `div.nav-col` (Desktop右邊動作區塊)
- 同層前後鄰接：前方接 `div.menu-toggle.is-desktop`
- 直接子層：`a.nav-link.is-desktop` 以及 **`div.w-commerce-commercecartwrapper` (重點！)**
- 關鍵屬性：`h-fadeout=""`, `class="nav-links_layout"`
- 是否含 commerce/data binding：它是直接掛載頂列購物車的親生父容器。
- 原樣摘錄到哪一層為止：橫排連結區塊。

---

## 4. Commerce 容器層（掛載結構簡述）
> 註：為遵循指令，以下保留前次完整的 commerce 結點對稱掛載關係與核心屬性不重寫摘要，做為依附位置聲明。

### 依附點：
上述 `div.menu-contain` 的深層 `.menu-bot_wrap` 內、以及 `div.nav-links_layout` 內，各自對稱掛載了整套 Commerce Cart。
- 掛載首層：`div.w-commerce-commercecartwrapper.cart-el[data-node-type="commerce-cart-wrapper"]...`
- 開關觸發層：`a.w-commerce-commercecartopenlink[data-node-type="commerce-cart-open-link"]`
- 車廂外殼：`div.w-commerce-commercecartcontainerwrapper`
- 內容容器：`div.w-commerce-commercecartcontainer`
- 表單外殼：`div.w-commerce-commercecartformwrapper`
- 核心表單：`form.w-commerce-commercecartform`
- 動態列掛載點：`div.w-commerce-commercecartlist[data-wf-collection="database.commerceOrder.userItems"][data-wf-template-id="..."]`

---

## 5. 最終對帳總結
- 哪些非 commerce 容器先前未列帳：
  - 前一版過度聚焦在結帳車 7 層套娃，直接跳過了決定 `.nav` 全螢幕覆蓋版式基礎的 **12 個深層網格佈局容器**（如 `div.menu-bg`, `div.bg-panel_full`, `div.menu-inner`, `div.menu-contain.u-container`, `div.menu-layout.u-grid-desktop`, `div.menu-list_wrap.u-column-5`, `div.menu-list` 等）。
  - `.orgc-nav` 分支下的 `div.nav-layout.u-grid-column-2` 及其三個平行的 `div.nav-col` 也未列入，這些才是決定首頁頂部列左、中、右排版的實體框架。
- 哪些容器之後完整復刻時必須原樣保留：
  - 確保切換事件正確執行的掛鉤群：如 `div[data-menu-toggle=""]`、`div[img-hover_wrap=""]`、`div[target-imgs_hidden=""]`、`div[img-hover_triggers-wrap=""]` 等，這關乎外部未被列出的互動腳本的選取邏輯。
  - Webflow 網格化排版控制層：`u-container` 內縮層與 `u-grid-desktop`、`u-grid-column-2` 劃分屬性。
  - Webflow 選單格線定位層：`.u-column-1`、`.u-column-5` 等空間切分欄位，在脫離原始 DOM 包裹層次後將導致版面坍塌，不能輕易合併為單一 `<Menu />` 元件而忽略這些 CSS 骨架。
