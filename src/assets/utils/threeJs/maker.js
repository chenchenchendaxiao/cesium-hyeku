import * as THREE from 'three'
import { Line2 } from 'three/examples/jsm/lines/Line2'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import * as d3 from 'd3-geo'
import * as Constant from './constant'

import {getImg} from './svg/svg'
export async function getTexture(label,type){
    let highLight = label === '杭州市';
    let src = await getImg(label,type,highLight);
    return getTextureFromUrl(src);
}
export async function getTextureFromUrl(src){
    let img = document.createElement('img');
    img.src=src;
    return new Promise((resolve,reject)=>{
        img.onload = () =>{
            img.width *=3;
            img.height *=3;
            let texture = new THREE.CanvasTexture(img);
            resolve({
                texture:texture,
                width:img.width,
                height:img.height
            });
        }
    })
}