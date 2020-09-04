<template>
  <v-app>
  <router-view/>
  </v-app>
</template>

<script>

//import { mapGetters } from 'vuex'
//import MessageCard from './components/MessageCard.vue'

export default {
  name: "App",
  created () {
    console.log(this.$firebase)
  }
};

</script>

<style>
/* .messages-container {
  width: 100%;
  padding-top: 64px;
  padding-bottom: 56px;
} */
</style>