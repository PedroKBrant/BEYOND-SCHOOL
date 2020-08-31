<template>
    <v-main>
      <v-app-bar fixed>

        <v-btn @click="$router.push('/')"  x-large icon color="deep-purple accent-4">
          <v-icon>mdi-home-outline</v-icon>
        </v-btn>
        
        <v-btn @click='eraseAll()' x-large icon color="deep-purple accent-4">
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
        
        <v-toolbar-title> {{$route.params.name}}</v-toolbar-title>//BeyondBook
        <v-text-field v-model='field' @keyup.enter='send()' solo label="Poste aqui..." hide-details></v-text-field>
        <v-btn @click='send()' icon color="deep-purple accent-4">
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </v-app-bar>
      
      <div class="messages-container">
        <div v-for="(message, i) in getMessages" :key="i">
            <MessageCard :nameProp='name' :messageProp='message' :idProp='i'
            @erase-me="erase(i)" @edit-me="edit(i)"  />
        </div>
      </div>
      
      <v-app-bar color="#424242" fixed bottom>

      </v-app-bar>

    </v-main>
</template>

<script>

import { mapGetters } from 'vuex'
import MessageCard from './components/MessageCard.vue'

export default {
  name: "App",
  components: {
    MessageCard
  },
  data: () => ({
    //name: "Victor Aurelio",
    field: ''
  }),
  methods: {

    send () {
      let message = {
        user: 'me',
        text: this.field
      }
      this.$store.dispatch('chat/sendMessage', message)
      this.field = ''
    },

    erase (index) {
      if(this.messages[index].user === 'me'){
        this.messages.splice(index,1)
        console.log('Kill me') 
      }
      else 
        console.log('You have no power here')   
    },

    eraseAll () {
      if(confirm('Tem certeza que deseja apagar tudo?')){
        this.messages=[]//.splice(0,this.messages.length)
        console.log('Kill then all') 
        //while(this.messages.length)
        //  this.messages.pop()
      }
      
    },

    edit (index) {//adicionar a key para apagar ume mensagem específica
      if(this.messages[index].user === 'me')
        this.messages[index].text = this.field 
      else 
        console.log('You have no power here')  
        this.field = '' 

    }
  },
  computed: {
    ...mapGetters('chat', ['getMessages'])
  }
};

</script>

<style>

</style>