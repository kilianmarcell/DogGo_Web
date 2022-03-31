import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../components/sites/HomePage.vue'
import RegisterPage from '../components/sites/RegisterPage.vue'
import LoginPage from '../components/sites/LoginPage.vue'
import InfoPage from '../components/sites/InfoPage.vue'
import UserDataPage from '../components/sites/UserDataPage.vue'
import MyLocationsPage from '../components/sites/MyLocationsPage.vue'
import ErrorPage from '../components/sites/ErrorPage.vue'
import RatingsPage from '../components/sites/RatingsPage.vue'
import MyRatingsPage from '../components/sites/MyRatingsPage.vue'

const router = createRouter({
  history: createWebHistory(),
  
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/regisztracio',
      name: 'Register',
      component: RegisterPage
    },
    {
      path: '/bejelentkezes',
      name: 'Login',
      component: LoginPage
    },
    {
      path: '/doggoinformacio',
      name: 'Info',
      component: InfoPage
    },
    {
      path: '/felhasznalo',
      name: 'UserData',
      component: UserDataPage
    },
    {
      path: '/helyek',
      name: 'MyLocationsPage',
      component: MyLocationsPage
    },
    {
      path: '/hibajelentes',
      name: 'ErrorPage',
      component: ErrorPage
    },
    {
      path: '/ertekelesek',
      name: 'RatingsPage',
      component: RatingsPage
    },
    {
      path: '/sajat_ertekelesek',
      name: 'MyRatingsPage',
      component: MyRatingsPage
    }
  ]
})

export default router
