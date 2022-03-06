<template>
	<v-card>
		<v-card-title>
			<v-icon class="mr-2">
				mdi-food
			</v-icon>

			Items
			<v-spacer/>
			<span 
			v-if="!$vuetify.breakpoint.mobile"
			class="font-weight-light text-body-1 loadingLine" :class="[status!='cancelled' || status!='rejected'?'success--text' : 'error--text']">{{explain}}</span>
		</v-card-title>
		<v-card-text>
			<item-list-item v-for="item in items" :key="item._id" :item="item"/>
		</v-card-text>
	</v-card>
</template>

<script>
import ItemListItem from '@/components/ItemListItem'
export default{
	name: 'ItemList',
	data(){
	return{

	}
	},
	props:{
		status:{
			type:String,
			default:'waiting'
		},
		items:{
			type:Array,
			default:()=>[],
		}

	},

	methods:{

	},

	computed:{
		explain(){
			switch(this.status){
				case 'rejected':
					return 'cancelled by delivery partner'
				case 'waiting':
					return 'waiting for partner to accept'
				case 'accepting':
					return 'Shopping'
				default:
					return this.status
			}
		}
	},

	watch:{

	},

	components:{
		ItemListItem,
	},
}
</script>

<style>
	.loadingLine{
		/*todo*/
		background-color:var(--primary);
	}
</style>