<template>
		
		<v-card class="mx-auto mt-5"  max-width="500">
			<v-card-title class="text-h6 font-weight-regular ">
		<span>Change Username </span>
		<br>
		
				</v-card-title>
		<v-card-text>
			<div class="d-flex justify-center">
			<v-chip>
			<v-icon left>
			mdi-cellphone
			</v-icon>
			+91 {{phone}}
			</v-chip>
			<br/>
			<br/>
		</div>
			<div class="d-flex ">
			<br/>
			<v-avatar
				color="primary"
				size="128"
				class="mx-auto"
				>
				<v-icon size="120" dark>mdi-account-circle</v-icon>
				</v-avatar>
			</div>
			<v-text-field v-model="name" label="Username"  @keyup.enter="change"/>
			</v-card-text>
			<v-card-actions>
			<v-spacer />
			<v-btn class="primary" @click="change" :disabled="changing">
			<v-icon class="mdi-spin" v-if="changing" dark> mdi-loading </v-icon>
			<label v-else > Change</label>
			</v-btn>
			</v-card-actions>
			<notification ref="notify" />
			</v-card>

	
</template>

<script>
import notification from '@/components/notification'
import AxiosAuth from '@/services/AxiosAuth'
export default{
	data(){
	return{
			name:'',
			changing: false,
	}
	},
	props:{

	},
	components:{
		notification,
	},
	methods:{
			async change(){
					this.changing = true
					AxiosAuth.post(`/${this.user.type}/changename`,{name:this.name})
					.then((response)=>{
						this.$refs.notify.show('Name Changed Successfully')
						const {JWT,refreshToken} = response.data
						console.log("HELLO")
						this.$store.dispatch('setJWT',JWT)
						this.$store.dispatch('setRefreshToken',refreshToken)
						setTimeout(()=>{this.nextStep()},3000)
					})
					.catch(err=>{
						console.log(err)
						this.$refs.notify.show('Error while changing')
					})
					.finally(()=>{
						this.changing = false
					})
			},
			nextStep(){
				this.$router.push({name:'Home'})
			}
	},
	computed:{
		user(){
			return this.$store.getters.user
		},
		phone(){
			return this.$store.getters.user.number

		}
	}
}
</script>

<style scoped>
</style>