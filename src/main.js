import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
//import VueRouter from 'vue-router'

Vue.config.productionTip = false

Vue.use(Vuex)
//Vue.use(VueRouter)

const vuexPersist =  new VuexPersistence({
  key: `beyond`,
  storage: window.localStorage,
  modules: [
    'chat'
  ]
})

const users = {
  namespaced: true,
  state: {
    messages: []
  },
  getters: {
    getMessages: state => {
      return state.messages
    }
  },

  actions: {
    sendMessage({commit}, message){
      commit('addMessage', message)
    }
  },

  mutations: {
    addMessage (state, message) {
      state.messages.push(message)
    }
  }
}

const chat = {
  namespaced: true,
  state: {
    messages: [
      { user: "friend", text: "Olá, pode me ajudar?" },
      { user: "friend", text: "Sei que não falo contigo há bastante tempo mas estou escrevendo bastante aqui para termos um exemplo real de mensagem." }
    ]
  },

  getters: {
    getMessages: state => {
      return state.messages
    }
  },

  actions: {
    sendMessage({commit}, message){
      commit('addMessage', message)
    }
  },
  
  mutations: {
    addMessage (state, message) {
      state.messages.push(message)
    }
  }
}

const store = new Vuex.Store({
  modules: {
    users: users,
    chat: chat
  },
  plugins: [vuexPersist.plugin]

})

//const router = new VueRouter()

new Vue({
  //router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    this.$vuetify.theme.dark = true
  }
}).$mount('#app')

