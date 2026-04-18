/**
 * 文章发布后台交互
 */

(() => {
  'use strict';

  // ============================== 本地存储键名 ==============================
  const STORAGE_KEY = 'yebai_posts';
  const DRAFT_KEY = 'yebai_draft';

  // ============================== Tab 切换 ==============================
  const tabs = document.querySelectorAll('.admin-tab');
  const panels = document.querySelectorAll('.admin-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.tab;

      // 更新标签状态
      tabs.forEach(t => t.classList.remove('admin-tab--active'));
      tab.classList.add('admin-tab--active');

      // 切换面板
      panels.forEach(panel => {
        panel.classList.remove('admin-panel--active');
        if (panel.id === `${targetTab}Panel`) {
          panel.classList.add('admin-panel--active');
        }
      });

      // 如果切换到文章列表，刷新列表
      if (targetTab === 'posts') {
        loadPostsList();
      }
    });
  });

  // ============================== 工具栏功能 ==============================
  const toolbarBtns = document.querySelectorAll('.toolbar-btn');
  const contentTextarea = document.getElementById('postContent');

  toolbarBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      insertMarkdown(action);
    });
  });

  function insertMarkdown(action) {
    const textarea = contentTextarea;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);

    let insertion = '';
    let cursorOffset = 0;

    switch (action) {
      case 'bold':
        insertion = `**${selectedText || '粗体文本'}**`;
        cursorOffset = selectedText ? 0 : -4;
        break;
      case 'italic':
        insertion = `*${selectedText || '斜体文本'}*`;
        cursorOffset = selectedText ? 0 : -4;
        break;
      case 'heading':
        insertion = `\n## ${selectedText || '标题'}\n`;
        cursorOffset = selectedText ? 0 : -1;
        break;
      case 'quote':
        insertion = `\n> ${selectedText || '引用内容'}\n`;
        cursorOffset = selectedText ? 0 : -5;
        break;
      case 'list':
        insertion = `\n- ${selectedText || '列表项'}\n- 列表项\n- 列表项\n`;
        cursorOffset = selectedText ? 0 : -16;
        break;
      case 'link':
        insertion = `[${selectedText || '链接文本'}](https://example.com)`;
        cursorOffset = selectedText ? -1 : -19;
        break;
      case 'code':
        insertion = selectedText.includes('\n')
          ? `\n\`\`\`\n${selectedText || '代码块'}\n\`\`\`\n`
          : `\`${selectedText || '代码'}\``;
        cursorOffset = selectedText ? 0 : (selectedText.includes('\n') ? -5 : -1);
        break;
    }

    textarea.value = text.substring(0, start) + insertion + text.substring(end);
    textarea.focus();
    textarea.setSelectionRange(start + insertion.length + cursorOffset, start + insertion.length + cursorOffset);
  }

  // ============================== 表单提交 ==============================
  const postForm = document.getElementById('postForm');

  postForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(postForm);
    const post = {
      id: Date.now().toString(),
      title: formData.get('title'),
      category: formData.get('category'),
      categoryLabel: getCategoryLabel(formData.get('category')),
      date: formData.get('date').replace(/-/g, '.'),
      excerpt: formData.get('excerpt'),
      content: formData.get('content'),
      readTime: formData.get('readTime') || '5 分钟',
      viewCount: '0 次阅读',
      createdAt: new Date().toISOString()
    };

    // 保存到本地存储
    const posts = getPosts();
    posts.unshift(post);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));

    // 清除草稿
    localStorage.removeItem(DRAFT_KEY);

    showToast('文章发布成功！', 'success');
    postForm.reset();

    // 设置默认日期为今天
    document.getElementById('postDate').valueAsDate = new Date();
  });

  function getCategoryLabel(value) {
    const labels = {
      'ai-product': 'AI 产品',
      'design': '设计思维',
      'practice': '实践案例',
      'thought': '行业思考'
    };
    return labels[value] || value;
  }

  // ============================== 保存草稿 ==============================
  const saveDraftBtn = document.getElementById('saveDraftBtn');

  saveDraftBtn.addEventListener('click', () => {
    const draft = {
      title: document.getElementById('postTitle').value,
      category: document.getElementById('postCategory').value,
      date: document.getElementById('postDate').value,
      excerpt: document.getElementById('postExcerpt').value,
      content: document.getElementById('postContent').value,
      readTime: document.getElementById('readTime').value,
      savedAt: new Date().toISOString()
    };

    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    showToast('草稿已保存', 'success');
  });

  // ============================== 加载草稿 ==============================
  function loadDraft() {
    const draft = localStorage.getItem(DRAFT_KEY);
    if (draft) {
      const data = JSON.parse(draft);
      document.getElementById('postTitle').value = data.title || '';
      document.getElementById('postCategory').value = data.category || '';
      document.getElementById('postDate').value = data.date || '';
      document.getElementById('postExcerpt').value = data.excerpt || '';
      document.getElementById('postContent').value = data.content || '';
      document.getElementById('readTime').value = data.readTime || '5 分钟';
    }
  }

  // ============================== 预览功能 ==============================
  const previewBtn = document.getElementById('previewBtn');
  const previewModal = document.getElementById('previewModal');
  const closeModal = document.getElementById('closeModal');
  const previewBody = document.getElementById('previewBody');

  previewBtn.addEventListener('click', () => {
    const title = document.getElementById('postTitle').value || '无标题';
    const category = getCategoryLabel(document.getElementById('postCategory').value) || '未分类';
    const date = document.getElementById('postDate').value || new Date().toISOString().split('T')[0];
    const content = document.getElementById('postContent').value || '';
    const readTime = document.getElementById('readTime').value || '5 分钟';

    previewBody.innerHTML = `
      <article class="post-content">
        <header style="margin-bottom: 2rem;">
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <span style="font-family: var(--font-mono); font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: #E60012; padding: 0.25rem 0.5rem; border: 1px solid rgba(230, 0, 18, 0.3);">${category}</span>
            <span style="font-family: var(--font-mono); font-size: 11px; color: rgba(237, 232, 221, 0.35);">${date.replace(/-/g, '.')}</span>
          </div>
          <h1 style="font-family: var(--font-cn); font-size: 1.75rem; font-weight: 900; color: #EDE8DD; line-height: 1.3; margin-bottom: 1rem;">${title}</h1>
          <div style="display: flex; align-items: center; gap: 1rem;">
            <span style="display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 11px; color: rgba(237, 232, 221, 0.4);">
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.2" fill="none"/>
                <path d="M8 4v4l3 2" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linecap="square"/>
              </svg>
              ${readTime}
            </span>
          </div>
        </header>
        ${markdownToHtml(content)}
      </article>
    `;

    previewModal.classList.add('modal--active');
  });

  closeModal.addEventListener('click', () => {
    previewModal.classList.remove('modal--active');
  });

  previewModal.querySelector('.modal__overlay').addEventListener('click', () => {
    previewModal.classList.remove('modal--active');
  });

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

  // ============================== 文章列表 ==============================
  function getPosts() {
    const posts = localStorage.getItem(STORAGE_KEY);
    return posts ? JSON.parse(posts) : [];
  }

  function loadPostsList() {
    const postsList = document.getElementById('postsList');
    const posts = getPosts();

    if (posts.length === 0) {
      postsList.innerHTML = `
        <div class="posts-empty">
          <p>暂无已发布文章</p>
        </div>
      `;
      return;
    }

    postsList.innerHTML = posts.map(post => `
      <div class="post-item" data-id="${post.id}">
        <div class="post-item__info">
          <div class="post-item__title">${post.title}</div>
          <div class="post-item__meta">
            <span class="post-item__category">${post.categoryLabel}</span>
            <span>${post.date}</span>
            <span>${post.readTime}</span>
          </div>
        </div>
        <div class="post-item__actions">
          <button type="button" class="post-item__btn" onclick="editPost('${post.id}')">编辑</button>
          <button type="button" class="post-item__btn post-item__btn--danger" onclick="deletePost('${post.id}')">删除</button>
        </div>
      </div>
    `).join('');
  }

  // ============================== 编辑文章 ==============================
  window.editPost = function(id) {
    const posts = getPosts();
    const post = posts.find(p => p.id === id);

    if (!post) return;

    // 填充表单
    document.getElementById('postTitle').value = post.title;
    document.getElementById('postCategory').value = post.category;
    document.getElementById('postDate').value = post.date.replace(/\./g, '-');
    document.getElementById('postExcerpt').value = post.excerpt;
    document.getElementById('postContent').value = post.content;
    document.getElementById('readTime').value = post.readTime;

    // 切换到编辑器
    tabs.forEach(t => t.classList.remove('admin-tab--active'));
    tabs[0].classList.add('admin-tab--active');

    panels.forEach(p => p.classList.remove('admin-panel--active'));
    document.getElementById('editorPanel').classList.add('admin-panel--active');

    // 删除原文章（重新发布时会创建新的）
    const newPosts = posts.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPosts));

    showToast('文章已加载到编辑器', 'success');
  };

  // ============================== 删除文章 ==============================
  window.deletePost = function(id) {
    if (!confirm('确定要删除这篇文章吗？')) return;

    const posts = getPosts();
    const newPosts = posts.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPosts));

    loadPostsList();
    showToast('文章已删除', 'success');
  };

  // ============================== 导出数据 ==============================
  const exportBtn = document.getElementById('exportBtn');

  exportBtn.addEventListener('click', () => {
    const posts = getPosts();
    const dataStr = JSON.stringify(posts, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `yebai-posts-${new Date().toISOString().split('T')[0]}.json`;
    link.click();

    showToast('文章数据已导出', 'success');
  });

  // ============================== 清空数据 ==============================
  const clearBtn = document.getElementById('clearBtn');

  clearBtn.addEventListener('click', () => {
    if (!confirm('确定要清空所有本地数据吗？此操作不可恢复。')) return;

    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(DRAFT_KEY);

    showToast('本地数据已清空', 'success');
    loadPostsList();
  });

  // ============================== Toast 提示 ==============================
  function showToast(message, type = 'success') {
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
      existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `<span class="toast__message">${message}</span>`;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastIn 0.4s ease both reverse';
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }

  // ============================== 初始化 ==============================
  function init() {
    // 设置默认日期为今天
    document.getElementById('postDate').valueAsDate = new Date();

    // 加载草稿
    loadDraft();

    // 加载文章列表
    loadPostsList();
  }

  init();
})();
