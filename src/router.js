import { createRouter, createWebHistory } from "vue-router";
import UserIndex from './components/UserIndex.vue'
import OrderIndex from './components/OrderIndex.vue'
import UserLogin from './components/login/Login.vue'
import Home from './components/Home.vue'
import UserSignUp from './components/login/Signup.vue'
import UserCreate from './components/userform/UserForm.vue'
import OrderCreate from './components/orderform/OrderAddForm.vue'
import Profile from './components/login/Profile.vue'
import OrdersCSV from './components/csv/CSVupload.vue'

const routes = [
    {
		path: '/',
		name: 'home',
        component: Home,
    },
    {
		path: '/profile',
		name: 'profile',
        component: Profile,
    },
    {
		path: '/couriers',
		name: 'couriers',
        component: UserIndex,
    },
    {
		path: '/orders',
		name: 'orders',
        component: OrderIndex,
    },
    
	{
		path: '/Login',
		name: 'login',
        component: UserLogin,
    },
    {
		path: '/SignUp',
		name: 'signup',
        component: UserSignUp,
    },
    {
        path:'/newCourier',
        name:'UserForm',
        component: UserCreate
    },
    {
        path:'/newOrder',
        name:'OrderAddForm',
        component: OrderCreate
    },
    {
        path:'/csv',
        name:'OrdersCSV',
        component: OrdersCSV,

    },
  
]
export default createRouter({
	history: createWebHistory(),
	routes
})