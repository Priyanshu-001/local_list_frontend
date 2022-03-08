<template>
	<v-card>
		<v-card-title>
			OTP

		</v-card-title>
		<v-card-subtitle class="text-subtitle-1">
			Please share this OTP with delivery partner to complete the delivery.
		</v-card-subtitle>
		<v-card-text>
			<h2 class="text-h3 primary--text" style="width:80%;" >
				{{otp}}
			</h2>
		</v-card-text>
		<v-card-actions>
			<v-btn color="primary" 
			@click="speak"
			block 
			:disabled="!ready || !!speaking"
			>
				<v-icon>
					mdi-text-to-speech
				</v-icon>
				Speak
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
export default{
	name: 'CustomerOtp',
	data(){
	return{
		utternance: null,
		ready: false,
	}
	},
	props:['otp'],
	methods:{
		async getReady(){
			if(!this.utternance)
				this.utternance = await new SpeechSynthesisUtterance(`OTP-${this.otp}`);
			this.ready = true
		},
		speak(){
			if(this.ready)
				window.speechSynthesis.speak(this.utternance)
			console.log(window.speechSynthesis)
		}
	},

	computed:{
		speaking(){
			if(this.ready)
				return window.speechSynthesis.pending ||window.speechSynthesis.speaking
			return false

		}
	},
	created(){
		this.getReady()
	},

	watch:{

	},

	component:{

	},
}
</script>

<style scoped>
</style>