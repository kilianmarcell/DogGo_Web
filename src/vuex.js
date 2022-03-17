import { createApp } from 'vue'
import { createStore } from 'vuex'

const store = createStore({
  state () {
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

  mutations: {
       user(state, user) {
            state.user = user
       }
  }
})

const app = createApp({ /* your root component */ })

export default store