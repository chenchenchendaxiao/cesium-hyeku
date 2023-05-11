let DTGlobe = { 
    viewer: '',
    citiesPopulationEntity:[],
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
