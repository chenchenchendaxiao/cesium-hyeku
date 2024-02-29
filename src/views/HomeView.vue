<template>
  <div class="home">
    <div id="homePageShaderContainer" ></div>
  </div>
</template>

<script>
// @ is an alias to /src
import { loadShader } from "@/assets/utils/loadShader";

export default {
  name: 'HomeView',
  methods:{
    loadShader:loadShader,
  },
  components: {
  },
  mounted(){
    this.loadShader()
  }
}
</script>
<style>
.home{
  height: 100%;
    width: 100%;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgb(0, 0, 0);
}
</style>