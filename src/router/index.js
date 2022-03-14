import { createRouter, createWebHashHistory } from 'vue-router'

import Header from '../components/layouts/Header.vue'
import List from '../components/List.vue'
import Register from '../components/authentication/Register.vue'
import Login from '../components/authentication/Login.vue'
import Map from '../components/Map.vue'

const routes = [
  {
    path: '/',
    name: 'Header',
    component: Header
  },
  {
    path: '/list',
    name: 'List',
    component: List
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
