<template>
     <div class="d-grid gap-3 col-3 mx-auto mt-5 mb-5 text-inner w-25">
        <div class="text-decoration-underline fs-2 text-center pb-3">
            Adataim módosítása
        </div>
        <div class="container">
            <div class="row mb-2">
                <label class="fs-5 p-0">Felhasználónév</label>
                <input v-if="user"
                    type="text"
                    class="fs-5"
                    placeholder="Felhasználónév"
                    v-model="this.state.modifyUser.username">

                <span class="text-danger text-center" v-if="v$.modifyUser.username.$error">
                    {{ v$.modifyUser.username.$errors[0].$message }}
                </span>
            </div>
            <div class="row mb-2">
                <label class="fs-5 p-0">Email</label>
                <input v-if="user"
                    type="text"
                    class="fs-5"
                    placeholder="Email"
                    v-model="this.state.modifyUser.email">

                <span class="text-danger text-center" v-if="v$.modifyUser.email.$error">
                    {{ v$.modifyUser.email.$errors[0].$message }}
                </span>
            </div>
        </div>
        
        <div class="pt-3">
            <button class="btn btn-primary w-100 fs-5" @click="change">Módosítás</button>
        </div>
        <div v-if="this.error" class="alert alert-danger d-flex align-items-center">
            {{ this.errorMessage }}
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength, email, helpers } from '@vuelidate/validators'
import { reactive, computed } from 'vue'

export default {
    name: 'UserData',

    data() {
        return {
            error: false,
            errorMessage: ""
        }
    },
    
    setup() {
        const state = reactive({
            modifyUser: {
                username: "",
                email: ""
            }
        })

        const rules = computed(() => {
            return {
                modifyUser: {
                    username: {
                        required: helpers.withMessage('A felhasználónév mező kitöltése kötelező!', required),
                        min: helpers.withMessage('A felhasználónévnek legalább 5 karakter hoszzúnak kell lennie!', minLength(5)),
                        max: helpers.withMessage('A felhasználónév legfeljebb 20 karakter hoszzú lehet!', maxLength(20))
                    },

                    email: {
                        email: helpers.withMessage('Csak érvényes email cím írható be!', email),
                        required: helpers.withMessage('Az email mező kitöltése kötelező!', required),
                        max: helpers.withMessage('Az email legfeljebb 255 karakter hoszzú lehet!', maxLength(255))
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
        async change() {
            this.v$.$validate()
            if (!this.v$.$error) {
                await axios
                    .put('api/users/' + this.user.id, this.state.modifyUser)
                    .then(this.error = false)
                    .catch(error => {
                        if (error.response.status == 422) {
                            this.errorMessage = "Ilyen felhasználó már létezik!"
                            this.error = true
                        }
                    })

                if (!this.error) {
                    await axios
                        .request({ url: 'api/user', method: 'get' })
                        .then(response => this.$store.dispatch('user', response.data))
                        
                    this.$router.go(-1)
                }
            }
        },

        loadUserDatas() {
            if (this.user == null) {
                this.$router.push({ name: "Home" })
            } else {
                this.state.modifyUser.username = this.user.username
                this.state.modifyUser.email = this.user.email
            }
        }
    },

    mounted() {
        this.loadUserDatas()
    },

    computed: {
        ...mapGetters(['user'])
    }
}
</script>