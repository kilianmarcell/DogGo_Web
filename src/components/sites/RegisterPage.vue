<template>
     <Register/>
     <Footer/>
</template>

<script>
import Register from "../authentication/Register.vue"
import Footer from "../layouts/Footer.vue"

export default {
     name: 'RegisterPage',

     components: {
          Register,
          Footer
     }
}
</script>

<style>

</style>