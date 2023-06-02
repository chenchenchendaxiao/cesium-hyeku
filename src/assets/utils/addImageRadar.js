//利用回调旋转材质实现雷达扫描效果
export const addImageRadar = (viewer,DTGlobe)=>{
    // alert('add')
    let rader = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(120.104569,30.306281),
        name: '图片雷达',
        ellipse: {
            semiMajorAxis: 1000.0,
            semiMinorAxis: 1000.0,
            material: new Cesium.ImageMaterialProperty({
                image: require('@/assets/imgs/radar.png'),
                color: new Cesium.Color(1, 1, 0.0, 0.8),
            }),
            // 不设置高度则无法渲染外框线
            height: 10.0,
            heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
            outline: true,
            outlineColor: new Cesium.Color(1, 1, 0.0, 1.0)
        }
    })
    rotateMaterial(rader.ellipse, 0, -3);
}
const rotateMaterial=(instance, _stRotation, _amount) =>{
    instance.stRotation = new Cesium.CallbackProperty(function() {
        _stRotation += _amount;
        if (_stRotation >= 360 || _stRotation <= -360) {
            _stRotation = 0;
        }
        return Cesium.Math.toRadians(_stRotation);
    }, false)
}
