<template>
	<v-container>	
			<v-stepper v-model="step" vertical max-width="800">
				
					<v-stepper-step step="1" :complete="step>1">
					Add Name
					</v-stepper-step>
					<v-stepper-content step="1">
						<add-name @error="show" @next="nextStep"/>
					</v-stepper-content>
					<v-divider vertical />
					<v-stepper-step step="2" :complete="step>2">
					Shopping List
					</v-stepper-step>
					<v-stepper-content step="2">
						<shopping-list @error="show" @next="nextStep"/>
					</v-stepper-content>

					<v-divider vertical/>
					<v-stepper-step step="3" :complete="step>3">
						Instructions
					</v-stepper-step>
						<v-stepper-content step="3">
						<Description @next="nextStep"/>
					</v-stepper-content>
					<v-divider vertical/>
					<v-stepper-step step="4" :complete="step>4">
						Location
					</v-stepper-step>
					<v-stepper-content step="4">
						<Location @next="nextStep" />
					</v-stepper-content>
					<v-divider vertical/>
					<v-stepper-step step="5">
						Tip
					</v-stepper-step>
					<v-stepper-content step="5">
						<v-text-field label="Tip"
							prefix="₹"
							hint="Tip is compulsory"
							persistant-hint
							v-model.number="order.tip"
							type="number"/>
						<Total 
						:receipt="order.subtotal"
						:items="order.items && order.items.length"
						:tip="order.tip"
						
					/>
					<br/>
					<v-btn 
					block 
					color="primary" 
					:disabled="!order.tip || order.tip===0"
					@click="confirm"
					>
						Confirm Order
					</v-btn>
					</v-stepper-content>
					<notification  ref="notify"/>
			</v-stepper>
		
		</v-container>

</template>

<script>
	import AxiosAuth from '@/services/AxiosAuth'
	import AddName from '@/components/customer/AddName'
	import Description from '@/components/customer/Description'
	import Location from '@/components/customer/Location'
	import ShoppingList from '@/components/customer/ShoppingList'
	// import Tip from '@/components/customer/Tip'
	import Total from '@/components/customer/Total'
	import notification from '@/components/notification'
    export default{
	name: 'CustomerOrder',
	data(){
	return{
		step:1,
		order: {}
	}
	},
	props:{

	},

	methods:{
		async confirm(){
			this.show('confirming your order')

			try
				{
					let res = await AxiosAuth.post('customer/neworder',{order:this.order})
					this.show('Order confirmed redirecting....')
					this.$router.push({name:'order',params:{id:res.data.id}})
				}
			catch(error){
				console.log(error)
				this.show('Error Occured')
			}
		},
		show(msg){
			console.log(msg)
			this.$refs.notify.show(msg)
		},
		nextStep(payload)
		{	
			switch(this.step++){
				case 1:{
					this.order.name=payload
					break
				}
				case 2:{
					this.order.items = payload[0]
					this.order.subtotal = payload[1]
					break
				}
				case 3:{
					this.order.description = payload[0]
					this.order.receipt = payload[1]
					break
				}
				case 4:{
					this.order.location={
						coords:this.$store.getters.coords,
						address:payload
					}
					console.log(this.order)
					break
				}

			}
		}
	},

	computed:{

	},

	watch:{

	},


	components:{
		Description,
		AddName,
		notification,
		ShoppingList,
		Location,
		// Tip,
		Total,
	},
}
</script>

<style scoped>
</style>