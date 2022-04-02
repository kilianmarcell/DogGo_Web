import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../components/sites/HomePage.vue')
    },
    {
      path: '/regisztracio',
      name: 'Register',
      component: () => import('../components/sites/RegisterPage.vue')
    },
    {
      path: '/bejelentkezes',
      name: 'Login',
      component: () => import('../components/sites/LoginPage.vue')
    },
    {
      path: '/doggoinformacio',
      name: 'Info',
      component: () => import('../components/sites/InfoPage.vue')
    },
    {
      path: '/felhasznalo',
      name: 'UserData',
      component: () => import('../components/sites/UserDataPage.vue')
    },
    {
      path: '/helyek',
      name: 'MyLocationsPage',
      component: () => import('../components/sites/MyLocationsPage.vue')
    },
    {
      path: '/hibajelentes',
      name: 'ErrorPage',
      component: () => import('../components/sites/ErrorPage.vue')
    },
    {
      path: '/ertekelesek',
      name: 'RatingsPage',
      component: () => import('../components/sites/RatingsPage.vue')
    }
  ]
})

export default router
