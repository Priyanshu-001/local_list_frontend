<template>
	<v-container >
		<v-row>
			<v-col cols="12"> 
				<OrderHead :name="order.name" :subtotal="order.subtotal" :tip="order.tip"/>
			</v-col>
		</v-row>
		<v-row>
			<v-col md="4">
				<v-card>
					HEllo
					{{order.name }}
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import OrderHead from '@/components/customer/OrderHead'
import AxiosAuth from '@/services/AxiosAuth'
export default{
	name: 'CustomerOrder',
	data(){
	return{
		lat:21.3232,
		long:12.212,
		order:{},
		noShow:false,

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
		// OrderCard
	},
}
</script>

<style scoped>
</style>