# skeleton-build-plan

## 1. 建議重建順序
- 第一階段 (基礎文檔佈局)：先建立處於標準垂直文檔流 (Document Flow) 且空間相對固定的樓層。包含：2-Column Split Block、Multi-column Grid Block。這能快速撐起整個網頁的基礎垂直長度與底層網格系統。
- 第二階段 (滿版與衍生排列)：建立突破基礎邊緣、依賴特殊尺寸或重複陣列的樓層。包含：Full-bleed Media Block、Horizontal Draggable Band、Stacked Split List。這一步需確認內層陣列推擠時是否會導致外層容器邊界破裂。
- 第三階段 (脫離文檔流的覆蓋層)：建立需要絕對或固定定位的獨立 UI 層。包含：Sticky Overlay Container、Fixed Absolute Layers。等待底層樓層全部確認空間後再疊加上去，可避免 z-index 錯亂或遮蔽問題。

## 2. 高相依骨架
- **Horizontal Draggable Band 的軌道與父容器**：內部的 Scrollable rail track 強烈依賴 Band wrapper 甚至外部視窗寬度的計算，以便產生正確的橫向溢出。
- **Fixed Absolute Layers 與全域 Viewport**：Absolute viewport shell 與內部 Backdrop overlay mask 的覆蓋範圍，必須相依於整個網頁空間環境的邊界限制。
- **Sticky Overlay Container 的側邊或全螢幕子層**：Side drawer layer 或 Full-screen overlay layer 的定位與撐開，高度相依於外部 Fixed shell 的固定定位系統基準。

## 3. 先做靜態就能看出 70% 樣子的區塊
- **2-Column Split Block**：將雙欄網格的空間等分定義出來後，即可確立該區塊雛形。
- **Multi-column Grid Block**：只要區分好 Primary 與 Secondary multi-column layer 及其內部的比例格線，整體底部空間地圖就能確立。
- **Stacked Split List**：在不考慮滾動效果的前提下，將重複的 Repeating split-item unit 進行單純的上下堆疊，也能直接呈現出其樓層結構。

## 4. 後補動作的區塊
- **Full-bleed Media Block**：內部媒體的切換、輪播控制以及文字層的連動替換。
- **Horizontal Draggable Band**：內部軌道的橫向拖曳拖曳物理特性、超出螢幕的滾動綁定，以及單卡片的聚焦狀態。
- **Sticky Overlay Container**：主導覽列的吸附或隱藏物理行為，以及全螢幕與側邊浮層的展開/收起狀態切換。
- **Fixed Absolute Layers**：彈窗的出現、消失邏輯與背景遮罩的鎖定行為。
- **Stacked Split List**：垂直滾動時，各子項目間可能存在的視差重疊效應。

本輪僅拆解 reference-site 的透明空殼結構，不構成實作指令。
