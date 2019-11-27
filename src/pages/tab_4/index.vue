<template>
  <div class="page">
    <div class="main">
      <div class="nav">
        <div
          class="navItem"
          :class="{active: tabIndex == 1}"
          @click="tabIndex = 1"
        >我的投递</div>
        <div
          class="navItem"
          :class="{active: tabIndex == 2}"
          @click="tabIndex = 2"
        >上门回收</div>
        <div
          class="navItem"
          :class="{active: tabIndex == 3}"
          @click="tabIndex = 3"
        >厨余垃圾</div>
      </div>
      <div
        class="recordList"
        v-if="tabIndex == 1"
      >
        <div
          class="recordItem"
          v-for="(item, index) in list"
          :key="index"
        >
          aaaaaaaa
        </div>
        <div
          class="recordItem none"
          v-if="list.length < 1"
        >
          暂无数据
        </div>
      </div>
      <div
        class="recordList"
        v-if="tabIndex == 2"
      >
        <div
          class="recordItem"
          v-for="(item, index) in recycleList"
          :key="index"
        >
          <div class="rows t">
            垃圾名称: {{item.recycleName}}
          </div>
          <div class="rows">
            垃圾类别: {{item.recycleCategoryName}}
          </div>
          <div class="rows">
            投递时间: {{item.createTime}}
          </div>
          <div class="rows">
            联系方式: {{item.mobile}}
          </div>
          <div
            class="rows"
            v-if="item.message"
          >
            备注: {{item.message}}
          </div>
        </div>
        <div
          class="recordItem none"
          v-if="recycleList.length < 1"
        >
          暂无数据
        </div>
      </div>
      <div
        class="recordList"
        v-if="tabIndex == 3"
      >
        <div
          class="recordItem"
          v-for="(item, index) in list"
          :key="index"
        >
          aaaaaaaa
        </div>
        <div
          class="recordItem none"
          v-if="list.length < 1"
        >
          暂无数据
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
}
.page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: 0.3rem;
  position: relative;
  background: #f5f5f5;
  .main {
  }
}
.nav {
  width: 100%;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  z-index: 9;
  height: 1rem;
  justify-content: center;
  border-bottom: 1px solid #ececec;
  .navItem {
    padding: 0.2rem 0.5rem;
    color: #888;
    position: relative;
    &.active {
      color: #49d029;
      &::after {
        content: "";
        position: absolute;
        width: 100%;
        background: #49d029;
        height: 0.05rem;
        bottom: 0;
        left: 0;
      }
    }
  }
}
.recordList {
  width: 100%;
  height: 100vh;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  .recordItem {
    border-radius: 0.25rem;
    background: #fff;
    color: #444;
    min-height: 2rem;
    margin: 0 0.2rem;
    margin-bottom: 0.2rem;
    display: flex;
    flex-flow: column;
    justify-content: center;
    .rows {
      padding: 0.2rem;
      font-size: 0.26rem;
      color: #777;
      &.t {
        font-weight: bold;
        color: #333;
        font-size: 0.3rem;
      }
    }
    &:first-child {
      margin-top: 1.2rem;
    }
    &:last-child {
      margin-bottom: 1.2rem;
    }
    &.none {
      color: #888;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
<script>
export default {
  data () {
    return {
      list: [],
      tabIndex: 1,
      recycleList: []
    }
  },
  onShow () {
    this.getList()
  },
  methods: {
    getList() {
      this.$get('api/recyclecategory/findAll').then(res => {
        if (res.data.success) {
          this.recycleList = res.data.data
          this.recycleList.forEach(v => {
            if (typeof v.createTime == 'number') {
              v.createTime = new Date(v.createTime).toLocaleString()
            }
          })
        }
      })
    }
  }
}
</script>