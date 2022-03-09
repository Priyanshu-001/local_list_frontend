import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'About',
   
    component: () => import( '../views/About.vue')
  },
   {
    path: '/',
    name: 'Dashboard',

    component: () => import('../views/Dashboard.vue')
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
    fullscrn:false,
    auth:true
      },
    component: ()=>import('../views/ChangeUsername')
  },
  {
    path: '/devices',
    name: 'devices',
    meta :{
    auth:true
      },
    component: ()=>import('../views/Devices')
  },
  {
    path: '/neworder',
    name: 'neworder',
    meta :{
    auth:true,
    typeReq: true,
    type:'customer',
      },
    component: ()=>import('../views/customer/NewOrder')
  },
  {
    path: '/getorder',
    name: 'getorder',
    meta :{
    auth:true,
    typeReq: true,
    type:'partner',

      },
    component: ()=>import('../views/partner/GetOrder')
  },
  {
    path: '/history',
    name: 'past',
    meta :{
    auth:true
      },
    component: ()=>import('../views/History')
  },
  {
    path: '/orders/:id',
    name: 'order',
    meta :{
    auth:true
      },
    component: ()=>import('../views/Order')
  },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next)=>{
 if(to.meta.typeReq && to.meta.type === store.getters.type)
  {
    next()
  }
  else if(to.meta.typeReq)
  {
    next({name: 'Dashboard'})
  }
  else if(to.meta.auth && store.getters.user._id)
  {
    next()
  }
  else if(to.meta.auth)
  {
    next({name:'Dashboard'})
  }
  else{
    next()
  }



})




export default router
