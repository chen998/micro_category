import Vue from 'vue'
import App from './App'
import utils from './utils'
import store from './store'
Vue.config.productionTip = false
App.store = store
App.mpType = 'app'

Vue.prototype.$toast = utils.showToast
Vue.prototype.$store = store
Vue.prototype.$nav = utils.wxNav
Vue.prototype.$setStorage = utils.setStorage
Vue.prototype.$getStorage = utils.getStorage
Vue.prototype.$nav = utils.wxNav

const app = new Vue(App)
app.$mount()
