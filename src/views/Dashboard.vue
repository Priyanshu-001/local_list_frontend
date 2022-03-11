<template>
	<v-container class="mt-2 mx-2 md:mx-4 ">
	
	<v-row>
		
		<v-col cols="12" md="8">
			<v-row>
				<v-spacer/>
				<h1 class="text-h2"> Welcome </h1> 
				<v-spacer/>
			</v-row>
			<br>
			<template v-if="type != 'guest' ">
				<v-row class="mt-2" > 
					
				
						<ul>
							<li>
								Signed in as {{type}}.
							</li>
							<li>
								Click on the button below to get started
							</li>
						</ul>
					
					
				</v-row>

				<v-row class="mt-12">

					
					<div style="height: 30vh; display:flex; justify-content:center;">
						<v-btn class="primary" :to="`/${nextLink}`">
							New Order
							<v-icon>
								mdi-chevron-right
							</v-icon>
						</v-btn>
					</div>
				
				</v-row>
			<v-row>
			</v-row>
		</template>
		<template v-else>
			<v-row class="mt-2" >

				<div class="text-body-1 font-weight-regular mx-4">
						Too busy to shop ?
						<br/>
						Create a shopping list and sit back as a partner shops for you.
						<br>
						<br>
						<v-row>
						
							<v-btn  color="primary" :to='{name: "login",params:{LoginType:"customer"}}'>
								Sign up as customer
								<v-icon>
									mdi-chevron-right
								</v-icon>
							</v-btn>
			
						</v-row>
						<br>
						<div>
							OR 
							<br>
							become someone else's hero while you are out
						</div>
						<br/>
						<v-row>
			
							<v-btn  text color="primary" :to='{name: "login",params:{LoginType:"partner"}}'>
								Sign up as partner
								<v-icon>
									mdi-chevron-right
								</v-icon>
							</v-btn>
			
						</v-row>


				</div>

			</v-row>
		</template>
		</v-col>
		<v-col>
			<aside>
				<h2 class="text-h4" v-if="!$vuetify.breakpoint.mobile" >
					Quick Navigation
					<v-list>
					
							<v-list-item v-for="(item,index) in links" :key="index">
								<v-btn  color="primary" text rounded outlined :to="{name:item.link}" >
									<v-icon class="mr-3"> {{item.icon}} </v-icon> {{item.text}}
								</v-btn>
							</v-list-item>
					</v-list>
				</h2>
			</aside>
		</v-col>
	</v-row>
	</v-container>
</template>

<script>
export default{
	name: 'Dashboard',
	data(){
	return{
		links:[
		{
			icon: 'mdi-monitor-dashboard',
			text: 'Dashboard',
			link:'Dashboard',
		},
		{
			icon: 'mdi-devices',
			text: 'devices',
			link: 'devices',
		},
		{
			icon: 'mdi-history',
			text: 'history',
			link: 'past',
		},
		{
			icon:'mdi-information-outline',
			text:'About',
			link: 'About',
		}
		]
	}
	},
	props:{

	},

	methods:{

	},

	computed:{
		type(){
			return this.$store.getters.type
		},
		nextLink(){
			return this.type === 'customer'? 'neworder' :'getorder'

		}

	},

	watch:{

	},

	component:{

	},
}
</script>

<style scoped>
</style>