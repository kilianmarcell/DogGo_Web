<template>
    <div id="locs" class="mb-5 text-inner">
        <p class="fs-1 text-center text-decoration-underline text-uppercase">Helyek</p>
        <article class="card bg-dark col-12 col-md-6 col-xl-4 p-5 mb-2 border-0">
            <div class="card-body">
                <p class="fs-1 text-center mb-3"><fa :icon="['fas', 'trophy']"/></p>
                <p class="fs-2 text-center">{{ this.bestRating.name }}</p>
                <p class="fs-2 text-center"><fa :icon="['fas', 'star']"/> {{ this.bestRating.atlag }}</p>
            </div>
        </article>
        <div class="row">
            <article class="card bg-dark col-12 col-md-6 col-xl-4 p-5 border-0" v-for="l in locations" :key="l.id">
                <div class="card-body">
                    <p class="fs-2 mb-3">{{ l.name }}</p>
                    <p class="fs-4 m-1">Hosszúság: <i>{{ l.lat }}</i></p>
                    <p class="fs-4 m-1">Szélesség: <i>{{ l.lng }}</i></p>
                    <p class="fs-4 m-1 mb-3">Leírás: {{ l.description }}</p>
                    <div v-if="this.admin">
                        <button class="btn btn-primary fs-5 m-1 w-50" @click="editLocation(l.id)">Szerkesztés</button>
                        <button class="btn btn-danger fs-5 m-1 w-50" @click="deleteLocation(l.id)">Törlés</button>
                    </div>
                </div>
            </article>
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
</template>

<script>
import { mapGetters } from 'vuex'
import axios from "axios"
import useVuelidate from "@vuelidate/core"
import { required, minLength, maxLength, helpers } from "@vuelidate/validators"
import { reactive, computed } from "vue"

export default {
    name: 'Locations',

    data() {
        return {
            locations: [],
            bestRating: [],

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
                        name: helpers.withMessage('A hely neve mező kitöltése kötelező!', required),
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
                .get('api/locations')
                .then(response => (this.locations = response.data))
                .catch(error => console.log(error))
                
            await axios
                .get('api/best_rating')
                .then(response => (this.bestRating = response.data))
                .catch(error => console.log(error))
        },
    
        async newLocation() {
            this.v$.$validate()
            if (!this.v$.$error) {
                this.saving = true

                await axios
                    .post('api/locations', this.location)
                    .catch(error => console.log(error))

                await this.loadData()
                
                this.saving = false
                this.resetForm()
            }
        },

        async deleteLocation(id) {
            await axios
                .delete(`api/locations/${id}`)
                .catch(error => console.log(error))

            await this.loadData()

            this.resetForm()
        },

        async editLocation(id) {
            this.add_new = true
            let response = await fetch(`api/locations/${id}`)
            this.location = await response.json()
        },

        async saveLocation() {
            this.saving = 'disabled'

            this.v$.$validate()
            if (!this.v$.$error) {
                await axios
                    .put(`api/locations/${this.location.id}`, this.location)

                await this.loadData()
                this.resetForm()
            }
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
                user_id: 1
            },

            this.add_new = false
        }
    },

    mounted() {
        this.loadData()
        if (this.user != null) {
            if (this.user.permission == 2) {
                this.admin = 1
            }
        }
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