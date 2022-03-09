<template>
    <div>
        <input type="text" v-model="data.name" placeholder="name">
        <input type="email" v-model="data.email" placeholder="email">
        <input type="password" v-model="data.password" placeholder="password">
        <button @click="register">Register</button>
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
                name: "",
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
            this.data = {
                name: "",
                email: "",
                password: ""
            }
        }
    }
}
</script>

<style>

</style>