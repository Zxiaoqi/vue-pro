import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'
import './assets/css/icon.css'
import Vant, { Toast } from "vant";
import "vant/lib/index.css";

Vue.use(Vant);


import axios from "axios";
// 先设置http://liangwei.tech:3000,http://127.0.0.1:3000
axios.defaults.baseURL = "http://127.0.0.1:3000";

axios.interceptors.request.use(
	config => {
		// 在发送请求之前做些什么
		config.headers.Authorization = window.sessionStorage.getItem("token");
		return config;
	},
	error => {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);
axios.interceptors.response.use(
	res => { 
		const { statusCode } = res.data
		let regexp = /^4\d\d$/
		if (statusCode && regexp.test(statusCode)) { 
			Toast('数据出错')
		}
		return res
	},
	error => {
		return Promise.reject(error)
	}
);
   
axios.interceptors.response.use({

})
Vue.prototype.$http = axios;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
