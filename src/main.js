import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import VueGeolocation from 'vue-browser-geolocation'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)
Vue.component('fa', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(VueGeolocation)

import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: ''
  },
  installComponents: true
})

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')

import 'bootstrap/dist/js/bootstrap.js'
