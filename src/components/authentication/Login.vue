<template>
    <div class="d-grid gap-3 col-3 mx-auto mt-5">
        <input type="text" v-model="user.username" placeholder="username">
        <input type="password" v-model="user.password" placeholder="password">
        <button class="btn btn-primary" @click="login">Login</button>
        <button class="btn btn-primary" @click="kiir">kiir</button>
    </div>
</template>

<script>
import axios from "axios"

export default {
    name: 'Login',
    data() {
        return {
            user: {
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
                .then(response => (this.token = response.user.token))
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
            this.user = {
                email: "",
                password: ""
            }
        }
    }
}
</script>

<style>

</style>