# ScaleDex 项目主页

这是一个可直接部署到 GitHub Pages 的纯静态学术项目主页。使用 HTML、CSS 和 JavaScript，无需安装 Node.js、运行构建命令或配置后端。

页面依据上传的 ScaleDex 源稿和图像素材整理。当前为仅公开网页的版本：包含研究介绍、实验结果和图片，不包含论文或补充材料 PDF，其下载入口默认关闭。GitHub Pages 的公开发布需按下文完成仓库与 Pages 配置。

## 1. 先在本地查看

解压网站源码包，在网站目录中双击 `index.html`，即可查看主页面。

也可以在该目录打开终端，启动本地 HTTP 服务：

```bash
python -m http.server 8000
```

然后访问 <http://localhost:8000/>。Windows 若只有 Python Launcher，可改用 `py -m http.server 8000`。在终端按 `Ctrl+C` 停止服务。

通过 HTTP 预览更接近上线环境；浏览器对直接打开本地文件的部分功能（例如剪贴板）可能有限制。

## 2. 部署到 huamo555 的 GitHub Pages

项目仓库为 **huamo555/ScaleDex**。完成配置并部署成功后，预期网址是：

**https://huamo555.github.io/ScaleDex/**

这个地址是按账号和仓库名推算的发布地址，不代表目前已经发布。

1. 登录 GitHub，打开已有的 [huamo555/ScaleDex](https://github.com/huamo555/ScaleDex) 仓库。当前仓库为私有仓库；仅上传本包中的网页文件后，可在 **Settings → General → Danger Zone → Change repository visibility** 将其改为 **Public**。不要上传原始论文 ZIP、PDF 或包含它们的 Git 历史。
2. 将解压后的网站文件上传到仓库的 `main` 分支根目录。仓库文件列表中应直接看到 `index.html`，不要再套一层压缩包同名文件夹。
3. 一并上传 `styles.css`、`app.js`、`content.js`、`assets/` 和空文件 `.nojekyll`，保留原有目录结构与文件名。如果上传界面漏掉 `.nojekyll`，可用 **Add file → Create new file** 补建。
4. 打开仓库 **Settings → Pages**。
5. 在 **Build and deployment** 中，将 **Source** 设为 **Deploy from a branch**。
6. 将 **Branch** 设为 `main`，文件夹设为 **/(root)**，点击 **Save**。
7. 等待部署完成，从 Pages 设置页显示的实际站点链接打开网站。GitHub 说明更新可能需要最多约 10 分钟生效。

以后将修改提交到同一发布分支，页面会自动更新。本项目不需要自行编写 GitHub Actions 工作流，也不需要 Jekyll 主题配置；`.nojekyll` 用于关闭默认的 Jekyll 处理。

参考 GitHub 官方说明：[配置发布来源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)、[创建 GitHub Pages 站点](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)、[GitHub Pages 快速入门](https://docs.github.com/en/pages/quickstart)。

## 3. 文件与日常修改

| 文件或目录 | 用途 |
| --- | --- |
| `index.html` | 页面结构、研究介绍和各章节内容 |
| `styles.css` | 色彩、排版、布局与移动端样式 |
| `app.js` | 导航、图像查看、复制引用等页面交互 |
| `content.js` | 站点元信息、资源链接、作者、引用和视频等集中配置 |
| `assets/images/` | 研究图片与页面图片资源 |
| `.nojekyll` | 让 GitHub Pages 按静态文件发布 |

修改项目标题、作者、机构或论文/代码/视频链接时，先查看 `content.js` 中相应的配置与注释；页面长段落、实验展示和图注按需在 `index.html` 中修改。配置项的具体名称以文件中的实际内容为准。

替换图片时，可以保持原文件名并覆盖文件，或同时更新引用路径。请优先使用 `assets/images/…` 这类**相对路径**，避免写成 `/assets/images/…`；项目站点位于 `/ScaleDex/` 子路径下。文件名的大小写应与代码中的引用一致。

## 4. 当前内容状态与正式发布前的补充

目前的研究内容来自上传的**匿名源稿**。作者、机构、正式 arXiv 地址、研究代码下载地址和演示视频尚未得到确认，需在正式发布时补齐。

- **论文入口**：当前包不包含 PDF，论文与补充材料下载入口均已关闭。确认可公开的版本后，再上传相应文件并填写 `resources.paper` / `resources.supplement`；入口会随有效配置自动显示。
- **GitHub 入口**：目前指向 <https://github.com/huamo555>，用于访问账号主页，不代表研究代码已发布。代码仓库公开后，再替换为真实仓库地址。
- **实验范围**：页面依据当前 TeX 源稿中的仿真实验组织。旧的 `real_world_setup` 材料未用作当前研究已完成真实机器人实验的证据。
- **结果数字**：页面展示的是稿件中的结果，正式对外发布前仍需与最终实验日志、表格和图注复核，尤其注意各设置、对象集合、指标定义和统计口径。
- **作者与引用**：待作者顺序、机构和论文元信息确定后，一并更新页面和 BibTeX；不要填入尚未确认的会议接收状态或 arXiv 编号。
- **视频**：有实际演示素材后，再配置对应资源。没有真实视频时，不应以静态图或其他项目录像充当本项目实验演示。

这些待补内容可以通过修改现有文件完成，无需重新搭建网站。

## 5. 常见问题

**网址显示 404**：先确认 Pages 已完成部署，发布来源确实是 `main` 的 `/(root)`，且该位置直接包含 `index.html`。仓库名若不是 `ScaleDex`，网址中的路径也会随之变化；以 Pages 设置页显示的地址为准。

**图片或样式没有加载**：检查 `assets/`、CSS 和 JavaScript 是否全部上传，核对路径与文件名大小写，并确认没有把资源路径误写为从域名根目录开始的绝对路径。

**修改后看不到更新**：先确认更改已提交到发布分支、部署已完成，再刷新页面；必要时强制刷新以排除浏览器缓存。

**后续公开论文或添加作者**：先确认相应材料可以公开，再上传文件并修改 `content.js` 中的配置；检查页面、下载入口与引用区是否一致。资源地址为空时，对应下载入口保持隐藏。

**后续添加视频**：先准备实际视频文件或可访问的视频地址，再按当前视频配置接入。体积较大的视频更适合放在专用托管服务上，页面引用其地址。


## 当前源码的配置字段

`content.js` 中的 `window.SCALEDEX_SITE` 集中保存发布入口：

- `authors`：作者数组；元素可为字符串，或 `{ name, url, affiliation }`。`affiliation` 为上标编号。
- `affiliations`：机构名称数组。
- `resources.paper` / `resources.supplement`：论文与补充材料的地址；当前均为空，不显示下载入口。
- `resources.arxiv`：填入正式 arXiv 链接后，主论文按钮优先使用该链接。
- `resources.github`：当前为 `https://github.com/huamo555`。
- `resources.code`：正式代码库 URL；填入后 GitHub 入口自动改为项目代码。
- `resources.dataset`：数据集 URL；非空时显示数据集入口。
- `citation`：已确认的完整 BibTeX 字符串；非空时显示引用和复制按钮。
- `video`：MP4 / WebM / 其他浏览器可播放的视频文件 URL（不是 YouTube 页面地址）；非空时显示视频播放器。

正文和双语文案在 `index.html` 的 `data-en` / `data-zh` 属性中维护。修改已有文案时应同步修改对应的英文默认文本与中英文属性。当前研究数字还出现在首页统计和附加实验中；更新实验时请同步核对这些位置与 `content.js` 中的表格数据。

## 公开范围

此包仅包含网页源码与展示图片，已移除两份 PDF 及其资源地址。公开部署目录不包含 `assets/papers/`；后续发布论文时需另外加入已经确认可公开的文件。原始上传材料不属于此公开包。

网页用图从源论文原图转换为 WebP，首页的 12 张快照为 `Visualization.png` 的对应区域裁剪。未添加合成实验图或模拟视频。

## 当前交互

- 英文/中文切换（浏览器本地记忆）。
- 四类物体切换，每类展示 0.6 / 1.0 / 1.5 三个尺度的真实静态快照。
- Visual student / Privileged teacher 结果切换。
- 五尺度选择、准确均值/标准差表格、尺度对应提升数值。
- 论文图放大查看（Esc 可关闭）、锚点导航、手机菜单。
- 作者、公开代码/数据集、BibTeX 和视频均为可配置入口；未提供的资源不会伪装成已发布内容。
