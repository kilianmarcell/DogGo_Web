<template>
     <Login/>
     <Footer/>
</template>

<script>
import Login from "../authentication/Login.vue"
import Footer from "../layouts/Footer.vue"

export default {
     name: 'LoginPage',

     components: {
          Login,
          Footer
     }
}
</script>

<style>

</style>