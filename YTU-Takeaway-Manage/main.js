
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import AES from '@/js_sdk/ar-aes/ar-aes.js'
Vue.prototype.AES = AES.AES
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif