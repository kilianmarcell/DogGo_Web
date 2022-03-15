<template>
  <button class="btn btn-primary" @click="kiir">Adom</button>
</template>

<script>
export default {
     props: ['data'],
     methods: {
          kiir() {
               console.log(data)
          }
     },
     mounted() {
          let data = this.$route.params.data;
          console.log("data is", data);
     }
}
</script>

<style>

</style>