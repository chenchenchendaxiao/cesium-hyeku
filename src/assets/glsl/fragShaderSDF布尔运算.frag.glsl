float sdCircle(vec2 p,float r)
{
    return length(p)-r;
}
float sdBox(in vec2 p,in vec2 b)
{
    vec2 d=abs(p)-b;
    return length(max(d,0.))+min(max(d.x,d.y),0.);
}
float opRound(in float d,in float r)
{
    return d-r;
}

float opOnion(in float d,in float r)
{
    return abs(d)-r;
}
float opUnion(float d1,float d2)
{
    return min(d1,d2);
}

float opIntersection(float d1,float d2)
{
    return max(d1,d2);
}

float opSubtraction(float d1,float d2)
{
    return max(-d1,d2);
}
float opSmoothUnion(float d1,float d2,float k){
    float h=clamp(.5+.5*(d2-d1)/k,0.,1.);
    return mix(d2,d1,h)-k*h*(1.-h);
}

float opSmoothSubtraction(float d1,float d2,float k){
    float h=clamp(.5-.5*(d2+d1)/k,0.,1.);
    return mix(d2,-d1,h)+k*h*(1.-h);
}

float opSmoothIntersection(float d1,float d2,float k){
    float h=clamp(.5-.5*(d2-d1)/k,0.,1.);
    return mix(d2,d1,h)+k*h*(1.-h);
}

void mainImage(out vec4 fragColor,in vec2 fragCoord){
    vec2 uv=fragCoord/iResolution.xy;
    //将画布长除以画布宽就能算出画布比例，再将UV的x坐标与比例相乘
    uv.x*=iResolution.x/iResolution.y;
    //uv居中处理 
    uv=(uv-.5)*2.;


    float d=0.0;
    float d1=sdBox(uv,vec2(0.7,0.2));
    d1=opRound(d1,.1);
    d1=opOnion(d1,.1);
    float d2=sdCircle(uv,.5);
    //  d=opUnion(d1,d2);
    // d=opIntersection(d1,d2);
    // d=opSmoothUnion(d1,d2,.1)
    d=opSmoothUnion(d1,d2,abs(sin(iTime)));
    // d-=.5;
    // c=step(0.,d);
    float c=smoothstep(0.,.01,d);
    
    // fragColor=vec4(vec3(d),1.);
    fragColor=vec4(vec3(c),1.);


    
}
