<template>
    <div class="d-grid gap-3 col-3 mx-auto mt-5">
        <input type="text" v-model="user.username" placeholder="username">
        <input type="email" v-model="user.email" placeholder="email">
        <input type="password" v-model="user.password" placeholder="password">
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
            user: {
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
                .post('http://127.0.0.1:8000/api/register', this.data)
                .then(response => (this.data = response))
                .then(console.log(this.data))
                .catch(error => console.log(error))
        },

        kiir() {
            console.log(this.data)
        },

        reset() {
            this.user = {
                username: "",
                email: "",
                password: ""
            }
        }
    }
}
</script>

<style>
    .btn {
        
    }
</style>