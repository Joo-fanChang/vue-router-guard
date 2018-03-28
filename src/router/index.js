import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/pages/Login.vue';
import Desk from '@/pages/Desk/Desk.vue';
import Public from '@/pages/Desk/Public.vue';
import Admin from '@/pages/Desk/Admin.vue';
import store from '@/store/store.js';
import { Toast } from 'mint-ui';
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
					component: Admin,
					meta: {
						requireAuth: true
					}
				}
			]
		},
		{
			path: '/*',
			name: 'index',
			redirect: '/desk/public'
		}
	]
});

router.beforeEach((to, from, next) => {
	if (to.path == '/login' && Date.now() - store.state.startTime < store.state.expires_in * 1000) {
		next({ path: '/' });
	}
	if (to.meta.requireAuth) {
		// 判断该路由是否需要登录权限
		if (store.state.token) {
			// 通过vuex state获取当前的token是否存在
			if (Date.now() - store.state.startTime < store.state.expires_in * 1000) {
				next();
			}
		} else {
			Toast('登录过期，请重新登录');
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
