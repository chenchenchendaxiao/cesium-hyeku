import DynamicWallMaterialProperty from './FlowVerticle'
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
                    // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(10000, 3000000),
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
                    // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(10000, 3000000),
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
                    // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(10000, 3000000),
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
                        // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(10000, 3000000),
                },
                    polyline:{
                        width:2,
                        positions:polylinePos3500,
                        material:new Cesium.Color(0,0.345,0.581,0.2),
                       // material: Cesium.Color.RED
                        // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(10000, 3000000),
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
                        // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(10000, 3000000),
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
                    // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(10000, 3000000),
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
          // entity.polygon.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(0, 8000000)
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
            // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(10000, 3000000),
          }
          entity.show = false;
          DTGlobe.CakeMapEntity.push(entity)
        }
      })
    /* 走马灯围墙 */
    let townBoundaryWallPromise = Cesium.GeoJsonDataSource.load('static/townBoundary.geojson',{
    });
    townBoundaryWallPromise.then(function(dataSource){
        let entities = dataSource.entities.values;
        for(var i = 0;i<entities.length;i++){
            let entity = entities[i]
            let polylinePos3500=[]
            entity._polygon.hierarchy._value.positions.forEach(position => {
                let carto = Cesium.Cartographic.fromCartesian(position)
                carto.height = 3500;
                let CartesianPos = Cesium.Cartographic.toCartesian(carto)
                polylinePos3500.push(CartesianPos)
            });
            DTGlobe.CakeMapEntity.push(
                viewer.entities.add({
                    show:false,
                    wall: {
                        positions: polylinePos3500,
                        minimumHeights: new Array(polylinePos3500.length).fill(1000),
                        material:  new Cesium.DynamicWallMaterialProperty({
                            viewer: viewer,
                            color: Cesium.Color.AQUA.withAlpha(0.8),
                            duration: 1500,
                            // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(10000, 3000000),
                        }),
                    // material:  new Cesium.ImageMaterialProperty({
                    //     image: require('../imgs/渐变wall.png'),
                    //     transparent: true,
                    // }),
                    }
                })
            )
        }
    })
}
let equimentPoints = [
    [119.8607584163678, 30.59698361054653],
    [119.85736575203006, 30.530040294960834],
    [119.94622798625453, 30.56626482750708],
    [119.95635496055459, 30.512235931867973],
    [120.04460018108972, 30.520827533448212],
    [120.01544629299613, 30.557212482196835],
    [120.06117520241834, 30.607122847052256],
    [120.09413336250175, 30.5650974118212],
    [120.12615178332291, 30.628981150196925],
    [120.15624565164542, 30.582520313273793],
    [120.14399925632245, 30.531664034229028],
    [120.24389483538701, 30.546336933036248],
    [120.19675417554687, 30.587987834076305],
    [120.23511074535551, 30.62606328111981],
    [120.27643579981614, 30.604739338150885],
]
export const addEquipment = (viewer, DTGlobe) => {
    equimentPoints.forEach(item => {
        DTGlobe.equipmentPoints.push(viewer.entities.add({
            show: false,
            position: Cesium.Cartesian3.fromDegrees(item[0], item[1]),
            billboard: {
                image: require('../imgs/marker.png'),
                disableDepthTestDistance: Number.POSITIVE_INFINITY, // 关闭深度测试
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                scale: 0.5,
                // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 10000),
            },
        }))
    })
}
export const addCakemapHeightListener = (viewer, DTGlobe) => {
    // TODO: 注销回调后，再次添加的的监听回调函数无效
    viewer.camera.changed.addEventListener(switchCakeState(viewer, DTGlobe))
    console.log('viewer.camera.changed', viewer.camera.changed)
}
let near = false
const switchCakeState = (viewer, DTGlobe)=>{
    // 当前高度
    let height = viewer.camera.positionCartographic.height;
    // 下面可以写其他的代码了
    if (height <= 10000 && near == false) {
        DTGlobe.CakeMapEntity.forEach(entity => {
        entity.show = false
        })
        DTGlobe.equipmentPoints.forEach(entity=>{
        entity.show=true
    })
        // shebeipoint.show
        near = !near
    } else if (height > 10000 && near == true) {
        DTGlobe.CakeMapEntity.forEach(entity => {
        entity.show = true
        })
        DTGlobe.equipmentPoints.forEach(entity=>{
        entity.show=false
        })
        near = !near
    }
}
export const removeEventListener = (viewer) => {
    viewer.camera.changed.removeEventListener(switchCakeState)
}
