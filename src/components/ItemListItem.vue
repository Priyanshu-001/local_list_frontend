<template>
	<div class="text-body-1 text--primary my-2">
		🛍️ Item:	<strong>{{item.item}}</strong>
		<br>
		<span> 
		🏪 Store:	<strong>{{item.store || 'Anystore'}}</strong>
		</span>
		<br>
		<v-icon color="yellow"> mdi-bitcoin</v-icon>
		Price:
		<span class="success--text">
		<strong>	₹{{item.price}}</strong>

		</span>
	</div>
</template>

<script>
export default{
	name: 'ItemListItems',
	data(){
	return{

	}
	},
	props:['item'],

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