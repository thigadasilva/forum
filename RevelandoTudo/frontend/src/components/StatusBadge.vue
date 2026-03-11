<template>
  <span :class="badgeClass">{{ status }}</span>
</template>

<script>
export default {
  name: 'StatusBadge',
  props: {
    status: {
      type: String,
      required: true
    }
  },
  computed: {
    badgeClass() {
      const map = {
        'Em análise': 'badge badge-analise',
        'Em andamento': 'badge badge-andamento',
        'Concluída': 'badge badge-concluida'
      }
      return map[this.status] || 'badge'
    }
  }
}
</script>

<style scoped>
.badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid transparent;
}
.badge-analise {
  background: rgba(234, 179, 8, 0.15);
  color: #a16207;
  border-color: rgba(234, 179, 8, 0.3);
}
.badge-andamento {
  background: rgba(59, 130, 246, 0.15);
  color: #1d4ed8;
  border-color: rgba(59, 130, 246, 0.3);
}
.badge-concluida {
  background: rgba(34, 197, 94, 0.15);
  color: #15803d;
  border-color: rgba(34, 197, 94, 0.3);
}
</style>
