<template>
  <v-app>
    <v-app-bar v-if="!fullscrn"
      app
      color="primary"
      dark
      dense
    >

      <div class="d-flex align-center">
      <v-icon x-large> mdi-bag-checked </v-icon>
      Local List
      </div>

      <v-spacer></v-spacer>

     <v-btn text to="/customer/login" v-if="!user.name">
      Login/Signup
     </v-btn>
     <account-tile v-else />
     
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
  import AccountTile from '@/components/AccountTile';

export default {
  name: 'App',

  data: () => ({
    //
  }),
  components:{
    AccountTile,
  },
  methods:{
    showPopup(){
      console.log('Just imagin')
    }
  },
  computed:{
    fullscrn: function(){
      return this.$route.meta.fullscrn
    },
    user(){
      return this.$store.getters.user
    }
  },
 created(){
  

 }

};
</script>
