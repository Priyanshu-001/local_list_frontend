<template>
	<v-card class="my-3 px-2">
		<v-card-title class="font-weight-bold my-3 pa-4">
			<v-row>
				<v-col  cols="12" md="5">
					
						<strong class="text-h3">{{name}}  </strong>
						<br>
						<p class="text-subtitle-2 mt-3">
							<ul>
								<li>
									Order on {{(new Date(Number(orderTime))).toLocaleString() }}
								</li>
								<li v-if="delivered">
									Delivered on
								</li>
								<li v-else>
									Delivery pending
								</li>
							</ul>
						</p>
					
				</v-col>
				
				<v-col cols= "12" md="4">
					
					<strong>
						<h2 class="text-body-1 font-weight-bold">
								Address
						</h2>
						<p class="text-subtitle-1">
							<ul>
								<li>
									<address> {{address}} </address>
								</li>
							</ul>
						</p>
						<a class="-mt-2" :href="`https://www.google.com/maps/search/?api=1&query=${lat},${long}`" target="_map">
						<p text class="primary--text text-subtitle-1 -mt-4">
							<v-icon color="primary">
								mdi-google-maps
							</v-icon>
							View on map
						</p>
					</a>
					</strong>
				</v-col>

			
				<v-col col="1" class="text-h3 d-flex justify-space-around flex-column sm:align-end success--text font-weight-bold">
					
					
						₹ {{(subtotal+tip) || 0}}
						<br>
						
						<v-btn 
						v-if="type==='customer'"
						color="error"  
						:disabled="!(status ==='waiting')"
						@click="$emit('cancel')" 
						
						>
							
							Cancel
						</v-btn>

						<v-btn 
						v-else-if="type==='partner' &&status === 'waiting'"
						color="success" 
						@click="$emit('accept'); loading=true" 
						:disabled="loading">	
						<v-icon v-if="loading">
							mdi-loading mdi-spin
						</v-icon>
							Accept
						</v-btn>

						<v-btn 
						v-else-if="type==='partner' && status==='accepted' "
						color="error" 
						@click="$emit('cancel')" 
						:disabled="!(status ==='accepted')">
							
							Cancel
						</v-btn>
						<v-btn 
						class="mt-2"
						@click.stop="$emit('drawer')"
						block 
						color="primary" 
						text 
						outlined
						v-if="$vuetify.breakpoint.mobile">
							<v-icon class="mr-2">
								mdi-food
							</v-icon>


							Items
						</v-btn>
					
					
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
		drawer:false,
		loading:false,

	}
	},
	props:{
		status:{
			type:String,
			default:'uwu',
		},
		address:{
			type:String,
			default: 'loading address...'
		},
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
		},
		delivered:{
			type:Number,
			default:0,
		},
		orderTime:{
			type:Number,
		},
		lat:{
			type: Number,
		},
		long:{
			type:Number,
		}

	},

	methods:{


	},

	computed:{
		type(){
			return this.$store.getters.type
		}

	},

	watch:{

	},

	component:{

	},
}
</script>

<style scoped>
	a{
		text-decoration:inherit;
	}
</style>