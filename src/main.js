/*
入口文件
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import '../src/icon/font_1362018_6qxbhkq37wm/iconfont.css'

export default new Vue({
  el: '#app',
  render: h => h(App),
  router
})
