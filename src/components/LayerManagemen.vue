<template>
  <div>
    <div class="layerManagement">
        <div class="gjt" >
            <img :src="require('@/assets/imgs/scene.png')" style="width: 25px;height: 25px;"/>
            <div class="gjttitle">场景树</div>
        </div>
        <div class="c-wrapper" v-for="(item, index) in controlData" :key="index" @click="handleClick(index)">
            <div class="sceneBox">
              <img :src="currentIndex == index ? item.activeIcon : item.icon" />
              <div class="title" :class="{ activeTitle: currentIndex == index }">{{ item.name }}</div>
            </div>
          </div>
    </div>
  </div>
</template>

<script>
import { DTGlobe } from '@/assets/utils/common'
import { removeEventListener } from '@/assets/utils/addCakeMap'
import bus from '@/assets/utils/bus'
export default {
    methods:{
        handleClick(index) {
            //先隐藏所有的实体
            this.hideAllEntity()
            if (index != this.currentIndex) {
              this.currentIndex = index
              console.log(this.currentIndex,' currentIndex')
              if(this.currentIndex==0){
                //宇宙场景
                this.controlUniverse(true)
                bus.$emit('resetView',true)
              }else if(this.currentIndex == 1){
                //科技城市
                bus.$emit('flyToHangzhou',true)
                DTGlobe.whiteModel.show=true
              }else if(this.currentIndex== 2){
                //行政县域
                bus.$emit('flyToCounty',true)
                DTGlobe.CakeMapEntity.forEach(entity=>{
                  entity.show=true
                })
              }else if(this.currentIndex == 3){
                //区位地图
                bus.$emit('flyToChongqing',true)
              }
            } else {
              this.currentIndex = -1
              bus.$emit('resetView',true)
            }
        },
        hideAllEntity(){
            this.controlUniverse(false)
            bus.$emit('inUniverse', false);
            DTGlobe.CakeMapEntity.forEach(entity=>{
              entity.show=false
            })
            DTGlobe.equipmentPoints.forEach(entity=>{
              entity.show=false
            })
            // 移除地图高度监听事件
            removeEventListener(DTGlobe.viewer)
            DTGlobe.whiteModel.show=false
            document.getElementById('threemapDiv').style.display='none'
        },
        controlUniverse(state){
            bus.$emit('inUniverse', state);
            DTGlobe.citiesPopulationEntity.forEach(entity=>{
                entity.show=state
            })
            DTGlobe.SatelliteOrbitalEntity.forEach(entity=>{
                entity.show=state
            })
            DTGlobe.CityFlyLines.forEach(entity=>{
                entity.show=state
            })
            DTGlobe.citiesPopulationEntity.forEach(entity=>{
                entity.show=state
            })
            DTGlobe.RiverEntity.forEach(entity=>{
                entity.show=state
            })
            DTGlobe.ChannelEntity.forEach(entity=>{
                entity.show=state
            }) 
        }
    },
    data() {
    return {
      controlData: [
        {
          name: '宇宙场景',
          icon: require('@/assets/imgs/元宇宙.png'),
          activeIcon: require('@/assets/imgs/元宇宙-active.png'),
        },
        {
          name: '科幻城市',
          icon: require('@/assets/imgs/城市名片.png'),
          activeIcon: require('@/assets/imgs/城市名片-active.png'),
        },
        {
          name: '行政县域',
          icon: require('@/assets/imgs/行政区划.png'),
          activeIcon: require('@/assets/imgs/行政区划-active.png'),
        },
        {
          name: '区位地图',
          icon: require('@/assets/imgs/区位地图.png'),
          activeIcon: require('@/assets/imgs/区位地图-active.png'),
        },
      ],
      currentIndex: -1,
      sceneCurrentIndex: -1,
      weatherIndex: -1,
      show: false,
      poiName: '',
      leftSceneIndex: -1,
    }
  },
}
</script>

<style lang="less" scoped>
.title {
      font-family: 'HarmonyOS Sans SC';
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 15px;
      // text-align: center;
      color: rgba(209, 222, 255, 0.75);
    }
.gjt {
      display: flex;
      align-items: center;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(32, 41, 64, 0.59);
      margin-bottom: 10px;
      border-radius: 0px 0px 8px 8px;   
      padding: 11px 2.5px;
    //   border-radius: 8px;
      height: 20px;
      border: 2px solid #40547c;}
.gjttitle{
    font-family: 'Alibaba PuHuiTi';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 25px;
    /* identical to box height */
    text-align: center;
    color: rgba(209, 222, 255, 0.75);
}
.activeTitle {
        color: white;
      }
.sceneBox{
    margin-bottom: 5px;
    border-bottom: 1px solid;
    padding-bottom: 5px;
    border-image:linear-gradient(to right, #202940, #C1D6FF,	#202940) 1;

}
.screen-right {
  position: fixed;
  right: 0.2rem;
  top: 0.58rem;
  z-index: 110;
  .top-search {
    position: fixed;
    top: 0.8rem;
    right: 0.98rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 3.7rem;
    height: 0.32rem;
    ::v-deep .ant-input {
      height: 0.38rem;
      /* 二三维一体化平台/背景/选中 */
      background: linear-gradient(0deg, rgba(25, 54, 98, 0.22), rgba(25, 54, 98, 0.22)),
        linear-gradient(
          94.07deg,
          rgba(27, 40, 60, 0.7) 90.37%,
          rgba(52, 78, 115, 0.7) 96.75%,
          rgba(62, 104, 164, 0.7) 100%
        );
      border: 1px solid #40547c;
      backdrop-filter: blur(12px);
      /* Note: backdrop-filter has minimal browser support */

      border-radius: 4px;
      color: white;
      // border: 1px solid;
      // border-image: conic-gradient(
      //   from 180deg at 50% 50%,
      //   rgba(255, 255, 255, 0) -14.07deg,
      //   rgba(255, 255, 255, 0.14) 61.63deg,
      //   #eaf1ff 121.31deg,
      //   rgba(255, 255, 255, 0) 196.7deg,
      //   rgba(235, 242, 255, 0.77) 282.97deg,
      //   rgba(255, 255, 255, 0) 345.93deg,
      //   rgba(255, 255, 255, 0.14) 421.63deg
      // )4;

      // clip-path: inset(0 round 22px);
    }
    ::v-deep .ant-input-search-icon {
      color: white;
    }
  }
  .control-bar {
    text-align: center;
    position: fixed;
    right: 0.2rem;
    width: 0.68rem;
    margin-top: 0.2rem;
    background: linear-gradient(0deg, rgba(25, 54, 98, 0.22), rgba(25, 54, 98, 0.22)),
      linear-gradient(
        174.85deg,
        rgba(27, 40, 60, 0.7) 73.27%,
        rgba(52, 78, 115, 0.7) 93.78%,
        rgba(62, 104, 164, 0.7) 100%
      );
    border: 2px solid #40547c;
    backdrop-filter: blur(12px);
    border-radius: 0.08rem;
    .c-wrapper {
      cursor: pointer;
      padding-top: 0.12rem;
      padding-bottom: 0.08rem;
      border-bottom: 1px solid;
      border-image: linear-gradient(
          90deg,
          rgba(128, 168, 245, 0) 0%,
          rgba(193, 214, 255, 0.2) 50.88%,
          rgba(128, 168, 245, 0) 100%
        )
        1;
      .title {
        font-family: 'Alibaba PuHuiTi';
        font-style: normal;
        font-weight: 400;
        font-size: 0.13rem;
        line-height: 0.18rem;
        /* identical to box height */
        text-align: center;
        color: rgba(209, 222, 255, 0.75);
      }
      .activeTitle {
        color: white;
      }
    }
    .close {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(32, 41, 64, 0.59);
      border-radius: 0px 0px 8px 8px;
      padding: 0.06rem 0.1rem;
      .title {
        font-family: 'Alibaba PuHuiTi';
        font-style: normal;
        font-weight: 400;
        font-size: 0.13rem;
        line-height: 0.18rem;
        color: rgba(209, 222, 255, 0.51);
      }
      img {
        margin-left: 0.05rem;
        width: 0.09rem;
        height: 0.1rem;
      }
    }
    .gjt {
      display: flex;
      align-items: center;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(32, 41, 64, 0.59);
      margin-bottom: 10px;
      // border-radius: 0px 0px 8px 8px;
      padding: 11px 2.5px;
      border-radius: 8px;
      height: 38px;
      border: 2px solid #40547c;

      .title {
        font-family: 'HarmonyOS Sans SC';
        font-style: normal;
        font-weight: 400;
        font-size: 0.13rem;
        line-height: 0.15rem;
        color: rgba(255, 255, 255, 0.8);
        margin-top: -2px;
      }
    }
  }
}
.layerManagement{
    user-select:none;
    display: block;
    position: absolute;
    left: 5%;
    top: 15%;
    background: linear-gradient(0deg, rgba(25, 54, 98, 0.22), rgba(25, 54, 98, 0.22)), linear-gradient(174.85deg, rgba(27, 40, 60, 0.7) 73.27%, rgba(52, 78, 115, 0.7) 93.78%, rgba(62, 104, 164, 0.7) 100%);
    border: 1px solid #40547C;
    border-radius: 5px;
    width: 80px;
    height: auto;
    min-height: 100px;
}
</style>