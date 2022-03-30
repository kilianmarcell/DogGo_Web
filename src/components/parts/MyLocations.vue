<template>
     <div class="d-grid gap-3 col-3 mx-auto mt-5 mb-5 text-inner w-75">
        <div class="text-decoration-underline fs-1 text-center">
            Saját helyek kezelése
        </div>
        <div class="row">
            <div v-for="l in locations" :key="l.id" class="border border-dark col-xl-4 col-md-6 col-12 p-5">
                <div>
                    <p class="fs-2">{{ l.name }}</p>
                    <p class="fs-4">{{ l.lat }}</p>
                    <p class="fs-4">{{ l.lng }}</p>
                    <p class="fs-4">{{ l.description }}</p>
                </div>
                <div>
                    <button class="btn btn-primary fs-5 m-1 w-50" @click="editLocation(l.id)" v-if="!add_new">Szerkesztés</button>
                    <button class="btn btn-danger fs-5 m-1 w-50" @click="deleteLocation(l.id)" v-if="!add_new">Törlés</button>
                </div>
            </div>
            <div class="border border-dark w-100 d-flex flex-column m-auto fs-4">
                <div class="row w-50 m-auto p-2">
                    <p class="w-50">Hely neve:</p>
                    <input v-model="this.state.location.name" class="w-50" type="text">
                    <span class="text-danger text-center" v-if="v$.location.name.$error">
                        {{ v$.location.name.$errors[0].$message }}
                    </span>
                </div>
                <div class="row w-50 m-auto p-2">
                    <p class="w-50">Hely szélessége:</p>
                    <input v-model="this.state.location.lat" class="w-50" type="number">
                    <span class="text-danger text-center" v-if="v$.location.lat.$error">
                        {{ v$.location.lat.$errors[0].$message }}
                    </span>
                </div>
                <div class="row w-50 m-auto p-2">
                    <p class="w-50">Hely hosszúsága:</p>
                    <input v-model="this.state.location.lng" class="w-50" type="number">
                    <span class="text-danger text-center" v-if="v$.location.lng.$error">
                        {{ v$.location.lng.$errors[0].$message }}
                    </span>
                </div>
                <div class="row w-50 m-auto p-2 mb-3">
                    <p class="w-50">Hely leírása:</p>
                    <textarea v-model="this.state.location.description" class="m-auto d-flex justify-content-center w-50" type="text" rows="6" cols="70"/>
                    <span class="text-danger text-center" v-if="v$.location.description.$error">
                        {{ v$.location.description.$errors[0].$message }}
                    </span>
                </div>
                <button class="m-auto btn btn-success w-50 fs-4" @click="newLocation" :disabled="saving" v-if="!add_new">Hely hozzáadása</button>
                <button class="m-auto btn btn-primary w-25 fs-4 mb-2" v-if="add_new" @click="saveLocation">Mentés</button>
                <button class="m-auto btn btn-danger w-25 fs-4" v-if="add_new" @click="cancelLocation">Mégse</button>
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

            add_new: false,
            saving: false
        }
    },

    setup() {
        const state = reactive({
            location: {
                name: "",
                lat: null,
                lng: null,
                description: "",
                allowed: false,
                user_id: null
            },
        })

        const rules = computed(() => {
            return {
                location: {
                    name: {
                        required: helpers.withMessage('A hely neve mező kitöltése kötelező!', required),
                        min: helpers.withMessage('A hely nevének legalább 5 karakter hoszzúnak kell lennie!', minLength(5)),
                        max: helpers.withMessage('A hely neve legfeljebb 40 karakter hoszzú lehet!', maxLength(40))
                    },

                    lat: {
                        required: helpers.withMessage('A szélesség mező kitöltése kötelező!', required),
                    },

                    lng: {
                        required: helpers.withMessage('A hosszúság mező kitöltése kötelező!', required),
                    },

                    description: {
                        max: helpers.withMessage('A leírás legfeljebb 255 karakter hoszzú lehet!', maxLength(255))
                    },
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
        changeUserId() {
            if (this.user != null) {
                this.state.location.user_id = this.user.id
            } else {
                this.$router.push({ name: "Home" })
            }

            this.loadData()
        },

        async loadData() {
            await axios
                .get('api/user_locations/' + this.state.location.user_id)
                .then(response => (this.locations = response.data))
                .catch(error => console.log(error))
        },
    
        async newLocation() {
            this.v$.$validate()
            if (!this.v$.$error) {
                this.saving = true

                await axios
                    .post('api/locations', this.state.location)
                    .catch(error => console.log(error))

                await this.loadData()
                
                this.saving = false
                this.resetForm()
            }
        },

        async deleteLocation(id) {
            await axios
                .delete('api/locations/' + id)
                .catch(error => console.log(error))

            await this.loadData()

            this.resetForm()
        },

        async editLocation(id) {
            this.add_new = true

            await axios
                .get('api/locations/' + id)
                .then(response => this.state.location = response.data)
                .catch(error => console.log(error))
        },

        async saveLocation() {
            this.saving = 'disabled'

            this.v$.$validate()
            if (!this.v$.$error) {
                await axios
                    .put(`api/locations/${this.state.location.id}`, this.state.location)

                await this.loadData()
                this.resetForm()
            }
            this.saving = false
        },

        cancelLocation() {
            this.resetForm()
        },

        resetForm() {
            this.state.location = {
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
        this.changeUserId()
    },

     computed: {
         ...mapGetters(['user'])
     }
}
</script>