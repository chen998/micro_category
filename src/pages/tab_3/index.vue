<template>
  <div class="page">
    <div class="top">
      <div class="search-wrap">
        <input
          type="text"
          placeholder="搜索"
          v-model="form.productName"
          @input="getData()"
        />
        <img
          @click="getByScope()"
          src="/static/img/31.png"
          alt
        />
      </div>
    </div>
    <div class="main">
      <div class="goodsList">
        <div
          class="goodsItem"
          v-for="(item, index) in list"
          :key="index"
          @click="$nav('../goods_detail/main?id=' + item.id, 5, item)"
        >
          <div class="goodsImg">
            <img
              :src="item.productIcon"
              alt=""
            >
          </div>
          <div class="goodsName">{{item.productName}}</div>
          <div class="price">
            <span class="integral"><img src="/static/img/integral.png" />{{item.productPrice}}</span>
            <span class="btn">兑换</span>
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
  background: #fff;
  justify-content: center;
  align-items: center;
}
.search-wrap {
  width: 87%;
  height: 0.7rem;
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
  background: #f5f5f5;
  .main {
    display: flex;
    // height: 100vh;
    background: #f5f5f5;
    font-size: 0.28rem;
  }
}
.goodsList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  color: #888;
  background: #fafafa;
  width: 100%;
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
    width: 100%;
  }
  .goodsItem {
    padding: 0.2rem;
    background: #fff;
    box-shadow: 0 0 0.1rem #ececec;
    border-radius: 0.15rem;
    margin: 0.1rem 0;
    width: 43%;
    .goodsImg {
      height: 2.5rem;
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
      .btn {
        background: #49d029;
        color: #fff;
        border-radius: 0.1rem;
        padding: 0 0.1rem;
        font-size: 0.27rem;
      }
      .integral {
        font-size: 0.27rem;
        display: flex;
        align-items: center;
        color: #49d029;
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
      list: [],
      form: {
        productName: ""
      },
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
    this.getData()
  },
  methods: {
    getData () {
      this.$get('api/product/findAll', this.form).then(res => {
        if (res.data.success) {
          var list = res.data.data
          list.forEach(v => {
            if (v.productIcon) {
              v.productIcon = this.$baseUrl + v.productIcon.substr(1)
            }
          })
          this.list = list
          console.log(res, 'res')
        }
      })
    }
  },
  async onPullDownRefresh () {
  // to doing..
  // 停止下拉刷新
    wx.stopPullDownRefresh()
  }
}
</script>