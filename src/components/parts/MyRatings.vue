<template>
     <div class="text-wrapper p-5">
          <div v-for="r in myRatings" :key="r.id" class="text-inner w-75 fs-4 mb-3">
               <p>{{ r.atlag }}</p>
               <p>{{ r.description }}</p>
               <div class="row float-start">
                    <div class="col p-2 px-3" >
                         <fa class="float-start mb-2" v-for="r in r.stars" :key="r.stars" :icon="['fas', 'star']"/>
                    </div>
               </div>
               <div class="w-100 mt-3 float-start">
                    <button class="btn btn-primary fs-5 m-1 w-50" @click="editRating(r.id)">Értékelés szerkesztése</button>
                    <button class="btn btn-danger fs-5 m-1 w-50" @click="deleteRating(r.id)">Értékelés törlése</button>
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
     name: 'MyRatings',

     data() {
          return {
               myRatings: [],
               locationRating: [],
               locationData: []
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
          async loadMyRatings() {
               let res = await axios
                    .get('api/rating_by_user/' + this.user.id)
                    .then(response => this.myRatings = response.data)
                    .catch(error => console.log(error))

               for (let i = 0; i < res.length; i++) {
                    await axios
                         .get('api/location_avgrating/' + res[i].location_id)
                         .then(response => this.locationRating.push(response.data))
                         .catch(error => console.log(error))
                    
                    await axios
                         .get('api/locations/' + res[i].location_id)
                         .then(response => this.locationData.push(response.data))
                         .catch(error => console.log(error))
               }

               console.log(this.myRatings)
               console.log(this.locationRating)
               console.log(this.locationData)
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
          if (this.user == null) {
               this.$router.push({ name: "Home" })
          } else {
               this.loadMyRatings()
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