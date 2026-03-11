<template>
  <div class="progress-bar-wrap">
    <div class="progress-bar-fill" :style="{ width: pct + '%' }"></div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    status: {
      type: String,
      required: true
    }
  },
  computed: {
    pct() {
      const map = {
        'Em análise': 20,
        'Em andamento': 60,
        'Concluída': 100
      }
      return map[this.status] || 0
    }
  }
}
</script>

<style scoped>
.progress-bar-wrap {
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background: #e5e7eb;
  overflow: hidden;
}
.progress-bar-fill {
  height: 100%;
  border-radius: 999px;
  background: #2c3e50;
  transition: width 0.5s ease;
}
</style>
