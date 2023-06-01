
export  const addQiantangRiver = (viewer,DTGlobe,geojson)=>{
// alert('add')
console.log(geojson,'geojson')
for (var i = 0; i < geojson.features.length; i++) {
    var ifeature = geojson.features[i];
    let coordinates = [];
    // console.log(ifeature.geometry.coordinates[0],'ifeature.geometry.coordinates[0]')
    ifeature.geometry.coordinates[0][0].forEach(lnglat => {
        coordinates.push(lnglat[0]);
        coordinates.push(lnglat[1]);
        coordinates.push(10);
    });
    console.log(coordinates,'coordinates')
    // let positions2 = Cesium.Cartesian3.fromDegreesArray(coordinates);
    // console.log(positions2,'position2')
       // 流动水面效果
    viewer.scene.primitives.add(
      new Cesium.Primitive({
        show:true,
        geometryInstances: new Cesium.GeometryInstance({
            geometry : new Cesium.PolygonGeometry({
                polygonHierarchy : new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArrayHeights(coordinates)),//waterFace是一个组成多边形顶点数组[lon,lat,alt]
                //extrudedHeight: 0,//注释掉此属性可以只显示水面
                perPositionHeight : false//注释掉此属性水面就贴地了
                })
                }),
        appearance: new Cesium.EllipsoidSurfaceAppearance({
            material: new Cesium.Material({
                fabric: {
                    type: "Water",
                    uniforms: {
                        // baseWaterColor: new Cesium.Color(173 / 255.0, 216 / 255.0, 253 / 255.0, 0.5),
                        baseWaterColor: new Cesium.Color(64 / 255.0, 157 / 255.0, 253 / 255.0, 0.5),
                        normalMap: require('@/assets/imgs/waterNormals.jpg'),
                        frequency:6000,//频率
                        animationSpeed: 0.1,//速率
                        amplitude: 50,//振幅
                    }
                }
            })
        }),
    })
);
    // Polyline Glow
    // viewer.scene.groundPrimitives.add(
    //     new Cesium.GroundPolylinePrimitive({
    //         geometryInstances: new Cesium.GeometryInstance({
    //             geometry: new Cesium.GroundPolylineGeometry({
    //                 positions: positions2,
    //                 width: 10.0
    //             })
    //         }),
    //         appearance: new Cesium.PolylineMaterialAppearance({
    //             material: new Cesium.Material({
    //                 fabric : {
    //                     type : Cesium.Material.PolylineGlowType,
    //                     uniforms: {
    //                         color: new Cesium.Color(1.0, 0, 1.0, 0),
    //                         glowPower:0.5,
    //                         taperPower:0.8
    //                     }
    //                 }
    //             })
    //         })
    //     })
    // );
}
 

}