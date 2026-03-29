# page-code-wrap-ledger

## 1. 外層容器
- 原始 selector：`div.page_code_wrap`
- 直接子層順序：1. `div.page_code_base`、 2. `div.page_code_custom`
- 外層屬性：`class="page_code_wrap"`

## 2. 子段逐條帳

### [1] `div.page_code_base`
- 父層：`div.page_code_wrap`
- 同層前後鄰接：後方緊接著 `div.page_code_custom`
- 直接子層：空內容（僅包含 HTML 原碼的斷行字元與空白）
- 關鍵屬性：`class="page_code_base w-embed"`
- 是否為空容器：是
- 原樣摘錄到哪一層為止：直接至全空容器層為止。

### [2] `div.page_code_custom`
- 父層：`div.page_code_wrap`
- 同層前後鄰接：前方緊接著 `div.page_code_base`
- 直接子層：空內容（僅包含 HTML 原碼的斷行字元與空白）
- 關鍵屬性：`class="page_code_custom w-embed"`
- 是否為空容器：是
- 原樣摘錄到哪一層為止：直接至全空容器層為止。

## 3. Embed 統計
- `.page_code_wrap` 內共有幾個 `w-embed`：共 2 個。
- 哪些為空：`div.page_code_base` 與 `div.page_code_custom` 目前在文件實體內皆為空白。
- 哪些含文字或其他節點：無，目前實體文件內不存在其他包覆文字或 Node 的標籤。
- 是否存在非 `w-embed` 子層：否，它的所有一級子節點皆帶有 `w-embed` 屬性。

## 4. 最終對帳
- `.page_code_wrap` 內共有幾個不可再合併的子段：
  以結構佔位而言，外部容器 1 個 + 內部 embed 節點 2 個，這 3 層宣告不可省略。
- 哪些 selector 之後完整復刻時必須原樣保留：
  不論未來是否塞入程式碼，Webflow 的原生自定義腳本架構必然依賴這三個類點位：`class="page_code_wrap"` 及其子代的 `class="page_code_base w-embed"`、`class="page_code_custom w-embed"` 來確保代碼能正確依附。
- 哪些層先前完全遺漏：
  由於它本就不屬於 `data-barba="container"`（即 `.page-main`）內文流的一環，也缺乏實體畫面面積，在先前「7大抽象層」的梳理中，整組 `.page_code_wrap` 從最外層被完全抹除遺漏了。
