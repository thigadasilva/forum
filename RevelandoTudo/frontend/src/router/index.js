import { createRouter, createWebHistory } from "vue-router"

import Login from "../pages/login.vue"
import Dashboard from "../pages/dashboard.vue"
import Demandas from "../pages/demandas.vue"
import AdminDashboard from "../pages/adminDashboard.vue"
import StudentDashboard from "../pages/studentDashboard.vue"

const routes = [

{
  path: "/",
  component: Login
},

{
  path: "/admin",
  component: AdminDashboard,
  meta: { role: 'admin' }
},

{
  path: "/student",
  component: StudentDashboard,
  meta: { role: 'student' }
},

{
  path: "/dashboard",
  component: Dashboard
},

{
  path: "/demandas",
  component: Demandas
}

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.role) {
    const token = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user") || "{}")

    if (!token || user.role !== to.meta.role) {
      return next("/")
    }
  }
  next()
})

export default router