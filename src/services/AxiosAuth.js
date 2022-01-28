import axios from 'axios'
import store from '@/store/index.js'

      
     
      const AxiosAuth = axios.create({
      baseURL: store.getters.baseURL,
      headers:{
        "Content-Type": "application/json"
      }
    })

    AxiosAuth.interceptors.request.use(config=>{

      config.headers['Authorization'] = store.getters.jwt
      return config
    },
    err=>{ return Promise.reject(err)}

    )

    AxiosAuth.interceptors.response.use(
      res=>{ return res },
      async err=>{

        if(err.response && err.response.status === 401 && !err.config._retry &&err.config.url!=`/refreshToken`)
          { 
            err.config._retry = true
            console.log(err.config.url)
            try{
              const rs = await AxiosAuth.post('/refreshToken',{
                refreshToken: store.getters.refreshToken
              })
              const {token} = rs.data
              store.dispatch('jwt',token)
              return AxiosAuth(err.config)

            }
            catch(err){
              return Promise.reject(err)
            }
          }
          return Promise.reject(err)
      }
      )
    async function logout(){
     
      AxiosAuth.post('/logout')
      .then(res=>{
        if(res.status===200)
        store.dispatch('logout')
        return Promise.resolve({success:true})

      })
      .catch(error=>{
        return Promise.reject(error)
      })
    }
    export {logout}
    export default AxiosAuth
