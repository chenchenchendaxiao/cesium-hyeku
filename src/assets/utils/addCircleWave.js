import CircleWave from "@/assets/class/CircleWave"

export const addCircleWave = (viewer,DTGlobe)=>{
     // 水波纹扩散
 let circleWave = new CircleWave(viewer, "cirCleWave1");
 circleWave.add([120.15556978171176, 30.22241567747299 , 0], '#1FA8E3', 900, 3000);

}