這份《其餘頁面詳細規格總包 v1》只做一件事：把首頁與 Selection 之外的六頁補齊，讓整站延長成三條完整路徑，而不是讓首頁與 Selection 變成孤島。  
我完全沿用已定版的三層母框架，不重開方向；同時也沿用盤點裡已經確認的遷移主線：/learn 應拆成 /standards 與 /cultivation、/member 應進化成 /account、/about 與 /business 的公開聯絡應合併為統一支援入口，而動態 posts/journal 不應在第一階段成為主體。  

\---

0\. 六頁共用頁面語法

這不是新方向，只是把六頁的表達方式統一，避免它們各自長成不同網站。

共用語法 1：每頁只承擔一個唯一任務

Standards：把「怎麼看」講清楚

Cultivation：把「怎麼對待」講清楚

Membership：把「為什麼要有帳號」講清楚

Account：把「登入後現在在哪、能做什麼」講清楚

Support：把「問題怎麼分流、怎麼被處理」講清楚

Story：把「品牌為何如此看待龜甲龍」講清楚

如果不這樣切，後面頁面會互相補位，最後每頁都很滿、但沒有一頁真的清楚。

共用語法 2：頁面節奏固定

所有頁都維持同一節奏：

1\. Hero：一句主張＋一句補句

2\. 4–6 個主區塊

3\. 最後用 1–2 個 CTA 把人送去下一頁

4\. 不在頁尾重講首頁

共用語法 3：色塊與排版只做「頁面性格差異」，不改整站系統

共用底盤不變：

Ink：\#1C1A17

Soil Dark：\#2A241F

Paper Warm：\#F3EFE7

Clay：\#D9CBBB

Stone：\#B7AEA3

Oxide：\#8B6F5C

Moss：\#6F7B44

Sand Alert：\#C3A46A

Umber Error：\#7A3E2F

差異只體現在：

文字密度

圖像比例

是否偏流程 / 偏內容 / 偏工具

共用語法 4：圖片與 Gemini 使用規則

能用實拍的地方，一律優先實拍

Gemini 只補氣氛、材質、抽象近拍、empty state

Gemini 不冒充真實交易個體

placeholder 必須誠實，不假裝完整

這一點在盤點裡很明確：現階段影像素材嚴重不足，所以高品質 placeholder 是必要手段，而不是可恥補丁。

共用語法 5：檔名與資料夾規則

沿用既有 asset tree，不重排編號：

Standards → frontend-review-assets/03\_standards/

Cultivation → frontend-review-assets/04\_cultivation/

Membership → frontend-review-assets/05\_membership/

Support → frontend-review-assets/06\_support/

Story → frontend-review-assets/07\_story/

Account → frontend-review-assets/08\_account/

檔名規則：

Gemini 圖：rp-\[page\]-\[block\]-\[subject\]-tempAI-\[ratio\]-v001.png

Placeholder：rp-\[page\]-\[block\]-placeholder-\[ratio\]-v001.png

真實圖：rp-\[page\]-\[subject\]-\[shot\]-\[ratio\]-v001.jpg

\---

1\. Standards

1.1 這頁的唯一任務

把首頁那句「我們在看什麼」翻成清楚、可被理解、可被引用的判準頁。

1.2 它如何承接首頁或 Selection

承接首頁：首頁只點到為止，Standards 才把判準講完整

承接 Selection：Selection 的 Reading Focus 會用這頁的方法當來源  
Audit 也已經明確把 /learn 拆成 /standards 與 /cultivation，而且把 Standards 視為可以靜態化的核心準則母頁。 

1.3 區塊順序與每區目的

區塊	目的	主要內容	CTA

Hero	先定義「我們不是在找最稀有，而是在找最值得被長時間觀看」	主標、副標、短說明	向下捲動  
What We See	定義三個核心觀看軸	Geometry / Surface / Vitality	無  
What We Keep / Reject	把「選」與「不選」講清楚	值得保留的特徵、不值得被誤認為價值的特徵	無  
How We Read a Specimen	把抽象判準落成讀株方法	一個標準化 reading example	進 Cultivation  
Why Standards Matter	解釋這頁不是高冷，而是替 Selection 建立閱讀語法	2–3 段短文	進 Selection  
Closing CTA	把人送去下一頁	Read Cultivation / See Selection	/cultivation / /selection

1.4 色塊 / 排版 / 視覺節奏

主背景：\#F3EFE7

區塊切換底：\#EDE6DB 或 \#2A241F（深底只用在 closing CTA）

版型：文字 70 / 圖像 30

標題置左，正文欄寬 620–680px

圖像不做圖庫牆，只用 1–2 張高密度近拍＋1 個示意圖

頁面節奏要像判準手冊，不是像品牌散文或文章列表。

1.5 互動 / 動畫 / 狀態回饋

上方 anchor nav：Geometry / Surface / Vitality / Reading Example

anchor active 狀態：底線 \+ Moss

How We Read a Specimen 可用開合式註記面板

進場動畫：section fade-in 180ms

不做任何會削弱權威感的滑動特效或 parallax

1.6 CTA 與它接往哪一頁

Primary CTA：Read Cultivation → /cultivation

Secondary CTA：See Selection → /selection

1.7 草稿文案

Hero

主標：標準，不是情緒。

副標：我們不是在找最稀有的，而是在找最值得被長時間觀看的。

What We See

Geometry：看輪廓，不先看名氣。

Surface：看殼面與裂紋，不把殘破誤認為成熟。

Vitality：看芽點與節奏，不被短期熱鬧騙走。

Why Standards Matter

如果沒有標準，Selection 只會變成一堆看起來差不多的個體。

1.8 Placeholder / Gemini 素材清單

素材	用途	可先用 Gemini	提示詞	檔名	路徑

Standards Hero	首屏氣氛圖	是	Editorial close-up of Dioscorea elephantipes shell and bud, documentary tone, natural side light, muted earthy palette, no decorative props, photorealistic, 16:9	rp-standards-hero-shellbud-tempAI-16x9-v001.png	frontend-review-assets/03\_standards/hero/  
Reading Example Texture	How We Read a Specimen 背景	是	Subtle clay wall and paper texture blend, calm neutral tones, refined, no objects, high resolution, 3:2	rp-standards-reading-texture-tempAI-3x2-v001.png	frontend-review-assets/03\_standards/support/  
Annotation Placeholder	讀株示意佔位	否	—	rp-standards-reading-annotation-placeholder-16x9-v001.png	frontend-review-assets/03\_standards/support/

1.9 這頁應先做 review mockup 還是 prototype

先做 review mockup。  
原因：這頁的風險在敘事與排版，不在流程狀態。

1.10 未來升級空間

之後可加入更完整的 premium 評讀準則

可補 FAQ: 判讀常見誤解

可加入比較圖，但不是第一階段必要

\---

2\. Cultivation

2.1 這頁的唯一任務

把品牌對龜甲龍的敬意，落成可被理解、可被執行、可降低誤會的養護方法頁。

2.2 它如何承接首頁或 Selection

承接 Standards：Standards 講怎麼看，Cultivation 講怎麼對待

承接 Selection：detail page 的 Care / Transaction Note 會引用這頁語法  
Audit 已明確建議 Cultivation 作為靜態母頁，而不是高頻文章區。

2.3 區塊順序與每區目的

區塊	目的	主要內容	CTA

Hero	把「養護不是催大，是別打亂節奏」講清楚	主標、副標	向下捲動  
Seasonal Rhythm	先把時間節奏講清楚	萌發、生長、休眠、恢復	無  
Water / Temperature	把最容易做歪的點講清楚	水與溫度的邏輯	無  
Space / Pot / Root	把根系、空間、盆器講清楚	深盆、空氣、根系環境	無  
Common Mistakes	明確指出不該做什麼	常見錯法與後果	無  
Closing CTA	往 Selection 與 Support 導流	See Selection / Need Support	/selection / /support

2.4 色塊 / 排版 / 視覺節奏

主背景：\#F3EFE7

模組卡底：\#D9CBBB

重點提示底：\#EFE8D9

錯誤提示：\#7A3E2F 細節條，不做大面積

版型：

文字 60 / 圖解 40

每個主題模組用卡片型整理，不做長篇文章牆

一個模組一個重點，不用十條 checklist 把頁面塞滿

2.5 互動 / 動畫 / 狀態回饋

頁內 anchor nav：Season / Water / Root / Mistakes

Common Mistakes 可用 accordion

圖解 hover 顯示補充標籤

動畫維持 160–200ms fade，不做場景切換

2.6 CTA 與它接往哪一頁

Primary CTA：See Selection → /selection

Secondary CTA：Need Support → /support

2.7 草稿文案

Hero

主標：養護不是把它催大，而是別打亂它的節奏。

副標：方法不是秘密；真正重要的是你是否理解它的時間感。

Common Mistakes

過度暴曬不是強化，常常只是更快把節奏打亂。

太早判斷完成度，會讓你錯看小苗。

2.8 Placeholder / Gemini 素材清單

素材	用途	可先用 Gemini	提示詞	檔名	路徑

Cultivation Hero	頁首環境圖	是	A quiet plant care environment for Dioscorea elephantipes, deep pot, airy setup, natural side light, restrained earthy tones, documentary still life, 16:9	rp-cultivation-hero-environment-tempAI-16x9-v001.png	frontend-review-assets/04\_cultivation/hero/  
Seasonal Diagram Placeholder	季節節奏圖示佔位	否	—	rp-cultivation-season-diagram-placeholder-16x9-v001.png	frontend-review-assets/04\_cultivation/support/  
Root / Pot Support Image	根系與盆器說明輔圖	是	Deep pot and root-space setup for Dioscorea elephantipes, soft natural light, quiet documentary mood, muted clay palette, 4:3	rp-cultivation-rootpot-tempAI-4x3-v001.png	frontend-review-assets/04\_cultivation/support/

2.9 這頁應先做 review mockup 還是 prototype

先做 review mockup。  
原因：雖然有 accordion，但核心仍是內容節奏與資訊排序。

2.10 未來升級空間

可增加季節版提醒

可做下載版 PDF guide

可與 Support FAQ 共用答案模塊，但不在第一版做內容共編

\---

3\. Membership

3.1 這頁的唯一任務

把「帳號存在的理由」講清楚，並把登入、追蹤、申請、紀錄、售後放在同一條可理解的路上。

3.2 它如何承接首頁或 Selection

承接首頁：首頁只說 Membership 是關係入口，這頁才把它說明白

承接 Selection：Selection 的 Follow / Apply 被擋下來時，要回到這頁的邏輯，而不是舊 /member 死路  
Audit 已明確指出：目前 /membership 跳登入後缺少實質 profile 步驟，會員說明與實際登入流程錯位。 

3.3 區塊順序與每區目的

區塊	目的	主要內容	CTA

Hero	先解除誤會：不是菁英門票	主標、副標	向下捲動  
Why an Account Exists	定義帳號角色	Follow / Apply / Records / Aftercare	無  
What Happens First Time	說明第一次登入後會發生什麼	Google Start \+ 最小資料 gate	無  
What Membership Is Not	切掉錯誤期待	不是折扣卡、不是神祕審核牆	無  
Flow Timeline	把會員旅程畫清楚	Login → Complete Profile → Follow / Apply → Account	進 Account  
Closing CTA	往 Account / Selection 導流	View Account Structure / Return to Selection	/account / /selection

3.4 色塊 / 排版 / 視覺節奏

Hero 背景：\#2A241F

文字：\#FAF8F4

流程卡底：\#F3EFE7

重點 accent：\#6F7B44

提醒條：\#C3A46A

版型：

流程 60 / 內容 40

以時間線與狀態卡為主，不做大量照片敘事

文字量比 Standards 少，比 Account 多

3.5 互動 / 動畫 / 狀態回饋

流程 timeline 每一步 hover / tap 展開說明

CTA 依登入狀態切換文字：

未登入：Start with Google

已登入：Continue to Account

成功登入後顯示 inline success panel，不用 alert

3.6 CTA 與它接往哪一頁

Primary CTA：Start with Google / Continue to Account → /account

Secondary CTA：Return to Selection → /selection

3.7 草稿文案

Hero

主標：先登入，再決定你要不要申請。

副標：帳號不是門檻，是你與個體互動、紀錄與售後的起點。

What Membership Is Not

它不是折扣系統。

它不是先被挑選才准進來的舞台。

它是把 Follow、Apply、Account、Support 收在同一個地方。

3.8 Placeholder / Gemini 素材清單

素材	用途	可先用 Gemini	提示詞	檔名	路徑

Membership Hero	頁首關係感圖	是	A calm editorial scene with one Dioscorea elephantipes, handwritten specimen notes, natural side light, restrained earthy tones, no decorative props, photorealistic, 16:9	rp-membership-hero-notes-tempAI-16x9-v001.png	frontend-review-assets/05\_membership/hero/  
Flow Timeline Placeholder	會員旅程圖佔位	否	—	rp-membership-flow-timeline-placeholder-16x9-v001.png	frontend-review-assets/05\_membership/flow/  
Empty State Graphic	登入前空狀態圖	是	Minimal editorial illustration of account card, specimen tag, and subtle plant silhouette, monochrome earthy tone, no cute style, 1:1	rp-membership-empty-account-tempAI-1x1-v001.png	frontend-review-assets/05\_membership/empty/

3.9 這頁應先做 review mockup 還是 prototype

先做 prototype。  
原因：這頁的價值不只在畫面，而在登入前後 CTA 與流程說明是否對得上。

3.10 未來升級空間

可補 premium / lottery 加問卷

可補登入後回原 specimen 的明確 flow

可補 profile 完成度指標，但不是第一版必要

\---

4\. Account

4.1 這頁的唯一任務

把「登入後我現在在哪、能做什麼、下一步去哪」講清楚，避免再出現舊 /member 那種等待與死路。

4.2 它如何承接首頁或 Selection

承接 Membership：Membership 解釋帳號用途，Account 才是工具層落地

承接 Selection：Follow / Apply / Archived / Aftercare 的狀態，都要在這裡被回看  
Audit 已明確指出：/member 目前有登入中斷、追蹤死路、申請斷皮；未來需要 /account/applications/:id 等更完整的交易頁。 

4.3 區塊順序與每區目的

區塊	目的	主要內容	CTA

Account Header	先告訴使用者目前狀態	已登入、資料完整度、提醒	無  
Following	管理追蹤個體	Current / Observation / Archived	回 Selection  
Applications	看申請現在在哪一步	Submitted / Reviewing / Quoted / Paid / Preparing / Shipped	去 Support  
Support & Aftercare	看與自己相關的支援紀錄	Inquiry / 售後引導	進 Support  
Profile Summary	最小資料與可補欄位	基本資料、養護背景	無  
Closing CTA	回互動現場	Return to Selection / Need Support	/selection / /support

4.4 色塊 / 排版 / 視覺節奏

主背景：\#F7F4EE

模組卡：\#FFFFFF \+ 細邊框 \#B7AEA3

狀態條：

In Progress：\#C3A46A

Success：\#6F7B44

Issue：\#7A3E2F

布局：工具層 80 / 敘事 20

桌機：左側 section nav \+ 右側主內容

手機：segmented tabs \+ 垂直堆疊

4.5 互動 / 動畫 / 狀態回饋

Following / Applications / Support / Profile 用頁內 tabs

狀態 pill 固定位置，不跳來跳去

empty state 不用空白列表，要清楚告訴人下一步

Archived item 若已追蹤，要提供 Remove from Following

成功動作回饋用 toast / inline panel，不用 alert

4.6 CTA 與它接往哪一頁

Primary CTA：Return to Selection → /selection

Secondary CTA：Need Support → /support

4.7 草稿文案

Header

主標：Your Account

副標：這裡不是展示你的資格，而是整理你和個體之間發生過的事。

Following empty state

你還沒有加入追蹤。從 Selection 開始，先看一株你想繼續關注的個體。

Applications empty state

你還沒有提交申請。先看完一株，再決定要不要靠近。

4.8 Placeholder / Gemini 素材清單

素材	用途	可先用 Gemini	提示詞	檔名	路徑

Following Empty	追蹤清單空狀態	是	Minimal editorial illustration of specimen cards and one subtle plant outline, monochrome earthy palette, restrained, 1:1	rp-account-empty-following-tempAI-1x1-v001.png	frontend-review-assets/08\_account/empty/  
Applications Empty	申請清單空狀態	是	Minimal editorial illustration of an application sheet, specimen tag, and soft line work, monochrome earthy palette, 1:1	rp-account-empty-applications-tempAI-1x1-v001.png	frontend-review-assets/08\_account/empty/  
Status Card Placeholder	狀態卡佈局佔位	否	—	rp-account-statuscard-placeholder-16x9-v001.png	frontend-review-assets/08\_account/support/

4.9 這頁應先做 review mockup 還是 prototype

先做 prototype。  
原因：這頁是工具頁，核心是狀態與切換，不是靜態排版。

4.10 未來升級空間

後續可擴充 /account/applications/:id

可加入通知中心

可加入售後附件上傳

可加入 profile completeness 與資料更新歷程

\---

5\. Support

5.1 這頁的唯一任務

把「公開可以怎麼問、登入後如何處理、售前與售後如何分流」講清楚，讓 Support 不再只是 FAQ，也不再只是散落表單。

5.2 它如何承接首頁或 Selection

承接首頁：首頁只給輕量入口，Support 才處理公開問答與聯絡

承接 Selection / Account：Selection detail 的交易提示與 Account 的 aftercare 都要回到這裡  
盤點已經非常明確：/about 與 /business 的表單應合併、Inquiry 送出後前台無留單紀錄、Admin 改狀態前台也無感，FAQ 又偏養護百科，沒有交易與售後守則。  

5.3 區塊順序與每區目的

區塊	目的	主要內容	CTA

Hero	定義 Support 不是雜訊箱	主標、副標	向下捲動  
FAQ Categories	先把答案公開分流	Beginner / Cultivation / Membership & Apply / Order & Aftercare	無  
Contact Entry	統一公開聯絡入口	General / Pre-sale / Business 三種	提交表單  
Member-only Aftercare Note	說明什麼問題必須登入後處理	綁 Application / Account 的售後路徑	進 Account  
Response Rules	降低垃圾訊息與錯誤期待	回覆節奏、需要什麼資料	無  
Closing CTA	往 Story / Account 導流	Read the Story / Go to Account	/story / /account

5.4 色塊 / 排版 / 視覺節奏

主背景：\#F3EFE7

FAQ 區塊底：\#EFE8D9

表單區：\#FFFFFF

注意提示：\#C3A46A

錯誤 / anti-spam：\#7A3E2F

版型：

工具 70 / 內容 30

上半部是 FAQ category grid

下半部是單一聯絡表單

不做左右分裂成兩支表單

5.5 互動 / 動畫 / 狀態回饋

FAQ 用 accordion

Contact form 用單一路徑＋類型下拉

表單送出後：

success toast

inline confirmation panel

若未登入但點到售後說明，顯示 Go to Account to Continue

不做 live chat

不做漂浮客服鈕霸佔全站

5.6 CTA 與它接往哪一頁

Primary CTA：Read the Story → /story

Secondary CTA：Go to Account → /account  
未登入時改成 See Membership → /membership

5.7 草稿文案

Hero

主標：先把問題分對，再把答案送到對的地方。

副標：公開能回答的，就先公開；真正需要處理的，再進入支援流程。

Response Rules

售前可以公開問，但真正綁到某一株、某一筆申請或某一次售後的問題，必須進入帳號後處理。

5.8 Placeholder / Gemini 素材清單

素材	用途	可先用 Gemini	提示詞	檔名	路徑

Support Hero Texture	頁首低干擾背景	是	Warm handmade paper texture with subtle clay and fiber feel, refined, not distressed, no text, 3:2	rp-support-hero-paper-tempAI-3x2-v001.png	frontend-review-assets/06\_support/texture/  
FAQ Category Graphic	FAQ 類別插圖	是	Minimal editorial icon-like illustration of cards, note sheet, and subtle plant motif, monochrome earthy palette, no cute style, 1:1	rp-support-faq-categories-tempAI-1x1-v001.png	frontend-review-assets/06\_support/empty/  
Contact Form Placeholder	表單區版面佔位	否	—	rp-support-contactform-placeholder-16x9-v001.png	frontend-review-assets/06\_support/forms/

5.9 這頁應先做 review mockup 還是 prototype

先做 prototype。  
原因：FAQ 分流、表單分類、登入前後 CTA 會直接影響後面流程。

5.10 未來升級空間

可加入 ticket detail

可加檔案上傳

可與 Account 的 application detail 打通

可加 reCAPTCHA / anti-spam，但第一版規格先只保留入口與回饋

\---

6\. Story

6.1 這頁的唯一任務

提供一個補充性的品牌敘事容器，讓使用者理解這個品牌為什麼如此選、如此養、如此慢，而不是把它做成高頻內容系統。

6.2 它如何承接首頁或 Selection

承接首頁：首頁只暗示世界觀，Story 才完整說明它

承接 Support：Support 說明「怎麼問」，Story 補上「為什麼我們如此處理這件事」  
Audit 已明確提醒：/posts / Journal 如果沒有穩定供稿，很容易變廢墟，所以第一階段不該把 Story 做成高頻欄目；它應該先是一個穩定、低頻、可長留的靜態頁。

6.3 區塊順序與每區目的

區塊	目的	主要內容	CTA

Hero	先定義不是生活風故事，而是觀看方式	主標、副標	向下捲動  
Why This Plant	說為什麼是龜甲龍	時間、裂痕、新生	無  
What We Frame	說這不是做舊，而是辨識與裱框	品牌世界觀	無  
From Selection to Cultivation	說品牌不是只會選，未來也會走向自培	選、養、時間線	進 Standards  
What This Brand Will Become	說明初期與未來的差別	現在是選物起點，未來更完整	進 Selection  
Closing CTA	回到主幹	Read Standards / See Selection	/standards / /selection

6.4 色塊 / 排版 / 視覺節奏

Hero 背景：\#2A241F

內文頁：\#F3EFE7

大段落交錯底：\#E9E0D2

視覺比重：文字 60 / 圖像 40

圖像以單一強圖與材質細節為主，不做系列文章列表

Story 的節奏要像靜態展廳導言，不是部落格文章。

6.5 互動 / 動畫 / 狀態回饋

幾乎不需要功能互動

可有 margin note / side note 樣式

區塊進場淡入 180ms

不做 carousel、不做影片自動播放

6.6 CTA 與它接往哪一頁

Primary CTA：Read Standards → /standards

Secondary CTA：See Selection → /selection

6.7 草稿文案

Hero

主標：我們不是去創造侘寂，而是辨識它何時已經開始成立。

副標：龜甲龍不是奇物收藏，而是時間如何被看見的一個載體。

Why This Plant

我們喜歡它，不是因為它稀有，而是因為它把時間留下來。

What This Brand Will Become

現在從 Selection 開始，未來會慢慢走向更完整的自培與自有系統；但不管在哪個階段，我們做的都是同一件事：把值得被長時間觀看的變化留下來。

6.8 Placeholder / Gemini 素材清單

素材	用途	可先用 Gemini	提示詞	檔名	路徑

Story Hero	頁首氣氛主圖	是	Minimal earthen room with one single Dioscorea elephantipes in a tokonoma-like focal position, raw clay wall, soft side light, humble atmosphere, no decorative props, photorealistic, 16:9	rp-story-hero-alcove-tempAI-16x9-v001.png	frontend-review-assets/07\_story/hero/  
Story Support Macro	補充近拍	是	Close editorial macro of shell crack and fresh green emergence, muted earthy tones, natural light, photorealistic, 4:5	rp-story-support-crackgreen-tempAI-4x5-v001.png	frontend-review-assets/07\_story/support/  
Story Texture	材質底圖	是	Raw clay wall texture with subtle straw fibers, refined and calm, no objects, high resolution, 3:2	rp-story-texture-claywall-tempAI-3x2-v001.png	frontend-review-assets/07\_story/support/

6.9 這頁應先做 review mockup 還是 prototype

先做 review mockup。  
原因：這頁沒有流程風險，重點是敘事節奏與視覺呼吸。

6.10 未來升級空間

可補低頻 field note，但不是第一階段主體

可加品牌 timeline

可加更完整的 nursery / self-cultivation narrative，但不在這輪做

\---

7\. 三條完整路徑，現在怎麼成立

判讀路徑：Standards → Cultivation

這條路徑的作用是：  
先讓人看懂判準，再讓人知道怎麼對待它。

如果不先這樣排，最容易歪成：

只講怎麼養，卻不知道為什麼這樣養

或只講理念，卻沒有方法

關係路徑：Membership → Account

這條路徑的作用是：  
先說明帳號為什麼存在，再讓使用者進到自己的狀態工具層。

如果不這樣排，最容易歪成：

Account 像功能倉庫

Membership 像空的說明頁

支援與敘事路徑：Support → Story

這條路徑的作用是：  
先把問題分流清楚，再讓想更理解品牌的人進入 Story。

如果不這樣排，最容易歪成：

Story 搶了 Support 的工具功能

Support 沒有情境，變成冷冰冰的客服頁

\---

8\. 六頁的先後製作方式（只定稿型態，不是下一步規劃）

這裡只做頁面型態標記，方便你之後整合：

頁面	先做型態

Standards	Review Mockup  
Cultivation	Review Mockup  
Membership	Prototype  
Account	Prototype  
Support	Prototype  
Story	Review Mockup

原則很簡單：  
內容與敘事頁先 mockup，流程與狀態頁先 prototype。

\---

9\. 這一包現在已經補齊了什麼

現在整站已經不是只有：

首頁

Selection

而是已經補到：

Standards

Cultivation

Membership

Account

Support

Story

也就是說，首頁的主敘事、Selection 的個體承接、其餘頁面的路徑承接，現在已經形成一個可審閱、可對齊、可進整站整合的完整前台規格層。

\---

決策清單

本輪無新增決策。  
因為這一包的角色是把其餘頁面補齊，不重開已定事項。