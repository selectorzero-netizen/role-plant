# reference-site-parity-audit

## 1. DOM 順序總表
- [1] `.page_wrap > .page_code_wrap`
  - 類型：section (embedded layer)
  - 對照狀態：遺漏
- [2] `.page_wrap > .page-main > .preloader_wrap`
  - 類型：overlay
  - 對照狀態：被合併 / 命名過度抽象
- [3] `.page_wrap > .page-main > .nav-component`
  - 類型：commerce layer / overlay
  - 對照狀態：命名過度抽象 / 含 data binding
- [4] `.page_wrap > .page-main > section#home-hero.hero-slider`
  - 類型：section
  - 對照狀態：命名過度抽象
- [5] `.page_wrap > .page-main > div[nav-dark=""] .dark-section_wrap`
  - 類型：section
  - 對照狀態：被合併 / 命名過度抽象 / 含 data binding
- [6] `.page_wrap > .page-main > section#shopify-section-community-section.community-section`
  - 類型：section
  - 對照狀態：命名過度抽象
- [7] `.page_wrap > .page-main > footer#shopify-section-footer-light.footer.u-theme-light`
  - 類型：section
  - 對照狀態：命名過度抽象
- [8] `.page_wrap > .page-main > div#shopify-section-easter.easter-egg`
  - 類型：popup
  - 對照狀態：被合併 / 命名過度抽象
- [9] `.page_wrap > .page-main > div.cursor`
  - 類型：overlay
  - 對照狀態：遺漏 / 被合併
- [10] `body > div#shopify-section-signup-popup.signup-popup` (位於 `.page_wrap` 外)
  - 類型：popup
  - 對照狀態：被合併 / 命名過度抽象

## 2. 逐段對照明細

### [1] `.page_code_wrap`
- 原始位置：`body > .page_wrap`
- 目前對應到哪一份文件的哪一段：未對焦（三份文件皆未收錄）
- 問題類型：遺漏
- 涉及的 data binding / commerce 屬性：無（但內含 `w-embed`）
- 為什麼這段不能被省略：存放 Webflow 或客製化的全域腳本/樣式，略過將導致初始化錯誤。

### [2] `.preloader_wrap`
- 原始位置：`body > .page_wrap > .page-main`
- 目前對應到哪一份文件的哪一段：`site-shell-map.md` 及後續文件的「1. Sticky Overlay Container」
- 問題類型：被合併 / 命名過度抽象
- 涉及的 data binding / commerce 屬性：無
- 為什麼這段不能被省略：預載畫面的 DOM 被隨意與選單合併，會破壞頁面初次匯入時獨立執行的動畫生命週期。

### [3] `.nav-component`
- 原始位置：`body > .page_wrap > .page-main`
- 目前對應到哪一份文件的哪一段：`site-shell-map.md` 及後續文件的「1. Sticky Overlay Container」
- 問題類型：命名過度抽象 / 含 data binding
- 涉及的 data binding / commerce 屬性：
  - `data-wf-cart-type="rightSidebar"`
  - `data-wf-cart-query=""`
  - `w-commerce-commercecartwrapper` 及下層多個 `w-commerce-*` class
  - `data-wf-collection="database.commerceOrder.userItems"`
  - `data-wf-template-id="wf-template-..."`
- 為什麼這段不能被省略：它是核心購物車邏輯掛載點，高度綁定 commerce API。過度抽象化會導致遺失購物車 state 結構與對應模板 ID。

### [4] `section#home-hero.hero-slider`
- 原始位置：`body > .page_wrap > .page-main`
- 目前對應到哪一份文件的哪一段：`site-shell-map.md` 及後續文件的「2. Full-bleed Media Block」
- 問題類型：命名過度抽象
- 涉及的 data binding / commerce 屬性：包含自訂屬性 `full-slider=""`, `nav-light=""`
- 為什麼這段不能被省略：此區塊帶有 `nav-light`，牽涉到滾動時全域導覽列的色彩反轉綁定，抽除原始 selector 會漏接這個連動機制。

### [5] `.dark-section_wrap`
- 原始位置：`body > .page_wrap > .page-main`
- 目前對應到哪一份文件的哪一段：被強制橫切且分散進「3. 2-Column Split Block」與「4. Horizontal Draggable Band」之中
- 問題類型：被合併過頭 / 含 data binding
- 涉及的 data binding / commerce 屬性：
  - 內部 `.product-slider` 帶有 `udy-collection="product"`
  - 內部商品卡片帶有 `w-dyn-list`, `w-dyn-items`, `w-dyn-item`
  - 圖像帶有 `data-commerce-type="variation-image"`
- 為什麼這段不能被省略：這兩段本身是包在父層 `.dark-section_wrap` 及屬性 `nav-dark=""` 裡面（同樣控制滑動時選單變色）。商品區塊嚴重依賴 CMS 輸出資料，被抽象成「Horizontal Draggable Band」會徹底遺失動態列表的綁定特徵。

### [6] `section#shopify-section-community-section.community-section`
- 原始位置：`body > .page_wrap > .page-main`
- 目前對應到哪一份文件的哪一段：`site-shell-map.md` 及後續文件的「5. Stacked Split List」
- 問題類型：命名過度抽象
- 涉及的 data binding / commerce 屬性：無
- 為什麼這段不能被省略：這是 Shopify 組件系統的對應實體 `#shopify-section-...`，改用抽象名會讓後續連接 Headless CMS 的 section schema 產生斷層。

### [7] `footer#shopify-section-footer-light.footer.u-theme-light`
- 原始位置：`body > .page_wrap > .page-main`
- 目前對應到哪一份文件的哪一段：`site-shell-map.md` 及後續文件的「6. Multi-column Grid Block」
- 問題類型：命名過度抽象
- 涉及的 data binding / commerce 屬性：無，但為標準 `#shopify-section-...`
- 為什麼這段不能被省略：頁面尾端的 Shopify 標準載入組件點，不應該被單純當成普通 Grid 對待。

### [8] `div#shopify-section-easter.easter-egg`
- 原始位置：`body > .page_wrap > .page-main` 尾部
- 目前對應到哪一份文件的哪一段：被合併進入「7. Fixed Absolute Layers」
- 問題類型：被合併 / 命名過度抽象
- 涉及的 data binding / commerce 屬性：無
- 為什麼這段不能被省略：獨立的 Shopify Section。與全域的 Popup 具有生命週期差異，不該全部揉入同一個抽象容器中。

### [9] `div.cursor`
- 原始位置：`body > .page_wrap > .page-main` 尾部
- 目前對應到哪一份文件的哪一段：遺漏
- 問題類型：遺漏
- 涉及的 data binding / commerce 屬性：無
- 為什麼這段不能被省略：全站客製化浮動游標的掛載點，在先前的藍圖裡沒有給出它的確切獨立位置。

### [10] `div#shopify-section-signup-popup.signup-popup`
- 原始位置：`body` 下第一層（與 `.page_wrap` 平行）
- 目前對應到哪一份文件的哪一段：被錯誤合併進「7. Fixed Absolute Layers」
- 問題類型：被合併 / 命名過度抽象
- 涉及的 data binding / commerce 屬性：無 (但可能與全域 Klaviyo 觸發器有連動)
- 為什麼這段不能被省略：此段落位於 `data-barba="wrapper"` 下的 `.page_wrap` 之外，代表 PJAX 切換頁面時它不會跟著銷毀重建。把它跟內層 Popup 混在一起會導致 SPA 轉場除錯災難。

## 3. 稽核結論
- 已完整對齊的段落：無（先前文件皆經過二次抽象）。
- 被合併過頭的段落：`.dark-section_wrap` 內部結構（強制切斷父級保護）、以及所有 Overlay/Popup 都被錯揉在 `7. Fixed Absolute Layers`，且無視 PJAX 生命周期邊界。
- 遺漏段落：`.page_code_wrap`、`.cursor`。
- 後續若要完整復刻，必須先修正的文件：不能直接基於前三份藍圖建立組件，必須以這份 `reference-site-parity-audit.md` 盤點出來的 10 個頂層實際 DOM 特徵作為骨架搭建指南，尤其是必須還原 `data-wf-*` 及 `w-commerce-*` 的綁定與 `data-barba` 環境邊界。
