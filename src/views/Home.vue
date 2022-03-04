<template>
  <div>
   Make homepage fast
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
