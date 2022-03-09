<template>
<div class="pa-4 text-center">
		
        <v-icon class="mdi-spin" x-large v-if="OTP_status === 'Verifying OTP' "> 
        mdi-loading
      </v-icon>

				<v-icon  x-large color="error" v-if="OTP_status === 'incorrect'"> 
        mdi-sticker-remove
      </v-icon>
        

        <v-icon 
        x-large 
        color="success"
        v-if="OTP_status === 'Verified' "> mdi-sticker-check</v-icon>
       
          <h3 class="text-h6 font-weight-light mb-2">
           {{OTP_status}}
          </h3>
          
          <span class=" grey--text">{{message}}</span>
          <br/>
        <template v-if="OTP_status=='Verified'">
				<template v-if="(!!user && user.status=='complete')">
				<v-btn class="primary" :to="{name:'Dashboard'}">
				<v-icon  > mdi-home </v-icon>
				Home
				</v-btn>
				</template>
				<template v-if="user && user.status=='incomplete'">
				<v-btn class="primary" :to="{name:'changeName'}">
					<v-icon> mdi-account </v-icon>
					Complete Your Profile
				</v-btn>
				<br/>
				<v-btn text color="primary" @click="partner">
				{{wrongLogin}}
				</v-btn>
				</template>
				</template>

				<template v-if="OTP_status === 'incorrect'">
					<v-btn text @click="$emit('back')" color="primary">
						<v-icon>
							mdi-reload
						</v-icon>
						Try again
					</v-btn>
				</template>
        </div>
</template>

<script>
import {logout} from '@/services/AxiosAuth'
export default{
	name: 'FinalStatus',
	data(){
	return{
		message: 'Thanks for signing up!',
		wrongLogin: 'Login as Partner',

	}
	},

	methods:{
		partner:async function(){
			await logout()
			if(this.LoginType === 'customer')
			this.$router.push({name:'login', params:{LoginType: 'business'}})
			else
			this.$router.push({name:'login', params:{LoginType: 'customer'}})
			this.$emit('restart')

		},
		wrongMsg: async function(){
				if(this.LoginType === 'customer')
			this.wrongLogin='Login as Partner'
		else
			this.wrongLogin='Login as Customer'
		}
		

	},
	props:{
		OTP_status:{
			required: true,
			type: String,
			default: 'Verifying OTP'
		},
		LoginType:{
			type:String,
			required:true,
		}

	},

	computed:{
		user(){
				return this.$store.getters.user
		}
	},



	watch:{
		OTP_status: function(){
				if(this.OTP_status === 'Verified' && this.user.status === 'complete')
				{
					this.message = `Welcome back ${this.user.name}`	
				}
				
				else if(this.OTP_status === 'incorrect')
				{ this.message= 'incorrect OTP please try again'
				}
				else{
					this.message = 'Thanks for signing up!'
				}
				
				
			
		},
		LoginType: function(){
		this.wrongMsg()
	},
},

	component:{

	
	},
	created(){
		this.wrongMsg()
	}

}
</script>

<style scoped>
</style>