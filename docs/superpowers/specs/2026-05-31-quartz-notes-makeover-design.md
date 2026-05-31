# Quartz 笔记站美化与功能增强 — 设计文档

日期：2026-05-31
项目：`/Users/zhouzicheng/Desktop/Bio/notes`（Quartz v5.0.0，YAML 配置，插件从 `github:quartz-community/*` 拉取）

## 目标

在不引入重量级自定义插件的前提下，提升笔记站的**美观性**、**功能性**，**去除原作者品牌**（保留 "powered by Quartz" 署名），并支持**插入动画 / PDF / 视频 / 音频**。

## 已锁定决策

- **视觉方向**：A 的大留白 + C 的配色，调到「高级感」（用户已在视觉伴侣中确认"就这个感觉"）。
- **站名**：`Zicheng's Notes`。
- **实现路线**：方案 B —— `custom.scss` 做样式 + 纯 CSS 滚动驱动实现阅读增强（零 JS）+ 可复制的 HTML 嵌入模板。理由：代码最少、不与 Quartz 内部强耦合、插件更新不受影响。

## 注入点（已核实）

- 样式：`quartz/styles/custom.scss`（官方预留的自定义 CSS 入口，当前为空）。
- 配色：`quartz.config.yaml` → `configuration.theme.colors`。
- 站名：`quartz.config.yaml` → `configuration.pageTitle`。
- HTML 嵌入开关：`quartz.config.yaml` → obsidian-flavored-markdown 插件的 `enableInHtmlEmbed`（当前 `false`，需改 `true`）。
- Footer：`github:quartz-community/footer` 插件，渲染 `Created with Quartz vX © year` + 配置的链接。

## 四个工作块

### ① 配色 + 高级感样式

改 `quartz.config.yaml` 的 `theme.colors`，并在 `custom.scss` 写排版细节。

调色板：

| 角色 | 亮色 | 暗色 |
|---|---|---|
| 背景 light | `#fbfbfa` 纸白 | `#131316` 炭黑 |
| 正文 dark | `#1a1a1f` | `#e8e8ec` |
| 次要文字 gray | `#9a9aa3` | `#6a6a76` |
| 强调 secondary | `#4f46e5` 靛蓝 | `#8b85ff` 浅靛蓝 |
| 发丝线 lightgray | `#e7e7ea` | `#2a2a33` |
| 高亮 highlight | `rgba(79,70,229,.08)` | `rgba(139,133,255,.12)` |

`custom.scss` 高级感细节：
- 标题（Schibsted Grotesk）字距收紧 `letter-spacing:-.02em`，加大段落行高至 `1.7`。
- eyebrow 小标签样式（全大写、宽字距、靛蓝）供笔记可选使用。
- 标题下用 1px 发丝分隔线取代粗边框。
- 正文最大宽度与左右留白加大，提升长文可读性。
- callout / 标签 pill / 行内 code 统一成靛蓝点缀的克制风格。

### ② 去作者品牌

去品牌主要靠改站名；footer 原样保留，因为它本身就是用户要保留的 "powered by Quartz" 署名。

- `pageTitle: Quartz 5` → `Zicheng's Notes`（消除最显眼的默认品牌，显示在浏览器标签和页头）。
- Footer：**原样保留** `Created with Quartz vX © year`。它就是用户要的 powered-by 署名；其中 "Quartz" 链接指向 `quartz.jzhao.xyz`（Quartz 项目官方站，属合理署名，非个人信息暴露）。该链接 hardcode 在 footer 插件源码里，而插件缓存于 `.quartz/`（已被 gitignore，编辑不持久且会被重新拉取），故不改动。
- `LICENSE.txt` 的 MIT 版权声明保持不动（法律要求；不渲染到站点）。
- `package.json` 的 `author` 字段不影响渲染，保留不动。

### ③ 媒体嵌入

- 开启 `enableInHtmlEmbed: true`。
- 视频：YouTube（`enableYouTubeEmbed` 已开）、本地 mp4（`enableVideoEmbed` 已开）原生可用；Bilibili 提供可复制 `<iframe>` 模板。
- PDF：提供 `<iframe>`（或 `<embed>`）模板，`custom.scss` 加响应式容器（16:9 或自适应高度、圆角、边框）。
- 音频：`<audio controls>` 模板 + `custom.scss` 美化。
- 动画：Excalidraw 插件已开；GIF 原生支持；Lottie 暂不做（YAGNI，需要时再加）。
- 所有嵌入模板汇总进一篇示例笔记 `content/如何嵌入媒体.md`，方便用户复制。

### ④ 阅读 + 导航增强（纯 CSS）

全部写在 `custom.scss`，使用现代 CSS scroll-driven animations，零 JS：
- 顶部**阅读进度条**：`animation-timeline: scroll(root)` 驱动宽度。
- **回到顶部**按钮：`position:fixed` + scroll-driven 渐显。
- **图片点击放大**：CSS `:target` 或 `:has()`/`dialog` 纯 CSS 灯箱；若纯 CSS 体验不佳，降级为「点击在新标签打开原图」。
- 导航（侧栏 explorer / 目录 TOC / 搜索 / 面包屑）已启用，仅做高亮色与间距微调。

## 涉及文件

- `quartz.config.yaml`（pageTitle、theme.colors、enableInHtmlEmbed）
- `quartz/styles/custom.scss`（全部自定义样式）
- `content/如何嵌入媒体.md`（新增，嵌入模板示例）

## 非目标（YAGNI）

- 不写自定义 Quartz 插件 / 组件。
- 不加 Lottie、评论系统、自定义 JS 框架。
- 不动 `LICENSE.txt`、不重构现有插件配置中无关项。

## 验证

- 本地 `npx quartz build --serve` 起站，浏览器实测：
  - 亮/暗两种模式配色与高级感细节正确。
  - 进度条、回顶、图片放大可用。
  - Bilibili / YouTube / 本地视频 / PDF / 音频 五类嵌入在示例笔记中均能正常渲染播放。
  - 站名显示为 Zicheng's Notes，footer 仍有 Created with Quartz 署名。
- 检查浏览器兼容性：scroll-driven animations 在 Chrome/Edge/Safari TP 支持；Firefox 需降级（进度条/回顶在不支持时优雅隐藏，不报错）。
