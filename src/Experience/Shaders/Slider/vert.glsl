uniform float iTime;
uniform vec3 iResolution;
uniform vec4 iMouse;
uniform vec2 uMeshSize;//图片网格大小
uniform vec2 uMeshPosition;//图片网格位置


varying vec2 vUv;
uniform float uVelocity;
uniform float uProgress;
// float b = 2.0;
vec3 distort(vec3 p){
    float PI = 3.141592657;
    //根据y方向的
    p.x+=sin(uv.y*PI)*uVelocity*5.;
    p.z+=abs(sin(uv.x*PI)*uVelocity*5.) ;
    return p;
}
vec3 transition(vec3 p){
    float pr=uProgress;//获得这一帧下的
    vec2 targetScale=iResolution.xy/uMeshSize.xy;//屏幕的xy除以图片网格的xy可以得到
    vec2 scale=mix(vec2(1.),targetScale,pr);//起点终点融合程度
    p.xy*=scale;
    p.xy+=-uMeshPosition*pr;//把图片实体移动到原点 x和y两个分量都减去图片实体原有位置的xy乘上当前帧下的系数
    p.z+=pr;//解决
    return p;
}
void main(){
    vec3 p=position;
    p=transition(p);
    vec4 mvPosition=modelViewMatrix*vec4(p,1.);
    mvPosition.xyz=distort(mvPosition.xyz);
    gl_Position=projectionMatrix*mvPosition;

    vUv=uv;
}
