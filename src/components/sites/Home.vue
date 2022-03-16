<template>
     <Text/>
     <Footer/>
</template>

<script>
import Text from '../layouts/Text.vue'
import Map from '../parts/Map.vue'
import Footer from '../layouts/Footer.vue'

export default {
     name: 'Home',
     props: ['user'],
     components: {
          Text,
          Map,
          Footer
     },
}
</script>