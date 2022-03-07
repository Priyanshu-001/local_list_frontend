<template>
	<v-card>
		<v-card-title class="font-weight-bold my-3 pa-4">
			<v-row>
			<v-col cols="12" md="4">
				{{order.name}}  
			</v-col>
			
			<v-col col="12" md="4" class="text-subtitle-1">
				<ul>
					<li>
						Tip Offered: ₹ {{order.tip}}
					</li>
					<li>
						Ordered at <strong> {{ (new Date(order.orderTime)).toLocaleString() }} </strong>
					</li>
					<li> 
						Delivery Within 3Km
					</li>
					<li>
						{{order.receipt && 'Receipt must' || 'Receipt optional'}}
					</li>
				</ul>
			</v-col>

			<v-col v-if="!$vuetify.breakpoint.mobile" cols="0" md="4" class="d-flex justify-end success--text font-weight-bold" >	
			₹ {{(order.subtotal+order.tip) || 0}}

			</v-col>
			</v-row>
		</v-card-title>

		<v-card-actions>
			<p v-if="$vuetify.breakpoint.mobile"
			class="success--text font-weight-bold mt-auto mb-auto"
			> ₹ {{(order.subtotal+order.tip) || 0}} </p>

			<v-spacer/>
			<v-btn color="primary" outlined text :to="{name:'order',params:{id:order._id}}">
				<v-icon> mdi-information </v-icon>
				Details
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
export default{
	name: 'PartnerOrderItem',
	data(){
	return{

	}
	},
	props:['order'],

	methods:{

	},

	computed:{

	},

	watch:{

	},

	component:{

	},
}
</script>

<style scoped>
</style>