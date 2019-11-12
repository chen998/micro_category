<template>
  <div class="page">
    <div class="form">
      <div class="rows">
        <div class="label">垃圾名称</div>
        <input
          type="text"
          v-model="form.recycleName"
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
        <div class="t">上传图片（1张）
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
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cateList: [],
      cateName: [],
      selectValue: -1,
      form: {
        recycleName: '',
        appointmentTime: '',
        message: ''
      },
      imgs: []
    }
  },
  onLoad () {
    this.getCateList()
  },
  methods: {
    changeCate(e) {
      this.selectValue = e.mp.detail.value
    },
    getCateList () {
      this.$get('api/recyclecategory/findAll').then(res => {
        if (res.data.success) {
          this.cateList = res.data.data
          this.cateList.forEach(v => {
            this.cateName.push(v.recycleCategoryName)
          })
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
  padding: 0 0.2rem;
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
    font-size: 0.33rem;
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
    padding-left: 0.2rem;
    text-indent: 0.3rem;
  }
  select {
    flex: 1;
    border: 1px solid #000;
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
      width: 2rem;
      height: 2rem;
    }
  }
}
</style>
