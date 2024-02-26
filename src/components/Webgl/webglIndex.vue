<template>
    <div>
        <div id="webglIndexBox" class="webglIndexBox">
               <Webgl />
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
               <Webgl13 v-if="false"/>
        </div>
    </div>
</template>
<script>
import Webgl from '@/components/Webgl/Webgl.vue'
import Webgl2 from '@/components/Webgl/Webgl2.vue'
import Webgl3 from '@/components/Webgl/Webgl3.vue'
import Webgl4 from '@/components/Webgl/Webgl4.vue'
import Webgl5 from '@/components/Webgl/Webgl5.vue'
import Webgl6 from '@/components/Webgl/Webgl6.vue'
import Webgl7 from '@/components/Webgl/Webgl7.vue'
import Webgl8 from '@/components/Webgl/Webgl8.vue'
import Webgl9 from '@/components/Webgl/Webgl9.vue'
import Webgl10 from '@/components/Webgl/Webgl10.vue'
import Webgl11 from '@/components/Webgl/Webgl11.vue'
import Webgl12 from '@/components/Webgl/Webgl12.vue'
import Webgl13 from '@/components/Webgl/Webgl13.vue'
export default {
    components:{
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
<style  scope>
.webglIndexBox{
    height: 100%;
    width: 100%;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    background-color: beige;
    z-index: 10000000 !important;
}
</style>