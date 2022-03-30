<template>
     <div class="text-wrapper p-5">
          <div v-for="r in ratings" :key="r.id" class="text-inner w-75 fs-3">
               <p>Értékelés: {{ r.stars }}</p>
               <p>Leírás: {{ r.description }}</p>
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
          console.log(this.locationRatingId)
     }
}
</script>