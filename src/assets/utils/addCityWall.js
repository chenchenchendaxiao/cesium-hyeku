
let pos =[120.2026954658149, 30.27961560889794 ,10,
120.2107024183205, 30.283088502128425,10,
120.21394421449753, 30.279634174032868,10,
120.21996425132973, 30.272055023362288 ,10,
120.22338097405046, 30.269520226773114,10,
120.21698563452054, 30.26353917406097 ,10,
120.21227046269546, 30.26037342649274 ,10,
120.20951592017981, 30.258009983825335 ,10,
120.20351759076746, 30.25986963954492,10,
120.19599876523759, 30.259987820687883,10,
120.19523032646325, 30.27891789260573 ,10,
120.2026954658149, 30.27961560889794 ,10,]
export const addCityWall = (viewer,DTGlobe)=>{
    let positions2 = Cesium.Cartesian3.fromDegreesArrayHeights(pos);
    // console.log(positions2,'position2')
    viewer.entities.add({
        show:true,
        wall: {
            positions: positions2,
            minimumHeights: new Array(positions2.length).fill(300),
            material:  new Cesium.DynamicWallMaterialProperty({
                viewer: viewer,
                color: Cesium.Color.AQUA.withAlpha(0.8),
                duration: 1500,
                // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(10000, 3000000),
            }),
        }
    })
}