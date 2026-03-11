<template>
<div class="page">
  <Navbar />

  <main class="container">
    <h1>Dashboard Administrativo</h1>

    <!-- Cards de estatísticas -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon stat-total">📋</div>
        <div>
          <p class="stat-value">{{ stats.total }}</p>
          <p class="stat-label">Total</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon stat-analise">⚠️</div>
        <div>
          <p class="stat-value">{{ stats.analise }}</p>
          <p class="stat-label">Em análise</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon stat-andamento">🕐</div>
        <div>
          <p class="stat-value">{{ stats.andamento }}</p>
          <p class="stat-label">Em andamento</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon stat-concluida">✅</div>
        <div>
          <p class="stat-value">{{ stats.concluida }}</p>
          <p class="stat-label">Concluídas</p>
        </div>
      </div>
    </div>

    <!-- Tabela de demandas -->
    <div class="table-header">
      <h2>Demandas</h2>
      <button class="btn-primary" @click="abrirFormNovo">+ Nova Demanda</button>
    </div>

    <div class="table-wrap">
      <table class="tabela">
        <thead>
          <tr>
            <th>Título</th>
            <th class="hide-sm">Categoria</th>
            <th>Status</th>
            <th class="hide-md">Abertura</th>
            <th class="text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="d in demandas" :key="d.id">
            <td class="td-titulo">{{ d.titulo }}</td>
            <td class="hide-sm td-muted">{{ d.Categoria?.nome || '—' }}</td>
            <td><StatusBadge :status="d.status" /></td>
            <td class="hide-md td-muted">{{ d.dataAbertura }}</td>
            <td class="text-right td-actions">
              <button class="btn-icon" title="Visualizar" @click="verDetalhe(d)">👁</button>
              <button class="btn-icon" title="Editar" @click="editarDemanda(d)">✏️</button>
            </td>
          </tr>
          <tr v-if="demandas.length === 0">
            <td colspan="5" class="sem-dados">Nenhuma demanda encontrada.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>

  <!-- Modais -->
  <DemandaForm
    v-if="mostrarForm"
    :demanda="demandaEditando"
    :categorias="categorias"
    @close="mostrarForm = false"
    @saved="carregarDemandas"
  />
  <DemandaDetalhe
    v-if="demandaDetalhe"
    :demanda="demandaDetalhe"
    @close="demandaDetalhe = null"
  />
</div>
</template>

<script>
import api from "../services/api"
import Navbar from "../components/Navbar.vue"
import StatusBadge from "../components/StatusBadge.vue"
import DemandaForm from "../components/DemandaForm.vue"
import DemandaDetalhe from "../components/DemandaDetalhe.vue"

export default {
  name: 'AdminDashboard',
  components: { Navbar, StatusBadge, DemandaForm, DemandaDetalhe },
  data() {
    return {
      demandas: [],
      categorias: [],
      mostrarForm: false,
      demandaEditando: null,
      demandaDetalhe: null
    }
  },
  computed: {
    stats() {
      return {
        total: this.demandas.length,
        analise: this.demandas.filter(d => d.status === 'Em análise').length,
        andamento: this.demandas.filter(d => d.status === 'Em andamento').length,
        concluida: this.demandas.filter(d => d.status === 'Concluída').length
      }
    }
  },
  async mounted() {
    await this.carregarDemandas()
    await this.carregarCategorias()
  },
  methods: {
    async carregarDemandas() {
      try {
        const res = await api.get('/demandas')
        this.demandas = res.data
      } catch (err) {
        console.error('Erro ao carregar demandas:', err)
      }
    },
    async carregarCategorias() {
      try {
        const res = await api.get('/categorias')
        this.categorias = res.data
      } catch {
        // silencioso se rota não existir ainda
      }
    },
    abrirFormNovo() {
      this.demandaEditando = null
      this.mostrarForm = true
    },
    editarDemanda(demanda) {
      this.demandaEditando = demanda
      this.mostrarForm = true
    },
    verDetalhe(demanda) {
      this.demandaDetalhe = demanda
    }
  }
}
</script>

<style scoped>
.page { min-height: 100vh; background: #f8fafc; }
.container { max-width: 1100px; margin: 0 auto; padding: 32px 20px; }
h1 { font-size: 1.4rem; font-weight: 800; color: #1a1a2e; margin: 0 0 24px 0; }
h2 { font-size: 1rem; font-weight: 700; color: #1a1a2e; margin: 0; }

/* Stats */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}
@media (max-width: 700px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
.stat-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 18px;
  display: flex;
  align-items: center;
  gap: 14px;
}
.stat-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  flex-shrink: 0;
}
.stat-total { background: #eff6ff; }
.stat-analise { background: #fefce8; }
.stat-andamento { background: #eff6ff; }
.stat-concluida { background: #f0fdf4; }
.stat-value { font-size: 1.6rem; font-weight: 800; color: #1a1a2e; margin: 0; }
.stat-label { font-size: 0.75rem; color: #6b7280; margin: 0; }

/* Table header */
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.btn-primary {
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 9px 18px;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-primary:hover { background: #1a252f; }

/* Table */
.table-wrap {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
}
.tabela { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
.tabela thead tr {
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  text-align: left;
}
.tabela th {
  padding: 12px 16px;
  font-weight: 600;
  color: #374151;
}
.tabela tbody tr {
  border-bottom: 1px solid #f3f4f6;
  transition: background 0.15s;
}
.tabela tbody tr:last-child { border-bottom: none; }
.tabela tbody tr:hover { background: #f9fafb; }
.tabela td { padding: 12px 16px; }
.td-titulo { font-weight: 500; color: #111827; }
.td-muted { color: #6b7280; }
.td-actions { display: flex; justify-content: flex-end; gap: 4px; }
.text-right { text-align: right; }
.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 1rem;
  transition: background 0.2s;
}
.btn-icon:hover { background: #f3f4f6; }
.sem-dados { text-align: center; color: #9ca3af; padding: 32px; }

@media (max-width: 640px) {
  .hide-sm { display: none; }
}
@media (max-width: 768px) {
  .hide-md { display: none; }
}
</style>
