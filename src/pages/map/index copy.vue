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
      <text class="h1">{{textData.name}}</text>
      <text>{{textData.desc}}</text>
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
  &.show {
    bottom: 0;
  }
}
text {
  margin: 5px 0;
  display: block;
  font-size: 12px;
}
.h1 {
  margin: 15px 0;
  font-size: 15px;
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
        name: '',
        desc: ''
      },
      showInfo: false,
      form: {
        lat: '',
        lon: ''
      }
    }
  },
  onLoad () {
    this.getData()
    this.init()
  },
  methods: {
    makertap: function(e) {
      var id = e.markerId;
      var that = this;
      that.showMarkerInfo(markersData,id);
      that.changeMarkerColor(markersData,id);
    },
    getData () {
      this.$get('api/cabinetlocation/findNearby', this.form).then(res => {
        if (res.success) {
          console.log(res, 'res')
          data.forEach((v, i) => {
            if (v.lon) {
              v.longitude = v.lon
              v.latitude = v.lat
            } else {
              data.splice(i, 1)
            }
          })
          console.log(data, 'data')
          this.markers = data
        }
      })
    },
    init () {
      var myAmapFun = new map.AMapWX({key:'8ad7ec1548a1382ea34e488b63f14c47'});
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
    showMarkerInfo: function(data,i){
      var that = this;
      that.textData = {
        name: data[i].name,
        desc: data[i].address
      }
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