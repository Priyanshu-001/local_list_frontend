<template>
	<div class="d-flex flex-column align-center mt-4">
		<v-spacer/><h1>  Devices </h1> <v-spacer/>
		<h2>  You are currently logged in </h2>
		<p >
			<uL>
			<li>
				With the current implementation remote logout will work only after the device's JWT is expired.
			</li>
			<li>
				Remote logout only invalidates refresh token for now.
			</li>
			</uL>
		</p>
		<v-container>
			
			<device-item v-for="(device) in deviceList " @reload="removeItem" :device="device" :key="device.clientID" />
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
		deviceList: []
	}
	},
	props:{

	},

	methods:{
		removeItem(){
			this.$refs.notify.show('Reloading list')
			this.$router.go()
		},
		getDevices(){
			AxiosAuth.get('/devices')
		.then(res=>this.deviceList = res.data.devices)
		
		.catch(()=>{
			this.$refs.notify.show('Error occured')
		})

		}

	},

	computed:{
		user(){
			return this.$store.getters.user
		},
		

	},
	created(){
		this.getDevices()
		
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