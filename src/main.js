import Vue from "vue";
import App from "./App.vue";
import UserList from "./UserList.vue";
import Chat from "./Chat.vue";
import Login from "./Login.vue";
import vuetify from "./plugins/vuetify";
import Vuex from "vuex";
import firebase from "firebase/app";
import VuexPersistence from "vuex-persist";
import VueRouter from "vue-router";
import Firebase, { auth, firestore } from "./firebase";

Vue.config.productionTip = false;

Vue.use(Firebase);
Vue.use(Vuex);
Vue.use(VueRouter);

var provider = new firebase.auth.GoogleAuthProvider();

const vuexPersist = new VuexPersistence({
  key: `beyond`,
  storage: window.localStorage,
  modules: ["chat"],
});

const users = {
  namespaced: true,
  state: {
    users: [
      {
        name: "Almir",
      },
      {
        name: "Victor",
      },
      {
        name: "Paulo",
      },
    ],
    user: null,
    loginError: null,
  },
  getters: {
    getMessages: (state) => {
      return state.messages;
    },
    getLoginError: (state) => {
      return state.loginError;
    },
    getUser: (state) => {
      return state.user;
    },
  },

  actions: {
    sendMessage({ commit }, message) {
      commit("addMessage", message);
    },
    async createAcc({ commit }, payload) {
      const { email, password } = payload;
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          console.log(res);
          commit("setUser", res.user);
          router.push("/");
        })
        .catch((err) => {
          console.error(err);
          commit("setLoginError", err);
        });
    },
    async login({ commit }, payload) {
      const { email, password } = payload;
      auth.signInWithEmailAndPassword(email, password).then((res) => {
          console.log(res);
          commit("setUser", res.user);
          router.push("/");
        })
        .catch((err) => {
          console.error(err);
          commit("setLoginError", err);
        });
    },
    //eslint-disable-next-line
    async loginGoogle({commit}) {
      auth.signInWithPopup(provider).then((res) => {
        commit("setUser", res.user);
        router.push("/");
        console.log(res.user);
       }).catch((err) => {
        console.error(err);
        commit("setLoginError", err);
      });
    },
    // async logOut() {
    //   //if (user) {
    //     auth.signOut().then(()=>{
    //       // Sign-out successful.
    //     }).catch(function(error) {
    //       console.log(error)
    //       // An error happened.
    //     });
    //   //}
    //   router.push('/login');
    // }
  },

  mutations: {
    addMessage(state, message) {
      state.messages.push(message);
    },
    setUser(state, user) {
      // name = user.displayName;
      // email = user.email;
      // photoUrl = user.photoURL;
      // console.log(name, email, photoUrl);
      state.user = user;
    },
    setLoginError(state, error) {
      state.loginError = error;
      alert("Tente outra vez");
    },
  },
};

const chat = {
  namespaced: true,
  state: {
    messages: [
      { user: "friend", text: "Olá, pode me ajudar?" },
      {
        user: "friend",
        text:
          "Sei que não falo contigo há bastante tempo mas estou escrevendo bastante aqui para termos um exemplo real de mensagem.",
      },
    ],
  },

  getters: {
    getMessages: (state) => {
      return state.messages;
    },
  },

  actions: {
    //eslint-disable-next-line
    async sendMessage({ commit }, message) {
      try {
        await firestore.collection("messages").add(message);
        console.log("foi");
      } catch (err) {
        console.log(err);
      }
    },
  },
  mutations: {
    addMessage(state, message) {
      state.messages.push(message);
    },
  },
};

const store = new Vuex.Store({
  modules: {
    users: users,
    chat: chat,
  },
  plugins: [vuexPersist.plugin],
});

const routes = [
  {
    path: "/",
    component: UserList,
  },
  {
    path: "/chat/:name",
    component: Chat,
  },
  {
    path: "/login",
    component: Login,
  },
];
const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  console.log(to, from, next);
  if (to.fullPath === "/chat/Almir") {
    <v-alert type="warning">This user has a private account :v</v-alert>;
    next("/");
  } else next();
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  created() {
    this.$vuetify.theme.dark = true;
  },
}).$mount("#app");
