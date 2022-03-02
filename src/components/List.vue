<template>
<div>
    <h1>Helyek</h1>
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
      <tbody>
            <tr v-for="l in locations" :key="l.id">
                <td>{{ l.id }}</td>
                <td>{{ l.name }}</td>
                <td>{{ l.lat }}</td>
                <td>{{ l.lng }}</td>
                <td>{{ l.user_id }}</td>
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
  }
  td {
    padding: 20px 20px 20px 20px;
  }
  button {
    width: 100%;
  }
</style>