<template>
    <div class="d-grid gap-3 col-3 mx-auto mt-5 text-inner">
        <div class="text-decoration-underline fs-2 text-center pb-3">
            Bejelentkezés
        </div>
        <div class="container">
            <div class="row mb-2">
                <label class="fs-5 p-0">Felhasználónév</label>
                <input type="text" class="fs-5" placeholder="Felhasználónév">
            </div>

            <div class="row">
                <label class="fs-5 p-0">Jelszó</label>
                <input type="password"
                    class="fs-5"
                    placeholder="Jelszó">
            </div>
        </div>
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
import useVuelidate from "@vuelidate/core"
import { required, minLength } from "@vuelidate/validators"

export default {
    name: 'Login',
    data() {
        return {
            v$: useVuelidate(),
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

    validations() {
        return {
            form: {
                username: { 
                    required, name_validation: {
                        $validator: validUsername,
                        $message: 'Invalid Name. Valid name only contain letters, dashes (-) and spaces'
                    } 
                },
                email: { required, email },
                password: { required, min: minLength(8) },
            },
        }
    },

    methods: {
        async login() {
            await axios
                .post('api/login', this.data)
                .then(response => (this.token = response.data.token))
                .catch(error => console.log(error))

                localStorage.setItem('token', this.token)
                this.$store.dispatch('user', this.user)
                this.$router.push({ name: "Home" })
        }
    }
}
</script>

<style>

</style>