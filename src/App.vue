<template>
  <v-app>
    <!-- With vuetify -->
    <v-main>
      
      <v-app-bar fixed>
        <v-btn @click='eraseAll()' x-large icon color="deep-purple accent-4">
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
        <v-toolbar-title>BeyondBook</v-toolbar-title>
        <v-text-field v-model='field' @keyup.enter='send()' solo label="Poste aqui..." hide-details></v-text-field>
        <v-btn @click='send()' icon color="deep-purple accent-4">
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </v-app-bar>
      
      <div class="messages-container">
        <div v-for="(message, i) in messages" :key="i">
            <MessageCard :nameProp='name' :messageProp='message' :idProp='i'
            @erase-me="erase(i)" @edit-me="edit(i)"  />
        </div>
      </div>
      
      <v-app-bar color="#424242" fixed bottom>

      </v-app-bar>

    </v-main>
  </v-app>
</template>

<script>
import MessageCard from './components/MessageCard.vue'
export default {
  name: "App",
  components: {
    MessageCard
  },
  data: () => ({
    name: "Victor Aurelio",
    icon: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Blank&hairColor=Brown&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
    messages: [
      { user: "friend", text: "Olá, pode me ajudar?" },
      { user: "friend", text: "Sei que não falo contigo há bastante tempo mas estou escrevendo bastante aqui para termos um exemplo real de mensagem." }
    ],
    field: ''
  }),
  methods: {
    send () {
      let message = {
        user: 'me',
        text: this.field
      }
      this.messages.push(message)
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
  }
};

</script>

<style>
.messages-container {
  width: 100%;
  padding-top: 64px;
  padding-bottom: 56px;
}
</style>