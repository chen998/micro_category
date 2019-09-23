<template>
  <div class="page">
    <div class="top">
      <div class="search-wrap">
        <input
          type="text"
          placeholder="搜索"
        />
        <img
          src="/static/img/Search.png"
          alt
        />
      </div>
    </div>
    <div class="main">
      <div class="cateList">
        <div
          class="cateItem"
          v-for="(item, index) in cateList"
          :key="index"
          :class="{active: cateIndex == index}"
          @click="cateIndex = index"
        >
          {{item.name}}
        </div>
      </div>
      <div class="goodsList">
        <div
          class="goodsItem"
          v-for="(item, index) in 10"
          :key="index"
          @click="$nav('../goods_detail/main', 5, item)"
        >
          <div class="goodsImg">
            <img
              src="https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640"
              alt=""
            >
          </div>
          <div class="goodsName">时尚定制充电宝时尚定制充电宝时尚定制充电宝</div>
          <div class="price">
            <span class="money">￥138.00</span>
            <span class="integral"><img src="/static/img/integral.png" />99</span>
          </div>
        </div>
        <div class="none">没有更多商品啦~</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.top {
  width: 100%;
  height: 8vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-wrap {
  width: 87%;
  height: 0.6rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0.03rem 0.1rem #ececec;
  flex-wrap: nowrap;
  padding: 0 0.2rem;
  background: #fff;
  input {
    width: 80%;
    height: 100%;
  }
  img {
    width: 0.4rem;
    height: 0.4rem;
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
  background: #fff;
  .main {
    display: flex;
    height: 92vh;
    background: #f5f5f5;
    font-size: 0.28rem;
  }
}
.cateList {
  width: 18%;
  background: #f5f5f5;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  .cateItem {
    width: 100%;
    text-align: center;
    padding: 0.15rem 0;
    color: #777;
    position: relative;
    margin: 0.1rem 0;
    &.active {
      background: #fff;
      color: #333;
      font-weight: bold;
      &::after {
        content: "";
        position: absolute;
        left: 0;
        width: 0.08rem;
        height: 0.4rem;
        top: 50%;
        transform: translateY(-50%);
        background: linear-gradient(rgb(243, 140, 140), #f22);
      }
    }
  }
}
.goodsList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  color: #888;
  background: #fafafa;
  width: 82%;
  overflow: scroll;
  padding: 0 0.2rem;
  padding-top: 0.1rem;
  -webkit-overflow-scrolling: touch;
  .none {
    text-align: center;
    margin: 0 auto;
    color: #777;
    font-size: 0.27rem;
    padding: 0.15rem 0;
  }
  .goodsItem {
    width: 41%;
    padding: 0.2rem;
    background: #fff;
    box-shadow: 0 0 0.1rem #ececec;
    border-radius: 0.15rem;
    margin: 0.1rem 0;
    .goodsImg {
      height: 1.8rem;
      border-radius: 0.15rem;
      overflow: hidden;
    }
    .goodsName {
      margin-top: 0.25rem;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      margin-bottom: 0.15rem;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .price {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .integral {
        font-size: 0.27rem;
        color: rgb(240, 216, 109);
        display: flex;
        align-items: center;
        img {
          width: 0.28rem;
          height: 0.28rem;
          margin-right: 0.1rem;
        }
      }
    }
  }
}
</style>
<script>
export default {
  data () {
    return {
      imgUrls: [
        'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
        'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
        'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
      ],
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000,
      cateList: [
        {name: '服装', id: 1},
        {name: '首饰', id: 2},
        {name: '科技', id: 3},
        {name: '宠物', id: 4},
        {name: '食品', id: 5},
        {name: '化妆品', id: 6},
        {name: '家具', id: 7},
        {name: '服装', id: 1},
        {name: '首饰', id: 2},
        {name: '科技', id: 3},
        {name: '宠物', id: 4},
        {name: '食品', id: 5},
        {name: '化妆品', id: 6},
        {name: '家具', id: 7},
        {name: '服装', id: 1},
        {name: '首饰', id: 2},
        {name: '科技', id: 3},
        {name: '宠物', id: 4},
        {name: '食品', id: 5},
        {name: '化妆品', id: 6},
        {name: '家具', id: 7}
      ],
      cateIndex: 0
    }
  },
  onShow () {
    wx.setNavigationBarTitle({
      title: '商城'
    })
  },
  methods: {
  },
  async onPullDownRefresh () {
  // to doing..
  // 停止下拉刷新
    wx.stopPullDownRefresh()
  }
}
</script>