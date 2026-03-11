<template>
<div class="login-container">

  <!-- Tela de seleção de papel -->
  <div v-if="!roleSelecionado" class="selecao-papel">
    <div class="brand">
      <div class="brand-icon">📋</div>
      <h1>RevelandoTudo</h1>
      <p>Portal de Transparência Institucional</p>
    </div>

    <div class="cards-papel">
      <button class="card-papel" @click="selecionarPapel('admin')">
        <span class="papel-icon">🛡️</span>
        <h3>Acesso Institucional</h3>
        <p>Painel administrativo da instituição</p>
      </button>
      <button class="card-papel" @click="selecionarPapel('student')">
        <span class="papel-icon">🎓</span>
        <h3>Acesso Estudante</h3>
        <p>Acompanhe as ações da sua instituição</p>
      </button>
    </div>
  </div>

  <!-- Formulário de login -->
  <div v-else class="form-wrapper">
    <button class="btn-voltar" @click="roleSelecionado = null">← Voltar</button>

    <div class="form-card">
      <div class="form-header">
        <div class="form-icon">{{ roleSelecionado === 'admin' ? '🛡️' : '🎓' }}</div>
        <h2>{{ roleSelecionado === 'admin' ? 'Acesso Institucional' : 'Acesso Estudante' }}</h2>
        <p>{{ roleSelecionado === 'admin' ? 'Painel administrativo da instituição' : 'Acompanhe as ações da sua instituição' }}</p>
      </div>

      <form @submit.prevent="handleLogin" class="form-login">
        <div class="field">
          <label>E-mail</label>
          <input type="email" v-model="email" placeholder="seu@email.edu.br" required />
        </div>
        <div class="field">
          <label>Senha</label>
          <input type="password" v-model="senha" placeholder="••••••••" required />
        </div>
        <p v-if="erro" class="erro-msg">{{ erro }}</p>
        <button type="submit" class="btn-submit" :disabled="carregando">
          {{ carregando ? 'Entrando...' : (roleSelecionado === 'admin' ? 'Entrar como Admin' : 'Entrar como Estudante') }}
        </button>
      </form>
    </div>
  </div>

</div>
</template>

<script>
import api from "../services/api"

export default {
  name: 'Login',
  data() {
    return {
      roleSelecionado: null,
      email: '',
      senha: '',
      erro: '',
      carregando: false
    }
  },
  methods: {
    selecionarPapel(papel) {
      this.roleSelecionado = papel
      this.email = ''
      this.senha = ''
      this.erro = ''
    },
    async handleLogin() {
      this.erro = ''
      this.carregando = true
      try {
        const res = await api.post('/auth/login', { email: this.email, senha: this.senha })
        const { token, user } = res.data

        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))

        if (user.role === 'admin') {
          this.$router.push('/admin')
        } else {
          this.$router.push('/student')
        }
      } catch (err) {
        this.erro = err.response?.data?.error || 'Erro ao fazer login. Verifique suas credenciais.'
      } finally {
        this.carregando = false
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f5f9;
  padding: 24px;
}
.selecao-papel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  max-width: 640px;
  width: 100%;
}
.brand { text-align: center; }
.brand-icon { font-size: 3rem; margin-bottom: 12px; }
.brand h1 { font-size: 1.8rem; font-weight: 800; color: #1a1a2e; margin: 0 0 6px 0; }
.brand p { color: #6b7280; font-size: 0.95rem; margin: 0; }
.cards-papel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;
}
@media (max-width: 500px) { .cards-papel { grid-template-columns: 1fr; } }
.card-papel {
  background: #fff;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  padding: 32px 24px;
  cursor: pointer;
  text-align: center;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.card-papel:hover {
  border-color: #2c3e50;
  box-shadow: 0 8px 30px rgba(44,62,80,0.12);
  transform: translateY(-2px);
}
.papel-icon { font-size: 2.5rem; }
.card-papel h3 { font-size: 1rem; font-weight: 700; color: #1a1a2e; margin: 0; }
.card-papel p { font-size: 0.82rem; color: #6b7280; margin: 0; }
.form-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 400px;
}
.btn-voltar {
  align-self: flex-start;
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 4px 0;
}
.btn-voltar:hover { color: #1a1a2e; }
.form-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.08);
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.form-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.form-icon {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2c3e50;
  border-radius: 14px;
}
.form-header h2 { font-size: 1.15rem; font-weight: 700; color: #1a1a2e; margin: 0; }
.form-header p { font-size: 0.82rem; color: #6b7280; margin: 0; }
.form-login { display: flex; flex-direction: column; gap: 14px; }
.field { display: flex; flex-direction: column; gap: 6px; }
.field label { font-size: 0.85rem; font-weight: 600; color: #374151; }
.field input {
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s;
}
.field input:focus { border-color: #2c3e50; }
.erro-msg { color: #dc2626; font-size: 0.82rem; margin: 0; }
.btn-submit {
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 11px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-submit:hover:not(:disabled) { background: #1a252f; }
.btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
</style>