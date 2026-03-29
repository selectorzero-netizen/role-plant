# component-boundaries

## 1. Sticky Overlay Container
- 邊界層級：Page-level
- 建議切分：
  - Fixed shell
  - Primary bar
  - Full-screen overlay layer
  - Side drawer layer
- 依附關係：
  - Primary bar 與 Full-screen overlay layer 同屬 Fixed shell
  - Side drawer layer 為獨立浮層，但依附於同一固定定位系統
- 不可過早決定的東西：
  - 不決定它是不是會員入口、購物車、主選單
  - 不決定互動開關方式
  - 不決定動畫形式

## 2. Full-bleed Media Block
- 邊界層級：Section-level
- 建議切分：
  - Outer full-bleed shell
  - Media viewport
  - Text overlay layer
  - CTA cluster
- 依附關係：
  - Media viewport 與 Text overlay layer 同屬 Outer full-bleed shell
  - CTA cluster 依附於 Text overlay layer
- 不可過早決定的東西：
  - 不決定輪播邏輯
  - 不決定圖片來源
  - 不決定文案內容

## 3. 2-Column Split Block
- 邊界層級：Section-level
- 建議切分：
  - Split grid container
  - Left column panel
  - Right column panel
- 依附關係：
  - Left column panel 與 Right column panel 同屬 Split grid container 的平行子單位
- 不可過早決定的東西：
  - 不決定左右兩側空間是放置文字或圖片
  - 不決定行動裝置尺寸下的堆疊順序
  - 不決定具體的網格比例數值

## 4. Horizontal Draggable Band
- 邊界層級：Section-level
- 建議切分：
  - Band wrapper
  - Section intro block
  - Scrollable rail track
  - Individual card unit
- 依附關係：
  - Section intro block 與 Scrollable rail track 同屬 Band wrapper
  - 多個 Individual card unit 依附並排列於 Scrollable rail track 空間內
- 不可過早決定的東西：
  - 不決定滑鼠拖曳或滾軸綁定的互動邏輯
  - 不決定軌道長度、溢出範圍與卡片數量
  - 不決定單張卡片內部的資料來源與屬性

## 5. Stacked Split List
- 邊界層級：Section-level
- 建議切分：
  - Main section wrapper
  - Top split-header area
  - Stacked list container
  - Repeating split-item unit
- 依附關係：
  - Top split-header area 與 Stacked list container 依序同屬 Main section wrapper
  - Repeating split-item unit 為 Stacked list container 陣列下的重複子單位
- 不可過早決定的東西：
  - 不決定項目滾動時的視差或物理覆蓋特效
  - 不決定每個子項目的具體指向目標
  - 不決定陣列堆疊的資料總長度

## 6. Multi-column Grid Block
- 邊界層級：Section-level
- 建議切分：
  - Grid outer shell
  - Primary multi-column layer
  - Secondary multi-column layer
  - Column cell unit
- 依附關係：
  - Primary multi-column layer 與 Secondary multi-column layer 上下依附於 Grid outer shell
  - Column cell unit 構成不同比例的網格空間，分散依附於各 multi-column layer
- 不可過早決定的東西：
  - 不決定網格內是否安插表單或純文字連結
  - 不決定版權宣告文字與排版對齊方向
  - 不決定行動裝置下的自適應摺疊邏輯

## 7. Fixed Absolute Layers
- 邊界層級：Page-level
- 建議切分：
  - Absolute viewport shell
  - Backdrop overlay mask
  - Centered modal box
  - Modal content grid
- 依附關係：
  - Backdrop overlay mask 與 Centered modal box 平行且依附於 Absolute viewport shell
  - Modal content grid 為獨立網格單元，依附於 Centered modal box 內
- 不可過早決定的東西：
  - 不決定這是一次性自動彈出還是被動觸發層
  - 不決定彈窗內容是表單行為還是純圖像展示
  - 不決定關閉按鈕與相關轉場動畫
