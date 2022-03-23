<template>
    <div class="d-grid gap-3 col-3 mx-auto mt-5 mb-5 text-inner">

        <div class="text-decoration-underline fs-2 text-center pb-3">
            Regisztráció
        </div>
        
        <div class="container">
            <div class="row mb-2">
                <label class="fs-5 p-0">Felhasználónév</label>
                <input type="text"
                    class="fs-5"
                    v-model="this.state.registerUser.username"
                    placeholder="Felhasználónév">

                <span class="text-danger text-center" v-if="v$.registerUser.username.$error"> <!--$error = logikai változó-->
                    {{ v$.registerUser.username.$errors[0].$message }} <!--$errors = tömb-->
                </span>
            </div>

            <div class="row mb-2">
                <label class="fs-5 p-0">Email</label>
                <input type="email"
                    class="fs-5"
                    v-model="this.state.registerUser.email"
                    placeholder="Email">

                <span class="text-danger text-center" v-if="v$.registerUser.email.$error">
                    {{ v$.registerUser.email.$errors[0].$message }}
                </span>
            </div>

            <div class="row mb-2">
                <label class="fs-5 p-0">Jelszó</label>
                <input type="password"
                    class="fs-5"
                    v-model="this.state.registerUser.password"
                    placeholder="Jelszó">

                <span class="text-danger text-center" v-if="v$.registerUser.password.$error">
                    {{ v$.registerUser.password.$errors[0].$message }}
                </span>
            </div>
            
            <div class="row">
                <label class="fs-5 p-0">Jelszó ismét</label>
                <input type="password"
                    class="fs-5"
                    v-model="this.state.confirmPassword"
                    placeholder="Jelszó ismét">

                <span class="text-danger text-center" v-if="v$.confirmPassword.$error">
                    {{ v$.confirmPassword.$errors[0].$message }}
                </span>
            </div>
        </div>
        <div class="pt-3">
            <button class="btn btn-primary w-100 fs-5" @click="register">Regisztrálás</button>
        </div>

        <div class="text-end fs-6">
            <router-link :to="{ name: 'Login' }" class="text-primary">Van már fiókom</router-link>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import useVuelidate from "@vuelidate/core"
import { required, minLength, maxLength, email, sameAs, helpers } from "@vuelidate/validators"
import { reactive, computed } from "vue"

export default {
    name: 'Register',

    setup() {
        const state = reactive({
            registerUser: {
                username: "",
                email: "",
                password: ""
            },
            confirmPassword: ""
        })

        const rules = computed(() => {
            return {
                registerUser: {
                    username: {
                        required: helpers.withMessage('A felhasználónév mező kitöltése kötelező!', required),
                        min: helpers.withMessage('A felhasználónévnek legalább 5 karakter hoszzúnak kell lennie!', minLength(5)),
                        max: helpers.withMessage('A felhasználónév legfeljebb 20 karakter hoszzú lehet!', maxLength(20))
                    },

                    email: {
                        email: helpers.withMessage('Csak érvényes email cím írható be!', email),
                        required: helpers.withMessage('Az email mező kitöltése kötelező!', required),
                        max: helpers.withMessage('Az email legfeljebb 255 karakter hoszzú lehet!', maxLength(255))
                    },

                    password: {
                        required: helpers.withMessage('A jelszó mező kitöltése kötelező!', required),
                        min: helpers.withMessage('A jelszónak legalább 8 karakter hoszzúnak kell lennie!', minLength(8))
                    },
                },

                confirmPassword: {
                    required: helpers.withMessage('A mező kitöltése kötelező!', required),
                    same: helpers.withMessage('A mezőnek egyeznie kell a jelszóval!', sameAs(state.registerUser.password))
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
        async register() {
            this.v$.$validate()
            if (!this.v$.$error) {
                await axios
                .post('api/register', this.state.registerUser)
                .catch(error => console.log(error))

                this.$router.push({ name: "Login" })
            }
        }
    }
}
</script>