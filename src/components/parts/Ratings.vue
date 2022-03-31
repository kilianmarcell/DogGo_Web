<template>
     <div class="text-wrapper p-5">
          <div class="text-inner text-center m-auto w-50 mb-3">
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
     </div>
</template>

<script>
import axios from "axios"

export default {
     name: 'Ratings',

     data() {
          return {
               locationRatingId: null,
               ratings: [],
               ratingsUser: [],
               locationRating: [],
               locationData: []
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
     }
}
</script>