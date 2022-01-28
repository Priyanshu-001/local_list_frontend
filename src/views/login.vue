<template>
	<div>
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
		components: {
			IsoLogin
		}
	}
</script>

<style scoped>

</style>