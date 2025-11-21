# Omni Hemsida

静态网站模板 / 小型公司网站示例  
仓库名: `omni_hemsida`

---

## 项目概述

这是一个基于静态 HTML、CSS 和少量 JavaScript 的网站模板，包含多个页面版本与样式文件，适合作为小型公司或产品展示页的起点。项目没有构建步骤或后端依赖，易于本地预览和部署到任何静态托管服务（GitHub Pages、Netlify、Vercel 等）。

主要特点：
- 纯静态文件（HTML/CSS/JS）
- 资源组织良好（`css/`, `js/`, `img/`）
- 包含多套样式（`style_v2.css` 等）与页面变体（`index_V2.html`）

---

## 目录结构（重要文件说明）

- `index.html`  
  站点主页面（版本 1）。

- `index_V2.html`  
  站点主页面的另一个版本（版本 2），用于替代或进行 A/B 测试。

- `OmniPOSTech-Hemsida_Copy.html`  
  页面副本／历史版本，保留用于参考。

- `style.css`  
  根目录下的样式文件（可能用于全局或历史用途）。

- `css/`  
  存放样式的文件夹：
  - `css/style.css`
  - `css/style_v2.css` —— 推荐的第二版样式

- `js/`
  - `js/script.js` —— 包含页面交互逻辑（滚动、导航、简单动画等）

- `img/`  
  图片与 logo 资源：
  - `img/logos/`：包含 PNG、SVG 和 Favicons 子目录
  - `img/scene/`：场景图、示例图片等
  - 其他图像资源

- `.gitignore`  
  Git 忽略规则

- `README.md`  
  本文件

---

## 本地预览

该项目是静态网站，可以直接在浏览器中打开 `index.html`，或者通过简单的静态服务器来预览以支持路径与 fetch 等功能。

推荐方法：

1. 直接在 macOS 上打开（简单快速）
   - 在 Finder 中双击 `index.html`，或在终端中运行：
     open index.html

2. 使用 Python 简易服务器（推荐）
   - 在仓库根目录运行：
     python3 -m http.server 8000
   - 打开浏览器并访问：
     http://localhost:8000/index.html
   - 停止服务器：按 Ctrl+C

3. 使用 npm 的静态服务器（如有 node）
   - 使用 npx：
     npx serve .
   - 或安装全局 `serve`：
     npm i -g serve
     serve

---

## 编辑与自定义

- 修改页面内容：编辑 `index.html` 或 `index_V2.html`，根据需要修改文本、链接、meta 信息等。
- 修改样式：
  - 推荐编辑 `css/style_v2.css`（若使用 V2），或者 `css/style.css` / 根目录 `style.css`。
  - 若需要添加响应式样式或新组件，请在 css 文件中添加相应选择器和规则。
- 修改脚本：`js/script.js`，包含页面的交互逻辑。更复杂的交互可以在该文件中扩展。
- 图片与 Logo：
  - 将图片放入 `img/` 对应子目录，更新 HTML 中的 src 路径。
  - Favicons 在 `img/logos/Favicons/`，如果替换请保持多种尺寸文件以兼容不同设备。
- 字体与图标：如果需要自定义字体，添加字体文件并在 CSS 中通过 @font-face 引入，或使用 Google Fonts CDN。

注意：在修改时请保持相对路径正确（例如 `css/` 与 `js/` 的引用）。

---

## 部署建议

任何静态托管服务都支持该项目：

- GitHub Pages
  - 将此仓库推到 GitHub，进入仓库 Settings -> Pages，选择 `main` / `gh-pages` 分支或 `root` 目录作为发布源。
- Netlify
  - 直接拖拽构建产物（即仓库根目录）到 Netlify 或连接 Git 仓库进行自动部署。
- Vercel
  - 连接仓库并使用默认静态站点配置进行部署。
- 自己的服务器 / CDN
  - 将仓库内容上传到静态文件目录并通过 Nginx / Apache 提供服务。

示例：使用 GitHub Pages（最简单）
1. push 到仓库
2. 在 GitHub 仓库设置中启用 Pages，选择 root 分支为发布源
3. 访问 https://<username>.github.io/<repo>

---

## 常见问题（FAQ）

Q: 我需要构建步骤吗？  
A: 不需要。项目为纯静态，直接部署即可。

Q: 如何切换到 `index_V2.html`？  
A: 修改 GitHub Pages 的入口或将 `index_V2.html` 的内容复制到 `index.html`（或将 `index_V2.html` 重命名为 `index.html`）。

Q: 是否包含版权或许可证？  
A: 仓库当前未必包含 LICENSE 文件。建议根据项目需要添加适当的许可证（例如 MIT）。

---

## 贡献

欢迎通过 Issues 或 Pull Requests 提交改进建议或修复。建议流程：
1. Fork 仓库
2. 创建分支：`git checkout -b feat/some-change`
3. 提交并推送分支：`git push origin feat/some-change`
4. 提交 Pull Request，描述变更目的

贡献前请先在 issue 中简单沟通较大的改动。

---

## 许可证

仓库中未包含明确的 LICENSE 文件（请检查根目录）。如果你希望他人自由使用并贡献，推荐添加 MIT 许可证：

```
MIT License
```

（如果需要，我可以为你创建一个 LICENSE 文件并写入 MIT 内容。）

---

## 联系 / 维护者

- 仓库：`omni_hemsida`
- 维护者（来自仓库信息）：请参阅 Git 仓库或作者联系方式。

---

## 其它说明 / 备忘

- 保留的文件如 `OmniPOSTech-Hemsida_Copy.html` 为历史或备用版本，清理时请确认不再需要。
- 若计划把此模板用于生产环境，建议：
  - 优化图片（压缩、WebP）
  - 添加 meta 标签以便 SEO 与社媒分享
  - 添加基本的可访问性（a11y）增强
