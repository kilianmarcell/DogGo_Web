<template>
     <div class="d-grid gap-3 col-3 mx-auto mt-5 mb-5 text-inner">
        <div class="text-decoration-underline fs-2 text-center pb-3">
            Saját helyek kezelése
        </div>
        <table>
            <thead>
                <tr>
                    <th>Név</th>
                    <th>Szélesség</th>
                    <th>Hosszúság</th>
                    <th>Leírás</th>
                </tr>
            </thead>
            <tbody class="fs-5">
                    <tr v-for="l in locations" :key="l.id">
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
                            <input type="text fs-5" v-model="location.name">
                        </td>
                        <td>
                            <input type="number fs-5" v-model="location.lat">
                        </td>
                        <td>
                            <input type="number fs-5" v-model="location.lng">
                        </td>
                        <td>
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
     name: 'UserData',

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

            add_new: false,
            saving: false
        }
    },
    
    methods: {
        async loadData() {
            await axios
                .get('http://127.0.0.1:8000/api/user_locations/' + this.user.id)
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
                user_id: this.user.id
            },

            this.add_new = false
        }
    },

    mounted() {
        this.loadData()
    },

     computed: {
         ...mapGetters(['user'])
     }
}
</script>

<style>

</style>