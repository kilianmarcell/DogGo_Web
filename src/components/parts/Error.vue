<template>
     <div class="text-wrapper p-5">
          <div class="text-inner w-50 fs-3 text-center">
               <div class="text-decoration-underline fs-2 pb-3">
                    Hiba jelentése
               </div>
               <textarea
                    class="fs-4 m-auto mb-2 w-100"
                    rows="6"
                    cols="70"
                    placeholder="Hiba leírása"/>
               <div class="d-flex justify-content-end">
                    <button class="btn btn-success fs-4 w-25">
                         Hiba küldése
                    </button>
               </div>
          </div>
     </div>
</template>

<script>
export default {
     name: 'Error'
}
</script>