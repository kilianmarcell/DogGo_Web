<template>
    <div class="d-grid gap-3 col-3 mx-auto mt-5">
        <input type="text" v-model="registerUser.username" placeholder="username">
        <input type="email" v-model="registerUser.email" placeholder="email">
        <input type="password" v-model="registerUser.password" placeholder="password">
        <button class="btn btn-primary" @click="register">Register</button>
        <button class="btn btn-primary" @click="kiir">kiir</button>
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