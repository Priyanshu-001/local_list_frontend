<template>
	<div class="d-flex flex-column align-center mt-4">
		<h1 class="text-h4 font-weight-light">  Your Orders </h1> 
		
		<v-container>

			<component :is="component" v-for='(order) in orders' :key='order._id' :order='order' />
			<h2 class="text-body-1" v-if="order.length ===0 && orderLoaded">
				No order found  try
				<code> check in console for errors </code>
			</h2>
		</v-container>
	</div>
</template>

<script>
const CustomerOrderItem = ()=>import('@/components/customer/CustomerOrderItem')
import AxiosAuth from '@/services/AxiosAuth'

export default{
	name: 'History',
	data(){
	return{
		orders : [],
		orderLoaded : false

	}
	},
	props:{

	},

	methods:{
		getOrders(){
			this.orders = []
			this.orderLoaded = true
			AxiosAuth.get(`${this.type}/orders`)
			.then(res=>{
				this.orders = res.data.orders
				this.orderLoaded = true

			})
			.catch(error=>{
				console.log('Error Occured')
				console.log(error)

			})
		}
	},

	computed:{
			type(){
				return this.$store.getters.type
			},
			component(){
				return `customer-order-item`
			},

	},
	mounted(){
		this.getOrders()


	},

	watch:{

	},

	components:{
		CustomerOrderItem,
	},
}
</script>

<style scoped>
</style>