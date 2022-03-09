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
				@cancel = "cancel"
				@accept ="partnerAccept"
				:tip="order.tip"/>
			</v-col>
		</v-row>
		<v-row >
			<v-col md="8" cols="12">
				<v-card>
					<v-card-title>
						<v-icon class="mr-2">
							mdi-list-status
						</v-icon>
						Instructions
					</v-card-title>
					<v-card-text class="text-body-1" >
						<p>
							<ul>
								<li>
									{{order.receipt ? 'Must produce receipt': 'Receipt optional'}}
								</li>
								<li>
									{{order.instructions|| 'No instructions given'}}
								</li>
							</ul>
						</p>
					</v-card-text>
				</v-card>
				<updates-timeline @reload="getOrder" :freq="30000" :order="order" :status="order.status"/>
			</v-col>
			<v-col v-if="!$vuetify.breakpoint.mobile">
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
import UpdatesTimeline from '@/components/UpdatesTimeline'

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
			AxiosAuth.get(`${this.type}/order/${this.id}`)
			.then(res=>{
				if(res.status === 403){
					this.noShow = true
				}
				else if(res.status === 200){
					this.order = res.data
				}
			})

		},
		async cancel(){
			try{
				await AxiosAuth.patch(`${this.type}/order/${this.id}/cancel`)
			}
			catch(err){
				console.log(err)
			}
			finally{
				setTimeout(()=>this.getOrder(),2500)
			}

		},
		async partnerAccept(){
			console.log('Accepting')
			try{
				await AxiosAuth.patch(`partner/order/${this.id}/accept`)
			}
			catch(err){
				console.log(err)
			}
			finally{
				setTimeout(()=>this.getOrder(),2500)
			}
		},

	},

	computed:{
		id(){
			return this.$route.params.id

		},
		type(){
			return this.$store.getters.type;
		}


	},
	mounted(){
		this.getOrder()

	},

	watch:{

	},

	components:{
		UpdatesTimeline,
		OrderHead,
		ItemList,
		// OrderCard
	},
}
</script>

<style scoped>
</style>