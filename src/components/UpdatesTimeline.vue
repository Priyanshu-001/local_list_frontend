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
			>

			<v-timeline-item v-for="(item,index) in timeline" :key="index" small :color="'green'">	
				<strong class="text-body-1 text--primary">{{item.title}}</strong>
				<p class="text-subtitle-1">{{item.subtitle}}</p>
			</v-timeline-item>
		</v-timeline>
		</v-card-text>
	</v-card>
</template>

<script>
import AxiosAuth from '@/services/AxiosAuth'
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
		freq:{
			type:Number,
		}

	},

	methods:{
		addWaiting(){
			this.timeline =  [{
				title:'Order Placed',
				subtitle: `Order placed at ${(new Date(this.order.orderTime)).toLocaleString()}`
			},
			]
		},
		addWaitingPartner(){
			this.timeline = [...this.timeline,
			{
				title:'Waiting to accepted by our partner',
				subtitle: 'Higher the tip faster your order will be accepted',
			},
			]
		},
		accepted(){
			this.timeline = [...this.timeline,
			{
				title:`Order accepted by ${!!this.order.partnerId &&  this.order.partnerId.name}`,
				subtitle:`${(new Date(this.order.acceptedTime)).toLocaleString()}`,
				showComponent:this.order.status === 'accepted'?true:false
			}
			]
		},
		async update_status(){
			try{
				let res = await AxiosAuth.get('status')
				if(res.status !== this.order.status)
					this.$emit('reload')
			}
			catch(err){
				console.log(err)
			}
		}


	},

	computed:{


	},

	watch:{
		order(){
			switch(this.order.status){
				case 'waiting':{
					this.addWaiting()
					this.addWaitingPartner()
					break
				}
				case 'accepted':{
					this.addWaiting()
					this.accepted()
				}
			}
		}

	},
	mounted(){
		this.poll = setInterval(this.update_status,this.freq)
		console.log(this.poll)
	},
	beforeUnmount(){
	if(this.poll)
		clearInterval(this.poll)
	},
	components:{

	},
}
</script>

<style scoped>
</style>