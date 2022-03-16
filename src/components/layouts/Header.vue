<template>
     <div>
          <nav id="navbar" class="navbar navbar-expand-lg navbar-dark ">
               <div class="container-fluid mx-5">
                    <div class="md-auto d-flex align-items-center">
                         <img src="../../assets/DogGoLogo.png" id="logo" class="img-fluid rounded" alt="DogGo logo">
                         <a class="navbar-brand fs-1" href="">DogGo</a>
                    </div>

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                         <span class="navbar-toggler-icon"></span>
                    </button>
                    
                    <div class="collapse navbar-collapse text-center" id="navbarSupportedContent">
                         <ul class="navbar-nav ms-auto mb-2 mb-lg-0 fs-4">
                              <li class="nav-item">
                                   <a class="nav-link active" aria-current="page" href="#"><fa :icon="['fas', 'home']"/></a>
                              </li>
                              <li class="nav-item">
                                   <a class="nav-link" href="#"><fa :icon="['fas', 'share-alt']"/></a>
                              </li>
                              <li class="nav-item">
                                   <a class="nav-link" href="https://github.com/kilianmarcell/DogGo_Web"><fa :icon="['fas', 'code']"/></a>
                              </li>
                              <li class="nav-item">
                                   <a class="nav-link" href="#"><fa :icon="['fas', 'envelope']"/></a>
                              </li>
                              <li v-if="!isLoggedIn" class="nav-item">
                                   <router-link to="/login" class="nav-link"><fa :icon="['fas', 'sign-in']"/></router-link>
                              </li>
                              <li v-if="isLoggedIn" class="nav-item">
                                   <a class="nav-link" href="#"><fa :icon="['fas', 'user']"/></a>
                              </li>
                              
                         </ul>
                    </div>
               </div>
          </nav>
     </div>
</template>

<script>
export default {
     name: 'Header',

     data() {
          return {
               isLoggedIn: false
          }
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