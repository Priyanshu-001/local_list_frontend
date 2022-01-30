import Vue from 'vue'
import Vuex from 'vuex'
// import AxiosAuth from '@/services/AxiosAuth'
// import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{
      name: 'Funky Boi',
      status: 'incomplete',
    },
    baseURL: "http://localhost:80/api/",
    jwt:'heyy',
    refreshToken: window.localStorage.getItem('refreshToken')||'',
    AxiosAuth: null,
  },
  getters:{
    user(state){
      return state.user
    },
    baseURL(state){
      return state.baseURL
    },
    jwt(state){
      return state.jwt
    },
    refreshToken(state){
      return state.refreshToken
    }
  },
  mutations: {
    logout(state){
      state.jwt = ''
      state.refreshToken = ''
      window.localStorage.setItem('refreshToken',null)

    },
    setRefreshToken(state,refreshToken){
      state.refreshToken = refreshToken
    },
    AxiosAuth(state,auth){
      state.AxiosAuth = auth
    },
    baseURL(state,url)
    {
      state.baseURL = url
    }
  },
  actions: {
  
    async logout(context){
      context.commit('logout')      
    },
    async getRefreshToken(context){
      const refreshToken = JSON.parse(window.localStorage.getItem('refreshToken'))
      context.commit('getRefreshToken',refreshToken)
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
