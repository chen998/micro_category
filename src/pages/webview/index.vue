<template>
  <div class="page">
    <div
      v-if="title"
      class="title"
    >{{title}}</div>
    <div
      class="html"
      v-html="html"
    ></div>
  </div>
</template>
<style lang="scss" scoped>
.page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  background: #f5f5f5;
  font-size: 0.3rem;
  .main {
    margin: 0.3rem;
  }
}
.html {
  width: 100%;
  height: auto;
}
</style>
<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      html: '',
      title: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  onLoad () {
    this.title = this.$mp.query.title
    this.html = this.$getStorage('html')
  },
  methods: {
    sign () {
      this.$get('api/signin/userSignin').then(res => {
        if (res.data.success) {
          this.$toast(res.data.msg)
        }
      })
    },
    getPhoneNumber(res) {
      console.log(res, 'res')
    },
    getUserInfo () {
      var vm = this
      wx.getUserInfo({
        success: res => {
          var rawData = JSON.parse(res.rawData)
          vm.$post('api/user/save', rawData).then(res => {
            if (res.data.success) {
              this.$toast('登录成功!')
            }
          })
          vm.$store.commit('saveUserInfo', rawData)
        },
        fail (err) {
          console.log(err, 'err')
        }
      })
    }
  }
}
</script>