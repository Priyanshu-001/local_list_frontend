<template>
	<v-container class="mt-3">
		<v-row>
			<v-col cols='12' md='7'>
				<v-row>
					<h1 class="text-h2"> Get new order </h1>
					<subtitle class="text-subtitle-1">
						Showing 10 open orders upto 3Km from your location
					</subtitle>
				</v-row>
				<br/>
				<br/>
				<v-row>
					<v-btn 
					block 
					v-if="orders.length == 0"  
					@click="getOrders"
					:disabled="!geoExists"
					color="primary"
					>

						<v-icon left> {{location_label.icon}} </v-icon>
						{{location_label.label}}
					</v-btn>
					<orders-list :orders="orders" @reload="getOrders" v-else/>
				</v-row>
			</v-col>
			<v-spacer/>
			<v-col v-if="!$vuetify.breakpoint.mobile" md='4' class="ml-4">
				<v-card class="w-100">
					<v-card-title>
						💡 Tips
					</v-card-title>
					<v-card-text>
						<ul>
							<li>
								This is a project not ready for serious use
							</li>
							<li>
								Accepts orders only after reading all instructions
							</li>
							<li>
								Confirm all items are available before confirming
							</li>
							<li>
								Rject ambiguous orders
							</li>
						</ul>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import AxiosAuth from '@/services/AxiosAuth'
import OrdersList from '@/components/partner/OrdersList'
export default{
	name: '',
	data(){
	return{
		orders: []
	}
	},
	props:{

	},

	methods:{
		async detect(){
			this.$store.dispatch('getLocation')
		},
		async requestOrders(){
			try{
				let res = await AxiosAuth(`/partner/findorder`,{'params':{
					lat:this.lat,
					long:this.long
				}})
				console.log(res)
				this.orders = res.data.orders
			}
			catch(err){
				console.log(err)
			}

		},
		async getOrders(){
			
				await this.detect()
				await this.requestOrders()
			
		}
	},

	computed:{
		lat(){
			return this.$store.getters.lat
		},
		long(){
			return this.$store.getters.long
		},
		located(){
			return this.$store.getters.located
		},
		geoExists(){
			return this.$store.getters.geoExists
		},
		location_loading(){
			return this.$store.getters.location_loading
		},
		location_label(){
			if(this.geoExists)
				return {label:'Detect Location',icon:'mdi-map-marker'}
			else if(this.location_loading)
				return {label:'Detecting Location',icon:'mdi-spin mdi-loading'}
			return {label:'Location not detectable', icon:'mdi-map-marker-alert'}
		},
		

	},
	created(){
		this.orders = []
	},

	watch:{

	},

	components:{
		OrdersList

	},
}
</script>

<style scoped>
</style>