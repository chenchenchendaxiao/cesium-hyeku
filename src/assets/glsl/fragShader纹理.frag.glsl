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
    return mix(getFromColor(uv),getToColor(uv),progress);
}

void mainImage(out vec4 fragColor,in vec2 fragCoord){
    vec2 uv=fragCoord/iResolution.xy;
    // fragColor=vec4(uv.x,0.,0.,1.);
    // fragColor=vec4(0.,uv.y,0.,1.);
    uv=distort(uv);
     vec3 tex=texture(iChannel0,uv).xyz;
    fragColor=vec4(tex,1.);
}
