<template>
<step-wrapper @next="()=>$emit('next',address)" :disable="!address">
	<v-btn
	v-if="!located" 
	block 
	color="primary" 
	text
	outlined 
	:disabled="!geoExists" @click="detect">
	
		<v-icon left> {{location_label.icon}} </v-icon>
		{{location_label.label}}

	</v-btn>
	<div v-else>
	<h4 color="blue-text">
			<v-icon color="primary"> mdi-target</v-icon>
			Location detected
			<br>
			<v-text-field 
			label="More Details" 
			placeholder="House no./Floor no./Locality" 
			v-model="address" 
			@keyup.enter="!!address ? $emit('next',address): '' "/>
		</h4>
	</div>
</step-wrapper>
</template>

<script>
import StepWrapper from '../StepWrapper'

export default{
	name: 'Location',
	data(){
	return{
		address:''
	}
	},
	props:{

	},

	methods:{
		async detect(){
			this.$store.dispatch('getLocation')
		}

	},

	computed:{
		located(){
			return this.$store.getters.located
		},
		geoExists(){
			return this.$store.getters.geoExists
		},
		location_loading(){
			return this.$store.getters.location_loading
		},
		location_label(){
			if(this.geoExists)
				return {label:'Detect Location',icon:'mdi-map-marker'}
			else if(this.location_loading)
				return {label:'Detecting Location',icon:'mdi-spin mdi-loading'}
			return {label:'Location not detectable', icon:'mdi-map-marker-alert'}
		},


	},

	watch:{

	},
	created(){
		this.$store.dispatch('clearLocation')
	},

	components:{
		StepWrapper,
	},
}
</script>

<style scoped>
</style>