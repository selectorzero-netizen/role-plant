# footer-light-ledger

## 1. 外層容器
- 原始 selector：`footer#shopify-section-footer-light.footer.u-theme-light`
- 外層屬性：
  - `id="shopify-section-footer-light"`
  - `class="footer u-theme-light"`
  - `img-hover_wrap=""`
- 直接子層順序：
  1. `div.footer-contain.u-container`（第一組：上部 logo + 說明 + 訂閱表單欄）
  2. `div.footer-contain.u-container`（第二組：下部連結欄 + 版權列）
  3. `div.target-imgs_hidden`（圖片預載隱藏層）

## 2. 子段逐條帳

### [1] `div.footer-contain.u-container` (第一組)
- 父層：`footer#shopify-section-footer-light`
- 同層前後鄰接：後接第二組 `div.footer-contain.u-container`
- 直接子層：`div.split-grid.u-grid-desktop.m-gap_0`
- 關鍵屬性：`class="footer-contain u-container"`
- 是否含文字層：深層含有
- 是否含連結：否（此組無導覽連結）
- 是否含表單 / CTA：是，深層含 Klaviyo 表單掛載點
- 是否為空容器：否
- 原樣摘錄到哪一層為止：往下拆解。

### [2] `div.split-grid.u-grid-desktop.m-gap_0`
- 父層：第一組 `div.footer-contain.u-container`
- 同層前後鄰接：無
- 直接子層：三個 `div.split-col`（比例分別為 `u-column-6`、`u-column-3`、`u-column-3`）
- 關鍵屬性：`class="split-grid u-grid-desktop m-gap_0"`
- 是否含文字層：是
- 是否含連結：否
- 是否含表單 / CTA：是（第三欄）
- 是否為空容器：否
- 原樣摘錄到哪一層為止：往下各欄列帳。

### [3] `div.split-col.u-column-6.m-bot_15` (第一欄 / logo 區)
- 父層：`div.split-grid.u-grid-desktop.m-gap_0`
- 同層前後鄰接：後接第二欄 `div.split-col.u-column-3`
- 直接子層：`div.footer-logo_wrap`
- 關鍵屬性：`class="split-col u-column-6 m-bot_15"`
- 是否含文字層：否
- 是否含連結：否
- 是否含表單 / CTA：否
- 是否為空容器：否（但 `div.footer-logo_wrap` 本身含有 `easter-trigger=""` 屬性）
- 原樣摘錄到哪一層為止：至 `div.footer-logo_wrap[easter-trigger=""]` 為止（空殼但帶自定義觸發屬性）。

### [4] `div.footer-logo_wrap`
- 父層：`div.split-col.u-column-6.m-bot_15`
- 同層前後鄰接：無
- 直接子層：無（空殼，靠 CSS 渲染 logo）
- 關鍵屬性：`easter-trigger=""`, `class="footer-logo_wrap"`
- 是否含文字層：否
- 是否含連結：否
- 是否含表單 / CTA：否
- 是否為空容器：是（帶有 `easter-trigger` 特殊掛鉤）
- 原樣摘錄到哪一層為止：末端節點。

### [5] `div.split-col.u-column-3` (第二欄 / 說明文字區)
- 父層：`div.split-grid.u-grid-desktop.m-gap_0`
- 同層前後鄰接：前接 logo 欄，後接表單欄
- 直接子層：`div.body-upper`（含 `<p>` 文字）
- 關鍵屬性：`class="split-col u-column-3"`
- 是否含文字層：是
- 是否含連結：否
- 是否含表單 / CTA：否
- 是否為空容器：否
- 原樣摘錄到哪一層為止：至 `<p>` 文字節點為止。

### [6] `div.split-col.u-column-3` (第三欄 / 表單 + 圖片預載區)
- 父層：`div.split-grid.u-grid-desktop.m-gap_0`
- 同層前後鄰接：前接說明文字欄
- 直接子層：`div.signup-head`（空容器）、`div.klaviyo-form-SCSKtr.klaviyo-form.form-version-cid-1`、`div.footer-menu_imgs_wrap`
- 關鍵屬性：`class="split-col u-column-3"`
- 是否含文字層：否
- 是否含連結：否
- 是否含表單 / CTA：是，Klaviyo 表單掛載點在此
- 是否為空容器：否
- 原樣摘錄到哪一層為止：往下列帳 Klaviyo 掛載點與圖片隱藏層。

### [7] `div.signup-head` (表單欄內空容器)
- 父層：第三欄 `div.split-col.u-column-3`
- 同層前後鄰接：後接 Klaviyo 表單掛載點
- 直接子層：無
- 關鍵屬性：`class="signup-head"`
- 是否含文字層：否
- 是否含連結：否
- 是否含表單 / CTA：否
- 是否為空容器：是
- 原樣摘錄到哪一層為止：末端空殼。

### [8] `div.klaviyo-form-SCSKtr.klaviyo-form.form-version-cid-1`
- 父層：第三欄 `div.split-col.u-column-3`
- 同層前後鄰接：前接 `div.signup-head`，後接 `div.footer-menu_imgs_wrap`
- 直接子層：`div.needsclick.kl-private-reset-css-Xuajs1`（Klaviyo 注入層）
- 關鍵屬性：`class="klaviyo-form-SCSKtr klaviyo-form form-version-cid-1"`
- 是否含文字層：是（Klaviyo 注入的 label）
- 是否含連結：否
- 是否含表單 / CTA：是，內層含 `<form aria-live="polite" data-testid="klaviyo-form-SCSKtr" novalidate="" class="needsclick klaviyo-form klaviyo-form-version-cid_1 ...">`
- 是否為空容器：否
- 原樣摘錄到哪一層為止：列至 `data-testid="form-row"` 及 `data-testid="form-component"` 層為止（同 signup-popup-ledger 慣例）。

### [9] `div.footer-menu_imgs_wrap`
- 父層：第三欄 `div.split-col.u-column-3`
- 同層前後鄰接：前接 Klaviyo 表單
- 直接子層：無（空殼，帶外部腳本掛鉤）
- 關鍵屬性：`target-img_wrap=""`, `class="footer-menu_imgs_wrap"`
- 是否含文字層：否
- 是否含連結：否
- 是否含表單 / CTA：否
- 是否為空容器：是（由外部 hover 腳本管理圖片注入）
- 原樣摘錄到哪一層為止：末端節點。

### [10] `div.footer-contain.u-container` (第二組)
- 父層：`footer#shopify-section-footer-light`
- 同層前後鄰接：前接第一組 `div.footer-contain.u-container`，後接 `div.target-imgs_hidden`
- 直接子層：`div.footer-bottom`
- 關鍵屬性：`class="footer-contain u-container"`
- 是否含文字層：深層含有
- 是否含連結：深層含有
- 是否含表單 / CTA：否
- 是否為空容器：否
- 原樣摘錄到哪一層為止：往下拆解。

### [11] `div.footer-bottom`
- 父層：第二組 `div.footer-contain.u-container`
- 同層前後鄰接：無
- 直接子層：`div.split-grid.u-grid-desktop`（四欄連結網格）、`div.split-grid.u-grid-desktop.m-gap_05`（版權列）
- 關鍵屬性：`class="footer-bottom"`
- 是否含文字層：是
- 是否含連結：是
- 是否含表單 / CTA：否
- 是否為空容器：否
- 原樣摘錄到哪一層為止：往下各 split-grid 列帳。

### [12] `div.split-grid.u-grid-desktop` (四欄連結網格)
- 父層：`div.footer-bottom`
- 同層前後鄰接：後接版權列 `div.split-grid.u-grid-desktop.m-gap_05`
- 直接子層：4 個 `div.split-col.u-column-3`（依序為 Site Index / Social / Get in touch / Legal）
- 關鍵屬性：`class="split-grid u-grid-desktop"`
- 是否含文字層：是
- 是否含連結：是
- 是否含表單 / CTA：否
- 是否為空容器：否
- 原樣摘錄到哪一層為止：往下各欄列帳。

### [13] `div.split-col.u-column-3` × 4 (四個連結欄)
- 父層：`div.split-grid.u-grid-desktop`（四欄網格）
- 同層前後鄰接：彼此前後相鄰
- 直接子層：每欄各有 `div.footer-col` > `div.footer-col.has-line` > `div.footer-body`（欄標題）、`div.footer-h_line.is-desktop`（水平線）、`div.footer-link_list`（連結清單）
- 關鍵屬性：`class="split-col u-column-3"`
- 是否含文字層：是
- 是否含連結：是，每組 `div.footer-link_list` 內有多個 `a.footer-link.is-menu.w-inline-block`
- 是否含表單 / CTA：否
- 是否為空容器：否
- 原樣摘錄到哪一層為止：往下列帳各欄內部結構。

### [14] `div.footer-link_list` (Site Index 欄，4 個連結)
- 父層：`div.footer-col.has-line`（第一欄）
- 同層前後鄰接：前接 `div.footer-h_line.is-desktop`
- 直接子層：4 個 `a.footer-link.is-menu.w-inline-block`（依序 Shop now / Home / About us / Contact Us）
- 關鍵屬性：`img-hover_triggers-wrap=""`, `class="footer-link_list"`
- 是否含文字層：是
- 是否含連結：是，每個 `<a>` 含 `img-hover_trigger=""`, `text-btn=""` 屬性
- 是否含表單 / CTA：否
- 是否為空容器：否
- 原樣摘錄到哪一層為止：至連結結構骨架（`div.footer-link_layout.body-upper` 及 `div.footer-link_icon[text-btn-icon=""]`）為止。

### [15] `div.footer-link_list` (Social 欄，1 個連結)
- 父層：`div.footer-col.has-line`（第二欄）
- 同層前後鄰接：前接 `div.footer-h_line.is-desktop`
- 直接子層：1 個 `a.footer-link.is-menu.w-inline-block`（Instagram，含 `target="_blank"`, `text-btn=""`）
- 關鍵屬性：`class="footer-link_list"`
- 是否含文字層：是
- 是否含連結：是
- 是否含表單 / CTA：否
- 是否為空容器：否
- 原樣摘錄到哪一層為止：至連結結構骨架為止。

### [16] `div.footer-link_list` (Get in touch 欄，2 個連結)
- 父層：`div.footer-col.has-line`（第三欄）
- 同層前後鄰接：前接 `div.footer-h_line.is-desktop`
- 直接子層：2 個 `a.footer-link.is-menu.w-inline-block`（`mailto:` 與 `tel:` 連結，皆含 `text-btn=""`）
- 關鍵屬性：`class="footer-link_list"`
- 是否含文字層：是
- 是否含連結：是，含 `href="mailto:..."` 與 `href="tel:..."`
- 是否含表單 / CTA：否
- 是否為空容器：否
- 原樣摘錄到哪一層為止：至連結結構骨架為止。

### [17] `div.footer-link_list` (Legal 欄，4 個連結)
- 父層：`div.footer-col.has-line`（第四欄）
- 同層前後鄰接：前接 `div.footer-h_line.is-desktop`
- 直接子層：4 個 `a.footer-link.is-menu.w-inline-block`（依序 Privacy Policy / Refunds / Shipping / Terms of service，皆含 `text-btn=""`）
- 關鍵屬性：`class="footer-link_list"`
- 是否含文字層：是
- 是否含連結：是
- 是否含表單 / CTA：否
- 是否為空容器：否
- 原樣摘錄到哪一層為止：至連結結構骨架為止。

### [18] `div.split-grid.u-grid-desktop.m-gap_05` (版權列)
- 父層：`div.footer-bottom`
- 同層前後鄰接：前接四欄連結網格
- 直接子層：`div.split-col.u-column-9`（版權文字）、`div.split-col.u-column-3.u-text-align-right`（製作者連結）
- 關鍵屬性：`class="split-grid u-grid-desktop m-gap_05"`
- 是否含文字層：是
- 是否含連結：是
- 是否含表單 / CTA：否
- 是否為空容器：否
- 原樣摘錄到哪一層為止：至各子欄節點為止。

### [19] `div.target-imgs_hidden` (圖片預載隱藏層)
- 父層：`footer#shopify-section-footer-light`
- 同層前後鄰接：前接第二組 `div.footer-contain.u-container`
- 直接子層：4 個 `<img alt="" class="img-fill" loading="auto" data-placeholder="image">`
- 關鍵屬性：`target-imgs_hidden=""`, `class="target-imgs_hidden"`
- 是否含文字層：否
- 是否含連結：否
- 是否含表單 / CTA：否
- 是否為空容器：否
- 原樣摘錄到哪一層為止：至 4 張 img 節點為止。

## 3. 重複 block / link 群組統計
- 是否存在重複群組：是，兩個維度
  - 4 個 `div.split-col.u-column-3` 並列於四欄連結網格（各自對應不同連結集合）
  - 4 組 `div.footer-link_list`（骨架相同，內容數量不同，分別含 4 / 1 / 2 / 4 個連結）
  - 每個 `a.footer-link.is-menu.w-inline-block` 內部骨架相同：`div.footer-link_layout.body-upper > p + div.footer-link_icon[text-btn-icon=""]`
- 數量：4 欄，合計 11 個 `<a>` 連結（Site Index 4 + Social 1 + Contact 2 + Legal 4）
- 每個共同 class / 屬性：`class="footer-link is-menu w-inline-block"`、`text-btn=""`；Site Index 欄外加 `img-hover_trigger=""`
- 是否存在非重複子層：是，第一組 `footer-contain` 的 logo 欄（`footer-logo_wrap[easter-trigger]`）、說明文字欄、Klaviyo 掛載欄（`div.klaviyo-form-SCSKtr`）、`div.footer-menu_imgs_wrap[target-img_wrap]`、以及最末端 `div.target-imgs_hidden` 皆為非重複獨立層。

## 4. 最終對帳
- `footer#shopify-section-footer-light.footer.u-theme-light` 內共有幾個不可再合併的子段：
  以「最小可識別責任單元」估算，共 19 個已標記子段，歸納為 3 個頂層大區塊（第一組 footer-contain、第二組 footer-contain、target-imgs_hidden），各自向下展開無法合併的骨架層。
- 哪些 selector / 屬性 之後完整復刻時必須原樣保留：
  - 全局 hover 圖框掛鉤：`img-hover_wrap=""` 在最外層 `footer` 元素上
  - Easter egg 觸發點：`easter-trigger=""` 在 `div.footer-logo_wrap` 上
  - hover 圖切換：`img-hover_triggers-wrap=""` 在 Site Index 欄的 `footer-link_list` 上，及 `img-hover_trigger=""` 在各連結上
  - hover 掛鉤：`text-btn=""` 與 `text-btn-icon=""` 在連結及圖標元素上
  - footer 圖框注入：`target-img_wrap=""` 在 `div.footer-menu_imgs_wrap` 上
  - 圖片預載隱藏層：`target-imgs_hidden=""` 與內部 4 張 `img[data-placeholder="image"]`
  - Klaviyo 掛載 class 鏈：`klaviyo-form-SCSKtr`, `form-version-cid-1`
  - 桌面端水平分隔線：`div.footer-h_line.is-desktop`（行動端不顯示）
  - 版權列奇特欄位比例：左 `u-column-9` 右 `u-column-3.u-text-align-right`
- 哪些層先前被抽象名抹平：
  先前「6. Multi-column Grid Block」的「Primary / Secondary multi-column layer」完全掩蓋了兩個 `footer-contain` 在功能上的分工差異（前者負責品牌 + 表單，後者負責連結導覽 + 版權），且對 `easter-trigger`、`target-img_wrap`、`img-hover_wrap`、Klaviyo 強制 class 鏈等所有外部腳本掛鉤均未作任何記錄。
