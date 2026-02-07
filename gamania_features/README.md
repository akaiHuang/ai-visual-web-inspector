# Gamania 網站功能拆解分析

這個專案從真實的 Gamania 網站原始碼中提取各個動畫功能模組。

## ✅ 已完成功能

| 功能 | 目錄 | 狀態 |
|------|------|------|
| Loading 動畫 | `01-loading/` | ✅ 完成 |
| Timeline/Milestones | `02-milestones/` | ✅ 完成 |
| 3D Globe | `03-globe/` | 🔄 待完成 |
| Awards 卡片 | `04-awards/` | 🔄 待完成 |

## 📁 原始檔案位置
- **HTML**: `/gamania_site/www.gamania.com/about.html`
- **CSS**: `/gamania_site/www.gamania.com/_nuxt/entry.DKLpkfTP.css`
- **JS Modules**: `/gamania_site/www.gamania.com/_nuxt/` 目錄下的 JS 檔案

## 🎯 功能清單

### 1. Loading 動畫 (`01-loading/`)
**原始 CSS 類別**: `.slt-marquee`, `#loading-frame`
**動畫效果**: 
- 跑馬燈文字 "Loading..." 無限循環滾動
- 橘色圓形 Logo
- 背景過渡動畫

### 2. Timeline/Milestones (`02-milestones/`)
**原始 CSS 類別**: `.slt-gsap-milestones`
**動畫效果**:
- ScrollTrigger 驅動的滾動動畫
- 年份時間軸展示 (1995-2025)
- Three.js 3D 地球背景

### 3. 3D Globe (`03-globe/`)
**原始檔案**: `DxbP4td9.js`
**資源**:
- `gamaGlobe-texture-4K.MZCc6rjr.jpg` - 地球貼圖
- `gamaGlobe.CWMHV7T8.glb` - 3D 模型

## 📚 CSS 類別命名規範

原始網站使用 `slt-` 前綴的自定義類別:
- `slt-marquee` - 跑馬燈動畫
- `slt-display-1` ~ `slt-display-7` - 大型展示字體
- `slt-h1` ~ `slt-h6` - 標題字體
- `slt-body-1` ~ `slt-body-3` - 內文字體
- `slt-gsap-*` - GSAP ScrollTrigger 動畫標記
- `slt-bouncing` - 彈跳動畫

## 🔧 技術棧

- **框架**: Nuxt.js (Vue SSR)
- **CSS**: TailwindCSS + 自定義 slt- 類別
- **動畫**: GSAP 3.x + ScrollTrigger
- **3D**: Three.js + camera-controls
- **滑動**: Swiper.js
