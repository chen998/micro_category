<template>
  <div class="page">
    <div class="list">
      <div
        class="item"
        v-for="(item, index) in list"
        :key="index"
        @click="nav(item)"
      >
        <div class="left">
          <div class="user"><span class="name">{{item.userName}}</span><span class="phone">{{item.phone}}</span></div>
          <div class="addressInfo">
            <span
              class="tag"
              v-if="item.defaultAddress == 1"
            >默认</span>
            {{item.area + item.address}}
          </div>
        </div>
        <div class="edit">
          <img
            src="/static/img/edit.png"
            alt=""
          >
        </div>
      </div>
      <div
        class="item none"
        v-if="list.length < 1"
      >
        暂无收货地址
      </div>
    </div>
    <div class="btnWrap">
      <div
        class="submit"
        @click="$nav('../Add_address/main')"
      >添加收货地址</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page {
  height: 100vh;
  width: 100%;
  background: #f8f8f8;
}
.btnWrap {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  .submit {
    width: 90%;
    height: 0.75rem;
    margin: 0.3rem auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #54bf7b;
    color: #fff;
    border-radius: 0.15rem;
  }
}
.tag {
  color: #54bf7b;
  background: #cdecd8;
  padding: 0.05rem 0.14rem;
  letter-spacing: 0.05rem;
  font-size: 0.24rem;
}
.list {
  height: 100%;
  overflow: scroll;
  color: #555;
  -webkit-overflow-scrolling: touch;
  .item {
    width: 100%;
    display: flex;
    flex-flow: wrap;
    flex-wrap: nowrap;
    background: #fff;
    height: auto;
    border-bottom: 1px solid #f1f1f1;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem 0;
    &.none {
      justify-content: center;
    }
    .left {
      padding-left: 0.2rem;
      display: flex;
      flex-flow: column;
      line-height: 0.5rem;
      width: 85%;
    }
    .user {
      display: flex;
      align-items: flex-end;
      .name {
        font-size: 0.35rem;
        margin-right: 0.2rem;
      }
      .phone {
        font-size: 0.28rem;
        color: #777;
      }
    }
    .addressInfo {
      width: 90%;
      font-size: 0.28rem;
    }
    .edit {
      width: 1rem;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-left: 1px solid #f1f1f1;
      img {
        width: 0.5rem;
        height: 0.5rem;
      }
    }
  }
}
img {
  width: 100%;
  height: 100%;
}
</style>
<script>
export default {
  data () {
    return {
      list: []
    }
  },
  onShow () {
    this.getList()
  },
  methods: {
    getList () {
      this.$get("api/address/findByOpenId").then(res => {
        if (res.data.success) {
          this.list = res.data.data
        }
      })
    },
    nav (item) {
      if (this.$mp.query.select == 1) {
        item.select = 1
        this.$store.commit('SET_CHECKEDDATA', item)
        wx.navigateBack();
      } else {
        this.$nav('../Add_address/main?isEdit=true&item=' + JSON.stringify(item))
      }
    }
  }
}
</script>