<template>
  <div>
    <Header/>
    <Register/>
    <Login/>
  </div>
</template>

<script>
import Header from './components/layouts/Header.vue'
import List from './components/List.vue'
import Register from './components/authentication/Register.vue'
import Login from './components/authentication/Login.vue'
import Map from './components/Map.vue'

export default {
  name: 'App',
  components: {
    Header,
    List,
    Register,
    Login,
    Map
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
