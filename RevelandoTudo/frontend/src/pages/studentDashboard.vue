<template>
<div class="page">
  <Navbar />

  <main class="container">
    <h1>Ações Institucionais</h1>

    <!-- Filtros -->
    <div class="filtros">
      <div class="busca-wrap">
        <span class="busca-icon">🔍</span>
        <input
          class="input-busca"
          v-model="busca"
          placeholder="Buscar por palavra-chave..."
        />
      </div>
      <select class="select-filtro" v-model="filtroCat">
        <option value="all">Todas categorias</option>
        <option v-for="cat in categorias" :key="cat" :value="cat">{{ cat }}</option>
      </select>
      <select class="select-filtro" v-model="filtroStatus">
        <option value="all">Todos status</option>
        <option v-for="s in statusList" :key="s" :value="s">{{ s }}</option>
      </select>
    </div>

    <!-- Cards de demandas -->
    <div class="cards-grid">
      <button
        v-for="d in demandasFiltradas"
        :key="d.id"
        class="card-demanda"
        @click="verDetalhe(d)"
      >
        <div class="card-top">
          <h3 class="card-titulo">{{ d.titulo }}</h3>
          <StatusBadge :status="d.status" />
        </div>
        <p class="card-desc">{{ d.descricao }}</p>
        <ProgressBar :status="d.status" />
        <div class="card-meta">
          <span>🏷 {{ d.Categoria?.nome || '—' }}</span>
          <span>📅 {{ d.dataAbertura }}</span>
        </div>
      </button>

      <p v-if="demandasFiltradas.length === 0" class="sem-resultado">
        Nenhuma ação encontrada.
      </p>
    </div>
  </main>

  <!-- Modal de detalhe -->
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
import ProgressBar from "../components/ProgressBar.vue"
import DemandaDetalhe from "../components/DemandaDetalhe.vue"

export default {
  name: 'StudentDashboard',
  components: { Navbar, StatusBadge, ProgressBar, DemandaDetalhe },
  data() {
    return {
      demandas: [],
      busca: '',
      filtroCat: 'all',
      filtroStatus: 'all',
      statusList: ['Em análise', 'Em andamento', 'Concluída'],
      demandaDetalhe: null
    }
  },
  computed: {
    categorias() {
      const cats = this.demandas
        .map(d => d.Categoria?.nome)
        .filter(Boolean)
      return [...new Set(cats)]
    },
    demandasFiltradas() {
      return this.demandas.filter(d => {
        const texto = this.busca.toLowerCase()
        const matchBusca = !texto ||
          d.titulo.toLowerCase().includes(texto) ||
          d.descricao.toLowerCase().includes(texto)
        const matchCat = this.filtroCat === 'all' || d.Categoria?.nome === this.filtroCat
        const matchStatus = this.filtroStatus === 'all' || d.status === this.filtroStatus
        return matchBusca && matchCat && matchStatus
      })
    }
  },
  async mounted() {
    try {
      const res = await api.get('/demandas')
      this.demandas = res.data
    } catch (err) {
      console.error('Erro ao carregar demandas:', err)
    }
  },
  methods: {
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

/* Filtros */
.filtros {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.busca-wrap {
  position: relative;
  flex: 1;
  min-width: 200px;
}
.busca-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.9rem;
  pointer-events: none;
}
.input-busca {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 9px 12px 9px 36px;
  font-size: 0.88rem;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}
.input-busca:focus { border-color: #2c3e50; }
.select-filtro {
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 9px 12px;
  font-size: 0.88rem;
  outline: none;
  background: #fff;
  cursor: pointer;
  transition: border-color 0.2s;
}
.select-filtro:focus { border-color: #2c3e50; }

/* Cards */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
@media (max-width: 640px) { .cards-grid { grid-template-columns: 1fr; } }
.card-demanda {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 20px;
  text-align: left;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.card-demanda:hover {
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}
.card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}
.card-titulo {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
  line-height: 1.3;
}
.card-desc {
  font-size: 0.82rem;
  color: #6b7280;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card-meta {
  display: flex;
  gap: 16px;
  font-size: 0.75rem;
  color: #9ca3af;
}
.sem-resultado {
  grid-column: 1 / -1;
  text-align: center;
  color: #9ca3af;
  padding: 48px 0;
  margin: 0;
}
</style>
