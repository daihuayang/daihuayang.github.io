/**
 * 文章详情页交互
 */

(() => {
  'use strict';

  // ============================== 模拟文章数据 ==============================
  const postsData = {
    1: {
      category: 'AI 产品',
      date: '2026.04.15',
      title: '大模型应用的产品设计原则：从 prompt 工程到用户体验',
      readTime: '8 分钟阅读',
      viewCount: '1,234 次阅读',
      content: `
        <p class="post-lead">在构建基于大语言模型的产品时，技术实现只是第一步，真正的挑战在于如何将复杂的技术能力转化为用户可理解、可信赖的产品体验。</p>

        <h2>一、从 Prompt 工程到产品语言</h2>
        <p>Prompt 工程是开发者的语言，但用户不需要理解什么是「few-shot learning」或「chain-of-thought」。优秀的产品设计应该：</p>
        <ul>
          <li><strong>隐藏复杂性</strong>：将 prompt 模板化，让用户通过简单的界面操作即可触发复杂的 AI 能力</li>
          <li><strong>提供引导</strong>：通过示例、提示和渐进式披露帮助用户理解如何与 AI 有效交互</li>
          <li><strong>建立心智模型</strong>：让用户理解 AI 能做什么、不能做什么，以及为什么会出现某些结果</li>
        </ul>

        <h2>二、不确定性管理</h2>
        <p>AI 输出的不确定性是产品设计的核心挑战。我们需要在界面中明确传达：</p>
        <blockquote>
          "用户需要知道什么时候可以信任 AI，什么时候需要人工复核。"
        </blockquote>
        <p>具体策略包括：置信度指示器、来源引用、可编辑的输出结果，以及清晰的人工介入点。</p>

        <h2>三、反馈循环的设计</h2>
        <p>AI 产品需要建立有效的反馈机制来持续改进。这不仅包括显式的点赞/点踩按钮，还应该考虑：</p>
        <ul>
          <li>隐式反馈：用户是否采纳了 AI 的建议？是否进行了修改？</li>
          <li>上下文反馈：收集反馈时记录当时的输入和输出</li>
          <li>闭环反馈：让用户看到他们的反馈如何改善了产品</li>
        </ul>

        <h2>四、渐进式智能</h2>
        <p>不要试图一次性展示 AI 的所有能力。采用渐进式智能的策略：</p>
        <ol>
          <li>从单一、明确的场景开始</li>
          <li>在用户成功使用后逐步引入更复杂的功能</li>
          <li>根据用户行为个性化 AI 的参与程度</li>
        </ol>

        <h2>结语</h2>
        <p>大模型技术正在快速演进，但产品设计的核心原则保持不变：理解用户需求，创造流畅体验，建立信任关系。技术是实现手段，用户价值才是最终目标。</p>
      `,
      prev: { id: 2, title: 'AI 时代的交互设计范式转变' },
      next: { id: 3, title: '构建企业级 AI 助手：从 0 到 1 的产品实践' }
    },
    2: {
      category: '设计思维',
      date: '2026.04.10',
      title: 'AI 时代的交互设计范式转变',
      readTime: '6 分钟阅读',
      viewCount: '987 次阅读',
      content: `
        <p class="post-lead">从 GUI 到 LUI，人工智能正在重新定义人机交互的基本逻辑与设计准则。</p>

        <h2>GUI 的局限</h2>
        <p>图形用户界面在过去四十年里主导了人机交互，但它本质上是将计算机的逻辑强加给用户。用户必须学习计算机的语言：点击、拖拽、菜单层级。</p>

        <h2>LUI 的崛起</h2>
        <p>语言用户界面（LUI）通过自然语言作为交互媒介，让用户可以用自己的方式表达意图。这不是简单的语音输入，而是：</p>
        <ul>
          <li><strong>意图理解</strong>：系统理解用户想要达成的目标，而非仅仅是执行命令</li>
          <li><strong>上下文感知</strong>：对话具有记忆和连贯性</li>
          <li><strong>主动协助</strong>：系统可以主动提供建议和帮助</li>
        </ul>

        <h2>混合界面的未来</h2>
        <p>纯粹的 LUI 并非万能。最佳实践是将语言交互与传统 GUI 元素结合：</p>
        <blockquote>
          "让用户选择最自然的交互方式，而不是强迫他们适应单一模式。"
        </blockquote>
      `,
      prev: { id: 1, title: '大模型应用的产品设计原则' },
      next: { id: 3, title: '构建企业级 AI 助手' }
    },
    3: {
      category: '实践案例',
      date: '2026.04.05',
      title: '构建企业级 AI 助手：从 0 到 1 的产品实践',
      readTime: '12 分钟阅读',
      viewCount: '2,156 次阅读',
      content: `
        <p class="post-lead">分享一个 B2B AI 助手产品的完整设计过程，包括需求分析、原型验证到上线迭代。</p>

        <h2>项目背景</h2>
        <p>为一家大型企业构建内部 AI 助手，目标是提升员工的工作效率，覆盖文档查询、数据分析和流程自动化等场景。</p>

        <h2>第一阶段：需求探索</h2>
        <p>通过 30+ 场用户访谈，我们发现核心痛点：</p>
        <ul>
          <li>信息孤岛：知识分散在不同系统中</li>
          <li>重复劳动：大量时间花在数据整理上</li>
          <li>学习成本：新工具层出不穷，难以掌握</li>
        </ul>

        <h2>第二阶段：MVP 设计</h2>
        <p>聚焦单一场景——文档智能问答。核心功能包括：</p>
        <ol>
          <li>自然语言查询企业知识库</li>
          <li>自动汇总多文档信息</li>
          <li>一键生成报告草稿</li>
        </ol>

        <h2>关键决策</h2>
        <blockquote>
          "宁可少做功能，也要确保核心体验流畅。"
        </blockquote>
        <p>我们砍掉了最初规划的 60% 功能，专注于把文档问答做到极致。</p>
      `,
      prev: { id: 2, title: 'AI 时代的交互设计范式转变' },
      next: { id: 4, title: 'AI 产品经理的核心能力模型' }
    }
  };

  // ============================== 加载文章内容 ==============================
  function loadPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id') || '1';
    const post = postsData[postId];

    if (!post) {
      console.error('文章不存在');
      return;
    }

    // 更新页面内容
    document.getElementById('postCategory').textContent = post.category;
    document.getElementById('postDate').textContent = post.date;
    document.getElementById('postTitle').textContent = post.title;
    document.getElementById('readTime').textContent = post.readTime;
    document.getElementById('viewCount').textContent = post.viewCount;
    document.getElementById('postContent').innerHTML = post.content;

    // 更新导航
    const prevLink = document.getElementById('prevPost');
    const nextLink = document.getElementById('nextPost');
    const prevTitle = document.getElementById('prevPostTitle');
    const nextTitle = document.getElementById('nextPostTitle');

    if (post.prev && prevLink) {
      prevLink.href = `/post.html?id=${post.prev.id}`;
      prevTitle.textContent = post.prev.title;
    } else if (prevLink) {
      prevLink.style.visibility = 'hidden';
    }

    if (post.next && nextLink) {
      nextLink.href = `/post.html?id=${post.next.id}`;
      nextTitle.textContent = post.next.title;
    } else if (nextLink) {
      nextLink.style.visibility = 'hidden';
    }

    // 更新页面标题
    document.title = `${post.title} · 夜小白`;
  }

  // ============================== 分享功能 ==============================
  const shareBtns = document.querySelectorAll('.share-btn');

  shareBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const platform = btn.dataset.platform;
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(document.title);

      switch (platform) {
        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
          break;
        case 'weibo':
          window.open(`https://service.weibo.com/share/share.php?url=${url}&title=${title}`, '_blank');
          break;
        case 'copy':
          navigator.clipboard.writeText(window.location.href).then(() => {
            const originalHTML = btn.innerHTML;
            btn.innerHTML = `
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#E60012" stroke-width="2">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            `;
            setTimeout(() => {
              btn.innerHTML = originalHTML;
            }, 2000);
          });
          break;
      }
    });
  });

  // ============================== 初始化 ==============================
  loadPost();
})();
