# preloader-wrap-ledger

## 1. 外層容器
- 原始 selector：`div.preloader_wrap`
- 直接子層順序：僅有 1 個直接子層 `div.preloader-inner`
- 外層屬性：`class="preloader_wrap"`

## 2. 子段逐條帳
### [1] `div.preloader-inner`
- 父層：`div.preloader_wrap`
- 同層前後鄰接：無同層鄰居
- 直接子層：依序包含 3 個平行節點：`div.preloader_logo-contain`, `div.preloader-inner_bg`, `div.preloader_img-contain`
- 關鍵屬性：`class="preloader-inner"`
- 原樣摘錄到哪一層為止：作為進出場狀態受控的排版內框，往下切分成三個平行的獨立容器。

### [2] `div.preloader_logo-contain`
- 父層：`div.preloader-inner`
- 同層前後鄰接：後方鄰接 `div.preloader-inner_bg`
- 直接子層：無
- 關鍵屬性：`class="preloader_logo-contain"`
- 原樣摘錄到哪一層為止：純標誌定位之骨架，無其它 HTML 子節點。

### [3] `div.preloader-inner_bg`
- 父層：`div.preloader-inner`
- 同層前後鄰接：前方接 `div.preloader_logo-contain`，後方接 `div.preloader_img-contain`
- 直接子層：無
- 關鍵屬性：`class="preloader-inner_bg"`
- 原樣摘錄到哪一層為止：此為負責處理背景滿版遮罩之空容器本身。

### [4] `div.preloader_img-contain`
- 父層：`div.preloader-inner`
- 同層前後鄰接：前方接 `div.preloader-inner_bg`
- 直接子層：多個預埋的 `img` 節點
- 關鍵屬性：`class="preloader_img-contain"`
- 原樣摘錄到哪一層為止：負責裝載並定位圖片陣列的外殼。

## 3. 影像骨架統計
- `.preloader_img-contain` 內直接子層 `<img.preloader-img>` 的數量：共計 8 個
- 每個共同屬性：`alt=""`, `class="preloader-img"`, `loading="auto"`, `data-placeholder="image"`
- 是否存在其他非 img 子層：否（純粹為 8 張 `img` 陣列連續疊加）

## 4. 最終對帳
- `.preloader_wrap` 內共有幾個不可再合併的子段：
  以 DOM 從外而內的拓樸計算，共有 4 組容器控制層不可隨意減併：
  1. `div.preloader-inner` 主佈局框
  2. `div.preloader_logo-contain` 商標層
  3. `div.preloader-inner_bg` 背景層
  4. `div.preloader_img-contain` 陣列層
  以及最深處必須預先渲染的 8 顆 `img.preloader-img` 實體。
- 哪些 selector 之後完整復刻時必須原樣保留：
  - 外殼與內框層：`class="preloader_wrap"`、`class="preloader-inner"`
  - 各司其職的三個平行區段類別名：`preloader_logo-contain`、`preloader-inner_bg`、`preloader_img-contain`
  - 8 張靜態圖像的共有屬性：`class="preloader-img"` 與預先註記的 `data-placeholder="image"`。
