<template>
  <div>
    <div id="cesiumContainer"></div>
    <div class="child" v-show="inUniverse"></div>
  </div>
</template>

<script>
import {cities} from '@/assets/data/cities'
import { DTGlobe } from '@/assets/utils/common'
import {addCitiesPopulationColumn} from '@/assets/utils/addColumn'
import{ addSatelliteOrbital } from '@/assets/utils/addSatelliteOrbital'
export default {
    data(){
      return {
        inUniverse:true
      }
    },
    methods:{
      //加载城市人口柱状示意线
      addCitiesPopulationColumn: addCitiesPopulationColumn,
      //添加轨道和卫星的方法
      addSatelliteOrbital:addSatelliteOrbital,
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
                console.log(movement, 'move')
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
            viewer.camera.flyTo({
             destination: {x: -11026509.639435524, y: 25863687.66217448, z: 9970696.880994387} ,
             orientation: {
              // 指向
              heading:6.191112082998764,
              // 视角
              pitch: -1.5691052850884537,
              roll: 0,
             },
           })
           //添加城市人口柱状图
           this.addCitiesPopulationColumn(cities,viewer,DTGlobe)
           //添加卫星和轨道
           this.addSatelliteOrbital(viewer,DTGlobe)
        },
    },
    mounted(){
        this.initCesium()
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
