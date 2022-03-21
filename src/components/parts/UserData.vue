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
                    v-model="this.state.registeredUser.username"
                    placeholder="Felhasználónév">

                <span class="text-danger text-center" v-if="v$.registeredUser.username.$error">
                    {{ v$.registeredUser.username.$errors[0].$message }}
                </span>
            </div>

            <div class="row">
                <label class="fs-5 p-0">Jelszó</label>
                <input type="password"
                    class="fs-5"
                    v-model="this.state.registeredUser.password"
                    placeholder="Jelszó">

                <span class="text-danger text-center" v-if="v$.registeredUser.password.$error">
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
export default {
     name: 'UserData'
}
</script>

<style>

</style>