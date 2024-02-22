float sdCircle(vec2 p,float r)
{
    return length(p)-r;
}
float sdBox(in vec2 p,in vec2 b)
{
    vec2 d=abs(p)-b;
    return length(max(d,0.))+min(max(d.x,d.y),0.);
}
float sdEquilateralTriangle(in vec2 p,in float r)
{
    const float k=sqrt(3.);
    p.x=abs(p.x)-r;
    p.y=p.y+r/k;
    if(p.x+k*p.y>0.)p=vec2(p.x-k*p.y,-k*p.x-p.y)/2.;
    p.x-=clamp(p.x,-2.*r,0.);
    return-length(p)*sign(p.y);
}

void mainImage(out vec4 fragColor,in vec2 fragCoord){
    vec2 uv=fragCoord/iResolution.xy;
    //将画布长除以画布宽就能算出画布比例，再将UV的x坐标与比例相乘
    uv.x*=iResolution.x/iResolution.y;
    //uv居中处理 
    uv=(uv-.5)*2.;
    //上下翻转
    uv.y*=-1.;

    float d=sdEquilateralTriangle(uv,0.5);
    // d-=.5;
    // c=step(0.,d);
    float c=smoothstep(0.,.02,d);
    
    // fragColor=vec4(vec3(d),1.);
    fragColor=vec4(vec3(c),1.);


    
}
