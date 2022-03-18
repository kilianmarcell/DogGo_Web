<template>
     <div>
          <nav id="navbar" class="navbar navbar-expand-lg navbar-dark">
               <div class="container-fluid mx-5">
                    <div class="md-auto d-flex align-items-center">
                         <img src="../../assets/DogGoLogo.png" id="logo" class="img-fluid rounded" alt="DogGo logo">
                         <router-link to="/" class="nav-link navbar-brand fs-1">DogGo</router-link>
                    </div>

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                         <span class="navbar-toggler-icon"></span>
                    </button>
                    
                    <div class="collapse navbar-collapse text-center" id="navbarSupportedContent">
                         <ul class="navbar-nav ms-auto mb-2 mb-lg-0 fs-4">
                              <li class="nav-item">
                                   <router-link to="/" class="nav-link"><fa :icon="['fas', 'home']"/></router-link>
                              </li>
                              <li class="nav-item">
                                   <a class="nav-link" href="https://github.com/kilianmarcell/DogGo_Web"><fa :icon="['fas', 'code']"/></a>
                              </li>
                              <li class="nav-item">
                                   <router-link to="/info" class="nav-link"><fa :icon="['fas', 'question']"/></router-link>
                              </li>
                              <li v-if="!user" class="nav-item">
                                   <router-link to="/register" class="nav-link"><fa :icon="['fas', 'sign-in']"/></router-link>
                              </li>
                              <li v-if="user" class="nav-item dropdown">
                                   <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {{ user.username }} <fa :icon="['fas', 'user']"/>
                                   </a>
                                   <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a class="dropdown-item" href="#">Adatok módosíása</a></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><a @click="signOut" class="dropdown-item" href="#">Kijelentkezés</a></li>
                                   </ul>
                              </li>
                              <li class="nav-item">
                                   <a class="nav-link" href="#"></a>
                              </li>
                              <li v-if="user" class="nav-item">
                                   
                              </li>
                              
                         </ul>
                    </div>
               </div>
          </nav>
     </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
     name: 'Header',

     methods: {
          signOut() {
               localStorage.removeItem('token')
               this.$store.dispatch('user', null)
               this.$router.push({ name: "Home" })
          }
     },

     computed: {
          ...mapGetters(['user'])
     }
}
</script>

<style>
     #navbar {
          background: #222629;
     }

     #logo {
          width: 80px;
     }
</style>