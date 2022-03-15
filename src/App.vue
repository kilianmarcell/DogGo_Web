<template>
  <div>
    <Header/>
    <Register/>
    <Login/>
    <UserDatas/>
  </div>
</template>

<script>
import Header from './components/layouts/Header.vue'
import List from './components/parts/List.vue'
import Register from './components/authentication/Register.vue'
import Login from './components/authentication/Login.vue'
import Map from './components/parts/Map.vue'
import UserDatas from './components/parts/UserDatas.vue'

export default {
  name: 'App',
  components: {
    Header,
    List,
    Register,
    Login,
    Map,
    UserDatas
  }
}
</script>

<style>
  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: black;
  }
</style>
