<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Role Plant 專案說明

這是一個使用 React + Vite + TypeScript + Firebase 打造的專案。
本文件包含了所有本機開發、啟動、建置與部署的必要指導。

## 1. 專案如何安裝與本地啟動

**先決條件：** Node.js (建議 v18 或以上)

1. **安裝依賴套件：**
   於專案根目錄下執行：
   ```bash
   npm install
   ```
2. **環境變數設定：**
   此專案環境變數為 `.env` 系列。你可以將專案的 `.env.example` 複製一份並重新命名為 `.env.local` 或 `.env`：
   ```bash
   cp .env.example .env.local
   ```
   接著，進入該檔案補上必要的設定（例如 `GEMINI_API_KEY=你的_API_KEY`）。

3. **本地啟動：**
   ```bash
   npm run dev
   ```
   預設會在 `http://localhost:3000` 或終端機提示的 port 啟動你的開發伺服器。

## 2. 如何 Build（本地建置）

若需確認專案是否可以編譯成正式環境使用的靜態檔，請執行：
```bash
npm run build
```
執行完畢後，產生的靜態檔案會放置於 `dist/` 目錄下。這也代表你的 TypeScript 與程式碼檢查已過關。

## 3. Firebase Hosting 手動部署

我們已經在專案根目錄補上了 `firebase.json`，若你希望在本地直接手動部署至 Firebase Hosting：
1. 全域安裝 Firebase CLI：
   ```bash
   npm install -g firebase-tools
   ```
2. 登入 Firebase：
   ```bash
   firebase login
   ```
3. 執行部署（需先 build 出 `dist/`）：
   ```bash
   firebase deploy --only hosting
   ```

## 4. GitHub Actions 自動部署

我們已經在 `.github/workflows/firebase-deploy.yml` 設置了 GitHub Actions 腳本。
目標是：**只要將程式碼 push 到 `main` 分支，GitHub 就會自動執行建置，並將成果預覽或部署至 Firebase Hosting。**

### GitHub Secrets 需要設定什麼？

為了讓 GitHub Actions 能取得部署權限，請在 GitHub 專案的 **Settings > Secrets and variables > Actions** 中，新增以下 Secret：

- **名稱：** `FIREBASE_SERVICE_ACCOUNT`
- **用途：** Firebase 服務帳戶的認證金鑰，讓 GitHub 有權限幫你更新 Hosting 內容。
- **如何取得與設定：** 
  1. 前往 Firebase Console 中的「專案設定」 (Project settings)。
  2. 切換到「服務帳戶」 (Service accounts) 頁籤。
  3. 點擊「產生新的私密金鑰」 (Generate new private key)。
  4. 這樣會下載一個 JSON 格式檔案。用文字編輯器打開它，將裡面的 **全部內容** 複製。
  5. 到 GitHub 貼上為 `FIREBASE_SERVICE_ACCOUNT` 的值。

*(註：GitHub Token (`GITHUB_TOKEN`) 是 GitHub 內建自動提供的，不需要額外設定。)*

## 5. 常見錯誤排查方式

- **安裝失敗 (npm install) 或權限錯誤**
  Windows 若遇 PowerShell `UnauthorizedAccess` 執行原則錯誤，請嘗試改用 `cmd.exe`，或在 PowerShell 使用系統管理員身分執行：`Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`。
- **TypeScript 建置失敗 (TS2339 等錯誤)**
  請確認是否有在程式碼中補上缺失的定義，或暫時用 `any` 避開。
- **Firebase Deploy 失敗**
  若是自動部署失敗，請檢查 `FIREBASE_SERVICE_ACCOUNT` Secret 內容是否不完整（JSON 缺括號等）。若是 projectId 改變，請到 workflow 檔案中更新 projectId。
- **畫面空白或 API 沒有回傳**
  請確保有把環境變數正確寫入 `.env.local`。Vite 需有 `VITE_` 開頭或指定定義好的環境變數（如 `GEMINI_API_KEY`）才會被讀入。
