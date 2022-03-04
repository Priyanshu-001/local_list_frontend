<template>
<step-wrapper @next="$emit('next',[description,receipt])">
	<v-textarea v-model="description" label="Instructions(if any)" placeholder="Keep tomatoes at top/Ensure Hygenic Condition" />
	<v-switch v-model="receipt"  label="Produce Receipt"/>
</step-wrapper>
</template>

<script>
import StepWrapper from '../StepWrapper'

export default{
	name: 'Description',
	data(){
	return{
		description: '',
		receipt: false,
	}
	},
	props:{

	},

	methods:{

	},

	computed:{

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