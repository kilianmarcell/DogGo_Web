<template>
    <div class="d-grid gap-3 col-3 mx-auto mt-5 text-inner">
        <div class="text-decoration-underline fs-2 text-center pb-3">
            Bejelentkezés
        </div>

        <input type="text" class="fs-5" v-model="data.username" placeholder="felhasználónév">
        <input type="password" class="fs-5" v-model="data.password" placeholder="jelszó">

        <div class="pt-3">
            <button class="btn btn-primary w-100 fs-5" @click="login">Bejelentkezés</button>
        </div>

        <div class="text-end fs-6">
            <router-link to="/register" class="text-primary">Nincs még fiókom</router-link>
        </div>
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
            user: {
                id: null,
                email: "",
                username: ""
            },
            token: "",
            isLogging: false
        }
    },

    methods: {
        async login() {
            await axios
                .post('api/login', this.data)
                .then(response => (this.token = response.data.token))
                .catch(error => console.log(error))

                axios
                    .request({
                      url: 'api/user',
                      method: 'get',
                      headers: {
                          'Authorization': 'Bearer ' + this.token
                      }
                    })
                    .then(response => {
                      this.user = response.data
                      console.log(this.user)
                    })

                    localStorage.setItem('token', this.token)

                    this.$router.push({
                        name: "Home"
                    })
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