import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/watch',
    name: 'watch',
    component: () => import('../views/TimeCounter.vue')
  },
  {
    path: '/calc',
    name: 'calc',
    component: () => import('../views/Calc.vue')
  },
  {
    path: '/mail',
    name: 'mail',
    props: true,
    component: () => import('../views/Mail.vue')
  },
  {
    path: '/clients',
    name: 'clients',
    component: () => import('../views/Clients.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/Settings.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
