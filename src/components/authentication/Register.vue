<template>
    <div class="d-grid gap-3 col-3 mx-auto mt-5 text-inner">

        <div class="text-decoration-underline fs-3 text-center pb-3">
            Regisztráció
        </div>

        <input type="text" v-model="registerUser.username" placeholder="username">
        <input type="email" v-model="registerUser.email" placeholder="email">
        <input type="password" v-model="registerUser.password" placeholder="password">
        
        <div>
            <router-link to="/" class="btn btn-primary w-50">Vissza</router-link>
            <button class="btn btn-primary w-50" @click="login">Regisztrálás</button>
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
                .post('http://127.0.0.1:8000/api/register', this.registerUser)
                .then(response => (this.registerUser = response))
                .then(console.log(this.registerUser))
                .catch(error => console.log(error))

            this.reset()
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