import vuex from 'vuex'
import vue from 'vue'
import utils from '../utils/index'
import http from '../utils/http'
vue.use(vuex)
const store = new vuex.Store({
  state: {
    showLogin: false,
    userInfo: {},
    checkData: {}, // 临时存储选中的数据
    Integral: '', // 积分
    Excount: '' // 次数
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
      return userInfo
    },
    checkData: state => state.checkData,
    Integral: state => state.Integral,
    Excount: state => state.Excount
  },
  actions: {
    updateIntegral({
      dispatch,
      state
    }) {
      http.get('api/user/findByIntegral').then(res => {
        if (res.data.success) {
          state.Integral = res.data.data
        }
      })
    },
    updateExcount({
      dispatch,
      state
    }) {
      http.get('api/orders/findCountByOpenId').then(res => {
        if (res.data.success) {
          state.Excount = res.data.data
        }
      })
    }
  }
})

export default store
