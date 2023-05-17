export const  addCakeMap = (viewer,DTGlobe)=>{
    //读取geojson格式的县域边界数据
    let countyDataPromise = Cesium.GeoJsonDataSource.load('static/county.geojson',{
    });
    if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
        viewer.resolutionScale = window.devicePixelRatio
    }
    viewer.scene.postProcessStages.fxaa.enabled = true;
    countyDataPromise.then(function(dataSource){
        // viewer.dataSource.add(dataSource);
        let entities = dataSource.entities.values;
        for(var i = 0;i<entities.length;i++){
            let entity = entities[i]
            //添加第一层外边框
            let polylinePos1000=[]
            entity._polygon.hierarchy._value.positions.forEach(position => {
                let carto = Cesium.Cartographic.fromCartesian(position)
                carto.height=1000;
                let CartesianPos = Cesium.Cartographic.toCartesian(carto)
                polylinePos1000.push(CartesianPos)
            });
            DTGlobe.CakeMapEntity.push(
                viewer.entities.add({
                  show:false,
                  polyline: {
                    positions: polylinePos1000,
                    width: 3,
                    material: new Cesium.Color.fromBytes(77,166,255),
                  },
                })
            )
            //添加2000高度的外边框 
            let polylinePos2000=[]
            entity._polygon.hierarchy._value.positions.forEach(position => {
                let carto = Cesium.Cartographic.fromCartesian(position)
                carto.height=2000;
                let CartesianPos = Cesium.Cartographic.toCartesian(carto)
                polylinePos2000.push(CartesianPos)
            });
            DTGlobe.CakeMapEntity.push(
                viewer.entities.add({
                  show:false,
                  polyline: {
                    positions: polylinePos2000,
                    width: 3,
                    material: new Cesium.Color(0.22352,0.8745,0.90588,1),
                  },
                })
            )
            //添加3500高度的外边框 
            let polylinePos3500=[]
            entity._polygon.hierarchy._value.positions.forEach(position => {
                let carto = Cesium.Cartographic.fromCartesian(position)
                carto.height=3500;
                let CartesianPos = Cesium.Cartographic.toCartesian(carto)
                polylinePos3500.push(CartesianPos)
            });
            DTGlobe.CakeMapEntity.push(
                viewer.entities.add({
                  show:false,
                  polyline: {
                    positions: polylinePos3500,
                    width: 3,
                    material: new Cesium.Color(0.17647,0.45882,0.772549,1),
                  },
                })
            )
        }
    })
    let townBoundaryPromise = Cesium.GeoJsonDataSource.load('static/townBoundary.geojson',{
    });
    townBoundaryPromise.then(function(dataSource){
        let entities = dataSource.entities.values;
        for(var i = 0;i<entities.length;i++){
            let entity = entities[i]
            let polylinePos3500=[]
            entity._polygon.hierarchy._value.positions.forEach(position => {
                let carto = Cesium.Cartographic.fromCartesian(position)
                carto.height=3500;
                let CartesianPos = Cesium.Cartographic.toCartesian(carto)
                polylinePos3500.push(CartesianPos)
            });
            DTGlobe.CakeMapEntity.push(
                viewer.entities.add({
                    show:false,
                    positions:entity._polygon.hierarchy._value.positions,
                    polygon:{
                        hierarchy: {
                            positions:entity._polygon.hierarchy._value.positions,  
                        },
                        height:3500,
                        material: new Cesium.ImageMaterialProperty({
                            image:require('@/assets/imgs/水面纹理.png'),
                            color:new Cesium.Color(0.30196,0.65098,1),
                            repeat:new Cesium.Cartesian2(0.4,0.4),
                            // transparent:0.8
                        }),
                        outline:false,
                    },
                    polyline:{
                        width:2,
                        positions:polylinePos3500,
                        material:new Cesium.Color(0,0.345,0.581,0.2),
                       // material: Cesium.Color.RED
                    }
                })
            )
        }
    })
    let outcountyDataPromise = Cesium.GeoJsonDataSource.load('static/outcounty.geojson',{
    });
    outcountyDataPromise.then(function(dataSource){
        let entities = dataSource.entities.values;
        for(var i = 0;i<entities.length;i++){
            let entity = entities[i]
            let polylinePos1500=[]
            entity._polygon.hierarchy._value.positions.forEach(position => {
                let carto = Cesium.Cartographic.fromCartesian(position)
                carto.height=1500;
                let CartesianPos = Cesium.Cartographic.toCartesian(carto)
                polylinePos1500.push(CartesianPos)
            });
            DTGlobe.CakeMapEntity.push(
                viewer.entities.add({
                    show:false,
                    polyline:{
                        width:2,
                        positions:polylinePos1500,
                        material:new Cesium.Color(0.3098,0.70196,1,0.05 ),
                       // material: Cesium.Color.RED
                    }
                }
            )
            )
        }

    })
    let promiseTietu = Cesium.GeoJsonDataSource.load('static/tietufanwei.geojson', {
      })
    promiseTietu.then(function (dataSource) {
        let entities = dataSource.entities.values;
        for(var i = 0;i<entities.length;i++){
            let entity = entities[i]
            let polylinePos600=[]
            entity._polygon.hierarchy._value.positions.forEach(position => {
                let carto = Cesium.Cartographic.fromCartesian(position)
                carto.height=600;
                let CartesianPos = Cesium.Cartographic.toCartesian(carto)
                polylinePos600.push(CartesianPos)
            });
            DTGlobe.CakeMapEntity.push(
              viewer.entities.add({
                show:false,
                positions:entity._polygon.hierarchy._value.positions,
                polygon:{
                    hierarchy: {
                        positions:entity._polygon.hierarchy._value.positions,  
                    },
                    height:600,
                    material: new Cesium.ImageMaterialProperty({
                        image: require('@/assets/imgs/底部图片纹理.png'),
                        color: new Cesium.Color.fromBytes(30, 199, 255, 254)
                    }),
                    outline:false,
                }
            })  
            )
            
        }
    })
    let promiseRiver = Cesium.GeoJsonDataSource.load('static/deqingRiver.geojson', {
        stroke: Cesium.Color.WHITE,
        fill: Cesium.Color.GREEN.withAlpha(1),
        strokeWidth: 0
      })
      promiseRiver.then(function (dataSource) {
        viewer.dataSources.add(dataSource);
        let entities = dataSource.entities.values;
        for (var i = 0; i < entities.length; i++) {
          var entity = entities[i];
          entity.polygon.material = new Cesium.Color.fromBytes(38, 219, 255);
          entity.polygon.height = 3620;
          entity.polygon.outline = false;
          entity.polygon.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(0, 8000000)
          //处理一下坐标高度
          let polylinePos = []
          entity.polygon.hierarchy._value.positions.forEach(position => {
            let carto = Cesium.Cartographic.fromCartesian(position)
            carto.height = 3620
            let CartesianPos = Cesium.Cartographic.toCartesian(carto)
            polylinePos.push(CartesianPos)
          })
          //由于entity.polygon.outlineWidth=2;在windows下不起作用，重新做一个polyline来制作边界
          entity.polyline = {
            positions: polylinePos,
            width: 1,
            material: new Cesium.Color.fromBytes(23, 255, 240),

          }
          entity.show = false;
          DTGlobe.CakeMapEntity.push(entity)
        }
      })
}
