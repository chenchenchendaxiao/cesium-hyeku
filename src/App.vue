<template>
   <div id="app">
   <DTGlobe />
   <ThreeMap />
   <LayerManagemen />
   <!-- <Webgl />
   <Webgl2 />
   <Webgl3 />
   <Webgl4 />
   <Webgl5 />
   <Webgl6 />
   <Webgl7 />
   <Webgl8 />
   <Webgl9 />
   <Webgl10 />
   <Webgl11 />
   <Webgl12 />
   <Webgl13 v-if="false"/> -->
  </div>
</template>
<script>
import DTGlobe from '@/components/DTGlobe.vue'
import LayerManagemen from '@/components/LayerManagemen.vue';
import ThreeMap from '@/components/ThreeMap.vue'
import Webgl from '@/components/Webgl.vue'
import Webgl2 from '@/components/Webgl2.vue'
import Webgl3 from '@/components/Webgl3.vue'
import Webgl4 from '@/components/Webgl4.vue'
import Webgl5 from '@/components/Webgl5.vue'
import Webgl6 from '@/components/Webgl6.vue'
import Webgl7 from '@/components/Webgl7.vue'
import Webgl8 from '@/components/Webgl8.vue'
import Webgl9 from '@/components/Webgl9.vue'
import Webgl10 from '@/components/Webgl10.vue'
import Webgl11 from '@/components/Webgl11.vue'
import Webgl12 from '@/components/Webgl12.vue'
import Webgl13 from '@/components/Webgl13.vue'
export default {
  components:{
    DTGlobe,
    LayerManagemen,
    ThreeMap,
    Webgl,
    Webgl2,
    Webgl3,
    Webgl4,
    Webgl5,
    Webgl6,
    Webgl7,
    Webgl8,
    Webgl9,
    Webgl10,
    Webgl11,
    Webgl12,
    Webgl13

  },
  methods:{

  },
  mounted(){
  }

}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
