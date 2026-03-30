## **A. 先給結論**

接下來不該直接進施工；應先把這次重整壓成一份**可審閱的前台呈現規格包**：先定死全站設計語言、首頁與關鍵頁的具體呈現、Selection 與會員／支援流程、草稿文案、Placeholder 規則與 Gemini 素材清單，再進入 mockup 與 prototype。  
 這一輪的核心任務不是「把網站做出來」，而是**先把前台的形體、節奏、互動與素材需求一次講清楚，讓之後施工不會把錯誤假設做實**。

## **B. 這一輪的工作定位**

### **判斷基底**

**A. 品牌已知**  
 你們品牌要守的不是一般植物電商邏輯，而是用龜甲龍把「裂痕、時間、新生、判讀、裱框、接受不可控」轉成品牌經驗；文件也明寫這套侘寂不是做舊，而是辨識與裱框。

**B. 外部參考**  
 Odd Ritual 現站可借的是節奏、留白、品牌段落與商業段落交錯的呼吸感；不能借的是它的 commerce-first 導航、cart／checkout 心智與產品牆式資訊架構。它首頁與 collection 明確以 shop、cart、featured products、priced product cards 為主，community 與品牌段落在其後。

**C. 我的主動判斷**  
 這一輪要先做的是「審版規格」，不是 code。因為現況素材嚴重不足、會員流程有死胡同、FAQ / Contact / Business 入口分散、Selection 欄位與狀態定義也還在混用；現在直接做，等於把錯的流程和假的素材一起固化。

### **目前屬於哪個階段**

目前屬於**P0＋P1＋P2＋P3 的前台審版規格階段**：  
 先做站級母規格，再做關鍵頁版型，再做內容模板，最後拉出素材需求單。這個順序其實和既有策略文件一致。

### **這一輪交付物，和施工藍圖、正式施工的差別**

這一輪交付的是：

* 頁面該長什麼樣  
* 每區塊放什麼  
* 每個互動要解決什麼  
* 哪些素材能先用 Gemini、哪些只能 Placeholder  
* 哪些流程先做 MVP、哪些先不要碰

還**不是**：

* 前端 code  
* 元件實作  
* 後台 schema 定稿  
* 真資料上線

### **為什麼現在不該直接跳施工**

因為現況明確有 4 個前置缺口還沒被決定：

1. 素材不足，現有單株圖幾乎無法支撐新版檔案感前台。  
2. 現有會員流程登入後掉入死路，申請核准後也沒有交易閉環。  
3. FAQ 偏成養護百科，Support／交易守則沒站穩。  
4. Selection 目前的 `status` 混了業務狀態與培育階段，若不先重定義，前台列表會越做越亂。

## **C. 接下來你的工作安排**

我建議的唯一主順序如下：

1. **先定死站級母規格**  
    把色盤、字體、間距、圖片語言、按鈕、表單、動畫、Placeholder 規則先鎖。  
    原因：這是所有頁面的共同語言；不先鎖，後面每頁都會各講各的。

2. **先做首頁審版稿**  
    首頁要先把品牌的第一眼、選物入口、標準入口、關係入口定下來。  
    原因：首頁是全站節奏母板。

3. **再做 Selection 系統**  
    先把列表頁、詳情頁、批次上架方式、小苗與未來精品的共骨架定義出來。  
    原因：這是現在最接近現金流、也最容易因素材不足而做歪的主戰場。

4. **再做 Membership / Account / Apply / Follow / Aftercare 流程**  
    把登入、補資料、追蹤、申請、等待、成交、售後連成一條。  
    原因：現況最大掉單點就在這裡。

5. **再做 Support 系統與 FAQ 分層**  
    先決定什麼能公開問、什麼必須登入、什麼要綁 Plant / Application。  
    原因：如果這層不先定，客服入口會繼續散。

6. **再補 Standards / Cultivation / Story 的靜態母頁規格**  
    這些頁先做成穩定母頁，不做高頻更新中心。  
    原因：現有報告已明說 `/posts` 在無供稿能力時容易變廢墟。

7. **再拉 Gemini 素材清單與資料夾命名規則**  
    先把要生什麼、放哪裡、哪些不能當最終商用圖講清楚。  
    原因：Gemini 只能照 prompt 生成，不會幫你判斷該生成什麼。

8. **最後才進頁面級 mockup／prototype**  
    靜態頁先做 review mockup，流程頁再做 prototype。  
    原因：先看形，再驗路。

## **D. 全站層級的前台設計規格**

### **1\. 色彩系統**

| 色名 | 色碼 | 用途 |
| ----- | ----- | ----- |
| Ink | `#1C1A17` | 主文字、深色按鈕、深色區塊主底 |
| Soil Dark | `#2A241F` | Hero 深底、深色 section、footer |
| Paper Warm | `#F3EFE7` | 全站主背景、淺底頁面 |
| Clay | `#D9CBBB` | 次背景、卡片底、placeholder 底 |
| Stone | `#B7AEA3` | 邊框、分隔線、disabled 邊界 |
| Oxide | `#8B6F5C` | 次標、輔助 label、hover 細節 |
| Moss | `#6F7B44` | 品牌唯一活色，用於「新綠／生命感」重點 |
| Sand Alert | `#C3A46A` | 狀態提醒、審核中、待補資料 |
| Umber Error | `#7A3E2F` | 錯誤、拒絕、問題回報 |
| Chalk | `#FAF8F4` | 深底反白文字 |

**用法規則**

* 全站不要用純黑 `#000`、純白 `#FFF`。  
* 全站唯一明顯有生命感的色，保留給 `Moss`，不要拿去做大面積 UI 裝飾。  
* 狀態色只進狀態元件，不進品牌主視覺。

### **2\. 字體 / 字重 / 文字節奏**

* **標題字**：`Noto Serif TC` / `Source Han Serif TC`，`600–700`  
* **內文字**：`Noto Sans TC` / `Inter`，`400–500`  
* **Specimen code / Batch code / 日期**：`IBM Plex Mono`，`500`

**字級節奏**

* H1：桌機 56 / 手機 36  
* H2：桌機 36 / 手機 28  
* H3：桌機 24 / 手機 20  
* Body L：18  
* Body：16  
* Meta：13–14

**規則**

* 標題短，段落短，caption 要能獨立成立。  
* 一行中文以 22–30 字為舒適上限；正文欄寬控制在 560–680px。

### **3\. 間距、留白、版面密度**

* 8px 基準網格  
* Section 上下留白：桌機 `96–140px`，手機 `56–88px`  
* 卡片內距：`20–28px`  
* 主內容最大寬度：`1200px`  
* 文字區塊最大寬度：`680px`

**規則**

* 一屏只做一個主判斷。  
* 大圖後面接短段，不接長文牆。  
* 不做滿版瀑布流，不做高密度電商陳列。

### **4\. UI 元件語言**

**按鈕**

* Primary：深底淺字，直角或極小圓角 `4px`  
* Secondary：透明底＋細框  
* Text CTA：底線或細箭頭，不做膨脹式 hover

**卡片**

* 直角或 `4px` 圓角  
* 無厚陰影  
* 以邊界、留白、字距分層，不靠浮誇陰影

**標籤**

* 小、窄、克制  
* 例如 `CURRENT / ARCHIVED / SEEDLING / PREMIUM`  
* 初期小苗不做大面積 S/A/B badge

**表單**

* 全部走直式堆疊  
* 一次只露必要欄位  
* helper text 必須比 placeholder 清楚

**通知**

* 用 inline banner / status pill  
* 不用 `alert()` 阻斷流程。現況已被盤出 alert 阻擋體驗粗糙。

### **5\. 圖片使用邏輯**

* 一個區塊只用一張主圖或一組同類型圖  
* 優先：自然光、側光、近距、材質層次  
* 商品頁優先真實記錄圖，不用 AI 假產品圖  
* AI 只拿來補：  
  * 氣氛主視覺  
  * 材質／牆面／紙張紋理  
  * 抽象裂痕與新綠對照  
  * empty state / placeholder graphic

### **6\. 動畫 / 特效 / 互動原則**

**值得做**

* 進場淡入／位移 `180–320ms`  
* 圖片 hover 的輕微 zoom `1.02`  
* CTA hover 的字距或底線變化  
* list/detail 的狀態切換動畫  
* 手機上 detail CTA sticky bar

**不要做**

* 長 preloader  
* 大幅 parallax  
* 會讓植物失真的濾鏡動畫  
* 重型 custom cursor  
* 疊太多 grain / dust / fake film

### **7\. 桌機與手機的呈現差異**

**桌機**

* 可以保留較大的留白與 split layout  
* Selection detail 可用左右雙欄：圖像 / 資訊

**手機**

* Hero 改單欄  
* Detail 圖片優先，CTA 固定底部  
* FAQ 改手風琴  
* 避免 hover-only 互動；所有關鍵動作都要有點擊版

### **8\. Placeholder 的使用原則**

* Placeholder 必須誠實，不假裝是真圖。  
* 商品缺圖時，先用：  
  * 規範化框線  
  * shot type 標示  
  * specimen code / batch code  
  * “Image Pending” / “Detail Pending” 這種明確訊息  
* 不能拿 Gemini 假造實際可販售個體細節，尤其是小苗與精品的主圖。

### **9\. 哪些效果值得做，哪些不要做**

**值得做**

* 單一主體 hero  
* 抽象材質背景  
* 克制的 hover  
* batch 導覽條  
* 清楚的狀態卡  
* 檔案式資訊排版

**不要做**

* 滿版日文  
* 手寫字  
* 茶道器物擺拍當品牌 shortcut  
* 仿舊破邊、裂紙、做舊貼圖  
* 首頁商品牆  
* 亮面按鈕與電商促銷標籤

### **10\. 如何讓整體「有形體、可審閱、但不會過度裝飾」**

主原則只有三條：

1. **先有固定網格與固定元件**  
2. **再讓每頁的圖片和文案進來**  
3. **所有裝飾都只能服務於「看清個體、看清標準、看清下一步」**

## **E. 首頁詳細計畫書**

首頁主方案共 **8 區**。

---

### **區 1｜Hero：單一個體＋一句主張**

**目的**  
 第一眼先打到「龜甲龍是時間留下的表面，不是一般植物商品」。

**主要內容**

* 單一主圖  
* 主標  
* 副標  
* 2 個 CTA

**視覺呈現方式**

* 深色底或暗牆空間  
* 單一個體置中偏左  
* 文字不超過 2 行主標＋2 行副標

**顏色 / 材質 / 圖片方向**

* 背景：`Soil Dark`  
* 文字：`Chalk`  
* 點綴：`Moss`  
* 圖片：側光、粗牆、單株

**特效 / 動畫 / 互動**

* 文字淡入  
* 主圖極輕微 zoom  
* CTA hover 微位移

**主要 CTA**

* `看本次 Selection`  
* `看我們怎麼判讀`

**草稿文案**

* 主標：**裂痕不是瑕疵，是時間留下來的表面。**  
* 副標：**我們不是把龜甲龍當商品堆滿，而是用選擇、判讀與養成，把值得被看見的變化裱框。**  
* CTA1：看本次 Selection  
* CTA2：看我們怎麼判讀

**需要素材**

* Hero 氣氛主圖 1 張  
* Hero 備用裁切 1 張

**Gemini 還是 Placeholder**

* 可先用 Gemini 做**氣氛主視覺**  
* 不拿它當實際販售個體圖

**Gemini 提示詞** `A quiet earthen alcove with one Dioscorea elephantipes as the single focal point, rough clay-and-straw wall texture, side natural light, restrained composition, muted soil palette, visible shell crack texture, subtle fresh green emerging from cracks, no Japanese props, no text, no logo, photorealistic editorial still life, calm and humble atmosphere, 16:9`

**資料夾路徑與檔名**

* `frontend-review-assets\01_home\hero\`  
* `rp-home-hero-room-main-16x9-v001.png`

---

### **區 2｜What We Frame：我們在看什麼**

**目的**  
 把品牌審美翻成可理解的判準。

**主要內容** 3 張短卡：

* 裂痕  
* 新綠  
* 節奏

**視覺呈現方式**

* 三欄或手機單欄  
* 每卡 1 張抽象特寫＋1 句短文

**顏色 / 材質 / 圖片方向**

* 淺底 `Paper Warm`  
* 裂痕特寫 / 新綠特寫 / 殼面節奏特寫

**特效 / 動畫 / 互動**

* 進場淡入  
* hover 僅顯示副句，不做翻牌

**主要 CTA**

* `展開 Standards`

**草稿文案**

* 裂痕：**看殼，不是看傷。**  
* 新綠：**看新生，不是看表面完整。**  
* 節奏：**看一年怎麼長，不看一週怎麼熱鬧。**

**需要素材**

* 3 張抽象近拍  
* 1 張 section 背景紋理

**Gemini 還是 Placeholder**

* 可先用 Gemini  
* 之後若有實拍，再替換

**Gemini 提示詞**

1. 裂痕：  
    `Extreme macro of Dioscorea elephantipes shell cracks, deep texture, side natural light, muted earthy colors, no artificial gloss, highly detailed, photorealistic, 4:5`  
2. 新綠：  
    `Macro view of fresh green growth emerging between shell cracks of Dioscorea elephantipes, restrained color palette, humble natural light, photorealistic, 4:5`  
3. 節奏：  
    `Close-up of layered shell pattern showing gradual expansion and uneven growth rhythm, tactile natural surface, soft shadow, photorealistic, 4:5`

**路徑與檔名**

* `frontend-review-assets\01_home\standards-preview\`  
* `rp-home-standards-crack-macro-4x5-v001.png`  
* `rp-home-standards-green-macro-4x5-v001.png`  
* `rp-home-standards-rhythm-macro-4x5-v001.png`

---

### **區 3｜Current Batch：本次 Selection**

**目的**  
 把首頁的品牌話，接到現在真的可接近的批次。

**主要內容**

* 本次 batch 標題  
* 20 株內卡片入口  
* 批次短說明

**視覺呈現方式**

* 不做瀑布流  
* 只顯示 6 張 preview 卡  
* 底部 CTA 進完整 Selection

**顏色 / 材質 / 圖片方向**

* `Paper Warm` / `Clay`  
* 圖像以真圖為主；沒有真圖就用規範化 placeholder

**特效 / 動畫 / 互動**

* 卡片 hover 顯示第二層資訊  
* 不做自動輪播

**主要 CTA**

* `進入本次 Selection`  
* `看過往 Archive`

**草稿文案**

* 標題：**本次 Selection**  
* 副標：**初期以小苗為主。我們不假裝每一株都已經完成，而是把每一株目前值得被看見的特徵，清楚交代。**

**需要素材**

* 批次封面 1 張  
* 6 張卡片圖  
* 缺圖版 placeholder 卡板

**Gemini 還是 Placeholder**

* 卡片商品圖：**不用 Gemini**  
* 批次封面：可先 Gemini，之後換真實批次照  
* 缺圖：用 placeholder

**批次封面 Gemini 提示詞** `A restrained seedling tray scene with multiple small Dioscorea elephantipes seedlings, natural side light, calm archive-like presentation, not commercial nursery style, muted paper and clay palette, no text, photorealistic, 16:9`

**路徑與檔名**

* `frontend-review-assets\01_home\selection-preview\`  
* `rp-home-selection-batchcover-16x9-v001.png`  
* `rp-home-selection-card-placeholder-3x4-v001.png`

---

### **區 4｜Standards Preview：我們怎麼選**

**目的**  
 讓使用者知道這個品牌不是只有氣氛。

**主要內容**

* 3 個標準入口  
  * 看完成度  
  * 看裂紋與新綠  
  * 看我們如何留與捨

**視覺呈現方式**

* 左文右圖 split  
* 圖像是抽象近拍，不是清單

**主要 CTA**

* `進入 Standards`

**草稿文案**

* 標題：**標準，不是情緒。**  
* 內文：**我們不是在找最稀有的，而是在找最值得被長時間觀看的。**

**素材**

* 抽象材質圖 1 張  
* icon-like graphic 3 個

**Gemini**

* 圖可用 Gemini  
* icon-like graphic 可後做，不是現在必要

**提示詞** `A close editorial composition of Dioscorea elephantipes shell and bud, documentary tone, no decorative props, natural light, muted earthy palette, 3:2`

**路徑**

* `frontend-review-assets\01_home\standards-entry\`  
* `rp-home-standards-entry-main-3x2-v001.png`

---

### **區 5｜Cultivation Preview：怎麼對待它**

**目的**  
 把品牌的敬意落成方法，而不是只談審美。

**主要內容**

* 3 個入口：水與溫度 / 空間與盆 / 移栽與根系

**視覺呈現方式**

* 淺色底  
* 三欄卡片

**主要 CTA**

* `閱讀 Cultivation`

**草稿文案**

* 標題：**你怎麼對待它，決定你最後看到的是什麼。**  
* 副標：**我們不把養護當秘密，也不把節奏當神話。**

**素材**

* 根系／盆器／環境氛圍圖  
* 初期可 Gemini 先佔位

**提示詞** `A quiet plant care environment for Dioscorea elephantipes, deep pot, airy setup, natural light, restrained earthy tones, no product branding, documentary still life, 4:3`

**路徑**

* `frontend-review-assets\01_home\cultivation-preview\`  
* `rp-home-cultivation-environment-4x3-v001.png`

---

### **區 6｜Membership：先登入，不先神化**

**目的**  
 把會員講成關係工具，不講成菁英門票。

**主要內容**

* Google Mail 可開始  
* 追蹤、申請、售後、紀錄都綁帳號  
* 第一次申請前補最小資料

**視覺呈現方式**

* 深淺交錯卡  
* 1 個流程小圖

**主要 CTA**

* `了解 Membership`  
* `用 Google 開始`

**草稿文案**

* 標題：**不是先被挑選，是真正開始互動。**  
* 副標：**任何人都可以用 Google Mail 開始。登入之後，你可以追蹤個體、提交申請、查看紀錄，也能在成交後走完整售後路徑。**

**素材**

* 關係感氛圍圖  
* 流程圖 icon  
* empty state graphic

**Gemini**

* 氛圍圖可先用 Gemini  
* 流程圖先用簡單線框，不必 AI

**提示詞** `A calm scene of plant notes, one Dioscorea elephantipes, hands reviewing specimen notes, natural light, quiet editorial atmosphere, no laptops, no logos, no luxury styling, photorealistic, 16:9`

**路徑**

* `frontend-review-assets\01_home\membership-preview\`  
* `rp-home-membership-notes-16x9-v001.png`

---

### **區 7｜Support：先回答，再收訊息**

**目的**  
 讓使用者知道有支援，但不把首頁做成客服中心。

**主要內容**

* FAQ 三類  
* Support 入口  
* 售後需登入綁單

**視覺呈現方式**

* 低密度文字區  
* 1 張低干擾材質圖

**主要 CTA**

* `進入 Support`  
* `先看 FAQ`

**草稿文案**

* 標題：**先把該說清楚的說清楚。**  
* 副標：**入門、養護、交易與售後，會分開整理。真正需要處理的問題，再進入支援流程。**

**素材**

* 材質／紙張背景  
* 不需要人物圖

**Gemini**

* 可用

**提示詞** `Warm handmade paper texture with subtle clay and fiber feel, calm and refined, not distressed, no text, high resolution, 3:2`

**路徑**

* `frontend-review-assets\01_home\support-preview\`  
* `rp-home-support-paper-3x2-v001.png`

---

### **區 8｜Footer：安靜收尾**

**目的**  
 收工具、不搶戲。

**內容**

* Selection / Standards / Cultivation / Membership / Support / Story  
* Login / Account  
* Instagram  
* Legal

**借鏡點** Odd Ritual 的 footer 分欄與 site index / social / legal 收法值得借，但不借它的 cart 心智。

## **F. 其他主要頁面逐頁詳細計畫書**

---

### **1\) Selection / 列表頁**

**1\. 頁面目標**  
 讓人快速掃描本批次、理解差異、選出想進一步看哪幾株。

**2\. 使用者狀態**

* 未登入：可看、不可追蹤／申請  
* 已登入：可追蹤、可申請  
* 已有申請：看到狀態  
* 已售罄：只能看檔案

**3\. 區塊構成**

* 批次 Header  
* 狀態 legend  
* 篩選列  
* 卡片 grid  
* Archive 入口

**4\. 視覺與互動**

* 上方固定批次說明  
* 卡片 hover 顯示 3 個觀察點  
* 手機改 1 欄或 2 欄

**5\. 功能需求**

* filter：State / Phase / Batch  
* 排序：預設人工排序，不做分數排行  
* login 後返回原卡位置

**6\. 草稿文案**

* 標題：**Selection**  
* 副標：**先看這一批，再決定要不要靠近某一株。**

**7\. 素材需求**

* 批次封面  
* 卡片圖  
* 缺圖 placeholder

**8\. 先做 mockup 還 prototype**

* **先做 review mockup**  
* filter 與狀態切換再進 prototype

**9\. 未來升級空間**

* 增加 size / grade / premium score filter  
* 增加抽選標記與 lottery status

---

### **2\) Selection / 詳細頁（Specimen Dossier）**

**1\. 頁面目標**  
 把「這株值不值得申請」講清楚。

**2\. 使用者狀態**

* 未登入：可看 dossier，CTA 轉登入  
* 已登入未補資料：CTA 轉完成基本資料  
* 已登入可申請：可追蹤／申請  
* 已申請：可看進度  
* 已售：轉 archive 狀態

**3\. 區塊構成**

* 主圖區  
* 基本檔案資訊  
* 本株觀察  
* 養護提醒  
* CTA 區  
* 同批其他個體  
* archive / support 延伸

**4\. 視覺與互動**

* 圖片區可左右切  
* 右側固定 CTA 區  
* 手機 CTA sticky

**5\. 功能需求**

* Follow  
* Apply  
* Application status  
* Return after login  
* Archived 可取消追蹤

**6\. 草稿文案**

* 區標：**本株觀察**  
* 例句：**目前仍處於小苗階段，不以完成度論高下；這一頁只交代它現在已經成立的特徵。**

**7\. 素材需求**

* 真圖：正面、近拍、芽點、比例  
* 缺圖時用 shot placeholders

**8\. 先做 mockup 還 prototype**

* **直接進 prototype**  
* 因為 CTA 與狀態很重要

**9\. 未來升級空間**

* 未來同骨架擴充 premium score、lottery、lineage、年輪紀錄

---

### **3\) Standards**

**1\. 頁面目標**  
 讓品牌的方法站得住。

**2\. 使用者狀態**

* 全公開

**3\. 區塊構成**

* 開場主張  
* 為什麼是龜甲龍  
* 我們怎麼看  
* 我們怎麼選  
* FAQ 導流

**4\. 視覺與互動**

* 長文不超過 4 大段  
* 圖像極少，重文本節奏

**5\. 功能需求**

* anchor nav  
* 可分享段落標題

**6\. 草稿文案**

* 主標：**不是去創造侘寂，而是辨識它何時已經開始成立。**

**7\. 素材需求**

* 抽象近拍 2–3 張  
* 不需要大量圖片

**8\. 先做 mockup 還 prototype**

* **review mockup**

**9\. 未來升級空間**

* 加入評分原則與精品 release 準則

---

### **4\) Cultivation**

**1\. 頁面目標**  
 把養護態度講清楚，降低誤用與售後摩擦。

**2\. 使用者狀態**

* 全公開

**3\. 區塊構成**

* 水與溫度  
* 空間與盆  
* 移栽與根系  
* 常見錯法  
* FAQ 導流

**4\. 視覺與互動**

* 清楚的節點卡  
* 不是文章列表

**5\. 功能需求**

* anchor nav  
* expandable note

**6\. 草稿文案**

* 主標：**養護不是把它催大，而是別打亂它的節奏。**

**7\. 素材需求**

* 盆器、環境、根系圖  
* 多數可暫用 Gemini / placeholder

**8\. 先做 mockup 還 prototype**

* **review mockup**

**9\. 未來升級空間**

* 依季節加入進階文章或 downloadable guide

---

### **5\) Membership**

**1\. 頁面目標**  
 講清楚登入後能做什麼，不再神祕。

**2\. 使用者狀態**

* 未登入  
* 已登入未補資料  
* 已登入已可申請

**3\. 區塊構成**

* 會員角色說明  
* 可以做什麼  
* 第一次申請前需要補什麼  
* 流程時間線  
* CTA

**4\. 視覺與互動**

* 以流程卡為主  
* 少文字牆

**5\. 功能需求**

* CTA 依登入狀態切換  
* 完成 Google 登入後帶去正確下一步

**6\. 草稿文案**

* 主標：**先登入，再決定你要不要申請。**  
* 副標：**帳號不是門檻，是紀錄你和個體互動的地方。**

**7\. 素材需求**

* 流程圖、關係氛圍圖

**8\. 先做 mockup 還 prototype**

* **prototype**  
* 因為狀態流關鍵

**9\. 未來升級空間**

* premium lottery 問卷擴充  
* 會員優先通知

---

### **6\) Login / Account / Follow / Apply 相關頁面**

#### **Login**

* **目標**：只做 Google start，不做大篇會員論述  
* **狀態**：未登入  
* **區塊**：登入說明 / Google 按鈕 / 後續會發生什麼  
* **功能**：保留 return path  
* **文案**：**用 Google 開始。真正需要補的資料，會在你第一次申請前再問。**  
* **先做**：prototype

#### **首次補資料頁（First Apply Gate）**

* **目標**：第一次申請前補最小必要資料  
* **區塊**：基本資料 / 養護環境 / 經驗 / 同意事項  
* **功能**：儲存後回到原本 specimen  
* **未來**：premium 可加環境圖／抽選問題

#### **Account Overview**

* **目標**：把登入後的路講清楚  
* **區塊**：Profile / Following / Applications / Support  
* **功能**：狀態卡、未完成提示、快捷操作  
* **先做**：prototype

#### **Following**

* **目標**：管理關注，不再讓 archived 卡死  
* **功能**：取消關注、查看變化、轉申請

#### **Applications**

* **目標**：看到每筆申請現在在哪  
* **功能**：timeline、quoted / paid / shipped 等後續節點  
* **依據**：現況核准後斷皮，需新增 `/account/applications/:id` 詳頁。

---

### **7\) FAQ / Support / Contact**

**1\. 頁面目標**  
 把公開解答、公開聯絡、會員售後分乾淨。

**2\. 使用者狀態**

* 未登入：可看 FAQ，可送 general / business / pre-sale  
* 已登入：可看帳號內 support 記錄  
* 有訂單／申請：可送 plant-bound issue

**3\. 區塊構成**

* FAQ 分類入口  
* Contact 表單  
* 售後說明  
* account-bound support 提示

**4\. 視覺與互動**

* FAQ 類別卡  
* Contact form 單一路徑分類下拉  
* 不做開放式聊天室

**5\. 功能需求**

* 類型分流  
* honeypot \+ rate limit \+ recaptcha / turnstile  
* 登入用戶看得到自己的 support ticket

**6\. 草稿文案**

* 主標：**先把問題分對，再把答案送到對的地方。**

**7\. 素材需求**

* 幾乎不用圖，只用材質與簡單 empty state

**8\. 先做 mockup 還 prototype**

* **prototype**  
* 因為表單與狀態要驗

**9\. 未來升級空間**

* ticket message thread  
* 附件上傳  
* order-bound photo evidence

---

### **8\) Brand Story / Story**

**1\. 頁面目標**  
 提供品牌 narrative 容器，但不占主導航主位。

**2\. 使用者狀態**

* 全公開

**3\. 區塊構成**

* 短版起點  
* 為什麼是龜甲龍  
* 我們怎麼從看，走到養  
* 未來方向

**4\. 視覺與互動**

* 長文＋少量圖  
* 低曝光，放 secondary nav / footer

**5\. 功能需求**

* 無特別功能

**6\. 草稿文案** 見 J。

**7\. 素材需求**

* 1 張氣氛圖足夠

**8\. 先做 mockup 還 prototype**

* **review mockup**

**9\. 未來升級空間**

* 可加 field note、timeline、nursery history

## **G. Selection 系統詳細策略（重點）**

### **1\. 初期以 2.5–3cm 小苗為主時，前台怎麼避免看起來都一樣**

主方案：**批次化呈現＋個別輕檔案頁**。  
 不要把 80 株平鋪成沒有重點的貨架。首頁和 Selection 先講「本次 batch 的整體特徵」，再讓每株用自己的輕檔案頁承接。因為現在素材不足、狀態欄位混亂、`/collection` 維護又高度靠人肉，直接大規模散鋪只會放大疲勞。

### **2\. 是否該採每株獨立 detail page**

**要。**  
 但不是每株都做成精品級長頁，而是同一套 `Specimen Dossier` 骨架，分成：

* **Seedling Lite**  
* **Standard**  
* **Premium**

這樣初期小苗不會過度包裝，未來精品也不用重做全站骨架。

### **3\. 若數量可能很多，前台如何避免疲勞**

* 每次只主推**一批**  
* 一批預設 **20 株**  
* 以 batch 為單位進 Current，過季進 Archive  
* list 頁只露 6–12 張 preview，剩下進完整頁  
* 不做 infinite scroll  
* 不把 list 頁做成大型篩選器牆

### **4\. 一次上架約 20 株是否合理**

**合理，這就是我的主方案。**  
 原因不是美感，而是營運現實：目前 `/collection` 與 `/admin/applications` 更新高度依賴人工，且沒有排程上架機制；20 株是一個 still manageable 的審核、拍攝、上架、申請處理量。  
 80 株會同時造成：

* 視覺疲勞  
* 上架負擔  
* 狀態同步風險  
* 申請與售後混亂

### **5\. 列表頁應承擔什麼，詳細頁應承擔什麼**

**列表頁承擔**

* 批次脈絡  
* 快速比較  
* 初步篩選  
* 進入哪株的決定

**詳細頁承擔**

* 本株觀察  
* 尺寸與階段  
* 小苗目前成立的特徵  
* 追蹤 / 申請 / 進度  
* 之後的售後入口

### **6\. 初期小苗是否不該強行做完整評分**

**不該。**  
 現在先用**描述型呈現**，不用完整分數制。  
 可公開的欄位先用：

* `Batch`  
* `Specimen Code`  
* `Phase`  
* `Current State`  
* `Observed Traits`（最多 3 個）  
* `Short Note`  
* `Size Band`

理由：現況 audit 已指出 `stats` 目前是文字描述而非分數，且 status 本身也還混著業務狀態與培育階段；現在硬做完整評分，只會做出一套看起來很嚴肅、實際沒定稿的假系統。

### **7\. 如何預留未來精品級正式評分制度**

前端與資料結構預留，但**先不公開展示**：

* `symmetryScore`  
* `budCenterScore`  
* `crackMaturityScore`  
* `vitalityScore`  
* `shellDepthScore`  
* `releaseMethod`（standard / lottery / private）  
* `lineage`  
* `cultivatedBy`

等這些欄位開始有穩定定義時，再打開 UI。

### **8\. 如何預留未來抽選制 / 申請制 / 關注名單連動**

在 detail page 的 CTA 區預留同一個 `Action Module`，未來只換模式：

* 現在：`Follow / Apply`  
* 未來精品：`Follow / Register Lottery / Apply by Invitation`

同一套 account 狀態卡再擴成：

* Submitted  
* Reviewing  
* Selected  
* Not Selected  
* Quoted  
* Paid  
* Shipped

### **9\. Odd Ritual 的產品多面照呈現方式，哪些值得借鏡，哪些不要照搬**

**值得借**

* 大圖優先  
* 單張卡片以圖像帶路  
* 詳頁把圖片放在主位  
* hover 顯示第二張圖的節奏感

`reference-site-staging.html` 也保留了 product rail、hover image、CTA hover 結構，這些可當互動節奏參考。

**不要照搬**

* 直接 price / cart / quantity / checkout 心智  
* 一屏塞很多同型產品卡  
* 一套服飾零售用的產品多視角規格表

Odd Ritual 現站 collection 明顯是 retail commerce 邏輯，這不適合你們現在的小苗與未來精品混合路線。

### **10\. 我建議的唯一主方案**

**Selection 採「每批 20 株左右的批次釋出＋每株輕檔案頁＋描述型呈現＋同骨架預留未來精品評分／抽選」**。  
 這是目前最能同時兼顧：

* 現金流  
* 視覺秩序  
* 小苗階段現實  
* 未來精品擴充  
* 管理負擔

## **H. 會員 / 關注 / 申請 / 購買 / 售後 流程設計**

主方案：**取消「高門檻會員審核」作為前台核心；改成「Google 登入即建立帳號，第一次申請前補最小必要資料」**。

### **1\. 未登入訪客**

可做：

* 看 Home / Selection / Standards / Cultivation / Story / Support FAQ  
* 看單株 detail  
* 點 Follow / Apply 時，導向 `/login`

不可做：

* 追蹤  
* 提交申請  
* 查看申請與售後

### **2\. 登入後新會員**

第一次 Google 登入後：

* 若只是想逛：直接回原頁  
* 若是從 Follow / Apply 進來：先建立 account，再回原 specimen  
* 第一次真正提交 Apply 前，才要求完成**最小問卷**

### **3\. 什麼操作必須登入**

必須登入：

* Follow 個體  
* Apply 個體  
* 查看申請進度  
* 查看自己的 support / aftercare  
* Plant-bound 問題回報

可不登入：

* 瀏覽  
* 看 FAQ  
* 發 general / business / pre-sale contact

### **4\. 關注與申請怎麼區分**

**Follow**

* 表示「我想繼續看這株／這批」  
* 不代表交易承諾  
* 可收到狀態更新（未來可擴）

**Apply**

* 表示「我對這株有購買意圖」  
* 建立 application 紀錄  
* 會進入後續 quoted / paid / shipped 等狀態

### **5\. 是否該保留審核狀態**

**不保留舊式站級 Pending / Approved 會員審核作為主流程。**  
 理由：

* 現況審核依據不足，Google OAuth 只有姓名與 Email，前台卻被 Pending 擋住，這在邏輯上站不住。  
* 真正需要的不是「人先被准入」，而是「申請前補齊必要資料」。

因此前台保留的狀態應該改成：

* `Profile Incomplete`  
* `Ready to Apply`  
* `Application Submitted`  
* `Reviewing`  
* `Quoted`  
* `Paid`  
* `Preparing`  
* `Shipped`  
* `Closed`

### **6\. 是否需要 questionnaire**

**需要，但不是會員審核問卷，而是第一次申請前的最小購買／照護問卷。**

主欄位：

* 收件人姓名  
* 手機 / Email  
* 收件地區  
* 養護環境類型（選項）  
* 經驗年資（選項）  
* 你目前主要在找什麼（選項或短答）  
* 同意運送與照護須知

**先不要**要求環境照片必填。  
 原因：你現在已傾向低門檻；照片可保留為未來 premium 抽選條件，不必先堵死入口。

### **7\. 帳號頁面要先做到什麼程度**

先做到 **MVP 四區即可**：

* Overview  
* Following  
* Applications  
* Support

**不要現在做**

* dashboard 數據  
* 等級／徽章  
* CRM  
* email center

### **8\. 如何避免流程死路**

必做 6 件事：

1. Login 後保留 return path  
2. 第一次 Apply 前補資料後回原 specimen  
3. Archived item 可取消 follow  
4. 每筆 application 都有獨立詳情頁  
5. 每筆 application 都有 timeline  
6. 售後入口綁在 application detail，而不是散落表單

現況 audit 已明確指出登入不返回來源頁、Favorites 死路、核准後斷皮，這三個都必須在新流程一次修掉。

### **9\. 如何處理未來精品抽選制**

未來只在 `Action Module` 多加一步：

* `Register Lottery`  
* 抽選截止時間  
* 是否需要補額外問卷  
* 結果通知狀態

Account 內多一種狀態：

* `Lottery Registered`  
* `Selected`  
* `Not Selected`

核心是：**同一套帳號與 application 架構，先用於一般申請，未來再擴 lottery，不重做第二套會員系統。**

## **I. FAQ / 客服 / 支援系統主方案**

我的主方案：**做一個統一的 `/support`，裡面拆成 FAQ 與 Contact；真正和某株／某筆訂單綁定的售後，只能從 `/account/applications/:id` 進入。**

### **1\. FAQ 是否要分層分類**

**要。四層就夠：**

1. 新人入門  
2. 養護與節奏  
3. 會員與申請  
4. 交易／配送／售後

理由：現況 FAQ 明顯偏養護百科，缺會員、交易與售後守則。

### **2\. 客服入口是否要整合**

**要。**  
 把 `General Inquiry` 與 `Business Inquiry` 整併成一個 `/support/contact` 表單，用類型下拉分流。  
 因為現況兩支表單欄位雷同、前台入口過度分散。

### **3\. 售前是否開放非會員詢問**

**開放，但只開放 general / business / pre-sale general。**  
 不開放：

* 非會員對單株做 plant-bound 問答  
* 非會員直接發售後或異常申訴

原因：要保留售前空間，但避免垃圾訊息與大量低品質 plant-by-plant 問題。

### **4\. 售後是否限定會員使用**

**是，而且要綁 Application / Order。**  
 售後不是公共客服箱；要從 `/account/applications/:id/support` 進。  
 這樣才能解決目前「無法綁 PlantID、前台看不到留單、後台改狀態前台無感」的問題。

### **5\. 如何避免垃圾訊息**

公開表單做 5 個限制：

* 類型必填  
* 問題主旨必填  
* email 驗證  
* honeypot  
* recaptcha / turnstile  
* v1 先不開附件上傳

### **6\. 是否需要表單分流**

**需要，但在同一頁內分流，不分多頁。**  
 類型：

* 一般問題  
* 售前詢問  
* 商業合作

售後不在這裡，直接綁 Application Detail。

### **7\. 是否需要 Plant 綁定的問題回報**

**需要，但只在已登入且有申請／訂單的人那裡出現。**

### **8\. 哪些功能現在該做**

現在該做：

* `/support` 母頁  
* FAQ 四分類  
* 統一 contact form  
* account 內 application-bound support  
* support status 可回看

現在不要做：

* live chat  
* 開放式公共留言  
* 社群論壇  
* chatbot  
* public plant comment wall

## **J. 品牌故事與文案草稿包**

以下全部是**工作草稿 v0.1**，不是定稿。

### **1\. 品牌故事長版草稿**

我們喜歡龜甲龍，不是因為它稀有，也不是因為它長得像某種奇觀。  
 我們在意的是，它把時間留下來。

龜甲龍的殼不會在一夜之間變成今天的樣子。裂紋會慢慢打開，殼面會一層一層增厚，縫裡的綠會提醒你：變化沒有停止，只是沒有用喧鬧的方式發生。  
 對我們來說，這不只是植物的外表，而是一種觀看世界的方法。不是去阻止事物變化，不是刻意製造殘破感，而是在變化已經開始發生時，辨識出其中值得被保留、被觀看、被裱框的部分。

所以這個品牌不是要把龜甲龍堆成商品牆。  
 我們更在意的是：怎麼選、怎麼看、怎麼養，還有怎麼在時間很慢的情況下，仍然保持判準與敬意。  
 初期，我們以選物開始；未來，會慢慢走向更完整的自培與自有系統。  
 但不管在哪個階段，我們做的其實都是同一件事：把時間、裂痕、新生與選擇，整理成一個值得被記住的品牌經驗。

### **2\. 品牌故事短版草稿**

龜甲龍不是我們拿來販售的奇物；它是我們用來理解時間、裂痕、新生與選擇的一個載體。  
 我們不創造侘寂，我們辨識它何時已經開始成立。

### **3\. 首頁 Hero 主標 / 副標 / CTA 草稿**

**版本 A**

* 主標：裂痕不是瑕疵，是時間留下來的表面。  
* 副標：我們用龜甲龍去整理一種觀看方式：接受變化，辨識新生，替值得被長時間觀看的東西裱框。  
* CTA：看本次 Selection / 看我們怎麼判讀

**版本 B**

* 主標：不是把植物堆滿，而是把時間看清楚。  
* 副標：從裂紋、芽點、節奏到養成，這裡不是一般植物店，而是一個有標準的觀看入口。  
* CTA：進入 Selection / 閱讀 Standards

### **4\. Selection 頁草稿**

* 標題：Selection  
* 副標：這不是商品清單，而是這一批目前值得被看見的個體。  
* 說明：初期以小苗為主，因此我們不假裝每一株都已經完成；每一頁只交代它現在已經成立的特徵，和你需要知道的節奏。

### **5\. Membership 頁草稿**

* 標題：先登入，再決定你要不要申請。  
* 副標：任何人都可以用 Google Mail 開始。登入之後，你可以追蹤個體、提交申請、查看進度，也能在成交後走完整的售後路徑。  
* 補充：第一次真正提交申請前，我們只會要求最小必要資料，不把帳號做成高門檻門票。

### **6\. FAQ / Support 頁草稿**

* 標題：先把問題分對，再把答案送到對的地方。  
* 副標：入門、養護、會員與申請、交易與售後會分開整理。公開能回答的，就先公開；真正需要處理的，再進入支援流程。

### **7\. 通用 CTA 文案草稿**

* 看本次 Selection  
* 查看個體  
* 加入關注  
* 提交申請  
* 查看申請進度  
* 完成基本資料  
* 進入 Support  
* 先看 FAQ  
* 閱讀 Standards  
* 閱讀 Cultivation  
* 查看過往 Archive

## **K. Gemini 素材生成清單（非常重要）**

| 對應頁面 / 區塊 | 素材用途 | 類型 | 建議先用 Gemini | 具體提示詞 | 比例 | 尺寸 | 風格限制 | 資料夾路徑 | 檔名規則 | 備註 |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| Home / Hero | 首屏氛圍主圖 | 主視覺 | 是 | `A quiet earthen alcove with one Dioscorea elephantipes as the single focal point, rough clay-and-straw wall texture, side natural light, restrained composition, muted soil palette, visible shell crack texture, subtle fresh green emerging from cracks, no Japanese props, no text, no logo, photorealistic editorial still life` | 16:9 | 1920x1080 | 不可有文字/器物表演 | `01_home\hero\` | `rp-home-hero-room-main-16x9-v001.png` | 僅審版，不作最終商品圖 |
| Home / Hero Alt | 手機版裁切備案 | 主視覺 | 是 | 同上，但 `vertical composition, 4:5` | 4:5 | 1440x1800 | 同上 | `01_home\hero\` | `rp-home-hero-room-mobile-4x5-v001.png` | 手機 mockup 用 |
| Home / What We Frame | 裂痕特寫 | 補圖 | 是 | `Extreme macro of Dioscorea elephantipes shell cracks, deep texture, side natural light, muted earthy colors, no gloss, photorealistic` | 4:5 | 1200x1500 | 不可過暖濾鏡 | `01_home\standards-preview\` | `rp-home-standards-crack-4x5-v001.png` | 後續可換實拍 |
| Home / What We Frame | 新綠特寫 | 補圖 | 是 | `Macro of fresh green growth emerging between shell cracks of Dioscorea elephantipes, restrained palette, humble natural light, photorealistic` | 4:5 | 1200x1500 | 綠色不可過飽和 | `01_home\standards-preview\` | `rp-home-standards-green-4x5-v001.png` | 後續可換實拍 |
| Home / What We Frame | 節奏特寫 | 補圖 | 是 | `Close-up of layered shell pattern showing gradual expansion and uneven growth rhythm, tactile natural surface, soft shadow, photorealistic` | 4:5 | 1200x1500 | 不做 fake crack overlay | `01_home\standards-preview\` | `rp-home-standards-rhythm-4x5-v001.png` | 後續可換實拍 |
| Home / Current Batch | 批次封面 | 補圖 | 是 | `A restrained seedling tray scene with multiple small Dioscorea elephantipes seedlings, natural side light, calm archive-like presentation, muted paper and clay palette, no text, photorealistic` | 16:9 | 1920x1080 | 不可像育苗廣告 | `01_home\selection-preview\` | `rp-home-selection-batchcover-16x9-v001.png` | 僅批次氣氛，不代替實際商品圖 |
| Selection / Card | 缺圖佔位 | placeholder | 否 | — | 3:4 | 1200x1600 | 用純設計 placeholder | `02_selection\placeholder\` | `rp-selection-card-placeholder-3x4-v001.png` | 商品卡一律不用 AI 假圖 |
| Selection / Detail | 缺圖佔位 | placeholder | 否 | — | 4:5 | 1600x2000 | 用 shot type 模板 | `02_selection\placeholder\` | `rp-selection-detail-shotpending-4x5-v001.png` | 標記 Front / Bud / Crack / Scale |
| Standards / Hero | 觀點頁主圖 | 主視覺 | 是 | `Editorial close-up of Dioscorea elephantipes shell and bud, documentary tone, natural light, no decorative props, muted earthy palette, photorealistic` | 3:2 | 1800x1200 | 不可商業廣告感 | `03_standards\hero\` | `rp-standards-hero-main-3x2-v001.png` | 後續可換實拍 |
| Cultivation / Hero | 養護環境圖 | 主視覺 | 是 | `A quiet plant care environment for Dioscorea elephantipes, deep pot, airy setup, natural light, restrained earthy tones, documentary still life` | 4:3 | 1600x1200 | 不可像設備賣場 | `04_cultivation\hero\` | `rp-cultivation-hero-env-4x3-v001.png` | 可先佔位 |
| Membership / Preview | 關係感圖 | 補圖 | 是 | `A calm scene of plant notes, one Dioscorea elephantipes, hands reviewing specimen notes, natural light, quiet editorial atmosphere, no laptop, no logo, photorealistic` | 16:9 | 1920x1080 | 不可過度 lifestyle | `05_membership\hero\` | `rp-membership-notes-16x9-v001.png` | 審版用 |
| Support / 背景 | 紙張質地底圖 | 紋理 | 是 | `Warm handmade paper texture with subtle clay and fiber feel, calm and refined, not distressed, no text, high resolution` | 3:2 | 1800x1200 | 不能做舊過頭 | `06_support\texture\` | `rp-support-paper-3x2-v001.png` | 可長期沿用 |
| Story / Hero | 品牌故事氣氛圖 | 主視覺 | 是 | `Minimal earthen room with one single plant in a tokonoma-like focal position, soft side light, raw clay wall, quiet and humble atmosphere, photorealistic` | 16:9 | 1920x1080 | 不可有明顯日式道具 | `07_story\hero\` | `rp-story-hero-room-16x9-v001.png` | 審版用 |
| Account / Empty | 無追蹤 empty state | icon-like graphic | 是 | `Minimal monochrome editorial illustration of a specimen card and soft leaf outline, restrained, no cute style, no text` | 1:1 | 1024x1024 | 不可卡通化 | `08_account\empty\` | `rp-account-empty-following-1x1-v001.png` | 可長期當 UI 補圖 |
| Account / Empty | 無申請 empty state | icon-like graphic | 是 | `Minimal monochrome editorial illustration of an application sheet and specimen tag, restrained, no cute style, no text` | 1:1 | 1024x1024 | 不可卡通化 | `08_account\empty\` | `rp-account-empty-applications-1x1-v001.png` | 同上 |
| Shared | 淺色土牆紋理 | 紋理 | 是 | `Subtle clay-and-straw wall texture, soft natural variation, refined, high resolution, no visible objects` | 3:2 | 1800x1200 | 不可太花 | `00_brand-system\textures\` | `rp-texture-clay-light-3x2-v001.png` | 共用底圖 |
| Shared | 深色土牆紋理 | 紋理 | 是 | `Dark earthen wall texture, soft uneven tone, elegant and restrained, high resolution` | 3:2 | 1800x1200 | 不可像破牆 | `00_brand-system\textures\` | `rp-texture-clay-dark-3x2-v001.png` | 共用底圖 |
| Shared | 紙纖維紋理 | 紋理 | 是 | `Fine handmade paper fiber texture, warm neutral, refined, high resolution, no text` | 3:2 | 1800x1200 | 不可過度做舊 | `00_brand-system\textures\` | `rp-texture-paper-fiber-3x2-v001.png` | 共用底圖 |
| Shared / Motion | 光影慢移 | 動畫底 | 是 | `Subtle natural light movement across clay wall texture, slow and calm, no objects, cinematic realism` | 16:9 | 1920x1080 | 3–5 秒 loop，不炫技 | `00_brand-system\motion\` | `rp-motion-lightshift-16x9-v001.mp4` | 僅做背景，不做主視覺 |
| Shared / Placeholder | Shot type 卡板 | placeholder | 否 | — | 4:5 | 1600x2000 | 純設計模板 | `02_selection\placeholder\` | `rp-selection-shot-template-4x5-v001.png` | 給 Front / Crack / Bud / Scale 共用 |

## **L. 全站素材資料夾規劃與命名規則**

### **1\. 整體資料夾樹**

frontend-review-assets/  
├─ 00\_brand-system/  
│  ├─ textures/  
│  ├─ motion/  
│  ├─ ui-reference/  
│  └─ copy-rules/  
├─ 01\_home/  
│  ├─ hero/  
│  ├─ standards-preview/  
│  ├─ selection-preview/  
│  ├─ cultivation-preview/  
│  ├─ membership-preview/  
│  └─ support-preview/  
├─ 02\_selection/  
│  ├─ batch-cover/  
│  ├─ cards/  
│  ├─ detail/  
│  ├─ placeholder/  
│  └─ archive/  
├─ 03\_standards/  
│  ├─ hero/  
│  └─ support/  
├─ 04\_cultivation/  
│  ├─ hero/  
│  └─ support/  
├─ 05\_membership/  
│  ├─ hero/  
│  ├─ flow/  
│  └─ empty/  
├─ 06\_support/  
│  ├─ texture/  
│  ├─ empty/  
│  └─ forms/  
├─ 07\_story/  
│  └─ hero/  
├─ 08\_account/  
│  ├─ empty/  
│  ├─ following/  
│  ├─ applications/  
│  └─ support/  
├─ 09\_copy-drafts/  
│  ├─ home/  
│  ├─ selection/  
│  ├─ standards/  
│  ├─ cultivation/  
│  ├─ membership/  
│  ├─ support/  
│  └─ story/  
└─ 10\_review-exports/  
   ├─ mockup/  
   ├─ prototype/  
   └─ audit/

### **2\. 圖片命名邏輯**

`rp-[page]-[block]-[subject]-[ratio]-v001.ext`

例：

* `rp-home-hero-room-main-16x9-v001.png`  
* `rp-selection-card-placeholder-3x4-v001.png`

### **3\. 動畫檔命名邏輯**

`rp-motion-[page]-[block]-[action]-[ratio]-v001.mp4`

例：

* `rp-motion-home-hero-lightshift-16x9-v001.mp4`

### **4\. 文案草稿檔命名邏輯**

`rp-copy-[page]-[lang]-v001.md`

例：

* `rp-copy-home-zhTW-v001.md`  
* `rp-copy-membership-zhTW-v001.md`

### **5\. 版本號如何標**

* `v001`：第一版  
* `v002`：內容或畫面有實質修改  
* `v010`：可視為一輪審版完成版

不要用：

* final  
* final2  
* final-final

### **6\. AI 暫代檔如何標**

在檔名加 `tempAI`

例：

* `rp-home-hero-room-main-tempAI-16x9-v001.png`

## **M. 接下來每一步如何驗收**

### **Step 1｜先收這份「前台詳細計畫書」**

**誰做**：我  
 **你看什麼**

* 首頁敘事有沒有順  
* Selection 主方案是否站得住  
* 會員 / Support 主方案是否合理  
* 文案語氣是否接近品牌

**過關條件**

* 方向不再大改  
* 可進素材與 mockup

---

### **Step 2｜Gemini 先出「非商品」素材**

**誰做**：Gemini  
 **出什麼**

* Hero 氣氛圖  
* 材質紋理  
* Standards / Story / Membership 的輔助圖  
* Empty state 圖

**你看什麼**

* 有沒有落入廉價日式風  
* 光線與材質對不對  
* 是否太像裝飾，不像品牌背景

**過關條件**

* 可用於 review mockup，但不冒充真商品圖

---

### **Step 3｜商品頁用 Placeholder 先排版**

**誰做**：我定規格，設計/程序排版  
 **你看什麼**

* 缺圖時是否仍然清楚  
* List / Detail 是否成立  
* 不會因缺素材就看起來像爛站

**過關條件**

* 沒真圖也能審 layout  
* 不需要先等完整拍攝

---

### **Step 4｜靜態頁先做 review mockup**

頁面：

* Home  
* Standards  
* Cultivation  
* Membership  
* Story  
* Support

**誰做**：設計端  
 **你看什麼**

* 字圖比例  
* 每區塊節奏  
* 是否過度裝飾  
* 文案是否站得住

**過關條件**

* 視覺方向不再大改

---

### **Step 5｜流程頁再做 prototype**

頁面：

* Selection list  
* Selection detail  
* Login  
* First Apply Gate  
* Account overview  
* Application detail  
* Support form / order-bound support

**誰做**：程序 / prototype  
 **你看什麼**

* 登入是否帶回原頁  
* Follow / Apply 是否分清楚  
* Application 是否有 timeline  
* Archived 是否可取消 follow  
* Support 是否有綁單

**過關條件**

* 沒有死路

---

### **Step 6｜請 antigravity 出三種檢查報告**

1. **前台流程死路檢查報告**  
    看 Login、Apply、Archived、Support 是否卡死

2. **頁面素材完整度報告**  
    哪些區塊還在用 placeholder，缺哪些真實拍攝

3. **文案與 CTA 對位檢查報告**  
    看按鈕名稱與實際去處是否一致

**你看什麼**

* 是否還有說一套做一套  
* 是否還有 placeholder 過量而影響審版

---

### **Step 7｜再決定進施工**

這時才進：

* 元件拆解  
* 程式任務  
* 後台欄位補強  
* 真素材替換

## **N. 哪些東西現在不要做**

### **1\. 目前階段不該做的功能**

* 完整 premium 評分系統  
* 抽選引擎  
* cart / checkout / quantity 購物車  
* live chat  
* 公開留言牆  
* CRM / email center / loyalty system  
* 會員分級與徽章

**原因**：現在還沒有足夠素材、商品層次與營運節奏去支撐。

### **2\. 目前階段不該做的內容**

* 高頻 Journal / Posts  
* 長篇創辦人散文  
* 一大堆 FAQ 題庫  
* 過早的精品話術  
* 假裝已成熟的評分語言

**原因**：現況供稿能力不足，Posts 也已被盤出容易成廢墟。

### **3\. 目前階段不該做的視覺效果**

* 長 preloader  
* 重型 custom cursor  
* 大幅 parallax  
* fake film grain  
* 做舊貼圖  
* 假茶道場景堆滿首頁  
* 大量 AI 假產品近拍

**原因**：這些都會讓品牌從「有標準」掉成「有風格但沒判準」。

### **4\. 為什麼不該做**

因為這一輪目標是**可審閱的前台形體**。  
 不是炫技，不是一次到位，也不是先做看起來完整但實際無法維護的殼。

## **O. 最後附錄**

### **附錄 1：最終建議的工作順序（精簡版）**

1. 先收這份詳細計畫書  
2. Gemini 先出非商品氣氛圖與紋理  
3. 以 placeholder 排 Home / Selection / Membership / Support  
4. 先做靜態頁 review mockup  
5. 再做 Selection / Account / Support prototype  
6. antigravity 出流程與素材完整度檢查  
7. 過關後才拆施工任務  
8. 真商品拍攝進場後，再逐頁替換 placeholder

### **附錄 2：需要 Gemini 先生成的前 20 個素材清單**

1. Home Hero 主視覺  
2. Home Hero 手機版裁切  
3. 裂痕 macro  
4. 新綠 macro  
5. 節奏 macro  
6. Selection 批次封面  
7. Standards hero  
8. Cultivation 環境圖  
9. Membership 氣氛圖  
10. Support 紙張質地  
11. Story hero  
12. Account following empty state  
13. Account applications empty state  
14. Clay wall light texture  
15. Clay wall dark texture  
16. Paper fiber texture  
17. Light shift motion loop  
18. Support empty state  
19. Membership empty state / flow graphic base  
20. Home support preview 背景圖

### **附錄 3：Windows 可直接複製的本地端指令**

輸出資料夾：`C:\Users\User\Desktop\role-plant\role-plant\frontend-review-assets`

$root="C:\\Users\\User\\Desktop\\role-plant\\role-plant\\frontend-review-assets"  
$dirs=@(  
"00\_brand-system\\textures",  
"00\_brand-system\\motion",  
"00\_brand-system\\ui-reference",  
"00\_brand-system\\copy-rules",  
"01\_home\\hero",  
"01\_home\\standards-preview",  
"01\_home\\selection-preview",  
"01\_home\\cultivation-preview",  
"01\_home\\membership-preview",  
"01\_home\\support-preview",  
"02\_selection\\batch-cover",  
"02\_selection\\cards",  
"02\_selection\\detail",  
"02\_selection\\placeholder",  
"02\_selection\\archive",  
"03\_standards\\hero",  
"04\_cultivation\\hero",  
"05\_membership\\hero",  
"05\_membership\\flow",  
"05\_membership\\empty",  
"06\_support\\texture",  
"06\_support\\empty",  
"06\_support\\forms",  
"07\_story\\hero",  
"08\_account\\empty",  
"08\_account\\following",  
"08\_account\\applications",  
"08\_account\\support",  
"09\_copy-drafts\\home",  
"09\_copy-drafts\\selection",  
"09\_copy-drafts\\standards",  
"09\_copy-drafts\\cultivation",  
"09\_copy-drafts\\membership",  
"09\_copy-drafts\\support",  
"09\_copy-drafts\\story",  
"10\_review-exports\\mockup",  
"10\_review-exports\\prototype",  
"10\_review-exports\\audit"  
)  
New-Item \-ItemType Directory \-Force \-Path $root | Out-Null  
$dirs | ForEach-Object { New-Item \-ItemType Directory \-Force \-Path (Join-Path $root $\_) | Out-Null }

$files=@(  
"09\_copy-drafts\\home\\rp-copy-home-zhTW-v001.md",  
"09\_copy-drafts\\selection\\rp-copy-selection-zhTW-v001.md",  
"09\_copy-drafts\\standards\\rp-copy-standards-zhTW-v001.md",  
"09\_copy-drafts\\cultivation\\rp-copy-cultivation-zhTW-v001.md",  
"09\_copy-drafts\\membership\\rp-copy-membership-zhTW-v001.md",  
"09\_copy-drafts\\support\\rp-copy-support-zhTW-v001.md",  
"09\_copy-drafts\\story\\rp-copy-story-zhTW-v001.md"  
)  
$files | ForEach-Object { New-Item \-ItemType File \-Force \-Path (Join-Path $root $\_) | Out-Null }

Write-Host "Created: $root"

依據這份計畫，下一步最有效的交付不是再談骨架，而是我直接幫你把 **Home / Selection list / Selection detail / Membership / Support** 五頁壓成「逐區塊審版卡」。

