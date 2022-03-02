<template>
<div>
    <h1>Helyek</h1>
  <table>
      <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Lat</th>
            <th>Lng</th>
            <th>User id</th>
          </tr>
      </thead>
      <tbody>
            <tr v-for="l in locations" :key="l.id">
                <td>{{ l.id }}</td>
                <td>{{ l.name }}</td>
                <td>{{ l.lat }}</td>
                <td>{{ l.lng }}</td>
                <td>{{ l.user_id }}</td>
                <td>
                    <button @click="deleteLocation(l.id)">Törlés</button>
                </td>
            </tr>
      </tbody>
  </table>
</div>
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
        },

        async deleteLocation(id) {
        await fetch(`http://127.0.0.1:8000/api/locations/${id}`, {
            method: 'DELETE'
        })
        await this.loadData()
        }
    },

    mounted() {
        this.loadData()
    }
}
</script>

<style>
  h1 {
    text-align: center;
  }

  table {
    margin: auto;
    border: 1px solid black;
  }

  th {
    padding: 40px 20px 30px 20px;
    text-align: center;
    font-size: 20pt;
  }

  td {
      text-align: center;
    padding: 20px 100px 20px 100px;
  }

  button {
    width: 100%;
  }
</style>