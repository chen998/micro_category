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
      <div class="rows sw">
        <div class="label">预约时间</div>
        <div class="right">
          <view
            class="picker"
            @click="showTimePicker = !showTimePicker;"
          >
            <span v-if="!form.appointmentTime">点击选择</span>
            {{form.appointmentTime}}
          </view>
          <img
            src="/static/img/3.png"
            alt=""
          >
        </div>
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
    <div
      class="over"
      v-if="showTimePicker"
      @click="showTimePicker = false"
    ></div>
    <picker-view
      class="timePicker"
      indicator-style="border-top: 1px solid #00E800;border-bottom: 1px solid #00E800;font-size: 0.7rem;"
      :class="{show: showTimePicker}"
      :pickend="true"
      @change="changeTime($event)"
    >
      <view class="oper">
        <span @click="showTimePicker = false">取消</span>
        <span @click="pickerConfirm()">确定</span>
      </view>
      <picker-view-column
        class="pickerViewCol"
        :value="monthIndex"
      >
        <view
          v-for="item in month"
          :key="item"
        >{{item}}月</view>
      </picker-view-column>
      <picker-view-column
        class="pickerViewCol"
        :value="dateIndex"
      >
        <view
          v-for="item in date"
          :key="item"
        >{{item.v}}号</view>
      </picker-view-column>
      <picker-view-column
        class="pickerViewCol"
        :value="hoursIndex"
      >
        <view
          v-for="item in hours"
          :key="item"
        >{{item}}时</view>
      </picker-view-column>
      <picker-view-column
        class="pickerViewCol"
        :value="minIndex"
      >
        <view
          v-for="item in min"
          :key="item"
        >{{item}}分</view>
      </picker-view-column>
    </picker-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      cateList: [],
      cateName: [],
      showTimePicker: false,
      hours: [
        '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
      ],
      min: ['00', '10', '20', '30', '40', '50', '00'],
      selectValue: -1,
      form: {
        recycleName: '',
        appointmentTime: '',
        message: '',
        mobile: '',
        addressId: ''
      },
      imgUrl: '',
      baseImgUrl: '',
      hoursIndex: -1,
      minIndex: -1,
      date: [],
      month: [1,2,3,4,5,6,7,8,9,10,11,12],
      dateIndex: -1,
      monthIndex: -1
    }
  },
  onLoad () {
    if (this.$mp.query.storage == 1) {
      this.form = this.$getStorage('item')
      console.log(this.form, 'form')
    }
    this.getCateList()
    this.getDate()
  },
  onShow() {
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
    getDate() {
      var date = new Date().getDate()
      var max = date + 30
      var dateArr = []
      for (var i = 1; i< max; i++) {
        dateArr.push({v: i > 30 ? i -30 : i})
      }
      this.date = dateArr
    },
    pickerConfirm (keys) {
      this.showTimePicker = false
    },
    changeTime (e) {
      let {hours, min, month, date} = this
      let index = e.mp.detail.value
      let monthIndex = index[0]
      let dateIndex = index[1]
      let hoursIndex = index[2]
      let minIndex = index[3]
      month = month[monthIndex]
      date = date[dateIndex].v
      hours = hours[hoursIndex]
      min = min[minIndex]
      console.log(month, date, hours, min, 'mmmmm')
      this.hoursIndex = hoursIndex
      this.minIndex = minIndex
      this.form['appointmentTime'] = month + '月' + date + '日 ' + hours + ':' + min
    },
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
.over {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99;
  background: rgba(66, 66, 66, 0.5);
}
.timePicker {
  position: fixed;
  bottom: -100%;
  left: 0;
  width: 100%;
  height: 45vh;
  z-index: 999;
  text-align: center;
  background: #fff;
  opacity: 1;
  transition: bottom 0.3s;
  &.show {
    bottom: 0;
  }
  .oper {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    height: 0.8rem;
    font-size: 0.35rem;
    align-items: center;
    flex-flow: wrap;
    width: 95%;
    padding: 0 20rpx;
    justify-content: space-between;
    color: #29d462;
    border-bottom: 2rpx solid #f2f2f2;
    z-index: 9;
    span:first-child {
      color: #888;
    }
  }
  .pickerViewCol {
    view {
      font-size: 0.35rem;
      height: 0.4rem;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.picker-wrap {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}
.picker {
  font-size: 0.33rem;
  color: #333;
  text-indent: 0.2rem;
  width: 3.8rem;
  text-align: right;
  height: 100%;
  color: #fa791a;
  position: relative;
  white-space: nowrap;
  span {
    color: #888;
  }
}
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
  .right {
    display: flex;
    align-items: center;
    .picker {
      text-align: center;
      padding-right: 0.3rem;
    }
    .date {
      margin-right: 0.2rem;
    }
  }
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
    font-size: 0.3rem;
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
