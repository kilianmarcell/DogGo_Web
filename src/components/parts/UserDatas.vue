<template>
  <button class="btn btn-primary" @click="kiir">Adom</button>
</template>

<script>
export default {
     props: ['user'],
     methods: {
          kiir() {
               console.log(user)
          }
     },
     mounted() {
          let user = this.$route.params.user;
          console.log("data is", user);
     }
}
</script>

<style>

</style>