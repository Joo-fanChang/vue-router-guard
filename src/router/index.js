import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/pages/Login.vue';
import Desk from '@/pages/Desk/Desk.vue';
import Public from '@/pages/Desk/Public.vue';
import Admin from '@/pages/Desk/Admin.vue';
import store from '@/store/store.js';
Vue.use(Router);

let router = new Router({
	routes: [
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/desk',
			name: 'desk',
			component: Desk,
			children: [
				{
					path: 'public',
					name: 'public',
					component: Public
				},
				{
					path: 'admin',
					name: 'admin',
					component: Admin
				}
			]
		}
	]
});

router.beforeEach((to, from, next) => {
	if (to.meta.requireAuth) {
		// 判断该路由是否需要登录权限
		if (store.state.token) {
			// 通过vuex state获取当前的token是否存在
			next();
		} else {
			next({
				path: '/login',
				query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
			});
		}
	} else {
		next();
	}
});

export default router;
