# homepage-requirements-sheet

## div.page_code_wrap
- 類型：全域腳本/樣式掛載殼
- 必留：原始空節點骨架
- 必改：整合階段所需之全域 CSS 覆寫與專案獨立靜態代碼
- 先不做：載入任何第三方真實功能性 JS
- 結構需求：絕對維持為 `body` 起頭第一個 DOM 元素
- 功能需求：無實質視圖層功能，屬於生命週期起點
- 美感需求（待使用者補）：

## div.preloader_wrap
- 類型：進場動畫遮罩視圖
- 必留：內層精確的三層嵌套區塊 `#preloader_logo-contain`、`.preloader-inner_bg` 與 `.preloader_img-contain` 及其防護層 `preloader-inner`
- 必改：填入或繪製真實的商標佔位物件
- 先不做：開場動畫時間軸（Timeline）控制與 Lifecycle 消隱機制
- 結構需求：確保背景色層不會脫離 inner 外溢至 top-level，嚴格依從現存骨架
- 功能需求：待 Phase 2/3 實作加載過渡與移除邏輯
- 美感需求（待使用者補）：

## div.nav-component
- 類型：全域頂部導航及全覆蓋選單
- 必留：`nav.orgc-nav` 頂列三欄靜態結構、`nav.menu` 大選單內網格佈局與預載圖片區、包含所有 `commercecartwrapper` 保護空殼
- 必改：將 `.menu-list-item` 內的空殼文字與 `.nav-link` 置入規劃的首頁導航真值
- 先不做：購物車介面展開與真流程、全螢幕選單過渡轉場特效
- 結構需求：不可更動深層網格對其 `u-column-X` 的比例設定，保留所有預留 hook
- 功能需求：漢堡選單展開切換動作、微型購物車拉出（Phase 2/3）
- 美感需求（待使用者補）：

## section#home-hero.hero-slider
- 類型：首屏滿版主視覺幻燈片
- 必留：中心大標題掛載點與下方 `#home-hero_bot` 網格、`slider-list` 控制點、三個保真化的獨立標示與圖片關聯殼
- 必改：放置對應的 Hero 首圖陣列或大字號標語
- 先不做：套用 Splide / Swiper 等第三方輪播套件來渲染及滾動影像
- 結構需求：確保 `img-fill` 在 `u-cover-absolute` 的容器中位屬底層定位
- 功能需求：首圖左右翻動或滾動切換（Phase 2/3）
- 美感需求（待使用者補）：

## div.dark-section_wrap
- 類型：暗底色複合式主題區及商品橫列
- 必留：引導介紹之 `#shopify-section-intro-section`、滑動軌道最外殼 `product-draggable_wrap` 及其內層 `w-dyn-*` 關聯特徵、三欄 CTA 外層與 View All
- 必改：替換介紹文案、商品資訊骨架之純替換文字、為 CTA 方塊填寫靜態目標頁連結
- 先不做：接納 Webflow CMS 真資料灌入、拖曳事件掛載、hover 動畫反饋
- 結構需求：遵循唯一的 `.page-contain` 限定排版，及所有在 `#shopify-section-or-text-section` 裡的隱藏補償欄位
- 功能需求：滑鼠向右拖曳或橫向滾輪支持（Phase 2/3）
- 美感需求（待使用者補）：

## section#shopify-section-home-slider.hero-slider.is-large
- 類型：大型焦點幻燈片展示區
- 必留：已具備內部資訊塊結構 `.slides-info.is-large` 與其左右佈局，以及 7 個保留原始隱藏陣列形態的 `hero-slide_visual`
- 必改：定義每個輪播項目的實績內容圖或預覽影像
- 先不做：此區段與 `.dark-section` 的銜接效果處理、滑軌功能連動
- 結構需求：須維持陣列中第一個子節點呈現顯示，其餘為隱藏備用的初始結構配置
- 功能需求：區塊層級點擊或滑動觸發項目切換（Phase 2/3）
- 美感需求（待使用者補）：

## section#shopify-section-community-section.community-section
- 類型：交錯堆疊資訊項目陣列
- 必留：5 個對等的 `.community-item` 雙欄骨架，具備特定差異的 `data-scroll-overlap` 保留屬性與顯隱網格線
- 必改：補給真實的社群標題文案與基礎行動版展現圖形
- 先不做：以向下捲動觸發的 sticky 固定以及重疊交互邏輯
- 結構需求：必須將每個細節資訊保留在對應左右欄位中不可壓縮至單一容器
- 功能需求：定焦視差感及手機端手風琴列切換（Phase 2/3）
- 美感需求（待使用者補）：

## footer#shopify-section-footer-light.footer.u-theme-light
- 類型：底部資訊與全域圖片預載機制
- 必留：帶有 `easter-trigger` 的專用區域、獨立切分的四個功能表 `.has-line` 列表區、內藏四張實體 `data-placeholder` 的預載層
- 必改：填寫品牌真正對應的連結目錄名稱、底部權利宣告文與版權字樣
- 先不做：載入 Klaviyo 電子報訂閱模組腳本、綁定 hover 對應選單庫存圖功能
- 結構需求：連結群組內部嵌套結構 `a > p` 及對應的網表拆分必須完全凍結
- 功能需求：訂閱處理及選單與底部彩蛋觸發點相牽連之互動（Phase 2/3）
- 美感需求（待使用者補）：

## div#shopify-section-easter.easter-egg
- 類型：外部裝飾或全局彩蛋互動組件
- 必留：已矯正的 `easter-outer` > `easter-contain` 兩層深度防禦及 3 個圖標外殼
- 必改：定義實體出現的圖片物件資源
- 先不做：綁定 Footer Click 或事件控制視窗揭露特效
- 結構需求：身為防禦頂層節點需置身於正常文件流的獨立定位
- 功能需求：觸發後開散邏輯（Phase 2/3）
- 美感需求（待使用者補）：

## div.signup_popup
- 類型：全域首屏訂閱彈窗
- 必留：更正後的 `.signup_wrap` > `.signup_inner` 內包關係與實體關閉按鍵預留器
- 必改：宣告彈窗本體用靜態說辭
- 先不做：任何條件式彈出機制（延遲/滾動深度觸發）及完整資料遞交
- 結構需求：在 HTML 架構上必須自成一格於底層
- 功能需求：點擊消隱與成功訊息回饋（Phase 2/3）
- 美感需求（待使用者補）：

## div.cursor_wrap
- 類型：自定義滑鼠指標總成
- 必留：代表左/右/拖曳三種可能樣態的獨立掛載 `.cursor_el` 區塊
- 必改：賦序原始設計期望的比例尺寸或色彩定義形式之對應 class
- 先不做：全站內任何座標讀取及跟隨映射運算腳本
- 結構需求：不可合併三者，確保它們各司其職響應不同 section 發送的 hook
- 功能需求：全局跟隨、吸附與型態變化切換（Phase 2/3）
- 美感需求（待使用者補）：

---

## 全站共通規則
- 必留：最高優先級的 `class` 骨架及網格版型定義語系、各種為 Webflow 和 Shopify 定制的 `data-*` 擴展標記與 hook 屬性。
- 必改：替換目前的佔位符圖標、placeholder 圖層，以及由「空殼或假設文字」構成的資訊欄位，應將其具象化為符合品牌的實質靜態文案內容。
- 先不做：不可在此刻納入任何接續性的三方 API（如電子報、電商購物車）、複雜路由特效、CMS 資料接軌輸出，所有非視圖靜態展示邏輯者一律延展至 Phase 2/3。
