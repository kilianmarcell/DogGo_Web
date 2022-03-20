<template>
    <div class="d-grid gap-3 col-3 mx-auto mt-5 text-inner">
        <div class="text-decoration-underline fs-2 text-center pb-3">
            Bejelentkezés
        </div>
        <div class="container">
            <div class="row mb-2">
                <label class="fs-5 p-0">Felhasználónév</label>
                <input type="text"
                    class="fs-5"
                    v-model="this.state.registeredUser.username"
                    placeholder="Felhasználónév">

                <span class="text-danger" v-if="v$.registeredUser.username.$error">
                    {{ v$.registeredUser.username.$errors[0].$message }}
                </span>
            </div>

            <div class="row">
                <label class="fs-5 p-0">Jelszó</label>
                <input type="password"
                    class="fs-5"
                    v-model="this.state.registeredUser.password"
                    placeholder="Jelszó">

                <span class="text-danger" v-if="v$.registeredUser.password.$error">
                    {{ v$.registeredUser.password.$errors[0].$message }}
                </span>
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
import { required, minLength, maxLength } from "@vuelidate/validators"
import { reactive, computed } from "vue"

export default {
    name: 'Login',
    data() {
        return {
            user: {
                id: null,
                email: "",
                username: ""
            },
            token: ""
        }
    },
    
    setup() {
        const state = reactive({
            registeredUser: {
                username: "",
                password: ""
            }
        })

        const rules = computed(() => {
            return {
                registeredUser: {
                    username: { required, min: minLength(5), max: maxLength(20) },
                    password: { required, min: minLength(8) }
                }
            }
        })

        const v$ = useVuelidate(rules, state)

        return {
            state,
            v$
        }
    },

    methods: {
        async login() {
            this.v$.$validate()
            if (!this.v$.$error) {
                await axios
                    .post('api/login', this.state.registeredUser)
                    .then(response => (this.token = response.data.token))
                    .catch(error => console.log(error))

                    localStorage.setItem('token', this.token)
                    this.$store.dispatch('user', this.user)
                    this.$router.push({ name: "Home" })
            }
        }
    }
}
</script>