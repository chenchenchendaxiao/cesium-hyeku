import LineFlowMaterialProperty from '@/assets/class/LineFlowMaterialProperty'

export const addVerticalFlyLine = (viewer,DTGlobe)=> {
    let positions = generateRandomPosition([120.19016,30.249861],200)
    console.log(positions,'根据中心点随机生成的100个位置坐标')
    positions.forEach(item=>{
        let startPoint = new Cesium.Cartesian3.fromDegrees(item[0], item[1], 0);
        let endPoint = new Cesium.Cartesian3.fromDegrees(item[0], item[1], 5000*Math.random());
        let linepos=[startPoint,endPoint]
        viewer.entities.add({
            polyline: {
                positions: linepos,
                material: new Cesium.LineFlowMaterialProperty({
                    color: new Cesium.Color(Math.random(), Math.random(), Math.random(), 0.8),
                    speed: 15 * Math.random(),
                    percent: 0.15,
                    gradient: 0.02
                }),
                width:2
            }
        })
    })
}
const generateRandomPosition=(position, num) => {
    let list = []
    for (let i = 0; i < num; i++) {
        // random产生的随机数范围是0-1，需要加上正负模拟
        let lon = position[0] + Math.random() * 0.1 * (i % 2 == 0 ? 1 : -1);
        let lat = position[1] + Math.random() * 0.1 * (i % 2 == 0 ? 1 : -1);
        list.push([lon, lat])
    }
    return list
}
