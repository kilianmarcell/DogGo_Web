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
            location: {},
            token: "",
            isLogging: false
        }
    },

    methods: {
        async login() {
            await axios
                .post('http://127.0.0.1:8000/api/login', this.data)
                .then(response => (this.token = response.data.token))
                .catch(error => console.log(error))

                let config = {
                    headers: { Authorization: 'Bearer ' + this.token }
                }
                
                axios
                    .get(
                        'http://127.0.0.1:8000/api/user',
                        config
                    )
                    .then(response => (this.location = response))
                    .then(console.log(this.location))
                    .catch(error => console.log(error))

            //axios
            //    .request({
            //      url: '/api/login',
            //      method: 'post',
            //      baseURL: 'http://127.0.0.1:8000',
            //      headers: {
            //          'Authorization': 'Bearer ' + this.token
            //      }
            //    })
            //    .then(response => {
            //      console.log(response.data)
            //    })
        },//

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