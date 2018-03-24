<template>
	<div id="content">
		main
	</div>
</template>

<script>
	export default {
		name: 'main',
		created: function () {
			this.$axios.get('/test').then(result => {
				console.log(result);

			});
		}
	};
</script>

<style scoped>

</style>
