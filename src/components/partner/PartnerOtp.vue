<template>
	<v-card>
		<v-card-title>
			OTP
		</v-card-title>
		<v-card-text>
			<v-otp-input
			length="4"
			v-model="otp"
			type="number"
			/>
			<p class="error--text" v-if="incorrect">
				Incorrect OTP
			</p>
			<p class="error--text" v-else-if="error">
				⚠ Some Error occured retry
			</p> 
		</v-card-text>
		<v-card-actions>
			<v-spacer/>
			<v-btn color="primary" block rounded @click="verify" :disabled="freeze">
				Verify
			</v-btn>
			<v-spacer/>
		</v-card-actions>
	</v-card>
</template>

<script>
import AxiosAuth from '@/services/AxiosAuth'

export default{
	name: 'PartnerOtp',
	data(){
	return{
		incorrect: false,
		error: false,
		freeze:false,

	}
	},
	props:['otp'],

	methods:{
		
		async verify(){
			this.freeze = true
			const url = `partner/order/${this.id}/verifyotp`
			AxiosAuth.post(url,{otp:this.otp})
			.then(res=>{
				if(res.status === 200){
					this.$emit('verified')
				}	 
			})
			.catch(err=>{
				if(err.response.status == 400)
					this.incorrect = true
				else
					this.error = true
				console.log('OTP err')
				this.freeze = false
				console.log(err)
			})
		}

	},

	computed:{
		id(){
			return this.$route.params.id
		},
	},

	watch:{

	},

	component:{

	},
}
</script>

<style scoped>
</style>