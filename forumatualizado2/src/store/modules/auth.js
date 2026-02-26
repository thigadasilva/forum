import authService from '@/services/modules/auth'

export default {
  namespaced: true,

 state: {
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
    perfil: (state) => state.user?.perfil || null,
    aprovado: (state) => state.user?.aprovado || false
  },

  mutations: {
    SET_AUTH(state, { token, user }) {
      state.token = token
      state.user = user

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
    },

    LOGOUT(state) {
      state.token = null
      state.user = null

      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  },

  actions: {
    async login({ commit }, credentials) {
      const response = await authService.login(credentials)

      commit('SET_AUTH', {
        token: response.data.token,
        user: response.data.user
      })
    },

    logout({ commit }) {
      commit('LOGOUT')
    }
  }
}