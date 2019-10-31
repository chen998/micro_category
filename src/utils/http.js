/**
 * Created by 52528 on 2018/12/10.
 */
import tool from './index'
import store from '@/store'
var ApiUrl = 'http://mengzhou.nat300.top/'

function login(method = 'POST') {
  return new Promise((resolve, reject) => {
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: ApiUrl + 'api/login',
            data: {
              code: res.code
            },
            method,
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (res) {
              resolve()
            },
            fail(err) {
              reject(err)
            }
          })
        }
      }
    })
  })
}

function checkSession() {
  wx.checkSession({
    success: function () {
      //获取本地缓存的sessionKey
      var sessionKey = wx.getStorageSync('sessionKey') || '';
      //获取sessionKey如果缓存没有则重新调用login
      wx.request({
        url: 'http://mengzhou.nat300.top/api/findBySessionKey',
        data: {
          sessionKey: sessionKey
        },
        method: 'GET',
        success: function (res) {
          var data = res.data;
          //redis缓存过期,重新调用login
          if (data.success == false) {
            wx.login({
              success: function (res) {
                if (res.code) {
                  // 登录
                  wx.request({
                    url: 'http://mengzhou.nat300.top/api/login',
                    data: {
                      code: res.code
                    },
                    success(res) {
                      var data = res.data;
                      wx.setStorageSync('sessionKey', data.sessionKey); //放入本地缓存
                    }
                  })
                } else {
                  console.log('登录失败！' + res.errMsg)
                }
              }
            })
          }
        },
      })
    },
    fail: function () {
      //sessionKey失效,重新调用login
      wx.login({
        success: function (res) {
          if (res.code) {
            // 登录
            wx.request({
              url: 'http://mengzhou.nat300.top/api/login',
              data: {
                code: res.code
              },
              success(res) {
                var data = res.data;
                wx.setStorageSync('sessionKey', data.sessionKey); //放入本地缓存
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
  })
}

function request(url, params, method = 'POST') {
  var host = ApiUrl
  return new Promise(function (resolve, reject) {
    wx.request({
      url: host + url,
      data: params,
      method: method,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.hideLoading()
        resolve(res)
      },
      fail: function (err) {
        wx.hideLoading()
        reject(err)
      }
    })
  })
}

function post(url, params, method = 'POST') {
  var host = ApiUrl
  params = params || {}
  params.sessionKey = wx.getStorageSync('sessionKey') || ''
  return new Promise(function (resolve, reject) {
    wx.request({
      url: host + url,
      data: params,
      method: method,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.hideLoading()
        resolve(res)
      },
      fail: function (err) {
        wx.hideLoading()
        reject(err)
      }
    })
  })
}

function get(url, params, method = 'GET') {
  var host = ApiUrl
  params = params || {}
  params.sessionKey = wx.getStorageSync('sessionKey') || ''
  return new Promise(function (resolve, reject) {
    wx.request({
      url: host + url,
      data: params,
      method: method,
      header: {
        // 'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.hideLoading()
        resolve(res)
      },
      fail: function (err) {
        wx.hideLoading()
        reject(err)
      }
    })
  })
}
export default {
  post,
  get,
  request,
  login,
  checkSession,
  ApiUrl
}
