<template>
  <div class="question-card">
    <div class="question" @click="toggleAnswer">
      {{ question.title }}
    </div>
    <transition name="slide">
      <div v-show="showAnswer" class="answer">
        <div v-html="question.analysis"></div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  question: {
    type: Object,
    required: true
  }
});

const showAnswer = ref(false);

const toggleAnswer = () => {
  showAnswer.value = !showAnswer.value;
};
</script>

<style scoped>
.question-card {
  margin: 15px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style> 