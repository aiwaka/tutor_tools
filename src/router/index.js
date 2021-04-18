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
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/timer',
    name: 'timer',
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
