<template>

	<v-card>
		<v-container>
		<v-row>
			<v-col cols="4" class="d-flex">
				<v-spacer/>
				<v-icon size="100"> mdi-google-chrome </v-icon>
				<v-spacer/>
			</v-col>
			<v-divider vertical />
			
			<v-col>

				<v-card-title> {{device.browser}} at {{device.OS}}</v-card-title>
				<v-card-subtitle> <v-icon> mdi-earth </v-icon> {{device.ip}} </v-card-subtitle>
				<v-card-text> First login  at {{(new Date(device.time)).toDateString()}}  </v-card-text>
			</v-col>
		</v-row>
		</v-container>
		<v-divider/>
		<v-card-actions> <v-spacer/> <v-btn color="primary"> <v-icon> mdi-logout </v-icon> Logout </v-btn></v-card-actions>
	
	</v-card>
</template>

<script>
export default{
	name: 'DeviceItem',
	data(){
	return{

	}
	},
	props:{
		device:{
			required: true,
			type: Object,
		}

	},

	methods:{

	},

	computed:{

	},

	watch:{

	},

	components:{

	},
}
</script>

<style scoped>
</style>