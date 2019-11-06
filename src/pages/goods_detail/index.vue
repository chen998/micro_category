<template>
  <div class="page">
    <div class="main">
      <div class="swiper-wrap">
        <swiper
          :indicator-dots="true"
          :autoplay="autoplay"
          :interval="interval"
          :duration="duration"
          class="swiper"
        >
          <div
            class="swiper-item"
            v-for="(item, index) in imgUrls"
            :key="index"
          >
            <swiper-item>
              <image
                :src="item"
                class="slide-image"
                width="355"
                height="150"
              />
            </swiper-item>
          </div>
        </swiper>
      </div>
    </div>
    <div class="detail">
      <h3>{{info.productName || ''}}</h3>
      <!-- <div class="desc rows_padding">独特设计, 便携大容量, 给你无处不在的安全感</div> -->
      <div class="rows rows_padding">
        <div class="price">
          <span class="val">{{info.productPrice || ''}}</span>
          <span class="label">环保积分</span>
        </div>
        <!-- <span class="sell">已售 162 件</span> -->
      </div>
      <p class="rows rows_padding">
        <span>购买数量: </span>
        <span class="oper">
          <div
            class="left countBtn"
            @click="reduce()"
          >
            <img
              src="/static/img/reduce.png"
              alt=""
            >
          </div>
          <input
            type="number"
            class="input"
            v-model="productCount"
          >
          <div
            class="right countBtn"
            @click="add()"
          ><img
              src="/static/img/add.png"
              alt=""
            ></div>
        </span>
      </p>
    </div>
    <div class="detail">
      <h3>商品详情</h3>
      <div
        class="detailHtml"
        v-html="html"
      >
        <!-- {{info.productDescription}} -->
      </div>
    </div>
    <div class="submit-wrap">
      <div
        class="submit-us"
        @click="submit()"
      >
        立即兑换
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.swiper .wx-swiper-dots.wx-swiper-dots-horizontal {
  margin-bottom: 2rpx;
}
.swiper .wx-swiper-dot {
  width: 40rpx;
  display: inline-flex;
  height: 10rpx;
  margin-left: 20rpx;
  justify-content: space-between;
}
.swiper .wx-swiper-dot::before {
  content: "";
  flex-grow: 1;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8rpx;
}
.swiper .wx-swiper-dot-active::before {
  background: #f22;
}
</style>
<style lang="scss" scoped>
.submit-us {
  background: #49d029;
  color: #fff;
}
.submit-wrap {
  position: fixed;
  background: #fff;
  width: 100%;
  left: 0;
  bottom: 0;
}
.submit-us {
  width: 90%;
  margin: 0.3rem auto;
  padding: 0.2rem 0;
}
.page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  font-size: 0.3rem;
  padding-bottom: 1rem;
  background: #f5f5f5;
  .main {
    padding: 0.25rem;
    background: #fff;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .rows_padding {
    padding: 0.2rem 0;
  }
  .detail {
    background: #fff;
    margin-bottom: 0.2rem;
    text-align: left;
    padding: 0.25rem;
    .desc {
      color: #888;
      font-size: 0.28rem;
      padding-left: 0.1rem;
    }
    h3 {
      font-weight: bold;
      font-size: 0.35rem;
    }
    .price {
      .val {
        font-size: 0.45rem;
        margin-right: 0.15rem;
        color: #49d029;
      }
      .label {
        font-size: 0.26rem;
      }
    }
    .rows {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .sell {
        font-size: 0.26rem;
      }
      .oper {
        display: flex;
        .countBtn {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          background: #49d029;
          font-weight: bold;
          color: #fff;
          text-align: center;
          line-height: 0.5rem;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 0.35rem;
            height: 0.35rem;
          }
        }
        input {
          width: 1rem;
          text-align: center;
          height: 0.5rem;
          margin: 0 0.1rem;
          background: #f5f5f5;
        }
      }
    }
    .detailHtml {
      width: 100%;
      height: auto;
      display: flex;
      margin: 0.2rem 0;
      border-radius: 0.3rem;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
  }
}
.swiper-wrap {
  // 轮播模块
  width: 100%;
  border-radius: 0.3rem;
  overflow: hidden;
  margin: 0 auto;
  margin-top: 0.2rem;
  height: 4rem;
  .swiper,
  image,
  img {
    width: 100%;
    height: 100%;
    border-radius: 0.3rem;
  }
}
</style>
<script>
import login from '@/components/login'
export default {
  data () {
    return {
      productCount: 1,
      imgUrls: [
        'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
        'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
        'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
      ],
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000,
      id: '',
      info: {},
	  serverSrc: "http://mengzhou.nat300.top",
	  html:''
    }
  },
  components: {
    login
  },
  watch: {
    productCount (nv, ov) {
      console.log(nv, 'nv')
      if (!nv) {
        this.productCount = 1
      }
      if (nv > 99) {
        this.$toast("一次最多兑换99件商品！")
        this.productCount = 99
      }
    }
  },
  onShow () {
    this.id = this.$mp.query.id
    this.getData()
  },
  methods: {
    submit() {
      var data = {
        id: this.id,
        productCount: this.productCount,
        productPrice: this.info.productPrice,
        productIcon: this.info.productIcon,
        productName: this.info.productName
      }
      this.$nav('../submit_order/main?data=' + JSON.stringify(data))
    },
    getData () {
      this.$get('api/product/findById', {id: this.id}).then(res => {
        if (res.data.success) {
          var info = res.data.data
          this.info = info
          var arr = []
          info.productIcon = this.$ApiUrl + info.productIcon.substr(1)
          arr.push(info.productIcon)
          this.imgUrls = arr;
          //获取html数据
          let textareaHtml = res.data.data.productDescription; 
          var srcReg = /src=([\'\"]?([^\'\"]*)[\'\"]?)/ig;
          textareaHtml = textareaHtml.replace(srcReg,"src='"+this.serverSrc+"$2"+"'");
          this.html = textareaHtml;
        }
      })
    },
    add () {
      var productCount = this.productCount
      productCount++
      if (productCount > 99) {
        this.$toast('每次最多兑换99件商品!')
      }
      this.productCount = ++this.productCount < 99 ? this.productCount : 99
    },
    reduce () {
      this.productCount = --this.productCount < 1 ? 1 : this.productCount
    },
    getUserInfo () {
      var that = this
      wx.getUserInfo({
        success: function (res) {
          that.$toast('登录成功!')
        }
      })
    }
  }
}
</script>