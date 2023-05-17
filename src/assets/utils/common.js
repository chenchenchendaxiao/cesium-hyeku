let DTGlobe = { 
    viewer: '',
    citiesPopulationEntity:[],//城市人口柱状图
    SatelliteOrbitalEntity:[],//卫星和轨道
    CityFlyLines:[],// 城市轨迹弧线
    RiverEntity:[],//河流流动线
    ChannelEntity:[],//航道流动线
    CakeMapEntity:[],//蛋糕图行政区划实体集合
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
