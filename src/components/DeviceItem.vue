<template>

	<v-card class="my-3">
		<v-container>

		<v-row>
			<v-col cols="4" class="d-flex">
				<v-spacer/>
				<v-icon size="100" color="primary"> {{icon}} </v-icon>
				<v-spacer/>
			</v-col>
			<v-divider vertical />
			
			<v-col>

				<v-card-title> {{device.browser && device.browser.name}} at {{device.OS && device.OS.name}}</v-card-title>
				<v-card-subtitle> <v-icon> mdi-earth </v-icon> {{device.ip}} </v-card-subtitle>
				<v-card-text> First login  on {{(new Date(device.firstLogin)).toDateString()}}  </v-card-text>
			</v-col>
		</v-row>
		</v-container>
		<v-divider/>
		<v-card-actions> <v-spacer/> 
			<v-btn @click="remove" color="primary" :disabled="loading" v-if="device.clientID != clientID ">
				<template v-if="!loading">
					<v-icon> mdi-logout </v-icon> Logout
				</template>
				<template v-else>
					<v-icon>mdi-loading mdi-spin</v-icon> removing
				</template>
			</v-btn>
			<h2 class="primary--text text-button" color="primary" text v-else>
				<v-icon color="primary"> 
					mdi-dots-hexagon
				</v-icon>
				Current Device
			</h2>
		</v-card-actions>
	
	</v-card>
</template>

<script>
import AxiosAuth from '@/services/AxiosAuth'
export default{
	name: 'DeviceItem',
	data(){
	return{
		loading:false,

	}
	},
	props:{
		device:{
			required: true,
			type: Object,
		}

	},

	methods:{
		async remove()
		{	this.loading=true
			AxiosAuth.post('/remove',{clientID: this.device.clientID})
			.then(this.$emit('reload'))
			.catch(err=>console.log(err))
			.finally(this.loading=false)
		}

	},

	computed:{
		icon(){
			if(!this.device.browser)
				return 'mdi-file-question-outline'
			switch(this.device.browser.name)
			{
				case 'chrome':
					return 'mdi-google-chrome'
				case 'firefox':
					return 'mdi-firefox'
				case 'ie':
					return 'mdi-microsoft-internet-explorer'
				case 'edge':
					return 'mdi-microsoft-edge-legacy'
				default:
					return 'mdi-file-question-outline'
			}
		},
		clientID(){
			return this.$store.getters.user.clientID
		}
	},

	watch:{

	},

	components:{

	},
}
</script>

<style scoped>
</style>