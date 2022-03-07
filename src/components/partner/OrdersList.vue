<template>
	<div style="width: 100%">
		<v-btn
		outlined
		text
		block
		color="primary"
		@click="$emit('reload')"
		>
		<v-icon>
			mdi-reload
		</v-icon>
		Refresh List
		</v-btn>
		<partner-order-item v-for="order in orders" :order="order" :key="order._id" />
	</div>

</template>

<script>
import PartnerOrderItem from '@/components/partner/PartnerOrderItem'
export default{
	name: 'OrdersList',
	data(){
	return{

	}
	},
	props:{
		orders:{
			type:Array,
			default:()=>[]
		}
	},

	methods:{

	},

	computed:{

	},

	watch:{

	},

	components:{
		PartnerOrderItem,

	},
}
</script>

<style scoped>
</style>