<template>
  <footer class="d-flex justify-content-center align-items-center fs-5 w-100 border-top-5">
       <div>
          <p><u class="fs-4">Elérhetőségek:</u></p>
               <p>
                    <fa :icon="['fas', 'envelope']"/> <i>infodoggo@gmail.com</i><br>
                    <fa :icon="['fas', 'phone']"/> <i>+36 30 275 6435</i>
               </p>
       </div>
  </footer>
</template>

<script>
export default {
     name: 'Footer'
}
</script>

<style>
     footer {
          background: #222629;
          color: #FFFFFF;
          height: 150px;
          position: fixed;
          bottom: 0;
     }
</style>