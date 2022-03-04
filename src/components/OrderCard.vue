<template>
	<v-card>
		<v-card-title> 
		<h1 class="text-h4 "> {{name}}  </h1>
		</v-card-title>
		

		<v-card-subtitle class="font-weight-light mt-1"> 
			<a :href="map" target="map" class="mr-2">
				<v-chip color="primary" outlined >
					<v-icon>mdi-target</v-icon> {{accu}} Location
				</v-chip>
			</a> 
			{{ !!orderDate && displayDate }} 
			
		</v-card-subtitle>

		

	</v-card>
</template>

<script>
export default{
	name: 'OrderCard',
	data(){
	return{

	}
	},
	props:{
		name:{
			type:String,
		},
		orderDate:{
			type:Number,
		},
		accu:{
			type:String,
			default:'Aprroximate'
		},
		map:{
			type:String,
		}

	},

	methods:{

	},

	computed:{
		displayDate(){
			let d = new Date(Number(this.orderDate))
			return d.toLocaleString()
		}

	},

	watch:{

	},

	component:{

	},
}
</script>

<style scoped>
	a{
		text-decoration:inherit;
	
}

</style>