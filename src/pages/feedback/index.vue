<template>
  <div class="page">
    <div class="main">
      <div class="textarea us">
        <div class="t">*问题描述
          <div class="line">
            <img
              src="/static/img/border-bottom.png"
              alt=""
            >
          </div>
        </div>
        <textarea
          v-model="form.content"
          maxlength="500"
          placeholder="请描述您遇到的问题，我们会尽快解决问题，优化产品，提升您的体验。"
        >
        </textarea>
      </div>
      <div class="record us">
        <div class="t">上传凭证（不超过三张）
          <div class="line">
            <img
              src="/static/img/border-bottom.png"
              alt=""
            >
          </div>
        </div>
        <div class="imgwrap">
          <div
            class="img-item"
            v-for="(item, index) in imgs"
            :key="index"
            @click="uploadImg(index, item)"
          >
            <img :src="item.src">
            <div
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
            @click="uploadImg()"
            src="/static/img/upload_default.png"
            alt=""
            v-if="imgs.length < 3"
          >
        </div>
      </div>
      <!-- <div class="user us">
        <div class="rows">
          <div class="label">*联系人</div>
          <input
            type="text"
            maxlength="11"
            placeholder="请输入联系人姓名"
          >
          <div class="line">
            <img
              src="/static/img/border-bottom.png"
              alt=""
            >
          </div>
        </div>
        <div class="rows">
          <div class="label">*电话</div>
          <input
            type="text"
            maxlength="11"
            placeholder="请输入电话号码"
          >
          <div class="line">
            <img
              src="/static/img/border-bottom.png"
              alt=""
            >
          </div>
        </div>
      </div> -->
      <div
        class="submit"
        @click="submit()"
      >提交反馈</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      specDev: this.$store.getters.specDev,
      imgIndex: 0,
      imgs: [],
      form: {
        content: '',
        images: ''
      }
    }
  },
  onUnload () {
    console.log('ha')
  },
  methods: {
    del (index) {
      this.imgs.splice(index, 1)
    },
    submit () {
      if (this.form.content.length < 5) {
        this.$toast('描述不得少于5个字!')
        return
      }
      var data = this.form
      var imgs = []
      this.imgs.forEach(v => {
        imgs.push(v.src)
      })
      data.images = imgs.join(',')
      this.$post('micro/baseService/feedback/add', data).then(res => {
        if (res.data.success) {
          this.$toast('提交成功!')
          setTimeout(() => {
            this.form = ''
            this.images = ''
            this.imgs = []
            this.$router.go(-1)
          }, 1000)
        } else {
          this.$toast(res.data.message)
        }
      })
    },
    uploadImg (index, item) {
      let that = this;
      wx.chooseImage({
        count: 0,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          var tempFilePaths = res.tempFilePaths;
          wx.uploadFile({
            url: api.imageUpload,
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {
              'type': 1
            },
            success: function (res) {
              if (res.statusCode !== 200) {
                wx.showModal({
                  title: '提示',
                  content: '上传文件大小超出限制',
                  showCancel: false
                })
                return;
              }
              var data = res.data;
              let ret = JSON.parse(data);
              if (ret.code === 0) {
                if (index >= 0) {
                  item.src = ret.info
                  return
                }
                that.imgs.unshift({src: ret.info})
              }
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}
.main {
  margin: 0.25rem;
  display: flex;
  flex-flow: column;
  justify-content: center;
  flex-wrap: wrap;
  font-size: 0.28rem;
}
textarea {
  padding: 0.25rem 0;
}
.us {
  background: #fff;
  padding: 0 0.25rem;
  box-shadow: 0 0.1rem 0.1rem #e1e1e1;
  margin-bottom: 0.25rem;
  border-radius: 0.1rem;
}
.t {
  width: 100%;
  position: relative;
  padding: 0.25rem 0;
  color: #54bf7b;
  .line {
    position: absolute;
    width: 100%;
    height: 0.02rem;
    bottom: 0;
    opacity: 0.6;
    left: 0;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
.record {
  padding-bottom: 0.25rem;
  border-radius: 0.1rem;
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
      width: 1.6rem;
      height: 1.6rem;
    }
  }
}
.user {
  padding: 0.25rem;
  .rows {
    width: 100%;
    display: flex;
    height: 0.7rem;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    position: relative;
    .label {
      color: #54bf7b;
    }
    input {
      background: none;
      outline: none;
      height: 100%;
      color: #888;
      text-align: right;
    }
  }
}
.submit {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #54bf7b;
  color: #fff;
}
</style>