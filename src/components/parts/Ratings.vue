<template>
     <div class="text-wrapper p-5">
          <div v-for="r in ratings" :key="r.id" class="text-inner w-75 fs-4 mb-3">
               <p>{{ r.description }}</p>
               <div class="row float-start">
                    <div class="col p-2 px-3" >
                         <fa class="float-start mb-2" v-for="r in r.stars" :key="r.stars" :icon="['fas', 'star']"/>
                         <p >Értékelés:  {{ r.stars }}</p>
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
               ratings: []
          }
     },

     methods: {
          async loadRatings() {
               await axios
                    .get('api/rating_by_location/' + this.locationRatingId)
                    .then(response => (this.ratings = response.data))
                    .catch(error => console.log(error))
          }
     },

     mounted() {
          this.loadRatings()
     },

     created() {
          this.locationRatingId = this.$route.params.ratingId
     }
}
</script>