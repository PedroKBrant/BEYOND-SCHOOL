<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn
                  @click="$router.push('/')"
                  x-large
                  icon
                  color="deep-purple accent-4"
                >
                  <v-icon>mdi-home-outline</v-icon>
                </v-btn>
              </v-toolbar>

              <v-card-text>
                <v-form>
                  <v-text-field label="Email" v-model="email"></v-text-field>
                  <v-text-field
                    label="Password"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn>
                  <v-icon @click="loginGoogle()">
                    mdi-google
                  </v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="createAccDialog = true">
                  Create Acount
                </v-btn>
                <v-btn color="primary" @click="login()">
                  Login
                </v-btn>
              </v-card-actions>
              <v-dialog v-model="createAccDialog">
                <v-card>
                  <v-col>
                    <v-text-field
                      label="Email"
                      v-model="newEmail"
                    ></v-text-field>
                    <v-text-field
                      label="Password"
                      type="password"
                      v-model="newPassword"
                    ></v-text-field>
                    <v-btn color="primary" @click="createAcc()">Create</v-btn>
                  </v-col>
                </v-card>
              </v-dialog>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
//import ErrorMessage from './components/ErrorMessage.vue'

export default {
  // components:{
  //   ErrorMessage
  // },
  data() {
    return {
      createAccDialog: false,
      newEmail: "",
      email: "",
      newPassword: "",
      password: "",
    };
  },
  methods: {
    createAcc() {
      this.$store.dispatch("users/createAcc", {
        email: this.newEmail,
        password: this.newPassword,
      });
      this.newEmail = "";
      this.newPassword = "";
    },
    login() {
      this.$store.dispatch("users/login", {
        email: this.email,
        password: this.password,
      });
      this.email = "";
      this.password = "";
    },
    loginGoogle() {
      this.$store.dispatch("users/loginGoogle");
    },
  }
};
</script>
