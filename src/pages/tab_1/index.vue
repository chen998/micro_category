<template>
  <div class="page">
    <div class="main">
      <div class="swiper-wrap">
        <swiper
          :indicator-dots="indicatorDots"
          :autoplay="autoplay"
          :interval="interval"
          :duration="duration"
          class="swiper"
        >
          <div
            class="swiper-item"
            v-for="(item, index) in advertList"
            :key="index"
          >
            <swiper-item>
              <image
                :src="item.image"
                class="slide-image"
                width="355"
                height="150"
              />
            </swiper-item>
          </div>
        </swiper>
      </div>
      <div class="menu-wrap opac">
        <div
          class="menu-item"
          @click="sign()"
        >
          <div class="icon icon1">
            <img
              src="/static/img/home_icon1.png"
              alt=""
            >
          </div>
          每日签到
        </div>
        <div
          class="menu-item"
          @click="$nav('../partners/main')"
        >
          <div class="icon icon2">
            <img
              src="/static/img/home_icon2.png"
              alt=""
            >
          </div>
          公益伙伴
        </div>
        <div
          class="menu-item"
          @click="getScancode()"
        >
          <div class="icon icon3">
            <img
              src="/static/img/home_icon3.png"
              alt=""
            >
          </div>
          扫码投递
        </div>
        <!-- <div class="menu-item">
          <div class="icon icon4">
            <img
              src="/static/img/home_icon4.png"
              alt=""
            >
          </div>
          回收分类
        </div> -->
        <div class="menu-item">
          <div class="icon icon5">
            <img
              src="/static/img/home_icon5.png"
              alt=""
            >
          </div>
          回收指南
        </div>
      </div>
      <div class="advert-wrap opac">
        <div class="advert-item">
          <div class="left">
            <h2>大件回收</h2>
            <!-- <span>一起养狗赚环保金</span> -->
          </div>
          <img
            src="/static/img/advert_icon1.png"
            alt=""
          >
        </div>
        <div class="advert-item">
          <div class="left">
            <h2>积分商城</h2>
            <!-- <span>足不出户在线下单</span> -->
          </div>
          <img
            src="/static/img/advert_icon2.png"
            alt=""
          >
        </div>
      </div>
      <div class="login opac">
        <div class="t">我的环保积分</div>
        <!-- <div
          class="btn"
          @click="$store.commit('toggleLogin', true)"
        >登录/注册</div> -->
        <div
          class="userInfo"
          v-if="true"
        >
          <div class="left">
            <div class="account">
              <span class="num">0</span>
              <div class="title">当前积分</div>
            </div>
          </div>
          <div class="right">
            <div class="account">
              <span class="num">0</span>
              <div class="title">投递次数</div>
            </div>
            <div class="account">
              <span class="num">0</span>
              <div class="title">兑换次数</div>
            </div>
          </div>
        </div>
        <button
          v-else
          class="btn"
          open-type="getUserInfo"
          @getuserinfo="getUserInfo"
        >微信一键登录</button>
      </div>
      <div class="address-wrap">
        <div
          class="showAll"
          @click="$nav('../map/main')"
        >
          <span>附近的站点</span>
          更多
          <img
            src="/static/img/right.png"
            alt=""
          >
        </div>
        <div class="left">
          <div class="t">
            {{markerData.cabinetName}}
            <span class="status">正常</span>
          </div>
          <div class="meter">
            距离{{markerData.dist}}
          </div>
        </div>
        <div
          class="right"
          @click="openLocation(markerData)"
        >
          <img
            src="/static/img/nav.png"
            alt=""
          >
          导航
        </div>
      </div>
    </div>
    <login />
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
  background: #fafafa;
  font-size: 0.3rem;
  .main {
    margin: 0.3rem;
  }
}
.swiper-wrap {
  // 轮播模块
  width: 100%;
  border-radius: 0.3rem;
  overflow: hidden;
  margin: 0 auto;
  margin-top: 0.2rem;
  height: 3.7rem;
  .swiper,
  image,
  img {
    width: 100%;
    height: 100%;
    border-radius: 0.3rem;
  }
}
.menu-wrap {
  display: flex;
  margin: 0.3rem 0;
  border-radius: 0.2rem;
  flex-wrap: nowrap;
  justify-content: space-around;
  // background: #fff;
  .menu-item {
    display: flex;
    flex-flow: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    padding: 0.2rem 0;
    color: #888;
    font-size: 0.25rem;
  }
  .icon {
    width: 0.95rem;
    height: 0.95rem;
    margin-bottom: 0.1rem;
    border-radius: 50%;
    background: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 0.45rem;
      height: 0.45rem;
    }
    &.icon1 {
      background: linear-gradient(#c4b6f0, #aa91f2, #c4b6f0);
    }
    &.icon2 {
      background: linear-gradient(#eea4ae, #fc8998, #eea4ae);
    }
    &.icon3 {
      background: linear-gradient(#f1d386, #f6c856, #f1d386);
    }
    &.icon4 {
      background: linear-gradient(#9ec6f3, #7fb8fb, #9ec6f3);
    }
    &.icon5 {
      background: linear-gradient(#aee9bc, #81ec9a, #aee9bc);
    }
  }
}
.advert-wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .advert-item {
    flex: 1;
    margin-right: 0.19rem;
    padding: 0.25rem;
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-end;
    white-space: nowrap;
    overflow: hidden;
    background: #fff;
    // border: 0.02rem solid #efefef;
    box-shadow: 0.02rem 0.02rem 0.02rem #efefef;
    border-radius: 0.2rem;
    .left {
      height: 100%;
    }
    img {
      width: 1rem;
      margin-top: 0.3rem;
      height: 0.8rem;
    }
    &:last-child {
      margin-right: 0;
      margin-left: 0.25rem;
    }
    h2 {
      font-weight: bold;
      font-size: 0.3rem;
    }
    span {
      font-size: 0.25rem;
      color: #999;
    }
  }
}
.login {
  height: 2.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  margin: 0.3rem 0;
  // background: #fff;
  border-radius: 0.2rem;
  .btn {
    width: 3rem;
    height: 0.75rem;
    line-height: 0.75rem;
    border-radius: 0.5rem;
    font-size: 0.28rem;
    text-align: center;
    background: linear-gradient(#ff0, #fe3);
  }
  .t {
    position: absolute;
    left: 0.2rem;
    top: 0.2rem;
    padding-left: 0.15rem;
    &::after {
      content: "";
      height: 0.2rem;
      width: 0.05rem;
      background: #0f0;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      box-shadow: 0.04rem 0.04rem 0.04rem #ccc;
    }
  }
}
.address-wrap {
  padding: 0.3rem 0.2rem;
  margin: 0;
  border-radius: 0.2rem;
  background: #fefefe;
  box-shadow: 0 0 0.04rem #dfdfdf;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 0.3rem;
  color: #333;
  .showAll {
    width: 100%;
    text-align: right;
    color: #888;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    span {
      display: flex;
      flex: 1;
      text-align: left;
    }
    img {
      width: 0.35rem;
      height: 0.35rem;
    }
  }
  .left,
  .right {
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
  }
  .right {
    margin-right: 0.2rem;
    img {
      margin-bottom: 0.1rem;
    }
  }
  .left {
    align-items: flex-start;
    .t {
      padding-bottom: 0.2rem;
    }
    .status {
      border: 1px solid #54bf7b;
      padding: 0.05rem 0.1rem;
      color: #54bf7b;
      font-size: 0.26rem;
      border-radius: 0.1rem;
    }
  }
  img {
    width: 0.7rem;
    height: 0.7rem;
  }
  .meter {
    color: #777;
    font-size: 0.28rem;
  }
}
.userInfo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;
  width: 100%;
  padding: 0.3rem;
  margin-top: 0.3rem;
  .left {
    width: 50%;
    display: flex;
    justify-content: flex-start;
  }
  .right {
    display: flex;
    align-items: center;
  }
  .account {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    margin-right: 0.2rem;
    .num {
      font-size: 0.4rem;
      margin-bottom: 0.15rem;
      font-weight: bold;
    }
    .title {
      color: #888;
      font-size: 0.26rem;
    }
  }
}
</style>
<script>
import login from '@/components/login'
export default {
  data () {
    return {
      advertList: [],
      imgUrls: [
        'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
        'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
        'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
      ],
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000,
      lng: '',
      lat: '',
      markerData: {},
      form: {
        lat: '',
        lon: ''
      }
    }
  },
  components: {
    login
  },
  onShow () {
    this.init()
    this.getAdvert()
  },
  methods: {
    sign () {
      this.$get('api/signin/userSignin').then(res => {
        if (res.data.success) {
          this.$toast(res.data.msg)
        }
      })
    },
    openLocation (item) {
        wx.openLocation({
          longitude: Number(item.longitude),
          latitude: Number(item.latitude),
          name: item.cabinetName
        })
    },
    getAdvert () {
      this.$get('api/slideShow/findAll').then(res => {
        if(res.data.success) {
          var list = res.data.data
          list.forEach(v => {
            if (v.image) {
              v.image = this.$ApiUrl + v.image.substr(1)
            }
          })
          this.advertList = list
        }
      })
    },
    init () {
      // var myAmapFun = new map.AMapWX({key:'8ad7ec1548a1382ea34e488b63f14c47'});
      var that = this
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          that.form.lon = res.longitude
          that.form.lat = res.latitude
          that.getData()
        }
      })
    },
    getData () {
      this.$get('api/cabinetlocation/findNearby', this.form).then(res => {
        if (res.data.success) {
          var markerData = res.data.data[0]
          markerData.dist = (markerData.dist / 1000).toFixed(2) + 'km'
          this.markerData = markerData
        }
      })
    },
    getUserInfo () {
      var that = this
      wx.getUserInfo({
        success: function (res) {
          that.$toast('登录成功!')
        }
      })
    },
    getScancode:function(){
      var _this=this;
      wx.scanCode({
        onlyFromCamera: true,
        success: (res) => {
          console.log(res)
        }
      })
    }
  }
}
</script>