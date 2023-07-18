<template>
  <div id="threemapDiv" style="height: 100vh; display: block;">
  <canvas id="map"></canvas>
  </div>
</template>

<script>
import { DTGlobe } from '@/assets/utils/common'
import MapShow from '@/assets/utils/threeJs/MapShow'
export default {
mounted(){
    //生成mapshow实例
    DTGlobe.mapshow = new MapShow('map')
},
beforeDestroy(){

}
}
</script>

<style>
#map{
    width: 100%;
    height: 100%;
    background-color: #091623;
    background-size: cover;
    background-image:url('~@/assets/imgs/threemapbackground.png');
}
</style>