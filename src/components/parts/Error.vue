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
               <div class="d-flex justify-content-end mb-2" v-if="!sent">
                    <button class="btn btn-success fs-4 w-25" @click="sendError">
                         Hiba küldése
                    </button>
               </div>
               <div v-if="this.error == 0" class="alert alert-danger d-flex align-items-center fs-4">
                    {{ this.message }}
               </div>
               <div v-if="this.error == 1" class="alert alert-success d-flex align-items-center fs-4">
                    {{ this.message }}
               </div>
          </div>
     </div>
</template>

<script>
import axios from 'axios'
import useVuelidate from '@vuelidate/core'
import { required, maxLength, helpers } from '@vuelidate/validators'
import { reactive, computed } from 'vue'

export default {
     name: 'Error',

     data() {
          return {
               message: "",
               error: 2,
               sent: 0
          }
     },
     
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
                         required: helpers.withMessage('A hiba leírása nem lehet üres!', required),
                         max: helpers.withMessage('A hiba leírása legfeljebb 255 karakter hoszzú lehet!', maxLength(255))
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
                         .then(response => {
                              if (response.status == 201) {
                                   this.message = "Üzenet sikeresen elküldve"
                                   this.error = 1
                                   this.sent = 1
                              } else {
                                   this.message = "Az üzenet nincs elküldve"
                                   this.error = 0
                              }
                         })
                         .catch(error => console.log(this.error))
               }
          }
     }
}
</script>