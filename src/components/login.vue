<template>
  <div
    class="page"
    :class="{show: showLogin}"
  >
    <div class="main">
      <div class="head">
        <h1>登录/注册</h1>
        <img
          src="/static/img/close.png"
          alt=""
          @click="$store.commit('toggleLogin', false)"
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
  </div>
</template>
<style lang="scss" scoped>
.submit-us {
  width: 80%;
  &::after {
    content: "";
    border: none;
  }
}
img {
  width: 100%;
  height: 100%;
}
.page {
  position: fixed;
  top: 100%;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  font-size: 0.3rem;
  transition: all 0.5s;
  &.show {
    top: 0;
  }
  .main {
    margin: 0.3rem;
  }
}
.head {
  display: flex;
  justify-content: space-between;
  white-space: nowrap;
  font-size: 0.4rem;
  font-weight: bold;
  img {
    width: 0.45rem;
    height: 0.45rem;
  }
}
.input-wrap {
  display: flex;
  margin: 2rem 0.25rem;
  border-bottom: 1px solid #f1f1f1;
  align-items: center;
  padding: 0.2rem 0;
  font-weight: bold;
  img {
    width: 0.45rem;
    height: 0.45rem;
    margin-right: 0.2rem;
  }
}
</style>
<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
    ...mapGetters(['showLogin'])
  }
}
</script>