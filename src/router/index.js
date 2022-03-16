import { createRouter, createWebHashHistory } from 'vue-router'

import Header from '../components/layouts/Header.vue'
import Home from '../components/sites/Home.vue'
import Register from '../components/authentication/Register.vue'
import Login from '../components/authentication/Login.vue'
import Map from '../components/parts/Map.vue'
import UserDatas from '../components/parts/UserDatas.vue'

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
  }
]

const router = createRouter({
  mode: 'history',
  history: createWebHashHistory(),
  routes
})

export default router
