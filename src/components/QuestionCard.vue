<script setup>
defineProps({
  question: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="card">
    <h3 v-html="question.title"></h3>
    <el-collapse>
      <el-collapse-item title="查看解析">
        <div class="analysis" v-html="question.analysis"></div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style scoped>
.card {
  margin: 10px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}
</style> 