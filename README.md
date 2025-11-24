# Omni Hemsida

一个简单、轻量的静态网站模板（HTML / CSS / JS），适合作为公司或产品展示页的起点。该仓库包含多个页面版本与样式文件，资源结构清晰，便于本地预览、修改与部署到任意静态托管服务。

---

## 快速概览

- 技术栈：纯静态 HTML、CSS、少量 JavaScript
- 目标：演示页 / 信息展示 / 小型静态站点
- 无构建步骤 —— 可直接打开或通过简单静态服务器预览

---

## 本地预览与多语言说明

### 本地预览（推荐）

方法一：直接用浏览器打开（快速）
- 在文件管理器中双击 `index.html`，或在终端运行：
  open index.html

方法二：使用 Python 内置静态服务器（推荐，支持相对路径与多语言 JSON 加载）
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


## 多语言与 i18n 说明

所有中英文词条已内置于 `js/i18n.js` 的 DICTS 对象，无需外部 JSON 文件，完全支持本地 file:// 预览和离线切换语言。

**如何切换语言**：
- 页面右上角语言切换按钮或下拉菜单。
- 切换后自动刷新所有带 `data-i18n` 属性的内容。

**注意事项**：
- 直接用浏览器打开即可切换语言，无需 HTTP 服务器。
- 若页面部分内容未切换，请检查元素是否有正确的 `data-i18n` 属性。

---

## 如何切换页面版本
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
- 新增页面：建议放入 `pages/` 目录；引用图片时路径需使用相对上级 `../img/...`。
- 样式修改：编辑 `css/style_v2.css`（推荐）或 `css/style.css` / 根目录 `style.css`。
- 脚本修改：编辑 `js/script.js`。如需加入更复杂功能，可分拆模块化脚本并在 HTML 中引入。
- 图片替换：将新的图片上传到 `img/` 对应子目录，更新 `<img>` 的 `src` 路径。
- Favicons：位于 `img/logos/Favicons/`，替换图标时请保留多尺寸以保证兼容性。
- 字体：可通过 Google Fonts 或本地字体文件（@font-face）引入。

最佳实践：
- 保持相对路径正确（尤其在子目录部署时）。
- 对图片进行压缩（WebP 或合适的压缩设置）。
- 在修改样式/脚本前，先备份或在分支中操作以便回退。
- 使用占位：暂未完成的导航或按钮可指向 `pages/coming-soon.html`，避免 404。
- 页面一致性：需要复用首页视觉时，可复制其 Hero 结构（`.gradient-bg`、浮动点与动画线）。
- 平滑滚动：首页与政策页示例脚本中统一对 `a[href^="#"]` 做了偏移滚动处理，保持导航体验。
- 国际化：已采用统一脚本方案（详见下方 i18n 章节）。

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

## 国际化 (i18n)

当前已支持简体中文 (`zh`) 与英文 (`en`)，使用统一脚本 `js/i18n.js`，避免在本地直接通过 `file://` 打开时 `fetch` JSON 被浏览器安全策略拦截导致无法切换。

关键点：
- 每个需翻译的元素使用 `data-i18n="键名"`；输入框或文本域的占位符使用 `data-i18n-placeholder="键名"`。
- 脚本内置一个 `DICTS` 对象存放所有语言键值对；初始化执行 `window.I18N.init()` 根据 `localStorage` (`omni_lang`) 恢复上次选择语言。
- 切换语言调用：`window.I18N.setLang('zh')` 或 `window.I18N.setLang('en')`。
- 如果某键在字典中缺失，保持页面原始静态文本（不会出现空白）。
- 来自首页、政策页、占位页的按钮/下拉使用同一个脚本，无重复逻辑。

新增语言（示例：西班牙语 `es`）步骤：
1. 编辑 `js/i18n.js`，在 `DICTS` 中追加：`es: { "nav.scenes": "Escenarios", ... }`。
2. 给需要翻译的元素补上对应 `data-i18n` / `data-i18n-placeholder` 属性键。保持命名风格（模块前缀 + 语义字段）。
3. 在语言下拉中增加：`<button data-lang="es">Español (ES)</button>`。
4. 调用 `window.I18N.setLang('es')` 即可切换。

部署到支持 HTTP 的服务器后想改为外部 JSON：
- 可移除内置字典并用 `fetch('/lang/es.json')` 加载；本地调试时建议仍使用内嵌或启用 `python3 -m http.server`。
- 可扩展：URL 参数优先（如 `?lang=en`）、浏览器语言自动探测、懒加载按需语言包、合并缓存策略。

常见问题排查：
- 点击无反应：确认页面底部已经加载 `<script src="js/i18n.js"></script>`，并在 `DOMContentLoaded` 后执行了 `I18N.init()`。
- 只有部分文字变更：检查对应元素是否已有 `data-i18n`；或键名与字典不匹配（大小写/标点）。
- 图标按钮文本不更新：在包含图标的按钮中添加一个独立 `<span>` 包裹纯文本，脚本优先替换该 span。 

## 可改进项（建议）

- 图片优化：压缩并提供 WebP 版本
- SEO：完善 meta 标签（title、description、og:*）
- 无障碍（a11y）：添加语义化标签、alt 文本、键盘导航支持
- 性能：合并/压缩 CSS/JS（如需），启用缓存策略
- 分析：按需添加 Analytics（隐私合规下）
- 国际化：若需要多语言，可参考 `OmniPOSTech-Hemsida_Copy.html` 中的 `data-lang-*` 结构；建议抽离成独立脚本。
- 组件化：可将重复的 Header / Footer 拆分为模板片段，通过构建脚本或服务端合成。

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

---

## 页面结构与导航

首页包含以下主要章节：
- 应用场景
- 特点
- 餐厅痛点
- 我们的故事
- 客户评价 / 合作店展示
- 价格方案
- 联系我们
- 政策信息

页脚“快速链接”导航已同步包含所有主要章节锚点，支持一键跳转。
