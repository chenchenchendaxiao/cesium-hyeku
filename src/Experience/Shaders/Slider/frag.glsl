uniform float iTime;
uniform vec3 iResolution;
uniform vec4 iMouse;
uniform vec2 uMediaSize;
uniform float uOpacity;
//用来解决图片宽高和画廊设置的不同引起的形变问题
vec2 cover(vec2 s,vec2 i,vec2 uv){
    float rs=s.x/s.y;
    float ri=i.x/i.y;
    vec2 new=rs<ri?vec2(i.x*s.y/i.y,s.y):vec2(s.x,i.y*s.x/i.x);
    vec2 offset=(rs<ri?vec2((new.x-s.x)/2.,0.):vec2(0.,(new.y-s.y)/2.))/new;
    uv=uv*s/new+offset;
    return uv;
}
uniform sampler2D uTexture;

varying vec2 vUv;

void main(){
    vec2 uv=vUv;
    //只要三个参数 屏幕的宽高 图片的大小和uv
    uv=cover(iResolution.xy,uMediaSize.xy,uv);
    vec4 tex=texture(uTexture,uv);
    vec3 color=tex.rgb;
    gl_FragColor=vec4(color,uOpacity);
}
