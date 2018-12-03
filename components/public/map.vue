<template>
  <div :id="id" :style="{width:width+'px',height:height+'px',margin:'34px auto'}" class="m-map"/>
</template>

<script>
export default {
  props: {
    width: {
      type:Number,
      default:300
    },
    height: {
      type:Number,
      default:300
    },
    point: {
      type:Array,
      default(){
        return [116.46,39.92]
      }
    }
  },
  data() {
    return {
      id: `map`,
      key: 'f5cab8c46b372943cd39c4dc67484971' // 高德账号 控制台里
    }
  },
  watch: {
    point: function (val, old) { // !这个是方便再 点击搜索其他的地方的时候  然后地图切换。
      this.map.setCenter(val)
      this.marker.setPosition(val)
    }
  },
  mounted() {
    let self = this
    self.id = `map${Math.random().toString().slice(4, 6)}`

    window.onmaploaded = () => {
      let map = new window.AMap.Map(self.id, {
        resizeEnable: true, // 是否监控地图容器尺寸变化，默认值为false
        zoom: 11,
        center: self.point
      })
      self.map = map
      window.AMap.plugin('AMap.ToolBar', () => {
        let toolbar = new window.AMap.ToolBar()
        map.addControl(toolbar)
        let marker = new window.AMap.Marker({
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: self.point
        })
        self.marker = marker
        marker.setMap(map)
      })
    }
    const url = `https://webapi.amap.com/maps?v=1.4.10&key=${self.key}&callback=onmaploaded` // !onmaploaded 为加载完JS的回调，自定义的
    let jsapi = document.createElement('script')
    jsapi.charset = 'utf-8'
    jsapi.src = url
    document.head.appendChild(jsapi)
  },
}
</script>
