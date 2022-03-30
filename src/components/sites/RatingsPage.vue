<template>
     <Ratings/>
     <Footer/>
</template>

<script>
import Ratings from '../parts/Ratings.vue'
import Footer from '../layouts/Footer.vue'

export default {
     name: 'RatingsPage',

     components: {
          Ratings,
          Footer
     }
}
</script>