# YeStep — 每一步，找回生活的呼吸

YeStep 的誕生，來自一個簡單卻重要的想法：把每一個「Yes（願意）」化為實際的「Step（行動）」，選擇向前、選擇相信、選擇可行，第一步可以很輕、很小、很不確定。但它依然是找回呼吸的開始，讓你看見森林的寧靜、山稜的光線，還有踏出每一步的自己！

## 🚀 專案技術棧 (Tech Stack)

此專案為使用 **React + Vite** 建置的前端應用程式。

- **核心框架**: React 19, Vite
- **狀態管理**: Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
- **路由導覽**: React Router v7 (`react-router`, `react-router-dom`)
- **UI 樣式與元件**: Bootstrap 5, Sass
- **輪播與動畫**: Swiper, Lottie Animations (`@lottiefiles/dotlottie-react`), React Loader Spinner
- **表單處理**: React Hook Form
- **資料可視化**: Chart.js (`react-chartjs-2`)
- **HTTP 請求**: Axios
- **認證與儲存**: js-cookie
- **模擬後端服務**: JSON Server, JSON Server Auth (`json-server`, `json-server-auth`)

## 🛠️ 快速開始 (Getting Started)

### 1. 安裝依賴 (Installation)

請先確保您的環境已安裝 [Node.js](https://nodejs.org/) ，然後在專案根目錄下執行：

```bash
npm install
```

### 2. 啟動環境 (Development)

專案包含前端環境與模擬 API 伺服器，需要分別啟動或透過對應指令執行：

```bash
# 啟動 Vite 前端開發伺服器
npm run dev
```

```bash
# 啟動 JSON Server 模擬後端 (執行 server.cjs)
npm run start
```

## 📜 可用指令碼 (Available Scripts)

在專案目錄中，您可以執行以下指令：

- `npm run dev`：啟動 Vite 開發伺服器，支援模組熱替換 (HMR)。
- `npm run start`：使用 Node 啟動本地 API 伺服器 (`server.cjs`)。
- `npm run build`：將應用程式打包，產出可用於生產環境的最佳化靜態檔案至 `dist` 目錄。
- `npm run preview`：在本地預覽打包後的生產環境網站。
- `npm run lint`：執行 ESLint 進行程式碼品質及一致性檢查。
- `npm run deploy`：自動執行打包編譯，並將 `dist` 目錄推送到 GitHub Pages 進行部署。

## 🌲 設計理念與功能

- **個人化實踐**：提供記錄生活、冥想、或探索步旅等自我對話的功能。
- **現代化介面**：結合 Bootstrap Responsive 排版與 Lottie 舒適的動畫回饋。
- **資料可視化**：將個人目標或數據以 Chart.js 生成清晰的圖表展現。
