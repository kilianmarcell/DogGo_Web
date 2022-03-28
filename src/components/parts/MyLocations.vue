<template>
     <div class="d-grid gap-3 col-3 mx-auto mt-5 mb-5 text-inner w-75">
        <div class="text-decoration-underline fs-2 text-center pb-3">
            Saját helyek kezelése
        </div>
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
                .get('api/user_locations/1')
                .then(response => (this.locations = response.data))
                .catch(error => console.log(error))
        },
    
        async newLocation() {
            if (!this.validation()) {

                this.saving = true

                await axios
                    .post('api/user_locations', this.location)
                    .catch(error => console.log(error))

                await this.loadData()
                
                this.saving = false
                this.resetForm()
            }
        },

        async deleteLocation(id) {
            await axios
                .delete(`api/user_locations/${id}`)
                .catch(error => console.log(error))

            await this.loadData()

            this.resetForm()
        },

        async editLocation(id) {
            this.add_new = true
            let response = await fetch(`api/user_locations/${id}`)
            this.location = await response.json()
        },

        async saveLocation() {
            this.saving = 'disabled'

            await axios
                .put(`api/user_locations/${this.location.id}`, this.location)

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