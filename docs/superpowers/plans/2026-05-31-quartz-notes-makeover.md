# Quartz 笔记站美化与功能增强 — 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在不引入自定义插件的前提下，给 Quartz v5 笔记站做高级感重配色、去默认品牌、开启媒体（视频/PDF/音频/动画）嵌入，并加纯 CSS 阅读进度条。

**Architecture:** 方案 B——只改三处：`quartz.config.yaml`（站名/配色/HTML 嵌入开关）、`quartz/styles/custom.scss`（全部自定义样式，复用 Quartz 由配色生成的 CSS 变量）、新增 `content/如何嵌入媒体.md`（可复制嵌入模板）。验证靠本地构建 + 浏览器实测。

**Tech Stack:** Quartz v5.0.0、YAML 配置、SCSS（custom.scss）、现代 CSS scroll-driven animations。

**验证基线命令（每个任务用）：** `npx quartz build --serve`，浏览器开 `http://localhost:8080` 实测，亮/暗模式各看一遍。

---

### Task 1: 配置——站名 + 配色 + 开启 HTML 嵌入

**Files:**
- Modify: `quartz.config.yaml`

- [ ] **Step 1: 改站名**

把 `configuration.pageTitle` 从 `Quartz 5` 改为：

```yaml
  pageTitle: Zicheng's Notes
```

- [ ] **Step 2: 替换亮/暗配色**

把 `configuration.theme.colors` 整块替换为：

```yaml
    colors:
      lightMode:
        light: "#fbfbfa"
        lightgray: "#e7e7ea"
        gray: "#9a9aa3"
        darkgray: "#33333a"
   dark: "#1a1a1f"
        secondary: "#4f46e5"
        tertiary: "#8b85ff"
        highlight: "rgba(79,70,229,0.08)"
        textHighlight: "#fff23688"
      darkMode:
    light: "#131316"
        lightgray: "#2a2a33"
        gray: "#6a6a76"
        darkgray: "#c2c2cc"
     dark: "#e8e8ec"
        secondary: "#8b85ff"
        tertiary: "#4f46e5"
        highlight: "rgba(139,133,255,0.12)"
        textHighlight: "#b3aa0288"
```

- [ ] **Step 3: 开启 HTML 嵌入**

在 `obsidian-flavored-markdown` 插件的 `options` 里把 `enableInHtmlEmbed` 改为 `true`：

```yaml
  enableInHtmlEmbed: true
```

- [ ] **Step 4: 构建实测**

Run: `npx quartz build --serve`
Expected: 构建无报错；浏览器标签与页头显示 `Zicheng's Notes`；亮色背景纸白、暗色背景炭黑；链接/强调色为靛蓝。

- [ ] **Step 5: 提交**

```bash
git add quartz.config.yaml
git commit -m "feat: rebrand site name and apply premium indigo palette"
```

---

### Task 2: custom.scss——高级感排版与留白

**Files:**
- Modify: `quartz/styles/custom.scss`

- [ ] **Step 1: 写排版样式**

把 `quartz/styles/custom.scss` 内容替换为（保留首行 `@use`）：

```scss
@use "./variables.scss" as *;

// 标题：Grotesk 收紧字距
h1, h2, h3 { letter-spacing: -0.02em; }

// 正文：加大行高与可读宽度
article p, article li { line-height: 1.7; }
article { max-width: 750px; }

// h1 下发丝分隔线（取代粗边框）
article > h1:first-of-type {
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--lightgray);
  margin-bottom: 1.2rem;
}

// eyebrow 小标签工具类（笔记里可选用 <span class="eyebrow">…</span>）
.eyebrow {
  display: inline-block;
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--secondary);
  margin-bottom: 0.4rem;
}

// 行内 code / 标签 pill 用靛蓝点缀
code:not([data-language]) {
  background: var(--highlight);
  color: var(--secondary);
  border-radius: 4px;
  padding: 0.1em 0.35em;
}
```

- [ ] **Step 2: 构建实测**

Run: `npx quartz build --serve`
Expected: 标题字距收紧、正文行高变宽、首个 h1 下出现 1px 发丝线、行内代码为靛蓝；亮/暗模式都正常（颜色走 CSS 变量自动适配）。

- [ ] **Step 3: 提交**

```bash
git add quartz/styles/custom.scss
git commit -m "feat: add premium typography and spacing"
```

---

### Task 3: custom.scss——响应式媒体嵌入与音频样式

**Files:**
- Modify: `quartz/styles/custom.scss`

- [ ] **Step 1: 追加媒体样式**

在 `custom.scss` 末尾追加：

```scss
// 视频/PDF 等 iframe 响应式容器：笔记里用 <div class="embed"> 包裹 iframe
.embed {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  margin: 1.5rem 0;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--lightgray);
}
.embed iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }

// PDF 高度更高：<div class="embed pdf">
.embed.pdf { aspect-ratio: 3 / 4; }

// 音频播放器
audio { width: 100%; margin: 1rem 0; }
```

- [ ] **Step 2: 构建实测**

Run: `npx quartz build --serve`
Expected: 构建无报错（此任务的渲染效果在 Task 4 放入真实嵌入后一并验证）。

- [ ] **Step 3: 提交**

```bash
git add quartz/styles/custom.scss
git commit -m "feat: add responsive media embed and audio styling"
```

---

### Task 4: 新增嵌入示例笔记（同时验证 Task 3 样式）

**Files:**
- Create: `content/如何嵌入媒体.md`

- [ ] **Step 1: 写示例笔记**

创建 `content/如何嵌入媒体.md`，内容：

````markdown
---
title: 如何嵌入媒体
---

> 复制下面对应的片段到任意笔记即可。

## Bilibili

```
<div class="embed"><iframe src="https://player.bilibili.com/player.html?bvid=BV1xx411c7mD&autoplay=0" allowfullscreen></iframe></div>
```

<div class="embed"><iframe src="https://player.bilibili.com/player.html?bvid=BV1xx411c7mD&autoplay=0" allowfullscreen></iframe></div>

## YouTube（原生支持，直接贴链接）

![](https://www.youtube.com/watch?v=dQw4w9WgXcQ)

## 本地视频（放入 content 后用相对路径）

```
<video controls src="./video.mp4"></video>
```

## PDF（放入 content 后内嵌阅读）

```
<div class="embed pdf"><iframe src="./slides.pdf"></iframe></div>
```

## 音频

```
<audio controls src="./audio.mp3"></audio>
```

## 动画

- 手绘动画：用 Excalidraw 插件（`.excalidraw` 文件）
- GIF：直接 `![](./anim.gif)`
````

- [ ] **Step 2: 构建实测**

Run: `npx quartz build --serve`
Expected: 打开「如何嵌入媒体」页；Bilibili iframe 以 16:9 圆角容器渲染并可播放；代码块正常显示供复制；亮/暗模式容器边框颜色自适应。

- [ ] **Step 3: 提交**

```bash
git add "content/如何嵌入媒体.md"
git commit -m "docs: add media embedding examples note"
```

---

### Task 5: custom.scss——纯 CSS 阅读进度条 + 图片放大提示

**Files:**
- Modify: `quartz/styles/custom.scss`

- [ ] **Step 1: 追加阅读进度条与图片样式**

在 `custom.scss` 末尾追加：

```scss
// 顶部阅读进度条：纯 CSS scroll-driven，零 JS 零额外 DOM
@supports (animation-timeline: scroll()) {
  body::before {
    content: "";
    position: fixed;
    top: 0; left: 0;
    height: 3px;
    width: 100%;
    transform-origin: 0 50%;
    background: var(--secondary);
    z-index: 100;
    animation: progress linear;
    animation-timeline: scroll(root);
  }
  @keyframes progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
}

// 图片放大提示（点击在新标签看原图的 affordance）
article img { cursor: zoom-in; border-radius: 8px; transition: transform 0.15s; }
article img:hover { transform: scale(1.01); }
```

- [ ] **Step 2: 构建实测**

Run: `npx quartz build --serve`
Expected: Chrome/Edge/Safari 中滚动页面，顶部出现靛蓝进度条随滚动增长；Firefox（不支持 scroll-timeline）下进度条优雅消失、不报错；图片 hover 有放大光标与微缩放。

- [ ] **Step 3: 提交**

```bash
git add quartz/styles/custom.scss
git commit -m "feat: add CSS-only reading progress bar and image affordance"
```

---

## 可选（与 spec 的「零 JS」略有出入，执行时再定）

**回到顶部按钮 / 完整图片灯箱**：二者都需要一个 DOM 元素或几行客户端脚本（纯 CSS 无法为自动生成的 Markdown 注入）。如需要，最小做法是新增一个轻量 Quartz `afterBody` 组件注入一个 `<a href="#">↑</a>` 按钮 + 一段约 10 行的图片灯箱脚本。默认不做，保持 spec 的「零 JS / 无自定义组件」承诺。

## 非目标

不写自定义插件（可选项除外）、不加 Lottie/评论、不动 `LICENSE.txt` 与 footer 源码。
