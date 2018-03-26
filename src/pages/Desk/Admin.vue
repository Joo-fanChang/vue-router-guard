<template>
	<div id="admin">
		welcome!
		<br>
		{{msg}}
	</div>
</template>

<script>
	export default {
		name: 'admin',
		data() {
			return {
				msg: ''
			};
		},
		created: function() {
			this.$axios.get('/api/admin').then(result => {
				console.log(result);
				this.msg = 'remote admin success';
			}).catch(error => {
				console.log(error);
			});
		}
	};
</script>

<style lang="less" scoped>
	#admin {
		font-size: 40px;
		text-align: center;
		padding-top: 50px;
		background: #ddd;
		height: 100%;
	}
</style>

