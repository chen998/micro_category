<template>
  <div class="page">
    <div class="main">
      <!-- <div class="nav">
        <div
          class="navItem"
          :class="{active: tabIndex == 1}"
          @click="tabIndex = 1"
        >环保百科</div>
        <div
          class="navItem"
          :class="{active: tabIndex == 2}"
          @click="tabIndex = 2"
        >社区动态</div>
      </div> -->
      <div class="recordList">
        <div class="content">
          <div
            class="recordItem flex"
            v-for="(item, index) in list"
            :key="index"
          >
            <div class="img">
              <img
                :src="item.productIcon"
                alt=""
              >
            </div>
            <div class="desc">
              <div class="rows mb">
                <span>下单时间: {{item.createTime}}</span>
              </div>
              <div class="t mb">品名: {{item.productName}}</div>
              <div class="price mb">商品价格:{{item.productPrice}}</div>
              <div class="rows">
                <div class="count">兑换数量x{{item.productCount}}</div>
                <div class="Integral">消耗积分 {{item.integral}}</div>
              </div>

            </div>
          </div>
          <div
            class="recordItem none"
            v-if="list.length < 1"
          >
            暂无数据
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.mb {
  margin-bottom: 0.2rem;
}
.pub {
  position: fixed;
  right: 0.3rem;
  bottom: 0.3rem;
  background: #54bf7b;
  color: #fff;
  border-radius: 50%;
  z-index: 99;
  width: 1rem;
  height: 1rem;
  display: flex;
  font-weight: bold;
  font-size: 0.5rem;
  align-items: center;
  justify-content: center;
  img {
    width: 0.6rem;
    height: 0.6rem;
  }
  .overLabel {
    position: absolute;
    bottom: 108%;
    right: 50%;
    margin-right: -0.55rem;
    background: #fff;
    border-radius: 0.2rem;
    box-shadow: #ececec;
    color: #777;
    font-size: 0.24rem;
    text-align: center;
    width: 1.1rem;
    height: 0.55rem;
    line-height: 0.55rem;
    padding: 0.05rem 0.1rem;
  }
}
.flex {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
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
  height: 100%;
  overflow: hidden;
  font-size: 0.3rem;
  position: relative;
  background: #f8f8f8;
  .main {
  }
}
.nav {
  width: 100%;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  z-index: 9;
  height: 1rem;
  justify-content: center;
  border-bottom: 1px solid #ececec;
  .navItem {
    padding: 0.2rem 0.5rem;
    color: #888;
    position: relative;
    &.active {
      color: #49d029;
      &::after {
        content: "";
        position: absolute;
        width: 100%;
        background: #49d029;
        height: 0.05rem;
        bottom: 0;
        left: 0;
      }
    }
  }
}
.recordList {
  width: 100%;
  // margin-top: 1rem;
  // height: calc(100vh - 1rem);
  height: 100vh;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  .recordItem {
    border-radius: 0.2rem;
    color: #444;
    min-height: 2rem;
    margin: 0.2rem;
    overflow: hidden;
    padding: 0.2rem;
    background: #fff;
    display: flex;
    flex-wrap: nowrap;
    .desc {
      color: #888;
      font-size: 0.25rem;
      flex: 1;
      .t {
      }
      .price {
      }
      .rows {
        display: flex;
        justify-content: space-between;
        flex: 1;
        &.right {
        }
        .Integral {
          color: #f22;
        }
      }
    }
    .img {
      width: 1.8rem;
      height: 1.8rem;
      margin-right: 0.3rem;
      border-radius: 0.2rem;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    &.none {
      color: #888;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
<script>
export default {
  data () {
    return {
      list: [],
      tabIndex: 1,
      imgUrls: [
        'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
        'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
        'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
      ],
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000,
      comList: []
    }
  },
  onShow () {
    this.getList()
  },
  methods: {
    nav(item) {
      this.$setStorage('html', item.cyclopediaContent)
      this.$nav('../webview/main')
    },
    getList () {
      this.$get('api/orders/findByOpenId').then(res => {
        if(res.data.success) {
          this.list = res.data.data
          this.list.forEach(v => {
            if (v.productIcon) {
              v.productIcon = this.$baseUrl + v.productIcon.substr(1)
            }
          })
        }
      })
    }
  }
}
</script>