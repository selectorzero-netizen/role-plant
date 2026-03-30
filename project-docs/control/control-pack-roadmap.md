# Accepted Docs Control Pack v1｜Roadmap

## 這一包在做什麼

這一包不是功能施工，也不是 drift 判案。它只做一件事：

**先把目前可用的 7 份 accepted working copies 收成一個可引用、可比對、可檢索的中控層。**

## 現在已完成

1. 7 份文件已放進固定 canonical 路徑
2. 已建立 `accepted-doc-index.md`
3. 已建立 `accepted-state.json`
4. 已鎖定 precedence stack

## 接下來要去哪

### ACP-2｜UI Conformance Checklist
目的：把 7 份文件濃縮成「前台現在應該長什麼樣」的檢核表。

輸出：
- `project-docs/control/frontend-ui-conformance-checklist.md`

### ACP-3｜Current Site Drift Matrix
目的：用 ACP-2 的檢核表去判現在網站哪些只是 unfinished，哪些是真的 drift，哪些只是 taste-only。

輸出：
- `project-docs/control/current-site-drift-matrix.md`

## 為什麼現在不先做新功能

因為目前更高效的事不是補頁，而是先把「根據什麼判定對/錯」固定下來。
不先做這件事，後續任何視覺優化或功能補強都會混進重工。

## 這包怎麼用

1. 先讀 `project-docs/accepted/00_manifest/accepted-state.json`
2. 再讀 `project-docs/accepted/00_manifest/accepted-doc-index.md`
3. 要查某個問題時，依 `precedence` 決定先讀哪一份
4. 不要讓第 6、7 份去反改第 1、2 份
