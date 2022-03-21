<template>
     <Text/>
     <Footer/>
</template>

<script>
import Text from '../layouts/Text.vue'
import Map from '../parts/Map.vue'
import Footer from '../layouts/Footer.vue'
import { mapGetters } from 'vuex'

export default {
     name: 'HomePage',
     
     components: {
          Text,
          Map,
          Footer
     },

     computed: {
          ...mapGetters(['user'])
     }
}
</script>