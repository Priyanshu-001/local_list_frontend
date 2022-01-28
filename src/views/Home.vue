<template>
  <div>
    <v-btn @click="trial">
    </v-btn>
  </div>
</template>

<script>
 
  import {logout} from '@/services/AxiosAuth'

  export default {
    name: 'Home',
    methods:{
      trial: async function(){

        logout()
      }
    },

   
  }
</script>
