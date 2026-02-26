import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Home from '@/views/Home.vue'
import TopicoDetalhe from '@/views/TopicoDetalhe.vue'
import Admin from '@/views/Admin.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/topico/:id',
    name: 'TopicoDetalhe',
    component: TopicoDetalhe,
    props: true
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAuth: true, requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated']
  const perfil = store.getters['auth/perfil']

  // 🔐 Rota que exige login
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/login')
  }

  // 👑 Rota que exige admin
  if (to.meta.requiresAdmin && perfil !== 'admin') {
    return next('/')
  }

  next()
})

export default router