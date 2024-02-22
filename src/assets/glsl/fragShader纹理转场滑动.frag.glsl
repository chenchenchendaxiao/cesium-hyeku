#iChannel0 "https://s2.loli.net/2023/09/10/QozT59R6KsYmb3q.jpg"
#iChannel1 "https://s2.loli.net/2023/09/10/Jb8mIhZMBElPiuC.jpg"

vec2 distort(vec2 p){
    p.x+=sin(p.y*10.+iTime)/70.;
    return p;
}
vec4 getFromColor(vec2 uv){
    return texture(iChannel0,uv);
}

vec4 getToColor(vec2 uv){
    return texture(iChannel1,uv);
}
vec4 transition(vec2 uv){
    float progress=iMouse.x/iResolution.x;
    //mix(第一张采样，第二份采样，混合比例)
    // return mix(getFromColor(uv),getToColor(uv),progress);
    return mix(getFromColor(uv),getToColor(uv),1.-step(progress,uv.x));
}

void mainImage(out vec4 fragColor,in vec2 fragCoord){
    vec2 uv=fragCoord/iResolution.xy;
    vec4 col=transition(uv);
    fragColor=col;
}

