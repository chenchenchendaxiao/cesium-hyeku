export const addWhiteModel = (viewer,DTGlobe)=>{
    var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
        url: 'static/hangzhouBuilding/tileset.json'
    }));
    DTGlobe.whiteModel=tileset;
    tileset.show=false;
 // 监听数据加载完成
    tileset.allTilesLoaded.addEventListener(() => {
        console.log('数据加载完成',tileset);
        // DTGlobe.whiteModel=tileset;
        //默认不可见
        // tileset.show=false;

    });
    
}