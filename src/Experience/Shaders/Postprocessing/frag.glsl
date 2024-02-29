uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;
//传进来的
uniform float uRGBShift;
//别人封装好的噪点函数
highp float random(vec2 co)
{
    highp float a=12.9898;
    highp float b=78.233;
    highp float c=43758.5453;
    highp float dt=dot(co.xy,vec2(a,b));
    highp float sn=mod(dt,3.14);
    return fract(sin(sn)*c);
}
//rgb位移 就是每一个点的三个颜色通道分别进行偏移采样，便宜幅度不同
vec4 RGBShift(sampler2D tex,vec2 uv,float amount){
    vec2 rUv=uv;
    vec2 gUv=uv;
    vec2 bUv=uv;
    float noise=random(uv+iTime)*.5+.5;
    vec2 offset=amount*vec2(cos(noise),sin(noise));
    rUv+=offset;
    gUv+=offset*.5;
    bUv+=offset*.25;
    vec4 rTex=texture(tex,rUv);
    vec4 gTex=texture(tex,gUv);
    vec4 bTex=texture(tex,bUv);
    vec4 col=vec4(rTex.r,gTex.g,bTex.b,gTex.a);
    return col;
}
//它包含来自上一个渲染通道的图像，该图像将在当前通道中更改。
uniform sampler2D tDiffuse;

varying vec2 vUv;
vec3 grain(vec2 uv,vec3 col){
    float noise=random(uv+iTime);
    col+=(noise-.5)*.1;
    return col;
}
void main(){
    // vec2 uv=vUv;
    // vec4 tex=texture(tDiffuse,uv);
    // vec3 col=tex.xyz;
    // gl_FragColor=vec4(col,1.);
    vec2 uv=vUv;
    vec4 tex=RGBShift(tDiffuse,uv,uRGBShift*6.);//最后一个值是偏移强度
    vec3 col=tex.xyz;
    col=grain(uv,col);
    gl_FragColor=vec4(col,1.);
}
