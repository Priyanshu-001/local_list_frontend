<template>

	<v-menu >
		 <template v-slot:activator="{ on, attrs }">
		 	<v-btn  text v-else v-bind="attrs"
          	v-on="on">
     		 <v-icon> mdi-account </v-icon> Hi,{{user.name}}
     	   </v-btn>
		 </template>
		 <v-list>
		 	 <v-list-item
          		v-for="(item, index) in routes"
          		:key="index"
        		>
        		<v-btn text :to="{{name: item.link}}">  <v-icon> mdi-{{item.icon}}</v-icon>   {item.text} </v-btn>
        	</v-list-item>
		 </v-list>
	</v-menu>
</template>

<script>
export default{
	name: 'AccountTile',
	data(){
	return{
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