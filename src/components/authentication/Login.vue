<template>
    <div>
        <input type="email" v-model="data.email" placeholder="email">
        <input type="password" v-model="data.password" placeholder="password">
        <button @click="login">Login</button>
        <button @click="kiir">kiir</button>
    </div>
</template>

<script>
import axios from "axios"

export default {
    name: 'Login',
    data() {
        return {
            data: {
                email: "",
                password: ""
            },

            isLogging: false,
        }
    },

    methods: {
        async login() {
            await axios
                .post('http://127.0.0.1:8000/api/login', this.data)
                .then(response => (this.data = response))
                .catch(error => console.log(error))
        },

        kiir() {
            console.log(this.data)
        },

        reset() {
            this.data = {
                email: "",
                password: ""
            }
        }
    }
}
</script>

<style>

</style>