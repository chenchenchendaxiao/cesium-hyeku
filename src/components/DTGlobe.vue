<template>
  <div>
    <div id="cesiumContainer"></div>
  </div>
</template>

<script>
import {cities} from '@/assets/data/cities'
import { DTGlobe } from '@/assets/utils/common'
export default {
    methods:{
      //加载城市人口柱状示意线
      addCitiesPopulationColumn(){
        const viewer = DTGlobe.viewer
        console.log(cities,'cities')
        cities.points.forEach(city=>{
        let startPos=Cesium.Cartesian3.fromDegrees(city.lon, city.lat, 0)
        let endPos=Cesium.Cartesian3.fromDegrees(city.lon, city.lat, city.people*700)
        var lastTime = Date.now()*50;
        viewer.entities.add({
          position: endPos,
            polyline: {
                positions: new Cesium.CallbackProperty(() => {
                  var now = Date.now()*50;
                  // console.log((now-lastTime)/1000%100/100)
                    return [startPos,Cesium.Cartesian3.fromDegrees(city.lon, city.lat, city.people*700*((now-lastTime)/1000%100/100))];
                }, false),
                width: 3,
                material: Cesium.Color.SKYBLUE ,
                clampToGround: false,
                // classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
                // disableDepthTestDistance: 500000
            },
            point: {
                pixelSize: 5,
                color:new Cesium.CallbackProperty(() => {
                  var now = Date.now()*50;
                    return Cesium.Color.SILVER .withAlpha((now-lastTime)/1000%100/100);
                }, false) ,
            },
        });
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
            //把初始化的viewer的的指针存到全局的对象里面方便调用
            DTGlobe.viewer=viewer
            viewer._cesiumWidget._creditContainer.style.display = "none"//取消版权信息
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
           this.addCitiesPopulationColumn()
        },
    },
    mounted(){
        this.initCesium()
    }

}
</script>

<style  scope>
html,body,#cesiumContainer {
   width:100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
