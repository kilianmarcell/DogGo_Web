<template>
    <div class="d-grid gap-3 col-3 mx-auto mt-5 text-inner">

        <div class="text-decoration-underline fs-2 text-center pb-3">
            Regisztráció
        </div>

        <input type="text" class="fs-5" v-model="registerUser.username" placeholder="felhasználónév">
        <input type="email" class="fs-5" v-model="registerUser.email" placeholder="email">
        <input type="password" class="fs-5" v-model="registerUser.password" placeholder="jelszó">
        
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

export default {
    name: 'Register',
    data() {
        return {
            registerUser: {
                username: "",
                email: "",
                password: ""
            },

            isLogging: false,
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