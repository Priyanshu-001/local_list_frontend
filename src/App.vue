<template>
  <v-app>
    <v-app-bar v-if="!fullscrn"
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
      <v-icon x-large> mdi-bag-checked </v-icon>
      </div>

      <v-spacer></v-spacer>

     
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  computed:{
    fullscrn: function(){
      return this.$route.meta.fullscrn
    }
  },
 created(){
  this.$store.dispatch('setBaseURL')

 }

};
</script>
