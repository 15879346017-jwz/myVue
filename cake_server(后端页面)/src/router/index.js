import Vue from 'vue'
import VueRouter from 'vue-router'
import Manage from '../views/Manage.vue'
import login from '../views/login.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/Manage',
    name: 'Manage',
    component: Manage
  },
  {
    path:'/',
    component:login
  }
]

const router = new VueRouter({
  routes
})

export default router
