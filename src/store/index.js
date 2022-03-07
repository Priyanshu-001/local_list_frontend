import Vue from 'vue'
import Vuex from 'vuex'
import jwt_decode from "jwt-decode";
// import AxiosAuth from '@/services/AxiosAuth'
// import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:JSON.parse(window.localStorage.getItem('user')) || {},
    baseURL: "http://localhost:80/api/",
    JWT:'',
    refreshToken: window.localStorage.getItem('refreshToken')||'',
    location_loading:false,
    located: false,
    lat:null,
    long:null,
  },
  getters:{
    type(state){
      return state.user.type || 'guest'
    },
    user(state){
      return state.user
    },
    userType(state){
      return state.user.type
    },
    baseURL(state){
      return state.baseURL
    },
    JWT(state){
      return state.JWT
    },
    refreshToken(state){
      return state.refreshToken
    },
    geoExists(){
      if(window.Geolocation)
        return true
      return false
    },
    located(state){
      return state.located
    },
    coords(state){
      return {lat:state.lat,long:state.long}
    },
    lat(state){
      return state.lat
    },
    long(state){
      return state.long
    }
  },
  mutations: {
    logout(state){
      state.JWT = ''
      state.refreshToken = ''
      state.user = {}
      window.localStorage.setItem('refreshToken',null)

    },
    setRefreshToken(state,refreshToken){
      state.refreshToken = refreshToken
    },
     setJWT(state,JWT){
      state.JWT = JWT
    },
    AxiosAuth(state,auth){
      state.AxiosAuth = auth
    },
    baseURL(state,url)
    {
      state.baseURL = url
    },
    createUser(state,user){
     state.user = user
    },
    getLocation(state,{long,lat}){
      state.long = long
      state.lat = lat
      state.located =true

    },
    locating(state,start){
      state.location_loading = !!start
    },
    clearLocation(state){
      state.location_loading =false
      state.lat = null
      state.long = null
      state.located = false
    }

  },
  actions: {
    async logout(context){
      context.commit('logout')      
    },
    clearLocation(context){
      context.commit('clearLocation')
    },
    async getLocation(context){
      
      function promisePosition(){
        return new Promise((resolve, reject) => 
          navigator.geolocation.getCurrentPosition(resolve, reject)
          )
          }
      context.commit('locating',true)

      try{
        let location = await promisePosition()
        console.log(location.coords)
        context.commit('getLocation',{lat:location.coords.latitude, long:location.coords.longitude})

      }
      catch(error){
        console.log(error)

      }
      finally{
        context.commit('locating',false)
      }
    },
    async setRefreshToken(context,refreshToken){
      await window.localStorage.setItem('refreshToken',refreshToken)
      context.commit('setRefreshToken',refreshToken)      
    },
    async setJWT(context,JWT){
      context.commit('setJWT',JWT)
      const user =  await jwt_decode(context.getters.JWT)
      context.commit('createUser',user)
      window.localStorage.setItem('user',JSON.stringify(context.getters.user))
    },
    setBaseURL(context){
      if(process.env.NODE_ENV === 'development')
        {
          context.commit('baseURL','http://localhost:80/api/')
        }
    }
  },
  modules: {
  }
})
