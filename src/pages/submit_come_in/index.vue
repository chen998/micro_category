<template>
  <div class="page">
    <div class="form">
      <div class="rows">
        <div class="label">垃圾名称</div>
        <input
          type="text"
          v-model="form.recycleName"
          placeholder="请输入垃圾名称"
        >
      </div>
      <div class="rows">
        <div class="label">垃圾类别</div>
        <picker
          @change="changeCate"
          :value="selectValue"
          class="spec"
          :range="cateName"
          style="position:relative"
        >
          <view class="picker">
            <span v-if="selectValue == -1">点击选择分类</span> {{cateName[selectValue]}}
          </view>
        </picker>
      </div>
      <div class="rows">
        <div class="label">手机号</div>
        <input
          type="number"
          maxlength="11"
          v-model="form.mobile"
          placeholder="请输入手机号"
        >
      </div>
      <div class="rows">
        <div class="label">收货地址</div>
        <div
          class="input"
          :class="{hasVal: checkData.id}"
          @click="$nav('../addressList/main?select=1')"
        >
          <span>{{checkData.area + checkData.address || '点击选择'}}</span>
          <img
            src="/static/img/right.png"
            alt=""
          >
        </div>
      </div>
      <div class="rows">
        <div class="label">预约时间</div>
        <input
          type="text"
          v-model="form.appointmentTime"
          placeholder="例如: 中午十二点左右"
        >
      </div>
      <div class="rows">
        <div class="label">备注</div>
        <input
          type="text"
          v-model="form.message"
        >
      </div>
      <div class="record us">
        <div class="t">上传图片（1张）</div>
        <div class="imgwrap">
          <div
            class="img-item"
            @click="upload()"
          >
            <img
              v-if="imgUrl"
              :src="baseImgUrl"
            >
            <div
              v-if="imgUrl"
              class="del"
              @click.stop="del(index)"
            >
              <img
                src="/static/img/38.png"
                alt=""
              >
            </div>
          </div>
          <img
            @click="upload()"
            src="/static/img/upload_default.png"
            alt=""
            v-if="!imgUrl"
          >
        </div>
      </div>
    </div>
    <div
      class="submit-us"
      @click="save()"
    >提交</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      cateList: [],
      cateName: [],
      selectValue: -1,
      form: {
        recycleName: '',
        appointmentTime: '',
        message: '',
        mobile: '',
        addressId: ''
      },
      imgUrl: '',
      baseImgUrl: ''
    }
  },
  onLoad () {
    if (this.$mp.query.storage == 1) {
      this.form = this.$getStorage('item')
      console.log(this.form, 'form')
    }
    this.getCateList()
  },
  onUnload () {
    this.cateList = []
    this.cateName = []
    this.selectValue = -1
    this.clearForm(this.form)
    this.imgUrl = ''
    this.baseImgUrl = ''
    this.$store.commit('SET_CHECKEDDATA', {})
  },
  computed: {
    ...mapState(['checkData'])
  },
  methods: {
    del () {
      this.imgUrl = ''
    },
    clearForm(data) {
      for (var k in data) {
        data[k] = ''
      }
    },
    upload () {
      var that = this
      wx.chooseImage({
        success: function(res) {
          var tempFilePaths = res.tempFilePaths
          wx.uploadFile({
            url: that.$ApiUrl + 'api/upload', //仅为示例，非真实的接口地址
            filePath: tempFilePaths[0],
            name: 'file',
            formData:{
            },
            success: function(res){
              var data = JSON.parse(res.data).data[0]
              that.imgUrl = data
              that.baseImgUrl = that.$ApiUrl + data.substr(1)
            },
            fail: function (err) {
              console.log(err, 'err')
            }
          })
        }
      })
    },
    changeCate(e) {
      this.selectValue = e.mp.detail.value
    },
    getCateList () {
      this.$get('api/recyclecategory/findAll').then(res => {
        if (res.data.success) {
          this.cateList = res.data.data
          this.cateList.forEach(v => {
            if (v.recycleCategoryName) {
              this.cateName.push(v.recycleCategoryName)
            }
          })
        }
      })
    },
    save() {
      var {form, cateList, selectValue} = this
      console.log(this.form, 'form')
      var data = Object.assign({}, form)
      if (!data.recycleName) {
        this.$toast('请输入垃圾名称!')
        return
      }
      if (!data.mobile) {
        this.$toast('请输入手机号!')
        return
      }
      if (!selectValue) {
        this.$toast('请选择垃圾的分类!')
        return
      }
      if (!this.checkData.id) {
        this.$toast('请选择收获地址!')
        return
      }
      if (!data.appointmentTime) {
        this.$toast('请输入预约时间!')
        return
      }
      data.imgUrl = this.imgUrl
      data.addressId = this.checkData.id
      data.recycleCategoryId = cateList[selectValue].id
      console.log(data, 'data')
      this.$post('api/recycle/save', data).then(res => {
        if (res.data.success) {
          this.$toast('提交成功!')
          setTimeout(() => {
            wx.navigateBack()
          }, 1000)
        } else {
          this.$toast(res.data.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.icon {
  margin-left: 0.2rem;
  width: 0.24rem;
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
  top: 0;
  img {
    height: 0.3rem;
  }
  &.right {
    right: 0.2rem;
    top: 0;
    img {
      width: 0.35rem;
      height: 0.35rem;
    }
  }
}
.page {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: #f5f5f5;
}
.form {
  background: #fff;
}
.rows {
  display: flex;
  justify-content: space-between;
  height: 0.8rem;
  align-items: center;
  padding: 0 0.3rem;
  position: relative;
  flex-wrap: nowrap;
  border-bottom: 1px solid #f1f1f1;
  picker {
    flex: 1;
    text-align: center;
  }
  img {
    width: 0.3rem;
    height: 0.3rem;
  }
  .picker {
    font-size: 0.3rem;
    color: #333;
    flex: 1;
    text-indent: 0.2rem;
    padding: 0.1rem 0;
    color: #fa791a;
    position: relative;
    span {
      color: #888;
    }
  }
  .label {
    width: 1.6rem;
    border-right: 1px solid #f1f1f1;
  }
  input {
    flex: 1;
    font-size: 0.3rem;
    text-align: center;
    padding-left: 0.2rem;
    text-indent: 0.3rem;
  }
  .input {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    color: #888;
    position: relative;
    &.hasVal {
      color: #333;
    }
    img {
      position: absolute;
      right: 0.2rem;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  select {
    flex: 1;
    border: 1px solid #000;
  }
}
.record {
  padding-bottom: 0.25rem;
  border-radius: 0.1rem;
  padding-left: 0.3rem;
  .t {
    display: flex;
    align-items: center;
    height: 0.8rem;
  }
  .imgwrap {
    width: 100%;
    display: flex;
    flex-flow: wrap;
    flex-wrap: nowrap;
    padding: 0.25rem 0;
    .img-item {
      position: relative;
      margin-right: 0.3rem;
      .del {
        position: absolute;
        right: 0;
        top: 0;
        transform: translate(50%, -50%);
        width: 0.35rem;
        height: 0.35rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    img {
      width: 2rem;
      height: 2rem;
    }
  }
}
</style>
