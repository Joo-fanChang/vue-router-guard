import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/pages/Login.vue';
import Content from '@/pages/Content.vue';
Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/login',
			name: 'Login',
			component: Login
		},
		{
			path: '/content',
			name: 'Content',
			component: Content
		}
	]
});
