<template>
  <div id="page">
    <Header/>
      <router-view/>
  </div>
</template>

<script>
import Header from './components/layouts/Header.vue'
import UserDatas from './components/parts/UserDatas.vue'
import Text from './components/layouts/Text.vue'
import Map from './components/parts/Map.vue'

export default {
  name: 'App',
  components: {
    Header,
    UserDatas,
    Text,
    Map
  }
}
</script>

<style>
  body {
    height: 100em;
    background: linear-gradient(180deg, #86C232, #61892F);
  }

  .text-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: justify;
  }

  .text-inner {
    margin: auto;
    background: #222629;
    color: #FFFFFF;
    box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
    padding: 40px 55px 45px 55px;
    border-radius: 15px;
    transition: all .3s;
  }
</style>
