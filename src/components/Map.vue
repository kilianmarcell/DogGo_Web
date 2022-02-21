<template>
     <div>
          <h1>Koordinátáid:</h1>
          <p>{{ coordinates.lat }} , {{ coordinates.lng }}</p>
     </div>
</template>
<script>
export default {
     data() {
          return {
               coordinates: {
                    lat: 0,
                    lng: 0
               }
          } 
     },
     created() {
          this.$getLocation({})
               .then(coordinates => {
                    this.coordinates = coordinates;
               })
               .catch(error => alert("Kérem engedélyezze az ön helyének meghatározását!"));
     }
}
</script>