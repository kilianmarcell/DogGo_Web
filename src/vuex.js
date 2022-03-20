import { createApp } from 'vue'
import { createStore } from 'vuex'

const store = createStore({
  state () { //state-ben tároljuk el az adatokat
    return {
         user: null
    }
  },

  getters: {
       user: (state) => {
            return state.user
       }
  },

  actions: {
       user(context, user) {
            context.commit('user', user)
       }
  },

  mutations: { //a mutation-ben lévő metódusokkal változtatjuk meg az adatokat
               //adatváltoztatás triggereléssel vagy committolással (a folyamat neve dispatch-elés)
       user(state, user) {
            state.user = user
       }
  }
})

export default store