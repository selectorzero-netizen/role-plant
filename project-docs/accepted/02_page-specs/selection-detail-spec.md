結論：Selection 不能只是「承接首頁後去看商品」，而是要把首頁那套品牌判讀，落成可被觀看、比較、追蹤、申請的個體檔案系統。  
所以我給你的主方案是：Selection 用「批次入口＋個體檔案頁」雙層結構，列表頁負責建立秩序與比較，詳細頁負責把品牌判準落到單株；先誠實做出小苗階段的完成度，不假裝精品站。 你們既有資料盤點也明確指向這條路：/collection 應改名遷移為 /selection，/collection/:id 應升級成 Specimen Dossier；同時目前 Selection 圖片完整度為 0 筆達標，必須允許高品質 placeholder 先推進版面，不能把沒有的內容硬包成熟。 

1\. Selection 在整站裡的角色

首頁已經負責把「我們怎麼看龜甲龍」講清楚，Selection 的工作不是重講理念，而是把那套判準變成可以被檢驗的證據。  
原因是你前面已經把首頁鎖成品牌分流頁，而策略文件也明寫：Collection/Single Plant 不是普通商品列表，而是「前台最接近商業核心的檔案系統」，主訊息是每一株都不是同一個商品，而是可被判讀、記錄、理解的個體。

所以 Selection 要承接首頁的三個訊息：

1\. 首頁說「我們在看什麼」  
Selection 要把這句話變成可被閱讀的個體差異。

2\. 首頁說「這不是一般植物店」  
Selection 不能掉成普通商品牆。

3\. 首頁說「可以往關係與行動走」  
Selection 必須內建 Follow / Apply / Login / Account 的清楚路徑，不能再回到舊 /login \-\> /member 死路。現況盤點也已明確記錄了登入中斷、Archived 無法取消追蹤、Approved 後流程斷皮等問題。 

\---

2\. Selection 系統的唯一主方案

路由結構

我建議 Selection 這輪直接定成這 3 層：

/selection  
Current Selection 列表頁，預設就是本期批次

/selection/archive  
Archive 列表頁，專門收已結束批次與過往個體

/selection/:slug  
單株頁，統一叫 Specimen Dossier

原因：  
這樣最乾淨，也最符合你現在的前提。Audit 也已經把 /collection \-\> /selection、/collection/:id \-\> /selection/:id 當成建議遷移，並明確寫到詳細頁要升級為 Specimen Dossier、加入多圖與更完整的檔案呈現。

不採用的做法

這一輪我不建議做：

/selection/batch/:id 額外批次頁

/selection/all 全部混在一起

/selection 同時塞 current \+ archive \+ journal 入口

原因：  
現在你要的是先做出穩定的 Selection 使用方式，不是先把系統做胖。現在階段最容易做歪的，就是一開始就把資訊全攤平，最後變成首頁延長版商品牆。

\---

3\. Selection 如何延續首頁敘事

我把這條線壓成一句話：

首頁回答「為什麼值得看」，Selection 回答「現在要看哪一株、怎麼看、接下來怎麼互動」。

首頁到 Selection 的敘事接法

首頁 Hero / What We Frame：先給世界觀

首頁 Current Batch Preview：給一個「現在有東西可以看」的證據

點進 /selection：開始進入批次與個體層次

所以 /selection 不是重新自我介紹，而是首頁的第二章。

Selection 列表頁的敘事角色

列表頁不做成交頁，它做的是：

讓人理解這一批的整體特徵

讓人開始對比個體

讓人知道哪些能申請、哪些只能追蹤、哪些已歸檔

Selection 詳細頁的敘事角色

詳細頁不做品牌總論，它做的是：

把首頁說的判準，落到這一株

把這一株目前成立的特徵講清楚

把 Follow / Apply / Account / 售後路徑接起來

\---

4\. /selection 列表頁詳細規格

4-1. 頁面目標

讓使用者在 30–60 秒內 做出這三個判斷：

1\. 這一批在賣什麼階段的個體

2\. 哪幾株值得點進去看

3\. 我要先追蹤，還是直接申請

為什麼這樣設

現在的小苗階段，如果列表頁一開始就裝成精品頁，會產生你說的落差感。Audit 也很清楚：現況 100% 缺裂紋微距、芽點特寫、尺度圖，圖片完整度 0 筆 \>4 張，所以這個階段的列表頁必須用秩序與誠實感取代假成熟感。 

\---

4-2. 列表頁區塊順序

區塊 1：Selection Hero / Batch Intro

目的：把首頁品牌語氣接到本期批次。  
內容：

頁面標題：Selection

批次副標：例如 Current Batch 01

短說明 2–3 句

一張批次總體圖或抽象氣氛圖

草稿文案

主標：Selection

副標：這裡不是一般商品列表，而是這一批目前值得被看見的個體。

短段：初期以小苗為主，因此我們不假裝每一株都已經完成；每一頁只交代它現在已經成立的特徵，和你需要知道的節奏。

視覺

大圖在上，文字在左下或左側

背景色：\#F3EFE7

文字色：\#1C1A17

批次號與 meta 用等寬字

不要做

首屏直接大面積卡片牆

一開始就顯示大量價格

一開始就放篩選器壓過敘事

\---

區塊 2：Selection Legend / 系統說明列

目的：把狀態圖例放在列表頁頂部，而不是塞進 FAQ。  
這一點盤點已經明確指出：在售 / 培育中 / Archive 有什麼差別 應移到 collection 列表上方當作圖例說明，而不是躲在 FAQ；現在 FAQ 的系統說明位置是錯的。 

內容

Current：目前可申請

Observation：目前可追蹤，不開申請

Archived：僅保留檔案，不可申請

Seedling：成長階段說明，不等於品質高低

互動

桌機：橫向 legend row

手機：可折疊 info row

回饋

hover / tap 展開 1 句短解釋

不做 tooltip 亂飛

\---

區塊 3：Filter Bar

目的：篩掉干擾，但不把頁面變成資料庫工具。  
盤點已經指出：目前 status 維度混亂，未來也需要尺寸或等級類的多維篩選，但現在又不能一口氣做滿。

主方案 Phase 1 只做 3 個 filter：

Availability：Current / Observation / Archived

Stage：Seedling / Developing / Mature

Sort：Manual / Latest / Recently Archived

先不做

價格篩選

評分排序

超多 taxonomy filter

原因 現在評測維度還是字串描述，不是穩定分數，不適合做公開 ranking。

UI

sticky top bar

背景 \#F3EFE7

邊框 \#B7AEA3

選中 chip：\#1C1A17 \+ 反白字

hover 只改邊框與底色，不做大幅動畫

\---

區塊 4：Card Grid

目的：讓使用者先做比較，再決定點進哪一株。  
Odd Ritual 的 collection page 可借的是：大圖優先、產品代碼與單一 CTA 很清楚；但它也是標準 retail shop，有 cart、checkout、價格主導，所以我們只借它的掃描節奏與 metadata 表達，不借 shop/cart 心智。它的 collection 直接列出代碼、View Product、價格；首頁也把 Featured Products 明確放成商品牆。

卡片規格

卡片結構

1\. 主圖（3:4）

2\. Specimen ID

3\. Availability label

4\. Stage label

5\. 名稱 / 暫定稱呼

6\. 一句觀察摘要

7\. View Dossier CTA

卡片不放

大段說明

一堆數值

很大的價格字

過度分級標章

卡片高度

桌機：固定高

手機：流式但保持圖像比例一致

每列數量

桌機：3 欄

平板：2 欄

手機：1 欄

卡片 hover

圖片微放大 1.02

meta 區塊出現第二層短摘要

不做強烈陰影，不做翻牌

卡片摘要句型（草稿）

芽點穩定，殼面仍在早期展開。

裂紋未深，但整體節奏完整。

現階段重點不在完成度，而在成長潛力。

\---

區塊 5：Archive 引導

目的：把過去個體變成品牌檔案證據，而不是消失。  
這件事也回應你說的落差感：如果現在小苗階段還沒到精品級，Archive 正好補上「品牌並不是只有當下這批小苗」的時間厚度。

內容

Archive 短說明

一個 CTA：View Archive

文案草稿

不是每一株都會留在 Current Selection。歸檔，不代表價值消失；它只是從交易現場，回到品牌檔案。

\---

5\. /selection/:slug 詳細頁詳細規格

這頁的正式名稱我建議固定成：  
Specimen Dossier

原因：  
Audit 已經明寫詳細頁應升級為 Specimen Dossier；這個命名也比 Single Product 更符合檔案感與品牌定位。

5-1. 頁面目標

讓使用者完成這四件事：

1\. 看懂這一株目前處於哪個階段

2\. 看懂你們在看它什麼

3\. 判斷我要 Follow 還是 Apply

4\. 知道如果登入或申請後會發生什麼

\---

5-2. 區塊順序

區塊 1：Top Meta \+ Return

內容

返回 Selection

Specimen ID

Availability

Stage

目的 先把人安放在系統裡，不讓他迷路。

\---

區塊 2：Hero Gallery

內容

主圖

4 個 shot slot：

Full body

Crack close-up

Bud close-up

Scale / hand / environment

這一套 shot requirement 和現有 audit 的建議完全一致：每株 Selection 至少要有 1 張全身、2 張裂紋微距、1 張芽點、1 張尺度參照。

如果素材不足

不用假圖冒充真圖

用明確 placeholder：

SHOT PENDING / CRACK

SHOT PENDING / BUD

SHOT PENDING / SCALE

\---

區塊 3：Specimen Summary

內容

名稱 / 暫定稱呼

一句主摘要

基本資訊：

ID

Stage

Availability

Size band

Batch

主摘要句型（草稿）

這株目前仍處於小苗階段，價值不在完成，而在節奏是否成立。

\---

區塊 4：Reading Focus

目的 把首頁那套品牌判準，落到這一株。  
策略文件已經把這個品牌核心定義成：不是賣植物，而是賣「選擇、培育、判讀、維持」，而裂紋、芽點、季節狀態是這套判讀的可見證據。

內容 固定 3 個欄位：

Geometry / 比例

Surface / 殼面與裂紋

Vitality / 芽點與生命狀態

初期不要做

數值評分

雷達圖主導頁面

原因 目前 stats 仍是字串評價，還不是穩定評分系統。

草稿文案模板

Geometry：目前殼體仍小，但整體輪廓已可觀察其未來走向。

Surface：裂紋尚淺，現階段更重要的是表面節奏是否自然、是否有不均壓力痕跡。

Vitality：芽點穩定與否，比早期外觀完整度更值得被優先記錄。

\---

區塊 5：State Record

目的 補上目前網站最缺的「狀態說明」。  
Audit 已指出 status 維度混亂、FAQ 又錯位，導致使用者對 Current / Observation / Archive 的理解不在正確位置。 

內容

當前狀態

可做的事

你現在不能做的事

範例

Current：可申請，可追蹤

Observation：可追蹤，暫不開放申請

Archived：僅供閱讀與取消追蹤

\---

區塊 6：Action Module

這一區是 detail page 的轉換核心。

按鈕階層

第一主按鈕：

Current → Apply

Observation → Follow

Archived → Remove from Following（如果已追蹤）

第二按鈕：

Log in to Continue / View Account

回饋方式

不准再用 alert 阻擋  
Audit 已明確指出目前依賴 alert() 阻擋 Pending 動作，體驗粗糙。

主方案

未登入：開 bottom sheet，說明登入後發生什麼，保留 return path

已登入未完成資料：開 first apply gate

已登入可用：直接 Follow / Apply

Archived 已追蹤：給 Remove from Following

這裡一定要修掉的舊問題

登入後帶回原 specimen

Archived 頁面也能取消追蹤

不再掉進 /member 死路  
現況這三個都是已確認問題。 

\---

區塊 7：Care / Transaction Note

目的 降低落差與誤解。  
因為你現在的小苗階段，如果 detail page 只講美學，使用者會以為這是精品展示；加上這段，會把預期拉回真實。

內容

初期照護提示

交易節點說明（不展開完整售後頁）

連到 Support / Account Applications

Audit 已指出目前 Approved 後沒有 Quoted / Paid / Preparing / Shipped 這些後半段節點，之後會需要 /account/applications/:id 來承接。detail 頁現階段至少要先把這條旅程講清楚。 

\---

6\. Selection 的色塊、排版、互動、動畫、回饋

6-1. Selection 專屬色塊

承接全站主色，但 Selection 再多一層狀態邏輯。

Background：\#F3EFE7

Ink：\#1C1A17

Clay Card：\#E3D8CA

Border：\#B7AEA3

Moss Accent：\#6F7B44

Observation Label：\#8E7A56

Archived Label：\#7B746D

Error / unavailable：\#7A3E2F

規則

Moss 只給生命感與主 CTA，不到處用

Archived 一律壓暗，不要還像 Current 一樣鮮明

不做高飽和色塊分類系統

\---

6-2. 排版方式

列表頁

上段大圖＋短文

中段圖例與 filter

下段 card grid

底部 archive 導流

詳細頁

上段：圖像主導，資訊靠右

中段：Reading Focus

下段：Action \+ Care \+ Related

字體

標題：Serif

內文：Sans

ID / Batch：Mono

\---

6-3. 互動方式

列表頁

hover：只揭露更多摘要，不換成第二種卡片人格

filter：即時切換，不整頁刷新

archive / current：tab 式切換或 route 切換，不做 modal

詳細頁

gallery：點擊切圖

CTA：桌機右欄 sticky；手機底部 sticky action bar

login / apply：bottom sheet，不直接硬跳新頁

\---

6-4. 動畫

可做：

Hero 圖片慢速淡入

卡片 hover zoom 1.02

filter 切換 fade 160–220ms

gallery image crossfade 180ms

CTA success toast slide up

不要做：

強 parallax

大面積 lazy reveal

旋轉卡片

重型 cursor 特效

會讓植物失真的濾鏡

\---

6-5. 回饋方式

Follow 成功

toast：Added to Following

同時 icon 變化

Apply 成功

toast：Application Submitted

CTA 區改成狀態版塊

Archived 狀態

若已追蹤：顯示 Remove from Following

若未追蹤：顯示 Archived for Record

Pending / profile incomplete

用 inline panel 說明下一步

不用 alert

\---

7\. Odd Ritual 可借鏡點：Selection 版

可借鏡

1\. 圖片先行的掃描節奏  
Odd Ritual 的 collection 頁先讓人掃圖，再看代碼與單一 CTA，這種掃描順序很適合借來做 Selection 卡片。

2\. 簡潔 meta \+ 一個明確 CTA  
它的 collection 頁把代碼、名稱、View Product、價格壓得很扁平，辨識很快；我們可以借這個節奏，但把價格權重降下來，改成 Specimen ID \+ View Dossier。

3\. 大圖與敘事段落交錯  
Odd Ritual 首頁不是純商品牆，而是 hero、about、community、featured product 交錯；這種呼吸感可以借給 Selection 的批次 Hero 與 Archive 導流。

不借

1\. Shop / Cart / Checkout 心智

2\. 價格作為第一層資訊

3\. 服飾商品式多 SKU 貨架

4\. community 與 lifestyle 語氣直接套進植物頁

原因：  
那是服飾品牌的 shop-first 結構，不是檔案式個體品牌的 Selection 結構。Odd Ritual 現站無論首頁或 collection，都明確以 Shop、Cart、Checkout 與 product wall 在帶路，這點不能照搬。

\---

8\. Selection 素材清單（Gemini \+ Placeholder）

先講原則：

商品真圖只能用實拍，不用 Gemini 假造。  
Audit 已經很明確：Selection 目前 0 筆具備 4 張以上完整圖片，而且每株至少應補 1張全身定裝 / 2張裂紋微距 / 1張芽點 / 1張尺度參照。所以 Gemini 只拿來補 Selection 的氣氛圖、抽象近拍、材質與 empty state，不拿來冒充真實可販售個體。 

A. 可用 Gemini 的素材

1\. Selection Hero 批次氣氛圖  
路徑：frontend-review-assets/02\_selection/hero/  
檔名：rp-selection-hero-batch-tempAI-16x9-v001.png  
提示詞：  
A restrained editorial scene of multiple small Dioscorea elephantipes seedlings presented as a quiet current batch, natural side light, muted clay and paper palette, archive-like mood, no text, no logo, no decorative Japanese props, photorealistic, 16:9

2\. Archive Hero 圖  
路徑：frontend-review-assets/02\_selection/archive/  
檔名：rp-selection-archive-hero-tempAI-16x9-v001.png  
提示詞：  
An archive-like arrangement of mature Dioscorea elephantipes specimens in a quiet earthen space, low-saturation palette, side natural light, calm documentary feeling, photorealistic, 16:9

3\. Crack Macro 補圖  
路徑：frontend-review-assets/02\_selection/support/  
檔名：rp-selection-support-crack-macro-tempAI-4x5-v001.png  
提示詞：  
Extreme macro of Dioscorea elephantipes shell cracks, deep tactile texture, natural side light, muted earthy color, documentary realism, 4:5

4\. Bud Macro 補圖  
路徑：frontend-review-assets/02\_selection/support/  
檔名：rp-selection-support-bud-macro-tempAI-4x5-v001.png  
提示詞：  
Macro of fresh bud emerging from Dioscorea elephantipes surface, restrained earthy palette, subtle fresh green, documentary realism, 4:5

5\. Empty State 圖  
路徑：frontend-review-assets/02\_selection/empty/  
檔名：rp-selection-empty-current-tempAI-1x1-v001.png  
提示詞：  
Minimal editorial illustration of specimen cards and one plant silhouette, monochrome earthy tone, restrained, no cute style, no text, 1:1

B. 不用 Gemini，直接做 Placeholder 的素材

1\. Specimen Full Body Placeholder  
路徑：frontend-review-assets/02\_selection/placeholders/  
檔名：rp-selection-shot-fullbody-placeholder-4x5-v001.png

2\. Specimen Crack Placeholder  
路徑：同上  
檔名：rp-selection-shot-crack-placeholder-4x5-v001.png

3\. Specimen Bud Placeholder  
路徑：同上  
檔名：rp-selection-shot-bud-placeholder-4x5-v001.png

4\. Specimen Scale Placeholder  
路徑：同上  
檔名：rp-selection-shot-scale-placeholder-4x5-v001.png

C. 實拍真圖命名規則

rp-selection-specimen-\[id\]-fullbody-4x5-v001.jpg

rp-selection-specimen-\[id\]-crack-01-4x5-v001.jpg

rp-selection-specimen-\[id\]-crack-02-4x5-v001.jpg

rp-selection-specimen-\[id\]-bud-4x5-v001.jpg

rp-selection-specimen-\[id\]-scale-4x5-v001.jpg

\---

9\. 這輪我直接鎖的實作判斷

1\. Selection 先做 /selection、/selection/archive、/selection/:slug 三層，不加 batch 詳頁。

2\. 初期不用公開數值評分。

3\. Current / Observation / Archived 與 Stage 拆成兩組 label，不再用一個混亂 status。

4\. 真商品圖只用實拍；Gemini 只補氛圍與支援圖。

5\. 列表頁不把價格做成第一層視覺。

6\. 詳細頁 Action Module 一律不用 alert。

\---

10\. 下一輪你若要我沿這份往下走，我會怎麼接

我下一輪最自然的接法，不是重講 Selection，而是把這份 Selection 詳細規格壓成：

「Selection 程序部可施工需求單 v1」  
內容會只保留：

route

page modules

field mapping

CTA state

component list

placeholder rules

Gemini asset prompt pack

\---

決策清單

1\. 決策題目：Selection 路由是否正式鎖成 /selection、/selection/archive、/selection/:slug  
我的建議：鎖定  
原因：這是現在最乾淨的三層結構，已經足夠承接 current、archive、單株，不會把批次系統做胖。  
若不先決定的風險：之後程序部會不知道列表、archive、detail 要不要拆 batch route，元件與資料 mapping 會反覆重改。

2\. 決策題目：Phase 1 是否正式採「不公開數值評分，只用描述型判讀欄位」  
我的建議：是  
原因：目前資料與圖片都不足，stats 也是文字不是穩定分數；硬做分數只會假成熟。  
若不先決定的風險：detail page 會一邊做判讀，一邊被迫塞進不穩定的雷達圖或評分 UI，之後高機率重做。

3\. 決策題目：價格是否只放在 Specimen Dossier 詳細頁，不放在列表卡片主視覺層  
我的建議：是  
原因：這樣最能保住「檔案先於交易」的品牌語氣，也最不會把 Selection 拉回普通商品牆。  
若不先決定的風險：程序部若先把價格放進卡片第一層，後面整個列表頁掃描順序都會偏成電商。

