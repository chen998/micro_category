import Vue from 'vue'
import App from './App'
import utils from './utils'
import store from './store'
import http from './utils/http'
Vue.config.productionTip = false
App.store = store
App.mpType = 'app'

Vue.prototype.$toast = utils.showToast
Vue.prototype.$store = store
Vue.prototype.$nav = utils.wxNav
Vue.prototype.$setStorage = utils.setStorage
Vue.prototype.$getStorage = utils.getStorage
Vue.prototype.$nav = utils.wxNav
Vue.prototype.$req = http.request
Vue.prototype.$post = http.post
Vue.prototype.$get = http.get
Vue.prototype.$ApiUrl = http.ApiUrl
Vue.prototype.$baseUrl = http.baseUrl

Vue.prototype.$login = http.login
Vue.prototype.$checkSession = http.checkSession


const app = new Vue(App)
app.$mount()
