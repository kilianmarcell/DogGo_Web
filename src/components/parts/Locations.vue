<template>
    <div id="locs" class="text-inner mb-5">
        <article class="card bg-dark pb-5 mb-2 border-0">
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
                    <p class="fs-4 m-1 mb-2">Leírás: {{ l.description }}</p>
                    <p class="fs-4 m-1 mb-4" v-if="l.atlag != null"><fa :icon="['fas', 'star']"/> {{ l.atlag }}</p>
                    <button class="btn btn-primary fs-5 m-1 w-100" @click="checkLocationRating(l.id)">Értékelések megtekintése</button>
                    <div v-if="this.admin">
                        <button class="btn btn-primary fs-5 m-1 w-100 mt-4" @click="editLocation(l.id)">Hely szerkesztése</button>
                        <button class="btn btn-danger fs-5 m-1 w-100" @click="deleteLocation(l.id)">Hely törlése</button>
                    </div>
                </div>
            </article>
        </div>
        <div v-if="editing" class="border border-dark w-100 d-flex flex-column m-auto fs-4">
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
            <div class="row d-flex justify-content-center">
                <button class="m-2 btn btn-danger w-25 fs-5" v-if="editing" @click="cancelLocation">Mégse</button>
                <button class="m-2 btn btn-primary w-25 fs-5" v-if="editing" @click="saveLocation">Mentés</button>
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
    name: 'Locations',

    data() {
        return {
            locations: [],
            bestRating: [],

            editing: false,
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

            let response = await axios
                .get('api/locations_avgrating')
                
            let i = 0
            while (i < response.data.length) {
                this.locations[response.data[i].id - 1].atlag = response.data[i].atlag
                i++
            }
        },

        async checkLocationRating(id) {
            this.$router.push({ name: 'RatingsPage', params: { ratingId: id }})
        },

        async deleteLocation(id) {
            await axios
                .delete('api/locations/' + id)
                .catch(error => console.log(error))

            await this.loadData()
            this.resetForm()
        },

        async editLocation(id) {
            this.editing = true

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
                    .put('api/locations/' + this.state.location.id, this.state.location)

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
                allowed: false
            },

            this.editing = false
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