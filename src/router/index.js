import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Person from '@/views/Person'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    component:Login
  },
  {
    path: '/register',
    component:Register
  },
  {
    path: '/person',
    component:Person
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
	if (to.path === "/login") return next();
	const tokenStr = window.sessionStorage.getItem("token");
	if (!tokenStr) return next("/login");
	// !!!最后一定要调用next()方法，不然router不会执行
	next();
});

export default router
