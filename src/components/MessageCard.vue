<template>
  <v-card
    max-width="340"
    class="mx-auto"
  >
    <v-list-item>
        <v-list-item-avatar color="grey darken-3" align="top" justify="end">
            <v-img class="elevation-6"
                src='https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Blank&hairColor=Brown&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'
            >
            </v-img>
            <!--{{ messageProp.user == 'friend' ? nameProp : "Eu" }}
            <img src='https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Blank&hairColor=Brown&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'
            /> -->
        </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">Our Changing Planet</v-list-item-title>
        <v-list-item-subtitle class="font-weight-bold">{{ messageProp.user == 'friend' ? nameProp : "Me" }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
      height="194"
    ></v-img>

    <v-card-text>
        {{ messageProp.text}}
    </v-card-text>

    <v-card-actions>
      <v-btn
        text
        color="deep-purple accent-4"
      >
        Read
      </v-btn>
      <v-btn
        text
        color="deep-purple accent-4"
      >
        Bookmark
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn @click="$emit('erase-me', idProp)" icon>
        <v-icon>mdi-delete-outline</v-icon>
      </v-btn>
      <v-btn @click="$emit('edit-me', idProp)" icon>
        <v-icon>mdi-pencil-outline</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
    props: [ 'nameProp', 'messageProp', 'idProp' ]
    
}
</script>

<!--
<template>
    <v-card outlined class='ma-3' :class="{ 'teal accent-4': messageProp.user == 'friend', 'green': messageProp.user != 'friend' }">
        <v-card-subtitle class="font-weight-bold">{{ messageProp.user == 'friend' ? nameProp : "Eu" }}</v-card-subtitle>
        <v-card-text>{{ messageProp.text}}</v-card-text> 
        
        <v-card-actions>
                <v-spacer></v-spacer>

        <v-list-item-avatar color="grey darken-3" align="top" justify="end">
            <v-img
              class="elevation-6"
              src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
            ></v-img>
          </v-list-item-avatar>
  
          <v-list-item-content>
            <v-list-item-title>Paulo</v-list-item-title>
          </v-list-item-content>
  
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                   <span class="subheading mr-2">16</span>
                </v-btn>
  
                <v-btn icon>
                  <v-icon>mdi-delete-outline</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-pencil-outline</v-icon>
                </v-btn>
  
                <v-btn icon>
                  <v-icon>mdi-share-variant</v-icon>
                </v-btn>
              </v-card-actions> 
    
    </v-card>
</template>

<script>
export default {
    props: [ 'nameProp', 'messageProp' ]
}
</script>
-->