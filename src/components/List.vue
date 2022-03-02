<template>
  <table>
      <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>lat</th>
            <th>lng</th>
            <th>user_id</th>
          </tr>
      </thead>
      <body>
            <tr v-for="location in locations" :key="location.id">
                <td>{{ location.id }}</td>
                <td>{{ location.name }}</td>
                <td>{{ location.lat }}</td>
                <td>{{ location.lng }}</td>
                <td>{{ location.user_id }}</td>
            </tr>
      </body>
  </table>
</template>

<script>
export default {
    name: 'List',
    data() {
        return {
            locations: [],
        }
    },
    methods: {
        async loadData() {
            let response = await fetch("http://127.0.0.1:8000/api/locations")
            this.locations = await response.json()
        }
    },
    mounted() {
        this.loadData()
    }
}
</script>

<style>

</style>