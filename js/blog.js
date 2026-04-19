/**
 * 博客列表页交互
 * 从 posts.json 加载文章数据
 */

(() => {
  'use strict';

  const POSTS_PER_PAGE = 6;
  let allPosts = [];
  let currentPage = 1;

  // ============================== 加载文章数据 ==============================
  async function loadPosts() {
    try {
      const response = await fetch('./data/posts.json');
      const data = await response.json();
      allPosts = data.posts || [];
      renderPosts();
    } catch (error) {
      console.error('加载文章失败:', error);
      document.getElementById('blogList').innerHTML = `
        <div class="posts-empty">
          <p>加载文章失败，请刷新重试</p>
        </div>
      `;
    }
  }

  // ============================== 渲染文章列表 ==============================
  function renderPosts() {
    const blogList = document.getElementById('blogList');
    const start = 0;
    const end = currentPage * POSTS_PER_PAGE;
    const postsToShow = allPosts.slice(start, end);

    blogList.innerHTML = postsToShow.map(post => `
      <article class="post-card" data-category="${post.category}">
        <a href="/post.html?id=${post.id}" class="post-card__link">
          <div class="post-card__meta">
            <span class="post-card__category">${post.categoryLabel}</span>
            <span class="post-card__date">${post.date}</span>
          </div>
          <h2 class="post-card__title">${post.title}</h2>
          <p class="post-card__excerpt">${post.excerpt}</p>
          <div class="post-card__footer">
            <span class="post-card__read-time">${post.readTime}阅读</span>
            <span class="post-card__arrow">
              <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true">
                <path d="M0 6h14m-4-4 4 4-4 4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="square"/>
              </svg>
            </span>
          </div>
        </a>
      </article>
    `).join('');

    // 更新文章数量
    document.getElementById('postCount').textContent = allPosts.length;

    // 更新加载更多按钮
    updateLoadMoreBtn();

    // 重新绑定筛选事件
    initFilter();
  }

  // ============================== 筛选功能 ==============================
  function initFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const postCards = document.querySelectorAll('.post-card');
    const postCountEl = document.getElementById('postCount');

    function updateCount() {
      const visibleCards = document.querySelectorAll('.post-card:not(.hidden)');
      if (postCountEl) {
        postCountEl.textContent = visibleCards.length;
      }
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // 更新按钮状态
        filterBtns.forEach(b => b.classList.remove('filter-btn--active'));
        btn.classList.add('filter-btn--active');

        // 筛选文章
        postCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.classList.remove('hidden');
            card.style.animation = 'pageIn 0.5s ease both';
          } else {
            card.classList.add('hidden');
          }
        });

        updateCount();
      });
    });
  }

  // ============================== 加载更多 ==============================
  function updateLoadMoreBtn() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const hasMore = currentPage * POSTS_PER_PAGE < allPosts.length;

    if (!hasMore) {
      loadMoreBtn.innerHTML = `<span>没有更多文章了</span>`;
      loadMoreBtn.disabled = true;
      loadMoreBtn.style.opacity = '0.5';
      loadMoreBtn.style.cursor = 'not-allowed';
    }
  }

  if (document.getElementById('loadMoreBtn')) {
    document.getElementById('loadMoreBtn').addEventListener('click', () => {
      const loadMoreBtn = document.getElementById('loadMoreBtn');
      const hasMore = currentPage * POSTS_PER_PAGE < allPosts.length;

      if (!hasMore) return;

      loadMoreBtn.innerHTML = `
        <span>加载中...</span>
        <svg width="14" height="10" viewBox="0 0 14 10" aria-hidden="true" style="animation: spin 1s linear infinite">
          <circle cx="7" cy="5" r="4" stroke="currentColor" stroke-width="1.4" fill="none" stroke-dasharray="20" stroke-dashoffset="10"/>
        </svg>
      `;

      setTimeout(() => {
        currentPage++;
        renderPosts();
      }, 500);
    });
  }

  // ============================== 添加旋转动画 ==============================
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .posts-empty, .posts-loading {
      text-align: center;
      padding: 4rem 2rem;
      color: rgba(237, 232, 221, 0.5);
    }
    .posts-empty p, .posts-loading p {
      font-size: 1rem;
    }
  `;
  document.head.appendChild(style);

  // ============================== 初始化 ==============================
  loadPosts();
})();
