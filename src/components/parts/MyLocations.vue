<template>
     <div class="d-grid gap-3 col-3 mx-auto mt-5 mb-5 text-inner w-75">
        <div class="text-decoration-underline fs-2 text-center pb-3">
            Saját helyek kezelése
        </div>
        <div class="row p-5">
            <div v-for="l in locations" :key="l.id" class="border border-dark col-xl-4 col-md-6 col-12 p-5">
                <div>
                    <p class="fs-2">{{ l.name }}</p>
                    <p class="fs-2">{{ l.lat }}</p>
                    <p class="fs-4">{{ l.lng }}</p>
                    <p class="fs-4">{{ l.description }}</p>
                </div>
            </div>
            <div class="border border-dark w-100 mt-5 p-5 d-flex flex-column m-auto fs-3">
                <div class="row w-50 m-auto p-2">
                    <p class="w-50">Hely neve:</p>
                    <input v-model="this.location.name" class="w-50" type="text">
                </div>
                <div class="row w-50 m-auto p-2">
                    <p class="w-50">Hely szélessége:</p>
                    <input v-model="this.location.lat" class="w-50" type="text">
                </div>
                <div class="row w-50 m-auto p-2">
                    <p class="w-50">Hely hosszúsága:</p>
                    <input v-model="this.location.lng" class="w-50" type="text">
                </div>
                <div class="row w-50 m-auto p-2">
                    <p class="w-50">Hely leírása:</p>
                    <input v-model="this.location.description" class="w-50" type="text">
                </div>
                <button class="m-auto btn btn-success w-50 fs-3" @click="newLocation" :disabled="saving" v-if="!add_new">Hely hozzáadása</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from "axios"
import useVuelidate from "@vuelidate/core"
import { required, minLength, maxLength, helpers } from "@vuelidate/validators"
import { reactive, computed } from "vue"

export default {
     name: 'MyLocations',

     data() {
        return {
            locations: [],

            location: {
                name: "",
                lat: null,
                lng: null,
                description: "",
                allowed: false,
                user_id: 4
            },

            add_new: false,
            saving: false
        }
    },

    setup() {
        const state = reactive({
            registeredUser: {
                username: "",
                password: ""
            }
        })

        const rules = computed(() => {
            return {
                registeredUser: {
                    username: {
                        required: helpers.withMessage('A felhasználónév mező kitöltése kötelező!', required),
                        min: helpers.withMessage('A felhasználónévnek legalább 5 karakter hoszzúnak kell lennie!', minLength(5)),
                        max: helpers.withMessage('A felhasználónév legfeljebb 20 karakter hoszzú lehet!', maxLength(20))
                    },

                    password: {
                        required: helpers.withMessage('A jelszó mező kitöltése kötelező!', required),
                        min: helpers.withMessage('A jelszónak legalább 8 karakter hoszzúnak kell lennie!', minLength(8))
                    }
                }
            }
        })

        const v$ = useVuelidate(rules, state)

        return {
            state,
            v$
        }
    },
    
    methods: {
        async loadData() {
            await axios
                .get('api/user_locations/4')
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