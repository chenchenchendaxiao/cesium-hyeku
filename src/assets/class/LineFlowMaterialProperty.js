class LineFlowMaterialProperty {
    constructor(options) {
        this._definitionChanged = new Cesium.Event();
        this._color = undefined;
        this._speed = undefined;
        this._percent = undefined;
        this._gradient = undefined;
        this.color = options.color;
        this.speed = options.speed;
        this.percent = options.percent;
        this.gradient = options.gradient;
    };

    get isConstant() {
        return false;
    }

    get definitionChanged() {
        return this._definitionChanged;
    }

    getType(time) {
        return Cesium.Material.LineFlowMaterialType;
    }

    getValue(time, result) {
        if (!Cesium.defined(result)) {
            result = {};
        }

        result.color = Cesium.Property.getValueOrDefault(this._color, time, Cesium.Color.RED, result.color);
        result.speed = Cesium.Property.getValueOrDefault(this._speed, time, 5.0, result.speed);
        result.percent = Cesium.Property.getValueOrDefault(this._percent, time, 0.1, result.percent);
        result.gradient = Cesium.Property.getValueOrDefault(this._gradient, time, 0.01, result.gradient);
        return result
    }

    equals(other) {
        return (this === other ||
            (other instanceof LineFlowMaterialProperty &&
                Cesium.Property.equals(this._color, other._color) &&
                Cesium.Property.equals(this._speed, other._speed) &&
                Cesium.Property.equals(this._percent, other._percent) &&
                Cesium.Property.equals(this._gradient, other._gradient))
        )
    }
}

Object.defineProperties(LineFlowMaterialProperty.prototype, {
    color: Cesium.createPropertyDescriptor('color'),
    speed: Cesium.createPropertyDescriptor('speed'),
    percent: Cesium.createPropertyDescriptor('percent'),
    gradient: Cesium.createPropertyDescriptor('gradient'),
})

Cesium.LineFlowMaterialProperty = LineFlowMaterialProperty;
Cesium.Material.LineFlowMaterialProperty = 'LineFlowMaterialProperty';
Cesium.Material.LineFlowMaterialType = 'LineFlowMaterialType';
Cesium.Material.LineFlowMaterialSource =
    `
    uniform vec4 color;
    uniform float speed;
    uniform float percent;
    uniform float gradient;
    
    czm_material czm_getMaterial(czm_materialInput materialInput){
      //获取材质;
      czm_material material = czm_getDefaultMaterial(materialInput);
      //获取二维坐标;
      vec2 st = materialInput.st;
      //通过帧数和速度的组合形成一个循环渐变的变量，在渐变类材质中常见
      float t =fract(czm_frameNumber * speed / 1000.0);
      t *= (1.0 + percent);
      //在t-percent到t之间做平滑渐变，用的坐标是垂直坐标，在垂直方向渐变 后面是在限制的范围内才有颜色;
      float alpha = smoothstep(t- percent, t, st.s) * step(-t, -st.s);
      alpha += gradient;
      material.diffuse = color.rgb;
      material.alpha = alpha;
      return material;
    }
    `

Cesium.Material._materialCache.addMaterial(Cesium.Material.LineFlowMaterialType, {
    fabric: {
        type: Cesium.Material.LineFlowMaterialType,
        uniforms: {
            color: new Cesium.Color(1.0, 0.0, 0.0, 1.0),
            speed: 10.0,
            percent: 0.1,
            gradient: 0.01
        },
        source: Cesium.Material.LineFlowMaterialSource
    },
    translucent: function(material) {
        return true;
    }
})
