<template>
	<v-card>
		<v-card-title class="font-weight-bold my-3 pa-4">
			<v-row>
				<v-col  col="6">
					{{name}}  
				</v-col>
				<v-spacer/>
				<v-col col="6" class="d-flex justify-end success--text font-weight-bold">
					₹ {{(subtotal+tip) || 0}}
				</v-col>
			</v-row>
		</v-card-title>

	</v-card>
</template>

<script>
export default{
	name: 'OrderHead',
	data(){
	return{

	}
	},
	props:{
		name:{
			type:String,

		},
		subtotal:{
			type:Number,
			default:0,
		},
		tip:{
			type:Number,
			default:0,
		}

	},

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