import Text2svg from 'text2svg'
let text2svg1Promise = new Promise((resolve,reject)=>{
    let url = new URL('../../../font/HarmonyOS_Sans_SC_Regular.ttf',import.meta.url).href;
    Text2svg.load(url,(t)=>{
        resolve(t)
    })
})
export async function getImg(label1,type,highLight){
    let svgText = await getSvg(label1,tyoe,highlight)
    return svgToDataUrl(svgText)
}
const svgToDataUrl = (svgStr)=>{
    const encoded = encodeURIComponent(svgStr).replace(/'/g,'%27').replace(/"/,'%22')
    const header = 'data:image/svg+xml,';
    const dataUrl = header + encoded;
    return dataUrl;
}
import word_3 from './word_3';
//图标
function getSvgMaker(num,highLight){
    switch(num){
        case 3:
            return{maker:word_3,x:31.798,y:7.184}
        case 4:{
            if(!highLight){
                return {maker:word_3,x:24.84,y:6.9979}
            }else{
                return {maker:word_3,x:24.84,y:6.9979}
            }
        }
        default:
            break;
    }
}
async function getSvg(label2,type,highLight){
    const text2svg1 = await text2svg1Promise;
    let length =label2.length;
    let string = label2;
    let fontSize = type==='市'?14:16;
    let _getSvgMaker = getSvgMaker;
    try{
        let {maker,x,y}= _getSvgMaker(length,highLight);
        let textpath = text2svg1.toPathData(string,{
            fontSize:fontSize,
            spacing:0,
            x,
            y
        });
        return maker(`<path d="${textpath.pathData}" fill="while"></path>`)
    }catch(err){
        console.error(err)
    }
}