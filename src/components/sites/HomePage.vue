<template>
     <Text/>
     <Locations/>
</template>

<script>
import { mapGetters } from 'vuex'
import Text from '../layouts/Text.vue'
import Map from '../parts/Map.vue'
import Locations from '../parts/Locations.vue'

export default {
     name: 'HomePage',
     
     components: {
          Text,
          Map,
          Locations
     },

     computed: {
          ...mapGetters(['user'])
     }
}
</script>