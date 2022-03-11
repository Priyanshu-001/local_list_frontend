<template>
  <v-card
    class="mx-auto "
    max-width="500"
  >
    <v-card-title class="text-h6 font-weight-regular justify-space-between">
      <span>{{ currentTitle }} Login </span>
     <!--  <v-avatar
        color="primary "
        class="subheading white--text"
        size="24"
        v-text="step"
      ></v-avatar> -->
    </v-card-title>

    <v-window v-model="step">
      <v-window-item :value="1">
        <v-card-text>
          <v-text-field
            label="Mobile Number"
            type="tel"
            v-model="phone"
            prefix="+91"
            @keyup.enter="nextStep"
            :rules="[tenOnly,numeric]"
          />
          <span class="text-caption grey--text text--darken-1">
            Mobile Number for {{LoginType}}
          </span>
          <br/>
          <router-link to="/partner/login" v-if="LoginType==='customer'" >
			Login as gig worker <v-icon >mdi-external</v-icon>
          </router-link>
           <router-link to="/customer/login" v-if="LoginType==='partner'" >
      Login as a customer <v-icon >mdi-external</v-icon>
          </router-link>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="2">
		<div class="d-flex justify-center">
        <v-chip @click="step--">
			<v-icon left>
			mdi-cellphone
			</v-icon>
			+91 {{phone}}
        </v-chip>
		</div>
        <v-card-text>
		<v-otp-input
		:length="length"
		v-model="OTP"
    type="number"
		/>
          <span class="text-caption grey--text text--darken-1">

          </span>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="3">
        <final-status 
        @back="step=2; OTP='' "
        :OTP_status="OTP_status" 
        :LoginType="LoginType" 
        @restart="step=2" />
      </v-window-item>
    </v-window>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn
        v-if="step != 1"
        text
        @click="step--"
      >
        Back
      </v-btn>

      <v-spacer></v-spacer>
      <v-btn
        :disabled="step === 3 || (step === 2 && OTP.length !=6)"
        color="primary"
        depressed
        @click="nextStep"
      >
        {{buttonLabel}}
      </v-btn>
    
    </v-card-actions>
    <!-- snackbar bar -->
    <template>

    <v-snackbar
      v-model="snackbar"
    >
      {{ snackMSG }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
 
</template>
  </v-card>
</template>

<script type="text/javascript">
import FinalStatus from './FinalStatus'
import AxiosAuth from '@/services/AxiosAuth'
// import Axios from 'axios'

export default {
	name: 'IsoLogin',
	data(){
		return {
			step: 1,
			OTP: '',
			phone:'',
      OTP_status: '',
      length: 6,
      snackbar: false,
      snackMSG: '',
			tenOnly: value=>value.length == 10 || 'Number should be 10 digits',
      numeric: value=> value%1==0 || 'Enter only numbers'


		}
	},
  components:{
    FinalStatus
  },
	props:{
		LoginType: {
			type: String,
			default: 'Customer'
		}
	},
	computed:{

		currentTitle(){
			switch(this.step){
				case 1: return this.LoginType
				case 2: return 'Enter OTP'
				case 3: return 'Verfying OTP'
				default: return 'IDK how you came here'
			}
		},
		buttonLabel(){
			switch(this.step){
				case 1: return 'Send OTP'
				case 2: return 'Verify OTP'
				default: return ''
			}
		}

	},
  watch:{
    OTP: function(newOTP,oldOTP){
      if(oldOTP.length < this.length && newOTP.length == this.length)
        {
          this.nextStep()
          console.log("auto verify")
        }
    }
  },
  methods:{
    verifyOTP: async function(){
      this.OTP_status = 'Verifying OTP'

      AxiosAuth.post(`/${this.LoginType}/login`,{number:this.phone,OTP:this.OTP})
      .then(response=>{
        console.log(response.status)
        if(response.status === 200)
          { const {JWT,refreshToken} = response.data
            this.$store.dispatch('setJWT',JWT)
            this.$store.dispatch('setRefreshToken',refreshToken)

            this.OTP_status  ='Verified'
            this.snackMSG = 'Succesfully Verified'
            this.snackbar=true
          }
      })
      .catch((err)=>{
        this.OTP_status = 'incorrect'
        console.log(err)
      })
      // setTimeout(()=>this.OTP_status = 'incorrect',2000)
    },
    sendOTP: async function(){
      try{
          let response = await AxiosAuth.post(`/sendOTP`,{number:this.phone})
         if(response.status === 200){
          this.snackMSG = 'Succesfully send OTP'
          this.snackbar=true
         }
         else{
          this.snackMSG = "Couldn't send OTP please retry"
          this.snackbar=true
          this.step-=1
        }
    }
    catch(err){
        if(err.response.status !== 400){
          this.snackMSG = "Please Read the warnings"
          this.snackbar=true
          this.step-=1          

          // this.step-=1

        }
        else if(err.response.status === 500){
          this.snackMSG = 'Server Error'
          this.snackbar = true

        }
        else if(err.response.status === 404){
          this.snackMSG = "Couldn't reach our servers"
          this.snackbar=true
          this.step-=1          
        }
        else {
                this.snackMSG = 'An error occured'
                this.step-=1
              }
          

    }
    },
    nextStep: async function(){
      switch(this.step++){
        case 1: return await this.sendOTP()
        case 2: return this.verifyOTP()
        default: return undefined
      }
    }
        }
        }

 

	
</script>

<style type="text/css" scoped>
	
</style>