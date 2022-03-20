<template>
    <div class="d-grid gap-3 col-3 mx-auto mt-5 text-inner">

        <div class="text-decoration-underline fs-2 text-center pb-3">
            Regisztráció
        </div>
        
        <div class="container">
            <div class="row mb-2">
                <label class="fs-5 p-0">Felhasználónév</label>
                <input type="text" class="fs-5" v-model="state.registerUser.username" placeholder="Felhasználónév">
                <span v-if="v$.email.error">
                    {{ v$.email.$errors[0].$message }}
                </span>
            </div>

            <div class="row mb-2">
                <label class="fs-5 p-0">Email</label>
                <input type="email" class="fs-5" v-model="this.state.registerUser.email" placeholder="Email">
            </div>

            <div class="row mb-2">
                <label class="fs-5 p-0">Jelszó</label>
                <input type="password" class="fs-5" v-model="this.state.registerUser.password" placeholder="Jelszó">
            </div>
            
            <div class="row">
                <label class="fs-5 p-0">Jelszó ismét</label>
                <input type="password" class="fs-5" v-model="this.state.confirmPassword" placeholder="Jelszó ismét">
            </div>
        </div>
        <div class="pt-3">
            <button class="btn btn-primary w-100 fs-5" @click="register">Regisztrálás</button>
        </div>

        <div class="text-end fs-6">
            <router-link to="/login" class="text-primary">Van már fiókom</router-link>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import useVuelidate from "@vuelidate/core"
import { required, minLength, maxLength, email, sameAs } from "@vuelidate/validators"
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
                    username: { required, minLength: minLength(5), maxLength: maxLength(20) },
                    email: { required, email, maxLength: maxLength(255) },
                    password: { required, minLength: minLength(8) }
                },
                confirmPassword: { required, sameAs: sameAs(state.registerUser.password) }
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
            await axios
                .post('api/register', this.registerUser)
                .then(response => (this.registerUser = response))
                .then(console.log(this.registerUser))
                .catch(error => console.log(error))

                this.$router.push({
                    name: "Login"
                })
        },

        kiir() {
            console.log(this.registerUser)
        },

        reset() {
            this.registerUser = {
                username: "",
                email: "",
                password: ""
            }
        }
    }
}
</script>

<style>

</style>