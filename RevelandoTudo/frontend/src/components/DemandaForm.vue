<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <form class="modal-box" @submit.prevent="handleSubmit">
      <div class="modal-header">
        <h2>{{ isEdit ? 'Editar Demanda' : 'Nova Demanda' }}</h2>
        <button type="button" class="btn-icon" @click="$emit('close')">✕</button>
      </div>

      <div class="field">
        <label>Título</label>
        <input v-model="form.titulo" required />
      </div>

      <div class="field-row">
        <div class="field">
          <label>Categoria</label>
          <select v-model="form.categoriaId" required>
            <option value="" disabled>Selecione</option>
            <option v-for="cat in categorias" :key="cat.id" :value="cat.id">{{ cat.nome }}</option>
          </select>
        </div>
        <div class="field">
          <label>Status</label>
          <select v-model="form.status" required>
            <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>
      </div>

      <div class="field">
        <label>Descrição detalhada</label>
        <textarea v-model="form.descricao" rows="3" required></textarea>
      </div>

      <div class="field">
        <label>Previsão de conclusão</label>
        <input type="date" v-model="form.dataEsperada" required />
      </div>

      <div v-if="isEdit" class="field">
        <label>Nota de atualização (opcional)</label>
        <input v-model="form.mensagem" placeholder="Descreva a atualização..." />
      </div>

      <button type="submit" class="btn-primary btn-full">
        {{ isEdit ? 'Salvar Alterações' : 'Cadastrar Demanda' }}
      </button>
    </form>
  </div>
</template>

<script>
import api from "../services/api"

export default {
  name: 'DemandaForm',
  props: {
    demanda: {
      type: Object,
      default: null
    },
    categorias: {
      type: Array,
      default: () => []
    }
  },
  emits: ['close', 'saved'],
  data() {
    return {
      statuses: ['Em análise', 'Em andamento', 'Concluída'],
      form: {
        titulo: this.demanda?.titulo || '',
        categoriaId: this.demanda?.CategoriaId || this.demanda?.categoriaId || '',
        status: this.demanda?.status || 'Em análise',
        descricao: this.demanda?.descricao || '',
        dataEsperada: this.demanda?.dataEsperada || '',
        mensagem: ''
      }
    }
  },
  computed: {
    isEdit() {
      return !!this.demanda
    }
  },
  methods: {
    async handleSubmit() {
      try {
        if (this.isEdit) {
          await api.put(`/demandas/${this.demanda.id}`, this.form)
        } else {
          await api.post('/demandas', this.form)
        }
        this.$emit('saved')
        this.$emit('close')
      } catch (err) {
        alert('Erro ao salvar demanda. Verifique os dados e tente novamente.')
        console.error(err)
      }
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
  align-items: center;
}
.modal-header h2 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
}
.btn-icon {
  background: none;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  color: #6b7280;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background 0.2s;
}
.btn-icon:hover { background: #f3f4f6; }
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.field label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #374151;
}
.field input,
.field select,
.field textarea {
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 0.9rem;
  color: #111827;
  outline: none;
  transition: border-color 0.2s;
  font-family: inherit;
}
.field input:focus,
.field select:focus,
.field textarea:focus {
  border-color: #2c3e50;
}
.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.btn-primary {
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-primary:hover { background: #1a252f; }
.btn-full { width: 100%; }
</style>
