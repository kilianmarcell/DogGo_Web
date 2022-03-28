<template>
    <div id="locs" class="mb-5 text-inner">
        <p class="fs-1 text-center text-decoration-underline text-uppercase">Helyek</p>
    <table>
        <thead>
            <tr>
                <th v-if="this.admin">Azonosító</th>
                <th>Név</th>
                <th>Szélesség</th>
                <th>Hosszúság</th>
                <th>Leírás</th>
            </tr>
        </thead>
        <tbody class="fs-5">
                <tr v-for="l in locations" :key="l.id">
                    <td v-if="this.admin">{{ l.id }}</td>
                    <td>{{ l.name }}</td>
                    <td>{{ l.lat }}</td>
                    <td>{{ l.lng }}</td>
                    <td>{{ l.description }}</td>
                    <td v-if="user">
                        <button class="btn btn-danger fs-5" @click="deleteLocation(l.id)">Törlés</button>
                        <br>
                        <button class="btn btn-primary fs-5" @click="editLocation(l.id)">Szerkesztés</button>
                    </td>
                </tr>
                <tr v-if="user">
                    <td></td>
                    <td>
                        <span :class="{hidden: this.validations.name}">A név mező kitöltése kötelező, a név legalább 5 karakter legyen!</span><br>
                        <input type="text fs-5" v-model="location.name">
                    </td>
                    <td>
                        <span :class="{hidden: this.validations.lat}">A lat mező kitöltése kötelező!</span><br>
                        <input type="number fs-5" v-model="location.lat">
                    </td>
                    <td>
                        <span :class="{hidden: this.validations.lng}">A lng mező kitöltése kötelező!</span><br>
                        <input type="number fs-5" v-model="location.lng">
                    </td>
                    <td>
                        <span :class="{hidden: this.validations.description}">A description mező kitöltése kötelező!</span><br>
                        <input type="text" v-model="location.description"></td>
                    <td>
                        <button class="btn btn-success" @click="newLocation" :disabled="saving" v-if="!add_new">Hozzáadás</button>
                        <button class="btn btn-primary" v-if="add_new" @click="saveLocation">Mentés</button>
                        <br>
                        <button class="btn btn-danger" v-if="add_new" @click="cancelLocation">Mégse</button>
                    </td>
                </tr>
        </tbody>
    </table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from "axios"

export default {
    name: 'Locations',

    data() {
        return {
            locations: [],

            location: {
                name: "",
                lat: null,
                lng: null,
                description: "",
                allowed: false,
                user_id: 1
            },

            validations: {
                name: true,
                lat: true,
                lng: true,
                description: true,
            },

            add_new: false,
            saving: false,
            admin: 0
        }
    },
    
    methods: {
        async loadData() {
            await axios
                .get('http://127.0.0.1:8000/api/locations')
                .then(response => (this.locations = response.data))
                .catch(error => console.log(error))
        },
    
        async newLocation() {
            if (!this.validation()) {

                this.saving = true

                await axios
                    .post('http://127.0.0.1:8000/api/locations', this.location)
                    .catch(error => console.log(error))

                await this.loadData()
                
                this.saving = false
                this.resetForm()
            }
        },

        async deleteLocation(id) {
            await axios
                .delete(`http://127.0.0.1:8000/api/locations/${id}`)
                .catch(error => console.log(error))

            await this.loadData()

            this.resetForm()
        },

        async editLocation(id) {
            this.add_new = true
            let response = await fetch(`http://127.0.0.1:8000/api/locations/${id}`)
            this.location = await response.json()
        },

        async saveLocation() {
            this.saving = 'disabled'

            await axios
                .put(`http://127.0.0.1:8000/api/locations/${this.location.id}`, this.location)

            await this.loadData()
            this.resetForm()
            this.saving = false
        },

        cancelLocation() {
            this.resetForm()
        },

        resetForm() {
            this.location = {
                name: "",
                lat: null,
                lng: null,
                description: "",
                allowed: false,
                user_id: 16
            },

            this.add_new = false
        },

        validation() {
            let error = false
            
            if (this.location.name === "" || this.location.name.length < 5) {
                this.validations.name = false
                error = true
            } else {
                this.validations.name = true
            }
            
            if (this.location.lat === null || this.location.lat === "") {
                this.validations.lat = false
                error = true
            } else {
                this.validations.lat = true
            }
            
            if (this.location.lng === null || this.location.lng === "") {
                this.validations.lng = false
                error = true
            } else {
                this.validations.lng = true
            }

            if (this.location.description === null || this.location.description === "") {
                this.validations.description = false
                error = true
            } else {
                this.validations.description = true
            }

            return error
        }
    },

    mounted() {
        if (this.user != null ) {
            admin = 1
            console.log(this.user)
        }

        this.loadData()
    },

     computed: {
          ...mapGetters(['user'])
     }
}
</script>

<style>
    #locs {
        width: 90%;
    }

    h1 {
        text-align: center;
    }

    table {
        width: 95%;
        margin: auto;
        border: 1px solid black;
    }

    thead {
        text-align: center;
        font-size: 20pt;
    }

    th {
        padding: 10px 5px 10px 5px;
    }

    td {
        text-align: center;
        padding: 10px 5px 10px 5px;
    }

    button {
        width: 100%;
    }

    .hidden {
        display: none;
    }
</style>