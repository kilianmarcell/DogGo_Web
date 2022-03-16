<template>
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
               user: {
                    id: null,
                    email: "",
                    username: ""
               }
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
                      console.log(this.user)
                    })
          }
     },
     mounted() {
          this.getUserDatas()
     }
}
</script>