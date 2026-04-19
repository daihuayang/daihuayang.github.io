/**
 * 文章详情页
 * 从 posts.json 加载文章内容
 */

(() => {
  'use strict';

  // ============================== 获取文章 ID ==============================
  function getPostId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
  }

  // ============================== 加载文章数据 ==============================
  async function loadPost() {
    const postId = getPostId();
    
    if (!postId) {
      showError('文章 ID 不存在');
      return;
    }

    try {
      const response = await fetch('./data/posts.json');
      const data = await response.json();
      const post = data.posts.find(p => p.id === postId);

      if (!post) {
        showError('文章不存在');
        return;
      }

      renderPost(post, data.posts);
    } catch (error) {
      console.error('加载文章失败:', error);
      showError('加载文章失败，请刷新重试');
    }
  }

  // ============================== 渲染文章 ==============================
  function renderPost(post, allPosts) {
    // 更新标题
    document.title = `${post.title} · 夜白`;
    
    // 更新 meta 描述
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', post.excerpt);
    }

    // 更新文章头部
    document.getElementById('postCategory').textContent = post.categoryLabel;
    document.getElementById('postDate').textContent = post.date;
    document.getElementById('postTitle').textContent = post.title;
    document.getElementById('readTime').textContent = `${post.readTime}阅读`;
    
    // 生成随机阅读数
    const viewCount = Math.floor(Math.random() * 2000) + 500;
    document.getElementById('viewCount').textContent = `${viewCount.toLocaleString()} 次阅读`;

    // 渲染文章内容（Markdown 转 HTML）
    document.getElementById('postContent').innerHTML = markdownToHtml(post.content);

    // 更新上下篇导航
    const currentIndex = allPosts.findIndex(p => p.id === post.id);
    const prevPost = allPosts[currentIndex + 1]; // 下一篇文章（时间更早）
    const nextPost = allPosts[currentIndex - 1]; // 上一篇文章（时间更晚）

    if (prevPost) {
      document.getElementById('prevPost').href = `/post.html?id=${prevPost.id}`;
      document.getElementById('prevPostTitle').textContent = prevPost.title;
    } else {
      document.getElementById('prevPost').style.visibility = 'hidden';
    }

    if (nextPost) {
      document.getElementById('nextPost').href = `/post.html?id=${nextPost.id}`;
      document.getElementById('nextPostTitle').textContent = nextPost.title;
    } else {
      document.getElementById('nextPost').style.visibility = 'hidden';
    }
  }

  // ============================== Markdown 转 HTML ==============================
  function markdownToHtml(markdown) {
    if (!markdown) return '<p style="color: rgba(237, 232, 221, 0.4);">暂无内容</p>';

    let html = markdown
      // 代码块
      .replace(/```([\s\S]*?)```/g, '<pre style="background: rgba(237, 232, 221, 0.05); padding: 1.25rem; overflow-x: auto; margin: 1.5rem 0;"><code style="font-family: var(--font-mono); font-size: 0.875rem; color: rgba(237, 232, 221, 0.8);">$1</code></pre>')
      // 行内代码
      .replace(/`([^`]+)`/g, '<code style="font-family: var(--font-mono); font-size: 0.875em; color: #E60012; background: rgba(230, 0, 18, 0.08); padding: 0.125rem 0.375rem;">$1</code>')
      // 标题
      .replace(/^## (.*$)/gim, '<h2 style="font-family: var(--font-cn); font-size: 1.375rem; font-weight: 700; color: #EDE8DD; margin-top: 2.5rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid rgba(230, 0, 18, 0.3);">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 style="font-family: var(--font-cn); font-size: 1.125rem; font-weight: 700; color: rgba(237, 232, 221, 0.9); margin-top: 2rem; margin-bottom: 0.75rem;">$1</h3>')
      // 引用
      .replace(/^\> (.*$)/gim, '<blockquote style="margin: 2rem 0; padding: 1.5rem 1.5rem 1.5rem 2rem; border-left: 2px solid #E60012; background: rgba(237, 232, 221, 0.03); font-style: italic; color: rgba(237, 232, 221, 0.7);">$1</blockquote>')
      // 粗体
      .replace(/\*\*(.*?)\*\*/g, '<strong style="color: rgba(237, 232, 221, 0.9); font-weight: 700;">$1</strong>')
      // 斜体
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // 列表
      .replace(/^\- (.*$)/gim, '<li style="margin-bottom: 0.5rem; position: relative;">$1</li>')
      // 链接
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color: #E60012; text-decoration: underline; text-underline-offset: 3px;">$1</a>');

    // 包装列表
    html = html.replace(/(<li.*<\/li>)/s, '<ul style="margin: 1rem 0; padding-left: 1.5rem;">$1</ul>');

    // 段落
    html = html.split('\n\n').map(p => {
      if (p.trim() && !p.startsWith('<')) {
        return `<p style="margin-bottom: 1rem; line-height: 1.8;">${p}</p>`;
      }
      return p;
    }).join('');

    return html;
  }

  // ============================== 显示错误 ==============================
  function showError(message) {
    document.getElementById('postTitle').textContent = '出错了';
    document.getElementById('postContent').innerHTML = `
      <div style="text-align: center; padding: 4rem 2rem;">
        <p style="color: rgba(237, 232, 221, 0.6); margin-bottom: 2rem;">${message}</p>
        <a href="/blog.html" style="color: #E60012; text-decoration: underline;">返回文章列表</a>
      </div>
    `;
  }

  // ============================== 分享功能 ==============================
  document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const platform = btn.dataset.platform;
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(document.getElementById('postTitle').textContent);

      if (platform === 'twitter') {
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
      } else if (platform === 'weibo') {
        window.open(`http://service.weibo.com/share/share.php?url=${url}&title=${title}`, '_blank');
      } else if (platform === 'copy') {
        try {
          await navigator.clipboard.writeText(window.location.href);
          alert('链接已复制到剪贴板');
        } catch (err) {
          alert('复制失败，请手动复制');
        }
      }
    });
  });

  // ============================== 初始化 ==============================
  loadPost();
})();
