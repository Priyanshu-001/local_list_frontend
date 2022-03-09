<template>
	<v-card class="mt-4">
		<v-card-title>
			<v-icon class="mr-2">
				mdi-timeline
			</v-icon>
			TImeline
			
		</v-card-title>
		<v-card-text>
			<v-timeline
			align-top
			dense
			fill-dot
			>
	
			<v-timeline-item v-for="(item,index) in timeline" :key="index" small :color="item.color" :icon="item.icon">	
				<strong class="text-body-1 text--primary">{{item.title}}</strong>
				<p class="text-subtitle-1">{{item.subtitle}}</p>
				<component :is="component" 
				:otp="order.otp" 
				v-if="item.showComponent"
				@error="$emit(reload)"
				@verified="$emit(reload)"
				/>
			</v-timeline-item>
		</v-timeline>
		</v-card-text>
	</v-card>
</template>

<script>
import AxiosAuth from '@/services/AxiosAuth'
const PartnerOtp = ()=>import('@/components/partner/PartnerOtp')
const CustomerOtp = ()=> import('@/components/customer/CustomerOtp')
export default{
	name: '',
	data(){
	return{
		timeline: [],
		poll: null,
	}
	},
	props:{
		order:{
			type:Object,
			default:()=>{}
		},
		status:{
			type:String,
		},

	},

	methods:{
		addWaiting(){
			this.timeline =  [{
				title:'Order Placed',
				subtitle: `${(new Date(this.order.orderTime)).toLocaleString()}`
			},
			]
		},
		addWaitingPartner(){
			this.timeline = [...this.timeline,
			{
				title:'Waiting to be accepted by our partner',
				subtitle: 'Higher the tip faster your order will be accepted',
				icon: 'mdi-spin mdi-loading',
			},
			]
		},
		addAccepted(){
			this.timeline = [...this.timeline,
			{
				title:`Order accepted by our partner`,
				subtitle:`${(new Date(this.order.acceptTime)).toLocaleString()}`,
				showComponent:this.order.status === 'accepted'?true:false
			}
			]
		},
		addCancelled(){
			this.timeline = [...this.timeline,
			{
				title:'Order cancelled by the customer',
				subtitle:(new Date(this.order.cancelTime)).toLocaleString(),
				color:'red',
			}]
		},
		addDelivered(){
			this.timeline = [...this.timeline,
			{
				title:'Order successfully delivered',
				subtitle: (new Date(this.order.deliverTime)).toLocaleString()
			}]
		},
		async update_status(){
			try{
				const url = `/${this.type}/order/${this.id}/status`
				let res = await AxiosAuth.get(url)
				if(res.data.status !== this.order.status)
					this.$emit('reload')
			}
			catch(err){
				console.log(err)
			}
		}


	},

	computed:{
		type(){
			return this.$store.getters.type
		},
		component(){
			return `${this.type}-otp`
		},
		id(){
			return this.$route.params.id
		}


	},

	watch:{
		status(){
			switch(this.status){
				case 'waiting':{
					this.addWaiting()
					this.addWaitingPartner()
					break
				}
				case 'accepted':{
					this.addWaiting()
					this.addAccepted()
					break
				}
				case 'cancelled':{
					this.addWaiting()
					this.addCancelled()
					break
				}
				case 'rejected':{
					this.addWaiting()
					this.addAccepted()
					this.addRejected()
					break;
				}
				case 'completed':{
					this.addWaiting()
					this.addAccepted()
					this.addDelivered()
					break;
				}

			}
		}

	},
	mounted(){
			this.poll = setInterval(this.update_status,30000)
			console.log('Timer set')
			console.log(this.poll)
	},
	beforeDestroy(){
	if(this.poll)
		clearInterval(this.poll)
	console.log('hii')
	},
	components:{
		PartnerOtp,
		CustomerOtp,
	},
}
</script>

<style scoped>
</style>