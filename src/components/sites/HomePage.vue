<template>
     <Text/>
     <List/>
</template>

<script>
import { mapGetters } from 'vuex'
import Text from '../layouts/Text.vue'
import Map from '../parts/Map.vue'
import List from '../parts/List.vue'

export default {
     name: 'HomePage',
     
     components: {
          Text,
          Map,
          List
     },

     computed: {
          ...mapGetters(['user'])
     }
}
</script>