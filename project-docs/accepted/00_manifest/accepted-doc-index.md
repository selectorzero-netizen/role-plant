# Accepted Docs Index

這份索引的目的只有一個：讓人與 AI 都先知道「哪一份文件在管什麼」，避免後續用錯層級。

## 使用規則

1. 先讀 `accepted-state.json`，確認目前 accepted 狀態與優先順序。
2. 遇到文件衝突時，以 **precedence 數字較小者優先**。
3. 這 7 份目前定位為 **accepted working copies**：可作為中控檢索與比對基準，但不是已完成 raw-chat forensic 校對的逐字母本。
4. 之後若建立 raw source vault，這份索引只更新 metadata，不重寫文件角色。

## Precedence Stack

- 1–2：根（strategy root）
- 3–4：頁面系統層（page system）
- 5：施工橋接層（implementation bridge）
- 6：呈現層（presentation review）
- 7：流程層（flow prototype）

| precedence | doc_id | title | layer | category | status | canonical_path | source_file | role | accepted_scope |
|---:|---|---|---|---|---|---|---|---|---|
| 1 | `strategy-site-map` | 全站設計地圖：用首頁主敘事帶整站 | root | strategy | `accepted_working_copy` | `project-docs/accepted/01_strategy/strategy-site-map.md` | `《全站設計地圖_用首頁主敘事帶整站》.md` | 首頁主敘事與整站分流母框架 | structure-aligned working copy |
| 2 | `frontend-review-spec-pack` | 可審閱的前台呈現規格包 | root-detail | strategy | `accepted_working_copy` | `project-docs/accepted/01_strategy/frontend-review-spec-pack.md` | `《可審閱的前台呈現規格包》.md` | 站級前台呈現規格與審版基準 | structure-aligned working copy |
| 3 | `selection-detail-spec` | Selection 詳細規格 | page-system | page-spec | `accepted_working_copy` | `project-docs/accepted/02_page-specs/selection-detail-spec.md` | `《Selection 詳細規格》.md` | Selection list / archive / dossier 的個體檔案系統規格 | structure-aligned working copy |
| 4 | `remaining-pages-detail-spec-pack-v1` | 其餘頁面詳細規格總包 v1 | page-system | page-spec | `accepted_working_copy` | `project-docs/accepted/02_page-specs/remaining-pages-detail-spec-pack-v1.md` | `《其餘頁面詳細規格總包 v1》.md` | Standards / Cultivation / Membership / Account / Support / Story 六頁總包 | structure-aligned working copy |
| 5 | `site-build-requirements-v1.1` | 全站可施工需求單 v1.1 修正版 | implementation-bridge | execution-bridge | `accepted_working_copy` | `project-docs/accepted/03_execution-bridge/site-build-requirements-v1.1.md` | `《全站可施工需求單 v1.1 修正版》.md` | 程序部可接手的單一施工母文件 | structure-aligned working copy |
| 6 | `static-review-mockup-pack-v1` | 靜態頁 review mockup 總包 v1 | presentation | execution-bridge | `accepted_working_copy` | `project-docs/accepted/03_execution-bridge/static-review-mockup-pack-v1.md` | `《靜態頁 review mockup 總包 v1》.md` | Home / Standards / Cultivation / Membership / Story 的靜態審版規格 | structure-aligned working copy |
| 7 | `flow-prototype-pack-v1` | 流程頁 prototype 總包 v1 | flow | execution-bridge | `accepted_working_copy` | `project-docs/accepted/03_execution-bridge/flow-prototype-pack-v1.md` | `《流程頁 prototype 總包 v1》.md` | Selection / Login / First Apply Gate / Account / Support 的流程驗證規格 | structure-aligned working copy |

## 當前判斷

- 目前 7 份文件可先視為同一套網站根。
- 後續真正要驗的是：**現有前台實作是否 drift**，不是再驗這 7 份彼此是否打架。
- 下一步不是新功能，而是做 `frontend-ui-conformance-checklist.md` 與 `current-site-drift-matrix.md`。