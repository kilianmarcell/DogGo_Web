<template>
  <div>
    <Header/>
    <Map></Map>
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
</style>
