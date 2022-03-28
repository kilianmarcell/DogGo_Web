<template>
     <div class="text-wrapper p-5">
          <div class="text-inner w-50 fs-3 text-center">
               <div class="text-decoration-underline fs-2 pb-3">
                    Hiba jelentése
               </div>
               <div class="mb-2">
                    <textarea
                    class="fs-4 m-auto w-100"
                    rows="6"
                    cols="70"
                    placeholder="Hiba leírása"
                    v-model="this.state.errorMsg.comment"/>
                    <span class="text-danger text-center" v-if="v$.errorMsg.comment.$error">
                    {{ v$.errorMsg.comment.$errors[0].$message }}
                    </span>
               </div>
               <div class="d-flex justify-content-end">
                    <button class="btn btn-success fs-4 w-25" @click="sendError">
                         Hiba küldése
                    </button>
               </div>
          </div>
     </div>
</template>

<script>
import axios from "axios"
import useVuelidate from "@vuelidate/core"
import { required, maxLength, helpers } from "@vuelidate/validators"
import { reactive, computed } from "vue"

export default {
     name: 'Error',
     
     setup() {
        const state = reactive({
             errorMsg: {
               comment: ""
             }
        })

        const rules = computed(() => {
            return {
               errorMsg: {
                    comment: {
                         required: helpers.withMessage('A hibaüzenet kitöltése kötelező!', required),
                         max: helpers.withMessage('A hibaüzenet legfeljebb 255 karakter hoszzú lehet!', maxLength(255))
                    }
               }
            }
        })

        const v$ = useVuelidate(rules, state)

        return {
            state,
            v$
        }
    },

     methods: {
          async sendError() {
               this.v$.$validate()
               if (!this.v$.$error) {
                    await axios
                         .post('api/feedbacks', this.state.errorMsg)
                         .catch(error => console.log(this.error))
               }
          }
     }
}
</script>