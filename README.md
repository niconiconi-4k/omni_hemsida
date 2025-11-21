# Omni Hemsida

一个简单、轻量的静态网站模板（HTML / CSS / JS），适合作为公司或产品展示页的起点。该仓库包含多个页面版本与样式文件，资源结构清晰，便于本地预览、修改与部署到任意静态托管服务。

---

## 快速概览

- 技术栈：纯静态 HTML、CSS、少量 JavaScript
- 目标：演示页 / 信息展示 / 小型静态站点
- 无构建步骤 —— 可直接打开或通过简单静态服务器预览

---

## 目录结构（重要文件）

- `index.html` — 主站点页面（版本 1）
- `index_V2.html` — 主页面的另一个版本（版本 2）
- `OmniPOSTech-Hemsida_Copy.html` — 历史或备份副本
- `style.css` — 根目录样式文件（历史或全局用途）
- `css/` — 样式文件夹
  - `css/style.css`
  - `css/style_v2.css`（推荐使用的新版样式）
- `js/`
  - `js/script.js` — 页面交互脚本（滚动、导航等）
- `img/` — 图片与 logo 资源
  - `img/logos/` — LOGO 与 favicon
  - `img/scene/` — 演示图片
- `.gitignore` — Git 忽略规则
- `README.md` — 本文件

---

## 本地预览（推荐）

方法一：直接用浏览器打开（快速）
- 在文件管理器中双击 `index.html`，或在终端运行：
  open index.html

方法二：使用 Python 内置静态服务器（推荐，支持相对路径）
1. 进入仓库根目录：
   cd /path/to/omni_hemsida
2. 启动服务器：
   python3 -m http.server 8000
3. 打开浏览器访问：
   http://localhost:8000/index.html
4. 停止服务器：Ctrl+C

方法三：使用 Node 工具（若有 Node.js）
- 一次性运行（无需全局安装）：
  npx serve .
- 或安装并运行 serve：
  npm i -g serve
  serve

---

## 如何切换页面版本

- 切换到 V2：在浏览器中直接打开 `index_V2.html`，或将 `index_V2.html` 的内容复制/重命名为 `index.html` 以作为默认入口。
- 若部署到 GitHub Pages，可将 `index_V2.html` 内容替换 `index.html` 后 push。

---

## 自定义与开发要点

- 内容修改：直接编辑 HTML 文件（`index.html` / `index_V2.html`）中的文本、链接和 meta 信息。
- 样式修改：编辑 `css/style_v2.css`（推荐）或 `css/style.css` / 根目录 `style.css`。
- 脚本修改：编辑 `js/script.js`。如需加入更复杂功能，可分拆模块化脚本并在 HTML 中引入。
- 图片替换：将新的图片上传到 `img/` 对应子目录，更新 `<img>` 的 `src` 路径。
- Favicons：位于 `img/logos/Favicons/`，替换图标时请保留多尺寸以保证兼容性。
- 字体：可通过 Google Fonts 或本地字体文件（@font-face）引入。

最佳实践：
- 保持相对路径正确（尤其在子目录部署时）。
- 对图片进行压缩（WebP 或合适的压缩设置）。
- 在修改样式/脚本前，先备份或在分支中操作以便回退。

---

## 部署建议

适用于任何静态托管平台：

- GitHub Pages：将仓库 push，Settings → Pages，选择发布源（root 或 gh-pages）。
- Netlify / Vercel：连接仓库或上传构建文件夹，自动发布。
- 自托管（Nginx / Apache）：将文件放到静态网站目录并确保正确的 MIME 类型。

部署注意：
- 若使用自定义域，请配置 DNS 并在托管平台添加域名。
- 确保使用 HTTPS（许多托管平台自动提供）。

---

## 可改进项（建议）

- 图片优化：压缩并提供 WebP 版本
- SEO：完善 meta 标签（title、description、og:*）
- 无障碍（a11y）：添加语义化标签、alt 文本、键盘导航支持
- 性能：合并/压缩 CSS/JS（如需），启用缓存策略
- 分析：按需添加 Analytics（隐私合规下）

---

## 贡献指南

1. Fork 仓库
2. 新建分支：git checkout -b feat/your-change
3. 提交变更：git commit -m "描述你的改动"
4. 推送并发起 Pull Request

对大改动，请先在 Issues 里描述你的计划以便讨论。

---

## 许可证

仓库当前未包含 LICENSE 文件。若需开放源码并允许贡献，推荐使用 MIT 许可证。需要的话我可以为你创建并写入 LICENSE 文件。

示例（简洁提示）：
MIT License — 允许使用、复制、修改、合并、发布、分发、再授权和/或出售软件的副本，附带版权声明和许可声明。

---

## 联系与维护

- 仓库名：omni_hemsida
- 维护者信息请参见 Git 仓库配置或项目主页

---

## 其它备注

- `OmniPOSTech-Hemsida_Copy.html` 是历史副本，清理前请确认内容不再需要。
