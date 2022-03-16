<template>
  <div id="page">
    <Header/>
    <div id="middle">
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/layouts/Header.vue'
import UserDatas from './components/parts/UserDatas.vue'
import Text from './components/layouts/Text.vue'
import Map from './components/parts/Map.vue'
import Footer from './components/layouts/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    UserDatas,
    Text,
    Map,
    Footer
  }
}
</script>

<style>
  #page {
    background: linear-gradient(50deg, #86C232, #86C232, #61892F);
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
