import PolylineTrailMaterialProperty from './PolylineTrailMaterialProperty'
const generateCurve=(startPoint, endPoint) =>{
    let addPointCartesian = new Cesium.Cartesian3()
    Cesium.Cartesian3.add(startPoint, endPoint, addPointCartesian)
    let midPointCartesian = new Cesium.Cartesian3()
    Cesium.Cartesian3.divideByScalar(addPointCartesian, 2, midPointCartesian)
    let midPointCartographic = Cesium.Cartographic.fromCartesian(
      midPointCartesian
    )
    midPointCartographic.height =
      Cesium.Cartesian3.distance(startPoint, endPoint) / 5
    let midPoint = new Cesium.Cartesian3()
    Cesium.Ellipsoid.WGS84.cartographicToCartesian(
      midPointCartographic,
      midPoint
    )
    let spline = new Cesium.CatmullRomSpline({
      times: [0.0, 0.5, 1.0],
      points: [startPoint, midPoint, endPoint],
    })
    let curvePoints = []
    for (let i = 0, len = 200; i < len; i++) {
      curvePoints.push(spline.evaluate(i / len))
    }
  
    return curvePoints
  }
export const addFlyLines = (data,viewer,DTGlobe)=>{
    const center = data.center
    const cities = data.points
    const startPoint = Cesium.Cartesian3.fromDegrees(
      center.lon,
      center.lat,
      0
    )
    //中心点
    viewer.entities.add({
      position: startPoint,
      point: {
        pixelSize: center.size,
        color: center.color,
      },
    })
    //大批量操作时，临时禁用事件可以提高性能
    viewer.entities.suspendEvents() //散点
    cities.map((city) => {
      let material = new Cesium.PolylineTrailMaterialProperty({
        color: Cesium.Color.WHITE,
        duration: 4000,
        trailImage: require('@/assets/imgs/flyline.png'),
      })
  
      const endPoint = Cesium.Cartesian3.fromDegrees(city.lon, city.lat, 0)
      viewer.entities.add({
        position: endPoint,
        point: {
          pixelSize: city.size - 10,
          color: city.color,
        },
      })
      DTGlobe.CityFlyLines.push(viewer.entities.add({
        polyline: {
          positions: generateCurve(startPoint, endPoint),
          width: 2,
          material: material,
        },
      }))
    })
    viewer.entities.resumeEvents()
}