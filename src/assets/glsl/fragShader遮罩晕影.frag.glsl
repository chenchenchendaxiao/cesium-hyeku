#iChannel0 "https://s2.loli.net/2023/09/10/QozT59R6KsYmb3q.jpg"
void mainImage(out vec4 fragColor,in vec2 fragCoord){
    
    // vec3 col = vec3(1.,1.,1.);
    
    vec2 uv=fragCoord/iResolution.xy;
    vec3 tex=texture(iChannel0,uv).xyz;
    vec3 col=tex;
    vec2 p=uv;
    p-=.5;
    float d=length(p);

    float c=smoothstep(.6,.4,d);
    // col=vec3(c);
    col*=c;
    fragColor=vec4(col,1.);
    

    
}
