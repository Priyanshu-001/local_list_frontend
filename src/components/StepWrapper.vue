<template>
	<v-card>
		<v-card-title>
			{{title}}
		</v-card-title>

		<v-card-subtitle>
			{{subtitle}}
		</v-card-subtitle>

		<v-card-text>
			<slot @notify="show">
			</slot>
		</v-card-text>
		<v-card-actions>
			<slot name="actions">
				<v-btn color="primary" :disabled="disable" @click="$emit('next')"> Next </v-btn>
			</slot>
		</v-card-actions>
		<notification ref="notify" />
	</v-card>
</template>

<script>
	import notification from '@/components/notification'
export default{
	name: 'StepWrapper',
	data(){
	return{

	}
	},
	props:{
		title: {
			type:String
		},
		subtitle:{
			type:String,
		},
		disable:{
			type:Boolean,
			default: false,
		}
	},

	methods:{
		show(msg){
		this.$refs.notify.show(msg)
		}
	},

	computed:{

	},

	watch:{

	},

	components:{
		notification,

	},
}
</script>

<style scoped>
</style>