<template>
	<div class="d-flex flex-column align-center mt-4">
		<v-spacer/><h1>  Devices </h1> <v-spacer/>
		<h2>  You are currently logged in </h2>
		<v-container>
			
			<device-item v-for="(device,index) in deviceList " :device="device" :key="index" />
		</v-container>
		<notification ref="notify"/>
	</div>
</template>

<script>
import AxiosAuth from '@/services/AxiosAuth';
import DeviceItem from '@/components/DeviceItem';
import notification from '@/components/notification';
export default{
	name: 'Devices',
	data(){
	return{
			deviceList : [{'OS':'windows',browser:'Chroe',ip:'1921.xx.x.xx'}]
	}
	},
	props:{

	},

	methods:{

	},

	computed:{
		user(){
			return this.$store.getters.user
		}

	},
	created(){
		AxiosAuth.get('/devices')
		
		.catch(()=>{
			this.$refs.notify.show('Error occured')
		})
	},
	watch:{

	},

	components:{
			notification,
			DeviceItem,
	},
}
</script>

<style scoped>
</style>