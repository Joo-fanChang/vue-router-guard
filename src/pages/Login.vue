<template>
	<div id="login">
		<div class="avatar">
			<div class="circel">
				<img :src="s" alt="">
			</div>
		</div>
		<div class="inputs">
			<mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
			<mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
		</div>
	</div>
</template>

<script>
	import r from '../assets/logo.png';
	export default {
		name: 'login',
		data() {
			return {
				s: '',
				username: '',
				password: ''
			};
		},
		created: function () {
			this.s = r;
		}
	};

</script>

<style lang="less" scoped>
	#login {
		.avatar {
			margin-top: 20%;
			text-align: center;

			.circel {
				display: inline-block;
				width: 100px;
				height: 100px;

				img {
					width: 100%;
					height: 100%;
				}
			}
		}

		.inputs {
			margin-top: 20px;
			padding: 0 10px;
		}
	}

</style>
