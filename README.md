# 🌿 YeStep — 每一步，找回生活的呼吸

> 把每一個「Yes（願意）」化為實際的「Step（行動）」，選擇向前、選擇相信、選擇可行。
> 第一步可以很輕、很小、很不確定，但它依然是找回呼吸的開始。

## 📖 專案簡介

**YeStep** 是一個以「山系生活」與「自然療癒」為主題的步道探索平台，提供使用者搜尋步道、瀏覽主題活動、查看步道難度分級，以及管理個人會員資訊等功能。平台融合了自然美學的設計語彙，希望鼓勵每個人踏出第一步，在山林之間找回生活的呼吸節奏。

🔗 **Demo**：[https://malrichsu.github.io/yestep/](https://malrichsu.github.io/yestep/)

---

## ✨ 功能特色

| 功能 | 說明 |
|------|------|
| 🏠 **首頁展示** | Hero 影片 / 輪播切換、本月活動特輯 Swiper、熱門步道推薦 |
| 🔍 **步道搜尋** | 關鍵字搜尋、條件篩選、分頁瀏覽 |
| 🏔️ **步道詳情** | 完整步道資訊、星級評分、收藏功能 |
| 🏷️ **特色景觀分類** | 依景觀類型探索步道（如瀑布、森林、湖泊等） |
| 🎯 **主題活動** | 主題活動瀏覽、活動報名表單 |
| 📊 **步道難度指南** | 圖文並茂的難易度分級說明 |
| 👤 **會員系統** | 註冊、登入、個人資料管理（受保護路由） |
| 📈 **資料可視化** | 以 Chart.js 圖表呈現個人數據 |
| 🌙 **深色模式** | 支援深色主題切換 |
| 📱 **響應式設計** | 完整支援手機、平板、桌機瀏覽 |

---

## 🚀 技術棧

### 核心框架

- **React 19** — UI 建構
- **Vite 7** — 開發環境與打包工具
- **React Router v7** — 前端路由（Hash Router）

### 狀態管理

- **Redux Toolkit** + **React Redux** — 全域狀態管理（auth、info）

### UI / 樣式

- **Bootstrap 5** — 響應式排版與元件系統
- **Sass (SCSS)** — 客製化樣式與變數管理
- **Google Fonts** — Lexend / Noto Sans TC 字體
- **Material Symbols** — Google 圖示系統

### 互動與動畫

- **Swiper** — 輪播元件（Hero、主題活動、步道推薦）
- **Lottie** (`@lottiefiles/dotlottie-react`) — 向量動畫
- **React Loader Spinner** — 載入動畫

### 表單與資料

- **React Hook Form** — 表單驗證與管理
- **Chart.js** (`react-chartjs-2`) — 資料視覺化圖表
- **Axios** — HTTP 請求

### 認證與模擬後端

- **js-cookie** — Token 儲存管理
- **JSON Server** + **JSON Server Auth** — 模擬 RESTful API 與身份認證

### 開發工具

- **ESLint** — 程式碼品質檢查
- **Prettier** — 程式碼格式化
- **gh-pages** — GitHub Pages 部署

---

## 📁 專案架構

```
yestep/
├── public/                  # 靜態資源
│   └── logo.png
├── src/
│   ├── assets/
│   │   ├── images/          # 圖片資源（依頁面分類）
│   │   ├── scss/            # 樣式檔案
│   │   │   ├── _variables.scss
│   │   │   ├── _variables-dark.scss
│   │   │   ├── base/        # 基礎樣式
│   │   │   ├── components/  # 元件樣式
│   │   │   ├── layout/      # 佈局樣式
│   │   │   ├── page/        # 頁面樣式
│   │   │   ├── util/        # 工具樣式
│   │   │   └── all.scss     # 樣式進入點
│   │   └── videos/          # 影片資源
│   ├── components/          # 共用元件（24 個）
│   │   ├── Nav.jsx          # 導覽列
│   │   ├── Footer.jsx       # 頁尾
│   │   ├── HeroSwiper.jsx   # Hero 輪播
│   │   ├── PopularTrails.jsx # 熱門步道
│   │   ├── SearchBar.jsx    # 搜尋列
│   │   ├── TrailCard.jsx    # 步道卡片
│   │   └── ...
│   ├── data/                # 靜態資料
│   ├── pages/               # 頁面元件
│   │   ├── Home.jsx         # 首頁
│   │   ├── TrailSearchPage.jsx # 步道搜尋
│   │   ├── TrailDetail.jsx  # 步道詳情
│   │   ├── TrailTag.jsx     # 步道分類
│   │   ├── Theme.jsx        # 主題活動
│   │   ├── Member.jsx       # 會員中心
│   │   ├── Login.jsx        # 登入
│   │   ├── Register.jsx     # 註冊
│   │   ├── ProtectedRoute.jsx # 路由守衛
│   │   └── NotFound404.jsx  # 404 頁面
│   ├── server/              # API 設定
│   │   └── api.js
│   ├── slices/              # Redux Slices
│   │   ├── authSlice.js     # 認證狀態
│   │   └── infoSlice.js     # 資訊狀態
│   ├── utils/               # 工具函式
│   │   ├── error.js         # 錯誤處理
│   │   └── formatNumber.js  # 數字格式化
│   ├── App.jsx              # 根元件
│   ├── main.jsx             # 應用進入點
│   ├── router.jsx           # 路由設定
│   └── store.js             # Redux Store
├── db.json                  # JSON Server 資料庫
├── server.cjs               # API 伺服器設定
├── index.html               # HTML 進入點
├── vite.config.js           # Vite 設定
├── package.json
└── .env                     # 環境變數
```

---

## 🛠️ 快速開始

### 環境需求

- [Node.js](https://nodejs.org/) v18 以上
- npm v9 以上

### 1. Clone 專案

```bash
git clone https://github.com/MalricHsu/yestep.git
cd yestep
```

### 2. 安裝依賴

```bash
npm install
```

### 3. 設定環境變數

專案根目錄已包含 `.env` 檔案，預設設定如下：

```env
VITE_API_URL=http://localhost:3000/
```

### 4. 啟動開發環境

需要同時啟動 **前端開發伺服器** 與 **模擬 API 伺服器**：

```bash
# 終端機 1：啟動 Vite 前端開發伺服器（預設 port 5173）
npm run dev

# 終端機 2：啟動 JSON Server 模擬後端（預設 port 3000）
npm run start
```

開啟瀏覽器前往 [http://localhost:5173](http://localhost:5173) 即可檢視。

---

## 📜 指令碼一覽

| 指令 | 說明 |
|------|------|
| `npm run dev` | 啟動 Vite 開發伺服器，支援 HMR 熱更新 |
| `npm run start` | 啟動 JSON Server 模擬 API 伺服器 (`server.cjs`) |
| `npm run build` | 打包生產環境靜態檔案至 `dist/` 目錄 |
| `npm run preview` | 本地預覽生產環境打包結果 |
| `npm run lint` | 執行 ESLint 程式碼品質檢查 |
| `npm run deploy` | 打包並部署至 GitHub Pages |

---

## 🌐 部署

本專案透過 **GitHub Pages** 進行部署，執行以下指令即可自動打包並發布：

```bash
npm run deploy
```

此指令會依序執行 `vite build` 與 `gh-pages -d dist`，將 `dist/` 目錄推送至 `gh-pages` 分支。

---

## 📐 設計文件

- **Wireframe**：[Miro 線框稿](https://miro.com/app/board/uXjVJqXihk4=/?share_link_id=113737613315)
- **UI 設計稿**：[Figma 設計稿](https://www.figma.com/design/3Omf5X7XLmBpr6ObwjbpTO/-C-1-YeStep-—-每一步，找回生活的呼吸?node-id=0-1&t=J9W9SpziNP5kyrtj-1)

---

## 🖼️ 設計理念

YeStep 的設計圍繞著三個核心理念：

- **🌲 自然美學** — 以山林、森林為靈感，運用大地色系與自然意象打造沉浸式體驗
- **🫁 呼吸節奏** — 透過留白、動畫與流暢的互動，營造舒適的瀏覽步調
- **👣 踏出第一步** — 簡潔直覺的操作流程，降低使用門檻，讓每位使用者都能輕鬆探索

---

## 📄 授權

此專案為六角學院框架專題班之課程作品。
