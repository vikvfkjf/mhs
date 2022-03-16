import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'
import Login from '../views/login.vue'
import Howplay from '../views/howplay.vue'
import History from '../views/history.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },

  {
    path: '/howplay',
    name: 'howplay',
    component: Howplay
  },

  {
    path: '/history',
    name: 'history',
    component: History
  },

  {
    path: '/login',
    name: 'login',
    component: Login
  },
  // {
  //   path: '/phoneLogin',
  //   name: 'phoneLogin',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import('./views/phone_login.vue')
  // },
  // {
  //   path: '/phoneLogin/selectCode',
  //   name: 'selectCode',
  //   component: () => import('./views/select_code.vue')
  // },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
