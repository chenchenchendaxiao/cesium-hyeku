// import * as Cesium from 'Cesium';

// 定义线的轨迹动态线纹理-->
function PolylineChannalMaterialProperty(color, duration, repeat, type) {
    this._definitionChanged = new Cesium.Event();
    this._color = undefined;
    this._colorSubscription = undefined;
    this.color = color;
    this.duration = duration;
    this._repeat = undefined;
    this._repeatSubscription = undefined;
    this.repeat = repeat;
    this._time = (new Date()).getTime();
    this._type = type;
    // console.log(this._type, 'this._type构造')
}
Object.defineProperties(PolylineChannalMaterialProperty.prototype, {
    isConstant: {
        get: function() { return false }
    },
    definitionChanged: {
        get: function() { return this._definitionChanged; }
    },
    color: Cesium.createPropertyDescriptor('color'),
    repeat: Cesium.createPropertyDescriptor('repeat')
});
PolylineChannalMaterialProperty.prototype.getType = function() {
    return 'PolylineTrailLink';
};
PolylineChannalMaterialProperty.prototype.getValue = function(time, result) {
    if (!Cesium.defined(result)) { result = {}; }
    result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.WHITE, result.color);
    result.repeat = Cesium.Property.getValueOrClonedDefault(this._repeat, time, 5.0, result.repeat);
    result.image = require('@/assets/imgs/channel.png');
    result.time = (((new Date()).getTime() - this._time) % this.duration) / this.duration;
    // console.log('result11111111111', result)
    return result;
};
PolylineChannalMaterialProperty.prototype.equals = function(other) {
    return this === other || (other instanceof PolylineChannalMaterialProperty && Cesium.Property.equals(this._color, other._color) && Cesium.Property.equals(this._repeat, other._repeat));
};
// console.log(this.type, 'this.type ')
// 在Material上挂载相关的流动线纹理 可以根据自己的需要进行封装
Cesium.Material.PolylineTrailLinkType = 'PolylineTrailLink';
// const image = require('@/assets/imgs/water.png');
console.log('输出测试')
    // Cesium.Material.PolylineTrailLinkImage = require('@/assets/imgs/changjiangwater.png');
    // Cesium.Material.PolylineTrailLinkImage = require('@/assets/imgs/water.png');
    // 定义着色器源码 核心部分
Cesium.Material.PolylineTrailLinkSource = "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
{\n\
    czm_material material = czm_getDefaultMaterial(materialInput);\n\
    vec2 st = materialInput.st;\n\
    vec4 colorImage = texture2D(image, vec2(fract(st.s * repeat - time), st.t));\n\
    material.alpha = colorImage.a;\n\
    material.diffuse = colorImage.rgb;\n\
    return material;\n\
}";
Cesium.Material._materialCache.addMaterial(Cesium.Material.PolylineTrailLinkType, {
    fabric: {
        type: Cesium.Material.PolylineTrailLinkType,
        uniforms: {
            color: new Cesium.Color(1, 255, 0, 0.5),
            image: require('@/assets/imgs/channel.png'),
            // image: '',
            time: 0,
            repeat: 5.0
        },
        source: Cesium.Material.PolylineTrailLinkSource
    },
    translucent: function() {
        return true; // true半透明, false不透明
    }
});

export default PolylineChannalMaterialProperty;