import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../components/sites/HomePage.vue'
import Register from '../components/authentication/Register.vue'
import Login from '../components/authentication/Login.vue'
import Info from '../components/parts/Info.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
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
