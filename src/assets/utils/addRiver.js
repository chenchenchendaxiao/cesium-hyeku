import FlowLineProperty from './FlowLineProperty'
export const addRiver = (data,viewer,DTGlobe)=>{
    DTGlobe.RiverEntity.push(viewer.entities.add({
        polyline: {
          positions: data,
          width: 3,
          material: new FlowLineProperty(Cesium.Color.WHITE, 1500, 5,'river'),
          zIndex:100,
          clampToGround:true
      },
      }))
}