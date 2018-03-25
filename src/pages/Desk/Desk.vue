<template>
	<div id="desk">
		<div class="tab-container">
			<router-link to="/desk/public">public</router-link>
			<router-link to="/desk/admin">Admin</router-link>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'desk'
	};

</script>

<style lang="less" scoped>
	#desk {
		height: 100%;
		.tab-container {
			height: 60px;
			width: 100%;
			display: flex;
			background: #fff;

			a {
				color: #333;
				display: block;
				flex: 1;
				height: 60px;
				line-height: 60px;
				text-align: center;
				font-size: 30px;

				&:first-child {
					border-right: 1px solid #ccc;
				}
			}
		}
	}
</style>

