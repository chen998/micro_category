<template>
  <div class="page">
    <div class="main">
      <div class="desc">
        <textarea
          name=""
          placeholder="分享新鲜事..."
          id=""
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <div class="img_modules">
        <!-- <div
          class="img-item"
          v-for="(item, index) in imgs"
          :key="index"
          @click="upload(false, index)"
        >
          <img
            :src="item"
            alt=""
          >
        </div> -->
        <div
          class="img-item"
          v-if="imgUrl"
          @click="upload()"
        >
          <img
            :src="imgUrl"
            alt=""
          >
        </div>
        <div
          v-else
          class="default"
          @click="upload()"
        >
          <img
            src="/static/img/camera.png"
            alt=""
          >
        </div>
      </div>
    </div>

    <div
      class="submit-us"
      @click="save()"
    >发布</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      imgs: [],
      communityContent: '',
      imgUrl: ''
    }
  },
  onLoad () {
    this.imgs = []
  },
  onUnload () {
    imgs: []
  },
  computed: {
    ...mapState(['checkData'])
  },
  methods: {
    upload () {
      var that = this
      wx.chooseImage({
        success: function(res) {
          var tempFilePaths = res.tempFilePaths
          wx.uploadFile({
            url: that.$ApiUrl + 'api/upload', //仅为示例，非真实的接口地址
            filePath: tempFilePaths[0],
            name: 'file',
            success: function(res){
              var data = JSON.parse(res.data).data[0]
              var img = that.$ApiUrl + data.substr(1)
              that.imgUrl = img
            },
            fail: function (err) {
              console.log(err, 'err')
            }
          })
        }
      })
    },
    del () {
      this.imgUrl = ''
    },
    clearForm(data) {
      for (var k in data) {
        data[k] = ''
      }
    },
    save() {
      if (this.communityContent.length < 1 && !this.imgUrl) {
        this.$toast('内容不能为空!')
        return
      }
      var data = {
        communityIcon: this.imgUrl,
        communityContent: this.communityContent,
        area: this.$getStorage('nearData').cabinetName
      }
      this.$post('api/community/save', data).then(res => {
        if (res.data.success) {
          this.$toast('发布成功，等待系统审核!')
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
.main {
  background: #fff;
  margin-top: 0.2rem;
}
.img_modules {
  display: flex;
  flex-wrap: wrap;
  .default {
    background: #f1f1f1;
    height: 2.2rem;
    width: 2.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 0.7rem;
      height: 0.7rem;
    }
  }
  .img-item {
    width: 2.2rem;
    height: 2.2rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.desc {
  textarea {
    position: relative;
    top: 0;
    left: 0;
    padding: 0.2rem;
    display: flex;
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
