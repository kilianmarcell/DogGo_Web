import { createRouter, createWebHashHistory } from 'vue-router'

import Header from '../components/layouts/Header.vue'
import List from '../components/parts/List.vue'
import Register from '../components/authentication/Register.vue'
import Login from '../components/authentication/Login.vue'
import Map from '../components/parts/Map.vue'
import UserDatas from '../components/parts/UserDatas.vue'

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
  },
  {
    path: '/felhasznalo',
    name: 'UserDatas',
    component: UserDatas,
    meta: {
      auth: true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
