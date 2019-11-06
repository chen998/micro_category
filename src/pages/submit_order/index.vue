<template>
  <div class="page">
    <div
      class="address-wrap"
      v-if="hasAddress"
      @click="$nav('../addressList/main?select=1')"
    >
      <div class="left icon">
        <img
          src="/static/img/address.png"
          alt=""
        >
      </div>
      <div class="user">
        <div class="name">{{addressData.userName}} <span>{{addressData.mobile}}</span></div>
        <div class="address">{{addressData.area}}{{addressData.address}}</div>
      </div>
      <div class="right icon">
        <img
          src="/static/img/right.png"
          alt=""
        >
      </div>
    </div>
    <div
      class="address-wrap"
      v-else
    >
      <div class="left icon">
        <img
          src="/static/img/address.png"
          alt=""
        >
      </div>
      <div class="user">
        暂未设置收货地址 <span
          class="add"
          @click="$('../Add_address/main')"
        >立即添加</span>
      </div>
      <div class="right icon">
        <img
          src="/static/img/right.png"
          alt=""
        >
      </div>
    </div>
    <div class="goodsDetail">
      <div class="img">
        <img
          :src="query.productIcon"
          alt=""
        >
      </div>
      <div class="info">
        <div class="name">{{query.productName}}</div>
        <div class="desc">
          <div class="price">
            <span>{{query.productPrice}}积分/件</span>
            <span>购买数量: {{query.productCount}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="rows">
      <span class="label">商品所需积分</span>
      <span class="val">{{query.productPrice}}积分</span>
    </div>
    <div class="rows">
      <span class="label">兑换数量</span>
      <span class="val">{{query.productCount}}件</span>
    </div>
    <div class="rows">
      <span class="label">合计</span>
      <span class="val">{{total}}积分</span>
    </div>
    <div class="pay-wrap">
      <span class="text">消耗: {{total}}
        <div class="icon">
          <img
            src="/static/img/integral.png"
            alt=""
          >
        </div>
      </span>
      <div class="btn">提交订单</div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      hasAddress: true,
      addressData: {},
      select: 0,
      query: {
        id: '',
        productPrice: '',
        productIcon: '',
        productCount: '',
        productName: ''
      },
      total: ''
    }
  },
  onLoad () {
    var query = JSON.parse(this.$mp.query.data)
    console.log(query, 'query')
    this.query = query
    this.total = (query.productPrice * query.productCount).toFixed(2)
  },
  onShow () {
    this.getAddress()
  },
  computed: {
    ...mapState(['checkData'])
  },
  methods: {
    getAddress(select) {
      this.$get("api/address/findByOpenId").then(res => {
        if (res.data.success) {
          var list = res.data.data
          if (list.length < 1) {
            this.hasAddress = false;
            return
          }
          if (this.checkData.select == 1) {
            this.addressData = this.checkData
          } else {
            this.addressData = list[0]
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.pay-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  height: 1rem;
  width: 100%;
  align-items: center;
  background: #fff;
  .text {
    flex: 1;
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
    align-items: center;
    color: #54bf7b;
    .icon {
      margin-left: 0.1rem;
    }
  }
  .btn {
    width: 3.5rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #54bf7b;
    color: #fff;
  }
}
.page {
  height: 100vh;
  position: relative;
  background: #f5f5f5;
}
.icon {
  width: 0.35rem;
  height: 0.35rem;
  img {
    width: 100%;
    height: 100%;
  }
}
.address-wrap {
  display: flex;
  background: #fff;
  align-items: center;
  // margin: 0.2rem;
  // border-radius: 0.25rem;
  // margin-top: 0.2rem;
  padding: 0.25rem;
  min-height: 1.2rem;
  justify-content: space-between;
  .left {
    margin-right: 0.2rem;
  }
  .user {
    flex: 1;
    .name {
      margin-bottom: 0.15rem;
    }
    .address {
      color: #999;
      font-size: 0.26rem;
    }
  }
  .add {
    color: #54bf7b;
    border-bottom: 1px solid #54bf7b;
  }
}
.goodsDetail {
  display: flex;
  flex-wrap: nowrap;
  padding: 0.2rem;
  align-items: center;
  background: #fff;
  margin: 0.2rem 0;
  img {
    width: 2rem;
    height: 2rem;
    margin-right: 0.2rem;
    border-radius: 0.2rem;
  }
  .info {
    .name {
      margin-bottom: 0.2rem;
    }
    .desc {
      color: #999;
      font-size: 0.28rem;
      .price {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
.rows {
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 0.2rem;
  margin: 0.2rem 0;
}
</style>