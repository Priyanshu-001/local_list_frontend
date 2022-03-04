<template>
<step-wrapper @next="$emit('next',tip)" subtitle="Must Tip our bussiness partner">
	
	</v-text-field>
	<template v-slot:actions>
		<div>
		</div>
	</template>
</step-wrapper>
</template>

<script>
import StepWrapper from '../StepWrapper'

export default{
	name: 'Description',
	data(){
	return{
		
	}
	},
	props:['value'],

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