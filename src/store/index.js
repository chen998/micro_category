import vuex from 'vuex'
import vue from 'vue'
import utils from '../utils/index'

vue.use(vuex)
const store = new vuex.Store({
  state: {
    showLogin: false,
    userInfo: {},
    checkData: {} // 临时存储选中的数据
  },
  mutations: {
    toggleLogin(state, data) {
      state.showLogin = data
    },
    SET_CHECKEDDATA(state, data) {
      state.checkData = data
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
    },
    checkData: state => state.checkData
  },
  actions: {}
})

export default store
