<template>
	<div>
		<h3 class="text-subtitle-1">
			{{items}} items @ ₹{{receipt || 0}}
		</h3>
		<h3 class="text-subtitle-1">
			Tip:  ₹{{tip||0}}
		</h3>
		<h2>
			Grand Total:  ₹ {{receipt+tip||0}}
		</h2>
	</div>
</template>

<script>
export default{
	name:'Total',
	data(){
	return{

	}
	},
	props:['items','receipt','tip']
}
</script>