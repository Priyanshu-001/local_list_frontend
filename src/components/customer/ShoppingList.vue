<template>
	<step-wrapper subtitle="Please ensure all the shops are less than 3Km away">

		<v-container v-for="(item,index) in shoppingList" :key="index">
			<v-row>
				<v-col cols="8">
					<v-text-field v-model="item.item" :rules="[!!item.item]" :label="`Item no: ${index+1}`"/>
				</v-col>
				<v-col cols="4">
					<v-text-field type="number" :rules="[!!item.price]" v-model.number="item.price" prefix="₹" label="Price"/>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12">
				<v-text-field dense v-model="item.store" prepend-inner-icon="mdi-store" label="Specific store(if any)" />
			</v-col>
			</v-row>
			<v-row>
				<v-col>
					<v-btn color="error" @click="remove(index)" block>
						<v-icon> mdi-delete </v-icon> Remove this Item
					</v-btn>
				</v-col>
			</v-row>
		</v-container>
		<br/>
		<br/>
		<v-btn color="primary" text block @click="add">
			<v-icon> mdi-plus </v-icon> Add Item

		</v-btn>
		<template v-slot:actions>
			<v-row>
				<v-col cols="2" class="d-flex align-end">
					<v-btn @click="next" color="primary">
						Next
					</v-btn>
				</v-col>
				<v-spacer/>
				<v-col cols="3">
					<div class="d-flex align-end flex-column">
						<h4 class="text-subtitle-2"> {{shoppingList.length}} Item(s)</h4>
						<h3> ₹{{total}} </h3>
					</div>
				</v-col>
				
				
			</v-row>

		</template>
	</step-wrapper>
</template>

<script>
import StepWrapper from '../StepWrapper'

export default{
	name: 'ShoppingList',
	data(){
	return{
		nItems: 1,
		shoppingList: [{}],
		errors: true,
	}
	},
	props:{

	},

	methods:{
		add(){
			this.shoppingList.push({})
		},
		checkErrors(){
			let index
			for (index =0; index<this.shoppingList.length; index++)
				{		let item = this.shoppingList[index]	
						this.errors = true

						if(!item.item){
							this.$emit('error',`Pls add item no. ${index+1}`)
							return
						}
						if(!item.price){
							this.$emit('error',`Pls add price at item no. ${index+1}`)
							return
						}
						this.errors = false

				}
		},
		next(){
			this.checkErrors()
			if(!this.errors)
				this.$emit('next',[this.shoppingList,this.total])
			

		},
		remove(i){
			if(this.shoppingList.length>1)
				this.shoppingList.splice(i,1)
			else
				this.$emit('error',"Add at least one item")
		}

	},

	computed:{
		total(){
			let cost =  this.shoppingList.reduce((prev,curr)=>{
					return	{price: (prev.price || 0) + (curr.price ||0)}
			})
			return cost.price || 0
		}
	},

	watch:{
	},

	components:{
		StepWrapper,
	},
}
</script>

<style scoped>
</style>