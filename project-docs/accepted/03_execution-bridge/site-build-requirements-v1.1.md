A. 先給結論（1–2句）

這次 v1.1 修正版 的目的只有一個：把 v1 中仍會讓程序部誤解的規則點修乾淨，不改主結構、不重開概念。  
以下全文只做規則歧義修正，嚴格維持既定網站地圖、既定頁面集合與既定施工主線。 

\---

B. 《全站可施工需求單 v1.1 修正版》全文

《全站可施工需求單 v1.1 修正版》

A. 本輪定位

這份文件的角色是：把已定版的整站規格，壓成程序部可直接接手的單一施工母文件。  
它和「詳細規格包」的差別在於：詳細規格包回答的是「每頁應該長成什麼、怎麼說、怎麼延續敘事」；這份文件回答的是「程序部現在要做哪些 route、模組、元件、狀態、資料接線與驗收」。  
它也不是正式施工，因為它不寫 code、不下指令、不做實作，而是先把施工時不能自行腦補的邊界一次寫死。

\---

B. 整站 Route Map

1\) 正式 Route

Route	類型	曝光層級	角色

/	公開頁	高	Home，品牌主敘事與分流中心  
/selection	公開頁	高	Current Selection 列表頁  
/selection/archive	公開頁	中	Archive 列表頁  
/selection/:slug	公開頁	高	Specimen Dossier 詳細頁  
/standards	公開頁	中	判讀母頁  
/cultivation	公開頁	中	養護母頁  
/membership	公開頁	中	帳號 / 申請 / 追蹤 / 售後的角色說明頁  
/support	公開頁	中	FAQ \+ 公開表單 \+ 售後說明入口  
/story	公開頁	低	補充性的品牌敘事頁  
/login	公開頁	低	Auth Gateway，只由被擋 CTA 進入  
/account	登入後頁	中	Following / Applications / Support / Profile 工具層  
/account/applications/:id	登入後頁	低	單筆申請 / 訂單 / 售後詳情子路由

2\) 舊 Route 不再依賴

舊 Route	新處理

/collection	改名遷移為 /selection  
/collection/:id	改名升級為 /selection/:slug  
/learn	拆分為 /standards \+ /cultivation  
/about	退場；品牌長文併入 /story  
/business	退場；公開聯絡合併入 /support  
/member	退場；工具層改為 /account  
/posts	本輪不依賴、不恢復  
/admin/content\*	退場，不再作為前台內容來源  
/admin/posts\*	退場，不再作為前台內容來源  
/admin/settings	退場，不再支配前台 membership policy

3\) 本輪不納入前台交付、但保留的後台資料工具

/admin

/admin/plants

/admin/plants/:id

/admin/users

/admin/members

/admin/applications

/admin/inquiries

/admin/media

/admin/taxonomy

這些仍然是資料維護底座，但不再反向決定前台頁型、文案與路由。

\---

C. Page Modules by Page

\> 每頁只保留：page objective、module order、每個 module 的目的、主要 CTA 與去向。  
本節不重講首頁策略，也不補新頁。

\---

1\) Home

Page objective  
建立品牌主敘事，完成第一輪分流：讓人理解你們在看什麼，並送往 Selection / Standards / Cultivation / Membership / Support。

Module order

1\. Hero

2\. What We Frame

3\. Current Batch Preview

4\. Standards Preview

5\. Cultivation Preview

6\. Membership Preview

7\. Support Preview

8\. Footer

每個 module 的目的

Hero：先定義這個品牌不是一般植物站

What We Frame：把判讀語氣翻成三個最小判準

Current Batch Preview：把抽象品牌落到目前可接近個體

Standards Preview：引導使用者進入完整判讀母頁

Cultivation Preview：引導使用者理解怎麼對待植物

Membership Preview：說明帳號不是門票，而是互動工具

Support Preview：把 FAQ / 公開詢問 / 售後入口的位置說清楚

Footer：收工具入口與低曝光頁

主要 CTA 與去向

See Current Selection → /selection

Read Standards → /standards

Read Cultivation → /cultivation

What is Membership → /membership

Start with Google（未登入）→ /login

Continue to Account（已登入）→ /account

Go to Support → /support

\> Home 的 Membership Preview 若有「開始互動」性質的 CTA，一律套用：  
未登入 \= Start with Google → /login  
已登入 \= Continue to Account → /account

\---

2\) Selection（含列表與詳情）

Selection List

Page objective  
建立本期批次秩序，讓人能比較、點進、追蹤或申請，而不是把它當普通商品牆。

Module order

1\. Batch Intro

2\. Legend

3\. Filter Bar

4\. Card Grid

5\. Archive CTA

每個 module 的目的

Batch Intro：告訴使用者這一批是什麼階段、怎麼看

Legend：把 Current / Observation / Archived / Stage 解釋放在正確位置

Filter Bar：降低找株成本，但不做成重資料庫工具

Card Grid：提供掃描、比較、進入 dossier

Archive CTA：把過往個體導向檔案層，而不是消失

主要 CTA 與去向

View Dossier → /selection/:slug

View Archive → /selection/archive

Specimen Dossier

Page objective  
把首頁與 Standards 說的判準落到這一株，並承接 Follow / Apply / Account / 售後流程。

Module order

1\. Top Meta \+ Return

2\. Hero Gallery

3\. Specimen Summary

4\. Reading Focus

5\. State Record

6\. Action Module

7\. Care / Transaction Note

每個 module 的目的

Top Meta \+ Return：先把人放回系統脈絡

Hero Gallery：提供真實檔案閱讀基礎

Specimen Summary：用最短形式交代這一株是什麼

Reading Focus：把品牌判讀方式落到個體

State Record：清楚交代 Current / Observation / Archived 的差異

Action Module：承接登入、追蹤、申請

Care / Transaction Note：降低誤解，導向公開支援或既有申請詳情

主要 CTA 與去向

一般性 FAQ / 公開詢問 / 售前問題：Need Support → /support

已存在的申請/訂單相關售後：View Application Detail → /account/applications/:id

Back to Selection → /selection

狀態型 CTA（Apply / Follow / Log in to Continue / View Account）見 E 節矩陣

\> 這裡不再出現「/support 或 /account/applications/:id」這種模糊寫法。  
一般支援一律 /support；application-bound / order-bound / aftercare 一律 /account/applications/:id。

\---

3\) Standards

Page objective  
把首頁的「我們在看什麼」翻成固定、可引用的判讀母頁。

Module order

1\. Hero

2\. What We See

3\. What We Keep / Reject

4\. How We Read a Specimen

5\. Why Standards Matter

6\. Closing CTA

每個 module 的目的

Hero：先定義標準不是情緒

What We See：給出核心觀看軸

What We Keep / Reject：把選與不選講清楚

How We Read a Specimen：示範怎麼把判讀落在單株上

Why Standards Matter：說明這頁如何回到 Selection

Closing CTA：引導去 Cultivation 或 Selection

主要 CTA 與去向

Read Cultivation → /cultivation

See Selection → /selection

\---

4\) Cultivation

Page objective  
把品牌對植物的敬意，翻成可理解、可執行、可降低誤會的養護母頁。

Module order

1\. Hero

2\. Seasonal Rhythm

3\. Water / Temperature

4\. Space / Pot / Root

5\. Common Mistakes

6\. Closing CTA

每個 module 的目的

Hero：先定義養護不是催大

Seasonal Rhythm：先講節奏，再講操作

Water / Temperature：處理最容易誤解的照顧問題

Space / Pot / Root：把根系與環境說清楚

Common Mistakes：主動阻止錯法

Closing CTA：回到 Selection 或轉到 Support

主要 CTA 與去向

See Selection → /selection

Need Support → /support

\---

5\) Membership

Page objective  
把帳號在前台扮演的角色講清楚：不是門票，而是 Follow / Apply / Records / Aftercare 的入口。

Module order

1\. Hero

2\. Why an Account Exists

3\. What Happens First Time

4\. What Membership Is Not

5\. Flow Timeline

6\. Closing CTA

每個 module 的目的

Hero：先解除「高門檻會員制」的誤讀

Why an Account Exists：定義帳號的存在理由

What Happens First Time：說明首次登入與最小資料 gate

What Membership Is Not：切掉錯誤期待

Flow Timeline：把登入後的旅程說清楚

Closing CTA：導到 Account 或 Selection

主要 CTA 與去向

未登入：Start with Google → /login

已登入：Continue to Account → /account

Return to Selection → /selection

\> Membership 公開頁以及任何公開頁中「開始帳號互動」的 Membership CTA，一律只使用這套規則：  
未登入 \= Start with Google → /login  
已登入 \= Continue to Account → /account  
不允許再出現 → /account 對未登入也成立，或 → /login 或 /account 的模糊寫法。

\---

6\) Account

Page objective  
把登入後的工具層做清楚：Following、Applications、Support、Profile，不再讓人掉進舊 member dead end。

Module order

1\. Account Header

2\. Following

3\. Applications

4\. Support & Aftercare

5\. Profile Summary

6\. Closing CTA

每個 module 的目的

Account Header：告訴使用者目前狀態與是否缺資料

Following：管理追蹤個體

Applications：看申請現在在哪一步

Support & Aftercare：進入與自己有關的售後問題

Profile Summary：管理最小資料

Closing CTA：回互動現場

主要 CTA 與去向

Return to Selection → /selection

一般性 FAQ / 公開說明：Need Support → /support

已有申請 / 訂單的售後：View Application Detail → /account/applications/:id

\---

7\) Support

Page objective  
把 FAQ、公開詢問、售前與售後分流收成一個單一支援入口，不再散在 About / Business / FAQ。

Module order

1\. Hero

2\. FAQ Categories

3\. Contact Entry

4\. Member-only Aftercare Note

5\. Response Rules

6\. Closing CTA

每個 module 的目的

Hero：先定義 Support 不是雜訊箱

FAQ Categories：公開能回答的先公開

Contact Entry：統一公開表單

Member-only Aftercare Note：說明哪些必須登入後處理

Response Rules：降低垃圾訊息與錯誤期待

Closing CTA：回 Story 或 Account

主要 CTA 與去向

FAQ / General / Pre-sale / Business / 公開詢問：Go to Support Form（停留在 /support 內部表單區）

application-bound / order-bound / aftercare / plant-bound issue：View Application Detail → /account/applications/:id

Read the Story → /story

未登入且想進帳號路徑：Start with Google → /login

已登入且想進帳號路徑：Continue to Account → /account

\> Support 頁不再出現 /contact/support。  
公開支援入口只有 /support。

\---

8\) Story

Page objective  
提供補充性的品牌敘事容器，說明這個品牌為何如此看待龜甲龍，但不把它做成高頻內容系統。

Module order

1\. Hero

2\. Why This Plant

3\. What We Frame

4\. From Selection to Cultivation

5\. What This Brand Will Become

6\. Closing CTA

每個 module 的目的

Hero：定義這頁不是 lifestyle 散文

Why This Plant：說明為何是龜甲龍

What We Frame：說明品牌不是做舊，而是辨識與裱框

From Selection to Cultivation：串起選與養

What This Brand Will Become：交代現在與未來

Closing CTA：回到 Standards 或 Selection

主要 CTA 與去向

Read Standards → /standards

See Selection → /selection

\---

D. Component Inventory

1\) 全站共用元件

元件	用途	可共用頁面	備註

PageHero	每頁首屏標題區	全頁	視覺風格統一，但文字內容不可程式端腦補  
SectionIntro	模組前導短文	全頁	只接固定 copy  
ClosingCTA	頁尾導流模組	全頁	按鈕文案固定  
StatusPill	狀態標籤	Selection / Account / Support	文案與顏色走 state matrix  
FilterChipGroup	篩選列	Selection	不得拿去當 FAQ tabs  
InlineNotice	成功/提醒/錯誤提示	Selection / Membership / Account / Support	不用 alert  
Toast	輕量回饋	Selection / Account / Support	統一樣式  
EmptyStatePanel	空狀態模組	Selection / Account / Support	可用 Gemini 圖  
PlaceholderFrame	圖像缺口佔位	Selection / Standards / Cultivation	誠實標示 shot / diagram pending  
StickyActionBar	手機底部操作列	Selection Dossier / Account detail	只用在流程頁  
Accordion	FAQ / mistake list	Cultivation / Support	shadcn/ui Accordion 可承載  
Tabs / SegmentedNav	工具頁內部切換	Account / Support	shadcn/ui Tabs 可承載  
Sheet / Dialog	login gate / first apply gate / support note	Selection / Membership / Account	shadcn/ui Sheet/Dialog 可承載  
FormField \+ ValidationMessage	表單輸入	Membership / Support / Account	不自創錯誤文案

2\) 頁面專屬元件

元件	所屬頁面	用途

CurrentBatchPreview	Home	首頁批次預覽  
SpecimenCard	Selection	列表卡片  
SpecimenGallery	Selection Dossier	多 shot 圖廊  
ReadingFocusBlock	Selection Dossier / Standards	單株閱讀區塊  
SelectionLegend	Selection	Current / Observation / Archived 說明  
SeasonalRhythmDiagram	Cultivation	節奏圖  
MembershipTimeline	Membership	帳號旅程  
AccountStateBoard	Account	Following / Applications / Support 概覽  
ApplicationStateTimeline	Account Application Detail	訂單 / 申請時間線  
FAQCategoryGrid	Support	FAQ 分類入口  
SupportEntryForm	Support	公開表單  
StoryLongformBlock	Story	長文敘事區塊

3\) 哪些元件不能混用

SpecimenCard 只屬於 Selection；不能拿來當 Account 清單卡

MembershipTimeline 只屬於 Membership；不能拿來當實際訂單追蹤器

SupportEntryForm 只屬於 Support；不能拿來當 profile questionnaire

ReadingFocusBlock 可共用 Selection / Standards，但內容來源不同：Selection 讀 plants；Standards 讀靜態文案

ApplicationStateTimeline 與 MembershipTimeline 不能混，前者是狀態閉環，後者是說明旅程

\> 程序部可使用 shadcn/ui primitives 作為 Button / Tabs / Accordion / Sheet / Dialog / Toast 的承載層；但視覺、文案、狀態邏輯以本文件為準，不能回退成預設 shadcn demo 樣式。

\---

E. CTA / State Matrix

1\) Membership 公開頁 CTA 規則（全文統一）

頁面位置	未登入	已登入

/membership Hero / Closing CTA	Start with Google → /login	Continue to Account → /account  
Home 的 Membership Preview 互動 CTA	Start with Google → /login	Continue to Account → /account  
Support 中需要進帳號路徑的 CTA	Start with Google → /login	Continue to Account → /account

\> 任何公開頁中的 Membership / Account entry CTA，一律套用這套規則。  
不再允許：

→ /account 對未登入也成立

→ /login 或 /account

程序部自行判斷 CTA 去向

\---

2\) Selection / Dossier：可操作狀態矩陣

A. 依使用者狀態

使用者狀態	Current	Observation	Archived

未登入	Primary=Log in to Apply → /login（帶 return path）\<br\>Secondary=Log in to Follow → /login	Primary=Log in to Follow → /login\<br\>Secondary=Back to Selection	Primary=Archived for Record（無跳轉）\<br\>Secondary=Back to Selection  
已登入未完成資料	Primary=Complete Profile to Apply → inline/profile gate\<br\>Secondary=Go to Account → /account	Primary=Complete Profile to Follow → inline/profile gate\<br\>Secondary=Go to Account → /account	Primary=Archived for Record\<br\>Secondary=Go to Account → /account  
已登入可操作	Primary=Apply（建立 application）\<br\>Secondary=Follow（加入追蹤）	Primary=Follow（加入追蹤）\<br\>Secondary=Back to Selection	若已追蹤：Primary=Remove from Following\<br\>若未追蹤：Primary=Archived for Record

B. 一般支援 vs 已綁單支援

一般性 FAQ / 公開詢問 / 售前問題：Need Support → /support

application-bound / order-bound / aftercare / plant-bound issue：View Application Detail → /account/applications/:id

C. 列表頁卡片層

卡片主 CTA 固定：View Dossier

卡片不直接顯示 Apply / Follow

Archived 卡片視覺降階，但仍可讀 dossier

D. 統一行為規則

所有被擋下的操作都保留 return path

不使用 alert()

成功回饋用 toast \+ inline state 更新

Archived 必須可在 dossier 或 account 中取消追蹤

\---

3\) Application Lifecycle：Account 狀態矩陣

狀態	顯示位置	主按鈕	次按鈕	行為	去向

Submitted	/account、/account/applications/:id	View Application	General Support	查看已送出紀錄	/account/applications/:id  
Reviewing	同上	Awaiting Review（disabled）	General Support	顯示進度與注意事項	/support  
Quoted	同上	Review Quote	Need Order Support	查看報價與後續說明	/account/applications/:id  
Paid	同上	View Order Status	Need Order Support	顯示已付款狀態	/account/applications/:id  
Preparing	同上	View Order Status	Need Order Support	顯示備貨狀態	/account/applications/:id  
Shipped	同上	Track Aftercare	Need Order Support	進入售後 / 照護提示	/account/applications/:id  
Closed	同上	View Record	General Support	保留歷史紀錄	/account/applications/:id

\> 這裡也不再出現 → /support 或 /account/applications/:id。  
規則固定：

一般支援 → /support

與申請 / 訂單綁定的支援 → /account/applications/:id

\---

4\) Support 狀態矩陣

使用者狀態	FAQ	公開詢問	售後問題

未登入	可看	可送 General / Pre-sale / Business → /support	不可直接送；若需開始帳號路徑，CTA=Start with Google → /login  
已登入	可看	可送 General / Pre-sale / Business → /support	若尚未綁 Application，先回 /account；若已綁單，走 /account/applications/:id  
已登入且有 Application	可看	可送 General / Pre-sale / Business → /support	一律走 /account/applications/:id

\---

F. Field Mapping / Content Source of Truth

\> Phase 1 Source of Truth 只有兩種：

1\. 靜態草稿文案（來自已定版規格，不接舊 contentService）

2\. Firestore 資料：plants / applications / profiles / inquiries / favorites  
舊 contentService / policyService / postService 已退出 active app，不再作為前台內容來源。  
程序部不得自行補品牌文案、頁面目的、按鈕文案。

1\) Home

模組	欄位	Source of Truth	備註

Hero	heroTitle / heroSubtitle / ctaPrimary / ctaSecondary	靜態草稿文案	不接 CMS  
Current Batch Preview	featuredPlants\[\]	plants	query 依 availability in \[current, observation\] \+ manual sort \+ limit  
Standards / Cultivation / Membership / Support Preview	teaserTitle / teaserBody / teaserCTA	靜態草稿文案	不由程序部自行撰寫  
Membership Preview account state	isLoggedIn	auth \+ profiles	只用來決定 CTA 是 /login 或 /account

2\) Selection List

欄位	Source of Truth	備註

id / slug	plants	route key  
specimenId	plants	顯示用 ID  
title	plants	名稱或暫定稱呼  
availability	plants	current / observation / archived  
stage	plants	seedling / developing / mature  
sizeBand	plants	e.g. 2.5–3cm  
batch	plants	e.g. B01  
coverImage	plants（實拍）	無則 placeholder  
summary	plants.summaryShort	1 句觀察摘要  
sortKey	plants.sortKey	手動排序優先  
priceDisplay	plants.priceDisplay	只在 dossier 顯示，不上卡片

3\) Specimen Dossier

欄位	Source of Truth	備註

top meta (specimenId, availability, stage, batch)	plants	必填  
gallery shots	plants.images\[\]	必須支援 real / placeholder 混用  
summaryHeadline	plants.summaryHeadline	若缺，留空，不由程序補句  
readingFocus.geometry/surface/vitality	plants.readingFocus.\*	字串描述  
careNote	plants.careNote	字串描述  
priceDisplay	plants.priceDisplay	dossier 顯示；卡片不顯示  
follow state	favorites \+ auth \+ profiles	依登入者與 specimen 計算  
apply state	applications \+ auth \+ profiles	依登入者與 specimen 計算  
CTA labels	靜態 action map	不由程序臨時命名

4\) Standards / Cultivation / Story

這三頁 Phase 1 一律當靜態母頁。

頁面	欄位來源	備註

Standards	靜態草稿文案 \+ Gemini/support assets	不接 CMS  
Cultivation	靜態草稿文案 \+ Gemini/support assets	不接 CMS  
Story	靜態草稿文案 \+ Gemini/support assets	不接 CMS

5\) Membership

欄位	Source of Truth	備註

hero / timeline / explainer copy	靜態草稿文案	不接 CMS  
auth ready / profile complete	auth \+ profiles	CTA 切換依此判斷  
first apply gate fields	profiles	收件資訊、環境、經驗等最小欄位  
CTA labels	靜態 action map	公開 CTA 僅兩種：/login 或 /account

6\) Account

模組	欄位	Source of Truth

Header	account status / profile completeness	profiles  
Following	followed specimen list	favorites \+ plants  
Applications	application list \+ application status	applications \+ plants  
Application Detail	timeline / state / support anchor	applications \+ plants \+ inquiries  
Support Summary	own inquiry records	inquiries  
Profile Summary	personal fields	profiles

7\) Support

模組	欄位	Source of Truth	備註

FAQ Categories	category titles / answers	靜態草稿文案	Phase 1 不做 CMS  
Public Contact Form	type / subject / body / email	inquiries	一般 / 售前 / 商業合作  
Member Aftercare	application-bound issue	inquiries \+ applications	綁 /account/applications/:id  
response rules copy	靜態草稿文案	不由程序部補字	

8\) 驗收時要檢查的 Firestore 來源

plants

applications

profiles

inquiries

favorites

\> 前台 Phase 1 若用到動態資料，必須能回指到這 5 個 collections 之一；  
不可前面少寫、後面偷偷使用。

\---

G. Placeholder Rules / Gemini Asset Pack

1\) 總規則

1\. Selection 的商品真圖只能用實拍。

2\. Gemini 只可用於：

Hero 氣氛圖

材質 / 紙張 / 牆面紋理

抽象近拍

empty state

icon-like graphic

3\. Placeholder 只可用於：

缺 shot 的 Selection gallery

圖解 / 流程 / diagram 尚未完成的靜態支援圖

4\. 程序部不可自行把 tempAI 當最終商用主圖。

2\) 命名規則

Gemini：rp-\[page\]-\[block\]-\[subject\]-tempAI-\[ratio\]-v001.png

Placeholder：rp-\[page\]-\[block\]-placeholder-\[ratio\]-v001.png

實拍：rp-\[page\]-\[subject\]-\[shot\]-\[ratio\]-v001.jpg

3\) 每頁素材來源矩陣

頁面	只能實拍	可用 Gemini	只能 Placeholder	資料夾路徑

Home	Current Batch card 實際 specimen 圖	Hero / support texture / empty	批次 preview placeholder	frontend-review-assets/01\_home/  
Selection	所有 specimen 實際圖（cover、gallery）	Hero batch 氣氛圖、archive hero、empty state	shot pending placeholders	frontend-review-assets/02\_selection/  
Standards	無必須實拍	Hero / crack macro / texture	annotation diagram	frontend-review-assets/03\_standards/  
Cultivation	若有實際環境圖可用	hero / root pot support image	seasonal diagram placeholder	frontend-review-assets/04\_cultivation/  
Membership	無必須實拍	hero / empty state / icon graphic	timeline placeholder	frontend-review-assets/05\_membership/  
Support	無必須實拍	paper texture / faq category graphic	contact form placeholder	frontend-review-assets/06\_support/  
Story	無必須實拍	hero / macro support / wall texture	longform image placeholder	frontend-review-assets/07\_story/  
Account	無必須實拍	empty state / subtle icon graphic	status board placeholder	frontend-review-assets/08\_account/

4\) Selection 實拍命名範例

rp-selection-specimen-RP001-fullbody-4x5-v001.jpg

rp-selection-specimen-RP001-crack-01-4x5-v001.jpg

rp-selection-specimen-RP001-crack-02-4x5-v001.jpg

rp-selection-specimen-RP001-bud-4x5-v001.jpg

rp-selection-specimen-RP001-scale-4x5-v001.jpg

5\) tempAI 檔名範例

rp-home-hero-room-main-tempAI-16x9-v001.png

rp-standards-hero-shellbud-tempAI-16x9-v001.png

rp-membership-empty-account-tempAI-1x1-v001.png

\---

H. Mockup vs Prototype Matrix

頁面	Review Mockup	Lightweight Prototype	原因

Home	必要	選做	先看敘事、模組節奏與分流是否成立  
Selection List	必要	必要	要同時驗 card 掃描與 filter / CTA 行為  
Specimen Dossier	必要	必要	要驗 gallery / CTA / login return path / archived behavior  
Standards	必要	不必先做	核心風險在敘事與排版，不在流程  
Cultivation	必要	不必先做	同上；accordion 可後接  
Membership	必要	必要	Phase 2 先做靜態敘事殼；Phase 3 再做 CTA / login state / first-step flow prototype 驗證  
Account	必要	必要	核心在 tabs / empty state / application detail 狀態是否清楚  
Support	必要	必要	FAQ 分流、公開表單、登入後售後入口都要驗  
Story	必要	不必先做	核心在長文節奏與視覺呼吸

\---

I. 分段施工順序

Phase 1｜Shell / Route / Shared Design System

先做什麼

建立正式 route shell

建立 shared layout / nav / footer / page hero / CTA / status / toast / empty state / tabs / accordion / sheet / dialog 基礎元件

把 retired route 全部從 active frontend 切乾淨

為什麼先做

不先建立共用底盤，後面八頁會各做各的

不先定正式 route，後面 prototype 會一直掛舊 path

若不先做的風險

頁面先做了，最後又要回頭改 shell、改 route、改 shared component

返工最大

驗收看什麼

Route map 與本文件一致

共用元件命名與職責一致

retired route 不再被 active app 依賴

\---

Phase 2｜靜態公開頁

頁面

Home

Standards

Cultivation

Story

Membership（只做靜態敘事殼）

為什麼先做

這些頁的核心是敘事與文案，不需要等複雜狀態

先把公開敘事頁做穩，後面流程頁才不會像孤立工具

若不先做的風險

先做流程頁會讓網站像後台工具，不像品牌前台

驗收看什麼

模組順序與本文件一致

CTA 去向正確

靜態 copy 不是程序臨時腦補

Membership 這一階段只驗敘事殼，不驗登入狀態

\---

Phase 3｜Selection / Membership / Account / Support 流程頁

頁面

Selection List

Specimen Dossier

Membership（CTA / login state / first-step flow prototype）

Account

Support

/account/applications/:id

為什麼先做

這是整站真正的操作核心：看株、追蹤、申請、售後

Membership 的流程價值會在這裡被驗證

若不先做的風險

你表面上有完整站，但實際一按就回到空殼或死路

Membership 若只停在 Phase 2，程序部會誤以為它只是靜態說明頁

驗收看什麼

login 後回原頁

Current / Observation / Archived 行為正確

Account 中 Following / Applications / Support 邏輯清楚

Support 分流有效

Membership CTA 在公開頁中確實依登入狀態切換：

未登入：Start with Google → /login

已登入：Continue to Account → /account

\---

Phase 4｜內容與狀態接線

要接的資料

plants

applications

profiles

inquiries

favorites

auth state

為什麼先做

前面模組與流程都對了，這時候再接實際資料，最容易看出真實問題在哪

若不先做的風險

程序部邊接資料邊改頁面目的，最後 source of truth 混掉

驗收看什麼

每個欄位都能回指到 source of truth

status 不再混 availability / stage

favorites 已實際接入 Following 與 dossier follow state

contentService / policyService / postService 不再被前台依賴

\---

Phase 5｜驗收與素材替換

要做什麼

用 placeholder / tempAI 先完成對位

按規則替換實拍 specimen 圖

補空狀態、缺 shot placeholder、support icon graphic

為什麼最後做

素材替換是收尾，不應主導結構

尤其 Selection 圖像目前短缺，先等真圖會卡死進度

若不先把結構做好就等素材

會讓工程停在美術等待上

而不是先把正確的框架跑起來

驗收看什麼

tempAI、placeholder、實拍邊界清楚

Selection 真圖只用實拍

所有空狀態都有對應圖或 placeholder，不出現空白黑洞

\---

J. 最終驗收清單

Route / Shell

\[ \] 正式 route 與本文件一致

\[ \] 舊 /collection /learn /about /business /member /posts 不再被 active frontend 依賴

\[ \] /login 為低曝光 auth gateway，不承擔舊 member dashboard 功能

\[ \] 公開支援入口全文只有 /support

\[ \] 不再出現 /contact/support

CTA / State

\[ \] Home Membership Preview 的帳號互動 CTA 依登入狀態正確切換

\[ \] Membership 公開頁 CTA 規則全文一致：

未登入：Start with Google → /login

已登入：Continue to Account → /account

\[ \] Selection List 卡片只進 dossier

\[ \] Dossier 在未登入 / 已登入未完成資料 / 已登入可操作三種狀態下 CTA 正確

\[ \] Current / Observation / Archived 的按鈕文案與行為正確

\[ \] Submitted / Reviewing / Quoted / Paid / Preparing / Shipped / Closed 的 Account 狀態文案與去向正確

Flow

\[ \] login 後回原頁

\[ \] Archived 可取消追蹤

\[ \] Apply 成功後進入 applications timeline

\[ \] Support 分流清楚：

一般性 FAQ / 公開詢問 / 售前 / 商業合作 → /support

application-bound / order-bound / aftercare / plant-bound issue → /account/applications/:id

\[ \] /account/applications/:id 存在且能承接售後與狀態閉環

Content / Source of Truth

\[ \] 程序部沒有自行撰寫品牌標題、按鈕文案、頁面目的

\[ \] Standards / Cultivation / Story / Membership / Support FAQ Phase 1 皆吃靜態草稿文案

\[ \] Selection / Account / Support 的動態資料只從 plants / applications / profiles / inquiries / favorites 來

\[ \] favorites 已被列入 Source of Truth，且不是隱性依賴

Assets

\[ \] Selection 真圖只用實拍

\[ \] tempAI 只用在允許區塊

\[ \] placeholder 有統一命名與路徑

\[ \] mockup / prototype 所用資產類型標記清楚

Mockup / Prototype

\[ \] Home / Standards / Cultivation / Story 先以 mockup 驗節奏

\[ \] Membership Phase 2 先驗靜態敘事殼，Phase 3 再驗 CTA / login state / first-step flow prototype

\[ \] Selection / Account / Support 先以 prototype 驗流程

\[ \] mockup / prototype 與本文件的 page objective 和 module order 對位

\---

C. 變更清單

1\. 修正項目

Membership 公開頁 CTA 規則統一寫死

原 v1 問題  
原文中 Membership 相關 CTA 有時寫成 → /account，有時寫成 → /login 或 /account，會讓程序部自行判斷。

修正後規則  
所有公開頁中的 Membership / 帳號互動 CTA 一律統一成：

未登入：Start with Google → /login

已登入：Continue to Account → /account

為什麼要修  
這是最容易被程序部做歪的互動規則；不先寫死，後面 Home、Membership、Support 三頁的 CTA 會各做各的。

\---

2\. 修正項目

Phase 1 Source of Truth 補上 favorites

原 v1 問題  
v1 開頭只寫 plants / applications / profiles / inquiries，但後文的 Dossier follow state、Account Following 又明確使用了 favorites。

修正後規則  
Phase 1 Firestore 資料來源統一改成：

plants / applications / profiles / inquiries / favorites

並同步修正：

F. Field Mapping / Content Source of Truth

Phase 4 內容與狀態接線

最終驗收清單

為什麼要修  
如果前面少一個 collection、後面又偷偷用到，程序部會誤判 favorites 是臨時前端狀態而不是正式資料來源。

\---

3\. 修正項目

Membership 的 mockup / prototype 與施工 phase 完全對齊

原 v1 問題  
v1 在 H 節寫 Membership 需要 prototype，但 I 節又只把 Membership 放進 Phase 2 的靜態公開頁，造成它到底算靜態頁還是流程頁不一致。

修正後規則

Phase 2：Membership \= 靜態敘事殼

Phase 3：Membership \= CTA / login state / first-step flow 的 prototype 驗證

並同步修正：

H. Mockup vs Prototype Matrix

I. 分段施工順序

J. 最終驗收清單

為什麼要修  
如果不對齊，程序部會以為 Membership 只是一頁內容頁，後面登入與 first-step flow 會被延後甚至漏做。

\---

4\. 修正項目

Support 去向從模糊二選一改成明確分流

原 v1 問題  
v1 有些地方仍保留 Need Support → /support 或 /account/applications/:id 這種模糊寫法。

修正後規則  
全文統一成：

general / pre-sale / business / FAQ / 公開詢問 → /support

application-bound / order-bound / aftercare / plant-bound issue → /account/applications/:id

並同步修正：

Selection Dossier

Account

Support

CTA / State Matrix

Application Lifecycle

驗收清單

為什麼要修  
這不是文案問題，而是流程邊界問題；不先寫死，程序部一定會在不同頁做出不同分流。

\---

5\. 修正項目

Route 命名全文統一為 /support

原 v1 問題  
雖然主 route map 已經是 /support，但正文裡仍混有 /contact/support 這種舊寫法。

修正後規則  
公開支援入口全文只保留：

/support

並同步修正：

Route Map

舊 route 說明

Page Modules CTA

State Matrix

驗收清單

所有文字敘述

為什麼要修  
如果 route 名稱不統一，程序部最容易把舊命名帶回來，最後又多一層兼容與轉址噪音。

\---

D. 決策清單

本輪無新增決策。