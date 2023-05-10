<template>
  <div>
    <div id="cesiumContainer"></div>
  </div>
</template>

<script>
export default {
    methods:{
        initCesium(){
            //设置token
            Cesium.Ion.defaultAccessToken =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1MmIxYWJmNy0yZDA1LTRiYmQtYmI3Ny1iMGIwNTk5NWQyMWYiLCJpZCI6Mjk5MjQsImlhdCI6MTU5OTIwMDkxOX0.aUw9ehdKoobH0GEq5lp3s3Uk9_QSMZVvFFrsLsAACqc'
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
            });
            viewer._cesiumWidget._creditContainer.style.display = "none"//取消版权信息
        }
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
