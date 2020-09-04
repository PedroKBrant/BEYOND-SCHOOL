<template>
  <v-main>
    <v-card class="mx-auto overflow-hidden" height="260">
      <v-app-bar dark hide-on-scroll>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-toolbar-title>BeyondBook</v-toolbar-title>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group active-class="deep-purple--text text--accent-4">
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="deep-purple accent-4">mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title @click="$router.push('/')"
                >Home</v-list-item-title
              >
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="deep-purple accent-4">mdi-pencil</v-icon>
              </v-list-item-icon>
              <v-list-item-title @click="createPost = true"
                >Post</v-list-item-title
              >
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="deep-purple accent-4">mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>User</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="deep-purple accent-4">mdi-login-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-title @click="$router.push('/login')"
                >Logout</v-list-item-title
              >
            </v-list-item>

            <v-list-item>
              <v-checkbox
                v-model="$vuetify.theme.dark"
                primary
                label="Dark"
              ></v-checkbox>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <v-dialog v-model="createPost">
          <v-card>
            <v-col>
              <v-text-field
                label="Say something cool"
                v-model="field"
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-btn color="deep-purple accent-4" @click="send()">Post</v-btn>
            </v-col>
          </v-card>
        </v-dialog>
      </v-navigation-drawer>
    </v-card>

    <!-- <v-app-bar fixed>

        <v-btn @click="$router.push('/')"  x-large icon color="deep-purple accent-4">
          <v-icon>mdi-home-outline</v-icon>
        </v-btn>

        <v-btn @click='eraseAll()' x-large icon color="deep-purple accent-4">
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>

        <v-switch v-model="$vuetify.theme.dark" primary label="Dark"></v-switch>
        <v-spacer></v-spacer>
        <v-toolbar-title> BeyondBook</v-toolbar-title>
       
        <v-text-field v-model='field' @keyup.enter='send()' solo label="Poste aqui..." hide-details></v-text-field>
        <v-btn @click='send()' icon color="deep-purple accent-4">
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </v-app-bar>
      <v-spacer></v-spacer> -->

    <div class="messages-container">
      <div v-for="(message, i) in messages" :key="i">
        <MessageCard
          :messageProp="message"
          :idProp="i"
          @erase-me="erase(i)"
          @edit-me="edit(i)"
        />
      </div>
    </div>
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";
import MessageCard from "./components/MessageCard.vue";
import { firestore } from "./firebase";

export default {
  name: "App",
  components: {
    MessageCard,
  },
  data: () => ({
    createPost: false,
    drawer: false,
    field: "",
    messages: [],
  }),

  methods: {
    send() {
      let message = {
        user: this.getUser.email,
        text: this.field,
        //file: this.file
      };
      console.log(message.user);
      this.$store.dispatch("chat/sendMessage", message);
      //this.file = null;
      this.field = "";
    },

    erase(index) {
      if (this.messages[index].user === "me") {
        this.messages.splice(index, 1);
        console.log("Kill me");
      } else console.log("You have no power here");
    },

    eraseAll() {
      if (confirm("Tem certeza que deseja apagar tudo?")) {
        this.messages = []; //.splice(0,this.messages.length)
        console.log("Kill then all");
        //while(this.messages.length)
        //  this.messages.pop()
      }
    },

    edit(index) {
      //adicionar a key para apagar ume mensagem específica
      if (this.messages[index].user === "me")
        this.messages[index].text = this.field;
      else console.log("You have no power here");
      this.field = "";
    },
  },
  computed: {
    ...mapGetters("users", ["getUser"]),
  },
  created() {
    firestore
      .collection("messages")
      .where("user", "==", this.getUser.email)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.messages.push(doc.data());
        });
      });
  },
};
</script>

<style></style>
