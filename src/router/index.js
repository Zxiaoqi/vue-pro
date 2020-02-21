import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Person from '@/views/Person'
import MyFocus from '@/views/MyFocus'
import EditUser from "@/views/EditUser";
import ToEditUser from "@/views/ToEditUser";
import MyCollection from "@/views/MyCollection";
import Index from '@/views/Index'
import Search from '@/views/Search'
import CategoryList from "@/views/CategoryList";
import ArtDetail from "@/views/ArtDetail";
import UserComment from "@/views/UserComment";
import MoreComment from "@/views/MoreComment";
Vue.use(VueRouter)

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home
	},
	{
		path: "/login",
		component: Login
	},
	{
		path: "/register",
		component: Register
	},
	{
		path: "/person",
		component: Person
	},
	{
		path: "/myfocus",
		component: MyFocus
	},
	{
		path: "/edituser",
		component: EditUser
	},
	{
		path: "/edit",
		component: ToEditUser
	},
	{
		path: "/collection",
		component: MyCollection
	},
	{
		path: "/index",
		component: Index
	},
	{
		path: "/search",
		component: Search
	},
	{
		path: "/category",
		component: CategoryList
	},
	{
		path: "/artdetail",
		component: ArtDetail
	},
	{
		path: "/useromment",
		component: UserComment
	},
	{
		path: "/morecomment",
		component: MoreComment
	}
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
	if (to.path === "/login") return next();
	const tokenStr = window.sessionStorage.getItem("token");
	// next("/login");
	const topath = [
		'/person',
		'/register'
	]
	if (topath.indexOf(to.path) > -1) {
		if (tokenStr) { 
			return next()
		}else {
			return router.push("/login");
		} 
	} 
	// !!!最后一定要调用next()方法，不然router不会执行
	next();
});

export default router
