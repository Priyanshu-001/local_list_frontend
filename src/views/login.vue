<template>
	<div>
			<v-alert v-if="loggedOutAlert" elevation="4" dense
				type="error" dismissible  icon="mdi-account">
				<strong> Please Relogin:</strong>
				Invalid refresh token or we might be storing data in memory & not in redis to save cost ¯\_(ツ)_/¯.
				</v-alert>
			<iso-login :LoginType="LoginType"/>
	</div>
</template>

<script type="text/javascript">
	import IsoLogin from  '@/components/isoLogin'
	export default {
		name: 'login',
		computed:{
			LoginType(){
				return this.$route.params.LoginType
			}
		},
		props:{
			loggedOutAlert:{
				type:Boolean,
				default:false,
			}
		},
		components: {
			IsoLogin
		}
	}
</script>

<style scoped>

</style>