<template>

	<v-menu offset-y >
		<template v-slot:activator="{ on, attrs }">
			<v-btn  text v-bind="attrs" v-on="on">
				<v-icon> mdi-account </v-icon> Hi,{{user.name}}
				</v-btn>
				</template>
				<v-list>
				<v-list-item
				v-for="(item, index) in routes"
				:key="index"
				>
				<v-btn block color="primary"  class="d-flex justify-start" text :to="{name: item.link}">  <v-icon> {{item.icon}}</v-icon>  
					{{item.text}}</v-btn>
					<v-spacer/>
				</v-list-item>
				</v-list>
				<v-divider/>
				<v-list>
					<v-list-item>
						<v-btn block text color="error"
						@click="logoutUser"

						class="d-flex justify-start">
							<v-icon> mdi-logout </v-icon> Logout
						</v-btn>
					</v-list-item>
				</v-list>
				</v-menu>
</template>

<script>
	import {logout} from '@/services/AxiosAuth'
export default{
	name: 'AccountTile',
	data(){
	return{
		offset: '',
		routes:[
		{
			icon: 'mdi-devices',
			text: 'devices',
			link: 'devices',
		},
		{
			icon: 'mdi-plus',
			text: 'New Order',
			link: 'neworder',
		},
		{
			icon: 'mdi-history',
			text: 'Order History',
			link: 'past'
		},
		{
			icon: 'mdi-play-circle',
			text: 'Active Orders',
			link: 'current',
		}
		]
	}
	},
	props:{

	},

	methods:{
		logoutUser(){
			logout()
			console.log(logout)
		}

	},

	computed:{
		user(){
			return this.$store.getters.user;
		}

	},
}
</script>

<style scoped>
</style>