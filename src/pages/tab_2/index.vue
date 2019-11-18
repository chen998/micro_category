<template>
  <div class="page">
    <div class="main">
      <div class="nav">
        <div
          class="navItem"
          :class="{active: tabIndex == 1}"
          @click="tabIndex = 1"
        >环保百科</div>
        <div
          class="navItem"
          :class="{active: tabIndex == 2}"
          @click="tabIndex = 2"
        >社区动态</div>
      </div>
      <div class="recordList">
        <div
          class="content"
          v-if="tabIndex == 1"
        >
          <!-- <div class="swiper-wrap">
            <swiper
              :indicator-dots="true"
              :autoplay="autoplay"
              :interval="interval"
              :duration="duration"
              class="swiper"
            >
              <div
                class="swiper-item"
                v-for="(item, index) in imgUrls"
                :key="index"
              >
                <swiper-item>
                  <image
                    :src="item"
                    class="slide-image"
                    width="355"
                    height="150"
                  />
                </swiper-item>
              </div>
            </swiper>
            <div class="name">走进东北！</div>
          </div> -->
          <div
            class="recordItem flex"
            v-for="(item, index) in list"
            :key="index"
            @click="nav(item)"
          >
            <div class="articleText">
              <div class="title">{{item.cyclopediaName}}</div>
              <div class="desc">
                {{item.cyclopediaDesc}}
              </div>
            </div>
            <div class="articleImg">
              <img
                :src="item.cyclopediaIcon"
                alt=""
              >
            </div>
          </div>
          <div
            class="recordItem none"
            v-if="list.length < 1"
          >
            暂无数据
          </div>
        </div>

        <div
          class="content"
          v-if="tabIndex == 2"
        >
          <div
            class="recordItem"
            v-for="(item, index) in comList"
            :key="index"
          >
            <div class="top">
              <div class="head">
                <img
                  :src="item.avatarUrl"
                  alt=""
                >
              </div>
              <div class="info">
                <div class="nickName">{{item.nickName}}</div>
                <div class="address">
                  <img
                    src="/static/img/address.png"
                    alt=""
                  >
                  {{item.area}}
                </div>
              </div>
              <div class="dateWrap">
                <div class="label">发布时间</div>
                <div class="date">{{item.createTime}}</div>
              </div>
            </div>
            <div class="article">
              <div
                class="label"
                v-if="item.communityContent"
              >{{item.communityContent}}</div>
              <div class="photo">
                <!-- <img
                  src="/static/img/photo.jpg"
                  alt=""
                > -->
                <img
                  :src="item.communityIcon"
                  alt=""
                >
              </div>
            </div>
          </div>
          <div
            class="recordItem none"
            v-if="comList.length < 1"
          >
            你的社区暂时没有更多动态
          </div>
        </div>
        <!-- <div
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
        </div> -->
      </div>
    </div>
    <div
      class="pub"
      v-if="tabIndex == 2"
      @click="userInfo.nickName ? $nav('../postMsg/main') : $toast('请您先到个人中心登录')"
    >
      <span class="overLabel">发布动态~</span>
      <img
        src="/static/img/add.png"
        alt=""
      ></div>
  </div>
</template>
<style lang="scss" scoped>
.pub {
  position: fixed;
  right: 0.3rem;
  bottom: 0.3rem;
  background: #54bf7b;
  color: #fff;
  border-radius: 50%;
  z-index: 99;
  width: 1rem;
  height: 1rem;
  display: flex;
  font-weight: bold;
  font-size: 0.5rem;
  align-items: center;
  justify-content: center;
  img {
    width: 0.6rem;
    height: 0.6rem;
  }
  .overLabel {
    position: absolute;
    bottom: 108%;
    right: 50%;
    margin-right: -0.55rem;
    background: #fff;
    border-radius: 0.2rem;
    box-shadow: #ececec;
    color: #777;
    font-size: 0.24rem;
    text-align: center;
    width: 1.1rem;
    height: 0.55rem;
    line-height: 0.55rem;
    padding: 0.05rem 0.1rem;
  }
}
.flex {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}
.swiper-wrap {
  // 轮播模块
  width: 90%;
  border-radius: 0.3rem;
  overflow: hidden;
  margin: 0.2rem auto;
  border-bottom: 1px solid #f1f1f1;
  padding-bottom: 0.2rem;
  .swiper,
  image,
  img {
    width: 100%;
    height: 3.7rem;
    border-radius: 0.3rem;
  }
  .name {
    padding: 0.2rem 0.2rem;
    font-weight: bold;
    color: #333;
  }
}
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
  background: #f8f8f8;
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
  margin-top: 1rem;
  height: calc(100vh - 1rem);
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  .recordItem {
    border-radius: 0.2rem;
    color: #444;
    min-height: 2rem;
    margin: 0.2rem;
    overflow: hidden;
    padding: 0 0.2rem;
    background: #fff;
    &:hover {
      background: #f1f1f1;
    }
    .articleText {
      display: flex;
      flex-flow: column;
      flex: 1;
      .title {
        font-weight: bold;
        margin-bottom: 0.2rem;
      }
      .desc {
        color: #888;
        font-size: 0.26rem;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .articleImg {
      width: 2rem;
      height: 1.5rem;
      padding: 0 0.2rem;
      img {
        border-radius: 0.15rem;
      }
    }
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.25rem 0;
      .head {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 0.15rem;
      }
      .info {
        flex: 1;
        .nickName {
          font-weight: bold;
        }
        .address {
          display: flex;
          align-items: center;
          font-size: 0.26rem;
          color: #888;
          img {
            width: 0.28rem;
            height: 0.28rem;
            margin-right: 0.1rem;
          }
        }
      }
      .dateWrap {
        text-align: right;
        color: #888;
        font-size: 0.26rem;
        .date {
        }
      }
    }
    .photo {
      width: 3rem;
      height: 4rem;
      margin: 0.2rem 0;
      border-radius: 0.15rem;
      overflow: hidden;
      img {
        object-fit: contain;
      }
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
      imgUrls: [
        'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
        'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
        'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
      ],
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000,
      comList: [],
      userInfo: this.$store.getters.userInfo
    }
  },
  onShow () {
    this.getList()
  },
  methods: {
    nav(item) {
      this.$setStorage('html', item.cyclopediaContent)
      this.$nav('../webview/main')
    },
    getList () {
      this.$get('api/cyclopedia/findAll').then(res => {
        if(res.data.success) {
          this.list = res.data.data
          this.list.forEach(v => {
            if (v.cyclopediaIcon) {
              v.cyclopediaIcon = this.$baseUrl + v.cyclopediaIcon.substr(1)
            }
          })
        }
      })
      this.$get('api/community/findAll').then(res => {
        if (res.data.success) {
          this.comList = res.data.data
        }
      })
    }
  }
}
</script>