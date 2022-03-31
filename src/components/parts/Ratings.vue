<template>
     <div class="text-wrapper p-5">
          <div v-if="this.locationData" class="text-inner text-center m-auto w-50 mb-3">
               <p class="fs-2"><u>{{ this.locationData.name }}</u></p>
               <div class="m-3">
                    <p class="fs-4 m-0">Szélesség: {{ this.locationData.lat }}</p>
                    <p class="fs-4 m-0">Hosszúság: {{ this.locationData.lng }}</p>
               </div>
               <p class="fs-4 m-4">{{ this.locationData.description }}</p>
               <p v-if="this.locationRating.atlag" class="fs-4"><fa :icon="['fas', 'star']"/> {{ this.locationRating.atlag }}</p>
          </div>
          <div v-for="r in ratings" :key="r.id" class="text-inner w-75 fs-4 mb-3">
               <p>{{ r.description }}</p>
               <div class="row float-start">
                    <div class="col p-2 px-3" >
                         <fa class="float-start mb-2" v-for="r in r.stars" :key="r.stars" :icon="['fas', 'star']"/>
                    </div>
               </div>
          </div>
          <div v-if="this.user && !this.sent" class="text-inner w-75 d-flex flex-column m-auto fs-4">
               <p class="fs-3 text-center text-decoration-underline">Mi a véleménye a helyről?</p>
               <div class="w-100 m-auto p-2 mb-2">
                    <p class="m-auto w-75 mb-1">Szöveges értékelés:</p>
                    <textarea v-model="this.state.description" class="m-auto d-flex justify-content-center w-75" type="text" rows="6" cols="70"/>
                    <span class="text-danger text-center" v-if="v$.description.$error">
                    {{ v$.description.$errors[0].$message }}
                    </span>
               </div>
               <div class="w-75 m-auto p-2 mb-2">
                    <p class="m-auto mb-1">5-ös skálán értékelés (1 = rossz, 5 = jó):</p>
                    <select v-model="this.state.stars" class="w-25">
                         <option>1</option>
                         <option>2</option>
                         <option>3</option>
                         <option>4</option>
                         <option>5</option>
                    </select>
                    <span class="text-danger text-center" v-if="v$.stars.$error">
                    {{ v$.stars.$errors[0].$message }}
                    </span>
               </div>
               <div class="row m-auto d-flex justify-content-end w-75 mb-3">
                    <button class="btn btn-primary w-50 fs-5" @click="addRating">Vélemény közzététele</button>
               </div>
               <div v-if="this.error == 1" class="alert alert-success m-auto fs-4 w-75">
                    {{ this.message }}
               </div>
               <div v-if="this.error == 0" class="alert alert-danger m-auto fs-4 w-75">
                    {{ this.message }}
               </div>
          </div>
          <div v-if="this.sent" class="text-inner w-75 d-flex flex-column m-auto fs-4">
               <div v-if="this.error == 1" class="alert alert-success m-auto fs-4 w-75">
                    {{ this.message }}
               </div>
               <div v-if="this.error == 0" class="alert alert-danger m-auto fs-4 w-75">
                    {{ this.message }}
               </div>
          </div>
     </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import useVuelidate from '@vuelidate/core'
import { required, maxLength, helpers } from '@vuelidate/validators'
import { reactive, computed } from 'vue'

export default {
     name: 'Ratings',

     data() {
          return {
               locationRatingId: null,
               ratings: [],
               locationRating: [],
               locationData: [],
               myRating: [],
               value: null,
               message: "",
               error: 2,
               sent: false
          }
     },
     
     setup() {
        const state = reactive({
             description: "",
             stars: null
        })

        const rules = computed(() => {
            return {
               description: {
                    max: helpers.withMessage('A leírás legfeljebb 255 karakter hoszzú lehet!', maxLength(255))
               },

               stars: {
                    required: helpers.withMessage('A skálás értékelés kitöltése kötelező!', required)
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
          async loadDatas() {
               await axios
                    .get('api/rating_by_location/' + this.locationRatingId)
                    .then(response => this.ratings = response.data)
                    .catch(error => console.log(error))

               await axios
                    .get('api/location_avgrating/' + this.locationRatingId)
                    .then(response => this.locationRating = response.data)
                    .catch(error => console.log(error))
               
               await axios
                    .get('api/locations/' + this.locationRatingId)
                    .then(response => (this.locationData = response.data))
                    .catch(error => console.log(error))
          },

          async addRating() {
               this.v$.$validate()
               if (!this.v$.$error) {
               await axios
                    .post('api/ratings', {
                         description: this.state.description,
                         location_id: this.locationRatingId,
                         user_id: this.user.id,
                         stars: parseInt(this.state.stars)
                    })
                    .then(response => {
                              if (response.status == 201) {
                                   this.message = "Értékelés sikeresen közzétéve!"
                                   this.error = 1
                                   this.sent = 1
                              } else {
                                   this.message = "Valami hiba történt"
                                   this.error = 0
                              }
                         })
                    .catch(error => console.log(this.error))
               }

               this.loadDatas()
          }
     },

     mounted() {
          if (this.locationRatingId == null) {
               this.$router.push({ name: "Home" })
          } else {
               this.loadDatas()
          }
     },

     created() {
          this.locationRatingId = this.$route.params.ratingId
     },

     computed: {
          ...mapGetters(['user'])
     }
}
</script>

<style scoped>
     .option {
          color: rgb(0, 0, 0);
     }
</style>