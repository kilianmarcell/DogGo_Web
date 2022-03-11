<template>
    <div>
        <input type="text" v-model="data.username" placeholder="username">
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
                username: "",
                password: ""
            },
            user: {},
            token: "",
            isLogging: false
        }
    },

    methods: {
        async login() {
            await axios
                .post('http://127.0.0.1:8000/api/login', this.data)
                .then(response => (this.token = response.data.token))
                .catch(this.token)
                .catch(error => console.log(error))

                axios
                    .request({
                      url: '/api/user',
                      method: 'get',
                      baseURL: 'http://127.0.0.1:8000',
                      headers: {
                          'Authorization': 'Bearer ' + this.token
                      }
                    })
                    .then(response => {
                      console.log(response.data)
                    })
        },

        kiir() {
            console.log(this.token)
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