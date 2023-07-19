<template>
    <div>
      <div id="container"></div>
      <div id="tooltip"></div>
    </div>
  </template>
<script>
  import * as THREE from "three";
  import * as d3 from 'd3';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
  import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { DTGlobe } from '@/assets/utils/common';
import MapShow from '@/assets/class/MapShow'
  export default {
    data(){
      return{
        container:null,

      }
    },
    methods:{
        threeInit(){
            let mapshow = new MapShow('container')
            console.log(mapshow,'mapshow')
        },

    },
    mounted(){
        console.log('mounted')
        this.threeInit()
        
    },
    
  }
</script>