import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../components/sites/HomePage.vue'
import RegisterPage from '../components/sites/RegisterPage.vue'
import LoginPage from '../components/sites/LoginPage.vue'
import InfoPage from '../components/sites/InfoPage.vue'
import UserDataPage from '../components/sites/UserDataPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterPage
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    },
    {
      path: '/info',
      name: 'Info',
      component: InfoPage
    },
    {
      path: '/userdata',
      name: 'UserData',
      component: UserDataPage
    }
  ]
})

export default router
