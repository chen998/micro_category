<template>
  <div class="page">
    <div class="top">
      <img
        src="/static/img/mohu.jpg"
        alt=""
      >
    </div>
    <div
      class="role"
      v-for="(item, index) in list"
      :key="index"
      @click="nav(item)"
    >
      <div class="t">{{item.recruitmentName}}</div>
      <!-- <div class="desc rows">
        <view class="label">职位描述: </view>
        <view v-html="item.recruitmentContent"></view>
      </div> -->
      <div class="contacts rows">
        <view class="label">联系人: </view>{{item.contacts}}
      </div>
      <div class="contacts rows">
        <view class="label">联系电话: </view>{{item.mobilePhone}}
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page {
  height: 100vh;
  width: 100%;
  font-size: 0.3rem;
  background: #f6f6f6;
}
.top {
  width: 100%;
  height: 3rem;
}
img {
  width: 100%;
  height: 100%;
}
.rows {
  display: flex;
}
.role {
  display: flex;
  margin: 0.25rem;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  background: #fff;
  border-radius: 0.1rem;
  padding: 0.25rem;
  .t {
    font-weight: bold;
    margin-bottom: 0.2rem;
  }
  .desc {
    font-size: 0.27rem;
    color: #777;
  }
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
    this.getData()
  },
  methods: {
    nav(item) {
      this.$setStorage('html', item.recruitmentContent)
      this.$nav("../webview/main")
    },
    getData () {
      this.$get('api/recruitment/findAll').then(res => {
        if (res.data.success) {
          this.list = res.data.data
        }
      })
    }
  }
}
</script>