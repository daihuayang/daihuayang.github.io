# AI | 夜白
一个专注于 AI 产品设计与实践的个人博客网站。

## 🌐 访问地址
- GitHub Pages: https://daihuayang.github.io

## 📝 项目介绍

这是我的个人博客，主要分享：
- AI 产品设计与实践经验
- LLM 应用开发思考
- 用户研究方法论
- AI 行业观察与趋势分析

## 🛠️ 技术栈

- **纯静态网站** - HTML5 + CSS3 + JavaScript
- **部署** - GitHub Pages
- **样式** - 现代化深色主题，响应式设计
- **动画** - CSS 动画 + Intersection Observer

## 📁 项目结构

```
├── index.html          # 博客主页
├── blog.html           # 文章列表页
├── post.html           # 文章详情页
├── data/
│   └── posts.json      # 文章数据（JSON 格式）
├── css/                # 样式文件
├── js/                 # JavaScript 文件
└── assets/             # 静态资源
```

## ✍️ 如何添加文章

文章数据存储在 `data/posts.json` 文件中，格式如下：

```json
{
  "posts": [
    {
      "id": "1",
      "title": "文章标题",
      "category": "ai-product",
      "categoryLabel": "AI 产品",
      "date": "2026.04.15",
      "excerpt": "文章摘要",
      "content": "文章正文，支持 Markdown 格式",
      "readTime": "8 分钟"
    }
  ]
}
```

**添加新文章只需**：
1. 编辑 `data/posts.json`
2. 在 `posts` 数组开头添加新文章对象
3. 提交到 GitHub，网站自动更新

### 分类说明
| category | categoryLabel |
|----------|---------------|
| ai-product | AI 产品 |
| design | 设计思维 |
| practice | 实践案例 |
| thought | 行业思考 |

## 🚀 部署

项目已配置 GitHub Actions，提交代码后自动部署到 GitHub Pages。
