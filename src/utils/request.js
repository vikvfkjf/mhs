import axios from 'axios'
import { Dialog,Notify  } from 'vant';
// import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // console.log(store.getters);
    if (getToken) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    console.log(res);
    // if the custom status_code is not 20000, it is judged as an error.
    if (res.status_code !== 200) {
      
      if(res.status_code==2000) {
        // Message({
        //   message: '登录权限已过期，请重新登录',
        //   type: 'error',
        //   duration: 5 * 1000
        // })

        Dialog.confirm({
          title: 'warning',
          message: 'The login privilege has expired, please log in again',
          confirmButtonText:'sure',
          cancelButtonText:'cancel'
        })
        .then(() => {        
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
        .catch(() => {
          // on cancel
        });

        
      }
      return res

      // Message({
      //   message: res.message || 'Error',
      //   type: 'error',
      //   duration: 5 * 1000
      // })

      // // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // if (res.status_code === 50008 || res.status_code === 50012 || res.status_code === 50014) {
      //   // to re-login
      //   MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
      //     confirmButtonText: 'Re-Login',
      //     cancelButtonText: 'Cancel',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('user/resetToken').then(() => {
      //       location.reload()
      //     })
      //   })
      // }
      // return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })

    Notify({ type: 'warning', message: error.message });
    return Promise.reject(error)
  }
)

export default service
