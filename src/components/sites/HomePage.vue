<template>
     <Text/>
</template>

<script>
import Text from '../layouts/Text.vue'
import Map from '../parts/Map.vue'
import { mapGetters } from 'vuex'

export default {
     name: 'HomePage',
     
     components: {
          Text,
          Map
     },

     computed: {
          ...mapGetters(['user'])
     }
}
</script>