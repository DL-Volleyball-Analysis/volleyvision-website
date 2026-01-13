# VolleyVision AI Website | 排球分析系統官網

The official landing page for VolleyVision AI - an advanced volleyball analysis system powered by deep learning.

VolleyVision AI 官方網站 - 基於深度學習的進階排球比賽分析系統。

## Live Demo | 線上展示

[https://dl-volleyball-analysis.github.io/volleyvision-website/](https://dl-volleyball-analysis.github.io/volleyvision-website/)

---

## Features | 功能特色

| Feature | Description |
|---------|-------------|
| Bilingual | Full English and Traditional Chinese support |
| Responsive | Mobile-first design with adaptive layouts |
| Dark Theme | Mikasa volleyball-inspired color scheme |
| LINE Font | Custom LINE Seed font for better readability |
| Demo Video | Embedded system demonstration |
| Performance | Static export for fast loading |

| 功能 | 說明 |
|------|------|
| 雙語支援 | 完整的英文和繁體中文支援 |
| 響應式設計 | 行動裝置優先的自適應版面 |
| 深色主題 | Mikasa 排球配色靈感 |
| LINE 字型 | 自訂 LINE Seed 字型提升閱讀體驗 |
| 展示影片 | 嵌入式系統演示 |
| 高效能 | 靜態輸出快速載入 |

---

## Tech Stack | 技術堆疊

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Font**: LINE Seed TW / LINE Seed Sans
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

---

## Development | 開發

### Prerequisites | 前置需求

- Node.js 18+
- npm

### Install | 安裝

```bash
npm install
```

### Run Development Server | 啟動開發伺服器

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build | 建置

```bash
npm run build
```

Output will be in the `out/` directory.

---

## Project Structure | 專案結構

```
volleyvision-website/
├── app/                    # Next.js App Router pages
│   ├── globals.css         # Global styles + Mikasa colors
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── Hero.tsx            # Hero section
│   ├── Features.tsx        # Features section
│   ├── Demo.tsx            # Demo section
│   ├── Navigation.tsx      # Navigation bar
│   ├── Footer.tsx          # Footer
│   └── ...
├── contexts/               # React contexts
│   └── LanguageContext.tsx # i18n context
├── lib/                    # Utilities
│   └── translations.ts     # Translation strings
├── public/                 # Static assets
│   ├── fonts/              # LINE Seed fonts
│   ├── videos/             # Demo video
│   └── ...
└── .github/workflows/      # CI/CD
    └── deploy.yml          # GitHub Pages deployment
```

---

## Color Palette | 配色

Inspired by Mikasa volleyball official colors:

| Color | Hex | Usage |
|-------|-----|-------|
| Mikasa Blue | #0033A0 | Primary background, headers |
| Mikasa Yellow | #FFD100 | Accents, buttons, highlights |
| Blue Light | #1E4FC2 | Hover states |
| Blue Dark | #001F5C | Deep backgrounds |

---

## Related Projects | 相關專案

| Project | Description |
|---------|-------------|
| [volleyball_analysis_webapp](https://github.com/DL-Volleyball-Analysis/volleyball_analysis_webapp) | Main web application with backend and AI core |
| [volleyball-court-detection](https://github.com/DL-Volleyball-Analysis/volleyball-court-detection) | Court detection and ball landing analysis |
| [action-recognition-yolov11](https://github.com/DL-Volleyball-Analysis/action-recognition-yolov11) | Player action recognition training |

---

## Deployment | 部署

This site is automatically deployed to GitHub Pages on push to `main` branch.

Manual deployment:

```bash
npm run build
# Upload contents of 'out/' to your hosting
```

---

## License | 授權

This project is part of the DL-Volleyball-Analysis capstone project.

本專案為 DL-Volleyball-Analysis 專題研究的一部分。

---

*National Taiwan Ocean University - Department of Computer Science*  
*國立臺灣海洋大學 資訊工程學系*
