import vuex from 'vuex'
import vue from 'vue'
import utils from '../utils/index'

vue.use(vuex)
const store = new vuex.Store({
  state: {
    showLogin: false,
    userInfo: {}
  },
  mutations: {
    toggleLogin(state, data) {
      state.showLogin = data
    },
    saveUserInfo(state, data) {
      state.userInfo = data
      utils.setStorage('userInfo', data)
    }
  },
  getters: {
    showLogin: state => state.showLogin,
    userInfo: state => {
      var userInfo = state.userInfo
      if (Object.keys(userInfo).length < 1) {
        userInfo = utils.getStorage('userInfo')
      }
      console.log(userInfo, 'userInfo')
      return userInfo
    }
  },
  actions: {}
})

export default store
