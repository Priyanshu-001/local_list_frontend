import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/:LoginType/login',
    name: 'login',
    meta :{
    fullscrn:true
  },
    component: ()=>import('../views/login')
  },
  {
    path: '/changename',
    name: 'changeName',
    meta :{
    fullscrn:false
      },
    component: ()=>import('../views/ChangeUsername')
  },
  {
    path: '/devices',
    name: 'devices',
    component: ()=>import('../views/Devices')
  },
  {
    path: '/neworder',
    name: 'neworder',
    component: ()=>import('../views/customer/NewOrder')
  },
  {
    path: '/getorder',
    name: 'getorder',
    component: ()=>import('../views/partner/GetOrder')
  },
  {
    path: '/history',
    name: 'past',
    component: ()=>import('../views/History')
  },
  {
    path: '/orders/:id',
    name: 'order',
    component: ()=>import('../views/Order')
  },
  {
    path: '/ActiveOrders',
    name: 'current',
    component: ()=>import('../views/Devices')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
