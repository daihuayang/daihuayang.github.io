/**
 * 夜白 - AI 产品经理博客
 * 粒子动画 + 鼠标视差效果
 */

(() => {
  'use strict';

  // ============================== Parallax ==============================
  const mark = document.getElementById('markWrap');
  if (mark) {
    const MAX_PX = 14;
    const MAX_PY = 10;
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    window.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetX = ((e.clientX - cx) / cx) * MAX_PX;
      targetY = ((e.clientY - cy) / cy) * MAX_PY;
    }, { passive: true });

    // lerp toward target for smoothness
    function loop() {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      mark.style.setProperty('--px', currentX.toFixed(2) + 'px');
      mark.style.setProperty('--py', currentY.toFixed(2) + 'px');
      requestAnimationFrame(loop);
    }
    loop();
  }

  // ============================== Particles ==============================
  const canvas = document.getElementById('particles');
  if (!canvas) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) { canvas.remove(); return; }

  const ctx = canvas.getContext('2d');
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  let W = 0, H = 0;
  function resize() {
    const rect = canvas.getBoundingClientRect();
    W = rect.width; H = rect.height;
    canvas.width = W * DPR; canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  // palette — mostly paper & ash, blood is rare accent
  const COLORS = ['#EDE8DD', '#8F887B', '#E60012'];
  const WEIGHTS = [0.55, 0.30, 0.15];
  function pickColor() {
    const r = Math.random();
    let acc = 0;
    for (let i = 0; i < WEIGHTS.length; i++) {
      acc += WEIGHTS[i];
      if (r < acc) return COLORS[i];
    }
    return COLORS[0];
  }

  function makeShard() {
    const type = Math.random() < 0.55 ? 'line'
              : Math.random() < 0.80 ? 'slash'
              : Math.random() < 0.94 ? 'dot'
              : 'tri';
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
      len: type === 'dot' ? 1.2 + Math.random() * 1.5
         : type === 'tri' ? 3 + Math.random() * 5
         : 16 + Math.random() * 34,
      angle: type === 'line' ? (Math.random() - 0.5) * 0.25
           : type === 'slash' ? -Math.PI / 4 + (Math.random() - 0.5) * 0.2
           : Math.random() * Math.PI * 2,
      alpha: 0.22 + Math.random() * 0.45,
      type,
      color: pickColor(),
    };
  }

  const COUNT = Math.max(20, Math.min(38, Math.floor((W * H) / 48000)));
  const shards = Array.from({ length: COUNT }, makeShard);

  const mouse = { x: 0, y: 0, active: false };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true;
  }, { passive: true });
  window.addEventListener('mouseleave', () => { mouse.active = false; });

  let last = performance.now();
  function tick(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;

    ctx.clearRect(0, 0, W, H);

    for (const s of shards) {
      if (mouse.active) {
        const dx = s.x - mouse.x;
        const dy = s.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 28000) {
          const d = Math.sqrt(d2) || 1;
          const f = (1 - d / 170) * 200;
          s.vx += (dx / d) * f * dt;
          s.vy += (dy / d) * f * dt;
        }
      }
      s.x += s.vx * dt; s.y += s.vy * dt;
      s.vx *= 0.972; s.vy *= 0.972;
      if (Math.abs(s.vx) + Math.abs(s.vy) < 5) {
        s.vx += (Math.random() - 0.5) * 3;
        s.vy += (Math.random() - 0.5) * 3;
      }
      if (s.x < -60) s.x = W + 60; else if (s.x > W + 60) s.x = -60;
      if (s.y < -60) s.y = H + 60; else if (s.y > H + 60) s.y = -60;
      draw(s);
    }

    requestAnimationFrame(tick);
  }

  function draw(s) {
    ctx.save();
    ctx.translate(s.x, s.y);
    ctx.rotate(s.angle);
    ctx.globalAlpha = s.alpha;
    ctx.fillStyle = s.color;
    ctx.strokeStyle = s.color;

    if (s.type === 'line' || s.type === 'slash') {
      ctx.lineWidth = s.type === 'slash' ? 1.4 : 1;
      ctx.beginPath();
      ctx.moveTo(-s.len / 2, 0);
      ctx.lineTo(s.len / 2, 0);
      ctx.stroke();
    } else if (s.type === 'dot') {
      ctx.beginPath();
      ctx.arc(0, 0, s.len, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(0, -s.len);
      ctx.lineTo(s.len * 0.9, s.len * 0.6);
      ctx.lineTo(-s.len * 0.9, s.len * 0.6);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  requestAnimationFrame(tick);
})();
