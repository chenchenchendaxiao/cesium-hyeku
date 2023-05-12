import ChannelFlowLineProperty from './ChannelProperty'
export const addChannal = (data,viewer,DTGlobe)=>{
    let result=[]
    data.forEach(pos => {
      let carto=Cesium.Cartographic.fromCartesian(pos)
      carto.height=200000
      let pos3=Cesium.Cartographic.toCartesian(carto)
      result.push(pos3)
    })
    DTGlobe.ChannelEntity.push(
        viewer.entities.add({
            polyline: {
              positions: result,
              width: 4,
              material: new ChannelFlowLineProperty(Cesium.Color.WHITE, 500, 60,'channel'),
              zIndex:100,
              // clampToGround:true
            },
        })
    )
    //模型沿着航道运动
    let Channelpos = [];
    for (let i = 1, j = result.length; i < j; i++) {
      Channelpos = Channelpos.concat(interpolation(result[i - 1], result[i], 6000));
    }
    let factor = 0
    const vehicleEntity = viewer.entities.add({
        position: new Cesium.CallbackProperty(function() {
           if (factor > Channelpos.length-1) {
               factor = 0;
           }
           factor++;
           // 动态更新位置
           return Channelpos[factor];
        }, false),
        point: {
              pixelSize: 18,
              color:Cesium.Color.CORNFLOWERBLUE  ,
              zIndex:500,
              // disableDepthTestDistance:40000000,
              outlineColor: Cesium.Color.LIGHTBLUE , 
              outlineWidth:3
          },
    });
    DTGlobe.ChannelEntity.push(vehicleEntity)
}
const interpolation=(pos1, pos2, interval)=>{
    let count = Math.floor(Cesium.Cartesian3.distance(pos2, pos1) / interval);
    let dir = Cesium.Cartesian3.subtract(pos2, pos1, new Cesium.Cartesian3());
    Cesium.Cartesian3.normalize(dir, dir);
    let ret = [];
    for (let i = 0; i < count; i++) {
        let c = new Cesium.Cartesian3();
        let cur = Cesium.Cartesian3.add(pos1, Cesium.Cartesian3.multiplyByScalar(dir, i * interval, c), c);
        ret.push(cur);
    }
    return ret;
}