<template>
  <div id="page">
    <Header/>
    <div id="middle">
      <Text/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/layouts/Header.vue'
import List from './components/parts/List.vue'
import Register from './components/authentication/Register.vue'
import Login from './components/authentication/Login.vue'
import Map from './components/parts/Map.vue'
import UserDatas from './components/parts/UserDatas.vue'
import Footer from './components/layouts/Footer.vue'
import Text from './components/layouts/Text.vue'

export default {
  name: 'App',
  components: {
    Header,
    List,
    Register,
    Login,
    Map,
    UserDatas,
    Footer,
    Text
  }
}
</script>

<style>
  #page {
    background: linear-gradient(50deg, #7cc6c3, #86C232, #f9dc71);
  }

  #middle {
    width: 90%;
    margin: auto;
  }

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
