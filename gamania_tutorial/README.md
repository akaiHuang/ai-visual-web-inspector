# Gamania 橘子集團官網動畫效果教學

本教學文件分析 gamania.com 關於頁面的主要視覺效果和動畫實現技術。

## 目錄

1. [Loading 載入動畫](#1-loading-載入動畫)
2. [SVG 動畫製作](#2-svg-動畫製作)
3. [滾動遮罩變黑效果](#3-滾動遮罩變黑效果)
4. [歷史時間軸動畫](#4-歷史時間軸動畫)
5. [3D 物件載入與渲染](#5-3d-物件載入與渲染)
6. [集團版圖 3D 互動效果](#6-集團版圖-3d-互動效果)

## 技術堆疊

- **框架**: Nuxt.js 3 (Vue.js SSR)
- **動畫庫**: GSAP (GreenSock Animation Platform) + ScrollTrigger
- **3D 渲染**: Three.js
- **3D 模型格式**: GLB (使用 Draco 壓縮)
- **CSS**: TailwindCSS

---

## 1. Loading 載入動畫

### 原理說明

Gamania 的 Loading 效果使用了以下技術組合：
- 全螢幕覆蓋層 (`fixed` 定位)
- CSS 動畫實現圓形 Logo 的縮放效果
- 跑馬燈式的 "Loading..." 文字動畫
- 使用 GSAP 控制載入完成後的退場動畫

### 核心 HTML 結構

```html
<div id="loading-frame" class="fixed left-0 top-0 h-full w-full z-[2000] bg-gray-200">
  <!-- Logo 圓形動畫 -->
  <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
    <div class="rounded-full bg-orange-500 animate-pulse"></div>
    <span class="loading-spinner"></span>
  </div>
  
  <!-- 跑馬燈文字 -->
  <div class="absolute bottom-8 left-0 right-0 overflow-x-hidden">
    <div class="flex flex-nowrap animate-marquee">
      <span>Loading... </span>
      <span>Loading... </span>
      <span>Loading... </span>
    </div>
  </div>
  
  <!-- 橘色退場遮罩 -->
  <div class="translate-y-full absolute left-0 top-0 h-full w-full bg-orange-500 transition-transform"></div>
</div>
```

### 範例檔案

請參考 [examples/01-loading/](./examples/01-loading/) 資料夾

---

## 2. SVG 動畫製作

### 原理說明

網站使用 inline SVG 配合 CSS 動畫實現多種效果：
- Logo 動畫 (使用 `path` 繪製)
- 箭頭 Hover 效果 (translateX 位移)
- 外部連結圖示動畫

### SVG 箭頭動畫技巧

```css
/* 箭頭 Hover 動畫 */
.btn__arrow {
  position: absolute;
  right: 0;
  top: 0;
  transition: transform 0.3s cubic-bezier(0.17, 0.67, 0.3, 1.33);
}

.btn__arrow--hover {
  transform: translate3d(-100%, 0, 0);
}

/* Hover 時的效果 */
.btn:hover .btn__arrow--main {
  transform: translate3d(100%, 0, 0);
}

.btn:hover .btn__arrow--hover {
  transform: translateZ(0);
}
```

### 文字逐字動畫

```html
<p class="relative overflow-hidden">
  <span>
    <span style="transition-delay: 0s" class="inline-block transition-transform hover:translate-y-[-100%]">關</span>
    <span style="transition-delay: 0.04s" class="inline-block transition-transform hover:translate-y-[-100%]">於</span>
    <span style="transition-delay: 0.08s" class="inline-block transition-transform hover:translate-y-[-100%]">橘</span>
    <span style="transition-delay: 0.12s" class="inline-block transition-transform hover:translate-y-[-100%]">子</span>
  </span>
  <!-- 複製一份做為 hover 替換文字 -->
  <span class="absolute left-0 top-[100%]">...</span>
</p>
```

### 範例檔案

請參考 [examples/02-svg-animation/](./examples/02-svg-animation/) 資料夾

---

## 3. 滾動遮罩變黑效果

### 原理說明

這是透過 GSAP ScrollTrigger 實現的滾動驅動動畫：
- 監聽滾動位置
- 根據滾動進度改變背景透明度或覆蓋層
- 使用 `position: fixed` 固定背景

### GSAP ScrollTrigger 實作

```javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 創建滾動遮罩效果
gsap.to('.overlay', {
  opacity: 1,
  backgroundColor: '#000000',
  scrollTrigger: {
    trigger: '.about-section',
    start: 'top top',
    end: 'bottom top',
    scrub: true, // 與滾動同步
  }
});
```

### 關鍵 CSS

```css
/* 固定定位的遮罩層 */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: transparent;
  pointer-events: none;
  z-index: 10;
}
```

### 範例檔案

請參考 [examples/03-scroll-mask/](./examples/03-scroll-mask/) 資料夾

---

## 4. 歷史時間軸動畫

### 原理說明

橘子的歷史時間軸動畫使用多層次的滾動動畫：
- 固定高度的滾動區域 (`height: 8000px`)
- 固定定位的視口顯示區域
- 根據滾動進度顯示/隱藏不同的時間點
- 3D 場景配合滾動旋轉

### 結構設計

```html
<section class="relative">
  <!-- 創建很高的滾動區域 -->
  <div class="gsap-milestones" style="height: 8000px;">
    <!-- 固定的顯示視窗 -->
    <div class="fixed top-0 h-screen w-full">
      <!-- Three.js Canvas 放這裡 -->
      <canvas id="webgl-canvas"></canvas>
      
      <!-- 時間軸文字內容 (隱藏，透過 GSAP 控制顯示) -->
      <div class="timeline-content">
        <h1 id="milestone-title-0">顛覆自我的破壞式創新</h1>
        <div id="milestone-event-1-0">
          <h2>1995'</h2>
          <p>富峰群資訊推出單機遊戲《便利商店》</p>
        </div>
        <!-- 更多時間點... -->
      </div>
    </div>
  </div>
</section>
```

### GSAP 時間軸控制

```javascript
// 創建主時間軸
const mainTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: '.gsap-milestones',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1, // 平滑滾動
  }
});

// 依序顯示各個時間點
mainTimeline
  .to('#milestone-title-0', { opacity: 1, x: 0, duration: 1 })
  .to('#milestone-event-1-0', { opacity: 1, y: 0, duration: 0.5 }, '+=0.5')
  .to('#milestone-event-1-1', { opacity: 1, y: 0, duration: 0.5 }, '+=0.3');
```

### 範例檔案

請參考 [examples/04-timeline-scroll/](./examples/04-timeline-scroll/) 資料夾

---

## 5. 3D 物件載入與渲染

### 原理說明

網站使用 Three.js 載入 GLB 格式的 3D 模型：
- GLTFLoader 載入 GLB 檔案
- DRACOLoader 解壓縮 Draco 壓縮的模型
- 自訂材質和紋理

### 核心程式碼

```javascript
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

// 初始化場景
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.01, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

// 設定 Draco 解碼器
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');
dracoLoader.setDecoderConfig({ type: 'js' });

// 設定 GLTF 載入器
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

// 載入模型
gltfLoader.load('/models/gamaGlobe.glb', (gltf) => {
  const model = gltf.scene;
  
  // 設定模型位置和旋轉
  model.rotation.set(
    THREE.MathUtils.degToRad(-90),
    THREE.MathUtils.degToRad(17.5),
    0
  );
  
  // 載入紋理
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('/textures/gamaGlobe-texture-4K.jpg');
  texture.colorSpace = THREE.SRGBColorSpace;
  
  // 應用材質
  model.children[0].material = new THREE.MeshBasicMaterial({ map: texture });
  
  scene.add(model);
});

// 動畫循環
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
```

### 模型配置範例

```javascript
// 多個 3D 物件的配置
const modelConfigs = {
  gama: {
    path: '/models/gamaGlobe.glb',
    position: new THREE.Vector3(0, 0, 0),
    isMain: true
  },
  blueRing: {
    path: '/about/glb/blue_ring.glb',
    position: new THREE.Vector3(2.3 * Math.cos(Math.PI * 0.333), 0, 2.3 * Math.sin(Math.PI * 0.333))
  },
  greenPic: {
    path: '/about/glb/green_pic.glb',
    position: new THREE.Vector3(2.3 * Math.cos(Math.PI * 1.333), 0, 2.3 * Math.sin(Math.PI * 1.333))
  },
  // 更多模型...
};
```

### 範例檔案

請參考 [examples/05-3d-loading/](./examples/05-3d-loading/) 資料夾

---

## 6. 集團版圖 3D 互動效果

### 原理說明

這是最複雜的部分，結合了：
- Three.js 3D 場景渲染
- 星空粒子背景
- 3D 地球模型與軌道物件
- Camera Controls 控制器
- 滑鼠/觸控互動
- 標籤 DOM 元素定位

### 星空背景實作

```javascript
// 創建星空粒子
function createStars() {
  const geometry = new THREE.BufferGeometry();
  const count = 5000;
  const positions = new Float32Array(count * 3);
  
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 100;
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
  // 使用星星紋理
  const textureLoader = new THREE.TextureLoader();
  const starTexture = textureLoader.load('/about/star.png');
  
  const material = new THREE.PointsMaterial({
    size: 0.1,
    map: starTexture,
    transparent: true,
    depthWrite: false,
  });
  
  const stars = new THREE.Points(geometry, material);
  scene.add(stars);
}
```

### 3D 標籤定位

```javascript
// 將 3D 座標轉換為螢幕座標
function updateLabels() {
  labels.forEach((label) => {
    const position = label.object3D.position.clone();
    position.project(camera);
    
    const x = (position.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-(position.y * 0.5) + 0.5) * window.innerHeight;
    
    label.element.style.transform = `translate(${x}px, ${y}px)`;
    
    // 根據深度調整可見性
    label.element.style.opacity = position.z < 1 ? 1 : 0;
  });
}
```

### 標籤 HTML 結構

```html
<div class="label" style="position: absolute;">
  <span class="label-icon">+</span>
  <p class="label-text">Digital Games</p>
  <span class="label-coord">+0° 100'</span>
</div>
```

### 範例檔案

請參考 [examples/06-globe-interaction/](./examples/06-globe-interaction/) 資料夾

---

## 安裝與運行

```bash
# 安裝依賴
npm install

# 運行開發伺服器
npm run dev
```

## 依賴套件

```json
{
  "dependencies": {
    "three": "^0.169.0",
    "gsap": "^3.12.0"
  }
}
```

## 注意事項

1. **效能優化**: 3D 場景較耗資源，建議使用 `requestAnimationFrame` 並在離開視窗時暫停渲染
2. **行動裝置適配**: 使用響應式設計，並簡化手機版的 3D 效果
3. **載入時間**: GLB 模型較大，建議使用 Draco 壓縮，並顯示載入進度
4. **瀏覽器兼容**: 確保 WebGL 支援，並提供降級方案

## 參考資源

- [Three.js 官方文檔](https://threejs.org/docs/)
- [GSAP ScrollTrigger](https://greensock.com/scrolltrigger/)
- [GLTFLoader 文檔](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)
