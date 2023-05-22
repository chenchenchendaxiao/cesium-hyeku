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
        var boundingSphere = tileset.boundingSphere;
        viewer.camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0, -2.0, 0));
        viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
    
        // tileset.style = new Cesium.Cesium3DTileStyle({
        //     color: {
        //         conditions: [
        //             ['true', 'rgba(0, 127.5, 255 ,1)']//'rgb(127, 59, 8)']
        //         ]
        //     }
        // });
        // console.log(tileset.tileVisible,'tileset.tileVisible')
        // tileset.tileVisible.addEventListener(function (tile) {
        //     let content=tile.content
        //     var featuresLength = content.featuresLength;
        //     for (var i = 0; i < featuresLength; i += 2) {
        //         let feature = content.getFeature(i)
        //         let model = feature.content._model
        //         // console.log(model,'model')
        //         if (model && model._sourcePrograms && model._rendererResources) {
        //             console.log('ok')
        //             Object.keys(model._sourcePrograms).forEach(key => {
        //                 let program = model._sourcePrograms[key]
        //                 let fragmentShader = model._rendererResources.sourceShaders[program.fragmentShader];
        //                 let v_position = "";
        //                 if (fragmentShader.indexOf(" v_positionEC;") != -1) {
        //                     v_position = "v_positionEC";
        //                 } else if (fragmentShader.indexOf(" v_pos;") != -1) {
        //                     v_position = "v_pos";
        //                 }
        //                 const color = `vec4(${feature.color.toString()})`;
        //                 model._rendererResources.sourceShaders[program.fragmentShader] =
        //                     "varying vec3 " + v_position + ";\n" +
        //                     "void main(void){\n" +
        //                     "    vec4 position = czm_inverseModelView * vec4(" + v_position + ",1);\n" +
        //                     "    float glowRange = 360.0;\n" +
        //                     "    gl_FragColor = "+color+";\n"+
        //                     "    gl_FragColor *= vec4(vec3(position.z / 100.0), 1.0);\n" +
        //                     "    float time = fract(czm_frameNumber / 360.0);\n" +
        //                     "    time = abs(time - 0.5) * 2.0;\n" +
        //                     "    float diff = step(0.005, abs( clamp(position.z / glowRange, 0.0, 1.0) - time));\n" +
        //                     "    gl_FragColor.rgb += gl_FragColor.rgb * (1.0 - diff);\n" +
        //                     "}\n"
        //             })
        //             model._shouldRegenerateShaders = true
        //         }
        //     }
        // })
    });

    
}