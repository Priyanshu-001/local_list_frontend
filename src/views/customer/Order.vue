<template>
	<v-container >
		<v-row>
			<v-col cols="12"> 
				<OrderHead :orderTime="order.orderTime"
				:status="order.status"  
				:name="order.name" 
				:subtotal="order.subtotal" 
				:address="order.address"
				:lat="!!order.location && order.location.coordinates[1]"
				:long="!!order.location && order.location.coordinates[0]"
				@drawer="drawer=true"
				:tip="order.tip"/>
			</v-col>
		</v-row>
		<v-row v-if="!$vuetify.breakpoint.mobile">
			<v-col md="8" >
				<v-card>
					<v-card-title>
						<v-icon class="mr-2">
							mdi-list-status
						</v-icon>
						Instructions
					</v-card-title>
					<v-card-text class="text-body-1">
						<p>
							<ul>
								<li>
									{{order.receipt ? 'Must produce receipt': 'Receipt optional'}}
								</li>
								<li>
									{{order.instructions}}
								</li>
							</ul>
						</p>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col>
				<item-list :items="order.items" :status="order.status"/>
			</v-col>
		</v-row>
		<v-navigation-drawer 
		absolute
		bottom
		temporary
		v-model="drawer"
		>
				<item-list :items="order.items" :status="order.status"/>
		</v-navigation-drawer>
	</v-container>
</template>

<script>
import OrderHead from '@/components/customer/OrderHead'
import AxiosAuth from '@/services/AxiosAuth'
import ItemList from '@/components/ItemList'
export default{
	name: 'CustomerOrder',
	data(){
	return{
		lat:21.3232,
		long:12.212,
		order:{},
		noShow:false,
		drawer:false,
	}
	},
	props:{

	},

	methods:{
		
		async getOrder(){
			this.noShow = false
			AxiosAuth.get(`customer/order/${this.id}`)
			.then(res=>{
				if(res.status === 403){
					this.noShow = true
				}
				else if(res.status === 200){
					this.order = res.data
				}
			})

		}

	},

	computed:{
		id(){
			return this.$route.params.id

		},


	},
	mounted(){
		this.getOrder()

	},

	watch:{

	},

	components:{
		OrderHead,
		ItemList,
		// OrderCard
	},
}
</script>

<style scoped>
</style>