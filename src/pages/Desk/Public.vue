<template>
	<div id="public">
		welcome!
		<br>
		{{msg}}
	</div>
</template>

<script>
	export default {
		name: 'public',
		data() {
			return {
				msg: ''
			};
		},
		created: function () {
			this.$axios.get('/api/public').then(result => {
				console.log(result);

				this.msg = 'remote public success';
			}).catch(error => {
				console.log(error);
			});
		}
	};
</script>

<style lang="less" scoped>
	#public {
		font-size: 40px;
		text-align: center;
		padding-top: 50px;
		background: #ddd;
		height: 100%;
	}
</style>

