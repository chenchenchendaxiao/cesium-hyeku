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
export const addSatelliteOrbital = (viewer,DTGlobe)=>{
    let lonlatArr=[];
    for(var i=-180;i<181;i++){
        lonlatArr.push(i);
        lonlatArr.push(0);
        lonlatArr.push(3500000)
    }
    lonlatArr= Cesium.Cartesian3.fromDegreesArrayHeights(lonlatArr)
    DTGlobe.SatelliteOrbitalEntity.push(
      viewer.entities.add({
          show:false,
          polyline: {
              positions: lonlatArr,
              width: 3,
              material: Cesium.Color.CORNFLOWERBLUE ,
              clampToGround: false,
          },
      })
    )
    let Satellitelpos = [];
    for (let i = 1, j = lonlatArr.length; i < j; i++) {
      Satellitelpos = Satellitelpos.concat(interpolation(lonlatArr[i - 1], lonlatArr[i], 60000));
    }
    let factor3=0
    const entity = viewer.entities.add({
        show:false,
        name: '卫星模型',
        position: new Cesium.CallbackProperty(function() {
          if (factor3 > Satellitelpos.length-1) {
              factor3 = 0;
          }
          factor3++;
          // 动态更新位置
          return Satellitelpos[factor3];
        }, false),
        model: {
          uri: 'static/卫星.glb', // 获取或设置字符串Property，该字符串指定glTF资产的URI。 
          minimumPixelSize: 1600, // 获取或设置数字属性，指定近似最小值模型的像素大小，与缩放无关。这可以用来确保即使观看者缩小视图，模型仍然可见。当 0.0 时，没有强制执行最小大小。 
          maximumScale: 120000, // 获取或设置数字属性，该属性指定最大比例模型的大小
        }
    })
    DTGlobe.SatelliteOrbitalEntity.push(entity)
}