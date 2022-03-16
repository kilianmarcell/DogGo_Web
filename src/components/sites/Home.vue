<template>
     <h2 v-if="user">Hi, {{ user.username }}</h2>
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