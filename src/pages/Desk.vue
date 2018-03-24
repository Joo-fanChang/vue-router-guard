<template>
	<div id="desk">
		main
	</div>
</template>

<script>
	export default {
		name: 'desk',
		created: function () {
			this.$axios.get('/api/test').then(result => {
				console.log(result);

			});
		}
	};
</script>

<style scoped>

</style>
