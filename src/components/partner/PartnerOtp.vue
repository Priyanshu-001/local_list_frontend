<template>
	<v-card>
		<v-card-title>
			OTP
		</v-card-title>
		<v-card-text>
			<v-otp-input
			length="4"
			v-model="otp"
			/>
			<p class="error--text" v-if="incorrect">
				Incorrect OTP
			</p>
			<p class="error-text" v-else-if="error">
				⚠ Some Error occured retry
			</p> 
		</v-card-text>
		<v-card-actions>
			<v-spacer/>
			<v-btn color="primary" block rounded @click="verify">
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

	}
	},
	props:['otp'],

	methods:{
		
		async verify(){
			const url = `partner/order/${this.id}/verifyotp`
			AxiosAuth.post(url,{otp:this.otp})
			.then(res=>{
				if(res.status === 200){
					setTimeout(()=>this.$emit('verified'),2000)
				}	 
			})
			.catch(err=>{
				if(err.response.status == 400)
					this.incorrect = true
				else
					this.error = true
				console.log('OTP err')
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