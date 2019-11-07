/*
入口文件
 */
import Vue from 'vue'
import {Button} from 'mint-ui'
import VueLazyload from 'vue-lazyload'
import App from './App.vue'
import router from './router/router.js'
import store from './store'
import '../src/icon/font_1362018_6qxbhkq37wm/iconfont.css'
import loading from './common/image/loading.gif'

import './mock/mockServer'  //加载mockServer.js文件
import './filters'
//注册全局组件标签
Vue.component(Button.name,Button)
Vue.use(VueLazyload, {
  loading
})

export default new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
