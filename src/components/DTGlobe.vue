<template>
  <div>
    <div id="cesiumContainer"></div>
    <div class="child" v-show="inUniverse" @click="resetView()"></div>
  </div>
</template>

<script>
//数据
import { cities } from '@/assets/data/cities'
import { river,yellowRiver } from '@/assets/data/river'
import { channel1, channel2 } from '@/assets/data/channel'
import { DTGlobe } from '@/assets/utils/common'
//方法
import { addCitiesPopulationColumn } from '@/assets/utils/addColumn'
import{ addSatelliteOrbital } from '@/assets/utils/addSatelliteOrbital'
import{ addRiver } from '@/assets/utils/addRiver'
import { addFlyLines } from "@/assets/utils/addFlyLines";
import { addChannal } from "@/assets/utils/addChannel"
import { addCakeMap } from "@/assets/utils/addCakeMap";
import { addWhiteModel } from "@/assets/utils/addWhiteModel"
//bus实例用于通信
import bus from '@/assets/utils/bus'
export default {
    data(){
      return {
        inUniverse:false
      }
    },
    methods:{
        //加载城市之间的飞线
        addFlyLines:addFlyLines,
        //加载城市人口柱状示意线
        addCitiesPopulationColumn: addCitiesPopulationColumn,
        //添加轨道和卫星的方法
        addSatelliteOrbital:addSatelliteOrbital,
        //添加河流的方法
        addRiver:addRiver,
        //添加航道的方法
        addChannal:addChannal,
        //添加县域行政区划驾驶舱的方法
        addCakeMap:addCakeMap,
        //添加渲染杭州建筑白模的方法
        addWhiteModel,addWhiteModel,
        //重置为初始宇宙视角的方法
        resetView(){
          DTGlobe.viewer.camera.flyTo({
               destination: {x: -11026509.639435524, y: 25863687.66217448, z: 9970696.880994387} ,
               orientation: {
                // 指向
                heading:6.191112082998764,
                // 视角
                pitch: -1.5691052850884537,
                roll: 0,
               },
             })
        },
        //将视角飞到德清上空的方法
        flyToCounty(){
          DTGlobe.viewer.camera.flyTo({
               destination: {x: -2785167.766521418, y: 4818273.782498095, z: 3224790.1169908945} ,
               orientation: {
                // 指向
                heading:6.271140420363835,
                // 视角
                pitch: -1.0765189351007636,
                roll: 6.283185303822246,
               },

             })
        },
        //将视角飞到杭州上空的方法
        flyToHangzhou(){
          DTGlobe.viewer.camera.flyTo({
               destination: {x: -2779258.860491051, y: 4781298.038492853, z: 3185358.8174155625} ,
               orientation: {
                // 指向
                heading:0.07385727277787968,
                // 视角
                pitch: -0.6144556147562583,
                roll: 6.282910602207032,
               },

             })
        },
        //初始化入口函数
        initCesium(){
            //设置token
            Cesium.Ion.defaultAccessToken =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1MmIxYWJmNy0yZDA1LTRiYmQtYmI3Ny1iMGIwNTk5NWQyMWYiLCJpZCI6Mjk5MjQsImlhdCI6MTU5OTIwMDkxOX0.aUw9ehdKoobH0GEq5lp3s3Uk9_QSMZVvFFrsLsAACqc'
            //viewer初始化
            const viewer = new Cesium.Viewer('cesiumContainer',{
                geocoder: false,
                homeButton: false,
                sceneModePicker: false,
                selectionIndicator:false,
                baseLayerPicker: false,
                fullscreenButton: false,
                navigationHelpButton: false,
                animation: false,
                timeline: false,
                fulllscreenButtond: false,
                vrButton: false,
                infoBox: false,
                contextOptions: {
                requestWebgl1: true,
                webgl: {
                  alpha: true,
                  depth: false,
                  stencil: true,
                  antialias: true,
                  premultipliedAlpha: true,
                  preserveDrawingBuffer: true,
                  failIfMajorPerformanceCaveat: true,
                },
                allowTextureFilterAnisotropic: true,
                },
              });
            viewer.scene.skyBox.show = false
            viewer.scene.screenSpaceCameraController.minimumZoomDistance = 10
            // 隐藏月亮
            viewer.scene.moon.show=false;
            //把初始化的viewer的的指针存到全局的对象里面方便调用
            DTGlobe.viewer=viewer
            viewer._cesiumWidget._creditContainer.style.display = "none"//取消版权信息
            //添加地球点击事件
            let Entityhandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
            Entityhandler.setInputAction(function (movement) {
                // console.log(movement, 'move')
                console.log(viewer.camera.position,viewer.camera.heading,viewer.camera.pitch,viewer.camera.roll)
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
            //加载暗色底图
            let lightEsri = new Cesium.ArcGisMapServerImageryProvider({
              url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer",
              proxy: new Cesium.DefaultProxy('/proxy/')
            });
            let lightEsriLayer = viewer.imageryLayers.addImageryProvider(lightEsri);
            lightEsriLayer.hue=1.6
            lightEsriLayer.contrast=1.6
            lightEsriLayer.hue=0
            lightEsriLayer.saturation=0.66
            // 初始化定位
            // this.resetView()
            this.resetView()
            //添加城市人口柱状图
            this.addCitiesPopulationColumn(cities,viewer,DTGlobe)
            //添加卫星和轨道
            this.addSatelliteOrbital(viewer,DTGlobe)
            //添加轨迹线
            this.addFlyLines(cities,viewer,DTGlobe)
            //添加长江
            this.addRiver(river,viewer,DTGlobe)
            //添加黄河
            this.addRiver(yellowRiver,viewer,DTGlobe)
            //添加航道1
            this.addChannal(channel1,viewer,DTGlobe)
            //添加航道2
            this.addChannal(channel2,viewer,DTGlobe)
            //添加德清行政区划蛋糕图
            this.addCakeMap(viewer,DTGlobe)
            //加载杭州城市建筑白模
            this.addWhiteModel(viewer,DTGlobe)
        },
    },
    mounted(){
        this.initCesium()
        bus.$on('inUniverse', (e) => {
          this.inUniverse=e
        })
        bus.$on('resetView', (e) => {
          this.resetView()
        })
        bus.$on('flyToCounty', (e) => {
          this.flyToCounty()
        })
        bus.$on('flyToHangzhou', (e) => {
          this.flyToHangzhou()
        })
        
    }

}
</script>

<style  scope>
.child{
  display: block;
  position: absolute;
  background:url('~@/assets/imgs/astrocat.png');
  height: 70%;
  width: 35%;
  right: 0px;
  bottom: 0px;
  z-index: 1000;
  background-repeat: no-repeat;
  background-size: contain;
}
html,body,#cesiumContainer {
   width:100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
