<template>
  <div class="home-container">
    <h1>欢迎使用问答系统</h1>
    <div class="features">
      <div class="card">
        <h3>海量题库</h3>
        <p>覆盖多学科领域的精选题目</p>
      </div>
      <div class="card">
        <h3>详细解析</h3>
        <p>专业教师团队编写答案解析</p>
      </div>
    </div>
    <router-link to="/questions" class="start-button">开始学习</router-link>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.card {
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-5px);
}

.start-button {
  display: inline-block;
  padding: 1rem 2rem;
  background: #409eff;
  color: white;
  border-radius: 4px;
  text-decoration: none;
}
</style>