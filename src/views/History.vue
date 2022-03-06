<template>
	<div class="d-flex flex-column align-center mt-4">
		<h1 class="text-h4 font-weight-light">  Your Orders </h1> 
		
		<v-container>
			<component :is="component" v-for='(order,i) in orders.slice().reverse()' :key='i' :order='order' />
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
		orders : []

	}
	},
	props:{

	},

	methods:{
		getOrders(){
			this.orders = []
			AxiosAuth.get(`${this.type}/orders`)
			.then(res=>{
				this.orders = res.data.orders
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
				return `${this.type}-order-item`
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