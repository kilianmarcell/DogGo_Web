<template>
  <div id="page">
    <Header/>
      <router-view/>
  </div>
</template>

<script>
import axios from "axios"
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
  },

  data() {
      return {
            user: null
      }
  },

  methods: {
      async getUserDatas() {
        let response = await axios
            .request({
              url: 'api/user',
              method: 'get'
            })
            
        this.$store.dispatch('user', response.data)
      }
  },
  
  mounted() {
      if (localStorage.getItem('token') != null) {
        this.getUserDatas()
      }
  }
}
</script>

<style>
  #page {
    background: linear-gradient(120deg, #86C232, #61892F);
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
