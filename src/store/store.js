import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
	state: {
		token: '',
		startTime: '',
		expires_in: ''
	},
	mutations: {
		setToken(state, { token, startTime, expires_in }) {
			state.token = token;
			state.expires_in = expires_in;
			state.startTime = startTime;
		}
	}
});

export default store;
