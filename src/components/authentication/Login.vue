<template>
    <div class="d-grid gap-3 col-3 mx-auto mt-5 mb-5 text-inner">
        <div class="text-decoration-underline fs-2 text-center pb-3">
            Bejelentkezés
        </div>
        <div class="container">
            <div class="row mb-2">
                <label class="fs-5 p-0">Felhasználónév</label>
                <input type="text"
                    class="fs-5"
                    v-model="this.state.registeredUser.username"
                    placeholder="Felhasználónév">

                <span class="text-danger text-center" v-if="v$.registeredUser.username.$error">
                    {{ v$.registeredUser.username.$errors[0].$message }}
                </span>
            </div>

            <div class="row">
                <label class="fs-5 p-0">Jelszó</label>
                <input type="password"
                    class="fs-5"
                    v-model="this.state.registeredUser.password"
                    placeholder="Jelszó">

                <span class="text-danger text-center" v-if="v$.registeredUser.password.$error">
                    {{ v$.registeredUser.password.$errors[0].$message }}
                </span>
            </div>
        </div>
        <div class="pt-3">
            <button class="btn btn-primary w-100 fs-5" @click="login">Bejelentkezés</button>
        </div>

        <div v-if="this.error" class="alert alert-danger d-flex align-items-center">
            {{ this.errorMessage }}
        </div>

        <div class="text-end fs-6">
            <router-link :to="{ name: 'Register' }" class="text-primary">Nincs még fiókom</router-link>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import useVuelidate from "@vuelidate/core"
import { required, minLength, maxLength, helpers } from "@vuelidate/validators"
import { reactive, computed } from "vue"

export default {
    name: 'Login',
    data() {
        return {
            user: {
                id: null,
                email: "",
                username: ""
            },
            token: "",
            error: false,
            errorMessage: ""
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
        async login() {
            this.v$.$validate()
            if (!this.v$.$error) {
                await axios
                    .post('api/login', this.state.registeredUser)
                    .then(response => (this.token = response.data.token))
                    .then(this.error = false)
                    .catch(error => {
                        if (error.response.status == 401) {
                            this.error = true
                            this.errorMessage = "Helytelen felhasználónév vagy jelszó!"
                        }
                    })
                    if (!this.error) {
                        await localStorage.setItem('token', this.token)

                        let response = await axios
                            .request({ url: 'api/user', method: 'get' })
                                
                        this.$store.dispatch('user', response.data)
                        this.$router.push({ name: "Home" })
                    }
            }
        }
    }
}
</script>