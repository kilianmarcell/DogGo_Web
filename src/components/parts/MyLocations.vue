<template>
     <div class="d-grid gap-3 col-3 mx-auto mt-5 mb-5 text-inner">
        <div class="text-decoration-underline fs-2 text-center pb-3">
            Saját helyek kezelése
        </div>
        <div class="container">
            <div class="row mb-2">
                <label class="fs-5 p-0">Hely</label>
                <input v-if="user" type="text"
                    class="fs-5"
                    placeholder="Felhasználónév"
                    :value="user.username">
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
     name: 'UserData',

     computed: {
         ...mapGetters(['user'])
     }
}
</script>

<style>

</style>