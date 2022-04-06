<template>
    <div class="d-grid gap-3 col-3 mx-auto mt-5 mb-5 text-inner">
        <div class="text-decoration-underline fs-2 text-center pb-3">
            Bejelentkezés
        </div>
        <div class="container">
            <div class="row mb-2">
                <label class="fs-5 p-0">Felhasználónév</label>
                <input type="text"
                    class="fs-5"
                    v-model="this.registeredUser.username"
                    placeholder="Felhasználónév">
            </div>

            <div class="row">
                <label class="fs-5 p-0">Jelszó</label>
                <input type="password"
                    class="fs-5"
                    v-model="this.registeredUser.password"
                    placeholder="Jelszó">
            </div>
        </div>
        <div class="pt-3">
            <button class="btn btn-primary w-100 fs-5" @click="login">Bejelentkezés</button>
        </div>

        <div v-if="this.error" class="alert alert-danger d-flex align-items-center">
            {{ this.errorMessage }}
        </div>

        <div class="text-end fs-6">
            <router-link :to="{ name: 'Register' }" class="text-primary">Nincs még fiókom</router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    name: 'Login',
    
    data() {
        return {
            registeredUser: {
                username: "",
                password: ""
            },
            token: "",
            error: false,
            errorMessage: ""
        }
    },

    methods: {
        async login() {
            await axios
                .post('api/login', this.registeredUser)
                .then(response => this.token = response.data.token)
                .then(this.error = false)
                .catch(error => {
                    console.log(error.status)
                    if (error.response.status == 401) {
                        this.error = true
                        this.errorMessage = "Helytelen felhasználónév vagy jelszó!"
                    }
                })

            if (!this.error) {
                await localStorage.setItem('token', this.token)
                this.$router.go()
            }
        }
    },

    mounted() {
        if (localStorage.getItem('token') != null) {
            this.$router.push({ name: 'Home' })
        }
    },

    computed: {
        ...mapGetters(['user'])
    }
}
</script>