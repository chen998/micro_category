function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

function wxNav(url, type, item = '', delta) {
  type = parseInt(type)
  item = item ? JSON.stringify(item) : ''
  url = item ? url + '?' + item : url
  switch (type) {
    case 1:
      wx.redirectTo({
        url: url
      })
      break
    case 2:
      wx.switchTab({
        // 必须是在tabBar数组里面注册过的
        url: url
      })
      break
    case 3:
      wx.navigateBack({
        delta: delta
      })
      break
    case 4:
      wx.reLaunch({
        // 销毁当前页面
        url: url
      })
      break
    default:
      wx.navigateTo({
        url: url
      })
      break
  }
}

function showToast(text) {
  wx.showToast({
    title: text,
    icon: 'none',
    mask: true,
    duration: 1500
  })
}

function setStorage(key, val) {
  wx.setStorage({
    key: key,
    data: val
  })
}

function getStorage(key) {
  return wx.getStorageSync(key)
}
export default {
  formatNumber,
  formatTime,
  showToast,
  wxNav,
  getStorage,
  setStorage
}
