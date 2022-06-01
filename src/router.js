import { createRouter, createWebHistory } from "vue-router";
import UserIndex from './components/UserIndex.vue'
import OrderIndex from './components/OrderIndex.vue'
import UserLogin from './components/login/Login.vue'
import Home from './components/Home.vue'
import UserSignUp from './components/login/Signup.vue'
import UserCreate from './components/userform/UserForm.vue'
import OrderCreate from './components/orderform/OrderForm.vue'
import UserEdit from './components/userform/UserEdit.vue'

const routes = [
    {
		path: '/',
		name: 'home',
        component: Home,
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
        name:'OrderForm',
        component: OrderCreate
    },
    {
        path:'/edit/:id',
        name:'user.edit',
        component:UserEdit,
        props:true

    },
  
]
export default createRouter({
	history: createWebHistory(),
	routes
})