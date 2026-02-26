import api from '../api'

export default {
  login(credentials) {
    return api.post('/users/login', credentials)
  },

  register(data) {
    return api.post('/users/register', data)
  },

  me() {
    return api.get('/users/me')
  }
}