export const addCitiesPopulationColumn = (cities,viewer)=>{
     // const viewer = DTGlobe.viewer
     console.log(cities,'cities')
     cities.points.forEach(city=>{
     let startPos=Cesium.Cartesian3.fromDegrees(city.lon, city.lat, 0)
     let endPos=Cesium.Cartesian3.fromDegrees(city.lon, city.lat, city.people*700)
     var lastTime = Date.now()*50;
       viewer.entities.add({
         show:true,
         position: endPos,
         polyline: {
             positions: new Cesium.CallbackProperty(() => {
               var now = Date.now()*50;
               // console.log((now-lastTime)/1000%100/100)
                 return [startPos,Cesium.Cartesian3.fromDegrees(city.lon, city.lat, city.people*700*((now-lastTime)/1000%100/100))];
             }, false),
             width: 3,
             material: Cesium.Color.SKYBLUE ,
             clampToGround: false,
         },
         point: {
             pixelSize: 5,
             color:new Cesium.CallbackProperty(() => {
               var now = Date.now()*50;
                 return Cesium.Color.SILVER .withAlpha((now-lastTime)/1000%100/100);
             }, false) ,
         },
       })
     
    })
}