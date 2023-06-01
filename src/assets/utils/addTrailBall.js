import EllipsoidTrailMaterialProperty from '@/assets/class/EllipsoidTrailMaterialProperty'

export const addTrailBall = (viewer,DTGlobe)=>{
    // 
    viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(120.176362,30.314823),
        name: '轨迹渐变球体',
        ellipsoid: {
            radii: new Cesium.Cartesian3(600.0, 600.0, 600.0),
            material: new Cesium.EllipsoidTrailMaterialProperty({
                color: new Cesium.Color(1.0, 1.0, 0.0, 0.5),
                speed: 15.0
            })
        }
    })
}