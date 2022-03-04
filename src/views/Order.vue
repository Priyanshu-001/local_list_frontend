<template>
	<component :is="component" />
</template>

<script>
const CustomerOrder = ()=>import('@/views/customer/Order.vue')
export default{
	name: 'order',
	data(){
	return{
		
	}
	},
	props:{

	},

	methods:{

	},

	computed:{
		type(){
			return this.$store.getters.type
		},
		component(){
			return `${this.type}-order`
		},
	},

	watch:{

	},

	components:{

		CustomerOrder,
	},
}
</script>

<style scoped>
</style>