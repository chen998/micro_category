<template>
  <div class="page">
    <div class="top">
      <!-- <h1>欢迎来到智慧环卫</h1> -->
      <div class="userInfo">
        <div
          class="head"
          v-if="!userInfo.avatarUrl"
        >
          <img
            src="/static/img/head.png"
            alt=""
          >
        </div>
        <div
          class="head full"
          v-else
        >
          <img
            :src="userInfo.avatarUrl"
            alt=""
          >
        </div>

        <div
          class="right"
          v-if="userInfo.nickName"
        >
          <div class="row">{{userInfo.nickName}}</div>
          <div
            class="row"
            v-if="!userInfo.phone"
          >
            <button
              open-type="getPhoneNumber"
              class="getPhoneBtn"
              @getphonenumber="getPhoneNumber"
            >点击绑定手机号</button>
          </div>
          <div
            class="row"
            v-else
          >
            <img
              class="icon"
              src="/static/img/phone.png"
              alt=""
            >
            17640150504
          </div>
        </div>
        <div
          class="right"
          v-else
        >
          <button
            open-type="getUserInfo"
            class="submit-us"
            @getuserinfo="getUserInfo"
          >立即登录</button>
        </div>
        <!-- <div class="signWrap">
          <div class="sign">签到</div>
        </div> -->
      </div>
    </div>
    <div class="row-list">
      <div
        class="row"
        @click="$nav('../addressList/main')"
      >
        <div class="left">
          <img
            src="/static/img/address.png"
            alt=""
          >
          地址管理
        </div>
        <div class="right">
          <img
            src="/static/img/right.png"
            alt=""
          >
        </div>
      </div>
      <!-- <div class="row">
        <div class="left">
          <img
            src="/static/img/msg.png"
            alt=""
          >
          联系方式
        </div>
        <div class="right">
          <img
            src="/static/img/right.png"
            alt=""
          >
        </div>
      </div> -->
      <div class="row">
        <div class="left">
          <img
            src="/static/img/huizhang.png"
            alt=""
          >
          成就
        </div>
        <div class="right">
          <img
            src="/static/img/right.png"
            alt=""
          >
        </div>
      </div>
      <div class="row">
        <div class="left">
          <img
            src="/static/img/lipin.png"
            alt=""
          >
          我的礼品
        </div>
        <div class="right">
          <img
            src="/static/img/right.png"
            alt=""
          >
        </div>
      </div>
      <div class="row">
        <div class="left">
          <img
            src="/static/img/feedback.png"
            alt=""
          >
          问题反馈
        </div>
        <div class="right">
          <img
            src="/static/img/right.png"
            alt=""
          >
        </div>
      </div>
      <div class="row">
        <div class="left">
          <img
            src="/static/img/kefu.png"
            alt=""
          >
          联系客服
        </div>
        <div class="right">
          <img
            src="/static/img/right.png"
            alt=""
          >
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.signWrap {
  display: flex;
  align-items: center;
  .sign {
    border-radius: 0.3rem;
    height: 0.5rem;
    padding: 0.05rem 0.2rem;
    letter-spacing: 0.05rem;
    line-height: 0.5rem;
    color: #54bf7b;
    background: #fff;
  }
}
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
  background: #f5f5f5;
  color: #fff;
  font-size: 0.3rem;
  .main {
    margin: 0.3rem;
  }
}
.top {
  background: #54bf7b;
  height: 3.5rem;
  padding: 0.2rem;
  border-radius: 0 0 0.4rem 0.4rem;
  display: flex;
  align-items: center;
  h1 {
    font-weight: bold;
    padding: 0.3rem 0;
    font-size: 0.4rem;
  }
  .userInfo {
    display: flex;
    margin-top: -1rem;
    width: 100%;
    justify-content: space-between;
    .head {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
      background: rgba(222, 222, 222, 0.5);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 0.2rem;
      &.full {
        img {
          width: 100%;
          height: 100%;
        }
      }
      img {
        width: 0.7rem;
        height: 0.7rem;
      }
    }
    .right {
      display: flex;
      flex-flow: column;
      justify-content: space-around;
      flex: 1;
      .icon {
        width: 0.35rem;
        height: 0.35rem;
      }
      .row {
        display: flex;
        flex-flow: wrap;
        align-items: center;
      }
    }
  }
}
.getPhoneBtn {
  width: auto;
  padding: 0 0.1rem;
  height: 0.5rem;
  background: #fff;
  color: #444;
  line-height: 0.5rem;
  font-size: 0.28rem;
  margin: 0;
}
.row-list {
  background: #fff;
  border-radius: 0.2rem;
  margin: 0.2rem;
  margin-top: -1rem;
  color: #444;
  .row {
    display: flex;
    align-items: center;
    padding: 0.3rem;
    border-bottom: 1px solid #f9f9f9;
    justify-content: space-between;
    &:last-child {
      border-bottom: none;
    }
    img {
      width: 0.3rem;
      height: 0.3rem;
    }
    .left {
      display: flex;
      align-items: center;
      img {
        width: 0.4rem;
        height: 0.4rem;
        margin-right: 0.2rem;
      }
    }
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
  computed: {
    ...mapGetters(['userInfo'])
  },
  onLoad () {
  },
  methods: {
    getPhoneNumber(res) {
      console.log(res, 'res')
    },
    getUserInfo () {
      var vm = this
      wx.getUserInfo({
        success: function(res) {
          console.log(res, 'res')
          vm.$store.commit('saveUserInfo', JSON.parse(res.rawData))
        },
        fail (err) {
          console.log(err, 'err')
        }
      })
    }
  }
}
</script>