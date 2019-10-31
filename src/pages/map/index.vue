<template>
  <div class="page">
    <map
      name="map"
      :markers="markers"
      @markertap="makertap"
      class="map"
      id="map"
      show-location="true"
      enable-zoom="true"
      :longitude="form.lon"
      :latitude="form.lat"
      scale="14"
      :controls="controls"
      bindcontroltap="code"
      bindupdated="show"
    ></map>
    <view
      class="map_text"
      :class="{show: showInfo}"
    >
      <div class="left">
        <text class="h1">{{textData.cabinetName}}</text>
        <text>距离您{{textData.dist}}</text>
      </div>
      <div
        class="right"
        @click="openLocation(textData)"
      >
        <div class="goTo">
          <img
            src="/static/img/nav.png"
            alt=""
          >
        </div>
        去这里
      </div>
    </view>
  </div>
</template>
<style lang="scss" scoped>
.page {
  height: 100vh;
  width: 100%;
  background: #f8f8f8;
}
.map {
  width: 100%;
  height: 100%;
}
img {
  width: 100%;
  height: 100%;
}
.map_text {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -200px;
  background: #fff;
  padding: 0 15px;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: space-between;
  .goTo {
    width: 0.65rem;
    height: 0.65rem;
    margin-bottom: 0.1rem;
  }
  .right {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }
  &.show {
    bottom: 0;
  }
}
text {
  margin: 20px 0;
  display: block;
  font-size: 12px;
}
.h1 {
  margin: 15px 0;
  font-size: 15px;
  font-weight: bold;
}
</style>
<script>
import map from '@/utils/map.js'
export default {
  data () {
    return {
      lat: '',
      lng: '',
      markers: [],
      textData: {
        cabinetName: '',
        dist: ''
      },
      showInfo: false,
      form: {
        lat: '',
        lon: ''
      }
    }
  },
  onLoad () {
    this.init()
  },
  methods: {
    openLocation (item) {
        wx.openLocation({
          longitude: Number(item.longitude),
          latitude: Number(item.latitude),
          name: item.cabinetName
        })
    },
    init () {
      // var myAmapFun = new map.AMapWX({key:'8ad7ec1548a1382ea34e488b63f14c47'});
      var that = this
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          that.form.lon = res.longitude
          that.form.lat = res.latitude
          that.getData()
        }
      })
    },
    makertap: function(e) {
      var id = e.mp.markerId;
      var that = this;
      var markersData = this.getMarkersData(id)
      this.showInfo = true
      console.log(markersData, 'markersData')
      this.textData = markersData
      that.changeMarkerColor(markersData,id);
    },
    getMarkersData (id) {
      var data = this.markers
      var len = data.length;
      for (var i = 0; i < len; i++) {
        var val = data[i]
        if (val.id == id) {
          return val
        }
      }
    },
    getData () {
      this.$get('api/cabinetlocation/findNearby', this.form).then(res => {
        if (res.data.success) {
          var data = res.data.data
          data.forEach((v, i) => {
            // v.iconPath = '/static/img/zhandian.png'
            v.longitude = v.lon
            v.latitude = v.lat
            v.width = 26
            v.height = 26
            v.dist = (v.dist / 1000).toFixed(2) + 'km'
          })
          this.markers = data
        }
      })
    },
    changeMarkerColor: function(data,i){
      // var that = this;
      // var markers = [];
      // for(var j = 0; j < data.length; j++){
      //   if(j==i){
      //     data[j].iconPath = "选中 marker 图标的相对路径"; //如：..­/..­/img/marker_checked.png
      //   }else{
      //     data[j].iconPath = "未选中 marker 图标的相对路径"; //如：..­/..­/img/marker.png
      //   }
      //   markers.push(data[j]);
      // }
      // that.markers = markers
    }
  }
}
</script>