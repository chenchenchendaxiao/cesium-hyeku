import Experience from "@/Experience/Experience.js";
// import img1 from "/textures/1.jpg";
// import img2 from "/textures/2.jpg";
// import img3 from "/textures/3.jpg";
// import img4 from "/textures/4.jpg";
// import img5 from "/textures/5.jpg";
import "@/style.css";
import { minIndex } from "d3";
export const loadShader = ()=>{

document.querySelector("#homePageShaderContainer").innerHTML = `
<div id="sketch"></div>
<div class="loader-screen">
    <div class="loading-container">
        <div class="loading">
            <span style="--i: 0">L</span>
            <span style="--i: 1">O</span>
            <span style="--i: 2">A</span>
            <span style="--i: 3">D</span>
            <span style="--i: 4">I</span>
            <span style="--i: 5">N</span>
            <span style="--i: 6">G</span>
        </div>
    </div>
</div>
<div class="gallery">
    <img class="gallery-item" src="https://s2.loli.net/2023/09/12/ySLGYKhVqH3BtN4.jpg" crossorigin="anonymous" alt="" />
    <img class="gallery-item" src="https://s2.loli.net/2023/09/12/BhmSdM2XA9yYftK.jpg" crossorigin="anonymous" alt="" />
    <img class="gallery-item" src="https://s2.loli.net/2023/09/12/CqIlJd1XO9rh68e.jpg" crossorigin="anonymous" alt="" />
    <img class="gallery-item" src="https://s2.loli.net/2023/09/12/RzwqhImAV9H57xs.jpg" crossorigin="anonymous" alt="" />
    <img class="gallery-item" src="https://s2.loli.net/2023/09/12/p3FME9qcUAnJixm.jpg" crossorigin="anonymous" alt="" />
</div>
`;
new Experience("#sketch");

}
//随便写个快排
function quickSort(arr){
    if(arr.length<=1) return arr
    let midIndex=Math.floor(arr.length/2)
    let leftArr=[] ;
    let rightArr=[] ;
    let midItem=arr[midIndex]
    for(let i=0;i<arr.length;i++){
        if(i==midIndex) continue
        let item=arr[i]
        if(item<midItem){
         leftArr.push(item)
        }else{
         rightArr.push(item)
        } 
        
    }
    
}

 