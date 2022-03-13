<template>
	<div class="d-flex flex-column align-center mt-4">
		<h1 class="text-h4 font-weight-light">  Your Orders </h1> 
		
		<v-container>

			<component :is="component" v-for='(order) in orders' :key='order._id' :order='order' />
			<center>
				<h2 class="text-body-1" v-if="orders.length === 0 && orderLoaded">
					No order found in your area
					<br/>
					<code> or there might be an error try checking in console for errors </code>
				</h2>
				<template v-else-if="!orderLoaded">
					<v-progress-circular
							
							class="mt-12"
							:size="70"
							indeterminate
							color="primary"/>
							<br>
					<code v-if="tooLong">
							The server is just waking up thanks for waiting
					</code>
				</template>
				

			</center>
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
		orderLoaded : false,
		error: false,
		tooLong:false,

	}
	},
	props:{

	},

	methods:{
		getOrders(){
			this.orders = []
			this.orderLoaded = false
			setTimeout(()=>this.tooLong=true,3500)
			this.error = false
			AxiosAuth.get(`${this.type}/orders`)
			.then(res=>{
				this.orders = res.data.orders
			})
			.catch(error=>{
				console.log('Error Occured')
				console.log(error)
				
				this.error= true

			})
			.finally(()=>{
				this.orderLoaded = true
				this.tooLong = false

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