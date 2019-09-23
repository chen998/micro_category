<template>
  <div class="page">
    <div class="head">
      <h1>登录/注册</h1>
      <img
        src="/static/img/close.png"
        alt=""
      >
    </div>
    <div class="input-wrap">
      <img
        src="/static/img/phone.png"
        alt=""
      >
      <input
        type="number"
        v-model="phone"
        placeholder="请输入手机号码"
      >
    </div>
    <button class="submit-us">获取验证码</button>
  </div>
</template>
<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
}
.page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  background: #fff;
  font-size: 0.3rem;
  .main {
    margin: 0.3rem;
  }
}
.head {
  display: flex;
  justify-content: space-between;
}
.input-wrap {
  display: flex;
  margin: 2rem 0.25rem;
  img {
    width: 0.3rem;
    height: 0.3rem;
  }
}
</style>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>