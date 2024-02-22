float sdCircle(vec2 p,float r)
{
    return length(p)-r;
}
float sdBox(in vec2 p,in vec2 b)
{
    vec2 d=abs(p)-b;
    return length(max(d,0.))+min(max(d.x,d.y),0.);
}
void mainImage(out vec4 fragColor,in vec2 fragCoord){
    vec2 uv=fragCoord/iResolution.xy;
    //将画布长除以画布宽就能算出画布比例，再将UV的x坐标与比例相乘
    uv.x*=iResolution.x/iResolution.y;
    //uv居中处理 
    uv=(uv-.5)*2.;
    //对图形进行平移是需要加减反着来的
    uv-=vec2(.2,.4);
    //对图像进行缩放也是乘除反着来的
    uv*=vec2(2.,2.);

    float d=sdBox(uv,vec2(0.7,0.2));
    // d-=.5;
    // c=step(0.,d);
    float c=smoothstep(0.,.1,d);
    
    // fragColor=vec4(vec3(d),1.);
    fragColor=vec4(vec3(c),1.);


    
}
