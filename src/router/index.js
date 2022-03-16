import { createRouter, createWebHistory } from 'vue-router'

import Header from '../components/layouts/Header.vue'
import Home from '../components/sites/Home.vue'
import Register from '../components/authentication/Register.vue'
import Login from '../components/authentication/Login.vue'
import Map from '../components/parts/Map.vue'
import UserDatas from '../components/parts/UserDatas.vue'
import Info from '../components/parts/Info.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/info',
      name: 'Info',
      component: Info
    }
  ]
})

export default router
