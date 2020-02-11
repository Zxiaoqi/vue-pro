import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'
import './assets/css/icon.css'

import axios from "axios";
// 先设置
axios.defaults.baseURL = "http://127.0.0.1:3000/";

Vue.prototype.$http = axios;
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
