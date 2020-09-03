import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import jquery from '../public/js/jquery-1.4.2.min'
//导入axios文件
import axios from 'axios'

//解决重复点击路由跳转报错
import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
return routerPush.call(this, location).catch(error=> error)}

//引入头部全局组件
import header from './components/headers.vue'
//引入脚部组件
import  footer from './components/Footer.vue'

//web服务器的URL地址
axios.defaults.baseURL="http://127.0.0.1:3000/"
Vue.prototype.axios=axios;
// 注册element ui组件
Vue.use(ElementUI);

Vue.component('headers',header);
Vue.component('footers',footer);

Vue.config.productionTip = false




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
