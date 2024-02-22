export const addWhiteModel = (viewer,DTGlobe)=>{
    var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
        url: 'http://124.221.0.175/hangzhoubuilding/tileset.json'
    }));
    DTGlobe.whiteModel=tileset;
    tileset.show=false;
 // 监听数据加载完成
    tileset.allTilesLoaded.addEventListener(() => {
        console.log('数据加载完成',tileset);
        // DTGlobe.whiteModel=tileset;
        //默认不可见
        // tileset.show=fals
        var boundingSphere = tileset.boundingSphere;
        viewer.camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0, -2.0, 0));
        viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
        tileset.style = new Cesium.Cesium3DTileStyle({
            color: {
                conditions: [
                    [' ${Floor} > 80', 'rgba(127,59,8,1)'],
                    [' ${Floor} > 40', 'rgba(198,106,11,1)'],
                    [' ${Floor} > 20', 'rgba(248,176,87,1)'],
                    [' ${Floor} > 15', 'rgba(252,230,200,1)'],
                    [' ${Floor} > 10', 'rgba(224,226,238 ,1)'],
                    [' ${Floor} > 6', 'rgba(170,162,204 ,1)'],
                    [' ${Floor} > 3', 'rgba(102,71,151 ,1)'],
                    ['true', 'rgba(	45,0,75 ,1)'],
                ]
            }
        });

    });

    
}