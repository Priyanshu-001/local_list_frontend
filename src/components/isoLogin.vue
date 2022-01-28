<template>
  <v-card
    class="mx-auto "
    max-width="500"
  >
    <v-card-title class="text-h6 font-weight-regular justify-space-between">
      <span>{{ currentTitle }} Login </span>
      <v-avatar
        color="primary "
        class="subheading white--text"
        size="24"
        v-text="step"
      ></v-avatar>
    </v-card-title>

    <v-window v-model="step">
      <v-window-item :value="1">
        <v-card-text>
          <v-text-field
            label="Mobile Number"
            type="tel"
            v-model="phone"
            prefix="+91"
            :rules="[tenOnly,numeric]"
          />
          <span class="text-caption grey--text text--darken-1">
            Mobile Number for {{LoginType}}
          </span>
          <br/>
          <router-link to="/Business/login" v-if="LoginType==='Customer'" >
			Login as gig worker <v-icon >mdi-external</v-icon>
          </router-link>
           <router-link to="/Customer/login" v-if="LoginType==='Business'" >
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
		/>
          <span class="text-caption grey--text text--darken-1">

          </span>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="3">
        <final-status :OTP_status="OTP_status" :LoginType="LoginType" @restart="step=1" />
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
        :disabled="step === 3"
        color="primary"
        depressed
        @click="nextStep"
      >
        {{buttonLabel}}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script type="text/javascript">
import FinalStatus from './FinalStatus'
export default {
	name: 'IsoLogin',
	data(){
		return {
			step: 1,
			OTP: '',
			phone:'',
      OTP_status: '',
      length: 6,
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
      console.log(oldOTP.length + '  ' + newOTP.length)
      if(oldOTP.length < this.length && newOTP.length == this.length)
        {
          this.nextStep()
          console.log("Something should happen")
        }
    }
  },
  methods:{

    verifyOTP: async function(){

      console.log("Verifying Status")
      this.OTP_status = "Verifying OTP"
      setTimeout(()=>this.OTP_status="Verified",3000)
    },
    sendOTP: async function(){
      console.log("Next Step")
    },
    nextStep: function(){
      switch(this.step++){
        case 1: return this.sendOTP()
        case 2: return this.verifyOTP()
        default: return undefined
      }
    }
  }
}
	
</script>

<style type="text/css" scoped>
	
</style>