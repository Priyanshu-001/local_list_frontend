<template>
<step-wrapper subtitle="A name can help you easily find this order latter" @next="next" ref="wrapper" >
<v-text-field  v-model="name" label="Name of the Order"  @keyup.enter="next"/>
</step-wrapper>
</template>

<script>
import StepWrapper from '../StepWrapper'
export default{
	name: 'AddName',
	data(){
	return{
		name:'',

	}
	},
	props:{

	},

	methods:{
		next(){
			
			if(!this.name){
				
				this.$emit("error",'Add name')
			}
			else
				this.$emit('next',this.name)
		}
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