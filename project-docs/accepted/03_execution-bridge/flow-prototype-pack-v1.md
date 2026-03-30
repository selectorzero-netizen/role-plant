A. 先給結論（1–2句）

本輪 prototype 的目的，是把 Selection / Membership / Login / First Apply Gate / Account / Support 這條真正會影響 Follow / Apply / 售後的操作核心，一次壓成可審閱、可對齊、可安全進 prototype 的流程總包。  
現在先驗流程，不再驗靜態敘事，因為靜態頁的節奏、層級與品牌語氣已經過審；接下來最容易出事的，不是畫面，而是 一按就歪的狀態切換、回跳、分流與 dead end。 

\---

《流程頁 prototype 總包 v1》

B. 本輪 prototype 的角色與邊界

1\. 它和《靜態頁 review mockup 總包 v1》的差別

靜態頁 review mockup 驗的是：

這頁像不像同一個網站

敘事順不順

視覺層級有沒有偏

本輪 prototype 驗的是：

CTA 一按會去哪

被擋下來時怎麼處理

登入後能不能回原頁

Follow / Apply / 售後會不會掉進死路

公開 Support 和綁單售後有沒有分乾淨

也就是說：  
上一輪驗「頁有沒有站起來」，這一輪驗「一按會不會出事」。

2\. 它和正式施工的差別

這份文件不是 code，不是元件實作，也不是正式串 Firebase。  
它的角色是：在正式施工前，先把所有最容易做歪的流程邏輯寫死。

程序部接到這份之後，應該清楚：

哪些流程一定要真的能走

哪些狀態一定要真的切

哪些互動只要先用假資料模擬即可

哪些頁不能獨立做，必須一起驗

3\. 為什麼現在先做流程 prototype，而不是直接寫 code

因為現在最大的風險不是「頁面不夠完整」，而是：

Login 後回不去原 specimen

Apply 與 Follow 的門檻位置放錯

Support 還是走回公開表單

Account 又被做成舊 Member Center

Archived 不能取消追蹤

Current / Observation / Archived 與 application 狀態互相打架

這些問題如果不先在 prototype 階段寫死，後面正式寫 code 時就會一邊做一邊補洞，返工最大。

\---

C. 流程頁 prototype 共用原則

1\. 本輪 prototype 主要驗什麼

本輪主要驗這 10 件事：

1\. 新路由是否真的只走新主線

2\. Login 後是否回原頁

3\. CTA 是否依狀態正確切換

4\. Follow / Unfollow 是否順

5\. Apply 是否只在正確時機觸發 First Apply Gate

6\. First Apply Gate 是否存完就回原 specimen

7\. Application lifecycle 是否可讀、可回看

8\. Archived 是否能取消追蹤

9\. Support 是否分成公開支援與綁單支援

10\. Account 是否真的只是工具層，而不是舊 member 頁改名

2\. 本輪 prototype 不驗什麼

這輪不驗：

高保真美術

實際付款 / 金流 / 物流 API

正式 email / notification

完整後台 CRUD

最終 FAQ 內容量

真實商用素材完整度

正式權限系統的邊界條件

3\. login return path 的固定規則

每次進 /login，都必須帶一組最小上下文：

originRoute

intent

specimenSlug（若來自單株）

applicationId（若來自既有申請）

postLoginTarget

固定規則

從 Membership CTA 進 /login  
→ 登入後直接去 /account

從 Dossier 的 Follow 進 /login  
→ 登入後回原 specimen，不經 First Apply Gate

從 Dossier 的 Apply 進 /login  
→ 登入後回原 specimen  
→ 若缺 apply 必要資料，才開 First Apply Gate

從 protected account 頁被擋去 /login  
→ 登入後回原 protected 頁

4\. CTA 切換的固定規則

Membership CTA

未登入：Start with Google → /login

已登入：Continue to Account → /account

Dossier CTA

依 availability \+ 使用者登入與資料狀態切換

但卡片層不直接變 Follow / Apply 牆

View Dossier 永遠是卡片主 CTA

Support CTA

general / pre-sale / business / FAQ / 公開詢問 → /support

application-bound / order-bound / aftercare / plant-bound issue → /account/applications/:id

5\. empty / success / error / blocked state 的處理方式

empty

要明確告訴使用者「現在沒有什麼」與「下一步去哪」

不能只是空白 list

success

用 toast \+ inline panel

不用 alert

error

用 recoverable error block

要有 retry 或返回路徑

blocked

不直接灰掉不解釋

必須寫明：

為什麼被擋

下一步是什麼

點哪裡可以繼續

6\. mobile 上哪些頁需要 sticky action bar

本輪需要 sticky action bar 的頁：

Specimen Dossier

First Apply Gate

/account/applications/:id

這三頁都屬於「人已經在做事」的頁面，手機上若不固定主動作，很容易迷失。

7\. 哪些互動必須真做、哪些只要做可審閱的假資料互動

必須真做 prototype 的互動

Login 進出與 return path

Membership CTA 的登入前後切換

Dossier 的 Follow / Apply / Remove from Following

First Apply Gate 儲存與回原 specimen

Application lifecycle 狀態顯示與 detail 進出

Support 類型分流與 public / account-bound split

可以先用假資料互動的部分

Specimen 內容本身

Quote / price 數值

FAQ 文本

Inquiry thread 內容

物流編號與付款資訊

完整 profile 欄位內容

8\. 哪些畫面這輪不用追求高保真美術

Login / Auth Gateway

First Apply Gate

Account Overview

Applications List

/account/applications/:id

Support form 區

這些頁本輪的優先順序是「清楚、可審閱、可驗流程」，不是「看起來多精緻」。

9\. 哪些地方可以先用 placeholder

Dossier 中缺的 shot

Account 的 empty state 圖

Application timeline 的視覺占位

Support form 的圖像區

FAQ category 圖示

First Apply Gate 的 side illustration

10\. 本輪驗收最重要的 10 個 checkpoint

1\. Login 後回原頁

2\. Apply 不會一登入就直接送出

3\. First Apply Gate 只在第一次真正 Apply 前出現

4\. Follow 不應被問卷擋住

5\. 卡片主 CTA 一律是 View Dossier

6\. Archived 可在 dossier 或 following 中取消追蹤

7\. Application 狀態流可回看

8\. Support 不再用公開 contact 處理綁單售後

9\. /account 不是舊 member center 改名

10\. 舊 route / 舊 /member / 舊 /collection 不再支配流程

\---

D. 全站核心流程地圖

1\. 未登入訪客看 Selection → 被擋 CTA → Login → 回原頁

使用者從 Home 進 /selection，點某張卡進 /selection/:slug。  
他還沒登入，所以不會在列表卡上直接做 Follow / Apply，而是先進 dossier。  
如果在 dossier 點 Follow 或 Apply，系統把他導到 /login，並記住：

我從哪一株來

我剛剛按的是 Follow 還是 Apply

登入成功後：

若原 intent 是 Follow，直接回原 dossier

若原 intent 是 Apply，也先回原 dossier，再決定是否要開 First Apply Gate

2\. 未登入訪客想 Apply → Login → First Apply Gate → 回原 specimen → Submit

使用者從 dossier 點 Apply。  
因為還沒登入，所以先去 /login。  
登入成功後回到原 dossier。  
這時系統檢查：這個帳號是不是第一次真正 Apply，且 apply 必要資料未完成。  
若是，才開 First Apply Gate。  
First Apply Gate 存完後：

回原 dossier

讓使用者按下真正的 Submit Application

這裡最重要的規則：  
問卷不是會員審核，也不是一進站就問。  
它只出現在 第一次真正 Apply 前。

3\. 已登入使用者 Follow / Unfollow / Archived item remove flow

已登入使用者進 dossier：

Current：可 Follow，可 Apply

Observation：可 Follow，不可 Apply

Archived：不可新申請，但若已追蹤，要能 Remove from Following

使用者在 /account 的 Following 中，也要能：

查看目前追蹤中的 current / observation

對 archived 的項目執行 remove

點回 dossier

這條 flow 的重點：  
追蹤是低門檻動作，不應被問卷擋住。  
Archived 不該變成死物件。

4\. Application lifecycle

Submitted → Reviewing → Quoted → Paid → Preparing → Shipped → Closed

這條 flow 不只是顯示狀態，而是：

每個狀態都要有對應主動作

這些狀態都要能從 /account 和 /account/applications/:id 被看到

例如：

Submitted / Reviewing：先看進度

Quoted：看報價與下一步

Paid / Preparing / Shipped：看訂單與售後

Closed：變成紀錄，但不能消失

5\. Support split

公開 FAQ / 公開 contact / account-bound aftercare 的流向

公開支援

FAQ

General

Pre-sale

Business

公開詢問  
→ 都留在 /support

綁單支援

application-bound

order-bound

aftercare

plant-bound issue  
→ 一律進 /account/applications/:id

重點不是把一切都收進 /support，而是把公開問題和綁單問題拆開。  
公開頁只負責前台入口；真正跟某一株、某一筆申請、某一次售後有關的問題，必須進 detail page。

\---

CTA / State Matrix

1\. Membership CTA / Login State Matrix

畫面位置	未登入	已登入

Home 的 Membership Preview	Start with Google → /login	Continue to Account → /account  
/membership Hero CTA	Start with Google → /login	Continue to Account → /account  
/membership Closing CTA	Start with Google → /login	Continue to Account → /account  
/support 中需要進帳號路徑的 CTA	Start with Google → /login	Continue to Account → /account

\---

2\. Dossier CTA / State Matrix

A. 依 availability

Availability	卡片主 CTA	Dossier 主動作	不應承擔

Current	View Dossier	Apply / Follow	卡片上直接變成 Apply / Follow 牆  
Observation	View Dossier	Follow	卡片直接申請  
Archived	View Dossier	Remove from Following（若已追蹤）	卡片上直接互動

B. 依使用者狀態

使用者狀態	Current	Observation	Archived

未登入	Apply → /login（intent=apply）\<br\>Follow → /login（intent=follow）	Follow → /login	Archived for Record  
已登入未完成 Apply 必要資料	Apply → 開 First Apply Gate\<br\>Follow → 直接可用	Follow → 直接可用	Remove from Following（若已追蹤）  
已登入可操作	Apply / Follow	Follow	Remove from Following（若已追蹤）

C. application 狀態優先權

如果這一株已經有 active application，application state 優先於 availability CTA。  
也就是說：

不再顯示普通 Apply

主動作改成 View Application

支援入口改成該 application detail 內的 bound support

\---

3\. Application Lifecycle Matrix

狀態	Overview 列表主動作	Detail 頁主動作	補充動作

Submitted	View Application	Awaiting Review	Need Help（同頁 support entry）  
Reviewing	View Application	Awaiting Review	Need Help  
Quoted	View Quote	Review Quote	Need Help  
Paid	View Status	Order Confirmed	Need Help  
Preparing	View Status	Preparing	Need Help  
Shipped	Track Aftercare	Track Aftercare	Need Help  
Closed	View Record	Closed Record	Need Help

\---

4\. Availability \+ Login \+ Flow Trigger Matrix

事件	是否需登入	是否會開 First Apply Gate	回哪裡

在 dossier 點 Follow	是	否	回原 dossier  
在 dossier 點 Apply	是	視 profile 完整度而定	回原 dossier，再視需要開 gate  
在 Membership 頁點 CTA	視狀態	否	未登入去 /login，登入後到 /account  
在 Support 頁想進 account-bound 路徑	視狀態	否	未登入去 /login，登入後到 /account，再進 detail

\---

Login Return Matrix

從哪裡進 /login	進 login 的原因	登入後回哪裡	什麼情況需要先進 First Apply Gate	什麼情況直接回原頁

/membership	CTA 需要帳號	/account	不需要	一律直接進 /account  
/selection/:slug 點 Follow	想追蹤	回原 dossier	不需要	一律回原 dossier  
/selection/:slug 點 Apply	想申請	回原 dossier	第一次真正 Apply 且缺必要資料	profile 已足夠時直接回原 dossier  
/account 被保護擋下	想進工具層	回 /account	不需要	一律回 /account  
/account/applications/:id 被保護擋下	想看既有申請	回原 application detail	不需要	一律回原 detail  
/support 中嘗試進 account-bound path	想處理綁單問題	/account（作為 application selector）	不需要	已登入直接去 /account

\> 第一個真正會開 First Apply Gate 的入口，只有：  
從 dossier 點 Apply，而且登入後仍缺 apply 必要資料。

\---

Support Split Matrix

問題類型	應走哪裡	誰處理	是否需登入	Prototype 要驗什麼

FAQ	/support	公開內容層	否	類別與答案入口清楚  
General	/support	公開表單	否	表單可送、成功提示明確  
Pre-sale	/support	公開表單	否	類型分流正確  
Business	/support	公開表單	否	類型分流正確  
Application-bound	/account/applications/:id	綁該 application detail	是	不得從公開表單送出  
Order-bound	/account/applications/:id	綁該 application detail	是	不得從公開表單送出  
Aftercare	/account/applications/:id	綁該 application detail	是	要有 support entry 區  
Plant-bound issue	/account/applications/:id	綁該 application detail	是	需在 detail 中呈現

\---

Page Dependency Matrix

頁面 / flow screen	依賴哪一頁先成立	不能先單做的原因

Selection List	Home（敘事導流）、Selection Dossier	若 dossier 未定，卡片 CTA 不知道在導什麼  
Specimen Dossier	Selection List、Login、First Apply Gate、Account Application Detail	CTA/state 不可能單獨成立  
Membership CTA / login state	Login、Account	若沒有 login/account 承接，這頁只剩空按鈕  
Login / Auth Gateway	Membership、Dossier、Account、Application Detail	沒有 origin/intent，就驗不了 return path  
First Apply Gate	Dossier、Login、profiles	若沒有 apply 入口與回原 specimen，這頁就失去存在理由  
Account Overview	Membership、favorites、applications、inquiries	沒有工具層上下文，overview 只是空殼  
Following	Account Overview、favorites、plants	沒有 overview 入口與 specimen data，following 無法成立  
Applications List	Account Overview、applications、plants	沒有 account context 與 data，list 不知道承接什麼  
/account/applications/:id	Applications List、applications、inquiries、Support split	沒有它，售後仍會回到公開 support  
Support	Membership、Account、Application Detail	沒有 account-bound detail，support split 無法真正落地

\---

E. 逐頁 prototype 規格

\---

1\. Selection List

1\. 頁面唯一任務

讓使用者快速看懂這一批、選出要點進哪一株。  
它不是交易頁，也不是帳號頁。

2\. 主要使用者狀態

未登入訪客

已登入使用者

正在看 Current

正在看 Archive

3\. 從哪裡進來

Home 的 See Current Selection

Standards / Cultivation / Story 的 See Selection

返回自 Dossier

直接進 /selection 或 /selection/archive

4\. 進這頁後要完成什麼

理解 Current / Observation / Archived 的差別

瀏覽批次

決定點哪一株進 dossier

或切去 archive

5\. 區塊順序

1\. Batch Intro

2\. Legend

3\. Filter / Sort Row

4\. Card Grid

5\. Archive Switch / CTA

6\. 每個區塊要驗的互動

Batch Intro：無重互動，只驗文案與位置

Legend：點 / hover 時展開說明

Filter / Sort Row：切 Current / Archive、切 stage、切 sort

Card Grid：卡片只驗 View Dossier

Archive Switch：切 route or tab state

7\. CTA / state matrix

卡片主 CTA：View Dossier

Card 不出現 Apply、Follow

Archive 入口：View Archive

返回 Current：Back to Current Selection

8\. 空狀態 / 錯誤狀態 / 成功狀態 / 被擋狀態

空狀態：沒有符合條件的 specimens → 顯示空狀態面板 \+ Clear Filters

錯誤狀態：列表資料讀取失敗 → Retry

成功狀態：切 filter / archive 後 UI 正確更新

被擋狀態：本頁不應出現「被擋」，因為不做登入要求

9\. 草稿文案錨點

頁標：Selection

Batch 副標：Current Batch

Legend 標題：How to Read This List

CTA：View Dossier / View Archive / Back to Current Selection

10\. 資料欄位 / Source of Truth

plants.id

plants.slug

plants.specimenId

plants.title

plants.availability

plants.stage

plants.sizeBand

plants.batch

plants.coverImage

plants.summaryShort

plants.sortKey

11\. 這頁哪些互動必須真做 prototype

Current / Archive 切換

Filter / Sort 切換

卡片進 dossier

從 dossier 返回列表後維持原 filter / scroll context

12\. 本頁 review checkpoint

1\. 卡片是不是只承擔「導去 dossier」

2\. Current / Observation / Archived 是否一眼看懂

3\. 列表頁有沒有過度承擔 Apply / Follow

4\. Current / Archive 切換是否自然

5\. 返回時上下文是否保留

\---

2\. Specimen Dossier

1\. 頁面唯一任務

讓使用者看懂這一株目前是什麼、現在能做什麼、接下來要去哪。

2\. 主要使用者狀態

未登入

已登入但還沒完成 Apply 必要資料

已登入且可操作

Current / Observation / Archived

已有 active application

3\. 從哪裡進來

Selection List 卡片

Following

Applications Detail 中的 specimen recap

直接深連結

4\. 進這頁後要完成什麼

看懂這一株目前階段

看懂你們在看它什麼

決定是 Follow、Apply，還是只是記錄

如果被擋，知道下一步去哪

5\. 區塊順序

1\. Top Meta \+ Back

2\. Gallery

3\. Summary

4\. Reading Focus

5\. State Record

6\. Action Module

7\. Care / Transaction Note

6\. 每個區塊要驗的互動

Top Meta \+ Back：返回 Selection，保留原上下文

Gallery：切 shot 圖

Summary / Reading Focus：無重互動

State Record：availability 對應說明展開

Action Module：Follow / Apply / Remove / View Application / Login / Account 切換

Care / Transaction Note：一般 support 與 bound support 導向分流

7\. CTA / state matrix

A. Current

未登入：Apply → /login（intent=apply），Follow → /login（intent=follow）

已登入未完成 apply 必要資料：Apply → First Apply Gate，Follow → 直接可用

已登入可操作：Apply / Follow

已有 active application：View Application → /account/applications/:id

B. Observation

未登入：Follow → /login

已登入：Follow

若已追蹤：Unfollow

C. Archived

若已追蹤：Remove from Following

若已有 application：View Application

否則：Archived for Record

D. Support 導向

一般問題：Need Support → /support

綁單 / 售後：View Application Detail → /account/applications/:id

8\. 空狀態 / 錯誤狀態 / 成功狀態 / 被擋狀態

空狀態：缺某些 shot → 顯示 SHOT PENDING placeholder

錯誤狀態：specimen 不存在 / 讀取失敗 → 顯示錯誤頁 \+ Back to Selection

成功狀態

Follow 成功 → toast \+ button state update

Apply 成功 → toast \+ button 變 View Application

被擋狀態

未登入 → 去 /login

Apply 資料不足 → 開 First Apply Gate

Archived 且不可申請 → 顯示 record-only 狀態

9\. 草稿文案錨點

區塊標：Reading Focus

區塊標：State Record

CTA：Apply / Follow / View Application / Remove from Following

支援 CTA：Need Support

10\. 資料欄位 / Source of Truth

plants.\*

favorites

applications

profiles

auth context

11\. 這頁哪些互動必須真做 prototype

Gallery 切圖

Login return path

Follow / Unfollow

Apply → Gate → 回來

Archived remove

application state 優先於普通 CTA

12\. 本頁 review checkpoint

1\. Dossier 是否不像一般商品頁

2\. 本株觀察 / 狀態紀錄 / 交易引導是否分層清楚

3\. Apply / Follow / View Application 是否切換正確

4\. Follow 不會被問卷擋住

5\. 一般 support 與 bound support 是否分乾淨

\---

3\. Membership 公開頁中的 CTA / login state / first-step flow

1\. 頁面唯一任務

把「帳號存在的理由」講清楚，並把人送到正確的下一步。

2\. 主要使用者狀態

未登入

已登入

從一般導覽進來

從被擋 CTA 的上下文進來（只顯示說明，不在本頁完成流程）

3\. 從哪裡進來

Home Membership Preview

Footer / 主導航

被擋 CTA 後的說明路徑（如果前台這樣設計）

4\. 進這頁後要完成什麼

理解帳號用途

按正確 CTA 前進

知道問卷不在這裡出現

5\. 區塊順序

1\. Hero

2\. Why an Account Exists

3\. What Happens First Time

4\. What Membership Is Not

5\. Flow Timeline

6\. Closing CTA

6\. 每個區塊要驗的互動

Hero / Closing CTA：CTA 依登入狀態切換

What Happens First Time：靜態 flow hint，無真互動

Flow Timeline：可以 hover/highlight step，但不做真流程

7\. CTA / state matrix

未登入：Start with Google → /login

已登入：Continue to Account → /account

固定規則

本頁不開 First Apply Gate

本頁不做 account flow

本頁不替代 login

本頁只負責把人送到正確下一步

8\. 空狀態 / 錯誤狀態 / 成功狀態 / 被擋狀態

空狀態：沒有

錯誤狀態：不做錯誤主體

成功狀態：登入後 CTA 文案切換為 Continue to Account

被擋狀態：不在本頁處理 blocked application，blocked 由 dossier / login 解決

9\. 草稿文案錨點

Hero：Start with Google / Continue to Account

What Happens First Time

What Membership Is Not

Flow Timeline

10\. 資料欄位 / Source of Truth

auth state

profiles（只用於判斷是否已登入、是否已有基本資料，不在本頁觸發 gate）

靜態草稿文案

11\. 這頁哪些互動必須真做 prototype

CTA 依登入狀態切換

若已登入再進本頁，CTA 不得仍顯示 /login

若未登入，CTA 不得直跳 /account

12\. 本頁 review checkpoint

1\. CTA 切換規則是否完全寫死

2\. 問卷是否沒有被提前放到 Membership

3\. 這頁是否沒有變成流程頁

4\. 它和 Login / Account 的分工是否清楚

5\. 使用者會不會看完還是不知道下一步去哪

\---

4\. Login / Auth Gateway

1\. 頁面唯一任務

完成登入，並把使用者送回正確地方。

2\. 主要使用者狀態

未登入，準備登入

正在登入

登入成功

登入失敗

已登入但誤進本頁

3\. 從哪裡進來

Membership CTA

Dossier 的 Follow / Apply

/account 被保護頁

/account/applications/:id 被保護頁

/support 中需要進帳號路徑的 CTA

4\. 進這頁後要完成什麼

完成 Google auth

保留 origin / intent

正確分流回原頁或 /account

5\. 區塊順序

1\. Context Header

2\. Why You Are Here

3\. Auth Action

4\. Error State

5\. Return Path Note

6\. 每個區塊要驗的互動

Context Header：顯示來路摘要（例如 Coming from Selection / Membership）

Auth Action：真的觸發登入

Error State：登入失敗可重試

Return Path Note：登入成功後導向正確頁面

7\. CTA / state matrix

未登入：Start with Google

登入中：Signing In...

登入失敗：Retry

已登入且有 return path：自動導向對應頁

已登入但直接進 /login：Continue to Account

8\. 空狀態 / 錯誤狀態 / 成功狀態 / 被擋狀態

空狀態：無

錯誤狀態：Google auth fail / popup blocked / network fail

成功狀態：登入成功後短暫 success panel 或直接導頁

被擋狀態：不適用，本頁本身就是解 blocked

9\. 草稿文案錨點

頁標：Start with Google

說明：We’ll return you to where you left off.

錯誤文案：Sign-in failed. Please try again.

10\. 資料欄位 / Source of Truth

auth state

profiles

incoming context（originRoute / intent / specimenSlug / applicationId / postLoginTarget）

11\. 這頁哪些互動必須真做 prototype

真正登入觸發

origin / intent 保留

登入後 return path

已登入誤進 /login 的處理

12\. 本頁 review checkpoint

1\. 是否真的保留 origin / intent

2\. 從 Membership 進來是否回 /account

3\. 從 Dossier 的 Follow / Apply 進來是否回原 dossier

4\. 已登入再進 /login 是否不會被困住

5\. 錯誤處理是否清楚

\---

5\. First Apply Gate

\> 注意：這不是獨立 route。  
它是第一個真正 Apply 前才會出現的 flow screen / overlay。

1\. 頁面唯一任務

收集第一次真正 Apply 所需的最小必要資料，然後回原 specimen。

2\. 主要使用者狀態

已登入、第一次 Apply、資料不足

已登入、資料已完整（應跳過本頁）

儲存中

儲存失敗

3\. 從哪裡進來

只從 Specimen Dossier 的 Apply 進來

不從 Membership

不從 Login 直接進來

不從 Follow 進來

4\. 進這頁後要完成什麼

填完最小必要欄位

存檔

回原 specimen

解鎖真正的 Submit Application

5\. 區塊順序

1\. Context Header

2\. Why We Ask

3\. Minimal Fields

4\. Consent / Notice

5\. Save Action

6\. 每個區塊要驗的互動

Context Header：告訴使用者你是在為這次 Apply 補資料

Minimal Fields：欄位輸入與驗證

Consent / Notice：同意勾選

Save Action：儲存後返回原 specimen

7\. CTA / state matrix

Primary：Save and Return to Specimen

Secondary：Cancel and Go Back

儲存中：Saving...

儲存失敗：Retry

最小必要欄位（現在必填）

1\. 姓名（可用 Google 名稱預填）

2\. Email（預填 / 可讀）

3\. 手機

4\. 地區 / 城市

5\. 養護環境類型（單選）

6\. 經驗程度（單選）

7\. 同意運送 / 照護須知（checkbox）

現在不要放進必填的欄位

詳細地址

環境照片

收藏歷史

lottery 類問題

premium 評選相關補充題

8\. 空狀態 / 錯誤狀態 / 成功狀態 / 被擋狀態

空狀態：不適用

錯誤狀態：欄位未填、儲存失敗

成功狀態：儲存成功，回原 specimen，Apply 轉為可送出

被擋狀態：若不是從 Apply 進來，不應出現這一頁

9\. 草稿文案錨點

頁標：Before Your First Application

補句：We only ask for the minimum we need before a real application.

CTA：Save and Return to Specimen

10\. 資料欄位 / Source of Truth

profiles.name

profiles.email

profiles.phone

profiles.region

profiles.growEnvironment

profiles.experienceLevel

profiles.applyGateCompleted

auth state

incoming context（return specimen）

11\. 這頁哪些互動必須真做 prototype

欄位驗證

Save

回原 specimen

儲存後 Apply 解鎖

非 Apply 情境不應誤開本頁

12\. 本頁 review checkpoint

1\. 問卷是不是只在第一次真正 Apply 前出現

2\. 欄位是否足夠最小，不會變大表單地獄

3\. Follow 是否完全不經過這一頁

4\. 儲存後是否真的回原 specimen

5\. 這頁有沒有被誤做成會員審核頁

\---

6\. Account Overview

1\. 頁面唯一任務

讓已登入使用者一進 /account 就知道：  
我現在有什麼、缺什麼、下一步去哪。

2\. 主要使用者狀態

已登入但還沒有任何紀錄

已登入有 Following

已登入有 Applications

已登入有 Support 記錄

Profile 未完成

3\. 從哪裡進來

Membership CTA

Login 成功後

Top nav / user entry

被 protected route 擋回後登入成功

4\. 進這頁後要完成什麼

看懂自己的整體狀態

進 Following / Applications / Support / Profile

5\. 區塊順序

1\. Account Header

2\. Quick Status Summary

3\. Entry Cards

4\. Profile Prompt

5\. Return to Selection

6\. 每個區塊要驗的互動

Quick Status Summary：顯示 counts / incomplete hint

Entry Cards：點進 Following / Applications / Support / Profile

Profile Prompt：若資料缺少，提示補齊

7\. CTA / state matrix

Go to Following

Go to Applications

Go to Support

Complete Profile

Return to Selection

8\. 空狀態 / 錯誤狀態 / 成功狀態 / 被擋狀態

空狀態：沒有 following / no applications / no support record

錯誤狀態：資料讀取失敗

成功狀態：登入後正確落在 Account

被擋狀態：未登入不能進本頁

9\. 草稿文案錨點

主標：Your Account

補句：This is where your following, applications, support, and profile live.

CTA：Go to Following / Go to Applications

10\. 資料欄位 / Source of Truth

profiles

favorites

applications

inquiries

11\. 這頁哪些互動必須真做 prototype

登入後 landing 正確

counts / summary 正確更新

Entry cards 能正確切進子頁

incomplete profile 提示正確

12\. 本頁 review checkpoint

1\. /account 是否真的只是工具層

2\. 有沒有被做成舊 Member Center

3\. Entry cards 是否清楚，不重疊

4\. 空狀態是否有方向感

5\. Profile incomplete 提示是否合理但不干擾

\---

7\. Following

\> Following 是 /account 內的子視圖，不是新 route。

1\. 頁面唯一任務

管理已追蹤的 specimens，特別是讓 Archived item 可以被移除。

2\. 主要使用者狀態

沒有追蹤

有 Current / Observation 追蹤

有 Archived 追蹤

混合追蹤狀態

3\. 從哪裡進來

/account 的 Entry Card

Follow 成功後的回流

Archived record 的後續管理

4\. 進這頁後要完成什麼

看目前追蹤了哪些

點回 dossier

移除 archived 或不想追的 specimen

5\. 區塊順序

1\. Header

2\. Filter Tabs（Current / Observation / Archived / All）

3\. Following List

4\. Empty State

6\. 每個區塊要驗的互動

Filter Tabs：切 availability

Following List：Open dossier / Remove from Following

Empty State：引導回 Selection

7\. CTA / state matrix

View Dossier

Remove from Following

Back to Selection

8\. 空狀態 / 錯誤狀態 / 成功狀態 / 被擋狀態

空狀態：沒追蹤任何 item

錯誤狀態：讀 favorites 失敗

成功狀態：Remove 後列表即時更新

被擋狀態：未登入不能進

9\. 草稿文案錨點

標題：Following

空狀態：You’re not following any specimen yet.

CTA：Back to Selection

10\. 資料欄位 / Source of Truth

favorites

plants

11\. 這頁哪些互動必須真做 prototype

Filter tabs

Remove from Following

Archived item remove

點回 dossier

12\. 本頁 review checkpoint

1\. Archived 是否真的可移除

2\. Following 是否沒有跟 Applications 混在一起

3\. 空狀態是否清楚

4\. Remove 後是否不用重整整頁

5\. dossier 回跳是否保留合理上下文

\---

8\. Applications List

\> Applications List 是 /account 內的子視圖，不是新 route。

1\. 頁面唯一任務

讓使用者一眼知道：我有哪些申請，它們現在在哪個階段。

2\. 主要使用者狀態

沒有申請

有一筆 active application

有多筆混合狀態 application

全部 closed

3\. 從哪裡進來

/account 的 Entry Card

Dossier 已有 active application 時的回流

4\. 進這頁後要完成什麼

找到某筆 application

看懂狀態

點進 detail

5\. 區塊順序

1\. Header

2\. Status Filter Chips

3\. Applications List

4\. Empty State

6\. 每個區塊要驗的互動

Status Filter Chips：依狀態篩選

Applications List：進 /account/applications/:id

Empty State：回 Selection

7\. CTA / state matrix

View Application

View Quote

Track Aftercare

Back to Selection

8\. 空狀態 / 錯誤狀態 / 成功狀態 / 被擋狀態

空狀態：沒有 application

錯誤狀態：applications 讀取失敗

成功狀態：狀態 chip 切換、列表同步更新

被擋狀態：未登入不能進

9\. 草稿文案錨點

標題：Applications

補句：Track where each application currently stands.

CTA：View Application / Track Aftercare

10\. 資料欄位 / Source of Truth

applications

plants

11\. 這頁哪些互動必須真做 prototype

狀態篩選

進 application detail

列表中狀態文案與 CTA 變化

12\. 本頁 review checkpoint

1\. Submitted → Closed 是否一眼可分

2\. 列表是否沒有混入售後 thread 本身

3\. CTA 是否對應狀態

4\. 這頁是否沒有變成舊 member 申請頁

5\. 進 detail 是否順

\---

9\. /account/applications/:id

1\. 頁面唯一任務

成為單筆 application / order / aftercare 的唯一 detail page。

2\. 主要使用者狀態

Submitted

Reviewing

Quoted

Paid

Preparing

Shipped

Closed

invalid / unauthorized

3\. 從哪裡進來

Applications List

Dossier（若已有 active application）

Support 中被導向的 account-bound issue 路徑

4\. 進這頁後要完成什麼

看懂目前狀態

看懂下一步

送出綁單 support / aftercare

5\. 區塊順序

1\. Top Meta

2\. Status Timeline

3\. Current Action Block

4\. Specimen Recap

5\. Order / Aftercare Notes

6\. Bound Support Entry

6\. 每個區塊要驗的互動

Status Timeline：可看目前停在哪

Current Action Block：依狀態改主動作

Specimen Recap：可回 dossier

Bound Support Entry：真正送出 account-bound issue

7\. CTA / state matrix

Submitted / Reviewing：Awaiting Review

Quoted：Review Quote

Paid / Preparing：View Order Status

Shipped：Track Aftercare

Closed：View Record

支援 CTA：Need Help on This Application（停留本頁 support entry）

8\. 空狀態 / 錯誤狀態 / 成功狀態 / 被擋狀態

空狀態：不適用

錯誤狀態：找不到這筆 application / 不屬於此使用者

成功狀態：bound support 送出成功、狀態更新成功

被擋狀態：未登入或無權限時不可看

9\. 草稿文案錨點

標題：Application Detail

狀態標：Submitted / Reviewing / Quoted / Shipped

支援區：Need Help on This Application

10\. 資料欄位 / Source of Truth

applications

plants

inquiries

profiles

11\. 這頁哪些互動必須真做 prototype

timeline

依狀態切主動作

bound support entry

回 dossier

invalid / unauthorized handling

12\. 本頁 review checkpoint

1\. 這頁是否真的成為唯一綁單支援入口

2\. lifecycle 是否有完整閉環

3\. 支援是否沒有再回公開 /support

4\. 無效 id / 非本人情境是否清楚

5\. Shipped 之後的 aftercare 是否有地方放

\---

10\. Support

1\. 頁面唯一任務

處理 公開 FAQ / General / Pre-sale / Business；把綁單支援導回正確的 account detail。

2\. 主要使用者狀態

未登入訪客

已登入一般使用者

已登入且有 application 的使用者

誤把綁單問題帶來公開 support 的人

3\. 從哪裡進來

Home / Cultivation / Story / Footer 的 Need Support

Dossier 的一般 support CTA

Account 的一般 support CTA

4\. 進這頁後要完成什麼

找到 FAQ 類別

送出 general / pre-sale / business inquiry

如果其實是綁單問題，被正確擋下並導向 account/app detail 路徑

5\. 區塊順序

1\. Hero

2\. FAQ Categories

3\. Public Contact Type Picker

4\. Public Contact Form

5\. Account-bound Support Notice

6\. 每個區塊要驗的互動

FAQ Categories：切類別

Type Picker：General / Pre-sale / Business

Public Form：送出一般詢問

Account-bound Support Notice：若問題類型屬於 order/aftercare，顯示阻擋與正確導向

7\. CTA / state matrix

FAQ：展開答案（留在 /support）

General / Pre-sale / Business：Submit Inquiry（留在 /support）

account-bound / order-bound / aftercare / plant-bound：

未登入：Start with Google → /login

已登入：Continue to Account → /account

真正處理仍在 /account/applications/:id

8\. 空狀態 / 錯誤狀態 / 成功狀態 / 被擋狀態

空狀態：該 FAQ 類別暫無條目

錯誤狀態：表單送出失敗

成功狀態：表單送出成功 confirmation

被擋狀態：把綁單問題帶進公開表單時，阻擋並導正

9\. 草稿文案錨點

頁標：Support

FAQ 分類：

Beginner

Cultivation

Membership & Apply

Orders & Aftercare

表單 CTA：Submit Inquiry

阻擋說明：This issue belongs to your application detail.

10\. 資料欄位 / Source of Truth

FAQ：靜態草稿文案

Public form：inquiries

auth state

applications（只用於判斷是否有 account-bound path 可走）

11\. 這頁哪些互動必須真做 prototype

FAQ 類別切換

公開表單類型分流

account-bound issue 的阻擋與導正

未登入 / 已登入導向差異

12\. 本頁 review checkpoint

1\. Support 是否沒有變成客服大平台

2\. FAQ / public contact / account-bound split 是否真的清楚

3\. 公開表單是否只處理該公開處理的問題

4\. 綁單問題是否不再流進公開 support

5\. CTA 是否正確導向 /login 或 /account

\---

本輪不要做的事（明確鎖定）

1\. 不重寫 Home / Standards / Cultivation / Story 的靜態頁

2\. 不把 Support 拉回靜態敘事主體

3\. 不做新 route

4\. 不做舊 /member / /collection / /learn 兼容主方案

5\. 不把 Membership 寫回高門檻會員審核

6\. 不把 First Apply Gate 提前到進站時

7\. 不把小苗現在就硬做精品評分

8\. 不直接寫 code

9\. 不輸出終端機指令

10\. 不讓 shadcn/ui 決定流程邏輯

\---

決策清單

本輪無新增決策。