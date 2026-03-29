# cursor-ledger

## 1. 外層容器
- 原始 selector：`div.cursor`
- 直接子層順序：僅有 1 個直接子層 `div.orgc-detail`
- 外層屬性：`class="cursor"`

## 2. 子段逐條帳

### [1] `div.orgc-detail`
- 父層：`div.cursor`
- 同層前後鄰接：無同層鄰居
- 直接子層：僅有 1 個 `p.cursor-text`
- 關鍵屬性：`class="orgc-detail"`
- 原樣摘錄到哪一層為止：做為游標內容物的裝飾框或尺寸限制層。

### [2] `p.cursor-text`
- 父層：`div.orgc-detail`
- 同層前後鄰接：無同層鄰居
- 直接子層：空值（由腳本動態注入文字或保持空白）
- 關鍵屬性：`class="cursor-text"`
- 原樣摘錄到哪一層為止：實際承載游標替換字元的終端文字節點。

## 3. 重複元素統計
- 是否存在重複節點：否
- 數量：0
- 每個共同 class / 屬性：無
- 是否存在非重複子層：是，結構採單線直落的 HTML 樹。

## 4. 最終對帳
- `div.cursor` 內共有幾個不可再合併的子段：
  以 DOM 從外到內計算，共有 3 層階層不可刪減替換：
  1. `div.cursor` (對應全域座標的移動外框)
  2. `div.orgc-detail` (包覆字體的設計容器)
  3. `p.cursor-text` (文字狀態掛載點)
- 哪些 selector 之後完整復刻時必須原樣保留：
  因為牽涉到外部全站腳本針對 Hover 事件發動時的字串注入、或是樣式位移變更，此三層 class (`cursor`、`orgc-detail`、`cursor-text`) 皆必須一字不漏並保持原定父子關係進行重建。
