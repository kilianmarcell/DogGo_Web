<template>
     <div>
          <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
               <div class="container-fluid">
                    <a class="navbar-brand fs-1 ms-3" href="">DogGo</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                         <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse text-center" id="navbarSupportedContent">
                         <ul class="navbar-nav me-3 ms-auto mb-2 mb-lg-0">
                              <li class="nav-item fs-4">
                                   <a class="nav-link active" aria-current="page" href="#"><fa :icon="['fas', 'home']"/></a>
                              </li>
                              <li class="nav-item fs-4">
                                   <a class="nav-link" href="#"><fa :icon="['fas', 'share-alt']"/></a>
                              </li>
                              <li class="nav-item fs-4">
                                   <a class="nav-link" href="https://github.com/kilianmarcell/DogGo_Web"><fa :icon="['fas', 'code']"/></a>
                              </li>
                              <li class="nav-item fs-4">
                                   <a class="nav-link" href="#"><fa :icon="['fas', 'envelope']"/></a>
                              </li>
                              <li class="nav-item fs-4">
                                   <a class="nav-link" href="#"><fa :icon="['fas', 'cog']"/></a>
                              </li>
                              <li class="nav-item fs-4">
                                   <a class="nav-link" href="#"><fa :icon="['fas', 'sign-in-alt']"/></a>
                              </li>
                         </ul>
                    </div>
               </div>
          </nav>
     </div>
</template>

<script>
export default {
     name: 'Header'
}
</script>

<style>

</style>