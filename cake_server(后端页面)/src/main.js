import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//导入axios
import axios from 'axios'
axios.defaults.baseURL='http://127.0.0.1:3000'
//在Vue中原型扩展属性
Vue.prototype.axios=axios;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
