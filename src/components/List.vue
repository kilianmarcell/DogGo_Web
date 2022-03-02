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
                        <br>
                        <button @click="editLocation(l.id)">Szerkesztés</button>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td><input type="text" v-model="location.name"></td>
                    <td><input type="number" v-model="location.lat"></td>
                    <td><input type="number" v-model="location.lng"></td>
                    <td></td>
                    <td>
                        <button @click="newLocation" :disabled="saving" v-if="!add_new">Hozzáadás</button>
                        <button v-if="add_new" @click="saveLocation">Mentés</button>
                        <br>
                        <button v-if="add_new" @click="cancelLocation">Mégse</button>
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

            location: {
                name: "",
                lat: null,
                lng: null,
                user_id: 1,
            },

            add_new: false,
            saving: false
        }
    },
    
    methods: {
        async loadData() {
            let response = await fetch("http://127.0.0.1:8000/api/locations")
            this.locations = await response.json()
        },
    
        async newLocation() {
            this.saving = 'disabled'

            await fetch('http://127.0.0.1:8000/api/locations', {
                method: 'POST',
                headers: {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
                },
                body: JSON.stringify(this.location)
            })

            await this.loadData()
            
            this.saving = false
            this.resetForm()
        },

        async deleteLocation(id) {
            await fetch(`http://127.0.0.1:8000/api/locations/${id}`, {
                method: 'DELETE'
            }),

            await this.loadData()
        },

        async editLocation(id) {
            this.add_new = true
            let response = await fetch(`http://127.0.0.1:8000/api/locations/${id}`)
            let data = await response.json()
            this.location = {...data}

            /*
            
            this.location = {...data} -> ha a egyik tag változik, a másik is változik "szinkronizálva vannak",
            ugyan az az objektum

            ha simán this.location = data -> akkor a location a data referenciája

            ... -> akkor új objektumot csinál a data-ból
            
            */
        },

        async saveLocation() {
            this.saving = 'disabled'

            await fetch(`http://127.0.0.1:8000/api/locations/${this.location.id}`, {
                method: 'PATCH',
                headers: {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
                },
                body: JSON.stringify(this.location)
            })

            await this.loadData()
            
            this.saving = false
            this.resetForm()
        },

        cancelLocation() {
            this.resetForm()
        },

        resetForm() {
            this.location = {
                name: "",
                lat: null,
                lng: null,
            },

            this.add_new = false
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