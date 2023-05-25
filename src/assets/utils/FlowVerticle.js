/**
 * 垂直走马灯围墙
 * viewer
 * color 颜色
 * duration 时间周期
 * trailImage 图片
 */
export default function DynamicWallMaterialProperty(options) {
  // 默认参数设置
  this._definitionChanged = new Cesium.Event()
  this._color = undefined
  this._colorSubscription = undefined
  this.color = options.color
  this.duration = options.duration
  this.trailImage = options.trailImage
  this._time = new Date().getTime()
  this.viewer = options.viewer
}
Object.defineProperties(DynamicWallMaterialProperty.prototype, {
  isConstant: {
    get: function () {
      return false
    },
  },
  definitionChanged: {
    get: function () {
      return this._definitionChanged
    },
  },
  color: Cesium.createPropertyDescriptor('color'),
})
DynamicWallMaterialProperty.prototype.getType = function (time) {
  return 'DynamicWall'
}
DynamicWallMaterialProperty.prototype.getValue = function (time, result) {
  if (!Cesium.defined(result)) {
    result = {}
  }
  result.color = Cesium.Property.getValueOrClonedDefault(
    this._color,
    time,
    Cesium.Color.WHITE,
    result.color
  )
  if (this.trailImage) {
    result.image = this.trailImage
  } else {
    result.image = Cesium.Material.DynamicWallImage
  }

  if (this.duration) {
    result.time =
      ((new Date().getTime() - this._time) % this.duration) / this.duration
  }
  this.viewer.scene.requestRender()
  return result
}
DynamicWallMaterialProperty.prototype.equals = function (other) {
  return (
    this === other ||
    (other instanceof DynamicWallMaterialProperty &&
      Cesium.Property.equals(this._color, other._color))
  )
}
Cesium.DynamicWallMaterialProperty = DynamicWallMaterialProperty
Cesium.Material.DynamicWallType = 'DynamicWall'
Cesium.Material.DynamicWallImage = require('../imgs/渐变线.png')
Cesium.Material.DynamicWallSource = `czm_material czm_getMaterial(czm_materialInput materialInput)
            {
                czm_material material = czm_getDefaultMaterial(materialInput);
                vec2 st = materialInput.st;
                vec4 colorImage = texture2D(image, vec2(fract(st.t - time), st.t));
                vec4 fragColor;
                fragColor.rgb = color.rgb / 1.0;
                fragColor = czm_gammaCorrect(fragColor);
                material.alpha = colorImage.a * color.a;
                material.diffuse = color.rgb;
                material.emission = fragColor.rgb;
                return material;
            }`
Cesium.Material._materialCache.addMaterial(Cesium.Material.DynamicWallType, {
  fabric: {
    type: Cesium.Material.DynamicWallType,
    uniforms: {
      color: new Cesium.Color(1.0, 1.0, 1.0, 1),
      image: Cesium.Material.DynamicWallImage,
      time: 0,
    },
    source: Cesium.Material.DynamicWallSource,
  },
  translucent: function (material) {
    return true
  },
})
