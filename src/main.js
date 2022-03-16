import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/libs/reset.css'
import '@/libs/vant.js'
import '@/permission' // permission control
import Mint from 'mint-ui';
Vue.use(Mint);

import bmVlogin from 'bm-vlogin'
Vue.use(bmVlogin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
