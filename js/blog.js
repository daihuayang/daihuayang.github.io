/**
 * 博客列表页交互
 */

(() => {
  'use strict';

  // ============================== 筛选功能 ==============================
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

  // ============================== 加载更多 ==============================
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  let currentPage = 1;

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      // 模拟加载更多
      loadMoreBtn.innerHTML = `
        <span>加载中...</span>
        <svg width="14" height="10" viewBox="0 0 14 10" aria-hidden="true" style="animation: spin 1s linear infinite">
          <circle cx="7" cy="5" r="4" stroke="currentColor" stroke-width="1.4" fill="none" stroke-dasharray="20" stroke-dashoffset="10"/>
        </svg>
      `;

      setTimeout(() => {
        // 这里可以添加实际的加载逻辑
        loadMoreBtn.innerHTML = `
          <span>没有更多文章了</span>
        `;
        loadMoreBtn.disabled = true;
        loadMoreBtn.style.opacity = '0.5';
        loadMoreBtn.style.cursor = 'not-allowed';
      }, 1000);
    });
  }

  // ============================== 添加旋转动画 ==============================
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
})();
