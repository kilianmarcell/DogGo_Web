<template>
     <Text/>
     <Locations/>
     <Footer/>
</template>

<script>
import { mapGetters } from 'vuex'
import Text from '../parts/Text.vue'
import Map from '../parts/Map.vue'
import Locations from '../parts/Locations.vue'
import Footer from '../layouts/Footer.vue'

export default {
     name: 'HomePage',
     
     components: {
          Text,
          Map,
          Locations,
          Footer
     },

     computed: {
          ...mapGetters(['user'])
     }
}
</script>