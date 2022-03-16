<template>
     <h2 v-if="user">Hi, {{ user.username }}</h2>
     <Text/>
     <Footer/>
</template>

<script>
import axios from "axios"
import Text from '../layouts/Text.vue'
import Map from '../parts/Map.vue'
import Footer from '../layouts/Footer.vue'

export default {
     name: 'Home',
     data() {
          return {
               user: null
          }
     },
     components: {
          Text,
          Map,
          Footer
     },

     methods: {
          async getUserDatas() {
                axios
                    .request({
                      url: 'api/user',
                      method: 'get'
                    })
                    .then(response => {
                      this.user = response.data
                    })
          }
     },
     mounted() {
          this.getUserDatas()
     }
}
</script>