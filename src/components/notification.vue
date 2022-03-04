
	<template>

    <v-snackbar
      v-model="snackbar"
    >
      {{ snackMSG }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
 
</template>

<script>
export default{
	name: 'notification',
	data(){
	return{
		snackMSG :'',
		snackbar: false

	}
	},
	props:{

	},

	methods:{
		show(msg){
			this.snackMSG = msg
			this.snackbar = true
		}

	},

	computed:{

	},

	watch:{

	},

	component:{

	},
}
</script>

<style scoped>
</style>