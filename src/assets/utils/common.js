let DTGlobe = { 
    viewer: '',
    citiesPopulationEntity:[],//城市人口柱状图
    SatelliteOrbitalEntity:[],//卫星和轨道
    CityFlyLines:[],// 城市轨迹弧线
    equipmentLayers: [],
    handle: '1', 
    fog: '', rain: '', snow: '', 
    lightEsriLayer: '', 
    temporaryEntity: 0
    };
const getViewer = () => {
    return DTGlobe.viewer;
}
export {
    DTGlobe,
    //返回全局viewer对象
    getViewer,
    
}
