import Experience from "@/Experience/Experience.js";
export const loadShader = ()=>{

document.querySelector("#homePageShaderContainer").innerHTML = `
<div id="sketch"></div>
`;

new Experience("#sketch");

}