# Omni Hemsida

轻量静态网站模板（HTML / CSS / JS）。此 README 包含本地预览说明以及两种在 AWS 上部署的方案：推荐的静态托管（S3 + CloudFront）和基于 EC2 的快速部署（使用您指定的启动命令 `python3 -m http.server 8000` 并绑定自定义域名）。

---

## 快速概览

- 技术栈：纯静态 HTML、CSS、少量 JavaScript
- 本地预览：无需构建，可直接打开或用简单静态服务器查看
- AWS 部署：支持 S3 + CloudFront（推荐）或在 EC2 上运行 python 内置服务器并绑定域名（按您要求提供的启动命令）

---

## 本地预览（快速回顾）

方法一：直接打开
- 双击 `index.html` 或在终端运行：
  open index.html

方法二：Python 静态服务器（推荐用于调试）
- 在仓库根目录运行：
  python3 -m http.server 8000
- 然后访问：
  http://localhost:8000

---

## 推荐：使用 AWS S3 + CloudFront（最佳实践，免维护、性能优越）

适合纯静态站点，推荐用于生产环境。

主要步骤概述：
1. 在 AWS S3 创建一个 bucket（例如 `omni-hemsida.example.com`），启用静态网站托管并上传网站文件（index.html、css、js、img 等）。
2. 在 S3 的 Bucket Policy 中允许 CloudFront 访问（或使用 Origin Access Identity / Origin Access Control）。
3. 在 CloudFront 创建分配（Distribution），Origin 指向 S3 Bucket 的静态站点端点或私有 bucket + OAC；设置默认根对象为 `index.html`。
4. 在 Route 53 中创建 A (或 ALIAS) 记录，将域名指向 CloudFront 分配的域名。
5. 在 CloudFront 配置自定义域并使用 ACM（us-east-1）颁发或导入证书以启用 HTTPS。

优点：
- 高可用、可缓存、低维护
- 自动使用 HTTPS（通过 ACM）
- 更适合生产流量

参考：AWS 文档 - Host a static website on Amazon S3 and serve it with CloudFront

---

## 在 EC2 上部署（使用 python3 -m http.server 8000，并绑定域名）

如果您希望使用内置 Python HTTP 服务器并在 EC2 上运行（例如用于简单测试或在短期内快速部署），下面提供完整步骤。此方案相对不推荐用于长时间生产环境，但可以满足“用 python 自带命令启动并对外提供服务”的需求。

注意事项（重要）：
- python3 -m http.server 默认在当前目录以单线程方式提供静态文件，仅适合低并发场景。
- 推荐使用 nginx 反向代理并通过 systemd 管理后台进程。
- 为了安全与可维护性，建议使用 Nginx + Certbot 获得 TLS，并把 python server 绑定到 localhost:8000（外部访问由 nginx 代理到 80/443）。

准备工作（先在本地替换占位符）：
- <YOUR_DOMAIN> 替换为您的域名（例如 example.com 或 www.example.com）
- <KEY_PAIR.pem> 替换为您用于 SSH 的私钥文件
- <REPO_URL> 替换为项目的 git 仓库地址（例如 git@github.com:your/repo.git 或 https://github.com/your/repo.git）
- 若使用 Route 53，请确保托管区域已创建并您能修改记录

步骤一：创建并启动 EC2 实例
- 推荐使用 Amazon Linux 2 / Ubuntu LTS（本示例以 Ubuntu 22.04 为例）
- 在 EC2 控制台：
  - 选择 AMI：Ubuntu Server 22.04 LTS
  - 实例类型：t3.micro（测试）或按需选择
  - 存储：默认即可
  - 安全组：允许 `SSH (22)`，`HTTP (80)`，`HTTPS (443)`（如果您打算直接将 8000 暴露，也需允许 `8000`，但我们使用 nginx 反代，通常不需要开放 8000）
  - 分配 Elastic IP（推荐）以便把域名指向此固定 IP

步骤二：SSH 登录 EC2 并准备运行环境
- 示例命令（在本地终端）：
  ssh -i /path/to/<KEY_PAIR.pem> ubuntu@<EC2_PUBLIC_IP>

- 在 EC2 上执行（Ubuntu）：
  sudo apt update && sudo apt install -y git python3 python3-venv python3-pip nginx certbot python3-certbot-nginx

步骤三：获取代码并放到目标目录
- 克隆仓库（示例）：
  cd /home/ubuntu
  git clone <REPO_URL> omni_hemsida
  cd omni_hemsida

步骤四：测试手动启动（临时）
- 手动启动命令（您提供的）：
  python3 -m http.server 8000
- 在本地浏览器访问： http://<EC2_PUBLIC_IP>:8000
- 若能访问，说明静态服务器已正常提供内容（Ctrl+C 停止）

步骤五：创建 systemd 服务以后台启动 Python 静态服务器（管理方便）
- 创建服务文件（以 `omni-http.service` 为例）：
  sudo tee /etc/systemd/system/omni-http.service > /dev/null <<'EOF'
  [Unit]
  Description=Omni static python HTTP server
  After=network.target

  [Service]
  Type=simple
  User=ubuntu
  WorkingDirectory=/home/ubuntu/omni_hemsida
  ExecStart=/usr/bin/python3 -m http.server 8000
  Restart=on-failure
  RestartSec=5

  [Install]
  WantedBy=multi-user.target
  EOF

- 启动并启用：
  sudo systemctl daemon-reload
  sudo systemctl start omni-http.service
  sudo systemctl enable omni-http.service
- 查看状态与日志：
  sudo systemctl status omni-http.service
  journalctl -u omni-http.service -f

步骤六：使用 nginx 做反向代理并处理 HTTPS（推荐）
- 创建 nginx 站点配置（示例）：
  sudo tee /etc/nginx/sites-available/omni <<'EOF'
  server {
      listen 80;
      server_name <YOUR_DOMAIN>;

      location / {
          proxy_pass http://127.0.0.1:8000;
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      }
  }
  EOF

- 启用并检查 nginx：
  sudo ln -s /etc/nginx/sites-available/omni /etc/nginx/sites-enabled/omni
  sudo nginx -t
  sudo systemctl restart nginx

- 现在在浏览器访问： http://<YOUR_DOMAIN> （若域名正确解析到实例 IP）

步骤七：添加 TLS（Let's Encrypt）
- 使用 Certbot 获取证书并自动配置 nginx：
  sudo certbot --nginx -d <YOUR_DOMAIN>
- Certbot 会自动修改 nginx 配置以启用 HTTPS
- 验证自动续期：
  sudo certbot renew --dry-run

步骤八：DNS（在您的域名提供商或 Route 53 中）
- 将 A 记录（或 ALIAS）指向 EC2 的 Elastic IP（或 ALB）
- 等待 DNS 生效（TTL 后即可访问）

安全与维护建议：
- 不要直接把 python server 暴露在公网上（即避免开放 8000 端口）；使用 nginx 作为前端代理。
- 使用 systemd 管理服务，设置日志轮转与监控。
- 若流量较大，考虑使用 S3 + CloudFront 或放在负载均衡器后面的多个实例。
- 定期更新系统与依赖项，检查证书续期是否正常。

---

## 何时选择哪种部署方式

- S3 + CloudFront：推荐用于生产静态站点（高性能、低成本、无需管理服务器）
- EC2 + python3 -m http.server：适合快速测试或受限场景（不推荐长期生产）
- 若需要容器化或托管服务，可考虑 ECS / Fargate 或 Elastic Beanstalk（适合需要进阶管理/扩展时）

---

## 示例：常见命令汇总（可复制）

在 EC2 上（示例）：
- 更新并安装依赖：
  sudo apt update && sudo apt install -y git python3 nginx certbot python3-certbot-nginx

- 克隆仓库：
  git clone <REPO_URL> omni_hemsida
  cd omni_hemsida

- 手动启动（测试）：
  python3 -m http.server 8000

- 使用 systemd 自动启动（见上方 systemd 单元配置）：
  sudo systemctl daemon-reload
  sudo systemctl start omni-http.service
  sudo systemctl enable omni-http.service

- 设置 nginx 反代并获取 TLS（示例）：
  sudo nginx -t
  sudo systemctl restart nginx
  sudo certbot --nginx -d <YOUR_DOMAIN>

---

## 贡献与许可证

- 若希望我同时为您创建 LICENSE（如 MIT），请回复确认我将写入 LICENSE 文件。
- 贡献流程请参考项目内常规 Git 工作流（fork、分支、PR）。

---

## 需要我做的事情（可选 / 我可以帮忙的）
- 为您生成一个 `user-data` 脚本（EC2 启动时自动拉取代码并配置 systemd/nginx/certbot）。
- 直接创建并写入 `LICENSE`（例如 MIT）。
- 把 README 翻译成英文版本或添加徽章、截图。

