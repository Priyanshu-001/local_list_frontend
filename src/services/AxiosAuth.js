import axios from 'axios'
import store from '@/store/index.js'

      
     
      const AxiosAuth = axios.create({
      baseURL: store.getters.baseURL,
      headers:{
        "Content-Type": "application/json"
      }
    })

    //Requests
    AxiosAuth.interceptors.request.use(config=>{

      config.headers['Authorization'] = store.getters.JWT
      return config
    },
    err=>{ return Promise.reject(err)}
    )
       
    //response
    AxiosAuth.interceptors.response.use(
      res=>{ return res },
      async err=>{

        if(err.response && err.response.status === 401 && !err.config._retry &&err.config.url!=`/refreshToken`)
          { 
            err.config._retry = true
            try{
              const rs = await AxiosAuth.post('/refreshToken',{
                refreshToken: store.getters.refreshToken
              })
              const {JWT} = rs.data
              store.dispatch('setJWT',JWT)
              return AxiosAuth(err.config)

            }
            catch(err){
              return Promise.reject(err)
            }
          }
          else if(err.response && err.response.status === 401){
            store.dispatch('invalidateRefresh')
          }
          return Promise.reject(err)
      }
      )
    async function logout(){
      store.dispatch('logout')
      AxiosAuth.post('/logout')
      .then(res=>{
        if(res.status===200)
        
        return Promise.resolve({success:true})

      })
      .catch(error=>{
        return Promise.reject(error)
      })
    }
    export {logout}
    export default AxiosAuth
