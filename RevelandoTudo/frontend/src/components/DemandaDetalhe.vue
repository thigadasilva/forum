<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-box">
      <div class="modal-header">
        <h2>{{ demanda.titulo }}</h2>
        <button class="btn-icon" @click="$emit('close')">✕</button>
      </div>

      <div class="badges-row">
        <StatusBadge :status="demanda.status" />
        <span class="tag">🏷 {{ nomeCategoria }}</span>
      </div>

      <ProgressBar :status="demanda.status" />

      <p class="descricao">{{ demanda.descricao }}</p>

      <div class="datas">
        <span>📅 Abertura: {{ demanda.dataAbertura }}</span>
        <span>📅 Previsão: {{ demanda.dataEsperada }}</span>
      </div>

      <div class="historico">
        <h3>Histórico de Atualizações</h3>
        <div v-if="atualizacoes.length === 0" class="sem-historico">
          Nenhuma atualização registrada.
        </div>
        <div class="timeline">
          <div v-for="(atu, i) in atualizacoes" :key="i" class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <p class="timeline-date">{{ formatarData(atu.createdAt) }}</p>
              <p class="timeline-msg">{{ atu.mensagem }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../services/api"
import StatusBadge from "./StatusBadge.vue"
import ProgressBar from "./ProgressBar.vue"

export default {
  name: 'DemandaDetalhe',
  components: { StatusBadge, ProgressBar },
  props: {
    demanda: {
      type: Object,
      required: true
    }
  },
  emits: ['close'],
  data() {
    return {
      atualizacoes: []
    }
  },
  computed: {
    nomeCategoria() {
      return this.demanda.Categoria?.nome || this.demanda.categoria || '—'
    }
  },
  async mounted() {
    try {
      const res = await api.get(`/demandas/${this.demanda.id}/atualizacoes`)
      this.atualizacoes = res.data
    } catch (err) {
      console.error('Erro ao buscar histórico:', err)
    }
  },
  methods: {
    formatarData(dateStr) {
      if (!dateStr) return '—'
      return new Date(dateStr).toLocaleDateString('pt-BR')
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(4px);
  padding: 16px;
}
.modal-box {
  width: 100%;
  max-width: 520px;
  max-height: 90vh;
  overflow-y: auto;
  background: #fff;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}
.modal-header h2 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
  line-height: 1.3;
}
.btn-icon {
  background: none;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  color: #6b7280;
  padding: 4px 8px;
  border-radius: 6px;
  flex-shrink: 0;
  transition: background 0.2s;
}
.btn-icon:hover { background: #f3f4f6; }
.badges-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.tag {
  font-size: 0.78rem;
  color: #6b7280;
}
.descricao {
  font-size: 0.9rem;
  color: #374151;
  line-height: 1.6;
  margin: 0;
}
.datas {
  display: flex;
  gap: 24px;
  font-size: 0.78rem;
  color: #6b7280;
  flex-wrap: wrap;
}
.historico h3 {
  font-size: 0.9rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 12px 0;
}
.sem-historico {
  font-size: 0.85rem;
  color: #9ca3af;
  text-align: center;
  padding: 16px 0;
}
.timeline {
  border-left: 2px solid #e5e7eb;
  padding-left: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.timeline-item {
  position: relative;
}
.timeline-dot {
  position: absolute;
  left: -22px;
  top: 6px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #2c3e50;
}
.timeline-date {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 600;
  margin: 0 0 2px 0;
}
.timeline-msg {
  font-size: 0.85rem;
  color: #374151;
  margin: 0;
}
</style>
